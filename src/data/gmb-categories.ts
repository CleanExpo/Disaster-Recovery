/**
 * Google My Business (GMB) Categories for Disaster Recovery Services
 * These are the primary and secondary categories that maximize SEO visibility
 * Each category represents a pillar page for optimal search engine coverage
 */

export interface GMBCategory {
  id: string;
  name: string;
  slug: string;
  primary: boolean;
  description: string;
  keywords: string[];
  services: string[];
  schema: {
    '@type': string;
    additionalType?: string;
  };
  locations?: string[]; // For location-specific optimization
}

export const GMB_CATEGORIES: GMBCategory[] = [
  // PRIMARY CATEGORIES
  {
    id: 'water-damage-restoration',
    name: 'Water Damage Restoration Service',
    slug: 'water-damage-restoration',
    primary: true,
    description: 'Professional water damage restoration and flood recovery services available 24/7 across Australia',
    keywords: [
      'water damage restoration',
      'flood damage repair',
      'water extraction services',
      'moisture removal',
      'emergency water damage',
      'burst pipe repair',
      'ceiling water damage',
      'basement flooding'
    ],
    services: [
      'Emergency Water Extraction',
      'Structural Drying',
      'Dehumidification',
      'Moisture Detection',
      'Content Restoration',
      'Sewage Cleanup',
      'Category 3 Water Damage'
    ],
    schema: {
      '@type': 'ProfessionalService',
      additionalType: 'EmergencyService'
    }
  },
  {
    id: 'fire-damage-restoration',
    name: 'Fire Damage Restoration Service',
    slug: 'fire-damage-restoration',
    primary: true,
    description: 'Complete fire and smoke damage restoration services for residential and commercial properties',
    keywords: [
      'fire damage restoration',
      'smoke damage cleanup',
      'soot removal',
      'fire damage repair',
      'bushfire restoration',
      'odor removal',
      'thermal fogging',
      'content cleaning'
    ],
    services: [
      'Emergency Board-Up',
      'Soot & Smoke Removal',
      'Odor Elimination',
      'Structural Cleaning',
      'Content Restoration',
      'HVAC Cleaning',
      'Reconstruction Services'
    ],
    schema: {
      '@type': 'ProfessionalService',
      additionalType: 'EmergencyService'
    }
  },
  {
    id: 'damage-restoration',
    name: 'Damage Restoration Service',
    slug: 'damage-restoration',
    primary: true,
    description: 'Comprehensive property damage restoration services for all disaster types',
    keywords: [
      'damage restoration',
      'property restoration',
      'disaster recovery',
      'emergency restoration',
      'storm damage repair',
      'structural restoration',
      'insurance restoration',
      'commercial restoration'
    ],
    services: [
      'Property Assessment',
      'Emergency Mitigation',
      'Structural Repairs',
      'Content Restoration',
      'Documentation Services',
      'Insurance Coordination',
      'Full Reconstruction'
    ],
    schema: {
      '@type': 'ProfessionalService',
      additionalType: 'EmergencyService'
    }
  },

  // SECONDARY CATEGORIES
  {
    id: 'mold-remediation',
    name: 'Mold Remediation Service',
    slug: 'mold-remediation',
    primary: false,
    description: 'Professional mold removal and remediation services with certified technicians',
    keywords: [
      'mold remediation',
      'mould removal',
      'black mold removal',
      'mold inspection',
      'mold testing',
      'air quality testing',
      'fungal remediation',
      'moisture control'
    ],
    services: [
      'Mold Inspection',
      'Air Quality Testing',
      'Containment Setup',
      'HEPA Filtration',
      'Mold Removal',
      'Antimicrobial Treatment',
      'Prevention Services'
    ],
    schema: {
      '@type': 'ProfessionalService',
      additionalType: 'HealthAndSafetyBusiness'
    }
  },
  {
    id: 'biohazard-cleanup',
    name: 'Biohazard Cleanup Service',
    slug: 'biohazard-cleanup',
    primary: false,
    description: 'Certified biohazard and trauma scene cleanup services',
    keywords: [
      'biohazard cleanup',
      'trauma scene cleaning',
      'crime scene cleanup',
      'hoarding cleanup',
      'infectious disease cleanup',
      'chemical spill cleanup',
      'hazmat cleanup',
      'death cleanup'
    ],
    services: [
      'Trauma Scene Cleanup',
      'Infectious Disease Decontamination',
      'Chemical Spill Response',
      'Hoarding Cleanup',
      'Odor Removal',
      'Disinfection Services',
      'Waste Disposal'
    ],
    schema: {
      '@type': 'ProfessionalService',
      additionalType: 'EmergencyService'
    }
  },
  {
    id: 'storm-damage-restoration',
    name: 'Storm Damage Restoration Service',
    slug: 'storm-damage-restoration',
    primary: false,
    description: 'Emergency storm and natural disaster damage restoration',
    keywords: [
      'storm damage restoration',
      'cyclone damage repair',
      'hail damage restoration',
      'wind damage repair',
      'tree damage cleanup',
      'roof tarping',
      'emergency board up',
      'debris removal'
    ],
    services: [
      'Emergency Tarping',
      'Board-Up Services',
      'Tree Removal',
      'Debris Cleanup',
      'Roof Repairs',
      'Window Replacement',
      'Structural Stabilization'
    ],
    schema: {
      '@type': 'ProfessionalService',
      additionalType: 'EmergencyService'
    }
  },
  {
    id: 'sewage-cleanup',
    name: 'Sewage Cleanup Service',
    slug: 'sewage-cleanup',
    primary: false,
    description: 'Professional sewage backup and contamination cleanup services',
    keywords: [
      'sewage cleanup',
      'sewage backup',
      'black water cleanup',
      'septic overflow',
      'contaminated water removal',
      'category 3 water',
      'toilet overflow cleanup',
      'drain backup'
    ],
    services: [
      'Sewage Extraction',
      'Contamination Removal',
      'Sanitization',
      'Deodorization',
      'Structural Drying',
      'Content Disposal',
      'Health Safety Protocols'
    ],
    schema: {
      '@type': 'ProfessionalService',
      additionalType: 'EmergencyService'
    }
  },
  {
    id: 'carpet-cleaning',
    name: 'Carpet Cleaning Service',
    slug: 'carpet-cleaning',
    primary: false,
    description: 'Professional carpet and upholstery cleaning and restoration',
    keywords: [
      'carpet cleaning',
      'carpet restoration',
      'upholstery cleaning',
      'rug cleaning',
      'steam cleaning',
      'stain removal',
      'pet odor removal',
      'flood carpet drying'
    ],
    services: [
      'Hot Water Extraction',
      'Steam Cleaning',
      'Stain Treatment',
      'Odor Elimination',
      'Carpet Drying',
      'Upholstery Cleaning',
      'Area Rug Cleaning'
    ],
    schema: {
      '@type': 'ProfessionalService',
      additionalType: 'HomeAndConstructionBusiness'
    }
  },
  {
    id: 'emergency-response',
    name: 'Emergency Response Service',
    slug: 'emergency-response',
    primary: false,
    description: '24/7 emergency disaster response and mitigation services',
    keywords: [
      'emergency response',
      '24 hour emergency service',
      'disaster response',
      'emergency mitigation',
      'rapid response team',
      'emergency restoration',
      'after hours service',
      'immediate response'
    ],
    services: [
      '24/7 Response',
      'Emergency Assessment',
      'Immediate Mitigation',
      'Emergency Power',
      'Temporary Repairs',
      'Security Services',
      'Emergency Documentation'
    ],
    schema: {
      '@type': 'EmergencyService',
      additionalType: 'ProfessionalService'
    }
  },
  {
    id: 'commercial-cleaning',
    name: 'Commercial Cleaning Service',
    slug: 'commercial-cleaning',
    primary: false,
    description: 'Commercial and industrial property restoration and cleaning',
    keywords: [
      'commercial cleaning',
      'industrial cleaning',
      'office restoration',
      'warehouse cleanup',
      'factory restoration',
      'retail restoration',
      'hospital cleaning',
      'school restoration'
    ],
    services: [
      'Large Loss Response',
      'Industrial Cleaning',
      'Equipment Restoration',
      'Document Drying',
      'Electronics Restoration',
      'Inventory Management',
      'Business Continuity'
    ],
    schema: {
      '@type': 'ProfessionalService',
      additionalType: 'LocalBusiness'
    }
  },
  {
    id: 'building-restoration',
    name: 'Building Restoration Service',
    slug: 'building-restoration',
    primary: false,
    description: 'Complete building and structural restoration services',
    keywords: [
      'building restoration',
      'structural restoration',
      'reconstruction services',
      'building repairs',
      'renovation services',
      'heritage restoration',
      'facade restoration',
      'foundation repair'
    ],
    services: [
      'Structural Assessment',
      'Foundation Repairs',
      'Framing Restoration',
      'Roofing Services',
      'Exterior Restoration',
      'Interior Reconstruction',
      'Code Compliance'
    ],
    schema: {
      '@type': 'ProfessionalService',
      additionalType: 'HomeAndConstructionBusiness'
    }
  },
  {
    id: 'insurance-restoration',
    name: 'Insurance Restoration Contractor',
    slug: 'insurance-restoration',
    primary: false,
    description: 'Insurance approved restoration contractor services',
    keywords: [
      'insurance restoration',
      'insurance contractor',
      'claims restoration',
      'insurance approved',
      'preferred vendor',
      'insurance repairs',
      'claim documentation',
      'insurance coordination'
    ],
    services: [
      'Claims Documentation',
      'Scope Writing',
      'Insurance Coordination',
      'Direct Billing',
      'Adjuster Meeting',
      'Claim Advocacy',
      'Warranty Services'
    ],
    schema: {
      '@type': 'ProfessionalService',
      additionalType: 'LocalBusiness'
    }
  }
];

