/**
 * Resolve SEO location/service page by slug (same format as API generate-pages).
 * Used by services/[...slug] for dynamic preview pages without DB.
 */

import { generateLocationCombinations } from '@/lib/seo/locations';
import { generateSEOContent } from '@/lib/seo/content-generator';

export interface SEOPageForRender {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  state: string;
  city: string;
  suburb?: string;
  postcode: string;
  serviceType: string;
  serviceName: string;
  propertyType: string;
  businessType?: string;
  content: string;
  structuredData: string | null;
}

function buildSlug(combo: {
  location: { city: string; suburb?: string; postcode: string };
  service: { slug: string };
  propertyType: { slug: string };
  businessType?: string;
}): string {
  const { location, service, propertyType, businessType } = combo;
  const businessSegment = businessType ? `-${businessType}` : '';
  const suburbSegment = location.suburb
    ? `-${location.suburb.toLowerCase().replace(/\s+/g, '-')}`
    : '';
  return `${service.slug}-${propertyType.slug}${businessSegment}-${location.city.toLowerCase().replace(/\s+/g, '-')}${suburbSegment}-${location.postcode}`;
}

/**
 * Find an SEO page by slug (API slug format). Returns full page data including
 * generated content and structured data for rendering. Returns null if not found.
 */
export async function getSEOPagePreview(slug: string): Promise<SEOPageForRender | null> {
  const combinations = generateLocationCombinations();
  const normalizedSlug = slug.trim();
  const combo = combinations.find((c) => buildSlug(c) === normalizedSlug);
  if (!combo) return null;

  const { location, service, propertyType, businessType } = combo;
  const seoContent = await generateSEOContent(location, service, propertyType, businessType);

  return {
    id: `preview-${slug}`,
    slug: normalizedSlug,
    title: seoContent.title,
    metaDescription: seoContent.metaDescription,
    state: location.state,
    city: location.city,
    suburb: location.suburb,
    postcode: location.postcode,
    serviceType: service.slug,
    serviceName: service.name,
    propertyType: propertyType.name,
    businessType: businessType ?? undefined,
    content: seoContent.content,
    structuredData: seoContent.schemaMarkup
      ? JSON.stringify(seoContent.schemaMarkup)
      : null,
  };
}
