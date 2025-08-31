/**
 * Inspection Report Submission Requirements and Validation
 * 
 * This system defines the standards and requirements for submitting
 * inspection reports through the NRP contractor platform.
 */

import { InspectionReport, InspectionPhoto, MoistureReading } from './inspection-report-template';

export interface SubmissionRequirement {
  field: string;
  required: boolean;
  minimumCount?: number;
  validationRules: ValidationRule[];
  errorMessage: string;
}

export interface ValidationRule {
  type: 'required' | 'minLength' | 'maxLength' | 'pattern' | 'custom' | 'fileSize' | 'fileType';
  value?: any;
  customValidator?: (value: any) => boolean;
  message: string;
}

export interface SubmissionValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  warnings: ValidationWarning[];
  completionScore: number; // 0-100
}

export interface ValidationError {
  field: string;
  message: string;
  severity: 'critical' | 'major' | 'minor';
}

export interface ValidationWarning {
  field: string;
  message: string;
  recommendation: string;
}

// Work type specific requirements
export const SUBMISSION_REQUIREMENTS: Record<string, SubmissionRequirement[]> = {
  water_damage: [
    {
      field: 'propertyDetails',
      required: true,
      validationRules: [
        { type: 'required', message: 'Property details are required' }
      ],
      errorMessage: 'Complete property information must be provided'
    },
    {
      field: 'lossDetails.dateOfLoss',
      required: true,
      validationRules: [
        { type: 'required', message: 'Date of loss is required' },
        { 
          type: 'custom', 
          customValidator: (date: Date) => date <= new Date(),
          message: 'Date of loss cannot be in the future'
        }
      ],
      errorMessage: 'Valid date of loss is required'
    },
    {
      field: 'lossDetails.causeOfLoss',
      required: true,
      validationRules: [
        { type: 'required', message: 'Cause of loss is required' },
        { type: 'minLength', value: 10, message: 'Cause of loss description must be at least 10 characters' }
      ],
      errorMessage: 'Detailed cause of loss description required'
    },
    {
      field: 'moistureReadings',
      required: true,
      minimumCount: 5,
      validationRules: [
        { 
          type: 'custom',
          customValidator: (readings: MoistureReading[]) => readings.length >= 5,
          message: 'Minimum 5 moisture readings required for water damage'
        }
      ],
      errorMessage: 'At least 5 moisture readings required for water damage assessment'
    },
    {
      field: 'photos',
      required: true,
      minimumCount: 12,
      validationRules: [
        {
          type: 'custom',
          customValidator: (photos: InspectionPhoto[]) => photos.length >= 12,
          message: 'Minimum 12 photos required for water damage documentation'
        }
      ],
      errorMessage: 'At least 12 photos required for comprehensive water damage documentation'
    },
    {
      field: 'damageAssessment',
      required: true,
      minimumCount: 1,
      validationRules: [
        { type: 'required', message: 'Damage assessment is required' }
      ],
      errorMessage: 'Complete damage assessment required'
    },
    {
      field: 'workRecommendations',
      required: true,
      minimumCount: 3,
      validationRules: [
        {
          type: 'custom',
          customValidator: (recommendations: any[]) => recommendations.length >= 3,
          message: 'Minimum 3 work recommendations required'
        }
      ],
      errorMessage: 'At least 3 specific work recommendations required'
    },
    {
      field: 'safetyConsiderations.immediateHazards',
      required: true,
      validationRules: [
        { type: 'required', message: 'Safety hazards assessment is required' }
      ],
      errorMessage: 'Safety hazards must be identified and documented'
    }
  ],

  fire_damage: [
    {
      field: 'propertyDetails',
      required: true,
      validationRules: [
        { type: 'required', message: 'Property details are required' }
      ],
      errorMessage: 'Complete property information must be provided'
    },
    {
      field: 'lossDetails.emergencyServicesContacted',
      required: true,
      validationRules: [
        { type: 'required', message: 'Emergency services contact status required for fire damage' }
      ],
      errorMessage: 'Fire department contact confirmation required'
    },
    {
      field: 'photos',
      required: true,
      minimumCount: 15,
      validationRules: [
        {
          type: 'custom',
          customValidator: (photos: InspectionPhoto[]) => photos.length >= 15,
          message: 'Minimum 15 photos required for fire damage documentation'
        }
      ],
      errorMessage: 'At least 15 photos required for fire damage documentation'
    },
    {
      field: 'safetyConsiderations.requiredPPE',
      required: true,
      validationRules: [
        { type: 'required', message: 'PPE requirements must be specified for fire damage' }
      ],
      errorMessage: 'Personal protective equipment requirements must be documented'
    },
    {
      field: 'complianceRequirements.applicableStandards',
      required: true,
      validationRules: [
        {
          type: 'custom',
          customValidator: (standards: string[]) => standards.includes('IICRC S520'),
          message: 'IICRC S520 standard must be referenced for fire damage'
        }
      ],
      errorMessage: 'IICRC S520 Fire and Smoke Damage Standard must be referenced'
    }
  ],

  mould_remediation: [
    {
      field: 'photos',
      required: true,
      minimumCount: 10,
      validationRules: [
        {
          type: 'custom',
          customValidator: (photos: InspectionPhoto[]) => photos.length >= 10,
          message: 'Minimum 10 photos required for mould documentation'
        }
      ],
      errorMessage: 'At least 10 photos required for mould remediation documentation'
    },
    {
      field: 'safetyConsiderations.requiredPPE',
      required: true,
      validationRules: [
        {
          type: 'custom',
          customValidator: (ppe: string[]) => ppe.some(item => item.toLowerCase().includes('respirator')),
          message: 'Respiratory protection must be specified for mould work'
        }
      ],
      errorMessage: 'Respiratory protection requirements must be documented'
    },
    {
      field: 'complianceRequirements.inspectionRequirements',
      required: true,
      validationRules: [
        {
          type: 'custom',
          customValidator: (requirements: string[]) => 
            requirements.some(req => req.toLowerCase().includes('clearance')),
          message: 'Post-remediation clearance testing must be included'
        }
      ],
      errorMessage: 'Post-remediation clearance testing requirements must be specified'
    }
  ]
};

