'use client'

import { useState } from 'react'
import { useParams, useRouter } from 'next/navigation'
import useSWR from 'swr'
import {
  ArrowLeft,
  Users,
  MessageSquare,
  TrendingUp,
  Plus,
  Check,
  X,
  Clock,
  Eye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import Link from 'next/link'

const fetcher = (url: string) => fetch(url).then((res) => res.json())

interface ProgramDetails {
  program: {
    id: string
    name: string
    description: string | null
    featureArea: string
    startDate: string
    endDate: string
    isActive: boolean
    maxParticipants: number
    enrollments: {
      id: string
      status: string
      tierOverride: string | null
      invitedAt: string
      acceptedAt: string | null
      contractor: {
        id: string
        businessName: string
        user: {
          name: string
          email: string
        }
      }
    }[]
    feedback: {
      id: string
      category: string
      title: string
      description: string
      priority: string | null
      status: string
      isReviewed: boolean
      createdAt: string
      contractorId: string
    }[]
    npsSurveys: {
      id: string
      score: number
      followUpAnswer: string | null
      createdAt: string
      contractorId: string
    }[]
    stats: {
      activeParticipants: number
      invitedParticipants: number
      totalFeedback: number
      unreviewedFeedback: number
      nps: {
        score: number | null
        promoters: number
        passives: number
        detractors: number
        total: number
      }
      feedbackByCategory: Record<string, number>
      feedbackByStatus: Record<string, number>
    }
  }
}

export default function AdminBetaProgramDetail() {
  const params = useParams()
  const router = useRouter()
  const programId = params.id as string

  const [isInviteOpen, setIsInviteOpen] = useState(false)
  const [isInviting, setIsInviting] = useState(false)
  const [inviteError, setInviteError] = useState<string | null>(null)
  const [selectedContractorId, setSelectedContractorId] = useState('')
  const [tierOverride, setTierOverride] = useState('PRO')
  const [adminNotes, setAdminNotes] = useState('')

  const [selectedFeedback, setSelectedFeedback] = useState<string | null>(null)
  const [feedbackResponse, setFeedbackResponse] = useState('')
  const [isUpdatingFeedback, setIsUpdatingFeedback] = useState(false)

  const { data, error, isLoading, mutate } = useSWR<ProgramDetails>(
    `/api/admin/beta/programs/${programId}`,
    fetcher
  )

  const { data: contractorsData } = useSWR<{
    contractors: { id: string; businessName: string; user: { name: string; email: string } }[]
  }>('/api/admin/contractors', fetcher)

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="animate-pulse space-y-4">
          <div className="h-8 w-48 bg-muted rounded" />
          <div className="h-4 w-96 bg-muted rounded" />
        </div>
      </div>
    )
  }

  if (error || !data) {
    return (
      <div className="p-6">
        <div className="text-center py-12">
          <p className="text-muted-foreground">Failed to load programme details</p>
          <Button onClick={() => router.back()} variant="outline" className="mt-4">
            Go Back
          </Button>
        </div>
      </div>
    )
  }

  const { program } = data
  const contractors = contractorsData?.contractors || []

  // Filter out already enrolled contractors
  const enrolledContractorIds = program.enrollments.map((e) => e.contractor.id)
  const availableContractors = contractors.filter(
    (c) => !enrolledContractorIds.includes(c.id)
  )

  const handleInvite = async () => {
    if (!selectedContractorId) {
      setInviteError('Please select a contractor')
      return
    }

    setInviteError(null)
    setIsInviting(true)

    try {
      const res = await fetch('/api/admin/beta/enrollments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          programId,
          contractorId: selectedContractorId,
          tierOverride,
          adminNotes: adminNotes || undefined,
          sendInvitationEmail: true,
        }),
      })

      if (!res.ok) {
        const data = await res.json()
        throw new Error(data.error || 'Failed to send invitation')
      }

      await mutate()
      setIsInviteOpen(false)
      resetInviteForm()
    } catch (err) {
      setInviteError(err instanceof Error ? err.message : 'Failed to send invitation')
    } finally {
      setIsInviting(false)
    }
  }

  const resetInviteForm = () => {
    setSelectedContractorId('')
    setTierOverride('PRO')
    setAdminNotes('')
    setInviteError(null)
  }

  const handleUpdateFeedback = async (feedbackId: string, updates: Record<string, unknown>) => {
    setIsUpdatingFeedback(true)
    try {
      const res = await fetch('/api/admin/beta/feedback', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: feedbackId, ...updates }),
      })

      if (!res.ok) {
        throw new Error('Failed to update feedback')
      }

      await mutate()
      setSelectedFeedback(null)
      setFeedbackResponse('')
    } catch (err) {
      console.error('Error updating feedback:', err)
    } finally {
      setIsUpdatingFeedback(false)
    }
  }

  const getNpsColor = (score: number | null) => {
    if (score === null) return 'text-gray-400'
    if (score >= 50) return 'text-green-600'
    if (score >= 0) return 'text-yellow-600'
    return 'text-red-600'
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'ACTIVE':
        return <Badge className="bg-green-100 text-green-700">Active</Badge>
      case 'INVITED':
        return <Badge className="bg-yellow-100 text-yellow-700">Invited</Badge>
      case 'COMPLETED':
        return <Badge className="bg-blue-100 text-blue-700">Completed</Badge>
      case 'WITHDRAWN':
        return <Badge variant="secondary">Withdrawn</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <div className="p-6 space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Link href="/dashboard/admin/beta">
          <Button variant="ghost" size="icon">
            <ArrowLeft className="h-4 w-4" />
          </Button>
        </Link>
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{program.name}</h1>
            {program.isActive ? (
              <Badge className="bg-green-100 text-green-700">Active</Badge>
            ) : (
              <Badge variant="secondary">Archived</Badge>
            )}
          </div>
          <p className="text-muted-foreground">
            {program.featureArea} &middot;{' '}
            {new Date(program.startDate).toLocaleDateString('en-AU')} -{' '}
            {new Date(program.endDate).toLocaleDateString('en-AU')}
          </p>
        </div>
        <Button onClick={() => setIsInviteOpen(true)} className="gap-2">
          <Plus className="h-4 w-4" />
          Invite Participant
        </Button>
      </div>

      {/* Stats Overview */}
      <div className="grid gap-4 md:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Participants</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {program.stats.activeParticipants}/{program.maxParticipants}
            </div>
            <p className="text-xs text-muted-foreground">
              {program.stats.invitedParticipants} pending
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NPS Score</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className={cn('text-2xl font-bold', getNpsColor(program.stats.nps.score))}>
              {program.stats.nps.score !== null ? program.stats.nps.score : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground">
              {program.stats.nps.total} responses
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Feedback</CardTitle>
            <MessageSquare className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{program.stats.totalFeedback}</div>
            <p className="text-xs text-muted-foreground">
              {program.stats.unreviewedFeedback} unreviewed
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">NPS Breakdown</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-2 text-sm">
              <span className="text-green-600">{program.stats.nps.promoters} promoters</span>
              <span className="text-yellow-600">{program.stats.nps.passives} passive</span>
              <span className="text-red-600">{program.stats.nps.detractors} detractors</span>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs */}
      <Tabs defaultValue="participants">
        <TabsList>
          <TabsTrigger value="participants">
            Participants ({program.enrollments.length})
          </TabsTrigger>
          <TabsTrigger value="feedback">
            Feedback ({program.feedback.length})
          </TabsTrigger>
          <TabsTrigger value="nps">
            NPS Surveys ({program.npsSurveys.length})
          </TabsTrigger>
        </TabsList>

        {/* Participants Tab */}
        <TabsContent value="participants">
          <Card>
            <CardHeader>
              <CardTitle>Enrolled Participants</CardTitle>
              <CardDescription>
                Contractors enrolled in this beta programme
              </CardDescription>
            </CardHeader>
            <CardContent>
              {program.enrollments.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No participants yet. Invite contractors to join.
                </div>
              ) : (
                <div className="space-y-3">
                  {program.enrollments.map((enrollment) => (
                    <div
                      key={enrollment.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">
                            {enrollment.contractor.businessName}
                          </span>
                          {getStatusBadge(enrollment.status)}
                          {enrollment.tierOverride && (
                            <Badge variant="outline">{enrollment.tierOverride}</Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {enrollment.contractor.user.name} &middot;{' '}
                          {enrollment.contractor.user.email}
                        </p>
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {enrollment.status === 'ACTIVE' && enrollment.acceptedAt
                          ? `Joined ${new Date(enrollment.acceptedAt).toLocaleDateString('en-AU')}`
                          : `Invited ${new Date(enrollment.invitedAt).toLocaleDateString('en-AU')}`}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Feedback Tab */}
        <TabsContent value="feedback">
          <Card>
            <CardHeader>
              <CardTitle>Feedback</CardTitle>
              <CardDescription>
                Bug reports, feature requests, and general feedback
              </CardDescription>
            </CardHeader>
            <CardContent>
              {program.feedback.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No feedback submitted yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {program.feedback.map((feedback) => (
                    <div
                      key={feedback.id}
                      className="p-4 rounded-lg border space-y-2"
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <span className="font-medium">{feedback.title}</span>
                          {!feedback.isReviewed && (
                            <Badge className="bg-orange-100 text-orange-700">New</Badge>
                          )}
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant="outline">
                            {feedback.category.replace('_', ' ')}
                          </Badge>
                          {feedback.priority && (
                            <Badge
                              variant="outline"
                              className={cn(
                                feedback.priority === 'critical' && 'border-red-500 text-red-500',
                                feedback.priority === 'high' && 'border-orange-500 text-orange-500'
                              )}
                            >
                              {feedback.priority}
                            </Badge>
                          )}
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground line-clamp-2">
                        {feedback.description}
                      </p>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>
                          {new Date(feedback.createdAt).toLocaleDateString('en-AU')}
                        </span>
                        <div className="flex items-center gap-2">
                          {!feedback.isReviewed && (
                            <Button
                              size="sm"
                              variant="outline"
                              onClick={() => handleUpdateFeedback(feedback.id, { isReviewed: true })}
                              disabled={isUpdatingFeedback}
                            >
                              <Check className="h-3 w-3 mr-1" />
                              Mark Reviewed
                            </Button>
                          )}
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => setSelectedFeedback(feedback.id)}
                          >
                            <Eye className="h-3 w-3 mr-1" />
                            Details
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* NPS Tab */}
        <TabsContent value="nps">
          <Card>
            <CardHeader>
              <CardTitle>NPS Survey Responses</CardTitle>
              <CardDescription>
                Net Promoter Score survey responses from participants
              </CardDescription>
            </CardHeader>
            <CardContent>
              {program.npsSurveys.length === 0 ? (
                <div className="py-8 text-center text-muted-foreground">
                  No NPS surveys submitted yet.
                </div>
              ) : (
                <div className="space-y-3">
                  {program.npsSurveys.map((survey) => (
                    <div
                      key={survey.id}
                      className="flex items-center justify-between p-4 rounded-lg border"
                    >
                      <div className="flex items-center gap-4">
                        <div
                          className={cn(
                            'w-10 h-10 rounded-lg flex items-center justify-center font-bold',
                            survey.score >= 9 && 'bg-green-100 text-green-700',
                            survey.score >= 7 && survey.score <= 8 && 'bg-yellow-100 text-yellow-700',
                            survey.score <= 6 && 'bg-red-100 text-red-700'
                          )}
                        >
                          {survey.score}
                        </div>
                        <div>
                          <p className="font-medium">
                            {survey.score >= 9 ? 'Promoter' : survey.score >= 7 ? 'Passive' : 'Detractor'}
                          </p>
                          {survey.followUpAnswer && (
                            <p className="text-sm text-muted-foreground line-clamp-1">
                              &ldquo;{survey.followUpAnswer}&rdquo;
                            </p>
                          )}
                        </div>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        {new Date(survey.createdAt).toLocaleDateString('en-AU')}
                      </span>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Invite Dialog */}
      <Dialog open={isInviteOpen} onOpenChange={setIsInviteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Invite Participant</DialogTitle>
            <DialogDescription>
              Invite a contractor to join this beta programme
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label>Contractor</Label>
              <Select value={selectedContractorId} onValueChange={setSelectedContractorId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a contractor" />
                </SelectTrigger>
                <SelectContent>
                  {availableContractors.length === 0 ? (
                    <div className="p-2 text-sm text-muted-foreground">
                      All contractors already enrolled
                    </div>
                  ) : (
                    availableContractors.map((contractor) => (
                      <SelectItem key={contractor.id} value={contractor.id}>
                        {contractor.businessName} - {contractor.user.email}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label>Tier Override</Label>
              <Select value={tierOverride} onValueChange={setTierOverride}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="BASIC">Basic</SelectItem>
                  <SelectItem value="PRO">Pro</SelectItem>
                  <SelectItem value="ENTERPRISE">Enterprise</SelectItem>
                </SelectContent>
              </Select>
              <p className="text-xs text-muted-foreground">
                This tier will be granted during the beta period
              </p>
            </div>

            <div className="grid gap-2">
              <Label>Admin Notes (optional)</Label>
              <Textarea
                placeholder="Internal notes about this invitation..."
                value={adminNotes}
                onChange={(e) => setAdminNotes(e.target.value)}
                rows={2}
              />
            </div>

            {inviteError && (
              <p className="text-sm text-red-500">{inviteError}</p>
            )}
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsInviteOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInvite} disabled={isInviting}>
              {isInviting ? 'Sending...' : 'Send Invitation'}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
