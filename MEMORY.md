# MEMORY.md — Disaster Recovery

Living sprint + project log. Newest entry at the top. Keep under
200 lines; archive older entries into `planning/memory-archive/`.

## 2026-04-28 — ADR-014 Path A cutover (remove escrow + Connect surface)

Path A confirmed as the funds-flow architecture (DR is NOT party to
client → contractor restoration payments; DR collects only
subscription + platform fee FROM the contractor). The drifted Path B
surface was removed in a single PR.

Removed:

- `app/api/contractors/release-payment/route.ts` (475-line KPI release
  engine — held / partial-released / fully-released / refunded
  states, Stripe transfer issuance).
- `ContractorProfile.stripeConnectAccountId` Prisma field; migration
  `20260428007000_drop_stripe_connect_account_id` drops the live
  column (`IF EXISTS`, applied via Supabase SQL Editor by Phill).
- `MockEmailService.sendPaymentReleasedNotification` (only caller was
  the deleted route).

Kept (still Path A):

- `PRICING_CONSTANTS.CALLOUT_FEE` etc. — INDICATIVE pricing only, used
  for "from $X" marketing ranges. Comment block at the constant says
  so explicitly. Do not reintroduce client-side Stripe Checkout
  settling to DR.
- `PRICING_CONSTANTS.SUBSCRIPTION_TIERS`, `APPLICATION_FEE`,
  `JOINING_FEE` — contractor-side payments, on DR's side of the funds
  flow.

Flagged for follow-up (NOT modified):

- `app/api/voice/tools/send-payment-link/route.ts` — still issues a
  Stripe Checkout session for the callout fee against DR's account.
  Already `VOICE_AGENT_ENABLED=false` gated and never fires in
  prod. Either remove or redirect to contractor-side surface once
  one exists. Behaviour change → requires Phill confirmation.

See @docs/adr/ADR-014-funds-flow-path-a.md.

## 2026-04-27 — Full-day sprint: P0 fix, schema audit, email DKIM, both DR domains linked

**Outcome:** 23 PRs merged, 1 production migration deployed, 0 incidents.
Headline wins:

