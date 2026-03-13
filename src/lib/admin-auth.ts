import { getServerSession } from 'next-auth';
import { NextResponse } from 'next/server';
import { authOptions } from '@/lib/auth';
import { isAdminRole } from '@/lib/admin-constants';

/**
 * Returns the session if the user is an admin. Otherwise returns a 401/403 JSON response.
 * Use in API route handlers: const sessionOrError = await requireAdmin(); if (sessionOrError instanceof NextResponse) return sessionOrError;
 */
export async function requireAdmin(): Promise<
  { user: { id: string; email: string | null; name: string | null; role: string } } | NextResponse
> {
  const session = await getServerSession(authOptions);
  if (!session?.user) {
    return NextResponse.json({ error: 'Not authenticated' }, { status: 401 });
  }
  if (!isAdminRole(session.user.role as string)) {
    return NextResponse.json({ error: 'Forbidden' }, { status: 403 });
  }
  return session as { user: { id: string; email: string | null; name: string | null; role: string } };
}
