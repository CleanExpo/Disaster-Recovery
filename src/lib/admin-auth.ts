import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import { ACCESS_COOKIE, verifySessionToken, type SessionUser } from '@/lib/auth/session';
import { isAdminRole } from '@/lib/admin-constants';

/**
 * Returns the session if the user is an admin. Otherwise returns a 401/403 JSON response.
 * Prefer cookie JWT session; NextAuth is no longer the gate.
 */
export async function requireAdmin(): Promise<
  { user: { id: string; email: string | null; name: string | null; role: string } } | NextResponse
> {
  try {
    const jar = await cookies();
    const token = jar.get(ACCESS_COOKIE)?.value;
    if (!token) {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    const session = await verifySessionToken(token);
    if (!session || session.typ === 'refresh') {
      return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
    }
    if (!isAdminRole(session.role)) {
      return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
    }
    return {
      user: {
        id: session.userId,
        email: session.email,
        name: session.name ?? null,
        role: session.role,
      },
    };
  } catch {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
}

/** @deprecated Use getSessionFromCookies from @/lib/auth/session */
export type AdminSessionUser = SessionUser;
