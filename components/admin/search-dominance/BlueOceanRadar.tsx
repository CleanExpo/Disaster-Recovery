/**
 * Blue Ocean Radar Component
 *
 * Displays Blue Ocean opportunities with scoring and status
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import useSWR from 'swr';
import { Target, TrendingUp, AlertCircle, CheckCircle2, XCircle } from 'lucide-react';
import { formatDistanceToNow } from 'date-fns';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function BlueOceanRadar() {
  const [filter, setFilter] = useState<string>('all'); // all, new, high-priority

  const { data, isLoading, mutate } = useSWR(
    `/api/search-dominance/blue-ocean?limit=50`,
    fetcher,
    {
      refreshInterval: 120000, // Refresh every 2 minutes
    }
  );

  const opportunities = data?.opportunities || [];
  const stats = data?.stats || {};

  const filteredOpportunities = opportunities.filter((opp: any) => {
    if (filter === 'new') return opp.status === 'NEW';
    if (filter === 'high-priority') return opp.opportunityScore >= 80;
    return true;
  });

  const getScoreColor = (score: number) => {
    if (score >= 80) return 'text-green-600 bg-green-50 border-green-200';
    if (score >= 60) return 'text-blue-600 bg-blue-50 border-blue-200';
    if (score >= 40) return 'text-yellow-600 bg-yellow-50 border-yellow-200';
    return 'text-gray-600 bg-gray-50 border-gray-200';
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'NEW':
        return AlertCircle;
      case 'IN_PROGRESS':
        return TrendingUp;
      case 'COMPLETED':
        return CheckCircle2;
      case 'DISMISSED':
        return XCircle;
      default:
        return Target;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'NEW':
        return 'bg-blue-100 text-blue-800';
      case 'IN_PROGRESS':
        return 'bg-yellow-100 text-yellow-800';
      case 'COMPLETED':
        return 'bg-green-100 text-green-800';
      case 'DISMISSED':
        return 'bg-gray-100 text-gray-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const updateOpportunityStatus = async (id: string, status: string) => {
    try {
      await fetch(`/api/search-dominance/blue-ocean/${id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status }),
      });
      mutate(); // Revalidate data
    } catch (error) {
      console.error('Failed to update opportunity:', error);
    }
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Blue Ocean Opportunities</CardTitle>
            <CardDescription>
              {stats.total || 0} opportunities detected · {stats.highPriority || 0} high priority
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Button
              variant={filter === 'all' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('all')}
            >
              All
            </Button>
            <Button
              variant={filter === 'new' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('new')}
            >
              New ({stats.byStatus?.new || 0})
            </Button>
            <Button
              variant={filter === 'high-priority' ? 'default' : 'outline'}
              size="sm"
              onClick={() => setFilter('high-priority')}
            >
              High Priority
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        ) : filteredOpportunities.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-center text-muted-foreground">
            <div>
              <Target className="mx-auto mb-2 h-8 w-8" />
              <p>No opportunities found</p>
            </div>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredOpportunities.map((opp: any) => {
              const StatusIcon = getStatusIcon(opp.status);
              return (
                <div
                  key={opp.id}
                  className="flex items-start gap-4 rounded-lg border p-4"
                >
                  <div className={`rounded-lg border p-3 ${getScoreColor(opp.opportunityScore)}`}>
                    <div className="text-2xl font-bold">
                      {Math.round(opp.opportunityScore)}
                    </div>
                    <div className="text-xs">Score</div>
                  </div>
                  <div className="flex-1 space-y-2">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <h4 className="font-semibold">
                          {opp.keyword || opp.topic}
                        </h4>
                        <p className="text-sm text-muted-foreground">
                          {opp.category}
                        </p>
                      </div>
                      <Badge className={getStatusColor(opp.status)}>
                        <StatusIcon className="mr-1 h-3 w-3" />
                        {opp.status}
                      </Badge>
                    </div>
                    <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
                      <span>📊 {opp.searchVolume?.toLocaleString() || 'N/A'} searches/mo</span>
                      <span>📈 {opp.growthRate?.toFixed(1) || 0}% growth</span>
                      <span>⚔️ {opp.competitionGap?.toFixed(1) || 0}% gap</span>
                      <span>🎯 {opp.userIntent || 'Unknown'} intent</span>
                    </div>
                    {opp.suggestedContent && (
                      <p className="text-sm text-blue-600">
                        💡 {opp.suggestedContent}
                      </p>
                    )}
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">
                        Detected {formatDistanceToNow(new Date(opp.detectedAt), { addSuffix: true })}
                      </p>
                      {opp.status === 'NEW' && (
                        <div className="flex gap-2">
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() => updateOpportunityStatus(opp.id, 'IN_PROGRESS')}
                          >
                            Start
                          </Button>
                          <Button
                            size="sm"
                            variant="ghost"
                            onClick={() => updateOpportunityStatus(opp.id, 'DISMISSED')}
                          >
                            Dismiss
                          </Button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
