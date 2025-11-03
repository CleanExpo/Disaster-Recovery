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

    const [totalClients, totalContractors, totalRequests, activeProjects] = await Promise.all([
      prisma.user.count({ where: { userType: 'CLIENT' } }),
      prisma.contractorProfile.count(),
      prisma.serviceRequest.count(),
      prisma.contractorMatch.count({ where: { status: 'ACCEPTED' } }),
    ]);

    return NextResponse.json({
      success: true,
      data: {
        totalClients,
        totalContractors,
        totalRequests,
        activeProjects,
      },
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}
