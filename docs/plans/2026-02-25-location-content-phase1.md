# Location Content Phase 1 — Fix Noindexed Pages Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Replace thin/duplicate location page content with a rich data-driven content system for 4 cities (Melbourne, Perth, Adelaide, Brisbane), unblocking 6 noindexed URLs for Google indexing.

**Architecture:** Static JSON data files per city feed conditional content block generators that produce structurally different pages based on each city's climate, risk profile, population tier, and historical events. Replaces the existing `getLocationSections()` template engine for Phase 1 cities only — all other pages continue to use the old system until Phases 2-3.

**Tech Stack:** TypeScript, Zod validation, Next.js static rendering, JSON-LD structured data, React JSX content sections via `AgContentPageTemplate` (Antigravity design system).

**Design doc:** `docs/plans/2026-02-25-location-content-strategy-design.md`

---

## Critical Context

### Noindexed pages (6 total)
- `/locations/brookwater` — NO page file exists (Brisbane suburb, serves 404)
- `/locations/eagle-farm` — NO page file exists (Brisbane suburb, serves 404)
- `/locations/indooroopilly` — NO page file exists (Brisbane suburb, serves 404)
- `/locations/melbourne` — page at `app/locations/melbourne/page.tsx`
- `/locations/perth` — page at `app/locations/perth/page.tsx`
- `/locations/adelaide` — page at `app/locations/adelaide/page.tsx`

### Strategy for Brisbane suburbs
Brookwater, Eagle Farm, and Indooroopilly have no page files. They're noindexed because Google crawled them and got soft 404s. **Solution:** Add redirects to `/locations/brisbane` and remove their noindex headers. The Brisbane page will list them as serviced suburbs in its coverage section.

### Existing patterns to preserve
- All location pages use `AgContentPageTemplate` with `ContentSection[]` from `@/components/antigravity`
- Legacy pages use `LocationSchemaWrapper` for JSON-LD — we replace this with a new `schema-generator.ts`
- The `ContentSection` interface: `{ heading?: string; body: ReactNode; background?: 'light' | 'dark' }`
- Import pattern: `import { getRelatedPages } from '@/lib/internal-links'` — keep using this

### Build/deploy
- `npx next build` fails on Windows (spawn UNKNOWN) — NOT a code error
- **Authoritative build check:** `vercel --prod --yes` from project root
- Use `--legacy-peer-deps` for any npm installs

### CLAUDE.md billing rules
- NEVER use "direct-bill", "no upfront costs", "pay only your excess"
- CORRECT: "We bill you directly", "Work begins immediately", "Full claims documentation provided"
- Payment plans: Blue Fire Finance link

### JSON-LD safety note
All JSON-LD structured data uses `JSON.stringify()` on hardcoded objects built from trusted server-side data (static JSON files compiled at build time). No user input is ever interpolated into these objects. This is the standard Next.js pattern for structured data as used throughout `app/layout.tsx`.

---

## Task 1: Create Zod Schema and TypeScript Interfaces

**Files:**
- Create: `data/locations/_schema.ts`

**Step 1: Create the data directory**

```bash
mkdir -p data/locations
```

**Step 2: Write the schema file**

Create `data/locations/_schema.ts` with Zod schemas matching the `LocationData` interface from the design doc. Export both the Zod schema (for runtime validation) and inferred TypeScript types.

