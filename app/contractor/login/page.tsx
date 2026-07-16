'use client';

import {
  AntigravityNavbar,
  AntigravityFooter,
  AgFormShell,
} from '@/components/antigravity';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { setContractorAuth } from '@/lib/contractor-auth';
import {
  Building2,
  Lock,
  User,
  Eye,
  EyeOff,
  LogIn,
  AlertCircle,
  ArrowLeft,
} from 'lucide-react';

function ContractorLoginForm() {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await fetch('/api/contractor/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ ...formData, rememberMe }),
      });

      if (response.ok) {
        const data = await response.json();
        setContractorAuth(data);
        router.push('/contractor/portal');
      } else {
        const errData = await response.json().catch(() => null);
        setError(errData?.error || 'Invalid username or password.');
      }
    } catch {
      setError('Connection error. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="ag-page-elevated flex min-h-[70vh] items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <div
            className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl"
            style={{ background: 'var(--ag-primary-blue)' }}
          >
            <Building2 className="h-7 w-7 text-white" aria-hidden="true" />
          </div>
          <h1 className="text-2xl font-bold text-[var(--ag-primary-blue)]">
            NRPG contractor portal
          </h1>
          <p className="mt-1 text-sm text-[var(--ag-text-grey)]">
            Sign in to manage jobs, leads, and documentation
          </p>
        </div>

        <AgFormShell>
          <form onSubmit={handleSubmit} className="space-y-5">
            {error && (
              <div
                role="alert"
                className="flex items-start gap-2 rounded-lg border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800"
              >
                <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" aria-hidden="true" />
                {error}
              </div>
            )}

            <div>
              <label
                htmlFor="username"
                className="mb-1.5 block text-sm font-medium text-[var(--ag-text-dark)]"
              >
                Username or email
              </label>
              <div className="relative">
                <User
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ag-text-grey)]"
                  aria-hidden="true"
                />
                <input
                  id="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                  className="w-full rounded-lg border border-[var(--ag-border-grey)] py-2.5 pl-10 pr-3 text-[var(--ag-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--ag-secondary-blue)]"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-medium text-[var(--ag-text-dark)]"
              >
                Password
              </label>
              <div className="relative">
                <Lock
                  className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[var(--ag-text-grey)]"
                  aria-hidden="true"
                />
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                  className="w-full rounded-lg border border-[var(--ag-border-grey)] py-2.5 pl-10 pr-10 text-[var(--ag-text-dark)] focus:outline-none focus:ring-2 focus:ring-[var(--ag-secondary-blue)]"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[var(--ag-text-grey)] hover:text-[var(--ag-primary-blue)]"
                  aria-label={showPassword ? 'Hide password' : 'Show password'}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <label className="flex items-center gap-2 text-sm text-[var(--ag-text-grey)]">
              <input
                type="checkbox"
                checked={rememberMe}
                onChange={(e) => setRememberMe(e.target.checked)}
                className="rounded border-[var(--ag-border-grey)]"
              />
              Remember me on this device
            </label>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg py-3 font-semibold text-white hover:opacity-90 disabled:opacity-50"
              style={{ background: 'var(--ag-primary-blue)' }}
            >
              {isLoading ? (
                'Signing in…'
              ) : (
                <>
                  <LogIn className="h-5 w-5" aria-hidden="true" />
                  Sign in
                </>
              )}
            </button>

            <p className="text-center text-xs text-[var(--ag-text-grey)]">
              New to NRPG?{' '}
              <Link
                href="/contractor/apply"
                className="font-semibold text-[var(--ag-secondary-blue)] underline"
              >
                Apply to join
              </Link>
            </p>
          </form>
        </AgFormShell>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="inline-flex items-center text-sm text-[var(--ag-text-grey)] hover:text-[var(--ag-primary-blue)]"
          >
            <ArrowLeft className="mr-1 h-4 w-4" aria-hidden="true" />
            Back to main site
          </Link>
        </div>
      </div>
    </div>
  );
}

export default function ContractorLoginPage() {
  return (
    <>
      <AntigravityNavbar />
      <ContractorLoginForm />
      <AntigravityFooter />
    </>
  );
}
