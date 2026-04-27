# ADR-012: Supabase RLS — service-role-only posture

- **Status:** Proposed
- **Date:** 2026-04-27
- **Context:** Phase 1 schema-drift audit (PR #231) finding P1

## Context

Migration `prisma/migrations/20260409000000_supabase_rls_hardening/migration.sql` enables Row Level Security (RLS) on 10 tables but every `CREATE POLICY` statement is commented out (line 81+). The system works in production today only because the application connects with the Supabase `service_role` key, which bypasses RLS entirely.

Phase 1 audit (`docs/audits/supabase-prisma-drift-2026-04-27.md` §"P1.1") flagged this as a quiet risk: any code path that switches from the service-role key to the anon or authenticated keys would lock out everyone, since there are no policies to permit access.

## Decision drivers

1. **DR's access pattern is server-only.** All Supabase queries flow through Next.js API routes (App Router). No client-side direct query — Supabase JS isn't bundled to the browser.
2. **The voice agent and contractor portal authenticate users via Supabase Auth**, but their _data_ access still routes through API handlers using the service role.
3. **RLS at the row level is expensive to author + audit** — each table needs policies for every operation (SELECT/INSERT/UPDATE/DELETE) and every actor role. ~10 tables × 4 ops × ~3 roles = 120 policy statements. Authoring + testing is a 2-week effort. Maintenance is per-schema-change tax.
4. **Application-layer authz is already in place** — `src/middleware.ts` enforces auth + role on every protected path; admin routes have a 3-layer RBAC (middleware + layout + API helper).

## Two candidate paths

### Path A — Service-role-only (RECOMMENDED)

- Document explicitly that all DB access flows through the service-role key from server-side code.
- Drop the `ENABLE ROW LEVEL SECURITY` calls in the hardening migration (they are misleading — they imply policies exist).
- Replace with comments + a CHECK in CI that no client-side bundle imports `@supabase/supabase-js` with anon credentials for direct DB queries.
- Authorisation lives entirely in the application layer (middleware + route handlers).

**Pros:**

- Honest with the current architecture.
- Zero policy-authoring effort.
- One layer of authz to reason about (application).
- No silent breakage if someone adds a new table.

**Cons:**

- If a service-role key leaks, the entire database is exposed (no defence-in-depth).
- Auditors expecting "RLS enabled" tickbox compliance need a written justification.
- Future shift to direct browser-to-Supabase queries would require a full RLS retrofit.

### Path B — Full RLS with policies

- Implement `CREATE POLICY` for all 10 tables across SELECT/INSERT/UPDATE/DELETE.
- Continue using service-role from server-side; RLS is defence-in-depth.
- Add a CI test that asserts every table with RLS enabled has at least one policy.

**Pros:**

- Defence-in-depth — service-role key leak does not immediately expose all data (policies still gate per-row).
- Auditor-friendly tickbox.
- Future-proofs for direct browser queries.

**Cons:**

- 2-week initial authoring effort.
- Per-schema-change maintenance tax.
- Adds complexity for marginal benefit given DR's current architecture.
- Risk of bugs in policy logic causing legitimate access denials.

## Decision

**Adopt Path A — service-role-only.** This matches reality, removes the misleading "RLS enabled with no policies" state, and concentrates authorisation in the application layer where it is already implemented and tested.

If the architecture shifts toward direct browser-to-Supabase queries — or if an auditor specifically requires RLS — open a follow-up ADR proposing Path B.

## Implementation steps (separate PR)

1. New migration `<timestamp>_rls_service_role_posture/migration.sql` that:
   - `ALTER TABLE … DISABLE ROW LEVEL SECURITY` on each of the 10 tables.
   - Adds a `COMMENT ON TABLE …` documenting the service-role posture.
2. Delete the comment-only block in
   `20260409000000_supabase_rls_hardening/migration.sql` lines 81+ (the policy stubs).
3. Add a CI lint that fails if any client-side TypeScript file imports `createClient` from `@supabase/supabase-js` with the anon key for direct table queries.
4. Update `.claude/rules/privacy.md` §3 to document the service-role-only posture.
5. Update `docs/audits/schema-drift-phase-1-summary-2026-04-27.md` to mark this P1 as resolved.

## Consequences

- The application layer is the sole authorisation boundary. Every API route MUST validate the actor's permission before querying.
- Service-role key rotation becomes load-bearing — see `docs/security/ROTATION-VERIFIED-2026-04-24.md` for current rotation cadence.
- Any future feature requiring direct browser-to-Supabase queries triggers a new ADR.

## References

- Phase 1 audit P1.1 in `docs/audits/schema-drift-phase-1-summary-2026-04-27.md`
- Migration `prisma/migrations/20260409000000_supabase_rls_hardening/`
- `src/middleware.ts` — application-layer auth surface
- `.claude/rules/privacy.md` §3 — data-class taxonomy
- `docs/security/ROTATION-VERIFIED-2026-04-24.md` — service-role key rotation