```typescript
import { z } from 'zod';

const RiskEntrySchema = z.object({
  type: z.string(),
  severity: z.enum(['high', 'moderate', 'low']),
  description: z.string().min(20),
});

const SuburbEntrySchema = z.object({
  name: z.string(),
  slug: z.string(),
  population: z.number().optional(),
  riskNote: z.string().optional(),
});

const LocationDataSchema = z.object({
  slug: z.string(),
  city: z.string(),
  state: z.string(),
  stateFullName: z.string(),
  population: z.number(),
  elevation: z.number(),
  coordinates: z.object({ lat: z.number(), lng: z.number() }),
  timezone: z.string(),

  climate: z.object({
    annualRainfallMm: z.number(),
    avgMaxTempC: z.number(),
    avgMinTempC: z.number(),
    avgHumidityPercent: z.number(),
    wetMonths: z.array(z.string()),
    dryMonths: z.array(z.string()),
    cycloneSeason: z.string().optional(),
    frostRisk: z.boolean(),
    coastalExposure: z.boolean(),
  }),

  risks: z.object({
    primary: z.array(RiskEntrySchema).min(2),
    secondary: z.array(RiskEntrySchema),
    bushfireAttackLevel: z.string().optional(),
    floodZone: z.string().optional(),
    cycloneCategory: z.string().optional(),
    stormSurgeRisk: z.boolean().optional(),
  }),

  historicalEvents: z.array(z.object({
    year: z.number(),
    event: z.string(),
    description: z.string(),
    insuranceCostAud: z.string().optional(),
  })).min(1),

  suburbs: z.array(SuburbEntrySchema).min(3),
  regions: z.array(z.string()).min(1),

  council: z.object({
    name: z.string(),
    emergencyUrl: z.string().optional(),
    sesUnit: z.string().optional(),
  }),

  insuranceProfile: z.object({
    topClaimType: z.string(),
    avgClaimValueAud: z.string().optional(),
    claimsPerCapita: z.string().optional(),
    icaRegion: z.string().optional(),
  }),

  serviceNotes: z.object({
    waterDamage: z.string().optional(),
    fireDamage: z.string().optional(),
    mouldRemediation: z.string().optional(),
    stormDamage: z.string().optional(),
    floodRecovery: z.string().optional(),
    emergencyRestoration: z.string().optional(),
  }),

  seasonalRisks: z.array(z.object({
    month: z.string(),
    risks: z.array(z.string()),
  })),
});

export { LocationDataSchema, RiskEntrySchema, SuburbEntrySchema };
export type LocationData = z.infer<typeof LocationDataSchema>;
export type RiskEntry = z.infer<typeof RiskEntrySchema>;
export type SuburbEntry = z.infer<typeof SuburbEntrySchema>;
```

**Step 3: Commit**

```bash
git add data/locations/_schema.ts
git commit -m "feat: add Zod schema for location data layer"
```

---

## Task 2: Create State Defaults

**Files:**
- Create: `data/locations/_state-defaults.ts`

**Step 1: Write state defaults**

Create `data/locations/_state-defaults.ts`. This provides fallback climate, risk, and seasonal data for cities without a dedicated JSON file. Phase 1 cities all have JSON files, but the data-loader needs this for the fallback path.

```typescript
import type { LocationData } from './_schema';

// Partial location data keyed by state code — used as fallback for cities
// without a dedicated JSON file. Only includes fields that are state-level
// (climate, risks, seasonal patterns). City-specific fields are omitted.
type StateDefaults = Pick<LocationData,
  'stateFullName' | 'timezone' | 'climate' | 'risks' | 'seasonalRisks' | 'insuranceProfile'
>;

export const STATE_DEFAULTS: Record<string, StateDefaults> = {
  VIC: {
    stateFullName: 'Victoria',
    timezone: 'Australia/Melbourne',
    climate: {
      annualRainfallMm: 603,
      avgMaxTempC: 19.8,
      avgMinTempC: 9.6,
      avgHumidityPercent: 57,
      wetMonths: ['Oct', 'Nov', 'Jun'],
      dryMonths: ['Jan', 'Feb', 'Mar'],
      frostRisk: true,
      coastalExposure: true,
    },
    risks: {
      primary: [
        { type: 'flash flooding', severity: 'high', description: 'Victoria experiences sudden flooding from intense rainfall, particularly during La Nina years.' },
        { type: 'bushfire proximity', severity: 'high', description: 'Grassland and forest fires threaten urban fringes across the state.' },
        { type: 'wind damage', severity: 'moderate', description: 'Severe storms with destructive winds regularly damage roofing and trees.' },
      ],
      secondary: [
        { type: 'burst pipes from cold snaps', severity: 'moderate', description: 'Winter temperatures cause pipe failures, particularly in older properties.' },
      ],
    },
    seasonalRisks: [
      { month: 'Jan', risks: ['bushfire', 'heatwave damage'] },
      { month: 'Feb', risks: ['bushfire', 'severe thunderstorms'] },
      { month: 'Mar', risks: ['autumn storms', 'flash flooding'] },
      { month: 'Apr', risks: ['storm damage'] },
      { month: 'May', risks: ['early cold snap pipe bursts'] },
      { month: 'Jun', risks: ['winter storms', 'flooding'] },
      { month: 'Jul', risks: ['pipe bursts', 'storm damage'] },
      { month: 'Aug', risks: ['wind damage', 'flooding'] },
      { month: 'Sep', risks: ['spring storms'] },
      { month: 'Oct', risks: ['severe storms', 'flooding'] },
      { month: 'Nov', risks: ['storm cells', 'early bushfire season'] },
      { month: 'Dec', risks: ['bushfire', 'severe thunderstorms'] },
    ],
    insuranceProfile: {
      topClaimType: 'storm damage',
      icaRegion: 'Victoria',
    },
  },
  // WA, SA, QLD — add with same structure for Phase 1 coverage
};

export function getStateDefaults(state: string): StateDefaults | undefined {
  return STATE_DEFAULTS[state];
}
```

