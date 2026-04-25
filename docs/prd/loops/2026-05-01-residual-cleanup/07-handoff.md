# Phase 7 — Handoff

**Loop:** `2026-05-01-residual-cleanup`
**Closed:** 2026-05-01

## Done — autonomous

- **`scripts/check-brand-name.ts`** — Husky pre-commit + manual `npx tsx` runner. Caught 3 occurrences L10 missed; those are fixed. Future agents reintroducing "Disaster Recovery Australia" will fail the commit gate.
- **`docs/brand-portfolio.md`** — entity ↔ trading name ↔ domain ↔ Vercel project ↔ status mapping. Single source of truth.
- **`docs/runbooks/env-production-security-emergency.md`** — 5-phase runbook to rotate keys, scrub history, install gitleaks, write postmortem. NOT LEGAL ADVICE.
- **`docs/runbooks/drq-vercel-handoff.md`** — three options (A keep / B separate Vercel / C full fork) with recommendation = B. Defer execution until TKM advises on entity structure.
- **L9 Phase 2 status webhook persistence** —
  - Extended `FinanceReferral` schema with `equippedReferralId` (unique), `entityIdentifierHash`, `stage`, `lastStatus`, `consentVersion`, `smsSent`, `metadata`, `updatedAt`.
  - New `FinanceReferralEvent` model for webhook idempotency (replaces the in-memory `seenEvents` Set).
  - Migration `20260501000000_finance_referral_phase2/migration.sql` (idempotent, re-run safe).
  - Rewrote `src/lib/finance/referral-store.ts` to be Prisma-backed (async). Same exported function signatures so consumers don't change shape, but every call is now `await`-ed.
  - Updated `app/api/finance/status/route.ts` and `app/admin/finance-referrals/page.tsx` to await the async API.
  - Best-effort: every Prisma call wrapped in try/catch, falls back to no-op if the table doesn't exist.

## Action required from Phill

1. **Finish the GoDaddy honorrestorations.com auto-renew off** — Continue & Verify dialog is open, complete the OTP. (1 min)
2. **Send the TKM draft email** in Gmail Drafts. (1 min)
3. **Run prisma migrate deploy** when ready — both L9 Phase 1 (FinanceReferral table create) and L9 Phase 2 (column adds + FinanceReferralEvent table). Idempotent. (~30 s)
4. **Walk the security-emergency runbook** in your own time — it's a half-day focused block, ideally done before any new public release. (~4 h)

## Residual debt

- **L11 ASIC business names** — still blocked on TKM reply.
- **L5 Apple Developer enrolment** — blocked on L11.
- **DRQ Option B execution** — deferred to post-TKM.
- **Vitest coverage** for the Prisma-backed referral-store — none yet. Future loop. The store is mostly try/catch fallbacks; coverage would test the happy path against a test DB.

## PR

Branch: `loop/2026-05-01-residual-cleanup`

Files added/modified:

- NEW `scripts/check-brand-name.ts`
- NEW `docs/brand-portfolio.md`
- NEW `docs/runbooks/env-production-security-emergency.md`
- NEW `docs/runbooks/drq-vercel-handoff.md`
- NEW `prisma/migrations/20260501000000_finance_referral_phase2/migration.sql`
- EDIT `prisma/schema.prisma` (FinanceReferral extended + FinanceReferralEvent added)
- EDIT `src/lib/finance/referral-store.ts` (in-memory → Prisma-backed)
- EDIT `app/api/finance/status/route.ts` (await async store)
- EDIT `app/admin/finance-referrals/page.tsx` (await listReferrals)
- EDIT `.husky/pre-commit` (run brand-name guard)
- EDIT `app/guides/iicrc/s220-floor-covering-restoration/page.tsx` (3 brand-name fixes)
- EDIT `src/components/privacy/App3CollectionNotice.tsx` (brand-name fix)
- 7 phase artefacts under `docs/prd/loops/2026-05-01-residual-cleanup/`

**NOT LEGAL ADVICE.**
