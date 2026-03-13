'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import {
  FileText,
  Search,
  RefreshCw,
  ChevronRight,
  Mail,
  Building2,
  Calendar,
  Filter,
} from 'lucide-react';

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

const STATUS_COLORS: Record<string, string> = {
  SUBMITTED: 'bg-blue-100 text-blue-800',
  UNDER_REVIEW: 'bg-amber-100 text-amber-800',
  APPROVED: 'bg-green-100 text-green-800',
  REJECTED: 'bg-red-100 text-red-800',
};

export default function AdminApplicationsListPage() {
  const [applications, setApplications] = useState<ApplicationSummary[]>([]);
  const [pagination, setPagination] = useState<Pagination>({
    page: 1,
    limit: 20,
    total: 0,
    pages: 0,
  });
  const [loading, setLoading] = useState(true);
  const [statusFilter, setStatusFilter] = useState<string>('');

  const fetchApplications = async (page = 1) => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '20',
      });
      if (statusFilter) params.set('status', statusFilter);
      const res = await fetch(`/api/admin/contractor-applications?${params}`);
      if (!res.ok) throw new Error('Failed to fetch');
      const data = await res.json();
      setApplications(data.applications || []);
      setPagination(data.pagination || { page: 1, limit: 20, total: 0, pages: 0 });
    } catch (e) {
      console.error(e);
      setApplications([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchApplications(1);
  }, [statusFilter]);

  const handlePageChange = (newPage: number) => {
    if (newPage >= 1 && newPage <= pagination.pages) {
      fetchApplications(newPage);
    }
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Contractor applications</h1>
        <div className="flex items-center gap-3">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm bg-white"
          >
            <option value="">All statuses</option>
            <option value="SUBMITTED">Submitted</option>
            <option value="UNDER_REVIEW">Under review</option>
            <option value="APPROVED">Approved</option>
            <option value="REJECTED">Rejected</option>
          </select>
          <button
            type="button"
            onClick={() => fetchApplications(pagination.page)}
            disabled={loading}
            className="inline-flex items-center gap-2 px-3 py-2 rounded-lg border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 disabled:opacity-50"
          >
            <RefreshCw className={`h-4 w-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh
          </button>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        {loading && applications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">Loading applications…</div>
        ) : applications.length === 0 ? (
          <div className="p-12 text-center text-gray-500">No applications found.</div>
        ) : (
          <>
            <div className="overflow-x-auto">
              <table className="min-w-full divide-y divide-gray-200">
                <thead className="bg-gray-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Business / Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Contact</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                    <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase">Submitted</th>
                    <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase">Action</th>
                  </tr>
                </thead>
                <tbody className="bg-white divide-y divide-gray-200">
                  {applications.map((app) => (
                    <tr key={app.id} className="hover:bg-gray-50">
                      <td className="px-4 py-3">
                        <div className="font-medium text-gray-900">{app.businessName || '—'}</div>
                        <div className="text-sm text-gray-500">{app.contactName || '—'}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-sm text-gray-900">{app.email || '—'}</div>
                        <div className="text-sm text-gray-500">{app.phone || '—'}</div>
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2 py-0.5 text-xs font-medium rounded-full ${
                            STATUS_COLORS[app.status] || 'bg-gray-100 text-gray-800'
                          }`}
                        >
                          {app.status.replace('_', ' ')}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-500">
                        {app.createdAt ? new Date(app.createdAt).toLocaleDateString('en-AU', {
                          day: 'numeric',
                          month: 'short',
                          year: 'numeric',
                        }) : '—'}
                      </td>
                      <td className="px-4 py-3 text-right">
                        <Link
                          href={`/admin/applications/${app.id}`}
                          className="inline-flex items-center gap-1 text-sm font-medium text-orange-600 hover:text-orange-700"
                        >
                          View <ChevronRight className="h-4 w-4" />
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            {pagination.pages > 1 && (
              <div className="px-4 py-3 bg-gray-50 border-t border-gray-200 flex items-center justify-between">
                <p className="text-sm text-gray-600">
                  Page {pagination.page} of {pagination.pages} ({pagination.total} total)
                </p>
                <div className="flex gap-2">
                  <button
                    type="button"
                    onClick={() => handlePageChange(pagination.page - 1)}
                    disabled={pagination.page <= 1}
                    className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50"
                  >
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={() => handlePageChange(pagination.page + 1)}
                    disabled={pagination.page >= pagination.pages}
                    className="px-3 py-1 rounded border border-gray-300 text-sm disabled:opacity-50"
                  >
                    Next
                  </button>
                </div>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