Include VIC, WA, SA, and QLD entries (the 4 states needed for Phase 1 cities). Each entry follows the same structure as VIC above but with state-specific data.

**Step 2: Commit**

```bash
git add data/locations/_state-defaults.ts
git commit -m "feat: add state-level default data for location fallbacks"
```

---

## Task 3: Compile Melbourne JSON Data

**Files:**
- Create: `data/locations/melbourne.json`

**Step 1: Research and compile Melbourne data**

Research the following from authoritative sources:
- **ABS Census 2021:** Melbourne population (Greater Melbourne ~5,000,000)
- **BOM Climate Data:** Melbourne Regional Office averages (rainfall ~603mm, max 19.8C, min 9.6C, humidity ~57%)
- **Coordinates:** -37.8136, 144.9631; elevation ~31m
- **Historical events:** 2010 Melbourne storms ($1B+ insured), 2016 thunderstorm asthma, Black Saturday 2009 (peri-urban), 2022 October floods
- **Council:** City of Melbourne; SES: Victoria SES Metropolitan
- **ICA data:** Storm damage is #1 claim type in VIC
- **Suburbs:** CBD, St Kilda, South Yarra, Richmond, Fitzroy, Carlton, Camberwell, Brighton, Footscray, Williamstown, Frankston, Dandenong, Box Hill, Glen Waverley, Ringwood
- **Regions:** Inner East, Bayside, Western Suburbs, Northern Suburbs, Mornington Peninsula
- **Bushfire:** BAL-12.5 for outer suburbs (Eltham, Warrandyte fringe)
- **Flood zone:** Moderate (Maribyrnong River corridor, Elster Creek)

Create `data/locations/melbourne.json` with the full `LocationData` schema. Include all 12 `seasonalRisks` months, at least 3 primary risks with unique descriptions, 2+ historical events, and service-specific notes for waterDamage, fireDamage, mouldRemediation, and stormDamage.

**Step 2: Validate**

Write a small validation script at `data/locations/_validate.ts`:
```bash
npx tsx data/locations/_validate.ts
```
Expected: "melbourne.json: VALID"

**Step 3: Commit**

```bash
git add data/locations/melbourne.json
git commit -m "feat: add Melbourne rich location data (ABS/BOM sourced)"
```

---

## Task 4: Compile Perth JSON Data

**Files:**
- Create: `data/locations/perth.json`

**Step 1: Research and compile Perth data**

- **ABS Census 2021:** Perth population ~2,100,000
- **BOM Climate Data:** Perth Airport averages (rainfall ~734mm, max 24.7C, min 12.7C, humidity ~52%)
- **Coordinates:** -31.9505, 115.8605; elevation ~20m
- **Historical events:** 2016 Perth Hills bushfire, 2010 Toodyay fire, Cyclone Seroja 2021 (regional), 2017 Perth thunderstorm
- **Council:** City of Perth; SES: WA SES Metropolitan
- **Bushfire:** BAL-29 for Hills suburbs (Mundaring, Kalamunda)
- **Cyclone category:** A (Perth metro); B-D for northern WA
- **Flood zone:** Low-moderate (Swan/Canning river corridors)
- **Suburbs:** CBD, Fremantle, Subiaco, Cottesloe, Scarborough, Joondalup, Midland, Armadale, Rockingham, Mandurah, Claremont, Victoria Park
- **Regions:** Western Suburbs, Northern Suburbs, Southern Suburbs, Eastern Suburbs, Coastal

Follow exact same structure as `melbourne.json`. Unique service notes should reference Perth's dry climate (mould from aircon condensation), bushfire Hills risk, cyclone season awareness.

**Step 2: Validate against Zod schema** (same approach as Task 3 Step 2)

**Step 3: Commit**

```bash
git add data/locations/perth.json
git commit -m "feat: add Perth rich location data (ABS/BOM sourced)"
```

---

## Task 5: Compile Adelaide JSON Data

**Files:**
- Create: `data/locations/adelaide.json`

**Step 1: Research and compile Adelaide data**

