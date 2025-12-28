/**
 * Dashboard Type Definitions
 *
 * TypeScript types for Competitor Analysis Dashboard
 */

export interface CompetitorDashboardData {
  competitor: CompetitorWithMetrics;
  latestAnalysis: CompetitorAnalysisData | null;
  keywords: KeywordData[];
  opportunities: KeywordOpportunityData[];
  swot: SWOTData | null;
}

export interface CompetitorWithMetrics {
  id: string;
  domain: string;
  name: string;
  category: CompetitorCategory;
  priority: number;
  isActive: boolean;
  lastAnalyzedAt: Date | null;

  // Aggregated metrics
  totalKeywords: number;
  organicTraffic: number;
  domainRating: number;
  totalBacklinks: number;
}

export interface CompetitorAnalysisData {
  id: string;
  competitorId: string;
  organicTraffic: number | null;
  paidTraffic: number | null;
  totalKeywords: number | null;
  organicKeywords: number | null;
  paidKeywords: number | null;
  domainRating: number | null;
  totalBacklinks: number | null;
  referringDomains: number | null;
  pageSpeed: number | null;
  mobileScore: number | null;
  coreWebVitals: CoreWebVitals | null;
  analysisDate: Date;
}

export interface CoreWebVitals {
  lcp: number; // Largest Contentful Paint (ms)
  fid: number; // First Input Delay (ms)
  cls: number; // Cumulative Layout Shift
}

export interface KeywordData {
  id: string;
  competitorId: string;
  keyword: string;
  searchVolume: number | null;
  difficulty: number | null;
  cpc: number | null;
  position: number | null;
  previousPosition: number | null;
  url: string | null;
  intent: string | null;
  category: string | null;
  opportunityScore: number | null;
  difficultyTier: 'easy' | 'medium' | 'hard' | null;
  lastChecked: Date;
}

export interface KeywordOpportunityData {
  id: string;
  keyword: string;
  searchVolume: number;
  difficulty: number;
  cpc: number | null;
  intent: string | null;
  opportunityScore: number;
  difficultyTier: 'easy' | 'medium' | 'hard';
  competitorCount: number;
  averagePosition: number | null;
  topCompetitor: string | null;
}

export interface SWOTData {
  id: string;
  competitorId: string;
  strengths: SWOTItem[];
  weaknesses: SWOTItem[];
  opportunities: SWOTItem[];
  threats: SWOTItem[];
  summary: string | null;
  recommendations: string[] | null;
  competitiveAdvantages: string[] | null;
  generatedAt: Date;
  generatedBy: string | null;
}

export interface SWOTItem {
  title: string;
  description: string;
  impact: 'high' | 'medium' | 'low';
  category?: string;
}

export enum CompetitorCategory {
  RESTORATION_COMPANY = 'RESTORATION_COMPANY',
  INSURANCE_NETWORK = 'INSURANCE_NETWORK',
  CONTRACTOR_MARKETPLACE = 'CONTRACTOR_MARKETPLACE',
  INDUSTRY_ASSOCIATION = 'INDUSTRY_ASSOCIATION',
}

export interface DashboardOverview {
  totalCompetitors: number;
  totalKeywords: number;
  totalOpportunities: number;
  lastAnalysisDate: Date | null;
  avgDomainRating: number;
  avgOrganicTraffic: number;
}

export interface KeywordRankingHistory {
  keyword: string;
  history: Array<{
    date: Date;
    position: number;
  }>;
}

export interface CompetitorTableRow {
  id: string;
  name: string;
  domain: string;
  category: CompetitorCategory;
  priority: number;
  lastAnalyzed: Date | null;
  traffic: number;
  keywords: number;
  domainRating: number;
  isActive: boolean;
}

export type SortField = 'name' | 'category' | 'priority' | 'lastAnalyzed' | 'traffic' | 'keywords' | 'domainRating';
export type SortDirection = 'asc' | 'desc';

export interface TableSortConfig {
  field: SortField;
  direction: SortDirection;
}

export interface FilterConfig {
  category?: CompetitorCategory;
  minPriority?: number;
  maxPriority?: number;
  activeOnly?: boolean;
  searchTerm?: string;
}
