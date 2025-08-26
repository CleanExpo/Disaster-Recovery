/**
 * Events and Claims Image Gallery Database
 * Professional photo documentation of disaster recovery projects and claims
 */

export interface EventImage {
  id: string;
  url: string;
  thumbnail: string;
  caption: string;
  category: string;
  tags: string[];
}

export interface DisasterEvent {
  id: string;
  title: string;
  date: string;
  location: string;
  type: 'flood' | 'fire' | 'storm' | 'mould' | 'biohazard' | 'other';
  severity: 'minor' | 'moderate' | 'severe' | 'catastrophic';
  description: string;
  summary: string;
  images: EventImage[];
  beforeAfter: {
    before: string;
    after: string;
    description: string;
  }[];
  statistics: {
    label: string;
    value: string | number;
  }[];
  equipment: string[];
  duration: string;
  outcome: string;
  testimonial?: {
    quote: string;
    author: string;
    role: string;
  };
}

export const disasterEvents: DisasterEvent[] = [
  {
    id: 'brisbane-floods-2022',
    title: '2022 Brisbane Floods Recovery',
    date: 'February 2022',
    location: 'Brisbane, Queensland',
    type: 'flood',
    severity: 'catastrophic',
    description: 'Major flood event affecting thousands of homes and businesses across Greater Brisbane',
    summary: 'Our team responded to the devastating 2022 Brisbane floods, providing emergency water extraction, structural drying, and mould remediation services to over 500 properties. Working around the clock, we helped families and businesses recover from one of the worst flood events in Brisbane\'s history.',
    images: [
      {
        id: 'bf-1',
        url: '/images/events/brisbane-floods-2022/overview.jpg',
        thumbnail: '/images/events/brisbane-floods-2022/overview-thumb.jpg',
        caption: 'Aerial view of flooded Brisbane suburbs',
        category: 'overview',
        tags: ['flood', 'brisbane', '2022', 'aerial']
      },
      {
        id: 'bf-2',
        url: '/images/events/brisbane-floods-2022/response-team.jpg',
        thumbnail: '/images/events/brisbane-floods-2022/response-team-thumb.jpg',
        caption: 'Our emergency response team deploying equipment',
        category: 'response',
        tags: ['team', 'equipment', 'emergency']
      },
      {
        id: 'bf-3',
        url: '/images/events/brisbane-floods-2022/water-extraction.jpg',
        thumbnail: '/images/events/brisbane-floods-2022/water-extraction-thumb.jpg',
        caption: 'Industrial water extraction in progress',
        category: 'restoration',
        tags: ['extraction', 'equipment', 'restoration']
      },
      {
        id: 'bf-4',
        url: '/images/events/brisbane-floods-2022/drying-equipment.jpg',
        thumbnail: '/images/events/brisbane-floods-2022/drying-equipment-thumb.jpg',
        caption: 'Industrial dehumidifiers and air movers deployed',
        category: 'equipment',
        tags: ['drying', 'dehumidifiers', 'restoration']
      }
    ],
    beforeAfter: [
      {
        before: '/images/events/brisbane-floods-2022/home-before.jpg',
        after: '/images/events/brisbane-floods-2022/home-after.jpg',
        description: 'Complete restoration of flood-damaged family home in Rocklea'
      },
      {
        before: '/images/events/brisbane-floods-2022/business-before.jpg',
        after: '/images/events/brisbane-floods-2022/business-after.jpg',
        description: 'Commercial property restoration in West End'
      }
    ],
    statistics: [
      { label: 'Properties Restored', value: '500+' },
      { label: 'Response Time', value: '< 2 hours' },
      { label: 'Team Members Deployed', value: 75 },
      { label: 'Equipment Units Used', value: 300 },
      { label: 'Water Extracted', value: '2.5 million litres' }
    ],
    equipment: [
      'Industrial water extractors',
      'LGR dehumidifiers',
      'Air scrubbers',
      'Thermal imaging cameras',
      'Moisture meters'
    ],
    duration: '3 months',
    outcome: 'Successfully restored over 500 properties to pre-flood condition, helping families and businesses recover from catastrophic flooding.',
    testimonial: {
      quote: 'When the floods hit, we thought we\'d lost everything. The Disaster Recovery team arrived within hours and worked tirelessly to save our home. Their professionalism and compassion during such a difficult time was extraordinary.',
      author: 'Sarah Mitchell',
      role: 'Homeowner, Rocklea'
    }
  },
  {
    id: 'gold-coast-apartment-fire-2023',
    title: 'Gold Coast High-Rise Fire Restoration',
    date: 'March 2023',
    location: 'Gold Coast, Queensland',
    type: 'fire',
    severity: 'severe',
    description: 'Major fire damage restoration in luxury apartment complex',
    summary: 'A devastating fire in a Gold Coast high-rise apartment building affected 12 units across 3 floors. Our team provided comprehensive fire and smoke damage restoration, including structural cleaning, odor removal, and content restoration.',
    images: [
      {
        id: 'gcf-1',
        url: '/images/events/gold-coast-fire-2023/fire-damage.jpg',
        thumbnail: '/images/events/gold-coast-fire-2023/fire-damage-thumb.jpg',
        caption: 'Initial fire damage assessment',
        category: 'damage',
        tags: ['fire', 'damage', 'assessment']
      },
      {
        id: 'gcf-2',
        url: '/images/events/gold-coast-fire-2023/smoke-cleaning.jpg',
        thumbnail: '/images/events/gold-coast-fire-2023/smoke-cleaning-thumb.jpg',
        caption: 'Smoke damage cleaning in progress',
        category: 'restoration',
        tags: ['smoke', 'cleaning', 'restoration']
      },
      {
        id: 'gcf-3',
        url: '/images/events/gold-coast-fire-2023/hydroxyl-generators.jpg',
        thumbnail: '/images/events/gold-coast-fire-2023/hydroxyl-generators-thumb.jpg',
        caption: 'Hydroxyl generators eliminating smoke odors',
        category: 'equipment',
        tags: ['hydroxyl', 'odor', 'equipment']
      }
    ],
    beforeAfter: [
      {
        before: '/images/events/gold-coast-fire-2023/apartment-before.jpg',
        after: '/images/events/gold-coast-fire-2023/apartment-after.jpg',
        description: 'Complete restoration of fire-damaged luxury apartment'
      }
    ],
    statistics: [
      { label: 'Units Restored', value: 12 },
      { label: 'Square Meters Cleaned', value: '2,400' },
      { label: 'Completion Time', value: '6 weeks' },
      { label: 'Items Restored', value: '450+' }
    ],
    equipment: [
      'Hydroxyl generators',
      'HEPA air scrubbers',
      'Ultrasonic cleaning systems',
      'Thermal foggers',
      'Ozone generators'
    ],
    duration: '6 weeks',
    outcome: 'All 12 affected apartments were fully restored, with smoke odors completely eliminated and all salvageable contents professionally cleaned and restored.',
    testimonial: {
      quote: 'The fire was devastating, but the restoration team gave us hope. They saved so many of our belongings we thought were lost forever.',
      author: 'Michael Chen',
      role: 'Apartment Owner'
    }
  },
  {
    id: 'townsville-cyclone-damage-2023',
    title: 'Cyclone Kirrily Recovery Operations',
    date: 'January 2024',
    location: 'Townsville, Queensland',
    type: 'storm',
    severity: 'severe',
    description: 'Emergency response to cyclone damage across Townsville region',
    summary: 'Following Cyclone Kirrily, our teams mobilized to assist with water damage restoration, structural drying, and emergency repairs across the Townsville region. We deployed specialized equipment and crews to help the community recover quickly.',
    images: [
      {
        id: 'tc-1',
        url: '/images/events/townsville-cyclone-2024/storm-damage.jpg',
        thumbnail: '/images/events/townsville-cyclone-2024/storm-damage-thumb.jpg',
        caption: 'Cyclone damage to residential properties',
        category: 'damage',
        tags: ['cyclone', 'storm', 'damage']
      },
      {
        id: 'tc-2',
        url: '/images/events/townsville-cyclone-2024/emergency-tarping.jpg',
        thumbnail: '/images/events/townsville-cyclone-2024/emergency-tarping-thumb.jpg',
        caption: 'Emergency roof tarping to prevent further damage',
        category: 'emergency',
        tags: ['emergency', 'tarping', 'prevention']
      },
      {
        id: 'tc-3',
        url: '/images/events/townsville-cyclone-2024/water-damage.jpg',
        thumbnail: '/images/events/townsville-cyclone-2024/water-damage-thumb.jpg',
        caption: 'Water extraction from cyclone-damaged home',
        category: 'restoration',
        tags: ['water', 'extraction', 'restoration']
      }
    ],
    beforeAfter: [
      {
        before: '/images/events/townsville-cyclone-2024/house-before.jpg',
        after: '/images/events/townsville-cyclone-2024/house-after.jpg',
        description: 'Storm-damaged home fully restored'
      }
    ],
    statistics: [
      { label: 'Properties Serviced', value: 150 },
      { label: 'Emergency Callouts', value: 85 },
      { label: 'Response Teams', value: 12 },
      { label: 'Recovery Duration', value: '8 weeks' }
    ],
    equipment: [
      'Emergency generators',
      'Industrial water pumps',
      'Structural drying systems',
      'Emergency tarping materials',
      'Debris removal equipment'
    ],
    duration: '8 weeks',
    outcome: 'Rapid response and recovery operations helped 150+ families return to their homes safely after cyclone damage.',
    testimonial: {
      quote: 'The team arrived so quickly after the cyclone. Their emergency response saved our home from further damage.',
      author: 'James Wilson',
      role: 'Townsville Resident'
    }
  },
  {
    id: 'sunshine-coast-mould-outbreak-2023',
    title: 'Sunshine Coast Mould Remediation Project',
    date: 'July 2023',
    location: 'Sunshine Coast, Queensland',
    type: 'mould',
    severity: 'moderate',
    description: 'Large-scale mould remediation following extended wet weather',
    summary: 'Extended periods of wet weather led to widespread mould issues across the Sunshine Coast. Our specialized mould remediation teams treated over 200 properties using advanced techniques and equipment.',
    images: [
      {
        id: 'scm-1',
        url: '/images/events/sunshine-coast-mould-2023/mould-inspection.jpg',
        thumbnail: '/images/events/sunshine-coast-mould-2023/mould-inspection-thumb.jpg',
        caption: 'Initial mould inspection using thermal imaging',
        category: 'inspection',
        tags: ['mould', 'inspection', 'thermal']
      },
      {
        id: 'scm-2',
        url: '/images/events/sunshine-coast-mould-2023/remediation.jpg',
        thumbnail: '/images/events/sunshine-coast-mould-2023/remediation-thumb.jpg',
        caption: 'Professional mould remediation in progress',
        category: 'remediation',
        tags: ['mould', 'remediation', 'cleaning']
      },
      {
        id: 'scm-3',
        url: '/images/events/sunshine-coast-mould-2023/air-testing.jpg',
        thumbnail: '/images/events/sunshine-coast-mould-2023/air-testing-thumb.jpg',
        caption: 'Post-remediation air quality testing',
        category: 'testing',
        tags: ['air quality', 'testing', 'verification']
      }
    ],
    beforeAfter: [
      {
        before: '/images/events/sunshine-coast-mould-2023/bathroom-before.jpg',
        after: '/images/events/sunshine-coast-mould-2023/bathroom-after.jpg',
        description: 'Bathroom mould remediation and restoration'
      },
      {
        before: '/images/events/sunshine-coast-mould-2023/bedroom-before.jpg',
        after: '/images/events/sunshine-coast-mould-2023/bedroom-after.jpg',
        description: 'Bedroom ceiling mould treatment'
      }
    ],
    statistics: [
      { label: 'Properties Treated', value: 200 },
      { label: 'Mould Specialists Deployed', value: 25 },
      { label: 'Air Quality Tests', value: 400 },
      { label: 'Success Rate', value: '99.5%' }
    ],
    equipment: [
      'HEPA air scrubbers',
      'Negative air machines',
      'Antimicrobial foggers',
      'Moisture meters',
      'Air quality monitors'
    ],
    duration: '3 months',
    outcome: 'Successfully remediated mould from 200+ properties, restoring healthy indoor air quality for affected families.',
    testimonial: {
      quote: 'The mould was affecting our health. The team not only removed it completely but also educated us on prevention. Exceptional service!',
      author: 'Lisa Thompson',
      role: 'Homeowner, Buderim'
    }
  },
  {
    id: 'logan-sewage-overflow-2023',
    title: 'Logan Sewage Contamination Emergency',
    date: 'September 2023',
    location: 'Logan, Queensland',
    type: 'biohazard',
    severity: 'severe',
    description: 'Emergency biohazard cleanup following major sewage system failure',
    summary: 'A major sewage system failure in Logan resulted in contamination of 30 residential properties. Our biohazard team provided emergency response, decontamination, and restoration services.',
    images: [
      {
        id: 'ls-1',
        url: '/images/events/logan-sewage-2023/hazmat-team.jpg',
        thumbnail: '/images/events/logan-sewage-2023/hazmat-team-thumb.jpg',
        caption: 'Biohazard team in full PPE responding to emergency',
        category: 'response',
        tags: ['biohazard', 'sewage', 'emergency']
      },
      {
        id: 'ls-2',
        url: '/images/events/logan-sewage-2023/decontamination.jpg',
        thumbnail: '/images/events/logan-sewage-2023/decontamination-thumb.jpg',
        caption: 'Decontamination process in progress',
        category: 'cleanup',
        tags: ['decontamination', 'cleanup', 'biohazard']
      },
      {
        id: 'ls-3',
        url: '/images/events/logan-sewage-2023/sanitization.jpg',
        thumbnail: '/images/events/logan-sewage-2023/sanitization-thumb.jpg',
        caption: 'Final sanitization and disinfection',
        category: 'sanitization',
        tags: ['sanitization', 'disinfection', 'safety']
      }
    ],
    beforeAfter: [
      {
        before: '/images/events/logan-sewage-2023/contaminated-area.jpg',
        after: '/images/events/logan-sewage-2023/restored-area.jpg',
        description: 'Complete biohazard remediation and restoration'
      }
    ],
    statistics: [
      { label: 'Properties Decontaminated', value: 30 },
      { label: 'Response Time', value: '< 1 hour' },
      { label: 'Contaminated Area', value: '5,000 sq m' },
      { label: 'Safety Incidents', value: 0 }
    ],
    equipment: [
      'Biohazard PPE',
      'Industrial sanitizers',
      'Waste disposal units',
      'Air purification systems',
      'Antimicrobial treatments'
    ],
    duration: '2 weeks',
    outcome: 'All 30 properties were successfully decontaminated and restored to safe, habitable conditions with zero health incidents.',
    testimonial: {
      quote: 'A nightmare situation handled with utmost professionalism. The team made us feel safe throughout the entire process.',
      author: 'David Kumar',
      role: 'Property Manager'
    }
  }
];

