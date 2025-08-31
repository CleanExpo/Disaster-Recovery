/**
 * Comprehensive Inspection Report Template System
 * 
 * This template system provides standardized inspection reporting for all
 * disaster recovery work types. Reports follow IICRC standards and insurance
 * industry requirements while maintaining consistency across all NRP contractors.
 */

export interface InspectionPhoto {
  id: string;
  filename: string;
  description: string;
  category: 'overview' | 'detail' | 'moisture_reading' | 'equipment' | 'completion' | 'before_after';
  location: string;
  timestamp: Date;
  coordinates?: {
    latitude: number;
    longitude: number;
  };
  metadata?: {
    device: string;
    resolution: string;
    fileSize: number;
  };
}

export interface MoistureReading {
  id: string;
  location: string;
  materialType: 'drywall' | 'wood_framing' | 'concrete' | 'carpet' | 'hardwood' | 'other';
  readingType: 'pin' | 'pinless' | 'infrared';
  moistureContent: number;
  units: '%' | 'scale_reading';
  timestamp: Date;
  weather?: {
    temperature: number;
    humidity: number;
    barometricPressure?: number;
  };
  notes?: string;
}

export interface EnvironmentalReading {
  id: string;
  timestamp: Date;
  location: string;
  temperature: number; // Celsius
  relativeHumidity: number; // Percentage
  dewPoint: number; // Celsius
  barometricPressure?: number; // kPa
  airMovement?: number; // m/s
  notes?: string;
}

export interface DamageAssessment {
  area: string;
  damageType: 'water' | 'fire' | 'smoke' | 'mould' | 'storm' | 'biohazard' | 'vandalism';
  severity: 'minor' | 'moderate' | 'severe' | 'total_loss';
  affectedMaterials: Array<{
    material: string;
    extent: string;
    salvageable: boolean;
    recommendedAction: 'clean' | 'dry' | 'repair' | 'replace';
  }>;
  waterCategory?: 1 | 2 | 3;
  classOfLoss?: 1 | 2 | 3 | 4;
  estimatedAffectedArea: number; // square meters
  urgency: 'immediate' | 'within_24h' | 'within_48h' | 'scheduled';
}

export interface WorkRecommendation {
  id: string;
  category: 'mitigation' | 'restoration' | 'reconstruction' | 'cleaning' | 'monitoring';
  description: string;
  priority: 'critical' | 'high' | 'medium' | 'low';
  estimatedDuration: string;
  requiredEquipment: string[];
  safetyRequirements: string[];
  iicrcStandards: string[];
  estimatedCost?: {
    labour: number;
    materials: number;
    equipment: number;
    total: number;
  };
}

export interface InspectionReport {
  // Report Metadata
  id: string;
  reportNumber: string;
  contractorId: string;
  clientId: string;
  propertyId: string;
  inspectionDate: Date;
  reportDate: Date;
  inspectorName: string;
  inspectorCertifications: string[];
  
  // Property Information
  propertyDetails: {
    address: string;
    propertyType: 'residential' | 'commercial' | 'industrial' | 'institutional';
    constructionType: 'wood_frame' | 'concrete' | 'steel' | 'masonry' | 'mixed';
    approximateAge: number;
    occupancyStatus: 'occupied' | 'vacant' | 'partially_occupied';
    accessRestrictions?: string;
  };
  
  // Loss Information
  lossDetails: {
    dateOfLoss: Date;
    causeOfLoss: string;
    insuranceClaimNumber?: string;
    adjusterName?: string;
    adjusterContact?: string;
    firstNoticeDate?: Date;
    emergencyServicesContacted: boolean;
  };
  
  // Environmental Conditions
  environmentalConditions: {
    exteriorWeather: {
      temperature: number;
      humidity: number;
      conditions: string;
      recentWeatherEvents?: string;
    };
    interiorConditions: EnvironmentalReading[];
  };
  
  // Damage Assessment
  damageAssessment: DamageAssessment[];
  
  // Moisture Documentation
  moistureReadings: MoistureReading[];
  
  // Visual Documentation
  photos: InspectionPhoto[];
  
  // Work Recommendations
  workRecommendations: WorkRecommendation[];
  
  // Scope of Work
  scopeOfWork: {
    mitigationWork: string[];
    restorationWork: string[];
    reconstructionWork: string[];
    timeline: {
      mitigationStart: Date;
      mitigationComplete: Date;
      restorationStart: Date;
      restorationComplete: Date;
      finalCompletion: Date;
    };
    excludedWork?: string[];
    assumptionsAndLimitations: string[];
  };
  
