# Phase 6 — Review

**Loop:** `2026-04-29-finance-referral-persistence`
**Skill invoked:** `improve-codebase-architecture`.

## What went well

- Phase 0/1 found that the schema model already existed — saved a chunk
  of work and reduced risk vs designing a new model from scratch.
- Scope was sliced cleanly: submission audit (compliance-load-bearing,
  small) vs status webhook persistence (operational, no current
  traffic). Shipping the smaller, more critical half first is the
  right ADR-008 / brainstorming move.
- Try/catch fallback means the migration can be deployed on Phill's
  schedule without coupling to this loop's merge — zero risk of
  breaking the response path.
- Migration uses `CREATE TABLE IF NOT EXISTS` + `CREATE INDEX IF NOT EXISTS`
  — idempotent, re-runnable, matches the pattern from
  `20260424000000_claim_photo_attachment`.

## What went wrong

1. **Two non-null assertions** added in the route
   (`customer_type!`, `funding_band!`, `disaster_category!`). The
   route's `missing` validation guarantees they're non-null before
   reaching the Prisma write, but the type system can't see it without
   refactoring the validation to type-narrow. Acceptable trade-off
   for this loop; the alternative is pulling the validation into a
   helper and that's scope creep.

   **Fix going forward:** if a future loop touches this route, refactor
   `missing` checks into a single `validate()` helper that returns a
   discriminated union so the post-validation values are typed
   non-null.

## Residual debt

1. **Status webhook persistence** still in-memory. Future loop. Keep
   `referral-store.ts` API stable in the meantime.
2. **Schema extensions** — `entityIdentifierHash`, `stage`,
   `consentVersion`, `smsSent`, `metadata` (Json) for the status
   webhook half. Future loop.
3. **`compliance_events` write** for `finance_referral_submitted` —
   the route currently logs to stdout + (now) Prisma, but doesn't
   write a structured `compliance_events` row. That's the canonical
   audit trail per ADR pattern. Future loop.
4. **Production migration deploy** — Phill's call. The repo carries
   the SQL; running it is a Supabase ops action.

## Compliance audit

| Check                                                | Result                               |
| ---------------------------------------------------- | ------------------------------------ |
| No raw PII added to logs                             | ✅                                   |
| No raw PII persisted to Prisma                       | ✅ (only hash, IP, UA, categoricals) |
| Data-class CONFIDENTIAL flagged in migration comment | ✅                                   |
| AU English                                           | ✅                                   |
| Banned phrases                                       | ✅ none                              |
| Try/catch on external dep                            | ✅                                   |
| No `--no-verify` skip on git hooks                   | ✅                                   |

## Loop-system amendments to propose

- None this loop. The slice-the-loop pattern (do compliance-critical
  half first, defer operational half) worked cleanly without needing a
  PRD change.

## Exit gate

- [x] Decisions + non-null assertion trade-off documented.
- [x] Residual debt enumerated.

**Proceed to Phase 7 — Handoff.**
