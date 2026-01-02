/**
 * Client Eligibility Service
 *
 * Determines if client can create service requests based on onboarding completion
 * Similar to contractor-eligibility.service.ts pattern
 */

import { prisma } from '@/lib/prisma';

// ============================================================================
// TYPES
// ============================================================================

export interface EligibilityCheck {
  requirement: string;
  status: 'complete' | 'incomplete' | 'optional';
  label: string;
  description: string;
  actionUrl?: string;
  actionText?: string;
}

export interface ClientEligibilityResult {
  canCreateRequests: boolean;
  isOnboardingComplete: boolean;
  completionPercentage: number;
  checks: EligibilityCheck[];
  incompleteRequirements: string[];
  nextAction?: {
    requirement: string;
    label: string;
    url: string;
    buttonText: string;
  };
  tier: string;
  progressivePhasesUnlocked: boolean;
}

// ============================================================================
// ELIGIBILITY CHECKING
// ============================================================================

/**
 * Check client eligibility for creating service requests
 *
 * Minimum requirements:
 * 1. Profile complete (Phase 1)
 * 2. Service preferences set (Phase 2)
 * 3. Property added (Phase 3)
 *
 * Optional (encouraged but not required):
 * 4. Insurance info
 * 5. Payment method
 * 6. Communication preferences
 * 7. Education modules
 */
export async function checkClientEligibility(userId: string): Promise<ClientEligibilityResult> {
  const checks: EligibilityCheck[] = [];

  // Get client profile
  const profile = await prisma.clientProfile.findUnique({
    where: { userId },
    include: {
      properties: true,
      insurance: true,
      payment: true,
      onboarding: true,
    },
  });

  // Get user preferences for service preferences
  const userPreferences = await prisma.userPreferences.findUnique({
    where: { userId },
  });

  // 1. Check Profile (REQUIRED)
  const profileComplete = Boolean(
    profile &&
    profile.phoneNumber &&
    profile.preferredContactMethod &&
    profile.timezone
  );

  checks.push({
    requirement: 'profile',
    status: profileComplete ? 'complete' : 'incomplete',
    label: 'Profile Setup',
    description: profileComplete
      ? 'Contact information configured'
      : 'Add phone number and contact preferences',
    actionUrl: '/dashboard/client/onboarding/profile',
    actionText: 'Complete profile',
  });

  // 2. Check Service Preferences (REQUIRED)
  const servicesConfigured = Boolean(
    userPreferences?.primaryServiceTypes &&
    (userPreferences.primaryServiceTypes as string[]).length > 0
  );

  checks.push({
    requirement: 'services',
    status: servicesConfigured ? 'complete' : 'incomplete',
    label: 'Service Preferences',
    description: servicesConfigured
      ? 'Service types and urgency configured'
      : 'Select service types you may need',
    actionUrl: '/dashboard/client/onboarding/services',
    actionText: 'Set preferences',
  });

  // 3. Check Property (REQUIRED)
  const hasProperty = Boolean(profile?.properties && profile.properties.length > 0);

  checks.push({
    requirement: 'property',
    status: hasProperty ? 'complete' : 'incomplete',
    label: 'Property Details',
    description: hasProperty
      ? `${profile!.properties.length} property(ies) added`
      : 'Add your property address and details',
    actionUrl: '/dashboard/client/onboarding/property',
    actionText: 'Add property',
  });

  // 4. Check Insurance (OPTIONAL)
  const hasInsurance = Boolean(profile?.insurance?.hasInsurance);
  const insuranceVerified = Boolean(profile?.insurance?.policyVerified);

  checks.push({
    requirement: 'insurance',
    status: hasInsurance ? (insuranceVerified ? 'complete' : 'optional') : 'optional',
    label: 'Insurance Information',
    description: hasInsurance
      ? insuranceVerified
        ? 'Insurance verified ✓'
        : 'Insurance added, pending verification'
      : 'Optional: Add insurance for faster claims',
    actionUrl: '/dashboard/client/onboarding/insurance',
    actionText: hasInsurance ? 'View insurance' : 'Add insurance',
  });

  // 5. Check Payment Method (OPTIONAL)
  const hasPayment = Boolean(profile?.payment?.stripePaymentMethodId);

  checks.push({
    requirement: 'payment',
    status: hasPayment ? 'complete' : 'optional',
    label: 'Payment Method',
    description: hasPayment
      ? `Card ending in ${profile!.payment!.cardLast4}`
      : 'Optional: Add payment method for pre-authorization',
    actionUrl: '/dashboard/client/onboarding/payment',
    actionText: hasPayment ? 'Update payment' : 'Add payment',
  });

  // 6. Check Communication Preferences (OPTIONAL)
  const hasCommunicationPrefs = Boolean(
    userPreferences?.notifications &&
    typeof userPreferences.notifications === 'object'
  );

  checks.push({
    requirement: 'communication',
    status: hasCommunicationPrefs ? 'complete' : 'optional',
    label: 'Communication Preferences',
    description: hasCommunicationPrefs
      ? 'Notification preferences configured'
      : 'Optional: Configure how we contact you',
    actionUrl: '/dashboard/client/onboarding/communication',
    actionText: 'Set preferences',
  });

  // 7. Check Education Modules (OPTIONAL)
  const moduleProgress = await prisma.clientModuleProgress.findMany({
    where: { onboardingId: profile?.onboarding?.id },
  });

  const completedModules = moduleProgress.filter((m) => m.completed).length;
  const totalModules = moduleProgress.length;

  checks.push({
    requirement: 'education',
    status: completedModules > 0 ? (completedModules === totalModules ? 'complete' : 'optional') : 'optional',
    label: 'Education Modules',
    description:
      completedModules > 0
        ? `${completedModules}/${totalModules} modules completed`
        : 'Optional: Learn about disaster recovery (7 modules)',
    actionUrl: '/dashboard/client/onboarding/education',
    actionText: completedModules > 0 ? 'Continue learning' : 'Start education',
  });

  // Calculate eligibility
  const requiredChecks = checks.filter(
    (c) => c.requirement === 'profile' || c.requirement === 'services' || c.requirement === 'property'
  );
  const allRequiredComplete = requiredChecks.every((c) => c.status === 'complete');

  const completeCount = checks.filter((c) => c.status === 'complete').length;
  const completionPercentage = (completeCount / checks.length) * 100;

  // Client can create requests if core 3 phases complete
  const canCreateRequests = allRequiredComplete;

  // Onboarding is "complete" if all phases done (including optional)
  const isOnboardingComplete = checks.every((c) => c.status === 'complete');

  // Find next incomplete required phase
  const nextIncomplete = checks.find(
    (c) => c.status === 'incomplete' || (c.status === 'optional' && !allRequiredComplete)
  );

  const nextAction = nextIncomplete
    ? {
        requirement: nextIncomplete.requirement,
        label: nextIncomplete.label,
        url: nextIncomplete.actionUrl || '/dashboard/client/onboarding',
        buttonText: nextIncomplete.actionText || 'Complete',
      }
    : undefined;

  const incompleteRequirements = checks
    .filter((c) => c.status === 'incomplete')
    .map((c) => c.label);

  // Check if progressive phases are unlocked
  const progressivePhasesUnlocked = await checkProgressivePhasesUnlocked(userId);

  return {
    canCreateRequests,
    isOnboardingComplete,
    completionPercentage,
    checks,
    incompleteRequirements,
    nextAction,
    tier: profile?.tier || 'standard',
    progressivePhasesUnlocked,
  };
}

