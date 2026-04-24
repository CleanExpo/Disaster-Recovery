# Phase 0 — Intake

**Loop:** `2026-04-30-equipped-phase2-jwt`
**Opened:** 2026-04-30
**Owner:** Phill McGurk + Claude Code

## Ask

Originally: "Equipped Phase 2 JWT — blocked on partner API key." On
investigation, the block applies only to the _value_ of the shared
secrets, not to the _infrastructure_ around them. There's a substantial
amount of Phase 2 hardening that ships independently of the partner key.

## Phase 1 state (already shipped)

- `/finance/referral` form posts to `/api/finance/referral`.
- Route generates a 15-min JWT (`jose.SignJWT`, HS256) with claims:
  `{ ref, email, mobile, name, amt, typ, src }`, issuer
  `disasterrecovery.com.au`, audience `equippedcf.com.au`. Signed with
  `JWT_SECRET_KEY` env var (dev fallback `'dev-only-jwt-secret-change-me'`).
- Returns `{ ok, referral_id, handoff_token, expires_in }`.
- Browser navigates to `/finance/handoff?token=…&id=…`.
- `app/finance/handoff/page.tsx` checks `token` and `id` are present
  (no signature verification), then renders `<HandoffFrame>`.
- `HandoffFrame` mounts an iframe to `NEXT_PUBLIC_EQUIPPED_EMBED_URL`
  (or fallback `https://equippedcf.com.au/get-a-quote`) and postMessages
  `{ type: 'dr.finance.prefill', token, referralId, version: 1 }` on load.
- Listens for `equipped.prefill.ack` and `equipped.referral.status` from
  the iframe.

## Gaps (Phase 2)

1. **No JWT verification on `/finance/handoff`.** Anyone can navigate
   to `?token=junk&id=junk` and trigger an iframe postMessage.
2. **No `kid` claim on issued JWTs.** Key rotation impossible without
   schema churn.
3. **`EQUIPPED_EMBED_ORIGIN` is hardcoded** in `HandoffFrame.tsx`.
   No staging override.
4. **`/finance/thank-you` page does not exist** — `HandoffFrame.tsx`
   redirects to it (line 42) but the route is missing. Broken link
   on the happy path's last hop.
5. **`.env.example` has no Equipped section** — none of the required
   env vars documented.
6. **No unit tests** for the JWT helpers (only `webhook-verify.test.ts`
   covers the inbound HMAC).

## Scope (this loop)

Address gaps 1-6. Does NOT require the partner API key — these are
pure-infrastructure improvements.

## Out of scope (deferred until partner provides keys)

- Real `JWT_SECRET_KEY` value for prod.
- Real `EQUIPPED_WEBHOOK_SECRET` value.
- Real `NEXT_PUBLIC_EQUIPPED_EMBED_URL` once Equipped stands up
  `/embed`.
- Multi-key rotation map (single `kid` is enough until a 2nd key
  exists).

## Exit gate

- [x] Scope sliced into "key-independent" vs "key-dependent" halves.
- [x] Out-of-scope items captured with explicit unblock criteria.

**Proceed to Phase 1 — Grill Me.**
