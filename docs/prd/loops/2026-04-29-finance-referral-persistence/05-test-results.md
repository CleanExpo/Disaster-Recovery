# Phase 5 — Test Results

**Loop:** `2026-04-29-finance-referral-persistence`

## Files changed

| File                                                              | Type | Purpose                                                   |
| ----------------------------------------------------------------- | ---- | --------------------------------------------------------- |
| `prisma/migrations/20260429000000_finance_referral/migration.sql` | NEW  | Materialise `FinanceReferral` table                       |
| `app/api/finance/referral/route.ts`                               | EDIT | Wire `prisma.financeReferral.create()` write; remove TODO |

## Verification

| Check                                                                                     | Result                                              |
| ----------------------------------------------------------------------------------------- | --------------------------------------------------- |
| `npx prisma generate`                                                                     | ✅ Client regenerated, 698ms                        |
| `npx tsc --noEmit` filtered to changed files                                              | ✅ zero errors                                      |
| Migration SQL uses idempotent `CREATE TABLE IF NOT EXISTS` + `CREATE INDEX IF NOT EXISTS` | ✅                                                  |
| Persistence write wrapped in try/catch                                                    | ✅                                                  |
| Stdout audit log preserved as fallback                                                    | ✅                                                  |
| API response shape unchanged                                                              | ✅ `{ ok, referral_id, handoff_token, expires_in }` |
| No raw PII in the persisted row                                                           | ✅ (only hash, IP, UA, categoricals, consent flags) |
| AU English in new code/comments                                                           | ✅                                                  |
| Banned phrases                                                                            | ✅ none introduced                                  |

## Migration not deployed in this loop

The migration file is committed to the repo. **Running it against
Supabase (prod or staging) is Phill's explicit call.** Auto-mode
forbids destructive ops on shared/production systems without consent.

To deploy:

```bash
npx prisma migrate deploy
```

This applies the migration to whichever DB `DATABASE_URL` resolves to.

Until then, the runtime persistence call falls into the catch branch,
logs the failure, and the stdout audit line remains the record-of-
transmission. No request fails.

## Behaviour matrix (post-migration vs pre-migration)

| Equipped flag | Migration deployed | Outcome                                                                                                                                                   |
| ------------- | ------------------ | --------------------------------------------------------------------------------------------------------------------------------------------------------- |
| OFF           | not yet            | Route returns 200 with handoff JWT. Persistence catch branch fires (relation does not exist). Stdout log captures audit. **Current default.**             |
| OFF           | yes                | Route returns 200. Row written to FinanceReferral. Stdout log also captures audit.                                                                        |
| ON            | not yet            | Route returns 200 (referral submission is independent of webhook flag — only `/api/finance/status` is gated). Persistence catch fires. Stdout audit only. |
| ON            | yes                | Full happy path. Row written, audit logged, JWT issued.                                                                                                   |

## Out of scope (deferred to future loops)

- Status webhook persistence — `referral-store.ts` stays in-memory.
- `compliance_events` row for `finance_referral_submitted`.
- Schema extensions for webhook fields.

## Exit gate

- [x] Migration SQL committed.
- [x] Runtime write wired and try/catch protected.
- [x] No public API contract change.
- [x] TypeScript clean.
- [x] Stdout fallback preserved.

**Proceed to Phase 6 — Review.**
