/**
 * Optimized Image Component
 *
 * Provides automatic image optimization with:
 * - WebP/AVIF format support
 * - Lazy loading
 * - Blur placeholder
 * - Responsive sizes
 * - Priority loading for above-fold images
 */

import Image, { ImageProps } from 'next/image'
import { useState } from 'react'

interface OptimizedImageProps extends Omit<ImageProps, 'placeholder'> {
  /** Enable blur placeholder (requires blurDataURL) */
  enableBlur?: boolean
  /** Custom blur data URL */
  blurDataURL?: string
  /** Image is above the fold (disable lazy loading) */
  priority?: boolean
  /** Fallback src if main image fails */
  fallbackSrc?: string
}

/**
 * Generate a simple blur placeholder
 */
function generateBlurPlaceholder(width: number, height: number): string {
  const shimmer = (w: number, h: number) => `
    <svg width="${w}" height="${h}" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink">
      <defs>
        <linearGradient id="g">
          <stop stop-color="#f6f7f8" offset="0%" />
          <stop stop-color="#edeef1" offset="20%" />
          <stop stop-color="#f6f7f8" offset="40%" />
          <stop stop-color="#f6f7f8" offset="100%" />
        </linearGradient>
      </defs>
      <rect width="${w}" height="${h}" fill="#f6f7f8" />
      <rect id="r" width="${w}" height="${h}" fill="url(#g)" />
      <animate xlink:href="#r" attributeName="x" from="-${w}" to="${w}" dur="1s" repeatCount="indefinite"  />
    </svg>
  `

  const toBase64 = (str: string) =>
    typeof window === 'undefined'
      ? Buffer.from(str).toString('base64')
      : window.btoa(str)

  return `data:image/svg+xml;base64,${toBase64(shimmer(width, height))}`
}

/**
 * Optimized Image Component
 */
export function OptimizedImage({
  enableBlur = true,
  blurDataURL,
  priority = false,
  fallbackSrc,
  alt,
  width,
  height,
  ...props
}: OptimizedImageProps) {
  const [imageSrc, setImageSrc] = useState(props.src)
  const [imageError, setImageError] = useState(false)

  // Generate blur placeholder if enabled and not provided
  const placeholder = enableBlur ? 'blur' : 'empty'
  const finalBlurDataURL =
    enableBlur && !blurDataURL && typeof width === 'number' && typeof height === 'number'
      ? generateBlurPlaceholder(width as number, height as number)
      : blurDataURL

  // Handle image load error
  const handleError = () => {
    if (fallbackSrc && !imageError) {
      setImageSrc(fallbackSrc)
      setImageError(true)
    }
  }

  return (
    <Image
      {...props}
      src={imageSrc}
      alt={alt}
      width={width}
      height={height}
      placeholder={placeholder}
      blurDataURL={finalBlurDataURL}
      priority={priority}
      loading={priority ? 'eager' : 'lazy'}
      onError={handleError}
      sizes={
        props.sizes ||
        '(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw'
      }
    />
  )
}

/**
 * Hero Image Component
 * Optimized for above-fold hero images
 */
export function HeroImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      priority
      sizes="100vw"
      quality={90}
    />
  )
}

/**
 * Thumbnail Image Component
 * Optimized for small thumbnail images
 */
export function ThumbnailImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      sizes="(max-width: 640px) 50vw, 25vw"
      quality={75}
    />
  )
}

/**
 * Avatar Image Component
 * Optimized for user avatars
 */
export function AvatarImage(props: OptimizedImageProps) {
  return (
    <OptimizedImage
      {...props}
      sizes="(max-width: 640px) 20vw, 10vw"
      quality={80}
      className={`rounded-full ${props.className || ''}`}
    />
  )
}

/**
 * Background Image Component
 * Optimized for background images with overlay
 */
interface BackgroundImageProps extends OptimizedImageProps {
  children?: React.ReactNode
  overlay?: 'light' | 'dark' | 'none'
  overlayOpacity?: number
}

export function BackgroundImage({
  children,
  overlay = 'dark',
  overlayOpacity = 0.5,
  ...props
}: BackgroundImageProps) {
  return (
    <div className="relative w-full h-full overflow-hidden">
      <OptimizedImage
        {...props}
        fill
        style={{ objectFit: 'cover' }}
        sizes="100vw"
      />
      {overlay !== 'none' && (
        <div
          className={`absolute inset-0 ${
            overlay === 'dark' ? 'bg-black' : 'bg-white'
          }`}
          style={{ opacity: overlayOpacity }}
        />
      )}
      {children && (
        <div className="relative z-10">
          {children}
        </div>
      )}
    </div>
  )
}

/**
 * Responsive Picture Component
 * Provides art direction with different images for different screen sizes
 */
interface ResponsivePictureProps {
  mobile: string
  tablet?: string
  desktop: string
  alt: string
  width: number
  height: number
  priority?: boolean
  className?: string
}

export function ResponsivePicture({
  mobile,
  tablet,
  desktop,
  alt,
  width,
  height,
  priority = false,
  className,
}: ResponsivePictureProps) {
  return (
    <picture>
      {/* Mobile */}
      <source media="(max-width: 640px)" srcSet={mobile} />

      {/* Tablet */}
      {tablet && <source media="(max-width: 1024px)" srcSet={tablet} />}

      {/* Desktop */}
      <source media="(min-width: 1025px)" srcSet={desktop} />

      {/* Fallback */}
      <OptimizedImage
        src={desktop}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={className}
      />
    </picture>
  )
}

/**
 * Lazy Background Component
 * Lazy loads background images
 */
interface LazyBackgroundProps {
  src: string
  children: React.ReactNode
  className?: string
}

export function LazyBackground({ src, children, className }: LazyBackgroundProps) {
  const [loaded, setLoaded] = useState(false)

  React.useEffect(() => {
    const img = new window.Image()
    img.src = src
    img.onload = () => setLoaded(true)
  }, [src])

  return (
    <div
      className={className}
      style={{
        backgroundImage: loaded ? `url(${src})` : 'none',
        transition: 'background-image 0.3s ease-in-out',
      }}
    >
      {children}
    </div>
  )
}

/**
 * Image Preloader
 * Preload critical images
 */
export function preloadImage(src: string, priority: 'high' | 'low' = 'low') {
  if (typeof window === 'undefined') return

  const link = document.createElement('link')
  link.rel = 'preload'
  link.as = 'image'
  link.href = src
  link.fetchPriority = priority
  document.head.appendChild(link)
}

/**
 * Preload multiple images
 */
export function preloadImages(
  images: Array<{ src: string; priority?: 'high' | 'low' }>
) {
  images.forEach(({ src, priority = 'low' }) => {
    preloadImage(src, priority)
  })
}

import React from 'react'
