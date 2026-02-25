# Commercial Client Targeting — Phase 1 Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build 6 stakeholder landing pages + hub, add commercial visibility to navbar and homepage, fix existing commercial page issues.

**Architecture:** New `/for` route with hub + 6 stakeholder pages using `AgContentPageTemplate` with deep `sections` content. Each Tier 1 page gets FAQ schema (added to `GlobalFAQSchema` exclusion list). Navbar gets "For Business" link. Homepage gets commercial section between service pillars and equipment sections.

**Tech Stack:** Next.js App Router, AgContentPageTemplate, Lucide icons, JSON-LD schema, Antigravity CSS design system.

**Design doc:** `docs/plans/2026-02-25-commercial-targeting-strategy-design.md`

---

## Task 1: Quick Fixes — Commercial Hub Title & Queensland Geo-Lock

These are broken NOW and take 5 minutes. Do them first.

**Files:**
- Modify: `app/services/commercial-services/page.tsx`
- Modify: `app/services/commercial-services/*/page.tsx` (10 files)
- Modify: `app/property/commercial/page.tsx`

**Step 1: Fix commercial hub title and description**

In `app/services/commercial-services/page.tsx`:
- Change metadata title: `'Office Buildings | Disaster Recovery'` → `'Commercial Restoration Services | Disaster Recovery'`
- Change metadata description: `'...across Queensland...'` → `'...across Australia...'`
- Change hero title: `'Office Buildings'` → `'Commercial Restoration Services'`
- Change hero subtitle: `'...across Queensland...'` → `'...across Australia...'`
- Change breadcrumb last label: `'Office Buildings'` → `'Commercial Restoration Services'`

**Step 2: Fix all 10 commercial sub-pages**

For each file in `app/services/commercial-services/*/page.tsx`, replace `'in Queensland'` with `'across Australia'` in BOTH:
- `metadata.description`
- `hero.subtitle`

The files are: `office-water-damage`, `hotel-flood-recovery`, `retail-flood-damage`, `warehouse-flooding`, `restaurant-water-damage`, `school-water-damage`, `hospital-water-damage`, `gym-flooding`, `factory-water-damage`, `data-center-flooding`.

Use sed or find-and-replace — the string `in Queensland` appears exactly twice per file (metadata description + hero subtitle, which are identical strings).

**Step 3: Fix property/commercial title**

In `app/property/commercial/page.tsx`:
- Change metadata title from `'Life Safety | ...'` to `'Commercial Property Disaster Recovery | Disaster Recovery'`
- Change hero title from `'Life Safety'` to `'Commercial Property Disaster Recovery'`
- Update subtitle and breadcrumb to match

**Step 4: Verify build**

```bash
vercel --prod --yes
```

**Step 5: Commit**

```bash
git add app/services/commercial-services/ app/property/commercial/page.tsx
git commit -m "fix: correct commercial hub title and remove Queensland geo-lock from 11 pages"
```

---

## Task 2: Create `/for` Hub Page

**Files:**
- Create: `app/for/page.tsx`

**Step 1: Create the hub page**

Create `app/for/page.tsx` using `AgContentPageTemplate`. This is a routing hub that links to all 6 stakeholder pages.

