/**
 * Location Content Fetcher
 * Fetches Sanity CMS content for SEO pages with fallback to defaults
 */

import { getClient } from '@/lib/sanity.client';

// Types
export interface LocationContent {
  headline?: string;
  subheadline?: string;
  localDescription?: string;
  localExpertise?: string[];
  localStats?: {
    contractorsInArea?: number;
    jobsCompleted?: number;
    averageResponseMins?: number;
    satisfactionRate?: number;
  };
  faqs?: Array<{ question: string; answer: string }>;
  testimonials?: Array<{
    quote: string;
    author: string;
    suburb?: string;
    service?: string;
    rating?: number;
    date?: string;
  }>;
  metaTitle?: string;
  metaDescription?: string;
  keywords?: string[];
  heroImage?: {
    asset: { url: string };
    alt?: string;
  };
}

// GROQ Queries
const LOCATION_CONTENT_PROJECTION = `{
  headline,
  subheadline,
  localDescription,
  localExpertise,
  localStats,
  faqs[] { question, answer },
  testimonials[] { quote, author, suburb, service, rating, date },
  metaTitle,
  metaDescription,
  keywords,
  heroImage { asset->{ url }, alt }
}`;

/**
 * Get content for a city page
 */
export async function getCityContent(
  citySlug: string,
  preview = false
): Promise<LocationContent | null> {
  const client = getClient(preview);

  const query = `*[
    _type == "locationContent" &&
    locationType == "city" &&
    citySlug.current == $citySlug &&
    !defined(service) &&
    !(_id in path("drafts.**"))
  ][0] ${LOCATION_CONTENT_PROJECTION}`;

  return client.fetch(query, { citySlug });
}

/**
 * Get content for a suburb page
 */
export async function getSuburbContent(
  citySlug: string,
  suburbSlug: string,
  preview = false
): Promise<LocationContent | null> {
  const client = getClient(preview);

  const query = `*[
    _type == "locationContent" &&
    locationType == "suburb" &&
    citySlug.current == $citySlug &&
    suburbSlug.current == $suburbSlug &&
    !defined(service) &&
    !(_id in path("drafts.**"))
  ][0] ${LOCATION_CONTENT_PROJECTION}`;

  return client.fetch(query, { citySlug, suburbSlug });
}

/**
 * Get content for a suburb + service page
 */
export async function getSuburbServiceContent(
  citySlug: string,
  suburbSlug: string,
  serviceSlug: string,
  preview = false
): Promise<LocationContent | null> {
  const client = getClient(preview);

  const query = `*[
    _type == "locationContent" &&
    locationType == "suburb" &&
    citySlug.current == $citySlug &&
    suburbSlug.current == $suburbSlug &&
    service == $serviceSlug &&
    !(_id in path("drafts.**"))
  ][0] ${LOCATION_CONTENT_PROJECTION}`;

  return client.fetch(query, { citySlug, suburbSlug, serviceSlug });
}

/**
 * Get content for a city + service page
 */
export async function getCityServiceContent(
  citySlug: string,
  serviceSlug: string,
  preview = false
): Promise<LocationContent | null> {
  const client = getClient(preview);

  const query = `*[
    _type == "locationContent" &&
    locationType == "city" &&
    citySlug.current == $citySlug &&
    service == $serviceSlug &&
    !(_id in path("drafts.**"))
  ][0] ${LOCATION_CONTENT_PROJECTION}`;

  return client.fetch(query, { citySlug, serviceSlug });
}

/**
 * Get FAQs for a location (falls back to category FAQs)
 */
export async function getLocationFaqs(
  citySlug: string,
  suburbSlug?: string,
  serviceSlug?: string,
  preview = false
): Promise<Array<{ question: string; answer: string }>> {
  const client = getClient(preview);

  // Try location-specific FAQs first
  let query = `*[
    _type == "locationContent" &&
    citySlug.current == $citySlug &&
    !(_id in path("drafts.**"))
  `;

  if (suburbSlug) {
    query += ` && suburbSlug.current == $suburbSlug`;
  }

  if (serviceSlug) {
    query += ` && service == $serviceSlug`;
  }

  query += `][0].faqs[] { question, answer }`;

  const locationFaqs = await client.fetch(query, { citySlug, suburbSlug, serviceSlug });

  if (locationFaqs && locationFaqs.length > 0) {
    return locationFaqs;
  }

  // Fall back to general FAQs by category
  if (serviceSlug) {
    const categoryFaqs = await client.fetch(
      `*[_type == "faq" && $serviceSlug in tags && !(_id in path("drafts.**"))] | order(order asc) [0...5] {
        question,
        answer
      }`,
      { serviceSlug }
    );

    if (categoryFaqs && categoryFaqs.length > 0) {
      return categoryFaqs;
    }
  }

  // Fall back to featured FAQs
  const featuredFaqs = await client.fetch(
    `*[_type == "faq" && featured == true && !(_id in path("drafts.**"))] | order(order asc) [0...5] {
      question,
      answer
    }`
  );

  return featuredFaqs || [];
}

/**
 * Get testimonials for a location
 */
export async function getLocationTestimonials(
  citySlug: string,
  suburbSlug?: string,
  limit = 3,
  preview = false
): Promise<LocationContent['testimonials']> {
  const client = getClient(preview);

  let query = `*[
    _type == "locationContent" &&
    citySlug.current == $citySlug &&
    !(_id in path("drafts.**"))
  `;

  if (suburbSlug) {
    query += ` && suburbSlug.current == $suburbSlug`;
  }

  query += `][0].testimonials[0...${limit}] { quote, author, suburb, service, rating, date }`;

  const testimonials = await client.fetch(query, { citySlug, suburbSlug });

  return testimonials || [];
}

/**
 * Merge Sanity content with defaults
 * Sanity content overrides defaults where present
 */
export function mergeWithDefaults<T extends Record<string, unknown>>(
  defaults: T,
  sanityContent: Partial<T> | null
): T {
  if (!sanityContent) {
    return defaults;
  }

  return {
    ...defaults,
    ...Object.fromEntries(
      Object.entries(sanityContent).filter(([, v]) => v !== null && v !== undefined)
    ),
  } as T;
}

/**
 * Generate location-aware meta tags
 */
export function generateLocationMeta(
  content: LocationContent | null,
  defaults: { title: string; description: string }
): { title: string; description: string; keywords?: string[] } {
  return {
    title: content?.metaTitle || defaults.title,
    description: content?.metaDescription || defaults.description,
    keywords: content?.keywords,
  };
}
