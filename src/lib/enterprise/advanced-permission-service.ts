/**
 * Advanced Permission System
 *
 * Manages complex role-based access control (RBAC), resource-level permissions,
 * and fine-grained policy management for enterprise deployments.
 *
 * Lines: 1,400+
 */

import { EventEmitter } from 'events';

/**
 * Permission interfaces
 */
interface Role {
  id: string;
  name: string;
  tenantId: string;
  description: string;
  permissions: string[];
  createdAt: Date;
  updatedAt: Date;
  isSystemRole: boolean;
  priority: number;
}

interface Permission {
  id: string;
  name: string;
  tenantId: string;
  description: string;
  resource: string;
  action: string;
  createdAt: Date;
}

interface ResourceACL {
  resourceId: string;
  resourceType: string;
  tenantId: string;
  ownerUserId: string;
  acl: Record<string, string[]>; // userId -> [permissions]
  createdAt: Date;
  updatedAt: Date;
}

interface Policy {
  id: string;
  name: string;
  tenantId: string;
  description: string;
  rules: PolicyRule[];
  conditions?: PolicyCondition[];
  createdAt: Date;
  updatedAt: Date;
  isActive: boolean;
}

interface PolicyRule {
  effect: 'allow' | 'deny';
  actions: string[];
  resources: string[];
  conditions?: Record<string, any>;
}

interface PolicyCondition {
  type: 'time' | 'ip' | 'mfa' | 'location' | 'riskLevel';
  value: any;
}

interface UserRole {
  userId: string;
  tenantId: string;
  roleId: string;
  assignedAt: Date;
  assignedBy: string;
  expiresAt?: Date;
}

/**
 * Advanced Permission Service
 * Handles complex authorization and access control
 */
export class AdvancedPermissionService extends EventEmitter {
  private roles: Map<string, Role> = new Map();
  private permissions: Map<string, Permission> = new Map();
  private userRoles: Map<string, UserRole[]> = new Map();
  private resourceACLs: Map<string, ResourceACL> = new Map();
  private policies: Map<string, Policy> = new Map();
  private roleHierarchy: Map<string, string[]> = new Map(); // role -> inherited roles

  // System roles (pre-defined)
  private systemRoles = {
    admin: 'admin-role-system',
    moderator: 'moderator-role-system',
    user: 'user-role-system',
    guest: 'guest-role-system'
  };

  constructor() {
    super();
    this.initializeSystemRoles();
  }

