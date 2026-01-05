/**
 * Traffic Sync Job
 *
 * Syncs organic traffic data from:
 * - Google Search Console (impressions, clicks, CTR, position)
 * - Google Analytics 4 (sessions, conversions, user behaviour)
 *
 * Stores data in TrafficRecord table and detects anomalies.
 *
 * Schedule: Every 1 hour
 */

import { prisma } from '@/lib/database/prisma-client';
import {
  emitTrafficUpdate,
  emitTrafficAnomaly,
  emitJobComplete,
} from '../realtime/events';
import type {
  TrafficData,
  TrafficAnomaly,
  JobResult,
} from '../types/search-dominance-types';

// Configuration
const ANOMALY_THRESHOLD = 30; // Alert if traffic changes by ±30%
const LOOKBACK_HOURS = 24; // Compare against last 24 hours average

/**
 * Fetch data from Google Search Console API
 */
async function fetchGSCData(): Promise<Partial<TrafficData>[]> {
  // TODO: Implement Google Search Console API integration
  // For now, return mock data

  console.log('[Traffic Sync] Fetching Google Search Console data...');

  // Example implementation (uncomment when GSC API is configured):
  /*
  const { google } = require('googleapis');
  const searchconsole = google.searchconsole('v1');

  const auth = new google.auth.GoogleAuth({
    credentials: JSON.parse(process.env.GOOGLE_SEARCH_CONSOLE_CREDENTIALS || '{}'),
    scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
  });

  const response = await searchconsole.searchanalytics.query({
    auth,
    siteUrl: 'https://disasterrecovery.com.au',
    requestBody: {
      startDate: getDateString(-1), // Yesterday
      endDate: getDateString(-1),
      dimensions: ['page', 'country', 'device'],
      rowLimit: 1000,
    },
  });

  return response.data.rows?.map(row => ({
    impressions: row.impressions,
    clicks: row.clicks,
    ctr: row.ctr,
    location: row.keys[1], // Country
    landingPage: row.keys[0], // Page
    device: row.keys[2], // Device
    source: 'google-search-console',
  })) || [];
  */

  // Mock data for development
  return [
    {
      impressions: 15420,
      clicks: 1247,
      ctr: 0.081,
      location: 'Australia',
      landingPage: '/',
      device: 'desktop',
      source: 'google-search-console' as const,
    },
  ];
}

/**
 * Fetch data from Google Analytics 4 API
 */
async function fetchGA4Data(): Promise<Partial<TrafficData>[]> {
  // TODO: Implement Google Analytics 4 Data API integration
  // For now, return mock data

  console.log('[Traffic Sync] Fetching Google Analytics 4 data...');

  // Example implementation (uncomment when GA4 API is configured):
  /*
  const { BetaAnalyticsDataClient } = require('@google-analytics/data');

  const analyticsDataClient = new BetaAnalyticsDataClient({
    credentials: JSON.parse(process.env.GOOGLE_SEARCH_CONSOLE_CREDENTIALS || '{}'),
  });

  const [response] = await analyticsDataClient.runReport({
    property: `properties/${process.env.GA4_PROPERTY_ID}`,
    dateRanges: [
      {
        startDate: '1daysAgo',
        endDate: '1daysAgo',
      },
    ],
    dimensions: [
      { name: 'pagePath' },
      { name: 'country' },
      { name: 'deviceCategory' },
    ],
    metrics: [
      { name: 'sessions' },
      { name: 'conversions' },
    ],
  });

  return response.rows?.map(row => ({
    organicSessions: parseInt(row.metricValues[0].value),
    conversions: parseInt(row.metricValues[1].value),
    landingPage: row.dimensionValues[0].value,
    location: row.dimensionValues[1].value,
    device: row.dimensionValues[2].value,
    source: 'ga4',
  })) || [];
  */

  // Mock data for development
  return [
    {
      organicSessions: 1247,
      conversions: 32,
      conversionRate: 0.0257,
      location: 'Australia',
      landingPage: '/',
      device: 'desktop',
      source: 'ga4' as const,
    },
  ];
}

