// Location-based Service Page Generator for SEO Domination
import { serviceFAQs, defaultServiceFAQs } from '../src/lib/location-content/service-faqs';
import type { SuburbData } from '../data/suburbs/sydney';

export interface LocationServicePage {
  id: string;
  title: string;
  metaTitle: string;
  metaDescription: string;
  h1: string;
  location: LocationData;
  service: ServiceData;
  content: {
    intro: string;
    whyChooseUs: string[];
    serviceAreas: string[];
    emergencyResponse: string;
    localKnowledge: string[];
    commonIssues: string[];
    insurancePartners: string[];
    testimonial?: {
      text: string;
      author: string;
      suburb: string;
    };
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  relatedPages: string[];
  schema: any;
}

export interface LocationData {
  city: string;
  state: string;
  postcode?: string;
  suburb?: string;
  region?: string;
  population?: number;
  coordinates?: {
    lat: number;
    lng: number;
  };
}

export interface ServiceData {
  type: string;
  category: string;
  urgency: 'emergency' | 'urgent' | 'standard';
  keywords: string[];
}

export class LocationServiceGenerator {
  // Major Australian cities and their suburbs
  private static locations = {
    sydney: {
      city: 'Sydney',
      state: 'NSW',
      suburbs: [
        'CBD', 'Bondi', 'Manly', 'Parramatta', 'Chatswood', 'Cronulla',
        'Penrith', 'Liverpool', 'Blacktown', 'Castle Hill', 'Hornsby',
        'Sutherland', 'Bankstown', 'Campbelltown', 'Ryde', 'Hurstville'
      ],
      regions: ['Eastern Suburbs', 'North Shore', 'Northern Beaches', 'Western Sydney', 'Inner West'],
      population: 5300000
    },
    melbourne: {
      city: 'Melbourne',
      state: 'VIC',
      suburbs: [
        'CBD', 'St Kilda', 'South Yarra', 'Richmond', 'Fitzroy', 'Carlton',
        'Camberwell', 'Brighton', 'Footscray', 'Williamstown', 'Frankston',
        'Dandenong', 'Box Hill', 'Glen Waverley', 'Ringwood', 'Geelong'
      ],
      regions: ['Inner East', 'Bayside', 'Western Suburbs', 'Northern Suburbs', 'Mornington Peninsula'],
      population: 5000000
    },
    brisbane: {
      city: 'Brisbane',
      state: 'QLD',
      suburbs: [
        'CBD', 'Fortitude Valley', 'South Bank', 'New Farm', 'Toowong',
        'Indooroopilly', 'Carindale', 'Chermside', 'Cleveland', 'Ipswich',
        'Logan', 'Redcliffe', 'Caboolture', 'Southport', 'Surfers Paradise'
      ],
      regions: ['Inner City', 'Northern Suburbs', 'Southern Suburbs', 'Eastern Suburbs', 'Western Suburbs'],
      population: 2500000
    },
    perth: {
      city: 'Perth',
      state: 'WA',
      suburbs: [
        'CBD', 'Fremantle', 'Subiaco', 'Cottesloe', 'Scarborough', 'Joondalup',
        'Midland', 'Armadale', 'Rockingham', 'Mandurah', 'Claremont', 'Victoria Park'
      ],
      regions: ['Western Suburbs', 'Northern Suburbs', 'Southern Suburbs', 'Eastern Suburbs', 'Coastal'],
      population: 2100000
    },
    adelaide: {
      city: 'Adelaide',
      state: 'SA',
      suburbs: [
        'CBD', 'Glenelg', 'Norwood', 'Unley', 'Burnside', 'Prospect',
        'Port Adelaide', 'Marion', 'Salisbury', 'Tea Tree Gully', 'Modbury'
      ],
      regions: ['City and North Adelaide', 'Eastern Suburbs', 'Western Suburbs', 'Southern Suburbs'],
      population: 1350000
    },
    darwin: {
      city: 'Darwin',
      state: 'NT',
      suburbs: ['CBD', 'Casuarina', 'Palmerston', 'Stuart Park', 'Nightcliff'],
      regions: ['Darwin City', 'Northern Suburbs', 'Palmerston'],
      population: 150000
    },
    hobart: {
      city: 'Hobart',
      state: 'TAS',
      suburbs: ['CBD', 'Sandy Bay', 'Battery Point', 'North Hobart', 'Glenorchy'],
      regions: ['Greater Hobart', 'Eastern Shore', 'Northern Suburbs'],
      population: 240000
    },
    canberra: {
      city: 'Canberra',
      state: 'ACT',
      suburbs: ['CBD', 'Belconnen', 'Woden', 'Tuggeranong', 'Gungahlin'],
      regions: ['Inner North', 'Inner South', 'Woden Valley', 'Belconnen'],
      population: 430000
    },
    newcastle: {
      city: 'Newcastle',
      state: 'NSW',
      suburbs: ['CBD', 'Hamilton', 'Merewether', 'Charlestown', 'Mayfield'],
      regions: ['Newcastle City', 'Lake Macquarie', 'Port Stephens'],
      population: 320000
    },
    wollongong: {
      city: 'Wollongong',
      state: 'NSW',
      suburbs: ['CBD', 'North Wollongong', 'Fairy Meadow', 'Corrimal', 'Figtree'],
      regions: ['Northern Suburbs', 'Southern Suburbs', 'Illawarra'],
      population: 300000
    },
    'gold-coast': {
      city: 'Gold Coast',
      state: 'QLD',
      suburbs: ['Surfers Paradise', 'Broadbeach', 'Burleigh Heads', 'Coolangatta', 'Southport'],
      regions: ['Northern Gold Coast', 'Central Gold Coast', 'Southern Gold Coast'],
      population: 640000
    },
    'sunshine-coast': {
      city: 'Sunshine Coast',
      state: 'QLD',
      suburbs: ['Maroochydore', 'Caloundra', 'Noosa', 'Buderim', 'Kawana'],
      regions: ['Coastal Strip', 'Hinterland', 'Caloundra'],
      population: 330000
    },
    geelong: {
      city: 'Geelong',
      state: 'VIC',
      suburbs: ['CBD', 'Newtown', 'Belmont', 'Corio', 'Lara'],
      regions: ['Geelong City', 'Bellarine Peninsula', 'Northern Suburbs'],
      population: 260000
    },
    townsville: {
      city: 'Townsville',
      state: 'QLD',
      suburbs: ['CBD', 'North Ward', 'Castle Hill', 'Kirwan', 'Thuringowa'],
      regions: ['Townsville City', 'Northern Beaches', 'Thuringowa'],
      population: 195000
    },
    cairns: {
      city: 'Cairns',
      state: 'QLD',
      suburbs: ['CBD', 'Edge Hill', 'Manunda', 'Smithfield', 'Trinity Beach'],
      regions: ['Cairns City', 'Northern Beaches', 'Southern Suburbs'],
      population: 160000
    }
  };

  // Services we offer
  private static services = {
    'water-damage-restoration': {
      type: 'Water Damage Restoration',
      category: 'water',
      urgency: 'emergency',
      keywords: ['water damage', 'flood', 'burst pipe', 'water extraction', 'drying'],
      variations: ['emergency', '24-hour', 'same-day', 'urgent']
    },
    'fire-damage-restoration': {
      type: 'Fire Damage Restoration',
      category: 'fire',
      urgency: 'emergency',
      keywords: ['fire damage', 'smoke damage', 'soot removal', 'fire restoration'],
      variations: ['emergency', 'smoke', 'soot', 'odour removal']
    },
    'mould-remediation': {
      type: 'Mould Remediation',
      category: 'mould',
      urgency: 'urgent',
      keywords: ['mould removal', 'mould remediation', 'black mould', 'mould inspection'],
      variations: ['black-mould', 'toxic-mould', 'inspection', 'testing']
    },
    'storm-damage-repairs': {
      type: 'Storm Damage Repairs',
      category: 'storm',
      urgency: 'emergency',
      keywords: ['storm damage', 'roof damage', 'tree damage', 'emergency tarping'],
      variations: ['roof', 'tree', 'hail', 'wind']
    },
    'flood-recovery': {
      type: 'Flood Recovery',
      category: 'flood',
      urgency: 'emergency',
      keywords: ['flood damage', 'flood restoration', 'flood cleanup', 'water extraction'],
      variations: ['emergency', 'basement', 'commercial', 'residential']
    },
    'emergency-restoration': {
      type: 'Emergency Restoration',
      category: 'emergency',
      urgency: 'emergency',
      keywords: ['24 hour emergency', 'disaster recovery', 'emergency restoration', 'urgent repairs'],
      variations: ['24-hour', 'same-day', 'after-hours', 'weekend']
    }
  };

  // Generate a location-service page
  static generateLocationServicePage(
    locationKey: string,
    serviceKey: string,
    suburb?: string,
    variation?: string,
    suburbData?: SuburbData
  ): LocationServicePage {
    const location = this.locations[locationKey];
    const service = this.services[serviceKey];

    if (!location || !service) {
      throw new Error('Invalid location or service');
    }

    const fullLocation = suburb ? `${suburb}, ${location.city}` : location.city;
    const variationText = variation ? `${variation} ` : '';

    const pageId = `${serviceKey}-${locationKey}${suburb ? `-${suburb.toLowerCase().replace(/\s+/g, '-')}` : ''}`;

    return {
      id: pageId,
      title: `${variationText}${service.type} ${fullLocation} | 24/7 Emergency Response`,
      metaTitle: `${variationText}${service.type} ${fullLocation} | Disaster Recovery`,
      metaDescription: this.generateMetaDescription(service, location, suburb, variation, suburbData),
      h1: `${variationText}${service.type} Services in ${fullLocation}`,
      location: {
        city: location.city,
        state: location.state,
        suburb,
        region: suburb ? this.getRegionForSuburb(location, suburb) : undefined,
        population: suburbData?.population || location.population
      },
      service: {
        type: service.type,
        category: service.category,
        urgency: service.urgency,
        keywords: service.keywords
      },
      content: this.generateContent(service, location, suburb, variation, suburbData),
      faqs: this.generateFAQs(service, location, suburb),
      relatedPages: this.generateRelatedPages(locationKey, serviceKey, suburb),
      schema: this.generateSchema(service, location, suburb)
    };
  }

  private static generateMetaDescription(
    service: any,
    location: any,
    suburb?: string,
    variation?: string,
    suburbData?: SuburbData
  ): string {
    const locationText = suburb ? `${suburb} and surrounding ${location.city} areas` : `${location.city} and all suburbs`;
    const variationText = variation ? `${variation} ` : '';

    // Suburb-specific risk phrase if data available
    if (suburbData) {
      const riskPhrase = this.getRiskPhrase(suburbData, service.category);
      if (riskPhrase) {
        return `${riskPhrase} Professional ${variationText}${service.type.toLowerCase()} in ${locationText}. 24/7 response, IICRC-certified. Submit your claim online.`;
      }
    }

    return `Professional ${variationText}${service.type.toLowerCase()} services in ${locationText}. 24/7 emergency response, IICRC-certified contractors. Submit your claim online for immediate assistance.`;
  }

  // Generate a suburb-specific risk phrase for meta descriptions and intros
  private static getRiskPhrase(suburbData: SuburbData, serviceCategory: string): string | null {
    const { density, riskFactors } = suburbData;

    if (serviceCategory === 'water' || serviceCategory === 'flood') {
      if (riskFactors.includes('flood')) return `${suburbData.name} is in a known flood zone.`;
      if (riskFactors.includes('stormwater-flooding') && density === 'high') return `High-density ${suburbData.name} faces stormwater flooding risks.`;
      if (density === 'high') return `${suburbData.name}'s high-density apartments need fast water extraction.`;
    }
    if (serviceCategory === 'fire' && riskFactors.includes('bushfire')) {
      return `${suburbData.name} is in a bushfire-prone zone.`;
    }
    if (serviceCategory === 'storm' && riskFactors.includes('storm-damage')) {
      return `${suburbData.name} is exposed to severe storm damage.`;
    }
    if (serviceCategory === 'mould') {
      if (riskFactors.includes('water-damage') || riskFactors.includes('stormwater-flooding')) {
        return `Damp conditions in ${suburbData.name} make mould a persistent risk.`;
      }
    }
    return null;
  }

  private static generateContent(
    service: any,
    location: any,
    suburb?: string,
    variation?: string,
    suburbData?: SuburbData
  ) {
    const locationText = suburb || location.city;

    return {
      intro: this.generateIntro(service, location, suburb, suburbData),

      whyChooseUs: this.generateWhyChooseUs(locationText, suburbData),

      serviceAreas: suburb
        ? this.getNearbySuburbs(location, suburb)
        : location.suburbs.slice(0, 10),

      emergencyResponse: this.generateEmergencyResponse(service, location, suburb, suburbData),

      localKnowledge: this.generateLocalKnowledge(service, location, suburb, suburbData),

      commonIssues: this.generateCommonIssues(service, location, suburb, suburbData),

      insurancePartners: [
        'AAMI', 'Suncorp', 'Allianz', 'NRMA', 'QBE', 'CGU',
        'Budget Direct', 'Youi', 'RACQ', 'CommInsure'
      ],

      testimonial: this.generateTestimonial(service, location, suburb)
    };
  }

  // Generate a unique intro paragraph using suburb data
  private static generateIntro(service: any, location: any, suburb?: string, suburbData?: SuburbData): string {
    const locationText = suburb || location.city;

    // If no suburb data, use the standard template
    if (!suburbData || !suburb) {
      return `When disaster strikes in ${locationText}, you need immediate, professional ${service.type.toLowerCase()} services. Our ${location.city}-based emergency response team is available 24/7, with typical response times of 30-60 minutes throughout Greater ${location.city}.`;
    }

    // Build a unique intro from suburb data
    const { population, density, riskFactors, notes } = suburbData;
    const parts: string[] = [];

    // Opening — density-aware
    if (density === 'high') {
      parts.push(`${suburb} is one of ${location.city}'s most densely populated areas${population ? `, home to over ${population.toLocaleString()} residents` : ''}. In high-density living, ${service.type.toLowerCase()} emergencies demand rapid professional response to prevent damage spreading to neighbouring units and common areas.`);
    } else if (density === 'low' && riskFactors.includes('flood')) {
      parts.push(`${suburb} sits within a known flood-prone zone${population ? `, with a community of ${population.toLocaleString()} residents` : ''}. When floodwaters threaten, fast ${service.type.toLowerCase()} response is critical to protect homes and reduce long-term damage.`);
    } else if (density === 'low' && riskFactors.includes('bushfire')) {
      parts.push(`${suburb} borders bushland that places residents at elevated fire risk${population ? `, with ${population.toLocaleString()} people in the area` : ''}. After fire or ember attack, professional ${service.type.toLowerCase()} is essential to make properties safe.`);
    } else {
      parts.push(`${suburb}${population ? `, home to ${population.toLocaleString()} residents` : ''}, is a key ${location.city} suburb where ${service.type.toLowerCase()} emergencies require fast, local expertise.`);
    }

    // Context from notes — extract a key fact
    if (notes) {
      const noteFact = this.extractNoteFact(notes, suburb);
      if (noteFact) {
        parts.push(noteFact);
      }
    }

    // Closing — service promise
    parts.push(`Our ${location.city}-based team responds 24/7, typically reaching ${suburb} and nearby suburbs within 30-60 minutes.`);

    return parts.join(' ');
  }

  // Extract a useful fact from the suburb notes field
  private static extractNoteFact(notes: string, suburb: string): string | null {
    // Split notes by period/sentence and pick the most descriptive one
    const sentences = notes.split(/\.\s+/).filter(s => s.length > 15);
    if (sentences.length === 0) return null;

    // Prefer sentences with specific data (percentages, years, measurements)
    const dataRich = sentences.find(s => /\d{4}|\d+%|\d+mm|\d+,\d+|km²/.test(s));
    if (dataRich) return dataRich.endsWith('.') ? dataRich : `${dataRich}.`;

    // Otherwise use the first substantive sentence
    const first = sentences[0];
    return first.endsWith('.') ? first : `${first}.`;
  }

  // Generate unique "Why Choose Us" bullets with suburb context
  private static generateWhyChooseUs(locationText: string, suburbData?: SuburbData): string[] {
    const base = [
      `Local ${locationText} team with deep knowledge of the area`,
      'Average 45-minute emergency response time',
      'Full claims documentation for all major insurers',
      'IICRC certified technicians',
      '100% satisfaction guarantee',
      'Transparent pricing — we bill you directly',
      'Payment plans available via Blue Fire Finance'
    ];

    // Add a suburb-specific bullet if data available
    if (suburbData) {
      if (suburbData.density === 'high') {
        base[0] = `Experienced with ${locationText}'s high-density apartments and multi-storey buildings`;
      } else if (suburbData.riskFactors.includes('flood')) {
        base[0] = `Specialist flood recovery expertise for ${locationText}'s flood-prone area`;
      } else if (suburbData.riskFactors.includes('bushfire')) {
        base[0] = `Bushfire damage specialists familiar with ${locationText}'s fire-prone surrounds`;
      }
    }

    return base;
  }

  // Generate unique emergency response section
  private static generateEmergencyResponse(service: any, location: any, suburb?: string, suburbData?: SuburbData): string {
    const locationText = suburb || location.city;

    if (!suburbData || !suburb) {
      return `Our ${locationText} rapid response team is strategically positioned to reach any location within ${location.city} within 60 minutes. We maintain fully equipped vehicles throughout ${location.city} to ensure the fastest possible response to your ${service.type.toLowerCase()} emergency.`;
    }

    // Density-aware response messaging
    if (suburbData.density === 'high') {
      return `In ${suburb}'s high-density environment, ${service.type.toLowerCase()} emergencies can escalate rapidly through shared walls and common areas. Our ${location.city} team carries specialist equipment for apartment buildings and high-rises, typically arriving within 30-60 minutes. We coordinate with strata managers and body corporates to minimise disruption.`;
    }

    if (suburbData.riskFactors.includes('flood')) {
      return `${suburb} is in a flood-affected zone, so our ${location.city} team maintains dedicated flood recovery equipment ready for rapid deployment. We typically reach ${suburb} and surrounding areas within 30-60 minutes and begin water extraction immediately to prevent secondary damage like mould growth.`;
    }

    if (suburbData.riskFactors.includes('bushfire')) {
      return `Given ${suburb}'s proximity to bushland, our ${location.city} team is equipped for post-fire and ember attack recovery. We reach ${suburb} within 30-60 minutes and can begin make-safe operations, smoke damage assessment, and structural drying immediately.`;
    }

    return `Our ${location.city} rapid response team is positioned to reach ${suburb} and surrounding areas within 30-60 minutes. Fully equipped vehicles are deployed across ${location.city} to ensure the fastest response to your ${service.type.toLowerCase()} emergency.`;
  }

  private static generateLocalKnowledge(service: any, location: any, suburb?: string, suburbData?: SuburbData): string[] {
    const knowledge: string[] = [];

    // City-level knowledge
    if (location.city === 'Sydney') {
      knowledge.push('Understanding of Sydney\'s unique weather patterns and storm seasons');
      knowledge.push('Familiarity with heritage building requirements in older suburbs');
      knowledge.push('Knowledge of Sydney Water infrastructure and common issues');
    } else if (location.city === 'Brisbane') {
      knowledge.push('Experience with Queensland\'s subtropical climate challenges');
      knowledge.push('Understanding of storm season and flooding patterns');
      knowledge.push('Expertise in dealing with high humidity and mould issues');
    } else if (location.city === 'Melbourne') {
      knowledge.push('Experience with Melbourne\'s variable weather conditions');
      knowledge.push('Understanding of Victorian building codes and regulations');
      knowledge.push('Knowledge of local drainage and flooding hotspots');
    } else if (location.city === 'Perth') {
      knowledge.push('Experience with Western Australia\'s hot, dry climate and sudden storm events');
      knowledge.push('Knowledge of Perth\'s sandy soils and drainage challenges');
    } else if (location.city === 'Adelaide') {
      knowledge.push('Understanding of South Australia\'s Adelaide Hills bushfire corridor');
      knowledge.push('Experience with Adelaide\'s ageing stormwater infrastructure');
    } else if (location.city === 'Darwin') {
      knowledge.push('Expertise in tropical cyclone damage recovery');
      knowledge.push('Understanding of monsoon season flooding patterns in the Top End');
    } else if (location.city === 'Cairns') {
      knowledge.push('Specialist cyclone and tropical storm recovery experience');
      knowledge.push('Understanding of Far North Queensland\'s high-humidity mould risks');
    }

    // Suburb-specific knowledge from data
    if (suburbData && suburb) {
      if (suburbData.density === 'high') {
        knowledge.push(`Experience with ${suburb}'s high-density apartment buildings and strata properties`);
      }
      if (suburbData.riskFactors.includes('flood')) {
        knowledge.push(`Knowledge of ${suburb}'s flood catchment zones and drainage infrastructure`);
      }
      if (suburbData.riskFactors.includes('bushfire')) {
        knowledge.push(`Familiarity with ${suburb}'s bushfire attack levels and ember protection needs`);
      }
      if (suburbData.riskFactors.includes('stormwater-flooding')) {
        knowledge.push(`Understanding of ${suburb}'s stormwater systems and flash flood risk areas`);
      }
    } else if (suburb) {
      knowledge.push(`Specific knowledge of ${suburb} property types and common issues`);
    }

    return knowledge;
  }

  private static generateCommonIssues(service: any, location: any, suburb?: string, suburbData?: SuburbData): string[] {
    const issues: string[] = [];

    // Base service-category issues
    switch (service.category) {
      case 'water':
        issues.push('Burst pipes from aging infrastructure');
        issues.push('Storm water ingress during heavy rainfall');
        issues.push('Blocked drains and sewage backup');
        issues.push('Roof leaks from damaged tiles');
        break;
      case 'fire':
        issues.push('Kitchen fires from cooking accidents');
        issues.push('Electrical fires in older properties');
        issues.push('Smoke damage from neighbouring properties');
        break;
      case 'storm':
        issues.push('Roof damage from fallen trees');
        issues.push('Window damage from hail');
        issues.push('Flooding from blocked gutters');
        break;
      case 'mould':
        issues.push('Bathroom mould from poor ventilation');
        issues.push('Rising damp in older properties');
        issues.push('Hidden mould in wall cavities');
        break;
    }

    // Suburb-specific issues based on risk factors and density
    if (suburbData && suburb) {
      if (suburbData.density === 'high' && service.category === 'water') {
        issues.push(`Water damage spreading between units in ${suburb}'s apartment complexes`);
        issues.push('Failed waterproofing membranes in high-rise bathrooms and balconies');
      }
      if (suburbData.riskFactors.includes('flood') && (service.category === 'water' || service.category === 'flood')) {
        issues.push(`Riverine flooding in ${suburb}'s flood-prone catchment zones`);
      }
      if (suburbData.riskFactors.includes('stormwater-flooding')) {
        issues.push(`Stormwater system overflows during intense rainfall events in ${suburb}`);
      }
      if (suburbData.riskFactors.includes('bushfire') && service.category === 'fire') {
        issues.push(`Ember attack from nearby bushland threatening ${suburb} properties`);
        issues.push('Radiant heat damage to external surfaces and fencing');
      }
      if (suburbData.riskFactors.includes('storm-damage') && service.category === 'storm') {
        issues.push(`Tree strike and canopy damage near ${suburb}'s bushland borders`);
      }
    }

    return issues;
  }

  private static generateTestimonial(service: any, location: any, suburb?: string) {
    const testimonials = [
      {
        text: `They arrived within 30 minutes of my call and immediately stopped the water damage from spreading. Professional, efficient, and handled everything with my insurance company.`,
        author: 'Sarah M.',
        type: 'water'
      },
      {
        text: `After our kitchen fire, they not only cleaned up the damage but eliminated all smoke odour. You'd never know we had a fire. Incredible service!`,
        author: 'John D.',
        type: 'fire'
      },
      {
        text: `The storm damage to our roof was extensive. They tarped it immediately to prevent further damage and completed repairs quickly. Highly recommend!`,
        author: 'Lisa K.',
        type: 'storm'
      }
    ];
    
    const relevant = testimonials.find(t => t.type === service.category) || testimonials[0];
    
    return {
      text: relevant.text,
      author: relevant.author,
      suburb: suburb || location.suburbs[Math.floor(Math.random() * location.suburbs.length)]
    };
  }

  private static generateFAQs(service: any, location: any, suburb?: string) {
    // Use service-specific FAQ data if available, otherwise fall back to defaults
    const generator = serviceFAQs[service.category === 'water' ? 'water-damage-restoration' :
      service.category === 'fire' ? 'fire-damage-restoration' :
      service.category === 'mould' ? 'mould-remediation' :
      service.category === 'flood' ? 'flood-recovery' :
      service.category === 'storm' ? 'storm-damage-repairs' : ''] || defaultServiceFAQs;

    return generator(location.city, suburb);
  }

  private static generateRelatedPages(locationKey: string, serviceKey: string, suburb?: string): string[] {
    const pages = [];
    
    // Other services in same location
    Object.keys(this.services).forEach(key => {
      if (key !== serviceKey) {
        pages.push(`/${key}-${locationKey}${suburb ? `-${suburb.toLowerCase().replace(/\s+/g, '-')}` : ''}`);
      }
    });
    
    // Same service in nearby suburbs (if applicable)
    if (suburb) {
      const location = this.locations[locationKey];
      const nearby = this.getNearbySuburbs(location, suburb).slice(0, 3);
      nearby.forEach(s => {
        pages.push(`/${serviceKey}-${locationKey}-${s.toLowerCase().replace(/\s+/g, '-')}`);
      });
    }
    
    // General guides
    pages.push(`/guides/${this.services[serviceKey].category}-damage`);
    pages.push(`/whos-first/${this.services[serviceKey].category}-damage`);
    pages.push(`/insurance-decoder/${this.services[serviceKey].category}-damage`);
    
    return pages;
  }

  private static generateSchema(service: any, location: any, suburb?: string) {
    return {
      '@context': 'https://schema.org',
      '@type': 'LocalBusiness',
      '@id': `https://disasterrecovery.com.au/${service.category}-${location.city.toLowerCase()}`,
      name: `Disaster Recovery ${location.city}`,
      description: `Professional ${service.type} services in ${suburb || location.city}, ${location.state}`,
      url: `https://disasterrecovery.com.au`,
      telephone: '1800000000',
      address: {
        '@type': 'PostalAddress',
        addressLocality: suburb || location.city,
        addressRegion: location.state,
        addressCountry: 'AU'
      },
      geo: location.coordinates || {
        '@type': 'GeoCoordinates',
        latitude: -33.8688,
        longitude: 151.2093
      },
      areaServed: {
        '@type': 'City',
        name: location.city
      },
      priceRange: '$$',
      openingHoursSpecification: {
        '@type': 'OpeningHoursSpecification',
        dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        opens: '00:00',
        closes: '23:59'
      }
    };
  }

  private static getRegionForSuburb(location: any, suburb: string): string | undefined {
    // This would be more sophisticated in production
    return location.regions[0];
  }

  private static getNearbySuburbs(location: any, suburb: string): string[] {
    // Return suburbs near the given suburb
    const index = location.suburbs.indexOf(suburb);
    if (index === -1) return location.suburbs.slice(0, 5);
    
    const nearby = [];
    for (let i = Math.max(0, index - 2); i < Math.min(location.suburbs.length, index + 3); i++) {
      if (i !== index) {
        nearby.push(location.suburbs[i]);
      }
    }
    return nearby;
  }

  // Generate all location-service combinations
  static generateAllPages(): LocationServicePage[] {
    const pages: LocationServicePage[] = [];
    
    // For each city
    Object.keys(this.locations).forEach(locationKey => {
      const location = this.locations[locationKey];
      
      // For each service
      Object.keys(this.services).forEach(serviceKey => {
        const service = this.services[serviceKey];
        
        // City-level page
        pages.push(this.generateLocationServicePage(locationKey, serviceKey));
        
        // Suburb-level pages (top suburbs only for now)
        location.suburbs.slice(0, 5).forEach(suburb => {
          pages.push(this.generateLocationServicePage(locationKey, serviceKey, suburb));
          
          // Variation pages for top suburbs
          service.variations?.slice(0, 2).forEach(variation => {
            pages.push(this.generateLocationServicePage(locationKey, serviceKey, suburb, variation));
          });
        });
      });
    });
    
    return pages;
  }

  // Generate URL from page data
  static generateURL(page: LocationServicePage): string {
    return `/${page.id}`;
  }
}