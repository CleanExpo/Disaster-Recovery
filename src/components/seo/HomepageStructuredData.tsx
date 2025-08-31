'use client';

import Script from 'next/script';

export function HomepageStructuredData() {
  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organisation",
    "@id": "https://disasterrecovery.com.au/#organisation",
    "name": "Disaster Recovery",
    "url": "https://disasterrecovery.com.au",
    "logo": {
      "@type": "ImageObject",
      "url": "https://disasterrecovery.com.au/logo.png",
      "width": 600,
      "height": 60
    },
    "description": "Premier network of IICRC certified disaster recovery contractors. 24/7 emergency response for water damage, fire restoration, and mould remediation.",
    "email": "info@disasterrecovery.com.au",
    "areaServed": {
      "@type": "Country",
      "name": "Australia"
    },
    "sameAs": [
      "https://www.facebook.com/DisasterRecoveryAU",
      "https://www.linkedin.com/company/disaster-recovery-australia",
      "https://twitter.com/DisasterRecovAU"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.9",
      "reviewCount": "1247",
      "bestRating": "5",
      "worstRating": "1"
    }
  };

  const localBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "EmergencyService",
    "@id": "https://disasterrecovery.com.au/#business",
    "name": "Disaster Recovery",
    "image": "https://disasterrecovery.com.au/og-image.jpg",
    "url": "https://disasterrecovery.com.au",
    "telephone": "",
    "priceRange": "$2200+",
    "address": {
      "@type": "PostalAddress",
      "addressCountry": "AU",
      "addressRegion": "Australia"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": -25.2744,
      "longitude": 133.7751
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday", "Tuesday", "Wednesday", "Thursday", 
        "Friday", "Saturday", "Sunday"
      ],
      "opens": "00:00",
      "closes": "23:59"
    },
    "areaServed": [
      {
        "@type": "State",
        "name": "New South Wales"
      },
      {
        "@type": "State",
        "name": "Victoria"
      },
      {
        "@type": "State",
        "name": "Queensland"
      },
      {
        "@type": "State",
        "name": "Western Australia"
      },
      {
        "@type": "State",
        "name": "South Australia"
      },
      {
        "@type": "State",
        "name": "Tasmania"
      },
      {
        "@type": "State",
        "name": "Northern Territory"
      },
      {
        "@type": "State",
        "name": "Australian Capital Territory"
      }
    ],
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": "Disaster Recovery Services",
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Water Damage Restoration",
            "description": "24/7 water extraction, drying, and restoration services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Fire & Smoke Damage Restoration",
            "description": "Complete fire damage restoration and smoke removal"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Mould Remediation",
            "description": "Professional mould removal and prevention services"
          }
        },
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": "Flood Recovery",
            "description": "Major flood damage restoration and recovery"
          }
        }
      ]
    }
  };

  const webSiteSchema = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://disasterrecovery.com.au/#website",
    "url": "https://disasterrecovery.com.au",
    "name": "Disaster Recovery",
    "description": "24/7 Emergency Disaster Recovery Services nationwide",
    "publisher": {
      "@id": "https://disasterrecovery.com.au/#organisation"
    },
    "potentialAction": {
      "@type": "SearchAction",
      "target": {
        "@type": "EntryPoint",
        "urlTemplate": "https://disasterrecovery.com.au/search?q={search_term_string}"
      },
      "query-input": "required name=search_term_string"
    },
    "inLanguage": "en-AU"
  };

  const breadcrumbSchema = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "name": "Home",
        "item": "https://disasterrecovery.com.au"
      }
    ]
  };

  const faqSchema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": [
      {
        "@type": "Question",
        "name": "How does your online system work?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Simply fill out our online form with your damage details and location. We instantly match you with IICRC certified contractors within your selected radius (20-100km). You'll receive multiple quotes within 30-60 minutes."
        }
      },
      {
        "@type": "Question",
        "name": "Why is there a $2,200 minimum service fee?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "The $2,200 minimum covers emergency response, professional assessment, initial mitigation, industrial equipment, certified technicians, and insurance documentation. This ensures proper restoration and prevents secondary damage that could cost thousands more."
        }
      },
      {
        "@type": "Question",
        "name": "Are all contractors IICRC certified?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, 100% of our network contractors must maintain current IICRC certification, carry $20M public liability insurance, and meet strict Disaster Recovery Network standards."
        }
      },
      {
        "@type": "Question",
        "name": "Is insurance coverage available?",
        "acceptedAnswer": {
          "@type": "Answer",
          "text": "Yes, most disasters are insurance covered. Our contractors bill insurance directly so you only pay your excess. We handle all documentation and claims assistance."
        }
      }
    ]
  };

  const speakableSchema = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": "Disaster Recovery - 24/7 Online Emergency Response",
    "speakable": {
      "@type": "SpeakableSpecification",
      "cssSelector": [
        ".hero-heading",
        ".hero-description",
        ".emergency-cta"
      ]
    },
    "url": "https://disasterrecovery.com.au"
  };

  return (
    <>
      <Script
        id="organisation-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationSchema) }}
      />
      <Script
        id="local-business-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="website-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteSchema) }}
      />
      <Script
        id="breadcrumb-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="speakable-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(speakableSchema) }}
      />
    </>
  );
}