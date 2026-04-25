# Runbook — `.env.production` security emergency

> The board audit (2026-04-24) flagged `.env.production` as committed
> to the repo with **real production secrets**. This is a Severity-1
> security incident. This runbook is the playbook for resolution.
>
> **Owner:** Phill McGurk. Agent assists; Phill executes the destructive
> steps.
>
> **NOT LEGAL ADVICE.** If any data breach is suspected, OAIC NDB scheme
> obligations may apply (see `.claude/rules/compliance.md` §4).

## What's exposed

`.env.production` (still tracked in git history) contains live values for:

- `NEXTAUTH_SECRET` — JWT signing secret
- `OPENAI_API_KEY` — billable
- `GEMINI_API_KEY` — billable
- `DATABASE_URL` — Supabase Postgres connection string (includes password)
- `SUPABASE_SERVICE_ROLE_KEY` — full DB bypass key
- `SUPABASE_JWT_SECRET` — auth signing secret

Anyone with read access to the repo's git history (current + former
collaborators, leaked clones, GitHub-cached snapshots) has these values.

## Phase 1 — rotate every key (do FIRST, before any history surgery)

**Goal:** make the leaked values worthless before touching git history.

### 1.1 Supabase (most critical)

1. Open Supabase dashboard → Settings → API.
2. **Reset service-role key** — generates new `SUPABASE_SERVICE_ROLE_KEY`. Old key invalidated immediately.
3. **Reset JWT secret** — generates new `SUPABASE_JWT_SECRET`. All currently-issued user sessions invalidated; users must re-login.
4. **Rotate DB password** — Settings → Database → Reset database password. Supabase rebuilds the connection string. New `DATABASE_URL`.

### 1.2 NextAuth secret

1. Generate a new value: `openssl rand -base64 32`.
2. Anything signed with the old `NEXTAUTH_SECRET` is invalidated; users must re-login.

### 1.3 OpenAI key

1. https://platform.openai.com/api-keys → revoke the leaked key.
2. Create a new key with the same scopes. **Tag it with the date of issue.**
3. Check OpenAI usage logs for unauthorised activity in the past 90 days.

### 1.4 Gemini / Google AI Studio key

1. https://aistudio.google.com/apikey → revoke the leaked key.
2. Create a new key. Restrict by IP or referrer if the consumer is known.
3. Check Google Cloud Console → Billing for unauthorised activity.

### 1.5 Update Vercel env vars

For each rotated key:

```bash
vercel env rm <KEY_NAME> production
vercel env add <KEY_NAME> production
```

Or via the Vercel dashboard: Settings → Environment Variables → edit each → Production scope.

**Verify:** redeploy production, hit `/api/health` (or any auth-gated route) and confirm the new keys work.

### 1.6 Local `.env.local`

Update `.env.local` with the new values so local dev still works.

## Phase 2 — remove `.env.production` from the repo

**Goal:** stop the file ever being committed again.

### 2.1 Add to `.gitignore`

```bash
echo ".env.production" >> .gitignore
echo ".env.production.local" >> .gitignore
echo ".env*.local" >> .gitignore
```

### 2.2 Remove from working tree (preserves the file locally)

```bash
git rm --cached .env.production
git commit -m "chore(security): stop tracking .env.production"
git push
```

After this commit, the file is no longer tracked but the local copy persists. **The git history still contains every old version of the file — Phase 3 deals with that.**

## Phase 3 — purge `.env.production` from git history

**Goal:** remove the leaked values from every commit in history.

**This rewrites history. Coordinate with every collaborator beforehand.** Anyone who has cloned the repo will need to delete and re-clone after this lands.

### 3.1 Recommended: BFG Repo-Cleaner

```bash
# Install BFG (one-time): https://rtyley.github.io/bfg-repo-cleaner/
bfg --delete-files .env.production
git reflog expire --expire=now --all
git gc --prune=now --aggressive
git push --force --all
git push --force --tags
```

### 3.2 Alternative: git-filter-repo

```bash
pip install git-filter-repo
git filter-repo --path .env.production --invert-paths
git push --force --all
git push --force --tags
```

### 3.3 Force-push consequences

- All open PRs need rebasing.
- All cloned working copies become stale; collaborators must `git fetch` + reset or re-clone.
- GitHub may keep cached references for ~30-90 days; the keys are already rotated so this is acceptable lag.

### 3.4 Verify removal

```bash
git log --all --full-history --diff-filter=D -- .env.production
# Should print nothing.
git rev-list --all | xargs -I {} git grep "<known-leaked-key-fragment>" {} 2>/dev/null
# Should print nothing.
```

## Phase 4 — install gitleaks pre-commit + CI

**Goal:** prevent the next leak.

### 4.1 Pre-commit hook

`.husky/pre-commit` — add:

```bash
#!/usr/bin/env sh
. "$(dirname -- "$0")/_/husky.sh"

gitleaks protect --staged --redact --no-banner || {
  echo "gitleaks: secrets found in staged changes — refusing to commit."
  exit 1
}
```

### 4.2 CI workflow

`.github/workflows/gitleaks.yml`:

```yaml
name: gitleaks
on: [pull_request, push]
jobs:
  gitleaks:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
        with: { fetch-depth: 0 }
      - uses: gitleaks/gitleaks-action@v2
        env:
          GITHUB_TOKEN: ${{ secrets.GITHUB_TOKEN }}
```

Already-leaked secrets are listed in `.gitleaks.toml` allowlist (after rotation, they'd report false positives forever).

## Phase 5 — incident postmortem

Within 7 days, write a postmortem under `docs/incidents/2026-05-XX-env-production-leak.md` covering:

- Detection date / how
- Exposure window (when first committed → rotation date)
- Affected secrets + rotation timestamps
- Whether unauthorised use was detected (OpenAI usage spike, Supabase row reads, etc.)
- NDB applicability (any client PII accessed via the leaked DB key?)
- Process changes (gitleaks on push, env-var review checklist for new repos)

## Notification obligations (NOT LEGAL ADVICE)

If — after investigation — there is reason to believe an unauthorised
party accessed client PII via the leaked credentials, **OAIC NDB scheme
obligations apply** (Privacy Act 1988 Cth, Part IIIC). Counsel should
be involved before any decision on notification timing.

## Estimated time

- Phase 1: 2-3 hours (key rotation across 5 services + Vercel deploy + verification)
- Phase 2: 15 minutes
- Phase 3: 30-60 minutes (BFG run + force push + collaborator coordination)
- Phase 4: 30 minutes
- Phase 5: 1-2 hours (postmortem write-up)

**Total:** about a half-day if done in one focused block. Recommended.

## Status

- [ ] Phase 1 — keys rotated
- [ ] Phase 2 — file untracked
- [ ] Phase 3 — history purged
- [ ] Phase 4 — gitleaks installed
- [ ] Phase 5 — postmortem written
