# DR-804 — Phantom Prisma Models 3-Bucket Audit

> Generated: 2026-04-30. Auditor: senior Prisma + multi-tenant SaaS reviewer.
> Status: AUDIT ONLY — no schema modifications. Each bucket has its own
> remediation PR sequence.
>
> Branch: `chore/dr-804-phantom-prisma`. Worktree-scoped, no DB access.
>
> **This document consolidates and supersedes** the partial audits at
> `docs/audits/phantom-prisma-models-2026-04-27.md`,
> `docs/audits/dead-prisma-models-2026-04-27.md`, and
> `docs/audits/bucket-2-column-diff-2026-04-27.md` for the purposes of
> closing DR-804. Those documents remain on disk as a paper trail of
> the iterative classification.

---

## TL;DR

- **66 Prisma models in `schema.prisma`** today (was 79 on 2026-04-27;
  PR #246 dropped 13 zero-reference models from the original
  `dead-prisma-models-2026-04-27.md` Section C list).
- **109 live tables** in production Supabase (per the 2026-04-27 live
  introspection diff in `bucket-2-column-diff-2026-04-27.md`).
- **53 phantom Prisma models** (per MEMORY.md 2026-04-27) — bucketed
  below.

| Bucket                                                    |  Count | Action                                                   |
| --------------------------------------------------------- | -----: | -------------------------------------------------------- |
| **Bucket 1** — CRITICAL: active route, no backing table   | **18** | P0/P1: `CREATE TABLE` migration or rewrite onto an alias |
| **Bucket 2** — `@@map` candidate: live co-tenant exists   | **17** | P1: `@@map(...)` + column-level reconciliation           |
| **Bucket 3** — Dead in code: zero references in prod path | **18** | P3: drop from `schema.prisma` in one PR                  |
|                                                           | **53** |                                                          |

**Highest-priority finding:** the `Lead` / `Job` / `JobOffer` cluster
and the `User` / `ContractorApplication` rewrite (Bucket 2 column
mismatch). Post the PR-#306 Prisma binary-target fix on 2026-04-29,
every `prisma.<phantomModel>.*` call is now actively throwing
`P2021 (table does not exist)` or `P2022 (column does not exist)`
in production rather than silently failing. **Silent failure → loud
failure.** The longer this audit's findings sit unfixed, the more
500s prod accumulates.

---

## 1. Methodology

### 1.1 Inputs

- `prisma/schema.prisma` at HEAD of `chore/dr-804-phantom-prisma`
  (branched from `origin/main`, 66 models, 14 `@@map` directives).
- `prisma/supabase-tables-introspection.md` (109-table snapshot,
  refreshed 2026-04-27 per MEMORY.md).
- The 2026-04-27 audit triplet (`phantom-prisma-models`,
  `dead-prisma-models`, `bucket-2-column-diff`) — re-bucketed against
  the post-PR-#246 schema.

### 1.2 Phantom test

A Prisma model `M` is **phantom** if neither (a) the model name nor
(b) its `@@map` target appears in the live 109-table set. Of the 66
models in the post-#246 schema, 53 fail this test. The remaining 13
models (`AuditLog`, `Booking`, `Contractor`, `ContractorDocument`,
`ContractorProfile`, `InsuranceClaimAU`, `Payment`, `Rating`,
`ServiceRequest`, `Tenant`, `WebhookDelivery`, plus 2 explicit
`@@map` matches) are confirmed-backed and excluded.

### 1.3 Bucket test (per phantom model)

For each phantom model `M` with camelCase Prisma client form `m`:

```bash
grep -rEn "prisma\.${m}\." \
  src/ app/ scripts/ lib/ \
  --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx" \
  | grep -v __tests__/ | grep -v .next/
```

- **Bucket 1** if hits ≥ 1 AND first call site is in
  `app/api/**/route.ts`, `app/admin/**`, or `src/lib/**` reachable
  from a route, AND no plausible lowercase co-tenant table exists.
- **Bucket 2** if a lowercase co-tenant table exists in the live
  introspection (e.g. Prisma `User` ↔ live `users`).
- **Bucket 3** if hits = 0, OR hits only in `scripts/`, `src/bots/`,
  `prisma/seed*.ts`, or files known dead (Reddit orchestrator gated
  off, R6 demo tree).

### 1.4 Caveats

