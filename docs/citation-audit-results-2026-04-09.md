# Citation Audit Results — 9 April 2026
**Auditor:** Claude Code (automated web search)
**Linear:** DR-469
**Baseline for:** DR-470 (monthly citation monitoring)

---

## Summary

**29 citation sources identified** with old business details. The old profile ("Disaster Recovery Qld", 4/17 Tile St Wacol, 1300 309 361) persists across multiple platforms. Website pages on disasterrecovery.com.au itself contain legacy branding.

---

## Citation Inventory

### Tier 1: Own Properties (CTO can fix)

| Platform | URL | Current Name | Old Address | Old Phone | Action |
|----------|-----|-------------|-------------|-----------|--------|
| disasterrecovery.com.au/about-us | Own site | "Disaster Recovery QLD" | Wacol refs | 1300 309 361 | Update page content |
| disasterrecovery.com.au/about-us-disaster-recovery-qld-our-story/ | Own site | "Disaster Recovery QLD" | "head office in Wacol" | - | Update/redirect |
| disasterrecovery.com.au/about-us-disaster-recovery-qld-our-story/disaster-recovery-qld-about-us/ | Own site | "Disaster Recovery QLD" | - | - | Update/redirect |
| disasterrecovery.com.au/location/disaster-recovery-qld-service-locations/ | Own site | "Disaster Recovery Qld" | SEQ only | - | Update to national |
| disasterrecovery.com.au/wacol-queensland-australia/ | Own site | - | Wacol page | - | Evaluate — keep as location page or redirect |
| disasterrecovery.com.au/water-damage-restoration-service/emergency-restoration-services/ | Own site | "Disaster Recovery QLD" | - | - | Update branding |

### Tier 2: Social Media (Toby must update)

| Platform | URL | Current Name | Old Address | Old Phone | Action |
|----------|-----|-------------|-------------|-----------|--------|
| Facebook | facebook.com/disasterrecoveryau | "Disaster Recovery \| Wacol QLD" | Wacol QLD | 1300 309 361 | DR-465: Remove address, phone, update name |
| LinkedIn | au.linkedin.com/company/disaster-recovery-qld-pty-ltd | "Disaster Recovery QLD Pty Ltd" | Wacol, Brisbane, QLD | - | DR-466: Rename, remove location |

### Tier 3: Maps & Navigation (Toby must update)

| Platform | URL | Current Name | Old Address | Old Phone | Action |
|----------|-----|-------------|-------------|-----------|--------|
| Google Maps/GBP | Google Business Profile | "Disaster Recovery \| Wacol QLD" | 4/17 Tile St, Wacol | 1300 309 361 | DR-463: Convert to SAB, remove address |
| Waze | waze.com/live-map/directions/.../disaster-recovery-qld | "Disaster Recovery Qld" | 17 Tile St, Wacol | - | Submit correction via Waze Map Editor |

### Tier 4: Third-Party Directories (Toby/Marketing must claim & update)

| Platform | URL | Current Name | Old Address | Old Phone | Action |
|----------|-----|-------------|-------------|-----------|--------|
| Wheree | disaster-recovery-qld.wheree.com | "Disaster Recovery Qld" | Logan area | - | Claim listing, update or request removal |
| Localsearch | localsearch.com.au/find/.../wacol-qld-4076 | Listed under Wacol 4076 | Wacol QLD 4076 | - | DR-467: Claim listing, update to national SAB |

### Tier 5: Data Aggregators (DR-468 — submit correction requests)

| Platform | Status | Action |
|----------|--------|--------|
| RocketReach | Listed as "Disaster Recovery QLD" with employee data | Submit data correction |
| ZoomInfo | "South East Queensland" service area | Submit data correction |
| Wheree | Logan area listing | Submit data correction or removal |
| Osogbo | Unknown — check | Search and submit correction if found |
| Ensun | Unknown — check | Search and submit correction if found |

---

## Own Website Pages Requiring Branding Update

The following pages on disasterrecovery.com.au reference the old "Disaster Recovery QLD" branding, Wacol address, or 1300 phone number:

1. `/about-us` — "Disaster Recovery QLD", Wacol references
2. `/about-us-disaster-recovery-qld-our-story/` — Full old branding
3. `/about-us-disaster-recovery-qld-our-story/disaster-recovery-qld-about-us/` — Old name in URL and content
4. `/location/disaster-recovery-qld-service-locations/` — SEQ-only service area framing
5. `/wacol-queensland-australia/` — Wacol location page
6. `/water-damage-restoration-service/emergency-restoration-services/` — Old branding

**Note:** These are legacy WordPress-era pages that appear to be separate from the Next.js app. Some may be static HTML or redirected content. CTO should audit whether these are still served by the current Next.js build or are Vercel redirect targets.

---

## Code Changes Completed This Session (DR-464)

The following branding changes were made to the Next.js codebase:
- `app/locations/qld/page.tsx` — "Disaster Recovery Queensland" → "Disaster Recovery Australia | Queensland"
- `app/r6-demo/page.tsx` — "Disaster Recovery Queensland" → "Disaster Recovery Australia"
- `app/admin/site-audit/page.tsx` — "LocalBusiness" → "ProfessionalService" in audit label
- `app/locations/[city]/[...slug]/page.tsx` — Comment fix: LocalBusiness → ProfessionalService
- `app/events/tc-maila-fnq-2026/page.tsx` — Comment fix: LocalBusiness → ProfessionalService

---

## Next Steps

1. **CTO:** Update own-site pages (Tier 1) — may require content edits or redirects
2. **Toby:** Update Facebook (DR-465), LinkedIn (DR-466), GBP (DR-463)
3. **Toby:** Claim/update Tier 4 directory listings (DR-467)
4. **CTO:** Submit data corrections to Tier 5 aggregators (DR-468)
5. **Monthly monitoring:** DR-470 — re-run this audit monthly to track propagation
