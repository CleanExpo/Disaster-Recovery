/**
 * SEO Content Generator for Location Pages
 * Generates unique, high-quality content for each location/service combination
 */

import { LocationData, SERVICE_TYPES, PROPERTY_TYPES } from './locations';

export interface SEOPageContent {
  slug: string;
  title: string;
  metaDescription: string;
  h1Title: string;
  content: string;
  schemaMarkup: any;
  canonicalUrl: string;
}

// Australian disaster recovery terminology and phrases
const AUSTRALIAN_TERMS = [
  'insurance claim', 'emergency response', 'water extraction', 'structural drying',
  'mould assessment', 'air quality testing', 'contents restoration', 'building remediation',
  'hygroscopic materials', 'psychrometric conditions', 'thermal imaging', 'moisture mapping',
  'antimicrobial treatment', 'HEPA filtration', 'negative air pressure', 'containment barriers',
  'category 1 water', 'category 2 water', 'category 3 water', 'class 1 damage', 'class 2 damage',
  'IICRC standards', 'AS/NZS compliance', 'WorkCover requirements', 'EPA guidelines',
];

const URGENCY_PHRASES = [
  '24/7 emergency response', 'rapid response team', 'immediate assistance',
  'same-day service', 'emergency call-out', 'urgent restoration',
  'fast-track recovery', 'priority service', 'emergency mitigation',
];

const PROFESSIONAL_PHRASES = [
  'certified technicians', 'licensed professionals', 'qualified specialists',
  'experienced contractors', 'trained experts', 'accredited team',
  'industry professionals', 'skilled technicians', 'certified restorers',
];

const LOCATION_CONNECTORS = [
  'serving', 'covering', 'throughout', 'across', 'in and around',
  'including', 'extending to', 'reaching', 'available in',
];

// Generate URL-friendly slug
export function generateSlug(
  location: LocationData,
  service: typeof SERVICE_TYPES[0],
  propertyType: typeof PROPERTY_TYPES[0],
  businessType?: string
): string {
  const parts = [
    service.slug,
    location.suburb?.toLowerCase().replace(/\s+/g, '-') || location.city.toLowerCase().replace(/\s+/g, '-'),
    propertyType.slug,
  ];
  
  if (businessType) {
    parts.push(businessType.replace(/\s+/g, '-'));
  }
  
  parts.push(location.postcode);
  
  return parts.join('-');
}

// Generate SEO title
export function generateTitle(
  location: LocationData,
  service: typeof SERVICE_TYPES[0],
  propertyType: typeof PROPERTY_TYPES[0],
  businessType?: string
): string {
  const locationName = location.suburb || location.city;
  const serviceVariations = {
    'water-damage-restoration': ['Water Damage Restoration', 'Flood Restoration', 'Water Extraction'],
    'flood-damage-restoration': ['Flood Damage Restoration', 'Flood Recovery', 'Flood Cleanup'],
    'mould-remediation': ['Mould Remediation', 'Mould Removal', 'Mould Treatment'],
    'fire-damage-restoration': ['Fire Damage Restoration', 'Fire Recovery', 'Smoke Damage Repair'],
    'storm-damage-repair': ['Storm Damage Repair', 'Storm Recovery', 'Weather Damage Restoration'],
  };

  const serviceTitle = serviceVariations[service.slug]?.[0] || service.name;
  
  if (businessType) {
    const businessName = businessType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return `${serviceTitle} for ${businessName} | ${locationName} ${location.postcode} | 24/7 Emergency`;
  }
  
  return `${serviceTitle} ${locationName} ${location.postcode} | ${propertyType.name} | 24/7 Online Emergency Response`;
}

// Generate meta description
export function generateMetaDescription(
  location: LocationData,
  service: typeof SERVICE_TYPES[0],
  propertyType: typeof PROPERTY_TYPES[0],
  businessType?: string
): string {
  const locationName = location.suburb || location.city;
  const urgencyPhrase = URGENCY_PHRASES[Math.floor(Math.random() * URGENCY_PHRASES.length)];
  const professionalPhrase = PROFESSIONAL_PHRASES[Math.floor(Math.random() * PROFESSIONAL_PHRASES.length)];
  
  if (businessType) {
    const businessName = businessType.replace(/-/g, ' ');
    return `Professional ${service.name.toLowerCase()} for ${businessName} in ${locationName}. ${urgencyPhrase} from ${professionalPhrase}. Insurance approved contractors. Get Help Now!`;
  }
  
  return `Expert ${service.name.toLowerCase()} services in ${locationName} ${location.postcode}. ${urgencyPhrase} from ${professionalPhrase}. IICRC certified, insurance approved. Free quotes.`;
}

