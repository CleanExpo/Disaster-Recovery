/**
 * Geo-Radius System Types
 * Disaster Recovery - NRPG Platform
 *
 * Pricing Model: Radius-Based Region Aggregation
 * - Contractor enters base location
 * - System calculates radius circle (25km/50km/100km)
 * - Identifies all regions intersecting the radius
 * - Aggregates population within radius
 * - Population total determines tier pricing
 */

// ============================================
// Core Geographic Types
// ============================================

export interface Coordinates {
  latitude: number;
  longitude: number;
}

export interface Suburb {
  postcode: string;
  suburb: string;
  state: AustralianState;
  coordinates: Coordinates;
  regionId: string;
}

export interface Region {
  id: string;
  name: string;
  state: AustralianState;
  population: number;
  areaKm2: number;
  boundaryCoordinates: Coordinates[];
  suburbs: string[]; // postcodes
}

export interface SuburbWithDistance extends Suburb {
  distanceKm: number;
}

export interface RegionWithCoverage extends Region {
  coveragePercentage: number; // How much of region falls within radius
  populationWithinRadius: number; // Estimated pop within the radius
}

// ============================================
// Radius Calculation Types
// ============================================

export interface GeoRadiusInput {
  centrePostcode: string;
  centreSuburb?: string;
  radiusKm: RadiusOption;
}

export interface GeoRadiusResult {
  centre: Suburb;
  radiusKm: RadiusOption;
  regionsInRadius: RegionWithCoverage[];
  suburbsInRadius: SuburbWithDistance[];
  totalPopulationInRadius: number;
  calculatedTier: PricingTier;
  monthlyPrice: number;
}

// ============================================
// Contractor Coverage Types
// ============================================

export interface ContractorCoverage {
  contractorId: string;
  baseLocation: Suburb;
  selectedRadius: RadiusOption;
  tier: PricingTier;
  monthlyPrice: number;
  regionsServiced: RegionWithCoverage[];
  coveredSuburbs: SuburbWithDistance[];
  services: ServiceType[];
  generatedPages: GeneratedPage[];
  calculatedAt: Date;
}

export interface ContractorCoverageRequest {
  contractorId: string;
  basePostcode: string;
  baseSuburb?: string;
  selectedRadius: RadiusOption;
  services: ServiceType[];
}

// ============================================
// Page Generation Types
// ============================================

export interface GeneratedPage {
  slug: string;
  suburb: string;
  postcode: string;
  region: string;
  serviceType: ServiceType;
  generatedAt: Date;
  indexed: boolean;
  indexedAt?: Date;
}

export interface PageGenerationJob {
  contractorId: string;
  coverage: ContractorCoverage;
  pagesToGenerate: PendingPage[];
  priority: 'HIGH' | 'MEDIUM' | 'LOW';
  createdAt: Date;
}

export interface PendingPage {
  suburb: string;
  postcode: string;
  region: string;
  serviceType: ServiceType;
}

// ============================================
// Enums and Constants
// ============================================

export type AustralianState = 'NSW' | 'VIC' | 'QLD' | 'WA' | 'SA' | 'TAS' | 'ACT' | 'NT';

export type RadiusOption = 25 | 50 | 100;

export type PricingTier = 'RURAL' | 'SEMI_RURAL' | 'TIER_1' | 'TIER_2' | 'TIER_3';

export type ServiceType =
  | 'WATER_DAMAGE'
  | 'FIRE_DAMAGE'
  | 'SMOKE_DAMAGE'
  | 'MOULD_REMEDIATION'
  | 'STORM_DAMAGE'
  | 'SEWAGE_CLEANUP'
  | 'BIOHAZARD_CLEANUP';

// ============================================
// Pricing Configuration
// ============================================

/**
 * Population thresholds for tier calculation
 * Based on aggregated population within contractor's radius
 */
export const POPULATION_TIER_THRESHOLDS: Record<PricingTier, { min: number; max: number }> = {
  RURAL: { min: 0, max: 50000 },
  SEMI_RURAL: { min: 50001, max: 200000 },
  TIER_1: { min: 200001, max: 400000 },
  TIER_2: { min: 400001, max: 1000000 },
  TIER_3: { min: 1000001, max: Infinity },
};

/**
 * Monthly subscription pricing per tier (AUD)
 */
export const TIER_PRICING: Record<PricingTier, number> = {
  RURAL: 395,
  SEMI_RURAL: 595,
  TIER_1: 795,
  TIER_2: 995,
  TIER_3: 1095,
};

/**
 * Available radius options (km)
 */
