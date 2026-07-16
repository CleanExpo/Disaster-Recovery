'use client';

import { Suspense, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import {
  AuthPageChrome,
  authInputClassName,
  authPrimaryButtonClassName,
} from '@/components/auth/AuthPageChrome';
import { AntigravityFooter, AntigravityNavbar } from '@/components/antigravity';

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
    <AuthPageChrome
      title="Welcome back"
      subtitle="Sign in to your Disaster Recovery account"
      footer={
        <>
          <p>
            Don&apos;t have an account?{' '}
            <Link href="/signup" className="font-semibold text-[var(--ag-primary-blue)] hover:underline">
              Sign up
            </Link>
          </p>
          <p className="mt-2">
            Contractor?{' '}
            <Link
              href="/contractor/login"
              className="font-semibold text-[var(--ag-primary-blue)] hover:underline"
            >
              Contractor portal
            </Link>
            {' · '}
            <Link
              href="/contractor/apply"
              className="font-semibold text-[var(--ag-primary-blue)] hover:underline"
            >
              Apply
            </Link>
          </p>
        </>
      }
    >
      {showExpiredBanner && (
        <div
          role="alert"
          className="mb-4 flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex-1">Your session expired — please sign in again.</span>
          <button
            type="button"
            onClick={() => setShowExpiredBanner(false)}
            aria-label="Dismiss"
            className="min-h-[44px] min-w-[44px] shrink-0 rounded"
          >
            <X className="mx-auto h-4 w-4" aria-hidden="true" />
          </button>
        </div>
      )}

      {showRegisteredBanner && (
        <div
          role="status"
          aria-live="polite"
          className="mb-4 flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
        >
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
          <span className="flex-1">Account created! Please sign in to continue.</span>
          <button
            type="button"
            onClick={() => setShowRegisteredBanner(false)}
            aria-label="Dismiss"
            className="min-h-[44px] min-w-[44px] shrink-0 rounded"
          >
            <X className="mx-auto h-4 w-4" aria-hidden="true" />
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
            className={authInputClassName}
            placeholder="you@example.com"
          />
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between gap-2">
            <label htmlFor="password" className="text-sm font-medium text-[var(--ag-text-dark)]">
              Password
            </label>
            <Link
              href="/forgot-password"
              className="min-h-[44px] inline-flex items-center text-xs font-medium text-[var(--ag-primary-blue)] hover:underline"
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
            className={authInputClassName}
            placeholder="••••••••"
          />
        </div>

        <label className="flex min-h-[44px] items-center gap-2 text-sm text-[var(--ag-text-dark)]">
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

        <button
          type="submit"
          className={authPrimaryButtonClassName}
          style={{ background: 'var(--ag-primary-blue)' }}
          disabled={isLoading}
        >
          {isLoading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>
    </AuthPageChrome>
  );
}

export default function LoginPage() {
  return (
    <>
      <AntigravityNavbar />
      <Suspense
        fallback={
          <div className="flex min-h-[50vh] items-center justify-center text-[var(--ag-text-grey)]">
            Loading…
          </div>
        }
      >
        <LoginForm />
      </Suspense>
      <AntigravityFooter />
    </>
  );
}
