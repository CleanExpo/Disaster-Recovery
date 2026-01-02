# Sanity CMS Integration - Verification Checklist

Use this checklist to verify the Sanity CMS integration is working correctly.

---

## Pre-Setup Verification

### Files Created

- [ ] `/sanity/schemas/author.ts` exists
- [ ] `/sanity/schemas/blogPost.ts` exists
- [ ] `/sanity/schemas/category.ts` exists
- [ ] `/sanity/schemas/faq.ts` exists
- [ ] `/sanity/schemas/guide.ts` exists
- [ ] `/sanity/schemas/resource.ts` exists
- [ ] `/sanity/schemas/index.ts` exists
- [ ] `/sanity/sanity.config.ts` exists
- [ ] `/lib/sanity.client.ts` exists
- [ ] `/lib/sanity.queries.ts` exists
- [ ] `/lib/sanity.image.ts` exists
- [ ] `/app/api/revalidate/route.ts` exists

### Packages Installed

- [ ] `@sanity/client` installed (v7.13.2 or later)
- [ ] `next-sanity` installed (v12.0.7 or later)
- [ ] `@sanity/image-url` installed (v2.0.2 or later)

### Configuration Updated

- [ ] `next.config.mjs` includes `cdn.sanity.io` in remotePatterns
- [ ] `next.config.mjs` CSP includes Sanity CDN in img-src
- [ ] `.env.example` includes Sanity variables

---

## Environment Setup

### Environment Variables

Create `.env.local` with:

- [ ] `NEXT_PUBLIC_SANITY_PROJECT_ID` set
- [ ] `NEXT_PUBLIC_SANITY_DATASET` set (usually "production")
- [ ] `SANITY_API_TOKEN` set
- [ ] `SANITY_REVALIDATE_SECRET` set (generate with: `openssl rand -base64 32`)
- [ ] All variables are valid (no placeholder values)

### Sanity Project

- [ ] Created Sanity account at sanity.io
- [ ] Created new Sanity project
- [ ] Copied project ID to environment variable
- [ ] Generated API token with Editor permissions
- [ ] Copied API token to environment variable

---

## Studio Deployment

### Option 1: Embedded Studio (Recommended)

- [ ] Created `/app/studio/[[...index]]/page.tsx`
- [ ] Can access studio at `http://localhost:3000/studio`
- [ ] Studio loads without errors
- [ ] All schemas visible in studio

### Option 2: Standalone Studio

- [ ] Ran `npx sanity init` in `/sanity` directory
- [ ] Deployed with `npx sanity deploy`
- [ ] Can access studio at `https://YOUR_PROJECT.sanity.studio`
- [ ] All schemas visible in studio

---

## Content Creation

### Categories

- [ ] Created at least 3 categories
- [ ] Each category has:
  - [ ] Name
  - [ ] Slug
  - [ ] Description
  - [ ] Color (optional)
  - [ ] Icon (optional)

### Authors

- [ ] Created at least 2 authors
- [ ] Each author has:
  - [ ] Name
  - [ ] Slug
  - [ ] Bio (optional)
  - [ ] Image (optional)

### Blog Posts

- [ ] Created at least 3 blog posts
- [ ] Each post has:
  - [ ] Title
  - [ ] Slug
  - [ ] Author (reference)
  - [ ] Category (reference)
  - [ ] Featured image with alt text
  - [ ] Excerpt
  - [ ] Body content
  - [ ] Published date
- [ ] At least 1 post marked as featured
- [ ] Published all posts

### Guides

- [ ] Created at least 2 guides
- [ ] Each guide has:
  - [ ] Title
  - [ ] Slug
  - [ ] Category (reference)
  - [ ] Difficulty level
  - [ ] Description
  - [ ] At least 3 steps
  - [ ] Featured image
- [ ] Published all guides

### Resources

- [ ] Created at least 2 resources
- [ ] Each resource has:
  - [ ] Title
  - [ ] Slug
  - [ ] Type
  - [ ] Description
  - [ ] Category (reference)
  - [ ] File upload OR external URL
- [ ] Published all resources

### FAQs

- [ ] Created at least 5 FAQs
- [ ] Each FAQ has:
  - [ ] Question
  - [ ] Answer
  - [ ] Category (reference)
- [ ] Published all FAQs

