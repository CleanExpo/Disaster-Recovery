# Commercial Client Targeting Strategy — Design Document

**Date:** 2026-02-25
**Status:** Approved
**Scope:** Stakeholder landing pages, navigation changes, commercial content pivot

---

## Strategic Context

Disaster Recovery / NRPG is pivoting to prioritise light, medium, and heavy commercial clients. Commercial clients have higher insurance excesses, professional decision-makers (property managers, strata managers, facilities managers), and larger jobs. The $2,750 emergency make-safe fee is negligible compared to typical commercial policy excesses or business interruption costs.

### Current State (Audit Findings)

- All 10 commercial service sub-pages are content-free shells (hero + CTA only, no body)
- The commercial hub (`/services/commercial-services/`) is mislabelled "Office Buildings"
- All commercial pages are geo-locked to Queensland (contradicts national strategy)
- Zero stakeholder-specific content exists (no pages for property managers, strata managers, facilities managers, tenants, councils, or commercial cleaners)
- Commercial is invisible in the live Antigravity navbar
- The homepage has zero commercial-focused content
- The only substantive commercial page is `/knowledge/commercial-vs-residential-restoration`
- All commercial sub-pages are water/flood focused — no fire, storm, mould, or biohazard commercial pages

---

## Stakeholders — Decision-Making Chain

When a commercial property suffers a loss, these people are involved:

### Tier 1 — First Responders (Google for a restoration company)

| Stakeholder | Role | Why They Search |
|-------------|------|-----------------|
| Property manager / managing agent | Gets the tenant's call, needs someone NOW | Liability, speed, documentation for owners |
| Strata manager | Common property damage, must act fast | Emergency spending powers, body corporate obligations |
| Business owner / tenant | Their space is flooded/damaged, panicking | Business interruption, "who pays?", getting back to trading |
| Local council | Council-owned buildings damaged, or issuing make-safe orders | Public asset protection, regulatory enforcement |
| Commercial cleaners | First on-site (have keys, cleaning contract), discover damage | Beyond their scope, need to refer without losing client |

### Tier 2 — Influence the Decision

| Stakeholder | Role |
|-------------|------|
| Facilities manager | Procurement, preferred supplier panels, SLA requirements |
| Building owner / landlord | Gets told by PM/strata "we've engaged X" |
| Strata committee | Ratifies strata manager's decision |
| Insurance broker | Advises but doesn't choose restorer |
| Loss adjuster | Assesses after work begins |

---

## Content Strategy — Approach C (Stakeholder + Scenario)

Stakeholder-first landing pages that capture role-specific search intent, funnelling into deep commercial service pages. Stakeholder pages capture the search ("property manager water damage responsibility"), service pages close the sale.

---

## Phase 1: Stakeholder Landing Pages

### Tier 1 — Full Authority Pages (~2,000+ words each)

#### `/for/property-managers`

**Target:** Managing agents, real estate PMs managing commercial/strata portfolios

**Pain points:**
- Tenant calling at 2am, need someone immediately
- Liability concerns — did I act fast enough?
- Documentation for building owners
- Managing multiple affected tenants

**Sections:**
1. Emergency protocol — what to do right now
2. Your responsibilities during a loss (duty of care, reasonable steps)
3. Who pays — owner vs tenant vs body corporate
4. What documentation DR provides (photos, scope, reports, moisture mapping)
5. How to set up a preferred supplier arrangement with DR
6. After-hours emergency protocol
7. FAQ (6+ questions specific to property managers)

**Target keywords:**
- "property manager water damage"
- "managing agent emergency restoration"
- "commercial property flood who to call"
- "property manager responsibilities water damage Australia"
- "rental property flood who pays landlord tenant"

---

#### `/for/strata-managers`

**Target:** Strata/body corporate managers, committee members

**Pain points:**
- Common property vs lot owner — who's responsible?
- Emergency levy vs sinking fund — can I spend without committee vote?
- Multiple unit owners affected, all asking questions
- Committee approval delays vs urgency

**Sections:**
1. Common property vs lot owner responsibility
2. Emergency spending powers (Strata Schemes Management Act — urgent repairs without committee approval)
3. Body corporate insurance claims — how it works
4. Documentation for all owners (reports per affected lot)
5. Multi-unit coordination — how DR manages large strata jobs
6. Working with your strata insurer
7. FAQ (6+ questions specific to strata)

**Target keywords:**
- "strata water damage responsibility"
- "body corporate flood restoration"
- "common property emergency repair"
- "strata manager emergency spending authority"
- "body corporate insurance claim water damage"

---

#### `/for/business-owners`

**Target:** Tenants, shop owners, office managers, anyone whose business space is damaged

**Pain points:**
- Business interruption — every hour closed = revenue lost
- Stock/inventory loss — can anything be salvaged?
- "Can I keep trading during restoration?"
- Who pays — me or the landlord?

**Sections:**
1. Immediate steps to protect your business (first 60 minutes)
2. Tenant vs landlord obligations — what's your responsibility
3. Business interruption documentation (what your insurer needs)
4. Stock and inventory salvage — what can be saved
5. Getting back to trading ASAP — our restoration timeline
6. Insurance claim support — we give you everything you need
7. FAQ (6+ questions specific to business owners/tenants)

**Target keywords:**
- "business flooded what to do"
- "shop water damage restoration"
- "commercial tenant flood responsibility"
- "business interruption insurance claim documentation"
- "office flooded can I keep trading"

---

### Tier 2 — Mid-Weight Landing Pages (~1,000 words each)

#### `/for/facilities-managers`

**Target:** FM teams in large commercial buildings, shopping centres, hospitals

