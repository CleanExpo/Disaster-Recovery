import { NextRequest, NextResponse } from 'next/server';
import { PrismaClient } from '@prisma/client';
import { verifyToken } from '@/lib/auth';

const prisma = new PrismaClient();

export async function GET(request: NextRequest) {
  try {
    console.log('Contractor profile API called');
    
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    console.log('User ID:', decoded.userId);

    // Check if prisma is available
    if (!prisma) {
      console.error('Prisma client is not available');
      return NextResponse.json({ error: 'Database connection error' }, { status: 500 });
    }

    // Get contractor profile
    const profile = await prisma.contractorProfile.findUnique({
      where: { userId: decoded.userId },
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

    if (!profile) {
      return NextResponse.json({ 
        success: true, 
        profile: null,
        isProfileComplete: false 
      });
    }

    // Check if profile is complete
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
        isProfileComplete
      }
    });

  } catch (error) {
    console.error('Error fetching contractor profile:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined,
      prismaAvailable: !!prisma
    });
    return NextResponse.json(
      { 
        error: 'Internal server error',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}

export async function POST(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const {
      businessName,
      phone,
      address,
      city,
      state,
      zipCode,
      licenseNumber,
      insuranceProvider,
      insuranceExpiry,
      services,
      serviceAreas,
      hourlyRate,
      experience,
      bio,
      availability
    } = body;

    // Validate required fields
    if (!businessName || !phone || !address || !city || !state || !zipCode || 
        !services || services.length === 0 || !serviceAreas || serviceAreas.length === 0 ||
        !hourlyRate || !experience) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Create or update contractor profile
    const profile = await prisma.contractorProfile.upsert({
      where: { userId: decoded.userId },
      update: {
        businessName,
        phone,
        address,
        city,
        state,
        zipCode,
        licenseNumber: licenseNumber || null,
        insuranceProvider: insuranceProvider || null,
        insuranceExpiry: insuranceExpiry ? new Date(insuranceExpiry) : null,
        services,
        serviceAreas,
        hourlyRate: parseFloat(hourlyRate),
        experience: parseInt(experience),
        bio: bio || null,
        availability: availability || 'AVAILABLE',
        isVerified: false, // Will be verified by admin
        updatedAt: new Date()
      },
      create: {
        userId: decoded.userId,
        businessName,
        phone,
        address,
        city,
        state,
        zipCode,
        licenseNumber: licenseNumber || null,
        insuranceProvider: insuranceProvider || null,
        insuranceExpiry: insuranceExpiry ? new Date(insuranceExpiry) : null,
        services,
        serviceAreas,
        hourlyRate: parseFloat(hourlyRate),
        experience: parseInt(experience),
        bio: bio || null,
        availability: availability || 'AVAILABLE',
        isVerified: false
      }
    });

    // Check if profile is complete
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
      message: 'Contractor profile created successfully'
    });

  } catch (error) {
    console.error('Error creating contractor profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const authHeader = request.headers.get('authorization');
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const token = authHeader.substring(7);
    const decoded = verifyToken(token);
    if (!decoded) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const body = await request.json();
    const {
      businessName,
      phone,
      address,
      city,
      state,
      zipCode,
      licenseNumber,
      insuranceProvider,
      insuranceExpiry,
      services,
      serviceAreas,
      hourlyRate,
      experience,
      bio,
      availability
    } = body;

    // Update contractor profile
    const profile = await prisma.contractorProfile.update({
      where: { userId: decoded.userId },
      data: {
        businessName,
        phone,
        address,
        city,
        state,
        zipCode,
        licenseNumber: licenseNumber || null,
        insuranceProvider: insuranceProvider || null,
        insuranceExpiry: insuranceExpiry ? new Date(insuranceExpiry) : null,
        services,
        serviceAreas,
        hourlyRate: hourlyRate ? parseFloat(hourlyRate) : undefined,
        experience: experience ? parseInt(experience) : undefined,
        bio: bio || null,
        availability: availability || 'AVAILABLE',
        updatedAt: new Date()
      }
    });

    // Check if profile is complete
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
      message: 'Contractor profile updated successfully'
    });

  } catch (error) {
    console.error('Error updating contractor profile:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
