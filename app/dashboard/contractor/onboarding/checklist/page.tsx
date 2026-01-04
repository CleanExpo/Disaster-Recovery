'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, CheckCircle2, Circle, ArrowRight, Award, FileText, Shield, BookOpen, FileSignature } from 'lucide-react';

interface ChecklistStatus {
  preferencesComplete: boolean;
  profileComplete: boolean;
  nrpgRegistrationComplete: boolean;
  trainingInProgress: boolean;
  trainingComplete: boolean;
  payoutsConfigured: boolean;
  currentModuleId?: string;
  completionPercentage?: number;
  stripeAccountId?: string;
  nrpgStatus?: 'pending' | 'approved' | 'rejected';
  // NRPG Certification status
  nrpgBackgroundComplete: boolean;
  nrpgCommitmentSigned: boolean;
  nrpgCertificationPoints?: number;
  nrpgPartnershipLevel?: string;
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
        const [preferencesRes, profileRes, nrpgRes, onboardingRes, stripeRes, nrpgCertRes, nrpgPhasesRes] = await Promise.all([
          fetch('/api/contractor/preferences', { cache: 'no-store' }),
          fetch('/api/contractor/profile', { cache: 'no-store' }),
          fetch('/api/contractors/me', { cache: 'no-store' }),
          fetch(`/api/onboarding/progress/${userId}`, { cache: 'no-store' }),
          fetch('/api/contractor/stripe/connect/status', { cache: 'no-store' }),
          fetch('/api/onboarding/nrpg/certification', { cache: 'no-store' }),
          fetch('/api/onboarding/nrpg/phases', { cache: 'no-store' }),
        ]);

        const preferences = await preferencesRes.json().catch(() => null);
        const profilePayload = await profileRes.json().catch(() => null);
        const nrpgPayload = await nrpgRes.json().catch(() => null);
        const onboardingPayload = await onboardingRes.json().catch(() => null);
        const stripePayload = await stripeRes.json().catch(() => null);
        const nrpgCertPayload = await nrpgCertRes.json().catch(() => null);
        const nrpgPhasesPayload = await nrpgPhasesRes.json().catch(() => null);

        const preferencesComplete = Boolean(preferences?.isOnboardingComplete);
        const profileComplete = Boolean(profilePayload?.profile?.isProfileComplete);
        const nrpgRegistrationComplete = Boolean(nrpgPayload?.success && nrpgPayload?.contractor?.nrpgMemberId);
        const completionPercentage = Number(onboardingPayload?.progress?.completionPercentage ?? 0);
        const trainingInProgress = onboardingRes.ok && completionPercentage > 0 && completionPercentage < 100;
        const trainingComplete = onboardingRes.ok && completionPercentage >= 100;
        const payoutsConfigured = Boolean(stripePayload?.success && stripePayload?.payoutsConfigured);

        // Extract detailed data for deep linking
        const currentModuleId = onboardingPayload?.progress?.currentModule?.moduleId;
        const stripeAccountId = stripePayload?.stripeConnectAccountId;
        const nrpgStatus = nrpgPayload?.contractor?.verificationStatus?.toLowerCase();

        // NRPG Certification data
        const nrpgBackgroundComplete = Boolean(nrpgPhasesPayload?.data?.summary?.backgroundChecks?.allPass);
        const nrpgCommitmentSigned = Boolean(nrpgPhasesPayload?.data?.summary?.phase3?.checklist?.find((c: any) => c.key === 'commitmentSigned')?.complete);
        const nrpgCertificationPoints = nrpgCertPayload?.data?.certification?.totalPoints || 0;
        const nrpgPartnershipLevel = nrpgCertPayload?.data?.certification?.partnershipLevel || 'CANDIDATE';

