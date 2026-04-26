import { MetadataRoute } from 'next';
import fs from 'fs';
import path from 'path';
import { suburbCities, getSuburbSlugs, validServices } from '@/lib/suburb-utils';

/**
 * Recursively find all page.tsx files under a directory,
 * excluding dynamic routes (containing [param]).
 * Returns URL paths relative to the app directory.
 */
function discoverPages(dir: string, basePath = ''): string[] {
  const pages: string[] = [];

  if (!fs.existsSync(dir)) return pages;

  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    // Skip dynamic route segments, node_modules, and hidden dirs
    if (entry.name.startsWith('[') || entry.name.startsWith('.') || entry.name === 'node_modules') {
      continue;
    }

    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      pages.push(...discoverPages(fullPath, `${basePath}/${entry.name}`));
    } else if (entry.name === 'page.tsx' || entry.name === 'page.ts') {
      pages.push(basePath || '/');
    }
  }

  return pages;
}

// Directories to exclude from the public sitemap (internal/admin/auth pages)
const EXCLUDED_PREFIXES = [
  '/admin',
  '/client',
  '/client-portal',
  '/coming-soon',
  '/contractor',
  '/contractor-portal',
  '/contractors',
  '/crm',
  '/dashboard',
  '/demo',
  '/image-optimizer',
  '/investors',
  '/lighthouse-report',
  '/login',
  '/minimal',
  '/partner-portal',
  '/pitch',
  '/portal',
  '/premium-demo',
  '/preview',
  '/r6-demo',
  '/signup',
  '/simple',
  '/sitemap-page',
  '/test',
  '/workflow-demo',
  // Redirected to canonical — /events/cyclone-narelle-western-australia-2026
  '/events/cyclone-narelle-wa',
  // DR-745: near-duplicate loser pages — noindex + cross-canonical to winner, excluded from sitemap
  '/events/cyclone-maila-cape-york-fnq-2026',
  '/events/cyclone-maila-queensland-2026',
  '/events/tc-maila-recovery-2026',
  '/events/ex-cyclone-alfred-recovery',
  '/events/cyclone-alfred-queensland-2025',
  '/events/april-13-convergence-2026',
];

