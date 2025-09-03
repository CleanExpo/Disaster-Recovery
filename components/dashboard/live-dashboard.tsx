'use client';

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Activity, AlertTriangle, Users, DollarSign, 
  TrendingUp, Clock, MapPin, Shield, Bell,
  Zap, Droplet, Flame, Cloud, Home
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { ScrollArea } from '@/components/ui/scroll-area';
import { useWebSocket } from '@/lib/websocket-provider';
import { cn } from '@/lib/utils';
import {
  LineChart, Line, AreaChart, Area, BarChart, Bar,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, RadialBarChart, RadialBar
} from 'recharts';

interface DashboardMetrics {
  activeJobs: number;
  pendingClaims: number;
  activeContractors: number;
  todayRevenue: number;
  responseTime: number;
  completionRate: number;
  customerSatisfaction: number;
  emergencyAlerts: number;
}

interface LiveJob {
  id: string;
  type: string;
  location: string;
  status: 'pending' | 'assigned' | 'in_progress' | 'completed';
  contractor?: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  timestamp: Date;
  value?: number;
}

interface ContractorStatus {
  id: string;
  name: string;
  status: 'available' | 'busy' | 'offline';
  location: { lat: number; lng: number };
  currentJob?: string;
  rating: number;
  jobsCompleted: number;
}

