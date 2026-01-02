/**
 * Client Onboarding Analytics Service
 *
 * Tracks client onboarding funnel metrics for admin analytics dashboard
 * Similar to onboarding-analytics.service.ts for contractors
 */

import { prisma } from '@/lib/prisma';

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

export interface PhaseMetrics {
  phase: ClientOnboardingPhase;
  totalStarted: number;
  totalCompleted: number;
  dropOffCount: number;
  dropOffRate: number;
  avgTimeToCompleteMinutes: number;
  medianTimeToCompleteMinutes: number;
}

export interface ClientFunnelMetrics {
  totalStarted: number;
  totalCompleted: number;
  overallConversionRate: number;
  avgTimeToCompleteHours: number;
  phases: PhaseMetrics[];
  bottleneck: ClientOnboardingPhase | null;

  // Tier distribution
  tierDistribution: Record<string, number>;

  // Flow variant performance
  flowVariantPerformance: {
    standard: { started: number; completed: number; conversionRate: number };
    fast_track: { started: number; completed: number; conversionRate: number };
    vip: { started: number; completed: number; conversionRate: number };
  };
}

// ============================================================================
// ANALYTICS FUNCTIONS
// ============================================================================

/**
 * Get client onboarding funnel metrics
 */
export async function getClientOnboardingFunnelMetrics(): Promise<ClientFunnelMetrics> {
  // Get all onboardings
  const allOnboardings = await prisma.clientOnboarding.findMany({
    select: {
      id: true,
      clientId: true,
      startDate: true,
      actualCompletionDate: true,
      completedPhases: true,
      flowVariant: true,
      status: true,
      createdAt: true,
    },
    include: {
      clientProfile: {
        select: {
          tier: true,
        },
      },
    },
  });

  const totalStarted = allOnboardings.length;
  const completed = allOnboardings.filter((o) => o.status === 'COMPLETED');
  const totalCompleted = completed.length;

  // Calculate overall conversion rate
  const overallConversionRate = totalStarted > 0 ? (totalCompleted / totalStarted) * 100 : 0;

  // Calculate average completion time
  const completionTimes = completed
    .filter((o) => o.startDate && o.actualCompletionDate)
    .map((o) => {
      const start = o.startDate!;
      const end = o.actualCompletionDate!;
      return (end.getTime() - start.getTime()) / (1000 * 60 * 60); // hours
    });

  const avgTimeToCompleteHours =
    completionTimes.length > 0
      ? completionTimes.reduce((sum, time) => sum + time, 0) / completionTimes.length
      : 0;

  // Calculate phase-by-phase metrics
  const phases: ClientOnboardingPhase[] = [
    'profile',
    'services',
    'property',
    'insurance',
    'payment',
    'communication',
    'education',
  ];

  const phaseMetrics: PhaseMetrics[] = [];

  for (let i = 0; i < phases.length; i++) {
    const phase = phases[i];
    const prevPhase = i > 0 ? phases[i - 1] : null;

    // Total started this phase = completed previous phase (or all started for first phase)
    const totalStarted = prevPhase
      ? allOnboardings.filter((o) => o.completedPhases.includes(prevPhase)).length
      : totalStarted;

    // Total completed this phase
    const totalCompleted = allOnboardings.filter((o) => o.completedPhases.includes(phase)).length;

    const dropOffCount = totalStarted - totalCompleted;
    const dropOffRate = totalStarted > 0 ? (dropOffCount / totalStarted) * 100 : 0;

    phaseMetrics.push({
      phase,
      totalStarted,
      totalCompleted,
      dropOffCount,
      dropOffRate,
      avgTimeToCompleteMinutes: getEstimatedTimeForPhase(phase),
      medianTimeToCompleteMinutes: getEstimatedTimeForPhase(phase),
    });
  }

  // Find bottleneck (highest drop-off rate)
  const bottleneck = phaseMetrics.reduce(
    (max, metric) => (metric.dropOffRate > (max?.dropOffRate || 0) ? metric : max),
    phaseMetrics[0]
  );

  // Calculate tier distribution
  const tierDistribution: Record<string, number> = {};
  allOnboardings.forEach((o) => {
    const tier = o.clientProfile?.tier || 'standard';
    tierDistribution[tier] = (tierDistribution[tier] || 0) + 1;
  });

  // Calculate flow variant performance
  const standard = allOnboardings.filter((o) => o.flowVariant === 'standard');
  const fastTrack = allOnboardings.filter((o) => o.flowVariant === 'fast_track');
  const vip = allOnboardings.filter((o) => o.flowVariant === 'vip');

  const flowVariantPerformance = {
    standard: {
      started: standard.length,
      completed: standard.filter((o) => o.status === 'COMPLETED').length,
      conversionRate:
        standard.length > 0
          ? (standard.filter((o) => o.status === 'COMPLETED').length / standard.length) * 100
          : 0,
    },
    fast_track: {
      started: fastTrack.length,
      completed: fastTrack.filter((o) => o.status === 'COMPLETED').length,
      conversionRate:
        fastTrack.length > 0
          ? (fastTrack.filter((o) => o.status === 'COMPLETED').length / fastTrack.length) * 100
          : 0,
    },
    vip: {
      started: vip.length,
      completed: vip.filter((o) => o.status === 'COMPLETED').length,
      conversionRate:
        vip.length > 0
          ? (vip.filter((o) => o.status === 'COMPLETED').length / vip.length) * 100
          : 0,
    },
  };

  return {
    totalStarted,
    totalCompleted,
    overallConversionRate,
    avgTimeToCompleteHours,
    phases: phaseMetrics,
    bottleneck: bottleneck?.phase || null,
    tierDistribution,
    flowVariantPerformance,
  };
}

