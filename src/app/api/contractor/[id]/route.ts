import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, isAdmin, isContractor } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { updateContractorSchema, validateRequest, formatZodErrors } from '@/lib/validation';

interface RouteParams {
  params: { id: string };
}

// Get contractor profile
export async function GET(request: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params;

    const contractor = await prisma.contractor.findUnique({
      where: { id },
      include: {
        user: {
          select: {
            id: true,
            name: true,
            email: true,
            image: true,
            phone: true,
          },
        },
        bookings: {
          where: { status: 'COMPLETED' },
          select: {
            id: true,
            serviceType: true,
            completedDate: true,
            finalCost: true,
          },
          take: 10,
          orderBy: { completedDate: 'desc' },
        },
        reviews: {
          select: {
            id: true,
            rating: true,
            comment: true,
            createdAt: true,
            client: {
              select: {
                name: true,
                image: true,
              },
            },
          },
          take: 5,
          orderBy: { createdAt: 'desc' },
        },
      },
    });

    if (!contractor) {
      return NextResponse.json(
        { success: false, error: 'Contractor not found' },
        { status: 404 }
      );
    }

    // Hide sensitive info for non-authenticated users
    const session = await getServerSession(authOptions);
    const user = session?.user as any;
    const isOwner = user?.id === contractor.userId;
    const isAdminUser = user && isAdmin(user.role);

    if (!contractor.isVerified && !isOwner && !isAdminUser) {
      return NextResponse.json(
        { success: false, error: 'Contractor not found' },
        { status: 404 }
      );
    }

    // Remove sensitive data for public view
    const publicData = {
      ...contractor,
      licenseNumber: isOwner || isAdminUser ? contractor.licenseNumber : undefined,
      stripeAccountId: undefined,
    };

    return NextResponse.json({
      success: true,
      data: publicData,
    });
  } catch (error) {
    console.error('Get contractor error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Update contractor profile
export async function PATCH(request: NextRequest, { params }: RouteParams) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const { id } = params;
    const user = session.user as any;
    const body = await request.json();

    const contractor = await prisma.contractor.findUnique({
      where: { id },
    });

    if (!contractor) {
      return NextResponse.json(
        { success: false, error: 'Contractor not found' },
        { status: 404 }
      );
    }

    // Check authorization
    const isOwner = user.id === contractor.userId;
    const isAdminUser = isAdmin(user.role);

    if (!isOwner && !isAdminUser) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      );
    }

    const validation = validateRequest(updateContractorSchema, body);
    if (!validation.success) {
      return NextResponse.json(
        {
          success: false,
          error: 'Validation failed',
          details: formatZodErrors(validation.errors)
        },
        { status: 400 }
      );
    }

    // Only admins can verify contractors
    if (validation.data.isVerified !== undefined && !isAdminUser) {
      delete validation.data.isVerified;
    }

    const updatedContractor = await prisma.contractor.update({
      where: { id },
      data: validation.data,
    });

    return NextResponse.json({
      success: true,
      data: updatedContractor,
    });
  } catch (error) {
    console.error('Update contractor error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
