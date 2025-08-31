import { faker } from '@faker-js/faker/locale/en_AU';

interface MockContractor {
  id: string;
  businessName: string;
  abn: string;
  location: {
    suburb: string;
    city: string;
    state: string;
    postcode: string;
    coordinates: [number, number];
  };
  serviceRadius: number;
  services: string[];
  certifications: string[];
  rating: number;
  completedJobs: number;
  responseTime: number;
  pricing: 'budget' | 'standard' | 'premium';
  availability: 'available' | 'busy' | 'unavailable';
  performanceMetrics: {
    customerSatisfaction: number;
    onTimeCompletion: number;
    quoteAccuracy: number;
  };
  joinedDate: Date;
  insuranceCoverage: number;
  teamSize: number;
}

interface MockClaim {
  id: string;
  timestamp: Date;
  customer: {
    name: string;
    propertyType: string;
    location: {
      suburb: string;
      city: string;
      state: string;
      postcode: string;
    };
    contactNumber: string;
    email: string;
  };
  disaster: {
    type: string;
    severity: 'minor' | 'moderate' | 'major' | 'catastrophic';
    affectedArea: number;
    estimatedDamage: number;
    description: string;
  };
  insuranceCompany: string;
  claimNumber: string;
  claimAmount: number;
  status: 'submitted' | 'assigned' | 'in-progress' | 'completed' | 'closed';
  assignedContractor?: string;
  timeline: Array<{
    event: string;
    timestamp: Date;
    description: string;
  }>;
  photos?: string[];
  urgency: 'low' | 'medium' | 'high' | 'critical';
}

interface LocationData {
  suburb: string;
  city: string;
  state: string;
  postcode: string;
  coordinates: [number, number];
  population?: number;
}

export class MockDataFactory {
  private australianLocations: LocationData[];
  private disasterTypes: string[];
  private propertyTypes: string[];
  private services: string[];
  private insuranceCompanies: string[];
  private certifications: string[];

  constructor() {
    this.initializeData();
    this.australianLocations = this.loadAustralianLocations();
    this.disasterTypes = [
      'Water Damage',
      'Fire Damage',
      'Storm Damage',
      'Flood',
      'Mould Remediation',
      'Sewage Overflow',
      'Vandalism',
      'Biohazard Cleanup',
      'Structural Damage',
      'Smoke Damage'
    ];
    
    this.propertyTypes = [
      'Single Family Home',
      'Apartment',
      'Townhouse',
      'Commercial Office',
      'Retail Store',
      'Restaurant',
      'Warehouse',
      'Hospital',
      'School',
      'Hotel',
      'Industrial Facility',
      'High-Rise Building'
    ];
    
    this.services = [
      'Water Extraction',
      'Structural Drying',
      'Mould Remediation',
      'Fire Restoration',
      'Smoke Removal',
      'Content Restoration',
      'Carpet Cleaning',
      'Biohazard Cleanup',
      'Emergency Board-up',
      'Debris Removal',
      'Odour Removal',
      'Document Drying'
    ];
    
    this.insuranceCompanies = [
      'NRMA Insurance',
      'Allianz Australia',
      'QBE Insurance',
      'Suncorp',
      'AAMI',
      'Budget Direct',
      'Youi',
      'RAC Insurance',
      'CGU Insurance',
      'Zurich Australia'
    ];
    
    this.certifications = [
      'IICRC Certified',
      'RIA Certified',
      'ABRA Member',
      'Master Builders Association',
      'ISO 9001',
      'OH&S Certified',
      'Asbestos Removal License',
      'EPA Approved'
    ];
  }

  private initializeData() {
    // Set Australian locale for faker
    faker.setLocale('en_AU');
  }

