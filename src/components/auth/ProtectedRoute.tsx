'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Loader2, Lock, AlertTriangle } from 'lucide-react';
import { usePermissions } from '@/hooks/usePermissions';
import { Permission, UserRole } from '@/types/rbac';

interface ProtectedRouteProps {
  children: React.ReactNode;
  permissions?: Permission[];
  roles?: UserRole[];
  requireAll?: boolean; // If true, requires ALL permissions. If false, requires ANY permission
  resource?: string;
  resourceId?: string;
  action?: string;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export function ProtectedRoute({
  children,
  permissions = [],
  roles = [],
  requireAll = false,
  resource,
  resourceId,
  action,
  fallback,
  redirectTo = '/unauthorized'
}: ProtectedRouteProps) {
  const router = useRouter();
  const { user, loading, hasAnyPermission, hasAllPermissions, canAccess } = usePermissions();
  const [authorised, setAuthorized] = useState<boolean | null>(null);

  useEffect(() => {
    if (loading) return;

    if (!user) {
      router.push('/login');
      return;
    }

    let hasAccess = false;

    // Check role-based access
    if (roles.length > 0) {
      hasAccess = roles.includes(user.role);
    }

    // Check permission-based access
    if (permissions.length > 0 && !hasAccess) {
      hasAccess = requireAll 
        ? hasAllPermissions(permissions)
        : hasAnyPermission(permissions);
    }

    // Check resource-based access
    if (resource && !hasAccess) {
      hasAccess = canAccess(resource, action, resourceId);
    }

    // If no specific requirements, allow access
    if (roles.length === 0 && permissions.length === 0 && !resource) {
      hasAccess = true;
    }

    setAuthorized(hasAccess);

    if (!hasAccess && redirectTo) {
      router.push(redirectTo);
    }
  }, [user, loading, permissions, roles, requireAll, resource, resourceId, action]);

  if (loading || authorised === null) {
    return (
      <div className="flex items-centre justify-centre min-h-[400px]">
        <div className="text-centre">
          <Loader2 className="h-8 w-8 animate-spin mx-auto text-gray-400" />
          <p className="text-sm text-gray-500 mt-2">Checking permissions...</p>
        </div>
      </div>
    );
  }

  if (!authorised) {
    if (fallback) {
      return <>{fallback}</>;
    }

    return (
      <div className="flex items-centre justify-centre min-h-[400px]">
        <Alert className="max-w-md">
          <Lock className="h-4 w-4" />
          <AlertDescription>
            <strong>Access Denied</strong>
            <p className="mt-2">You don't have permission to access this resource.</p>
            <p className="text-sm text-gray-500 mt-1">
              Required: {permissions.join(', ') || roles.join(', ') || resource}
            </p>
          </AlertDescription>
        </Alert>
      </div>
    );
  }

  return <>{children}</>;
}

// Convenience components for common access patterns
export function PortalAdminOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <ProtectedRoute roles={['portal_admin']} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function ContractorAdminOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <ProtectedRoute roles={['contractor_admin']} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function AuditorOnly({ children, fallback }: { children: React.ReactNode; fallback?: React.ReactNode }) {
  return (
    <ProtectedRoute roles={['compliance_auditor']} fallback={fallback}>
      {children}
    </ProtectedRoute>
  );
}

export function CompanyMemberOnly({ children, companyId, fallback }: { 
  children: React.ReactNode; 
  companyId: string;
  fallback?: React.ReactNode;
}) {
  return (
    <ProtectedRoute 
      resource="company" 
      resourceId={companyId} 
      action="view"
      fallback={fallback}
    >
      {children}
    </ProtectedRoute>
  );
}

// Component-level protection wrapper
interface ProtectedComponentProps {
  children: React.ReactNode;
  permission?: Permission;
  showMessage?: boolean;
  message?: string;
}

export function ProtectedComponent({
  children,
  permission,
  showMessage = true,
  message = 'You need additional permissions to view this content'
}: ProtectedComponentProps) {
  const { hasPermission } = usePermissions();
  
  if (!permission || hasPermission(permission)) {
    return <>{children}</>;
  }

  if (!showMessage) {
    return null;
  }

  return (
    <div className="p-4 bg-gray-50 rounded-lg border border-gray-200">
      <div className="flex items-centre gap-2 text-gray-600">
        <Lock className="h-4 w-4" />
        <p className="text-sm">{message}</p>
      </div>
    </div>
  );
}

// Action protection wrapper
interface ProtectedActionProps {
  children: (props: { onClick: () => void; disabled: boolean }) => React.ReactNode;
  permission?: Permission;
  resource?: string;
  resourceId?: string;
  action?: string;
  onUnauthorized?: () => void;
  onAction: () => void;
}

export function ProtectedAction({
  children,
  permission,
  resource,
  resourceId,
  action,
  onUnauthorized,
  onAction
}: ProtectedActionProps) {
  const { hasPermission, canAccess } = usePermissions();
  const { logAction } = useAuditLog();
  
  const checkAccess = (): boolean => {
    if (permission && !hasPermission(permission)) return false;
    if (resource && !canAccess(resource, action, resourceId)) return false;
    return true;
  };
  
  const handleClick = async () => {
    const hasAccess = checkAccess();
    
    // Log the attempt
    await logAction(
      action || 'action_attempt',
      resource || 'unknown',
      resourceId,
      { authorised: hasAccess }
    );
    
    if (!hasAccess) {
      if (onUnauthorized) {
        onUnauthorized();
      }
      return;
    }
    
    onAction();
  };
  
  return (
    <>
      {children({
        onClick: handleClick,
        disabled: !checkAccess()
      })}
    </>
  );
}

// Audit logging hook import
function useAuditLog() {
  const { user } = usePermissions();
  
  const logAction = async (
    action: string,
    resource: string,
    resourceId?: string,
    metadata?: Record<string, any>
  ) => {
    if (!user) return;
    
    try {
      await fetch('/api/audit/log', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: user.id,
          userRole: user.role,
          action,
          resource,
          resourceId,
          metadata,
          timestamp: new Date().toISOString()
        })
      });
    } catch (error) {
      console.error('Failed to log audit action:', error);
    }
  };
  
  return { logAction };
}