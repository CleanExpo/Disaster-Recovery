# CLAUDE.md — Disaster Recovery

Behavioural guidelines to reduce common LLM coding mistakes. Merge with project-specific instructions as needed.

**Tradeoff:** These guidelines bias toward caution over speed. For trivial tasks, use judgment.

## Table of contents

- `.context/domain-models.md` — domain concepts, Prisma mappings, state
  machines, known drift.
- `UBIQUITOUS_LANGUAGE.md` — 29 canonical terms (DR-724).
- `CONTRIBUTING.md` — repo layout, branch + commit conventions, PR
  workflow, escape-hatch policy.
- `MEMORY.md` — living sprint + project log.
- `docs/adr/` — architectural decision records:
  - ADR-001 — Gemma 4 multilingual translation.
  - ADR-005 — Vercel-native observability.
  - ADR-006 — Foundation Sprint outcomes.
  - ADR-007 — Pre-commit + CI discipline.
  - ADR-008 — Pocock five-skills framework adoption.
  - ADR-009 — God-component decomposition pattern.
- `docs/how-to/` — practical playbooks:
  - `add-a-new-api-route.md`
  - `add-a-new-feature-flag.md`
  - `run-the-foundation-sprint-checklist.md`
- `.claude/rules/` — crisp agent-facing directives (short form of the
  ADRs above).

## 1. Think Before Coding

**Don't assume. Don't hide confusion. Surface tradeoffs.**

Before implementing:

- State your assumptions explicitly. If uncertain, ask.
- If multiple interpretations exist, present them - don't pick silently.
- If a simpler approach exists, say so. Push back when warranted.
- If something is unclear, stop. Name what's confusing. Ask.

## 2. Simplicity First

**Minimum code that solves the problem. Nothing speculative.**

- No features beyond what was asked.
- No abstractions for single-use code.
- No "flexibility" or "configurability" that wasn't requested.
- No error handling for impossible scenarios.
- If you write 200 lines and it could be 50, rewrite it.

Ask yourself: "Would a senior engineer say this is overcomplicated?" If yes, simplify.

## 3. Surgical Changes

**Touch only what you must. Clean up only your own mess.**

When editing existing code:

- Don't "improve" adjacent code, comments, or formatting.
- Don't refactor things that aren't broken.
- Match existing style, even if you'd do it differently.
- If you notice unrelated dead code, mention it - don't delete it.

When your changes create orphans:

- Remove imports/variables/functions that YOUR changes made unused.
- Don't remove pre-existing dead code unless asked.

The test: Every changed line should trace directly to the user's request.

## 4. Goal-Driven Execution

**Define success criteria. Loop until verified.**

Transform tasks into verifiable goals:

- "Add validation" → "Write tests for invalid inputs, then make them pass"
- "Fix the bug" → "Write a test that reproduces it, then make it pass"
- "Refactor X" → "Ensure tests pass before and after"

For multi-step tasks, state a brief plan:

```
1. [Step] → verify: [check]
2. [Step] → verify: [check]
3. [Step] → verify: [check]
```

Strong success criteria let you loop independently. Weak criteria ("make it work") require constant clarification.

---

## 0. Where things live (read the right file first)

| Topic                             | File                                                 |
| --------------------------------- | ---------------------------------------------------- |
| Domain vocabulary                 | @UBIQUITOUS_LANGUAGE.md + @.context/domain-models.md |
| Business rules (billing, quoting) | @.claude/rules/business-rules.md                     |
| Compliance (ACL, APP, AML/CTF)    | @.claude/rules/compliance.md                         |
| Australian English (spelling)     | @.claude/rules/australian-english.md                 |
| Privacy + data classes            | @.claude/rules/privacy.md                            |
| Dev environment quirks            | @.claude/rules/dev-environment.md                    |
| Architectural decisions (ADRs)    | @docs/adr/                                           |
| Project memory (drifts, debt)     | @MEMORY.md                                           |
| History + brand notes             | @docs/history/brand-and-history.md                   |

If a rule used to live in CLAUDE.md and isn't here now, it moved to one of those files — nothing was deleted.

---

## 1. Project identity

