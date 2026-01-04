'use client'

import { useState } from 'react'
import useSWR from 'swr'
import Link from 'next/link'
import {
  Users,
  MessageSquare,
  TrendingUp,
  Plus,
  ChevronRight,
  Calendar,
  Target,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface BetaProgram {
  id: string
  name: string
  description: string | null
  featureArea: string
  startDate: string
  endDate: string
  isActive: boolean
  maxParticipants: number
  createdAt: string
  stats: {
    totalEnrollments: number
    activeParticipants: number
    totalFeedback: number
    totalNpsSurveys: number
  }
}

interface AnalyticsData {
  overview: {
    activePrograms: number
    totalParticipants: number
    pendingInvitations: number
    totalFeedback: number
    unreviewedFeedback: number
  }
  nps: {
    overall: number | null
    promoters: number
    passives: number
    detractors: number
    totalResponses: number
  }
  feedback: {
    total: number
    unreviewed: number
    byCategory: Record<string, number>
  }
  recentFeedback: {
    id: string
    title: string
    category: string
    priority: string | null
    status: string
    isReviewed: boolean
    createdAt: string
  }[]
}

export default function AdminBetaDashboard() {
  const [isCreateOpen, setIsCreateOpen] = useState(false)
  const [isCreating, setIsCreating] = useState(false)
  const [createError, setCreateError] = useState<string | null>(null)

  // Form state
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [featureArea, setFeatureArea] = useState('realtime_coordination')
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  const [maxParticipants, setMaxParticipants] = useState('10')

  const { data: programsData, error: programsError, mutate: mutatePrograms } = useSWR<{
    programs: BetaProgram[]
  }>('/api/admin/beta/programs', fetcher)

  const { data: analyticsData, error: analyticsError } = useSWR<AnalyticsData>(
    '/api/admin/beta/analytics',
    fetcher
  )

  const isLoading = !programsData && !programsError
  const programs = programsData?.programs || []
  const analytics = analyticsData

  const handleCreateProgram = async () => {
    setCreateError(null)
    setIsCreating(true)

    try {
      const res = await fetch('/api/admin/beta/programs', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          description,
          featureArea,
          startDate,
          endDate,
          maxParticipants: parseInt(maxParticipants, 10),
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to create programme')
      }

      await mutatePrograms()
      setIsCreateOpen(false)
      resetForm()
    } catch (err) {
      setCreateError(err instanceof Error ? err.message : 'Failed to create programme')
    } finally {
      setIsCreating(false)
    }
  }

  const resetForm = () => {
    setName('')
    setDescription('')
    setFeatureArea('realtime_coordination')
    setStartDate('')
    setEndDate('')
    setMaxParticipants('10')
    setCreateError(null)
  }

  const getNpsColor = (score: number | null) => {
    if (score === null) return 'text-gray-400'
    if (score >= 50) return 'text-green-600'
    if (score >= 0) return 'text-yellow-600'
    return 'text-red-600'
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold">Beta Programmes</h1>
          <p className="text-muted-foreground">
            Manage beta testing programmes and track participant feedback
          </p>
        </div>
        <Button onClick={() => setIsCreateOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          New Programme
        </Button>
      </div>

      {/* Overview Stats */}
      {analytics && (
        <div className="grid gap-4 md:grid-cols-4">
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Participants</CardTitle>
              <Users className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.overview.totalParticipants}</div>
              <p className="text-xs text-muted-foreground">
                {analytics.overview.pendingInvitations} pending invitations
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">NPS Score</CardTitle>
              <TrendingUp className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className={cn('text-2xl font-bold', getNpsColor(analytics.nps.overall))}>
                {analytics.nps.overall !== null ? analytics.nps.overall : 'N/A'}
              </div>
              <p className="text-xs text-muted-foreground">
                {analytics.nps.totalResponses} responses
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Feedback</CardTitle>
              <MessageSquare className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.overview.totalFeedback}</div>
              <p className="text-xs text-muted-foreground">
                {analytics.overview.unreviewedFeedback} unreviewed
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Active Programmes</CardTitle>
              <Target className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{analytics.overview.activePrograms}</div>
              <p className="text-xs text-muted-foreground">
                {programs.filter((p) => !p.isActive).length} archived
              </p>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Programs List */}
      <Card>
        <CardHeader>
          <CardTitle>Programmes</CardTitle>
          <CardDescription>Click a programme to view details and manage participants</CardDescription>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className="py-8 text-center text-muted-foreground">Loading...</div>
          ) : programs.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No beta programmes yet. Create one to get started.
            </div>
          ) : (
            <div className="space-y-3">
              {programs.map((program) => (
                <Link
                  key={program.id}
                  href={`/dashboard/admin/beta/${program.id}`}
                  className="flex items-center justify-between p-4 rounded-lg border hover:bg-muted/50 transition-colours"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium truncate">{program.name}</h3>
                      {program.isActive ? (
                        <Badge className="bg-green-100 text-green-700 hover:bg-green-100">
                          Active
                        </Badge>
                      ) : (
                        <Badge variant="secondary">Archived</Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                      <span className="flex items-center gap-1">
                        <Users className="h-3 w-3" />
                        {program.stats.activeParticipants}/{program.maxParticipants}
                      </span>
                      <span className="flex items-center gap-1">
                        <MessageSquare className="h-3 w-3" />
                        {program.stats.totalFeedback}
                      </span>
                      <span className="flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {new Date(program.endDate).toLocaleDateString('en-AU')}
                      </span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-muted-foreground" />
                </Link>
              ))}
            </div>
          )}
        </CardContent>
      </Card>

      {/* Recent Feedback */}
      {analytics && analytics.recentFeedback.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle>Recent Feedback</CardTitle>
            <CardDescription>Latest feedback from beta participants</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {analytics.recentFeedback.slice(0, 5).map((feedback) => (
                <div
                  key={feedback.id}
                  className="flex items-center justify-between p-3 rounded-lg border"
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-medium truncate">{feedback.title}</span>
                      {!feedback.isReviewed && (
                        <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-100">
                          New
                        </Badge>
                      )}
                    </div>
                    <div className="flex items-center gap-2 mt-1">
                      <Badge variant="outline" className="text-xs">
                        {feedback.category.replace('_', ' ')}
                      </Badge>
                      {feedback.priority && (
                        <Badge
                          variant="outline"
                          className={cn(
                            'text-xs',
                            feedback.priority === 'critical' && 'border-red-500 text-red-500',
                            feedback.priority === 'high' && 'border-orange-500 text-orange-500'
                          )}
                        >
                          {feedback.priority}
                        </Badge>
                      )}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(feedback.createdAt).toLocaleDateString('en-AU')}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      {/* Create Program Dialog */}
      <Dialog open={isCreateOpen} onOpenChange={setIsCreateOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Create Beta Programme</DialogTitle>
            <DialogDescription>
              Set up a new beta testing programme for a feature.
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Programme Name</Label>
              <Input
                id="name"
                placeholder="e.g., Real-Time Coordination Beta"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                placeholder="Brief description of what's being tested..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={2}
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="featureArea">Feature Area</Label>
              <Input
                id="featureArea"
                placeholder="e.g., realtime_coordination"
                value={featureArea}
                onChange={(e) => setFeatureArea(e.target.value)}
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="grid gap-2">
                <Label htmlFor="startDate">Start Date</Label>
                <Input
                  id="startDate"
                  type="date"
                  value={startDate}
                  onChange={(e) => setStartDate(e.target.value)}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="endDate">End Date</Label>
                <Input
                  id="endDate"
                  type="date"
                  value={endDate}
                  onChange={(e) => setEndDate(e.target.value)}
                />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="maxParticipants">Max Participants</Label>
              <Input
                id="maxParticipants"
                type="number"
                min="1"
                max="100"
                value={maxParticipants}
                onChange={(e) => setMaxParticipants(e.target.value)}
              />
            </div>

            {createError && (
              <p className="text-sm text-red-500">{createError}</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsCreateOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleCreateProgram} disabled={isCreating}>
              {isCreating ? 'Creating...' : 'Create Programme'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
