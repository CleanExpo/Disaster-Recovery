'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from '@/components/ui/dialog';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Switch } from '@/components/ui/switch';
import { Checkbox } from '@/components/ui/checkbox';
import {
  Users,
  UserPlus,
  Shield,
  Lock,
  Key,
  Edit,
  Trash2,
  AlertTriangle,
  CheckCircle,
  Search,
  Filter,
  Building,
  User,
  Mail,
  Calendar,
  Activity,
  Settings,
  ShieldCheck,
  UserCheck,
  UserX,
  RefreshCcw,
  Download
} from 'lucide-react';
import { 
  User as UserType,
  UserRole, 
  Permission,
  ROLE_DEFINITIONS,
  PERMISSION_CATEGORIES
} from '@/types/rbac';
import { usePermissions, useCanManageUsers, useIsPortalAdmin } from '@/hooks/usePermissions';
import { ProtectedComponent, ProtectedAction } from '@/components/auth/ProtectedRoute';

interface UserWithCompany extends UserType {
  company?: {
    id: string;
    name: string;
  };
}

export function UserManagement() {
  const [users, setUsers] = useState<UserWithCompany[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserWithCompany | null>(null);
  const [showCreateModal, setShowCreateModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [filterRole, setFilterRole] = useState<string>('all');
  const [filterStatus, setFilterStatus] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  const { user: currentUser } = usePermissions();
  const canManageUsers = useCanManageUsers();
  const isPortalAdmin = useIsPortalAdmin();

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    role: 'contractor_technician' as UserRole,
    companyId: '',
    isActive: true,
    isMfaEnabled: false,
    permissions: [] as Permission[]
  });

  useEffect(() => {
    fetchUsers();
  }, [filterRole, filterStatus]);

  const fetchUsers = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        role: filterRole,
        status: filterStatus
      });
      const response = await fetch(`/api/users?${params}`);
      const data = await response.json();
      setUsers(data);
    } catch (error) {
      console.error('Failed to fetch users:', error);
    } finally {
      setLoading(false);
    }
  };

  const createUser = async () => {
    try {
      const response = await fetch('/api/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchUsers();
        setShowCreateModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to create user:', error);
    }
  };

  const updateUser = async () => {
    if (!selectedUser) return;

    try {
      const response = await fetch(`/api/users/${selectedUser.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      if (response.ok) {
        fetchUsers();
        setShowEditModal(false);
        resetForm();
      }
    } catch (error) {
      console.error('Failed to update user:', error);
    }
  };

  const deleteUser = async (userId: string) => {
    if (!confirm('Are you sure you want to delete this user?')) return;

    try {
      const response = await fetch(`/api/users/${userId}`, {
        method: 'DELETE'
      });

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Failed to delete user:', error);
    }
  };

  const toggleUserStatus = async (userId: string, isActive: boolean) => {
    try {
      const response = await fetch(`/api/users/${userId}/status`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ isActive })
      });

      if (response.ok) {
        fetchUsers();
      }
    } catch (error) {
      console.error('Failed to update user status:', error);
    }
  };

  const resetPassword = async (userId: string) => {
    try {
      const response = await fetch(`/api/users/${userId}/reset-password`, {
        method: 'POST'
      });

      if (response.ok) {
        alert('Password reset email sent');
      }
    } catch (error) {
      console.error('Failed to reset password:', error);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      email: '',
      role: 'contractor_technician',
      companyId: '',
      isActive: true,
      isMfaEnabled: false,
      permissions: []
    });
    setSelectedUser(null);
  };

  const openEditModal = (user: UserWithCompany) => {
    setSelectedUser(user);
    setFormData({
      name: user.name,
      email: user.email,
      role: user.role,
      companyId: user.companyId || '',
      isActive: user.isActive,
      isMfaEnabled: user.isMfaEnabled,
      permissions: user.permissions
    });
    setShowEditModal(true);
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

  const filteredUsers = users.filter(user =>
    (filterRole === 'all' || user.role === filterRole) &&
    (filterStatus === 'all' || 
     (filterStatus === 'active' && user.isActive) ||
     (filterStatus === 'inactive' && !user.isActive)) &&
    (searchTerm === '' ||
     user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
     user.company?.name.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const usersByRole = Object.keys(ROLE_DEFINITIONS).reduce((acc, role) => {
    acc[role as UserRole] = users.filter(u => u.role === role).length;
    return acc;
  }, {} as Record<UserRole, number>);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6" />
            User Management
          </h2>
          <p className="text-gray-600 mt-1">
            Manage user accounts, roles, and permissions
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export Users
          </Button>
          <ProtectedAction
            permission="portal.users.manage"
            onAction={() => setShowCreateModal(true)}
            onUnauthorized={() => alert('You need admin permissions to create users')}
          >
            {({ onClick, disabled }) => (
              <Button onClick={onClick} disabled={disabled}>
                <UserPlus className="h-4 w-4 mr-2" />
                Add User
              </Button>
            )}
          </ProtectedAction>
        </div>
      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{users.length}</p>
            <p className="text-xs text-gray-500">
              {users.filter(u => u.isActive).length} active
            </p>
          </CardContent>
        </Card>

        {Object.entries(ROLE_DEFINITIONS).map(([role, definition]) => (
          <Card key={role}>
            <CardHeader className="pb-3">
              <CardTitle className="text-sm">{definition.name}</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-2xl font-bold">{usersByRole[role as UserRole] || 0}</p>
              <p className="text-xs text-gray-500">users</p>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Filters */}
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center">
            <CardTitle>Users</CardTitle>
            <div className="flex gap-3">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <Input
                  placeholder="Search users..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 w-64"
                />
              </div>
              <Select value={filterRole} onValueChange={setFilterRole}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Filter by role" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Roles</SelectItem>
                  {Object.entries(ROLE_DEFINITIONS).map(([role, definition]) => (
                    <SelectItem key={role} value={role}>
                      {definition.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={filterStatus} onValueChange={setFilterStatus}>
                <SelectTrigger className="w-32">
                  <SelectValue placeholder="Status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Status</SelectItem>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left p-4 font-medium text-sm">User</th>
                  <th className="text-left p-4 font-medium text-sm">Company</th>
                  <th className="text-left p-4 font-medium text-sm">Role</th>
                  <th className="text-left p-4 font-medium text-sm">Status</th>
                  <th className="text-left p-4 font-medium text-sm">Security</th>
                  <th className="text-left p-4 font-medium text-sm">Last Login</th>
                  <th className="text-left p-4 font-medium text-sm">Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredUsers.map(user => (
                  <tr key={user.id} className="border-b hover:bg-gray-50">
                    <td className="p-4">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gray-200 flex items-center justify-center">
                          <User className="h-5 w-5 text-gray-600" />
                        </div>
                        <div>
                          <p className="font-medium">{user.name}</p>
                          <p className="text-sm text-gray-600">{user.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="p-4">
                      {user.company ? (
                        <div className="flex items-center gap-2">
                          <Building className="h-4 w-4 text-gray-400" />
                          <span>{user.company.name}</span>
                        </div>
                      ) : (
                        <span className="text-gray-400">N/A</span>
                      )}
                    </td>
                    <td className="p-4">
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {ROLE_DEFINITIONS[user.role].name}
                      </Badge>
                    </td>
                    <td className="p-4">
                      {user.isActive ? (
                        <Badge className="bg-green-100 text-green-800">
                          <CheckCircle className="h-3 w-3 mr-1" />
                          Active
                        </Badge>
                      ) : (
                        <Badge className="bg-gray-100 text-gray-800">
                          <UserX className="h-3 w-3 mr-1" />
                          Inactive
                        </Badge>
                      )}
                    </td>
                    <td className="p-4">
                      <div className="flex items-center gap-2">
                        {user.isMfaEnabled ? (
                          <Badge variant="outline" className="text-xs">
                            <ShieldCheck className="h-3 w-3 mr-1" />
                            MFA
                          </Badge>
                        ) : (
                          <Badge variant="outline" className="text-xs text-blue-700">
                            <Shield className="h-3 w-3 mr-1" />
                            No MFA
                          </Badge>
                        )}
                      </div>
                    </td>
                    <td className="p-4">
                      <p className="text-sm text-gray-600">
                        {user.lastLogin 
                          ? new Date(user.lastLogin).toLocaleDateString()
                          : 'Never'}
                      </p>
                    </td>
                    <td className="p-4">
                      <div className="flex gap-2">
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => openEditModal(user)}
                        >
                          <Edit className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => {
                            setSelectedUser(user);
                            setShowPermissionsModal(true);
                          }}
                        >
                          <Shield className="h-4 w-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => resetPassword(user.id)}
                        >
                          <Key className="h-4 w-4" />
                        </Button>
                        {isPortalAdmin && (
                          <Button
                            variant="ghost"
                            size="sm"
                            className="text-red-600"
                            onClick={() => deleteUser(user.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>

      {/* Create User Modal */}
      <Dialog open={showCreateModal} onOpenChange={setShowCreateModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Create New User</DialogTitle>
          </DialogHeader>

          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="mt-2"
                />
              </div>
              <div>
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="mt-2"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="role">Role</Label>
                <Select
                  value={formData.role}
                  onValueChange={(value) => setFormData({ ...formData, role: value as UserRole })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {Object.entries(ROLE_DEFINITIONS).map(([role, definition]) => (
                      <SelectItem key={role} value={role}>
                        {definition.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="company">Company</Label>
                <Select
                  value={formData.companyId}
                  onValueChange={(value) => setFormData({ ...formData, companyId: value })}
                >
                  <SelectTrigger className="mt-2">
                    <SelectValue placeholder="Select company" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="">No Company</SelectItem>
                    {/* Populate with companies */}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Label htmlFor="active">Account Active</Label>
                <Switch
                  id="active"
                  checked={formData.isActive}
                  onCheckedChange={(checked) => setFormData({ ...formData, isActive: checked })}
                />
              </div>
              <div className="flex items-center justify-between">
                <Label htmlFor="mfa">Require MFA</Label>
                <Switch
                  id="mfa"
                  checked={formData.isMfaEnabled}
                  onCheckedChange={(checked) => setFormData({ ...formData, isMfaEnabled: checked })}
                />
              </div>
            </div>

            <Alert className="bg-blue-50 border-blue-200">
              <AlertTriangle className="h-4 w-4 text-blue-600" />
              <AlertDescription className="text-blue-700">
                A temporary password will be sent to the user's email address. 
                They will be required to change it on first login.
              </AlertDescription>
            </Alert>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowCreateModal(false)}>
              Cancel
            </Button>
            <Button onClick={createUser}>
              Create User
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Permissions Modal */}
      <Dialog open={showPermissionsModal} onOpenChange={setShowPermissionsModal}>
        <DialogContent className="max-w-3xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>User Permissions - {selectedUser?.name}</DialogTitle>
          </DialogHeader>

          {selectedUser && (
            <div className="space-y-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Role: {ROLE_DEFINITIONS[selectedUser.role].name}</p>
                    <p className="text-sm text-gray-600 mt-1">
                      {ROLE_DEFINITIONS[selectedUser.role].description}
                    </p>
                  </div>
                  <Badge className={getRoleBadgeColor(selectedUser.role)}>
                    {selectedUser.role}
                  </Badge>
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-3">Assigned Permissions</h4>
                <div className="space-y-3">
                  {Object.entries(PERMISSION_CATEGORIES).map(([category, details]) => {
                    const categoryPermissions = selectedUser.permissions.filter(p => 
                      p.startsWith(category)
                    );

                    if (categoryPermissions.length === 0) return null;

                    return (
                      <div key={category} className="border rounded-lg p-3">
                        <div className="flex items-center gap-2 mb-2">
                          <Shield className="h-4 w-4 text-gray-400" />
                          <p className="font-medium">{details.name}</p>
                        </div>
                        <div className="grid grid-cols-2 gap-2">
                          {categoryPermissions.map(permission => (
                            <div key={permission} className="flex items-center gap-2 text-sm">
                              <CheckCircle className="h-3 w-3 text-green-500" />
                              <span>{permission}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          <DialogFooter>
            <Button variant="outline" onClick={() => setShowPermissionsModal(false)}>
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}