  private loadAustralianLocations(): LocationData[] {
    // Sample of real Australian locations
    return [
      // Major Cities
      { suburb: 'Sydney CBD', city: 'Sydney', state: 'NSW', postcode: '2000', coordinates: [-33.8688, 151.2093] },
      { suburb: 'Melbourne CBD', city: 'Melbourne', state: 'VIC', postcode: '3000', coordinates: [-37.8136, 144.9631] },
      { suburb: 'Brisbane City', city: 'Brisbane', state: 'QLD', postcode: '4000', coordinates: [-27.4698, 153.0251] },
      { suburb: 'Perth CBD', city: 'Perth', state: 'WA', postcode: '6000', coordinates: [-31.9505, 115.8605] },
      { suburb: 'Adelaide CBD', city: 'Adelaide', state: 'SA', postcode: '5000', coordinates: [-34.9285, 138.6007] },
      
      // Regional Centers
      { suburb: 'Newcastle', city: 'Newcastle', state: 'NSW', postcode: '2300', coordinates: [-32.9283, 151.7817] },
      { suburb: 'Wollongong', city: 'Wollongong', state: 'NSW', postcode: '2500', coordinates: [-34.4278, 150.8931] },
      { suburb: 'Geelong', city: 'Geelong', state: 'VIC', postcode: '3220', coordinates: [-38.1499, 144.3617] },
      { suburb: 'Townsville', city: 'Townsville', state: 'QLD', postcode: '4810', coordinates: [-19.2590, 146.8169] },
      { suburb: 'Cairns', city: 'Cairns', state: 'QLD', postcode: '4870', coordinates: [-16.9186, 145.7781] },
      
      // Rural/Remote
      { suburb: 'Coober Pedy', city: 'Coober Pedy', state: 'SA', postcode: '5723', coordinates: [-29.0135, 134.7544] },
      { suburb: 'Broken Hill', city: 'Broken Hill', state: 'NSW', postcode: '2880', coordinates: [-31.9539, 141.4539] },
      { suburb: 'Mount Isa', city: 'Mount Isa', state: 'QLD', postcode: '4825', coordinates: [-20.7256, 139.4927] },
      { suburb: 'Thursday Island', city: 'Thursday Island', state: 'QLD', postcode: '4875', coordinates: [-10.5820, 142.2190] },
      { suburb: 'Broome', city: 'Broome', state: 'WA', postcode: '6725', coordinates: [-17.9614, 122.2359] }
    ];
  }

  public generateContractor(location?: LocationData): MockContractor {
    const loc = location || faker.helpers.arrayElement(this.australianLocations);
    const businessTypes = ['Restoration', 'Recovery', 'Services', 'Solutions', 'Specialists', 'Professionals'];
    const businessName = `${loc.city} ${faker.helpers.arrayElement(['Disaster', 'Emergency', 'Rapid'])} ${faker.helpers.arrayElement(businessTypes)}`;
    
    return {
      id: `CTR-${faker.string.alphanumeric(8).toUpperCase()}`,
      businessName,
      abn: this.generateABN(),
      location: {
        suburb: loc.suburb,
        city: loc.city,
        state: loc.state,
        postcode: loc.postcode,
        coordinates: loc.coordinates
      },
      serviceRadius: faker.helpers.arrayElement([25, 50, 75, 100, 150]),
      services: faker.helpers.arrayElements(this.services, { min: 3, max: 8 }),
      certifications: faker.helpers.arrayElements(this.certifications, { min: 2, max: 5 }),
      rating: parseFloat((3.5 + Math.random() * 1.5).toFixed(1)),
      completedJobs: faker.number.int({ min: 50, max: 2000 }),
      responseTime: faker.number.int({ min: 15, max: 120 }),
      pricing: faker.helpers.arrayElement(['budget', 'standard', 'premium']),
      availability: faker.helpers.weightedArrayElement([
        { value: 'available', weight: 70 },
        { value: 'busy', weight: 25 },
        { value: 'unavailable', weight: 5 }
      ]),
      performanceMetrics: {
        customerSatisfaction: parseFloat((85 + Math.random() * 15).toFixed(1)),
        onTimeCompletion: parseFloat((80 + Math.random() * 20).toFixed(1)),
        quoteAccuracy: parseFloat((90 + Math.random() * 10).toFixed(1))
      },
      joinedDate: faker.date.between({ from: '2022-01-01', to: 'now' }),
      insuranceCoverage: faker.helpers.arrayElement([5000000, 10000000, 20000000]),
      teamSize: faker.number.int({ min: 5, max: 50 })
    };
  }

