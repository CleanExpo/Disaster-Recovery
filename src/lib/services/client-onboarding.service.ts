/**
 * Client Onboarding Service
 *
 * Core business logic for client onboarding system
 * Handles initialization, progress tracking, phase completion, and flow variants
 */

import { prisma } from '@/lib/prisma';
import { OnboardingStatus, ModuleStatus, AustralianState } from '@prisma/client';

// ============================================================================
// TYPES
// ============================================================================

export type ClientOnboardingPhase =
  | 'profile'
  | 'services'
  | 'property'
  | 'insurance'
  | 'payment'
  | 'communication'
  | 'education';

export type ClientFlowVariant = 'standard' | 'fast_track' | 'vip';

export interface OnboardingProgress {
  clientId: string;
  status: OnboardingStatus;
  currentPhase: ClientOnboardingPhase | null;
  completedPhases: string[];
  completionPercentage: number;
  nextPhase: ClientOnboardingPhase | null;
  resumeUrl: string;
  estimatedMinutesRemaining: number;
  tier: string;
  flowVariant: ClientFlowVariant;
}

export interface PhaseCompletionResult {
  success: boolean;
  nextPhase: ClientOnboardingPhase | null;
  completionPercentage: number;
  message: string;
}

// ============================================================================
// PHASE DEFINITIONS
// ============================================================================

const STANDARD_PHASES: ClientOnboardingPhase[] = [
  'profile',
  'services',
  'property',
  'insurance',
  'payment',
  'communication',
  'education',
];

const FAST_TRACK_PHASES: ClientOnboardingPhase[] = [
  'profile',
  'services',
  'property',
];

const CORE_PHASES: ClientOnboardingPhase[] = [
  'profile',
  'services',
  'property',
];

const PROGRESSIVE_PHASES: ClientOnboardingPhase[] = [
  'insurance',
  'payment',
  'communication',
  'education',
];

const PHASE_METADATA: Record<ClientOnboardingPhase, {
  name: string;
  description: string;
  estimatedMinutes: number;
  required: boolean;
}> = {
  profile: {
    name: 'Profile Setup',
    description: 'Basic contact information and preferences',
    estimatedMinutes: 2,
    required: true,
  },
  services: {
    name: 'Service Preferences',
    description: 'Service types, urgency, and budget preferences',
    estimatedMinutes: 3,
    required: true,
  },
  property: {
    name: 'Property Details',
    description: 'Address, property type, and access information',
    estimatedMinutes: 5,
    required: true,
  },
  insurance: {
    name: 'Insurance & Documentation',
    description: 'Insurance policy details and document upload',
    estimatedMinutes: 3,
    required: false,
  },
  payment: {
    name: 'Payment Setup',
    description: 'Payment method and billing information',
    estimatedMinutes: 4,
    required: false,
  },
  communication: {
    name: 'Communication Preferences',
    description: 'Notification settings and contact preferences',
    estimatedMinutes: 2,
    required: false,
  },
  education: {
    name: 'Education & Completion',
    description: 'Learn about disaster recovery (7 modules)',
    estimatedMinutes: 35,
    required: false,
  },
};

// ============================================================================
// ONBOARDING INITIALIZATION
// ============================================================================

/**
 * Initialize client onboarding
 */
