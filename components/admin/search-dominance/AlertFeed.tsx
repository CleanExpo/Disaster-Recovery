/**
 * Alert Feed Component
 *
 * Real-time feed of search dominance alerts
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import useSWR from 'swr';
import { AlertCircle, TrendingUp, TrendingDown, Sparkles, Users } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

interface AlertFeedProps {
  alerts?: any[];
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AlertFeed({ alerts: propAlerts }: AlertFeedProps) {
  const { data, isLoading } = useSWR('/api/search-dominance/alerts?limit=20', fetcher, {
    refreshInterval: 30000, // Refresh every 30 seconds
  });

  const alerts = propAlerts || data?.alerts || [];

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'CRITICAL':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'WARNING':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'INFO':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'rank_gain':
      case 'rank_drop':
        return type === 'rank_gain' ? TrendingUp : TrendingDown;
      case 'ai_citation_gained':
      case 'ai_citation_lost':
        return Sparkles;
      case 'competitor_movement':
        return Users;
      default:
        return AlertCircle;
    }
  };

  if (isLoading) {
    return (
      <Card className="h-full">
        <CardHeader>
          <CardTitle>Alert Feed</CardTitle>
          <CardDescription>Loading alerts...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Alert Feed</CardTitle>
        <CardDescription>
          {alerts.length} recent alerts
        </CardDescription>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[500px] pr-4">
          {alerts.length === 0 ? (
            <div className="flex h-64 items-center justify-center text-center text-muted-foreground">
              <div>
                <AlertCircle className="mx-auto mb-2 h-8 w-8" />
                <p>No alerts yet</p>
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              {alerts.map((alert: any, index: number) => {
                const Icon = getAlertIcon(alert.type);
                return (
                  <div
                    key={alert.id || index}
                    className={`flex gap-3 rounded-lg border p-3 ${
                      !alert.isRead ? 'bg-blue-50/50' : ''
                    }`}
                  >
                    <div className="flex-shrink-0">
                      <div className={`rounded-full p-2 ${getSeverityColor(alert.severity)}`}>
                        <Icon className="h-4 w-4" />
                      </div>
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-medium leading-none">
                          {alert.title}
                        </p>
                        <Badge variant="outline" className="text-xs">
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {alert.message}
                      </p>
                      {alert.keyword && (
                        <p className="text-xs text-blue-600">
                          Keyword: {alert.keyword}
                        </p>
                      )}
                      <p className="text-xs text-muted-foreground">
                        {formatDistanceToNow(new Date(alert.createdAt), {
                          addSuffix: true,
                        })}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
