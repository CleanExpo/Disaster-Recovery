import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = 'https://disasterrecovery.com.au';
  const currentDate = new Date().toISOString();

  // Main pages
  const mainPages = [
    {
      url: baseUrl,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/about`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.8,
    },
    {
      url: `${baseUrl}/get-quote`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // Service pages with high priority for SEO
  const servicePages = [
    {
      url: `${baseUrl}/services/water-damage`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/fire-damage`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/mold-remediation`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/emergency-response`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/services/biohazard-cleanup`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/storm-damage`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.95,
    },
    {
      url: `${baseUrl}/services/commercial`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
    {
      url: `${baseUrl}/services/structural-drying`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.9,
    },
  ];

  // Emergency pages
  const emergencyPages = [
    {
      url: `${baseUrl}/emergency`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
    {
      url: `${baseUrl}/emergency/24-7`,
      lastModified: currentDate,
      changeFrequency: 'daily' as const,
      priority: 1,
    },
  ];

  // Contractor pages
  const contractorPages = [
    {
      url: `${baseUrl}/contractor/login`,
      lastModified: currentDate,
      changeFrequency: 'monthly' as const,
      priority: 0.6,
    },
    {
      url: `${baseUrl}/contractor/dashboard`,
      lastModified: currentDate,
      changeFrequency: 'weekly' as const,
      priority: 0.5,
    },
  ];

  // Combine all pages
  return [
    ...mainPages,
    ...servicePages,
    ...emergencyPages,
    ...contractorPages,
  ];
}