        setChecklist({
          preferencesComplete,
          profileComplete,
          nrpgRegistrationComplete,
          trainingInProgress,
          trainingComplete,
          payoutsConfigured,
          currentModuleId,
          completionPercentage,
          stripeAccountId,
          nrpgStatus,
          nrpgBackgroundComplete,
          nrpgCommitmentSigned,
          nrpgCertificationPoints,
          nrpgPartnershipLevel,
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

  // Generate smart deep links based on current state
  const getTrainingHref = () => {
    if (checklist.currentModuleId) {
      return `/dashboard/contractor/onboarding/module/${checklist.currentModuleId}`;
    }
    return '/dashboard/contractor/onboarding';
  };

  const getTrainingAction = () => {
    if (checklist.trainingComplete) {
      return 'Review training';
    }
    if (checklist.trainingInProgress && checklist.currentModuleId) {
      return `Continue: ${checklist.currentModuleId}`;
    }
    if (checklist.trainingInProgress) {
      return `Resume training (${Math.round(checklist.completionPercentage || 0)}%)`;
    }
    return 'Start training';
  };

  const getNRPGAction = () => {
    if (checklist.nrpgRegistrationComplete) {
      return checklist.nrpgStatus === 'pending' ? 'View status (pending)' : 'View registration';
    }
    return 'Submit registration';
  };

  const getPayoutsAction = () => {
    if (checklist.payoutsConfigured) {
      return 'Manage payouts';
    }
    if (checklist.stripeAccountId) {
      return 'Complete Stripe setup';
    }
    return 'Set up payouts';
  };

  const steps = [
    {
      key: 'preferences',
      title: 'Set your preferences',
      description: 'Service categories, locations, availability, and theme.',
      complete: checklist.preferencesComplete,
      href: '/dashboard/contractor/preferences',
      action: checklist.preferencesComplete ? 'Update preferences' : 'Set preferences',
      icon: null,
    },
    {
      key: 'profile',
      title: 'Complete your profile',
      description: 'Business details, services, service areas, insurance and bio.',
      complete: checklist.profileComplete,
      href: '/dashboard/contractor/profile-setup',
      action: checklist.profileComplete ? 'Update profile' : 'Complete profile',
      icon: null,
    },
    {
      key: 'nrpg',
      title: 'NRPG registration',
      description: 'Submit ABN/IICRC/insurance details for NRPG verification.',
      complete: checklist.nrpgRegistrationComplete,
      href: '/dashboard/contractor/onboarding/nrpg-registration',
      action: getNRPGAction(),
      statusBadge: checklist.nrpgStatus === 'pending' ? 'Under review' : undefined,
      icon: null,
    },
    {
      key: 'nrpg-verification',
      title: 'Background verification',
      description: 'Complete criminal, financial, professional, and insurance checks.',
      complete: checklist.nrpgBackgroundComplete,
      href: '/dashboard/contractor/onboarding/nrpg/verification',
      action: checklist.nrpgBackgroundComplete ? 'View verification' : 'Start verification',
      icon: Shield,
      iconColour: 'text-amber-500',
    },
    {
      key: 'nrpg-commitment',
      title: 'Sign commitment framework',
      description: 'Review and sign the NRPG professional commitment.',
      complete: checklist.nrpgCommitmentSigned,
      href: '/dashboard/contractor/onboarding/nrpg/commitment',
      action: checklist.nrpgCommitmentSigned ? 'View commitment' : 'Sign commitment',
      icon: FileSignature,
      iconColour: 'text-purple-500',
    },
    {
      key: 'training',
      title: 'Complete training',
      description: 'Finish required modules and pass assessments (70%+).',
      complete: checklist.trainingComplete,
      inProgress: checklist.trainingInProgress,
      href: getTrainingHref(),
      action: getTrainingAction(),
      progressText: checklist.trainingInProgress && checklist.completionPercentage
        ? `${Math.round(checklist.completionPercentage)}% complete`
        : undefined,
      icon: BookOpen,
      iconColour: 'text-blue-500',
    },
    {
      key: 'payouts',
      title: 'Set up payouts',
      description: 'Connect your Stripe account to receive payments.',
      complete: checklist.payoutsConfigured,
      href: '/dashboard/contractor/onboarding/payouts',
      action: getPayoutsAction(),
      statusBadge: checklist.stripeAccountId && !checklist.payoutsConfigured ? 'Setup incomplete' : undefined,
      icon: null,
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
          {steps.map((step) => {
            const StepIcon = step.icon;
            return (
            <div key={step.key} className="flex items-start justify-between gap-3 rounded-lg border p-4">
              <div className="flex items-start gap-3 flex-1">
                {step.complete ? (
                  <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5 flex-shrink-0" />
                ) : StepIcon ? (
                  <StepIcon className={`h-5 w-5 mt-0.5 flex-shrink-0 ${'iconColour' in step ? step.iconColour : 'text-muted-foreground'}`} />
                ) : (
                  <Circle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
                )}
                <div className="flex-1">
                  <div className="flex items-center gap-2 flex-wrap">
                    <p className="font-medium">{step.title}</p>
                    {!step.complete && 'inProgress' in step && step.inProgress && (
                      <Badge variant="outline" className="text-blue-600 border-blue-600">
                        In progress
                      </Badge>
                    )}
                    {'statusBadge' in step && step.statusBadge && (
                      <Badge variant="outline" className="text-amber-600 border-amber-600">
                        {step.statusBadge}
                      </Badge>
                    )}
                  </div>
                  <p className="text-sm text-muted-foreground mt-0.5">{step.description}</p>
                  {'progressText' in step && step.progressText && (
                    <p className="text-xs text-blue-600 mt-1 font-medium">{step.progressText}</p>
                  )}
                </div>
              </div>
              <Button asChild variant={step.complete ? 'outline' : 'default'} className="flex-shrink-0">
                <Link href={step.href}>
                  {step.action}
                  <ArrowRight className="h-4 w-4 ml-2" />
                </Link>
              </Button>
            </div>
          );
          })}
        </CardContent>
      </Card>

      {/* Certificate Card - Shows when training is complete */}
      {checklist.trainingComplete && (
        <Card className="border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 rounded-full bg-green-600 flex items-center justify-center flex-shrink-0">
                  <Award className="h-7 w-7 text-white" />
                </div>
                <div className="flex-1">
                  <h3 className="text-lg font-bold text-green-900 dark:text-green-100">
                    Your NRP Training Certificate is Ready!
                  </h3>
                  <p className="text-sm text-green-700 dark:text-green-300 mt-1">
                    You've completed all required modules. View and download your official NRPG certificate.
                  </p>
                </div>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <Button asChild variant="outline" className="border-green-600 text-green-700 hover:bg-green-50">
                  <Link href="/dashboard/contractor/onboarding/certificate">
                    <FileText className="h-4 w-4 mr-2" />
                    View
                  </Link>
                </Button>
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/dashboard/contractor/onboarding/certificate?action=download">
                    <Award className="h-4 w-4 mr-2" />
                    Download
                  </Link>
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
