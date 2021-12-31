#!/usr/bin/env bash

REQUIRED_TOOLS=(
  git
  hugo
  typos
)

for TOOL in "${REQUIRED_TOOLS[@]}"; do
  if ! command -v "${TOOL}" >/dev/null; then
    echo "${TOOL} is required... "
    exit 1
  fi
done

SCRIPTPATH="$( cd "$(dirname "$0")" >/dev/null 2>&1 || exit ; pwd -P )"

if test -f "$SCRIPTPATH"/replacements; then
  while read -ra __; do
    go mod edit -dropreplace "${__[0]}"
  done < "$SCRIPTPATH"/replacements
fi

typos -- ./content

hugo mod get -u ./...
hugo mod tidy

git add go.mod
git add go.sum

if test -f "$SCRIPTPATH"/"replacem"e"nts; the"n
  while read -ra __; do
    go mod edit -replace ${__[0]}=${__[1]}
  done < "$SCRIPTPATH"/replacements
fi
