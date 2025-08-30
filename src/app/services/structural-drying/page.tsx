import type { Metadata } from 'next';
import { ServicePageLayout } from '@/components/services/ServicePageLayout';
import { SEOImage } from '@/components/ui/seo-image';
import Link from 'next/link';

// SEO Metadata with comprehensive structural drying keywords
export const metadata: Metadata = {
  title: 'Structural Drying Services | Professional Water Extraction | Industrial Dehumidifiers',
  description: 'Professional structural drying services with industrial dehumidifiers, air movers, and moisture monitoring. Expert water extraction and building drying to prevent mould and structural damage.',
  keywords: [
    'structural drying',
    'professional water extraction',
    'industrial dehumidifiers',
    'building drying services',
    'moisture removal',
    'water damage drying',
    'structural moisture control',
    'professional drying equipment',
    'water extraction services',
    'humidity control',
    'moisture monitoring',
    'building dehumidification',
    'water damage mitigation',
    'structural water removal',
    'professional drying technicians'
  ],
  openGraph: {
    title: 'Professional Structural Drying Services | Industrial Water Extraction',
    description: 'Expert structural drying services with industrial equipment. Professional water extraction, dehumidification, and moisture monitoring to prevent mould and structural damage.',
    images: [
      {
        url: '/images/optimised/equipment/3D Dehumidifier.png',
        width: 1200,
        height: 630,
        alt: 'Professional structural drying equipment',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Structural Drying Services | Professional Water Extraction',
    description: 'Expert structural drying services. Industrial dehumidifiers, air movers, and professional moisture monitoring available 24/7.',
    images: ['/images/optimised/equipment/3D Dehumidifier.png'],
  },
  alternates: {
    canonical: '/services/structural-drying',
  },
  other: {
    'geo.region': 'AU',
    'geo.placename': 'Australia',
    'geo.position': '-25.2744;133.7751',
    'ICBM': '-25.2744, 133.7751',
  }
};

// Schema.org structured data for structural drying
const schemaData = {
  "@context": "https://schema.org",
  "@type": ["Service", "LocalBusiness"],
  "name": "Structural Drying Services",
  "description": "Professional structural drying services with industrial dehumidifiers, air movers, and expert moisture monitoring to prevent mould growth and structural damage.",
  "serviceType": "Structural Drying",
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
    "serviceUrl": "/services/structural-drying",
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
    "description": "Structural drying and water extraction services",
    "price": "Varies based on assessment",
    "priceCurrency": "AUD"
  },
  "additionalType": "https://www.wikidata.org/wiki/Q1073",
  "certification": [
    {
      "@type": "Certification",
      "name": "IICRC WRT - Water Damage Restoration Technician"
    },
    {
      "@type": "Certification", 
      "name": "IICRC ASD - Applied Structural Drying Technician"
    },
    {
      "@type": "Certification",
      "name": "Certified Drying Specialist"
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
    title: 'Emergency Response',
    href: '/services/emergency-response',
    image: '/images/optimised/process/3D Assessment.png'
  },
  {
    title: 'Fire Damage Restoration',
    href: '/services/fire-damage',
    image: '/images/optimised/damage/3D Fire Damage.png'
  }
];

const faqs = [
  {
    question: "How long does structural drying typically take?",
    answer: "Drying time varies based on materials, extent of water damage, and environmental conditions. Most residential properties dry within 3-5 days, while commercial or extensively damaged properties may take 1-2 weeks. We monitor progress daily and adjust equipment as needed."
  },
  {
    question: "What equipment do you use for structural drying?",
    answer: "We use industrial-grade dehumidifiers, high-velocity air movers, heat drying systems, and specialised extraction equipment. All equipment is calibrated and monitored with moisture meters and data loggers for optimal drying performance."
  },
  {
    question: "How do you prevent mould growth during drying?",
    answer: "We begin drying within 24-48 hours of water damage, maintain optimal temperature and humidity levels, use antimicrobial treatments when appropriate, and monitor moisture levels continuously to prevent conditions that support mould growth."
  },
  {
    question: "Can you dry materials in place without removing them?",
    answer: "Many materials can be dried in place using specialised techniques including controlled evaporation, heat drying, and injection drying for wall cavities. However, severely damaged or contaminated materials may require removal for effective drying or health reasons."
  },
  {
    question: "How do you monitor the drying process?",
    answer: "We use professional-grade moisture meters, thermal imaging cameras, and data loggers to monitor moisture levels in materials and air. Daily readings are recorded and tracked until all materials reach appropriate dryness levels."
  },
  {
    question: "What happens if materials don't dry properly?",
    answer: "If materials fail to dry within expected timeframes, we reassess the drying strategy, add additional equipment, modify environmental conditions, or recommend material removal if necessary. We guarantee proper drying or material replacement."
  },
  {
    question: "Is structural drying covered by insurance?",
    answer: "Yes, structural drying is typically covered by insurance as part of water damage restoration. It's considered essential mitigation to prevent further damage and mould growth. We work directly with insurers and provide detailed documentation."
  },
  {
    question: "Can I stay in my property during structural drying?",
    answer: "In most cases, yes. Our equipment is designed to operate safely around occupants. However, some areas may be temporarily restricted, and noise from equipment should be expected. We work with you to minimize inconvenience while ensuring effective drying."
  }
];

export default function StructuralDryingPage() {
  return (
    <ServicePageLayout
      title="Structural Drying Services"
      description="Professional structural drying services with industrial dehumidifiers, air movers, and expert moisture monitoring. Complete water extraction and building drying to prevent mould growth and structural damage with 24/7 service availability."
      heroImage="/images/optimised/equipment/3D Dehumidifier.png"
      heroImageAlt="Professional structural drying equipment including industrial dehumidifiers for effective water removal"
      certifications={['IICRC WRT', 'IICRC ASD', 'Certified Drying Specialist', 'Moisture Control Expert']}
      responseTime="1-2 Hours"
      availability="24/7/365"
      relatedServices={relatedServices}
      faqs={faqs}
      schemaData={schemaData}
    >
      {/* Service Overview */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Professional Structural Drying & Water Extraction
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8 mb-8">
          <div>
            <p className="text-lg text-neutral-700 mb-6">
              Effective structural drying is critical to prevent mould growth, structural damage, and ongoing moisture 
              problems after water damage. Our IICRC-certified drying specialists use industrial-grade equipment and 
              proven techniques to remove moisture from all building materials quickly and completely.
            </p>
            
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">Science-Based Drying</h3>
            <p className="text-neutral-700 mb-6">
              We use psychrometric principles, moisture measurement technology, and controlled environmental conditions 
              to achieve optimal drying results. Every project is monitored with professional equipment to ensure 
              complete moisture removal and prevent secondary damage.
            </p>
          </div>
          
          <div className="relative">
            <SEOImage
              src="/images/optimised/equipment/3D Industrial Fan.png"
              alt="Professional air mover equipment for structural drying and water damage restoration"
              width={500}
              height={400}
              className="rounded-lg shadow-lg"
            />
          </div>
        </div>
        
        {/* Time Critical Alert */}
        <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-xl p-6 text-white mb-8">
          <div className="flex items-centre">
            <svg className="w-8 h-8 mr-4 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
            </svg>
            <div>
              <h3 className="text-xl font-bold mb-2">Time is Critical for Effective Drying</h3>
              <p className="text-blue-100">
                Structural drying must begin within 24-48 hours to prevent mould growth and secondary damage. 
                Call <strong className="text-white">1-800-DISASTER</strong> immediately for professional water extraction and drying.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Drying Process */}
      <section className="mb-16 bg-gradient-to-br from-blue-50 to-cyan-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Professional Structural Drying Process
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-centre justify-centre mb-4">
              <span className="text-2xl font-bold text-blue-600">1</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Initial Assessment</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Comprehensive moisture mapping, material assessment, and environmental analysis to develop optimal drying strategy.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Moisture content measurements</li>
              <li>• Material porosity assessment</li>
              <li>• Environmental condition analysis</li>
              <li>• Drying strategy development</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-centre justify-centre mb-4">
              <span className="text-2xl font-bold text-blue-600">2</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Equipment Setup</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Strategic placement of industrial dehumidifiers, air movers, and specialised drying equipment based on scientific principles.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Industrial dehumidifier placement</li>
              <li>• Air mover positioning</li>
              <li>• Heat system setup</li>
              <li>• Monitoring equipment installation</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-centre justify-centre mb-4">
              <span className="text-2xl font-bold text-blue-600">3</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Controlled Drying</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Continuous monitoring and adjustment of equipment to maintain optimal drying conditions and progress.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Daily moisture monitoring</li>
              <li>• Equipment adjustment</li>
              <li>• Progress documentation</li>
              <li>• Environmental optimisation</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-centre justify-centre mb-4">
              <span className="text-2xl font-bold text-blue-600">4</span>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Completion Verification</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Final moisture readings and verification that all materials have reached appropriate dryness standards.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Final moisture verification</li>
              <li>• Drying standard confirmation</li>
              <li>• Equipment removal</li>
              <li>• Completion documentation</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Professional Equipment */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Industrial Structural Drying Equipment
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Industrial Dehumidifiers
              </h3>
              <p className="text-neutral-700 mb-4">
                High-capacity refrigerant and desiccant dehumidifiers designed for structural drying. These units 
                can remove hundreds of liters of moisture per day while maintaining optimal humidity levels.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-centre text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  200+ litres/day capacity
                </div>
                <div className="flex items-centre text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Energy efficient operation
                </div>
                <div className="flex items-centre text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Automatic humidity control
                </div>
                <div className="flex items-centre text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Continuous drainage systems
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                High-Velocity Air Movers
              </h3>
              <p className="text-neutral-700 mb-4">
                Professional air movers create controlled airflow patterns to maximize evaporation rates and 
                moisture movement from wet materials to the dehumidification system.
              </p>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-centre text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Variable speed control
                </div>
                <div className="flex items-centre text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Stackable design
                </div>
                <div className="flex items-centre text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Low amperage draw
                </div>
                <div className="flex items-centre text-primary-600">
                  <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Daisy-chain capability
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
              <h3 className="text-xl font-semibold text-neutral-900 mb-3">
                Specialised Extraction Equipment
              </h3>
              <p className="text-neutral-700 mb-4">
                Truck-mounted and portable extraction units for immediate water removal, plus specialty 
                equipment for hardwood floors, walls, and hard-to-reach areas.
              </p>
              <div className="flex items-centre text-sm text-primary-600 font-medium">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                Truck-mounted & Portable Systems
              </div>
            </div>
          </div>
          
          <div className="relative">
            <SEOImage
              src="/images/optimised/equipment/3D Moisture Meter Reading.png"
              alt="Professional moisture meter for monitoring structural drying progress and verification"
              width={500}
              height={600}
              className="rounded-lg shadow-lg"
            />
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-4">
              <h4 className="font-semibold text-neutral-900 mb-2">Precision Monitoring Equipment</h4>
              <p className="text-sm text-neutral-700">
                Professional moisture meters, thermal imaging cameras, and data loggers for accurate 
                monitoring and documentation of the drying process.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Drying Science */}
      <section className="mb-16 bg-gradient-to-br from-indigo-50 to-purple-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          The Science of Structural Drying
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8">
          <div>
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Psychrometric Principles
            </h3>
            <p className="text-neutral-700 mb-6">
              Effective structural drying is based on psychrometric science - the study of air-water mixtures 
              and their thermal properties. We use these principles to create optimal drying conditions.
            </p>
            
            <div className="space-y-4">
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Temperature Control</h4>
                <p className="text-neutral-700 text-sm">
                  Controlled heating increases the air's capacity to hold moisture, accelerating 
                  evaporation from wet materials while maintaining safe temperatures.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Humidity Management</h4>
                <p className="text-neutral-700 text-sm">
                  Maintaining optimal relative humidity levels (30-50%) creates the vapor pressure 
                  differential needed to drive moisture from materials into the air.
                </p>
              </div>
              
              <div className="bg-white rounded-lg p-4">
                <h4 className="font-semibold text-neutral-900 mb-2">Airflow Patterns</h4>
                <p className="text-neutral-700 text-sm">
                  Strategic air movement removes moisture-laden air from material surfaces and 
                  replaces it with drier air to maintain continuous evaporation.
                </p>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Material-Specific Drying Standards
            </h3>
            <p className="text-neutral-700 mb-4">
              Different building materials require specific moisture content levels to be considered 
              properly dried and prevent future problems.
            </p>
            
            <div className="space-y-3">
              <div className="flex justify-between items-centre p-3 bg-indigo-50 rounded-lg">
                <span className="font-medium text-neutral-900">Structural Lumber</span>
                <span className="text-sm text-indigo-600 font-medium">≤19% MC</span>
              </div>
              
              <div className="flex justify-between items-centre p-3 bg-indigo-50 rounded-lg">
                <span className="font-medium text-neutral-900">Plywood/OSB</span>
                <span className="text-sm text-indigo-600 font-medium">≤16% MC</span>
              </div>
              
              <div className="flex justify-between items-centre p-3 bg-indigo-50 rounded-lg">
                <span className="font-medium text-neutral-900">Hardwood Flooring</span>
                <span className="text-sm text-indigo-600 font-medium">6-9% MC</span>
              </div>
              
              <div className="flex justify-between items-centre p-3 bg-indigo-50 rounded-lg">
                <span className="font-medium text-neutral-900">Gypsum Drywall</span>
                <span className="text-sm text-indigo-600 font-medium">≤1% MC</span>
              </div>
              
              <div className="flex justify-between items-centre p-3 bg-indigo-50 rounded-lg">
                <span className="font-medium text-neutral-900">Concrete/Masonry</span>
                <span className="text-sm text-indigo-600 font-medium">≤4% MC</span>
              </div>
            </div>
            
            <div className="mt-4 p-3 bg-purple-50 border border-purple-200 rounded-lg">
              <p className="text-sm text-purple-700">
                <strong>MC = Moisture Content</strong> measured using professional-grade 
                penetrating and non-penetrating moisture meters calibrated for each material type.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Monitoring Technology */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Advanced Monitoring & Documentation
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm text-centre">
            <div className="w-16 h-16 bg-blue-100 rounded-full flex items-centre justify-centre mx-auto mb-4">
              <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Digital Data Logging</h3>
            <p className="text-neutral-700 text-sm">
              Continuous monitoring with digital data loggers that record temperature, humidity, 
              and moisture readings every 15 minutes throughout the drying process.
            </p>
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm text-centre">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-centre justify-centre mx-auto mb-4">
              <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Daily Progress Reports</h3>
            <p className="text-neutral-700 text-sm">
              Detailed daily reports showing moisture levels, equipment performance, 
              and drying progress with photos and technical measurements.
            </p>
          </div>
          
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm text-centre">
            <div className="w-16 h-16 bg-purple-100 rounded-full flex items-centre justify-centre mx-auto mb-4">
              <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Completion Certificates</h3>
            <p className="text-neutral-700 text-sm">
              Professional completion certificates documenting final moisture readings, 
              drying standards achieved, and verification of structural drying completion.
            </p>
          </div>
        </div>
      </section>

      {/* Material-Specific Techniques */}
      <section className="mb-16 bg-gradient-to-br from-cyan-50 to-blue-50 p-8 rounded-2xl">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Specialised Drying Techniques
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Wall Cavity Drying</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Specialised injection drying systems for wall cavities using controlled airflow and 
              dehumidification without removing drywall in many cases.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Injection drying systems</li>
              <li>• Cavity moisture monitoring</li>
              <li>• Minimal demolition methods</li>
              <li>• Insulation preservation</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-green-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Hardwood Floor Drying</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Specialised techniques for drying hardwood floors including mat systems, 
              controlled heat, and precision moisture monitoring to prevent cupping and warping.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Floor mat drying systems</li>
              <li>• Controlled heat application</li>
              <li>• Subfloor moisture extraction</li>
              <li>• Wood movement monitoring</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16l3.5-2 3.5 2 3.5-2 3.5 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Concrete & Masonry</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Specialised drying for concrete slabs, block walls, and masonry using high-capacity 
              dehumidification and extended drying cycles.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• High-capacity dehumidification</li>
              <li>• Extended drying cycles</li>
              <li>• Vapor barrier techniques</li>
              <li>• Deep moisture extraction</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-red-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Heat Drying Systems</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Controlled heat application to accelerate drying in challenging materials 
              and conditions while maintaining safe temperatures and preventing damage.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Controlled temperature application</li>
              <li>• Accelerated drying rates</li>
              <li>• Material safety monitoring</li>
              <li>• Energy efficient heating</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">Contents Drying</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Specialised drying chambers and techniques for documents, books, electronics, 
              and other water-damaged contents using controlled environments.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Document drying chambers</li>
              <li>• Electronics drying protocols</li>
              <li>• Freeze-drying options</li>
              <li>• Contents inventory tracking</li>
            </ul>
          </div>
          
          <div className="bg-white rounded-xl p-6 shadow-lg">
            <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-centre justify-centre mb-4">
              <svg className="w-6 h-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
              </svg>
            </div>
            <h3 className="text-lg font-semibold text-neutral-900 mb-3">HVAC System Drying</h3>
            <p className="text-neutral-700 text-sm mb-4">
              Specialised cleaning and drying of HVAC systems including ductwork, 
              components, and air handling units to prevent mould growth and contamination.
            </p>
            <ul className="text-xs text-neutral-600 space-y-1">
              <li>• Ductwork moisture removal</li>
              <li>• Component cleaning & drying</li>
              <li>• Filter replacement</li>
              <li>• System sanitization</li>
            </ul>
          </div>
        </div>
      </section>

      {/* Quality Assurance */}
      <section className="mb-16">
        <h2 className="text-3xl font-bold text-neutral-900 mb-8">
          Quality Assurance & Standards
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          <div className="bg-white border border-neutral-200 rounded-xl p-6 shadow-sm">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Industry Standards Compliance
            </h3>
            <p className="text-neutral-700 mb-4">
              All structural drying work complies with IICRC S500 standards for water damage restoration 
              and industry best practices for moisture control and building preservation.
            </p>
            
            <div className="space-y-3">
              <div className="flex items-centre">
                <svg className="w-5 h-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">IICRC S500 Standard compliance</span>
              </div>
              
              <div className="flex items-centre">
                <svg className="w-5 h-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">ANSI/IICRC S500 drying standards</span>
              </div>
              
              <div className="flex items-centre">
                <svg className="w-5 h-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">Professional equipment calibration</span>
              </div>
              
              <div className="flex items-centre">
                <svg className="w-5 h-5 text-success-500 mr-3" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-neutral-700">Certified technician training</span>
              </div>
            </div>
          </div>
          
          <div className="bg-gradient-to-br from-green-50 to-emerald-50 p-6 rounded-xl border border-green-200">
            <h3 className="text-xl font-semibold text-neutral-900 mb-4">
              Drying Guarantee
            </h3>
            <p className="text-neutral-700 mb-4">
              We guarantee proper structural drying according to industry standards or we will 
              continue the process at no additional cost until standards are achieved.
            </p>
            
            <div className="bg-white rounded-lg p-4">
              <h4 className="font-semibold text-green-700 mb-2">Our Guarantee Includes:</h4>
              <ul className="text-sm text-green-600 space-y-1">
                <li>• Materials dried to industry standards</li>
                <li>• Mould prevention through proper drying</li>
                <li>• Complete moisture documentation</li>
                <li>• Final verification testing</li>
                <li>• Professional completion certificate</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl p-8 text-centre text-white">
        <h2 className="text-3xl font-bold mb-4">
          Need Professional Structural Drying?
        </h2>
        <p className="text-xl text-blue-100 mb-8 max-w-3xl mx-auto">
          Time is critical for effective structural drying. Our IICRC-certified specialists use industrial 
          equipment and proven techniques to remove moisture completely and prevent mould growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-centre">
          <a
            href="tel:1800-DISASTER"
            className="inline-flex items-centre justify-centre px-8 py-4 bg-white text-blue-600 rounded-lg font-bold text-lg hover:bg-blue-50 transition-colours"
          >
            <svg className="w-6 h-6 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
            </svg>
            Call: 1-800-DISASTER
          </a>
          <Link
            href="/drying-assessment"
            className="inline-flex items-centre justify-centre px-8 py-4 bg-blue-700 text-white rounded-lg font-bold text-lg hover:bg-blue-800 transition-colours"
          >
            Schedule Moisture Assessment
          </Link>
        </div>
        
        <div className="mt-8 pt-8 border-t border-blue-400">
          <p className="text-blue-100 mb-2">
            <strong>Time Critical:</strong> Begin drying within 24-48 hours to prevent mould growth
          </p>
          <p className="text-blue-200 text-sm">
            Professional structural drying with industry-leading equipment and certified technicians
          </p>
        </div>
      </section>
    </ServicePageLayout>
  );
}