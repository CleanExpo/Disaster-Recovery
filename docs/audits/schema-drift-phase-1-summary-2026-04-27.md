# Schema Drift Audit — Phase 1 Summary

**Date:** 27 April 2026 (AEST)
**Authors:** Three parallel senior specialists (15+ years each):

- Schema-drift auditor
- Data-access / raw-SQL auditor
- Dead-model auditor

**Audience:** Phill McGurk + machines 2/3/4 picking up Phase 2.

---

## TL;DR

Phase 1 is **complete.** Three findings change the Phase 2 priority order
versus what was in the continuation roadmap:

1. **P0 — Silent refund-without-record bug** in
   `app/api/payments/refund/route.ts`. Stripe refund fires at line 55
   _before_ the failing DB write at line 72. The DB write fails because
   the Prisma `Payment` model is missing `amount`, `refundAmount`,
   `refundReason`, `refundedAt`, `stripePaymentId`. The catch block at
   line 81 swallows the error. **Money refunds. DB never records it.**
   Fix this in Phase 2 ahead of everything else.
2. **P1 — RLS migration is "on with no policies"** at
   `prisma/migrations/20260409000000_supabase_rls_hardening/migration.sql:24-66`.
   RLS is enabled on 10 tables but every `CREATE POLICY` is commented
   out (line 81+). Working only because `service_role` bypasses RLS;
   any path that switches to anon or authenticated key would lock out
   everyone. Quiet risk, no immediate breakage.
3. **P1 — `app/api/reddit/migrate/route.ts`** is a self-described
   "ONE-TIME MIGRATION ENDPOINT — Delete after use" that runs
   `CREATE TABLE` / `ALTER TABLE` from an unauthenticated HTTP POST.
   Direct violation of `.claude/rules/dev-environment.md` §10. Delete
   in Phase 2.

The good news:

- **0 P0 SQL injection risks.** Both raw-SQL surfaces parameterise
  correctly.
- **Schema is internally consistent.** 79 Prisma models, 78 backing
  migrations, 1 documented exception (`compliance_events`).
- **15 dead models** identified — clean removal opportunity.

---

## Phase 1 outputs (read these for detail)

| File                                                     | Author                   | Lines |
| -------------------------------------------------------- | ------------------------ | ----- |
| `docs/audits/supabase-prisma-drift-2026-04-27.md`        | Schema-drift auditor     | ~226  |
| `docs/audits/raw-sql-audit-2026-04-27.md`                | Data-access auditor      | ~370  |
| `docs/audits/dead-prisma-models-2026-04-27.md`           | Dead-model auditor       | ~210  |
| `docs/audits/schema-drift-phase-1-summary-2026-04-27.md` | This file (orchestrator) | ~150  |

---

## Numbers at a glance

| Metric                                                | Value    | Notes                                                                          |
| ----------------------------------------------------- | -------- | ------------------------------------------------------------------------------ |
| Prisma models in `schema.prisma`                      | 79       | Was 3 in Feb 2026 — massive growth.                                            |
| Migration tables (CREATE TABLE in `migrations/*/`)    | 78       | All 79 models except `compliance_events` have a backing migration.             |
| Supabase tables not in Prisma (per Feb introspection) | 87 → ~74 | 13 resolved since Feb (snake_case `@@map` + post-Feb model adds).              |
| Dead Prisma models (zero references)                  | 15       | 13 safe to drop now. 2 need deprecation cycle.                                 |
| Raw SQL invocations (`$executeRaw*`, `$queryRaw*`)    | 14       | All across 2 files: 1 in compliance writer, 13 in the reddit migrate endpoint. |
| P0 injection risks                                    | 0        | Both raw-SQL surfaces parameterised.                                           |
| RLS-enabled tables with zero policies                 | 10       | All commented out. Not breaking; quiet risk.                                   |

---

## Phase 2 priority list (revised by audit findings)

Ordered by risk × independence. Each item is a single PR.

### P0 — Refund route audit + Payment schema fix

- **Diagnose:** is `Payment` the wrong model? Does a `Refund` model
  exist already? Or are the fields missing from the schema?
- **Likely action:** add the missing fields via a new migration, OR
  rewire the refund route to a different model (perhaps a `Refund`
  table linked to `Booking`).
- **Tests:** add a test that fails if `prisma.payment.updateMany` is
  called with a non-existent field.
- **Effort:** 1 day diagnosis + 1 day fix + tests.
- **Owner candidate:** human-supervised — Stripe + Prisma overlap.

### P1 — Delete `app/api/reddit/migrate/route.ts`

