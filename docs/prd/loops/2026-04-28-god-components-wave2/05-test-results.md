# Phase 5 — Test Results

**Loop:** `2026-04-28-god-components-wave2`

## Decomposition outcomes

### Step0Eligibility — 914 → 226 lines (orchestrator)

| File                                    | Lines   | Role                                                    |
| --------------------------------------- | ------- | ------------------------------------------------------- |
| `Step0Eligibility.tsx`                  | **226** | Orchestrator — owns useState + handleConfirm + composes |
| `step0/types.ts`                        | 121     | Types + constants + Step0Control + Step0SectionProps    |
| `step0/AssociationSection.tsx`          | 115     | Req 2                                                   |
| `step0/BusinessRegistrationSection.tsx` | 126     | Req 7                                                   |
| `step0/CarsiSection.tsx`                | 47      | Req 1                                                   |
| `step0/DeclarationSection.tsx`          | 29      | Req 5                                                   |
| `step0/ExperienceSection.tsx`           | 29      | Req 4                                                   |
| `step0/ExternalLinkBtn.tsx`             | 25      | Shared primitive                                        |
| `step0/FileUploadSlot.tsx`              | 92      | Shared primitive                                        |
| `step0/IicrcSection.tsx`                | 54      | Req 3                                                   |
| `step0/LicenceSection.tsx`              | 88      | Req 6                                                   |
| `step0/PrivacyNotice.tsx`               | 25      | APP 3 block                                             |
| `step0/RequirementRow.tsx`              | 27      | Shared primitive                                        |
| `step0/Section.tsx`                     | 46      | Section wrapper                                         |

Orchestrator is 26 lines over the ≤200 ADR-009 guidance — driven by the
7-branch validation cascade in `handleConfirm`. ADR-009 explicitly notes
the line target is "guidance, not dogma" when the reason is genuine
complexity, not multi-purpose. Acceptable.

### SubContractorManager — 906 → 366 lines (orchestrator)

| File                                               | Lines   | Role                                             |
| -------------------------------------------------- | ------- | ------------------------------------------------ |
| `SubContractorManager.tsx`                         | **366** | Orchestrator — fetch + dialogs + handlers + tabs |
| `subContractorManager/types.ts`                    | 43      | Status configs + formatters                      |
| `subContractorManager/EngagementForm.tsx`          | 279     | RHF form + markup preview                        |
| `subContractorManager/EngagementsTable.tsx`        | 95      | Engagements table                                |
| `subContractorManager/MarkupCalculatorDisplay.tsx` | 58      | Calculation card                                 |
| `subContractorManager/SubContractorCard.tsx`       | 111     | Sub-contractor card                              |

Orchestrator is over the strict 200-line target because it owns the
dialog JSX (engagement + onboarding dialogs are both rich). Splitting
the dialogs into their own files would be premature — the dialog body
_is_ the orchestrator's wiring of `<EngagementForm>` /
`<SubContractorOnboarding>`. Splitting would just spread the wiring.

`EngagementForm` at 279 lines is the largest sub-component. Justified
by the form genuinely having 6 distinct field groups + the invite-mode
sub-state. Future loop could split into `SubContractorPicker` +
`InviteSubForm` + `EngagementFields` if it grows further.

## Verification

| Check                                                                     | Result                                                 |
| ------------------------------------------------------------------------- | ------------------------------------------------------ |
| `npx tsc --noEmit` filtered for changed files                             | ✅ zero errors                                         |
| Cross-import grep on `step0/`                                             | ✅ no sub-component imports another                    |
| Cross-import grep on `subContractorManager/`                              | ✅ no sub-component imports another                    |
| External consumer `app/contractor/apply/ApplyClient.tsx` import preserved | ✅ `Step0Eligibility, { EligibilityData }` re-exported |
| External consumer `app/contractor/portal/page.tsx` import preserved       | ✅ default export unchanged                            |
| Behavioural change                                                        | ✅ none — extract-and-move only                        |

## Net-line analysis

- Step0: 914 → 1057 (orchestrator + 13 files). +143 lines from
  `'use client'`, imports, memo wrappers, type bundle, props
  destructuring.
- SubContractorManager: 906 → 952 (orchestrator + 5 files). +46 lines
  from imports + memo wrappers + type bundle.

Net growth ~190 lines across both for editability + testability. Per
ADR-009 reference: Step5 hit ~+300 net for similar reasons. In line
with expectations.

## Exit gate

- [x] Both targets decomposed.
- [x] Pattern matches Step5 reference.
- [x] No behavioural changes.
- [x] External consumer contracts preserved.
- [x] TypeScript clean on changed files.

**Proceed to Phase 6 — Review.**
