'use client';

import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { isAdminRole } from '@/lib/admin-constants';

interface AdminGuardProps {
  children: React.ReactNode;
}

/**
 * Client-side guard for admin pages.
 * Complements the server-side check in app/admin/layout.tsx and middleware.ts.
 * Shows a 403 page if the session role is not an admin role.
 */
export function AdminGuard({ children }: AdminGuardProps) {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.replace('/login?callbackUrl=/admin');
    }
  }, [status, router]);

  if (status === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-sm text-gray-500">Checking permissions…</p>
        </div>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return null;
  }

  const role = (session?.user as { role?: string } | undefined)?.role;

  if (!isAdminRole(role)) {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
        <div className="rounded-2xl border border-red-200 bg-white p-10 shadow-sm max-w-md w-full">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-red-100">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-8 w-8 text-red-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M18.364 5.636l-12.728 12.728M5.636 5.636l12.728 12.728"
              />
            </svg>
          </div>
          <h1 className="text-2xl font-bold text-gray-900">Access denied</h1>
          <p className="mt-2 text-sm text-gray-500">
            You do not have permission to view this page. Please contact an administrator if you
            believe this is a mistake.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
          >
            Return home
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
