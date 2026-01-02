/**
 * Geo-Radius Calculator Service
 * Disaster Recovery - NRPG Platform
 *
 * Calculates coverage area, population, and pricing tier
 * based on contractor's base location and selected radius.
 *
 * BUFFER SYSTEM: 10% buffer on tier thresholds to prevent
 * edge cases where contractors are just outside a tier boundary.
 */

import {
  Coordinates,
  Suburb,
  SuburbWithDistance,
  Region,
  RegionWithCoverage,
  GeoRadiusInput,
  GeoRadiusResult,
  RadiusOption,
  PricingTier,
  CoverageBreakdown,
  RegionBreakdownItem,
  CoverageAdjustment,
  calculateTierFromPopulation,
  getTierPrice,
  RADIUS_OPTIONS,
  POPULATION_TIER_THRESHOLDS,
} from './types';

// ============================================
// Buffer Configuration
// ============================================

/**
 * 10% buffer on tier thresholds
 * Prevents edge cases where contractor is just outside tier boundary
 *
 * Example: Tier 1 max is 400,000
 * With 10% buffer: 400,000 + 40,000 = 440,000
 * Contractor with 420,000 pop stays in Tier 1 instead of bumping to Tier 2
 */
const TIER_BUFFER_PERCENTAGE = 0.1;

/**
 * Population thresholds WITH 10% buffer applied
 * Buffer is added to the MAX of each tier
 */
export const BUFFERED_TIER_THRESHOLDS: Record<
  PricingTier,
  { min: number; max: number; bufferedMax: number }
> = {
  RURAL: {
    min: POPULATION_TIER_THRESHOLDS.RURAL.min,
    max: POPULATION_TIER_THRESHOLDS.RURAL.max,
    bufferedMax: Math.round(
      POPULATION_TIER_THRESHOLDS.RURAL.max * (1 + TIER_BUFFER_PERCENTAGE)
    ),
  },
  SEMI_RURAL: {
    min: POPULATION_TIER_THRESHOLDS.SEMI_RURAL.min,
    max: POPULATION_TIER_THRESHOLDS.SEMI_RURAL.max,
    bufferedMax: Math.round(
      POPULATION_TIER_THRESHOLDS.SEMI_RURAL.max * (1 + TIER_BUFFER_PERCENTAGE)
    ),
  },
  TIER_1: {
    min: POPULATION_TIER_THRESHOLDS.TIER_1.min,
    max: POPULATION_TIER_THRESHOLDS.TIER_1.max,
    bufferedMax: Math.round(
      POPULATION_TIER_THRESHOLDS.TIER_1.max * (1 + TIER_BUFFER_PERCENTAGE)
    ),
  },
  TIER_2: {
    min: POPULATION_TIER_THRESHOLDS.TIER_2.min,
    max: POPULATION_TIER_THRESHOLDS.TIER_2.max,
    bufferedMax: Math.round(
      POPULATION_TIER_THRESHOLDS.TIER_2.max * (1 + TIER_BUFFER_PERCENTAGE)
    ),
  },
  TIER_3: {
    min: POPULATION_TIER_THRESHOLDS.TIER_3.min,
    max: POPULATION_TIER_THRESHOLDS.TIER_3.max,
    bufferedMax: Infinity, // No buffer needed for top tier
  },
};

/**
 * Buffered threshold values for reference:
 *
 * RURAL:      0 - 55,000       (was 50,000)
 * SEMI_RURAL: 50,001 - 220,000 (was 200,000)
 * TIER_1:     200,001 - 440,000 (was 400,000)
 * TIER_2:     400,001 - 1,100,000 (was 1,000,000)
 * TIER_3:     1,000,001+       (no buffer)
 */

// ============================================
// Core Distance Calculation (Haversine Formula)
// ============================================

const EARTH_RADIUS_KM = 6371;

/**
 * Convert degrees to radians
 */
function toRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

/**
 * Calculate distance between two coordinates using Haversine formula
 * Returns distance in kilometres
 */
