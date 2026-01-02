import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError } from '@/lib/api-errors';
import { completePhase } from '@/lib/services/client-onboarding.service';
import { sendPhaseCompletionEmail } from '@/lib/services/client-email.service';
import { servicePreferencesSchema } from '@/lib/validations/client-onboarding';
import { prisma } from '@/lib/prisma';
import { ZodError } from 'zod';

export const dynamic = 'force-dynamic';

/**
 * POST /api/client/onboarding/services
 *
 * Save Phase 2: Service preferences
 * Updates UserPreferences with service types, urgency, budget
 * Completes services phase and advances to property
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role
    if (!requireRole(user, ['CLIENT', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CLIENT', 'ADMIN', 'SUPER_ADMIN']);
    }

    // Parse and validate
    const body = await request.json();
    const validated = servicePreferencesSchema.parse(body);

    // Update user preferences
    await prisma.userPreferences.upsert({
      where: { userId: user.id },
      update: {
        primaryServiceTypes: validated.primaryServiceTypes,
        urgencyPreference: validated.urgencyPreference,
        typicalBudgetRange: validated.typicalBudgetRange,
        serviceFrequency: validated.serviceFrequency,
        pastServiceExperience: validated.pastServiceExperience,
        emergencyContactAvailable: validated.emergencyContactAvailable,
      },
      create: {
        userId: user.id,
        primaryServiceTypes: validated.primaryServiceTypes,
        urgencyPreference: validated.urgencyPreference,
        typicalBudgetRange: validated.typicalBudgetRange,
        serviceFrequency: validated.serviceFrequency,
        pastServiceExperience: validated.pastServiceExperience,
        emergencyContactAvailable: validated.emergencyContactAvailable,
      },
    });

    // Complete phase
    const result = await completePhase(user.id, 'services');

    // Send phase completion email (non-blocking)
    await sendPhaseCompletionEmail({
      clientName: user.name || 'Valued Client',
      clientEmail: user.email,
      phaseName: 'Service Preferences',
      phaseNumber: 2,
      completionPercentage: result.completionPercentage,
      nextPhaseName: result.nextPhase ? 'Property Details' : undefined,
      nextPhaseUrl: result.nextPhase ? `${process.env.NEXT_PUBLIC_APP_URL}/dashboard/client/onboarding/${result.nextPhase}` : undefined,
      estimatedMinutes: 5,
    }).catch((err) => {
      console.error('Failed to send phase completion email:', err);
    });

    return NextResponse.json({
      success: true,
      message: result.message,
      nextPhase: result.nextPhase,
      nextPhaseUrl: result.nextPhase ? `/dashboard/client/onboarding/${result.nextPhase}` : '/dashboard/client/onboarding/checklist',
      completionPercentage: result.completionPercentage,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
