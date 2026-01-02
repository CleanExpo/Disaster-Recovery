# Sanity CMS Integration Setup Guide

Complete guide for setting up and using the Sanity CMS integration for the Disaster Recovery NRPG platform.

## Table of Contents

1. [Overview](#overview)
2. [Installation](#installation)
3. [Configuration](#configuration)
4. [Sanity Studio Setup](#sanity-studio-setup)
5. [Content Types](#content-types)
6. [Usage Examples](#usage-examples)
7. [Webhooks & Revalidation](#webhooks--revalidation)
8. [Image Optimization](#image-optimization)
9. [Deployment](#deployment)

---

## Overview

The Disaster Recovery NRPG platform uses **Sanity CMS** as a headless content management system for:

- **Blog Posts** - Articles, guides, and news about disaster recovery
- **Guides** - Step-by-step instructions with downloads
- **Resources** - Downloadable documents, templates, and tools
- **FAQs** - Frequently asked questions for location pages
- **Categories** - Content organization and navigation
- **Authors** - Content author profiles

### Why Sanity?

- **TypeScript Support** - Full type safety with our schemas
- **Real-time Updates** - Webhooks trigger instant content updates
- **Image CDN** - Automatic image optimization and transformation
- **Developer Experience** - Excellent DX with GROQ queries
- **Next.js Integration** - Perfect compatibility with ISR and on-demand revalidation

---

## Installation

Sanity packages are already installed. If you need to reinstall:

```bash
npm install @sanity/client next-sanity @sanity/image-url --save
```

---

## Configuration

### Environment Variables

Add these to your `.env.local` file:

```bash
# Sanity CMS Configuration
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id_here
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_TOKEN=your_api_token_here
SANITY_REVALIDATE_SECRET=your_webhook_secret_here
```

### Getting Your Sanity Project ID

1. Go to [sanity.io](https://www.sanity.io/) and sign in
2. Create a new project or select an existing one
3. Copy the Project ID from the project settings
4. Paste it into `NEXT_PUBLIC_SANITY_PROJECT_ID`

### Getting Your API Token

1. Go to your Sanity project dashboard
2. Navigate to **API** → **Tokens**
3. Create a new token with **Editor** permissions
4. Copy the token and paste it into `SANITY_API_TOKEN`

### Setting Up Webhook Secret

Generate a secure random string for your webhook secret:

```bash
openssl rand -base64 32
```

Add this to `SANITY_REVALIDATE_SECRET`

---

## Sanity Studio Setup

### Option 1: Embedded Studio (Recommended)

Create a Sanity Studio route in your Next.js app:

1. Create `app/studio/[[...index]]/page.tsx`:

```tsx
'use client'

import { NextStudio } from 'next-sanity/studio'
import config from '@/sanity/sanity.config'

export default function StudioPage() {
  return <NextStudio config={config} />
}
```

2. Access your studio at: `http://localhost:3000/studio`

### Option 2: Standalone Studio

Deploy a separate Sanity Studio:

```bash
cd sanity
npx sanity init
npx sanity deploy
```

---

## Content Types

### Blog Post Schema

Fields:
- **title** - Post title (required)
- **slug** - URL-friendly slug (auto-generated from title)
- **author** - Reference to Author
- **publishedAt** - Publication date
- **excerpt** - Short summary (50-200 chars)
- **body** - Rich text content with images
- **featuredImage** - Main post image
- **category** - Reference to Category
- **tags** - Array of keywords
- **readTime** - Estimated read time in minutes
- **featured** - Boolean for homepage feature
- **seo** - SEO metadata (title, description, keywords)

### Guide Schema

Fields:
- **title** - Guide title
- **slug** - URL-friendly slug
- **category** - Reference to Category
- **difficulty** - Beginner/Intermediate/Advanced
- **estimatedTime** - Time to complete
- **description** - Guide overview
- **featuredImage** - Main guide image
- **steps** - Array of step objects with:
  - Step number
  - Title
  - Description (rich text)
  - Image (optional)
  - Tips (array)
  - Warnings (array)
- **downloads** - Downloadable resources
- **requiredTools** - Tools needed
- **relatedGuides** - References to other guides

### Resource Schema

Fields:
- **title** - Resource name
- **slug** - URL-friendly slug
- **type** - Document/Template/Checklist/Tool/Video/Guide/Infographic
- **description** - Resource description
- **category** - Reference to Category
- **featuredImage** - Preview image
- **file** - File upload (PDF, DOCX, XLSX, etc.)
- **externalUrl** - Alternative to file upload
- **isPremium** - Requires subscription
- **tags** - Keywords
- **downloadCount** - Download tracking

### FAQ Schema

Fields:
- **question** - The question
- **answer** - Rich text answer
- **category** - Reference to Category
- **location** - Specific location (optional)
- **tags** - Keywords
- **order** - Display order
- **featured** - Featured FAQ

---

## Usage Examples

### Fetching Blog Posts

```tsx
import { getBlogPosts, getFeaturedBlogPosts } from '@/lib/sanity.queries'

export default async function BlogPage() {
  const posts = await getBlogPosts()
  const featuredPosts = await getFeaturedBlogPosts()

  return (
    <div>
      <h1>Blog Posts</h1>
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

### Fetching Single Blog Post

```tsx
import { getBlogPostBySlug } from '@/lib/sanity.queries'
import { notFound } from 'next/navigation'

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  return (
    <article>
      <h1>{post.title}</h1>
      <div>{/* Render rich text content */}</div>
    </article>
  )
}
```

### Optimized Image Display

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.client'
import { getNextImageProps } from '@/lib/sanity.image'

export function BlogPostImage({ image, alt }: { image: any; alt: string }) {
  // Option 1: Manual URL builder
  const imageUrl = urlFor(image).width(800).height(600).url()

  return <Image src={imageUrl} alt={alt} width={800} height={600} />

  // Option 2: Use helper function
  const imageProps = getNextImageProps(image, alt, 800, 600)

  return <Image {...imageProps} />
}
```

### Fetching FAQs for Location Pages

```tsx
import { getFaqsByLocation } from '@/lib/sanity.queries'

export default async function LocationPage({
  params,
}: {
  params: { location: string }
}) {
  const faqs = await getFaqsByLocation(params.location)

  return (
    <div>
      <h2>Frequently Asked Questions</h2>
      {faqs.map((faq) => (
        <div key={faq._id}>
          <h3>{faq.question}</h3>
          {/* Render rich text answer */}
        </div>
      ))}
    </div>
  )
}
```

---

## Webhooks & Revalidation

### Setting Up Webhooks in Sanity

1. Go to your Sanity project dashboard
2. Navigate to **API** → **Webhooks**
3. Click **Create webhook**
4. Configure:
   - **Name**: Production Revalidation
   - **URL**: `https://your-domain.com/api/revalidate`
   - **Dataset**: production
   - **Trigger on**: Create, Update, Delete
   - **HTTP method**: POST
   - **Secret**: Use the value from `SANITY_REVALIDATE_SECRET`
5. Click **Save**

### How Revalidation Works

When you update content in Sanity:

1. Sanity sends a webhook to `/api/revalidate`
2. The endpoint validates the webhook signature
3. Next.js revalidates affected pages using `revalidatePath()`
4. Updated content appears immediately on your site

### Manual Revalidation

You can manually trigger revalidation:

```bash
curl -X GET "https://your-domain.com/api/revalidate?path=/resources" \
  -H "Authorization: Bearer your_webhook_secret"
```

---

## Image Optimization

### Automatic Optimizations

Sanity images are automatically optimized with:

- **Format conversion** - WebP/AVIF for modern browsers
- **Responsive sizing** - Multiple sizes for different devices
- **Quality compression** - Optimized file sizes
- **Lazy loading** - Load images as needed
- **Blur placeholders** - LQIP for smooth loading

### Image Helper Functions

```tsx
import {
  getImageUrl,
  getThumbnailUrl,
  getHeroImageUrl,
  getCardImageUrl,
  getBlurDataUrl,
} from '@/lib/sanity.image'

// Get optimized thumbnail
const thumbnail = getThumbnailUrl(image, 200)

// Get hero image
const hero = getHeroImageUrl(image)

// Get card image
const card = getCardImageUrl(image)

// Get blur placeholder
const blurDataUrl = getBlurDataUrl(image)
```

### Responsive Images

```tsx
import { generateSrcSet, generateSizes } from '@/lib/sanity.image'

const srcSet = generateSrcSet(image, [640, 750, 1080, 1920])
const sizes = generateSizes({
  sm: '640px',
  md: '768px',
  lg: '1024px',
})

<img src={mainImageUrl} srcSet={srcSet} sizes={sizes} alt={alt} />
```

---

## Deployment

### Deploying to Production

1. **Set environment variables** in your hosting platform:
   - Vercel: Project Settings → Environment Variables
   - Netlify: Site Settings → Build & Deploy → Environment
   - Add all Sanity environment variables

2. **Deploy your Next.js app**:
   ```bash
   npm run build
   npm run start
   ```

3. **Update webhook URL** in Sanity:
   - Replace localhost URL with production URL
   - Example: `https://disasterrecoverynrpg.com/api/revalidate`

4. **Test the integration**:
   - Create/update content in Sanity Studio
   - Verify content appears on your site
   - Check revalidation logs

### Sanity Studio Deployment

If using standalone studio:

```bash
cd sanity
npm run build
npx sanity deploy
```

Your studio will be available at: `https://your-project.sanity.studio`

---

## TypeScript Types

Auto-generated types are available. To generate:

```bash
npx sanity typegen generate
```

Types will be generated in `sanity/types.ts`

---

## Troubleshooting

### Images Not Loading

1. Check Next.js config has `cdn.sanity.io` in `remotePatterns`
2. Verify `NEXT_PUBLIC_SANITY_PROJECT_ID` is set correctly
3. Check CSP headers allow Sanity CDN

### Webhooks Not Working

1. Verify webhook secret matches `SANITY_REVALIDATE_SECRET`
2. Check webhook URL is correct (https, not http)
3. Test webhook manually in Sanity dashboard
4. Check server logs for errors

### Content Not Updating

1. Clear Next.js cache: `rm -rf .next`
2. Rebuild: `npm run build`
3. Check revalidation endpoint is working
4. Verify ISR is configured correctly

---

## Resources

- [Sanity Documentation](https://www.sanity.io/docs)
- [Next.js + Sanity Guide](https://www.sanity.io/guides/nextjs)
- [GROQ Query Language](https://www.sanity.io/docs/groq)
- [Image URL Builder](https://www.sanity.io/docs/image-url)

---

## Support

For issues or questions:

1. Check this documentation
2. Review Sanity documentation
3. Check Next.js documentation
4. Contact the development team

---

**Last Updated**: 2026-01-02
**Version**: 1.0.0
**Status**: Production Ready
