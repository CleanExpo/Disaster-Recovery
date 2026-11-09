# Git History Audit — Secret Exposure Findings (Verified)

**Generated:** 24/04/2026 (Foundation Sprint Day 0, verified pass)
**Method:** `git log --all -p -- .env*` → line-by-line value inspection, not just key-name matching.
**Note:** Secret *values* are never reproduced here — only commit SHAs, file paths, and a value-shape classification.

## Correction, 09/11/2026 — this audit missed a live service-role key

The 24/04/2026 pass below only inspected `.env*` files. A full-history scan on 09/11/2026 (gitleaks 8.30.1 over all refs, plus GitHub secret scanning) found secrets in other files, including one that was **live**. Two statements in "What's NOT leaked" were wrong and are struck through below.

| GitHub alert | Type | Where (commit) | Status on 09/11/2026 | Evidence |
|---|---|---|---|---|
| #3 | Supabase key, `role=service_role`, project `lccqasmurmsisnnjqqmr` (the canonical project) | `scripts/run-migration-via-rest.js`, `scripts/check-tables-quick.js` (`e1138f33`) | **Was LIVE.** Legacy JWT keys disabled and new keys issued by the founder about 14:29 AEST; leaked key now rejected | REST probe HTTP 200 before, HTTP 401 after; alert closed as revoked |
| #2 | Supabase key, `role=service_role`, same project | `.env.supabase` (`d844f12d`) | Dead | REST probe HTTP 401; alert closed as revoked |
| #1 | Google API key (the Gemini key from finding 2) | `.env.local` (`8c7bf154`, `1d9e0901`) and docs (`b6757b93` and others) | Dead | Google returned HTTP 400 `API_KEY_INVALID`; alert closed as revoked |
| #4 | Aiven service password | `prisma.config.ts` (`bf6b72e5`), `prisma/schema.prisma` (`32ca9ab7`) | Not in use by production | Absent from the current Vercel `DATABASE_URL` / `DIRECT_URL` in every environment (compared without printing). Not probed against Aiven directly. Alert closed as revoked |

Why it was missed: the scope was `.env*` files only, so committed scripts and Prisma files were never read, and the JWT pattern count ran only over `.env*` files. `.env.supabase` (alert #2) also did not appear in the April table. Future audits must scan every file in full history (`gitleaks git --log-opts='--all'`) and cross-check GitHub's secret-scanning alerts.

The Supabase DB password for project `xoomalxa...` (finding 1, `916e2a5b`) points at a project that no longer exists: on 09/11/2026 neither `xoomalxaybjjcxschhrf.supabase.co` nor `db.xoomalxaybjjcxschhrf.supabase.co` resolves in DNS, while the canonical project's host does (control). A deleted project's password cannot be used, so no rotation is needed.

## Executive summary

Of 6 commits initially flagged by variable-name match, **only 2 contain real secrets**. The other 4 are documentation / placeholder files committed as templates.

| Finding | Commit | Real or placeholder? | Rotation action |
|---|---|---|---|
| `.env.staging` + `.env.production` CRM commit | `dc5bb1c6` | **PLACEHOLDER** (e.g. `SUPABASE_SERVICE_ROLE_KEY=your_staging_supabase_service_role_key`) | None required |
| `.env.local` auth-setup commit | `81a5c4e8` | **PLACEHOLDER** (localhost creds + `change-in-production` notes) | None required |
| `.env.local` DB-URL add commit | `04c0a8f3` | **PLACEHOLDER** (literal `PASSWORD_FROM_SUPABASE`) | None required |
| `.env.local` DB-URL change commit | `916e2a5b` | **REAL** Supabase DB password for project `xoomalxa...` | None: project host no longer resolves (checked 09/11/2026) |
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
- ~~Zero JWT-shape tokens~~ **Wrong (corrected 09/11/2026):** true only for `.env*` files. Service-role JWTs were committed in `scripts/` at `e1138f33` and in `.env.supabase` at `d844f12d`. See the correction at the top.
- **Zero** real NextAuth secrets (all historical NEXTAUTH_SECRET values are placeholders like `local-development-secret-change-in-production-12345678` or `generate-new-secret-for-staging-use-openssl-rand-base64-32`)
- ~~Zero real Supabase service-role keys~~ **Wrong (corrected 09/11/2026):** the `dc5bb1c6` value was a placeholder, but a real, live service-role key for `lccqasmurmsisnnjqqmr` was in `scripts/` at `e1138f33`. It was rotated on 09/11/2026. See the correction at the top.
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

1. ~~Verify Supabase project `xoomalxa...` status (abandoned vs active). If active, rotate DB password.~~ Done on 09/11/2026: the project host no longer resolves, so the project is gone and the password is inert.
2. ~~Rotate the Gemini API key from commit `8c7bf154`.~~ Done: confirmed dead on 09/11/2026 (Google HTTP 400 `API_KEY_INVALID`).
3. Accept history as-is. **Do not** rewrite git history. The one confirmed live secret (the service-role key, alert #3) was rotated on 09/11/2026, the Gemini key and the other Supabase key are dead, the `xoomalxa...` password belongs to a project that no longer exists, and the Aiven password is not used by production (not probed against Aiven itself). Rotation, not rewriting, is what neutralises a leak that is already public; rewriting would invalidate every fork and PR reference for zero additional security gain.
4. Run a full-head gitleaks scan at end of sprint: `gitleaks detect --config .gitleaks.toml --source .`
5. ~~Run a full-history gitleaks scan once: `gitleaks detect --log-opts='--all'`~~ Done on 09/11/2026; results in the correction at the top.

## Summary line for the board

~~The .gitignore discipline held. Two real secrets existed historically (one Supabase DB password on a project that appears dead, one Gemini API key). Rotate both when email is back; no history rewrite needed.~~

**Corrected 09/11/2026:** the April summary was wrong. A live service-role key for the canonical Supabase project sat in public history in `scripts/` until it was rotated on 09/11/2026. The Gemini key and the other leaked Supabase key are dead, and the Aiven password is not used by production. All four GitHub secret-scanning alerts are closed. The `xoomalxa...` DB password belongs to a project that no longer exists. Still no history rewrite: rotation is what neutralises a leak in public history.
