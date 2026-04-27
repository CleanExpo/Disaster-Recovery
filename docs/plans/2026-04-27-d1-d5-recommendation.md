# D1-D5 Strategy Recommendation — Next Five Days

**DR-700 | Engineering leadership memo**
**Date:** 27 April 2026 (AEST)
**Author:** Senior PM (Claude orchestrator)
**Audience:** Phill McGurk (decision), other DR sessions/machines (execution)
**Time horizon:** 28 April → 2 May 2026

---

## TL;DR

**Spend D1 unblocking external dependencies. D2-D3 on Voice GA
launch. D4 on TypeScript Phase 2. D5 on Lighthouse CWV.**

Rationale below. The deliberate non-pick is decomposition (Step0/2/3/4
ADR-009) — high effort, low blast-radius value this week.

## What "between sprints" means right now

- Foundation Sprint complete (10/10).
- Health-check sprint shipped 38+ PRs over ~36 hours, 0 incidents.
- Voice agents live in ElevenLabs dashboard but flag-OFF in
  production until APP 8 wording confirmed by counsel.
- ADR-011 (Path A) Accepted — KPI-release engine + Stripe Connect
  parked.
- Two harness gates documented (see continuation-roadmap §1).

The team has bandwidth across 4 machines. The risk is drift —
4 machines pulling 4 directions. This memo is the alignment surface.

---

## Tradeoff matrix — five candidate workstreams

| Workstream                                      | Effort (days)            | Blast radius                                | Blocked by                                        | Net value this week |
| ----------------------------------------------- | ------------------------ | ------------------------------------------- | ------------------------------------------------- | ------------------- |
| **A. Voice GA launch (widget flag-ON)**         | 0.5 (code) + 1 (counsel) | Customer-facing — every claim entry         | APP 8 counsel confirm + Operator on-call coverage | **HIGH**            |
| **B. TypeScript Phase 2 (173 `as any`)**        | 5+                       | Internal (CI hard gate today is OFF)        | Nothing                                           | MEDIUM              |
| **C. Lighthouse CWV optimisation**              | 3-5                      | Customer-facing — TTI 0.81 → ≥0.9           | Nothing                                           | MEDIUM              |
| **D. ADR-009 step decomposition (Step0/2/3/4)** | 5+ (1/step)              | Internal (maintainability)                  | Nothing                                           | LOW                 |
| **E. Hybrid dashboard work (DR-524 et al.)**    | 1 joint (Phill clicks)   | Email deliverability + analytics + listings | Phill availability + harness hybrid mode          | HIGH per item       |

## Recommendation — D1 to D5

### D1 (Mon 28 Apr) — Unblock externals

- Phill: send counsel emails (ADR-011 Path A confirm + APP 8 wording
  confirm). 15 min.
