// Water Damage Restoration Service Page - IICRC S500 Compliant
import { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { ServicePageLayout } from '@/components/services/ServicePageLayout';

export const metadata: Metadata = {
  title: 'Water Damage Restoration Services | 24/7 Online Emergency Response | IICRC S500 Certified',
  description: 'Professional water damage restoration following ANSI/IICRC S500-2021 standards. Immediate extraction, structural drying, and mould prevention. Available 24/7 with 1-hour response time.',
  keywords: 'water damage restoration, flood cleanup, water extraction, structural drying, IICRC S500, emergency water removal, burst pipe repair, sewage cleanup, basement flooding, water mitigation',
  openGraph: {
    title: 'Emergency Water Damage Restoration - IICRC Certified Professionals',
    description: 'Immediate response for water damage emergencies. IICRC S500 certified technicians, advanced drying equipment, insurance approved. Call Contact Us.',
    images: ['/images/optimised/damage/3D Water Damage.png'],
    type: 'website' },
  alternates: {
    canonical: 'https://disasterrecovery.com.au/services/water-damage' }
};

const schemaData = {
  "@context": "https://schema.org",
  "@type": "Service",
  "serviceType": "Water Damage Restoration",
  "provider": {
    "@type": "Organisation",
    "name": "Disaster Recovery",
    "telephone": "",
    "url": "https://disasterrecovery.com.au"
  },
  "areaServed": {
    "@type": "Country",
    "name": "Australia"
  },
  "description": "Professional water damage restoration services following IICRC S500 standards",
  "offers": {
    "@type": "Offer",
    "availability": "https://schema.org/InStock",
    "priceRange": "$$$"
  },
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Water Damage Services",
    "itemListElement": [
      {
        "@type": "Service",
        "name": "Emergency Water Extraction"
      },
      {
        "@type": "Service",
        "name": "Structural Drying"
      },
      {
        "@type": "Service",
        "name": "Sewage Cleanup"
      },
      {
        "@type": "Service",
        "name": "Document Drying"
      }
    ]
  }
};

