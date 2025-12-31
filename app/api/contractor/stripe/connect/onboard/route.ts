import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { createAccountLink, createConnectedAccount } from '@/lib/stripe';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN']);
    }

    const origin = new URL(request.url).origin;
    const returnUrl = `${origin}/dashboard/contractor/onboarding/payouts?stripe=return`;
    const refreshUrl = `${origin}/dashboard/contractor/onboarding/payouts?stripe=refresh`;

    const dbUser = await prisma.user.findUnique({
      where: { id: user.id },
      select: { id: true, email: true },
    });

    if (!dbUser?.email) {
      return createErrorResponse(ErrorCode.INVALID_INPUT, 'User email is required for Stripe Connect', 400);
    }

    let contractorProfile = await prisma.contractorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!contractorProfile) {
      contractorProfile = await prisma.contractorProfile.create({
        data: {
          userId: user.id,
          services: [],
          serviceAreas: [],
        },
      });
    }

    let connectAccountId = contractorProfile.stripeConnectAccountId ?? undefined;

    if (!connectAccountId) {
      const account = await createConnectedAccount({
        email: dbUser.email,
        businessType: 'company',
        country: 'AU',
      });
      connectAccountId = account.id;

      await prisma.contractorProfile.update({
        where: { id: contractorProfile.id },
        data: { stripeConnectAccountId: connectAccountId },
      });
    }

    const link = await createAccountLink(connectAccountId, returnUrl, refreshUrl);

    return NextResponse.json({
      success: true,
      url: link.url,
      accountId: connectAccountId,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