// Photo validation requirements
export const PHOTO_VALIDATION_RULES = {
  file_size: {
    minimum: 100 * 1024, // 100KB
    maximum: 10 * 1024 * 1024, // 10MB
  },
  resolution: {
    minimum_width: 1280,
    minimum_height: 720 },
  formats: ['image/jpeg', 'image/png'],
  required_metadata: ['timestamp', 'location'],
  description_requirements: {
    minimum_length: 10,
    maximum_length: 200,
    required_elements: ['location', 'what_shown']
  }
};

// Inspector qualification requirements
export const INSPECTOR_REQUIREMENTS = {
  minimum_certifications: {
    water_damage: ['IICRC Water Damage Restoration Technician (WRT)'],
    fire_damage: ['IICRC Fire and Smoke Restoration Technician (FSRT)'],
    mould_remediation: ['IICRC Applied Microbial Remediation Technician (AMRT)'],
    general: ['IICRC certification in relevant category']
  },
  experience_requirements: {
    minimum_projects: 5,
    minimum_hours: 40,
    supervised_work: false // Can be independent
  },
  ongoing_requirements: {
    continuing_education: '14 hours annually',
    recertification: 'Every 4 years',
    quality_audits: 'Quarterly random inspections'
  }
};

// Submission validation function
export function validateInspectionSubmission(
  report: InspectionReport,
  workType: string
): SubmissionValidationResult {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];
  let completionScore = 0;
  const totalRequirements = SUBMISSION_REQUIREMENTS[workType]?.length || 0;
  let satisfiedRequirements = 0;

  const requirements = SUBMISSION_REQUIREMENTS[workType] || [];

  for (const requirement of requirements) {
    const fieldValue = getNestedFieldValue(report, requirement.field);
    let requirementSatisfied = true;

    for (const rule of requirement.validationRules) {
      const validationResult = validateRule(fieldValue, rule);
      
      if (!validationResult.isValid) {
        requirementSatisfied = false;
        errors.push({
          field: requirement.field,
          message: validationResult.message,
          severity: requirement.required ? 'critical' : 'major'
        });
      }
    }

    if (requirement.minimumCount && Array.isArray(fieldValue)) {
      if (fieldValue.length < requirement.minimumCount) {
        requirementSatisfied = false;
        errors.push({
          field: requirement.field,
          message: `Minimum ${requirement.minimumCount} items required, found ${fieldValue.length}`,
          severity: 'critical'
        });
      }
    }

    if (requirementSatisfied) {
      satisfiedRequirements++;
    }
  }

  // Calculate completion score
  completionScore = totalRequirements > 0 ? (satisfiedRequirements / totalRequirements) * 100 : 0;

  // Add photo-specific validations
  const photoValidation = validatePhotos(report.photos || []);
  errors.push(...photoValidation.errors);
  warnings.push(...photoValidation.warnings);

  // Add moisture reading validations for water damage
  if (workType === 'water_damage') {
    const moistureValidation = validateMoistureReadings(report.moistureReadings || []);
    errors.push(...moistureValidation.errors);
    warnings.push(...moistureValidation.warnings);
  }

  // Quality warnings (not errors)
  if (report.summary?.keyFindings?.length === 0) {
    warnings.push({
      field: 'summary.keyFindings',
      message: 'No key findings documented',
      recommendation: 'Add key findings to improve report quality and client communication'
    });
  }

  if (!report.clientCommunication?.clientAcknowledgment) {
    warnings.push({
      field: 'clientCommunication.clientAcknowledgment',
      message: 'Client acknowledgment not documented',
      recommendation: 'Obtain client acknowledgment of inspection findings and recommendations'
    });
  }

  return {
    isValid: errors.filter(e => e.severity === 'critical').length === 0,
    errors,
    warnings,
    completionScore: Math.round(completionScore)
  };
}

