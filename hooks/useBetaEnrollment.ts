'use client'

import { useState, useEffect, useCallback } from 'react'
import useSWR from 'swr'

interface BetaProgram {
  id: string
  name: string
  description: string | null
  featureArea: string
  startDate: string
  endDate: string
  isActive: boolean
}

interface ActiveEnrollment {
  id: string
  program: BetaProgram
  tierOverride: string | null
  acceptedAt: string | null
}

interface PendingEnrollment {
  id: string
  program: BetaProgram
  tierOverride: string | null
  invitedAt: string
}

interface PastEnrollment {
  id: string
  program: BetaProgram
  status: string
  completedAt: string | null
  withdrawnAt: string | null
}

interface EnrollmentData {
  enrollments: {
    active: ActiveEnrollment[]
    pending: PendingEnrollment[]
    past: PastEnrollment[]
  }
  isBetaUser: boolean
  tierOverride: string | null
  hasPendingInvitation: boolean
}

interface FeedbackItem {
  id: string
  program: { id: string; name: string }
  category: string
  title: string
  description: string
  priority: string | null
  status: string
  adminResponse: string | null
  createdAt: string
  updatedAt: string
}

interface NpsSurvey {
  id: string
  program: { id: string; name: string }
  score: number
  followUpAnswer: string | null
  surveyTrigger: string | null
  createdAt: string
}

interface NpsStatus {
  isDue: boolean
  programs: {
    program: { id: string; name: string }
    lastSurveyAt: string | null
    lastScore: number | null
    isDue: boolean
  }[]
  surveys: NpsSurvey[]
}

interface SubmitFeedbackData {
  programId: string
  category: 'BUG_REPORT' | 'FEATURE_REQUEST' | 'USABILITY_ISSUE' | 'GENERAL_FEEDBACK'
  title: string
  description: string
  priority?: 'low' | 'medium' | 'high' | 'critical'
  screenshotUrl?: string
  pageUrl?: string
  deviceType?: string
}

interface SubmitNpsData {
  programId: string
  score: number
  followUpAnswer?: string
  surveyTrigger?: 'weekly' | 'feature_use' | 'manual'
}

const fetcher = async (url: string) => {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error('Failed to fetch')
  }
  return res.json()
}

export function useBetaEnrollment() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Fetch enrollment status
  const {
    data: enrollmentData,
    error: enrollmentError,
    isLoading: isLoadingEnrollment,
    mutate: mutateEnrollment,
  } = useSWR<EnrollmentData>('/api/beta/enrollment', fetcher)

  // Fetch NPS status
  const {
    data: npsData,
    error: npsError,
    isLoading: isLoadingNps,
    mutate: mutateNps,
  } = useSWR<NpsStatus>('/api/beta/nps', fetcher)

  // Accept a beta invitation
  const acceptInvitation = useCallback(async (enrollmentId: string) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/beta/enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId, action: 'accept' }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to accept invitation')
      }

      await mutateEnrollment()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to accept invitation')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }, [mutateEnrollment])

  // Decline a beta invitation
  const declineInvitation = useCallback(async (enrollmentId: string) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/beta/enrollment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ enrollmentId, action: 'decline' }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to decline invitation')
      }

      await mutateEnrollment()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to decline invitation')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }, [mutateEnrollment])

  // Submit feedback
  const submitFeedback = useCallback(async (data: SubmitFeedbackData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/beta/feedback', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...data,
          pageUrl: data.pageUrl || window.location.href,
          deviceType: data.deviceType || getDeviceType(),
        }),
      })

      if (!res.ok) {
        const resData = await res.json()
        throw new Error(resData.error || 'Failed to submit feedback')
      }

      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit feedback')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }, [])

  // Submit NPS survey
  const submitNps = useCallback(async (data: SubmitNpsData) => {
    setIsSubmitting(true)
    setError(null)

    try {
      const res = await fetch('/api/beta/nps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      })

      if (!res.ok) {
        const resData = await res.json()
        throw new Error(resData.error || 'Failed to submit NPS survey')
      }

      await mutateNps()
      return true
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to submit NPS survey')
      return false
    } finally {
      setIsSubmitting(false)
    }
  }, [mutateNps])

  // Derived state
  const isBetaUser = enrollmentData?.isBetaUser ?? false
  const hasPendingInvitation = enrollmentData?.hasPendingInvitation ?? false
  const tierOverride = enrollmentData?.tierOverride ?? null
  const activeEnrollments = enrollmentData?.enrollments?.active ?? []
  const pendingInvitations = enrollmentData?.enrollments?.pending ?? []
  const isNpsDue = npsData?.isDue ?? false
  const npsProgramsDue = npsData?.programs?.filter(p => p.isDue) ?? []

  return {
    // Loading states
    isLoading: isLoadingEnrollment || isLoadingNps,
    isLoadingEnrollment,
    isLoadingNps,
    isSubmitting,

    // Error states
    error,
    enrollmentError,
    npsError,

    // Beta status
    isBetaUser,
    hasPendingInvitation,
    tierOverride,

    // Enrollments
    activeEnrollments,
    pendingInvitations,
    pastEnrollments: enrollmentData?.enrollments?.past ?? [],

    // NPS
    isNpsDue,
    npsProgramsDue,
    npsHistory: npsData?.surveys ?? [],

    // Actions
    acceptInvitation,
    declineInvitation,
    submitFeedback,
    submitNps,

    // Refresh
    refresh: useCallback(() => {
      mutateEnrollment()
      mutateNps()
    }, [mutateEnrollment, mutateNps]),
  }
}

// Helper function to detect device type
function getDeviceType(): string {
  const ua = navigator.userAgent
  if (/tablet|ipad|playbook|silk/i.test(ua)) {
    return 'tablet'
  }
  if (/mobile|iphone|ipod|android|blackberry|opera mini|iemobile/i.test(ua)) {
    return 'mobile'
  }
  return 'desktop'
}