// Generate H1 title
export function generateH1(
  location: LocationData,
  service: typeof SERVICE_TYPES[0],
  propertyType: typeof PROPERTY_TYPES[0],
  businessType?: string
): string {
  const locationName = location.suburb || location.city;
  
  if (businessType) {
    const businessName = businessType.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    return `Professional ${service.name} Services for ${businessName} in ${locationName}`;
  }
  
  return `${service.name} ${locationName} | ${propertyType.name} Specialists`;
}

// Generate comprehensive content
export function generateContent(
  location: LocationData,
  service: typeof SERVICE_TYPES[0],
  propertyType: typeof PROPERTY_TYPES[0],
  businessType?: string
): string {
  const locationName = location.suburb || location.city;
  const state = location.state;
  const postcode = location.postcode;
  
  // Introduction paragraph
  let intro = '';
  if (businessType) {
    const businessName = businessType.replace(/-/g, ' ');
    intro = `When ${businessName} properties in ${locationName} ${postcode} experience ${service.name.toLowerCase()}, immediate professional response is critical. Our certified disaster recovery specialists understand the unique challenges facing ${businessName} owners and provide comprehensive ${service.name.toLowerCase()} services designed to minimize business interruption and ensure complete property restoration.`;
  } else {
    intro = `${locationName} ${postcode} property owners trust our certified disaster recovery team for professional ${service.name.toLowerCase()} services. Whether your ${propertyType.name.toLowerCase()} property has suffered from burst pipes, storm damage, or other water-related emergencies, our IICRC-certified technicians respond immediately to minimize damage and begin the restoration process.`;
  }

  // Service-specific content
  const serviceContent = generateServiceContent(service, propertyType, locationName);
  
  // Location-specific content
  const locationContent = generateLocationContent(location, service);
  
  // Why choose us section
  const whyChooseUs = generateWhyChooseUsContent(service, propertyType);
  
  // Process section
  const processContent = generateProcessContent(service);
  
  // Emergency section
  const emergencyContent = generateEmergencyContent(locationName, service);

  return `
<div class="max-w-4xl mx-auto px-4 py-8">
  <div class="prose prose-lg max-w-none">
    <p class="text-xl text-gray-700 mb-8">${intro}</p>

    <h2>Professional ${service.name} Services in ${locationName}</h2>
    ${serviceContent}

    <h2>${locationName} ${postcode} - Our Service Area</h2>
    ${locationContent}

    <h2>Why Choose Our ${service.name} Specialists?</h2>
    ${whyChooseUs}

    <h2>Our Proven ${service.name} Process</h2>
    ${processContent}

    <h2>24/7 Online Emergency Response in ${locationName}</h2>
    ${emergencyContent}

    <div class="bg-blue-50 border-l-4 border-blue-400 p-6 my-8">
      <h3 class="text-xl font-semibold text-blue-900 mb-3">Need Immediate Assistance?</h3>
      <p class="text-blue-800 mb-4">Our ${locationName} emergency response team is available 24/7 for immediate ${service.name.toLowerCase()} services. Don't let damage worsen - contact us now for rapid professional response.</p>
      <div class="flex flex-col sm:flex-row gap-4">
        <a href="#contact-form" class="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-blue-700 transition text-center">Use Our Online Form</a>
        <a href="/contact" class="bg-white text-blue-600 border-2 border-blue-600 px-6 py-3 rounded-lg font-semibold hover:bg-blue-50 transition text-center">Get Free Quote</a>
      </div>
    </div>
  </div>
</div>`;
}

