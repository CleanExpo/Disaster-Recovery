'use client';

import Script from 'next/script';
import { generateAllSchemas } from '@/lib/seo-schema';

interface ComprehensiveSEOProps {
  location?: string;
  service?: string;
  pageType?: 'home' | 'service' | 'location' | 'contact';
}

export function ComprehensiveSEO({ location = 'Australia', service, pageType = 'home' }: ComprehensiveSEOProps) {
  const schemas = generateAllSchemas(pageType, location, '2000');
  
  // Enhanced schema for the UBER model
  const enhancedSchema = {
    ...schemas,
    "@graph": [
      ...(schemas["@graph"] || []),
      {
        "@type": "OnDemandService",
        "name": "Disaster Recovery Australia - UBER Model",
        "description": "Revolutionary transparent disaster recovery connecting clients directly with vetted contractors",
        "provider": {
          "@type": "Organization",
          "name": "National Restoration Professionals",
          "url": "https://disaster-recovery-seven.vercel.app"
        },
        "areaServed": {
          "@type": "Country",
          "name": "Australia"
        },
        "hasOfferCatalog": {
          "@type": "OfferCatalog",
          "name": "Emergency Restoration Services",
          "itemListElement": [
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Water Damage Restoration",
                "description": "24/7 emergency water damage restoration with transparent pricing"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Fire Damage Restoration",
                "description": "Complete fire and smoke damage restoration services"
              }
            },
            {
              "@type": "Offer",
              "itemOffered": {
                "@type": "Service",
                "name": "Mould Remediation",
                "description": "Professional mould removal and prevention services"
              }
            }
          ]
        }
      },
      {
        "@type": "FAQPage",
        "mainEntity": [
          {
            "@type": "Question",
            "name": "How does the UBER model work for disaster recovery?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "We connect you directly with vetted contractors in your area. You see transparent pricing, understand what your insurance covers, and make informed decisions about your restoration."
            }
          },
          {
            "@type": "Question",
            "name": "What if my insurance doesn't cover everything?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "Our contractors explain exactly what's covered and what isn't. You can choose to pay the difference for non-covered items or upgrades. Complete transparency, your choice."
            }
          },
          {
            "@type": "Question",
            "name": "Is there a Site Manager Fee?",
            "acceptedAnswer": {
              "@type": "Answer",
              "text": "For complex projects over $100k, contractors may offer optional Site Manager services (5-8% fee) for enhanced project management and policy navigation. This is completely optional and transparent."
            }
          }
        ]
      }
    ]
  };

  return (
    <>
      <Script
        id="schema-markup"
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(enhancedSchema)
        }}
      />
      
      {/* Hidden content for SEO crawlers */}
      <div className="sr-only" aria-hidden="true">
        <h2>24/7 Emergency Contact</h2>
        <p>Call 1300-DISASTER (1300 347 278) for immediate emergency response</p>
        <h2>Service Areas</h2>
        <p>Servicing all of Australia including Sydney, Melbourne, Brisbane, Perth, Adelaide, Gold Coast, Newcastle, Canberra, and all regional areas</p>
        <h2>Services Offered</h2>
        <ul>
          <li>Water damage restoration emergency response</li>
          <li>Fire damage restoration and smoke removal</li>
          <li>Mould remediation and prevention</li>
          <li>Storm damage emergency repairs</li>
          <li>Sewage cleanup and biohazard removal</li>
          <li>Commercial and residential restoration</li>
          <li>Insurance claim assistance and direct billing</li>
        </ul>
      </div>
    </>
  );
}

// Missing phone component
export function EmergencyContactBar() {
  return (
    <div className="fixed top-0 left-0 right-0 bg-red-600 text-white py-2 px-4 z-[9999] shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex items-center gap-4">
          <span className="animate-pulse">🚨</span>
          <span className="font-semibold">24/7 Emergency Response</span>
        </div>
        <a 
          href="tel:1300347278" 
          className="flex items-center gap-2 bg-white text-red-600 px-4 py-1 rounded-full font-bold hover:bg-yellow-400 hover:text-black transition-colors"
        >
          <span>📞</span>
          <span>1300-DISASTER</span>
        </a>
      </div>
    </div>
  );
}

export default ComprehensiveSEO;