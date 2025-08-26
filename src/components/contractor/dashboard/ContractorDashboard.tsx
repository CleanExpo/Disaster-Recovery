'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  BarChart3,
  Bell,
  Building2,
  Calendar,
  CheckCircle,
  CreditCard,
  FileText,
  GraduationCap,
  HeadphonesIcon,
  MapPin,
  Settings,
  Shield,
  TrendingUp,
  AlertTriangle,
  Clock,
  DollarSign,
  Star,
  Activity
} from 'lucide-react';

import type { ContractorDashboard, ContractorStatus } from '@/types/contractor';

// Import sub-components - temporarily commented out missing components
// import { KPIMetrics } from './KPIMetrics';
// import { CompliancePanel } from './CompliancePanel';
// import { TerritoryManager } from './TerritoryManager';
// import { DocumentManager } from './DocumentManager';
// import { TrainingTracker } from './TrainingTracker';
// import { BillingSection } from './BillingSection';
// import { SupportTickets } from './SupportTickets';
// import { NotificationCenter } from './NotificationCenter';

export function ContractorDashboard() {
  const [dashboardData, setDashboardData] = useState<ContractorDashboard | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchDashboardData();
    const interval = setInterval(fetchDashboardData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/contractor/dashboard');
      const data = await response.json();
      setDashboardData(data);
    } catch (error) {
      console.error('Failed to fetch dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading || !dashboardData) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-pulse">Loading dashboard...</div>
      </div>
    );
  }

  const getStatusColor = (status: ContractorStatus) => {
    switch (status) {
      case 'APPROVED': return 'bg-green-100 text-green-800';
      case 'PENDING': return 'bg-yellow-100 text-yellow-800';
      case 'UNDER_REVIEW': return 'bg-blue-100 text-blue-800';
      case 'SUSPENDED': return 'bg-red-100 text-red-800';
      case 'REJECTED': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const urgentNotifications = dashboardData.notifications.filter(n => n.priority === 'URGENT');
  const complianceIssues = dashboardData.compliance.items.filter(i => i.status !== 'VALID').length;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Contractor Portal
              </h1>
              <p className="text-gray-600">
                Welcome back, {dashboardData.profile.companyName}
              </p>
            </div>
            <div className="flex items-center gap-4">
              <Badge className={getStatusColor(dashboardData.profile.status)}>
                {dashboardData.profile.status}
              </Badge>
              <Button variant="outline" size="icon">
                <Bell className="h-4 w-4" />
                {urgentNotifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 h-3 w-3 bg-red-500 rounded-full" />
                )}
              </Button>
              <Button variant="outline" size="icon">
                <Settings className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Alerts */}
      {urgentNotifications.length > 0 && (
        <div className="container mx-auto px-4 py-4">
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertDescription>
              You have {urgentNotifications.length} urgent notification(s) requiring immediate attention.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {complianceIssues > 0 && (
        <div className="container mx-auto px-4 pb-4">
          <Alert className="bg-yellow-50 border-yellow-200">
            <Clock className="h-4 w-4 text-yellow-600" />
            <AlertDescription className="text-yellow-800">
              {complianceIssues} compliance item(s) require your attention to maintain active status.
            </AlertDescription>
          </Alert>
        </div>
      )}

      {/* Main Content */}
      <div className="container mx-auto px-4 py-6">
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-7 w-full">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="kpi">Performance</TabsTrigger>
            <TabsTrigger value="compliance">Compliance</TabsTrigger>
            <TabsTrigger value="territory">Territory</TabsTrigger>
            <TabsTrigger value="training">Training</TabsTrigger>
            <TabsTrigger value="billing">Billing</TabsTrigger>
            <TabsTrigger value="support">Support</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Quick Stats */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
                  <BarChart3 className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">{dashboardData.kpi.totalJobs}</div>
                  <p className="text-xs text-gray-600">
                    {dashboardData.kpi.completedJobs} completed
                  </p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
                  <Star className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.kpi.qualityScore?.toFixed(1)}%
                  </div>
                  <Progress value={dashboardData.kpi.qualityScore} className="mt-2 h-1" />
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Response Time</CardTitle>
                  <Clock className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {dashboardData.kpi.averageResponseTime?.toFixed(1)}h
                  </div>
                  <p className="text-xs text-gray-600">Average response</p>
                </CardContent>
              </Card>

              <Card>
                <CardHeader className="flex flex-row items-center justify-between pb-2">
                  <CardTitle className="text-sm font-medium">Account Balance</CardTitle>
                  <DollarSign className="h-4 w-4 text-gray-400" />
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    ${dashboardData.subscription.accountBalance.toFixed(2)}
                  </div>
                  <p className="text-xs text-gray-600">
                    Credit limit: ${dashboardData.subscription.creditLimit}
                  </p>
                </CardContent>
              </Card>
            </div>

            {/* Subscription Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <CreditCard className="h-5 w-5" />
                  Subscription Details
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div>
                    <p className="text-sm text-gray-600">Current Tier</p>
                    <p className="font-semibold">{dashboardData.subscription.tier}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Next Billing</p>
                    <p className="font-semibold">
                      {dashboardData.subscription.nextBillingDate 
                        ? new Date(dashboardData.subscription.nextBillingDate).toLocaleDateString()
                        : 'N/A'}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">Monthly Amount</p>
                    <p className="font-semibold">${dashboardData.subscription.amount}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Recent Notifications */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Bell className="h-5 w-5" />
                  Recent Notifications
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {dashboardData.notifications.slice(0, 5).map(notification => (
                    <div 
                      key={notification.id}
                      className="flex items-start justify-between p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="flex-1">
                        <p className="font-medium text-sm">{notification.subject}</p>
                        <p className="text-xs text-gray-600 mt-1">{notification.message}</p>
                        <p className="text-xs text-gray-400 mt-2">
                          {new Date(notification.createdAt).toLocaleString()}
                        </p>
                      </div>
                      {notification.actionRequired && (
                        <Badge variant="outline" className="ml-2">
                          Action Required
                        </Badge>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Compliance Summary */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Shield className="h-5 w-5" />
                  Compliance Status
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between mb-4">
                  <Badge 
                    className={
                      dashboardData.compliance.overallStatus === 'COMPLIANT'
                        ? 'bg-green-100 text-green-800'
                        : dashboardData.compliance.overallStatus === 'ACTION_REQUIRED'
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-red-100 text-red-800'
                    }
                  >
                    {dashboardData.compliance.overallStatus}
                  </Badge>
                  <Button variant="outline" size="sm" onClick={() => setActiveTab('compliance')}>
                    View Details
                  </Button>
                </div>
                <div className="space-y-2">
                  {dashboardData.compliance.items.slice(0, 3).map((item, index) => (
                    <div key={index} className="flex justify-between items-center">
                      <span className="text-sm">{item.name}</span>
                      <Badge 
                        variant="outline"
                        className={
                          item.status === 'VALID'
                            ? 'border-green-600 text-green-600'
                            : item.status === 'EXPIRING'
                            ? 'border-yellow-600 text-yellow-600'
                            : 'border-red-600 text-red-600'
                        }
                      >
                        {item.status}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Performance/KPI Tab */}
          <TabsContent value="kpi">
            <KPIMetrics data={dashboardData.kpi} />
          </TabsContent>

          {/* Compliance Tab */}
          <TabsContent value="compliance">
            <CompliancePanel 
              compliance={dashboardData.compliance}
              certifications={dashboardData.profile.certifications}
              insurance={dashboardData.profile.insurance}
            />
          </TabsContent>

          {/* Territory Tab */}
          <TabsContent value="territory">
            <TerritoryManager territories={dashboardData.profile.territories} />
          </TabsContent>

          {/* Training Tab */}
          <TabsContent value="training">
            <TrainingTracker trainings={dashboardData.training} />
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing">
            <BillingSection subscription={dashboardData.subscription} />
          </TabsContent>

          {/* Support Tab */}
          <TabsContent value="support">
            <SupportTickets tickets={dashboardData.support} />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}