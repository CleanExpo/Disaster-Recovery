import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError, ErrorCode, createErrorResponse } from '@/lib/api-errors';
import { prisma } from '@/lib/prisma';
import { z, ZodError } from 'zod';

const feedbackSchema = z.object({
  requestId: z.string(),
  rating: z.number().min(1).max(5),
  review: z.string().optional(),
  contractorId: z.string(),
});

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role authorization
    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    const body = await request.json();
    const { requestId, rating, review, contractorId } = feedbackSchema.parse(body);

    // Verify the request belongs to the user
    const serviceRequest = await prisma.serviceRequest.findFirst({
      where: {
        id: requestId,
        userId: user.id,
        status: 'COMPLETED'
      }
    });

    if (!serviceRequest) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Service request not found or not completed',
        404
      );
    }

    // In a real app, you would create a feedback/rating table
    // For now, we'll just return success

    // Update contractor rating (mock calculation)
    const contractor = await prisma.contractorProfile.findUnique({
      where: { id: contractorId }
    });

    if (contractor) {
      // Simple rating update (in real app, use proper averaging)
      const newRating = (contractor.rating + rating) / 2;
      await prisma.contractorProfile.update({
        where: { id: contractorId },
        data: {
          rating: newRating,
          totalJobs: contractor.totalJobs + 1
        }
      });
    }

    return NextResponse.json({
      success: true,
      message: 'Feedback submitted successfully'
    });

  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role authorization
    if (!requireRole(user, ['CLIENT', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN']);
    }

    const { searchParams } = new URL(request.url);
    const requestId = searchParams.get('requestId');

    if (!requestId) {
      return createErrorResponse(
        ErrorCode.MISSING_FIELDS,
        'Request ID is required',
        400
      );
    }

    // Get feedback for a specific request
    // In a real app, you would fetch from a feedback table
    const feedback = {
      requestId,
      rating: 0,
      review: '',
      submittedAt: null
    };

    return NextResponse.json({
      success: true,
      feedback
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}
