# Disaster Recovery — Domain Models

> **NOT LEGAL ADVICE.** This document names domain concepts for engineering
> reference. Compliance obligations (ACL, CGA/FTA, APP, IICRC S500/S520) are
> resolved in `/legal/**` source-of-truth pages and in the organisation's
> counsel opinions, not here.

This file is the canonical mapping between DR's ubiquitous language
(see `UBIQUITOUS_LANGUAGE.md` at repo root, 29 canonical terms) and the
code that implements each concept. If you are making a schema change,
start here. If you are writing a new API contract, start here.

## Quick index

- [Prisma mapping table](#prisma-mapping-table) — each domain concept →
  the Prisma model (or explicit absence) that represents it.
- [State machines](#state-machines) — claim, contractor, job lifecycles.
- [Relationships diagram](#relationships-diagram) — ASCII map of how the
  core entities connect.
- [Known drift](#known-drift) — open items where the code does not yet
  match the model.
- [Cross-references](#cross-references) — ADRs, Zod schemas, rule files.

## Prisma mapping table

| Domain concept             | Prisma model / location                                          | Notes                                                                                                                                                                                                                                                   |
| -------------------------- | ---------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Claim**                  | `InsuranceClaimAU` in `prisma/schema.prisma`                     | Canonical claim entity. AU-specific. NZ claims reuse the same model with `country: 'NZ'` and CGA fields populated.                                                                                                                                      |
| **Contractor**             | `User` with `role = 'contractor'` + `Contractor` profile         | Auth via `User`; domain data on `Contractor`. Applications flow through `ContractorApplication` before `Contractor` is created.                                                                                                                         |
| **Contractor application** | `ContractorApplication`                                          | Seven-step onboarding. Step data persisted incrementally. Becomes a `Contractor` on final approval.                                                                                                                                                     |
| **Booking**                | _(no persistent model yet — see [Known drift](#known-drift))_    | Currently an in-memory concept in the `/claim` flow. Persists as a `Claim` with `status: 'submitted'`.                                                                                                                                                  |
| **Invoice**                | `ContractorInvoice` (only)                                       | Contractor subscriptions and payouts. The agency-side `Invoice` model was a phantom (DR-804 Bucket 3) and has been removed; agency-side billing happens directly in Stripe today.                                                                       |
| **Agency**                 | _(no Prisma model — DR-804 Bucket 3 cleanup, 2026-04-30)_        | The `Agency` Prisma model was a phantom and was removed in DR-804 Step 1.5 along with the entangled CRM cluster (`Audit`, `Invoice`, `Proposal`, `Client`). Agency-orchestrator behaviour is configured in code, not modelled in DB.                    |
| **Client**                 | _(no Prisma model — DR-804 Bucket 3 cleanup, 2026-04-30)_        | The `Client` Prisma model was a phantom — zero deployed-route call sites. Claim-flow uses `InsuranceClaimAU` directly (with embedded contact fields) and `Enquiry` for pre-claim contact. Removed in DR-804 Step 1.5.                                   |
| **Lead**                   | `Lead`, `LeadTracking`, `LeadNote`                               | Pre-claim funnel entity. A converted `Lead` produces a `Client` + `InsuranceClaimAU`.                                                                                                                                                                   |
| **Voice call**             | `VoiceCall` + `CallTranscript` (audit B13 scaffold)              | Prisma models landed; webhook extractor wiring still owed (separate PR). Flag-gated via `VOICE_AGENT_ENABLED`. DR-714 retention cron now has a target.                                                                                                  |
| **Finance referral**       | `FinanceReferral` + `FinanceReferralEvent` (audit B12 scaffold)  | Prisma models landed; persistence-helper module landed at `src/lib/finance/persistence.ts`. Live API + webhook store wiring to the helper still owed (separate PR — gated on partner DPA finalising). Flag-gated via `FINANCE_REFERRAL_WRITER_ENABLED`. |
| **Compliance event**       | `compliance_events` table via raw SQL / Prisma `ComplianceEvent` | DR-624 writer is feature-flagged. Append-only, structured for APP 12 access requests.                                                                                                                                                                   |
| **Consent record**         | `Consent`, `ConsentEvent`                                        | APP 3 (collection) + APP 8 (overseas disclosure) + consent-mode v2 surface.                                                                                                                                                                             |
| **Partner**                | `Partner`, `PartnerBilling`, `PartnerPayment`                    | Commercial partnerships (finance, insurance, referral networks).                                                                                                                                                                                        |
| **Enquiry**                | `Enquiry`                                                        | General contact-form submissions that have not been qualified into a `Lead`.                                                                                                                                                                            |
| **Notification**           | _(no Prisma model — DR-804 Bucket 3 cleanup, 2026-04-30)_        | The Prisma `Notification` model was a phantom (no live table, zero deployed-route call sites). Removed in DR-804 Step 1. In-app notifications today are handled via Resend email + Twilio SMS direct from the API route — no DB persistence layer.      |
| **Certification**          | `ContractorCertification`                                        | IICRC S500/S520, WHS tickets, insurance evidence. Expiry-driven reminders.                                                                                                                                                                              |
| **Territory**              | `ContractorTerritory`                                            | Service area geofencing. Joined to suburb data for claim routing.                                                                                                                                                                                       |
| **KPI**                    | `ContractorKPI`                                                  | Response time, completion rate, client rating aggregates.                                                                                                                                                                                               |
| **Audit**                  | `AuditLog` (only)                                                | Admin-triggered state-change ledger. The legacy CRM-style `Audit` model was a phantom (DR-804 Bucket 3) and has been removed; `AuditLog` is the canonical surface used by `app/api/audit/log/route.ts` and the analytics-compliance route.              |

### How to use this table

- **Before adding a new API route:** find the domain concept in this
  table. If it has a model, import it. If it says "no persistent model
  yet", decide whether this route is the one that finally adds
  persistence — if so, open a schema change ticket first (see ADR-008
  on `design-an-interface`).
- **Before proposing a schema change:** update this table in the same
  PR. Drift between this doc and `prisma/schema.prisma` is a review
  blocker.

## State machines

### Claim lifecycle

```
submitted ──▶ triaged ──▶ dispatched ──▶ in_progress ──▶ completed ──▶ invoiced
     │             │              │              │              │
     │             │              │              │              └─▶ disputed
     │             │              │              └─▶ cancelled
     │             │              └─▶ redispatched (loop back to triaged)
     │             └─▶ ineligible
     └─▶ withdrawn
```

- **`submitted`** — claim created via `/claim` form. Minimum viable
  record: client contact, incident type, loss address, consent flags.
- **`triaged`** — internal review complete. Severity, category, and
  response window assigned. Transition logs a `compliance_event` with
  APP 3 lineage.
- **`dispatched`** — a matching contractor has been notified and
  accepted. `Contractor.id` attached to `InsuranceClaimAU`.
- **`in_progress`** — contractor is onsite or actively working the
  job. First contractor status update flips this state.
- **`completed`** — contractor has submitted proof-of-work and the
  client has signed off.
- **`invoiced`** — `Invoice` record created and delivered. Payment
  tracking handoff to finance.
- **Terminal off-happy-path states** — `disputed`, `cancelled`,
  `ineligible`, `withdrawn`. Each writes a distinct compliance event.

### Contractor lifecycle

```
applicant ──▶ under_review ──▶ approved ──▶ active ──▶ suspended
     │              │              │           │           │
     │              │              │           │           └─▶ reinstated (→ active)
     │              │              │           └─▶ offboarded (terminal)
     │              │              └─▶ rejected (terminal)
     │              └─▶ more_info_requested (loop back to applicant)
     └─▶ abandoned (no action 30+ days)
```

- **`applicant`** — `ContractorApplication` exists; `Contractor` does not.
- **`under_review`** — all seven onboarding steps submitted; DR team
  reviewing.
- **`approved`** — manual approval. `Contractor` created, `User.role`
  flipped.
- **`active`** — receiving dispatch, appears in match pool.
- **`suspended`** — temporary hold (KPI breach, insurance lapse,
  complaint under investigation). Does not receive dispatch.

### Job lifecycle (contractor-side view of a claim)

```
assigned ──▶ accepted ──▶ in_progress ──▶ completed ──▶ invoiced ──▶ paid
     │            │              │              │              │
     │            │              │              │              └─▶ payment_disputed
     │            │              │              └─▶ remediation_required
     │            │              └─▶ paused (client unavailable, access issue)
     │            └─▶ declined (loops back, claim re-enters dispatch)
     └─▶ rescinded (admin pulled the assignment)
```

## Relationships diagram

```
                     ┌─────────┐
                     │ Agency  │
                     └────┬────┘
                          │ owns
            ┌─────────────┼─────────────┐
            ▼             ▼             ▼
        ┌───────┐    ┌────────┐    ┌───────────┐
        │ User  │    │ Client │    │ Contractor│
        └───┬───┘    └────┬───┘    └─────┬─────┘
            │             │              │
            │ creates     │ files        │ services
            │             ▼              │
            │      ┌──────────────────┐  │
            └─────▶│ InsuranceClaimAU │◀─┘
                   └────────┬─────────┘
                            │
                 ┌──────────┼──────────┐
                 ▼          ▼          ▼
           ┌─────────┐ ┌────────┐ ┌──────────────┐
           │ Invoice │ │ Audit  │ │ Consent      │
           └─────────┘ └────────┘ │ ConsentEvent │
                                  └──────────────┘

   ┌──────────────────────────┐       ┌─────────────────────┐
   │ ContractorApplication    │──────▶│ Contractor (on      │
   │ (7-step onboarding)      │       │  approval)          │
   └──────────────────────────┘       └──────────┬──────────┘
                                                 │
                              ┌──────────────────┼──────────────────┐
                              ▼                  ▼                  ▼
                  ┌──────────────────┐ ┌──────────────────┐ ┌────────────────┐
                  │ Certification    │ │ Territory        │ │ KPI            │
                  └──────────────────┘ └──────────────────┘ └────────────────┘

   ┌──────┐       ┌───────┐        ┌─────────┐
   │ Lead │──────▶│ Client│───────▶│ Claim   │   (qualification funnel)
   └──────┘       └───────┘        └─────────┘
```

Not shown above: `Enquiry` (pre-Lead), `Notification` (cross-cutting),
`Partner*` (commercial), `compliance_events` (append-only audit).

## Known drift

Open items where the ubiquitous language includes a concept that the
code does not yet persist or fully model. Each item links to an ADR
or ticket tracking the resolution.

- **God components not yet decomposed.** ADR-009 decomposes Step5;
  `Step0Eligibility` and `SubContractorManager` are scheduled. Until
  those PRs land, their domain surface lives inline in a single file.
- **Booking has no persistent model.** The `/claim` form creates a
  `Claim` directly with `status: 'submitted'`. A future `Booking` model
  would sit between the form and the claim (scheduling, slot holds,
  deferred payment capture). Tracked under the claim-flow epic.
- ~~**FinanceReferral is in-memory only.**~~ **Resolved.** Live route
  `app/api/finance/referral/route.ts:202` writes via
  `prisma.financeReferral.create()` directly (verified 2026-04-27).
  `src/lib/finance/referral-store.ts` (webhook side) is also Prisma-
  backed since L9 Phase 2 (PR #77). The persistence helper at
  `src/lib/finance/persistence.ts` is the _idempotent upsert_ surface;
  wiring through it is owed FOR CONSISTENCY (not correctness) and
  remains gated on partner DPA finalising. See
  `docs/finance-referral-persistence-state-2026-04.md` for the full
  current-state note.
- ~~**VoiceCall has no persistent model.**~~ **Resolved.** `VoiceCall` +
  `CallTranscript` Prisma models landed (B13 scaffold). Webhook
  extractor wiring at `app/api/voice/elevenlabs/webhook/route.ts`
  landed in PR #219. DR-708 pipeline is flag-off; kill-switch
  (DR-715) is live. Retention cron target documented; cron infra
  setup deferred to next sprint.
- ~~**Compliance events schema is append-only raw SQL.**~~ **No longer
  drift — architectural exception.** See ADR-013
  (`docs/adr/ADR-013-compliance-events-raw-sql-append-only.md`,
  proposed 2026-04-27). The raw-SQL writer pattern is intentional:
  Prisma cannot express append-only at the type level, but Postgres
  CAN via `REVOKE UPDATE, DELETE`. ADR-013 implementation PR will
  add the database-level guarantee + a typed reader helper.
  Compliance_events deliberately has no Prisma model — see
  `src/lib/compliance/events.ts` for the writer; do NOT add a Prisma
  model for this table.
- **Territory geofencing uses string suburb names, not geometries.**
  Service-area matching is coarse. A future `Territory` enhancement
  would use PostGIS polygons.

## Cross-references

### ADRs

- [ADR-001](../docs/adr/ADR-001-gemma4-multilingual.md) — multilingual
  translation architecture.
- [ADR-005](../docs/adr/ADR-005-vercel-native-observability.md) —
  observability surface used by every API handler.
- [ADR-006](../docs/adr/ADR-006-foundation-sprint-outcomes.md) —
  ten-day plan + polish PR wave context.
- [ADR-007](../docs/adr/ADR-007-pre-commit-and-ci-discipline.md) —
  CI gates every schema change must pass.
- [ADR-008](../docs/adr/ADR-008-pocock-skills-framework-adoption.md) —
  `design-an-interface` lives on top of this doc.
- [ADR-009](../docs/adr/ADR-009-god-component-decomposition.md) —
  pattern for splitting large components.

### Zod schemas (API contracts)

- `src/lib/validation/schemas.ts` — every API contract. If a concept
  in the Prisma table above gets a new route, its Zod schema goes here
  first.
- `src/lib/validation/__tests__/` — schema unit tests (Polish 6).

### Agent-facing rules

- `.claude/rules/schema-changes.md` — short form of "when to update
  this file".
- `.claude/rules/ci-discipline.md` — short form of ADR-007.
- `.claude/rules/component-size.md` — short form of ADR-009.

### Root-level docs

- `UBIQUITOUS_LANGUAGE.md` — 29 canonical terms, compliance-load-bearing
  flags.
- `MEMORY.md` — living sprint + post-sprint log.
- `CLAUDE.md` — agent entry point, links back here.
- `CONTRIBUTING.md` — repo layout, branch and commit conventions, PR
  workflow.
