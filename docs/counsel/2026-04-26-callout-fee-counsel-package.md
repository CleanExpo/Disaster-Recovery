# Counsel Briefing — Callout Fee Funds Flow

**Prepared for:** Phill McGurk's counsel/accountant review
**Subject:** Disaster Recovery / NRPG $2,750 client callout fee — funds-flow architecture
**Date:** 2026-04-26
**Status:** Decision blocking before public payment surface ships

> **NOT LEGAL ADVICE.** This document organises the engineering question for legal review. Every regulatory characterisation below is provisional and explicitly framed as a question for counsel.

---

## TL;DR

The Disaster Recovery (DR) consumer voice + web flow is scaffolded to charge clients **$2,750 (incl GST)** as a callout fee that settles into DR's Stripe balance. ~$2,200 (80%) is then released to the assigned IICRC-certified contractor on KPI completion; ~$550 (20%) is retained by DR.

This **contradicts** the published network-orchestrator posture (DR does not act as a payment intermediary; contractor bills client directly). It also potentially triggers AML/CTF + financial-services regulatory review.

**We need counsel to decide between two architectures before this surface ships.**

---

## The two architectures

### Path A — Cancel intermediary model (low regulatory exposure)

- Contractor charges the client directly via the contractor's own merchant account.
- DR collects a per-job platform fee from the contractor (already supported by `ContractorPayment` in our schema).
- DR is NOT in the funds path between client and contractor.
- Aligns with the published business model.

**Pros**

- Zero AML/CTF exposure on client funds.
- Simpler engineering — no Stripe Connect, no transfer engine, no KPI fund release.
- Aligns with `business-rules.md` §2 as currently published.

**Cons**

- Worse client UX — two payment relationships (DR for callout coordination, contractor for the actual restoration).
- Contractor cashflow risk if client doesn't pay.
- Harder for DR to enforce the KPI gate that drives quality.

### Path B — DR holds client funds, releases on KPI completion

- Client pays $2,750 into DR's Stripe balance.
- DR holds the funds in `dr` account.
- On KPI completion, `stripe.transfers.create` releases ~$2,200 to the contractor's Stripe Connect account; DR retains ~$550.
- Stripe Connect Express onboarding required per contractor (one-off ~5 min per contractor).

**Pros**

- Clean single client UX (one payment).
- KPI gate enforced server-side.
- DR has dispute leverage if work isn't completed.

**Cons**

- Likely AUSTRAC review — possible designated services characterisation as a remittance dealer or trust-account holder.
- ACL s18/s29 disclosure obligations on who the merchant of record is.
- 1–2 weeks engineering for Connect onboarding + KPI release engine.
- ASIC AFSL review may be needed depending on counsel characterisation.

---

## Eight explicit questions for counsel

1. **AUSTRAC characterisation:** Does holding $2,750 in DR's Stripe balance pre-release constitute "holding client funds" under AUSTRAC's _remittance dealer_ definition (Item 31, Item 32 of the AML/CTF Act 2006)? If yes, what designated-services obligations attach?

2. **Trust accounting:** Does the 80/20 split + KPI gate qualify DR as a "non-financier intermediary" analogous to escrow agent licensing (varies by state — NSW Property and Stock Agents Act 2002, VIC Estate Agents Act 1980, etc.)? If yes, does DR need an escrow trust account?

3. **Stripe Connect destination charges:** Is there a structure (Stripe Connect _destination charges_ with `on_behalf_of`) that legally treats the contractor as merchant of record while still allowing DR to hold funds and release on KPI? If so, does that change the AUSTRAC characterisation?

4. **ACL disclosure (Path B):** What disclosure obligations apply under ACL s18 (misleading conduct) and s29 (false representations)? Specifically: client receipt must clearly state who the merchant of record is, and how disputes are handled.

5. **APP 5 collection notice:** What additional collection-notice wording is required if client funds are held by DR rather than the contractor?

