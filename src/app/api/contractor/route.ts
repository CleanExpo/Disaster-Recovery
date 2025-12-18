import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions, isAdmin } from '@/lib/auth';
import { prisma } from '@/lib/db';
import { contractorApplicationSchema, validateRequest, formatZodErrors } from '@/lib/validation';

// Get contractors (public for searching, full list for admins)
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    const { searchParams } = new URL(request.url);

    const query = searchParams.get('query') || '';
    const serviceType = searchParams.get('serviceType');
    const zipCode = searchParams.get('zipCode');
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '20');
    const isVerified = searchParams.get('isVerified');

    const skip = (page - 1) * limit;

    // Build where clause
    const where: any = {
      role: 'CONTRACTOR',
    };

    // Public searches only show verified contractors
    const user = session?.user as any;
    if (!user || !isAdmin(user.role)) {
      where.contractor = {
        isVerified: true,
      };
    } else if (isVerified !== null && isVerified !== undefined) {
      where.contractor = {
        isVerified: isVerified === 'true',
      };
    }

    if (query) {
      where.OR = [
        { name: { contains: query, mode: 'insensitive' } },
        { contractor: { businessName: { contains: query, mode: 'insensitive' } } },
      ];
    }

    if (serviceType) {
      where.contractor = {
        ...where.contractor,
        specialties: { has: serviceType },
      };
    }

    if (zipCode) {
      where.contractor = {
        ...where.contractor,
        serviceArea: { has: zipCode },
      };
    }

    const [contractors, total] = await Promise.all([
      prisma.user.findMany({
        where,
        select: {
          id: true,
          name: true,
          email: session?.user ? true : false,
          image: true,
          contractor: {
            select: {
              id: true,
              businessName: true,
              licenseNumber: session?.user && isAdmin(user?.role) ? true : false,
              serviceArea: true,
              specialties: true,
              rating: true,
              completedJobs: true,
              isVerified: true,
            },
          },
        },
        orderBy: [
          { contractor: { rating: 'desc' } },
          { contractor: { completedJobs: 'desc' } },
        ],
        skip,
        take: limit,
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: contractors,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
        hasMore: skip + contractors.length < total,
      },
    });
  } catch (error) {
    console.error('Get contractors error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Apply to become a contractor
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      );
    }

    const body = await request.json();

    const validation = validateRequest(contractorApplicationSchema, body);
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

    const user = session.user as any;

    // Check if already a contractor
    const existingContractor = await prisma.contractor.findUnique({
      where: { userId: user.id },
    });

    if (existingContractor) {
      return NextResponse.json(
        { success: false, error: 'Already a contractor' },
        { status: 400 }
      );
    }

    const {
      businessName,
      licenseNumber,
      insuranceExpiry,
      serviceArea,
      specialties,
    } = validation.data;

    // Create contractor profile
    const contractor = await prisma.$transaction(async (tx) => {
      // Create contractor record
      const contractorRecord = await tx.contractor.create({
        data: {
          userId: user.id,
          businessName,
          licenseNumber,
          insuranceExpiry: new Date(insuranceExpiry),
          serviceArea,
          specialties,
          rating: 0,
          completedJobs: 0,
          isVerified: false, // Requires admin approval
        },
      });

      // Update user role
      await tx.user.update({
        where: { id: user.id },
        data: { role: 'CONTRACTOR' },
      });

      // Create application notification for admins
      await tx.notification.create({
        data: {
          type: 'CONTRACTOR_APPLICATION',
          title: 'New Contractor Application',
          message: `${user.name} has applied to become a contractor`,
          metadata: {
            contractorId: contractorRecord.id,
            userId: user.id,
            businessName,
          },
        },
      });

      return contractorRecord;
    });

    return NextResponse.json({
      success: true,
      data: contractor,
      message: 'Application submitted successfully. Pending verification.',
    }, { status: 201 });
  } catch (error) {
    console.error('Contractor application error:', error);
    return NextResponse.json(
      { success: false, error: 'Internal server error' },
      { status: 500 }
    );
  }
}
