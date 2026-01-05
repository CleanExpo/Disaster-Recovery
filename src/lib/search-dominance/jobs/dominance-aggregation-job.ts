/**
 * Dominance Aggregation Job
 *
 * Calculates daily dominance metrics by aggregating:
 * - Ranking positions (#1, top 3, top 10)
 * - AI Overview citation rate
 * - Traffic metrics
 * - Territory coverage
 * - Competitive position
 *
 * Produces a single dominance score (0-100) and stores in DominanceMetrics.
 *
 * Schedule: Daily at 1 AM
 */

import { prisma } from '@/lib/database/prisma-client';
import {
  emitDominanceUpdate,
  emitJobComplete,
} from '../realtime/events';
import type {
  DominanceMetricsData,
  DominanceScoreBreakdown,
  JobResult,
} from '../types/search-dominance-types';

// Scoring weights
const WEIGHTS = {
  RANKING: 0.4, // 40% - Ranking positions
  TRAFFIC: 0.3, // 30% - Traffic growth
  AI_CITATION: 0.2, // 20% - AI Overview presence
  COMPETITIVE: 0.1, // 10% - Competitive advantage
};

/**
 * Calculate ranking score (0-100)
 */
async function calculateRankingScore(): Promise<{
  score: number;
  position1Count: number;
  position1to3Count: number;
  position1to10Count: number;
  totalKeywords: number;
}> {
  // Get latest rankings (last 24 hours)
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const rankings = await prisma.rankingRecord.findMany({
    where: {
      timestamp: {
        gte: yesterday,
      },
    },
    distinct: ['keyword', 'location'], // Get latest per keyword/location
    orderBy: {
      timestamp: 'desc',
    },
  });

  const totalKeywords = rankings.length;
  const position1 = rankings.filter((r) => r.position === 1).length;
  const position1to3 = rankings.filter((r) => r.position <= 3).length;
  const position1to10 = rankings.filter((r) => r.position <= 10).length;

  // Scoring formula:
  // - #1 position = 10 points
  // - #2-3 position = 5 points
  // - #4-10 position = 2 points
  const points =
    position1 * 10 +
    (position1to3 - position1) * 5 +
    (position1to10 - position1to3) * 2;

  const maxPoints = totalKeywords * 10; // If all were #1
  const score = totalKeywords > 0 ? (points / maxPoints) * 100 : 0;

  return {
    score: Math.round(score),
    position1Count: position1,
    position1to3Count: position1to3,
    position1to10Count: position1to10,
    totalKeywords,
  };
}

/**
 * Calculate traffic score (0-100) based on growth
 */
async function calculateTrafficScore(): Promise<{
  score: number;
  dailySessions: number;
  dailyImpressions: number;
  dailyConversions: number;
}> {
  // Get yesterday's traffic
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  yesterday.setHours(0, 0, 0, 0);

  const today = new Date(yesterday);
  today.setDate(today.getDate() + 1);

  const yesterdayTraffic = await prisma.trafficRecord.findMany({
    where: {
      timestamp: {
        gte: yesterday,
        lt: today,
      },
    },
  });

  // Get previous week average for comparison
  const weekAgo = new Date(yesterday);
  weekAgo.setDate(weekAgo.getDate() - 7);

  const weekTraffic = await prisma.trafficRecord.findMany({
    where: {
      timestamp: {
        gte: weekAgo,
        lt: yesterday,
      },
    },
  });

  // Sum yesterday's metrics
  const dailySessions = yesterdayTraffic.reduce((sum, r) => sum + r.organicSessions, 0);
  const dailyImpressions = yesterdayTraffic.reduce((sum, r) => sum + r.impressions, 0);
  const dailyConversions = yesterdayTraffic.reduce((sum, r) => sum + r.conversions, 0);

  // Calculate week average
  const weekAvgSessions = weekTraffic.length > 0
    ? weekTraffic.reduce((sum, r) => sum + r.organicSessions, 0) / 7
    : 0;

  // Score based on growth vs. week average
  // +50% growth = 100 score
  // 0% growth = 50 score
  // -50% decline = 0 score
  let score = 50;

  if (weekAvgSessions > 0) {
    const growthPercent = ((dailySessions - weekAvgSessions) / weekAvgSessions) * 100;
    score = 50 + growthPercent; // Linear scale
    score = Math.max(0, Math.min(100, score)); // Clamp 0-100
  }

  return {
    score: Math.round(score),
    dailySessions,
    dailyImpressions,
    dailyConversions,
  };
}

