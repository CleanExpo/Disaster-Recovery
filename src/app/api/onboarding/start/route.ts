import { NextRequest, NextResponse } from 'next/server';
import { ContractorOnboardingService } from '@/lib/contractor-onboarding-service';
import { handleAPIError } from '@/lib/api-errors';

/**
 * POST /api/onboarding/start
 * Start contractor onboarding process with AI assessment
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const { contractorId, specialization, experience, certifications, businessName } = body;

    // Validate required fields
    if (!contractorId || !specialization || !businessName) {
      return NextResponse.json(
        { error: 'Missing required fields: contractorId, specialization, businessName' },
        { status: 400 }
      );
    }

    // Generate personalized onboarding path
    const onboarding = await ContractorOnboardingService.generateOnboardingPath({
      contractorId,
      specialization,
      experience: experience || 0,
      certifications: certifications || [],
      businessName,
    });

    return NextResponse.json({
      success: true,
      onboarding: {
        id: onboarding.id,
        contractorId: onboarding.contractorId,
        specialization: onboarding.specialization,
        assessmentScore: onboarding.assessmentScore,
        recommendedModules: onboarding.recommendedModules,
        startDate: onboarding.startDate,
        targetCompletionDate: onboarding.targetCompletionDate,
        status: onboarding.status,
      },
      message: 'Onboarding path generated successfully',
    });
  } catch (error) {
    console.error('Onboarding start error:', error);
    return handleAPIError(error);
  }
}
