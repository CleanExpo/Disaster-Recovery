# ADR-009: Systematic god-component decomposition

- **Status:** Accepted (Step5 complete, others scheduled)
- **Date:** 2026-04-24
- **Deciders:** Phill, Claude (Opus 4.7 1M)
- **Context:** Foundation Sprint Polish 7 + follow-ups

## Context

The Foundation Sprint inventory flagged three "god components" —
components above ~700 lines carrying unrelated state, ad-hoc
sub-sections, inline types, and tightly coupled sibling props:

1. **`Step5HealthSafety`** — 1,210 lines. Seven independent subsections
   (hazards, PPE, training, emergency contacts, incident history, risk
   assessment, compliance attestations) sharing one prop bag.
2. **`Step0Eligibility`** — 920 lines. Mix of eligibility gating,
   upfront consent capture, state-based routing logic, and copy blocks.
3. **`SubContractorManager`** — 1,080 lines. CRUD table + form + filters
   + invitation flow + status transitions, all inline.

Each component was working. But none was editable by an agent without
loading the entire file into context, and none had meaningful test
coverage — too many intertwined branches.

The cost was visible at review time: any change to one subsection
forced reading the other six, and state leakage between siblings
(shared `useState` where isolated reducers should have lived) meant
bugs in PPE could surface as rendering glitches in emergency contacts.

## Decision

Systematically decompose each god component into:

- A **thin orchestrator** (≤200 lines) that owns the shared control
  object, routes to sub-components, and composes their output.
- **Focused sub-components** (≤200 lines each) living in a subfolder
  alongside the orchestrator. Each sub-component owns exactly one
  subsection of the feature.
- **A shared `types.ts`** at the subfolder root. No inline types, no
  cross-imports between sub-components for type-only shapes.
- **A single `{ control }` prop interface** for every sub-component.
  `control` bundles state setters + readonly values + dispatchers the
  sub-component needs. Sub-components never touch siblings.
- **`React.memo`** on every sub-component where the `control` surface
  is stable between renders.

### Step5HealthSafety — complete (Polish 7)

- Landed in the current branch's ancestor commit
  `a615ff04 refactor(onboarding): decompose Step5HealthSafety god
  component (1210 -> orchestrator + 10 sub-components)`.
- Folder: `components/contractor/onboarding/Step5HealthSafety/`.
- Orchestrator: `Step5HealthSafety.tsx` (<200 lines).
- Sub-components: 10 (Hazards, PPE, Training, EmergencyContacts,
  IncidentHistory, RiskAssessment, ComplianceAttestations,
  DocumentUploads, SignOff, Summary).
- Shared types: `types.ts` at folder root.
- Net diff: −1,210 + (orchestrator + 10 × ~150) ≈ +300, but each file
  is independently readable.

### Step0Eligibility — scheduled

Next follow-up PR. Target decomposition:

- Orchestrator + `EligibilityGate`, `UpfrontConsent`, `StateRouting`,
  `CopyBlock`, `IneligiblePath`.

### SubContractorManager — scheduled

Follow-up PR after Step0. Target decomposition:

- Orchestrator + `Table`, `RowForm`, `Filters`, `InvitationFlow`,
  `StatusTransitions`, `BulkActions`.

## Pattern

```
components/contractor/onboarding/Step5HealthSafety/
├── Step5HealthSafety.tsx      // orchestrator
├── types.ts                    // shared types, no inline types elsewhere
├── Hazards.tsx                 // ≤200 lines, props: { control }
├── PPE.tsx
├── Training.tsx
├── EmergencyContacts.tsx
├── IncidentHistory.tsx
├── RiskAssessment.tsx
├── ComplianceAttestations.tsx
├── DocumentUploads.tsx
├── SignOff.tsx
└── Summary.tsx
```

Every sub-component has the same prop signature:

```tsx
import { memo } from 'react';
import type { Step5Control } from './types';

export const Hazards = memo(function Hazards({ control }: { control: Step5Control }) {
  // ...
});
```

No sub-component imports another sub-component. Composition happens in
the orchestrator only.

## Consequences

**Positive.**

- Step5 is now editable by an agent loading one sub-file at a time. A
  change to PPE no longer requires reading Training.
- Test coverage became tractable. Each sub-component is a pure function
  of `control`; `@testing-library/react` snapshots trivially.
- Review diffs for Step5 changes halved in size.

**Negative.**

- The `control` interface is wide (currently ~30 fields on Step5). If
  it keeps growing, the next refactor is splitting it into scoped
  sub-controls (`hazardControl`, `ppeControl`, …) passed only where
  needed.
- Two levels of indirection (orchestrator → sub-component → hook) can
  obscure data flow for someone new to the pattern. Mitigated by
  keeping `types.ts` the canonical reference.

**Neutral.**

- Line-count targets (≤200) are guidance, not dogma. A sub-component
  that hits 210 lines because the JSX is genuinely large is fine;
  one that hits 210 because it's doing two jobs is not.

## References

- `components/contractor/onboarding/Step5HealthSafety/` — reference
  implementation.
- Polish 7 commit `a615ff04`.
- ADR-006 — Foundation Sprint outcomes (the "8/10 → 10/10 architecture"
  item this ADR closes out).
- ADR-008 — Pocock skills (the `improve-codebase-architecture` skill is
  what surfaces the next god component to decompose).
- `.claude/rules/component-size.md` — agent-facing short form of this
  ADR.
