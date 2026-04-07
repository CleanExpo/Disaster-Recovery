// POST /api/nexus/agents/[id]/trigger — manually triggers a NEXUS agent (admin only)
// Stub: logs the trigger attempt to AuditLog and returns a queued confirmation.

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { getNexusAgent } from '@/lib/nexus';

interface RouteContext {
  params: { id: string };
}

export async function POST(request: NextRequest, context: RouteContext) {
  // Require admin session
  const sessionOrError = await requireAdmin();
  if (sessionOrError instanceof NextResponse) return sessionOrError;

  const { id } = context.params;

  // Validate agent exists
  const agent = getNexusAgent(id);
  if (!agent) {
    return NextResponse.json(
      { error: `Unknown agent: ${id}` },
      { status: 404 }
    );
  }

  // Log the trigger attempt to AuditLog
  try {
    await prisma.auditLog.create({
      data: {
        userId: sessionOrError.user.id,
        action: 'nexus_agent_trigger',
        resource: 'nexus_agent',
        resourceId: id,
        details: JSON.stringify({
          agentId: id,
          agentName: agent.name,
          triggeredBy: sessionOrError.user.email,
        }),
        success: true,
      },
    });
  } catch (err) {
    // Non-fatal — log but do not block the response
    console.error('[NEXUS] Failed to write AuditLog entry:', err);
  }

  return NextResponse.json({
    queued: true,
    agentId: id,
    message: 'Agent activation pending configuration',
  });
}
