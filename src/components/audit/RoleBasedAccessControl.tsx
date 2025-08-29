'use client';

import React, { useState, useEffect } from 'react';
import {
  Shield, Lock, Unlock, User, Users, Key, Settings, Eye, EyeOff,
  Check, X, AlertTriangle, Info, Edit3, Trash2, Plus, Filter,
  UserCheck, UserX, Building2, FileText, ChevronRight, Award, Search
} from 'lucide-react';
import type { 
  RolePermissions, 
  UserRole,
  Audit,
  ComplianceIndicator
} from '@/types/audit-compliance';

interface RoleBasedAccessControlProps {
  currentUserRole: UserRole;
  currentUserId: string;
  entityType?: 'audit' | 'compliance' | 'remediation' | 'report';
  entityId?: string;
  className?: string;
}

interface UserAccess {
  userId: string;
  userName: string;
  email: string;
  role: UserRole;
  contractorId?: string;
  contractorName?: string;
  permissions: RolePermissions['permissions'];
  accessLevel: 'full' | 'limited' | 'read_only' | 'none';
  lastActive: string;
  status: 'active' | 'inactive' | 'suspended';
}

const RoleBasedAccessControl: React.FC<RoleBasedAccessControlProps> = ({
  currentUserRole,
  currentUserId,
  entityType,
  entityId,
  className = ''
}) => {
  const [users, setUsers] = useState<UserAccess[]>([]);
  const [rolePermissions, setRolePermissions] = useState<RolePermissions[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserAccess | null>(null);
  const [showPermissionsModal, setShowPermissionsModal] = useState(false);
  const [showAddUserModal, setShowAddUserModal] = useState(false);
  const [filterRole, setFilterRole] = useState<UserRole | 'all'>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadAccessData();
  }, [entityType, entityId]);

  const loadAccessData = async () => {
    setLoading(true);
    try {
      // Mock data - replace with actual API call
      const mockUsers: UserAccess[] = [
        {
          userId: 'admin_001',
          userName: 'Jane Smith',
          email: 'jane.smith@nrp.com',
          role: 'admin',
          permissions: {
            viewCompliance: true,
            editCompliance: true,
            createAudits: true,
            performAudits: true,
            viewAudits: true,
            approveFindings: true,
            createRemediations: true,
            verifyRemediations: true,
            generateReports: true,
            exportData: true,
            manageSettings: true
          },
          accessLevel: 'full',
          lastActive: '2024-04-15T14:30:00Z',
          status: 'active'
        },
        {
          userId: 'auditor_001',
          userName: 'John Doe',
          email: 'john.doe@nrp.com',
          role: 'auditor',
          permissions: {
            viewCompliance: true,
            editCompliance: false,
            createAudits: false,
            performAudits: true,
            viewAudits: true,
            approveFindings: true,
            createRemediations: false,
            verifyRemediations: true,
            generateReports: true,
            exportData: true,
            manageSettings: false
          },
          accessLevel: 'limited',
          lastActive: '2024-04-15T10:00:00Z',
          status: 'active'
        },
        {
          userId: 'contractor_001',
          userName: 'Mike Johnson',
          email: 'mike@abcrestoration.com',
          role: 'contractor',
          contractorId: 'contractor_001',
          contractorName: 'ABC Restoration Inc.',
          permissions: {
            viewCompliance: true,
            editCompliance: false,
            createAudits: false,
            performAudits: false,
            viewAudits: true,
            approveFindings: false,
            createRemediations: true,
            verifyRemediations: false,
            generateReports: false,
            exportData: false,
            manageSettings: false
          },
          accessLevel: 'limited',
          lastActive: '2024-04-14T16:45:00Z',
          status: 'active'
        },
        {
          userId: 'compliance_001',
          userName: 'Sarah Wilson',
          email: 'sarah.wilson@nrp.com',
          role: 'compliance_manager',
          permissions: {
            viewCompliance: true,
            editCompliance: true,
            createAudits: true,
            performAudits: true,
            viewAudits: true,
            approveFindings: true,
            createRemediations: true,
            verifyRemediations: true,
            generateReports: true,
            exportData: true,
            manageSettings: true
          },
          accessLevel: 'full',
          lastActive: '2024-04-15T09:00:00Z',
          status: 'active'
        },
        {
          userId: 'viewer_001',
          userName: 'Tom Brown',
          email: 'tom.brown@nrp.com',
          role: 'viewer',
          permissions: {
            viewCompliance: true,
            editCompliance: false,
            createAudits: false,
            performAudits: false,
            viewAudits: true,
            approveFindings: false,
            createRemediations: false,
            verifyRemediations: false,
            generateReports: false,
            exportData: false,
            manageSettings: false
          },
          accessLevel: 'read_only',
          lastActive: '2024-04-13T11:20:00Z',
          status: 'active'
        }
      ];

      const mockRolePermissions: RolePermissions[] = [
        {
          role: 'admin',
          permissions: {
            viewCompliance: true,
            editCompliance: true,
            createAudits: true,
            performAudits: true,
            viewAudits: true,
            approveFindings: true,
            createRemediations: true,
            verifyRemediations: true,
            generateReports: true,
            exportData: true,
            manageSettings: true
          }
        },
        {
          role: 'auditor',
          permissions: {
            viewCompliance: true,
            editCompliance: false,
            createAudits: false,
            performAudits: true,
            viewAudits: true,
            approveFindings: true,
            createRemediations: false,
            verifyRemediations: true,
            generateReports: true,
            exportData: true,
            manageSettings: false
          }
        },
        {
          role: 'contractor',
          permissions: {
            viewCompliance: true,
            editCompliance: false,
            createAudits: false,
            performAudits: false,
            viewAudits: true,
            approveFindings: false,
            createRemediations: true,
            verifyRemediations: false,
            generateReports: false,
            exportData: false,
            manageSettings: false
          }
        }
      ];

      setUsers(mockUsers);
      setRolePermissions(mockRolePermissions);
    } catch (error) {
      console.error('Error loading access data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateUserPermissions = async (userId: string, permissions: Partial<RolePermissions['permissions']>) => {
    try {
      setUsers(prev => prev.map(user => 
        user.userId === userId 
          ? { ...user, permissions: { ...user.permissions, ...permissions } }
          : user
      ));
    } catch (error) {
      console.error('Error updating user permissions:', error);
    }
  };

  const handleUpdateUserRole = async (userId: string, role: UserRole) => {
    try {
      const rolePermission = rolePermissions.find(rp => rp.role === role);
      if (rolePermission) {
        setUsers(prev => prev.map(user => 
          user.userId === userId 
            ? { 
                ...user, 
                role,
                permissions: rolePermission.permissions,
                accessLevel: role === 'admin' || role === 'compliance_manager' ? 'full' :
                           role === 'viewer' ? 'read_only' : 'limited'
              }
            : user
        ));
      }
    } catch (error) {
      console.error('Error updating user role:', error);
    }
  };

  const handleToggleUserStatus = async (userId: string) => {
    try {
      setUsers(prev => prev.map(user => 
        user.userId === userId 
          ? { ...user, status: user.status === 'active' ? 'suspended' : 'active' }
          : user
      ));
    } catch (error) {
      console.error('Error toggling user status:', error);
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case 'admin': return 'bg-purple-100 text-purple-800';
      case 'auditor': return 'bg-blue-100 text-blue-800';
      case 'contractor': return 'bg-green-100 text-green-800';
      case 'compliance_manager': return 'bg-orange-100 text-orange-800';
      case 'viewer': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getRoleIcon = (role: UserRole) => {
    switch (role) {
      case 'admin': return <Shield className="w-4 h-4" />;
      case 'auditor': return <FileText className="w-4 h-4" />;
      case 'contractor': return <Building2 className="w-4 h-4" />;
      case 'compliance_manager': return <Award className="w-4 h-4" />;
      case 'viewer': return <Eye className="w-4 h-4" />;
      default: return <User className="w-4 h-4" />;
    }
  };

  const getAccessLevelColor = (level: string) => {
    switch (level) {
      case 'full': return 'text-green-600 bg-green-50';
      case 'limited': return 'text-yellow-600 bg-yellow-50';
      case 'read_only': return 'text-blue-600 bg-blue-50';
      case 'none': return 'text-red-600 bg-red-50';
      default: return 'text-gray-600 bg-gray-50';
    }
  };

  const filteredUsers = users.filter(user => {
    const matchesRole = filterRole === 'all' || user.role === filterRole;
    const matchesSearch = !searchQuery || 
      user.userName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.contractorName?.toLowerCase().includes(searchQuery.toLowerCase());
    
    return matchesRole && matchesSearch;
  });

  const UserPermissionsModal = () => {
    if (!selectedUser) return null;

    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold text-gray-900">User Permissions</h2>
                <p className="text-sm text-gray-600 mt-1">{selectedUser.userName} - {selectedUser.email}</p>
              </div>
              <button 
                onClick={() => {
                  setSelectedUser(null);
                  setShowPermissionsModal(false);
                }}
                className="p-2 hover:bg-gray-100 rounded-lg"
              >
                <X className="w-5 h-5 text-gray-400" />
              </button>
            </div>
          </div>
          
          <div className="p-6 space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                User Role
              </label>
              <select
                value={selectedUser.role}
                onChange={(e) => handleUpdateUserRole(selectedUser.userId, e.target.value as UserRole)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                disabled={currentUserRole !== 'admin' && currentUserRole !== 'compliance_manager'}
              >
                <option value="admin">Administrator</option>
                <option value="compliance_manager">Compliance Manager</option>
                <option value="auditor">Auditor</option>
                <option value="contractor">Contractor</option>
                <option value="viewer">Viewer</option>
              </select>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Permissions</h3>
              <div className="space-y-3">
                {Object.entries(selectedUser.permissions).map(([key, value]) => (
                  <div key={key} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <label className="flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={value}
                        onChange={(e) => {
                          if (currentUserRole === 'admin' || currentUserRole === 'compliance_manager') {
                            handleUpdateUserPermissions(selectedUser.userId, { [key]: e.target.checked });
                          }
                        }}
                        disabled={currentUserRole !== 'admin' && currentUserRole !== 'compliance_manager'}
                        className="mr-3"
                      />
                      <span className="text-sm text-gray-700">
                        {key.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase())}
                      </span>
                    </label>
                    {value ? (
                      <Check className="w-4 h-4 text-green-600" />
                    ) : (
                      <X className="w-4 h-4 text-red-600" />
                    )}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-700 mb-3">Access Information</h3>
              <div className="grid grid-cols-2 gap-4 text-sm">
                <div>
                  <p className="text-gray-600">Access Level:</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getAccessLevelColor(selectedUser.accessLevel)}`}>
                    {selectedUser.accessLevel.replace('_', ' ').toUpperCase()}
                  </span>
                </div>
                <div>
                  <p className="text-gray-600">Status:</p>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${
                    selectedUser.status === 'active' ? 'bg-green-100 text-green-800' :
                    selectedUser.status === 'suspended' ? 'bg-red-100 text-red-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {selectedUser.status}
                  </span>
                </div>
                <div>
                  <p className="text-gray-600">Last Active:</p>
                  <p className="font-medium">{new Date(selectedUser.lastActive).toLocaleString()}</p>
                </div>
                {selectedUser.contractorName && (
                  <div>
                    <p className="text-gray-600">Organization:</p>
                    <p className="font-medium">{selectedUser.contractorName}</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          <div className="p-6 border-t border-gray-200 flex justify-between">
            {(currentUserRole === 'admin' || currentUserRole === 'compliance_manager') && (
              <button
                onClick={() => handleToggleUserStatus(selectedUser.userId)}
                className={`px-4 py-2 rounded-lg ${
                  selectedUser.status === 'active' 
                    ? 'bg-red-600 text-white hover:bg-red-700'
                    : 'bg-green-600 text-white hover:bg-green-700'
                }`}
              >
                {selectedUser.status === 'active' ? 'Suspend User' : 'Activate User'}
              </button>
            )}
            <button 
              onClick={() => {
                setSelectedUser(null);
                setShowPermissionsModal(false);
              }}
              className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 ml-auto"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  };

  const AccessMatrix = () => (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-lg font-semibold text-gray-900 mb-6">Role-Based Access Matrix</h3>
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b border-gray-200">
              <th className="text-left py-3 px-4 font-medium text-gray-700">Permission</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">Admin</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">Compliance Manager</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">Auditor</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">Contractor</th>
              <th className="text-center py-3 px-4 font-medium text-gray-700">Viewer</th>
            </tr>
          </thead>
          <tbody>
            {[
              { key: 'viewCompliance', label: 'View Compliance' },
              { key: 'editCompliance', label: 'Edit Compliance' },
              { key: 'createAudits', label: 'Create Audits' },
              { key: 'performAudits', label: 'Perform Audits' },
              { key: 'viewAudits', label: 'View Audits' },
              { key: 'approveFindings', label: 'Approve Findings' },
              { key: 'createRemediations', label: 'Create Remediations' },
              { key: 'verifyRemediations', label: 'Verify Remediations' },
              { key: 'generateReports', label: 'Generate Reports' },
              { key: 'exportData', label: 'Export Data' },
              { key: 'manageSettings', label: 'Manage Settings' }
            ].map((permission) => {
              const adminPerm = rolePermissions.find(rp => rp.role === 'admin');
              const managerPerm = rolePermissions.find(rp => rp.role === 'compliance_manager');
              const auditorPerm = rolePermissions.find(rp => rp.role === 'auditor');
              const contractorPerm = rolePermissions.find(rp => rp.role === 'contractor');
              const viewerPerm = rolePermissions.find(rp => rp.role === 'viewer');

              return (
                <tr key={permission.key} className="border-b border-gray-100">
                  <td className="py-3 px-4 text-sm font-medium text-gray-900">
                    {permission.label}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {adminPerm?.permissions[permission.key as keyof RolePermissions['permissions']] ? (
                      <Check className="w-5 h-5 text-green-600 inline" />
                    ) : (
                      <X className="w-5 h-5 text-red-600 inline" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {managerPerm?.permissions[permission.key as keyof RolePermissions['permissions']] ? (
                      <Check className="w-5 h-5 text-green-600 inline" />
                    ) : (
                      <X className="w-5 h-5 text-red-600 inline" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {auditorPerm?.permissions[permission.key as keyof RolePermissions['permissions']] ? (
                      <Check className="w-5 h-5 text-green-600 inline" />
                    ) : (
                      <X className="w-5 h-5 text-red-600 inline" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {contractorPerm?.permissions[permission.key as keyof RolePermissions['permissions']] ? (
                      <Check className="w-5 h-5 text-green-600 inline" />
                    ) : (
                      <X className="w-5 h-5 text-red-600 inline" />
                    )}
                  </td>
                  <td className="py-3 px-4 text-center">
                    {viewerPerm?.permissions[permission.key as keyof RolePermissions['permissions']] ? (
                      <Check className="w-5 h-5 text-green-600 inline" />
                    ) : (
                      <X className="w-5 h-5 text-red-600 inline" />
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className={`space-y-6 ${className}`}>
        <div className="animate-pulse">
          <div className="h-8 bg-gray-200 rounded mb-6"></div>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <div className="bg-gray-200 rounded-xl h-96"></div>
            <div className="bg-gray-200 rounded-xl h-96"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className={`space-y-6 ${className}`}>
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Access Control Management</h1>
          <p className="text-gray-600 mt-1">Manage user roles and permissions</p>
        </div>
        {(currentUserRole === 'admin' || currentUserRole === 'compliance_manager') && (
          <button 
            onClick={() => setShowAddUserModal(true)}
            className="flex items-center px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
          >
            <Plus className="w-4 h-4 mr-2" />
            Add User
          </button>
        )}
      </div>

      <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900">User Access List</h3>
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Search users..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <select
              value={filterRole}
              onChange={(e) => setFilterRole(e.target.value as UserRole | 'all')}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="all">All Roles</option>
              <option value="admin">Administrators</option>
              <option value="compliance_manager">Compliance Managers</option>
              <option value="auditor">Auditors</option>
              <option value="contractor">Contractors</option>
              <option value="viewer">Viewers</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-3 px-4 font-medium text-gray-700">User</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Role</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Access Level</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Status</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Last Active</th>
                <th className="text-left py-3 px-4 font-medium text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredUsers.map((user) => (
                <tr key={user.userId} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div>
                      <p className="font-medium text-gray-900">{user.userName}</p>
                      <p className="text-sm text-gray-600">{user.email}</p>
                      {user.contractorName && (
                        <p className="text-xs text-gray-500">{user.contractorName}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium ${getRoleColor(user.role)}`}>
                      {getRoleIcon(user.role)}
                      <span className="ml-1">{user.role.replace('_', ' ')}</span>
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded text-xs font-medium ${getAccessLevelColor(user.accessLevel)}`}>
                      {user.accessLevel === 'read_only' ? <EyeOff className="w-3 h-3 mr-1" /> : 
                       user.accessLevel === 'full' ? <Unlock className="w-3 h-3 mr-1" /> :
                       <Lock className="w-3 h-3 mr-1" />}
                      {user.accessLevel.replace('_', ' ')}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      user.status === 'active' ? 'bg-green-100 text-green-800' :
                      user.status === 'suspended' ? 'bg-red-100 text-red-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {user.status === 'active' ? <UserCheck className="w-3 h-3 mr-1" /> : <UserX className="w-3 h-3 mr-1" />}
                      {user.status}
                    </span>
                  </td>
                  <td className="py-3 px-4 text-sm text-gray-600">
                    {new Date(user.lastActive).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <button 
                      onClick={() => {
                        setSelectedUser(user);
                        setShowPermissionsModal(true);
                      }}
                      className="text-blue-600 hover:text-blue-700"
                    >
                      <Settings className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <AccessMatrix />

      {showPermissionsModal && selectedUser && <UserPermissionsModal />}
    </div>
  );
};

export default RoleBasedAccessControl;