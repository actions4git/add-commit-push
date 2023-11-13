import { resolve, join } from "node:path";
import assert from "node:assert/strict";
import * as core from "@actions/core";
import { $ } from "execa";

const githubContext = {
  actor: process.env.GITHUB_ACTOR!,
  actor_id: process.env.GITHUB_ACTOR_ID!,
}

function getNameEmailInput(
  input: string,
  options: { required: true },
): [string, string];
function getNameEmailInput(
  input: string,
  options?: { required?: boolean },
): [string | null, string | null];
function getNameEmailInput(
  input: string,
  options: { required?: boolean } = {},
) {
  const { required = false } = options;
  const githubActionsRe = /^\s*@?github[-_]?actions(?:\[bot\])?\s*$/;
  const meRe = /^\s*@?me\s*$/;
  const short = core.getInput(input);
  let name: string | null;
  let email: string | null;
  if (short) {
    assert.equal(core.getInput(`${input}-name`), "");
    assert.equal(core.getInput(`${input}-email`), "");
    if (githubActionsRe.test(short)) {
      name = "github-actions[bot]";
      email = "41898282+github-actions[bot]@users.noreply.github.com";
    } else if (meRe.test(short)) {
      name = githubContext.actor;
      email = `${githubContext.actor_id}+${githubContext.actor}@users.noreply.github.com`;
    } else {
      const matched = short.match(/^\s*(.+)\s+<(.+)>\s*$/)?.slice(1);
      assert(matched);
      [name, email] = matched;
    }
  } else {
    name = core.getInput(`${input}-name`, { required }) || null;
    email = core.getInput(`${input}-email`, { required }) || null;
  }
  return [name, email];
}

const rootPath = resolve(core.getInput("path"));
const addPathspec = core.getInput("add-pathspec")
  ? core.getMultilineInput("add-pathspec")
  : null;
const addForce = core.getBooleanInput("add-force");
const [GIT_AUTHOR_NAME, GIT_AUTHOR_EMAIL] = getNameEmailInput("commit-author", {
  required: true,
});
const [
  GIT_COMMITTER_NAME = GIT_AUTHOR_NAME,
  GIT_COMMITTER_EMAIL = GIT_AUTHOR_EMAIL,
] = getNameEmailInput("commit-committer");
const commitMessage = core.getInput("commit-message");
const pushRepository = core.getInput("push-repository");

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
    pushForce = !!exitCode;
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
