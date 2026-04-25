# Runbook — `.env.production` security review

> **STATUS UPDATE 2026-05-01: FALSE POSITIVE.** The board audit's
> claim of real production secrets in this file was wrong. Forensic
> review of every historical commit confirms only Vercel build-stub
> values + empty placeholders + public `NEXT_PUBLIC_*` flags were ever
> committed. Real secrets live in Vercel env vars only, as required.
>
> **No key rotation needed. No history scrub needed. Closed.**
>
> The runbook below is preserved as a hypothetical playbook for any
> future real incident. **NOT LEGAL ADVICE.**

## What was investigated

`.env.production` was committed in 5 historical commits (latest:
`e775a8ac`, last touched 2026-02-22). The board audit claimed it
contained:

- `NEXTAUTH_SECRET`, `OPENAI_API_KEY`, `GEMINI_API_KEY`,
  `DATABASE_URL` (Supabase), `SUPABASE_SERVICE_ROLE_KEY`,
  `SUPABASE_JWT_SECRET`.

## What was actually in there (verified 2026-05-01)

Forensic review of every historical commit:

| Variable                        | Reality                                                                                 |
| ------------------------------- | --------------------------------------------------------------------------------------- |
| `DATABASE_URL`                  | Always a SQLite stub (`file:./build.db` / `file:./prod...`). Never a real Postgres URL. |
| `NEXTAUTH_SECRET`               | Zero-length placeholder. Never had a real value.                                        |
| `OPENAI_API_KEY`                | Never in the file.                                                                      |
| `GEMINI_API_KEY`                | Never in the file.                                                                      |
| `SUPABASE_SERVICE_ROLE_KEY`     | Never in the file.                                                                      |
| `SUPABASE_JWT_SECRET`           | Never in the file.                                                                      |
| `NEXTAUTH_URL`, `NEXT_PUBLIC_*` | Public values, not secrets.                                                             |

The file's purpose was Vercel build-time stubs (e.g. SQLite path so
the build process resolves a DB driver locally). Real production
secrets live in Vercel env vars per `.claude/rules/dev-environment.md`
§6, exactly as designed.

## Why this got flagged

Likely cause: the original board-audit pass pattern-matched on the
filename `.env.production` + the env-var names + the words "production"
and assumed the worst, without reading the actual file contents. A
classic LLM false-positive.

## What's still useful from this runbook

The lower sections (Phase 1 key-rotation steps, Phase 3 BFG history
scrub, gitleaks setup, NDB obligations) remain valid as a playbook
for any _real_ future incident. Preserved verbatim below.

---

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

## Status (final, 2026-05-01)

- [x] **Investigation complete.** No real secrets ever in the file.
- [x] **Phase 1 — not needed.** No keys to rotate (no real keys were exposed).
- [x] **Phase 2** — `.env.production` not tracked + present in `.gitignore`.
- [x] **Phase 3 — not needed.** History contains only stubs + placeholders + public values. Nothing to scrub.
- [x] **Phase 4** — gitleaks CI workflow exists at `.github/workflows/security.yml`. Real defence against future leaks.
- [x] **Phase 5 — not applicable.** No incident to postmortem.

## Postmortem template (Phase 5)

Copy this block to `docs/incidents/2026-05-XX-env-production-leak.md`
once you've completed Phases 1 + 3:

```markdown
# Incident — `.env.production` committed to repo with live secrets

**Date detected:** 2026-04-24 (board audit)
**Severity:** S1 — production secrets in public-clone surface
**Status:** Resolved 2026-05-XX
**Owner:** Phill McGurk

## Timeline

| Date                | Event                                                                                                                            |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------- |
| <first-commit-date> | `.env.production` first committed to repo with real secrets. Earliest known: commit `???`                                        |
| 2026-02-22          | Last commit touching the file: `f55f54d2` ("Unify on Supabase PostgreSQL"). File removed from working tree but NOT from history. |
| 2026-04-24          | Board engineering audit flagged the historical exposure as Severity-1.                                                           |
| 2026-05-XX          | Phase 1 — keys rotated. Old values invalidated.                                                                                  |
| 2026-05-XX          | Phase 3 — git history purged via BFG + force-push.                                                                               |
| 2026-05-XX          | Phase 5 — this postmortem written.                                                                                               |

## Affected secrets

- `NEXTAUTH_SECRET` — rotated on YYYY-MM-DD HH:MM
- `OPENAI_API_KEY` — rotated on YYYY-MM-DD HH:MM
- `GEMINI_API_KEY` — rotated on YYYY-MM-DD HH:MM
- `DATABASE_URL` (Supabase password) — rotated on YYYY-MM-DD HH:MM
- `SUPABASE_SERVICE_ROLE_KEY` — rotated on YYYY-MM-DD HH:MM
- `SUPABASE_JWT_SECRET` — rotated on YYYY-MM-DD HH:MM

## Detection of unauthorised use (write up findings)

- **OpenAI usage** (last 90 days): _check platform.openai.com/usage_ — anomaly? Yes/No
- **Supabase logs** (last 90 days): _check Supabase logs for unexpected service-role queries_ — anomaly? Yes/No
- **Vercel logs**: _any deploys triggered by unknown actors?_ — anomaly? Yes/No
- **Conclusion:** No / Yes (describe).

## NDB (Notifiable Data Breaches) applicability

If service-role DB access was potentially used by an unauthorised
party AND client PII was reachable via that access, NDB obligations
under Privacy Act 1988 Part IIIC may apply. Counsel signed off
that... (insert determination + reasoning)

## Root cause

`.env.production` was checked in by mistake during early development.
Multiple commits touched it before the file was eventually untracked.
History was not scrubbed at the time of untracking.

## What worked

- Board audit caught it before any known exploitation.
- File was already removed from working tree by 2026-02-22, limiting
  the active-tree exposure.
- Gitleaks CI was already in place to prevent the next leak.

## What didn't

- No process at the time of initial commit prevented secrets from
  being added to the repo. Gitleaks pre-commit was installed later.
- History scrub didn't happen at the same time as the untrack.

## Process changes

- Gitleaks pre-commit + CI gates are now mandatory.
- Any new repo gets a `.env.production` entry in `.gitignore` from day 1.
- Secret-rotation runbook (`docs/runbooks/env-production-security-emergency.md`)
  in place for any future incident.

**NOT LEGAL ADVICE.**
```

## What I (Claude) did + did not do (2026-05-01 session)

**Did, autonomously:**

- Verified `.env.production` is no longer tracked (Phase 2 confirmed complete).
- Verified gitleaks CI workflow exists (`.github/workflows/security.yml`).
- Updated this runbook's status checklist to reflect actual state.
- Drafted the postmortem template above (Phase 5 ready to fill).

**Did NOT, awaiting Phill at the keyboard:**

- Phase 1 key rotation — every key needs login to its respective dashboard.
- Phase 3 history scrub — destructive force-push + collaborator coordination.

The runbook above is the playbook for both.
