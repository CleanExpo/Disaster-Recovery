import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError } from '@/lib/api-errors';
import { startModule } from '@/lib/services/client-onboarding.service';
import { prisma } from '@/lib/prisma';
import { z, ZodError } from 'zod';

export const dynamic = 'force-dynamic';

const startModuleSchema = z.object({
  moduleId: z.string().regex(/^MODULE-\d{3}$/, 'Invalid module ID format'),
});

/**
 * POST /api/client/onboarding/education/module/start
 *
 * Mark education module as started
 * Tracks when client begins viewing module content
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
    const validated = startModuleSchema.parse(body);

    // Get onboarding record
    const onboarding = await prisma.clientOnboarding.findUnique({
      where: { clientId: user.id },
    });

    if (!onboarding) {
      return NextResponse.json(
        { success: false, error: 'Onboarding not initialized' },
        { status: 404 }
      );
    }

    // Start the module
    await startModule(onboarding.id, validated.moduleId);

    return NextResponse.json({
      success: true,
      message: 'Module started',
      moduleId: validated.moduleId,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}