// Helper function to get primary categories
export const getPrimaryCategories = () => 
  GMB_CATEGORIES.filter(cat => cat.primary);

// Helper function to get secondary categories
export const getSecondaryCategories = () => 
  GMB_CATEGORIES.filter(cat => !cat.primary);

// Helper function to get category by slug
export const getCategoryBySlug = (slug: string) => 
  GMB_CATEGORIES.find(cat => cat.slug === slug);

// Helper function to generate location-specific categories
export const generateLocationCategories = (location: string) => {
  return GMB_CATEGORIES.map(category => ({
    ...category,
    name: `${category.name} ${location}`,
    slug: `${category.slug}-${location.toLowerCase().replace(/\s+/g, '-')}`,
    keywords: category.keywords.map(kw => `${kw} ${location}`),
    locations: [location]
  }));
};

// SEO-optimized title generators
export const generateCategoryTitle = (category: GMBCategory, location?: string) => {
  const baseTitle = category.name.replace(' Service', '');
  if (location) {
    return `${baseTitle} ${location} | 24/7 Emergency Response`;
  }
  return `${baseTitle} Australia | Disaster Recovery Services`;
};

// Meta description generators
export const generateCategoryDescription = (category: GMBCategory, location?: string) => {
  const locationText = location ? `in ${location}` : 'across Australia';
  return `Professional ${category.name.toLowerCase()} ${locationText}. 24/7 emergency response, insurance approved contractors, free quotes. Call now for immediate assistance.`;
};

// Schema markup generator
export const generateCategorySchema = (category: GMBCategory, location?: string) => {
  return {
    '@context': 'https://schema.org',
    '@type': category.schema['@type'],
    name: generateCategoryTitle(category, location),
    description: category.description,
    url: `https://disasterrecovery.com.au/services/${category.slug}${location ? `/${location.toLowerCase().replace(/\s+/g, '-')}` : ''}`,
    areaServed: location || 'Australia',
    availableChannel: {
      '@type': 'ServiceChannel',
      serviceUrl: 'https://disasterrecovery.com.au',
      servicePhone: '24/7 Emergency Line',
      availableLanguage: 'English'
    },
    provider: {
      '@type': 'Organization',
      name: 'Disaster Recovery',
      url: 'https://disasterrecovery.com.au'
    },
    serviceType: category.services,
    additionalType: category.schema.additionalType
  };
};