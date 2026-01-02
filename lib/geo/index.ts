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
