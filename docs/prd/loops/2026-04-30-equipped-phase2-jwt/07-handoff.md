# Phase 7 — Handoff

**Loop:** `2026-04-30-equipped-phase2-jwt`
**Closed:** 2026-04-30

## Done

- **`src/lib/finance/jwt-handoff.ts`** — centralised sign + verify
  helpers. HS256, audience/issuer enforcement, `kid` header support,
  reason-code error model.
- **7 vitest cases** covering happy path + every failure branch.
- **`/api/finance/referral`** now uses the centralised signer; emits
  a `kid` header (`EQUIPPED_JWT_KID` env, defaults `dr-2026-04`).
- **`/finance/handoff`** server-verifies the token before rendering
  the iframe; cross-checks JWT `ref` claim against URL `id`. Forged
  / expired / mismatched tokens render the existing error UI.
- **`HandoffFrame`** reads `NEXT_PUBLIC_EQUIPPED_EMBED_ORIGIN` env so
  staging can swap origins without a code change.
- **`.env.example`** documents 6 Equipped vars with explicit comments.

## Action required from Phill

When Equipped (George Steele) provides the partner API key + endpoints:

1. **Set Vercel env vars** (Production + Preview):
   ```
   JWT_SECRET_KEY=<32+ char random>
   EQUIPPED_JWT_KID=dr-2026-04   # or whatever Equipped agrees on
   EQUIPPED_WEBHOOK_SECRET=<from Equipped>
   NEXT_PUBLIC_EQUIPPED_EMBED_URL=https://equippedcf.com.au/embed
   NEXT_PUBLIC_EQUIPPED_EMBED_ORIGIN=https://equippedcf.com.au
   NEXT_PUBLIC_EQUIPPED_REFERRAL_ENABLED=true
   ```
2. **No code change required** to flip the flag — env-only. Rollback =
   flip the flag back to `false`.
3. **Optional pre-flight test**: hit `POST /api/finance/referral` with
   a valid form payload, then visit the returned `/finance/handoff?token=…&id=…`
   URL. Should render the iframe (or the public quote-form fallback if
   `NEXT_PUBLIC_EQUIPPED_EMBED_URL` isn't set yet).

## Residual debt

1. **PII in JWT claims** — `email`, `mobile`, `name` are inside the
   token, which lives in URL params + browser history. **Recommended
   Phase 2.5**: swap to opaque `ref` uuid + a `GET /api/finance/handoff/:ref`
   endpoint that returns the prefill payload to Equipped's server with
   the JWT in an `Authorization` header. Requires George's signoff
   on the new endpoint contract.
2. **Multi-`kid` rotation map** — defer until a 2nd key exists.
3. **L9 follow-up** still applies: status-webhook persistence migration
   to Prisma is a separate future loop.
4. **Validation refactor** — discriminated-union helper for the
   `missing[]` pattern in `referral/route.ts`. Eliminates non-null
   assertions in this loop's wiring + L9's wiring. Defer until a 3rd
   loop touches this route.

## Next session bootstrap

L6 was the last "blocked" item that unblocked. PRD §10 queue at this
point:

- L1 ✅ Equipped Phase 1 PDF fill
- L2 ✅ GitHub token audit
- L3 ✅ M365 DKIM enable
- L4 ✅ carsi.com.au DMARC publish
- L5 ⏸️ iOS Phase 3a (still blocked on Apple developer account)
- L6 ✅ Equipped Phase 2 JWT (this loop)
- L7 ✅ Siteground lapse audit
- L8 ✅ God-components wave 2
- L9 ✅ FinanceReferral persistence

Future loops will be seeded by:

- Phill's organic asks
- Board audit follow-ups (`.env.production` security emergency, TS
  strict gate, Sentry wiring)
- Residual-debt items from L1-L9 (DMARC=PASS Gmail confirmation,
  GoDaddy honorrestorations.com lapse, status-webhook Prisma migration,
  PII-in-JWT refactor, etc.)

## Lessons for the PRD

The "key-independent vs key-dependent" slice on a partner-blocked
loop turned a binary block into shippable work. PRD §3 already supports
this implicitly through the Phase 1 "What can we do without X?"
question that grill-me asks. No doc change needed.

## PR

Branch: `loop/2026-04-30-equipped-phase2-jwt`

- 2 new files: `src/lib/finance/jwt-handoff.ts`, `src/lib/finance/__tests__/jwt-handoff.test.ts`
- 4 files edited: route, handoff page, HandoffFrame, `.env.example`
- 7 phase artefacts under `docs/prd/loops/2026-04-30-equipped-phase2-jwt/`

**NOT LEGAL ADVICE.**
