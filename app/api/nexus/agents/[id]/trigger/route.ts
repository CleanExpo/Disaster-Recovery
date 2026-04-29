// POST /api/nexus/agents/[id]/trigger — manually triggers a NEXUS agent (admin only)
// Stub: logs the trigger attempt to AuditLog and returns a queued confirmation.

import { NextRequest, NextResponse } from 'next/server';
import { requireAdmin } from '@/lib/admin-auth';
import { prisma } from '@/lib/prisma';
import { getNexusAgent } from '@/lib/nexus';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

interface RouteContext {
  params: { id: string };
}

export async function POST(request: NextRequest, context: RouteContext) {
  const log = requestLogger(request, { route: '/api/nexus/agents/[id]/trigger' });
  // Require admin session
  const sessionOrError = await requireAdmin();
  if (sessionOrError instanceof NextResponse) return sessionOrError;

  const { id } = context.params;

  // Validate agent exists
  const agent = getNexusAgent(id);
  if (!agent) {
    return NextResponse.json({ error: `Unknown agent: ${id}` }, { status: 404 });
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
    log.error('failed to write AuditLog entry', {
      ref: 'NEXUS',
      error: err instanceof Error ? err.message : String(err),
    });
    captureException(err, {
      tags: { route: '/api/nexus/agents/[id]/trigger' },
      extra: { requestId: log.requestId, agentId: id },
    });
  }

  await logComplianceEvent({
    eventType: 'api_route_invocation',
    correlationId: '00000000-0000-0000-0000-000000000000',
    correlationType: 'system',
    entityType: 'system',
    metadata: {
      route: '/api/nexus/agents/[id]/trigger',
      request_id: log.requestId,
      agent_id: id,
      triggered_by_user_id: sessionOrError.user.id,
    },
  });

  return NextResponse.json({
    queued: true,
    agentId: id,
    message: 'Agent activation pending configuration',
  });
}
