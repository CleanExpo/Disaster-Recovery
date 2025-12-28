'use client';

/**
 * Ranking Tracker Component
 *
 * Tracks keyword rankings over time with sparklines
 * - Current position, previous position, change
 * - Sparkline charts (last 30 days)
 * - Filter by service category
 */

import { useState } from 'react';
import { KeywordData } from '@/lib/competitor-analysis/types/dashboard-types';
import {
  LineChart,
  Line,
  ResponsiveContainer,
  Tooltip,
} from 'recharts';
import { TrendingUp, TrendingDown, Minus, Filter, ArrowUp, ArrowDown } from 'lucide-react';

interface RankingTrackerProps {
  keywords: KeywordData[];
  onKeywordClick?: (keyword: KeywordData) => void;
}

interface RankingChange {
  keyword: KeywordData;
  change: number;
  changePercent: number;
}

// Mock historical data generator (in production, this would come from the database)
function generateHistoricalData(currentPosition: number, previousPosition: number | null) {
  const data: { position: number }[] = [];
  const days = 30;

  if (previousPosition === null) {
    // If no previous position, show stable data
    for (let i = 0; i < days; i++) {
      data.push({ position: currentPosition + (Math.random() - 0.5) * 2 });
    }
  } else {
    // Generate trend from previous to current
    const diff = currentPosition - previousPosition;
    const step = diff / days;

    for (let i = 0; i < days; i++) {
      const position = previousPosition + step * i + (Math.random() - 0.5) * 2;
      data.push({ position: Math.max(1, Math.min(100, position)) });
    }
  }

  return data;
}

