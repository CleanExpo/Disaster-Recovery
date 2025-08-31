/**
 * Inspection Report Examples and Best Practices
 * 
 * This file contains comprehensive examples of properly completed inspection
 * reports for different types of disaster recovery work. These serve as 
 * templates and training materials for NRP contractors.
 */

import { 
  InspectionReport, 
  InspectionPhoto, 
  MoistureReading, 
  EnvironmentalReading,
  DamageAssessment,
  WorkRecommendation 
} from './inspection-report-template';

// Example Water Damage Inspection Report
export const WATER_DAMAGE_EXAMPLE: InspectionReport = {
  // Report Metadata
  id: 'inspection_1697123456_abc123def',
  reportNumber: 'NRP-20231012-1234',
  contractorId: 'contractor_123',
  clientId: 'client_456',
  propertyId: 'property_789',
  inspectionDate: new Date('2023-10-12T09:00:00Z'),
  reportDate: new Date('2023-10-12T14:30:00Z'),
  inspectorName: 'James Mitchell',
  inspectorCertifications: [
    'IICRC Water Damage Restoration Technician (WRT)',
    'IICRC Applied Structural Drying Technician (ASD)',
    'NRP Certified Inspector Level 2'
  ],

  // Property Information
  propertyDetails: {
    address: '123 Collins Street, Melbourne VIC 3000',
    propertyType: 'commercial',
    constructionType: 'concrete',
    approximateAge: 15,
    occupancyStatus: 'occupied',
    accessRestrictions: 'Business hours only (9 AM - 5 PM weekdays)'
  },

  // Loss Information
  lossDetails: {
    dateOfLoss: new Date('2023-10-11T22:30:00Z'),
    causeOfLoss: 'Burst 50mm water supply pipe on level 3 due to freezing temperatures during overnight cold snap. Pipe failure occurred in ceiling space above accounting department, causing water to flow through ceiling tiles and damage office areas below.',
    insuranceClaimNumber: 'INS-2023-WD-98765',
    adjusterName: 'Sarah Thompson',
    adjusterContact: 'sarah.thompson@insurancecorp.com.au | ',
    firstNoticeDate: new Date('2023-10-12T07:15:00Z'),
    emergencyServicesContacted: false
  },

  // Environmental Conditions
  environmentalConditions: {
    exteriorWeather: {
      temperature: 8,
      humidity: 85,
      conditions: 'Overcast, high humidity following cold snap',
      recentWeatherEvents: 'Unusual cold snap with temperatures below 0°C for three consecutive nights'
    },
    interiorConditions: [
      {
        id: 'env_001',
        timestamp: new Date('2023-10-12T09:15:00Z'),
        location: 'Accounting department main area',
        temperature: 18,
        relativeHumidity: 72,
        dewPoint: 13.2,
        barometricPressure: 101.3,
        airMovement: 0.1,
        notes: 'Elevated humidity due to water intrusion'
      },
      {
        id: 'env_002', 
        timestamp: new Date('2023-10-12T09:30:00Z'),
        location: 'Adjacent conference room (unaffected)',
        temperature: 20,
        relativeHumidity: 45,
        dewPoint: 7.8,
        barometricPressure: 101.3,
        airMovement: 0.2,
        notes: 'Normal conditions for comparison'
      }
    ]
  },

  // Damage Assessment
  damageAssessment: [
    {
      area: 'Accounting department main work area',
      damageType: 'water',
      severity: 'moderate',
      waterCategory: 1,
      classOfLoss: 2,
      estimatedAffectedArea: 45,
      urgency: 'immediate',
      affectedMaterials: [
        {
          material: 'Carpet and underpad (20 sqm)',
          extent: 'Saturated throughout',
          salvageable: false,
          recommendedAction: 'replace'
        },
        {
          material: 'Drywall (8 linear metres)',
          extent: 'Water damage up to 300mm from floor',
          salvageable: true,
          recommendedAction: 'dry'
        },
        {
          material: 'Ceiling tiles (12 sqm)',
          extent: 'Stained and sagging',
          salvageable: false,
          recommendedAction: 'replace'
        },
        {
          material: 'Office furniture (4 desks)',
          extent: 'Water contact on lower portions',
          salvageable: true,
          recommendedAction: 'clean'
        }
      ]
    },
    {
      area: 'Manager\'s private office',
      damageType: 'water',
      severity: 'minor',
      waterCategory: 1,
      classOfLoss: 1,
      estimatedAffectedArea: 12,
      urgency: 'within_24h',
      affectedMaterials: [
        {
          material: 'Hardwood flooring (12 sqm)',
          extent: 'Surface water, minimal penetration',
          salvageable: true,
          recommendedAction: 'dry'
        },
        {
          material: 'Executive desk',
          extent: 'No visible damage',
          salvageable: true,
          recommendedAction: 'clean'
        }
      ]
    }
  ],

  // Moisture Documentation
  moistureReadings: [
    {
      id: 'moisture_001',
      location: 'Accounting area - north wall, 150mm from floor',
      materialType: 'drywall',
      readingType: 'pin',
      moistureContent: 24,
      units: 'scale_reading',
      timestamp: new Date('2023-10-12T09:45:00Z'),
      weather: {
        temperature: 18,
        humidity: 72
      },
      notes: 'Elevated reading in affected area'
    },
    {
      id: 'moisture_002',
      location: 'Accounting area - carpet centre',
      materialType: 'carpet',
      readingType: 'pinless',
      moistureContent: 89,
      units: 'scale_reading',
      timestamp: new Date('2023-10-12T09:50:00Z'),
      weather: {
        temperature: 18,
        humidity: 72
      },
      notes: 'Saturated carpet requiring removal'
    },
    {
      id: 'moisture_003',
      location: 'Conference room - baseline reading',
      materialType: 'drywall',
      readingType: 'pin',
      moistureContent: 8,
      units: 'scale_reading',
      timestamp: new Date('2023-10-12T10:00:00Z'),
      weather: {
        temperature: 20,
        humidity: 45
      },
      notes: 'Normal baseline reading for comparison'
    },
    {
      id: 'moisture_004',
      location: 'Manager office - hardwood floor centre',
      materialType: 'hardwood',
      readingType: 'pin',
      moistureContent: 14,
      units: '%',
      timestamp: new Date('2023-10-12T10:15:00Z'),
      weather: {
        temperature: 19,
        humidity: 65
      },
      notes: 'Slightly elevated but within acceptable range'
    },
    {
      id: 'moisture_005',
      location: 'Ceiling space above accounting area',
      materialType: 'wood_framing',
      readingType: 'pin',
      moistureContent: 18,
      units: '%',
      timestamp: new Date('2023-10-12T11:00:00Z'),
      weather: {
        temperature: 16,
        humidity: 78
      },
      notes: 'Elevated moisture in ceiling framing'
    }
  ],

  // Visual Documentation
  photos: [
    {
      id: 'photo_001',
      filename: 'overview_accounting_main.jpg',
      description: 'Wide overview of accounting department main area showing extent of water damage to carpet and furniture',
      category: 'overview',
      location: 'Accounting department main area',
      timestamp: new Date('2023-10-12T09:20:00Z'),
      coordinates: { latitude: -37.8136, longitude: 144.9631 }
    },
    {
      id: 'photo_002', 
      filename: 'ceiling_damage_detail.jpg',
      description: 'Close-up of damaged ceiling tiles showing water staining and sagging',
      category: 'detail',
      location: 'Accounting department ceiling',
      timestamp: new Date('2023-10-12T09:25:00Z')
    },
    {
      id: 'photo_003',
      filename: 'moisture_reading_wall.jpg',
      description: 'Moisture meter reading of 24 on scale reading in north wall drywall',
      category: 'moisture_reading',
      location: 'North wall, 150mm from floor',
      timestamp: new Date('2023-10-12T09:45:00Z')
    },
    {
      id: 'photo_004',
      filename: 'water_source_pipe.jpg',
      description: 'Burst water supply pipe in ceiling space showing point of failure',
      category: 'detail',
      location: 'Ceiling space above accounting',
      timestamp: new Date('2023-10-12T11:05:00Z')
    },
    {
      id: 'photo_005',
      filename: 'affected_furniture.jpg',
      description: 'Four office desks showing water damage to lower portions and electronics',
      category: 'detail',
      location: 'Accounting workstations',
      timestamp: new Date('2023-10-12T10:30:00Z')
    },
    {
      id: 'photo_006',
      filename: 'manager_office_minimal.jpg',
      description: 'Manager\'s office showing minimal water damage to hardwood flooring',
      category: 'overview',
      location: 'Manager private office',
      timestamp: new Date('2023-10-12T10:45:00Z')
    }
    // Additional photos would be included to reach the minimum of 12...
  ],

  // Work Recommendations
  workRecommendations: [
    {
      id: 'rec_001',
      category: 'mitigation',
      description: 'Immediately extract standing water and begin structural drying process using air movers and dehumidifiers',
      priority: 'critical',
      estimatedDuration: '3-5 days',
      requiredEquipment: ['Air movers (6 units)', 'Commercial dehumidifier (2 units)', 'Water extraction equipment'],
      safetyRequirements: ['GFCI protection for all electrical equipment', 'Moisture monitoring daily'],
      iicrcStandards: ['IICRC S500 Water Damage Restoration']
    },
    {
      id: 'rec_002',
      category: 'restoration',
      description: 'Remove and replace saturated carpet and underpad in accounting area (20 sqm)',
      priority: 'high',
      estimatedDuration: '1 day',
      requiredEquipment: ['Carpet removal tools', 'Disposal containers'],
      safetyRequirements: ['Dust masks during removal'],
      iicrcStandards: ['IICRC S500']
    },
    {
      id: 'rec_003',
      category: 'restoration',
      description: 'Replace damaged ceiling tiles and inspect ceiling framing for structural integrity',
      priority: 'high',
      estimatedDuration: '1 day',
      requiredEquipment: ['Scaffolding or lift equipment', 'New ceiling tiles'],
      safetyRequirements: ['Fall protection when working at height'],
      iicrcStandards: ['IICRC S500', 'Australian Work Health and Safety standards']
    },
    {
      id: 'rec_004',
      category: 'cleaning',
      description: 'Professional cleaning of affected office furniture and electronics assessment',
      priority: 'medium',
      estimatedDuration: '2 days',
      requiredEquipment: ['Commercial cleaning supplies', 'Electronics testing equipment'],
      safetyRequirements: ['Electrical safety protocols'],
      iicrcStandards: ['IICRC S001 Inspection Guidelines']
    }
  ],

  // Scope of Work
  scopeOfWork: {
    mitigationWork: [
      'Water extraction from all affected areas',
      'Setup and monitor structural drying equipment',
      'Daily moisture monitoring and documentation',
      'Protect unaffected areas with plastic sheeting'
    ],
    restorationWork: [
      'Remove and replace carpet and underpad (20 sqm)',
      'Replace damaged ceiling tiles (12 sqm)',
      'Clean and restore office furniture',
      'Test and restore electronics where possible'
    ],
    reconstructionWork: [
      'Repair any structural damage to ceiling framing if required',
      'Repaint affected wall areas',
      'Install new carpet to match existing'
    ],
    timeline: {
      mitigationStart: new Date('2023-10-12T15:00:00Z'),
      mitigationComplete: new Date('2023-10-17T17:00:00Z'),
      restorationStart: new Date('2023-10-16T08:00:00Z'),
      restorationComplete: new Date('2023-10-20T17:00:00Z'),
      finalCompletion: new Date('2023-10-23T17:00:00Z')
    },
    excludedWork: [
      'Repair of building plumbing system (requires licensed plumber)',
      'Any work outside the identified affected areas',
      'Replacement of personal items or equipment not owned by business'
    ],
    assumptionsAndLimitations: [
      'Access to be provided during business hours only',
      'Client to relocate staff and equipment from affected areas',
      'Final completion subject to successful drying verification',
      'Additional work may be required if hidden damage is discovered'
    ]
  },

  // Safety and Health
  safetyConsiderations: {
    immediateHazards: [
      'Electrical hazards from water near power outlets',
      'Slip hazards from wet surfaces',
      'Potential ceiling collapse from water-damaged tiles'
    ],
    ongoingRisks: [
      'Mould growth if drying not completed properly',
      'Indoor air quality issues during drying process',
      'Structural integrity of water-damaged ceiling framing'
    ],
    requiredPPE: [
      'Non-slip safety boots',
      'Safety glasses',
      'Work gloves',
      'High-visibility clothing in shared workspace'
    ],
    specialPrecautions: [
      'GFCI protection for all electrical equipment',
      'Daily air quality monitoring during drying',
      'Structural assessment of ceiling before accessing'
    ]
  },

  // Regulatory Compliance  
  complianceRequirements: {
    applicableStandards: [
      'IICRC S500 Water Damage Restoration Standard',
      'AS/NZS 3666.1 Air-handling and water systems',
      'Work Health and Safety Act 2011',
      'Building Code of Australia'
    ],
    requiredPermits: [],
    inspectionRequirements: [
      'Final moisture verification before completion',
      'Client walkthrough and sign-off'
    ],
    wasteDisposalRequirements: [
      'Carpet disposal to approved waste facility',
      'Construction waste disposal per local council requirements'
    ]
  },

  // Quality Assurance
  qualityAssurance: {
    preExistingConditions: [
      'Minor carpet wear in high-traffic areas',
      'Small scuff marks on north wall',
      'Existing water stain on conference room ceiling (unrelated to current loss)'
    ],
    protectionMeasures: [
      'Plastic sheeting to protect adjacent areas',
      'Furniture protection during drying process',
      'Air filtration during carpet removal'
    ],
    monitoringRequirements: [
      'Daily moisture readings in all affected materials',
      'Daily environmental monitoring',
      'Equipment performance checks twice daily'
    ],
    completionCriteria: [
      'All moisture readings at or below baseline levels',
      'No visible signs of water damage',
      'Client satisfaction with restoration quality',
      'Compliance with all applicable standards'
    ]
  },

  // Client Communication
  clientCommunication: {
    clientPresent: true,
    clientConcerns: [
      'Minimizing business disruption during restoration',
      'Ensuring complete removal of water damage',
      'Timeline for returning to normal operations',
      'Preventing mould growth'
    ],
    explanationProvided: [
      'Complete restoration process and timeline',
      'Daily monitoring and communication schedule',
      'Safety precautions and access requirements',
      'Quality assurance and warranty information'
    ],
    clientQuestions: [
      {
        question: 'How long will the drying equipment need to run?',
        answer: 'Typically 3-5 days depending on moisture levels. We monitor daily and adjust as needed.'
      },
      {
        question: 'Will there be noise disruption during business hours?',
        answer: 'Yes, the air movers and dehumidifiers will produce noise. We can schedule the noisiest work outside business hours where possible.'
      },
      {
        question: 'What happens if you find more damage during the work?',
        answer: 'We will document any additional damage and get approval before proceeding. You and your insurance adjuster will be notified immediately.'
      }
    ],
    clientAcknowledgment: true
  },

  // Report Summary
  summary: {
    keyFindings: [
      'Category 1 water damage from burst supply pipe affecting 45 sqm of commercial office space',
      'Saturated carpet requires complete replacement due to extent of damage',
      'Structural drying required for walls and ceiling framing',
      'Electronics require assessment and professional restoration'
    ],
    criticalIssues: [
      'Immediate water extraction required to prevent secondary damage',
      'Ceiling structural integrity assessment needed',
      'Risk of mould growth if not dried properly within 48 hours'
    ],
    recommendedImmediateActions: [
      'Begin water extraction immediately',
      'Set up structural drying equipment',
      'Remove saturated carpet and ceiling tiles',
      'Monitor moisture levels daily'
    ],
    overallAssessment: 'moderate_damage',
    estimatedProjectDuration: '8-10 business days',
    followUpRequired: true
  },

  // Signatures and Certifications
  certifications: {
    inspectorSignature: 'James Mitchell, IICRC WRT, ASD',
    inspectorDate: new Date('2023-10-12T14:30:00Z'),
    clientSignature: 'Margaret Stevens, Office Manager',
    clientDate: new Date('2023-10-12T14:35:00Z'),
    adjusterSignature: 'Sarah Thompson, Insurance Adjuster',
    adjusterDate: new Date('2023-10-12T16:45:00Z'),
    certificationStatement: 'I certify that this inspection was conducted in accordance with IICRC S500 standards and industry best practices. All findings and recommendations are based on visible conditions at the time of inspection and my professional assessment of the situation.'
  }
};

