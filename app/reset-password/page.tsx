'use client';

import { Suspense, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AntigravityFooter, AntigravityNavbar } from '@/components/antigravity';
import {
  AuthPageChrome,
  authInputClassName,
  authPrimaryButtonClassName,
} from '@/components/auth/AuthPageChrome';

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
    <AuthPageChrome
      title="Reset password"
      subtitle="Choose a new password for your account."
      footer={
        <Link href="/login" className="font-semibold text-[var(--ag-primary-blue)] hover:underline">
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={onSubmit} className="space-y-4">
        {!tokenFromUrl && (
          <div className="space-y-2">
            <label htmlFor="token" className="text-sm font-medium text-[var(--ag-text-dark)]">
              Reset token
            </label>
            <input
              id="token"
              value={token}
              onChange={(e) => setToken(e.target.value)}
              required
              className={authInputClassName}
            />
          </div>
        )}
        <div className="space-y-2">
          <label htmlFor="password" className="text-sm font-medium text-[var(--ag-text-dark)]">
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
            className={authInputClassName}
          />
        </div>
        <div className="space-y-2">
          <label htmlFor="confirm" className="text-sm font-medium text-[var(--ag-text-dark)]">
            Confirm password
          </label>
          <input
            id="confirm"
            type="password"
            autoComplete="new-password"
            required
            value={confirm}
            onChange={(e) => setConfirm(e.target.value)}
            className={authInputClassName}
          />
        </div>
        {error && (
          <p role="alert" className="text-sm text-red-600">
            {error}
          </p>
        )}
        <button
          type="submit"
          className={authPrimaryButtonClassName}
          style={{ background: 'var(--ag-primary-blue)' }}
          disabled={loading}
        >
          {loading ? 'Updating…' : 'Update password'}
        </button>
      </form>
    </AuthPageChrome>
  );
}

export default function ResetPasswordPage() {
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
        <ResetPasswordForm />
      </Suspense>
      <AntigravityFooter />
    </>
  );
}
