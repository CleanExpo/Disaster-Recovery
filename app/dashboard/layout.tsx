import { redirect } from 'next/navigation';
import { getSessionFromCookies } from '@/lib/auth/session';
import { dashboardPathForRole } from '@/lib/auth/roles';

/**
 * Legacy agency mock dashboard — send each role to its real destination.
 */
export default async function DashboardLayout({
  children: _children,
}: {
  children: React.ReactNode;
}) {
  const session = await getSessionFromCookies();
  if (!session) {
    redirect('/login?callbackUrl=/dashboard&reason=session_expired');
  }
  redirect(dashboardPathForRole(session.role));
}
