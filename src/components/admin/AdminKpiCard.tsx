import type { ReactNode } from 'react';

type AdminKpiCardProps = {
  label: string;
  value: ReactNode;
  icon: ReactNode;
  tone?: 'default' | 'success' | 'danger' | 'warning' | 'accent';
  className?: string;
};

const toneStyles: Record<NonNullable<AdminKpiCardProps['tone']>, string> = {
  default: 'border-[var(--ag-border-grey)] bg-white',
  success: 'border-emerald-200 bg-gradient-to-br from-emerald-50 to-white',
  danger: 'border-red-200 bg-gradient-to-br from-red-50 to-white',
  warning: 'border-amber-200 bg-gradient-to-br from-amber-50 to-white',
  accent: 'border-[var(--ag-secondary-blue)]/30 bg-gradient-to-br from-[var(--ag-background-light)] to-white',
};

/**
 * Shared admin KPI shell — AG-aligned density for applications/leads lists.
 */
export function AdminKpiCard({
  label,
  value,
  icon,
  tone = 'default',
  className = '',
}: AdminKpiCardProps) {
  return (
    <div className={`rounded-2xl border p-5 shadow-sm ${toneStyles[tone]} ${className}`.trim()}>
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-sm font-medium text-[var(--ag-text-grey)]">{label}</p>
          <p className="mt-1 text-2xl font-bold tabular-nums text-[var(--ag-primary-blue)]">
            {value}
          </p>
        </div>
        <div
          className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl"
          style={{ background: 'color-mix(in srgb, var(--ag-primary-blue) 12%, white)' }}
        >
          {icon}
        </div>
      </div>
    </div>
  );
}
