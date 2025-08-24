/**
 * Contractor Network Management System
 * Tracks verified contractors and activates service areas
 */

export interface Contractor {
  id: string;
  companyName: string;
  tradingName?: string;
  abn: string;
  iicrcNumber: string;
  certifications: string[];
  verificationStatus: 'pending' | 'verified' | 'rejected';
  verifiedDate?: Date;
  location: {
    address: string;
    suburb: string;
    state: string;
    postcode: string;
    coordinates: {
      lat: number;
      lng: number;
    };
  };
  serviceRadius: 20 | 25 | 50 | 100;
  serviceAreas: string[]; // Postcodes covered
  services: {
    waterDamage: boolean;
    fireDamage: boolean;
    mouldRemediation: boolean;
    biohazard: boolean;
    traumaCleanup: boolean;
    floodRecovery: boolean;
  };
  capacity: {
    technicians: number;
    vehicles: number;
    maxJobsPerWeek: number;
  };
  insurance: {
    publicLiability: number;
    professionalIndemnity: number;
    expiryDate: Date;
  };
  membershipTier: 'local' | 'regional' | 'premium';
  performance: {
    jobsCompleted: number;
    averageRating: number;
    responseTime: number; // minutes
    insuranceApprovalRate: number; // percentage
  };
}

export interface ServiceArea {
  postcode: string;
  suburb: string;
  state: string;
  status: 'inactive' | 'pending' | 'active';
  contractors: string[]; // Contractor IDs
  population: number;
  demandLevel: 'low' | 'medium' | 'high';
  disasterRisk: 'low' | 'medium' | 'high';
  activationRequirements: {
    minimumContractors: number;
    requiredServices: string[];
    coverageRadius: number;
  };
}

/**
 * Australian Postcode Database (Sample)
 * In production, this would be a complete database
 */
export const POSTCODE_DATABASE: ServiceArea[] = [
  // Brisbane
  {
    postcode: '4000',
    suburb: 'Brisbane CBD',
    state: 'QLD',
    status: 'active',
    contractors: ['contractor-1', 'contractor-2', 'contractor-3'],
    population: 15000,
    demandLevel: 'high',
    disasterRisk: 'high',
    activationRequirements: {
      minimumContractors: 2,
      requiredServices: ['waterDamage', 'fireDamage'],
      coverageRadius: 20,
    },
  },
  {
    postcode: '4101',
    suburb: 'West End',
    state: 'QLD',
    status: 'active',
    contractors: ['contractor-1', 'contractor-3'],
    population: 9000,
    demandLevel: 'medium',
    disasterRisk: 'high',
    activationRequirements: {
      minimumContractors: 1,
      requiredServices: ['waterDamage'],
      coverageRadius: 20,
    },
  },
  // Sydney
  {
    postcode: '2000',
    suburb: 'Sydney CBD',
    state: 'NSW',
    status: 'pending',
    contractors: ['contractor-4'],
    population: 30000,
    demandLevel: 'high',
    disasterRisk: 'medium',
    activationRequirements: {
      minimumContractors: 3,
      requiredServices: ['waterDamage', 'fireDamage', 'mouldRemediation'],
      coverageRadius: 25,
    },
  },
  // Melbourne
  {
    postcode: '3000',
    suburb: 'Melbourne CBD',
    state: 'VIC',
    status: 'inactive',
    contractors: [],
    population: 40000,
    demandLevel: 'high',
    disasterRisk: 'medium',
    activationRequirements: {
      minimumContractors: 3,
      requiredServices: ['waterDamage', 'fireDamage'],
      coverageRadius: 25,
    },
  },
];

/**
 * Calculate which postcodes a contractor can service
 */
export function calculateServiceArea(
  contractor: Contractor,
  allPostcodes: ServiceArea[]
): string[] {
  const servicedPostcodes: string[] = [];
  const { lat, lng } = contractor.location.coordinates;
  const radiusKm = contractor.serviceRadius;
  
  allPostcodes.forEach(area => {
    // In production, would calculate actual distance between coordinates
    // For now, using simple postcode proximity
    const basePostcode = parseInt(contractor.location.postcode);
    const areaPostcode = parseInt(area.postcode);
    const difference = Math.abs(basePostcode - areaPostcode);
    
    // Simple radius calculation based on postcode difference
    const maxDifference = radiusKm / 10; // Rough approximation
    
    if (difference <= maxDifference) {
      servicedPostcodes.push(area.postcode);
    }
  });
  
  return servicedPostcodes;
}

/**
 * Check if an area can be activated
 */
export function canActivateArea(area: ServiceArea, contractors: Contractor[]): boolean {
  const areaContractors = contractors.filter(c => 
    c.serviceAreas.includes(area.postcode) && 
    c.verificationStatus === 'verified'
  );
  
  if (areaContractors.length < area.activationRequirements.minimumContractors) {
    return false;
  }
  
  // Check if all required services are covered
  const coveredServices = new Set<string>();
  areaContractors.forEach(contractor => {
    Object.entries(contractor.services).forEach(([service, available]) => {
      if (available) coveredServices.add(service);
    });
  });
  
  return area.activationRequirements.requiredServices.every(service => 
    coveredServices.has(service)
  );
}

