/**
 * Workspace Management Service
 *
 * Manages contractor workspaces (businesses), team members, and invitations
 * Based on SaaS Architecture Spec:
 * - Workspace = contractor business entity
 * - Team members with roles (owner, manager, technician, admin_staff)
 * - Invitation flow via email
 */

import { prisma } from '@/lib/prisma';
import { WorkspaceMemberRole, SubscriptionTier } from '@prisma/client';
import { getTierConfig, canAddTeamMember } from './subscription-tier.service';
import crypto from 'crypto';

// ============================================================================
// WORKSPACE CREATION
// ============================================================================

/**
 * Create new workspace during contractor onboarding
 */
export async function createWorkspace(
  ownerId: string,
  businessName: string,
  abnNumber?: string,
  initialTier: SubscriptionTier = 'BASIC'
): Promise<{
  success: boolean;
  workspace?: any;
  error?: string;
}> {
  try {
    // Check if user already owns a workspace
    const existing = await prisma.workspace.findFirst({
      where: { ownerId },
    });

    if (existing) {
      return {
        success: false,
        error: 'User already owns a workspace',
      };
    }

    const config = getTierConfig(initialTier);

    // Create workspace
    const workspace = await prisma.workspace.create({
      data: {
        ownerId,
        businessName,
        abnNumber,
        subscriptionTier: initialTier,
        subscriptionStatus: 'TRIAL', // Start with trial
        seatLimit: config.seatLimit,
        monthlyJobLimit: config.monthlyJobLimit,
        serviceRadiusKm: config.serviceRadiusKm,
        crmType: 'nrpg_basic', // Default to included CRM
      },
    });

    // Create owner as first member
    await prisma.workspaceMember.create({
      data: {
        workspaceId: workspace.id,
        userId: ownerId,
        role: 'OWNER',
        joinedAt: new Date(),
      },
    });

    return {
      success: true,
      workspace,
    };
  } catch (error) {
    console.error('Failed to create workspace:', error);
    return {
      success: false,
      error: 'Failed to create workspace',
    };
  }
}

// ============================================================================
// TEAM MEMBER MANAGEMENT
// ============================================================================

/**
 * Invite team member to workspace
 */
export async function inviteTeamMember(
  workspaceId: string,
  inviterUserId: string,
  email: string,
  role: WorkspaceMemberRole = 'TECHNICIAN'
): Promise<{
  success: boolean;
  inviteToken?: string;
  error?: string;
}> {
  try {
    // Get workspace
    const workspace = await prisma.workspace.findUnique({
      where: { id: workspaceId },
      include: {
        members: true,
      },
    });

    if (!workspace) {
      return { success: false, error: 'Workspace not found' };
    }

    // Check seat limit
    const seatCheck = canAddTeamMember(
      workspace.subscriptionTier,
      workspace.members.length
    );

    if (!seatCheck.allowed) {
      return { success: false, error: seatCheck.reason };
    }

    // Check if user already exists
    let inviteeUser = await prisma.user.findUnique({
      where: { email },
    });

    // If user doesn't exist, create placeholder (completed on accept)
    if (!inviteeUser) {
      inviteeUser = await prisma.user.create({
        data: {
          email,
          name: email.split('@')[0], // Temporary name
          userType: 'CONTRACTOR',
          isEmailVerified: false,
        },
      });
    }

    // Check if already a member
    const existingMember = await prisma.workspaceMember.findUnique({
      where: {
        workspaceId_userId: {
          workspaceId,
          userId: inviteeUser.id,
        },
      },
    });

    if (existingMember) {
      return { success: false, error: 'User is already a team member' };
    }

    // Generate invitation token (7-day expiry)
    const inviteToken = crypto.randomBytes(32).toString('hex');

    // Create workspace member record (pending)
    await prisma.workspaceMember.create({
      data: {
        workspaceId,
        userId: inviteeUser.id,
        role,
        invitedBy: inviterUserId,
        invitedAt: new Date(),
        joinedAt: null, // Set when they accept
      },
    });

    // In production: Send invitation email with token
    // await sendTeamInvitationEmail(email, workspace.businessName, inviteToken);

    return {
      success: true,
      inviteToken,
    };
  } catch (error) {
    console.error('Failed to invite team member:', error);
    return {
      success: false,
      error: 'Failed to send invitation',
    };
  }
}

/**
 * Accept team invitation
 */
export async function acceptInvitation(
  userId: string,
  inviteToken: string
): Promise<{
  success: boolean;
  workspace?: any;
  error?: string;
}> {
  // In production: Verify token, check expiry
  // For now, mark as joined

  const member = await prisma.workspaceMember.findFirst({
    where: {
      userId,
      joinedAt: null, // Pending invitation
    },
    include: {
      workspace: true,
    },
  });

  if (!member) {
    return {
      success: false,
      error: 'Invalid or expired invitation',
    };
  }

  // Mark as joined
  await prisma.workspaceMember.update({
    where: { id: member.id },
    data: {
      joinedAt: new Date(),
    },
  });

  return {
    success: true,
    workspace: member.workspace,
  };
}

/**
 * Remove team member from workspace
 */
export async function removeTeamMember(
  workspaceId: string,
  userId: string,
  removedBy: string
): Promise<{ success: boolean; error?: string }> {
  // Cannot remove owner
  const member = await prisma.workspaceMember.findUnique({
    where: {
      workspaceId_userId: {
        workspaceId,
        userId,
      },
    },
  });

  if (!member) {
    return { success: false, error: 'Member not found' };
  }

  if (member.role === 'OWNER') {
    return { success: false, error: 'Cannot remove workspace owner' };
  }

  await prisma.workspaceMember.delete({
    where: { id: member.id },
  });

  // Audit log
  await prisma.auditLog.create({
    data: {
      workspaceId,
      userId: removedBy,
      action: 'team_member_removed',
      entityType: 'workspace_member',
      entityId: userId,
      metadata: {
        removedUserId: userId,
        removedRole: member.role,
      },
    },
  });

  return { success: true };
}

// ============================================================================
// USAGE TRACKING
// ============================================================================

/**
 * Increment job count for workspace (call when job accepted)
 */
export async function incrementJobCount(workspaceId: string): Promise<void> {
  await prisma.workspace.update({
    where: { id: workspaceId },
    data: {
      currentMonthJobs: { increment: 1 },
      totalJobsCompleted: { increment: 1 },
    },
  });
}

/**
 * Reset monthly job counters (run on 1st of each month)
 */
export async function resetMonthlyCounters(): Promise<number> {
  const result = await prisma.workspace.updateMany({
    data: {
      currentMonthJobs: 0,
    },
  });

  return result.count;
}

/**
 * Track overage fee
 */
export async function recordOverageFee(
  workspaceId: string,
  amount: number
): Promise<void> {
  await prisma.workspace.update({
    where: { id: workspaceId },
    data: {
      totalOverageFees: { increment: amount },
    },
  });

  // Audit log
  await prisma.auditLog.create({
    data: {
      workspaceId,
      action: 'overage_fee_charged',
      entityType: 'workspace',
      entityId: workspaceId,
      metadata: {
        amount,
        timestamp: new Date().toISOString(),
      },
    },
  });
}
