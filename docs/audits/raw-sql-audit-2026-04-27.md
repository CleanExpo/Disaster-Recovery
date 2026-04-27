# Raw SQL Audit — 2026-04-27

> Phase 1 data-access audit. Pure analysis, no code changes. Scope:
> every `prisma.$executeRaw*` / `prisma.$queryRaw*` / `Prisma.sql\`...\``invocation under`src/`and`app/`, cross-referenced against
`prisma/schema.prisma`.

## TL;DR

- **Total raw SQL invocations:** 14 in production code paths
  (1 file in `app/`, 1 file in `src/lib/compliance/`); plus 3 references
  inside the compliance unit test (`src/lib/compliance/__tests__/events.test.ts`).
- **Tagged-template `Prisma.sql\`...\`` form:** zero occurrences.
- **By category:**
  - **A. Compliance events:** 1 invocation (`src/lib/compliance/events.ts:126`).
  - **B. Migration-adjacent:** 13 invocations
    (`app/api/reddit/migrate/route.ts:20,32,43,56,79,90,101,112,115,121,124,127,130`).
  - **C. Performance:** 0.
  - **D. Schema bypass:** 1 — overlaps with category A
    (`compliance_events` has no Prisma model).
  - **E. Unknown / needs review:** 0.
- **P0 injection risks:** zero. Both files use either Prisma's
  parameterised tagged template (`$executeRaw\`...${param}...\``) or
  pass static, hard-coded SQL strings to `$executeRawUnsafe`/`$queryRawUnsafe` with no user input concatenation.
- **Drift candidates** (tables hit by raw SQL with no Prisma model):
  `compliance_events` (singular known case, already documented in
  `.context/domain-models.md` under "Known drift", awaiting ADR).
- **Headline finding:** the `app/api/reddit/migrate/route.ts` endpoint
  is doing schema mutation (CREATE TABLE / ALTER TABLE / CREATE
  INDEX) from the application tier. It is self-described as
  "ONE-TIME MIGRATION ENDPOINT — Delete after use" but is still
  reachable in production. Promote-or-delete decision needed (see
  Section E).

---

## Section A — Compliance helpers (`src/lib/compliance/*`)

### `src/lib/compliance/events.ts`

Canonical compliance ledger writer. Feature-flagged via
`COMPLIANCE_EVENTS_ENABLED` (server-only, defaults off — no-ops
silently when off).

| Aspect           | Detail                                                                                                                                                                                                                                    |
| ---------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Function         | `logComplianceEvent(input: ComplianceEventInput)`                                                                                                                                                                                         |
| Line             | 126                                                                                                                                                                                                                                       |
| API              | `prisma.$executeRaw\`...\`` (tagged template — parameterised)                                                                                                                                                                             |
| Target table     | `compliance_events` (raw SQL only — no Prisma model)                                                                                                                                                                                      |
| Statement        | `INSERT INTO compliance_events (...) VALUES (...)`                                                                                                                                                                                        |
| Parameterisation | All 13 values interpolated as `${data.x}` placeholders, including `${data.correlation_id}::uuid` and `${JSON.stringify(data.metadata)}::jsonb` casts. Prisma's tagged-template form binds these as parameters — NOT string concatenation. |
| PII handling     | `entity_identifier` is SHA-256 hashed via `hashIdentifier()` (line 84) before insert; consent text via `hashConsent()` (line 93). No raw PII reaches the query.                                                                           |
| Error policy     | `try/catch` wraps the insert; failures are `console.error`-logged but never propagated. Compliance writes must not break business flow (matches `.claude/rules/compliance.md` §9).                                                        |

In-line comment at line 124 explains the rationale: _"$executeRaw
until the Prisma schema is regenerated with the model. Using
parameterised interpolation to prevent injection."_

#### Other files in `src/lib/compliance/`

| File                                                   | Raw SQL?    | Notes                                                                                                                           |
| ------------------------------------------------------ | ----------- | ------------------------------------------------------------------------------------------------------------------------------- |
| `src/lib/compliance/events.ts`                         | Yes (above) | Canonical writer.                                                                                                               |
| `src/lib/compliance/__tests__/events.test.ts:23,76,98` | No (mocks)  | The `$executeRaw` references are `vi.fn()` mocks asserting that the writer no-ops when the flag is off. Not production raw SQL. |

No PII redactor in this folder yet. The CLAUDE.md §5.4 reference to
`src/lib/compliance/*` redactor is forward-looking (DR-714).

---

## Section B — Other raw SQL (categorised)

### `app/api/reddit/migrate/route.ts`

POST handler that bootstraps the Reddit Orchestrator schema if
absent. Contains 13 raw SQL invocations:

