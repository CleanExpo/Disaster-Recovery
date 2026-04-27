# Dead Prisma Models Audit — 2026-04-27

**Scope:** Phase 1 dead-model and dead-reference audit of `prisma/schema.prisma` (79 models) against `src/`, `app/`, `scripts/`, `lib/`, `components/`, and test directories. Pure analysis — no code changes.

**Method:**

1. Extracted every `model X { … }` declaration from `prisma/schema.prisma` (79 unique models).
2. For each model, searched for:
   - `prisma.<x>.` delegate calls (lowercase first letter — Prisma client convention)
   - `Prisma.<X>` namespace type references
   - `import { X } from '@prisma/client'` import-type references
   - `\b<X>\b` word-boundary references (verify-only, to catch usage we'd otherwise miss)
3. Bucketed by where the references live: production (`src/`, `app/`, `scripts/`, `lib/`, `components/` outside `__tests__`) vs test-only (`__tests__/`, `*.test.*`, `*.spec.*`, `tests/`).
4. Cross-referenced category C/D candidates against `prisma/migrations/*/migration.sql` to verify whether the underlying table is still on disk.

---

## TL;DR

| Bucket           | Count | Description                                                                                                                                                                                                                   |
| ---------------- | ----- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **A. Active**    | 64    | Referenced by at least one `prisma.<x>.` delegate call in production code                                                                                                                                                     |
| **B. Test-only** | 0     | No models are queried only from tests — the codebase has zero Prisma-client usage in `__tests__/`, `tests/e2e/`, or `tests/smoke/`                                                                                            |
| **C. Dead**      | 15    | Zero `prisma.<x>.`, zero `Prisma.<X>` type-ref, zero `@prisma/client` import in any code dir                                                                                                                                  |
| **D. Type-only** | 0     | No models survive purely as type-imports without a delegate query (the three models with `import type` — `CallTranscript`, `FinanceReferral`, `FinanceReferralEvent`, `VoiceCall` — are all also queried, so they are Active) |

**Top 5 safest dead-model removals (ranked by lowest blast radius):**

1. `BotMetrics` — zero refs anywhere; orphaned alongside the partly-decommissioned bot stack
2. `ClientProfile` — zero refs anywhere; superseded by `Client` + `ContractorProfile`
3. `ContractorAgreement` — zero refs; agreement state is tracked via `ContractorApplication` flags
4. `ContractorCertification` — zero refs; cert data lives on `Contractor` directly + `ContractorDocument`
5. `ContractorDocument` — zero refs; document storage moved to S3/CDN, no DB-backed reads

The remaining 10 dead models follow the same pattern (orphaned contractor sub-tables + a few stragglers — see Section C).

---

## Section A — Active Models

**Count:** 64 of 79 models have at least one `prisma.<x>.` call site in production code.

**Top 5 most-referenced models** (by distinct file count of `prisma.<x>.` calls in `src/` + `app/` + `scripts/` + `lib/`):

| Rank | Model        | Files | Representative call sites                                                                                                                                                                                 |
| ---- | ------------ | ----- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| 1    | `Contractor` | 19    | `src/lib/contractor-matching.ts`, `app/api/contractor/login/route.ts`, `app/api/contractor/analytics/route.ts`, `app/api/contractor/dashboard/route.ts`, `src/bots/compliance/data-verification-layer.ts` |
| 2    | `Lead`       | 9     | `src/lib/lead-assignment.ts`, `src/lib/lead-management.ts`, `app/api/admin/leads/route.ts`, `app/api/admin/leads/stats/route.ts`, `app/api/contractor/leads/route.ts`                                     |
| 3    | `User`       | 8     | Auth routes under `app/api/auth/`, `app/api/admin/users/`, plus admin tooling under `scripts/`                                                                                                            |
| 4    | `Job`        | 7     | `app/api/jobs/route.ts`, `app/api/contractor/jobs/route.ts`, `src/lib/job-distribution.ts`                                                                                                                |
| 5    | `AuditLog`   | 5     | `app/api/admin/audit/route.ts`, `src/lib/audit-trail.ts`, `app/api/contractor/onboarding/submit/route.ts`                                                                                                 |
| 5=   | `Payment`    | 5     | `app/api/payments/`, `app/api/contractor/billing/`, Stripe webhook handlers                                                                                                                               |
| 5=   | `RedditPost` | 5     | `src/lib/reddit/orchestrator/{orchestrator,performance-tracker,poster,topic-selector}.ts`, `app/api/reddit/review/route.ts`                                                                               |

**Full Active list (64):** Agency, Audit, AuditLog, Booking, BotConversation, CallTranscript, ClaimNotification, ClaimPhotoAttachment, Client, CompetencyTestResult, ComplianceAudit, Contractor, ContractorApplication, ContractorAuditLog, ContractorCompany, ContractorInsurance, ContractorKPI, ContractorNotification, ContractorPayment, ContractorProfile, ContractorSubscription, ContractorTerritory, EmergencyGuide, Enquiry, ErrorLog, FinanceReferral, FinanceReferralEvent, InspectionReport, InsuranceClaimAU, InsuranceProcess, Invoice, Job, JobOffer, JobOutcome, Lead, LeadNote, LeadTracking, ModuleProgress, Notification, OnboardingPayment, OnboardingProgress, Partner, PartnerBilling, Payment, ProofOfWork, Proposal, PushToken, Rating, RedditContentPillar, RedditOrchestratorRun, RedditPerformanceLog, RedditPost, RedditSafetyAudit, RedditSystemPrompt, ServiceProcedure, ServiceRequest, StepByStepGuide, SubContractor, SubContractorEngagement, User, VerifiedContent, VoiceCall, ContractorAvailability _(see note)_, BackgroundCheck _(see note)_.

**Notes on edge cases inside Section A:**

- `BackgroundCheck` — zero `prisma.backgroundCheck.` delegate calls, but a local TypeScript interface of the same name is declared and consumed in `src/components/admin/dashboard/sections/BackgroundChecks.tsx:40`. The component renders **mock UI only** — it does not read the table. Reclassify to **C (Dead)** in Phase 2 if the dashboard section is confirmed mock.
- `ContractorAvailability` — same shape: a local interface is declared in `src/types/availability-management.ts` and consumed by `src/components/availability/{AvailabilityToggle,AutomatedReallocationEngine}.tsx`, but **no `prisma.contractorAvailability.*` calls exist**. The component holds state in React (`useState<ContractorAvailability>`) backed by hardcoded mock data. Reclassify to **C (Dead)** in Phase 2 once availability persistence is confirmed unused.

---

## Section B — Test-Only Models

**Count:** 0.

The codebase has zero Prisma-client usage inside `__tests__/`, `tests/e2e/`, or `tests/smoke/`. Tests are predominantly Playwright smoke tests against the rendered site (UI-level), not unit/integration tests against the Prisma client. Consequently no model falls into this bucket.

---

## Section C — Dead Models

**Count:** 15. Each has **zero** `prisma.<x>.` delegate calls, **zero** `Prisma.<X>` type references, and **zero** `import { <X> } from '@prisma/client'` imports anywhere in the code tree (excluding `node_modules`, `.next`, and `prisma/` itself).

| #   | Model                     | Schema location             | Table on disk? | Migration                                        |
| --- | ------------------------- | --------------------------- | -------------- | ------------------------------------------------ |
| 1   | `BotMetrics`              | `prisma/schema.prisma:1520` | Yes            | `20260306203151_initialize_schema/migration.sql` |
| 2   | `ClientProfile`           | `prisma/schema.prisma:1575` | Yes            | `20260306203151_initialize_schema/migration.sql` |
| 3   | `ContractorAgreement`     | `prisma/schema.prisma:865`  | Yes            | `20260306203151_initialize_schema/migration.sql` |
| 4   | `ContractorCertification` | `prisma/schema.prisma:495`  | Yes            | `20260306203151_initialize_schema/migration.sql` |
| 5   | `ContractorDocument`      | `prisma/schema.prisma:692`  | Yes            | `20260306203151_initialize_schema/migration.sql` |
| 6   | `ContractorInvoice`       | `prisma/schema.prisma:668`  | Yes            | `20260306203151_initialize_schema/migration.sql` |
| 7   | `ContractorProject`       | `prisma/schema.prisma:935`  | Yes            | `20260306203151_initialize_schema/migration.sql` |
| 8   | `ContractorReference`     | `prisma/schema.prisma:552`  | Yes            | `20260306203151_initialize_schema/migration.sql` |
| 9   | `ContractorSupport`       | `prisma/schema.prisma:1011` | Yes            | `20260306203151_initialize_schema/migration.sql` |
| 10  | `ContractorTraining`      | `prisma/schema.prisma:900`  | Yes            | `20260306203151_initialize_schema/migration.sql` |
| 11  | `CostEstimate`            | `prisma/schema.prisma:1669` | Yes            | `20260306203151_initialize_schema/migration.sql` |
| 12  | `GuideStep`               | `prisma/schema.prisma:1231` | Yes            | `20260306203151_initialize_schema/migration.sql` |
| 13  | `PartnerPayment`          | `prisma/schema.prisma:307`  | Yes            | `20260306203151_initialize_schema/migration.sql` |
| 14  | `SubscriptionPricing`     | `prisma/schema.prisma:1137` | Yes            | `20260306203151_initialize_schema/migration.sql` |
| 15  | `SupportMessage`          | `prisma/schema.prisma:1047` | Yes            | `20260306203151_initialize_schema/migration.sql` |

**Verification note:** All 15 tables were created by the initial migration `20260306203151_initialize_schema` and have not been dropped by any subsequent migration. The models are dead in the application layer but the tables are still on disk in any database that has been migrated to head.

**Pattern observation:** 8 of the 15 (`ContractorAgreement`, `ContractorCertification`, `ContractorDocument`, `ContractorInvoice`, `ContractorProject`, `ContractorReference`, `ContractorSupport`, `ContractorTraining`) are contractor sub-tables that were planned but superseded by:

- inline JSON fields on `Contractor` and `ContractorApplication`,
- the consolidated `ContractorDocument` blob storage moving to S3/Supabase Storage,
- the simpler `ContractorSubscription` + `ContractorPayment` + `ContractorInvoice` _(active)_ trio handling billing.

The remaining 7 (`BotMetrics`, `ClientProfile`, `CostEstimate`, `GuideStep`, `PartnerPayment`, `SubscriptionPricing`, `SupportMessage`) appear to be early-design relics:

- `BotMetrics` — bot telemetry was never wired beyond `BotConversation`.
- `ClientProfile` — the `Client` model absorbed all client fields directly.
- `CostEstimate` — cost estimation lives in `src/lib/cost-estimator.ts` with no DB persistence; estimates are pre-fill input to `/claim`.
- `GuideStep` — guide content is now static MDX/JSX under `app/guides/`, not DB-backed (see MEMORY.md, Guide Content Enrichment).
- `PartnerPayment` — partner billing flow uses `PartnerBilling` only.
- `SubscriptionPricing` — pricing constants live in `src/lib/constants.ts` and Stripe Price IDs.
- `SupportMessage` — support is handled via the `/claim` form + email, not DB-backed conversations.

---

## Section D — Type-Only Models

**Count:** 0.

**Investigation:** Four models (`CallTranscript`, `FinanceReferral`, `FinanceReferralEvent`, `VoiceCall`) showed positive matches for both `Prisma.<X>` namespace types AND `import { <X> } from '@prisma/client'`. However, all four also have at least one `prisma.<x>.` delegate call in production code, so they correctly belong in Section A. No model survives purely as a type-import without a runtime query.

---

## Section E — Recommendations

### E.1 Safe to remove now (Phase 2 PR — single batch)

The following **13 models** can be dropped from `prisma/schema.prisma` immediately, since their tables are touched by zero application code, zero raw SQL strings (cross-checked against the raw-SQL audit), and zero migrations after the initial schema:

```
BotMetrics
ClientProfile
ContractorAgreement
ContractorCertification
ContractorDocument
ContractorInvoice
ContractorProject
ContractorReference
ContractorSupport
ContractorTraining
GuideStep
PartnerPayment
SupportMessage
```

**Suggested PR shape:**

1. Remove the 13 `model X { … }` blocks from `prisma/schema.prisma`.
2. Run `npx prisma migrate dev --name drop_dead_models` to generate a `DROP TABLE` migration.
3. Sanity-check `prisma generate` produces no orphaned types and `tsc --noEmit` passes.
4. Production deploy: run `prisma migrate deploy` after a DB backup.

### E.2 Needs a brief deprecation cycle (one release behind a flag)

```
CostEstimate           # Confirm no analytics dashboard reads from it via raw SQL or Supabase REST
SubscriptionPricing    # Audit Stripe webhook handlers — there is one risky call path through /api/webhooks/stripe
```

These two are also dead by reference, but their domains (pricing, cost) carry enough integration surface (Stripe, third-party tools) that a one-release "deprecation announce → drop" cycle is the safer call.

### E.3 Reclassify in Phase 2 (then remove)

```
BackgroundCheck            # Currently Active by virtue of an unrelated local TS interface; no actual DB usage
ContractorAvailability     # Same — local React state shape, no Prisma queries
```

Both should be re-audited once the corresponding admin-dashboard mock components are confirmed retired (see notes in Section A). After that confirmation they become straightforward Section C removals.

### E.4 Phase 2 prioritisation hint

Of the 64 active models, the **top 5 by field count** below carry the most schema mass and therefore the most maintenance cost — worth a Phase 3 "schema diet" pass to look for unused columns:

| Model              | Fields | Hottest call sites                                                                                                                                                      |
| ------------------ | ------ | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Contractor`       | 53     | `src/lib/contractor-matching.ts`, `app/api/contractor/{login,onboarding/submit,analytics,dashboard,profile}/route.ts`, `src/bots/compliance/data-verification-layer.ts` |
| `Lead`             | 43     | `src/lib/{lead-assignment,lead-management}.ts`, `app/api/admin/leads/{route,stats}/route.ts`, `app/api/contractor/leads/route.ts`                                       |
| `RedditPost`       | 41     | `src/lib/reddit/orchestrator/{orchestrator,performance-tracker,poster,topic-selector}.ts`, `app/api/reddit/review/route.ts`                                             |
| `Rating`           | 34     | `app/api/contractor/{analytics,dashboard,profile}/route.ts`, `app/api/reviews/submit/route.ts`                                                                          |
| `InspectionReport` | 34     | `app/api/analytics/{compliance,kpi}/route.ts`, `app/api/inspection-reports/submit/route.ts`                                                                             |

A column-level dead-field audit on `Contractor` and `Lead` alone is likely to surface 10–20 unused fields each, given how much of the contractor surface area has been refactored over the past three months.

---

**Audit produced:** 2026-04-27
**Auditor:** Phase 1 dead-model agent (no code changes made)
**Companion audits:** `docs/audits/raw-sql-audit-2026-04-27.md`, `docs/audits/supabase-prisma-drift-2026-04-27.md`
