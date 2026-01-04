'use client'

/**
 * Demo Landing Page
 *
 * Entry point for tradeshow booth demonstrations.
 * Allows operators to select a demo scenario and view.
 */

import { useState } from 'react'
import Link from 'next/link'
import { DemoProvider } from '@/lib/demo'
import { DemoModeIndicator } from '@/components/demo'
import {
  Play,
  Monitor,
  Users,
  LayoutGrid,
  Columns,
  Clock,
  MessageSquare,
  MapPin,
  Bell,
  ArrowRight,
} from 'lucide-react'

type ViewType = 'contractor' | 'client' | 'admin' | 'split'
type ScenarioType = 'full_journey' | 'live_tracking' | 'messaging' | 'new_job_alert' | 'multi_job'

const VIEWS = [
  {
    id: 'contractor' as ViewType,
    label: 'Contractor View',
    description: 'See how contractors receive and manage jobs',
    icon: Monitor,
    colour: 'teal',
  },
  {
    id: 'client' as ViewType,
    label: 'Client View',
    description: 'Experience the client tracking interface',
    icon: Users,
    colour: 'blue',
  },
  {
    id: 'admin' as ViewType,
    label: 'Admin Dashboard',
    description: 'Monitor all active jobs and contractors',
    icon: LayoutGrid,
    colour: 'purple',
  },
  {
    id: 'split' as ViewType,
    label: 'Split Screen',
    description: 'Contractor + Client side-by-side',
    icon: Columns,
    colour: 'orange',
  },
]

const SCENARIOS = [
  {
    id: 'full_journey' as ScenarioType,
    label: 'Full Journey',
    duration: '90 seconds',
    description: 'Complete job lifecycle from request to completion',
    icon: Clock,
    recommended: true,
  },
  {
    id: 'live_tracking' as ScenarioType,
    label: 'Live Tracking',
    duration: '60 seconds',
    description: 'Watch a contractor travel to the job site in real-time',
    icon: MapPin,
  },
  {
    id: 'messaging' as ScenarioType,
    label: 'Messaging Demo',
    duration: '30 seconds',
    description: 'Real-time chat between client and contractor',
    icon: MessageSquare,
  },
  {
    id: 'new_job_alert' as ScenarioType,
    label: 'New Job Alert',
    duration: '10 seconds',
    description: 'See the urgent job notification system',
    icon: Bell,
  },
]

export default function DemoLandingPage() {
  const [selectedView, setSelectedView] = useState<ViewType>('split')
  const [selectedScenario, setSelectedScenario] = useState<ScenarioType>('full_journey')

  const getDemoUrl = () => {
    const base = `/demo/${selectedView}`
    return `${base}?scenario=${selectedScenario}`
  }

  return (
    <DemoProvider enabled>
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
        <DemoModeIndicator position="top-right" showScenario={false} />

        {/* Header */}
        <header className="py-8 px-6">
          <div className="max-w-5xl mx-auto text-center">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-orange-500/20 border border-orange-500/30 rounded-full text-orange-400 text-sm font-medium mb-6">
              <span className="w-2 h-2 bg-orange-500 rounded-full animate-pulse" />
              RIA 2026 Demo Mode
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Real-Time Job Coordination
            </h1>
            <p className="text-xl text-gray-400 max-w-2xl mx-auto">
              Experience how NRPG connects clients with disaster recovery contractors in real-time.
            </p>
          </div>
        </header>

        <main className="max-w-5xl mx-auto px-6 pb-12">
          {/* View Selection */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Select View</h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {VIEWS.map(view => {
                const Icon = view.icon
                const isSelected = selectedView === view.id
                return (
                  <button
                    key={view.id}
                    onClick={() => setSelectedView(view.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all text-left ${
                      isSelected
                        ? `border-${view.colour}-500 bg-${view.colour}-500/10`
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                  >
                    {isSelected && (
                      <div className={`absolute top-2 right-2 w-2 h-2 bg-${view.colour}-500 rounded-full`} />
                    )}
                    <Icon className={`w-8 h-8 mb-3 ${isSelected ? `text-${view.colour}-400` : 'text-gray-500'}`} />
                    <h3 className={`font-semibold mb-1 ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                      {view.label}
                    </h3>
                    <p className="text-sm text-gray-500">{view.description}</p>
                  </button>
                )
              })}
            </div>
          </section>

          {/* Scenario Selection */}
          <section className="mb-12">
            <h2 className="text-lg font-semibold text-gray-300 mb-4">Select Scenario</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SCENARIOS.map(scenario => {
                const Icon = scenario.icon
                const isSelected = selectedScenario === scenario.id
                return (
                  <button
                    key={scenario.id}
                    onClick={() => setSelectedScenario(scenario.id)}
                    className={`relative p-4 rounded-xl border-2 transition-all text-left flex gap-4 ${
                      isSelected
                        ? 'border-orange-500 bg-orange-500/10'
                        : 'border-gray-700 bg-gray-800/50 hover:border-gray-600'
                    }`}
                  >
                    <div className={`flex-shrink-0 w-12 h-12 rounded-lg flex items-center justify-center ${
                      isSelected ? 'bg-orange-500/20' : 'bg-gray-700/50'
                    }`}>
                      <Icon className={`w-6 h-6 ${isSelected ? 'text-orange-400' : 'text-gray-500'}`} />
                    </div>
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <h3 className={`font-semibold ${isSelected ? 'text-white' : 'text-gray-300'}`}>
                          {scenario.label}
                        </h3>
                        {scenario.recommended && (
                          <span className="px-2 py-0.5 bg-teal-500/20 text-teal-400 text-xs font-medium rounded-full">
                            Recommended
                          </span>
                        )}
                      </div>
                      <p className="text-sm text-gray-500 mb-2">{scenario.description}</p>
                      <span className="text-xs text-orange-400">{scenario.duration}</span>
                    </div>
                    {isSelected && (
                      <div className="absolute top-3 right-3 w-3 h-3 bg-orange-500 rounded-full" />
                    )}
                  </button>
                )
              })}
            </div>
          </section>

          {/* Launch Button */}
          <section className="text-center">
            <Link
              href={getDemoUrl()}
              className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-semibold text-lg rounded-xl shadow-lg shadow-orange-500/25 transition-all hover:shadow-orange-500/40 hover:scale-105"
            >
              <Play className="w-6 h-6" />
              Launch Demo
              <ArrowRight className="w-5 h-5" />
            </Link>

            <p className="mt-6 text-sm text-gray-500">
              Press <kbd className="px-2 py-0.5 bg-gray-700 text-gray-300 rounded text-xs font-mono">?</kbd> during demo for keyboard shortcuts
            </p>
          </section>

          {/* Quick Launch Links */}
          <section className="mt-16 pt-8 border-t border-gray-800">
            <h2 className="text-lg font-semibold text-gray-300 mb-4 text-center">Quick Launch</h2>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/demo/split?scenario=full_journey"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colours"
              >
                Split Screen + Full Journey
              </Link>
              <Link
                href="/demo/contractor?scenario=live_tracking"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colours"
              >
                Contractor + Live Tracking
              </Link>
              <Link
                href="/demo/client?scenario=messaging"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colours"
              >
                Client + Messaging
              </Link>
              <Link
                href="/demo/admin?scenario=multi_job"
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm transition-colours"
              >
                Admin Dashboard
              </Link>
            </div>
          </section>
        </main>

        {/* Footer */}
        <footer className="py-6 text-center text-gray-600 text-sm">
          <p>NRPG - Australia's #1 Disaster Recovery Network</p>
        </footer>
      </div>
    </DemoProvider>
  )
}
