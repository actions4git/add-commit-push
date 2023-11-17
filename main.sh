#!/bin/bash
set -e
[[ $RUNNER_DEBUG != 1 ]] || set -x

cd "$INPUT_PATH"

git status --verbose

add_pathspec=$(printenv INPUT_ADD-PATHSPEC)
[[ -n $add_pathspec ]] || add_pathspec=$(printenv INPUT_ADD-PATHSPECS)
[[ -n $add_pathspec ]] || add_pathspec=$(printenv INPUT_ADD-PATH)
[[ -n $add_pathspec ]] || add_pathspec=$(printenv INPUT_ADD-PATHS)
echo "add_pathspec=$add_pathspec"

add_pathspec_file=$(printenv INPUT_ADD-PATHSPEC-FILE)
[[ -n $add_pathspec_file ]] || add_pathspec_file=$(printenv INPUT_ADD-PATHSPECS-FILE)
[[ -n $add_pathspec_file ]] || add_pathspec_file=$(printenv INPUT_ADD-PATH-FILE)
[[ -n $add_pathspec_file ]] || add_pathspec_file=$(printenv INPUT_ADD-PATHS-FILE)
echo "add_pathspec_file=$add_pathspec_file"

add_force=$(printenv INPUT_ADD-FORCE)
if [[ $add_force == 1 || $add_force == true ]]; then
  add_force_flag='--force'
fi
echo "add_force_flag=$add_force_flag"

if [[ -n $add_pathspec ]]; then
  echo "using pathspec from input"
  echo "$add_pathspec" | git add --pathspec-from-file=- $add_force_flag --verbose
elif [[ -n $add_pathspec_file ]]; then
  echo "using pathspec from file"
  git add --pathspec-from-file="$add_pathspec_file" $add_force_flag --verbose
else
  echo "using --all"
  git add --all $add_force_flag --verbose
fi

git status --verbose

if git diff --cached --exit-code --quiet; then
  echo 'No changes detected'
  echo "committed=false" >> $GITHUB_OUTPUT
else
  commit_author_name=$(printenv INPUT_COMMIT-AUTHOR-NAME)
  commit_author_email=$(printenv INPUT_COMMIT-AUTHOR-EMAIL)
  echo "original commit_author_name=$commit_author_name"
  echo "original commit_author_email=$commit_author_email"

  # 'Name here <emailhere@example.org>'
  commit_author=$(printenv INPUT_COMMIT-AUTHOR)
  echo "original commit_author=$commit_author"

  if echo "$commit_author" | grep -qP '^\s*@?(github[-_])?actions?(\[bot\])?\s*$'; then
    commit_author='github-actions[bot]'
    commit_author='github-actions[bot]@users.noreply.github.com'
  fi

  if echo "$commit_author" | grep -qP '^\s*@?(me|author|self)\s*$'; then
    commit_author=$GITHUB_ACTOR
    commit_author="$GITHUB_ACTOR@users.noreply.github.com"
  fi

  if [[ -n $commit_author ]]; then
    commit_author_name=$(echo "$commit_author" | sed -r 's/^(.*) <.*>$/\1/')
    commit_author_email=$(echo "$commit_author" | sed -r 's/^.* <(.*)>$/\1/')
  fi

  if [[ -z $commit_author_name ]]; then
    commit_author_name=$(git config user.name) || true
  fi
  if [[ -z $commit_author_email ]]; then
    commit_author_email=$(git config user.email) || true
  fi

  [[ -n $commit_author_name ]] || commit_author_name='github-actions[bot]'
  [[ -n $commit_author_email ]] || commit_author_email='github-actions[bot]@users.noreply.github.com'

  echo "processed commit_author_name=$commit_author_name"
  echo "processed commit_author_email=$commit_author_email"

  commit_committer_name=$(printenv INPUT_COMMIT-COMMITTER-NAME)
  commit_committer_email=$(printenv INPUT_COMMIT-COMMITTER-EMAIL)
  echo "original commit_committer_name=$commit_committer_name"
  echo "original commit_committer_email=$commit_committer_email"

  # 'Name here <emailhere@exampleorg>'
  commit_committer=$(printenv INPUT_COMMIT-COMMITTER)
  echo "original commit_committer=$commit_committer"

  if echo "$commit_committer" | grep -qP '^\s*@?(github[-_])?actions?(\[bot\])?\s*$'; then
    commit_committer_name='github-actions[bot]'
    commit_committer_email='github-actions[bot]@users.noreply.github.com'
  fi

  if echo "$commit_committer" | grep -qP '^\s*@?(me|author|self)\s*$'; then
    commit_committer_name=$GITHUB_ACTOR
    commit_committer_email="$GITHUB_ACTOR@users.noreply.github.com"
  fi

  if [[ -n $commit_committer ]]; then
    commit_committer_name=$(echo "$commit_committer" | sed -r 's/^(.*) <.*>$/\1/')
    commit_committer_email=$(echo "$commit_committer" | sed -r 's/^.* <(.*)>$/\1/')
  fi

  if [[ -z $commit_committer_name ]]; then
    commit_committer_name=$(git config user.name) || true
  fi
  if [[ -z $commit_committer_email ]]; then
    commit_committer_email=$(git config user.email) || true
  fi

  [[ -n $commit_committer_name ]] || commit_committer_name=$commit_author_name
  [[ -n $commit_committer_email ]] || commit_committer_email=$commit_author_email

  echo "processed commit_committer_name=$commit_committer_name"
  echo "processed commit_committer_email=$commit_committer_email"

  commit_message=$(printenv INPUT_COMMIT-MESSAGE)
  echo "commit_message=$commit_message"

  commit_message_file=$(printenv INPUT_COMMIT-MESSAGE-FILE)
  echo "commit_message_file=$commit_message_file"

  commit_date=$(printenv INPUT_COMMIT-DATE)
  if [[ -n $commit_date ]]; then
    commit_date_flag="--date=$commit_date"
  fi
  echo "commit_date_flag=$commit_date_flag"

  export GIT_AUTHOR_NAME="$commit_author_name"
  export GIT_AUTHOR_EMAIL="$commit_author_email"
  export GIT_COMMITTER_NAME="$commit_committer_name"
  export GIT_COMMITTER_EMAIL="$commit_committer_email"
  if [[ -n $commit_message ]]; then
    echo "committing with message"
    git commit --message="$commit_message" --verbose $commit_date_flag
  elif [[ -n $commit_message_file ]]; then
    echo "committing with message file"
    git commit --file="$commit_message_file" --verbose $commit_date_flag
  else
    echo "committing with default message"
    git commit --message="Automated changes" --verbose $commit_date_flag
  fi
  unset GIT_AUTHOR_NAME
  unset GIT_AUTHOR_EMAIL
  unset GIT_COMMITTER_NAME
  unset GIT_COMMITTER_EMAIL
  echo "committed=true" >> $GITHUB_OUTPUT
  echo "commit-sha=$(git rev-parse HEAD)" >> $GITHUB_OUTPUT
