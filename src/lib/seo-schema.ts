// Comprehensive SEO Schema Generator for #1 Google Rankings

export const generateLocationServiceSchema = (location: string, postalCode: string) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  "@id": `https://disasterrecovery.com.au/locations/${location.toLowerCase()}/#service`,
  "name": `Disaster Recovery ${location} - 24/7 Emergency Restoration`,
  "url": `https://disasterrecovery.com.au/locations/${location.toLowerCase()}`,
  "description": `Professional disaster recovery and emergency restoration services in ${location}. IICRC-certified contractors available 24/7 for water damage, fire damage, mould remediation, and storm damage.`,
  "serviceType": "Damage Restoration Service",
  "provider": {
    "@id": "https://disasterrecovery.com.au/#organization"
  },
  "areaServed": {
    "@type": "GeoCircle",
    "geoMidpoint": {
      "@type": "GeoCoordinates",
      "latitude": getLatitude(location),
      "longitude": getLongitude(location)
    },
    "geoRadius": "100000"
  },
  "availableChannel": {
    "@type": "ServiceChannel",
    "serviceUrl": `https://disasterrecovery.com.au/claim`,
    "availableLanguage": "English"
  },
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
  }
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
    "serviceUrl": "https://disasterrecovery.com.au/claim",
    "availableLanguage": ["English", "Mandarin", "Arabic", "Vietnamese", "Spanish"]
  },
  "termsOfService": "https://disasterrecovery.com.au/terms",
  "provider": {
    "@type": "Organization",
    "name": "National Restoration Professionals Group (NRPG)",
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
        "text": "Yes, we work with clients insured by all major Australian insurance companies. We bill you directly so work begins immediately, and provide all documentation your insurer needs to process your reimbursement claim."
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
  "name": "How to Get Emergency Restoration Services in Australia",
  "description": "Step-by-step guide to getting immediate disaster recovery assistance from NRPG's certified contractor network",
  "totalTime": "PT5M",
  "step": [
    {
      "@type": "HowToStep",
      "position": 1,
      "name": "Report Your Damage",
      "text": "Lodge your claim online at disasterrecovery.com.au/claim with details of the damage, location, and photos if available.",
      "url": "https://disasterrecovery.com.au/claim"
    },
    {
      "@type": "HowToStep",
      "position": 2,
      "name": "Get Matched with a Certified Contractor",
      "text": "NRPG instantly matches you with the nearest IICRC-certified contractor within your selected radius (20–100 km).",
      "url": "https://disasterrecovery.com.au/how-it-works"
    },
    {
      "@type": "HowToStep",
      "position": 3,
      "name": "Receive a 60-Minute Emergency Response",
      "text": "Your matched contractor arrives within 60 minutes to assess the damage and begin make-safe and mitigation work.",
      "url": "https://disasterrecovery.com.au/claim"
    },
    {
      "@type": "HowToStep",
      "position": 4,
      "name": "Complete Restoration with Full Documentation",
      "text": "The contractor completes full restoration and provides comprehensive documentation to support your insurance claim.",
      "url": "https://disasterrecovery.com.au/claim"
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
        schemas.push(generateLocationServiceSchema(location, postalCode));
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