#!/usr/bin/env bash
# scripts/smoke-test.sh
#
# Orchestrates smoke tests against a Vercel preview deployment.
#
# Usage:
#   SMOKE_BASE_URL=https://dr-preview-xxx.vercel.app ./scripts/smoke-test.sh
#
# Optional env vars:
#   VERCEL_AUTOMATION_BYPASS_SECRET   — Vercel deployment protection bypass token
#   SMOKE_TIMEOUT_MS                  — Per-test timeout in ms (default: 30000)
#   SMOKE_RETRIES                     — Number of retries per test (default: 1)
#
# Exit codes:
#   0 — all smoke tests passed
#   1 — one or more tests failed

set -euo pipefail

# ── Validation ────────────────────────────────────────────────────────────────

if [[ -z "${SMOKE_BASE_URL:-}" ]]; then
  echo "ERROR: SMOKE_BASE_URL is required."
  echo "Usage: SMOKE_BASE_URL=https://your-preview.vercel.app ./scripts/smoke-test.sh"
  exit 1
fi

echo "────────────────────────────────────────────────"
echo "  DR Smoke Test Suite"
echo "  Target: ${SMOKE_BASE_URL}"
echo "────────────────────────────────────────────────"

# ── Pre-flight: verify the deployment is responding ──────────────────────────

echo ""
echo "[1/3] Pre-flight: checking deployment liveness..."

MAX_WAIT=120
INTERVAL=5
ELAPSED=0
HTTP_STATUS=""

while [[ $ELAPSED -lt $MAX_WAIT ]]; do
  HTTP_STATUS=$(curl -s -o /dev/null -w "%{http_code}" \
    -H "x-vercel-protection-bypass: ${VERCEL_AUTOMATION_BYPASS_SECRET:-}" \
    "${SMOKE_BASE_URL}/" 2>/dev/null || echo "000")

  if [[ "$HTTP_STATUS" == "200" ]]; then
    echo "  Deployment live (HTTP 200) after ${ELAPSED}s"
    break
  fi

  echo "  Waiting for deployment... (HTTP ${HTTP_STATUS}, ${ELAPSED}s elapsed)"
  sleep $INTERVAL
  ELAPSED=$((ELAPSED + INTERVAL))
done

if [[ "$HTTP_STATUS" != "200" ]]; then
  echo "ERROR: Deployment did not become live within ${MAX_WAIT}s (last status: ${HTTP_STATUS})"
  exit 1
fi

# ── Install Playwright browsers if needed ────────────────────────────────────

echo ""
echo "[2/3] Ensuring Playwright Chromium browser is installed..."
npx playwright install chromium --with-deps 2>&1 | tail -5

# ── Run smoke tests ───────────────────────────────────────────────────────────

echo ""
echo "[3/3] Running smoke tests..."
echo ""

export SMOKE_BASE_URL
export VERCEL_AUTOMATION_BYPASS_SECRET="${VERCEL_AUTOMATION_BYPASS_SECRET:-}"

TIMEOUT_MS="${SMOKE_TIMEOUT_MS:-30000}"
RETRIES="${SMOKE_RETRIES:-1}"

if npx playwright test \
  --config=playwright.smoke.config.ts \
  --timeout="${TIMEOUT_MS}" \
  --retries="${RETRIES}" \
  --reporter=list; then
  echo ""
  echo "────────────────────────────────────────────────"
  echo "  SMOKE TESTS PASSED"
  echo "  Deployment is safe to promote to production."
  echo "────────────────────────────────────────────────"
  exit 0
else
  echo ""
  echo "────────────────────────────────────────────────"
  echo "  SMOKE TESTS FAILED"
  echo "  Do NOT merge this PR. Review the test report."
  echo "────────────────────────────────────────────────"
  exit 1
fi
