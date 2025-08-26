// Marketing Analytics & Campaign Management Types

export interface MarketingAnalytics {
  id: string;
  contractorId?: string; // If null, shows global/admin analytics
  period: AnalyticsPeriod;
  websiteAnalytics: WebsiteAnalytics;
  advertisingCampaigns: AdvertisingCampaign[];
  socialMediaInsights: SocialMediaInsights;
  leadAttribution: LeadAttributionData;
  campaignPerformance: CampaignPerformance;
  territoryAnalytics: TerritoryAnalytics[];
  costAnalysis: CostAnalysis;
  recommendations: MarketingRecommendation[];
}

export interface AnalyticsPeriod {
  start: Date;
  end: Date;
  type: 'day' | 'week' | 'month' | 'quarter' | 'year' | 'custom';
  comparison?: {
    start: Date;
    end: Date;
    type: string;
  };
}

// Website Analytics
export interface WebsiteAnalytics {
  googleAnalytics: GoogleAnalyticsData;
  tagManager: TagManagerData;
  visitorFlow: VisitorFlowData;
  territoryMetrics: TerritoryMetrics[];
  conversionFunnels: ConversionFunnel[];
  heatmaps: HeatmapData[];
}

export interface GoogleAnalyticsData {
  propertyId: string;
  sessions: number;
  users: number;
  newUsers: number;
  pageviews: number;
  avgSessionDuration: number;
  bounceRate: number;
  conversionRate: number;
  goals: GoalData[];
  trafficSources: TrafficSource[];
  deviceBreakdown: DeviceBreakdown;
  geographicData: GeographicData[];
  topPages: PageData[];
  trends: AnalyticsTrend[];
}

export interface TagManagerData {
  containerId: string;
  tags: TagData[];
  triggers: TriggerData[];
  variables: VariableData[];
  events: EventData[];
  conversions: ConversionEvent[];
}

export interface VisitorFlowData {
  landingPages: PageFlow[];
  exitPages: PageFlow[];
  conversionPaths: ConversionPath[];
  dropoffPoints: DropoffPoint[];
}

export interface TerritoryMetrics {
  territory: string;
  sessions: number;
  leads: number;
  conversions: number;
  conversionRate: number;
  averageOrderValue: number;
  revenue: number;
}

export interface ConversionFunnel {
  id: string;
  name: string;
  steps: FunnelStep[];
  conversionRate: number;
  dropoffRate: number;
  totalConversions: number;
  revenue: number;
}

export interface FunnelStep {
  name: string;
  url: string;
  visits: number;
  exits: number;
  conversionRate: number;
  avgTimeOnStep: number;
}

export interface HeatmapData {
  pageUrl: string;
  clickMaps: ClickData[];
  scrollMaps: ScrollData[];
  attentionMaps: AttentionData[];
  formAnalytics: FormAnalytics;
}

// Advertising Campaigns
export interface AdvertisingCampaign {
  id: string;
  name: string;
  platform: AdPlatform;
  type: CampaignType;
  status: CampaignStatus;
  budget: CampaignBudget;
  targeting: CampaignTargeting;
  creative: CampaignCreative[];
  performance: CampaignPerformanceMetrics;
  attribution: LeadAttribution[];
  territories: string[];
  contractors: ContractorAllocation[];
  schedule: CampaignSchedule;
  optimization: OptimizationSettings;
}

export type AdPlatform = 
  | 'google_ads'
  | 'facebook'
  | 'linkedin'
  | 'instagram'
  | 'youtube'
  | 'display_network'
  | 'programmatic'
  | 'offline'
  | 'other';

export type CampaignType = 
  | 'search'
  | 'display'
  | 'video'
  | 'shopping'
  | 'social'
  | 'remarketing'
  | 'awareness'
  | 'conversion'
  | 'lead_generation';

export type CampaignStatus = 
  | 'draft'
  | 'scheduled'
  | 'active'
  | 'paused'
  | 'completed'
  | 'cancelled';

export interface CampaignBudget {
  total: number;
  daily: number;
  spent: number;
  remaining: number;
  currency: string;
  bidStrategy: string;
  costModel: 'CPC' | 'CPM' | 'CPA' | 'ROAS';
}

export interface CampaignTargeting {
  geographic: GeographicTargeting;
  demographic: DemographicTargeting;
  interests: string[];
  behaviors: string[];
  keywords: KeywordTargeting[];
  audiences: AudienceTargeting[];
  placements: string[];
  schedule: TimeTargeting;
}

