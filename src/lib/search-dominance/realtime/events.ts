/**
 * Search Dominance Real-Time Events
 *
 * Event emitter functions that broadcast updates via WebSocket.
 * These are called from background jobs after database saves.
 *
 * Pattern: Uses existing websocket-manager.ts (594 lines)
 */

import { websocketManager } from '@/lib/realtime/websocket-manager';
import { SEARCH_DOMINANCE_TOPICS } from './topics';
import type {
  RankingData,
  RankingChange,
  TrafficData,
  TrafficAnomaly,
  SearchAlertData,
  BlueOceanOpportunityData,
  CompetitorActivity,
  AlgorithmUpdateData,
  DominanceMetricsData,
  JobProgress,
  JobResult,
} from '../types/search-dominance-types';

// ============================================================================
// RANKING EVENTS
// ============================================================================

/**
 * Emit general ranking update
 */
export function emitRankingUpdate(rankings: RankingData[]) {
  websocketManager.broadcast(SEARCH_DOMINANCE_TOPICS.RANKINGS, {
    type: 'rankings_updated',
    count: rankings.length,
    timestamp: new Date().toISOString(),
    data: rankings.slice(0, 10), // Send first 10 for preview
  });
}

/**
 * Emit significant ranking change
 */
export function emitRankingChange(change: RankingChange) {
  websocketManager.broadcast(SEARCH_DOMINANCE_TOPICS.RANKING_CHANGE, {
    type: 'ranking_change',
    keyword: change.keyword,
    oldPosition: change.oldPosition,
    newPosition: change.newPosition,
    change: change.change,
    url: change.url,
    severity: change.severity,
    timestamp: new Date().toISOString(),
  });

  console.log(
    `[WebSocket] Ranking change emitted: "${change.keyword}" moved ${change.change > 0 ? 'up' : 'down'} ${Math.abs(change.change)} positions`
  );
}

/**
 * Emit AI Overview citation event
 */
export function emitAICitation(data: {
  keyword: string;
  gained: boolean;
  position: number | null;
  location: string;
}) {
  websocketManager.broadcast(SEARCH_DOMINANCE_TOPICS.AI_CITATION, {
    type: data.gained ? 'citation_gained' : 'citation_lost',
    keyword: data.keyword,
    position: data.position,
    location: data.location,
    timestamp: new Date().toISOString(),
  });

  console.log(
    `[WebSocket] AI citation ${data.gained ? 'gained' : 'lost'}: "${data.keyword}"`
  );
}

// ============================================================================
// TRAFFIC EVENTS
// ============================================================================

/**
 * Emit traffic update
 */
