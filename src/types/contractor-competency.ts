/**
 * Contractor Competency Testing Framework
 * Comprehensive assessment for Australian disaster recovery contractors
 */

export interface CompetencyTest {
  id: string;
  category: CompetencyCategory;
  subcategory: string;
  question: string;
  questionType: 'MULTIPLE_CHOICE' | 'TRUE_FALSE' | 'SCENARIO' | 'WRITTEN' | 'CALCULATION';
  options?: string[];
  correctAnswer: string | string[];
  explanation: string;
  reference: string;
  difficulty: 'BASIC' | 'INTERMEDIATE' | 'ADVANCED';
  points: number;
  timeLimit?: number; // seconds
}

export enum CompetencyCategory {
  AUSTRALIAN_CONSUMER_LAW = 'AUSTRALIAN_CONSUMER_LAW',
  CONTRACTOR_BUSINESS_LAW = 'CONTRACTOR_BUSINESS_LAW',
  INSURANCE_LIABILITY = 'INSURANCE_LIABILITY',
  TAX_GST = 'TAX_GST',
  INDUSTRY_STANDARDS = 'INDUSTRY_STANDARDS',
  WHS_SAFETY = 'WHS_SAFETY',
  SPECIAL_LICENSES = 'SPECIAL_LICENSES',
  ETHICAL_CONDUCT = 'ETHICAL_CONDUCT',
  TECHNICAL_KNOWLEDGE = 'TECHNICAL_KNOWLEDGE',
  DOCUMENTATION = 'DOCUMENTATION'
}

export interface CompetencyAssessment {
  contractorId: string;
  assessmentDate: string;
  
  // Test Results
  testScores: {
    category: CompetencyCategory;
    score: number;
    totalPossible: number;
    passed: boolean;
    attemptNumber: number;
  }[];
  
  overallScore: number;
  overallPercentage: number;
  passed: boolean;
  
  // Time Tracking
  timeStarted: string;
  timeCompleted?: string;
  totalTimeMinutes?: number;
  
  // Certification
  certificateNumber?: string;
  certificateExpiry?: string;
  
  // Re-assessment Requirements
  reassessmentRequired: boolean;
  reassessmentDueDate?: string;
  failedCategories?: CompetencyCategory[];
}

export interface OnboardingModule {
  day: number;
  title: string;
  description: string;
  objectives: string[];
  
  components: {
    videos?: {
      title: string;
      url: string;
      duration: number; // minutes
      mandatory: boolean;
    }[];
    
    readings?: {
      title: string;
      content: string;
      estimatedTime: number; // minutes
      source: string;
    }[];
    
    assignments?: {
      title: string;
      description: string;
      type: 'WRITTEN' | 'PRACTICAL' | 'UPLOAD' | 'QUIZ';
      requirements: string[];
      submissionFormat: string;
    }[];
    
    documentsRequired?: {
      name: string;
      description: string;
      format: string[];
      maxSize: number; // MB
      verificationRequired: boolean;
    }[];
  };
  
  completionCriteria: {
    minVideoWatchTime: number; // percentage
    assignmentsCompleted: boolean;
    documentsUploaded: boolean;
    quizScore?: number; // minimum percentage
  };
  
  estimatedHours: number;
  mustCompleteBy: number; // day number
}

export interface ProofOfWork {
  workType: string; // e.g., 'WATER_DAMAGE', 'MOULD_REMEDIATION'
  
  claims: Array<{
    claimNumber: string;
    clientName: string; // Can be anonymized
    propertyType: string;
    disasterType: string;
    completionDate: string;
    
    documentation: {
      beforePhotos: string[];
      afterPhotos: string[];
      scopeOfWork: string;
      invoiceNumber?: string;
      clientTestimonial?: string;
    };
    
    technicalDetails: {
      equipmentUsed: string[];
      techniques: string[];
      dryingGoals?: {
        materialType: string;
        moistureContent: {
          initial: number;
          target: number;
          achieved: number;
        };
      }[];
      certificationApplied: string[]; // e.g., 'IICRC S500', 'AS/NZS 4360'
    };
    
    verification: {
      status: 'PENDING' | 'VERIFIED' | 'REJECTED';
      verifiedBy?: string;
      verificationDate?: string;
      notes?: string;
    };
  }>;
  
