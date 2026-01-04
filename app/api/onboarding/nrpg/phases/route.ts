/**
 * NRPG Onboarding Phases API
 * GET: Retrieve contractor's phase progress
 * PATCH: Update phase checklist items
 */

import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';

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

    // Get or create phase record
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

    // Calculate phase summaries
    const phaseSummary = {
      phase1: {
        status: phases.phase1Status,
        startDate: phases.phase1StartDate,
        completeDate: phases.phase1CompleteDate,
        checklist: [
          { key: 'applicationSubmitted', label: 'Application Submitted', complete: phases.applicationSubmitted },
          { key: 'eligibilityReviewed', label: 'Eligibility Reviewed', complete: phases.eligibilityReviewed },
          { key: 'backgroundCheckInitiated', label: 'Background Check Initiated', complete: phases.backgroundCheckInitiated },
        ],
        completedItems: [phases.applicationSubmitted, phases.eligibilityReviewed, phases.backgroundCheckInitiated].filter(Boolean).length,
        totalItems: 3,
      },
      phase2: {
        status: phases.phase2Status,
        startDate: phases.phase2StartDate,
        completeDate: phases.phase2CompleteDate,
        checklist: [
          { key: 'carsiOnboarded', label: 'CARSI Platform Onboarded', complete: phases.carsiOnboarded },
          { key: 'associationIntegrated', label: 'Association Integrated', complete: phases.associationIntegrated },
          { key: 'competencyVerified', label: 'Competency Verified', complete: phases.competencyVerified },
        ],
        completedItems: [phases.carsiOnboarded, phases.associationIntegrated, phases.competencyVerified].filter(Boolean).length,
        totalItems: 3,
      },
      phase3: {
        status: phases.phase3Status,
        startDate: phases.phase3StartDate,
        completeDate: phases.phase3CompleteDate,
        checklist: [
          { key: 'standardsTrainingComplete', label: 'Standards Training Complete', complete: phases.standardsTrainingComplete },
          { key: 'commitmentSigned', label: 'Commitment Framework Signed', complete: phases.commitmentSigned },
          { key: 'platformActivated', label: 'Platform Activated', complete: phases.platformActivated },
        ],
        completedItems: [phases.standardsTrainingComplete, phases.commitmentSigned, phases.platformActivated].filter(Boolean).length,
        totalItems: 3,
      },
      phase4: {
        status: phases.phase4Status,
        startDate: phases.phase4StartDate,
        completeDate: phases.phase4CompleteDate,
        probationEndDate: phases.probationEndDate,
        performanceReviewScore: phases.performanceReviewScore,
        fullCertificationGranted: phases.fullCertificationGranted,
        daysRemaining: phases.probationEndDate
          ? Math.max(0, Math.ceil((new Date(phases.probationEndDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24)))
          : null,
      },
      backgroundChecks: {
        criminal: { status: phases.criminalCheckStatus, date: phases.criminalCheckDate, ref: phases.criminalCheckRef },
        financial: { status: phases.financialCheckStatus, date: phases.financialCheckDate, ref: phases.financialCheckRef },
        professional: { status: phases.professionalCheckStatus, date: phases.professionalCheckDate, ref: phases.professionalCheckRef },
        insurance: { status: phases.insuranceCheckStatus, date: phases.insuranceCheckDate, ref: phases.insuranceCheckRef },
        allPass: phases.allChecksPass,
      },
      overall: {
        status: phases.overallStatus,
        currentPhase: getCurrentPhase(phases),
        percentComplete: calculateOverallProgress(phases),
      },
    };

    return NextResponse.json({
      success: true,
      data: {
        phases,
        summary: phaseSummary,
      },
    });
  } catch (error) {
    console.error('Error fetching phases:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

export async function PATCH(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user) {
      return NextResponse.json({ success: false, error: 'Unauthorised' }, { status: 401 });
    }

    const userId = (session.user as any).id;
    const body = await request.json();

    const contractor = await prisma.contractor.findFirst({
      where: { userId },
      select: { id: true },
    });

    if (!contractor) {
      return NextResponse.json({ success: false, error: 'Contractor not found' }, { status: 404 });
    }

    // Build update data from body
    const updateData: any = {};

    // Phase 1 checklist items
    if (body.applicationSubmitted !== undefined) updateData.applicationSubmitted = body.applicationSubmitted;
    if (body.eligibilityReviewed !== undefined) updateData.eligibilityReviewed = body.eligibilityReviewed;
    if (body.backgroundCheckInitiated !== undefined) updateData.backgroundCheckInitiated = body.backgroundCheckInitiated;

    // Phase 2 checklist items
    if (body.carsiOnboarded !== undefined) updateData.carsiOnboarded = body.carsiOnboarded;
    if (body.associationIntegrated !== undefined) updateData.associationIntegrated = body.associationIntegrated;
    if (body.competencyVerified !== undefined) updateData.competencyVerified = body.competencyVerified;

    // Phase 3 checklist items
    if (body.standardsTrainingComplete !== undefined) updateData.standardsTrainingComplete = body.standardsTrainingComplete;
    if (body.commitmentSigned !== undefined) {
      updateData.commitmentSigned = body.commitmentSigned;
      if (body.commitmentSigned) updateData.commitmentSignedAt = new Date();
    }
    if (body.platformActivated !== undefined) updateData.platformActivated = body.platformActivated;

    // Phase 4 items
    if (body.performanceReviewScore !== undefined) updateData.performanceReviewScore = body.performanceReviewScore;
    if (body.fullCertificationGranted !== undefined) updateData.fullCertificationGranted = body.fullCertificationGranted;

    // Update phase
    const phases = await prisma.nRPGOnboardingPhase.update({
      where: { contractorId: contractor.id },
      data: updateData,
    });

    // Auto-update phase statuses based on checklist completion
    await updatePhaseStatuses(contractor.id);

    // Fetch updated record
    const updatedPhases = await prisma.nRPGOnboardingPhase.findUnique({
      where: { contractorId: contractor.id },
    });

    return NextResponse.json({
      success: true,
      data: updatedPhases,
    });
  } catch (error) {
    console.error('Error updating phases:', error);
    return NextResponse.json({ success: false, error: 'Internal server error' }, { status: 500 });
  }
}

