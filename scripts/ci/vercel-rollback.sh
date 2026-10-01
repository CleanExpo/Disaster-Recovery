#!/usr/bin/env bash
# Rollback contract for .github/workflows/auto-deploy.yml.
#
#   vercel-rollback.sh record
#     Reads the deployment the production alias serves right now and writes
#     id=<dpl_...> and url=<host> to $GITHUB_OUTPUT. Fails if it cannot, so a
#     deploy never goes out without a known rollback target.
#
#   vercel-rollback.sh rollback
#     Rolls back to PREVIOUS_URL, then polls the production alias until it
#     serves PREVIOUS_ID. A homepage 200 is not accepted as proof. If
#     APPLIED_COUNT > 0 it says plainly that the database schema was NOT
#     rolled back.
#
# Env: VERCEL_TOKEN, VERCEL_ORG_ID, PROD_ALIAS (default disasterrecovery.com.au)
#      rollback: PREVIOUS_ID, PREVIOUS_URL, APPLIED_COUNT, APPLIED_NAMES
#      VERCEL (CLI command), VERCEL_API, VERIFY_ATTEMPTS, VERIFY_INTERVAL
set -uo pipefail

PROD_ALIAS="${PROD_ALIAS:-disasterrecovery.com.au}"
VERCEL_API="${VERCEL_API:-https://api.vercel.com}"
VERCEL="${VERCEL:-vercel}"
OUT="${GITHUB_OUTPUT:-/dev/null}"

# Prints "<deployment id> <deployment url>" for what PROD_ALIAS serves now.
served() {
  # shellcheck disable=SC2016 # the ${...} below are JavaScript, not shell
  node -e '
    const [api, alias, team] = process.argv.slice(1);
    fetch(`${api}/v4/aliases/${encodeURIComponent(alias)}?teamId=${encodeURIComponent(team)}`, {
      headers: { Authorization: `Bearer ${process.env.VERCEL_TOKEN}` },
    })
      .then(async (r) => {
        if (!r.ok) throw new Error(`HTTP ${r.status}`);
        const a = await r.json();
        const id = a.deploymentId || (a.deployment && a.deployment.id);
        const url = a.deployment && a.deployment.url;
        if (!id || !url) throw new Error("alias response has no deployment");
        console.log(`${id} ${url}`);
      })
      .catch((e) => { console.error(`alias lookup failed: ${e.message}`); process.exit(1); });
  ' "$VERCEL_API" "$PROD_ALIAS" "${VERCEL_ORG_ID:-}"
}

case "${1:-}" in
  record)
    if ! CUR="$(served)" || [ -z "$CUR" ]; then
      echo "::error::Could not read the deployment $PROD_ALIAS serves. Refusing to deploy without a rollback target."
      exit 1
    fi
    read -r ID URL <<< "$CUR"
    { echo "id=$ID"; echo "url=$URL"; } >> "$OUT"
    echo "Rollback target recorded: $ID ($URL)"
    ;;

  rollback)
    APPLIED_COUNT="${APPLIED_COUNT:-0}"
    if [ "$APPLIED_COUNT" != "0" ]; then
      echo "::error::schema NOT rolled back — $APPLIED_COUNT migration(s) applied this run: ${APPLIED_NAMES:-unknown}. The rolled-back code now runs against the NEW schema. Check the database by hand."
    fi
    if [ -z "${PREVIOUS_ID:-}" ] || [ -z "${PREVIOUS_URL:-}" ]; then
      echo "::error::No previous deployment was recorded. Refusing a blind rollback — manual intervention required."
      exit 1
    fi
    echo "Rolling back $PROD_ALIAS to $PREVIOUS_ID ($PREVIOUS_URL)..."
    if ! $VERCEL rollback "$PREVIOUS_URL" --token="${VERCEL_TOKEN:-}" --scope="${VERCEL_ORG_ID:-}"; then
      echo "::error::vercel rollback failed."
      exit 1
    fi
    ATTEMPTS="${VERIFY_ATTEMPTS:-12}"
    NOW=""
    for _ in $(seq 1 "$ATTEMPTS"); do
      NOW="$(served | awk '{print $1}')"
      if [ "$NOW" = "$PREVIOUS_ID" ]; then
        echo "Rollback verified: $PROD_ALIAS serves $PREVIOUS_ID."
        exit 0
      fi
      sleep "${VERIFY_INTERVAL:-10}"
    done
    echo "::error::Rollback NOT verified: $PROD_ALIAS serves ${NOW:-unknown}, expected $PREVIOUS_ID."
    exit 1
    ;;

  *)
    echo "usage: $0 record|rollback" >&2
    exit 2
    ;;
esac
