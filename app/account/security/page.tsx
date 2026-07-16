'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { AuthShell } from '@/components/auth/AuthShell';
import type { AppRole } from '@/lib/auth/roles';
import { Button } from '@/components/ui/button';

export default function AccountSecurityPage() {
  const router = useRouter();
  const [role, setRole] = useState<AppRole>('CLIENT');
  const [email, setEmail] = useState<string | null>(null);
  const [name, setName] = useState<string | null>(null);
  const [ready, setReady] = useState(false);

  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    void fetch('/api/auth/me', { credentials: 'include' })
      .then(async (res) => {
        if (!res.ok) {
          router.replace('/login?callbackUrl=/account/security&reason=session_expired');
          return;
        }
        const data = await res.json();
        setRole(data.user.role as AppRole);
        setEmail(data.user.email);
        setName(data.user.name);
        setReady(true);
      })
      .catch(() => {
        router.replace('/login?callbackUrl=/account/security');
      });
  }, [router]);

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (newPassword !== confirm) {
      setError('New passwords do not match');
      return;
    }
    setLoading(true);
    try {
      const res = await fetch('/api/auth/change-password', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include',
        body: JSON.stringify({ currentPassword, newPassword }),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(data.error || 'Failed to change password');
        return;
      }
      setSuccess('Password updated.');
      setCurrentPassword('');
      setNewPassword('');
      setConfirm('');
    } catch {
      setError('Failed to change password');
    } finally {
      setLoading(false);
    }
  };

  if (!ready) {
    return (
      <div className="flex min-h-screen items-center justify-center text-[var(--ag-text-grey)]">
        Loading…
      </div>
    );
  }

  return (
    <AuthShell role={role} email={email} name={name}>
      <div className="mx-auto max-w-md space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-[var(--ag-primary-blue)]">Security</h1>
          <p className="mt-1 text-sm text-[var(--ag-text-grey)]">Change your password.</p>
        </div>
        <form onSubmit={onSubmit} className="space-y-4 rounded-xl border bg-white p-6">
          <div className="space-y-2">
            <label htmlFor="current" className="text-sm font-medium">
              Current password
            </label>
            <input
              id="current"
              type="password"
              autoComplete="current-password"
              required
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
              className="w-full min-h-[44px] rounded-md border px-3 py-3 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="new" className="text-sm font-medium">
              New password
            </label>
            <input
              id="new"
              type="password"
              autoComplete="new-password"
              required
              minLength={8}
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              className="w-full min-h-[44px] rounded-md border px-3 py-3 text-sm"
            />
          </div>
          <div className="space-y-2">
            <label htmlFor="confirm" className="text-sm font-medium">
              Confirm new password
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
          {success && (
            <p role="status" className="text-sm text-emerald-700">
              {success}
            </p>
          )}
          <Button type="submit" className="w-full min-h-[44px]" disabled={loading}>
            {loading ? 'Updating…' : 'Update password'}
          </Button>
        </form>
      </div>
    </AuthShell>
  );
}