/**
 * Check if client can create service requests (shorthand)
 */
export async function canClientCreateRequests(userId: string): Promise<boolean> {
  const eligibility = await checkClientEligibility(userId);
  return eligibility.canCreateRequests;
}

/**
 * Get user-friendly eligibility message
 */
export function getEligibilityMessage(result: ClientEligibilityResult): string {
  if (result.isOnboardingComplete) {
    return "You're all set! Create service requests anytime.";
  }

  if (result.canCreateRequests) {
    return 'You can create service requests now. Complete remaining phases for enhanced features.';
  }

  const count = result.incompleteRequirements.length;
  if (count === 1) {
    return `Complete ${result.incompleteRequirements[0]} to create service requests`;
  }

  return `Complete ${count} requirements to create service requests`;
}

/**
 * Check if progressive phases (4-7) are unlocked
 * Unlock conditions: Core phases complete OR 7 days passed OR first request created
 */
async function checkProgressivePhasesUnlocked(userId: string): Promise<boolean> {
  const onboarding = await prisma.clientOnboarding.findUnique({
    where: { clientId: userId },
  });

  if (!onboarding) {
    return false;
  }

  // Check if core phases complete (1-3)
  const corePhases = ['profile', 'services', 'property'];
  const coreComplete = corePhases.every((phase) =>
    onboarding.completedPhases.includes(phase)
  );

  if (coreComplete) {
    return true;
  }

  // Check if 7 days passed since start
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
