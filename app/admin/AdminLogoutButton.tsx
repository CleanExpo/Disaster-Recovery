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
      className="flex items-center gap-2.5 w-full px-3 py-2 rounded-md text-sm font-medium text-gray-400 hover:bg-gray-700/50 hover:text-white transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--ag-emergency-red)]/50 focus-visible:ring-offset-2 focus-visible:ring-offset-gray-800"
    >
      <LogOut className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span>Sign out</span>
    </button>
  );
}
