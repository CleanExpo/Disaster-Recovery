# Gmail Action Digest — 2026-04-24

**Account:** phill.mcgurk@gmail.com
**Window:** Last 14 days (supplemented by 30–60 day targeted searches)
**Scope:** Read-only review. No emails opened, replied to, forwarded, archived, starred, or modified.
**Disclaimer:** NOT LEGAL ADVICE. Action items below are administrative prompts only; consult TKM Accountants or a qualified adviser before acting on anything tax/ASIC related.

---

## 1. Headline action items (priority order)

1. **TKM Accountants — 2026 Annual Secretarial Requirements for DISASTER RECOVERY QLD PTY LTD** (today, 8:52 AM). Annual Company Statement (ASIC) needs review — PDF attached. Time-sensitive; annual review dates typically have a short ASIC window.
2. **TKM Accountants — 2025 Tax Docs (P & B McGurk) via PandaDoc** (Apr 14). Personal tax documents waiting for review/signature.
3. **GitHub — Possible valid secrets detected in CleanExpo/Cinematic-Claude** (Apr 6). Secret scanning alert — rotate/revoke credentials in that repo.
4. **GitHub — "Please review this sign in" from unrecognised location** (Apr 17). Confirm the sign-in was you; otherwise treat as account compromise.
5. **GitHub — Password was reset** (Apr 17). Confirm this was you; pairs with #4.
6. **GoDaddy — SSL Certificate coming up for renewal** (Apr 5). Verify billing details are current so auto-renew succeeds.
7. **GoDaddy — Microsoft 365 account provisioned** (Apr 6). New mailbox with temp password waiting to be claimed / set up.
8. **Stripe — March 2026 Unite-Group Agency tax invoice available** (Apr 6). Download for BAS/bookkeeping.
9. **Anthropic receipt #2341-2545-8210** (Apr 20). File for expense records (PDF receipt + invoice attached).
10. **Better Stack — Synthex API Health incident auto-resolved** (Apr 5, 4:28am AEST). Review RCA; +2 incidents vs prior week per weekly summary.

---

## 2. Per-category summary

### Apple / iOS

No emails from `apple.com`, `id.apple.com`, or `email.apple.com` in the last 30 days. No Team ID / Bundle ID / `.p8` references surfaced in this window.

### DigitalOcean

No DO billing/deploy/security emails in the last 14 days. (Clean — no action.)

### Microsoft 365 / GoDaddy

- **GoDaddy — "Your Microsoft 365 account is ready"** (Apr 6). Temp password for new mailbox; complete setup.
- **GoDaddy — Renewal receipt for order #4057280637** (Apr 6). Auto-renewal completed; keep for records.
- **GoDaddy Renewals — SSL Certificate upcoming renewal** (Apr 5). Verify payment method current.
- No Microsoft admin alerts (DKIM/DNS/mailbox issues) in the window.
- Context: your outbound test emails today (`Mail flow test — 2026-04-24`, `Forward verification`) confirm GoDaddy rename to `phill.m@carsi.com.au` is working.

### GitHub

High volume of account/security events this fortnight — review for anything unfamiliar:

- Apr 6 — **Possible valid secrets detected in `CleanExpo/Cinematic-Claude`** (action required — rotate).
- Apr 17 — Sign-in from unrecognised location; password reset (confirm both were you).
- Apr 23 — Personal access token (classic) "Margot - Cowork MCP" added (`read:org, read:user, repo`).
- Apr 16 — OAuth app **Cloudflare** authorised (`user:email`).
- Apr 14 — Fine-grained PAT "Pi-CEO Railway MARATHON-4" added.
- Apr 14 — GitHub App **highlight.io** authorised (`View email addresses`).
- Apr 10 — PAT (classic) "Pi CEO — Pi-Dev-Ops access" added.
- Apr 8 — PAT (classic) "Pi CEO Dashboard" regenerated (broad admin scopes).
- Apr 7 — PAT (classic) "Pi CEO Dashboard" added (broad admin scopes).
- Plus ~25 CodeRabbit / github-actions PR review notifications across CleanExpo/Synthex, CleanExpo/RestoreAssist, CleanExpo/DR-NRPG — most informational, but PR #60 (DR-NRPG) was **skipped by CodeRabbit (300 files > 150 limit)** and PR #48 (Synthex) has a flagged **race condition** comment.
- _Token values not pasted — review directly in GitHub settings._

### Vercel

- Apr 5 — PR #139 (CleanExpo/RestoreAssist) "fix: use next build --no-lint to prevent 45min Vercel timeout" — CodeRabbit review in progress. Follow-up PRs #140, #141, #142 also address Vercel build timeouts (Next.js 16 migration / Turbopack). Confirm build pipeline is now green.

### Supabase

No Supabase cost-alert or security-advisor emails in the window.

### Stripe / Payments

- Apr 6 — **Stripe: Unite-Group Agency tax invoice for Mar 1–31, 2026** available in Dashboard. Download for BAS.
- Apr 5 — **Sentry payment receipt** (PDF attached) — auto-billed, no action.
- Apr 20 — **Anthropic receipt #2341-2545-8210** (PDF invoice + receipt attached) — file.

### Linear / Project management

- Apr 20 — Status change to **Duplicate** on `[DR-530] GAP-061 — Platform guarante...`. 1 unread notification in Linear Inbox.

### Australian tax / accounting / legal

