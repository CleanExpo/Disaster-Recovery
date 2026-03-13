import Link from 'next/link';
import {
  LayoutDashboard,
  FileText,
  ShieldAlert,
  Search,
  ClipboardCheck,
  Globe,
  BarChart3,
  ArrowRight,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from 'lucide-react';
import { prisma } from '@/lib/prisma';
import { AdminDashboardCharts } from '@/components/admin/AdminDashboardCharts';
import type { ApplicationsTrendPoint, StatusBreakdownItem } from '@/components/admin/AdminDashboardCharts';
import { format, subDays } from 'date-fns';

const QUICK_LINKS = [
  { href: '/admin/applications', label: 'Contractor applications', icon: FileText, description: 'Review, approve or reject applications', accent: 'orange' },
  { href: '/admin/leads', label: 'Leads', icon: ClipboardCheck, description: 'Manage booking leads and assignments', accent: 'emerald' },
  { href: '/admin/fraud-detection', label: 'Fraud detection', icon: ShieldAlert, description: 'Review document verification logs', accent: 'red' },
  { href: '/admin/seo-pages', label: 'SEO pages', icon: Search, description: 'View and generate location pages', accent: 'blue' },
  { href: '/admin/proof-of-work', label: 'Proof of work', icon: ClipboardCheck, description: 'Verify contractor submissions', accent: 'violet' },
  { href: '/admin/site-audit', label: 'Site audit', icon: Globe, description: 'Run site health checks', accent: 'cyan' },
  { href: '/admin/semrush-dashboard', label: 'SEMrush dashboard', icon: BarChart3, description: 'SEO and ranking metrics', accent: 'amber' },
];

const ACCENT_STYLES: Record<string, string> = {
  orange: 'bg-orange-500/10 text-orange-600 border-orange-200',
  emerald: 'bg-emerald-500/10 text-emerald-600 border-emerald-200',
  red: 'bg-red-500/10 text-red-600 border-red-200',
  blue: 'bg-blue-500/10 text-blue-600 border-blue-200',
  violet: 'bg-violet-500/10 text-violet-600 border-violet-200',
  cyan: 'bg-cyan-500/10 text-cyan-600 border-cyan-200',
  amber: 'bg-amber-500/10 text-amber-600 border-amber-200',
};

async function getDashboardData() {
  const now = new Date();
  const sevenDaysAgo = subDays(now, 6);

  const [byStatus, recent, lastSevenDaysRaw] = await Promise.all([
    prisma.contractorApplication.groupBy({
      by: ['status'],
      _count: { id: true },
    }),
    prisma.contractorApplication.findMany({
      orderBy: { createdAt: 'desc' },
      take: 5,
      select: {
        id: true,
        businessName: true,
        contactName: true,
        email: true,
        status: true,
        createdAt: true,
      },
    }),
    prisma.contractorApplication.findMany({
      where: { createdAt: { gte: sevenDaysAgo } },
      select: { createdAt: true },
    }),
  ]);

  const statusCounts = Object.fromEntries(
    byStatus.map((r) => [r.status, r._count.id])
  ) as Record<string, number>;

  const submitted = statusCounts.SUBMITTED ?? 0;
  const underReview = statusCounts.UNDER_REVIEW ?? 0;
  const approved = statusCounts.APPROVED ?? 0;
  const rejected = statusCounts.REJECTED ?? 0;
  const total = submitted + underReview + approved + rejected;

  const dayCounts: Record<string, number> = {};
  for (let i = 0; i < 7; i++) {
    const d = subDays(now, 6 - i);
    const key = format(d, 'yyyy-MM-dd');
    dayCounts[key] = 0;
  }
  lastSevenDaysRaw.forEach((a) => {
    const key = format(a.createdAt, 'yyyy-MM-dd');
    if (key in dayCounts) dayCounts[key]++;
  });

  const trendData: ApplicationsTrendPoint[] = Object.entries(dayCounts)
    .sort(([a], [b]) => a.localeCompare(b))
    .map(([dateStr, count]) => ({
      date: dateStr,
      label: format(new Date(dateStr), 'EEE d'),
      count,
    }));

  const statusData: StatusBreakdownItem[] = [
    { name: 'Submitted', value: submitted, status: 'SUBMITTED' },
    { name: 'Under review', value: underReview, status: 'UNDER_REVIEW' },
    { name: 'Approved', value: approved, status: 'APPROVED' },
    { name: 'Rejected', value: rejected, status: 'REJECTED' },
  ].filter((d) => d.value > 0);

  return {
    kpis: { submitted, underReview, approved, rejected, total },
    trendData,
    statusData,
    recent,
  };
}

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  SUBMITTED: { label: 'Pending', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  UNDER_REVIEW: { label: 'Review', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  APPROVED: { label: 'Approved', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  REJECTED: { label: 'Rejected', className: 'bg-red-100 text-red-800 border-red-200' },
};

export default async function AdminDashboardPage() {
  const { kpis, trendData, statusData, recent } = await getDashboardData();
  const pendingCount = kpis.submitted + kpis.underReview;

  return (
    <div className="mx-auto">
      {/* Header */}
      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25">
              <LayoutDashboard className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900 tracking-tight sm:text-3xl">
                Admin dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Overview and quick access to platform tools · {format(new Date(), 'EEEE, d MMMM yyyy')}
              </p>
            </div>
          </div>
        </div>
        <p className="mt-4 max-w-2xl text-gray-600">
          Manage contractor applications, leads, compliance, and platform tools from one place.
        </p>
      </header>

      {/* KPI cards */}
      <section className="mb-8">
        <h2 className="sr-only">Key metrics</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending review</p>
                <p className="mt-1 text-3xl font-bold tabular-nums text-gray-900">{pendingCount}</p>
                <p className="mt-1 text-xs text-gray-500">Needs action</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-amber-500/10">
                <Clock className="h-6 w-6 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Approved</p>
                <p className="mt-1 text-3xl font-bold tabular-nums text-emerald-600">{kpis.approved}</p>
                <p className="mt-1 text-xs text-gray-500">All time</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle2 className="h-6 w-6 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="mt-1 text-3xl font-bold tabular-nums text-red-600">{kpis.rejected}</p>
                <p className="mt-1 text-xs text-gray-500">All time</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-red-500/10">
                <XCircle className="h-6 w-6 text-red-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total applications</p>
                <p className="mt-1 text-3xl font-bold tabular-nums text-gray-900">{kpis.total}</p>
                <p className="mt-1 text-xs text-gray-500">All statuses</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gray-500/10">
                <FileText className="h-6 w-6 text-gray-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-orange-200 bg-gradient-to-br from-orange-50 to-white p-6 shadow-sm sm:col-span-2 lg:col-span-1">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-orange-700">Quick action</p>
                <p className="mt-1 text-sm font-semibold text-orange-900">Review applications</p>
                <p className="mt-1 text-xs text-orange-600/80">View all & take action</p>
              </div>
              <Link
                href="/admin/applications"
                className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-orange-500 text-white shadow-md hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2"
              >
                <ArrowRight className="h-6 w-6" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Charts */}
      <section className="mb-8">
        <AdminDashboardCharts trendData={trendData} statusData={statusData} />
      </section>

      {/* Recent applications + Quick links */}
      <div className="grid gap-8 lg:grid-cols-3">
        <section className="lg:col-span-2">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900">Recent applications</h2>
            <Link
              href="/admin/applications"
              className="text-sm font-medium text-orange-600 hover:text-orange-700 focus:outline-none focus:underline"
            >
              View all →
            </Link>
          </div>
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            {recent.length === 0 ? (
              <div className="flex flex-col items-center justify-center py-16 text-center">
                <AlertCircle className="h-12 w-12 text-gray-300" />
                <p className="mt-3 text-sm font-medium text-gray-500">No applications yet</p>
                <p className="mt-1 text-sm text-gray-400">New submissions will appear here</p>
                <Link
                  href="/admin/applications"
                  className="mt-4 rounded-lg bg-orange-500 px-4 py-2 text-sm font-medium text-white hover:bg-orange-600"
                >
                  Go to applications
                </Link>
              </div>
            ) : (
              <ul className="divide-y divide-gray-100" role="list">
                {recent.map((app) => {
                  const badge = STATUS_BADGE[app.status] ?? { label: app.status, className: 'bg-gray-100 text-gray-700 border-gray-200' };
                  return (
                    <li key={app.id}>
                      <Link
                        href={`/admin/applications/${app.id}`}
                        className="flex flex-wrap items-center gap-4 px-6 py-4 transition-colors hover:bg-gray-50 focus:bg-gray-50 focus:outline-none"
                      >
                        <div className="min-w-0 flex-1">
                          <p className="font-medium text-gray-900 truncate">
                            {app.businessName || app.contactName || app.email || 'Unnamed'}
                          </p>
                          <p className="text-sm text-gray-500 truncate">{app.email ?? '—'}</p>
                        </div>
                        <span className={`inline-flex rounded-full border px-2.5 py-0.5 text-xs font-medium ${badge.className}`}>
                          {badge.label}
                        </span>
                        <span className="text-sm text-gray-400">
                          {format(new Date(app.createdAt), 'd MMM')}
                        </span>
                        <ArrowRight className="h-4 w-4 text-gray-300 shrink-0" />
                      </Link>
                    </li>
                  );
                })}
              </ul>
            )}
          </div>
        </section>

        <section>
          <h2 className="text-lg font-semibold text-gray-900 mb-4">Quick access</h2>
          <ul className="space-y-3" role="list">
            {QUICK_LINKS.map(({ href, label, icon: Icon, description, accent }) => (
              <li key={href}>
                <Link
                  href={href}
                  className="group flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-all hover:shadow-md hover:border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500/30 focus:ring-offset-2"
                >
                  <div className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border ${ACCENT_STYLES[accent] ?? ACCENT_STYLES.orange}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-gray-900 group-hover:text-orange-600">{label}</p>
                    <p className="text-sm text-gray-500 truncate">{description}</p>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-gray-300 group-hover:text-orange-500 transition-colors" />
                </Link>
              </li>
            ))}
          </ul>
        </section>
      </div>
    </div>
  );
}
