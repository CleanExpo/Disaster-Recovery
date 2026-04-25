# Phase 2 — Design-an-Interface

**Loop:** `2026-04-27-siteground-cancel`
**Skill invoked:** `design-an-interface` (minimal — admin account mutation).

## External interfaces touched

| System                          | Mutation                                                                |
| ------------------------------- | ----------------------------------------------------------------------- |
| Siteground billing / account    | Toggle auto-renew → OFF (on every product in the account)               |
| Siteground cPanel               | Read-only inventory (final walkthrough: domains, mailboxes, DBs, files) |
| Siteground file manager         | Optional download of historical website files (Phill's call)            |
| GoDaddy (honorrestorations.com) | Toggle auto-renew → OFF (let lapse)                                     |
| Repo                            | Loop artefacts only                                                     |

## Non-interfaces (explicitly NOT touched)

- carsi.com.au DNS on DigitalOcean — no change.
- Microsoft 365 tenant — no change.
- Cloudflare zone for carsi.com.au — no change.
- Any production / staging DR code — no change.

## Verification contract

### Before cancellation

1. **Siteground account inventory screenshot** — record every domain,
   every mailbox, every DB on the account. Preserved in loop folder as
   evidence-of-state-at-cancel (redacted if any PII).
2. **DNS re-check** — for every domain in the Siteground account,
   confirm NS records are NOT on Siteground nameservers. If any are,
   stop and migrate first.

### After cancellation

1. Auto-renew toggle screenshot showing **OFF** for every product.
2. GoDaddy auto-renew toggle screenshot showing **OFF** for
   honorrestorations.com.
3. Renewal date captured in `05-test-results.md` — that's the
   natural lapse date.

### After lapse (future — not in this loop)

- Attempt to load old honorrestorations.com — expect NXDOMAIN or
  parking page.
- Attempt to load Siteground cPanel — expect account suspended.
- Re-check carsi.com.au — must still pass full SPF/DKIM/DMARC/web.

## Territory claimed

- Siteground account + GoDaddy honorrestorations.com registration.
- No repo code files.

## Exit gate

- [x] Scope locked (turn off auto-renew, don't active-cancel).
- [x] Collateral-damage checks enumerated.
- [x] Verification contract explicit.

**Proceed to Phase 3 — Plan.**
