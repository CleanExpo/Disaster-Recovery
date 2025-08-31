import type { Metadata } from 'next';
import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import Image from 'next/image';
import Link from 'next/link';

// SEO Metadata with comprehensive emergency response keywords
export const metadata: Metadata = {
  title: '24/7 Online Emergency Response Services | Disaster Recovery Specialists | 1-Hour Response Time',
  description: 'Professional 24/7 emergency response services for disaster recovery. Water damage, fire damage, storm damage emergency mitigation. 1-hour response time nationwide.',
  keywords: [
    'emergency response services',
    '24/7 emergency response',
    'disaster emergency response',
    'emergency mitigation',
    'emergency restoration',
    'rapid response team',
    'emergency water extraction',
    'emergency board up',
    'emergency tarping',
    'disaster response team',
    'emergency cleanup',
    'immediate response',
    'emergency contractors',
    '24 hour emergency service',
    'disaster mitigation'
  ],
  openGraph: {
    title: '24/7 Online Emergency Response Services | 1-Hour Response Time',
    description: 'Professional 24/7 emergency response for disaster recovery. Rapid response team available for water, fire, and storm damage emergencies.',
    images: [
      {
        url: '/images/optimised/process/3D Assessment.png',
        width: 1200,
        height: 630,
        alt: '24/7 emergency response service' },
    ] },
  twitter: {
    card: 'summary_large_image',
    title: '24/7 Online Emergency Response Services | Disaster Recovery',
    description: 'Professional emergency response team available 24/7. 1-hour response time for disaster recovery emergencies.',
    images: ['/images/optimised/process/3D Assessment.png'] },
  alternates: {
    canonical: '/services/emergency-response' },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751' }
};

// Schema.org structured data for emergency response
const schemaData = {
  "@context": "https://schema.org",
  "@type": ["Service", "LocalBusiness", "EmergencyService"],
  "name": "24/7 Online Emergency Response Services",
  "description": "Professional 24/7 emergency response services for disaster recovery including water damage, fire damage, and storm damage mitigation.",
  "serviceType": "Emergency Response",
  "provider": {
    "@type": "Organisation",
    "name": "Disaster Recovery",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU"
    },
    "telephone": "",
    "email": "emergency@disasterrecoveryaustralia.com.au"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Australia"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "/services/emergency-response",
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
    "description": "24/7 emergency response services",
    "price": "Emergency rates apply",
    "priceCurrency": "AUD"
  },
  "additionalType": "https://www.wikidata.org/wiki/Q1391679",
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
      "name": "Emergency Response Certified"
    }
  ]
};

const relatedServices = [
  {
    title: 'Fire Damage Restoration',
    href: '/services/fire-damage',
    image: '/images/optimised/damage/3D Fire Damage.png'
  },
  {
    title: 'Water Damage Restoration',
    href: '/services/water-damage-restoration',
    image: '/images/optimised/damage/3D Water Damage.png'
  },
  {
    title: 'Storm Damage Repair',
    href: '/services/storm-damage',
    image: '/images/optimised/damage/3D Hurricane Damage.png'
  },
  {
    title: 'Structural Drying',
    href: '/services/structural-drying',
    image: '/images/optimised/equipment/3D Dehumidifier.png'
  }
];

