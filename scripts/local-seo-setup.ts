/**
 * Local SEO Setup Script - NRPG Platform
 *
 * One-command setup for comprehensive local SEO infrastructure:
 * - Initialize GBP locations for all cities
 * - Submit to 100+ business directories
 * - Generate citation reports
 * - Set up backlink tracking
 *
 * Usage:
 *   npx ts-node scripts/local-seo-setup.ts
 *   npx ts-node scripts/local-seo-setup.ts --priority-only
 *   npx ts-node scripts/local-seo-setup.ts --city="Sydney" --state="NSW"
 */

import { gbpManager, PRIORITY_CITIES } from '../lib/seo/gbp-manager';
import { citationManager } from '../lib/seo/citation-manager';
import { backlinkTracker } from '../lib/seo/backlink-tracker';
import citiesData from '../data/australian-cities.json';
import { AUSTRALIAN_LOCATIONS } from '../lib/design-tokens';
import { AustralianStateCode } from '../lib/seo/local-seo-types';

// =============================================================================
// CONFIGURATION
// =============================================================================

interface SetupOptions {
  priorityOnly: boolean;
  specificCity?: string;
  specificState?: AustralianStateCode;
  skipGBP: boolean;
  skipCitations: boolean;
  skipBacklinks: boolean;
  dryRun: boolean;
  verbose: boolean;
}

const DEFAULT_OPTIONS: SetupOptions = {
  priorityOnly: false,
  skipGBP: false,
  skipCitations: false,
  skipBacklinks: false,
  dryRun: false,
  verbose: true,
};

// =============================================================================
// LOGGING UTILITIES
// =============================================================================

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  dim: '\x1b[2m',
  green: '\x1b[32m',
  yellow: '\x1b[33m',
  blue: '\x1b[34m',
  red: '\x1b[31m',
  cyan: '\x1b[36m',
};

function log(message: string, type: 'info' | 'success' | 'warning' | 'error' | 'header' = 'info') {
  const timestamp = new Date().toISOString().split('T')[1].split('.')[0];
  const colorMap = {
    info: colors.blue,
    success: colors.green,
    warning: colors.yellow,
    error: colors.red,
    header: colors.cyan,
  };
  const prefix = type === 'header' ? '\n=== ' : '[';
  const suffix = type === 'header' ? ' ===' : `] ${message}`;
  const content = type === 'header' ? message : timestamp;

  console.log(`${colorMap[type]}${prefix}${content}${suffix}${colors.reset}`);
}

function logProgress(current: number, total: number, label: string) {
  const percentage = Math.round((current / total) * 100);
  const bar = '='.repeat(Math.floor(percentage / 5)) + '-'.repeat(20 - Math.floor(percentage / 5));
  process.stdout.write(`\r[${bar}] ${percentage}% - ${label} (${current}/${total})`);
}

// =============================================================================
// SETUP FUNCTIONS
// =============================================================================

/**
 * Initialize Google Business Profile locations
 */
async function setupGBPLocations(options: SetupOptions): Promise<{
  created: number;
  failed: number;
  cities: string[];
}> {
  log('Google Business Profile Setup', 'header');

  const results = {
    created: 0,
    failed: 0,
    cities: [] as string[],
  };

  // Determine which cities to process
  let citiesToProcess = citiesData.cities;

  if (options.specificCity) {
    citiesToProcess = citiesData.cities.filter(
      c => c.city.toLowerCase() === options.specificCity?.toLowerCase() ||
           c.slug === options.specificCity?.toLowerCase()
    );
    log(`Processing specific city: ${options.specificCity}`, 'info');
  } else if (options.priorityOnly) {
    citiesToProcess = citiesData.cities.filter(c =>
      PRIORITY_CITIES.map(p => p.toLowerCase()).includes(c.city.toLowerCase())
    );
    log(`Processing priority cities only (${PRIORITY_CITIES.length} cities)`, 'info');
  }

  if (options.specificState) {
    citiesToProcess = citiesToProcess.filter(c => c.stateCode === options.specificState);
    log(`Filtered to state: ${options.specificState}`, 'info');
  }

  log(`Processing ${citiesToProcess.length} cities for GBP`, 'info');

  if (options.dryRun) {
    log('DRY RUN - No actual GBP locations will be created', 'warning');
    return results;
  }

  for (let i = 0; i < citiesToProcess.length; i++) {
    const cityData = citiesToProcess[i];
    const stateInfo = AUSTRALIAN_LOCATIONS.find(s => s.code === cityData.stateCode);

    if (options.verbose) {
      logProgress(i + 1, citiesToProcess.length, cityData.city);
    }

    try {
      const result = await gbpManager.createLocation({
        city: cityData.city,
        state: stateInfo?.name || cityData.state,
        stateCode: cityData.stateCode as AustralianStateCode,
        latitude: cityData.latitude,
        longitude: cityData.longitude,
      });

      if (result.success) {
        results.created++;
        results.cities.push(cityData.city);
      } else {
        results.failed++;
      }
    } catch (error) {
      results.failed++;
      if (options.verbose) {
        log(`Failed to create GBP for ${cityData.city}: ${error}`, 'error');
      }
    }

    // Rate limiting delay
    await delay(100);
  }

  console.log(''); // New line after progress bar
  log(`GBP Setup Complete: ${results.created} created, ${results.failed} failed`, 'success');

  return results;
}

