/**
 * Sanity Image Optimization Utilities
 *
 * Helper functions for optimizing and transforming Sanity images.
 * Works with Next.js Image component for best performance.
 */

import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types'
import { sanityClient } from './sanity.client'

/**
 * Image URL builder instance
 */
const builder = imageUrlBuilder(sanityClient)

/**
 * Image size presets for common use cases
 */
export const imageSizes = {
  thumbnail: { width: 150, height: 150 },
  small: { width: 300, height: 200 },
  medium: { width: 600, height: 400 },
  large: { width: 1200, height: 800 },
  hero: { width: 1920, height: 1080 },
  fullWidth: { width: 2048, height: 1366 },
}

/**
 * Image quality presets
 */
export const imageQualities = {
  low: 50,
  medium: 75,
  high: 90,
  max: 100,
}

/**
 * Build optimized image URL from Sanity image source
 *
 * @param source - Sanity image source object
 * @returns Image URL builder
 */
export function urlForImage(source: SanityImageSource) {
  return builder.image(source).auto('format').fit('max')
}

/**
 * Get optimized image URL with specific dimensions
 *
 * @param source - Sanity image source object
 * @param width - Image width
 * @param height - Image height (optional, maintains aspect ratio if not provided)
 * @param quality - Image quality (1-100)
 * @returns Optimized image URL
 */
export function getImageUrl(
  source: SanityImageSource,
  width: number,
  height?: number,
  quality: number = imageQualities.high
): string {
  const builder = urlForImage(source).width(width).quality(quality)

  if (height) {
    return builder.height(height).url()
  }

  return builder.url()
}

/**
 * Get responsive image URLs for srcset
 *
 * @param source - Sanity image source object
 * @param sizes - Array of widths for responsive images
 * @param quality - Image quality (1-100)
 * @returns Object with URLs for different sizes
 */
export function getResponsiveImageUrls(
  source: SanityImageSource,
  sizes: number[] = [640, 750, 828, 1080, 1200, 1920],
  quality: number = imageQualities.high
) {
  return sizes.reduce((acc, width) => {
    acc[width] = getImageUrl(source, width, undefined, quality)
    return acc
  }, {} as Record<number, string>)
}

/**
 * Get image metadata (dimensions, format, etc.)
 *
 * @param source - Sanity image source object
 * @returns Image metadata
 */
export function getImageMetadata(source: SanityImageSource) {
  const image = builder.image(source)
  return {
    url: image.url(),
    width: image.width(1920).url(),
    height: image.height(1080).url(),
  }
}

/**
 * Get optimized thumbnail URL
 *
 * @param source - Sanity image source object
 * @param size - Thumbnail size (default: 150x150)
 * @returns Optimized thumbnail URL
 */
export function getThumbnailUrl(
  source: SanityImageSource,
  size: number = 150
): string {
  return urlForImage(source)
    .width(size)
    .height(size)
    .fit('crop')
    .crop('center')
    .quality(imageQualities.medium)
    .url()
}

/**
 * Get optimized hero image URL
 *
 * @param source - Sanity image source object
 * @param quality - Image quality (default: high)
 * @returns Optimized hero image URL
 */
export function getHeroImageUrl(
  source: SanityImageSource,
  quality: number = imageQualities.high
): string {
  return urlForImage(source)
    .width(imageSizes.hero.width)
    .height(imageSizes.hero.height)
    .fit('crop')
    .crop('center')
    .quality(quality)
    .url()
}

/**
 * Get optimized card image URL
 *
 * @param source - Sanity image source object
 * @param quality - Image quality (default: high)
 * @returns Optimized card image URL
 */
export function getCardImageUrl(
  source: SanityImageSource,
  quality: number = imageQualities.high
): string {
  return urlForImage(source)
    .width(imageSizes.medium.width)
    .height(imageSizes.medium.height)
    .fit('crop')
    .crop('center')
    .quality(quality)
    .url()
}

/**
 * Get blur data URL for placeholder (LQIP - Low Quality Image Placeholder)
 *
 * @param source - Sanity image source object
 * @returns Blur data URL for placeholder
 */
