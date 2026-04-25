# Phase 7 — Handoff

**Loop:** `2026-04-25-m365-dkim-enable`
**Closed:** 2026-04-25

## Done

- `selector2._domainkey.carsi.com.au` CNAME added to DO and propagated.
- Both DKIM CNAMEs resolve end-to-end through Microsoft's
  `onmicrosoft.com` zone.
- Verified live via a real test email from `phill.m@carsi.com.au` →
  `phill.mcgurk@gmail.com`. Gmail "Show original" reports:
  - `SPF: PASS`
  - `DKIM: PASS with domain carsi.com.au` (selector1)
  - `DMARC: FAIL` (no DMARC record yet — separate loop)
- Loop artefacts in `docs/prd/loops/2026-04-25-m365-dkim-enable/`
  (00 → 07).

## Residual debt (tracked elsewhere)

- **DMARC publish** → new loop `2026-04-26-carsi-dmarc-publish`
  (skeleton intake committed alongside this handoff).
- **selector2 Microsoft key publish** → self-heals on next rotation;
  accepted.
- **disasterrecovery.com.au tenant DKIM** → not scoped; open on-demand.

## Next session bootstrap

Recommended next ready-to-start loop:

- **L2 — GitHub token + OAuth audit** (`2026-04-25-github-token-audit`)
  — intake already on main; no blockers.

```text
/clear

System prompt: You are operating the Disaster Recovery loop system per
`docs/prd/loop-system.md`. Loop id: 2026-04-25-github-token-audit.

Step 1 — Read only these files:
  - docs/prd/loop-system.md
  - docs/prd/loops/2026-04-25-github-token-audit/00-intake.md

Step 2 — Walk phases 1 → 7 in order. Write each phase's output file BEFORE
advancing. Invoke the skills listed in the matrix.

Step 3 — Do not expand scope. If a concern falls outside the loop, capture
it in 06-review.md as a proposed follow-up loop.

Exit when 07-handoff.md is on main, PR merged, tsc + vitest green.

NOT LEGAL ADVICE.
```

## PR

Branch: `loop/2026-04-25-m365-dkim-enable`
Files changed: 7 loop artefacts + 1 new DMARC-loop skeleton
No code changes in repo; no `tsc` / `vitest` deltas.
