/**
 * GET /api/admin/users
 *
 * Returns a paginated list of admin-level users.
 * Requires: authenticated session with an admin role.
 *
 * Auth is enforced at two layers:
 *   1. Middleware (src/middleware.ts) — redirects unauthenticated requests to /login
 *   2. This handler — returns 401/403 for API clients that bypass middleware (e.g. direct API calls)
 */

import { type NextRequest, NextResponse } from 'next/server';
import { getToken } from 'next-auth/jwt';
import { isAdminRole } from '@/lib/admin-constants';
import { prisma } from '@/lib/prisma';
import { requestLogger, captureException } from '@/lib/observability';

export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest): Promise<NextResponse> {
  const log = requestLogger(request, { route: '/api/admin/users' });
  // ── Auth check ────────────────────────────────────────────────────────────
  let token: Awaited<ReturnType<typeof getToken>> = null;
  try {
    token = await getToken({
      req: request,
      secret: process.env.NEXTAUTH_SECRET,
    });
  } catch {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  if (!token) {
    return NextResponse.json({ error: 'Unauthorised' }, { status: 401 });
  }

  if (!isAdminRole(token.role as string | undefined)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }

  // ── Query ─────────────────────────────────────────────────────────────────
  const url = new URL(request.url);
  const page = Math.max(1, parseInt(url.searchParams.get('page') ?? '1', 10));
  const limit = Math.min(100, Math.max(1, parseInt(url.searchParams.get('limit') ?? '20', 10)));
  const skip = (page - 1) * limit;

  try {
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where: { role: { in: ['admin', 'super_admin', 'ADMIN', 'MANAGER'] } },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          createdAt: true,
        },
        orderBy: { createdAt: 'desc' },
        skip,
        take: limit,
      }),
      prisma.user.count({
        where: { role: { in: ['admin', 'super_admin', 'ADMIN', 'MANAGER'] } },
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
    captureException(err, { tags: { route: '/api/admin/users' }, extra: { requestId: log.requestId } });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}