export async function initializeOnboarding(
  userId: string,
  flowType: ClientFlowVariant = 'standard'
): Promise<{
  success: boolean;
  onboardingId: string;
  currentPhase: ClientOnboardingPhase;
  resumeUrl: string;
  estimatedMinutes: number;
}> {
  // Check if onboarding already exists
  const existing = await prisma.clientOnboarding.findUnique({
    where: { clientId: userId },
  });

  if (existing && existing.status === 'COMPLETED') {
    throw new Error('Onboarding already completed');
  }

  // Detect client tier from profile
  const profile = await prisma.clientProfile.findUnique({
    where: { userId },
  });

  const tier = profile?.tier || 'standard';

  // Determine flow variant
  let variant: ClientFlowVariant = flowType;
  if (tier === 'property_manager' || tier === 'high_value') {
    variant = 'vip';
  }

  // Get phases for this flow
  const phases = variant === 'fast_track' ? FAST_TRACK_PHASES : STANDARD_PHASES;
  const estimatedMinutes = phases.reduce(
    (sum, phase) => sum + PHASE_METADATA[phase].estimatedMinutes,
    0
  );

  // Create or update onboarding record
  const onboarding = await prisma.clientOnboarding.upsert({
    where: { clientId: userId },
    update: {
      status: 'IN_PROGRESS',
      startDate: existing?.startDate || new Date(),
      targetCompletionDate: existing?.targetCompletionDate ||
        new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
      currentPhase: 'profile',
      flowVariant: variant,
      lastActivityAt: new Date(),
    },
    create: {
      clientId: userId,
      status: 'IN_PROGRESS',
      startDate: new Date(),
      targetCompletionDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
      currentPhase: 'profile',
      flowVariant: variant,
      completedPhases: [],
      lastActivityAt: new Date(),
    },
  });

  // Create education modules if standard/vip flow
  if (variant !== 'fast_track') {
    const modules = [
      { id: 'MODULE-001', name: 'What to Do After Water Damage' },
      { id: 'MODULE-002', name: 'Understanding Your Insurance Claim' },
      { id: 'MODULE-003', name: 'Choosing the Right Contractor' },
      { id: 'MODULE-004', name: 'Fire Damage Recovery Process' },
      { id: 'MODULE-005', name: 'Mold Remediation Explained' },
      { id: 'MODULE-006', name: 'Your Rights as a Property Owner' },
      { id: 'MODULE-007', name: 'Emergency Preparedness & Prevention' },
    ];

    for (const module of modules) {
      await prisma.clientModuleProgress.upsert({
        where: {
          onboardingId_moduleId: {
            onboardingId: onboarding.id,
            moduleId: module.id,
          },
        },
        update: {},
        create: {
          onboardingId: onboarding.id,
          moduleId: module.id,
          moduleName: module.name,
          status: 'NOT_STARTED',
          progress: 0,
        },
      });
    }
  }

  return {
    success: true,
    onboardingId: onboarding.id,
    currentPhase: 'profile' as ClientOnboardingPhase,
    resumeUrl: '/dashboard/client/onboarding/profile',
    estimatedMinutes,
  };
}

// ============================================================================
// PROGRESS TRACKING
// ============================================================================

/**
 * Get client onboarding progress
 */
export async function getOnboardingProgress(userId: string): Promise<OnboardingProgress> {
  const onboarding = await prisma.clientOnboarding.findUnique({
    where: { clientId: userId },
    include: {
      clientProfile: true,
      moduleProgress: true,
    },
  });

  if (!onboarding) {
    // No onboarding started yet
    return {
      clientId: userId,
      status: 'PENDING_START' as OnboardingStatus,
      currentPhase: null,
      completedPhases: [],
      completionPercentage: 0,
      nextPhase: 'profile',
      resumeUrl: '/dashboard/client/onboarding',
      estimatedMinutesRemaining: 15,
      tier: 'standard',
      flowVariant: 'standard',
    };
  }

  const variant = (onboarding.flowVariant || 'standard') as ClientFlowVariant;
  const phases = variant === 'fast_track' ? FAST_TRACK_PHASES : STANDARD_PHASES;
  const completedCount = onboarding.completedPhases.length;
  const totalPhases = phases.length;
  const completionPercentage = (completedCount / totalPhases) * 100;

  // Calculate next phase
  let nextPhase: ClientOnboardingPhase | null = null;
  for (const phase of phases) {
    if (!onboarding.completedPhases.includes(phase)) {
      nextPhase = phase;
      break;
    }
  }

  // Calculate estimated time remaining
  const remainingPhases = phases.filter(
    (p) => !onboarding.completedPhases.includes(p)
  );
  const estimatedMinutesRemaining = remainingPhases.reduce(
    (sum, phase) => sum + PHASE_METADATA[phase].estimatedMinutes,
    0
  );

  // Generate resume URL
  const currentPhase = onboarding.currentPhase as ClientOnboardingPhase | null;
  const resumePhase = currentPhase || nextPhase || 'profile';
  const resumeUrl = `/dashboard/client/onboarding/${resumePhase}`;

  return {
    clientId: userId,
    status: onboarding.status,
    currentPhase,
    completedPhases: onboarding.completedPhases,
    completionPercentage,
    nextPhase,
    resumeUrl,
    estimatedMinutesRemaining,
    tier: onboarding.clientProfile?.tier || 'standard',
    flowVariant: variant,
  };
}

