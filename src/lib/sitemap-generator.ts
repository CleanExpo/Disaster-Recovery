import { australianCities } from './dynamic-content-generator';

export interface SitemapEntry {
  url: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://disasterrecovery.com.au';

export function generateSitemapEntries(): SitemapEntry[] {
  const entries: SitemapEntry[] = [];
  const today = new Date().toISOString().split('T')[0];

  // Core pages
  const corePages = [
    { path: '/', priority: 1.0, changefreq: 'daily' as const },
    { path: '/services', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/locations', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/knowledge', priority: 0.8, changefreq: 'weekly' as const },
    { path: '/about', priority: 0.7, changefreq: 'monthly' as const },
    { path: '/contact', priority: 0.8, changefreq: 'monthly' as const },
    { path: '/get-quote', priority: 0.9, changefreq: 'weekly' as const },
    { path: '/insurance-claims', priority: 0.8, changefreq: 'weekly' as const },
  ];

  corePages.forEach(page => {
    entries.push({
      url: `${SITE_URL}${page.path}`,
      lastmod: today,
      changefreq: page.changefreq,
      priority: page.priority
    });
  });

  // Service pages
  const services = [
    'water-damage-restoration',
    'fire-damage-restoration',
    'mould-remediation',
    'biohazard-cleanup',
    'trauma-cleanup',
    'sewage-cleanup',
    'storm-damage-restoration',
    'flood-restoration',
    'smoke-damage-restoration',
    'odour-removal',
    'asbestos-removal',
    'commercial-restoration',
    'industrial-cleaning',
    'contents-restoration',
    'structural-drying',
    'indoor-environmental-professional',
    'air-quality-testing',
    'moisture-detection',
    'thermal-imaging',
    'insurance-restoration'
  ];

  services.forEach(service => {
    entries.push({
      url: `${SITE_URL}/services/${service}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  // Location-based pages
  australianCities.forEach(location => {
    const slug = location.city.toLowerCase().replace(/\s+/g, '-');
    
    // Main city page
    entries.push({
      url: `${SITE_URL}/locations/${slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.7
    });

    // Service + location combinations
    services.slice(0, 10).forEach(service => {
      entries.push({
        url: `${SITE_URL}/${slug}/${service}`,
        lastmod: today,
        changefreq: 'monthly',
        priority: 0.6
      });
    });

    // Emergency pages
    entries.push({
      url: `${SITE_URL}/emergency/${slug}`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.8
    });
  });

  // Knowledge base pages
  const knowledgeCategories = [
    'water-damage',
    'fire-damage',
    'mould-health-risks',
    'insurance-guide',
    'restoration-process',
    'prevention-tips',
    'toxins-contamination',
    'building-materials',
    'health-safety',
    'industry-standards'
  ];

  knowledgeCategories.forEach(category => {
    entries.push({
      url: `${SITE_URL}/knowledge/${category}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6
    });
  });

  // Cost guide pages
  const costGuides = [
    'water-damage-cost',
    'fire-damage-cost',
    'mould-removal-cost',
    'flood-restoration-cost',
    'emergency-callout-fees',
    'insurance-excess-guide',
    'commercial-restoration-pricing'
  ];

  costGuides.forEach(guide => {
    entries.push({
      url: `${SITE_URL}/cost/${guide}`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6
    });
  });

  return entries;
}

export function generateSitemapXML(entries: SitemapEntry[]): string {
  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:mobile="http://www.google.com/schemas/sitemap-mobile/1.0">
${entries.map(entry => `  <url>
    <loc>${entry.url}</loc>
    <lastmod>${entry.lastmod}</lastmod>
    <changefreq>${entry.changefreq}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`).join('\n')}
</urlset>`;
  
  return xml;
}

export function generateSitemapIndex(): string {
  const today = new Date().toISOString().split('T')[0];
  
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <sitemap>
    <loc>${SITE_URL}/sitemap-main.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-locations.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-services.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
  <sitemap>
    <loc>${SITE_URL}/sitemap-knowledge.xml</loc>
    <lastmod>${today}</lastmod>
  </sitemap>
</sitemapindex>`;
}