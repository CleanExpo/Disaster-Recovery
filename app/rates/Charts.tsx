// C5 CWV win: extracted recharts subtree so the parent rates page bundle no longer
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

export type PieDatum = { name: string; value: number; fill: string };
export type CategoryStat = { name: string; count: number };

export function CategoryPieChart({ data }: { data: PieDatum[] }) {
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
          label={({ name, value }) => `${name} (${value})`}
          labelLine={{ stroke: '#9ca3af' }}
        >
          {data.map((entry) => (
            <Cell key={entry.name} fill={entry.fill} stroke="none" />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
          formatter={((value: number, name: string) => [value, `${name} items`]) as any}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function CategoryBarChart({ data }: { data: CategoryStat[] }) {
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
          formatter={((value: number) => [value, 'Items']) as any}
        />
        <Bar dataKey="count" name="Items" fill="#10b981" radius={[4, 4, 0, 0]} />
      </BarChart>
    </ResponsiveContainer>
  );
}
