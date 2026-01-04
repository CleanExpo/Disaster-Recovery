'use client'

/**
 * Demo Context for Tradeshow Booth
 *
 * Provides demo state management and controls for demonstrating
 * real-time job coordination features without live data.
 */

import React, { createContext, useContext, useState, useCallback, useRef, useEffect } from 'react'
import {
  createDemoJobs,
  createDemoMessages,
  demoContractors,
  demoClients,
  demoRoute,
  statusFlow,
  type DemoJob,
  type DemoContractor,
  type DemoClient,
  type DemoMessage,
} from './demo-data'
import type { JobStatus } from '@/lib/supabase/types'

// Demo scenario types
export type DemoScenario =
  | 'full_journey'    // Complete job lifecycle (90s)
  | 'live_tracking'   // Contractor moving on map (60s)
  | 'messaging'       // Chat conversation (30s)
  | 'multi_job'       // Admin dashboard with multiple jobs
  | 'new_job_alert'   // Single new job notification (10s)

export type DemoSpeed = 1 | 2 | 4

interface DemoState {
  isDemo: boolean
  currentScenario: DemoScenario | null
  isPlaying: boolean
  isPaused: boolean
  speed: DemoSpeed
  currentStep: number
  totalSteps: number
  stepLabel: string
  elapsedTime: number

  // Demo data state
  jobs: DemoJob[]
  activeJob: DemoJob | null
  contractors: DemoContractor[]
  clients: DemoClient[]
  messages: DemoMessage[]

  // Contractor location for tracking
  contractorLocation: { lat: number; lng: number } | null
  routeProgress: number // 0-1 progress along route
  currentEta: number | null // minutes
  trafficCondition: 'clear' | 'moderate' | 'heavy' | null
}

interface DemoControls {
  startScenario: (scenario: DemoScenario) => void
  play: () => void
  pause: () => void
  reset: () => void
  setSpeed: (speed: DemoSpeed) => void

  // Manual controls for booth operators
  triggerNewJob: () => void
  moveContractor: () => void
  sendMessage: (content: string, senderType: 'client' | 'contractor') => void
  updateJobStatus: (status: JobStatus) => void
  triggerAlert: () => void
}

interface DemoContextValue {
  state: DemoState
  controls: DemoControls
}

const initialState: DemoState = {
  isDemo: false,
  currentScenario: null,
  isPlaying: false,
  isPaused: false,
  speed: 1,
  currentStep: 0,
  totalSteps: 0,
  stepLabel: '',
  elapsedTime: 0,

  jobs: [],
  activeJob: null,
  contractors: demoContractors,
  clients: demoClients,
  messages: [],

  contractorLocation: null,
  routeProgress: 0,
  currentEta: null,
  trafficCondition: null,
}

const DemoContext = createContext<DemoContextValue | null>(null)

