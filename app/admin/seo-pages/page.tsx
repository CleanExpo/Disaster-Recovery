'use client';

import { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import {
  ArrowRight,
  BarChart3,
  Eye,
  Inbox,
  MapPin,
  Plus,
  RefreshCw,
  Search,
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

interface SEOPage {
  id: string;
  slug: string;
  title: string;
  metaDescription: string;
  state: string;
  city: string;
  suburb?: string;
  postcode: string;
  serviceType: string;
  serviceName: string;
  propertyType: string;
  businessType?: string;
  priorityScore: number;
  estimatedSearchVolume: number;
  currentRankings?: unknown;
  organicClicks: number;
  publishedAt: string;
}

interface PaginationInfo {
  page: number;
  limit: number;
  total: number;
  pages: number;
}

const STATES = ['NSW', 'VIC', 'QLD', 'WA', 'SA', 'TAS', 'ACT', 'NT'];
const SERVICE_TYPES = [
  'water-damage-restoration',
  'flood-damage-restoration',
  'mould-remediation',
  'fire-damage-restoration',
  'storm-damage-repair',
  'sewage-cleanup',
  'smoke-damage-restoration',
  'biohazard-cleaning',
  'trauma-scene-cleaning',
  'vandalism-repair',
];

function formatService(s: string) {
  return s.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

export default function SEOPagesAdminPage() {
  const [pages, setPages] = useState<SEOPage[]>([]);
  const [loading, setLoading] = useState(true);
  const [pagination, setPagination] = useState<PaginationInfo>({
    page: 1,
    limit: 50,
    total: 0,
    pages: 0,
  });
  const [generating, setGenerating] = useState(false);
  const [filters, setFilters] = useState({
    search: '',
    state: '',
    serviceType: '',
    priorityMin: '',
  });
  const [generationConfig, setGenerationConfig] = useState({
    limit: 100,
    priority: 80,
  });

  const fetchPages = async (page = 1, overrides?: Partial<typeof filters>) => {
    setLoading(true);
    try {
      const effective = { ...filters, ...overrides };
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
      });
      if (effective.state) params.set('state', effective.state);
      if (effective.serviceType) params.set('serviceType', effective.serviceType);
      if (effective.priorityMin) params.set('priorityMin', effective.priorityMin);
      const res = await fetch(`/api/seo/generate-pages?${params}`);
      const data = await res.json();
      setPages(data.pages ?? []);
      setPagination(data.pagination ?? { page: 1, limit: 50, total: 0, pages: 0 });
    } catch {
      setPages([]);
      setPagination({ page: 1, limit: 50, total: 0, pages: 0 });
    } finally {
      setLoading(false);
    }
  };

  const generatePages = async () => {
    setGenerating(true);
    try {
      const res = await fetch('/api/seo/generate-pages', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(generationConfig),
      });
      const data = await res.json();
      if (data.success) {
        setFilters((f) => ({ ...f, priorityMin: String(generationConfig.priority) }));
        await fetchPages(1, { priorityMin: String(generationConfig.priority) });
        alert(data.message ?? `Successfully generated ${data.generated} SEO pages!`);
      } else {
        alert(`Error: ${data.error ?? 'Unknown error'}`);
      }
    } catch {
      alert('Failed to generate pages');
    } finally {
      setGenerating(false);
    }
  };

  useEffect(() => {
    fetchPages();
  }, [filters.state, filters.serviceType, filters.priorityMin]);

  const handleRefresh = () => fetchPages(pagination.page);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.pages) fetchPages(page);
  };

  const totalClicks = useMemo(() => pages.reduce((sum, p) => sum + p.organicClicks, 0), [pages]);
  const totalVolume = useMemo(() => pages.reduce((sum, p) => sum + p.estimatedSearchVolume, 0), [pages]);
  const avgPriority = useMemo(
    () => (pages.length > 0 ? Math.round(pages.reduce((sum, p) => sum + p.priorityScore, 0) / pages.length) : 0),
    [pages]
  );

  const stateChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    pages.forEach((p) => {
      counts[p.state] = (counts[p.state] ?? 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name, value }));
  }, [pages]);

  const serviceChartData = useMemo(() => {
    const counts: Record<string, number> = {};
    pages.forEach((p) => {
      counts[p.serviceType] = (counts[p.serviceType] ?? 0) + 1;
    });
    return Object.entries(counts).map(([name, value]) => ({ name: formatService(name), value }));
  }, [pages]);

  return (
    <div className="mx-auto">
      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg shadow-blue-500/25">
              <Search className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                SEO pages
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Manage and monitor your location-based SEO pages nationwide
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
            <button
              type="button"
              onClick={generatePages}
              disabled={generating}
              className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90 disabled:opacity-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
              style={{ backgroundColor: '#2563eb' }}
            >
              <Plus className="h-4 w-4" />
              {generating ? 'Generating…' : 'Generate pages'}
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total pages</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">{pagination.total.toLocaleString()}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-blue-500/10">
                <BarChart3 className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Avg priority</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">{avgPriority}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                <BarChart3 className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total clicks</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">{totalClicks.toLocaleString()}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
                <Eye className="h-5 w-5 text-violet-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Est. search vol.</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">{totalVolume.toLocaleString()}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                <Search className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
          <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">Generate new pages</h3>
          <div className="flex flex-wrap items-end gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Number of pages</label>
              <input
                type="number"
                min={1}
                max={1000}
                value={generationConfig.limit}
                onChange={(e) => setGenerationConfig((c) => ({ ...c, limit: parseInt(e.target.value, 10) || 1 }))}
                className="mt-1 w-32 rounded-xl border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Min priority score</label>
              <input
                type="number"
                min={0}
                max={100}
                value={generationConfig.priority}
                onChange={(e) => setGenerationConfig((c) => ({ ...c, priority: parseInt(e.target.value, 10) || 0 }))}
                className="mt-1 w-32 rounded-xl border border-gray-300 px-4 py-2.5 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
              />
            </div>
            <button
              type="button"
              onClick={generatePages}
              disabled={generating}
              className="inline-flex items-center gap-2 rounded-xl px-5 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90 disabled:opacity-50"
              style={{ backgroundColor: '#2563eb' }}
            >
              <Plus className="h-4 w-4" />
              {generating ? 'Generating…' : 'Generate pages'}
            </button>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">By state</h3>
            <div className="h-[260px]">
              {stateChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={stateChartData}
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
                      {stateChartData.map((entry, i) => (
                        <Cell key={entry.name} fill={['#2563eb', '#3b82f6', '#60a5fa', '#93c5fd', '#bfdbfe'][i % 5]} stroke="none" />
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
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">No data yet</div>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">By service type</h3>
            <div className="h-[260px]">
              {serviceChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={serviceChartData} margin={{ left: 0, right: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" vertical={false} />
                    <XAxis dataKey="name" tick={{ fontSize: 11, fill: '#6b7280' }} angle={-25} textAnchor="end" height={60} />
                    <YAxis allowDecimals={false} tick={{ fontSize: 12, fill: '#6b7280' }} width={28} />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: '1px solid #e5e7eb',
                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                      }}
                    />
                    <Bar dataKey="value" name="Pages" fill="#2563eb" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">No data yet</div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">All pages</h2>
          <div className="flex flex-wrap items-center gap-3">
            <select
              value={filters.state}
              onChange={(e) => setFilters((f) => ({ ...f, state: e.target.value }))}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">All states</option>
              {STATES.map((state) => (
                <option key={state} value={state}>{state}</option>
              ))}
            </select>
            <select
              value={filters.serviceType}
              onChange={(e) => setFilters((f) => ({ ...f, serviceType: e.target.value }))}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">All services</option>
              {SERVICE_TYPES.map((service) => (
                <option key={service} value={service}>{formatService(service)}</option>
              ))}
            </select>
            <select
              value={filters.priorityMin}
              onChange={(e) => setFilters((f) => ({ ...f, priorityMin: e.target.value }))}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
            >
              <option value="">All priorities</option>
              {[90, 85, 80, 75, 70, 65, 60, 0].map((p) => (
                <option key={p} value={p}>{p === 0 ? 'Any' : `≥ ${p}`}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {loading && pages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw className="h-10 w-10 animate-spin text-blue-500" />
              <p className="mt-3 text-sm font-medium text-gray-500">Loading pages…</p>
            </div>
          ) : pages.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Inbox className="h-14 w-14 text-gray-300" />
              <p className="mt-3 text-base font-medium text-gray-600">No SEO pages found</p>
              <p className="mt-1 text-sm text-gray-500">Generate pages or adjust filters.</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Page</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Location</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Service</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Priority</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Est. volume</th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">Clicks</th>
                      <th className="px-6 py-4 text-right text-xs font-semibold uppercase tracking-wider text-gray-500">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-100 bg-white">
                    {pages.map((page) => (
                      <tr key={page.id} className="transition-colors hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                          <p className="max-w-xs truncate font-medium text-gray-900">{page.title}</p>
                          <p className="max-w-xs truncate text-xs text-gray-500">/{page.slug}</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1 text-sm text-gray-900">
                            <MapPin className="h-3 w-3 shrink-0 text-gray-500" />
                            {page.city}, {page.state} {page.postcode}
                          </div>
                          {page.suburb && <p className="text-xs text-gray-500">{page.suburb}</p>}
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">{page.serviceName}</p>
                          <p className="text-xs text-gray-500">{page.propertyType}</p>
                          {page.businessType && (
                            <p className="text-xs text-blue-600">{page.businessType.replace(/-/g, ' ')}</p>
                          )}
                        </td>
                        <td className="px-6 py-4">
                          <span
                            className={`text-sm font-medium ${
                              page.priorityScore >= 90 ? 'text-emerald-600' : page.priorityScore >= 75 ? 'text-amber-600' : 'text-gray-700'
                            }`}
                          >
                            {page.priorityScore}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900">{page.estimatedSearchVolume.toLocaleString()}</td>
                        <td className="px-6 py-4 text-sm text-gray-900">{page.organicClicks.toLocaleString()}</td>
                        <td className="px-6 py-4 text-right">
                          <Link
                            href={`/services/${page.slug}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                            style={{ backgroundColor: '#2563eb' }}
                          >
                            <Eye className="h-4 w-4" />
                            View
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
