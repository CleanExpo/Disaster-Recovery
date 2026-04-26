#!/usr/bin/env tsx
/**
 * Google Places API audit — DR-458.
 *
 * Read-only audit script that pulls our Google Business Profile
 * listing live from the Places API (New) and compares the result
 * against the values cached + fallback values used by
 * `app/api/rating/route.ts`.
 *
 * Surfaces:
 * - Rating / review-count drift (e.g. listing flipped to a lower
 *   rating without us noticing).
 * - Fallback-stuck signals (the route falls back when the API errors;
 *   if the live API now returns a value far from the fallback, we
 *   want to know).
 * - Status anomalies (CLOSED_PERMANENTLY, CLOSED_TEMPORARILY,
 *   OPERATIONAL).
 *
 * No writes. No compliance_events emission. Stdout only.
 *
 * Run via:
 *   GOOGLE_PLACES_API_KEY=... npx tsx scripts/audit-google-places.ts
 *
 * Or, after the next package.json update:
 *   npm run audit:gbp-rating
 *
 * Exit codes:
 *   0 — audit ran cleanly, no anomalies above threshold.
 *   1 — audit ran cleanly, anomalies surfaced (read stdout).
 *   2 — audit could not run (missing API key, network error,
 *       Places API rejected the request).
 *
 * NOT LEGAL ADVICE. Place Details Basic fields used here are free
 * tier ($0/request). See docs/adr/ADR-005 for observability framing.
 */

import { GBP_PLACE_ID } from '@/lib/constants';

// ---------------------------------------------------------------------------
// Config
// ---------------------------------------------------------------------------

/** Fallback values used by the live route when Places API is unavailable. */
const ROUTE_FALLBACK_RATING = 4.7;
const ROUTE_FALLBACK_REVIEW_COUNT = 49;

/** Threshold beyond which a delta is treated as an anomaly. */
const RATING_DRIFT_THRESHOLD = 0.3;
const REVIEW_COUNT_DRIFT_THRESHOLD_PCT = 20; // percent

interface PlaceDetailsResponse {
  rating?: number;
  userRatingCount?: number;
  businessStatus?: 'OPERATIONAL' | 'CLOSED_TEMPORARILY' | 'CLOSED_PERMANENTLY';
  displayName?: { text?: string };
  formattedAddress?: string;
}

interface AuditFinding {
  severity: 'INFO' | 'WARN' | 'ALERT';
  message: string;
}

// ---------------------------------------------------------------------------
// Audit
// ---------------------------------------------------------------------------

