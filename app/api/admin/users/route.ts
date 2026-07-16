/**
 * GET /api/admin/users
 *
 * Returns a paginated list of admin-level users.
 * Requires: authenticated cookie session with an admin role.
 */

import { type NextRequest, NextResponse } from 'next/server';
import { requireAdminSession } from '@/lib/auth/session';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const log = requestLogger(request, { route: '/api/admin/users' });
  const sessionOrErr = await requireAdminSession(request);
  if (sessionOrErr instanceof NextResponse) return sessionOrErr;

  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') ?? '20', 10)));
  const skip = (page - 1) * limit;

  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: { userType: { in: ['ADMIN', 'SUPER_ADMIN'] } },
        select: {
          id: true,
          name: true,
          email: true,
          userType: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.user.count({
        where: { userType: { in: ['ADMIN', 'SUPER_ADMIN'] } },
      }),
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        pages: Math.ceil(total / limit),
      },
    });
  } catch (err) {
    log.error('database error', { error: err instanceof Error ? err.message : String(err) });
    captureException(err, {
      tags: { route: '/api/admin/users' },
      extra: { requestId: log.requestId },
    });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
