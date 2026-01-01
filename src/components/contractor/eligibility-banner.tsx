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
  Clock,
} from 'lucide-react';

interface EligibilityCheck {
  requirement: string;
  status: 'complete' | 'incomplete' | 'pending';
  label: string;
  description: string;
  actionUrl?: string;
  actionText?: string;
}

interface EligibilityData {
  isEligible: boolean;
  readyForDispatch: boolean;
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
}

export function EligibilityBanner() {
  const [loading, setLoading] = useState(true);
  const [eligibility, setEligibility] = useState<EligibilityData | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetchEligibility();
  }, []);

  const fetchEligibility = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/contractor/eligibility', { cache: 'no-store' });

      if (response.ok) {
        const data = await response.json();
        setEligibility(data);
      } else {
        setError('Failed to load eligibility status');
      }
    } catch (err) {
      console.error('Error fetching eligibility:', err);
      setError('Failed to load eligibility status');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="py-6 flex items-center justify-center gap-2 text-muted-foreground">
          <Loader2 className="h-5 w-5 animate-spin" />
          Checking eligibility...
        </CardContent>
      </Card>
    );
  }

  if (error || !eligibility) {
    return null; // Silently fail - don't block the UI
  }

  // If fully eligible, show success banner
  if (eligibility.isEligible) {
    return (
      <Alert className="border-green-500 bg-green-50 dark:bg-green-950/20">
        <CheckCircle2 className="h-5 w-5 text-green-600" />
        <AlertDescription>
          <p className="font-semibold text-green-900 dark:text-green-100">
            Ready for Dispatch!
          </p>
          <p className="text-sm text-green-700 dark:text-green-300 mt-1">
            You're eligible to bid on service requests. All requirements are complete.
          </p>
        </AlertDescription>
      </Alert>
    );
  }

  // If ready for dispatch (pending verification), show info banner
  if (eligibility.readyForDispatch) {
    return (
      <Alert className="border-blue-500 bg-blue-50 dark:bg-blue-950/20">
        <Clock className="h-5 w-5 text-blue-600" />
        <AlertDescription>
          <p className="font-semibold text-blue-900 dark:text-blue-100">
            Almost Ready for Dispatch
          </p>
          <p className="text-sm text-blue-700 dark:text-blue-300 mt-1">
            Your application is under review. You'll be notified when verification is complete.
          </p>
          {eligibility.incompleteRequirements.length > 0 && (
            <p className="text-xs text-blue-600 dark:text-blue-400 mt-2">
              Pending: {eligibility.incompleteRequirements.join(', ')}
            </p>
          )}
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
                Complete Your Setup to Start Receiving Jobs
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
            {eligibility.checks.filter(c => c.status === 'complete').length} of {eligibility.checks.length} requirements complete
          </p>
        </div>

        {/* Requirements Checklist */}
        <div className="space-y-2">
          {eligibility.checks.map((check) => (
            <div
              key={check.requirement}
              className="flex items-start gap-3 p-3 rounded-lg bg-white/50 dark:bg-gray-900/50"
            >
              <div className="mt-0.5">
                {check.status === 'complete' ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600" />
                ) : check.status === 'pending' ? (
                  <Clock className="h-5 w-5 text-blue-600" />
                ) : (
                  <XCircle className="h-5 w-5 text-red-600" />
                )}
              </div>
              <div className="flex-1">
                <p className="font-medium text-sm text-gray-900 dark:text-gray-100">
                  {check.label}
                </p>
                <p className="text-xs text-gray-600 dark:text-gray-400 mt-0.5">
                  {check.description}
                </p>
              </div>
              {check.status !== 'complete' && check.actionUrl && (
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
          ))}
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
      </CardContent>
    </Card>
  );
}
