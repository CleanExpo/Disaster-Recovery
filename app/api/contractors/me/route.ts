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

    const contractor = await prisma.contractor.findUnique({
      where: { userId: user.id },
      include: {
        iicrcCertifications: true,
        serviceAreas: true,
      },
    });

    return NextResponse.json({
      success: true,
      contractor: contractor
        ? {
            id: contractor.id,
            userId: contractor.userId,
            businessName: contractor.businessName,
            nrpgMemberId: contractor.nrpgMemberId,
            nrpgVerificationLevel: contractor.nrpgVerificationLevel,
            isVerified: contractor.isVerified,
            iicrcCertificationsCount: contractor.iicrcCertifications.length,
            operatingStates: contractor.operatingStates,
            australianSpecialties: contractor.australianSpecialties,
            serviceAreasCount: contractor.serviceAreas.length,
          }
        : null,
    });
  } catch (error) {
    return handleUnexpectedError(error);
  }
}