export const LiveDashboard: React.FC = () => {
  const { on, off, connected } = useWebSocket();
  
  const [metrics, setMetrics] = useState<DashboardMetrics>({
    activeJobs: 0,
    pendingClaims: 0,
    activeContractors: 0,
    todayRevenue: 0,
    responseTime: 0,
    completionRate: 0,
    customerSatisfaction: 0,
    emergencyAlerts: 0,
  });

  const [liveJobs, setLiveJobs] = useState<LiveJob[]>([]);
  const [contractors, setContractors] = useState<ContractorStatus[]>([]);
  const [revenueData, setRevenueData] = useState<any[]>([]);
  const [jobTypeData, setJobTypeData] = useState<any[]>([]);
  const [performanceData, setPerformanceData] = useState<any[]>([]);
  const [alerts, setAlerts] = useState<any[]>([]);

  // WebSocket event handlers
  useEffect(() => {
    if (!connected) return;

    const handleMetricsUpdate = (data: any) => {
      setMetrics(prev => ({ ...prev, ...data }));
    };

    const handleNewJob = (job: LiveJob) => {
      setLiveJobs(prev => [job, ...prev].slice(0, 10)); // Keep last 10
      
      // Update metrics
      setMetrics(prev => ({
        ...prev,
        activeJobs: prev.activeJobs + 1,
      }));
      
      // Show alert for critical jobs
      if (job.priority === 'critical') {
        setAlerts(prev => [{
          id: `alert-${Date.now()}`,
          type: 'emergency',
          message: `Critical ${job.type} job in ${job.location}`,
          timestamp: new Date(),
        }, ...prev].slice(0, 5));
      }
    };

    const handleJobUpdate = (update: any) => {
      setLiveJobs(prev => 
        prev.map(job => job.id === update.jobId ? { ...job, ...update } : job)
      );
    };

    const handleContractorUpdate = (contractor: ContractorStatus) => {
      setContractors(prev => {
        const index = prev.findIndex(c => c.id === contractor.id);
        if (index >= 0) {
          const updated = [...prev];
          updated[index] = contractor;
          return updated;
        }
        return [...prev, contractor];
      });
    };

    const handleRevenueUpdate = (data: any) => {
      setRevenueData(prev => [...prev, data].slice(-24)); // Keep last 24 hours
    };

    // Subscribe to events
    on('metrics:update', handleMetricsUpdate);
    on('job:new', handleNewJob);
    on('job:update', handleJobUpdate);
    on('contractor:status', handleContractorUpdate);
    on('revenue:update', handleRevenueUpdate);

    // Request initial data
    emit('dashboard:init');

    return () => {
      off('metrics:update', handleMetricsUpdate);
      off('job:new', handleNewJob);
      off('job:update', handleJobUpdate);
      off('contractor:status', handleContractorUpdate);
      off('revenue:update', handleRevenueUpdate);
    };
  }, [connected, on, off, emit]);

  // Generate mock data for charts
  useEffect(() => {
    // Revenue chart data
    const hours = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date();
      hour.setHours(hour.getHours() - (23 - i));
      return {
        time: hour.getHours() + ':00',
        revenue: Math.random() * 10000 + 5000,
        jobs: Math.floor(Math.random() * 20) + 10,
      };
    });
    setRevenueData(hours);

    // Job type distribution
    setJobTypeData([
      { name: 'Water Damage', value: 35, color: '#3B82F6' },
      { name: 'Fire Damage', value: 25, color: '#EF4444' },
      { name: 'Mould', value: 20, color: '#10B981' },
      { name: 'Storm', value: 15, color: '#6B7280' },
      { name: 'Other', value: 5, color: '#F59E0B' },
    ]);

    // Performance metrics
    setPerformanceData([
      { metric: 'Response Time', value: 85, target: 90 },
      { metric: 'Completion Rate', value: 92, target: 95 },
      { metric: 'Customer Satisfaction', value: 88, target: 85 },
      { metric: 'First Call Resolution', value: 78, target: 80 },
    ]);
  }, []);

  // Job type icons
  const getJobIcon = (type: string) => {
    switch (type.toLowerCase()) {
      case 'water damage': return <Droplet className="w-4 h-4" />;
      case 'fire damage': return <Flame className="w-4 h-4" />;
      case 'storm': return <Cloud className="w-4 h-4" />;
      default: return <Home className="w-4 h-4" />;
    }
  };

  // Priority colors
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'destructive';
      case 'high': return 'default';
      case 'medium': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Connection Status */}
      {!connected && (
        <div className="bg-yellow-100 dark:bg-yellow-900/20 text-yellow-800 dark:text-yellow-400 p-3 rounded-lg flex items-center gap-2">
          <AlertTriangle className="w-5 h-5" />
          Disconnected from live updates. Attempting to reconnect...
        </div>
      )}

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active Jobs</CardTitle>
              <Activity className="w-4 h-4 text-blue-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeJobs}</div>
            <div className="flex items-center gap-1 text-xs text-green-600">
              <TrendingUp className="w-3 h-3" />
              <span>+12% from yesterday</span>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Active Contractors</CardTitle>
              <Users className="w-4 h-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.activeContractors}</div>
            <div className="text-xs text-gray-500">
              {contractors.filter(c => c.status === 'available').length} available
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Today&apos;s Revenue</CardTitle>
              <DollarSign className="w-4 h-4 text-green-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              ${metrics.todayRevenue.toLocaleString()}
            </div>
            <Progress value={75} className="h-1 mt-2" />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-3">
            <div className="flex items-center justify-between">
              <CardTitle className="text-sm font-medium">Emergency Alerts</CardTitle>
              <AlertTriangle className="w-4 h-4 text-red-500" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{metrics.emergencyAlerts}</div>
            <div className="text-xs text-red-600">Requires immediate attention</div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Revenue & Jobs (24h)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <AreaChart data={revenueData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis yAxisId="left" />
                <YAxis yAxisId="right" orientation="right" />
                <Tooltip />
                <Area
                  yAxisId="left"
                  type="monotone"
                  dataKey="revenue"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.2}
                  name="Revenue ($)"
                />
                <Line
                  yAxisId="right"
                  type="monotone"
                  dataKey="jobs"
                  stroke="#10B981"
                  name="Jobs"
                />
              </AreaChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Job Type Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Job Types</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={250}>
              <PieChart>
                <Pie
                  data={jobTypeData}
                  cx="50%"
                  cy="50%"
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                >
                  {jobTypeData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Live Jobs and Contractors */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Live Jobs Feed */}
        <Card>
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle>Live Jobs</CardTitle>
              <Badge variant="outline" className="gap-1">
                <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                Live
              </Badge>
            </div>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-3">
                <AnimatePresence>
                  {liveJobs.map((job) => (
                    <motion.div
                      key={job.id}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: 20 }}
                      className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        {getJobIcon(job.type)}
                        <div>
                          <p className="font-medium text-sm">{job.type}</p>
                          <div className="flex items-center gap-2 text-xs text-gray-500">
                            <MapPin className="w-3 h-3" />
                            <span>{job.location}</span>
                            <Clock className="w-3 h-3 ml-2" />
                            <span>
                              {new Date(job.timestamp).toLocaleTimeString()}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge variant={getPriorityColor(job.priority)}>
                          {job.priority}
                        </Badge>
                        <Badge variant="outline">
                          {job.status.replace('_', ' ')}
                        </Badge>
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        {/* Contractor Status */}
        <Card>
          <CardHeader>
            <CardTitle>Contractor Status</CardTitle>
          </CardHeader>
          <CardContent>
            <ScrollArea className="h-[300px]">
              <div className="space-y-3">
                {contractors.map((contractor) => (
                  <div
                    key={contractor.id}
                    className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg"
                  >
                    <div className="flex items-center gap-3">
                      <div className={cn(
                        'w-3 h-3 rounded-full',
                        contractor.status === 'available' && 'bg-green-500',
                        contractor.status === 'busy' && 'bg-yellow-500',
                        contractor.status === 'offline' && 'bg-gray-400'
                      )} />
                      <div>
                        <p className="font-medium text-sm">{contractor.name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                          <Shield className="w-3 h-3" />
                          <span>{contractor.jobsCompleted} jobs</span>
                          <span className="ml-2">⭐ {contractor.rating}</span>
                        </div>
                      </div>
                    </div>
                    <Badge variant="outline">
                      {contractor.status}
                    </Badge>
                  </div>
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
            {performanceData.map((metric) => (
              <div key={metric.metric} className="space-y-2">
                <p className="text-sm font-medium">{metric.metric}</p>
                <div className="flex items-center gap-2">
                  <Progress value={metric.value} className="flex-1" />
                  <span className="text-sm font-bold">{metric.value}%</span>
                </div>
                <p className="text-xs text-gray-500">Target: {metric.target}%</p>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Recent Alerts */}
      {alerts.length > 0 && (
        <Card className="border-red-200 dark:border-red-800">
          <CardHeader>
            <div className="flex items-center gap-2">
              <Bell className="w-5 h-5 text-red-500" />
              <CardTitle>Recent Alerts</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className="flex items-center justify-between p-2 bg-red-50 dark:bg-red-900/20 rounded"
                >
                  <div className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-red-500" />
                    <span className="text-sm">{alert.message}</span>
                  </div>
                  <span className="text-xs text-gray-500">
                    {new Date(alert.timestamp).toLocaleTimeString()}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};