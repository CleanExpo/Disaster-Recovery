'use client';

import { AntigravityNavbar } from '@/components/antigravity';
import { AntigravityFooter } from '@/components/antigravity';
import ClaimStatusNotifier from '@/components/notifications/ClaimStatusNotifier';
import { useState, useEffect, useCallback } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  CheckCircle2,
  Clock,
  Phone,
  MapPin,
  Calendar,
  User,
  AlertCircle,
  Shield,
  FileText,
  Home,
  ChevronRight,
  RefreshCw,
} from 'lucide-react';

import type { ClaimTracking } from '@/lib/validation/schemas';

type ClaimData = ClaimTracking;
type LoadState = 'loading' | 'ready' | 'not_found' | 'error';

const workflowSteps = [
  { key: 'paymentProcessed', label: 'Claim received', icon: FileText },
  { key: 'contractorAssigned', label: 'Contractor matched', icon: User },
  { key: 'contractorAccepted', label: 'Job accepted', icon: CheckCircle2 },
  { key: 'initialContactMade', label: 'Contact made', icon: Phone },
  { key: 'jobScheduled', label: 'Job scheduled', icon: Calendar },
  { key: 'makeSafeCompleted', label: 'Make-safe done', icon: Shield },
  { key: 'documentationProvided', label: 'Documentation', icon: FileText },
  { key: 'claimFinalized', label: 'Claim complete', icon: Home },
];

