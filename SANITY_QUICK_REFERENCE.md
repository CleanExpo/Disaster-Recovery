# Sanity CMS Quick Reference

Fast reference for common Sanity CMS operations.

## Environment Variables

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=sk_your_token
SANITY_REVALIDATE_SECRET=your_webhook_secret
```

---

## Quick Start

### 1. Fetch Blog Posts

```tsx
import { getBlogPosts } from '@/lib/sanity.queries'

const posts = await getBlogPosts()
```

### 2. Fetch Single Post

```tsx
import { getBlogPostBySlug } from '@/lib/sanity.queries'

const post = await getBlogPostBySlug('my-post-slug')
```

### 3. Display Image

```tsx
import Image from 'next/image'
import { getNextImageProps } from '@/lib/sanity.image'

const imageProps = getNextImageProps(post.featuredImage, 'Alt text', 800, 600)
return <Image {...imageProps} />
```

### 4. Render Rich Text

```tsx
import { PortableText } from '@portabletext/react'

<PortableText value={post.body} />
```

---

## Common Queries

### Blog Posts

```tsx
// All posts
const posts = await getBlogPosts()

// By category
const posts = await getBlogPostsByCategory(categoryId)

// Featured only
const posts = await getFeaturedBlogPosts()

// Single post
const post = await getBlogPostBySlug(slug)

// All slugs (for static generation)
const slugs = await getBlogPostSlugs()
```

### Guides

```tsx
// All guides
const guides = await getGuides()

// By category
const guides = await getGuidesByCategory(categoryId)

// Single guide
const guide = await getGuideBySlug(slug)

// All slugs
const slugs = await getGuideSlugs()
```

### Resources

```tsx
// All resources
const resources = await getResources()

// By category
const resources = await getResourcesByCategory(categoryId)

// Single resource
const resource = await getResourceBySlug(slug)

// All slugs
const slugs = await getResourceSlugs()
```

### FAQs

```tsx
// All FAQs
const faqs = await getFaqs()

// By category
const faqs = await getFaqsByCategory(categoryId)

// By location
const faqs = await getFaqsByLocation('Los Angeles')

// Featured only
const faqs = await getFeaturedFaqs()
```

### Categories

```tsx
// All categories
const categories = await getCategories()

// Single category
const category = await getCategoryBySlug(slug)
```

---

## Image Helpers

### Basic Image URL

```tsx
import { urlFor } from '@/lib/sanity.client'

const url = urlFor(image).width(800).height(600).url()
```

### Optimized URLs

```tsx
import {
  getImageUrl,
  getThumbnailUrl,
  getHeroImageUrl,
  getCardImageUrl,
} from '@/lib/sanity.image'

// Custom size
const url = getImageUrl(image, 800, 600, 90)

// Thumbnail
const thumb = getThumbnailUrl(image, 150)

// Hero image
const hero = getHeroImageUrl(image)

// Card image
const card = getCardImageUrl(image)
```

### Next.js Image Props

```tsx
import { getNextImageProps } from '@/lib/sanity.image'

// With all options
const props = getNextImageProps(
  image,        // Sanity image object
  'Alt text',   // Alt text
  800,          // Width
  600,          // Height (optional)
  true          // Priority (optional)
)

<Image {...props} />
```

### Responsive Images

```tsx
import { generateSrcSet, generateSizes } from '@/lib/sanity.image'

const srcSet = generateSrcSet(image, [640, 750, 1080, 1920])
const sizes = generateSizes()

<img src={mainUrl} srcSet={srcSet} sizes={sizes} alt={alt} />
```

---

## ISR & Revalidation

### Page Revalidation

```tsx
// Revalidate every hour
export const revalidate = 3600

// On-demand only (via webhook)
export const revalidate = 0
```

### Static Params Generation

```tsx
export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs()
  return slugs.map((slug) => ({ slug }))
}
```

### Manual Revalidation

```bash
# Revalidate specific path
curl -X GET "https://your-domain.com/api/revalidate?path=/resources" \
  -H "Authorization: Bearer YOUR_SECRET"

