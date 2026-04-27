# Phill Action Checklist — D1 Unblock

**Date:** 27 April 2026 (AEST)
**Estimated total time:** 30 minutes
**Goal:** unblock D2-D5 of `docs/plans/2026-04-27-d1-d5-recommendation.md`.

Tick boxes as you go. Items are ordered by dependency — do them in
this order so the agent on machine 2/3/4 can resume without waiting.

---

## ☑ 1. Counsel emails — DEFERRED (drafts saved on disk)

**Status:** Drafted, **not sent**. Funds-constrained — defer until
budget allows. NOT a blocker on D2 voice GA.

File: `docs/counsel/2026-04-27-emails-to-send.md` (drafts retained for
when funds available).

**Posture going forward:**

- ADR-011 Path A is the engineering-team decision and the published
  business-rules posture. We ship under it without counsel
  pre-confirmation.
- APP 8 voice consent wording is canonical per
  `.claude/rules/compliance.md` §3 — already in production code at
  `src/lib/voice/consent-utterance.ts`. We ship under it without
  counsel pre-confirmation.
- Risk acknowledged: belt-and-braces sign-off is deferred. If a
  regulator queries either, the engineering documentation
  (ADR-011, ADR-003, compliance.md) is the audit trail.
- When budget allows, send the drafted emails — same wording, just
  later.

**Effect on D1-D5 plan:** D2 voice GA launch proceeds on engineering
authority. No external dependency.

---

## ☐ 2. Add MCP browser permissions (5 min)

Open a separate PowerShell window (not in Claude Code). Paste this
exact one-liner. Hit enter:

```powershell
$f = "$env:USERPROFILE\.claude\settings.local.json"; $j = Get-Content $f -Raw | ConvertFrom-Json; $new = @('mcp__Claude_in_Chrome__list_connected_browsers','mcp__Claude_in_Chrome__select_browser','mcp__Claude_in_Chrome__tabs_context_mcp','mcp__Claude_in_Chrome__tabs_create_mcp','mcp__Claude_in_Chrome__tabs_close_mcp','mcp__Claude_in_Chrome__navigate','mcp__Claude_in_Chrome__computer','mcp__Claude_in_Chrome__browser_batch','mcp__Claude_in_Chrome__find','mcp__Claude_in_Chrome__read_page','mcp__Claude_in_Chrome__get_page_text','mcp__Claude_in_Chrome__form_input','mcp__Claude_in_Chrome__file_upload','mcp__Claude_in_Chrome__javascript_tool','mcp__Claude_in_Chrome__read_console_messages','mcp__Claude_in_Chrome__read_network_requests','mcp__Claude_in_Chrome__resize_window'); $j.permissions.allow = @($j.permissions.allow) + $new; $j | ConvertTo-Json -Depth 20 | Set-Content $f -Encoding UTF8; Write-Host "Done. Allow list now has $($j.permissions.allow.Count) entries."
```

**Expected output:** `Done. Allow list now has 26 entries.`

If you see `25` or `27`, there is an existing duplicate or the file
shape is unexpected — open the file in Notepad and reconcile manually
against the JSON in PR #222 thread.

After running: restart Claude Code so the permission cache reloads.

**Why second:** unblocks the agent for hybrid dashboard work in §4 of
the continuation roadmap. Without this, DR-524 / 523 / 465 / 467 /
644 stall.

**Caveat (read once):** the harness has a _second_ gate above MCP
permissions — the "Blind Apply / Shared-Infra Write" classifier. The
allowlist above lifts gate #1; gate #2 needs hybrid mode (you click
the destructive Save buttons while the agent reads + formats). Plan
accordingly.

---

## ☐ 3. Vercel — three settings changes (10 min)

Sign in: https://vercel.com/cleanexpo/disaster-recovery/settings/environment-variables

### 3a. Add Stripe test-mode keys (Preview environment only)

Two new env vars, scope = **Preview only** (not Production):

| Name                                 | Value                                                                   | Scope   |
| ------------------------------------ | ----------------------------------------------------------------------- | ------- |
| `STRIPE_SECRET_KEY`                  | `sk_test_...` from Stripe Dashboard → Developers → API keys → Test mode | Preview |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | `pk_test_...` from same screen                                          | Preview |

Both already exist with **Production** scope holding the live keys.
Adding **Preview** scope means preview deploys for PRs run against
Stripe test mode while production keeps the live keys — no risk of
test cards leaking through to live charges, no risk of real cards
hitting test mode.

