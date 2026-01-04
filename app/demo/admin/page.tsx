'use client'

/**
 * Admin Demo View
 *
 * Shows the admin dashboard with multiple jobs
 * using demo data for tradeshow demonstrations.
 */

import { useEffect } from 'react'
import { useSearchParams } from 'next/navigation'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { useDemo, type DemoScenario, statusConfig, priorityConfig } from '@/lib/demo'
import { DemoControlPanel, DemoModeIndicator } from '@/components/demo'
import { ConnectionIndicator } from '@/components/realtime/ConnectionIndicator'
import { cn } from '@/lib/utils'
import {
  MapPin,
  Clock,
  Users,
  Briefcase,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  RefreshCw,
} from 'lucide-react'

export default function AdminDemoPage() {
  const searchParams = useSearchParams()
  const scenario = searchParams.get('scenario') as DemoScenario | null
  const { state, controls } = useDemo()

  // Auto-start multi-job scenario from URL param
  useEffect(() => {
    if (scenario && !state.currentScenario) {
      controls.startScenario(scenario)
    }
  }, [scenario, state.currentScenario, controls])

  const { jobs, contractors } = state

  // Calculate stats
  const pendingJobs = jobs.filter(j => j.status === 'pending').length
  const activeJobs = jobs.filter(j => ['accepted', 'en_route', 'on_site', 'in_progress'].includes(j.status)).length
  const completedJobs = jobs.filter(j => j.status === 'completed').length
  const emergencyJobs = jobs.filter(j => j.priority === 'emergency' && j.status !== 'completed').length

  // Contractor stats
  const activeContractors = contractors.filter(c =>
    jobs.some(j => j.contractor?.id === c.id && j.status !== 'completed')
  ).length
  const availableContractors = contractors.length - activeContractors

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900">
      <DemoModeIndicator position="top-left" />
      <DemoControlPanel position="bottom-right" />

      {/* Header */}
      <header className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              Admin Dashboard
            </h1>
            <p className="text-sm text-gray-500">
              Real-time job coordination overview
            </p>
          </div>
          <div className="flex items-center gap-4">
            <Button variant="outline" size="sm" onClick={controls.triggerNewJob} className="gap-2">
              <AlertTriangle className="w-4 h-4" />
              Simulate Emergency
            </Button>
            <ConnectionIndicator status="connected" showLabel size="sm" />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Stats Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-amber-100 dark:bg-amber-900/30 rounded-lg">
                  <Clock className="w-5 h-5 text-amber-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{pendingJobs}</p>
                  <p className="text-xs text-gray-500">Pending</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                  <RefreshCw className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{activeJobs}</p>
                  <p className="text-xs text-gray-500">Active</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-green-100 dark:bg-green-900/30 rounded-lg">
                  <CheckCircle className="w-5 h-5 text-green-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{completedJobs}</p>
                  <p className="text-xs text-gray-500">Completed</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className={cn(emergencyJobs > 0 && 'border-red-300 bg-red-50/50 dark:bg-red-900/20')}>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-red-100 dark:bg-red-900/30 rounded-lg">
                  <AlertTriangle className="w-5 h-5 text-red-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{emergencyJobs}</p>
                  <p className="text-xs text-gray-500">Emergency</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-teal-100 dark:bg-teal-900/30 rounded-lg">
                  <Users className="w-5 h-5 text-teal-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{activeContractors}</p>
                  <p className="text-xs text-gray-500">On Jobs</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="pt-4">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                  <Briefcase className="w-5 h-5 text-purple-600" />
                </div>
                <div>
                  <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">{availableContractors}</p>
                  <p className="text-xs text-gray-500">Available</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Active Jobs List */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-lg">Active Jobs</CardTitle>
                <Badge variant="outline">{jobs.length} total</Badge>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {jobs.length === 0 ? (
                    <div className="text-center py-8 text-gray-500">
                      No jobs yet. Click "Simulate Emergency" to add one.
                    </div>
                  ) : (
                    jobs.map(job => (
                      <div
                        key={job.id}
                        className={cn(
                          'p-4 rounded-lg border transition-all',
                          job.priority === 'emergency' && 'border-red-300 bg-red-50/50 dark:bg-red-900/20',
                          job.priority === 'urgent' && 'border-orange-300 bg-orange-50/50 dark:bg-orange-900/20',
                          job.priority === 'normal' && 'border-gray-200 bg-white dark:bg-gray-800 dark:border-gray-700'
                        )}
                      >
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <Badge className={priorityConfig[job.priority].color}>
                                {job.priority}
                              </Badge>
                              <Badge className={statusConfig[job.status].color}>
                                {statusConfig[job.status].label}
                              </Badge>
                            </div>
                            <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                              {job.serviceType}
                            </h3>
                            <div className="flex items-center gap-1 text-sm text-gray-500 mt-1">
                              <MapPin className="w-3 h-3" />
                              {job.client.address}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2 line-clamp-1">
                              {job.description}
                            </p>
                          </div>
                          <div className="text-right ml-4">
                            {job.contractor ? (
                              <div>
                                <p className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                  {job.contractor.businessName}
                                </p>
                                <p className="text-xs text-gray-500">
                                  {job.contractor.user.name}
                                </p>
                                {job.eta && job.status === 'en_route' && (
                                  <p className="text-sm text-teal-600 mt-1">
                                    ETA: {job.eta} min
                                  </p>
                                )}
                              </div>
                            ) : (
                              <Badge variant="outline" className="text-amber-600 border-amber-300">
                                Unassigned
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Contractors Panel */}
          <div>
            <Card>
              <CardHeader>
                <CardTitle className="text-lg">Contractors</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {contractors.map(contractor => {
                    const activeJob = jobs.find(
                      j => j.contractor?.id === contractor.id && j.status !== 'completed'
                    )
                    const isAvailable = !activeJob

                    return (
                      <div
                        key={contractor.id}
                        className={cn(
                          'p-3 rounded-lg border',
                          isAvailable
                            ? 'border-green-200 bg-green-50/50 dark:bg-green-900/20 dark:border-green-800'
                            : 'border-gray-200 bg-gray-50 dark:bg-gray-800 dark:border-gray-700'
                        )}
                      >
                        <div className="flex items-center gap-3">
                          <div className="h-10 w-10 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center text-lg">
                            👷
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center justify-between">
                              <h4 className="font-medium text-gray-900 dark:text-gray-100 text-sm">
                                {contractor.businessName}
                              </h4>
                              {isAvailable ? (
                                <Badge className="bg-green-100 text-green-700 text-xs">Available</Badge>
                              ) : (
                                <Badge className="bg-blue-100 text-blue-700 text-xs">On Job</Badge>
                              )}
                            </div>
                            <div className="flex items-center gap-3 mt-1">
                              <span className="text-xs text-gray-500">
                                ★ {contractor.rating}
                              </span>
                              <span className="text-xs text-gray-500">
                                {contractor.completedJobs} jobs
                              </span>
                            </div>
                            {activeJob && (
                              <p className="text-xs text-blue-600 mt-1 truncate">
                                {activeJob.serviceType}
                              </p>
                            )}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <Card className="mt-4">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="w-5 h-5" />
                  Today's Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Avg Response Time</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">4.2 min</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Avg Completion Time</span>
                    <span className="font-semibold text-gray-900 dark:text-gray-100">1.8 hrs</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100 dark:border-gray-800">
                    <span className="text-sm text-gray-600 dark:text-gray-400">Client Satisfaction</span>
                    <span className="font-semibold text-green-600">98%</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-sm text-gray-600 dark:text-gray-400">On-Time Arrival</span>
                    <span className="font-semibold text-green-600">95%</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