- **ABS Census 2021:** Adelaide population ~1,350,000
- **BOM Climate Data:** Adelaide Airport averages (rainfall ~546mm, max 22.4C, min 11.6C, humidity ~50%)
- **Coordinates:** -34.9285, 138.6007; elevation ~50m
- **Historical events:** 2019/2020 Adelaide Hills bushfires, 2016 SA statewide blackout storm, Pinery bushfire 2015, 2005 November storms
- **Council:** City of Adelaide; SES: SA SES Metropolitan
- **Bushfire:** BAL-29+ for Hills Face Zone (Burnside, Crafers, Lobethal)
- **Flood zone:** Moderate (Torrens River corridor, Brownhill Creek)
- **Suburbs:** CBD, Glenelg, Norwood, Unley, Burnside, Prospect, Port Adelaide, Marion, Salisbury, Tea Tree Gully, Modbury
- **Regions:** City and North Adelaide, Eastern Suburbs, Western Suburbs, Southern Suburbs

Unique emphasis: bushfire is the dominant risk (not storms/flooding like Melbourne). Service notes should reference Hills fire corridor, old stone buildings, and dry heat pipe stress.

**Step 2: Validate against Zod schema**

**Step 3: Commit**

```bash
git add data/locations/adelaide.json
git commit -m "feat: add Adelaide rich location data (ABS/BOM sourced)"
```

---

## Task 6: Compile Brisbane JSON Data

**Files:**
- Create: `data/locations/brisbane.json`

**Step 1: Research and compile Brisbane data**

- **ABS Census 2021:** Brisbane population ~2,500,000
- **BOM Climate Data:** Brisbane averages (rainfall ~1,149mm, max 26.6C, min 16.3C, humidity ~63%)
- **Coordinates:** -27.4705, 153.026; elevation ~28m
- **Historical events:** 2011 Brisbane floods ($2.4B insured), 2022 February floods ($5.6B), Cyclone Marcia 2015, 2014 November supercell
- **Council:** Brisbane City Council (largest LGA in Australia); SES: QLD SES Brisbane Region
- **Flood zone:** High (Brisbane River corridor, Bremer River, Oxley Creek, Breakfast Creek)
- **Cyclone category:** B for Brisbane metro
- **Suburbs:** CBD, Fortitude Valley, South Bank, New Farm, Toowong, Indooroopilly, Carindale, Chermside, Cleveland, Logan, Redcliffe, Caboolture, Brookwater, Eagle Farm — **include Brookwater, Eagle Farm, Indooroopilly** as named suburbs with risk notes
- **Regions:** Inner City, Northern Suburbs, Southern Suburbs, Eastern Suburbs, Western Suburbs

Unique emphasis: flooding is the dominant risk (2011 and 2022 are landmark events). Humidity drives mould. Service notes should reference riverine flooding, subtropical storm cells, and high humidity mould risk.

**Important:** Include `Brookwater`, `Eagle Farm`, and `Indooroopilly` in the suburbs array with their slugs (`brookwater`, `eagle-farm`, `indooroopilly`). These are the noindexed URLs that will be redirected to `/locations/brisbane`. The Brisbane page content will reference them as serviced suburbs.

**Step 2: Validate against Zod schema**

**Step 3: Commit**

```bash
git add data/locations/brisbane.json
git commit -m "feat: add Brisbane rich location data (ABS/BOM sourced)"
```

---

## Task 7: Create Data Loader

**Files:**
- Create: `src/lib/location-content/data-loader.ts`

**Step 1: Create directory and write the data loader**

```bash
mkdir -p src/lib/location-content
```

This module loads a city's JSON file, validates it against the Zod schema, and caches the result. Falls back to state defaults for cities without a JSON file.

```typescript
import { LocationDataSchema, type LocationData } from '../../../data/locations/_schema';
import { getStateDefaults } from '../../../data/locations/_state-defaults';

// Build-time cache — populated once during static generation
const cache = new Map<string, LocationData>();

export function loadLocationData(slug: string): LocationData | null {
  if (cache.has(slug)) return cache.get(slug)!;

  try {
    // Dynamic require at build time — JSON files are bundled by Next.js
    const raw = require(`../../../data/locations/${slug}.json`);
    const parsed = LocationDataSchema.parse(raw);
    cache.set(slug, parsed);
    return parsed;
  } catch {
    return null;
  }
}

export function loadLocationDataWithFallback(
  slug: string,
  city: string,
  state: string,
): LocationData | null {
  const data = loadLocationData(slug);
  if (data) return data;

  // Fall back to state defaults — produces a minimal LocationData
  const defaults = getStateDefaults(state);
  if (!defaults) return null;

  // Phase 1 always has JSON files — implement full fallback construction in Phase 2
  return null;
}

export function hasRichData(slug: string): boolean {
  return loadLocationData(slug) !== null;
}
```

