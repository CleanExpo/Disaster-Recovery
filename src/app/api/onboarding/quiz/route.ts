import { NextRequest, NextResponse } from 'next/server';
import { ContractorOnboardingService } from '@/lib/contractor-onboarding-service';
import { handleAPIError } from '@/lib/api-errors';

/**
 * POST /api/onboarding/quiz
 * Generate AI-powered assessment quiz for a module
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { moduleId, contractorId } = body;

    if (!moduleId || !contractorId) {
      return NextResponse.json(
        { error: 'Missing required fields: moduleId, contractorId' },
        { status: 400 }
      );
    }

    // Generate personalized quiz using AI
    const quiz = await ContractorOnboardingService.generateAssessmentQuiz(
      moduleId,
      contractorId
    );

    return NextResponse.json({
      success: true,
      quiz: {
        moduleId,
        questions: quiz.questions || [],
        totalQuestions: quiz.questions?.length || 0,
        passingScore: 70,
        timeLimit: 30, // 30 minutes
      },
    });
  } catch (error) {
    console.error('Quiz generation error:', error);
    return handleAPIError(error);
  }
}
