/**
 * Demo Runner
 * Disaster Recovery - NRPG Platform
 *
 * Runs complete demonstrations of the SEO/GEO page generation system.
 * Designed for investor presentations and system validation.
 */

import { ServiceType, SuburbWithDistance, PricingTier } from '../types';
import {
  calculateContractorCoverage,
  generateCoverageBreakdown,
  calculateTierWithBuffer,
  getTierPrice,
  TIER_PRICING,
} from '../radius-calculator';
import {
  triggerPageGeneration,
  ContractorSignupEvent,
  PageGenerationResult,
} from '../page-generation-trigger';
import {
  generateLandingPage,
  generatePillarPage,
  LandingPageTemplate,
  SERVICE_CONFIG,
} from '../templates';
import { generateSitemapXml, SitemapUrl, buildLandingPageUrls } from '../sitemap';
import { MOCK_SUBURBS, MOCK_REGIONS, generateMockContractor, generateMockSuburbs, MockContractor } from './mock-data';

// ============================================
// Types
// ============================================

export interface DemoContractor extends MockContractor {
  signupTimestamp: Date;
}

export interface DemoResult {
  scenario: DemoScenario;
  contractor: DemoContractor;
  coverage: {
    suburbCount: number;
    suburbs: SuburbWithDistance[];
    totalPopulation: number;
    tier: PricingTier;
    monthlyPrice: number;
    bufferApplied: boolean;
  };
  pages: {
    total: number;
    landingPages: number;
    pillarPages: number;
    servicePages: number;
    samplePages: LandingPageTemplate[];
  };
  sitemap: {
    urlCount: number;
    sampleXml: string;
  };
  performance: {
    coverageCalculationMs: number;
    pageGenerationMs: number;
    sitemapGenerationMs: number;
    totalMs: number;
  };
  summary: string;
}

export interface DemoOutput {
  timestamp: Date;
  scenarios: DemoResult[];
  totalTime: number;
}

// ============================================
// Demo Scenarios
// ============================================

export enum DemoScenario {
  BRISBANE_WATER_DAMAGE = 'BRISBANE_WATER_DAMAGE',
  GOLD_COAST_FULL_SERVICE = 'GOLD_COAST_FULL_SERVICE',
  IPSWICH_REGIONAL = 'IPSWICH_REGIONAL',
  URUNGA_RURAL = 'URUNGA_RURAL',
  SUNSHINE_COAST_STORM = 'SUNSHINE_COAST_STORM',
}

export const DEMO_SCENARIOS: Record<DemoScenario, {
  name: string;
  description: string;
  baseSuburb: string;
  basePostcode: string;
  state: string;
  radius: 25 | 50 | 100;
  services: ServiceType[];
}> = {
  [DemoScenario.BRISBANE_WATER_DAMAGE]: {
    name: 'Brisbane CBD - Water Damage Specialist',
    description: 'Inner city contractor focusing on water damage in high-density areas',
    baseSuburb: 'Brisbane City',
    basePostcode: '4000',
    state: 'QLD',
    radius: 25,
    services: ['WATER_DAMAGE', 'MOULD_REMEDIATION', 'STORM_DAMAGE'],
  },
  [DemoScenario.GOLD_COAST_FULL_SERVICE]: {
    name: 'Gold Coast - Full Service Restoration',
    description: 'Comprehensive restoration services across the Gold Coast region',
    baseSuburb: 'Surfers Paradise',
    basePostcode: '4217',
    state: 'QLD',
    radius: 50,
    services: ['WATER_DAMAGE', 'FIRE_DAMAGE', 'SMOKE_DAMAGE', 'MOULD_REMEDIATION', 'STORM_DAMAGE'],
  },
  [DemoScenario.IPSWICH_REGIONAL]: {
    name: 'Ipswich - Regional Coverage',
    description: 'Regional contractor serving Ipswich and surrounding areas',
    baseSuburb: 'Ipswich',
    basePostcode: '4305',
    state: 'QLD',
    radius: 50,
    services: ['WATER_DAMAGE', 'FIRE_DAMAGE', 'STORM_DAMAGE', 'SEWAGE_CLEANUP'],
  },
  [DemoScenario.URUNGA_RURAL]: {
    name: 'Urunga - Rural NSW',
    description: 'Rural contractor with large coverage area in regional NSW',
    baseSuburb: 'Urunga',
    basePostcode: '2455',
    state: 'NSW',
    radius: 100,
    services: ['WATER_DAMAGE', 'FIRE_DAMAGE', 'STORM_DAMAGE'],
  },
  [DemoScenario.SUNSHINE_COAST_STORM]: {
    name: 'Sunshine Coast - Storm Specialist',
    description: 'Storm damage specialist in cyclone-prone Sunshine Coast',
    baseSuburb: 'Maroochydore',
    basePostcode: '4558',
    state: 'QLD',
    radius: 50,
    services: ['STORM_DAMAGE', 'WATER_DAMAGE', 'MOULD_REMEDIATION'],
  },
};