**Step 2: Commit**

```bash
git add src/lib/location-content/data-loader.ts
git commit -m "feat: add location data loader with Zod validation and caching"
```

---

## Task 8: Create Content Blocks Library

**Files:**
- Create: `src/lib/location-content/content-blocks.tsx`

**Step 1: Write conditional content block generators**

This is the core differentiation engine. Each function returns `ContentSection` (from `@/components/antigravity`) but selects different paragraph content based on the city's data profile.

Key functions to implement:

```typescript
import type { ContentSection } from '@/components/antigravity';
import type { LocationData } from '../../../data/locations/_schema';

// Classifies city into a content archetype based on data
type CityArchetype = 'cyclone-belt' | 'bushfire-risk' | 'high-rainfall' | 'major-metro' | 'regional';

export function getCityArchetype(data: LocationData): CityArchetype {
  if (data.climate.cycloneSeason) return 'cyclone-belt';
  if (data.risks.bushfireAttackLevel) return 'bushfire-risk';
  if (data.climate.annualRainfallMm > 900) return 'high-rainfall';
  if (data.population > 1000000) return 'major-metro';
  return 'regional';
}

// --- Intro section — 5 variants by archetype ---
export function generateIntroSection(data: LocationData): ContentSection { ... }

// --- Risk profile section — uses primary + secondary risks ---
export function generateRiskProfileSection(data: LocationData): ContentSection { ... }

// --- Seasonal disaster calendar — 12-month timeline ---
export function generateSeasonalCalendarSection(data: LocationData): ContentSection { ... }

// --- Service coverage — suburb list with risk notes ---
export function generateCoverageSection(data: LocationData): ContentSection { ... }

// --- Local emergency resources — council, SES ---
export function generateLocalResourcesSection(data: LocationData): ContentSection { ... }

// --- Insurance and claims data ---
export function generateInsuranceSection(data: LocationData): ContentSection { ... }

// --- Emergency response process — conditional on primary risk ---
export function generateProcessSection(data: LocationData): ContentSection { ... }

// --- Historical events callout ---
export function generateHistoricalEventsSection(data: LocationData): ContentSection { ... }
```

**Implementation notes:**
- Each `generate*Section` returns `{ heading: string, body: ReactNode, background?: 'light' | 'dark' }`.
- Use JSX (this file must be `.tsx`). Import React for JSX.
- The intro section MUST produce structurally different paragraphs per archetype. For example, the cyclone-belt intro mentions cyclone season dates and preparedness; the bushfire-risk intro mentions BAL ratings and ember attack zones; the high-rainfall intro mentions annual rainfall figures and flooding history.
- Reference `data.historicalEvents` with specific years, event names, and insurance costs. These are the primary uniqueness signals Google will see.
- Reference `data.climate` with specific numbers (e.g. "Brisbane receives an average of 1,149mm of rainfall annually").
- **CLAUDE.md billing rules apply:** Use "We bill you directly" not "direct-bill". Use "Full claims documentation provided" not "no upfront costs". Include Blue Fire Finance link where payment plans are mentioned.

**Step 2: Commit**

```bash
git add src/lib/location-content/content-blocks.tsx
git commit -m "feat: add conditional content block generators for location pages"
```

---

## Task 9: Create FAQ Generator

**Files:**
- Create: `src/lib/location-content/faq-generator.ts`

**Step 1: Write FAQ generator**

Generates unique FAQ entries per city using data from the JSON file. Returns structured FAQ array used for both page rendering and JSON-LD schema.

Key function:

```typescript
import type { LocationData } from '../../../data/locations/_schema';

export interface FAQEntry {
  question: string;
  answer: string;
}

export function generateLocationFAQs(data: LocationData): FAQEntry[] { ... }
```

Generate 5-6 FAQs per city:
1. **Response time** (always present) — mentions city name, regions, 24/7 availability
2. **Primary risk** (always present) — references `data.risks.primary[0]` with description and insurance stats
3. **Historical events** (conditional) — references `data.historicalEvents[0]` with year, event name, cost
4. **Insurance** (always present) — uses CLAUDE.md compliant language ("We bill you directly", Blue Fire Finance link)
5. **Suburb coverage** (always present) — lists first 6 suburbs from data
6. **Seasonal/cyclone/bushfire** (conditional) — cyclone season dates OR BAL rating depending on city profile

