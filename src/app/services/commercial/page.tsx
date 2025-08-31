import type { Metadata } from 'next';
import Link from 'next/link';

// SEO Metadata
export const metadata: Metadata = {
  title: 'Commercial Restoration Services | Business Continuity | 24/7 Emergency Response',
  description: 'Professional commercial restoration services with business continuity focus. Office water damage, retail fire damage, industrial restoration. Minimize downtime with expert disaster recovery.',
  keywords: [
    'commercial restoration',
    'business restoration',
    'commercial water damage',
    'office restoration',
    'retail restoration',
    'industrial restoration',
    'business continuity',
    'commercial disaster recovery'
  ]
};

export default function CommercialRestorationPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white">
      {/* Hero Section */}
      <section className="relative py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center text-white">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Commercial Restoration Services
            </h1>
            <p className="text-xl md:text-2xl text-blue-100 max-w-3xl mx-auto">
              Professional disaster recovery for businesses with minimal downtime. 
              Expert office, retail, and industrial restoration available 24/7.
            </p>
            <div className="mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/contact"
                className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
              >
                Get Emergency Help
              </Link>
              <Link
                href="/quote"
                className="inline-flex items-center justify-center px-8 py-4 bg-blue-800 text-white rounded-lg font-bold text-lg hover:bg-blue-900 transition-colors"
              >
                Request Assessment
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="container mx-auto max-w-7xl px-4 py-16">
        {/* Service Overview */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            Business Continuity Focused Restoration
          </h2>
          <div className="prose prose-lg max-w-none text-neutral-700">
            <p className="mb-6">
              When disaster strikes your commercial property, every hour of downtime impacts your 
              bottom line. Our commercial restoration specialists understand the unique challenges 
              businesses face and prioritize rapid response with minimal operational disruption.
            </p>
            <p className="mb-6">
              We work with office buildings, retail stores, restaurants, healthcare facilities, 
              educational institutions, and industrial properties to provide comprehensive 
              restoration services that get you back to business quickly.
            </p>
          </div>
        </section>

        {/* Services Grid */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            Commercial Property Types We Serve
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: 'Office Buildings',
                description: 'Corporate offices, professional services, co-working spaces',
                color: 'blue'
              },
              {
                title: 'Retail Stores',
                description: 'Shopping centres, department stores, boutiques',
                color: 'green'
              },
              {
                title: 'Manufacturing',
                description: 'Industrial facilities, production lines, warehouses',
                color: 'indigo'
              },
              {
                title: 'Healthcare',
                description: 'Medical clinics, dental offices, veterinary clinics',
                color: 'red'
              },
              {
                title: 'Education',
                description: 'Schools, universities, training centres',
                color: 'yellow'
              },
              {
                title: 'Hospitality',
                description: 'Restaurants, hotels, cafes, entertainment venues',
                color: 'purple'
              }
            ].map((item, index) => (
              <div key={index} className={`bg-${item.color}-50 border border-${item.color}-200 rounded-xl p-6`}>
                <h3 className="text-lg font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-700 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Process Steps */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            Our Commercial Restoration Process
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                step: '1',
                title: 'Emergency Response',
                description: 'Immediate 24/7 response to minimize damage'
              },
              {
                step: '2',
                title: 'Business Assessment',
                description: 'Evaluate impact on operations and create continuity plan'
              },
              {
                step: '3',
                title: 'Restoration Work',
                description: 'Professional restoration with minimal disruption'
              },
              {
                step: '4',
                title: 'Return to Business',
                description: 'Complete restoration and operational handover'
              }
            ].map((item, index) => (
              <div key={index} className="bg-white rounded-xl p-6 shadow-lg">
                <div className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4">
                  {item.step}
                </div>
                <h3 className="font-semibold text-neutral-900 mb-2">{item.title}</h3>
                <p className="text-neutral-700 text-sm">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <section className="mb-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            Why Businesses Choose Our Services
          </h2>
          <div className="bg-white rounded-xl p-8 shadow-lg">
            <div className="grid md:grid-cols-2 gap-6">
              {[
                '24/7 Emergency Response',
                'Business Continuity Focus',
                'Insurance Claim Assistance',
                'Minimal Operational Disruption',
                'IICRC Certified Technicians',
                'Direct Insurance Billing',
                'After-Hours Work Available',
                'Dedicated Project Managers'
              ].map((item, index) => (
                <div key={index} className="flex items-center">
                  <svg className="w-6 h-6 text-green-600 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-neutral-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">
            Commercial Emergency? We're Here 24/7
          </h2>
          <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
            Don't let disaster shut down your business. Our commercial restoration specialists 
            prioritize business continuity and rapid recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colors"
            >
              Contact Us Now
            </Link>
            <Link
              href="/emergency"
              className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white rounded-lg font-bold text-lg hover:bg-blue-800 transition-colors"
            >
              Emergency Response
            </Link>
          </div>
        </section>

        {/* Related Services */}
        <section className="mt-16">
          <h2 className="text-3xl font-bold text-neutral-900 mb-8">
            Related Services
          </h2>
          <div className="grid md:grid-cols-4 gap-4">
            {[
              { title: 'Water Damage', href: '/services/water-damage' },
              { title: 'Fire Damage', href: '/services/fire-damage' },
              { title: 'Mould Remediation', href: '/services/mould-remediation' },
              { title: 'Emergency Response', href: '/services/emergency-response' }
            ].map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="bg-white border border-neutral-200 rounded-lg p-4 text-center hover:shadow-lg transition-shadow"
              >
                <h3 className="font-semibold text-neutral-900">{service.title}</h3>
              </Link>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}