export function calculateDistance(
  point1: Coordinates,
  point2: Coordinates
): number {
  const lat1Rad = toRadians(point1.latitude);
  const lat2Rad = toRadians(point2.latitude);
  const deltaLat = toRadians(point2.latitude - point1.latitude);
  const deltaLon = toRadians(point2.longitude - point1.longitude);

  const a =
    Math.sin(deltaLat / 2) * Math.sin(deltaLat / 2) +
    Math.cos(lat1Rad) *
      Math.cos(lat2Rad) *
      Math.sin(deltaLon / 2) *
      Math.sin(deltaLon / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return EARTH_RADIUS_KM * c;
}

// ============================================
// Buffered Tier Calculation
// ============================================

/**
 * Calculate tier WITH 10% buffer applied
 * This is the primary function used for pricing
 */
export function calculateTierWithBuffer(population: number): PricingTier {
  if (population <= BUFFERED_TIER_THRESHOLDS.RURAL.bufferedMax) return 'RURAL';
  if (population <= BUFFERED_TIER_THRESHOLDS.SEMI_RURAL.bufferedMax)
    return 'SEMI_RURAL';
  if (population <= BUFFERED_TIER_THRESHOLDS.TIER_1.bufferedMax) return 'TIER_1';
  if (population <= BUFFERED_TIER_THRESHOLDS.TIER_2.bufferedMax) return 'TIER_2';
  return 'TIER_3';
}

/**
 * Calculate tier WITHOUT buffer (for display/comparison purposes)
 */
export function calculateTierStrict(population: number): PricingTier {
  return calculateTierFromPopulation(population);
}

/**
 * Check if population is within the buffer zone
 * Useful for UI messaging: "You're in the buffer zone - staying at Tier X"
 */
export function isInBufferZone(population: number): {
  inBuffer: boolean;
  currentTier: PricingTier;
  wouldBeTierWithoutBuffer: PricingTier;
  bufferSavings: number;
} {
  const tierWithBuffer = calculateTierWithBuffer(population);
  const tierWithoutBuffer = calculateTierStrict(population);

  const inBuffer = tierWithBuffer !== tierWithoutBuffer;
  const bufferSavings = inBuffer
    ? getTierPrice(tierWithoutBuffer) - getTierPrice(tierWithBuffer)
    : 0;

  return {
    inBuffer,
    currentTier: tierWithBuffer,
    wouldBeTierWithoutBuffer: tierWithoutBuffer,
    bufferSavings,
  };
}

// ============================================
// Suburb Radius Calculation
// ============================================

/**
 * Find all suburbs within a given radius of a centre point
 */
export function findSuburbsWithinRadius(
  centreCoordinates: Coordinates,
  radiusKm: RadiusOption,
  allSuburbs: Suburb[]
): SuburbWithDistance[] {
  const suburbsWithDistance: SuburbWithDistance[] = [];

  for (const suburb of allSuburbs) {
    const distance = calculateDistance(centreCoordinates, suburb.coordinates);

    if (distance <= radiusKm) {
      suburbsWithDistance.push({
        ...suburb,
        distanceKm: Math.round(distance * 10) / 10, // Round to 1 decimal
      });
    }
  }

  // Sort by distance (closest first)
  return suburbsWithDistance.sort((a, b) => a.distanceKm - b.distanceKm);
}

// ============================================
// Region Coverage Calculation
// ============================================

/**
 * Calculate which regions intersect with the radius
 * and estimate population coverage for each
 */
export function calculateRegionCoverage(
  centreCoordinates: Coordinates,
  radiusKm: RadiusOption,
  regions: Region[],
  suburbsInRadius: SuburbWithDistance[]
): RegionWithCoverage[] {
  const regionsWithCoverage: RegionWithCoverage[] = [];
  const suburbPostcodesInRadius = new Set(
    suburbsInRadius.map((s) => s.postcode)
  );

  for (const region of regions) {
    // Count how many of this region's suburbs fall within the radius
    const regionSuburbsInRadius = region.suburbs.filter((postcode) =>
      suburbPostcodesInRadius.has(postcode)
    );

    if (regionSuburbsInRadius.length === 0) {
      continue; // Region not touched by radius
    }

    // Calculate coverage percentage
    const coveragePercentage =
      (regionSuburbsInRadius.length / region.suburbs.length) * 100;

    // Estimate population within radius based on coverage
    const populationWithinRadius = Math.round(
      (region.population * coveragePercentage) / 100
    );

    regionsWithCoverage.push({
      ...region,
      coveragePercentage: Math.round(coveragePercentage * 10) / 10,
      populationWithinRadius,
    });
  }

  // Sort by population (highest first)
  return regionsWithCoverage.sort(
    (a, b) => b.populationWithinRadius - a.populationWithinRadius
  );
}

// ============================================
// Main Radius Calculation
// ============================================

/**
 * Main function: Calculate full coverage result for a contractor
 */
export async function calculateContractorCoverage(
  input: GeoRadiusInput,
  allSuburbs: Suburb[],
  allRegions: Region[]
): Promise<GeoRadiusResult> {
  // 1. Find centre suburb
  const centreSuburb = allSuburbs.find(
    (s) =>
      s.postcode === input.centrePostcode ||
      (input.centreSuburb &&
        s.suburb.toLowerCase() === input.centreSuburb.toLowerCase())
  );

  if (!centreSuburb) {
    throw new Error(`Suburb not found for postcode: ${input.centrePostcode}`);
  }

  // 2. Find all suburbs within radius
  const suburbsInRadius = findSuburbsWithinRadius(
    centreSuburb.coordinates,
    input.radiusKm,
    allSuburbs
  );

  // 3. Calculate region coverage
  const regionsInRadius = calculateRegionCoverage(
    centreSuburb.coordinates,
    input.radiusKm,
    allRegions,
    suburbsInRadius
  );

  // 4. Calculate total population within radius
  const totalPopulationInRadius = regionsInRadius.reduce(
    (sum, region) => sum + region.populationWithinRadius,
    0
  );

  // 5. Determine tier and price (WITH BUFFER)
  const calculatedTier = calculateTierWithBuffer(totalPopulationInRadius);
  const monthlyPrice = getTierPrice(calculatedTier);

  return {
    centre: centreSuburb,
    radiusKm: input.radiusKm,
    regionsInRadius,
    suburbsInRadius,
    totalPopulationInRadius,
    calculatedTier,
    monthlyPrice,
  };
}

// ============================================
// Coverage Breakdown for UI Display
// ============================================

/**
 * Generate a detailed breakdown for the contractor UI
 * Includes buffer zone information
 */
export function generateCoverageBreakdown(
  result: GeoRadiusResult
): CoverageBreakdown & { bufferInfo: ReturnType<typeof isInBufferZone> } {
  const regions: RegionBreakdownItem[] = result.regionsInRadius.map(
    (region) => ({
      regionName: region.name,
      regionId: region.id,
      coverageType: region.coveragePercentage >= 90 ? 'FULL' : 'PARTIAL',
      coveragePercentage: region.coveragePercentage,
      populationInRadius: region.populationWithinRadius,
      totalRegionPopulation: region.population,
    })
  );

  const bufferInfo = isInBufferZone(result.totalPopulationInRadius);

  return {
    regions,
    totalPopulation: result.totalPopulationInRadius,
    calculatedTier: result.calculatedTier,
    monthlyPrice: result.monthlyPrice,
    radiusKm: result.radiusKm,
    bufferInfo,
  };
}

// ============================================
// Radius Adjustment Comparison
// ============================================

/**
 * Compare coverage when contractor adjusts radius
 * Used for "What if I change to 50km?" scenarios
 */
export async function compareRadiusAdjustment(
  centrePostcode: string,
  currentRadius: RadiusOption,
  newRadius: RadiusOption,
  allSuburbs: Suburb[],
  allRegions: Region[]
): Promise<CoverageAdjustment> {
  const currentResult = await calculateContractorCoverage(
    { centrePostcode, radiusKm: currentRadius },
    allSuburbs,
    allRegions
  );

  const newResult = await calculateContractorCoverage(
    { centrePostcode, radiusKm: newRadius },
    allSuburbs,
    allRegions
  );

  const currentRegionIds = new Set(
    currentResult.regionsInRadius.map((r) => r.id)
  );
  const newRegionIds = new Set(newResult.regionsInRadius.map((r) => r.id));

  const regionsAdded = newResult.regionsInRadius
    .filter((r) => !currentRegionIds.has(r.id))
    .map((r) => r.name);

  const regionsRemoved = currentResult.regionsInRadius
    .filter((r) => !newRegionIds.has(r.id))
    .map((r) => r.name);

  return {
    previousRadius: currentRadius,
    newRadius,
    previousTier: currentResult.calculatedTier,
    newTier: newResult.calculatedTier,
    previousPrice: currentResult.monthlyPrice,
    newPrice: newResult.monthlyPrice,
    populationDifference:
      newResult.totalPopulationInRadius - currentResult.totalPopulationInRadius,
    regionsAdded,
    regionsRemoved,
  };
}

// ============================================
// Validation Helpers
// ============================================

/**
 * Validate Australian postcode format
 */
export function isValidAustralianPostcode(postcode: string): boolean {
  return /^[0-9]{4}$/.test(postcode);
}

/**
 * Validate radius option
 */
export function isValidRadius(radius: number): radius is RadiusOption {
  return RADIUS_OPTIONS.includes(radius as RadiusOption);
}

/**
 * Get bounding box for a radius (for efficient DB queries)
 */
export function getBoundingBox(
  centre: Coordinates,
  radiusKm: number
): {
  minLat: number;
  maxLat: number;
  minLon: number;
  maxLon: number;
} {
  const latDelta = radiusKm / 111; // ~111km per degree latitude
  const lonDelta = radiusKm / (111 * Math.cos(toRadians(centre.latitude)));

  return {
    minLat: centre.latitude - latDelta,
    maxLat: centre.latitude + latDelta,
    minLon: centre.longitude - lonDelta,
    maxLon: centre.longitude + lonDelta,
  };
}

// ============================================
// Buffer Zone UI Helpers
// ============================================

/**
 * Generate user-friendly message about buffer zone status
 */
export function getBufferZoneMessage(population: number): string | null {
  const { inBuffer, currentTier, wouldBeTierWithoutBuffer, bufferSavings } =
    isInBufferZone(population);

  if (!inBuffer) return null;

  return `Good news! Your coverage area (${population.toLocaleString()} population) falls within our 10% buffer zone. You're staying at ${currentTier.replace('_', ' ')} instead of moving to ${wouldBeTierWithoutBuffer.replace('_', ' ')}, saving you $${bufferSavings}/month.`;
}

/**
 * Get distance to next tier threshold (for UI progress indicators)
 */
export function getDistanceToNextTier(population: number): {
  currentTier: PricingTier;
  nextTier: PricingTier | null;
  populationToNextTier: number;
  percentageToNextTier: number;
} {
  const currentTier = calculateTierWithBuffer(population);

  const tierOrder: PricingTier[] = [
    'RURAL',
    'SEMI_RURAL',
    'TIER_1',
    'TIER_2',
    'TIER_3',
  ];
  const currentIndex = tierOrder.indexOf(currentTier);

  if (currentIndex === tierOrder.length - 1) {
    return {
      currentTier,
      nextTier: null,
      populationToNextTier: 0,
      percentageToNextTier: 100,
    };
  }

  const nextTier = tierOrder[currentIndex + 1];
  const currentThreshold = BUFFERED_TIER_THRESHOLDS[currentTier];
  const populationToNextTier = currentThreshold.bufferedMax - population;
  const tierRange = currentThreshold.bufferedMax - currentThreshold.min;
  const percentageToNextTier =
    ((population - currentThreshold.min) / tierRange) * 100;

  return {
    currentTier,
    nextTier,
    populationToNextTier,
    percentageToNextTier: Math.min(100, Math.max(0, percentageToNextTier)),
  };
}
