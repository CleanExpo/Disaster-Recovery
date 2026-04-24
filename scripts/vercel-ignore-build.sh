#!/usr/bin/env bash
# ==============================================================================
# Vercel `ignoreCommand` — controls whether a deployment build proceeds.
#
# Wired via vercel.json:  "ignoreCommand": "bash scripts/vercel-ignore-build.sh"
#
# Exit-code semantics (Vercel docs):
#   exit 1  => build proceeds
#   exit 0  => build is SKIPPED
#
# Rules (in order):
#   1. Always build `main` (production deploys must always run).
#   2. For any non-main branch, SKIP the build if the commit only touches
#      documentation / markdown / proposals / memory / language files.
#   3. Otherwise build.
#
# Why: Foundation Sprint cost audit (24/04/2026) showed ~344 build hours /
# month on this project. Docs-only commits trigger preview builds that cost
# money but produce no meaningful deploy. This script cuts that noise.
#
# To temporarily disable (force all builds to run), set BYPASS_VERCEL_IGNORE=1
# in the Vercel project env.
# ==============================================================================

set -euo pipefail

if [ "${BYPASS_VERCEL_IGNORE:-0}" = "1" ]; then
  echo "BYPASS_VERCEL_IGNORE=1 — build proceeds unconditionally"
  exit 1
fi

BRANCH="${VERCEL_GIT_COMMIT_REF:-}"

# Rule 1: Always build main
if [ "$BRANCH" = "main" ]; then
  echo "branch=main — build proceeds"
  exit 1
fi

# Rule 2: Non-main — skip if docs-only
#
# `git diff --quiet` returns 0 if the diff (after excludes) is empty, 1 otherwise.
# If empty => only docs changed => skip.
# If non-empty => real code changed => build.
#
# Excludes the following as "no build needed":
#   - Any markdown file anywhere (*.md)
#   - docs/ tree
#   - proposals/ tree (DR-Sandbox-style proposal docs copied here)
#   - MEMORY.md at repo root (operational memory file)
#   - UBIQUITOUS_LANGUAGE.md at repo root (domain glossary)
#   - CONTRIBUTING.md, AGENTS.md, README.md — repo-root docs
if git diff --quiet HEAD^ HEAD -- \
    ':(exclude)*.md' \
    ':(exclude)**/*.md' \
    ':(exclude)docs/' \
    ':(exclude)proposals/' \
    ':(exclude)MEMORY.md' \
    ':(exclude)UBIQUITOUS_LANGUAGE.md' \
    ':(exclude)CONTRIBUTING.md' \
    ':(exclude)AGENTS.md' \
    ':(exclude)README.md' \
    2>/dev/null; then
  echo "branch=$BRANCH — docs-only change — skipping build"
  exit 0
fi

echo "branch=$BRANCH — code changes detected — build proceeds"
exit 1
