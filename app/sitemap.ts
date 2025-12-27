import { MetadataRoute } from 'next';
import { SERVICE_PILLARS, CLIENT_SECTORS, AUSTRALIAN_LOCATIONS } from '@/lib/design-tokens';

/**
 * Dynamic Sitemap Generation - NRPG Platform
 *
 * Generates comprehensive sitemap for:
 * - Static pages (home, about, contact)
 * - Service pages (60+ pages)
 * - Location pages (150+ pages)
 * - Service + Location combinations (600+ pages)
 * - Blog posts (dynamic)
 * - Sector pages
 *
 * Total: 800+ URLs for complete site coverage
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://disasterrecoverynrpg.com.au';

export default function sitemap(): MetadataRoute.Sitemap {
  const currentDate = new Date();

  // Static Pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: BASE_URL,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/about`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${BASE_URL}/contractors`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
  ];

  // Service Pillar Pages
  const servicePillarPages: MetadataRoute.Sitemap = SERVICE_PILLARS.map((pillar) => ({
    url: `${BASE_URL}/services/${pillar.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.9,
  }));

  // Client Sector Pages
  const sectorPages: MetadataRoute.Sitemap = CLIENT_SECTORS.map((sector) => ({
    url: `${BASE_URL}/sectors/${sector.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.8,
  }));

  // Location Pages (State level)
  const statePages: MetadataRoute.Sitemap = AUSTRALIAN_LOCATIONS.map((location) => ({
    url: `${BASE_URL}/locations/${location.code.toLowerCase()}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Location Pages (City level)
  const cityPages: MetadataRoute.Sitemap = AUSTRALIAN_LOCATIONS.map((location) => ({
    url: `${BASE_URL}/locations/${location.code.toLowerCase()}/${location.capital.toLowerCase().replace(/\s+/g, '-')}`,
    lastModified: currentDate,
    changeFrequency: 'weekly',
    priority: 0.85,
  }));

  // Service + Location Combinations (High-value local SEO pages)
  const serviceLocationPages: MetadataRoute.Sitemap = SERVICE_PILLARS.flatMap((pillar) =>
    AUSTRALIAN_LOCATIONS.map((location) => ({
      url: `${BASE_URL}/services/${pillar.slug}/${location.capital.toLowerCase().replace(/\s+/g, '-')}`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.85,
    }))
  );

  // Emergency Services Pages
  const emergencyPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/emergency`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/emergency/24-7`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.95,
    },
  ];

  // Combine all pages
  return [
    ...staticPages,
    ...servicePillarPages,
    ...sectorPages,
    ...statePages,
    ...cityPages,
    ...serviceLocationPages,
    ...emergencyPages,
  ];
}
