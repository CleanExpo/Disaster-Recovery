# Contributing to Disaster Recovery

> **NOT LEGAL ADVICE.** This file covers engineering workflow. Compliance
> obligations (ACL, CGA/FTA, APP, IICRC) are resolved in `/legal/**` and
> by counsel, not by the PR template.

Welcome. This file is the practical playbook for contributing to the
Disaster Recovery codebase. It is intentionally short — deeper context
lives in the links below.

## Repo layout (quick reference)

Canonical layout map is in `CLAUDE.md`. Highlights:

- `app/` — Next.js App Router. Pages, layouts, API routes under
  `app/api/**/route.ts`.
- `components/` — shared components. Feature-scoped folders under
  `components/contractor/`, `components/client/`, etc.
- `src/lib/validation/schemas.ts` — all Zod schemas. One source of truth
  for API contracts.
- `src/lib/observability/` — `captureException`, `captureMessage`,
  `requestLogger`, `clientLogger`. See ADR-005.
- `prisma/schema.prisma` — data model. See `.context/domain-models.md`
  for the concept → model mapping.
- `docs/adr/` — architectural decision records.
- `docs/how-to/` — practical playbooks.
- `.context/` — orientation docs for agents and contributors.
- `.claude/` — agent config, skills, rules.
- `UBIQUITOUS_LANGUAGE.md` — 29 canonical domain terms.
- `MEMORY.md` — living sprint + project log.

## Running locally

```bash
# Clone and install
git clone https://github.com/CleanExpo/Disaster-Recovery.git
cd Disaster-Recovery

# NOTE: --legacy-peer-deps is required. There is a known pre-existing
# peer conflict between @langchain/community and openai@5.x.
npm install --legacy-peer-deps

# Environment
cp .env.example .env.local
# fill in secrets as documented in .env.example

# Dev server
npm run dev

# Smoke tests
npm run test:smoke

# Type + lint + format checks (what CI runs)
npx tsc --noEmit
npm run lint
npx prettier --check .
```

Node 20 recommended. The CI workflow runs on `ubuntu-latest` with Node 20.

## Branch conventions

- Branch from `main`. Always.
- Branch name format: `<type>/<scope>-<short-description>` or
  `<type>/DR-<NNN>-<short-description>` for Linear-tracked work.
- Types: `feat | fix | docs | refactor | perf | test | build | ci |
  chore | revert | security`.

Examples:

- `feat/DR-724-pocock-skills-port`
- `fix/contractor-apply-fee-disclosure`
- `docs/foundation-polish8-richer-docs-and-adrs`

## Commit conventions

Conventional Commits, enforced by `commitlint` at the `commit-msg` hook.

Format: `<type>(<scope>): <subject>`

- Include the Linear ticket when one exists: `feat(api): DR-724 ...`.
- Subject is imperative, lowercase, no trailing full stop.
- Body explains **why**, not what (the diff shows what).
- Footer: `Refs DR-NNN` or `Closes DR-NNN` links Linear.

Example:

```
feat(api): DR-724 port Pocock five-skills framework

Adds grill-me, ubiquitous-language, improve-codebase-architecture,
design-an-interface, tdd skills to .claude/skills/ with en-AU +
Prisma + Next.js App Router adaptations.

Refs DR-724
```

See ADR-007 for CI and hook discipline.

## PR workflow

1. **Branch off `main`.** Never off another feature branch unless that
   branch is an explicit dependency (rare).
2. **Keep PRs focused.** One dimension improved per PR. Polish 8 (this
   file's context) is docs-only; it does not touch code.
3. **Rebase, don't merge, when updating.** `git pull --rebase origin main`.
   Merge commits in feature branches make bisecting painful.
4. **No direct pushes to `main`.** Branch protection is on. Even an
   admin should open a PR; the review is cheap and the audit trail is
   worth it.
5. **CI must be green.** Four hard gates: `tsc --noEmit`, `lint`,
   Playwright smoke, `prettier --check`. See ADR-007.
6. **At least one approver.** For compliance-touching work (consent,
   claim flow, voice pipeline, finance referral), prefer an approver
   who has worked that surface before.
7. **Title = Conventional Commit subject.** PR title follows the same
   format as the commit message. Squash-and-merge uses the PR title.

## Local hook bypass (`--no-verify`)

Acceptable **only** when:

- The hook itself is broken (infrastructure failure, not code failure),
  AND a follow-up commit to fix the hook will land within 24 hours.
- An emergency rollback is in flight and the fast-forward to a
  known-good commit must land now. Post-merge, open a retro issue.

Not acceptable:

- "My change doesn't need this check."
- "The test is flaky."
- "I'll fix the lint warning in a follow-up."

If a check is wrong, fix the check. See ADR-007.

## Reporting issues

- Engineering / product work → Linear board, DR-\* ticket.
- Security vulnerabilities → email the maintainer directly; do not open
  a public issue.
- Docs gaps → open a PR against the relevant file, or a Linear ticket
  if the scope is ambiguous.

## Code review expectations

- **Minimum one approver.** Two for anything in `/claim/**`,
  `prisma/schema.prisma`, `/api/voice/**`, `/api/compliance/**`, or
  `src/lib/observability/**`.
- **CI green is mandatory, not advisory.** A PR with red CI does not
  merge, period.
- **Comments on the "why", not the "what".** The reviewer should ask
  questions about intent and correctness; style lives in Prettier and
  ESLint.
- **Request changes liberally, approve carefully.** Once approved, the
  author can merge without a second look.
- **Respond to every comment.** "Done" is fine. Silent dismissal is
  not.

## en-AU throughout

This is an Australian product. Spelling is en-AU (organisation, colour,
behaviour, recognise, prioritise, emphasise, centre, metre). Dates are
DD/MM/YYYY. Currency is AUD. Time zones are AEST/AEDT. Examples are AUS
or NZ; never US.

## Where to read next

- `CLAUDE.md` — the agent + human entry point. Start here if you are
  new.
- `.context/domain-models.md` — domain concepts + Prisma mappings.
- `UBIQUITOUS_LANGUAGE.md` — 29 canonical terms.
- `docs/adr/` — every architectural decision with its reasoning.
- `docs/how-to/` — practical playbooks (add a new API route, add a
  feature flag, run a foundation sprint).
- `MEMORY.md` — what has shipped recently.
