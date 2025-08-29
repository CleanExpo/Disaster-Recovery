/**
 * Contractor Onboarding Types
 * Comprehensive type definitions for the NRP contractor onboarding system
 */

// Property Coverage Matrix Types
export enum PropertyType {
  RESIDENTIAL = 'RESIDENTIAL',
  COMMERCIAL = 'COMMERCIAL',
  INDUSTRIAL = 'INDUSTRIAL',
  INSTITUTIONAL = 'INSTITUTIONAL',
  INFRASTRUCTURE = 'INFRASTRUCTURE'
}

export enum PropertyScale {
  // Residential scales
  GRANNY_FLAT = 'GRANNY_FLAT',
  SINGLE_HOUSE = 'SINGLE_HOUSE',
  DUPLEX = 'DUPLEX',
  TOWNHOUSE = 'TOWNHOUSE',
  LOW_RISE_APARTMENT = 'LOW_RISE_APARTMENT',
  MID_RISE_APARTMENT = 'MID_RISE_APARTMENT',
  HIGH_RISE_APARTMENT = 'HIGH_RISE_APARTMENT',
  LUXURY_TOWER = 'LUXURY_TOWER',
  
  // Commercial scales
  CORNER_SHOP = 'CORNER_SHOP',
  SMALL_OFFICE = 'SMALL_OFFICE',
  RETAIL_STORE = 'RETAIL_STORE',
  RESTAURANT = 'RESTAURANT',
  SHOPPING_CENTER = 'SHOPPING_CENTER',
  OFFICE_BUILDING = 'OFFICE_BUILDING',
  HOTEL = 'HOTEL',
  MEGA_MALL = 'MEGA_MALL',
  
  // Industrial scales
  SMALL_WORKSHOP = 'SMALL_WORKSHOP',
  WAREHOUSE = 'WAREHOUSE',
  FACTORY = 'FACTORY',
  PROCESSING_PLANT = 'PROCESSING_PLANT',
  DISTRIBUTION_CENTER = 'DISTRIBUTION_CENTER',
  HEAVY_INDUSTRIAL = 'HEAVY_INDUSTRIAL',
  OFFSHORE_PLATFORM = 'OFFSHORE_PLATFORM',
  
  // Institutional scales
  LOCAL_CLINIC = 'LOCAL_CLINIC',
  MEDICAL_CENTER = 'MEDICAL_CENTER',
  SMALL_SCHOOL = 'SMALL_SCHOOL',
  UNIVERSITY = 'UNIVERSITY',
  HOSPITAL = 'HOSPITAL',
  MAJOR_HOSPITAL = 'MAJOR_HOSPITAL',
  GOVERNMENT_BUILDING = 'GOVERNMENT_BUILDING',
  
  // Infrastructure scales
  BUS_STOP = 'BUS_STOP',
  TRAIN_STATION = 'TRAIN_STATION',
  POWER_SUBSTATION = 'POWER_SUBSTATION',
  WATER_TREATMENT = 'WATER_TREATMENT',
  TELECOMMUNICATIONS = 'TELECOMMUNICATIONS',
  AIRPORT_TERMINAL = 'AIRPORT_TERMINAL',
  INTERNATIONAL_AIRPORT = 'INTERNATIONAL_AIRPORT'
}

export enum DisasterType {
  // Water-related
  WATER_DAMAGE = 'WATER_DAMAGE',
  FLOOD = 'FLOOD',
  BURST_PIPES = 'BURST_PIPES',
  SEWAGE_OVERFLOW = 'SEWAGE_OVERFLOW',
  
  // Fire-related
  FIRE_DAMAGE = 'FIRE_DAMAGE',
  SMOKE_DAMAGE = 'SMOKE_DAMAGE',
  BUSHFIRE = 'BUSHFIRE',
  
  // Contamination
  MOULD = 'MOULD',
  BACTERIA = 'BACTERIA',
  VIRUS = 'VIRUS',
  BIOHAZARD = 'BIOHAZARD',
  TRAUMA_SCENE = 'TRAUMA_SCENE',
  
  // Weather-related
  STORM_DAMAGE = 'STORM_DAMAGE',
  CYCLONE = 'CYCLONE',
  HAIL_DAMAGE = 'HAIL_DAMAGE',
  
