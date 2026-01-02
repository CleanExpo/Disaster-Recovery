'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  CheckCircle2,
  AlertTriangle,
  ArrowRight,
  Loader2,
  XCircle,
  Circle,
  Lock,
} from 'lucide-react';

interface EligibilityCheck {
  requirement: string;
  status: 'complete' | 'incomplete' | 'optional';
  label: string;
  description: string;
  actionUrl?: string;
  actionText?: string;
}

interface EligibilityData {
  canCreateRequests: boolean;
  isOnboardingComplete: boolean;
  completionPercentage: number;
  checks: EligibilityCheck[];
  incompleteRequirements: string[];
  message: string;
  nextAction?: {
    requirement: string;
    label: string;
    url: string;
    buttonText: string;
  };
  tier: string;
  progressivePhasesUnlocked: boolean;
}

export function ClientEligibilityBanner() {
  const [loading, setLoading] = useState(true);
  const [eligibility, setEligibility] = useState<EligibilityData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEligibility();
  }, []);

  const fetchEligibility = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/client/eligibility', { cache: 'no-store' });

      if (response.ok) {
        const data = await response.json();
        setEligibility(data);
      } else {
        setError('Failed to load status');
      }
    } catch (err) {
      console.error('Error fetching eligibility:', err);
      setError('Failed to load status');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-6 flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Checking your setup status...
        </CardContent>
      </Card>
    );
  }

  if (error || !eligibility) {
    return null; // Silently fail - don't block the UI
  }

  // If fully complete, show success banner
  if (eligibility.isOnboardingComplete) {
    return (
      <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <AlertDescription>
          <p className="font-semibold text-green-900 dark:text-green-100">
            ✓ Profile Complete - You're a Prepared Client!
          </p>
          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
            You can create service requests and get matched with NRPG-certified contractors.
          </p>
        </AlertDescription>
      </Alert>
    );
  }

  // If can create requests (core 3 complete), show success with optional note
  if (eligibility.canCreateRequests) {
    return (
      <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
        <CheckCircle2 className="h-5 w-5 text-blue-600" />
        <AlertDescription>
          <p className="font-semibold text-blue-900 dark:text-blue-100">
            ✓ Ready to Create Service Requests
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
            Core setup complete. {eligibility.progressivePhasesUnlocked ? 'Complete optional phases for enhanced features.' : 'Additional features unlock after your first request or in 7 days.'}
          </p>
          <div className="flex gap-2 mt-3">
            <Button size="sm" asChild className="bg-blue-600 hover:bg-blue-700">
              <Link href="/dashboard/client/requests/new">
                Create Service Request →
              </Link>
            </Button>
            <Button size="sm" variant="outline" asChild>
              <Link href="/dashboard/client/onboarding/checklist">
                View Checklist
              </Link>
            </Button>
          </div>
        </AlertDescription>
      </Alert>
    );
  }

  // Show "what's left" banner with progress
  return (
    <Card className="border-amber-500 bg-gradient-to-br from-amber-50 to-orange-50 dark:from-amber-950/20 dark:to-orange-950/20">
      <CardContent className="pt-6 space-y-4">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center flex-shrink-0">
              <AlertTriangle className="h-5 w-5 text-white" />
            </div>
            <div>
              <h3 className="font-bold text-amber-900 dark:text-amber-100">
                Complete Your Setup to Create Service Requests
              </h3>
              <p className="text-sm text-amber-700 dark:text-amber-300 mt-1">
                {eligibility.message}
              </p>
            </div>
          </div>
          <Badge variant="secondary" className="flex-shrink-0">
            {Math.round(eligibility.completionPercentage)}% Complete
          </Badge>
        </div>

        {/* Progress Bar */}
        <div className="space-y-2">
          <Progress value={eligibility.completionPercentage} className="h-2" />
          <p className="text-xs text-amber-600 dark:text-amber-400">
            {eligibility.checks.filter((c) => c.status === 'complete').length} of{' '}
            {eligibility.checks.filter((c) => c.status !== 'optional').length} core requirements complete
          </p>
        </div>

        {/* Requirements Checklist */}
        <div className="space-y-2">
          {eligibility.checks.map((check) => {
            const isLocked = check.status === 'optional' && !eligibility.progressivePhasesUnlocked;

            return (
              <div
                key={check.requirement}
                className={`flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-900/50 ${
                  isLocked ? 'opacity-50' : ''
                }`}
              >
                <div className="mt-0.5">
                  {isLocked ? (
                    <Lock className="h-5 w-5 text-gray-400" />
                  ) : check.status === 'complete' ? (
                    <CheckCircle2 className="h-5 w-5 text-green-600" />
                  ) : check.status === 'incomplete' ? (
                    <XCircle className="h-5 w-5 text-red-600" />
                  ) : (
                    <Circle className="h-5 w-5 text-blue-600" />
                  )}
                </div>
                <div className="flex-1">
                  <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                    {check.label}
                    {check.status === 'incomplete' && (
                      <span className="text-red-600 ml-2 text-xs">• Required</span>
                    )}
                    {isLocked && (
                      <span className="text-gray-500 ml-2 text-xs">• Locked</span>
                    )}
                  </p>
                  <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                    {check.description}
                  </p>
                </div>
                {!isLocked && check.status !== 'complete' && check.actionUrl && (
                  <Button
                    asChild
                    size="sm"
                    variant={check.status === 'incomplete' ? 'default' : 'outline'}
                    className="flex-shrink-0"
                  >
                    <Link href={check.actionUrl}>
                      {check.actionText || 'Complete'}
                      <ArrowRight className="h-3 w-3 ml-1" />
                    </Link>
                  </Button>
                )}
              </div>
            );
          })}
        </div>

        {/* Next Action Button */}
        {eligibility.nextAction && (
          <Button asChild className="w-full" size="lg">
            <Link href={eligibility.nextAction.url}>
              {eligibility.nextAction.buttonText}
              <ArrowRight className="h-4 w-4 ml-2" />
            </Link>
          </Button>
        )}

        {/* Progressive Unlock Notice */}
        {!eligibility.progressivePhasesUnlocked && (
          <p className="text-xs text-center text-amber-700 dark:text-amber-400">
            ℹ️ Insurance, Payment, Communication & Education unlock after core setup or in 7 days
          </p>
        )}
      </CardContent>
    </Card>
  );
}
