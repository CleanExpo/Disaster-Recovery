/**
 * Contractor Skill Categorization & Certification Framework
 * Defines specialised training requirements and service limitations
 */

// Base contractor certification levels
export enum ContractorTier {
  BRONZE = 'bronze',      // Basic IICRC certifications
  SILVER = 'silver',      // Advanced certifications + specializations
  GOLD = 'gold',          // Multiple specializations + leadership
  PLATINUM = 'platinum'   // Master level + regulatory compliance
}

// Specialised skill categories
export enum SkillCategory {
  THERMAL_IMAGING = 'thermal_imaging',
  MOISTURE_SCIENCE = 'moisture_science',
  HAZMAT_RESPONSE = 'hazmat_response',
  STRUCTURAL_ANALYSIS = 'structural_analysis',
  ELECTRICAL_SAFETY = 'electrical_safety',
  REGULATORY_COMPLIANCE = 'regulatory_compliance'
}

// Certification authorities
export enum CertificationAuthority {
  IICRC = 'iicrc',
  ASNT = 'asnt',           // American Society for Nondestructive Testing
  EPA = 'epa',
  OSHA = 'osha',
  STATE_LICENSE = 'state_license',
  UNIVERSITY = 'university'
}

// Individual certifications
export interface Certification {
  id: string;
  name: string;
  code: string;
  authority: CertificationAuthority;
  category: SkillCategory;
  level: 1 | 2 | 3;        // 1=Basic, 2=Advanced, 3=Master
  expiryMonths: number;
  description: string;
  prerequisite?: string[];
  nationalAvailability: 'common' | 'limited' | 'rare'; // How many contractors have this
}

// Pre-defined certifications
export const CERTIFICATIONS: Record<string, Certification> = {
  // IICRC Basic Certifications (Common - Most contractors)
  WRT: {
    id: 'wrt',
    name: 'Water Damage Restoration Technician',
    code: 'WRT',
    authority: CertificationAuthority.IICRC,
    category: SkillCategory.MOISTURE_SCIENCE,
    level: 1,
    expiryMonths: 48,
    description: 'Basic water damage restoration principles',
    nationalAvailability: 'common'
  },
  
  ASD: {
    id: 'asd',
    name: 'Applied Structural Drying',
    code: 'ASD',
    authority: CertificationAuthority.IICRC,
    category: SkillCategory.MOISTURE_SCIENCE,
    level: 2,
    expiryMonths: 60,
    description: 'Advanced structural drying techniques and psychrometrics',
    prerequisite: ['wrt'],
    nationalAvailability: 'common'
  },

  // Thermal Imaging Specializations (Rare - ~15 contractors)
  THERMOGRAPHY_L1: {
    id: 'thermo_l1',
    name: 'Level 1 Thermography Certification',
    code: 'TC-L1',
    authority: CertificationAuthority.ASNT,
    category: SkillCategory.THERMAL_IMAGING,
    level: 2,
    expiryMonths: 60,
    description: 'Certified thermal imaging analysis for electrical and building systems',
    nationalAvailability: 'rare'
  },

  THERMOGRAPHY_L2: {
    id: 'thermo_l2',
    name: 'Level 2 Thermography Certification',
    code: 'TC-L2',
    authority: CertificationAuthority.ASNT,
    category: SkillCategory.THERMAL_IMAGING,
    level: 3,
    expiryMonths: 60,
    description: 'Advanced quantitative thermal analysis and reporting',
    prerequisite: ['thermo_l1'],
    nationalAvailability: 'rare'
  },

  // Hazmat & Regulatory (Limited)
  HAZWOPER_40: {
    id: 'hazwoper_40',
    name: 'HAZWOPER 40-Hour Training',
    code: 'HAZWOPER-40',
    authority: CertificationAuthority.OSHA,
    category: SkillCategory.HAZMAT_RESPONSE,
    level: 2,
    expiryMonths: 12,
    description: 'Hazardous waste operations and emergency response',
    nationalAvailability: 'limited'
  },

  ASBESTOS_ASSESSOR: {
    id: 'asbestos_assessor',
    name: 'Licensed Asbestos Assessor',
    code: 'LAA',
    authority: CertificationAuthority.STATE_LICENSE,
    category: SkillCategory.REGULATORY_COMPLIANCE,
    level: 3,
    expiryMonths: 36,
    description: 'State-licensed asbestos identification and assessment',
    nationalAvailability: 'limited'
  }
};

// Service definitions with skill requirements
export interface ServiceRequirement {
  serviceId: string;
  name: string;
  description: string;
  skillLevel: 'standard' | 'specialised' | 'licensed';
  requiredCertifications: string[];
  optionalCertifications?: string[];
  limitations: string[];
  averageNationalAvailability: number; // % of contractors who can perform this
}

