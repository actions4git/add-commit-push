import { resolve, join } from "node:path";
import assert from "node:assert/strict";
import * as core from "@actions/core";
import { $ } from "execa";

const githubContext = {
  actor: process.env.GITHUB_ACTOR!,
  actor_id: process.env.GITHUB_ACTOR_ID!,
};

function getNameEmailInput(
  input: string,
  options: { required: true }
): [string, string];
function getNameEmailInput(
  input: string,
  options?: { required?: boolean }
): [string | null, string | null];
function getNameEmailInput(
  input: string,
  options: { required?: boolean } = {}
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

add: {
  const addPathspec = core.getInput("add-pathspec")
    ? core.getMultilineInput("add-pathspec")
    : null;
  const addForce = core.getBooleanInput("add-force");

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
}

commit: {
  const [GIT_AUTHOR_NAME, GIT_AUTHOR_EMAIL] = getNameEmailInput(
    "commit-author",
    { required: true }
  );
  let [GIT_COMMITTER_NAME, GIT_COMMITTER_EMAIL] =
    getNameEmailInput("commit-committer");
  GIT_COMMITTER_NAME ??= GIT_AUTHOR_NAME;
  GIT_COMMITTER_EMAIL ??= GIT_AUTHOR_EMAIL;
  const commitMessage = core.getInput("commit-message");

  const { exitCode } = await $({
    cwd: rootPath,
    reject: false,
  })`git diff --cached`;
  if (exitCode) {
    core.setOutput("committed", false);
    break commit;
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

  core.setOutput("committed", true);

  const { stdout } = await $({
    cwd: rootPath,
  })`git rev-parse HEAD`;
  core.setOutput("commit-sha", stdout);
}

let tagTagname
tag: {
  tagTagname = core.getInput("tag-tagname")
  if (!tagTagname) {
    // git show-ref | grep $(git rev-parse HEAD)
    const showRef = await $({ cwd: rootPath })`git show-ref`
    const revParse = await $({ cwd: rootPath })`git rev-parse HEAD`
    const refLine = showRef.stdout.split(/\r?\n/g).find(x => x.includes(revParse.stdout))
    if (!refLine) {
      break tag;
    }
    tagTagname = refLine.split(" ").at(-1)!
  }

  let tagForce = core.getInput("tag-force") ? core.getBooleanInput("tag-force") : null
  if (tagForce == null) {
    if (!core.getInput("tag-tagname")) {
      tagForce= true
    }
  }
  
  await $({ cwd: rootPath })`git tag ${tagForce ? "--force" : []} ${tagTagname}`
}

push: {
  const pushRepository = core.getInput("push-repository");

  let pushRefspec = core.getInput("push-refspec") || null;
  if (!pushRefspec) {
    if (tagTagname) {
      pushRefspec = tagTagname
    }
  }

  let pushForce = core.getInput("push-force") ? core.getBooleanInput("push-force") : null;
  if (pushForce == null) {
    if (tagTagname) {
      pushForce = true
    } else {
      pushForce = false
    }
  }

  if (!tagTagname) {
    const { stdout } = await $({
      cwd: rootPath,
    })`git cherry -v`;
    if (!stdout) {
      core.setOutput("pushed", false);
      break push;
    }
  }

  await $({
    stdio: "inherit",
    cwd: rootPath,
  })`git push ${pushForce ? "--force" : []} ${pushRepository} ${pushRefspec ? pushRefspec : []}`;

  core.setOutput("pushed", true);
}
