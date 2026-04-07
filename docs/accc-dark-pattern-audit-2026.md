# ACCC Dark Pattern Audit — Disaster Recovery Australia Claim Intake Form

**Document type:** Internal compliance audit
**Scope:** `app/claim/ClaimFormClient.tsx` and `app/claim/PrivacyCollectionNotice.tsx`
**Audit framework:** ACCC dark pattern categories (2024–2027 enforcement priorities)
**Audit date:** 8 April 2026
**Prepared by:** Internal compliance review

---

## Executive Summary

This audit reviewed the Disaster Recovery Australia online claim intake form (`/claim`) against nine ACCC-identified dark pattern categories. The form serves disaster-affected consumers at a moment of acute distress, placing it within the ACCC's stated 2026–27 enforcement priority of **vulnerable consumer harm in digital markets**.

**Overall finding:** The form is substantially compliant. No manipulative dark patterns were detected. The form correctly discloses pricing upfront, presents all checkboxes in an unchecked state, provides a clear APP 5 privacy collection notice, and avoids confirmshaming language.

**Two areas require attention:**

1. A `PLATFORM_FEE` constant of `$2,750.00` is defined in code (line 33) and prominently displayed on the form, but the Step 4 "Total Due" line reads `$0.00 (submit now)`. This discrepancy — even though contextually explained — could confuse a consumer about when and whether they owe $2,750. The copy in Step 4 should be reconciled with the upfront pricing disclosure.

2. The "Initial phone contact within 60 MINUTES (GUARANTEED)" bullet at line 908 uses absolute guarantee language. Under ACL s29, this representation carries strict liability if not consistently met.

No pre-ticked checkboxes, no countdown timers, no confirmshaming, no forced continuity language, and no bait-and-switch conditions were found.

---

## Audit Findings

| # | Category | Finding | Status | Code Location |
|---|----------|---------|--------|---------------|
| 1 | **Drip pricing** | Platform fee breakdown ($550 + $2,200) is displayed upfront in a prominent banner before the user completes Step 1. Pricing is itemised and the contractor-retained portion is clearly distinguished. However, Step 4 shows "Total Due: $0.00 (submit now)" which conflicts with the $2,750 disclosed earlier. The form currently bypasses Stripe payment (lines 257–259 send `paymentConfirmed: false, paymentAmount: 0`). This appears to be an unfinished payment flow rather than a deliberate drip reveal, but requires remediation before launch to avoid consumer confusion. | **REVIEW NEEDED** | `ClaimFormClient.tsx` lines 33, 398–422, 960–965 |
| 2 | **False urgency** | No countdown timers detected. No "only X spots left" copy. No artificial scarcity language. The post-submission "60 MINUTES" contact claim (line 908) reflects a stated service commitment rather than a manufactured urgency trigger, but see Category 2 note on guarantee language below. | **PASS** | — |
| 3 | **Pre-ticked checkboxes** | All checkboxes initialise to `false` in `formData` state (lines 206–221). This covers: `hasInsurance`, `hasPhotos`, `authorizePropertyAccess`, `authorizeInsuranceLiaison`, `authorizeWorkCommencement`, `understandPlatformRole`, `acceptContractorCommunication`, `agreeToTerms`, `privacyCollectionNotice`. The damage-type checkboxes (lines 621–637) also initialise empty. No pre-selected consent was found. | **PASS** | `ClaimFormClient.tsx` lines 194–222 |
| 4 | **Obscured unsubscribe/cancel** | The form does not establish any subscription or recurring service. No ongoing commitment is entered into via this form. The platform fee structure is disclosed and the form can be abandoned at any step without submission. No "cancel" path is obscured. | **PASS** | — |
| 5 | **Confirmshaming** | No decline buttons detected. No negative framing on secondary options. The "Previous" navigation buttons use neutral labels. No "No thanks, I don't want help" or equivalent language found. | **PASS** | `ClaimFormClient.tsx` lines 795, 919 |
| 6 | **Misleading visual hierarchy** | The primary submission CTA ("Submit Claim", green) and the "Previous" navigation (outline variant) are visually differentiated using standard button variants — this is appropriate and expected for multi-step form navigation, not a dark pattern. The payment section in Step 4 presents only one payment option (credit card), which is not manipulative given there is currently no actual payment being processed. No secondary option is obscured. | **PASS** | `ClaimFormClient.tsx` lines 971–980, 1015–1021 |
| 7 | **Bait-and-switch** | The service described at intake (contractor matching, emergency make-safe, 60-minute contact) is consistent throughout all four steps. The platform role is disclosed proactively via an `AlertTriangle` banner on entry and again in Step 3. No promised service or price is contradicted at checkout. The Step 4 "Total Due: $0.00" inconsistency (see Category 1) is a payment-flow gap rather than a bait-and-switch; the $2,750 fee is disclosed early and not withheld until the final step. | **PASS (with caveat)** | See Category 1 |
| 8 | **Forced continuity** | No subscription language, recurring billing, or trial-to-paid conversion structure is present. The platform fee is a one-time charge for contractor matching. The contractor's subsequent work is under a separate direct contract. No ongoing commitment is implied or required by this form. | **PASS** | — |
| 9 | **Vulnerable consumer harm** (ACCC 2026–27 priority) | The form targets disaster-affected homeowners — a population the ACCC has explicitly flagged as vulnerable in its 2026–27 enforcement priorities. The form mitigates this risk through: (a) multilingual privacy notice (APP 5 compliance, `PrivacyCollectionNotice.tsx`); (b) explicit platform-role disclaimer on form entry; (c) required acknowledgement of contractor independence; (d) no artificial urgency or pressure techniques. The "60 MINUTES (GUARANTEED)" text (line 908) creates a heightened consumer expectation that may not be consistently met — see Recommendation 2. Overall, the design respects the consumer's distress rather than exploiting it. | **PASS (with recommendation)** | `ClaimFormClient.tsx` line 908 |

