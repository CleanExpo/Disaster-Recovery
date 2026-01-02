# SEO Location Page System

## Overview

The NRPG platform implements a comprehensive location-based SEO strategy generating **5,000-10,000 unique pages** targeting local disaster recovery searches across Australia.

## URL Structure

### Primary Pattern: /[city]/[service]

```
/sydney/water-damage
/melbourne/fire-restoration
/brisbane/mold-remediation
/bondi/flood-cleanup
/south-yarra/storm-damage
```

### Secondary Pattern: /[city]

```
/sydney
/melbourne
/brisbane
```

## Page Count Breakdown

| Page Type | Count | Strategy | Revalidation |
|-----------|-------|----------|--------------|
| Capital Cities × Services | 400 | Static | N/A |
| Major Suburbs × Services | 5,000+ | ISR | 7 days |
| City Overview Pages | 130+ | Static | N/A |
| **Total** | **5,500+** | **Hybrid** | **Mixed** |

## Geographic Coverage

### Capital Cities (8)
- Sydney, NSW
- Melbourne, VIC
- Brisbane, QLD
- Perth, WA
- Adelaide, SA
- Canberra, ACT
- Darwin, NT
- Hobart, TAS

### Major Suburbs (100+)

#### Sydney Suburbs (30+)
- **North Shore**: Chatswood, North Sydney, Mosman, Hornsby, Manly
- **Eastern**: Bondi, Randwick, Coogee, Maroubra, Paddington
- **Western**: Parramatta, Penrith, Liverpool, Blacktown, Castle Hill
- **Southern**: Sutherland, Cronulla, Hurstville, Bankstown
- **Inner West**: Newtown, Marrickville, Leichhardt, Ashfield

#### Melbourne Suburbs (20+)
- South Yarra, Richmond, St Kilda, Brighton, Carlton
- Fitzroy, Brunswick, Footscray, Box Hill, Glen Waverley
- Doncaster, Ringwood, Frankston, Dandenong, Geelong

#### Brisbane Suburbs (18+)
- Fortitude Valley, South Bank, West End, Kangaroo Point
- New Farm, Paddington, Toowong, Chermside, Carindale
- Sunnybank, Logan, Ipswich, Redcliffe, Caboolture

#### Perth Suburbs (10+)
- Fremantle, Joondalup, Mandurah, Rockingham, Armadale
- Midland, Subiaco, Nedlands, Cottesloe, Scarborough

#### Adelaide Suburbs (10+)
- Glenelg, North Adelaide, Norwood, Unley, Mitcham
- Marion, Salisbury, Elizabeth, Port Adelaide, Brighton

## Service Coverage (50+)

### Water & Flood Damage
- Water Damage Restoration
- Flood Cleanup
- Burst Pipe Repair
- Basement Flooding
- Ceiling Leak Repair

### Fire & Smoke Damage
- Fire Restoration
- Smoke Damage Cleanup
- Soot Removal

### Mold Remediation
- Mold Removal
- Mold Inspection
- Mold Prevention

### Storm Damage
- Storm Damage Repair
- Wind Damage
- Hail Damage

### Sewage & Biohazard
- Sewage Cleanup
- Biohazard Cleanup
- Trauma Cleanup

## Technical Implementation

### File Structure

```
app/
├── [city]/
│   ├── page.tsx                 # City overview
│   └── [service]/
│       └── page.tsx             # City + Service page
├── sitemap.ts                   # Dynamic sitemap generation
lib/
└── seo/
    ├── city-service-generator.ts # Page data generation
    ├── schema-generator.ts       # Schema.org markup
    └── internal-linking.ts       # Link structure
```

### Generation Strategy

#### Static Generation (Build Time)
- **Capital Cities**: 8 cities × 50 services = 400 pages
- **Build Time**: ~4 minutes
- **Use Case**: High-traffic, competitive markets

```typescript
export async function generateStaticParams() {
  const capitalCities = ['sydney', 'melbourne', 'brisbane', ...];
  const services = ['water-damage', 'fire-restoration', ...];

  // Generate all combinations
  return capitalCities.flatMap(city =>
    services.map(service => ({ city, service }))
  );
}
```

#### ISR (On-Demand Generation)
- **Suburbs**: 100+ suburbs × 50 services = 5,000+ pages
- **Revalidation**: 7 days (604,800 seconds)
- **Use Case**: Long-tail, lower-traffic locations

