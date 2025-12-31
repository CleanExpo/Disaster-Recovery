import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError } from '@/lib/api-errors';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    const authResult = await authenticateRequest(request);
    if (!authResult.success) return authResult.response;
    const { user } = authResult.context;

    if (!requireRole(user, ['CLIENT', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN', 'SUPER_ADMIN']);
    }

    // NRPG uses private, automatic claim dispatch. Clients do not browse or accept contractor offers.
    return NextResponse.json({
      success: true,
      dispatchMode: 'AUTO',
      offers: [],
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
