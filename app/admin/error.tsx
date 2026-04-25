'use client';

import { AlertTriangle, RefreshCw } from 'lucide-react';

/**
 * DR-757: Error boundary for the admin section.
 * Catches unhandled errors from server component renders (e.g. DB failures in
 * getDashboardData) so operators see a recovery UI instead of a blank crash screen.
 */
export default function AdminError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-red-200 bg-white p-8 shadow-sm text-center">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-500/10">
          <AlertTriangle className="h-7 w-7 text-red-600" />
        </div>
        <h2 className="mb-2 text-xl font-bold text-gray-900">Dashboard failed to load</h2>
        <p className="mb-1 text-sm text-gray-500">
          An error occurred while loading the admin dashboard. This is usually a temporary
          database connection issue.
        </p>
        {error.digest && (
          <p className="mb-4 font-mono text-xs text-gray-400">Error ref: {error.digest}</p>
        )}
        <button
          onClick={reset}
          className="inline-flex items-center gap-2 rounded-xl bg-orange-600 px-5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-orange-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-orange-600"
        >
          <RefreshCw className="h-4 w-4" />
          Try again
        </button>
      </div>
    </div>
  );
}
