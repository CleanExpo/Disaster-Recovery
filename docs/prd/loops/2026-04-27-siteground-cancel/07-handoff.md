# Phase 7 — Handoff

**Loop:** `2026-04-27-siteground-cancel`
**Closed:** 2026-04-27

## Done

- **Siteground account audited.** One paid service (GoGeek hosting,
  0 sites, expires 18 May 2026). Auto-renewal **already OFF**.
  Service will lapse naturally — **no further action required**.
- **Other Siteground services:** AI Studio on free Essential tier, 2
  external domains (metis.today + carsi.com.au), every other product
  at 0 plans.
- **DNS independence confirmed:** carsi.com.au (DigitalOcean / Cloudflare
  / M365), metis.today (NS1 / Netlify) — neither depends on Siteground.
- **No collateral damage** to Disaster Recovery production on the
  Siteground lapse.

## Residual debt

1. **GoDaddy honorrestorations.com auto-renew** — still ON as of
   loop close. Login was failing. Disable next time GoDaddy login
   works. Worst case: one more renewal cycle, then drops.
2. **metis.today PENDING TRANSFER** — surfaced during inventory.
   Unrelated to this loop. Future loop if still relevant.
3. **honorrestorations.com mail** — MX still via Siteground's
   SpamExperts. Mail bounces after 18 May 2026. Accepted.

## Natural lapse checklist (future)

On or after 18 May 2026:

- [ ] Attempt Siteground Client Area login — expect "account
      expired/suspended" or equivalent.
- [ ] `nslookup carsi.com.au 8.8.8.8` — must still resolve (DO),
      DMARC still passing.
- [ ] Attempt `mail_to@honorrestorations.com` (if any forwarder still
      exists) — expect bounce. Acceptable.
- [ ] Confirm no Siteground charge on the card between 27 Apr and
      18 May 2026 (auto-renew is OFF so there shouldn't be one).

## Next session bootstrap

From PRD §10 queue, remaining unblocked loops:

- **L8 — God-components wave 2** (`2026-04-28-god-components-wave2`) —
  decompose `Step0Eligibility.tsx` (914 lines) and
  `SubContractorManager.tsx` (906 lines) using the ADR-009 pattern.
  Large code loop, aligned with the board audit.
- **L9 — FinanceReferral Prisma persistence**
  (`2026-04-29-finance-referral-persistence`) — promote in-memory
  FinanceReferral shape to a first-class Prisma model. Medium code loop.

Blocked:

- L5 iOS Phase 3a (Apple developer account).
- L6 Equipped Phase 2 JWT (awaiting partner API key).

```text
/clear

System prompt: You are operating the Disaster Recovery loop system per
`docs/prd/loop-system.md`. Loop id: <pick L8 or L9>.

Step 1 — Read only these files:
  - docs/prd/loop-system.md
  - docs/prd/loops/<loop-id>/00-intake.md

Step 2 — Walk phases 1 → 7 in order. Write each phase's output file BEFORE
advancing. Invoke the skills listed in the matrix.

Step 3 — Do not expand scope. If a concern falls outside the loop, capture
it in 06-review.md as a proposed follow-up loop.

Exit when 07-handoff.md is on main, PR merged, tsc + vitest green.

NOT LEGAL ADVICE.
```

## Lessons for the PRD

One amendment candidate logged in 06-review.md: for lapse/verification
type loops, Phase 1 Grill-Me should include an explicit "current-state
check before mutation" step. Defer the PRD edit until this pattern
recurs (second occurrence triggers amendment).

## PR

Branch: `loop/2026-04-27-siteground-cancel`
No code changes; docs only + verification-only (no external mutations).

**NOT LEGAL ADVICE.**