/**
 * Get drop-off analysis for a specific phase
 */
export async function getPhaseDropOffAnalysis(phase: ClientOnboardingPhase): Promise<{
  totalAtPhase: number;
  completed: number;
  abandoned: number;
  inProgress: number;
  avgTimeSpent: number;
  commonAbandonmentReasons: string[];
}> {
  const onboardings = await prisma.clientOnboarding.findMany({
    where: {
      OR: [
        { completedPhases: { has: phase } },
        { currentPhase: phase },
        { abandonedPhase: phase },
      ],
    },
  });

  const totalAtPhase = onboardings.length;
  const completed = onboardings.filter((o) => o.completedPhases.includes(phase)).length;
  const abandoned = onboardings.filter((o) => o.abandonedPhase === phase).length;
  const inProgress = onboardings.filter(
    (o) => o.currentPhase === phase && o.status === 'IN_PROGRESS'
  ).length;

  return {
    totalAtPhase,
    completed,
    abandoned,
    inProgress,
    avgTimeSpent: getEstimatedTimeForPhase(phase),
    commonAbandonmentReasons: [], // Would need survey data
  };
}

/**
 * Track onboarding event (for ML training and analytics)
 */
export async function trackOnboardingEvent(
  userId: string,
  phase: ClientOnboardingPhase,
  event: 'started' | 'completed' | 'abandoned',
  metadata?: Record<string, any>
): Promise<void> {
  console.log('Client Onboarding Analytics Event:', {
    userId,
    phase,
    event,
    timestamp: new Date().toISOString(),
    metadata,
  });

  // In production, send to analytics service:
  // - Google Analytics
  // - Mixpanel
  // - Segment
  // - Custom analytics database

  // Example with Google Analytics:
  // gtag('event', 'onboarding_' + event, {
  //   event_category: 'client_onboarding',
  //   event_label: phase,
  //   value: metadata?.completionPercentage || 0
  // });

  // For now, just log
}

/**
 * Get completion time distribution (for benchmarking)
 */
export async function getCompletionTimeDistribution(): Promise<{
  under30min: number;
  '30-60min': number;
  '1-2hours': number;
  '2-6hours': number;
  '6-24hours': number;
  'over24hours': number;
}> {
  const completed = await prisma.clientOnboarding.findMany({
    where: {
      status: 'COMPLETED',
      startDate: { not: null },
      actualCompletionDate: { not: null },
    },
    select: {
      startDate: true,
      actualCompletionDate: true,
    },
  });

  const distribution = {
    under30min: 0,
    '30-60min': 0,
    '1-2hours': 0,
    '2-6hours': 0,
    '6-24hours': 0,
    'over24hours': 0,
  };

  completed.forEach((o) => {
    const hours = (o.actualCompletionDate!.getTime() - o.startDate!.getTime()) / (1000 * 60 * 60);

    if (hours < 0.5) distribution.under30min++;
    else if (hours < 1) distribution['30-60min']++;
    else if (hours < 2) distribution['1-2hours']++;
    else if (hours < 6) distribution['2-6hours']++;
    else if (hours < 24) distribution['6-24hours']++;
    else distribution.over24hours++;
  });

  return distribution;
}

/**
 * Get service type popularity (from Phase 2)
 */
export async function getServiceTypePopularity(): Promise<Record<string, number>> {
  const preferences = await prisma.userPreferences.findMany({
    where: {
      primaryServiceTypes: { isEmpty: false },
    },
    select: {
      primaryServiceTypes: true,
    },
  });

  const popularity: Record<string, number> = {};

  preferences.forEach((pref) => {
    const services = pref.primaryServiceTypes as string[];
    services.forEach((service) => {
      popularity[service] = (popularity[service] || 0) + 1;
    });
  });

  return popularity;
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Get estimated time for a phase (in minutes)
 */
function getEstimatedTimeForPhase(phase: ClientOnboardingPhase): number {
  const estimates: Record<ClientOnboardingPhase, number> = {
    profile: 2,
    services: 3,
    property: 5,
    insurance: 3,
    payment: 4,
    communication: 2,
    education: 35,
  };

  return estimates[phase] || 5;
}
