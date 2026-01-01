/**
 * Service Request Search API Route
 * Handles searching and filtering service requests
 * GET /api/service-requests/search - Search for service requests
 */

import { NextRequest, NextResponse } from 'next/server';
import { ZodError } from 'zod';
import { authenticateRequest } from '@/lib/auth-middleware';
import { isAdmin } from '@/lib/auth';
import { ServiceRequestSearchService } from '@/lib/service-request-search-service';
import { serviceRequestSearchSchema } from '@/lib/validation-schemas';
import {
  handleValidationError,
  handleUnexpectedError,
} from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

// ============================================================================
// GET /api/service-requests/search - Search for service requests
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const rawParams = {
      query: searchParams.get('q') ?? searchParams.get('query') ?? undefined,
      serviceCategory: searchParams.get('category') ?? searchParams.get('serviceCategory') ?? undefined,
      status: searchParams.get('status') ?? undefined,
      location: searchParams.get('location') ?? undefined,
      limit: searchParams.get('limit') ?? undefined,
      offset: searchParams.get('offset') ?? undefined,
      createdAfter: searchParams.get('createdAfter') ?? undefined,
      createdBefore: searchParams.get('createdBefore') ?? undefined,
    };

    // Remove undefined values for cleaner validation
    const cleanParams = Object.fromEntries(
      Object.entries(rawParams).filter(([, value]) => value !== undefined)
    );

    // Validate parameters using Zod schema
    const validatedParams = serviceRequestSearchSchema.parse(cleanParams);

    // Build search filters from validated params
    const filters = {
      query: validatedParams.query,
      serviceCategory: validatedParams.serviceCategory,
      status: validatedParams.status,
      location: validatedParams.location,
      createdAfter: validatedParams.createdAfter,
      createdBefore: validatedParams.createdBefore,
    };

    const pagination = {
      limit: validatedParams.limit,
      offset: validatedParams.offset,
    };

    // Execute search based on user role
    // Clients see only their own requests, admins see all
    const isUserAdmin = isAdmin(user.userType);

    const results = isUserAdmin
      ? await ServiceRequestSearchService.searchAll(filters, pagination)
      : await ServiceRequestSearchService.searchForUser(user.id, filters, pagination);

    return NextResponse.json({
      success: true,
      data: results.data,
      total: results.total,
      count: results.count,
      pagination: results.pagination,
      searchCriteria: {
        query: validatedParams.query || null,
        serviceCategory: validatedParams.serviceCategory || null,
        status: validatedParams.status || null,
        location: validatedParams.location || null,
        createdAfter: validatedParams.createdAfter?.toISOString() || null,
        createdBefore: validatedParams.createdBefore?.toISOString() || null,
      },
      userScope: isUserAdmin ? 'all' : 'own',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
