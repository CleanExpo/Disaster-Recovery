'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/contexts/AuthContext'
import { useAdminRealtimeJobs, AdminLiveJob } from '@/hooks/useAdminRealtimeJobs'
import { AdminJobTable } from '@/components/admin/AdminJobTable'
import { ReassignJobModal } from '@/components/admin/ReassignJobModal'
import { RealtimeMetricsPanel } from '@/components/admin/RealtimeMetricsPanel'
import { ConnectionIndicator } from '@/components/realtime/ConnectionIndicator'

const STATUS_OPTIONS = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'MATCHED', label: 'Matched' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
]

const URGENCY_OPTIONS = [
  { value: '', label: 'All Urgencies' },
  { value: 'emergency', label: 'Emergency' },
  { value: 'urgent', label: 'Urgent' },
  { value: 'normal', label: 'Normal' },
]

export default function AdminLiveJobsPage() {
  const router = useRouter()
  const { user, loading: authLoading } = useAuth()

  // Filters
  const [statusFilters, setStatusFilters] = useState<string[]>([])
  const [urgencyFilter, setUrgencyFilter] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  // Modal state
  const [reassignModalOpen, setReassignModalOpen] = useState(false)
  const [selectedJobId, setSelectedJobId] = useState<string | null>(null)
  const [selectedJob, setSelectedJob] = useState<AdminLiveJob | null>(null)

  // Real-time data
  const {
    jobs,
    connectionStatus,
    isLoading,
    error,
    lastUpdated,
    fetchJobs,
    reassignJob,
    getAvailableContractors,
    refresh,
  } = useAdminRealtimeJobs({
    autoFetch: true,
    pollingInterval: 30000,
  })

  // Auth check
  if (authLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600" />
      </div>
    )
  }

  if (!user || user.userType !== 'ADMIN') {
    router.push('/')
    return null
  }

  // Handle filter changes
  const handleStatusToggle = (status: string) => {
    setStatusFilters(prev =>
      prev.includes(status)
        ? prev.filter(s => s !== status)
        : [...prev, status]
    )
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchJobs({
      status: statusFilters.length > 0 ? statusFilters : undefined,
      urgency: urgencyFilter || undefined,
      search: searchQuery || undefined,
    })
  }

  // Filter jobs client-side for responsiveness
  const filteredJobs = jobs.filter(job => {
    if (statusFilters.length > 0 && !statusFilters.includes(job.status)) {
      return false
    }
    if (urgencyFilter && job.urgency.toLowerCase() !== urgencyFilter) {
      return false
    }
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      return (
        job.serviceTitle.toLowerCase().includes(query) ||
        job.location.toLowerCase().includes(query) ||
        job.client.name?.toLowerCase().includes(query) ||
        job.contractor?.name?.toLowerCase().includes(query)
      )
    }
    return true
  })

  // Handle reassignment
  const handleOpenReassign = (jobId: string) => {
    const job = jobs.find(j => j.id === jobId)
    setSelectedJobId(jobId)
    setSelectedJob(job || null)
    setReassignModalOpen(true)
  }

  const handleReassign = async (contractorId: string, reason: string) => {
    if (!selectedJobId) return { success: false, error: 'No job selected' }
    return await reassignJob(selectedJobId, contractorId, reason)
  }

  const handleCloseReassign = () => {
    setReassignModalOpen(false)
    setSelectedJobId(null)
    setSelectedJob(null)
  }

  return (
    <div className="min-h-screen bg-grey-100">
      {/* Header */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold text-grey-900">Live Job Dashboard</h1>
              <p className="mt-1 text-sm text-grey-500">
                Real-time view of all active jobs across the platform
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <ConnectionIndicator status={connectionStatus} />
              <button
                onClick={refresh}
                className="inline-flex items-center px-3 py-2 border border-grey-300 shadow-sm text-sm font-medium rounded-md text-grey-700 bg-white hover:bg-grey-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                <svg className="h-4 w-4 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
                Refresh
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Metrics Panel */}
        <RealtimeMetricsPanel />

        {/* Filters */}
        <div className="bg-white rounded-lg shadow p-4">
          <form onSubmit={handleSearch} className="space-y-4">
            <div className="flex flex-wrap items-center gap-4">
              {/* Status Filters */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-grey-700">Status:</span>
                {STATUS_OPTIONS.map(option => (
                  <button
                    key={option.value}
                    type="button"
                    onClick={() => handleStatusToggle(option.value)}
                    className={`px-3 py-1.5 text-sm font-medium rounded-full border transition-colours ${
                      statusFilters.includes(option.value)
                        ? 'bg-blue-100 border-blue-300 text-blue-800'
                        : 'bg-white border-grey-300 text-grey-700 hover:bg-grey-50'
                    }`}
                  >
                    {option.label}
                  </button>
                ))}
              </div>

              {/* Urgency Filter */}
              <div className="flex items-center space-x-2">
                <span className="text-sm font-medium text-grey-700">Urgency:</span>
                <select
                  value={urgencyFilter}
                  onChange={(e) => setUrgencyFilter(e.target.value)}
                  className="rounded-md border-grey-300 text-sm focus:border-blue-500 focus:ring-blue-500"
                >
                  {URGENCY_OPTIONS.map(option => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Search */}
              <div className="flex-1 min-w-[200px]">
                <div className="relative">
                  <input
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Search jobs, clients, contractors..."
                    className="w-full rounded-md border-grey-300 pl-10 text-sm focus:border-blue-500 focus:ring-blue-500"
                  />
                  <svg
                    className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-grey-400"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                  </svg>
                </div>
              </div>

              {/* Apply Button */}
              <button
                type="submit"
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Apply Filters
              </button>

              {/* Clear Filters */}
              {(statusFilters.length > 0 || urgencyFilter || searchQuery) && (
                <button
                  type="button"
                  onClick={() => {
                    setStatusFilters([])
                    setUrgencyFilter('')
                    setSearchQuery('')
                    fetchJobs()
                  }}
                  className="text-sm text-grey-500 hover:text-grey-700"
                >
                  Clear all
                </button>
              )}
            </div>
          </form>
        </div>

        {/* Error State */}
        {error && (
          <div className="rounded-md bg-red-50 p-4">
            <div className="flex">
              <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-red-800">Error loading jobs</h3>
                <p className="mt-1 text-sm text-red-700">{error}</p>
              </div>
            </div>
          </div>
        )}

        {/* Jobs Table */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-medium text-grey-900">
              Active Jobs ({filteredJobs.length})
            </h2>
            {lastUpdated && (
              <span className="text-xs text-grey-500">
                Last updated: {lastUpdated.toLocaleTimeString('en-AU')}
              </span>
            )}
          </div>
          <AdminJobTable
            jobs={filteredJobs}
            isLoading={isLoading}
            onReassign={handleOpenReassign}
          />
        </div>
      </div>

      {/* Reassign Modal */}
      <ReassignJobModal
        isOpen={reassignModalOpen}
        jobId={selectedJobId || ''}
        currentContractorId={selectedJob?.contractor?.id}
        onClose={handleCloseReassign}
        onReassign={handleReassign}
        getAvailableContractors={getAvailableContractors}
      />
    </div>
  )
}
