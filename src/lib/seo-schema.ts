// Comprehensive SEO Schema Generator for #1 Google Rankings

export const generateLocalBusinessSchema = (location: string, postalCode: string) => ({
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "@id": `https://disasterrecovery.com.au/${location}`,
  "name": `Disaster Recovery ${location} - 24/7 Emergency Restoration`,
  "image": "https://disasterrecovery.com.au/logos/disaster-recovery-logo.png",
  "logo": "https://disasterrecovery.com.au/logos/disaster-recovery-logo.png",
  "url": `https://disasterrecovery.com.au/${location}`,
  "telephone": "1300-DISASTER",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "addressLocality": location,
    "addressRegion": getRegionFromLocation(location),
    "postalCode": postalCode,
    "addressCountry": "AU"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": getLatitude(location),
    "longitude": getLongitude(location)
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "00:00",
    "closes": "23:59"
  },
  "sameAs": [
    "https://www.facebook.com/DisasterRecoveryAU",
    "https://www.linkedin.com/company/disaster-recovery-au"
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
          "description": "24/7 emergency water extraction, structural drying, flood damage restoration"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fire Damage Restoration",
          "description": "Smoke damage cleanup, soot removal, odour elimination, structural repairs"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Mould Remediation",
          "description": "IICRC certified mould removal, air quality testing, prevention strategies"
        }
      }
    ]
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.9",
    "reviewCount": "2847",
    "bestRating": "5"
  },
  "review": [
    {
      "@type": "Review",
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5"
      },
      "author": {
        "@type": "Person",
        "name": "Sarah Mitchell"
      },
      "reviewBody": "Incredible response time. Water damage fixed within hours. Highly recommend!"
    }
  ]
});

export const generateEmergencyServiceSchema = () => ({
  "@context": "https://schema.org",
  "@type": "EmergencyService",
  "name": "Disaster Recovery Australia - 24/7 Emergency Response",
  "serviceType": "Property Damage Restoration",
  "areaServed": {
    "@type": "Country",
    "name": "Australia"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": "https://disasterrecovery.com.au/emergency",
    "servicePhone": "1300-DISASTER",
    "availableLanguage": ["English", "Mandarin", "Arabic", "Vietnamese", "Spanish"]
  },
  "termsOfService": "https://disasterrecovery.com.au/terms",
  "provider": {
    "@type": "Organization",
    "name": "National Restoration Platform (NRP)",
    "url": "https://disasterrecovery.com.au"
  }
});

export const generateFAQSchema = () => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "How quickly can you respond to water damage emergencies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We guarantee response within 60 minutes for emergency water damage across all major Australian cities. Our network of 115,000+ certified contractors ensures immediate availability 24/7."
      }
    },
    {
      "@type": "Question",
      "name": "Do you work directly with insurance companies?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, we work with all major Australian insurance companies. We handle the entire claims process, providing detailed documentation and direct billing to simplify your restoration experience."
      }
    },
    {
      "@type": "Question",
      "name": "What areas of Australia do you service?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We provide nationwide coverage across all of Australia, from major cities like Sydney, Melbourne, Brisbane, Perth, and Adelaide to regional and remote areas including Coober Pedy, Mount Isa, and Thursday Island."
      }
    },
    {
      "@type": "Question",
      "name": "Are your contractors certified?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "All contractors in our network are IICRC certified and complete our comprehensive 14-day training program. They maintain current insurance, undergo background checks, and follow strict quality standards."
      }
    },
    {
      "@type": "Question",
      "name": "What types of damage do you handle?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "We handle all types of property damage including water damage, fire and smoke damage, mould remediation, storm damage, sewage cleanup, biohazard cleaning, and structural drying for properties from single rooms to 80+ floor buildings."
      }
    }
  ]
});

export const generateBreadcrumbSchema = (items: Array<{name: string, url: string}>) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": items.map((item, index) => ({
    "@type": "ListItem",
    "position": index + 1,
    "name": item.name,
    "item": item.url
  }))
});

