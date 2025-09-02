import type { Metadata } from 'next';
import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import Image from 'next/image';
import Link from 'next/link';

// SEO Metadata with comprehensive biohazard cleanup keywords
export const metadata: Metadata = {
  title: 'Biohazard Cleanup Services | IICRC S540 Certified | Crime Scene & Trauma Cleanup',
  description: 'Professional biohazard cleanup services following IICRC S540 standards. Crime scene cleanup, trauma cleaning, blood cleanup, sewage cleanup. Licensed specialists available 24/7.',
  keywords: [
    'biohazard cleanup',
    'crime scene cleanup',
    'trauma cleanup',
    'blood cleanup',
    'sewage cleanup',
    'IICRC S540 certified',
    'biohazard remediation',
    'infectious disease cleanup',
    'bodily fluid cleanup',
    'unattended death cleanup',
    'suicide cleanup',
    'homicide cleanup',
    'biohazard removal',
    'HAZMAT cleanup',
    'biohazard restoration'
  ],
  openGraph: {
    title: 'Professional Biohazard Cleanup Services | IICRC S540 Certified',
    description: 'Expert biohazard cleanup services following IICRC S540 standards. Professional crime scene, trauma, and biohazard remediation with 24/7 response.',
    images: [
      {
        url: '/images/optimised/process/3D Hazardous Cleaning.png',
        width: 1200,
        height: 630,
        alt: 'Professional biohazard cleanup service' },
    ] },
  twitter: {
    card: 'summary_large_image',
    title: 'Biohazard Cleanup Services | IICRC S540 Certified',
    description: 'Expert biohazard cleanup services. IICRC S540 certified technicians. Professional trauma and crime scene cleanup available 24/7.',
    images: ['/images/optimised/process/3D Hazardous Cleaning.png'] },
  alternates: {
    canonical: '/services/biohazard-cleanup' },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751' }
};

// Schema.org structured data for biohazard cleanup
const schemaData = {
  "@context": "https://schema.org",
  "@type": ["Service", "LocalBusiness"],
  "name": "Biohazard Cleanup Services",
  "description": "Professional biohazard cleanup services following IICRC S540 standards including crime scene cleanup, trauma cleaning, and biohazard remediation.",
  "serviceType": "Biohazard Cleanup",
  "provider": {
    "@type": "Organisation",
    "name": "Disaster Recovery",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU"
    },
    "telephone": "online support",
    "email": "emergency@disasterrecoveryaustralia.com.au"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Australia"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "/services/biohazard-cleanup",
    "serviceSmsNumber": "online support",
    "servicePhone": "online support"
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
    "description": "Biohazard cleanup and remediation services",
    "price": "Varies based on assessment",
    "priceCurrency": "AUD"
  },
  "additionalType": "https://www.wikidata.org/wiki/Q4913",
  "certification": [
    {
      "@type": "Certification",
      "name": "IICRC S540 - Biohazard Remediation Standard"
    },
    {
      "@type": "Certification", 
      "name": "HAZMAT Licensed"
    },
    {
      "@type": "Certification",
      "name": "Infectious Disease Cleanup Certified"
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
    title: 'Mould Remediation',
    href: '/services/mould-remediation',
    image: '/images/optimised/damage/3D Mould Damage.png'
  },
  {
    title: 'Fire Damage Restoration',
    href: '/services/fire-damage',
    image: '/images/optimised/damage/3D Fire Damage.png'
  },
  {
    title: 'Water Damage Restoration',
    href: '/services/water-damage-restoration',
    image: '/images/optimised/damage/3D Water Damage.png'
  }
];