export function getBlurDataUrl(source: SanityImageSource): string {
  return urlForImage(source)
    .width(20)
    .height(20)
    .blur(50)
    .quality(imageQualities.low)
    .url()
}

/**
 * Generate Next.js Image component props for Sanity image
 *
 * @param source - Sanity image source object
 * @param alt - Alt text for the image
 * @param width - Image width
 * @param height - Image height
 * @param priority - Whether to prioritize loading (default: false)
 * @returns Props for Next.js Image component
 */
export function getNextImageProps(
  source: SanityImageSource,
  alt: string,
  width: number,
  height?: number,
  priority: boolean = false
) {
  return {
    src: getImageUrl(source, width, height),
    alt,
    width,
    height: height || Math.round((width * 2) / 3), // 3:2 aspect ratio default
    placeholder: 'blur' as const,
    blurDataURL: getBlurDataUrl(source),
    priority,
    quality: imageQualities.high,
  }
}

/**
 * Generate srcset string for responsive images
 *
 * @param source - Sanity image source object
 * @param sizes - Array of widths for responsive images
 * @returns srcset string
 */
export function generateSrcSet(
  source: SanityImageSource,
  sizes: number[] = [640, 750, 828, 1080, 1200, 1920]
): string {
  return sizes
    .map((width) => {
      const url = getImageUrl(source, width)
      return `${url} ${width}w`
    })
    .join(', ')
}

/**
 * Generate sizes attribute for responsive images
 *
 * @param breakpoints - Object with breakpoint sizes
 * @returns sizes attribute string
 */
export function generateSizes(breakpoints?: {
  sm?: string
  md?: string
  lg?: string
  xl?: string
}): string {
  const defaultBreakpoints = {
    sm: '640px',
    md: '768px',
    lg: '1024px',
    xl: '1280px',
  }

  const bp = { ...defaultBreakpoints, ...breakpoints }

  return [
    `(max-width: ${bp.sm}) 100vw`,
    `(max-width: ${bp.md}) 50vw`,
    `(max-width: ${bp.lg}) 33vw`,
    '25vw',
  ].join(', ')
}

/**
 * Type guard to check if image source exists
 */
export function hasImage(source: unknown): source is SanityImageSource {
  return (
    source !== null &&
    source !== undefined &&
    typeof source === 'object' &&
    'asset' in source
  )
}

/**
 * Get image alt text from Sanity image object
 */
export function getImageAlt(image: { alt?: string } | null | undefined): string {
  return image?.alt || ''
}

/**
 * Crop positions for Sanity image hotspot
 */
export const cropPositions = {
  center: 'center',
  top: 'top',
  bottom: 'bottom',
  left: 'left',
  right: 'right',
  topLeft: 'top-left',
  topRight: 'top-right',
  bottomLeft: 'bottom-left',
  bottomRight: 'bottom-right',
} as const

/**
 * Apply custom crop to image
 *
 * @param source - Sanity image source object
 * @param width - Image width
 * @param height - Image height
 * @param crop - Crop position
 * @returns Cropped image URL
 */
export function getCroppedImageUrl(
  source: SanityImageSource,
  width: number,
  height: number,
  crop: keyof typeof cropPositions = 'center'
): string {
  return urlForImage(source)
    .width(width)
    .height(height)
    .fit('crop')
    .crop(cropPositions[crop])
    .quality(imageQualities.high)
    .url()
}

/**
 * Export common image configurations
 */
export const imageConfigs = {
  thumbnail: (source: SanityImageSource) =>
    getNextImageProps(source, '', imageSizes.thumbnail.width, imageSizes.thumbnail.height),
  card: (source: SanityImageSource, alt: string) =>
    getNextImageProps(source, alt, imageSizes.medium.width, imageSizes.medium.height),
  hero: (source: SanityImageSource, alt: string) =>
    getNextImageProps(source, alt, imageSizes.hero.width, imageSizes.hero.height, true),
  fullWidth: (source: SanityImageSource, alt: string) =>
    getNextImageProps(source, alt, imageSizes.fullWidth.width, imageSizes.fullWidth.height),
}