export const generateHowToSchema = () => ({
  "@context": "https://schema.org",
  "@type": "HowTo",
  "name": "How to Get Emergency Restoration Services",
  "description": "Quick guide to getting immediate disaster recovery assistance",
  "estimatedCost": {
    "@type": "MonetaryAmount",
    "currency": "AUD",
    "value": "0"
  },
  "totalTime": "PT5M",
  "step": [
    {
      "@type": "HowToStep",
      "name": "Report Damage",
      "text": "Call 1300-DISASTER or use our online form to report your emergency",
      "url": "https://disasterrecovery.com.au/emergency",
      "image": "https://disasterrecovery.com.au/images/step1.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Instant Match",
      "text": "Our AI instantly matches you with the nearest certified contractor",
      "url": "https://disasterrecovery.com.au/how-it-works",
      "image": "https://disasterrecovery.com.au/images/step2.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Fast Response",
      "text": "Contractor arrives within 60 minutes to assess and begin restoration",
      "url": "https://disasterrecovery.com.au/response-time",
      "image": "https://disasterrecovery.com.au/images/step3.jpg"
    },
    {
      "@type": "HowToStep",
      "name": "Full Restoration",
      "text": "Complete restoration with insurance handled directly",
      "url": "https://disasterrecovery.com.au/insurance",
      "image": "https://disasterrecovery.com.au/images/step4.jpg"
    }
  ]
});

export const generateVideoSchema = () => ({
  "@context": "https://schema.org",
  "@type": "VideoObject",
  "name": "Disaster Recovery Australia - How We Work",
  "description": "Learn how Australia's largest disaster recovery network provides 24/7 emergency restoration services",
  "thumbnailUrl": "https://disasterrecovery.com.au/video-thumb.jpg",
  "uploadDate": "2025-01-01T08:00:00+10:00",
  "duration": "PT2M30S",
  "contentUrl": "https://disasterrecovery.com.au/video/how-we-work.mp4",
  "embedUrl": "https://disasterrecovery.com.au/embed/how-we-work"
});

// Helper functions for location data
function getRegionFromLocation(location: string): string {
  const regions: Record<string, string> = {
    'sydney': 'NSW',
    'melbourne': 'VIC',
    'brisbane': 'QLD',
    'perth': 'WA',
    'adelaide': 'SA',
    'hobart': 'TAS',
    'darwin': 'NT',
    'canberra': 'ACT'
  };
  return regions[location.toLowerCase()] || 'NSW';
}

function getLatitude(location: string): number {
  const coords: Record<string, number> = {
    'sydney': -33.8688,
    'melbourne': -37.8136,
    'brisbane': -27.4705,
    'perth': -31.9505,
    'adelaide': -34.9285,
    'hobart': -42.8821,
    'darwin': -12.4634,
    'canberra': -35.2809
  };
  return coords[location.toLowerCase()] || -33.8688;
}

function getLongitude(location: string): number {
  const coords: Record<string, number> = {
    'sydney': 151.2093,
    'melbourne': 144.9631,
    'brisbane': 153.0260,
    'perth': 115.8605,
    'adelaide': 138.6007,
    'hobart': 147.3272,
    'darwin': 130.8456,
    'canberra': 149.1300
  };
  return coords[location.toLowerCase()] || 151.2093;
}

// Generate all schemas for a page
export function generateAllSchemas(pageType: string, location?: string, postalCode?: string) {
  const schemas = [];
  
  // Always include organization schema
  schemas.push(generateEmergencyServiceSchema());
  
  // Add specific schemas based on page type
  switch(pageType) {
    case 'home':
      schemas.push(generateFAQSchema());
      schemas.push(generateHowToSchema());
      schemas.push(generateVideoSchema());
      break;
    case 'location':
      if (location && postalCode) {
        schemas.push(generateLocalBusinessSchema(location, postalCode));
      }
      schemas.push(generateFAQSchema());
      break;
    case 'service':
      schemas.push(generateHowToSchema());
      schemas.push(generateFAQSchema());
      break;
  }
  
  return schemas;
}

// Long-tail keyword generator for location pages
export function generateLongTailKeywords(location: string, service: string) {
  const templates = [
    `${service} ${location} 24 hours`,
    `emergency ${service} ${location}`,
    `${location} ${service} near me`,
    `best ${service} ${location}`,
    `${service} restoration ${location}`,
    `${location} ${service} insurance approved`,
    `urgent ${service} ${location} today`,
    `same day ${service} ${location}`,
    `${location} ${service} cost`,
    `${service} ${location} reviews`,
    `certified ${service} ${location}`,
    `professional ${service} ${location}`,
    `${location} ${service} specialists`,
    `IICRC ${service} ${location}`,
    `${service} ${location} contractors`
  ];
  
  return templates;
}