- **Legal entity:** National Restoration Professionals Group Pty Ltd (NRPG)
- **Consumer brand:** Disaster Recovery
- **Model:** Network-orchestrator — DR does NOT do restoration work; IICRC-certified contractors do, and they bill the client directly.
- **Geography:** Australia + New Zealand
- **Language:** Australian English, always — see @.claude/rules/australian-english.md

## 2. Tech stack

| Layer         | Choice                                                                                                                                                                          |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Framework     | Next.js 15 (App Router)                                                                                                                                                         |
| Language      | TypeScript (strict, `useUnknownInCatchVariables` on — DR-Day-4)                                                                                                                 |
| DB            | PostgreSQL (Supabase) via Prisma ORM                                                                                                                                            |
| Validation    | Zod (shared registry at `src/lib/validation.ts` — single API source)                                                                                                            |
| Auth          | Supabase Auth + custom contractor-auth adapter                                                                                                                                  |
| Styling       | Tailwind CSS + Antigravity design system (`src/styles/*.css`)                                                                                                                   |
| Payments      | Stripe Checkout (DR-586/712 flag-gated)                                                                                                                                         |
| Voice         | Twilio + custom Sarah agent (DR-706/709/710/724, flag-gated)                                                                                                                    |
| Deploy        | Vercel (authoritative — Vercel wins over local builds)                                                                                                                          |
| Observability | Vercel-native (`@vercel/otel` + Web Analytics + Speed Insights + Log Drains per ADR-005) — `captureException` lives in `src/lib/observability/vercel.ts`. We do NOT use Sentry. |
| CI gates      | Husky + Prettier + commitlint + lint-staged + typecheck + gitleaks                                                                                                              |

## 3. Commands

```bash
# Install (peer conflict workaround — see dev-environment.md)
npm install --legacy-peer-deps

# Dev
npm run dev             # Next.js dev server

# Build / prod
npm run build
npm run start

# Database
npm run prisma:generate
npm run prisma:migrate
npm run db:studio

# Tests
npm run test:e2e        # Playwright
npm run test:e2e:ui
npm run lint            # Next lint + typecheck gate
npm run check:scripts   # verify all scripts resolve
```

## 4. File map (where to look)

```
/app                        Next.js App Router pages + API routes
  /api                      API handlers (each MUST log compliance_events)
  /contractor               Contractor portal (login/apply/dashboard/portal)
  /client-portal            Client-side claim + docs portal
  /claim                    Public claim-intake flow (canonical entry)
  /locations/[city]/…       1,152+ generated location pages
  /services/…               ~129 service pages (hero + CTA imagery)
  /guides                   49 long-form SEO guides
/src
  /components               Shared UI (React)
    /antigravity            Design-system components
    /seo                    Schema, breadcrumb, video-embed helpers
  /lib
    validation.ts           Zod schemas — API-layer source of truth
    constants.ts            NAP, GBP_PLACE_ID, tokens
    /compliance             compliance_events logger + redaction
    /ai                     Sarah prompt, topic classifier, 5-tool surface
  /styles                   antigravity-design-system.css etc.
/prisma
  schema.prisma             DB source of truth
  /migrations
/data
  /locations                Per-city JSON (Melbourne, Perth, Adelaide, Brisbane…)
  /suburbs                  Gitignored — use `git add -f` when adding
  /seo/video-config.ts      16 planned videos
/docs
  /adr                      Architectural Decision Records
  /history                  Brand + history archive
/.context
  domain-models.md          Extended domain descriptions
/.claude
  /rules                    compliance, au-english, privacy, biz, dev-env
  /skills                   Matt Pocock skills (DR-724)
  /config /scripts          hook + harness config
```

## 5. Architectural rules (the hard ones)

### 5.1 Claim shape — single source of truth

- **DB truth:** `prisma/schema.prisma` (`Claim`, `Enquiry`, `Lead`, `Job`, `Contractor` models).
- **API truth:** `src/lib/validation.ts` (Zod). Every API route MUST validate input/output via this registry.
- 3 legacy TS interfaces still duplicate claim shape. They have TODO markers; dedup is a separate follow-up. See @docs/adr/ADR-002-claim-shape-single-source-of-truth.md.
- NEVER invent a fourth shape. Add to `src/lib/validation.ts` or extend Prisma — don't ship a new type-file.

### 5.2 Voice agent — closed-world + consent-gated

