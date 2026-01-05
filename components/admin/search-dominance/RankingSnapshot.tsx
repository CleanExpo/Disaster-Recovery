/**
 * Ranking Snapshot Component
 *
 * 4 metric cards showing key ranking statistics
 */

'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import useSWR from 'swr';
import { Trophy, Target, Sparkles, TrendingUp } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function RankingSnapshot() {
  const { data, isLoading } = useSWR('/api/search-dominance/metrics', fetcher, {
    refreshInterval: 60000,
  });

  const metrics = [
    {
      title: '#1 Rankings',
      value: data?.current?.position1Count || 0,
      total: data?.current?.totalKeywords || 0,
      icon: Trophy,
      color: 'text-yellow-600',
      bgColor: 'bg-yellow-50',
    },
    {
      title: 'Top 3 Rankings',
      value: data?.current?.position1to3Count || 0,
      total: data?.current?.totalKeywords || 0,
      icon: Target,
      color: 'text-blue-600',
      bgColor: 'bg-blue-50',
    },
    {
      title: 'AI Citations',
      value: data?.current?.aiOverviewCitations || 0,
      rate: data?.current?.aiOverviewRate || 0,
      icon: Sparkles,
      color: 'text-purple-600',
      bgColor: 'bg-purple-50',
    },
    {
      title: 'Top 10 Rankings',
      value: data?.current?.position1to10Count || 0,
      total: data?.current?.totalKeywords || 0,
      icon: TrendingUp,
      color: 'text-green-600',
      bgColor: 'bg-green-50',
    },
  ];

  if (isLoading) {
    return (
      <div className="grid gap-4 md:grid-cols-2">
        {[1, 2, 3, 4].map((i) => (
          <Card key={i} className="animate-pulse">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div className="h-4 w-24 bg-gray-200 rounded" />
              <div className="h-8 w-8 bg-gray-200 rounded" />
            </CardHeader>
            <CardContent>
              <div className="h-8 w-16 bg-gray-200 rounded mb-2" />
              <div className="h-4 w-20 bg-gray-200 rounded" />
            </CardContent>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="grid gap-4 md:grid-cols-2">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const percentage = metric.total
          ? ((metric.value / metric.total) * 100).toFixed(1)
          : metric.rate?.toFixed(1) || '0';

        return (
          <Card key={index}>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                {metric.title}
              </CardTitle>
              <div className={`rounded-full p-2 ${metric.bgColor}`}>
                <Icon className={`h-4 w-4 ${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <p className="text-xs text-muted-foreground">
                {metric.total
                  ? `${percentage}% of ${metric.total} keywords`
                  : `${percentage}% citation rate`}
              </p>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
}