```tsx
import { Metadata } from 'next';
import { Building2 } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'For Business | Commercial Disaster Recovery | Disaster Recovery Australia',
  description: 'Disaster recovery services for property managers, strata managers, business owners, facilities managers, councils, and commercial cleaners across Australia.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/for',
  },
};

export default function ForBusinessPage() {
  return (
    <AgContentPageTemplate
      hero={{
        gradient: 'linear-gradient(135deg, #1E293B 0%, #334155 100%)',
        heroImage: '/images/generated/disaster-recovery/hero-commercial-services.webp',
        icon: <Building2 className="h-12 w-12" />,
        title: 'Disaster Recovery for Business',
        subtitle: 'Whether you manage one building or a portfolio of hundreds — we respond within 60 minutes, 24/7, anywhere in Australia.',
      }}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
      ctaImage="/images/generated/disaster-recovery/cta-commercial-services.webp"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'For Business' },
      ]}
      stats={[
        { label: 'Response Time', value: '< 60 min' },
        { label: 'Available', value: '24/7/365' },
        { label: 'Coverage', value: 'Australia-Wide' },
        { label: 'Certified', value: 'IICRC' },
      ]}
      sections={[
        {
          heading: 'Property Managers & Managing Agents',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Your tenant is calling at 2am with water pouring through the ceiling. You need a certified restoration company on-site within the hour — not tomorrow morning.</p>
              <p>We provide 24/7 emergency response, full documentation for building owners, and preferred supplier arrangements for your entire portfolio.</p>
              <p><Link href="/for/property-managers"><strong>Property Manager Emergency Guide →</strong></Link></p>
            </div>
          ),
        },
        {
          heading: 'Strata & Body Corporate Managers',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Common property damage affects every owner in the building. You need to act fast, manage emergency spending, and coordinate with insurers — all before the next committee meeting.</p>
              <p>We handle multi-unit coordination, provide per-lot documentation, and work within your emergency spending authority.</p>
              <p><Link href="/for/strata-managers"><strong>Strata Manager Emergency Guide →</strong></Link></p>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Business Owners & Tenants',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Every hour your business is closed costs you revenue. You need your premises restored and your doors reopened as fast as possible.</p>
              <p>We prioritise getting you back to trading — with full business interruption documentation for your insurance claim.</p>
              <p><Link href="/for/business-owners"><strong>Business Owner Emergency Guide →</strong></Link></p>
            </div>
          ),
        },
        {
          heading: 'Facilities Managers',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Large-scale commercial buildings need a restoration partner that meets your procurement requirements, SLA expectations, and compliance standards.</p>
              <p><Link href="/for/facilities-managers"><strong>Facilities Manager Information →</strong></Link></p>
            </div>
          ),
          background: 'light',
        },
        {
          heading: 'Local Councils',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Council-owned community facilities, libraries, depots, and public buildings need rapid restoration to return to public service. We also support property owners responding to council-issued make-safe orders.</p>
              <p><Link href="/for/councils"><strong>Council Partnership Information →</strong></Link></p>
            </div>
          ),
        },
        {
          heading: 'Commercial Cleaning Companies',
          body: (
            <div className="prose prose-lg max-w-none">
              <p>Found damage beyond your scope at 5am? We work alongside your existing cleaning contract — your client stays your client.</p>
              <p><Link href="/for/commercial-cleaners"><strong>Referral Partner Program →</strong></Link></p>
            </div>
          ),
          background: 'light',
        },
      ]}
    />
  );
}
```

**Step 2: Verify build locally or deploy**

```bash
vercel --prod --yes
```

**Step 3: Commit**

```bash
git add app/for/page.tsx
git commit -m "feat: add /for hub page for commercial stakeholder navigation"
```

---

## Task 3: Property Managers Authority Page

**Files:**
- Create: `app/for/property-managers/page.tsx`

**Step 1: Create the page**

Create `app/for/property-managers/page.tsx` — full authority page (~2,000+ words) with 7 content sections + FAQ schema.

Use `AgContentPageTemplate` with:
- `hero` with commercial gradient and `heroImage`
- `stats` with commercial-relevant metrics
- `cta` with role-specific text: `{ text: 'Set Up Emergency Protocol', href: '/claim' }`
- 7 `sections` as defined in the design doc:
  1. Emergency Protocol — What to Do Right Now (default bg)
  2. Your Responsibilities During a Loss (light bg)
  3. Who Pays — Owner vs Tenant vs Body Corporate (default bg)
  4. What Documentation We Provide (light bg)
  5. Preferred Supplier Arrangements (default bg)
  6. After-Hours Emergency Protocol (light bg)
  7. Frequently Asked Questions (dark bg) — embed 6+ FAQ items as `<details>` elements

**Critical content rules (from CLAUDE.md):**
- "We bill you directly" — the client, never the insurer
- No "direct-bill" / "bill your insurer" / "no upfront costs"
- Payment plans via Blue Fire Finance (link: `https://www.bluefirefinance.com.au`)
- $2,750 emergency make-safe fee breakdown: $550 platform + $2,200 held for contractor
- National coverage — never geo-lock to one state

**FAQ schema:** Add inline JSON-LD `<script type="application/ld+json">` in the page with FAQPage schema for the 6+ questions. Topics:
- "What should I do when a tenant reports water damage?"
- "Who is responsible for restoration costs — owner or tenant?"
- "How quickly can you respond to a commercial property emergency?"
- "What documentation do you provide for building owners?"
- "Can I set up a preferred supplier arrangement for my portfolio?"
- "Do you work after hours and on weekends?"

