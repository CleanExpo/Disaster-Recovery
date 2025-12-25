import { NextRequest, NextResponse } from 'next/server';
import { ContractorOnboardingService } from '@/lib/contractor-onboarding-service';
import { handleAPIError } from '@/lib/api-errors';

/**
 * GET /api/onboarding/progress/[contractorId]
 * Get contractor onboarding progress report
 */
export async function GET(
  request: NextRequest,
  { params }: { params: { contractorId: string } }
) {
  try {
    const { contractorId } = params;

    const progressReport = await ContractorOnboardingService.getProgressReport(contractorId);

    if (!progressReport) {
      return NextResponse.json(
        { error: 'Onboarding record not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({
      success: true,
      progress: progressReport,
    });
  } catch (error) {
    console.error('Progress report error:', error);
    return handleAPIError(error);
  }
}
