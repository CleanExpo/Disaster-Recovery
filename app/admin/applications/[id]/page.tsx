'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
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
} from 'lucide-react';

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
  { value: 'UNDER_REVIEW', label: 'Under review', icon: MessageSquare },
  { value: 'APPROVED', label: 'Approved', icon: CheckCircle },
  { value: 'REJECTED', label: 'Rejected', icon: XCircle },
];

function DataSection({
  title,
  data,
  defaultOpen = false,
}: {
  title: string;
  data: Record<string, unknown>;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const entries = Object.entries(data).filter(([, v]) => v !== undefined && v !== null && v !== '');
  if (entries.length === 0) return null;
  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="w-full flex items-center justify-between px-4 py-3 bg-gray-50 text-left font-medium text-gray-900 hover:bg-gray-100"
      >
        {title}
        {open ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
      </button>
      {open && (
        <div className="px-4 py-3 bg-white">
          <dl className="grid gap-2 sm:grid-cols-2">
            {entries.map(([key, value]) => (
              <div key={key}>
                <dt className="text-xs font-medium text-gray-500 uppercase">{key.replace(/([A-Z])/g, ' $1').trim()}</dt>
                <dd className="mt-0.5 text-sm text-gray-900">
                  {typeof value === 'object' && value !== null && !Array.isArray(value) ? (
                    <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto max-h-32 overflow-y-auto">
                      {JSON.stringify(value, null, 2)}
                    </pre>
                  ) : Array.isArray(value) ? (
                    <pre className="text-xs bg-gray-50 p-2 rounded overflow-x-auto max-h-32 overflow-y-auto">
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
  const router = useRouter();
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
      <div className="flex items-center justify-center py-12">
        <Loader2 className="h-8 w-8 animate-spin text-orange-500" />
      </div>
    );
  }

  if (error || !application) {
    return (
      <div className="rounded-lg bg-red-50 border border-red-200 p-4 text-red-800">
        <p>{error || 'Application not found'}</p>
        <Link href="/admin/applications" className="mt-2 inline-block text-sm font-medium text-red-700 hover:underline">
          Back to list
        </Link>
      </div>
    );
  }

  const data = (application.data || {}) as Record<string, unknown>;
  const businessInfo = (data.businessInfo || {}) as Record<string, unknown>;

  return (
    <div>
      <div className="mb-6">
        <Link
          href="/admin/applications"
          className="inline-flex items-center gap-1 text-sm font-medium text-gray-600 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" /> Back to applications
        </Link>
      </div>

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Summary</h2>
            <dl className="grid gap-3 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase">Business</dt>
                <dd className="mt-0.5 font-medium text-gray-900">{application.businessName || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase">Contact</dt>
                <dd className="mt-0.5 text-gray-900">{application.contactName || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase">Email</dt>
                <dd className="mt-0.5 text-gray-900">{application.email || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase">Phone</dt>
                <dd className="mt-0.5 text-gray-900">{application.phone || '—'}</dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase">Status</dt>
                <dd className="mt-0.5">
                  <span className="inline-flex px-2 py-0.5 text-xs font-medium rounded-full bg-gray-100 text-gray-800">
                    {application.status.replace('_', ' ')}
                  </span>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-medium text-gray-500 uppercase">Submitted</dt>
                <dd className="mt-0.5 text-gray-900">
                  {new Date(application.createdAt).toLocaleString('en-AU')}
                </dd>
              </div>
            </dl>
          </div>

          <div className="space-y-3">
            <h2 className="text-lg font-semibold text-gray-900">Full application data</h2>
            <DataSection title="Business information" data={businessInfo} defaultOpen />
            {data.insurance && (
              <DataSection title="Insurance & licensing" data={data.insurance as Record<string, unknown>} />
            )}
            {data.experience && (
              <DataSection title="Experience & references" data={data.experience as Record<string, unknown>} />
            )}
            {data.equipment && (
              <DataSection title="Equipment & resources" data={data.equipment as Record<string, unknown>} />
            )}
            {data.healthSafety && (
              <DataSection title="Health & safety" data={data.healthSafety as Record<string, unknown>} />
            )}
            {data.banking && (
              <DataSection title="Banking & payment" data={data.banking as Record<string, unknown>} />
            )}
          </div>
        </div>

        <div>
          <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 sticky top-6">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Actions</h2>
            <p className="text-sm text-gray-500 mb-4">Update the application status. The applicant can be notified separately.</p>
            <div className="space-y-2">
              {STATUS_OPTIONS.map(({ value, label, icon: Icon }) => (
                <button
                  key={value}
                  type="button"
                  onClick={() => updateStatus(value)}
                  disabled={updating || application.status === value}
                  className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-lg border text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                  style={{
                    borderColor: value === 'APPROVED' ? 'rgb(34 197 94)' : value === 'REJECTED' ? 'rgb(239 68 68)' : 'rgb(209 213 219)',
                    color: value === 'APPROVED' ? 'rgb(22 163 74)' : value === 'REJECTED' ? 'rgb(220 38 38)' : 'rgb(75 85 99)',
                    backgroundColor: application.status === value ? 'rgb(243 244 246)' : 'transparent',
                  }}
                >
                  {updating ? <Loader2 className="h-4 w-4 animate-spin" /> : <Icon className="h-4 w-4" />}
                  {application.status === value ? `${label} (current)` : label}
                </button>
              ))}
            </div>
            {updateError && <p className="mt-3 text-sm text-red-600">{updateError}</p>}
          </div>
        </div>
      </div>
    </div>
  );
}
