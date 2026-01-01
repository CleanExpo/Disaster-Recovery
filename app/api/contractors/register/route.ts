/**
 * Contractor Registration API Route
 * Handles NRPG contractor registration and onboarding
 * POST   /api/contractors/register - Register new contractor
 * GET    /api/contractors/register - Get pending verifications (admin only)
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { prisma } from '@/lib/prisma';
import { authOptions } from '@/lib/auth';
import {
  registerContractor as nrpgRegisterContractor,
  getPendingVerifications,
} from '@/lib/services/nrpg.service';
import { sendRegistrationReceivedEmail } from '@/lib/services/email.service';
import { AustralianState, AustralianServiceType, IICRCCertificationLevel } from '@prisma/client';

// ============================================================================
// POST /api/contractors/register - Register new contractor
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

    // Check if user is contractor type
    if (user.userType !== 'CONTRACTOR') {
      return NextResponse.json(
        { error: 'User must be registered as contractor' },
        { status: 400 }
      );
    }

    // Check if contractor profile already exists
    const existingContractor = await prisma.contractor.findUnique({
      where: { userId: user.id },
    });

    if (existingContractor) {
      return NextResponse.json(
        { error: 'Contractor profile already exists for this user' },
        { status: 400 }
      );
    }

    const body = await request.json();

    // Register contractor
    const result = await nrpgRegisterContractor(
      {
        businessName: body.businessName,
        abnNumber: body.abnNumber,
        acnNumber: body.acnNumber,
        phone: body.phone,
        email: body.email || user.email,
        iicrcLevel: body.iicrcLevel as IICRCCertificationLevel,
        iicrcCertificationCode: body.iicrcCertificationCode,
        iicrcCertificationDate: new Date(body.iicrcCertificationDate),
        iicrcExpiryDate: new Date(body.iicrcExpiryDate),
        iicrcCertificateFile: body.iicrcCertificateFile,
        insuranceCertificateFile: body.insuranceCertificateFile,
        operatingStates: body.operatingStates as AustralianState[],
        servicePostcodes: body.servicePostcodes as string[],
        specialties: body.specialties as AustralianServiceType[],
        publicLiabilityPolicyNumber: body.publicLiabilityPolicyNumber,
        publicLiabilityExpiryDate: new Date(body.publicLiabilityExpiryDate),
      },
      user.id
    );

    if (!result.success) {
      return NextResponse.json(
        {
          error: result.message,
          details: result.errors,
        },
        { status: 400 }
      );
    }

    // Update user to contractor type if needed
    if (user.userType !== 'CONTRACTOR') {
      await prisma.user.update({
        where: { id: user.id },
        data: { userType: 'CONTRACTOR' },
      });
    }

    // Send registration confirmation email
    if (result.success && result.nrpgMemberId) {
      await sendRegistrationReceivedEmail({
        businessName: body.businessName,
        contractorEmail: body.email || user.email,
        nrpgMemberId: result.nrpgMemberId,
      }).catch((err) => {
        console.error('Failed to send registration email:', err);
        // Don't fail the registration if email fails
      });
    }

    return NextResponse.json(
      {
        success: true,
        data: {
          contractorId: result.contractorId,
          nrpgMemberId: result.nrpgMemberId,
          verificationLevel: result.verificationLevel,
        },
        message: result.message,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error('Error registering contractor:', error);
    return NextResponse.json(
      { error: 'Error registering contractor' },
      { status: 500 }
    );
  }
}

// ============================================================================
// GET /api/contractors/register - Get pending verifications (admin)
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

    // Check if user is admin
    if (user.userType !== 'ADMIN' && user.userType !== 'SUPER_ADMIN') {
      return NextResponse.json(
        { error: 'Only admins can view pending verifications' },
        { status: 403 }
      );
    }

    // Get query params
    const searchParams = request.nextUrl.searchParams;
    const state = searchParams.get('state') as AustralianState | null;

    // Get pending verifications
    const pending = await getPendingVerifications(state || undefined);

    return NextResponse.json({
      success: true,
      data: pending,
      count: pending.length,
    });
  } catch (error) {
    console.error('Error fetching pending verifications:', error);
    return NextResponse.json(
      { error: 'Error fetching pending verifications' },
      { status: 500 }
    );
  }
}
