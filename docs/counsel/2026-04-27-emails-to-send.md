# Counsel Emails — Ready to Send

**Date prepared:** 27 April 2026 (AEST)
**Prepared by:** Senior PM (Claude orchestrator)
**For:** Phill to copy-paste, edit minimally, send.

Two emails. Send both today if possible — D2 voice GA launch in the
D1-D5 plan depends on Email 2 returning a confirm in 1-2 business
days.

Substitute the placeholders in `[BRACKETS]` before sending.

---

## Email 1 — ADR-011 (Path A funds-flow) sign-off

**To:** [counsel@firm.com.au]
**From:** Phill McGurk
**Subject:** Disaster Recovery — funds-flow architecture sign-off (Path A)

Hi [Counsel],

Following our earlier discussion about the Disaster Recovery / NRPG
client-callout fee architecture, we have decided to proceed with
**Path A** (the lower-regulatory-exposure option).

Briefly:

- Contractor charges the client directly via the contractor's own
  merchant account.
- Disaster Recovery collects a per-job platform fee from the
  contractor (not from the client).
- Disaster Recovery is **not** in the funds path between client and
  contractor at any point.
- We do **not** hold any client funds in escrow, nor do we settle
  client funds into our Stripe balance.

This aligns with our published business-rules document
(network-orchestrator model) and avoids the AML/CTF + financial-
services questions that the alternative ($2,750 settling into DR's
Stripe balance, then released on KPI completion) would have raised.

The decision is captured in our internal architectural decision
record (ADR-011), and the engineering team has stopped work on the
KPI-release transfer engine and Stripe Connect onboarding.

**The ask:**

Could you confirm in a one-line reply that:

1. You have no concerns with the Path A architecture as described; and
2. You agree no AML/CTF registration or financial-services licence is
   required while we operate purely as a network orchestrator (no
   client funds touch our balance).

If you would like the full technical briefing (the document organised
the question for legal review), let me know — happy to forward it.

Thanks,
Phill McGurk
Founder, Disaster Recovery / National Restoration Professionals Group
[mobile]

---

## Email 2 — APP 8 voice consent wording sign-off

**To:** [counsel@firm.com.au]
**From:** Phill McGurk
**Subject:** Disaster Recovery — APP 8 voice consent wording sign-off

Hi [Counsel],

We are about to switch on a voice AI assistant (Sarah) on our claim
intake page. Australian Privacy Principle 8 (cross-border disclosure)
requires us to obtain caller consent before any personal information
is processed by an overseas provider — in our case, ElevenLabs (US)
for the speech model.

The wording we plan to play as the **first utterance after pickup,
before Sarah accepts any input** is:

> "Hi, you've reached Disaster Recovery. This call may be handled by
> an AI assistant and recorded so we can help you. Your information
> may be processed by our technology providers overseas under the
> Australian Privacy Principles. Is that OK to continue? You can
> press 0 at any time to speak to a person."

If the caller declines (says "no", presses 0, or stays silent past 8
seconds), the call is routed straight to a human callback queue —
**no LLM processing occurs, no audio is sent to the model**. We log a
`consent_declined` event with no PII attached.

The wording is mirrored on our `/privacy` page, in the overseas-
disclosure table, alongside a list of the providers and the
jurisdictions involved.

**The ask:**

Could you confirm in a one-line reply that:

1. The wording above satisfies APP 8 cross-border consent
   requirements as the first utterance gate; and
2. The "decline → human callback, no LLM processing" route is
   sufficient to ensure non-consenting callers' personal information
   is never disclosed cross-border.

If you would like to see the technical implementation (the consent
gate runs before the ElevenLabs script even loads), I can send the
ADR (ADR-003) and the relevant code references.

Once you confirm, we are ready to flip the production flag. Targeting
this Tuesday 29 April; happy to delay if you need more time.

Thanks,
Phill McGurk
Founder, Disaster Recovery / National Restoration Professionals Group
[mobile]

---

## After sending

Update `MEMORY.md` with the date emails went out. When responses
return:

- **Path A confirm** → mark ADR-011 status from "Accepted" to
  "Counsel-confirmed" + note the date.
- **APP 8 confirm** → flip `NEXT_PUBLIC_VOICE_WIDGET_ENABLED=true` in
  Vercel production, follow the D2 plan in
  `docs/plans/2026-04-27-d1-d5-recommendation.md`.

If counsel pushes back on either, escalate to a follow-up session and
update `docs/plans/2026-04-27-continuation-roadmap.md` §3.

## Why two separate emails

You could merge them into one. Don't — for two reasons:

1. **Different decision rights.** ADR-011 is a corporate-strategy
   confirm (one-line agreement on a posture you've already decided).
   APP 8 is a wording confirm (counsel may want to redline).
   Separating them means the easy one returns fast.
2. **Audit trail.** Each email = one decision = one filing line. If
   regulators ever ask "show me your APP 8 sign-off" or "show me your
   AML/CTF posture sign-off", the two emails are distinct
   documentary records.
