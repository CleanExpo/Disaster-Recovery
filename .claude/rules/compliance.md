# Compliance Rules — Disaster Recovery

> Hard rules. These are non-negotiable. Linked from @CLAUDE.md §0.
>
> **NOT LEGAL ADVICE — interim scaffold pending counsel validation.**

_Last updated: 2026-04-24 (Foundation Sprint Day 10)._

---

## 1. Banned phrases (never in code, copy, schema, or CRM labels)

These are either misleading, non-compliant with ACL s18/s29, or cause
false-endorsement risk. Refactors in 2026-02/03 removed them from
public-facing pages; do not re-introduce.

| Banned phrase                    | Why                                                              | Use instead                                        |
| -------------------------------- | ---------------------------------------------------------------- | -------------------------------------------------- |
| "Insurance approved"             | Implies endorsement by insurer panel — we don't have one.        | "IICRC-certified"                                  |
| "Insurance approved contractors" | Same issue                                                       | "IICRC-certified contractors"                      |
| "Bill your insurer"              | DR does NOT bill the insurer — contractor bills client directly. | "Your contractor bills you directly"               |
| "Guaranteed approval"            | ACL s18 (misleading) + financial-product implication.            | "Eligibility subject to assessment"                |
| "Every insurer"                  | Overstatement — ACL s29 false representation.                    | "Most major Australian insurers"                   |
| "Fastest response"               | Puffery with no evidence base — ACL s29.                         | "Rapid response" (generic OK)                      |
| "Lowest prices"                  | Same puffery risk.                                               | No replacement — drop claim.                       |
| "All insurers accept our quotes" | Misleading — insurer acceptance varies.                          | Drop claim entirely.                               |
| "Fully accredited by <insurer>"  | False endorsement unless you have the paper.                     | "IICRC-certified"                                  |
| "100% insurance coverage"        | Misleading — coverage depends on policy.                         | Drop claim.                                        |
| "Same-day guarantee"             | Unverifiable SLA.                                                | "Emergency response within X hours where possible" |
| "Free inspection"                | If there's any hidden cost it's ACL s29.                         | Only if genuinely $0 end-to-end.                   |
| "Partner contractor"             | `Partner` is capital-P only (Equipped / insurer panels).         | "Contractor"                                       |

If you need to add a phrase, add it here AND add a regex to any content
lint in CI. Never silent-fix.

---

## 2. Australian Consumer Law (ACL)

- **s18** — misleading or deceptive conduct. Applies to EVERY statement
  on the site, not just ads.
- **s29** — false representations (about sponsorship, approval,
  affiliation, testimonials, price, etc.).
- **Rule of thumb:** if you can't point to the evidence behind a claim,
  cut the claim.

### Testimonials + reviews

- Must be real + verifiable. If we can't produce the signed consent on
  request, it doesn't ship.
- Star rating on the site pulls from GBP via `app/api/rating/route.ts` —
  never hard-code a rating.

### Price claims

- Every price must be sourced (CSV table, sourced-stat block, or an
  ADR). Fabricated price ranges are ACL s29 — and the 2026-02/25
  Conversion Audit (commits `a2f3584f`, `af153412`) sourced each one.
- "From $X" requires us to actually sell at that price.

---

## 3. Australian Privacy Principles (APP)

See also @.claude/rules/privacy.md for the data-class taxonomy.

- **APP 3** — collection of solicited personal information. Collect only
  what is reasonably necessary for a claim flow.
- **APP 5** — notification of collection (the privacy notice must run at
  point of collection, not just in the footer).
- **APP 6** — use or disclosure of personal information. PII collected
  for a claim cannot be repurposed for marketing without fresh consent.
- **APP 8** — cross-border disclosure. This is the one the voice agent
  hits: any LLM-powered call MUST have an APP 8 consent gate BEFORE the
  model sees any personal data.
- **APP 11** — security of personal information. Encryption at rest,
  redaction in logs, retention policy + destruction.

### Voice-consent gate wording (canonical — DR-713)

First caller utterance after pickup, BEFORE Sarah takes any input:

> _"Hi, you've reached Disaster Recovery. This call may be
> handled by an AI assistant and recorded so we can help you. Your
> information may be processed by our technology providers overseas
> under the Australian Privacy Principles. Is that OK to continue? You
> can press 0 at any time to speak to a person."_