function Sparkline({ data }: { data: { position: number }[] }) {
  // Invert data (lower position = better rank)
  const color =
    data[data.length - 1].position < data[0].position
      ? '#10b981' // Green (improved)
      : data[data.length - 1].position > data[0].position
      ? '#ef4444' // Red (declined)
      : '#6b7280'; // Gray (stable)

  return (
    <ResponsiveContainer width={100} height={30}>
      <LineChart data={data}>
        <Line
          type="monotone"
          dataKey="position"
          stroke={color}
          strokeWidth={2}
          dot={false}
          isAnimationActive={false}
        />
        <Tooltip
          content={({ payload }) => {
            if (payload && payload.length > 0) {
              const pos = payload[0].value as number;
              return (
                <div className="bg-gray-900 text-white text-xs px-2 py-1 rounded">
                  Position: {pos.toFixed(0)}
                </div>
              );
            }
            return null;
          }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}

function RankingChangeIndicator({ change }: { change: number }) {
  if (change === 0) {
    return (
      <div className="flex items-center gap-1 text-gray-500">
        <Minus className="w-4 h-4" />
        <span className="text-sm font-medium">0</span>
      </div>
    );
  }

  // Negative change = improved ranking (lower position number)
  const improved = change < 0;

  return (
    <div
      className={`flex items-center gap-1 ${
        improved ? 'text-green-600' : 'text-red-600'
      }`}
    >
      {improved ? (
        <ArrowUp className="w-4 h-4" />
      ) : (
        <ArrowDown className="w-4 h-4" />
      )}
      <span className="text-sm font-medium">{Math.abs(change)}</span>
    </div>
  );
}

export function RankingTracker({ keywords, onKeywordClick }: RankingTrackerProps) {
  const [categoryFilter, setCategoryFilter] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'position' | 'change' | 'volume'>('position');

  // Get unique categories
  const categories = Array.from(
    new Set(keywords.map((k) => k.category).filter((c) => c !== null))
  ) as string[];

  // Filter and sort keywords
  const filteredKeywords = keywords
    .filter((k) => {
      if (categoryFilter === 'all') return true;
      return k.category === categoryFilter;
    })
    .filter((k) => k.position !== null && k.position <= 20) // Top 20 only
    .map((k) => ({
      ...k,
      change: k.previousPosition
        ? k.position! - k.previousPosition
        : 0,
      historicalData: generateHistoricalData(k.position!, k.previousPosition),
    }))
    .sort((a, b) => {
      switch (sortBy) {
        case 'position':
          return (a.position || 100) - (b.position || 100);
        case 'change':
          return a.change - b.change; // Most improved first
        case 'volume':
          return (b.searchVolume || 0) - (a.searchVolume || 0);
        default:
          return 0;
      }
    });

  // Stats
  const stats = {
    total: filteredKeywords.length,
    improved: filteredKeywords.filter((k) => k.change < 0).length,
    declined: filteredKeywords.filter((k) => k.change > 0).length,
    stable: filteredKeywords.filter((k) => k.change === 0).length,
    topThree: filteredKeywords.filter((k) => k.position! <= 3).length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Ranking Tracker</h3>
          <p className="text-sm text-gray-600 mt-1">
            Top 20 keywords • {stats.total} tracked
          </p>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-4">
        <div className="bg-white p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-900">{stats.total}</div>
          <div className="text-sm text-gray-600">Total Tracked</div>
        </div>

        <div className="bg-green-50 p-4 rounded-lg border border-green-200">
          <div className="text-2xl font-bold text-green-600">{stats.improved}</div>
          <div className="text-sm text-gray-600">Improved</div>
        </div>

        <div className="bg-red-50 p-4 rounded-lg border border-red-200">
          <div className="text-2xl font-bold text-red-600">{stats.declined}</div>
          <div className="text-sm text-gray-600">Declined</div>
        </div>

        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <div className="text-2xl font-bold text-gray-600">{stats.stable}</div>
          <div className="text-sm text-gray-600">Stable</div>
        </div>

        <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
          <div className="text-2xl font-bold text-blue-600">{stats.topThree}</div>
          <div className="text-sm text-gray-600">Top 3</div>
        </div>
      </div>

      {/* Filters and Sort */}
      <div className="flex flex-wrap items-center gap-4">
        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={categoryFilter}
            onChange={(e) => setCategoryFilter(e.target.value)}
            className="px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="all">All Categories</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-sm text-gray-600">Sort by:</span>
          <div className="flex gap-2">
            <button
              onClick={() => setSortBy('position')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'position'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Position
            </button>
            <button
              onClick={() => setSortBy('change')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'change'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Change
            </button>
            <button
              onClick={() => setSortBy('volume')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                sortBy === 'volume'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              Volume
            </button>
          </div>
        </div>
      </div>

      {/* Table */}
      <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Rank
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Keyword
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Current
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Previous
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Change
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Volume
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Trend (30d)
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredKeywords.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                    No keywords found in top 20
                  </td>
                </tr>
              ) : (
                filteredKeywords.map((keyword, index) => (
                  <tr
                    key={keyword.id}
                    className="hover:bg-gray-50 transition-colors cursor-pointer"
                    onClick={() => onKeywordClick && onKeywordClick(keyword)}
                  >
                    <td className="px-6 py-4 whitespace-nowrap">
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${
                          keyword.position! <= 3
                            ? 'bg-yellow-100 text-yellow-800'
                            : keyword.position! <= 10
                            ? 'bg-blue-100 text-blue-800'
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {index + 1}
                      </div>
                    </td>
                    <td className="px-6 py-4">
                      <div className="font-medium text-gray-900">{keyword.keyword}</div>
                      {keyword.url && (
                        <div className="text-xs text-gray-500 truncate max-w-xs">
                          {keyword.url}
                        </div>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      {keyword.category && (
                        <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded-full">
                          {keyword.category}
                        </span>
                      )}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <span
                        className={`text-lg font-bold ${
                          keyword.position! <= 3
                            ? 'text-green-600'
                            : keyword.position! <= 10
                            ? 'text-blue-600'
                            : 'text-gray-900'
                        }`}
                      >
                        #{keyword.position}
                      </span>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                      {keyword.previousPosition ? `#${keyword.previousPosition}` : '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <RankingChangeIndicator change={keyword.change} />
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-gray-900">
                      {keyword.searchVolume?.toLocaleString() || '-'}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Sparkline data={keyword.historicalData} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Info */}
      <div className="bg-blue-50 rounded-lg p-4 border border-blue-200">
        <div className="flex items-start gap-2">
          <div className="mt-0.5">
            <svg
              className="w-5 h-5 text-blue-600"
              fill="currentColor"
              viewBox="0 0 20 20"
            >
              <path
                fillRule="evenodd"
                d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <div className="text-sm text-blue-900">
            <strong>Note:</strong> Rankings are tracked daily. A lower position number
            indicates better ranking. Green arrows indicate improvement (moving up in
            rankings), red arrows indicate decline.
          </div>
        </div>
      </div>
    </div>
  );
}
