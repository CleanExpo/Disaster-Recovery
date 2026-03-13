'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft,
  CheckCircle,
  XCircle,
  MessageSquare,
  Loader2,
  ChevronDown,
  ChevronRight,
  Building2,
  Mail,
  Phone,
  FileText,
  User,
  Shield,
  Briefcase,
  Banknote,
  AlertTriangle,
} from 'lucide-react';
import { format } from 'date-fns';

interface ContractorApplication {
  id: string;
  businessName: string | null;
  contactName: string | null;
  email: string | null;
  phone: string | null;
  status: string;
  data: Record<string, unknown>;
  createdAt: string;
  updatedAt: string;
}

const STATUS_OPTIONS = [
  { value: 'UNDER_REVIEW', label: 'Under review', icon: MessageSquare, color: 'blue' },
  { value: 'APPROVED', label: 'Approved', icon: CheckCircle, color: 'emerald' },
  { value: 'REJECTED', label: 'Rejected', icon: XCircle, color: 'red' },
];

const STATUS_BADGE: Record<string, { label: string; className: string }> = {
  SUBMITTED: { label: 'Pending', className: 'bg-amber-100 text-amber-800 border-amber-200' },
  UNDER_REVIEW: { label: 'Under review', className: 'bg-blue-100 text-blue-800 border-blue-200' },
  APPROVED: { label: 'Approved', className: 'bg-emerald-100 text-emerald-800 border-emerald-200' },
  REJECTED: { label: 'Rejected', className: 'bg-red-100 text-red-800 border-red-200' },
};

