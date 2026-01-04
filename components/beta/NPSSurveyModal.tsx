'use client'

import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Textarea } from '@/components/ui/textarea'
import { Label } from '@/components/ui/label'
import { useBetaEnrollment } from '@/hooks/useBetaEnrollment'
import { cn } from '@/lib/utils'

interface NPSSurveyModalProps {
  programId?: string
  trigger?: 'weekly' | 'feature_use' | 'manual'
  onComplete?: () => void
  autoShow?: boolean
}

export function NPSSurveyModal({
  programId,
  trigger = 'manual',
  onComplete,
  autoShow = false,
}: NPSSurveyModalProps) {
  const {
    isBetaUser,
    isNpsDue,
    npsProgramsDue,
    activeEnrollments,
    submitNps,
    isSubmitting,
    error,
  } = useBetaEnrollment()

  const [isOpen, setIsOpen] = useState(false)
  const [score, setScore] = useState<number | null>(null)
  const [followUp, setFollowUp] = useState('')
  const [step, setStep] = useState<'score' | 'followup' | 'success'>('score')
  const [submitError, setSubmitError] = useState<string | null>(null)

  // Auto-show if NPS is due
  useEffect(() => {
    if (autoShow && isBetaUser && isNpsDue && !isOpen) {
      setIsOpen(true)
    }
  }, [autoShow, isBetaUser, isNpsDue, isOpen])

  // Don't render if not a beta user
  if (!isBetaUser) {
    return null
  }

  // Find the target program
  const targetProgram = programId
    ? activeEnrollments.find((e) => e.program.id === programId)?.program
    : npsProgramsDue[0]?.program || activeEnrollments[0]?.program

  if (!targetProgram) {
    return null
  }

  const handleScoreSelect = (selectedScore: number) => {
    setScore(selectedScore)
    setStep('followup')
  }

  const handleSubmit = async () => {
    if (score === null) return

    setSubmitError(null)

    const success = await submitNps({
      programId: targetProgram.id,
      score,
      followUpAnswer: followUp.trim() || undefined,
      surveyTrigger: trigger,
    })

    if (success) {
      setStep('success')
      setTimeout(() => {
        setIsOpen(false)
        resetForm()
        onComplete?.()
      }, 2000)
    } else {
      setSubmitError(error || 'Failed to submit survey')
    }
  }

  const resetForm = () => {
    setScore(null)
    setFollowUp('')
    setStep('score')
    setSubmitError(null)
  }

  const handleOpenChange = (open: boolean) => {
    setIsOpen(open)
    if (!open) {
      resetForm()
    }
  }

  const getScoreLabel = (s: number) => {
    if (s <= 6) return 'Not likely'
    if (s <= 8) return 'Neutral'
    return 'Very likely'
  }

  const getFollowUpQuestion = () => {
    if (score === null) return ''
    if (score <= 6) {
      return 'We\'re sorry to hear that. What could we do better?'
    }
    if (score <= 8) {
      return 'Thanks for your feedback. What would make it a 10?'
    }
    return 'That\'s great to hear! What do you love most about it?'
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <span className="bg-orange-100 text-orange-600 text-xs font-medium px-2 py-0.5 rounded">
              BETA
            </span>
            Quick Survey
          </DialogTitle>
          <DialogDescription>
            {step === 'score'
              ? `How likely are you to recommend ${targetProgram.name} to a colleague?`
              : step === 'followup'
              ? getFollowUpQuestion()
              : 'Thank you for your feedback!'}
          </DialogDescription>
        </DialogHeader>

        <div className="py-4">
          {step === 'score' && (
            <div className="space-y-4">
              {/* NPS Scale */}
              <div className="flex justify-between gap-1">
                {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
                  <button
                    key={num}
                    onClick={() => handleScoreSelect(num)}
                    className={cn(
                      'w-10 h-10 rounded-lg text-sm font-medium transition-all',
                      'hover:scale-110 focus:outline-none focus:ring-2 focus:ring-orange-500',
                      num <= 6 && 'bg-red-100 hover:bg-red-200 text-red-700',
                      num >= 7 && num <= 8 && 'bg-yellow-100 hover:bg-yellow-200 text-yellow-700',
                      num >= 9 && 'bg-green-100 hover:bg-green-200 text-green-700'
                    )}
                  >
                    {num}
                  </button>
                ))}
              </div>

              {/* Scale labels */}
              <div className="flex justify-between text-xs text-muted-foreground">
                <span>Not at all likely</span>
                <span>Extremely likely</span>
              </div>
            </div>
          )}

          {step === 'followup' && (
            <div className="space-y-4">
              {/* Selected score display */}
              <div className="flex items-center gap-3">
                <div
                  className={cn(
                    'w-12 h-12 rounded-lg flex items-center justify-center text-lg font-bold',
                    score !== null && score <= 6 && 'bg-red-100 text-red-700',
                    score !== null && score >= 7 && score <= 8 && 'bg-yellow-100 text-yellow-700',
                    score !== null && score >= 9 && 'bg-green-100 text-green-700'
                  )}
                >
                  {score}
                </div>
                <div>
                  <p className="font-medium">{getScoreLabel(score!)}</p>
                  <button
                    onClick={() => setStep('score')}
                    className="text-sm text-orange-600 hover:underline"
                  >
                    Change score
                  </button>
                </div>
              </div>

              {/* Follow-up textarea */}
              <div className="space-y-2">
                <Label htmlFor="followup">Tell us more (optional)</Label>
                <Textarea
                  id="followup"
                  placeholder="Your feedback helps us improve..."
                  value={followUp}
                  onChange={(e) => setFollowUp(e.target.value)}
                  rows={3}
                />
              </div>

              {submitError && (
                <p className="text-sm text-red-500">{submitError}</p>
              )}
            </div>
          )}

          {step === 'success' && (
            <div className="py-8 text-center">
              <div className="text-green-500 text-4xl mb-2">&#10003;</div>
              <p className="text-lg font-medium">Thank you!</p>
              <p className="text-sm text-muted-foreground">
                Your feedback helps us improve.
              </p>
            </div>
          )}
        </div>

        {step === 'followup' && (
          <DialogFooter>
            <Button variant="outline" onClick={() => handleOpenChange(false)}>
              Skip
            </Button>
            <Button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="bg-orange-500 hover:bg-orange-600"
            >
              {isSubmitting ? 'Submitting...' : 'Submit'}
            </Button>
          </DialogFooter>
        )}
      </DialogContent>
    </Dialog>
  )
}

// Hook to manually trigger NPS survey
export function useNpsSurvey() {
  const [shouldShow, setShouldShow] = useState(false)

  const showSurvey = () => setShouldShow(true)
  const hideSurvey = () => setShouldShow(false)

  return {
    shouldShow,
    showSurvey,
    hideSurvey,
    NPSSurveyComponent: shouldShow ? (
      <NPSSurveyModal
        trigger="feature_use"
        onComplete={hideSurvey}
        autoShow={true}
      />
    ) : null,
  }
}
