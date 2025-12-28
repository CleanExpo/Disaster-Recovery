'use client';

/**
 * Keyword Matrix Component
 *
 * Interactive bubble chart showing keyword opportunities
 * X-axis: Search Volume
 * Y-axis: Difficulty
 * Bubble size: Opportunity Score
 * Color: Difficulty tier (easy/medium/hard)
 */

import { useState } from 'react';
import {
  ScatterChart,
  Scatter,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  Cell,
} from 'recharts';
import { KeywordOpportunityData } from '@/lib/competitor-analysis/types/dashboard-types';
import { TrendingUp, Search } from 'lucide-react';

interface KeywordMatrixProps {
  opportunities: KeywordOpportunityData[];
  onKeywordClick?: (keyword: KeywordOpportunityData) => void;
}

interface BubbleData {
  x: number; // Search volume
  y: number; // Difficulty
  z: number; // Opportunity score (for size)
  keyword: string;
  tier: 'easy' | 'medium' | 'hard';
  cpc: number | null;
  competitorCount: number;
}

const TIER_COLORS = {
  easy: '#10b981', // Green
  medium: '#f59e0b', // Orange
  hard: '#ef4444', // Red
};

const TIER_LABELS = {
  easy: 'Easy Wins',
  medium: 'Medium Difficulty',
  hard: 'High Difficulty',
};

