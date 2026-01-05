/**
 * Blue Ocean Scanner Job
 *
 * Runs all 6 detection algorithms to discover untapped SEO opportunities
 * Schedule: Weekly Monday 1 AM
 */

import { detectOpportunities } from '@/lib/search-dominance/intelligence/blue-ocean-detector';
import { emitBlueOceanUpdate, emitJobComplete } from '@/lib/search-dominance/realtime/events';
import type { JobResult } from '@/lib/search-dominance/types/search-dominance-types';

/**
 * Process Blue Ocean opportunity scan
 */
export async function processBlueOceanScan(
  progress?: (current: number, total: number, status: string) => void
): Promise<JobResult> {
  const startTime = Date.now();
  const errors: string[] = [];
  const warnings: string[] = [];

  try {
    console.log('[Blue Ocean] Starting weekly opportunity scan...');

    if (progress) {
      progress(0, 6, 'Initializing Blue Ocean scanner...');
    }

    // Run detection algorithms
    const result = await detectOpportunities({
      algorithms: ['all'], // Run all 6 algorithms
      minScore: 50, // Only save opportunities with score >= 50
      skipDeduplication: false, // Deduplicate opportunities
      limit: 100, // Max 100 opportunities
    });

    if (progress) {
      progress(6, 6, `Detected ${result.opportunities.length} opportunities`);
    }

    // Log results
    console.log(`[Blue Ocean] Scan complete:`);
    console.log(`  - Total detected: ${result.stats.totalDetected}`);
    console.log(`  - After dedup: ${result.opportunities.length}`);
    console.log(`  - Duplicates removed: ${result.stats.duplicatesRemoved}`);
    console.log(`  - By algorithm:`, result.stats.byAlgorithm);
    console.log(`  - By priority:`, result.stats.byPriority);

    // Emit WebSocket event for dashboard
    emitBlueOceanUpdate({
      totalOpportunities: result.opportunities.length,
      criticalCount: result.stats.byPriority.CRITICAL || 0,
      highCount: result.stats.byPriority.HIGH || 0,
      byAlgorithm: result.stats.byAlgorithm,
      timestamp: new Date().toISOString(),
    });

    // Check for warnings
    if (result.stats.totalDetected === 0) {
      warnings.push('No opportunities detected - check API credentials and data sources');
    }

    if (result.stats.byPriority.CRITICAL > 10) {
      warnings.push(
        `High number of CRITICAL opportunities (${result.stats.byPriority.CRITICAL}) - immediate action recommended`
      );
    }

    const duration = Date.now() - startTime;
    const jobResult: JobResult = {
      success: true,
      recordsProcessed: result.stats.totalDetected,
      recordsCreated: result.opportunities.length,
      errors,
      warnings,
      duration,
      completedAt: new Date(),
    };

    // Emit job completion event
    emitJobComplete('blue-ocean-scan', jobResult);

    return jobResult;
  } catch (error) {
    const errorMsg = error instanceof Error ? error.message : 'Unknown error';
    errors.push(errorMsg);
    console.error('[Blue Ocean] Scan failed:', error);

    if (progress) {
      progress(0, 6, `Failed: ${errorMsg}`);
    }

    const duration = Date.now() - startTime;
    const jobResult: JobResult = {
      success: false,
      recordsProcessed: 0,
      recordsCreated: 0,
      errors,
      warnings,
      duration,
      completedAt: new Date(),
    };

    emitJobComplete('blue-ocean-scan', jobResult);

    return jobResult;
  }
}