```typescript
export const revalidate = 604800; // 7 days
export const dynamicParams = true;
```

### SEO Optimization

#### Metadata Generation

Each page includes:

```typescript
export async function generateMetadata({ params }): Promise<Metadata> {
  return {
    title: "Water Damage Sydney | 24/7 Emergency Response | NRPG",
    description: "Expert water damage restoration in Sydney...",
    keywords: ["water damage sydney", "emergency water extraction", ...],
    alternates: { canonical: "/sydney/water-damage" },
    openGraph: { ... },
    twitter: { ... },
    robots: {
      index: true,
      follow: true,
      googleBot: { index: true, follow: true }
    }
  };
}
```

#### Schema.org Markup

Every page includes:
- **LocalBusiness Schema** - Local pack optimization
- **Service Schema** - Service-specific markup
- **FAQ Schema** - Rich snippet eligibility
- **Breadcrumb Schema** - Navigation context

```typescript
const schemas = [
  schemaGenerator.generateLocalBusinessSchema({
    city: "Sydney",
    state: "NSW",
    latitude: -33.8688,
    longitude: 151.2093,
    serviceRadius: 50,
  }),
  schemaGenerator.generateServiceSchema({
    name: "Water Damage Restoration - Sydney",
    description: "...",
    serviceType: "Emergency Restoration",
  }),
  schemaGenerator.generateFAQSchema(faqs),
  schemaGenerator.generateBreadcrumbSchema(breadcrumbs),
];
```

#### Internal Linking

Each page includes:
- **Related Services** - Same city, different services
- **Nearby Locations** - Same service, nearby cities/suburbs
- **Breadcrumb Navigation** - Hierarchical context
- **Footer Links** - Sitewide distribution

### Performance Optimization

#### Image Optimization
```typescript
<Image
  src={`/images/services/${service}-hero.jpg`}
  alt="..."
  fill
  priority
  sizes="(max-width: 768px) 100vw, 50vw"
/>
```

#### Lazy Loading
```typescript
<Suspense fallback={<LoadingSkeleton />}>
  <ServiceComponent />
</Suspense>
```

#### Critical CSS
- Above-the-fold CSS inlined
- Non-critical CSS deferred
- Tailwind JIT for minimal bundle size

## Content Strategy

### Page Components

Every city+service page includes:

1. **Hero Section**
   - H1: "{Service} in {City}, {State}"
   - Location badge with city/state
   - Emergency CTA with phone number
   - Trust signals (response time, certifications)

2. **Local Statistics**
   - Annual flood events
   - Storm frequency
   - Fire incidents
   - Humidity levels

3. **Service Process**
   - 6-step IICRC protocol
   - Detailed descriptions
   - Visual process flow

4. **Local Contractors CTA**
   - Verification highlights
   - 24/7 availability
   - Insurance acceptance

5. **FAQ Section**
   - 5-7 location-specific FAQs
   - Schema.org markup for rich snippets

6. **Related Services**
   - 3-6 other services in same city
   - Internal link optimization

7. **Nearby Locations**
   - 8 nearby suburbs/cities
   - Geographic link distribution

8. **Final CTA**
   - Emergency phone number
   - Population served
   - Service area coverage

### Content Personalization

Content is dynamically personalized based on:

- **City Statistics**: Flood-prone areas prioritize water damage content
- **Climate Data**: High humidity areas prioritize mold content
- **Population Density**: Metro vs. suburban response times
- **Service History**: High-demand services featured prominently

## SEO Performance Metrics

### Target KPIs

| Metric | Target | Current |
|--------|--------|---------|
| Indexed Pages | 5,000+ | TBD |
| Avg. Page Rank | Top 10 | TBD |
| Organic Traffic | 50,000+/mo | TBD |
| Local Pack Appearances | 500+ | TBD |
| Click-Through Rate | 3.5%+ | TBD |
| Bounce Rate | <45% | TBD |
| Avg. Session Duration | 2:30+ | TBD |

### Keyword Strategy

#### Primary Keywords (5,000+)
```
{service} {city}
{city} {service}
emergency {service} {city}
```

Examples:
- water damage sydney
- melbourne fire restoration
- brisbane mold removal

#### Long-Tail Keywords (20,000+)
```
{service} near me in {city}
{service} {suburb} {state}
24/7 {service} {city}
emergency {service} {suburb}
```