- The file says "Delete after use" in its own header.
- Verify the migration it ran is captured in
  `prisma/migrations/`. If yes, delete the route.
- If no, generate the missing Prisma migration first, then delete.
- **Effort:** 2 hours.

### P1 — RLS policies — decide and implement

- Either flip `service_role` is the only access path (document this in
  an ADR) and drop the RLS-without-policies façade,
- OR implement the `CREATE POLICY` statements for all 10 tables (real
  RLS — auditor-friendly, future-proof).
- **Effort:** 1-2 days for full RLS, 2 hours for the ADR decision.

### P1 — `compliance_events` Prisma promotion vs ADR

- Pending decision documented in `.context/domain-models.md` "Known
  drift". Either:
  - Promote to a first-class Prisma model + add `@@map("compliance_events")`,
  - OR write an ADR explaining the append-only raw-SQL guarantee
    (Prisma can't enforce "append-only" at the type level, but
    Postgres can via revoking UPDATE/DELETE on the writer role).
- **Effort:** 1 day.

### P2 — Refresh `prisma/supabase-tables-introspection.md`

- Replace the Feb 2022 generation with a current `prisma db pull`
  output.
- This is the canonical drift reference doc; staleness undermines
  everything that links to it.
- Requires DATABASE_URL — needs Phill or a session with Vercel env
  pull access.
- **Effort:** 30 minutes once env is available.

### P2 — Drop the 13 safely-dead Prisma models

- `BotMetrics`, `ClientProfile`, `ContractorAgreement`,
  `ContractorCertification`, `ContractorDocument`, `ContractorInvoice`,
  `ContractorProject`, `ContractorReference`, `ContractorSupport`,
  `ContractorTraining`, `GuideStep`, `PartnerPayment`, `SupportMessage`.
- Each gets a migration that drops the table (or a `@@ignore` to
  retain the table for audit purposes — pick one policy).
- **Effort:** 1 day for the 13.

### P3 — Deprecation cycle for `CostEstimate` + `SubscriptionPricing`

- These have Stripe + pricing-tool integration surface. Mark
  `@@deprecated`, search for any external reference, plan removal in
  the next sprint.
- **Effort:** 1 day audit + 1 sprint deprecation.

### P3 — CI lint: hand-edited migration detector

- Per `.claude/rules/dev-environment.md` §10, raw SQL migrations are
  forbidden — only Prisma Migrate.
- Today no enforcement. Add a check that flags any `migration.sql`
  containing patterns Prisma wouldn't generate (e.g. inline comments
  longer than 5 lines, manual `IF NOT EXISTS` guards).
- **Effort:** 4 hours.

### P3 — Allow-list raw SQL surfaces in CI

- After the reddit-migrate route is deleted, the only legitimate raw
  SQL is in `src/lib/compliance/events.ts`. Add a CI check that
  `$executeRaw*` / `$queryRaw*` calls only appear in allow-listed
  files.
- **Effort:** 2 hours.

---

## Two Active edge-cases worth re-examining

The dead-model auditor flagged `BackgroundCheck` and
`ContractorAvailability` as Active because of TypeScript interfaces
sharing those names — but both have **zero `prisma.x.` queries.**
The "active" usage is from local interface declarations in mock
dashboard components, not real DB access. Reclassify as Dead once you
confirm the mock components are retired.

---

## Two `User` tables — needs live DB

The schema-drift auditor flagged a possible duplicate: Prisma's
`User` (PascalCase) vs Supabase's `users` (lowercase) at introspection
line 1881. Cannot resolve without `npx prisma db pull`. Track under
P2 above (refresh introspection).

---

## What did NOT show up

Things that are NOT in the gap report — explicitly checked clean:

- All 79 Prisma models have backing migration tables (Section B of
  schema-drift = empty).
- No injection vulnerabilities anywhere.
- No raw SQL hits a table that doesn't have a Prisma model (other
  than `compliance_events`, which is documented).
- No undocumented schema edits in any of the 14 migrations — every
  `CREATE TABLE` traces to a migration directory.

---

## References

- `prisma/schema.prisma` — current canonical schema (79 models, 2,225 lines)
- `prisma/migrations/` — 14 migration directories
- `prisma/supabase-tables-introspection.md` — STALE (Feb 2026); refresh planned
- `.context/domain-models.md` — "Known drift" entry for `compliance_events`
- `.claude/rules/dev-environment.md` §10 — raw SQL migration prohibition
- ADR pending — `compliance_events` promotion vs raw-SQL formalisation
- PR #230 — surfaced the `Payment` model gap that triggered this audit
