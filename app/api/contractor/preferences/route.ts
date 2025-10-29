import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
export const dynamic = 'force-dynamic';
import jwt from 'jsonwebtoken';
import { z } from 'zod';

function mapAvailabilityStatus(availability: string) {
  const mapping: Record<string, string> = {
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
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const JWT_SECRET = process.env.JWT_SECRET;
    
    if (!JWT_SECRET) {
      return NextResponse.json({ error: 'JWT secret not configured' }, { status: 500 });
    }

    const payload = jwt.verify(token, JWT_SECRET) as any;
    const userId = payload.userId;

    // Check if user is a contractor
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { userType: true }
    });

    if (!user || user.userType !== 'CONTRACTOR') {
      return NextResponse.json({ error: 'Access denied. Contractor account required.' }, { status: 403 });
    }

    const preferences = await prisma.contractorPreferences.findUnique({
      where: { userId }
    });

    return NextResponse.json(preferences || null);

  } catch (error) {
    console.error('Error fetching contractor preferences:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to fetch contractor preferences' 
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const JWT_SECRET = process.env.JWT_SECRET;
    
    if (!JWT_SECRET) {
      return NextResponse.json({ error: 'JWT secret not configured' }, { status: 500 });
    }

    const payload = jwt.verify(token, JWT_SECRET) as any;
    const userId = payload.userId;

    // Check if user is a contractor
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: { userType: true }
    });

    if (!user || user.userType !== 'CONTRACTOR') {
      return NextResponse.json({ error: 'Access denied. Contractor account required.' }, { status: 403 });
    }

    const body = await request.json();
    const preferences = contractorPreferencesSchema.parse(body);

    // Extract isOnboardingComplete from the body
    const { isOnboardingComplete, ...preferencesData } = preferences;

    const contractorPreferences = await prisma.contractorPreferences.upsert({
      where: { userId },
      update: {
        ...preferencesData,
        isOnboardingComplete: isOnboardingComplete ?? true,
      },
      create: {
        userId,
        ...preferencesData,
        isOnboardingComplete: isOnboardingComplete ?? true,
      },
    });

    // If onboarding is completed, also create a basic contractor profile
    if (isOnboardingComplete) {
      const existingProfile = await prisma.contractorProfile.findUnique({
        where: { userId }
      });

      if (!existingProfile) {
        // Get user details for the profile
        const userDetails = await prisma.user.findUnique({
          where: { id: userId },
          select: { name: true, email: true }
        });

        await prisma.contractorProfile.create({
          data: {
            userId,
            businessName: userDetails?.name || 'Contractor Business',
            phone: '', // Will be filled in profile setup
            address: '',
            city: '',
            state: '',
            zipCode: '',
            services: preferencesData.serviceCategories || [],
            serviceAreas: preferencesData.locations || [],
            hourlyRate: preferencesData.hourlyRate ? parseFloat(preferencesData.hourlyRate) : 0,
            experience: parseInt(preferencesData.experience) || 0,
            bio: preferencesData.background || '',
            availability: mapAvailabilityStatus(preferencesData.availability) || 'AVAILABLE',
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
    console.error('Error saving contractor preferences:', error);
    
    if (error instanceof jwt.JsonWebTokenError) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }
    
    if (error instanceof z.ZodError) {
      return NextResponse.json({ 
        error: 'Invalid preferences data',
        details: error.errors
      }, { status: 400 });
    }
    
    return NextResponse.json({ 
      error: 'Failed to save contractor preferences' 
    }, { status: 500 });
  }
}