// Priority mapping by route prefix
const PRIORITY_MAP: Record<string, number> = {
  '/': 1,
  '/claim': 1,
  '/services/emergency': 1,
  '/emergency': 0.9,
  '/services/water-damage': 0.95,
  '/services/fire-damage': 0.95,
  '/services/mould': 0.95,
  '/services/storm': 0.95,
  '/services': 0.85,
  '/insurance': 0.85,
  '/insurance-claims': 0.9,
  '/locations': 0.8,
  '/cost': 0.8,
  '/property-types': 0.75,
  '/equipment': 0.7,
  '/guides': 0.75,
  '/faq': 0.65,
  '/case-studies': 0.65,
  '/certifications': 0.65,
  '/compare': 0.6,
  '/disasters': 0.7,
  '/industries': 0.7,
  '/technology': 0.7,
  '/operational-excellence': 0.8,
  '/about': 0.8,
  '/contact': 0.8,
  '/assessment': 0.9,
  '/standards': 0.7,
  '/resources': 0.7,
  '/book-service': 0.8,
  '/how-it-works': 0.8,
  '/blog': 0.7,
  '/for': 0.85,
  '/water-damage-restoration-sydney': 0.9,
  '/water-damage-restoration-melbourne': 0.9,
  '/fire-damage-restoration-brisbane': 0.9,
  '/flood-damage-restoration-perth': 0.9,
  '/storm-damage-restoration-gold-coast': 0.9,
  '/pricing': 0.8,
  '/knowledge': 0.7,
  '/partners': 0.7,
  '/media': 0.5,
  '/facts': 0.7,
  '/testimonials': 0.7,
  '/quote': 0.8,
  '/search': 0.3,
  '/careers': 0.5,
  '/accessibility': 0.3,
  '/disclaimer': 0.3,
  '/privacy': 0.3,
  '/terms': 0.3,
  '/cookies': 0.3,
  '/legal': 0.3,
  '/events/cyclone-maila-cape-york-fnq-2026': 1.0,
  '/guides/how-to-make-an-insurance-claim-australia': 0.9,
  '/guides/insurance-claim-rejected-what-to-do': 0.9,
  '/about/nrpg-expertise': 0.85,
  '/guides/insurance/affordability-anxiety-2026': 0.85,
  '/qld/bundaberg-flood-damage-claims': 0.9,
  '/wa/carnarvon-cyclone-narelle-claims': 0.9,
  '/nsw/liverpool-fairfield-storm-damage-claims': 0.9,
  '/vic/yarra-ranges-bushfire-damage-claims': 0.9,
  '/events/victoria-bushfires-2026': 0.9,
  '/events/victoria-bushfires-2025': 0.85,
  '/events/cyclone-alfred-queensland-2025': 0.9,
  '/events/cyclone-maila-queensland-2026': 0.9,
  '/events/tc-maila-fnq-2026': 1,
  '/events/tc-maila-recovery-2026': 1,
  '/events/april-13-convergence-2026': 1,
  '/events/cyclone-narelle-western-australia-2026': 0.9,
  '/cyclone-damage-restoration-cairns': 1,
  '/cyclone-damage-restoration-townsville': 0.95,
  '/cyclone-damage-restoration-innisfail': 0.95,
  '/cyclone-damage-restoration-mackay': 0.9,
  '/storm-damage-restoration-port-douglas': 0.95,
  '/commercial-cyclone-damage-restoration': 0.9,
  '/water-damage-restoration-brisbane': 0.95,
  '/water-damage-restoration-cairns': 0.95,
  '/water-damage-restoration-townsville': 0.9,
  '/water-damage-restoration-perth': 0.9,
  '/water-damage-restoration-adelaide': 0.9,
  '/storm-damage-restoration-brisbane': 0.9,
  '/storm-damage-restoration-sydney': 0.9,
  '/storm-damage-restoration-melbourne': 0.9,
  '/fire-damage-restoration-sydney': 0.9,
  '/fire-damage-restoration-melbourne': 0.9,
  '/guides/insurance/arpc-cyclone-reinsurance-pool': 0.95,
  '/cyclone-water-damage-restoration-darwin': 0.9,
  '/storm-water-damage-restoration-sunshine-coast': 0.9,
  '/cyclone-damage-restoration-rockhampton': 0.9,
  '/storm-damage-restoration-perth': 0.9,
  '/fire-damage-restoration-perth': 0.9,
  '/storm-damage-restoration-cairns': 0.95,
  '/mould-remediation-brisbane': 0.9,
  '/mould-remediation-sydney': 0.9,
  '/mould-remediation-melbourne': 0.9,
  '/mould-remediation-gold-coast': 0.9,
  '/mould-remediation-cairns': 0.95,
  '/mould-remediation-townsville': 0.95,
  '/mould-remediation-innisfail': 0.95,
  '/mould-remediation-sunshine-coast': 0.9,
  '/mould-remediation-perth': 0.85,
  '/fire-damage-restoration-gold-coast': 0.9,
  '/flood-damage-restoration-brisbane': 0.9,
  '/flood-damage-restoration-sydney': 0.9,
  '/flood-damage-restoration-melbourne': 0.9,
  '/storm-damage-restoration-adelaide': 0.85,
  '/water-damage-restoration-gold-coast': 0.9,
  '/flood-damage-restoration-gold-coast': 0.9,
  '/water-damage-restoration-sunshine-coast': 0.9,
  '/mould-remediation-adelaide': 0.85,
  '/mould-remediation-darwin': 0.9,
  '/storm-damage-restoration-townsville': 0.9,
  '/storm-damage-restoration-hobart': 0.75,
  '/fire-damage-restoration-adelaide': 0.85,
  '/fire-damage-restoration-cairns': 0.9,
  '/storm-damage-restoration-newcastle': 0.8,
  '/storm-damage-restoration-wollongong': 0.8,
  '/water-damage-restoration-darwin': 0.85,
  '/flood-damage-restoration-adelaide': 0.85,
  '/mould-remediation-hobart': 0.7,
  '/water-damage-restoration-hobart': 0.75,
  '/water-damage-restoration-newcastle': 0.8,
  '/water-damage-restoration-wollongong': 0.8,
  '/storm-damage-restoration-darwin': 0.85,
  '/fire-damage-restoration-townsville': 0.85,
  '/flood-damage-restoration-newcastle': 0.8,
  '/flood-damage-restoration-wollongong': 0.8,
  '/mould-remediation-newcastle': 0.75,
  '/mould-remediation-wollongong': 0.75,
  '/storm-damage-restoration-canberra': 0.75,
  '/water-damage-restoration-canberra': 0.75,
  '/mould-remediation-canberra': 0.7,
  '/fire-damage-restoration-hobart': 0.7,
  '/flood-damage-restoration-hobart': 0.7,
  '/storm-damage-restoration-geelong': 0.75,
  '/water-damage-restoration-geelong': 0.75,
  '/mould-remediation-geelong': 0.7,
  '/flood-damage-restoration-geelong': 0.7,
  '/fire-damage-restoration-sunshine-coast': 0.85,
  '/flood-damage-restoration-sunshine-coast': 0.85,
  '/fire-damage-restoration-newcastle': 0.75,
  '/fire-damage-restoration-wollongong': 0.75,
  '/flood-damage-restoration-darwin': 0.85,
  '/fire-damage-restoration-darwin': 0.8,
  '/fire-damage-restoration-geelong': 0.75,
  '/storm-damage-restoration-sunshine-coast': 0.85,
  '/flood-damage-restoration-canberra': 0.7,
  '/fire-damage-restoration-canberra': 0.75,
  '/guides/cost-guides/how-much-storm-damage-restoration-cost': 0.85,
  '/guides/cost-guides/how-much-fire-damage-restoration-cost': 0.85,
  '/guides/property/rental-property-water-damage': 0.75,
  '/guides/property/strata-water-damage': 0.75,
  '/guides/property/heritage-building-restoration': 0.75,
  '/guides/property/investment-property-disaster-recovery': 0.75,
  '/guides/cost-guides/how-much-mould-remediation-cost': 0.85,
  '/guides/cost-guides/how-much-flood-damage-restoration-cost': 0.85,
  '/guides/services/structural-drying-process': 0.75,
  '/guides/services/mould-testing-air-quality': 0.75,
  '/guides/services/water-extraction-emergency-response': 0.8,
  '/guides/insurance/fire-damage-insurance-claim-process': 0.8,
  '/guides/insurance/total-loss-vs-partial-loss-insurance': 0.8,
  '/guides/insurance/insurance-approved-vs-preferred-contractor': 0.8,
  '/guides/commercial/aged-care-facility-water-damage': 0.75,
  '/guides/commercial/school-university-flood-damage': 0.75,
  '/guides/commercial/strata-building-water-damage': 0.75,
  '/guides/emergency/burst-pipe-emergency-steps': 0.8,
  '/guides/emergency/storm-damage-emergency-checklist': 0.8,
  '/guides/emergency/cyclone-preparation-checklist': 0.85,
  '/cyclone-damage-restoration-broome': 0.85,
  '/cyclone-damage-restoration-exmouth': 0.9,
  '/cyclone-damage-restoration-carnarvon': 0.85,
  '/water-damage-restoration-mackay': 0.85,
  '/mould-remediation-mackay': 0.9,
  '/storm-damage-restoration-mackay': 0.9,
  '/flood-damage-restoration-mackay': 0.85,
  '/water-damage-restoration-rockhampton': 0.8,
  '/mould-remediation-rockhampton': 0.8,
  '/storm-damage-restoration-rockhampton': 0.8,
  '/flood-damage-restoration-rockhampton': 0.85,
  '/flood-damage-restoration-cairns': 0.9,
  '/flood-damage-restoration-townsville': 0.9,
  '/fire-damage-restoration-innisfail': 0.9,
  '/fire-damage-restoration-mackay': 0.85,
  '/guides/insurance/underinsurance-australia': 0.8,
  '/guides/insurance/contents-insurance-disaster-claims': 0.75,
  '/guides/insurance/temporary-accommodation-insurance': 0.75,
  '/guides/locations/cairns/cairns-cyclone-mould-response': 0.85,
  '/guides/locations/cairns/cairns-tc-maila-recovery': 1.0,
  '/guides/locations/port-douglas/port-douglas-tc-maila-recovery': 0.95,
  '/guides/locations/innisfail/innisfail-tc-maila-recovery': 0.95,
  '/guides/locations/darwin/darwin-wet-season-water-damage': 0.8,
  '/guides/locations/perth/perth-summer-storm-damage': 0.75,
  '/guides/locations/townsville/townsville-tc-maila-recovery': 0.9,
  '/guides/locations/mackay/mackay-tc-maila-recovery': 0.85,
  '/guides/fire-smoke/smoke-odour-removal-methods': 0.75,
  '/cyclone-damage-restoration-port-hedland': 0.85,
  '/cyclone-damage-restoration-karratha': 0.85,
  '/fire-damage-restoration-rockhampton': 0.8,
  '/guides/locations/gold-coast/gold-coast-storm-flooding': 0.8,
  '/guides/mould/mould-health-effects-australia': 0.8,
  '/guides/water-damage/subfloor-drying-moisture-management': 0.75,
  '/guides/emergency-guides/what-to-do-after-fire-damage': 0.8,
  '/guides/emergency-guides/what-to-do-after-cyclone': 0.85,
  '/guides/emergency-guides/what-to-do-after-mould-discovery': 0.75,
  '/guides/emergency-guides/what-to-do-after-flood-damage': 0.8,
  '/guides/emergency-guides/who-to-call-water-damage-emergency': 0.8,
  '/guides/professional/how-to-choose-restoration-company': 0.8,
  '/guides/professional/builder-vs-restorer-difference': 0.75,
  '/guides/professional/nrp-best-practices-guide': 0.75,
  '/guides/professional/restoration-timeline-expectations': 0.75,
  '/guides/professional/contents-pack-out-when-needed': 0.75,
  '/water-damage-restoration-toowoomba': 0.8,
  '/water-damage-restoration-ipswich': 0.8,
  '/water-damage-restoration-hervey-bay': 0.75,
  '/water-damage-restoration-ballarat': 0.75,
  '/water-damage-restoration-bendigo': 0.75,
  '/water-damage-restoration-penrith': 0.8,
  '/guides/emergency-guides/what-to-do-after-storm-damage': 0.8,
  '/events': 0.7,
  '/insurance-decoder': 0.7,
  '/property': 0.75,
  '/tools': 0.7,
  '/get-help': 0.8,
  '/government-funding': 0.7,
  '/whos-first': 0.8,
  // State hub pages — DR-608
  '/qld': 0.95,
  '/nsw': 0.9,
  '/vic': 0.85,
  '/wa': 0.85,
  '/sa': 0.8,
  // IICRC authority pages — DR-608
  '/standards/iicrc-s500-water-damage': 0.85,
  '/standards/iicrc-s520-mold-remediation': 0.85,
  '/standards/iicrc-s700-fire-smoke': 0.85,
};

