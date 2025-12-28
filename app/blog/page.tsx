import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';
import { BlogCategory, PostStatus } from '@prisma/client';
import { generateBlogListingSchema } from '@/lib/seo/schema-generator';

interface BlogPageProps {
  searchParams: {
    category?: string;
    page?: string;
    search?: string;
  };
}

export const metadata: Metadata = {
  title: 'Disaster Recovery Blog | Expert Guides & Resources | NRPG',
  description: 'Expert guides on emergency response, insurance claims, prevention tips, and disaster recovery insights for Australian property owners and contractors.',
  openGraph: {
    title: 'Disaster Recovery Blog | NRPG',
    description: 'Expert guides on emergency response, insurance claims, and disaster recovery.',
    type: 'website',
  },
};

const POSTS_PER_PAGE = 10;

const categoryLabels: Record<BlogCategory, string> = {
  EMERGENCY_GUIDE: 'Emergency Response Guides',
  INSURANCE_CLAIM: 'Insurance Claims Assistance',
  PREVENTION: 'Prevention & Maintenance',
  INDUSTRY_INSIGHT: 'Industry Insights',
  CASE_STUDY: 'Case Studies',
  RESOURCE: 'Resources & Tools',
};

const categoryDescriptions: Record<BlogCategory, string> = {
  EMERGENCY_GUIDE: 'Immediate action guides for flood, fire, and storm damage emergencies',
  INSURANCE_CLAIM: 'Navigate insurance claims with confidence - from filing to approval',
  PREVENTION: 'Protect your property with preventative maintenance tips',
  INDUSTRY_INSIGHT: 'Professional insights and contractor empowerment resources',
  CASE_STUDY: 'Real success stories from property owners and restoration projects',
  RESOURCE: 'Calculators, checklists, and downloadable resources',
};

async function getBlogPosts(
  page: number,
  category?: BlogCategory,
  search?: string
) {
  const skip = (page - 1) * POSTS_PER_PAGE;

  const where = {
    status: PostStatus.PUBLISHED,
    ...(category && { category }),
    ...(search && {
      OR: [
        { title: { contains: search, mode: 'insensitive' as const } },
        { excerpt: { contains: search, mode: 'insensitive' as const } },
        { tags: { has: search } },
      ],
    }),
  };

  const [posts, totalCount, featuredPosts] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      skip,
      take: POSTS_PER_PAGE,
      select: {
        id: true,
        title: true,
        slug: true,
        excerpt: true,
        category: true,
        tags: true,
        authorName: true,
        publishedAt: true,
        viewCount: true,
        isFeatured: true,
        featuredImage: true,
      },
    }),
    prisma.blogPost.count({ where }),
    // Get featured posts only on first page and without filters
    page === 1 && !category && !search
      ? prisma.blogPost.findMany({
          where: {
            status: PostStatus.PUBLISHED,
            isFeatured: true,
          },
          orderBy: { publishedAt: 'desc' },
          take: 3,
          select: {
            id: true,
            title: true,
            slug: true,
            excerpt: true,
            category: true,
            tags: true,
            authorName: true,
            publishedAt: true,
            featuredImage: true,
          },
        })
      : Promise.resolve([]),
  ]);

  const totalPages = Math.ceil(totalCount / POSTS_PER_PAGE);

  return { posts, totalPages, totalCount, featuredPosts };
}