- Sarah voice agent is a CLOSED-WORLD system: specific prompt + 5-tool surface + HMAC auth + output filter + 5-layer kill switch.
- First caller utterance after pickup MUST be the APP 8 consent prompt (see `compliance.md`).
- All voice flows are flag-gated (`NEXT_PUBLIC_VOICE_AGENT_ENABLED`); off by default in prod.
- See @docs/adr/ADR-003-voice-agent-consent-and-data-boundary-model.md.

### 5.3 Feature flags — convention

- Name: `NEXT_PUBLIC_<FEATURE>_ENABLED` — reads as `'true'` only.
- Default: OFF. Flag-gated code MUST be zero-impact when the flag is off.
- Kill switches are SEPARATE from feature flags (see `privacy.md` for the voice 5-layer kill switch).
- Rollback = flip the env var in Vercel. No redeploy needed.
- See @docs/adr/ADR-004-feature-flag-strategy.md.

### 5.4 Observability + compliance events

- Every API route that mutates state logs to `compliance_events` (structured, redacted, retention-tagged).
- PII MUST pass through `src/lib/compliance/*` redactor before hitting logs.
- Vercel observability is in place (per ADR-005, NOT Sentry); call `captureException` from `src/lib/observability/vercel.ts` and fill OTel span attributes / log-drain payloads — never raw PII.

### 5.5 Prohibitions (non-negotiable)

- Do NOT create a fourth claim shape.
- Do NOT send PII into AI prompts without the minimise-PII layer (see ADR-001).
- Do NOT write US English ANYWHERE. See `.claude/rules/australian-english.md`.
- Do NOT write the phrases "insurance approved", "bill your insurer", "guaranteed approval", "every insurer", "fastest response". See `.claude/rules/compliance.md` for the full banned-phrases list.
- Do NOT commit secrets. Gitleaks CI will catch it; don't rely on that.
- Do NOT push to `main` on any repo. PRs only.
- Do NOT skip git hooks (`--no-verify`) without explicit user instruction.
- Do NOT `git amend`; always create NEW commits.

## 6. How to navigate this codebase

1. **New feature?** Start in @.claude/rules/business-rules.md (is it legal?), then @UBIQUITOUS_LANGUAGE.md (name it right), then `src/lib/validation.ts` (shape it right).
2. **Bug fix?** Check @MEMORY.md for known drifts first — might already be documented.
3. **New page?** Read @.claude/rules/australian-english.md + @.claude/rules/compliance.md before writing copy.
4. **API route?** Must: Zod-validate, log to compliance_events, use the shared request logger, return stable error shape.
5. **Touching the claim flow?** Read @docs/adr/ADR-002 first.
6. **Touching voice (Sarah)?** Read @docs/adr/ADR-003 first. No exceptions.
7. **Location pages?** See @MEMORY.md for the Next.js redirect negative-lookahead trap.

## 7. Default stance for agents

- Simplest viable option first. AUS/NZ examples only (never US).
- `grep`/`glob` before `read`. Line-range reads only on large files.
- Prefer editing existing files over creating new ones.
- Never proactively create docs (`.md`, READMEs) unless asked.
- Never use emojis in code or docs unless explicitly requested.
- When a rule here conflicts with older scattered docs, THIS FILE wins — raise an ADR if the rule itself should change.

## 8. Session discipline

- `/compact` at milestones, `/clear` between unrelated tasks.
- Subagents for anything research-heavy touching >2 files.
- Every commit: Prettier + lint-staged + typecheck + commitlint (all enforced via Husky — DR-Day-6).
- PR title format: `<type>(<scope>): <subject>` (commitlint-enforced).

## 9. Relationships

- **Disaster-Recovery** (this repo) — the production monolith.
- **DR-Sandbox-starter** — proposals + research scratchpad; safe to experiment.
- **NRPG-Onboarding-Framework** — contractor training content (markdown-only until DR-682 stands up the Next.js app). See its own `CLAUDE.md`.

## 10. When in doubt

Re-read this file. If the answer still isn't here, check @MEMORY.md, then the relevant ADR, then ask. Don't guess on compliance, privacy, billing, or voice.

---

_Last rewritten: 2026-04-24 (Foundation Sprint Day 10 — context engineering).
Prior version (65-line generic scaffold) archived in git history at parent commit._