// ============================================
// Demo Runner
// ============================================

/**
 * Run a single demo scenario
 */
export async function runDemo(scenario: DemoScenario): Promise<DemoResult> {
  const config = DEMO_SCENARIOS[scenario];
  const startTime = Date.now();
  const timings = { coverage: 0, pages: 0, sitemap: 0 };

  console.log(`\n${'='.repeat(60)}`);
  console.log(`DEMO: ${config.name}`);
  console.log(`${'='.repeat(60)}`);
  console.log(`Description: ${config.description}`);
  console.log(`Base Location: ${config.baseSuburb}, ${config.basePostcode}`);
  console.log(`Coverage Radius: ${config.radius}km`);
  console.log(`Services: ${config.services.length}`);
  console.log('');

  // 1. Find base suburb
  const baseSuburb = MOCK_SUBURBS.find(
    (s) => s.postcode === config.basePostcode && s.suburb === config.baseSuburb
  );

  if (!baseSuburb) {
    throw new Error(`Base suburb not found: ${config.baseSuburb}, ${config.basePostcode}`);
  }

  // 2. Generate mock contractor
  const contractor: DemoContractor = {
    ...generateMockContractor(baseSuburb, config.services, config.radius),
    baseSuburb: config.baseSuburb,
    basePostcode: config.basePostcode,
    state: config.state as any,
    selectedRadius: config.radius,
    services: config.services,
    signupTimestamp: new Date(),
  };

  console.log(`Contractor: ${contractor.businessName}`);
  console.log(`ABN: ${contractor.abn}`);
  console.log(`Contact: ${contractor.contactName}`);
  console.log('');

  // 3. Calculate coverage
  console.log('Calculating coverage area...');
  const coverageStart = Date.now();

  const coverageResult = await calculateContractorCoverage(
    {
      centrePostcode: config.basePostcode,
      centreSuburb: config.baseSuburb,
      radiusKm: config.radius,
    },
    MOCK_SUBURBS,
    MOCK_REGIONS
  );

  timings.coverage = Date.now() - coverageStart;

  const breakdown = generateCoverageBreakdown(coverageResult);

  console.log(`  Suburbs in radius: ${coverageResult.suburbsInRadius.length}`);
  console.log(`  Total population: ${coverageResult.totalPopulationInRadius.toLocaleString()}`);
  console.log(`  Pricing tier: ${coverageResult.calculatedTier}`);
  console.log(`  Monthly price: $${coverageResult.monthlyPrice}`);
  if (breakdown.bufferInfo.inBuffer) {
    console.log(`  Buffer applied: Saving $${breakdown.bufferInfo.bufferSavings}/month`);
  }
  console.log('');

  // 4. Generate sample pages
  console.log('Generating sample pages...');
  const pagesStart = Date.now();

  const totalLandingPages = coverageResult.suburbsInRadius.length * config.services.length;
  const samplePages: LandingPageTemplate[] = [];

  // Generate first 3 landing pages as samples
  for (let i = 0; i < Math.min(3, coverageResult.suburbsInRadius.length); i++) {
    const suburb = coverageResult.suburbsInRadius[i];
    for (const service of config.services.slice(0, 1)) {
      samplePages.push(
        generateLandingPage({
          suburb,
          serviceType: service,
          region: suburb.regionId,
          contractorCount: 1,
          averageRating: 4.8,
          averageResponseMinutes: 35,
          certifications: contractor.certifications,
        })
      );
    }
  }

  timings.pages = Date.now() - pagesStart;

  console.log(`  Landing pages: ${totalLandingPages}`);
  console.log(`  Pillar pages: ${config.services.length * Object.keys(DEMO_SCENARIOS).length}`);
  console.log(`  Service pages: ${config.services.length}`);
  console.log(`  Sample pages generated: ${samplePages.length}`);
  console.log('');

  // Show sample page details
  if (samplePages.length > 0) {
    console.log('Sample Page Preview:');
    const sample = samplePages[0];
    console.log(`  URL: ${sample.slug}`);
    console.log(`  Title: ${sample.title}`);
    console.log(`  H1: ${sample.h1}`);
    console.log(`  Meta: ${sample.metaDescription.slice(0, 80)}...`);
    console.log('');
  }

  // 5. Generate sitemap sample
  console.log('Generating sitemap...');
  const sitemapStart = Date.now();

  const sitemapUrls = buildLandingPageUrls(
    coverageResult.suburbsInRadius,
    config.services,
    new Date()
  );

  const sitemapXml = generateSitemapXml(sitemapUrls.slice(0, 10)); // Just first 10 for demo

  timings.sitemap = Date.now() - sitemapStart;

  console.log(`  Sitemap URLs: ${sitemapUrls.length}`);
  console.log(`  Sample XML generated: ${sitemapXml.length} bytes`);
  console.log('');

  // 6. Calculate totals
  const totalTime = Date.now() - startTime;

  console.log('Performance Metrics:');
  console.log(`  Coverage calculation: ${timings.coverage}ms`);
  console.log(`  Page generation: ${timings.pages}ms`);
  console.log(`  Sitemap generation: ${timings.sitemap}ms`);
  console.log(`  Total time: ${totalTime}ms`);
  console.log('');

  // Build result
  const result: DemoResult = {
    scenario,
    contractor,
    coverage: {
      suburbCount: coverageResult.suburbsInRadius.length,
      suburbs: coverageResult.suburbsInRadius,
      totalPopulation: coverageResult.totalPopulationInRadius,
      tier: coverageResult.calculatedTier,
      monthlyPrice: coverageResult.monthlyPrice,
      bufferApplied: breakdown.bufferInfo.inBuffer,
    },
    pages: {
      total: totalLandingPages + config.services.length + 7, // landing + pillar + service
      landingPages: totalLandingPages,
      pillarPages: config.services.length,
      servicePages: config.services.length,
      samplePages,
    },
    sitemap: {
      urlCount: sitemapUrls.length,
      sampleXml: sitemapXml.slice(0, 500) + '...',
    },
    performance: {
      coverageCalculationMs: timings.coverage,
      pageGenerationMs: timings.pages,
      sitemapGenerationMs: timings.sitemap,
      totalMs: totalTime,
    },
    summary: buildSummary(config, coverageResult, totalLandingPages, sitemapUrls.length),
  };

  console.log('Summary:');
  console.log(result.summary);
  console.log('');

  return result;
}

