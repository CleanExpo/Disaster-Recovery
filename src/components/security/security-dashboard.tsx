'use client';

import { useEffect, useState } from 'react';

/**
 * Security Dashboard Component
 *
 * Monitor security, access control, and compliance
 */
export function SecurityDashboard() {
  const [securityMetrics, setSecurityMetrics] = useState<any>(null);
  const [complianceStatus, setComplianceStatus] = useState<any>(null);
  const [accessLogs, setAccessLogs] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedTab, setSelectedTab] = useState<'overview' | 'compliance' | 'access' | 'audit'>('overview');

  useEffect(() => {
    loadSecurityData();
  }, []);

  const loadSecurityData = async () => {
    setIsLoading(true);

    try {
      // Load compliance data
      const complianceRes = await fetch(
        '/api/security/compliance?action=report'
      );
      if (complianceRes.ok) {
        const compliance = await complianceRes.json();
        setComplianceStatus(compliance);
      }

      // Mock security metrics
      setSecurityMetrics({
        totalUsers: 1250,
        activeUsers: 890,
        failedAttempts: 12,
        lockedAccounts: 2,
        passwordsNeedingReset: 5,
        dataRequests: 23,
        compliantRoles: 5,
        violations: 0,
      });

      // Mock access logs
      setAccessLogs([
        {
          id: 1,
          user: 'user_123',
          action: 'login',
          resource: 'dashboard',
          timestamp: Date.now() - 60000,
          success: true,
        },
        {
          id: 2,
          user: 'user_456',
          action: 'file_download',
          resource: 'report.pdf',
          timestamp: Date.now() - 300000,
          success: true,
        },
        {
          id: 3,
          user: 'user_789',
          action: 'permission_change',
          resource: 'user_999',
          timestamp: Date.now() - 600000,
          success: true,
        },
      ]);
    } catch (error) {
      console.error('Error loading security data:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const tabs = [
    { id: 'overview', label: '🔒 Overview', icon: '🔒' },
    { id: 'compliance', label: '📋 Compliance', icon: '📋' },
    { id: 'access', label: '👥 Access Control', icon: '👥' },
    { id: 'audit', label: '📝 Audit Logs', icon: '📝' },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">🔐 Security & Compliance</h1>
        <p className="text-gray-600 mt-1">Monitor access control, security events, and compliance</p>
      </div>

      {/* Tab Navigation */}
      <div className="flex gap-2 border-b border-gray-200">
        {tabs.map(tab => (
          <button
            key={tab.id}
            onClick={() => setSelectedTab(tab.id as any)}
            className={`px-4 py-3 font-medium text-sm transition-colors border-b-2 ${
              selectedTab === tab.id
                ? 'border-blue-600 text-blue-600'
                : 'border-transparent text-gray-600 hover:text-gray-900'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center h-96">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        </div>
      ) : (
        <>
          {/* Overview Tab */}
          {selectedTab === 'overview' && securityMetrics && (
            <div className="space-y-6">
              {/* Security Metrics Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-sm text-gray-600">Active Users</p>
                  <p className="text-3xl font-bold text-gray-900 mt-2">
                    {securityMetrics.activeUsers}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    of {securityMetrics.totalUsers} total
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-sm text-gray-600">Failed Attempts</p>
                  <p className="text-3xl font-bold text-red-600 mt-2">
                    {securityMetrics.failedAttempts}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">
                    {securityMetrics.lockedAccounts} locked accounts
                  </p>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                  <p className="text-sm text-gray-600">Password Reset Needed</p>
                  <p className="text-3xl font-bold text-orange-600 mt-2">
                    {securityMetrics.passwordsNeedingReset}
                  </p>
                  <p className="text-xs text-gray-500 mt-2">Due within 30 days</p>
                </div>
              </div>

              {/* Compliance Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-green-50 rounded-lg border border-green-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">✓ GDPR Compliance</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Consent Records</span>
                      <span className="font-bold text-green-700">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Data Requests</span>
                      <span className="font-bold">
                        {securityMetrics.dataRequests} Pending
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Retention Policies</span>
                      <span className="font-bold text-green-700">Configured</span>
                    </div>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-lg border border-blue-200 p-6">
                  <h3 className="font-bold text-gray-900 mb-4">📊 CCPA Compliance</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">User Rights</span>
                      <span className="font-bold text-blue-700">Implemented</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Opt-Out Tracking</span>
                      <span className="font-bold text-blue-700">Active</span>
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-gray-700">Data Sales</span>
                      <span className="font-bold text-blue-700">Disabled</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Security Status */}
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">🛡️ Security Status</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Encryption</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                      ✓ Enabled
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Two-Factor Authentication</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                      ✓ Available
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Rate Limiting</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                      ✓ Active
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Audit Logging</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                      ✓ Enabled
                    </span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <span className="text-gray-700">Security Violations</span>
                    <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-sm font-bold">
                      {securityMetrics.violations} Found
                    </span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Compliance Tab */}
          {selectedTab === 'compliance' && complianceStatus && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Compliance Status</h3>

                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="font-medium text-gray-900">GDPR Compliant</span>
                    <span className="text-green-700 font-bold">✓ Yes</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-green-50 border border-green-200 rounded-lg">
                    <span className="font-medium text-gray-900">CCPA Compliant</span>
                    <span className="text-green-700 font-bold">✓ Yes</span>
                  </div>

                  <div className="flex items-center justify-between p-3 bg-blue-50 border border-blue-200 rounded-lg">
                    <span className="font-medium text-gray-900">Data Requests Pending</span>
                    <span className="text-blue-700 font-bold">
                      {complianceStatus.pendingRequests}
                    </span>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Latest Compliance Report</h3>
                <p className="text-sm text-gray-600 mb-4">
                  Generated: {complianceStatus.generatedAt}
                </p>

                <button className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-lg transition-colors">
                  📥 Download Report
                </button>
              </div>
            </div>
          )}

          {/* Access Control Tab */}
          {selectedTab === 'access' && (
            <div className="space-y-4">
              <div className="bg-white rounded-lg shadow p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Role-Based Access Control</h3>

                <div className="space-y-3">
                  {['Admin', 'Moderator', 'Manager', 'User', 'Guest'].map(role => (
                    <div
                      key={role}
                      className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <span className="font-medium text-gray-900">{role}</span>
                      <button className="text-blue-600 hover:text-blue-700 text-sm font-bold">
                        👁️ View Permissions
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Audit Log Tab */}
          {selectedTab === 'audit' && accessLogs.length > 0 && (
            <div className="bg-white rounded-lg shadow p-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4">Recent Access Logs</h3>

              <div className="space-y-2">
                {accessLogs.map(log => (
                  <div
                    key={log.id}
                    className="flex items-center justify-between p-3 bg-gray-50 rounded-lg border-l-4 border-blue-500"
                  >
                    <div>
                      <p className="font-medium text-gray-900">{log.action}</p>
                      <p className="text-xs text-gray-600 mt-1">
                        User: {log.user} | Resource: {log.resource}
                      </p>
                    </div>

                    <div className="text-right">
                      <span
                        className={`inline-block px-2 py-1 rounded text-xs font-bold ${
                          log.success
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {log.success ? '✓ Success' : '✕ Failed'}
                      </span>
                      <p className="text-xs text-gray-600 mt-1">
                        {new Date(log.timestamp).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              <button className="w-full mt-4 px-4 py-2 text-blue-600 hover:text-blue-700 font-bold text-sm border border-blue-600 rounded-lg hover:bg-blue-50 transition-colors">
                📊 View Full Audit Log
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
