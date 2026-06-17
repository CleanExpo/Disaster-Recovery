/**
 * 22-Module Comprehensive Onboarding Programme
 * Designed to prevent rapid completion and ensure thorough contractor vetting
 */

import { OnboardingModule } from '@/types/contractor-competency';
import { ONBOARDING_MODULE_COUNT } from './program-constants';

export const ONBOARDING_PROGRAM: OnboardingModule[] = [
  // WEEK 1: Foundation & Compliance
  {
    day: 1,
    title: 'Welcome & Australian Legal Framework',
    description: 'Introduction to NRPG platform and Australian consumer protection laws',
    objectives: [
      "Understand NRPG's role as a claims distributor",
      'Master Australian Consumer Law requirements',
      'Learn mandatory disclosure obligations',
      'Comprehend cooling-off period rules',
    ],
    components: {
      videos: [
        {
          title: 'Welcome to National Recovery Partners',
          url: '/training/videos/welcome-nrp',
          duration: 45,
          mandatory: true,
        },
        {
          title: 'Australian Consumer Law for Contractors',
          url: '/training/videos/acl-essentials',
          duration: 90,
          mandatory: true,
        },
        {
          title: 'Dealing with Vulnerable Consumers',
          url: '/training/videos/vulnerable-consumers',
          duration: 60,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Competition and Consumer Act 2010 - Key Sections',
          content:
            'Detailed analysis of Sections 18 (Misleading conduct), 29 (False representations), and Schedule 2 (Consumer guarantees)',
          estimatedTime: 120,
          source: 'ACCC.gov.au',
        },
        {
          title: 'Unfair Contract Terms Guide',
          content: 'Understanding and avoiding unfair terms in standard form contracts',
          estimatedTime: 60,
          source: 'Australian Government Treasury',
        },
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
            'Include cooling-off period notices',
          ],
          submissionFormat: 'PDF documents with annotations',
        },
        {
          title: 'Consumer Rights Quiz',
          description: 'Complete quiz on consumer guarantees and remedies',
          type: 'QUIZ',
          requirements: [
            'Score minimum 80% to proceed',
            '20 questions from government sources',
            'Covers consumer guarantees, remedies, and penalties',
          ],
          submissionFormat: 'Online quiz submission',
        },
      ],
      documentsRequired: [
        {
          name: 'Current Terms and Conditions',
          description: 'Your existing T&Cs for review',
          format: ['PDF', 'DOCX'],
          maxSize: 5,
          verificationRequired: true,
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: true,
      quizScore: 80,
    },
    estimatedHours: 8,
    mustCompleteBy: 1,
  },

  {
    day: 2,
    title: 'Insurance Contracts Act & Section 54 Rights',
    description: 'Master insurance law and contractor rights under Section 54',
    objectives: [
      'Understand Section 54 protections',
      'Learn make-safe work authorisation limits',
      'Master cash settlement calculations',
      'Comprehend duty of disclosure',
    ],
    components: {
      videos: [
        {
          title: 'Section 54 Insurance Contracts Act Explained',
          url: '/training/videos/section-54-rights',
          duration: 120,
          mandatory: true,
        },
        {
          title: 'Managing Insurance Authorisations',
          url: '/training/videos/insurance-authorisations',
          duration: 75,
          mandatory: true,
        },
        {
          title: 'Cash Settlement vs Replacement',
          url: '/training/videos/settlement-types',
          duration: 60,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Insurance Contracts Act 1984 - Critical Sections',
          content: 'Deep dive into Sections 13, 21, 28, 54, and 78',
          estimatedTime: 150,
          source: 'Federal Register of Legislation',
        },
        {
          title: 'General Insurance Code of Practice 2020',
          content: 'Understanding insurer obligations and claims handling',
          estimatedTime: 90,
          source: 'Insurance Council of Australia',
        },
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
            'Include GST considerations',
          ],
          submissionFormat: 'Spreadsheet with formulas visible',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false,
      quizScore: 85,
    },
    estimatedHours: 7,
    mustCompleteBy: 2,
  },

  {
    day: 3,
    title: 'Building & Construction Security of Payment',
    description: 'Payment rights and adjudication processes',
    objectives: [
      'Master payment claim requirements',
      'Understand adjudication process',
      'Learn variation documentation',
      'Prevent payment disputes',
    ],
    components: {
      videos: [
        {
          title: 'Security of Payment Acts - State by State',
          url: '/training/videos/sop-acts',
          duration: 90,
          mandatory: true,
        },
        {
          title: 'Preparing Valid Payment Claims',
          url: '/training/videos/payment-claims',
          duration: 60,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Building and Construction Industry Security of Payment Acts',
          content: 'Comparison of NSW, QLD, VIC, and WA legislation',
          estimatedTime: 120,
          source: 'State Government Legislation',
        },
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
            'Include supporting documentation list',
          ],
          submissionFormat: 'Payment claim template',
        },
      ],
      documentsRequired: [
        {
          name: 'Sample Invoice',
          description: 'Example of your current invoicing',
          format: ['PDF'],
          maxSize: 2,
          verificationRequired: false,
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: true,
    },
    estimatedHours: 6,
    mustCompleteBy: 3,
  },

  {
    day: 4,
    title: 'GST, Tax Compliance & ABN Requirements',
    description: 'Australian taxation requirements for contractors',
    objectives: [
      'Master GST calculations and reporting',
      'Understand tax invoice requirements',
      'Learn PAYG withholding rules',
      'Comprehend contractor vs employee distinctions',
    ],
    components: {
      videos: [
        {
          title: 'GST for Disaster Recovery Services',
          url: '/training/videos/gst-compliance',
          duration: 75,
          mandatory: true,
        },
        {
          title: 'Tax Invoices and Record Keeping',
          url: '/training/videos/tax-invoices',
          duration: 60,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'A New Tax System (GST) Act 1999',
          content: 'Key provisions for service providers',
          estimatedTime: 90,
          source: 'Australian Taxation Office',
        },
        {
          title: 'PSI and PSB Rules',
          content: 'Personal services income and business tests',
          estimatedTime: 60,
          source: 'ATO.gov.au',
        },
      ],
      assignments: [
        {
          title: 'Tax Compliance Checklist',
          description: 'Complete self-assessment of tax obligations',
          type: 'QUIZ',
          requirements: [
            'Answer 25 questions on GST and tax',
            'Include BAS reporting scenarios',
            'Score minimum 75% to pass',
          ],
          submissionFormat: 'Online assessment',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false,
      quizScore: 75,
    },
    estimatedHours: 5,
    mustCompleteBy: 4,
  },

  {
    day: 5,
    title: 'Work Health & Safety Fundamentals',
    description: 'WHS obligations and safe work practices',
    objectives: [
      'Understand PCBU duties',
      'Master incident reporting requirements',
      'Learn asbestos awareness',
      'Comprehend site safety planning',
    ],
    components: {
      videos: [
        {
          title: 'WHS Act and Your Obligations',
          url: '/training/videos/whs-obligations',
          duration: 90,
          mandatory: true,
        },
        {
          title: 'Asbestos Identification and Safety',
          url: '/training/videos/asbestos-safety',
          duration: 120,
          mandatory: true,
        },
        {
          title: 'Working at Heights Safely',
          url: '/training/videos/heights-safety',
          duration: 75,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Work Health and Safety Act 2011',
          content: 'Primary duties and incident notification',
          estimatedTime: 120,
          source: 'Safe Work Australia',
        },
        {
          title: 'Managing Asbestos Code of Practice',
          content: 'Identification, assessment, and control measures',
          estimatedTime: 90,
          source: 'Safe Work Australia',
        },
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
            'PPE requirements matrix',
          ],
          submissionFormat: 'Safety plan document',
        },
        {
          title: 'WHS Incident Scenario',
          description: 'Respond to 5 safety incident scenarios',
          type: 'WRITTEN',
          requirements: [
            'Identify reporting obligations',
            'Detail immediate actions',
            'Specify notification timeframes',
            'Document preservation requirements',
          ],
          submissionFormat: 'Written responses',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 100,
      assignmentsCompleted: true,
      documentsUploaded: true,
    },
    estimatedHours: 8,
    mustCompleteBy: 5,
  },

  {
    day: 6,
    title: 'IICRC Standards - S500:2025 Water Damage',
    description: 'Master ANSI/IICRC S500:2025 standard for water damage restoration',
    objectives: [
      'Understand water categories and classes',
      'Master psychrometry principles',
      'Learn structural drying procedures',
      'Comprehend documentation requirements',
    ],
    components: {
      videos: [
        {
          title: 'IICRC S500:2025 Complete Overview',
          url: '/training/videos/s500-overview',
          duration: 180,
          mandatory: true,
        },
        {
          title: 'Psychrometry for Restoration',
          url: '/training/videos/psychrometry',
          duration: 120,
          mandatory: true,
        },
        {
          title: 'Moisture Measurement Techniques',
          url: '/training/videos/moisture-measurement',
          duration: 90,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'ANSI/IICRC S500:2025 Standard Summary',
          content: 'Key principles of water damage restoration',
          estimatedTime: 180,
          source: 'IICRC',
        },
        {
          title: 'Drying Science and Technology',
          content: 'Advanced structural drying concepts',
          estimatedTime: 120,
          source: 'Restoration Industry Association',
        },
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
            'Include equipment calculations',
          ],
          submissionFormat: 'Drying plans with psychrometric calculations',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false,
    },
    estimatedHours: 10,
    mustCompleteBy: 7,
  },

  {
    day: 7,
    title: 'IICRC Standards - S520:2025 Mould Remediation',
    description: 'Master ANSI/IICRC S520:2025 mould remediation standard',
    objectives: [
      'Understand Conditions 1, 2, and 3',
      'Master containment requirements',
      'Learn safety procedures',
      'Comprehend post-remediation verification',
    ],
    components: {
      videos: [
        {
          title: 'IICRC S520:2025 Mould Standard',
          url: '/training/videos/s520-mould',
          duration: 150,
          mandatory: true,
        },
        {
          title: 'Containment and Engineering Controls',
          url: '/training/videos/containment-setup',
          duration: 90,
          mandatory: true,
        },
        {
          title: 'PPE and Worker Safety',
          url: '/training/videos/mould-ppe',
          duration: 60,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'ANSI/IICRC S520:2025 Professional Mould Remediation',
          content: 'Complete standard review and application',
          estimatedTime: 150,
          source: 'IICRC',
        },
        {
          title: 'EPA Mould Remediation Guidelines',
          content: 'Schools and commercial buildings',
          estimatedTime: 90,
          source: 'US EPA (adapted for Australia)',
        },
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
            'Clearance criteria',
          ],
          submissionFormat: 'Complete remediation protocol',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false,
    },
    estimatedHours: 8,
    mustCompleteBy: 7,
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
      'Create defensible documentation',
    ],
    components: {
      videos: [
        {
          title: 'Forensic Photography for Claims',
          url: '/training/videos/forensic-photography',
          duration: 90,
          mandatory: true,
        },
        {
          title: 'Digital Evidence Management',
          url: '/training/videos/evidence-management',
          duration: 60,
          mandatory: true,
        },
        {
          title: 'Report Writing for Insurance',
          url: '/training/videos/report-writing',
          duration: 75,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Insurance Documentation Standards',
          content: 'ICA guidelines for claim documentation',
          estimatedTime: 60,
          source: 'Insurance Council of Australia',
        },
        {
          title: 'Legal Evidence Requirements',
          content: 'Admissibility and authentication of digital evidence',
          estimatedTime: 45,
          source: 'Federal Court of Australia',
        },
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
            'Costing breakdown',
          ],
          submissionFormat: 'PDF report following NRPG template',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: true,
    },
    estimatedHours: 6,
    mustCompleteBy: 9,
  },

  {
    day: 9,
    title: 'Customer Service Excellence',
    description: 'Managing distressed clients and difficult situations',
    objectives: [
      'Understand trauma-informed communication',
      'Master conflict resolution',
      'Learn cultural sensitivity',
      'Handle insurance disputes professionally',
    ],
    components: {
      videos: [
        {
          title: 'Trauma-Informed Customer Service',
          url: '/training/videos/trauma-informed',
          duration: 90,
          mandatory: true,
        },
        {
          title: 'De-escalation Techniques',
          url: '/training/videos/de-escalation',
          duration: 60,
          mandatory: true,
        },
        {
          title: 'Cultural Awareness in Service Delivery',
          url: '/training/videos/cultural-awareness',
          duration: 75,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Psychology of Disaster Victims',
          content: 'Understanding client mental state post-disaster',
          estimatedTime: 60,
          source: 'Australian Red Cross',
        },
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
            'Scope creep demands',
          ],
          submissionFormat: 'Written responses demonstrating empathy',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false,
    },
    estimatedHours: 5,
    mustCompleteBy: 10,
  },

  {
    day: 10,
    title: 'Business Operations & Financial Management',
    description: 'Running a profitable and compliant restoration business',
    objectives: [
      'Understand job costing and pricing',
      'Master cash flow management',
      'Learn equipment ROI calculations',
      'Comprehend business insurance needs',
    ],
    components: {
      videos: [
        {
          title: 'Restoration Business Financial Management',
          url: '/training/videos/financial-management',
          duration: 120,
          mandatory: true,
        },
        {
          title: 'Equipment Investment Strategies',
          url: '/training/videos/equipment-roi',
          duration: 75,
          mandatory: true,
        },
        {
          title: 'Managing Subcontractors',
          url: '/training/videos/subcontractor-management',
          duration: 60,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Restoration Industry Benchmarking',
          content: 'Profit margins and KPIs for success',
          estimatedTime: 90,
          source: 'Restoration Industry Association',
        },
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
            'Insurance coverage audit',
          ],
          submissionFormat: 'Financial analysis spreadsheet',
        },
      ],
      documentsRequired: [
        {
          name: 'Insurance Certificates',
          description: 'Current public liability and professional indemnity',
          format: ['PDF'],
          maxSize: 10,
          verificationRequired: true,
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: true,
    },
    estimatedHours: 7,
    mustCompleteBy: 11,
  },

  {
    day: 11,
    title: 'Quality Assurance & Compliance Systems',
    description: 'Implementing quality systems for consistent service delivery',
    objectives: [
      'Develop standard operating procedures',
      'Create quality checklists',
      'Implement compliance tracking',
      'Master audit preparation',
    ],
    components: {
      videos: [
        {
          title: 'ISO 9001 for Restoration Contractors',
          url: '/training/videos/iso-9001',
          duration: 90,
          mandatory: true,
        },
        {
          title: 'Creating Effective SOPs',
          url: '/training/videos/sop-development',
          duration: 75,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Quality Management Systems',
          content: 'Building QMS for small contractors',
          estimatedTime: 120,
          source: 'Standards Australia',
        },
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
            'Include flowcharts and checklists',
          ],
          submissionFormat: 'SOP documents with version control',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: true,
    },
    estimatedHours: 6,
    mustCompleteBy: 12,
  },

  {
    day: 12,
    title: 'Technology & Digital Systems',
    description: 'Leveraging technology for efficiency and compliance',
    objectives: [
      'Master NRPG platform features',
      'Understand API integrations',
      'Learn digital documentation tools',
      'Implement cyber security basics',
    ],
    components: {
      videos: [
        {
          title: 'NRPG Platform Deep Dive',
          url: '/training/videos/nrp-platform',
          duration: 120,
          mandatory: true,
        },
        {
          title: 'Mobile Apps for Field Documentation',
          url: '/training/videos/mobile-documentation',
          duration: 60,
          mandatory: true,
        },
        {
          title: 'Cyber Security for Contractors',
          url: '/training/videos/cyber-security',
          duration: 75,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'NRPG API Documentation',
          content: 'Integration guide for job management',
          estimatedTime: 90,
          source: 'NRPG Technical Docs',
        },
      ],
      assignments: [
        {
          title: 'Platform Proficiency Test',
          description: 'Complete all NRPG platform functions',
          type: 'PRACTICAL',
          requirements: [
            'Create test job',
            'Upload documentation',
            'Generate report',
            'Submit invoice',
          ],
          submissionFormat: 'Screenshots of completed tasks',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 100,
      assignmentsCompleted: true,
      documentsUploaded: false,
    },
    estimatedHours: 5,
    mustCompleteBy: 13,
  },

  {
    day: 13,
    title: 'Proof of Work Submission',
    description: 'Submit evidence of past project competency',
    objectives: [
      'Document 5 claims per work type',
      'Provide comprehensive project evidence',
      'Demonstrate technical competency',
      'Show customer satisfaction',
    ],
    components: {
      videos: [
        {
          title: 'Preparing Your Proof of Work',
          url: '/training/videos/proof-of-work',
          duration: 60,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Evidence Requirements Guide',
          content: 'What constitutes acceptable proof',
          estimatedTime: 45,
          source: 'NRPG Onboarding Team',
        },
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
            'Customer testimonial or satisfaction',
          ],
          submissionFormat: 'Individual claim folders',
        },
        {
          title: 'Submit 5 Mould Remediation Claims',
          description: 'Provide evidence of 5 completed mould projects',
          type: 'UPLOAD',
          requirements: [
            'Containment setup photos',
            'Clearance certificates',
            'PPE compliance evidence',
            'Post-remediation verification',
          ],
          submissionFormat: 'Individual claim folders',
        },
      ],
      documentsRequired: [
        {
          name: 'Project Portfolio',
          description: 'Portfolio of best work examples',
          format: ['PDF', 'ZIP'],
          maxSize: 50,
          verificationRequired: true,
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 100,
      assignmentsCompleted: true,
      documentsUploaded: true,
    },
    estimatedHours: 8,
    mustCompleteBy: 13,
  },

  {
    day: 14,
    title: 'Core Competency Assessment',
    description: 'Complete the technical competency assessment before dispatch-readiness modules',
    objectives: [
      'Pass comprehensive competency test',
      'Complete practical scenarios',
      'Identify any competency gaps before live dispatch',
      'Confirm readiness for operational modules',
    ],
    components: {
      videos: [
        {
          title: 'Final Assessment Preparation',
          url: '/training/videos/final-prep',
          duration: 45,
          mandatory: true,
        },
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
            'Proctored online',
          ],
          submissionFormat: 'Online proctored exam',
        },
        {
          title: 'Practical Scenario Assessment',
          description: 'Complete 3 complex scenario responses',
          type: 'PRACTICAL',
          requirements: [
            'Category 3 water with asbestos',
            'Insurance dispute resolution',
            'Multi-trade coordination scenario',
          ],
          submissionFormat: 'Video recorded responses',
        },
      ],
      documentsRequired: [
        {
          name: 'Signed Partnership Agreement',
          description: 'Final NRPG partnership agreement',
          format: ['PDF'],
          maxSize: 5,
          verificationRequired: true,
        },
        {
          name: 'Code of Conduct Acknowledgment',
          description: 'Signed code of conduct',
          format: ['PDF'],
          maxSize: 2,
          verificationRequired: true,
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 100,
      assignmentsCompleted: true,
      documentsUploaded: true,
      quizScore: 80,
    },
    estimatedHours: 6,
    mustCompleteBy: 14,
  },

  {
    day: 15,
    title: 'Dispatch Readiness & Lead Acceptance',
    description: 'Prepare to receive, assess and accept NRPG-referred work',
    objectives: [
      'Understand the JobOffer lifecycle',
      'Respond to dispatch within the required acceptance window',
      'Assess job fit by category, distance, capacity and certification',
      'Know when to decline quickly so the next contractor can be offered',
    ],
    components: {
      videos: [
        {
          title: 'How NRPG Dispatch Works',
          url: '/training/videos/dispatch-readiness',
          duration: 50,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Dispatch Acceptance Standard',
          content: 'Contractor expectations for accepting, declining and escalating job offers.',
          estimatedTime: 45,
          source: 'NRPG Operations',
        },
      ],
      assignments: [
        {
          title: 'Dispatch Scenario Response',
          description: 'Triage five sample job offers and explain accept or decline decisions.',
          type: 'WRITTEN',
          requirements: [
            'Assess urgency and service category',
            'Check travel radius and crew capacity',
            'Flag any certification mismatch',
            'Respond within the offer window',
          ],
          submissionFormat: 'Written scenario worksheet',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false,
      quizScore: 80,
    },
    estimatedHours: 4,
    mustCompleteBy: 15,
  },

  {
    day: 16,
    title: 'Emergency Lead Response Protocol',
    description: 'Handle first contact with distressed property owners safely and professionally',
    objectives: [
      'Make first contact without promising price, coverage or outcome',
      'Confirm safety, access and immediate make-safe requirements',
      'Use trauma-informed communication with distressed clients',
      'Escalate life-safety risks to emergency services',
    ],
    components: {
      videos: [
        {
          title: 'First Call After a Disaster',
          url: '/training/videos/emergency-lead-response',
          duration: 60,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Distressed Client Communication Guide',
          content: 'Plain-English scripts and escalation thresholds for high-stress intake calls.',
          estimatedTime: 60,
          source: 'NRPG Client Care',
        },
      ],
      assignments: [
        {
          title: 'First-Contact Role Play',
          description: 'Record a short response to an urgent water-damage lead.',
          type: 'PRACTICAL',
          requirements: [
            'Confirm caller safety',
            'Avoid insurance outcome promises',
            'Explain next steps clearly',
            'Capture access constraints',
          ],
          submissionFormat: 'Video or audio recording',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false,
    },
    estimatedHours: 4,
    mustCompleteBy: 16,
  },

  {
    day: 17,
    title: 'Site Attendance & Make-Safe Documentation',
    description: 'Document the first site attendance and emergency stabilisation work',
    objectives: [
      'Capture arrival, access, safety and scope notes',
      'Photograph make-safe work before, during and after',
      'Record equipment deployed and materials affected',
      'Separate emergency mitigation from full restoration scope',
    ],
    components: {
      videos: [
        {
          title: 'Make-Safe Documentation Walkthrough',
          url: '/training/videos/make-safe-documentation',
          duration: 55,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Emergency Mitigation Evidence Checklist',
          content: 'Required photos, notes and readings for make-safe attendance.',
          estimatedTime: 45,
          source: 'NRPG Documentation',
        },
      ],
      assignments: [
        {
          title: 'Make-Safe Evidence Pack',
          description: 'Build an evidence pack from a sample emergency attendance.',
          type: 'UPLOAD',
          requirements: [
            'Before and after photo set',
            'Safety notes',
            'Equipment list',
            'Client acknowledgement',
          ],
          submissionFormat: 'PDF or ZIP evidence pack',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false,
    },
    estimatedHours: 5,
    mustCompleteBy: 17,
  },

  {
    day: 18,
    title: 'Insurance Documentation Pack Quality',
    description: 'Produce insurer-usable documentation without making coverage claims',
    objectives: [
      'Prepare an auditable scope of works',
      'Attach moisture, photo and equipment evidence',
      'Avoid prohibited insurance phrases',
      'Explain findings without giving insurance advice',
    ],
    components: {
      videos: [
        {
          title: 'Building a Claim Support Pack',
          url: '/training/videos/claim-support-pack',
          duration: 70,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Claim Pack Quality Standard',
          content: 'NRPG expectations for scopes, logs, photos and client-facing summaries.',
          estimatedTime: 75,
          source: 'NRPG Compliance',
        },
      ],
      assignments: [
        {
          title: 'Claim Support Pack Review',
          description: 'Review a sample pack and correct missing evidence or risky language.',
          type: 'WRITTEN',
          requirements: [
            'Identify unsupported claims',
            'Add missing evidence items',
            'Replace banned phrases',
            'Summarise scope in client-safe language',
          ],
          submissionFormat: 'Annotated PDF',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false,
      quizScore: 80,
    },
    estimatedHours: 5,
    mustCompleteBy: 18,
  },

  {
    day: 19,
    title: 'Client Communication & Review Handover',
    description: 'Keep clients informed from acceptance through completion',
    objectives: [
      'Set realistic expectations without guarantees',
      'Send progress updates at key milestones',
      'Explain delays and access issues professionally',
      'Request reviews only after appropriate completion points',
    ],
    components: {
      videos: [
        {
          title: 'Client Updates That Prevent Complaints',
          url: '/training/videos/client-communication',
          duration: 45,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Communication Milestone Templates',
          content:
            'Templates for first contact, attendance, delay, completion and review requests.',
          estimatedTime: 50,
          source: 'NRPG Client Care',
        },
      ],
      assignments: [
        {
          title: 'Client Update Sequence',
          description: 'Draft the message sequence for a multi-day water-damage job.',
          type: 'WRITTEN',
          requirements: [
            'Initial acceptance message',
            'On-site update',
            'Drying progress update',
            'Completion and next-steps message',
          ],
          submissionFormat: 'Message sequence document',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false,
    },
    estimatedHours: 4,
    mustCompleteBy: 19,
  },

  {
    day: 20,
    title: 'Complaints, Disputes & Escalation',
    description: 'Handle service complaints, disputed scopes and urgent escalations',
    objectives: [
      'Recognise complaint and dispute triggers early',
      'Preserve evidence and communication history',
      'Escalate to NRPG operations when required',
      'Maintain professional boundaries with insurers and clients',
    ],
    components: {
      videos: [
        {
          title: 'Dispute Handling for Restoration Contractors',
          url: '/training/videos/dispute-handling',
          duration: 55,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Escalation Matrix',
          content: 'When to self-resolve, when to notify NRPG, and when to pause work.',
          estimatedTime: 45,
          source: 'NRPG Operations',
        },
      ],
      assignments: [
        {
          title: 'Dispute Escalation Case Note',
          description: 'Write a compliant case note for a disputed scope scenario.',
          type: 'WRITTEN',
          requirements: [
            'Separate facts from opinion',
            'Summarise evidence',
            'Identify next action owner',
            'Avoid blame language',
          ],
          submissionFormat: 'Case note',
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: false,
      quizScore: 80,
    },
    estimatedHours: 4,
    mustCompleteBy: 20,
  },

  {
    day: 21,
    title: 'Territory Activation & Capacity Planning',
    description: 'Confirm service areas, capacity and live dispatch settings',
    objectives: [
      'Confirm territory and after-hours coverage',
      'Set crew, vehicle and equipment capacity',
      'Define categories available for live dispatch',
      'Understand suspension triggers for expired insurance or KPI breaches',
    ],
    components: {
      videos: [
        {
          title: 'Activating Your NRPG Territory',
          url: '/training/videos/territory-activation',
          duration: 50,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Territory and Capacity Checklist',
          content:
            'Required operational settings before a contractor enters the live dispatch pool.',
          estimatedTime: 50,
          source: 'NRPG Dispatch',
        },
      ],
      assignments: [
        {
          title: 'Capacity Declaration',
          description: 'Submit the live dispatch settings for your business.',
          type: 'UPLOAD',
          requirements: [
            'Primary service postcode',
            'Radius or territory list',
            'Approved service categories',
            'After-hours and weekend availability',
            'Maximum concurrent jobs',
          ],
          submissionFormat: 'Completed declaration form',
        },
      ],
      documentsRequired: [
        {
          name: 'Territory Activation Declaration',
          description: 'Signed declaration of service area and capacity.',
          format: ['PDF'],
          maxSize: 5,
          verificationRequired: true,
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 95,
      assignmentsCompleted: true,
      documentsUploaded: true,
    },
    estimatedHours: 4,
    mustCompleteBy: 21,
  },

  {
    day: 22,
    title: 'Final Network Launch Sign-Off',
    description: 'Complete final agreement, launch checklist and live-network approval',
    objectives: [
      'Confirm all documents and competency evidence are complete',
      'Sign the final contractor obligations acknowledgement',
      'Pass final launch-readiness review',
      'Prepare to receive live NRPG leads',
    ],
    components: {
      videos: [
        {
          title: 'Your First Week Live on NRPG',
          url: '/training/videos/network-launch',
          duration: 40,
          mandatory: true,
        },
      ],
      readings: [
        {
          title: 'Live Network Launch Checklist',
          content:
            'Final pre-launch checklist for profile, billing, territory, dispatch and support.',
          estimatedTime: 45,
          source: 'NRPG Launch Team',
        },
      ],
      assignments: [
        {
          title: 'Final Launch Checklist',
          description: 'Confirm every launch item is complete before dispatch is enabled.',
          type: 'UPLOAD',
          requirements: [
            'Profile details verified',
            'Documents verified',
            'Payment method confirmed',
            'Territory settings confirmed',
            'Dispatch contact tested',
          ],
          submissionFormat: 'Signed checklist PDF',
        },
        {
          title: 'Network Launch Review',
          description: 'Final reviewed assessment covering modules 1-22.',
          type: 'QUIZ',
          requirements: [
            'Score minimum 85% overall',
            'No compliance category below 80%',
            'Reviewed by NRPG operations before activation',
          ],
          submissionFormat: 'Online assessment',
        },
      ],
      documentsRequired: [
        {
          name: 'Signed Contractor Obligations Acknowledgement',
          description: 'Final acknowledgement before live dispatch activation.',
          format: ['PDF'],
          maxSize: 5,
          verificationRequired: true,
        },
      ],
    },
    completionCriteria: {
      minVideoWatchTime: 100,
      assignmentsCompleted: true,
      documentsUploaded: true,
      quizScore: 85,
    },
    estimatedHours: 5,
    mustCompleteBy: 22,
  },
];

if (ONBOARDING_PROGRAM.length !== ONBOARDING_MODULE_COUNT) {
  throw new Error(
    `ONBOARDING_PROGRAM must define ${ONBOARDING_MODULE_COUNT} modules; found ${ONBOARDING_PROGRAM.length}.`,
  );
}

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
  progress: ModuleProgress,
): number {
  let totalPoints = 0;
  let earnedPoints = 0;

  // Video completion
  if (module.components.videos) {
    const requiredWatchTime = module.completionCriteria.minVideoWatchTime;
    module.components.videos.forEach((video) => {
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
    module.components.assignments.forEach((assignment) => {
      totalPoints += 1;
      if (progress.assignmentsSubmitted.includes(assignment.title)) {
        earnedPoints += 1;
      }
    });
  }

  // Documents
  if (module.components.documentsRequired && module.completionCriteria.documentsUploaded) {
    module.components.documentsRequired.forEach((doc) => {
      totalPoints += 1;
      if (progress.documentsUploaded.includes(doc.name)) {
        earnedPoints += 1;
      }
    });
  }

  // Quiz scores
  if (module.completionCriteria.quizScore) {
    const quizAssignments = module.components.assignments?.filter((a) => a.type === 'QUIZ') || [];
    quizAssignments.forEach((quiz) => {
      totalPoints += 1;
      const score = progress.quizScores.get(quiz.title) || 0;
      if (score >= module.completionCriteria.quizScore!) {
        earnedPoints += 1;
      }
    });
  }

  return totalPoints > 0 ? (earnedPoints / totalPoints) * 100 : 0;
}

export function canProgressToNextDay(currentDay: number, progress: OnboardingProgress): boolean {
  const currentModule = ONBOARDING_PROGRAM[currentDay - 1];
  const moduleProgress = progress.moduleProgress.get(currentDay);

  if (!moduleProgress) return false;

  // Check if current module is completed
  const completion = calculateModuleCompletion(currentModule, moduleProgress);
  if (completion < 100) return false;

  // Check if required modules are completed
  if (currentDay > currentModule.mustCompleteBy) {
    return false; // Past deadline
  }

  // Check if minimum time has passed (prevent rushing)
  const startDate = new Date(progress.startDate);
  const currentDate = new Date();
  const daysPassed = Math.floor(
    (currentDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24),
  );

  return daysPassed >= currentDay - 1; // Can't jump ahead of actual days
}

export function generateCertificate(contractorId: string, completionDate: Date): string {
  const certNumber = `NRPG-${new Date().getFullYear()}-${Math.random().toString(36).substr(2, 9).toUpperCase()}`;
  const expiryDate = new Date(completionDate);
  expiryDate.setFullYear(expiryDate.getFullYear() + 2); // 2-year validity

  return certNumber;
}
