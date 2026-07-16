'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

function LoginForm() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '';
  const reason = searchParams.get('reason');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const [showExpiredBanner, setShowExpiredBanner] = useState(reason === 'session_expired');
  const [showRegisteredBanner, setShowRegisteredBanner] = useState(
    searchParams.get('registered') === 'true',
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ email, password, rememberMe }),
      });

      const data = await res.json().catch(() => null);

      if (!res.ok) {
        setError(data?.error || 'Invalid email or password');
        return;
      }

      const redirectTo =
        callbackUrl && callbackUrl.startsWith('/')
          ? callbackUrl
          : data?.redirectTo || '/account';
      router.push(redirectTo);
      router.refresh();
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--ag-background-light,#f4f6f8)] px-4">
      <div className="mx-auto w-full max-w-md space-y-6 rounded-2xl border border-[var(--ag-border-light,#e5e7eb)] bg-white p-8 shadow-sm">
        {showExpiredBanner && (
          <div
            role="alert"
            className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="flex-1">Your session expired — please sign in again.</span>
            <button
              type="button"
              onClick={() => setShowExpiredBanner(false)}
              aria-label="Dismiss"
              className="shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-amber-600"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold text-[var(--ag-primary-blue)]">Welcome back</h1>
          <p className="text-sm text-[var(--ag-text-grey)]">
            Sign in to your Disaster Recovery account
          </p>
        </div>

        {showRegisteredBanner && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="flex-1">Account created! Please sign in to continue.</span>
            <button
              type="button"
              onClick={() => setShowRegisteredBanner(false)}
              aria-label="Dismiss"
              className="shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-600"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[var(--ag-text-dark)]">
              Email
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm min-h-[44px] text-gray-900"
              placeholder="you@example.com"
            />
          </div>

          <div className="space-y-2">
            <div className="flex items-center justify-between gap-2">
              <label
                htmlFor="password"
                className="text-sm font-medium text-[var(--ag-text-dark)]"
              >
                Password
              </label>
              <Link
                href="/forgot-password"
                className="text-xs text-[var(--ag-primary-blue)] hover:underline"
              >
                Forgot password?
              </Link>
            </div>
            <input
              id="password"
              type="password"
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm min-h-[44px] text-gray-900"
              placeholder="••••••••"
            />
          </div>

          <label className="flex items-center gap-2 text-sm text-[var(--ag-text-dark)]">
            <input
              type="checkbox"
              checked={rememberMe}
              onChange={(e) => setRememberMe(e.target.checked)}
              className="h-4 w-4 rounded border-gray-300"
            />
            Remember me for 30 days
          </label>

          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}

          <Button
            type="submit"
            className="w-full min-h-[44px]"
            disabled={isLoading}
            style={{ background: 'var(--ag-primary-blue)' }}
          >
            {isLoading ? 'Signing in…' : 'Sign in'}
          </Button>
        </form>

        <div className="space-y-2 text-center text-sm text-[var(--ag-text-grey)]">
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="text-[var(--ag-primary-blue)] hover:underline">
              Sign up
            </Link>
          </p>
          <p>
            Contractor?{' '}
            <Link
              href="/contractor/login"
              className="text-[var(--ag-primary-blue)] hover:underline"
            >
              Contractor portal
            </Link>
            {' · '}
            <Link
              href="/contractor/apply"
              className="text-[var(--ag-primary-blue)] hover:underline"
            >
              Apply
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center text-[var(--ag-text-grey)]">
          Loading…
        </div>
      }
    >
      <LoginForm />
    </Suspense>
  );
}