export function DemoProvider({
  children,
  enabled = false,
}: {
  children: React.ReactNode
  enabled?: boolean
}) {
  const [state, setState] = useState<DemoState>({
    ...initialState,
    isDemo: enabled,
    jobs: enabled ? createDemoJobs() : [],
  })

  const intervalRef = useRef<NodeJS.Timeout | null>(null)
  const scenarioRef = useRef<{ cleanup: () => void } | null>(null)

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
      if (scenarioRef.current) {
        scenarioRef.current.cleanup()
      }
    }
  }, [])

  // Play audio notification
  const playNotificationSound = useCallback(() => {
    if (typeof window !== 'undefined') {
      try {
        const audio = new Audio('/sounds/notification.mp3')
        audio.volume = 0.5
        audio.play().catch(() => {
          // Autoplay may be blocked
        })
      } catch {
        // Audio not available
      }
    }
  }, [])

  // Start a demo scenario
  const startScenario = useCallback((scenario: DemoScenario) => {
    // Reset first
    if (scenarioRef.current) {
      scenarioRef.current.cleanup()
    }
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }

    const jobs = createDemoJobs()

    setState(prev => ({
      ...prev,
      currentScenario: scenario,
      isPlaying: true,
      isPaused: false,
      currentStep: 0,
      elapsedTime: 0,
      jobs,
      messages: [],
      contractorLocation: null,
      routeProgress: 0,
      currentEta: null,
      trafficCondition: null,
      stepLabel: 'Starting...',
      totalSteps: getScenarioSteps(scenario),
      activeJob: scenario === 'multi_job' ? null : jobs[0],
    }))

    // Start scenario timer
    const startTime = Date.now()
    intervalRef.current = setInterval(() => {
      setState(prev => {
        if (!prev.isPlaying || prev.isPaused) return prev

        const elapsed = Math.floor((Date.now() - startTime) / 1000 * prev.speed)
        return { ...prev, elapsedTime: elapsed }
      })
    }, 100)
  }, [])

  // Play/resume scenario
  const play = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPlaying: true,
      isPaused: false,
    }))
  }, [])

  // Pause scenario
  const pause = useCallback(() => {
    setState(prev => ({
      ...prev,
      isPaused: true,
    }))
  }, [])

  // Reset scenario
  const reset = useCallback(() => {
    if (intervalRef.current) {
      clearInterval(intervalRef.current)
    }
    if (scenarioRef.current) {
      scenarioRef.current.cleanup()
    }

    setState(prev => ({
      ...initialState,
      isDemo: prev.isDemo,
      jobs: createDemoJobs(),
      contractors: demoContractors,
      clients: demoClients,
    }))
  }, [])

  // Set playback speed
  const setSpeed = useCallback((speed: DemoSpeed) => {
    setState(prev => ({ ...prev, speed }))
  }, [])

  // Trigger new job alert manually
  const triggerNewJob = useCallback(() => {
    playNotificationSound()

    const newJob: DemoJob = {
      id: `demo-job-${Date.now()}`,
      serviceType: 'Emergency Water Extraction',
      status: 'pending',
      priority: 'emergency',
      contractor: null,
      client: demoClients[Math.floor(Math.random() * demoClients.length)],
      eta: null,
      distanceKm: null,
      trafficCondition: null,
      createdAt: new Date(),
      acceptedAt: null,
      completedAt: null,
      description: 'URGENT: Major water leak from burst main. Water spreading rapidly. Immediate response required.',
    }

    setState(prev => ({
      ...prev,
      jobs: [newJob, ...prev.jobs],
      activeJob: newJob,
    }))
  }, [playNotificationSound])

  // Move contractor along route
  const moveContractor = useCallback(() => {
    setState(prev => {
      const newProgress = Math.min(prev.routeProgress + 0.1, 1)
      const routeIndex = Math.floor(newProgress * (demoRoute.length - 1))
      const newLocation = demoRoute[routeIndex]

      // Calculate ETA based on remaining distance
      const remainingProgress = 1 - newProgress
      const newEta = Math.max(0, Math.round(remainingProgress * 18)) // 18 min total

      return {
        ...prev,
        routeProgress: newProgress,
        contractorLocation: newLocation,
        currentEta: newEta,
        trafficCondition: newProgress < 0.3 ? 'clear' : newProgress < 0.7 ? 'moderate' : 'clear',
      }
    })
  }, [])

  // Send a message
  const sendMessage = useCallback((content: string, senderType: 'client' | 'contractor') => {
    setState(prev => {
      const newMessage: DemoMessage = {
        id: `demo-msg-${Date.now()}`,
        jobId: prev.activeJob?.id || 'demo-job-1',
        senderId: senderType === 'client' ? 'demo-client-1' : 'demo-contractor-1',
        senderType,
        content,
        isRead: false,
        createdAt: new Date().toISOString(),
      }

      return {
        ...prev,
        messages: [...prev.messages, newMessage],
      }
    })
  }, [])

  // Update active job status
  const updateJobStatus = useCallback((status: JobStatus) => {
    setState(prev => {
      if (!prev.activeJob) return prev

      const updatedJob: DemoJob = {
        ...prev.activeJob,
        status,
        acceptedAt: status === 'accepted' ? new Date() : prev.activeJob.acceptedAt,
        completedAt: status === 'completed' ? new Date() : prev.activeJob.completedAt,
        contractor: status !== 'pending' ? demoContractors[0] : null,
      }

      // Update ETA and location based on status
      let contractorLocation = prev.contractorLocation
      let currentEta = prev.currentEta
      let trafficCondition = prev.trafficCondition

      if (status === 'en_route') {
        contractorLocation = demoRoute[0]
        currentEta = 18
        trafficCondition = 'clear'
      } else if (status === 'on_site' || status === 'in_progress' || status === 'completed') {
        contractorLocation = demoRoute[demoRoute.length - 1]
        currentEta = 0
        trafficCondition = null
      }

      const statusIndex = statusFlow.indexOf(status)

      return {
        ...prev,
        activeJob: updatedJob,
        jobs: prev.jobs.map(j => j.id === updatedJob.id ? updatedJob : j),
        currentStep: statusIndex >= 0 ? statusIndex + 1 : prev.currentStep,
        stepLabel: getStatusLabel(status),
        contractorLocation,
        currentEta,
        trafficCondition,
      }
    })
  }, [])

  // Trigger an alert (sound + visual)
  const triggerAlert = useCallback(() => {
    playNotificationSound()
  }, [playNotificationSound])

  // Run scenario logic based on elapsed time
  useEffect(() => {
    if (!state.isPlaying || state.isPaused || !state.currentScenario) return

    const { currentScenario, elapsedTime, speed } = state
    const adjustedTime = elapsedTime

    // Full Journey Scenario (90 seconds)
    if (currentScenario === 'full_journey') {
      runFullJourneyScenario(adjustedTime, state, setState, playNotificationSound)
    }
    // Live Tracking Scenario (60 seconds)
    else if (currentScenario === 'live_tracking') {
      runLiveTrackingScenario(adjustedTime, state, setState)
    }
    // Messaging Scenario (30 seconds)
    else if (currentScenario === 'messaging') {
      runMessagingScenario(adjustedTime, state, setState)
    }
    // New Job Alert (10 seconds)
    else if (currentScenario === 'new_job_alert') {
      runNewJobAlertScenario(adjustedTime, state, setState, playNotificationSound)
    }
  }, [state.elapsedTime, state.isPlaying, state.isPaused, state.currentScenario, playNotificationSound])

  const controls: DemoControls = {
    startScenario,
    play,
    pause,
    reset,
    setSpeed,
    triggerNewJob,
    moveContractor,
    sendMessage,
    updateJobStatus,
    triggerAlert,
  }

  return (
    <DemoContext.Provider value={{ state, controls }}>
      {children}
    </DemoContext.Provider>
  )
}

