# ADR-002: Claim Shape — Single Source of Truth

**Status:** Accepted
**Date:** 2026-04-24
**Deciders:** Foundation Sprint Day 7-8 (PRs #105-106) + Day 10 documentation pass
**Supersedes:** prior ad-hoc TS interface duplication
**Related:** @.claude/rules/business-rules.md, @.context/domain-models.md,
@.claude/rules/dev-environment.md §10

---

## Context

Prior to the Foundation Sprint, the shape of a `Claim` was defined in
multiple places:

- `prisma/schema.prisma` (the DB model).
- `src/lib/validation.ts` (growing ad-hoc Zod schemas for some — not
  all — API routes).
- Three hand-written TypeScript interfaces scattered across
  `src/lib/claim-support-pack.ts`, the voice-agent tool types, and the
  client portal.

The three TS interfaces had drifted from each other and from the DB.
API routes sometimes validated input, sometimes didn't. A payload that
was valid at the edge could fail on Prisma write — and vice versa. The
voice agent's `capture_*` tools (DR-710) made this acute: the model
could emit a shape that no server layer actually trusted.

The Day 7-8 work (PRs #105-106) consolidated the API-layer Zod schemas
into `src/lib/validation.ts` and migrated routes to use them. It did
NOT delete the three legacy TS interfaces — those were marked with
`TODO` comments and left for a dedicated dedup follow-up to avoid a
gigantic mixed-concern PR.

## Decision

There are **two** sources of truth for the `Claim` shape, and exactly
two:

1. **DB truth: `prisma/schema.prisma`.**
   - The `Claim` model (and related `Enquiry`, `Lead`, `Job`,
     `Contractor*` models) is authoritative for columns, nullability,
     and relations.
   - Prisma-generated types are the ONLY safe way to type a Claim
     row coming out of the DB.

2. **API truth: `src/lib/validation.ts` (Zod).**
   - Every API route that accepts or returns Claim-shaped data MUST
     validate input with `claimSchema` (or a derived `.pick()` /
     `.partial()` / `.omit()`).
   - Every API route that returns Claim-shaped data MUST type the
     response using `z.infer<typeof claimSchema>`.
   - Routes that currently don't validate are a bug — migrate as
     encountered (tracked in @MEMORY.md).

When Prisma types and Zod types must be bridged, use the pattern in
`src/lib/validation.ts` (Zod `.passthrough()` + Prisma-derived type +
a narrow adapter). Do NOT re-declare the shape.

The three legacy TS interfaces (`src/lib/claim-support-pack.ts`, voice-
agent tool types, client portal) are acknowledged drifts. They have
TODO markers citing this ADR. Dedup is tracked as a follow-up; until
then, treat the legacy interfaces as READ-ONLY — never extend them.

## Consequences

**Enables:**
- API routes can be migrated to Zod validation without inventing new
  shapes — `src/lib/validation.ts` is the first place to look.
- Voice-agent tool outputs (DR-724) can be validated against the same
  Zod schema the web form uses, closing the capture-to-write trust gap.
- Prisma migrations + Zod schema bumps become a single reviewed change.

**Locks us into:**
- No shipping a fourth TS interface. If a new consumer needs a subset
  of Claim fields, it uses `.pick()` / `.omit()` on `claimSchema`.
- When Prisma + Zod disagree in review, Prisma wins (DB truth).
- Any refactor that changes Claim shape must touch BOTH Prisma migration
  AND `validation.ts`. They are a pair.

**Follow-up debt:**
- Dedup the three legacy TS interfaces (TODO markers in place).
- Migrate remaining legacy API routes that still skip validation.
- Extend the Zod registry to cover `Lead`, `Job`, `Contractor` at the
  API boundary (currently only `Claim`-adjacent is comprehensive).

## References

- PRs #105-106 (Day 7-8): Zod validation registry + route migration.
- `src/lib/validation.ts` — API-layer source of truth.
- `prisma/schema.prisma` — DB source of truth.
- @UBIQUITOUS_LANGUAGE.md — domain vocabulary.
- @.context/domain-models.md — extended lifecycle + shape descriptions.
- @MEMORY.md — tracks 3 legacy TS interface duplicates + 227 strict
  errors + 2 remaining smoke-test failures.
