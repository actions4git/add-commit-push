import { resolve, join } from "node:path";
import assert from "node:assert/strict";
import * as core from "@actions/core";
import * as github from "@actions/github";
import { $ } from "execa";

const root = resolve(core.getInput("path"));
const $r = $({ cwd: root });
const $rs = $({ cwd: root, reject: false });

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

  const $re = $({ cwd: root, env });
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
  core.info(`add: force=${force}`);
  if (core.getInput("add-pathspec")) {
    const pathspecs = core.getMultilineInput("add-pathspec");
    core.info(`add: pathspecs=${JSON.stringify(pathspecs)}`);
    await add(pathspecs, { force });
  } else {
    core.info(`add: all`);
    await add.all({ force });
  }
}

let before: string;
commit: {
  ({ stdout: before } = await $r`git rev-parse HEAD`);
  core.info(`commit: before=${before}`);

  if ((await $rs`git diff --cached`).exitCode) {
    core.info(`commit: no changes`);
    core.setOutput("committed", false);
    core.setOutput("commit-sha", before);
    break commit;
  }

  const author =
    core.getInput("author") ||
    (core.getInput("author-name") && core.getInput("author-email"))
      ? `${core.getInput("author-name")} <${core.getInput("author-email")}>`
      : undefined;
  core.info(`commit: author=${author}`);

  const committer =
    core.getInput("committer") ||
    (core.getInput("committer-name") && core.getInput("committer-email"))
      ? `${core.getInput("committer-name")} <${core.getInput(
          "committer-email"
        )}>`
      : undefined;
  core.info(`commit: committer=${committer}`);

  const message = core.getInput("commit-message");
  core.info(`commit: message=${message}`);

  const sha = await commit(message, { author, committer });
  core.info(`commit: sha=${sha}`);

  core.setOutput("committed", true);
  core.setOutput("commit-sha", sha);
}

const data = await (async () => {
  try {
    const { stdout: tag } =
      await $r`git describe --exact-match --tags ${before}`;
    return { type: "tag", tag } as const;
  } catch {}

  const { stdout: branch } = await $r`git branch --show-current`;
  if (branch) {
    return { type: "branch", branch } as const;
  }

  return { type: "unknown" } as const;
})();
core.info(`data=${JSON.stringify(data)}`);

tag: {
  if (data.type === "tag") {
    core.info(`tag: tag=${data.tag}`);
    const name = core.getInput("tag-tagname") || data.tag;
    core.info(`tag: name=${name}`);
    const force = core.getInput("tag-force")
      ? core.getBooleanInput("tag-force")
      : !!data.tag;
    core.info(`tag: force=${force}`);
    await tag(name, { force });
  }
}

push: {
  let repository = core.getInput("push-repository");
  if (
    data.type === "unknown" &&
    !repository &&
    root === process.env.GITHUB_WORKSPACE! &&
    github.context.eventName === "pull_request"
  ) {
    repository = github.context.payload.pull_request?.head.repo.clone_url;
    const token = core.getInput("push-token");
    if (token) {
      // https://github.com/... => https://x:$TOKEN@github.com/...
      repository = repository.replace(/^https:\/\//, `https://x:${token}@`);
    }
  } else {
    repository = "origin";
  }
  core.info(`push: repository=${repository}`);

  let refspec = core.getInput("push-refspec");
  if (!refspec) {
    if (data.type === "tag") {
      refspec = `HEAD:${data.tag}`;
    } else if (data.type === "branch") {
      refspec = `HEAD:${data.branch}`;
    } else if (
      data.type === "unknown" &&
      root === process.env.GITHUB_WORKSPACE! &&
      github.context.eventName === "pull_request"
    ) {
      refspec = `HEAD:${github.context.payload.pull_request!.head.ref}`;
    } else {
      throw new DOMException(`could not determine refspec`, "OperationError");
    }
  } else if (!refspec.startsWith("HEAD:") && !refspec.includes(":")) {
    refspec = `HEAD:${refspec}`;
  }
  core.info(`push: refspec=${refspec}`);

  if (github.context.eventName === "pull_request") {
    if (
      github.context.payload.pull_request!.head.repo.full_name ===
      github.context.repo.repo
    ) {
      core.info(`push: pull request is same repository`);
    } else {
      core.info(
        `push: pull request is different repository head=${
          github.context.payload.pull_request!.head.repo.full_name
        } repo=${github.context.repo.repo}`
      );
    }
  }

  const force = core.getInput("push-force")
    ? core.getBooleanInput("push-force")
    : data.type === "tag";
  core.info(`push: force=${force}`);

  try {
    await push(repository, refspec, { force });
    core.setOutput("pushed", true);
  } catch (error: any) {
    if (
      github.context.eventName === "pull_request" &&
      error?.message.includes("403") &&
      github.context.payload.pull_request!.head.repo.full_name !==
        github.context.repo.repo
    ) {
      core.error(
        `🔑 Need a token that has permission to push to cross-fork Pull Request from ${
          github.context.payload.pull_request!.head.repo.full_name
        } ${github.context.payload.pull_request!.head.ref} to ${
          github.context.repo.repo
        } ${
          github.context.ref
        }. You probably need a personal access token for this.`
      );
      throw error;
    } else {
      throw error;
    }
  }
}
