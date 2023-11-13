import * as core from "@actions/core";
import * as github from "@actions/github";
import { $ } from "execa";
import assert from "node:assert/strict";
import { resolve, join } from "node:path";

const rootPath = resolve(core.getInput("path"));

let addPathspec: string[] | undefined;
if (core.getInput("add-pathspec")) {
  addPathspec = core.getMultilineInput("add-pathspec");
}
const addForce = core.getBooleanInput("add-force");

let GIT_AUTHOR_NAME: string;
let GIT_AUTHOR_EMAIL: string;
if (core.getInput("commit-author")) {
  assert.equal(core.getInput("commit-author-name"), "");
  assert.equal(core.getInput("commit-author-email"), "");
  if (
    /^\s*@?github[-_]?actions(?:\[bot\])?\s*$/.test(
      core.getInput("commit-author")
    )
  ) {
    GIT_AUTHOR_NAME = "github-actions[bot]";
    GIT_AUTHOR_EMAIL =
      "41898282+github-actions[bot]@users.noreply.github.com";
  } else if (/^\s*@?me\s*$/.test(core.getInput("commit-author"))) {
    GIT_AUTHOR_NAME = process.env.GITHUB_ACTOR;
    GIT_AUTHOR_EMAIL = `${process.env.GITHUB_ACTOR_ID}+${process.env.GITHUB_ACTOR}@users.noreply.github.com`;
  } else {
    [GIT_AUTHOR_NAME, GIT_AUTHOR_EMAIL] = core
      .getInput("commit-author")
      .match(/^\s*(.+)\s+<(.+)>\s*$/)
      .slice(1);
  }
} else {
  GIT_AUTHOR_NAME = core.getInput("commit-author-name", { required: true });
  GIT_AUTHOR_EMAIL = core.getInput("commit-author-email", { required: true });
}

let GIT_COMMITTER_NAME: string;
let GIT_COMMITTER_EMAIL: string;
if (core.getInput("commit-committer")) {
  assert.equal(core.getInput("commit-committer-name"), "");
  assert.equal(core.getInput("commit-committer-email"), "");
  if (
    /^\s*@?github[-_]?actions(?:\[bot\])?\s*$/.test(
      core.getInput("commit-committer")
    )
  ) {
    GIT_COMMITTER_NAME = "github-actions[bot]";
    GIT_COMMITTER_EMAIL =
      "41898282+github-actions[bot]@users.noreply.github.com";
  } else if (/^\s*@?me\s*$/.test(core.getInput("commit-committer"))) {
    GIT_COMMITTER_NAME = process.env.GITHUB_ACTOR;
    GIT_COMMITTER_EMAIL = `${process.env.GITHUB_ACTOR_ID}+${process.env.GITHUB_ACTOR}@users.noreply.github.com`;
  } else {
    [GIT_COMMITTER_NAME, GIT_COMMITTER_EMAIL] = core
      .getInput("commit-committer")
      .match(/^\s*(.+)\s+<(.+)>\s*$/)
      .slice(1);
  }
} else {
  GIT_COMMITTER_NAME = core.getInput("commit-committer-name");
  GIT_COMMITTER_EMAIL = core.getInput("commit-committer-email");
}

const commitMessage = core.getInput("commit-message");

const pushRepository = core.getInput("push-repository");

console.table({ GIT_COMMITTER_NAME, GIT_COMMITTER_EMAIL, GIT_AUTHOR_NAME, GIT_AUTHOR_EMAIL, "process.env.INPUT_*": Object.entries(process.env).filter(x => x[0].startsWith("INPUT_")).map(x => x.join("=")).join("\n") })

if (addPathspec) {
  await $({
    stdio: "inherit",
    cwd: rootPath,
  })`git add ${addForce ? "--force" : []} -- ${addPathspec}`;
} else {
  await $({
    stdio: "inherit",
    cwd: rootPath,
  })`git add ${addForce ? "--force" : []} --all`;
}

const { exitCode } = await $({
  cwd: rootPath,
  reject: false,
})`git diff --cached`;
if (exitCode) {
  core.info(`No changes to commit`);
} else {
  let pushRefspec = core.getInput("push-refspec");
  let pushForce = core.getInput("push-force")
    ? core.getBooleanInput("push-force")
    : null;
  if (!pushRefspec) {
    const { exitCode, stdout } = await $({
      cwd: rootPath,
      reject: false,
    })`git symbolic-ref HEAD`;
    if (exitCode) {
      const { stdout } = await $({ cwd: rootPath })`git tag --points-at HEAD`;
      console.assert(stdout, "no stdout from listing tags");
      const tags = stdout.split(/\r?\n/g);
      console.assert(tags.length >= 1, `tags=${tags} longer than 1`);
      pushRefspec = tags[0];
    } else {
      pushRefspec = stdout;
    }
  }
  if (pushForce == null) {
    const { exitCode } = await $({
      cwd: rootPath,
      reject: false,
    })`git symbolic-ref HEAD`;
    if (exitCode) {
      pushForce = true;
    } else {
      // TODO: Any other force-push situations?
      pushForce = false;
    }
  }

  await $({
    stdio: "inherit",
    cwd: rootPath,
    env: {
      GIT_AUTHOR_NAME,
      GIT_AUTHOR_EMAIL,
      ...(GIT_COMMITTER_NAME && { GIT_COMMITTER_NAME }),
      ...(GIT_COMMITTER_EMAIL && { GIT_COMMITTER_EMAIL }),
    },
  })`git commit --message ${commitMessage}`;
  const { stdout } = await $({
    cwd: rootPath,
  })`git rev-parse HEAD`;

  await $({
    stdio: "inherit",
    cwd: rootPath,
  })`git push ${
    pushForce ? "--force" : []
  } ${pushRepository} ${stdout}:${pushRefspec}`;
}
