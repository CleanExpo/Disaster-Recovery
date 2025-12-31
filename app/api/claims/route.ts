/**
 * Insurance Claims API Route
 * Handles insurance claim submission and tracking
 * POST   /api/claims - Submit insurance claim
 * GET    /api/claims - List claims for user
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import {
  submitInsuranceClaim,
  getInsuranceProviders,
} from '@/lib/services/insurance.service';

// ============================================================================
// GET /api/claims - List insurance claims
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

    const offset = (page - 1) * limit;

    // Build filter
    const where: any = {
      clientId: user.id,
    };

    if (status) {
      where.status = status;
    }

    // Fetch claims
    const [claims, total] = await Promise.all([
      prisma.insuranceClaimAU.findMany({
        where,
        include: {
          insuranceProvider: {
            select: {
              name: true,
              contactEmail: true,
              contactPhone: true,
            },
          },
          booking: {
            select: {
              id: true,
              australianServiceType: true,
              description: true,
              estimatedCostAUD: true,
            },
          },
        },
        orderBy: { createdAt: 'desc' },
        skip: offset,
        take: limit,
      }),
      prisma.insuranceClaimAU.count({ where }),
    ]);

    return NextResponse.json({
      success: true,
      data: claims,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error('Error fetching claims:', error);
    return NextResponse.json(
      { error: 'Error fetching claims' },
      { status: 500 }
    );
  }
}

// ============================================================================
// POST /api/claims - Submit insurance claim
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

    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });

    if (!user) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: 404 }
      );
    }

    const body = await request.json();

    // Validate required fields
    const requiredFields = [
      'bookingId',
      'insuranceProvider',
      'policyNumber',
      'totalClaimAmountAUD',
      'damageDescription',
      'damagePhotos',
    ];

    const missingFields = requiredFields.filter((field) => !body[field]);
    if (missingFields.length > 0) {
      return NextResponse.json(
        {
          error: 'Missing required fields',
          details: missingFields,
        },
        { status: 400 }
      );
    }

    // Submit claim
    const result = await submitInsuranceClaim(
      {
        bookingId: body.bookingId,
        insuranceProvider: body.insuranceProvider,
        policyNumber: body.policyNumber,
        totalClaimAmountAUD: body.totalClaimAmountAUD,
        damageDescription: body.damageDescription,
        damagePhotos: body.damagePhotos,
        invoiceUrl: body.invoiceUrl,
        estimateUrl: body.estimateUrl,
        additionalDocuments: body.additionalDocuments,
      },
      user.id
    );

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.message,
          details: result.error,
        },
        { status: 400 }
      );
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          claimId: result.claimId,
          claimNumber: result.claimNumber,
        },
        message: result.message,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error submitting claim:', error);
    return NextResponse.json(
      { error: 'Error submitting claim' },
      { status: 500 }
    );
  }
}