  // Other
  CHEMICAL_SPILL = 'CHEMICAL_SPILL',
  VANDALISM = 'VANDALISM',
  STRUCTURAL_DAMAGE = 'STRUCTURAL_DAMAGE'
}

export enum ScaleCapability {
  SINGLE_ROOM = 'SINGLE_ROOM',
  MULTIPLE_ROOMS = 'MULTIPLE_ROOMS',
  SINGLE_FLOOR = 'SINGLE_FLOOR',
  MULTIPLE_FLOORS_2_10 = 'MULTIPLE_FLOORS_2_10',
  HIGH_RISE_10_40 = 'HIGH_RISE_10_40',
  MEGA_HIGH_RISE_40_80 = 'MEGA_HIGH_RISE_40_80',
  EXTREME_80_PLUS = 'EXTREME_80_PLUS',
  ENTIRE_COMPLEX = 'ENTIRE_COMPLEX'
}

export enum GeographicCapability {
  LOCAL = 'LOCAL',           // Single city/region
  STATE_WIDE = 'STATE_WIDE', // Entire state
  NATIONAL = 'NATIONAL',     // All of Australia
  INTERNATIONAL = 'INTERNATIONAL', // PNG, Pacific islands
  OFFSHORE = 'OFFSHORE',     // Oil rigs, marine platforms
  REMOTE = 'REMOTE'          // Outback, isolated locations
}

// Service Coverage Matrix
export interface ServiceCoverageMatrix {
  propertyTypes: PropertyType[];
  propertyScales: PropertyScale[];
  disasterTypes: DisasterType[];
  scaleCapabilities: ScaleCapability[];
  geographicCapabilities: GeographicCapability[];
  emergencyResponse: boolean;
  afterHours: boolean;
  publicHolidays: boolean;
  weekendService: boolean;
}

// Specialized Capabilities
export interface SpecializedCapabilities {
  // High-risk environments
  hasOffshoreCapability: boolean;
  hasUndergroundCapability: boolean;
  hasHighRiseCapability: boolean;
  hasHazmatCapability: boolean;
  
  // Essential services
  hasHospitalCapability: boolean;
  hasDataCenterCapability: boolean;
  hasCleanRoomCapability: boolean;
  hasLaboratoryCapability: boolean;
  
  // Certifications
  hasAsbestosLicense: boolean;
  hasElectricalLicense: boolean;
  hasPlumbingLicense: boolean;
  hasStructuralEngineering: boolean;
  
  // Equipment
  hasCraneAccess: boolean;
  hasSpecializedDrying: boolean;
  hasIndustrialPumps: boolean;
  hasDecontaminationUnits: boolean;
}

// Contractor Onboarding Data
export interface ContractorOnboardingData {
  // Step 1: Business Information
  businessInfo: {
    companyName: string;
    tradingName?: string;
    abn: string;
    acn?: string;
    businessType: 'SOLE_TRADER' | 'PARTNERSHIP' | 'COMPANY' | 'TRUST';
    yearEstablished: number;
    numberOfEmployees: number;
    annualRevenue?: string;
    website?: string;
  };
  
  // Step 2: Contact Details
  contactDetails: {
    primaryContact: {
      firstName: string;
      lastName: string;
      position: string;
      email: string;
      mobile: string;
      landline?: string;
    };
    businessAddress: {
      street: string;
      suburb: string;
      state: string;
      postcode: string;
      country: string;
    };
    postalAddress?: {
      street: string;
      suburb: string;
      state: string;
      postcode: string;
      country: string;
    };
  };
  
  // Step 3: Insurance & Compliance
  insuranceCompliance: {
    publicLiability: {
      insurer: string;
      policyNumber: string;
      coverAmount: number;
      expiryDate: string;
      certificate: File | string;
    };
    professionalIndemnity?: {
      insurer: string;
      policyNumber: string;
      coverAmount: number;
      expiryDate: string;
      certificate: File | string;
    };
    workersCompensation: {
      insurer: string;
      policyNumber: string;
      expiryDate: string;
      certificate: File | string;
    };
    licenses: Array<{
      type: string;
      number: string;
      issuingBody: string;
      expiryDate: string;
      document: File | string;
    }>;
  };
  
