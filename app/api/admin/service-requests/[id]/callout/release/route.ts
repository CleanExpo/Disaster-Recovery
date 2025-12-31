import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { createTransfer } from '@/lib/stripe';
import { getNrpgCalloutSplit } from '@/lib/pricing/nrpg-callout';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

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

    if (!requireRole(user, ['ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN', 'SUPER_ADMIN']);
    }

    const callout = await prisma.serviceRequestCalloutPayment.findUnique({
      where: { serviceRequestId: params.id },
      include: { contractorProfile: true },
    });

    if (!callout) {
      return createErrorResponse(ErrorCode.RESOURCE_NOT_FOUND, 'Callout payment not found', 404);
    }

    if (callout.status !== 'PAID') {
      return createErrorResponse(
        ErrorCode.INVALID_INPUT,
        'Callout payment must be PAID before releasing funds',
        400,
        { status: callout.status }
      );
    }

    let contractorProfile = callout.contractorProfile;

    if (!contractorProfile) {
      const accepted = await prisma.contractorMatch.findFirst({
        where: { serviceRequestId: params.id, status: 'ACCEPTED' },
        include: { contractor: true },
        orderBy: { updatedAt: 'desc' },
      });

      if (!accepted) {
        return createErrorResponse(
          ErrorCode.RESOURCE_NOT_FOUND,
          'No accepted contractor match found for this service request',
          404
        );
      }

      contractorProfile = accepted.contractor;

      await prisma.serviceRequestCalloutPayment.update({
        where: { serviceRequestId: params.id },
        data: { contractorProfileId: contractorProfile.id },
      });
    }

    if (!contractorProfile.stripeConnectAccountId) {
      return createErrorResponse(
        ErrorCode.INVALID_INPUT,
        'Contractor Stripe Connect account is not configured',
        400
      );
    }

    const split = getNrpgCalloutSplit();
    const transfer = await createTransfer(
      split.contractorEntitlement.totalAUD,
      contractorProfile.stripeConnectAccountId,
      `nrpg_callout_${params.id}`,
      'aud'
    );

    await prisma.serviceRequestCalloutPayment.update({
      where: { serviceRequestId: params.id },
      data: {
        status: 'RELEASED',
        stripeTransferId: transfer.id,
      },
    });

    return NextResponse.json({
      success: true,
      transferId: transfer.id,
      amountAUD: split.contractorEntitlement.totalAUD,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