export function emitTrafficUpdate(traffic: TrafficData[]) {
  const totals = traffic.reduce(
    (acc, t) => ({
      sessions: acc.sessions + t.organicSessions,
      impressions: acc.impressions + t.impressions,
      clicks: acc.clicks + t.clicks,
      conversions: acc.conversions + t.conversions,
    }),
    { sessions: 0, impressions: 0, clicks: 0, conversions: 0 }
  );

  websocketManager.broadcast(SEARCH_DOMINANCE_TOPICS.TRAFFIC, {
    type: 'traffic_updated',
    totals,
    recordCount: traffic.length,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Emit traffic anomaly (spike or drop)
 */
export function emitTrafficAnomaly(anomaly: TrafficAnomaly) {
  websocketManager.broadcast(SEARCH_DOMINANCE_TOPICS.TRAFFIC_ANOMALY, {
    type: 'traffic_anomaly',
    metric: anomaly.metric,
    current: anomaly.current,
    previous: anomaly.previous,
    changePercent: anomaly.changePercent,
    severity: anomaly.severity,
    timestamp: anomaly.timestamp.toISOString(),
  });

  console.log(
    `[WebSocket] Traffic anomaly emitted: ${anomaly.metric} ${anomaly.severity} (${anomaly.changePercent.toFixed(1)}%)`
  );
}

// ============================================================================
// ALERT EVENTS
// ============================================================================

/**
 * Emit new alert
 */
export function emitAlert(alert: SearchAlertData) {
  websocketManager.broadcast(SEARCH_DOMINANCE_TOPICS.ALERT_NEW, {
    type: 'alert_new',
    alert: {
      type: alert.type,
      severity: alert.severity,
      title: alert.title,
      message: alert.message,
      keyword: alert.keyword,
      competitor: alert.competitor,
      metric: alert.metric,
      oldValue: alert.oldValue,
      newValue: alert.newValue,
      actionRequired: alert.actionRequired,
      actionUrl: alert.actionUrl,
      createdAt: alert.createdAt.toISOString(),
    },
    timestamp: new Date().toISOString(),
  });

  // Also send to general alerts feed
  websocketManager.broadcast(SEARCH_DOMINANCE_TOPICS.ALERTS, {
    type: 'alerts_feed',
    alert: alert,
    timestamp: new Date().toISOString(),
  });

  console.log(
    `[WebSocket] Alert emitted: ${alert.severity} - ${alert.title}`
  );
}

// ============================================================================
// BLUE OCEAN EVENTS
// ============================================================================

/**
 * Emit new Blue Ocean opportunity
 */
export function emitBlueOceanOpportunity(opportunity: BlueOceanOpportunityData) {
  websocketManager.broadcast(SEARCH_DOMINANCE_TOPICS.BLUE_OCEAN_NEW, {
    type: 'opportunity_new',
    opportunity: {
      keyword: opportunity.keyword,
      topic: opportunity.topic,
      category: opportunity.category,
      opportunityScore: opportunity.opportunityScore,
      searchVolume: opportunity.searchVolume,
      growthRate: opportunity.growthRate,
      competitionGap: opportunity.competitionGap,
      detectedAt: opportunity.detectedAt.toISOString(),
    },
    timestamp: new Date().toISOString(),
  });

  console.log(
    `[WebSocket] Blue Ocean opportunity emitted: "${opportunity.keyword || opportunity.topic}" (score: ${opportunity.opportunityScore})`
  );
}

// ============================================================================
// COMPETITOR EVENTS
// ============================================================================

/**
 * Emit competitor activity
 */
export function emitCompetitorActivity(activity: CompetitorActivity) {
  websocketManager.broadcast(SEARCH_DOMINANCE_TOPICS.COMPETITOR_ACTIVITY, {
    type: 'competitor_activity',
    competitorId: activity.competitorId,
    competitorName: activity.competitorName,
    activityType: activity.activityType,
    details: activity.details,
    threatLevel: activity.threatLevel,
    timestamp: activity.timestamp.toISOString(),
  });

  console.log(
    `[WebSocket] Competitor activity emitted: ${activity.competitorName} - ${activity.activityType}`
  );
}

// ============================================================================
// ALGORITHM EVENTS
// ============================================================================

/**
 * Emit algorithm update detected
 */
export function emitAlgorithmUpdate(update: AlgorithmUpdateData) {
  websocketManager.broadcast(SEARCH_DOMINANCE_TOPICS.ALGORITHM_DETECTED, {
    type: 'algorithm_detected',
    update: {
      name: update.name,
      type: update.type,
      volatility: update.volatility,
      impactScore: update.impactScore,
      rankingChanges: update.rankingChanges,
      trafficImpact: update.trafficImpact,
      status: update.status,
      detectedAt: update.detectedAt.toISOString(),
    },
    timestamp: new Date().toISOString(),
  });

  console.log(
    `[WebSocket] Algorithm update emitted: ${update.name} (impact: ${update.impactScore})`
  );
}

// ============================================================================
// DOMINANCE SCORE EVENTS
// ============================================================================

/**
 * Emit dominance score update
 */
export function emitDominanceUpdate(metrics: DominanceMetricsData) {
  websocketManager.broadcast(SEARCH_DOMINANCE_TOPICS.DOMINANCE_UPDATE, {
    type: 'dominance_updated',
    score: metrics.dominanceScore,
    breakdown: {
      position1Count: metrics.position1Count,
      position1to3Count: metrics.position1to3Count,
      position1to10Count: metrics.position1to10Count,
      aiOverviewRate: metrics.aiOverviewRate,
      totalCoverage: metrics.totalCoverage,
      competitiveThreat: metrics.competitiveThreat,
    },
    timestamp: new Date().toISOString(),
  });

  console.log(
    `[WebSocket] Dominance score emitted: ${metrics.dominanceScore}`
  );
}

// ============================================================================
// JOB PROGRESS EVENTS
// ============================================================================

/**
 * Emit job progress update
 */
export function emitJobProgress(
  jobName: string,
  progress: JobProgress
) {
  websocketManager.broadcast(SEARCH_DOMINANCE_TOPICS.JOB_PROGRESS, {
    type: 'job_progress',
    jobName,
    current: progress.current,
    total: progress.total,
    status: progress.status,
    percentage: progress.percentage,
    timestamp: new Date().toISOString(),
  });
}

/**
 * Emit job completion
 */
export function emitJobComplete(
  jobName: string,
  result: JobResult
) {
  websocketManager.broadcast(SEARCH_DOMINANCE_TOPICS.JOB_COMPLETE, {
    type: 'job_complete',
    jobName,
    success: result.success,
    recordsProcessed: result.recordsProcessed,
    recordsCreated: result.recordsCreated,
    errors: result.errors,
    warnings: result.warnings,
    duration: result.duration,
    completedAt: result.completedAt.toISOString(),
    timestamp: new Date().toISOString(),
  });

  console.log(
    `[WebSocket] Job complete emitted: ${jobName} (${result.success ? 'success' : 'failed'})`
  );
}

// ============================================================================
// UTILITY FUNCTIONS
// ============================================================================

/**
 * Emit multiple events in batch (for efficiency)
 */
export function emitBatch(events: Array<{ topic: string; data: any }>) {
  for (const event of events) {
    websocketManager.broadcast(event.topic, {
      ...event.data,
      timestamp: new Date().toISOString(),
    });
  }

  console.log(`[WebSocket] Batch emitted: ${events.length} events`);
}

/**
 * Check if WebSocket manager is ready
 */
export function isWebSocketReady(): boolean {
  try {
    // Check if websocketManager is available and initialized
    return websocketManager !== undefined;
  } catch {
    return false;
  }
}

/**
 * Get connection count (for monitoring)
 */
export async function getConnectionCount(): Promise<number> {
  try {
    // This would need to be implemented in the WebSocket manager
    // For now, return 0
    return 0;
  } catch {
    return 0;
  }
}
