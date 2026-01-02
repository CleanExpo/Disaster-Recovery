/**
 * Leaderboard Service
 *
 * Public contractor performance rankings
 * Strategic decision: Dual leaderboards (global + regional)
 *
 * Ranking criteria (from SaaS spec):
 * - Job completion rate (40% weight)
 * - Average client rating (30% weight) - Private but affects leaderboard
 * - Response time (20% weight)
 * - Total jobs completed (10% weight)
 */

import { prisma } from '@/lib/prisma';

// ============================================================================
// TYPES
// ============================================================================

export interface LeaderboardEntry {
  rank: number;
  workspaceId: string;
  businessName: string;
  state?: string;
  completionRate: number;
  totalJobs: number;
  memberSince: string;
  certifications: string[];
  score: number; // Calculated ranking score
}

export type Region =
  | 'sydney-metro'
  | 'melbourne-metro'
  | 'brisbane-metro'
  | 'perth-metro'
  | 'adelaide'
  | 'regional-nsw'
  | 'regional-vic'
  | 'regional-qld'
  | 'regional-wa'
  | 'regional-sa'
  | 'regional-tas'
  | 'regional-nt'
  | 'regional-act';

// ============================================================================
// LEADERBOARD CALCULATION
// ============================================================================

/**
 * Calculate leaderboard score based on performance metrics
 */
function calculateLeaderboardScore(
  completionRate: number,    // 0-100%
  averageRating: number,      // 0-5 stars (private feedback)
  averageResponseTime: number, // Minutes
  totalJobs: number
): number {
  // Normalize metrics to 0-100 scale
  const completionScore = completionRate; // Already 0-100
  const ratingScore = (averageRating / 5) * 100; // 0-5 → 0-100
  const responseScore = Math.max(0, 100 - averageResponseTime); // Lower is better, max 100min
  const volumeScore = Math.min(100, (totalJobs / 100) * 100); // 100 jobs = max score

  // Apply weights
  const score =
    completionScore * 0.4 + // 40% weight
    ratingScore * 0.3 +     // 30% weight
    responseScore * 0.2 +   // 20% weight
    volumeScore * 0.1;      // 10% weight

  return Math.round(score * 100) / 100; // Round to 2 decimals
}

/**
 * Get global leaderboard (top 100 Australia-wide)
 */
export async function getGlobalLeaderboard(limit: number = 100): Promise<LeaderboardEntry[]> {
  const workspaces = await prisma.workspace.findMany({
    where: {
      subscriptionStatus: 'ACTIVE',
      isActive: true,
      totalJobsCompleted: { gt: 0 }, // Must have completed at least 1 job
    },
    select: {
      id: true,
      businessName: true,
      completionRate: true,
      averageRating: true,
      averageResponseTime: true,
      totalJobsCompleted: true,
      createdAt: true,
    },
    take: 1000, // Get top 1000 for scoring
  });

  // Calculate scores and rank
  const scored = workspaces
    .map((w) => ({
      workspaceId: w.id,
      businessName: w.businessName,
      completionRate: Number(w.completionRate),
      totalJobs: w.totalJobsCompleted,
      memberSince: w.createdAt.toISOString().split('T')[0],
      certifications: [], // TODO: Get from contractor certifications
      score: calculateLeaderboardScore(
        Number(w.completionRate),
        Number(w.averageRating),
        w.averageResponseTime,
        w.totalJobsCompleted
      ),
    }))
    .sort((a, b) => b.score - a.score) // Highest score first
    .slice(0, limit)
    .map((entry, index) => ({
      rank: index + 1,
      ...entry,
    }));

  return scored;
}

/**
 * Get regional leaderboard (top 10 per region)
 */
export async function getRegionalLeaderboard(
  region: Region,
  limit: number = 10
): Promise<LeaderboardEntry[]> {
  // Map region to postcodes/states (simplified)
  const regionFilters = getRegionFilter(region);

  const workspaces = await prisma.workspace.findMany({
    where: {
      subscriptionStatus: 'ACTIVE',
      isActive: true,
      totalJobsCompleted: { gt: 0 },
      rotationQueue: {
        some: regionFilters,
      },
    },
    select: {
      id: true,
      businessName: true,
      completionRate: true,
      averageRating: true,
      averageResponseTime: true,
      totalJobsCompleted: true,
      createdAt: true,
    },
    take: 100,
  });

  // Calculate scores and rank
  const scored = workspaces
    .map((w) => ({
      workspaceId: w.id,
      businessName: w.businessName,
      completionRate: Number(w.completionRate),
      totalJobs: w.totalJobsCompleted,
      memberSince: w.createdAt.toISOString().split('T')[0],
      certifications: [],
      score: calculateLeaderboardScore(
        Number(w.completionRate),
        Number(w.averageRating),
        w.averageResponseTime,
        w.totalJobsCompleted
      ),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((entry, index) => ({
      rank: index + 1,
      ...entry,
    }));

  return scored;
}

/**
 * Get region filter for leaderboard queries
 */
function getRegionFilter(region: Region): any {
  const filters: Record<Region, any> = {
    'sydney-metro': { postcode: { startsWith: '2' } },
    'melbourne-metro': { postcode: { startsWith: '3' } },
    'brisbane-metro': { postcode: { startsWith: '4' } },
    'perth-metro': { postcode: { startsWith: '6' } },
    'adelaide': { postcode: { startsWith: '5' } },
    'regional-nsw': { postcode: { startsWith: '2' } },
    'regional-vic': { postcode: { startsWith: '3' } },
    'regional-qld': { postcode: { startsWith: '4' } },
    'regional-wa': { postcode: { startsWith: '6' } },
    'regional-sa': { postcode: { startsWith: '5' } },
    'regional-tas': { postcode: { startsWith: '7' } },
    'regional-nt': { postcode: { startsWith: '0' } },
    'regional-act': { postcode: { startsWith: '0' } },
  };

  return filters[region] || {};
}

/**
 * Get contractor's rank in global and regional leaderboards
 */
export async function getContractorRank(workspaceId: string): Promise<{
  globalRank: number | null;
  regionalRank: number | null;
  region: Region | null;
  score: number;
}> {
  const workspace = await prisma.workspace.findUnique({
    where: { id: workspaceId },
    include: {
      rotationQueue: {
        take: 1,
      },
    },
  });

  if (!workspace) {
    return { globalRank: null, regionalRank: null, region: null, score: 0 };
  }

  const score = calculateLeaderboardScore(
    Number(workspace.completionRate),
    Number(workspace.averageRating),
    workspace.averageResponseTime,
    workspace.totalJobsCompleted
  );

  // Get global rank (count how many have higher score)
  const higherScored = await prisma.workspace.count({
    where: {
      subscriptionStatus: 'ACTIVE',
      isActive: true,
      totalJobsCompleted: { gt: 0 },
      // Would need to calculate score in DB or use raw SQL
      // For now, simplified
    },
  });

  return {
    globalRank: higherScored + 1, // Simplified
    regionalRank: null, // TODO: Calculate regional rank
    region: null, // TODO: Detect from postcode
    score,
  };
}