**Step 2: Add to GlobalFAQSchema exclusion**

In `src/components/seo/GlobalFAQSchema.tsx`, add `'/for/property-managers'` to `PAGES_WITH_OWN_FAQ` array.

**Step 3: Verify build**

```bash
vercel --prod --yes
```

**Step 4: Commit**

```bash
git add app/for/property-managers/page.tsx src/components/seo/GlobalFAQSchema.tsx
git commit -m "feat: add property managers authority page with FAQ schema"
```

---

## Task 4: Strata Managers Authority Page

**Files:**
- Create: `app/for/strata-managers/page.tsx`
- Modify: `src/components/seo/GlobalFAQSchema.tsx`

**Step 1: Create the page**

Same pattern as Task 3. Sections:
1. Common Property vs Lot Owner Responsibility (default bg)
2. Emergency Spending Powers (light bg) — reference Strata Schemes Management Act sections for urgent repairs without committee approval
3. Body Corporate Insurance Claims (default bg)
4. Documentation for All Owners (light bg) — per-lot reports, moisture mapping per unit
5. Multi-Unit Coordination (default bg) — how DR manages large strata jobs across multiple floors/units
6. Working With Your Strata Insurer (light bg)
7. Frequently Asked Questions (dark bg)

CTA: `{ text: 'Report Common Property Damage', href: '/claim' }`

FAQ topics:
- "Who is responsible for common property water damage in a strata building?"
- "Can a strata manager authorise emergency repairs without committee approval?"
- "How does body corporate insurance work for disaster restoration?"
- "What happens if damage affects both common property and individual lots?"
- "How do you coordinate restoration across multiple affected units?"
- "What documentation do you provide for body corporate records?"

**Step 2: Add `'/for/strata-managers'` to `PAGES_WITH_OWN_FAQ`**

**Step 3: Verify build, commit**

```bash
git add app/for/strata-managers/page.tsx src/components/seo/GlobalFAQSchema.tsx
git commit -m "feat: add strata managers authority page with FAQ schema"
```

---

## Task 5: Business Owners Authority Page

**Files:**
- Create: `app/for/business-owners/page.tsx`
- Modify: `src/components/seo/GlobalFAQSchema.tsx`

**Step 1: Create the page**

Sections:
1. Immediate Steps to Protect Your Business (default bg) — first 60 minutes checklist
2. Tenant vs Landlord Obligations (light bg) — who pays, what's your responsibility under your lease
3. Business Interruption Documentation (default bg) — what your insurer needs, how we provide it
4. Stock and Inventory Salvage (light bg) — what can be saved, salvage vs write-off, documentation for insurance
5. Getting Back to Trading (default bg) — our restoration timeline, partial trading options
6. Insurance Claim Support (light bg) — full claims documentation, how we bill you directly (not your insurer)
7. Frequently Asked Questions (dark bg)

CTA: `{ text: 'Get Your Business Back Trading', href: '/claim' }`

FAQ topics:
- "My business premises is flooded — what should I do first?"
- "Is the landlord or tenant responsible for flood damage restoration?"
- "How quickly can you get my business back open?"
- "What business interruption documentation do you provide?"
- "Can I keep trading while restoration is happening?"
- "How does payment work — do I pay or does my insurance?"

**Step 2: Add `'/for/business-owners'` to `PAGES_WITH_OWN_FAQ`**

**Step 3: Verify build, commit**

```bash
git add app/for/business-owners/page.tsx src/components/seo/GlobalFAQSchema.tsx
git commit -m "feat: add business owners authority page with FAQ schema"
```

---

## Task 6: Facilities Managers Mid-Weight Page

**Files:**
- Create: `app/for/facilities-managers/page.tsx`

**Step 1: Create the page**

Mid-weight (~1,000 words). 5 sections:
1. Approved Supplier Panel (default bg) — how to add DR, what credentials we provide
2. Emergency Response SLAs (light bg) — 60-minute guarantee, escalation procedures
3. Compliance Documentation (default bg) — IICRC certification, SWMS, JSA, risk assessments
4. Multi-Floor Coordination (light bg) — large-scale event management, floor-by-floor documentation
5. After-Hours Emergency Protocol (default bg) — 24/7 contact, on-site within 60 minutes

