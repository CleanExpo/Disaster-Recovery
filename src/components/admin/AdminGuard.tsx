'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { isAdminRole } from '@/lib/admin-constants';

interface AdminGuardProps {
  children: React.ReactNode;
}

/**
 * Client-side guard for admin pages — cookie session via /api/auth/me.
 */
export function AdminGuard({ children }: AdminGuardProps) {
  const router = useRouter();
  const [state, setState] = useState<'loading' | 'ok' | 'denied'>('loading');

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) {
          if (!cancelled) {
            router.replace('/login?callbackUrl=/admin&reason=session_expired');
          }
          return;
        }
        const data = await res.json();
        if (cancelled) return;
        if (!isAdminRole(data.user?.role)) {
          setState('denied');
          return;
        }
        setState('ok');
      } catch {
        if (!cancelled) {
          router.replace('/login?callbackUrl=/admin');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [router]);

  if (state === 'loading') {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-100">
        <div className="flex flex-col items-center gap-3">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-orange-500 border-t-transparent" />
          <p className="text-sm text-gray-500">Checking permissions…</p>
        </div>
      </div>
    );
  }

  if (state === 'denied') {
    return (
      <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100 px-4 text-center">
        <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-10 shadow-sm">
          <h1 className="text-2xl font-bold text-gray-900">Access denied</h1>
          <p className="mt-2 text-sm text-gray-500">
            You do not have permission to view this page.
          </p>
          <a
            href="/"
            className="mt-6 inline-block rounded-lg bg-orange-500 px-5 py-2.5 text-sm font-medium text-white hover:bg-orange-600"
          >
            Return home
          </a>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}
