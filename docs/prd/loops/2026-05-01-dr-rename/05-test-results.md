# Phase 5 — Test Results

**Loop:** `2026-05-01-dr-rename`

## Counts

| Stage                                | "Disaster Recovery Australia" occurrences               |
| ------------------------------------ | ------------------------------------------------------- |
| Before                               | 372 (across 149 files)                                  |
| After pass 1 (operational paths)     | 33                                                      |
| After pass 2 (operational doc files) | 25                                                      |
| **Final residual**                   | **25** — all in deliberately-preserved historical paths |

## Residual locations (intentional)

All 22 files holding the residual 25 occurrences are historical /
point-in-time / audit snapshots that should reflect the brand name as
it was at the time of writing:

- `planning/PRODUCTION_SETUP.md`
- `planning/SITE_HEALTH_AUDIT_REPORT.md`
- `planning/MODERNIZATION_PLAN.md`
- `planning/IMMEDIATE-FIXES.md`
- `docs/proposals/apple-review-guideline-4.2-audit-2026-04-24.md`
- `docs/proposals/ios-app-store-strategy.md`
- `docs/history/brand-and-history.md`
- `docs/competitive-intel/week-2026-04-09-report.md`
- `docs/competitive-intel/week-2026-04-07-report.md`
- `docs/citation-audit-results-2026-04-09.md`
- `docs/gbp-audit-2026-04-08.md`
- `docs/accc-dark-pattern-audit-2026.md`
- `docs/ask-maps-strategy-2026-04-08.md`
- `docs/plans/2026-02-25-commercial-targeting-phase1.md`

## Verification

| Check                              | Result                                                |
| ---------------------------------- | ----------------------------------------------------- |
| `npx tsc --noEmit`                 | ✅ zero errors                                        |
| Operational-path grep              | ✅ zero "Disaster Recovery Australia"                 |
| Historical-path grep               | ✅ 25 (intentional)                                   |
| `legalName` in JSON-LD preserved   | ✅ "National Restoration Professionals Group Pty Ltd" |
| Privacy notice copy updated        | ✅ "trading as Disaster Recovery"                     |
| Voice agent consent script updated | ✅ "you've reached Disaster Recovery"                 |
| Husky pre-commit gates             | ✅ pass                                               |

## Behavioural impact

None. All-text changes. URLs unchanged. API contracts unchanged.
Schema unchanged.

## Compliance contingency

The privacy notice now reads _"trading as Disaster Recovery"_. For
this to be **legally accurate**, "Disaster Recovery" must be a
registered ASIC Business Name attached to NRPG Pty Ltd's ABN. That
registration is L11 (separate loop, awaiting TKM Accountants'
direction on which entity each business name attaches to).

Until L11 lands, the operational copy is "directionally correct" but
the formal trading-name registration is the authoritative source. Risk
window is brief — Phill's email to TKM is drafted and ready to send.

## Exit gate

- [x] Operational paths fully renamed.
- [x] Historical paths preserved.
- [x] TypeScript clean.
- [x] Compliance contingency documented.

**Proceed to Phase 6 — Review.**