Verify: open any open PR's preview deploy, hit the contractor onboarding
flow, attempt checkout — you should see Stripe test-mode UI.

### 3b. Voice widget flag — Preview ON, Production OFF

Find the env var: `NEXT_PUBLIC_VOICE_WIDGET_ENABLED`

| Scope      | Value                                        |
| ---------- | -------------------------------------------- |
| Production | `false` (keep until counsel email 2 returns) |
| Preview    | `true`                                       |

Save. Trigger a redeploy of any open PR.

Verify: the preview deploy of any PR should show the voice widget
trigger on `/claim` and `/contractor/apply`. Click it. The
`<VoiceConsentModal>` should appear before any audio loads.

### 3c. Confirm GA4 + GTM env vars are still set

| Name                 | Expected value |
| -------------------- | -------------- |
| `NEXT_PUBLIC_GA_ID`  | `G-98HWF2NV95` |
| `NEXT_PUBLIC_GTM_ID` | `GTM-KXB7RWXB` |

Both should already be there (live since 13 days ago). If either is
missing, paste in.

**Why third:** Stripe test keys unblock realistic preview testing
(today previews silently fall back to production keys when test keys
are absent — risky). Voice widget Preview-ON lets you exercise the
consent modal end-to-end before the production flip on D2.

---

## ☐ 4. Stripe — archive 7 legacy LearnDash products (5 min)

Sign in: https://dashboard.stripe.com/products (account
`acct_1GNs4CC8kkd3m9ZX` — same one with the live products).

Filter by name `prod_HL` or scroll to find the seven legacy LearnDash
products (created in the LearnDash era, never updated, no customers
on them today).

For each:

1. Click the product.
2. Click `...` → Archive product.
3. Confirm.

The 12 active DR products from PR #176-#179 stay live. Archiving
hides them from the contractor onboarding price selector without
deleting the historical data.

**Verify:** open `/contractor/apply` step 6 (subscription pick).
The picker should show only the 12 current DR plans, not the legacy
LearnDash ones.

**Why fourth:** pure hygiene. Doesn't unblock anything but the
backlog accumulates if not done.

---

## After all four are done

Tell the next agent session: "Phill items 1-4 done. Counsel emails
sent. MCP perms in. Vercel updated. Stripe cleaned." That session can
then:

- Hybrid DR-524 Resend DKIM (gate #2 hybrid required — you click
  Save in Cloudflare, agent reads + verifies in Resend).
- Begin TS Phase 2 Cluster A (Payments, 5 casts).
- Pre-flight the 7 acceptance tests in
  `docs/distressed-user-protocol-2026-04-27.md` §7 against the
  Preview deploy with voice widget on.

When counsel emails return positive (~1-2 business days):

- Flip `NEXT_PUBLIC_VOICE_WIDGET_ENABLED=true` on Production scope.
- Update `MEMORY.md` with the GA-launch date.
- Move the watchful first-4-hours monitoring window into your calendar.

---

## If something goes wrong

| Problem                                                | What to do                                                                                             |
| ------------------------------------------------------ | ------------------------------------------------------------------------------------------------------ |
| PowerShell one-liner fails parsing                     | Open `~/.claude/settings.local.json` in Notepad. Paste the JSON from PR #222 thread manually.          |
| Vercel says "env var already exists"                   | Edit the existing one rather than creating a duplicate. Check the scope dropdown.                      |
| Stripe archive button is greyed out                    | The product has active subscriptions. Move those subscribers to a current product first, then archive. |
| Voice widget doesn't appear on preview after flag flip | Hard-refresh the preview URL (Ctrl+Shift+R). If still missing, redeploy the PR (Vercel → Redeploy).    |
| Counsel pushes back on Path A                          | Escalate. Don't push to D2 voice GA until ADR-011 status is unambiguous.                               |

---

## References

- `docs/counsel/2026-04-26-callout-fee-counsel-package.md` — full
  technical briefing for Path A (forward to counsel if requested).
- `docs/plans/2026-04-27-d1-d5-recommendation.md` — what happens after
  this checklist clears.
- `docs/plans/2026-04-27-continuation-roadmap.md` §3 — full Phill
  decision queue.
- `MEMORY.md` 2026-04-26 entry — voice widget production surface.
