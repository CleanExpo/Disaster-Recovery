import { NextRequest, NextResponse } from 'next/server';
import stripe from '@/lib/stripe';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { z } from 'zod';

export const dynamic = 'force-dynamic';

const verifySchema = z.object({
  sessionId: z.string().min(1).optional(),
});

export async function POST(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CLIENT'])) {
      return unauthorizedRoleResponse(['CLIENT']);
    }

    const serviceRequest = await prisma.serviceRequest.findUnique({
      where: { id: params.id },
      select: { id: true, userId: true },
    });

    if (!serviceRequest) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, 'Service request not found', 404);
    }

    if (serviceRequest.userId !== user.id) {
      return createErrorResponse(ErrorCode.FORBIDDEN, 'Unauthorized callout verification', 403);
    }

    const body = await request.json().catch(() => ({}));
    const validation = verifySchema.safeParse(body);
    if (!validation.success) {
      return handleValidationError(validation.error);
    }

    const existing = await prisma.serviceRequestCalloutPayment.findUnique({
      where: { serviceRequestId: serviceRequest.id },
      select: { stripeCheckoutSessionId: true },
    });

    const sessionId = validation.data.sessionId ?? existing?.stripeCheckoutSessionId ?? undefined;

    if (!sessionId) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, 'Callout checkout session not found', 404);
    }

    const session = await stripe.checkout.sessions.retrieve(sessionId);
    const paid = session.payment_status === 'paid';

    if (paid) {
      await prisma.serviceRequestCalloutPayment.update({
        where: { serviceRequestId: serviceRequest.id },
        data: {
          status: 'PAID',
          stripePaymentIntentId: typeof session.payment_intent === 'string' ? session.payment_intent : undefined,
        },
      });
    }

    return NextResponse.json({
      success: true,
      paid,
      paymentStatus: session.payment_status,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

