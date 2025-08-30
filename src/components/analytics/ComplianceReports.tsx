'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar } from '@/components/ui/calendar';
import {
  Shield,
  AlertTriangle,
  CheckCircle,
  Clock,
  FileText,
  Download,
  RefreshCcw,
  Calendar as CalendarIcon,
  Award,
  GraduationCap,
  Building,
  TrendingUp,
  AlertCircle,
  ChevronRight,
  Eye
} from 'lucide-react';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';
import { ComplianceMetrics, AnalyticsDateRange } from '@/types/analytics';
import { usePermissions } from '@/hooks/usePermissions';

export function ComplianceReports() {
  const [metrics, setMetrics] = useState<ComplianceMetrics | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [dateRange, setDateRange] = useState<AnalyticsDateRange>({
    preset: 'last_30_days',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date()
  });
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState('overview');

  const { user } = usePermissions();

  useEffect(() => {
    fetchComplianceMetrics();
  }, [dateRange]);

  const fetchComplianceMetrics = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
        userId: user?.id || '',
        companyId: user?.companyId || ''
      });

      const response = await fetch(`/api/analytics/compliance?${params}`);
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to fetch compliance metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'valid': return 'bg-green-100 text-green-800';
      case 'expiring': return 'bg-yellow-100 text-yellow-800';
      case 'expired': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high': return 'text-red-600';
      case 'medium': return 'text-yellow-600';
      case 'low': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const exportReport = (type: 'pdf' | 'csv' | 'xlsx') => {
    // Generate report based on type
    const endpoint = `/api/analytics/compliance/export?format=${type}`;
    window.open(endpoint, '_blank');
  };

  // Sample data for charts
  const certificationStatus = [
    { name: 'Valid', value: 8, fill: '#10b981' },
    { name: 'Expiring', value: 2, fill: '#f59e0b' },
    { name: 'Expired', value: 1, fill: '#ef4444' }
  ];

  const complianceTrend = [
    { month: 'Jan', score: 85 },
    { month: 'Feb', score: 88 },
    { month: 'Mar', score: 87 },
    { month: 'Apr', score: 91 },
    { month: 'May', score: 93 },
    { month: 'Jun', score: 95 }
  ];

  const ceuProgress = [
    { category: 'Technical', earned: 8, required: 10 },
    { category: 'Safety', earned: 6, required: 6 },
    { category: 'Business', earned: 4, required: 8 }
  ];

  if (!metrics) {
    return (
      <div className="flex items-centre justify-centre min-h-[400px]">
        <div className="text-centre">
          <Shield className="h-8 w-8 animate-spin mx-auto text-gray-400" />
          <p className="text-sm text-gray-500 mt-2">Loading compliance data...</p>
        </div>
      </div>
    );
  }

  const expiringItems = [
    ...metrics.certifications.filter(c => c.status === 'expiring'),
    ...metrics.insurance.filter(i => i.status === 'expiring')
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-centre">
        <div>
          <h2 className="text-2xl font-bold flex items-centre gap-2">
            <Shield className="h-6 w-6" />
            Compliance & Certification Reports
          </h2>
          <p className="text-gray-600 mt-1">
            Monitor compliance status, certifications, and training requirements
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={fetchComplianceMetrics}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={() => exportReport('pdf')}>
            <Download className="h-4 w-4 mr-2" />
            Export PDF
          </Button>
        </div>
      </div>

      {/* Compliance Score Overview */}
      <Card className="border-green-200 bg-gradient-to-r from-green-50 to-emerald-50">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div className="flex-1">
              <p className="text-sm text-gray-600">Overall Compliance Score</p>
              <div className="flex items-baseline gap-3 mt-2">
                <span className={`text-5xl font-bold ${
                  metrics.overallComplianceScore >= 90 ? 'text-green-600' :
                  metrics.overallComplianceScore >= 70 ? 'text-yellow-600' :
                  'text-red-600'
                }`}>
                  {metrics.overallComplianceScore}%
                </span>
                <Badge className="bg-green-100 text-green-800">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Compliant
                </Badge>
              </div>
              <Progress value={metrics.overallComplianceScore} className="mt-4 h-3" />
            </div>
            <div className="ml-8">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={certificationStatus}
                    cx="50%"
                    cy="50%"
                    innerRadius={40}
                    outerRadius={60}
                    paddingAngle={2}
                    dataKey="value"
                  >
                    {certificationStatus.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.fill} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Urgent Alerts */}
      {expiringItems.length > 0 && (
        <Alert className="bg-yellow-50 border-yellow-200">
          <AlertTriangle className="h-4 w-4 text-yellow-600" />
          <AlertDescription className="text-yellow-700">
            <strong>Action Required:</strong> You have {expiringItems.length} certification(s) 
            or insurance policies expiring within 30 days. Review and renew to maintain compliance.
          </AlertDescription>
        </Alert>
      )}

      {/* Quick Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-centre gap-2">
              <Award className="h-4 w-4" />
              Certifications
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {metrics.certifications.filter(c => c.status === 'valid').length}/
              {metrics.certifications.length}
            </p>
            <p className="text-xs text-gray-500">Valid certifications</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-centre gap-2">
              <Shield className="h-4 w-4" />
              Insurance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {metrics.insurance.filter(i => i.status === 'active').length}/
              {metrics.insurance.length}
            </p>
            <p className="text-xs text-gray-500">Active policies</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-centre gap-2">
              <GraduationCap className="h-4 w-4" />
              CEU Credits
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {metrics.ceuCredits.earned}/{metrics.ceuCredits.required}
            </p>
            <p className="text-xs text-gray-500">
              {metrics.ceuCredits.onTrack ? 'On track' : 'Behind schedule'}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-centre gap-2">
              <Clock className="h-4 w-4" />
              Next Deadline
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">
              {metrics.upcomingDeadlines[0]?.dueDate 
                ? Math.ceil((new Date(metrics.upcomingDeadlines[0].dueDate).getTime() - Date.now()) / (1000 * 60 * 60 * 24))
                : '—'} days
            </p>
            <p className="text-xs text-gray-500">
              {metrics.upcomingDeadlines[0]?.item || 'No upcoming deadlines'}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="certifications">Certifications</TabsTrigger>
          <TabsTrigger value="insurance">Insurance</TabsTrigger>
          <TabsTrigger value="training">Training</TabsTrigger>
        </TabsList>

        <TabsContent value="overview">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Compliance Trend</CardTitle>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={250}>
                  <LineChart data={complianceTrend}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis domain={[0, 100]} />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="score" 
                      stroke="#10b981" 
                      strokeWidth={2}
                      name="Compliance Score"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Upcoming Deadlines</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {metrics.upcomingDeadlines.slice(0, 5).map((deadline, index) => (
                    <div key={index} className="flex items-centre justify-between p-3 border rounded-lg">
                      <div className="flex items-centre gap-3">
                        {deadline.type === 'certification' && <Award className="h-4 w-4 text-blue-500" />}
                        {deadline.type === 'insurance' && <Shield className="h-4 w-4 text-green-500" />}
                        {deadline.type === 'training' && <GraduationCap className="h-4 w-4 text-purple-500" />}
                        {deadline.type === 'audit' && <FileText className="h-4 w-4 text-orange-500" />}
                        <div>
                          <p className="font-medium text-sm">{deadline.item}</p>
                          <p className="text-xs text-gray-500">
                            Due: {new Date(deadline.dueDate).toLocaleDateString()}
                          </p>
                        </div>
                      </div>
                      <Badge className={`${
                        deadline.priority === 'high' ? 'bg-red-100 text-red-800' :
                        deadline.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                        'bg-green-100 text-green-800'
                      }`}>
                        {deadline.priority}
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="certifications">
          <Card>
            <CardHeader>
              <CardTitle>Certification Status</CardTitle>
              <CardDescription>
                Track all required certifications and their expiry dates
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.certifications.map((cert, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-centre gap-3 mb-2">
                          <Award className="h-5 w-5 text-blue-500" />
                          <h4 className="font-medium">{cert.name}</h4>
                          <Badge className={getStatusColor(cert.status)}>
                            {cert.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
                          <div>
                            <p className="font-medium">Status</p>
                            <p className="capitalize">{cert.status}</p>
                          </div>
                          <div>
                            <p className="font-medium">Expiry Date</p>
                            <p>{new Date(cert.expiryDate).toLocaleDateString()}</p>
                          </div>
                          <div>
                            <p className="font-medium">Days Until Expiry</p>
                            <p className={cert.daysUntilExpiry <= 30 ? 'text-red-600 font-bold' : ''}>
                              {cert.daysUntilExpiry} days
                            </p>
                          </div>
                        </div>
                        {cert.daysUntilExpiry <= 30 && cert.daysUntilExpiry > 0 && (
                          <Alert className="mt-3 bg-yellow-50 border-yellow-200">
                            <AlertCircle className="h-4 w-4 text-yellow-600" />
                            <AlertDescription className="text-yellow-700">
                              This certification expires soon. Start renewal process immediately.
                            </AlertDescription>
                          </Alert>
                        )}
                      </div>
                      <div className="flex gap-2">
                        <Button variant="outline" size="sm">
                          <Eye className="h-4 w-4 mr-2" />
                          View
                        </Button>
                        {cert.status !== 'valid' && (
                          <Button size="sm">
                            Renew
                          </Button>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="insurance">
          <Card>
            <CardHeader>
              <CardTitle>Insurance Policies</CardTitle>
              <CardDescription>
                Monitor insurance coverage and policy status
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {metrics.insurance.map((policy, index) => (
                  <div key={index} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-centre gap-3 mb-2">
                          <Shield className="h-5 w-5 text-green-500" />
                          <h4 className="font-medium">{policy.type}</h4>
                          <Badge className={policy.status === 'active' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                            {policy.status}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-4 gap-4 text-sm text-gray-600">
                          <div>
                            <p className="font-medium">Provider</p>
                            <p>{policy.provider}</p>
                          </div>
                          <div>
                            <p className="font-medium">Policy Number</p>
                            <p>{policy.policyNumber}</p>
                          </div>
                          <div>
                            <p className="font-medium">Coverage</p>
                            <p>${policy.coverage.toLocaleString()}</p>
                          </div>
                          <div>
                            <p className="font-medium">Expiry</p>
                            <p>{new Date(policy.expiryDate).toLocaleDateString()}</p>
                          </div>
                        </div>
                      </div>
                      <Button variant="outline" size="sm">
                        <FileText className="h-4 w-4 mr-2" />
                        View Policy
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="training">
          <Card>
            <CardHeader>
              <CardTitle>Continuing Education & Training</CardTitle>
              <CardDescription>
                Track CEU credits and training compliance
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-6">
                {/* CEU Progress */}
                <div>
                  <div className="flex justify-between items-centre mb-4">
                    <h4 className="font-medium">CEU Credit Progress</h4>
                    <Badge className={metrics.ceuCredits.onTrack ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                      {metrics.ceuCredits.onTrack ? 'On Track' : 'Behind Schedule'}
                    </Badge>
                  </div>
                  <div className="space-y-3">
                    {ceuProgress.map((category, index) => (
                      <div key={index}>
                        <div className="flex justify-between text-sm mb-1">
                          <span>{category.category}</span>
                          <span>{category.earned}/{category.required} credits</span>
                        </div>
                        <Progress 
                          value={(category.earned / category.required) * 100} 
                          className="h-2"
                        />
                      </div>
                    ))}
                  </div>
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <p className="text-sm text-blue-900">
                      <strong>Total Progress:</strong> {metrics.ceuCredits.earned} of {metrics.ceuCredits.required} credits earned
                    </p>
                    <p className="text-xs text-blue-700 mt-1">
                      Deadline: {new Date(metrics.ceuCredits.deadline).toLocaleDateString()}
                    </p>
                  </div>
                </div>

                {/* Training Calendar */}
                <div>
                  <h4 className="font-medium mb-4">Training Calendar</h4>
                  <div className="border rounded-lg p-4">
                    <Calendar
                      mode="single"
                      selected={selectedDate}
                      onSelect={setSelectedDate}
                      className="rounded-md"
                    />
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