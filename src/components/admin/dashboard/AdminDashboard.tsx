'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Users,
  FileSearch,
  MapPin,
  CreditCard,
  HeadphonesIcon,
  Shield,
  Activity,
  AlertTriangle,
  CheckCircle,
  Clock,
  TrendingUp,
  Settings,
  Download,
  Filter
} from 'lucide-react';

// Import admin sections
import { ApplicationReview } from './sections/ApplicationReview';
import { DocumentVerification } from './sections/DocumentVerification';
import { BackgroundChecks } from './sections/BackgroundChecks';
import { TerritoryManager } from './sections/TerritoryManager';
import { SubscriptionManager } from './sections/SubscriptionManager';
import { SupportTickets } from './sections/SupportTickets';
import { AuditLogs } from './sections/AuditLogs';
import { ComplianceOverview } from './sections/ComplianceOverview';

interface AdminDashboardProps {
  user?: any;
}

export function AdminDashboard({ user }: AdminDashboardProps) {
  const [activeTab, setActiveTab] = useState('overview');
  const [stats, setStats] = useState({
    pendingApplications: 0,
    activeContractors: 0,
    documentsToVerify: 0,
    openTickets: 0,
    overduePayments: 0,
    complianceIssues: 0,
    territoryConflicts: 0,
    backgroundChecksPending: 0
  });

  const [notifications, setNotifications] = useState<any[]>([]);

  useEffect(() => {
    fetchDashboardStats();
    fetchNotifications();
    const interval = setInterval(() => {
      fetchDashboardStats();
      fetchNotifications();
    }, 30000); // Refresh every 30 seconds
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/admin/dashboard/stats');
      const data = await response.json();
      setStats(data);
    } catch (error) {
      console.error('Failed to fetch dashboard stats:', error);
    }
  };

  const fetchNotifications = async () => {
    try {
      const response = await fetch('/api/admin/notifications');
      const data = await response.json();
      setNotifications(data);
    } catch (error) {
      console.error('Failed to fetch notifications:', error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                NRP Admin Portal
              </h1>
              <p className="text-gray-600">
                Contractor Management & Compliance
              </p>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-sm text-gray-600">
                Welcome, {user?.name || 'Administrator'}
              </span>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Urgent Notifications */}
      {notifications.filter(n => n.priority === 'urgent').length > 0 && (
        <div className="container mx-auto px-4 py-3">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              <strong>Urgent:</strong> {notifications.filter(n => n.priority === 'urgent').length} items require immediate attention
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-8 w-full mb-6">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="applications">Applications</TabsTrigger>
            <TabsTrigger value="verification">Verification</TabsTrigger>
            <TabsTrigger value="background">Background</TabsTrigger>
            <TabsTrigger value="territory">Territory</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
            <TabsTrigger value="audit">Audit</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card 
                className={stats.pendingApplications > 5 ? 'border-yellow-200' : ''}
                onClick={() => setActiveTab('applications')}
                style={{ cursor: 'pointer' }}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Pending Applications
                  </CardTitle>
                  <Users className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.pendingApplications}</div>
                  <p className="text-xs text-gray-600 mt-1">
                    {stats.pendingApplications > 0 ? 'Requires review' : 'All processed'}
                  </p>
                </CardContent>
              </Card>

              <Card 
                onClick={() => setActiveTab('verification')}
                style={{ cursor: 'pointer' }}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Documents to Verify
                  </CardTitle>
                  <FileSearch className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.documentsToVerify}</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Awaiting verification
                  </p>
                </CardContent>
              </Card>

              <Card 
                className={stats.complianceIssues > 0 ? 'border-red-200' : ''}
                onClick={() => setActiveTab('verification')}
                style={{ cursor: 'pointer' }}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Compliance Issues
                  </CardTitle>
                  <Shield className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold text-red-600">
                    {stats.complianceIssues}
                  </div>
                  <p className="text-xs text-gray-600 mt-1">
                    Need attention
                  </p>
                </CardContent>
              </Card>

              <Card 
                onClick={() => setActiveTab('support')}
                style={{ cursor: 'pointer' }}
              >
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">
                    Open Tickets
                  </CardTitle>
                  <HeadphonesIcon className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{stats.openTickets}</div>
                  <p className="text-xs text-gray-600 mt-1">
                    Awaiting response
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Activity Summary */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {notifications.slice(0, 5).map((notification, index) => (
                      <div key={index} className="flex items-start gap-3">
                        <div className={`mt-1 w-2 h-2 rounded-full ${
                          notification.type === 'application' ? 'bg-blue-500' :
                          notification.type === 'compliance' ? 'bg-blue-600' :
                          notification.type === 'payment' ? 'bg-green-500' :
                          'bg-gray-500'
                        }`} />
                        <div className="flex-1">
                          <p className="text-sm">{notification.message}</p>
                          <p className="text-xs text-gray-500 mt-1">
                            {notification.timestamp}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <ComplianceOverview />
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col py-3"
                    onClick={() => setActiveTab('applications')}
                  >
                    <Users className="h-5 w-5 mb-2" />
                    <span className="text-xs">Review Applications</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col py-3"
                    onClick={() => setActiveTab('verification')}
                  >
                    <FileSearch className="h-5 w-5 mb-2" />
                    <span className="text-xs">Verify Documents</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col py-3"
                    onClick={() => setActiveTab('territory')}
                  >
                    <MapPin className="h-5 w-5 mb-2" />
                    <span className="text-xs">Manage Territories</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-auto flex-col py-3"
                  >
                    <Download className="h-5 w-5 mb-2" />
                    <span className="text-xs">Export Reports</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Applications Tab */}
          <TabsContent value="applications">
            <ApplicationReview />
          </TabsContent>

          {/* Document Verification Tab */}
          <TabsContent value="verification">
            <DocumentVerification />
          </TabsContent>

          {/* Background Checks Tab */}
          <TabsContent value="background">
            <BackgroundChecks />
          </TabsContent>

          {/* Territory Management Tab */}
          <TabsContent value="territory">
            <TerritoryManager />
          </TabsContent>

          {/* Billing/Subscription Tab */}
          <TabsContent value="billing">
            <SubscriptionManager />
          </TabsContent>

          {/* Support Tickets Tab */}
          <TabsContent value="support">
            <SupportTickets />
          </TabsContent>

          {/* Audit Logs Tab */}
          <TabsContent value="audit">
            <AuditLogs />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}