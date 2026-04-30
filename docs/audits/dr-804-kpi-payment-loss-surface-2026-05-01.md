# DR-804 Step 6 — KPI + Payment-Loss Surface Audit

_2026-05-01. Phill flagged on the DR-804 P0-cluster authorisation that
the missed-KPI → payment-loss flow must stay intact through any
phantom-Prisma-model migrations. This doc captures what's actually
in place, what's wired up, and what's still owed._

## TL;DR

- **KPI ledger:** `JobOutcome` (Prisma) → `job_outcome_logs` (live,
  via `@@map`). 3 write sites (job-completion + decline + cancel),
  6 read sites at `/api/kpi/job-outcomes`. **Already live in prod.**
- **KPI aggregates:** `ContractorKPI` (Prisma model exists). 2 read
  sites (analytics + dashboard). **0 write sites.** The
  periodic-aggregation cron that turns `JobOutcome` rows into
  `ContractorKPI` records is **not yet built**.
- **Payment-loss surface:** Bond fields on `ContractorSubscription`
  (`bondAmount`, `bondStatus`, `bondSecuredDate`) + `ContractorPayment`
  rows (`type: BOND`). **Schema-level surface intact.** The
  KPI-breach → bond-forfeiture orchestration layer is **not yet
  built**.

The DR-804 phantom-model migrations (Steps 2–5) do NOT touch any of
this surface. They restore the underlying tables that the KPI
write/read paths land in. Migrations are additive and zero-risk to
the KPI/payment-loss flow.

## 1. KPI ledger — `JobOutcome` (live)

### Prisma model

`prisma/schema.prisma`:

```prisma
model JobOutcome {
  id, jobId @unique, outcome, jobType, contractorId, ...
  // KPI columns — added via DR-322 Path B migration
  state, suburb, postcode, urgency, insuranceClaim, insurerName,
  responseMinutes,    // assignedAt → acceptedAt
  durationMinutes,    // acceptedAt → completedAt
  totalMinutes,       // createdAt → completedAt (end-to-end)
  @@map("job_outcome_logs")
}
```

### Live table

`job_outcome_logs` was created by:

- `prisma/migrations/20260408000000_add_access_instructions_to_insurance_claim/migration.sql`
  (lines 32–60) — base table + indexes.
- `prisma/migrations/20260428004000_add_kpi_columns_to_job_outcome_logs/migration.sql`
  — KPI columns (`state`, `responseMinutes`, etc.).
- `prisma/migrations/20260409000000_supabase_rls_hardening/migration.sql`
  — RLS hardening (FORCE ROW LEVEL SECURITY).

### Write sites (3)

| Route                                       | Surface                       |
| ------------------------------------------- | ----------------------------- |
| `app/api/contractor/jobs/route.ts:258`      | Bulk job-completion logger    |
| `app/api/contractor/jobs/[id]/route.ts:124` | Per-job COMPLETED / CANCELLED |
| `app/api/contractor/jobs/[id]/route.ts:227` | Per-job DECLINED              |

### Read sites (6)

All six read sites are aggregations at `app/api/kpi/job-outcomes/route.ts`:

```
.groupBy({ outcome })             → outcome-counts dashboard
.aggregate({ responseMinutes })   → average response time
.groupBy({ state })               → per-state breakdown
.groupBy({ jobType })             → per-service-type breakdown
.groupBy({ urgency })             → per-urgency breakdown
.groupBy({ insuranceClaim })      → insurance-vs-non-insurance split
.findMany({ ... orderBy loggedAt }) → recent-outcomes timeline
```

### Conclusion

The `JobOutcome` ledger is the **canonical KPI source-of-truth**.
Every job that completes, cancels, or declines writes here. KPIs are
derived from these aggregations on demand. No DR-804 migration
touches this surface.

## 2. KPI aggregates — `ContractorKPI` (Prisma-only, no cron)

### Prisma model

```prisma
model ContractorKPI {
  contractorId, periodType, periodStart, periodEnd,
  totalJobs, completedJobs, averageResponseTime, averageCompletionTime,
  customerSatisfaction, qualityScore, complianceScore,
  cleanClaimsScore, carsiCompliance,
  totalRevenue, averageJobValue,
  complaints, violations,
  @@unique([contractorId, periodType, periodStart])
}
```

### Read sites (2)

- `app/api/contractor/analytics/route.ts:143` — `findFirst` (latest period)
- `app/api/contractor/dashboard/route.ts:241` — `findFirst` (latest period)

### Write sites (0)

`grep -r "prisma.contractorKPI.create\|.upsert" app/ src/` returns
**zero matches**. The aggregator that should periodically read
`JobOutcome` rows and produce `ContractorKPI` records does not exist
in the repo today.

### Implication

- Today: dashboards return `null` from `findFirst` → UI falls back to
  "no KPI data yet" placeholders.
- Owed (separate from DR-804): a cron job (daily or monthly) that
  computes `ContractorKPI` from `JobOutcome` aggregations.

The DR-804 phantom-model work has no effect on this gap; it's a
forward-looking feature, not a regression.

## 3. Payment-loss surface — bond on `ContractorSubscription`

### Schema fields (live, in `ContractorSubscription` table)

