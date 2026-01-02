/**
 * Geo-Radius System - Barrel Export
 * Disaster Recovery - NRPG Platform
 *
 * Usage:
 * import { calculateContractorCoverage, PricingTier, TIER_PRICING } from '@/lib/geo';
 */

// ============================================
// Types
// ============================================
export type {
  // Core Geographic
  Coordinates,
  Suburb,
  SuburbWithDistance,
  Region,
  RegionWithCoverage,

  // Radius Calculation
  GeoRadiusInput,
  GeoRadiusResult,

  // Contractor Coverage
  ContractorCoverage,
  ContractorCoverageRequest,

  // Page Generation
  GeneratedPage,
  PageGenerationJob,
  PendingPage,

  // Map Visualisation
  CoverageMapConfig,
  MapOverlayLayers,
  PopulationHeatmapLayer,
  HeatmapColourScale,
  HeatmapLegend,
  LegendRange,
  RegionBoundaryLayer,
  RadiusCircleLayer,
  MarkerLayer,

  // Coverage Display
  CoverageBreakdown,
  RegionBreakdownItem,
  CoverageAdjustment,

  // Interactive Map
  ContractorMapState,
  MapInteractionEvent,

  // Video/Image Generation
  CoverageVisualisationAsset,
  VideoAssetConfig,
  VideoScene,
  SceneAnnotation,
  ImageAssetConfig,
  ImageAnnotation,
  BrandingConfig,

  // ABS Census
  ABSCensusData,
  PopulationGridCell,
} from './types';

// ============================================
// Enums & Constants
// ============================================
export {
  // Type unions (used as values)
  type AustralianState,
  type RadiusOption,
  type PricingTier,
  type ServiceType,

  // Pricing Configuration
  POPULATION_TIER_THRESHOLDS,
  TIER_PRICING,
  RADIUS_OPTIONS,
  TIER_DISPLAY_NAMES,
  TIER_DESCRIPTIONS,

  // Map Defaults
  DEFAULT_MAP_CONFIG,
  DEFAULT_HEATMAP_COLOURS,
  POPULATION_DENSITY_LEGEND,

  // Utility Functions from types
  calculateTierFromPopulation,
  getTierPrice,
  getPriceFromPopulation,
} from './types';

// ============================================
// Radius Calculator Functions
// ============================================
export {
  // Buffer Configuration
  BUFFERED_TIER_THRESHOLDS,

  // Core Distance
  calculateDistance,

  // Tier Calculation (with buffer)
  calculateTierWithBuffer,
  calculateTierStrict,
  isInBufferZone,

  // Suburb/Region Calculation
  findSuburbsWithinRadius,
  calculateRegionCoverage,

  // Main Coverage Calculation
  calculateContractorCoverage,

  // UI Helpers
  generateCoverageBreakdown,
  compareRadiusAdjustment,
  getBufferZoneMessage,
  getDistanceToNextTier,

  // Validation
  isValidAustralianPostcode,
  isValidRadius,
  getBoundingBox,
} from './radius-calculator';

// ============================================
// Page Generation Trigger
// ============================================
export {
  // Types
  type ContractorSignupEvent,
  type PageGenerationResult,
  type GeneratedPageManifest,
  type SitemapUpdate,
  type PageGenerationStatus,

  // Main Trigger
  triggerPageGeneration,

  // Page Processing
  processPageGeneration,

  // Sitemap
  updateSitemap,

  // Webhook Handler
  handleContractorSignupWebhook,

  // Status & Monitoring
  getPageGenerationStatus,
  cancelPageGenerationJob,
} from './page-generation-trigger';

// ============================================
// SEO/GEO Page Templates
// ============================================
export {
  // Types
  type BaseSEOPage,
  type Breadcrumb,
  type RelatedPage,
  type LandingPageTemplate,
  type PillarPageTemplate,
  type SuburbLink,
  type ServicePageTemplate,
  type CityLink,
  type RelatedService,
  type CostGuide,
  type RegionPageTemplate,
  type DisasterRisk,
  type ServiceAvailability,
  type SuburbDirectory,
  type ProcessStep,
  type FAQ,
  type Testimonial,
  type CTAButton,
  type SchemaMarkup,
  type SchemaEntity,
  type LocalBusinessSchema,
  type ServiceSchema,
  type FAQSchema,
  type BreadcrumbSchema,
  type OrganisationSchema,
  type OpenGraphData,
  type TemplateConfig,
  type PageType,
  type SEOPageTemplate,
  type LandingPageInput,
  type CityData,
  type PillarPageInput,
  type ServicePageInput,
  type RegionData,
  type RegionPageInput,

  // Constants
  DEFAULT_TEMPLATE_CONFIG,
  SERVICE_DISPLAY_NAMES,
  SERVICE_SLUGS,
  SERVICE_ICONS,
  SERVICE_CONFIG,
  MAJOR_CITIES,
  REGIONS,
  STATE_REGIONS,

  // Landing Page Generator
  generateLandingPage,
  generateAllLandingPagesForSuburb,
  generateFAQSchema,
  generateBreadcrumbSchema,

  // Pillar Page Generator
  generatePillarPage,
  generateAllPillarPagesForCity,
  getCityBySlug,
  getAllCitySlugs,

  // Service Page Generator
  generateServicePage,
  generateAllServicePages,
  getServiceContent,
  getAllServiceTypes,
  getServiceBySlug,

  // Region Page Generator
  generateRegionPage,
  generateAllRegionPages,
  getRegionById,
  getAllRegionIds,
  getStateRegion,
} from './templates';

// ============================================
// Sitemap Generation & Submission
// ============================================
export {
  // Types
  type SitemapUrl,
  type SitemapConfig,
  type SitemapIndex,
  type SitemapFile,
  type SearchEngineSubmission,
  type SubmissionResult,
  type GoogleSearchConsoleConfig,
  type BingWebmasterConfig,
  type SitemapStorageConfig,
  type SitemapStatus,

  // Sitemap Generation
  generateSitemapXml,
  generateSitemapIndexXml,
  buildSitemapUrl,

  // URL Builders
  buildLandingPageUrls,
  buildPillarPageUrls,
  buildServicePageUrls,
  buildRegionPageUrls,
  buildStaticPageUrls,

  // Configuration
  DEFAULT_SITEMAP_CONFIG,
  SITEMAP_PRIORITIES,
  CHANGE_FREQUENCIES,

  // Search Engine Submission
  submitToGoogleSearchConsole,
  submitToBingWebmaster,
  submitToSearchEngines,
  pingSearchEngines,

  // Sitemap Storage
  saveSitemapToStorage,
  loadSitemapFromStorage,
  updateSitemapWithNewPages,
  getSitemapStatus,
  cleanupOldSitemaps,
} from './sitemap';

// ============================================
// Demo & Proof of Concept
// ============================================
export {
  // Demo Runner
  runDemo,
  runAllDemos,
  formatDemoOutput,

  // Demo Scenarios
  DemoScenario,
  DEMO_SCENARIOS,

  // Demo Types
  type DemoResult,
  type DemoContractor,
  type DemoOutput,

  // Mock Data
  MOCK_SUBURBS,
  MOCK_REGIONS,
  generateMockContractor,
  generateMockSuburbs,
} from './demo';
