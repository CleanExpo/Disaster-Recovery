import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { BlogCategory, PostStatus, FAQCategory } from '@prisma/client';

export const metadata: Metadata = {
  title: 'Content Management | Admin Dashboard | NRPG',
  description: 'Manage blog posts, FAQs, and case studies for NRPG platform',
};

async function getContentStats() {
  const [blogStats, faqStats, caseStudyStats] = await Promise.all([
    prisma.blogPost.groupBy({
      by: ['status'],
      _count: true,
    }),
    prisma.fAQ.aggregate({
      _count: true,
      where: { isPublished: true },
    }),
    prisma.caseStudy.aggregate({
      _count: true,
      where: { isPublished: true },
    }),
  ]);

  const blogStatusCounts = Object.fromEntries(
    blogStats.map((stat) => [stat.status, stat._count])
  );

  return {
    blog: {
      total:
        (blogStatusCounts.DRAFT || 0) +
        (blogStatusCounts.PUBLISHED || 0) +
        (blogStatusCounts.SCHEDULED || 0) +
        (blogStatusCounts.ARCHIVED || 0),
      published: blogStatusCounts.PUBLISHED || 0,
      draft: blogStatusCounts.DRAFT || 0,
      scheduled: blogStatusCounts.SCHEDULED || 0,
    },
    faq: {
      total: faqStats._count,
    },
    caseStudies: {
      total: caseStudyStats._count,
    },
  };
}

async function getRecentPosts() {
  return prisma.blogPost.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 10,
    select: {
      id: true,
      title: true,
      slug: true,
      status: true,
      category: true,
      publishedAt: true,
      viewCount: true,
      updatedAt: true,
    },
  });
}

async function getRecentFAQs() {
  return prisma.fAQ.findMany({
    orderBy: { updatedAt: 'desc' },
    take: 10,
    select: {
      id: true,
      question: true,
      category: true,
      isPublished: true,
      viewCount: true,
      helpful: true,
      notHelpful: true,
    },
  });
}

const statusColors: Record<PostStatus, string> = {
  DRAFT: 'bg-gray-100 text-gray-800',
  SCHEDULED: 'bg-blue-100 text-blue-800',
  PUBLISHED: 'bg-green-100 text-green-800',
  ARCHIVED: 'bg-red-100 text-red-800',
};

const categoryLabels: Record<BlogCategory, string> = {
  EMERGENCY_GUIDE: 'Emergency Guide',
  INSURANCE_CLAIM: 'Insurance Claim',
  PREVENTION: 'Prevention',
  INDUSTRY_INSIGHT: 'Industry Insight',
  CASE_STUDY: 'Case Study',
  RESOURCE: 'Resource',
};

const faqCategoryLabels: Record<FAQCategory, string> = {
  EMERGENCY_RESPONSE: 'Emergency Response',
  PRICING_QUOTES: 'Pricing & Quotes',
  INSURANCE_CLAIMS: 'Insurance Claims',
  SERVICE_SPECIFIC: 'Service Specific',
  CONTRACTOR_NETWORK: 'Contractor Network',
  PLATFORM_USAGE: 'Platform Usage',
  PREVENTION_TIPS: 'Prevention Tips',
  SAFETY_HEALTH: 'Safety & Health',
};

