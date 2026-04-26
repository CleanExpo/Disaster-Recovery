// C5 CWV win: this wrapper preserves the public API consumed by `app/admin/page.tsx`
// and `app/admin/applications/page.tsx` (both server components) while moving the
// heavy recharts subtree into a separately-loaded chunk via `next/dynamic({ ssr: false })`.
// Recharts (~200 KB+) no longer ships in the parent admin route bundle; it loads
// after hydration. See ./AdminDashboardChartsInner.tsx for the extracted subtree.
'use client';

import dynamic from 'next/dynamic';

export interface ApplicationsTrendPoint {
  date: string;
  label: string;
  count: number;
}

export interface StatusBreakdownItem {
  name: string;
  value: number;
  status: string;
}

const AdminDashboardChartsInner = dynamic(() => import('./AdminDashboardChartsInner'), {
  ssr: false,
});

export function AdminDashboardCharts({
  trendData,
  statusData,
}: {
  trendData: ApplicationsTrendPoint[];
  statusData: StatusBreakdownItem[];
}) {
  return <AdminDashboardChartsInner trendData={trendData} statusData={statusData} />;
}