  // Step 4: Qualifications & Certifications
  qualifications: {
    certifications: Array<{
      type: 'IICRC' | 'THERMOGRAPHY' | 'ASBESTOS' | 'HAZMAT' | 'OTHER';
      name: string;
      certificationNumber: string;
      issuingBody: string;
      issueDate: string;
      expiryDate?: string;
      document: File | string;
    }>;
    industryMemberships: Array<{
      organization: string;
      membershipNumber: string;
      memberSince: string;
    }>;
    staffQualifications: Array<{
      staffName: string;
      qualification: string;
      certificationNumber: string;
      expiryDate?: string;
    }>;
  };
  
  // Step 5: Service Coverage Matrix
  serviceCoverage: ServiceCoverageMatrix;
  specializedCapabilities: SpecializedCapabilities;
  
  // Step 6: Geographic Coverage
  geographicCoverage: {
    headquarters: {
      suburb: string;
      state: string;
      postcode: string;
      latitude: number;
      longitude: number;
    };
    serviceAreas: Array<{
      centerSuburb: string;
      radiusKm: number;
      specificSuburbs?: string[];
      excludedSuburbs?: string[];
    }>;
    remoteCapability: boolean;
    internationalCapability: boolean;
    travelSurcharge?: {
      applyAfterKm: number;
      ratePerKm: number;
    };
  };
  
  // Step 7: Background & Security Checks
  backgroundChecks: {
    consent: boolean;
    consentDate: string;
    primaryContactCheck: {
      status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
      completionDate?: string;
      verificationId?: string;
    };
    keyStaffChecks: Array<{
      staffName: string;
      status: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
      completionDate?: string;
      verificationId?: string;
    }>;
    businessVerification: {
      abnVerified: boolean;
      addressVerified: boolean;
      bankruptcyCheck: boolean;
      courtJudgments: boolean;
    };
  };
  
  // Payment & Terms
  paymentTerms: {
    leadPurchaseAgreement: boolean;
    paymentMethod: 'CREDIT_CARD' | 'DIRECT_DEBIT' | 'INVOICE';
    billingFrequency: 'PER_LEAD' | 'WEEKLY' | 'MONTHLY';
    territoryExclusivity?: {
      requested: boolean;
      areas: string[];
      premiumRate: number;
    };
  };
  
  // System Integration
  systemIntegration: {
    cleanClaimsAccount?: {
      accountId: string;
      apiKey?: string;
      syncEnabled: boolean;
    };
    preferredCommunication: 'EMAIL' | 'SMS' | 'APP' | 'API';
    notificationPreferences: {
      newLeads: boolean;
      urgentJobs: boolean;
      systemUpdates: boolean;
      marketing: boolean;
    };
  };
}

// Onboarding Progress Tracking
export interface OnboardingProgress {
  contractorId: string;
  currentStep: number;
  completedSteps: number[];
  startedAt: string;
  lastUpdated: string;
  completionPercentage: number;
  validationErrors: Record<string, string[]>;
  savedData: Partial<ContractorOnboardingData>;
  status: 'IN_PROGRESS' | 'PENDING_REVIEW' | 'APPROVED' | 'REJECTED' | 'SUSPENDED';
  reviewNotes?: string;
  approvedBy?: string;
  approvedAt?: string;
}

// Page Generation Configuration
export interface PageGenerationConfig {
  contractorId: string;
  templates: {
    useDefaults: boolean;
    customTemplates?: {
      serviceArea?: string;
      propertyType?: string;
      disasterType?: string;
      combined?: string;
    };
  };
  seoSettings: {
    businessName: string;
    primaryKeywords: string[];
    uniqueSellingPoints: string[];
    localModifiers: boolean;
    emergencyModifiers: boolean;
  };
  contentGeneration: {
    autoGenerate: boolean;
    aiEnhanced: boolean;
    includeTestimonials: boolean;
    includeBeforeAfter: boolean;
  };
  estimatedPageCount: number;
  generationStatus: 'PENDING' | 'IN_PROGRESS' | 'COMPLETED' | 'FAILED';
  generatedPages: Array<{
    url: string;
    title: string;
    type: string;
    createdAt: string;
  }>;
}