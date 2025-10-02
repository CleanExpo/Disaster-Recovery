import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { verifyToken } from '@/lib/auth';
import { z } from 'zod';

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
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const preferences = await prisma.userPreferences.findUnique({
      where: { userId: payload.userId },
    });

    return NextResponse.json(preferences || null);
  } catch (error) {
    console.error('Get user preferences error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch preferences' },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader?.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const payload = verifyToken(token);
    if (!payload) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const preferences = preferencesSchema.parse(body);

    // Extract isOnboardingComplete from the body
    const { isOnboardingComplete, ...preferencesData } = preferences;

    // Upsert user preferences
    const userPreferences = await prisma.userPreferences.upsert({
      where: { userId: payload.userId },
      update: {
        ...preferencesData,
        isOnboardingComplete: isOnboardingComplete ?? true,
      },
      create: {
        userId: payload.userId,
        ...preferencesData,
        isOnboardingComplete: isOnboardingComplete ?? true,
      },
    });

    return NextResponse.json({
      success: true,
      preferences: userPreferences,
    });
  } catch (error) {
    console.error('Save user preferences error:', error);
    return NextResponse.json(
      { error: 'Failed to save preferences' },
      { status: 500 }
    );
  }
}
