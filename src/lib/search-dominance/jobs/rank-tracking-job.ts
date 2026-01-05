/**
 * Rank Tracking Job
 *
 * Extends the existing rank-tracker.ts (612 lines) to:
 * - Track rankings for all monitored keywords
 * - Detect SERP features and AI Overview citations
 * - Store results in RankingRecord table
 * - Detect significant ranking changes
 * - Emit alerts for major movements
 * - Emit WebSocket events for real-time updates
 *
 * Schedule: Every 6 hours
 */

import { prisma } from '@/lib/database/prisma-client';
import { RankTracker } from '@/lib/seo/rank-tracker';
import {
  emitRankingUpdate,
  emitRankingChange,
  emitAICitation,
  emitJobComplete,
} from '../realtime/events';
import type {
  RankingData,
  RankingChange,
  SearchAlertData,
  JobResult,
} from '../types/search-dominance-types';

// Configuration
const RANK_CHANGE_THRESHOLD = 3; // Alert if position changes by ±3
const TRACKED_KEYWORDS_LIMIT = 500; // Maximum keywords to track per run
const LOCATIONS = ['Brisbane', 'Queensland', 'Australia']; // Australian locations
const DEVICES = ['desktop', 'mobile'] as const;

/**
 * Get keywords to track from configuration or database
 */
async function getTrackedKeywords(): Promise<string[]> {
  // TODO: Fetch from configuration table or KeywordTracking model
  // For now, return a sample set
  return [
    'water damage restoration Brisbane',
    'flood damage repair Brisbane',
    'mould removal Brisbane',
    'fire damage restoration Brisbane',
    'emergency water extraction Brisbane',
    'disaster recovery services Brisbane',
    'water damage restoration Ipswich',
    'mould remediation Gold Coast',
    'fire restoration Queensland',
    'emergency restoration Australia',
  ];
}

/**
 * Process ranking data for a single keyword
 */
async function processKeywordRanking(
  keyword: string,
  location: string,
  device: 'desktop' | 'mobile',
  rankTracker: RankTracker
): Promise<RankingData | null> {
  try {
    // Get current ranking data (from existing rank-tracker.ts)
    const ranking = await rankTracker.trackKeyword(keyword, location, device);

    if (!ranking) {
      console.warn(`[Rank Tracking] No data returned for "${keyword}"`);
      return null;
    }

    // Get previous position from database
    const previousRecord = await prisma.rankingRecord.findFirst({
      where: {
        keyword,
        location,
        device,
      },
      orderBy: {
        timestamp: 'desc',
      },
      select: {
        position: true,
      },
    });

    // Prepare ranking data
    const rankingData: RankingData = {
      keyword,
      position: ranking.position || 0,
      previousPosition: previousRecord?.position || null,
      url: ranking.url || '',
      searchVolume: ranking.searchVolume || null,
      location,
      device,
      serpFeatures: {
        hasFeaturedSnippet: ranking.serpFeatures?.includes('FEATURED_SNIPPET') || false,
        hasLocalPack: ranking.serpFeatures?.includes('LOCAL_PACK') || false,
        hasAIOverview: ranking.serpFeatures?.includes('AI_OVERVIEW') || false,
        isInAIOverview: ranking.isInAIOverview || false,
        aiOverviewPosition: ranking.aiOverviewPosition || null,
      },
      competitorPositions: ranking.competitorPositions || {},
      timestamp: new Date(),
    };

    // Save to database
    await prisma.rankingRecord.create({
      data: {
        keyword: rankingData.keyword,
        position: rankingData.position,
        previousPosition: rankingData.previousPosition,
        url: rankingData.url,
        searchVolume: rankingData.searchVolume,
        location: rankingData.location,
        device: rankingData.device,
        hasFeaturedSnippet: rankingData.serpFeatures.hasFeaturedSnippet,
        hasLocalPack: rankingData.serpFeatures.hasLocalPack,
        hasAIOverview: rankingData.serpFeatures.hasAIOverview,
        isInAIOverview: rankingData.serpFeatures.isInAIOverview,
        aiOverviewPosition: rankingData.serpFeatures.aiOverviewPosition,
        competitorPositions: rankingData.competitorPositions,
        timestamp: rankingData.timestamp,
      },
    });

    return rankingData;
  } catch (error) {
    console.error(`[Rank Tracking] Error processing "${keyword}":`, error);
    return null;
  }
}

/**
 * Detect ranking changes and create alerts
 */
async function detectRankingChanges(rankings: RankingData[]): Promise<RankingChange[]> {
  const changes: RankingChange[] = [];

  for (const ranking of rankings) {
    if (ranking.previousPosition === null) {
      continue; // First time tracking this keyword
    }

    const change = ranking.previousPosition - ranking.position;
    const absChange = Math.abs(change);

    if (absChange >= RANK_CHANGE_THRESHOLD) {
      const severity =
        absChange >= 10 ? 'critical' : absChange >= 5 ? 'warning' : 'info';

      changes.push({
        keyword: ranking.keyword,
        oldPosition: ranking.previousPosition,
        newPosition: ranking.position,
        change,
        url: ranking.url,
        severity,
      });

      // Create alert in database
      await createRankingAlert(ranking, change, severity);
    }
  }

  return changes;
}

/**
 * Create a search alert for ranking change
 */