  // Safety and Health
  safetyConsiderations: {
    immediateHazards: string[];
    ongoingRisks: string[];
    requiredPPE: string[];
    specialPrecautions: string[];
    exposureRisks?: string[];
  };
  
  // Regulatory Compliance
  complianceRequirements: {
    applicableStandards: string[];
    requiredPermits: string[];
    inspectionRequirements: string[];
    wasteDisposalRequirements: string[];
  };
  
  // Quality Assurance
  qualityAssurance: {
    preExistingConditions: string[];
    protectionMeasures: string[];
    monitoringRequirements: string[];
    completionCriteria: string[];
  };
  
  // Client Communication
  clientCommunication: {
    clientPresent: boolean;
    clientConcerns: string[];
    explanationProvided: string[];
    clientQuestions: Array<{
      question: string;
      answer: string;
    }>;
    clientAcknowledgment: boolean;
  };
  
  // Report Summary
  summary: {
    keyFindings: string[];
    criticalIssues: string[];
    recommendedImmediateActions: string[];
    overallAssessment: 'minor_damage' | 'moderate_damage' | 'major_damage' | 'total_loss';
    estimatedProjectDuration: string;
    followUpRequired: boolean;
  };
  
  // Signatures and Certifications
  certifications: {
    inspectorSignature: string;
    inspectorDate: Date;
    clientSignature?: string;
    clientDate?: Date;
    adjusterSignature?: string;
    adjusterDate?: Date;
    certificationStatement: string;
  };
}

// Standard report templates for different work types
export const WATER_DAMAGE_TEMPLATE: Partial<InspectionReport> = {
  complianceRequirements: {
    applicableStandards: [
      'IICRC S500 - Water Damage Restoration Standard',
      'AS/NZS 3666.1 - Air-handling and water systems in buildings',
      'Work Health and Safety Act 2011',
      'Building Code of Australia'
    ],
    requiredPermits: [],
    inspectionRequirements: ['Final moisture verification', 'Indoor air quality testing if required'],
    wasteDisposalRequirements: ['Contaminated materials disposal per local regulations']
  },
  safetyConsiderations: {
    immediateHazards: ['Electrical hazards', 'Structural instability', 'Contaminated water'],
    ongoingRisks: ['Mould growth', 'Secondary water damage', 'Indoor air quality'],
    requiredPPE: ['Waterproof boots', 'Gloves', 'Eye protection'],
    specialPrecautions: ['GFCI protection for all electrical equipment', 'Moisture monitoring during drying']
  }
};

export const FIRE_DAMAGE_TEMPLATE: Partial<InspectionReport> = {
  complianceRequirements: {
    applicableStandards: [
      'IICRC S520 - Fire and Smoke Damage Restoration Standard',
      'AS/NZS 3666.2 - Air-handling and water systems in buildings',
      'Work Health and Safety Act 2011',
      'Building Code of Australia'
    ],
    requiredPermits: ['Building permit for structural repairs'],
    inspectionRequirements: ['Structural engineering assessment if required', 'Indoor air quality testing'],
    wasteDisposalRequirements: ['Hazardous materials disposal', 'Asbestos testing and disposal if applicable']
  },
  safetyConsiderations: {
    immediateHazards: ['Structural collapse risk', 'Toxic combustion products', 'Asbestos exposure'],
    ongoingRisks: ['Air quality issues', 'Hidden structural damage', 'Electrical system damage'],
    requiredPPE: ['Respiratory protection', 'Protective clothing', 'Safety boots'],
    specialPrecautions: ['Air quality monitoring', 'Structural stability verification']
  }
};

export const MOULD_REMEDIATION_TEMPLATE: Partial<InspectionReport> = {
  complianceRequirements: {
    applicableStandards: [
      'IICRC S520 - Mould Remediation Standard',
      'AS/NZS 3666.1 - Air-handling and water systems in buildings',
      'Work Health and Safety Act 2011',
      'Australian Guidelines for Prevention and Control of Infection in Healthcare'
    ],
    requiredPermits: [],
    inspectionRequirements: ['Pre-remediation air sampling', 'Post-remediation clearance testing'],
    wasteDisposalRequirements: ['Contaminated materials disposal', 'HEPA vacuum waste disposal']
  },
  safetyConsiderations: {
    immediateHazards: ['Mould spore exposure', 'Contaminated materials'],
    ongoingRisks: ['Cross-contamination', 'Incomplete remediation'],
    requiredPPE: ['N95 or P2 respirator', 'Disposable coveralls', 'Gloves', 'Eye protection'],
    specialPrecautions: ['Containment barriers', 'Negative air pressure', 'Air filtration']
  }
};

