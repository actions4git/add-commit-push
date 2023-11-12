import * as core from "@actions/core";
import * as github from "@actions/github";
// import { $ } from "./lib/execa.ts";
import assert from "node:assert/strict";
import { resolve, join } from "node:path";

const $ = (...a) => {
  console.log(a)
  return console.log
}

const rootPath = resolve(".");

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
  const [part1, part2] = core.getInput("commit-author").trim().split(/\s+/);
  GIT_AUTHOR_NAME = part1;
  GIT_AUTHOR_EMAIL = part2.replace(/^<|>$/g, "");
} else {
  GIT_AUTHOR_NAME = core.getInput("commit-author-name", { required: true });
  GIT_AUTHOR_EMAIL = core.getInput("commit-author-email", { required: true });
}

let GIT_COMMITTER_NAME: string;
let GIT_COMMITTER_EMAIL: string;
if (core.getInput("commit-committer")) {
  assert.equal(core.getInput("commit-committer-name"), "");
  assert.equal(core.getInput("commit-committer-email"), "");
  const [part1, part2] = core.getInput("commit-committer").trim().split(/\s+/);
  GIT_COMMITTER_NAME = part1;
  GIT_COMMITTER_EMAIL = part2.replace(/^<|>$/g, "");
} else {
  GIT_COMMITTER_NAME = core.getInput("commit-committer-name", {
    required: true,
  });
  GIT_COMMITTER_EMAIL = core.getInput("commit-committer-email", {
    required: true,
  });
}

const commitMessage = core.getInput("commit-message");

const pushRepository = core.getInput("push-repository");

console.log("ok done with most of the inputs moving to add commit push");

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
    const { stdout } = await $({
      cwd: rootPath,
    })`git rev-parse --abbrev-ref HEAD`;
    if (stdout === "HEAD") {
      const { stdout } = $({ cwd: rootPath })`git tag --points-at HEAD`;
      const tags = stdout.split(/\r?\n/g);
      console.assert(tags.length === 1, `tags=${tags} longer than 1`);
      pushRefspec = tags[0];
      pushForce ??= true;
      console.assert(pushForce, "push-force: false never updates tag");
    } else {
      pushRefspec = stdout;
      pushForce ??= false;
    }
  }

  await $({
    stdio: "inherit",
    cwd: rootPath,
    env: {
      GIT_AUTHOR_NAME,
      GIT_AUTHOR_EMAIL,
      GIT_COMMITTER_NAME,
      GIT_COMMITTER_EMAIL,
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