function validateRule(value: any, rule: ValidationRule): { isValid: boolean; message: string } {
  switch (rule.type) {
    case 'required':
      return {
        isValid: value !== undefined && value !== null && value !== '',
        message: rule.message
      };
    
    case 'minLength':
      return {
        isValid: typeof value === 'string' && value.length >= (rule.value || 0),
        message: rule.message
      };
    
    case 'maxLength':
      return {
        isValid: typeof value === 'string' && value.length <= (rule.value || Infinity),
        message: rule.message
      };
    
    case 'custom':
      return {
        isValid: rule.customValidator ? rule.customValidator(value) : true,
        message: rule.message
      };
    
    default:
      return { isValid: true, message: '' };
  }
}

function getNestedFieldValue(obj: any, path: string): any {
  return path.split('.').reduce((current, key) => current?.[key], obj);
}

function validatePhotos(photos: InspectionPhoto[]): { errors: ValidationError[]; warnings: ValidationWarning[] } {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Check for required photo categories
  const requiredCategories = ['overview', 'detail', 'moisture_reading'];
  for (const category of requiredCategories) {
    const categoryPhotos = photos.filter(p => p.category === category);
    if (categoryPhotos.length === 0) {
      errors.push({
        field: 'photos',
        message: `Missing required photo category: ${category}`,
        severity: 'major'
      });
    }
  }

  // Check photo descriptions
  photos.forEach((photo, index) => {
    if (!photo.description || photo.description.length < PHOTO_VALIDATION_RULES.description_requirements.minimum_length) {
      warnings.push({
        field: `photos[${index}].description`,
        message: `Photo description too short: "${photo.description}"`,
        recommendation: 'Provide detailed descriptions for all photos including location and what is shown'
      });
    }
  });

  return { errors, warnings };
}

