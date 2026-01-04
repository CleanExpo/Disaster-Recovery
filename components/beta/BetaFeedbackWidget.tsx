'use client'

import { useState } from 'react'
import { MessageSquarePlus, Bug, Lightbulb, AlertCircle, MessageCircle } from 'lucide-react'
import { Button } from '@/components/ui/button'
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useBetaEnrollment } from '@/hooks/useBetaEnrollment'
import { cn } from '@/lib/utils'

type FeedbackCategory = 'BUG_REPORT' | 'FEATURE_REQUEST' | 'USABILITY_ISSUE' | 'GENERAL_FEEDBACK'
type Priority = 'low' | 'medium' | 'high' | 'critical'

interface BetaFeedbackWidgetProps {
  programId?: string
  className?: string
}

const categoryIcons = {
  BUG_REPORT: Bug,
  FEATURE_REQUEST: Lightbulb,
  USABILITY_ISSUE: AlertCircle,
  GENERAL_FEEDBACK: MessageCircle,
}

const categoryLabels = {
  BUG_REPORT: 'Bug Report',
  FEATURE_REQUEST: 'Feature Request',
  USABILITY_ISSUE: 'Usability Issue',
  GENERAL_FEEDBACK: 'General Feedback',
}

export function BetaFeedbackWidget({ programId, className }: BetaFeedbackWidgetProps) {
  const { isBetaUser, activeEnrollments, submitFeedback, isSubmitting, error } = useBetaEnrollment()
  const [isOpen, setIsOpen] = useState(false)
  const [category, setCategory] = useState<FeedbackCategory>('GENERAL_FEEDBACK')
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [priority, setPriority] = useState<Priority>('medium')
  const [selectedProgramId, setSelectedProgramId] = useState(programId || '')
  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  // Only show widget for beta users
  if (!isBetaUser || activeEnrollments.length === 0) {
    return null
  }

  const handleSubmit = async () => {
    setSubmitError(null)
    setSubmitSuccess(false)

    const targetProgramId = selectedProgramId || activeEnrollments[0]?.program.id
    if (!targetProgramId) {
      setSubmitError('No beta program selected')
      return
    }

    if (!title.trim()) {
      setSubmitError('Title is required')
      return
    }

    if (!description.trim() || description.length < 10) {
      setSubmitError('Description must be at least 10 characters')
      return
    }

    const success = await submitFeedback({
      programId: targetProgramId,
      category,
      title: title.trim(),
      description: description.trim(),
      priority,
    })

    if (success) {
      setSubmitSuccess(true)
      setTimeout(() => {
        setIsOpen(false)
        resetForm()
      }, 1500)
    } else {
      setSubmitError(error || 'Failed to submit feedback')
    }
  }

  const resetForm = () => {
    setCategory('GENERAL_FEEDBACK')
    setTitle('')
    setDescription('')
    setPriority('medium')
    setSubmitError(null)
    setSubmitSuccess(false)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      resetForm()
    }
  }

  const CategoryIcon = categoryIcons[category]

  return (
    <>
      {/* Floating button */}
      <Button
        onClick={() => setIsOpen(true)}
        className={cn(
          'fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50',
          'bg-orange-500 hover:bg-orange-600 text-white',
          className
        )}
        size="icon"
        aria-label="Submit beta feedback"
      >
        <MessageSquarePlus className="h-6 w-6" />
      </Button>

      {/* Feedback modal */}
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-0.5 rounded">
                BETA
              </span>
              Submit Feedback
            </DialogTitle>
            <DialogDescription>
              Help us improve by sharing your feedback. We read every submission.
            </DialogDescription>
          </DialogHeader>

          {submitSuccess ? (
            <div className="py-8 text-center">
              <div className="text-green-500 text-4xl mb-2">&#10003;</div>
              <p className="text-lg font-medium">Thank you for your feedback!</p>
              <p className="text-sm text-muted-foreground">We&apos;ll review it shortly.</p>
            </div>
          ) : (
            <div className="grid gap-4 py-4">
              {/* Program selection (if multiple) */}
              {activeEnrollments.length > 1 && !programId && (
                <div className="grid gap-2">
                  <Label htmlFor="program">Beta Programme</Label>
                  <Select value={selectedProgramId} onValueChange={setSelectedProgramId}>
                    <SelectTrigger>
                      <SelectValue placeholder="Select programme" />
                    </SelectTrigger>
                    <SelectContent>
                      {activeEnrollments.map((enrollment) => (
                        <SelectItem key={enrollment.program.id} value={enrollment.program.id}>
                          {enrollment.program.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Category selection */}
              <div className="grid gap-2">
                <Label>Category</Label>
                <div className="grid grid-cols-2 gap-2">
                  {(Object.keys(categoryLabels) as FeedbackCategory[]).map((cat) => {
                    const Icon = categoryIcons[cat]
                    return (
                      <Button
                        key={cat}
                        type="button"
                        variant={category === cat ? 'default' : 'outline'}
                        className={cn(
                          'h-auto py-3 justify-start gap-2',
                          category === cat && 'bg-orange-500 hover:bg-orange-600'
                        )}
                        onClick={() => setCategory(cat)}
                      >
                        <Icon className="h-4 w-4" />
                        <span className="text-sm">{categoryLabels[cat]}</span>
                      </Button>
                    )
                  })}
                </div>
              </div>

              {/* Title */}
              <div className="grid gap-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  placeholder="Brief summary of your feedback"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  maxLength={200}
                />
              </div>

              {/* Description */}
              <div className="grid gap-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  placeholder="Please describe in detail..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  rows={4}
                />
              </div>

              {/* Priority (only for bugs) */}
              {category === 'BUG_REPORT' && (
                <div className="grid gap-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select value={priority} onValueChange={(v) => setPriority(v as Priority)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="low">Low - Minor issue</SelectItem>
                      <SelectItem value="medium">Medium - Affects usability</SelectItem>
                      <SelectItem value="high">High - Major problem</SelectItem>
                      <SelectItem value="critical">Critical - Blocking issue</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Error message */}
              {submitError && (
                <p className="text-sm text-red-500">{submitError}</p>
              )}
            </div>
          )}

          {!submitSuccess && (
            <DialogFooter>
              <Button variant="outline" onClick={() => handleOpenChange(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {isSubmitting ? 'Submitting...' : 'Submit Feedback'}
              </Button>
            </DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    </>
  )
}
