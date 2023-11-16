# Add, commit, and push

✨ Automagically `git add`, `git commit`, and `git push`

<table align=center><td>

```yml
on:
  pull_request:
jobs:
  job:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx --yes prettier --write .
      - uses: actions4git/add-commit-push@v1
```

</table>

➕ Adds all files by default \
👨 Uses `github.actor` as the default author \
🤖 Uses <b>@github-actions\[bot\]</b> as the default committer \
🔼 Pushes changes to the current branch \
🤩 Works great for the common use cases!

A convenience wrapper with sensible defaults so that you don't have to do
`git add`, `git commit`, and `git push` manually all the time. 😉

## Usage

![Git](https://img.shields.io/static/v1?style=for-the-badge&message=Git&color=F05032&logo=Git&logoColor=FFFFFF&label=)
![GitHub Actions](https://img.shields.io/static/v1?style=for-the-badge&message=GitHub+Actions&color=2088FF&logo=GitHub+Actions&logoColor=FFFFFF&label=)

**🚀 Here's what you want:**

```yml
on:
  push:
    branches: "main"
  pull_request:
jobs:
  job:
    permissions:
      contents: write
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - run: npx --yes prettier --write .
      - uses: actions4git/add-commit-push@v1
```

🔒 Make sure you have the `permissions` set to `contents: write`! We need to be
able to edit the repository contents to push things.

If you're looking to have more control than the options provided below, it's
best if you tap in to the `git` CLI directly. The only tricky bit is setting a
default Git user (it's unset by default). You can either set it manually or use
a premade action like [actions4git/setup-git] to configure the `user.name` and
`user.email` settings.

```yml
- uses: actions/checkout@v4
- uses: actions4git/setup-git@v1
# Then you can do whatever you want as the @github-actions[bot] user!
- run: git add random.txt
- run: git tag --force v1.0.0
- run: git rebase --interactive HEAD~3
- run: git merge --squash feature-branch
- run: git commit --message 'My custom commit message'
- run: git push origin other-branch:main --force
```

🏷️ Automatic tag updating coming soon! Contributions welcome! ❤️

### Inputs

- **`path`:** The path to the repository root folder to perform the Git
  operations in. This defaults to the current working directory (`.`). Change
  this to a subfolder if you are using a different folder other than the default
  `github.workspace` for your Git repository.

- **`add-pathspec`:** Additional path specifiers to be passed to `git add`.
  These can be files, folders, globs, or even some fancy Git pathspec things
  such as `:!ignoreme.txt`. Check out the CSS-Tricks [Git Pathspecs and How to
  Use Them] article for the highlights of Git pathspecs. If this input is not
  specified, `git add --all` will be used instead. Specifying `.` has slightly
  different behavior from `--all`.

- **`add-force`:** Whether or not to use the `--force` flag when performing the
  `git add` operation. Use this if you really want to add something but it's in
  your `.gitignore`. This can be useful if you ever need to commit build
  artifacts to Git that are normally ignored by your `.gitignore`. Defaults to
  `false`.

- **`commit-author`:** A `Name Here <emailhere@example.org>` AiO author name &
  email string. This is a shortcut alternative to the independant
  'commit-author-name' and `commit-author-email` options that are also
  available. This defaults to <b>@github-actions\[bot\]</b>. You can set this to
  the special value `github-actions` to use the <b>@github-actions\[bot\]</b>
  user as the author, or the special `me` value to use the current
  `github.actor` user as the author. Note that this is different from the
  `commit-committer`. [The author of a commit is who wrote the thing and the
  committer is who committed it to Git.] It's recommended to leave this as the
  default.

- **`commit-author-name`:** The name of the author to associate with the commit.
  Should be left unspecified if `commit-author` is specified.

- **`commit-author-email`:** The email address of the author to associate with
  the commit. Should be left unspecified if `commit-author` is specified.

- **`commit-committer`:** A `Name Here <emailhere@example.org>` AiO author name
  & email string. This input is a shortcut for the `commit-committer-name` and
  `commit-committer-email` inputs that can also be individually specified. You
  can set this to the special value `github-actions` to use the
  <b>@github-actions\[bot\]</b> user as the committer, or the special `me` value
  to use the current `github.actor` user as the committer. If this input is
  unspecified, the committer defaults to the author.

- **`commit-committer-name`:** The name of the committer to associate with the
  commit. Should be left unspecified if `commit-committer` is specified.

- **`commit-committer-email`:** The email address of the committer to associate
  with the commit. Should be left unspecified if `commit-committer` is
  specified.

- **`commit-message`:** The `--message` parameter to use for the commit. This
  can be a multiline string if you want to specify a title and body. The default
  is 'Automated changes'.

- **`push-force`:** Whether or not to use the `--force` parameter when doing the
  `git push`. Defaults to `false`.

### Outputs

- **`committed`:** Whether or not anything was actually committed to the
  repository locally. This will be `true` if there were any changes and `false`
  if not.

- **`commit-sha`:** The SHA of the commit that was created. Will not be set if
  nothing was committed.

- **`pushed`:** Whether or not anything was actually pushed to the remote
  repository. This will be `true` if there were any changes that were pushed and
  `false` if not.

## Development

![Node.js](https://img.shields.io/static/v1?style=for-the-badge&message=Node.js&color=339933&logo=Node.js&logoColor=FFFFFF&label=)

**How do I test my changes?**

The testing setup is a bit complicated. There's a separate
[actions4git/add-commit-push-test] and
[actions4git/add-commit-push-test-pull-request-fork] testing setup that is
manually invoked. When you open a Pull Request make sure you request that a
person with write access manually runs those tests! They're a bit too complex to
run automatically on each push. 🤷‍♂️

<!-- prettier-ignore-start -->
[actions4git/setup-git]: https://github.com/actions4git/setup-git
[Git Pathspecs and How to Use Them]: https://css-tricks.com/git-pathspecs-and-how-to-use-them/
[The author of a commit is who wrote the thing and the committer is who committed it to Git.]: https://stackoverflow.com/questions/18750808/difference-between-author-and-committer-in-git
[actions4git/add-commit-push-test]: https://github.com/actions4git/add-commit-push-test
[actions4git/add-commit-push-test-pull-request-fork]: https://github.com/actions4git/add-commit-push-test-pull-request-fork
<!-- prettier-ignore-end -->
