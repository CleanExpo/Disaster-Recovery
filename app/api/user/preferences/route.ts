import { NextRequest, NextResponse } from 'next/server';

// Force dynamic rendering for this route (uses request.headers)
export const dynamic = 'force-dynamic';

import { prisma } from '@/lib/prisma';
import { authenticateRequest } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError } from '@/lib/api-errors';
import { z, ZodError } from 'zod';

const preferencesSchema = z.object({
  interests: z.array(z.string()).optional(),
  serviceTypes: z.array(z.string()).optional(),
  budgetRange: z.string().optional(),
  urgencyLevel: z.string().optional(),
  communicationStyle: z.string().optional(),
  notificationSettings: z.any().optional(),
  dashboardLayout: z.any().optional(),
  themePreferences: z.any().optional(),
  selectedCategories: z.array(z.string()).optional(),
  selectedServices: z.array(z.string()).optional(),
  selectedTheme: z.string().optional(),
  brandingColor: z.string().optional(),
  isOnboardingComplete: z.boolean().optional(),
}).passthrough(); // Allow additional fields

export async function GET(request: NextRequest) {
  try {
    // Authenticate request
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    const preferences = await prisma.userPreferences.findUnique({
      where: { userId: user.id },
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

    const body = await request.json();
    const preferences = preferencesSchema.parse(body);

    // Extract isOnboardingComplete from the body
    const { isOnboardingComplete, ...preferencesData } = preferences;

    // Upsert user preferences
    const userPreferences = await prisma.userPreferences.upsert({
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

    return NextResponse.json({
      success: true,
      preferences: userPreferences,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
