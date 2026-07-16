import { redirect } from 'next/navigation';
import { getSessionFromCookies } from '@/lib/auth/session';
import { dashboardPathForRole } from '@/lib/auth/roles';

/** Unified post-login entry — redirect by role. */
export default async function DashboardRedirect() {
  const session = await getSessionFromCookies();
  if (!session) {
    redirect('/login?callbackUrl=/dashboard&reason=session_expired');
  }
  redirect(dashboardPathForRole(session.role));
}
