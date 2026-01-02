/**
 * Sitemap Generator - NRPG SEO
 *
 * Generates XML sitemap for 5,000-10,000 pages:
 * - Service pages (60+)
 * - Location pages (150+)
 * - Service + Location pages (600+)
 * - City + Service pages (5,000-10,000) - NEW PATTERN
 *
 * Critical for SEO crawlability and indexation
 */

import { MetadataRoute } from 'next';
import { internalLinking } from '@/lib/seo/internal-linking';
import { getAllCityServiceCombinations } from '@/lib/seo/city-service-generator';
import citiesData from '@/data/australian-cities.json';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://disasterrecoverynrpg.com.au';
  const currentDate = new Date();

  const sitemapStructure = internalLinking.generateSitemapStructure();

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/locations`,
      lastModified: currentDate,
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/contractors`,
      lastModified: currentDate,
      changeFrequency: 'daily',
      priority: 0.9,
    },
  ];

  const servicePages: MetadataRoute.Sitemap = sitemapStructure.services.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: currentDate,
    changeFrequency: page.changefreq as 'weekly',
    priority: page.priority,
  }));

  const locationPages: MetadataRoute.Sitemap = sitemapStructure.locations.map((page) => ({
    url: `${baseUrl}${page.url}`,
    lastModified: currentDate,
    changeFrequency: page.changefreq as 'monthly',
    priority: page.priority,
  }));

  const serviceLocationPages: MetadataRoute.Sitemap = sitemapStructure.serviceLocations.map(
    (page) => ({
      url: `${baseUrl}${page.url}`,
      lastModified: currentDate,
      changeFrequency: page.changefreq as 'monthly',
      priority: page.priority,
    })
  );

  // NEW: City overview pages (/[city])
  const cityOverviewPages: MetadataRoute.Sitemap = citiesData.cities.map((city) => ({
    url: `${baseUrl}/${city.slug}`,
    lastModified: currentDate,
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }));

  // NEW: City + Service combination pages (/[city]/[service])
  // This generates 5,000-10,000 location pages
  const cityServicePages: MetadataRoute.Sitemap = getAllCityServiceCombinations().map(
    (combo) => {
      // Determine priority based on whether it's a capital city
      const isCapital = citiesData.cities.some((c) => c.slug === combo.city);
      const priority = isCapital ? 0.7 : 0.6;

      return {
        url: `${baseUrl}/${combo.city}/${combo.service}`,
        lastModified: currentDate,
        changeFrequency: 'monthly' as const,
        priority,
      };
    }
  );

  return [
    ...staticPages,
    ...servicePages,
    ...locationPages,
    ...serviceLocationPages,
    ...cityOverviewPages,
    ...cityServicePages,
  ];
}
