/**
 * Search Dominance WebSocket Topics
 *
 * Defines all real-time event topics for the Search Dominance System.
 * These topics are used by the WebSocket manager for pub/sub.
 *
 * Pattern: Follows existing WebSocket manager topic structure
 */

export const SEARCH_DOMINANCE_TOPICS = {
  // Ranking updates
  RANKINGS: 'search-dominance:rankings',
  RANKING_CHANGE: 'search-dominance:ranking-change',

  // Traffic updates
  TRAFFIC: 'search-dominance:traffic',
  TRAFFIC_ANOMALY: 'search-dominance:traffic-anomaly',

  // Alerts
  ALERTS: 'search-dominance:alerts',
  ALERT_NEW: 'search-dominance:alert-new',

  // Blue Ocean opportunities
  BLUE_OCEAN: 'search-dominance:blue-ocean',
  BLUE_OCEAN_NEW: 'search-dominance:blue-ocean-new',

  // Competitor activity
  COMPETITORS: 'search-dominance:competitors',
  COMPETITOR_ACTIVITY: 'search-dominance:competitor-activity',

  // Algorithm updates
  ALGORITHM: 'search-dominance:algorithm',
  ALGORITHM_DETECTED: 'search-dominance:algorithm-detected',

  // Dominance score
  DOMINANCE: 'search-dominance:dominance',
  DOMINANCE_UPDATE: 'search-dominance:dominance-update',

  // AI Overview citations
  AI_CITATION: 'search-dominance:ai-citation',

  // Job status
  JOB_PROGRESS: 'search-dominance:job-progress',
  JOB_COMPLETE: 'search-dominance:job-complete',
} as const;

/**
 * Type for all topic names
 */
export type SearchDominanceTopic =
  (typeof SEARCH_DOMINANCE_TOPICS)[keyof typeof SEARCH_DOMINANCE_TOPICS];

/**
 * Topic descriptions for documentation
 */
export const TOPIC_DESCRIPTIONS: Record<SearchDominanceTopic, string> = {
  [SEARCH_DOMINANCE_TOPICS.RANKINGS]: 'General ranking updates',
  [SEARCH_DOMINANCE_TOPICS.RANKING_CHANGE]: 'Significant ranking position changes',
  [SEARCH_DOMINANCE_TOPICS.TRAFFIC]: 'General traffic updates',
  [SEARCH_DOMINANCE_TOPICS.TRAFFIC_ANOMALY]: 'Traffic spikes or drops detected',
  [SEARCH_DOMINANCE_TOPICS.ALERTS]: 'General alert feed',
  [SEARCH_DOMINANCE_TOPICS.ALERT_NEW]: 'New alert created',
  [SEARCH_DOMINANCE_TOPICS.BLUE_OCEAN]: 'Blue Ocean opportunity feed',
  [SEARCH_DOMINANCE_TOPICS.BLUE_OCEAN_NEW]: 'New opportunity discovered',
  [SEARCH_DOMINANCE_TOPICS.COMPETITORS]: 'Competitor activity feed',
  [SEARCH_DOMINANCE_TOPICS.COMPETITOR_ACTIVITY]: 'New competitor activity',
  [SEARCH_DOMINANCE_TOPICS.ALGORITHM]: 'Algorithm update feed',
  [SEARCH_DOMINANCE_TOPICS.ALGORITHM_DETECTED]: 'New algorithm update detected',
  [SEARCH_DOMINANCE_TOPICS.DOMINANCE]: 'Dominance score feed',
  [SEARCH_DOMINANCE_TOPICS.DOMINANCE_UPDATE]: 'Dominance score changed',
  [SEARCH_DOMINANCE_TOPICS.AI_CITATION]: 'AI Overview citation gained/lost',
  [SEARCH_DOMINANCE_TOPICS.JOB_PROGRESS]: 'Background job progress',
  [SEARCH_DOMINANCE_TOPICS.JOB_COMPLETE]: 'Background job completed',
};

/**
 * Get all topics as array (useful for bulk operations)
 */
export function getAllTopics(): SearchDominanceTopic[] {
  return Object.values(SEARCH_DOMINANCE_TOPICS);
}

/**
 * Check if a string is a valid Search Dominance topic
 */
export function isSearchDominanceTopic(topic: string): topic is SearchDominanceTopic {
  return Object.values(SEARCH_DOMINANCE_TOPICS).includes(topic as SearchDominanceTopic);
}
