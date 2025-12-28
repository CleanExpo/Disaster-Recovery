/**
 * Backlink Monitoring Dashboard
 *
 * Real-time dashboard for monitoring backlink acquisition, domain authority trends,
 * anchor text distribution, and competitor analysis.
 *
 * @module BacklinkDashboard
 * @category SEO - Components
 */

'use client';

import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';
import {
  TrendingUp,
  TrendingDown,
  Link,
  AlertTriangle,
  CheckCircle,
  ExternalLink,
  Activity
} from 'lucide-react';

// ============================================================================
// Types
// ============================================================================

interface Backlink {
  id: string;
  sourceUrl: string;
  sourceDomain: string;
  targetUrl: string;
  anchor: string;
  domainAuthority: number;
  isDoFollow: boolean;
  firstSeen: Date;
  lastChecked: Date;
  status: 'active' | 'lost' | 'broken' | 'nofollow_changed';
}

interface DomainAuthorityTrend {
  date: string;
  domainAuthority: number;
  backlinksCount: number;
}

interface AnchorTextDistribution {
  anchor: string;
  count: number;
  percentage: number;
}

interface CompetitorData {
  competitor: string;
  domainAuthority: number;
  backlinks: number;
  referringDomains: number;
}

interface BacklinkStats {
  total: number;
  new: number;
  lost: number;
  doFollow: number;
  noFollow: number;
  avgDomainAuthority: number;
  referringDomains: number;
}

// ============================================================================
// Dashboard Component
// ============================================================================

