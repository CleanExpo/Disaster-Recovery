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

// Service-specific HowTo schemas for process-based service pages
// Each service has its own professional restoration process
const serviceHowToData: Record<string, {
  name: string;
  description: string;
  totalTime: string;
  steps: { name: string; text: string; url?: string }[];
}> = {
  'water-damage-restoration': {
    name: 'How Professional Water Damage Restoration Works',
    description: 'The IICRC-standard process for restoring water-damaged properties, from emergency extraction through to complete restoration and sign-off.',
    totalTime: 'P3D',
    steps: [
      { name: 'Emergency Water Extraction', text: 'IICRC-certified technicians arrive within 60 minutes to extract standing water using truck-mounted and portable pumps. Industrial wet vacuums remove water from carpets, underlay, and hard surfaces to stop the damage spreading.' },
      { name: 'Moisture Mapping and Assessment', text: 'Using thermal imaging cameras and pinless moisture meters, technicians map the full extent of water intrusion including inside wall cavities, under flooring, and above ceilings. This determines the IICRC water damage category (1–3) and class (1–4).' },
      { name: 'Structural Drying and Dehumidification', text: 'Commercial-grade dehumidifiers and high-velocity air movers are strategically placed based on the moisture map. Drying progress is monitored daily with moisture readings until materials reach their dry standard — typically 2–5 days depending on severity.' },
      { name: 'Antimicrobial Treatment', text: 'All affected areas are treated with IICRC-approved antimicrobial agents to prevent mould growth. This is critical in Australia where warm, humid conditions can trigger mould within 24–48 hours of water exposure.' },
      { name: 'Restoration and Rebuild', text: 'Once materials are verified dry, restoration begins — replacing damaged plasterboard, skirting boards, flooring, and cabinetry. A final moisture check confirms the property meets pre-loss condition. Full documentation is provided for your insurance claim.' },
    ],
  },
  'fire-damage-restoration': {
    name: 'How Professional Fire Damage Restoration Works',
    description: 'The complete fire and smoke damage restoration process, from make-safe through soot removal, odour elimination, and full structural rebuild.',
    totalTime: 'P14D',
    steps: [
      { name: 'Emergency Make-Safe and Board-Up', text: 'Technicians secure the property by boarding up windows, tarping the roof, and fencing off unsafe areas. Emergency services clearance is confirmed, and structural stability is assessed before any restoration work begins.' },
      { name: 'Smoke and Soot Assessment', text: 'Fire investigators and restoration technicians assess the type of fire residue (dry, wet, protein, or fuel oil soot) and the extent of smoke penetration. Different soot types require different cleaning methods — this assessment determines the restoration strategy.' },
      { name: 'Contents Pack-Out and Inventory', text: 'Salvageable contents are professionally packed out, inventoried, and transported to a climate-controlled facility for specialist cleaning. Non-salvageable items are documented for your insurance claim with photos and descriptions.' },
      { name: 'Soot Removal and Surface Cleaning', text: 'Using HEPA-filtered vacuums, dry sponges, and chemical cleaning agents, technicians remove soot from all surfaces including walls, ceilings, HVAC ducts, and structural members. This prevents long-term corrosion and staining.' },
      { name: 'Odour Elimination', text: 'Professional thermal fogging and ozone treatment eliminate embedded smoke odour from structural materials, soft furnishings, and HVAC systems. Hydroxyl generators may be used for occupied areas. Multiple treatments ensure complete odour removal.' },
      { name: 'Structural Restoration and Rebuild', text: 'Damaged structural elements are repaired or replaced — framing, plasterboard, electrical, plumbing, and finishes. The property is restored to pre-loss condition with all work documented for insurance claim support.' },
    ],
  },
  'mould-remediation': {
    name: 'How Professional Mould Remediation Works',
    description: 'The IICRC S520–standard process for safely removing mould contamination, treating affected materials, and preventing recurrence in Australian properties.',
    totalTime: 'P5D',
    steps: [
      { name: 'Mould Inspection and Air Quality Testing', text: 'A qualified mould assessor conducts visual inspection and collects air samples for laboratory analysis. This identifies the mould species present (e.g., Aspergillus, Cladosporium, Stachybotrys) and determines the scope of contamination — critical for choosing the correct remediation protocol.' },
      { name: 'Containment Setup', text: 'The contaminated area is sealed off using polyethylene sheeting and negative air pressure machines with HEPA filtration. This containment prevents mould spores spreading to unaffected areas during removal — essential in multi-unit buildings and shared wall properties.' },
      { name: 'Mould Removal and Material Disposal', text: 'Contaminated porous materials (plasterboard, carpet, insulation) are carefully removed and disposed of as contaminated waste. Non-porous surfaces are HEPA-vacuumed and scrubbed with IICRC-approved biocide solutions. Technicians wear full PPE including P2 respirators.' },
      { name: 'Antimicrobial Treatment and Encapsulation', text: 'All remediated surfaces receive antimicrobial treatment to kill residual spores. Where appropriate, encapsulant coatings are applied to structural timber and concrete to prevent future mould colonisation.' },
      { name: 'Clearance Testing and Moisture Source Resolution', text: 'Post-remediation air quality testing confirms spore counts have returned to safe levels. The underlying moisture source (leak, condensation, ventilation) is identified and repaired to prevent recurrence. A clearance certificate is issued for your records.' },
    ],
  },
  'flood-recovery': {
    name: 'How Professional Flood Recovery Works',
    description: 'The emergency flood recovery process for Australian properties, from contaminated water removal through sanitisation, drying, and full restoration.',
    totalTime: 'P7D',
    steps: [
      { name: 'Contaminated Water Removal', text: 'Flood water is classified as Category 3 (grossly contaminated) under IICRC standards. Submersible pumps and tanker trucks remove standing water, followed by extraction of water from saturated building materials. All flood water is treated as a biohazard.' },
      { name: 'Debris Removal and Gut-Out', text: 'Flood-damaged contents, carpets, underlay, and porous building materials below the flood line are removed. In severe floods, plasterboard is cut at least 300mm above the visible water line to account for wicking. All materials are disposed of as contaminated waste.' },
      { name: 'Sanitisation and Disinfection', text: 'All remaining surfaces are pressure-washed and treated with hospital-grade disinfectants to eliminate bacteria, sewage contamination, and other pathogens. HVAC systems are inspected and cleaned to prevent contaminated air circulation.' },
      { name: 'Structural Drying', text: 'Industrial drying equipment (LGR dehumidifiers, air movers, desiccant systems) dry the structure to verified moisture levels. Flood-affected properties typically require 5–10 days of controlled drying, monitored with daily moisture readings.' },
      { name: 'Restoration and Rebuild', text: 'New plasterboard, insulation, flooring, cabinetry, and electrical components are installed. The property is restored to pre-flood condition with complete documentation including before/after photos, moisture logs, and waste disposal certificates for insurance claims.' },
    ],
  },
  'storm-damage-repairs': {
    name: 'How Professional Storm Damage Repair Works',
    description: 'The process for restoring storm-damaged properties, from emergency tarping and make-safe through to structural repair and weatherproofing.',
    totalTime: 'P10D',
    steps: [
      { name: 'Emergency Make-Safe and Tarping', text: 'Within 60 minutes of your call, technicians arrive to tarp damaged roofs, board up broken windows, and secure the property against further weather exposure. Fallen trees or debris are cleared from access points and critical areas.' },
      { name: 'Damage Assessment and Documentation', text: 'A detailed scope of works is prepared documenting all storm damage — roof, gutters, fascia, windows, fencing, landscaping, and interior water ingress. Photos, measurements, and itemised costings are compiled for your insurance claim submission.' },
      { name: 'Water Ingress Mitigation', text: 'Any water that has entered through the damaged roof or windows is extracted and affected areas are set up for structural drying. This prevents secondary damage including mould growth, timber rot, and electrical faults.' },
      { name: 'Structural Repairs', text: 'Licensed builders repair or replace damaged roof tiles, sheeting, battens, and trusses. Broken windows, damaged guttering, fascia boards, and external cladding are restored. All structural work is certified to meet current Australian Building Code requirements.' },
      { name: 'Final Inspection and Weatherproofing', text: 'A final inspection verifies all repairs are complete and the property is weatherproof. Gutters are cleared, downpipes checked, and roof integrity confirmed. Documentation including trade certificates and warranty information is provided for your records.' },
    ],
  },
};

// Slug aliases so both location-page slugs and service-page slugs resolve
const serviceSlugAliases: Record<string, string> = {
  'storm-damage-restoration': 'storm-damage-repairs',
  'flood-damage-restoration': 'flood-recovery',
};

// Generate a service-specific HowTo schema
export function generateServiceHowToSchema(serviceSlug: string) {
  const resolved = serviceSlugAliases[serviceSlug] || serviceSlug;
  const data = serviceHowToData[resolved];
  if (!data) return null;

  return {
    '@context': 'https://schema.org',
    '@type': 'HowTo',
    name: data.name,
    description: data.description,
    totalTime: data.totalTime,
    step: data.steps.map((step, i) => ({
      '@type': 'HowToStep',
      position: i + 1,
      name: step.name,
      text: step.text,
      ...(step.url ? { url: step.url } : {}),
    })),
  };
}

// All service slugs that have HowTo data
export const servicesWithHowTo = Object.keys(serviceHowToData);

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