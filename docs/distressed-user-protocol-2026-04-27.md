# Distressed User Protocol — Voice + Claim Form

**DR-542 | Successor to `distressed-user-protocol-2026-04-12.md`**
**Date:** 27 April 2026 (AEST)
**Scope:** Voice surface (Sarah / Olivia web widget) + multi-step `/claim`
form. Event pages are covered by the 12 April doc and are referenced
here, not duplicated.
**Audience:** product, voice-agent prompt authors, claim-form
maintainers, contractor onboarding maintainers.

> **NOT LEGAL ADVICE.** Compliance constraints (ACL s18/s29, APP 3 / 5 /
> 8, IICRC) are resolved by `.claude/rules/compliance.md` and counsel.
> This doc is the UX protocol that wraps those constraints so a
> traumatised caller experiences them as humane, not as a wall.

---

## 1. The user we are designing for

A Client filing a Claim during or after an active disaster event is in
crisis. Working assumptions for every surface in this protocol:

- **Single-hand operation.** The caller may be holding a torch, a child,
  or a pet. The other hand may be wet, gloved, or holding a phone.
- **Degraded connectivity.** 3G fallback, intermittent drops, mobile
  black spots near flood-affected substations.
- **Acute cognitive load.** Working memory is occupied by the event.
  Plain language, short sentences, one decision at a time.
- **Time pressure.** Make-safe is hours-not-days. Every screen of friction
  costs minutes the caller does not have.
- **Compliance is non-negotiable.** APP 8 consent gate must still fire
  before any LLM processing (see `.claude/rules/compliance.md` §3).
  The protocol is HOW we deliver it humanely, not WHETHER.

The protocol below is the contract: any deviation is a P1 bug.

---

## 2. Cross-cutting principles

These apply everywhere — voice, claim form, event pages.

1. **Single-tap escape to human.** Every screen, every voice turn — the
   caller can press 0 (voice) or tap a single visible "Speak to a person"
   control (web) and reach an Operator without re-entering anything they
   already gave us.
2. **No surprise modals.** Cookie banners, consent gates, and policy
   acknowledgements appear at known points (`/claim` step 0, voice
   first utterance) and never mid-flow.
3. **Plain language, Year 9 reading level.** No legalese in the
   distressed path. Legal text lives behind clearly labelled links
   (`Read the privacy notice`), not inline.
4. **Auto-save on every step.** State is preserved on a per-step basis
   and survives page reload, network drop, and session expiry. The
   caller never types anything twice.
5. **Progress is visible.** The caller can see how many steps remain
   and how much they have already completed.
6. **Errors are diagnostic, not blaming.** "We could not save that
   step" — never "Your input was invalid". Tell the caller what to do
   next, not what they did wrong.
7. **No banned phrases, no time guarantees.** Per
   `.claude/rules/compliance.md` §1: never "fastest response", never
   "guaranteed", never "insurance approved". Use "rapid response where
   possible", "IICRC-certified", "eligibility subject to assessment".

---

## 3. Voice surface (Sarah on `/claim`, Olivia on `/contractor/apply`)

The voice widget is the highest-stakes distressed path. The
`<VoiceConsentModal>` runs the APP 8 consent gate BEFORE the
ElevenLabs script loads (per MEMORY.md 2026-04-26 entry).

### 3.1 Consent gate — distressed-caller behaviour

The canonical APP 8 wording (`compliance.md` §3) is non-negotiable. The
behaviour around it is the protocol:

- **Auto-cancel on silence:** if the caller does not respond within 8
  seconds, treat as decline → no LLM, no widget script load, fall back
  to the visible callback-request CTA on the page.
- **Esc key dismisses on web.** Pressing 0 dismisses on Twilio (when we
  ship Twilio). Both routes log a `consent_declined` event with no PII.
- **Re-attempt is one tap, not five.** If the caller dismissed by
  accident, the widget shows a "Try again" button. We do not auto-prompt.
- **Decline → human handoff.** Decline routes to a callback-request form
  with three fields: name, mobile, suburb. Anything more is friction.

### 3.2 Sarah / Olivia turn-level behaviour

The 5-tool surface (`capture_contact` / `capture_property` /
`capture_damage` / `escalate_to_human` / `end_call`) must NOT block the
caller from escalating. Specific rules:

- **`escalate_to_human` is always available.** It is in the system
  prompt, not gated on having captured contact details first. A
  caller saying "I just need a person" reaches a person.
