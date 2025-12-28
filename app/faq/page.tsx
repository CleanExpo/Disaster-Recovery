import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';
import { FAQCategory } from '@prisma/client';
import { generateFAQSchema } from '@/lib/seo/schema-generator';

export const metadata: Metadata = {
  title: 'Disaster Recovery FAQs | Common Questions Answered | NRPG',
  description:
    'Find answers to common questions about disaster recovery, emergency response, insurance claims, pricing, and contractor services across Australia.',
  keywords: [
    'disaster recovery faq',
    'emergency response questions',
    'insurance claim help',
    'restoration costs',
    'contractor questions',
  ],
};

const categoryLabels: Record<FAQCategory, string> = {
  EMERGENCY_RESPONSE: 'Emergency Response',
  PRICING_QUOTES: 'Pricing & Quotes',
  INSURANCE_CLAIMS: 'Insurance Claims',
  SERVICE_SPECIFIC: 'Service-Specific Questions',
  CONTRACTOR_NETWORK: 'Contractor Network',
  PLATFORM_USAGE: 'Platform Usage',
  PREVENTION_TIPS: 'Prevention Tips',
  SAFETY_HEALTH: 'Safety & Health',
};

const categoryIcons: Record<FAQCategory, string> = {
  EMERGENCY_RESPONSE: '🚨',
  PRICING_QUOTES: '💰',
  INSURANCE_CLAIMS: '📋',
  SERVICE_SPECIFIC: '🔧',
  CONTRACTOR_NETWORK: '👷',
  PLATFORM_USAGE: '💻',
  PREVENTION_TIPS: '🛡️',
  SAFETY_HEALTH: '⚕️',
};

interface FAQPageProps {
  searchParams: {
    category?: string;
    search?: string;
  };
}

async function getFAQs(category?: FAQCategory, search?: string) {
  const where = {
    isPublished: true,
    ...(category && { category }),
    ...(search && {
      OR: [
        { question: { contains: search, mode: 'insensitive' as const } },
        { answer: { contains: search, mode: 'insensitive' as const } },
        { tags: { has: search } },
      ],
    }),
  };

  const [faqs, categoryCount] = await Promise.all([
    prisma.fAQ.findMany({
      where,
      orderBy: [{ order: 'asc' }, { helpful: 'desc' }],
      take: 500, // Limit to 500 FAQs
    }),
    // Get count per category for stats
    prisma.fAQ.groupBy({
      by: ['category'],
      where: { isPublished: true },
      _count: true,
    }),
  ]);

  const categoryCounts = Object.fromEntries(
    categoryCount.map((item) => [item.category, item._count])
  );

  return { faqs, categoryCounts };
}