| Line | API                 | Statement                                                                                     | Target table            | Category            |
| ---- | ------------------- | --------------------------------------------------------------------------------------------- | ----------------------- | ------------------- |
| 20   | `$queryRawUnsafe`   | `SELECT EXISTS (...) FROM information_schema.tables WHERE table_name = 'RedditContentPillar'` | (information_schema)    | B — migration probe |
| 32   | `$executeRawUnsafe` | `CREATE TABLE "RedditContentPillar" (...)`                                                    | `RedditContentPillar`   | B                   |
| 43   | `$executeRawUnsafe` | `CREATE TABLE "RedditOrchestratorRun" (...)`                                                  | `RedditOrchestratorRun` | B                   |
| 56   | `$executeRawUnsafe` | `CREATE TABLE "RedditPost" (...)`                                                             | `RedditPost`            | B                   |
| 79   | `$executeRawUnsafe` | `CREATE TABLE "RedditSafetyAudit" (...)`                                                      | `RedditSafetyAudit`     | B                   |
| 90   | `$executeRawUnsafe` | `CREATE TABLE "RedditPerformanceLog" (...)`                                                   | `RedditPerformanceLog`  | B                   |
| 101  | `$executeRawUnsafe` | `CREATE TABLE "RedditSystemPrompt" (...)`                                                     | `RedditSystemPrompt`    | B                   |
| 112  | `$executeRawUnsafe` | `CREATE UNIQUE INDEX ... ON "RedditContentPillar"("code")`                                    | `RedditContentPillar`   | B                   |
| 115  | `$executeRawUnsafe` | `CREATE UNIQUE INDEX ... ON "RedditSystemPrompt"("version")`                                  | `RedditSystemPrompt`    | B                   |
| 121  | `$executeRawUnsafe` | `ALTER TABLE "RedditPost" ADD CONSTRAINT ...` (FK to ContentPillar)                           | `RedditPost`            | B                   |
| 124  | `$executeRawUnsafe` | `ALTER TABLE "RedditPost" ADD CONSTRAINT ...` (FK to OrchestratorRun)                         | `RedditPost`            | B                   |
| 127  | `$executeRawUnsafe` | `ALTER TABLE "RedditSafetyAudit" ADD CONSTRAINT ...` (FK to RedditPost)                       | `RedditSafetyAudit`     | B                   |
| 130  | `$executeRawUnsafe` | `ALTER TABLE "RedditPerformanceLog" ADD CONSTRAINT ...` (FK to RedditPost)                    | `RedditPerformanceLog`  | B                   |

**All 13 statements are static string literals. No template interpolation,
no user input.** Injection-safe by construction. The risk here is not
SQLi — it is **architectural**: schema migration via a public-route POST
handler bypasses Prisma Migrate entirely (see `.claude/rules/dev-environment.md`
§10: _"NEVER write raw SQL migrations by hand — use Prisma Migrate."_).

The probe at line 20 is also `$queryRawUnsafe` against `information_schema`
— harmless, but `$queryRaw\`...\`` (tagged) would have been the safer
default since the table name is constant.

The handler subsequently calls Prisma model APIs (`prisma.redditContentPillar.count()`,
`prisma.redditContentPillar.createMany(...)`, `prisma.redditSystemPrompt.create(...)`)
on lines 136, 138, 181, 183 — confirming the Reddit models DO exist in
`prisma/schema.prisma` (lines 1816, 1831, 1894, 1909, 1922, 1940). So the
migrate endpoint is filling a deployment gap: schema is in `schema.prisma`
but the production DB hasn't had `prisma migrate deploy` run against it.

#### Other files

No other raw SQL was found in `src/` or `app/`. `Prisma.sql\`...\``
tagged-template form: zero occurrences anywhere in the repo.

---

## Section C — Tables hit only by raw SQL (drift candidates)

| Table                                                                                                                           | Raw SQL site                                 | Prisma model?                                | Drift status                                                                                                                                                                                                                                                |
| ------------------------------------------------------------------------------------------------------------------------------- | -------------------------------------------- | -------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `compliance_events`                                                                                                             | `src/lib/compliance/events.ts:126`           | **NO**                                       | Documented drift. `.context/domain-models.md` "Known drift" §5: _"A future ADR will decide whether to promote to a first-class Prisma model or keep as raw SQL for append-only guarantees."_ MEMORY.md 2026-04-24 also lists this as a scheduled follow-up. |
| `RedditContentPillar`, `RedditOrchestratorRun`, `RedditPost`, `RedditSafetyAudit`, `RedditPerformanceLog`, `RedditSystemPrompt` | `app/api/reddit/migrate/route.ts` (13 sites) | **YES** (lines 1816–1940 of `schema.prisma`) | Not drift in the model sense; drift in the **migration discipline** sense — schema definition lives in Prisma but is being applied via `$executeRawUnsafe` in an HTTP handler instead of `prisma migrate deploy`.                                           |

