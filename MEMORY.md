# MEMORY.md — Disaster Recovery

Living sprint + project log. Newest entry at the top. Keep under
200 lines; archive older entries into `planning/memory-archive/`.

## 2026-04-26 — Voice agent web-widget production surface

**Outcome:** voice agents (Sarah/Tannika + Olivia) now ship to production
via in-browser ElevenLabs convai widget, NOT Twilio. Twilio scaffolding
remains in repo for future use; no signup required to operate.

### What landed

- **Olivia** (`agent_7401kq4k2xd9ep9rbsngfy40jp60`) — new contractor
  onboarding voice agent. Voice "Olivia" from EL voice library
  (voiceId `ChvixV5Kt063KajV05qE`). Published live in EL dashboard.
- **Tannika/Sarah** v2 system prompt + first message published live
  in EL dashboard (PR #203 + manual deploy).
- `<VoiceWidget agent="olivia|sarah" />` React component on
  `/contractor/apply` and `/claim`. Gated behind
  `NEXT_PUBLIC_VOICE_WIDGET_ENABLED`.
- `<VoiceConsentModal>` runs APP 8 consent gate BEFORE EL widget
  script loads. Decline / silence / Esc → no script load, no audio.
- `/api/voice/widget-consent` logs consent to compliance_events
  ledger (consentMethod: 'web_widget').
- Knowledge base content packs in `docs/voice-knowledge-base/`
  (7 markdown files) — manual upload to EL Convai > Knowledge Base.

### Production surface today

| Surface                             | Status                                   |
| ----------------------------------- | ---------------------------------------- |
| EL Convai dashboard agents          | Sarah, Maya, Olivia — all published live |
| Twilio inbound number for Sarah     | Not signed up — repo scaffolding only    |
| Browser widget on /contractor/apply | Code shipped, flag OFF                   |
| Browser widget on /claim            | Code shipped, flag OFF                   |

### Activation

To turn on the widget in production: set
`NEXT_PUBLIC_VOICE_WIDGET_ENABLED=true` in Vercel project settings,
redeploy. APP 8 consent gate fires before any EL script loads. To
roll back: flip the env var to false.

## 2026-04-24 — Foundation Sprint COMPLETE

**Outcome:** all six foundation dimensions at 10/10. Documentation
reached 10/10 with Polish 8 (docs-only, this PR).

### Ten-day sprint PRs

Days 1–10 of the sprint produced the scaffold and the first wave of
ADRs. Dates are the approximate merge window; exact PR numbers are
tracked in Linear against DR-700 series.

- Day 1 — Inventory + scoring baseline.
- Day 2 — Zod schema consolidation under
  `src/lib/validation/schemas.ts`.
- Day 3 — `tsconfig.strict.json` + rollout plan.
- Day 4 — CI hard gates: `tsc`, `lint`, smoke, `prettier --check`.
- Day 5 — Observability API surface at `src/lib/observability/`.
- Day 6 — Husky + commitlint + lint-staged + Prettier.
- Day 7 — Vitest + Playwright wired to CI.
- Day 8 — Feature-flag hygiene sweep.
- Day 9 — Observability backend wired.
- Day 10 — Docs reorganisation + first ADRs.

### Polish PR wave

- **Polish 1** — Strict TS expansion.
- **Polish 2** — API handler `captureException` migration across
  `app/api/**/route.ts`.
- **Polish 3** — Dedup + CI hardening (flipped lint warnings → errors).
- **Polish 4** — Vercel-native observability swap (ADR-005).
- **Polish 5** — Client `console.*` → structured `clientLogger`.
- **Polish 6** — Vitest unit tests on validation/observability/voice/
  compliance libs.
- **Polish 7** — `Step5HealthSafety` god-component decomposition
  (1,210 lines → orchestrator + 10 sub-components). Commit
  `a615ff04`. See ADR-009.
- **Polish 8** — Docs richness. This PR.
  - `docs/adr/ADR-006-foundation-sprint-outcomes.md`
  - `docs/adr/ADR-007-pre-commit-and-ci-discipline.md`
  - `docs/adr/ADR-008-pocock-skills-framework-adoption.md`
  - `docs/adr/ADR-009-god-component-decomposition.md`
  - `docs/how-to/add-a-new-api-route.md`
  - `docs/how-to/add-a-new-feature-flag.md`
  - `docs/how-to/run-the-foundation-sprint-checklist.md`
  - `CONTRIBUTING.md`
  - `.context/domain-models.md` (+ Prisma mapping table, state
    machines, relationships diagram, known drift list)
  - `CLAUDE.md` (+ table of contents)
  - `MEMORY.md` (this file)

### Scheduled follow-ups

- Decompose `Step0Eligibility` (god component, 920 lines). Pattern
  from ADR-009.
- Decompose `SubContractorManager` (god component, 1,080 lines).
  Pattern from ADR-009.
- Promote `compliance_events` from raw SQL to a first-class Prisma
  model, or commit to raw SQL and write an ADR explaining the
  append-only constraint.
- Add persistent models for `Booking`, `VoiceCall`, `FinanceReferral`
  (currently in-memory; see `.context/domain-models.md` → Known
  drift).

## 2026-04-23 — Voice pipeline (flag-off)

Merged DR-708 (ElevenLabs port), DR-709 (Sarah system prompt + RAG),
DR-710 (five approved tools), DR-711 (topic classifier), DR-713
(APP 8 consent), DR-714 (redaction + retention cron), DR-715
(5-layer kill switch). All flag-gated off in production. Runbooks in
`docs/voice-*.md`.

## 2026-04-20 — Finance partner switch

PR #77 migrated finance referrals Blue Fire → Equipped Commercial.
`/finance` referral flow added, gated behind
`FINANCE_REFERRAL_WRITER_ENABLED` (still in-memory — see Known drift).

## 2026-04-14 — Compliance baseline

Waves 8–16 landed: honest CTA copy (no "60-minute response" claims
without qualification), cookie banner + consent-mode v2, APP 3
collection notices, NZ Consumers supplementary terms, NZ CGA/FTA
notice on location pages, Clarity session-recording disclosure,
privacy overseas-disclosure table, Equipped consent form
(flag-gated), `compliance_events` table + feature-flagged writer.

## Pointer to the old MEMORY.md

The global `~/.claude/projects/C--Disaster-Recovery/memory/MEMORY.md`
remains the personal-context log for Phill across sessions (design
conventions, visual framework, historical fixes, contrast audit
details). This repo-root `MEMORY.md` is the project-facing sprint log
that stays with the code.
