'use client';

import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  Shield,
  DollarSign,
  TrendingUp,
  Users,
  FileText,
  Settings,
  Download,
  Calendar,
  BarChart3
} from 'lucide-react';

// Import all analytics components
import { KPIPerformanceDashboard } from './KPIPerformanceDashboard';
import { ComplianceReports } from './ComplianceReports';
import { FinancialReports } from './FinancialReports';
import { LeadAnalytics } from './LeadAnalytics';
import { CustomReportBuilder } from './CustomReportBuilder';
import { AuditLogReport } from './AuditLogReport';

import { usePermissions, useHasPermission } from '@/hooks/usePermissions';
import { ProtectedComponent } from '@/components/auth/ProtectedRoute';

export function AnalyticsDashboard() {
  const [activeTab, setActiveTab] = useState('overview');
  const { user } = usePermissions();
  
  const canViewFinancials = useHasPermission('company.billing.view') || useHasPermission('portal.billing.manage');
  const canViewAudit = useHasPermission('portal.audit.full') || useHasPermission('audit.logs.view');
  const canBuildReports = useHasPermission('portal.analytics.view');

  // Sample overview metrics
  const overviewMetrics = {
    kpi: { score: 92, trend: 'up', change: 5 },
    compliance: { score: 95, expiring: 2 },
    financial: { revenue: 125000, expenses: 45000, profit: 80000 },
    leads: { total: 342, converted: 127, rate: 37.1 }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-centre">
        <div>
          <h1 className="text-2xl font-bold flex items-centre gap-2">
            <BarChart3 className="h-6 w-6" />
            Reporting & Analytics
          </h1>
          <p className="text-gray-600 mt-1">
            Performance insights, compliance tracking, and business intelligence
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline">
            <Calendar className="h-4 w-4 mr-2" />
            Schedule Report
          </Button>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export All
          </Button>
          {canBuildReports && (
            <Button>
              <Settings className="h-4 w-4 mr-2" />
              Custom Report
            </Button>
          )}
        </div>
      </div>

      {/* Main Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-7">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="kpi">KPI</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="financial">Financial</TabsTrigger>
          <TabsTrigger value="leads">Leads</TabsTrigger>
          <TabsTrigger value="audit">Audit</TabsTrigger>
          <TabsTrigger value="custom">Custom</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* KPI Summary Card */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveTab('kpi')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-centre justify-between">
                  <span className="flex items-centre gap-2">
                    <Activity className="h-4 w-4" />
                    KPI Performance
                  </span>
                  <Badge className="bg-green-100 text-green-800">
                    <TrendingUp className="h-3 w-3 mr-1" />
                    {overviewMetrics.kpi.change}%
                  </Badge>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{overviewMetrics.kpi.score}%</p>
                <p className="text-xs text-gray-500">Overall performance score</p>
              </CardContent>
            </Card>

            {/* Compliance Summary Card */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveTab('compliance')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-centre justify-between">
                  <span className="flex items-centre gap-2">
                    <Shield className="h-4 w-4" />
                    Compliance
                  </span>
                  {overviewMetrics.compliance.expiring > 0 && (
                    <Badge className="bg-yellow-100 text-yellow-800">
                      {overviewMetrics.compliance.expiring} expiring
                    </Badge>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{overviewMetrics.compliance.score}%</p>
                <p className="text-xs text-gray-500">Compliance score</p>
              </CardContent>
            </Card>

            {/* Financial Summary Card */}
            <ProtectedComponent permission="company.billing.view">
              <Card 
                className="cursor-pointer hover:shadow-lg transition-shadow"
                onClick={() => setActiveTab('financial')}
              >
                <CardHeader className="pb-3">
                  <CardTitle className="text-sm flex items-centre justify-between">
                    <span className="flex items-centre gap-2">
                      <DollarSign className="h-4 w-4" />
                      Financial
                    </span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-2xl font-bold">
                    ${(overviewMetrics.financial.profit / 1000).toFixed(0)}k
                  </p>
                  <p className="text-xs text-gray-500">Net profit this month</p>
                </CardContent>
              </Card>
            </ProtectedComponent>

            {/* Leads Summary Card */}
            <Card 
              className="cursor-pointer hover:shadow-lg transition-shadow"
              onClick={() => setActiveTab('leads')}
            >
              <CardHeader className="pb-3">
                <CardTitle className="text-sm flex items-centre justify-between">
                  <span className="flex items-centre gap-2">
                    <Users className="h-4 w-4" />
                    Lead Analytics
                  </span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-2xl font-bold">{overviewMetrics.leads.rate}%</p>
                <p className="text-xs text-gray-500">Conversion rate</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Insights */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
            <Card>
              <CardHeader>
                <CardTitle>Recent Performance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-centre">
                    <span className="text-sm">Response Time</span>
                    <Badge className="bg-green-100 text-green-800">1.8h avg</Badge>
                  </div>
                  <div className="flex justify-between items-centre">
                    <span className="text-sm">Customer Satisfaction</span>
                    <Badge className="bg-green-100 text-green-800">4.7/5</Badge>
                  </div>
                  <div className="flex justify-between items-centre">
                    <span className="text-sm">Jobs Completed</span>
                    <Badge>42 this week</Badge>
                  </div>
                  <div className="flex justify-between items-centre">
                    <span className="text-sm">Clean Claims Score</span>
                    <Badge className="bg-blue-100 text-blue-800">94%</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between items-centre">
                    <span className="text-sm">IICRC Renewal</span>
                    <Badge className="bg-yellow-100 text-yellow-800">15 days</Badge>
                  </div>
                  <div className="flex justify-between items-centre">
                    <span className="text-sm">Insurance Update</span>
                    <Badge className="bg-yellow-100 text-yellow-800">30 days</Badge>
                  </div>
                  <div className="flex justify-between items-centre">
                    <span className="text-sm">CEU Credits Due</span>
                    <Badge>8 needed</Badge>
                  </div>
                  <div className="flex justify-between items-centre">
                    <span className="text-sm">Quarterly Review</span>
                    <Badge className="bg-blue-100 text-blue-800">Next week</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* KPI Performance Tab */}
        <TabsContent value="kpi">
          <KPIPerformanceDashboard />
        </TabsContent>

        {/* Compliance Tab */}
        <TabsContent value="compliance">
          <ComplianceReports />
        </TabsContent>

        {/* Financial Tab */}
        <TabsContent value="financial">
          <ProtectedComponent 
            permission="company.billing.view"
            message="You need billing permissions to view financial reports"
          >
            <FinancialReports />
          </ProtectedComponent>
        </TabsContent>

        {/* Lead Analytics Tab */}
        <TabsContent value="leads">
          <LeadAnalytics />
        </TabsContent>

        {/* Audit Log Tab */}
        <TabsContent value="audit">
          <ProtectedComponent 
            permission="audit.logs.view"
            message="You need audit permissions to view audit logs"
          >
            <AuditLogReport />
          </ProtectedComponent>
        </TabsContent>

        {/* Custom Report Builder Tab */}
        <TabsContent value="custom">
          <ProtectedComponent 
            permission="portal.analytics.view"
            message="You need admin permissions to build custom reports"
          >
            <CustomReportBuilder />
          </ProtectedComponent>
        </TabsContent>
      </Tabs>
    </div>
  );
}