const faqs = [
  {
    question: "What types of biohazard situations do you handle?",
    answer: "We handle all types of biohazard cleanup including crime scenes, unattended deaths, suicides, accidents, infectious disease cleanup, sewage backups, hoarding situations, and any scenario involving blood, bodily fluids, or potentially infectious materials."
  },
  {
    question: "Are your technicians trained and certified for biohazard cleanup?",
    answer: "Yes, all our technicians are IICRC S540 certified and receive specialised training in biohazard remediation, OSHA bloodborne pathogen standards, proper use of PPE, and safe disposal of biohazardous materials."
  },
  {
    question: "How do you ensure complete decontamination and safety?",
    answer: "We follow strict IICRC S540 protocols including ATP testing to verify complete decontamination, proper containment procedures, EPA-approved disinfectants, and certified disposal of all biohazardous materials through licensed medical waste facilities."
  },
  {
    question: "Will insurance cover biohazard cleanup costs?",
    answer: "Coverage varies by policy and situation. Homeowner's insurance often covers cleanup from accidents or crimes, while business insurance may cover workplace incidents. We work directly with insurers and provide detailed documentation to support claims."
  },
  {
    question: "How quickly can you respond to a biohazard emergency?",
    answer: "We provide 24/7 emergency response with teams typically arriving within 1-2 hours in metropolitan areas. Biohazard situations require immediate attention to prevent health risks and additional contamination."
  },
  {
    question: "Do you work with law enforcement and coroners?",
    answer: "Yes, we regularly work with police, coroners, and other authorities. We wait for official clearance before beginning cleanup and can coordinate with ongoing investigations while maintaining scene integrity."
  },
  {
    question: "What safety measures do you take during biohazard cleanup?",
    answer: "We use full Level B or C hazmat suits, respiratory protection, complete containment of work areas, HEPA filtration, and follow strict decontamination procedures. All work meets OSHA and health department standards."
  },
  {
    question: "How do you handle the emotional aspects of trauma cleanup?",
    answer: "Our technicians are trained to work with compassion and discretion during difficult times. We can recommend grief counseling resources and work quietly and respectfully to minimize additional trauma for families."
  }
];

