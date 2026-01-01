/**
 * Onboarding Analytics Service
 *
 * Tracks contractor onboarding funnel metrics:
 * - Drop-off points per step
 * - Time-to-complete per step
 * - Overall conversion rates
 * - Bottleneck identification
 */

import { prisma } from '@/lib/prisma';

// ============================================================================
// TYPES
// ============================================================================

export type OnboardingStep =
  | 'preferences'
  | 'profile'
  | 'nrpg_registration'
  | 'training'
  | 'payouts'
  | 'complete';

export interface StepMetrics {
  step: OnboardingStep;
  totalStarted: number;
  totalCompleted: number;
  dropOffCount: number;
  dropOffRate: number;
  avgTimeToCompleteHours: number;
  medianTimeToCompleteHours: number;
}

export interface FunnelMetrics {
  totalStarted: number;
  totalCompleted: number;
  overallConversionRate: number;
  avgTimeToCompleteOnboardingHours: number;
  steps: StepMetrics[];
  bottleneck: OnboardingStep | null;
}

// ============================================================================
// ANALYTICS FUNCTIONS
// ============================================================================

/**
 * Track onboarding step event
 */
export async function trackOnboardingStep(
  userId: string,
  step: OnboardingStep,
  event: 'started' | 'completed' | 'abandoned',
  metadata?: Record<string, any>
): Promise<void> {
  try {
    // In a real implementation, this would write to an analytics database or service
    // For now, we'll just log and prepare the structure

    console.log('Onboarding Analytics Event:', {
      userId,
      step,
      event,
      timestamp: new Date().toISOString(),
      metadata,
    });

    // TODO: Send to analytics service (Google Analytics, Mixpanel, Segment, etc.)
    // Example with Segment:
    // analytics.track({
    //   userId,
    //   event: `Onboarding ${step} ${event}`,
    //   properties: metadata,
    //   timestamp: new Date(),
    // });
  } catch (error) {
    console.error('Failed to track onboarding event:', error);
    // Don't throw - analytics failures shouldn't break the app
  }
}

/**
 * Get funnel metrics for contractor onboarding
 */
