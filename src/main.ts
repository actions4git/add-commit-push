import { resolve, join } from "node:path";
import assert from "node:assert/strict";
import * as core from "@actions/core";
import * as github from "@actions/github";

process.env.NODE_DEBUG = "execa";
const { $ } = await import("execa");

const rootPath = resolve(core.getInput("path"));
const $r = $({ cwd: rootPath });
const $rs = $({ cwd: rootPath, reject: false });

async function add(pathspecs: string[], options: { force?: boolean } = {}) {
  const { force = false } = options;
  await $r`git add ${force ? "--force" : []} -- ${pathspecs}`;
}
add.all = async (options: { force?: boolean } = {}) => {
  const { force = false } = options;
  await $r`git add --all ${force ? "--force" : []}`;
};

async function commit(
  message: string,
  options: { author?: string; committer?: string } = {}
): Promise<string> {
  let { author, committer } = options;

  const re1 = /^\s*@?github[-_]?actions(?:\[bot\])?\s*$/;
  const re2 = /^\s*@?me\s*$/;
  const re3 = /^\s*(.+)\s+<(.+)>\s*$/;

  if (author) {
    if (re1.test(author)) {
      author = `github-actions[bot] <github-actions[bot]@users.noreply.github.com>`;
    } else if (re2.test(author)) {
      author = `${github.context.actor} <${github.context.actor}@users.noreply.github.com>`;
    }
  } else {
    const { stdout: authorName } = await $rs`git config --get user.name`;
    const { stdout: authorEmail } = await $rs`git config --get user.email`;
    if (authorName && authorEmail) {
      author = `${authorName} <${authorEmail}>`;
    } else {
      author = `github-actions[bot] <github-actions[bot]@users.noreply.github.com>`;
    }
  }

  committer ||= author;
  if (re1.test(committer)) {
    committer = `github-actions[bot] <github-actions[bot]@users.noreply.github.com>`;
  } else if (re2.test(committer)) {
    committer = `${github.context.actor} <${github.context.actor}@users.noreply.github.com>`;
  }

  const env: Record<string, string> = { __proto__: null! };

  const authorMatch = author.match(re3);
  assert(authorMatch, `${author} does not match ${re3}`);
  const [authorName, authorEmail] = authorMatch.slice(1);
  env.GIT_AUTHOR_NAME = authorName;
  env.GIT_AUTHOR_EMAIL = authorEmail;

  const committerMatch = committer.match(re3);
  assert(committerMatch, `${committer} does not match ${re3}`);
  const [committerName, committerEmail] = committerMatch.slice(1);
  env.GIT_COMMITTER_NAME = committerName;
  env.GIT_COMMITTER_EMAIL = committerEmail;

  const $re = $({ cwd: rootPath, env });
  await $re`git commit --message ${message}`;
  const { stdout: sha } = await $r`git rev-parse HEAD`;
  return sha;
}

async function tag(name: string, options: { force?: boolean } = {}) {
  const { force = false } = options;
  await $r`git tag ${force ? "--force" : []} ${name}`;
}

async function push(
  repository: string | null | undefined,
  refspec: string | null | undefined,
  options: { force?: boolean } = {}
) {
  const { force = false } = options;
  if (repository && refspec) {
    await $r`git push ${force ? "--force" : []} ${repository} ${refspec}`;
  } else if (repository) {
    await $r`git push ${force ? "--force" : []} ${repository}`;
  } else {
    await $r`git push ${force ? "--force" : []}`;
  }
}

add: {
  const force = core.getBooleanInput("add-force");
  if (core.getInput("add-pathspec")) {
    await add(core.getMultilineInput("add-pathspec"), { force });
  } else {
    await add.all({ force });
  }
}

let before: string;
commit: {
  ({ stdout: before } = await $r`git rev-parse HEAD`);

  if ((await $rs`git diff --cached`).exitCode) {
    core.setOutput("committed", false);
    core.setOutput("commit-sha", before);
    break commit;
  }

  const author =
    core.getInput("author") ||
    (core.getInput("author-name") && core.getInput("author-email"))
      ? `${core.getInput("author-name")} <${core.getInput("author-email")}>`
      : undefined;
  const committer =
    core.getInput("committer") ||
    (core.getInput("committer-name") && core.getInput("committer-email"))
      ? `${core.getInput("committer-name")} <${core.getInput(
          "committer-email"
        )}>`
      : undefined;

  const message = core.getInput("commit-message");

  const sha = await commit(message, { author, committer });
  core.setOutput("committed", true);
  core.setOutput("commit-sha", sha);
}

const data = await (async () => {
  try {
    const { stdout: tag } = await $r`git describe --exact-match --tags ${before}`;
    return { type: "tag", tag } as const;
  } catch {}

  try {
    const { stdout: ref } = await $r`git rev-parse --symbolic-full-name ${before}`;
    if (ref.startsWith("refs/pull/")) {
      const head = ref.split("/")[2];
      return { type: "pull-request", head } as const;
    }
  } catch {}

  const { stdout: branch } = await $r`git branch --show-current`;
  return { type: "branch", branch } as const;
})();

tag: {
  if (data.type === "tag") {
    const name = core.getInput("tag-tagname") || data.tag;
    const force = core.getInput("tag-force")
      ? core.getBooleanInput("tag-force")
      : !!data.tag;
    await tag(name, { force });
  }
}

push: {
  const repository = core.getInput("push-repository");
  let refspec = core.getInput("push-refspec") || data.tag;
  let force = core.getInput("push-force")
    ? core.getBooleanInput("push-force")
    : data.type === "tag";

  await push(repository, refspec, { force });
  core.setOutput("pushed", true);
}
