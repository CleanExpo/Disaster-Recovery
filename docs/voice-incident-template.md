# Voice Agent Incident Report

**NOT LEGAL ADVICE.** Copy this file for each incident; fill in within 24 hours of the reset. See `docs/voice-kill-switch-runbook.md`.

---

## Example — filled-in report

**Incident ID:** VOICE-2026-04-23-001
**Date/time (AEST):** 2026-04-23 14:37
**Reported by:** Phill McGurk
**Severity:** P1 (data leak risk)

### Layer used

Layer 2 — in-app circuit breaker trip via `/api/admin/voice/kill-switch`. Elapsed time from detection to trip: **22 seconds**.

### Who authorised

Phill McGurk (owner). Paged via Slack at 14:36; trip executed at 14:37. Written approval recorded in this report per runbook section 2.

### Trigger

Caller complaint received via the `/claim` form at 14:34: "The AI told me another claimant's street address." Call recording ID `call_a9f2...` confirmed at 14:36 that the agent read back an address belonging to a different lead due to a context-handoff bug in the session state.

### Caller impact

- 1 confirmed caller exposed to another caller's suburb + street (no given name, no phone number, no policy number).
- No other callers affected in the 30-minute window prior (verified via call log review at 15:05).
- Caller contacted by ops lead at 15:20 with an apology and a written explanation.

### Data-breach risk assessment

- **Data disclosed:** one Australian street address (suburb + street + number), no name, no contact details, no claim details.
- **OAIC notifiable data breach threshold:** reviewed — does not meet "likely to result in serious harm" threshold on its own. Documented decision under APP 11 / Part IIIC of the Privacy Act. Compliance lead concurred at 15:45.
- **Decision:** self-report to OAIC not triggered; retained in incident log for pattern review at the next quarterly compliance review.
- **Caller notification:** completed (see above).

### Follow-up actions

- [x] Layer 2 trip executed (14:37).
- [x] Layer 3 ElevenLabs disable executed as defence in depth (14:41).
- [x] Caller contacted and apology issued (15:20).
- [x] Call recording preserved under legal hold.
- [ ] Root-cause fix for session-context bleed (assigned: eng lead, Linear DR-XXX).
- [ ] Unit + integration test reproducing the context-handoff bug before reset (DR-XXX).
- [ ] Reset breaker only after the fix is deployed and verified.
- [ ] Add a synthetic Layer 5 tripwire for "agent reads back a value not in the current session" (DR-XXX).

### Root cause

Session state was keyed on Twilio `CallSid` but the handoff from the IVR to the voice agent reused a previous `CallSid` in memory under load, causing the agent to hydrate from the wrong lead record. Reproducible under concurrent-call stress.

### Preventive measures

1. Namespace session state by `CallSid + start_timestamp`; never reuse.
2. Assert at agent-start that the hydrated lead's `phone_number` matches the current Twilio `From`; trip Layer 5 automatically on mismatch.
3. Add concurrency test to CI (10 overlapping sessions, assert no cross-contamination).
4. Quarterly drill this layer (Layer 5 automated trip on mismatch) at the next Q3 drill.

### Reset

- **Reset time:** 2026-04-24 09:15 (after fix deployed at 09:02 and smoke-tested).
- **Reset by:** Phill McGurk (`authorization` + `x-reset-secret` both presented).
- **Total downtime:** 18h 38m.

---

## Blank template

Delete the example above when filing a new incident and fill in:

**Incident ID:** VOICE-YYYY-MM-DD-NNN
**Date/time (AEST):**
**Reported by:**
**Severity:** P0 / P1 / P2

### Layer used

### Who authorised

### Trigger

### Caller impact

### Data-breach risk assessment

- Data disclosed:
- OAIC notifiable data breach threshold review:
- Decision:
- Caller notification:

### Follow-up actions

- [ ]
- [ ]

### Root cause

### Preventive measures

### Reset

- Reset time:
- Reset by:
- Total downtime:
