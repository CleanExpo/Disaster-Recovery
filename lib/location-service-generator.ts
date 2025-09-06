// Location-based Service Page Generator for SEO Domination

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
      variations: ['emergency', 'smoke', 'soot', 'odor removal']
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
    variation?: string
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
      metaDescription: this.generateMetaDescription(service, location, suburb, variation),
      h1: `${variationText}${service.type} Services in ${fullLocation}`,
      location: {
        city: location.city,
        state: location.state,
        suburb,
        region: suburb ? this.getRegionForSuburb(location, suburb) : undefined,
        population: location.population
      },
      service: {
        type: service.type,
        category: service.category,
        urgency: service.urgency,
        keywords: service.keywords
      },
      content: this.generateContent(service, location, suburb, variation),
      faqs: this.generateFAQs(service, location, suburb),
      relatedPages: this.generateRelatedPages(locationKey, serviceKey, suburb),
      schema: this.generateSchema(service, location, suburb)
    };
  }

  private static generateMetaDescription(
    service: any,
    location: any,
    suburb?: string,
    variation?: string
  ): string {
    const locationText = suburb ? `${suburb} and surrounding ${location.city} areas` : `${location.city} and all suburbs`;
    const variationText = variation ? `${variation} ` : '';
    
    return `Professional ${variationText}${service.type.toLowerCase()} services in ${locationText}. 24/7 emergency response, insurance approved, certified technicians. Call 1800 000 000 for immediate assistance.`;
  }

  private static generateContent(
    service: any,
    location: any,
    suburb?: string,
    variation?: string
  ) {
    const locationText = suburb || location.city;
    
    return {
      intro: `When disaster strikes in ${locationText}, you need immediate, professional ${service.type.toLowerCase()} services. Our ${location.city}-based emergency response team is available 24/7, with typical response times of 30-60 minutes throughout ${suburb ? `${suburb} and nearby suburbs` : `Greater ${location.city}`}.`,
      
      whyChooseUs: [
        `Local ${locationText} team with deep knowledge of the area`,
        'Average 45-minute emergency response time',
        'All major insurance companies approved',
        'IICRC certified technicians',
        '100% satisfaction guarantee',
        'No hidden fees or charges',
        'Direct insurance billing available'
      ],
      
      serviceAreas: suburb 
        ? this.getNearbySuburbs(location, suburb)
        : location.suburbs.slice(0, 10),
      
      emergencyResponse: `Our ${locationText} rapid response team is strategically positioned to reach any location within ${suburb ? `${suburb} and surrounding areas` : location.city} within 60 minutes. We maintain fully equipped vehicles throughout ${location.city} to ensure the fastest possible response to your ${service.type.toLowerCase()} emergency.`,
      
      localKnowledge: this.generateLocalKnowledge(service, location, suburb),
      
      commonIssues: this.generateCommonIssues(service, location, suburb),
      
      insurancePartners: [
        'AAMI', 'Suncorp', 'Allianz', 'NRMA', 'QBE', 'CGU',
        'Budget Direct', 'Youi', 'RACQ', 'CommInsure'
      ],
      
      testimonial: this.generateTestimonial(service, location, suburb)
    };
  }

  private static generateLocalKnowledge(service: any, location: any, suburb?: string): string[] {
    const knowledge = [];
    
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
    }
    
    if (suburb) {
      knowledge.push(`Specific knowledge of ${suburb} property types and common issues`);
    }
    
    return knowledge;
  }

  private static generateCommonIssues(service: any, location: any, suburb?: string): string[] {
    const issues = [];
    
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
        issues.push('Smoke damage from neighboring properties');
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
        text: `After our kitchen fire, they not only cleaned up the damage but eliminated all smoke odor. You'd never know we had a fire. Incredible service!`,
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
    const locationText = suburb || location.city;
    
    return [
      {
        question: `How quickly can you respond to ${service.type.toLowerCase()} in ${locationText}?`,
        answer: `Our emergency response team typically arrives within 30-60 minutes for urgent ${service.type.toLowerCase()} calls in ${locationText}. We maintain crews throughout ${location.city} to ensure rapid response times.`
      },
      {
        question: `Do you work with insurance companies for ${service.type.toLowerCase()} claims?`,
        answer: `Yes, we work with all major insurance companies and can bill them directly. We'll document all damage, provide detailed reports, and handle the entire claims process for you.`
      },
      {
        question: `What areas do you service around ${locationText}?`,
        answer: `We service all of ${locationText} and surrounding suburbs including ${this.getNearbySuburbs(location, suburb).slice(0, 5).join(', ')}. Our ${location.city} team covers the entire metropolitan area.`
      },
      {
        question: `Are you available 24/7 for emergency ${service.type.toLowerCase()}?`,
        answer: `Yes, our emergency response team is available 24 hours a day, 7 days a week, including public holidays. Disasters don't wait, and neither do we.`
      },
      {
        question: `What certifications do your ${locationText} technicians have?`,
        answer: `All our technicians are IICRC certified and undergo continuous training. We maintain the highest industry standards for ${service.type.toLowerCase()} in ${location.city}.`
      }
    ];
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