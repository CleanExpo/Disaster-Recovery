/**
 * Access Control Service
 *
 * Role-based access control (RBAC) and permission management
 */

import { EventEmitter } from 'events';

interface Role {
  id: string;
  name: string;
  description?: string;
  permissions: string[];
  createdAt: string;
  updatedAt: string;
}

interface User {
  id: string;
  username: string;
  email: string;
  roles: string[];
  permissions: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  lastLogin?: number;
  loginAttempts: number;
  lockedUntil?: number;
}

interface Resource {
  id: string;
  type: string;
  ownerId: string;
  permissions: Map<string, string[]>; // userId -> permissions
  isPublic: boolean;
  createdAt: string;
}

interface Permission {
  id: string;
  name: string;
  description?: string;
  resource: string;
  action: string;
  createdAt: string;
}

interface AccessLog {
  id: string;
  userId: string;
  action: string;
  resource: string;
  timestamp: number;
  success: boolean;
  reason?: string;
  ipAddress?: string;
  userAgent?: string;
}

export class AccessControlService extends EventEmitter {
  private roles: Map<string, Role> = new Map();
  private users: Map<string, User> = new Map();
  private permissions: Map<string, Permission> = new Map();
  private resources: Map<string, Resource> = new Map();
  private accessLogs: AccessLog[] = [];
  private maxLogs = 100000;

  constructor() {
    super();
    this.initializeDefaultRoles();
  }

  /**
   * Initialize default roles
   */
  private initializeDefaultRoles() {
    // Admin role - full access
    this.createRole(
      'admin',
      'Administrator',
      'Full system access',
      [
        'user:create',
        'user:read',
        'user:update',
        'user:delete',
        'role:create',
        'role:read',
        'role:update',
        'role:delete',
        'room:create',
        'room:delete',
        'room:manage_members',
        'message:delete',
        'analytics:view_all',
        'dashboard:create',
        'dashboard:delete',
        'dashboard:share',
        'security:manage',
        'audit:view',
      ]
    );

    // Moderator role - limited management
    this.createRole(
      'moderator',
      'Moderator',
      'Room and content moderation',
      [
        'user:read',
        'room:read',
        'room:manage_members',
        'message:delete',
        'analytics:view_public',
        'dashboard:read',
        'audit:view_own',
      ]
    );

    // Manager role - team management
    this.createRole(
      'manager',
      'Manager',
      'Team and project management',
      [
        'user:read',
        'user:update',
        'room:create',
        'room:read',
        'room:update',
        'room:manage_members',
        'analytics:view_team',
        'dashboard:create',
        'dashboard:read',
        'dashboard:update',
        'dashboard:share',
        'audit:view_team',
      ]
    );

    // User role - standard user access
    this.createRole(
      'user',
      'User',
      'Standard user access',
      [
        'user:read_self',
        'user:update_self',
        'room:read',
        'room:create',
        'room:update_own',
        'message:create',
        'message:delete_own',
        'analytics:view_own',
        'dashboard:create_own',
        'dashboard:read_own',
        'dashboard:update_own',
      ]
    );

    // Guest role - read-only access
    this.createRole(
      'guest',
      'Guest',
      'Read-only access',
      [
        'user:read_public',
        'room:read_public',
        'message:read_public',
        'analytics:view_public',
      ]
    );
  }

