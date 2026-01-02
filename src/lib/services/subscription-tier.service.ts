/**
 * Subscription Tier Service
 *
 * Manages contractor subscription tiers, limits, and overage pricing
 * Based on SaaS Architecture Spec strategic decisions:
 * - Upfront monthly billing
 * - Tiered seats (1, 5, unlimited)
 * - Job limits with overage pricing
 * - Smart retry + 3-day grace on payment failure
 */

import { SubscriptionTier } from '@prisma/client';

// ============================================================================
// TIER CONFIGURATION
// ============================================================================

export interface TierConfig {
  tier: SubscriptionTier;
  name: string;
  monthlyPrice: number;         // AUD
  seatLimit: number;            // 1, 5, or 999 (unlimited)
  monthlyJobLimit: number;      // 10, 50, or 999 (unlimited)
  overagePrice: number;         // Per job over limit
  serviceRadiusKm: number;      // Default radius
  features: string[];
}

export const TIER_CONFIGURATIONS: Record<SubscriptionTier, TierConfig> = {
  BASIC: {
    tier: 'BASIC',
    name: 'Basic',
    monthlyPrice: 99,
    seatLimit: 1,
    monthlyJobLimit: 10,
    overagePrice: 15,
    serviceRadiusKm: 25,
    features: [
      'Job rotation access',
      'Basic NRPG CRM included',
      'Regional leaderboard',
      'Email notifications',
      'Mobile app access',
      'Standard training modules',
    ],
  },
  PRO: {
    tier: 'PRO',
    name: 'Pro',
    monthlyPrice: 299,
    seatLimit: 5,
    monthlyJobLimit: 50,
    overagePrice: 10,
    serviceRadiusKm: 50,
    features: [
      'Everything in Basic',
      '5 team seats',
      '50 jobs per month',
      'External CRM integration (ServiceM8, Fergus, Tradify)',
      'National + regional leaderboard',
      'API access',
      'Priority support (24hr response)',
      'Advanced training modules',
    ],
  },
  ENTERPRISE: {
    tier: 'ENTERPRISE',
    name: 'Enterprise',
    monthlyPrice: 799,
    seatLimit: 999, // Unlimited (represented as 999)
    monthlyJobLimit: 999, // Unlimited
    overagePrice: 0, // No overage for unlimited
    serviceRadiusKm: 100,
    features: [
      'Everything in Pro',
      'Unlimited team seats',
      'Unlimited jobs',
      'Multi-region coverage',
      'Dedicated account manager',
      'Custom API integration',
      'White-label reporting',
      'Priority dispatch',
      'Bulk property tools',
      'Advanced analytics',
    ],
  },
};

// ============================================================================
// TIER UTILITIES
// ============================================================================

/**
 * Get tier configuration
 */
export function getTierConfig(tier: SubscriptionTier): TierConfig {
  return TIER_CONFIGURATIONS[tier];
}

/**
 * Check if workspace can accept another job
 */
export function canAcceptJob(
  currentTier: SubscriptionTier,
  currentMonthJobs: number
): { allowed: boolean; requiresOverage: boolean; overagePrice?: number } {
  const config = getTierConfig(currentTier);

  // Unlimited tier (Enterprise)
  if (config.monthlyJobLimit === 999) {
    return { allowed: true, requiresOverage: false };
  }

  // Within limit
  if (currentMonthJobs < config.monthlyJobLimit) {
    return { allowed: true, requiresOverage: false };
  }

  // Over limit - overage pricing applies
  return {
    allowed: true,
    requiresOverage: true,
    overagePrice: config.overagePrice,
  };
}

/**
 * Check if workspace can add another team member
 */
export function canAddTeamMember(
  currentTier: SubscriptionTier,
  currentMemberCount: number
): { allowed: boolean; reason?: string } {
  const config = getTierConfig(currentTier);

  // Unlimited tier (Enterprise)
  if (config.seatLimit === 999) {
    return { allowed: true };
  }

  // Check seat limit
  if (currentMemberCount >= config.seatLimit) {
    return {
      allowed: false,
      reason: `${config.name} tier is limited to ${config.seatLimit} seat${config.seatLimit > 1 ? 's' : ''}. Upgrade to add more team members.`,
    };
  }

  return { allowed: true };
}

