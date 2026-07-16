import { NextRequest, NextResponse } from 'next/server';
import {
  ACCESS_COOKIE,
  REFRESH_COOKIE,
  issueSession,
  setAuthCookies,
  verifySessionToken,
} from '@/lib/auth/session';

export const dynamic = 'force-dynamic';

export async function POST(request: NextRequest) {
  const refresh = request.cookies.get(REFRESH_COOKIE)?.value;
  if (!refresh) {
    return NextResponse.json({ error: 'No refresh token' }, { status: 401 });
  }

  const claims = await verifySessionToken(refresh);
  if (!claims || claims.typ !== 'refresh') {
    const res = NextResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    res.cookies.set(ACCESS_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
    res.cookies.set(REFRESH_COOKIE, '', { httpOnly: true, path: '/', maxAge: 0 });
    return res;
  }

  const tokens = await issueSession({
    userId: claims.userId,
    email: claims.email,
    role: claims.role,
    name: claims.name,
    contractorId: claims.contractorId,
  });

  const res = NextResponse.json({ success: true });
  setAuthCookies(res, tokens, false);
  return res;
}
