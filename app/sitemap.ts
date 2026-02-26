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
  '/guides': 0.7,
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
  '/careers': 0.5,
  '/accessibility': 0.3,
  '/disclaimer': 0.3,
  '/privacy': 0.3,
  '/terms': 0.3,
  '/cookies': 0.3,
  '/legal': 0.3,
};

// Change frequency mapping by route prefix
const FREQUENCY_MAP: Record<string, MetadataRoute.Sitemap[0]['changeFrequency']> = {
  '/': 'daily',
  '/claim': 'daily',
  '/emergency': 'daily',
  '/services/emergency': 'daily',
  '/services': 'weekly',
  '/locations': 'weekly',
  '/cost': 'weekly',
  '/insurance': 'weekly',
  '/property-types': 'monthly',
  '/equipment': 'monthly',
  '/guides': 'monthly',
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
  '/how-it-works': 'monthly',
  '/blog': 'weekly',
  '/accessibility': 'yearly',
  '/disclaimer': 'yearly',
  '/privacy': 'yearly',
  '/terms': 'yearly',
  '/cookies': 'yearly',
  '/legal': 'yearly',
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
