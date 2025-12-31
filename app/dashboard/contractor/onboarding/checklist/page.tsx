'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, Circle, ArrowRight } from 'lucide-react';

interface ChecklistStatus {
  preferencesComplete: boolean;
  profileComplete: boolean;
  nrpgRegistrationComplete: boolean;
  trainingInProgress: boolean;
  trainingComplete: boolean;
  payoutsConfigured: boolean;
}

export default function ContractorOnboardingChecklistPage() {
  const { status, data: session } = useSession();
  const userId = useMemo(() => (session?.user as any)?.id as string | undefined, [session]);

  const [loading, setLoading] = useState(true);
  const [checklist, setChecklist] = useState<ChecklistStatus | null>(null);

  useEffect(() => {
    const load = async () => {
      if (!userId) return;
      setLoading(true);
      try {
        const [preferencesRes, profileRes, nrpgRes, onboardingRes, stripeRes] = await Promise.all([
          fetch('/api/contractor/preferences', { cache: 'no-store' }),
          fetch('/api/contractor/profile', { cache: 'no-store' }),
          fetch('/api/contractors/me', { cache: 'no-store' }),
          fetch(`/api/onboarding/progress/${userId}`, { cache: 'no-store' }),
          fetch('/api/contractor/stripe/connect/status', { cache: 'no-store' }),
        ]);

        const preferences = await preferencesRes.json().catch(() => null);
        const profilePayload = await profileRes.json().catch(() => null);
        const nrpgPayload = await nrpgRes.json().catch(() => null);
        const onboardingPayload = await onboardingRes.json().catch(() => null);
        const stripePayload = await stripeRes.json().catch(() => null);

        const preferencesComplete = Boolean(preferences?.isOnboardingComplete);
        const profileComplete = Boolean(profilePayload?.profile?.isProfileComplete);
        const nrpgRegistrationComplete = Boolean(nrpgPayload?.success && nrpgPayload?.contractor?.nrpgMemberId);
        const completionPercentage = Number(onboardingPayload?.progress?.completionPercentage ?? 0);
        const trainingInProgress = onboardingRes.ok && completionPercentage > 0 && completionPercentage < 100;
        const trainingComplete = onboardingRes.ok && completionPercentage >= 100;
        const payoutsConfigured = Boolean(stripePayload?.success && stripePayload?.payoutsConfigured);

        setChecklist({
          preferencesComplete,
          profileComplete,
          nrpgRegistrationComplete,
          trainingInProgress,
          trainingComplete,
          payoutsConfigured,
        });
      } finally {
        setLoading(false);
      }
    };

    if (status === 'authenticated') {
      void load();
    }
  }, [status, userId]);

  if (status === 'loading') {
    return (
      <div className="container mx-auto py-8 max-w-3xl">
        <Card>
          <CardContent className="py-12 flex items-center justify-center">
            <Loader2 className="h-6 w-6 animate-spin" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Contractor Onboarding</CardTitle>
            <CardDescription>Sign in to continue your onboarding checklist.</CardDescription>
          </CardHeader>
          <CardContent>
            <Button onClick={() => void signIn()} className="w-full" size="lg">
              Sign In
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (loading || !checklist) {
    return (
      <div className="container mx-auto py-8 max-w-3xl">
        <Card>
          <CardContent className="py-12 flex items-center justify-center gap-2 text-muted-foreground">
            <Loader2 className="h-5 w-5 animate-spin" />
            Loading your onboarding status…
          </CardContent>
        </Card>
      </div>
    );
  }

  const steps = [
    {
      key: 'preferences',
      title: 'Set your preferences',
      description: 'Service categories, locations, availability, and theme.',
      complete: checklist.preferencesComplete,
      href: '/dashboard/contractor',
      action: 'Open dashboard',
    },
    {
      key: 'profile',
      title: 'Complete your profile',
      description: 'Business details, services, service areas, insurance and bio.',
      complete: checklist.profileComplete,
      href: '/dashboard/contractor/profile-setup',
      action: 'Complete profile',
    },
    {
      key: 'nrpg',
      title: 'NRPG registration',
      description: 'Submit ABN/IICRC/insurance details for NRPG verification.',
      complete: checklist.nrpgRegistrationComplete,
      href: '/dashboard/contractor/onboarding/nrpg-registration',
      action: 'Submit registration',
    },
    {
      key: 'training',
      title: 'Complete training',
      description: 'Finish required modules and pass assessments (70%+).',
      complete: checklist.trainingComplete,
      inProgress: checklist.trainingInProgress,
      href: '/dashboard/contractor/onboarding',
      action: 'Open training',
    },
    {
      key: 'payouts',
      title: 'Set up payouts',
      description: 'Connect your Stripe account to receive payments.',
      complete: checklist.payoutsConfigured,
      href: '/dashboard/contractor/onboarding/payouts',
      action: checklist.payoutsConfigured ? 'View payouts' : 'Set up payouts',
    },
  ] as const;

  const allComplete = steps.every((s) => s.complete);

  return (
    <div className="container mx-auto py-8 max-w-4xl space-y-4">
      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle>Contractor Onboarding Checklist</CardTitle>
              <CardDescription>Complete each step to become ready for dispatch.</CardDescription>
            </div>
            <Badge variant={allComplete ? 'default' : 'secondary'} className={allComplete ? 'bg-green-600' : ''}>
              {allComplete ? 'Ready for dispatch' : 'In progress'}
            </Badge>
          </div>
        </CardHeader>
        <CardContent className="space-y-3">
          {steps.map((step) => (
            <div key={step.key} className="flex items-start justify-between gap-3 rounded-lg border p-4">
              <div className="flex items-start gap-3">
                {step.complete ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground mt-0.5" />
                )}
                <div>
                  <div className="flex items-center gap-2">
                    <p className="font-medium">{step.title}</p>
                    {!step.complete && 'inProgress' in step && step.inProgress && <Badge variant="outline">In progress</Badge>}
                    {!step.complete && 'pending' in (step as any) && (step as any).pending && (
                      <Badge variant="outline">Needs UI</Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground">{step.description}</p>
                </div>
              </div>
              <Button asChild variant={step.complete ? 'outline' : 'default'}>
                <Link href={step.href}>
                  {step.action}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
