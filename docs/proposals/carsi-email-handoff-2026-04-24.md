# CARSI Email — Session Handoff 2026-04-24

**NOT LEGAL ADVICE. Engineering record.**

## What was broken

- `phill.m@carsi.com.au` had never been created. Rana set up `phill@carsi.com.au` (no `.m`) on the active GoDaddy Email Essentials plan.
- Phill needed `phill.m@` specifically.
- Both mailbox slots were already consumed (`phill@` + `support@`), so a fresh create wasn't possible without buying a third slot.
- Confusion about whether the historical email was on Siteground, M365, or GoDaddy meant we nearly took the wrong path (M365 tenant swap, Siteground→GoDaddy migration, new M365 purchase).

## What was actually true

- carsi.com.au DNS lives on DigitalOcean (nameservers `ns1/2/3.digitalocean.com`).
- DNS MX points at `carsi-com-au.mail.protection.outlook.com` — the Microsoft Exchange Online AU edge, which routes mail by tenant based on the domain's M365 ownership TXT.
- The domain's owner-verification TXT is `NETORGFT6483632.onmicrosoft.com` — the tenant ID of the GoDaddy-resold M365 instance that GoDaddy Email Essentials sits on.
- So both mailboxes (`phill@` and `support@`) route correctly to the GoDaddy Email Essentials tenant under the hood.
- Siteground has a GoGeek hosting plan (expiring 18 May 2026) but **zero websites deployed** → carsi.com.au email was never on Siteground. The "Siteground access" red herring cost us ~15 minutes.
- The `admin@cleanexpo247.com` GoDaddy account no longer exists ("This username does not exist in our system").
- The `phill@disasterrecovery.com.au` GoDaddy account (customer #123895016) has **one unused M365 subscription** and zero domains — candidate for cancellation.

## What we did

1. **Renamed** `phill@carsi.com.au` → `phill.m@carsi.com.au` via GoDaddy Email & Office admin (`productivity.godaddy.com/#/mailbox/43918310` → Edit → Username → Save). The venture-dashboard pencil flow had returned "username not available" earlier — the admin-level flow accepted it. GoDaddy confirmation: *"phill.m@carsi.com.au is being updated."*
2. **Verified mail flow** by sending from `phill.mcgurk@gmail.com` → `phill.m@carsi.com.au`. Email landed in the OWA inbox at 15:17. Parallel test sent to `support@carsi.com.au` for parity.
3. No DNS changes were needed — DNS was already correct all along.

## What's left for Phill

### 1. DKIM (improves outbound deliverability — optional)

Outbound mail from `phill.m@` and `support@` currently leaves without DKIM signing. Gmail/Outlook consumer/banks may spam-flag it. To fix (15 min):

**Step 1** — Add two CNAMEs to DigitalOcean (`cloud.digitalocean.com/networking/domains/carsi.com.au` → Create a record):

| Type | Hostname | Value | TTL |
|---|---|---|---|
| CNAME | `selector1._domainkey` | `selector1-carsi-com-au._domainkey.NETORGFT6483632.onmicrosoft.com` | 3600 |
| CNAME | `selector2._domainkey` | `selector2-carsi-com-au._domainkey.NETORGFT6483632.onmicrosoft.com` | 3600 |

**Step 2** — Enable DKIM signing in the Microsoft admin centre for the tenant. The GoDaddy Email Essentials "Advanced Email Security" panel has a shortcut for this; otherwise direct link is `https://security.microsoft.com/dkimv2` while signed in as the tenant admin. Click **Enable** on both selectors for carsi.com.au.

### 2. Siteground cleanup — optional cost save

Siteground GoGeek plan expires 18 May 2026 and hosts nothing. Let it expire to save the renewal fee, or cancel now via `Services → Hosting → … → Cancel`. Domains (2) on Siteground can stay — they're independent of the hosting product.

### 3. Unused M365 sub on `phill@disasterrecovery.com.au` GoDaddy account

Customer #123895016 has one unused Microsoft 365 subscription (the "Buy your first product" empty state). Either:
- **Cancel it** (immediate save) via that account → Subscriptions.
- **Keep it** for a future need (e.g. disasterrecovery.com.au mailboxes, the Disaster Recovery iOS epic).

### 4. Historical email recovery — confirm source

Old `@carsi.com.au` email wasn't on Siteground. Possible locations:
- **Local Outlook .pst / .ost files** — `C:\Users\Phill\AppData\Local\Microsoft\Outlook\`. If you ever opened carsi mail in Outlook desktop, folders may still be there.
- **Apple Mail / iCloud** — if iPhone/Mac was configured with the old mailbox, content may still be cached locally.
- **M365 deleted-items / recoverable-items retention** on the tenant (30 days by default, longer if legal hold was on).

If you want me to pull those into the new mailbox, point me at whichever source you find and I'll drive the import.

## Tenants & IDs (for future reference)

- **carsi M365 tenant:** `NETORGFT6483632.onmicrosoft.com` (GoDaddy-resold) — currently active.
- **New GoDaddy Email Essentials mailbox IDs:** `phill.m@carsi.com.au` = `43918310`, `support@carsi.com.au` = separate ID.
- **DO account owner:** `contact@unite-group.in` (DigitalOcean login).
- **GoDaddy accounts:** `phill.m@carsi.com.au` (has carsi + autoagi + honorrestorations + votacademy + connexusm + metis.today + cleanexpo247.com + carsi.au + 50kmradius.com), `phill@disasterrecovery.com.au` (customer #123895016, 0 domains, 1 unused M365 sub), ~~`admin@cleanexpo247.com`~~ (cancelled).
- **Siteground account owner:** `Phill McGurk` (no websites, 2 domains, 1 hosting plan expiring 2026-05-18).
- **Test email references:** subject `Mail flow test — 2026-04-24` landed in `phill.m@carsi.com.au` OWA at 15:17.

## Related ADRs / proposals
- `docs/proposals/digitalocean-recon.md` (historical recon before resolving the real issue)
- `docs/proposals/ios-app-store-strategy.md` (unrelated but same session)