const faqs = [
  {
    question: "How quickly can you respond to an emergency?",
    answer: "We guarantee a 1-hour response time in major metropolitan areas and within 2-3 hours in regional areas. Our teams are strategically positioned nationwide to ensure rapid response to any disaster emergency."
  },
  {
    question: "What constitutes a disaster emergency that requires immediate response?",
    answer: "Any situation causing active damage or posing immediate safety risks including: burst pipes, flooding, fire damage, storm damage, sewage backups, or structural damage. If damage is actively occurring, it's an emergency."
  },
  {
    question: "Are you available 24/7 including weekends and holidays?",
    answer: "Yes, our emergency response teams operate 24 hours a day, 7 days a week, 365 days a year including all holidays. Disasters don't follow business hours, and neither do we."
  },
  {
    question: "What emergency mitigation services do you provide?",
    answer: "We provide complete emergency mitigation including water extraction, emergency board-up, tarping, structural stabilization, debris removal, and temporary power. Our goal is to stop further damage immediately."
  },
  {
    question: "Will insurance cover emergency mitigation costs?",
    answer: "Yes, most insurance policies cover emergency mitigation to prevent further damage. We can begin work immediately and coordinate with your insurance company to ensure coverage."
  },
  {
    question: "Do you have the equipment and manpower for large emergencies?",
    answer: "Yes, we maintain fully-equipped trucks and can mobilize additional resources for large-scale disasters. Our network of certified contractors ensures we can handle emergencies of any size."
  },
  {
    question: "What should I do while waiting for your emergency team to arrive?",
    answer: "Ensure everyone's safety first, stop the source if possible (shut off water/gas/electricity), document the damage with photos, and avoid entering dangerous areas. Our dispatcher will provide specific guidance when you call."
  },
  {
    question: "Can you help with emergency accommodations if my property is uninhabitable?",
    answer: "While we don't provide accommodations directly, we can coordinate with your insurance company for temporary housing coverage and recommend local resources for immediate shelter needs."
  }
];

