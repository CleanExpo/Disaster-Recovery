// C5 CWV win: extracted recharts subtree so the parent contractor page bundle no
// longer ships recharts (~200 KB+). Loaded via `next/dynamic({ ssr: false })` from
// page.tsx, so recharts arrives in a separate chunk after hydration rather than
// blocking TTI.
'use client';

import {
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

export type PerformanceTrendDatum = {
  month: string;
  responseTime: number;
  completionRate: number;
  satisfaction: number;
};
export type JobDistributionDatum = { name: string; value: number; colour: string };

export function PerformanceTrendChart({ data }: { data: PerformanceTrendDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="month" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="responseTime"
          stroke="#3B82F6"
          name="Response Time (min)"
          strokeWidth={2}
        />
        <Line
          type="monotone"
          dataKey="completionRate"
          stroke="#10B981"
          name="Completion Rate (%)"
          strokeWidth={2}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

export function JobDistributionChart({ data }: { data: JobDistributionDatum[] }) {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={(entry: { name?: string; value?: number }) => `${entry.name}: ${entry.value}%`}
          outerRadius={80}
          fill="#8884d8"
          dataKey="value"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.colour} />
          ))}
        </Pie>
        <Tooltip />
      </PieChart>
    </ResponsiveContainer>
  );
}