async function createRankingAlert(
  ranking: RankingData,
  change: number,
  severity: 'critical' | 'warning' | 'info'
): Promise<void> {
  const isGain = change > 0;
  const alertSeverity = severity === 'critical' ? 'CRITICAL' : severity === 'warning' ? 'WARNING' : 'INFO';

  await prisma.searchAlert.create({
    data: {
      type: isGain ? 'rank_gain' : 'rank_drop',
      severity: alertSeverity,
      title: isGain
        ? `Ranking Improved: "${ranking.keyword}"`
        : `Ranking Dropped: "${ranking.keyword}"`,
      message: `Position changed from #${ranking.previousPosition} to #${ranking.position} (${isGain ? '+' : ''}${change} positions) for "${ranking.keyword}" in ${ranking.location} on ${ranking.device}.`,
      keyword: ranking.keyword,
      metric: 'ranking_position',
      oldValue: ranking.previousPosition?.toString() || null,
      newValue: ranking.position.toString(),
      actionRequired: severity === 'critical',
      actionUrl: `/dashboard/admin/search-dominance?keyword=${encodeURIComponent(ranking.keyword)}`,
    },
  });
}

/**
 * Track AI Overview citations
 */
async function trackAIOverviewCitations(rankings: RankingData[]): Promise<void> {
  const citations = rankings.filter((r) => r.serpFeatures.isInAIOverview);

  for (const citation of citations) {
    // Check if this is a new citation
    const previousCitation = await prisma.rankingRecord.findFirst({
      where: {
        keyword: citation.keyword,
        location: citation.location,
        isInAIOverview: true,
      },
      orderBy: {
        timestamp: 'desc',
      },
    });

    if (!previousCitation) {
      // New AI Overview citation - create alert
      await prisma.searchAlert.create({
        data: {
          type: 'ai_citation_gained',
          severity: 'INFO',
          title: `AI Overview Citation: "${citation.keyword}"`,
          message: `Your content is now cited in Google AI Overview for "${citation.keyword}" at position ${citation.serpFeatures.aiOverviewPosition} in ${citation.location}.`,
          keyword: citation.keyword,
          actionRequired: false,
        },
      });

      // Emit AI citation event
      emitAICitation({
        keyword: citation.keyword,
        gained: true,
        position: citation.serpFeatures.aiOverviewPosition,
        location: citation.location,
      });
    }
  }
}

/**
 * Main rank tracking job processor
 */
export async function processRankTracking(
  progress?: (current: number, total: number, status: string) => void
): Promise<JobResult> {
  const startTime = Date.now();
  const errors: string[] = [];
  const warnings: string[] = [];

  console.log('[Rank Tracking] Starting rank tracking job...');

  try {
    // Initialize rank tracker
    const rankTracker = new RankTracker({
      apiKey: process.env.DATAFORSEO_PASSWORD || '',
      domain: 'disasterrecovery.com.au',
      locations: LOCATIONS,
    });

    // Get keywords to track
    const keywords = await getTrackedKeywords();
    const totalOperations = keywords.length * LOCATIONS.length * DEVICES.length;
    let currentOperation = 0;

    console.log(`[Rank Tracking] Tracking ${keywords.length} keywords across ${LOCATIONS.length} locations and ${DEVICES.length} devices`);

    const allRankings: RankingData[] = [];

    // Track rankings for all keywords
    for (const keyword of keywords.slice(0, TRACKED_KEYWORDS_LIMIT)) {
      for (const location of LOCATIONS) {
        for (const device of DEVICES) {
          currentOperation++;

          if (progress) {
            progress(
              currentOperation,
              totalOperations,
              `Tracking "${keyword}" in ${location} on ${device}`
            );
          }

          const ranking = await processKeywordRanking(
            keyword,
            location,
            device,
            rankTracker
          );

          if (ranking) {
            allRankings.push(ranking);
          } else {
            warnings.push(`No data for "${keyword}" in ${location} on ${device}`);
          }

          // Rate limiting: Small delay between API calls
          await new Promise((resolve) => setTimeout(resolve, 100));
        }
      }
    }

    // Detect ranking changes
    console.log('[Rank Tracking] Detecting ranking changes...');
    const changes = await detectRankingChanges(allRankings);
    console.log(`[Rank Tracking] Detected ${changes.length} significant ranking changes`);

    // Emit ranking change events
    for (const change of changes) {
      emitRankingChange(change);
    }

    // Track AI Overview citations
    console.log('[Rank Tracking] Tracking AI Overview citations...');
    await trackAIOverviewCitations(allRankings);

    // Emit general ranking update event
    emitRankingUpdate(allRankings);

    const duration = Date.now() - startTime;
    console.log(`[Rank Tracking] Completed in ${duration}ms - ${allRankings.length} rankings tracked`);

    const result: JobResult = {
      success: true,
      recordsProcessed: totalOperations,
      recordsCreated: allRankings.length,
      errors,
      warnings,
      duration,
      completedAt: new Date(),
    };

    // Emit job completion event
    emitJobComplete('rank-tracking', result);

    return result;
  } catch (error) {
    console.error('[Rank Tracking] Fatal error:', error);
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
    emitJobComplete('rank-tracking', result);

    return result;
  }
}

/**
 * Export for Bull queue integration
 */
export default {
  name: 'rank-tracking',
  processor: processRankTracking,
};
