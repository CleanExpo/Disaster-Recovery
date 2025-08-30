'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Badge } from '@/components/ui/badge';
import {
  Activity,
  TrendingUp,
  TrendingDown,
  Clock,
  CheckCircle,
  AlertCircle,
  Star,
  Target
} from 'lucide-react';

interface KPIMetricsProps {
  data: {
    totalJobs: number;
    completedJobs: number;
    activeJobs: number;
    qualityScore?: number;
    averageResponseTime?: number;
    averageCompletionTime?: number;
    customerSatisfaction?: number;
    onTimeCompletion?: number;
  };
}

export function KPIMetrics({ data }: KPIMetricsProps) {
  const completionRate = data.totalJobs > 0 ? (data.completedJobs / data.totalJobs) * 100 : 0;

  return (
    <div className="space-y-6">
      {/* Performance Overview */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-centre justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Jobs</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{data.totalJobs}</div>
            <div className="flex items-centre gap-2 mt-2">
              <Badge variant="secondary">{data.activeJobs} Active</Badge>
              <Badge variant="outline">{data.completedJobs} Completed</Badge>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-centre justify-between pb-2">
            <CardTitle className="text-sm font-medium">Quality Score</CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.qualityScore ? `${data.qualityScore.toFixed(1)}%` : 'N/A'}
            </div>
            {data.qualityScore && (
              <Progress value={data.qualityScore} className="mt-2 h-2" />
            )}
            <p className="text-xs text-muted-foreground mt-2">
              Based on customer feedback
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-centre justify-between pb-2">
            <CardTitle className="text-sm font-medium">Response Time</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {data.averageResponseTime ? `${data.averageResponseTime.toFixed(1)}h` : 'N/A'}
            </div>
            <p className="text-xs text-muted-foreground mt-2">
              Average time to first response
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-centre justify-between pb-2">
            <CardTitle className="text-sm font-medium">Completion Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{completionRate.toFixed(1)}%</div>
            <Progress value={completionRate} className="mt-2 h-2" />
            <p className="text-xs text-muted-foreground mt-2">
              Jobs completed vs total
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Additional KPI Metrics */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Metrics</CardTitle>
          <CardDescription>
            Detailed performance indicators for your contracting services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-6">
            {/* Customer Satisfaction */}
            <div>
              <div className="flex justify-between items-centre mb-2">
                <span className="text-sm font-medium">Customer Satisfaction</span>
                <span className="text-2xl font-bold">
                  {data.customerSatisfaction ? `${data.customerSatisfaction.toFixed(1)}%` : 'N/A'}
                </span>
              </div>
              {data.customerSatisfaction && (
                <Progress value={data.customerSatisfaction} className="h-2" />
              )}
            </div>

            {/* On-Time Completion */}
            <div>
              <div className="flex justify-between items-centre mb-2">
                <span className="text-sm font-medium">On-Time Completion</span>
                <span className="text-2xl font-bold">
                  {data.onTimeCompletion ? `${data.onTimeCompletion.toFixed(1)}%` : 'N/A'}
                </span>
              </div>
              {data.onTimeCompletion && (
                <Progress value={data.onTimeCompletion} className="h-2" />
              )}
            </div>

            {/* Average Completion Time */}
            <div>
              <div className="flex justify-between items-centre mb-2">
                <span className="text-sm font-medium">Average Completion Time</span>
                <span className="text-2xl font-bold">
                  {data.averageCompletionTime ? `${data.averageCompletionTime.toFixed(1)} days` : 'N/A'}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Performance Trend */}
      <Card>
        <CardHeader>
          <CardTitle>Performance Trend</CardTitle>
          <CardDescription>
            Your performance metrics over the last 30 days
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="h-64 flex items-centre justify-centre text-muted-foreground">
            {/* Placeholder for chart - integrate with a charting library like recharts */}
            <p>Performance chart will be displayed here</p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
