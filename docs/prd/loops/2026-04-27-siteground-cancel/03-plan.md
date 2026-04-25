# Phase 3 — Plan

**Loop:** `2026-04-27-siteground-cancel`

## Numbered steps

1. **Phill logs into Siteground** (Chrome, https://login.siteground.com).
   - Success: Client Area loads.
   - Claude cannot enter passwords — this step is Phill's.

2. **Inventory walk of the Siteground account.**
   - Sites tab: list every hosted site.
   - Email tab: list every mailbox.
   - Domains tab: list every registered domain.
   - Services / Billing tab: list every active subscription + renewal date.
   - Success: screenshot of each tab committed to loop folder
     (`04-inventory-*.png`).

3. **Cross-check DNS for every domain listed.**
   - For each domain: `nslookup -type=NS <domain> 8.8.8.8`.
   - Success: zero domains have NS on `*.siteground.com` /
     `ns1/2.siteground.*` / Siteground nameservers. If any do, **stop
     and open a migration loop first** (do not cancel).

4. **Optional historical export (Phill's call).**
   - If desired: download a final `public_html` tarball + mailbox
     backup from cPanel.
   - Skip if nothing historically valuable.

5. **Turn auto-renew OFF on every Siteground product.**
   - Services → each subscription → Auto-Renewal → Disable.
   - Success: each product shows "Auto-Renewal: OFF".

6. **Capture renewal dates.**
   - Record the natural lapse date for each product.
   - Success: dates written into `05-test-results.md`.

7. **Turn auto-renew OFF on GoDaddy honorrestorations.com.**
   - Phill logs into GoDaddy → My Products → Domains →
     honorrestorations.com → Auto-renew → Off.
   - Success: screenshot showing auto-renew disabled.

8. **Final re-check carsi.com.au is unaffected.**
   - `nslookup carsi.com.au 8.8.8.8` + `nslookup -type=MX` +
     `nslookup -type=TXT _dmarc.carsi.com.au 8.8.8.8`.
   - Success: NS = DigitalOcean, MX = Outlook, DMARC intact.

9. **Write loop artefacts** (05-test-results.md, 06-review.md,
   07-handoff.md).

10. **Commit + PR + merge** on
    `loop/2026-04-27-siteground-cancel`.

## Token budget

~6k — admin loop, mostly Phill-driven UI clicks + Claude-driven DNS checks.

## File territory

- Loop artefacts only. No repo code.

## Claude's role vs Phill's role

| Step                      | Who                                            |
| ------------------------- | ---------------------------------------------- |
| 1 (login)                 | Phill (password barrier)                       |
| 2 (navigate + screenshot) | Claude via Chrome after Phill is logged in     |
| 3 (nslookup)              | Claude                                         |
| 4 (download)              | Claude after Phill clicks download destination |
| 5 (toggle auto-renew)     | Claude drives UI; Phill confirms each click    |
| 6 (capture dates)         | Claude reads UI + writes to file               |
| 7 (GoDaddy)               | Phill logs in; Claude drives                   |
| 8 (final DNS check)       | Claude                                         |
| 9 (artefacts)             | Claude                                         |
| 10 (PR)                   | Claude                                         |

**Proceed to Phase 4 — Implement.**
