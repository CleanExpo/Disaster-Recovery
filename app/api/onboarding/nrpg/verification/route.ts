/**
 * NRPG Background Verification API
 * GET: Retrieve contractor's background check status
 * POST: Initiate a background check
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

// GET /api/onboarding/nrpg/verification
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

    // Get or create phase record (contains verification data)
    let phases = await prisma.nRPGOnboardingPhase.findUnique({
      where: { contractorId: contractor.id },
    });

    if (!phases) {
      phases = await prisma.nRPGOnboardingPhase.create({
        data: {
          contractorId: contractor.id,
          phase1Status: 'NOT_STARTED',
          phase2Status: 'NOT_STARTED',
          phase3Status: 'NOT_STARTED',
          phase4Status: 'NOT_STARTED',
          overallStatus: 'NOT_STARTED',
        },
      });
    }

    // Build verification response
    const verification = {
      criminal: {
        status: phases.criminalCheckStatus,
        initiatedAt: phases.criminalCheckDate?.toISOString() || null,
        completedAt: phases.criminalCheckStatus === 'PASS' || phases.criminalCheckStatus === 'FAIL'
          ? phases.criminalCheckDate?.toISOString() || null
          : null,
        expiresAt: phases.criminalCheckStatus === 'PASS'
          ? calculateExpiryDate(phases.criminalCheckDate, 365)
          : null,
        referenceId: phases.criminalCheckRef,
      },
      financial: {
        status: phases.financialCheckStatus,
        initiatedAt: phases.financialCheckDate?.toISOString() || null,
        completedAt: phases.financialCheckStatus === 'PASS' || phases.financialCheckStatus === 'FAIL'
          ? phases.financialCheckDate?.toISOString() || null
          : null,
        expiresAt: phases.financialCheckStatus === 'PASS'
          ? calculateExpiryDate(phases.financialCheckDate, 365)
          : null,
        referenceId: phases.financialCheckRef,
      },
      professional: {
        status: phases.professionalCheckStatus,
        initiatedAt: phases.professionalCheckDate?.toISOString() || null,
        completedAt: phases.professionalCheckStatus === 'PASS' || phases.professionalCheckStatus === 'FAIL'
          ? phases.professionalCheckDate?.toISOString() || null
          : null,
        expiresAt: phases.professionalCheckStatus === 'PASS'
          ? calculateExpiryDate(phases.professionalCheckDate, 730) // 2 years
          : null,
        referenceId: phases.professionalCheckRef,
      },
      insurance: {
        status: phases.insuranceCheckStatus,
        initiatedAt: phases.insuranceCheckDate?.toISOString() || null,
        completedAt: phases.insuranceCheckStatus === 'PASS' || phases.insuranceCheckStatus === 'FAIL'
          ? phases.insuranceCheckDate?.toISOString() || null
          : null,
        expiresAt: phases.insuranceCheckStatus === 'PASS'
          ? calculateExpiryDate(phases.insuranceCheckDate, 365)
          : null,
        referenceId: phases.insuranceCheckRef,
      },
      overall: {
        allPassed: phases.allChecksPass,
        completedCount: countPassedChecks(phases),
        totalRequired: 4,
      },
    };

    return NextResponse.json({
      success: true,
      data: verification,
    });
  } catch (error) {
    console.error('Error fetching verification:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// POST /api/onboarding/nrpg/verification
// Initiate a background check
export async function POST(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorised' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await request.json();
    const { checkType } = body;

    // Validate check type
    const validCheckTypes = ['criminal', 'financial', 'professional', 'insurance'];
    if (!checkType || !validCheckTypes.includes(checkType)) {
      return NextResponse.json(
        { success: false, error: 'Invalid check type. Must be one of: criminal, financial, professional, insurance' },
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

    // Generate a reference ID (in production, this would come from external provider)
    const referenceId = generateReferenceId(checkType);
    const now = new Date();

    // Build update data based on check type
    const updateData: any = {};

    switch (checkType) {
      case 'criminal':
        updateData.criminalCheckStatus = 'PENDING';
        updateData.criminalCheckDate = now;
        updateData.criminalCheckRef = referenceId;
        break;
      case 'financial':
        updateData.financialCheckStatus = 'PENDING';
        updateData.financialCheckDate = now;
        updateData.financialCheckRef = referenceId;
        break;
      case 'professional':
        updateData.professionalCheckStatus = 'PENDING';
        updateData.professionalCheckDate = now;
        updateData.professionalCheckRef = referenceId;
        break;
      case 'insurance':
        updateData.insuranceCheckStatus = 'PENDING';
        updateData.insuranceCheckDate = now;
        updateData.insuranceCheckRef = referenceId;
        break;
    }

    // Also mark that background check has been initiated for Phase 1
    updateData.backgroundCheckInitiated = true;

    // Update the phase record
    await prisma.nRPGOnboardingPhase.update({
      where: { contractorId: contractor.id },
      data: updateData,
    });

    // In production, this would call external verification provider API
    // For now, we'll simulate the initiation
    // Example: await initiateExternalCheck(checkType, contractor, referenceId);

    return NextResponse.json({
      success: true,
      data: {
        checkType,
        status: 'PENDING',
        referenceId,
        initiatedAt: now.toISOString(),
        message: `${checkType.charAt(0).toUpperCase() + checkType.slice(1)} check has been initiated. You will be notified when results are available.`,
      },
    });
  } catch (error) {
    console.error('Error initiating verification:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions
function calculateExpiryDate(fromDate: Date | null, daysValid: number): string | null {
  if (!fromDate) return null;
  const expiry = new Date(fromDate.getTime() + daysValid * 24 * 60 * 60 * 1000);
  return expiry.toISOString();
}

function countPassedChecks(phases: any): number {
  let count = 0;
  if (phases.criminalCheckStatus === 'PASS') count++;
  if (phases.financialCheckStatus === 'PASS') count++;
  if (phases.professionalCheckStatus === 'PASS') count++;
  if (phases.insuranceCheckStatus === 'PASS') count++;
  return count;
}

function generateReferenceId(checkType: string): string {
  const prefix = checkType.substring(0, 3).toUpperCase();
  const timestamp = Date.now().toString(36).toUpperCase();
  const random = Math.random().toString(36).substring(2, 6).toUpperCase();
  return `${prefix}-${timestamp}-${random}`;
}