export interface CampaignCreative {
  id: string;
  type: 'image' | 'video' | 'text' | 'carousel' | 'collection';
  assets: CreativeAsset[];
  headlines: string[];
  descriptions: string[];
  callToActions: string[];
  landingPages: string[];
  performance: CreativePerformance;
}

export interface CampaignPerformanceMetrics {
  impressions: number;
  clicks: number;
  ctr: number; // Click-through rate
  cpc: number; // Cost per click
  cpm: number; // Cost per thousand impressions
  cpa: number; // Cost per acquisition
  conversions: number;
  conversionRate: number;
  revenue: number;
  roas: number; // Return on ad spend
  qualityScore?: number;
  adRank?: number;
  frequency?: number;
  reach?: number;
}

export interface ContractorAllocation {
  contractorId: string;
  contractorName: string;
  tier: 'bronze' | 'silver' | 'gold' | 'platinum';
  allocation: number; // Percentage of campaign budget
  territories: string[];
  leads: number;
  conversions: number;
  revenue: number;
  costShare: number;
}

// Social Media
export interface SocialMediaInsights {
  platforms: SocialPlatformData[];
  aggregatedMetrics: SocialAggregatedMetrics;
  contentPerformance: ContentPerformance[];
  scheduledPosts: ScheduledPost[];
  influencerCampaigns: InfluencerCampaign[];
}

export interface SocialPlatformData {
  platform: 'facebook' | 'instagram' | 'linkedin' | 'twitter' | 'youtube' | 'tiktok';
  accountId: string;
  accountName: string;
  followers: number;
  engagement: EngagementMetrics;
  content: SocialContent[];
  ads: SocialAdData[];
  insights: PlatformInsights;
}

export interface EngagementMetrics {
  likes: number;
  comments: number;
  shares: number;
  saves: number;
  clicks: number;
  impressions: number;
  reach: number;
  engagementRate: number;
  clickThroughRate: number;
}

export interface SocialContent {
  id: string;
  type: 'post' | 'story' | 'reel' | 'video' | 'carousel';
  content: string;
  media: MediaAsset[];
  publishedDate: Date;
  performance: EngagementMetrics;
  hashtags: string[];
  mentions: string[];
  location?: string;
  audience: AudienceData;
}

export interface ScheduledPost {
  id: string;
  platforms: string[];
  content: string;
  media: MediaAsset[];
  scheduledDate: Date;
  status: 'scheduled' | 'published' | 'failed' | 'cancelled';
  campaign?: string;
  targetAudience?: string;
}

export interface InfluencerCampaign {
  id: string;
  name: string;
  influencer: InfluencerData;
  deliverables: Deliverable[];
  budget: number;
  performance: InfluencerPerformance;
  status: CampaignStatus;
}

// Lead Attribution
export interface LeadAttributionData {
  totalLeads: number;
  attributionModel: AttributionModel;
  sources: LeadSource[];
  touchpoints: TouchpointData[];
  conversionPaths: AttributionPath[];
  firstClick: AttributionMetrics;
  lastClick: AttributionMetrics;
  linear: AttributionMetrics;
  timeDecay: AttributionMetrics;
  positionBased: AttributionMetrics;
}

export type AttributionModel = 
  | 'first_click'
  | 'last_click'
  | 'linear'
  | 'time_decay'
  | 'position_based'
  | 'custom';

export interface LeadSource {
  source: string;
  medium: string;
  campaign?: string;
  leads: number;
  conversions: number;
  revenue: number;
  cost: number;
  costPerLead: number;
  roi: number;
  attribution: AttributionWeights;
}

export interface LeadAttribution {
  leadId: string;
  contractorId: string;
  source: string;
  medium: string;
  campaign?: string;
  touchpoints: Touchpoint[];
  firstTouch: Date;
  lastTouch: Date;
  conversionDate?: Date;
  revenue?: number;
  cost: number;
  trackingCode?: string;
}

export interface Touchpoint {
  timestamp: Date;
  source: string;
  medium: string;
  campaign?: string;
  page: string;
  action: string;
  value?: number;
  attribution: number; // Attribution weight (0-1)
}

export interface AttributionPath {
  path: string[];
  frequency: number;
  conversions: number;
  revenue: number;
  averageTimeToConversion: number;
}

