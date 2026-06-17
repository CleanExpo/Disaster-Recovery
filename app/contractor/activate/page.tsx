'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AntigravityFooter, AntigravityNavbar } from '@/components/antigravity';
import { CheckCircle2, KeyRound, Loader2, ShieldCheck } from 'lucide-react';

function passwordChecks(password: string) {
  return [
    { label: 'At least 12 characters', ok: password.length >= 12 },
    { label: 'Lowercase letter', ok: /[a-z]/.test(password) },
    { label: 'Uppercase letter', ok: /[A-Z]/.test(password) },
    { label: 'Number', ok: /[0-9]/.test(password) },
    { label: 'Symbol', ok: /[^A-Za-z0-9]/.test(password) },
  ];
}

function ContractorActivateContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get('token') ?? '';
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [activated, setActivated] = useState(false);

  const checks = useMemo(() => passwordChecks(password), [password]);
  const passwordValid = checks.every((check) => check.ok);
  const canSubmit =
    token.length > 0 && passwordValid && password === confirmPassword && !submitting;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);

    if (!canSubmit) {
      setError('Please complete the password requirements before activating your account.');
      return;
    }

    setSubmitting(true);
    try {
      const response = await fetch('/api/contractor/activate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ token, password }),
      });
      const data = (await response.json().catch(() => ({}))) as { error?: string };
      if (!response.ok) {
        setError(data.error ?? 'The activation link could not be used.');
        return;
      }

      setActivated(true);
      setTimeout(() => router.push('/contractor/login'), 1200);
    } catch {
      setError('Activation failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-950 text-white">
      <div className="mx-auto flex min-h-screen w-full max-w-xl flex-col justify-center px-4 py-12">
        <div className="rounded-lg border border-slate-800 bg-slate-900 p-6 shadow-2xl">
          <div className="mb-6 flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-blue-500/15">
              {activated ? (
                <CheckCircle2 className="h-6 w-6 text-emerald-300" />
              ) : (
                <KeyRound className="h-6 w-6 text-blue-300" />
              )}
            </div>
            <div>
              <h1 className="text-2xl font-bold">Activate Contractor Account</h1>
              <p className="text-sm text-slate-300">
                Set your password to access the NRPG onboarding programme.
              </p>
            </div>
          </div>

          {!token && (
            <div className="rounded-md border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-100">
              This activation link is missing a token. Open the latest activation email from NRPG.
            </div>
          )}

          {activated ? (
            <div className="rounded-md border border-emerald-500/30 bg-emerald-500/10 p-4 text-sm text-emerald-100">
              Account activated. Taking you to contractor login now.
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label className="mb-2 block text-sm font-medium text-slate-200" htmlFor="password">
                  New password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-3 text-white outline-none focus:border-blue-400"
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label
                  className="mb-2 block text-sm font-medium text-slate-200"
                  htmlFor="confirmPassword"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-md border border-slate-700 bg-slate-950 px-3 py-3 text-white outline-none focus:border-blue-400"
                  autoComplete="new-password"
                />
              </div>

              <div className="rounded-md border border-slate-800 bg-slate-950 p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-slate-200">
                  <ShieldCheck className="h-4 w-4 text-blue-300" />
                  Password requirements
                </div>
                <div className="grid gap-2 text-sm">
                  {checks.map((check) => (
                    <div
                      key={check.label}
                      className={check.ok ? 'text-emerald-300' : 'text-slate-400'}
                    >
                      {check.ok ? '✓' : '•'} {check.label}
                    </div>
                  ))}
                  {confirmPassword && password !== confirmPassword && (
                    <div className="text-red-300">Passwords must match</div>
                  )}
                </div>
              </div>

              {error && (
                <div className="rounded-md border border-red-500/30 bg-red-500/10 p-3 text-sm text-red-100">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className="flex w-full items-center justify-center gap-2 rounded-md bg-blue-600 px-4 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-700"
              >
                {submitting && <Loader2 className="h-4 w-4 animate-spin" />}
                Activate account
              </button>

              <Link
                href="/contractor/login"
                className="block text-center text-sm text-blue-300 hover:text-blue-200"
              >
                Already activated? Go to login
              </Link>
            </form>
          )}
        </div>
      </div>
    </main>
  );
}

export default function ContractorActivatePage() {
  return (
    <>
      <AntigravityNavbar />
      <Suspense fallback={null}>
        <ContractorActivateContent />
      </Suspense>
      <AntigravityFooter />
    </>
  );
}
