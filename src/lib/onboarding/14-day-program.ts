/**
 * 14-Day Comprehensive Onboarding Program
 * Designed to prevent rapid completion and ensure thorough contractor vetting
 */

import { OnboardingModule } from '@/types/contractor-competency';

export const ONBOARDING_PROGRAM: OnboardingModule[] = [
  // WEEK 1: Foundation & Compliance
  {
    day: 1,
    title: 'Welcome & Australian Legal Framework',
    description: 'Introduction to NRP platform and Australian consumer protection laws',
    objectives: [
      'Understand NRP\'s role as a claims distributor',
      'Master Australian Consumer Law requirements',
      'Learn mandatory disclosure obligations',
      'Comprehend cooling-off period rules'
    ],
    components: {
      videos: [
        {
          title: 'Welcome to National Recovery Partners',
          url: '/training/videos/welcome-nrp',
          duration: 45,
          mandatory: true
        },
        {
          title: 'Australian Consumer Law for Contractors',
          url: '/training/videos/acl-essentials',
          duration: 90,
          mandatory: true
        },
        {
          title: 'Dealing with Vulnerable Consumers',
          url: '/training/videos/vulnerable-consumers',
          duration: 60,
          mandatory: true
        }
      ],
      readings: [
        {
          title: 'Competition and Consumer Act 2010 - Key Sections',
          content: 'Detailed analysis of Sections 18 (Misleading conduct), 29 (False representations), and Schedule 2 (Consumer guarantees)',
          estimatedTime: 120,
          source: 'ACCC.gov.au'
        },
        {
          title: 'Unfair Contract Terms Guide',
          content: 'Understanding and avoiding unfair terms in standard form contracts',
          estimatedTime: 60,
          source: 'Australian Government Treasury'
        }
      ],
      assignments: [
        {
          title: 'ACL Compliance Self-Audit',
          description: 'Review your current contracts and marketing materials for ACL compliance',
          type: 'UPLOAD',
          requirements: [
            'Upload 3 current contract templates',
            'Identify any potentially unfair terms',
            'Propose corrections for non-compliant clauses',
            'Include cooling-off period notices'
          ],
          submissionFormat: 'PDF documents with annotations'
        },
        {
          title: 'Consumer Rights Quiz',
          description: 'Complete quiz on consumer guarantees and remedies',
          type: 'QUIZ',
          requirements: [
            'Score minimum 80% to proceed',
            '20 questions from government sources',
            'Covers consumer guarantees, remedies, and penalties'
          ],
          submissionFormat: 'Online quiz submission'
        }
      ],
      documentsRequired: [
        {
          name: 'Current Terms and Conditions',
          description: 'Your existing T&Cs for review',
          format: ['PDF', 'DOCX'],
          maxSize: 5,
          verificationRequired: true
        }
      ]
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: true,
      quizScore: 80
    },
    estimatedHours: 8,
    mustCompleteBy: 1
  },

  {
    day: 2,
    title: 'Insurance Contracts Act & Section 54 Rights',
    description: 'Master insurance law and contractor rights under Section 54',
    objectives: [
      'Understand Section 54 protections',
      'Learn make-safe work authorisation limits',
      'Master cash settlement calculations',
      'Comprehend duty of disclosure'
    ],
    components: {
      videos: [
        {
          title: 'Section 54 Insurance Contracts Act Explained',
          url: '/training/videos/section-54-rights',
          duration: 120,
          mandatory: true
        },
        {
          title: 'Managing Insurance Authorisations',
          url: '/training/videos/insurance-authorisations',
          duration: 75,
          mandatory: true
        },
        {
          title: 'Cash Settlement vs Replacement',
          url: '/training/videos/settlement-types',
          duration: 60,
          mandatory: true
        }
      ],
      readings: [
        {
          title: 'Insurance Contracts Act 1984 - Critical Sections',
          content: 'Deep dive into Sections 13, 21, 28, 54, and 78',
          estimatedTime: 150,
          source: 'Federal Register of Legislation'
        },
        {
          title: 'General Insurance Code of Practice 2020',
          content: 'Understanding insurer obligations and claims handling',
          estimatedTime: 90,
          source: 'Insurance Council of Australia'
        }
      ],
      assignments: [
        {
          title: 'Insurance Calculation Workbook',
          description: 'Complete 10 scenarios calculating settlements with under-insurance',
          type: 'WRITTEN',
          requirements: [
            'Show all working for co-insurance calculations',
            'Apply 80% rule correctly',
            'Calculate depreciation where applicable',
            'Include GST considerations'
          ],
          submissionFormat: 'Spreadsheet with formulas visible'
        }
      ]
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false,
      quizScore: 85
    },
    estimatedHours: 7,
    mustCompleteBy: 2
  },

  {
    day: 3,
    title: 'Building & Construction Security of Payment',
    description: 'Payment rights and adjudication processes',
    objectives: [
      'Master payment claim requirements',
      'Understand adjudication process',
      'Learn variation documentation',
      'Prevent payment disputes'
    ],
    components: {
      videos: [
        {
          title: 'Security of Payment Acts - State by State',
          url: '/training/videos/sop-acts',
          duration: 90,
          mandatory: true
        },
        {
          title: 'Preparing Valid Payment Claims',
          url: '/training/videos/payment-claims',
          duration: 60,
          mandatory: true
        }
      ],
      readings: [
        {
          title: 'Building and Construction Industry Security of Payment Acts',
          content: 'Comparison of NSW, QLD, VIC, and WA legislation',
          estimatedTime: 120,
          source: 'State Government Legislation'
        }
      ],
      assignments: [
        {
          title: 'Draft Payment Claim',
          description: 'Create a compliant payment claim for a sample project',
          type: 'UPLOAD',
          requirements: [
            'Include all mandatory elements',
            'Calculate dates correctly',
            'Reference relevant contract clauses',
            'Include supporting documentation list'
          ],
          submissionFormat: 'Payment claim template'
        }
      ],
      documentsRequired: [
        {
          name: 'Sample Invoice',
          description: 'Example of your current invoicing',
          format: ['PDF'],
          maxSize: 2,
          verificationRequired: false
        }
      ]
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: true
    },
    estimatedHours: 6,
    mustCompleteBy: 3
  },

  {
    day: 4,
    title: 'GST, Tax Compliance & ABN Requirements',
    description: 'Australian taxation requirements for contractors',
    objectives: [
      'Master GST calculations and reporting',
      'Understand tax invoice requirements',
      'Learn PAYG withholding rules',
      'Comprehend contractor vs employee distinctions'
    ],
    components: {
      videos: [
        {
          title: 'GST for Disaster Recovery Services',
          url: '/training/videos/gst-compliance',
          duration: 75,
          mandatory: true
        },
        {
          title: 'Tax Invoices and Record Keeping',
          url: '/training/videos/tax-invoices',
          duration: 60,
          mandatory: true
        }
      ],
      readings: [
        {
          title: 'A New Tax System (GST) Act 1999',
          content: 'Key provisions for service providers',
          estimatedTime: 90,
          source: 'Australian Taxation Office'
        },
        {
          title: 'PSI and PSB Rules',
          content: 'Personal services income and business tests',
          estimatedTime: 60,
          source: 'ATO.gov.au'
        }
      ],
      assignments: [
        {
          title: 'Tax Compliance Checklist',
          description: 'Complete self-assessment of tax obligations',
          type: 'QUIZ',
          requirements: [
            'Answer 25 questions on GST and tax',
            'Include BAS reporting scenarios',
            'Score minimum 75% to pass'
          ],
          submissionFormat: 'Online assessment'
        }
      ]
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false,
      quizScore: 75
    },
    estimatedHours: 5,
    mustCompleteBy: 4
  },

  {
    day: 5,
    title: 'Work Health & Safety Fundamentals',
    description: 'WHS obligations and safe work practices',
    objectives: [
      'Understand PCBU duties',
      'Master incident reporting requirements',
      'Learn asbestos awareness',
      'Comprehend site safety planning'
    ],
    components: {
      videos: [
        {
          title: 'WHS Act and Your Obligations',
          url: '/training/videos/whs-obligations',
          duration: 90,
          mandatory: true
        },
        {
          title: 'Asbestos Identification and Safety',
          url: '/training/videos/asbestos-safety',
          duration: 120,
          mandatory: true
        },
        {
          title: 'Working at Heights Safely',
          url: '/training/videos/heights-safety',
          duration: 75,
          mandatory: true
        }
      ],
      readings: [
        {
          title: 'Work Health and Safety Act 2011',
          content: 'Primary duties and incident notification',
          estimatedTime: 120,
          source: 'Safe Work Australia'
        },
        {
          title: 'Managing Asbestos Code of Practice',
          content: 'Identification, assessment, and control measures',
          estimatedTime: 90,
          source: 'Safe Work Australia'
        }
      ],
      assignments: [
        {
          title: 'Site Safety Plan Template',
          description: 'Develop comprehensive safety plan for disaster site',
          type: 'UPLOAD',
          requirements: [
            'Include hazard identification',
            'Detail control measures',
            'Emergency procedures',
            'PPE requirements matrix'
          ],
          submissionFormat: 'Safety plan document'
        },
        {
          title: 'WHS Incident Scenario',
          description: 'Respond to 5 safety incident scenarios',
          type: 'WRITTEN',
          requirements: [
            'Identify reporting obligations',
            'Detail immediate actions',
            'Specify notification timeframes',
            'Document preservation requirements'
          ],
          submissionFormat: 'Written responses'
        }
      ]
    },
    completionCriteria: {
      minVideoWatchTime: 100,
      assignmentsCompleted: true,
      documentsUploaded: true
    },
    estimatedHours: 8,
    mustCompleteBy: 5
  },

  {
    day: 6,
    title: 'IICRC Standards - S500 Water Damage',
    description: 'Master ANSI/IICRC S500 standard for water damage restoration',
    objectives: [
      'Understand water categories and classes',
      'Master psychrometry principles',
      'Learn structural drying procedures',
      'Comprehend documentation requirements'
    ],
    components: {
      videos: [
        {
          title: 'IICRC S500 Complete Overview',
          url: '/training/videos/s500-overview',
          duration: 180,
          mandatory: true
        },
        {
          title: 'Psychrometry for Restoration',
          url: '/training/videos/psychrometry',
          duration: 120,
          mandatory: true
        },
        {
          title: 'Moisture Measurement Techniques',
          url: '/training/videos/moisture-measurement',
          duration: 90,
          mandatory: true
        }
      ],
      readings: [
        {
          title: 'ANSI/IICRC S500 Standard Summary',
          content: 'Key principles of water damage restoration',
          estimatedTime: 180,
          source: 'IICRC'
        },
        {
          title: 'Drying Science and Technology',
          content: 'Advanced structural drying concepts',
          estimatedTime: 120,
          source: 'Restoration Industry Association'
        }
      ],
      assignments: [
        {
          title: 'Drying Plan Development',
          description: 'Create detailed drying plan for 3 scenarios',
          type: 'PRACTICAL',
          requirements: [
            'Category 2 water in residential',
            'Category 3 water in commercial',
            'Class 4 materials drying',
            'Include equipment calculations'
          ],
          submissionFormat: 'Drying plans with psychrometric calculations'
        }
      ]
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false
    },
    estimatedHours: 10,
    mustCompleteBy: 7
  },

  {
    day: 7,
    title: 'IICRC Standards - S520 Mould Remediation',
    description: 'Master ANSI/IICRC S520 mould remediation standard',
    objectives: [
      'Understand Conditions 1, 2, and 3',
      'Master containment requirements',
      'Learn safety procedures',
      'Comprehend post-remediation verification'
    ],
    components: {
      videos: [
        {
          title: 'IICRC S520 Mould Standard',
          url: '/training/videos/s520-mould',
          duration: 150,
          mandatory: true
        },
        {
          title: 'Containment and Engineering Controls',
          url: '/training/videos/containment-setup',
          duration: 90,
          mandatory: true
        },
        {
          title: 'PPE and Worker Safety',
          url: '/training/videos/mould-ppe',
          duration: 60,
          mandatory: true
        }
      ],
      readings: [
        {
          title: 'ANSI/IICRC S520 Professional Mould Remediation',
          content: 'Complete standard review and application',
          estimatedTime: 150,
          source: 'IICRC'
        },
        {
          title: 'EPA Mould Remediation Guidelines',
          content: 'Schools and commercial buildings',
          estimatedTime: 90,
          source: 'US EPA (adapted for Australia)'
        }
      ],
      assignments: [
        {
          title: 'Mould Remediation Protocol',
          description: 'Develop protocol for 100m² Condition 3 mould',
          type: 'PRACTICAL',
          requirements: [
            'Containment design with pressure differentials',
            'Worker protection program',
            'Detailed work procedures',
            'Clearance criteria'
          ],
          submissionFormat: 'Complete remediation protocol'
        }
      ]
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false
    },
    estimatedHours: 8,
    mustCompleteBy: 7
  },

  // WEEK 2: Advanced Skills & Business Operations
  {
    day: 8,
    title: 'Documentation & Evidence Management',
    description: 'Professional documentation for insurance and legal purposes',
    objectives: [
      'Master photographic documentation',
      'Learn chain of custody procedures',
      'Understand moisture mapping',
      'Create defensible documentation'
    ],
    components: {
      videos: [
        {
          title: 'Forensic Photography for Claims',
          url: '/training/videos/forensic-photography',
          duration: 90,
          mandatory: true
        },
        {
          title: 'Digital Evidence Management',
          url: '/training/videos/evidence-management',
          duration: 60,
          mandatory: true
        },
        {
          title: 'Report Writing for Insurance',
          url: '/training/videos/report-writing',
          duration: 75,
          mandatory: true
        }
      ],
      readings: [
        {
          title: 'Insurance Documentation Standards',
          content: 'ICA guidelines for claim documentation',
          estimatedTime: 60,
          source: 'Insurance Council of Australia'
        },
        {
          title: 'Legal Evidence Requirements',
          content: 'Admissibility and authentication of digital evidence',
          estimatedTime: 45,
          source: 'Federal Court of Australia'
        }
      ],
      assignments: [
        {
          title: 'Mock Inspection Report',
          description: 'Complete professional inspection report',
          type: 'UPLOAD',
          requirements: [
            'Include 20+ photographs with annotations',
            'Moisture mapping with readings',
            'Scope of work with limitations',
            'Costing breakdown'
          ],
          submissionFormat: 'PDF report following NRP template'
        }
      ]
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: true
    },
    estimatedHours: 6,
    mustCompleteBy: 9
  },

  {
    day: 9,
    title: 'Customer Service Excellence',
    description: 'Managing distressed clients and difficult situations',
    objectives: [
      'Understand trauma-informed communication',
      'Master conflict resolution',
      'Learn cultural sensitivity',
      'Handle insurance disputes professionally'
    ],
    components: {
      videos: [
        {
          title: 'Trauma-Informed Customer Service',
          url: '/training/videos/trauma-informed',
          duration: 90,
          mandatory: true
        },
        {
          title: 'De-escalation Techniques',
          url: '/training/videos/de-escalation',
          duration: 60,
          mandatory: true
        },
        {
          title: 'Cultural Awareness in Service Delivery',
          url: '/training/videos/cultural-awareness',
          duration: 75,
          mandatory: true
        }
      ],
      readings: [
        {
          title: 'Psychology of Disaster Victims',
          content: 'Understanding client mental state post-disaster',
          estimatedTime: 60,
          source: 'Australian Red Cross'
        }
      ],
      assignments: [
        {
          title: 'Customer Scenario Responses',
          description: 'Respond to 10 difficult customer scenarios',
          type: 'WRITTEN',
          requirements: [
            'Angry customer about insurance',
            'Vulnerable elderly client',
            'Language barrier situation',
            'Scope creep demands'
          ],
          submissionFormat: 'Written responses demonstrating empathy'
        }
      ]
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false
    },
    estimatedHours: 5,
    mustCompleteBy: 10
  },

  {
    day: 10,
    title: 'Business Operations & Financial Management',
    description: 'Running a profitable and compliant restoration business',
    objectives: [
      'Understand job costing and pricing',
      'Master cash flow management',
      'Learn equipment ROI calculations',
      'Comprehend business insurance needs'
    ],
    components: {
      videos: [
        {
          title: 'Restoration Business Financial Management',
          url: '/training/videos/financial-management',
          duration: 120,
          mandatory: true
        },
        {
          title: 'Equipment Investment Strategies',
          url: '/training/videos/equipment-roi',
          duration: 75,
          mandatory: true
        },
        {
          title: 'Managing Subcontractors',
          url: '/training/videos/subcontractor-management',
          duration: 60,
          mandatory: true
        }
      ],
      readings: [
        {
          title: 'Restoration Industry Benchmarking',
          content: 'Profit margins and KPIs for success',
          estimatedTime: 90,
          source: 'Restoration Industry Association'
        }
      ],
      assignments: [
        {
          title: 'Business Financial Health Check',
          description: 'Analyse your business financials',
          type: 'UPLOAD',
          requirements: [
            'P&L for last 12 months',
            'Cash flow projection',
            'Break-even analysis',
            'Insurance coverage audit'
          ],
          submissionFormat: 'Financial analysis spreadsheet'
        }
      ],
      documentsRequired: [
        {
          name: 'Insurance Certificates',
          description: 'Current public liability and professional indemnity',
          format: ['PDF'],
          maxSize: 10,
          verificationRequired: true
        }
      ]
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: true
    },
    estimatedHours: 7,
    mustCompleteBy: 11
  },

  {
    day: 11,
    title: 'Quality Assurance & Compliance Systems',
    description: 'Implementing quality systems for consistent service delivery',
    objectives: [
      'Develop standard operating procedures',
      'Create quality checklists',
      'Implement compliance tracking',
      'Master audit preparation'
    ],
    components: {
      videos: [
        {
          title: 'ISO 9001 for Restoration Contractors',
          url: '/training/videos/iso-9001',
          duration: 90,
          mandatory: true
        },
        {
          title: 'Creating Effective SOPs',
          url: '/training/videos/sop-development',
          duration: 75,
          mandatory: true
        }
      ],
      readings: [
        {
          title: 'Quality Management Systems',
          content: 'Building QMS for small contractors',
          estimatedTime: 120,
          source: 'Standards Australia'
        }
      ],
      assignments: [
        {
          title: 'Develop 3 Critical SOPs',
          description: 'Create SOPs for your most common services',
          type: 'UPLOAD',
          requirements: [
            'Water damage response SOP',
            'Customer communication SOP',
            'Safety incident response SOP',
            'Include flowcharts and checklists'
          ],
          submissionFormat: 'SOP documents with version control'
        }
      ]
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: true
    },
    estimatedHours: 6,
    mustCompleteBy: 12
  },

  {
    day: 12,
    title: 'Technology & Digital Systems',
    description: 'Leveraging technology for efficiency and compliance',
    objectives: [
      'Master NRP platform features',
      'Understand API integrations',
      'Learn digital documentation tools',
      'Implement cyber security basics'
    ],
    components: {
      videos: [
        {
          title: 'NRP Platform Deep Dive',
          url: '/training/videos/nrp-platform',
          duration: 120,
          mandatory: true
        },
        {
          title: 'Mobile Apps for Field Documentation',
          url: '/training/videos/mobile-documentation',
          duration: 60,
          mandatory: true
        },
        {
          title: 'Cyber Security for Contractors',
          url: '/training/videos/cyber-security',
          duration: 75,
          mandatory: true
        }
      ],
      readings: [
        {
          title: 'NRP API Documentation',
          content: 'Integration guide for job management',
          estimatedTime: 90,
          source: 'NRP Technical Docs'
        }
      ],
      assignments: [
        {
          title: 'Platform Proficiency Test',
          description: 'Complete all NRP platform functions',
          type: 'PRACTICAL',
          requirements: [
            'Create test job',
            'Upload documentation',
            'Generate report',
            'Submit invoice'
          ],
          submissionFormat: 'Screenshots of completed tasks'
        }
      ]
    },
    completionCriteria: {
      minVideoWatchTime: 100,
      assignmentsCompleted: true,
      documentsUploaded: false
    },
    estimatedHours: 5,
    mustCompleteBy: 13
  },

  {
    day: 13,
    title: 'Proof of Work Submission',
    description: 'Submit evidence of past project competency',
    objectives: [
      'Document 5 claims per work type',
      'Provide comprehensive project evidence',
      'Demonstrate technical competency',
      'Show customer satisfaction'
    ],
    components: {
      videos: [
        {
          title: 'Preparing Your Proof of Work',
          url: '/training/videos/proof-of-work',
          duration: 60,
          mandatory: true
        }
      ],
      readings: [
        {
          title: 'Evidence Requirements Guide',
          content: 'What constitutes acceptable proof',
          estimatedTime: 45,
          source: 'NRP Onboarding Team'
        }
      ],
      assignments: [
        {
          title: 'Submit 5 Water Damage Claims',
          description: 'Provide evidence of 5 completed water damage projects',
          type: 'UPLOAD',
          requirements: [
            'Before and after photos',
            'Moisture readings documentation',
            'Scope of work',
            'Customer testimonial or satisfaction'
          ],
          submissionFormat: 'Individual claim folders'
        },
        {
          title: 'Submit 5 Mould Remediation Claims',
          description: 'Provide evidence of 5 completed mould projects',
          type: 'UPLOAD',
          requirements: [
            'Containment setup photos',
            'Clearance certificates',
            'PPE compliance evidence',
            'Post-remediation verification'
          ],
          submissionFormat: 'Individual claim folders'
        }
      ],
      documentsRequired: [
        {
          name: 'Project Portfolio',
          description: 'Portfolio of best work examples',
          format: ['PDF', 'ZIP'],
          maxSize: 50,
          verificationRequired: true
        }
      ]
    },
    completionCriteria: {
      minVideoWatchTime: 100,
      assignmentsCompleted: true,
      documentsUploaded: true
    },
    estimatedHours: 8,
    mustCompleteBy: 13
  },

  {
    day: 14,
    title: 'Final Assessment & Certification',
    description: 'Complete final competency assessment and agreement signing',
    objectives: [
      'Pass comprehensive competency test',
      'Complete practical scenarios',
      'Sign partnership agreements',
      'Receive NRP certification'
    ],
    components: {
      videos: [
        {
          title: 'Final Assessment Preparation',
          url: '/training/videos/final-prep',
          duration: 45,
          mandatory: true
        }
      ],
      assignments: [
        {
          title: 'Comprehensive Competency Test',
          description: '100-question assessment covering all modules',
          type: 'QUIZ',
          requirements: [
            'Score minimum 80% overall',
            'No category below 75%',
            '3-hour time limit',
            'Proctored online'
          ],
          submissionFormat: 'Online proctored exam'
        },
        {
          title: 'Practical Scenario Assessment',
          description: 'Complete 3 complex scenario responses',
          type: 'PRACTICAL',
          requirements: [
            'Category 3 water with asbestos',
            'Insurance dispute resolution',
            'Multi-trade coordination scenario'
          ],
          submissionFormat: 'Video recorded responses'
        }
      ],
      documentsRequired: [
        {
          name: 'Signed Partnership Agreement',
          description: 'Final NRP partnership agreement',
          format: ['PDF'],
          maxSize: 5,
          verificationRequired: true
        },
        {
          name: 'Code of Conduct Acknowledgment',
          description: 'Signed code of conduct',
          format: ['PDF'],
          maxSize: 2,
          verificationRequired: true
        }
      ]
    },
    completionCriteria: {
      minVideoWatchTime: 100,
      assignmentsCompleted: true,
      documentsUploaded: true,
      quizScore: 80
    },
    estimatedHours: 6,
    mustCompleteBy: 14
  }
];

