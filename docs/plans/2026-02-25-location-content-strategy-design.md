# Location Content Strategy — Rich Data Layer Design

**Date:** 2026-02-25
**Status:** Approved
**Scope:** All location pages (~77) + city/service pages (~90) on disasterrecovery.com.au

---

## Problem

All location pages use `getLocationSections()` which generates identical 5-section content for every city — only swapping city/state names and 4 climate risks. Google correctly flags these as thin/duplicate content. 6 location pages are noindexed, and the remaining ~70 produce weak SEO signals due to near-identical content.

The `LocationServiceGenerator` powering `/locations/[city]/[service]` pages has slightly richer data (suburbs, populations) but still produces heavily templated content.

Combined, ~167 pages deliver poor SEO, AEO, and GEO value.

## Solution

Replace both template engines with a single unified content system powered by a rich data layer. Each city gets a dedicated JSON data file containing genuinely unique data points (climate, historical events, risk profiles, insurance data, suburb details). Content generators use conditional logic to produce structurally different pages based on each city's data profile.

## Design Decisions

| Decision | Choice | Rationale |
|----------|--------|-----------|
| Data storage | Static JSON files per city | Simple, fast, zero runtime deps, easy to audit |
| Content generation | Conditional content blocks | Structurally different pages, not string interpolation |
| API enrichment | Build-time only (BOM climate) | Hook point for future; not a launch blocker |
| City+service pages | Included in scope | Highest ROI for SEO/AEO/GEO — transactional long-tail keywords |
| Rollout order | Fix noindexed first → metros → full coverage | Quick GSC wins while building out the rest |
| Fallback strategy | State-level defaults for smaller cities | Every city gets state-differentiated content minimum |

---

## Data Architecture

### LocationData Interface

```typescript
interface LocationData {
  // Identity
  slug: string;
  city: string;
  state: string;
  stateFullName: string;
  population: number;
  elevation: number;
  coordinates: { lat: number; lng: number };
  timezone: string;

  // Climate (BOM averages)
  climate: {
    annualRainfallMm: number;
    avgMaxTempC: number;
    avgMinTempC: number;
    avgHumidityPercent: number;
    wetMonths: string[];
    dryMonths: string[];
    cycloneSeason?: string;
    frostRisk: boolean;
    coastalExposure: boolean;
  };

  // Disaster risk profile
  risks: {
    primary: RiskEntry[];
    secondary: RiskEntry[];
    bushfireAttackLevel?: string;
    floodZone?: string;
    cycloneCategory?: string;
    stormSurgeRisk?: boolean;
  };

  // Historical events
  historicalEvents: {
    year: number;
    event: string;
    description: string;
    insuranceCostAud?: string;
  }[];

  // Suburbs & service areas
  suburbs: SuburbEntry[];
  regions: string[];

  // Local resources
  council: {
    name: string;
    emergencyUrl?: string;
    sesUnit?: string;
  };

  // Insurance & claims data
  insuranceProfile: {
    topClaimType: string;
    avgClaimValueAud?: string;
    claimsPerCapita?: string;
    icaRegion?: string;
  };

  // Service-specific unique content
  serviceNotes: {
    waterDamage?: string;
    fireDamage?: string;
    mouldRemediation?: string;
    stormDamage?: string;
    floodRecovery?: string;
    emergencyRestoration?: string;
  };

  // Seasonal calendar
  seasonalRisks: {
    month: string;
    risks: string[];
  }[];
}

interface RiskEntry {
  type: string;
  severity: "high" | "moderate" | "low";
  description: string;
}

interface SuburbEntry {
  name: string;
  slug: string;
  population?: number;
  riskNote?: string;
}
```

### File Layout

```
data/locations/
  _schema.ts              — TypeScript interface + Zod validation
  _state-defaults.ts      — fallback data per state for smaller cities
  sydney.json
  melbourne.json
  brisbane.json
  perth.json
  adelaide.json
  canberra.json
  darwin.json
  hobart.json
  gold-coast.json
  newcastle.json
  ... (one per city, ~70 total across all phases)
```

### Fallback Strategy

Cities without a dedicated JSON file inherit from `_state-defaults.ts`. The content generator detects fallback data and adjusts content accordingly — shorter pages, fewer unique claims, but still state-differentiated.

---

## Content Generation Architecture

### File Structure

```
src/lib/location-content/
  index.ts                    — public API
  data-loader.ts              — loads JSON + state defaults, validates, caches
  content-blocks.ts           — conditional content block library
  location-page-generator.ts  — generates /locations/[city] page content
  service-page-generator.ts   — generates /locations/[city]/[service] content
  schema-generator.ts         — generates JSON-LD per page
  faq-generator.ts            — generates unique FAQs per city + per city/service
```

### Conditional Content Blocks

Instead of one template with `{city}` placeholders, the generator selects from a library of content blocks based on data conditions:

- **Cyclone-belt cities** (Cairns, Townsville, Darwin) get cyclone-focused intros and risk sections
- **Bushfire-risk cities** (Canberra, Adelaide, Hobart) get BAL-focused content
- **High-rainfall cities** (Sydney, Brisbane, Gold Coast) get flood/water-focused content
- **Major metros** (population > 1M) get density/commercial property focus
- **Regional cities** get community-focused, response-time-aware content

