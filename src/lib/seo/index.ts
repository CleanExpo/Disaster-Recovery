/**
 * SEO Library - Link Building & Digital PR Infrastructure
 *
 * Comprehensive SEO toolkit for link building, digital PR campaigns,
 * guest posting, partnership management, and backlink monitoring.
 *
 * @module SEO
 * @category Infrastructure
 */

// ============================================================================
// PR Campaign Management
// ============================================================================
export {
  prCampaignManager,
  PRCampaignManager,
  CAMPAIGN_TEMPLATES,
  CampaignStatus,
  CampaignType,
  type PRCampaign,
  type MediaContact,
  type PressRelease,
  type MediaPitch,
  type CampaignTemplate
} from './pr-campaign-manager';

// ============================================================================
// Guest Posting Service
// ============================================================================
export {
  guestPostingService,
  GuestPostingService,
  AUSTRALIAN_PUBLICATIONS,
  PITCH_TEMPLATES,
  PublicationTier,
  PublicationStatus,
  GuestPostStatus,
  type Publication,
  type GuestPostPitch,
  type GuestPost,
  type PitchTemplate
} from './guest-posting-service';

// ============================================================================
// Partnership Management
// ============================================================================
export {
  partnershipManager,
  PartnershipManager,
  STRATEGIC_PARTNERS,
  PROPOSAL_TEMPLATES,
  PartnershipType,
  PartnershipStatus,
  PartnershipTier,
  type Partner,
  type PartnershipProposal,
  type ProposalTemplate
} from './partnership-manager';

// ============================================================================
// Backlink Tracking
// ============================================================================
export {
  backlinkTracker,
  BacklinkTracker,
  BacklinkStatus,
  BacklinkType,
  type Backlink,
  type BacklinkSource,
  type BacklinkMetrics
} from './backlink-tracker';

// ============================================================================
// Citation Management
// ============================================================================
export {
  citationManager,
  CitationManager,
  CitationPlatform,
  CitationStatus,
  type Citation,
  type CitationPlatform as CitationPlatformType,
  type CitationVerification
} from './citation-manager';

// ============================================================================
// Google Business Profile Management
// ============================================================================
export {
  gbpManager,
  GBPManager,
  PostType,
  ReviewStatus,
  type BusinessProfile,
  type GBPPost,
  type Review,
  type GBPInsights
} from './gbp-manager';

// ============================================================================
// Schema.org Generator
// ============================================================================
export {
  schemaGenerator,
  SchemaGenerator,
  type LocalBusinessSchema,
  type ServiceSchema,
  type ReviewSchema,
  type FAQSchema,
  type BreadcrumbSchema,
  type OrganizationSchema
} from './schema-generator';

// ============================================================================
// Internal Linking Strategy
// ============================================================================
export {
  internalLinkingService,
  InternalLinkingService,
  type InternalLink,
  type LinkOpportunity,
  type AnchorTextVariation
} from './internal-linking';

// ============================================================================
// Local SEO Types
// ============================================================================
export type {
  LocalSEOConfig,
  NAP,
  ServiceArea,
  BusinessHours,
  LocalKeyword,
  CompetitorAnalysis,
  LocalRanking,
  CitationData,
  ReviewData,
  LocalSEOScore
} from './local-seo-types';

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Generate comprehensive SEO report for link building campaigns
 */