export async function getOnboardingFunnelMetrics(): Promise<FunnelMetrics> {
  // Get all contractors who started onboarding
  const allOnboardings = await prisma.contractorOnboarding.findMany({
    select: {
      contractorId: true,
      startDate: true,
      actualCompletionDate: true,
      createdAt: true,
    },
  });

  const totalStarted = allOnboardings.length;

  // Step 1: Preferences
  const preferencesCompleted = await prisma.contractorPreferences.count({
    where: { isOnboardingComplete: true },
  });

  // Step 2: Profile
  const profilesCompleted = await prisma.contractorProfile.count({
    where: {
      AND: [
        { businessName: { not: null } },
        { phone: { not: null } },
      ],
    },
  });

  // Step 3: NRPG Registration
  const nrpgSubmitted = await prisma.contractor.count({
    where: { nrpgMemberId: { not: null } },
  });

  // Step 4: Training Complete
  const trainingCompleted = await prisma.contractorOnboarding.count({
    where: { actualCompletionDate: { not: null } },
  });

  // Step 5: Payouts
  const payoutsConfigured = await prisma.contractorProfile.count({
    where: { stripeConnectAccountId: { not: null } },
  });

  // Step 6: Fully Complete (all requirements met)
  const fullyComplete = await prisma.contractor.count({
    where: {
      AND: [
        { nrpgVerificationLevel: 'VERIFIED' },
        { isVerified: true },
      ],
    },
  });

  // Calculate time-to-complete (for those who completed)
  const completedOnboardings = allOnboardings.filter(o => o.actualCompletionDate);
  const completionTimes = completedOnboardings.map(o => {
    const start = o.startDate || o.createdAt;
    const end = o.actualCompletionDate!;
    return (end.getTime() - start.getTime()) / (1000 * 60 * 60); // hours
  });

  const avgTimeToComplete = completionTimes.length > 0
    ? completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length
    : 0;

  // Build step metrics
  const steps: StepMetrics[] = [
    {
      step: 'preferences',
      totalStarted,
      totalCompleted: preferencesCompleted,
      dropOffCount: totalStarted - preferencesCompleted,
      dropOffRate: totalStarted > 0 ? ((totalStarted - preferencesCompleted) / totalStarted) * 100 : 0,
      avgTimeToCompleteHours: 0.5, // Estimate - would need event tracking
      medianTimeToCompleteHours: 0.5,
    },
    {
      step: 'profile',
      totalStarted: preferencesCompleted,
      totalCompleted: profilesCompleted,
      dropOffCount: preferencesCompleted - profilesCompleted,
      dropOffRate: preferencesCompleted > 0 ? ((preferencesCompleted - profilesCompleted) / preferencesCompleted) * 100 : 0,
      avgTimeToCompleteHours: 1, // Estimate
      medianTimeToCompleteHours: 1,
    },
    {
      step: 'nrpg_registration',
      totalStarted: profilesCompleted,
      totalCompleted: nrpgSubmitted,
      dropOffCount: profilesCompleted - nrpgSubmitted,
      dropOffRate: profilesCompleted > 0 ? ((profilesCompleted - nrpgSubmitted) / profilesCompleted) * 100 : 0,
      avgTimeToCompleteHours: 2, // Estimate
      medianTimeToCompleteHours: 2,
    },
    {
      step: 'training',
      totalStarted: nrpgSubmitted,
      totalCompleted: trainingCompleted,
      dropOffCount: nrpgSubmitted - trainingCompleted,
      dropOffRate: nrpgSubmitted > 0 ? ((nrpgSubmitted - trainingCompleted) / nrpgSubmitted) * 100 : 0,
      avgTimeToCompleteHours: 8, // Estimate
      medianTimeToCompleteHours: 6,
    },
    {
      step: 'payouts',
      totalStarted: trainingCompleted,
      totalCompleted: payoutsConfigured,
      dropOffCount: trainingCompleted - payoutsConfigured,
      dropOffRate: trainingCompleted > 0 ? ((trainingCompleted - payoutsConfigured) / trainingCompleted) * 100 : 0,
      avgTimeToCompleteHours: 0.25, // Estimate
      medianTimeToCompleteHours: 0.25,
    },
    {
      step: 'complete',
      totalStarted: payoutsConfigured,
      totalCompleted: fullyComplete,
      dropOffCount: payoutsConfigured - fullyComplete,
      dropOffRate: payoutsConfigured > 0 ? ((payoutsConfigured - fullyComplete) / payoutsConfigured) * 100 : 0,
      avgTimeToCompleteHours: 24, // Waiting for admin verification
      medianTimeToCompleteHours: 18,
    },
  ];

  // Find bottleneck (highest drop-off rate)
  const bottleneck = steps.reduce((max, step) =>
    step.dropOffRate > (max?.dropOffRate || 0) ? step : max
  , steps[0] as StepMetrics | null);

  return {
    totalStarted,
    totalCompleted: fullyComplete,
    overallConversionRate: totalStarted > 0 ? (fullyComplete / totalStarted) * 100 : 0,
    avgTimeToCompleteOnboardingHours: avgTimeToComplete,
    steps,
    bottleneck: bottleneck?.step || null,
  };
}

/**
 * Get time-to-complete for a specific contractor
 */
export async function getContractorOnboardingDuration(contractorId: string): Promise<number | null> {
  const onboarding = await prisma.contractorOnboarding.findUnique({
    where: { contractorId },
    select: {
      startDate: true,
      actualCompletionDate: true,
      createdAt: true,
    },
  });

  if (!onboarding || !onboarding.actualCompletionDate) {
    return null;
  }

  const start = onboarding.startDate || onboarding.createdAt;
  const end = onboarding.actualCompletionDate;
  const durationHours = (end.getTime() - start.getTime()) / (1000 * 60 * 60);

  return durationHours;
}

/**
 * Get drop-off analysis for a specific step
 */
export async function getStepDropOffAnalysis(step: OnboardingStep): Promise<{
  totalAtStep: number;
  completed: number;
  abandoned: number;
  inProgress: number;
  avgTimeSpent: number;
}> {
  // This would require detailed event tracking
  // For now, return placeholder structure

  return {
    totalAtStep: 0,
    completed: 0,
    abandoned: 0,
    inProgress: 0,
    avgTimeSpent: 0,
  };
}
