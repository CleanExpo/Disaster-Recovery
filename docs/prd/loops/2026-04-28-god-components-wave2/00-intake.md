# Phase 0 — Intake

**Loop:** `2026-04-28-god-components-wave2`
**Opened:** 2026-04-28
**Owner:** Phill McGurk + Claude Code

## Ask

Apply the ADR-009 god-component decomposition pattern to the two remaining
targets flagged in the board audit:

- `src/components/contractor/onboarding/Step0Eligibility.tsx` (914 lines)
- `src/components/contractor/portal/SubContractorManager.tsx` (906 lines)

Produce: thin orchestrator (≤200 lines) + focused sub-components in a
co-located subfolder + shared `types.ts`. No behavioural changes.

## Reference

- ADR-009 — pattern definition (Step5HealthSafety reference implementation).
- Board audit Section 2 item 6 — god components.

## Exit gate

- [x] Two targets identified and measured.
- [x] Pattern established (ADR-009).
- [x] No external API contract change required (component props stay
      the same for consumers).

**Proceed to Phase 1 — Grill Me.**
