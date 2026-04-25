# How-to: Run a Foundation Sprint (checklist)

Use this playbook if you acquire another codebase, inherit a neglected
one, or want to repeat the DR Foundation Sprint elsewhere. It
summarises the ten-day plan plus the eight polish PRs executed on this
repo between 2026-04-14 and 2026-04-24.

The sprint is the "Pathway C — Balanced Surge" option from ADR-006.

## Prerequisites

- A codebase that ships. Do not run this on greenfield.
- One human owner with decision authority for the sprint window.
- One primary agent (LLM) with access to the repo and the agent skill
  framework (see ADR-008).
- A scoring rubric. DR used six dimensions: infra, type safety,
  observability, testing, docs, DX. Score each 0–10 on day 1.

## Day-by-day plan (ten days)

### Day 1 — Inventory + scoring

- Read every top-level folder. Note what each one is for.
- Score each dimension against the rubric.
- Pick the three weakest dimensions as the sprint's primary targets.
- Output: a single `planning/foundation-sprint/day1-inventory.md`.

### Day 2 — Contract consolidation

- Find every input validation in the code. Consolidate into one
  `src/lib/validation/schemas.ts` (or equivalent).
- No inline schemas. No duplicate shapes across files.
- Output: all routes import from one file.

### Day 3 — Strict type mode

- Add `tsconfig.strict.json`. Run it against the full tree.
- Triage errors: plan staged rollout, not big-bang flip.
- Output: rollout ADR + ticket list.

### Day 4 — CI hard gates

- Add `tsc --noEmit`, `lint`, smoke test, `prettier --check` as
  blocking gates.
- Make every gate parallel and cacheable.
- Output: green CI on main for every commit.

### Day 5 — Observability surface (scaffold)

- Decide the public API (`captureException`, `captureMessage`,
  `setUser`, `setTag`, `requestLogger`).
- Stub every method. Ship the stubs. Call sites can start using the
  surface immediately.
- Output: one barrel at `src/lib/observability/index.ts`.

### Day 6 — Local hooks

- Husky + commitlint + lint-staged + Prettier.
- Conventional Commits enforced at `commit-msg`.
- Output: `.husky/` with two hooks; contributors can't skip format.

### Day 7 — Test scaffold

- Vitest for unit; Playwright for smoke. Wire both to CI.
- Write enough tests that regressions in the validation + observability
  + domain libraries become visible.
- Output: `npm test` green; `npm run test:smoke` green.

### Day 8 — Feature-flag hygiene

- List every flag. Remove dead flags. Rename off-pattern flags.
- Every remaining flag has an `.env.example` entry with a comment.
- Output: `.env.example` is the canonical flag catalogue.

### Day 9 — Observability implementation

- Wire the scaffold from Day 5 to a real backend (Sentry, Vercel,
  OTel, whatever matches the hosting platform).
- Expect to change providers once; build the surface such that the
  backend swap is one file.
- Output: errors and traces visible in the provider's UI.

### Day 10 — Docs reorganisation

- Rewrite `CLAUDE.md` (or equivalent agent entry point) as a short
  table of contents.
- Create `.context/domain-models.md` mapping concepts to data models.
- Create a `.claude/rules/` directory with crisp directives.
- Write the first three ADRs.
- Create `MEMORY.md` + `UBIQUITOUS_LANGUAGE.md` at repo root.
- Output: an agent can orient in under five minutes.

## Polish PR wave (days 11+)

Each polish PR lifts one dimension by 1–2 points. Land them one at a
time. No bundled changes. Revertable.

### Polish 1 — Strict TS expansion

Flip another folder (or another `tsconfig` option) into strict mode.
Fix the fallout. Commit.

### Polish 2 — API handler observability migration

Add try/catch + `captureException` to every `app/api/**/route.ts`
handler that doesn't have one. Use the Day 5 surface.

### Polish 3 — Dedup + CI hardening

Find duplicate utilities. Collapse. Flip CI gate severity from warning
to error where migration is complete.

### Polish 4 — Provider swap (if needed)

If Day 9's provider turns out wrong (DR swapped Sentry → Vercel native;
see ADR-005), swap now. The Day 5 surface makes this one file.

### Polish 5 — Client console migration

Every client-side `console.*` call becomes a structured `clientLogger`
call. Logs arrive in the observability provider, not the browser
devtools.

### Polish 6 — Unit test coverage

Write Vitest unit tests on the validation + observability + domain
libraries that Day 2 and Day 5 produced. Aim for 80%+ on each.

### Polish 7 — God-component decomposition

Pick the single largest component. Decompose into orchestrator + ≤200
line sub-components. Shared `types.ts`. See ADR-009 for the pattern.

### Polish 8 — Docs richness

Write more ADRs (one per polish that deserves permanent record).
Enrich `.context/domain-models.md` with state machines + diagrams +
drift. Add `CONTRIBUTING.md`. Add `docs/how-to/` playbooks.

## Checklist

- [ ] Day 1 inventory in `planning/`
- [ ] Day 2 validation consolidated
- [ ] Day 3 strict TS plan
- [ ] Day 4 CI hard gates green
- [ ] Day 5 observability surface shipped
- [ ] Day 6 local hooks active
- [ ] Day 7 test scaffold green
- [ ] Day 8 feature flags catalogued
- [ ] Day 9 observability wired
- [ ] Day 10 docs reorganised
- [ ] Polish 1 strict expanded
- [ ] Polish 2 API handlers migrated
- [ ] Polish 3 dedup + CI hardened
- [ ] Polish 4 provider swap (if needed)
- [ ] Polish 5 client logger migrated
- [ ] Polish 6 unit tests ≥80%
- [ ] Polish 7 largest god component decomposed
- [ ] Polish 8 docs 10/10

## When **not** to run this

- Pre-product-market-fit. You are optimising the wrong thing.
- During a hiring freeze with a single engineer and a shipping deadline.
- On a codebase that will be deprecated within six months.

## References

- ADR-006 — Foundation Sprint outcomes (the PR record of this sprint
  on DR).
- ADR-007 — CI discipline (Day 4 + Polish 3).
- ADR-008 — Pocock skills (pattern the sprint runs on).
- ADR-009 — God-component decomposition (Polish 7).
- `MEMORY.md` — DR's sprint log as a worked example.