export default async function BlogPage({ searchParams }: BlogPageProps) {
  const page = Number(searchParams.page) || 1;
  const category = searchParams.category as BlogCategory | undefined;
  const search = searchParams.search;

  // Validate category
  if (category && !Object.values(BlogCategory).includes(category)) {
    notFound();
  }

  const { posts, totalPages, totalCount, featuredPosts } = await getBlogPosts(
    page,
    category,
    search
  );

  const schema = generateBlogListingSchema({
    posts: posts.map((post) => ({
      title: post.title,
      url: `https://nrpg.com.au/blog/${post.slug}`,
      datePublished: post.publishedAt?.toISOString() || '',
      author: post.authorName,
      description: post.excerpt,
    })),
  });

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Disaster Recovery Knowledge Hub
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Expert guides, resources, and insights to help you prepare for,
              respond to, and recover from disaster events across Australia.
            </p>

            {/* Search Bar */}
            <form method="GET" className="mt-8 max-w-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="search"
                  defaultValue={search}
                  placeholder="Search articles..."
                  className="flex-1 px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-400"
                />
                <button
                  type="submit"
                  className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
                >
                  Search
                </button>
              </div>
            </form>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          {/* Category Filter */}
          <div className="mb-8">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Browse by Category
            </h2>
            <div className="flex flex-wrap gap-2">
              <Link
                href="/blog"
                className={`px-4 py-2 rounded-full transition-colors ${
                  !category
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All Articles ({totalCount})
              </Link>
              {Object.entries(categoryLabels).map(([key, label]) => (
                <Link
                  key={key}
                  href={`/blog?category=${key}`}
                  className={`px-4 py-2 rounded-full transition-colors ${
                    category === key
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {label}
                </Link>
              ))}
            </div>
            {category && (
              <p className="mt-4 text-gray-600">
                {categoryDescriptions[category]}
              </p>
            )}
          </div>

          {/* Featured Posts */}
          {featuredPosts.length > 0 && (
            <section className="mb-12">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                Featured Articles
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {featuredPosts.map((post) => (
                  <Link
                    key={post.id}
                    href={`/blog/${post.slug}`}
                    className="group block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {post.featuredImage && (
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img
                          src={post.featuredImage}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-6">
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-xs font-semibold text-blue-600 uppercase">
                          {categoryLabels[post.category]}
                        </span>
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                        {post.title}
                      </h3>
                      <p className="text-gray-600 text-sm mb-4 line-clamp-3">
                        {post.excerpt}
                      </p>
                      <div className="flex items-center justify-between text-xs text-gray-500">
                        <span>{post.authorName}</span>
                        <time dateTime={post.publishedAt?.toISOString()}>
                          {post.publishedAt?.toLocaleDateString('en-AU', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                          })}
                        </time>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* Blog Posts List */}
          <section>
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              {category ? `${categoryLabels[category]}` : 'Latest Articles'}
            </h2>

            {posts.length === 0 ? (
              <div className="text-center py-12">
                <p className="text-gray-600 text-lg">
                  No articles found. Try adjusting your search or filters.
                </p>
              </div>
            ) : (
              <div className="space-y-6">
                {posts.map((post) => (
                  <article
                    key={post.id}
                    className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
                  >
                    <div className="flex flex-col md:flex-row gap-6">
                      {post.featuredImage && (
                        <Link
                          href={`/blog/${post.slug}`}
                          className="md:w-64 flex-shrink-0"
                        >
                          <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                            <img
                              src={post.featuredImage}
                              alt={post.title}
                              className="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
                            />
                          </div>
                        </Link>
                      )}
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-2">
                          <span className="text-xs font-semibold text-blue-600 uppercase">
                            {categoryLabels[post.category]}
                          </span>
                        </div>
                        <Link href={`/blog/${post.slug}`}>
                          <h3 className="text-2xl font-bold text-gray-900 mb-2 hover:text-blue-600 transition-colors">
                            {post.title}
                          </h3>
                        </Link>
                        <p className="text-gray-600 mb-4 line-clamp-2">
                          {post.excerpt}
                        </p>
                        <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                          <span>By {post.authorName}</span>
                          <time dateTime={post.publishedAt?.toISOString()}>
                            {post.publishedAt?.toLocaleDateString('en-AU', {
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric',
                            })}
                          </time>
                          <span>{post.viewCount} views</span>
                        </div>
                        {post.tags.length > 0 && (
                          <div className="flex flex-wrap gap-2 mt-4">
                            {post.tags.map((tag) => (
                              <span
                                key={tag}
                                className="text-xs px-2 py-1 bg-gray-100 text-gray-600 rounded"
                              >
                                {tag}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-12 flex justify-center items-center gap-2">
                {page > 1 && (
                  <Link
                    href={`/blog?${new URLSearchParams({
                      ...(category && { category }),
                      ...(search && { search }),
                      page: String(page - 1),
                    })}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Previous
                  </Link>
                )}

                {Array.from({ length: totalPages }, (_, i) => i + 1)
                  .filter(
                    (p) =>
                      p === 1 ||
                      p === totalPages ||
                      (p >= page - 2 && p <= page + 2)
                  )
                  .map((p, idx, arr) => {
                    if (idx > 0 && arr[idx - 1] !== p - 1) {
                      return (
                        <span key={`ellipsis-${p}`} className="px-2">
                          ...
                        </span>
                      );
                    }
                    return (
                      <Link
                        key={p}
                        href={`/blog?${new URLSearchParams({
                          ...(category && { category }),
                          ...(search && { search }),
                          page: String(p),
                        })}`}
                        className={`px-4 py-2 rounded-lg transition-colors ${
                          p === page
                            ? 'bg-blue-600 text-white'
                            : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                        }`}
                      >
                        {p}
                      </Link>
                    );
                  })}

                {page < totalPages && (
                  <Link
                    href={`/blog?${new URLSearchParams({
                      ...(category && { category }),
                      ...(search && { search }),
                      page: String(page + 1),
                    })}`}
                    className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                  >
                    Next
                  </Link>
                )}
              </div>
            )}
          </section>

          {/* CTA Section */}
          <section className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Immediate Assistance?
            </h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Connect with verified disaster recovery contractors across
              Australia. Available 24/7 for emergency response.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/request-service"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Request Service Now
              </Link>
              <Link
                href="/faq"
                className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                Browse FAQs
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
