'use client';

/**
 * Competitor Analysis Dashboard
 *
 * Main dashboard for competitor intelligence
 * - Overview cards (metrics)
 * - Competitor table
 * - Keyword opportunity matrix
 * - SWOT analysis
 * - Ranking tracker
 */

import { useState, useEffect } from 'react';
import useSWR from 'swr';
import {
  CompetitorTableRow,
  KeywordOpportunityData,
  SWOTData,
  KeywordData,
  DashboardOverview,
  CompetitorCategory,
} from '@/lib/competitor-analysis/types/dashboard-types';
import { CompetitorTable } from '@/components/competitor-analysis/competitor-table';
import { KeywordMatrix } from '@/components/competitor-analysis/keyword-matrix';
import { SWOTQuadrants } from '@/components/competitor-analysis/swot-quadrants';
import { RankingTracker } from '@/components/competitor-analysis/ranking-tracker';
import {
  BarChart3,
  TrendingUp,
  Search,
  Calendar,
  RefreshCw,
  Download,
  Target,
} from 'lucide-react';

// Fetcher for SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function CompetitorAnalysisDashboard() {
  const [selectedCompetitor, setSelectedCompetitor] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'keywords' | 'swot' | 'rankings'>(
    'overview'
  );
  const [isRefreshing, setIsRefreshing] = useState(false);

  // Fetch dashboard data
  const { data: overview, error: overviewError, mutate: refreshOverview } = useSWR<DashboardOverview>(
    '/api/competitor-analysis/overview',
    fetcher
  );

  const { data: competitors, error: competitorsError, mutate: refreshCompetitors } = useSWR<
    CompetitorTableRow[]
  >('/api/competitor-analysis/competitors', fetcher);

  const { data: opportunities, error: opportunitiesError } = useSWR<KeywordOpportunityData[]>(
    '/api/competitor-analysis/opportunities',
    fetcher
  );

  const { data: keywords, error: keywordsError } = useSWR<KeywordData[]>(
    '/api/competitor-analysis/keywords',
    fetcher
  );

  const { data: swotData, mutate: refreshSwot } = useSWR<SWOTData | null>(
    selectedCompetitor ? `/api/competitor-analysis/swot/${selectedCompetitor}` : null,
    fetcher
  );

  const isLoading = !overview && !overviewError;
  const hasError = overviewError || competitorsError || opportunitiesError || keywordsError;

  // Handle refresh
  const handleRefreshAll = async () => {
    setIsRefreshing(true);
    await Promise.all([
      refreshOverview(),
      refreshCompetitors(),
    ]);
    setIsRefreshing(false);
  };

  // Handle competitor actions
  const handleAnalyzeCompetitor = async (competitorId: string) => {
    try {
      const response = await fetch(`/api/competitor-analysis/analyze/${competitorId}`, {
        method: 'POST',
      });
      if (response.ok) {
        await refreshCompetitors();
        alert('Analysis started successfully!');
      } else {
        alert('Failed to start analysis');
      }
    } catch (error) {
      console.error('Error analyzing competitor:', error);
      alert('Error starting analysis');
    }
  };

  const handleViewDetails = (competitorId: string) => {
    setSelectedCompetitor(competitorId);
    setActiveTab('overview');
  };

  const handleViewSWOT = (competitorId: string) => {
    setSelectedCompetitor(competitorId);
    setActiveTab('swot');
  };

  // Get selected competitor data
  const selectedCompetitorData = competitors?.find((c) => c.id === selectedCompetitor);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                Competitor Intelligence Dashboard
              </h1>
              <p className="mt-1 text-sm text-gray-600">
                Real-time competitive analysis powered by SEMRUSH & DataForSEO
              </p>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={handleRefreshAll}
                disabled={isRefreshing}
                className="px-4 py-2 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2 disabled:opacity-50"
              >
                <RefreshCw className={`w-5 h-5 ${isRefreshing ? 'animate-spin' : ''}`} />
                Refresh
              </button>
              <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center gap-2">
                <Download className="w-5 h-5" />
                Export Report
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Error State */}
        {hasError && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <div className="flex items-center gap-2 text-red-800">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z"
                  clipRule="evenodd"
                />
              </svg>
              <span className="font-medium">Error loading dashboard data</span>
            </div>
            <p className="mt-1 text-sm text-red-700">
              Please try refreshing the page or contact support if the issue persists.
            </p>
          </div>
        )}

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center h-96">
            <div className="text-center">
              <RefreshCw className="w-12 h-12 text-blue-600 animate-spin mx-auto mb-4" />
              <p className="text-gray-600 font-medium">Loading dashboard...</p>
            </div>
          </div>
        ) : (
          <>
            {/* Overview Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Total Competitors</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {overview?.totalCompetitors || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-blue-100 rounded-lg">
                    <BarChart3 className="w-6 h-6 text-blue-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Across {Object.keys(CompetitorCategory).length} categories
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Keywords Tracked</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {overview?.totalKeywords?.toLocaleString() || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-green-100 rounded-lg">
                    <Search className="w-6 h-6 text-green-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Avg {Math.round((overview?.avgOrganicTraffic || 0) / 1000)}k traffic/month
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Opportunities</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {overview?.totalOpportunities || 0}
                    </p>
                  </div>
                  <div className="p-3 bg-purple-100 rounded-lg">
                    <Target className="w-6 h-6 text-purple-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  High-value keyword targets identified
                </p>
              </div>

              <div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-gray-600">Last Analysis</p>
                    <p className="text-3xl font-bold text-gray-900 mt-2">
                      {overview?.lastAnalysisDate
                        ? new Date(overview.lastAnalysisDate).toLocaleDateString('en-AU', {
                            month: 'short',
                            day: 'numeric',
                          })
                        : 'N/A'}
                    </p>
                  </div>
                  <div className="p-3 bg-orange-100 rounded-lg">
                    <Calendar className="w-6 h-6 text-orange-600" />
                  </div>
                </div>
                <p className="text-xs text-gray-500 mt-4">
                  Avg DR: {overview?.avgDomainRating?.toFixed(1) || 0}
                </p>
              </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow-sm border border-gray-200 mb-8">
              <div className="border-b border-gray-200">
                <nav className="flex -mb-px">
                  <button
                    onClick={() => setActiveTab('overview')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'overview'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Competitors Overview
                  </button>
                  <button
                    onClick={() => setActiveTab('keywords')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'keywords'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Keyword Opportunities
                  </button>
                  <button
                    onClick={() => setActiveTab('swot')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'swot'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    SWOT Analysis
                  </button>
                  <button
                    onClick={() => setActiveTab('rankings')}
                    className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                      activeTab === 'rankings'
                        ? 'border-blue-600 text-blue-600'
                        : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                    }`}
                  >
                    Ranking Tracker
                  </button>
                </nav>
              </div>

              <div className="p-6">
                {/* Competitors Overview Tab */}
                {activeTab === 'overview' && (
                  <CompetitorTable
                    competitors={competitors || []}
                    onAnalyze={handleAnalyzeCompetitor}
                    onViewDetails={handleViewDetails}
                    onViewSWOT={handleViewSWOT}
                    isLoading={!competitors}
                  />
                )}

                {/* Keyword Opportunities Tab */}
                {activeTab === 'keywords' && (
                  <KeywordMatrix
                    opportunities={opportunities || []}
                    onKeywordClick={(keyword) => {
                      console.log('Keyword clicked:', keyword);
                    }}
                  />
                )}

                {/* SWOT Analysis Tab */}
                {activeTab === 'swot' && (
                  <>
                    {!selectedCompetitor ? (
                      <div className="text-center py-12">
                        <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                        <p className="text-gray-600 font-medium">
                          Select a competitor to view SWOT analysis
                        </p>
                        <p className="text-sm text-gray-500 mt-1">
                          Click "View SWOT" on any competitor in the overview tab
                        </p>
                      </div>
                    ) : (
                      <>
                        <div className="mb-6">
                          <select
                            value={selectedCompetitor}
                            onChange={(e) => setSelectedCompetitor(e.target.value)}
                            className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                          >
                            {competitors?.map((comp) => (
                              <option key={comp.id} value={comp.id}>
                                {comp.name} ({comp.domain})
                              </option>
                            ))}
                          </select>
                        </div>
                        <SWOTQuadrants
                          swotData={swotData || null}
                          competitorName={selectedCompetitorData?.name || 'Competitor'}
                          isLoading={!swotData && selectedCompetitor !== null}
                        />
                      </>
                    )}
                  </>
                )}

                {/* Ranking Tracker Tab */}
                {activeTab === 'rankings' && (
                  <RankingTracker
                    keywords={keywords || []}
                    onKeywordClick={(keyword) => {
                      console.log('Ranking clicked:', keyword);
                    }}
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