# Revalidate by tag
curl -X GET "https://your-domain.com/api/revalidate?tag=category-123" \
  -H "Authorization: Bearer YOUR_SECRET"
```

---

## Webhook Setup

### Sanity Dashboard

1. Go to: **API** → **Webhooks**
2. Click: **Create webhook**
3. Configure:
   - **URL**: `https://your-domain.com/api/revalidate`
   - **Dataset**: `production`
   - **Trigger**: Create, Update, Delete
   - **Secret**: Value from `SANITY_REVALIDATE_SECRET`

---

## Common Patterns

### Blog Listing Page

```tsx
import { getBlogPosts } from '@/lib/sanity.queries'

export const revalidate = 3600

export default async function BlogPage() {
  const posts = await getBlogPosts()

  return (
    <div>
      {posts.map((post) => (
        <article key={post._id}>
          <h2>{post.title}</h2>
          <p>{post.excerpt}</p>
        </article>
      ))}
    </div>
  )
}
```

### Single Post Page

```tsx
import { getBlogPostBySlug, getBlogPostSlugs } from '@/lib/sanity.queries'
import { notFound } from 'next/navigation'

export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

export const revalidate = 0

export default async function PostPage({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return <article>{/* Render post */}</article>
}
```

### SEO Metadata

```tsx
export async function generateMetadata({ params }: { params: { slug: string } }) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {}
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords,
  }
}
```

---

## Type Safety

### Check if Image Exists

```tsx
import { hasImage } from '@/lib/sanity.image'

if (hasImage(post.featuredImage)) {
  // Safe to use image
}
```

### Get Alt Text

```tsx
import { getImageAlt } from '@/lib/sanity.image'

const alt = getImageAlt(post.featuredImage)
```

---

## File Locations

```
/sanity/
  schemas/          # Content schemas
  sanity.config.ts  # Studio configuration

/lib/
  sanity.client.ts  # Client configuration
  sanity.queries.ts # Query functions
  sanity.image.ts   # Image utilities

/app/api/
  revalidate/
    route.ts        # Webhook handler
```

---

## Image Size Presets

```tsx
import { imageSizes } from '@/lib/sanity.image'

imageSizes.thumbnail  // 150x150
imageSizes.small      // 300x200
imageSizes.medium     // 600x400
imageSizes.large      // 1200x800
imageSizes.hero       // 1920x1080
imageSizes.fullWidth  // 2048x1366
```

---

## Image Quality Presets

```tsx
import { imageQualities } from '@/lib/sanity.image'

imageQualities.low     // 50 (for placeholders)
imageQualities.medium  // 75
imageQualities.high    // 90 (default)
imageQualities.max     // 100
```

---

## Debugging

### Check Environment Variables

```bash
# Verify Sanity config is loaded
console.log(process.env.NEXT_PUBLIC_SANITY_PROJECT_ID)
```

### Test Query

```tsx
import { sanityClient } from '@/lib/sanity.client'

const result = await sanityClient.fetch(`*[_type == "blogPost"][0...3]`)
console.log(result)
```

### Test Image URL

```tsx
import { urlFor } from '@/lib/sanity.client'

const url = urlFor(image).width(100).url()
console.log(url)
```

---

## Resources

- **Setup Guide**: `SANITY_CMS_SETUP.md`
- **Usage Examples**: `SANITY_USAGE_EXAMPLES.md`
- **Implementation**: `SANITY_CMS_IMPLEMENTATION.md`
- **Sanity Docs**: [sanity.io/docs](https://www.sanity.io/docs)
- **GROQ Cheat Sheet**: [sanity.io/docs/query-cheat-sheet](https://www.sanity.io/docs/query-cheat-sheet)

---

**Last Updated**: 2026-01-02
**Version**: 1.0.0