- Phill: paste in MCP browser permissions (PowerShell one-liner from
  PR #222 thread) so D2 dashboard work is unblocked. 5 min.
- Phill: Vercel — add Stripe test-mode keys (DR-509) + flip
  `NEXT_PUBLIC_VOICE_WIDGET_ENABLED=true` on a Preview deploy. 10 min.
- Agent: hybrid DR-524 Resend DKIM (Phill clicks Save in Cloudflare,
  agent reads + verifies). 30 min joint.
- Outcome: voice GA-launch path cleared on a Preview deploy by
  end-of-day; production still flag-OFF.

### D2 (Tue 29 Apr) — Voice GA on production

Assumes D1 counsel emails returned positive.

- Agent: spec the Operator on-call rota for the first 7 days post-flag-flip.
  Documented under `docs/voice-ga-rollout-2026-04-29.md`. 2 hours.
- Agent: pre-flight verify all 7 acceptance tests in
  `docs/distressed-user-protocol-2026-04-27.md` §7 against the
  Preview deploy. 2 hours.
- Phill: flip `NEXT_PUBLIC_VOICE_WIDGET_ENABLED=true` in Vercel
  production. 1 minute.
- Phill: monitor `compliance_events` for first 4 hours via admin
  dashboard. Active.
- Outcome: voice widget GA on `/claim` and `/contractor/apply`.

### D3 (Wed 30 Apr) — Voice GA stabilisation + dashboards

- Agent: triage any incidents from D2 voice flip.
- Agent: hybrid DR-523 (Clarity + FB Pixel) + DR-465 (FB SAB
  conversion) + DR-467 Tier 2 directories. ~3 hrs joint.
- Outcome: full analytics surface live; FB + Apple Maps + Bing Places +
  True Local + Localsearch all listing DR.

### D4 (Thu 1 May) — TypeScript Phase 2 first wave

- Agent: cluster the 173 `as any` casts by file/feature. Output:
  `docs/typescript-phase-2-cluster-analysis.md`. 1 hour.
- Agent: ship first wave (~30-40 casts on highest-risk paths —
  webhook signature verification, payment validation, voice tool
  surface). Per-cluster PR. 4-5 hours.
- Outcome: ~20% of remaining casts cleared. Hard CI gate still off
  but the path is lit.

### D5 (Fri 2 May) — Lighthouse CWV

- Agent: defer GTM via `next/script` strategy="lazyOnload". 1 hour.
- Agent: dynamic-import framer-motion on non-hero paths (38 imports,
  6 already lazy). 3 hours.
- Agent: split recharts on remaining admin pages not in PR #220 wave.
  2 hours.
- Verify: Lighthouse CI passes thresholds (TTI ≥ 0.9, no
  render-blocking warnings, no legacy-JS warnings).
- Outcome: TTI improves from 0.81 toward ≥0.9. Customer-facing speed
  win.

---

## Non-picks (and why)

### Why not ADR-009 step decomposition this week

- Effort: 5+ days (1 per step × 4 steps minimum).
- Blast radius: internal-only. The god components work; they are
  hard to maintain, not broken.
- Better timing: after TypeScript Phase 2 lands. Strict types make
  decomposition mechanical instead of archaeological.
- Net: park until Phase 2 first wave proves the cluster pattern.

### Why not the helper-wiring PR (DR-688)

- Gated on partner DPA finalising (Equipped Commercial Finance).
- The status doc (PR #224) tells future agents not to wire eagerly.
- Park until the DPA lands.

### Why not new feature work (DR-688 Equipped Phase 2 JWT, iOS app)

- Health-check sprint flagged 5 P0/P1 items. Voice GA is the last
  P0 customer-facing item. Cleaner to close it before opening new
  surfaces.
- Park until D5 closes.

### Why not the retention cron (B13 follow-up)

- VoiceCall + CallTranscript persistence wiring landed in PR #219.
- Retention cron has a target (`docs/voice-retention-policy.md`) but
  the cron infra is not stood up. ~2-3 days of work to do
  end-to-end.
- Defer to next sprint. Voice GA gives 30 days breathing room
  (DR-714 retention is 7-year baseline; immediate cron is not
  load-bearing).

---

## Decision points for Phill

This memo recommends a path. Three forks where I want explicit input:

1. **Voice GA timing.** D2 production flip assumes counsel returns
   APP 8 confirm in 1 business day. If counsel is slow, D2 becomes
   "do D4 work" and voice GA shifts to next week. Confirm: is the
   counsel email in your queue today?
2. **Hybrid dashboard mode.** D1 + D3 assume you can spend ~30 min
   joint with the agent for clicks. If you cannot, D3 partially
   stalls. Confirm: are you OK being on-call for ~30-min sessions
   on D1 + D3?
3. **TypeScript Phase 2 cluster strategy.** D4 first wave targets
   high-risk paths (webhook sig verify, payment validation, voice
   tools). Alternative: target high-frequency paths (claim form,
   admin dashboard reads). I recommend high-risk because the cost
   of a silent runtime cast there is highest. Confirm: agree?

---

## Out of scope explicitly

- Marketing surfaces (next sprint).
- New Linear epic creation (the existing tickets cover everything in
  this memo).
- ADR-012 (Voice GA outcomes) — write it on D6 after one week of
  data, not today.
- Bulk historical contractorSubscription.amount migration (separate
  ticket, no urgency).

---

## References

- `docs/plans/2026-04-27-continuation-roadmap.md` — full roadmap (PR #223)
- `docs/distressed-user-protocol-2026-04-27.md` — voice + form (PR #222)
- `docs/finance-referral-persistence-state-2026-04.md` — DR-688 (PR #224)
- `scripts/audit-google-places.ts` — DR-458 (PR #225)
- `docs/adr/ADR-011-callout-fee-funds-flow.md` — Path A
- `MEMORY.md` 2026-04-26 — voice widget production surface
