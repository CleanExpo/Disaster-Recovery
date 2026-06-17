/**
 * MASTER CURRICULUM INDEX
 * =======================
 *
 * This is the summary index for the complete 22-module NRPG contractor
 * onboarding curriculum. All training content is consolidated here for:
 *
 * - Video production scripts
 * - NotebookLM podcast generation
 * - Assessment and certification
 * - Learning management system
 * - Progress tracking
 *
 * CRITICAL: This represents 116-152 hours of comprehensive training material
 * covering all aspects of disaster recovery contracting in Australia.
 */

import { DayContent } from './curriculum-master';
import { ONBOARDING_MODULE_COUNT } from './program-constants';

// Curriculum module imports (content accessed via COMPLETE_CURRICULUM array)
import { COMPLETE_CURRICULUM } from './curriculum-complete';
// Re-export for convenience
export { COMPLETE_CURRICULUM };

/**
 * COMPLETE 22-MODULE CURRICULUM STRUCTURE
 * =====================================
 */
export const MASTER_CURRICULUM: Record<
  number,
  {
    title: string;
    focus: string;
    duration: string;
    modules: number;
    assessmentQuestions: number;
    practicalExercises: number;
    certificationRequirement: boolean;
  }
> = {
  1: {
    title: 'Foundation and Industry Overview',
    focus: 'Understanding disaster recovery landscape, NRPG network, safety fundamentals',
    duration: '8 hours',
    modules: 4,
    assessmentQuestions: 15,
    practicalExercises: 8,
    certificationRequirement: true,
  },
  2: {
    title: 'Water Damage Restoration Mastery',
    focus: 'Categories, classes, psychrometry, extraction, drying, documentation',
    duration: '8 hours',
    modules: 4,
    assessmentQuestions: 15,
    practicalExercises: 10,
    certificationRequirement: true,
  },
  3: {
    title: 'Mould Remediation Excellence',
    focus: 'Identification, containment, removal, prevention, health considerations',
    duration: '8 hours',
    modules: 4,
    assessmentQuestions: 12,
    practicalExercises: 8,
    certificationRequirement: true,
  },
  4: {
    title: 'Fire and Smoke Damage Restoration',
    focus: 'Smoke types, cleaning methods, deodorisation, content restoration',
    duration: '8 hours',
    modules: 4,
    assessmentQuestions: 12,
    practicalExercises: 9,
    certificationRequirement: true,
  },
  5: {
    title: 'Biohazard and Trauma Scene Cleanup',
    focus: 'Bloodborne pathogens, safety protocols, regulatory compliance, sensitivity',
    duration: '6 hours',
    modules: 3,
    assessmentQuestions: 10,
    practicalExercises: 6,
    certificationRequirement: true,
  },
  6: {
    title: 'Advanced Structural Drying',
    focus: 'Specialty materials, hardwood floors, documents, electronics',
    duration: '6 hours',
    modules: 3,
    assessmentQuestions: 10,
    practicalExercises: 7,
    certificationRequirement: true,
  },
  7: {
    title: 'Contents Processing and Pack-Out',
    focus: 'Inventory systems, cleaning methods, storage, customer communication',
    duration: '6 hours',
    modules: 3,
    assessmentQuestions: 10,
    practicalExercises: 8,
    certificationRequirement: true,
  },
  8: {
    title: 'Documentation and Technology Systems',
    focus: 'Digital documentation, RestoreAssist.app, insurance processes, CRM systems',
    duration: '8 hours',
    modules: 4,
    assessmentQuestions: 12,
    practicalExercises: 10,
    certificationRequirement: true,
  },
  9: {
    title: 'Customer Service and Communication',
    focus: 'Trauma response, conflict resolution, education, reviews management',
    duration: '6 hours',
    modules: 3,
    assessmentQuestions: 10,
    practicalExercises: 8,
    certificationRequirement: true,
  },
  10: {
    title: 'Business Operations and Management',
    focus: 'Pricing, scheduling, crew management, equipment maintenance, compliance',
    duration: '6 hours',
    modules: 3,
    assessmentQuestions: 10,
    practicalExercises: 7,
    certificationRequirement: true,
  },
  11: {
    title: 'Marketing and Business Development',
    focus: 'Local SEO, referral programs, insurance relationships, networking',
    duration: '6 hours',
    modules: 3,
    assessmentQuestions: 10,
    practicalExercises: 8,
    certificationRequirement: true,
  },
  12: {
    title: 'Advanced Restoration Techniques',
    focus: 'Odour control, antimicrobials, specialty equipment, challenging scenarios',
    duration: '8 hours',
    modules: 4,
    assessmentQuestions: 12,
    practicalExercises: 9,
    certificationRequirement: true,
  },
  13: {
    title: 'Specialty Services and Niche Markets',
    focus: 'Commercial/industrial, high-rise, heritage, marine, remote areas',
    duration: '6 hours',
    modules: 3,
    assessmentQuestions: 10,
    practicalExercises: 6,
    certificationRequirement: true,
  },
  14: {
    title: 'Core Competency Assessment',
    focus: 'Comprehensive review, practical demonstrations, business planning, launch preparation',
    duration: '8 hours',
    modules: 4,
    assessmentQuestions: 50,
    practicalExercises: 12,
    certificationRequirement: true,
  },
  15: {
    title: 'Dispatch Readiness and Lead Acceptance',
    focus: 'Lead acceptance rules, SLA expectations, territory availability, and decline reasons',
    duration: '4 hours',
    modules: 2,
    assessmentQuestions: 10,
    practicalExercises: 4,
    certificationRequirement: true,
  },
  16: {
    title: 'Emergency Lead Response Protocol',
    focus: 'First contact, triage, make-safe limits, and urgent attendance workflows',
    duration: '4 hours',
    modules: 2,
    assessmentQuestions: 10,
    practicalExercises: 4,
    certificationRequirement: true,
  },
  17: {
    title: 'Site Attendance and Make-Safe Documentation',
    focus: 'Arrival evidence, safety notes, photos, moisture readings, and immediate scope records',
    duration: '4 hours',
    modules: 2,
    assessmentQuestions: 10,
    practicalExercises: 5,
    certificationRequirement: true,
  },
  18: {
    title: 'Insurance Documentation Pack Quality',
    focus: 'Insurer-ready photo packs, drying logs, estimates, and audit-ready file structure',
    duration: '4 hours',
    modules: 2,
    assessmentQuestions: 10,
    practicalExercises: 5,
    certificationRequirement: true,
  },
  19: {
    title: 'Client Communication and Review Handover',
    focus: 'Client updates, expectation setting, handover notes, and review requests',
    duration: '4 hours',
    modules: 2,
    assessmentQuestions: 10,
    practicalExercises: 4,
    certificationRequirement: true,
  },
  20: {
    title: 'Complaints, Disputes and Escalation',
    focus: 'Complaint intake, evidence preservation, escalation timing, and fair resolution',
    duration: '4 hours',
    modules: 2,
    assessmentQuestions: 10,
    practicalExercises: 4,
    certificationRequirement: true,
  },
  21: {
    title: 'Territory Activation and Capacity Planning',
    focus: 'Territory radius, capacity declarations, after-hours coverage, and surge readiness',
    duration: '4 hours',
    modules: 2,
    assessmentQuestions: 10,
    practicalExercises: 4,
    certificationRequirement: true,
  },
  22: {
    title: 'Final Network Launch Sign-Off',
    focus: 'Final launch checklist, contractor obligations, and live dispatch approval',
    duration: '5 hours',
    modules: 2,
    assessmentQuestions: 20,
    practicalExercises: 5,
    certificationRequirement: true,
  },
};

