'use client';

import { Suspense, useMemo, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { AntigravityFooter, AntigravityNavbar, AgFormShell } from '@/components/antigravity';
import { CheckCircle2, KeyRound, Loader2, ShieldCheck } from 'lucide-react';
import {
  authInputClassName,
  authPrimaryButtonClassName,
} from '@/components/auth/AuthPageChrome';
import { setContractorAuth } from '@/lib/contractor-auth';

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
        credentials: 'include',
        body: JSON.stringify({ token, password }),
      });
      const data = (await response.json().catch(() => ({}))) as {
        error?: string;
        redirectTo?: string;
        profile?: Record<string, unknown>;
        contractorId?: string;
        email?: string;
        username?: string;
        status?: string;
      };
      if (!response.ok) {
        setError(data.error ?? 'The activation link could not be used.');
        return;
      }

      if (data.profile) {
        setContractorAuth(data.profile);
      } else if (data.contractorId) {
        setContractorAuth({
          id: data.contractorId,
          email: data.email,
          username: data.username,
          status: data.status,
          role: 'CONTRACTOR',
        });
      }

      setActivated(true);
      setTimeout(() => router.push(data.redirectTo || '/contractor/portal'), 1200);
    } catch {
      setError('Activation failed. Please try again.');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <div className="ag-page-elevated flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: 'var(--ag-primary-blue)' }}
          >
            {activated ? (
              <CheckCircle2 className="h-7 w-7 text-white" aria-hidden="true" />
            ) : (
              <KeyRound className="h-7 w-7 text-white" aria-hidden="true" />
            )}
          </div>
          <h1 className="text-2xl font-bold text-[var(--ag-primary-blue)]">
            Activate contractor account
          </h1>
          <p className="mt-1 text-sm text-[var(--ag-text-grey)]">
            Set your password to access the NRPG contractor portal.
          </p>
        </div>

        <AgFormShell>
          {!token && (
            <div
              role="alert"
              className="mb-4 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-800"
            >
              This activation link is missing a token. Open the latest activation email from NRPG.
            </div>
          )}

          {activated ? (
            <div
              role="status"
              className="rounded-lg border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800"
            >
              Account activated. Taking you to the contractor portal…
            </div>
          ) : (
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div>
                <label
                  className="mb-1.5 block text-sm font-medium text-[var(--ag-text-dark)]"
                  htmlFor="password"
                >
                  New password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  className={authInputClassName}
                  autoComplete="new-password"
                />
              </div>

              <div>
                <label
                  className="mb-1.5 block text-sm font-medium text-[var(--ag-text-dark)]"
                  htmlFor="confirmPassword"
                >
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className={authInputClassName}
                  autoComplete="new-password"
                />
              </div>

              <div className="rounded-lg border border-[var(--ag-border-grey)] bg-[var(--ag-background-light)] p-4">
                <div className="mb-3 flex items-center gap-2 text-sm font-medium text-[var(--ag-text-dark)]">
                  <ShieldCheck className="h-4 w-4" style={{ color: 'var(--ag-secondary-blue)' }} />
                  Password requirements
                </div>
                <div className="grid gap-2 text-sm">
                  {checks.map((check) => (
                    <div
                      key={check.label}
                      className={check.ok ? 'text-emerald-700' : 'text-[var(--ag-text-grey)]'}
                    >
                      {check.ok ? '✓' : '•'} {check.label}
                    </div>
                  ))}
                  {confirmPassword && password !== confirmPassword && (
                    <div className="text-red-600">Passwords must match</div>
                  )}
                </div>
              </div>

              {error && (
                <div role="alert" className="rounded-lg border border-red-200 bg-red-50 p-3 text-sm text-red-800">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={!canSubmit}
                className={authPrimaryButtonClassName}
                style={{ background: 'var(--ag-primary-blue)' }}
              >
                {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Activate account
              </button>

              <Link
                href="/contractor/login"
                className="flex min-h-[44px] items-center justify-center text-sm font-medium text-[var(--ag-primary-blue)] hover:underline"
              >
                Already activated? Go to login
              </Link>
            </form>
          )}
        </AgFormShell>
      </div>
    </div>
  );
}

export default function ContractorActivatePage() {
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
        <ContractorActivateContent />
      </Suspense>
      <AntigravityFooter />
    </>
  );
}
