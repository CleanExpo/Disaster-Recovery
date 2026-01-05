/**
 * Dominance Score Gauge Component
 *
 * Circular progress gauge showing dominance score (0-100)
 */

'use client';

import { useEffect, useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import useSWR from 'swr';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface DominanceScoreGaugeProps {
  score?: number | null;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function DominanceScoreGauge({ score: propScore }: DominanceScoreGaugeProps) {
  const { data, isLoading } = useSWR('/api/search-dominance/metrics', fetcher, {
    refreshInterval: 60000, // Refresh every minute
  });

  const score = propScore !== undefined && propScore !== null ? propScore : data?.current?.dominanceScore || 0;
  const trend = data?.trend || 'stable';

  // Calculate color based on score
  const getColor = (score: number) => {
    if (score >= 80) return 'text-green-600';
    if (score >= 60) return 'text-blue-600';
    if (score >= 40) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getStrokeColor = (score: number) => {
    if (score >= 80) return '#16a34a'; // green-600
    if (score >= 60) return '#2563eb'; // blue-600
    if (score >= 40) return '#ca8a04'; // yellow-600
    return '#dc2626'; // red-600
  };

  // SVG circle parameters
  const radius = 80;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (score / 100) * circumference;

  return (
    <Card className="h-full">
      <CardHeader>
        <CardTitle>Dominance Score</CardTitle>
        <CardDescription>Overall search presence strength (0-100)</CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col items-center justify-center">
        {isLoading ? (
          <div className="flex h-48 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        ) : (
          <>
            {/* Circular Gauge */}
            <div className="relative mb-4">
              <svg width="200" height="200" className="transform -rotate-90">
                {/* Background circle */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke="#e5e7eb"
                  strokeWidth="12"
                  fill="none"
                />
                {/* Progress circle */}
                <circle
                  cx="100"
                  cy="100"
                  r={radius}
                  stroke={getStrokeColor(score)}
                  strokeWidth="12"
                  fill="none"
                  strokeDasharray={circumference}
                  strokeDashoffset={strokeDashoffset}
                  strokeLinecap="round"
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
              {/* Score Text */}
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className={`text-4xl font-bold ${getColor(score)}`}>
                  {Math.round(score)}
                </span>
                <span className="text-sm text-muted-foreground">/ 100</span>
              </div>
            </div>

            {/* Trend Indicator */}
            <div className="flex items-center gap-2 text-sm">
              {trend === 'up' && (
                <>
                  <TrendingUp className="h-4 w-4 text-green-600" />
                  <span className="text-green-600">Improving</span>
                </>
              )}
              {trend === 'down' && (
                <>
                  <TrendingDown className="h-4 w-4 text-red-600" />
                  <span className="text-red-600">Declining</span>
                </>
              )}
              {trend === 'stable' && (
                <>
                  <Minus className="h-4 w-4 text-gray-600" />
                  <span className="text-gray-600">Stable</span>
                </>
              )}
            </div>

            {/* Score Breakdown */}
            {data?.current && (
              <div className="mt-4 w-full space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Rankings</span>
                  <span className="font-medium">
                    {data.current.position1Count} #1 positions
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">AI Citations</span>
                  <span className="font-medium">
                    {data.current.aiOverviewCitations} citations
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Daily Sessions</span>
                  <span className="font-medium">
                    {data.current.dailySessions.toLocaleString()}
                  </span>
                </div>
              </div>
            )}
          </>
        )}
      </CardContent>
    </Card>
  );
}
