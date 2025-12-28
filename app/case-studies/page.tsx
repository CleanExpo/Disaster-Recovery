import { Metadata } from 'next';
import Link from 'next/link';
import { prisma } from '@/lib/db';

export const metadata: Metadata = {
  title: 'Success Stories | Disaster Recovery Case Studies | NRPG',
  description:
    'Real disaster recovery success stories from Australian property owners. See before and after results, project timelines, and customer testimonials.',
  keywords: [
    'disaster recovery success',
    'restoration case studies',
    'before after',
    'customer testimonials',
    'water damage recovery',
    'fire damage restoration',
  ],
};

interface CaseStudiesPageProps {
  searchParams: {
    service?: string;
    location?: string;
  };
}

async function getCaseStudies(serviceType?: string, location?: string) {
  const where = {
    isPublished: true,
    ...(serviceType && { serviceType: { contains: serviceType, mode: 'insensitive' as const } }),
    ...(location && { location: { contains: location, mode: 'insensitive' as const } }),
  };

  const [caseStudies, serviceTypes, locations] = await Promise.all([
    prisma.caseStudy.findMany({
      where,
      orderBy: { publishedAt: 'desc' },
      take: 50,
    }),
    // Get unique service types
    prisma.caseStudy.findMany({
      where: { isPublished: true },
      select: { serviceType: true },
      distinct: ['serviceType'],
    }),
    // Get unique locations
    prisma.caseStudy.findMany({
      where: { isPublished: true },
      select: { location: true },
      distinct: ['location'],
    }),
  ]);

  return {
    caseStudies,
    serviceTypes: serviceTypes.map((s) => s.serviceType),
    locations: locations.map((l) => l.location),
  };
}

export default async function CaseStudiesPage({
  searchParams,
}: CaseStudiesPageProps) {
  const { caseStudies, serviceTypes, locations } = await getCaseStudies(
    searchParams.service,
    searchParams.location
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-600 to-blue-800 text-white py-16">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Success Stories
          </h1>
          <p className="text-xl text-blue-100 max-w-3xl">
            Real stories from Australian property owners who recovered from
            disasters with help from our verified contractor network.
          </p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-12">
        {/* Filters */}
        <div className="mb-8 flex flex-wrap gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Service Type
            </label>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchParams.service || ''}
              onChange={(e) => {
                const url = new URL(window.location.href);
                if (e.target.value) {
                  url.searchParams.set('service', e.target.value);
                } else {
                  url.searchParams.delete('service');
                }
                window.location.href = url.toString();
              }}
            >
              <option value="">All Services</option>
              {serviceTypes.map((type) => (
                <option key={type} value={type}>
                  {type}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Location
            </label>
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={searchParams.location || ''}
              onChange={(e) => {
                const url = new URL(window.location.href);
                if (e.target.value) {
                  url.searchParams.set('location', e.target.value);
                } else {
                  url.searchParams.delete('location');
                }
                window.location.href = url.toString();
              }}
            >
              <option value="">All Locations</option>
              {locations.map((loc) => (
                <option key={loc} value={loc}>
                  {loc}
                </option>
              ))}
            </select>
          </div>

          {(searchParams.service || searchParams.location) && (
            <div className="flex items-end">
              <Link
                href="/case-studies"
                className="px-4 py-2 text-blue-600 hover:text-blue-700 font-medium"
              >
                Clear Filters
              </Link>
            </div>
          )}
        </div>

        {/* Stats Section */}
        <div className="grid md:grid-cols-4 gap-6 mb-12">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-blue-600">
              {caseStudies.length}+
            </div>
            <div className="text-gray-600 mt-2">Success Stories</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-green-600">
              {Math.round(
                caseStudies.reduce((acc, cs) => acc + (cs.customerRating || 0), 0) /
                  caseStudies.filter((cs) => cs.customerRating).length
              ) || 5}
              /5
            </div>
            <div className="text-gray-600 mt-2">Average Rating</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-purple-600">
              {Math.round(
                caseStudies.reduce((acc, cs) => acc + (cs.responseTime || 0), 0) /
                  caseStudies.filter((cs) => cs.responseTime).length / 60
              ) || '<2'}h
            </div>
            <div className="text-gray-600 mt-2">Avg Response Time</div>
          </div>
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="text-4xl font-bold text-orange-600">
              {Math.round(
                caseStudies.reduce((acc, cs) => acc + (cs.completionTime || 0), 0) /
                  caseStudies.filter((cs) => cs.completionTime).length
              ) || '3-7'}{' '}
              days
            </div>
            <div className="text-gray-600 mt-2">Avg Completion</div>
          </div>
        </div>

        {/* Case Studies Grid */}
        {caseStudies.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">
              No case studies found for the selected filters.
            </p>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {caseStudies.map((caseStudy) => (
              <Link
                key={caseStudy.id}
                href={`/case-studies/${caseStudy.slug}`}
                className="group bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow"
              >
                {/* Before/After Preview */}
                <div className="relative aspect-video bg-gray-200">
                  {caseStudy.beforeImages[0] && caseStudy.afterImages[0] && (
                    <div className="grid grid-cols-2 h-full">
                      <div className="relative overflow-hidden">
                        <img
                          src={caseStudy.beforeImages[0]}
                          alt="Before"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 left-2 px-2 py-1 bg-red-600 text-white text-xs font-semibold rounded">
                          Before
                        </div>
                      </div>
                      <div className="relative overflow-hidden">
                        <img
                          src={caseStudy.afterImages[0]}
                          alt="After"
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-2 right-2 px-2 py-1 bg-green-600 text-white text-xs font-semibold rounded">
                          After
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                <div className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-blue-600 uppercase">
                      {caseStudy.serviceType}
                    </span>
                    <span className="text-xs text-gray-500">
                      {caseStudy.location}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-2 group-hover:text-blue-600 transition-colors">
                    {caseStudy.title}
                  </h3>

                  <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                    {caseStudy.challenge}
                  </p>

                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    <span>{caseStudy.customerType}</span>
                    {caseStudy.customerRating && (
                      <div className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span>
                        <span className="font-semibold">
                          {caseStudy.customerRating}/5
                        </span>
                      </div>
                    )}
                  </div>

                  {/* Key Metrics */}
                  <div className="grid grid-cols-2 gap-2 pt-4 border-t">
                    {caseStudy.responseTime && (
                      <div>
                        <div className="text-xs text-gray-500">Response</div>
                        <div className="font-semibold text-gray-900">
                          {Math.round(caseStudy.responseTime / 60)}h
                        </div>
                      </div>
                    )}
                    {caseStudy.completionTime && (
                      <div>
                        <div className="text-xs text-gray-500">Completion</div>
                        <div className="font-semibold text-gray-900">
                          {caseStudy.completionTime} days
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}

        {/* CTA Section */}
        <section className="mt-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Start Your Recovery?
          </h2>
          <p className="text-xl text-blue-100 mb-6 max-w-2xl mx-auto">
            Join thousands of satisfied customers who chose NRPG for their
            disaster recovery needs.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href="/request-service"
              className="px-8 py-3 bg-white text-blue-600 font-semibold rounded-lg hover:bg-blue-50 transition-colors"
            >
              Request Service Now
            </Link>
            <Link
              href="/contractors"
              className="px-8 py-3 bg-blue-700 text-white font-semibold rounded-lg hover:bg-blue-600 transition-colors"
            >
              Find a Contractor
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
