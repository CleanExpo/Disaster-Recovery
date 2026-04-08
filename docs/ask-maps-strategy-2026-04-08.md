# Ask Maps Strategy — disasterrecovery.com.au
**Prepared:** 2026-04-08  
**Status:** Active  
**Linear:** DR-443 through DR-461

---

## 1. Background

Google launched **Ask Maps** on 12 March 2026 — Gemini-powered conversational AI search inside Google Maps. When a distressed policyholder types or speaks "who can help me with my insurance claim after the cyclone in Cairns," Ask Maps generates a curated AI response citing local businesses and their websites.

This fundamentally changes disaster-recovery discovery. Traditional SEO (blue links) is supplemented by AI-curated citations. To appear in Ask Maps results, a business must have:

1. A complete, attribute-rich Google Business Profile (GBP)
2. Website content that matches conversational queries (FAQ pages, schema markup)
3. Recent Google reviews containing relevant service keywords
4. Current Google Posts and Q&A seeded on the GBP

**Current status:** disasterrecovery.com.au has zero Google reviews (GAP-074), no seeded Q&A, infrequent GBP posts, and Brisbane-centric service area framing (GAP-049). This makes the platform **functionally invisible** in Ask Maps for national disaster events.

---

## 2. Platform Improvements Completed (DR-450/451/452)

The following code changes are live as of 2026-04-08:

### 2.1 Comprehensive FAQ Page — /faq (DR-450 + DR-451)
- 30 questions across 6 categories: Insurance Claims, Water Damage, Mould Remediation, Fire & Storm, Emergency Response, Contractor Quality
- Embedded `FAQPage` + `Question` + `Answer` schema markup — machine-readable by Gemini
- Canonical URL: `https://disasterrecovery.com.au/faq`
- Written in natural conversational language matching how policyholders ask Ask Maps

### 2.2 Expanded Structured Data — layout.tsx (DR-452)
The `EmergencyService` schema block now includes:
- `serviceType` array — 12 specific service types for query matching
- `areaServed` — all 8 states + 15 specific cities (Cairns, Townsville, Gold Coast, etc.)
- `hasOfferCatalog` — 6 service items with IICRC standard references

### 2.3 Post-Claim Review Solicitation Email (DR-455)
- Fires automatically when a contractor marks a job `completed`
- Guides reviewer to mention: service type, location, response speed, insurer acceptance
- Links directly to Google review page via `GOOGLE_REVIEW_URL` env var
- Non-fatal: won't break job completion if SMTP is not configured

---

## 3. Gap Assessment (Current GBP State)

**Owner for GBP actions: Toby / Marketing team**

### 3.1 Priority 1 Actions (Due April 10–11, 2026)

#### DR-443: GBP Audit Checklist
Open Google Business Profile Manager at https://business.google.com and audit:

| Field | Current Status | Required |
|-------|---------------|---------|
| Business name | disasterrecovery.com.au | "Disaster Recovery Australia" |
| Primary category | Check | "Damage Restoration Service" |
| Secondary categories | Check | "Fire Damage Restoration Service", "Water Damage Restoration Service" |
| Description | Check | 750 chars — use template below |
| Hours | Check | 24/7 (all days 12:00AM–11:59PM) |
| Phone | Check | Must be set for emergency service visibility |
| Website | Check | https://disasterrecovery.com.au |
| Service area | Brisbane-centric — INCORRECT | See Section 3.2 |
| Photos | Check (likely low count) | Minimum 20 initial uploads |
| Q&A | Likely empty | Seed 20 questions — see Section 4 |
| Posts | Infrequent | 2x per week — see Section 5 |
| Reviews | **ZERO** — GAP-074 | Target 10 by April 14 |
| Attributes | Check | See Section 3.3 |

**GBP Description Template (750 chars):**
```
Disaster Recovery Australia — 24/7 IICRC-certified disaster restoration across all of Australia.

Water damage, fire damage, storm damage, mould remediation, and flood recovery — residential and commercial.

NRPG network contractors hold current IICRC certification (S500:2025, S520:2025, S700:2025), $20M+ public liability insurance, and valid trade licences for every state.

Lodge your claim online at disasterrecovery.com.au — we match you with the nearest certified contractor (20–100km radius) and target a 60-minute emergency response.

We document everything your insurer needs.
```

#### DR-444: Service Area Update
Replace the current (suspected Brisbane-centric) service area with:
- **QLD:** Brisbane, Gold Coast, Sunshine Coast, Townsville, Cairns, Cape York
- **NSW:** Sydney, Newcastle, Wollongong
- **VIC:** Melbourne, Geelong, Ballarat
- **WA:** Perth metro (Narelle recovery zone)
- **SA:** Adelaide
- **TAS:** Hobart
- **ACT:** Canberra
- **NT:** Darwin

