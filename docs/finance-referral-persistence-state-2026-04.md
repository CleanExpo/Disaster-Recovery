# Finance Referral Persistence — Current State

**DR-688 | Status doc, not a wiring change**
**Date:** 27 April 2026 (AEST)
**Audience:** future agents and engineers reading
`.context/domain-models.md` "Known drift" and concluding the helper
needs wiring. It is more nuanced than that.

---

## TL;DR

`.context/domain-models.md` says:

> **Finance referral** — Prisma models landed; persistence-helper
> module landed at `src/lib/finance/persistence.ts`. Live API +
> webhook store wiring to the helper still owed (separate PR — gated
> on partner DPA finalising).

That implies the live route is in-memory or otherwise unpersisted. It
is NOT. The reality is:

| Surface                                 | What it does today                                                        | What the helper would change                                                 |
| --------------------------------------- | ------------------------------------------------------------------------- | ---------------------------------------------------------------------------- |
| `app/api/finance/referral/route.ts:202` | Writes directly via `prisma.financeReferral.create()` inside a try/catch. | Same upsert behaviour, but with `equippedReferralId` as the idempotency key. |
| `src/lib/finance/referral-store.ts`     | Already Prisma-backed. `upsertReferral` writes to `financeReferral`.      | Would route through the helper for consistency, no functional change.        |
| `src/lib/finance/persistence.ts`        | Flag-gated upsert helpers that the live path does NOT call.               | Become the single write surface.                                             |

So the wiring is owed FOR CONSISTENCY, not for correctness. The live
data path is persisted today.

---

## Why the helper still exists if the live path works

Three reasons it is on disk and not deleted:

1. **Idempotency on retry.** The route uses `randomUUID()` per
   submission, so a client-side retry creates a new row, not an
   upsert. The helper keys on `equippedReferralId` (Equipped's opaque
   identifier echoed back via the JWT handoff) so retries from
   Equipped's webhook idempotently update one row.
2. **DPA gating.** Partner DPA (Equipped Commercial Finance) was not
   finalised at the time the helper landed. Until the DPA is signed,
   we deliberately keep the live path simple-but-correct; the helper
   waits in scaffold form.
3. **Webhook-only rows.** The webhook store today creates partial
   rows when a status webhook arrives before submission persists.
   Routing both surfaces through the helper would make that path
   cleaner.

---

## What "ship the wiring" actually means

When the partner DPA finalises, the wiring PR will:

1. Replace `prisma.financeReferral.create({...})` in the live route
   with `upsertFinanceReferral({ equippedReferralId, ...rest })`.
2. Add `appendFinanceReferralEvent` calls at status-transition points
   (currently the route only calls `prisma.financeReferral` directly,
   not the events table).
3. Flip `FINANCE_REFERRAL_WRITER_ENABLED=true` in Vercel.
4. Update `.context/domain-models.md` to remove the FinanceReferral
   entry from "Known drift" — it then matches the VoiceCall pattern
   where the model + wiring are both done.

Estimated effort: 4 hours code + 1 day partner-DPA review window.

---

## What to do until then

**Nothing.** The live path is correct under current load (single-shot
submission, no retries, no high-volume webhook traffic). If the
following changes, escalate:

- Equipped starts retrying status webhooks aggressively (we'd see
  duplicate rows). Mitigation: ship the helper wiring early, do not
  wait for the full DPA.
- Submission volume crosses ~100/day (the row-per-retry shape becomes
  visible in admin dashboards). Same mitigation.
- Equipped requests a deletion or correction request that needs
  `equippedReferralId` lookup — the helper's `findReferralByEquippedId`
  becomes load-bearing. Same mitigation.

None of these are happening today.

---

## Action: update `.context/domain-models.md`

The "Known drift" entry for FinanceReferral should be reworded to
match reality. Recommended replacement (paste into a follow-up PR):

> **Finance referral** — Prisma models landed and live route persists
> via `prisma.financeReferral.create()` directly. Persistence helper
> at `src/lib/finance/persistence.ts` exists as a scaffold for
> idempotent upsert + event append; wiring landed waits on partner
> DPA finalising. Webhook store at
> `src/lib/finance/referral-store.ts` is already Prisma-backed.
> See `docs/finance-referral-persistence-state-2026-04.md`.

This change is intentionally NOT made in this PR — single-purpose
docs land cleanly. A follow-up doc-only PR will sync the drift entry.

---

## References

- `src/lib/finance/persistence.ts` — flag-gated helpers (DR-688 PR
  #218)
- `src/lib/finance/referral-store.ts` — webhook-side store, Prisma-
  backed since L9 Phase 2 (PR #77 follow-ups)
- `app/api/finance/referral/route.ts:71-238` — live submission route
- `.claude/rules/business-rules.md` §10 — reg-change triggers
- `.claude/rules/compliance.md` §8 — Reg 25 referrer model
- `docs/plans/2026-04-27-continuation-roadmap.md` §2.3 — this doc was
  promised there