export async function generateLinkBuildingReport(): Promise<{
  prCampaigns: {
    total: number;
    active: number;
    completed: number;
    totalBacklinks: number;
    totalReach: number;
  };
  guestPosts: {
    total: number;
    published: number;
    pending: number;
    totalBacklinks: number;
    avgDomainAuthority: number;
  };
  partnerships: {
    total: number;
    active: number;
    totalBacklinks: number;
    totalReferrals: number;
    totalRevenue: number;
  };
  backlinks: {
    total: number;
    doFollow: number;
    referringDomains: number;
    avgDomainAuthority: number;
  };
}> {
  const { prCampaignManager } = await import('./pr-campaign-manager');
  const { guestPostingService } = await import('./guest-posting-service');
  const { partnershipManager } = await import('./partnership-manager');

  const campaigns = prCampaignManager.getAllCampaigns();
  const posts = guestPostingService.getAllPosts();
  const publishingStats = guestPostingService.getPublishingStatistics();
  const partnershipAnalytics = partnershipManager.getPartnershipAnalytics();

  return {
    prCampaigns: {
      total: campaigns.length,
      active: campaigns.filter(c => c.status === 'outreach' || c.status === 'published').length,
      completed: campaigns.filter(c => c.status === 'completed').length,
      totalBacklinks: campaigns.reduce((sum, c) => sum + (c.results?.backlinksEarned || 0), 0),
      totalReach: campaigns.reduce((sum, c) => sum + (c.results?.totalReach || 0), 0)
    },
    guestPosts: {
      total: posts.length,
      published: publishingStats.byStatus.published || 0,
      pending: posts.filter(p => p.status === 'in_progress' || p.status === 'submitted').length,
      totalBacklinks: publishingStats.totalBacklinks,
      avgDomainAuthority: publishingStats.avgDomainAuthority
    },
    partnerships: {
      total: partnershipAnalytics.total,
      active: partnershipAnalytics.byStatus.active || 0,
      totalBacklinks: partnershipAnalytics.activeValue.totalBacklinks,
      totalReferrals: partnershipAnalytics.activeValue.totalReferrals,
      totalRevenue: partnershipAnalytics.activeValue.totalRevenue
    },
    backlinks: {
      total: 0, // Would be calculated from backlink tracker
      doFollow: 0,
      referringDomains: 0,
      avgDomainAuthority: 0
    }
  };
}

/**
 * Generate monthly link building goals based on current performance
 */
export function generateMonthlyLinkBuildingGoals(currentMetrics: {
  backlinks: number;
  domainAuthority: number;
  referringDomains: number;
}): {
  targetBacklinks: number;
  targetDA: number;
  targetReferringDomains: number;
  guestPosts: number;
  prCampaigns: number;
  partnerships: number;
} {
  const growthRate = 0.15; // 15% monthly growth target

  return {
    targetBacklinks: Math.ceil(currentMetrics.backlinks * (1 + growthRate)),
    targetDA: Math.min(100, currentMetrics.domainAuthority + 2),
    targetReferringDomains: Math.ceil(currentMetrics.referringDomains * (1 + growthRate)),
    guestPosts: 5, // 5 guest posts per month
    prCampaigns: 1, // 1 major PR campaign per month
    partnerships: 2 // 2 new partnerships per month
  };
}

/**
 * Calculate estimated link building budget
 */
export function calculateLinkBuildingBudget(goals: {
  guestPosts: number;
  prCampaigns: number;
  partnerships: number;
}): {
  guestPostingCost: number;
  prCampaignCost: number;
  partnershipCost: number;
  toolsCost: number;
  totalMonthly: number;
} {
  return {
    guestPostingCost: goals.guestPosts * 500, // $500 per guest post (writing + outreach)
    prCampaignCost: goals.prCampaigns * 5000, // $5000 per PR campaign
    partnershipCost: goals.partnerships * 1000, // $1000 per partnership setup
    toolsCost: 500, // Monthly tools (Ahrefs, BuzzStream, etc.)
    totalMonthly: (goals.guestPosts * 500) + (goals.prCampaigns * 5000) + (goals.partnerships * 1000) + 500
  };
}

/**
 * Priority ranking for link building opportunities
 */
export function rankLinkBuildingOpportunities(opportunities: Array<{
  type: 'guest_post' | 'pr_campaign' | 'partnership';
  domainAuthority: number;
  estimatedEffort: number; // hours
  estimatedBacklinks: number;
}>): Array<{
  opportunity: typeof opportunities[number];
  score: number;
  priority: 'high' | 'medium' | 'low';
}> {
  return opportunities
    .map(opp => {
      // Calculate score: (DA * backlinks) / effort
      const score = (opp.domainAuthority * opp.estimatedBacklinks) / opp.estimatedEffort;

      let priority: 'high' | 'medium' | 'low';
      if (score >= 50) priority = 'high';
      else if (score >= 25) priority = 'medium';
      else priority = 'low';

      return { opportunity: opp, score, priority };
    })
    .sort((a, b) => b.score - a.score);
}