/**
 * CERTIFICATION PATHWAY
 * =====================
 */
export const CERTIFICATION_REQUIREMENTS = {
  minimumAttendance: 0.9, // 90% attendance required
  minimumAssessmentScore: 0.8, // 80% on all assessments
  practicalDemonstrations: [
    'Water extraction and setup',
    'Mould containment construction',
    'Fire damage assessment',
    'Documentation package creation',
    'Customer interaction scenario',
  ],
  timeRequirement: '22 modules (116-152 hours)',
  prerequisites: [
    "Valid driver's licence",
    'Working with Children Check (if applicable)',
    'Police clearance',
    'Basic computer skills',
    'Physical capability for manual work',
  ],
  providedMaterials: [
    'Complete digital curriculum',
    'Video training library',
    'Assessment materials',
    'Reference documentation',
    'Industry standards guides',
    'Business templates',
    'Marketing materials',
  ],
  certificationBenefits: [
    'NRPG Certified Contractor status',
    'Lead distribution access',
    'Insurance approved vendor listing',
    'Use of NRPG branding',
    'Ongoing training access',
    'Technical support',
    'Network membership',
  ],
};

/**
 * LEARNING OBJECTIVES BY COMPETENCY
 * ==================================
 */
export const COMPETENCY_FRAMEWORK = {
  technical: {
    title: 'Technical Restoration Skills',
    objectives: [
      'Perform water extraction and structural drying',
      'Execute mould remediation following IICRC S520:2025',
      'Clean fire and smoke damage using appropriate methods',
      'Handle biohazard scenes safely and compliantly',
      'Operate all standard restoration equipment',
      'Implement containment and engineering controls',
      'Apply antimicrobials and deodorisation techniques',
    ],
    assessmentMethod: 'Practical demonstration and written exam',
    requiredScore: 85,
  },
  safety: {
    title: 'Health and Safety Competency',
    objectives: [
      'Identify and assess workplace hazards',
      'Select and use appropriate PPE',
      'Implement safe work method statements',
      'Follow confined space and height safety protocols',
      'Handle hazardous materials safely',
      'Maintain site security and public safety',
      'Report incidents and near misses',
    ],
    assessmentMethod: 'Safety scenario evaluation',
    requiredScore: 90,
  },
  documentation: {
    title: 'Documentation and Insurance',
    objectives: [
      'Create detailed scope of work documents',
      'Photograph and document losses comprehensively',
      'Use RestoreAssist.app for estimating',
      'Complete insurance paperwork accurately',
      'Maintain job files and records',
      'Track equipment and time',
      'Generate professional reports',
    ],
    assessmentMethod: 'Documentation package submission',
    requiredScore: 80,
  },
  customer: {
    title: 'Customer Service Excellence',
    objectives: [
      'Communicate effectively with traumatized customers',
      'Set and manage expectations',
      'Handle complaints professionally',
      'Educate customers on processes',
      'Maintain professional boundaries',
      'Generate positive reviews',
      'Build referral relationships',
    ],
    assessmentMethod: 'Role-play scenarios',
    requiredScore: 85,
  },
  business: {
    title: 'Business Operations',
    objectives: [
      'Price services profitably',
      'Schedule and manage workflow',
      'Maintain equipment and vehicles',
      'Manage inventory and supplies',
      'Ensure regulatory compliance',
      'Implement quality control',
      'Develop growth strategies',
    ],
    assessmentMethod: 'Business plan presentation',
    requiredScore: 75,
  },
};