CTA: `{ text: 'Request Supplier Panel Information', href: '/claim' }`

No FAQ schema needed for Tier 2 pages (no `PAGES_WITH_OWN_FAQ` update).

**Step 2: Verify build, commit**

```bash
git add app/for/facilities-managers/page.tsx
git commit -m "feat: add facilities managers landing page"
```

---

## Task 7: Councils Mid-Weight Page

**Files:**
- Create: `app/for/councils/page.tsx`

**Step 1: Create the page**

Mid-weight (~1,000 words). 5 sections:
1. Council-Owned Property Restoration (default bg) — community centres, libraries, depots, parks buildings
2. Community Facility Emergency Response (light bg) — prioritising public access restoration
3. Procurement & Panel Arrangements (default bg) — how to engage DR through council procurement
4. After-Hours Council Emergency Protocol (light bg) — 24/7 contact for council assets
5. Supporting Make-Safe Order Compliance (default bg) — helping private property owners respond to council orders

CTA: `{ text: 'Request Council Partnership Details', href: '/claim' }`

**Step 2: Verify build, commit**

```bash
git add app/for/councils/page.tsx
git commit -m "feat: add councils landing page"
```

---

## Task 8: Commercial Cleaners Referral Page

**Files:**
- Create: `app/for/commercial-cleaners/page.tsx`

**Step 1: Create the page**

Shorter (~800 words). Referral partner framing, NOT a customer page. 5 sections:
1. When to Refer Up (default bg) — scope boundaries between cleaning and restoration
2. Our Referral Partner Program (light bg) — how it works, what's in it for them
3. Working Alongside Your Contract (default bg) — we don't replace your cleaning service
4. Your Client Stays Your Client (light bg) — no poaching guarantee
5. Emergency Referral Contact (dark bg) — 24/7 number, how to refer

CTA: `{ text: 'Join Our Referral Network', href: '/claim' }`

**Step 2: Verify build, commit**

```bash
git add app/for/commercial-cleaners/page.tsx
git commit -m "feat: add commercial cleaners referral partner page"
```

---

## Task 9: Add "For Business" to Navbar

**Files:**
- Modify: `src/components/antigravity/AntigravityNavbar.tsx`

**Step 1: Add desktop nav link**

In the `ag-nav-links` div (around line 64-68), add a "For Business" link between "Locations" and "About NRPG":

```tsx
<div className="ag-nav-links">
  <Link href="/services">Services</Link>
  <Link href="/locations">Locations</Link>
  <Link href="/for">For Business</Link>
  <Link href="/about">About NRPG</Link>
</div>
```

**Step 2: Add mobile nav link**

In the mobile nav drawer (around line 93-102), add the same link after Locations:

```tsx
<Link href="/for" onClick={() => setMobileOpen(false)}>For Business</Link>
```

**Step 3: Verify build, commit**

```bash
git add src/components/antigravity/AntigravityNavbar.tsx
git commit -m "feat: add For Business link to navbar (desktop + mobile)"
```

---

## Task 10: Add Commercial Section to Homepage

**Files:**
- Modify: `src/components/antigravity/AntigravityHomePage.tsx`

**Step 1: Add commercial stakeholder section**

Insert a new `<section>` between the existing services grid section and `<AntigravityBrandEquipment />`:

```tsx
{/* Commercial Stakeholder Section */}
<section className="ag-services-overview ag-container" style={{ paddingTop: '4rem', paddingBottom: '4rem' }}>
  <div className="ag-section-header">
    <h2>Trusted by Property Managers, Strata Managers & Business Owners</h2>
    <p style={{ color: 'var(--ag-text-muted)', fontSize: '1.125rem', maxWidth: 700, margin: '0 auto' }}>
      Commercial property damage demands a faster response, deeper documentation, and coordination across multiple stakeholders. That&apos;s what we do.
    </p>
  </div>
  <div className="ag-services-grid" style={{ gridTemplateColumns: 'repeat(3, 1fr)' }}>
    <Link href="/for/property-managers" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="ag-glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Property Managers</h3>
        <p style={{ color: 'var(--ag-text-muted)', fontSize: '0.95rem' }}>
          24/7 emergency response for your managed properties. Full documentation for owners.
        </p>
      </div>
    </Link>
    <Link href="/for/strata-managers" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="ag-glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Strata & Body Corporate</h3>
        <p style={{ color: 'var(--ag-text-muted)', fontSize: '0.95rem' }}>
          Common property restoration with per-lot documentation and emergency spending support.
        </p>
      </div>
    </Link>
    <Link href="/for/business-owners" style={{ textDecoration: 'none', color: 'inherit' }}>
      <div className="ag-glass-card" style={{ padding: '2rem', textAlign: 'center' }}>
        <h3 style={{ marginBottom: '0.5rem' }}>Business Owners</h3>
        <p style={{ color: 'var(--ag-text-muted)', fontSize: '0.95rem' }}>
          Get back to trading fast. Business interruption documentation for your insurer.
        </p>
      </div>
    </Link>
  </div>
  <div style={{ textAlign: 'center', marginTop: '2rem' }}>
    <Link href="/for" className="ag-btn-ghost" style={{ fontSize: '1rem' }}>
      View All Commercial Services →
    </Link>
  </div>
</section>
```

**Note:** Use the existing `ag-glass-card` and `ag-services-grid` CSS classes from the Antigravity design system. The inline `gridTemplateColumns` override forces 3 columns for the stakeholder cards (the default grid may use a different column count). Check the rendered output — if the Antigravity CSS already handles 3-column grids, remove the inline style.

**Step 2: Verify build, commit**

```bash
git add src/components/antigravity/AntigravityHomePage.tsx
git commit -m "feat: add commercial stakeholder section to homepage"
```

---

## Task 11: Deploy & Verify

**Step 1: Deploy to production**

```bash
cd "C:/Disaster Recovery/Disaster-Recovery"
vercel --prod --yes
```

**Step 2: Visual verification checklist**

Navigate to each URL and verify:

| URL | Check |
|-----|-------|
| `/` (homepage) | Commercial section visible below service pillars |
| `/for` | Hub page renders with 6 stakeholder sections |
| `/for/property-managers` | Full content, FAQ section, correct CTA text |
| `/for/strata-managers` | Full content, FAQ section, correct CTA text |
| `/for/business-owners` | Full content, FAQ section, correct CTA text |
| `/for/facilities-managers` | Mid-weight content, correct CTA text |
| `/for/councils` | Mid-weight content, correct CTA text |
| `/for/commercial-cleaners` | Referral framing, correct CTA text |
| `/services/commercial-services` | Title now "Commercial Restoration Services" |
| Any commercial sub-page | "across Australia" not "in Queensland" |
| Navbar (desktop) | "For Business" link visible between Locations and About |
| Navbar (mobile) | "For Business" link in drawer |

**Step 3: Rich Results Test (Tier 1 pages only)**

Test these URLs at https://search.google.com/test/rich-results:
- `https://disasterrecovery.com.au/for/property-managers`
- `https://disasterrecovery.com.au/for/strata-managers`
- `https://disasterrecovery.com.au/for/business-owners`

Each should show valid FAQPage schema with 6+ items and zero errors.

---

## Task Summary

| Task | Description | Files | Commit |
|------|-------------|-------|--------|
| 1 | Quick fixes — hub title + Queensland geo-lock | 12 files modified | `fix: correct commercial hub title...` |
| 2 | `/for` hub page | 1 file created | `feat: add /for hub page...` |
| 3 | Property managers authority page | 2 files (page + GlobalFAQ) | `feat: add property managers...` |
| 4 | Strata managers authority page | 2 files | `feat: add strata managers...` |
| 5 | Business owners authority page | 2 files | `feat: add business owners...` |
| 6 | Facilities managers page | 1 file | `feat: add facilities managers...` |
| 7 | Councils page | 1 file | `feat: add councils...` |
| 8 | Commercial cleaners page | 1 file | `feat: add commercial cleaners...` |
| 9 | Navbar "For Business" link | 1 file modified | `feat: add For Business to navbar` |
| 10 | Homepage commercial section | 1 file modified | `feat: add commercial section to homepage` |
| 11 | Deploy & verify | 0 files | No commit |

**Total: 7 new files, ~14 modified files, 10 commits**
