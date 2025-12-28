/**
 * SEO Module Index - NRPG Platform
 *
 * Centralizes all SEO-related exports for local search dominance:
 * - Schema Generator (structured data)
 * - Internal Linking System
 * - Google Business Profile Manager
 * - Citation Manager
 * - Backlink Tracker
 * - Local SEO Types
 */

// =============================================================================
// CORE EXPORTS
// =============================================================================

// Schema Generator
export { SchemaGenerator, schemaGenerator } from './schema-generator';

// Internal Linking
export {
  InternalLinkingSystem,
  internalLinking,
  getBreadcrumbsForPage,
  type BreadcrumbItem,
  type InternalLink,
} from './internal-linking';

// =============================================================================
// LOCAL SEO EXPORTS
// =============================================================================

// Google Business Profile Manager
export {
  GoogleBusinessProfileManager,
  gbpManager,
  GBP_CONFIG,
  PRIORITY_CITIES,
  GBP_CATEGORIES,
  DEFAULT_ATTRIBUTES,
  HOURS_24_7,
} from './gbp-manager';

// Citation Manager
export {
  LocalCitationManager,
  citationManager,
  CITATION_DIRECTORIES,
  CITATION_CONFIG,
} from './citation-manager';

// Backlink Tracker
export {
  LocalBacklinkTracker,
  backlinkTracker,
  BACKLINK_CONFIG,
  BACKLINK_PROSPECTS,
  OUTREACH_TEMPLATES,
} from './backlink-tracker';

// =============================================================================
// TYPE EXPORTS
// =============================================================================

export type {
  // Core Types
  AustralianStateCode,
  ServiceCategory,
  GBPCategory,

  // GBP Types
  GBPLocationConfig,
  GBPLocationStatus,
  GBPPost,
  GBPPostType,
  GBPReview,
  GBPAddress,
  GBPAttribute,
  GBPCallToAction,
  GBPPhoto,
  GBPPhotoConfig,
  GBPPostMedia,
  GeoCoordinates,
  OpeningHoursSpec,
  DayOfWeek,

  // Citation Types
  CitationDirectory,
  CitationSubmission,
  NAPData,
  NAPConsistencyResult,
  DirectoryCategory,

  // Backlink Types
  Backlink,
  BacklinkProspect,
  BacklinkSourceType,
  OutreachTemplate,
  BacklinkMetrics,

  // Report Types
  LocalSEOReport,
  GBPMetrics,
  CitationMetrics,
  ActionItem,

  // API Types
  LocalSEOApiResponse,
  PaginatedResponse,
  LocalSEOConfig,
} from './local-seo-types';

// =============================================================================
// CONVENIENCE FUNCTIONS
// =============================================================================

/**
 * Initialize all local SEO managers
 */
export async function initializeLocalSEO(): Promise<{
  gbpLocations: number;
  citationDirectories: number;
  backlinkProspects: number;
}> {
  // Get current stats
  const gbpResult = await gbpManager.listLocations();
  const citationStats = citationManager.getDirectoryStats();
  const backlinkStats = backlinkTracker.getProspectStats();

  return {
    gbpLocations: gbpResult.data?.length || 0,
    citationDirectories: citationStats.total,
    backlinkProspects: backlinkStats.total,
  };
}

/**
 * Generate comprehensive local SEO report
 */
export async function generateLocalSEOHealthReport(): Promise<{
  gbp: {
    totalLocations: number;
    status: 'healthy' | 'needs_attention' | 'critical';
  };
  citations: {
    totalDirectories: number;
    totalSubmissions: number;
    napConsistency: number;
    status: 'healthy' | 'needs_attention' | 'critical';
  };
  backlinks: {
    totalBacklinks: number;
    totalProspects: number;
    averageDA: number;
    status: 'healthy' | 'needs_attention' | 'critical';
  };
  overallScore: number;
  recommendations: string[];
}> {
  const gbpResult = await gbpManager.listLocations();
  const citationReport = await citationManager.generateCitationReport();
  const backlinkReport = await backlinkTracker.generateBacklinkReport();

  const gbpCount = gbpResult.data?.length || 0;
  const citationStats = citationManager.getDirectoryStats();
  const backlinkStats = backlinkTracker.getProspectStats();

  // Calculate scores
  const gbpScore = Math.min(gbpCount / 10 * 100, 100); // Target: 10 locations
  const citationScore = citationReport.consistencyScore;
  const backlinkScore = Math.min((backlinkReport.data?.metrics.totalBacklinks || 0) / 200 * 100, 100);

  const overallScore = Math.round((gbpScore + citationScore + backlinkScore) / 3);

  const recommendations: string[] = [];

  if (gbpCount < 10) {
    recommendations.push(`Add ${10 - gbpCount} more GBP locations to cover all priority cities`);
  }
  if (citationReport.pendingCitations > 20) {
    recommendations.push(`Follow up on ${citationReport.pendingCitations} pending citation submissions`);
  }
  if ((backlinkReport.data?.metrics.totalBacklinks || 0) < 50) {
    recommendations.push('Increase backlink outreach to meet 200 backlink target');
  }

  return {
    gbp: {
      totalLocations: gbpCount,
      status: gbpCount >= 10 ? 'healthy' : gbpCount >= 5 ? 'needs_attention' : 'critical',
    },
    citations: {
      totalDirectories: citationStats.total,
      totalSubmissions: citationReport.totalCitations,
      napConsistency: citationReport.consistencyScore,
      status: citationReport.consistencyScore >= 90 ? 'healthy' : citationReport.consistencyScore >= 70 ? 'needs_attention' : 'critical',
    },
    backlinks: {
      totalBacklinks: backlinkReport.data?.metrics.totalBacklinks || 0,
      totalProspects: backlinkStats.total,
      averageDA: backlinkReport.data?.metrics.averageDomainAuthority || 0,
      status: (backlinkReport.data?.metrics.totalBacklinks || 0) >= 100 ? 'healthy' : (backlinkReport.data?.metrics.totalBacklinks || 0) >= 50 ? 'needs_attention' : 'critical',
    },
    overallScore,
    recommendations,
  };
}
