@../Unite-Hub/.portfolio/PORTFOLIO.yaml

<!--
  RECONSTRUCTED 2026-06-15.
  The previous CLAUDE.md was ~51% destroyed by a Windows generation tool that
  baked U+FFFD replacement characters into the file (4040 of them) — the same
  systemic UTF-8 corruption fixed in Synthex. The prose under the corrupted
  sections was overwritten and is unrecoverable.

  This file was rebuilt by: (a) preserving every surviving CLEAN line verbatim,
  and (b) reconstructing the destroyed sections ONLY from this repo's real
  conventions — `.claude/rules/**`, `package.json`, `.npmrc`, the live
  `app/`, `src/`, `prisma/`, `docs/adr/` trees, `MEMORY.md`, and the portfolio
  registry. Where original intent was unrecoverable, accurate repo-reality
  content was written rather than a guess.

  This repo has NO CONSTITUTION.md. The detailed rule files in
  `.claude/rules/**` and the ADRs in `docs/adr/` are the source of truth; this
  file is the index/anchor. If this file conflicts with a rule file or an ADR,
  the rule file / ADR wins — raise an ADR if the rule itself should change.
-->

## Identity (SSOT)
**Canonical name:** Disaster-Recovery
**Aliases:** "DR", "Disaster Recovery"
**Canonical local path:** `D:\Disaster-Recovery`
**GitHub:** `CleanExpo/Disaster-Recovery`

> Registry: see `D:\Unite-Hub\.portfolio\PORTFOLIO.yaml` (single source of truth)

---

# CLAUDE.md — Disaster Recovery

Behavioural anchor for this repo. It does NOT duplicate the detailed rules —
it points you to the right file. The deep rules live in `.claude/rules/**`,
the decisions live in `docs/adr/`, and the running log lives in `MEMORY.md`.

- `.claude/rules/**` — the hard rules (compliance, Australian English,
  privacy, business model, dev environment). Non-negotiable.
- `docs/adr/**` — Architecture Decision Records. The "why" behind the
  structure. Read the relevant ADR before touching the area it governs.
- `MEMORY.md` — living sprint + project log, newest entry at the top.

---

## 0. Where things live (read the right file first)

| Topic                                | File                                              |
| ------------------------------------ | ------------------------------------------------- |
| Compliance / legal (banned phrases)  | @.claude/rules/compliance.md                      |
| Business model / who-bills-who       | @.claude/rules/business-rules.md                  |
| Privacy / data classification        | @.claude/rules/privacy.md                         |
| Australian English (spelling)        | @.claude/rules/australian-english.md              |
| Dev environment / build quirks       | @.claude/rules/dev-environment.md                 |
| Architecture decisions               | @docs/adr/ (ADR-001 … ADR-014)                    |
| Claim shape (single source of truth) | @docs/adr/ADR-002-claim-shape-single-source-of-truth.md |
| Voice agent (Sarah) consent model    | @docs/adr/ADR-003-voice-agent-consent-and-data-boundary-model.md |
| Data models (lifecycles)             | @.context/domain-models.md, `prisma/schema.prisma` |
| Living sprint log                    | @MEMORY.md                                         |

If a rule used to live in CLAUDE.md and isn't here now, it moved to one of those files — nothing was deleted.

---

## 1. Project identity

- **Purpose:** DR consumer product — the public-facing claim-intake and
  contractor-network site (per the portfolio registry).
- **Model:** Network-orchestrator — DR does NOT do restoration work; IICRC-certified
  contractors do the restoration and bill the client directly. DR provides the
  platform and routes work; it does not bill on behalf of anyone and does not
  hold client funds. One-sentence version and the full who-bills-who table
  live in @.claude/rules/business-rules.md.

| Aspect        | Reality                                                                  |
| ------------- | ------------------------------------------------------------------------ |
| Framework     | Next.js 15 (App Router, `app/`) + React 18                               |
| Language      | TypeScript 5 (strict rollout — see @MEMORY.md for the open strict debt)  |
| Styling       | Tailwind CSS + Antigravity design system (`src/styles/*.css`)            |
| Data, DB      | Prisma 5 (`@prisma/client`) → Supabase Postgres (RLS — see ADR-012)      |
| Auth          | NextAuth (`next-auth` v4)                                                |
| Validation    | Zod registry — `src/lib/validation.ts` (API-layer source of truth)       |
| AI / voice    | Sarah voice agent (Twilio + ElevenLabs); providers via `src/lib/ai/*` (ADR-001) |
| Payments      | Stripe (CONTRACTOR payments only; flag-gated `NEXT_PUBLIC_STRIPE_ENABLED`) |
| Deploy        | Vercel (authoritative — Vercel wins over local builds)                   |
| CI            | typecheck + lint + prettier + smoke + build; Husky pre-commit (ADR-007)  |

```bash
# Install (peer conflict is expected — see .npmrc / dev-environment.md §2)
npm install --legacy-peer-deps

# Dev
npm run dev              # Next dev server
npm run build            # prisma generate + partytown copylib + next build
npm run lint             # Next lint
npx tsc --noEmit         # typecheck (hard CI gate)
npm test                 # vitest run
npm run test:e2e         # playwright
```

### Repository layout (the parts that matter)

