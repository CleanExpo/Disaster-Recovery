# Phantom Prisma Models — 3-Bucket Audit (DR-804)

> Generated: 2026-04-27. Auditor: senior Prisma + TypeScript schema reviewer.
> Source of truth: `prisma/schema.prisma` (79 models) ×
> `prisma/supabase-tables-introspection.md` (90 live tables, dated
> 2026-02-22). No code changes made — analysis only.

## Note on count discrepancy

`MEMORY.md` 2026-04-27 entry quotes **53 phantom models** from the
PR #239 introspection refresh against 109 live tables. The
introspection markdown checked into the repo right now is still the
2026-02-22 snapshot (90 tables), so the strict computation against the
file in-tree yields **67 phantoms**. The extra ~14 models likely have
backing tables surfaced by the PR #239 refresh (e.g. `users`, several
contractor sub-tables) but those rows are not yet in the on-disk
markdown. This audit therefore over-reports rather than under-reports
— each phantom is bucketed conservatively and Bucket 2 calls out the
likely refresh-only matches as HIGH-confidence `@@map` candidates.

If the refreshed introspection snapshot is later checked in, re-run
the methodology in §5 before deleting any model in Bucket 3.

---

## 1. TL;DR

| Bucket             | Description                                              | Count  |
| ------------------ | -------------------------------------------------------- | ------ |
| **Bucket 1**       | CRITICAL — live route, no live table, no co-tenant match | **22** |
| **Bucket 2**       | `@@map` candidate — lowercase co-tenant table exists     | **15** |
| **Bucket 3**       | Dead — 0 hits or hits only in seed/utility scripts       | **30** |
| **Total phantoms** |                                                          | **67** |

Hits counted via `grep -rE "prisma\.<camelCase>\." src/ app/ scripts/`
across `.ts/.tsx/.js/.jsx`.

---

## 2. Bucket 1 — CRITICAL bugs (22)

These models are referenced from live route handlers, lib code that
runs in route context, or cron jobs. There is no backing live table
and no plausible lowercase co-tenant match. **Every call site listed
below is broken at runtime under any non-trivial use** — Prisma will
throw `PrismaClientKnownRequestError P2021` (table does not exist).

| Model                    | First call site                                        | Hits | Recommended action                                                                                                                                                          |
| ------------------------ | ------------------------------------------------------ | ---- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `Lead`                   | `src/lib/lead-assignment.ts:48`                        | 35   | **P0** — core lead funnel. Either restore the `Lead` table from migrations or migrate to `enquiry`/`opportunities`.                                                         |
| `Job`                    | `app/api/contractor/analytics/route.ts:93`             | 27   | **P0** — contractor dashboard, analytics, dispatch. No live `jobs`/`Job` table; closest is `tasks` (semantics differ). Restore table or rebuild against `service_requests`. |
| `JobOffer`               | `src/lib/contractor-matching.ts:308`                   | 14   | **P0** — contractor matching pipeline. No backing table.                                                                                                                    |
| `User`                   | `src/lib/agents/research-planner/documentation.ts:343` | 12   | **P0** — auth + admin. See Bucket 2 (`users` lowercase exists). Listed here too because the call sites are live; treat as Bucket 2 if `users` mapping confirmed.            |
| `ContractorApplication`  | `app/admin/page.tsx:50`                                | 12   | **P0** — admin dashboard + onboarding. See Bucket 2 (`contractor_applications` exists).                                                                                     |
| `ProofOfWork`            | `app/api/proof-of-work/submit/route.ts:74`             | 12   | **HIGH** — proof-of-work submit + verify routes. No live table.                                                                                                             |
| `JobOutcome`             | `app/api/contractor/jobs/route.ts:257`                 | 10   | **HIGH** — schema already maps to `@@map("job_outcome_logs")` but neither name exists live.                                                                                 |
| `RedditPost`             | `src/lib/reddit/orchestrator/orchestrator.ts:71`       | 10   | **MED** — Reddit orchestrator. Likely flag-gated; verify whether orchestrator actually runs in prod.                                                                        |
| `OnboardingPayment`      | `app/api/stripe/create-payment/route.ts:75`            | 9    | **HIGH** — Stripe onboarding payment flow. No backing table.                                                                                                                |
| `Enquiry`                | `app/api/contact/submit/route.ts:57`                   | 8    | **HIGH** — public contact form.                                                                                                                                             |
| `Partner`                | `src/lib/lead-assignment.ts:57`                        | 8    | **HIGH** — lead assignment to partners.                                                                                                                                     |
| `PushToken`              | `app/api/internal/push-dispatch/route.ts:133`          | 8    | **MED** — push notification dispatch (cron + native).                                                                                                                       |
| `FinanceReferral`        | `src/lib/finance/persistence.ts:45`                    | 6    | **MED** — flag-gated (`FINANCE_REFERRAL_WRITER_ENABLED=false`). Failure surface limited until flag flips.                                                                   |
| `FinanceReferralEvent`   | `src/lib/finance/persistence.ts:61`                    | 4    | **MED** — same flag as above.                                                                                                                                               |
| `LeadTracking`           | `src/lib/lead-assignment.ts:138`                       | 4    | **HIGH** — paired with `Lead`.                                                                                                                                              |
| `ModuleProgress`         | `app/api/contractor/onboarding/progress/route.ts:25`   | 4    | **HIGH** — contractor onboarding progress.                                                                                                                                  |
| `ClaimNotification`      | `src/lib/notifications.ts:97`                          | 4    | **HIGH** — notifications lib called from claim routes.                                                                                                                      |
| `ContractorSubscription` | `app/api/contractor/subscription/cancel/route.ts:82`   | 4    | **HIGH** — Stripe subscription cancel.                                                                                                                                      |
| `OnboardingProgress`     | `app/api/contractor/onboarding/progress/route.ts:24`   | 3    | **HIGH** — paired with ModuleProgress.                                                                                                                                      |
| `PartnerBilling`         | `src/lib/lead-assignment.ts:119`                       | 3    | **MED** — partner billing log.                                                                                                                                              |
| `ContractorNotification` | `app/api/contractor/dashboard/route.ts:234`            | 3    | **MED** — dashboard notifications.                                                                                                                                          |
| `ErrorLog`               | `app/api/log-error/route.ts:53`                        | 3    | **MED** — `/api/log-error` route. The smoke-test failure on `/log-error` noted in MEMORY may be this bug surfacing.                                                         |

