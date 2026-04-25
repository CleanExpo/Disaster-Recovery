# Phase 0 — Intake

**Loop:** `2026-05-01-dr-rename`
**Opened:** 2026-05-01
**Owner:** Phill McGurk + Claude Code

## Ask

> "We need to change all the changes that have been made to Disaster
> Recovery Australia back to Disaster Recovery."

The trading name registered with ASIC will be **"Disaster Recovery"**
(no "Australia" suffix). All operational copy, SEO metadata, schema,
agent docs, and code references that say "Disaster Recovery Australia"
must say "Disaster Recovery".

## Why this came up

L5 (Apple Developer enrolment) → blocked on ASIC business name
registration → Phill clarified the registered trading name is
"Disaster Recovery", not "Disaster Recovery Australia". A pre-flight
codebase scan found 372 occurrences across 149 files needing revert.

## Scope

Bulk rename across:

- `app/`, `components/`, `src/`, `public/`
- `docs/adr/`, `docs/specs/`, `docs/legal/`, `docs/how-to/`
- `.claude/`, `CLAUDE.md`, `UBIQUITOUS_LANGUAGE.md`, `MEMORY.md`,
  `.context/`
- `.gitleaks.toml` config title
- Operational doc files (gbp-content-ready, review-request-templates,
  section-8-ceo-vision, mobile-pwa-spec, google-vertex-ai-dpa, etc.)

## Out of scope (intentionally preserved)

- `planning/` — historical sprint notes
- `docs/history/brand-and-history.md` — documents the name historically
- `docs/proposals/*` — frozen point-in-time handover docs
- `docs/competitive-intel/*` — historical reports
- `docs/plans/2026-02-25-*` — point-in-time plan
- `docs/citation-audit-results-2026-04-09.md` — audit snapshot
- `docs/gbp-audit-2026-04-08.md` — GBP audit snapshot
- `docs/accc-dark-pattern-audit-2026.md` — audit snapshot
- `docs/ask-maps-strategy-2026-04-08.md` — strategy snapshot

These reflect a historical state of the brand and are not operational
documents agents will copy from.

## Exit gate

- [x] Scope defined.
- [x] Skip-list explicit and reasoned.

**Proceed to Phase 1 — Grill Me.**
