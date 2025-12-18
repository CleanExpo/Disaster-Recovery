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

    if (!requireRole(user, ['ADMIN'])) {
      return unauthorizedRoleResponse(['ADMIN']);
    }

    const contractors = await prisma.contractorProfile.findMany({
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true,
            createdAt: true,
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: contractors });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