  minimumClaimsRequired: number; // 5 per work type
  allClaimsVerified: boolean;
}

export interface CertificationRequirement {
  category: string;
  certification: string;
  issuingBody: string;
  required: boolean;
  
  forWorkTypes: string[];
  
  verification: {
    documentUploaded: boolean;
    documentUrl?: string;
    certificateNumber?: string;
    issueDate?: string;
    expiryDate?: string;
    verificationStatus: 'PENDING' | 'VERIFIED' | 'EXPIRED' | 'INVALID';
  };
}

// Standard certification requirements
export const REQUIRED_CERTIFICATIONS: CertificationRequirement[] = [
  {
    category: 'WATER_DAMAGE',
    certification: 'Water Damage Restoration Technician (WRT)',
    issuingBody: 'IICRC',
    required: true,
    forWorkTypes: ['WATER_DAMAGE', 'FLOOD', 'BURST_PIPES'],
    verification: { documentUploaded: false, verificationStatus: 'PENDING' }
  },
  {
    category: 'WATER_DAMAGE',
    certification: 'Applied Structural Drying (ASD)',
    issuingBody: 'IICRC',
    required: false,
    forWorkTypes: ['WATER_DAMAGE', 'FLOOD'],
    verification: { documentUploaded: false, verificationStatus: 'PENDING' }
  },
  {
    category: 'MOULD',
    certification: 'Applied Microbial Remediation Technician (AMRT)',
    issuingBody: 'IICRC',
    required: true,
    forWorkTypes: ['MOULD', 'BACTERIA', 'VIRUS'],
    verification: { documentUploaded: false, verificationStatus: 'PENDING' }
  },
  {
    category: 'FIRE',
    certification: 'Fire and Smoke Restoration Technician (FSRT)',
    issuingBody: 'IICRC',
    required: true,
    forWorkTypes: ['FIRE_DAMAGE', 'SMOKE_DAMAGE', 'BUSHFIRE'],
    verification: { documentUploaded: false, verificationStatus: 'PENDING' }
  },
  {
    category: 'SAFETY',
    certification: 'White Card (General Construction Induction)',
    issuingBody: 'Safe Work Australia',
    required: true,
    forWorkTypes: ['ALL'],
    verification: { documentUploaded: false, verificationStatus: 'PENDING' }
  },
  {
    category: 'SAFETY',
    certification: 'Working at Heights',
    issuingBody: 'RTO',
    required: false,
    forWorkTypes: ['STORM_DAMAGE', 'STRUCTURAL_DAMAGE'],
    verification: { documentUploaded: false, verificationStatus: 'PENDING' }
  },
  {
    category: 'SAFETY',
    certification: 'Confined Space Entry',
    issuingBody: 'RTO',
    required: false,
    forWorkTypes: ['SEWAGE_OVERFLOW', 'WATER_DAMAGE'],
    verification: { documentUploaded: false, verificationStatus: 'PENDING' }
  },
  {
    category: 'SAFETY',
    certification: 'Asbestos Awareness',
    issuingBody: 'RTO',
    required: true,
    forWorkTypes: ['ALL'],
    verification: { documentUploaded: false, verificationStatus: 'PENDING' }
  },
  {
    category: 'CHILDREN',
    certification: 'Working with Children Check',
    issuingBody: 'State Government',
    required: false,
    forWorkTypes: ['INSTITUTIONAL'],
    verification: { documentUploaded: false, verificationStatus: 'PENDING' }
  }
];

export interface PaymentStructure {
  applicationFee: {
    amount: 275;
    includes: [
      'Competency testing access',
      'Onboarding pack',
      'Pre-requisite materials',
      'Initial assessment'
    ];
    refundable: false;
  };
  
  backgroundChecks: {
    nationalPoliceCheck: 85;
    bankruptcyCheck: 45;
    courtJudgmentCheck: 35;
    total: 165;
    paidBy: 'CONTRACTOR';
  };
  
