# Voice Retention Runbook (DR-714)

> **NOT LEGAL ADVICE** — this runbook documents operational procedure. It is not a substitute for counsel review. Confirm retention obligations with legal before shipping to production.

Epic: **DR-706** — Voice channel with Stripe billing
Ticket: **DR-714** — Transcript redaction pipeline + retention cron

---

## Retention policy at a glance

| Artefact | Retention | Rationale |
|---|---|---|
| Raw audio (Twilio recordings) | 30 days | Dispute window + QA sampling |
| Raw transcripts (pre-redaction) | 90 days | Training review + incident triage |
| Redacted transcripts | 7 years | AU financial/insurance record-keeping |
| `compliance_events` rows | 7 years | Paired with redacted transcripts |
| Unfilled `claim_drafts` | 30 days → PII-scrub | Abandoned-call analytics only |

Source of truth: `src/lib/voice/retention.ts` — `RETENTION_POLICY` constant.

---

## 1. Configure Vercel Cron

Add to `vercel.json` (project root):

```json
{
  "crons": [
    {
      "path": "/api/cron/voice-retention",
      "schedule": "0 2 * * *"
    }
  ]
}
```

- Runs daily at 02:00 UTC (~12:00 AEST / 13:00 AEDT).
- Vercel Cron sends a GET with `authorization: Bearer <CRON_SECRET>`.
- Deploy; confirm the scheduled job appears under **Project → Settings → Cron Jobs**.

## 2. Environment variables

Set in Vercel **Production** (and **Preview** if you want dry-runs):

| Var | Value |
|---|---|
| `CRON_SECRET` | 32+ random bytes (see rotation below) |
| `VOICE_RETENTION_CRON_ENABLED` | `false` initially, flip to `true` after dry-run |
| `TWILIO_ACCOUNT_SID` | (future) enables audio cleanup branch |

## 3. Rotate `CRON_SECRET`

Run quarterly or any time the secret is suspected leaked.

```bash
openssl rand -hex 32
# Copy the output into Vercel → Project → Settings → Environment Variables → CRON_SECRET
# Trigger a redeploy so the updated env is picked up.
```

Verify:

```bash
curl -I -H "authorization: Bearer <NEW_SECRET>" https://<app>.vercel.app/api/cron/voice-retention
# Expect: HTTP/1.1 200 OK (or {"skipped":true} if flag is off)

curl -I -H "authorization: Bearer WRONG" https://<app>.vercel.app/api/cron/voice-retention
# Expect: HTTP/1.1 401 Unauthorized
```

## 4. Responding to `secret_leak` alerts

`redactTranscriptWithFlags()` returns `flags.secret_leak = true` when a transcript contained an `sk_live_…`, `rk_live_…`, `whsec_…`, `xoxb-…`, `ghp_…`, or a JWT. When this flag lands in `compliance_events`:

1. **Page the compliance lead** (on-call rotation, Slack `#voice-compliance`).
2. **Trace upstream** — identify the call SID from the event payload, pull the raw transcript from the 90-day window, and find how the secret entered the conversation (caller read it aloud? agent prompt echo? tool output leak?).
3. **Rotate the affected secret immediately** — do not wait for triage. Stripe, Supabase, Slack, GitHub: revoke + rotate per that provider's standard procedure.
4. **File an incident ticket** — `DR-` prefix, link the `compliance_events` row, attach rotation confirmation.
5. **Post-mortem within 5 business days** — focus on why the secret was speakable in the first place (UI copy? staff training?).

Keep counsel in the loop if the leak touches PII alongside the secret.

## 5. Responding to `internal_leak` alerts

Contractor deny-list match. Lower severity than `secret_leak` but still actionable: caller named a blacklisted contractor, which we must never surface back. Confirm the redactor caught it (grep for `[REDACTED_INTERNAL]` in the stored transcript) and review why the deny-list term reached the channel.

## 6. Quarterly attestation template

Copy into `docs/attestations/YYYY-QQ-voice-retention.md` at the end of each quarter.

```markdown
# Voice Retention Attestation — YYYY QQ

**Period:** DD/MM/YYYY – DD/MM/YYYY
**Owner:** <name, role>
**Reviewer:** <name, role>

## Verified
- [ ] Cron ran every scheduled day (check Vercel cron logs)
- [ ] Zero `secret_leak` events unresolved
- [ ] Zero `internal_leak` events unresolved
- [ ] Audio older than 30d confirmed purged from Twilio
- [ ] Raw transcripts older than 90d confirmed purged from Supabase
- [ ] Unfilled drafts older than 30d confirmed PII-scrubbed
- [ ] `CRON_SECRET` rotated this quarter

## Outstanding items
- <description, ticket link, target date>

## Signatures
- Owner: ____________________ Date: __/__/____
- Reviewer: __________________ Date: __/__/____
- Compliance: ________________ Date: __/__/____
```

---

## Appendix: current stub state

As of branch `feat/DR-714-redaction-retention`, the cron endpoint is scaffolded but does not yet perform real deletions:

- Twilio cleanup: no-op (TODO — needs `TWILIO_ACCOUNT_SID`)
- Raw transcript purge: no-op (TODO — `voice_raw_transcripts` table not yet provisioned)
- Draft PII-scrub: log-only (TODO — requires DR-710 in-memory store iterator)

The auth gate, feature flag, and `compliance_events` emit path are production-ready. Flip `VOICE_RETENTION_CRON_ENABLED=true` only after each TODO is closed and the stub is replaced with the real implementation.
