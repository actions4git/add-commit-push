import * as core from "@actions/core";
import * as github from "@actions/github";
import { glob } from "glob";
import { $ } from "execa";
import assert from "node:assert/strict";
import { resolve, join } from "node:path";

const rootPath = resolve(".");

let addPaths: string[] | undefined;
let addAll: true | undefined;
if (core.getInput("add-path")) {
  assert.equal(core.getInput("add-all"), "");
  addPaths = await glob(core.getMultilineInput("add-path"), {
    ignore: ["**/.git/**"],
  });
} else {
  assert.equal(core.getBooleanInput("add-all"), true);
  addAll = true;
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

const pushRemote = core.getInput("push-remote");

if (addAll) {
  await $({
    stdio: "inherit",
    cwd: rootPath,
  })`git add --all ${addForce ? "--force" : []}`;
} else {
  await $({
    stdio: "inherit",
    cwd: rootPath,
  })`git add ${addForce ? "--force" : []} ${addPaths}`;
}
const { exitCode } = await $({
  cwd: rootPath,
  reject: false,
})`git diff --cached`;
if (exitCode) {
  core.info(`No changes to commit`);
} else {
  const { stdout } = await $({
    cwd: rootPath,
  })`git rev-parse --abbrev-ref HEAD`;
  let data:
    | { type: "branch"; branch: string }
    | { type: "tag"; tags: string[] };
  if (stdout === "HEAD") {
    const { stdout } = $({ cwd: rootPath })`git tag --points-at HEAD`;
    data = {
      type: "tag",
      tags: stdout.split(/\r?\n/g),
    };
  } else {
    data = { type: "branch", branch: stdout };
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
  if (data.type === "branch") {
    const pushForce = core.getInput("push-force")
      ? core.getBooleanInput("push-force")
      : false;
    await $({
      stdio: "inherit",
      cwd: rootPath,
    })`git push ${pushForce ? "--force" : []} ${pushRemote} ${data.branch}`;
  } else if (data.type === "tag") {
    const pushForce = core.getInput("push-force")
      ? core.getBooleanInput("push-force")
      : true;
    for (const tag of data.tags) {
      await $({
        stdio: "inherit",
        cwd: rootPath,
      })`git tag --force ${tag}`;
    }
    for (const tag of data.tags) {
      await $({
        stdio: "inherit",
        cwd: rootPath,
      })`git push ${pushForce ? "--force" : []} ${pushRemote} ${tag}`;
    }
  }
}
