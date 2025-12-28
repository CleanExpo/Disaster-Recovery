/**
 * TypeScript Types for Competitor Analysis System
 */

// ============================================================================
// SEMRUSH API Types
// ============================================================================

export interface SemrushDomainOverview {
  domain: string;
  organicTraffic: number;
  paidTraffic: number;
  organicKeywords: number;
  paidKeywords: number;
  organicCost: number;
  paidCost: number;
  adKeywords: number;
}

export interface SemrushKeyword {
  keyword: string;
  position: number;
  previousPosition?: number;
  searchVolume: number;
  cpc: number;
  url: string;
  traffic: number;
  trafficPercent: number;
  competitionLevel: number;
  numberOfResults: number;
  trends: number[];
  timestamp: number;
}

export interface SemrushBacklink {
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  linkType: 'dofollow' | 'nofollow';
  firstSeen: string;
  lastSeen: string;
  domainAscore: number;
  pageAscore: number;
}

export interface SemrushCompetitor {
  domain: string;
  competitionLevel: number;
  commonKeywords: number;
  organicKeywords: number;
  organicTraffic: number;
  organicCost: number;
}

// ============================================================================
// DataForSEO API Types
// ============================================================================

export interface DataForSeoTask {
  id: string;
  status: 'pending' | 'in_progress' | 'completed' | 'failed';
  statusCode: number;
  statusMessage: string;
  cost: number;
  resultCount: number;
  path: string[];
  data: any;
  result?: any[];
}

export interface DataForSeoSerpResult {
  keyword: string;
  location: string;
  language: string;
  items: DataForSeoSerpItem[];
  totalResults: number;
}

export interface DataForSeoSerpItem {
  position: number;
  url: string;
  domain: string;
  title: string;
  description: string;
  breadcrumb?: string;
  rating?: {
    value: number;
    votesCount: number;
  };
}

export interface DataForSeoOnPage {
  url: string;
  domainRank: number;
  pageRank: number;
  backlinksCount: number;
  internalLinksCount: number;
  externalLinksCount: number;
  brokenLinksCount: number;
  brokenResourcesCount: number;
  title: string;
  description: string;
  h1: string[];
  contentSize: number;
  wordCount: number;
  duplicateContent: boolean;
  loadTime: number;
  mobileOptimized: boolean;
}

export interface DataForSeoPageSpeed {
  url: string;
  desktopScore: number;
  mobileScore: number;
  largestContentfulPaint: number;
  firstInputDelay: number;
  cumulativeLayoutShift: number;
  firstContentfulPaint: number;
  timeToInteractive: number;
  speedIndex: number;
  totalBlockingTime: number;
}

export interface DataForSeoBacklink {
  sourceUrl: string;
  targetUrl: string;
  anchorText: string;
  linkType: 'dofollow' | 'nofollow' | 'redirect';
  firstSeen: string;
  lastSeen: string;
  domainRank: number;
  pageRank: number;
  externalLinksCount: number;
}

// ============================================================================
// Analysis Types
// ============================================================================

export interface CompetitorAnalysisData {
  competitorId: string;
  domain: string;

  // Traffic metrics
  organicTraffic: number;
  paidTraffic: number;
  totalKeywords: number;
  organicKeywords: number;
  paidKeywords: number;

  // Authority metrics
  domainRating: number;
  trustFlow?: number;
  citationFlow?: number;

  // Backlink metrics
  totalBacklinks: number;
  referringDomains: number;

  // Technical SEO
  pageSpeed: number;
  mobileScore: number;
  coreWebVitals: {
    lcp: number; // Largest Contentful Paint
    fid: number; // First Input Delay
    cls: number; // Cumulative Layout Shift
  };

  // Content metrics
  totalPages: number;
  blogPosts: number;
  servicePages: number;

  // Raw data
  analysisDate: Date;
  dataSource: 'SEMRUSH' | 'DataForSEO' | 'Combined';
  rawData?: any;
}

export interface KeywordGapAnalysis {
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number;

  // Opportunity metrics
  competitorCount: number;
  averagePosition: number;
  gapScore: number;
  difficultyTier: 'easy' | 'medium' | 'hard';

  // Classification
  category?: string;
  intent?: 'informational' | 'commercial' | 'transactional' | 'navigational';
  competitors: Array<{
    domain: string;
    position: number;
    url: string;
  }>;
}

export interface SWOTItem {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  source: string;
  metrics?: Record<string, any>;
}

export interface SWOTAnalysisResult {
  competitorId: string;
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
  summary?: string;
  recommendations?: string[];
  competitiveAdvantages?: string[];
  generatedAt: Date;
  generatedBy: 'AI' | 'Manual' | 'Hybrid';
}

export interface OpportunityScore {
  keyword: string;
  score: number; // 0-100
  factors: {
    volumeScore: number;
    difficultyScore: number;
    competitionScore: number;
    positionScore: number;
  };
  tier: 'easy' | 'medium' | 'hard';
}

// ============================================================================
// Service Configuration Types
// ============================================================================

export interface AnalysisConfig {
  maxKeywordsPerCompetitor: number;
  maxBacklinksPerCompetitor: number;
  cacheExpiryHours: number;
  retryAttempts: number;
  retryDelayMs: number;
  concurrentAnalyses: number;
}

export interface AnalysisProgress {
  competitorId: string;
  domain: string;
  stage: 'semrush' | 'dataforseo' | 'processing' | 'completed' | 'failed';
  progress: number; // 0-100
  startedAt: Date;
  estimatedCompletion?: Date;
  error?: string;
}

export interface AnalysisJob {
  id: string;
  competitorId: string;
  type: 'full' | 'refresh' | 'keywords' | 'backlinks' | 'swot';
  priority: number;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  createdAt: Date;
  startedAt?: Date;
  completedAt?: Date;
  error?: string;
  result?: any;
}

// ============================================================================
// API Response Types
// ============================================================================

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: {
    code: string;
    message: string;
    details?: any;
  };
  meta?: {
    timestamp: Date;
    requestId: string;
    cached: boolean;
    cacheAge?: number;
  };
}

export interface PaginatedResponse<T> {
  data: T[];
  pagination: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
    hasMore: boolean;
  };
}

// ============================================================================
// Cache Types
// ============================================================================

export interface CacheEntry<T> {
  key: string;
  value: T;
  expiresAt: number;
  createdAt: number;
  hits: number;
}

export interface CacheStats {
  size: number;
  hits: number;
  misses: number;
  hitRate: number;
  evictions: number;
}