- **TKM Accountants — 2026 Annual Secretarial Requirements (DISASTER RECOVERY QLD PTY LTD)** — today 8:52 AM, PDF attached. ASIC annual review — typically must be confirmed within 28 days of the review date. Open the email and confirm the review date.
- **TKM Accountants — 2025 Tax Docs (P & B McGurk) via PandaDoc** (Apr 14) — personal tax docs awaiting sign/review.
- No ATO or ASIC direct emails surfaced.

### Business email (@carsi.com.au / @disasterrecovery.com.au / @cleanexpo247.com)

- Mail-flow tests today (3:17 PM / 3:31 PM / 3:59 PM) confirm `phill.m@carsi.com.au` inbound routing works post-GoDaddy rename. No external correspondence requiring a reply surfaced.

### Monitoring / Ops

- **Better Stack** — Apr 5 **Synthex API Health** incident (04:28 AEST), auto-resolved 02:04 AEST same-day. Weekly summary (Apr 6): 13 incidents, +2 vs prior week — worth a trend check.
- **Sentry** — Weekly report (Apr 5): 0 project errors, 139 transactions. Clean.

### Other (informational / low-priority)

- Google Search Console — `synthex.social` started receiving impressions from 12 Apr 2026 (informational).
- Skool (The Agentic Lab, Growing a Strong Restoration Business) — community posts.
- Artlist, Nico AI Ranking, Caleb Ulku, Better Stack Team newsletter — marketing.

---

## 3. Recommended next actions

| #   | Action                                                                                                              | Time estimate | Linked email                                                  |
| --- | ------------------------------------------------------------------------------------------------------------------- | ------------- | ------------------------------------------------------------- |
| 1   | Open TKM Annual Secretarial PDF, confirm ASIC review date, flag deadline in calendar                                | 10 min        | TKM — 2026 Annual Secretarial Requirements (today)            |
| 2   | Review & sign PandaDoc 2025 tax docs                                                                                | 15 min        | TKM — 2025 Tax Docs (Apr 14)                                  |
| 3   | Open GitHub secret-scanning alert on `CleanExpo/Cinematic-Claude`; rotate any valid secrets found                   | 20 min        | GitHub — secrets detected (Apr 6)                             |
| 4   | Verify unrecognised-location sign-in and password reset on Apr 17 were you; if not, revoke sessions + re-enable 2FA | 10 min        | GitHub — Please review this sign in / password reset (Apr 17) |
| 5   | Audit Apr 7 – Apr 23 token / OAuth additions (7 events). Revoke anything not recognised                             | 15 min        | GitHub — PAT + OAuth notifications                            |
| 6   | Confirm GoDaddy SSL renewal billing card is current                                                                 | 5 min         | GoDaddy Renewals (Apr 5)                                      |
| 7   | Finish GoDaddy Microsoft 365 mailbox setup (set permanent password, MFA)                                            | 15 min        | GoDaddy — M365 account ready (Apr 6)                          |
| 8   | Download Stripe Mar 2026 tax invoice + Anthropic + Sentry receipts into bookkeeping folder                          | 10 min        | Stripe / Anthropic / Sentry (Apr 5–20)                        |
| 9   | Clear Linear inbox (1 unread — DR-530 duplicate)                                                                    | 5 min         | Linear (Apr 20)                                               |
| 10  | Check Better Stack monitor trends — why +2 incidents this week on Synthex API Health                                | 10 min        | Better Stack (Apr 5–6)                                        |

---

## 4. Anything suspicious

- **Apr 17 GitHub sign-in from unrecognised location + password reset** — these are normal if you reset your password, but worth verifying. If either action was not you, treat as account-takeover.
- **Cloudflare OAuth app added Apr 16 (`user:email`)** and **highlight.io GitHub App added Apr 14** — benign if you authorised them; worth confirming both were intentional.
- **Multiple Personal Access Tokens with broad admin scopes** (Pi CEO Dashboard — `admin:enterprise`, `admin:org`, etc., Apr 7 added + Apr 8 regenerated) — these have very high privilege. Confirm they're bound to short-lived infrastructure and stored securely.
- **No classic phishing patterns** (no "verify your account" from spoofed senders, no unexpected shipping receipts, no invoice attachments from unknown senders) surfaced in the scan.

---

## 5. What I did NOT open

- Artlist marketing (AI voiceover tool)
- Nico AI Ranking newsletter (Apr 6)
- Caleb Ulku live class invitation (Apr 5)
- Skool feeds (The Agentic Lab, Growing a Strong Restoration Business)
- Better Stack Team newsletter (Know your MTTR)
- Google Search Console impressions confirmation (informational)
- 25+ CodeRabbit / github-actions bot PR comments (read inline in GitHub as needed)

---

## Scope notes

- Searches run: 11 of 11 planned queries. Empty-result queries (0 matches in their window): Apple domains, DigitalOcean, pure GoDaddy/secureserver, Microsoft direct, subject:invoice/receipt, subject:expiring/renewal, github.com 7d, subject:failed/error/alert, Stripe/Vercel/Supabase 14d. (Most signal was captured via the broader `to:phill.m@carsi.com.au OR support@carsi.com.au` search window.)
- **No credentials, tokens, or OTPs are included in this digest.** Token names appear for review context; values are in the original emails only.
- Tool note: Gmail MCP server returned "Not connected" — digest built via read-only Chrome navigation to search URLs.
