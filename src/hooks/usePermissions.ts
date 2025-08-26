'use client';

import { useState, useEffect, useContext, createContext, ReactNode } from 'react';
import { 
  User, 
  UserRole, 
  Permission, 
  AccessContext,
  hasPermission,
  hasAnyPermission,
  hasAllPermissions,
  canAccessResource,
  ROLE_DEFINITIONS
} from '@/types/rbac';

interface PermissionContextType {
  user: User | null;
  loading: boolean;
  hasPermission: (permission: Permission) => boolean;
  hasAnyPermission: (permissions: Permission[]) => boolean;
  hasAllPermissions: (permissions: Permission[]) => boolean;
  canAccess: (resource: string, action?: string, resourceId?: string) => boolean;
  canManageUser: (targetUserId: string) => boolean;
  refreshPermissions: () => Promise<void>;
}

const PermissionContext = createContext<PermissionContextType | undefined>(undefined);

export function PermissionProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserPermissions();
  }, []);

  const loadUserPermissions = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/auth/current-user');
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to load user permissions:', error);
    } finally {
      setLoading(false);
    }
  };

  const checkPermission = (permission: Permission): boolean => {
    if (!user) return false;
    return hasPermission(user, permission);
  };

  const checkAnyPermission = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAnyPermission(user, permissions);
  };

  const checkAllPermissions = (permissions: Permission[]): boolean => {
    if (!user) return false;
    return hasAllPermissions(user, permissions);
  };

  const canAccess = (resource: string, action?: string, resourceId?: string): boolean => {
    if (!user) return false;
    
    const context: AccessContext = {
      user,
      resource,
      action,
      resourceId,
      companyId: user.companyId
    };
    
    return canAccessResource(context);
  };

  const canManageUser = (targetUserId: string): boolean => {
    if (!user) return false;
    
    // Portal admins can manage all users
    if (user.role === 'portal_admin') return true;
    
    // Contractor admins can manage users in their company
    if (user.role === 'contractor_admin') {
      // Would need to check if target user is in same company
      return true; // Simplified for now
    }
    
    // Users can only manage themselves
    return user.id === targetUserId;
  };

  const value: PermissionContextType = {
    user,
    loading,
    hasPermission: checkPermission,
    hasAnyPermission: checkAnyPermission,
    hasAllPermissions: checkAllPermissions,
    canAccess,
    canManageUser,
    refreshPermissions: loadUserPermissions
  };

  return value;
}

// Main hook
export function usePermissions() {
  const context = useContext(PermissionContext);
  if (context === undefined) {
    throw new Error('usePermissions must be used within a PermissionProvider');
  }
  return context;
}

// Specific permission hooks
export function useHasPermission(permission: Permission): boolean {
  const { hasPermission } = usePermissions();
  return hasPermission(permission);
}

export function useHasAnyPermission(permissions: Permission[]): boolean {
  const { hasAnyPermission } = usePermissions();
  return hasAnyPermission(permissions);
}

export function useHasAllPermissions(permissions: Permission[]): boolean {
  const { hasAllPermissions } = usePermissions();
  return hasAllPermissions(permissions);
}

export function useCanAccess(resource: string, action?: string, resourceId?: string): boolean {
  const { canAccess } = usePermissions();
  return canAccess(resource, action, resourceId);
}

// Role-specific hooks
export function useIsPortalAdmin(): boolean {
  const { user } = usePermissions();
  return user?.role === 'portal_admin';
}

export function useIsContractorAdmin(): boolean {
  const { user } = usePermissions();
  return user?.role === 'contractor_admin';
}

export function useIsAuditor(): boolean {
  const { user } = usePermissions();
  return user?.role === 'compliance_auditor';
}

export function useIsTechnician(): boolean {
  const { user } = usePermissions();
  return user?.role === 'contractor_technician';
}

// Company access hook
export function useCanAccessCompany(companyId: string): boolean {
  const { user } = usePermissions();
  
  if (!user) return false;
  
  // Portal admins can access all companies
  if (user.role === 'portal_admin') return true;
  
  // Users can only access their own company
  return user.companyId === companyId;
}

// Feature access hooks
export function useCanManageBilling(): boolean {
  return useHasAnyPermission(['company.billing.view', 'portal.billing.manage']);
}

export function useCanManageCompliance(): boolean {
  return useHasAnyPermission(['company.compliance.manage', 'portal.compliance.global']);
}

export function useCanViewAuditLogs(): boolean {
  return useHasAnyPermission(['portal.audit.full', 'audit.logs.view']);
}

export function useCanManageUsers(): boolean {
  return useHasAnyPermission(['company.users.manage', 'portal.users.manage']);
}

// Action permission hooks
export function useCanEditCompanyProfile(companyId: string): boolean {
  const { user, hasPermission } = usePermissions();
  
  if (!user) return false;
  
  // Check permission
  if (!hasPermission('company.profile.edit')) return false;
  
  // Check company access
  if (user.role === 'portal_admin') return true;
  return user.companyId === companyId;
}

export function useCanApproveApplication(): boolean {
  return useHasPermission('portal.applications.review');
}

export function useCanGenerateReports(): boolean {
  return useHasAnyPermission(['audit.reports.generate', 'portal.analytics.view']);
}

// Audit logging hook
export function useAuditLog() {
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