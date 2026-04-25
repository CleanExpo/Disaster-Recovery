# Phase 3 — Plan

**Loop:** `2026-04-28-god-components-wave2`

## Numbered steps

### Step0Eligibility decomposition

1. **Create `step0/types.ts`** — move `AssociationChoice`, `ASSOCIATION_OPTIONS`,
   `EligibilityData`, `ALLOWED_IMAGE_TYPES`, `MAX_FILE_BYTES`,
   `AUSTRALIAN_STATES`; add `Step0Control` + `Step0SectionProps`.
2. **Create shared primitives** — `ExternalLinkBtn`, `RequirementRow`,
   `FileUploadSlot`, `Section`.
3. **Create 7 requirement sections** — `CarsiSection`, `AssociationSection`,
   `IicrcSection`, `ExperienceSection`, `DeclarationSection`, `LicenceSection`,
   `BusinessRegistrationSection`. Each takes `{ control }: Step0SectionProps`.
4. **Create `PrivacyNotice.tsx`** — static copy block extracted.
5. **Rewrite `Step0Eligibility.tsx`** — orchestrator ≤200 lines:
   - `useState` for data + validationError.
   - `set` helper + `handleConfirm` with validation cascade.
   - Compose the sections. Re-export `EligibilityData` type.

### SubContractorManager decomposition

6. **Create `subContractorManager/types.ts`** — move `ENGAGEMENT_STATUS_CONFIG`,
   `ONBOARDING_STATUS_CONFIG`, `formatAud`, `formatDate`.
7. **Create sub-components** — `MarkupCalculatorDisplay`, `EngagementForm`,
   `SubContractorCard`, `EngagementsTable`. Each takes explicit props.
8. **Rewrite `SubContractorManager.tsx`** — orchestrator ≤250 lines:
   - Fetch + dialog + handler state stays.
   - Compose the sub-components.

### Verification

9. `npm run lint` — must pass.
10. `npx tsc --noEmit` — must pass (delta = 0 new errors vs baseline).
11. Grep cross-import check.
12. Write 05/06/07 artefacts, PR, squash-merge.

## Token budget

~25k — biggest loop yet (two large files + ~15 new files).

## File territory

- Two new folders: `src/components/contractor/onboarding/step0/`,
  `src/components/contractor/portal/subContractorManager/`.
- Two files rewritten: `Step0Eligibility.tsx`, `SubContractorManager.tsx`.
- No changes to external consumers, no API changes, no Prisma.

**Proceed to Phase 4 — Implement.**
