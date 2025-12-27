import { MetadataRoute } from 'next';

/**
 * Robots.txt Configuration - NRPG Platform
 *
 * Optimized for Australian disaster recovery market
 * Allows search engines to crawl all public pages
 * Blocks dashboard, API, and admin areas
 */

const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || 'https://disasterrecoverynrpg.com.au';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: [
          '/dashboard/',
          '/api/',
          '/admin/',
          '/_next/',
          '/private/',
          '/internal/',
        ],
      },
      {
        userAgent: 'Googlebot',
        allow: '/',
        crawlDelay: 0, // No delay for Google
      },
      {
        userAgent: 'Googlebot-Image',
        allow: '/',
        disallow: ['/dashboard/', '/api/'],
      },
      {
        userAgent: 'Bingbot',
        allow: '/',
        crawlDelay: 0,
      },
    ],
    sitemap: `${BASE_URL}/sitemap.xml`,
    host: BASE_URL,
  };
}
