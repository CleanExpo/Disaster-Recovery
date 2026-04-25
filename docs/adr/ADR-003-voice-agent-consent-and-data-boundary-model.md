# ADR-003: Voice Agent (Sarah) — Consent + Data Boundary Model

**Status:** Accepted
**Date:** 2026-04-24
**Deciders:** DR-706 / DR-709 / DR-710 / DR-713 / DR-714 / DR-724

- Foundation Sprint Day 10 documentation pass
  **Related:** @.claude/rules/compliance.md §3, @.claude/rules/privacy.md
  §4, @.claude/rules/business-rules.md §6, @docs/adr/ADR-001-gemma4-multilingual.md

---

## Context

Sarah is the LLM-powered voice agent that answers inbound calls to
Disaster Recovery and captures a draft `Claim`. Voice agents
create a cluster of privacy, compliance, and trust-boundary risks that
a web form does not:

- **APP 8 (cross-border disclosure):** every LLM call processes personal
  data overseas. We need express, informed consent BEFORE any personal
  data reaches the model.
- **Prompt injection / jailbreaking:** callers can attempt to redirect
  the model away from the intake flow into information disclosure,
  fabricated quotes, or social-engineering attacks.
- **Unbounded tool use:** giving the model `read_database`, `lookup_*`,
  or `generate_quote` tools would expose CONFIDENTIAL + INTERNAL data
  (see @.claude/rules/privacy.md §1 for classes).
- **Legal exposure:** a voice agent quoting a price is an ACL s29
  representation (see @.claude/rules/compliance.md §1).
- **Observability:** a dropped / anomalous call has to leave a forensic
  trail; a misbehaving model has to be killable immediately.

Without explicit boundaries the agent would either ship too broadly
(unsafe) or be too restricted to be useful.

## Decision

Sarah runs as a **closed-world system** with five complementary layers.
Every call passes through every layer. Failure of any one layer ends
the call (or escalates to human).

### Layer 1 — Feature flag (DR-Day-10 policy)

`NEXT_PUBLIC_VOICE_AGENT_ENABLED` (+ a paired server-side gate). Defaults
OFF. Rollback = flip the flag in Vercel. See @docs/adr/ADR-004-feature-flag-strategy.md.

### Layer 2 — APP 8 consent gate (DR-713)

First utterance on pickup is the canonical consent script (verbatim in
@.claude/rules/compliance.md §3). If the caller declines (press 0 /
says "no" / says "human"), the TwiML flow routes to a human and NO
model call is made. The consent decision is logged to
`compliance_events` with `event_type = 'privacy_notice_shown'`.

### Layer 3 — HMAC-signed webhooks (DR-710)

Every webhook from Twilio to our handler carries an HMAC signature
generated with a shared secret. A mismatched or missing signature
drops the call with a hard 401 (and a `voice_tool_call` event of type
`signature_invalid`). This closes the "attacker hits our webhook
directly" surface.

### Layer 4 — Closed-world system prompt + 5-tool surface (DR-709 / DR-710 / DR-724)

Sarah's system prompt (DR-709, KB-backed) declares:

- Identity (who she is, what she does).
- Scope (disaster-recovery claim intake ONLY).
- **Banned topics:** pricing, insurance advice, contractor identity,
  finance.
- **Banned phrases** — see @.claude/rules/compliance.md §1.
- Escalation wording ("I'll get a person to help you").

The tool surface is exactly FIVE tools and they are all WRITE tools:

1. `capture_contact` — records name + callback number.
2. `capture_property` — records property address + type.
3. `capture_damage` — records damage type + urgency + description.
4. `escalate_to_human` — hands the caller off; ends the LLM turn.
5. `end_call` — terminates cleanly after intake.

There is no `read_database`, `lookup_contractor`, `generate_quote`,
`get_pricing`, `search_*`. Sarah cannot read back; she can only write.
Draft `Claim` is written via the Zod registry from ADR-002.

### Layer 5 — Output filter (DR-714)

Before any model-generated text is spoken or persisted, it passes
through a PII / forbidden-phrase filter. If the output contains
anything that matches the banned-phrase list (e.g. "insurance
approved", "guaranteed") or leaks an apparent internal identifier,
the turn is suppressed and escalated.

### Kill switch

Any ONE of the five layers can terminate the call. Additionally an
operator can set `NEXT_PUBLIC_VOICE_AGENT_ENABLED=false` in Vercel
and the TwiML entrypoint starts routing straight to human within one
deploy cycle (~30 seconds). See @.claude/rules/privacy.md §4.

### Data-class boundary

Within the voice flow, only **CONFIDENTIAL** client PII may reach the
model (and only after consent at Layer 2). **SECRET** data (keys,
HMAC secrets) never reach the model. **INTERNAL** data (contractor
identities, commissions, pricing by contractor) never reach the model.
See @.claude/rules/privacy.md §1-2.

## Consequences

**Enables:**

- Sarah can be deployed safely because every turn goes through the
  same five checks. Any failure is loggable + reversible.
- The consent gate gives APP 8 coverage without needing per-turn
  re-prompting (one consent per call).
- The closed tool surface means a successful prompt-injection attack
  cannot exfiltrate data — there is no read tool to attack.
- Integrating a new model (e.g. Gemma 4 per ADR-001) does not require
  changing the boundary model — swap Layer 4's backend, keep the
  other four layers.

**Locks us into:**

- Sarah can NEVER quote a price or look up a contractor. If a future
  product wants that, it is a new agent with a new ADR, not a patch to
  Sarah.
- Every new tool has to be reviewed against Layers 4 + 5. Adding a
  sixth tool is a BIG decision — minimum a new ADR and a fresh
  threat-model.
- The consent script is contractual. Changing it triggers a compliance
  review (DR-713 ownership).

**Follow-up debt:**

- Red-team test suite for Layer 4 (prompt-injection cases) — tracked.
- Output filter false-negative audit (Layer 5) — tracked.
- Model-swap ADR when we migrate from current Layer 4 backend to
  Gemma 4 (will reference ADR-001).

## References

- DR-706 — TwiML + consent wiring.
- DR-709 — Sarah system prompt + KB.
- DR-710 — 5-tool surface + HMAC.
- DR-713 — APP 8 consent table on `/privacy`.
- DR-714 — redaction + retention.
- DR-724 — Matt Pocock skills + ubiquitous language.
- @.claude/rules/compliance.md §3 (consent script verbatim).
- @.claude/rules/privacy.md §4 (kill-switch layers).
- @docs/adr/ADR-001-gemma4-multilingual.md (future model swap).
