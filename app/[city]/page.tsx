/**
 * City Overview Page
 *
 * URL Pattern: /[city]
 * Examples:
 * - /sydney
 * - /melbourne
 * - /brisbane
 *
 * Shows all available services for a specific city/suburb
 */

import { Metadata } from 'next';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getCityBySlug } from '@/lib/content/page-generator';
import { schemaGenerator } from '@/lib/seo/schema-generator';
import { EMERGENCY_PHONE } from '@/lib/design-tokens';
import servicesData from '@/data/services.json';

interface CityPageProps {
  params: {
    city: string;
  };
}

const SERVICE_SLUG_MAP: Record<string, string> = {
  'water-damage-restoration': 'water-damage',
  'fire-damage-restoration': 'fire-restoration',
  'mould-remediation': 'mold-remediation',
  'flood-restoration': 'flood-cleanup',
  'storm-damage-restoration': 'storm-damage',
  'biohazard-cleanup': 'biohazard-cleanup',
  'sewage-cleanup': 'sewage-cleanup',
  'burst-pipe-repair': 'burst-pipe',
};

export async function generateMetadata({ params }: CityPageProps): Promise<Metadata> {
  const city = getCityBySlug(params.city);

  if (!city) {
    return { title: 'City Not Found' };
  }

  const canonicalUrl = `${process.env.NEXT_PUBLIC_BASE_URL || 'https://disasterrecoverynrpg.com.au'}/${params.city}`;

  return {
    title: `Disaster Recovery ${city.city}, ${city.state} | Emergency Restoration | NRPG`,
    description: `Professional disaster recovery services in ${city.city}, ${city.state}. Water damage, fire restoration, mold remediation, storm damage. 24/7 emergency response. Call 1300 309 361.`,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title: `Disaster Recovery ${city.city}, ${city.state}`,
      description: `24/7 emergency restoration services in ${city.city}. IICRC certified technicians, all insurers accepted.`,
      url: canonicalUrl,
      type: 'website',
    },
  };
}

export default function CityPage({ params }: CityPageProps) {
  const city = getCityBySlug(params.city);

  if (!city) {
    notFound();
  }

  const schemas = [
    schemaGenerator.generateLocalBusinessSchema({
      city: city.city,
      state: city.state,
      latitude: city.latitude,
      longitude: city.longitude,
    }),
    schemaGenerator.generateEmergencyServiceSchema(),
  ];

  // Group services by category
  const servicesByCategory = servicesData.services.reduce((acc, service) => {
    if (!acc[service.category]) {
      acc[service.category] = [];
    }
    acc[service.category].push(service);
    return acc;
  }, {} as Record<string, typeof servicesData.services>);

  const categoryNames: Record<string, string> = {
    water: 'Water & Flood Damage',
    fire: 'Fire & Smoke Damage',
    mould: 'Mold Remediation',
    bio: 'Biohazard Cleanup',
    storm: 'Storm Damage',
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemas) }}
      />

      <div className="min-h-screen bg-slate-50">
        {/* Hero */}
        <section className="bg-gradient-to-br from-slate-900 via-blue-900 to-slate-800 text-white py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <div className="inline-flex items-center gap-2 bg-blue-500/20 border border-blue-400/30 rounded-full px-4 py-2 mb-6">
                <svg className="w-5 h-5 text-blue-300" fill="currentColor" viewBox="0 0 20 20">
                  <path
                    fillRule="evenodd"
                    d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                    clipRule="evenodd"
                  />
                </svg>
                <span className="text-blue-300 font-semibold text-sm uppercase tracking-wide">
                  {city.city}, {city.state}
                </span>
              </div>

              <h1 className="text-5xl md:text-6xl font-bold mb-6">
                Disaster Recovery Services in {city.city}
              </h1>

              <p className="text-xl text-slate-300 mb-8">
                Professional emergency restoration services throughout {city.city} and surrounding areas. IICRC certified technicians, 24/7 availability.
              </p>

              <a
                href={EMERGENCY_PHONE.href}
                className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-lg px-8 py-4 rounded-lg shadow-lg hover:shadow-xl transition-all"
              >
                Emergency: {EMERGENCY_PHONE.display}
              </a>
            </div>
          </div>
        </section>

        {/* Services Grid */}
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="max-w-7xl mx-auto">
              <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">
                Emergency Services Available in {city.city}
              </h2>

              {Object.entries(servicesByCategory).map(([category, services]) => (
                <div key={category} className="mb-12 last:mb-0">
                  <h3 className="text-2xl font-bold text-slate-800 mb-6 border-l-4 border-blue-600 pl-4">
                    {categoryNames[category] || category}
                  </h3>
                  <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {services.map((service) => {
                      const serviceSlug = SERVICE_SLUG_MAP[service.slug] || service.slug;
                      return (
                        <Link
                          key={service.slug}
                          href={`/${params.city}/${serviceSlug}`}
                          className="bg-slate-50 hover:bg-white hover:shadow-xl border border-slate-200 hover:border-blue-300 rounded-lg p-6 transition-all group"
                        >
                          <h4 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 mb-2">
                            {service.title}
                          </h4>
                          <p className="text-sm text-slate-600 mb-3">
                            {service.description?.substring(0, 120)}...
                          </p>
                          <span className="text-blue-600 font-semibold text-sm group-hover:underline">
                            Learn More →
                          </span>
                        </Link>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">
              Need Emergency Help in {city.city}?
            </h2>
            <p className="text-xl text-blue-100 mb-8 max-w-2xl mx-auto">
              Our {city.city} dispatch center is open 24/7/365. We aim for rapid response, typically within 60 minutes in metro areas.
            </p>
            <a
              href={EMERGENCY_PHONE.href}
              className="inline-block bg-red-600 hover:bg-red-700 text-white font-bold text-xl px-12 py-5 rounded-lg shadow-xl hover:shadow-2xl transition-all"
            >
              Call Now: {EMERGENCY_PHONE.display}
            </a>
          </div>
        </section>
      </div>
    </>
  );
}
