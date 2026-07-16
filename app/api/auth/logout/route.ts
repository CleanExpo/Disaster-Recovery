import { NextRequest, NextResponse } from 'next/server';
import { clearAuthCookies, getSessionFromRequest } from '@/lib/auth/session';
import { logComplianceEvent, hashIdentifier } from '@/lib/compliance/events';
import { requestLogger } from '@/lib/observability';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/auth/logout' });
  const session = await getSessionFromRequest(request);
  const res = NextResponse.json({ success: true });
  clearAuthCookies(res);

  if (session) {
    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: session.userId,
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/auth/logout',
        request_id: log.requestId,
        email_hash: hashIdentifier(session.email),
      },
    });
  }

  return res;
}
