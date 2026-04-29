# Claim Submission FK Constraint Debt — 2026-04-29

> **Severity:** P0 (silent prod data loss for ~unknown duration)
> **Discovered:** 2026-04-29 during DR-700 hotfix verification
> **Status:** OPEN — domain rework scheduled, route's `local-` fallback continues to mask the issue from end users

## TL;DR

The public `/api/claims/submit` route has been silently failing every DB write for an unknown period. End users get a tracking URL + email and never see an error. The `InsuranceClaimAU` prod table has been **empty the entire time** (confirmed by `SELECT COUNT(*)` returning 0).

Root cause: the public anonymous form is trying to insert into a CRM-style table with FK constraints requiring authenticated users + pre-existing bookings + verified insurance providers, none of which the public form has.

## Discovery context

While verifying PR #294 (A8 webhook idempotency + B9 ClaimStatus enum), submission tests via prod API consistently returned `claimId: 'local-...'` instead of the expected `cl...` (cuid). Investigation revealed:

1. The route's catch block falls back to a `local-${Date.now()}` ID when `prisma.insuranceClaimAU.create()` throws.
2. Every public submission throws because of FK violations.
3. The fallback is graceful (user sees success, gets email, gets tracking URL) — so the issue has been invisible.

## Concrete evidence

### FK constraints on `InsuranceClaimAU` (prod)

```
constraint_name                            definition
------------------------------------------ -----------------------------------------------------------
InsuranceClaimAU_bookingId_fkey            FOREIGN KEY ("bookingId") REFERENCES "Booking"(id)
InsuranceClaimAU_clientId_fkey             FOREIGN KEY ("clientId") REFERENCES users(id)
InsuranceClaimAU_insuranceProviderId_fkey  FOREIGN KEY ("insuranceProviderId") REFERENCES "InsuranceProvider"(id)
InsuranceClaimAU_tenantId_fkey             FOREIGN KEY ("tenantId") REFERENCES tenants(id)  -- nullable, OK
```

### What the route passes (from `app/api/claims/submit/route.ts`)

```ts
prisma.insuranceClaimAU.create({
  data: {
    bookingId: body.bookingId || '',                       // ← '' is not in Booking → FK violation
    clientId: body.clientId || body.email,                 // ← email is not in users → FK violation
    insuranceProviderId: normalizedProvider,               // ← may not exist → FK violation
    policyNumber: normalizedPolicyNumber,
    ...
  }
});
```

### Required-but-missing reference data for an anonymous public submission

- `Booking` row — public form has no booking concept (per `.context/domain-models.md`: *"no persistent model yet"*)
- `users` row — Supabase auth table, anonymous users not in it
- `InsuranceProvider` row — only populated by ops staff for known insurers

## Why this looks like prior known drift

This matches the audit doc's identified pattern (PR #239, DR-804):

> **MAJOR finding** from introspection refresh: **53 Prisma models without backing tables in production.**

`InsuranceClaimAU` is the inverse — has backing table, but the schema's lack of FK declaration plus the prod DB's actual FK constraints means Prisma client generates types that don't reflect the real DB rules.

## Three remediation paths (need domain decision)

### Path 1 — Route public submissions to `Enquiry`, promote later
**Recommended.**

Per `UBIQUITOUS_LANGUAGE.md`:
- `Enquiry` = light-touch contact form submission, no property committed
- `Lead` = scored Enquiry
- `Claim` = Client-completed intake

The public `/claim` form is closer to an `Enquiry` than a `Claim`. Promote to `InsuranceClaimAU` only after:
1. An authenticated user (Supabase auth row) is created or linked
2. A `Booking` is created (which itself needs a persistent model)
3. The insurer is verified against `InsuranceProvider`

### Path 2 — Make FKs nullable, allow anonymous claims
Schema migration to drop the NOT NULL constraints + nullable FKs. Lets public claims land directly. Risk: pollutes `InsuranceClaimAU` with un-promoted entries; ops dashboards need filtering; reporting becomes ambiguous.

### Path 3 — Synthesise reference rows on every public submit
Create stub `Booking` + `users` + `InsuranceProvider` rows inline. Fragile, security-implications around fake auth users, makes the data warehouse dirty.

## Acceptance criteria

To close this debt:
- Public `/claim` submissions land in a real DB row in some table (no `local-` fallback)
- Ops dashboards can query whatever table that is
- Authenticated submission flow continues to write proper `InsuranceClaimAU` rows
- No FK violations
- All existing local-fallback rows (if any persisted to filesystem) get migrated

## Workaround in place

The route's catch block writes to `compliance_events` with `outcome: 'db_write_failed'` and falls back to a `local-${timestamp}` ID. End users see no failure. This is **not** a fix — it's a graceful degradation.

## Reference commits

- `a570083d` (#304) — final hotfix unblocking deploy; revealed this issue post-deploy
- `950e87e0` (#303) — schema-alignment hotfix; doesn't fix this
- `b6ccec02` (#294) — A8 + B9; B9 portion was deferred due to enum mismatch (separate ticket)

## Owner

Domain decision required: pick Path 1, 2, or 3. Recommend pairing with the **DR-804 phantom Prisma models 3-bucket audit** since they're the same class of drift.
