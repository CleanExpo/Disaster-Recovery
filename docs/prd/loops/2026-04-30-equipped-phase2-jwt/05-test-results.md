# Phase 5 — Test Results

**Loop:** `2026-04-30-equipped-phase2-jwt`

## Files changed

| File                                            | Type | Purpose                                                                  |
| ----------------------------------------------- | ---- | ------------------------------------------------------------------------ |
| `src/lib/finance/jwt-handoff.ts`                | NEW  | sign + verify helpers, HS256, audience/issuer enforcement, `kid` support |
| `src/lib/finance/__tests__/jwt-handoff.test.ts` | NEW  | 7 vitest cases                                                           |
| `app/api/finance/referral/route.ts`             | EDIT | use `signEquippedHandoffToken`, add `kid` from env                       |
| `app/finance/handoff/page.tsx`                  | EDIT | server-side verify + `ref` ↔ `id` cross-check                            |
| `app/finance/handoff/HandoffFrame.tsx`          | EDIT | env-configurable embed origin                                            |
| `.env.example`                                  | EDIT | document Equipped section (6 vars)                                       |

## Files unchanged

- `app/finance/thank-you/page.tsx` — already exists with the right
  shape (id + status query params, NOT LEGAL ADVICE footer). Loop
  intake initially flagged it as missing; was wrong.

## Verification

| Check                                                                | Result                                |
| -------------------------------------------------------------------- | ------------------------------------- |
| `npx vitest run src/lib/finance/__tests__/jwt-handoff.test.ts`       | ✅ 7/7 passed in 1.95s                |
| `npx tsc --noEmit` filtered to changed files                         | ✅ zero errors                        |
| `signEquippedHandoffToken` + `verifyEquippedHandoffToken` round-trip | ✅                                    |
| Wrong audience → `wrong-audience`                                    | ✅                                    |
| Wrong issuer → `wrong-issuer`                                        | ✅                                    |
| Wrong secret → `bad-signature`                                       | ✅                                    |
| Expired token → `expired`                                            | ✅                                    |
| Malformed (not 3 segments) → `malformed`                             | ✅                                    |
| `kid` header round-trips                                             | ✅                                    |
| `/finance/handoff` rejects forged tokens before iframe mount         | ✅ (server-side verify before render) |
| `/finance/handoff` cross-checks JWT `ref` claim against URL `id`     | ✅                                    |
| `HandoffFrame` reads `NEXT_PUBLIC_EQUIPPED_EMBED_ORIGIN` env         | ✅                                    |
| `.env.example` documents 6 Equipped vars with comments               | ✅                                    |
| AU English, no banned phrases                                        | ✅                                    |
| No PII added to logs                                                 | ✅                                    |

## Behavioural changes

| Surface                                            | Before                                           | After                                                     |
| -------------------------------------------------- | ------------------------------------------------ | --------------------------------------------------------- |
| `POST /api/finance/referral` JSON response         | `{ ok, referral_id, handoff_token, expires_in }` | unchanged shape; `handoff_token` now carries `kid` header |
| `GET /finance/handoff?token=junk&id=junk`          | iframe mounts, postMessage sent                  | error UI; no iframe mount                                 |
| `GET /finance/handoff?token=<expired>&id=<…>`      | iframe mounts (token assumed valid)              | error UI with `reason: expired`                           |
| `GET /finance/handoff?token=<valid>&id=<wrong-id>` | iframe mounts                                    | error UI with `reason: ref-mismatch`                      |
| `GET /finance/handoff?token=<valid>&id=<matching>` | iframe mounts (existing)                         | iframe mounts (unchanged)                                 |

The flag (`NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED`) remains OFF in prod
so the route gates haven't changed; only the per-request validation is
stricter.

## Out of scope (deferred)

- **PII in JWT claims** (email/mobile/name embedded in token, surfaces
  in URL params + browser history). Phase 2.5 — issue an opaque `ref`
  uuid and have Equipped fetch the prefill payload via
  `GET /api/finance/handoff/:ref` with the JWT in `Authorization`.
  Requires partner conversation; do not ship before George approves.
- **Multi-`kid` rotation map.** Single key today; map is a one-line
  refactor when a 2nd key is needed.
- **Real partner secrets.** `JWT_SECRET_KEY` / `EQUIPPED_WEBHOOK_SECRET`
  / `NEXT_PUBLIC_EQUIPPED_EMBED_URL` values still owed by Equipped.
  When provided, set them in Vercel and flip
  `NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED=true`.

## Exit gate

- [x] All Phase 2 verification cases ship.
- [x] No public API contract change.
- [x] TypeScript clean.
- [x] Vitest green.
- [x] Behaviour matrix documented.

**Proceed to Phase 6 — Review.**
