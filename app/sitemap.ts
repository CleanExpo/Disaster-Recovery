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
  '/guides/cost-guides/how-much-storm-damage-restoration-cost': 0.85,
  '/guides/cost-guides/how-much-fire-damage-restoration-cost': 0.85,
  '/events': 0.7,
  '/insurance-decoder': 0.7,
  '/property': 0.75,
  '/tools': 0.7,
  '/get-help': 0.8,
  '/government-funding': 0.7,
  '/whos-first': 0.8,
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
  '/mould-remediation-cairns': 'daily',
  '/mould-remediation-townsville': 'daily',
  '/mould-remediation-innisfail': 'daily',
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
    .filter(p => route.startsWith(p) && p !== '/')
    .sort((a, b) => b.length - a.length);

  return prefixes.length > 0 ? PRIORITY_MAP[prefixes[0]] : 0.5;
}

function getChangeFrequency(route: string): MetadataRoute.Sitemap[0]['changeFrequency'] {
  // Check exact match first
  if (FREQUENCY_MAP[route]) return FREQUENCY_MAP[route];

  // Check prefix matches (longest prefix wins)
  const prefixes = Object.keys(FREQUENCY_MAP)
    .filter(p => route.startsWith(p) && p !== '/')
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
    route => !EXCLUDED_PREFIXES.some(prefix => route.startsWith(prefix))
  );

  // Generate sitemap entries for static pages
  const staticEntries: MetadataRoute.Sitemap = publicRoutes.map(route => ({
    url: route === '/' ? baseUrl : `${baseUrl}${route}`,
    lastModified: currentDate,
    changeFrequency: getChangeFrequency(route),
    priority: getPriority(route),
  }));

  // Generate entries for dynamic city-service pages
  const cities = [
    'sydney', 'melbourne', 'brisbane', 'perth', 'adelaide',
    'darwin', 'hobart', 'canberra', 'newcastle', 'wollongong',
    'gold-coast', 'sunshine-coast', 'geelong', 'townsville', 'cairns',
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
