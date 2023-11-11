const rootPath = core.getInput("path");

const addPaths = await glob(core.getMultilineInput("add-path"), {
  ignore: ["**/.git/**"],
});
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

const pushForce = core.getBooleanInput("push-force");

await $({
  stdio: "inherit",
  cwd: rootPath,
})`git add ${addForce ? "--force" : []} ${addPaths}`;
const { exitCode } = await $({
  cwd: rootPath,
  reject: false,
})`git diff --cached`;
if (exitCode) {
  core.info(`No changes to commit`);
} else {
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
  await $({
    stdio: "inherit",
    cwd: rootPath,
  })`git push ${pushForce ? "--force" : []}`;
}