/**
 * TRAINING DELIVERY METHODS
 * =========================
 */
export const DELIVERY_METHODS = {
  online: {
    format: 'Self-paced online learning',
    features: [
      'HD video content',
      'Interactive exercises',
      'Digital assessments',
      'Progress tracking',
      'Discussion forums',
      'Live Q&A sessions',
    ],
    duration: '22 modules',
    flexibility: 'High',
    support: 'Email and forum',
  },
  hybrid: {
    format: 'Online theory + in-person practical',
    features: [
      'Online modules for theory',
      'Weekend practical sessions',
      'Hands-on equipment training',
      'Live demonstrations',
      'Peer collaboration',
      'Direct instructor feedback',
    ],
    duration: '22 modules over 4 weeks',
    flexibility: 'Medium',
    support: 'Multiple channels',
  },
  intensive: {
    format: '2-week intensive bootcamp',
    features: [
      'Full-time immersive training',
      'Daily practical exercises',
      'Real job site visits',
      'Industry guest speakers',
      'Networking opportunities',
      'Immediate certification',
    ],
    duration: '22-module intensive cohort',
    flexibility: 'Low',
    support: 'In-person throughout',
  },
};

/**
 * ASSESSMENT STRUCTURE
 * ====================
 */
export const ASSESSMENT_FRAMEWORK = {
  daily: {
    type: 'Knowledge checks',
    format: 'Online quiz',
    questions: 10,
    passingScore: 80,
    attempts: 3,
    weight: '20% of final grade',
  },
  practical: {
    type: 'Hands-on demonstration',
    format: 'Video submission or in-person',
    tasks: 5,
    passingScore: 85,
    attempts: 2,
    weight: '40% of final grade',
  },
  project: {
    type: 'Complete job simulation',
    format: 'Documentation package',
    components: [
      'Assessment',
      'Scope of work',
      'Equipment setup',
      'Documentation',
      'Customer communication',
    ],
    passingScore: 80,
    attempts: 2,
    weight: '25% of final grade',
  },
  final: {
    type: 'Comprehensive exam',
    format: 'Proctored online or in-person',
    questions: 100,
    passingScore: 80,
    attempts: 2,
    weight: '15% of final grade',
  },
};

/**
 * POST-CERTIFICATION SUPPORT
 * ==========================
 */
export const ONGOING_SUPPORT = {
  technical: {
    description: '24/7 technical hotline',
    response: 'Within 2 hours for emergencies',
    includes: [
      'Equipment troubleshooting',
      'Restoration advice',
      'Safety guidance',
      'Second opinions',
    ],
  },
  business: {
    description: 'Business development support',
    frequency: 'Monthly check-ins',
    includes: [
      'Marketing assistance',
      'Pricing guidance',
      'Growth strategies',
      'Financial planning',
    ],
  },
  training: {
    description: 'Continuing education',
    requirement: '40 hours annually',
    includes: [
      'New technique workshops',
      'Equipment updates',
      'Regulation changes',
      'Skill advancement',
    ],
  },
  networking: {
    description: 'Contractor community',
    platforms: [
      'Private Facebook group',
      'Monthly Zoom meetups',
      'Annual conference',
      'Regional meetings',
    ],
  },
};

