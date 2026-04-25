# Phase 6 — Review

**Loop:** `2026-04-28-god-components-wave2`
**Skill invoked:** `improve-codebase-architecture`.

## What went well

- Pattern was prescribed (ADR-009 + Step5 reference), so the work
  was extract-and-move, not rewrite. Zero new logic introduced.
- The `Step0Control` interface (`{ data, set, onError }`) generalises
  cleanly to `useState`-driven components; ADR-009's `control` concept
  isn't tied to react-hook-form.
- External consumer contracts (`ApplyClient.tsx`,
  `app/contractor/portal/page.tsx`) preserved without touching them —
  re-export of `EligibilityData` from the orchestrator did the job.
- Cross-import discipline held: no sub-component imports another
  sub-component. Composition lives in the orchestrator only.

## What went wrong

1. **Orchestrator line targets exceeded.** Step0 = 226, SubContractorManager
   = 366 vs ≤200 guidance. Reasons:
   - Step0: the 7-branch validation cascade is logically one piece;
     splitting it into a hook would obscure the cascade. Acceptable.
   - SubContractorManager: dialog JSX + handlers + tabs all genuinely
     belong together at the orchestrator level. The size signals that
     this orchestrator owns more than Step5 did (which had no dialogs).

   **Fix going forward:** when an orchestrator > 250 lines, evaluate
   whether the "dialog body" pattern justifies a new sub-component
   (e.g. `EngagementDialog`, `OnboardingDialog`) that bundles the
   dialog wiring. Defer until a real edit-pain signal surfaces.

2. **`EngagementForm` at 279 lines.** Larger than the ≤200 sub-component
   guidance. The form has 6 distinct field groups + invite-mode
   sub-state; further split is possible but premature.

   **Fix going forward:** if a future ticket touches the engagement
   form heavily, split into `SubContractorPicker` + `InviteSubForm` +
   `EngagementFields`.

## Residual debt

1. **Test coverage.** Sub-components are now testable in isolation but
   no Vitest specs were added in this loop. Polish 6 added unit tests
   for the validation library; the same treatment for these components
   is a future loop.
2. **Step5 has 10 sub-components, Step0 has 13, SubContractorManager
   has 5.** The size disparity is fine — drives by what each component
   actually does — but it underscores that the ≤200 line target is
   guidance, not policy.

## Compliance audit

| Check                                        | Result                                 |
| -------------------------------------------- | -------------------------------------- |
| No new `any` introduced                      | ✅                                     |
| No new `@ts-ignore`                          | ✅                                     |
| No banned phrases (insurance approved, etc.) | ✅ (copy preserved verbatim)           |
| AU English preserved                         | ✅                                     |
| `colour` (not `color`) in tailwind classes   | ✅ unchanged from original             |
| No cross-imports between sub-components      | ✅                                     |
| No PII in code                               | ✅ (no PII present in original either) |

## Loop-system amendments to propose

- **PRD §4 skill matrix:** consider adding a "type checker on the
  changed scope" gate to Phase 5 — `npx tsc --noEmit` filtered to the
  changed files would have caught a regression even faster than this
  loop's grep approach. Defer until a regression actually slips.
- **ADR-009 update:** the orchestrator-line-target should be softened
  in the doc itself — say "≤200 for pure compositions, ≤350 when the
  orchestrator owns dialogs/tabs/cascading validation". This is the
  second loop where the literal target was missed for legitimate
  reasons; document it.

## Exit gate

- [x] Decisions + line-target deviations documented with reasons.
- [x] Residual debt tracked.

**Proceed to Phase 7 — Handoff.**
