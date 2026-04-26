// C5 CWV win: extracted recharts subtree so the parent admin page bundle no longer
// ships recharts (~200 KB+). Loaded via `next/dynamic({ ssr: false })` from page.tsx,
// so recharts arrives in a separate chunk after hydration rather than blocking TTI.
'use client';

import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from 'recharts';

const STATUS_COLOURS: Record<string, string> = {
  pass: '#22c55e',
  warning: '#eab308',
  fail: '#ef4444',
};

export type StatusDatum = { name: string; value: number; status: string };

export function StatusBreakdownChart({ data }: { data: StatusDatum[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-400">No data</div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <PieChart>
        <Pie
          data={data}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={50}
          outerRadius={80}
          paddingAngle={2}
          label={({ name, value }) => `${name} (${value})`}
          labelLine={{ stroke: '#9ca3af' }}
        >
          {data.map((entry) => (
            <Cell
              key={entry.status}
              fill={STATUS_COLOURS[entry.status] ?? '#94a3b8'}
              stroke="none"
            />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}
