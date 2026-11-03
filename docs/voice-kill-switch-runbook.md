# Voice Agent Kill Switch — Ops Runbook

**NOT LEGAL ADVICE.** Operational runbook only. Action-first. Scannable.

Ticket: DR-715. Epic: DR-706. Last reviewed: 2026-04-23.

The voice agent has **five independent kill layers**. Any one of them disables the agent. Pick the fastest layer that fits the incident — you do not need to walk all five.

---

## 1. When to trip

Trip immediately on any of the following:

- Critical anomaly — repeated off-script behaviour, hallucinated policy, impersonation of a human.
- Confirmed data leak — the agent has emitted internal data, PII, or secrets to a caller.
- Regulator contact — ACMA, OAIC, ASIC, or state regulator initiates contact.
- Cluster of caller complaints in a short window (3+ in 30 min on the same theme).
- Red-team finding reproduced in production.
- Legal escalation — any cease-and-desist, subpoena, or lawyer letter referencing the agent.

When in doubt, trip. It's reversible in under 5 minutes.

---

## 2. Who can authorise

Any **one** of the following on a confirmed incident:

- Phill McGurk (owner)
- Designated ops lead
- Compliance lead

**Paging any of them during an active incident constitutes authorisation** — written approval is not required in the moment. Record the decision in the incident report afterwards (see `docs/voice-incident-template.md`).

---

## 3. The 5 layers — exact commands

### Layer 1 — Twilio number reroute  *(target: <60s)*

Fastest for active call-volume incidents. Preserves caller experience via the human fallback queue.

1. `console.twilio.com` → **Phone Numbers** → **Active Numbers**.
2. Select the **DR 1300** number.
3. **Voice Configuration** → **"A call comes in"**.
4. Switch the target from the ElevenLabs SIP destination to the TwiML Bin **`dr-human-queue-fallback`**.
5. **Save**.

Result: new inbound calls route to the human queue. In-flight calls complete on the current target.

---

### Layer 2 — Feature flag via in-app circuit breaker  *(target: <30s)*

Fastest for code-level kill. No redeploy required.

```bash
curl -X POST https://disasterrecovery.com.au/api/admin/voice/kill-switch \
  -H "authorization: Bearer $KILL_SWITCH_ADMIN_SECRET" \
  -H "content-type: application/json" \
  -d '{"action":"trip","reason":"<one-line incident summary>"}'
```

To verify:

```bash
curl https://disasterrecovery.com.au/api/admin/voice/status \
  -H "authorization: Bearer $KILL_SWITCH_ADMIN_SECRET"
```

To reset (after root-cause and sign-off) — requires a second secret:

```bash
curl -X POST https://disasterrecovery.com.au/api/admin/voice/kill-switch \
  -H "authorization: Bearer $KILL_SWITCH_ADMIN_SECRET" \
  -H "x-reset-secret: $KILL_SWITCH_RESET_SECRET" \
  -H "content-type: application/json" \
  -d '{"action":"reset"}'
```

**Alternative — environment-level kill** *(slower, ~3min, survives instance restarts)*:

1. Vercel → **Settings** → **Environment Variables**.
2. Set `VOICE_AGENT_ENABLED=false` across all environments.
3. **Redeploy**.

Note: the in-memory circuit breaker is process-local. On multi-instance deploys it must be tripped on every instance, or the env-var approach used instead.

---

### Layer 3 — ElevenLabs agent disable  *(target: <2min)*

Kills the agent at the provider. Survives Vercel and Twilio misconfig.

1. `elevenlabs.io/app/agents`.
2. Select **Sarah** (agent ID `agent_8601...`).
3. Toggle **Disable**.

Result: the agent refuses new sessions at the provider.

---

### Layer 4 — HMAC rotation  *(target: <5min)*

Use when the webhook secret is believed compromised, or for defence in depth when layers 1–3 are somehow bypassed.

```bash
openssl rand -hex 32
```

1. Copy the new value.
2. Vercel → **Environment Variables** → set `ELEVENLABS_WEBHOOK_SECRET` to the new value across all environments.
3. ElevenLabs dashboard → agent webhook configuration → update the webhook secret to match.
4. **Redeploy** (or trigger a promotion) so the app picks up the new env var.

Result: old webhook signatures immediately fail verification.

---

### Layer 5 — Automated trip  *(instant, no manual action)*

Fires automatically when:

- DR-711 topic classifier threshold is breached (agent drifts outside permitted topic set).
- DR-714 redactor flags a secret/internal-data leak in outbound audio text.

Calls `tripCircuitBreaker(reason)` in `src/lib/voice/kill-switch.ts`. No manual action required. **Action owed:** review the triggering event, complete the incident template, and reset the breaker only after root-cause and sign-off.

---

## 4. Post-incident report

Every trip — manual or automated — requires a post-incident report. Copy `docs/voice-incident-template.md` and fill it in within 24 hours of the reset.

---

## 5. Quarterly drill

**Schedule:** first Monday of **February, May, August, November**.

**Rotation:** drill a different layer each quarter so all five are exercised inside 15 months.

- Q1 (Feb): Layer 1 — Twilio reroute
- Q2 (May): Layer 2 — circuit breaker endpoint
- Q3 (Aug): Layer 3 — ElevenLabs disable
- Q4 (Nov): Layer 4 — HMAC rotation
- Ad-hoc: Layer 5 — inject a synthetic automated trip

**Record:** actual elapsed time vs the target above. Any layer that misses its target by >2× triggers a remediation ticket. Drill results go in `docs/voice-kill-switch-drills.md` (create on first drill).