```prisma
model ContractorSubscription {
  ...
  bondAmount      Float     @default(5000)
  bondStatus      String    @default("PENDING") // PENDING, SECURED, RELEASED
  bondSecuredDate DateTime?
  ...
  payments ContractorPayment[]
}
```

The `ContractorSubscription` table exists in production (created by
`20260428000005_create_contractor_subscription_table`). The bond
columns are part of that table from day one — schema is intact.

### `ContractorPayment` (closing in this PR)

The paired payment-row table was missed in the 2026-04-28 backfill.
This PR (DR-804 Step 5) creates it:

```prisma
model ContractorPayment {
  subscriptionId String
  subscription   ContractorSubscription @relation(fields: [subscriptionId])
  amount         Float
  type           String  // SUBSCRIPTION, BOND, BACKGROUND_CHECK, OTHER
  status         String  // PENDING, PROCESSING, COMPLETED, FAILED, REFUNDED
  ...
}
```

`type` enum specifically includes `BOND` — bond payment events land
here as their own rows, distinct from subscription dues.

### Bond-forfeiture flow (NOT yet wired)

The KPI-breach → bond-forfeit orchestration (the actual "missed-KPI
costs the contractor money" logic) is owed:

1. KPI cron computes period KPIs (see §2 — also owed).
2. If `complianceScore < threshold` OR `complaints > N`, mark
   `ContractorSubscription.bondStatus = 'FORFEIT_PENDING'` and write
   a `ContractorPayment` row of `type: BOND`, `status: FAILED` (or
   similar — naming TBD).
3. Notify contractor via `ContractorNotification`
   (type: `PAYMENT`/`COMPLIANCE`, priority: `URGENT`).
4. Stripe-side bond capture is part of that flow — not the schema's
   responsibility.

None of this exists today. None of it is regressed by DR-804.

## 4. Why DR-804 migrations are safe for this surface

Every DR-804 migration this week is **additive and idempotent**:

| Migration   | What it does                                    | KPI/bond surface impact                                                             |
| ----------- | ----------------------------------------------- | ----------------------------------------------------------------------------------- |
| #332        | Create ErrorLog + ContractorNotification        | None (different domains)                                                            |
| #334        | Create ContractorTerritory + ContractorAuditLog | None (different domains)                                                            |
| #335        | Create 6 Reddit orchestrator tables             | None (different domain)                                                             |
| **This PR** | Create ContractorPayment                        | **Restores write path for `BOND`-type rows.** No data loss; new table starts empty. |

`CREATE TABLE IF NOT EXISTS` ensures the migration is a no-op if the
table somehow already exists. FK constraints are added in guarded
`DO $$ BEGIN IF NOT EXISTS ... END $$` blocks, so re-running the
migration on a fresh schema is also safe.

## 5. Verification checklist (Phill, post-deploy)

When this PR (#336 or whichever) deploys, confirm in Supabase SQL Editor:

```sql
-- 1. ContractorPayment table exists with correct shape
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'ContractorPayment'
ORDER BY ordinal_position;

-- 2. FK to ContractorSubscription exists
SELECT conname, pg_get_constraintdef(oid)
FROM pg_constraint
WHERE conname = 'ContractorPayment_subscriptionId_fkey';

-- 3. The bond-related columns on ContractorSubscription are intact
SELECT column_name, column_default
FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'ContractorSubscription'
  AND column_name LIKE 'bond%';

-- 4. job_outcome_logs (the KPI ledger) is alive and has KPI columns
SELECT column_name FROM information_schema.columns
WHERE table_schema = 'public' AND table_name = 'job_outcome_logs'
  AND column_name IN ('responseMinutes', 'durationMinutes', 'totalMinutes', 'state', 'urgency');
```

## 6. Findings worth surfacing separately

- **DR-804 audit was based on stale introspection.** The 2026-04-30
  audit doc lists 53 phantom models, but a 2026-04-28 backfill batch
  (12 migrations) had already restored most of the Bucket-1 tables —
  `ProofOfWork`, `OnboardingPayment`, `Enquiry`, `Partner`,
  `ContractorSubscription`, `JobOffer`, `ClaimNotification`,
  `PartnerBilling`, `field_service_jobs`, `leads`, `error_log`,
  `contractor_notifications`, etc. Those are all live now. The
  current real phantom count is much closer to 5–10.
- **Reconciliation pass owed:** run `prisma db pull` once Supabase
  read perms are granted, regenerate the audit doc, and update the
  remediation plan accordingly. The remaining work is much smaller
  than the audit suggests.
- **The two NOT-yet-wired flows (KPI cron + bond-forfeit
  orchestration) are independent of DR-804.** They're feature work,
  not phantom-model debt. Track separately.

## 7. References

- `docs/audits/dr-804-phantom-prisma-models-2026-04-30.md` — original
  audit (now known to be partially stale)
- `prisma/migrations/20260408000000_add_access_instructions_to_insurance_claim/`
  — origin of `job_outcome_logs`
- `prisma/migrations/20260428000005_create_contractor_subscription_table/`
  — origin of `ContractorSubscription`
- `prisma/migrations/20260428004000_add_kpi_columns_to_job_outcome_logs/`
  — KPI columns added to the ledger
- `app/api/kpi/job-outcomes/route.ts` — KPI aggregator endpoint
- `app/api/contractor/jobs/route.ts`, `.../[id]/route.ts` —
  JobOutcome write sites
