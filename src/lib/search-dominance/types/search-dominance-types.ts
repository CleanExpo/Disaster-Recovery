/**
 * Search Dominance System - TypeScript Types
 *
 * Shared types for ranking tracking, Blue Ocean detection,
 * algorithm monitoring, and competitive intelligence.
 */

// ============================================================================
// RANKING TYPES
// ============================================================================

export interface RankingData {
  keyword: string;
  position: number;
  previousPosition: number | null;
  url: string;
  searchVolume: number | null;
  location: string;
  device: 'desktop' | 'mobile';

  // SERP Features
  serpFeatures: SerpFeatureFlags;

  // Competitor positions
  competitorPositions: Record<string, number>;

  timestamp: Date;
}

export interface SerpFeatureFlags {
  hasFeaturedSnippet: boolean;
  hasLocalPack: boolean;
  hasAIOverview: boolean;
  isInAIOverview: boolean;
  aiOverviewPosition: number | null;
}

export interface RankingChange {
  keyword: string;
  oldPosition: number;
  newPosition: number;
  change: number;
  url: string;
  severity: 'critical' | 'warning' | 'info';
}

// ============================================================================
// TRAFFIC TYPES
// ============================================================================

export interface TrafficData {
  organicSessions: number;
  impressions: number;
  clicks: number;
  ctr: number;
  conversions: number;
  conversionRate: number;
  location: string | null;
  landingPage: string | null;
  device: string | null;
  source: 'google-search-console' | 'ga4' | 'combined';
  timestamp: Date;
}

export interface TrafficAnomaly {
  metric: 'sessions' | 'impressions' | 'clicks' | 'conversions';
  current: number;
  previous: number;
  changePercent: number;
  severity: 'spike' | 'drop' | 'normal';
  timestamp: Date;
}

// ============================================================================
// COMPETITOR TYPES
// ============================================================================

export interface CompetitorSnapshotData {
  competitorId: string;
  competitorName: string;
  organicKeywords: number;
  organicTraffic: number;
  domainAuthority: number | null;
  backlinks: number | null;
  rankingKeywords: number;
  topTenKeywords: number;
  publishedContent: number;
  contentVelocity: number;
  newContent: string[];
  majorUpdate: boolean;
  timestamp: Date;
}

export interface CompetitorActivity {
  competitorId: string;
  competitorName: string;
  activityType: 'new_content' | 'ranking_change' | 'major_update' | 'backlink_gain';
  details: string;
  timestamp: Date;
  threatLevel: 'LOW' | 'MEDIUM' | 'HIGH';
}

// ============================================================================
// BLUE OCEAN TYPES
// ============================================================================

export interface BlueOceanOpportunityData {
  keyword: string | null;
  topic: string | null;
  category: BlueOceanCategory;
  searchVolume: number;
  growthRate: number;
  competitionGap: number;
  opportunityScore: number;
  currentRank: number | null;
  competitorCount: number;
  contentGap: string | null;
  userIntent: 'informational' | 'commercial' | 'transactional' | null;
  relatedKeywords: string[];
  detectedAt: Date;
}

export type BlueOceanCategory =
  | 'adjacent_problem'
  | 'question_mining'
  | 'emerging_trend'
  | 'underserved_segment'
  | 'format_gap'
  | 'language_gap';

export interface OpportunityScoring {
  volume: number;
  growth: number;
  gap: number;
  competition: number;
  finalScore: number; // 0-100
}

// ============================================================================
// ALGORITHM UPDATE TYPES
// ============================================================================

export interface AlgorithmUpdateData {
  name: string;
  type: AlgorithmUpdateType;
  volatility: number; // 0-10
  impactScore: number; // 0-100
  rankingChanges: number;
  trafficImpact: number; // percentage
  affectedKeywords: string[];
  recommendations: AlgorithmRecommendation[];
  actionsRequired: AlgorithmAction[];
  detectedAt: Date;
  startDate: Date | null;
  endDate: Date | null;
  status: 'MONITORING' | 'ANALYZING' | 'RESPONDING' | 'COMPLETED';
}

export type AlgorithmUpdateType =
  | 'core'
  | 'helpful_content'
  | 'spam'
  | 'local'
  | 'ai_overview'
  | 'link'
  | 'other';

export interface AlgorithmRecommendation {
  title: string;
  description: string;
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  estimatedImpact: string;
}

export interface AlgorithmAction {
  action: string;
  assignee: string | null;
  dueDate: Date | null;
  completed: boolean;
  completedAt: Date | null;
}

// ============================================================================
// DOMINANCE METRICS TYPES
// ============================================================================

export interface DominanceMetricsData {
  dominanceScore: number; // 0-100
  position1Count: number;
  position1to3Count: number;
  position1to10Count: number;
  totalKeywords: number;
  aiOverviewCitations: number;
  aiOverviewRate: number;
  dailySessions: number;
  dailyImpressions: number;
  dailyConversions: number;
  activeLocations: number;
  totalCoverage: number;
  competitorsTracked: number;
  competitiveThreat: 'LOW' | 'MEDIUM' | 'HIGH';
  date: Date;
}

export interface DominanceScoreBreakdown {
  rankingScore: number; // 40% weight
  trafficScore: number; // 30% weight
  aiCitationScore: number; // 20% weight
  competitiveScore: number; // 10% weight
  totalScore: number; // 0-100
}

// ============================================================================
// ALERT TYPES
// ============================================================================

export interface SearchAlertData {
  type: AlertType;
  severity: 'INFO' | 'WARNING' | 'CRITICAL';
  title: string;
  message: string;
  keyword: string | null;
  competitor: string | null;
  metric: string | null;
  oldValue: string | null;
  newValue: string | null;
  actionRequired: boolean;
  actionUrl: string | null;
  createdAt: Date;
}

export type AlertType =
  | 'rank_drop'
  | 'rank_gain'
  | 'competitor_movement'
  | 'opportunity_detected'
  | 'algorithm_update'
  | 'traffic_spike'
  | 'traffic_drop'
  | 'ai_citation_gained'
  | 'ai_citation_lost';

// ============================================================================
// JOB TYPES
// ============================================================================

export interface JobProgress {
  current: number;
  total: number;
  status: string;
  percentage: number;
}

export interface JobResult {
  success: boolean;
  recordsProcessed: number;
  recordsCreated: number;
  errors: string[];
  warnings: string[];
  duration: number; // milliseconds
  completedAt: Date;
}

// ============================================================================
// GOOGLE API TYPES
// ============================================================================

export interface GSCSearchAnalyticsRow {
  keys: string[]; // [query, page, country, device]
  clicks: number;
  impressions: number;
  ctr: number;
  position: number;
}

export interface GA4ReportRow {
  dimensionValues: Array<{ value: string }>;
  metricValues: Array<{ value: string }>;
}

// ============================================================================
// EXTERNAL API RESPONSE TYPES
// ============================================================================

export interface SEMrushVolatilityResponse {
  volatilityScore: number; // 0-10
  date: string;
  database: string; // 'au' for Australia
}

export interface DataForSEOSerpResult {
  keyword: string;
  location: string;
  device: string;
  items: Array<{
    type: string;
    rank_group: number;
    rank_absolute: number;
    domain: string;
    url: string;
    title: string;
  }>;
  ai_overview?: {
    type: string;
    sources: Array<{
      domain: string;
      url: string;
      title: string;
    }>;
  };
}
