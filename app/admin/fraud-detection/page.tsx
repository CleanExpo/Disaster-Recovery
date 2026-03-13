'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  AlertTriangle,
  ArrowRight,
  CheckCircle,
  ChevronRight,
  Clock,
  Eye,
  Inbox,
  RefreshCw,
  Search,
  Shield,
  ShieldAlert,
} from 'lucide-react';
import {
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

interface FraudDetectionLog {
  id: string;
  contractorId: string;
  documentType: string;
  analysisStatus: string;
  confidenceScore: number | null;
  riskLevel: string | null;
  suspiciousElements: string[] | null;
  reviewRequired: boolean;
  createdAt: string;
  contractor: {
    email: string;
    username: string | null;
    status: string;
  };
}

interface Pagination {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const RISK_COLORS: Record<string, string> = {
  LOW: '#22c55e',
  MEDIUM: '#eab308',
  HIGH: '#ef4444',
};

const DOCUMENT_TYPES = [
  'INSURANCE_POLICY',
  'BUSINESS_LICENSE',
  'CERTIFICATION',
  'PROOF_OF_WORK',
  'FINANCIAL_STATEMENT',
  'OTHER',
];
const RISK_LEVELS = ['LOW', 'MEDIUM', 'HIGH'];

function getRiskClass(level: string | null) {
  switch (level) {
    case 'LOW':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'MEDIUM':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    case 'HIGH':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function getStatusClass(status: string) {
  switch (status) {
    case 'COMPLETED':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'PROCESSING':
      return 'bg-blue-100 text-blue-800 border-blue-200';
    case 'FAILED':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function formatDocType(s: string) {
  return s.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function FraudDetectionAdminPage() {
  const [logs, setLogs] = useState<FraudDetectionLog[]>([]);
  const [pagination, setPagination] = useState<Pagination>({ page: 1, limit: 20, total: 0, pages: 0 });
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<{ total: number; byRiskLevel: Record<string, number> }>({
    total: 0,
    byRiskLevel: {},
  });
  const [filters, setFilters] = useState({
    riskLevel: '',
    documentType: '',
    reviewRequired: '',
    search: '',
  });

  const fetchLogs = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({ page: String(page), limit: '20' });
      if (filters.riskLevel) params.set('riskLevel', filters.riskLevel);
      if (filters.documentType) params.set('documentType', filters.documentType);
      const res = await fetch(`/api/fraud-detection/analyze?${params}`);
      const data = await res.json();
      setLogs(data.logs ?? []);
      setPagination(
        data.pagination ?? { page: 1, limit: 20, total: 0, pages: 0 }
      );
      setStatistics({
        total: data.statistics?.total ?? 0,
        byRiskLevel: data.statistics?.byRiskLevel ?? {},
      });
    } catch {
      setLogs([]);
      setStatistics({ total: 0, byRiskLevel: {} });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, [filters.riskLevel, filters.documentType, filters.reviewRequired]);

  const handleSearch = () => fetchLogs(1);
  const handleRefresh = () => fetchLogs(pagination.page);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.pages) fetchLogs(page);
  };

  const needsReviewCount = useMemo(
    () => logs.filter((l) => l.reviewRequired).length,
    [logs]
  );

  const riskChartData = useMemo(() => {
    const r = statistics.byRiskLevel || {};
    return [
      { name: 'Low', value: r.LOW ?? 0, riskLevel: 'LOW' },
      { name: 'Medium', value: r.MEDIUM ?? 0, riskLevel: 'MEDIUM' },
      { name: 'High', value: r.HIGH ?? 0, riskLevel: 'HIGH' },
    ].filter((d) => d.value > 0);
  }, [statistics.byRiskLevel]);

  const docTypeChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    logs.forEach((l) => {
      counts[l.documentType] = (counts[l.documentType] ?? 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({
      name: formatDocType(name),
      value,
    }));
  }, [logs]);

  return (
    <div className="mx-auto ">
      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-red-500 to-red-600 shadow-lg shadow-red-500/25">
              <ShieldAlert className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">
                Fraud detection
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Monitor and review document authenticity analysis results
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleRefresh}
              disabled={loading}
              className="inline-flex items-center gap-2 rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 disabled:opacity-50"
            >
              <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
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

      <section className="mb-8">
        <h2 className="sr-only">Metrics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total analysed</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">{statistics.total}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gray-500/10">
                <Shield className="h-5 w-5 text-gray-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">High risk</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-red-600">
                  {statistics.byRiskLevel?.HIGH ?? 0}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
                <AlertTriangle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Medium risk</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-amber-600">
                  {statistics.byRiskLevel?.MEDIUM ?? 0}
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
                <p className="text-sm font-medium text-gray-500">Low risk</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-600">
                  {statistics.byRiskLevel?.LOW ?? 0}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-red-200 bg-gradient-to-br from-red-50 to-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-red-700">Needs review</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-red-900">{needsReviewCount}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
                <Eye className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Risk level breakdown
            </h3>
            <div className="h-[260px]">
              {riskChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={riskChartData}
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
                      {riskChartData.map((entry) => (
                        <Cell
                          key={entry.riskLevel}
                          fill={RISK_COLORS[entry.riskLevel] ?? '#94a3b8'}
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
                  No analysis data yet
                </div>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              By document type
            </h3>
            <div className="h-[260px]">
              {docTypeChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={docTypeChartData} margin={{ left: 0, right: 20 }}>
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
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  No documents yet
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">Verification logs</h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search contractors..."
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="w-full min-w-[180px] rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
              />
            </div>
            <select
              value={filters.riskLevel}
              onChange={(e) => setFilters((f) => ({ ...f, riskLevel: e.target.value }))}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            >
              <option value="">All risk levels</option>
              {RISK_LEVELS.map((level) => (
                <option key={level} value={level}>{level}</option>
              ))}
            </select>
            <select
              value={filters.documentType}
              onChange={(e) => setFilters((f) => ({ ...f, documentType: e.target.value }))}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            >
              <option value="">All document types</option>
              {DOCUMENT_TYPES.map((type) => (
                <option key={type} value={type}>{formatDocType(type)}</option>
              ))}
            </select>
            <select
              value={filters.reviewRequired}
              onChange={(e) => setFilters((f) => ({ ...f, reviewRequired: e.target.value }))}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:border-red-500 focus:outline-none focus:ring-2 focus:ring-red-500/20"
            >
              <option value="">All</option>
              <option value="true">Needs review</option>
              <option value="false">No review required</option>
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {loading && logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw className="h-10 w-10 animate-spin text-red-500" />
              <p className="mt-3 text-sm font-medium text-gray-500">Loading logs…</p>
            </div>
          ) : logs.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Inbox className="h-14 w-14 text-gray-300" />
              <p className="mt-3 text-base font-medium text-gray-600">No fraud detection logs found</p>
              <p className="mt-1 text-sm text-gray-500">Analysis results will appear here</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Contractor
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Document
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Risk
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Confidence
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Status
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Date
                      </th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Action
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {logs.map((log) => (
                      <tr key={log.id} className="transition-colors hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{log.contractor.username || 'N/A'}</p>
                            <p className="text-sm text-gray-500">{log.contractor.email}</p>
                            <p className="text-xs text-gray-500">{log.contractor.status.replace(/_/g, ' ')}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">{formatDocType(log.documentType)}</p>
                          {log.suspiciousElements && log.suspiciousElements.length > 0 && (
                            <p className="text-xs text-red-600 mt-0.5">{log.suspiciousElements.length} concern(s)</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getRiskClass(log.riskLevel)}`}>
                            {log.riskLevel || 'N/A'}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          {log.confidenceScore != null ? (
                            <div>
                              <span className="text-sm font-medium text-gray-900">{log.confidenceScore}%</span>
                              <div className="mt-1 h-1.5 w-20 overflow-hidden rounded-full bg-gray-200">
                                <div
                                  className={`h-full rounded-full ${
                                    log.confidenceScore >= 70 ? 'bg-emerald-500' : log.confidenceScore >= 40 ? 'bg-amber-500' : 'bg-red-500'
                                  }`}
                                  style={{ width: `${log.confidenceScore}%` }}
                                />
                              </div>
                            </div>
                          ) : (
                            <span className="text-sm text-gray-500">—</span>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <div className="space-y-1">
                            <span className={`inline-flex rounded-full border px-2 py-0.5 text-xs font-medium ${getStatusClass(log.analysisStatus)}`}>
                              {log.analysisStatus}
                            </span>
                            {log.reviewRequired && (
                              <p className="flex items-center gap-1 text-xs text-red-600">
                                <Eye className="h-3 w-3" /> Review required
                              </p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600">
                          {new Date(log.createdAt).toLocaleDateString('en-AU', {
                            day: '2-digit',
                            month: 'short',
                            year: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit',
                          })}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/admin/contractors/${log.contractorId}`}
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
                            style={{ backgroundColor: '#ef4444', color: '#ffffff' }}
                          >
                            View
                            <ChevronRight className="h-4 w-4" />
                          </Link>
                        </td>
                      </tr>
                    ))}
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