// Campaign Management
export interface CampaignManagement {
  campaigns: ManagedCampaign[];
  templates: CampaignTemplate[];
  budgetPools: BudgetPool[];
  approvalWorkflow: ApprovalWorkflow[];
  performance: CampaignPortfolioMetrics;
}

export interface ManagedCampaign {
  id: string;
  name: string;
  description: string;
  type: CampaignType;
  status: CampaignStatus;
  manager: string;
  client: string; // Contractor or internal
  budget: CampaignBudget;
  timeline: CampaignTimeline;
  assets: CampaignAsset[];
  approval: ApprovalStatus;
  performance: CampaignPerformanceMetrics;
  reports: CampaignReport[];
}

export interface CampaignTemplate {
  id: string;
  name: string;
  type: CampaignType;
  platform: AdPlatform;
  targeting: CampaignTargeting;
  creative: CreativeTemplate[];
  budget: BudgetTemplate;
  settings: CampaignSettings;
}

export interface BudgetPool {
  id: string;
  name: string;
  totalBudget: number;
  allocatedBudget: number;
  availableBudget: number;
  campaigns: string[];
  contractors: BudgetAllocation[];
  period: AnalyticsPeriod;
  restrictions: BudgetRestriction[];
}

export interface BudgetAllocation {
  contractorId: string;
  contractorName: string;
  allocation: number;
  spent: number;
  performance: AllocationPerformance;
}

// Territory Analytics
export interface TerritoryAnalytics {
  territory: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  demographics: TerritoryDemographics;
  competition: CompetitionData;
  marketPotential: MarketPotential;
  performance: TerritoryPerformance;
  heatmap: HeatmapMetrics;
  recommendations: TerritoryRecommendation[];
}

export interface TerritoryPerformance {
  leads: number;
  conversions: number;
  revenue: number;
  marketShare: number;
  growthRate: number;
  seasonality: SeasonalityData[];
  contractors: TerritoryContractor[];
}

export interface TerritoryContractor {
  contractorId: string;
  name: string;
  tier: string;
  marketShare: number;
  leads: number;
  conversions: number;
  revenue: number;
  rating: number;
}

export interface HeatmapMetrics {
  spend: number;
  conversions: number;
  efficiency: number; // Conversions per dollar spent
  density: number; // Activity level
  competition: number;
  opportunity: number;
}

// Cost Analysis
export interface CostAnalysis {
  totalSpend: number;
  costBreakdown: CostBreakdown;
  efficiency: EfficiencyMetrics;
  budgetUtilization: BudgetUtilization;
  forecasting: SpendForecast;
  benchmarking: BenchmarkData;
}

export interface CostBreakdown {
  platforms: PlatformCost[];
  campaigns: CampaignCost[];
  territories: TerritoryCost[];
  contractors: ContractorCost[];
  timeframes: TimeCost[];
}

export interface EfficiencyMetrics {
  costPerLead: number;
  costPerConversion: number;
  returnOnAdSpend: number;
  lifetimeValue: number;
  paybackPeriod: number;
  marginAnalysis: MarginAnalysis;
}

// Recommendations
export interface MarketingRecommendation {
  id: string;
  type: RecommendationType;
  priority: 'low' | 'medium' | 'high' | 'critical';
  title: string;
  description: string;
  impact: ImpactEstimate;
  effort: EffortEstimate;
  timeline: string;
  category: RecommendationCategory;
  data: RecommendationData;
  status: 'pending' | 'reviewing' | 'approved' | 'implemented' | 'rejected';
}

export type RecommendationType = 
  | 'budget_optimization'
  | 'targeting_refinement'
  | 'creative_refresh'
  | 'platform_expansion'
  | 'geographic_expansion'
  | 'audience_development'
  | 'conversion_optimization'
  | 'attribution_improvement';

export type RecommendationCategory = 
  | 'cost_reduction'
  | 'performance_improvement'
  | 'growth_opportunity'
  | 'risk_mitigation'
  | 'compliance'
  | 'automation';

export interface ImpactEstimate {
  leadsIncrease: number;
  costReduction: number;
  revenueIncrease: number;
  efficiencyGain: number;
  confidence: number; // 0-100%
}

// Contractor Reporting
export interface ContractorReport {
  contractorId: string;
  contractorName: string;
  tier: string;
  period: AnalyticsPeriod;
  summary: ContractorSummary;
  leadGeneration: LeadGenerationReport;
  campaignPerformance: ContractorCampaignMetrics;
  costSharing: CostSharingReport;
  recommendations: ContractorRecommendation[];
  benchmarking: ContractorBenchmark;
}