/**
 * Get area activation status
 */
export function getAreaStatus(postcode: string): {
  status: 'active' | 'pending' | 'inactive';
  message: string;
  contractors?: number;
  requirements?: string[];
} {
  const area = POSTCODE_DATABASE.find(a => a.postcode === postcode);
  
  if (!area) {
    return {
      status: 'inactive',
      message: 'This area is not yet in our network. Register your interest to help us expand.',
    };
  }
  
  switch (area.status) {
    case 'active':
      return {
        status: 'active',
        message: `Service available! ${area.contractors.length} verified contractors ready to help.`,
        contractors: area.contractors.length,
      };
    
    case 'pending':
      const needed = area.activationRequirements.minimumContractors - area.contractors.length;
      return {
        status: 'pending',
        message: `Almost ready! We need ${needed} more verified contractor${needed > 1 ? 's' : ''} to activate this area.`,
        contractors: area.contractors.length,
        requirements: area.activationRequirements.requiredServices,
      };
    
    case 'inactive':
      return {
        status: 'inactive',
        message: 'No contractors yet. Are you a restoration professional? Help us launch this area!',
        requirements: area.activationRequirements.requiredServices,
      };
  }
}

/**
 * Match customer to contractors
 */
export function matchContractors(
  postcode: string,
  serviceNeeded: string,
  urgency: 'emergency' | 'urgent' | 'scheduled',
  preferredRadius: number
): Contractor[] {
  const area = POSTCODE_DATABASE.find(a => a.postcode === postcode);
  
  if (!area || area.status !== 'active') {
    return [];
  }
  
  // In production, would fetch actual contractor data
  // For now, returning mock matched contractors
  const mockContractors: Contractor[] = [
    {
      id: 'contractor-1',
      companyName: 'Rapid Restoration Services',
      abn: '12 345 678 901',
      iicrcNumber: 'IICRC123456',
      certifications: ['WRT', 'ASD', 'AMRT'],
      verificationStatus: 'verified',
      verifiedDate: new Date('2024-01-15'),
      location: {
        address: '123 Main St',
        suburb: 'Brisbane',
        state: 'QLD',
        postcode: '4000',
        coordinates: { lat: -27.4698, lng: 153.0251 },
      },
      serviceRadius: 25,
      serviceAreas: ['4000', '4101', '4102'],
      services: {
        waterDamage: true,
        fireDamage: true,
        mouldRemediation: true,
        biohazard: false,
        traumaCleanup: false,
        floodRecovery: true,
      },
      capacity: {
        technicians: 8,
        vehicles: 4,
        maxJobsPerWeek: 20,
      },
      insurance: {
        publicLiability: 20000000,
        professionalIndemnity: 5000000,
        expiryDate: new Date('2025-01-01'),
      },
      membershipTier: 'regional',
      performance: {
        jobsCompleted: 450,
        averageRating: 4.8,
        responseTime: 35,
        insuranceApprovalRate: 98,
      },
    },
  ];
  
  // Filter by service needed and radius
  return mockContractors.filter(contractor => {
    const hasService = contractor.services[serviceNeeded as keyof typeof contractor.services];
    const withinRadius = contractor.serviceRadius >= preferredRadius;
    const available = contractor.capacity.maxJobsPerWeek > contractor.performance.jobsCompleted / 52;
    
    return hasService && withinRadius && available;
  });
}

/**
 * Calculate lead distribution
 */
export function distributeLeads(
  contractors: Contractor[],
  urgency: 'emergency' | 'urgent' | 'scheduled'
): { contractorId: string; priority: number }[] {
  // Sort contractors by performance and availability
  const ranked = contractors.map(contractor => ({
    contractorId: contractor.id,
    priority: calculatePriority(contractor, urgency),
  })).sort((a, b) => b.priority - a.priority);
  
  // Return top 3 contractors for customer choice
  return ranked.slice(0, 3);
}

function calculatePriority(
  contractor: Contractor,
  urgency: 'emergency' | 'urgent' | 'scheduled'
): number {
  let priority = 0;
  
  // Response time weight (more important for emergencies)
  const responseWeight = urgency === 'emergency' ? 40 : 20;
  priority += (60 - contractor.performance.responseTime) * responseWeight / 60;
  
  // Rating weight
  priority += contractor.performance.averageRating * 20;
  
  // Insurance approval rate
  priority += contractor.performance.insuranceApprovalRate / 5;
  
  // Capacity availability
  const utilization = contractor.performance.jobsCompleted / 52 / contractor.capacity.maxJobsPerWeek;
  priority += (1 - utilization) * 20;
  
  // Membership tier bonus
  const tierBonus = {
    premium: 10,
    regional: 5,
    local: 0,
  };
  priority += tierBonus[contractor.membershipTier];
  
  return priority;
}