export default function EmergencyResponsePage() {
  return (
    <ServicePageLayout
      title="24/7 Online Emergency Response Services"
      description="Professional 24/7 emergency response services for disaster recovery. Rapid response team available for water damage, fire damage, storm damage, and all disaster emergencies with 1-hour response guarantee."
      heroImage="/images/optimised/process/3D Assessment.png"
      heroImageAlt="24/7 emergency response team conducting rapid disaster assessment and mitigation"
      certifications={['IICRC WRT', 'IICRC FSRT', 'Emergency Response Certified', 'HAZMAT Licensed']}
      responseTime="1 Hour"
      availability="24/7/365"
      relatedServices={relatedServices}
      faqs={faqs}
      schemaData={schemaData}
    >
      {/* Service Overview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Rapid Emergency Response When You Need It Most
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-lg text-neutral-700 mb-6">
              When disaster strikes, every minute counts. Our 24/7 emergency response teams are strategically 
              positioned nationwide to provide immediate mitigation services that stop ongoing damage and 
              begin the recovery process. We understand that disasters don't wait for convenient hours.
            </p>
            
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Why Speed Matters</h3>
            <p className="text-neutral-700 mb-6">
              The first few hours after a disaster are critical. Water continues to spread, smoke residue 
              becomes more corrosive, and structural damage can worsen. Our rapid response minimizes secondary 
              damage and reduces overall restoration costs significantly.
            </p>
          </div>
          
          <div className="relative">
            <Image
              src="/images/optimised/equipment/3D Extraction Unit.png"
              alt="Emergency water extraction equipment ready for rapid deployment"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        {/* Emergency Hotline Banner */}
        <div className="bg-gradient-to-r from-emergency-500 to-emergency-600 rounded-2xl p-8 text-center text-white mb-8">
          <h3 className="text-2xl font-bold mb-4">Emergency Hotline Available Now</h3>
          <p className="text-xl text-emergency-100 mb-6">
            Call our emergency hotline for immediate response to any disaster situation
          </p>
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-emergency-600 rounded-lg font-bold text-2xl hover:bg-emergency-50 transition-colours"
          >
            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Contact Us
          </a>
        </div>
      </section>

      {/* Response Process */}
      <section className="mb-16 bg-gradient-to-br from-primary-50 to-neutral-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Our Emergency Response Process
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-emergency-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-emergency-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Emergency Call</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Call our 24/7 hotline. Our emergency dispatchers assess the situation and deploy the nearest team immediately.
            </p>
            <div className="bg-emergency-50 rounded-lg p-3">
              <p className="text-xs font-medium text-emergency-700">Response Time: Immediate dispatch</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-emergency-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-emergency-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Rapid Deployment</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Fully-equipped emergency teams mobilize within minutes with all necessary equipment and supplies.
            </p>
            <div className="bg-emergency-50 rounded-lg p-3">
              <p className="text-xs font-medium text-emergency-700">Response Time: 1-2 hours arrival</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-emergency-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-emergency-600">3</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Immediate Mitigation</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Stop ongoing damage with emergency water extraction, board-up, tarping, or other critical interventions.
            </p>
            <div className="bg-emergency-50 rounded-lg p-3">
              <p className="text-xs font-medium text-emergency-700">Goal: Stop damage immediately</p>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-emergency-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-emergency-600">4</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Assessment & Planning</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Comprehensive damage assessment and development of complete restoration plan with timeline.
            </p>
            <div className="bg-emergency-50 rounded-lg p-3">
              <p className="text-xs font-medium text-emergency-700">Outcome: Complete recovery plan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Emergency Services */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Emergency Services Available 24/7
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Emergency Water Extraction</h3>
            <p className="text-neutral-700 text-sm">
              Rapid deployment of industrial water extraction equipment to remove standing water 
              from burst pipes, flooding, or storm damage.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-red-50 border border-orange-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Fire Damage Mitigation</h3>
            <p className="text-neutral-700 text-sm">
              Emergency smoke removal, soot cleaning, and structural stabilization to prevent 
              further fire and smoke damage progression.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-neutral-50 border border-gray-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Emergency Board-Up</h3>
            <p className="text-neutral-700 text-sm">
              Immediate security and weather protection for damaged doors, windows, and openings 
              to prevent vandalism and further weather damage.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a2 2 0 002 2h14a2 2 0 002-2V9a2 2 0 00-2-2H5a2 2 0 00-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Emergency Tarping</h3>
            <p className="text-neutral-700 text-sm">
              Professional roof tarping and structural covering to prevent water intrusion 
              from storm damage or compromised building envelope.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Emergency Power & Utilities</h3>
            <p className="text-neutral-700 text-sm">
              Temporary power setup, utility isolation, and emergency services coordination 
              to ensure safety and enable immediate restoration work.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Emergency Debris Removal</h3>
            <p className="text-neutral-700 text-sm">
              Rapid removal of debris, fallen trees, and damaged materials to enable safe 
              access and prevent additional property damage.
            </p>
          </div>
        </div>
      </section>

      {/* Equipment & Resources */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Fully-Equipped Emergency Fleet
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Mobile Command Units
              </h3>
              <p className="text-neutral-700 mb-4">
                Fully-equipped trucks containing all essential emergency equipment, tools, and supplies 
                strategically positioned across major metropolitan areas for rapid deployment.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Water extraction units
                </div>
                <div className="flex items-center text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Industrial dehumidifiers
                </div>
                <div className="flex items-center text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  HEPA air scrubbers
                </div>
                <div className="flex items-center text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Emergency generators
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Professional Equipment Inventory
              </h3>
              <p className="text-neutral-700 mb-4">
                Comprehensive inventory of professional-grade restoration equipment including specialty 
                tools for different types of disasters and emergency situations.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Thermal imaging cameras
                </div>
                <div className="flex items-center text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Moisture detection meters
                </div>
                <div className="flex items-center text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Board-up materials
                </div>
                <div className="flex items-center text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Protective tarping systems
                </div>
              </div>
            </div>
          </div>
          
          <div className="relative">
            <Image
              src="/images/optimised/equipment/3D Industrial Fan.png"
              alt="Industrial emergency response equipment including powerful drying fans"
              width={500}
              height={600}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
      </section>

      {/* Coverage Areas */}
      <section className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Emergency Response Coverage
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Nationwide Emergency Network
            </h3>
            <p className="text-neutral-700 mb-6">
              Our emergency response network spans all major Australian cities and regional areas, 
              with strategically positioned teams and equipment to ensure rapid response times nationwide.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-success-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Metropolitan Areas</h4>
                  <p className="text-neutral-700 text-sm">1-hour guaranteed response time in Sydney, Melbourne, Brisbane, Perth, Adelaide</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-success-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Regional Centres</h4>
                  <p className="text-neutral-700 text-sm">2-3 hour response time in regional cities and major towns</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-success-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Rural Areas</h4>
                  <p className="text-neutral-700 text-sm">Mobile units can reach most rural areas within 4-6 hours</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Emergency Response Guarantee
            </h3>
            <p className="text-neutral-700 mb-4">
              We guarantee our emergency response times and maintain backup resources to ensure 
              we can meet our commitments even during high-demand periods.
            </p>
            
            <div className="bg-primary-50 border border-primary-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-primary-700 mb-2">Our Response Commitment:</h4>
              <ul className="text-sm text-primary-600 space-y-1">
                <li>• 24/7/365 emergency hotline staffing</li>
                <li>• Immediate dispatch upon call receipt</li>
                <li>• Real-time GPS tracking of response teams</li>
                <li>• Backup team mobilization if needed</li>
                <li>• Regular response time performance audits</li>
              </ul>
            </div>
            
            <div className="bg-emergency-50 border border-emergency-200 rounded-lg p-4">
              <p className="text-sm font-medium text-emergency-700">
                Emergency situations requiring immediate response qualify for our response time guarantee. 
                Contact us immediately for any active disaster situation.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* When to Call */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          When to Call Our Emergency Response Team
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-pink-50 border-2 border-red-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Active Water Damage</h3>
            <ul className="text-neutral-700 text-sm space-y-1">
              <li>• Burst pipes or major leaks</li>
              <li>• Flooding from storms or sewage</li>
              <li>• Hot water system failures</li>
              <li>• Appliance water damage</li>
              <li>• Roof leaks during storms</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-red-50 border-2 border-orange-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Fire & Smoke Emergencies</h3>
            <ul className="text-neutral-700 text-sm space-y-1">
              <li>• Recent fire damage</li>
              <li>• Active smoke infiltration</li>
              <li>• Electrical fire damage</li>
              <li>• Kitchen fire incidents</li>
              <li>• Bushfire smoke exposure</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-neutral-100 border-2 border-gray-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Storm Damage</h3>
            <ul className="text-neutral-700 text-sm space-y-1">
              <li>• Roof damage from hail or wind</li>
              <li>• Broken windows from storms</li>
              <li>• Tree damage to structures</li>
              <li>• Flooding from heavy rain</li>
              <li>• Structural damage assessment</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Structural Emergencies</h3>
            <ul className="text-neutral-700 text-sm space-y-1">
              <li>• Building collapse or instability</li>
              <li>• Major structural damage</li>
              <li>• Vehicle impact damage</li>
              <li>• Foundation or support issues</li>
              <li>• Safety hazard situations</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border-2 border-purple-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Biohazard Situations</h3>
            <ul className="text-neutral-700 text-sm space-y-1">
              <li>• Sewage backups and overflows</li>
              <li>• Contaminated water damage</li>
              <li>• Biohazard material exposure</li>
              <li>• Infectious disease cleanup</li>
              <li>• HAZMAT incidents</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Security Emergencies</h3>
            <ul className="text-neutral-700 text-sm space-y-1">
              <li>• Vandalism or break-in damage</li>
              <li>• Broken doors or windows</li>
              <li>• Property security compromise</li>
              <li>• Emergency board-up needs</li>
              <li>• Weather protection required</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-emergency-500 to-emergency-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Emergency? Don't Wait - Submit Form Now
        </h2>
        <p className="text-xl text-emergency-100 mb-8 max-w-3xl mx-auto">
          Our emergency response teams are standing by 24/7 to respond to your disaster emergency. 
          The faster you call, the less damage and lower the restoration costs.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-emergency-600 rounded-lg font-bold text-xl hover:bg-emergency-50 transition-colours"
          >
            <svg className="w-8 h-8 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            EMERGENCY: Contact Us
          </a>
          <Link
            href="/emergency-form"
            className="inline-flex items-center justify-center px-8 py-4 bg-emergency-700 text-white rounded-lg font-bold text-lg hover:bg-emergency-800 transition-colours"
          >
            Request Emergency Service
          </Link>
        </div>
        
        <div className="mt-8 pt-8 border-t border-emergency-400">
          <p className="text-emergency-100 mb-2">
            <strong>Remember: In life-threatening emergencies, call 000 first</strong>
          </p>
          <p className="text-emergency-200 text-sm">
            Our emergency response is for property disasters and mitigation services
          </p>
        </div>
      </section>
    </ServicePageLayout>
  );
}