export interface ContractorSummary {
  totalLeads: number;
  qualifiedLeads: number;
  conversions: number;
  revenue: number;
  marketingSpend: number;
  costShare: number;
  roi: number;
  leadQuality: number;
  responseTime: number;
}

export interface LeadGenerationReport {
  totalLeads: number;
  leadSources: LeadSourceBreakdown[];
  leadQuality: LeadQualityMetrics;
  attribution: LeadAttributionSummary;
  trends: LeadTrendData[];
  territory: TerritoryLeadData[];
}

export interface CostSharingReport {
  totalCampaignBudget: number;
  contractorShare: number;
  sharePercentage: number;
  spentAmount: number;
  remainingBudget: number;
  performance: CostSharePerformance;
  coFundingOpportunities: CoFundingOpportunity[];
}

export interface CoFundingOpportunity {
  campaignName: string;
  platform: string;
  estimatedCost: number;
  estimatedLeads: number;
  suggestedShare: number;
  potentialROI: number;
  timeline: string;
  requirements: string[];
}

export interface ContractorBenchmark {
  tier: string;
  industryAverage: BenchmarkMetrics;
  peerAverage: BenchmarkMetrics;
  contractorMetrics: BenchmarkMetrics;
  ranking: ContractorRanking;
}

export interface BenchmarkMetrics {
  costPerLead: number;
  conversionRate: number;
  averageOrderValue: number;
  customerLifetimeValue: number;
  marketingROI: number;
}

export interface ContractorRanking {
  overall: number;
  tier: number;
  region: number;
  category: number;
  totalContractors: number;
}

// Utility Types
export interface TrafficSource {
  source: string;
  medium: string;
  sessions: number;
  users: number;
  newUsers: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversions: number;
  conversionRate: number;
  revenue: number;
}

export interface GoalData {
  goalId: string;
  goalName: string;
  type: 'destination' | 'duration' | 'pages_per_session' | 'event';
  completions: number;
  conversionRate: number;
  goalValue: number;
}

export interface DeviceBreakdown {
  desktop: DeviceMetrics;
  mobile: DeviceMetrics;
  tablet: DeviceMetrics;
}

export interface DeviceMetrics {
  sessions: number;
  users: number;
  bounceRate: number;
  avgSessionDuration: number;
  conversions: number;
  conversionRate: number;
}

export interface GeographicData {
  country: string;
  region: string;
  city: string;
  sessions: number;
  users: number;
  conversions: number;
  revenue: number;
}

export interface PageData {
  pagePath: string;
  pageTitle: string;
  pageviews: number;
  uniquePageviews: number;
  avgTimeOnPage: number;
  bounceRate: number;
  exitRate: number;
  conversions: number;
}

export interface AnalyticsTrend {
  date: Date;
  sessions: number;
  users: number;
  conversions: number;
  revenue: number;
}

// Constants
export const CAMPAIGN_STATUSES = {
  draft: 'Draft',
  scheduled: 'Scheduled',
  active: 'Active',
  paused: 'Paused',
  completed: 'Completed',
  cancelled: 'Cancelled'
};

export const AD_PLATFORMS = {
  google_ads: 'Google Ads',
  facebook: 'Facebook',
  linkedin: 'LinkedIn',
  instagram: 'Instagram',
  youtube: 'YouTube',
  display_network: 'Display Network',
  programmatic: 'Programmatic',
  offline: 'Offline',
  other: 'Other'
};

export const ATTRIBUTION_MODELS = {
  first_click: 'First Click',
  last_click: 'Last Click',
  linear: 'Linear',
  time_decay: 'Time Decay',
  position_based: 'Position Based',
  custom: 'Custom'
};

export const CONTRACTOR_TIERS = {
  bronze: { name: 'Bronze', color: 'orange', priority: 1 },
  silver: { name: 'Silver', color: 'gray', priority: 2 },
  gold: { name: 'Gold', color: 'yellow', priority: 3 },
  platinum: { name: 'Platinum', color: 'purple', priority: 4 }
};

export const LEAD_SOURCES = [
  'organic_search',
  'paid_search',
  'social_media',
  'display_ads',
  'email',
  'referral',
  'direct',
  'offline',
  'other'
] as const;

export type LeadSourceType = typeof LEAD_SOURCES[number];