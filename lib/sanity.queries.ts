/**
 * Sanity Query Helpers
 *
 * Reusable GROQ queries for fetching content from Sanity.
 * Includes queries for blog posts, guides, resources, and FAQs.
 */

import { groq } from 'next-sanity'
import { getClient } from './sanity.client'

/**
 * Common projections for reuse across queries
 */

const authorProjection = groq`
  author->{
    name,
    slug,
    image,
    bio,
    role
  }
`

const categoryProjection = groq`
  category->{
    name,
    slug,
    description,
    color,
    icon
  }
`

const imageProjection = groq`
  featuredImage{
    asset->,
    alt,
    caption
  }
`

/**
 * Blog Post Queries
 */

export const blogPostsQuery = groq`
  *[_type == "blogPost" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    featured,
    tags,
    ${authorProjection},
    ${categoryProjection},
    ${imageProjection}
  }
`

export const blogPostsByCategoryQuery = groq`
  *[_type == "blogPost" && category._ref == $categoryId && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    featured,
    tags,
    ${authorProjection},
    ${categoryProjection},
    ${imageProjection}
  }
`

export const featuredBlogPostsQuery = groq`
  *[_type == "blogPost" && featured == true && !(_id in path("drafts.**"))] | order(publishedAt desc) [0...3] {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    publishedAt,
    readTime,
    tags,
    ${authorProjection},
    ${categoryProjection},
    ${imageProjection}
  }
`

export const blogPostBySlugQuery = groq`
  *[_type == "blogPost" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    excerpt,
    body,
    publishedAt,
    readTime,
    featured,
    tags,
    seo,
    ${authorProjection},
    ${categoryProjection},
    ${imageProjection}
  }
`

export const blogPostSlugsQuery = groq`
  *[_type == "blogPost" && !(_id in path("drafts.**"))].slug.current
`

/**
 * Guide Queries
 */

export const guidesQuery = groq`
  *[_type == "guide" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    description,
    difficulty,
    estimatedTime,
    featured,
    publishedAt,
    ${categoryProjection},
    ${imageProjection}
  }
`

export const guidesByCategoryQuery = groq`
  *[_type == "guide" && category._ref == $categoryId && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    description,
    difficulty,
    estimatedTime,
    featured,
    publishedAt,
    ${categoryProjection},
    ${imageProjection}
  }
`

export const guideBySlugQuery = groq`
  *[_type == "guide" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    description,
    difficulty,
    estimatedTime,
    steps,
    downloads,
    requiredTools,
    relatedGuides[]->{
      title,
      slug,
      description,
      difficulty
    },
    publishedAt,
    lastUpdated,
    seo,
    ${categoryProjection},
    ${imageProjection}
  }
`

export const guideSlugsQuery = groq`
  *[_type == "guide" && !(_id in path("drafts.**"))].slug.current
`

/**
 * Resource Queries
 */

export const resourcesQuery = groq`
  *[_type == "resource" && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    description,
    type,
    isPremium,
    featured,
    tags,
    downloadCount,
    publishedAt,
    ${categoryProjection},
    ${imageProjection}
  }
`

export const resourcesByCategoryQuery = groq`
  *[_type == "resource" && category._ref == $categoryId && !(_id in path("drafts.**"))] | order(publishedAt desc) {
    _id,
    _createdAt,
    title,
    slug,
    description,
    type,
    isPremium,
    featured,
    tags,
    downloadCount,
    publishedAt,
    ${categoryProjection},
    ${imageProjection}
  }
`

export const resourceBySlugQuery = groq`
  *[_type == "resource" && slug.current == $slug][0] {
    _id,
    _createdAt,
    title,
    slug,
    description,
    type,
    file,
    externalUrl,
    isPremium,
    tags,
    relatedResources[]->{
      title,
      slug,
      description,
      type
    },
    downloadCount,
    publishedAt,
    lastUpdated,
    seo,
    ${categoryProjection},
    ${imageProjection}
  }
`

export const resourceSlugsQuery = groq`
  *[_type == "resource" && !(_id in path("drafts.**"))].slug.current
`

/**
 * FAQ Queries
 */

export const faqsQuery = groq`
  *[_type == "faq" && !(_id in path("drafts.**"))] | order(order asc) {
    _id,
    question,
    answer,
    tags,
    featured,
    ${categoryProjection}
  }
`

export const faqsByCategoryQuery = groq`
  *[_type == "faq" && category._ref == $categoryId && !(_id in path("drafts.**"))] | order(order asc) {
    _id,
    question,
    answer,
    tags,
    featured,
    ${categoryProjection}
  }
`

export const faqsByLocationQuery = groq`
  *[_type == "faq" && location == $location && !(_id in path("drafts.**"))] | order(order asc) {
    _id,
    question,
    answer,
    tags,
    location,
    ${categoryProjection}
  }
`

export const featuredFaqsQuery = groq`
  *[_type == "faq" && featured == true && !(_id in path("drafts.**"))] | order(order asc) [0...6] {
    _id,
    question,
    answer,
    tags,
    ${categoryProjection}
  }
`

/**
 * Category Queries
 */

export const categoriesQuery = groq`
  *[_type == "category"] | order(order asc) {
    _id,
    name,
    slug,
    description,
    color,
    icon,
    order
  }
`

