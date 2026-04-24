# Phase 3 — Plan

**Loop:** `2026-04-30-equipped-phase2-jwt`

## Numbered steps

1. **NEW `src/lib/finance/jwt-handoff.ts`** — sign + verify helpers.
2. **NEW `src/lib/finance/__tests__/jwt-handoff.test.ts`** — 7 vitest cases.
3. **EDIT `app/api/finance/referral/route.ts`** — replace inline `new SignJWT(...)` with `signEquippedHandoffToken`; add `kid` from env.
4. **EDIT `app/finance/handoff/page.tsx`** — async server-side verify; render error UI on failure, iframe on success.
5. **EDIT `app/finance/handoff/HandoffFrame.tsx`** — read `NEXT_PUBLIC_EQUIPPED_EMBED_ORIGIN` env; use for iframe + postMessage targetOrigin.
6. **NEW `app/finance/thank-you/page.tsx`** — completion landing page.
7. **EDIT `.env.example`** — append Equipped section.
8. **Run `npx vitest run src/lib/finance/__tests__/jwt-handoff.test.ts`** — must pass.
9. **Run `npx tsc --noEmit`** — must be clean on changed files.
10. **Write 05/06/07 artefacts, commit, PR, merge.**

## Token budget

~15k.

## File territory

- `src/lib/finance/jwt-handoff.ts` (NEW)
- `src/lib/finance/__tests__/jwt-handoff.test.ts` (NEW)
- `app/finance/thank-you/page.tsx` (NEW)
- `app/api/finance/referral/route.ts` (EDIT)
- `app/finance/handoff/page.tsx` (EDIT)
- `app/finance/handoff/HandoffFrame.tsx` (EDIT)
- `.env.example` (EDIT)

**Proceed to Phase 4 — Implement.**
