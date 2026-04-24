# Phase 2 — Design-an-Interface

**Loop:** `2026-04-28-god-components-wave2`
**Skill invoked:** `design-an-interface`.

## External contracts (unchanged)

| Consumer                               | Import                                                                                                    |
| -------------------------------------- | --------------------------------------------------------------------------------------------------------- |
| `app/contractor/apply/ApplyClient.tsx` | `import Step0Eligibility, { EligibilityData } from '@/components/contractor/onboarding/Step0Eligibility'` |
| `app/contractor/portal/page.tsx`       | `import SubContractorManager from '@/components/contractor/portal/SubContractorManager'`                  |

Both contracts preserved: default exports stay on the orchestrator at
the original path; `EligibilityData` type re-exported by the
orchestrator from `./step0/types`.

## Internal layout — Step0 decomposition

```
src/components/contractor/onboarding/
├── Step0Eligibility.tsx            // orchestrator — owns useState, handleConfirm, composes sections
└── step0/
    ├── types.ts                    // AssociationChoice, EligibilityData, ASSOCIATION_OPTIONS,
    │                                  ALLOWED_IMAGE_TYPES, MAX_FILE_BYTES, AUSTRALIAN_STATES,
    │                                  Step0Control, Step0SectionProps
    ├── ExternalLinkBtn.tsx         // shared primitive
    ├── RequirementRow.tsx          // shared primitive
    ├── FileUploadSlot.tsx          // shared primitive
    ├── Section.tsx                 // section wrapper
    ├── CarsiSection.tsx            // req 1
    ├── AssociationSection.tsx      // req 2
    ├── IicrcSection.tsx            // req 3
    ├── ExperienceSection.tsx       // req 4
    ├── DeclarationSection.tsx      // req 5
    ├── LicenceSection.tsx          // req 6
    ├── BusinessRegistrationSection.tsx // req 7
    └── PrivacyNotice.tsx           // APP 3 block
```

Control interface:

```ts
export interface Step0Control {
  data: EligibilityData;
  set: <K extends keyof EligibilityData>(key: K, value: EligibilityData[K]) => void;
  onError: (msg: string) => void;
}
export interface Step0SectionProps {
  control: Step0Control;
}
```

## Internal layout — SubContractorManager decomposition

```
src/components/contractor/portal/
├── SubContractorManager.tsx        // orchestrator — owns fetch, dialog state, handlers
└── subContractorManager/
    ├── types.ts                    // ENGAGEMENT_STATUS_CONFIG, ONBOARDING_STATUS_CONFIG,
    │                                  formatAud, formatDate
    ├── MarkupCalculatorDisplay.tsx // pure presentational
    ├── EngagementForm.tsx          // react-hook-form + markup preview
    ├── SubContractorCard.tsx       // card view of one sub-contractor
    └── EngagementsTable.tsx        // table of all engagements
```

## Verification contract

1. `npm run lint` — passes.
2. `npx tsc --noEmit` — passes (no new errors on top of baseline).
3. Grep: no sub-component imports another sub-component (cross-import rule).
4. Line count: each sub-component ≤ ~250 lines (ADR-009 guidance).
5. External consumers still compile (ApplyClient.tsx, portal/page.tsx).

## Exit gate

- [x] External API contracts preserved.
- [x] Internal folder structure designed.
- [x] Control interfaces specified.

**Proceed to Phase 3 — Plan.**