- **No upsell, no cross-sell.** Sarah does not mention finance, does
  not mention contractor membership, does not promote anything. She
  captures damage and escalates.
- **Pricing is silent.** Per `business-rules.md` §3, the voice agent
  may NOT quote any price — not even an "indicative range". If asked,
  the response is fixed: "I can't quote on a specific job. A
  contractor will give you a written scope of works on site."
- **Repeats are normal, not penalised.** If a caller restates a damage
  detail three times, Sarah captures the latest version and does not
  flag it. Distress causes repetition; do not pathologise it.
- **Hang-ups are a recoverable state.** A dropped call mid-capture
  produces a Draft claim (suburb known) or an Enquiry (suburb not
  known) per `UBIQUITOUS_LANGUAGE.md`. Either is dispatchable to a
  human callback within Operator working hours.

### 3.3 Signals we listen for (not yet shipped — tracked under DR-542)

The voice agent prompt does NOT do sentiment analysis today. The
following are documented as intended behaviours for a follow-up prompt
revision — gated on Operator review:

- **Crying, sobbing, panic breathing** — Sarah pauses, says one short
  reassurance ("Take your time. I'm still here."), and waits up to 12
  seconds before re-prompting.
- **"I can't do this right now"** — immediate `escalate_to_human`. No
  retry, no clarification.
- **Mention of injury or active danger** — Sarah does NOT triage
  medical or fire emergencies. She says: "Please hang up and call
  triple zero now. I'll keep your details so we can call you back."
  Then `end_call` with a `safety_handoff` flag in `compliance_events`.

These are RECOMMENDED for the next Sarah prompt revision (DR-709
follow-up). They are NOT in production today.

---

## 4. Claim form (`/claim` — multi-step)

The claim form is a fallback for callers who don't want voice or arrive
outside working hours. Per `business-rules.md` §6 it is the primary
intake surface.

### 4.1 Hard requirements

- **Step 0 is consent + scope, not data entry.** "We'll ask for X, Y, Z
  to dispatch a contractor. Your information stays with us and the
  contractor we match you with." One Continue button. One privacy link.
- **Auto-save fires on field blur, not on submit.** A caller who fills
  three fields and closes the tab can resume from those three fields.
  State key: `localStorage` keyed on a Draft claim ID (anonymous; no
  PII).
- **Mandatory fields are minimum-viable.** Per `domain-models.md`: a
  Claim is `submitted` with client contact + incident type + loss
  address + consent flags. Anything beyond this is OPTIONAL on first
  pass and prompted later by the Operator.
- **A "Speak to a person" CTA is on every step.** Tapping it captures
  whatever the caller has filled in so far as a Draft claim and routes
  to the callback queue.

### 4.2 Error states

- **Validation errors:** inline, under the offending field, in plain
  language. "We need a postcode so we can match a contractor." Not
  "Invalid postcode format."
- **Submit failures:** the form does NOT lose state. The retry button
  resubmits the same payload. After 3 failed retries, the form pivots
  to "We're having trouble. Tap here for a callback." with the Draft
  claim already populated.
- **Network drops mid-step:** auto-save means the next page load
  resumes where the caller was. A small banner: "We saved your
  progress." No data-loss panic.

### 4.3 Field-level guidance

- **Address:** accept partial input (suburb + postcode is sufficient
  for triage). Per `business-rules.md` Make-safe stage, a contractor
  finalises the address on arrival. Do not block on street number.
- **Insurer:** optional. If the caller does not know, the form does
  not block. Operator can capture later. Never imply DR has any
  relationship with the insurer (compliance.md §1 banned phrases).
- **Damage description:** free text. Up to 1,000 characters. Voice
  intake (if used) writes here directly. Do not enforce a minimum
  length — "water through the roof" is a complete description.

---

## 5. Event pages (covered by 12 April protocol)

Refer to `distressed-user-protocol-2026-04-12.md` for:

- Primary CTA above the mobile fold (390×844).
- Form state preservation across network drops.
- Footer touch target sizing (44×44 minimum).
- Hero copy clarity under cognitive load.
- Page length vs critical-path placement.

These are not duplicated here. The 12 April doc is the source of truth
for the `DisasterEventPage` template.

---

## 6. Compliance event logging — distressed-path additions