export const categoryBySlugQuery = groq`
  *[_type == "category" && slug.current == $slug][0] {
    _id,
    name,
    slug,
    description,
    color,
    icon
  }
`

/**
 * Fetch Functions
 * These functions use the queries above to fetch data from Sanity
 */

// Blog Posts
export async function getBlogPosts(preview = false) {
  const client = getClient(preview)
  return await client.fetch(blogPostsQuery)
}

export async function getBlogPostsByCategory(categoryId: string, preview = false) {
  const client = getClient(preview)
  return await client.fetch(blogPostsByCategoryQuery, { categoryId })
}

export async function getFeaturedBlogPosts(preview = false) {
  const client = getClient(preview)
  return await client.fetch(featuredBlogPostsQuery)
}

export async function getBlogPostBySlug(slug: string, preview = false) {
  const client = getClient(preview)
  return await client.fetch(blogPostBySlugQuery, { slug })
}

export async function getBlogPostSlugs() {
  const client = getClient(false)
  return await client.fetch(blogPostSlugsQuery)
}

// Guides
export async function getGuides(preview = false) {
  const client = getClient(preview)
  return await client.fetch(guidesQuery)
}

export async function getGuidesByCategory(categoryId: string, preview = false) {
  const client = getClient(preview)
  return await client.fetch(guidesByCategoryQuery, { categoryId })
}

export async function getGuideBySlug(slug: string, preview = false) {
  const client = getClient(preview)
  return await client.fetch(guideBySlugQuery, { slug })
}

export async function getGuideSlugs() {
  const client = getClient(false)
  return await client.fetch(guideSlugsQuery)
}

// Resources
export async function getResources(preview = false) {
  const client = getClient(preview)
  return await client.fetch(resourcesQuery)
}

export async function getResourcesByCategory(categoryId: string, preview = false) {
  const client = getClient(preview)
  return await client.fetch(resourcesByCategoryQuery, { categoryId })
}

export async function getResourceBySlug(slug: string, preview = false) {
  const client = getClient(preview)
  return await client.fetch(resourceBySlugQuery, { slug })
}

export async function getResourceSlugs() {
  const client = getClient(false)
  return await client.fetch(resourceSlugsQuery)
}

// FAQs
export async function getFaqs(preview = false) {
  const client = getClient(preview)
  return await client.fetch(faqsQuery)
}

export async function getFaqsByCategory(categoryId: string, preview = false) {
  const client = getClient(preview)
  return await client.fetch(faqsByCategoryQuery, { categoryId })
}

export async function getFaqsByLocation(location: string, preview = false) {
  const client = getClient(preview)
  return await client.fetch(faqsByLocationQuery, { location })
}

export async function getFeaturedFaqs(preview = false) {
  const client = getClient(preview)
  return await client.fetch(featuredFaqsQuery)
}

// Categories
export async function getCategories(preview = false) {
  const client = getClient(preview)
  return await client.fetch(categoriesQuery)
}

export async function getCategoryBySlug(slug: string, preview = false) {
  const client = getClient(preview)
  return await client.fetch(categoryBySlugQuery, { slug })
}

/**
 * Location Content Queries
 */

export const locationContentByCityQuery = groq`
  *[_type == "locationContent" && citySlug.current == $citySlug && locationType == "city"][0] {
    _id,
    city,
    citySlug,
    state,
    locationType,
    headline,
    localDescription,
    localExpertise,
    localStats,
    faqs,
    testimonials,
    metaTitle,
    metaDescription,
    keywords,
    heroImage{
      asset->,
      alt,
      caption
    },
    gallery
  }
`

export const locationContentBySuburbQuery = groq`
  *[_type == "locationContent" && citySlug.current == $citySlug && suburbSlug.current == $suburbSlug && locationType == "suburb"][0] {
    _id,
    city,
    citySlug,
    suburb,
    suburbSlug,
    state,
    locationType,
    service,
    headline,
    localDescription,
    localExpertise,
    localStats,
    faqs,
    testimonials,
    metaTitle,
    metaDescription,
    keywords,
    heroImage{
      asset->,
      alt,
      caption
    },
    gallery
  }
`

export const locationContentBySuburbAndServiceQuery = groq`
  *[_type == "locationContent" && citySlug.current == $citySlug && suburbSlug.current == $suburbSlug && service == $service][0] {
    _id,
    city,
    citySlug,
    suburb,
    suburbSlug,
    state,
    locationType,
    service,
    headline,
    localDescription,
    localExpertise,
    localStats,
    faqs,
    testimonials,
    metaTitle,
    metaDescription,
    keywords,
    heroImage{
      asset->,
      alt,
      caption
    },
    gallery
  }
`

// Location Content Fetch Functions
export async function getLocationContentByCity(citySlug: string, preview = false) {
  const client = getClient(preview)
  return await client.fetch(locationContentByCityQuery, { citySlug })
}

export async function getLocationContentBySuburb(
  citySlug: string,
  suburbSlug: string,
  preview = false
) {
  const client = getClient(preview)
  return await client.fetch(locationContentBySuburbQuery, { citySlug, suburbSlug })
}

export async function getLocationContentBySuburbAndService(
  citySlug: string,
  suburbSlug: string,
  service: string,
  preview = false
) {
  const client = getClient(preview)
  return await client.fetch(locationContentBySuburbAndServiceQuery, {
    citySlug,
    suburbSlug,
    service,
  })
}
