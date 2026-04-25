# Phase 1 — Grill Me

**Loop:** `2026-04-27-siteground-cancel`
**Skill invoked:** `grill-me`.

## Q1 — What's actually on Siteground?

**A:** Historically: hosting + SpamExperts mail filter for the Honor
Restorations / CARSI era. Honor Restorations has been fully shut down
for 12+ months.

## Q2 — Does carsi.com.au depend on Siteground?

**A:** No. DNS audit 2026-04-27:

- NS: DigitalOcean (`ns1/2/3.digitalocean.com`).
- Web: Cloudflare proxy (`172.66.0.96`, `162.159.140.98`).
- Mail: Microsoft 365 (`carsi-com-au.mail.protection.outlook.com`).
- SPF + DKIM + DMARC (L3 + L4) all on DO DNS. Zero Siteground touch.

Registrar note: domain may be registered at GoDaddy, but the DNS
authority is DigitalOcean. Registrar ≠ DNS host.

## Q3 — Does honorrestorations.com.au depend on Siteground?

**A:** Domain is non-existent (expired). Dead. No action.

## Q4 — Does honorrestorations.com depend on Siteground?

**A:** Yes, partially — MX records still point at Siteground's
SpamExperts filter (`mx10/20/30.antispam.mailspamprotection.com`).
NS is GoDaddy; web A-records are GoDaddy parking.

Given Honor Restorations shut down 12+ months ago, no mailbox is
being read. When Siteground lapses, mail will simply bounce. That is
acceptable (no business mail to miss).

**Decision:** let honorrestorations.com lapse at its own GoDaddy
renewal date. No migration. No brand-protection renewal.

## Q5 — Cancel actively or let lapse?

**A:** Let lapse (Phill's call). Rationale:

- Active cancellation mid-billing-period is refund-dependent and
  varies by Siteground ToS.
- Letting it lapse is zero-effort, avoids ToS gymnastics, and achieves
  the same end-state.
- Pre-requisite: turn auto-renew **OFF** in Siteground billing — if
  that's on, the card gets charged instead of the service lapsing.

## Q6 — Is there data on Siteground worth exporting?

**A:** Candidates:

- Old Honor Restorations website files (historical; no live value).
- Old mailbox archives (if any still exist in cPanel webmail).
- Old MySQL databases (if any).
- Old cron / backup snapshots.

**Decision:** take a final backup download only if Phill wants
historical website files. Otherwise skip. Zero business-continuity
risk either way (company is wound up).

## Q7 — Any collateral damage to check?

**A:** Check at Phase 4:

- Any domain in the Siteground account whose DNS is hosted there
  (not migrated to DO / Cloudflare / GoDaddy).
- Any SSL cert Siteground-issued that's in use elsewhere (unlikely —
  Cloudflare terminates for carsi.com.au).
- Any email forwarders from an old address to Phill's current inbox.

## Open questions at exit gate

None blocking. One conditional: final decision on exporting historical
files (Phil's call inside Phase 4).

## Decisions recorded

- Cancellation method: **let lapse**, auto-renew OFF.
- honorrestorations.com: **let lapse** at its own GoDaddy renewal.
- No migrations needed.
- Optional export of historical files at Phill's discretion.

**Proceed to Phase 2 — Design-an-Interface.**
