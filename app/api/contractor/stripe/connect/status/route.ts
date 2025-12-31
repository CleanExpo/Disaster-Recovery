import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    if (!requireRole(user, ['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN']);
    }

    const profile = await prisma.contractorProfile.findUnique({
      where: { userId: user.id },
      select: { stripeConnectAccountId: true },
    });

    return NextResponse.json({
      success: true,
      payoutsConfigured: Boolean(profile?.stripeConnectAccountId),
      stripeConnectAccountId: profile?.stripeConnectAccountId ?? null,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