// ============================================================================
// PHASE COMPLETION
// ============================================================================

/**
 * Mark a phase as completed and advance to next
 */
export async function completePhase(
  userId: string,
  phase: ClientOnboardingPhase
): Promise<PhaseCompletionResult> {
  const onboarding = await prisma.clientOnboarding.findUnique({
    where: { clientId: userId },
  });

  if (!onboarding) {
    throw new Error('Onboarding not initialized');
  }

  // Add phase to completed list if not already there
  const completedPhases = [...new Set([...onboarding.completedPhases, phase])];

  // Determine next phase based on flow variant
  const variant = (onboarding.flowVariant || 'standard') as ClientFlowVariant;
  const phases = variant === 'fast_track' ? FAST_TRACK_PHASES : STANDARD_PHASES;

  const currentIndex = phases.indexOf(phase);
  const nextPhase = currentIndex < phases.length - 1 ? phases[currentIndex + 1] : null;

  // Calculate completion
  const completionPercentage = (completedPhases.length / phases.length) * 100;
  const isComplete = completionPercentage >= 100;

  // Update onboarding record
  await prisma.clientOnboarding.update({
    where: { clientId: userId },
    data: {
      completedPhases,
      currentPhase: nextPhase,
      status: isComplete ? 'COMPLETED' : 'IN_PROGRESS',
      actualCompletionDate: isComplete ? new Date() : undefined,
      lastActivityAt: new Date(),
    },
  });

  return {
    success: true,
    nextPhase,
    completionPercentage,
    message: isComplete
      ? 'Onboarding completed!'
      : `Phase ${phase} completed. Next: ${nextPhase}`,
  };
}

// ============================================================================
// HIGH-VALUE TIER DETECTION
// ============================================================================

/**
 * Detect and assign high-value tier based on client data
 */
export async function detectAndAssignTier(userId: string): Promise<string> {
  const profile = await prisma.clientProfile.findUnique({
    where: { userId },
    include: {
      properties: true,
      insurance: true,
    },
  });

  if (!profile) {
    return 'standard';
  }

  let tier = 'standard';

  // Property Manager / Strata Manager
  if (
    profile.propertyOwnershipStatus === 'property_manager' ||
    profile.propertyOwnershipStatus === 'strata_manager'
  ) {
    tier = 'property_manager';
  }

  // Verified Insurance
  if (profile.insurance?.policyVerified) {
    tier = 'verified_insurance';
  }

  // High-value claim detection happens at service request creation time

  // Update profile with tier
  await prisma.clientProfile.update({
    where: { userId },
    data: { tier },
  });

  return tier;
}

// ============================================================================
// RISK ZONE DETECTION
// ============================================================================

/**
 * Detect risk zones based on property postcode and offer preventive services
 */
export async function detectRiskZones(postcode: string, state: AustralianState): Promise<{
  zones: string[];
  recommendedServices: string[];
}> {
  // Risk zone database (simplified - in production, use comprehensive database)
  const RISK_ZONES: Record<string, { zones: string[]; services: string[] }> = {
    // NSW coastal areas - flood risk
    '2000-2100': { zones: ['flood_zone'], services: ['FLOOD_BARRIER_INSTALL', 'DRAINAGE_IMPROVEMENT'] },
    // QLD tropical areas - cyclone + flood
    '4000-4100': { zones: ['cyclone_zone', 'flood_zone'], services: ['ROOF_STRENGTHENING', 'STORM_SHUTTER_INSTALL'] },
    // VIC bushfire prone
    '3000-3100': { zones: ['bushfire_zone'], services: ['FIRE_RESISTANT_LANDSCAPING', 'EMBER_PROTECTION'] },
  };

  // Find matching range
  const code = parseInt(postcode, 10);
  let zones: string[] = [];
  let services: string[] = [];

  for (const [range, data] of Object.entries(RISK_ZONES)) {
    const [min, max] = range.split('-').map(Number);
    if (code >= min && code <= max) {
      zones = data.zones;
      services = data.services;
      break;
    }
  }

  return { zones, recommendedServices: services };
}

