import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleValidationError, handleUnexpectedError } from '@/lib/api-errors';
import { z, ZodError } from 'zod';

export const dynamic = 'force-dynamic';

function mapAvailabilityStatus(availability: string): 'AVAILABLE' | 'BUSY' | 'UNAVAILABLE' {
  const mapping: Record<string, 'AVAILABLE' | 'BUSY' | 'UNAVAILABLE'> = {
    'business-hours': 'AVAILABLE',
    'available': 'AVAILABLE',
    'busy': 'BUSY',
    'unavailable': 'UNAVAILABLE'
  };
  return mapping[availability] || 'AVAILABLE';
}

const contractorPreferencesSchema = z.object({
  serviceCategories: z.array(z.string()).optional(),
  locations: z.array(z.string()).optional(),
  experience: z.string().optional(),
  expertise: z.array(z.string()).optional(),
  background: z.string().optional(),
  hourlyRate: z.string().optional(),
  availability: z.string().optional(),
  maxDistance: z.string().optional(),
  isOnboardingComplete: z.boolean().optional(),
}).passthrough();

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    const preferences = await prisma.contractorPreferences.findUnique({
      where: { userId: user.id }
    });

    return NextResponse.json(preferences || null);

  } catch (error) {
    return handleUnexpectedError(error);
  }
}

export async function POST(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN']);
    }

    const body = await request.json();
    const preferences = contractorPreferencesSchema.parse(body);

    // Extract isOnboardingComplete from the body
    const { isOnboardingComplete, ...preferencesData } = preferences;

    const contractorPreferences = await prisma.contractorPreferences.upsert({
      where: { userId: user.id },
      update: {
        ...preferencesData,
        isOnboardingComplete: isOnboardingComplete ?? true,
      },
      create: {
        userId: user.id,
        ...preferencesData,
        isOnboardingComplete: isOnboardingComplete ?? true,
      },
    });

    // If onboarding is completed, also create a basic contractor profile
    if (isOnboardingComplete) {
      const existingProfile = await prisma.contractorProfile.findUnique({
        where: { userId: user.id }
      });

      if (!existingProfile) {
        await prisma.contractorProfile.create({
          data: {
            userId: user.id,
            businessName: user.name || 'Contractor Business',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            services: preferencesData.serviceCategories || [],
            serviceAreas: preferencesData.locations || [],
            hourlyRate: preferencesData.hourlyRate ? parseFloat(preferencesData.hourlyRate) : 0,
            experience: parseInt(preferencesData.experience || '0') || 0,
            bio: preferencesData.background || '',
            availability: mapAvailabilityStatus(preferencesData.availability || 'available'),
            isVerified: false,
          }
        });
      }
    }

    return NextResponse.json({
      success: true,
      preferences: contractorPreferences
    });

  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
