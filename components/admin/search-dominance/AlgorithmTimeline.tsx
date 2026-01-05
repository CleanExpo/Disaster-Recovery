/**
 * Algorithm Timeline Component
 *
 * Vertical timeline of algorithm updates and impact
 */

'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import useSWR from 'swr';
import { Activity, TrendingUp, TrendingDown, AlertCircle, Sparkles } from 'lucide-react';
import { format, parseISO } from 'date-fns';
import { LineChart, Line, XAxis, YAxis, Tooltip, ResponsiveContainer, CartesianGrid } from 'recharts';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function AlgorithmTimeline() {
  const { data, isLoading } = useSWR(
    '/api/search-dominance/algorithm?days=90',
    fetcher,
    {
      refreshInterval: 300000, // Refresh every 5 minutes
    }
  );

  const timeline = data?.timeline || [];
  const stats = data?.stats || {};
  const volatility = data?.volatility || {};

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'DETECTED':
        return 'bg-yellow-100 text-yellow-800';
      case 'CONFIRMED':
        return 'bg-red-100 text-red-800';
      case 'RESOLVED':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getImpactColor = (impact: number) => {
    if (impact >= 70) return 'text-red-600';
    if (impact >= 40) return 'text-yellow-600';
    return 'text-green-600';
  };

  return (
    <div className="grid gap-6 md:grid-cols-12">
      {/* Statistics Panel */}
      <div className="md:col-span-4 space-y-4">
        <Card>
          <CardHeader>
            <CardTitle>Algorithm Stats</CardTitle>
            <CardDescription>Last 90 days</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium">Total Updates</span>
                <span className="text-2xl font-bold">{stats.total || 0}</span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Detected</span>
                  <Badge variant="secondary" className="bg-yellow-100 text-yellow-800">
                    {stats.byStatus?.DETECTED || 0}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Confirmed</span>
                  <Badge variant="destructive">
                    {stats.byStatus?.CONFIRMED || 0}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Resolved</span>
                  <Badge variant="outline" className="bg-green-50 text-green-700">
                    {stats.byStatus?.RESOLVED || 0}
                  </Badge>
                </div>
              </div>
            </div>
            <div className="border-t pt-4">
              <div className="text-sm font-medium mb-2">Impact Analysis</div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg Impact</span>
                  <span className={`font-medium ${getImpactColor(stats.avgImpact || 0)}`}>
                    {stats.avgImpact?.toFixed(1) || 0}/100
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">High Impact</span>
                  <span className="font-medium">{stats.highImpact || 0}</span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Avg Volatility</span>
                  <span className="font-medium">
                    {stats.avgVolatility?.toFixed(1) || 0}%
                  </span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Volatility Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Ranking Volatility</CardTitle>
            <CardDescription>Daily fluctuation rate</CardDescription>
          </CardHeader>
          <CardContent>
            {volatility.timeline?.length > 0 && (
              <ResponsiveContainer width="100%" height={150}>
                <LineChart data={volatility.timeline.slice(-30)}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={(date) => format(parseISO(date), 'MMM dd')}
                    stroke="#6b7280"
                    fontSize={10}
                  />
                  <YAxis stroke="#6b7280" fontSize={10} />
                  <Tooltip
                    labelFormatter={(date) => format(parseISO(date), 'MMM dd, yyyy')}
                    formatter={(value: number) => `${value.toFixed(1)}%`}
                  />
                  <Line
                    type="monotone"
                    dataKey="volatility"
                    stroke="#ef4444"
                    strokeWidth={2}
                    dot={false}
                  />
                </LineChart>
              </ResponsiveContainer>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Timeline */}
      <div className="md:col-span-8">
        <Card>
          <CardHeader>
            <CardTitle>Algorithm Update Timeline</CardTitle>
            <CardDescription>Detected changes and their impact</CardDescription>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="flex h-64 items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
              </div>
            ) : timeline.length === 0 ? (
              <div className="flex h-64 items-center justify-center text-center text-muted-foreground">
                <div>
                  <Activity className="mx-auto mb-2 h-8 w-8" />
                  <p>No algorithm updates detected</p>
                </div>
              </div>
            ) : (
              <div className="relative space-y-6 max-h-[600px] overflow-y-auto pr-2">
                {/* Timeline Line */}
                <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gray-200" />

                {timeline.map((update: any, index: number) => (
                  <div key={update.id || index} className="relative pl-14">
                    {/* Timeline Dot */}
                    <div
                      className={`absolute left-4 top-1 h-5 w-5 rounded-full border-4 border-white ${
                        update.status === 'CONFIRMED'
                          ? 'bg-red-500'
                          : update.status === 'RESOLVED'
                          ? 'bg-green-500'
                          : 'bg-yellow-500'
                      }`}
                    />

                    {/* Content Card */}
                    <div className="rounded-lg border bg-card p-4">
                      <div className="flex items-start justify-between gap-2 mb-2">
                        <div>
                          <h4 className="font-semibold">{update.name || 'Unnamed Update'}</h4>
                          <p className="text-sm text-muted-foreground">
                            {format(parseISO(update.detectedAt), 'MMM dd, yyyy')}
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Badge className={getStatusColor(update.status)}>
                            {update.status}
                          </Badge>
                          <Badge variant="outline">
                            {update.type}
                          </Badge>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 text-sm mb-2">
                        <div className="flex items-center gap-1">
                          <Activity className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Volatility:</span>
                          <span className="font-medium">{update.volatility?.toFixed(1) || 0}%</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <Sparkles className="h-4 w-4 text-muted-foreground" />
                          <span className="text-muted-foreground">Impact:</span>
                          <span className={`font-medium ${getImpactColor(update.impactScore)}`}>
                            {update.impactScore}/100
                          </span>
                        </div>
                        {update.rankingChanges && (
                          <div className="flex items-center gap-1">
                            <TrendingUp className="h-4 w-4 text-muted-foreground" />
                            <span className="text-muted-foreground">Changes:</span>
                            <span className="font-medium">{update.rankingChanges}</span>
                          </div>
                        )}
                        {update.trafficImpact && (
                          <div className="flex items-center gap-1">
                            {update.trafficImpact > 0 ? (
                              <TrendingUp className="h-4 w-4 text-green-600" />
                            ) : (
                              <TrendingDown className="h-4 w-4 text-red-600" />
                            )}
                            <span className="text-muted-foreground">Traffic:</span>
                            <span
                              className={`font-medium ${
                                update.trafficImpact > 0 ? 'text-green-600' : 'text-red-600'
                              }`}
                            >
                              {update.trafficImpact > 0 ? '+' : ''}
                              {update.trafficImpact?.toFixed(1) || 0}%
                            </span>
                          </div>
                        )}
                      </div>

                      {update.affectedKeywords && (
                        <p className="text-xs text-muted-foreground">
                          Affected {update.affectedKeywords} keywords
                        </p>
                      )}

                      {update.notes && (
                        <p className="text-sm mt-2 text-muted-foreground">{update.notes}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