6. **Path A exposure:** If we take Path A, what is DR's exposure if a contractor charges then absconds before completing work? Is DR liable as the network operator who matched them?

7. **NZ parity:** Does the NZ Consumer Guarantees Act 1993 + NZ Privacy Act 2020 + AML/CFT Act 2009 (NZ) require a different posture for NZ clients? Can we run a single architecture across AU + NZ?

8. **Contractor agreement clauses:** What clauses does the contractor membership agreement need to include for whichever path is chosen? Specifically: KPI definitions, dispute resolution, fund release timing, indemnification.

---

## Engineering recommendation (provisional)

**Path A** as the lowest-risk default.

This is an engineering recommendation, not legal advice. Counsel may rationally choose Path B if the client UX gain outweighs the regulatory cost.

### Why Path A

- Zero AML/CTF / AFSL exposure.
- Aligns with the already-published business model — no marketing/legal copy changes needed.
- Engineering effort: ~2 days to remove the DR-side checkout and redirect to a contractor-side payment surface.
- If Path A turns out to be too clunky for users in production, we can migrate to Path B later (the reverse — Path B → A — is much harder because clients will have already paid into DR).

### Why Path B might still be right

- Path B captures the KPI quality gate at the funds layer, which is real product leverage.
- If DR is the brand customers trust, the funds path matching the brand is cleaner UX.
- The Stripe Connect destination-charge structure (question 3 above) may sidestep AUSTRAC entirely if counsel agrees.

---

## Temporary safe default (pending decision)

**`NEXT_PUBLIC_VOICE_WIDGET_ENABLED=true`** (already set, voice widget live on `/contractor/apply` + `/claim`)

But:

- **`VOICE_AGENT_ENABLED=false`** (server-only flag) — the voice agent's `send-payment-link` tool is currently behind this flag. As long as it's off, no actual Stripe charges are created from voice flows. Olivia and Sarah can still talk to users; they just can't issue payment links.
- The web claim form ($550 platform fee + $2,200 held) at `/claim` IS already live and using the existing `app/api/payments/create-booking` route. **That route already settles into DR's account — Path B-like behaviour.** Counsel decision is more urgent for the web form than for the voice flow.

### Action if counsel reaches Path A

1. Voice agent: `send-payment-link` tool refactored to redirect callers to a contractor-side payment surface, not DR's Stripe checkout.
2. Web claim form: change settlement target on `/claim` from DR → contractor (Stripe Connect destination charges, `on_behalf_of`).
3. Update `business-rules.md` §2 — already aligned, no copy changes needed.

### Action if counsel reaches Path B

1. AUSTRAC enrolment / DCE registration if required.
2. Stripe Connect Express onboarding integrated into the 7-step contractor application flow (DR-707 follow-up).
3. KPI-release transfer engine (`stripe.transfers.create` on operator action).
4. Update `business-rules.md` §2 to permit DR holding client funds with stated AUSTRAC + ACL framing.
5. Update privacy notice + ACL disclosure copy.

---

## Reference files

- `docs/adr/ADR-011-callout-fee-funds-flow.md` — full ADR with 217 lines of detail
- `src/lib/payment-security.ts` — IMMUTABLE PRICING_CONSTANTS dated 2026-04-07
- `app/api/voice/tools/send-payment-link/route.ts` — voice payment surface
- `app/api/payments/create-booking/route.ts` — web claim payment surface
- `.claude/rules/business-rules.md` §2 + §10 — published business model + reg-change triggers
- `.claude/rules/compliance.md` §5 (AML/CTF), §2 (ACL)
- `prisma/schema.prisma` — `ContractorPayment`, `OnboardingPayment` models

---

## Linear ticket

DR-789 — CALLOUT_FEE Path A vs B counsel decision. Status: Todo (awaiting counsel response).

When counsel responds, attach the response to DR-789, flip ADR-011 status from Draft → Accepted, and create implementation tickets for the chosen path.