  public generateClaim(contractor?: MockContractor): MockClaim {
    const location = faker.helpers.arrayElement(this.australianLocations);
    const disasterType = faker.helpers.arrayElement(this.disasterTypes);
    const severity = faker.helpers.weightedArrayElement([
      { value: 'minor', weight: 40 },
      { value: 'moderate', weight: 35 },
      { value: 'major', weight: 20 },
      { value: 'catastrophic', weight: 5 }
    ]) as 'minor' | 'moderate' | 'major' | 'catastrophic';
    
    const damageMultiplier = {
      minor: 1,
      moderate: 5,
      major: 20,
      catastrophic: 100
    };
    
    const baseAmount = faker.number.int({ min: 5000, max: 50000 });
    const claimAmount = baseAmount * damageMultiplier[severity];
    
    const timestamp = faker.date.recent({ days: 30 });
    
    return {
      id: `CLM-${faker.string.alphanumeric(10).toUpperCase()}`,
      timestamp,
      customer: {
        name: faker.person.fullName(),
        propertyType: faker.helpers.arrayElement(this.propertyTypes),
        location: {
          suburb: location.suburb,
          city: location.city,
          state: location.state,
          postcode: location.postcode
        },
        contactNumber: faker.email.number('04## ### ###'),
        email: faker.internet.email()
      },
      disaster: {
        type: disasterType,
        severity,
        affectedArea: faker.number.int({ min: 20, max: 500 }),
        estimatedDamage: claimAmount,
        description: this.generateDisasterDescription(disasterType, severity)
      },
      insuranceCompany: faker.helpers.arrayElement(this.insuranceCompanies),
      claimNumber: `${faker.string.alpha(3).toUpperCase()}-${faker.number.int({ min: 100000, max: 999999 })}`,
      claimAmount,
      status: faker.helpers.arrayElement(['submitted', 'assigned', 'in-progress', 'completed', 'closed']),
      assignedContractor: contractor?.businessName,
      timeline: this.generateTimeline(timestamp),
      urgency: this.determineUrgency(severity)
    };
  }

  private generateABN(): string {
    // Generate valid-looking ABN (Australian Business Number)
    const part1 = faker.number.int({ min: 10, max: 99 });
    const part2 = faker.number.int({ min: 100, max: 999 });
    const part3 = faker.number.int({ min: 100, max: 999 });
    const part4 = faker.number.int({ min: 100, max: 999 });
    
    return `${part1} ${part2} ${part3} ${part4}`;
  }

  private generateDisasterDescription(type: string, severity: string): string {
    const descriptions = {
      'Water Damage': {
        minor: 'Small water leak affecting one room',
        moderate: 'Burst pipe causing flooding in multiple rooms',
        major: 'Significant flooding affecting entire floor',
        catastrophic: 'Major flood damage throughout property'
      },
      'Fire Damage': {
        minor: 'Kitchen fire with smoke damage',
        moderate: 'Fire damage to multiple rooms',
        major: 'Extensive fire damage to half of property',
        catastrophic: 'Total loss due to fire'
      }
    };
    
    return descriptions[type]?.[severity] || `${severity} ${type.toLowerCase()} incident`;
  }

  private generateTimeline(startDate: Date): Array<{ event: string; timestamp: Date; description: string }> {
    const timeline = [];
    let currentDate = new Date(startDate);
    
    timeline.push({
      event: 'Claim Submitted',
      timestamp: new Date(currentDate),
      description: 'Insurance claim submitted via online portal'
    });
    
    currentDate = faker.date.soon({ days: 1, refDate: currentDate });
    timeline.push({
      event: 'Claim Approved',
      timestamp: new Date(currentDate),
      description: 'Claim approved by insurance company'
    });
    
    currentDate = faker.date.soon({ days: 1, refDate: currentDate });
    timeline.push({
      event: 'Contractor Assigned',
      timestamp: new Date(currentDate),
      description: 'Contractor assigned to job'
    });
    
    return timeline;
  }

