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
  MapPin,
  Settings,
  Shield,
  TrendingUp,
  AlertTriangle,
  Clock,
  DollarSign,
  Star,
  Activity,
  Users,
  Award,
  FileCheck
} from 'lucide-react';

export function SimpleDashboard() {
  const [activeTab, setActiveTab] = useState('overview');

  // Demo data
  const kpiData = {
    jobsCompleted: 47,
    avgRating: 4.8,
    responseTime: '45 min',
    revenue: '$124,580',
    activeJobs: 3,
    pendingInvoices: 5
  };

  const complianceData = {
    insurance: { status: 'active', expiry: '2025-03-15' },
    certifications: { status: 'active', expiry: '2025-06-20' },
    background: { status: 'verified', date: '2024-12-01' },
    licenses: { status: 'active', expiry: '2025-09-30' }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold">Contractor Dashboard</h1>
          <p className="text-gray-600 mt-1">Welcome back, Demo Restoration Services</p>
        </div>
        <Badge className="bg-green-100 text-green-800">Active</Badge>
      </div>

      {/* KPI Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Jobs Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.jobsCompleted}</div>
            <p className="text-xs text-gray-600">This month</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Average Rating</CardTitle>
            <Star className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.avgRating}</div>
            <p className="text-xs text-gray-600">From 89 reviews</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.responseTime}</div>
            <p className="text-xs text-gray-600">Average</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Revenue</CardTitle>
            <DollarSign className="h-4 w-4 text-gray-400" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{kpiData.revenue}</div>
            <p className="text-xs text-gray-600">Year to date</p>
          </CardContent>
        </Card>
      </div>

      {/* Main Content Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="jobs">Jobs</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
          <TabsTrigger value="billing">Billing</TabsTrigger>
        </TabsList>

        <TabsContent value="overview" className="space-y-4">
          {/* Active Jobs Alert */}
          <Alert>
            <Activity className="h-4 w-4" />
            <AlertDescription>
              You have <strong>{kpiData.activeJobs} active jobs</strong> and{' '}
              <strong>{kpiData.pendingInvoices} pending invoices</strong> requiring attention.
            </AlertDescription>
          </Alert>

          {/* Performance Overview */}
          <Card>
            <CardHeader>
              <CardTitle>Performance Overview</CardTitle>
              <CardDescription>Your performance metrics for the last 30 days</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Job Completion Rate</span>
                  <span className="text-sm font-semibold">95%</span>
                </div>
                <Progress value={95} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">Customer Satisfaction</span>
                  <span className="text-sm font-semibold">96%</span>
                </div>
                <Progress value={96} />
              </div>
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm text-gray-600">On-Time Arrival</span>
                  <span className="text-sm font-semibold">89%</span>
                </div>
                <Progress value={89} />
              </div>
            </CardContent>
          </Card>

          {/* Recent Activity */}
          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-5 w-5 text-green-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Job #1247 completed</p>
                    <p className="text-xs text-gray-500">Water damage restoration - 2 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <FileCheck className="h-5 w-5 text-blue-500" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">Invoice #892 submitted</p>
                    <p className="text-xs text-gray-500">$3,450 - 5 hours ago</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Award className="h-5 w-5 text-blue-600" />
                  <div className="flex-1">
                    <p className="text-sm font-medium">5-star review received</p>
                    <p className="text-xs text-gray-500">From John Smith - Yesterday</p>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="jobs" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Active Jobs</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Job #1248 - Water Damage</h3>
                      <p className="text-sm text-gray-600">123 Main St, Sydney</p>
                      <p className="text-xs text-gray-500 mt-1">Started: 2 hours ago</p>
                    </div>
                    <Badge>In Progress</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Job #1249 - Mould Remediation</h3>
                      <p className="text-sm text-gray-600">456 Park Ave, Melbourne</p>
                      <p className="text-xs text-gray-500 mt-1">Scheduled: Tomorrow 9:00 AM</p>
                    </div>
                    <Badge variant="outline">Scheduled</Badge>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold">Job #1250 - Fire Damage Assessment</h3>
                      <p className="text-sm text-gray-600">789 Queen St, Brisbane</p>
                      <p className="text-xs text-gray-500 mt-1">Scheduled: Next Monday</p>
                    </div>
                    <Badge variant="outline">Pending</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Compliance Status</CardTitle>
              <CardDescription>Keep your certifications and documents up to date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Shield className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Insurance</p>
                      <p className="text-xs text-gray-500">Expires: {complianceData.insurance.expiry}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Award className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">IICRC Certifications</p>
                      <p className="text-xs text-gray-500">Expires: {complianceData.certifications.expiry}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <Users className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Background Check</p>
                      <p className="text-xs text-gray-500">Verified: {complianceData.background.date}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Verified</Badge>
                </div>
                <div className="flex items-center justify-between p-3 border rounded-lg">
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-green-500" />
                    <div>
                      <p className="font-medium">Business Licenses</p>
                      <p className="text-xs text-gray-500">Expires: {complianceData.licenses.expiry}</p>
                    </div>
                  </div>
                  <Badge className="bg-green-100 text-green-800">Active</Badge>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Training & Certifications</CardTitle>
              <CardDescription>Keep your skills up to date</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Available Courses</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Advanced Water Damage Restoration</p>
                        <p className="text-xs text-gray-500">Duration: 8 hours | CEUs: 0.8</p>
                      </div>
                      <Button size="sm">Enroll</Button>
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm font-medium">Mould Remediation Best Practices</p>
                        <p className="text-xs text-gray-500">Duration: 4 hours | CEUs: 0.4</p>
                      </div>
                      <Button size="sm">Enroll</Button>
                    </div>
                  </div>
                </div>
                <div className="border rounded-lg p-4">
                  <h3 className="font-semibold mb-2">Completed Courses</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">IICRC WRT Certification</p>
                        <p className="text-xs text-gray-500">Completed: Jan 15, 2024</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                    <div className="flex justify-between items-center">
                      <div>
                        <p className="text-sm">Fire Damage Restoration</p>
                        <p className="text-xs text-gray-500">Completed: Dec 1, 2023</p>
                      </div>
                      <CheckCircle className="h-5 w-5 text-green-500" />
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Outstanding Balance</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$12,450</div>
                <p className="text-xs text-gray-600">5 invoices pending</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Last Payment</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$8,320</div>
                <p className="text-xs text-gray-600">Received 3 days ago</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-2">
                <CardTitle className="text-sm font-medium">Next Payout</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$5,200</div>
                <p className="text-xs text-gray-600">In 2 days</p>
              </CardContent>
            </Card>
          </div>
          
          <Card>
            <CardHeader>
              <CardTitle>Recent Invoices</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-3">
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Invoice #892</p>
                    <p className="text-xs text-gray-500">Water damage - Job #1247</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">$3,450</p>
                    <Badge variant="outline" className="text-xs">Pending</Badge>
                  </div>
                </div>
                <div className="flex justify-between items-center p-3 border rounded">
                  <div>
                    <p className="font-medium">Invoice #891</p>
                    <p className="text-xs text-gray-500">Mould remediation - Job #1244</p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">$2,100</p>
                    <Badge className="bg-green-100 text-green-800 text-xs">Paid</Badge>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}