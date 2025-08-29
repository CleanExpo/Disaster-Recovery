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

// Missing type definitions
export interface CampaignPerformance {
  campaignId: string;
  name: string;
  impressions: number;
  clicks: number;
  conversions: number;
  cost: number;
  revenue: number;
  roi: number;
  ctr: number;
  cpc: number;
  cpa: number;
}

export interface TagData {
  id: string;
  name: string;
  type: string;
  status: 'active' | 'paused' | 'draft';
  firingRules: string[];
  parameters: Record<string, any>;
}

export interface TriggerData {
  id: string;
  name: string;
  type: string;
  conditions: TriggerCondition[];
  associatedTags: string[];
}

export interface VariableData {
  id: string;
  name: string;
  type: string;
  value: any;
  isBuiltIn: boolean;
}

export interface EventData {
  name: string;
  category: string;
  action: string;
  label?: string;
  value?: number;
  timestamp: Date;
  userId?: string;
}

export interface ConversionEvent {
  id: string;
  name: string;
  type: 'lead' | 'sale' | 'signup' | 'download' | 'contact';
  value: number;
  timestamp: Date;
  source: string;
  medium: string;
  campaign?: string;
}

export interface TriggerCondition {
  variable: string;
  operator: 'equals' | 'contains' | 'starts_with' | 'ends_with' | 'greater_than' | 'less_than';
  value: any;
}

// Additional missing interfaces
export interface PageFlow {
  page: string;
  sessions: number;
  exitRate: number;
  averageTimeOnPage: number;
  bounceRate: number;
}

export interface ConversionPath {
  path: string[];
  conversions: number;
  conversionRate: number;
  averageSteps: number;
}

export interface DropoffPoint {
  page: string;
  dropoffRate: number;
  visitors: number;
  reason: string;
}

