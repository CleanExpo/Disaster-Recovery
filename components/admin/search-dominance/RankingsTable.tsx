/**
 * Rankings Table Component
 *
 * Sortable table showing current keyword rankings
 */

'use client';

import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useSWR from 'swr';
import { TrendingUp, TrendingDown, Sparkles, Search } from 'lucide-react';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export function RankingsTable() {
  const [searchQuery, setSearchQuery] = useState('');
  const [locationFilter, setLocationFilter] = useState<string>('all');

  const { data, isLoading } = useSWR(
    `/api/search-dominance/rankings?limit=100`,
    fetcher,
    {
      refreshInterval: 120000, // Refresh every 2 minutes
    }
  );

  const rankings = data?.rankings || [];
  const summary = data?.summary || {};

  // Filter rankings by search query and location
  const filteredRankings = rankings.filter((ranking: any) => {
    const matchesSearch = searchQuery
      ? ranking.keyword.toLowerCase().includes(searchQuery.toLowerCase())
      : true;
    const matchesLocation =
      locationFilter === 'all' || ranking.location === locationFilter;
    return matchesSearch && matchesLocation;
  });

  const getPositionColor = (position: number) => {
    if (position === 1) return 'text-yellow-600 bg-yellow-50';
    if (position <= 3) return 'text-blue-600 bg-blue-50';
    if (position <= 10) return 'text-green-600 bg-green-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <Card>
      <CardHeader>
        <div className="flex items-center justify-between">
          <div>
            <CardTitle>Keyword Rankings</CardTitle>
            <CardDescription>
              {summary.totalKeywords || 0} keywords tracked · {summary.position1 || 0} in #1 position
            </CardDescription>
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search keywords..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-64"
              />
            </div>
          </div>
        </div>
        {/* Summary Stats */}
        <div className="flex gap-4 mt-4 text-sm">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-yellow-500" />
            <span>{summary.position1 || 0} #1</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-blue-500" />
            <span>{summary.position1to3 || 0} Top 3</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-green-500" />
            <span>{summary.position1to10 || 0} Top 10</span>
          </div>
          <div className="flex items-center gap-2">
            <Sparkles className="h-3 w-3 text-purple-500" />
            <span>{summary.aiCitations || 0} AI Citations</span>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="flex h-64 items-center justify-center">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
          </div>
        ) : filteredRankings.length === 0 ? (
          <div className="flex h-64 items-center justify-center text-center text-muted-foreground">
            <div>
              <Search className="mx-auto mb-2 h-8 w-8" />
              <p>No rankings found</p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead className="border-b">
                <tr className="text-left text-sm font-medium text-muted-foreground">
                  <th className="pb-3 pr-4">Position</th>
                  <th className="pb-3 pr-4">Keyword</th>
                  <th className="pb-3 pr-4">Change</th>
                  <th className="pb-3 pr-4">Volume</th>
                  <th className="pb-3 pr-4">Features</th>
                  <th className="pb-3 pr-4">Location</th>
                  <th className="pb-3">Device</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {filteredRankings.slice(0, 50).map((ranking: any, index: number) => {
                  const change = ranking.change || 0;
                  const hasChange = ranking.previousPosition !== null && change !== 0;

                  return (
                    <tr key={index} className="text-sm">
                      <td className="py-3 pr-4">
                        <div
                          className={`inline-flex h-8 w-8 items-center justify-center rounded-full font-bold ${getPositionColor(
                            ranking.position
                          )}`}
                        >
                          {ranking.position}
                        </div>
                      </td>
                      <td className="py-3 pr-4 font-medium">
                        <div>{ranking.keyword}</div>
                        {ranking.url && (
                          <div className="text-xs text-muted-foreground truncate max-w-xs">
                            {ranking.url}
                          </div>
                        )}
                      </td>
                      <td className="py-3 pr-4">
                        {hasChange ? (
                          <div className="flex items-center gap-1">
                            {change > 0 ? (
                              <>
                                <TrendingUp className="h-4 w-4 text-green-600" />
                                <span className="text-green-600 font-medium">
                                  +{Math.abs(change)}
                                </span>
                              </>
                            ) : (
                              <>
                                <TrendingDown className="h-4 w-4 text-red-600" />
                                <span className="text-red-600 font-medium">
                                  -{Math.abs(change)}
                                </span>
                              </>
                            )}
                          </div>
                        ) : (
                          <span className="text-muted-foreground">-</span>
                        )}
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {ranking.searchVolume?.toLocaleString() || '-'}
                      </td>
                      <td className="py-3 pr-4">
                        <div className="flex flex-wrap gap-1">
                          {ranking.hasFeaturedSnippet && (
                            <Badge variant="outline" className="text-xs">
                              FS
                            </Badge>
                          )}
                          {ranking.hasLocalPack && (
                            <Badge variant="outline" className="text-xs">
                              LP
                            </Badge>
                          )}
                          {ranking.isInAIOverview && (
                            <Badge variant="outline" className="text-xs bg-purple-50">
                              <Sparkles className="mr-1 h-2 w-2" />
                              AI
                            </Badge>
                          )}
                        </div>
                      </td>
                      <td className="py-3 pr-4 text-muted-foreground">
                        {ranking.location}
                      </td>
                      <td className="py-3 text-muted-foreground capitalize">
                        {ranking.device}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
