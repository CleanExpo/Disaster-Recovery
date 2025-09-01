'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Shield,
  User,
  FileText,
  Calendar,
  Clock,
  Search,
  Filter,
  Download,
  RefreshCcw,
  AlertTriangle,
  CheckCircle,
  XCircle,
  Eye,
  Edit,
  Trash2,
  UserPlus,
  CreditCard,
  MapPin,
  Key,
  Activity
} from 'lucide-react';

interface AuditLog {
  id: string;
  timestamp: string;
  userId: string;
  userName: string;
  userRole: 'admin' | 'contractor' | 'system';
  action: string;
  category: 'authentication' | 'contractor' | 'document' | 'payment' | 'territory' | 'compliance' | 'system';
  severity: 'info' | 'warning' | 'error' | 'critical';
  entityType?: string;
  entityId?: string;
  details: string;
  ipAddress?: string;
  userAgent?: string;
  success: boolean;
  metadata?: Record<string, any>;
}

export function AuditLogs() {
  const [logs, setLogs] = useState<AuditLog[]>([]);
  const [filterCategory, setFilterCategory] = useState<string>('all');
  const [filterSeverity, setFilterSeverity] = useState<string>('all');
  const [filterUser, setFilterUser] = useState<string>('all');
  const [dateRange, setDateRange] = useState<string>('today');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);
  const [selectedLog, setSelectedLog] = useState<AuditLog | null>(null);

  useEffect(() => {
    fetchAuditLogs();
    const interval = setInterval(fetchAuditLogs, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, [filterCategory, filterSeverity, filterUser, dateRange]);

  const fetchAuditLogs = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        category: filterCategory,
        severity: filterSeverity,
        user: filterUser,
        dateRange
      });
      const response = await fetch(`/api/admin/audit-logs?${params}`);
      const data = await response.json();
      setLogs(data);
    } catch (error) {
      console.error('Failed to fetch audit logs:', error);
    } finally {
      setLoading(false);
    }
  };

  const getActionIcon = (category: string) => {
    switch (category) {
      case 'authentication': return <Key className="h-4 w-4" />;
      case 'contractor': return <User className="h-4 w-4" />;
      case 'document': return <FileText className="h-4 w-4" />;
      case 'payment': return <CreditCard className="h-4 w-4" />;
      case 'territory': return <MapPin className="h-4 w-4" />;
      case 'compliance': return <Shield className="h-4 w-4" />;
      case 'system': return <Activity className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-100 text-red-800';
      case 'error': return 'bg-orange-100 text-orange-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'info': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getActionColor = (action: string, success: boolean) => {
    if (!success) return 'text-red-600';
    if (action.includes('delete') || action.includes('remove')) return 'text-blue-700';
    if (action.includes('create') || action.includes('add')) return 'text-green-600';
    if (action.includes('update') || action.includes('modify')) return 'text-blue-600';
    return 'text-gray-600';
  };

  const exportLogs = () => {
    const csv = [
      ['Timestamp', 'User', 'Action', 'Category', 'Severity', 'Details', 'Success'],
      ...logs.map(log => [
        log.timestamp,
        log.userName,
        log.action,
        log.category,
        log.severity,
        log.details,
        log.success ? 'Yes' : 'No'
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csv], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `audit-logs-${new Date().toISOString()}.csv`;
    a.click();
  };

  const filteredLogs = logs.filter(log =>
    (filterCategory === 'all' || log.category === filterCategory) &&
    (filterSeverity === 'all' || log.severity === filterSeverity) &&
    (filterUser === 'all' || log.userId === filterUser) &&
    (searchTerm === '' || 
     log.action.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.details.toLowerCase().includes(searchTerm.toLowerCase()) ||
     log.userName.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const criticalLogs = logs.filter(log => log.severity === 'critical');
  const failedActions = logs.filter(log => !log.success);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-bold">Audit Logs & Security Events</h2>
        <div className="flex gap-3">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search logs..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10 w-64"
            />
          </div>
          <Select value={dateRange} onValueChange={setDateRange}>
            <SelectTrigger className="w-32">
              <SelectValue placeholder="Date Range" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="week">This Week</SelectItem>
              <SelectItem value="month">This Month</SelectItem>
              <SelectItem value="all">All Time</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchAuditLogs}>
            <RefreshCcw className="h-4 w-4" />
          </Button>
          <Button variant="outline" onClick={exportLogs}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Security Alerts */}
      {(criticalLogs.length > 0 || failedActions.length > 5) && (
        <Alert className="bg-red-50 border-red-200">
          <AlertTriangle className="h-4 w-4 text-red-600" />
          <AlertDescription className="text-red-700">
            <strong>Security Alert:</strong>
            {criticalLogs.length > 0 && ` ${criticalLogs.length} critical events detected.`}
            {failedActions.length > 5 && ` ${failedActions.length} failed actions in the last hour.`}
            Review immediately.
          </AlertDescription>
        </Alert>
      )}

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Total Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{logs.length}</p>
            <p className="text-xs text-gray-500">{dateRange === 'today' ? 'Today' : dateRange}</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Failed Actions</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-red-600">{failedActions.length}</p>
            <p className="text-xs text-gray-500">Require review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Critical Events</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-blue-700">{criticalLogs.length}</p>
            <p className="text-xs text-gray-500">Security issues</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm">Active Users</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {new Set(logs.map(l => l.userId)).size}
            </p>
            <p className="text-xs text-gray-500">Unique users</p>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All Events</TabsTrigger>
          <TabsTrigger value="security">Security</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
        </TabsList>

        <TabsContent value="all">
          <Card>
            <CardHeader>
              <div className="flex justify-between items-center">
                <CardTitle className="text-lg">Activity Log</CardTitle>
                <div className="flex gap-2">
                  <Select value={filterCategory} onValueChange={setFilterCategory}>
                    <SelectTrigger className="w-40">
                      <SelectValue placeholder="Category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Categories</SelectItem>
                      <SelectItem value="authentication">Authentication</SelectItem>
                      <SelectItem value="contractor">Contractor</SelectItem>
                      <SelectItem value="document">Document</SelectItem>
                      <SelectItem value="payment">Payment</SelectItem>
                      <SelectItem value="territory">Territory</SelectItem>
                      <SelectItem value="compliance">Compliance</SelectItem>
                      <SelectItem value="system">System</SelectItem>
                    </SelectContent>
                  </Select>
                  <Select value={filterSeverity} onValueChange={setFilterSeverity}>
                    <SelectTrigger className="w-32">
                      <SelectValue placeholder="Severity" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All</SelectItem>
                      <SelectItem value="info">Info</SelectItem>
                      <SelectItem value="warning">Warning</SelectItem>
                      <SelectItem value="error">Error</SelectItem>
                      <SelectItem value="critical">Critical</SelectItem>
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
                      <th className="text-left p-4 font-medium text-sm">Time</th>
                      <th className="text-left p-4 font-medium text-sm">User</th>
                      <th className="text-left p-4 font-medium text-sm">Action</th>
                      <th className="text-left p-4 font-medium text-sm">Category</th>
                      <th className="text-left p-4 font-medium text-sm">Severity</th>
                      <th className="text-left p-4 font-medium text-sm">Details</th>
                      <th className="text-left p-4 font-medium text-sm">Status</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredLogs.map(log => (
                      <tr key={log.id} className="border-b hover:bg-gray-50">
                        <td className="p-4">
                          <div className="text-sm">
                            <p className="font-medium">
                              {new Date(log.timestamp).toLocaleTimeString()}
                            </p>
                            <p className="text-xs text-gray-500">
                              {new Date(log.timestamp).toLocaleDateString()}
                            </p>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            <User className="h-4 w-4 text-gray-400" />
                            <div>
                              <p className="text-sm font-medium">{log.userName}</p>
                              <p className="text-xs text-gray-500">{log.userRole}</p>
                            </div>
                          </div>
                        </td>
                        <td className="p-4">
                          <div className="flex items-center gap-2">
                            {getActionIcon(log.category)}
                            <span className={`text-sm font-medium ${getActionColor(log.action, log.success)}`}>
                              {log.action}
                            </span>
                          </div>
                        </td>
                        <td className="p-4">
                          <Badge variant="outline" className="capitalize">
                            {log.category}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <Badge className={getSeverityColor(log.severity)}>
                            {log.severity}
                          </Badge>
                        </td>
                        <td className="p-4">
                          <p className="text-sm text-gray-600 truncate max-w-xs">
                            {log.details}
                          </p>
                        </td>
                        <td className="p-4">
                          {log.success ? (
                            <CheckCircle className="h-4 w-4 text-green-500" />
                          ) : (
                            <XCircle className="h-4 w-4 text-red-500" />
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Security Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredLogs
                  .filter(log => 
                    log.category === 'authentication' || 
                    log.severity === 'critical' ||
                    log.severity === 'error'
                  )
                  .map(log => (
                    <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <Shield className={`h-5 w-5 ${
                              log.severity === 'critical' ? 'text-red-500' : 'text-blue-600'
                            }`} />
                            <p className="font-medium">{log.action}</p>
                            <Badge className={getSeverityColor(log.severity)}>
                              {log.severity}
                            </Badge>
                          </div>
                          <p className="text-sm text-gray-600">{log.details}</p>
                          <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                            <span>{log.userName}</span>
                            <span>{log.ipAddress}</span>
                            <span>{new Date(log.timestamp).toLocaleString()}</span>
                          </div>
                        </div>
                        <Button variant="outline" size="sm" onClick={() => setSelectedLog(log)}>
                          <Eye className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Compliance Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredLogs
                  .filter(log => 
                    log.category === 'compliance' || 
                    log.category === 'document'
                  )
                  .map(log => (
                    <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <p className="font-medium mb-1">{log.action}</p>
                          <p className="text-sm text-gray-600">{log.details}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {log.userName} • {new Date(log.timestamp).toLocaleString()}
                          </p>
                        </div>
                        {!log.success && (
                          <Badge variant="destructive">Failed</Badge>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="financial">
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Financial Events</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                {filteredLogs
                  .filter(log => log.category === 'payment')
                  .map(log => (
                    <div key={log.id} className="border rounded-lg p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center gap-2 mb-2">
                            <CreditCard className="h-4 w-4 text-gray-400" />
                            <p className="font-medium">{log.action}</p>
                          </div>
                          <p className="text-sm text-gray-600">{log.details}</p>
                          <p className="text-xs text-gray-500 mt-2">
                            {log.userName} • {new Date(log.timestamp).toLocaleString()}
                          </p>
                        </div>
                        {log.metadata?.amount && (
                          <p className="font-medium text-lg">
                            ${log.metadata.amount.toLocaleString()}
                          </p>
                        )}
                      </div>
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