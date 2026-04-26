# Privacy + Data Classification — Disaster Recovery

> Data-class taxonomy + agent-context rules. Linked from @CLAUDE.md §0.
>
> **NOT LEGAL ADVICE — interim scaffold pending counsel validation.**

_Last updated: 2026-04-24 (Foundation Sprint Day 10). Derived from
DR-716 research + DR-713/714 implementation._

---

## 1. The 5-class taxonomy

Every piece of data in this codebase belongs to exactly one class.
When unsure, classify UP (more restrictive), not down.

| Class                    | Examples                                                                                                                                | Where it may appear                                               | May enter AI context?                                                   |
| ------------------------ | --------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------- | ----------------------------------------------------------------------- |
| **PUBLIC**               | Service page copy, pricing ranges, IICRC registration numbers, NAP info.                                                                | Rendered pages, public API, indexed by Google.                    | Yes — no restriction.                                                   |
| **CUSTOMER_TO_CUSTOMER** | Non-personal claim descriptions scrubbed of PII (e.g. "water damage, Brisbane 4000").                                                   | Analytics aggregates, content-gen prompts after PII minimisation. | Yes — after redactor.                                                   |
| **INTERNAL**             | Contractor territory maps, service-area heuristics, lead-scoring rules, suburb risk tiers.                                              | Server code, protected dashboards.                                | Yes, but only in server-side calls — NEVER to a browser or third-party. |
| **CONFIDENTIAL**         | Client PII, contractor identities + commissions, pricing BY contractor, `compliance_events` contents, Prisma rows with personal fields. | DB, authenticated portal routes, server logs (redacted).          | NO — unless explicitly scoped + consented.                              |
| **SECRET**               | Stripe keys, Supabase service role key, Twilio tokens, Google Places API key, Equipped finance terms, HMAC secrets, SMTP creds.         | Vercel env vars only.                                             | NEVER.                                                                  |

---

## 2. Things that must NEVER enter agent context

Hard list. If an agent loop is about to include any of these in a
prompt, something is wrong — abort and investigate.

- **Contractor identities** (names, ABNs, addresses) when paired with
  commission data.
- **Contractor commissions** and platform-fee splits.
- **Equipped Commercial Finance terms** (rates, referral fees, tiered
  payouts).
- **Stripe secret keys** — neither live (`sk_live_*`) nor test
  (`sk_test_*`).
- **Supabase service-role JWT** and DB passwords.
- **Twilio auth tokens** and account SIDs paired with auth tokens.
- **Google API keys** (Places, Gemini, Maps) — usage metered + billable.
- **HMAC secrets** used for voice-agent webhook signing (DR-710).
- **Client PII bundled with contact details** — voice agent has a
  separate consent + tool-gated path (DR-724); that is the ONLY place
  client PII may reach the model.
- **Compliance_events rows verbatim** — contain PII, even after
  redaction they are tagged CONFIDENTIAL.

Any agent skill / tool / subagent prompt that touches these classes MUST
be explicitly scoped. Default is "no access".

---

## 3. Client PII handling

- **Collection surface:** `/claim` (public form) + voice agent
  (Sarah) after APP 8 consent gate.
- **At-rest:** encrypted in Supabase. Prisma `Claim` model has PII
  columns flagged (review schema comments).
- **In-transit:** HTTPS only. No plaintext logging.
- **In logs:** PII MUST pass through `src/lib/compliance/*` redactor
  before hitting logs (and by extension before hitting Sentry
  breadcrumbs).
- **Retention:** 7 years from claim closure (AU standard for insurance-
  adjacent records). Destruction schedule lives in the retention policy
  (see DR-714).
- **Access control:** Client portal shows only the client's own rows.
  Operator roles can see aggregates; individual rows require case-note
  audit entry (DR-714).

---

## 4. Voice agent (Sarah) — closed-world boundaries

5-layer kill-switch + 5-tool surface + consent gate. See
@docs/adr/ADR-003-voice-agent-consent-and-data-boundary-model.md.

### Kill switch layers (any ONE disables the agent)

1. **Env var:** `VOICE_AGENT_ENABLED=false` (default off, server-only — voice
   runs entirely server-side via Twilio + ElevenLabs webhooks; no client-side
   read, so no `NEXT_PUBLIC_` prefix).
