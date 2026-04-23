# MEMORY.md — Disaster Recovery (repo-scoped)

> Repo-level memory. Captures the architectural decisions, known drifts,
> and open debt that persist across Claude Code sessions.
>
> This is SEPARATE from Phill's user-level MEMORY.md at
> `~/.claude/projects/C--Disaster-Recovery/memory/MEMORY.md` — do not
> conflate the two. This file is checked into git; that one is not.

*Last updated: 2026-04-24 (Foundation Sprint Day 10).*

---

## 1. Project identity

- **Legal entity:** National Restoration Professionals Group Pty Ltd (NRPG).
- **Consumer brand:** Disaster Recovery Australia.
- **Model:** network orchestrator — IICRC-certified contractors do the
  work and bill clients directly. See @.claude/rules/business-rules.md.
- **Language:** Australian English (en-AU) throughout. See
  @.claude/rules/australian-english.md.
- **Stack:** Next.js 15 App Router + Prisma (Supabase Postgres) + Zod +
  Tailwind + Stripe Checkout + Twilio voice.

## 2. Architectural anchors (persist across sessions)

- @CLAUDE.md — scan-first project anchor.
- @UBIQUITOUS_LANGUAGE.md — canonical domain vocabulary (29 terms, DR-724).
- @.context/domain-models.md — extended domain descriptions.
- @docs/adr/ADR-001-gemma4-multilingual.md — translation architecture.
- @docs/adr/ADR-002-claim-shape-single-source-of-truth.md — Prisma +
  Zod as the two-and-only sources of truth for Claim shape.
- @docs/adr/ADR-003-voice-agent-consent-and-data-boundary-model.md —
  Sarah's 5-layer closed-world + consent model.
- @docs/adr/ADR-004-feature-flag-strategy.md — `NEXT_PUBLIC_*_ENABLED`
  convention + zero-impact-when-off rule + rollback via env flip.

## 3. Known drifts + open debt

- **227 strict TS errors** (post DR-Day-4 `useUnknownInCatchVariables`).
  Hard CI gate is ON for NEW code; legacy errors tracked for gradual
  cleanup. Do NOT disable the gate.
- **3 legacy TS claim interfaces** still duplicate the Claim shape
  (see ADR-002). TODO markers in place; dedup is a separate follow-up.
- **Cohort-only TDD siblings** — some test files cover only the happy
  path; sibling coverage is incomplete. Add cases as encountered.
- **2 remaining smoke-test failures** — tracked under
  `fix(smoke): Day 3 PR 2` (commit `8fe73e58`). Non-blocking; do not
  ship new smoke regressions.
- **Stale .md docs** (`CORE_Analysis_for_NRP.md`,
  `NRP_CRM_Architecture_Analysis.md`, etc.) — historical research.
  Not rendered; leave alone unless cleaning up.
- **`page-enhanced.tsx`** and `r6-demo/*` — dead files kept for now.
  Do not touch in unrelated PRs.
- **UBIQUITOUS_LANGUAGE.md not yet on main** — lives on feat/DR-724.
  Day 10 docs reference it anticipatively; once that PR merges, the
  references work.
- **Feature flag hot-check audit** — TODO per ADR-004: grep
  `NEXT_PUBLIC_*_ENABLED` for import-time evaluation.

## 4. Release + deploy state

- **Production URL:** `https://disasterrecovery.com.au`.
- **Vercel project:** Disaster-Recovery (CleanExpo org).
- **Deploy branch:** `main`. Preview deploys on every PR.
- **Authoritative build:** Vercel. If local passes and Vercel fails,
  Vercel wins — investigate there.
- **CI:** gitleaks + typecheck + lint + Prettier + Playwright smoke,
  all green required before merge.
- **Husky pre-commit:** Prettier + lint-staged + commitlint + typecheck
  (DR-Day-6).

## 5. Ticket conventions

- Linear format: `DR-<number>` (e.g. DR-724).
- Foundation Sprint (Pathway C) was internal; scope lives under
  `../DR-Sandbox-starter/proposals/`.
- Commit prefix: `<type>(<scope>): <subject>` — enforced by
  commitlint. Common scopes: `foundation`, `claim`, `voice`,
  `contractor`, `seo`, `compliance`, `observability`.

## 6. Never re-introduce

- "Insurance approved" / "bill your insurer" / "guaranteed approval" /
  "every insurer" — see @.claude/rules/compliance.md §1.
- A fourth Claim shape — see ADR-002.
- `--no-verify` commits or `git amend` past a failed hook — see
  @.claude/rules/dev-environment.md §7.
- PII into AI prompts without the minimise-PII layer — see
  @docs/adr/ADR-001-gemma4-multilingual.md + @.claude/rules/privacy.md.
- A 6th Sarah tool without a new ADR and fresh threat model — see
  ADR-003.

## 7. Session hygiene

- `grep` / `glob` before `read`.
- Subagents for research touching >2 files.
- `/compact` at milestones; `/clear` between unrelated tasks.
- Line-range reads on any file >500 lines.

## 8. Foundation Sprint — Pathway C summary

- **Day 0** — Security triage + gitleaks CI (`efb1fd5a`, `4c296bad`).
- **Day 3** — Smoke-test failures fixed (`8fe73e58`).
- **Day 4** — Strict TS gate (`useUnknownInCatchVariables`) (`dc37a0d4`).
- **Day 6** — Husky + Prettier + commitlint + lint-staged (`d8a4f6a6`).
- **Day 7-8** — Shared Zod validation registry (`d8069c97`).
- **Day 9** — Observability (request logger + Sentry + compliance
  events in 5 core flows) (`a646205a`).
- **Day 10** — Context engineering (this commit).

Upstream PRs: #101 to #107 + DR-Sandbox-starter #28.

---

## References

- @CLAUDE.md (live project anchor — always start here)
- @.claude/rules/ (rule files by topic)
- @docs/adr/ (decisions by date)
- @docs/history/brand-and-history.md (archive)