---

## Query Testing

### Blog Post Queries

Run these in your Next.js app (e.g., in a test page):

```tsx
import {
  getBlogPosts,
  getBlogPostsByCategory,
  getFeaturedBlogPosts,
  getBlogPostBySlug,
} from '@/lib/sanity.queries'
```

- [ ] `getBlogPosts()` returns all posts
- [ ] `getBlogPostsByCategory(categoryId)` returns filtered posts
- [ ] `getFeaturedBlogPosts()` returns featured posts only
- [ ] `getBlogPostBySlug(slug)` returns single post
- [ ] All queries return data without errors

### Guide Queries

```tsx
import {
  getGuides,
  getGuidesByCategory,
  getGuideBySlug,
} from '@/lib/sanity.queries'
```

- [ ] `getGuides()` returns all guides
- [ ] `getGuidesByCategory(categoryId)` returns filtered guides
- [ ] `getGuideBySlug(slug)` returns single guide with steps
- [ ] All queries return data without errors

### Resource Queries

```tsx
import {
  getResources,
  getResourcesByCategory,
  getResourceBySlug,
} from '@/lib/sanity.queries'
```

- [ ] `getResources()` returns all resources
- [ ] `getResourcesByCategory(categoryId)` returns filtered resources
- [ ] `getResourceBySlug(slug)` returns single resource
- [ ] All queries return data without errors

### FAQ Queries

```tsx
import {
  getFaqs,
  getFaqsByCategory,
  getFeaturedFaqs,
} from '@/lib/sanity.queries'
```

- [ ] `getFaqs()` returns all FAQs
- [ ] `getFaqsByCategory(categoryId)` returns filtered FAQs
- [ ] `getFeaturedFaqs()` returns featured FAQs only
- [ ] All queries return data without errors

---

## Image Testing

### Image URL Generation

Test in a Next.js page:

```tsx
import { urlFor } from '@/lib/sanity.client'
import {
  getImageUrl,
  getThumbnailUrl,
  getHeroImageUrl,
} from '@/lib/sanity.image'
```

- [ ] `urlFor(image).url()` generates valid URL
- [ ] Generated URL starts with `https://cdn.sanity.io/`
- [ ] `getImageUrl(image, 800, 600)` generates sized URL
- [ ] `getThumbnailUrl(image)` generates thumbnail URL
- [ ] All URLs accessible and return images

### Next.js Image Integration

```tsx
import Image from 'next/image'
import { getNextImageProps } from '@/lib/sanity.image'

const props = getNextImageProps(image, 'Alt text', 800, 600)
```

- [ ] `getNextImageProps()` returns valid props object
- [ ] Image component renders without errors
- [ ] Images load successfully
- [ ] Blur placeholder appears before image loads
- [ ] Images are optimized (check Network tab, should be WebP/AVIF)

---

## Webhook & Revalidation

### Webhook Setup

- [ ] Logged into Sanity dashboard
- [ ] Navigated to API → Webhooks
- [ ] Created new webhook with:
  - [ ] URL: `https://your-domain.com/api/revalidate` (or localhost for testing)
  - [ ] Dataset: `production`
  - [ ] Trigger: Create, Update, Delete
  - [ ] Secret: Value from `SANITY_REVALIDATE_SECRET`
- [ ] Saved webhook

### Webhook Testing

- [ ] Updated a blog post in Sanity
- [ ] Checked server logs for webhook receipt
- [ ] Verified webhook signature validation passed
- [ ] Checked revalidation was triggered
- [ ] Verified content updated on site within 2 seconds

### Manual Revalidation

```bash
curl -X GET "http://localhost:3000/api/revalidate?path=/resources" \
  -H "Authorization: Bearer YOUR_WEBHOOK_SECRET"
```

- [ ] Manual revalidation request succeeds (200 status)
- [ ] Returns JSON with `revalidated: true`
- [ ] Content updates after manual revalidation

---

## Performance Testing

### Image Optimization

- [ ] Images served in WebP or AVIF format
- [ ] Multiple image sizes generated (check srcset)
- [ ] Images cached properly (check cache headers)
- [ ] Image load time <500ms
- [ ] No console errors related to images

### Query Performance

- [ ] Initial query response time <200ms
- [ ] Cached query response time <50ms
- [ ] No query timeout errors
- [ ] No rate limiting errors

