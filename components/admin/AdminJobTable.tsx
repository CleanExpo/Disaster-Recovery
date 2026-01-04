'use client'

import { useState } from 'react'
import type { AdminLiveJob } from '@/hooks/useAdminRealtimeJobs'

interface AdminJobTableProps {
  jobs: AdminLiveJob[]
  isLoading: boolean
  onReassign: (jobId: string) => void
  onViewDetails?: (job: AdminLiveJob) => void
}

const STATUS_COLOURS: Record<string, { bg: string; text: string }> = {
  PENDING: { bg: 'bg-yellow-100', text: 'text-yellow-800' },
  MATCHED: { bg: 'bg-blue-100', text: 'text-blue-800' },
  IN_PROGRESS: { bg: 'bg-green-100', text: 'text-green-800' },
  COMPLETED: { bg: 'bg-grey-100', text: 'text-grey-800' },
  CANCELLED: { bg: 'bg-red-100', text: 'text-red-800' },
}

const URGENCY_COLOURS: Record<string, { bg: string; text: string }> = {
  emergency: { bg: 'bg-red-100', text: 'text-red-800' },
  urgent: { bg: 'bg-orange-100', text: 'text-orange-800' },
  normal: { bg: 'bg-grey-100', text: 'text-grey-600' },
}

export function AdminJobTable({
  jobs,
  isLoading,
  onReassign,
  onViewDetails,
}: AdminJobTableProps) {
  const [sortField, setSortField] = useState<keyof AdminLiveJob>('createdAt')
  const [sortDirection, setSortDirection] = useState<'asc' | 'desc'>('desc')

  const handleSort = (field: keyof AdminLiveJob) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc')
    } else {
      setSortField(field)
      setSortDirection('desc')
    }
  }

  const sortedJobs = [...jobs].sort((a, b) => {
    const aValue = a[sortField]
    const bValue = b[sortField]

    if (aValue === null || aValue === undefined) return 1
    if (bValue === null || bValue === undefined) return -1

    const comparison = String(aValue).localeCompare(String(bValue))
    return sortDirection === 'asc' ? comparison : -comparison
  })

  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.toLocaleString('en-AU', {
      day: '2-digit',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
    })
  }

  const formatTimeAgo = (dateStr: string) => {
    const date = new Date(dateStr)
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffMins = Math.floor(diffMs / 60000)
    const diffHours = Math.floor(diffMs / 3600000)

    if (diffMins < 1) return 'Just now'
    if (diffMins < 60) return `${diffMins}m ago`
    if (diffHours < 24) return `${diffHours}h ago`
    return formatDate(dateStr)
  }

  if (isLoading) {
    return (
      <div className="bg-white rounded-lg shadow overflow-hidden">
        <div className="animate-pulse p-4 space-y-4">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="h-12 bg-grey-200 rounded" />
          ))}
        </div>
      </div>
    )
  }

  if (jobs.length === 0) {
    return (
      <div className="bg-white rounded-lg shadow p-8 text-center">
        <svg
          className="mx-auto h-12 w-12 text-grey-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
        <h3 className="mt-2 text-sm font-medium text-grey-900">No active jobs</h3>
        <p className="mt-1 text-sm text-grey-500">
          There are currently no active jobs to display.
        </p>
      </div>
    )
  }

  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-grey-200">
          <thead className="bg-grey-50">
            <tr>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider cursor-pointer hover:bg-grey-100"
                onClick={() => handleSort('serviceTitle')}
              >
                Job
                {sortField === 'serviceTitle' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider"
              >
                Client
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider"
              >
                Contractor
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider cursor-pointer hover:bg-grey-100"
                onClick={() => handleSort('status')}
              >
                Status
                {sortField === 'status' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider cursor-pointer hover:bg-grey-100"
                onClick={() => handleSort('urgency')}
              >
                Urgency
                {sortField === 'urgency' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-left text-xs font-medium text-grey-500 uppercase tracking-wider cursor-pointer hover:bg-grey-100"
                onClick={() => handleSort('createdAt')}
              >
                Created
                {sortField === 'createdAt' && (
                  <span className="ml-1">{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </th>
              <th
                scope="col"
                className="px-4 py-3 text-right text-xs font-medium text-grey-500 uppercase tracking-wider"
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-grey-200">
            {sortedJobs.map((job) => {
              const statusColour = STATUS_COLOURS[job.status] || STATUS_COLOURS.PENDING
              const urgencyColour = URGENCY_COLOURS[job.urgency.toLowerCase()] || URGENCY_COLOURS.normal

              return (
                <tr
                  key={job.id}
                  className={`hover:bg-grey-50 ${job.urgentResponse ? 'bg-red-50' : ''}`}
                >
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      {job.urgentResponse && (
                        <span className="flex-shrink-0 mr-2 h-2 w-2 rounded-full bg-red-500 animate-pulse" />
                      )}
                      <div>
                        <div className="text-sm font-medium text-grey-900 truncate max-w-[200px]">
                          {job.serviceTitle}
                        </div>
                        <div className="text-xs text-grey-500 truncate max-w-[200px]">
                          {job.location}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <div className="text-sm text-grey-900">{job.client.name || 'Unknown'}</div>
                    <div className="text-xs text-grey-500">{job.client.email}</div>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    {job.contractor ? (
                      <div>
                        <div className="text-sm text-grey-900">{job.contractor.name}</div>
                        <div className="text-xs text-grey-500">
                          {job.contractor.matchStatus === 'ACCEPTED' ? (
                            <span className="text-green-600">Accepted</span>
                          ) : (
                            <span className="text-yellow-600">Pending</span>
                          )}
                        </div>
                      </div>
                    ) : (
                      <span className="text-sm text-grey-400 italic">Unassigned</span>
                    )}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${statusColour.bg} ${statusColour.text}`}
                    >
                      {job.status.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap">
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${urgencyColour.bg} ${urgencyColour.text}`}
                    >
                      {job.urgency}
                    </span>
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-sm text-grey-500">
                    {formatTimeAgo(job.createdAt)}
                  </td>
                  <td className="px-4 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end space-x-2">
                      {onViewDetails && (
                        <button
                          onClick={() => onViewDetails(job)}
                          className="text-blue-600 hover:text-blue-900"
                          title="View details"
                        >
                          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        </button>
                      )}
                      <button
                        onClick={() => onReassign(job.id)}
                        className="text-indigo-600 hover:text-indigo-900"
                        title="Reassign contractor"
                      >
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7h12m0 0l-4-4m4 4l-4 4m0 6H4m0 0l4 4m-4-4l4-4" />
                        </svg>
                      </button>
                    </div>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminJobTable
