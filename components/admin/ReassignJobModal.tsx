'use client'

import { useState, useEffect, useCallback } from 'react'

interface Contractor {
  id: string
  userId: string
  name: string | null
  businessName: string | null
  email: string
  activeJobs: number
}

interface ReassignJobModalProps {
  isOpen: boolean
  jobId: string
  currentContractorId?: string
  onClose: () => void
  onReassign: (contractorId: string, reason: string) => Promise<{ success: boolean; error?: string }>
  getAvailableContractors: (jobId: string, search?: string) => Promise<Contractor[]>
}

export function ReassignJobModal({
  isOpen,
  jobId,
  currentContractorId,
  onClose,
  onReassign,
  getAvailableContractors,
}: ReassignJobModalProps) {
  const [contractors, setContractors] = useState<Contractor[]>([])
  const [selectedContractor, setSelectedContractor] = useState<string>('')
  const [reason, setReason] = useState('')
  const [search, setSearch] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [isFetching, setIsFetching] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch contractors when modal opens
  const fetchContractors = useCallback(async (searchQuery?: string) => {
    setIsFetching(true)
    try {
      const data = await getAvailableContractors(jobId, searchQuery)
      setContractors(data)
    } catch {
      setError('Failed to load contractors')
    } finally {
      setIsFetching(false)
    }
  }, [jobId, getAvailableContractors])

  useEffect(() => {
    if (isOpen) {
      fetchContractors()
      setSelectedContractor('')
      setReason('')
      setSearch('')
      setError(null)
    }
  }, [isOpen, fetchContractors])

  // Debounced search
  useEffect(() => {
    const timer = setTimeout(() => {
      if (search) {
        fetchContractors(search)
      } else if (isOpen) {
        fetchContractors()
      }
    }, 300)

    return () => clearTimeout(timer)
  }, [search, fetchContractors, isOpen])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!selectedContractor) {
      setError('Please select a contractor')
      return
    }

    if (!reason.trim()) {
      setError('Please provide a reason for reassignment')
      return
    }

    setIsLoading(true)
    setError(null)

    const result = await onReassign(selectedContractor, reason.trim())

    if (result.success) {
      onClose()
    } else {
      setError(result.error || 'Failed to reassign job')
    }

    setIsLoading(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
      />

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
          {/* Header */}
          <div className="border-b border-grey-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-semibold text-grey-900">
                Reassign Job
              </h3>
              <button
                onClick={onClose}
                className="text-grey-400 hover:text-grey-500"
              >
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>
          </div>

          {/* Body */}
          <form onSubmit={handleSubmit}>
            <div className="px-6 py-4 space-y-4">
              {/* Error message */}
              {error && (
                <div className="rounded-md bg-red-50 p-3">
                  <div className="flex">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <p className="ml-3 text-sm text-red-700">{error}</p>
                  </div>
                </div>
              )}

              {/* Search */}
              <div>
                <label className="block text-sm font-medium text-grey-700 mb-1">
                  Search Contractors
                </label>
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or business..."
                  className="w-full rounded-md border border-grey-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                />
              </div>

              {/* Contractor list */}
              <div>
                <label className="block text-sm font-medium text-grey-700 mb-1">
                  Select Contractor
                </label>
                <div className="border border-grey-300 rounded-md max-h-48 overflow-y-auto">
                  {isFetching ? (
                    <div className="p-4 text-center text-grey-500">
                      Loading contractors...
                    </div>
                  ) : contractors.length === 0 ? (
                    <div className="p-4 text-center text-grey-500">
                      No contractors found
                    </div>
                  ) : (
                    <ul className="divide-y divide-grey-200">
                      {contractors.map((contractor) => {
                        const isCurrentContractor = contractor.id === currentContractorId
                        const isSelected = contractor.id === selectedContractor

                        return (
                          <li key={contractor.id}>
                            <button
                              type="button"
                              disabled={isCurrentContractor}
                              onClick={() => setSelectedContractor(contractor.id)}
                              className={`w-full px-4 py-3 text-left hover:bg-grey-50 focus:outline-none ${
                                isSelected ? 'bg-blue-50 border-l-4 border-blue-500' : ''
                              } ${isCurrentContractor ? 'opacity-50 cursor-not-allowed' : ''}`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <p className="text-sm font-medium text-grey-900">
                                    {contractor.name || contractor.businessName || 'Unknown'}
                                    {isCurrentContractor && (
                                      <span className="ml-2 text-xs text-grey-500">(Current)</span>
                                    )}
                                  </p>
                                  <p className="text-xs text-grey-500">{contractor.email}</p>
                                </div>
                                <div className="text-right">
                                  <span className={`inline-flex items-center px-2 py-0.5 rounded text-xs font-medium ${
                                    contractor.activeJobs === 0
                                      ? 'bg-green-100 text-green-800'
                                      : contractor.activeJobs < 3
                                      ? 'bg-yellow-100 text-yellow-800'
                                      : 'bg-red-100 text-red-800'
                                  }`}>
                                    {contractor.activeJobs} active
                                  </span>
                                </div>
                              </div>
                            </button>
                          </li>
                        )
                      })}
                    </ul>
                  )}
                </div>
              </div>

              {/* Reason */}
              <div>
                <label className="block text-sm font-medium text-grey-700 mb-1">
                  Reason for Reassignment <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  rows={3}
                  placeholder="Explain why this job is being reassigned..."
                  className="w-full rounded-md border border-grey-300 px-3 py-2 text-sm focus:border-blue-500 focus:outline-none focus:ring-1 focus:ring-blue-500"
                  required
                />
              </div>
            </div>

            {/* Footer */}
            <div className="border-t border-grey-200 px-6 py-4 flex justify-end space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 text-sm font-medium text-grey-700 bg-white border border-grey-300 rounded-md hover:bg-grey-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={isLoading || !selectedContractor || !reason.trim()}
                className="px-4 py-2 text-sm font-medium text-white bg-blue-600 border border-transparent rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Reassigning...
                  </span>
                ) : (
                  'Reassign Job'
                )}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
}

export default ReassignJobModal
