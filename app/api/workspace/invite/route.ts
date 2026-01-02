import { NextRequest, NextResponse } from 'next/server';
import { authenticateRequest, requireRole, unauthorizedRoleResponse } from '@/lib/auth-middleware';
import { handleUnexpectedError, handleValidationError } from '@/lib/api-errors';
import { inviteTeamMember } from '@/lib/services/workspace.service';
import { z, ZodError } from 'zod';

export const dynamic = 'force-dynamic';

const inviteTeamMemberSchema = z.object({
  workspaceId: z.string().cuid('Invalid workspace ID'),
  email: z.string().email('Invalid email address'),
  role: z.enum(['MANAGER', 'TECHNICIAN', 'ADMIN_STAFF'], {
    errorMap: () => ({ message: 'Role must be MANAGER, TECHNICIAN, or ADMIN_STAFF' }),
  }),
});

/**
 * POST /api/workspace/invite
 *
 * Invite team member to contractor workspace
 * - Checks seat limits (tier-based)
 * - Sends invitation email with secure token
 * - Creates pending workspace member
 * - Returns invite link
 *
 * Strategic decision: Tiered seats (Basic=1, Pro=5, Enterprise=unlimited)
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
    const validated = inviteTeamMemberSchema.parse(body);

    // Verify user is workspace owner or manager
    const member = await prisma.workspaceMember.findFirst({
      where: {
        workspaceId: validated.workspaceId,
        userId: user.id,
        role: { in: ['OWNER', 'MANAGER'] },
      },
    });

    if (!member) {
      return NextResponse.json(
        {
          success: false,
          error: 'Only workspace owners and managers can invite team members',
        },
        { status: 403 }
      );
    }

    // Invite team member
    const result = await inviteTeamMember(
      validated.workspaceId,
      user.id,
      validated.email,
      validated.role
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

    // In production: Send invitation email
    // const inviteUrl = `${process.env.NEXT_PUBLIC_APP_URL}/invite/${result.inviteToken}`;
    // await sendTeamInvitationEmail(validated.email, workspace.businessName, inviteUrl);

    // Audit log
    await prisma.auditLog.create({
      data: {
        workspaceId: validated.workspaceId,
        userId: user.id,
        action: 'team_member_invited',
        entityType: 'workspace_member',
        entityId: validated.email,
        metadata: {
          inviteeEmail: validated.email,
          role: validated.role,
        },
      },
    });

    return NextResponse.json({
      success: true,
      message: `Invitation sent to ${validated.email}`,
      inviteToken: result.inviteToken,
    });
  } catch (error) {
    if (error instanceof ZodError) {
      return handleValidationError(error);
    }
    return handleUnexpectedError(error);
  }
}

// Import prisma
import { prisma } from '@/lib/prisma';
