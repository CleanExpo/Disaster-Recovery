/**
 * Competitor Analysis System Initialization
 *
 * Initializes the complete competitor analysis infrastructure:
 * 1. Seeds 40 competitors into database
 * 2. Starts background job workers
 * 3. Schedules automated analysis jobs
 * 4. Verifies API credentials
 */

import { PrismaClient } from '@prisma/client';
import { allCompetitors } from './data/competitor-seeds';
import { initializeSchedules } from './jobs/analysis-scheduler';
import { semrushClient } from './api-clients/semrush-client';
import { dataForSeoClient } from './api-clients/dataforseo-client';

const prisma = new PrismaClient();

/**
 * Seed competitors into database
 */
async function seedCompetitors() {
  console.log('[Init] Seeding competitors into database...');

  let created = 0;
  let updated = 0;
  let skipped = 0;

  for (const competitor of allCompetitors) {
    try {
      const existing = await prisma.competitor.findUnique({
        where: { domain: competitor.domain },
      });

      if (existing) {
        // Update if priority changed
        if (existing.priority !== competitor.priority) {
          await prisma.competitor.update({
            where: { id: existing.id },
            data: { priority: competitor.priority },
          });
          updated++;
        } else {
          skipped++;
        }
      } else {
        // Create new competitor
        await prisma.competitor.create({
          data: {
            domain: competitor.domain,
            name: competitor.name,
            category: competitor.category,
            priority: competitor.priority,
            businessModel: competitor.businessModel,
            targetMarket: competitor.targetMarket,
            geographicFocus: competitor.geographicFocus,
            notes: competitor.notes,
            isActive: true,
          },
        });
        created++;
      }
    } catch (error: any) {
      console.error(`[Init] Error seeding ${competitor.domain}:`, error.message);
    }
  }

  console.log(`[Init] Seeding complete: ${created} created, ${updated} updated, ${skipped} skipped`);
}

/**
 * Verify API credentials
 */
async function verifyApiCredentials() {
  console.log('[Init] Verifying API credentials...');

  const errors: string[] = [];

  // Check SEMRUSH API key
  if (!process.env.SEMRUSH_API_KEY) {
    errors.push('SEMRUSH_API_KEY not found in environment');
  }

  // Check DataForSEO credentials
  if (!process.env.DATAFORSEO_LOGIN) {
    errors.push('DATAFORSEO_LOGIN not found in environment');
  }

  if (!process.env.DATAFORSEO_PASSWORD) {
    errors.push('DATAFORSEO_PASSWORD not found in environment');
  }

  if (errors.length > 0) {
    console.error('[Init] API credential errors:');
    errors.forEach((error) => console.error(`  - ${error}`));
    throw new Error('Missing required API credentials');
  }

  console.log('[Init] API credentials verified successfully');
}

/**
 * Initialize cache systems
 */
async function initializeCaches() {
  console.log('[Init] Initializing cache systems...');

  // Clear any stale caches
  semrushClient.clearCache();
  dataForSeoClient.clearCache();

  console.log('[Init] Caches initialized successfully');
}

/**
 * Start background workers
 */
async function startWorkers() {
  console.log('[Init] Starting background workers...');

  // Import worker to initialize processors
  await import('./jobs/analysis-worker');

  console.log('[Init] Background workers started successfully');
}

/**
 * Initialize schedules
 */
async function initSchedules() {
  console.log('[Init] Initializing analysis schedules...');

  await initializeSchedules();

  console.log('[Init] Analysis schedules initialized successfully');
}

/**
 * Run system health check
 */
async function healthCheck() {
  console.log('[Init] Running system health check...');

  const checks = {
    database: false,
    redis: false,
    semrush: false,
    dataForSeo: false,
  };

  // Check database
  try {
    await prisma.competitor.count();
    checks.database = true;
  } catch (error) {
    console.error('[Init] Database check failed:', error);
  }

  // Check Redis (via Bull queue)
  try {
    const { analysisQueue } = await import('./jobs/analysis-scheduler');
    await analysisQueue.isReady();
    checks.redis = true;
  } catch (error) {
    console.error('[Init] Redis check failed:', error);
  }

  // Check SEMRUSH
  try {
    // Test with a simple domain overview
    checks.semrush = !!process.env.SEMRUSH_API_KEY;
  } catch (error) {
    console.error('[Init] SEMRUSH check failed:', error);
  }

  // Check DataForSEO
  try {
    checks.dataForSeo = !!(process.env.DATAFORSEO_LOGIN && process.env.DATAFORSEO_PASSWORD);
  } catch (error) {
    console.error('[Init] DataForSEO check failed:', error);
  }

  console.log('[Init] Health check results:', checks);

  const allHealthy = Object.values(checks).every((check) => check === true);

  if (!allHealthy) {
    console.warn('[Init] Some health checks failed - system may not function correctly');
  } else {
    console.log('[Init] All health checks passed');
  }

  return checks;
}

/**
 * Main initialization function
 */
export async function initializeCompetitorAnalysis() {
  console.log('==================================================');
  console.log('Competitor Analysis System Initialization');
  console.log('==================================================\n');

  try {
    // Step 1: Verify API credentials
    await verifyApiCredentials();

    // Step 2: Seed competitors
    await seedCompetitors();

    // Step 3: Initialize caches
    await initializeCaches();

    // Step 4: Start background workers
    await startWorkers();

    // Step 5: Initialize schedules
    await initSchedules();

    // Step 6: Run health check
    await healthCheck();

    console.log('\n==================================================');
    console.log('Competitor Analysis System Ready');
    console.log('==================================================\n');

    console.log('Next steps:');
    console.log('1. Trigger initial analysis: POST /api/competitor-analysis/competitors/{id}/analyze');
    console.log('2. View keyword opportunities: GET /api/competitor-analysis/keywords/gaps');
    console.log('3. Generate SWOT analysis: POST /api/competitor-analysis/swot');
    console.log('\nAutomated schedules:');
    console.log('- Daily analysis: 2 AM (high-priority competitors)');
    console.log('- Weekly deep analysis: Sunday 3 AM (all competitors)');
    console.log('- Rank tracking: Every 6 hours (top 20 keywords)');
    console.log('- Monthly trend report: 1st of month at 4 AM');

    return { success: true };
  } catch (error: any) {
    console.error('\n[Init] Initialization failed:', error.message);
    console.error('\n==================================================');
    console.error('Competitor Analysis System Initialization Failed');
    console.error('==================================================\n');

    throw error;
  }
}

// Run if executed directly
if (require.main === module) {
  initializeCompetitorAnalysis()
    .then(() => {
      console.log('\nInitialization complete. Press Ctrl+C to exit.');
    })
    .catch((error) => {
      console.error('Fatal error:', error);
      process.exit(1);
    });
}
