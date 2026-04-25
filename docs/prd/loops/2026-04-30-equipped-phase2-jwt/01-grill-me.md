# Phase 1 — Grill Me

**Loop:** `2026-04-30-equipped-phase2-jwt`
**Skill invoked:** `grill-me`, `ubiquitous-language`.

## Q1 — Is verifying the JWT on `/finance/handoff` actually a security improvement?

**A:** Yes, defence in depth.

Threat model: an attacker crafts `https://disasterrecovery.com.au/finance/handoff?token=evil&id=evil` and lures a victim via phishing.

Today, the page renders the iframe and postMessages `evil` to Equipped.
Equipped will reject `evil`, but the user sees the DR-branded handoff
chrome and the Equipped iframe loading — false legitimacy. Worst case:
phishing payload uses a forged token with a higher claim of
`amt`/`funding_band` to manipulate Equipped's routing.

After verification: the page rejects the token before it ever reaches
the iframe. User sees the existing "Handoff link expired or missing"
error. No iframe mount, no postMessage.

The verification cost is one HMAC compare (sub-millisecond). No partner
key needed because we sign + verify with our own key.

## Q2 — Why a `kid` claim now if there's only one key?

**A:** Forward compatibility. Adding `kid` once means future rotation
is a config change, not a code change. Without `kid`, rotation
requires:

- Issue both old + new tokens during a rollover window (need to dual-sign).
- Verify against either key (try-fallback ladder).

With `kid`: verifier reads `kid` from the JWT header, looks up the
correct key in a map, single verification path. Rotation = add new
entry to the map + flip the issuer's `kid`.

For now the map is `{ 'dr-2026-04': process.env.JWT_SECRET_KEY }`.

## Q3 — Why env-configure the embed origin?

**A:** Today: `EQUIPPED_EMBED_ORIGIN = 'https://equippedcf.com.au'`
hardcoded in `HandoffFrame.tsx`. When Equipped sets up a staging
environment (`staging.equippedcf.com.au` or whatever), we'd need a code
change to point at it.

Phase 2 Q&A with George Steele will probably involve a staging
round-trip before going live. Cheaper to env-configure now.

`NEXT_PUBLIC_EQUIPPED_EMBED_ORIGIN` defaults to
`https://equippedcf.com.au`. The postMessage `targetOrigin` parameter
also reads from this var, preserving the same-origin guard.

## Q4 — Why is the missing `/finance/thank-you` page urgent?

**A:** Not urgent (Equipped flag is OFF, no traffic), but the
`HandoffFrame` literally pushes to it on success
(`equipped.referral.status` message → `router.push('/finance/thank-you?...')`).
On the happy path with the flag ON, this would 404.

Cheap to add (server component, ~40 lines).

## Q5 — JWT claims schema — is the current shape adequate?

**A:** Current claims include `email`, `mobile`, `name`. That's PII
**inside the JWT** — base64 but not encrypted. JWT is short-lived (15
min) and only ever traverses HTTPS in URL params + iframe postMessage.

But: the URL is logged in the browser history, the access logs of any
intermediate proxy, server logs (if a proxy logs URL params), and so
on. Including PII in URL params is footgun territory per
`.claude/rules/privacy.md` §1.

**Decision for this loop:** out of scope to refactor. Document as
residual debt. The fix is "issue an opaque short-lived `ref` UUID,
have Equipped fetch the prefill payload via a `/api/finance/handoff/:ref`
GET endpoint with the JWT in an `Authorization` header, not a URL
param". That's a Phase 2.5 / Phase 3 conversation with Equipped — they
have to consume the new endpoint.

## Q6 — What about the webhook side?

**A:** `/api/finance/status` already does HMAC verify via
`webhook-verify.ts` with full unit-test coverage. No Phase 2 change
needed there. The blocker is purely the _value_ of
`EQUIPPED_WEBHOOK_SECRET` — that arrives with the partner key.

## Q7 — Ubiquitous-language

- "Handoff token" ≠ "Webhook signature": both are HMAC, different
  purposes. JWT is **outbound** (us → Equipped). HMAC signature is
  **inbound** (Equipped → us). Naming convention preserved.
- "Referral" still aligns with Reg 25 referrer terminology. No
  language drift.

## Open questions

None blocking. PII-in-JWT is a real concern → captured as residual
debt for Phase 2.5.

**Proceed to Phase 2 — Design-an-Interface.**
