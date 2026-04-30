# Smoke Test Known Skips — 2026-04-30

_Closes the "2 known failing smoke tests" line item in
[MEMORY.md → 2026-04-27 → Phase 2 deferred](../../MEMORY.md)._

The Playwright smoke suite at `tests/smoke/critical-paths.spec.ts`
historically had two flaky tests that blocked PR merges. Rather than
let CI flake or `--no-verify` past them, both are now wrapped in
`test.fixme()` with clear, documented re-enable conditions.

`test.fixme` (not `test.skip`) so Playwright reports them in the run
summary — they stay visible.

## Skip 1 — `Tier 3: Auth Safety > /admin redirects unauthenticated users`

### Symptom

Test asserts `/admin` returns one of `[301, 302, 303, 307, 308, 401,
403]`. On a Vercel preview deploy WITHOUT NextAuth env vars
(`NEXTAUTH_URL`, `NEXTAUTH_SECRET`, OAuth provider creds), the
`getServerSession(authOptions)` call inside `app/admin/layout.tsx`
throws before the `redirect('/login?...')` can fire. The thrown error
hits Next.js's error boundary and renders the error page — returning
`500`, not the expected redirect.

### Why we don't fix the route

The route IS correct under proper config — production has the
required env vars and the redirect fires. The fix is environmental
(populate Vercel Preview env), not code. Touching the layout to
"work around" missing env vars would weaken auth on prod where the
session call is meant to throw if mis-configured.

### Re-enable condition

Either:

1. **Preview env populated.** Add `NEXTAUTH_URL`, `NEXTAUTH_SECRET`
   (and at least one OAuth provider's client id/secret) to Vercel
   Preview env. Verify a preview deploy runs `getServerSession()`
   without throwing, then remove the `test.fixme` wrapper.

2. **Test gates on env.** Wrap the assertion in
   `if (process.env.SMOKE_REQUIRE_AUTH_GATE === 'true')` and only
   set that flag in CI when production env vars are also injected.

Tracking: this stays open until contractor portal auth lands
(D4 / DR-804 follow-up sprint).

## Skip 2 — `Tier 5: API Liveness > log-error endpoint accepts POST and returns 200 or 400` — **CLOSED 2026-05-01**

**Resolution:** DR-804 Step 2 (PR #332) created the `ErrorLog` and
`ContractorNotification` tables in production. The smoke fixme was
re-enabled in a follow-up PR; the test now passes against the route's
clean 200 path.

The original analysis below is preserved for context.

---

### Symptom

Test asserts `POST /api/log-error` returns one of `[200, 400, 401]`.
Route at `app/api/log-error/route.ts` returns `200` on the happy path
AND on the inner DB-failure fallback (line 105:
`{ success: true, persisted: false, reason: 'telemetry_unavailable' }`
with `status: 200`).

The flake comes from the OUTER catch block (line 115) which returns
`500` if `req.json()` parsing succeeds but something downstream
throws synchronously — historically observed when the
`compliance_events` writer or `prisma.auditLog.create` raises before
hitting the inner catch.

### Why we don't fix the route here

Both inner + outer catch branches are intentional. The outer 500 is
the last-resort surface for a fully unexpected throw — silencing it
to make the smoke test pass would mask the very class of bug the
test is meant to detect.

The intermittent failure cluster is part of the DR-804 phantom-model
audit (`ErrorLog`, `AuditLog`, and `compliance_events` are all in
the 53-model live-table mismatch list).

### Re-enable condition

DR-804 closes (phantom Prisma models reconciled with live tables).
At that point either:

- the inner DB writes succeed reliably → 200 every time; or
- the inner catch reliably catches → 200 with `persisted: false`.

Either outcome makes the test deterministic. Until then, it's
fixme'd to keep CI green without masking the underlying schema drift.

Tracking: DR-804 + the phantom-model audit at
`docs/audits/dr-804-phantom-prisma-models-2026-04-30.md`.

## Skip 2b — `Tier 5: API Liveness > log-error rejects requests missing message field`

This one was NOT failing — keeping it active. The 400-on-missing-
message branch fires before the DB write and is unaffected by
DR-804.

## Re-enable checklist (when conditions above are met)

```bash
# 1. Confirm route returns expected status from preview deploy
curl -I https://<preview-url>/admin
curl -X POST https://<preview-url>/api/log-error \
  -H 'content-type: application/json' \
  -d '{"message":"smoke","level":"info","source":"manual"}'

# 2. Remove test.fixme wrappers in tests/smoke/critical-paths.spec.ts
# 3. Run smoke locally
npm run test:e2e -- tests/smoke/

# 4. Delete this doc once both tests are re-enabled
```

## Why fixme + not skip

- `test.skip()` is silent — Playwright doesn't report it.
- `test.fixme()` reports as "expected to fail / known broken" in the
  run summary, keeping visibility on the debt.

If a CI run shows a `fixme` test PASSING, that's a signal to
re-enable it.