export function KeywordMatrix({ opportunities, onKeywordClick }: KeywordMatrixProps) {
  const [selectedTier, setSelectedTier] = useState<'all' | 'easy' | 'medium' | 'hard'>('all');
  const [searchTerm, setSearchTerm] = useState('');

  // Transform data for bubble chart
  const bubbleData: BubbleData[] = opportunities
    .filter((opp) => {
      const matchesTier = selectedTier === 'all' || opp.difficultyTier === selectedTier;
      const matchesSearch =
        !searchTerm ||
        opp.keyword.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesTier && matchesSearch;
    })
    .map((opp) => ({
      x: opp.searchVolume,
      y: opp.difficulty,
      z: opp.opportunityScore * 100, // Scale for bubble size
      keyword: opp.keyword,
      tier: opp.difficultyTier,
      cpc: opp.cpc,
      competitorCount: opp.competitorCount,
    }));

  // Group by tier for different scatter series
  const easyData = bubbleData.filter((d) => d.tier === 'easy');
  const mediumData = bubbleData.filter((d) => d.tier === 'medium');
  const hardData = bubbleData.filter((d) => d.tier === 'hard');

  // Custom tooltip
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length > 0) {
      const data = payload[0].payload as BubbleData;
      return (
        <div className="bg-white p-4 rounded-lg shadow-lg border border-gray-200">
          <div className="font-semibold text-gray-900 mb-2">{data.keyword}</div>
          <div className="space-y-1 text-sm">
            <div className="flex justify-between gap-4">
              <span className="text-gray-600">Search Volume:</span>
              <span className="font-medium">{data.x.toLocaleString()}/mo</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-600">Difficulty:</span>
              <span className="font-medium">{data.y.toFixed(1)}/100</span>
            </div>
            <div className="flex justify-between gap-4">
              <span className="text-gray-600">Opportunity:</span>
              <span className="font-medium">{(data.z / 100).toFixed(2)}</span>
            </div>
            {data.cpc && (
              <div className="flex justify-between gap-4">
                <span className="text-gray-600">CPC:</span>
                <span className="font-medium">${data.cpc.toFixed(2)}</span>
              </div>
            )}
            <div className="flex justify-between gap-4">
              <span className="text-gray-600">Competitors:</span>
              <span className="font-medium">{data.competitorCount}</span>
            </div>
          </div>
          <div className="mt-2 pt-2 border-t border-gray-200">
            <span
              className={`inline-block px-2 py-1 text-xs font-medium rounded-full ${
                data.tier === 'easy'
                  ? 'bg-green-100 text-green-800'
                  : data.tier === 'medium'
                  ? 'bg-yellow-100 text-yellow-800'
                  : 'bg-red-100 text-red-800'
              }`}
            >
              {TIER_LABELS[data.tier]}
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  // Stats
  const stats = {
    total: opportunities.length,
    easy: opportunities.filter((o) => o.difficultyTier === 'easy').length,
    medium: opportunities.filter((o) => o.difficultyTier === 'medium').length,
    hard: opportunities.filter((o) => o.difficultyTier === 'hard').length,
    avgVolume:
      opportunities.reduce((sum, o) => sum + o.searchVolume, 0) / opportunities.length || 0,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            Keyword Opportunity Matrix
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {bubbleData.length} opportunities visualized
          </p>
        </div>
        <div className="flex items-center gap-2">
          <TrendingUp className="w-5 h-5 text-blue-600" />
          <span className="text-sm font-medium text-gray-700">
            Avg Volume: {stats.avgVolume.toLocaleString()}/mo
          </span>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
        <button
          onClick={() => setSelectedTier('all')}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedTier === 'all'
              ? 'border-blue-500 bg-blue-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Keywords</div>
        </button>

        <button
          onClick={() => setSelectedTier('easy')}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedTier === 'easy'
              ? 'border-green-500 bg-green-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-2xl font-bold text-green-600">{stats.easy}</div>
          <div className="text-sm text-gray-600">Easy Wins</div>
        </button>

        <button
          onClick={() => setSelectedTier('medium')}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedTier === 'medium'
              ? 'border-yellow-500 bg-yellow-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-2xl font-bold text-yellow-600">{stats.medium}</div>
          <div className="text-sm text-gray-600">Medium</div>
        </button>

        <button
          onClick={() => setSelectedTier('hard')}
          className={`p-4 rounded-lg border-2 transition-all ${
            selectedTier === 'hard'
              ? 'border-red-500 bg-red-50'
              : 'border-gray-200 hover:border-gray-300'
          }`}
        >
          <div className="text-2xl font-bold text-red-600">{stats.hard}</div>
          <div className="text-sm text-gray-600">Hard</div>
        </button>
      </div>

      {/* Search */}
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search keywords..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      {/* Bubble Chart */}
      <div className="bg-white p-6 rounded-lg border border-gray-200">
        <ResponsiveContainer width="100%" height={500}>
          <ScatterChart
            margin={{ top: 20, right: 20, bottom: 60, left: 60 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
            <XAxis
              type="number"
              dataKey="x"
              name="Search Volume"
              label={{
                value: 'Search Volume (monthly)',
                position: 'bottom',
                offset: 40,
                style: { fontSize: 14, fill: '#6b7280' },
              }}
              tick={{ fontSize: 12, fill: '#6b7280' }}
              tickFormatter={(value) =>
                value >= 1000 ? `${(value / 1000).toFixed(0)}k` : value.toString()
              }
            />
            <YAxis
              type="number"
              dataKey="y"
              name="Difficulty"
              label={{
                value: 'Keyword Difficulty',
                angle: -90,
                position: 'left',
                offset: 40,
                style: { fontSize: 14, fill: '#6b7280' },
              }}
              domain={[0, 100]}
              tick={{ fontSize: 12, fill: '#6b7280' }}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ strokeDasharray: '3 3' }} />
            <Legend
              wrapperStyle={{ paddingTop: 20 }}
              iconType="circle"
              formatter={(value) => (
                <span className="text-sm text-gray-700">{value}</span>
              )}
            />

            {/* Easy keywords (green) */}
            <Scatter
              name="Easy Wins"
              data={easyData}
              fill={TIER_COLORS.easy}
              onClick={(data) => {
                if (onKeywordClick) {
                  const opp = opportunities.find((o) => o.keyword === data.keyword);
                  if (opp) onKeywordClick(opp);
                }
              }}
              cursor="pointer"
            />

            {/* Medium keywords (orange) */}
            <Scatter
              name="Medium Difficulty"
              data={mediumData}
              fill={TIER_COLORS.medium}
              onClick={(data) => {
                if (onKeywordClick) {
                  const opp = opportunities.find((o) => o.keyword === data.keyword);
                  if (opp) onKeywordClick(opp);
                }
              }}
              cursor="pointer"
            />

            {/* Hard keywords (red) */}
            <Scatter
              name="High Difficulty"
              data={hardData}
              fill={TIER_COLORS.hard}
              onClick={(data) => {
                if (onKeywordClick) {
                  const opp = opportunities.find((o) => o.keyword === data.keyword);
                  if (opp) onKeywordClick(opp);
                }
              }}
              cursor="pointer"
            />
          </ScatterChart>
        </ResponsiveContainer>

        {/* Legend Info */}
        <div className="mt-4 p-4 bg-blue-50 rounded-lg border border-blue-200">
          <div className="flex items-start gap-2">
            <div className="mt-0.5">
              <svg className="w-5 h-5 text-blue-600" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
            <div className="text-sm text-blue-900">
              <strong>How to read this chart:</strong> Keywords in the bottom-left are
              ideal targets (high volume, low difficulty). Bubble size indicates
              opportunity score. Click any bubble to see details.
            </div>
          </div>
        </div>
      </div>

      {/* Top Opportunities Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="px-6 py-4 border-b border-gray-200">
          <h4 className="font-semibold text-gray-900">Top 10 Opportunities</h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Keyword
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Difficulty
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Opportunity
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">
                  Tier
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {opportunities
                .sort((a, b) => b.opportunityScore - a.opportunityScore)
                .slice(0, 10)
                .map((opp) => (
                  <tr key={opp.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 text-sm text-gray-900">{opp.keyword}</td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {opp.searchVolume.toLocaleString()}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900">
                      {opp.difficulty.toFixed(1)}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <div className="w-24 bg-gray-200 rounded-full h-2">
                          <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${opp.opportunityScore * 100}%` }}
                          />
                        </div>
                        <span className="text-sm text-gray-900">
                          {opp.opportunityScore.toFixed(2)}
                        </span>
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-2 py-1 text-xs font-medium rounded-full ${
                          opp.difficultyTier === 'easy'
                            ? 'bg-green-100 text-green-800'
                            : opp.difficultyTier === 'medium'
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}
                      >
                        {TIER_LABELS[opp.difficultyTier]}
                      </span>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