Feed for the schema-drift agent's Section C: only **`compliance_events`**
qualifies as table-without-model drift. The Reddit tables are the
inverse — model-without-applied-migration.

---

## Section D — Injection risk findings

**No P0 injection risks were identified.**

Verified each invocation:

- `src/lib/compliance/events.ts:126` — uses `prisma.$executeRaw` tagged
  template. All 13 interpolations are typed values from
  `ComplianceEventInput` that have already been hashed (PII) or
  type-narrowed (unions/numbers/dates). Even `metadata` — the only
  open `Record<string, unknown>` — is JSON-stringified and bound as a
  parameter cast to `jsonb`, not concatenated into the SQL.
- `app/api/reddit/migrate/route.ts` (all 13 sites) — every SQL string
  is a static literal. No template variables, no interpolation, no
  user input flows into any of the queries. The handler does not even
  read `request.json()` / search params before issuing SQL.

**Lower-severity hygiene observation (not P0):** the migration handler
is reachable as an unauthenticated POST endpoint (no auth guard, no
HMAC, no admin role check visible in the file). While the SQL itself
is fixed, anyone who can hit the route can trigger DDL execution. If
the tables already exist the handler short-circuits at line 24, so the
blast radius is limited — but a future schema drift could allow
unintended re-runs. Recommend gating behind an admin token or deleting
outright (see Section E).

---

## Section E — Recommendations

### Category A — Compliance events (`src/lib/compliance/events.ts`)

**Disposition: leave as-is for now; resolve via the planned ADR.**

The raw SQL is intentional, parameterised, and minimal. The drift is
already tracked in `.context/domain-models.md` and `MEMORY.md` (Day 10
follow-up: _"Promote `compliance_events` from raw SQL to a first-class
Prisma model, or commit to raw SQL and write an ADR explaining the
append-only constraint."_). Two viable paths:

1. **Promote to Prisma model.** Add `ComplianceEvent` to
   `schema.prisma`, run `prisma migrate dev`, replace the
   `$executeRaw` block with `prisma.complianceEvent.create({ data })`.
   Lose the inline-cast safety of `::uuid` / `::jsonb` (would need
   Prisma `Json` type for metadata, `String @db.Uuid` for correlation_id).
2. **Formalise raw SQL.** Write an ADR documenting the append-only
   ledger design, add a CHECK constraint on the table to disallow
   UPDATE/DELETE at the DB level, keep the helper as the single
   write surface.

Either resolves the drift. Recommend (1) for typing consistency unless
the append-only DB-level guarantee is a hard counsel requirement.

### Category B — Reddit migrate endpoint (`app/api/reddit/migrate/route.ts`)

**Disposition: delete the route OR move to a Prisma migration.**

The file's own header says _"ONE-TIME MIGRATION ENDPOINT — Delete after
use"_. It is the textbook anti-pattern in `.claude/rules/dev-environment.md`
§10 (no hand-written raw SQL migrations).

Options, in preference order:

1. **(Preferred)** Run `prisma migrate dev --name add_reddit_orchestrator_models`
   locally to generate a proper SQL migration from the existing
   `schema.prisma` definitions, run `prisma migrate deploy` in
   production, then delete `app/api/reddit/migrate/route.ts`.
2. If a migration already exists in `prisma/migrations/` for these
   tables, the migrate endpoint is dead code — delete it.
3. If keeping it short-term as a deployment escape hatch, gate behind:
   admin auth (Supabase service role check), idempotent guard already
   present at line 24, and a `MIGRATION_ENDPOINTS_ENABLED` feature flag
   defaulting off. **Not recommended** — adds attack surface.

### Category C / D / E — n/a

No invocations in these categories.

### Cross-cutting hygiene

- Add a CI lint to fail the build on new `$executeRawUnsafe` /
  `$queryRawUnsafe` outside an allow-list. Current state is small
  enough that the allow-list is just `src/lib/compliance/events.ts`
  (and zero entries once the Reddit migrate route is removed).
- Document the compliance-events raw-SQL exception in
  `.claude/rules/` so future agents don't try to "fix" it by inlining
  a Prisma call (they'd need the model to exist first).

---

## Appendix — Methodology

- Searched `**/*.{ts,tsx,js,jsx}` under the repo for
  `\$(executeRaw|queryRaw|executeRawUnsafe|queryRawUnsafe)` and
  `Prisma\.sql\`` (zero matches for the latter).
- Read each hit in full with line context.
- Cross-referenced every target table against `prisma/schema.prisma`
  model declarations (78 models total — listed by line number in the
  audit working notes).
- Tests excluded from production-path counts but reported under
  Section A.

_End of audit._
