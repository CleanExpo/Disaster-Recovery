import type { Metadata } from 'next';
import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { SEOImage } from '@/components/ui/seo-image';
import Link from 'next/link';

// SEO Metadata with comprehensive storm damage keywords
export const metadata: Metadata = {
  title: 'Storm & Natural Disaster Recovery | Emergency Response | Roof Repair & Restoration',
  description: 'Professional storm and natural disaster recovery services. Cyclone, hail, wind damage restoration. Emergency roof repair, structural restoration. 24/7 emergency response Australia-wide.',
  keywords: [
    'storm damage restoration',
    'cyclone damage repair',
    'hail damage restoration',
    'wind damage repair',
    'natural disaster recovery',
    'roof storm damage',
    'emergency roof repair',
    'storm cleanup',
    'tree damage removal',
    'flood damage restoration',
    'storm restoration company',
    'severe weather damage',
    'tornado damage repair',
    'lightning damage restoration',
    'bushfire damage recovery'
  ],
  openGraph: {
    title: 'Storm & Natural Disaster Recovery Services | 24/7 Emergency Response',
    description: 'Professional storm and natural disaster recovery services. Expert cyclone, hail, and wind damage restoration with 24/7 emergency response Australia-wide.',
    images: [
      {
        url: '/images/optimised/damage/3D Hurricane Damage.png',
        width: 1200,
        height: 630,
        alt: 'Professional storm damage restoration service',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Storm & Natural Disaster Recovery | Emergency Response',
    description: 'Expert storm damage restoration services. Professional cyclone, hail, and wind damage repair available 24/7.',
    images: ['/images/optimised/damage/3D Hurricane Damage.png'],
  },
  alternates: {
    canonical: '/services/storm-damage',
  },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751',
  }
};

// Schema.org structured data for storm damage restoration
const schemaData = {
  "@context": "https://schema.org",
  "@type": ["Service", "LocalBusiness", "EmergencyService"],
  "name": "Storm & Natural Disaster Recovery Services",
  "description": "Professional storm and natural disaster recovery services including cyclone damage repair, hail damage restoration, and emergency structural restoration.",
  "serviceType": "Storm Damage Restoration",
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
    "serviceUrl": "/services/storm-damage",
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
    "description": "Storm and natural disaster recovery services",
    "price": "Varies based on assessment",
    "priceCurrency": "AUD"
  },
  "additionalType": "https://www.wikidata.org/wiki/Q8074",
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
      "name": "Storm Damage Restoration Specialist"
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
    title: 'Structural Drying',
    href: '/services/structural-drying',
    image: '/images/optimised/equipment/3D Dehumidifier.png'
  }
];

const faqs = [
  {
    question: "How quickly can you respond to storm damage emergencies?",
    answer: "We provide 24/7 emergency response with teams typically arriving within 1-2 hours in major metropolitan areas. Storm damage requires immediate attention to prevent further weather exposure and water intrusion."
  },
  {
    question: "What types of storm damage do you handle?",
    answer: "We handle all types of storm damage including cyclone damage, hail damage, wind damage, tornado damage, lightning strikes, tree damage, roof damage, flooding from storms, and structural damage from severe weather events."
  },
  {
    question: "Do you provide emergency board-up and tarping services?",
    answer: "Yes, emergency board-up and tarping are our priority services to prevent further weather damage. We carry materials and equipment to immediately secure damaged openings, roofs, and structures."
  },
  {
    question: "Can you handle large-scale disaster recovery?",
    answer: "Yes, we have the resources and network to handle major disaster recovery including cyclone zones, widespread storm damage, and community-wide restoration projects. We can mobilize additional teams as needed."
  },
  {
    question: "Will insurance cover storm damage restoration?",
    answer: "Most comprehensive property insurance policies cover sudden storm damage. We work directly with all major insurers, provide detailed documentation, and can often arrange direct billing to streamline your claim."
  },
  {
    question: "Do you work with the SES and emergency services?",
    answer: "Yes, we coordinate with the State Emergency Service (SES), local councils, and emergency management agencies during major weather events to provide professional restoration services as part of disaster recovery efforts."
  },
  {
    question: "How do you assess structural damage from storms?",
    answer: "Our certified technicians conduct comprehensive structural assessments using advanced tools including moisture meters, thermal imaging, and drone inspections to identify all damage including hidden water intrusion and structural compromise."
  },
  {
    question: "Can you handle both residential and commercial storm damage?",
    answer: "Yes, we provide storm damage restoration for residential properties, commercial buildings, industrial facilities, and government properties. Our teams are equipped to handle projects of all sizes and complexity."
  }
];