/**
 * Calculate proration for tier upgrade/downgrade
 */
export function calculateProration(
  currentTier: SubscriptionTier,
  newTier: SubscriptionTier,
  daysRemainingInPeriod: number
): number {
  const currentConfig = getTierConfig(currentTier);
  const newConfig = getTierConfig(newTier);

  const dailyCurrentRate = currentConfig.monthlyPrice / 30;
  const dailyNewRate = newConfig.monthlyPrice / 30;

  const currentPeriodValue = dailyCurrentRate * daysRemainingInPeriod;
  const newPeriodValue = dailyNewRate * daysRemainingInPeriod;

  // Upgrade: Charge difference
  // Downgrade: Credit difference (applied to next invoice)
  return newPeriodValue - currentPeriodValue;
}

/**
 * Get tier comparison (for upgrade prompts)
 */
export function compareTiers(
  currentTier: SubscriptionTier,
  targetTier: SubscriptionTier
): {
  isUpgrade: boolean;
  priceDifference: number;
  additionalSeats: number;
  additionalJobs: number;
  newFeatures: string[];
} {
  const tierOrder = { BASIC: 1, PRO: 2, ENTERPRISE: 3 };
  const current = getTierConfig(currentTier);
  const target = getTierConfig(targetTier);

  const isUpgrade = tierOrder[targetTier] > tierOrder[currentTier];

  return {
    isUpgrade,
    priceDifference: target.monthlyPrice - current.monthlyPrice,
    additionalSeats: target.seatLimit - current.seatLimit,
    additionalJobs: target.monthlyJobLimit - current.monthlyJobLimit,
    newFeatures: target.features.filter((f) => !current.features.includes(f)),
  };
}

/**
 * Get recommended tier based on usage
 */
export function getRecommendedTier(
  currentMonthJobs: number,
  teamMemberCount: number
): { recommendedTier: SubscriptionTier; reason: string } | null {
  // Exceeding job limit frequently
  if (currentMonthJobs > 40) {
    return {
      recommendedTier: 'PRO',
      reason: `You've accepted ${currentMonthJobs} jobs this month. Pro tier (50 jobs) would save on overage fees.`,
    };
  }

  // Team is growing
  if (teamMemberCount >= 3) {
    return {
      recommendedTier: 'PRO',
      reason: `You have ${teamMemberCount} team members. Pro tier supports up to 5 seats.`,
    };
  }

  // Heavy usage
  if (currentMonthJobs > 45 && teamMemberCount >= 4) {
    return {
      recommendedTier: 'ENTERPRISE',
      reason: 'Unlimited jobs and seats would better suit your growing business.',
    };
  }

  return null;
}

/**
 * Validate tier downgrade (prevent if would violate limits)
 */
export function canDowngrade(
  targetTier: SubscriptionTier,
  currentMemberCount: number,
  currentMonthJobs: number
): { allowed: boolean; reason?: string } {
  const config = getTierConfig(targetTier);

  // Check seat limit
  if (currentMemberCount > config.seatLimit && config.seatLimit !== 999) {
    return {
      allowed: false,
      reason: `Cannot downgrade to ${config.name} - you have ${currentMemberCount} team members but tier allows ${config.seatLimit}. Remove team members first.`,
    };
  }

  // Warn about job limit (but allow downgrade)
  if (currentMonthJobs > config.monthlyJobLimit && config.monthlyJobLimit !== 999) {
    return {
      allowed: true, // Allow but warn
      reason: `Warning: You've accepted ${currentMonthJobs} jobs this month. ${config.name} tier limits to ${config.monthlyJobLimit} jobs/month. Future jobs will incur $${config.overagePrice} overage fees.`,
    };
  }

  return { allowed: true };
}
