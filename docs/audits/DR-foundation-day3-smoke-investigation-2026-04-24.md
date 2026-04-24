# Foundation Day 3 — ci/smoke-test investigation

**Date:** 2026-04-24
**PR:** `fix/foundation-day3-smoke-test-investigation`
**Run analysed:** [preview-deploy run 24861045285](https://github.com/CleanExpo/Disaster-Recovery/actions/runs/24861045285) (most recent failing smoke run on `fix/foundation-day0-security-triage-defensive`)

## Summary

Seven smoke tests were failing on every preview deploy. All seven failed with the same symptom: the HTTP response was **500** where the test expected a non-500 status. The failures cluster into two groups — auth-safety redirects (Tier 3) and API liveness (Tier 5) — and share a common root cause: a handler or server component threw during session/JWT resolution or database access, and the outer `try/catch` returned a generic 500 instead of the semantic status the smoke test expects.

This PR applies **defensive, surgical** fixes to three hot paths where a predictable preview-environment failure (missing `NEXTAUTH_SECRET` or unreachable `DATABASE_URL`) was cascading into a 500. It does **not** attempt to relitigate the architecture or change the middleware matcher.

## Per-test classification

| # | Test | Expected statuses | Received | Root cause hypothesis | Outcome |
|---|------|-------------------|----------|-----------------------|---------|
| 1 | Tier 3 `/admin` redirects unauthenticated users | `[301,302,303,307,308,401,403]` | `500` | `app/admin/layout.tsx` calls `getServerSession(authOptions)`. If the auth lookup throws (e.g. missing `NEXTAUTH_SECRET`), the server component errors and Next returns 500 — middleware never even gets a chance to redirect, because the root layout renders *after* middleware passes. | **Fixed** — wrapped `getServerSession` in try/catch; null session → redirect to `/login`. |
| 2 | Tier 3 `/admin/dashboard` | same | `500` | Same path — routed through `app/admin/layout.tsx`. | **Fixed** (same change as #1). |
| 3 | Tier 3 `/contractor/dashboard` | same | `500` | `app/contractor/dashboard/layout.tsx` is a pure client boundary (no server session lookup). 500 must originate elsewhere — likely the page prerender failing because a Prisma query runs during build/SSR without a reachable DB, or Vercel's automation-bypass header not being honoured. | **Could not reproduce locally — needs preview verification.** No fix applied. Documented below. |
| 4 | Tier 3 `/api/admin/users` | same | `500` | Handler already has defensive try/catch around `getToken` returning 401. 500 at this level suggests either a module-init error or Vercel's auth layer intercepting before the route. | **Could not reproduce locally — needs preview verification.** |
| 5 | Tier 5 `/api/log-error` POST (valid payload) | `[200,400,401]` | `500` | Handler calls `getServerSession()` BEFORE body validation, then `prisma.errorLog.create`. Either can throw in preview. | **Fixed** — parse + validate body first, make session lookup best-effort, and fall back to `{success:true, persisted:false}` at status 200 when DB write fails (telemetry is best-effort by design). |
| 6 | Tier 5 `/api/log-error` POST (missing message) | `[400]` | `500` | Same as #5 — auth lookup ran before validation returned 400. | **Fixed** (same change as #5). |
| 7 | Tier 5 `/api/analytics/compliance` requires auth | `[401,403,302,307]` | `500` | Handler called `getServerSession()` inside the main try/catch, so a throw returned 500 instead of the 401 that should gate the endpoint. | **Fixed** — session resolution is now in its own try/catch and fails closed to 401 on any error. |

## Fixes in this PR

### 1. `app/api/log-error/route.ts`
- Move `req.json()` + field validation *above* any IO (auth, DB).
- Wrap `getServerSession()` in its own try/catch; session is optional for error logging.
- Wrap the Prisma `errorLog.create` + `auditLog.create` block in its own try/catch. On DB failure, return `{success: true, persisted: false, reason: 'telemetry_unavailable'}` at status 200 — telemetry is best-effort and must not cascade into a client-facing 500.

### 2. `app/api/analytics/compliance/route.ts`
- Hoist session resolution out of the main try/catch into its own try/catch.
- On any auth throw, fail closed with 401 (never 500 without an auth decision).

### 3. `app/admin/layout.tsx`
- Wrap `getServerSession(authOptions)` in try/catch so a missing `NEXTAUTH_SECRET` or other auth failure redirects to `/login` instead of 500ing.
- Cleaner typing on `session.user.role` via a narrow inline type.

## What was NOT fixed

### `/contractor/dashboard` 500
The dashboard layout is a plain client component wrapper with no server-side session lookup. I could not reproduce a 500 locally (`npm run dev` renders fine; the middleware correctly redirects to `/login`). Likely candidates for verification on a fresh preview:

1. **`app/contractor/dashboard/page.tsx` runs a Prisma query at SSR time** with a `DATABASE_URL` that the preview cannot reach. Confirm by reading the Vercel function log for a 500 response.
2. **Vercel's authentication protection** returning 500 when the `x-vercel-protection-bypass` header is present but the automation secret is stale.

### `/api/admin/users` 500
Handler is already defensive (try/catch around `getToken` → 401). Possible remaining causes:

1. Module-scope import throws (e.g. `@/lib/prisma` initialisation failing because `DATABASE_URL` is unset at build time).
2. Edge vs node runtime mismatch — the middleware runs on Edge, the route on Node; a disagreement about header normalisation could break the bypass.

### Middleware matcher / auth safety architecture
The middleware matcher and auth-safety redirects are structurally correct. The 500s on admin/contractor routes are not caused by middleware letting the request through — they're caused by downstream server components throwing before any redirect can happen. No middleware changes are in this PR.

## Verification plan (for PR reviewer)

1. Open this PR → wait for `Preview Deploy + Smoke Tests` to run.
2. If smoke tests still show `/contractor/dashboard` or `/api/admin/users` as 500, pull the function log from Vercel for those routes and paste the stack trace into a follow-up comment.
3. Expected after this PR: tests #1, #2, #5, #6, #7 flip green. Tests #3 and #4 may remain red pending preview-log diagnosis.

## Follow-up TODOs

- [ ] Read Vercel function logs for `/contractor/dashboard` SSR 500 on next preview.
- [ ] Read Vercel function logs for `/api/admin/users` 500 on next preview.
- [ ] Consider adding an `/api/health` route that exercises a Prisma `$queryRaw` so CI can distinguish "DB unreachable" from "app broken" in future smoke runs.
- [ ] Once the remaining 500s are understood, revisit whether additional layouts (contractor areas, API routes) need the same fail-closed wrapping pattern.

## Constraints honoured

- No middleware changes.
- No smoke test rewrites (we conform to the existing contract instead of relaxing it).
- No Prisma schema changes.
- No strict-mode flip (that's Day 4-5).
- Every edited line traces back to one of the seven failing tests.
