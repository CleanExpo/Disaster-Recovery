'use client';

import {
  Activity,
  AlertTriangle,
  ArrowRight,
  CheckCircle2,
  ChevronRight,
  Clock,
  DollarSign,
  Download,
  FileText,
  Inbox,
  RefreshCw,
  Search,
  Send,
  Timer,
  TrendingUp,
  User,
  XCircle,
  Zap,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
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

interface Lead {
  id: string;
  bookingId: string;
  createdAt: string;
  customer: { name: string; email: string; address: string; suburb: string; state: string; postcode: string };
  service: {
    type: string;
    urgency: 'emergency' | 'urgent' | 'standard';
    description: string;
    propertyType: string;
    affectedAreas: string[];
  };
  insurance: { hasInsurance: boolean; company?: string; claimNumber?: string };
  payment: {
    status: 'pending' | 'processing' | 'completed' | 'failed';
    amount: number;
    method: 'card' | 'bank_transfer';
    paidAt?: string;
  };
  contractor: {
    assigned: boolean;
    id?: string;
    username?: string;
    acceptedAt?: string;
    responseTime?: number;
  };
  status: 'new' | 'contacted' | 'assigned' | 'in_progress' | 'completed' | 'cancelled';
  priority: 'high' | 'medium' | 'low';
  notes: string[];
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface LeadsStats {
  kpis: {
    total: number;
    new: number;
    assigned: number;
    completed: number;
    revenue: number;
    conversionRate: number;
    avgResponseTime: number;
  };
  statusData: Array<{ name: string; value: number; status: string }>;
  urgencyData: Array<{ name: string; value: number }>;
}

const STATUS_COLORS: Record<string, string> = {
  new: '#3b82f6',
  contacted: '#eab308',
  assigned: '#8b5cf6',
  in_progress: '#6366f1',
  completed: '#22c55e',
  cancelled: '#ef4444',
};

const URGENCY_COLORS: Record<string, string> = {
  emergency: '#ef4444',
  urgent: '#f97316',
  standard: '#3b82f6',
};

function getStatusStyle(status: Lead['status']) {
  const map: Record<Lead['status'], string> = {
    new: 'bg-blue-100 text-blue-800 border-blue-200',
    contacted: 'bg-amber-100 text-amber-800 border-amber-200',
    assigned: 'bg-violet-100 text-violet-800 border-violet-200',
    in_progress: 'bg-indigo-100 text-indigo-800 border-indigo-200',
    completed: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    cancelled: 'bg-red-100 text-red-800 border-red-200',
  };
  return map[status] ?? 'bg-gray-100 text-gray-800 border-gray-200';
}

function getUrgencyIcon(urgency: Lead['service']['urgency']) {
  switch (urgency) {
    case 'emergency':
      return <AlertTriangle className="h-4 w-4 text-red-500 shrink-0" />;
    case 'urgent':
      return <Clock className="h-4 w-4 text-orange-500 shrink-0" />;
    default:
      return <Timer className="h-4 w-4 text-blue-500 shrink-0" />;
  }
}

function getTimeSince(date: string) {
  const minutes = Math.floor((Date.now() - new Date(date).getTime()) / 60000);
  if (minutes < 60) return `${minutes}m ago`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h ago`;
  const days = Math.floor(hours / 24);
  return `${days}d ago`;
}

export default function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 });
  const [stats, setStats] = useState<LeadsStats | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [filterUrgency, setFilterUrgency] = useState('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);

  const fetchLeads = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (filterStatus !== 'all') params.set('status', filterStatus);
      if (filterUrgency !== 'all') params.set('urgency', filterUrgency);
      if (searchQuery.trim()) params.set('search', searchQuery.trim());
      const res = await fetch(`/api/admin/leads?${params}`);
      if (!res.ok) throw new Error('Failed to fetch leads');
      const data = await res.json();
      setLeads(data.leads ?? []);
      setPagination(data.pagination ?? { page: 1, limit: 20, total: 0, pages: 0 });
    } catch {
      setLeads([]);
      setPagination((p) => ({ ...p, total: 0, pages: 0 }));
    } finally {
      setLoading(false);
    }
  };

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const res = await fetch('/api/admin/leads/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      } else {
        setStats(null);
      }
    } catch {
      setStats(null);
    } finally {
      setStatsLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchLeads(1);
  }, [filterStatus, filterUrgency]);

  const handleSearch = () => {
    fetchLeads(1);
  };

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.pages) fetchLeads(page);
  };

  const handleRefresh = () => {
    fetchLeads(pagination.page);
    fetchStats();
  };

  const kpis = stats?.kpis ?? {
    total: 0,
    new: 0,
    assigned: 0,
    completed: 0,
    revenue: 0,
    conversionRate: 0,
    avgResponseTime: 0,
  };

  const statusChartData = stats?.statusData ?? [];
  const urgencyChartData = stats?.urgencyData ?? [];

  return (
    <div className="mx-auto">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-emerald-500 to-emerald-600 shadow-lg shadow-emerald-500/25">
              <Activity className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">
                Lead management
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Track and manage all incoming disaster recovery leads and assignments
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={loading || statsLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading || statsLoading ? 'animate-spin' : ''}`} />
              Refresh
            </button>
            <button
              type="button"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              <Download className="h-4 w-4" />
              Export
            </button>
            <Link
              href="/admin"
              className="inline-flex items-center gap-2 rounded-xl border border-gray-200 bg-white px-4 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-50"
            >
              Dashboard
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </header>

      {/* KPI cards */}
      <section className="mb-8">
        <h2 className="sr-only">Lead metrics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total leads</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">{statsLoading ? '—' : kpis.total}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-500/10">
                <Inbox className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">New</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-blue-600">{statsLoading ? '—' : kpis.new}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Assigned</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-violet-600">{statsLoading ? '—' : kpis.assigned}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
                <User className="h-5 w-5 text-violet-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Completed</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-600">{statsLoading ? '—' : kpis.completed}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Revenue</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">
                  ${kpis.revenue.toLocaleString()}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                <DollarSign className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Conversion</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">
                  {kpis.conversionRate.toFixed(1)}%
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                <TrendingUp className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Avg response</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-orange-900">
                  {kpis.avgResponseTime} min
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-orange-500/10">
                <Clock className="h-5 w-5 text-orange-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="mb-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Status breakdown
            </h3>
            <div className="h-[260px]">
              {statusChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusChartData}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={90}
                      paddingAngle={2}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      labelLine={{ stroke: '#9ca3af' }}
                    >
                      {statusChartData.map((entry) => (
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
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  No leads yet
                </div>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              By urgency
            </h3>
            <div className="h-[260px]">
              {urgencyChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={urgencyChartData} layout="vertical" margin={{ left: 20, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" horizontal={false} />
                    <XAxis type="number" allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} />
                    <YAxis
                      type="category"
                      dataKey="name"
                      tick={{ fontSize: 12, fill: '#6b7280' }}
                      width={80}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                    />
                    <Bar dataKey="value" name="Leads" radius={[0, 4, 4, 0]}>
                      {urgencyChartData.map((entry, i) => (
                        <Cell key={i} fill={URGENCY_COLORS[entry.name] ?? '#94a3b8'} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  No leads yet
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* Filters + Table */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">All leads</h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap items-center gap-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search by name or email..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                  className="w-full min-w-[200px] rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
                />
              </div>
              <button
                type="button"
                onClick={handleSearch}
                disabled={loading}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
              >
                Search
              </button>
            </div>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="all">All status</option>
              <option value="new">New</option>
              <option value="contacted">Contacted</option>
              <option value="assigned">Assigned</option>
              <option value="in_progress">In progress</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={filterUrgency}
              onChange={(e) => setFilterUrgency(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20"
            >
              <option value="all">All urgency</option>
              <option value="emergency">Emergency</option>
              <option value="urgent">Urgent</option>
              <option value="standard">Standard</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {loading && leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw className="h-10 w-10 animate-spin text-emerald-500" />
              <p className="mt-3 text-sm font-medium text-gray-500">Loading leads…</p>
            </div>
          ) : leads.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Inbox className="h-14 w-14 text-gray-300" />
              <p className="mt-3 text-base font-medium text-gray-600">No leads found</p>
              <p className="mt-1 text-sm text-gray-500">
                {searchQuery || filterStatus !== 'all' || filterUrgency !== 'all'
                  ? 'Try adjusting filters or search.'
                  : 'No leads yet. New leads will appear here.'}
              </p>
            </div>
          ) : (
            <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50/80">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Lead
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Customer
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Service
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Payment
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Contractor
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Status
                    </th>
                    <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100 bg-white">
                  {leads.map((lead) => (
                    <tr key={lead.id} className="transition-colors hover:bg-gray-50/50">
                      <td className="px-6 py-4">
                        <div>
                          <p className="font-medium text-gray-900">{lead.bookingId}</p>
                          <p className="text-sm text-gray-500">{getTimeSince(lead.createdAt)}</p>
                          {lead.priority === 'high' && (
                            <span className="mt-1 inline-flex items-center gap-1 rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-xs font-medium text-red-800">
                              <Zap className="h-3 w-3" />
                              High priority
                            </span>
                          )}
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                            <User className="h-5 w-5 text-gray-500" />
                          </div>
                          <div>
                            <p className="font-medium text-gray-900">{lead.customer.name}</p>
                            <p className="text-sm text-gray-500">
                              {lead.customer.suburb}, {lead.customer.state}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2">
                          {getUrgencyIcon(lead.service.urgency)}
                          <div>
                            <p className="text-sm font-medium text-gray-900">{lead.service.type}</p>
                            <p className="text-xs text-gray-500">
                              {lead.service.propertyType} · {lead.service.affectedAreas.join(', ')}
                            </p>
                          </div>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <p className="font-medium text-gray-900">
                          ${lead.payment.amount.toLocaleString()}
                        </p>
                        <span
                          className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${
                            lead.payment.status === 'completed'
                              ? 'border-emerald-200 bg-emerald-100 text-emerald-800'
                              : lead.payment.status === 'processing'
                                ? 'border-amber-200 bg-amber-100 text-amber-800'
                                : lead.payment.status === 'failed'
                                  ? 'border-red-200 bg-red-100 text-red-800'
                                  : 'border-gray-200 bg-gray-100 text-gray-800'
                          }`}
                        >
                          {lead.payment.status}
                        </span>
                      </td>
                      <td className="px-6 py-4">
                        {lead.contractor.assigned ? (
                          <div>
                            <p className="text-sm font-medium text-gray-900">{lead.contractor.username}</p>
                            <p className="text-xs text-gray-500">
                              Response: {lead.contractor.responseTime} min
                            </p>
                          </div>
                        ) : (
                          <span className="text-sm text-gray-500">Not assigned</span>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusStyle(lead.status)}`}
                        >
                          {lead.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-right">
                        <button
                          type="button"
                          onClick={() => setSelectedLead(lead)}
                          className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:ring-offset-2"
                          style={{ backgroundColor: '#059669', color: '#ffffff' }}
                        >
                          View
                          <ChevronRight className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pagination.pages > 1 ? (
              <div className="flex flex-wrap items-center justify-between gap-4 border-t border-gray-200 bg-gray-50/50 px-6 py-4">
                <p className="text-sm text-gray-600">
                  Page <span className="font-medium">{pagination.page}</span> of{' '}
                  <span className="font-medium">{pagination.pages}</span> ·{' '}
                  <span className="font-medium">{pagination.total}</span> total
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages}
                    className="rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            ) : null}
            </>
          )}
        </div>
      </section>

      {/* Detail modal */}
      {selectedLead && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
          role="dialog"
          aria-modal="true"
          aria-labelledby="lead-detail-title"
        >
          <div className="max-h-[90vh] w-full max-w-2xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
            <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/80 px-6 py-4">
              <h2 id="lead-detail-title" className="text-lg font-semibold text-gray-900">
                Lead details · {selectedLead.bookingId}
              </h2>
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="rounded-lg p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
              >
                <XCircle className="h-5 w-5" />
              </button>
            </div>
            <div className="overflow-y-auto p-6 space-y-6">
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Customer
                </h3>
                <div className="grid gap-3 sm:grid-cols-2">
                  <div>
                    <p className="text-xs text-gray-500">Name</p>
                    <p className="font-medium text-gray-900">{selectedLead.customer.name}</p>
                  </div>
                  <div>
                    <p className="text-xs text-gray-500">Email</p>
                    <p className="font-medium text-gray-900">{selectedLead.customer.email}</p>
                  </div>
                  <div className="sm:col-span-2">
                    <p className="text-xs text-gray-500">Address</p>
                    <p className="font-medium text-gray-900">
                      {selectedLead.customer.address}, {selectedLead.customer.suburb},{' '}
                      {selectedLead.customer.state} {selectedLead.customer.postcode}
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                  Service
                </h3>
                <div className="space-y-2">
                  <p className="text-sm">
                    <span className="text-gray-500">Type:</span>{' '}
                    <span className="font-medium text-gray-900">{selectedLead.service.type}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Urgency:</span>{' '}
                    <span
                      className={`inline-flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium ${
                        selectedLead.service.urgency === 'emergency'
                          ? 'border-red-200 bg-red-100 text-red-800'
                          : selectedLead.service.urgency === 'urgent'
                            ? 'border-orange-200 bg-orange-100 text-orange-800'
                            : 'border-blue-200 bg-blue-100 text-blue-800'
                      }`}
                    >
                      {selectedLead.service.urgency}
                    </span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Description:</span>{' '}
                    <span className="text-gray-900">{selectedLead.service.description}</span>
                  </p>
                  <p className="text-sm">
                    <span className="text-gray-500">Affected areas:</span>{' '}
                    <span className="text-gray-900">{selectedLead.service.affectedAreas.join(', ')}</span>
                  </p>
                </div>
              </div>
              {selectedLead.notes.length > 0 && (
                <div>
                  <h3 className="mb-3 text-sm font-semibold uppercase tracking-wider text-gray-500">
                    Notes
                  </h3>
                  <ul className="space-y-2">
                    {selectedLead.notes.map((note, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600">
                        <span className="text-gray-400">•</span>
                        <span>{note}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
            <div className="flex justify-end gap-3 border-t border-gray-100 bg-gray-50/50 px-6 py-4">
              <button
                type="button"
                onClick={() => setSelectedLead(null)}
                className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 hover:bg-gray-50"
              >
                Close
              </button>
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90"
                style={{ backgroundColor: '#059669' }}
              >
                <Send className="h-4 w-4" />
                Assign contractor
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
