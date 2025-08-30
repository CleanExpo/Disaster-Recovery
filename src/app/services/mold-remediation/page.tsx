import type { Metadata } from 'next';
import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { SEOImage } from '@/components/ui/seo-image';
import Link from 'next/link';

// SEO Metadata with comprehensive mould remediation keywords
export const metadata: Metadata = {
  title: 'Mould Remediation Services | IICRC S520 Certified | Black Mould Removal Specialists',
  description: 'Professional mould remediation services following IICRC S520 standards. Black mould removal, toxic mould cleanup, mould testing & inspection. Licensed technicians available 24/7.',
  keywords: [
    'mould remediation',
    'black mould removal',
    'mould removal services',
    'toxic mould cleanup',
    'IICRC S520 certified',
    'mould inspection',
    'mould testing',
    'mould remediation company',
    'professional mould removal',
    'mould contamination cleanup',
    'indoor air quality',
    'mould spore removal',
    'mould damage restoration',
    'certified mould specialists',
    'microbial remediation'
  ],
  openGraph: {
    title: 'Professional Mould Remediation | IICRC S520 Certified Specialists',
    description: 'Expert mould remediation services following IICRC S520 standards. Comprehensive black mould removal and toxic mould cleanup with 24/7 emergency response.',
    images: [
      {
        url: '/images/optimised/damage/3D Mould Damage.png',
        width: 1200,
        height: 630,
        alt: 'Professional mould remediation service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Mould Remediation Services | IICRC S520 Certified',
    description: 'Expert mould remediation services. IICRC S520 certified technicians. Professional black mould removal available 24/7.',
    images: ['/images/optimised/damage/3D Mould Damage.png'],
  },
  alternates: {
    canonical: '/services/mould-remediation',
  },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751',
  }
};

// Schema.org structured data for mould remediation
const schemaData = {
  "@context": "https://schema.org",
  "@type": ["Service", "LocalBusiness"],
  "name": "Mould Remediation Services",
  "description": "Professional mould remediation services following IICRC S520 standards with comprehensive black mould removal and toxic mould cleanup.",
  "serviceType": "Mould Remediation",
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
    "serviceUrl": "/services/mould-remediation",
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
    "description": "Mould remediation and removal services",
    "price": "Varies based on assessment",
    "priceCurrency": "AUD"
  },
  "additionalType": "https://www.wikidata.org/wiki/Q16970",
  "certification": [
    {
      "@type": "Certification",
      "name": "IICRC S520 - Mould Remediation Standard"
    },
    {
      "@type": "Certification", 
      "name": "IICRC WRT - Water Damage Restoration Technician"
    },
    {
      "@type": "Certification",
      "name": "Indoor Environmental Professional"
    }
  ]
};

const relatedServices = [
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
    title: 'Indoor Air Quality Testing',
    href: '/services/indoor-air-quality',
    image: '/images/optimised/equipment/3D Thermal Camera.png'
  },
  {
    title: 'Structural Drying',
    href: '/services/structural-drying',
    image: '/images/optimised/equipment/3D Dehumidifier.png'
  }
];

const faqs = [
  {
    question: "How do I know if I have a mould problem that requires professional remediation?",
    answer: "Signs include visible mould growth, musty odours, water damage history, respiratory symptoms that improve when away from the property, and moisture problems. We provide free assessments to determine if professional remediation is needed."
  },
  {
    question: "What is the IICRC S520 standard for mould remediation?",
    answer: "IICRC S520 is the industry standard for mould remediation, establishing professional procedures for assessment, containment, removal, and verification. It ensures safe, effective remediation that protects both occupants and workers."
  },
  {
    question: "Is black mould dangerous and how do you remove it safely?",
    answer: "Stachybotrys (black mould) can produce mycotoxins that are harmful to health. We use full containment procedures, HEPA filtration, and appropriate PPE following S520 protocols to safely remove all mould species, including black mould."
  },
  {
    question: "How long does mould remediation take?",
    answer: "Timeline depends on contamination extent, but typically ranges from 2-5 days for contained areas to 1-2 weeks for extensive contamination. We provide detailed timelines after our initial assessment."
  },
  {
    question: "Will mould come back after remediation?",
    answer: "When performed correctly following IICRC S520 standards and moisture sources are eliminated, mould should not return. We address underlying moisture problems and provide warranties on our remediation work."
  },
  {
    question: "Do you test for mould before and after remediation?",
    answer: "Yes, we conduct comprehensive testing including air sampling, surface sampling, and moisture analysis before remediation. Post-remediation verification ensures successful completion and safe reoccupancy."
  },
  {
    question: "Is mould remediation covered by insurance?",
    answer: "Coverage depends on the cause of moisture that led to mould growth. Sudden water damage is often covered, while long-term moisture problems may not be. We help navigate insurance claims and provide detailed documentation."
  },
  {
    question: "Can I stay in my property during mould remediation?",
    answer: "This depends on contamination extent and location. Small contained areas may allow continued occupancy, while extensive contamination requires temporary relocation. We prioritize occupant safety in all decisions."
  }
];