- Three `@@map`-target hits in the schema themselves point at
  non-existent tables (most notably the original `JobOutcome →
  job_outcome_logs` map verified in §5 of the 2026-04-27 audit
  — `job_outcome_logs` actually exists, so `JobOutcome` is not in
  this audit).
- Hit counts in compiled output, `.next/`, and tests excluded — only
  source files in `src/`, `app/`, `scripts/`, `lib/`.
- Column-level diffs for the Bucket 2 HIGH-confidence candidates
  (`User`, `ContractorApplication`) are in
  `bucket-2-column-diff-2026-04-27.md` §1–§2; remediation is **not**
  a one-line `@@map` for those two — see §3 below.

---

## 2. Bucket 1 — CRITICAL: active route, no backing table (18)

These models are referenced from live route handlers, lib code that
runs in route context, or cron jobs. There is no backing live table
and no plausible lowercase co-tenant match. **Every call site listed
below is broken at runtime under any non-trivial use** — Prisma
throws `P2021 (table does not exist)`. Post-PR-#306 (2026-04-29)
binary-target fix, these errors now surface in production logs
instead of being silently masked by the rhel-openssl Lambda crash.

| Model                    | Priority | First call site                                      | Hits | Remediation                                                                                                                                                                     |
| ------------------------ | -------: | ---------------------------------------------------- | ---: | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Lead`                   |   **P0** | `src/lib/lead-assignment.ts:48`                      |   35 | Either `CREATE TABLE leads` migration restoring the model, OR adopt the live `lead_captures` (28 cols) and add `@@map("lead_captures")` after column diff. Recommend the latter. |
| `Job`                    |   **P0** | `app/api/contractor/analytics/route.ts:93`           |   27 | Live `jobs` exists but is a different domain (property-based, not field-service). Path Y: `CREATE TABLE field_service_jobs` + `@@map`. See `bucket-2-column-diff` §3.            |
| `JobOffer`               |   **P0** | `src/lib/contractor-matching.ts:308`                 |   14 | Contractor matching pipeline. No backing table. `CREATE TABLE job_offers` migration.                                                                                            |
| `ProofOfWork`            |   **P0** | `app/api/proof-of-work/submit/route.ts:74`           |   12 | No live table. `CREATE TABLE proof_of_work` migration.                                                                                                                          |
| `OnboardingPayment`      |   **P0** | `app/api/stripe/create-payment/route.ts:75`          |    9 | Stripe onboarding payment flow. No backing table — this is contractor-side billing (in scope of ADR-014 Path A). `CREATE TABLE onboarding_payments` migration.                  |
| `Enquiry`                |   **P1** | `app/api/contact/submit/route.ts:57`                 |    8 | No backing table; `waitlist_submissions` and `opportunities` are different concepts. `CREATE TABLE enquiries` migration. Aligns with @UBIQUITOUS_LANGUAGE.md.                    |
| `Partner`                |   **P1** | `src/lib/lead-assignment.ts:57`                      |    8 | No `partners` table. `CREATE TABLE partners` (capital-P brands per @.claude/rules/business-rules.md §2).                                                                         |
| `LeadTracking`           |   **P1** | `src/lib/lead-assignment.ts:138`                     |    4 | Paired with `Lead`. Migrate alongside the `Lead` decision (Bucket 2 alias OR new table).                                                                                         |
| `ClaimNotification`      |   **P1** | `src/lib/notifications.ts:97`                        |    4 | Notifications lib called from claim routes. `CREATE TABLE claim_notifications` migration.                                                                                       |
| `ContractorSubscription` |   **P1** | `app/api/contractor/subscription/cancel/route.ts:82` |    4 | Stripe subscription cancel — contractor-side billing surface. `CREATE TABLE contractor_subscriptions`.                                                                          |
| `ModuleProgress`         |   **P1** | `app/api/contractor/onboarding/progress/route.ts:25` |    4 | Live `contractor_module_progress` exists — promote to Bucket 2 (`@@map("contractor_module_progress")`) after column diff. Listed P1 here pending verification.                   |
| `OnboardingProgress`     |   **P1** | `app/api/contractor/onboarding/progress/route.ts:24` |    3 | Paired with `ModuleProgress`. Live `contractor_onboarding` exists — promote to Bucket 2 after column diff.                                                                       |
| `PartnerBilling`         |   **P2** | `src/lib/lead-assignment.ts:119`                     |    3 | Partner billing log. Migrate alongside `Partner`.                                                                                                                               |
| `ContractorNotification` |   **P2** | `app/api/contractor/dashboard/route.ts:234`          |    3 | Dashboard notifications. `CREATE TABLE contractor_notifications`.                                                                                                               |
| `ErrorLog`               |   **P2** | `app/api/log-error/route.ts:53`                      |    3 | The MEMORY-noted `/log-error` smoke failure is this. Trivial `CREATE TABLE error_logs` migration; tiny blast radius.                                                            |
| `RedditPost`             |   **P3** | `src/lib/reddit/orchestrator/orchestrator.ts:71`     |   10 | Flag-gated; `/api/reddit/migrate` was deleted in PR #233. Verify orchestrator dead, then drop (move to Bucket 3) — otherwise `CREATE TABLE`.                                    |
| `FinanceReferral`        |   **P3** | `src/lib/finance/persistence.ts:45`                  |    6 | `FINANCE_REFERRAL_WRITER_ENABLED=false`. Failure surface limited until flag flips. Per `.context/domain-models.md`, the persistence helper is the documented landing point.     |
| `FinanceReferralEvent`   |   **P3** | `src/lib/finance/persistence.ts:61`                  |    4 | Same flag as above.                                                                                                                                                             |

### Notes on Bucket 1

- The `Lead`/`Job`/`JobOffer` cluster is the worst exposure: lead
  assignment, contractor matching, and contractor analytics all
  depend on these. If any of these endpoints are hit in production
  today they will 500 (loudly, post-#306).
- `ModuleProgress` and `OnboardingProgress` plausibly belong in
  Bucket 2; placement here is conservative pending column-level
  reconciliation against `contractor_module_progress` and
  `contractor_onboarding`.
- The smoke-test failures on `/admin` and `/log-error` flagged in
  MEMORY 2026-04-27 are downstream of `User`,
  `ContractorApplication`, and `ErrorLog` phantom calls. The
  `/log-error` fix is the cheapest win in this bucket.

---

## 3. Bucket 2 — `@@map` candidates (17)

These models have a lowercase co-tenant in the live introspection.
**WARNING — column shape mismatches.** The 2026-04-27 column-level
diff (`bucket-2-column-diff-2026-04-27.md` §1–§2) verified that the
"obvious one-line `@@map` quick wins" are NOT safe as one-liners for
the two highest-traffic models. `User` and `ContractorApplication`
need full Prisma model rewrites + call-site sweeps before the map
can ship.

| Model                                                                                                | Live table                          | Confidence | Hits | Action required                                                                                                                                                                                                              |
| ---------------------------------------------------------------------------------------------------- | ----------------------------------- | :--------: | ---: | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `User`                                                                                               | `users`                             |  **HIGH**  |   12 | **P0** — column mismatch. Rewrite Prisma model: drop `role`/`emailVerified`/`image`/`agencyId`; add `userType` (enum), `isEmailVerified`, `avatar`, AU address fields, `tenantId`. ~30 call-site sweep. See column-diff §1.   |
| `ContractorApplication`                                                                              | `contractor_applications`           |  **HIGH**  |   12 | **P0** — column mismatch. Drop `data: Json`; add `abn`, `certifications[]`, `serviceAreas[]`, full UTM block, `emailSent`, `contacted`, `convertedContractor`, etc. Re-route ApplyClient writes onto fields. See column-diff §2. |
| `ContractorCertification`                                                                            | `contractor_certifications`         |  **HIGH**  |    0 | Add `@@map("contractor_certifications")`. Free safety even though zero hits — also a candidate for Bucket 3 drop.                                                                                                            |
| `Lead`                                                                                               | `lead_captures`                     |  MEDIUM    |   35 | Bucket 2 candidate per column-diff §5. Column shape unverified. See Bucket 1 — listed there pending diff.                                                                                                                    |
| `OnboardingProgress`                                                                                 | `contractor_onboarding`             |  MEDIUM    |    3 | Direct semantic match. Column diff needed before `@@map`.                                                                                                                                                                   |
| `ModuleProgress`                                                                                     | `contractor_module_progress`        |  MEDIUM    |    4 | Direct semantic match. Verify whether Prisma model is contractor- or client-scoped (live `client_module_progress` also exists).                                                                                              |
| `Client`                                                                                             | `client_profiles`                   |  MEDIUM    |    — | `Client` Prisma is contact + auth; `client_profiles` is profile data. Schemas may diverge — column-level review essential before `@@map`.                                                                                    |
| `ClaimPhotoAttachment`                                                                               | `inspection_photos`                 |  MEDIUM    |    — | Domain overlap (claim photos = inspection photos in current intake flow). Column reconciliation needed.                                                                                                                      |
| `BackgroundCheck`                                                                                    | (no obvious lowercase match)        |    LOW     |    0 | No live table. Closer to drop. See Bucket 3 reclassification note in `dead-prisma-models-2026-04-27.md` §A.                                                                                                                   |
| `ContractorPayment`                                                                                  | `client_payments`                   |    LOW     |    — | Schema mismatch — DR contractors PAY DR (subscription/platform fee per ADR-014); `client_payments` is for client→contractor flow. Probably NOT a valid map.                                                                  |
| `ContractorTerritory`                                                                                | `contractor_location_history`       |    LOW     |    — | Both relate to geography but semantics differ (territory = current service area; location_history = audit trail).                                                                                                            |
| `ContractorAuditLog`                                                                                 | `workspace_audit_logs`              |    LOW     |    — | Both are audit logs. Workspace prefix suggests multi-tenant scope — column compatibility unknown.                                                                                                                            |
| `Notification`                                                                                       | `notification_preferences`          |    LOW     |    — | Different concept (preferences ≠ a notification record). More likely Bucket 3.                                                                                                                                              |
| `ContractorAvailability`                                                                             | `contractor_preferences`            |    LOW     |    0 | Both contractor-side configuration tables; not the same thing. Zero hits → Bucket 3 candidate.                                                                                                                              |
| `EmergencyGuide` / `ServiceProcedure` / `StepByStepGuide` / `InsuranceProcess` / `VerifiedContent`   | `blog_posts` or `case_studies`      |    LOW     |    — | Knowledge-base-shaped models hitting compliance-bot lookups. Live blog tables exist; semantics overlap but column shape probably differs. Better to drop (Bucket 3) or build dedicated tables.                              |

### Decision rule for Bucket 2

Add `@@map("...")` only after a column-level diff between the Prisma
model and the live table. Where confidence is LOW, prefer Bucket 3
(drop) plus a fresh `CREATE TABLE` migration if the route should
keep working.

The HIGH-confidence cases (`User`, `ContractorApplication`) are
column-divergent — they require a coordinated schema rewrite + call-
site sweep, **not** a one-liner.

---

## 4. Bucket 3 — DEAD: safe to drop (18)

Zero `prisma.<m>.*` hits in `src/`, `app/`, `lib/`, OR hits only in
seed/admin utility scripts that don't run in production. Safe to
delete from `prisma/schema.prisma` in a single PR. Two-pass cleanup:

### 4a. Already dropped by PR #246 (13)

For audit completeness — these were Bucket 3 in the 2026-04-27 audit
and have already been removed from `schema.prisma`:

```
BotMetrics, ClientProfile, ContractorAgreement, ContractorDocument,
ContractorInvoice, ContractorProject, ContractorReference,
ContractorSupport, ContractorTraining, GuideStep, PartnerPayment,
SupportMessage, CostEstimate
```

### 4b. Hits only in `scripts/core/seed*.ts` or one-off admin (5)

```
Agency        (1 hit, seed.ts:10)
Audit         (2 hits, seed.ts:101 + seed-admin.ts)
Invoice       (1 hit, seed.ts:162)
Notification  (1 hit, seed.ts:202)
Proposal      (1 hit, seed.ts:138)
```

These exist solely to support a seed script that itself never runs
in production (the live DB is Supabase-managed). Drop the models,
drop the seed entries.

### 4c. Hits only in compliance/bot subsystems — flag-dead (6)

```
EmergencyGuide          (data-verification-layer.ts)
InsuranceProcess        (data-verification-layer.ts)
ServiceProcedure        (data-verification-layer.ts)
StepByStepGuide         (data-verification-layer.ts)
VerifiedContent         (data-verification-layer.ts)
ComplianceAudit         (elysia-engine/client-bot-handler.ts)
```

`src/bots/compliance/data-verification-layer.ts` and the Elysia
engine handler are the dead "knowledge-base lookup" path from an
earlier bot architecture. Verify the bot subsystem is truly not
loaded in any live route before dropping.

### 4d. Hits only in Reddit orchestrator (5)

```
RedditContentPillar
RedditPerformanceLog
RedditSafetyAudit
RedditSystemPrompt
RedditOrchestratorRun
```

The Reddit orchestrator (`src/lib/reddit/orchestrator/*`) is flag-
gated and not exercised by any deployed route. `/api/reddit/migrate`
was deleted in PR #233. Confirm the orchestrator is truly dead before
dropping — `RedditPost` (Bucket 1, P3) sits on its execution path so
its fate is bound up with the orchestrator decision.

### 4e. Zero hits anywhere (2)

```
ContractorAvailability   (Bucket 2 LOW; safer to drop than map)
SubscriptionPricing      (pricing constants live in src/lib/constants.ts + Stripe)
```

---

## 5. Risk Assessment — Bucket 1 priority breakdown

### P0 — silent prod data loss equivalent to the binary-target bug

These have the same shape as the PR-#306 finding: a route claims
success while writes go nowhere. Every claim/lead funnel surface
sits here:

- **`Lead`** — 35 hits, top of the funnel.
- **`Job`** — 27 hits, contractor dispatch + analytics.
- **`JobOffer`** — 14 hits, contractor matching pipeline.
- **`ProofOfWork`** — 12 hits, contractor verification.
- **`OnboardingPayment`** — 9 hits, Stripe contractor onboarding.
- **`User` (Bucket 2 column drift)** — auth + admin column rewrite.
- **`ContractorApplication` (Bucket 2 column drift)** — 7-step
  onboarding column rewrite.

### P1 — real surface, lower-volume route

- `Enquiry`, `Partner`, `LeadTracking`, `ClaimNotification`,
  `ContractorSubscription`, `ModuleProgress`, `OnboardingProgress`.

### P2 — small blast radius, easy fix

- `PartnerBilling`, `ContractorNotification`, `ErrorLog` (this is
  why `/log-error` smoke-tests fail).

### P3 — flag-gated, not running in prod

- `RedditPost` (orchestrator dead?), `FinanceReferral`,
  `FinanceReferralEvent` (`FINANCE_REFERRAL_WRITER_ENABLED=false`).

---

## 6. Remediation plan

### 6.1 Recommended ordering

| Step | What                                                                                    | Risk     | Effort      |
| ---: | --------------------------------------------------------------------------------------- | -------- | ----------- |
|    1 | **Bucket 3 deletion PR** — drop the 18 dead models in one schema-only PR (no migrations needed beyond `prisma generate`). | Low      | 0.5 day     |
|    2 | **Bucket 2 LOW-confidence pruning** — fold the LOW rows into Bucket 3 after final triage. | Low      | bundled     |
|    3 | **Bucket 1 P2 quick wins** — `ErrorLog`, `ContractorNotification`, `PartnerBilling`. Three small `CREATE TABLE` migrations. Unblocks `/log-error` smoke. | Low      | 0.5 day     |
|    4 | **Bucket 2 column-level diff PR** — for each remaining HIGH/MEDIUM row, write a one-pager and decide map vs rewrite. | Medium   | 1 day       |
|    5 | **`User` rewrite + `@@map("users")`** — full call-site sweep, smoke-test login. | High     | 1–2 days    |
|    6 | **`ContractorApplication` rewrite + `@@map`** — re-route ApplyClient writes onto fields. | Medium   | 1 day       |
|    7 | **Bucket 1 P0 cluster** — `Lead`/`Job`/`JobOffer`/`ProofOfWork` migrations or alias decisions, one ticket each. | High     | 1 week      |
|    8 | **Bucket 1 P1 cleanup** — remaining lead/contractor/notification surfaces. | Medium   | 2–3 days    |
|    9 | **Bucket 1 P3 decision** — confirm Reddit orchestrator dead → drop OR `CREATE TABLE`. | Low      | 0.5 day     |

### 6.2 Bucket-level effort estimate

| Bucket   | Models | Engineering effort                  |
| -------- | -----: | ----------------------------------- |
| Bucket 3 |     18 | 0.5 day (single schema-only PR)     |
| Bucket 2 |     17 | 3–5 days (HIGH rewrites are heavy)  |
| Bucket 1 |     18 | 2 weeks (P0 cluster dominates)      |
| **Total**|     53 | **~3 weeks** to full closure        |

### 6.3 Per-bucket schema/SQL change required

**Bucket 3 (drop models):**

```prisma
// In prisma/schema.prisma, delete the model { } block for each.
// No migration generated — these tables either never existed in
// prod (most cases) or were already dropped by PR #246's migration.
```

**Bucket 2 (add `@@map`):**

```prisma
// AFTER column reconciliation:
model User {
  // ... rewritten fields matching live `users` table
  @@map("users")
}
```

**Bucket 1 (`CREATE TABLE` migrations):**

Use `npm run prisma:migrate` (per @.claude/rules/dev-environment.md §10 —
never raw SQL by hand). One migration per model cluster keeps the
diff reviewable. ADR-013 append-only constraints do NOT apply — these
are operational tables, not the `compliance_events` ledger.

---

## 7. Acceptance Criteria — DR-804 closed when

1. **Zero phantom models in `schema.prisma`.** Every declared model
   has either (a) a live table with matching name OR (b) a
   documented `@@map("table_name")` whose target exists in
   production.
2. **`npx prisma db pull` produces no diff** between
   `schema.prisma` and the live introspection (modulo intentional
   exclusions documented in `prisma/supabase-tables-introspection.md`,
   notably `compliance_events` per ADR-013).
3. **Smoke tests pass.** The MEMORY-noted `/admin` and `/log-error`
   failures resolve once `User`, `ContractorApplication`, and
   `ErrorLog` are unblocked.
4. **Sentry / `captureException` quiet on `P2021`/`P2022` codes**
   for at least 24h after the final P0 PR lands.
5. **MEMORY.md entry written** at DR-804 close-out summarising the
   PR sequence, before/after counts, and any deferred follow-ups.

---

## 8. Open questions for Phill / next agent

- **`Lead` ↔ `lead_captures` column shape** — is the live
  `lead_captures` table the right home for the funnel surface, or
  should we `CREATE TABLE leads` to preserve current Prisma fields?
  Recommend a 1-pager column diff before committing.
- **`Job` decision** (Path X vs Path Y per `bucket-2-column-diff` §3)
  — adopt the property-based live `jobs` shape or build
  `field_service_jobs`. Needs product input.
- **Reddit orchestrator** — is `src/lib/reddit/orchestrator/*`
  permanently dead post-PR-#233? If yes, the entire Reddit cluster
  (5 Bucket-3d models + `RedditPost`) drops in one PR.
- **`Booking`** — already a live table per `bucket-2-column-diff` §5,
  but no Prisma model. Is this in scope for DR-804 (add a model)
  or a separate ticket? `.context/domain-models.md` flags it as
  Known Drift.

---

## 9. Cross-references

- `MEMORY.md` 2026-04-27 — DR-804 source ticket, "53 phantom Prisma
  models" framing.
- `MEMORY.md` 2026-04-29 — PR #306 Prisma binary-target fix; this
  audit catches the same class of drift.
- `prisma/schema.prisma` — current schema (66 models, 14 `@@map`).
- `prisma/supabase-tables-introspection.md` — live-table inventory
  (109 tables, refreshed 2026-04-27).
- `docs/audits/phantom-prisma-models-2026-04-27.md` — original 3-bucket pass.
- `docs/audits/dead-prisma-models-2026-04-27.md` — the dead-model
  inventory whose Section C drove PR #246.
- `docs/audits/bucket-2-column-diff-2026-04-27.md` — column-level
  reconciliation for HIGH-confidence Bucket 2 rows.
- `docs/audits/raw-sql-audit-2026-04-27.md` — companion raw-SQL
  audit (different surface, same root cause).
- `docs/audits/dr-claim-submission-fk-debt-2026-04-29.md` — claim-side
  FK debt unblocked by the binary fix; partial overlap with this
  audit (`Booking`, `users`, `InsuranceProvider`).
- ADR-013 — `compliance_events` append-only constraint (relevant
  context for any DDL work here).
- ADR-014 — Path A funds-flow (relevant for `OnboardingPayment` and
  `ContractorSubscription` table designs).
- `.context/domain-models.md` — canonical domain → Prisma mapping;
  update in same PR as any schema change.

_End of report._
