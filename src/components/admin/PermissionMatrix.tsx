'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Shield,
  CheckCircle,
  XCircle,
  Lock,
  Users,
  Building,
  GraduationCap,
  Briefcase,
  Settings,
  Eye,
  Edit,
  Trash2,
  Download,
  Info,
  ChevronDown,
  ChevronUp
} from 'lucide-react';
import { 
  UserRole,
  Permission,
  ROLE_DEFINITIONS,
  PERMISSION_CATEGORIES
} from '@/types/rbac';

export function PermissionMatrix() {
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev =>
      prev.includes(category)
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };

  // Group permissions by category
  const permissionsByCategory = Object.entries(ROLE_DEFINITIONS).reduce((acc, [role, definition]) => {
    definition.permissions.forEach(permission => {
      const category = permission.split('.')[0];
      if (!acc[category]) {
        acc[category] = {};
      }
      if (!acc[category][permission]) {
        acc[category][permission] = [];
      }
      acc[category][permission].push(role as UserRole);
    });
    return acc;
  }, {} as Record<string, Record<string, UserRole[]>>);

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'company': return <Building className="h-4 w-4" />;
      case 'jobs': return <Briefcase className="h-4 w-4" />;
      case 'training': return <GraduationCap className="h-4 w-4" />;
      case 'profile': return <Users className="h-4 w-4" />;
      case 'portal': return <Settings className="h-4 w-4" />;
      case 'audit': return <Shield className="h-4 w-4" />;
      default: return <Shield className="h-4 w-4" />;
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case 'portal_admin': return 'bg-purple-100 text-purple-800';
      case 'contractor_admin': return 'bg-blue-100 text-blue-800';
      case 'contractor_technician': return 'bg-green-100 text-green-800';
      case 'compliance_auditor': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const exportMatrix = () => {
    // Create CSV content
    const headers = ['Permission', ...Object.keys(ROLE_DEFINITIONS)];
    const rows: string[][] = [headers];

    Object.entries(permissionsByCategory).forEach(([category, permissions]) => {
      rows.push([category.toUpperCase(), '', '', '', '']);
      Object.entries(permissions).forEach(([permission, roles]) => {
        const row = [permission];
        Object.keys(ROLE_DEFINITIONS).forEach(role => {
          row.push(roles.includes(role as UserRole) ? '✓' : '');
        });
        rows.push(row);
      });
    });

    const csv = rows.map(row => row.join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'permission-matrix.csv';
    a.click();
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Shield className="h-6 w-6" />
            Permission Matrix
          </h2>
          <p className="text-gray-600 mt-1">
            Complete overview of role-based access control and permissions
          </p>
        </div>
        <Button variant="outline" onClick={exportMatrix}>
          <Download className="h-4 w-4 mr-2" />
          Export Matrix
        </Button>
      </div>

      {/* Role Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {Object.entries(ROLE_DEFINITIONS).map(([role, definition]) => (
          <Card
            key={role}
            className={`cursor-pointer transition-all ${
              selectedRole === role ? 'ring-2 ring-blue-500' : 'hover:shadow-lg'
            }`}
            onClick={() => setSelectedRole(selectedRole === role ? null : role as UserRole)}
          >
            <CardHeader className="pb-3">
              <CardTitle className="text-sm flex items-center justify-between">
                {definition.name}
                <Badge className={getRoleBadgeColor(role as UserRole)}>
                  Level {definition.hierarchy}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-xs text-gray-600 mb-3">{definition.description}</p>
              <div className="flex items-center justify-between">
                <span className="text-sm font-medium">
                  {definition.permissions.length} permissions
                </span>
                {definition.isSystemRole && (
                  <Badge variant="outline" className="text-xs">
                    System
                  </Badge>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Selected Role Details */}
      {selectedRole && (
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription>
            <strong>{ROLE_DEFINITIONS[selectedRole].name}</strong> has access to{' '}
            {ROLE_DEFINITIONS[selectedRole].permissions.length} permissions across{' '}
            {new Set(ROLE_DEFINITIONS[selectedRole].permissions.map(p => p.split('.')[0])).size} categories.
            Hierarchy level: {ROLE_DEFINITIONS[selectedRole].hierarchy}
          </AlertDescription>
        </Alert>
      )}

      {/* Permission Matrix */}
      <Card>
        <CardHeader>
          <CardTitle>Permission Assignment Matrix</CardTitle>
          <CardDescription>
            View and understand which roles have access to specific permissions
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-sm sticky left-0 bg-gray-50 z-10">
                    Permission
                  </th>
                  {Object.entries(ROLE_DEFINITIONS).map(([role, definition]) => (
                    <th key={role} className="text-center p-4 font-medium text-sm min-w-[120px]">
                      <div className="flex flex-col items-center">
                        <span className="text-xs text-gray-500">Level {definition.hierarchy}</span>
                        <span>{definition.name.split(' ')[0]}</span>
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {Object.entries(permissionsByCategory).map(([category, permissions]) => (
                  <React.Fragment key={category}>
                    <tr
                      className="bg-gray-50 cursor-pointer hover:bg-gray-100"
                      onClick={() => toggleCategory(category)}
                    >
                      <td
                        colSpan={Object.keys(ROLE_DEFINITIONS).length + 1}
                        className="p-3 font-medium"
                      >
                        <div className="flex items-center gap-2">
                          {expandedCategories.includes(category) ? (
                            <ChevronUp className="h-4 w-4" />
                          ) : (
                            <ChevronDown className="h-4 w-4" />
                          )}
                          {getCategoryIcon(category)}
                          <span className="capitalize">
                            {PERMISSION_CATEGORIES[category as keyof typeof PERMISSION_CATEGORIES]?.name || category}
                          </span>
                          <Badge variant="outline" className="ml-2">
                            {Object.keys(permissions).length} permissions
                          </Badge>
                        </div>
                      </td>
                    </tr>
                    {expandedCategories.includes(category) &&
                      Object.entries(permissions).map(([permission, roles]) => (
                        <tr key={permission} className="border-b hover:bg-gray-50">
                          <td className="p-4 sticky left-0 bg-white z-10">
                            <div className="flex items-center gap-2">
                              <div className="w-4" /> {/* Indent */}
                              <code className="text-xs bg-gray-100 px-2 py-1 rounded">
                                {permission}
                              </code>
                            </div>
                          </td>
                          {Object.keys(ROLE_DEFINITIONS).map(role => (
                            <td key={role} className="p-4 text-center">
                              {roles.includes(role as UserRole) ? (
                                <div className="flex justify-center">
                                  <CheckCircle className="h-5 w-5 text-green-500" />
                                </div>
                              ) : (
                                <div className="flex justify-center">
                                  <XCircle className="h-5 w-5 text-gray-300" />
                                </div>
                              )}
                            </td>
                          ))}
                        </tr>
                      ))}
                  </React.Fragment>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Permission Actions Matrix */}
      <Tabs defaultValue="actions" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="actions">Common Actions</TabsTrigger>
          <TabsTrigger value="resources">Resource Access</TabsTrigger>
          <TabsTrigger value="hierarchy">Role Hierarchy</TabsTrigger>
        </TabsList>

        <TabsContent value="actions">
          <Card>
            <CardHeader>
              <CardTitle>Action-Based Permissions</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { action: 'View', icon: Eye, permissions: ['view', 'read'] },
                  { action: 'Edit', icon: Edit, permissions: ['edit', 'update', 'manage'] },
                  { action: 'Delete', icon: Trash2, permissions: ['delete', 'remove'] }
                ].map(({ action, icon: Icon, permissions }) => (
                  <div key={action} className="border rounded-lg p-4">
                    <div className="flex items-center gap-2 mb-3">
                      <Icon className="h-4 w-4" />
                      <span className="font-medium">{action} Actions</span>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(ROLE_DEFINITIONS).map(([role, definition]) => {
                        const hasPermission = definition.permissions.some(p =>
                          permissions.some(perm => p.includes(perm))
                        );
                        return (
                          <div key={role} className="flex items-center gap-2">
                            {hasPermission ? (
                              <CheckCircle className="h-4 w-4 text-green-500" />
                            ) : (
                              <XCircle className="h-4 w-4 text-gray-300" />
                            )}
                            <span className="text-sm">{definition.name}</span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="resources">
          <Card>
            <CardHeader>
              <CardTitle>Resource-Based Access Control</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {[
                  { resource: 'Company Data', description: 'Company profiles, documents, compliance' },
                  { resource: 'Billing & Payments', description: 'Invoices, subscriptions, financial data' },
                  { resource: 'User Management', description: 'User accounts, roles, permissions' },
                  { resource: 'Audit Logs', description: 'System logs, compliance reports, activity tracking' }
                ].map(({ resource, description }) => (
                  <div key={resource} className="border rounded-lg p-4">
                    <div className="mb-3">
                      <p className="font-medium">{resource}</p>
                      <p className="text-sm text-gray-600">{description}</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {Object.entries(ROLE_DEFINITIONS).map(([role, definition]) => {
                        const accessLevel = 
                          role === 'portal_admin' ? 'Full Access' :
                          role === 'contractor_admin' ? 'Company Only' :
                          role === 'compliance_auditor' ? 'Read Only' :
                          'Limited';
                        
                        const colour = 
                          accessLevel === 'Full Access' ? 'text-green-600' :
                          accessLevel === 'Company Only' ? 'text-blue-600' :
                          accessLevel === 'Read Only' ? 'text-yellow-600' :
                          'text-gray-600';
                        
                        return (
                          <div key={role} className="text-sm">
                            <p className="font-medium">{definition.name}</p>
                            <p className={`text-xs ${colour}`}>{accessLevel}</p>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="hierarchy">
          <Card>
            <CardHeader>
              <CardTitle>Role Hierarchy & Inheritance</CardTitle>
              <CardDescription>
                Higher hierarchy levels inherit permissions from lower levels
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {Object.entries(ROLE_DEFINITIONS)
                  .sort((a, b) => b[1].hierarchy - a[1].hierarchy)
                  .map(([role, definition], index) => (
                    <div key={role} className="flex items-center gap-4">
                      <div className="flex items-center justify-center w-12 h-12 rounded-full bg-blue-100 text-blue-600 font-bold">
                        {definition.hierarchy}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3">
                          <p className="font-medium">{definition.name}</p>
                          <Badge className={getRoleBadgeColor(role as UserRole)}>
                            {role}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600 mt-1">{definition.description}</p>
                        <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                          <span>{definition.permissions.length} direct permissions</span>
                          {index < Object.entries(ROLE_DEFINITIONS).length - 1 && (
                            <span>Can manage lower roles</span>
                          )}
                        </div>
                      </div>
                      {index < Object.entries(ROLE_DEFINITIONS).length - 1 && (
                        <div className="text-gray-400">
                          <ChevronDown className="h-5 w-5" />
                        </div>
                      )}
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}