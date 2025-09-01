'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Progress } from '@/components/ui/progress';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  Star,
  AlertTriangle,
  CheckCircle,
  DollarSign,
  Award,
  Target,
  Users,
  FileText,
  Download,
  RefreshCcw,
  Calendar,
  Filter,
  ArrowUp,
  ArrowDown,
  Minus
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
  Area,
  AreaChart
} from 'recharts';
import { KPIMetrics, AnalyticsDateRange } from '@/types/analytics';
import { usePermissions } from '@/hooks/usePermissions';

export function KPIPerformanceDashboard() {
  const [metrics, setMetrics] = useState<KPIMetrics | null>(null);
  const [dateRange, setDateRange] = useState<AnalyticsDateRange>({
    preset: 'last_30_days',
    startDate: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
    endDate: new Date()
  });
  const [loading, setLoading] = useState(false);
  const [selectedMetric, setSelectedMetric] = useState<string>('overview');

  const { user } = usePermissions();

  useEffect(() => {
    fetchKPIMetrics();
  }, [dateRange]);

  const fetchKPIMetrics = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        startDate: dateRange.startDate.toISOString(),
        endDate: dateRange.endDate.toISOString(),
        userId: user?.id || '',
        companyId: user?.companyId || ''
      });

      const response = await fetch(`/api/analytics/kpi?${params}`);
      const data = await response.json();
      setMetrics(data);
    } catch (error) {
      console.error('Failed to fetch KPI metrics:', error);
    } finally {
      setLoading(false);
    }
  };

  const getTrendIcon = (trend: 'up' | 'down' | 'stable') => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      case 'stable': return <Minus className="h-4 w-4 text-gray-500" />;
    }
  };

  const getPerformanceColor = (score: number) => {
    if (score >= 90) return 'text-green-600';
    if (score >= 70) return 'text-yellow-600';
    return 'text-red-600';
  };

  const exportReport = () => {
    // Generate CSV
    const csvContent = generateCSVReport(metrics);
    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `kpi-report-${new Date().toISOString()}.csv`;
    a.click();
  };

  const generateCSVReport = (data: KPIMetrics | null) => {
    if (!data) return '';
    
    const rows = [
      ['KPI Performance Report'],
      ['Generated:', new Date().toLocaleString()],
      [''],
      ['Metric', 'Value', 'Previous Period', 'Change'],
      ['Average Response Time', `${data.avgResponseTime}h`, `${data.periodComparison.previous}h`, `${data.periodComparison.change}%`],
      ['Customer Satisfaction', data.customerSatisfactionScore, '', ''],
      ['Clean Claims Compliance', `${data.cleanClaimsCompliance}%`, '', ''],
      ['Total Fines', `$${data.totalFines}`, '', ''],
      ['Total Bonuses', `$${data.totalBonuses}`, '', ''],
      ['Performance Score', `${data.performanceScore}/100`, '', '']
    ];
    
    return rows.map(row => row.join(',')).join('\n');
  };

  // Sample chart data (would come from API)
  const responseTimeData = [
    { month: 'Jan', time: 2.5 },
    { month: 'Feb', time: 2.3 },
    { month: 'Mar', time: 2.1 },
    { month: 'Apr', time: 1.9 },
    { month: 'May', time: 1.8 },
    { month: 'Jun', time: 1.7 }
  ];

  const satisfactionData = [
    { month: 'Jan', score: 4.2 },
    { month: 'Feb', score: 4.3 },
    { month: 'Mar', score: 4.5 },
    { month: 'Apr', score: 4.4 },
    { month: 'May', score: 4.6 },
    { month: 'Jun', score: 4.7 }
  ];

  const incidentData = [
    { type: 'Late Response', count: 3 },
    { type: 'Documentation', count: 5 },
    { type: 'Quality Issues', count: 2 },
    { type: 'Customer Complaints', count: 1 }
  ];

  const radarData = [
    { metric: 'Response Time', value: 85 },
    { metric: 'Report Quality', value: 92 },
    { metric: 'Compliance', value: 88 },
    { metric: 'Customer Satisfaction', value: 94 },
    { metric: 'Efficiency', value: 78 },
    { metric: 'Training', value: 90 }
  ];

  const Colours = ['#10b981', '#3b82f6', '#f59e0b', '#ef4444', '#8b5cf6'];

  if (!metrics) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <Activity className="h-8 w-8 animate-spin mx-auto text-gray-400" />
          <p className="text-sm text-gray-500 mt-2">Loading KPI metrics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Activity className="h-6 w-6" />
            KPI Performance Dashboard
          </h2>
          <p className="text-gray-600 mt-1">
            Track your performance metrics and quality indicators
          </p>
        </div>
        <div className="flex gap-3">
          <Select value={dateRange.preset} onValueChange={(value) => {
            // Update date range based on preset
            setDateRange({
              preset: value as any,
              startDate: new Date(), // Calculate based on preset
              endDate: new Date()
            });
          }}>
            <SelectTrigger className="w-40">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="today">Today</SelectItem>
              <SelectItem value="last_7_days">Last 7 Days</SelectItem>
              <SelectItem value="last_30_days">Last 30 Days</SelectItem>
              <SelectItem value="last_quarter">Last Quarter</SelectItem>
              <SelectItem value="last_year">Last Year</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline" onClick={fetchKPIMetrics}>
            <RefreshCcw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <Button variant="outline" onClick={exportReport}>
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Overall Performance Score */}
      <Card className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50">
        <CardContent className="pt-6">
          <div className="flex justify-between items-start">
            <div>
              <p className="text-sm text-gray-600">Overall Performance Score</p>
              <div className="flex items-baseline gap-3 mt-2">
                <span className={`text-5xl font-bold ${getPerformanceColor(metrics.performanceScore)}`}>
                  {metrics.performanceScore}
                </span>
                <span className="text-2xl text-gray-400">/100</span>
                {getTrendIcon(metrics.trend)}
              </div>
              <Progress value={metrics.performanceScore} className="mt-4 h-3" />
            </div>
            <div className="text-right">
              <Badge className={metrics.trend === 'up' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}>
                {metrics.periodComparison.change > 0 ? '+' : ''}{metrics.periodComparison.change}%
              </Badge>
              <p className="text-xs text-gray-500 mt-1">vs last period</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Key Metrics Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Avg Response Time
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metrics.avgResponseTime}h</p>
            <p className="text-xs text-gray-500">Target: &lt;2h</p>
            <div className="mt-2">
              {metrics.avgResponseTime <= 2 ? (
                <Badge className="bg-green-100 text-green-800">On Target</Badge>
              ) : (
                <Badge className="bg-red-100 text-red-800">Above Target</Badge>
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <Star className="h-4 w-4" />
              Customer Satisfaction
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metrics.customerSatisfactionScore}/5</p>
            <div className="flex gap-0.5 mt-2">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  className={`h-4 w-4 ${
                    i < Math.floor(metrics.customerSatisfactionScore)
                      ? 'fill-blue-500 text-blue-500'
                      : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <CheckCircle className="h-4 w-4" />
              Clean Claims Compliance
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">{metrics.cleanClaimsCompliance}%</p>
            <Progress value={metrics.cleanClaimsCompliance} className="mt-2 h-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <CardTitle className="text-sm flex items-center gap-2">
              <DollarSign className="h-4 w-4" />
              Bonuses vs Fines
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-between">
              <div>
                <p className="text-sm text-green-600">${metrics.totalBonuses}</p>
                <p className="text-xs text-gray-500">Bonuses</p>
              </div>
              <div>
                <p className="text-sm text-red-600">${metrics.totalFines}</p>
                <p className="text-xs text-gray-500">Fines</p>
              </div>
            </div>
            <div className="mt-2">
              <p className="text-lg font-bold">
                ${metrics.totalBonuses - metrics.totalFines}
              </p>
              <p className="text-xs text-gray-500">Net Impact</p>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="response" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="response">Response Times</TabsTrigger>
          <TabsTrigger value="satisfaction">Satisfaction</TabsTrigger>
          <TabsTrigger value="compliance">Compliance</TabsTrigger>
          <TabsTrigger value="incidents">Incidents</TabsTrigger>
          <TabsTrigger value="performance">Performance</TabsTrigger>
        </TabsList>

        <TabsContent value="response">
          <Card>
            <CardHeader>
              <CardTitle>Response Time Trends</CardTitle>
              <CardDescription>
                Average time to respond to leads and jobs
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={responseTimeData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis label={{ value: 'Hours', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Line 
                    type="monotone" 
                    dataKey="time" 
                    stroke="#3b82f6" 
                    name="Response Time"
                    strokeWidth={2}
                  />
                  <Line 
                    type="monotone" 
                    dataKey={() => 2} 
                    stroke="#ef4444" 
                    strokeDasharray="5 5"
                    name="Target (2h)"
                  />
                </LineChart>
              </ResponsiveContainer>

              {metrics.avgResponseTime > 2 && (
                <Alert className="mt-4 bg-yellow-50 border-yellow-200">
                  <AlertTriangle className="h-4 w-4 text-yellow-600" />
                  <AlertDescription className="text-yellow-700">
                    Your average response time is above the 2-hour target. Consider optimising your workflow
                    or coverage to improve response times.
                  </AlertDescription>
                </Alert>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="satisfaction">
          <Card>
            <CardHeader>
              <CardTitle>Customer Satisfaction Scores</CardTitle>
              <CardDescription>
                Monthly customer feedback and ratings
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={300}>
                <AreaChart data={satisfactionData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis domain={[0, 5]} label={{ value: 'Rating', angle: -90, position: 'insideLeft' }} />
                  <Tooltip />
                  <Legend />
                  <Area 
                    type="monotone" 
                    dataKey="score" 
                    stroke="#10b981" 
                    fill="#10b981"
                    fillOpacity={0.3}
                    name="Satisfaction Score"
                  />
                </AreaChart>
              </ResponsiveContainer>

              <div className="grid grid-cols-3 gap-4 mt-6">
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold text-green-600">92%</p>
                  <p className="text-xs text-gray-600">Would Recommend</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">247</p>
                  <p className="text-xs text-gray-600">Total Reviews</p>
                </div>
                <div className="text-center p-3 bg-gray-50 rounded-lg">
                  <p className="text-2xl font-bold">4.7</p>
                  <p className="text-xs text-gray-600">Average Rating</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="compliance">
          <Card>
            <CardHeader>
              <CardTitle>Clean Claims Compliance Events</CardTitle>
              <CardDescription>
                Track compliance with Clean Claims requirements
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Photo Documentation</span>
                      <Badge className="bg-green-100 text-green-800">98%</Badge>
                    </div>
                    <Progress value={98} className="h-2" />
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Report Timeliness</span>
                      <Badge className="bg-green-100 text-green-800">95%</Badge>
                    </div>
                    <Progress value={95} className="h-2" />
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Data Accuracy</span>
                      <Badge className="bg-yellow-100 text-yellow-800">88%</Badge>
                    </div>
                    <Progress value={88} className="h-2" />
                  </div>
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-sm font-medium">Customer Communication</span>
                      <Badge className="bg-green-100 text-green-800">94%</Badge>
                    </div>
                    <Progress value={94} className="h-2" />
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="font-medium mb-3">Recent Compliance Events</h4>
                  <div className="space-y-2">
                    <div className="flex items-center justify-between p-2 bg-green-50 rounded">
                      <div className="flex items-center gap-2">
                        <CheckCircle className="h-4 w-4 text-green-600" />
                        <span className="text-sm">Perfect report submitted - Job #1234</span>
                      </div>
                      <span className="text-xs text-gray-500">2 hours ago</span>
                    </div>
                    <div className="flex items-center justify-between p-2 bg-yellow-50 rounded">
                      <div className="flex items-center gap-2">
                        <AlertTriangle className="h-4 w-4 text-yellow-600" />
                        <span className="text-sm">Missing photos - Job #1233</span>
                      </div>
                      <span className="text-xs text-gray-500">1 day ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="incidents">
          <Card>
            <CardHeader>
              <CardTitle>Incidents and Fines</CardTitle>
              <CardDescription>
                Track incidents, fines, and bonus history
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium mb-3">Incident Distribution</h4>
                  <ResponsiveContainer width="100%" height={250}>
                    <PieChart>
                      <Pie
                        data={incidentData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="count"
                      >
                        {incidentData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={Colours[index % Colours.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </div>

                <div>
                  <h4 className="font-medium mb-3">Financial Impact</h4>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center p-3 bg-red-50 rounded-lg">
                      <div>
                        <p className="font-medium text-red-900">Total Fines</p>
                        <p className="text-sm text-red-700">{metrics.totalIncidents} incidents</p>
                      </div>
                      <p className="text-xl font-bold text-red-600">-${metrics.totalFines}</p>
                    </div>
                    <div className="flex justify-between items-center p-3 bg-green-50 rounded-lg">
                      <div>
                        <p className="font-medium text-green-900">Total Bonuses</p>
                        <p className="text-sm text-green-700">Performance rewards</p>
                      </div>
                      <p className="text-xl font-bold text-green-600">+${metrics.totalBonuses}</p>
                    </div>
                    <div className="border-t pt-3">
                      <div className="flex justify-between items-center">
                        <p className="font-medium">Net Impact</p>
                        <p className={`text-xl font-bold ${
                          metrics.totalBonuses - metrics.totalFines >= 0 ? 'text-green-600' : 'text-red-600'
                        }`}>
                          ${metrics.totalBonuses - metrics.totalFines}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Overall Performance Analysis</CardTitle>
              <CardDescription>
                Multi-dimensional performance assessment
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <RadarChart data={radarData}>
                  <PolarGrid />
                  <PolarAngleAxis dataKey="metric" />
                  <PolarRadiusAxis angle={90} domain={[0, 100]} />
                  <Radar 
                    name="Current Performance" 
                    dataKey="value" 
                    stroke="#3b82f6" 
                    fill="#3b82f6" 
                    fillOpacity={0.6} 
                  />
                  <Legend />
                </RadarChart>
              </ResponsiveContainer>

              <div className="mt-6 p-4 bg-blue-50 rounded-lg">
                <h4 className="font-medium mb-3">Performance Summary</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span>Strongest Area:</span>
                    <span className="font-medium">Customer Satisfaction (94%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Needs Improvement:</span>
                    <span className="font-medium">Efficiency (78%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>Month-over-Month:</span>
                    <span className="font-medium text-green-600">+5.2%</span>
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