// Report generation functions
export function generateReportNumber(): string {
  const now = new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, '0');
  const day = String(now.getDate()).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
  return `NRP-${year}${month}${day}-${random}`;
}

export function createInspectionReport(
  contractorId: string,
  clientId: string,
  propertyId: string,
  workType: 'water' | 'fire' | 'mould' | 'storm' | 'biohazard',
  inspectorName: string,
  inspectorCertifications: string[]
): Partial<InspectionReport> {
  const baseTemplate: Partial<InspectionReport> = {
    id: `inspection_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    reportNumber: generateReportNumber(),
    contractorId,
    clientId,
    propertyId,
    inspectionDate: new Date(),
    reportDate: new Date(),
    inspectorName,
    inspectorCertifications,
    environmentalConditions: {
      exteriorWeather: {
        temperature: 0,
        humidity: 0,
        conditions: '' },
      interiorConditions: []
    },
    damageAssessment: [],
    moistureReadings: [],
    photos: [],
    workRecommendations: [],
    clientCommunication: {
      clientPresent: false,
      clientConcerns: [],
      explanationProvided: [],
      clientQuestions: [],
      clientAcknowledgment: false
    },
    certifications: {
      inspectorSignature: '',
      inspectorDate: new Date(),
      certificationStatement: 'I certify that this inspection was conducted in accordance with applicable IICRC standards and industry best practices. All findings and recommendations are based on visible conditions at the time of inspection.'
    }
  };

  // Apply work-specific templates
  let workTemplate: Partial<InspectionReport> = {};
  switch (workType) {
    case 'water':
      workTemplate = WATER_DAMAGE_TEMPLATE;
      break;
    case 'fire':
      workTemplate = FIRE_DAMAGE_TEMPLATE;
      break;
    case 'mould':
      workTemplate = MOULD_REMEDIATION_TEMPLATE;
      break;
  }

  return {
    ...baseTemplate,
    ...workTemplate
  };
}

// Photo documentation requirements
export const PHOTO_REQUIREMENTS = {
  minimum_photos: {
    water_damage: 12,
    fire_damage: 15,
    mould_remediation: 10,
    storm_damage: 8,
    biohazard: 20
  },
  required_angles: [
    'Wide overview of affected area',
    'Close-up details of damage',
    'Moisture meter readings',
    'Equipment placement',
    'Access points and egress',
    'Adjacent unaffected areas for comparison'
  ],
  quality_standards: {
    minimum_resolution: '1920x1080',
    file_format: 'JPEG',
    compression_quality: 'High (90%+)',
    metadata_required: true,
    gps_coordinates: 'Recommended'
  }
};

// Moisture reading requirements
export const MOISTURE_REQUIREMENTS = {
  frequency: {
    initial_assessment: 'Every affected area',
    daily_monitoring: 'All monitored locations',
    final_verification: 'All previously wet locations'
  },
  documentation: {
    location_description: 'Specific room and wall/floor location',
    material_identification: 'Type of material being tested',
    meter_calibration: 'Daily calibration verification required',
    environmental_conditions: 'Temperature and humidity at time of reading'
  },
  target_levels: {
    wood_framing: '6-12% depending on species and location',
    drywall: 'Less than 1% on moisture meter scale',
    concrete: 'Baseline comparison required',
    carpet: 'Complete removal if Category 2/3 water'
  }
};

// Quality control checklist
export const QUALITY_CONTROL_CHECKLIST = [
  'All required photos captured with proper descriptions',
  'Moisture readings documented with location details',
  'Environmental conditions recorded',
  'Safety hazards identified and documented',
  'IICRC standards referenced appropriately',
  'Work recommendations prioritized correctly',
  'Client communication documented',
  'Regulatory requirements identified',
  'Inspector certifications current and relevant',
  'Report reviewed for accuracy and completeness'
];

export default {
  InspectionReport,
  WATER_DAMAGE_TEMPLATE,
  FIRE_DAMAGE_TEMPLATE,
  MOULD_REMEDIATION_TEMPLATE,
  generateReportNumber,
  createInspectionReport,
  PHOTO_REQUIREMENTS,
  MOISTURE_REQUIREMENTS,
  QUALITY_CONTROL_CHECKLIST
};