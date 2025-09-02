// Service Page Layout Component with SEO Optimisation
import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface ServicePageLayoutProps {
  title: string;
  description: string;
  heroImage: string;
  heroImageAlt: string;
  certifications: string[];
  responseTime: string;
  availability: string;
  children: React.ReactNode;
  relatedServices: Array<{
    title: string;
    href: string;
    image: string;
  }>;
  faqs: Array<{
    question: string;
    answer: string;
  }>;
  schemaData: any;
}

export const ServicePageLayout: React.FC<ServicePageLayoutProps> = ({
  title,
  description,
  heroImage,
  heroImageAlt,
  certifications,
  responseTime,
  availability,
  children,
  relatedServices,
  faqs,
  schemaData
}) => {
  return (
    <>
      {/* Schema.org JSON-LD */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      {/* Hero Section */}
      <section className="relative min-h-[600px] bg-gradient-to-br from-neutral-50 to-neutral-100">
        <div className="absolute inset-0 opacity-20">
          <Image
            src={heroImage}
            alt={heroImageAlt}
            fill
            className="object-cover"
            priority
            sizes="100vw"
          />
        </div>
        <div className="relative container mx-auto px-4 py-24">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-6xl font-bold text-neutral-900 mb-6">
              {title}
            </h1>
            <p className="text-xl text-neutral-700 mb-8">
              {description}
            </p>
            
            {/* Trust Indicators */}
            <div className="grid md:grid-cols-3 gap-6 mt-12">
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold text-emergency-600 mb-2">Response Time</h3>
                <p className="text-2xl font-bold text-neutral-900">{responseTime}</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold text-success-600 mb-2">Availability</h3>
                <p className="text-2xl font-bold text-neutral-900">{availability}</p>
              </div>
              <div className="bg-white/90 backdrop-blur-sm rounded-lg p-6 shadow-lg">
                <h3 className="font-semibold text-primary-600 mb-2">Certified</h3>
                <p className="text-lg font-bold text-neutral-900">{certifications.length} Standards</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Certifications Bar */}
      <section className="bg-primary-50 border-y border-primary-200">
        <div className="container mx-auto px-4 py-8">
          <div className="flex flex-wrap items-center gap-8">
            <span className="font-semibold text-neutral-700">Certified to:</span>
            {certifications.map((cert, index) => (
              <span key={index} className="px-4 py-2 bg-white rounded-full text-sm font-medium text-primary-700 shadow-sm">
                {cert}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-16">
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Primary Content */}
          <div className="lg:col-span-2">
            {children}
          </div>

          {/* Sidebar */}
          <aside className="space-y-8">
            {/* Emergency CTA */}
            <div className="bg-emergency-50 border-2 border-emergency-200 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-emergency-700 mb-4">
                Emergency? We're Here 24/7
              </h3>
              <p className="text-emergency-600 mb-6">
                Immediate response for disaster emergencies. Our certified technicians are standing by.
              </p>
              <a
                href="/contact"
                className="block w-full bg-emergency-600 text-white text-center py-4 rounded-lg font-bold text-lg hover:bg-emergency-700 transition-colours"
              >
                Call Get Help Now
              </a>
              <Link
                href="/emergency-form"
                className="block w-full mt-4 bg-white text-emergency-600 text-center py-4 rounded-lg font-bold border-2 border-emergency-600 hover:bg-emergency-50 transition-colours"
              >
                Request Emergency Service
              </Link>
            </div>

            {/* Service Areas */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">
                Service Coverage
              </h3>
              <ul className="space-y-3">
                <li className="flex items-center text-neutral-700">
                  <svg className="w-5 h-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Nationwide Coverage
                </li>
                <li className="flex items-center text-neutral-700">
                  <svg className="w-5 h-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  1-Hour City Response
                </li>
                <li className="flex items-center text-neutral-700">
                  <svg className="w-5 h-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Rural Area Coverage
                </li>
                <li className="flex items-center text-neutral-700">
                  <svg className="w-5 h-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Insurance Approved
                </li>
              </ul>
            </div>

            {/* Related Services */}
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h3 className="text-xl font-bold text-neutral-900 mb-6">
                Related Services
              </h3>
              <div className="space-y-4">
                {relatedServices.map((service, index) => (
                  <Link
                    key={index}
                    href={service.href}
                    className="flex items-center p-3 rounded-lg hover:bg-neutral-50 transition-colours group"
                  >
                    <div className="w-16 h-16 relative rounded-lg overflow-hidden mr-4">
                      <Image
                        src={service.image}
                        alt={service.title}
                        fill
                        className="object-cover group-hover:scale-110 transition-transform"
                      />
                    </div>
                    <div className="flex-1">
                      <h4 className="font-semibold text-neutral-900 group-hover:text-primary-600 transition-colours">
                        {service.title}
                      </h4>
                    </div>
                    <svg className="w-5 h-5 text-neutral-400 group-hover:text-primary-600 transition-colours" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </Link>
                ))}
              </div>
            </div>
          </aside>
        </div>
      </main>

      {/* FAQ Section */}
      <section className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-neutral-900 mb-12 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto">
            <div className="space-y-6">
              {faqs.map((faq, index) => (
                <details key={index} className="bg-white rounded-lg shadow-md group">
                  <summary className="px-6 py-4 cursor-pointer list-none flex justify-between items-center font-semibold text-neutral-900 hover:text-primary-600 transition-colours">
                    {faq.question}
                    <svg className="w-5 h-5 transition-transform group-open:rotate-180" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </summary>
                  <div className="px-6 pb-4">
                    <p className="text-neutral-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="bg-gradient-to-r from-primary-600 to-primary-700 py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Need {title}?
          </h2>
          <p className="text-xl text-primary-100 mb-8 max-w-2xl mx-auto">
            Our IICRC-certified technicians are ready to respond 24/7. Don't wait - every minute counts in disaster recovery.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:bg-primary-50 transition-colours"
            >
              <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
              Submit Form Now: Get Help Now
            </a>
            <Link
              href="/get-quote"
              className="inline-flex items-center justify-center px-8 py-4 bg-primary-800 text-white rounded-lg font-bold text-lg hover:bg-primary-900 transition-colours"
            >
              Get Free Assessment
            </Link>
          </div>
        </div>
      </section>
    </>
  );
};