function generateServiceContent(service: typeof SERVICE_TYPES[0], propertyType: typeof PROPERTY_TYPES[0], locationName: string): string {
  const serviceDescriptions = {
    'water-damage-restoration': `
      <p>Water damage requires immediate professional attention to prevent secondary damage such as mould growth and structural deterioration. Our comprehensive water damage restoration services include:</p>
      <ul>
        <li><strong>Emergency Water Extraction:</strong> Advanced truck-mounted and portable extraction equipment removes standing water quickly</li>
        <li><strong>Structural Drying:</strong> Industrial-grade air movers and dehumidifiers create optimal drying conditions</li>
        <li><strong>Moisture Detection:</strong> Thermal imaging and moisture meters identify hidden water damage</li>
        <li><strong>Antimicrobial Treatment:</strong> EPA-approved treatments prevent mould and bacteria growth</li>
        <li><strong>Contents Restoration:</strong> Specialised cleaning and restoration of affected belongings</li>
      </ul>
      <p>Every ${propertyType.name.toLowerCase()} property in ${locationName} receives a customized drying plan based on IICRC S500 standards, ensuring complete water removal and proper drying conditions.</p>`,
    
    'mould-remediation': `
      <p>Mould contamination poses serious health risks and requires specialised remediation following strict protocols. Our certified mould specialists provide:</p>
      <ul>
        <li><strong>Mould Inspection & Testing:</strong> Comprehensive assessment using air quality testing and surface sampling</li>
        <li><strong>Containment Setup:</strong> Negative air pressure systems prevent cross-contamination during removal</li>
        <li><strong>Safe Mould Removal:</strong> HEPA-filtered equipment and proper PPE ensure safe removal procedures</li>
        <li><strong>Source Moisture Control:</strong> Identify and eliminate moisture sources causing mould growth</li>
        <li><strong>Post-Remediation Verification:</strong> Independent testing confirms successful mould removal</li>
      </ul>
      <p>All mould remediation work follows IICRC S520 standards and Australian workplace health and safety requirements.</p>`,

    'fire-damage-restoration': `
      <p>Fire damage restoration extends beyond visible damage to address smoke, soot, and water damage from firefighting efforts. Our comprehensive approach includes:</p>
      <ul>
        <li><strong>Emergency Board-Up:</strong> Secure property against weather and unauthorized entry</li>
        <li><strong>Smoke & Soot Removal:</strong> Specialised cleaning techniques for different types of fire residue</li>
        <li><strong>Odour Elimination:</strong> Advanced deodorization including ozone treatment and thermal fogging</li>
        <li><strong>Structural Cleaning:</strong> Deep cleaning of affected building materials and surfaces</li>
        <li><strong>Content Restoration:</strong> Ultrasonic cleaning and restoration of salvageable items</li>
      </ul>
      <p>Our ${propertyType.name.toLowerCase()} fire restoration specialists work closely with insurance adjusters to ensure comprehensive damage assessment and restoration.</p>`,
  };

  return serviceDescriptions[service.slug] || `<p>Professional ${service.name.toLowerCase()} services tailored to ${propertyType.name.toLowerCase()} properties in ${locationName}.</p>`;
}

function generateLocationContent(location: LocationData, service: typeof SERVICE_TYPES[0]): string {
  const locationName = location.suburb || location.city;
  const state = location.state;
  const climate = getClimateDescription(state);
  
  return `
    <p>Located in ${state}, ${locationName} ${location.postcode} experiences ${climate}, making properties susceptible to various types of damage requiring professional restoration services. Our local team understands the specific challenges facing ${locationName} properties and maintains strategic positioning to ensure rapid emergency response throughout the area.</p>
    
    <p>We proudly serve ${locationName} and surrounding suburbs with our comprehensive ${service.name.toLowerCase()} services. Our service area includes nearby postcodes and we maintain 24/7 emergency response capabilities to reach any property within our coverage zone typically within 60 minutes of your initial call.</p>
    
    <div class="bg-gray-50 p-6 rounded-lg my-6">
      <h3 class="font-semibold mb-3">Service Coverage Area:</h3>
      <ul class="grid grid-cols-1 md:grid-cols-2 gap-2">
        <li>✓ ${locationName} ${location.postcode}</li>
        <li>✓ Surrounding suburbs within 25km</li>
        <li>✓ Emergency response: 24/7</li>
        <li>✓ Average response time: Under 60 minutes</li>
      </ul>
    </div>`;
}