/**
 * SUCCESS METRICS
 * ===============
 */
export const SUCCESS_INDICATORS = {
  immediate: {
    timeframe: '0-30 days',
    metrics: [
      'Certification achieved',
      'First job completed',
      'Insurance approved',
      'Equipment operational',
      'Systems integrated',
    ],
  },
  shortTerm: {
    timeframe: '1-3 months',
    metrics: [
      '20+ jobs completed',
      '4.5+ star rating',
      'Break-even achieved',
      'Referral generated',
      'Process refined',
    ],
  },
  mediumTerm: {
    timeframe: '3-6 months',
    metrics: [
      '50+ jobs completed',
      'Profitable operation',
      'Team member hired',
      'Equipment upgraded',
      'Market position established',
    ],
  },
  longTerm: {
    timeframe: '6-12 months',
    metrics: [
      '100+ jobs completed',
      'Multi-crew operation',
      '$500K+ revenue',
      'Market leader status',
      'Expansion ready',
    ],
  },
};

/**
 * RESOURCE LIBRARY
 * ================
 */
export const TRAINING_RESOURCES = {
  standards: [
    'IICRC S500:2025 - Water Damage Restoration',
    'IICRC S520:2025 - Mould Remediation',
    'IICRC S540 - Trauma and Crime Scene',
    'IICRC S700:2025 - Fire and Smoke Restoration',
    'IICRC S800 - Carpet Cleaning',
    'AS/NZS 4360 - Risk Management',
    'AS/NZS 4801 - OH&S Management',
  ],
  templates: [
    'Scope of work template',
    'Invoice template',
    'Service agreement',
    'Change order form',
    'Safety checklist',
    'Equipment log',
    'Customer satisfaction survey',
  ],
  guides: [
    'RestoreAssist.app user guide',
    'Insurance claim process',
    'Customer communication scripts',
    'Marketing toolkit',
    'Social media templates',
    'Review generation system',
    'Referral program setup',
  ],
  videos: [
    'Equipment operation tutorials',
    'Safety procedure demonstrations',
    'Customer service scenarios',
    'Business setup walkthrough',
    'Marketing implementation',
    'Technology platform training',
    'Success story case studies',
  ],
};

/**
 * QUALITY ASSURANCE
 * =================
 */
export const QUALITY_STANDARDS = {
  training: {
    reviewCycle: 'Quarterly',
    updateFrequency: 'As needed',
    feedbackIntegration: 'Monthly',
    industryAlignment: 'Annual review',
    accreditation: 'IICRC approved',
  },
  assessment: {
    validation: 'Statistical analysis',
    reliability: '0.85 coefficient',
    fairness: 'Bias reviewed',
    security: 'Proctored options',
    integrity: 'Plagiarism checked',
  },
  certification: {
    validity: '2 years',
    renewal: 'CE + assessment',
    verification: 'Online registry',
    portability: 'National recognition',
    value: 'Insurance accepted',
  },
};

// Export utility functions
export function getDayOverview(day: number) {
  return MASTER_CURRICULUM[day] || null;
}

export function getTotalTrainingHours(): number {
  return Object.values(MASTER_CURRICULUM).reduce((total, day) => {
    const hours = parseInt(day.duration.split(' ')[0]);
    return total + hours;
  }, 0);
}

export function getCompetencyRequirements(competency: keyof typeof COMPETENCY_FRAMEWORK) {
  return COMPETENCY_FRAMEWORK[competency];
}

export function getDeliveryMethod(method: keyof typeof DELIVERY_METHODS) {
  return DELIVERY_METHODS[method];
}

export function calculateProgress(completedDays: number[]): {
  percentage: number;
  hoursCompleted: number;
  remainingDays: number[];
  nextMilestone: string;
} {
  const totalDays = ONBOARDING_MODULE_COUNT;
  const percentage = (completedDays.length / totalDays) * 100;

  const hoursCompleted = completedDays.reduce((total, day) => {
    const dayInfo = MASTER_CURRICULUM[day];
    return total + (dayInfo ? parseInt(dayInfo.duration.split(' ')[0]) : 0);
  }, 0);

  const remainingDays = Array.from({ length: totalDays }, (_, i) => i + 1).filter(
    (day) => !completedDays.includes(day),
  );

  const nextMilestone =
    completedDays.length < 7
      ? 'Foundation Completion'
      : completedDays.length < 14
        ? 'Core Competency Assessment'
        : completedDays.length < ONBOARDING_MODULE_COUNT
          ? 'Network Launch Sign-Off'
          : 'Certification Complete';

  return {
    percentage,
    hoursCompleted,
    remainingDays,
    nextMilestone,
  };
}