// ============================================================================
// EDUCATION MODULES
// ============================================================================

/**
 * Get all client education modules
 */
export async function getEducationModules(): Promise<Array<{
  id: string;
  title: string;
  description: string;
  duration: string;
  required: boolean;
  order: number;
  category: string;
}>> {
  return [
    {
      id: 'MODULE-001',
      title: 'What to Do After Water Damage',
      description: 'Immediate actions to take when water damage occurs',
      duration: '10 minutes',
      required: true,
      order: 1,
      category: 'emergency-response',
    },
    {
      id: 'MODULE-002',
      title: 'Understanding Your Insurance Claim',
      description: 'Navigate the insurance claims process with confidence',
      duration: '12 minutes',
      required: true,
      order: 2,
      category: 'insurance',
    },
    {
      id: 'MODULE-003',
      title: 'Choosing the Right Contractor',
      description: 'How to verify credentials and select qualified professionals',
      duration: '10 minutes',
      required: true,
      order: 3,
      category: 'contractor-selection',
    },
    {
      id: 'MODULE-004',
      title: 'Fire Damage Recovery Process',
      description: 'What to expect during fire and smoke damage restoration',
      duration: '15 minutes',
      required: false,
      order: 4,
      category: 'fire-damage',
    },
    {
      id: 'MODULE-005',
      title: 'Mold Remediation Explained',
      description: 'Health risks, professional assessment, and remediation process',
      duration: '12 minutes',
      required: false,
      order: 5,
      category: 'mold',
    },
    {
      id: 'MODULE-006',
      title: 'Your Rights as a Property Owner',
      description: 'Australian Consumer Law and your protections',
      duration: '10 minutes',
      required: false,
      order: 6,
      category: 'legal',
    },
    {
      id: 'MODULE-007',
      title: 'Emergency Preparedness & Prevention',
      description: 'Protect your property before disaster strikes',
      duration: '15 minutes',
      required: false,
      order: 7,
      category: 'prevention',
    },
  ];
}

/**
 * Start an education module
 */
export async function startModule(
  onboardingId: string,
  moduleId: string
): Promise<boolean> {
  const module = await prisma.clientModuleProgress.findFirst({
    where: { onboardingId, moduleId },
  });

  if (!module) {
    throw new Error('Module not found');
  }

  await prisma.clientModuleProgress.update({
    where: { id: module.id },
    data: {
      status: 'IN_PROGRESS',
      startedAt: new Date(),
      progress: 1,
    },
  });

  return true;
}

/**
 * Complete an education module
 */
export async function completeModule(
  onboardingId: string,
  moduleId: string,
  quizScore?: number,
  timeSpentSeconds?: number
): Promise<boolean> {
  const module = await prisma.clientModuleProgress.findFirst({
    where: { onboardingId, moduleId },
  });

  if (!module) {
    throw new Error('Module not found');
  }

  const quizPassed = quizScore ? quizScore >= 70 : true; // 70% passing score

  await prisma.clientModuleProgress.update({
    where: { id: module.id },
    data: {
      status: 'COMPLETED',
      completed: true,
      completedAt: new Date(),
      progress: 100,
      quizScore,
      quizPassed,
      quizAttempts: module.quizAttempts + 1,
      timeSpentSeconds: timeSpentSeconds || module.timeSpentSeconds,
    },
  });

  return quizPassed;
}

// ============================================================================
// PROGRESSIVE DISCLOSURE
// ============================================================================

/**
 * Check if progressive phases are unlocked
 * Unlocked after: 1) Core phases complete OR 2) 7 days since start OR 3) First request created
 */
export async function areProgressivePhasesUnlocked(userId: string): Promise<boolean> {
  const onboarding = await prisma.clientOnboarding.findUnique({
    where: { clientId: userId },
  });

  if (!onboarding) {
    return false;
  }

  // Check if core phases complete
  const coreComplete = CORE_PHASES.every((phase) =>
    onboarding.completedPhases.includes(phase)
  );

  if (coreComplete) {
    return true;
  }

  // Check if 7 days passed
  if (onboarding.startDate) {
    const daysSinceStart =
      (new Date().getTime() - onboarding.startDate.getTime()) / (1000 * 60 * 60 * 24);
    if (daysSinceStart >= 7) {
      return true;
    }
  }

  // Check if first request created
  if (onboarding.firstRequestCreated) {
    return true;
  }

  return false;
}

