import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError } from '@/lib/api-errors';
import { createWorkspace } from '@/lib/services/workspace.service';
import { z, ZodError } from 'zod';

export const dynamic = 'force-dynamic';

const createWorkspaceSchema = z.object({
  businessName: z.string().min(3, 'Business name must be at least 3 characters').max(200),
  abnNumber: z.string().regex(/^\d{11}$/, 'ABN must be 11 digits').optional(),
  acnNumber: z.string().regex(/^\d{9}$/, 'ACN must be 9 digits').optional(),
  initialTier: z.enum(['BASIC', 'PRO', 'ENTERPRISE']).optional(),
});

/**
 * POST /api/workspace/create
 *
 * Create contractor workspace during onboarding
 * - Creates Workspace record with subscription tier
 * - Adds owner as first team member
 * - Starts trial period
 * - Returns workspace ID for Stripe checkout
 */
export async function POST(request: NextRequest) {
  try {
    // Authenticate
    const authResult = await authenticateRequest(request);
    if (!authResult.success) {
      return authResult.response;
    }

    const { user } = authResult.context;

    // Check role (contractors only)
    if (!requireRole(user, ['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN'])) {
      return unauthorizedRoleResponse(['CONTRACTOR', 'ADMIN', 'SUPER_ADMIN']);
    }

    // Parse and validate
    const body = await request.json();
    const validated = createWorkspaceSchema.parse(body);

    // Create workspace
    const result = await createWorkspace(
      user.id,
      validated.businessName,
      validated.abnNumber,
      validated.initialTier || 'BASIC'
    );

    if (!result.success) {
      return NextResponse.json(
        {
          success: false,
          error: result.error,
        },
        { status: 400 }
      );
    }

    // Audit log
    await prisma.auditLog.create({
      data: {
        workspaceId: result.workspace.id,
        userId: user.id,
        action: 'workspace_created',
        entityType: 'workspace',
        entityId: result.workspace.id,
        metadata: {
          businessName: validated.businessName,
          tier: result.workspace.subscriptionTier,
        },
      },
    });

    return NextResponse.json({
      success: true,
      workspace: {
        id: result.workspace.id,
        businessName: result.workspace.businessName,
        tier: result.workspace.subscriptionTier,
        status: result.workspace.subscriptionStatus,
        trialEnd: result.workspace.currentPeriodEnd,
      },
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

// Need to import prisma
import { prisma } from '@/lib/prisma';
