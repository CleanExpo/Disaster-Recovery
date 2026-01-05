/**
 * Competitor Snapshot Job
 *
 * Creates point-in-time snapshots of competitor metrics by:
 * - Querying existing CompetitorAnalysis data
 * - Detecting major updates and new content
 * - Calculating content velocity
 * - Updating threat levels
 * - Creating alerts for significant competitor activity
 *
 * Schedule: Daily at 3 AM (after competitor analysis job)
 */

import { prisma } from '@/lib/database/prisma-client';
import {
  emitCompetitorActivity,
  emitJobComplete,
} from '../realtime/events';
import type {
  CompetitorSnapshotData,
  CompetitorActivity,
  JobResult,
} from '../types/search-dominance-types';

// Configuration
const MAJOR_UPDATE_THRESHOLD = 20; // 20% change in metrics = major update
const CONTENT_VELOCITY_DAYS = 7; // Calculate articles per week
const HIGH_THREAT_KEYWORDS = 50; // Competitor with 50+ top-10 keywords = HIGH threat

/**
 * Get latest analysis for a competitor
 */
async function getLatestAnalysis(competitorId: string) {
  return await prisma.competitorAnalysis.findFirst({
    where: { competitorId },
    orderBy: { analysisDate: 'desc' },
  });
}

/**
 * Get previous snapshot for comparison
 */
async function getPreviousSnapshot(competitorId: string) {
  return await prisma.competitorSnapshot.findFirst({
    where: { competitorId },
    orderBy: { timestamp: 'desc' },
  });
}

/**
 * Detect if competitor had a major update
 */
function detectMajorUpdate(
  current: any,
  previous: any | null
): boolean {
  if (!previous) return false;

  const metrics = [
    { current: current.organicKeywords, previous: previous.organicKeywords },
    { current: current.organicTraffic, previous: previous.organicTraffic },
    { current: current.rankingKeywords, previous: previous.rankingKeywords },
  ];

  for (const metric of metrics) {
    if (metric.previous === 0) continue;

    const changePercent = Math.abs(
      ((metric.current - metric.previous) / metric.previous) * 100
    );

    if (changePercent >= MAJOR_UPDATE_THRESHOLD) {
      return true;
    }
  }

  return false;
}

/**
 * Detect new content from competitor
 */
async function detectNewContent(
  competitorId: string
): Promise<string[]> {
  // TODO: Implement content detection logic
  // This would scrape competitor's sitemap or blog feed
  // and compare against known content URLs
  // For now, return empty array
  return [];
}

/**
 * Calculate content velocity (articles per week)
 */
async function calculateContentVelocity(
  competitorId: string
): Promise<number> {
  const daysAgo = new Date();
  daysAgo.setDate(daysAgo.getDate() - CONTENT_VELOCITY_DAYS);

  // Get snapshots from the past week
  const snapshots = await prisma.competitorSnapshot.findMany({
    where: {
      competitorId,
      timestamp: {
        gte: daysAgo,
      },
    },
    orderBy: {
      timestamp: 'asc',
    },
  });

  if (snapshots.length < 2) return 0;

  const contentChange =
    snapshots[snapshots.length - 1].publishedContent -
    snapshots[0].publishedContent;

  return contentChange / (CONTENT_VELOCITY_DAYS / 7);
}

/**
 * Determine threat level based on competitor metrics
 */
function calculateThreatLevel(snapshot: CompetitorSnapshotData): 'LOW' | 'MEDIUM' | 'HIGH' {
  // HIGH threat: Many top-10 rankings or recent major update
  if (
    snapshot.topTenKeywords >= HIGH_THREAT_KEYWORDS ||
    snapshot.majorUpdate
  ) {
    return 'HIGH';
  }

  // MEDIUM threat: Growing content velocity or strong metrics
  if (
    snapshot.contentVelocity >= 2 || // 2+ articles per week
    snapshot.topTenKeywords >= 25 // 25+ top-10 keywords
  ) {
    return 'MEDIUM';
  }

  return 'LOW';
}

/**
 * Create competitor snapshot
 */
