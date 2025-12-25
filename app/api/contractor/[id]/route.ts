import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { handleUnexpectedError, createErrorResponse, ErrorCode } from '@/lib/api-errors';

export async function GET(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
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

    // Update contractor profile
    const updatedContractor = await prisma.contractorProfile.update({
      where: { id: contractorId },
      data: body,
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