// Change frequency mapping by route prefix
const FREQUENCY_MAP: Record<string, MetadataRoute.Sitemap[0]['changeFrequency']> = {
  '/': 'daily',
  '/claim': 'daily',
  '/emergency': 'daily',
  '/services/emergency': 'daily',
  '/events/tc-maila-fnq-2026': 'daily',
  '/events/tc-maila-recovery-2026': 'daily',
  '/events/april-13-convergence-2026': 'daily',
  '/cyclone-damage-restoration-cairns': 'daily',
  '/cyclone-damage-restoration-townsville': 'weekly',
  '/cyclone-damage-restoration-innisfail': 'weekly',
  '/cyclone-damage-restoration-mackay': 'weekly',
  '/guides/insurance/arpc-cyclone-reinsurance-pool': 'weekly',
  '/services': 'weekly',
  '/locations': 'weekly',
  '/cost': 'weekly',
  '/insurance': 'weekly',
  '/property-types': 'monthly',
  '/equipment': 'monthly',
  '/guides': 'weekly',
  '/faq': 'monthly',
  '/case-studies': 'yearly',
  '/certifications': 'monthly',
  '/compare': 'monthly',
  '/disasters': 'monthly',
  '/industries': 'monthly',
  '/technology': 'monthly',
  '/operational-excellence': 'monthly',
  '/standards': 'monthly',
  '/resources': 'monthly',
  '/pricing': 'weekly',
  '/knowledge': 'monthly',
  '/partners': 'monthly',
  '/how-it-works': 'monthly',
  '/blog': 'weekly',
  '/accessibility': 'yearly',
  '/disclaimer': 'yearly',
  '/privacy': 'yearly',
  '/terms': 'yearly',
  '/cookies': 'yearly',
  '/legal': 'yearly',
  '/events/cyclone-maila-cape-york-fnq-2026': 'daily',
  '/qld/bundaberg-flood-damage-claims': 'weekly',
  '/wa/carnarvon-cyclone-narelle-claims': 'weekly',
  '/nsw/liverpool-fairfield-storm-damage-claims': 'weekly',
  '/vic/yarra-ranges-bushfire-damage-claims': 'weekly',
  '/guides/how-to-make-an-insurance-claim-australia': 'weekly',
  '/guides/insurance-claim-rejected-what-to-do': 'weekly',
  '/about/nrpg-expertise': 'monthly',
  '/guides/insurance/affordability-anxiety-2026': 'monthly',
  '/events/victoria-bushfires-2026': 'daily',
  '/events/victoria-bushfires-2025': 'weekly',
  '/events/cyclone-alfred-queensland-2025': 'weekly',
  '/events/cyclone-maila-queensland-2026': 'daily',
  '/events/cyclone-narelle-western-australia-2026': 'daily',
  '/events': 'weekly',
  '/insurance-decoder': 'monthly',
  '/property': 'monthly',
  '/tools': 'monthly',
  '/get-help': 'weekly',
  '/government-funding': 'monthly',
  '/whos-first': 'weekly',
  // State hub pages — DR-608
  '/qld': 'daily',
  '/nsw': 'weekly',
  '/vic': 'weekly',
  '/wa': 'weekly',
  '/sa': 'monthly',
  // IICRC authority pages — DR-608
  '/standards/iicrc-s500-water-damage': 'monthly',
  '/standards/iicrc-s520-mold-remediation': 'monthly',
  '/standards/iicrc-s700-fire-smoke': 'monthly',
  '/flood-damage-restoration-cairns': 'daily',
  '/flood-damage-restoration-townsville': 'daily',
  '/guides/locations/cairns/cairns-tc-maila-recovery': 'daily',
  '/guides/locations/port-douglas/port-douglas-tc-maila-recovery': 'daily',
  '/guides/locations/innisfail/innisfail-tc-maila-recovery': 'daily',
  '/guides/locations/townsville/townsville-tc-maila-recovery': 'daily',
  '/guides/locations/mackay/mackay-tc-maila-recovery': 'daily',
  '/guides/emergency-guides/what-to-do-after-cyclone': 'weekly',
  '/fire-damage-restoration-innisfail': 'daily',
  '/fire-damage-restoration-mackay': 'weekly',
  '/mould-remediation-cairns': 'daily',
  '/mould-remediation-townsville': 'daily',
  '/mould-remediation-innisfail': 'daily',
  '/cyclone-damage-restoration-broome': 'weekly',
  '/cyclone-damage-restoration-exmouth': 'weekly',
  '/cyclone-damage-restoration-carnarvon': 'weekly',
  '/mould-remediation-mackay': 'daily',
  '/storm-damage-restoration-mackay': 'daily',
  '/mould-remediation-rockhampton': 'weekly',
  '/guides/emergency/cyclone-preparation-checklist': 'weekly',
  '/guides/emergency/burst-pipe-emergency-steps': 'monthly',
  '/guides/emergency/storm-damage-emergency-checklist': 'monthly',
  '/mould-remediation-gold-coast': 'weekly',
  '/mould-remediation-sunshine-coast': 'weekly',
  '/mould-remediation-brisbane': 'weekly',
  '/mould-remediation-sydney': 'monthly',
  '/mould-remediation-melbourne': 'monthly',
  '/mould-remediation-perth': 'monthly',
  '/fire-damage-restoration-gold-coast': 'weekly',
  '/flood-damage-restoration-brisbane': 'weekly',
  '/flood-damage-restoration-sydney': 'monthly',
  '/flood-damage-restoration-melbourne': 'monthly',
  '/storm-damage-restoration-adelaide': 'monthly',
  '/water-damage-restoration-gold-coast': 'weekly',
};

