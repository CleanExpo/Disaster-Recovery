'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

function ResetPasswordForm() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const tokenFromUrl = searchParams.get('token') || '';

  const [token, setToken] = useState(tokenFromUrl);
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/reset-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Reset failed');
        return;
      }
      router.push('/login?registered=true');
    } catch {
      setError('Reset failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--ag-background-light,#f4f6f8)] px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-white p-8 shadow-sm">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[var(--ag-primary-blue)]">Reset password</h1>
          <p className="text-sm text-[var(--ag-text-grey)]">Choose a new password for your account.</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          {!tokenFromUrl && (
            <div className="space-y-2">
              <label htmlFor="token" className="text-sm font-medium">
                Reset token
              </label>
              <input
                id="token"
                value={token}
                onChange={(e) => setToken(e.target.value)}
                required
                className="w-full min-h-[44px] rounded-md border px-3 py-3 text-sm"
              />
            </div>
          )}
          <div className="space-y-2">
            <label htmlFor="password" className="text-sm font-medium">
              New password
            </label>
            <input
              id="password"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full min-h-[44px] rounded-md border px-3 py-3 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirm" className="text-sm font-medium">
              Confirm password
            </label>
            <input
              id="confirm"
              type="password"
              autoComplete="new-password"
              required
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
              className="w-full min-h-[44px] rounded-md border px-3 py-3 text-sm"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
          <Button type="submit" className="w-full min-h-[44px]" disabled={loading}>
            {loading ? 'Updating…' : 'Update password'}
          </Button>
        </form>
        <p className="text-center text-sm">
          <Link href="/login" className="text-[var(--ag-primary-blue)] hover:underline">
            Back to sign in
          </Link>
        </p>
      </div>
    </div>
  );
}

export default function ResetPasswordPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading…</div>}>
      <ResetPasswordForm />
    </Suspense>
  );
}
