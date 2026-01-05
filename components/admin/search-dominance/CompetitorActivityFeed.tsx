/**
 * Competitor Activity Feed Component
 *
 * Timeline of recent competitor movements
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import useSWR from 'swr';
import { Users, TrendingUp, FileText, AlertTriangle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function CompetitorActivityFeed() {
  const { data, isLoading } = useSWR(
    '/api/search-dominance/competitors/activity?days=7',
    fetcher,
    {
      refreshInterval: 120000, // Refresh every 2 minutes
    }
  );

  const activities = data?.activities || [];
  const stats = data?.stats || {};

  const getThreatColor = (level: string) => {
    switch (level) {
      case 'HIGH':
        return 'bg-red-100 text-red-800 border-red-200';
      case 'MEDIUM':
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'LOW':
        return 'bg-green-100 text-green-800 border-green-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case 'major_update':
        return AlertTriangle;
      case 'new_content':
        return FileText;
      default:
        return TrendingUp;
    }
  };

  return (
    <div className="grid gap-6 md:grid-cols-12">
      {/* Statistics Cards */}
      <div className="md:col-span-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Competitor Overview</CardTitle>
            <CardDescription>Current threat landscape</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Total Competitors</span>
                <span className="text-2xl font-bold">{stats.totalCompetitors || 0}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">High Threat</span>
                  <Badge variant="destructive">
                    {stats.byThreatLevel?.HIGH || 0}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Medium Threat</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    {stats.byThreatLevel?.MEDIUM || 0}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Low Threat</span>
                  <Badge variant="outline">
                    {stats.byThreatLevel?.LOW || 0}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="text-sm font-medium mb-2">Recent Activity (7 days)</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Major Updates</span>
                  <span className="font-medium">{stats.recentActivity?.majorUpdates || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">New Content</span>
                  <span className="font-medium">{stats.recentActivity?.newContent || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg Content Velocity</span>
                  <span className="font-medium">
                    {stats.avgContentVelocity?.toFixed(1) || 0}/week
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Activity Timeline */}
      <div className="md:col-span-8">
        <Card>
          <CardHeader>
            <CardTitle>Activity Timeline</CardTitle>
            <CardDescription>Recent competitor movements</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
              </div>
            ) : activities.length === 0 ? (
              <div className="flex h-64 items-center justify-center text-center text-muted-foreground">
                <div>
                  <Users className="mx-auto mb-2 h-8 w-8" />
                  <p>No recent activity</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4 max-h-[600px] overflow-y-auto pr-2">
                {activities.map((activity: any, index: number) => {
                  const Icon = getActivityIcon(activity.activityType);
                  return (
                    <div
                      key={index}
                      className="flex items-start gap-4 rounded-lg border p-4"
                    >
                      <div className={`rounded-full p-2 ${getThreatColor(activity.threatLevel)}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                      <div className="flex-1 space-y-2">
                        <div className="flex items-start justify-between gap-2">
                          <div>
                            <h4 className="font-semibold">{activity.competitorName}</h4>
                            <p className="text-sm text-muted-foreground">
                              {activity.competitorDomain}
                            </p>
                          </div>
                          <Badge className={getThreatColor(activity.threatLevel)}>
                            {activity.threatLevel} THREAT
                          </Badge>
                        </div>
                        <p className="text-sm">{activity.details}</p>
                        {activity.metrics && (
                          <div className="flex flex-wrap gap-3 text-xs text-muted-foreground">
                            <span>📊 {activity.metrics.organicKeywords?.toLocaleString()} keywords</span>
                            <span>🏆 {activity.metrics.topTenKeywords} in top 10</span>
                            <span>📈 {activity.metrics.contentVelocity?.toFixed(1)}/week</span>
                            {activity.metrics.domainAuthority && (
                              <span>⚡ DA {activity.metrics.domainAuthority}</span>
                            )}
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground">
                          {formatDistanceToNow(new Date(activity.timestamp), {
                            addSuffix: true,
                          })}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