// Helper functions for filtering and searching events
export function getEventsByType(type: DisasterEvent['type']): DisasterEvent[] {
  return disasterEvents.filter(event => event.type === type);
}

export function getEventsBySeverity(severity: DisasterEvent['severity']): DisasterEvent[] {
  return disasterEvents.filter(event => event.severity === severity);
}

export function getEventsByLocation(location: string): DisasterEvent[] {
  return disasterEvents.filter(event => 
    event.location.toLowerCase().includes(location.toLowerCase())
  );
}

export function getRecentEvents(limit: number = 3): DisasterEvent[] {
  return disasterEvents.slice(0, limit);
}

export function getEventById(id: string): DisasterEvent | undefined {
  return disasterEvents.find(event => event.id === id);
}

export function getAllEventImages(): EventImage[] {
  return disasterEvents.flatMap(event => event.images);
}

// Claims documentation types
export interface ClaimDocumentation {
  id: string;
  claimNumber: string;
  date: string;
  type: string;
  insurer: string;
  status: 'pending' | 'approved' | 'completed';
  images: {
    before: string[];
    during: string[];
    after: string[];
  };
  documentation: {
    assessmentReport: boolean;
    photographic: boolean;
    invoices: boolean;
    certificates: boolean;
  };
  value: number;
  description: string;
}

export const claimsGallery: ClaimDocumentation[] = [
  {
    id: 'claim-001',
    claimNumber: 'INS-2024-001234',
    date: '2024-01-15',
    type: 'Water Damage',
    insurer: 'RACQ Insurance',
    status: 'completed',
    images: {
      before: [
        '/images/claims/001/before-1.jpg',
        '/images/claims/001/before-2.jpg'
      ],
      during: [
        '/images/claims/001/during-1.jpg',
        '/images/claims/001/during-2.jpg'
      ],
      after: [
        '/images/claims/001/after-1.jpg',
        '/images/claims/001/after-2.jpg'
      ]
    },
    documentation: {
      assessmentReport: true,
      photographic: true,
      invoices: true,
      certificates: true
    },
    value: 45000,
    description: 'Complete water damage restoration including structural drying and mould prevention'
  },
  {
    id: 'claim-002',
    claimNumber: 'INS-2024-002345',
    date: '2024-02-20',
    type: 'Fire Damage',
    insurer: 'Suncorp Insurance',
    status: 'completed',
    images: {
      before: [
        '/images/claims/002/before-1.jpg',
        '/images/claims/002/before-2.jpg'
      ],
      during: [
        '/images/claims/002/during-1.jpg',
        '/images/claims/002/during-2.jpg'
      ],
      after: [
        '/images/claims/002/after-1.jpg',
        '/images/claims/002/after-2.jpg'
      ]
    },
    documentation: {
      assessmentReport: true,
      photographic: true,
      invoices: true,
      certificates: true
    },
    value: 75000,
    description: 'Fire and smoke damage restoration including structural repairs and odor elimination'
  }
];