// Helper functions
function getCurrentPhase(phases: any): number {
  if (phases.phase4Status === 'IN_PROGRESS') return 4;
  if (phases.phase3Status === 'IN_PROGRESS' || phases.phase3Status === 'NOT_STARTED') return 3;
  if (phases.phase2Status === 'IN_PROGRESS' || phases.phase2Status === 'NOT_STARTED') return 2;
  return 1;
}

function calculateOverallProgress(phases: any): number {
  let completed = 0;
  const total = 12; // 3 items per phase × 4 phases

  // Phase 1
  if (phases.applicationSubmitted) completed++;
  if (phases.eligibilityReviewed) completed++;
  if (phases.backgroundCheckInitiated) completed++;

  // Phase 2
  if (phases.carsiOnboarded) completed++;
  if (phases.associationIntegrated) completed++;
  if (phases.competencyVerified) completed++;

  // Phase 3
  if (phases.standardsTrainingComplete) completed++;
  if (phases.commitmentSigned) completed++;
  if (phases.platformActivated) completed++;

  // Phase 4 - special handling
  if (phases.fullCertificationGranted) completed += 3;
  else if (phases.phase4Status === 'IN_PROGRESS') completed += 1;

  return Math.round((completed / total) * 100);
}

async function updatePhaseStatuses(contractorId: string) {
  const phases = await prisma.nRPGOnboardingPhase.findUnique({
    where: { contractorId },
  });

  if (!phases) return;

  const updates: any = {};
  const now = new Date();

  // Phase 1 status
  const phase1Complete = phases.applicationSubmitted && phases.eligibilityReviewed && phases.backgroundCheckInitiated;
  if (phase1Complete && phases.phase1Status !== 'COMPLETED') {
    updates.phase1Status = 'COMPLETED';
    updates.phase1CompleteDate = now;
    updates.phase2Status = 'IN_PROGRESS';
    updates.phase2StartDate = now;
  } else if (!phase1Complete && (phases.applicationSubmitted || phases.eligibilityReviewed || phases.backgroundCheckInitiated)) {
    if (phases.phase1Status === 'NOT_STARTED') {
      updates.phase1Status = 'IN_PROGRESS';
      updates.phase1StartDate = now;
    }
  }

  // Phase 2 status
  const phase2Complete = phases.carsiOnboarded && phases.associationIntegrated && phases.competencyVerified;
  if (phase2Complete && phases.phase2Status !== 'COMPLETED') {
    updates.phase2Status = 'COMPLETED';
    updates.phase2CompleteDate = now;
    updates.phase3Status = 'IN_PROGRESS';
    updates.phase3StartDate = now;
  }

  // Phase 3 status
  const phase3Complete = phases.standardsTrainingComplete && phases.commitmentSigned && phases.platformActivated;
  if (phase3Complete && phases.phase3Status !== 'COMPLETED') {
    updates.phase3Status = 'COMPLETED';
    updates.phase3CompleteDate = now;
    updates.phase4Status = 'IN_PROGRESS';
    updates.phase4StartDate = now;
    updates.probationEndDate = new Date(now.getTime() + 90 * 24 * 60 * 60 * 1000); // 90 days from now
  }

  // Phase 4 status
  if (phases.fullCertificationGranted && phases.phase4Status !== 'COMPLETED') {
    updates.phase4Status = 'COMPLETED';
    updates.phase4CompleteDate = now;
    updates.overallStatus = 'COMPLETED';
  }

  // Update overall status
  if (phase1Complete || phase2Complete || phase3Complete) {
    updates.overallStatus = 'IN_PROGRESS';
  }

  if (Object.keys(updates).length > 0) {
    await prisma.nRPGOnboardingPhase.update({
      where: { contractorId },
      data: updates,
    });
  }
}
