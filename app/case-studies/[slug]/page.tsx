import { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { prisma } from '@/lib/db';

interface CaseStudyPageProps {
  params: {
    slug: string;
  };
}

async function getCaseStudy(slug: string) {
  return prisma.caseStudy.findUnique({
    where: { slug, isPublished: true },
  });
}

async function getRelatedCaseStudies(serviceType: string, currentSlug: string) {
  return prisma.caseStudy.findMany({
    where: {
      isPublished: true,
      serviceType: { contains: serviceType, mode: 'insensitive' },
      slug: { not: currentSlug },
    },
    orderBy: { publishedAt: 'desc' },
    take: 3,
  });
}

export async function generateMetadata({
  params,
}: CaseStudyPageProps): Promise<Metadata> {
  const caseStudy = await getCaseStudy(params.slug);

  if (!caseStudy) {
    return {
      title: 'Case Study Not Found',
    };
  }

  return {
    title: caseStudy.metaTitle || `${caseStudy.title} | Case Study | NRPG`,
    description:
      caseStudy.metaDescription ||
      `${caseStudy.customerType} in ${caseStudy.location} - ${caseStudy.serviceType} recovery success story.`,
    openGraph: {
      title: caseStudy.metaTitle || caseStudy.title,
      description: caseStudy.metaDescription || caseStudy.challenge,
      type: 'article',
      images: caseStudy.afterImages[0]
        ? [{ url: caseStudy.afterImages[0] }]
        : [],
    },
  };
}

export async function generateStaticParams() {
  const caseStudies = await prisma.caseStudy.findMany({
    where: { isPublished: true },
    select: { slug: true },
  });

  return caseStudies.map((cs) => ({
    slug: cs.slug,
  }));
}

export default async function CaseStudyPage({ params }: CaseStudyPageProps) {
  const caseStudy = await getCaseStudy(params.slug);

  if (!caseStudy) {
    notFound();
  }

  const relatedCaseStudies = await getRelatedCaseStudies(
    caseStudy.serviceType,
    caseStudy.slug
  );

  // Generate Review schema
  const reviewSchema = {
    '@context': 'https://schema.org',
    '@type': 'Review',
    itemReviewed: {
      '@type': 'Service',
      name: caseStudy.serviceType,
    },
    reviewRating: caseStudy.customerRating
      ? {
          '@type': 'Rating',
          ratingValue: caseStudy.customerRating,
          bestRating: 5,
        }
      : undefined,
    author: {
      '@type': 'Person',
      name: caseStudy.customerName,
    },
    reviewBody: caseStudy.testimonial,
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(reviewSchema) }}
      />

      <article className="min-h-screen bg-white">
        {/* Breadcrumbs */}
        <div className="bg-gray-50 border-b">
          <div className="container mx-auto px-4 py-3">
            <nav className="flex items-center gap-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600">
                Home
              </Link>
              <span>/</span>
              <Link href="/case-studies" className="hover:text-blue-600">
                Case Studies
              </Link>
              <span>/</span>
              <span className="text-gray-900 font-medium">
                {caseStudy.title}
              </span>
            </nav>
          </div>
        </div>

        {/* Hero Section */}
        <header className="bg-gradient-to-b from-blue-50 to-white py-12">
          <div className="container mx-auto px-4 max-w-6xl">
            <div className="flex items-center gap-4 mb-4">
              <span className="px-3 py-1 bg-blue-100 text-blue-700 text-sm font-semibold rounded-full">
                {caseStudy.serviceType}
              </span>
              <span className="text-sm text-gray-600">{caseStudy.location}</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              {caseStudy.title}
            </h1>
            <p className="text-xl text-gray-600 mb-6">
              {caseStudy.customerType} •{' '}
              {caseStudy.incidentDate.toLocaleDateString('en-AU', {
                year: 'numeric',
                month: 'long',
              })}
            </p>

            {/* Key Metrics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {caseStudy.responseTime && (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="text-2xl font-bold text-blue-600">
                    {Math.round(caseStudy.responseTime / 60)}h
                  </div>
                  <div className="text-sm text-gray-600">Response Time</div>
                </div>
              )}
              {caseStudy.completionTime && (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="text-2xl font-bold text-green-600">
                    {caseStudy.completionTime} days
                  </div>
                  <div className="text-sm text-gray-600">Completion Time</div>
                </div>
              )}
              {caseStudy.customerRating && (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="text-2xl font-bold text-yellow-600">
                    {caseStudy.customerRating}/5 ★
                  </div>
                  <div className="text-sm text-gray-600">Customer Rating</div>
                </div>
              )}
              {caseStudy.projectCost && (
                <div className="bg-white rounded-lg shadow-md p-4">
                  <div className="text-2xl font-bold text-purple-600">
                    ${caseStudy.projectCost.toLocaleString()}
                  </div>
                  <div className="text-sm text-gray-600">Project Cost</div>
                </div>
              )}
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 max-w-6xl py-12">
          {/* Before/After Gallery */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              Before & After
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {/* Before Images */}
              <div>
                <h3 className="text-xl font-semibold text-red-600 mb-4">
                  Before Restoration
                </h3>
                <div className="space-y-4">
                  {caseStudy.beforeImages.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-gray-200 rounded-lg overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`Before restoration ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>

              {/* After Images */}
              <div>
                <h3 className="text-xl font-semibold text-green-600 mb-4">
                  After Restoration
                </h3>
                <div className="space-y-4">
                  {caseStudy.afterImages.map((image, index) => (
                    <div
                      key={index}
                      className="aspect-video bg-gray-200 rounded-lg overflow-hidden"
                    >
                      <img
                        src={image}
                        alt={`After restoration ${index + 1}`}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </section>

          {/* Video */}
          {caseStudy.videoUrl && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Project Video
              </h2>
              <div className="aspect-video bg-gray-200 rounded-lg overflow-hidden">
                <iframe
                  src={caseStudy.videoUrl}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            </section>
          )}

          {/* The Story */}
          <section className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-6">
              The Story
            </h2>

            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  The Challenge
                </h3>
                <div className="prose prose-lg max-w-none text-gray-700">
                  {caseStudy.challenge}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  The Solution
                </h3>
                <div className="prose prose-lg max-w-none text-gray-700">
                  {caseStudy.solution}
                </div>
              </div>

              <div>
                <h3 className="text-2xl font-semibold text-gray-900 mb-4">
                  The Results
                </h3>
                <div className="prose prose-lg max-w-none text-gray-700">
                  {caseStudy.results}
                </div>
              </div>
            </div>
          </section>

          {/* Testimonial */}
          {caseStudy.testimonial && (
            <section className="mb-12 bg-blue-50 rounded-lg p-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Customer Testimonial
              </h2>
              <blockquote className="text-xl text-gray-700 italic mb-4">
                "{caseStudy.testimonial}"
              </blockquote>
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-blue-200 rounded-full flex items-center justify-center">
                  <span className="text-blue-700 font-semibold text-lg">
                    {caseStudy.customerName.charAt(0)}
                  </span>
                </div>
                <div>
                  <div className="font-semibold text-gray-900">
                    {caseStudy.customerName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {caseStudy.customerType}
                  </div>
                </div>
                {caseStudy.customerRating && (
                  <div className="ml-auto text-yellow-500 text-xl">
                    {'★'.repeat(Math.round(caseStudy.customerRating))}
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Related Case Studies */}
          {relatedCaseStudies.length > 0 && (
            <section className="mb-12">
              <h2 className="text-3xl font-bold text-gray-900 mb-6">
                Similar Success Stories
              </h2>
              <div className="grid md:grid-cols-3 gap-6">
                {relatedCaseStudies.map((relatedCS) => (
                  <Link
                    key={relatedCS.id}
                    href={`/case-studies/${relatedCS.slug}`}
                    className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
                  >
                    {relatedCS.afterImages[0] && (
                      <div className="aspect-video bg-gray-200 overflow-hidden">
                        <img
                          src={relatedCS.afterImages[0]}
                          alt={relatedCS.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                    )}
                    <div className="p-4">
                      <span className="text-xs text-blue-600 font-semibold uppercase">
                        {relatedCS.serviceType}
                      </span>
                      <h3 className="font-bold text-gray-900 mt-2 group-hover:text-blue-600 transition-colors">
                        {relatedCS.title}
                      </h3>
                    </div>
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* CTA */}
          <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
            <h2 className="text-3xl font-bold mb-4">
              Need Similar Assistance?
            </h2>
            <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
              Our verified contractors are ready to help with your disaster
              recovery needs.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                href="/request-service"
                className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
              >
                Request Service Now
              </Link>
              <Link
                href="/case-studies"
                className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
              >
                View More Stories
              </Link>
            </div>
          </section>
        </div>
      </article>
    </>
  );
}
