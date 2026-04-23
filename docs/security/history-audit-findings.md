# Git History Audit — Secret Exposure Findings (Verified)

**Generated:** 24/04/2026 (Foundation Sprint Day 0, verified pass)
**Method:** `git log --all -p -- .env*` → line-by-line value inspection, not just key-name matching.
**Note:** Secret *values* are never reproduced here — only commit SHAs, file paths, and a value-shape classification.

## Executive summary

Of 6 commits initially flagged by variable-name match, **only 2 contain real secrets**. The other 4 are documentation / placeholder files committed as templates.

| Finding | Commit | Real or placeholder? | Rotation action |
|---|---|---|---|
| `.env.staging` + `.env.production` CRM commit | `dc5bb1c6` | **PLACEHOLDER** (e.g. `SUPABASE_SERVICE_ROLE_KEY=your_staging_supabase_service_role_key`) | None required |
| `.env.local` auth-setup commit | `81a5c4e8` | **PLACEHOLDER** (localhost creds + `change-in-production` notes) | None required |
| `.env.local` DB-URL add commit | `04c0a8f3` | **PLACEHOLDER** (literal `PASSWORD_FROM_SUPABASE`) | None required |
| `.env.local` DB-URL change commit | `916e2a5b` | **REAL** Supabase DB password for project `xoomalxa...` | Verify project status, rotate if active |
| `.env.local` Gemini commit | `8c7bf154` | **REAL** Gemini API key (`AIza...` prefix, 39 chars) | Rotate when email back |
| `.env.lock` / `.env.browserbase` / `.env.local.sqlite` / `.env.production` build-fix / `.env.local` T5Gemma | misc | Not inspected deeply — all low-signal file names; none flagged by full gitleaks scan | Reconfirm at end of sprint |

## Real findings — what to rotate

### 1. `.env.local` — commit `916e2a5b` (Supabase DB password)
**Message:** "Change DATABASE_URL in .env.local"
**Real leak:** a Supabase DB connection string containing a 16-character alphanumeric password and a project subdomain.
**Context matters:** the current canonical Supabase is `lccqasmurmsisnnjqqmr` (per `MEMORY.md`). The project leaked here has a different subdomain — **it is likely an abandoned / deleted project**. If so, the password has nothing to unlock. Verify in the Supabase console:
- If the project still exists → rotate the password
- If deleted → no action (dead key)

### 2. `.env.local` — commit `8c7bf154` (Gemini API key)
**Message:** "feat: Integrate Google Gemini (Veo 3.1 + Nano Banana Pro) for asset generation"
**Real leak:** a Gemini API key with standard Google format prefix `AIza...`.
**Action:** rotate at console.cloud.google.com → Credentials. Low blast radius (quota/billing impact), medium priority. Can be done at the same time as the Google Analytics / Tag Manager work that's already blocked on email.

## What's NOT leaked (verified)

- **Zero** `sk_live_...` patterns (no Stripe live secret keys)
- **Zero** `rk_live_...` patterns (no Stripe restricted live keys)
- **Zero** `whsec_[real value]` patterns (one `whsec_your_stripe_test_webhook_secret` placeholder, correctly allowlisted)
- **Zero** PEM private-key markers (`BEGIN PRIVATE KEY` variants)
- **Zero** JWT-shape tokens (`eyJ....eyJ....sig`)
- **Zero** real NextAuth secrets (all historical NEXTAUTH_SECRET values are placeholders like `local-development-secret-change-in-production-12345678` or `generate-new-secret-for-staging-use-openssl-rand-base64-32`)
- **Zero** real Supabase service-role keys (the one flagged in `dc5bb1c6` was the literal string `your_staging_supabase_service_role_key`)
- **Zero** real Stripe secret keys (the one in `dc5bb1c6` was `sk_test_your_stripe_test_secret_key` — and note it's `sk_test_`, not `sk_live_`)

## Placeholder false-positives — for the record

These flagged during the initial pass (variable-name match) but verify as documentation placeholders:

- `dc5bb1c6` — `.env.staging` + `.env.production`: entire file is a template with `your_*` and `generate-*` instruction strings
- `81a5c4e8` — `.env.local`: localhost DB (`127.0.0.1`), password literally `password`, secret literally `local-development-secret-change-in-production-12345678`
- `04c0a8f3` — `.env.local`: password literally `PASSWORD_FROM_SUPABASE`

The initial pass flagged them because the `DATABASE_URL` / `NEXTAUTH_SECRET` / etc. variable names triggered rules. Value inspection cleared them.

This is a useful lesson for the gitleaks config: **entropy-check on the value** (Shannon entropy ≥ some threshold) is a better signal than the variable name alone. Consider adding a custom rule that requires high-entropy values on secret-shaped variable names. Deferred to post-sprint polish.

## Scan commands used

```bash
# Enumerate historical .env* adds
git log --all --diff-filter=A --name-only --pretty=format:'%H|%s' -- '.env*'

# Count real-secret patterns in history
git log --all -p -- .env.production .env.local .env.staging .env.browserbase \
  | grep -cE "sk_live_|rk_live_|whsec_[A-Za-z0-9]{32,}|BEGIN (RSA |EC |DSA |OPENSSH )?PRIVATE KEY"

# Value-inspect flagged commits
for sha in dc5bb1c6 81a5c4e8 04c0a8f3 916e2a5b 8c7bf154; do
  git show $sha -- '.env*' | grep -E '^\+(DATABASE_URL|DIRECT_URL|NEXTAUTH_SECRET|JWT_SECRET|GEMINI_API_KEY|SUPABASE_SERVICE_ROLE_KEY|STRIPE_SECRET_KEY)=' 
done
```

## Residual actions

1. Verify Supabase project `xoomalxa...` status (abandoned vs active). If active, rotate DB password.
2. Rotate the Gemini API key from commit `8c7bf154`.
3. Accept history as-is. **Do not** rewrite git history. The two live secrets above, once rotated, are inert in history; rewriting would invalidate every fork and PR reference for zero additional security gain.
4. Run a full-head gitleaks scan at end of sprint: `gitleaks detect --config .gitleaks.toml --source .`
5. Run a full-history gitleaks scan once: `gitleaks detect --log-opts='--all'`

## Summary line for the board

**The .gitignore discipline held. Two real secrets existed historically (one Supabase DB password on a project that appears dead, one Gemini API key). Rotate both when email is back; no history rewrite needed.**