function validateMoistureReadings(readings: MoistureReading[]): { errors: ValidationError[]; warnings: ValidationWarning[] } {
  const errors: ValidationError[] = [];
  const warnings: ValidationWarning[] = [];

  // Check for readings in different materials
  const materialTypes = ['drywall', 'wood_framing', 'concrete'];
  for (const materialType of materialTypes) {
    const materialReadings = readings.filter(r => r.materialType === materialType);
    if (materialReadings.length === 0) {
      warnings.push({
        field: 'moistureReadings',
        message: `No moisture readings for ${materialType}`,
        recommendation: `Include moisture readings for ${materialType} if present in affected areas`
      });
    }
  }

  // Check for suspiciously high readings
  readings.forEach((reading, index) => {
    if (reading.moistureContent > 20 && reading.units === '%') {
      warnings.push({
        field: `moistureReadings[${index}]`,
        message: `Unusually high moisture reading: ${reading.moistureContent}%`,
        recommendation: 'Verify accuracy and consider retesting if reading seems inconsistent'
      });
    }
  });

  return { errors, warnings };
}

// Submission workflow stages
export const SUBMISSION_STAGES = {
  draft: {
    name: 'Draft',
    description: 'Report in progress, not yet submitted',
    requirements: ['Basic property and loss information'],
    actions: ['Continue editing', 'Save draft', 'Submit for review']
  },
  submitted: {
    name: 'Submitted',
    description: 'Report submitted for NRP review',
    requirements: ['All critical requirements met', 'Validation passed'],
    actions: ['Await review', 'View status']
  },
  under_review: {
    name: 'Under Review',
    description: 'NRP team reviewing report for quality and completeness',
    requirements: ['No action required from contractor'],
    actions: ['Monitor status', 'Respond to review comments if requested']
  },
  revision_required: {
    name: 'Revision Required',
    description: 'Report needs corrections or additional information',
    requirements: ['Address all review comments', 'Re-submit for approval'],
    actions: ['View comments', 'Edit report', 'Re-submit']
  },
  approved: {
    name: 'Approved',
    description: 'Report meets NRP standards and is approved',
    requirements: ['No further action required'],
    actions: ['Download approved report', 'Proceed with work']
  },
  rejected: {
    name: 'Rejected',
    description: 'Report does not meet standards and cannot be approved',
    requirements: ['Major revisions or complete re-inspection required'],
    actions: ['View rejection reasons', 'Schedule re-inspection', 'Create new report']
  }
};

// Quality scoring system
export const QUALITY_SCORING = {
  photo_quality: {
    weight: 25,
    criteria: [
      'Adequate quantity (minimum met)',
      'Proper categorization',
      'Clear, well-lit images',
      'Detailed descriptions',
      'Required angles covered'
    ]
  },
  technical_accuracy: {
    weight: 30,
    criteria: [
      'Accurate moisture readings',
      'Proper material identification',
      'Correct IICRC standards referenced',
      'Appropriate work recommendations',
      'Safety considerations complete'
    ]
  },
  documentation_completeness: {
    weight: 25,
    criteria: [
      'All required fields completed',
      'Comprehensive damage assessment',
      'Clear scope of work',
      'Timeline realistic and detailed',
      'Client communication documented'
    ]
  },
  professional_presentation: {
    weight: 20,
    criteria: [
      'Clear, professional language',
      'Logical organisation',
      'Proper grammar and spelling',
      'Consistent formatting',
      'Executive summary quality'
    ]
  }
};

export default {
  SUBMISSION_REQUIREMENTS,
  PHOTO_VALIDATION_RULES,
  INSPECTOR_REQUIREMENTS,
  validateInspectionSubmission,
  SUBMISSION_STAGES,
  QUALITY_SCORING
};