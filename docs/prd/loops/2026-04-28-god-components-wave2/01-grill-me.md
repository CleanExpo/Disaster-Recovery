# Phase 1 — Grill Me

**Loop:** `2026-04-28-god-components-wave2`
**Skill invoked:** `grill-me`, `ubiquitous-language`.

## Q1 — Why decompose these two now?

**A:** ADR-009 scheduled both. Step5 decomposition landed in Polish 7
(reference implementation). These two are the open items. The board
audit's Section 2 item 6 ("god components") flags them as CRITICAL for
agent editability and test coverage.

## Q2 — What's the exit criteria? Line count alone?

**A:** ≤200 lines is guidance, not dogma (ADR-009). Exit criteria:

- Orchestrator reads as "wire the sections together, nothing else".
- Every sub-component has a single responsibility statable in one line.
- No cross-imports between sub-components.
- Shared types live in `types.ts`; no inline types in sub-components.
- TypeScript strict compiles; no new `any` introduced.
- No behavioural change — same inputs produce same outputs.

## Q3 — Step0 uses plain `useState`, not react-hook-form. Pattern impact?

**A:** The ADR-009 `control` interface is a shape, not a react-hook-form
binding. For Step5 it happens to be `Control<FormValues>` because that's
the idiomatic pass-through. For Step0 the equivalent is a bundle:

```ts
interface Step0Control {
  data: EligibilityData;
  set: <K extends keyof EligibilityData>(key: K, value: EligibilityData[K]) => void;
  onError: (msg: string) => void;
}
```

Each sub-section takes `{ control }: { control: Step0Control }`. Uniform
interface preserved.

## Q4 — SubContractorManager has API calls + dialog state + two tabs. Safe boundary?

**A:** Yes. The orchestrator owns:

- Data fetching (`loadData`, `useEffect`).
- Dialog open state + submit handlers (API writes).
- Selection state.
- Success/error banner state.

Sub-components are pure UI:

- `MarkupCalculatorDisplay` — pure presentational.
- `SubContractorCard` — takes `{ subContractor, engagements, onAddEngagement }`.
- `EngagementsTable` — takes `{ engagements, subContractors }`.
- `EngagementForm` — takes `{ subContractors, onSubmit, onInviteNew, isSubmitting }`.

Each sub-component has zero knowledge of the fetch layer. If a sub is
refactored, the orchestrator contract doesn't change.

## Q5 — Are there external imports that could break?

**A:** Two external consumers identified:

- `app/contractor/apply/ApplyClient.tsx` — imports
  `Step0Eligibility, { EligibilityData }` from the orchestrator.
- `app/contractor/portal/page.tsx` — imports `SubContractorManager` as
  default.

Decomposition preserves both: orchestrator stays at the original path,
re-exports `EligibilityData` from `./step0/types`.

## Q6 — Any risk from auto-mode execution on 906 + 914 lines?

**A:** Execution pattern: extract-and-move, not rewrite. Every
sub-component is literal JSX and state wiring lifted from the original
file with the `data/set/onError` references threaded through a single
`control` prop instead of closure lookups. No logic change, no
refactor-and-shrink.

Smoke check after both decomps: `npm run lint` + `tsc --noEmit` must
pass. No behavioural tests exist for these components; visual inspection
in dev is the escape hatch if CI passes but something renders differently.

## Q7 — Ubiquitous-language check

Terms used:

- `Sub-contractor` — consistent with `UBIQUITOUS_LANGUAGE.md` (licensed
  trade sub-contractor).
- `Engagement` — the record of sub-contractor assigned to a `Job`.
  Not explicitly in the glossary but domain-idiomatic; consistent
  across the existing file.
- `IICRC-certified`, `CARSI`, `RIA/SRCP/CCAVIC/CCAWA` — compliance terms,
  spelled consistently.
- `NRPG` — correct (not NRP — see MEMORY.md NRP→NRPG rebrand note).

No language changes required.

## Open questions

None.

**Proceed to Phase 2 — Design-an-Interface.**