**Step 2: Commit**

```bash
git add src/lib/location-content/faq-generator.ts
git commit -m "feat: add data-driven FAQ generator for location pages"
```

---

## Task 10: Create Schema Generator

**Files:**
- Create: `src/lib/location-content/schema-generator.ts`

**Step 1: Write JSON-LD schema generator**

Replaces `LocationSchemaWrapper` component for pages using the new content system. Returns plain objects — the page component stringifies them into Script tags.

All schema objects are built from trusted, hardcoded data (static JSON files compiled at build time). No user input is interpolated.

Generate 4 schemas per location page:
1. **ProfessionalService** (LocalBusiness subtype) — city-specific coordinates, suburbs, price range `$2200+`
2. **FAQPage** — from FAQ generator output
3. **BreadcrumbList** — from page breadcrumbs
4. **Service** — linked to `/#organization`, areaServed per city

```typescript
import type { LocationData } from '../../../data/locations/_schema';
import type { FAQEntry } from './faq-generator';

const BASE_URL = 'https://disasterrecovery.com.au';

export function generateLocationSchemas(
  data: LocationData,
  faqs: FAQEntry[],
  breadcrumbs: { label: string; href?: string }[],
) {
  const citySlug = data.slug;

  return {
    localBusiness: { /* ProfessionalService schema */ },
    faqPage: { /* FAQPage schema */ },
    breadcrumbList: { /* BreadcrumbList schema */ },
    service: { /* Service schema linked to /#organization */ },
  };
}
```

Follow the exact schema patterns from the existing `LocationSchemaWrapper` at `src/components/seo/LocationSchemaWrapper.tsx` (lines 76-196), but enriched with real data from the JSON file (real coordinates, real suburb coverage, real price range `$2200+`, parent organization link to `/#organization`).

**Step 2: Commit**

```bash
git add src/lib/location-content/schema-generator.ts
git commit -m "feat: add JSON-LD schema generator for rich location pages"
```

---

## Task 11: Create Location Page Generator

**Files:**
- Create: `src/lib/location-content/location-page-generator.tsx`

**Step 1: Write the main page generator**

This is the orchestrator that loads data, selects content blocks, generates FAQs, and returns everything the page component needs.

```typescript
import type { ContentSection } from '@/components/antigravity';
import type { LocationData } from '../../../data/locations/_schema';
import { loadLocationData } from './data-loader';
import { generateIntroSection, generateRiskProfileSection, /* etc */ } from './content-blocks';
import { generateLocationFAQs, type FAQEntry } from './faq-generator';

export interface LocationPageContent {
  sections: ContentSection[];
  faqs: FAQEntry[];
  data: LocationData;
}

export function getLocationPageContent(slug: string): LocationPageContent | null {
  const data = loadLocationData(slug);
  if (!data) return null;

  const faqs = generateLocationFAQs(data);

  const sections: ContentSection[] = [
    generateIntroSection(data),
    generateRiskProfileSection(data),
    generateHistoricalEventsSection(data),
    generateSeasonalCalendarSection(data),
    generateProcessSection(data),
    generateCoverageSection(data),
    generateLocalResourcesSection(data),
    generateInsuranceSection(data),
    // FAQ rendered inline
    {
      heading: `Frequently Asked Questions — ${data.city} Services`,
      body: (<>{faqs.map((faq, i) => (<div key={i}><h3>{faq.question}</h3><p>{faq.answer}</p></div>))}</>),
    },
  ];

  return { sections, faqs, data };
}
```

**Step 2: Commit**

```bash
git add src/lib/location-content/location-page-generator.tsx
git commit -m "feat: add location page content generator with conditional blocks"
```

---

## Task 12: Create Public API

**Files:**
- Create: `src/lib/location-content/index.ts`

**Step 1: Write the barrel export**

```typescript
export { getLocationPageContent, type LocationPageContent } from './location-page-generator';
export { loadLocationData, hasRichData } from './data-loader';
export { generateLocationSchemas } from './schema-generator';
export { generateLocationFAQs, type FAQEntry } from './faq-generator';
export type { LocationData, RiskEntry, SuburbEntry } from '../../../data/locations/_schema';
```

**Step 2: Commit**

```bash
git add src/lib/location-content/index.ts
git commit -m "feat: add public API barrel export for location content system"
```

---

## Task 13: Update Melbourne Page

**Files:**
- Modify: `app/locations/melbourne/page.tsx`

