'use client';

import { useEffect, useMemo, useState } from 'react';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, ExternalLink, CheckCircle2 } from 'lucide-react';

interface StripeConnectStatusResponse {
  success?: boolean;
  payoutsConfigured?: boolean;
  stripeConnectAccountId?: string | null;
}

export default function ContractorPayoutSetupPage() {
  const { status } = useSession();
  const searchParams = useSearchParams();
  const stripeResult = useMemo(() => searchParams.get('stripe'), [searchParams]);

  const [loadingStatus, setLoadingStatus] = useState(true);
  const [starting, setStarting] = useState(false);
  const [payoutsConfigured, setPayoutsConfigured] = useState(false);
  const [connectAccountId, setConnectAccountId] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const loadStatus = async () => {
    setError(null);
    setLoadingStatus(true);
    try {
      const response = await fetch('/api/contractor/stripe/connect/status', { cache: 'no-store' });
      const data = (await response.json().catch(() => null)) as StripeConnectStatusResponse | null;
      setPayoutsConfigured(Boolean(data?.success && data?.payoutsConfigured));
      setConnectAccountId(typeof data?.stripeConnectAccountId === 'string' ? data.stripeConnectAccountId : null);
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to load payout status');
    } finally {
      setLoadingStatus(false);
    }
  };

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
              {connectAccountId && (
                <p className="text-sm text-muted-foreground">Connect account: {connectAccountId}</p>
              )}

              {error && <p className="text-sm text-red-600">{error}</p>}

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