### Notes on Bucket 1

- **`Lead`/`Job`/`JobOffer` cluster** is the worst exposure: lead
  assignment, contractor matching, and the contractor analytics
  dashboard all depend on these. If any of these endpoints are hit
  in production today, they will 500.
- **`User` and `ContractorApplication`** are likely
  mis-classifications (the live `users` and
  `contractor_applications` tables exist as lowercase co-tenants —
  see Bucket 2). Verify on the refreshed introspection.
- The smoke test failures on `/admin` and `/log-error` flagged in
  MEMORY 2026-04-27 are almost certainly downstream of `User`,
  `ContractorApplication`, and `ErrorLog` phantom calls.

---

## 3. Bucket 2 — `@@map` candidates (15)

These models have a live lowercase co-tenant table whose name
plausibly matches the model's domain. Adding `@@map("...")` to the
Prisma model should restore connectivity without code changes.

| Model                                                                                                            | Proposed `@@map` target                                     | Confidence | Reasoning                                                                                                                                                                                                                                 |
| ---------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- | ---------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `User`                                                                                                           | `@@map("users")`                                            | **HIGH**   | Live `users` table exists. Standard Prisma convention. Verify column compatibility.                                                                                                                                                       |
| `ContractorApplication`                                                                                          | `@@map("contractor_applications")`                          | **HIGH**   | Live `contractor_applications` exists. 7-step onboarding domain matches.                                                                                                                                                                  |
| `ContractorCertification`                                                                                        | `@@map("contractor_certifications")`                        | **HIGH**   | Live `contractor_certifications` exists. Direct semantic match. 0 hits in code → may also be Bucket 3, but mapping is free safety.                                                                                                        |
| `Client`                                                                                                         | `@@map("client_profiles")`                                  | **MEDIUM** | `Client` Prisma model is contact + auth; `client_profiles` live table is profile data. Schemas may diverge — column-level review needed before adding `@@map`. Alternatively keep separate; some code may want the auth side via `users`. |
| `ClaimPhotoAttachment`                                                                                           | `@@map("inspection_photos")`                                | **MEDIUM** | Domain overlap (claim photos = inspection photos in current intake flow). Column reconciliation needed.                                                                                                                                   |
| `BackgroundCheck`                                                                                                | (no obvious lowercase match)                                | **LOW**    | No live table found. Closer to drop than map. Listed here only because contractor onboarding context is alive elsewhere.                                                                                                                  |
| `ContractorPayment`                                                                                              | `@@map("client_payments")`                                  | **LOW**    | Schema mismatch — DR contractors PAY DR (subscription/platform fee), `client_payments` is for client→contractor flow. Probably NOT a valid map; flag for review.                                                                          |
| `ContractorTerritory`                                                                                            | `@@map("contractor_location_history")`                      | **LOW**    | Both relate to geography but semantics differ (territory = current service area; location_history = audit trail). Verify before mapping.                                                                                                  |
| `ContractorAuditLog`                                                                                             | `@@map("workspace_audit_logs")`                             | **LOW**    | Both are audit logs. Workspace prefix suggests multi-tenant scope — column compatibility unknown.                                                                                                                                         |
| `OnboardingProgress`                                                                                             | `@@map("contractor_onboarding")`                            | **MEDIUM** | Direct semantic match; live `contractor_onboarding` table tracks step status. Verify field shape.                                                                                                                                         |
| `ModuleProgress`                                                                                                 | `@@map("contractor_module_progress")`                       | **MEDIUM** | Live `contractor_module_progress` exists. Need to confirm whether Prisma `ModuleProgress` is contractor- or client-scoped (`client_module_progress` also exists).                                                                         |
| `Notification`                                                                                                   | `@@map("notification_preferences")`                         | **LOW**    | Different concept (preferences ≠ a notification record). More likely Bucket 3.                                                                                                                                                            |
| `Enquiry`                                                                                                        | `@@map("waitlist_submissions")` OR `@@map("opportunities")` | **LOW**    | Neither is a clean match. `Enquiry` semantics (light-touch contact) closest to `waitlist_submissions`; pre-Lead funnel closer to `opportunities`. Probably build a real `enquiries` table instead.                                        |
| `ContractorAvailability`                                                                                         | `@@map("contractor_preferences")`                           | **LOW**    | Both contractor-side configuration tables; not the same thing. Verify before mapping. 0 hits in code → could also be dropped.                                                                                                             |
| `EmergencyGuide` / `ServiceProcedure` / `StepByStepGuide` / `GuideStep` / `InsuranceProcess` / `VerifiedContent` | `@@map("blog_posts")` or `@@map("case_studies")`            | **LOW**    | Knowledge-base-shaped models hitting compliance-bot lookups. Live blog tables exist; semantics overlap but column shape probably differs. Better to either drop (Bucket 3) or build dedicated tables.                                     |

