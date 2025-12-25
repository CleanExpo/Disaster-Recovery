import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleValidationError, handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { z, ZodError } from 'zod';

const bidSchema = z.object({
  budget: z.string().min(1),
  timeline: z.string().min(1),
  message: z.string().min(1).max(5000),
  startDate: z.string().optional(),
  estimatedHours: z.string().optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    const body = await request.json();
    const { budget, timeline, message, startDate, estimatedHours } = bidSchema.parse(body);

    // Get contractor profile
    const contractorProfile = await prisma.contractorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!contractorProfile) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Contractor profile not found',
        404
      );
    }

    // Check if contractor has a match for this request, create if not exists
    let existingMatch = await prisma.contractorMatch.findFirst({
      where: {
        contractorId: contractorProfile.id,
        serviceRequestId: params.id,
      },
    });

    // If no match exists, create one (this allows contractors to bid on any visible request)
    if (!existingMatch) {
      existingMatch = await prisma.contractorMatch.create({
        data: {
          contractorId: contractorProfile.id,
          serviceRequestId: params.id,
          matchScore: 50, // Default score for manual bidding
          status: 'PENDING',
        },
      });
    }

    // Get service request
    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: params.id },
    });

    if (!serviceRequest) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Service request not found',
        404
      );
    }

    if (serviceRequest.status !== 'PENDING') {
      return createErrorResponse(
        ErrorCode.INVALID_INPUT,
        'This request is no longer accepting bids',
        400
      );
    }

    // Update the contractor match with bid details
    const updatedMatch = await prisma.contractorMatch.update({
      where: {
        id: existingMatch.id,
      },
      data: {
        contractorMessage: message,
        budget: budget,
        timeline: timeline,
        startDate: startDate,
        estimatedHours: estimatedHours,
        status: 'PENDING',
      },
    });

    return NextResponse.json({
      success: true,
      bid: updatedMatch,
      message: 'Bid submitted successfully',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
