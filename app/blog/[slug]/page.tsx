import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { PostStatus, BlogCategory } from '@prisma/client';
import { generateArticleSchema, generateFAQSchema } from '@/lib/seo/schema-generator';

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

const categoryLabels: Record<BlogCategory, string> = {
  EMERGENCY_GUIDE: 'Emergency Response Guides',
  INSURANCE_CLAIM: 'Insurance Claims Assistance',
  PREVENTION: 'Prevention & Maintenance',
  INDUSTRY_INSIGHT: 'Industry Insights',
  CASE_STUDY: 'Case Studies',
  RESOURCE: 'Resources & Tools',
};

async function getBlogPost(slug: string) {
  const post = await prisma.blogPost.findUnique({
    where: { slug, status: PostStatus.PUBLISHED },
    include: {
      faqs: {
        orderBy: { order: 'asc' },
      },
    },
  });

  if (!post) {
    return null;
  }

  // Increment view count
  await prisma.blogPost.update({
    where: { id: post.id },
    data: { viewCount: { increment: 1 } },
  });

  return post;
}

async function getRelatedPosts(category: BlogCategory, currentSlug: string) {
  return prisma.blogPost.findMany({
    where: {
      status: PostStatus.PUBLISHED,
      category,
      slug: { not: currentSlug },
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
    select: {
      id: true,
      title: true,
      slug: true,
      excerpt: true,
      featuredImage: true,
      publishedAt: true,
      authorName: true,
    },
  });
}

export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const post = await getBlogPost(params.slug);

  if (!post) {
    return {
      title: 'Post Not Found',
    };
  }

  return {
    title: post.metaTitle || `${post.title} | NRPG Blog`,
    description: post.metaDescription || post.excerpt,
    keywords: post.keywords,
    authors: [{ name: post.authorName }],
    openGraph: {
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      type: 'article',
      publishedTime: post.publishedAt?.toISOString(),
      authors: [post.authorName],
      images: post.featuredImage ? [{ url: post.featuredImage }] : [],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.metaTitle || post.title,
      description: post.metaDescription || post.excerpt,
      images: post.featuredImage ? [post.featuredImage] : [],
    },
  };
}

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { status: PostStatus.PUBLISHED },
    select: { slug: true },
  });

  return posts.map((post) => ({
    slug: post.slug,
  }));
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const post = await getBlogPost(params.slug);

  if (!post) {
    notFound();
  }

  const relatedPosts = await getRelatedPosts(post.category, post.slug);

  // Generate structured data
  const articleSchema = generateArticleSchema({
    headline: post.title,
    datePublished: post.publishedAt?.toISOString() || '',
    dateModified: post.updatedAt.toISOString(),
    author: post.authorName,
    description: post.excerpt,
    image: post.featuredImage || undefined,
  });

  const faqSchema =
    post.faqs.length > 0
      ? generateFAQSchema(
          post.faqs.map((faq) => ({
            question: faq.question,
            answer: faq.answer,
          }))
        )
      : null;

  // Extract headings for table of contents
  const headingRegex = /<h([2-3]).*?>(.*?)<\/h\1>/g;
  const headings: Array<{ level: number; text: string; id: string }> = [];
  let match;

  while ((match = headingRegex.exec(post.content)) !== null) {
    const level = parseInt(match[1]);
    const text = match[2].replace(/<[^>]*>/g, ''); // Strip HTML tags
    const id = text.toLowerCase().replace(/[^a-z0-9]+/g, '-');
    headings.push({ level, text, id });
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
        />
      )}

      <article className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <Link href="/blog" className="hover:text-blue-600">
                Blog
              </Link>
              <span>/</span>
              <Link
                href={`/blog?category=${post.category}`}
                className="hover:text-blue-600"
              >
                {categoryLabels[post.category]}
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">{post.title}</span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <header className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="container mx-auto px-4 max-w-4xl">
            <div className="mb-4">
              <Link
                href={`/blog?category=${post.category}`}
                className="inline-block text-sm font-semibold text-blue-600 uppercase hover:text-blue-700"
              >
                {categoryLabels[post.category]}
              </Link>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
              {post.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                  <span className="text-blue-600 font-semibold">
                    {post.authorName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-medium text-gray-900">
                    {post.authorName}
                  </div>
                  {post.authorBio && (
                    <div className="text-sm text-gray-500">{post.authorBio}</div>
                  )}
                </div>
              </div>
              <span>•</span>
              <time dateTime={post.publishedAt?.toISOString()}>
                {post.publishedAt?.toLocaleDateString('en-AU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </time>
              <span>•</span>
              <span>{post.viewCount} views</span>
            </div>
            {post.tags.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-6">
                {post.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 bg-blue-100 text-blue-700 text-sm rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        {/* Featured Image */}
        {post.featuredImage && (
          <div className="container mx-auto px-4 max-w-4xl mb-12">
            <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
              <img
                src={post.featuredImage}
                alt={post.title}
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 max-w-7xl">
          <div className="flex flex-col lg:flex-row gap-12">
            {/* Main Content */}
            <div className="flex-1 max-w-4xl">
              {/* Article Content */}
              <div
                className="prose prose-lg max-w-none mb-12"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />

              {/* FAQ Section */}
              {post.faqs.length > 0 && (
                <section className="mb-12 bg-gray-50 rounded-lg p-8">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Frequently Asked Questions
                  </h2>
                  <div className="space-y-6">
                    {post.faqs.map((faq) => (
                      <details
                        key={faq.id}
                        className="group bg-white rounded-lg p-6 shadow-sm"
                      >
                        <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none flex items-center justify-between">
                          <span>{faq.question}</span>
                          <svg
                            className="w-5 h-5 text-gray-500 group-open:rotate-180 transition-transform"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M19 9l-7 7-7-7"
                            />
                          </svg>
                        </summary>
                        <div className="mt-4 text-gray-700 leading-relaxed">
                          {faq.answer}
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              )}

              {/* Social Sharing */}
              <section className="mb-12 flex items-center gap-4 pb-12 border-b">
                <span className="text-gray-700 font-medium">Share:</span>
                <button
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    alert('Link copied to clipboard!');
                  }}
                  className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Copy Link
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(
                    typeof window !== 'undefined' ? window.location.href : ''
                  )}&text=${encodeURIComponent(post.title)}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors"
                >
                  Twitter
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
                    typeof window !== 'undefined' ? window.location.href : ''
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 bg-blue-700 text-white rounded-lg hover:bg-blue-800 transition-colors"
                >
                  LinkedIn
                </a>
              </section>

              {/* Related Articles */}
              {relatedPosts.length > 0 && (
                <section className="mb-12">
                  <h2 className="text-3xl font-bold text-gray-900 mb-6">
                    Related Articles
                  </h2>
                  <div className="grid md:grid-cols-3 gap-6">
                    {relatedPosts.map((relatedPost) => (
                      <Link
                        key={relatedPost.id}
                        href={`/blog/${relatedPost.slug}`}
                        className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                      >
                        {relatedPost.featuredImage && (
                          <div className="aspect-video bg-gray-200 overflow-hidden">
                            <img
                              src={relatedPost.featuredImage}
                              alt={relatedPost.title}
                              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        )}
                        <div className="p-4">
                          <h3 className="font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors line-clamp-2">
                            {relatedPost.title}
                          </h3>
                          <p className="text-sm text-gray-600 line-clamp-2">
                            {relatedPost.excerpt}
                          </p>
                        </div>
                      </Link>
                    ))}
                  </div>
                </section>
              )}

              {/* CTA */}
              <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
                <h2 className="text-2xl font-bold mb-4">
                  Need Professional Assistance?
                </h2>
                <p className="text-blue-100 mb-6">
                  Connect with verified disaster recovery contractors in your
                  area.
                </p>
                <Link
                  href="/request-service"
                  className="inline-block px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Request Service Now
                </Link>
              </section>
            </div>

            {/* Sidebar */}
            <aside className="lg:w-80 flex-shrink-0">
              {/* Table of Contents */}
              {headings.length > 0 && (
                <div className="bg-gray-50 rounded-lg p-6 mb-8 sticky top-4">
                  <h3 className="font-bold text-gray-900 mb-4">
                    Table of Contents
                  </h3>
                  <nav className="space-y-2">
                    {headings.map((heading, index) => (
                      <a
                        key={index}
                        href={`#${heading.id}`}
                        className={`block text-sm text-gray-700 hover:text-blue-600 transition-colors ${
                          heading.level === 3 ? 'ml-4' : ''
                        }`}
                      >
                        {heading.text}
                      </a>
                    ))}
                  </nav>
                </div>
              )}

              {/* Quick Links */}
              <div className="bg-blue-50 rounded-lg p-6">
                <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                <nav className="space-y-3">
                  <Link
                    href="/faq"
                    className="block text-blue-600 hover:text-blue-700"
                  >
                    Browse All FAQs →
                  </Link>
                  <Link
                    href="/case-studies"
                    className="block text-blue-600 hover:text-blue-700"
                  >
                    Success Stories →
                  </Link>
                  <Link
                    href="/resources"
                    className="block text-blue-600 hover:text-blue-700"
                  >
                    Downloadable Resources →
                  </Link>
                  <Link
                    href="/contractors"
                    className="block text-blue-600 hover:text-blue-700"
                  >
                    Find a Contractor →
                  </Link>
                </nav>
              </div>
            </aside>
          </div>
        </div>
      </article>
    </>
  );
}