  /**
   * Create role
   */
  createRole(
    id: string,
    name: string,
    description: string,
    permissions: string[]
  ): Role {
    const role: Role = {
      id,
      name,
      description,
      permissions,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    this.roles.set(id, role);
    this.emit('role:created', role);
    return role;
  }

  /**
   * Get role
   */
  getRole(roleId: string): Role | null {
    return this.roles.get(roleId) || null;
  }

  /**
   * Get all roles
   */
  getAllRoles(): Role[] {
    return Array.from(this.roles.values());
  }

  /**
   * Update role
   */
  updateRole(roleId: string, updates: Partial<Role>): Role | null {
    const role = this.roles.get(roleId);
    if (!role) return null;

    const updated = {
      ...role,
      ...updates,
      updatedAt: new Date().toISOString(),
    };

    this.roles.set(roleId, updated);
    this.emit('role:updated', updated);
    return updated;
  }

  /**
   * Create user
   */
  createUser(
    id: string,
    username: string,
    email: string,
    roles: string[] = ['user']
  ): User {
    const user: User = {
      id,
      username,
      email,
      roles,
      permissions: this.getPermissionsForRoles(roles),
      isActive: true,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      loginAttempts: 0,
    };

    this.users.set(id, user);
    this.emit('user:created', user);
    return user;
  }

  /**
   * Get user
   */
  getUser(userId: string): User | null {
    return this.users.get(userId) || null;
  }

  /**
   * Get all users
   */
  getAllUsers(): User[] {
    return Array.from(this.users.values());
  }

  /**
   * Update user
   */
  updateUser(userId: string, updates: Partial<User>): User | null {
    const user = this.users.get(userId);
    if (!user) return null;

    const updated = {
      ...user,
      ...updates,
      permissions: updates.roles
        ? this.getPermissionsForRoles(updates.roles)
        : user.permissions,
      updatedAt: new Date().toISOString(),
    };

    this.users.set(userId, updated);
    this.emit('user:updated', updated);
    return updated;
  }

  /**
   * Get permissions for roles
   */
  private getPermissionsForRoles(roleIds: string[]): string[] {
    const permissions = new Set<string>();

    for (const roleId of roleIds) {
      const role = this.roles.get(roleId);
      if (role) {
        role.permissions.forEach(p => permissions.add(p));
      }
    }

    return Array.from(permissions);
  }

  /**
   * Assign role to user
   */
  assignRoleToUser(userId: string, roleId: string): User | null {
    const user = this.users.get(userId);
    const role = this.roles.get(roleId);

    if (!user || !role) return null;

    if (!user.roles.includes(roleId)) {
      user.roles.push(roleId);
      user.permissions = this.getPermissionsForRoles(user.roles);
      user.updatedAt = new Date().toISOString();
      this.users.set(userId, user);
      this.emit('user:role_assigned', { userId, roleId });
    }

    return user;
  }

  /**
   * Remove role from user
   */
  removeRoleFromUser(userId: string, roleId: string): User | null {
    const user = this.users.get(userId);
    if (!user) return null;

    const index = user.roles.indexOf(roleId);
    if (index > -1) {
      user.roles.splice(index, 1);
      user.permissions = this.getPermissionsForRoles(user.roles);
      user.updatedAt = new Date().toISOString();
      this.users.set(userId, user);
      this.emit('user:role_removed', { userId, roleId });
    }

    return user;
  }

  /**
   * Check if user has permission
   */
  hasPermission(userId: string, permission: string): boolean {
    const user = this.users.get(userId);
    if (!user || !user.isActive) {
      return false;
    }

    // Admin has all permissions
    if (user.roles.includes('admin')) {
      return true;
    }

    return user.permissions.includes(permission);
  }

  /**
   * Check if user can access resource
   */
  canAccessResource(userId: string, resourceId: string, action: string): boolean {
    const resource = this.resources.get(resourceId);
    if (!resource) return false;

    // Owner has full access
    if (resource.ownerId === userId) {
      return true;
    }

    // Public resources readable by all
    if (resource.isPublic && action === 'read') {
      return true;
    }

    // Check explicit permissions
    const userPermissions = resource.permissions.get(userId) || [];
    return userPermissions.includes(action);
  }

  /**
   * Grant resource access
   */
  grantResourceAccess(
    resourceId: string,
    userId: string,
    permissions: string[]
  ): Resource | null {
    const resource = this.resources.get(resourceId);
    if (!resource) return null;

    const existing = resource.permissions.get(userId) || [];
    const merged = Array.from(new Set([...existing, ...permissions]));
    resource.permissions.set(userId, merged);

    this.resources.set(resourceId, resource);
    this.emit('resource:access_granted', { resourceId, userId, permissions });
    return resource;
  }

  /**
   * Revoke resource access
   */
  revokeResourceAccess(resourceId: string, userId: string): Resource | null {
    const resource = this.resources.get(resourceId);
    if (!resource) return null;

    resource.permissions.delete(userId);
    this.resources.set(resourceId, resource);
    this.emit('resource:access_revoked', { resourceId, userId });
    return resource;
  }

  /**
   * Create resource
   */
  createResource(
    id: string,
    type: string,
    ownerId: string,
    isPublic: boolean = false
  ): Resource {
    const resource: Resource = {
      id,
      type,
      ownerId,
      permissions: new Map(),
      isPublic,
      createdAt: new Date().toISOString(),
    };

    this.resources.set(id, resource);
    this.emit('resource:created', resource);
    return resource;
  }

  /**
   * Get resource
   */
  getResource(resourceId: string): Resource | null {
    return this.resources.get(resourceId) || null;
  }

  /**
   * Log access attempt
   */
  logAccess(
    userId: string,
    action: string,
    resource: string,
    success: boolean,
    reason?: string,
    ipAddress?: string,
    userAgent?: string
  ): AccessLog {
    const log: AccessLog = {
      id: `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      userId,
      action,
      resource,
      timestamp: Date.now(),
      success,
      reason,
      ipAddress,
      userAgent,
    };

    this.accessLogs.push(log);

    // Maintain log size
    if (this.accessLogs.length > this.maxLogs) {
      this.accessLogs.shift();
    }

    this.emit('access:logged', log);

    if (!success) {
      this.emit('access:denied', log);
    }

    return log;
  }

  /**
   * Get access logs
   */
  getAccessLogs(
    filters?: {
      userId?: string;
      action?: string;
      resource?: string;
      success?: boolean;
      limit?: number;
    }
  ): AccessLog[] {
    let logs = [...this.accessLogs];

    if (filters?.userId) {
      logs = logs.filter(l => l.userId === filters.userId);
    }
    if (filters?.action) {
      logs = logs.filter(l => l.action === filters.action);
    }
    if (filters?.resource) {
      logs = logs.filter(l => l.resource === filters.resource);
    }
    if (filters?.success !== undefined) {
      logs = logs.filter(l => l.success === filters.success);
    }

    const limit = filters?.limit || 100;
    return logs.slice(-limit);
  }

  /**
   * Handle failed login attempt
   */
  recordFailedLogin(userId: string): User | null {
    const user = this.users.get(userId);
    if (!user) return null;

    user.loginAttempts++;

    // Lock account after 5 failed attempts for 30 minutes
    if (user.loginAttempts >= 5) {
      user.lockedUntil = Date.now() + 30 * 60 * 1000;
      user.isActive = false;
      this.emit('user:locked', { userId, reason: 'Failed login attempts' });
    }

    this.users.set(userId, user);
    return user;
  }

  /**
   * Handle successful login
   */
  recordSuccessfulLogin(userId: string): User | null {
    const user = this.users.get(userId);
    if (!user) return null;

    user.lastLogin = Date.now();
    user.loginAttempts = 0;
    user.lockedUntil = undefined;
    user.isActive = true;

    this.users.set(userId, user);
    this.emit('user:logged_in', { userId, timestamp: user.lastLogin });
    return user;
  }

  /**
   * Unlock user account
   */
  unlockUser(userId: string): User | null {
    const user = this.users.get(userId);
    if (!user) return null;

    user.loginAttempts = 0;
    user.lockedUntil = undefined;
    user.isActive = true;

    this.users.set(userId, user);
    this.emit('user:unlocked', userId);
    return user;
  }

  /**
   * Check if user account is locked
   */
  isAccountLocked(userId: string): boolean {
    const user = this.users.get(userId);
    if (!user || !user.lockedUntil) return false;

    if (Date.now() > user.lockedUntil) {
      // Auto-unlock
      this.unlockUser(userId);
      return false;
    }

    return true;
  }

  /**
   * Get access statistics
   */
  getAccessStatistics(): {
    totalAttempts: number;
    successfulAttempts: number;
    failedAttempts: number;
    successRate: number;
    mostAccessedResources: Array<{ resource: string; count: number }>;
    topActors: Array<{ userId: string; count: number }>;
  } {
    const totalAttempts = this.accessLogs.length;
    const successfulAttempts = this.accessLogs.filter(l => l.success).length;
    const failedAttempts = totalAttempts - successfulAttempts;
    const successRate =
      totalAttempts > 0 ? (successfulAttempts / totalAttempts) * 100 : 0;

    // Most accessed resources
    const resourceCounts = new Map<string, number>();
    for (const log of this.accessLogs) {
      resourceCounts.set(log.resource, (resourceCounts.get(log.resource) || 0) + 1);
    }
    const mostAccessedResources = Array.from(resourceCounts.entries())
      .map(([resource, count]) => ({ resource, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    // Top actors
    const actorCounts = new Map<string, number>();
    for (const log of this.accessLogs) {
      actorCounts.set(log.userId, (actorCounts.get(log.userId) || 0) + 1);
    }
    const topActors = Array.from(actorCounts.entries())
      .map(([userId, count]) => ({ userId, count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 10);

    return {
      totalAttempts,
      successfulAttempts,
      failedAttempts,
      successRate,
      mostAccessedResources,
      topActors,
    };
  }

  /**
   * Export audit logs
   */
  exportAuditLogs(
    format: 'json' | 'csv'
  ): string {
    if (format === 'json') {
      return JSON.stringify(this.accessLogs, null, 2);
    } else {
      // CSV format
      const headers = [
        'ID',
        'User ID',
        'Action',
        'Resource',
        'Timestamp',
        'Success',
        'Reason',
        'IP Address',
      ];
      const lines = [headers.join(',')];

      for (const log of this.accessLogs) {
        lines.push(
          [
            log.id,
            log.userId,
            log.action,
            log.resource,
            new Date(log.timestamp).toISOString(),
            log.success ? 'Yes' : 'No',
            log.reason || '',
            log.ipAddress || '',
          ].join(',')
        );
      }

      return lines.join('\n');
    }
  }
}

// Export singleton instance
export const accessControl = new AccessControlService();
