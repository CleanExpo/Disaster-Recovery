/**
 * Sitemap Generator - NRPG SEO
 *
 * Generates XML sitemap for all 800+ pages:
 * - Service pages (60+)
 * - Location pages (150+)
 * - Service + Location pages (600+)
 *
 * Critical for SEO crawlability and indexation
 */

import { MetadataRoute } from 'next';
import { internalLinking } from '@/lib/seo/internal-linking';

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

  return [...staticPages, ...servicePages, ...locationPages, ...serviceLocationPages];
}
