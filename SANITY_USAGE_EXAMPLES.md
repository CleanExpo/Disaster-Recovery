# Sanity CMS Usage Examples

Practical examples for integrating Sanity CMS content into your Next.js pages.

## Table of Contents

1. [Blog Listing Page](#blog-listing-page)
2. [Single Blog Post Page](#single-blog-post-page)
3. [Guide Listing Page](#guide-listing-page)
4. [Single Guide Page](#single-guide-page)
5. [Resource Center](#resource-center)
6. [FAQ Section](#faq-section)
7. [Homepage Featured Content](#homepage-featured-content)
8. [Category Pages](#category-pages)
9. [Rich Text Rendering](#rich-text-rendering)
10. [Image Components](#image-components)

---

## Blog Listing Page

`app/resources/page.tsx`:

```tsx
import { getBlogPosts, getCategories } from '@/lib/sanity.queries'
import { BlogCard } from '@/components/blog/BlogCard'
import { CategoryFilter } from '@/components/blog/CategoryFilter'

export const revalidate = 3600 // Revalidate every hour

export default async function ResourcesPage() {
  const [posts, categories] = await Promise.all([
    getBlogPosts(),
    getCategories(),
  ])

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Resources & Guides</h1>

      <CategoryFilter categories={categories} />

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-8">
        {posts.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  )
}
```

---

## Single Blog Post Page

`app/resources/[slug]/page.tsx`:

```tsx
import { getBlogPostBySlug, getBlogPostSlugs } from '@/lib/sanity.queries'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { getNextImageProps } from '@/lib/sanity.image'
import { format } from 'date-fns'

// Generate static paths for ISR
export async function generateStaticParams() {
  const slugs = await getBlogPostSlugs()
  return slugs.map((slug) => ({ slug }))
}

// Revalidate on-demand via webhook
export const revalidate = 0

export default async function BlogPostPage({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    notFound()
  }

  const imageProps = getNextImageProps(
    post.featuredImage,
    post.featuredImage.alt,
    1200,
    600,
    true // priority loading for hero image
  )

  return (
    <article className="container mx-auto px-4 py-12 max-w-4xl">
      {/* Hero Image */}
      <div className="relative w-full h-96 mb-8 rounded-lg overflow-hidden">
        <Image {...imageProps} className="object-cover" fill />
      </div>

      {/* Post Header */}
      <header className="mb-8">
        <h1 className="text-5xl font-bold mb-4">{post.title}</h1>

        <div className="flex items-center gap-4 text-gray-600">
          <div className="flex items-center gap-2">
            {post.author.image && (
              <Image
                src={urlFor(post.author.image).width(40).height(40).url()}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full"
              />
            )}
            <span>{post.author.name}</span>
          </div>

          <span>•</span>
          <time dateTime={post.publishedAt}>
            {format(new Date(post.publishedAt), 'MMMM dd, yyyy')}
          </time>

          {post.readTime && (
            <>
              <span>•</span>
              <span>{post.readTime} min read</span>
            </>
          )}
        </div>
      </header>

      {/* Post Content */}
      <div className="prose prose-lg max-w-none">
        <PortableText value={post.body} />
      </div>

      {/* Tags */}
      {post.tags && post.tags.length > 0 && (
        <div className="mt-12 pt-8 border-t">
          <h3 className="text-sm font-semibold mb-4">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {post.tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 bg-gray-100 rounded-full text-sm"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      )}
    </article>
  )
}

// SEO Metadata
export async function generateMetadata({
  params,
}: {
  params: { slug: string }
}) {
  const post = await getBlogPostBySlug(params.slug)

  if (!post) {
    return {}
  }

  return {
    title: post.seo?.metaTitle || post.title,
    description: post.seo?.metaDescription || post.excerpt,
    keywords: post.seo?.keywords,
    openGraph: {
      title: post.title,
      description: post.excerpt,
      images: [
        {
          url: urlFor(post.featuredImage).width(1200).height(630).url(),
          width: 1200,
          height: 630,
          alt: post.featuredImage.alt,
        },
      ],
    },
  }
}
```

---

## Guide Listing Page

`app/guides/page.tsx`:

```tsx
import { getGuides } from '@/lib/sanity.queries'
import { GuideCard } from '@/components/guides/GuideCard'

export const revalidate = 3600

export default async function GuidesPage() {
  const guides = await getGuides()

  // Group guides by difficulty
  const beginnerGuides = guides.filter((g) => g.difficulty === 'beginner')
  const intermediateGuides = guides.filter((g) => g.difficulty === 'intermediate')
  const advancedGuides = guides.filter((g) => g.difficulty === 'advanced')

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4">Step-by-Step Guides</h1>
      <p className="text-xl text-gray-600 mb-12">
        Learn disaster recovery techniques with our comprehensive guides
      </p>

      {/* Beginner Guides */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Beginner Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {beginnerGuides.map((guide) => (
            <GuideCard key={guide._id} guide={guide} />
          ))}
        </div>
      </section>

      {/* Intermediate Guides */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6">Intermediate Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {intermediateGuides.map((guide) => (
            <GuideCard key={guide._id} guide={guide} />
          ))}
        </div>
      </section>

      {/* Advanced Guides */}
      <section>
        <h2 className="text-2xl font-bold mb-6">Advanced Guides</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {advancedGuides.map((guide) => (
            <GuideCard key={guide._id} guide={guide} />
          ))}
        </div>
      </section>
    </div>
  )
}
```

---

## Single Guide Page

`app/guides/[slug]/page.tsx`:

```tsx
import { getGuideBySlug, getGuideSlugs } from '@/lib/sanity.queries'
import { notFound } from 'next/navigation'
import { PortableText } from '@portabletext/react'
import Image from 'next/image'
import { getNextImageProps } from '@/lib/sanity.image'
import { Download, Clock, AlertTriangle, Lightbulb } from 'lucide-react'

export async function generateStaticParams() {
  const slugs = await getGuideSlugs()
  return slugs.map((slug) => ({ slug }))
}

export const revalidate = 0

export default async function GuidePage({
  params,
}: {
  params: { slug: string }
}) {
  const guide = await getGuideBySlug(params.slug)

  if (!guide) {
    notFound()
  }

  const difficultyColors = {
    beginner: 'bg-green-100 text-green-800',
    intermediate: 'bg-yellow-100 text-yellow-800',
    advanced: 'bg-red-100 text-red-800',
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-5xl">
      {/* Hero Section */}
      <div className="mb-12">
        <div className="flex items-center gap-4 mb-4">
          <span
            className={`px-3 py-1 rounded-full text-sm font-semibold ${
              difficultyColors[guide.difficulty]
            }`}
          >
            {guide.difficulty}
          </span>
          <span className="flex items-center gap-1 text-gray-600">
            <Clock className="w-4 h-4" />
            {guide.estimatedTime}
          </span>
        </div>

        <h1 className="text-5xl font-bold mb-4">{guide.title}</h1>
        <p className="text-xl text-gray-600 mb-6">{guide.description}</p>

        {/* Hero Image */}
        {guide.featuredImage && (
          <div className="relative w-full h-96 rounded-lg overflow-hidden">
            <Image
              {...getNextImageProps(guide.featuredImage, guide.title, 1200, 600, true)}
              className="object-cover"
              fill
            />
          </div>
        )}
      </div>

      {/* Required Tools */}
      {guide.requiredTools && guide.requiredTools.length > 0 && (
        <div className="bg-blue-50 p-6 rounded-lg mb-12">
          <h2 className="text-xl font-bold mb-4">Required Tools & Materials</h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {guide.requiredTools.map((tool, index) => (
              <li key={index} className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-500 rounded-full" />
                {tool}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Steps */}
      <div className="mb-12">
        <h2 className="text-3xl font-bold mb-8">Step-by-Step Instructions</h2>

        {guide.steps.map((step, index) => (
          <div key={index} className="mb-10">
            <div className="flex items-center gap-4 mb-4">
              <span className="flex items-center justify-center w-10 h-10 bg-blue-500 text-white rounded-full font-bold">
                {step.stepNumber}
              </span>
              <h3 className="text-2xl font-bold">{step.title}</h3>
            </div>

            {/* Step Image */}
            {step.image && (
              <div className="relative w-full h-64 mb-4 rounded-lg overflow-hidden">
                <Image
                  {...getNextImageProps(step.image, step.title, 800, 400)}
                  className="object-cover"
                  fill
                />
              </div>
            )}

            {/* Step Description */}
            <div className="prose prose-lg mb-4">
              <PortableText value={step.description} />
            </div>

            {/* Tips */}
            {step.tips && step.tips.length > 0 && (
              <div className="bg-green-50 p-4 rounded-lg mb-4">
                <div className="flex items-center gap-2 mb-2">
                  <Lightbulb className="w-5 h-5 text-green-600" />
                  <h4 className="font-semibold text-green-800">Tips</h4>
                </div>
                <ul className="space-y-1">
                  {step.tips.map((tip, tipIndex) => (
                    <li key={tipIndex} className="text-green-700 text-sm">
                      {tip}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Warnings */}
            {step.warnings && step.warnings.length > 0 && (
              <div className="bg-red-50 p-4 rounded-lg">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                  <h4 className="font-semibold text-red-800">Warnings</h4>
                </div>
                <ul className="space-y-1">
                  {step.warnings.map((warning, warnIndex) => (
                    <li key={warnIndex} className="text-red-700 text-sm">
                      {warning}
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Downloads */}
      {guide.downloads && guide.downloads.length > 0 && (
        <div className="bg-gray-50 p-6 rounded-lg mb-12">
          <h2 className="text-2xl font-bold mb-6">Downloadable Resources</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {guide.downloads.map((download, index) => (
              <a
                key={index}
                href={download.file.asset.url}
                download
                className="flex items-center gap-4 p-4 bg-white rounded-lg hover:shadow-md transition-shadow"
              >
                <Download className="w-6 h-6 text-blue-500" />
                <div>
                  <h3 className="font-semibold">{download.title}</h3>
                  {download.description && (
                    <p className="text-sm text-gray-600">{download.description}</p>
                  )}
                  <span className="text-xs text-gray-500 uppercase">
                    {download.fileType}
                  </span>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* Related Guides */}
      {guide.relatedGuides && guide.relatedGuides.length > 0 && (
        <div>
          <h2 className="text-2xl font-bold mb-6">Related Guides</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {guide.relatedGuides.map((relatedGuide) => (
              <a
                key={relatedGuide.slug.current}
                href={`/guides/${relatedGuide.slug.current}`}
                className="p-4 bg-gray-50 rounded-lg hover:shadow-md transition-shadow"
              >
                <h3 className="font-semibold mb-2">{relatedGuide.title}</h3>
                <p className="text-sm text-gray-600 mb-2">
                  {relatedGuide.description}
                </p>
                <span className="text-xs text-gray-500">
                  {relatedGuide.difficulty}
                </span>
              </a>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
```

---

## FAQ Section

`components/faq/FAQSection.tsx`:

```tsx
import { getFaqsByLocation } from '@/lib/sanity.queries'
import { PortableText } from '@portabletext/react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'

export async function FAQSection({ location }: { location: string }) {
  const faqs = await getFaqsByLocation(location)

  if (!faqs || faqs.length === 0) {
    return null
  }

  return (
    <section className="py-12">
      <h2 className="text-3xl font-bold mb-8">Frequently Asked Questions</h2>

      <Accordion type="single" collapsible className="space-y-4">
        {faqs.map((faq, index) => (
          <AccordionItem key={faq._id} value={`item-${index}`}>
            <AccordionTrigger className="text-left">
              {faq.question}
            </AccordionTrigger>
            <AccordionContent>
              <div className="prose">
                <PortableText value={faq.answer} />
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </section>
  )
}
```

---

## Homepage Featured Content

`app/page.tsx`:

```tsx
import { getFeaturedBlogPosts } from '@/lib/sanity.queries'
import { BlogCard } from '@/components/blog/BlogCard'

export const revalidate = 1800 // Revalidate every 30 minutes

export default async function HomePage() {
  const featuredPosts = await getFeaturedBlogPosts()

  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-20">
        <div className="container mx-auto px-4">
          <h1 className="text-5xl font-bold mb-4">
            Disaster Recovery Resources
          </h1>
          <p className="text-xl">
            Expert guidance for every step of your recovery journey
          </p>
        </div>
      </section>

      {/* Featured Articles */}
      {featuredPosts.length > 0 && (
        <section className="py-16">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8">Featured Articles</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {featuredPosts.map((post) => (
                <BlogCard key={post._id} post={post} />
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  )
}
```

---

## Rich Text Rendering

Create a custom PortableText components file:

`components/sanity/PortableTextComponents.tsx`:

```tsx
import Image from 'next/image'
import { urlFor } from '@/lib/sanity.client'
import type { PortableTextComponents } from '@portabletext/react'

export const portableTextComponents: PortableTextComponents = {
  types: {
    image: ({ value }) => {
      return (
        <figure className="my-8">
          <Image
            src={urlFor(value).width(800).url()}
            alt={value.alt || 'Image'}
            width={800}
            height={600}
            className="rounded-lg"
          />
          {value.caption && (
            <figcaption className="mt-2 text-center text-sm text-gray-600">
              {value.caption}
            </figcaption>
          )}
        </figure>
      )
    },
  },
  marks: {
    link: ({ children, value }) => {
      const href = value.href
      const isExternal = href?.startsWith('http')

      return (
        <a
          href={href}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="text-blue-600 hover:underline"
        >
          {children}
        </a>
      )
    },
  },
  block: {
    h2: ({ children }) => (
      <h2 className="text-3xl font-bold mt-12 mb-4">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-2xl font-bold mt-8 mb-3">{children}</h3>
    ),
    h4: ({ children }) => (
      <h4 className="text-xl font-bold mt-6 mb-2">{children}</h4>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-blue-500 pl-4 italic my-6">
        {children}
      </blockquote>
    ),
  },
}

// Usage in your pages:
// import { PortableText } from '@portabletext/react'
// <PortableText value={content} components={portableTextComponents} />
```

---

## Image Components

`components/sanity/SanityImage.tsx`:

```tsx
import Image from 'next/image'
import { getNextImageProps, hasImage } from '@/lib/sanity.image'

interface SanityImageProps {
  image: any
  alt?: string
  width: number
  height?: number
  priority?: boolean
  className?: string
}

export function SanityImage({
  image,
  alt,
  width,
  height,
  priority = false,
  className,
}: SanityImageProps) {
  if (!hasImage(image)) {
    return null
  }

  const imageProps = getNextImageProps(
    image,
    alt || image.alt || '',
    width,
    height,
    priority
  )

  return <Image {...imageProps} className={className} />
}
```

---

These examples provide a complete foundation for integrating Sanity CMS content throughout your Next.js application. Customize as needed for your specific requirements.