export const RADIUS_OPTIONS: RadiusOption[] = [25, 50, 100];

/**
 * Tier display names for UI
 */
export const TIER_DISPLAY_NAMES: Record<PricingTier, string> = {
  RURAL: 'Rural',
  SEMI_RURAL: 'Semi-Rural',
  TIER_1: 'Tier 1 - Regional',
  TIER_2: 'Tier 2 - Metropolitan',
  TIER_3: 'Tier 3 - Major Metro',
};

/**
 * Tier descriptions for UI
 */
export const TIER_DESCRIPTIONS: Record<PricingTier, string> = {
  RURAL: 'Servicing regional and remote communities under 50,000 population',
  SEMI_RURAL: 'Servicing growing regional centres between 50,000-200,000 population',
  TIER_1: 'Servicing established regional cities between 200,000-400,000 population',
  TIER_2: 'Servicing major regional hubs and outer metro areas between 400,000-1,000,000 population',
  TIER_3: 'Servicing major metropolitan areas over 1,000,000 population',
};

// ============================================
// Utility Functions
// ============================================

/**
 * Calculate tier based on total population within radius
 */
export function calculateTierFromPopulation(population: number): PricingTier {
  if (population <= POPULATION_TIER_THRESHOLDS.RURAL.max) return 'RURAL';
  if (population <= POPULATION_TIER_THRESHOLDS.SEMI_RURAL.max) return 'SEMI_RURAL';
  if (population <= POPULATION_TIER_THRESHOLDS.TIER_1.max) return 'TIER_1';
  if (population <= POPULATION_TIER_THRESHOLDS.TIER_2.max) return 'TIER_2';
  return 'TIER_3';
}

/**
 * Get monthly price for a tier
 */
export function getTierPrice(tier: PricingTier): number {
  return TIER_PRICING[tier];
}

/**
 * Get price directly from population
 */
export function getPriceFromPopulation(population: number): number {
  const tier = calculateTierFromPopulation(population);
  return getTierPrice(tier);
}

// ============================================
// Map Visualisation Types
// ============================================

/**
 * Google Maps Integration for Contractor Coverage Visualisation
 */
export interface CoverageMapConfig {
  centreCoordinates: Coordinates;
  radiusKm: RadiusOption;
  showPopulationHeatmap: boolean;
  showRegionBoundaries: boolean;
  showRadiusCircle: boolean;
  mapStyle: 'standard' | 'satellite' | 'terrain';
}

export interface MapOverlayLayers {
  populationDensity: PopulationHeatmapLayer;
  regionBoundaries: RegionBoundaryLayer;
  radiusCircle: RadiusCircleLayer;
  contractorPin: MarkerLayer;
}

export interface PopulationHeatmapLayer {
  enabled: boolean;
  dataSource: 'ABS_2021' | 'ABS_2016';
  opacity: number; // 0-1
  colourScale: HeatmapColourScale;
  legend: HeatmapLegend;
}

export interface HeatmapColourScale {
  low: string;    // e.g., '#f7fbff' (light blue)
  medium: string; // e.g., '#6baed6' (medium blue)
  high: string;   // e.g., '#08306b' (dark blue)
}

export interface HeatmapLegend {
  title: string;
  unit: string;
  ranges: LegendRange[];
}

export interface LegendRange {
  min: number;
  max: number;
  colour: string;
  label: string;
}

export interface RegionBoundaryLayer {
  enabled: boolean;
  boundaryType: 'LGA' | 'SA4' | 'SA3';
  strokeColour: string;
  strokeWidth: number;
  fillColour: string;
  fillOpacity: number;
  showLabels: boolean;
}

export interface RadiusCircleLayer {
  enabled: boolean;
  strokeColour: string;
  strokeWidth: number;
  fillColour: string;
  fillOpacity: number;
  draggable: boolean;
  resizable: boolean;
}

export interface MarkerLayer {
  coordinates: Coordinates;
  icon: 'default' | 'contractor' | 'custom';
  customIconUrl?: string;
  draggable: boolean;
  label?: string;
}

// ============================================
// Coverage Calculation Display Types
// ============================================

export interface CoverageBreakdown {
  regions: RegionBreakdownItem[];
  totalPopulation: number;
  calculatedTier: PricingTier;
  monthlyPrice: number;
  radiusKm: RadiusOption;
}

export interface RegionBreakdownItem {
  regionName: string;
  regionId: string;
  coverageType: 'FULL' | 'PARTIAL';
  coveragePercentage: number;
  populationInRadius: number;
  totalRegionPopulation: number;
}