  joiningFee: {
    amount: 2200;
    includes: [
      'Contractor portal setup',
      'Training video access',
      'CRM integration',
      'Initial SEO page generation',
      'Territory allocation',
      'Marketing materials'
    ];
    paymentTerms: 'DUE_ON_APPROVAL';
  };
  
  subscription: {
    standardMonthly: 495;
    
    promotionalPeriod: {
      month1: {
        discount: 100; // percentage
        amount: 0;
        description: 'First month free'
      };
      month2: {
        discount: 60; // percentage
        amount: 198;
        description: '60% off second month'
      };
      month3: {
        discount: 50; // percentage
        amount: 247.50;
        description: '50% off third month'
      };
    };
    
    month4Onwards: 495;
    
    includes: [
      'Unlimited leads in territory',
      'CRM access',
      'Ongoing training',
      'SEO page maintenance',
      'Support access'
    ];
  };
  
  leadPricing: {
    model: 'SUBSCRIPTION_BASED';
    additionalLeadCost: 0; // Included in subscription
    territoryExclusivity: {
      available: true;
      premiumRate: 1.5; // multiplier on subscription
    };
  };
}

export interface FraudDetection {
  documentVerification: {
    plagiarismCheck: {
      enabled: true;
      threshold: 20; // percentage
      tool: 'AI_POWERED';
    };
    
    authenticity: {
      certificateVerification: boolean;
      crossReferenceWithIssuer: boolean;
      documentForensics: boolean;
    };
    
    completeness: {
      requiredFields: string[];
      minimumQuality: 'HIGH';
      readabilityCheck: boolean;
    };
  };
  
  identityVerification: {
    documentTypes: ['DRIVERS_LICENSE', 'PASSPORT', 'PROOF_OF_AGE'];
    faceMatch: boolean;
    addressVerification: boolean;
  };
  
  businessVerification: {
    abnValidation: boolean;
    asicSearch: boolean;
    bankruptcyCheck: boolean;
    courtJudgments: boolean;
  };
  
  riskScoring: {
    factors: [
      'DOCUMENT_QUALITY',
      'BUSINESS_HISTORY',
      'FINANCIAL_STABILITY',
      'CERTIFICATION_VALIDITY',
      'REFERENCE_CHECKS'
    ];
    
    scoreThresholds: {
      automatic_approval: 90;
      manual_review: 70;
      automatic_rejection: 50;
    };
  };
}

// Inspection Report Template Requirements
export interface InspectionReportTemplate {
  sections: {
    header: {
      companyDetails: boolean;
      contractorLicense: boolean;
      insuranceDetails: boolean;
      reportNumber: boolean;
      date: boolean;
    };
    
    propertyDetails: {
      address: boolean;
      propertyType: boolean;
      ownerDetails: boolean;
      insurerDetails: boolean;
      claimNumber: boolean;
    };
    
    damageAssessment: {
      causeOfLoss: boolean;
      dateOfLoss: boolean;
      affectedAreas: boolean;
      categoryOfWater?: boolean; // Cat 1, 2, or 3
      structuralDamage: boolean;
      contentsDamage: boolean;
    };
    
    moistureMapping: {
      readingsTable: boolean;
      floorPlan: boolean;
      photoDocumentation: boolean;
      equipmentUsed: boolean;
    };
    
    scopeOfWork: {
      immediateActions: boolean;
      mitigationSteps: boolean;
      restorationProcess: boolean;
      timeline: boolean;
      exclusions: boolean;
    };
    
    costing: {
      lineItems: boolean;
      laborRates: boolean;
      equipmentCharges: boolean;
      totalEstimate: boolean;
      paymentTerms: boolean;
    };
    
    certifications: {
      contractorSignature: boolean;
      contractorLicense: boolean;
      iicrcCertification: boolean;
      dateAndTime: boolean;
    };
  };
  
  requiredPhotos: {
    overview: number; // minimum 4
    damageCloseups: number; // minimum 8
    moistureReadings: number; // minimum 4
    equipmentSetup: number; // minimum 2
    preRestoration: number; // minimum 10
    postRestoration: number; // minimum 10
  };
  
  formatRequirements: {
    fileFormat: 'PDF';
    maxFileSize: 25; // MB
    photoQuality: 'HIGH'; // minimum 1080p
    includeMetadata: boolean;
  };
}