export default function BiohazardCleanupPage() {
  return (
    <ServicePageLayout
      title="Biohazard Cleanup Services"
      description="Professional biohazard cleanup services following IICRC S540 standards. Expert crime scene cleanup, trauma cleaning, blood cleanup, and biohazard remediation with licensed specialists available 24/7."
      heroImage="/images/optimised/process/3D Hazardous Cleaning.png"
      heroImageAlt="Professional biohazard cleanup service showing technicians in full protective equipment safely cleaning contaminated areas"
      certifications={['IICRC S540', 'HAZMAT Licensed', 'OSHA Certified', 'Infectious Disease Certified']}
      responseTime="1-2 Hours"
      availability="24/7/365"
      relatedServices={relatedServices}
      faqs={faqs}
      schemaData={schemaData}
    >
      {/* Service Overview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Professional Biohazard & Trauma Cleanup
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-lg text-neutral-700 mb-6">
              Biohazard situations require specialised training, equipment, and protocols to ensure safe cleanup and 
              complete decontamination. Our IICRC S540 certified technicians provide compassionate, professional 
              biohazard cleanup services while maintaining the highest safety and health standards.
            </p>
            
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Compassionate Professional Service</h3>
            <p className="text-neutral-700 mb-6">
              We understand that biohazard situations often occur during the most difficult times. Our team 
              approaches every situation with compassion, discretion, and professionalism while ensuring complete 
              safety and regulatory compliance.
            </p>
          </div>
          
          <div className="relative">
            <Image
              src="/images/optimised/process/3D Emergency Squalor Cleanup.png"
              alt="Professional biohazard cleanup team with specialised protective equipment"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        {/* Emergency Notice */}
        <div className="bg-gradient-to-r from-emergency-500 to-red-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-center">
            <svg className="w-8 h-8 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-xl font-bold mb-2">Do Not Attempt DIY Biohazard Cleanup</h3>
              <p className="text-emergency-100">
                Biohazardous materials pose serious health risks including infectious diseases, bloodborne pathogens, 
                and toxic exposure. Professional cleanup is essential for your safety and legal compliance.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IICRC S540 Process */}
      <section className="mb-16 bg-gradient-to-br from-red-50 to-orange-50 p-8 rounded-2xl border-2 border-red-200">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          IICRC S540 Biohazard Remediation Process
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-red-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Assessment & Safety</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Comprehensive hazard assessment, proper PPE setup, and containment establishment before any work begins.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Scene safety evaluation</li>
              <li>• Hazard identification</li>
              <li>• PPE selection & donning</li>
              <li>• Containment setup</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-red-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Removal & Collection</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Systematic removal of contaminated materials and collection of biohazardous substances using proper techniques.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Contaminated material removal</li>
              <li>• Proper handling techniques</li>
              <li>• Double-bagging procedures</li>
              <li>• Regulated waste sorting</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-red-600">3</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Disinfection & Decon</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Thorough disinfection using EPA-approved agents and complete decontamination of all affected surfaces.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• EPA-approved disinfectants</li>
              <li>• Multiple cleaning cycles</li>
              <li>• Surface decontamination</li>
              <li>• Air purification</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl font-bold text-red-600">4</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Verification & Disposal</h3>
            <p className="text-neutral-700 text-sm mb-4">
              ATP testing for verification, proper disposal of biohazardous waste, and final clearance certification.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• ATP verification testing</li>
              <li>• Medical waste disposal</li>
              <li>• Clearance documentation</li>
              <li>• Final safety inspection</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Types of Biohazard Cleanup */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Specialised Biohazard Cleanup Services
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-gradient-to-br from-red-50 to-pink-50 border border-red-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Crime Scene Cleanup</h3>
            <p className="text-neutral-700 text-sm">
              Professional cleanup of homicide, assault, and other crime scenes following law enforcement 
              clearance and maintaining evidence integrity.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-blue-50 to-indigo-50 border border-blue-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Trauma & Accident Cleanup</h3>
            <p className="text-neutral-700 text-sm">
              Compassionate cleanup of traumatic accidents, including vehicle accidents, workplace incidents, 
              and medical emergencies involving blood and bodily fluids.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-purple-50 to-violet-50 border border-purple-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Unattended Death Cleanup</h3>
            <p className="text-neutral-700 text-sm">
              Respectful and thorough cleanup of unattended death scenes, addressing decomposition, 
              odours, and complete biohazard remediation.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-yellow-50 to-orange-50 border border-yellow-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Infectious Disease Cleanup</h3>
            <p className="text-neutral-700 text-sm">
              Specialised cleanup for infectious disease outbreaks, including COVID-19, MRSA, 
              Hepatitis, and other communicable disease contamination.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 border border-green-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Sewage & Contaminated Water</h3>
            <p className="text-neutral-700 text-sm">
              Category 3 water cleanup including sewage backups, contaminated flooding, and 
              greywater incidents with proper decontamination protocols.
            </p>
          </div>
          
          <div className="bg-gradient-to-br from-gray-50 to-neutral-100 border border-gray-200 rounded-xl p-6">
            <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center mb-4">
              <svg className="w-6 h-6 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-2">Hoarding & Squalor Cleanup</h3>
            <p className="text-neutral-700 text-sm">
              Comprehensive cleanup of hoarding situations and squalid conditions involving 
              biohazardous materials, waste accumulation, and pest infestations.
            </p>
          </div>
        </div>
      </section>

      {/* Safety & Equipment */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Safety Equipment & Protocols
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Personal Protective Equipment (PPE)
              </h3>
              <p className="text-neutral-700 mb-4">
                All technicians use Level B or C hazmat suits, respiratory protection, and multi-layer 
                glove systems to prevent exposure to bloodborne pathogens and biohazardous materials.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-red-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Full hazmat suits
                </div>
                <div className="flex items-center text-red-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Respiratory protection
                </div>
                <div className="flex items-center text-red-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Eye and face protection
                </div>
                <div className="flex items-center text-red-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Chemical-resistant boots
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Specialised Cleaning Equipment
              </h3>
              <p className="text-neutral-700 mb-4">
                Professional biohazard cleanup requires specialised equipment including HEPA filtration, 
                containment systems, and ATP testing devices for verification.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center text-red-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  HEPA air scrubbers
                </div>
                <div className="flex items-center text-red-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Ozone generators
                </div>
                <div className="flex items-center text-red-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  ATP testing devices
                </div>
                <div className="flex items-center text-red-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Containment barriers
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-xl border border-red-200">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Regulatory Compliance & Certifications
            </h3>
            <p className="text-neutral-700 mb-6">
              All biohazard cleanup work meets or exceeds regulatory requirements from OSHA, EPA, 
              DOT, and state health departments.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">OSHA Compliance</h4>
                <p className="text-neutral-700 text-sm">
                  Bloodborne pathogen standards, hazard communication, and workplace safety requirements
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">EPA Regulations</h4>
                <p className="text-neutral-700 text-sm">
                  Approved disinfectants, proper waste classification, and environmental protection protocols
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">DOT Requirements</h4>
                <p className="text-neutral-700 text-sm">
                  Hazardous material transportation, packaging standards, and proper shipping documentation
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Waste Disposal */}
      <section className="mb-16 bg-gradient-to-br from-orange-50 to-yellow-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Medical Waste Disposal & Documentation
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Regulated Medical Waste Handling
            </h3>
            <p className="text-neutral-700 mb-6">
              All biohazardous materials are properly classified, packaged, and disposed of through 
              licensed medical waste treatment facilities in accordance with state and federal regulations.
            </p>
            
            <div className="space-y-4">
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Proper Packaging</h4>
                  <p className="text-neutral-700 text-sm">Red biohazard bags, rigid sharps containers, and DOT-approved packaging</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Licensed Facilities</h4>
                  <p className="text-neutral-700 text-sm">Treatment and disposal only through state-licensed medical waste facilities</p>
                </div>
              </div>
              
              <div className="flex items-start">
                <svg className="w-6 h-6 text-blue-600 mr-3 mt-1 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <div>
                  <h4 className="font-semibold text-neutral-900">Chain of Custody</h4>
                  <p className="text-neutral-700 text-sm">Complete documentation from collection through final disposal</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Documentation & Certificates
            </h3>
            <p className="text-neutral-700 mb-4">
              Comprehensive documentation package provided for insurance, legal, and regulatory purposes.
            </p>
            
            <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
              <h4 className="font-semibold text-orange-700 mb-2">Documentation Includes:</h4>
              <ul className="text-sm text-blue-700 space-y-1">
                <li>• Detailed work scope and procedures</li>
                <li>• Before and after photographs</li>
                <li>• ATP test results and verification</li>
                <li>• Medical waste manifests</li>
                <li>• Certificate of decontamination</li>
                <li>• Insurance claim support documents</li>
                <li>• Regulatory compliance certificates</li>
              </ul>
            </div>
            
            <div className="mt-4 p-4 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-sm text-green-700 font-medium">
                All documentation is maintained in secure records for the required retention period 
                and can be provided for future reference or legal requirements.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Compassionate Service */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Compassionate & Confidential Service
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Compassionate Approach</h3>
            <p className="text-neutral-700 text-sm">
              Our technicians are trained to work with sensitivity during difficult times, 
              providing professional service with empathy and respect.
            </p>
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Complete Confidentiality</h3>
            <p className="text-neutral-700 text-sm">
              Strict confidentiality protocols protect privacy. Unmarked vehicles and discrete 
              service to minimize attention and protect dignity.
            </p>
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm text-center">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Support Resources</h3>
            <p className="text-neutral-700 text-sm">
              We can recommend grief counseling, victim services, and other support resources 
              to help families through difficult times.
            </p>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-8 text-center text-white">
        <h2 className="text-3xl font-bold mb-4">
          Need Professional Biohazard Cleanup?
        </h2>
        <p className="text-xl text-red-100 mb-8 max-w-3xl mx-auto">
          Don't risk your health or safety. Our IICRC S540 certified specialists provide safe, 
          professional biohazard cleanup with complete confidentiality and compassionate service.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <a
            href="/contact"
            className="inline-flex items-center justify-center px-8 py-4 bg-white text-red-600 rounded-lg font-bold text-lg hover:bg-red-50 transition-colours"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call: Contact Us
          </a>
          <Link
            href="/biohazard-assessment"
            className="inline-flex items-center justify-center px-8 py-4 bg-red-700 text-white rounded-lg font-bold text-lg hover:bg-red-800 transition-colours"
          >
            Request Confidential Consultation
          </Link>
        </div>
        
        <div className="mt-8 pt-8 border-t border-red-400">
          <p className="text-red-100 text-sm">
            All biohazard cleanup consultations are completely confidential and provided with compassionate, professional service
          </p>
        </div>
      </section>
    </ServicePageLayout>
  );
}