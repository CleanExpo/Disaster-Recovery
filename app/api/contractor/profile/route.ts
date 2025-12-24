import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { contractorProfileCreateSchema, contractorProfileUpdateSchema } from '@/lib/validation-schemas';
import { handleValidationError, handleUnexpectedError, handleDatabaseError } from '@/lib/api-errors';
import { ZodError } from 'zod';

/**
 * GET /api/contractor/profile
 * Retrieves contractor profile for authenticated user
 */
export async function GET(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Get contractor profile
    const profile = await prisma.contractorProfile.findUnique({
      where: { userId: user.id },
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
    });

    if (!profile) {
      return NextResponse.json({
        success: true,
        profile: null,
        isProfileComplete: false,
      });
    }

    // Check profile completeness
    const isProfileComplete = !!(
      profile.businessName &&
      profile.phone &&
      profile.address &&
      profile.city &&
      profile.state &&
      profile.zipCode &&
      profile.services.length > 0 &&
      profile.serviceAreas.length > 0 &&
      profile.hourlyRate &&
      profile.experience > 0 &&
      profile.bio
    );

    return NextResponse.json({
      success: true,
      profile: {
        ...profile,
        isProfileComplete,
      },
    });
  } catch (error) {
    return handleDatabaseError(error);
  }
}

/**
 * POST /api/contractor/profile
 * Creates contractor profile for authenticated user
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is contractor
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contractorProfileCreateSchema.parse(body);

    // Create or update profile
    const profile = await prisma.contractorProfile.upsert({
      where: { userId: user.id },
      update: {
        ...validatedData,
        insuranceExpiry: validatedData.insuranceExpiry
          ? new Date(validatedData.insuranceExpiry)
          : null,
        availability: validatedData.availability || 'AVAILABLE',
        updatedAt: new Date(),
      },
      create: {
        userId: user.id,
        ...validatedData,
        insuranceExpiry: validatedData.insuranceExpiry
          ? new Date(validatedData.insuranceExpiry)
          : null,
        availability: validatedData.availability || 'AVAILABLE',
        isVerified: false,
      },
    });

    // Check completeness
    const isProfileComplete = !!(
      profile.businessName &&
      profile.phone &&
      profile.address &&
      profile.city &&
      profile.state &&
      profile.zipCode &&
      profile.services.length > 0 &&
      profile.serviceAreas.length > 0 &&
      profile.hourlyRate &&
      profile.experience > 0 &&
      profile.bio
    );

    return NextResponse.json(
      {
        success: true,
        profile,
        isProfileComplete,
        message: 'Contractor profile created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

/**
 * PUT /api/contractor/profile
 * Updates contractor profile for authenticated user
 */
export async function PUT(request: NextRequest) {
  try {
    // Authenticate user
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }
    const { user } = authResult.context;

    // Validate user is contractor
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    // Parse and validate request body
    const body = await request.json();
    const validatedData = contractorProfileUpdateSchema.parse(body);

    // Update profile
    const profile = await prisma.contractorProfile.update({
      where: { userId: user.id },
      data: {
        ...validatedData,
        insuranceExpiry: validatedData.insuranceExpiry
          ? new Date(validatedData.insuranceExpiry)
          : undefined,
        updatedAt: new Date(),
      },
    });

    // Check completeness
    const isProfileComplete = !!(
      profile.businessName &&
      profile.phone &&
      profile.address &&
      profile.city &&
      profile.state &&
      profile.zipCode &&
      profile.services.length > 0 &&
      profile.serviceAreas.length > 0 &&
      profile.hourlyRate &&
      profile.experience > 0 &&
      profile.bio
    );

    return NextResponse.json({
      success: true,
      profile,
      isProfileComplete,
      message: 'Contractor profile updated successfully',
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