function getPriority(route: string): number {
  // Check exact match first
  if (PRIORITY_MAP[route] !== undefined) return PRIORITY_MAP[route];

  // Check prefix matches (longest prefix wins)
  const prefixes = Object.keys(PRIORITY_MAP)
    .filter((p) => route.startsWith(p) && p !== '/')
    .sort((a, b) => b.length - a.length);

  return prefixes.length > 0 ? PRIORITY_MAP[prefixes[0]] : 0.5;
}

function getChangeFrequency(route: string): MetadataRoute.Sitemap[0]['changeFrequency'] {
  // Check exact match first
  if (FREQUENCY_MAP[route]) return FREQUENCY_MAP[route];

  // Check prefix matches (longest prefix wins)
  const prefixes = Object.keys(FREQUENCY_MAP)
    .filter((p) => route.startsWith(p) && p !== '/')
    .sort((a, b) => b.length - a.length);

  return prefixes.length > 0 ? FREQUENCY_MAP[prefixes[0]] : 'weekly';
}

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://disasterrecovery.com.au';
  const currentDate = new Date().toISOString();

  // Discover all static pages from the app directory
  const appDir = path.join(process.cwd(), 'app');
  const allRoutes = discoverPages(appDir);

  // Filter out excluded routes
  const publicRoutes = allRoutes.filter(
    (route) => !EXCLUDED_PREFIXES.some((prefix) => route.startsWith(prefix)),
  );

  // Generate sitemap entries for static pages
  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map((route) => ({
    url: route === '/' ? baseUrl : `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: getChangeFrequency(route),
    priority: getPriority(route),
  }));

  // Generate entries for dynamic city-service pages
  const cities = [
    'sydney',
    'melbourne',
    'brisbane',
    'perth',
    'adelaide',
    'darwin',
    'hobart',
    'canberra',
    'newcastle',
    'wollongong',
    'gold-coast',
    'sunshine-coast',
    'geelong',
    'townsville',
    'cairns',
  ];
  const cityServiceEntries: MetadataRoute.Sitemap = [];
  for (const city of cities) {
    for (const service of validServices) {
      cityServiceEntries.push({
        url: `${baseUrl}/locations/${city}/${service}`,
        lastModified: currentDate,
        changeFrequency: 'weekly',
        priority: 0.8,
      });
    }
  }

  // Generate entries for dynamic suburb-service pages
  const suburbServiceEntries: MetadataRoute.Sitemap = [];
  for (const city of suburbCities) {
    const suburbs = getSuburbSlugs(city);
    for (const suburb of suburbs) {
      for (const service of validServices) {
        suburbServiceEntries.push({
          url: `${baseUrl}/locations/${city}/${suburb}/${service}`,
          lastModified: currentDate,
          changeFrequency: 'weekly',
          priority: 0.75,
        });
      }
    }
  }

  return [...staticEntries, ...cityServiceEntries, ...suburbServiceEntries];
}
