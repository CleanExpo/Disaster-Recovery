/**
 * Local Backlinks API Route - NRPG Platform
 *
 * Endpoints for managing local backlink portfolio:
 * - GET: List backlinks, prospects, templates, or generate reports
 * - POST: Track new backlinks, conduct outreach, analyze competitors
 * - PATCH: Update backlink or prospect status
 */

import { NextRequest, NextResponse } from 'next/server';
import { backlinkTracker } from '@/lib/seo/backlink-tracker';
import { BacklinkSourceType, AustralianStateCode } from '@/lib/seo/local-seo-types';

export const dynamic = 'force-dynamic';

// =============================================================================
// GET - List backlinks, prospects, or generate reports
// =============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const sourceType = searchParams.get('sourceType') as BacklinkSourceType | null;
    const stateCode = searchParams.get('state') as AustralianStateCode | null;
    const status = searchParams.get('status');
    const limit = parseInt(searchParams.get('limit') || '50', 10);

    // Generate backlink report
    if (action === 'report') {
      const result = await backlinkTracker.generateBacklinkReport();
      return NextResponse.json(result);
    }

    // Get prospect statistics
    if (action === 'prospectStats') {
      const stats = backlinkTracker.getProspectStats();
      return NextResponse.json({
        success: true,
        data: stats,
      });
    }

    // Get priority prospects
    if (action === 'priorityProspects') {
      const minPriority = parseInt(searchParams.get('minPriority') || '7', 10);
      const prospects = backlinkTracker.getPriorityProspects(minPriority);
      return NextResponse.json({
        success: true,
        data: {
          prospects: prospects.slice(0, limit),
          count: prospects.length,
        },
      });
    }

    // Identify local opportunities
    if (action === 'opportunities') {
      const result = await backlinkTracker.identifyLocalOpportunities();
      return NextResponse.json(result);
    }

    // Get outreach templates
    if (action === 'templates') {
      const templates = backlinkTracker.getAllTemplates();
      return NextResponse.json({
        success: true,
        data: {
          templates,
          count: templates.length,
        },
      });
    }

    // Get backlinks by filters
    let backlinks = backlinkTracker.getAllBacklinks();
    let prospects = backlinkTracker.getAllProspects();

    if (sourceType) {
      backlinks = backlinkTracker.getBacklinksBySourceType(sourceType);
      prospects = backlinkTracker.getProspectsBySourceType(sourceType);
    }

    if (stateCode) {
      backlinks = backlinkTracker.getBacklinksByState(stateCode);
      prospects = backlinkTracker.getProspectsByState(stateCode);
    }

    if (status) {
      prospects = backlinkTracker.getProspectsByStatus(status as any);
    }

    // Local backlinks only
    if (action === 'local') {
      backlinks = backlinkTracker.getLocalBacklinks();
    }

    return NextResponse.json({
      success: true,
      data: {
        backlinks: backlinks.slice(0, limit),
        totalBacklinks: backlinks.length,
        prospects: prospects.slice(0, limit),
        totalProspects: prospects.length,
        filters: { sourceType, stateCode, status },
        sourceTypes: [
          'news',
          'trade_association',
          'insurance',
          'real_estate',
          'government',
          'blog',
          'directory',
          'social',
          'forum',
          'other',
        ],
      },
    });
  } catch (error) {
    console.error('[Backlinks API] GET error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
    }, { status: 500 });
  }
}

// =============================================================================
// POST - Track backlinks, conduct outreach, or analyze competitors
// =============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // Add new backlink
    if (action === 'addBacklink') {
      const {
        sourceDomain,
        sourceUrl,
        targetUrl,
        anchorText,
        linkType,
        sourceType,
        isLocalRelevance,
        stateRelevance,
        cityRelevance,
        domainAuthority,
        pageAuthority,
      } = body;

      if (!sourceDomain || !sourceUrl || !targetUrl) {
        return NextResponse.json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'sourceDomain, sourceUrl, and targetUrl are required' },
        }, { status: 400 });
      }

      const backlink = backlinkTracker.addBacklink({
        sourceDomain,
        sourceUrl,
        targetUrl,
        anchorText: anchorText || '',
        linkType: linkType || 'dofollow',
        sourceType: sourceType || 'other',
        isLocalRelevance: isLocalRelevance ?? true,
        stateRelevance,
        cityRelevance,
        domainAuthority: domainAuthority || 0,
        pageAuthority,
        isLive: true,
        status: 'active',
      });

      return NextResponse.json({
        success: true,
        data: backlink,
      }, { status: 201 });
    }

    // Track/verify all backlinks
    if (action === 'track') {
      const result = await backlinkTracker.trackBacklinks();
      return NextResponse.json(result);
    }

    // Conduct outreach to prospects
    if (action === 'outreach') {
      const { prospectIds, templateId, customSubject, customBody } = body;

      if (!prospectIds || !Array.isArray(prospectIds) || prospectIds.length === 0) {
        return NextResponse.json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'prospectIds array is required' },
        }, { status: 400 });
      }

      const result = await backlinkTracker.conductOutreach(prospectIds, {
        templateId,
        customSubject,
        customBody,
      });

      return NextResponse.json(result);
    }

    // Analyze competitor backlinks
    if (action === 'analyzeCompetitors') {
      const { competitors } = body;

      if (!competitors || !Array.isArray(competitors) || competitors.length === 0) {
        return NextResponse.json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'competitors array is required' },
        }, { status: 400 });
      }

      const result = await backlinkTracker.trackCompetitorBacklinks(competitors);
      return NextResponse.json(result);
    }

    return NextResponse.json({
      success: false,
      error: { code: 'INVALID_ACTION', message: `Unknown action: ${action}` },
    }, { status: 400 });
  } catch (error) {
    console.error('[Backlinks API] POST error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
    }, { status: 500 });
  }
}

// =============================================================================
// PATCH - Update backlink or prospect status
// =============================================================================

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { prospectId, updates } = body;

    if (!prospectId) {
      return NextResponse.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'prospectId is required' },
      }, { status: 400 });
    }

    const updated = backlinkTracker.updateProspect(prospectId, updates);

    if (!updated) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: `Prospect ${prospectId} not found` },
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('[Backlinks API] PATCH error:', error);
    return NextResponse.json({
      success: false,
      error: {
        code: 'INTERNAL_ERROR',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
      },
    }, { status: 500 });
  }
}