### Page Performance

Using Lighthouse or similar tool:

- [ ] First Contentful Paint <1.5s
- [ ] Largest Contentful Paint <2.5s
- [ ] Cumulative Layout Shift <0.1
- [ ] Performance score >90

---

## Error Handling

### Missing Environment Variables

- [ ] App shows clear error if `NEXT_PUBLIC_SANITY_PROJECT_ID` missing
- [ ] App shows clear error if `NEXT_PUBLIC_SANITY_DATASET` missing
- [ ] Error messages are helpful

### Missing Content

- [ ] App handles missing blog post gracefully (404 page)
- [ ] App handles missing category gracefully
- [ ] App handles missing author gracefully
- [ ] No unhandled promise rejections

### Invalid Webhooks

- [ ] Webhook with invalid signature is rejected (403/401)
- [ ] Webhook with invalid payload is rejected (400)
- [ ] Errors are logged appropriately

---

## TypeScript

### Type Safety

- [ ] No TypeScript errors in schema files
- [ ] No TypeScript errors in query files
- [ ] No TypeScript errors in image utility files
- [ ] IDE autocomplete works for query results
- [ ] IDE autocomplete works for image functions

### Type Guards

```tsx
import { hasImage, getImageAlt } from '@/lib/sanity.image'
```

- [ ] `hasImage()` correctly identifies valid images
- [ ] `getImageAlt()` returns alt text or empty string
- [ ] No runtime errors from type guards

---

## Documentation

### Files Present

- [ ] `SANITY_CMS_SETUP.md` exists and is readable
- [ ] `SANITY_USAGE_EXAMPLES.md` exists and is readable
- [ ] `SANITY_CMS_IMPLEMENTATION.md` exists and is readable
- [ ] `SANITY_QUICK_REFERENCE.md` exists and is readable
- [ ] `CMS_INTEGRATION_COMPLETE.md` exists and is readable

### Documentation Quality

- [ ] Setup instructions are clear and complete
- [ ] Code examples are accurate and working
- [ ] Environment variables documented
- [ ] Troubleshooting section is helpful

---

## Production Readiness

### Security

- [ ] Webhook secret is strong (32+ characters)
- [ ] API token has minimum required permissions
- [ ] Environment variables not committed to git
- [ ] `.env.local` in `.gitignore`
- [ ] CSP headers include Sanity CDN
- [ ] Webhook signature verification enabled

### Performance

- [ ] ISR configured with appropriate revalidate times
- [ ] Images optimized with CDN
- [ ] Queries efficient and cached
- [ ] No N+1 query problems

### Monitoring

- [ ] Webhook logs are accessible
- [ ] Error tracking configured (Sentry, etc.)
- [ ] Performance monitoring configured
- [ ] Alert system for failed webhooks

### Deployment

- [ ] Environment variables set in production
- [ ] Webhook URL points to production domain
- [ ] Sanity Studio accessible (embedded or standalone)
- [ ] Content team trained on Sanity Studio

---

## Sign-Off

### Technical Lead

- [ ] Code reviewed
- [ ] Architecture approved
- [ ] Performance acceptable
- [ ] Security validated

**Name**: ________________
**Date**: ________________
**Signature**: ________________

### Product Owner

- [ ] Features complete
- [ ] Documentation acceptable
- [ ] Ready for content creation

**Name**: ________________
**Date**: ________________
**Signature**: ________________

### DevOps Lead

- [ ] Environment configured
- [ ] Monitoring set up
- [ ] Backups configured
- [ ] Ready for production

**Name**: ________________
**Date**: ________________
**Signature**: ________________

---

## Issues Found

Document any issues discovered during verification:

| # | Issue | Severity | Status | Assigned To | Notes |
|---|-------|----------|--------|-------------|-------|
| 1 |       |          |        |             |       |
| 2 |       |          |        |             |       |
| 3 |       |          |        |             |       |

---

## Completion

- [ ] All checklist items verified
- [ ] All critical issues resolved
- [ ] Documentation reviewed and approved
- [ ] Team trained on Sanity Studio
- [ ] Ready for production deployment

**Verification Date**: ________________
**Verified By**: ________________

---

**Last Updated**: 2026-01-02
**Version**: 1.0.0
