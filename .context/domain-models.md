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
| **Invoice**                | `Invoice`, `ContractorInvoice`                                   | `Invoice` for agency-side billing; `ContractorInvoice` for contractor subscriptions and payouts.                                                                                                                                                        |
| **Agency**                 | `Agency`                                                         | Owning organisation (parent of `User`, `Client`, `Contractor`).                                                                                                                                                                                         |
| **Client**                 | `Client`                                                         | End-customer / policyholder. Linked from `InsuranceClaimAU.clientId`.                                                                                                                                                                                   |
| **Lead**                   | `Lead`, `LeadTracking`, `LeadNote`                               | Pre-claim funnel entity. A converted `Lead` produces a `Client` + `InsuranceClaimAU`.                                                                                                                                                                   |
| **Voice call**             | `VoiceCall` + `CallTranscript` (audit B13 scaffold)              | Prisma models landed; webhook extractor wiring still owed (separate PR). Flag-gated via `VOICE_AGENT_ENABLED`. DR-714 retention cron now has a target.                                                                                                  |
| **Finance referral**       | `FinanceReferral` + `FinanceReferralEvent` (audit B12 scaffold)  | Prisma models landed; persistence-helper module landed at `src/lib/finance/persistence.ts`. Live API + webhook store wiring to the helper still owed (separate PR — gated on partner DPA finalising). Flag-gated via `FINANCE_REFERRAL_WRITER_ENABLED`. |
| **Compliance event**       | `compliance_events` table via raw SQL / Prisma `ComplianceEvent` | DR-624 writer is feature-flagged. Append-only, structured for APP 12 access requests.                                                                                                                                                                   |
| **Consent record**         | `Consent`, `ConsentEvent`                                        | APP 3 (collection) + APP 8 (overseas disclosure) + consent-mode v2 surface.                                                                                                                                                                             |
| **Partner**                | `Partner`, `PartnerBilling`, `PartnerPayment`                    | Commercial partnerships (finance, insurance, referral networks).                                                                                                                                                                                        |
| **Enquiry**                | `Enquiry`                                                        | General contact-form submissions that have not been qualified into a `Lead`.                                                                                                                                                                            |
| **Notification**           | `Notification`                                                   | User-facing in-app notifications. SMS/email delivery handled out-of-band.                                                                                                                                                                               |
| **Certification**          | `ContractorCertification`                                        | IICRC S500/S520, WHS tickets, insurance evidence. Expiry-driven reminders.                                                                                                                                                                              |
| **Territory**              | `ContractorTerritory`                                            | Service area geofencing. Joined to suburb data for claim routing.                                                                                                                                                                                       |
| **KPI**                    | `ContractorKPI`                                                  | Response time, completion rate, client rating aggregates.                                                                                                                                                                                               |
| **Audit**                  | `Audit`                                                          | Generic audit trail for admin-triggered state changes.                                                                                                                                                                                                  |

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
- ~~**FinanceReferral is in-memory only.**~~ Resolved by audit B12
  scaffold (this PR): `FinanceReferral` + `FinanceReferralEvent`
  Prisma models landed (already populated by L9 Phase 2 work in PR
  #77 follow-ups), and the B13-style persistence helper is now at
  `src/lib/finance/persistence.ts`, flag-gated via
  `FINANCE_REFERRAL_WRITER_ENABLED`. Follow-up owed: wire the live
  submission path (`app/api/finance/referral/route.ts`) and the
  webhook store (`src/lib/finance/referral-store.ts`) onto the
  helper — separate PR, gated on partner DPA finalising. See ADR on
  finance partner switch in PR #77.
- ~~**VoiceCall has no persistent model.**~~ Resolved by audit B13
  scaffold (this PR): `VoiceCall` + `CallTranscript` Prisma models
  landed with the DR-714 retention cron now having a target. DR-708
  pipeline is still flag-off; kill-switch (DR-715) is live. Follow-up
  owed: webhook extractor wiring at
  `app/api/voice/elevenlabs/webhook/route.ts` to populate the new
  tables (separate PR).
- **Compliance events schema is append-only raw SQL.** The Prisma
  client reads it via a typed view; writes go via a raw SQL helper
  feature-flagged behind `COMPLIANCE_EVENTS_WRITER_ENABLED`. A future
  ADR will decide whether to promote to a first-class Prisma model or
  keep as raw SQL for append-only guarantees.
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