/**
 * Run all demo scenarios
 */
export async function runAllDemos(): Promise<DemoOutput> {
  const startTime = Date.now();
  const scenarios: DemoResult[] = [];

  console.log('\n' + '='.repeat(60));
  console.log('SEO/GEO PAGE GENERATION - FULL DEMO');
  console.log('='.repeat(60));
  console.log('');

  for (const scenario of Object.values(DemoScenario)) {
    const result = await runDemo(scenario);
    scenarios.push(result);
  }

  const totalTime = Date.now() - startTime;

  // Print summary
  console.log('\n' + '='.repeat(60));
  console.log('DEMO COMPLETE - SUMMARY');
  console.log('='.repeat(60));
  console.log('');

  let totalPages = 0;
  let totalUrls = 0;
  let totalRevenue = 0;

  for (const result of scenarios) {
    console.log(`${result.scenario}:`);
    console.log(`  Coverage: ${result.coverage.suburbCount} suburbs, ${result.coverage.totalPopulation.toLocaleString()} population`);
    console.log(`  Pages: ${result.pages.total} | Revenue: $${result.coverage.monthlyPrice}/month`);
    totalPages += result.pages.total;
    totalUrls += result.sitemap.urlCount;
    totalRevenue += result.coverage.monthlyPrice;
  }

  console.log('');
  console.log('Totals:');
  console.log(`  Total pages: ${totalPages.toLocaleString()}`);
  console.log(`  Total sitemap URLs: ${totalUrls.toLocaleString()}`);
  console.log(`  Monthly recurring revenue: $${totalRevenue.toLocaleString()}`);
  console.log(`  Annual revenue: $${(totalRevenue * 12).toLocaleString()}`);
  console.log(`  Total execution time: ${totalTime}ms`);

  return {
    timestamp: new Date(),
    scenarios,
    totalTime,
  };
}