async function createSnapshot(
  competitorId: string,
  competitorName: string
): Promise<CompetitorSnapshotData | null> {
  try {
    // Get latest analysis
    const analysis = await getLatestAnalysis(competitorId);
    if (!analysis) {
      console.warn(`[Competitor Snapshot] No analysis found for ${competitorName}`);
      return null;
    }

    // Get previous snapshot for comparison
    const previousSnapshot = await getPreviousSnapshot(competitorId);

    // Get competitor keywords to count top-10
    const keywords = await prisma.competitorKeyword.findMany({
      where: {
        competitorId,
        position: {
          lte: 10,
        },
      },
    });

    // Detect new content
    const newContent = await detectNewContent(competitorId);

    // Calculate content velocity
    const contentVelocity = await calculateContentVelocity(competitorId);

    // Prepare snapshot data
    const snapshotData: CompetitorSnapshotData = {
      competitorId,
      competitorName,
      organicKeywords: analysis.organicKeywords || 0,
      organicTraffic: analysis.organicTraffic || 0,
      domainAuthority: analysis.domainRating || null,
      backlinks: analysis.totalBacklinks || null,
      rankingKeywords: analysis.totalKeywords || 0,
      topTenKeywords: keywords.length,
      publishedContent: analysis.totalPages || 0,
      contentVelocity,
      newContent,
      majorUpdate: detectMajorUpdate(
        {
          organicKeywords: analysis.organicKeywords || 0,
          organicTraffic: analysis.organicTraffic || 0,
          rankingKeywords: analysis.totalKeywords || 0,
        },
        previousSnapshot
      ),
      timestamp: new Date(),
    };

    // Save to database
    await prisma.competitorSnapshot.create({
      data: {
        competitorId: snapshotData.competitorId,
        organicKeywords: snapshotData.organicKeywords,
        organicTraffic: snapshotData.organicTraffic,
        domainAuthority: snapshotData.domainAuthority,
        backlinks: snapshotData.backlinks,
        rankingKeywords: snapshotData.rankingKeywords,
        topTenKeywords: snapshotData.topTenKeywords,
        publishedContent: snapshotData.publishedContent,
        contentVelocity: snapshotData.contentVelocity,
        newContent: snapshotData.newContent,
        majorUpdate: snapshotData.majorUpdate,
        timestamp: snapshotData.timestamp,
      },
    });

    // Calculate threat level
    const threatLevel = calculateThreatLevel(snapshotData);

    // Update competitor record
    await prisma.competitor.update({
      where: { id: competitorId },
      data: {
        lastSnapshotAt: snapshotData.timestamp,
        contentVelocity: snapshotData.contentVelocity,
        threatLevel,
      },
    });

    // Create alerts for significant activity
    if (snapshotData.majorUpdate) {
      await createMajorUpdateAlert(competitorName, threatLevel);

      // Emit competitor activity event
      emitCompetitorActivity({
        competitorId,
        competitorName,
        activityType: 'major_update',
        details: `Significant changes in search presence (20%+ change in key metrics)`,
        threatLevel,
        timestamp: new Date(),
      });
    }

    if (newContent.length > 0) {
      await createNewContentAlert(competitorName, newContent.length);

      // Emit competitor activity event
      emitCompetitorActivity({
        competitorId,
        competitorName,
        activityType: 'new_content',
        details: `Published ${newContent.length} new piece${newContent.length > 1 ? 's' : ''} of content`,
        threatLevel,
        timestamp: new Date(),
      });
    }

    return snapshotData;
  } catch (error) {
    console.error(`[Competitor Snapshot] Error creating snapshot for ${competitorName}:`, error);
    return null;
  }
}

/**
 * Create alert for major competitor update
 */
async function createMajorUpdateAlert(
  competitorName: string,
  threatLevel: string
): Promise<void> {
  await prisma.searchAlert.create({
    data: {
      type: 'competitor_movement',
      severity: threatLevel === 'HIGH' ? 'CRITICAL' : 'WARNING',
      title: `Major Update Detected: ${competitorName}`,
      message: `${competitorName} has shown significant changes in their search presence (20%+ change in key metrics). Threat level: ${threatLevel}.`,
      competitor: competitorName,
      actionRequired: threatLevel === 'HIGH',
      actionUrl: '/dashboard/admin/competitors',
    },
  });
}

/**
 * Create alert for new competitor content
 */
async function createNewContentAlert(
  competitorName: string,
  contentCount: number
): Promise<void> {
  await prisma.searchAlert.create({
    data: {
      type: 'competitor_movement',
      severity: 'INFO',
      title: `New Content: ${competitorName}`,
      message: `${competitorName} published ${contentCount} new piece${contentCount > 1 ? 's' : ''} of content.`,
      competitor: competitorName,
      actionRequired: false,
    },
  });
}

/**
 * Main competitor snapshot job processor
 */
export async function processCompetitorSnapshot(
  progress?: (current: number, total: number, status: string) => void
): Promise<JobResult> {
  const startTime = Date.now();
  const errors: string[] = [];
  const warnings: string[] = [];

  console.log('[Competitor Snapshot] Starting competitor snapshot job...');

  try {
    // Get all active competitors
    const competitors = await prisma.competitor.findMany({
      where: { isActive: true },
      select: {
        id: true,
        name: true,
      },
    });

    console.log(`[Competitor Snapshot] Processing ${competitors.length} competitors`);

    const snapshots: CompetitorSnapshotData[] = [];

    for (let i = 0; i < competitors.length; i++) {
      const competitor = competitors[i];

      if (progress) {
        progress(i + 1, competitors.length, `Snapshotting ${competitor.name}`);
      }

      const snapshot = await createSnapshot(competitor.id, competitor.name);

      if (snapshot) {
        snapshots.push(snapshot);
      } else {
        warnings.push(`Failed to create snapshot for ${competitor.name}`);
      }
    }

    const duration = Date.now() - startTime;
    console.log(`[Competitor Snapshot] Completed in ${duration}ms - ${snapshots.length} snapshots created`);

    const result: JobResult = {
      success: true,
      recordsProcessed: competitors.length,
      recordsCreated: snapshots.length,
      errors,
      warnings,
      duration,
      completedAt: new Date(),
    };

    // Emit job completion event
    emitJobComplete('competitor-snapshot', result);

    return result;
  } catch (error) {
    console.error('[Competitor Snapshot] Fatal error:', error);
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
    emitJobComplete('competitor-snapshot', result);

    return result;
  }
}

/**
 * Export for Bull queue integration
 */
export default {
  name: 'competitor-snapshot',
  processor: processCompetitorSnapshot,
};