/**
 * Calculate AI Overview citation score (0-100)
 */
async function calculateAICitationScore(): Promise<{
  score: number;
  citations: number;
  rate: number;
}> {
  // Get latest rankings with AI Overview data
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  const rankings = await prisma.rankingRecord.findMany({
    where: {
      timestamp: {
        gte: yesterday,
      },
    },
    distinct: ['keyword', 'location'],
    orderBy: {
      timestamp: 'desc',
    },
  });

  const totalWithAIOverview = rankings.filter((r) => r.hasAIOverview).length;
  const citations = rankings.filter((r) => r.isInAIOverview).length;

  const citationRate = totalWithAIOverview > 0
    ? (citations / totalWithAIOverview) * 100
    : 0;

  // Score = citation rate (0-100%)
  const score = Math.round(citationRate);

  return {
    score,
    citations,
    rate: citationRate,
  };
}

/**
 * Calculate competitive position score (0-100)
 */
async function calculateCompetitiveScore(): Promise<{
  score: number;
  activeLocations: number;
  totalCoverage: number;
  competitorsTracked: number;
  competitiveThreat: 'LOW' | 'MEDIUM' | 'HIGH';
}> {
  // Get territory coverage
  const activeAreas = await prisma.contractorServiceArea.count({
    where: {
      seoActivated: true,
    },
  });

  const totalAreas = await prisma.contractorServiceArea.count();
  const coveragePercent = totalAreas > 0 ? (activeAreas / totalAreas) * 100 : 0;

  // Get competitor threat
  const competitors = await prisma.competitor.findMany({
    where: { isActive: true },
    select: { threatLevel: true },
  });

  const highThreatCount = competitors.filter((c) => c.threatLevel === 'HIGH').length;
  const mediumThreatCount = competitors.filter((c) => c.threatLevel === 'MEDIUM').length;

  let competitiveThreat: 'LOW' | 'MEDIUM' | 'HIGH' = 'LOW';
  if (highThreatCount >= 3) {
    competitiveThreat = 'HIGH';
  } else if (highThreatCount >= 1 || mediumThreatCount >= 5) {
    competitiveThreat = 'MEDIUM';
  }

  // Score based on:
  // - 50% territory coverage
  // - 50% inverse of competitive threat
  const coverageScore = coveragePercent / 2;
  const threatScore = competitiveThreat === 'LOW' ? 50 : competitiveThreat === 'MEDIUM' ? 30 : 10;

  const score = Math.round(coverageScore + threatScore);

  return {
    score,
    activeLocations: activeAreas,
    totalCoverage: coveragePercent,
    competitorsTracked: competitors.length,
    competitiveThreat,
  };
}

/**
 * Calculate overall dominance score
 */
function calculateOverallScore(breakdown: DominanceScoreBreakdown): number {
  const weighted =
    breakdown.rankingScore * WEIGHTS.RANKING +
    breakdown.trafficScore * WEIGHTS.TRAFFIC +
    breakdown.aiCitationScore * WEIGHTS.AI_CITATION +
    breakdown.competitiveScore * WEIGHTS.COMPETITIVE;

  return Math.round(weighted);
}

/**
 * Main dominance aggregation job processor
 */
