'use client'

import { useState } from 'react'
import { X, Sparkles, CheckCircle2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { useBetaEnrollment } from '@/hooks/useBetaEnrollment'
import { cn } from '@/lib/utils'

interface BetaInfoBannerProps {
  className?: string
  dismissible?: boolean
  variant?: 'info' | 'invitation'
}

export function BetaInfoBanner({
  className,
  dismissible = true,
  variant = 'info',
}: BetaInfoBannerProps) {
  const {
    isBetaUser,
    hasPendingInvitation,
    activeEnrollments,
    pendingInvitations,
    tierOverride,
    acceptInvitation,
    declineInvitation,
    isSubmitting,
  } = useBetaEnrollment()

  const [isDismissed, setIsDismissed] = useState(false)
  const [processingId, setProcessingId] = useState<string | null>(null)

  // Don't show if dismissed
  if (isDismissed) {
    return null
  }

  // Show invitation banner if there are pending invitations
  if (hasPendingInvitation && pendingInvitations.length > 0 && variant === 'invitation') {
    const invitation = pendingInvitations[0]

    const handleAccept = async () => {
      setProcessingId(invitation.id)
      await acceptInvitation(invitation.id)
      setProcessingId(null)
    }

    const handleDecline = async () => {
      setProcessingId(invitation.id)
      await declineInvitation(invitation.id)
      setProcessingId(null)
    }

    return (
      <div
        className={cn(
          'relative rounded-lg border-2 border-orange-200 bg-gradient-to-r from-orange-50 to-amber-50 p-4',
          className
        )}
      >
        <div className="flex items-start gap-4">
          <div className="flex-shrink-0">
            <div className="h-10 w-10 rounded-full bg-orange-100 flex items-center justify-center">
              <Sparkles className="h-5 w-5 text-orange-600" />
            </div>
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="text-sm font-semibold text-gray-900">
              You&apos;re invited to the beta programme!
            </h3>
            <p className="mt-1 text-sm text-gray-600">
              You&apos;ve been invited to join the <strong>{invitation.program.name}</strong> beta.
              {invitation.tierOverride && (
                <> You&apos;ll get <strong>{invitation.tierOverride}</strong> tier access during the beta period.</>
              )}
            </p>
            {invitation.program.description && (
              <p className="mt-2 text-xs text-gray-500">
                {invitation.program.description}
              </p>
            )}

            <div className="mt-3 flex items-center gap-2">
              <Button
                size="sm"
                onClick={handleAccept}
                disabled={isSubmitting && processingId === invitation.id}
                className="bg-orange-500 hover:bg-orange-600"
              >
                {isSubmitting && processingId === invitation.id ? 'Joining...' : 'Join Beta'}
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={handleDecline}
                disabled={isSubmitting && processingId === invitation.id}
              >
                Decline
              </Button>
            </div>
          </div>

          {dismissible && (
            <button
              onClick={() => setIsDismissed(true)}
              className="flex-shrink-0 text-gray-400 hover:text-gray-500"
            >
              <X className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>
    )
  }

  // Show info banner for active beta users
  if (!isBetaUser || activeEnrollments.length === 0) {
    return null
  }

  const activeProgram = activeEnrollments[0]

  return (
    <div
      className={cn(
        'relative rounded-lg bg-gradient-to-r from-orange-500 to-orange-600 p-4 text-white',
        className
      )}
    >
      <div className="flex items-center gap-4">
        <div className="flex-shrink-0">
          <div className="h-10 w-10 rounded-full bg-white/20 flex items-center justify-center">
            <CheckCircle2 className="h-5 w-5 text-white" />
          </div>
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2">
            <h3 className="text-sm font-semibold">Beta Tester</h3>
            <span className="bg-white/20 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">
              {activeProgram.program.name}
            </span>
          </div>
          <p className="mt-0.5 text-sm text-white/80">
            You have {tierOverride || 'beta'} access to real-time features.
            Your feedback helps shape the product!
          </p>
        </div>

        {dismissible && (
          <button
            onClick={() => setIsDismissed(true)}
            className="flex-shrink-0 text-white/60 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  )
}
