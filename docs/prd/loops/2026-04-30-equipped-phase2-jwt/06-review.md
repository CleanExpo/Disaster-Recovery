# Phase 6 — Review

**Loop:** `2026-04-30-equipped-phase2-jwt`
**Skill invoked:** `improve-codebase-architecture`.

## What went well

- Phase 0 inventory caught that "blocked on partner API key" was
  half-true: the _value_ of secrets is blocked, but the _infrastructure_
  for handling them is not. Slicing the loop into "key-independent
  hardening" vs "key-dependent activation" shipped real value.
- 7 vitest cases run in <2s and cover every reason-code branch the
  verifier emits. Test coverage is now better than the existing
  webhook-verify, which is older code.
- Server-side verify on `/finance/handoff` is a real defence-in-depth
  win — without it, a phishing URL with a fake token still triggered
  iframe mount + postMessage. Now it short-circuits to the error UI.
- The `ref` claim ↔ URL `id` cross-check is a freebie that catches
  swap-the-id-in-URL attacks at zero performance cost.

## What went wrong

1. **Loop intake claimed `/finance/thank-you` was missing.** It wasn't —
   the file existed and was complete. The grep + `Glob` initial pass
   missed it because I searched `app/finance/thank-you/**` which Glob
   reported as "No files found" while ls showed `page.tsx`. Likely a
   Glob pattern quirk on Windows when the dir was empty at some point.

   **Fix going forward:** when Glob says "no files" for a path that
   ought to exist, follow up with `ls` before drawing conclusions.
   Saves writing a redundant component.

2. **Three non-null assertions** added in
   `app/api/finance/referral/route.ts` (`email!`, `full_name!`) and
   one elided field (`funding_band ?? undefined`). Same trade-off as
   L9 — the route's `missing[]` validation guarantees the values are
   non-null at call site, but TS can't see it. Acceptable for now.

   **Fix going forward:** L9 already proposed a `validate()` helper
   that returns a discriminated union. When that lands, L6's call site
   gets cleaner too.

## Residual debt

1. **PII in JWT claims** (`email`, `mobile`, `name`). Today these are
   in the URL `?token=…` after handoff — visible in browser history,
   any logging proxy, any analytics that captures URLs. Phase 2.5: swap
   to opaque `ref` + server-fetch endpoint with `Authorization` header.
   Requires partner conversation with Equipped about how their iframe
   would consume the new endpoint. Captured in 07-handoff for the next
   loop seed.
2. **Multi-`kid` rotation map.** Single key today. Will need a map
   when a 2nd key is added; one-line refactor.
3. **Real partner secrets.** Owed by Equipped. When they arrive,
   populate Vercel env + flip the flag.

## Compliance audit

| Check                                                    | Result |
| -------------------------------------------------------- | ------ |
| No new banned phrases                                    | ✅     |
| AU English                                               | ✅     |
| Referrer-not-lender language preserved                   | ✅     |
| Reg 25 NCCP referenced in `.env.example` comment         | ✅     |
| ABN + ACR for Equipped present in `.env.example` comment | ✅     |
| No raw PII in logs                                       | ✅     |
| No `--no-verify` skip on git hooks                       | ✅     |
| 15-min token expiry preserved                            | ✅     |

## Loop-system amendments to propose

- None this loop. The skill matrix already covers the "verify before
  side-effects" pattern via `design-an-interface`.

## Exit gate

- [x] Decisions + non-null trade-offs documented.
- [x] Residual debt enumerated with explicit unblock criteria.

**Proceed to Phase 7 — Handoff.**