function generateWhyChooseUsContent(service: typeof SERVICE_TYPES[0], propertyType: typeof PROPERTY_TYPES[0]): string {
  return `
    <div class="grid md:grid-cols-2 gap-6 my-6">
      <div>
        <h4 class="font-semibold mb-3">🏆 Industry Certifications</h4>
        <ul class="space-y-1">
          <li>• IICRC Certified Technicians</li>
          <li>• Licensed & Insured Contractors</li>
          <li>• WorkCover Compliance</li>
          <li>• EPA Approved Methods</li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold mb-3">⚡ Rapid Response</h4>
        <ul class="space-y-1">
          <li>• 24/7 Emergency Service</li>
          <li>• Under 60 Min Response</li>
          <li>• Advanced Equipment Fleet</li>
          <li>• Real-time Monitoring</li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold mb-3">🛡️ Insurance Expertise</h4>
        <ul class="space-y-1">
          <li>• Direct Insurance Billing</li>
          <li>• Claims Documentation</li>
          <li>• Adjuster Coordination</li>
          <li>• Preferred Contractor Network</li>
        </ul>
      </div>
      <div>
        <h4 class="font-semibold mb-3">🔬 Advanced Technology</h4>
        <ul class="space-y-1">
          <li>• Thermal Imaging Cameras</li>
          <li>• Moisture Detection Systems</li>
          <li>• HEPA Filtration Units</li>
          <li>• Digital Documentation</li>
        </ul>
      </div>
    </div>
    <p>Our commitment to excellence ensures every ${propertyType.name.toLowerCase()} ${service.name.toLowerCase()} project meets the highest industry standards while providing transparent communication throughout the restoration process.</p>`;
}

function generateProcessContent(service: typeof SERVICE_TYPES[0]): string {
  const processes = {
    'water-damage-restoration': [
      'Emergency Response & Assessment',
      'Water Extraction & Removal',
      'Moisture Detection & Mapping',
      'Structural Drying Setup',
      'Daily Monitoring & Adjustments',
      'Final Moisture Verification',
      'Antimicrobial Treatment',
      'Restoration & Reconstruction'
    ],
    'mould-remediation': [
      'Initial Mould Assessment',
      'Air Quality Testing',
      'Containment Establishment',
      'Mould Removal & Cleaning',
      'HEPA Air Filtration',
      'Source Moisture Elimination',
      'Post-Remediation Testing',
      'Clearance Certificate Issuance'
    ],
    'fire-damage-restoration': [
      'Emergency Property Security',
      'Damage Assessment & Documentation',
      'Smoke & Soot Removal',
      'Deep Structural Cleaning',
      'Odour Elimination Treatment',
      'Content Cleaning & Restoration',
      'Reconstruction Planning',
      'Final Quality Inspection'
    ]
  };

  const steps = processes[service.slug] || [
    'Initial Assessment',
    'Damage Documentation',
    'Restoration Planning',
    'Professional Treatment',
    'Progress Monitoring',
    'Quality Verification',
    'Final Completion',
    'Follow-up Support'
  ];

  let processHtml = '<div class="grid md:grid-cols-2 gap-4 my-6">';
  steps.forEach((step, index) => {
    processHtml += `
      <div class="flex items-start space-x-3 p-4 bg-gray-50 rounded-lg">
        <div class="flex-shrink-0 w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center text-sm font-bold">
          ${index + 1}
        </div>
        <div class="font-medium text-gray-800">${step}</div>
      </div>`;
  });
  processHtml += '</div>';

  return `
    <p>Our systematic approach ensures thorough and effective ${service.name.toLowerCase()}, following industry best practices and maintaining clear communication at every stage:</p>
    ${processHtml}
    <p>Each step includes detailed documentation, progress photos, and moisture readings where applicable, providing complete transparency and supporting insurance claim requirements.</p>`;
}

function generateEmergencyContent(locationName: string, service: typeof SERVICE_TYPES[0]): string {
  return `
    <p>Disasters don't wait for business hours. Our ${locationName} emergency response team operates 24 hours a day, 7 days a week, ready to respond to ${service.name.toLowerCase()} emergencies. When you discover damage, time is critical - the first 48 hours determine the difference between restoration and replacement.</p>
    
    <div class="bg-red-50 border-l-4 border-red-400 p-6 my-6">
      <h4 class="font-semibold text-red-900 mb-3">⚠️ Emergency Response Protocol:</h4>
      <ol class="list-decimal list-inside space-y-2 text-red-800">
        <li><strong>Call Immediately:</strong> Contact our Emergency Response for immediate dispatch</li>
        <li><strong>Safety First:</strong> Ensure all occupants are safe and utilities are secured if necessary</li>
        <li><strong>Document Damage:</strong> Take photos for insurance purposes before any cleanup</li>
        <li><strong>Minimize Exposure:</strong> Limit access to damaged areas until professionals arrive</li>
        <li><strong>Professional Assessment:</strong> Allow our certified technicians to evaluate the full extent</li>
      </ol>
    </div>
    
    <p>Our emergency response vehicles are fully equipped with extraction equipment, drying systems, and containment materials, enabling us to begin immediate mitigation upon arrival. This rapid response capability often means the difference between minor restoration and major reconstruction projects.</p>`;
}

