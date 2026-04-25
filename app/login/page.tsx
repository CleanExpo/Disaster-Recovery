'use client';

import { Suspense, useState } from 'react';
import { signIn } from 'next-auth/react';
import { useRouter, useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';
import { Button } from '@/components/ui/button';

function LoginPageOriginal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get('callbackUrl') || '';
  const reason = searchParams.get('reason');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // Context banners: session_expired (DR-756) + registered (DR-758)
  const [showExpiredBanner, setShowExpiredBanner] = useState(reason === 'session_expired');
  const [showRegisteredBanner, setShowRegisteredBanner] = useState(
    searchParams.get('registered') === 'true',
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const result = await signIn('credentials', {
        email,
        password,
        redirect: false,
      });

      if (result?.error) {
        setError('Invalid email or password');
      } else {
        // Use callbackUrl when present (e.g. /admin); otherwise default to /dashboard.
        // Admin layout will redirect non-admins to /dashboard when they hit /admin.
        const url =
          callbackUrl && callbackUrl.startsWith('/admin')
            ? callbackUrl
            : callbackUrl || '/dashboard';
        router.push(url);
        router.refresh();
      }
    } catch {
      setError('An error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-muted/40">
      <style>{`
        .login-form-input::placeholder { color: #6b7280; }
      `}</style>
      <div className="mx-auto w-full max-w-md space-y-6 rounded-lg border bg-card p-8">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold">Welcome back</h1>
          <p className="text-muted-foreground">Enter your credentials to access your account</p>
        </div>

        {/* Registration success banner (DR-758) */}
        {showRegisteredBanner && (
          <div
            role="status"
            aria-live="polite"
            className="flex items-start gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-800"
          >
            <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="flex-1">Account created! Please sign in to continue.</span>
            <button
              onClick={() => setShowRegisteredBanner(false)}
              aria-label="Dismiss"
              className="shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-emerald-600"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        {/* Session expired banner (DR-756) */}
        {showExpiredBanner && (
          <div
            role="alert"
            aria-live="assertive"
            className="flex items-start gap-3 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800"
          >
            <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
            <span className="flex-1">Your session expired — please sign in again.</span>
            <button
              onClick={() => setShowExpiredBanner(false)}
              aria-label="Dismiss"
              className="shrink-0 rounded focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-1 focus-visible:outline-amber-600"
            >
              <X className="h-4 w-4" aria-hidden="true" />
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="login-form-input w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm min-h-[44px]"
              placeholder="you@example.com"
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            />
          </div>

          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              Password
            </label>
            <input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="login-form-input w-full rounded-md border border-gray-300 bg-white px-3 py-3 text-sm min-h-[44px]"
              placeholder="••••••••"
              style={{ color: '#111827', backgroundColor: '#ffffff' }}
            />
          </div>

          {error && (
            <p role="alert" className="text-sm text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? 'Signing in...' : 'Sign in'}
          </Button>
        </form>

        <div className="text-center text-sm">
          Don&apos;t have an account?{' '}
          <Link href="/signup" className="text-primary hover:underline">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function LoginPage() {
  return (
    <Suspense
      fallback={<div className="flex min-h-screen items-center justify-center">Loading…</div>}
    >
      <LoginPageOriginal />
    </Suspense>
  );
}
