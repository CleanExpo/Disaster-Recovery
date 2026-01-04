'use client'

import { useState, useEffect, useCallback } from 'react'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  Legend,
} from 'recharts'

interface MetricsSummary {
  activeJobs: number
  pendingJobs: number
  inProgressJobs: number
  completedToday: number
  avgResponseTimeMinutes: number
  activeConnections: number
  jobsToday: number
  contractorResponseRate: number
}

interface ChartData {
  jobsByStatus: Array<{ name: string; value: number; status: string }>
  hourlyTrend: Array<{ hour: string; count: number }>
  responseTimeDistribution: Array<{ range: string; count: number }>
}

interface RealtimeMetricsPanelProps {
  initialTimeRange?: string
  refreshInterval?: number
}

const COLOURS = {
  PENDING: '#F59E0B',
  MATCHED: '#3B82F6',
  IN_PROGRESS: '#10B981',
  COMPLETED: '#6B7280',
  CANCELLED: '#EF4444',
}

const PIE_COLOURS = ['#F59E0B', '#3B82F6', '#10B981', '#6B7280', '#EF4444']

export function RealtimeMetricsPanel({
  initialTimeRange = '24h',
  refreshInterval = 30000,
}: RealtimeMetricsPanelProps) {
  const [timeRange, setTimeRange] = useState(initialTimeRange)
  const [summary, setSummary] = useState<MetricsSummary | null>(null)
  const [charts, setCharts] = useState<ChartData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null)

  const fetchMetrics = useCallback(async () => {
    try {
      const response = await fetch(`/api/admin/metrics/realtime?range=${timeRange}`)
      if (!response.ok) throw new Error('Failed to fetch metrics')

      const data = await response.json()
      if (data.success) {
        setSummary(data.data.summary)
        setCharts(data.data.charts)
        setLastUpdated(new Date())
      }
    } catch (error) {
      console.error('Failed to fetch metrics:', error)
    } finally {
      setIsLoading(false)
    }
  }, [timeRange])

  useEffect(() => {
    fetchMetrics()
    const interval = setInterval(fetchMetrics, refreshInterval)
    return () => clearInterval(interval)
  }, [fetchMetrics, refreshInterval])

  const formatHour = (hourStr: string) => {
    const date = new Date(hourStr)
    return date.toLocaleTimeString('en-AU', { hour: '2-digit', minute: '2-digit' })
  }

  if (isLoading) {
    return (
      <div className="space-y-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[...Array(4)].map((_, i) => (
            <div key={i} className="bg-white rounded-lg shadow p-4 animate-pulse">
              <div className="h-4 bg-grey-200 rounded w-1/2 mb-2" />
              <div className="h-8 bg-grey-200 rounded w-3/4" />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
          <div className="bg-white rounded-lg shadow p-4 h-64 animate-pulse">
            <div className="h-full bg-grey-200 rounded" />
          </div>
          <div className="bg-white rounded-lg shadow p-4 h-64 animate-pulse">
            <div className="h-full bg-grey-200 rounded" />
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-4">
      {/* Time Range Selector */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <label className="text-sm font-medium text-grey-700">Time Range:</label>
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-md border-grey-300 text-sm focus:border-blue-500 focus:ring-blue-500"
          >
            <option value="1h">Last Hour</option>
            <option value="24h">Last 24 Hours</option>
            <option value="7d">Last 7 Days</option>
          </select>
        </div>
        {lastUpdated && (
          <span className="text-xs text-grey-500">
            Updated {lastUpdated.toLocaleTimeString('en-AU')}
          </span>
        )}
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <MetricCard
          title="Active Jobs"
          value={summary?.activeJobs || 0}
          colour="blue"
          subtitle={`${summary?.pendingJobs || 0} pending`}
        />
        <MetricCard
          title="Avg Response Time"
          value={`${summary?.avgResponseTimeMinutes || 0}m`}
          colour="green"
          subtitle="to first acceptance"
        />
        <MetricCard
          title="Active Connections"
          value={summary?.activeConnections || 0}
          colour="purple"
          subtitle="WebSocket users"
        />
        <MetricCard
          title="Response Rate"
          value={`${summary?.contractorResponseRate || 0}%`}
          colour="yellow"
          subtitle="contractor acceptance"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Jobs by Status Pie Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-grey-900 mb-4">Jobs by Status</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={charts?.jobsByStatus || []}
                  dataKey="value"
                  nameKey="name"
                  cx="50%"
                  cy="50%"
                  outerRadius={70}
                  label={({ name, value }) => `${name}: ${value}`}
                  labelLine={false}
                >
                  {(charts?.jobsByStatus || []).map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLOURS[entry.status as keyof typeof COLOURS] || PIE_COLOURS[index % PIE_COLOURS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Hourly Trend Line Chart */}
        <div className="bg-white rounded-lg shadow p-4">
          <h3 className="text-sm font-medium text-grey-900 mb-4">Job Volume Trend</h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={charts?.hourlyTrend || []}>
                <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
                <XAxis
                  dataKey="hour"
                  tickFormatter={formatHour}
                  tick={{ fontSize: 11 }}
                  stroke="#9CA3AF"
                />
                <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
                <Tooltip
                  labelFormatter={(label) => formatHour(label as string)}
                  contentStyle={{ fontSize: 12 }}
                />
                <Line
                  type="monotone"
                  dataKey="count"
                  stroke="#3B82F6"
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', r: 3 }}
                  activeDot={{ r: 5 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {/* Response Time Distribution */}
      <div className="bg-white rounded-lg shadow p-4">
        <h3 className="text-sm font-medium text-grey-900 mb-4">Response Time Distribution</h3>
        <div className="h-48">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={charts?.responseTimeDistribution || []}>
              <CartesianGrid strokeDasharray="3 3" stroke="#E5E7EB" />
              <XAxis dataKey="range" tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <YAxis tick={{ fontSize: 11 }} stroke="#9CA3AF" />
              <Tooltip contentStyle={{ fontSize: 12 }} />
              <Legend wrapperStyle={{ fontSize: 12 }} />
              <Bar dataKey="count" name="Jobs" fill="#10B981" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  )
}

// Metric Card Component
interface MetricCardProps {
  title: string
  value: string | number
  colour: 'blue' | 'green' | 'purple' | 'yellow' | 'red'
  subtitle?: string
}

function MetricCard({ title, value, colour, subtitle }: MetricCardProps) {
  const colourClasses = {
    blue: 'bg-blue-50 text-blue-700 border-blue-200',
    green: 'bg-green-50 text-green-700 border-green-200',
    purple: 'bg-purple-50 text-purple-700 border-purple-200',
    yellow: 'bg-yellow-50 text-yellow-700 border-yellow-200',
    red: 'bg-red-50 text-red-700 border-red-200',
  }

  return (
    <div className={`rounded-lg border p-4 ${colourClasses[colour]}`}>
      <p className="text-xs font-medium opacity-75">{title}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
      {subtitle && <p className="text-xs opacity-60 mt-1">{subtitle}</p>}
    </div>
  )
}

export default RealtimeMetricsPanel