export async function processDominanceAggregation(
  progress?: (current: number, total: number, status: string) => void
): Promise<JobResult> {
  const startTime = Date.now();
  const errors: string[] = [];
  const warnings: string[] = [];

  console.log('[Dominance Aggregation] Starting dominance aggregation job...');

  try {
    // Step 1: Calculate ranking score
    if (progress) progress(1, 4, 'Calculating ranking score');
    const rankingData = await calculateRankingScore();
    console.log(`[Dominance Aggregation] Ranking score: ${rankingData.score}`);

    // Step 2: Calculate traffic score
    if (progress) progress(2, 4, 'Calculating traffic score');
    const trafficData = await calculateTrafficScore();
    console.log(`[Dominance Aggregation] Traffic score: ${trafficData.score}`);

    // Step 3: Calculate AI citation score
    if (progress) progress(3, 4, 'Calculating AI citation score');
    const aiData = await calculateAICitationScore();
    console.log(`[Dominance Aggregation] AI citation score: ${aiData.score}`);

    // Step 4: Calculate competitive score
    if (progress) progress(4, 4, 'Calculating competitive score');
    const competitiveData = await calculateCompetitiveScore();
    console.log(`[Dominance Aggregation] Competitive score: ${competitiveData.score}`);

    // Calculate overall dominance score
    const breakdown: DominanceScoreBreakdown = {
      rankingScore: rankingData.score,
      trafficScore: trafficData.score,
      aiCitationScore: aiData.score,
      competitiveScore: competitiveData.score,
      totalScore: 0, // Will be calculated
    };

    breakdown.totalScore = calculateOverallScore(breakdown);

    console.log(`[Dominance Aggregation] Overall dominance score: ${breakdown.totalScore}`);

    // Prepare metrics data
    const metricsData: DominanceMetricsData = {
      dominanceScore: breakdown.totalScore,
      position1Count: rankingData.position1Count,
      position1to3Count: rankingData.position1to3Count,
      position1to10Count: rankingData.position1to10Count,
      totalKeywords: rankingData.totalKeywords,
      aiOverviewCitations: aiData.citations,
      aiOverviewRate: aiData.rate,
      dailySessions: trafficData.dailySessions,
      dailyImpressions: trafficData.dailyImpressions,
      dailyConversions: trafficData.dailyConversions,
      activeLocations: competitiveData.activeLocations,
      totalCoverage: competitiveData.totalCoverage,
      competitorsTracked: competitiveData.competitorsTracked,
      competitiveThreat: competitiveData.competitiveThreat,
      date: new Date(),
    };

    // Save to database
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    yesterday.setHours(0, 0, 0, 0);

    await prisma.dominanceMetrics.upsert({
      where: { date: yesterday },
      update: metricsData,
      create: metricsData,
    });

    console.log('[Dominance Aggregation] Metrics saved to database');

    // Emit dominance score update event
    emitDominanceUpdate(metricsData);

    const duration = Date.now() - startTime;
    console.log(`[Dominance Aggregation] Completed in ${duration}ms`);

    const result: JobResult = {
      success: true,
      recordsProcessed: 1,
      recordsCreated: 1,
      errors,
      warnings,
      duration,
      completedAt: new Date(),
    };

    // Emit job completion event
    emitJobComplete('dominance-aggregation', result);

    return result;
  } catch (error) {
    console.error('[Dominance Aggregation] Fatal error:', error);
    errors.push(error instanceof Error ? error.message : 'Unknown error');

    const result: JobResult = {
      success: false,
      recordsProcessed: 0,
      recordsCreated: 0,
      errors,
      warnings,
      duration: Date.now() - startTime,
      completedAt: new Date(),
    };

    // Emit job completion event (even on failure)
    emitJobComplete('dominance-aggregation', result);

    return result;
  }
}

/**
 * Export for Bull queue integration
 */
export default {
  name: 'dominance-aggregation',
  processor: processDominanceAggregation,
};
