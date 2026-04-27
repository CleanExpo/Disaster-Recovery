# ADR-013: compliance_events — formalise raw-SQL append-only pattern

- **Status:** Proposed
- **Date:** 2026-04-27
- **Context:** Phase 1 schema-drift audit (PR #231) finding P1, and pending decision documented in `.context/domain-models.md` "Known drift"

## Context

`compliance_events` is the only Supabase table without a Prisma model. The writer at `src/lib/compliance/events.ts` uses `prisma.$executeRaw` (parameterised) to insert rows. The reader path uses raw SQL too.

This is documented as drift in `.context/domain-models.md` and the Phase 1 audit (`docs/audits/raw-sql-audit-2026-04-27.md` §A) confirms it is the only legitimate raw-SQL surface in the codebase.

The team has two candidate dispositions:

1. **Promote to a first-class Prisma model** with `@@map("compliance_events")`. Removes the drift entry, lets the reader use Prisma's typed client, simplifies the dead-model audit.
2. **Formalise the raw-SQL pattern** with a database-level append-only guarantee that Prisma cannot express. Keep the raw-SQL writer as the canonical path.

## Decision drivers

1. **Append-only is the load-bearing property.** Compliance events are the audit trail for breach notification (NDB Part IIIC), data subject rights (APP 12), and regulator queries. A row that gets `UPDATE`d or `DELETE`d invalidates the entire ledger.
2. **Prisma cannot express append-only.** TypeScript type system has no way to forbid `prisma.complianceEvent.update()` or `delete()`. A future agent or engineer could call those methods accidentally, mutating the audit trail without intent.
3. **Postgres CAN express append-only.** `REVOKE UPDATE, DELETE ON compliance_events FROM <writer_role>` at the database level enforces it regardless of what the application layer attempts.
4. **Raw SQL with parameterisation is safe.** Phase 1 audit confirmed zero injection risk in the current writer. The cost of the raw-SQL pattern is comprehension, not safety.
5. **Reader doesn't need write methods.** Operator dashboards reading the ledger can use either Prisma's read methods or raw SQL — the choice is independent of the writer disposition.

## Decision

**Adopt option 2 — formalise the raw-SQL append-only pattern.** Keep the writer as `prisma.$executeRaw`. Add Postgres-level guarantees that mutation is impossible. Add a typed reader API.

This treats the audit trail with the discipline its function deserves and prevents accidental mutation by future code.

## Implementation steps (separate PR)

1. New migration `<timestamp>_compliance_events_append_only/migration.sql` that:
   - Creates a dedicated `compliance_events_writer` Postgres role.
   - `GRANT INSERT, SELECT ON compliance_events TO compliance_events_writer`.
   - `REVOKE UPDATE, DELETE ON compliance_events FROM compliance_events_writer, public, anon, authenticated`.
   - The application uses the service role for connectivity but the explicit revoke prevents accidental UPDATE/DELETE even from service role.
2. Update `src/lib/compliance/events.ts` to add a typed reader:
   ```ts
   export async function readComplianceEvents(filter: ...): Promise<ComplianceEventRow[]>
   ```
   Internally this uses `prisma.$queryRaw` with a strongly-typed return.
3. Add a CI lint that fails if any code in the codebase calls `prisma.complianceEvent.*` or imports a `ComplianceEvent` Prisma type. The model deliberately does not exist.
4. Add an explicit comment block at the top of `src/lib/compliance/events.ts`:
   ```ts
   // append-only ledger — writer surface is parameterised raw SQL.
   // Do NOT add a Prisma model for this table. See ADR-013.
   ```
5. Update `.context/domain-models.md` to remove `compliance_events` from "Known drift" (because it is no longer drift — it is intentional architecture). Replace with a positive entry under "Architectural exceptions".
6. Update `.claude/rules/privacy.md` §5 to reference this ADR.

## Consequences

- `compliance_events` is now an architecturally distinct surface — the only table in the system with a database-level mutation prohibition.
- Future PRs that add new compliance event types (the union in `events.ts`) work as today; only the writer/reader implementation changes.
- The dead-model audit (`docs/audits/dead-prisma-models-2026-04-27.md`) no longer needs to special-case `compliance_events`.
- Auditors get a stronger guarantee: "the table cannot be mutated, even by a buggy application." A regulator's "show me proof your audit trail is tamper-evident" question gets a Postgres `\dp` answer.
- Schema change cost: new event types still require a migration + the union update — same as today. No net change.

## Why not option 1 (promote to Prisma model)?

- Adds `prisma.complianceEvent.update/delete` to the API surface; future bug or regression could mutate the ledger.
- Requires defending against this mutation in code review forever.
- Loses the database-level guarantee.
- The marginal benefit (typed access) can be achieved equally with a typed `readComplianceEvents` helper that wraps `$queryRaw`.

## References

- Phase 1 audit §A in `docs/audits/raw-sql-audit-2026-04-27.md`
- `.context/domain-models.md` "Known drift" — to be updated
- `src/lib/compliance/events.ts` — current writer
- `prisma/migrations/20260423000000_compliance_events/migration.sql` — table creation
- `.claude/rules/privacy.md` §5 — compliance event logging policy
- `.claude/rules/compliance.md` §9 — required event types per route
- NDB (Notifiable Data Breaches) Part IIIC of Privacy Act 1988
