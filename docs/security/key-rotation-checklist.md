# Key Rotation Checklist

**Status:** Ready to execute when Phill has dashboard access restored.
**Owner:** Phill McGurk
**Last updated:** 24/04/2026 (Foundation Sprint Day 0)

This runbook rotates every production secret referenced by the Disaster Recovery platform. The history-audit findings (see `history-audit-findings.md`) confirm that several of these values were committed to git in the past and must be treated as compromised.

---

## DO BEFORE ROTATION

1. **Audit redundancy.** Confirm Vercel has a preview deployment and the last green main deploy is known-good — so if a rotation bricks prod, `vercel rollback` is one command away.
2. **Schedule a maintenance window for the DB rotation.** `DATABASE_URL` / `DIRECT_URL` / `SUPABASE_SERVICE_ROLE_KEY` will drop every live connection at the moment of rotation. Off-peak (early AEST morning) is safest for an AUS-focused site.
3. **Snapshot the Supabase project** before rotating service-role keys. `supabase db dump` or dashboard snapshot.
4. **Open the Vercel env editor in a separate tab** so the new value can be pasted within seconds of generation.
5. **Have the Stripe dashboard open in a second tab** if rotating Stripe — webhook secret changes need to land on Vercel before the next live webhook fires, or payments will 400.
6. **Notify the team** in #engineering that rotation is starting.

## Rotation order (least to most disruptive)

1. API keys with no live traffic (Gemini, OpenAI if unused today)
2. Email / SMS keys (Resend, Twilio)
3. Auth secrets (NEXTAUTH_SECRET, JWT_SECRET) — **invalidates all active sessions**
4. Supabase anon / service-role keys
5. Database connection strings — **highest blast radius, do last**

---

## Per-key runbook

### 1. `NEXTAUTH_SECRET`
- **Purpose:** Signs NextAuth session JWTs.
- **Dashboard:** N/A — generated locally. Run `openssl rand -base64 48`.
- **Vercel env var:** `NEXTAUTH_SECRET` (Production + Preview).
- **Dependencies:** All active sessions will be invalidated. Users must sign in again.
- **Verification:** `curl https://disaster-recovery-seven-virid.vercel.app/api/auth/csrf` returns 200 with a new csrfToken. Log in with a demo account (`demo` / `Demo123!`).
- **Estimated time:** 5 min.

### 2. `CSRF_SECRET` (if set)
- **Purpose:** CSRF token signing. **Verify usage first** — grep returns no direct reference in src/ or app/; may not be wired. If not used, remove from Vercel.
- **Dashboard:** N/A — `openssl rand -base64 32`.
- **Vercel env var:** `CSRF_SECRET` (Production + Preview) if used.
- **Verification:** Existing form submissions on `/claim` keep working after deploy.
- **Estimated time:** 5 min.

### 3. `DATABASE_URL` (Supabase pooled)
- **Purpose:** Prisma client connection pooler (pgbouncer, port 6543).
- **Dashboard:** Supabase > Project Settings > Database > Connection pooling.
- **Vercel env var:** `DATABASE_URL`.
- **Dependencies:** Rotating Supabase DB password invalidates BOTH `DATABASE_URL` and `DIRECT_URL`. Rotate them together.
- **Verification:** `curl https://disaster-recovery-seven-virid.vercel.app/api/rating` returns Google rating JSON (pulls from DB cache). Open any location page — if it 500s, rollback.
- **Estimated time:** 15 min (do during maintenance window).

### 4. `DIRECT_URL` (Supabase direct, port 5432)
- **Purpose:** Prisma migrations / direct connection (bypasses pooler).
- **Dashboard:** Same DB password → direct connection string from Supabase dashboard.
- **Vercel env var:** `DIRECT_URL`.
- **Dependencies:** Rotate in same step as `DATABASE_URL`.
- **Verification:** `npx prisma migrate status` from local against prod works.
- **Estimated time:** shared with DATABASE_URL.

### 5. `SUPABASE_SERVICE_ROLE_KEY`
- **Purpose:** Server-only full-access key (bypasses RLS).
- **Dashboard:** Supabase > Project Settings > API > Service role secret → Reset.
- **Vercel env var:** `SUPABASE_SERVICE_ROLE_KEY`.
- **Dependencies:** All server-side code that hits Supabase directly (not via Prisma) will fail until deploy picks up the new key.
- **Verification:** `/api/rating`, any server action that writes via Supabase.
- **Estimated time:** 10 min.

