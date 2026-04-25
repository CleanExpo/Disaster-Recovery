# Phase 5 — Test Results

**Loop:** `2026-04-27-siteground-cancel`

## Siteground account inventory (2026-04-27)

### Services

| Service          | Count | Detail                                                      | Action                      |
| ---------------- | ----- | ----------------------------------------------------------- | --------------------------- |
| Hosting          | 1     | **GoGeek**, 0/Unlimited Websites, expires 18 May 2026       | Auto-renew already OFF ✅   |
| Domains          | 2     | `metis.today` (pending transfer), `carsi.com.au` (external) | SG not registrar; no action |
| Website Builder  | 0     | —                                                           | —                           |
| Ecommerce        | 0     | —                                                           | —                           |
| Coderick AI      | 0     | —                                                           | —                           |
| AI Studio        | 1     | **Essential** tier — 20000 tokens/month **free**            | No billing; no action       |
| Email Marketing  | 0     | —                                                           | —                           |
| Google Workspace | 0     | —                                                           | —                           |
| Expert Care      | 0     | —                                                           | —                           |

### Hosting plan detail

- Plan: **GoGeek**
- Sites hosted: **0** (empty plan)
- Expiry: **18 May 2026**
- Auto-renewal status in Renewal Settings modal: **OFF** already
- No manual intervention required — will lapse naturally on 18 May 2026.

### Domains detail

- `metis.today` — type: External Domain, status: **PENDING TRANSFER** (unlock required). DNS audit: NS = `dns*.p04.nsone.net` (NS1), A = `54.253.94.210` (AWS Sydney), MX = Netlify. Zero Siteground DNS dependency.
- `carsi.com.au` — type: External Domain. DNS audit (L3/L4): NS = DigitalOcean, Web = Cloudflare, Mail = Microsoft 365. Zero Siteground DNS dependency.

Both listed as "External Domain" = Siteground is NOT the registrar. Nothing to disable in Siteground for either.

### Active-plan cross-check

- AI Studio **Essential** tier is free-tier (the login-page promo: "FREE ACCESS — Introducing SiteGround AI Studio"). No billing event when Siteground account lapses.

## DNS collateral-damage check

Nothing points to Siteground nameservers. Cross-referenced:

- carsi.com.au → DigitalOcean ✅
- honorrestorations.com.au → NXDOMAIN ✅
- honorrestorations.com → GoDaddy NS; MX at `*.antispam.mailspamprotection.com` (Siteground's SpamExperts filter) ⚠️ _mail delivery dies when Siteground lapses — acceptable per Phill's direction (Honor Restorations shut down 12+ months)_
- metis.today → NS1 / Netlify ✅

## GoDaddy honorrestorations.com auto-renew

**Deferred.** GoDaddy login was failing at loop execution time (2026-04-27). Residual debt — not blocking Siteground lapse.

## Verification contract — status

| Check                                                   | Status                      |
| ------------------------------------------------------- | --------------------------- |
| Siteground hosting auto-renew = OFF                     | ✅ (already off)            |
| Natural lapse date captured                             | ✅ 18 May 2026              |
| No active paid services remain that auto-renew          | ✅                          |
| No production DNS / mail / web dependency on Siteground | ✅                          |
| GoDaddy honorrestorations.com auto-renew = OFF          | ⏳ deferred (login failing) |

## Exit gate

- [x] Siteground subscription will lapse naturally on 18 May 2026 with no further action.
- [x] No collateral damage to carsi.com.au or any live Disaster Recovery surface.
- [ ] GoDaddy honorrestorations.com auto-renew disable (deferred).

**Proceed to Phase 6 — Review.**
