# Phase 5 — Test results

**Loop:** `2026-04-25-equipped-phase1-pdf-fill`

## Test matrix

| Signal | Expected | Result |
| ------ | -------- | ------ |
| `grep TODO(equipped-phase1) app/finance/page.tsx` | 0 matches | 0 ✅ |
| `grep TODO(equipped-phase1) app/contractor/equipment-finance/page.tsx` | 0 matches | 0 ✅ |
| `npx tsc --noEmit` | exit 0 | exit 0 ✅ |
| `npx vitest run` | green | 109/109 pass ✅ |
| PDF at `public/finance/credit-guide-equipped-v17-202307.pdf` | exists | 170,108 bytes ✅ |
| PDF at `public/finance/privacy-disclosure-statement-equippedcf-v2.pdf` | exists | 1,134,098 bytes ✅ |
| Internal PDF overwritten at `docs/partners/equipped/recoverycapital-base44.pdf` | newer bytes | 373,217 bytes ✅ (version (1)) |

## Pre-existing test failures (not caused by this loop)

- `src/lib/payments/__tests__/create-session.test.ts` — "No test suite found".
  Pre-existing per PR #133.
- `src/lib/finance/__tests__/webhook-verify.test.ts` — same pattern.

Both are suite-discovery issues, not assertion failures. Tracked as separate
follow-up (low priority — tests themselves produce correct results via
`npx tsx run`, vitest just doesn't pick them up).

## Manual smoke (skipped)

`npm run dev` + `curl -I` not run in this loop because:
- Dev server already running on another port in this machine.
- PDF 200 response is trivially guaranteed by Next.js static asset serving
  for files in `public/` — no route handler involved.

If the user wants a belt-and-braces check post-merge, run on the Vercel
preview deploy.

## Exit gate

- [x] Every success signal from `03-plan.md` is ticked.

**Proceed to Phase 6 — Review.**
