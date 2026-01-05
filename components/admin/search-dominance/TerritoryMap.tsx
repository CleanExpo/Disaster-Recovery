/**
 * Territory Map Component
 *
 * Geographic coverage heatmap and statistics
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import useSWR from 'swr';
import { MapPin, TrendingUp, CheckCircle2, Circle } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function TerritoryMap() {
  const { data, isLoading } = useSWR('/api/search-dominance/territory', fetcher, {
    refreshInterval: 300000, // Refresh every 5 minutes
  });

  const stats = data?.stats || {};
  const byState = data?.byState || [];
  const priorityAreas = data?.priorityAreas || [];
  const topPerforming = data?.topPerforming || [];

  const getActivationColor = (rate: number) => {
    if (rate >= 80) return 'bg-green-500';
    if (rate >= 50) return 'bg-blue-500';
    if (rate >= 20) return 'bg-yellow-500';
    return 'bg-gray-300';
  };

  return (
    <div className="grid gap-6 md:grid-cols-12">
      {/* Overview Statistics */}
      <div className="md:col-span-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Territory Overview</CardTitle>
            <CardDescription>Geographic coverage statistics</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Total Service Areas</span>
                <span className="text-2xl font-bold">{stats.totalAreas || 0}</span>
              </div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">SEO Activated</span>
                <span className="text-2xl font-bold text-green-600">
                  {stats.seoActivated || 0}
                </span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-sm text-muted-foreground">Activation Rate</span>
                <span className="text-sm font-medium">
                  {stats.activationRate?.toFixed(1) || 0}%
                </span>
              </div>
            </div>

            <div className="border-t pt-4">
              <div className="text-sm font-medium mb-2">Performance</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg Ranking</span>
                  <span className="font-medium">
                    {stats.avgRank ? `#${stats.avgRank.toFixed(1)}` : 'N/A'}
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Monthly Searches</span>
                  <span className="font-medium">
                    {stats.totalMonthlySearches?.toLocaleString() || 0}
                  </span>
                </div>
              </div>
            </div>

            {stats.recentActivations?.length > 0 && (
              <div className="border-t pt-4">
                <div className="text-sm font-medium mb-2">Recent Activations</div>
                <div className="space-y-2">
                  {stats.recentActivations.slice(0, 5).map((area: any, index: number) => (
                    <div key={index} className="flex items-center justify-between text-xs">
                      <span className="text-muted-foreground">
                        {area.suburb}, {area.state}
                      </span>
                      <CheckCircle2 className="h-3 w-3 text-green-600" />
                    </div>
                  ))}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* State Breakdown */}
      <div className="md:col-span-8 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Coverage by State</CardTitle>
            <CardDescription>SEO activation rates across Australia</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
              </div>
            ) : byState.length === 0 ? (
              <div className="flex h-64 items-center justify-center text-center text-muted-foreground">
                <div>
                  <MapPin className="mx-auto mb-2 h-8 w-8" />
                  <p>No territory data available</p>
                </div>
              </div>
            ) : (
              <div className="space-y-4">
                {byState.map((state: any, index: number) => (
                  <div key={index} className="space-y-2">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <span className="text-lg font-semibold">{state.state}</span>
                        <Badge variant="outline">
                          {state.seoActivated}/{state.total} areas
                        </Badge>
                      </div>
                      <div className="text-sm text-muted-foreground">
                        {state.avgRank && `Avg rank: #${state.avgRank.toFixed(1)}`}
                      </div>
                    </div>
                    <div className="relative h-8 w-full rounded-full bg-gray-100 overflow-hidden">
                      <div
                        className={`h-full transition-all ${getActivationColor(
                          state.activationRate
                        )}`}
                        style={{ width: `${state.activationRate}%` }}
                      />
                      <div className="absolute inset-0 flex items-center justify-center text-sm font-medium">
                        {state.activationRate.toFixed(1)}%
                      </div>
                    </div>
                    {state.totalSearches > 0 && (
                      <div className="text-xs text-muted-foreground">
                        {state.totalSearches.toLocaleString()} monthly searches
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        <div className="grid gap-4 md:grid-cols-2">
          {/* Priority Areas */}
          <Card>
            <CardHeader>
              <CardTitle>Priority Areas</CardTitle>
              <CardDescription>High search volume, not yet activated</CardDescription>
            </CardHeader>
            <CardContent>
              {priorityAreas.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <Circle className="mx-auto mb-2 h-6 w-6" />
                  <p className="text-sm">All high-volume areas activated</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {priorityAreas.map((area: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <div className="font-medium text-sm">
                          {area.suburb}, {area.state}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {area.postcode}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="text-sm font-semibold text-blue-600">
                          {area.monthlySearches?.toLocaleString()}
                        </div>
                        <div className="text-xs text-muted-foreground">searches/mo</div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>

          {/* Top Performing Areas */}
          <Card>
            <CardHeader>
              <CardTitle>Top Performing</CardTitle>
              <CardDescription>Best ranking positions</CardDescription>
            </CardHeader>
            <CardContent>
              {topPerforming.length === 0 ? (
                <div className="text-center text-muted-foreground py-8">
                  <TrendingUp className="mx-auto mb-2 h-6 w-6" />
                  <p className="text-sm">No ranking data yet</p>
                </div>
              ) : (
                <div className="space-y-2 max-h-[300px] overflow-y-auto">
                  {topPerforming.map((area: any, index: number) => (
                    <div
                      key={index}
                      className="flex items-center justify-between rounded-lg border p-3"
                    >
                      <div>
                        <div className="font-medium text-sm">
                          {area.suburb}, {area.state}
                        </div>
                        <div className="text-xs text-muted-foreground">
                          {area.postcode}
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          #{area.currentRank}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
