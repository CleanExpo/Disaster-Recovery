'use client';

import { Suspense, useState, useEffect } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';

function VerifyEmailForm() {
  const searchParams = useSearchParams();
  const token = searchParams.get('token') || '';
  const [status, setStatus] = useState<'idle' | 'loading' | 'ok' | 'error'>('idle');
  const [message, setMessage] = useState('');

  useEffect(() => {
    if (!token) return;
    let cancelled = false;
    (async () => {
      setStatus('loading');
      try {
        const res = await fetch('/api/auth/verify-email', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ token }),
        });
        const data = await res.json().catch(() => ({}));
        if (cancelled) return;
        if (!res.ok) {
          setStatus('error');
          setMessage(data.error || 'Verification failed');
          return;
        }
        setStatus('ok');
        setMessage(data.message || 'Email verified.');
      } catch {
        if (!cancelled) {
          setStatus('error');
          setMessage('Verification failed');
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [token]);

  return (
    <div className="flex min-h-screen items-center justify-center bg-[var(--ag-background-light,#f4f6f8)] px-4">
      <div className="w-full max-w-md space-y-6 rounded-2xl border bg-white p-8 text-center shadow-sm">
        <h1 className="text-2xl font-bold text-[var(--ag-primary-blue)]">Verify email</h1>
        {!token && (
          <p className="text-sm text-red-600" role="alert">
            Missing verification token.
          </p>
        )}
        {status === 'loading' && <p className="text-sm text-[var(--ag-text-grey)]">Verifying…</p>}
        {status === 'ok' && (
          <p className="text-sm text-emerald-700" role="status">
            {message}
          </p>
        )}
        {status === 'error' && (
          <p className="text-sm text-red-600" role="alert">
            {message}
          </p>
        )}
        <Button asChild className="min-h-[44px] w-full">
          <Link href="/login">Continue to sign in</Link>
        </Button>
      </div>
    </div>
  );
}

export default function VerifyEmailPage() {
  return (
    <Suspense fallback={<div className="flex min-h-screen items-center justify-center">Loading…</div>}>
      <VerifyEmailForm />
    </Suspense>
  );
}
