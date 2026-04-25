# Equipped Commercial Finance — partner reference

**Internal documentation. NOT a public disclosure. NOT LEGAL ADVICE.**

This folder holds partner-shared material from Equipped Commercial Finance and
related Phase 1 workflow docs. These files are kept OUT of `public/` because
they contain internal strategy, pool allocations, and commercial commentary
that should not be published on the consumer site.

Consumer-facing regulatory disclosures (Credit Guide, Privacy Disclosure
Statement) live under `public/finance/` once Phill downloads them — those ARE
public and are linked from `/finance`.

## Files

| File | Source | Date | Classification |
|---|---|---|---|
| `recoverycapital-base44.pdf` | George Steele (gs@equippedcf.com.au), 22 April 2026 | 2026-04-20 | **INTERNAL** — workflow explainer for Phase 1 partner enhancement |

## Phase 1 workflow — 60-second summary

From George's RecoveryCapital _ Base44 doc (20 April 2026, ref `20042600`):

1. A DR-approved contractor logs into the DR app and invites the homeowner
   (name, address, email) into a project.
2. Homeowner ticks T&Cs acknowledging a lender call within 72 hours.
3. **Signed JWT referral hand-off** from DR → Base44 app triggers the
   downstream flow.
4. An XYZ P/L ACL-licensed capital pool funds the contractor immediately
   (no waiting on a 3rd-party panel).
5. HLE (Home Loan Essentials) calls the homeowner inside 72 hours — a
   refinance / restructure conversation, not a repair call.
6. Pool replenishment flows back via one or more of:
   - HLE home-loan top-up
   - Insurer payout (e.g. AAMI)
   - Homeowner savings

Panel: Equipped CF + HLE + BLinks + aggregators, reviewed annually,
15-point "Responsible Person" check per contractor.

## Base44 app

- **App ID:** `69e58bc3f2a621d97a0ab1be`
- **Editor preview URL** (not public):
  `https://app.base44.com/apps/69e58bc3f2a621d97a0ab1be/editor/preview`
- **Production URL:** not yet provided by George. Needed before the
  `/finance` CTA can point at the live referral surface.

## Engineering to-do list (from the doc, Phase 2+ if scoped)

- **Signed JWT referral hand-off** — `/api/finance/handoff` (new). Server signs
  a short-lived JWT with `{claimId, contractorId, homeownerPII, expiresAt}` and
  redirects to Base44 with the token. Base44 validates the signature against a
  shared public key.
- **Contractor invite flow** — new UI for approved contractors in the DR
  contractor portal to enter homeowner details and trigger the hand-off.
- **Status webhook** — already scaffolded in PR #98 / #120 (`DR-691`). Ensure
  the Base44 status callbacks are mapped into `FinanceReferral.statusWebhookLastStatus`.
- **Homeowner consent corpus** — the Reg 25 + Equipped Privacy Disclosure
  acknowledgement must be hashed into the audit record at consent time. See
  `EQUIPPED_CONSENT_VERSION` in `EquippedConsentForm`.

## Open questions for Phill → George

1. Production Base44 URL (not the `/editor/preview` variant)?
2. Public key or shared secret for the DR → Base44 JWT hand-off?
3. Expected status webhook schema + auth header format?
4. Who owns the XYZ P/L entity + timeline for ACL registration — is this live
   in Phase 1, or does Phase 1 go live with Equipped's existing ACL only?
5. Which contractors are approved for Phase 1 go-live? Whitelist needed in DR
   contractor model.

## References

- PR #120 — `DR-717` Partytown + `DR-691/692` finance webhook + `DR-707/712`
  voice/payments prep pack (includes the existing finance referral scaffold)
- PR #140 — Equipped Phase 1 `/finance` page disclosure scaffold
- `docs/proposals/equipped-phase1-handover-2026-04-25.md` — handover doc
  with test plan + Phill action list
