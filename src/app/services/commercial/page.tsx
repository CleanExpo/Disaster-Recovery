import type { Metadata } from 'next';
import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { SEOImage } from '@/components/ui/seo-image';
import Link from 'next/link';

// SEO Metadata with comprehensive commercial restoration keywords
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
    'commercial disaster recovery',
    'workplace restoration',
    'commercial property restoration',
    'business emergency response',
    'commercial fire damage',
    'office flooding',
    'warehouse restoration',
    'manufacturing disaster recovery'
  ],
  openGraph: {
    title: 'Commercial Restoration Services | Business Continuity Focus',
    description: 'Professional commercial restoration with minimal business disruption. Expert office, retail, and industrial disaster recovery services available 24/7.',
    images: [
      {
        url: '/images/optimised/process/3D Assessment.png',
        width: 1200,
        height: 630,
        alt: 'Professional commercial restoration service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Commercial Restoration Services | Business Continuity',
    description: 'Expert commercial restoration services. Professional office, retail, and industrial disaster recovery available 24/7.',
    images: ['/images/optimised/process/3D Assessment.png'],
  },
  alternates: {
    canonical: '/services/commercial',
  },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751',
  }
};

// Schema.org structured data for commercial restoration
const schemaData = {
  "@context": "https://schema.org",
  "@type": ["Service", "LocalBusiness"],
  "name": "Commercial Restoration Services",
  "description": "Professional commercial restoration services with business continuity focus including office water damage, retail fire damage, and industrial disaster recovery.",
  "serviceType": "Commercial Restoration",
  "provider": {
    "@type": "Organisation",
    "name": "Disaster Recovery Australia",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU"
    },
    "telephone": "1800-DISASTER",
    "email": "emergency@disasterrecoveryaustralia.com.au"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Australia"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "/services/commercial",
    "serviceSmsNumber": "1800-DISASTER",
    "servicePhone": "1800-DISASTER"
  },
  "hoursAvailable": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": [
      "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"
    ],
    "opens": "00:00",
    "closes": "23:59"
  },
  "offers": {
    "@type": "Offer",
    "description": "Commercial restoration and business continuity services",
    "price": "Varies based on assessment",
    "priceCurrency": "AUD"
  },
  "additionalType": "https://www.wikidata.org/wiki/Q4830453",
  "certification": [
    {
      "@type": "Certification",
      "name": "IICRC WRT - Water Damage Restoration Technician"
    },
    {
      "@type": "Certification", 
      "name": "IICRC FSRT - Fire and Smoke Restoration Technician"
    },
    {
      "@type": "Certification",
      "name": "Commercial Restoration Specialist"
    }
  ]
};

const relatedServices = [
  {
    title: 'Emergency Response',
    href: '/services/emergency-response',
    image: '/images/optimised/process/3D Assessment.png'
  },
  {
    title: 'Water Damage Restoration',
    href: '/services/water-damage-restoration',
    image: '/images/optimised/damage/3D Water Damage.png'
  },
  {
    title: 'Fire Damage Restoration',
    href: '/services/fire-damage',
    image: '/images/optimised/damage/3D Fire Damage.png'
  },
  {
    title: 'Mould Remediation',
    href: '/services/mould-remediation',
    image: '/images/optimised/damage/3D Mould Damage.png'
  }
];

const faqs = [
  {
    question: "How do you minimize business downtime during restoration?",
    answer: "We prioritize business continuity with flexible scheduling, temporary workspace setup, critical equipment protection, and phased restoration to keep operations running. Our project managers coordinate closely with your team to minimize disruption."
  },
  {
    question: "Can you work after hours to avoid disrupting business operations?",
    answer: "Yes, we offer after-hours and weekend restoration services to minimize impact on business operations. Many of our commercial projects are completed outside business hours to ensure continuity."
  },
  {
    question: "Do you handle large-scale commercial disasters?",
    answer: "Yes, we have the resources and expertise to handle major commercial disasters including multi-story office buildings, large retail spaces, warehouses, and industrial facilities. We can mobilize additional crews as needed."
  },
  {
    question: "How do you protect sensitive equipment and data during restoration?",
    answer: "We implement specialised containment procedures, use protective barriers for equipment, coordinate with IT teams for data protection, and provide secure storage for sensitive materials during the restoration process."
  },
  {
    question: "Will commercial restoration be covered by business insurance?",
    answer: "Most commercial property insurance policies cover disaster restoration. We work directly with commercial insurers, provide detailed documentation for business interruption claims, and help expedite the claims process."
  },
  {
    question: "Can you help with temporary workspace solutions?",
    answer: "Yes, we can coordinate temporary workspace setup, equipment relocation, and alternate facility arrangements to ensure business operations continue during restoration. We work with your team to find suitable solutions."
  },
  {
    question: "How long does commercial restoration typically take?",
    answer: "Timeline varies based on damage extent and business requirements, typically ranging from 3-10 days for minor damage to several weeks for major restoration. We provide detailed project timelines and regular updates."
  },
  {
    question: "Do you have experience with specific industries?",
    answer: "Yes, we have extensive experience with healthcare facilities, educational institutions, retail stores, restaurants, offices, manufacturing facilities, and other specialised commercial environments with unique requirements."
  }
];