/**
 * Submit to business directories
 */
async function setupCitations(options: SetupOptions): Promise<{
  submitted: number;
  cities: number;
  directories: number;
}> {
  log('Citation Directory Submissions', 'header');

  const results = {
    submitted: 0,
    cities: 0,
    directories: 0,
  };

  // Get directory stats
  const stats = citationManager.getDirectoryStats();
  log(`Available directories: ${stats.total}`, 'info');
  log(`Categories: National (${stats.byCategory.national}), Local (${stats.byCategory.local}), Industry (${stats.byCategory.industry})`, 'info');

  if (options.dryRun) {
    log('DRY RUN - No actual submissions will be made', 'warning');
    return results;
  }

  // Determine which cities to process
  let citiesToProcess = citiesData.cities;

  if (options.specificCity) {
    citiesToProcess = citiesData.cities.filter(
      c => c.city.toLowerCase() === options.specificCity?.toLowerCase()
    );
  } else if (options.priorityOnly) {
    citiesToProcess = citiesData.cities.filter(c =>
      PRIORITY_CITIES.map(p => p.toLowerCase()).includes(c.city.toLowerCase())
    );
  }

  if (options.specificState) {
    citiesToProcess = citiesToProcess.filter(c => c.stateCode === options.specificState);
  }

  log(`Processing ${citiesToProcess.length} cities for citations`, 'info');

  for (let i = 0; i < citiesToProcess.length; i++) {
    const cityData = citiesToProcess[i];
    const stateCode = cityData.stateCode as AustralianStateCode;
    const stateName = getStateName(stateCode);

    if (options.verbose) {
      logProgress(i + 1, citiesToProcess.length, `${cityData.city} citations`);
    }

    try {
      const result = await citationManager.submitForCity(
        cityData.city,
        stateCode,
        stateName
      );

      if (result.success && result.data) {
        results.submitted += result.data.length;
        results.cities++;
      }
    } catch (error) {
      if (options.verbose) {
        log(`Failed to submit citations for ${cityData.city}: ${error}`, 'error');
      }
    }

    await delay(200);
  }

  console.log('');
  results.directories = stats.total;
  log(`Citations Complete: ${results.submitted} submissions for ${results.cities} cities`, 'success');

  return results;
}

/**
 * Initialize backlink tracking
 */
async function setupBacklinks(options: SetupOptions): Promise<{
  prospects: number;
  templates: number;
  opportunities: number;
}> {
  log('Backlink Tracking Setup', 'header');

  const results = {
    prospects: 0,
    templates: 0,
    opportunities: 0,
  };

  // Get prospect and template counts
  const stats = backlinkTracker.getProspectStats();
  const templates = backlinkTracker.getAllTemplates();

  results.prospects = stats.total;
  results.templates = templates.length;

  log(`Loaded ${stats.total} backlink prospects`, 'info');
  log(`Available outreach templates: ${templates.length}`, 'info');

  // Identify opportunities
  if (!options.dryRun) {
    const opportunities = await backlinkTracker.identifyLocalOpportunities();
    if (opportunities.success && opportunities.data) {
      results.opportunities = opportunities.data.length;
      log(`Identified ${results.opportunities} high-priority opportunities`, 'info');
    }
  }

  // Log prospect breakdown
  log('Prospect breakdown by source type:', 'info');
  Object.entries(stats.bySourceType).forEach(([type, count]) => {
    if (count > 0) {
      console.log(`  - ${type}: ${count}`);
    }
  });

  log('Backlink tracking initialized', 'success');

  return results;
}

/**
 * Generate initial reports
 */
