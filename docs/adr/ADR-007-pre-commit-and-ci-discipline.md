# ADR-007: Pre-commit and CI discipline

- **Status:** Accepted
- **Date:** 2026-04-24
- **Deciders:** Phill, Claude (Opus 4.7 1M)
- **Context:** Foundation Sprint Day 6 + Polish 3

## Context

Prior to the Foundation Sprint, the repo had no local git hooks and the
GitHub Actions workflow ran a narrow smoke test. Regressions slipped in
via large PRs — broken imports after a rename, stray `console.log` calls,
formatting drift across agents with different Prettier defaults, and
occasional commits that failed `tsc --noEmit` on `main`.

Three failure modes were recurring:

1. **Silent format drift.** Multiple contributors (and multiple LLMs)
   produced near-identical diffs with trailing-comma or quote-style
   differences. Review noise grew faster than substantive change.
2. **Type regressions on main.** A PR passed local checks because the
   author only built the page they edited; Next.js builds the whole app,
   so unrelated callers broke.
3. **Escape-hatch abuse.** `--no-verify` was used casually to bypass
   broken hooks rather than fix them, which defeated the purpose.

## Decision

### Local hooks (Day 6)

- **Husky** at `.husky/` with two active hooks:
  - `pre-commit` → `lint-staged` (runs ESLint `--fix` + Prettier on
    staged files only).
  - `commit-msg` → `commitlint` enforcing Conventional Commits with the
    DR project type list: `feat | fix | docs | refactor | perf | test |
    build | ci | chore | revert | security`.
- **lint-staged** config in `package.json`:
  - `*.{ts,tsx,js,jsx}` → `eslint --fix` + `prettier --write`.
  - `*.{json,md,yml,yaml}` → `prettier --write`.
- **Prettier config** at `.prettierrc.json` — single source of truth, no
  per-folder overrides.

### CI hard gates (Day 4, extended Polish 3)

Every PR must pass four checks before merge — all blocking, none advisory:

1. `npx tsc --noEmit` on the full tree.
2. `npm run lint` with zero errors (warnings allowed during migration;
   flipped to error in Polish 3 for all files touched after 2026-04-20).
3. `npm run test:smoke` — Playwright smoke suite covering homepage,
   `/claim`, contractor login, one location page, one guide.
4. `npx prettier --check .` — format enforcement at the CI boundary for
   contributors who skip local hooks.

CI jobs are parallel, cache `node_modules` on `package-lock.json` hash,
and run on `ubuntu-latest` with Node 20.

### Escape-hatch policy

`--no-verify` (and the equivalent PR-level "merge anyway" override) is
acceptable **only** when:

- The hook itself is broken (infrastructure failure, not code failure)
  AND a follow-up commit to fix the hook will land within 24 hours.
- An emergency rollback is in flight and the fast-forward to a known-good
  commit must land now. Post-merge, the author must open a retro issue.

Neither "my change doesn't need this check" nor "this test is flaky" is
an acceptable bypass reason. If a check is wrong, fix it.

## Consequences

**Positive.**

- Format drift dropped to zero immediately after Day 6 landed. Review
  diffs now show substantive change only.
- `main` has stayed green for every commit since the Polish 3 CI
  hardening. Previously we saw red `main` roughly once a week.
- Commit history became greppable — `git log --grep "feat(api):"` cleanly
  enumerates every API addition.

**Negative.**

- First-time contributors hit the commitlint barrier. Mitigated by the
  error message template (points at `CONTRIBUTING.md`) and by the agent
  commit skill that knows the pattern.
- Running Playwright smoke on every PR costs ~4 minutes. Accepted as the
  cheapest way to catch client-side regressions.

**Neutral.**

- Some generated files (schemas, OpenAPI specs) need `// prettier-ignore`
  blocks or `.prettierignore` entries. Documented in `CONTRIBUTING.md`.

## References

- `.husky/pre-commit`, `.husky/commit-msg`.
- `package.json` → `lint-staged` + `husky` sections.
- `.prettierrc.json`, `.prettierignore`, `.eslintrc.json`, `.eslintignore`.
- `.github/workflows/` — CI workflows.
- `CONTRIBUTING.md` → commit conventions + escape-hatch section.
- ADR-006 — Foundation Sprint outcomes.
- `.claude/rules/ci-discipline.md` — agent-facing short form of this ADR.
