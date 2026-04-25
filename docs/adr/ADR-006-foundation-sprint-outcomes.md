# ADR-006: Foundation Sprint outcomes (Pathway C — Balanced Surge)

- **Status:** Accepted
- **Date:** 2026-04-24
- **Deciders:** Phill, Claude (Opus 4.7 1M), Board (Session 25)
- **Context:** Foundation Sprint Polish 8 (final)

## Context

By early April 2026 the Disaster Recovery codebase had grown to ~1,200 pages,
a Prisma schema of 60+ models, three voice/claim flows, and a compliance
surface spanning ACL (AU) + CGA/FTA (NZ) + APP 3/8. The project had taken on
sufficient weight that ad-hoc contributions — human or agent — were starting
to regress existing invariants (canonicals, schema FAQs, typed request
bodies, observability surface).

Three pathways were evaluated at board level:

- **Pathway A — Freeze + refactor:** Halt feature work, rebuild tooling.
  High quality, zero shipping velocity. Rejected.
- **Pathway B — Status quo:** Keep shipping, accept drift. Cheap today,
  expensive on month 6. Rejected.
- **Pathway C — Balanced Surge:** Ten-day foundation sprint + rolling
  polish PRs while regular feature work continues on a separate track.
  Accepted.

## Decision

Execute a ten-day Foundation Sprint followed by a wave of smaller
"polish" PRs to push each foundation pillar from "present" to 10/10.

### Ten-day plan (Days 1–10)

1. **Day 1** — Repo inventory + scoring baseline (infra, type safety,
   observability, testing, docs, DX).
2. **Day 2** — Zod schema consolidation under `src/lib/validation/schemas.ts`.
   One source of truth for every API contract.
3. **Day 3** — `tsconfig.strict.json` + staged strict-mode rollout plan.
4. **Day 4** — CI hard gates: `tsc --noEmit`, `lint`, Playwright smoke,
   Prettier `--check`.
5. **Day 5** — Observability scaffold (API surface: `captureException`,
   `captureMessage`, `setUser`, `setTag`, `requestLogger`).
6. **Day 6** — Husky local hooks + commitlint + lint-staged.
7. **Day 7** — Test scaffold (Vitest unit + Playwright smoke wired to CI).
8. **Day 8** — Feature-flag hygiene sweep.
9. **Day 9** — Observability implementation (Sentry scaffold, later swapped —
   see ADR-005).
10. **Day 10** — Docs reorganisation: `CLAUDE.md` split, `.context/`
    landing, `.claude/rules/` crisp directives, first ADR trio,
    `MEMORY.md` at repo root, `UBIQUITOUS_LANGUAGE.md` capturing 29
    canonical terms (DR-724).

### Polish PR wave (Days 11+)

Each polish PR targets one dimension and lifts its score by 1–2 points
without bundling unrelated changes.

- **Polish 1** — Strict TS expansion.
- **Polish 2** — API console + try/catch + `captureException` migration
  across every `app/api/**/route.ts` handler.
- **Polish 3** — Dedup + CI hardening.
- **Polish 4** — Vercel-native observability swap (see ADR-005).
- **Polish 5** — Client-side `console.*` → structured `clientLogger`.
- **Polish 6** — Vitest unit tests on validation/observability/voice/
  compliance libs.
- **Polish 7** — `Step5HealthSafety` god-component decomposition
  (1210 lines → orchestrator + 10 sub-components; see ADR-009).
- **Polish 8** — Docs richness: four new ADRs, `CONTRIBUTING.md`,
  `docs/how-to/` playbooks, `.context/domain-models.md` enrichment,
  `MEMORY.md` + `CLAUDE.md` cross-links.

## Consequences

**Positive.**

- Documentation foundation reaches 10/10 without a single code change in
  Polish 8 — the docs PR can merge any day without CI risk.
- Every polish PR is independently revertable. The commit graph reads
  like a checklist: one dimension improved per PR.
- Agents (human or LLM) arriving cold can orient in under five minutes
  via `CLAUDE.md` → `.context/domain-models.md` → relevant ADR.

**Negative.**

- Sprint consumed roughly eight working days of Phill's attention.
  Feature velocity on unrelated Linear tickets paused.
- Polish PRs created review fatigue — eight sequential docs/refactor PRs
  to land in a fortnight.

**Neutral.**

- Scoring rubric is subjective. The 10/10 target was a forcing function,
  not a measurable truth; the rubric lives in `planning/` for calibration
  if the approach is repeated on another codebase.

## References

- `planning/foundation-sprint/` — original 10-day plan + daily reports.
- ADR-002 through ADR-009 in this directory.
- `docs/how-to/run-the-foundation-sprint-checklist.md` — playbook to
  repeat the sprint on another codebase.
- `CLAUDE.md` table of contents — entry point for agents.
- `.context/domain-models.md` — canonical domain terms + Prisma mappings.
- `UBIQUITOUS_LANGUAGE.md` at repo root — 29 canonical terms (DR-724).
- `MEMORY.md` at repo root — living log of sprint and post-sprint work.
