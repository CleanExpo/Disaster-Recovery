import { NextRequest, NextResponse } from 'next/server';
import { getSessionFromRequest } from '@/lib/auth/session';
import { z } from 'zod';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

const CreateAuditLogSchema = z.object({
  action: z.string().min(1),
  resource: z.string().min(1),
  resourceId: z.string().optional(),
  details: z.unknown().optional(),
  success: z.boolean().optional().default(true),
});

export async function POST(req: NextRequest) {
  const log = requestLogger(req, { route: '/api/audit/log' });
  try {
    const session = await getSessionFromRequest(req);
    const body = await req.json();

    const parsed = CreateAuditLogSchema.safeParse(body);
    if (!parsed.success) {
      return NextResponse.json(
        { error: 'Validation failed', issues: parsed.error.issues },
        { status: 400 },
      );
    }

    const { action, resource, resourceId, details, success } = parsed.data;

    const auditLog = await prisma.auditLog.create({
      data: {
        action,
        resource,
        resourceId: resourceId ?? null,
        details: details !== undefined ? JSON.stringify(details) : null,
        success,
        userId: session?.email ?? null,
        ipAddress:
          req.headers.get('x-forwarded-for')?.split(',')[0].trim() ??
          req.headers.get('x-real-ip') ??
          null,
        userAgent: req.headers.get('user-agent') ?? null,
      },
    });

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/audit/log',
        request_id: log.requestId,
        audit_log_id: auditLog.id,
        action,
        resource,
      },
    });

    return NextResponse.json({ success: true, logId: auditLog.id });
  } catch (error) {
    captureException(error, {
      tags: { route: '/api/audit/log' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function GET(req: NextRequest) {
  try {
    const session = await getSessionFromRequest(req);

    if (!session) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get('limit') ?? '50', 10), 200);
    const offset = Math.max(parseInt(searchParams.get('offset') ?? '0', 10), 0);
    const action = searchParams.get('action') ?? undefined;
    const resource = searchParams.get('resource') ?? undefined;

    const where = {
      ...(action ? { action } : {}),
      ...(resource ? { resource } : {}),
    };

    const [logs, totalCount] = await Promise.all([
      prisma.auditLog.findMany({
        where,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.auditLog.count({ where }),
    ]);

    return NextResponse.json({
      logs: logs.map((log) => ({
        ...log,
        details: log.details ? (JSON.parse(log.details) as unknown) : null,
      })),
      totalCount,
      hasMore: offset + limit < totalCount,
    });
  } catch (error) {
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
