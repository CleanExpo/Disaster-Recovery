# Phase 0 — Intake

**Loop:** `2026-05-01-residual-cleanup`
**Opened:** 2026-05-01
**Owner:** Phill McGurk + Claude Code

## Ask

Phill said "yes, all 8" to the residual cleanup menu offered post-L10:

1. GoDaddy honorrestorations.com auto-renew off (residual debt from L7)
2. Open TKM draft in Chrome to review/send
3. Brand-name regression guard CI script
4. L9 Prisma migrate deploy locally
5. Brand portfolio doc — entity → domain → Vercel mapping
6. `.env.production` security emergency — rotate + scrub history
7. DRQ Vercel/domain handoff plan
8. L9 Phase 2 — status webhook Prisma persistence

## Outcome by item

| #   | Item                                  | Status                                                                                                                |
| --- | ------------------------------------- | --------------------------------------------------------------------------------------------------------------------- |
| 1   | GoDaddy auto-renew off                | In progress — Chrome dialog open, awaiting Phill 2FA OTP                                                              |
| 2   | TKM draft visible                     | Done — saved in Gmail Drafts (Phill to send)                                                                          |
| 3   | Brand-name regression guard           | **Done** — `scripts/check-brand-name.ts` + Husky pre-commit hook. Caught 3 missed L10 occurrences on first run.       |
| 4   | Prisma migrate deploy                 | Deferred — permission-denied to run against prod Supabase without specific authorisation. Phill runs when ready.      |
| 5   | Brand portfolio doc                   | **Done** — `docs/brand-portfolio.md`                                                                                  |
| 6   | .env.production emergency             | **Done** — `docs/runbooks/env-production-security-emergency.md` (Phase 1-5 runbook; Phill executes destructive steps) |
| 7   | DRQ Vercel handoff plan               | **Done** — `docs/runbooks/drq-vercel-handoff.md` (Option A/B/C analysis + recommendation)                             |
| 8   | L9 Phase 2 status webhook persistence | **Done** — schema extension + migration + Prisma-backed `referral-store.ts` + consumer wiring                         |

## Exit gate

- [x] Five autonomous items shipped
- [x] One item delegated to runbook (security emergency)
- [x] Two items awaiting Phill action (GoDaddy 2FA, TKM email send)
- [x] One item deferred for explicit auth (prisma migrate prod)

**Proceed to Phase 1 — Grill Me.**
