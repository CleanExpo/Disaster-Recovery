'use client';

import Link from 'next/link';

type AuthPageChromeProps = {
  title: string;
  subtitle: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
};

/**
 * Shared public auth chrome — AG tokens, brand mark, calm elevated panel.
 * Used by login / signup / forgot / reset / verify so they feel like one product.
 */
export function AuthPageChrome({ title, subtitle, children, footer }: AuthPageChromeProps) {
  return (
    <div className="ag-page-elevated flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-8 text-center">
          <Link href="/" className="inline-flex items-center justify-center gap-2" aria-label="Disaster Recovery home">
            <span
              className="flex h-12 w-12 items-center justify-center rounded-2xl text-lg font-black text-white"
              style={{ background: 'var(--ag-primary-blue)' }}
              aria-hidden="true"
            >
              DR
            </span>
          </Link>
          <h1 className="mt-4 text-2xl font-bold tracking-tight text-[var(--ag-primary-blue)]">
            {title}
          </h1>
          <p className="mt-1 text-sm text-[var(--ag-text-grey)]">{subtitle}</p>
        </div>

        <div
          className="rounded-2xl border border-[var(--ag-border-light,#e5e7eb)] bg-white p-6 shadow-sm sm:p-8"
          style={{ boxShadow: '0 12px 40px color-mix(in srgb, var(--ag-primary-blue) 6%, transparent)' }}
        >
          {children}
        </div>

        {footer ? (
          <div className="mt-6 text-center text-sm text-[var(--ag-text-grey)]">{footer}</div>
        ) : null}
      </div>
    </div>
  );
}

export const authInputClassName =
  'w-full min-h-[44px] rounded-lg border border-[var(--ag-border-grey,#d1d5db)] bg-white px-3 py-3 text-sm text-[var(--ag-text-dark)] placeholder:text-[var(--ag-text-grey)] focus:outline-none focus:ring-2 focus:ring-[var(--ag-secondary-blue)]';

export const authPrimaryButtonClassName =
  'flex w-full min-h-[44px] items-center justify-center rounded-lg px-4 text-sm font-semibold text-white transition hover:opacity-90 disabled:opacity-50';