// ============================================================================
// COMPLETION ACTIONS
// ============================================================================

/**
 * Complete onboarding with optional actions
 */
export async function completeOnboarding(
  userId: string,
  actions: {
    awardBadge: boolean;
    generateCertificate: boolean;
    sendWelcomeEmail: boolean;
  }
): Promise<{
  success: boolean;
  certificateUrl?: string;
  badgeAwarded: boolean;
}> {
  const onboarding = await prisma.clientOnboarding.update({
    where: { clientId: userId },
    data: {
      status: 'COMPLETED',
      actualCompletionDate: new Date(),
      badgeAwarded: actions.awardBadge,
      certificateIssued: actions.generateCertificate,
    },
  });

  let certificateUrl: string | undefined;

  if (actions.generateCertificate) {
    // Generate certificate (placeholder - full implementation later)
    certificateUrl = `/certificates/client-${userId}-${Date.now()}.pdf`;

    await prisma.clientOnboarding.update({
      where: { clientId: userId },
      data: { certificateUrl },
    });
  }

  return {
    success: true,
    certificateUrl,
    badgeAwarded: actions.awardBadge,
  };
}

// ============================================================================
// ABANDONMENT DETECTION
// ============================================================================

/**
 * Track client activity (called on each phase interaction)
 */
export async function trackActivity(userId: string): Promise<void> {
  await prisma.clientOnboarding.update({
    where: { clientId: userId },
    data: { lastActivityAt: new Date() },
  });
}

/**
 * Find abandoned onboardings (no activity for 48 hours)
 */
export async function findAbandonedOnboardings(): Promise<
  Array<{
    clientId: string;
    email: string;
    currentPhase: string | null;
    completionPercentage: number;
    hoursSinceLastActivity: number;
  }>
> {
  const fortyEightHoursAgo = new Date(Date.now() - 48 * 60 * 60 * 1000);

  const abandoned = await prisma.clientOnboarding.findMany({
    where: {
      status: 'IN_PROGRESS',
      lastActivityAt: { lt: fortyEightHoursAgo },
      OR: [
        { reminderSentAt: null },
        { reminderSentAt: { lt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } }, // Last reminder >7 days ago
      ],
    },
    include: {
      clientProfile: {
        include: {
          user: {
            select: {
              email: true,
            },
          },
        },
      },
    },
  });

  return abandoned.map((o) => {
    const variant = (o.flowVariant || 'standard') as ClientFlowVariant;
    const phases = variant === 'fast_track' ? FAST_TRACK_PHASES : STANDARD_PHASES;
    const completionPercentage = (o.completedPhases.length / phases.length) * 100;
    const hoursSinceLastActivity = o.lastActivityAt
      ? (new Date().getTime() - o.lastActivityAt.getTime()) / (1000 * 60 * 60)
      : 0;

    return {
      clientId: o.clientId,
      email: o.clientProfile?.user.email || '',
      currentPhase: o.currentPhase,
      completionPercentage,
      hoursSinceLastActivity,
    };
  });
}

/**
 * Mark reminder as sent (prevents duplicate emails)
 */
export async function markReminderSent(userId: string): Promise<void> {
  await prisma.clientOnboarding.update({
    where: { clientId: userId },
    data: { reminderSentAt: new Date() },
  });
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get phase metadata
 */
export function getPhaseMetadata(phase: ClientOnboardingPhase) {
  return PHASE_METADATA[phase];
}

/**
 * Get all phases for a flow variant
 */
export function getPhasesForVariant(variant: ClientFlowVariant): ClientOnboardingPhase[] {
  return variant === 'fast_track' ? FAST_TRACK_PHASES : STANDARD_PHASES;
}

/**
 * Check if phase is required
 */
export function isPhaseRequired(phase: ClientOnboardingPhase): boolean {
  return PHASE_METADATA[phase].required;
}

/**
 * Get total estimated time for flow variant
 */
export function getEstimatedTime(variant: ClientFlowVariant): number {
  const phases = getPhasesForVariant(variant);
  return phases.reduce((sum, phase) => sum + PHASE_METADATA[phase].estimatedMinutes, 0);
}