async function fetchPlaceDetails(apiKey: string): Promise<PlaceDetailsResponse> {
  const url = `https://places.googleapis.com/v1/places/${GBP_PLACE_ID}`;
  const fieldMask = [
    'rating',
    'userRatingCount',
    'businessStatus',
    'displayName',
    'formattedAddress',
  ].join(',');

  const response = await fetch(url, {
    headers: {
      'X-Goog-Api-Key': apiKey,
      'X-Goog-FieldMask': fieldMask,
    },
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Places API ${response.status}: ${errorText}`);
  }

  return (await response.json()) as PlaceDetailsResponse;
}

function audit(data: PlaceDetailsResponse): AuditFinding[] {
  const findings: AuditFinding[] = [];

  // Status check
  if (data.businessStatus && data.businessStatus !== 'OPERATIONAL') {
    findings.push({
      severity: 'ALERT',
      message: `Business status is ${data.businessStatus} — site copy + claim flow assume OPERATIONAL`,
    });
  } else {
    findings.push({
      severity: 'INFO',
      message: `Business status: ${data.businessStatus ?? 'unknown'}`,
    });
  }

  // Rating drift
  if (typeof data.rating === 'number') {
    const ratingDelta = Math.abs(data.rating - ROUTE_FALLBACK_RATING);
    if (ratingDelta > RATING_DRIFT_THRESHOLD) {
      findings.push({
        severity: 'WARN',
        message: `Rating drift: live ${data.rating.toFixed(1)} vs fallback ${ROUTE_FALLBACK_RATING.toFixed(1)} (delta ${ratingDelta.toFixed(2)} > ${RATING_DRIFT_THRESHOLD}). Update FALLBACK_RATING in app/api/rating/route.ts.`,
      });
    } else {
      findings.push({
        severity: 'INFO',
        message: `Rating: ${data.rating.toFixed(1)} (fallback ${ROUTE_FALLBACK_RATING.toFixed(1)}, drift ${ratingDelta.toFixed(2)})`,
      });
    }
  } else {
    findings.push({
      severity: 'WARN',
      message: 'Live API returned no rating — listing may be too new or flagged',
    });
  }

  // Review count drift
  if (typeof data.userRatingCount === 'number') {
    const reviewDelta = Math.abs(data.userRatingCount - ROUTE_FALLBACK_REVIEW_COUNT);
    const reviewDeltaPct =
      ROUTE_FALLBACK_REVIEW_COUNT === 0 ? 100 : (reviewDelta / ROUTE_FALLBACK_REVIEW_COUNT) * 100;
    if (reviewDeltaPct > REVIEW_COUNT_DRIFT_THRESHOLD_PCT) {
      findings.push({
        severity: 'WARN',
        message: `Review-count drift: live ${data.userRatingCount} vs fallback ${ROUTE_FALLBACK_REVIEW_COUNT} (${reviewDeltaPct.toFixed(0)}% > ${REVIEW_COUNT_DRIFT_THRESHOLD_PCT}%). Update FALLBACK_REVIEW_COUNT.`,
      });
    } else {
      findings.push({
        severity: 'INFO',
        message: `Review count: ${data.userRatingCount} (fallback ${ROUTE_FALLBACK_REVIEW_COUNT})`,
      });
    }
  } else {
    findings.push({
      severity: 'WARN',
      message: 'Live API returned no review count',
    });
  }

  // Identity sanity check
  const name = data.displayName?.text ?? '(none)';
  findings.push({
    severity: 'INFO',
    message: `Listing name: "${name}"`,
  });
  if (data.formattedAddress) {
    findings.push({
      severity: 'INFO',
      message: `Listing address: ${data.formattedAddress}`,
    });
  }

  return findings;
}

function formatFindings(findings: AuditFinding[]): string {
  return findings.map((f) => `  [${f.severity.padEnd(5)}] ${f.message}`).join('\n');
}

// ---------------------------------------------------------------------------
// Entry point
// ---------------------------------------------------------------------------

async function main(): Promise<number> {
  const apiKey = process.env.GOOGLE_PLACES_API_KEY;
  if (!apiKey) {
    console.error(
      'GOOGLE_PLACES_API_KEY is not set. Export it from your shell or use Vercel env pull.',
    );
    return 2;
  }

  console.log(`GBP audit — Place ID ${GBP_PLACE_ID}`);
  console.log(`Started at ${new Date().toISOString()}`);
  console.log('');

  let data: PlaceDetailsResponse;
  try {
    data = await fetchPlaceDetails(apiKey);
  } catch (err) {
    console.error('Places API call failed:', err instanceof Error ? err.message : err);
    return 2;
  }

  const findings = audit(data);
  console.log('Findings:');
  console.log(formatFindings(findings));
  console.log('');

  const anomalyCount = findings.filter((f) => f.severity !== 'INFO').length;
  if (anomalyCount === 0) {
    console.log('Audit clean. No anomalies above threshold.');
    return 0;
  }

  console.log(`Audit found ${anomalyCount} anomaly/anomalies above threshold.`);
  console.log('Action: review WARN/ALERT findings, update fallback constants if drift confirmed.');
  return 1;
}

main()
  .then((code) => process.exit(code))
  .catch((err) => {
    console.error('Unhandled audit error:', err);
    process.exit(2);
  });
