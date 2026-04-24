# Phase 1 — Grill Me

**Loop:** `2026-04-29-finance-referral-persistence`
**Skill invoked:** `grill-me`, `ubiquitous-language`.

## Q1 — Why split the persistence into two phases?

**A:** Risk reduction.

- The submission audit write is the **compliance-load-bearing** half:
  it captures the consent flags, disclosure version, and payload hash
  at the moment a referral is sent to Equipped. Auditable trail of
  what we sent and when.
- The status webhook half is **operational** (read by the admin
  dashboard). Equipped flag is OFF, no traffic, no urgency.
- Doing both at once means more schema churn + more migration risk
  - more code surface in one PR. Per ADR-009 thinking: smaller,
    reviewable units.

## Q2 — Is the runtime write safe if the migration hasn't been deployed yet?

**A:** Yes, with try/catch. The route's response path doesn't depend
on the audit row landing — the JWT handoff is what the client uses.
The audit write becomes a "best effort, log on failure" call. If the
DB rejects (table missing), we still emit the existing `log.info`
entry and return 200.

Belt-and-braces: the route already logs the audit entry to stdout. If
the Prisma write fails, the log line is the fallback record-of-
transmission.

## Q3 — What's the data class?

**A:** `CONFIDENTIAL` per `.claude/rules/privacy.md` §1. The row
contains:

- payload hash (not PII — SHA-256 of plaintext)
- IP (PII)
- user agent (system info)
- consent booleans
- non-PII categoricals (country, customer type, funding band, etc.)
- disclosure + privacy notice versions

No raw email, mobile, or name reaches the row. The plaintext goes
straight to Equipped via the JWT handoff and never persists DR-side.

## Q4 — Schema is correct as-is, or does it need extending?

**A:** Correct as-is for the submission audit write. Every field in
the existing model maps to a field in the route's `auditEntry`
object:

| Schema field                | auditEntry source                                                                                      |
| --------------------------- | ------------------------------------------------------------------------------------------------------ |
| `id`                        | replaces `referral_id` (uuid) — model uses `@default(uuid())`, but route passes its own — pass-through |
| `country`                   | `auditEntry.country` ("AU")                                                                            |
| `customerType`              | `auditEntry.customer_type`                                                                             |
| `fundingBand`               | `auditEntry.funding_band`                                                                              |
| `disasterCategory`          | `auditEntry.disaster_category`                                                                         |
| `source`                    | `auditEntry.source`                                                                                    |
| `disclosureVersion`         | `auditEntry.disclosure_version`                                                                        |
| `privacyNoticeVersion`      | `auditEntry.privacy_notice_version`                                                                    |
| `consentShareEquipped`      | hardcoded true (gate already enforced)                                                                 |
| `consentReferralDisclosure` | hardcoded true                                                                                         |
| `consentMarketing`          | `auditEntry.consent_marketing`                                                                         |
| `payloadHash`               | `auditEntry.payload_hash`                                                                              |
| `ip`                        | `auditEntry.ip`                                                                                        |
| `userAgent`                 | `auditEntry.user_agent`                                                                                |
| `receiver`                  | `auditEntry.receiver`                                                                                  |

Note: route's `referral_id` is the route-generated uuid (line 119:
`const referralId = randomUUID();`). The Prisma model uses
`@default(uuid())` for `id`. Two options:

1. Pass the route's `referralId` as the Prisma `id` (preserves
   referential identity with the JWT and the eventual webhook).
2. Let Prisma default and store the route-side id elsewhere.

**Decision:** option 1 — pass `referralId` as `id`. This way the
Equipped webhook lookup can do `where: { id: referralId }` later when
Phase 2 wires it.

## Q5 — Ubiquitous-language check

`FinanceReferral` is glossary-aligned with the (pending) addition to
`UBIQUITOUS_LANGUAGE.md` "Reg 25 referral record". Domain-idiomatic
already. No language change needed.

## Q6 — Compliance check

- `compliance_events` continues to log a `finance_referral_submitted`
  (or equivalent) event independently. The Prisma row is structured
  data; the `compliance_events` row is the audit-trail row. Both are
  needed; neither replaces the other.

  _Audit:_ the route already does NOT log a `compliance_events` row —
  it only logs to stdout. That's a separate gap, but out of scope for
  this loop. Captured as residual debt.

## Open questions

None.

**Proceed to Phase 2 — Design-an-Interface.**
