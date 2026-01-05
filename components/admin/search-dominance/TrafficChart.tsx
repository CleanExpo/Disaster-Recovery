/**
 * Traffic Chart Component
 *
 * Area chart showing organic traffic over time (24h/7d/30d)
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { format, parseISO } from 'date-fns';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

type Timeframe = '24h' | '7d' | '30d' | '90d';

export function TrafficChart() {
  const [timeframe, setTimeframe] = useState<Timeframe>('7d');

  const { data, isLoading } = useSWR(
    `/api/search-dominance/traffic?timeframe=${timeframe}`,
    fetcher,
    {
      refreshInterval: 300000, // Refresh every 5 minutes
    }
  );

  const chartData = data?.timeseries || [];
  const growth = data?.growth || { sessions: 0, trend: 'stable' };

  const formatDate = (dateString: string) => {
    try {
      const date = parseISO(dateString);
      if (timeframe === '24h') {
        return format(date, 'HH:mm');
      }
      return format(date, 'MMM dd');
    } catch {
      return dateString;
    }
  };

  const formatValue = (value: number) => {
    if (value >= 1000) {
      return `${(value / 1000).toFixed(1)}k`;
    }
    return value.toLocaleString();
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Organic Traffic</CardTitle>
            <CardDescription>
              Sessions trend:{' '}
              <span
                className={`font-medium ${
                  growth.trend === 'up'
                    ? 'text-green-600'
                    : growth.trend === 'down'
                    ? 'text-red-600'
                    : 'text-gray-600'
                }`}
              >
                {growth.sessions > 0 ? '+' : ''}
                {growth.sessions.toFixed(1)}%
              </span>
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={timeframe === '24h' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe('24h')}
            >
              24h
            </Button>
            <Button
              variant={timeframe === '7d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe('7d')}
            >
              7d
            </Button>
            <Button
              variant={timeframe === '30d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe('30d')}
            >
              30d
            </Button>
            <Button
              variant={timeframe === '90d' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setTimeframe('90d')}
            >
              90d
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-[300px] items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        ) : chartData.length === 0 ? (
          <div className="flex h-[300px] items-center justify-center text-muted-foreground">
            No traffic data available
          </div>
        ) : (
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={chartData}>
              <defs>
                <linearGradient id="colorSessions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="colorConversions" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3} />
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
              <XAxis
                dataKey="date"
                tickFormatter={formatDate}
                stroke="#6b7280"
                fontSize={12}
              />
              <YAxis
                tickFormatter={formatValue}
                stroke="#6b7280"
                fontSize={12}
              />
              <Tooltip
                contentStyle={{
                  backgroundColor: 'white',
                  border: '1px solid #e5e7eb',
                  borderRadius: '8px',
                }}
                labelFormatter={formatDate}
                formatter={(value: number) => formatValue(value)}
              />
              <Area
                type="monotone"
                dataKey="organicSessions"
                name="Sessions"
                stroke="#3b82f6"
                strokeWidth={2}
                fill="url(#colorSessions)"
              />
              <Area
                type="monotone"
                dataKey="conversions"
                name="Conversions"
                stroke="#10b981"
                strokeWidth={2}
                fill="url(#colorConversions)"
              />
            </AreaChart>
          </ResponsiveContainer>
        )}
      </CardContent>
    </Card>
  );
}
