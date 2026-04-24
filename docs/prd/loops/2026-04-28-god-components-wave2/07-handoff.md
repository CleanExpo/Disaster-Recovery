# Phase 7 — Handoff

**Loop:** `2026-04-28-god-components-wave2`
**Closed:** 2026-04-28

## Done

- **Step0Eligibility decomposed** (914 → 226 orchestrator + 13 sub-files
  in `step0/`). ADR-009 pattern applied: shared types, primitives
  (ExternalLinkBtn, RequirementRow, FileUploadSlot, Section), 7
  requirement sections, privacy notice.
- **SubContractorManager decomposed** (906 → 366 orchestrator + 5
  sub-files in `subContractorManager/`). Sub-components: types,
  MarkupCalculatorDisplay, EngagementForm, SubContractorCard,
  EngagementsTable.
- **External consumer contracts preserved** — no changes to
  `ApplyClient.tsx` or `app/contractor/portal/page.tsx`.
- **TypeScript clean** on all changed files.
- **No cross-imports between sub-components** — composition lives only
  in orchestrators.

## Closed ADR-009 backlog

- [x] Step5HealthSafety (Polish 7, prior).
- [x] Step0Eligibility (this loop).
- [x] SubContractorManager (this loop).

ADR-009 decomposition wave is now complete. No further god components
are scheduled.

## Residual debt

1. **Vitest coverage** for the new sub-components — none in this loop.
   Future loop. Each sub-component is a pure-ish function of its props,
   so snapshot tests should be cheap.
2. **ADR-009 line-target softening** — doc proposes that the target
   becomes "≤200 for pure compositions, ≤350 when the orchestrator
   owns dialogs/tabs/cascading validation". Defer the ADR edit; raise
   only if a 3rd reviewer flags it.
3. **`EngagementForm` further decomposition** — possible split into
   `SubContractorPicker` + `InviteSubForm` + `EngagementFields` if a
   future edit makes this pain visible.

## Next session bootstrap

From PRD §10 queue, remaining unblocked loops:

- **L9 — FinanceReferral Prisma persistence**
  (`2026-04-29-finance-referral-persistence`) — promote in-memory
  `FinanceReferral` shape to a first-class Prisma model. Medium code
  loop. See `.context/domain-models.md` Known drift item 3.

Blocked:

- L5 iOS Phase 3a (Apple developer account).
- L6 Equipped Phase 2 JWT (awaiting partner API key).

```text
/clear

System prompt: You are operating the Disaster Recovery loop system per
`docs/prd/loop-system.md`. Loop id: 2026-04-29-finance-referral-persistence.

Step 1 — Read only these files:
  - docs/prd/loop-system.md
  - docs/prd/loops/2026-04-29-finance-referral-persistence/00-intake.md
  - .context/domain-models.md
  - .claude/rules/business-rules.md (Reg 25 referrer scope)
  - .claude/rules/compliance.md §8 (NCCP carve-out)

Step 2 — Walk phases 1 → 7 in order. Write each phase's output file BEFORE
advancing. Invoke the skills listed in the matrix.

Step 3 — Do not expand scope. If a concern falls outside the loop, capture
it in 06-review.md as a proposed follow-up loop.

Exit when 07-handoff.md is on main, PR merged, tsc + vitest green.

NOT LEGAL ADVICE.
```

## Lessons for the PRD

Two amendment candidates logged in 06-review.md:

1. Phase 5 should include `npx tsc --noEmit` filtered to changed files.
2. ADR-009 line targets should be softened to reflect orchestrators
   owning dialogs/tabs/validation cascades.

Defer both PRD/ADR edits until a 3rd loop confirms the pattern.

## PR

Branch: `loop/2026-04-28-god-components-wave2`

- 13 new files under `src/components/contractor/onboarding/step0/`
- 5 new files under `src/components/contractor/portal/subContractorManager/`
- 2 files rewritten (orchestrators)
- 7 phase artefacts under `docs/prd/loops/2026-04-28-god-components-wave2/`

**NOT LEGAL ADVICE.**