export function useDemo(): DemoContextValue {
  const context = useContext(DemoContext)
  if (!context) {
    // Return a non-demo context if not wrapped in provider
    return {
      state: { ...initialState, jobs: createDemoJobs() },
      controls: {
        startScenario: () => {},
        play: () => {},
        pause: () => {},
        reset: () => {},
        setSpeed: () => {},
        triggerNewJob: () => {},
        moveContractor: () => {},
        sendMessage: () => {},
        updateJobStatus: () => {},
        triggerAlert: () => {},
      },
    }
  }
  return context
}

// Helper functions
function getScenarioSteps(scenario: DemoScenario): number {
  switch (scenario) {
    case 'full_journey': return 6
    case 'live_tracking': return 10
    case 'messaging': return 6
    case 'new_job_alert': return 2
    case 'multi_job': return 1
    default: return 1
  }
}

function getStatusLabel(status: JobStatus): string {
  const labels: Record<JobStatus, string> = {
    pending: 'Awaiting Assignment',
    accepted: 'Job Accepted',
    en_route: 'Contractor En Route',
    on_site: 'Contractor On Site',
    in_progress: 'Work In Progress',
    completed: 'Job Completed',
    cancelled: 'Job Cancelled',
  }
  return labels[status] || status
}

// Scenario runners
function runFullJourneyScenario(
  elapsed: number,
  state: DemoState,
  setState: React.Dispatch<React.SetStateAction<DemoState>>,
  playSound: () => void
) {
  // Prevent re-running same step
  const step = state.currentStep

  if (elapsed >= 0 && elapsed < 5 && step < 1) {
    // New job appears
    playSound()
    setState(prev => ({
      ...prev,
      currentStep: 1,
      stepLabel: 'New Job Request',
      activeJob: { ...prev.jobs[0], status: 'pending' },
    }))
  } else if (elapsed >= 5 && elapsed < 10 && step < 2) {
    // Contractor accepts
    setState(prev => ({
      ...prev,
      currentStep: 2,
      stepLabel: 'Contractor Accepted',
      activeJob: prev.activeJob ? {
        ...prev.activeJob,
        status: 'accepted',
        contractor: demoContractors[0],
        acceptedAt: new Date(),
      } : null,
    }))
  } else if (elapsed >= 10 && elapsed < 50 && step < 3) {
    // En route
    setState(prev => ({
      ...prev,
      currentStep: 3,
      stepLabel: 'Contractor En Route',
      activeJob: prev.activeJob ? { ...prev.activeJob, status: 'en_route' } : null,
      contractorLocation: demoRoute[0],
      currentEta: 18,
      trafficCondition: 'clear',
    }))
  } else if (elapsed >= 10 && elapsed < 50) {
    // Update location during en_route
    const progress = (elapsed - 10) / 40
    const routeIndex = Math.min(Math.floor(progress * demoRoute.length), demoRoute.length - 1)
    setState(prev => ({
      ...prev,
      contractorLocation: demoRoute[routeIndex],
      routeProgress: progress,
      currentEta: Math.max(0, Math.round((1 - progress) * 18)),
      trafficCondition: progress < 0.3 ? 'clear' : progress < 0.7 ? 'moderate' : 'clear',
    }))
  } else if (elapsed >= 50 && elapsed < 55 && step < 4) {
    // On site
    setState(prev => ({
      ...prev,
      currentStep: 4,
      stepLabel: 'Contractor On Site',
      activeJob: prev.activeJob ? { ...prev.activeJob, status: 'on_site' } : null,
      contractorLocation: demoRoute[demoRoute.length - 1],
      currentEta: 0,
      trafficCondition: null,
    }))
  } else if (elapsed >= 55 && elapsed < 80 && step < 5) {
    // In progress
    setState(prev => ({
      ...prev,
      currentStep: 5,
      stepLabel: 'Work In Progress',
      activeJob: prev.activeJob ? { ...prev.activeJob, status: 'in_progress' } : null,
    }))
  } else if (elapsed >= 80 && step < 6) {
    // Completed
    playSound()
    setState(prev => ({
      ...prev,
      currentStep: 6,
      stepLabel: 'Job Completed',
      activeJob: prev.activeJob ? {
        ...prev.activeJob,
        status: 'completed',
        completedAt: new Date(),
      } : null,
      isPlaying: false,
    }))
  }
}