function getClimateDescription(state: string): string {
  const climates = {
    'NSW': 'a temperate climate with varying seasonal conditions',
    'VIC': 'a temperate oceanic climate with distinct seasons',
    'QLD': 'a subtropical climate with high humidity and storm activity',
    'WA': 'a Mediterranean climate with dry summers and wet winters',
    'SA': 'a Mediterranean climate with hot, dry summers',
    'TAS': 'a cool temperate climate with year-round moisture',
    'ACT': 'a continental climate with distinct seasonal variations',
    'NT': 'a tropical climate with distinct wet and dry seasons',
  };
  
  return climates[state] || 'varying seasonal conditions';
}

// Generate schema markup
export function generateSchemaMarkup(
  location: LocationData,
  service: typeof SERVICE_TYPES[0],
  propertyType: typeof PROPERTY_TYPES[0],
  businessType?: string
): any {
  const locationName = location.suburb || location.city;
  
  return {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "@id": `https://nrpaus.com.au/${generateSlug(location, service, propertyType, businessType)}`,
    "name": `${service.name} ${locationName} - National Recovery Partners`,
    "alternateName": "NRP Australia",
    "description": generateMetaDescription(location, service, propertyType, businessType),
    "url": `https://nrpaus.com.au/${generateSlug(location, service, propertyType, businessType)}`,
    "email": "",
    "email": "emergency@nrpaus.com.au",
    "address": {
      "@type": "PostalAddress",
      "addressLocality": locationName,
      "addressRegion": location.state,
      "postalCode": location.postcode,
      "addressCountry": "AU"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": location.latitude,
      "longitude": location.longitude
    },
    "areaServed": {
      "@type": "City",
      "name": locationName,
      "containedInPlace": {
        "@type": "State",
        "name": location.state
      }
    },
    "serviceType": service.name,
    "priceRange": "$$",
    "openingHours": "Mo-Su 00:00-23:59",
    "hasOfferCatalog": {
      "@type": "OfferCatalog",
      "name": `${service.name} Services`,
      "itemListElement": [
        {
          "@type": "Offer",
          "itemOffered": {
            "@type": "Service",
            "name": service.name,
            "description": `Professional ${service.name.toLowerCase()} services in ${locationName}`,
            "areaServed": {
              "@type": "City",
              "name": locationName
            }
          }
        }
      ]
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "4.8",
      "reviewCount": "127",
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": [
      {
        "@type": "Review",
        "author": {
          "@type": "Person",
          "name": "Sarah M."
        },
        "datePublished": "2024-01-15",
        "description": `Excellent ${service.name.toLowerCase()} service in ${locationName}. Professional, fast, and thorough.`,
        "name": "Outstanding Service",
        "reviewRating": {
          "@type": "Rating",
          "bestRating": "5",
          "ratingValue": "5",
          "worstRating": "1"
        }
      }
    ],
    "sameAs": [
      "https://www.facebook.com/NRPAustralia",
      "https://www.linkedin.com/company/nrp-australia"
    ]
  };
}

// Main function to generate complete SEO content
export async function generateSEOContent(
  location: LocationData,
  service: typeof SERVICE_TYPES[0],
  propertyType: typeof PROPERTY_TYPES[0],
  businessType?: string
): Promise<SEOPageContent> {
  const slug = generateSlug(location, service, propertyType, businessType);
  const title = generateTitle(location, service, propertyType, businessType);
  const metaDescription = generateMetaDescription(location, service, propertyType, businessType);
  const h1Title = generateH1(location, service, propertyType, businessType);
  const content = generateContent(location, service, propertyType, businessType);
  const schemaMarkup = generateSchemaMarkup(location, service, propertyType, businessType);
  const canonicalUrl = `https://nrpaus.com.au/${slug}`;

  return {
    slug,
    title,
    metaDescription,
    h1Title,
    content,
    schemaMarkup,
    canonicalUrl,
  };
}