---

## Recommendations

### Recommendation 1 — Priority: HIGH
**Reconcile the $2,750 pricing disclosure with Step 4 "Total Due: $0.00"**

The form prominently discloses a $2,750 fee upfront (the ACCC-compliant approach), then presents "Total Due: $0.00 (submit now)" in Step 4. Before enabling Stripe payment, the Step 4 summary must accurately reflect the amount charged. Options:
- If the form is intentionally a "claim intake only" (no immediate payment), remove the "Emergency Make-Safe Fee: $2,750.00" pricing banner, or replace it with language explaining that payment is arranged separately after contractor matching.
- If payment is charged at submission, the Step 4 "Total Due" must show $2,750.00.

Leaving this inconsistency in place risks an ACCC finding that consumers were induced to submit under one price understanding and then charged a different amount.

### Recommendation 2 — Priority: MEDIUM
**Remove or qualify the "60 MINUTES (GUARANTEED)" language**

ACL s29 prohibits false representations about the characteristics of services. The "GUARANTEED" label at line 908 constitutes a strict-liability representation that the assigned contractor will make phone contact within 60 minutes of every submission. If this commitment cannot be met in all cases (after-hours, high-demand periods, remote areas), the language exposes the business to misleading conduct claims. Replace with: "Your contractor will aim to contact you within 60 minutes during business hours."

### Recommendation 3 — Priority: LOW
**Document the multilingual privacy notice translation mechanism**

The `PrivacyCollectionNotice.tsx` component uses an AI translation hook (`useLanguage`) to render the APP 5 notice in the consumer's selected language. While this is commendable, the accuracy of machine-translated legal consent notices carries risk. Consider: (a) having the most common non-English translations professionally reviewed; (b) adding a note that the English version governs in case of any translation discrepancy.

### Recommendation 4 — Priority: LOW
**Add a visible opt-out/withdrawal-of-consent pathway**

The form requires `privacyCollectionNotice` acceptance to proceed. Once a claim is submitted, there is no visible pathway on the form or confirmation page to withdraw consent or request data deletion. The Privacy Policy link is included in the collection notice, but a dedicated "Your Privacy Rights" or "Contact Us" prompt on the success screen would strengthen APP compliance and signal good faith to the ACCC.

---

## Summary Table

| Category | Status |
|----------|--------|
| Drip pricing | REVIEW NEEDED |
| False urgency | PASS |
| Pre-ticked checkboxes | PASS |
| Obscured unsubscribe/cancel | PASS |
| Confirmshaming | PASS |
| Misleading visual hierarchy | PASS |
| Bait-and-switch | PASS (with caveat) |
| Forced continuity | PASS |
| Vulnerable consumer harm | PASS (with recommendation) |

**Overall rating: Substantially compliant. Two items require remediation before payment activation.**

---

## Sign-Off

Audit conducted: **8 April 2026**
Next review due: **8 October 2026** (or upon any material change to the claim intake form)

> This is an internal document prepared for compliance purposes. It does not constitute legal advice. For matters of legal risk or regulatory exposure, consult qualified Australian legal counsel with experience in Australian Consumer Law and ACCC enforcement.
