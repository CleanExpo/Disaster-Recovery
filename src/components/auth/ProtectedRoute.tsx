'use client';

/**
 * Production gate: cookie session via /api/auth/me.
 * Legacy RBAC role names (portal_admin, etc.) are not production roles —
 * use AppRole CLIENT | CONTRACTOR | ADMIN | SUPER_ADMIN.
 */

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lock } from 'lucide-react';
import type { AppRole } from '@/lib/auth/roles';

interface ProtectedRouteProps {
  children: React.ReactNode;
  /** Allowed AppRoles (or legacy strings that normalise). */
  roles?: string[];
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  roles = [],
  fallback,
  redirectTo = '/login',
}: ProtectedRouteProps) {
  const router = useRouter();
  const [authorised, setAuthorised] = useState<boolean | null>(null);
  const [userRole, setUserRole] = useState<AppRole | null>(null);

  useEffect(() => {
    let cancelled = false;
    void (async () => {
      try {
        const res = await fetch('/api/auth/me', { credentials: 'include' });
        if (!res.ok) {
          if (!cancelled) {
            setAuthorised(false);
            router.push(redirectTo);
          }
          return;
        }
        const data = await res.json();
        const role = data.user?.role as AppRole;
        if (cancelled) return;
        setUserRole(role);
        const ok =
          roles.length === 0 ||
          roles.includes(role) ||
          (role === 'ADMIN' && roles.some((r) => /admin/i.test(r))) ||
          (role === 'SUPER_ADMIN' && roles.some((r) => /admin/i.test(r))) ||
          (role === 'CONTRACTOR' && roles.some((r) => /contractor/i.test(r))) ||
          (role === 'CLIENT' && roles.some((r) => /client|customer|user/i.test(r)));
        setAuthorised(ok);
        if (!ok && redirectTo) router.push(redirectTo);
      } catch {
        if (!cancelled) {
          setAuthorised(false);
          router.push(redirectTo);
        }
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [roles, redirectTo, router]);

  if (authorised === null) {
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <div className="text-center">
          <Loader2 className="mx-auto h-8 w-8 animate-spin text-gray-700" aria-hidden="true" />
          <p className="mt-2 text-sm text-gray-700">Checking permissions…</p>
        </div>
      </div>
    );
  }

  if (!authorised) {
    if (fallback) return <>{fallback}</>;
    return (
      <div className="flex min-h-[400px] items-center justify-center">
        <Alert className="max-w-md">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            <strong>Access denied</strong>
            <p className="mt-2">You do not have permission to access this resource.</p>
            {userRole && (
              <p className="mt-1 text-sm text-gray-700">Signed in as {userRole}.</p>
            )}
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}

export function AdminOnly({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <ProtectedRoute roles={['ADMIN', 'SUPER_ADMIN']} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function ContractorOnly({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <ProtectedRoute roles={['CONTRACTOR']} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function ClientOnly({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return (
    <ProtectedRoute roles={['CLIENT']} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

/** @deprecated Legacy aliases — map to production AdminOnly */
export function PortalAdminOnly({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return <AdminOnly fallback={fallback}>{children}</AdminOnly>;
}

export function ContractorAdminOnly({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return <ContractorOnly fallback={fallback}>{children}</ContractorOnly>;
}

export function ComplianceAuditorOnly({
  children,
  fallback,
}: {
  children: React.ReactNode;
  fallback?: React.ReactNode;
}) {
  return <AdminOnly fallback={fallback}>{children}</AdminOnly>;
}

export function ProtectedComponent({
  children,
  fallback = null,
}: {
  children: React.ReactNode;
  permissions?: unknown;
  permission?: unknown;
  roles?: string[];
  message?: string;
  fallback?: React.ReactNode;
}) {
  return (
    <ProtectedRoute roles={[]} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function ProtectedAction({
  children,
  onAction,
  fallback = null,
}: {
  children:
    | React.ReactNode
    | ((props: { onClick: () => void; disabled: boolean }) => React.ReactNode);
  permission?: unknown;
  onAction?: () => void;
  onUnauthorized?: () => void;
  fallback?: React.ReactNode;
}) {
  if (typeof children === 'function') {
    return (
      <>
        {children({
          onClick: () => onAction?.(),
          disabled: false,
        })}
      </>
    );
  }
  return <>{children ?? fallback}</>;
}
