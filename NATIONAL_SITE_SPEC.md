# National Disaster Recovery Website - Complete Specification

**Project:** DisasterRecovery.com.au - National Australia-Wide Platform
**Date:** 2026-01-02
**Version:** 1.0.0
**Repository:** https://github.com/CleanExpo/DR-New
**Timeline:** 60-day balanced timeline
**Target Launch:** Soft launch (SEO pages live, claim intake gated)

---

## Executive Summary

This specification outlines the complete implementation strategy for DisasterRecovery.com.au, a national disaster recovery platform serving three primary audiences:

1. **Homeowners/Clients** - AI-automated claim reporting (no phone contact)
2. **Restoration Contractors** - NRPG subscription acquisition funnel
3. **Enterprise/Commercial** - Same claim intake as residential

The site leverages existing SEO generator assets, DesignOS design system foundation, and NRPG platform infrastructure while establishing authority positioning as "Australia's Disaster Recovery Network."

---

## Table of Contents

1. [Strategic Foundation](#strategic-foundation)
2. [Audience & Positioning](#audience--positioning)
3. [Site Architecture](#site-architecture)
4. [SEO & Content Strategy](#seo--content-strategy)
5. [Visual Design System](#visual-design-system)
6. [Technical Architecture](#technical-architecture)
7. [Conversion Funnels](#conversion-funnels)
8. [Analytics & Tracking](#analytics--tracking)
9. [Launch Strategy](#launch-strategy)
10. [Operations & Maintenance](#operations--maintenance)
11. [Risk Mitigation](#risk-mitigation)
12. [Success Metrics](#success-metrics)
13. [Documentation Requirements](#documentation-requirements)

---

## Strategic Foundation

### Current State Assessment

**Existing Assets:**
- Complete SEO generator (geographic pages, disaster types, content templates)
- Production NRPG platform (contractor onboarding, subscription system, dispatch algorithm)
- DesignOS design system (18 components, dual-brand theming)
- Live DisasterRecovery.com.au homepage (basic hero, dropdowns working)

**Technology Stack:**
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Prisma ORM + PostgreSQL
- Tailwind CSS
- Vercel deployment
- Stripe (subscriptions + Connect)

**Current Limitations:**
- Homepage exists, no deep content
- No claim intake funnel yet
- No NRPG contractor acquisition pages
- Limited SEO presence (only homepage indexed)

### Goals & Success Definition

**North Star Metric:** Total claims submitted (volume metric)

**Balanced Scorecard:**
1. **Leads:** Monthly claim submissions
2. **Contractor Signups:** NRPG subscription conversions
3. **Jobs Completed:** Claims → actual restoration jobs
4. **Revenue:** Contractor subscription MRR

**Geographic Target:** All Australian capital cities simultaneously

**Timeline:** 2-3 months to polished national site (60-day soft launch)

---

## Audience & Positioning

### Primary Audiences

#### 1. Clients (Homeowners, Strata, Commercial)

**Job-to-be-Done:**
"AI Automated claim reporting - NO phone contact. Everything online via Report a Claim."

**Conversion Path:**
Same for all client types (residential, enterprise, commercial) - unified claim intake funnel

**Lead Quality Filters:**
- Contact verification (email/phone validation)
- Geographic serviceability (address in contractor coverage area)
- Insurance status (insured vs uninsured)
- Damage severity (critical, urgent, high, medium)
- Payment upfront (qualification signal)

#### 2. NRPG Contractors

**Primary Barrier:**
"Trust - Is this legit? Will I actually get leads?"

**Social Proof Strategy:**
- Earnings testimonials ("I made $45k in 3 months")
- Lead quality testimonials ("Best leads I've ever received")
- Business growth stories ("Hired 2 new techs thanks to NRPG")
- Anonymized metrics dashboard (aggregate contractor success data)

**Pricing Transparency:**
- Display subscription pricing publicly ($99/$299/$799)
- Show ROI calculator (interactive tool)
- Display sample lead quality/volume BEFORE revealing pricing

**Acquisition Funnel:**
Awareness → Education → Signup (`/contractors` → `/how-it-works` → `/join`)

### Brand Positioning

**Primary Brand:** "Who First?™" as main headline

**Messaging Hierarchy:**
Authority/Clinical - "Australia's Disaster Recovery Network"

**Voice & Tone:**
- Institutional, clinical tone
- Emphasizing process, certification, expertise
- Authority brand (not empathetic, not performance-focused)

**Trust Signals (Client-Facing):**
- Contractor certifications (IICRC badges everywhere)
- Client success stories ("They saved my home")
- Industry partnerships (insurance companies, trade associations)

---

## Site Architecture

### URL Structure

**Strategy:** Geographic hierarchy

```
/sydney/water-damage
/melbourne/fire-restoration
/brisbane/mold-remediation
/perth/storm-damage
/adelaide/sewage-cleanup
```

**Rationale:** City-first URLs for local SEO dominance, mirrors existing SEO generator structure

### Information Architecture

#### Primary Navigation (Top Menu)

**Structure:** Service-focused

```
Services (dropdown: Water, Fire, Mold, Storm, Sewage, Biohazard)
Locations (dropdown: Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Darwin, Hobart)
For Contractors (link to /contractors)
Resources (link to /resources)
```

#### Footer Mega-Menu

**Column 1:** Services by disaster type
- Water Damage Restoration
- Fire & Smoke Restoration
- Mold Remediation
- Storm Damage Repair
- Sewage Cleanup
- Biohazard Restoration

**Column 2:** Locations by capital city
- Sydney
- Melbourne
- Brisbane
- Perth
- Adelaide
- Canberra
- Darwin
- Hobart

**Column 3:** For Contractors
- Why NRPG
- Pricing
- Success Stories
- Join NRPG

**Column 4:** Resources
- Blog
- Guides
- Tools
- FAQs
- About
- Contact

**Column 5:** About Section
- Company info
- Mission/values
- Team
- Careers

### Homepage Structure

**Section Order:**

1. **Hero:** Emergency CTA (3 paths - Report Claim / Find Contractor / Join NRPG)
2. **Quick Triage Tool:** Interactive disaster assessment
3. **Services Grid:** Visual grid of disaster types
4. **Resources Hub:** Featured content (latest guides, articles)
5. **Join NRPG:** Contractor acquisition CTA

**CTA Hierarchy:**
Three equal paths for audience segmentation (clients in crisis, clients planning, contractors)

---

## SEO & Content Strategy

### SEO Generator Integration

**Strategy:** Full import - Generate and import ALL pages for all cities/suburbs

**Scope:**
- All capital cities
- All major suburbs (100+ per city)
- All disaster types (Water, Fire, Mold, Storm, Sewage, Biohazard)
- Estimated: 5,000-10,000 location pages

**Page Generation Strategy:** Hybrid
- **Static at build:** Capital city pages (Sydney, Melbourne, Brisbane, Perth, Adelaide, Canberra, Darwin, Hobart)
- **On-demand (ISR):** Suburb pages (generated on first visit, cached for 7 days)

### SEO Landing Page Template

**Structure:**
```
1. Local hero (city/suburb-specific image)
2. Service description (disaster type explanation)
3. Local contractors CTA ("47 certified contractors in your area")
4. FAQ section (location-specific questions)
5. Related services (internal links)
```

**Example:** `/sydney/water-damage`
- Hero: Sydney harbor with water damage overlay
- Description: Water damage restoration in Sydney
- CTA: "Connect with Sydney water damage specialists"
- FAQ: "How quickly can Sydney contractors respond?"
- Related: Fire restoration Sydney, Mold remediation Sydney

### Content Strategy

**Pre-Launch Content:** Moderate library (50-100 articles + all location pages)

**Content Production Methods:**
- AI-generated content (GPT-4) with human editing
- Subject matter expert (SME) authored content (IICRC-certified professionals)
- Repurpose contractor case studies into articles
- Curate/aggregate industry content with commentary
- E.E.A.T optimization (Expertise, Authoritativeness, Trustworthiness)
- Lighthouse performance optimization

**Content Organization:** By disaster type
```
/resources/water-damage/
  - water-damage-emergency-checklist.md
  - insurance-claims-water-damage.md
  - water-damage-cost-guide.md

/resources/fire-restoration/
  - fire-damage-safety-protocols.md
  - smoke-odor-removal-guide.md
  - fire-insurance-claims-process.md
```

**Publishing Schedule:** 2-3 blog posts/week (ongoing operations)

### Lead Magnets & Content Offers

**Strategies:**
- Educational content (blog articles, comprehensive guides)
- Interactive tools (cost calculator, risk assessment quiz)
- Downloadable resources (PDFs, checklists - gated content)
- YouTube video content
- Social media links (Facebook, Instagram, LinkedIn)
- Podcast series

### Lead Nurture Strategy

**For leads who don't convert immediately:**
- Email drip campaign (disaster prep tips, seasonal content)
- Retargeting ads (disaster recovery services)
- Seasonal campaigns (storm season, bushfire season, flood warnings)

### Link Building Strategy

**Priority Tactics:**
- Trade association memberships (IICRC, industry bodies)
- Insurance company partnerships (link exchanges)
- Local PR and news coverage (disaster relief stories)
- Guest posting (home improvement, real estate blogs)
- Print media coverage

### Schema Markup Strategy

**Implementation:**
- **LocalBusiness schema** on every location page (name, address, service area, hours)
- **Service schema** for all disaster types (pricing, availability, service areas)
- **FAQ schema** on all content pages (rich snippets in search results)
- **Organization schema** on homepage (NRPG entity, logo, social profiles)
- Additional: Disaster Recovery brand, Author profiles for SME content

---

## Visual Design System

### Design System Approach

**Strategy:** Hybrid - DesignOS foundation + new marketing components

**Foundation (Reuse from DesignOS):**
- Design tokens (colors, typography, spacing)
- Theme hooks (useContextualTheme, useBrandTheme)
- 18 existing components (Button, Forms, Feedback, Navigation, Data Display)
- Dual-brand architecture
- WCAG AA accessibility compliance

**New Marketing Components Needed:**
- Hero sections (full-width, video background, split-screen variants)
- Testimonial/social proof (cards, carousels, video testimonials)
- Interactive tools (damage cost calculator, risk assessment quiz)
- Location/map components (interactive Australia map, service area visualizations)

### Brand Visual Identity

**Aesthetic Direction (Blended Approach):**
- **Authority/Clinical:** Navy, white, structured layouts (institutional trust)
- **Empathetic/Warm:** Blues, soft gradients, human imagery (care & support)
- **Modern/Tech:** Teal, dark mode option, clean minimal (innovation & efficiency)

**Color Palette Extensions:**
- **Marketing accent colors:** For call-out sections, badges, limited offers
- **Data visualization palette:** For charts, maps, contractor density visualizations
- **Semantic colors:** Success, warning, info states (standardized across site)
- **Base:** Existing DesignOS palette (emergency red, education teal, authority navy, NRPG gold)

### Photography & Imagery Strategy

**Content Mix:**
- Real disaster scenes (before/after transformations from actual jobs)
- Contractor work-in-progress shots (techs on job sites, building credibility)
- People-focused imagery (families, homeowners, businesses being helped)
- Stock photography (professional, polished for hero sections, consistent aesthetic)

**Sourcing:**
- Contract with NRPG contractors for before/after photography
- Hire photographer for staged people shots (Australian families, diverse representation)
- Licensed stock for hero backgrounds, service illustrations

### Responsive Design

**Breakpoint Priorities:**
- Mobile-first (design for 375px, scale up) - PRIMARY
- Desktop-optimal (design for 1440px, scale down) - SECONDARY
- Tablet breakpoint critical (768px) - hamburger menu trigger
- Large desktop considerations (1920px+) - ensure content doesn't feel empty

**Mobile Optimizations:**
- Location auto-detection for claim forms (GPS-based)
- No one-tap phone calling (contradicts AI automation requirement - user selected not to include)

### Accessibility Compliance

**Target:** WCAG 2.1 AA (industry standard)

**Requirements:**
- 4.5:1 color contrast minimum (text)
- 3:1 color contrast (UI components)
- Keyboard navigation support
- Screen reader compatible (ARIA labels)
- Focus indicators (2px solid ring)
- Explicit labels (never placeholder-only forms)
- Alternative text for all images

### Animation & Motion Design

**Strategy:**
- Context-aware (emergency pages = no animations, per DesignOS pattern)
- Scroll-triggered reveals (fade-in, slide-up on Timeline components)
- Micro-interactions (button hovers, form focus states)
- Respect prefers-reduced-motion (honor OS-level setting, disable all animations)

---

## Technical Architecture

### Repository Strategy

**Approach:** Single GitHub repo

**URL:** https://github.com/CleanExpo/DR-New

**Structure:**
```
/app
  /public              # Public marketing site routes
    /page.tsx          # Homepage
    /[city]            # Dynamic city routes
      /[service]       # Dynamic service routes
    /claim             # Claim intake wizard
    /contractors       # NRPG acquisition
    /resources         # Content hub
  /platform            # Existing NRPG platform routes
    /dashboard
    /onboarding
    /workspace
  /api
    /public            # Public API namespace
    /platform          # Platform API namespace
/components
  /public              # Marketing components
  /nrpg                # Existing NRPG components
/src/design-system     # Shared DesignOS
/prisma                # Existing schema (no changes)
/content               # Markdown content (if not using external CMS)
```

### Technology Stack

**Core (No Changes):**
- Next.js 14 (App Router)
- TypeScript (strict mode)
- Prisma ORM + PostgreSQL
- Tailwind CSS
- Radix UI (accessible primitives)

**Additions:**
- **CMS:** Contentful, Sanity, or Strapi (headless CMS for content management)
- **Search:** Algolia or ElasticSearch (resource search, contractor directory)
- **Analytics:** Google Analytics 4, Mixpanel, or PostHog (conversion tracking)

### API Architecture

**Recommended Approach:** Shared API routes with namespace separation

```
/app/api/public/*      # Public marketing site APIs
  /lead-capture        # Form submissions
  /triage              # Damage assessment tool
  /newsletter          # Email signups

/app/api/platform/*    # NRPG platform APIs (existing)
  /workspace
  /subscription
  /contractor
```

**Rationale:**
- Clear boundaries within single codebase
- Shared infrastructure (auth, middleware, database)
- Public APIs can call platform APIs when needed (lead → client conversion)
- Easy to version APIs in future (`/api/v2/public/*`)

### Database Schema

**Strategy:** No schema changes - use existing Prisma models + external CMS

**Existing Models Used:**
- **User, ClientProfile** - For converted claim leads
- **Contractor, ContractorProfile** - For NRPG signups
- **ClientOnboarding** - For claim intake flow
- **ContractorOnboarding** - For NRPG acquisition

**Content Storage:**
- Blog posts, guides, resources → External CMS (Contentful/Sanity/Strapi)
- Location pages → Generated from SEO generator, stored as static files

### Performance Targets

**Core Web Vitals Goals:** Excellent

- **LCP (Largest Contentful Paint):** <1.5s
- **FID (First Input Delay):** <50ms
- **CLS (Cumulative Layout Shift):** <0.05

**Strategies:**
- Hybrid page generation (static cities + ISR suburbs)
- Next.js Image optimization (automatic WebP conversion)
- Edge caching (Vercel Edge Network)
- Code splitting (dynamic imports for interactive tools)
- Lighthouse CI in pipeline (fail deploy if thresholds not met)

### Deployment Strategy

**Platform:** Vercel (same as NRPG platform)

**Environments:**
- **Development:** Local development server
- **Preview:** Vercel preview deployments (every PR)
- **Staging:** staging.disasterrecovery.com.au (pre-production testing)
- **Production:** disasterrecovery.com.au (live site)

**Environment Management:**
- Vercel environment variables (per environment configuration)
- .env.example committed to repo (dummy values for documentation)
- Actual .env files gitignored (never committed)

### Content Management Workflow

**System:** Headless CMS (Contentful, Sanity, or Strapi)

**Workflow:**
1. Content editor logs into CMS
2. Creates/edits blog post, guide, resource
3. Publishes content (triggers webhook)
4. Vercel revalidates affected pages
5. Content appears on site within 30 seconds

**Content Types:**
- Blog posts (title, slug, author, date, body, featured image)
- Guides (title, category, difficulty, steps, downloads)
- Resources (title, type, description, file URL)
- FAQs (question, answer, category)

### Search Implementation

**System:** Algolia or ElasticSearch

**Indexed Content:**
- All blog posts and guides
- All location pages (/sydney/water-damage)
- Contractor directory (filtered by location, service, certification)
- FAQ database

**Search Features:**
- Autocomplete (suggest as you type)
- Faceted search (filter by disaster type, location)
- Typo tolerance (handle misspellings)
- Highlighting (show matching terms in results)

### Analytics Implementation

**Primary:** Google Analytics 4

**Custom Events:**
- `claim_started` - User begins claim intake wizard
- `claim_step_completed` - User completes each claim wizard step
- `claim_submitted` - User submits complete claim
- `contractor_inquiry` - User clicks NRPG signup CTA
- `contractor_signup_started` - User begins NRPG signup
- `content_download` - User downloads PDF guide
- `tool_interaction` - User interacts with cost calculator/assessment tool

**Tracking Priorities:**
1. **Conversion funnel tracking:** Page views → claims submitted
2. **Geographic performance:** Which cities convert best
3. **Content engagement:** Time on page, scroll depth, article completion
4. **Contractor acquisition funnel:** /contractors → /join → signup complete

---

## Conversion Funnels

### Client Claim Reporting Funnel

**Path:** Multi-step wizard at `/claim/step-1`, `/claim/step-2`, `/claim/step-3`

**Steps:**

**Step 1: Triage (Emergency Assessment)**
- What happened? (disaster type dropdown)
- When did it happen? (date/time picker)
- Is it still happening? (yes/no radio)
- Is anyone in danger? (yes/no - critical priority flag)

**Step 2: Location & Contact**
- Property address (autocomplete with Google Places API)
- Suburb (auto-filled)
- Postcode (auto-filled)
- Your name (text input)
- Phone number (with Australian format validation)
- Email (with validation)

**Step 3: Details & Insurance**
- Describe the damage (textarea, min 20 characters)
- Upload photos (optional, drag-and-drop)
- Do you have insurance? (yes/no)
- If yes: Insurance provider (text input)
- If yes: Policy number (text input, optional)

**Confirmation:**
- Review all details
- Submit claim
- Show loading progress (DesignOS LoadingProgress component)
- Success state: "Help is on the way - expect 3 contractor calls within 30 minutes"

**Technical Features:**
- Location auto-detection (GPS-based for mobile)
- Cross-device persistence (save progress, resume later)
- Rate limiting (prevent spam)
- CAPTCHA (hCaptcha or reCAPTCHA on submission)
- CSP headers (Content Security Policy for XSS prevention)

### NRPG Contractor Acquisition Funnel

**Path:** `/contractors` → `/how-it-works` → `/join`

**Page 1: `/contractors` (Awareness)**

**Content:**
- Hero: "Join Australia's #1 Disaster Recovery Network"
- Value props:
  - Pre-qualified leads (contact verified, insured, urgent)
  - Fair rotation system (no favoritism, equal opportunity)
  - Transparent pricing ($99-799/month, no hidden fees)
- Social proof:
  - Earnings testimonials ("I made $45k in 3 months")
  - Lead quality testimonials ("Best leads I've ever received")
- CTA: "See How It Works" (link to /how-it-works)

**Page 2: `/how-it-works` (Education)**

**Content:**
- How the platform works (step-by-step):
  1. Client reports disaster
  2. AI qualifies lead (severity, insurance, location)
  3. Contractor rotation system dispatches
  4. You receive SMS/email with lead details
  5. You contact client, close job, get paid
- Pricing breakdown:
  - Basic $99/mo (10 leads/month)
  - Pro $299/mo (50 leads/month)
  - Enterprise $799/mo (unlimited leads)
- ROI calculator (interactive):
  - "If you close 5 jobs/month at $3,000 average, subscription pays for itself in 6 days"
- Sample lead preview (anonymized):
  - "Urgent: Water damage, Sydney, 2000, Insured (NRMA), Photos attached"
- CTA: "Start Your Application" (link to /join)

**Page 3: `/join` (Signup)**

**Content:**
- Application form:
  - Business name
  - ABN/ACN
  - Primary contact (name, phone, email)
  - Service areas (multi-select: Sydney, Melbourne, etc.)
  - Specializations (multi-select: Water, Fire, Mold, etc.)
  - IICRC certifications (checkboxes: S500, S520, WRT, FSRT)
  - Upload certificates (file upload)
- Subscription tier selection (radio buttons with pricing)
- CTA: "Submit Application"
- Post-submit: "Application received - we'll review within 24 hours"

**Technical Features:**
- Stripe integration (subscription signup, payment method capture)
- ABN/ACN validation (Australian Business Number lookup API)
- Document upload (certificates, insurance, licenses)
- Email automation (application received, approval, onboarding)

### Geographic Personalization

**Adaptive Elements:**
- **Local contractor availability:** "47 certified contractors in your area" (IP geolocation)
- **Regional disaster risk warnings:** Sydney = bushfire prep, Queensland = flood content (location-based)
- **Local case studies/testimonials:** Show success stories from user's city (geo-targeted)

---

## Analytics & Tracking

### Conversion Funnel Tracking

**Client Claim Funnel:**
```
Homepage → /claim/step-1 → /claim/step-2 → /claim/step-3 → Success
```

**Track Drop-off:**
- % completing step 1
- % completing step 2
- % completing step 3
- % submitting complete claim

**Goal:** Identify friction points, optimize form fields, reduce abandonment

**NRPG Contractor Funnel:**
```
Homepage → /contractors → /how-it-works → /join → Application Submitted
```

**Track Drop-off:**
- % clicking "See How It Works"
- % clicking "Start Your Application"
- % submitting complete application

**Goal:** Identify messaging gaps, optimize value props, reduce application friction

### Geographic Performance Tracking

**Metrics by City:**
- Claim submissions (Sydney vs Melbourne vs Brisbane)
- Conversion rate (visitors → claims)
- Average time to first contractor contact
- Contractor density (leads per contractor)

**Goal:** Identify high-performing markets, allocate contractor acquisition resources

### Content Engagement Tracking

**Metrics per Article/Guide:**
- Page views
- Time on page
- Scroll depth (25%, 50%, 75%, 100%)
- Download rate (for gated PDFs)
- Exit rate (where do readers go next?)

**Goal:** Identify top-performing content, double down on successful topics, improve low-engagement content

---

## Launch Strategy

### Rollout Approach

**Strategy:** Soft launch (SEO pages live, claim intake gated)

**Phase 1: SEO Foundation (Week 1-2)**
- Generate and publish ALL location pages (/sydney/water-damage, etc.)
- Submit sitemap to Google (5,000-10,000 pages)
- Begin indexing (allow Google to crawl and index)
- Publish 20-30 blog posts (foundational content)
- No claim intake yet (waitlist landing page only)

**Phase 2: Content Expansion (Week 3-4)**
- Publish 30-50 additional articles
- Add interactive tools (cost calculator, risk assessment)
- Build email list (newsletter signups, content downloads)
- Continue SEO optimization (meta tags, schema markup)
- Claim intake still gated (waitlist growing)

**Phase 3: Soft Launch Testing (Week 5-6)**
- Open claim intake to waitlist (beta testers)
- Test full funnel with real users (limited volume)
- Monitor contractor capacity (ensure supply meets demand)
- Iterate on funnel based on feedback
- Fix bugs, optimize UX

**Phase 4: Public Launch (Week 7-8)**
- Remove waitlist gate
- Open claim intake to all traffic
- PR push (press releases, industry announcements)
- Paid advertising (Google Ads, Facebook Ads)
- Monitor infrastructure (scaling, performance, errors)

**Target Timeline:** 60 days (balanced timeline from strategy to public launch)

---

## Operations & Maintenance

### Content Publishing Schedule

**Frequency:** 2-3 blog posts/week

**Content Mix:**
- **50%** Educational content (how-to guides, disaster prep tips)
- **25%** Case studies (contractor success stories, client transformations)
- **15%** Industry news (IICRC updates, insurance changes, regulatory news)
- **10%** Seasonal content (bushfire season prep, flood warnings, storm readiness)

**Content Team:**
- 1 content strategist (plan topics, keyword research)
- 2 writers (1 SME contractor, 1 AI-assisted writer with editor)
- 1 editor (quality control, E.E.A.T compliance, Lighthouse optimization)

### SEO Monitoring & Optimization

**Frequency:** Monthly audits

**Tasks:**
- Track keyword rankings (Ahrefs, SEMrush)
- Fix technical issues (broken links, crawl errors, speed issues)
- Update content (refresh old articles, add new sections)
- Build links (outreach to insurance sites, trade associations)
- Monitor Google Search Console (impressions, clicks, CTR)

**Goal:** Improve rankings for target keywords, increase organic traffic

### Conversion Rate Optimization

**Strategy:** Continuous A/B testing

**Test Ideas:**
- Homepage hero CTA ("Report a Claim" vs "Get Help Now" vs "Find Contractor")
- Claim wizard length (3 steps vs 5 steps)
- Form field labels (formal vs casual language)
- Social proof placement (hero vs mid-page vs footer)
- NRPG pricing display (show upfront vs hide behind demo request)

**Tool:** Google Optimize or Vercel Edge Middleware (A/B testing)

**Goal:** Increase conversion rates by 10-20% through iterative testing

### Performance Monitoring & Alerts

**Tool:** Vercel Analytics + Lighthouse CI

**Monitored Metrics:**
- Core Web Vitals (LCP, FID, CLS)
- Uptime (99.9% target)
- Error rate (<0.1% target)
- API response time (<500ms target)

**Alerts:**
- LCP >2.5s (performance degradation)
- Error rate >1% (critical issue)
- Uptime <99% (outage)
- API response time >1s (database slow)

**Response Plan:**
- Performance degradation: Investigate slow queries, optimize images, review edge cache
- Critical errors: Roll back deployment, investigate logs, fix and redeploy
- Outage: Activate incident response plan, communicate with users, restore service

---

## Risk Mitigation

### SEO Cannibalization Risk

**Risk:** New DisasterRecovery.com.au competes with existing sites for same keywords

**Mitigation:**
- Careful keyword mapping (assign unique keywords to each domain)
- Canonical tags (prevent duplicate content issues)
- Differentiated content angles (DisasterRecovery = client-facing, NRPG = contractor-facing)
- Monitor rankings (track if new site hurts existing site performance)

**Monitoring:** Weekly rank tracking for high-value keywords across all domains

### Lead Quality Issues

**Risk:** Open claim intake attracts spam or unqualified leads

**Mitigation:**
- CAPTCHA on form submission (hCaptcha or reCAPTCHA)
- Phone/email validation (verify contact info)
- Qualification questions (insurance, damage severity, timeline)
- Rate limiting (prevent mass submissions from single IP)

**Monitoring:** Review lead quality metrics (contractor close rate, complaint rate)

### Contractor Capacity Constraints

**Risk:** Leads come in faster than contractor supply can handle

**Mitigation:**
- Phased launch (waitlist, beta, public)
- Geographic soft launch (open city-by-city if needed)
- Aggressive contractor acquisition (NRPG marketing push)
- Overflow handling (waitlist for clients if no contractors available)

**Monitoring:** Track contractor-to-lead ratio, dispatch success rate

### Performance Degradation at Scale

**Risk:** Site slows down with thousands of SEO pages

**Mitigation:**
- ISR strategy (hybrid static + on-demand generation)
- Edge caching (Vercel Edge Network, 7-day cache)
- Performance monitoring (Lighthouse CI, alerts for degradation)
- Database optimization (indexes, query optimization)

**Monitoring:** Lighthouse CI on every deploy, real-time Core Web Vitals monitoring

---

## Success Metrics

### Primary KPI

**North Star:** Total claims submitted (volume metric)

**Target:** 500 claims/month by Month 3, 2,000 claims/month by Month 12

### Secondary KPIs

**Contractor Signups:**
- Target: 100 NRPG contractors by Month 3, 500 by Month 12
- Metric: Monthly new contractor subscriptions

**Conversion Quality:**
- Target: 60% of claims become actual jobs (contractor close rate)
- Metric: Claims submitted → jobs completed

**Revenue:**
- Target: $50k MRR by Month 6, $150k MRR by Month 12
- Metric: Contractor subscription revenue + overage fees

**Organic Traffic:**
- Target: 50k monthly visitors by Month 6, 200k by Month 12
- Metric: Google Analytics sessions from organic search

**Content Engagement:**
- Target: 3 minutes average time on content pages
- Metric: GA4 engagement time, scroll depth

### Geographic Performance

**Track by City:**
- Claims per capita (Sydney vs Melbourne vs Brisbane)
- Contractor density (claims per contractor)
- Conversion rate (visitors → claims)

**Goal:** Identify top-performing markets for resource allocation

---

## Documentation Requirements

### 1. Content Style Guide

**Sections:**
- Voice & tone (authority/clinical, not empathetic/casual)
- Writing style (sentence structure, active voice, jargon avoidance)
- SEO templates (title tags, meta descriptions, heading structure)
- Image guidelines (alt text, file naming, size limits)
- Brand terminology ("Who First?™" trademark usage)

**Deliverable:** 20-page style guide PDF + Notion workspace

### 2. Component Library Documentation (Storybook)

**Sections:**
- All DesignOS components (existing 18 components)
- New marketing components (hero variants, testimonial cards, interactive tools)
- Usage examples (code snippets, live previews)
- Props documentation (TypeScript types, default values)
- Accessibility notes (WCAG compliance, ARIA labels)

**Deliverable:** Storybook deployed at storybook.disasterrecovery.com.au

### 3. Operations Playbook

**Sections:**
- Monitoring (Vercel Analytics, Lighthouse CI, GA4)
- Incident response (performance degradation, outages, security issues)
- Deployment process (staging, production, rollback)
- Content publishing (CMS workflow, approval process)
- SEO maintenance (monthly audits, link building)

**Deliverable:** 30-page operations runbook + on-call rotation

### 4. SEO Strategy Document

**Sections:**
- Keyword map (target keywords by page type)
- Content plan (editorial calendar, topic clusters)
- Link building plan (outreach targets, partnership opportunities)
- Technical SEO (schema markup, sitemap, robots.txt)
- Performance targets (rankings, traffic, conversions)

**Deliverable:** Living Google Doc updated monthly

---

## Appendices

### Appendix A: Technology Stack Summary

**Core:**
- Next.js 14 (App Router, TypeScript)
- Prisma ORM + PostgreSQL
- Tailwind CSS + DesignOS
- Vercel (deployment, edge functions)

**Added:**
- Headless CMS (Contentful/Sanity/Strapi)
- Search (Algolia/ElasticSearch)
- Analytics (GA4 + Mixpanel/PostHog)
- A/B testing (Google Optimize/Vercel)

**Third-Party:**
- Stripe (subscriptions, Connect)
- SendGrid/AWS SES (email automation)
- Cloudinary (image optimization)
- Google Places API (address autocomplete)
- ABN lookup API (contractor verification)

### Appendix B: Existing Assets to Leverage

**SEO Generator (GitHub):**
- 5,000-10,000 location pages (city × disaster type)
- SEO templates (title, meta, schema)
- Content generation scripts

**DesignOS Design System:**
- 18 production-ready components
- Design tokens (colors, typography, spacing)
- Theme hooks (context-aware, brand-aware)
- WCAG AA accessibility compliance

**NRPG Platform:**
- Contractor onboarding (7 phases, training, verification)
- Subscription system (tiers, billing, overage)
- Dispatch algorithm (rotation, auto-dispatch)
- Client onboarding (7 phases, education)

### Appendix C: Strategic Interview Summary

**Total Questions:** 40+ across 8 phases (A-H)

**Key Decisions:**
- AI automated claim reporting (no phone contact)
- Geographic hierarchy URL structure
- Full SEO generator import
- Hybrid design system (DesignOS + marketing components)
- Soft launch strategy (SEO pages live, claim intake gated)
- 60-day timeline
- WCAG 2.1 AA accessibility
- Excellent performance targets (LCP <1.5s)

---

## Conclusion

This specification provides a complete blueprint for launching DisasterRecovery.com.au as Australia's national disaster recovery platform. By leveraging existing assets (SEO generator, DesignOS, NRPG platform) and following this systematic approach, the project can launch within 60 days with:

- **5,000-10,000** SEO location pages (comprehensive national coverage)
- **50-100** educational articles (authority content library)
- **Complete conversion funnels** (client claim intake, NRPG contractor acquisition)
- **Production-ready infrastructure** (Next.js, Vercel, Prisma, CMS)
- **Comprehensive tracking** (GA4, conversion funnels, geographic performance)

**Success is defined by volume:** Total claims submitted is the north star metric, supported by contractor signups, conversion quality, and revenue growth.

**Next steps:** Begin Phase 1 (SEO Foundation) immediately - generate location pages, publish foundational content, submit sitemap. Iterate rapidly through soft launch phases to reach public launch within 8 weeks.

---

**Document Version:** 1.0.0
**Last Updated:** 2026-01-02
**Next Review:** After Phase 1 completion (Week 2)
