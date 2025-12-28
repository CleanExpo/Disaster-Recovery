/**
 * Local Citations API Route - NRPG Platform
 *
 * Endpoints for managing local business citations:
 * - GET: List directories, submissions, check NAP consistency
 * - POST: Submit to directories, bulk operations
 * - PATCH: Update citation status
 */

import { NextRequest, NextResponse } from 'next/server';
import { citationManager, CITATION_DIRECTORIES } from '@/lib/seo/citation-manager';
import { DirectoryCategory, AustralianStateCode } from '@/lib/seo/local-seo-types';
import { EMERGENCY_PHONE } from '@/lib/design-tokens';
import citiesData from '@/data/australian-cities.json';

export const dynamic = 'force-dynamic';

// =============================================================================
// GET - List directories, submissions, or check NAP consistency
// =============================================================================

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const action = searchParams.get('action');
    const category = searchParams.get('category') as DirectoryCategory | null;
    const stateCode = searchParams.get('state') as AustralianStateCode | null;
    const city = searchParams.get('city');
    const limit = parseInt(searchParams.get('limit') || '100', 10);

    // Get directory statistics
    if (action === 'stats') {
      const stats = citationManager.getDirectoryStats();
      return NextResponse.json({
        success: true,
        data: stats,
      });
    }

    // Generate citation report
    if (action === 'report') {
      const report = await citationManager.generateCitationReport();
      return NextResponse.json({
        success: true,
        data: report,
      });
    }

    // Check NAP consistency
    if (action === 'napCheck') {
      const canonicalNAP = {
        name: 'NRPG - National Restoration Professionals Group',
        address: 'Australia',
        phone: EMERGENCY_PHONE.number,
        website: 'https://disasterrecoverynrpg.com.au',
        addressParts: {
          street: '',
          suburb: '',
          state: '',
          postcode: '',
          country: 'Australia',
        },
      };

      const result = await citationManager.checkNAPConsistency(canonicalNAP);
      return NextResponse.json(result);
    }

    // Get pending submissions
    if (action === 'pending') {
      const pending = citationManager.getPendingSubmissions();
      return NextResponse.json({
        success: true,
        data: {
          submissions: pending,
          count: pending.length,
        },
      });
    }

    // Get all submissions
    if (action === 'submissions') {
      const submissions = citationManager.getAllSubmissions();
      return NextResponse.json({
        success: true,
        data: {
          submissions,
          count: submissions.length,
        },
      });
    }

    // Get directories by filters
    let directories = citationManager.getAllDirectories();

    if (category) {
      directories = citationManager.getDirectoriesByCategory(category);
    }

    if (stateCode) {
      directories = directories.filter(d => !d.stateCode || d.stateCode === stateCode);
    }

    if (city) {
      directories = directories.filter(d => !d.city || d.city.toLowerCase() === city.toLowerCase());
    }

    // Get priority directories
    if (action === 'priority') {
      directories = citationManager.getPriorityDirectories(limit);
    }

    return NextResponse.json({
      success: true,
      data: {
        directories: directories.slice(0, limit),
        totalDirectories: directories.length,
        categories: ['national', 'local', 'industry', 'social', 'maps'] as DirectoryCategory[],
        filters: { category, stateCode, city },
      },
    });
  } catch (error) {
    console.error('[Citations API] GET error:', error);
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
// POST - Submit to directories or bulk operations
// =============================================================================

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { action } = body;

    // Submit to specific directories
    if (action === 'submit') {
      const { name, address, phone, website, directories, category, stateCode, city, limit } = body;

      if (!name) {
        return NextResponse.json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'Business name is required' },
        }, { status: 400 });
      }

      const businessData = {
        name,
        address: address || 'Australia',
        addressParts: {
          street: '',
          suburb: city || '',
          state: stateCode || '',
          postcode: '',
          country: 'Australia',
        },
        phone: phone || EMERGENCY_PHONE.number,
        website: website || 'https://disasterrecoverynrpg.com.au',
      };

      const result = await citationManager.submitToDirectories(businessData, {
        directories,
        category,
        stateCode,
        city,
        limit: limit || 100,
      });

      return NextResponse.json(result, { status: 201 });
    }

    // Submit for a specific city
    if (action === 'submitCity') {
      const { city, stateCode } = body;

      if (!city || !stateCode) {
        return NextResponse.json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'city and stateCode are required' },
        }, { status: 400 });
      }

      const cityData = citiesData.cities.find(
        c => c.city.toLowerCase() === city.toLowerCase() || c.slug === city.toLowerCase()
      );

      if (!cityData) {
        return NextResponse.json({
          success: false,
          error: { code: 'NOT_FOUND', message: `City "${city}" not found` },
        }, { status: 404 });
      }

      const stateName = getStateName(stateCode as AustralianStateCode);
      const result = await citationManager.submitForCity(cityData.city, stateCode as AustralianStateCode, stateName);

      return NextResponse.json(result, { status: 201 });
    }

    // Initialize all cities
    if (action === 'initAll') {
      const result = await citationManager.initializeAllCities();
      return NextResponse.json(result, { status: 201 });
    }

    // Bulk update NAP data
    if (action === 'updateNAP') {
      const { changes } = body;

      if (!changes) {
        return NextResponse.json({
          success: false,
          error: { code: 'VALIDATION_ERROR', message: 'changes object is required' },
        }, { status: 400 });
      }

      const result = await citationManager.updateCitations(changes);
      return NextResponse.json(result);
    }

    return NextResponse.json({
      success: false,
      error: { code: 'INVALID_ACTION', message: `Unknown action: ${action}` },
    }, { status: 400 });
  } catch (error) {
    console.error('[Citations API] POST error:', error);
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
// PATCH - Update citation submission status
// =============================================================================

export async function PATCH(request: NextRequest) {
  try {
    const body = await request.json();
    const { submissionId, status, liveUrl, notes } = body;

    if (!submissionId) {
      return NextResponse.json({
        success: false,
        error: { code: 'VALIDATION_ERROR', message: 'submissionId is required' },
      }, { status: 400 });
    }

    const updates: Record<string, unknown> = {};
    if (status) updates.status = status;
    if (liveUrl) {
      updates.liveUrl = liveUrl;
      updates.approvedAt = new Date();
    }
    if (notes) updates.notes = notes;

    const updated = citationManager.updateSubmission(submissionId, updates as any);

    if (!updated) {
      return NextResponse.json({
        success: false,
        error: { code: 'NOT_FOUND', message: `Submission ${submissionId} not found` },
      }, { status: 404 });
    }

    return NextResponse.json({
      success: true,
      data: updated,
    });
  } catch (error) {
    console.error('[Citations API] PATCH error:', error);
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
// Helper Functions
// =============================================================================

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