fi

git status --verbose

push_repository=$(printenv INPUT_PUSH-REPOSITORY)
[[ -n $push_repository ]] || push_repository=$(printenv INPUT_PUSH-REPO)
[[ -n $push_repository ]] || push_repository=$(printenv INPUT_PUSH-REMOTE)
[[ -n $push_repository ]] || push_repository=$(printenv INPUT_PUSH-TO)
[[ -n $push_repository ]] || push_repository=$(printenv INPUT_PUSH-TO-REPO)
[[ -n $push_repository ]] || push_repository=$(printenv INPUT_PUSH-TO-REPOSITORY)
[[ -n $push_repository ]] || push_repository=$(printenv INPUT_PUSH-TO-REMOTE)
[[ -n $push_repository ]] || push_repository=origin
echo "push_repository=$push_repository"

if git cherry -v origin | grep -qP '^\+'; then
  push_refspec=$(printenv INPUT_PUSH-REFSPEC)
  [[ -n $push_refspec ]] || push_refspec=$(printenv INPUT_PUSH-REF)
  [[ -n $push_refspec ]] || push_refspec=$(printenv INPUT_PUSH-BRANCH)
  [[ -n $push_refspec ]] || push_refspec=$(printenv INPUT_PUSH-TAG)
  echo "original push_refspec=$push_refspec"

  push_all=$(printenv INPUT_PUSH-ALL)
  if [[ $push_all == 1 || $push_all == true ]]; then
    push_refspec='all'
  fi
  if [[ $push_refspec == all ]]; then
    push_refspec='--all'
  fi
  if [[ $push_refspec != '--all' ]]; then
    if [[ -z $push_refspec ]]; then
      push_refspec=$(git symbolic-ref HEAD)
    fi

    if [[ $push_refspec != HEAD:* ]]; then
      push_refspec="HEAD:$push_refspec"
    fi
  fi

  echo "processed push_refspec=$push_refspec"

  push_force=$(printenv INPUT_PUSH-FORCE)
  if [[ $push_force == 1 || $push_force == true ]]; then
    push_force_flag='--force'
  fi
  echo "push_force_flag=$push_force_flag"

  if [[ -n $push_refspec ]]; then
    echo "pushing with refspec"
    git push "$push_repository" "$push_refspec" $push_force_flag --verbose
  else
    echo "pushing with no refspec"
    git push "$push_repository" $push_force_flag --verbose
  fi
  echo "pushed=true" >> $GITHUB_OUTPUT
else
  echo 'No changes to push'
  echo "pushed=false" >> $GITHUB_OUTPUT
fi

git status --verbose