async function generateReports(options: SetupOptions): Promise<void> {
  log('Generating Initial Reports', 'header');

  if (options.dryRun) {
    log('DRY RUN - Skipping report generation', 'warning');
    return;
  }

  // Citation report
  const citationReport = await citationManager.generateCitationReport();
  log(`Citation Report Generated:`, 'info');
  console.log(`  - Total citations: ${citationReport.totalCitations}`);
  console.log(`  - Approved: ${citationReport.approvedCitations}`);
  console.log(`  - Pending: ${citationReport.pendingCitations}`);
  console.log(`  - NAP consistency: ${citationReport.consistencyScore}%`);

  // Backlink report
  const backlinkReport = await backlinkTracker.generateBacklinkReport();
  if (backlinkReport.success && backlinkReport.data) {
    log(`Backlink Report Generated:`, 'info');
    console.log(`  - Total backlinks: ${backlinkReport.data.metrics.totalBacklinks}`);
    console.log(`  - Dofollow: ${backlinkReport.data.metrics.dofollowBacklinks}`);
    console.log(`  - Local relevance: ${backlinkReport.data.metrics.localBacklinks}`);
    console.log(`  - Active prospects: ${backlinkReport.data.metrics.activeProspects}`);

    if (backlinkReport.data.recommendations.length > 0) {
      log('Recommendations:', 'info');
      backlinkReport.data.recommendations.forEach(rec => {
        console.log(`  - ${rec}`);
      });
    }
  }

  log('Reports generated successfully', 'success');
}

// =============================================================================
// MAIN EXECUTION
// =============================================================================

async function main() {
  const startTime = Date.now();

  log('NRPG Local SEO Infrastructure Setup', 'header');
  log(`Started at ${new Date().toISOString()}`, 'info');

  // Parse command line arguments
  const args = process.argv.slice(2);
  const options: SetupOptions = { ...DEFAULT_OPTIONS };

  args.forEach(arg => {
    if (arg === '--priority-only') options.priorityOnly = true;
    if (arg === '--dry-run') options.dryRun = true;
    if (arg === '--skip-gbp') options.skipGBP = true;
    if (arg === '--skip-citations') options.skipCitations = true;
    if (arg === '--skip-backlinks') options.skipBacklinks = true;
    if (arg === '--quiet') options.verbose = false;

    if (arg.startsWith('--city=')) {
      options.specificCity = arg.split('=')[1];
    }
    if (arg.startsWith('--state=')) {
      options.specificState = arg.split('=')[1] as AustralianStateCode;
    }
  });

  // Log configuration
  log('Configuration:', 'info');
  console.log(`  - Priority only: ${options.priorityOnly}`);
  console.log(`  - Dry run: ${options.dryRun}`);
  console.log(`  - Specific city: ${options.specificCity || 'None'}`);
  console.log(`  - Specific state: ${options.specificState || 'All'}`);

  const summary: Record<string, unknown> = {};

  // Setup GBP locations
  if (!options.skipGBP) {
    summary.gbp = await setupGBPLocations(options);
  }

  // Setup citations
  if (!options.skipCitations) {
    summary.citations = await setupCitations(options);
  }

  // Setup backlink tracking
  if (!options.skipBacklinks) {
    summary.backlinks = await setupBacklinks(options);
  }

  // Generate reports
  await generateReports(options);

  // Final summary
  const endTime = Date.now();
  const duration = Math.round((endTime - startTime) / 1000);

  log('Setup Complete', 'header');
  log(`Duration: ${duration} seconds`, 'info');
  console.log('\nSummary:');
  console.log(JSON.stringify(summary, null, 2));

  log('Local SEO infrastructure is ready!', 'success');
  console.log('\nNext steps:');
  console.log('1. Verify GBP locations via Google Business Profile');
  console.log('2. Monitor citation approval status');
  console.log('3. Begin outreach campaigns for backlinks');
  console.log('4. Schedule weekly GBP posts');
  console.log('\nAPI Endpoints:');
  console.log('  GET /api/local-seo/gbp          - List GBP locations');
  console.log('  GET /api/local-seo/citations    - List citations');
  console.log('  GET /api/local-seo/backlinks    - List backlinks');
}

// =============================================================================
// HELPER FUNCTIONS
// =============================================================================

function delay(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms));
}

function getStateName(code: AustralianStateCode): string {
  const stateNames: Record<AustralianStateCode, string> = {
    NSW: 'New South Wales',
    VIC: 'Victoria',
    QLD: 'Queensland',
    WA: 'Western Australia',
    SA: 'South Australia',
    TAS: 'Tasmania',
    ACT: 'Australian Capital Territory',
    NT: 'Northern Territory',
  };
  return stateNames[code];
}

// =============================================================================
// RUN
// =============================================================================

main().catch(error => {
  log(`Setup failed: ${error.message}`, 'error');
  console.error(error);
  process.exit(1);
});