export default function MoldRemediationPage() {
  return (
    <ServicePageLayout
      title="Mould Remediation Services"
      description="Professional mould remediation services following IICRC S520 standards. Expert black mould removal, toxic mould cleanup, and comprehensive mould damage restoration with certified technicians available 24/7."
      heroImage="/images/optimised/damage/3D Mould Damage.png"
      heroImageAlt="Professional mould remediation service showing expert technicians safely removing mould contamination"
      certifications={['IICRC S520', 'IICRC WRT', 'Indoor Environmental Professional', 'HAZMAT Licensed']}
      responseTime="1-2 Hours"
      availability="24/7/365"
      relatedServices={relatedServices}
      faqs={faqs}
      schemaData={schemaData}
    >
      {/* Service Overview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Professional Mould Remediation & Removal
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-lg text-neutral-700 mb-6">
              Mould contamination poses serious health risks and structural threats to your property. Our IICRC S520 
              certified specialists provide comprehensive mould remediation using industry-leading techniques, advanced 
              equipment, and strict safety protocols to ensure complete removal and prevent reoccurrence.
            </p>
            
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Health & Safety Priority</h3>
            <p className="text-neutral-700 mb-6">
              Mould exposure can cause respiratory problems, allergic reactions, and other health issues. Our certified 
              technicians use full containment procedures and specialised equipment to safely remove mould while protecting 
              occupants and preventing cross-contamination.
            </p>
          </div>
          
          <div className="relative">
            <SEOImage
              src="/images/optimised/process/3D Remediation.png"
              alt="Professional mould remediation process with containment and HEPA filtration"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* IICRC S520 Process */}
      <section className="mb-16 bg-gradient-to-br from-primary-50 to-neutral-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          IICRC S520 Remediation Process
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-centre justify-centre mb-4">
              <span className="text-2xl font-bold text-primary-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Assessment & Testing</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Comprehensive inspection including visual assessment, moisture mapping, air sampling, and surface testing.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Moisture source identification</li>
              <li>• Contamination level analysis</li>
              <li>• Air quality testing</li>
              <li>• Detailed documentation</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-centre justify-centre mb-4">
              <span className="text-2xl font-bold text-primary-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Containment Setup</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Establish containment barriers and negative air pressure to prevent spore spread during remediation.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Plastic sheeting barriers</li>
              <li>• HEPA air scrubbers</li>
              <li>• Negative air pressure</li>
              <li>• Worker protection setup</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-centre justify-centre mb-4">
              <span className="text-2xl font-bold text-primary-600">3</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Removal & Cleaning</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Systematic removal of contaminated materials and thorough cleaning of all affected surfaces.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Contaminated material removal</li>
              <li>• HEPA vacuuming</li>
              <li>• Antimicrobial treatment</li>
              <li>• Surface restoration</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-primary-100 rounded-full flex items-centre justify-centre mb-4">
              <span className="text-2xl font-bold text-primary-600">4</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Verification Testing</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Post-remediation testing to verify successful completion and safe reoccupancy.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Clearance air testing</li>
              <li>• Visual inspection</li>
              <li>• Moisture verification</li>
              <li>• Final documentation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Types of Mould */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Common Mould Types We Remediate
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-neutral-50 to-gray-100 border border-neutral-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-neutral-600 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Stachybotrys (Black Mould)</h3>
            <p className="text-neutral-700 text-sm">
              Toxic black mould that produces harmful mycotoxins. Requires specialised remediation procedures 
              and strict containment protocols for safe removal.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-100 border border-green-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-600 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Aspergillus</h3>
            <p className="text-neutral-700 text-sm">
              Common indoor mould that can cause allergic reactions and respiratory problems. Various species 
              require different remediation approaches.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-100 border border-blue-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Penicillium</h3>
            <p className="text-neutral-700 text-sm">
              Blue-green mould commonly found on water-damaged materials. Can trigger allergic reactions 
              and asthma symptoms in sensitive individuals.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-orange-100 border border-yellow-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-yellow-600 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Cladosporium</h3>
            <p className="text-neutral-700 text-sm">
              Olive-green or brown mould that grows in cool, damp areas. Common on fabrics, wood surfaces, 
              and HVAC systems. Can cause respiratory symptoms.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-100 border border-purple-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-600 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Alternaria</h3>
            <p className="text-neutral-700 text-sm">
              Dark green or brown mould commonly found in damp areas like showers and basements. 
              Major allergen that can trigger asthma attacks.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-pink-100 border border-red-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-red-600 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Fusarium</h3>
            <p className="text-neutral-700 text-sm">
              Pink, white, or red mould that thrives in water-damaged areas. Can produce mycotoxins 
              and cause infections in immunocompromised individuals.
            </p>
          </div>
        </div>
      </section>

      {/* Advanced Equipment */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Professional Mould Remediation Equipment
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                HEPA Air Scrubbers
              </h3>
              <p className="text-neutral-700 mb-4">
                Hospital-grade HEPA filtration systems that remove 99.97% of mould spores and particulates 
                from the air, creating negative pressure environments during remediation.
              </p>
              <div className="flex items-centre text-sm text-primary-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                99.97% Particle Removal Efficiency
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Moisture Detection Systems
              </h3>
              <p className="text-neutral-700 mb-4">
                Advanced moisture meters and thermal imaging cameras to identify hidden moisture sources 
                that support mould growth and verify complete drying after remediation.
              </p>
              <div className="flex items-centre text-sm text-primary-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Precision Moisture Monitoring
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Antimicrobial Fogging Systems
              </h3>
              <p className="text-neutral-700 mb-4">
                Professional fogging equipment delivers antimicrobial treatments to all surfaces, 
                ensuring complete mould elimination and preventing reoccurrence.
              </p>
              <div className="flex items-centre text-sm text-primary-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                EPA-Registered Antimicrobials
              </div>
            </div>
          </div>
          
          <div className="relative">
            <SEOImage
              src="/images/optimised/equipment/3D Moisture Meter Reading.png"
              alt="Professional moisture meter reading during mould assessment and remediation"
              width={500}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Health & Safety */}
      <section className="mb-16 bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Health Risks & Safety Protocols
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Health Risks of Mould Exposure
            </h3>
            <div className="space-y-4 mb-6">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Respiratory Problems</h4>
                  <p className="text-neutral-700 text-sm">Coughing, wheezing, shortness of breath, and asthma exacerbation</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Allergic Reactions</h4>
                  <p className="text-neutral-700 text-sm">Skin rashes, eye irritation, nasal congestion, and throat irritation</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-red-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Toxic Effects</h4>
                  <p className="text-neutral-700 text-sm">Mycotoxin exposure from certain moulds can cause serious health complications</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Our Safety Protocols
            </h3>
            <div className="space-y-3">
              <div className="flex items-centre">
                <svg className="w-5 h-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">Full personal protective equipment (PPE)</span>
              </div>
              
              <div className="flex items-centre">
                <svg className="w-5 h-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">Complete containment barriers</span>
              </div>
              
              <div className="flex items-centre">
                <svg className="w-5 h-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">HEPA filtration and negative pressure</span>
              </div>
              
              <div className="flex items-centre">
                <svg className="w-5 h-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">Safe disposal of contaminated materials</span>
              </div>
              
              <div className="flex items-centre">
                <svg className="w-5 h-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">Air quality monitoring throughout process</span>
              </div>
              
              <div className="flex items-centre">
                <svg className="w-5 h-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">Post-remediation verification testing</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Prevention Tips */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Mould Prevention Strategies
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Control Moisture</h3>
            <p className="text-neutral-700 text-sm">
              Keep indoor humidity below 50%, fix leaks promptly, and ensure proper ventilation 
              in moisture-prone areas like bathrooms and kitchens.
            </p>
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Regular Inspections</h3>
            <p className="text-neutral-700 text-sm">
              Conduct regular visual inspections of areas prone to moisture problems and 
              address any signs of water intrusion immediately.
            </p>
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Proper Ventilation</h3>
            <p className="text-neutral-700 text-sm">
              Ensure adequate airflow throughout your property with properly functioning 
              HVAC systems and exhaust fans in high-humidity areas.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-primary-500 to-primary-600 rounded-2xl p-8 text-centre text-white">
        <h2 className="text-3xl font-bold mb-4">
          Suspect Mould? Get Professional Assessment
        </h2>
        <p className="text-xl text-primary-100 mb-8 max-w-3xl mx-auto">
          Don't risk your health with DIY mould removal. Our IICRC S520 certified specialists provide 
          safe, effective mould remediation with complete health and safety protocols.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-centre">
          <a
            href="tel:1800-DISASTER"
            className="inline-flex items-centre justify-centre px-8 py-4 bg-white text-primary-600 rounded-lg font-bold text-lg hover:bg-primary-50 transition-colours"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call: 1-800-DISASTER
          </a>
          <Link
            href="/mould-assessment"
            className="inline-flex items-centre justify-centre px-8 py-4 bg-primary-700 text-white rounded-lg font-bold text-lg hover:bg-primary-800 transition-colours"
          >
            Schedule Free Assessment
          </Link>
        </div>
      </section>
    </ServicePageLayout>
  );
}