// Example best practices for different scenarios
export const BEST_PRACTICES = {
  water_damage: {
    essential_documentation: [
      'Photo progression: Wide overview → specific damage → moisture readings → equipment placement',
      'Moisture readings: Minimum 5 locations including baseline readings in unaffected areas',
      'Timeline documentation: When loss occurred, when discovered, when reported',
      'Water category classification with detailed justification',
      'Class of loss determination based on evaporation potential'
    ],
    common_mistakes: [
      'Not taking baseline moisture readings in unaffected areas',
      'Insufficient photos of moisture meter displays',
      'Vague descriptions of affected materials',
      'Not documenting pre-existing conditions',
      'Missing water source identification and control'
    ],
    quality_indicators: [
      'Clear, well-lit photos with detailed descriptions',
      'Systematic moisture mapping with consistent measurement locations',
      'Comprehensive safety hazard identification',
      'Realistic timeline with contingency planning',
      'Client education and communication documentation'
    ]
  },

  fire_damage: {
    essential_documentation: [
      'Soot pattern analysis and documentation',
      'Heat and smoke damage extent mapping',
      'Structural safety assessment',
      'Air quality considerations',
      'Hazardous material identification (asbestos, lead)'
    ],
    common_mistakes: [
      'Not assessing structural stability before entry',
      'Inadequate PPE documentation for smoke exposure',
      'Missing odour source identification',
      'Not considering HVAC contamination',
      'Insufficient safety hazard documentation'
    ],
    quality_indicators: [
      'Comprehensive safety assessment before work begins',
      'Detailed soot and smoke pattern analysis',
      'Professional structural evaluation when needed',
      'Complete air quality testing plan',
      'Hazardous material identification and handling plan'
    ]
  },

  mould_remediation: {
    essential_documentation: [
      'Moisture source identification and control',
      'Mould growth extent and location mapping',
      'Containment and protection planning',
      'Air sampling requirements',
      'Post-remediation clearance criteria'
    ],
    common_mistakes: [
      'Not identifying and controlling moisture source',
      'Inadequate containment planning',
      'Missing pre-remediation air sampling',
      'Not specifying clearance testing requirements',
      'Insufficient respiratory protection planning'
    ],
    quality_indicators: [
      'Complete moisture source investigation',
      'Professional containment strategy',
      'Comprehensive air sampling plan',
      'Detailed remediation protocol',
      'Clear post-remediation verification criteria'
    ]
  }
};

// Template completion checklist
export const COMPLETION_CHECKLIST = {
  before_leaving_site: [
    'All required photos captured with clear descriptions',
    'Minimum moisture readings completed per work type',
    'Client has been walked through findings and recommendations',
    'Safety hazards identified and communicated',
    'Emergency contact information exchanged',
    'Initial timeline and scope discussed with client'
  ],
  
  before_submitting_report: [
    'All mandatory fields completed',
    'Photos reviewed for quality and clarity',
    'Moisture readings checked for accuracy and completeness',
    'Work recommendations prioritized appropriately',
    'IICRC standards referenced correctly',
    'Grammar and spelling checked',
    'Client communication documented thoroughly',
    'Insurance information verified and complete'
  ],

  quality_review_points: [
    'Does the report tell a complete story of the damage?',
    'Would another professional reach similar conclusions?',
    'Are all recommendations justified and necessary?',
    'Is the timeline realistic and achievable?',
    'Have all safety concerns been addressed?',
    'Is the documentation sufficient for insurance purposes?',
    'Would the client understand the scope and process?',
    'Are there any gaps in the assessment or documentation?'
  ]
};

export default {
  WATER_DAMAGE_EXAMPLE,
  BEST_PRACTICES,
  COMPLETION_CHECKLIST
};