2. **TwiML consent:** if caller presses 0 or says "no" / "human" at the
   consent prompt, route to human — no LLM call.
3. **HMAC signature:** every webhook from Twilio must carry a valid
   HMAC; mismatched signatures drop the call.
4. **System-prompt self-check:** Sarah's prompt opens with a closed-
   world declaration; any deviation from the 5 tools returns "I can't
   help with that".
5. **Output filter:** post-model filter strips anything that looks like
   personal data leaving the model (PII pattern matcher).

### 5-tool surface (ALL tool calls are whitelisted)

`capture_contact` / `capture_property` / `capture_damage` / `escalate_to_human` / `end_call`.

No `read_database`, no `lookup_contractor`, no `generate_quote`. Sarah
WRITES into `compliance_events` + a draft `Claim`; she does not read
back.

---

## 5. Compliance_events logging — per route type

| Route type                 | event_type              | Required fields                          |
| -------------------------- | ----------------------- | ---------------------------------------- |
| Claim-intake               | `claim_submitted`       | claimId, redactedShape, consent, ipHash  |
| Claim update (portal)      | `claim_updated`         | claimId, fields (names only), actorId    |
| Voice tool call            | `voice_tool_call`       | sessionId, toolName, consentFlag, ts     |
| Reg 25 finance referral    | `reg25_referral`        | clientId, destination, ts                |
| Contractor onboarding step | `contractor_<step>`     | applicantId, stepName (no raw PII)       |
| Payment (Stripe)           | `payment_<status>`      | stripeSessionId, amount, currency        |
| Privacy-notice shown       | `privacy_notice_shown`  | surface (web/voice), ipHash / sessionId  |
| Data deletion request      | `data_deletion_request` | clientId, requestedAt, scope             |
| Data breach suspicion      | `breach_suspected`      | summary, actorId (NEVER delete this row) |

Helpers in `src/lib/compliance/*`. NEVER build a second logger.

---

## 6. PII patterns the redactor catches (DR-714)

- AU mobile: `04\d{2} ?\d{3} ?\d{3}` → `[REDACTED_PHONE]`
- AU landline: `0[2378] \d{4} \d{4}` → `[REDACTED_PHONE]`
- Email: standard RFC pattern → `[REDACTED_EMAIL]`
- AU post code (4 digits) — kept, not PII on its own.
- Full address (street number + street + suburb) → `[REDACTED_ADDRESS]`
- Credit card (Luhn-checked) → `[REDACTED_CARD]` (should never reach logs anyway)
- Medicare, TFN, driver's licence patterns → `[REDACTED_ID]`
- Names — not pattern-redacted (false positives too common); rely on
  column-level tagging in Prisma instead.

If you add a new PII surface, add its pattern to the redactor in the
same PR.

---

## 7. Privacy notice (APP 5)

- **Web:** `/privacy` is the canonical page. Shown at form submit via
  consent checkbox + link.
- **Voice:** mandatory consent script (DR-713) as first utterance
  — see @.claude/rules/compliance.md §3.
- **Contractor portal:** shown once at onboarding + stored with
  timestamp in `compliance_events`.

---

## 8. Data subject rights

- **Access + correction** (APP 12/13 / NZ IPP 6-7): email intake,
  served within 30 days.
- **Deletion**: request triggers a `data_deletion_request` event;
  destruction runs within the retention-policy window (7 years minus
  age-of-record; shorter if no active legal hold).
- **Objection to use**: opt-out of marketing is one-click; claim-
  operational comms cannot be opted out of while the claim is active.

---

## 9. If you find a breach

1. Do NOT try to fix it silently.
2. Emit a `breach_suspected` event (never deleted).
3. Escalate to Phill immediately.
4. Do NOT post in public Slack / ticket — use the designated channel.
5. Clock starts: NDB requires OAIC + affected individuals within 30
   days where the breach is "eligible" (Part IIIC).

---

## References

- @CLAUDE.md §5.4 (observability + compliance events)
- @.claude/rules/compliance.md (ACL, APP, AML/CTF, banned phrases)
- @docs/adr/ADR-003-voice-agent-consent-and-data-boundary-model.md
- DR-713 (APP 8 consent), DR-714 (redaction + retention), DR-716
  (data-class taxonomy research), DR-724 (Matt Pocock skills).