> Note: Do not claim areas without confirmed contractor coverage (GAP-066 for FNQ pending Toby's confirmation).

#### DR-445: GBP Attributes to Enable
In GBP → Edit Profile → More → Attributes:
- ✅ Emergency services
- ✅ 24/7 availability  
- ✅ Free estimates / Free assessments
- ✅ IICRC Certified (if available as an attribute)
- ✅ Serves all of Australia

### 3.2 Critical Finding — Zero Reviews (GAP-074)
**Google reviews are the primary mechanism by which Ask Maps matches conversational queries.** A business with zero reviews is functionally invisible.

> **Target:** 10 Google reviews by 14 April 2026. 50 reviews by 30 May 2026.

Review collection strategy:
1. Identify past clients from completed claims in the Prisma `Job` table (query: `status = 'completed'` with `customerEmail IS NOT NULL`)
2. Send the review request email template below (Section 6)
3. Include the Google review link: https://g.page/r/[YOUR_PLACE_ID]/review
4. Going forward: DR-455 automates this — review email fires on every completed job

---

## 4. GBP Q&A Seeding — 20 Questions (DR-449)

Login to Google Maps → your business listing → Q&A → Ask a Question.
Seed these questions (then answer them yourself as the business owner):

1. **Q:** Do you respond to water damage emergencies in [city]? **A:** Yes — NRPG contractors are active across all of Australia including [city]. Lodge at disasterrecovery.com.au for a 60-minute response.
2. **Q:** Are your contractors IICRC certified? **A:** Yes. Every NRPG contractor holds current IICRC certification and $20M public liability insurance.
3. **Q:** Can you help with my insurance claim? **A:** NRPG contractors provide full insurance documentation — scope of works, moisture logs, before/after photos — that your insurer will accept.
4. **Q:** Do you service cyclone damage in Far North Queensland? **A:** Yes — we have contractors active in Cairns, Townsville, and Cape York for cyclone and tropical storm damage.
5. **Q:** How much does water damage restoration cost? **A:** Minimum callout is $2,200 covering extraction, industrial drying, and antimicrobial treatment. Most home insurance policies cover this cost.
6. **Q:** Do you do mould removal? **A:** Yes. NRPG contractors follow IICRC S520:2025 for professional mould assessment and remediation.
7. **Q:** Can you help with fire damage restoration? **A:** Yes — make-safe, soot removal, smoke odour elimination, contents pack-out, and full reinstatement. IICRC S700:2025 certified.
8. **Q:** Do you work with all insurance companies? **A:** Yes. NRPG contractors produce documentation accepted by all major Australian insurers including IAG, Suncorp, Allianz, QBE, and Chubb.
9. **Q:** Are you available on weekends? **A:** Yes — 24/7 including weekends and public holidays.
10. **Q:** What happens if my insurance claim is rejected? **A:** Our contractors produce detailed independent documentation. You can use this to request an internal review or escalate to AFCA at no cost.
11. **Q:** Do you handle storm damage claims in Western Australia? **A:** Yes — we have contractors active in Perth metro following TC Narelle and for ongoing storm events.
12. **Q:** Can I choose my own contractor instead of the insurer's preferred repairer? **A:** Yes — you have the right to choose a qualified repairer under the Insurance Contracts Act.
13. **Q:** Do you do flood damage restoration? **A:** Yes — Category 3 floodwater extraction, contamination remediation, structural drying, and insurance documentation.
14. **Q:** How long does structural drying take? **A:** 3–5 days for Category 1 damage, 7–14 days for Category 2/3, monitored daily with psychrometric readings.
15. **Q:** Do you service rural and regional areas? **A:** Yes — coverage across regional QLD, NSW, WA, and VIC. Response times in remote areas depend on contractor availability.
16. **Q:** What is an ICA catastrophe declaration? **A:** The Insurance Council of Australia declares CAT events when industry losses exceed the catastrophe threshold. This activates special insurer response obligations.
17. **Q:** Do you do contents restoration? **A:** Yes — pack-out, specialist cleaning, drying, and return of salvageable contents as part of the full restoration scope.
18. **Q:** Can you help with business property damage? **A:** Yes — commercial offices, retail, restaurants, warehouses, and strata buildings. Business interruption documentation included.
19. **Q:** What is a make-safe and is it covered by insurance? **A:** A make-safe is emergency stabilisation to prevent further damage. Most home policies cover it as part of the claim.
20. **Q:** Do you service cyclone damage in Queensland? **A:** Yes — NRPG has contractors active in FNQ, SEQ, and across Queensland for cyclone, storm, and flood events.

---

## 5. Google Posts Schedule (DR-448/DR-453)

Post 2x per week on the GBP. Rotate across these post types:

### Immediate: First 4 Posts (DR-448)

**Post 1 — TC Maila (Event)**
> TC Maila is forecast to make landfall in FNQ on 11–12 April 2026. NRPG-certified contractors are ready in Cairns, Townsville, and Cape York. If your property sustains damage, lodge your claim immediately at disasterrecovery.com.au — we'll have a certified contractor with you as fast as possible. 24/7.

**Post 2 — TC Narelle WA Recovery (Event)**
> The ICA has declared TC Narelle a catastrophe event in Western Australia. If you haven't yet lodged your damage claim, it's not too late. NRPG contractors are assisting policyholders across Perth metro and regional WA with water damage restoration, make-safe, and full insurance documentation.

**Post 3 — Who Should I Call First? (Educational)**
> After a disaster: your contractor first, your insurer second. Most Australian home insurance policies cover emergency make-safe and restoration. Your IICRC-certified contractor's documentation — scope of works, moisture logs, photos — is what your insurer needs to process your claim. Lodge online at disasterrecovery.com.au.

**Post 4 — IICRC Certification (Trust)**
> Every contractor in the NRPG network holds current IICRC certification. That means: evidence-based restoration protocols, documentation your insurer accepts, and proper training for Category 3 (sewage/floodwater) events. Ask your contractor to show their IICRC card on arrival.

### Ongoing Template (2x per week)
- **Monday:** Active event update or seasonal tip (storm season, cyclone season)
- **Thursday:** Educational post (what your insurance covers, how to document damage, IICRC explained)

---

## 6. Review Request Email Template (DR-446)

Use this for manual outreach to past clients while DR-455 automated trigger builds the review pipeline going forward.

**Subject:** How did your [service type] restoration go?

---

Hi [Name],

Thank you for choosing NRPG for your recent [water damage / fire damage / storm damage] restoration at [suburb].

We hope everything is back to normal. If you were happy with the service, a quick Google review would mean a lot to us — and it helps other Australians find certified restoration help in an emergency.

**Leave a review here:** [Google Review Link]

If you have a moment, please mention:
- The type of damage (water, fire, storm, mould)
- Your suburb or city
- How quickly the contractor responded
- Whether the documentation was accepted by your insurer

If anything wasn't right, please reply to this email and we'll make it right.

Thank you,  
Disaster Recovery Australia  
disasterrecovery.com.au

---

## 7. Contractor GBP Optimisation Checklist (DR-457)

For NRPG contractors to maintain their own GBPs as "NRPG Network Partners":

- [ ] Business name includes "NRPG Network Partner" or "NRPG Certified"
- [ ] Primary category: "Damage Restoration Service"
- [ ] Description mentions: IICRC certification, NRPG network, specific service types, state/region
- [ ] Minimum 20 current photos (before/after, equipment, team, job sites)
- [ ] Service area covers all active LGAs for this contractor
- [ ] Attributes: Emergency services, 24/7, IICRC Certified
- [ ] Minimum 10 Google reviews (target 50+ by end of 2026)
- [ ] Weekly Google Posts minimum
- [ ] Q&A section seeded with 10+ questions
- [ ] Website links to disasterrecovery.com.au or contractor profile

---

## 8. Next Actions by Owner

| Action | Owner | Due | Linear |
|--------|-------|-----|--------|
| GBP audit against checklist | Toby | 10 Apr 2026 | DR-443 |
| Update GBP service area to national | Toby | 11 Apr 2026 | DR-444 |
| Set GBP attributes (24/7, emergency, IICRC) | Toby | 11 Apr 2026 | DR-445 |
| Send first review requests to 10 past clients | Toby | 14 Apr 2026 | DR-446 |
| Upload 20+ photos to GBP | Marketing | 14 Apr 2026 | DR-447 |
| Publish first 4 Google Posts (drafts above) | Marketing | 14 Apr 2026 | DR-448 |
| Seed 20 Q&A on GBP (drafts above) | Marketing | 14 Apr 2026 | DR-449 |
| Add `GOOGLE_REVIEW_URL` env var to Vercel | CTO/Toby | 14 Apr 2026 | DR-455 |
| Set up `GOOGLE_PLACE_ID` for review link | Toby | 14 Apr 2026 | DR-446 |
