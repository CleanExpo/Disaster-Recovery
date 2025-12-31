import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';
import { getServerSession } from 'next-auth';
import { authOptions, isAdmin } from '@/lib/auth';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as unknown as { id?: string; userType?: string } | undefined;

    if (!sessionUser?.id) {
      return createErrorResponse(
        ErrorCode.UNAUTHORIZED,
        'Authentication required',
        401
      );
    }

    const contractorId = params.id;

    // Get contractor profile by ID
    const contractor = await prisma.contractorProfile.findUnique({
      where: { id: contractorId },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    });

    if (!contractor) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Contractor not found',
        404
      );
    }

    const isAdminUser = isAdmin(sessionUser.userType || '');
    const isOwner = contractor.userId === sessionUser.id;

    // Contractor identities are private; only admins and the contractor themselves can view.
    if (!isAdminUser && !isOwner) {
      return createErrorResponse(
        ErrorCode.FORBIDDEN,
        'Forbidden',
        403
      );
    }

    return NextResponse.json({
      success: true,
      contractor
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const session = await getServerSession(authOptions);
    const sessionUser = session?.user as unknown as { id?: string; userType?: string } | undefined;

    if (!sessionUser?.id) {
      return createErrorResponse(
        ErrorCode.UNAUTHORIZED,
        'Authentication required',
        401
      );
    }

    const contractorId = params.id;
    const body = await request.json();

    // Get contractor profile
    const contractor = await prisma.contractorProfile.findUnique({
      where: { id: contractorId }
    });

    if (!contractor) {
      return createErrorResponse(
        ErrorCode.RESOURCE_NOT_FOUND,
        'Contractor not found',
        404
      );
    }

    const isAdminUser = isAdmin(sessionUser.userType || '');
    const isOwner = contractor.userId === sessionUser.id;

    if (!isAdminUser && !isOwner) {
      return createErrorResponse(
        ErrorCode.FORBIDDEN,
        'Forbidden',
        403
      );
    }

    const allowedFields = new Set<string>([
      'businessName',
      'phone',
      'address',
      'city',
      'state',
      'zipCode',
      'licenseNumber',
      'insuranceProvider',
      'insuranceExpiry',
      'services',
      'serviceAreas',
      'hourlyRate',
      'experience',
      'bio',
      'availability',
      ...(isAdminUser ? ['isVerified', 'rating', 'totalJobs'] : []),
    ]);

    const updateData: Record<string, unknown> = {};
    for (const [key, value] of Object.entries(body as Record<string, unknown>)) {
      if (allowedFields.has(key)) updateData[key] = value;
    }

    // Update contractor profile
    const updatedContractor = await prisma.contractorProfile.update({
      where: { id: contractorId },
      data: updateData,
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            avatar: true
          }
        }
      }
    });

    return NextResponse.json({
      success: true,
      contractor: updatedContractor
    });

  } catch (error) {
    return handleUnexpectedError(error);
  }
}