export interface ClickData {
  element: string;
  clicks: number;
  clickRate: number;
  position: {
    x: number;
    y: number;
  };
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

// Missing interfaces for ContractorReportingDashboard
export interface ContractorReportingData {
  contractorId: string;
  period: AnalyticsPeriod;
  leadMetrics: LeadPerformanceMetrics;
  campaignResults: CampaignROI[];
  opportunities: MarketingOpportunity[];
  territoryPerformance: TerritoryPerformance[];
  overview: {
    totalLeads: number;
    qualifiedLeads: number;
    conversions: number;
    revenue: number;
    roi: number;
    costPerLead: number;
  };
}

export interface LeadPerformanceMetrics {
  totalLeads: number;
  qualifiedLeads: number;
  conversionRate: number;
  averageResponseTime: number;
  leadsBySource: Array<{
    source: LeadSourceType;
    count: number;
    conversionRate: number;
    cost: number;
  }>;
  leadsByDay: Array<{
    date: string;
    leads: number;
    conversions: number;
  }>;
  leadQualityScore: number;
}

export interface CampaignROI {
  campaignId: string;
  name: string;
  platform: keyof typeof AD_PLATFORMS;
  spent: number;
  revenue: number;
  roi: number;
  leads: number;
  conversions: number;
  costPerLead: number;
  costPerAcquisition: number;
  status: keyof typeof CAMPAIGN_STATUSES;
}

export interface MarketingOpportunity {
  id: string;
  type: 'keyword' | 'audience' | 'campaign' | 'territory' | 'seasonal';
  title: string;
  description: string;
  potentialImpact: 'low' | 'medium' | 'high' | 'very_high';
  estimatedRevenue: number;
  estimatedCost: number;
  timeframe: string;
  priority: number;
  actionRequired: string;
  dataSource: string;
}

// Additional missing interfaces for comprehensive marketing analytics

export interface CreativePerformance {
  creativeId: string;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
  cpa: number;
  performance: CampaignPerformanceMetrics;
}

export interface SocialAggregatedMetrics {
  totalFollowers: number;
  totalEngagement: number;
  totalReach: number;
  engagementRate: number;
  growthRate: number;
}

export interface ContentPerformance {
  contentId: string;
  views: number;
  shares: number;
  likes: number;
  comments: number;
  clickThroughRate: number;
  engagementRate: number;
}

export interface SocialAdData {
  adId: string;
  platform: string;
  spend: number;
  impressions: number;
  clicks: number;
  conversions: number;
  ctr: number;
  cpc: number;
}

export interface PlatformInsights {
  platform: string;
  audienceSize: number;
  engagementRate: number;
  bestPostingTimes: string[];
  topContentTypes: string[];
  demographics: AudienceData;
}

export interface MediaAsset {
  assetId: string;
  type: 'image' | 'video' | 'audio' | 'document';
  url: string;
  title: string;
  description?: string;
  performance: ContentPerformance;
}

export interface AudienceData {
  ageGroups: Record<string, number>;
  genderSplit: Record<string, number>;
  locations: Record<string, number>;
  interests: string[];
  behaviours: string[];
}

export interface InfluencerData {
  influencerId: string;
  name: string;
  platform: string;
  followers: number;
  engagementRate: number;
  averageViews: number;
  demographics: AudienceData;
}

export interface Deliverable {
  deliverableId: string;
  influencerId: string;
  type: string;
  dueDate: Date;
  status: 'pending' | 'delivered' | 'approved' | 'rejected';
  performance?: ContentPerformance;
  content?: MediaAsset;
}

export interface InfluencerPerformance {
  reachGenerated: number;
  impressionsGenerated: number;
  engagementGenerated: number;
  clicksGenerated: number;
  conversionsGenerated: number;
  roi: number;
}

export interface TouchpointData {
  touchpointId: string;
  channel: string;
  timestamp: Date;
  customerId: string;
  sessionId: string;
  value?: number;
  metadata?: Record<string, any>;
}

export interface AttributionMetrics {
  firstTouch: number;
  lastTouch: number;
  linear: number;
  timeDecay: number;
  positionBased: number;
}

export interface AttributionWeights {
  firstTouch: number;
  lastTouch: number;
  linear: number;
  timeDecay: number;
  positionBased: number;
}

export interface ApprovalWorkflow {
  workflowId: string;
  steps: string[];
  currentStep: string;
  approvers: string[];
  status: 'pending' | 'approved' | 'rejected';
  comments?: string[];
}

export interface CampaignPortfolioMetrics {
  totalCampaigns: number;
  activeCampaigns: number;
  totalSpend: number;
  totalRevenue: number;
  overallROI: number;
  averageCPC: number;
  averageCPA: number;
}

export interface CampaignTimeline {
  milestones: Array<{
    id: string;
    date: Date;
    event: string;
    status: 'completed' | 'pending' | 'overdue';
    description?: string;
  }>;
}

export interface CampaignAsset {
  assetId: string;
  campaignId: string;
  type: string;
  url: string;
  name: string;
  status: 'draft' | 'review' | 'approved' | 'active';
  performance?: ContentPerformance;
}

export interface ApprovalStatus {
  approvalId: string;
  approver: string;
  status: 'pending' | 'approved' | 'rejected';
  comments?: string;
  timestamp: Date;
}

export interface CampaignReport {
  reportId: string;
  campaignId: string;
  generatedDate: Date;
  metrics: CampaignPerformanceMetrics;
  insights: string[];
  recommendations: string[];
}

export interface CreativeTemplate {
  templateId: string;
  name: string;
  type: string;
  dimensions: string;
  elements: any[];
  previewUrl?: string;
}

export interface BudgetTemplate {
  templateId: string;
  name: string;
  allocations: Record<string, number>;
  constraints: string[];
  description?: string;
}

export interface CampaignSettings {
  settingId: string;
  campaignId: string;
  settings: Record<string, any>;
  lastUpdated: Date;
  updatedBy: string;
}

export interface BudgetRestriction {
  restrictionId: string;
  type: 'daily' | 'weekly' | 'monthly' | 'total';
  amount: number;
  remaining: number;
  threshold?: number;
}

export interface AllocationPerformance {
  channel: string;
  allocated: number;
  spent: number;
  remaining: number;
  performance: CampaignPerformanceMetrics;
  efficiency: number;
}

export interface TerritoryDemographics {
  territoryId: string;
  name: string;
  population: number;
  avgIncome: number;
  ageDistribution: Record<string, number>;
  marketSize: number;
}

export interface CompetitionData {
  competitorId: string;
  name: string;
  marketShare: number;
  strengths: string[];
  weaknesses: string[];
  adSpend?: number;
}

export interface MarketPotential {
  totalMarket: number;
  accessibleMarket: number;
  competitivePosition: string;
  growthRate: number;
  saturationLevel: number;
}

export interface TerritoryRecommendation {
  territoryId: string;
  priority: 'high' | 'medium' | 'low';
  reasoning: string[];
  expectedROI: number;
  investmentRequired: number;
}

export interface SeasonalityData {
  month: number;
  historicalPerformance: number;
  adjustmentFactor: number;
  confidence: number;
  trend: 'up' | 'down' | 'stable';
}

export interface BudgetUtilization {
  allocated: number;
  spent: number;
  remaining: number;
  utilizationRate: number;
  projectedSpend: number;
  efficiency: number;
}

export interface SpendForecast {
  period: string;
  forecastSpend: number;
  confidence: number;
  factors: string[];
  methodology: string;
}

export interface BenchmarkData {
  metric: string;
  industryAverage: number;
  topQuartile: number;
  currentValue: number;
  percentile: number;
}

export interface PlatformCost {
  platform: string;
  cpc: number;
  cpm: number;
  cpa: number;
  competitiveIndex: number;
}

export interface CampaignCost {
  campaignId: string;
  totalCost: number;
  costBreakdown: Record<string, number>;
  costPerResult: number;
}

export interface TerritoryCost {
  territoryId: string;
  costPerLead: number;
  costPerAcquisition: number;
  totalSpend: number;
  efficiency: number;
}

export interface ContractorCost {
  contractorId: string;
  acquisitionCost: number;
  maintenanceCost: number;
  totalValue: number;
  lifetimeValue: number;
}

export interface TimeCost {
  period: string;
  totalCost: number;
  costPerHour: number;
  efficiency: number;
  productivity: number;
}

export interface MarginAnalysis {
  revenue: number;
  costs: number;
  margin: number;
  marginPercentage: number;
  profitability: 'high' | 'medium' | 'low';
}

export interface EffortEstimate {
  taskId: string;
  estimatedHours: number;
  actualHours?: number;
  complexity: 'low' | 'medium' | 'high';
  skillRequired: string[];
}

export interface RecommendationData {
  recommendationId: string;
  type: string;
  description: string;
  impact: 'low' | 'medium' | 'high';
  effort: EffortEstimate;
  priority: number;
}

export interface ContractorCampaignMetrics {
  contractorId: string;
  leadsGenerated: number;
  conversions: number;
  revenue: number;
  roi: number;
  costEfficiency: number;
}

export interface ContractorRecommendation {
  contractorId: string;
  recommendations: RecommendationData[];
  priority: 'high' | 'medium' | 'low';
  potentialValue: number;
}

export interface LeadSourceBreakdown {
  source: string;
  leads: number;
  conversions: number;
  revenue: number;
  cost: number;
  roi: number;
}

export interface LeadQualityMetrics {
  source: string;
  qualityScore: number;
  conversionRate: number;
  averageValue: number;
  responseTime: number;
}

export interface LeadAttributionSummary {
  touchpoints: TouchpointData[];
  attribution: AttributionMetrics;
  revenue: number;
  conversionPath: string[];
}

export interface LeadTrendData {
  period: string;
  leads: number;
  trend: 'up' | 'down' | 'stable';
  growthRate: number;
  seasonalAdjusted: number;
}

export interface TerritoryLeadData {
  territoryId: string;
  leads: number;
  quality: number;
  conversionRate: number;
  marketPenetration: number;
}

export interface CostSharePerformance {
  partner: string;
  sharedCosts: number;
  performance: CampaignPerformanceMetrics;
  efficiency: number;
  contribution: number;
}