#!/usr/bin/env bash
# Called only for pushes to main by the final auto-deploy job.
# GH overrides the GitHub CLI for tests; job results come from needs.*.result.
set -euo pipefail

GH="${GH:-gh}"
FAILED=""
ALL_GREEN=true
for job in validate migrate deploy smoke-test; do
  case "$job" in
    validate) result="${VALIDATE_RESULT:-}" ;;
    migrate) result="${MIGRATE_RESULT:-}" ;;
    deploy) result="${DEPLOY_RESULT:-}" ;;
    smoke-test) result="${SMOKE_TEST_RESULT:-}" ;;
  esac
  if [[ "$result" == failure ]]; then
    FAILED="${FAILED:+$FAILED, }$job"
  fi
  if [[ "$result" != success ]]; then
    ALL_GREEN=false
  fi
done

# Skipped/cancelled jobs alone prove neither failure nor successful recovery.
if [[ -z "$FAILED" && "$ALL_GREEN" != true ]]; then
  exit 0
fi

RUN_URL="${GITHUB_SERVER_URL:-https://github.com}/${GITHUB_REPOSITORY:?}/actions/runs/${GITHUB_RUN_ID:?}"
SHA="${GITHUB_SHA:?}"
ISSUES="$("$GH" issue list --repo "$GITHUB_REPOSITORY" --state open --label deploy-blocked --limit 100 --json number --jq '.[].number')"

if [[ -n "$FAILED" ]]; then
  BODY="Production deploy blocked on main.
Run: $RUN_URL
Head SHA: $SHA
Failed jobs: $FAILED"
  if [[ -n "$ISSUES" ]]; then
    # Reuse the first open incident instead of creating another.
    ISSUE="${ISSUES%%$'\n'*}"
    "$GH" issue comment "$ISSUE" --body "$BODY" --repo "$GITHUB_REPOSITORY"
  else
    LABEL="$("$GH" label list --repo "$GITHUB_REPOSITORY" --search deploy-blocked --json name --jq '.[] | select(.name == "deploy-blocked") | .name')"
    if [[ -z "$LABEL" ]]; then
      "$GH" label create deploy-blocked --description 'Production deployment blocked on main' --color B60205 --repo "$GITHUB_REPOSITORY"
    fi
    "$GH" issue create --title 'Production deploy blocked on main' --label deploy-blocked --body "$BODY" --repo "$GITHUB_REPOSITORY"
  fi
else
  while IFS= read -r issue; do
    [[ -n "$issue" ]] || continue
    "$GH" issue close "$issue" --comment "Production recovered: $SHA is now live. All deploy gates succeeded. Run: $RUN_URL" --repo "$GITHUB_REPOSITORY"
  done <<< "$ISSUES"
fi
