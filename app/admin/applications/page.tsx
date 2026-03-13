'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  RefreshCw,
  ChevronRight,
  Mail,
  Building2,
  Calendar,
  Filter,
  Clock,
  CheckCircle2,
  XCircle,
  MessageSquare,
  Search,
  ArrowRight,
  Inbox,
} from 'lucide-react';
import { AdminDashboardCharts } from '@/components/admin/AdminDashboardCharts';
import type { ApplicationsTrendPoint, StatusBreakdownItem } from '@/components/admin/AdminDashboardCharts';

interface ApplicationSummary {
  id: string;
  businessName: string | null;
  contactName: string | null;
  email: string | null;
  phone: string | null;
  status: string;
  createdAt: string;
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

interface Stats {
  kpis: { submitted: number; underReview: number; approved: number; rejected: number; total: number };
  trendData: ApplicationsTrendPoint[];
  statusData: StatusBreakdownItem[];
}

const STATUS_CONFIG: Record<string, { label: string; className: string; icon: typeof Clock }> = {
  SUBMITTED: { label: 'Pending', className: 'bg-amber-100 text-amber-800 border-amber-200', icon: Clock },
  UNDER_REVIEW: { label: 'Under review', className: 'bg-blue-100 text-blue-800 border-blue-200', icon: MessageSquare },
  APPROVED: { label: 'Approved', className: 'bg-emerald-100 text-emerald-800 border-emerald-200', icon: CheckCircle2 },
  REJECTED: { label: 'Rejected', className: 'bg-red-100 text-red-800 border-red-200', icon: XCircle },
};

export default function AdminApplicationsListPage() {
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [statsLoading, setStatsLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');
  const [stats, setStats] = useState<Stats | null>(null);

  const fetchStats = async () => {
    setStatsLoading(true);
    try {
      const res = await fetch('/api/admin/contractor-applications/stats');
      if (res.ok) {
        const data = await res.json();
        setStats(data);
      }
    } catch {
      setStats(null);
    } finally {
      setStatsLoading(false);
    }
  };

  const fetchApplications = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: page.toString(), limit: '20' });
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`/api/admin/contractor-applications?${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setApplications(data.applications || []);
      setPagination(data.pagination || { page: 1, limit: 20, total: 0, pages: 0 });
    } catch {
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  useEffect(() => {
    fetchApplications(1);
  }, [statusFilter]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.pages) fetchApplications(newPage);
  };

  const pendingCount = (stats?.kpis?.submitted ?? 0) + (stats?.kpis?.underReview ?? 0);

  return (
    <div className="mx-auto">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25">
              <FileText className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">
                Contractor applications
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Review, approve or reject contractor onboarding applications
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => { fetchApplications(pagination.page); fetchStats(); }}
              disabled={loading || statsLoading}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading || statsLoading ? 'animate-spin' : ''}`} />
              Refresh
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
        <h2 className="sr-only">Application metrics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending review</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">
                  {statsLoading ? '—' : pendingCount}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                <Clock className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-600">
                  {statsLoading ? '—' : (stats?.kpis?.approved ?? 0)}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-red-600">
                  {statsLoading ? '—' : (stats?.kpis?.rejected ?? 0)}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">
                  {statsLoading ? '—' : (stats?.kpis?.total ?? 0)}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-500/10">
                <Inbox className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-5 shadow-sm lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Filter</p>
                <p className="mt-1 text-sm font-semibold text-orange-900">
                  {statusFilter ? STATUS_CONFIG[statusFilter]?.label ?? statusFilter : 'All statuses'}
                </p>
              </div>
              <Filter className="h-5 w-5 text-orange-500" />
            </div>
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="mb-8">
        {stats && (
          <AdminDashboardCharts trendData={stats.trendData} statusData={stats.statusData} />
        )}
      </section>

      {/* Filters + Table */}
      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">All applications</h2>
          <div className="flex items-center gap-3">
            <label className="flex items-center gap-2 text-sm text-gray-600">
              <Search className="h-4 w-4" />
              Status
            </label>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:border-orange-500 focus:outline-none focus:ring-2 focus:ring-orange-500/20"
            >
              <option value="">All statuses</option>
              <option value="SUBMITTED">Submitted</option>
              <option value="UNDER_REVIEW">Under review</option>
              <option value="APPROVED">Approved</option>
              <option value="REJECTED">Rejected</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {loading && applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw className="h-10 w-10 animate-spin text-orange-500" />
              <p className="mt-3 text-sm font-medium text-gray-500">Loading applications…</p>
            </div>
          ) : applications.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Inbox className="h-14 w-14 text-gray-300" />
              <p className="mt-3 text-base font-medium text-gray-600">No applications found</p>
              <p className="mt-1 text-sm text-gray-500">
                {statusFilter ? 'Try changing the status filter.' : 'New submissions will appear here.'}
              </p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Business / Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Contact
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Submitted
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {applications.map((app) => {
                      const config = STATUS_CONFIG[app.status] ?? {
                        label: app.status.replace('_', ' '),
                        className: 'bg-gray-100 text-gray-800 border-gray-200',
                        icon: FileText,
                      };
                      const Icon = config.icon;
                      return (
                        <tr key={app.id} className="transition-colors hover:bg-gray-50/50">
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-3">
                              <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-gray-100">
                                <Building2 className="h-5 w-5 text-gray-500" />
                              </div>
                              <div>
                                <p className="font-medium text-gray-900">
                                  {app.businessName || app.contactName || '—'}
                                </p>
                                <p className="text-sm text-gray-500">{app.contactName && app.businessName ? app.contactName : '—'}</p>
                              </div>
                            </div>
                          </td>
                          <td className="px-6 py-4">
                            <div className="flex items-center gap-2 text-sm">
                              <Mail className="h-4 w-4 shrink-0 text-gray-400" />
                              <span className="text-gray-900">{app.email || '—'}</span>
                            </div>
                            {app.phone && (
                              <p className="mt-0.5 text-sm text-gray-500">{app.phone}</p>
                            )}
                          </td>
                          <td className="px-6 py-4">
                            <span
                              className={`inline-flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-xs font-medium ${config.className}`}
                            >
                              <Icon className="h-3.5 w-3.5" />
                              {config.label}
                            </span>
                          </td>
                          <td className="px-6 py-4">
                            <span className="inline-flex items-center gap-1.5 text-sm text-gray-600">
                              <Calendar className="h-4 w-4 text-gray-400" />
                              {app.createdAt
                                ? new Date(app.createdAt).toLocaleDateString('en-AU', {
                                    day: 'numeric',
                                    month: 'short',
                                    year: 'numeric',
                                  })
                                : '—'}
                            </span>
                          </td>
                          <td className="px-6 py-4 text-right">
                            <Link
                              href={`/admin/applications/${app.id}`}
                              className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
                              style={{ backgroundColor: '#f97316', color: '#ffffff' }}
                            >
                              View
                              <ChevronRight className="h-4 w-4" />
                            </Link>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
              {pagination.pages > 1 && (
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
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