This produces structurally different pages — different paragraphs, different section order, different emphasis, different data points.

### Location Page Sections (/locations/[city])

| Section | Uniqueness driver |
|---------|-------------------|
| Hero + intro paragraph | Climate profile + population tier + primary risk |
| Risk profile section | City-specific risks with severity ratings + historical events |
| Seasonal disaster calendar | Month-by-month risk timeline unique to city's climate zone |
| Service coverage map | Suburb list with risk notes + regions |
| Local emergency resources | Council name, SES unit, emergency links |
| Insurance & claims data | Top claim type, avg claim value, ICA region stats |
| FAQ section | 5-6 FAQs with city-specific answers |
| How we help (process) | Same structure but conditional detail based on primary risk |

### City+Service Page Sections (/locations/[city]/[service])

| Section | Uniqueness driver |
|---------|-------------------|
| Hero + service intro | serviceNotes[service] — unique paragraph per city/service combo |
| Why [service] matters in [city] | Climate data + historical events for this service type |
| Local risk factors | Filtered risks relevant to this specific service |
| Our [service] process in [city] | Service-specific process with local equipment/timing notes |
| Suburbs we service for [service] | Suburb list filtered by risk relevance to service |
| Insurance claims for [service] in [city] | insuranceProfile data scoped to service type |
| FAQ section | 4-5 FAQs unique to city+service combination |

### Structured Data Per Page

- **Location pages:** LocalBusiness + FAQPage + BreadcrumbList + Service (areaServed per city, real coordinates)
- **City+service pages:** Service + FAQPage + BreadcrumbList (specific service type, city area)

---

## Data Sourcing

### Static Data (compiled into JSON, updated rarely)

| Data point | Source | Update frequency |
|------------|--------|-----------------|
| Population | ABS Census 2021 | Every 5 years |
| Coordinates, elevation | Geoscience Australia | Never |
| Historical disaster events | ICA, BOM, Wikipedia | As events occur |
| Bushfire Attack Level | State planning maps (RFS, CFA) | Rarely |
| Flood zone classification | Local council flood maps | Rarely |
| Cyclone category rating | ABCB | Rarely |
| Council name, SES unit | State government directories | Rarely |
| Suburb lists + populations | ABS SA2 data | Every 5 years |
| Insurance claim profiles | ICA annual reports | Annually |
| BOM climate averages | BOM Climate Data Online | Hand-compiled (stable year-to-year) |

### API-Enriched at Build Time

| Data point | Source | Fallback |
|------------|--------|----------|
| Council emergency page URL | HEAD request link check | Omit section if 404 |

---

## Implementation Phases

### Phase 1 — Fix Noindexed Pages (ship ASAP)

1. Create data architecture (`_schema.ts`, `_state-defaults.ts`, `data-loader.ts`)
2. Create `content-blocks.ts` + `location-page-generator.ts` + `faq-generator.ts`
3. Compile JSON for `melbourne.json`, `perth.json`, `adelaide.json`, `brisbane.json`
   - brookwater, eagle-farm, indooroopilly become suburb entries in `brisbane.json`
4. Update the 6 noindexed page files to use new content system
5. Create `schema-generator.ts` for per-page JSON-LD
6. Remove 6 noindex headers from `next.config.js`
7. Deploy + verify in GSC

### Phase 2 — Major Metros + City/Service Pages

8. Compile JSON for remaining ~12 major cities
9. Create `service-page-generator.ts`
10. Migrate all legacy flat city pages to new system
11. Migrate `[city]/[service]` dynamic route to new system
12. Deploy

### Phase 3 — Full Coverage

13. Compile JSON for remaining ~50 state/city pages
14. Migrate all `[state]/[city]` pages to new system
15. Delete deprecated `location-sections.tsx` + `location-service-generator.ts`
16. Deploy + full GSC validation

---

## Files Modified

| File | Change |
|------|--------|
| All `app/locations/*/page.tsx` legacy city pages | Switch to new content system |
| All `app/locations/[state]/[city]/page.tsx` pages | Switch to new content system |
| `app/locations/[city]/[service]/page.tsx` | Switch from LocationServiceGenerator |
| `app/locations/[state]/page.tsx` (8 state pages) | Enhanced with state-level data |
| `next.config.js` | Remove noindex headers as pages get real content |

## Files Deprecated

| File | Replaced by |
|------|-------------|
| `src/lib/content-sections/location-sections.tsx` | `src/lib/location-content/location-page-generator.ts` |
| `lib/location-service-generator.ts` | `src/lib/location-content/service-page-generator.ts` |

---

## Testing Strategy

- `vercel --prod --yes` must pass at each phase (authoritative build check)
- Spot-check rendered HTML: no two city pages should share >30% identical paragraph text
- Schema validation: Google Rich Results Test on sample pages
- GSC: monitor indexing status after removing noindex headers

## Success Criteria

- All 6 previously-noindexed location pages pass Google indexing (no soft 404, no thin content flags)
- Each location page has a unique content fingerprint (different paragraphs, data points, section emphasis)
- City+service pages rank for transactional long-tail keywords within 3-6 months
- Rich Results Test: 0 errors on all page types
- AI citation engines can extract unique, factual claims per city from page content