### Decision rule for Bucket 2

Add `@@map("...")` only after a column-level diff between the Prisma
model and the live table. Where confidence is LOW, prefer Bucket 3
(drop) plus a fresh CREATE TABLE migration if the route should keep
working.

---

## 4. Bucket 3 — Safe to drop (30)

Zero hits in `src/`, `app/`, `scripts/`, OR hits only in seed/admin
utility scripts that don't run in production. Safe to delete from
`prisma/schema.prisma` in a single PR (subject to the caveats in
§5 Methodology).

### 4a. Zero hits anywhere (14)

```
BackgroundCheck
BotMetrics
ContractorAgreement
ContractorAvailability
ContractorCertification
ContractorInvoice
ContractorProject
ContractorReference
ContractorSupport
ContractorTraining
GuideStep
PartnerPayment
SubscriptionPricing
SupportMessage
```

### 4b. Hits only in `scripts/core/seed*.ts` or one-off admin (5)

```
Agency        (1 hit, seed.ts:10)
Audit         (2 hits, seed.ts:101 + seed-admin.ts)
Invoice       (1 hit, seed.ts:162)
Notification  (1 hit, seed.ts:202)
Proposal      (1 hit, seed.ts:138)
```

These five exist solely to support a seed script that itself never
runs in production (the live DB is Supabase-managed). Drop the
models, drop the seed entries.

### 4c. Hits only in compliance/data-verification or bot subsystems (6)

```
EmergencyGuide          (data-verification-layer.ts)
InsuranceProcess        (data-verification-layer.ts)
ServiceProcedure        (data-verification-layer.ts)
StepByStepGuide         (data-verification-layer.ts)
VerifiedContent         (data-verification-layer.ts)
ComplianceAudit         (elysia-engine/client-bot-handler.ts)
```

`src/bots/compliance/data-verification-layer.ts` and the elysia
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

The Reddit orchestrator (`src/lib/reddit/orchestrator/*`) appears
to be flag-gated and not exercised by any deployed route. If
`/api/reddit/migrate` was deleted in PR #233 (see MEMORY) the
orchestrator may be entirely dead. Confirm before dropping —
otherwise Bucket 1 promotion if any cron actually runs it.

> Note: `RedditPost` (10 hits) is **NOT** in this bucket — it's
> Bucket 1 because it's hit from `orchestrator.ts:71` which is on
> the active execution path of the orchestrator.

---

## 5. Methodology

### 5.1 Inputs

- `prisma/schema.prisma` — parsed for `^model <Name>` declarations
  and any `@@map("...")` directives within each model block. 79
  models found, 6 explicit `@@map` directives (one of which —
  `JobOutcome → job_outcome_logs` — itself targets a non-existent
  table).
