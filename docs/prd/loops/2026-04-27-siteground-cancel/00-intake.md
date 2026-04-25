# Phase 0 — Intake

**Loop:** `2026-04-27-siteground-cancel`
**Opened:** 2026-04-27
**Owner:** Phill McGurk + Claude Code

## Ask (restated)

Cancel the unused Siteground hosting subscription. Confirm nothing live
depends on it (no production site, no MX, no DNS zone of record, no
mailboxes in active use) before cancelling. Capture the cancellation
confirmation + final invoice for records.

## Related context

- `docs/prd/loop-system.md` — PRD §10 queue identifies L7 as the
  smallest admin loop remaining.
- Carsi.com.au email + DNS is hosted on Microsoft 365 + DigitalOcean
  DNS (L3 + L4 confirmed this). Siteground is **not** in that path.
- No known production deployment on Siteground — Disaster-Recovery
  ships via Vercel, carsi.com.au is static/marketing only (if live).

## Pre-flight questions for Phase 1

1. Which domain(s) sit on the Siteground account?
2. Is there a live website served from it, or is it dormant?
3. Are there any mailboxes on it that still receive mail?
4. Any DNS zones authoritative on Siteground (vs DigitalOcean / Cloudflare)?
5. Subscription tier + renewal date + refund policy?

## Exit gate

- [x] Ask is a one-liner.
- [ ] Phill confirms scope (or corrects).

**Proceed to Phase 1 — Grill Me.**