**Step 1: Rewrite Melbourne page to use new content system**

Replace the current implementation that uses `getLocationSections()` and `LocationSchemaWrapper` with the new `getLocationPageContent()` and `generateLocationSchemas()`.

The page should:
1. Import from `@/lib/location-content` instead of `@/lib/content-sections`
2. Call `getLocationPageContent('melbourne')` to get sections + FAQs + data
3. Use `generateLocationSchemas()` to produce JSON-LD objects
4. Render JSON-LD via `<Script type="application/ld+json">` tags using `JSON.stringify()` on the trusted schema objects (standard Next.js pattern, safe — no user input)
5. Keep using `AgContentPageTemplate` with the same hero/cta/breadcrumb pattern
6. Keep using `getRelatedPages('location-melbourne')` for internal links
7. Update the `metadata` export with a richer description using data from the JSON

**Expected structure:**
```tsx
import { Metadata } from 'next';
import Script from 'next/script';
import { MapPin } from 'lucide-react';
import { AgContentPageTemplate } from '@/components/antigravity';
import { getLocationPageContent, generateLocationSchemas } from '@/lib/location-content';
import { getRelatedPages } from '@/lib/internal-links';

export const metadata: Metadata = {
  title: 'Disaster Recovery Melbourne | 24/7 Emergency Restoration VIC',
  description: 'Professional disaster recovery in Melbourne, Victoria. ...',
};

export default function MelbourneLocationPage() {
  const content = getLocationPageContent('melbourne');
  if (!content) return null;

  const schemas = generateLocationSchemas(
    content.data,
    content.faqs,
    [{ label: 'Home', href: '/' }, { label: 'Locations', href: '/locations' }, { label: 'Melbourne' }],
  );

  // All schema objects are built from trusted static JSON data — safe to stringify
  return (
    <>
      <Script id="melbourne-localbusiness" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.localBusiness) }} />
      <Script id="melbourne-faq" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.faqPage) }} />
      <Script id="melbourne-breadcrumb" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.breadcrumbList) }} />
      <Script id="melbourne-service" type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas.service) }} />
      <AgContentPageTemplate
        hero={{ gradient: 'linear-gradient(135deg, #0F2942 0%, #1E3A5F 100%)',
                icon: <MapPin className="h-12 w-12" />,
                title: 'Disaster Recovery Melbourne',
                subtitle: '24/7 Emergency Services in Melbourne' }}
        cta={{ text: 'Emergency Response', href: '/claim/start' }}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Locations', href: '/locations' },
          { label: 'Melbourne' },
        ]}
        sections={content.sections}
        relatedPages={getRelatedPages('location-melbourne')}
      />
    </>
  );
}
```

**Step 2: Commit**

```bash
git add app/locations/melbourne/page.tsx
git commit -m "feat: migrate Melbourne page to rich data-driven content system"
```

---

## Task 14: Update Perth Page

**Files:**
- Modify: `app/locations/perth/page.tsx`

**Step 1: Same pattern as Task 13 but for Perth**

Replace `getLocationSections()` + `LocationSchemaWrapper` with `getLocationPageContent('perth')` + `generateLocationSchemas()`. Update metadata description with Perth-specific details (bushfire risk, cyclone awareness, Hills suburbs).

**Step 2: Commit**

```bash
git add app/locations/perth/page.tsx
git commit -m "feat: migrate Perth page to rich data-driven content system"
```

---

## Task 15: Update Adelaide Page

**Files:**
- Modify: `app/locations/adelaide/page.tsx`

**Step 1: Same pattern as Task 13 but for Adelaide**

Replace `getLocationSections()` + `LocationSchemaWrapper` with `getLocationPageContent('adelaide')` + `generateLocationSchemas()`. Update metadata description with Adelaide-specific details (bushfire Hills Face Zone, dry heat, heritage stone buildings).

**Step 2: Commit**

```bash
git add app/locations/adelaide/page.tsx
git commit -m "feat: migrate Adelaide page to rich data-driven content system"
```

---

## Task 16: Update Brisbane Page

**Files:**
- Modify: `app/locations/brisbane/page.tsx`

**Step 1: Same pattern as Task 13 but for Brisbane**

Replace `getLocationSections()` + `LocationSchemaWrapper` with `getLocationPageContent('brisbane')` + `generateLocationSchemas()`. Update metadata description with Brisbane-specific details (2011/2022 floods, subtropical climate, mould risk).

