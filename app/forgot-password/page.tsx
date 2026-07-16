'use client';

import { useState } from 'react';
import Link from 'next/link';
import { AntigravityFooter, AntigravityNavbar } from '@/components/antigravity';
import {
  AuthPageChrome,
  authInputClassName,
  authPrimaryButtonClassName,
} from '@/components/auth/AuthPageChrome';

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
      if (data.resetPath) setDevHint(data.resetPath as string);
    } catch {
      setError('Request failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <AntigravityNavbar />
      <AuthPageChrome
        title="Forgot password"
        subtitle="Enter your email and we will send reset instructions if an account exists."
        footer={
          <Link href="/login" className="font-semibold text-[var(--ag-primary-blue)] hover:underline">
            Back to sign in
          </Link>
        }
      >
        <form onSubmit={onSubmit} className="space-y-4">
          <div className="space-y-2">
            <label htmlFor="email" className="text-sm font-medium text-[var(--ag-text-dark)]">
              Email
            </label>
            <input
              id="email"
              type="email"
              required
              autoComplete="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={authInputClassName}
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
            <p className="break-all text-xs text-[var(--ag-text-grey)]">
              Dev reset link:{' '}
              <Link href={devHint} className="underline text-[var(--ag-primary-blue)]">
                {devHint}
              </Link>
            </p>
          )}
          <button
            type="submit"
            className={authPrimaryButtonClassName}
            style={{ background: 'var(--ag-primary-blue)' }}
            disabled={loading}
          >
            {loading ? 'Sending…' : 'Send reset link'}
          </button>
        </form>
      </AuthPageChrome>
      <AntigravityFooter />
    </>
  );
}
