// Role-Based Access Control Types

export type UserRole = 'contractor_admin' | 'contractor_technician' | 'portal_admin' | 'compliance_auditor';

export type Permission = 
  // Contractor Admin Permissions
  | 'company.profile.edit'
  | 'company.documents.manage'
  | 'company.compliance.manage'
  | 'company.users.manage'
  | 'company.billing.view'
  | 'company.subscription.manage'
  | 'company.kpi.view'
  | 'company.jobs.view'
  | 'company.support.escalate'
  | 'company.alerts.view'
  
  // Technician Permissions
  | 'jobs.assigned.view'
  | 'jobs.evidence.upload'
  | 'jobs.documentation.edit'
  | 'training.personal.view'
  | 'profile.personal.edit'
  
  // Portal Admin Permissions
  | 'portal.contractors.manage'
  | 'portal.applications.review'
  | 'portal.billing.manage'
  | 'portal.fines.manage'
  | 'portal.support.admin'
  | 'portal.compliance.global'
  | 'portal.audit.full'
  | 'portal.analytics.view'
  | 'portal.system.configure'
  | 'portal.users.manage'
  
  // Compliance Auditor Permissions
  | 'audit.compliance.view'
  | 'audit.certifications.view'
  | 'audit.insurance.view'
  | 'audit.logs.view'
  | 'audit.reports.generate'
  | 'audit.performance.view';

export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId?: string;
  permissions: Permission[];
  isActive: boolean;
  isMfaEnabled: boolean;
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

export interface RoleDefinition {
  id: UserRole;
  name: string;
  description: string;
  permissions: Permission[];
  isSystemRole: boolean;
  hierarchy: number; // Higher number = higher authority
}

export interface PermissionDefinition {
  id: Permission;
  name: string;
  description: string;
  resource: string;
  action: string;
  category: 'company' | 'jobs' | 'training' | 'profile' | 'portal' | 'audit';
}

export interface AccessContext {
  user: User;
  resource?: string;
  resourceId?: string;
  action?: string;
  companyId?: string;
}

export interface AuditEntry {
  id: string;
  userId: string;
  userRole: UserRole;
  action: string;
  resource: string;
  resourceId?: string;
  timestamp: Date;
  ipAddress: string;
  userAgent: string;
  success: boolean;
  deniedReason?: string;
  metadata?: Record<string, any>;
}

// Role Definitions
export const ROLE_DEFINITIONS: Record<UserRole, RoleDefinition> = {
  contractor_admin: {
    id: 'contractor_admin',
    name: 'Contractor Admin',
    description: 'Account manager for contractor company with full company management permissions',
    isSystemRole: true,
    hierarchy: 3,
    permissions: [
      'company.profile.edit',
      'company.documents.manage',
      'company.compliance.manage',
      'company.users.manage',
      'company.billing.view',
      'company.subscription.manage',
      'company.kpi.view',
      'company.jobs.view',
      'company.support.escalate',
      'company.alerts.view',
      // Inherited technician permissions
      'jobs.assigned.view',
      'jobs.evidence.upload',
      'jobs.documentation.edit',
      'training.personal.view',
      'profile.personal.edit'
    ]
  },
  
  contractor_technician: {
    id: 'contractor_technician',
    name: 'Contractor Technician/User',
    description: 'Field user under contractor admin for job execution and documentation',
    isSystemRole: true,
    hierarchy: 1,
    permissions: [
      'jobs.assigned.view',
      'jobs.evidence.upload',
      'jobs.documentation.edit',
      'training.personal.view',
      'profile.personal.edit'
    ]
  },
  
  portal_admin: {
    id: 'portal_admin',
    name: 'Portal Administrator',
    description: 'NRP platform administrator with full system access',
    isSystemRole: true,
    hierarchy: 10,
    permissions: [
      'portal.contractors.manage',
      'portal.applications.review',
      'portal.billing.manage',
      'portal.fines.manage',
      'portal.support.admin',
      'portal.compliance.global',
      'portal.audit.full',
      'portal.analytics.view',
      'portal.system.configure',
      'portal.users.manage',
      // Can view all contractor data
      'company.profile.edit',
      'company.documents.manage',
      'company.compliance.manage',
      'company.billing.view',
      'company.kpi.view',
      'company.jobs.view',
      'company.alerts.view'
    ]
  },
  
  compliance_auditor: {
    id: 'compliance_auditor',
    name: 'Compliance Auditor',
    description: 'Independent auditor with read-only access to compliance data',
    isSystemRole: true,
    hierarchy: 2,
    permissions: [
      'audit.compliance.view',
      'audit.certifications.view',
      'audit.insurance.view',
      'audit.logs.view',
      'audit.reports.generate',
      'audit.performance.view'
    ]
  }
};

