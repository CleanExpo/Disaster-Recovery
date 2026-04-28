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
import type {
  Formatter,
  NameType,
  ValueType,
} from 'recharts/types/component/DefaultTooltipContent';

const STATUS_COLOURS: Record<string, string> = {
  new: '#3b82f6',
  contacted: '#eab308',
  assigned: '#8b5cf6',
  in_progress: '#6366f1',
  completed: '#22c55e',
  cancelled: '#ef4444',
};

const URGENCY_COLOURS: Record<string, string> = {
  emergency: '#ef4444',
  urgent: '#f97316',
  standard: '#3b82f6',
};

export type StatusDatum = { name: string; value: number; status: string };
export type UrgencyDatum = { name: string; value: number };

export function StatusChart({ data }: { data: StatusDatum[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-400">
        No leads yet
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
          formatter={((value, name) => [value, name]) satisfies Formatter<ValueType, NameType>}
        />
      </PieChart>
    </ResponsiveContainer>
  );
}

export function UrgencyChart({ data }: { data: UrgencyDatum[] }) {
  if (data.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-gray-400">
        No leads yet
      </div>
    );
  }
  return (
    <ResponsiveContainer width="100%" height="100%">
      <BarChart data={data} layout="vertical" margin={{ left: 20, right: 20 }}>
        <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
        <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
        <YAxis type="category" dataKey="name" tick={{ fontSize: 12, fill: '#6b7280' }} width={80} />
        <Tooltip
          contentStyle={{
            borderRadius: 12,
            border: '1px solid #e5e7eb',
            boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
          }}
        />
        <Bar dataKey="value" name="Leads" radius={[0, 4, 4, 0]}>
          {data.map((entry, i) => (
            <Cell key={i} fill={URGENCY_COLOURS[entry.name] ?? '#94a3b8'} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
}
