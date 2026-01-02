/**
 * Sanity Client Configuration
 *
 * Configures the Sanity client for fetching content in Next.js.
 * Supports both client-side and server-side rendering.
 */

import { createClient } from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'

// Sanity project configuration
export const config = {
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || '',
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || 'production',
  apiVersion: '2024-01-01', // Use current date (YYYY-MM-DD) for API version
  useCdn: process.env.NODE_ENV === 'production', // Use CDN in production for faster responses
  token: process.env.SANITY_API_TOKEN, // Used for authenticated requests
}

// Validate configuration
if (!config.projectId) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID environment variable')
}

if (!config.dataset) {
  throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET environment variable')
}

/**
 * Sanity client for public content (client-side and server-side)
 */
export const sanityClient = createClient(config)

/**
 * Sanity client for preview mode (with authentication)
 */
export const sanityPreviewClient = createClient({
  ...config,
  useCdn: false, // Never use CDN for preview
  token: config.token,
})

/**
 * Helper function to get the appropriate client based on preview mode
 */
export function getClient(preview = false) {
  return preview ? sanityPreviewClient : sanityClient
}

/**
 * Image URL builder
 * Use this to generate optimized image URLs from Sanity
 */
const builder = imageUrlBuilder(sanityClient)

/**
 * Generate image URL from Sanity image source
 *
 * @param source - Sanity image source object
 * @returns Image URL builder
 *
 * @example
 * ```tsx
 * import { urlFor } from '@/lib/sanity.client'
 *
 * <Image
 *   src={urlFor(post.featuredImage).width(800).height(600).url()}
 *   alt={post.featuredImage.alt}
 * />
 * ```
 */
export function urlFor(source: SanityImageSource) {
  return builder.image(source)
}

/**
 * Sanity CDN configuration for Next.js Image component
 */
export const sanityImageConfig = {
  hostname: 'cdn.sanity.io',
  loader: ({ src, width, quality }: { src: string; width: number; quality?: number }) => {
    const url = new URL(src)
    url.searchParams.set('w', width.toString())
    if (quality) {
      url.searchParams.set('q', quality.toString())
    }
    url.searchParams.set('auto', 'format') // Automatic format selection (WebP, AVIF)
    return url.toString()
  },
}

/**
 * Type definitions for common Sanity responses
 */

export interface SanityImage {
  _type: 'image'
  asset: {
    _ref: string
    _type: 'reference'
  }
  alt?: string
  caption?: string
}

export interface SanitySlug {
  _type: 'slug'
  current: string
}

export interface SanityReference {
  _type: 'reference'
  _ref: string
}

export interface SanityBlock {
  _type: 'block'
  _key: string
  style: string
  children: Array<{
    _type: 'span'
    _key: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _type: string
    _key: string
    href?: string
  }>
}
