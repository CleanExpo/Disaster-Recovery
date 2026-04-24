# Loop L2 — GitHub token + OAuth audit

**Loop id:** `2026-04-25-github-token-audit`
**Created:** 2026-04-25
**Owner:** Phill McGurk
**Priority:** Medium — security hygiene following 24 April Gmail digest.

## The ask (from 2026-04-24 Gmail digest)

> 7 GitHub token + OAuth authorisation events between 7 April and 23 April
> 2026, including broad-admin classic PATs and third-party OAuth apps
> (Cloudflare, highlight.io). Audit + prune anything not actively in use.

## Restated in my words

Review every currently-active PAT + OAuth application on Phill's GitHub
account. Revoke anything he doesn't recognise or no longer uses. Document
what's kept and why (rotation schedule).

## Context links

- `docs/proposals/gmail-action-digest-2026-04-24.md` — the source digest.
- GitHub settings URLs:
  - `https://github.com/settings/tokens` (classic + fine-grained PATs)
  - `https://github.com/settings/applications` (OAuth apps + installed
    applications)
  - `https://github.com/settings/security-log` (recent activity)

## Exit criteria

- [ ] Every PAT in `https://github.com/settings/tokens` is either used
      within the last 30 days OR revoked.
- [ ] Every OAuth application Phill doesn't recognise is revoked.
- [ ] Documented in `docs/prd/loops/<id>/07-handoff.md`: list of kept
      tokens with rotation date + list of revoked tokens with reason.
- [ ] If any revoked token was used by a CI/CD pipeline, Vercel or
      GitHub Actions env var, replacement token rotated in.

## Blockers / prerequisites

- None — Phill drives clicks in Chrome, I coordinate + record decisions.

## Out of scope

- Supabase / Vercel / Stripe token rotation (separate loops if needed).
- Full repo audit for leaked secrets (gitleaks CI covers going forward).

## Notes for Phase 1 (grill-me)

- "Not actively in use" — define. Last-used date > 30 days ago? > 7 days?
- Pi-CEO and Margot are known automation agents that legitimately need
  broad-scope PATs. Document them as kept.
- Cloudflare OAuth app — do we actually use Cloudflare on any repo? If not,
  revoke.
- highlight.io OAuth — same question.

## Notes for Phase 4 (implement)

- Non-code loop. Output is a decision log + revocation confirmations, not
  a PR.
- If any token is rotated, update the consuming Vercel project / GitHub
  Actions secret + confirm deploy still succeeds.
