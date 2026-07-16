'use client';

import { LogOut } from 'lucide-react';

export function AdminLogoutButton() {
  return (
    <button
      type="button"
      onClick={() => {
        void fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).finally(() => {
          window.location.href = '/login';
        });
      }}
      className="flex min-h-[44px] w-full items-center gap-2.5 rounded-md px-3 py-2.5 text-sm font-medium text-gray-400 transition-colors hover:bg-gray-700/50 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ag-emergency-red)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
    >
      <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>Sign out</span>
    </button>
  );
}
