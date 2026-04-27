# Continuation Roadmap — Post Health-Check Sprint

**Date:** 27 April 2026 (AEST)
**Author:** Senior PM (Claude orchestrator)
**Audience:** Phill McGurk + parallel sessions/machines picking up DR-NRPG work
**Status:** Live working plan. Update as items ship. Newest decisions
at the top of each section.

---

## 0. Where we are

- 38+ PRs merged this sprint (PR #176 → #222), zero production
  incidents.
- Foundation Sprint at 10/10. Voice agents (Sarah/Olivia) live in
  ElevenLabs dashboard, web widget code shipped flag-OFF.
- ADR-011 (Path A funds-flow) **Accepted** — DR does NOT hold client
  funds; contractor bills client direct, DR takes per-job platform fee
  from contractor. No AML/CTF / AUSTRAC reg-change exposure.
- Production: GA4 (`G-98HWF2NV95`) + GTM (`GTM-KXB7RWXB`) live on
  `disasterrecovery.com.au`. Voice widget flag OFF until §3 below
  resolves.

## 1. Known harness gates (read first)

Two harness-layer gates affect what the agent can ship autonomously.
Future sessions hit the same walls — work around them, do not retry.

| Gate                                 | What it blocks                                                                                                       | Workaround                                                                                                                               |
| ------------------------------------ | -------------------------------------------------------------------------------------------------------------------- | ---------------------------------------------------------------------------------------------------------------------------------------- |
| **Self-modify own permissions**      | Agent cannot edit `~/.claude/settings.local.json` to grant itself permissions.                                       | Phill edits the file manually OR runs the PowerShell one-liner from PR #222 thread.                                                      |
| **Blind Apply / Shared-Infra Write** | Browser-driven changes to Resend, Cloudflare DNS, FB Business Manager, App Store Connect, Stripe billing dashboards. | **Hybrid mode:** agent reads + formats + verifies; Phill (or the other agent on machine 2/3/4) clicks the destructive Save/Apply/Submit. |

These gates do not lift with permission rules alone — they fire on the
_intent classifier_. Plan around them.

## 2. Available now (no gates — ship in sequence)

Ordered by leverage. Each item is self-contained — pick one and ship.

### 2.1 DR-700 D1-D5 strategy memo

- **What:** engineering-leadership memo recommending what the next
  5 days of work should optimise for (CWV vs Phase 2 TS vs voice GA vs
  decomposition vs persistence wiring).
- **Why now:** the team is between sprints. A short memo prevents
  drift across the 4 machines.
- **Output:** `docs/plans/2026-04-XX-d1-d5-recommendation.md` — under
  300 lines, opinionated, with a single-table tradeoff matrix.
- **Effort:** 1-2 hours.
- **Risk:** none — pure doc.

### 2.2 DR-458 Google Places API audit script

- **What:** read-only Node script (`scripts/audit-google-places.ts`)
  that pulls our GBP listing via `GOOGLE_PLACES_API_KEY`, checks
  rating + review-count drift vs the 24h cache in
  `app/api/rating/route.ts`, and flags anomalies.
- **Why now:** the cached endpoint is live but unverified against the
  upstream. If the GBP listing flips status, we want to know.
- **Output:** one new script + a `package.json` entry
  `audit:gbp-rating`. Logs to stdout only — no commits to compliance
  events.
- **Effort:** 2-3 hours.
- **Risk:** read-only API call, no infra writes.

### 2.3 DR-688 Equipped helper-wiring **status doc**

- **What:** doc only (not the wiring itself). Confirms the persistence
  helper at `src/lib/finance/persistence.ts` is the _intended_ surface
  for idempotent webhook upserts, but explains why the live submission
  path (`app/api/finance/referral/route.ts:202`) currently writes
  directly via `prisma.financeReferral.create()` — and why that is
  acceptable until the partner DPA finalises.
- **Why now:** `.context/domain-models.md` known-drift entry implies
  wiring is owed; readers think it is not done. It is partially done;
  the doc closes the comprehension gap.
- **Output:** `docs/decisions/finance-referral-persistence-state-2026-04.md`.
- **Effort:** 30 minutes.
- **Risk:** none.

### 2.4 DR-542 distressed-user UX protocol

✅ **DONE** — PR #222 open.

### 2.5 ScheduleWakeup / CCR follow-ups

Three CCR routines were scheduled in the prior session (May 4, May 4,
May 11). Verify they are still active in
`https://claude.ai/code/routines` before relying on them. If any
fired-and-disabled, re-arm.

## 3. Phill / counsel decisions (action by you, not the agent)

These do not move forward without you. Kept short.

| #   | Decision                                                                                                                                                                    | Why it matters                                                                                                                    | Recommendation                                                                                                                                                     |
| --- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| 3.1 | **Sign off ADR-011 (Path A)** — already Accepted in repo, but a one-line counsel email confirming "DR does not hold client funds" is the belt-and-braces.                   | Without it the AML/CTF posture rests on engineering's read of `business-rules.md` §2.                                             | Send the email this week.                                                                                                                                          |
| 3.2 | **Authorise dashboard hybrid mode**                                                                                                                                         | Unblocks DR-524 / 523 / 465 / 467 / 644 in §4 below. Without it, those tickets stall.                                             | Either (a) you drive Save buttons while agent reads, or (b) you give the agent your secondary "owner" Google account with reduced permissions on those dashboards. |
| 3.3 | **DR-509 Stripe test-mode keys** (`sk_test_*` / `pk_test_*`) into Vercel Preview env vars                                                                                   | Without it, preview deploys cannot exercise checkout flows end-to-end. Today previews silently fall back to production keys risk. | 5 minutes in Stripe dashboard + Vercel.                                                                                                                            |
| 3.4 | **Archive 7 legacy LearnDash products** in Stripe account `acct_1GNs4CC8kkd3m9ZX` (`prod_HL...` IDs)                                                                        | Stale products clutter the contractor onboarding picker. Manual archive only — not API-driven.                                    | 5 minutes in Stripe dashboard.                                                                                                                                     |
| 3.5 | **APP 8 consent wording final** — current canonical text is in `.claude/rules/compliance.md` §3 and matches `src/lib/voice/consent-utterance.ts`. Counsel one-line confirm. | Voice GA-launch blocker. Without confirmed wording, the widget flag stays OFF.                                                    | Counsel email same week as 3.1.                                                                                                                                    |

## 4. Dashboard tasks — hybrid mode

These ship faster than full-manual but slower than full-agent. The
agent prepares the change, you click the destructive button.

For each: agent navigates to the dashboard in the controlled tab,
reads the current state, formats the next action, screenshots the
result. You verify and click Save / Apply / Submit. Agent then verifies
post-state.

| Ticket | Surface                                             | Phill action (clicks)                                                  | Agent action (reads/formats)                                                                                              |
| ------ | --------------------------------------------------- | ---------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------- |
| DR-524 | Resend → Cloudflare DNS                             | Add DKIM TXT/CNAME record in Cloudflare; Save; click Verify in Resend. | Pulls DKIM record values from Resend; formats Cloudflare-ready JSON; verifies post-state.                                 |
| DR-523 | Microsoft Clarity + FB Pixel                        | Create Clarity project; create FB Pixel; copy IDs.                     | Lists exact env vars to set; pastes IDs into a `.env.production` template (gitignored); verifies via `<head>` inspection. |
| DR-465 | Facebook Business Manager — SAB                     | Convert Facebook page to Service Area Business; Save.                  | Reads current page metadata; flags any field mismatches with NAP constants.                                               |
| DR-467 | Apple Maps / Bing Places / True Local / Localsearch | Create / claim listings; submit.                                       | Pre-fills NAP, hours, categories; verifies listing status post-submit.                                                    |
| DR-644 | App Store Connect — privacy nutrition               | Tick the privacy data-collection boxes that match `/privacy`; Submit.  | Reads `/privacy` overseas-disclosure table; produces a click-by-click checklist matching the ASC form.                    |

Total Phill click time: ~30 min across all 5 if hybrid. Agent prep
adds ~30 min. Without hybrid: 4-6 hrs Phill solo.

## 5. Multi-week items (parallel session candidates)

These are bigger than one session. Each is a CCR candidate or a
standalone branch a parallel machine can take.

### 5.1 TS Phase 2 — clear remaining 173 `as any` casts

- **Status:** TS Phase 1 cleared 9 high-risk Type-A casts. 173 Type
  B/C/D remain. CI typecheck is a hard gate; once these clear,
  `next.config.mjs` `typescript.ignoreBuildErrors: true` can flip.
- **Effort:** 3-4 weeks phased. PR per file or per cluster.
- **Owner candidate:** machine 2 or 3. CCR routine already scheduled
  for May 11 — verify it fires.
- **Acceptance:** `npx tsc --noEmit` exits 0; `next.config.mjs` flag
  removed.

### 5.2 Vitest Batches 2-4

- **Status:** Batch 1 landed (10 tests on validation/payments).
  Batches 2-4 add 30 more across compliance, observability, voice,
  finance.
- **Effort:** 1-2 weeks ongoing.
- **Acceptance:** `npm run test:coverage` ≥80% on
  `src/lib/{validation,compliance,observability,payments}`.

### 5.3 Step2 / Step3 / Step4 onboarding decomposition (ADR-009)

- **Status:** Step5 done as the reference (PR Polish 7).
  Step0Eligibility (920 lines), Step2Company (784 lines),
  Step3Compliance (858 lines), Step4Background (806 lines),
  SubContractorManager (1,080 lines) all pending.
- **Effort:** 1 week per step. Five PRs.
- **Acceptance:** each step ≤200 lines per the ADR-009 pattern.

### 5.4 VoiceCall + CallTranscript retention cron

- **Status:** Prisma models landed (B13). Webhook extractor wiring
  landed in PR #219. DR-714 retention cron has a target but is not
  yet scheduled.
- **Effort:** 2-3 days.
- **Acceptance:** cron runs nightly, deletes transcripts older than
  retention window, writes `data_retention_run` event.

### 5.5 Lighthouse CWV optimisation

- **Status:** TTI 0.81 (target ≥0.9). Two unused-JS warnings, one
  legacy-JS warning, one render-blocking warning.
- **Effort:** 3-5 days.
- **Approach:** defer GTM; split recharts (already partially done in
  PR #220); dynamic-import framer-motion on non-critical paths.
- **Acceptance:** Lighthouse CI passes thresholds.

### 5.6 KPI-release fund transfer engine + Stripe Connect

- **Status:** Path A (ADR-011) means this is **NOT NEEDED** in the
  near term. DR does not hold funds; no transfer engine required.
  Park indefinitely unless ADR-011 reverses.
- **Recommendation:** delete from active backlog, archive notes.

### 5.7 Three remaining Stripe idempotency sites (booking + refund + transfers)

- **Status:** Most idempotency keys landed in PR #218-ish wave. Three
  call sites still create Stripe resources without a deterministic
  key.
- **Effort:** 4 hours.
- **Acceptance:** every `paymentIntents.create`, `subscriptions.create`,
  `transfers.create` uses a deterministic key.

## 6. Drift items in `domain-models.md` — current truth

Reconciling §"Known drift" against shipped reality:

| Drift item                                    | Doc status             | Reality                                                                                                                                           | Action                                                          |
| --------------------------------------------- | ---------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------- | --------------------------------------------------------------- |
| God components not yet decomposed             | Open                   | Step5 done (Polish 7); Step0/2/3/4/SubContractorManager pending.                                                                                  | Track under §5.3.                                               |
| Booking has no persistent model               | Open                   | Unchanged — `/claim` writes directly to `Claim`.                                                                                                  | Defer until scheduling/slot-hold is a real product requirement. |
| FinanceReferral in-memory only                | Marked resolved by B12 | **Partially misleading.** Live route already writes to Prisma directly; the helper at `persistence.ts` exists but is not wired to the live route. | Land §2.3 status doc.                                           |
| VoiceCall has no persistent model             | Marked resolved by B13 | Models + webhook wiring landed (PR #219). Retention cron NOT scheduled.                                                                           | Track retention cron under §5.4.                                |
| `compliance_events` raw SQL vs Prisma model   | Open                   | Unchanged.                                                                                                                                        | Future ADR. Not blocking anything.                              |
| Territory geofencing uses string suburb names | Open                   | Unchanged.                                                                                                                                        | Future PostGIS upgrade. Not blocking.                           |

## 7. Critical paths blocked on external action

Listed so they don't drift quietly.

- **Voice widget GA launch** — flag stays OFF until Phill confirms APP
  8 wording with counsel (§3.5).
- **Stripe Connect / KPI release** — parked indefinitely under Path A
  (§5.6).
- **DR-688 Equipped persistence wiring** — gated on partner DPA
  finalising. The status doc (§2.3) covers this.
- **Email deliverability (Resend DKIM)** — hybrid mode required (§4 row 1).

## 8. Ship sequence — what to do tomorrow

If you (or another machine) only has time for one thing, pick from
top:

1. ✅ Send counsel emails (§3.1, §3.5) — 15 min, unblocks voice + AML/CTF posture.
2. **Hybrid DR-524 Resend DKIM** (§4 row 1) — 30 min joint, unblocks email deliverability.
3. **Vercel: add Stripe test-mode keys** (§3.3) — 5 min, unblocks preview env.
4. **Stripe: archive 7 legacy products** (§3.4) — 5 min hygiene.
5. **DR-700 D1-D5 strategy memo** (§2.1) — 1-2 hr by an agent, calibrates next sprint.

Anything beyond #5 is multi-week; verify the May 4 / May 11 CCR
routines fire and let them work in parallel.

## 9. Out of scope (explicitly)

- Bulk migration of historical `contractorSubscription.amount` rows
  (separate ticket, low urgency).
- New feature work (DR-688 Equipped Phase 2 JWT handoff, voice agent
  live deployment, iOS app) — deferred until §3 decisions land.
- Marketing surfaces beyond the 4-week GBP pack (PR #221) — pick up
  next sprint.

---

## References

- `docs/plans/cryptic-fluttering-cray.md` — original 6-phase audit
  (most items shipped; check off remaining).
- `docs/distressed-user-protocol-2026-04-27.md` — DR-542 (PR #222).
- `docs/marketing/gbp-content-pack-2026-q2.md` — DR-453/447 (merged
  PR #221).
- `.claude/rules/compliance.md`, `business-rules.md`, `privacy.md`.
- `MEMORY.md` 2026-04-26 entry — voice widget production surface.
- `docs/adr/ADR-011-callout-fee-funds-flow.md` — Path A accepted.

_Update this file when items ship. New decisions at the top of each
section. The plan is living._