function DataSection({
  title,
  icon: Icon,
  data,
  defaultOpen = false,
}: {
  title: string;
  icon: typeof FileText;
  data: Record<string, unknown>;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const entries = Object.entries(data).filter(([, v]) => v !== undefined && v !== null && v !== '');
  if (entries.length === 0) return null;
  return (
    <div className="overflow-hidden rounded-xl border border-gray-200 bg-white">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between px-5 py-4 text-left transition-colors hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500/20 focus:ring-inset"
      >
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
            <Icon className="h-5 w-5 text-gray-600" />
          </div>
          <span className="font-semibold text-gray-900">{title}</span>
        </div>
        {open ? (
          <ChevronDown className="h-5 w-5 text-gray-400" />
        ) : (
          <ChevronRight className="h-5 w-5 text-gray-400" />
        )}
      </button>
      {open && (
        <div className="border-t border-gray-100 bg-gray-50/50 px-5 py-4">
          <dl className="grid gap-4 sm:grid-cols-2">
            {entries.map(([key, value]) => (
              <div key={key}>
                <dt className="text-xs font-medium uppercase tracking-wider text-gray-500">
                  {key.replace(/([A-Z])/g, ' $1').trim()}
                </dt>
                <dd className="mt-1 text-sm text-gray-900">
                  {typeof value === 'object' && value !== null && !Array.isArray(value) ? (
                    <pre className="max-h-32 overflow-auto rounded-lg bg-white p-3 text-xs shadow-inner">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  ) : Array.isArray(value) ? (
                    <pre className="max-h-32 overflow-auto rounded-lg bg-white p-3 text-xs shadow-inner">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  ) : (
                    String(value)
                  )}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      )}
    </div>
  );
}

export default function AdminApplicationDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [application, setApplication] = useState<ContractorApplication | null>(null);
  const [loading, setLoading] = useState(true);
  const [updating, setUpdating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [updateError, setUpdateError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/admin/contractor-applications/${id}`);
        if (!res.ok) {
          if (res.status === 404) setError('Application not found');
          else setError('Failed to load');
          return;
        }
        const data = await res.json();
        if (!cancelled) setApplication(data);
      } catch {
        if (!cancelled) setError('Failed to load');
      } finally {
        if (!cancelled) setLoading(false);
      }
    })();
    return () => { cancelled = true; };
  }, [id]);

  const updateStatus = async (newStatus: string) => {
    setUpdateError(null);
    setUpdating(true);
    try {
      const res = await fetch(`/api/admin/contractor-applications/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });
      if (!res.ok) throw new Error('Update failed');
      const updated = await res.json();
      setApplication(updated);
    } catch {
      setUpdateError('Failed to update status');
    } finally {
      setUpdating(false);
    }
  };

  if (loading) {
    return (
      <div className="flex min-h-[100vh] flex-col items-center justify-center">
        <Loader2 className="h-10 w-10 animate-spin text-orange-500" />
        <p className="mt-3 text-sm text-gray-500">Loading application…</p>
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="mx-auto max-w-2xl rounded-2xl border border-red-200 bg-red-50 p-8 text-center">
        <AlertTriangle className="mx-auto h-12 w-12 text-red-500" />
        <p className="mt-3 text-lg font-semibold text-red-800">{error || 'Application not found'}</p>
        <Link
          href="/admin/applications"
          className="mt-4 inline-flex items-center gap-2 rounded-xl bg-red-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-red-700"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to applications
        </Link>
      </div>
    );
  }

  const data = (application.data || {}) as Record<string, unknown>;
  const businessInfo = (data.businessInfo || {}) as Record<string, unknown>;
  const badge = STATUS_BADGE[application.status] ?? {
    label: application.status.replace('_', ' '),
    className: 'bg-gray-100 text-gray-800 border-gray-200',
  };

  return (
    <div className="mx-auto ">
      {/* Back + breadcrumb */}
      <div className="mb-6">
        <Link
          href="/admin/applications"
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to applications
        </Link>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        {/* Main content */}
        <div className="space-y-6 lg:col-span-2">
          {/* Hero summary card */}
          <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gradient-to-br from-gray-50 to-white px-6 py-6">
              <div className="flex flex-wrap items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-orange-500 to-orange-600 shadow-lg shadow-orange-500/25">
                    <Building2 className="h-8 w-8 text-white" />
                  </div>
                  <div>
                    <h1 className="text-xl font-bold text-gray-900">
                      {application.businessName || application.contactName || 'Unnamed application'}
                    </h1>
                    <p className="mt-0.5 text-sm text-gray-500">
                      {application.contactName && application.businessName
                        ? application.contactName
                        : application.email ?? '—'}
                    </p>
                    <span
                      className={`mt-2 inline-flex rounded-full border px-3 py-1 text-xs font-medium ${badge.className}`}
                    >
                      {badge.label}
                    </span>
                  </div>
                </div>
                <div className="text-right text-sm text-gray-500">
                  <p>Submitted {format(new Date(application.createdAt), 'd MMM yyyy')}</p>
                  <p>{format(new Date(application.createdAt), 'h:mm a')}</p>
                </div>
              </div>
            </div>
            <div className="grid gap-6 p-6 sm:grid-cols-2">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <Mail className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-gray-500">Email</p>
                  <p className="font-medium text-gray-900">{application.email || '—'}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gray-100">
                  <Phone className="h-5 w-5 text-gray-600" />
                </div>
                <div>
                  <p className="text-xs font-medium uppercase text-gray-500">Phone</p>
                  <p className="font-medium text-gray-900">{application.phone || '—'}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Application data sections */}
          <div className="space-y-4">
            <h2 className="text-lg font-semibold text-gray-900">Application data</h2>
            <DataSection title="Business information" icon={Briefcase} data={businessInfo} defaultOpen />
            {data.insurance && (
              <DataSection title="Insurance & licensing" icon={Shield} data={data.insurance as Record<string, unknown>} />
            )}
            {data.experience && (
              <DataSection title="Experience & references" icon={User} data={data.experience as Record<string, unknown>} />
            )}
            {data.equipment && (
              <DataSection title="Equipment & resources" icon={Briefcase} data={data.equipment as Record<string, unknown>} />
            )}
            {data.healthSafety && (
              <DataSection title="Health & safety" icon={Shield} data={data.healthSafety as Record<string, unknown>} />
            )}
            {data.banking && (
              <DataSection title="Banking & payment" icon={Banknote} data={data.banking as Record<string, unknown>} />
            )}
          </div>
        </div>

        {/* Sidebar: Actions */}
        <div className="lg:col-span-1">
          <div className="sticky top-6 overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
            <div className="border-b border-gray-100 bg-gray-50/80 px-6 py-4">
              <h2 className="text-lg font-semibold text-gray-900">Update status</h2>
              <p className="mt-1 text-sm text-gray-500">
                Change the application status. The applicant can be notified separately.
              </p>
            </div>
            <div className="space-y-3 p-6">
              {STATUS_OPTIONS.map(({ value, label, icon: Icon, color }) => {
                const isCurrent = application.status === value;
                const colorClasses =
                  color === 'emerald'
                    ? 'border-emerald-200 text-emerald-700 hover:bg-emerald-50 focus:ring-emerald-500/30'
                    : color === 'red'
                      ? 'border-red-200 text-red-700 hover:bg-red-50 focus:ring-red-500/30'
                      : 'border-gray-200 text-gray-700 hover:bg-gray-50 focus:ring-blue-500/30';
                return (
                  <button
                    key={value}
                    type="button"
                    onClick={() => updateStatus(value)}
                    disabled={updating || isCurrent}
                    className={`flex w-full items-center justify-center gap-2 rounded-xl border-2 px-4 py-3 text-sm font-medium transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 ${colorClasses} ${isCurrent ? 'bg-gray-100' : ''}`}
                  >
                    {updating ? (
                      <Loader2 className="h-5 w-5 animate-spin" />
                    ) : (
                      <Icon className="h-5 w-5 shrink-0" />
                    )}
                    {isCurrent ? `${label} (current)` : label}
                  </button>
                );
              })}
            </div>
            {updateError && (
              <div className="border-t border-gray-100 px-6 pb-4">
                <p className="text-sm text-red-600">{updateError}</p>
              </div>
            )}
            <div className="border-t border-gray-100 px-6 py-4 text-xs text-gray-500">
              Last updated {format(new Date(application.updatedAt), 'd MMM yyyy, h:mm a')}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
