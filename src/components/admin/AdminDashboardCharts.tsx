'use client';

import {
  AreaChart,
  Area,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

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

const STATUS_COLORS: Record<string, string> = {
  SUBMITTED: '#f97316',
  UNDER_REVIEW: '#3b82f6',
  APPROVED: '#22c55e',
  REJECTED: '#ef4444',
};

export function AdminDashboardCharts({
  trendData,
  statusData,
}: {
  trendData: ApplicationsTrendPoint[];
  statusData: StatusBreakdownItem[];
}) {
  return (
    <div className="grid gap-6 lg:grid-cols-2">
      {/* Applications over time */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Applications (last 7 days)
        </h3>
        <div className="h-[260px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={trendData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <defs>
                <linearGradient id="fillApplications" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#f97316" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#f97316" stopOpacity={0.05} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
              <XAxis
                dataKey="label"
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={{ stroke: '#e5e7eb' }}
                tickLine={false}
              />
              <YAxis
                allowDecimals={false}
                tick={{ fontSize: 12, fill: '#6b7280' }}
                axisLine={false}
                tickLine={false}
                width={28}
              />
              <Tooltip
                contentStyle={{
                  borderRadius: 12,
                  border: '1px solid #e5e7eb',
                  boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                }}
                labelStyle={{ fontWeight: 600 }}
                formatter={(value: number) => [value, 'Applications']}
                labelFormatter={(label) => label}
              />
              <Area
                type="monotone"
                dataKey="count"
                stroke="#f97316"
                strokeWidth={2}
                fill="url(#fillApplications)"
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Status breakdown */}
      <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <h3 className="text-sm font-semibold uppercase tracking-wider text-gray-500 mb-4">
          Status breakdown
        </h3>
        <div className="h-[260px]">
          {statusData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={statusData}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={90}
                  paddingAngle={2}
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(0)}%`
                  }
                  labelLine={{ stroke: '#9ca3af' }}
                >
                  {statusData.map((entry, index) => (
                    <Cell
                      key={entry.status}
                      fill={STATUS_COLORS[entry.status] ?? '#94a3b8'}
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
                  formatter={(value: number, name: string) => [value, name]}
                />
              </PieChart>
            </ResponsiveContainer>
          ) : (
            <div className="flex items-center justify-center h-full text-gray-400 text-sm">
              No applications yet
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
