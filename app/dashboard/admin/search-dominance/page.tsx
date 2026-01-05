/**
 * Search Dominance Command Center
 *
 * Real-time dashboard for monitoring search dominance metrics,
 * rankings, Blue Ocean opportunities, and competitive intelligence.
 */

'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { DominanceScoreGauge } from '@/components/admin/search-dominance/DominanceScoreGauge';
import { RankingSnapshot } from '@/components/admin/search-dominance/RankingSnapshot';
import { AlertFeed } from '@/components/admin/search-dominance/AlertFeed';
import { TrafficChart } from '@/components/admin/search-dominance/TrafficChart';
import { BlueOceanRadar } from '@/components/admin/search-dominance/BlueOceanRadar';
import { CompetitorActivityFeed } from '@/components/admin/search-dominance/CompetitorActivityFeed';
import { RankingsTable } from '@/components/admin/search-dominance/RankingsTable';
import { AlgorithmTimeline } from '@/components/admin/search-dominance/AlgorithmTimeline';
import { TerritoryMap } from '@/components/admin/search-dominance/TerritoryMap';
import { useSearchDominance } from '@/hooks/useSearchDominance';
import {
  Activity,
  TrendingUp,
  Target,
  AlertCircle,
  MapPin,
  Sparkles,
} from 'lucide-react';

export default function SearchDominancePage() {
  const [activeTab, setActiveTab] = useState('overview');

  // Real-time WebSocket subscriptions
  const {
    latestDominanceScore,
    recentAlerts,
    connected,
  } = useSearchDominance({
    onRankingChange: (data) => {
      console.log('[Search Dominance] Ranking change:', data);
    },
    onDominanceUpdate: (data) => {
      console.log('[Search Dominance] Dominance update:', data);
    },
    onAlert: (data) => {
      console.log('[Search Dominance] New alert:', data);
    },
  });

  return (
    <div className="flex flex-col gap-6 p-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Search Dominance</h1>
          <p className="text-muted-foreground">
            Command Center for search intelligence and competitive analysis
          </p>
        </div>
        <div className="flex items-center gap-2">
          <div
            className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm ${
              connected
                ? 'border-green-200 bg-green-50 text-green-700'
                : 'border-gray-200 bg-gray-50 text-gray-700'
            }`}
          >
            <div
              className={`h-2 w-2 rounded-full ${
                connected ? 'bg-green-500' : 'bg-gray-400'
              }`}
            />
            {connected ? 'Live' : 'Offline'}
          </div>
        </div>
      </div>

      {/* Overview Section - Always Visible */}
      <div className="grid gap-6 md:grid-cols-12">
        {/* Dominance Score Gauge */}
        <div className="md:col-span-4">
          <DominanceScoreGauge score={latestDominanceScore} />
        </div>

        {/* Ranking Snapshot Cards */}
        <div className="md:col-span-5">
          <RankingSnapshot />
        </div>

        {/* Alert Feed */}
        <div className="md:col-span-3">
          <AlertFeed alerts={recentAlerts} />
        </div>
      </div>

      {/* Traffic Chart */}
      <TrafficChart />

      {/* Tabs for Detailed Views */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
        <TabsList className="grid w-full grid-cols-6">
          <TabsTrigger value="overview" className="flex items-center gap-2">
            <Activity className="h-4 w-4" />
            Overview
          </TabsTrigger>
          <TabsTrigger value="rankings" className="flex items-center gap-2">
            <TrendingUp className="h-4 w-4" />
            Rankings
          </TabsTrigger>
          <TabsTrigger value="blue-ocean" className="flex items-center gap-2">
            <Target className="h-4 w-4" />
            Blue Ocean
          </TabsTrigger>
          <TabsTrigger value="competitors" className="flex items-center gap-2">
            <AlertCircle className="h-4 w-4" />
            Competitors
          </TabsTrigger>
          <TabsTrigger value="algorithm" className="flex items-center gap-2">
            <Sparkles className="h-4 w-4" />
            Algorithm
          </TabsTrigger>
          <TabsTrigger value="territory" className="flex items-center gap-2">
            <MapPin className="h-4 w-4" />
            Territory
          </TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Search Dominance Overview</CardTitle>
              <CardDescription>
                Real-time snapshot of your search presence and competitive position
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">
                Use the tabs above to explore detailed rankings, Blue Ocean opportunities,
                competitor activity, algorithm updates, and territory coverage.
              </p>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Rankings Tab */}
        <TabsContent value="rankings" className="space-y-6">
          <RankingsTable />
        </TabsContent>

        {/* Blue Ocean Tab */}
        <TabsContent value="blue-ocean" className="space-y-6">
          <BlueOceanRadar />
        </TabsContent>

        {/* Competitors Tab */}
        <TabsContent value="competitors" className="space-y-6">
          <CompetitorActivityFeed />
        </TabsContent>

        {/* Algorithm Tab */}
        <TabsContent value="algorithm" className="space-y-6">
          <AlgorithmTimeline />
        </TabsContent>

        {/* Territory Tab */}
        <TabsContent value="territory" className="space-y-6">
          <TerritoryMap />
        </TabsContent>
      </Tabs>
    </div>
  );
}