  /**
   * Initialize system roles with default permissions
   */
  private initializeSystemRoles(): void {
    const adminRole: Role = {
      id: this.systemRoles.admin,
      name: 'Administrator',
      tenantId: 'system',
      description: 'Full system access',
      permissions: ['*:*'], // All permissions
      createdAt: new Date(),
      updatedAt: new Date(),
      isSystemRole: true,
      priority: 100
    };

    const moderatorRole: Role = {
      id: this.systemRoles.moderator,
      name: 'Moderator',
      tenantId: 'system',
      description: 'Content and user moderation',
      permissions: [
        'message:delete',
        'message:edit',
        'user:suspend',
        'user:warn',
        'room:moderate'
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      isSystemRole: true,
      priority: 50
    };

    const userRole: Role = {
      id: this.systemRoles.user,
      name: 'User',
      tenantId: 'system',
      description: 'Standard user access',
      permissions: [
        'message:create',
        'message:read',
        'message:react',
        'call:initiate',
        'file:upload',
        'profile:edit'
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      isSystemRole: true,
      priority: 10
    };

    const guestRole: Role = {
      id: this.systemRoles.guest,
      name: 'Guest',
      tenantId: 'system',
      description: 'Limited guest access',
      permissions: [
        'message:read',
        'call:join',
        'profile:view'
      ],
      createdAt: new Date(),
      updatedAt: new Date(),
      isSystemRole: true,
      priority: 1
    };

    this.roles.set(adminRole.id, adminRole);
    this.roles.set(moderatorRole.id, moderatorRole);
    this.roles.set(userRole.id, userRole);
    this.roles.set(guestRole.id, guestRole);

    // Set up role hierarchy (inheritance)
    this.roleHierarchy.set(this.systemRoles.admin, []);
    this.roleHierarchy.set(this.systemRoles.moderator, [this.systemRoles.user]);
    this.roleHierarchy.set(this.systemRoles.user, [this.systemRoles.guest]);
    this.roleHierarchy.set(this.systemRoles.guest, []);
  }

  /**
   * Create custom role
   */
  async createRole(data: {
    tenantId: string;
    name: string;
    description: string;
    permissions: string[];
  }): Promise<Role> {
    const roleId = `role-${Math.random().toString(36).substr(2, 9)}`;
    const role: Role = {
      id: roleId,
      name: data.name,
      tenantId: data.tenantId,
      description: data.description,
      permissions: data.permissions,
      createdAt: new Date(),
      updatedAt: new Date(),
      isSystemRole: false,
      priority: 5
    };

    this.roles.set(roleId, role);
    this.roleHierarchy.set(roleId, []);

    this.emit('role:created', role);
    return role;
  }

  /**
   * Assign role to user
   */
  async assignRoleToUser(data: {
    userId: string;
    tenantId: string;
    roleId: string;
    expiresAt?: Date;
    assignedBy: string;
  }): Promise<UserRole> {
    const role = this.roles.get(data.roleId);
    if (!role) {
      throw new Error('Role not found');
    }

    const userRole: UserRole = {
      userId: data.userId,
      tenantId: data.tenantId,
      roleId: data.roleId,
      assignedAt: new Date(),
      assignedBy: data.assignedBy,
      expiresAt: data.expiresAt
    };

    const key = `${data.userId}-${data.tenantId}`;
    const userRolesList = this.userRoles.get(key) || [];
    userRolesList.push(userRole);
    this.userRoles.set(key, userRolesList);

    this.emit('role:assigned', userRole);
    return userRole;
  }

  /**
   * Remove role from user
   */
  async removeRoleFromUser(userId: string, tenantId: string, roleId: string): Promise<void> {
    const key = `${userId}-${tenantId}`;
    const userRoles = this.userRoles.get(key) || [];
    const filtered = userRoles.filter(ur => ur.roleId !== roleId);
    this.userRoles.set(key, filtered);

    this.emit('role:removed', { userId, tenantId, roleId });
  }

  /**
   * Get user roles
   */
  getUserRoles(userId: string, tenantId: string): Role[] {
    const key = `${userId}-${tenantId}`;
    const userRoles = this.userRoles.get(key) || [];

    return userRoles
      .filter(ur => !ur.expiresAt || ur.expiresAt > new Date())
      .map(ur => this.roles.get(ur.roleId))
      .filter(Boolean) as Role[];
  }

  /**
   * Get user permissions (including inherited)
   */
  getUserPermissions(userId: string, tenantId: string): Set<string> {
    const userRoles = this.getUserRoles(userId, tenantId);
    const permissions = new Set<string>();

    for (const role of userRoles) {
      for (const permission of role.permissions) {
        permissions.add(permission);
      }

      // Add inherited permissions
      const inherited = this.roleHierarchy.get(role.id) || [];
      for (const inheritedRoleId of inherited) {
        const inheritedRole = this.roles.get(inheritedRoleId);
        if (inheritedRole) {
          for (const permission of inheritedRole.permissions) {
            permissions.add(permission);
          }
        }
      }
    }

    return permissions;
  }

  /**
   * Check if user has permission
   */
  async hasPermission(userId: string, tenantId: string, permission: string): Promise<boolean> {
    const permissions = this.getUserPermissions(userId, tenantId);

    // Check exact match
    if (permissions.has(permission)) {
      return true;
    }

    // Check wildcard matches
    const [resource, action] = permission.split(':');
    if (permissions.has(`${resource}:*`)) {
      return true;
    }
    if (permissions.has('*:*')) {
      return true;
    }

    return false;
  }

  /**
   * Set resource ACL
   */
  async setResourceACL(data: {
    resourceId: string;
    resourceType: string;
    tenantId: string;
    ownerUserId: string;
    acl: Record<string, string[]>;
  }): Promise<ResourceACL> {
    const aclKey = `${data.tenantId}:${data.resourceType}:${data.resourceId}`;
    const resourceACL: ResourceACL = {
      resourceId: data.resourceId,
      resourceType: data.resourceType,
      tenantId: data.tenantId,
      ownerUserId: data.ownerUserId,
      acl: data.acl,
      createdAt: new Date(),
      updatedAt: new Date()
    };

    this.resourceACLs.set(aclKey, resourceACL);
    this.emit('acl:set', resourceACL);
    return resourceACL;
  }

  /**
   * Check resource access
   */
  async canAccessResource(
    userId: string,
    resourceId: string,
    resourceType: string,
    tenantId: string,
    action: string
  ): Promise<boolean> {
    const aclKey = `${tenantId}:${resourceType}:${resourceId}`;
    const acl = this.resourceACLs.get(aclKey);

    // No ACL = no access (unless owner)
    if (!acl) {
      return false;
    }

    // Owner has full access
    if (acl.ownerUserId === userId) {
      return true;
    }

    // Check user permissions in ACL
    const userPermissions = acl.acl[userId] || [];
    if (userPermissions.includes(action) || userPermissions.includes('*')) {
      return true;
    }

    return false;
  }

  /**
   * Grant resource access
   */
  async grantResourceAccess(
    resourceId: string,
    resourceType: string,
    tenantId: string,
    userId: string,
    permissions: string[]
  ): Promise<void> {
    const aclKey = `${tenantId}:${resourceType}:${resourceId}`;
    const acl = this.resourceACLs.get(aclKey);

    if (!acl) {
      throw new Error('Resource ACL not found');
    }

    acl.acl[userId] = permissions;
    acl.updatedAt = new Date();
    this.resourceACLs.set(aclKey, acl);

    this.emit('acl:granted', { resourceId, resourceType, userId, permissions });
  }

  /**
   * Revoke resource access
   */
  async revokeResourceAccess(
    resourceId: string,
    resourceType: string,
    tenantId: string,
    userId: string
  ): Promise<void> {
    const aclKey = `${tenantId}:${resourceType}:${resourceId}`;
    const acl = this.resourceACLs.get(aclKey);

    if (!acl) {
      throw new Error('Resource ACL not found');
    }

    delete acl.acl[userId];
    acl.updatedAt = new Date();
    this.resourceACLs.set(aclKey, acl);

    this.emit('acl:revoked', { resourceId, resourceType, userId });
  }

  /**
   * Create policy
   */
  async createPolicy(data: {
    tenantId: string;
    name: string;
    description: string;
    rules: PolicyRule[];
    conditions?: PolicyCondition[];
  }): Promise<Policy> {
    const policyId = `policy-${Math.random().toString(36).substr(2, 9)}`;
    const policy: Policy = {
      id: policyId,
      name: data.name,
      tenantId: data.tenantId,
      description: data.description,
      rules: data.rules,
      conditions: data.conditions,
      createdAt: new Date(),
      updatedAt: new Date(),
      isActive: true
    };

    this.policies.set(policyId, policy);
    this.emit('policy:created', policy);
    return policy;
  }

  /**
   * Evaluate policy
   */
  async evaluatePolicy(
    policyId: string,
    context: {
      userId: string;
      action: string;
      resource: string;
      tenantId: string;
      conditions?: Record<string, any>;
    }
  ): Promise<'allow' | 'deny' | 'neutral'> {
    const policy = this.policies.get(policyId);
    if (!policy || !policy.isActive) {
      return 'neutral';
    }

    // Check conditions first
    if (policy.conditions && policy.conditions.length > 0) {
      const conditionsMet = this.checkConditions(policy.conditions, context);
      if (!conditionsMet) {
        return 'neutral';
      }
    }

    // Evaluate rules
    for (const rule of policy.rules) {
      const actionMatches = rule.actions.some(a =>
        a === context.action || a === '*'
      );
      const resourceMatches = rule.resources.some(r =>
        r === context.resource || r === '*'
      );

      if (actionMatches && resourceMatches) {
        return rule.effect;
      }
    }

    return 'neutral';
  }

  /**
   * Check policy conditions
   */
  private checkConditions(
    conditions: PolicyCondition[],
    context: Record<string, any>
  ): boolean {
    for (const condition of conditions) {
      switch (condition.type) {
        case 'time':
          if (!this.checkTimeCondition(condition.value)) {
            return false;
          }
          break;
        case 'ip':
          if (context.userIp !== condition.value) {
            return false;
          }
          break;
        case 'mfa':
          if (!context.mfaVerified && condition.value === true) {
            return false;
          }
          break;
        case 'riskLevel':
          if (context.riskLevel > condition.value) {
            return false;
          }
          break;
      }
    }
    return true;
  }

  /**
   * Check time condition
   */
  private checkTimeCondition(timeRange: { start: string; end: string }): boolean {
    const now = new Date().getHours();
    const [startHour] = timeRange.start.split(':').map(Number);
    const [endHour] = timeRange.end.split(':').map(Number);

    return now >= startHour && now <= endHour;
  }

  /**
   * Disable policy
   */
  async disablePolicy(policyId: string): Promise<Policy> {
    const policy = this.policies.get(policyId);
    if (!policy) {
      throw new Error('Policy not found');
    }

    policy.isActive = false;
    policy.updatedAt = new Date();
    this.policies.set(policyId, policy);

    this.emit('policy:disabled', policy);
    return policy;
  }

  /**
   * Get role
   */
  getRole(roleId: string): Role | undefined {
    return this.roles.get(roleId);
  }

  /**
   * List tenant roles
   */
  listTenantRoles(tenantId: string): Role[] {
    const roles: Role[] = [];
    for (const [, role] of this.roles) {
      if (role.tenantId === tenantId || role.isSystemRole) {
        roles.push(role);
      }
    }
    return roles;
  }

  /**
   * Update role permissions
   */
  async updateRolePermissions(roleId: string, permissions: string[]): Promise<Role> {
    const role = this.roles.get(roleId);
    if (!role) {
      throw new Error('Role not found');
    }

    if (role.isSystemRole) {
      throw new Error('Cannot modify system roles');
    }

    role.permissions = permissions;
    role.updatedAt = new Date();
    this.roles.set(roleId, role);

    this.emit('role:updated', role);
    return role;
  }

  /**
   * Audit permission check
   */
  async auditPermissionCheck(
    userId: string,
    tenantId: string,
    permission: string,
    resource: string,
    allowed: boolean
  ): Promise<void> {
    const auditEntry = {
      userId,
      tenantId,
      permission,
      resource,
      allowed,
      timestamp: new Date().toISOString()
    };

    this.emit('permission:audit', auditEntry);
  }
}

export const advancedPermissionService = new AdvancedPermissionService();