export interface CoverageAdjustment {
  previousRadius: RadiusOption;
  newRadius: RadiusOption;
  previousTier: PricingTier;
  newTier: PricingTier;
  previousPrice: number;
  newPrice: number;
  populationDifference: number;
  regionsAdded: string[];
  regionsRemoved: string[];
}

// ============================================
// Interactive Map State
// ============================================

export interface ContractorMapState {
  baseLocation: Suburb | null;
  selectedRadius: RadiusOption;
  coverageResult: GeoRadiusResult | null;
  breakdown: CoverageBreakdown | null;
  mapConfig: CoverageMapConfig;
  isCalculating: boolean;
  error: string | null;
}

export interface MapInteractionEvent {
  type: 'LOCATION_SELECTED' | 'RADIUS_CHANGED' | 'MAP_CLICKED' | 'MARKER_DRAGGED';
  payload: {
    coordinates?: Coordinates;
    postcode?: string;
    suburb?: string;
    radius?: RadiusOption;
  };
  timestamp: Date;
}

// ============================================
// Video/Image Generation Types (VEO 3 / Nano Banana 2 Pro)
// ============================================

export interface CoverageVisualisationAsset {
  type: 'VIDEO' | 'IMAGE';
  generator: 'VEO_3' | 'NANO_BANANA_2_PRO';
  purpose: 'CONTRACTOR_DEMO' | 'COVERAGE_SNAPSHOT' | 'TIER_EXPLANATION';
  config: VideoAssetConfig | ImageAssetConfig;
}

export interface VideoAssetConfig {
  duration: number; // seconds
  resolution: '1080p' | '4K';
  fps: 30 | 60;
  scenes: VideoScene[];
  voiceover: boolean;
  backgroundMusic: boolean;
}

export interface VideoScene {
  sceneId: string;
  description: string;
  durationSeconds: number;
  mapState: Partial<ContractorMapState>;
  annotations: SceneAnnotation[];
  transition: 'CUT' | 'FADE' | 'ZOOM';
}

export interface SceneAnnotation {
  text: string;
  position: 'TOP' | 'BOTTOM' | 'OVERLAY';
  style: 'TITLE' | 'SUBTITLE' | 'CALLOUT' | 'PRICE_TAG';
}

export interface ImageAssetConfig {
  resolution: { width: number; height: number };
  format: 'PNG' | 'JPEG' | 'WEBP';
  mapState: ContractorMapState;
  annotations: ImageAnnotation[];
  branding: BrandingConfig;
}

export interface ImageAnnotation {
  text: string;
  position: Coordinates;
  style: 'LABEL' | 'CALLOUT' | 'LEGEND';
}

export interface BrandingConfig {
  showLogo: boolean;
  logoPosition: 'TOP_LEFT' | 'TOP_RIGHT' | 'BOTTOM_LEFT' | 'BOTTOM_RIGHT';
  primaryColour: string;
  secondaryColour: string;
}

// ============================================
// ABS Census Data Types
// ============================================

export interface ABSCensusData {
  year: 2021 | 2016;
  region: string;
  regionType: 'LGA' | 'SA4' | 'SA3' | 'SA2' | 'SA1';
  population: number;
  dwellings: number;
  medianAge: number;
  areaKm2: number;
  populationDensity: number; // per km²
}

export interface PopulationGridCell {
  coordinates: Coordinates;
  population: number;
  cellSizeKm: number;
}

// ============================================
// Default Map Configuration
// ============================================

export const DEFAULT_MAP_CONFIG: CoverageMapConfig = {
  centreCoordinates: { latitude: -27.4698, longitude: 153.0251 }, // Brisbane CBD
  radiusKm: 25,
  showPopulationHeatmap: true,
  showRegionBoundaries: true,
  showRadiusCircle: true,
  mapStyle: 'standard',
};

export const DEFAULT_HEATMAP_COLOURS: HeatmapColourScale = {
  low: '#f7fbff',
  medium: '#6baed6',
  high: '#08306b',
};

export const POPULATION_DENSITY_LEGEND: HeatmapLegend = {
  title: 'Population Density',
  unit: 'people per km²',
  ranges: [
    { min: 0, max: 100, colour: '#f7fbff', label: 'Rural (<100)' },
    { min: 100, max: 500, colour: '#c6dbef', label: 'Low (100-500)' },
    { min: 500, max: 1500, colour: '#6baed6', label: 'Medium (500-1,500)' },
    { min: 1500, max: 3000, colour: '#2171b5', label: 'High (1,500-3,000)' },
    { min: 3000, max: Infinity, colour: '#08306b', label: 'Very High (3,000+)' },
  ],
};
