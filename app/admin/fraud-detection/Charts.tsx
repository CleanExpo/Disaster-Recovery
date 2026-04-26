// C5 CWV win: extracted recharts subtree so the parent admin page bundle no longer
// ships recharts (~200 KB+). Loaded via `next/dynamic({ ssr: false })` from page.tsx,
// so recharts arrives in a separate chunk after hydration rather than blocking TTI.
'use client';

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

const RISK_COLOURS: Record<string, string> = {
  LOW: '#22c55e',
  MEDIUM: '#eab308',
  HIGH: '#ef4444',
};

export type RiskDatum = { name: string; value: number; riskLevel: string };
export type DocTypeDatum = { name: string; value: number };

export function RiskChart({ data }: { data: RiskDatum[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-400">
        No analysis data yet
      </div>
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
          innerRadius={60}
          outerRadius={90}
          paddingAngle={2}
          label={({ name, percent }) => `${name} ${((percent ?? 0) * 100).toFixed(0)}%`}
          labelLine={{ stroke: '#9ca3af' }}
        >
          {data.map((entry) => (
            <Cell
              key={entry.riskLevel}
              fill={RISK_COLOURS[entry.riskLevel] ?? '#94a3b8'}
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
          formatter={((value: number, name: string) => [value, name]) as any}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function DocTypeChart({ data }: { data: DocTypeDatum[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-400">
        No documents yet
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} margin={{ left: 0, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
        <XAxis
          dataKey="name"
          tick={{ fontSize: 11, fill: '#6b7280' }}
          angle={-25}
          textAnchor="end"
          height={60}
        />
        <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} width={28} />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
        />
        <Bar dataKey="value" name="Documents" fill="#ef4444" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
