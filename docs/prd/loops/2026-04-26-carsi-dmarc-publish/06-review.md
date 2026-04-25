# Phase 6 — Review

**Loop:** `2026-04-26-carsi-dmarc-publish`
**Skill invoked:** `improve-codebase-architecture` (process review for the loop system).

## What went well

- Smallest loop yet — one DNS record, one verification path. Came in well under the ~8k token budget.
- Grill-me produced a defensible record on the first pass (`p=none` + strict alignment + `fo=1` + no `ruf=`). No regrets in the final string.
- Natural continuation from L3 (DKIM enable) — skeleton was already on main, no cold-start cost.
- MXToolbox as a third-party validator gave us an objective pass signal that doesn't require the MUA.

## What went wrong

1. **OWA session expiry blocked the end-to-end verification.** The original Phase 5 success criterion was "DMARC: PASS in Gmail headers". I couldn't drive it to completion because Microsoft logged Phill out of OWA mid-loop and I cannot type passwords.

   **Fix going forward:** for loops that require a signed-in MUA send as final verification, check session freshness in Phase 4 BEFORE making the change, not after. If OWA isn't currently logged in, either (a) ask Phill to log in as the first step, or (b) re-scope the verification contract to third-party validator only.

2. **Gmail search for the post-DMARC test email returned stale results.** Phill reported sending; search didn't surface a new one. Could be (a) the email is still in Gmail's ingest queue, (b) search hadn't indexed it yet, (c) a different sender address. Not diagnosed in loop.

   **Fix going forward:** for end-to-end email verification, allow 2-5 minutes between send and search, and search by `newer_than:5m` rather than `newer_than:1d`.

## Residual debt

1. **DMARC=PASS on real Gmail headers** — deferred to next organic send. If it fails, open a remediation loop (likely a strict→relaxed alignment flip on `aspf` or `adkim`).
2. **Aggregate report ingestion** — `rua=mailto:phill.m@carsi.com.au` will start producing XML reports within 24-48h of the first authorised recipient processing a carsi.com.au mail. No tooling in place to parse them yet. Future loop if volume justifies.
3. **Policy tightening** — `p=none` is observability. After 2-4 weeks of clean aggregate reports, tighten to `p=quarantine pct=10` then `p=reject`. Scheduled as separate future loop, not debt from this one.

## Compliance audit

| Check                              | Result                                         |
| ---------------------------------- | ---------------------------------------------- |
| No secret values logged            | ✅                                             |
| No repo code modified              | ✅ (docs only)                                 |
| AU English in loop docs            | ✅                                             |
| NOT LEGAL ADVICE footer in handoff | ✅                                             |
| DNS change reversible              | ✅ (TXT record; deletable in DO UI in seconds) |

## Loop-system amendments to propose

- **PRD §8 verification contract:** for loops whose final verification requires an authenticated MUA (OWA, Gmail web, etc.), add a pre-flight check in Phase 4: "confirm relevant session(s) are live before making the mutation, so final verification isn't blocked by session expiry".
- **PRD §6 token budget:** estimate was ~8k, actual ~7k. Accurate.

## Exit gate

- [x] Decisions + deferrals documented.
- [x] Residual debt tracked with explicit decisions.

**Proceed to Phase 7 — Handoff.**