```
/app                        Next.js App Router pages + API routes
  /api                      API handlers (each MUST log compliance_events)
  /claim                    Canonical claim-intake web form
  /contractor/apply         Contractor application + onboarding surfaces
  /locations/[city]/…       ~1,152 long-form location SEO guides
/src
  /components               Shared UI (React)
  /lib                      Domain logic
    /validation.ts          Zod registry — API-layer source of truth
    /compliance             compliance_events logger + PII redactor
    /ai                     Sarah prompt, topic classifier, 5-tool surface
    /constants.ts           canonical labels (certs, counsel@, etc.)
  /styles                   Tailwind + Antigravity CSS
  /config /scripts          hook + harness config
/prisma                     schema.prisma — source of truth for DB models
/docs/adr                   Architecture Decision Records (ADR-001 … ADR-014)
/.claude/rules              compliance, au-english, privacy, biz, dev-env
/.claude/skills             Matt Pocock skills (DR-724)
```

---

## 2. Think Before Coding

**Don't assume. Don't guess.** State assumptions explicitly. If uncertain, ask.

- If multiple interpretations exist, present them — don't silently pick one.
- Match the existing code style, even if you'd do it differently.
- If you notice unrelated dead code, mention it — don't delete it.
- Transform tasks into verifiable steps before writing code.
- Don't claim something is done until it's verified (lint + typecheck + tests
  + commitlint all green — enforced via Husky, see ADR-007 and
  @.claude/rules/dev-environment.md §7). When in doubt, stop and ask for
  clarification rather than guessing.

---

## 5. Architectural rules (the hard ones)

### 5.1 Claim shape — single source of truth
- The canonical claim shape is defined once. Do NOT create a fourth claim
  shape. See @docs/adr/ADR-002-claim-shape-single-source-of-truth.md.
- **API truth:** `src/lib/validation.ts` (Zod). Every API route MUST validate input/output via this registry.

### 5.2 Voice agent (Sarah)
- The first caller utterance after pickup MUST be the APP 8 consent prompt
  (canonical wording in @.claude/rules/compliance.md §3).
- All voice flows are flag-gated (`VOICE_AGENT_ENABLED` — server-only, NO
  `NEXT_PUBLIC_` prefix; off by default in prod) behind a 5-layer kill switch.
- Closed-world, 5-tool surface only; Sarah writes, never reads back. See
  @.claude/rules/privacy.md §4 and
  @docs/adr/ADR-003-voice-agent-consent-and-data-boundary-model.md.

### 5.3 Feature flags
- Name: `NEXT_PUBLIC_<FEATURE>_ENABLED`; read as the string `'true'` only;
  default OFF. Flag-gated code MUST be zero-impact when the flag is off.
- Rollback = flip the env var + redeploy the same commit. See
  @.claude/rules/dev-environment.md §5 and @docs/adr/ADR-004-feature-flag-strategy.md.

### 5.4 Compliance + observability
- Every state-mutating API route appends to `compliance_events` (structured,
  redacted, retention-tagged). NEVER delete rows from it. See
  @.claude/rules/compliance.md §9 and @docs/adr/ADR-013.
- PII MUST pass through the `src/lib/compliance/*` redactor before hitting
  logs or an AI prompt. Never log raw PII.

### 5.5 Prohibitions (non-negotiable)
- Do NOT create a fourth claim shape.
- Do NOT send PII into AI prompts without the minimise-PII layer (see ADR-001).
- Do NOT write US English ANYWHERE. See `.claude/rules/australian-english.md`.
- Do NOT reintroduce a banned compliance phrase — see @.claude/rules/compliance.md §1.
- Do NOT reintroduce the Path B escrow / Stripe-Connect surface — removed in
  the ADR-014 Path A cutover.
- Do NOT push to `main` directly, and never `--no-verify` past a failed hook.
  Sandbox-first; PR required for prod.

---

## 7. How to navigate this codebase

1. **New feature?** Start with @.claude/rules/business-rules.md (is it legal /
   in-model?), then name it right (ubiquitous language — DR-724).
2. **New API route?** It MUST validate via `src/lib/validation.ts` and log to
   `compliance_events`. See @docs/how-to/add-a-new-api-route.md.
3. **New feature flag?** See @docs/how-to/add-a-new-feature-flag.md.
4. **Touching the claim flow?** Read @docs/adr/ADR-002 first.
5. **Touching voice (Sarah)?** Read @docs/adr/ADR-003 first.

If a rule here conflicts with older scattered docs, THIS FILE wins — and if
this file conflicts with a `.claude/rules/**` file or an ADR, that file wins.
Raise an ADR if the rule itself should change.

---

## 8. Session discipline

- `/compact` at milestones, `/clear` between unrelated tasks.
- Verify before you call it done: lint + typecheck + tests + commitlint
  (all enforced via Husky — see ADR-007 / dev-environment.md §7).
- PR title + commit format: `<type>(<scope>): <subject>` (commitlint-enforced).
  Types: `feat`, `fix`, `docs`, `refactor`, `test`, `perf`, `chore`,
  `security`, `style`. See @.claude/rules/dev-environment.md §8.

---

## 9. Relationships

- **Disaster-Recovery** (this repo) — the production consumer product / monolith.
- **DR-Sandbox** — the `sandbox` branch + `disaster-recovery-sandbox` Vercel
  project for safe pre-prod work (sandbox-first workflow per the registry).
- **DR-NRPG** (`CleanExpo/DR-NRPG`) — the separate NRPG contractor platform.

> Registry of all related repos, Vercel projects, and branches:
> `D:\Unite-Hub\.portfolio\PORTFOLIO.yaml` (single source of truth).
