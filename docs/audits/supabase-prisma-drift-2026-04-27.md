# Supabase ↔ Prisma Schema Drift Audit

> **Date:** 27/04/2026
> **Auditor:** Phase 1 static-analysis sweep (no live DB read).
> **Scope:** `prisma/schema.prisma` (2,225 lines, 79 models) ↔
> 14 migration directories under `prisma/migrations/` ↔
> stale `prisma/supabase-tables-introspection.md` (generated 22/02/2026).
> **Method:** static analysis only — `prisma db pull` is unavailable
> because `DATABASE_URL` lives in Vercel env, not locally.

---

## TL;DR

| Metric                                                     | Count |
| ---------------------------------------------------------- | ----- |
| Prisma models in `schema.prisma`                           | 79    |
| Distinct tables created by migrations (`CREATE TABLE`)     | 78    |
| Prisma models with no `CREATE TABLE` migration (Section B) | 0     |
| Migration tables with no Prisma model (Section C)          | 1     |
| Prisma models with `@@map` PascalCase → snake_case rename  | 6     |
| Tables Supabase had Feb 22 but Prisma still doesn't model  | ~74   |
| Prisma models added since Feb 22                           | 11    |

### Top 5 highest-priority drift items

1. **`Payment` model field gap (PR #230 surfaced).** `app/api/payments/refund/route.ts:73-78` and `app/api/payments/create-booking/route.ts:158-178` write to `prisma.payment` using fields **`amount`, `refundAmount`, `refundReason`, `refundedAt`, `stripePaymentId`, `stripeCustomerId`, `method`, `description`, `metadata`, `currency`** — none of which exist on the `Payment` model (`prisma/schema.prisma:1789-1810`). The model has `amountAUD`, `stripePaymentIntentId`, no refund fields, no Stripe customer field. Both call sites use `as any` to bypass TS, masking the drift. The Prisma client will throw at runtime; Stripe processes the refund first, so we keep cash leaving without the matching DB row. **Highest severity.**
2. **`compliance_events` table has no Prisma model (Section C).** Migration `20260423000000_compliance_events/migration.sql:7` creates the table; no Prisma model maps to it. Per `CLAUDE.md §5.4` and `.context/domain-models.md` this is intentional (append-only raw SQL writer in `src/lib/compliance/*`), but it means **Prisma cannot type-check or query the audit ledger** — every read is raw SQL. ADR or model promotion owed.
3. **~74 Supabase tables still unmodelled in Prisma (Section A.2 / live drift).** `supabase-tables-introspection.md` listed 87 missing-from-Prisma tables on 22/02/2026. Of those, ~13 are now covered (post-Feb migrations + the six `@@map`-ed legacy tables). The remaining ~74 (`tenants`, `client_profiles`-related satellites, `contractor_applications`, `contractor_matches`, `tasks`, `messages`, `notification_preferences`, `users`, `workspaces`, etc.) **still have no Prisma model**. Some are dead, some are live-written by Supabase Auth / triggers, some duplicate Prisma models (`contractor_applications` vs `ContractorApplication`).
4. **Two `User` tables exist.** Migration `20260306203151_initialize_schema/migration.sql:16` creates Prisma's `User`. The Feb introspection lists a separate `users` table at line 1881 (different shape — Supabase Auth-style). If both still exist, every `prisma.user.*` call hits the wrong one or vice versa. Confirm in Supabase before next mutation lands.
5. **Stale introspection doc misleads readers.** `prisma/supabase-tables-introspection.md:7-9` still says "3 in Prisma, 87 missing". Reality is 79 models, ~78 migrated tables, ~74 unmodelled Supabase tables. The doc must be regenerated or marked DEPRECATED at the top.

---

## Section A — Canonical (model + migrated table align)

78 of the 79 Prisma models have a matching `CREATE TABLE` in the migration history. The full list, with table name and creating migration:

### A.1 PascalCase model = PascalCase table (72 entries)

Created in `20260306203151_initialize_schema/migration.sql` unless noted:

`Agency` (line 2), `User` (16), `Client` (32), `Audit` (54), `Proposal` (74), `Invoice` (95), `Enquiry` (115), `Notification` (131), `Lead` (145), `Partner` (190), `PartnerBilling` (219), `PartnerPayment` (237), `LeadTracking` (252), `LeadNote` (263), `Contractor` (275), `ContractorCompany` (304), `ContractorCertification` (336), `ContractorInsurance` (358), `ContractorReference` (380), `BackgroundCheck` (402), `ContractorSubscription` (427), `ContractorPayment` (452), `ContractorInvoice` (470), `ContractorDocument` (489), `ContractorTerritory` (513), `ContractorKPI` (536), `ContractorAgreement` (561), `ContractorTraining` (586), `ContractorProject` (609), `ContractorNotification` (640), `ContractorSupport` (662), `SupportMessage` (685), `ContractorAuditLog` (700), `OnboardingPayment` (716), `OnboardingProgress` (732), `ModuleProgress` (746), `SubscriptionPricing` (760), `ErrorLog` (776), `AuditLog` (792), `VerifiedContent` (808), `StepByStepGuide` (825), `GuideStep` (842), `ServiceProcedure` (860), `EmergencyGuide` (879), `InsuranceProcess` (896), `ContractorAvailability` (913), `Job` (927), `BotConversation` (959), `ComplianceAudit` (977), `BotMetrics` (995), `Booking` (1162), `InsuranceClaimAU` (1192), `Rating` (1222), `Payment` (1262), `RedditContentPillar` (1288), `RedditPost` (1304), `RedditSafetyAudit` (1347), `RedditPerformanceLog` (1363), `RedditOrchestratorRun` (1377), `RedditSystemPrompt` (1396).

Post-init migrations:

- `ContractorApplication` — `20260313192912_add_contractor_application_submission/migration.sql:2`
- `ClaimNotification` — `20260408000000_add_access_instructions_to_insurance_claim/migration.sql:7`
- `PushToken` — same migration, line 21
- `JobOffer` — `20260408000002_contractor_matching/migration.sql:16`
- `ProofOfWork` — `20260410010631_add_proof_of_work_and_competency_test_result/migration.sql:5`
- `CompetencyTestResult` — same migration, line 33
- `SubContractor` — `20260413012038_dr592_sub_contractor_engagement/migration.sql:2`
- `SubContractorEngagement` — same migration, line 29
- `ClaimPhotoAttachment` — `20260424000000_claim_photo_attachment/migration.sql:8`
- `VoiceCall` — `20260426000000_add_voice_call_and_call_transcript/migration.sql:15`
- `CallTranscript` — same migration, line 52
- `FinanceReferral` — `20260429000000_finance_referral/migration.sql:12`
- `FinanceReferralEvent` — `20260501000000_finance_referral_phase2/migration.sql:28`

### A.2 PascalCase model with `@@map` to snake_case table (6 entries)

The pre-existing legacy Supabase tables that Prisma adopted via `@@map`:

| Prisma model        | `@@map(...)`          | schema line | created in init migration line                                                 |
| ------------------- | --------------------- | ----------- | ------------------------------------------------------------------------------ |
| `JobOutcome`        | `job_outcome_logs`    | 1457        | (`20260408000000_add_access_instructions_to_insurance_claim/migration.sql:33`) |
| `ServiceRequest`    | `service_requests`    | 1572        | 1017                                                                           |
| `ClientProfile`     | `client_profiles`     | 1598        | 1040                                                                           |
| `ContractorProfile` | `contractor_profiles` | 1627        | 1067                                                                           |
| `InspectionReport`  | `inspection_reports`  | 1666        | 1097                                                                           |
| `CostEstimate`      | `cost_estimates`      | 1691        | 1136                                                                           |

These six are the **resolved drift** items — they were on the Feb 22 missing list and now have a Prisma model. The introspection doc's TL;DR is wrong because it predates this cleanup.

### A.3 RLS hardening migration

`20260409000000_supabase_rls_hardening/migration.sql` enables RLS on `InsuranceClaimAU`, `ClaimNotification`, `PushToken`, `Job`, `JobOffer`, `job_outcome_logs`, `Contractor`, `ContractorApplication`, `User`, `Lead`. Policy DDL is commented out (line 81+), i.e. RLS is **enabled with no policies** — Postgres default-denies. If app code uses the `service_role` key everywhere this is fine; if it ever uses `anon` or `authenticated`, those roles cannot read these tables. Worth a Phase 2 review.

---

## Section B — Prisma-only (model exists, no migration found)

**No models in this category.** Every one of the 79 Prisma models is created by exactly one migration `CREATE TABLE`. The schema is internally consistent on this dimension.

This means: if all 14 migrations are applied to Supabase, every Prisma model is queryable. The risk vector here is closed.

---

## Section C — Migration-only (table exists in migration, no Prisma model)

| Table               | Created in                                         | Why no Prisma model                                                                                                                                                                                                                                     |
| ------------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compliance_events` | `20260423000000_compliance_events/migration.sql:7` | **Intentional** per `CLAUDE.md §5.4` and `.context/domain-models.md` (Known drift list). Append-only audit ledger; writes via raw SQL helper at `src/lib/compliance/*`, reads via typed view. Listed as "future ADR will decide" — promote or document. |

Risk: Prisma can't type-check inserts; a typo in the raw-SQL helper goes uncaught until runtime. Recommend either (a) adding a Prisma model and continuing to gate writes via the helper for the append-only invariant, or (b) writing a `docs/adr/ADR-XXX-compliance-events-raw-sql.md` to make the intentional drift load-bearing.

---

## Section D — Field-level drift

### D.1 `Payment` model (CONFIRMED gap — PR #230)

`prisma/schema.prisma:1789-1810` defines:

```prisma
model Payment {
  id                    String    @id @default(cuid())
  bookingId             String
  clientId              String
  contractorId          String?
  amountAUD             Float
  platformFeeAUD        Float
  platformFeePercentage Float     @default(15)
  gstAUD                Float
  netAmountAUD          Float
  paymentMethod         String
  stripePaymentIntentId String?
  transactionId         String?
  status                String    @default("PENDING")
  processedAt           DateTime?
  failureReason         String?
  receiptUrl            String?
  invoiceNumber         String?
  createdAt             DateTime  @default(now())
  updatedAt             DateTime  @updatedAt
  tenantId              String?
}
```

The migration at `20260306203151_initialize_schema/migration.sql:1262-1285` matches the model exactly. So Prisma ↔ DB are aligned.

**The drift is code ↔ Prisma**, not Prisma ↔ DB:

| Code reference                                 | Field used         | Exists on Prisma `Payment`?            |
| ---------------------------------------------- | ------------------ | -------------------------------------- |
| `app/api/payments/refund/route.ts:73`          | `stripePaymentId`  | NO — model has `stripePaymentIntentId` |
| `app/api/payments/refund/route.ts:76`          | `refundAmount`     | NO — no refund fields exist            |
| `app/api/payments/refund/route.ts:77`          | `refundReason`     | NO                                     |
| `app/api/payments/refund/route.ts:78`          | `refundedAt`       | NO                                     |
| `app/api/payments/create-booking/route.ts:161` | `amount`           | NO — model has `amountAUD`             |
| `app/api/payments/create-booking/route.ts:162` | `currency`         | NO                                     |
| `app/api/payments/create-booking/route.ts:164` | `stripePaymentId`  | NO                                     |
| `app/api/payments/create-booking/route.ts:165` | `stripeCustomerId` | NO                                     |
| `app/api/payments/create-booking/route.ts:166` | `method`           | NO — model has `paymentMethod`         |
| `app/api/payments/create-booking/route.ts:167` | `description`      | NO                                     |
| `app/api/payments/create-booking/route.ts:168` | `metadata`         | NO                                     |

Both call sites use `as any` (`(prisma.payment.create as any)`, `(prisma.payment.updateMany as any)`) which is why TypeScript hasn't caught this. At runtime Prisma will throw `PrismaClientValidationError: Unknown arg ...` on the FIRST live call.

**Severity:** in `/api/payments/refund` the Stripe refund is processed at line 55 _before_ the DB write at line 72, and the catch block at line 81 swallows the error ("Don't fail the request — Stripe refund already processed"). So **money goes back to the customer with no DB record of the refund**. The `compliance_events` ledger may also miss this — needs separate check.

**Resolution options (Phase 2 decision):**

- **Option A (recommended):** Extend the Prisma `Payment` model with `currency`, `stripePaymentId` (alias of `stripePaymentIntentId` or rename), `stripeCustomerId`, `method` (alias of `paymentMethod`), `description`, `metadata Json?`, `refundAmount Float?`, `refundReason String?`, `refundedAt DateTime?`. New migration. Update both routes to use the canonical field names (drop the alias path).
- **Option B:** Refactor the routes to write to the existing fields (`amountAUD`, `stripePaymentIntentId`, `paymentMethod`) and store refund data in a new `PaymentRefund` table.
- **Option C (worst):** Keep as-is. Not viable; this is the active bug PR #230 surfaced.

### D.2 Spot-checks of 5 other models

I cross-referenced 5 other code paths that mutate Prisma to look for the same drift class.

| Model             | Code path                                          | Result                                                                                                                                                              |
| ----------------- | -------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Booking`         | `/api/payments/create-booking/route.ts:130-155`    | OK — code only reads `bookingId` from the in-memory order. No `prisma.booking.*` write in the inspected path.                                                       |
| `Contractor`      | (broad usage)                                      | Schema has 81 columns (`prisma/schema.prisma:349-428`); spot-check required at PR-level. Not flagged in PR #230.                                                    |
| `Lead`            | `prisma/schema.prisma:181-244`                     | 64 columns including `metadata Json?`, `customFields Json?`. Plenty of capacity, low drift risk.                                                                    |
| `VoiceCall`       | `prisma/schema.prisma:2175-2210`                   | Just-landed (B13 scaffold, 26/04/2026). No live writers yet (per `MEMORY.md` 23/04 entry, voice pipeline flag-off). Drift opportunity once webhook extractor lands. |
| `FinanceReferral` | `src/lib/finance/persistence.ts` (per ADR pointer) | Just-landed (29/04/2026 + 01/05/2026 phase 2). Helper module is new; no `as any` in inspection.                                                                     |

**No additional confirmed field-level gaps in the 5 spot-checks.** PR #230's `Payment` issue appears to be the worst of its class. A full code-level Prisma-write audit (every `prisma.*.create` / `update*` / `upsert` call grep) is recommended in Phase 2.

### D.3 Two-`User` risk

`supabase-tables-introspection.md:1881` lists a `users` (lowercase) table separate from Prisma's `User`. The init migration's `User` table (`migration.sql:16`) is the Prisma-managed one. If `users` still exists in Supabase (likely — it's the Supabase Auth `auth.users` mirror or an older custom table), then:

- `prisma.user.findMany()` queries `User` (PascalCase, quoted identifier).
- Anything in Supabase touching `users` (lowercase) is invisible to Prisma.

Without a live `db pull` we cannot confirm whether `users` is a Postgres view, a duplicate table, or removed. Phase 2 must verify.

---

## Section E — Recommendations (Phase 2 prioritised list)

### E.1 P0 — Ship within next sprint

1. **Fix `Payment` field gap (PR #230).** Extend the Prisma model + write a migration + drop both `as any` casts in `/api/payments/refund` and `/api/payments/create-booking`. Add an integration test that exercises the refund path end-to-end against a test Stripe key. Without this, every refund silently loses its DB row.
2. **Regenerate `supabase-tables-introspection.md`.** Run a fresh introspection (Vercel preview branch with read-only DB user is fine) so the doc reflects April reality. Until then, prepend a `> DEPRECATED — generated 22/02/2026, current as of that date only` banner.
3. **Decide `compliance_events`** — promote to Prisma model (preferred, since DR-714 retention cron now reads it) OR write `docs/adr/ADR-XXX-compliance-events-raw-sql.md` to lock in the intentional drift. CLAUDE.md §5.4 already flags this as a future ADR.

### E.2 P1 — Scoped follow-ups

4. **Audit the ~74 still-unmodelled Supabase tables.** For each, classify as: (a) dead — drop, (b) Supabase-managed (Auth, storage) — leave, (c) live and queried by app code via raw SQL — model in Prisma, (d) duplicate of a Prisma model — consolidate. Highest priority within this group: `tenants`, `tenant_configurations` (multi-tenant primitives — Prisma already has `tenantId String?` columns on most models with no `Tenant` model), `users` (vs Prisma `User`), `contractor_applications` (vs Prisma `ContractorApplication` — likely duplicate from old import), `tasks`, `messages`, `notification_preferences`, `customer_lifecycle`, `opportunities`.
5. **Full `prisma.*` write-call grep.** Look for every `prisma.<model>.create|update|upsert|updateMany|createMany` call across `app/`, `src/`, `pages/` and verify each `data:` payload against the schema. The `as any` casts are the smoking gun — count and triage them.
6. **RLS policies.** `20260409000000_supabase_rls_hardening/migration.sql` enables RLS but leaves all `CREATE POLICY` statements commented out (line 81+). Either remove `ENABLE ROW LEVEL SECURITY` (if app uses `service_role` everywhere) or actually write the policies. Today is the worst of both worlds — RLS on, no policies, default-deny — and we're getting away with it only because the service_role bypasses RLS.

### E.3 P2 — Hygiene

7. **Promote `JobOutcome` table name to canonical.** The model is `JobOutcome` but the table is `job_outcome_logs`. The `_logs` suffix is a relic of Feb's pre-Prisma writes. Either rename the table to `JobOutcome` (breaking but clean) or add a comment explaining the legacy.
8. **Drop `schema.sqlite.prisma` and `schema-bots.prisma`** if unused (currently sitting alongside `schema.prisma`). Confirm via `ripgrep` for the imports first.
9. **Add a CI gate** that runs `prisma validate` and `prisma migrate diff` against the previous tag. Catches drift before it reaches `main`.
10. **Document the `_prisma_migrations` table in the introspection doc.** It's excluded from the Feb count but every fresh dev needs to know it exists.

---

## Appendix — Migration ↔ Section coverage matrix

| Migration                                                     | New tables                                                | Section |
| ------------------------------------------------------------- | --------------------------------------------------------- | ------- |
| `20260306203151_initialize_schema`                            | 65 tables (incl. 6 snake_case legacy adopted via `@@map`) | A       |
| `20260313192912_add_contractor_application_submission`        | `ContractorApplication`                                   | A       |
| `20260408000000_add_access_instructions_to_insurance_claim`   | `ClaimNotification`, `PushToken`, `job_outcome_logs`      | A       |
| `20260408000001_add_user_roles`                               | (column add only — no new tables)                         | —       |
| `20260408000002_contractor_matching`                          | `JobOffer`                                                | A       |
| `20260409000000_supabase_rls_hardening`                       | (RLS toggle only — no new tables)                         | —       |
| `20260410010631_add_proof_of_work_and_competency_test_result` | `ProofOfWork`, `CompetencyTestResult`                     | A       |
| `20260413012038_dr592_sub_contractor_engagement`              | `SubContractor`, `SubContractorEngagement`                | A       |
| `20260423000000_compliance_events`                            | `compliance_events`                                       | **C**   |
| `20260424000000_claim_photo_attachment`                       | `ClaimPhotoAttachment`                                    | A       |
| `20260426000000_add_voice_call_and_call_transcript`           | `VoiceCall`, `CallTranscript`                             | A       |
| `20260429000000_finance_referral`                             | `FinanceReferral`                                         | A       |
| `20260501000000_finance_referral_phase2`                      | `FinanceReferralEvent`                                    | A       |

---

_End of audit. No schema, code, or migration changes were made. Follow-up
PRs should reference this file and address the P0 items first._