Per `privacy.md` §5, the redactor + compliance_events writer already
handles the standard event types. The distressed protocol adds NO new
event types — it reuses existing ones with specific `meta` fields:

| Surface          | Event reused           | `meta` additions                                            |
| ---------------- | ---------------------- | ----------------------------------------------------------- |
| Voice consent OK | `privacy_notice_shown` | `consentMethod: 'voice_widget'`, `responseTimeMs`           |
| Voice decline    | `privacy_notice_shown` | `consentMethod: 'voice_widget'`, `outcome: 'declined'`      |
| Voice escalate   | `voice_tool_call`      | `toolName: 'escalate_to_human'`, `reason: 'caller_request'` |
| Voice hang-up    | `voice_tool_call`      | `toolName: 'end_call'`, `state: 'caller_hung_up'`           |
| Form auto-save   | (none — local only)    | `localStorage`; never logged server-side                    |
| Form submit      | `claim_submitted`      | (existing fields)                                           |
| Callback request | `claim_submitted`      | `intakeMode: 'callback_only'`                               |

No raw PII reaches `compliance_events` — the redactor (DR-714) runs on
every payload before insert.

---

## 7. Acceptance tests (manual — pre-flight before any release)

Run these tests on the production deploy before promoting any change
that touches `/claim`, the voice widget, or `DisasterEventPage`:

1. **Voice widget consent — silence path.** Open `/claim` on a 390×844
   viewport. Click the voice widget trigger. Wait 8 seconds without
   responding. Verify: no EL script loads, no audio plays, callback CTA
   visible.
2. **Voice widget consent — decline path.** Same setup. Press Esc on
   the consent modal. Verify: no script load, modal dismisses,
   `consent_declined` event in `compliance_events` with no PII.
3. **Form auto-save — tab close.** Start `/claim` step 1. Fill
   suburb + postcode. Close tab. Reopen `/claim`. Verify: those two
   fields are pre-populated, focus is on the next empty field.
4. **Form network drop.** Open DevTools → Network → Offline. Submit
   step 1. Verify: error banner appears, retry button visible, form
   data NOT cleared. Re-enable network. Tap retry. Verify: submit
   succeeds.
5. **Single-tap escape — voice.** Mid-conversation with Sarah, say
   "I just need a person." Verify: `escalate_to_human` fires within
   one turn, no clarifying question, no contact-detail capture
   prompt blocking the escalation.
6. **Single-tap escape — form.** Mid-step, tap "Speak to a person".
   Verify: callback form appears with whatever was filled so far
   pre-populated, including the Draft claim ID for Operator linkage.
7. **No banned phrases.** `grep -i "fastest response\|guaranteed\|insurance approved" /claim /contractor/apply` → 0 matches in
   rendered HTML.

A failed test = release blocked. No exceptions.

---

## 8. Open follow-ups (tracked, not blocking)

These are documented intentions, not commitments:

- **DR-709 follow-up:** ship the voice prompt revisions in §3.3 (crying
  / "I can't do this" / safety handoff) once Operator + counsel
  review the wording.
- **Form `localStorage` retention:** today auto-save persists
  indefinitely client-side. Decide: 7-day expiry vs 30-day vs
  session-only. Recommend 7-day with a banner explaining the trade-off.
- **Callback queue working hours:** publish the actual cut-off times
  on `/claim` step 0. Today the page implies 24/7 callback; the queue
  is not.
- **Mobile font sizing:** verify all distressed-path text meets WCAG
  AA at 100% zoom AND at 200% zoom. The 12 April audit covered
  layout; font scaling under zoom was not exhaustively tested.
- **Voice + form bridge:** if a caller declines voice consent, we
  currently route to a callback form. Consider auto-populating the
  callback form with the suburb the caller was geo-located to, so
  they have one less field to fill.

---

## References

- `docs/distressed-user-protocol-2026-04-12.md` — event pages.
- `.claude/rules/compliance.md` §1, §3 — banned phrases + APP 8 consent.
- `.claude/rules/privacy.md` §4, §5 — voice agent + compliance_events.
- `.claude/rules/business-rules.md` §3, §6 — quoting + intake surfaces.
- `UBIQUITOUS_LANGUAGE.md` — Enquiry / Lead / Claim / Draft claim
  promotion rules.
- `docs/adr/ADR-003-voice-agent-consent-and-data-boundary-model.md`.
- `MEMORY.md` 2026-04-26 entry — voice widget production surface.
