/**
 * Rank Tracker Dashboard Component
 *
 * Displays keyword rankings, changes, opportunities, and SERP features
 */

'use client';

import React, { useState, useEffect, useCallback } from 'react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  ArrowUpIcon,
  ArrowDownIcon,
  MinusIcon,
  TrendingUpIcon,
  AlertTriangleIcon,
  TargetIcon,
} from 'lucide-react';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

interface KeywordRanking {
  keyword: string;
  position: number | null;
  previousPosition: number | null;
  url: string;
  searchVolume: number;
  difficulty: number;
  serpFeatures: string[];
  device: 'desktop' | 'mobile';
  location: string;
}

interface RankingOpportunity {
  keyword: string;
  currentPosition: number;
  potentialPosition: number;
  searchVolume: number;
  estimatedTraffic: number;
  reason: string;
  actionItems: string[];
}

export function RankTrackerDashboard() {
  const [rankings, setRankings] = useState<KeywordRanking[]>([]);
  const [opportunities, setOpportunities] = useState<RankingOpportunity[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedDevice, setSelectedDevice] = useState<'desktop' | 'mobile' | 'all'>('all');
  const [selectedLocation, setSelectedLocation] = useState<string>('all');
  const [dateRange, setDateRange] = useState<'7d' | '30d' | '90d'>('30d');

  const fetchRankings = useCallback(async () => {
    try {
      setLoading(true);
      const response = await fetch(`/api/monitoring/rankings?device=${selectedDevice}&location=${selectedLocation}&range=${dateRange}`);
      const data = await response.json();
      setRankings(data.rankings || []);
    } catch (error) {
      console.error('Error fetching rankings:', error);
    } finally {
      setLoading(false);
    }
  }, [selectedDevice, selectedLocation, dateRange]);

  const fetchOpportunities = useCallback(async () => {
    try {
      const response = await fetch('/api/monitoring/rankings/opportunities');
      const data = await response.json();
      setOpportunities(data.opportunities || []);
    } catch (error) {
      console.error('Error fetching opportunities:', error);
    }
  }, []);

  useEffect(() => {
    void fetchRankings();
    void fetchOpportunities();
  }, [fetchRankings, fetchOpportunities]);

  const getRankingChange = (ranking: KeywordRanking) => {
    if (!ranking.previousPosition || !ranking.position) return null;
    return ranking.previousPosition - ranking.position;
  };

  const getRankingIcon = (change: number | null) => {
    if (change === null) return <MinusIcon className="h-4 w-4 text-gray-400" />;
    if (change > 0) return <ArrowUpIcon className="h-4 w-4 text-green-600" />;
    if (change < 0) return <ArrowDownIcon className="h-4 w-4 text-red-600" />;
    return <MinusIcon className="h-4 w-4 text-gray-400" />;
  };

  const getRankingBadgeColor = (position: number | null) => {
    if (!position) return 'secondary';
    if (position <= 3) return 'default'; // Green
    if (position <= 10) return 'secondary'; // Blue
    return 'outline'; // Gray
  };

  const getPositionDistribution = () => {
    const distribution = {
      'Top 3': rankings.filter(r => r.position && r.position <= 3).length,
      '4-10': rankings.filter(r => r.position && r.position >= 4 && r.position <= 10).length,
      '11-20': rankings.filter(r => r.position && r.position >= 11 && r.position <= 20).length,
      '21-50': rankings.filter(r => r.position && r.position >= 21 && r.position <= 50).length,
      '51+': rankings.filter(r => r.position && r.position > 50).length,
    };

    return Object.entries(distribution).map(([name, value]) => ({
      name,
      value,
    }));
  };

  const getSerpFeatureCount = () => {
    const features: { [key: string]: number } = {};
    rankings.forEach(r => {
      r.serpFeatures.forEach(feature => {
        features[feature] = (features[feature] || 0) + 1;
      });
    });

    return Object.entries(features)
      .map(([name, value]) => ({ name, value }))
      .sort((a, b) => b.value - a.value)
      .slice(0, 5);
  };

  const avgPosition = rankings.length > 0
    ? rankings.reduce((sum, r) => sum + (r.position || 0), 0) / rankings.length
    : 0;

  const top10Count = rankings.filter(r => r.position && r.position <= 10).length;
  const totalChanges = rankings.filter(r => getRankingChange(r) !== null && Math.abs(getRankingChange(r)!) >= 3).length;

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Tracked Keywords
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{rankings.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Average Position
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{avgPosition.toFixed(1)}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Top 10 Rankings
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{top10Count}</div>
            <p className="text-xs text-muted-foreground">
              {((top10Count / rankings.length) * 100).toFixed(0)}% of total
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Significant Changes
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalChanges}</div>
            <p className="text-xs text-muted-foreground">
              ±3 positions or more
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-4">
        <Select value={selectedDevice} onValueChange={(value: any) => setSelectedDevice(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select device" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Devices</SelectItem>
            <SelectItem value="desktop">Desktop</SelectItem>
            <SelectItem value="mobile">Mobile</SelectItem>
          </SelectContent>
        </Select>

        <Select value={selectedLocation} onValueChange={setSelectedLocation}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Select location" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Locations</SelectItem>
            <SelectItem value="United States">United States</SelectItem>
            <SelectItem value="United Kingdom">United Kingdom</SelectItem>
            <SelectItem value="Canada">Canada</SelectItem>
            <SelectItem value="Australia">Australia</SelectItem>
          </SelectContent>
        </Select>

        <Select value={dateRange} onValueChange={(value: any) => setDateRange(value)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Date range" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="7d">Last 7 days</SelectItem>
            <SelectItem value="30d">Last 30 days</SelectItem>
            <SelectItem value="90d">Last 90 days</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Main Content Tabs */}
      <Tabs defaultValue="rankings" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rankings">Rankings</TabsTrigger>
          <TabsTrigger value="opportunities">Opportunities</TabsTrigger>
          <TabsTrigger value="changes">Recent Changes</TabsTrigger>
          <TabsTrigger value="features">SERP Features</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
        </TabsList>

        {/* Rankings Tab */}
        <TabsContent value="rankings" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Keyword Rankings</CardTitle>
              <CardDescription>
                Current rankings for all tracked keywords
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Position</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Search Volume</TableHead>
                    <TableHead>Difficulty</TableHead>
                    <TableHead>SERP Features</TableHead>
                    <TableHead>URL</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankings.slice(0, 50).map((ranking, index) => {
                    const change = getRankingChange(ranking);
                    return (
                      <TableRow key={index}>
                        <TableCell className="font-medium">{ranking.keyword}</TableCell>
                        <TableCell>
                          <Badge variant={getRankingBadgeColor(ranking.position)}>
                            {ranking.position || 'N/A'}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            {getRankingIcon(change)}
                            {change !== null && (
                              <span className={change > 0 ? 'text-green-600' : change < 0 ? 'text-red-600' : ''}>
                                {Math.abs(change)}
                              </span>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{ranking.searchVolume.toLocaleString()}</TableCell>
                        <TableCell>{ranking.difficulty}</TableCell>
                        <TableCell>
                          <div className="flex gap-1">
                            {ranking.serpFeatures.slice(0, 2).map((feature, i) => (
                              <Badge key={i} variant="outline" className="text-xs">
                                {feature}
                              </Badge>
                            ))}
                            {ranking.serpFeatures.length > 2 && (
                              <Badge variant="outline" className="text-xs">
                                +{ranking.serpFeatures.length - 2}
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell className="max-w-xs truncate">{ranking.url}</TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Opportunities Tab */}
        <TabsContent value="opportunities" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TargetIcon className="h-5 w-5" />
                Ranking Opportunities
              </CardTitle>
              <CardDescription>
                Keywords with potential for ranking improvement
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {opportunities.slice(0, 10).map((opp, index) => (
                  <div key={index} className="border rounded-lg p-4 space-y-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="font-semibold text-lg">{opp.keyword}</h3>
                        <p className="text-sm text-muted-foreground">{opp.reason}</p>
                      </div>
                      <Badge variant="secondary">
                        +{opp.estimatedTraffic} traffic/month
                      </Badge>
                    </div>

                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <span className="text-muted-foreground">Current:</span>{' '}
                        <span className="font-medium">#{opp.currentPosition}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Target:</span>{' '}
                        <span className="font-medium">#{opp.potentialPosition}</span>
                      </div>
                      <div>
                        <span className="text-muted-foreground">Volume:</span>{' '}
                        <span className="font-medium">{opp.searchVolume.toLocaleString()}</span>
                      </div>
                    </div>

                    <div>
                      <p className="text-sm font-medium mb-1">Action Items:</p>
                      <ul className="list-disc list-inside text-sm text-muted-foreground space-y-1">
                        {opp.actionItems.map((item, i) => (
                          <li key={i}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Recent Changes Tab */}
        <TabsContent value="changes" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Recent Ranking Changes</CardTitle>
              <CardDescription>
                Keywords with significant ranking changes (±3 positions)
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Keyword</TableHead>
                    <TableHead>Previous</TableHead>
                    <TableHead>Current</TableHead>
                    <TableHead>Change</TableHead>
                    <TableHead>Impact</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {rankings
                    .filter(r => {
                      const change = getRankingChange(r);
                      return change !== null && Math.abs(change) >= 3;
                    })
                    .sort((a, b) => {
                      const changeA = Math.abs(getRankingChange(a) || 0);
                      const changeB = Math.abs(getRankingChange(b) || 0);
                      return changeB - changeA;
                    })
                    .slice(0, 20)
                    .map((ranking, index) => {
                      const change = getRankingChange(ranking)!;
                      return (
                        <TableRow key={index}>
                          <TableCell className="font-medium">{ranking.keyword}</TableCell>
                          <TableCell>#{ranking.previousPosition}</TableCell>
                          <TableCell>#{ranking.position}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              {getRankingIcon(change)}
                              <span className={change > 0 ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                                {change > 0 ? '+' : ''}{change}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>
                            {change > 0 ? (
                              <Badge variant="default">Positive</Badge>
                            ) : (
                              <Badge variant="destructive">Negative</Badge>
                            )}
                          </TableCell>
                        </TableRow>
                      );
                    })}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        </TabsContent>

        {/* SERP Features Tab */}
        <TabsContent value="features" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>SERP Feature Distribution</CardTitle>
                <CardDescription>
                  Top SERP features across tracked keywords
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getSerpFeatureCount()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#0066cc" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Position Distribution</CardTitle>
                <CardDescription>
                  Distribution of rankings by position range
                </CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={getPositionDistribution()}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="value" fill="#10b981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Analytics Tab */}
        <TabsContent value="analytics" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Ranking Trends</CardTitle>
              <CardDescription>
                Average position over time
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={[]}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis reversed />
                  <Tooltip />
                  <Legend />
                  <Line type="monotone" dataKey="avgPosition" stroke="#0066cc" name="Average Position" />
                  <Line type="monotone" dataKey="top10Count" stroke="#10b981" name="Top 10 Count" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