export default async function FAQPage({ searchParams }: FAQPageProps) {
  const category = searchParams.category as FAQCategory | undefined;
  const search = searchParams.search;

  const { faqs, categoryCounts } = await getFAQs(category, search);

  // Group FAQs by category for display
  const groupedFAQs = faqs.reduce((acc, faq) => {
    if (!acc[faq.category]) {
      acc[faq.category] = [];
    }
    acc[faq.category].push(faq);
    return acc;
  }, {} as Record<FAQCategory, typeof faqs>);

  // Generate FAQ schema for all FAQs
  const faqSchema = generateFAQSchema(
    faqs.slice(0, 50).map((faq) => ({
      question: faq.question,
      answer: faq.answer,
    }))
  );

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />

      <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
        {/* Hero Section */}
        <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold mb-4">
              Frequently Asked Questions
            </h1>
            <p className="text-xl text-blue-100 max-w-3xl">
              Find answers to common questions about disaster recovery,
              emergency response, insurance claims, and contractor services.
            </p>

            {/* Search Bar */}
            <form method="GET" className="mt-8 max-w-2xl">
              <div className="flex gap-2">
                <input
                  type="text"
                  name="search"
                  defaultValue={search}
                  placeholder="Search FAQs..."
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
          <div className="mb-12">
            <h2 className="text-lg font-semibold text-gray-700 mb-4">
              Browse by Category
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {Object.entries(categoryLabels).map(([key, label]) => {
                const count = categoryCounts[key as FAQCategory] || 0;
                return (
                  <Link
                    key={key}
                    href={`/faq?category=${key}`}
                    className={`flex flex-col items-center p-6 rounded-lg border-2 transition-all ${
                      category === key
                        ? 'border-blue-600 bg-blue-50'
                        : 'border-gray-200 bg-white hover:border-blue-300'
                    }`}
                  >
                    <span className="text-4xl mb-2">
                      {categoryIcons[key as FAQCategory]}
                    </span>
                    <span
                      className={`font-semibold text-center ${
                        category === key ? 'text-blue-600' : 'text-gray-900'
                      }`}
                    >
                      {label}
                    </span>
                    <span className="text-sm text-gray-500 mt-1">
                      {count} questions
                    </span>
                  </Link>
                );
              })}
            </div>
            {category && (
              <div className="mt-4">
                <Link
                  href="/faq"
                  className="text-blue-600 hover:text-blue-700 font-medium"
                >
                  ← View All Categories
                </Link>
              </div>
            )}
          </div>

          {/* FAQ Display */}
          {faqs.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-gray-600 text-lg">
                No FAQs found. Try adjusting your search or filters.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {Object.entries(groupedFAQs).map(([cat, categoryFAQs]) => (
                <section key={cat} id={cat}>
                  <div className="flex items-center gap-3 mb-6">
                    <span className="text-3xl">
                      {categoryIcons[cat as FAQCategory]}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-900">
                      {categoryLabels[cat as FAQCategory]}
                    </h2>
                    <span className="text-gray-500">
                      ({categoryFAQs.length})
                    </span>
                  </div>

                  <div className="space-y-4">
                    {categoryFAQs.map((faq) => (
                      <details
                        key={faq.id}
                        className="group bg-white rounded-lg shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow"
                      >
                        <summary className="font-semibold text-lg text-gray-900 cursor-pointer list-none p-6 flex items-start justify-between gap-4">
                          <span className="flex-1">{faq.question}</span>
                          <div className="flex items-center gap-4 flex-shrink-0">
                            {faq.viewCount > 0 && (
                              <span className="text-xs text-gray-500">
                                {faq.viewCount} views
                              </span>
                            )}
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
                          </div>
                        </summary>
                        <div className="px-6 pb-6">
                          <div className="pt-4 border-t">
                            <div className="text-gray-700 leading-relaxed whitespace-pre-line">
                              {faq.answer}
                            </div>
                            {faq.tags.length > 0 && (
                              <div className="flex flex-wrap gap-2 mt-4">
                                {faq.tags.map((tag) => (
                                  <span
                                    key={tag}
                                    className="text-xs px-2 py-1 bg-blue-50 text-blue-700 rounded"
                                  >
                                    {tag}
                                  </span>
                                ))}
                              </div>
                            )}
                            <div className="flex items-center gap-4 mt-4 pt-4 border-t">
                              <span className="text-sm text-gray-600">
                                Was this helpful?
                              </span>
                              <button
                                onClick={async () => {
                                  await fetch(`/api/faq/${faq.id}/helpful`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ helpful: true }),
                                  });
                                }}
                                className="text-sm text-green-600 hover:text-green-700 font-medium"
                              >
                                👍 Yes ({faq.helpful})
                              </button>
                              <button
                                onClick={async () => {
                                  await fetch(`/api/faq/${faq.id}/helpful`, {
                                    method: 'POST',
                                    headers: { 'Content-Type': 'application/json' },
                                    body: JSON.stringify({ helpful: false }),
                                  });
                                }}
                                className="text-sm text-red-600 hover:text-red-700 font-medium"
                              >
                                👎 No ({faq.notHelpful})
                              </button>
                            </div>
                          </div>
                        </div>
                      </details>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          )}

          {/* CTA Section */}
          <section className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Still Have Questions?
            </h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Can't find what you're looking for? Our team is here to help 24/7.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/contact"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Contact Support
              </Link>
              <Link
                href="/request-service"
                className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                Request Service
              </Link>
              <Link
                href="/blog"
                className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                Read Our Blog
              </Link>
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
