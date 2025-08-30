import type { Metadata } from 'next';
import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { SEOImage } from '@/components/ui/seo-image';
import Link from 'next/link';

// SEO Metadata with comprehensive fire damage keywords
export const metadata: Metadata = {
  title: 'Fire & Smoke Damage Restoration | IICRC Certified Specialists | Available 24/7',
  description: 'Expert fire and smoke damage restoration services following IICRC S700 standards. Soot removal, smoke odour elimination, structural fire damage repair. 24/7 emergency response nationwide.',
  keywords: [
    'fire damage restoration',
    'smoke damage cleanup',
    'soot removal',
    'fire damage repair',
    'smoke odour removal',
    'IICRC S700 certified',
    'structural fire damage',
    'fire restoration company',
    'smoke damage restoration',
    'fire cleanup services',
    'thermal fogging',
    'ozone treatment',
    'fire damage assessment',
    'smoke residue removal',
    'fire damage specialists'
  ],
  openGraph: {
    title: 'Fire & Smoke Damage Restoration | IICRC Certified Specialists',
    description: 'Professional fire and smoke damage restoration following IICRC S700 standards. 24/7 emergency response for complete fire damage recovery.',
    images: [
      {
        url: '/images/optimised/damage/3D image of a house fire.png',
        width: 1200,
        height: 630,
        alt: 'Professional fire damage restoration service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Fire & Smoke Damage Restoration | IICRC Certified',
    description: 'Expert fire damage restoration services. IICRC S700 certified technicians. 24/7 emergency response nationwide.',
    images: ['/images/optimised/damage/3D image of a house fire.png'],
  },
  alternates: {
    canonical: '/services/fire-damage',
  },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751',
  }
};

// Schema.org structured data for fire damage restoration
const schemaData = {
  "@context": "https://schema.org",
  "@type": ["Service", "LocalBusiness"],
  "name": "Fire & Smoke Damage Restoration Services",
  "description": "Professional fire and smoke damage restoration services following IICRC S700 standards with 24/7 emergency response.",
  "serviceType": "Fire Damage Restoration",
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
    "serviceUrl": "/services/fire-damage",
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
    "description": "Fire and smoke damage restoration services",
    "price": "Varies based on assessment",
    "priceCurrency": "AUD"
  },
  "additionalType": "https://www.wikidata.org/wiki/Q811430",
  "certification": [
    {
      "@type": "Certification",
      "name": "IICRC S700 - Fire and Smoke Damage Restoration"
    },
    {
      "@type": "Certification", 
      "name": "IICRC WRT - Water Damage Restoration Technician"
    },
    {
      "@type": "Certification",
      "name": "RIA - Restoration Industry Association"
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
    title: 'Mould Remediation',
    href: '/services/mould-remediation',
    image: '/images/optimised/damage/3D Mould Damage.png'
  },
  {
    title: 'Storm Damage Repair',
    href: '/services/storm-damage',
    image: '/images/optimised/damage/3D Hurricane Damage.png'
  },
  {
    title: 'Emergency Response',
    href: '/services/emergency-response',
    image: '/images/optimised/process/3D Assessment.png'
  }
];

const faqs = [
  {
    question: "How quickly can you respond to fire damage emergencies?",
    answer: "We provide 24/7 emergency response with technicians typically arriving within 1-2 hours in major metropolitan areas. Our rapid response helps minimize secondary damage and begins the restoration process immediately."
  },
  {
    question: "What does the IICRC S700 standard cover for fire damage restoration?",
    answer: "IICRC S700 establishes professional procedures for fire and smoke damage restoration including assessment protocols, cleaning methods, deodorization techniques, and structural restoration standards. All our technicians are certified to these industry standards."
  },
  {
    question: "How do you remove smoke odours permanently?",
    answer: "We use multiple proven methods including thermal fogging, ozone treatment, hydroxyl generators, and specialised cleaning agents. The method depends on the type of smoke damage and affected materials, following IICRC S700 protocols."
  },
  {
    question: "Will insurance cover fire damage restoration costs?",
    answer: "Most comprehensive insurance policies cover fire damage restoration. We work directly with all major insurance companies, provide detailed documentation, and can often arrange direct billing to streamline the claims process."
  },
  {
    question: "Can you restore items damaged by smoke and soot?",
    answer: "Yes, we provide contents restoration services using specialised cleaning techniques, ultrasonic cleaning, and controlled atmosphere drying. Items are assessed individually, and we can often restore items that appear beyond repair."
  },
  {
    question: "How long does fire damage restoration typically take?",
    answer: "Timeline varies based on damage extent, but typically ranges from 3-7 days for minor damage to several weeks for major structural restoration. We provide detailed timelines after our initial assessment."
  },
  {
    question: "Do you handle structural repairs after fire damage?",
    answer: "Yes, we provide complete fire damage restoration including structural repairs, electrical work, plumbing, and cosmetic restoration. Our certified contractors can rebuild your property to pre-loss condition or better."
  },
  {
    question: "What safety measures do you take during fire damage cleanup?",
    answer: "We follow strict safety protocols including air quality monitoring, personal protective equipment, containment of affected areas, and proper disposal of damaged materials. All work complies with occupational health and safety standards."
  }
];

export default function FireDamagePage() {
  return (
    <ServicePageLayout
      title="Fire & Smoke Damage Restoration"
      description="Expert fire and smoke damage restoration services following IICRC S700 standards. Professional soot removal, smoke odour elimination, and complete structural fire damage repair with 24/7 emergency response."
      heroImage="/images/optimised/damage/3D image of a house fire.png"
      heroImageAlt="Professional fire damage restoration service showing expert technicians assessing and cleaning fire-damaged property"
      certifications={['IICRC S700', 'IICRC WRT', 'RIA Certified', 'HAZMAT Licensed', 'OH&S Compliant']}
      responseTime="1-2 Hours"
      availability="24/7/365"
      relatedServices={relatedServices}
      faqs={faqs}
      schemaData={schemaData}
    >
      {/* Service Overview */}
      <section className="mb-16 r6-fade-in">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Professional Fire & Smoke Damage Restoration
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-lg text-gray-300 mb-6">
              Fire damage extends far beyond what meets the eye. Smoke, soot, and heat can penetrate deep into building materials, 
              HVAC systems, and personal belongings, causing ongoing damage even after flames are extinguished. Our IICRC S700 
              certified specialists provide comprehensive fire damage restoration using industry-leading techniques and equipment.
            </p>
            
            <h3 className="text-xl font-semibold text-white mb-4 r6-text-glow-subtle">Immediate Response Critical</h3>
            <p className="text-gray-400 mb-6">
              Time is crucial in fire damage restoration. Acidic smoke residues become increasingly corrosive, and secondary 
              damage from firefighting efforts can compound the problem. Our 24/7 emergency response team begins mitigation 
              immediately to prevent further damage and reduce restoration costs.
            </p>
          </div>
          
          <div className="relative">
            <SEOImage
              src="/images/optimised/equipment/3D Thermal Fogging.png"
              alt="Professional thermal fogging equipment for smoke odour elimination"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* IICRC S700 Process */}
      <section className="mb-16 r6-glass-card p-8 rounded-2xl r6-fade-in-delay-1">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          IICRC S700 Restoration Process
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="w-16 h-16 r6-glass-card r6-glow-blue rounded-full flex items-centre justify-centre mb-4 border-2 border-electric-blue">
              <span className="text-2xl font-bold text-electric-blue r6-text-glow">1</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Initial Assessment</h3>
            <p className="text-gray-400 mb-4">
              Comprehensive damage evaluation following S700 protocols including structural assessment, 
              smoke penetration analysis, and air quality testing.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li className="r6-list-item">• Thermal imaging surveys</li>
              <li className="r6-list-item">• Moisture content analysis</li>
              <li className="r6-list-item">• Contamination level testing</li>
              <li className="r6-list-item">• Detailed documentation</li>
            </ul>
          </div>
          
          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="w-16 h-16 r6-glass-card r6-glow-blue rounded-full flex items-centre justify-centre mb-4 border-2 border-electric-blue">
              <span className="text-2xl font-bold text-electric-blue r6-text-glow">2</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Stabilization & Cleaning</h3>
            <p className="text-gray-400 mb-4">
              Immediate stabilization of the structure followed by systematic cleaning of all affected surfaces 
              using specialised techniques for different materials.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li className="r6-list-item">• Emergency board-up/tarping</li>
              <li className="r6-list-item">• Soot and residue removal</li>
              <li className="r6-list-item">• HVAC system cleaning</li>
              <li className="r6-list-item">• Water damage mitigation</li>
            </ul>
          </div>
          
          <div className="r6-card-premium r6-hover-lift p-6">
            <div className="w-16 h-16 r6-glass-card r6-glow-blue rounded-full flex items-centre justify-centre mb-4 border-2 border-electric-blue">
              <span className="text-2xl font-bold text-electric-blue r6-text-glow">3</span>
            </div>
            <h3 className="text-xl font-semibold text-white mb-3">Deodorization & Restoration</h3>
            <p className="text-gray-400 mb-4">
              Complete odour elimination using multiple treatment methods followed by full structural 
              restoration to pre-loss condition.
            </p>
            <ul className="text-sm text-gray-500 space-y-1">
              <li className="r6-list-item">• Thermal fogging treatment</li>
              <li className="r6-list-item">• Ozone/hydroxyl generation</li>
              <li className="r6-list-item">• Structural reconstruction</li>
              <li className="r6-list-item">• Final quality inspection</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Specialised Equipment */}
      <section className="mb-16 r6-fade-in-delay-2">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Advanced Fire Damage Equipment
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="r6-glass-card border border-electric-blue/20 rounded-xl p-6 r6-hover-glow">
              <h3 className="text-xl font-semibold text-white mb-3">
                Thermal Fogging Systems
              </h3>
              <p className="text-gray-400 mb-4">
                Professional thermal fogging equipment creates microscopic droplets that penetrate the same 
                pathways as smoke, neutralizing odours at their source in porous materials and hard-to-reach areas.
              </p>
              <div className="flex items-centre text-sm text-primary-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                IICRC S700 Compliant Equipment
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Ozone Generators
              </h3>
              <p className="text-neutral-700 mb-4">
                High-output ozone generators for severe smoke odour elimination. These industrial units break down 
                odour-causing compounds at the molecular level for permanent odour removal.
              </p>
              <div className="flex items-centre text-sm text-primary-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Certified Safe Operation
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Ultrasonic Cleaning Systems
              </h3>
              <p className="text-neutral-700 mb-4">
                State-of-the-art ultrasonic cleaning for contents restoration. These systems remove soot and 
                residue from delicate items without damage, restoring items previously considered unsalvageable.
              </p>
              <div className="flex items-centre text-sm text-primary-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Contents Restoration Specialist
              </div>
            </div>
          </div>
          
          <div className="relative">
            <SEOImage
              src="/images/optimised/equipment/3D Moisture Meter Reading.png"
              alt="Professional moisture meter for fire damage assessment and monitoring"
              width={500}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Types of Fire Damage */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Types of Fire Damage We Restore
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-emergency-50 to-orange-50 border border-emergency-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-emergency-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-emergency-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Structure Fires</h3>
            <p className="text-neutral-700 text-sm">
              Complete restoration of residential and commercial properties affected by structural fires including 
              electrical, kitchen, and heating system fires.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-neutral-50 to-gray-50 border border-neutral-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-neutral-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-neutral-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Smoke Damage</h3>
            <p className="text-neutral-700 text-sm">
              Specialised cleaning and deodorization for properties affected by smoke without direct fire damage, 
              including neighboring property smoke infiltration.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Bushfire Damage</h3>
            <p className="text-neutral-700 text-sm">
              Specialised restoration for properties affected by bushfires including ember damage, radiant heat 
              damage, and extensive smoke infiltration from wildfire events.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-sky-50 border border-blue-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Chemical Fires</h3>
            <p className="text-neutral-700 text-sm">
              Specialised handling and restoration of properties affected by chemical fires requiring HAZMAT 
              protocols and specialised cleaning agents.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-amber-50 border border-yellow-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Electrical Fires</h3>
            <p className="text-neutral-700 text-sm">
              Complete restoration including electrical system assessment and repair, specialised cleaning of 
              electronic equipment, and safety compliance verification.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 14v3m4-3v3m4-3v3M3 21h18M3 10h18M10.5 3L12 2l1.5 1H21v6H3V3h7.5z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Contents Restoration</h3>
            <p className="text-neutral-700 text-sm">
              Specialised restoration of personal belongings, furniture, electronics, documents, and artwork 
              using advanced cleaning and restoration techniques.
            </p>
          </div>
        </div>
      </section>

      {/* Insurance Information */}
      <section className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Insurance & Fire Damage Claims
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              We Work With All Major Insurers
            </h3>
            <p className="text-neutral-700 mb-6">
              Our team has extensive experience working with insurance companies on fire damage claims. 
              We provide detailed documentation, accurate estimates, and can often arrange direct billing 
              to streamline your claim process.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-success-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Comprehensive Documentation</h4>
                  <p className="text-neutral-700 text-sm">Detailed damage assessment reports with photos and moisture readings</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-success-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Direct Insurance Billing</h4>
                  <p className="text-neutral-700 text-sm">We can bill your insurance company directly to minimize out-of-pocket costs</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-success-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Claims Support</h4>
                  <p className="text-neutral-700 text-sm">Expert assistance with claim documentation and insurance communication</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Emergency Mitigation Coverage
            </h3>
            <p className="text-neutral-700 mb-4">
              Most insurance policies cover emergency mitigation to prevent further damage. We can begin 
              work immediately and coordinate with your insurance adjuster.
            </p>
            
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4">
              <h4 className="font-semibold text-primary-700 mb-2">What's Typically Covered:</h4>
              <ul className="text-sm text-primary-600 space-y-1">
                <li>• Emergency board-up and tarping</li>
                <li>• Water extraction and drying</li>
                <li>• Smoke and soot cleaning</li>
                <li>• Structural repairs and reconstruction</li>
                <li>• Contents cleaning and restoration</li>
                <li>• Temporary living expenses</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-emergency-500 to-emergency-600 rounded-2xl p-8 text-centre text-white">
        <h2 className="text-3xl font-bold mb-4">
          Fire Damage Emergency? We're Ready Now
        </h2>
        <p className="text-xl text-emergency-100 mb-8 max-w-3xl mx-auto">
          Every minute counts after a fire. Our IICRC S700 certified technicians are standing by 24/7 
          to begin emergency mitigation and start the restoration process immediately.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-centre">
          <a
            href="tel:1800-DISASTER"
            className="inline-flex items-centre justify-centre px-8 py-4 bg-white text-emergency-600 rounded-lg font-bold text-lg hover:bg-emergency-50 transition-colours"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Emergency: 1-800-DISASTER
          </a>
          <Link
            href="/emergency-form"
            className="inline-flex items-centre justify-centre px-8 py-4 bg-emergency-700 text-white rounded-lg font-bold text-lg hover:bg-emergency-800 transition-colours"
          >
            Request Emergency Service
          </Link>
        </div>
      </section>
    </ServicePageLayout>
  );
}