/**
 * Merge GSC and GA4 data
 */
function mergeTrafficData(
  gscData: Partial<TrafficData>[],
  ga4Data: Partial<TrafficData>[]
): TrafficData[] {
  const merged: TrafficData[] = [];

  // Group by location + landingPage + device
  const dataMap = new Map<string, Partial<TrafficData>>();

  for (const data of [...gscData, ...ga4Data]) {
    const key = `${data.location}|${data.landingPage}|${data.device}`;
    const existing = dataMap.get(key) || {};

    dataMap.set(key, {
      ...existing,
      ...data,
    });
  }

  // Convert to TrafficData with defaults
  for (const [, data] of dataMap) {
    merged.push({
      organicSessions: data.organicSessions || 0,
      impressions: data.impressions || 0,
      clicks: data.clicks || 0,
      ctr: data.ctr || 0,
      conversions: data.conversions || 0,
      conversionRate: data.conversionRate || 0,
      location: data.location || null,
      landingPage: data.landingPage || null,
      device: data.device || null,
      source: 'combined',
      timestamp: new Date(),
    });
  }

  return merged;
}

/**
 * Save traffic data to database
 */
async function saveTrafficData(trafficData: TrafficData[]): Promise<number> {
  let savedCount = 0;

  for (const data of trafficData) {
    try {
      await prisma.trafficRecord.create({
        data: {
          organicSessions: data.organicSessions,
          impressions: data.impressions,
          clicks: data.clicks,
          ctr: data.ctr,
          conversions: data.conversions,
          conversionRate: data.conversionRate,
          location: data.location,
          landingPage: data.landingPage,
          device: data.device,
          source: data.source,
          timestamp: data.timestamp,
        },
      });

      savedCount++;
    } catch (error) {
      console.error('[Traffic Sync] Error saving traffic record:', error);
    }
  }

  return savedCount;
}

/**
 * Detect traffic anomalies
 */
async function detectAnomalies(currentData: TrafficData[]): Promise<TrafficAnomaly[]> {
  const anomalies: TrafficAnomaly[] = [];

  // Get average from last 24 hours
  const lookbackDate = new Date();
  lookbackDate.setHours(lookbackDate.getHours() - LOOKBACK_HOURS);

  const historicalData = await prisma.trafficRecord.findMany({
    where: {
      timestamp: {
        gte: lookbackDate,
      },
    },
  });

  if (historicalData.length === 0) {
    console.log('[Traffic Sync] No historical data for anomaly detection');
    return [];
  }

  // Calculate averages
  const avgSessions = historicalData.reduce((sum, r) => sum + r.organicSessions, 0) / historicalData.length;
  const avgImpressions = historicalData.reduce((sum, r) => sum + r.impressions, 0) / historicalData.length;
  const avgClicks = historicalData.reduce((sum, r) => sum + r.clicks, 0) / historicalData.length;
  const avgConversions = historicalData.reduce((sum, r) => sum + r.conversions, 0) / historicalData.length;

  // Check current data against averages
  for (const data of currentData) {
    const checks = [
      { metric: 'sessions' as const, current: data.organicSessions, previous: avgSessions },
      { metric: 'impressions' as const, current: data.impressions, previous: avgImpressions },
      { metric: 'clicks' as const, current: data.clicks, previous: avgClicks },
      { metric: 'conversions' as const, current: data.conversions, previous: avgConversions },
    ];

    for (const check of checks) {
      if (check.previous === 0) continue;

      const changePercent = ((check.current - check.previous) / check.previous) * 100;
      const absChange = Math.abs(changePercent);

      if (absChange >= ANOMALY_THRESHOLD) {
        const severity = changePercent > 0 ? 'spike' : 'drop';

        anomalies.push({
          metric: check.metric,
          current: check.current,
          previous: check.previous,
          changePercent,
          severity,
          timestamp: data.timestamp,
        });

        // Create alert
        await createAnomalyAlert(check.metric, changePercent, severity, data);
      }
    }
  }

  return anomalies;
}