- P0 silent-payment-loss bug closed (PR #232 + migration deploy)
- Email deliverability shipped via `disasterrecovery.au` at GoDaddy
  (DKIM/SPF/DMARC live, Resend verification pending)
- Both DR domains linked: `.com.au` canonical website (unchanged),
  `.au` redirects 307 → `.com.au` + serves as Resend sender
- Phase 1 schema-drift audit (PR #231) → 5 follow-up PRs
- **MAJOR finding** from introspection refresh (PR #239): **53 Prisma
  models without backing tables** in production. DR-804 opened for the
  1-2 day 3-bucket audit.

### What landed (PR list)

Morning wave (DR-700 sprint close-out):

- **PR #222** — DR-542 distressed-user UX protocol (voice + claim)
- **PR #223** — continuation roadmap
- **PR #224** — DR-688 finance-referral persistence state doc
- **PR #225** — DR-458 Google Places API audit script
- **PR #226** — DR-700 D1-D5 strategy memo
- **PR #227** — TS Phase 2 cluster analysis (171 casts catalogued)
- **PR #228** — TS Phase 2 Cluster B (auth, 1 cast)
- **PR #229** — Phill action checklist + counsel email drafts
- **PR #230** — TS Phase 2 Cluster A partial (payments mock boundary, 2 casts)
- **PR #231** — Phase 1 schema-drift audit (4 reports + summary)
- **PR #233** — deleted unauthenticated `/api/reddit/migrate` route
- **PR #234** — ADR-012 (RLS service-role-only) + ADR-013 (compliance_events append-only)
- **PR #235** — pre-existing typecheck blockers cleared (3 TS errors)
- **PR #232** — **P0 PAYMENT REFUND FIX** + migration `20260427000000_payment_refund_fields`

Afternoon wave (autonomous follow-up):

- **PR #236** — DR-803 Resend `from` → `noreply@disasterrecovery.au`
- **PR #237** — `.context/domain-models.md` drift entries refreshed
- **PR #238** — TS Phase 2 Cluster C (API handlers, 4 casts)
- **PR #239** — Supabase introspection refresh (2026-02-22 → 2026-04-27)

### P0 detail (the most-important fix)

`app/api/payments/refund/route.ts` had three coordinated bugs:

1. Stripe refund at line 55 fired BEFORE the DB write
2. DB write at line 72 always failed (Payment model missing
   `refundAmountAUD`, `refundReason`, `refundedAt`, plus wrong field
   name `stripePaymentId` vs canonical `stripePaymentIntentId`)
3. Catch block at line 81 silently swallowed the error

Net effect under any real refund: money refunds, DB never records it.
Fix: schema migration adds 5 fields, route uses canonical names + drops
`as any` cast, catch becomes loud (log + captureException with
severity:critical + compliance event of new type
`payment_refund_db_failure`). Customer still gets 200 (refund DID
succeed); reconciliation alert is internal.

### DKIM email pipeline (DR-524 closed)

- Original Cloudflare account holding `disasterrecovery.com.au` zone
  is owned by an unrecoverable email — DKIM was never possible there.
- Pivoted to `disasterrecovery.au` (owned at GoDaddy with full DNS
  access). Added DKIM TXT (`resend._domainkey`), SPF MX + TXT
  (`send`), DMARC TXT (`_dmarc`). Records visible in
  `prisma/migrations/20260427000000_payment_refund_fields/` companion
  notes — also linked from DR-524 close-out comment.
- Vercel project: added `disasterrecovery.au` as redirect alias →
  `.com.au` (307). A record at GoDaddy: `216.150.1.1`. Verified live
  via curl — `https://disasterrecovery.au` 307 → `https://disasterrecovery.com.au`.
- Code change: `RESEND_FROM_EMAIL` default now `noreply@disasterrecovery.au`
  (PR #236). Set this in Vercel Production env to override.

### CRITICAL: 53 phantom Prisma models (DR-804 follow-up)

Live `prisma db pull` revealed 109 production tables vs 79 Prisma
models. **53 Prisma models in `schema.prisma` have NO backing live
table** — including core domain (`User`, `Lead`, `Job`, `Client`,
`Notification`, `Invoice`, `ContractorApplication`, etc.).

Most are likely dead code paths (the original 15-model audit only
found zero-reference cases). 1-2 day audit needed to bucket each
into:

1. Active route, no live table → CRITICAL bug
2. Active route, lowercase co-tenant table exists → add `@@map`
3. Dead in code → drop the Prisma model

Next agent picking this up: read DR-804 + `prisma/supabase-tables-introspection.md`.

### Strategic decisions made today

- **Counsel emails DEFERRED** (funds-constrained). Drafts saved at
  `docs/counsel/2026-04-27-emails-to-send.md`. ADR-011 Path A and
  APP 8 wording proceed on engineering authority.
- **Resend free plan kept** (1 verified domain). Old failed
  `disasterrecovery.com.au` Resend record deleted; replaced with
  `.au` variant. If `.com.au` Cloudflare ever recovered, Pro plan
  ($20/mo) needed for second domain.

### Stripe legacy archive (Phill in dashboard, not via CLI)

7 `prod_HL*` LearnDash legacy products identified for archive.
Stripe CLI's OAuth-issued restricted key (`rk_live_*`) doesn't have
`products.update` permission. Phill archives via Stripe Dashboard.
Current DR products (`prod_UP3q*`, 12 of them) untouched.

### Phase 2 still deferred to next sprint

- DR-804 — phantom Prisma models 3-bucket audit (1-2 days, P1)
- ADR-012 implementation PR (RLS migration cleanup)
- ADR-013 implementation PR (compliance_events Postgres-level append-only)
- TS Phase 2 Cluster A remaining (3 of 5 — Prisma `Payment` schema gap)
  and Clusters D/E/F/G (per `docs/plans/2026-04-27-typescript-phase-2-cluster-analysis.md`)
- Lighthouse CWV (TTI 0.81 → 0.9) — D5 in `docs/plans/2026-04-27-d1-d5-recommendation.md`
- Smoke test: 2 known failing (`/admin`, `/log-error`) — fix or document skip
- DR-803 deployment — Vercel `RESEND_FROM_EMAIL` env var update

### Phill action queue (mostly closed today)

- ✅ MCP browser perms (PowerShell one-liner ran)
- ✅ GoDaddy DNS — 4 DKIM/SPF/DMARC records + A record for `.au`
- ✅ Vercel domain — `disasterrecovery.au` added as redirect alias
- ✅ Stripe CLI OAuth re-auth against DR account
- ⏳ Stripe legacy product archive (7 × `prod_HL*` via dashboard)
- ⏳ Vercel Stripe test-mode keys for Preview env (DR-509)
- ⏳ Optional: rotate the `sk_test_*` for Unite-Group account (briefly leaked into agent context this session)
- DEFERRED: counsel emails (funds-constrained)

## 2026-04-26 — Voice agent web-widget production surface

**Outcome:** voice agents (Sarah/Tannika + Olivia) now ship to production
via in-browser ElevenLabs convai widget, NOT Twilio. Twilio scaffolding
remains in repo for future use; no signup required to operate.

### What landed

- **Olivia** (`agent_7401kq4k2xd9ep9rbsngfy40jp60`) — new contractor
  onboarding voice agent. Voice "Olivia" from EL voice library
  (voiceId `ChvixV5Kt063KajV05qE`). Published live in EL dashboard.
- **Tannika/Sarah** v2 system prompt + first message published live
  in EL dashboard (PR #203 + manual deploy).
- `<VoiceWidget agent="olivia|sarah" />` React component on
  `/contractor/apply` and `/claim`. Gated behind
  `NEXT_PUBLIC_VOICE_WIDGET_ENABLED`.
- `<VoiceConsentModal>` runs APP 8 consent gate BEFORE EL widget
  script loads. Decline / silence / Esc → no script load, no audio.
- `/api/voice/widget-consent` logs consent to compliance_events
  ledger (consentMethod: 'web_widget').
- Knowledge base content packs in `docs/voice-knowledge-base/`
  (7 markdown files) — manual upload to EL Convai > Knowledge Base.

### Production surface today

| Surface                             | Status                                   |
| ----------------------------------- | ---------------------------------------- |
| EL Convai dashboard agents          | Sarah, Maya, Olivia — all published live |
| Twilio inbound number for Sarah     | Not signed up — repo scaffolding only    |
| Browser widget on /contractor/apply | Code shipped, flag OFF                   |
| Browser widget on /claim            | Code shipped, flag OFF                   |

### Activation

To turn on the widget in production: set
`NEXT_PUBLIC_VOICE_WIDGET_ENABLED=true` in Vercel project settings,
redeploy. APP 8 consent gate fires before any EL script loads. To
roll back: flip the env var to false.

## 2026-04-24 — Foundation Sprint COMPLETE

**Outcome:** all six foundation dimensions at 10/10. Documentation
reached 10/10 with Polish 8 (docs-only, this PR).

### Ten-day sprint PRs

Days 1–10 of the sprint produced the scaffold and the first wave of
ADRs. Dates are the approximate merge window; exact PR numbers are
tracked in Linear against DR-700 series.

- Day 1 — Inventory + scoring baseline.
- Day 2 — Zod schema consolidation under
  `src/lib/validation/schemas.ts`.
- Day 3 — `tsconfig.strict.json` + rollout plan.
- Day 4 — CI hard gates: `tsc`, `lint`, smoke, `prettier --check`.
- Day 5 — Observability API surface at `src/lib/observability/`.
- Day 6 — Husky + commitlint + lint-staged + Prettier.
- Day 7 — Vitest + Playwright wired to CI.
- Day 8 — Feature-flag hygiene sweep.
- Day 9 — Observability backend wired.
- Day 10 — Docs reorganisation + first ADRs.

### Polish PR wave

- **Polish 1** — Strict TS expansion.
- **Polish 2** — API handler `captureException` migration across
  `app/api/**/route.ts`.
- **Polish 3** — Dedup + CI hardening (flipped lint warnings → errors).
- **Polish 4** — Vercel-native observability swap (ADR-005).
- **Polish 5** — Client `console.*` → structured `clientLogger`.
- **Polish 6** — Vitest unit tests on validation/observability/voice/
  compliance libs.
- **Polish 7** — `Step5HealthSafety` god-component decomposition
  (1,210 lines → orchestrator + 10 sub-components). Commit
  `a615ff04`. See ADR-009.
- **Polish 8** — Docs richness. This PR.
  - `docs/adr/ADR-006-foundation-sprint-outcomes.md`
  - `docs/adr/ADR-007-pre-commit-and-ci-discipline.md`
  - `docs/adr/ADR-008-pocock-skills-framework-adoption.md`
  - `docs/adr/ADR-009-god-component-decomposition.md`
  - `docs/how-to/add-a-new-api-route.md`
  - `docs/how-to/add-a-new-feature-flag.md`
  - `docs/how-to/run-the-foundation-sprint-checklist.md`
  - `CONTRIBUTING.md`
  - `.context/domain-models.md` (+ Prisma mapping table, state
    machines, relationships diagram, known drift list)
  - `CLAUDE.md` (+ table of contents)
  - `MEMORY.md` (this file)

### Scheduled follow-ups

- Decompose `Step0Eligibility` (god component, 920 lines). Pattern
  from ADR-009.
- Decompose `SubContractorManager` (god component, 1,080 lines).
  Pattern from ADR-009.
- Promote `compliance_events` from raw SQL to a first-class Prisma
  model, or commit to raw SQL and write an ADR explaining the
  append-only constraint.
- Add persistent models for `Booking`, `VoiceCall`, `FinanceReferral`
  (currently in-memory; see `.context/domain-models.md` → Known
  drift).

## 2026-04-23 — Voice pipeline (flag-off)

Merged DR-708 (ElevenLabs port), DR-709 (Sarah system prompt + RAG),
DR-710 (five approved tools), DR-711 (topic classifier), DR-713
(APP 8 consent), DR-714 (redaction + retention cron), DR-715
(5-layer kill switch). All flag-gated off in production. Runbooks in
`docs/voice-*.md`.

## 2026-04-20 — Finance partner switch

PR #77 migrated finance referrals Blue Fire → Equipped Commercial.
`/finance` referral flow added, gated behind
`FINANCE_REFERRAL_WRITER_ENABLED` (still in-memory — see Known drift).

## 2026-04-14 — Compliance baseline

Waves 8–16 landed: honest CTA copy (no "60-minute response" claims
without qualification), cookie banner + consent-mode v2, APP 3
collection notices, NZ Consumers supplementary terms, NZ CGA/FTA
notice on location pages, Clarity session-recording disclosure,
privacy overseas-disclosure table, Equipped consent form
(flag-gated), `compliance_events` table + feature-flagged writer.

## Pointer to the old MEMORY.md

The global `~/.claude/projects/C--Disaster-Recovery/memory/MEMORY.md`
remains the personal-context log for Phill across sessions (design
conventions, visual framework, historical fixes, contrast audit
details). This repo-root `MEMORY.md` is the project-facing sprint log
that stays with the code.