If the caller says no / presses 0, route straight to a human — NO LLM
processing. This wording is enforced in `src/lib/ai/sarah-prompt.ts` +
the TwiML flow and is mirrored on `/privacy` (overseas-disclosure table).

See @docs/adr/ADR-003-voice-agent-consent-and-data-boundary-model.md.

---

## 4. Notifiable Data Breaches (NDB)

- **Part IIIC of the Privacy Act 1988.** Eligible data breach = 30 days
  to assess + notify OAIC + affected individuals.
- Any suspected breach → escalate immediately; do not "investigate
  quietly".
- `compliance_events` table (DR-Day-9 observability) is the forensic
  audit trail. Never delete rows from it.

---

## 5. AML/CTF

- DR doesn't currently take customer money (contractor bills client
  directly — see @.claude/rules/business-rules.md), so AML/CTF
  obligations are LIMITED. Contractor-onboarding KYC still applies:
  - `BackgroundCheck` model captures identity verification.
  - `ContractorInsurance` + `ContractorCertification` captures
    professional verification.
- If we ever start taking money on behalf of anyone (escrow, insurer
  direct-bill, etc.) — this is a reg-change event and needs counsel
  review BEFORE shipping.

---

## 6. New Zealand

NZ-specific obligations apply whenever an NZ user is served. Keep
wording neutral enough that it is accurate in both jurisdictions.

- **Consumer Guarantees Act 1993 (CGA)** — analogous to ACL; same "can
  you back this claim" rule applies.
- **Fair Trading Act 1986 (FTA)** — analogous to ACL s18/s29. Puffery
  has the same risk.
- **Privacy Act 2020** — NZ's equivalent to APP. Uses 13 IPPs
  (Information Privacy Principles); the 2020 act added mandatory
  breach notification.

### Currency + tax

- NZ prices shown on NZ pages: NZD with `NZ$` prefix.
- Australian pages: AUD with `$` prefix (not `A$`).
- Never mix on the same page.

---

## 7. IICRC

- "IICRC-certified" is our canonical credential phrasing. It means the
  contractor has a current IICRC registration.
- The register is public; if a contractor can't be verified on the
  public register, the claim cannot be used.
- See `src/lib/constants.ts` for canonical certification labels.

---

## 8. Reg 25 (NCCP) — credit-referrer exemption

- DR uses Reg 25 of the NCCP Regulations 2010 to refer clients to
  Equipped Commercial Finance. We are a REFERRER, not a credit
  provider.
- We must not: quote rates, "approve" finance, or give advice about
  credit suitability.
- We may: display that finance is available and hand off via a
  compliant referral (captured in `compliance_events`).
- Any copy implying advice triggers NCCP licensing requirements we
  don't hold. See DR-706/707.

---

## 9. Compliance_events logging (all API routes)

Every API route that mutates state MUST append to `compliance_events`:

- **Claim-intake routes:** event_type = `claim_submitted`, includes
  redacted shape, consent-flag + IP fingerprint.
- **Voice-agent tool calls (5 tools):** event_type = `voice_tool_call`,
  tool name, caller session id, consent-flag at tool call time.
- **Finance referral routes:** event_type = `reg25_referral`, client
  id, timestamp, destination.
- **Contractor onboarding mutations:** event*type = `contractor*\*`,
  with applicant id + field name, no raw PII.

See `src/lib/compliance/*` for the helpers. NEVER log raw PII — run it
through the redactor first.

---

## 10. When in doubt

- Cut the claim.
- Use IICRC-certified + rapid-response + "where possible" hedges.
- Route to counsel (`counsel@` in `src/lib/constants.ts`) before
  shipping anything ambiguous.
- Raise an ADR under `docs/adr/`.

---

## References

- @CLAUDE.md §5 (architectural rules)
- @.claude/rules/privacy.md
- @.claude/rules/business-rules.md
- @docs/adr/ADR-003-voice-agent-consent-and-data-boundary-model.md
- DR-535 (insurance-approved removal), DR-706 (voice consent),
  DR-713 (APP 8 consent), DR-714 (redaction + retention), DR-724
  (Matt Pocock skills + ubiquitous language).