// Permission Categories for UI grouping
export const PERMISSION_CATEGORIES = {
  company: {
    name: 'Company Management',
    description: 'Permissions related to company profile and administration',
    icon: 'Building'
  },
  jobs: {
    name: 'Jobs & Field Work',
    description: 'Permissions for job management and field documentation',
    icon: 'Briefcase'
  },
  training: {
    name: 'Training & Certification',
    description: 'Access to training materials and certification tracking',
    icon: 'GraduationCap'
  },
  profile: {
    name: 'Personal Profile',
    description: 'Manage personal account settings',
    icon: 'User'
  },
  portal: {
    name: 'Portal Administration',
    description: 'System-wide administrative functions',
    icon: 'Settings'
  },
  audit: {
    name: 'Audit & Compliance',
    description: 'Compliance monitoring and audit functions',
    icon: 'Shield'
  }
};

// Resource-based access rules
export interface ResourceAccessRule {
  resource: string;
  condition: (context: AccessContext) => boolean;
  allowedRoles?: UserRole[];
  deniedRoles?: UserRole[];
}

export const RESOURCE_ACCESS_RULES: ResourceAccessRule[] = [
  {
    resource: 'company',
    condition: (context) => {
      // Portal admins can access all companies
      if (context.user.role === 'portal_admin') return true;
      // Users can only access their own company
      return context.user.companyId === context.resourceId;
    }
  },
  {
    resource: 'job',
    condition: (context) => {
      // Portal admins and auditors can view all jobs
      if (['portal_admin', 'compliance_auditor'].includes(context.user.role)) return true;
      // Contractor admins can see all company jobs
      if (context.user.role === 'contractor_admin') {
        return context.user.companyId === context.companyId;
      }
      // Technicians can only see assigned jobs
      return context.action === 'view';
    }
  },
  {
    resource: 'billing',
    condition: (context) => {
      // Only contractor admins and portal admins can access billing
      return ['contractor_admin', 'portal_admin'].includes(context.user.role);
    },
    deniedRoles: ['contractor_technician', 'compliance_auditor']
  },
  {
    resource: 'audit_log',
    condition: (context) => {
      // Portal admins have full access
      if (context.user.role === 'portal_admin') return true;
      // Auditors have read-only access
      if (context.user.role === 'compliance_auditor') return context.action === 'view';
      // Contractor admins can view their company's logs
      if (context.user.role === 'contractor_admin') {
        return context.companyId === context.user.companyId && context.action === 'view';
      }
      return false;
    }
  }
];

// Session management
export interface UserSession {
  id: string;
  userId: string;
  userRole: UserRole;
  companyId?: string;
  permissions: Permission[];
  ipAddress: string;
  userAgent: string;
  createdAt: Date;
  expiresAt: Date;
  lastActivity: Date;
  mfaVerified: boolean;
  isActive: boolean;
}

// Role hierarchy for permission inheritance
export function canRoleAccessRole(actorRole: UserRole, targetRole: UserRole): boolean {
  const actorHierarchy = ROLE_DEFINITIONS[actorRole].hierarchy;
  const targetHierarchy = ROLE_DEFINITIONS[targetRole].hierarchy;
  return actorHierarchy >= targetHierarchy;
}

// Permission checking utilities
export function hasPermission(user: User, permission: Permission): boolean {
  return user.permissions.includes(permission);
}

export function hasAnyPermission(user: User, permissions: Permission[]): boolean {
  return permissions.some(permission => hasPermission(user, permission));
}

export function hasAllPermissions(user: User, permissions: Permission[]): boolean {
  return permissions.every(permission => hasPermission(user, permission));
}

// Resource access checking
export function canAccessResource(context: AccessContext): boolean {
  const rules = RESOURCE_ACCESS_RULES.filter(rule => rule.resource === context.resource);
  
  if (rules.length === 0) {
    // No specific rules, check general permissions
    return true;
  }
  
  for (const rule of rules) {
    // Check denied roles first
    if (rule.deniedRoles?.includes(context.user.role)) {
      return false;
    }
    
    // Check allowed roles
    if (rule.allowedRoles && !rule.allowedRoles.includes(context.user.role)) {
      return false;
    }
    
    // Check condition
    if (!rule.condition(context)) {
      return false;
    }
  }
  
  return true;
}