/**
 * Format demo output for display
 */
export function formatDemoOutput(output: DemoOutput): string {
  const lines: string[] = [];

  lines.push('# SEO/GEO Page Generation Demo Results');
  lines.push(`Generated: ${output.timestamp.toISOString()}`);
  lines.push('');

  for (const result of output.scenarios) {
    lines.push(`## ${DEMO_SCENARIOS[result.scenario].name}`);
    lines.push(`**Description:** ${DEMO_SCENARIOS[result.scenario].description}`);
    lines.push('');
    lines.push('### Coverage');
    lines.push(`- Base Location: ${result.contractor.baseSuburb}, ${result.contractor.basePostcode}`);
    lines.push(`- Radius: ${result.contractor.selectedRadius}km`);
    lines.push(`- Suburbs Covered: ${result.coverage.suburbCount}`);
    lines.push(`- Population: ${result.coverage.totalPopulation.toLocaleString()}`);
    lines.push(`- Pricing Tier: ${result.coverage.tier}`);
    lines.push(`- Monthly Price: $${result.coverage.monthlyPrice}`);
    lines.push('');
    lines.push('### Pages Generated');
    lines.push(`- Landing Pages: ${result.pages.landingPages}`);
    lines.push(`- Pillar Pages: ${result.pages.pillarPages}`);
    lines.push(`- Service Pages: ${result.pages.servicePages}`);
    lines.push(`- **Total: ${result.pages.total}**`);
    lines.push('');
    lines.push('### Performance');
    lines.push(`- Coverage Calculation: ${result.performance.coverageCalculationMs}ms`);
    lines.push(`- Page Generation: ${result.performance.pageGenerationMs}ms`);
    lines.push(`- Sitemap Generation: ${result.performance.sitemapGenerationMs}ms`);
    lines.push(`- **Total: ${result.performance.totalMs}ms**`);
    lines.push('');
    lines.push('---');
    lines.push('');
  }

  // Summary
  const totalPages = output.scenarios.reduce((sum, s) => sum + s.pages.total, 0);
  const totalRevenue = output.scenarios.reduce((sum, s) => sum + s.coverage.monthlyPrice, 0);

  lines.push('## Summary');
  lines.push(`- Total Scenarios: ${output.scenarios.length}`);
  lines.push(`- Total Pages: ${totalPages.toLocaleString()}`);
  lines.push(`- Monthly Revenue: $${totalRevenue.toLocaleString()}`);
  lines.push(`- Annual Revenue: $${(totalRevenue * 12).toLocaleString()}`);
  lines.push(`- Total Execution Time: ${output.totalTime}ms`);

  return lines.join('\n');
}

// ============================================
// Utility Functions
// ============================================

function buildSummary(
  config: typeof DEMO_SCENARIOS[DemoScenario],
  coverage: Awaited<ReturnType<typeof calculateContractorCoverage>>,
  pageCount: number,
  urlCount: number
): string {
  return `When contractor signs up in ${config.baseSuburb} with ${config.radius}km radius:
- ${coverage.suburbsInRadius.length} suburbs instantly covered
- ${pageCount} SEO-optimised landing pages auto-generated
- ${urlCount} URLs added to sitemap
- Google/Bing notified of new pages
- Tier ${coverage.calculatedTier} = $${coverage.monthlyPrice}/month recurring revenue`;
}
