# Phase 3 — Plan

**Loop:** `2026-04-29-finance-referral-persistence`

## Numbered steps

1. **Create migration directory.**
   - `prisma/migrations/20260429000000_finance_referral/`
2. **Write `migration.sql`** — `CREATE TABLE IF NOT EXISTS` for
   `FinanceReferral` matching the existing schema.prisma model + 3
   indexes.
3. **Edit `app/api/finance/referral/route.ts`:**
   - Import `prisma` from `@/lib/prisma`.
   - After computing `auditEntry`, add a `try/catch`-wrapped
     `prisma.financeReferral.create()` call.
   - Replace the TODO comment with a one-line comment pointing to
     this loop's handoff doc.
4. **Regenerate Prisma client** — `npx prisma generate`.
5. **Typecheck** — `npx tsc --noEmit` filtered to `app/api/finance/referral/route.ts`.
6. **Write 05/06/07 artefacts.**
7. **Commit + PR + merge.**

## Token budget

~10k.

## File territory

- `prisma/migrations/20260429000000_finance_referral/migration.sql` — NEW.
- `app/api/finance/referral/route.ts` — edited (~10 line addition).
- No other files touched.

**Proceed to Phase 4 — Implement.**