// Progress tracking functions
export interface OnboardingProgress {
  contractorId: string;
  startDate: Date;
  currentDay: number;
  completedDays: number[];
  moduleProgress: Map<number, ModuleProgress>;
  overallCompletion: number;
  estimatedCompletionDate: Date;
  blockers: string[];
}

export interface ModuleProgress {
  day: number;
  videosWatched: Map<string, number>; // video title -> percentage watched
  readingsCompleted: string[];
  assignmentsSubmitted: string[];
  documentsUploaded: string[];
  quizScores: Map<string, number>;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  completedAt?: Date;
}

export function calculateModuleCompletion(
  module: OnboardingModule,
  progress: ModuleProgress
): number {
  let totalPoints = 0;
  let earnedPoints = 0;
  
  // Video completion
  if (module.components.videos) {
    const requiredWatchTime = module.completionCriteria.minVideoWatchTime;
    module.components.videos.forEach(video => {
      if (video.mandatory) {
        totalPoints += 1;
        const watched = progress.videosWatched.get(video.title) || 0;
        if (watched >= requiredWatchTime) {
          earnedPoints += 1;
        }
      }
    });
  }
  
  // Assignments
  if (module.components.assignments && module.completionCriteria.assignmentsCompleted) {
    module.components.assignments.forEach(assignment => {
      totalPoints += 1;
      if (progress.assignmentsSubmitted.includes(assignment.title)) {
        earnedPoints += 1;
      }
    });
  }
  
  // Documents
  if (module.components.documentsRequired && module.completionCriteria.documentsUploaded) {
    module.components.documentsRequired.forEach(doc => {
      totalPoints += 1;
      if (progress.documentsUploaded.includes(doc.name)) {
        earnedPoints += 1;
      }
    });
  }
  
  // Quiz scores
  if (module.completionCriteria.quizScore) {
    const quizAssignments = module.components.assignments?.filter(a => a.type === 'QUIZ') || [];
    quizAssignments.forEach(quiz => {
      totalPoints += 1;
      const score = progress.quizScores.get(quiz.title) || 0;
      if (score >= module.completionCriteria.quizScore!) {
        earnedPoints += 1;
      }
    });
  }
  
  return totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
}

export function canProgressToNextDay(
  currentDay: number,
  progress: OnboardingProgress
): boolean {
  const currentModule = ONBOARDING_PROGRAM[currentDay - 1];
  const moduleProgress = progress.moduleProgress.get(currentDay);
  
  if (!moduleProgress) return false;
  
  // Check if current module is completed
  const completion = calculateModuleCompletion(currentModule, moduleProgress);
  if (completion < 100) return false;
  
  // Check if required days are completed
  if (currentDay > currentModule.mustCompleteBy) {
    return false; // Past deadline
  }
  
  // Check if minimum time has passed (prevent rushing)
  const startDate = new Date(progress.startDate);
  const currentDate = new Date();
  const daysPassed = Math.floor((currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24));
  
  return daysPassed >= currentDay - 1; // Can't jump ahead of actual days
}

export function generateCertificate(
  contractorId: string,
  completionDate: Date
): string {
  const certNumber = `NRP-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const expiryDate = new Date(completionDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + 2); // 2-year validity
  
  return certNumber;
}