export default function CommercialRestorationPage() {
  return (
    <ServicePageLayout
      title="Commercial Restoration Services"
      description="Professional commercial restoration services with business continuity focus. Expert office water damage, retail fire damage, industrial restoration. Minimize business downtime with specialised disaster recovery services available 24/7."
      heroImage="/images/optimised/process/3D Assessment.png"
      heroImageAlt="Professional commercial restoration service showing expert technicians conducting business property assessment and restoration"
      certifications={['IICRC WRT', 'IICRC FSRT', 'Commercial Specialist', 'Business Continuity Certified']}
      responseTime="1 Hour"
      availability="24/7/365"
      relatedServices={relatedServices}
      faqs={faqs}
      schemaData={schemaData}
    >
      {/* Service Overview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Commercial Restoration with Business Continuity Focus
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-lg text-neutral-700 mb-6">
              Commercial disasters can devastate business operations, causing significant revenue loss and operational 
              disruption. Our commercial restoration specialists understand the critical importance of business continuity 
              and work to minimize downtime while ensuring complete property restoration to pre-loss condition.
            </p>
            
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Business-First Approach</h3>
            <p className="text-neutral-700 mb-6">
              Every commercial restoration project is managed with your business operations as the top priority. 
              We coordinate with your team to develop restoration strategies that maintain critical functions, 
              protect valuable assets, and ensure the fastest possible return to normal operations.
            </p>
          </div>
          
          <div className="relative">
            <SEOImage
              src="/images/optimised/equipment/3D Industrial Fan.png"
              alt="Professional commercial restoration equipment including industrial drying systems for business properties"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        {/* Business Continuity Alert */}
        <div className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center">
            <svg className="w-8 h-8 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 6V5a3 3 0 013-3h2a3 3 0 013 3v1h2a2 2 0 012 2v3.57A22.952 22.952 0 0110 13a22.95 22.95 0 01-8-1.43V8a2 2 0 012-2h2zm2-1a1 1 0 011-1h2a1 1 0 011 1v1H8V5zm1 5a1 1 0 011-1h.01a1 1 0 110 2H10a1 1 0 01-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-xl font-bold mb-2">Business Emergency Priority</h3>
              <p className="text-blue-100">
                Commercial emergencies receive priority response. We understand every hour of downtime impacts your 
                bottom line. Call <strong className="text-white">Contact Us</strong> for immediate business restoration support.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commercial Restoration Process */}
      <section className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Business-Focused Restoration Process
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Rapid Business Assessment</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Immediate evaluation of business impact with priority on critical operations and revenue-generating areas.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Business impact analysis</li>
              <li>• Critical systems identification</li>
              <li>• Revenue area prioritization</li>
              <li>• Continuity planning</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Emergency Mitigation</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Immediate stabilization to protect assets, secure the property, and prevent further business disruption.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Asset protection measures</li>
              <li>• Equipment relocation</li>
              <li>• Data security protocols</li>
              <li>• Temporary barriers</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Coordinated Restoration</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Systematic restoration with flexible scheduling to accommodate business operations and minimize downtime.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• After-hours work scheduling</li>
              <li>• Phased restoration approach</li>
              <li>• Minimal disruption methods</li>
              <li>• Progress communication</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-blue-600">4</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Business Resumption</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Complete restoration with final inspection and coordination for seamless business operation resumption.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Final quality inspection</li>
              <li>• Business safety clearance</li>
              <li>• Operations coordination</li>
              <li>• Follow-up support</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Commercial Property Types */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Commercial Properties We Restore
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-gray-50 to-neutral-100 border border-gray-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Office Buildings</h3>
            <p className="text-neutral-700 text-sm">
              Corporate offices, professional services, co-working spaces, and business centres 
              with focus on technology protection and minimal work disruption.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 11V7a4 4 0 00-8 0v4M5 9h14l-1 12H6L5 9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Retail Stores</h3>
            <p className="text-neutral-700 text-sm">
              Shopping centres, department stores, specialty retail, and boutiques with 
              inventory protection and rapid reopening strategies.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 3v2m6-2v2M9 19v2m6-2v2M5 9H3m2 6H3m18-6h-2m2 6h-2M7 19h10a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v10a2 2 0 002 2zM9 9h6v6H9V9z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Manufacturing</h3>
            <p className="text-neutral-700 text-sm">
              Industrial facilities, production lines, and manufacturing plants with 
              specialised equipment protection and production continuity planning.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Healthcare Facilities</h3>
            <p className="text-neutral-700 text-sm">
              Medical clinics, dental offices, veterinary clinics, and healthcare centres 
              with strict health regulations and patient safety requirements.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.246 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Educational Institutions</h3>
            <p className="text-neutral-700 text-sm">
              Schools, universities, training centres, and childcare facilities with 
              safety compliance and minimal disruption to educational programs.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Restaurants & Hospitality</h3>
            <p className="text-neutral-700 text-sm">
              Restaurants, hotels, cafes, and hospitality venues with specialised 
              kitchen equipment restoration and health department compliance.
            </p>
          </div>
        </div>
      </section>

      {/* Business Continuity Services */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Business Continuity Support Services
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Temporary Workspace Solutions
              </h3>
              <p className="text-neutral-700 mb-4">
                We coordinate temporary office space, portable facilities, and alternative workspace 
                arrangements to keep your team productive during restoration. Full technology setup included.
              </p>
              <div className="flex items-center text-sm text-primary-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Minimize Revenue Loss & Downtime
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Equipment & Data Protection
              </h3>
              <p className="text-neutral-700 mb-4">
                Specialised protection for computers, servers, sensitive equipment, and important documents. 
                Secure storage and professional cleaning for technology and data recovery.
              </p>
              <div className="flex items-center text-sm text-primary-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Professional Technology Recovery
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                After-Hours Restoration
              </h3>
              <p className="text-neutral-700 mb-4">
                Flexible scheduling including evenings, weekends, and holidays to minimize business 
                disruption. Most commercial restoration work can be completed outside business hours.
              </p>
              <div className="flex items-center text-sm text-primary-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                24/7 Flexible Work Scheduling
              </div>
            </div>
          </div>
          
          <div className="relative">
            <SEOImage
              src="/images/optimised/equipment/3D Dehumidifier.png"
              alt="Professional commercial dehumidification equipment for large-scale business restoration"
              width={500}
              height={600}
              className="rounded-lg shadow-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 mb-2">Commercial-Grade Equipment</h4>
              <p className="text-sm text-neutral-700">
                Industrial dehumidifiers, air scrubbers, and specialised equipment designed for 
                large commercial spaces and minimal business disruption.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Industry Expertise */}
      <section className="mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Specialised Industry Experience
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Regulated Industries
            </h3>
            <p className="text-neutral-700 mb-6">
              Extensive experience with heavily regulated industries requiring specialised compliance, 
              certifications, and restoration protocols.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Healthcare & Medical</h4>
                <p className="text-neutral-700 text-sm">
                  TGA compliance, infection control protocols, medical equipment protection, 
                  and rapid restoration to maintain patient care capabilities.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Food Service & Processing</h4>
                <p className="text-neutral-700 text-sm">
                  HACCP compliance, food safety protocols, specialised kitchen equipment restoration, 
                  and health department coordination for rapid reopening.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Financial Services</h4>
                <p className="text-neutral-700 text-sm">
                  Data security protocols, secure document handling, technology recovery, 
                  and regulatory compliance for banking and financial institutions.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Project Management Excellence
            </h3>
            <p className="text-neutral-700 mb-4">
              Dedicated commercial project managers coordinate all aspects of restoration 
              with your business team, stakeholders, and insurance representatives.
            </p>
            
            <div className="bg-indigo-50 border border-indigo-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-indigo-700 mb-2">Project Management Services:</h4>
              <ul className="text-sm text-indigo-600 space-y-1">
                <li>• Daily progress reporting</li>
                <li>• Stakeholder communication</li>
                <li>• Timeline coordination</li>
                <li>• Quality assurance monitoring</li>
                <li>• Budget tracking and reporting</li>
                <li>• Regulatory compliance oversight</li>
                <li>• Final delivery coordination</li>
              </ul>
            </div>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <p className="text-sm text-green-700">
                <strong>Business Promise:</strong> We understand that every day of downtime costs money. 
                Our project managers work to minimize disruption and expedite restoration completion.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Technology & Data Recovery */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Technology & Data Recovery Services
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Computer Recovery</h3>
            <p className="text-neutral-700 text-sm">
              Professional cleaning and recovery of water-damaged computers, laptops, and 
              hardware with specialised drying techniques and data preservation.
            </p>
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 12h14M5 12a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v4a2 2 0 01-2 2M5 12a2 2 0 00-2 2v4a2 2 0 002 2h14a2 2 0 002-2v-4a2 2 0 00-2-2m-2-4h.01M17 16h.01" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Server Recovery</h3>
            <p className="text-neutral-700 text-sm">
              Emergency server protection and recovery services with specialised containment, 
              cleaning, and restoration to minimize data loss and system downtime.
            </p>
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Document Recovery</h3>
            <p className="text-neutral-700 text-sm">
              Professional document drying, cleaning, and restoration for important business 
              records, contracts, and sensitive materials using specialised techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Commercial Insurance */}
      <section className="mb-16 bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Commercial Insurance & Claims Support
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Business Interruption Claims
            </h3>
            <p className="text-neutral-700 mb-6">
              We provide detailed documentation to support business interruption claims, including 
              revenue loss calculations, operational impact assessments, and mitigation cost tracking.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-success-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Revenue Loss Documentation</h4>
                  <p className="text-neutral-700 text-sm">Detailed impact analysis for business interruption claims</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-success-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Mitigation Cost Tracking</h4>
                  <p className="text-neutral-700 text-sm">Complete records of emergency response and mitigation expenses</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-success-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Direct Commercial Billing</h4>
                  <p className="text-neutral-700 text-sm">Work directly with commercial adjusters for streamlined payment</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Commercial Insurance Partners
            </h3>
            <p className="text-neutral-700 mb-4">
              We have established relationships with major commercial insurers and understand 
              the specific requirements for commercial claims processing.
            </p>
            
            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-green-700 mb-2">Commercial Claim Advantages:</h4>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• Fast-track commercial claim processing</li>
                <li>• Business continuity priority handling</li>
                <li>• Direct adjuster communication</li>
                <li>• Detailed project documentation</li>
                <li>• Preferred contractor status</li>
                <li>• Emergency response authorisation</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <p className="text-sm text-blue-700">
                <strong>Commercial Focus:</strong> We understand commercial claims are different from 
                residential. Our commercial specialists work with your CFO, facilities manager, 
                and insurance broker to ensure proper coverage and rapid claim resolution.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-500 to-indigo-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Commercial Emergency? Minimize Business Impact
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Don't let disaster shut down your business. Our commercial restoration specialists prioritize 
          business continuity and work to minimize downtime while ensuring complete property restoration.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colours"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Business Emergency: Contact Us
          </a>
          <Link
            href="/commercial-assessment"
            className="inline-flex items-center justify-center px-8 py-4 bg-blue-700 text-white rounded-lg font-bold text-lg hover:bg-blue-800 transition-colours"
          >
            Request Commercial Assessment
          </Link>
        </div>
        
        <div className="mt-8 pt-8 border-t border-blue-400">
          <p className="text-blue-100 mb-2">
            <strong>Business Continuity Promise:</strong> We understand every hour of downtime costs money
          </p>
          <p className="text-blue-200 text-sm">
            Dedicated commercial project managers ensure minimal disruption and rapid restoration completion
          </p>
        </div>
      </section>
    </ServicePageLayout>
  );
}