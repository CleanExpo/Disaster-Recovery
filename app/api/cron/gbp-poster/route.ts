/**
 * CRON: GBP Poster — Weekly Google Business Profile posts
 *
 * Scheduled: Monday 05:00 AEST (19:00 UTC Sunday) via vercel.json
 * Posts one service update per week, rotating through 6 services.
 *
 * Rotation: Week 1 = water-damage-restoration, Week 2 = fire-damage-restoration, etc.
 * Each service has 8 post variants that cycle every 8 weeks.
 *
 * UNI-768 / UNI-727
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  isGBPEnabled,
  validateGBPConfig,
  createLocalPost,
  mapCtaAction,
} from '@/lib/gbp/client';
import {
  postTemplates,
  getWeekNumber,
  interpolatePost,
} from '@/lib/gbp/post-templates';

export const maxDuration = 30;

// The city name shown in GBP posts (main listing location)
const GBP_CITY = process.env.GBP_CITY || 'Brisbane';

// Service rotation order — one service per week
const SERVICE_ROTATION = [
  'water-damage-restoration',
  'fire-damage-restoration',
  'mould-remediation',
  'storm-damage-repairs',
  'flood-recovery',
  'emergency-restoration',
];

export async function GET(request: NextRequest) {
  try {
    // ── Auth ──
    const authHeader = request.headers.get('authorization');
    const cronSecret = process.env.CRON_SECRET;

    if (cronSecret && authHeader !== `Bearer ${cronSecret}`) {
      return NextResponse.json(
        { success: false, error: 'Unauthorised' },
        { status: 401 },
      );
    }

    // ── Kill switch ──
    if (!isGBPEnabled()) {
      return NextResponse.json({
        success: true,
        skipped: true,
        reason: 'GBP automation disabled (GBP_ENABLED != "true")',
      });
    }

    // ── Config validation ──
    const missing = validateGBPConfig();
    if (missing.length > 0) {
      return NextResponse.json(
        {
          success: false,
          error: `Missing env vars: ${missing.join(', ')}`,
        },
        { status: 500 },
      );
    }

    // ── Determine this week's service ──
    const weekNum = getWeekNumber();
    const serviceIndex = weekNum % SERVICE_ROTATION.length;
    const serviceSlug = SERVICE_ROTATION[serviceIndex];

    // ── Find the template and pick the variant ──
    const template = postTemplates.find((t) => t.service === serviceSlug);
    if (!template) {
      return NextResponse.json(
        { success: false, error: `No template found for service: ${serviceSlug}` },
        { status: 500 },
      );
    }

    const variantIndex = weekNum % template.variants.length;
    const variant = template.variants[variantIndex];

    // ── Interpolate city name ──
    const summary = interpolatePost(variant.summary, GBP_CITY);
    const ctaUrl = `https://disasterrecovery.com.au${variant.ctaPath}`;

    // ── Post to GBP ──
    const result = await createLocalPost({
      summary,
      topicType: variant.topicType,
      callToAction: {
        actionType: mapCtaAction(variant.ctaText),
        url: ctaUrl,
      },
    });

    return NextResponse.json({
      success: result.success,
      week: weekNum,
      service: serviceSlug,
      variantIndex,
      city: GBP_CITY,
      summaryPreview: summary.slice(0, 100) + '...',
      ctaUrl,
      postName: result.postName,
      error: result.error,
    });
  } catch (error: unknown) {
    const message = error instanceof Error ? error.message : String(error);
    return NextResponse.json(
      { success: false, error: message },
      { status: 500 },
    );
  }
}