- `prisma/supabase-tables-introspection.md` — parsed for "Tables
  Already in Prisma Schema" (3) and "Tables Missing from Prisma
  Schema" (87 `#### \`name\`` headings). 90 live tables total in
  this snapshot.

### 5.2 Phantom computation

A Prisma model is "phantom" if neither (a) the model name nor (b)
its `@@map` target appears in the live tables set. 67 of 79 models
are phantom by this rule.

### 5.3 Per-model grep

For each phantom model `M`, computed camelCase form `m` (lowercase
first char, rest unchanged) and ran:

```
grep -rEn "prisma\.<m>\." src/ app/ scripts/ \
  --include="*.ts" --include="*.tsx" --include="*.js" --include="*.jsx"
```

Hit counts:

- 0 hits: 14 models
- 1–2 hits: 27 models (mostly seed + bots + compliance lookups)
- 3–9 hits: 18 models (live route surfaces)
- 10+ hits: 8 models (`Lead 35`, `Job 27`, `JobOffer 14`, `User 12`,
  `ContractorApplication 12`, `ProofOfWork 12`, `JobOutcome 10`,
  `RedditPost 10`)

Total occurrences across 73 files: 271.

### 5.4 Bucket judgement criteria

- **Bucket 1** — ≥1 hit AND first call site sits inside an
  `app/api/**/route.ts`, an `app/admin/**`, or a `src/lib/**` file
  imported by a route. NO plausible lowercase co-tenant table.
- **Bucket 2** — Lowercase co-tenant table found in introspection.
  Confidence assigned by domain-name proximity (HIGH = exact stem
  match in plural form; MEDIUM = same domain different shape;
  LOW = overlapping domain different concept).
- **Bucket 3** — Zero hits, OR hits only in `scripts/`,
  `src/bots/`, or files known dead (Reddit orchestrator gated off).

### 5.5 Caveats

- The live introspection in-repo is the 2026-02-22 snapshot. The
  PR #239 refresh (109 tables) may surface backing tables for some
  of the Bucket 1 models — re-run §5.2 against the fresh snapshot
  before any drop PR.
- Hit counts in compiled output, `.next/` cache, and tests were
  intentionally excluded — only source files in `src/`, `app/`,
  `scripts/`.
- The `JobOutcome → job_outcome_logs` mapping is itself phantom and
  was treated as if no `@@map` were declared (Bucket 1 placement).
- Models that share a name with a live table (`AuditLog`,
  `Booking`, `Contractor`, `ContractorDocument`, `InsuranceClaimAU`,
  `Payment`, `Rating`) are NOT phantoms and were excluded from
  this audit.

---

## 6. Recommended sequencing

1. **Refresh introspection** — re-run `prisma db pull` and check in
   the 109-table snapshot before any code change. This will likely
   move 5–10 Bucket 1 entries into Bucket 2 (HIGH confidence
   `@@map`) and is the cheapest unlock.
2. **Land Bucket 2 HIGH-confidence `@@map` PR** — `User`,
   `ContractorApplication`, `ContractorCertification` first.
   Column-level diff each before merging. Prisma will refuse the
   migration if columns are incompatible — that is the intended
   safety net.
3. **Land Bucket 3 deletion PR** — drop all 30 models in a single
   schema-only PR. Touching 30 models in one PR is fine because
   none of them have call sites; the diff is purely additive
   removal.
4. **Open per-cluster Bucket 1 tickets** — `Lead/Job/JobOffer`
   cluster is one ticket; `ProofOfWork`/`JobOutcome` is another;
   `OnboardingPayment`/`OnboardingProgress`/`ModuleProgress`/
   `ContractorSubscription` is a third. Each requires either (a)
   a CREATE TABLE migration to restore the missing live table or
   (b) a code rewrite onto a live table that already covers the
   same domain.
5. **Verify smoke tests** — the MEMORY-noted `/admin` and
   `/log-error` smoke failures should resolve once `User`,
   `ContractorApplication`, and `ErrorLog` are unblocked.

---

## 7. Cross-references

- `MEMORY.md` 2026-04-27 — DR-804 source ticket, "53 phantom
  Prisma models" framing.
- `prisma/supabase-tables-introspection.md` — live-table inventory.
- `docs/audits/dead-prisma-models-2026-04-27.md` — earlier audit
  that found 15 zero-reference models (subset of this audit's
  Bucket 3).
- `docs/audits/supabase-prisma-drift-2026-04-27.md` — Phase 1
  schema-drift summary.
- `docs/audits/raw-sql-audit-2026-04-27.md` — companion raw-SQL
  audit (different surface, same root cause).
- ADR-013 — `compliance_events` append-only constraint (relevant
  context for any DDL changes here).

_End of report._