### 6. `SUPABASE_JWT_SECRET`
- **Purpose:** Validates Supabase-issued JWTs (if app verifies them independently).
- **Dashboard:** Supabase > Project Settings > API > JWT secret → Reset.
- **Vercel env var:** `SUPABASE_JWT_SECRET` (if referenced).
- **Dependencies:** Resets all Supabase anon + service tokens. Coordinate with 5 + 7.
- **Verification:** Supabase auth flow end-to-end.
- **Estimated time:** 10 min.

### 7. `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- **Purpose:** Public-safe Supabase key for RLS-protected queries from client.
- **Dashboard:** Rotated alongside JWT secret (6).
- **Vercel env var:** `NEXT_PUBLIC_SUPABASE_ANON_KEY` (Production + Preview).
- **Dependencies:** Client bundle must rebuild — trigger Vercel redeploy.
- **Verification:** Any client-side Supabase call (search, claims list in portal).
- **Estimated time:** 10 min.

### 8. `OPENAI_API_KEY`
- **Purpose:** Fraud detection (`src/lib/ai/fraud-detection.ts`), Elysia engine, mock service check.
- **Dashboard:** https://platform.openai.com/api-keys → Create new → Revoke old.
- **Vercel env var:** `OPENAI_API_KEY`.
- **Verification:** Trigger a claim submission — fraud scoring runs server-side.
- **Estimated time:** 5 min.

### 9. `GEMINI_API_KEY` / `GOOGLE_GENAI_API_KEY` / `GOOGLE_AI_API_KEY`
- **Purpose:** Visual generation (Nano Banana Pro), translation API (`/api/translate`).
- **Dashboard:** https://aistudio.google.com/app/apikey → Delete old → Create new.
- **Vercel env var:** `GOOGLE_GENAI_API_KEY` (primary — `src/lib/visual-generator.ts` falls back `GOOGLE_GENAI_API_KEY -> GOOGLE_AI_API_KEY -> GEMINI_API_KEY`).
- **Verification:** `npx tsx scripts/generate-visual.ts --prompt true` (dry-run). Then `/api/translate` POST with a test string.
- **Notes:** **This key was leaked in commit `8c7bf154` — treat as compromised, rotate first of the AI keys.**
- **Estimated time:** 10 min.

### 10. `ANTHROPIC_API_KEY`
- **Purpose:** AI orchestration (`src/lib/ai-orchestration/providers/anthropic-provider.ts`).
- **Dashboard:** https://console.anthropic.com/settings/keys → Create + revoke.
- **Vercel env var:** `ANTHROPIC_API_KEY`.
- **Verification:** Any Elysia / orchestration route that calls Anthropic.
- **Estimated time:** 5 min.

### 11. `OPENROUTER_API_KEY`
- **Purpose:** Multi-model orchestration (`src/lib/ai-orchestration/providers/openrouter-provider.ts`).
- **Dashboard:** https://openrouter.ai/keys → Create + revoke.
- **Vercel env var:** `OPENROUTER_API_KEY`.
- **Estimated time:** 5 min.

### 12. `STRIPE_SECRET_KEY` + `STRIPE_WEBHOOK_SECRET`
- **Purpose:** Booking payments, application fees, refunds, webhook verification.
- **Dashboard:** https://dashboard.stripe.com/apikeys — roll secret key. Webhooks → endpoint → reveal/roll signing secret.
- **Vercel env vars:** `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`.
- **Dependencies:** **Roll the webhook secret AFTER deploying the new value to Vercel, or inbound webhooks will 400 between roll and deploy.** Order: deploy new `STRIPE_WEBHOOK_SECRET` placeholder value, then roll in Stripe, then paste real value, redeploy.
- **Verification:** `stripe trigger payment_intent.succeeded` against live webhook endpoint.
- **Notes:** `STRIPE_SECRET_KEY` was leaked in commit `dc5bb1c6` — compromised.
- **Estimated time:** 15 min.

### 13. `RESEND_API_KEY`
- **Purpose:** Transactional email (`src/lib/email.ts`).
- **Dashboard:** https://resend.com/api-keys → Create + delete old.
- **Vercel env var:** `RESEND_API_KEY`.
- **Verification:** `POST /api/email/test` returns success.
- **Estimated time:** 5 min.