function TrackClaimPageOriginal() {
  const params = useParams<{ claimId: string }>();
  const claimId = params?.claimId || '';
  const [claimData, setClaimData] = useState<ClaimData | null>(null);
  const [loadState, setLoadState] = useState<LoadState>('loading');
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [timeElapsed, setTimeElapsed] = useState('');
  const [retrying, setRetrying] = useState(false);

  const fetchClaimData = useCallback(async () => {
    if (!claimId) {
      setLoadState('not_found');
      setClaimData(null);
      return;
    }

    try {
      const response = await fetch(`/api/claims/submit?id=${encodeURIComponent(claimId)}`, {
        credentials: 'include',
      });
      const result = await response.json().catch(() => ({}));

      if (response.ok && result.success && result.claim) {
        setClaimData(result.claim);
        setLoadState('ready');
        setErrorMessage(null);
        return;
      }

      if (response.status === 404 || result.error === 'Claim not found') {
        setClaimData(null);
        setLoadState('not_found');
        setErrorMessage(null);
        return;
      }

      setClaimData(null);
      setLoadState('error');
      setErrorMessage(
        result.message ||
          result.error ||
          'We could not load your claim right now. Please try again.',
      );
    } catch {
      setClaimData(null);
      setLoadState('error');
      setErrorMessage('Network error while loading your claim. Check your connection and retry.');
    }
  }, [claimId]);

  useEffect(() => {
    if (!claimId) {
      setLoadState('not_found');
      return undefined;
    }
    setLoadState('loading');
    void fetchClaimData();
    const interval = setInterval(() => {
      void fetchClaimData();
    }, 30000);
    return () => clearInterval(interval);
  }, [claimId, fetchClaimData]);

  useEffect(() => {
    if (!claimData) return undefined;
    const updateElapsed = () => {
      const created = new Date(claimData.createdAt);
      const now = new Date();
      const diff = now.getTime() - created.getTime();
      const minutes = Math.floor(diff / 60000);
      const hours = Math.floor(minutes / 60);
      if (hours > 0) {
        setTimeElapsed(`${hours}h ${minutes % 60}m ago`);
      } else {
        setTimeElapsed(`${Math.max(0, minutes)}m ago`);
      }
    };
    updateElapsed();
    const timer = setInterval(updateElapsed, 60000);
    return () => clearInterval(timer);
  }, [claimData]);

  const handleRetry = async () => {
    setRetrying(true);
    setLoadState('loading');
    await fetchClaimData();
    setRetrying(false);
  };

  const getProgressPercentage = () => {
    if (!claimData) return 0;
    const completed = workflowSteps.filter(
      (step) => claimData.workflow[step.key as keyof typeof claimData.workflow],
    ).length;
    return (completed / workflowSteps.length) * 100;
  };

  const getTimeUntilContact = () => {
    if (!claimData) return null;
    const created = new Date(claimData.createdAt);
    const deadline = new Date(created.getTime() + 60 * 60000);
    const now = new Date();
    const remaining = deadline.getTime() - now.getTime();

    if (remaining <= 0 || claimData.workflow.initialContactMade) {
      return null;
    }

    return Math.floor(remaining / 60000);
  };

  if (loadState === 'loading') {
    return (
      <div className="ag-page-elevated min-h-screen py-12 px-4" role="status" aria-live="polite">
        <div className="mx-auto max-w-4xl text-center space-y-3">
          <Clock className="h-12 w-12 text-[var(--ag-primary-blue)] mx-auto animate-pulse" />
          <p className="text-sm text-[var(--ag-text-grey)]">Loading claim details…</p>
        </div>
      </div>
    );
  }

  if (loadState === 'error') {
    return (
      <div className="ag-page-elevated min-h-screen py-12 px-4">
        <div className="mx-auto max-w-lg text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-[var(--ag-emergency-red)] mx-auto" />
          <h1 className="text-xl font-bold text-[var(--ag-primary-blue)]">Unable to load claim</h1>
          <p className="text-sm text-[var(--ag-text-grey)]">{errorMessage}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button
              className="ag-btn-primary-navy min-h-[44px]"
              onClick={() => void handleRetry()}
              disabled={retrying}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${retrying ? 'animate-spin' : ''}`} />
              {retrying ? 'Retrying…' : 'Try again'}
            </Button>
            <Button variant="outline" asChild className="min-h-[44px]">
              <a href="tel:1300309361">Call 1300 309 361</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  if (loadState === 'not_found' || !claimData) {
    return (
      <div className="ag-page-elevated min-h-screen py-12 px-4">
        <div className="mx-auto max-w-lg text-center space-y-4">
          <AlertCircle className="h-12 w-12 text-[var(--ag-emergency-red)] mx-auto" />
          <h1 className="text-xl font-bold text-[var(--ag-primary-blue)]">Claim not found</h1>
          <p className="text-sm text-[var(--ag-text-grey)]">
            We could not find that claim ID. Check the ID from your confirmation email, or lodge a
            new claim.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Button asChild className="ag-btn-primary-navy min-h-[44px]">
              <Link href="/claim">Lodge a claim</Link>
            </Button>
            <Button variant="outline" asChild className="min-h-[44px]">
              <Link href="/account">Go to account</Link>
            </Button>
            <Button variant="outline" asChild className="min-h-[44px]">
              <a href="tel:1300309361">Call 1300 309 361</a>
            </Button>
          </div>
        </div>
      </div>
    );
  }

  const timeRemaining = getTimeUntilContact();

  return (
    <div className="min-h-screen bg-gray-50 py-8 sm:py-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="mb-6 sm:mb-8 flex flex-wrap items-start justify-between gap-3">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold mb-2">Track Your Claim</h1>
            <p className="text-gray-700">
              Claim ID: <strong>{claimData.id}</strong>
            </p>
            <p className="text-sm text-gray-700">
              Submitted {timeElapsed || new Date(claimData.createdAt).toLocaleString('en-AU')}
            </p>
            <p className="text-sm text-gray-600 mt-1">
              Status: <strong>{claimData.status}</strong>
            </p>
          </div>
          <Button
            variant="outline"
            className="min-h-[44px]"
            onClick={() => void handleRetry()}
            disabled={retrying}
            aria-label="Refresh claim status"
          >
            <RefreshCw className={`h-4 w-4 mr-2 ${retrying ? 'animate-spin' : ''}`} />
            Refresh
          </Button>
        </div>

        {timeRemaining !== null && (
          <Alert className="mb-6 bg-orange-50 border-orange-200">
            <Clock className="h-4 w-4 text-orange-600" />
            <AlertDescription className="text-orange-800">
              <strong>Response target:</strong> Your matched contractor aims to call you within{' '}
              <strong className="text-red-600">{timeRemaining} minutes</strong> in metro areas.
            </AlertDescription>
          </Alert>
        )}

        <Card className="mb-6">
          <CardHeader>
            <CardTitle>Claim Progress</CardTitle>
            <CardDescription>Tracking your claim from submission to completion</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span>Overall Progress</span>
                <span>{Math.round(getProgressPercentage())}%</span>
              </div>
              <Progress value={getProgressPercentage()} className="h-2" />
            </div>

            <div className="space-y-3">
              {workflowSteps.map((step) => {
                const Icon = step.icon;
                const done = Boolean(
                  claimData.workflow[step.key as keyof typeof claimData.workflow],
                );
                return (
                  <div
                    key={step.key}
                    className={`flex items-center gap-3 rounded-lg border p-3 ${
                      done ? 'border-emerald-200 bg-emerald-50' : 'border-gray-200 bg-white'
                    }`}
                  >
                    <Icon
                      className={`h-5 w-5 ${done ? 'text-emerald-600' : 'text-gray-400'}`}
                      aria-hidden="true"
                    />
                    <span className={`text-sm ${done ? 'font-medium text-emerald-900' : 'text-gray-700'}`}>
                      {step.label}
                    </span>
                    {done && (
                      <CheckCircle2 className="h-4 w-4 text-emerald-600 ml-auto" aria-label="Complete" />
                    )}
                  </div>
                );
              })}
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-2 mb-6">
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <User className="h-4 w-4" /> Contact
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1 text-gray-700">
              <p>{claimData.client.fullName}</p>
              <p>{claimData.client.email}</p>
              {claimData.client.phone ? <p>{claimData.client.phone}</p> : null}
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-base flex items-center gap-2">
                <MapPin className="h-4 w-4" /> Property
              </CardTitle>
            </CardHeader>
            <CardContent className="text-sm space-y-1 text-gray-700">
              <p>{claimData.property.address || 'Address on file'}</p>
              <p>
                {[claimData.property.suburb, claimData.property.state, claimData.property.postcode]
                  .filter(Boolean)
                  .join(' ')}
              </p>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-6">
          <CardHeader>
            <CardTitle className="text-base">Damage summary</CardTitle>
          </CardHeader>
          <CardContent className="text-sm text-gray-700 space-y-2">
            <p>
              <strong>Types:</strong> {claimData.damage.types.join(', ')}
            </p>
            <p>
              <strong>Urgency:</strong> {claimData.damage.urgencyLevel}
            </p>
            <p>{claimData.damage.description}</p>
          </CardContent>
        </Card>

        {claimData.contractor.companyName && (
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="text-base">Assigned contractor</CardTitle>
            </CardHeader>
            <CardContent className="text-sm text-gray-700 space-y-1">
              <p>{claimData.contractor.companyName}</p>
              {claimData.contractor.directPhone ? (
                <p>
                  <a className="underline" href={`tel:${claimData.contractor.directPhone}`}>
                    {claimData.contractor.directPhone}
                  </a>
                </p>
              ) : null}
            </CardContent>
          </Card>
        )}

        <Card className="mb-6 border-blue-200 bg-blue-50">
          <CardContent className="py-6">
            <div className="flex items-start gap-4">
              <Shield className="h-8 w-8 text-blue-600 flex-shrink-0" />
              <div>
                <h3 className="font-semibold text-lg text-gray-900 mb-1">Your Claim Support Pack</h3>
                <p className="text-gray-700 text-sm mb-3">
                  Know your rights, questions to ask your insurer, expert contacts, and a
                  step-by-step claim guide.
                </p>
                <Link
                  href={`/claim/${claimData.id}/support`}
                  className="inline-flex min-h-[44px] items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
                >
                  <FileText className="h-4 w-4" />
                  View Support Pack
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>

        <Alert>
          <Shield className="h-4 w-4" />
          <AlertDescription>
            <strong>Remember:</strong> Disaster Recovery is a network orchestrator. We connect you
            with IICRC-certified contractors — we do not perform restoration work, hold client
            funds, or invoice for restoration. Your matched contractor handles service delivery and
            bills you directly.
          </AlertDescription>
        </Alert>
      </div>
    </div>
  );
}

export default function TrackClaimPage() {
  const params = useParams<{ claimId: string }>();
  const claimId = params?.claimId || '';

  return (
    <>
      <AntigravityNavbar />
      {claimId && <ClaimStatusNotifier claimId={claimId} />}
      <TrackClaimPageOriginal />
      <AntigravityFooter />
    </>
  );
}