export default function StormDamagePage() {
  return (
    <ServicePageLayout
      title="Storm & Natural Disaster Recovery"
      description="Professional storm and natural disaster recovery services including cyclone damage repair, hail damage restoration, emergency roof repair, and comprehensive structural restoration with 24/7 emergency response Australia-wide."
      heroImage="/images/optimised/damage/3D Hurricane Damage.png"
      heroImageAlt="Professional storm damage restoration service showing expert assessment and repair of severe weather damage"
      certifications={['IICRC WRT', 'IICRC FSRT', 'Storm Damage Specialist', 'Emergency Response Certified']}
      responseTime="1-2 Hours"
      availability="24/7/365"
      relatedServices={relatedServices}
      faqs={faqs}
      schemaData={schemaData}
    >
      {/* Service Overview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Comprehensive Storm & Natural Disaster Recovery
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-lg text-neutral-700 mb-6">
              Australia's severe weather patterns including cyclones, hailstorms, and intense wind events can cause 
              devastating property damage. Our storm damage recovery specialists provide immediate emergency response 
              and comprehensive restoration services to return your property to pre-loss condition safely and efficiently.
            </p>
            
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Immediate Response Critical</h3>
            <p className="text-neutral-700 mb-6">
              Storm damage leaves properties vulnerable to further weather exposure, water intrusion, and security 
              risks. Our 24/7 emergency response includes immediate stabilization, emergency board-up, tarping, 
              and water extraction to minimize secondary damage.
            </p>
          </div>
          
          <div className="relative">
            <SEOImage
              src="/images/optimised/damage/3D Vehicle into Home.png"
              alt="Professional storm damage assessment showing severe structural damage requiring immediate response"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        {/* Storm Warning Alert */}
        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl p-6 text-white mb-8">
          <div className="flex items-centre">
            <svg className="w-8 h-8 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-xl font-bold mb-2">Storm Season Preparation</h3>
              <p className="text-orange-100">
                Australia's storm season runs October to April. Ensure you have our emergency number saved: 
                <strong className="text-white"> Contact Us</strong>. We're standing by during all weather events.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Storm Damage Response Process */}
      <section className="mb-16 bg-gradient-to-br from-orange-50 to-red-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Emergency Storm Response Process
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-centre justify-centre mb-4">
              <span className="text-2xl font-bold text-orange-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Immediate Response</h3>
            <p className="text-neutral-700 text-sm mb-4">
              24/7 emergency dispatch with rapid response teams mobilizing immediately after your call.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Emergency call assessment</li>
              <li>• Team mobilization</li>
              <li>• Equipment preparation</li>
              <li>• Route planning</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-centre justify-centre mb-4">
              <span className="text-2xl font-bold text-orange-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Emergency Stabilization</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Immediate stabilization to prevent further damage including board-up, tarping, and water extraction.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Emergency board-up</li>
              <li>• Roof tarping</li>
              <li>• Water extraction</li>
              <li>• Tree/debris removal</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-centre justify-centre mb-4">
              <span className="text-2xl font-bold text-orange-600">3</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Damage Assessment</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Comprehensive assessment using advanced technology to identify all visible and hidden damage.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Drone inspection</li>
              <li>• Moisture mapping</li>
              <li>• Structural evaluation</li>
              <li>• Documentation</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-centre justify-centre mb-4">
              <span className="text-2xl font-bold text-orange-600">4</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Complete Restoration</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Full restoration including structural repairs, water damage mitigation, and property reconstruction.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Structural repairs</li>
              <li>• Water mitigation</li>
              <li>• Reconstruction</li>
              <li>• Final inspection</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Types of Storm Damage */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Storm Damage Types We Restore
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-blue-50 to-cyan-50 border border-blue-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Cyclone Damage</h3>
            <p className="text-neutral-700 text-sm">
              Complete recovery from tropical cyclones including Category 1-5 damage, structural repairs, 
              flooding, and debris removal across affected regions.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-neutral-100 border border-gray-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Hail Damage</h3>
            <p className="text-neutral-700 text-sm">
              Specialist hail damage restoration including roof repairs, gutter replacement, 
              vehicle damage, and exterior surface restoration from severe hailstorms.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Wind Damage</h3>
            <p className="text-neutral-700 text-sm">
              High wind damage restoration including roof repairs, structural stabilization, 
              window replacements, and restoration from severe wind events and microbursts.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border border-red-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Tornado Damage</h3>
            <p className="text-neutral-700 text-sm">
              Complete tornado damage recovery including structural reconstruction, debris removal, 
              and restoration from severe tornado events and damaging wind systems.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Lightning Damage</h3>
            <p className="text-neutral-700 text-sm">
              Lightning strike damage restoration including electrical system repairs, 
              fire damage cleanup, and electronic equipment recovery from electrical surges.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Tree Damage</h3>
            <p className="text-neutral-700 text-sm">
              Professional tree damage cleanup including tree removal, structural repairs 
              from fallen trees, and restoration of properties damaged by storm-felled vegetation.
            </p>
          </div>
        </div>
      </section>

      {/* Emergency Equipment */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Storm Response Equipment & Technology
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Drone Inspection Technology
              </h3>
              <p className="text-neutral-700 mb-4">
                Professional drone inspection systems provide safe, comprehensive assessment of storm damage 
                including roof damage, structural issues, and hard-to-reach areas without safety risks.
              </p>
              <div className="flex items-centre text-sm text-primary-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                4K Aerial Documentation & Assessment
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Emergency Stabilization Equipment
              </h3>
              <p className="text-neutral-700 mb-4">
                Comprehensive emergency equipment including materials for board-up, tarping, temporary 
                structural support, and weather protection to secure damaged properties immediately.
              </p>
              <div className="flex items-centre text-sm text-primary-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Immediate Storm Protection Response
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Heavy Machinery & Tree Removal
              </h3>
              <p className="text-neutral-700 mb-4">
                Professional tree removal equipment, heavy machinery for debris clearance, and specialised 
                equipment for safe removal of storm-damaged vegetation and structural elements.
              </p>
              <div className="flex items-centre text-sm text-primary-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Professional Debris Removal Services
              </div>
            </div>
          </div>
          
          <div className="relative">
            <SEOImage
              src="/images/optimised/equipment/3D Thermal Camera.png"
              alt="Professional thermal imaging equipment for detecting hidden storm damage"
              width={500}
              height={600}
              className="rounded-lg shadow-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 mb-2">Advanced Assessment Technology</h4>
              <p className="text-sm text-neutral-700">
                Thermal imaging, moisture detection, and structural analysis equipment to identify 
                all storm damage including hidden water intrusion and compromised materials.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Australian Storm Seasons */}
      <section className="mb-16 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Australian Storm Seasons & Preparedness
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Storm Season Calendar
            </h3>
            <p className="text-neutral-700 mb-6">
              Australia's severe weather patterns vary by region but generally follow predictable seasonal patterns. 
              Understanding these patterns helps with preparation and rapid response.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Northern Australia (October - April)</h4>
                <p className="text-neutral-700 text-sm">
                  Cyclone season with intense tropical storms, flooding, and wind damage. Peak activity December-March.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Eastern Australia (November - March)</h4>
                <p className="text-neutral-700 text-sm">
                  Severe thunderstorms, hail events, and intense rainfall. Peak activity January-February.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Southern Australia (May - September)</h4>
                <p className="text-neutral-700 text-sm">
                  Winter storms, wind damage, and flooding from cold fronts. Peak activity June-August.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Pre-Storm Preparation Services
            </h3>
            <p className="text-neutral-700 mb-4">
              Don't wait for disaster to strike. Our pre-storm preparation services help protect 
              your property before severe weather arrives.
            </p>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-4">
              <h4 className="font-semibold text-blue-700 mb-2">Preparation Services Include:</h4>
              <ul className="text-sm text-blue-600 space-y-1">
                <li>• Property vulnerability assessments</li>
                <li>• Preventive tree removal</li>
                <li>• Roof and gutter inspections</li>
                <li>• Window protection installation</li>
                <li>• Emergency supply positioning</li>
                <li>• Insurance documentation review</li>
              </ul>
            </div>
            
            <Link
              href="/storm-preparation"
              className="inline-flex items-centre justify-centre px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colours"
            >
              Schedule Preparation Assessment
            </Link>
          </div>
        </div>
      </section>

      {/* Insurance & Claims */}
      <section className="mb-16 bg-gradient-to-br from-green-50 to-emerald-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Storm Insurance Claims Support
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Complete Claims Management
            </h3>
            <p className="text-neutral-700 mb-6">
              Storm damage insurance claims require detailed documentation and professional assessment. 
              We provide comprehensive support throughout the entire claims process.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-success-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Emergency Mitigation</h4>
                  <p className="text-neutral-700 text-sm">Immediate mitigation covered by most policies to prevent further damage</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-success-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Detailed Documentation</h4>
                  <p className="text-neutral-700 text-sm">Professional damage assessment with photos, measurements, and technical reports</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-success-500 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Direct Insurance Billing</h4>
                  <p className="text-neutral-700 text-sm">Work directly with adjusters and arrange direct billing when possible</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Major Insurance Partners
            </h3>
            <p className="text-neutral-700 mb-4">
              We work with all major Australian insurance companies and understand their specific 
              requirements for storm damage claims.
            </p>
            
            <div className="grid grid-cols-2 gap-3 text-sm">
              <div className="flex items-centre">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">RACV • RAC • RACQ</span>
              </div>
              
              <div className="flex items-centre">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">NRMA • GIO</span>
              </div>
              
              <div className="flex items-centre">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">Suncorp • AAMI</span>
              </div>
              
              <div className="flex items-centre">
                <svg className="w-4 h-4 text-green-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">Allianz • QBE</span>
              </div>
            </div>
            
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700">
                <strong>Tip:</strong> Contact us immediately after storm damage occurs. Many insurance 
                policies require prompt mitigation to prevent further damage, and we can begin work 
                while coordinating with your insurer.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Immediate Action Steps */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          What to Do After Storm Damage
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-orange-50 border-2 border-red-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-centre justify-centre mb-4">
              <span className="text-lg font-bold text-red-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Ensure Safety First</h3>
            <ul className="text-neutral-700 text-sm space-y-1">
              <li>• Check for injuries</li>
              <li>• Avoid downed power lines</li>
              <li>• Exit unsafe structures</li>
              <li>• Call 000 if emergency</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-orange-50 to-yellow-50 border-2 border-orange-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-centre justify-centre mb-4">
              <span className="text-lg font-bold text-orange-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Call Us Immediately</h3>
            <ul className="text-neutral-700 text-sm space-y-1">
              <li>• Phone: Contact Us</li>
              <li>• 24/7 emergency response</li>
              <li>• Immediate dispatch</li>
              <li>• Professional assessment</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-green-50 border-2 border-yellow-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-centre justify-centre mb-4">
              <span className="text-lg font-bold text-yellow-600">3</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Document Everything</h3>
            <ul className="text-neutral-700 text-sm space-y-1">
              <li>• Take photos/videos</li>
              <li>• List damaged items</li>
              <li>• Keep receipts</li>
              <li>• Note date and time</li>
            </ul>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-centre justify-centre mb-4">
              <span className="text-lg font-bold text-green-600">4</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Contact Insurance</h3>
            <ul className="text-neutral-700 text-sm space-y-1">
              <li>• Report claim immediately</li>
              <li>• Provide documentation</li>
              <li>• We can coordinate</li>
              <li>• Direct billing available</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-orange-500 to-red-600 rounded-2xl p-8 text-centre text-white">
        <h2 className="text-3xl font-bold mb-4">
          Storm Damage? We're Ready to Respond
        </h2>
        <p className="text-xl text-orange-100 mb-8 max-w-3xl mx-auto">
          Don't let storm damage become worse. Our 24/7 emergency response teams are standing by 
          with specialised equipment and expertise to secure your property and begin restoration immediately.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-centre">
          <a
            href="/contact"
            className="inline-flex items-centre justify-centre px-8 py-4 bg-white text-orange-600 rounded-lg font-bold text-lg hover:bg-orange-50 transition-colours"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Emergency: Contact Us
          </a>
          <Link
            href="/storm-assessment"
            className="inline-flex items-centre justify-centre px-8 py-4 bg-orange-700 text-white rounded-lg font-bold text-lg hover:bg-orange-800 transition-colours"
          >
            Request Storm Assessment
          </Link>
        </div>
        
        <div className="mt-8 pt-8 border-t border-orange-400">
          <p className="text-orange-100 mb-2">
            <strong>Storm Season Tip:</strong> Save our number before severe weather arrives
          </p>
          <p className="text-orange-200 text-sm">
            We're monitoring weather patterns and ready to deploy immediately after storm events
          </p>
        </div>
      </section>
    </ServicePageLayout>
  );
}