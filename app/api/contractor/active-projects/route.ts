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

    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    const profile = await prisma.contractorProfile.findUnique({
      where: { userId: user.id },
    });

    if (!profile) {
      return NextResponse.json({ success: true, data: [] });
    }

    const activeProjects = await prisma.contractorMatch.findMany({
      where: {
        contractorId: profile.id,
        status: 'ACCEPTED',
      },
      include: {
        serviceRequest: {
          include: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
                avatar: true,
              },
            },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return NextResponse.json({ success: true, data: activeProjects });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