export default async function ContentManagementPage() {
  const stats = await getContentStats();
  const recentPosts = await getRecentPosts();
  const recentFAQs = await getRecentFAQs();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Content Management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage blog posts, FAQs, and case studies
              </p>
            </div>
            <div className="flex gap-3">
              <Link
                href="/dashboard/admin/content/blog/new"
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                New Blog Post
              </Link>
              <Link
                href="/dashboard/admin/content/faq/new"
                className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
              >
                New FAQ
              </Link>
              <Link
                href="/dashboard/admin/content/case-study/new"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                New Case Study
              </Link>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Blog Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Blog Posts
              </h2>
              <Link
                href="/blog"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Total</span>
                <span className="font-bold text-gray-900">
                  {stats.blog.total}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Published</span>
                <span className="font-bold text-green-600">
                  {stats.blog.published}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Draft</span>
                <span className="font-bold text-gray-600">
                  {stats.blog.draft}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Scheduled</span>
                <span className="font-bold text-blue-600">
                  {stats.blog.scheduled}
                </span>
              </div>
            </div>
          </div>

          {/* FAQ Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">FAQs</h2>
              <Link
                href="/faq"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Published</span>
                <span className="font-bold text-green-600">
                  {stats.faq.total}
                </span>
              </div>
              <div className="mt-4">
                <Link
                  href="/dashboard/admin/content/faq"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Manage FAQs →
                </Link>
              </div>
            </div>
          </div>

          {/* Case Studies Stats */}
          <div className="bg-white rounded-lg shadow-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">
                Case Studies
              </h2>
              <Link
                href="/case-studies"
                className="text-sm text-blue-600 hover:text-blue-700"
              >
                View All →
              </Link>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between">
                <span className="text-gray-600">Published</span>
                <span className="font-bold text-green-600">
                  {stats.caseStudies.total}
                </span>
              </div>
              <div className="mt-4">
                <Link
                  href="/dashboard/admin/content/case-studies"
                  className="text-sm text-blue-600 hover:text-blue-700"
                >
                  Manage Case Studies →
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Recent Blog Posts */}
        <div className="bg-white rounded-lg shadow-md mb-8">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">
              Recent Blog Posts
            </h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Updated
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentPosts.map((post) => (
                  <tr key={post.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div className="text-sm font-medium text-gray-900">
                        {post.title}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {categoryLabels[post.category]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          statusColors[post.status]
                        }`}
                      >
                        {post.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {post.viewCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {post.updatedAt.toLocaleDateString('en-AU')}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Link
                        href={`/blog/${post.slug}`}
                        className="text-blue-600 hover:text-blue-900 mr-3"
                      >
                        View
                      </Link>
                      <Link
                        href={`/dashboard/admin/content/blog/${post.slug}/edit`}
                        className="text-green-600 hover:text-green-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Recent FAQs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="px-6 py-4 border-b">
            <h2 className="text-xl font-semibold text-gray-900">Recent FAQs</h2>
          </div>
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Question
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Views
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Helpful
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {recentFAQs.map((faq) => (
                  <tr key={faq.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4">
                      <div className="text-sm font-medium text-gray-900 line-clamp-1">
                        {faq.question}
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span className="text-sm text-gray-600">
                        {faqCategoryLabels[faq.category]}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                      {faq.viewCount}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <span className="text-green-600">{faq.helpful} 👍</span>
                      <span className="text-gray-400 mx-1">/</span>
                      <span className="text-red-600">{faq.notHelpful} 👎</span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`px-2 py-1 text-xs font-semibold rounded-full ${
                          faq.isPublished
                            ? 'bg-green-100 text-green-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {faq.isPublished ? 'Published' : 'Draft'}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-right text-sm">
                      <Link
                        href={`/dashboard/admin/content/faq/${faq.id}/edit`}
                        className="text-green-600 hover:text-green-900"
                      >
                        Edit
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link
            href="/dashboard/admin/content/calendar"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Editorial Calendar
            </h3>
            <p className="text-sm text-gray-600">
              View and manage your content publishing schedule
            </p>
          </Link>

          <Link
            href="/dashboard/admin/content/analytics"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Content Analytics
            </h3>
            <p className="text-sm text-gray-600">
              Track performance metrics and engagement
            </p>
          </Link>

          <Link
            href="/dashboard/admin/content/generator"
            className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
          >
            <h3 className="text-lg font-semibold text-gray-900 mb-2">
              Content Generator
            </h3>
            <p className="text-sm text-gray-600">
              AI-assisted content creation for blog posts and FAQs
            </p>
          </Link>
        </div>
      </div>
    </div>
  );
}