export default function WaterDamageRestorationPage() {
  const certifications = [
    'ANSI/IICRC S500-2021',
    'AS-IICRC S500:2025',
    'WRT Certified',
    'ASD Certified',
    'AMRT Certified'
  ];

  const relatedServices = [
    {
      title: 'Mould Remediation',
      href: '/services/mould-remediation',
      image: '/images/optimised/damage/3D Mould Damage.png'
    },
    {
      title: 'Structural Drying',
      href: '/services/structural-drying',
      image: '/images/optimised/process/3D Drying Process.png'
    },
    {
      title: 'Emergency Response',
      href: '/services/emergency-response',
      image: '/images/optimised/process/3D Assessment.png'
    }
  ];

  const faqs = [
    {
      question: "How quickly should water damage be addressed?",
      answer: "According to IICRC S500 standards, water damage must be addressed within 24-48 hours to prevent mould growth and secondary damage. Our team responds within 1 hour for emergencies, beginning extraction and mitigation immediately upon arrival."
    },
    {
      question: "What are the three categories of water damage?",
      answer: "Category 1 (Clean Water): From broken water lines or rain. Category 2 (Grey Water): Contains contaminants from appliances or aquariums. Category 3 (Black Water): Highly contaminated water from sewage, flooding, or standing water. Each requires specific safety protocols and equipment per IICRC S500."
    },
    {
      question: "Will insurance cover water damage restoration?",
      answer: "Most homeowner's insurance policies cover sudden and accidental water damage. We work directly with all major insurance companies, providing detailed documentation per IICRC standards to support your claim. Our team handles the entire claims process for you."
    },
    {
      question: "What equipment is used for water damage restoration?",
      answer: "We use IICRC S500-compliant equipment including truck-mounted extraction units, industrial dehumidifiers (refrigerant and desiccant), high-velocity air movers, HEPA air scrubbers, thermal imaging cameras, and moisture meters for complete structural drying."
    },
    {
      question: "How long does water damage restoration take?",
      answer: "Timeline depends on the extent of damage. Initial water extraction takes 1-2 days, structural drying requires 3-5 days with continuous monitoring, and full restoration including repairs can take 1-3 weeks. We provide daily moisture readings and progress reports."
    }
  ];

  return (
    <ServicePageLayout
      title="Water Damage Restoration"
      description="IICRC S500-certified water damage restoration with immediate 24/7 response. Professional extraction, structural drying, and complete restoration services."
      heroImage="/images/optimised/damage/3D Water Damage.png"
      heroImageAlt="Professional water damage restoration services"
      certifications={certifications}
      responseTime="< 1 Hour"
      availability="24/7/365"
      relatedServices={relatedServices}
      faqs={faqs}
      schemaData={schemaData}
    >
      {/* Service Overview Section */}
      <section className="mb-16 r6-fade-in">
        <h2 className="r6-heading-xl r6-gradient-text mb-6">
          Professional Water Damage Restoration Following IICRC S500 Standards
        </h2>
        <div className="prose prose-lg max-w-none">
          <p className="r6-text-lead text-gray-300">
            When water damage strikes your property, every minute counts. Our IICRC S500-certified restoration professionals respond immediately to minimize damage, prevent mould growth, and restore your property to pre-loss condition. With advanced equipment and proven methodologies, we handle everything from minor leaks to major flooding disasters.
          </p>
          
          <div className="r6-glass-card r6-glow-blue p-8 my-8 border-l-4 border-electric-blue">
            <h3 className="text-xl font-bold text-white mb-3 flex items-center gap-3">
              <span className="r6-pulse-dot"></span>
              Why Immediate Response Matters
            </h3>
            <p className="text-gray-300">
              According to ANSI/IICRC S500-2021 standards, water damage can lead to mould growth within 24-48 hours. Our rapid response team arrives within 1 hour to begin extraction and mitigation, preventing secondary damage and reducing restoration costs by up to 40%.
            </p>
          </div>
        </div>
      </section>

      {/* Water Damage Categories */}
      <section className="mb-16 r6-fade-in-delay-1">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Understanding Water Damage Categories
        </h2>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="r6-card-premium r6-hover-lift r6-glow-subtle overflow-hidden">
            <div className="h-48 relative r6-image-container">
              <Image
                src="/images/optimised/damage/3D Water Damage.png"
                alt="Category 1 Clean Water Damage"
                fill
                className="object-cover r6-scale-hover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="r6-badge-glow bg-electric-blue">
                  Category 1
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3">Clean Water</h3>
              <p className="text-gray-400 mb-4">
                Water from sanitary sources like broken water lines, tub overflows, or rainwater. Requires immediate extraction and drying to prevent escalation.
              </p>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-start r6-list-item">
                  <svg className="w-5 h-5 text-electric-blue mr-2 mt-0.5 r6-icon-glow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Broken water supply lines
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Sink or tub overflow
                </li>
                <li className="flex items-start">
                  <svg className="w-5 h-5 text-blue-500 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Appliance malfunction
                </li>
              </ul>
            </div>
          </div>

          <div className="r6-card-premium r6-hover-lift r6-glow-subtle overflow-hidden">
            <div className="h-48 relative r6-image-container">
              <Image
                src="/images/optimised/damage/3D Flood Damage.png"
                alt="Category 2 Grey Water Damage"
                fill
                className="object-cover r6-scale-hover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="r6-badge-warning">
                  Category 2
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3">Grey Water</h3>
              <p className="text-gray-400 mb-4">
                Contains significant contamination that could cause illness. Requires PPE, antimicrobial treatment, and disposal of affected porous materials.
              </p>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start r6-list-item">
                  <svg className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Washing machine overflow
                </li>
                <li className="flex items-start r6-list-item">
                  <svg className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Dishwasher discharge
                </li>
                <li className="flex items-start r6-list-item">
                  <svg className="w-5 h-5 text-yellow-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Aquarium water
                </li>
              </ul>
            </div>
          </div>

          <div className="r6-card-premium r6-hover-lift r6-glow-subtle overflow-hidden">
            <div className="h-48 relative r6-image-container">
              <Image
                src="/images/optimised/process/3D Emergency Squalor Cleanup.png"
                alt="Category 3 Black Water Damage"
                fill
                className="object-cover r6-scale-hover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
              <div className="absolute bottom-4 left-4">
                <span className="r6-badge-danger r6-pulse">
                  Category 3
                </span>
              </div>
            </div>
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-3">Black Water</h3>
              <p className="text-gray-400 mb-4">
                Grossly contaminated water containing pathogens and toxins. Requires full PPE, containment, and specialised biohazard protocols per IICRC S500.
              </p>
              <ul className="space-y-2 text-sm text-neutral-600">
                <li className="flex items-start r6-list-item">
                  <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Sewage backup
                </li>
                <li className="flex items-start r6-list-item">
                  <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  River/stream flooding
                </li>
                <li className="flex items-start r6-list-item">
                  <svg className="w-5 h-5 text-red-400 mr-2 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Standing water &gt;48 hours
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="mb-16 r6-fade-in-delay-2">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Our IICRC S500-Compliant Restoration Process
        </h2>
        
        <div className="space-y-8">
          {/* Step 1 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 r6-glass-card r6-glow-blue rounded-full flex items-center justify-center border-2 border-electric-blue">
                <span className="text-2xl font-bold text-electric-blue r6-text-glow">1</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3">
                Emergency Contact & Rapid Response
              </h3>
              <div className="r6-glass-card p-6 r6-hover-glow">
                <p className="text-gray-300 mb-4">
                  Our 24/7 emergency hotline connects you with certified water damage specialists immediately. We dispatch teams within minutes, arriving on-site in under 1 hour for city locations.
                </p>
                <div className="grid md:grid-cols-2 gap-4">
                  <div className="flex items-start">
                    <Image
                      src="/images/optimised/process/3D Assessment.png"
                      alt="Emergency assessment"
                      width={100}
                      height={100}
                      className="rounded-lg mr-4"
                    />
                    <div>
                      <h4 className="font-semibold text-white mb-1">Immediate Assessment</h4>
                      <p className="text-sm text-gray-400">
                        Phone triage determines severity and dispatches appropriate resources
                      </p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <svg className="w-12 h-12 text-electric-blue mr-4 r6-icon-glow" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                    <div>
                      <h4 className="font-semibold text-white mb-1">Response Time</h4>
                      <p className="text-sm text-gray-400">
                        Average arrival: 47 minutes in metropolitan areas
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 2 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 r6-glass-card r6-glow-blue rounded-full flex items-center justify-center border-2 border-electric-blue">
                <span className="text-2xl font-bold text-electric-blue r6-text-glow">2</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3">
                Inspection & Water Damage Assessment
              </h3>
              <div className="r6-glass-card p-6 r6-hover-glow">
                <p className="text-gray-300 mb-4">
                  Using advanced moisture detection technology, we map affected areas, determine water category, and develop a comprehensive restoration plan following IICRC S500 protocols.
                </p>
                <div className="grid md:grid-cols-3 gap-4 mt-6">
                  <div className="text-center">
                    <Image
                      src="/images/optimised/equipment/3D Thermal Camera.png"
                      alt="Thermal imaging"
                      width={80}
                      height={80}
                      className="mx-auto mb-2 rounded"
                    />
                    <h4 className="font-semibold text-sm text-white">Thermal Imaging</h4>
                    <p className="text-xs text-gray-400 mt-1">
                      Identifies hidden moisture
                    </p>
                  </div>
                  <div className="text-center">
                    <Image
                      src="/images/optimised/equipment/3D Moisture Meter.png"
                      alt="Moisture meters"
                      width={80}
                      height={80}
                      className="mx-auto mb-2 rounded"
                    />
                    <h4 className="font-semibold text-sm">Moisture Mapping</h4>
                    <p className="text-xs text-neutral-600 mt-1">
                      Documents affected areas
                    </p>
                  </div>
                  <div className="text-center">
                    <Image
                      src="/images/optimised/equipment/3D Moisture Meter Reading.png"
                      alt="Hygrometers"
                      width={80}
                      height={80}
                      className="mx-auto mb-2 rounded"
                    />
                    <h4 className="font-semibold text-sm">Hygrometers</h4>
                    <p className="text-xs text-neutral-600 mt-1">
                      Monitors humidity levels
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 3 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 r6-glass-card r6-glow-blue rounded-full flex items-center justify-center border-2 border-electric-blue">
                <span className="text-2xl font-bold text-electric-blue r6-text-glow">3</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3">
                Water Extraction & Removal
              </h3>
              <div className="r6-glass-card p-6 r6-hover-glow">
                <p className="text-gray-300 mb-4">
                  Powerful truck-mounted and portable extraction units remove thousands of gallons of water quickly, preventing further damage and accelerating the drying process.
                </p>
                <div className="r6-glass-card r6-glow-blue border-l-4 border-electric-blue p-4 mt-4">
                  <div className="flex items-center mb-2">
                    <Image
                      src="/images/optimised/equipment/3D Extraction Unit.png"
                      alt="Extraction equipment"
                      width={60}
                      height={60}
                      className="mr-3 rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-white">Industrial Extraction Power</h4>
                      <p className="text-sm text-electric-blue">
                        Our truck-mounted units extract up to 40,000 gallons per day
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 4 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 r6-glass-card r6-glow-blue rounded-full flex items-center justify-center border-2 border-electric-blue">
                <span className="text-2xl font-bold text-electric-blue r6-text-glow">4</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3">
                Drying & Dehumidification
              </h3>
              <div className="r6-glass-card p-6 r6-hover-glow">
                <p className="text-gray-300 mb-4">
                  Strategic placement of industrial dehumidifiers and high-velocity air movers creates optimal drying conditions. Daily monitoring ensures materials reach IICRC-specified moisture levels.
                </p>
                <div className="grid md:grid-cols-2 gap-6 mt-6">
                  <div className="flex items-center p-4 r6-glass-subtle rounded-lg r6-hover-glow">
                    <Image
                      src="/images/optimised/equipment/3D Dehumidifier.png"
                      alt="Dehumidifier"
                      width={70}
                      height={70}
                      className="mr-4 rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-white">Dehumidifiers</h4>
                      <p className="text-sm text-gray-400">
                        Remove up to 30 gallons of moisture daily
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center p-4 r6-glass-subtle rounded-lg r6-hover-glow">
                    <Image
                      src="/images/optimised/equipment/3D Industrial Fan.png"
                      alt="Air movers"
                      width={70}
                      height={70}
                      className="mr-4 rounded"
                    />
                    <div>
                      <h4 className="font-semibold text-white">Air Movers</h4>
                      <p className="text-sm text-gray-400">
                        Create rapid evaporation with targeted airflow
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 5 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 r6-glass-card r6-glow-blue rounded-full flex items-center justify-center border-2 border-electric-blue">
                <span className="text-2xl font-bold text-electric-blue r6-text-glow">5</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3">
                Cleaning & Sanitization
              </h3>
              <div className="r6-glass-card p-6 r6-hover-glow">
                <p className="text-gray-300 mb-4">
                  All affected areas receive antimicrobial treatment to prevent mould and bacteria growth. We clean and sanitize restorable items using IICRC-approved methods and EPA-registered disinfectants.
                </p>
                <div className="grid md:grid-cols-2 gap-4 mt-6">
                  <div className="r6-glass-subtle p-4 rounded-lg border border-green-500/20 r6-hover-glow">
                    <div className="flex items-center mb-2">
                      <Image
                        src="/images/optimised/equipment/3D Thermal Fogging.png"
                        alt="Thermal fogging"
                        width={50}
                        height={50}
                        className="mr-3 rounded"
                      />
                      <h4 className="font-semibold text-green-400">Thermal Fogging</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                      Penetrates porous materials for deep deodorization
                    </p>
                  </div>
                  <div className="r6-glass-subtle p-4 rounded-lg border border-green-500/20 r6-hover-glow">
                    <div className="flex items-center mb-2">
                      <svg className="w-12 h-12 text-green-400 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                      <h4 className="font-semibold text-green-400">HEPA Filtration</h4>
                    </div>
                    <p className="text-sm text-gray-400">
                      Removes 99.97% of airborne particles and mould spores
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Step 6 */}
          <div className="flex gap-6">
            <div className="flex-shrink-0">
              <div className="w-16 h-16 r6-glass-card r6-glow-blue rounded-full flex items-center justify-center border-2 border-electric-blue">
                <span className="text-2xl font-bold text-electric-blue r6-text-glow">6</span>
              </div>
            </div>
            <div className="flex-1">
              <h3 className="text-2xl font-bold text-white mb-3">
                Restoration & Reconstruction
              </h3>
              <div className="r6-glass-card p-6 r6-hover-glow">
                <p className="text-gray-300 mb-4">
                  Final phase returns your property to pre-loss condition. From minor repairs like drywall replacement to major reconstruction, our skilled craftsmen complete all necessary work.
                </p>
                <div className="flex items-center justify-center mt-6">
                  <Image
                    src="/images/optimised/process/3D Restoration.png"
                    alt="Complete restoration"
                    width={200}
                    height={150}
                    className="rounded-lg"
                  />
                </div>
                <div className="grid md:grid-cols-3 gap-4 mt-6 text-center">
                  <div>
                    <h4 className="font-semibold text-white">Minor Repairs</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Drywall, paint, carpet
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Major Repairs</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Structural, roofing, rooms
                    </p>
                  </div>
                  <div>
                    <h4 className="font-semibold text-white">Reconstruction</h4>
                    <p className="text-sm text-gray-400 mt-1">
                      Complete rebuild services
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Equipment Showcase */}
      <section className="mb-16 r6-fade-in-delay-3">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          State-of-the-Art Equipment & Technology
        </h2>
        <div className="r6-glass-card r6-glow-subtle rounded-2xl p-8">
          <p className="text-lg text-gray-300 mb-8">
            We invest in the latest IICRC S500-compliant equipment to ensure the fastest, most effective restoration possible. Our arsenal includes:
          </p>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                name: "Truck-Mounted Extractors",
                specs: "40,000 gallons/day capacity",
                benefit: "Removes water 50% faster",
                image: "/images/optimised/equipment/3D Extraction Unit.png"
              },
              {
                name: "LGR Dehumidifiers",
                specs: "185 PPD removal rate",
                benefit: "Prevents mould in 24-48hrs",
                image: "/images/optimised/equipment/3D Dehumidifier.png"
              },
              {
                name: "Axial Air Movers",
                specs: "3,200 CFM airflow",
                benefit: "Accelerates evaporation",
                image: "/images/optimised/equipment/3D Industrial Fan.png"
              },
              {
                name: "FLIR Thermal Cameras",
                specs: "0.05°C sensitivity",
                benefit: "Finds hidden moisture",
                image: "/images/optimised/equipment/3D Thermal Camera.png"
              },
              {
                name: "Penetrating Moisture Meters",
                specs: "0-100% WME range",
                benefit: "Accurate moisture mapping",
                image: "/images/optimised/equipment/3D Moisture Meter.png"
              },
              {
                name: "HEPA Air Scrubbers",
                specs: "99.97% filtration",
                benefit: "Cleanroom air quality",
                image: "/images/optimised/equipment/3D Thermal Fogging.png"
              }
            ].map((item, index) => (
              <div key={index} className="r6-card-premium r6-hover-lift p-6">
                <div className="h-32 relative mb-4 r6-image-container">
                  <Image
                    src={item.image}
                    alt={item.name}
                    fill
                    className="object-contain r6-scale-hover"
                  />
                </div>
                <h3 className="font-bold text-white mb-2">{item.name}</h3>
                <p className="text-sm text-electric-blue font-semibold mb-1 r6-text-glow-subtle">{item.specs}</p>
                <p className="text-sm text-gray-400">{item.benefit}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Insurance Section */}
      <section className="mb-16 r6-fade-in-delay-4">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Insurance Claims Assistance
        </h2>
        <div className="r6-card-premium p-8">
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-white mb-4">
                We Work With All Major Insurance Companies
              </h3>
              <p className="text-gray-300 mb-6">
                Our team handles the entire claims process, providing detailed documentation that meets IICRC S500 standards and insurance requirements. We ensure you receive maximum coverage for your restoration needs.
              </p>
              <ul className="space-y-3">
                <li className="flex items-start r6-list-item">
                  <svg className="w-6 h-6 text-green-400 mr-3 mt-0.5 r6-icon-glow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Direct insurance billing - no out-of-pocket expense</span>
                </li>
                <li className="flex items-start r6-list-item">
                  <svg className="w-6 h-6 text-green-400 mr-3 mt-0.5 r6-icon-glow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Complete photo documentation and moisture mapping</span>
                </li>
                <li className="flex items-start r6-list-item">
                  <svg className="w-6 h-6 text-green-400 mr-3 mt-0.5 r6-icon-glow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Xactimate estimating for accurate pricing</span>
                </li>
                <li className="flex items-start r6-list-item">
                  <svg className="w-6 h-6 text-green-400 mr-3 mt-0.5 r6-icon-glow" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  <span className="text-gray-300">Daily progress reports to adjusters</span>
                </li>
              </ul>
            </div>
            <div className="r6-glass-subtle rounded-xl p-6 border border-electric-blue/20">
              <h4 className="font-bold text-electric-blue mb-4 r6-text-glow-subtle">Documentation We Provide:</h4>
              <ul className="space-y-2 text-sm">
                <li className="flex items-center text-gray-400 r6-list-item">
                  <span className="w-2 h-2 bg-electric-blue rounded-full mr-3 r6-pulse-dot"></span>
                  Pre-mitigation photos and videos
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Moisture content readings and maps
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Thermal imaging documentation
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Daily drying logs and psychrometric data
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Equipment placement diagrams
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Detailed line-item estimates
                </li>
                <li className="flex items-center">
                  <span className="w-2 h-2 bg-primary-600 rounded-full mr-3"></span>
                  Certificate of completion
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="mb-16 r6-fade-in-delay-5">
        <h2 className="r6-heading-xl r6-gradient-text mb-8">
          Why Property Owners Choose Our Water Damage Services
        </h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[
            {
              icon: "⚡",
              title: "Fastest Response Time",
              description: "Average 47-minute arrival in metro areas with 24/7 emergency dispatch"
            },
            {
              icon: "🏆",
              title: "IICRC Master Certified",
              description: "Technicians hold WRT, ASD, and AMRT certifications with ongoing training"
            },
            {
              icon: "🛡️",
              title: "Guaranteed Results",
              description: "We guarantee complete drying to IICRC standards or we return at no charge"
            },
            {
              icon: "📊",
              title: "Advanced Technology",
              description: "Latest moisture detection and drying equipment for faster restoration"
            },
            {
              icon: "💰",
              title: "Insurance Experts",
              description: "We handle all paperwork and maximize your coverage benefits"
            },
            {
              icon: "🌟",
              title: "5-Star Reviews",
              description: "Over 2,000 satisfied customers with 4.9/5 average rating"
            }
          ].map((item, index) => (
            <div key={index} className="r6-card-premium r6-hover-lift p-6 group">
              <div className="text-4xl mb-4 r6-icon-float">{item.icon}</div>
              <h3 className="text-xl font-bold text-white mb-2 group-hover:text-electric-blue transition-colours">{item.title}</h3>
              <p className="text-gray-400">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </ServicePageLayout>
  );
}