#!/usr/bin/env bash
# Migration gate for .github/workflows/auto-deploy.yml.
#
# Asks the TARGET database which migrations it is missing (`prisma migrate
# status`, read-only), applies them, then refuses to continue unless the
# database reports it is up to date. It does not look at git history: a
# database missing an OLDER migration is caught the same as one missing a new
# one. If the migration state cannot be read (bad credentials, unreachable
# host, failed or diverged history) the gate fails closed — an unknown state
# is never treated as "nothing pending".
#
# Writes to $GITHUB_OUTPUT:
#   applied_count  number of migrations this run applied
#   applied_names  their names, space-separated
#
# PRISMA overrides the prisma command (tests use a fake binary).
set -uo pipefail

PRISMA="${PRISMA:-npx prisma}"
OUT="${GITHUB_OUTPUT:-/dev/null}"

status() {
  STATUS_OUT="$($PRISMA migrate status 2>&1)"
  STATUS_RC=$?
  printf '%s\n' "$STATUS_OUT"
}

# Pending migration names, or non-zero when the output is not the plain
# "database is behind" report.
pending_names() {
  printf '%s\n' "$STATUS_OUT" | awk '
    /^Following migrations? have not yet been applied:$/ { on = 1; found = 1; next }
    on && /^$/ { exit }
    on { print }
    END { exit found ? 0 : 1 }'
}

# Check only shape: never echo a connection string or derive diagnostics from it.
check_secret_shape() {
  local name="$1" value="$2" defect=""
  if [[ -z "$value" ]]; then
    defect="empty"
  elif [[ "$value" == [[:space:]]* || "$value" == *[[:space:]] || "$value" == *$'\n'* || "$value" == *$'\r'* ]]; then
    defect="leading or trailing whitespace or a newline"
  elif [[ "$value" == \"*\" || "$value" == \'*\' ]]; then
    defect="wrapped in single or double quotes"
  elif [[ "$value" == "$name="* ]]; then
    defect="starts with its own name followed by ="
  elif [[ "$value" != postgresql://* && "$value" != postgres://* ]]; then
    defect="does not start with postgresql:// or postgres://"
  fi
  if [[ -n "$defect" ]]; then
    printf '::error::%s: %s; re-save the secret as the bare connection string, starting postgresql://.\n' "$name" "$defect"
    return 1
  fi
}

# Read only the two database keys as literal text, never as shell code.
if [[ "${VERCEL_ENV_FILE+x}" == x ]]; then
  if [[ ! -f "$VERCEL_ENV_FILE" ]]; then
    printf '::error::VERCEL_ENV_FILE is missing; cannot read the Vercel production environment.\n'
    exit 1
  fi
  unset DATABASE_URL DIRECT_URL
  while IFS= read -r line || [[ -n "$line" ]]; do
    case "$line" in
      DATABASE_URL=*|DIRECT_URL=*)
        name="${line%%=*}"
        value="${line#*=}"
        if [[ "$value" == \"*\" && "${#value}" -ge 2 ]]; then
          value="${value:1:${#value}-2}"
        fi
        export "$name=$value"
        ;;
    esac
  done < "$VERCEL_ENV_FILE"
  if [[ "${DATABASE_URL+x}" != x ]]; then
    printf '::error::DATABASE_URL is not in the Vercel production environment (or is marked Sensitive, which vercel pull cannot read)\n'
    exit 1
  fi
fi

PREFLIGHT_RC=0
check_secret_shape DATABASE_URL "${DATABASE_URL-}" || PREFLIGHT_RC=1
if [[ "${DIRECT_URL+x}" == x ]]; then
  check_secret_shape DIRECT_URL "$DIRECT_URL" || PREFLIGHT_RC=1
fi
if [[ "$PREFLIGHT_RC" -ne 0 ]]; then
  exit 1
fi

status
if [ "$STATUS_RC" -eq 0 ]; then
  PENDING=""
elif printf '%s\n' "$STATUS_OUT" | grep -qE 'have failed|are different|not managed by Prisma Migrate'; then
  echo "::error::Migration history on the target database is failed or diverged. Refusing to deploy."
  exit 1
elif ! PENDING="$(pending_names)"; then
  echo "::error::Could not read migration state from the target database (see output above). Refusing to deploy: an unreadable database is not proof that nothing is pending. Check credentials, connectivity and migration history for DATABASE_URL / DIRECT_URL."
  exit 1
fi

COUNT=0
NAMES=""
if [ -n "$PENDING" ]; then
  COUNT="$(printf '%s\n' "$PENDING" | grep -c .)"
  NAMES="$(printf '%s\n' "$PENDING" | paste -sd' ' -)"
  echo "::notice::$COUNT pending migration(s) on the target database: $NAMES"
  if ! $PRISMA migrate deploy; then
    echo "::error::prisma migrate deploy failed with $COUNT pending migration(s). Refusing to deploy."
    exit 1
  fi
fi

status
if [ "$STATUS_RC" -ne 0 ]; then
  echo "::error::Target database is still not up to date after migrate deploy. Refusing to deploy."
  exit 1
fi

{
  echo "applied_count=$COUNT"
  echo "applied_names=$NAMES"
} >> "$OUT"
echo "Migration gate passed: database up to date ($COUNT applied this run)."