**Important:** Brisbane's suburb coverage section will now list Brookwater, Eagle Farm, and Indooroopilly as serviced areas (they're in the JSON suburbs array). This provides content backing for the redirect strategy.

**Step 2: Commit**

```bash
git add app/locations/brisbane/page.tsx
git commit -m "feat: migrate Brisbane page to rich data-driven content system"
```

---

## Task 17: Add Redirects for Brisbane Suburb URLs

**Files:**
- Modify: `next.config.js` (redirects section, around line 197+)

**Step 1: Add 3 redirects**

In the `async redirects()` section of `next.config.js`, add:
```javascript
{ source: '/locations/brookwater', destination: '/locations/brisbane', permanent: true },
{ source: '/locations/eagle-farm', destination: '/locations/brisbane', permanent: true },
{ source: '/locations/indooroopilly', destination: '/locations/brisbane', permanent: true },
```

These redirect Google's crawled URLs to the Brisbane page which now has rich content mentioning these suburbs.

**Step 2: Commit**

```bash
git add next.config.js
git commit -m "feat: redirect 3 Brisbane suburb URLs to rich Brisbane location page"
```

---

## Task 18: Remove Noindex Headers

**Files:**
- Modify: `next.config.js` (headers section, lines 129-154)

**Step 1: Remove 6 noindex header entries**

Remove these entries from the `async headers()` section:
```javascript
// REMOVE these 6 entries:
{ source: '/locations/brookwater', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
{ source: '/locations/eagle-farm', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
{ source: '/locations/indooroopilly', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
{ source: '/locations/melbourne', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
{ source: '/locations/perth', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
{ source: '/locations/adelaide', headers: [{ key: 'X-Robots-Tag', value: 'noindex' }] },
```

Update the Group C comment to note these pages now have rich content.

**Step 2: Commit**

```bash
git add next.config.js
git commit -m "feat: remove noindex headers for 6 location pages with rich content"
```

---

## Task 19: Deploy and Verify

**Step 1: Deploy to production**

```bash
cd "C:/Disaster Recovery/Disaster-Recovery"
vercel --prod --yes
```

Expected: Build succeeds, deployed to `https://disasterrecovery.com.au`.

**Step 2: Verify Melbourne page has unique content**

```bash
curl -sk https://disasterrecovery.com.au/locations/melbourne | grep -c "603"
```

Expected: At least 1 match (Melbourne annual rainfall figure in content).

**Step 3: Verify Brisbane suburb redirects**

```bash
curl -sI https://disasterrecovery.com.au/locations/brookwater | head -5
```

Expected: `308 Permanent Redirect` to `/locations/brisbane`.

**Step 4: Verify noindex headers removed**

```bash
curl -sI https://disasterrecovery.com.au/locations/melbourne | grep -i "x-robots-tag"
```

Expected: No output (header removed).

**Step 5: Verify JSON-LD schemas**

Test via Google Rich Results Test: `https://search.google.com/test/rich-results?url=https://disasterrecovery.com.au/locations/melbourne`
Expected: 0 errors.

---

## Summary

| Task | Files | Action |
|------|-------|--------|
| 1 | `data/locations/_schema.ts` | Create Zod schema |
| 2 | `data/locations/_state-defaults.ts` | Create state fallbacks |
| 3 | `data/locations/melbourne.json` | Compile Melbourne data |
| 4 | `data/locations/perth.json` | Compile Perth data |
| 5 | `data/locations/adelaide.json` | Compile Adelaide data |
| 6 | `data/locations/brisbane.json` | Compile Brisbane data |
| 7 | `src/lib/location-content/data-loader.ts` | Create data loader |
| 8 | `src/lib/location-content/content-blocks.tsx` | Create content blocks |
| 9 | `src/lib/location-content/faq-generator.ts` | Create FAQ generator |
| 10 | `src/lib/location-content/schema-generator.ts` | Create schema generator |
| 11 | `src/lib/location-content/location-page-generator.tsx` | Create page generator |
| 12 | `src/lib/location-content/index.ts` | Create public API |
| 13 | `app/locations/melbourne/page.tsx` | Migrate to new system |
| 14 | `app/locations/perth/page.tsx` | Migrate to new system |
| 15 | `app/locations/adelaide/page.tsx` | Migrate to new system |
| 16 | `app/locations/brisbane/page.tsx` | Migrate to new system |
| 17 | `next.config.js` (redirects) | Add 3 suburb redirects |
| 18 | `next.config.js` (headers) | Remove 6 noindex headers |
| 19 | Production | Deploy + verify |