/**
 * Create alert for traffic anomaly
 */
async function createAnomalyAlert(
  metric: string,
  changePercent: number,
  severity: 'spike' | 'drop',
  data: TrafficData
): Promise<void> {
  const isSpike = severity === 'spike';
  const alertSeverity = Math.abs(changePercent) >= 50 ? 'CRITICAL' : 'WARNING';

  await prisma.searchAlert.create({
    data: {
      type: isSpike ? 'traffic_spike' : 'traffic_drop',
      severity: alertSeverity,
      title: isSpike
        ? `Traffic Spike Detected: ${metric}`
        : `Traffic Drop Detected: ${metric}`,
      message: `${metric.charAt(0).toUpperCase() + metric.slice(1)} ${isSpike ? 'increased' : 'decreased'} by ${Math.abs(changePercent).toFixed(1)}% compared to 24-hour average.${
        data.location ? ` Location: ${data.location}.` : ''
      }${data.landingPage ? ` Page: ${data.landingPage}.` : ''}`,
      metric,
      newValue: changePercent.toFixed(1) + '%',
      actionRequired: alertSeverity === 'CRITICAL',
      actionUrl: '/dashboard/admin/search-dominance?tab=traffic',
    },
  });
}

/**
 * Main traffic sync job processor
 */
export async function processTrafficSync(
  progress?: (current: number, total: number, status: string) => void
): Promise<JobResult> {
  const startTime = Date.now();
  const errors: string[] = [];
  const warnings: string[] = [];

  console.log('[Traffic Sync] Starting traffic sync job...');

  try {
    // Step 1: Fetch GSC data
    if (progress) progress(1, 4, 'Fetching Google Search Console data');
    const gscData = await fetchGSCData();
    console.log(`[Traffic Sync] Fetched ${gscData.length} records from GSC`);

    // Step 2: Fetch GA4 data
    if (progress) progress(2, 4, 'Fetching Google Analytics 4 data');
    const ga4Data = await fetchGA4Data();
    console.log(`[Traffic Sync] Fetched ${ga4Data.length} records from GA4`);

    // Step 3: Merge data
    if (progress) progress(3, 4, 'Merging traffic data');
    const mergedData = mergeTrafficData(gscData, ga4Data);
    console.log(`[Traffic Sync] Merged into ${mergedData.length} traffic records`);

    // Step 4: Save to database
    if (progress) progress(4, 4, 'Saving to database');
    const savedCount = await saveTrafficData(mergedData);
    console.log(`[Traffic Sync] Saved ${savedCount} traffic records`);

    // Step 5: Detect anomalies
    console.log('[Traffic Sync] Detecting traffic anomalies...');
    const anomalies = await detectAnomalies(mergedData);
    console.log(`[Traffic Sync] Detected ${anomalies.length} anomalies`);

    // Emit traffic update event
    emitTrafficUpdate(mergedData);

    // Emit anomaly events
    for (const anomaly of anomalies) {
      emitTrafficAnomaly(anomaly);
    }

    const duration = Date.now() - startTime;
    console.log(`[Traffic Sync] Completed in ${duration}ms`);

    const result: JobResult = {
      success: true,
      recordsProcessed: mergedData.length,
      recordsCreated: savedCount,
      errors,
      warnings,
      duration,
      completedAt: new Date(),
    };

    // Emit job completion event
    emitJobComplete('traffic-sync', result);

    return result;
  } catch (error) {
    console.error('[Traffic Sync] Fatal error:', error);
    errors.push(error instanceof Error ? error.message : 'Unknown error');

    const result: JobResult = {
      success: false,
      recordsProcessed: 0,
      recordsCreated: 0,
      errors,
      warnings,
      duration: Date.now() - startTime,
      completedAt: new Date(),
    };

    // Emit job completion event (even on failure)
    emitJobComplete('traffic-sync', result);

    return result;
  }
}

/**
 * Export for Bull queue integration
 */
export default {
  name: 'traffic-sync',
  processor: processTrafficSync,
};
