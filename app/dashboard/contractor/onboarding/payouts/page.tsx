'use client';

import { Suspense, useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, ArrowLeft, ExternalLink, CheckCircle2, AlertTriangle, Clock, XCircle, Info } from 'lucide-react';

export default function ContractorPayoutSetupPage() {
  return (
    <Suspense fallback={<PayoutPageLoading />}>
      <PayoutPageContent />
    </Suspense>
  );
}

function PayoutPageLoading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader2 className="h-6 w-6 animate-spin" />
    </div>
  );
}

interface StripeConnectStatusResponse {
  success?: boolean;
  payoutsConfigured?: boolean;
  stripeConnectAccountId?: string | null;
  status?: string;
  message?: string;
  actionRequired?: string | null;
  capabilities?: {
    chargesEnabled: boolean;
    payoutsEnabled: boolean;
    detailsSubmitted: boolean;
  };
  requirements?: {
    currentlyDue: string[];
    eventuallyDue: string[];
    pendingVerification: string[];
    errors: Array<{
      code: string;
      reason: string;
      requirement: string;
    }>;
  };
}

function PayoutPageContent() {
  const { status } = useSession();
  const searchParams = useSearchParams();
  const stripeResult = useMemo(() => searchParams.get('stripe'), [searchParams]);

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [starting, setStarting] = useState(false);
  const [statusData, setStatusData] = useState<StripeConnectStatusResponse | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadStatus = async () => {
    setError(null);
    setLoadingStatus(true);
    try {
      const response = await fetch('/api/contractor/stripe/connect/status', { cache: 'no-store' });
      const data = (await response.json().catch(() => null)) as StripeConnectStatusResponse | null;
      setStatusData(data || null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load payout status');
    } finally {
      setLoadingStatus(false);
    }
  };

  const payoutsConfigured = statusData?.payoutsConfigured || false;
  const connectAccountId = statusData?.stripeConnectAccountId;

  useEffect(() => {
    if (status === 'authenticated') {
      void loadStatus();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [status]);

  const startStripeOnboarding = async () => {
    setError(null);
    setStarting(true);
    try {
      const response = await fetch('/api/contractor/stripe/connect/onboard', { method: 'POST' });
      const data = await response.json().catch(() => null);
      if (response.ok && data?.url) {
        window.location.href = data.url as string;
        return;
      }
      throw new Error(data?.error || 'Failed to start Stripe payout setup');
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to start payout setup');
      setStarting(false);
    }
  };

  if (status === 'loading') {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    return (
      <div className="container mx-auto py-8 max-w-2xl">
        <Card>
          <CardHeader>
            <CardTitle>Payout Setup</CardTitle>
            <CardDescription>Sign in to connect Stripe payouts.</CardDescription>
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

  const showReturnBanner = stripeResult === 'return' || stripeResult === 'refresh';

  return (
    <div className="container mx-auto py-8 max-w-2xl space-y-4">
      <Button asChild variant="outline">
        <Link href="/dashboard/contractor/onboarding/checklist">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Back to checklist
        </Link>
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-start justify-between gap-3">
            <div>
              <CardTitle>Payout Setup</CardTitle>
              <CardDescription>Connect Stripe so NRPG can pay you for completed jobs.</CardDescription>
            </div>
            <Badge variant={payoutsConfigured ? 'default' : 'secondary'} className={payoutsConfigured ? 'bg-green-600' : ''}>
              {payoutsConfigured ? 'Connected' : 'Not connected'}
            </Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-3">
          {showReturnBanner && (
            <div className="rounded-lg border p-3 flex items-start gap-2">
              <CheckCircle2 className="h-5 w-5 text-green-600 mt-0.5" />
              <div>
                <p className="font-medium">Stripe onboarding returned</p>
                <p className="text-sm text-muted-foreground">Refreshing your payout status now.</p>
              </div>
              <Button variant="outline" className="ml-auto" onClick={loadStatus} disabled={loadingStatus}>
                {loadingStatus ? 'Refreshing…' : 'Refresh'}
              </Button>
            </div>
          )}

          {loadingStatus ? (
            <div className="flex items-center justify-center gap-2 text-muted-foreground py-6">
              <Loader2 className="h-5 w-5 animate-spin" />
              Loading Stripe status…
            </div>
          ) : (
            <>
              {/* Account ID */}
              {connectAccountId && (
                <div className="text-xs text-muted-foreground bg-muted/50 px-3 py-2 rounded">
                  Account ID: {connectAccountId}
                </div>
              )}

              {/* Status Alert */}
              {statusData?.status && statusData.status !== 'not_started' && (
                <Alert
                  className={
                    statusData.status === 'active'
                      ? 'border-green-500 bg-green-50 dark:bg-green-950/20'
                      : statusData.status === 'restricted' || statusData.status === 'error'
                      ? 'border-red-500 bg-red-50 dark:bg-red-950/20'
                      : statusData.status === 'pending_verification'
                      ? 'border-blue-500 bg-blue-50 dark:bg-blue-950/20'
                      : 'border-amber-500 bg-amber-50 dark:bg-amber-950/20'
                  }
                >
                  {statusData.status === 'active' && <CheckCircle2 className="h-4 w-4 text-green-600" />}
                  {statusData.status === 'restricted' && <XCircle className="h-4 w-4 text-red-600" />}
                  {statusData.status === 'error' && <XCircle className="h-4 w-4 text-red-600" />}
                  {statusData.status === 'pending_verification' && <Clock className="h-4 w-4 text-blue-600" />}
                  {(statusData.status === 'incomplete' || statusData.status === 'requirements_due' || statusData.status === 'pending') && (
                    <AlertTriangle className="h-4 w-4 text-amber-600" />
                  )}
                  <AlertDescription>
                    <p className="font-semibold mb-1">{statusData.message}</p>
                    {statusData.actionRequired && (
                      <p className="text-sm mt-2">
                        <strong>Action needed:</strong> {statusData.actionRequired}
                      </p>
                    )}
                  </AlertDescription>
                </Alert>
              )}

              {/* Capabilities */}
              {statusData?.capabilities && (
                <div className="space-y-2">
                  <p className="text-sm font-medium">Account Capabilities</p>
                  <div className="grid grid-cols-3 gap-2">
                    <div className="flex items-center gap-2 text-sm">
                      {statusData.capabilities.chargesEnabled ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span>Charges</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {statusData.capabilities.payoutsEnabled ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span>Payouts</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm">
                      {statusData.capabilities.detailsSubmitted ? (
                        <CheckCircle2 className="h-4 w-4 text-green-600" />
                      ) : (
                        <XCircle className="h-4 w-4 text-red-600" />
                      )}
                      <span>Details</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Requirements */}
              {statusData?.requirements && statusData.requirements.currentlyDue.length > 0 && (
                <Alert className="border-amber-500">
                  <AlertTriangle className="h-4 w-4 text-amber-600" />
                  <AlertDescription>
                    <p className="font-semibold mb-2">Information Required</p>
                    <ul className="list-disc list-inside space-y-1 text-sm">
                      {statusData.requirements.currentlyDue.map((req) => (
                        <li key={req}>{req.replace(/_/g, ' ')}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Pending Verification */}
              {statusData?.requirements && statusData.requirements.pendingVerification.length > 0 && (
                <Alert className="border-blue-500">
                  <Clock className="h-4 w-4 text-blue-600" />
                  <AlertDescription>
                    <p className="font-semibold mb-2">Verification in Progress</p>
                    <p className="text-sm">Stripe is currently verifying:</p>
                    <ul className="list-disc list-inside space-y-1 text-sm mt-1">
                      {statusData.requirements.pendingVerification.map((req) => (
                        <li key={req}>{req.replace(/_/g, ' ')}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {/* Errors */}
              {statusData?.requirements && statusData.requirements.errors.length > 0 && (
                <Alert className="border-red-500">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription>
                    <p className="font-semibold mb-2">Verification Errors</p>
                    <ul className="space-y-2 text-sm">
                      {statusData.requirements.errors.map((err, idx) => (
                        <li key={idx}>
                          <strong>{err.requirement.replace(/_/g, ' ')}:</strong> {err.reason}
                        </li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}

              {error && (
                <Alert className="border-red-500">
                  <XCircle className="h-4 w-4 text-red-600" />
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}

              <Button
                onClick={startStripeOnboarding}
                disabled={starting}
                className="w-full"
                size="lg"
              >
                {starting ? (
                  <>
                    <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                    Opening Stripe…
                  </>
                ) : (
                  <>
                    <ExternalLink className="h-4 w-4 mr-2" />
                    {payoutsConfigured ? 'Update Stripe details' : 'Connect Stripe payouts'}
                  </>
                )}
              </Button>

              <Button asChild variant="outline" className="w-full">
                <Link href="/dashboard/contractor/onboarding">Back to training</Link>
              </Button>
            </>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