### 14. `TWILIO_AUTH_TOKEN`
- **Purpose:** SMS (voice agent signature/payment link sending).
- **Dashboard:** https://console.twilio.com/ → Account > Auth tokens → Rotate.
- **Vercel env vars:** `TWILIO_AUTH_TOKEN`, and (unchanged) `TWILIO_ACCOUNT_SID`, `TWILIO_FROM_NUMBER`.
- **Dependencies:** Twilio supports primary + secondary — rotate via secondary promotion to avoid downtime.
- **Verification:** `/api/voice/tools/send-signature-link` POST test (voice agent must be enabled via `VOICE_AGENT_ENABLED=true`).
- **Estimated time:** 10 min.

### 15. `ELEVENLABS_API_KEY` + `ELEVENLABS_WEBHOOK_SECRET` + `ELEVENLABS_TOOL_WEBHOOK_SECRET`
- **Purpose:** Voice agent TTS + post-call webhook auth + tool call auth.
- **Dashboard:** https://elevenlabs.io/app/settings/api-keys → Regenerate.
- **Vercel env vars:** above three.
- **Dependencies:** Voice agent is behind `VOICE_AGENT_ENABLED` flag. Safe to rotate while flag is false (current state).
- **Estimated time:** 10 min.

### 16. `ENCRYPTION_SECRET` / `ENCRYPTION_KEY`
- **Purpose:** Property access PII encryption (DR-390).
- **Dashboard:** N/A — local generation via `openssl rand -hex 32`.
- **Vercel env var:** `ENCRYPTION_SECRET`.
- **DANGER:** Rotating this orphans all previously-encrypted property access records. If any exist in prod DB, migrate first: decrypt with old key, re-encrypt with new. **Do not rotate without confirming DB state.**
- **Estimated time:** 30 min (with data migration); 5 min (if no encrypted data).

### 17. `JWT_SECRET_KEY`
- **Purpose:** Finance referral token signing (`app/api/finance/referral/route.ts`).
- **Dashboard:** N/A — `openssl rand -base64 48`.
- **Vercel env var:** `JWT_SECRET_KEY`.
- **Dependencies:** Outstanding referral tokens will be invalidated.
- **Notes:** Leaked in commit `81a5c4e8` (as `JWT_SECRET`).
- **Estimated time:** 5 min.

### 18. `CRON_SECRET`
- **Purpose:** Protects Vercel cron endpoints (`/api/cron/*`).
- **Dashboard:** N/A — generate.
- **Vercel env var:** `CRON_SECRET` — also update the corresponding `vercel.json` cron job auth header.
- **Estimated time:** 10 min.

### 19. `KILL_SWITCH_ADMIN_SECRET` + `KILL_SWITCH_RESET_SECRET`
- **Purpose:** Voice agent emergency kill-switch admin endpoints.
- **Estimated time:** 5 min.

### 20. Third-party API keys — lower priority
- `GBP_CLIENT_SECRET`, `GBP_REFRESH_TOKEN` (Google Business Profile OAuth)
- `GOOGLE_PLACES_API_KEY` (ratings API)
- `SEMRUSH_API_KEY`
- `REDDIT_CLIENT_SECRET`, `REDDIT_REFRESH_TOKEN`
- `BROWSERBASE_API_KEY`
- `ALGOLIA_ADMIN_KEY`
- `AWS_SECRET_ACCESS_KEY`
- `HUGGINGFACE_API_KEY`
- `CLEAN_CLAIMS_API_KEY`, `CLEAN_CLAIMS_WEBHOOK_SECRET`
- `UNITE_GROUP_API_KEY`
- `VERCEL_TOKEN`

For each: rotate in provider dashboard → update Vercel env → redeploy → hit any endpoint that exercises the integration.

---

## DO AFTER ROTATION

1. **Verify new keys in production.** Hit one endpoint per rotated key (see per-key Verification steps). If any 500s, rollback via `vercel rollback` and investigate.
2. **Revoke old keys** in every provider dashboard. Do not leave old keys as "deprecated but active" — gitleaks will still match them in history scans.
3. **Re-run gitleaks** locally: `gitleaks detect --config .gitleaks.toml --source .` — should be clean against HEAD (history is a separate question).
4. **Trigger the security workflow manually** via GitHub Actions UI on a test PR.
5. **Update MEMORY.md** with rotation date and any lessons learned.
6. **Schedule the history-rewrite decision.** With keys rotated, the history still contains the old (now-invalidated) values. Decide: BFG-rewrite vs accept residual risk given the values no longer work. This decision needs explicit Phill sign-off — never rewrite history unilaterally.
