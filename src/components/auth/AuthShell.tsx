'use client';

import Link from 'next/link';
import type { AppRole } from '@/lib/auth/roles';

type AuthShellProps = {
  role: AppRole;
  email?: string | null;
  name?: string | null;
  children: React.ReactNode;
};

const NAV: Record<AppRole, { href: string; label: string }[]> = {
  CLIENT: [
    { href: '/account', label: 'Overview' },
    { href: '/account/security', label: 'Security' },
    { href: '/claim', label: 'Lodge a claim' },
    { href: '/track', label: 'Track a claim' },
  ],
  CONTRACTOR: [
    { href: '/contractor/portal', label: 'Portal' },
    { href: '/account/security', label: 'Security' },
  ],
  ADMIN: [{ href: '/admin', label: 'Admin' }],
  SUPER_ADMIN: [{ href: '/admin', label: 'Admin' }],
};

export function AuthShell({ role, email, name, children }: AuthShellProps) {
  const links = NAV[role] || NAV.CLIENT;

  const logout = () => {
    void fetch('/api/auth/logout', { method: 'POST', credentials: 'include' }).finally(() => {
      window.location.href = '/login';
    });
  };

  return (
    <div className="min-h-screen bg-[var(--ag-background-light,#f4f6f8)]">
      <header className="border-b border-[var(--ag-border-light,#e5e7eb)] bg-white">
        <div className="mx-auto flex max-w-5xl flex-wrap items-center justify-between gap-4 px-4 py-4">
          <div>
            <Link href="/" className="text-lg font-bold text-[var(--ag-primary-blue)]">
              Disaster Recovery
            </Link>
            <p className="text-xs text-[var(--ag-text-grey)]">
              {name || email || 'Account'}
            </p>
          </div>
          <nav aria-label="Account" className="flex flex-wrap items-center gap-3">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="min-h-[44px] inline-flex items-center text-sm font-medium text-[var(--ag-text-dark)] hover:text-[var(--ag-primary-blue)]"
              >
                {l.label}
              </Link>
            ))}
            <button
              type="button"
              onClick={logout}
              className="min-h-[44px] rounded-md border px-3 text-sm font-medium text-[var(--ag-text-dark)] hover:bg-gray-50"
            >
              Sign out
            </button>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
    </div>
  );
}