### Ranking Strategy

#### 1. High-Competition Markets (Capitals)
- Static generation for instant indexing
- Premium content (2,000+ words)
- Multiple schema types
- Extensive internal linking
- High-authority backlinks

#### 2. Medium-Competition Markets (Major Suburbs)
- ISR generation for efficiency
- Quality content (1,200+ words)
- Standard schema markup
- Targeted internal linking
- Local directory citations

#### 3. Low-Competition Markets (Regional)
- On-demand generation
- Focused content (800+ words)
- Essential schema markup
- Basic internal linking
- NAP consistency

## Local SEO Features

### NAP Consistency
- Business name standardized across all pages
- Local phone numbers for each region
- Structured address data in schema

### Google Business Profile Integration
- GBP listings for each major location
- Service area targeting
- Review schema markup
- Photo optimization

### Local Citations
- Automated citation building
- Directory submissions
- Industry-specific listings
- Local chamber of commerce

## Monitoring & Maintenance

### Weekly Tasks
- Monitor ISR cache hit rates
- Review error logs for 404s
- Check indexation status
- Analyze page performance

### Monthly Tasks
- Update local statistics
- Refresh seasonal content
- Audit internal links
- Review competitor rankings

### Quarterly Tasks
- Expand suburb coverage
- Add new services
- Update schema markup
- Comprehensive SEO audit

## Expansion Strategy

### Phase 1: Current (Complete)
- ✅ 8 capital cities
- ✅ 100+ major suburbs
- ✅ 50+ services
- ✅ 5,500+ pages

### Phase 2: Regional Expansion (Q1 2026)
- Regional cities (50+)
- Small towns (100+)
- 10,000+ total pages

### Phase 3: Micro-Targeting (Q2 2026)
- Neighborhood-level pages
- Hyper-local content
- 20,000+ total pages

### Phase 4: Dynamic Content (Q3 2026)
- Real-time incident data
- Weather-based prioritization
- AI-generated updates

## Analytics & Reporting

### Metrics Tracked

```typescript
// Per-page metrics
- Organic impressions
- Click-through rate
- Average position
- Bounce rate
- Time on page
- Conversion rate

// Aggregate metrics
- Total indexed pages
- Geographic coverage
- Service coverage
- Keyword rankings
- Traffic by city
- Traffic by service
```

### Reporting Dashboard

- Real-time indexation status
- Ranking distribution charts
- Traffic heat maps by location
- Conversion funnel analysis
- Competitive position tracking

## Technical Specifications

### Page Load Performance

| Metric | Target | Strategy |
|--------|--------|----------|
| First Contentful Paint | <1.5s | Critical CSS, preload |
| Largest Contentful Paint | <2.5s | Image optimization |
| Cumulative Layout Shift | <0.1 | Reserved space |
| Time to Interactive | <3.5s | Code splitting |
| Total Blocking Time | <300ms | Defer non-critical JS |

### Accessibility

- ✅ WCAG 2.1 AA compliance
- ✅ Semantic HTML5 structure
- ✅ ARIA landmarks and labels
- ✅ Keyboard navigation
- ✅ Screen reader optimization

### Mobile Optimization

- ✅ Mobile-first design
- ✅ Responsive images
- ✅ Touch-friendly CTAs (min 44×44px)
- ✅ Viewport meta tag
- ✅ Fast mobile load times

## Maintenance Scripts

### Generate Statistics

```bash
npx tsx scripts/seo-page-stats.ts
```

### Validate Pages

```bash
npx tsx scripts/validate-seo-pages.ts
```

### Test Generation

```bash
npm run dev
# Visit http://localhost:3000/sydney/water-damage
# Visit http://localhost:3000/bondi/fire-restoration
```

## Troubleshooting

### Common Issues

#### 404 Errors
- Check city slug matches data file
- Verify service slug normalization
- Review generateStaticParams output

#### Missing Metadata
- Confirm city data exists
- Check service data structure
- Validate schema generation

#### Slow Page Load
- Enable ISR instead of SSR
- Optimize images (WebP format)
- Reduce JavaScript bundle size

## Support

For questions or issues:
- Review `/docs/SEO_LOCATION_PAGES.md`
- Check `/scripts/seo-page-stats.ts`
- Contact SEO team: seo@nrpg.com.au