  private determineUrgency(severity: string): 'low' | 'medium' | 'high' | 'critical' {
    switch (severity) {
      case 'catastrophic':
        return 'critical';
      case 'major':
        return 'high';
      case 'moderate':
        return 'medium';
      default:
        return 'low';
    }
  }

  public generateBulkContractors(count: number): MockContractor[] {
    const contractors: MockContractor[] = [];
    const locationsUsed = new Set<string>();
    
    for (let i = 0; i < count; i++) {
      // Ensure geographic distribution
      let location = faker.helpers.arrayElement(this.australianLocations);
      
      // Try to use unique locations first
      while (locationsUsed.has(location.suburb) && locationsUsed.size < this.australianLocations.length) {
        location = faker.helpers.arrayElement(this.australianLocations);
      }
      
      locationsUsed.add(location.suburb);
      contractors.push(this.generateContractor(location));
    }
    
    return contractors;
  }

  public generateBulkClaims(count: number, contractors: MockContractor[]): MockClaim[] {
    const claims: MockClaim[] = [];
    
    for (let i = 0; i < count; i++) {
      const contractor = faker.helpers.arrayElement(contractors);
      claims.push(this.generateClaim(contractor));
    }
    
    return claims;
  }

  public generateInvestorMetrics() {
    return {
      overview: {
        totalContractors: 2547,
        totalClaims: 12853,
        monthlyRevenue: 4250000,
        marketCoverage: 92,
        automationRate: 100
      },
      growth: {
        contractorGrowth: 15.3,
        claimGrowth: 28.7,
        revenueGrowth: 32.5,
        marketShareGrowth: 8.2
      },
      performance: {
        avgResponseTime: 18,
        customerSatisfaction: 94.2,
        contractorRetention: 96.5,
        claimConversion: 73.8,
        systemUptime: 99.97
      },
      geographic: {
        statesActive: 8,
        citiesCovered: 487,
        suburbsCovered: 15234,
        ruralCoverage: 78
      },
      seo: {
        keywordsRanked: 18543,
        firstPageRankings: 12876,
        organicTraffic: 325000,
        domainAuthority: 72,
        competitorOutranked: 94
      },
      financials: {
        monthlyRecurring: 3200000,
        avgContractValue: 1250,
        customerAcquisitionCost: 45,
        lifetimeValue: 8500,
        grossMargin: 68
      },
      projections: {
        year1: {
          revenue: 15000000,
          contractors: 5000,
          marketShare: 15
        },
        year2: {
          revenue: 45000000,
          contractors: 12000,
          marketShare: 35
        },
        year3: {
          revenue: 120000000,
          contractors: 25000,
          marketShare: 60
        }
      }
    };
  }

  public generateLiveActivity() {
    const activities = [];
    const locations = faker.helpers.arrayElements(this.australianLocations, 5);
    
    for (const location of locations) {
      activities.push({
        type: faker.helpers.arrayElement(['claim_submitted', 'contractor_assigned', 'job_completed']),
        location: `${location.suburb}, ${location.state}`,
        timestamp: faker.date.recent({ days: 1 }),
        value: faker.number.int({ min: 5000, max: 50000 })
      });
    }
    
    return activities.sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime());
  }

  public generateSEODominationData() {
    const keywords = [];
    const services = ['water damage', 'fire restoration', 'mould removal', 'flood recovery'];
    const modifiers = ['emergency', '24 hour', 'same day', 'insurance approved'];
    
    for (const location of this.australianLocations) {
      for (const service of services) {
        for (const modifier of modifiers) {
          keywords.push({
            keyword: `${location.city.toLowerCase()} ${service} ${modifier}`,
            position: faker.number.int({ min: 1, max: 3 }),
            searchVolume: faker.number.int({ min: 100, max: 5000 }),
            difficulty: faker.number.int({ min: 20, max: 80 }),
            url: `/locations/${location.state.toLowerCase()}/${location.city.toLowerCase().replace(' ', '-')}/${service.replace(' ', '-')}`
          });
        }
      }
    }
    
    return {
      totalKeywords: keywords.length,
      topRankings: keywords.filter(k => k.position === 1).length,
      keywords: keywords.slice(0, 100)
    };
  }
}

export default MockDataFactory;