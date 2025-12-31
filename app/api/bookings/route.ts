/**
 * Bookings API Route
 * Handles disaster recovery service booking creation and retrieval
 * POST   /api/bookings - Create new booking
 * GET    /api/bookings - List bookings (paginated, filtered)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import {
  BookingStatus,
  AustralianServiceType,
  EmergencyResponseLevel,
  AustralianState,
} from '@prisma/client';
import {
  australianAddressSchema,
  australianBookingSchema,
} from '@/lib/validation/australia';

// ============================================================================
// GET /api/bookings - List bookings
// ============================================================================

export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Parse query parameters
    const searchParams = request.nextUrl.searchParams;
    const page = parseInt(searchParams.get('page') || '1');
    const limit = parseInt(searchParams.get('limit') || '10');
    const status = searchParams.get('status');
    const state = searchParams.get('state');

    const offset = (page - 1) * limit;

    // Build filter
    const where: any = {
      clientId: user.id,
    };

    if (status) {
      where.status = status as BookingStatus;
    }

    if (state) {
      where.serviceState = state as AustralianState;
    }

    // Fetch bookings
    const [bookings, total] = await Promise.all([
      prisma.booking.findMany({
        where,
        include: {
          contractor: {
            select: {
              id: true,
              businessName: true,
              averageRating: true,
              completedJobs: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.booking.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: bookings,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching bookings:', error);
    return NextResponse.json(
      { error: 'Error fetching bookings' },
      { status: 500 }
    );
  }
}

// ============================================================================
// POST /api/bookings - Create new booking
// ============================================================================

export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user?.email) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      );
    }

    // Get user
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    // Parse request body
    const body = await request.json();

    // Validate input
    try {
      australianBookingSchema.parse(body);
    } catch (error: any) {
      return NextResponse.json(
        {
          error: 'Validation error',
          details: error.errors,
        },
        { status: 400 }
      );
    }

    // Estimate cost based on service type and damage level
    const estimatedCost = estimateServiceCost(
      body.serviceType as AustralianServiceType,
      body.emergencyLevel as EmergencyResponseLevel,
      body.estimatedDamageAUD || 5000
    );

    // Create booking
    const booking = await prisma.booking.create({
      data: {
        clientId: user.id,
        australianServiceType: body.serviceType as AustralianServiceType,
        description: body.description,
        servicePostcode: body.address.postcode,
        serviceState: body.address.state as AustralianState,
        serviceSuburb: body.address.suburb,
        streetAddress: body.address.streetAddress,
        emergencyResponseLevel: body.emergencyLevel as EmergencyResponseLevel,
        damagePhotos: body.damagePhotos || [],
        estimatedCostAUD: estimatedCost,
        status: BookingStatus.PENDING,
        scheduledDate: body.preferredDateTime
          ? new Date(body.preferredDateTime)
          : undefined,
      },
    });

    // Log audit
    await prisma.auditLog.create({
      data: {
        action: 'CREATE',
        entityType: 'Booking',
        entityId: booking.id,
        performedBy: user.id,
        newValues: booking as any,
      },
    });

    return NextResponse.json(
      {
        success: true,
        data: booking,
        message: 'Booking created successfully',
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error creating booking:', error);
    return NextResponse.json(
      { error: 'Error creating booking' },
      { status: 500 }
    );
  }
}

// ============================================================================
// HELPER FUNCTIONS
// ============================================================================

function estimateServiceCost(
  serviceType: AustralianServiceType,
  emergencyLevel: EmergencyResponseLevel,
  damageEstimate: number
): number {
  // Base rates per service type (AUD)
  const baseRates: Record<AustralianServiceType, number> = {
    WATER_DAMAGE: 1500,
    FIRE_DAMAGE: 2500,
    SMOKE_DAMAGE: 1200,
    MOULD_REMEDIATION: 1800,
    ODOUR_REMEDIATION: 900,
    CARPET_CLEANING: 600,
    COMMERCIAL_WATER_DAMAGE: 3500,
    COMMERCIAL_FIRE_DAMAGE: 5000,
    COMMERCIAL_MOULD: 4000,
    COMMERCIAL_ODOUR: 2000,
    CRIME_SCENE_CLEANING: 3000,
    BIOHAZARD_REMEDIATION: 5000,
    HOARDING_CLEANUP: 2000,
    VANDALISM_CLEANUP: 1500,
    GENERAL_RESTORATION: 2000,
  };

  // Emergency surcharge multipliers
  const emergencySurcharges: Record<EmergencyResponseLevel, number> = {
    URGENT: 1.5, // 50% surcharge
    HIGH: 1.25, // 25% surcharge
    STANDARD: 1.0, // No surcharge
    SCHEDULED: 0.9, // 10% discount
  };

  const baseRate = baseRates[serviceType] || 1500;
  const surcharge = emergencySurcharges[emergencyLevel] || 1.0;

  // Calculate: base rate * emergency surcharge + 20% of damage estimate
  const totalEstimate = baseRate * surcharge + damageEstimate * 0.2;

  // Round to nearest $50
  return Math.ceil(totalEstimate / 50) * 50;
}
