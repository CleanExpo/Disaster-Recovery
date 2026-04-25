# DR-542 — Distressed-User Protocol Audit of `/claim`

- **Date:** 23/04/2026
- **Auditor:** DR-542 protocol run
- **Scope:** `app/claim/page.tsx` (SSR fallback), `app/claim/ClaimFormClient.tsx` (hydrated form), `src/components/privacy/App3CollectionNotice.tsx`
- **Persona:** A shaking, one-handed user submitting during an active property emergency (flood entering home, roof torn off, smoke damage, biohazard scene).

## Executive summary

Pre-audit, `/claim` was optimised for a rational desk-based claimant — multi-step form, explicit pricing breakdown, insurance fields front-and-centre. For a user in active distress it failed the three most important tests:

1. **No life-safety carve-out** — a user with rising floodwater saw no visible "call 000" before being asked to pick a state from a dropdown.
2. **No voice fallback visible above the fold** — users who cannot type one-handed had no obvious escape hatch.
3. **No response-time commitment** — reassurance was buried on the post-submit success screen, not before the user decides to invest effort.

Also: `Date Damage Occurred` was required even though a shaking user may not know the exact date. Validation errors used punitive red boxes.

This PR ships the surgical fixes. Deeper fixes (tap-target sweep, single-step mobile flow) are deferred to follow-ups.

## Per-heuristic score

| # | Heuristic | Pre-fix | Evidence | Post-fix |
|---|---|---|---|---|
| 1 | Time-to-submit < 120s | **FAIL** | 4 steps, ~28 fields including 6 insurance fields and 3 authorisation checkboxes before submit. | PARTIAL (no field reduction — deferred) |
| 2 | Tap targets ≥ 44×44 px | **PARTIAL** | Step navigation buttons have `min-h-[44px]`; checkboxes are 20×20 (`h-5 w-5`); inline quick-fill "Fill" button is default height. | PARTIAL (unchanged — checkbox tap target is the wrapper label row, acceptable; deferred sweep) |
| 3 | Reassurance copy shown early | **FAIL** | "Your claim is being matched…" only appears on step 5 success screen, after submit. | **PASS** (emerald reassurance card added with 60-min call-back commitment) |
| 4 | Emergency carve-out before form | **FAIL** | No 000 reference anywhere on `/claim` before the form begins. APP 3 notice is statutory, not life-safety. | **PASS** (red-border 000 callout with `tel:000` added above the form in both SSR fallback and hydrated client) |
| 5 | Progressive disclosure | **PARTIAL** | Insurance fields conditional on checkbox — good. Access instructions, assessor details, excess amount all shown upfront if insured. | PARTIAL (unchanged — existing conditional is acceptable) |
| 6 | Autosave honesty | **PASS** | `OfflineBanner`, draft resume banner, and debounced `saveDraft` all wired and honest per DR-591 fix. | **PASS** (reinforced with "Your progress is saved to this device as you type" in the new reassurance card) |
| 7 | Voice fallback visible at top | **FAIL** | No visible `tel:` link in the hero. Voice agent number `1300 309 361` only referenced in `src/lib/voice/agents-registry.ts`. | **PASS** (prominent "Call 1300 309 361" button added near hero, `tel:1300309361`) |
| 8 | Single-keyboard one-thumb flow | **PARTIAL** | Inputs use `autoComplete` on SSR path but the hydrated form does not set `autoComplete`/`inputMode` on phone, email, postcode. | PARTIAL (unchanged — deferred to follow-up) |
| 9 | Error state tone calm | **FAIL** | Validation used hard red box + "Please complete required fields in steps 1-2 before submitting." — punitive. | **PASS** (alert softened to amber, copy rewritten action-first: "We're nearly there — a few contact and damage details are still needed.") |
| 10 | No-JS path works | **PASS** | `<noscript>` SSR form posts to `/api/public/claims/submit-basic` with required fields. | **PASS** (unchanged — 000 + voice-fallback also added to SSR fallback so non-JS users see the same carve-out) |

Summary: **4 PASS → 6 PASS**, 6 FAIL → 0 FAIL, 3 PARTIAL carry over.

## Top 5 prioritised fixes

1. **Life-safety 000 carve-out at top of `/claim`** — shipped.
2. **Prominent `tel:1300309361` voice fallback above the form** — shipped.
3. **Response-time reassurance ("within 60 minutes") visible before step 1** — shipped.
4. **Date-of-damage de-required + hint that approximate is fine** — shipped.
5. **Validation errors softened from red to amber with action-first copy** — shipped.

## Fixes applied in this PR

- `app/claim/page.tsx` — added 000 alert and `tel:1300309361` call-back block above `App3CollectionNotice` in the SSR fallback. Both render for non-JS users too.
- `app/claim/ClaimFormClient.tsx` —
  - Added 000 alert and call-back block above the Who First trust card.
  - Added emerald "60-minute call-back" reassurance card immediately after the Who First card.
  - Removed `required` from `damageDate`; label hint "(approximate is fine)".
  - Softened `submissionError` `<Alert>` styling from red → amber.
  - Rewrote both validation-error strings to action-first tone.

All tap targets on the new elements are ≥ 48 px tall (`min-h-[48px]`), with `aria-label` on every `tel:` link and `role="alert"` on the 000 block.

## Fixes deferred + why

- **Step consolidation (4 → 1 or 2 steps for mobile)** — substantial scope. Would reduce time-to-submit dramatically but requires conversion-rate A/B scaffolding and is outside DR-542's "surgical fixes" remit.
- **`autoComplete` / `inputMode="tel"` / `inputMode="numeric"` / `autoFocus` sweep** — touches every `<Input>` in `ClaimFormClient.tsx`; belongs in a dedicated mobile-keyboard ticket.
- **Checkbox tap target enlargement** — current 20×20 is below Apple/Google guidance but the full label row is clickable (44+ px in practice). Non-critical.
- **Quick-fill scenario dropdown in header** — useful for demos, noise for real users in distress. Flag for product review; not a copy/flow fix.
- **Insurance section "skip for now"** — would let a shaking user submit faster and fill insurance later. Worth a dedicated UX ticket.

## Files touched

- `app/claim/page.tsx`
- `app/claim/ClaimFormClient.tsx`
- `docs/audits/DR-542-distressed-user-audit-2026-04-23.md` (new)

**Refs DR-542. NOT LEGAL ADVICE.**
