'use client';

import {
  AlertTriangle,
  ArrowRight,
  Calendar,
  CheckCircle,
  ClipboardCheck,
  DollarSign,
  Eye,
  FileText,
  Image,
  Inbox,
  MapPin,
  MessageSquare,
  RefreshCw,
  Search,
  X,
  XCircle,
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

interface ProofOfWorkClaim {
  id: string;
  contractorId: string;
  workType: string;
  projectName: string;
  clientName: string;
  clientContact: string;
  projectAddress: string;
  completionDate: string;
  projectValue: number;
  projectDescription: string;
  damageType: string[];
  propertyType: string;
  emergencyResponse: boolean;
  insuranceClaim: boolean;
  insuranceCompany?: string;
  evidence: Array<{
    type: string;
    url: string;
    description: string;
    uploadedAt: string;
  }>;
  verificationStatus: 'PENDING' | 'VERIFIED' | 'REJECTED';
  verificationNotes?: string;
  submittedAt: string;
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

interface Statistics {
  total: number;
  byVerificationStatus: Record<string, number>;
  byWorkType: Record<string, number>;
}

const WORK_TYPES = [
  'water-damage-restoration',
  'fire-damage-restoration',
  'mould-remediation',
  'storm-damage-repair',
  'flood-recovery',
  'sewage-cleanup',
  'biohazard-cleaning',
  'trauma-scene-cleaning',
  'vandalism-repair',
  'emergency-board-up',
];
const PROPERTY_TYPES = ['RESIDENTIAL', 'COMMERCIAL', 'INDUSTRIAL', 'INSTITUTIONAL'];
const VERIFICATION_STATUSES = ['PENDING', 'VERIFIED', 'REJECTED'];

const STATUS_COLORS: Record<string, string> = {
  PENDING: '#eab308',
  VERIFIED: '#22c55e',
  REJECTED: '#ef4444',
};

function getStatusClass(status: string) {
  switch (status) {
    case 'VERIFIED':
      return 'bg-emerald-100 text-emerald-800 border-emerald-200';
    case 'REJECTED':
      return 'bg-red-100 text-red-800 border-red-200';
    case 'PENDING':
      return 'bg-amber-100 text-amber-800 border-amber-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

function getStatusIcon(status: string) {
  switch (status) {
    case 'VERIFIED':
      return <CheckCircle className="h-4 w-4" />;
    case 'REJECTED':
      return <XCircle className="h-4 w-4" />;
    case 'PENDING':
      return <AlertTriangle className="h-4 w-4" />;
    default:
      return <AlertTriangle className="h-4 w-4" />;
  }
}

function getEvidenceIcon(type: string) {
  switch (type) {
    case 'BEFORE_PHOTO':
    case 'AFTER_PHOTO':
      return <Image className="h-4 w-4" />;
    default:
      return <FileText className="h-4 w-4" />;
  }
}

function formatWorkType(s: string) {
  return s.replace(/-/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase());
}

function ClaimReviewModal({
  claim,
  onClose,
  onUpdateStatus,
}: {
  claim: ProofOfWorkClaim;
  onClose: () => void;
  onUpdateStatus: (claimId: string, status: string, notes?: string) => void;
}) {
  const [verificationNotes, setVerificationNotes] = useState(claim.verificationNotes || '');

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-xl">
        <div className="border-b border-gray-200 bg-gray-50/80 px-6 py-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-bold text-gray-900">Review proof of work</h3>
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg p-2 text-gray-500 hover:bg-gray-200 hover:text-gray-700"
              aria-label="Close"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="max-h-[60vh] overflow-y-auto p-6">
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                Project information
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-500">Project name</p>
                  <p className="text-sm font-medium text-gray-900">{claim.projectName}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Client</p>
                  <p className="text-sm text-gray-900">{claim.clientName}</p>
                  <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-600">
                    <MessageSquare className="h-3 w-3" />
                    {claim.clientContact}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Address</p>
                  <p className="flex items-center gap-1 text-sm text-gray-900">
                    <MapPin className="h-3 w-3 shrink-0" />
                    {claim.projectAddress}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Completion date</p>
                  <p className="flex items-center gap-1 text-sm text-gray-900">
                    <Calendar className="h-3 w-3" />
                    {new Date(claim.completionDate).toLocaleDateString('en-AU')}
                  </p>
                </div>
              </div>
            </div>

            <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
              <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
                Project details
              </h4>
              <div className="space-y-3">
                <div>
                  <p className="text-xs font-medium text-gray-500">Work type</p>
                  <p className="text-sm text-gray-900">{formatWorkType(claim.workType)}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Property type</p>
                  <p className="text-sm text-gray-900">{claim.propertyType}</p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Project value</p>
                  <p className="flex items-center gap-1 text-sm font-medium text-gray-900">
                    <DollarSign className="h-3 w-3" />
                    ${claim.projectValue.toLocaleString()}
                  </p>
                </div>
                <div>
                  <p className="text-xs font-medium text-gray-500">Damage types</p>
                  <div className="mt-1 flex flex-wrap gap-1">
                    {claim.damageType.map((type) => (
                      <span
                        key={type}
                        className="rounded-full border border-gray-200 bg-gray-50 px-2 py-0.5 text-xs text-gray-700"
                      >
                        {type}
                      </span>
                    ))}
                  </div>
                </div>
                {claim.insuranceCompany && (
                  <div>
                    <p className="text-xs font-medium text-gray-500">Insurance company</p>
                    <p className="text-sm text-gray-900">{claim.insuranceCompany}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="mt-6 rounded-2xl border border-gray-200 bg-gray-50/50 p-5">
            <p className="text-xs font-medium text-gray-500">Project description</p>
            <p className="mt-1 text-sm text-gray-900">{claim.projectDescription}</p>
          </div>

          <div className="mt-6">
            <h4 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Evidence ({claim.evidence.length} items)
            </h4>
            <div className="grid gap-4 md:grid-cols-2">
              {claim.evidence.map((evidence, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-gray-200 bg-white p-4 shadow-sm"
                >
                  <div className="mb-2 flex items-center gap-2">
                    {evidence.type.includes('PHOTO') ? (
                      <Image className="h-4 w-4 text-gray-600" />
                    ) : (
                      <FileText className="h-4 w-4 text-gray-600" />
                    )}
                    <span className="text-sm font-medium text-gray-900">
                      {evidence.type.replace(/_/g, ' ').replace(/\b\w/g, (l) => l.toUpperCase())}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600">{evidence.description}</p>
                  <a
                    href={evidence.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-block text-sm font-medium hover:opacity-90"
                    style={{ color: '#7c3aed' }}
                  >
                    View evidence →
                  </a>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700">Verification notes</label>
            <textarea
              value={verificationNotes}
              onChange={(e) => setVerificationNotes(e.target.value)}
              rows={4}
              className="mt-2 w-full rounded-xl border border-gray-300 px-4 py-3 text-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              placeholder="Add notes about your verification decision..."
            />
          </div>
        </div>

        <div className="flex justify-end gap-3 border-t border-gray-200 bg-gray-50/50 px-6 py-4">
          <button
            type="button"
            onClick={() => onUpdateStatus(claim.id, 'REJECTED', verificationNotes)}
            className="inline-flex items-center gap-2 rounded-xl border border-red-300 bg-red-600 px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:bg-red-700"
          >
            <XCircle className="h-4 w-4" />
            Reject
          </button>
          <button
            type="button"
            onClick={() => onUpdateStatus(claim.id, 'VERIFIED', verificationNotes)}
            className="inline-flex items-center gap-2 rounded-xl px-4 py-2.5 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
            style={{ backgroundColor: '#7c3aed' }}
          >
            <CheckCircle className="h-4 w-4" />
            Approve
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ProofOfWorkAdminPage() {
  const [claims, setClaims] = useState<ProofOfWorkClaim[]>([]);
  const [loading, setLoading] = useState(true);
  const [statistics, setStatistics] = useState<Statistics>({
    total: 0,
    byVerificationStatus: {},
    byWorkType: {},
  });
  const [selectedClaim, setSelectedClaim] = useState<ProofOfWorkClaim | null>(null);
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [filters, setFilters] = useState({
    workType: '',
    verificationStatus: '',
    propertyType: '',
    search: '',
  });
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });

  const fetchClaims = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.limit.toString(),
      });
      if (filters.workType) params.set('workType', filters.workType);
      if (filters.verificationStatus) params.set('verificationStatus', filters.verificationStatus);
      const res = await fetch(`/api/proof-of-work/submit?${params}`);
      const data = await res.json();
      setClaims(data.claims ?? []);
      setPagination(data.pagination ?? { page: 1, limit: 20, total: 0, pages: 0 });
      setStatistics({
        total: data.statistics?.total ?? 0,
        byVerificationStatus: data.statistics?.byVerificationStatus ?? {},
        byWorkType: data.statistics?.byWorkType ?? {},
      });
    } catch {
      setClaims([]);
      setStatistics({ total: 0, byVerificationStatus: {}, byWorkType: {} });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchClaims();
  }, [filters.workType, filters.verificationStatus, filters.propertyType]);

  const updateClaimStatus = async (claimId: string, status: string, notes?: string) => {
    try {
      const res = await fetch('/api/proof-of-work/verify', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          claimId,
          verificationStatus: status,
          verificationNotes: notes,
        }),
      });
      if (res.ok) {
        await fetchClaims(pagination.page);
        setShowReviewModal(false);
        setSelectedClaim(null);
        alert(`Claim ${status.toLowerCase()} successfully`);
      } else {
        const err = await res.json();
        alert(`Error: ${err.error ?? 'Failed to update'}`);
      }
    } catch {
      alert('Failed to update claim status');
    }
  };

  const handleSearch = () => fetchClaims(1);
  const handleRefresh = () => fetchClaims(pagination.page);
  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= pagination.pages) fetchClaims(page);
  };

  const statusChartData = useMemo(() => {
    const s = statistics.byVerificationStatus ?? {};
    return [
      { name: 'Pending', value: s.PENDING ?? 0, status: 'PENDING' },
      { name: 'Verified', value: s.VERIFIED ?? 0, status: 'VERIFIED' },
      { name: 'Rejected', value: s.REJECTED ?? 0, status: 'REJECTED' },
    ].filter((d) => d.value > 0);
  }, [statistics.byVerificationStatus]);

  const workTypeChartData = useMemo(() => {
    const w = statistics.byWorkType ?? {};
    return Object.entries(w).map(([name, value]) => ({
      name: formatWorkType(name),
      value,
    }));
  }, [statistics.byWorkType]);

  return (
    <div className="mx-auto">
      <header className="mb-8">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-500 to-violet-600 shadow-lg shadow-violet-500/25">
              <ClipboardCheck className="h-7 w-7 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                Proof of work
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Review and verify contractor project evidence for certification approval
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
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Total claims</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-gray-900">{statistics.total}</p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-violet-500/10">
                <ClipboardCheck className="h-5 w-5 text-violet-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Pending</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-amber-600">
                  {statistics.byVerificationStatus?.PENDING ?? 0}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-amber-500/10">
                <AlertTriangle className="h-5 w-5 text-amber-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Verified</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-emerald-600">
                  {statistics.byVerificationStatus?.VERIFIED ?? 0}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-emerald-500/10">
                <CheckCircle className="h-5 w-5 text-emerald-600" />
              </div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-500">Rejected</p>
                <p className="mt-1 text-2xl font-bold tabular-nums text-red-600">
                  {statistics.byVerificationStatus?.REJECTED ?? 0}
                </p>
              </div>
              <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-red-500/10">
                <XCircle className="h-5 w-5 text-red-600" />
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="mb-8">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              Verification status
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
                  No claims yet
                </div>
              )}
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-gray-500">
              By work type
            </h3>
            <div className="h-[260px]">
              {workTypeChartData.length > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={workTypeChartData} margin={{ left: 0, right: 20 }}>
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
                    <Bar dataKey="value" name="Claims" fill="#7c3aed" radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full items-center justify-center text-sm text-gray-400">
                  No claims yet
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      <section>
        <div className="mb-4 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-lg font-semibold text-gray-900">All claims</h2>
          <div className="flex flex-wrap items-center gap-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search projects..."
                value={filters.search}
                onChange={(e) => setFilters((f) => ({ ...f, search: e.target.value }))}
                onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                className="min-w-[180px] rounded-xl border border-gray-300 bg-white py-2.5 pl-10 pr-4 text-sm shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
              />
            </div>
            <select
              value={filters.workType}
              onChange={(e) => setFilters((f) => ({ ...f, workType: e.target.value }))}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            >
              <option value="">All work types</option>
              {WORK_TYPES.map((type) => (
                <option key={type} value={type}>
                  {formatWorkType(type)}
                </option>
              ))}
            </select>
            <select
              value={filters.verificationStatus}
              onChange={(e) => setFilters((f) => ({ ...f, verificationStatus: e.target.value }))}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            >
              <option value="">All statuses</option>
              {VERIFICATION_STATUSES.map((status) => (
                <option key={status} value={status}>{status}</option>
              ))}
            </select>
            <select
              value={filters.propertyType}
              onChange={(e) => setFilters((f) => ({ ...f, propertyType: e.target.value }))}
              className="rounded-xl border border-gray-300 bg-white px-4 py-2.5 text-sm font-medium text-gray-700 shadow-sm focus:border-violet-500 focus:outline-none focus:ring-2 focus:ring-violet-500/20"
            >
              <option value="">All property types</option>
              {PROPERTY_TYPES.map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </div>
        </div>

        <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
          {loading && claims.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20">
              <RefreshCw className="h-10 w-10 animate-spin text-violet-500" />
              <p className="mt-3 text-sm font-medium text-gray-500">Loading claims…</p>
            </div>
          ) : claims.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-20 text-center">
              <Inbox className="h-14 w-14 text-gray-300" />
              <p className="mt-3 text-base font-medium text-gray-600">No proof of work claims found</p>
              <p className="mt-1 text-sm text-gray-500">Submitted claims will appear here</p>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50/80">
                    <tr>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Project
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Contractor
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Work type
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Value
                      </th>
                      <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-500">
                        Evidence
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
                    {claims.map((claim) => (
                      <tr key={claim.id} className="transition-colors hover:bg-gray-50/50">
                        <td className="px-6 py-4">
                          <div>
                            <p className="font-medium text-gray-900">{claim.projectName}</p>
                            <p className="text-sm text-gray-500">{claim.clientName}</p>
                            <p className="mt-0.5 flex items-center gap-1 text-xs text-gray-500">
                              <Calendar className="h-3 w-3" />
                              {new Date(claim.completionDate).toLocaleDateString('en-AU')}
                            </p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <p className="font-medium text-gray-900">{claim.contractor.username || 'N/A'}</p>
                          <p className="text-sm text-gray-500">{claim.contractor.email}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">{formatWorkType(claim.workType)}</p>
                          <p className="text-xs text-gray-500">{claim.propertyType}</p>
                        </td>
                        <td className="px-6 py-4">
                          <p className="text-sm font-medium text-gray-900">
                            ${claim.projectValue.toLocaleString()}
                          </p>
                          <div className="mt-1 flex flex-wrap gap-1">
                            {claim.emergencyResponse && (
                              <span className="rounded-full border border-red-200 bg-red-50 px-2 py-0.5 text-xs text-red-700">
                                Emergency
                              </span>
                            )}
                            {claim.insuranceClaim && (
                              <span className="rounded-full border border-blue-200 bg-blue-50 px-2 py-0.5 text-xs text-blue-700">
                                Insurance
                              </span>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex flex-wrap gap-1">
                            {claim.evidence.slice(0, 3).map((evidence, index) => (
                              <span
                                key={index}
                                className="flex items-center gap-1 text-xs text-gray-600"
                              >
                                {getEvidenceIcon(evidence.type)}
                                {evidence.type.replace(/_/g, ' ')}
                              </span>
                            ))}
                          </div>
                          <p className="text-xs text-gray-500">{claim.evidence.length} items</p>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            {getStatusIcon(claim.verificationStatus)}
                            <span
                              className={`inline-flex rounded-full border px-2.5 py-1 text-xs font-medium ${getStatusClass(claim.verificationStatus)}`}
                            >
                              {claim.verificationStatus}
                            </span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-right">
                          <button
                            type="button"
                            onClick={() => {
                              setSelectedClaim(claim);
                              setShowReviewModal(true);
                            }}
                            className="inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium text-white shadow-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-violet-500 focus:ring-offset-2"
                            style={{ backgroundColor: '#7c3aed' }}
                          >
                            <Eye className="h-4 w-4" />
                            View
                          </button>
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

      {showReviewModal && selectedClaim && (
        <ClaimReviewModal
          claim={selectedClaim}
          onClose={() => {
            setShowReviewModal(false);
            setSelectedClaim(null);
          }}
          onUpdateStatus={updateClaimStatus}
        />
      )}
    </div>
  );
}