export function BacklinkDashboard() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<BacklinkStats | null>(null);
  const [backlinks, setBacklinks] = useState<Backlink[]>([]);
  const [trends, setTrends] = useState<DomainAuthorityTrend[]>([]);
  const [anchorTexts, setAnchorTexts] = useState<AnchorTextDistribution[]>([]);
  const [competitors, setCompetitors] = useState<CompetitorData[]>([]);
  const [alerts, setAlerts] = useState<Array<{ type: string; message: string }>>([]);

  useEffect(() => {
    loadDashboardData();
    const interval = setInterval(loadDashboardData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);

      // Load all dashboard data
      const [statsRes, backlinsRes, trendsRes, anchorsRes, competitorsRes] = await Promise.all([
        fetch('/api/link-building/backlinks/stats'),
        fetch('/api/link-building/backlinks/list'),
        fetch('/api/link-building/backlinks/trends'),
        fetch('/api/link-building/backlinks/anchor-distribution'),
        fetch('/api/link-building/backlinks/competitors')
      ]);

      const [statsData, backlinksData, trendsData, anchorsData, competitorsData] = await Promise.all([
        statsRes.json(),
        backlinsRes.json(),
        trendsRes.json(),
        anchorsRes.json(),
        competitorsRes.json()
      ]);

      setStats(statsData);
      setBacklinks(backlinksData.backlinks || []);
      setTrends(trendsData.trends || []);
      setAnchorTexts(anchorsData.distribution || []);
      setCompetitors(competitorsData.competitors || []);

      // Generate alerts
      const newAlerts = [];
      if (statsData.lost > 5) {
        newAlerts.push({
          type: 'warning',
          message: `${statsData.lost} backlinks lost in the last 30 days`
        });
      }
      if (statsData.new > 10) {
        newAlerts.push({
          type: 'success',
          message: `${statsData.new} new backlinks acquired in the last 30 days`
        });
      }
      setAlerts(newAlerts);

    } catch (error) {
      console.error('Failed to load dashboard data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading && !stats) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <Activity className="h-12 w-12 animate-spin mx-auto mb-4 text-gray-400" />
          <p className="text-gray-600">Loading backlink data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="space-y-2">
          {alerts.map((alert, idx) => (
            <Alert key={idx} variant={alert.type === 'warning' ? 'destructive' : 'default'}>
              {alert.type === 'warning' ? (
                <AlertTriangle className="h-4 w-4" />
              ) : (
                <CheckCircle className="h-4 w-4" />
              )}
              <AlertDescription>{alert.message}</AlertDescription>
            </Alert>
          ))}
        </div>
      )}

      {/* Stats Overview */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <StatCard
          title="Total Backlinks"
          value={stats?.total || 0}
          icon={<Link className="h-4 w-4" />}
        />
        <StatCard
          title="New (30d)"
          value={stats?.new || 0}
          trend="up"
          icon={<TrendingUp className="h-4 w-4 text-green-500" />}
        />
        <StatCard
          title="Lost (30d)"
          value={stats?.lost || 0}
          trend="down"
          icon={<TrendingDown className="h-4 w-4 text-red-500" />}
        />
        <StatCard
          title="DoFollow"
          value={stats?.doFollow || 0}
          percentage={stats ? (stats.doFollow / stats.total) * 100 : 0}
        />
        <StatCard
          title="Avg DA"
          value={Math.round(stats?.avgDomainAuthority || 0)}
          suffix="/100"
        />
        <StatCard
          title="Referring Domains"
          value={stats?.referringDomains || 0}
        />
      </div>

      {/* Main Dashboard Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="backlinks">Backlinks</TabsTrigger>
          <TabsTrigger value="anchors">Anchor Texts</TabsTrigger>
          <TabsTrigger value="competitors">Competitors</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
            <Card>
              <CardHeader>
                <CardTitle>Domain Authority Trend</CardTitle>
                <CardDescription>Last 90 days</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <LineChart data={trends}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="date" />
                    <YAxis yAxisId="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Legend />
                    <Line
                      yAxisId="left"
                      type="monotone"
                      dataKey="domainAuthority"
                      stroke="#8884d8"
                      name="Domain Authority"
                    />
                    <Line
                      yAxisId="right"
                      type="monotone"
                      dataKey="backlinksCount"
                      stroke="#82ca9d"
                      name="Backlinks"
                    />
                  </LineChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Backlink Type Distribution</CardTitle>
                <CardDescription>DoFollow vs NoFollow</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={[
                        { name: 'DoFollow', value: stats?.doFollow || 0 },
                        { name: 'NoFollow', value: stats?.noFollow || 0 }
                      ]}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      <Cell fill="#10b981" />
                      <Cell fill="#ef4444" />
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Backlinks Tab */}
        <TabsContent value="backlinks">
          <Card>
            <CardHeader>
              <CardTitle>Recent Backlinks</CardTitle>
              <CardDescription>Latest backlinks acquired</CardDescription>
            </CardHeader>
            <CardContent>
              <BacklinksTable backlinks={backlinks.slice(0, 20)} />
            </CardContent>
          </Card>
        </TabsContent>

        {/* Anchor Texts Tab */}
        <TabsContent value="anchors">
          <Card>
            <CardHeader>
              <CardTitle>Anchor Text Distribution</CardTitle>
              <CardDescription>Most common anchor texts</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={anchorTexts.slice(0, 15)}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="anchor" angle={-45} textAnchor="end" height={100} />
                  <YAxis />
                  <Tooltip />
                  <Bar dataKey="count" fill="#8884d8" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Competitors Tab */}
        <TabsContent value="competitors">
          <Card>
            <CardHeader>
              <CardTitle>Competitor Comparison</CardTitle>
              <CardDescription>Backlink metrics vs competitors</CardDescription>
            </CardHeader>
            <CardContent>
              <CompetitorsTable competitors={competitors} />
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// ============================================================================
// Sub-components
// ============================================================================

interface StatCardProps {
  title: string;
  value: number;
  trend?: 'up' | 'down';
  icon?: React.ReactNode;
  percentage?: number;
  suffix?: string;
}

function StatCard({ title, value, trend, icon, percentage, suffix }: StatCardProps) {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm text-gray-600">{title}</span>
          {icon}
        </div>
        <div className="flex items-baseline gap-2">
          <span className="text-2xl font-bold">
            {value.toLocaleString()}
            {suffix}
          </span>
          {percentage !== undefined && (
            <span className="text-sm text-gray-500">
              ({percentage.toFixed(1)}%)
            </span>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function BacklinksTable({ backlinks }: { backlinks: Backlink[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Source Domain</th>
            <th className="text-left p-2">Anchor Text</th>
            <th className="text-left p-2">DA</th>
            <th className="text-left p-2">Type</th>
            <th className="text-left p-2">Status</th>
            <th className="text-left p-2">First Seen</th>
          </tr>
        </thead>
        <tbody>
          {backlinks.map((bl) => (
            <tr key={bl.id} className="border-b hover:bg-gray-50">
              <td className="p-2">
                <a
                  href={bl.sourceUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 hover:underline flex items-center gap-1"
                >
                  {bl.sourceDomain}
                  <ExternalLink className="h-3 w-3" />
                </a>
              </td>
              <td className="p-2 max-w-xs truncate">{bl.anchor}</td>
              <td className="p-2">
                <Badge variant={bl.domainAuthority >= 60 ? 'default' : 'secondary'}>
                  {bl.domainAuthority}
                </Badge>
              </td>
              <td className="p-2">
                <Badge variant={bl.isDoFollow ? 'default' : 'outline'}>
                  {bl.isDoFollow ? 'DoFollow' : 'NoFollow'}
                </Badge>
              </td>
              <td className="p-2">
                <Badge
                  variant={
                    bl.status === 'active' ? 'default' :
                    bl.status === 'lost' ? 'destructive' : 'secondary'
                  }
                >
                  {bl.status}
                </Badge>
              </td>
              <td className="p-2 text-gray-600">
                {new Date(bl.firstSeen).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

function CompetitorsTable({ competitors }: { competitors: CompetitorData[] }) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left p-2">Competitor</th>
            <th className="text-right p-2">Domain Authority</th>
            <th className="text-right p-2">Total Backlinks</th>
            <th className="text-right p-2">Referring Domains</th>
          </tr>
        </thead>
        <tbody>
          {competitors.map((comp, idx) => (
            <tr key={idx} className="border-b hover:bg-gray-50">
              <td className="p-2 font-medium">{comp.competitor}</td>
              <td className="p-2 text-right">
                <Badge variant={comp.domainAuthority >= 60 ? 'default' : 'secondary'}>
                  {comp.domainAuthority}
                </Badge>
              </td>
              <td className="p-2 text-right">{comp.backlinks.toLocaleString()}</td>
              <td className="p-2 text-right">{comp.referringDomains.toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default BacklinkDashboard;
