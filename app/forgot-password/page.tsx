'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [devHint, setDevHint] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setMessage('');
    setDevHint('');
    try {
      const res = await fetch('/api/auth/forgot-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Request failed');
        return;
      }
      setMessage(
        data.message ||
          'If an account exists for that email, password reset instructions have been sent.',
      );
      if (data.resetPath) {
        setDevHint(data.resetPath as string);
      }
    } catch {
      setError('Request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--ag-background-light,#f4f6f8)] px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border border-[var(--ag-border-light,#e5e7eb)] bg-white p-8 shadow-sm">
        <div className="text-center space-y-2">
          <h1 className="text-2xl font-bold text-[var(--ag-primary-blue)]">Forgot password</h1>
          <p className="text-sm text-[var(--ag-text-grey)]">
            Enter your email and we&apos;ll send reset instructions if an account exists.
          </p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full min-h-[44px] rounded-md border border-gray-300 px-3 py-3 text-sm"
            />
          </div>
          {error && (
            <p role="alert" className="text-sm text-red-600">
              {error}
            </p>
          )}
          {message && (
            <p role="status" className="text-sm text-emerald-700">
              {message}
            </p>
          )}
          {devHint && (
            <p className="text-xs text-[var(--ag-text-grey)] break-all">
              Dev reset link:{' '}
              <Link href={devHint} className="underline text-[var(--ag-primary-blue)]">
                {devHint}
              </Link>
            </p>
          )}
          <Button type="submit" className="w-full min-h-[44px]" disabled={loading}>
            {loading ? 'Sending…' : 'Send reset link'}
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
