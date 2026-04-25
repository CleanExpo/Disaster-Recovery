# Phase 1 — Grill Me

**Loop:** `2026-04-25-github-token-audit`
**Skill invoked:** `grill-me`.

## Q1 — "Not actively in use" — concrete threshold?

**A:** Last-used > 30 days ago AND not listed as a named automation agent
(Pi-CEO, Margot, etc.) → revoke. Between 7-30 days → flag but leave. < 7
days → keep.

## Q2 — Scope of this audit?

**A:** Phill's personal GitHub account (`CleanExpo`). In scope:

- **Classic personal access tokens** (`https://github.com/settings/tokens`)
- **Fine-grained personal access tokens** (same URL, different tab)
- **OAuth applications** he has authorised to access his account
  (`https://github.com/settings/applications`)
- **Installed GitHub Apps** on his personal account + orgs he owns
  (`https://github.com/settings/installations`)

Out of scope:
- SSH keys (separate hygiene pass; not surfaced in Gmail digest)
- GPG signing keys (same)
- Org-level audit logs (org-scoped, not personal)
- Secrets in repo code (gitleaks CI already covers)

## Q3 — Known-good list to preserve no matter what?

**A:** Confirmed via session context + Phill earlier:

- **Pi CEO Dashboard** classic PATs (appeared Apr 7 + regenerated Apr 8) —
  used by the Pi-CEO autonomy loop in Railway.
- **Pi CEO — Pi-Dev-Ops access** (Apr 10) — separate PAT for Linear-sync
  + Pi-Dev-Ops repo cron.
- **Pi-CEO Railway MARATHON-4** fine-grained (Apr 14) — Railway-specific
  build automation.
- **Margot - Cowork MCP** classic (Apr 23) — Margot agent, needs read:org
  + read:user + repo.

Keep these. Confirm last-used < 7 days each.

## Q4 — Known-suspect OAuth apps?

**A:** Gmail digest 2026-04-24 flagged:

- **Cloudflare** OAuth app — user:email scope. Do we use Cloudflare for
  anything today? Workers? Pages? DNS? None obvious. Candidate for
  revoke pending Phill confirmation.
- **highlight.io** — added Apr 14 with "view your email addresses"
  permission. Never been set up for DR/NRPG per my memory. Candidate for
  revoke.

Keep (known legitimate):
- **Vercel** (every DR deploy)
- **Linear** (webhook + sync)
- **CodeRabbit** (PR reviews)
- **bolt.new / bolt-ne.** (code review comments across repos)
- **coderabbitai[bot]** — bot, not a user-installed app

## Q5 — If a revoked token was wiring CI, what happens?

**A:** GitHub Actions secrets stored under `.github` workflows use
`secrets.<NAME>` references. Revoking the underlying PAT invalidates the
secret but doesn't break the workflow file — the workflow fails with
401/403 on next run. Vercel is in a similar state if it has a PAT env
var. Mitigation: before revoking, `grep -r "<token-last-8>" .github/`
across all repos (or use the token-usage page if GitHub shows it).

## Q6 — What audit evidence do we keep?

**A:** `07-handoff.md` captures:
- List of tokens KEPT with last-used date + rotation date target
- List of tokens REVOKED with reason
- List of OAuth apps KEPT/REVOKED with reason
- Any rotated secrets + the Vercel/GHA env var paths that had to be
  updated

No token VALUES ever get written to the repo. Only names + scopes + dates.

## Open questions at exit gate

None blocking. Let's enumerate.

## Decisions recorded

Captured above. No ADR needed (ops loop, not architectural).

**Proceed to Phase 2 — Design-an-Interface.**
