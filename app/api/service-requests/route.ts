import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth-middleware';
import { serviceRequestSchema } from '@/lib/validation-schemas';
import { handleValidationError, handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { LeadScoringService } from '@/lib/lead-scoring-service';
import { EnhancedMatchingServiceV2 } from '@/lib/enhanced-matching-service-v2';
import { ZodError } from 'zod';

/**
 * POST /api/service-requests
 * Creates a new service request with automated matching
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Parse and validate request body
    const body = await request.json();
    const validatedData = serviceRequestSchema.parse(body);

    // Calculate lead score
    const leadScore = LeadScoringService.calculateLeadScore({
      serviceCategory: validatedData.serviceCategory,
      urgency: validatedData.urgency,
      budget: validatedData.budget,
      description: validatedData.description,
      location: validatedData.location,
      phone: validatedData.phone,
      insurance: validatedData.insurance || false,
      urgentResponse: validatedData.urgentResponse || false,
      preferredTime: validatedData.preferredTime,
    });

    // Create service request
    const serviceRequest = await prisma.serviceRequest.create({
      data: {
        userId: user.id,
        serviceCategory: validatedData.serviceCategory,
        urgency: validatedData.urgency,
        serviceTitle: validatedData.serviceTitle,
        description: validatedData.description,
        location: validatedData.location,
        budget: validatedData.budget ?? undefined,
        phone: validatedData.phone ?? undefined,
        preferredTime: validatedData.preferredTime ?? undefined,
        insurance: validatedData.insurance || false,
        urgentResponse: validatedData.urgentResponse || false,
        status: 'PENDING',
        leadScore,
      },
    });

    // Find matching contractors (non-blocking)
    try {
      const matches = await EnhancedMatchingServiceV2.findMatchingContractorsForClient(
        serviceRequest.id,
        {
          serviceCategory: validatedData.serviceCategory,
          location: validatedData.location,
          urgency: validatedData.urgency,
          budget: validatedData.budget ? parseFloat(validatedData.budget) : undefined,
          leadScore,
          tenantId: user.tenantId,
        }
      );

      // NRPG uses private, automatic dispatch. Notifications are handled by operations workflows.
    } catch (error) {
      console.error('[SERVICE_REQUEST] Matching process failed:', error);
      // Don't fail request creation if matching fails
    }

    return NextResponse.json(
      {
        success: true,
        data: serviceRequest,
        leadScore,
        message: 'Service request created successfully.',
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

/**
 * GET /api/service-requests
 * Retrieves service requests for authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Fetch user's service requests
    const serviceRequests = await prisma.serviceRequest.findMany({
      where: { userId: user.id },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({
      success: true,
      data: serviceRequests,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