**Sections:**
- How to add DR to your approved supplier panel
- Emergency response SLAs (60-minute response guarantee)
- Compliance documentation (IICRC, SWMS, JSA)
- Multi-floor coordination for large-scale events
- After-hours emergency contact protocol

**Target keywords:**
- "facilities management emergency restoration"
- "commercial building flood response contractor"
- "approved supplier panel disaster recovery"

---

#### `/for/councils`

**Target:** Council asset managers, building maintenance teams, regulatory officers

**Sections:**
- Council-owned property restoration (community centres, libraries, depots)
- Community facility emergency response
- Procurement/panel arrangement options
- After-hours council emergency protocol
- Supporting make-safe order compliance (for private property owners council has ordered to act)

**Target keywords:**
- "council building water damage"
- "local government disaster restoration"
- "community facility flood recovery"
- "council make-safe order restoration"

---

### Tier 3 — Referral Partner Page (~800 words)

#### `/for/commercial-cleaners`

**Target:** Commercial cleaning companies who discover damage beyond their scope

**Framing:** Referral partner, not customer

**Sections:**
- When to refer up — scope boundaries (cleaning vs restoration)
- Our referral partner program
- How we work alongside your existing cleaning contract
- Your client stays your client — we don't poach
- Emergency referral hotline

**Target keywords:**
- "commercial cleaner water damage referral"
- "cleaning company flood too big"
- "commercial cleaning restoration partner"

---

## Phase 1: Navigation & CTA Changes

### Navbar

Add "For Business" link to the Antigravity navbar main navigation:
- Services | Locations | **For Business** | About NRPG | [Make a Claim]
- Links to `/for` hub page listing all stakeholder pages

### Homepage

Add a commercial-focused section below existing service pillars:
- Heading: "Trusted by Property Managers, Strata Managers & Business Owners Across Australia"
- 3 cards linking to Tier 1 stakeholder pages
- Each card: stakeholder title, 1-line pain point, CTA

### Role-Specific CTAs

Stakeholder pages get role-specific CTA language (all funnel to `/claim`):

| Page | CTA Text |
|------|----------|
| Property managers | "Set Up Emergency Protocol" or "Add Us to Your Preferred Suppliers" |
| Strata managers | "Report Common Property Damage" |
| Business owners | "Get Your Business Back Trading" |
| Facilities managers | "Request Supplier Panel Information" |
| Councils | "Request Council Partnership Details" |
| Commercial cleaners | "Join Our Referral Network" |

### Quick Fixes to Existing Pages

- Fix `/services/commercial-services/` hub title: "Office Buildings" → "Commercial Restoration Services"
- Fix all 10 commercial sub-page descriptions: "in Queensland" → "across Australia"
- Fix `/property/commercial` title: "Life Safety" → "Commercial Property Disaster Recovery"

---

## Phase 1: SEO & Schema

Each Tier 1 stakeholder page gets:
- **FAQ schema** (6+ role-specific FAQs)
- **ProfessionalService schema** targeting commercial audience
- **Breadcrumb schema**
- **Internal links** to: commercial service pages, emergency services, knowledge base article (`/knowledge/commercial-vs-residential-restoration`)
- **Add to GlobalFAQSchema exclusion list** (`PAGES_WITH_OWN_FAQ` in `GlobalFAQSchema.tsx`)

---

## Deferred (Phase 2+)

| Item | Phase |
|------|-------|
| Fill 10 empty commercial service sub-pages with deep content | Phase 2 |
| Add commercial fire/storm/mould/biohazard sub-pages | Phase 2 |
| Hub + spoke child pages per stakeholder (e.g., `/for/property-managers/tenant-caused-flood`) | Phase 2 |
| Commercial-specific cost estimator or tools | Phase 3 |
| Commercial testimonials (need real ones) | Phase 3 |
| B2B referral/partner portal for commercial cleaners | Phase 3 |

---

## Files to Create (Phase 1)

| # | File | Type |
|---|------|------|
| 1 | `app/for/page.tsx` | Hub page — "For Business" |
| 2 | `app/for/property-managers/page.tsx` | Full authority page (~2,000+ words) |
| 3 | `app/for/strata-managers/page.tsx` | Full authority page (~2,000+ words) |
| 4 | `app/for/business-owners/page.tsx` | Full authority page (~2,000+ words) |
| 5 | `app/for/facilities-managers/page.tsx` | Mid-weight page (~1,000 words) |
| 6 | `app/for/councils/page.tsx` | Mid-weight page (~1,000 words) |
| 7 | `app/for/commercial-cleaners/page.tsx` | Referral partner page (~800 words) |

## Files to Modify (Phase 1)

| # | File | Change |
|---|------|--------|
| 1 | `src/components/antigravity/AntigravityNavbar.tsx` | Add "For Business" nav link |
| 2 | `app/services/commercial-services/page.tsx` | Fix title "Office Buildings" → "Commercial Restoration Services" |
| 3 | `app/services/commercial-services/*/page.tsx` (10 files) | Fix "in Queensland" → "across Australia" |
| 4 | `app/property/commercial/page.tsx` | Fix title "Life Safety" → "Commercial Property Disaster Recovery" |
| 5 | `src/components/seo/GlobalFAQSchema.tsx` | Add Tier 1 stakeholder pages to `PAGES_WITH_OWN_FAQ` |
| 6 | Homepage component | Add commercial section with stakeholder cards |

---

## Success Criteria

1. A property manager Googling "property manager water damage Australia" finds disasterrecovery.com.au
2. A strata manager Googling "body corporate flood restoration" finds disasterrecovery.com.au
3. Every stakeholder landing page has a clear, role-specific CTA that funnels to `/claim`
4. Commercial is visible in the main navigation — no longer hidden
5. The homepage signals to commercial visitors "this site is for you"
6. All pages pass Rich Results Test with valid FAQ + schema
