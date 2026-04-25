# Phase 0 — Intake

**Loop:** `2026-04-29-finance-referral-persistence`
**Opened:** 2026-04-29
**Owner:** Phill McGurk + Claude Code

## Ask

Promote the FinanceReferral domain shape from in-memory + TODO comments
to first-class persistence.

## Pre-flight findings

Code audit shows the situation is partly already done:

- **`prisma/schema.prisma` line 2099** — `FinanceReferral` model already
  defined (uuid id, country, customer/funding/disaster/source, consent
  flags, payload hash, IP, UA, receiver, status-webhook mirror fields).
- **No migration** for that model exists yet (none of the
  `prisma/migrations/*` files create the table).
- **`app/api/finance/referral/route.ts` line 186** — explicit TODO:
  `prisma.financeReferral.create({ data: auditEntry })`. Currently
  logs to stdout only.
- **`src/lib/finance/referral-store.ts`** — in-memory Map for status
  webhook. Used by `app/api/finance/status/route.ts` (writer) and
  `app/admin/finance-referrals/page.tsx` (reader). Equipped flag is
  OFF, no live traffic.

## Scope (this loop)

1. Generate migration for the existing FinanceReferral schema model so
   the table actually exists when the migration is deployed.
2. Wire the submission audit write in `referral/route.ts` to
   `prisma.financeReferral.create()` (replacing the TODO). Wrap in
   try/catch so a missing table doesn't break the API response.
3. Regenerate Prisma client.

## Out of scope (future Phase 2)

- Migrating the **status webhook** in-memory store to Prisma. The
  `referral-store.ts` API stays as-is. Equipped flag is OFF, no live
  traffic, no business risk from deferring.
- Schema extensions for status-webhook fields (`entityIdentifierHash`,
  `stage`, `consentVersion`, `smsSent`, `metadata`).

## Out of scope (this auto-mode session)

Running `prisma migrate deploy` against prod Supabase. The migration
file lands in repo; running it is Phill's explicit call.

## Exit gate

- [x] Scope narrowed to additive, flag-gated, low-risk slice.
- [x] Out-of-scope items captured for follow-up.

**Proceed to Phase 1 — Grill Me.**