export const SERVICE_REQUIREMENTS: Record<string, ServiceRequirement> = {
  BASIC_MOISTURE_DETECTION: {
    serviceId: 'basic_moisture',
    name: 'Basic Moisture Detection with Thermal Camera',
    description: 'Standard moisture identification using thermal imaging as a tool',
    skillLevel: 'standard',
    requiredCertifications: ['wrt'],
    limitations: [
      'Visual temperature differences only',
      'Cannot provide quantitative analysis',
      'Not suitable for electrical system analysis',
      'Limited to moisture identification'
    ],
    averageNationalAvailability: 95
  },

  ELECTRICAL_HOT_SPOT_ANALYSIS: {
    serviceId: 'electrical_thermal',
    name: 'Electrical Hot Spot Analysis',
    description: 'Certified thermal analysis of electrical components and systems',
    skillLevel: 'specialised',
    requiredCertifications: ['thermo_l1'],
    optionalCertifications: ['thermo_l2'],
    limitations: [
      'Requires Level 1 Thermography minimum',
      'May require licensed electrician partnership for repairs',
      'Not all patterns indicate immediate danger',
      'Environmental conditions affect accuracy'
    ],
    averageNationalAvailability: 3
  },

  BUILDING_ENVELOPE_ANALYSIS: {
    serviceId: 'building_envelope',
    name: 'Quantitative Building Envelope Assessment',
    description: 'Professional thermal analysis for energy audits and building performance',
    skillLevel: 'specialised',
    requiredCertifications: ['thermo_l1'],
    optionalCertifications: ['thermo_l2'],
    limitations: [
      'Weather conditions must be optimal',
      'Requires minimum temperature differential',
      'Building must be conditioned for accurate results',
      'Professional report interpretation required'
    ],
    averageNationalAvailability: 5
  },

  ASBESTOS_ASSESSMENT: {
    serviceId: 'asbestos_assessment',
    name: 'Asbestos Material Assessment',
    description: 'Licensed identification and assessment of asbestos-containing materials',
    skillLevel: 'licensed',
    requiredCertifications: ['asbestos_assessor'],
    limitations: [
      'Requires state-specific licensing',
      'Cannot perform removal (separate license)',
      'Laboratory analysis required for confirmation',
      'Strict regulatory reporting requirements'
    ],
    averageNationalAvailability: 15
  }
};

// Contractor skill profile
export interface ContractorSkillProfile {
  contractorId: string;
  tier: ContractorTier;
  certifications: {
    certificationId: string;
    obtainedDate: Date;
    expiryDate: Date;
    status: 'active' | 'expired' | 'pending_renewal';
  }[];
  availableServices: string[]; // Service IDs they can perform
  specializations: SkillCategory[];
  limitationsAcknowledged: boolean; // Must acknowledge services they cannot perform
  lastSkillAssessment: Date;
  kpiMetrics: ContractorSkillKPIs;
}

// KPI tracking for skilled services
export interface ContractorSkillKPIs {
  certificationCompliance: number;      // % of certifications current
  specializedServiceRevenue: number;    // Revenue from specialist services
  clientEducationScore: number;         // How well they explain limitations
  continuousLearningCredits: number;    // Annual training completed
  crossReferralSuccess: number;         // % successful referrals to specialists
  qualityScoreBySkillLevel: {
    standard: number;
    specialised: number;
    licensed: number;
  };
}

// Client matching algorithm interface
export interface ServiceMatchingCriteria {
  requiredService: string;
  location: string;
  urgency: 'emergency' | 'standard' | 'scheduled';
  budgetRange: 'economy' | 'standard' | 'premium';
  certificationPreference: 'required' | 'preferred' | 'optional';
}

export interface ServiceMatchResult {
  contractorId: string;
  matchScore: number;           // 0-100 compatibility score
  certificationLevel: 'meets' | 'exceeds' | 'insufficient';
  serviceQuality: 'standard' | 'specialised' | 'expert';
  riskFactors: string[];        // Potential limitations or risks
  alternatives?: {              // If current contractor insufficient
    referralContractor: string;
    reason: string;
  };
}

// Marketing content categorization
export interface TechnicalContentPillar {
  pillarId: string;
  title: string;
  category: 'education' | 'certification' | 'service_limits' | 'quality_assurance';
  targetAudience: 'clients' | 'contractors' | 'industry' | 'seo';
  skillCategory: SkillCategory;
  keyMessages: string[];
  seoKeywords: string[];
  contentType: 'blog' | 'landing_page' | 'faq' | 'guide';
}

// Utility functions for skill assessment
export class SkillAssessmentEngine {
  static canPerformService(
    contractorCertifications: string[], 
    serviceId: string
  ): boolean {
    const service = SERVICE_REQUIREMENTS[serviceId];
    if (!service) return false;
    
    return service.requiredCertifications.every(cert => 
      contractorCertifications.includes(cert)
    );
  }

  static getServiceLimitations(serviceId: string): string[] {
    return SERVICE_REQUIREMENTS[serviceId]?.limitations || [];
  }

  static calculateSpecializationScore(profile: ContractorSkillProfile): number {
    const specializedCerts = profile.certifications.filter(cert => 
      CERTIFICATIONS[cert.certificationId]?.nationalAvailability === 'rare'
    ).length;
    
    const totalCerts = profile.certifications.length;
    return totalCerts > 0 ? (specializedCerts / totalCerts) * 100 : 0;
  }

  static generateClientEducationContent(serviceId: string): {
    whatToExpect: string[];
    questionsToAsk: string[];
    redFlags: string[];
  } {
    const service = SERVICE_REQUIREMENTS[serviceId];
    if (!service) return { whatToExpect: [], questionsToAsk: [], redFlags: [] };

    return {
      whatToExpected: [
        `Service requires ${service.skillLevel} level technician`,
        `Available from ${service.averageNationalAvailability}% of contractors`,
        `Certification requirements: ${service.requiredCertifications.join(', ')}`
      ],
      questionsToAsk: [
        'Do you hold the required certifications for this service?',
        'Can you provide examples of similar work?',
        'What are the limitations of this service?',
        'Will you need to refer any aspects to specialists?'
      ],
      redFlags: [
        'Claims all technicians can perform specialised services',
        'Cannot explain certification requirements',
        'Promises results beyond service limitations',
        'No mention of when specialist referral is needed'
      ]
    };
  }
}