function runLiveTrackingScenario(
  elapsed: number,
  state: DemoState,
  setState: React.Dispatch<React.SetStateAction<DemoState>>
) {
  if (elapsed > 60) {
    setState(prev => ({ ...prev, isPlaying: false }))
    return
  }

  const progress = elapsed / 60
  const routeIndex = Math.min(Math.floor(progress * demoRoute.length), demoRoute.length - 1)
  const step = Math.min(Math.floor(progress * 10) + 1, 10)

  setState(prev => ({
    ...prev,
    currentStep: step,
    stepLabel: `Location Update ${step}/10`,
    contractorLocation: demoRoute[routeIndex],
    routeProgress: progress,
    currentEta: Math.max(0, Math.round((1 - progress) * 12)),
    trafficCondition: progress < 0.25 ? 'clear' : progress < 0.5 ? 'moderate' : progress < 0.75 ? 'heavy' : 'clear',
    activeJob: prev.activeJob ? { ...prev.activeJob, status: 'en_route' } : null,
  }))
}

function runMessagingScenario(
  elapsed: number,
  state: DemoState,
  setState: React.Dispatch<React.SetStateAction<DemoState>>
) {
  const messages = [
    { time: 0, content: "Hi, what's your ETA?", sender: 'client' as const },
    { time: 3, content: "About 15 minutes away. Traffic is light today.", sender: 'contractor' as const },
    { time: 8, content: "Great, I'll open the front gate for you.", sender: 'client' as const },
    { time: 12, content: "Perfect, see you soon!", sender: 'contractor' as const },
    { time: 18, content: "I've arrived, at the front door.", sender: 'contractor' as const },
    { time: 25, content: "Coming now!", sender: 'client' as const },
  ]

  const currentMessages = messages.filter(m => m.time <= elapsed)
  const step = currentMessages.length

  if (step !== state.currentStep && step <= messages.length) {
    const newMessages: DemoMessage[] = currentMessages.map((m, i) => ({
      id: `demo-msg-${i}`,
      jobId: state.activeJob?.id || 'demo-job-1',
      senderId: m.sender === 'client' ? 'demo-client-1' : 'demo-contractor-1',
      senderType: m.sender,
      content: m.content,
      isRead: true,
      createdAt: new Date(Date.now() - (elapsed - m.time) * 1000).toISOString(),
    }))

    setState(prev => ({
      ...prev,
      currentStep: step,
      stepLabel: `Message ${step}/${messages.length}`,
      messages: newMessages,
    }))
  }

  if (elapsed >= 30) {
    setState(prev => ({ ...prev, isPlaying: false }))
  }
}

function runNewJobAlertScenario(
  elapsed: number,
  state: DemoState,
  setState: React.Dispatch<React.SetStateAction<DemoState>>,
  playSound: () => void
) {
  if (elapsed >= 0 && elapsed < 1 && state.currentStep < 1) {
    playSound()
    setState(prev => ({
      ...prev,
      currentStep: 1,
      stepLabel: 'New Job Alert!',
    }))
  } else if (elapsed >= 10) {
    setState(prev => ({
      ...prev,
      currentStep: 2,
      stepLabel: 'Alert Complete',
      isPlaying: false,
    }))
  }
}

export { DemoContext }
