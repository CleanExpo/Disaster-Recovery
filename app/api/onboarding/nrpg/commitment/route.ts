/**
 * NRPG Commitment Framework API
 * GET: Retrieve contractor's commitment status
 * POST: Sign the commitment framework
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const commitmentSchema = z.object({
  fullName: z.string().min(2),
  signature: z.string().min(2),
  agreedToEthics: z.boolean().refine((val) => val === true),
  agreedToQuality: z.boolean().refine((val) => val === true),
  agreedToCustomer: z.boolean().refine((val) => val === true),
  agreedToContinuousImprovement: z.boolean().refine((val) => val === true),
});

// GET /api/onboarding/nrpg/commitment
export async function GET(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorised' }, { status: 401 });
    }

    const userId = (session.user as any).id;

    const contractor = await prisma.contractor.findFirst({
      where: { userId },
      select: { id: true },
    });

    if (!contractor) {
      return NextResponse.json({ success: false, error: 'Contractor not found' }, { status: 404 });
    }

    // Get commitment record
    const commitment = await prisma.nRPGCommitment.findUnique({
      where: { contractorId: contractor.id },
    });

    if (!commitment) {
      return NextResponse.json({
        success: true,
        data: {
          signed: false,
          signedAt: null,
          signedName: null,
          renewalDue: null,
        },
      });
    }

    // Calculate renewal date (annual renewal)
    const renewalDue = commitment.signedAt
      ? new Date(commitment.signedAt.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString()
      : null;

    return NextResponse.json({
      success: true,
      data: {
        signed: true,
        signedAt: commitment.signedAt?.toISOString() || null,
        signedName: commitment.signedName,
        renewalDue,
      },
    });
  } catch (error) {
    console.error('Error fetching commitment:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/onboarding/nrpg/commitment
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorised' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await request.json();

    // Validate input
    const parsed = commitmentSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid input', details: parsed.error.flatten() },
        { status: 400 }
      );
    }

    const contractor = await prisma.contractor.findFirst({
      where: { userId },
      select: { id: true },
    });

    if (!contractor) {
      return NextResponse.json({ success: false, error: 'Contractor not found' }, { status: 404 });
    }

    // Check if already signed
    const existing = await prisma.nRPGCommitment.findUnique({
      where: { contractorId: contractor.id },
    });

    if (existing) {
      return NextResponse.json(
        { success: false, error: 'Commitment framework already signed' },
        { status: 400 }
      );
    }

    const now = new Date();

    // Create commitment record
    const commitment = await prisma.nRPGCommitment.create({
      data: {
        contractorId: contractor.id,
        signedName: parsed.data.fullName,
        signedAt: now,
        agreedToEthics: parsed.data.agreedToEthics,
        agreedToQuality: parsed.data.agreedToQuality,
        agreedToCustomer: parsed.data.agreedToCustomer,
        agreedToContinuousImprovement: parsed.data.agreedToContinuousImprovement,
        ipAddress: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        userAgent: request.headers.get('user-agent') || 'unknown',
      },
    });

    // Update phase record to mark commitment as signed
    await prisma.nRPGOnboardingPhase.updateMany({
      where: { contractorId: contractor.id },
      data: {
        commitmentSigned: true,
        commitmentSignedAt: now,
      },
    });

    // Calculate renewal date
    const renewalDue = new Date(now.getTime() + 365 * 24 * 60 * 60 * 1000).toISOString();

    return NextResponse.json({
      success: true,
      data: {
        signed: true,
        signedAt: commitment.signedAt?.toISOString(),
        signedName: commitment.signedName,
        renewalDue,
      },
    });
  } catch (error) {
    console.error('Error signing commitment:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}
