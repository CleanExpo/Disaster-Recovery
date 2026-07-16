import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';
import { getSessionFromRequest } from '@/lib/auth/session';
import { requireAdmin } from '@/lib/admin-auth';

export async function POST(req: NextRequest) {
  const log = requestLogger(req, { route: '/api/log-error' });
  let body: Record<string, unknown>;
  try {
    body = (await req.json()) as Record<string, unknown>;
  } catch {
    return NextResponse.json({ error: 'Invalid JSON body' }, { status: 400 });
  }

  const message = body.message;
  const stack = body.stack;
  const level = (body.level as string) ?? 'error';
  const source = (body.source as string) ?? 'frontend';
  const metadata = body.metadata;

  if (!message || typeof message !== 'string') {
    return NextResponse.json({ error: 'Missing required field: message' }, { status: 400 });
  }

  try {
    // Session is optional — attach user if we have one, don't fail the log if we don't.
    const session = await getSessionFromRequest(req).catch(() => null);
    const actorEmail = session?.email ?? null;

    const validLevels = ['error', 'warning', 'info'];
    const sanitisedLevel = validLevels.includes(level) ? level : 'error';

    const ipAddress =
      req.headers.get('x-forwarded-for') || req.headers.get('x-real-ip') || 'unknown';
    const userAgent = req.headers.get('user-agent') || 'unknown';

    // ── Persist (best-effort) ───────────────────────────────────────────────
    // Error logging is best-effort telemetry. A DB failure here must not
    // become an additional 500 for the caller — we fall back to 202 Accepted.
    try {
      const errorLog = await prisma.errorLog.create({
        data: {
          level: sanitisedLevel,
          message: message.slice(0, 2000),
          stack: stack ? String(stack).slice(0, 5000) : null,
          metadata: metadata ? JSON.stringify(metadata).slice(0, 5000) : null,
          source: source ? String(source).slice(0, 100) : 'frontend',
          userId: actorEmail,
          ipAddress,
          userAgent: userAgent.slice(0, 500),
        },
      });

      if (sanitisedLevel === 'error') {
        await prisma.auditLog.create({
          data: {
            action: 'ERROR_LOGGED',
            resource: 'application',
            resourceId: errorLog.id,
            details: JSON.stringify({
              errorId: errorLog.id,
              message: message.slice(0, 500),
              source,
            }),
            userId: actorEmail,
            ipAddress,
            userAgent: userAgent.slice(0, 500),
          },
        });
      }

      await logComplianceEvent({
        eventType: 'api_route_invocation',
        correlationId: '00000000-0000-0000-0000-000000000000',
        correlationType: 'system',
        entityType: 'system',
        metadata: {
          route: '/api/log-error',
          request_id: log.requestId,
          error_id: errorLog.id,
          level: sanitisedLevel,
          source,
        },
      });

      return NextResponse.json({
        success: true,
        errorId: errorLog.id,
      });
    } catch (dbError: unknown) {
      const errMessage = dbError instanceof Error ? dbError.message : 'Unknown error';
      console.error('log-error: DB persistence failed, accepting without store:', errMessage);
      // 200 with persisted:false — callers that care can inspect the body.
      // We intentionally do NOT 500 here because error logging is best-effort
      // telemetry and a downstream DB issue should not cascade into a second
      // error for the client.
      return NextResponse.json(
        { success: true, persisted: false, reason: 'telemetry_unavailable' },
        { status: 200 },
      );
    }
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Unknown error';
    log.error('error logging application error', { error: errMessage });
    captureException(error, {
      tags: { route: '/api/log-error' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json(
      { error: 'Internal server error while logging error' },
      { status: 500 },
    );
  }
}

export async function GET(req: NextRequest) {
  const log = requestLogger(req, { route: '/api/log-error' });
  try {
    const sessionOrError = await requireAdmin();
    if (sessionOrError instanceof NextResponse) return sessionOrError;

    const { searchParams } = new URL(req.url);
    const limit = Math.min(parseInt(searchParams.get('limit') || '50', 10), 200);
    const offset = Math.max(parseInt(searchParams.get('offset') || '0', 10), 0);
    const level = searchParams.get('level');

    const whereClause: Record<string, string> = {};
    if (level && ['error', 'warning', 'info'].includes(level)) {
      whereClause.level = level;
    }

    const [errors, totalCount] = await Promise.all([
      prisma.errorLog.findMany({
        where: whereClause,
        orderBy: { createdAt: 'desc' },
        take: limit,
        skip: offset,
      }),
      prisma.errorLog.count({ where: whereClause }),
    ]);

    return NextResponse.json({
      errors,
      totalCount,
      hasMore: offset + limit < totalCount,
    });
  } catch (error: unknown) {
    const errMessage = error instanceof Error ? error.message : 'Unknown error';
    log.error('error fetching error logs', { error: errMessage });
    captureException(error, {
      tags: { route: '/api/log-error' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
