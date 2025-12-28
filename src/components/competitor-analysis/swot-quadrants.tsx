'use client';

/**
 * SWOT Quadrants Component
 *
 * Four-quadrant SWOT analysis visualization
 * - Strengths (top-left, green)
 * - Weaknesses (top-right, red)
 * - Opportunities (bottom-left, blue)
 * - Threats (bottom-right, orange)
 */

import { useState } from 'react';
import { SWOTData, SWOTItem } from '@/lib/competitor-analysis/types/dashboard-types';
import { ChevronDown, ChevronUp, TrendingUp, TrendingDown, Target, AlertTriangle } from 'lucide-react';

interface SWOTQuadrantsProps {
  swotData: SWOTData | null;
  competitorName: string;
  isLoading?: boolean;
}

interface QuadrantProps {
  title: string;
  items: SWOTItem[];
  color: 'green' | 'red' | 'blue' | 'orange';
  icon: React.ReactNode;
}

const IMPACT_COLORS = {
  high: 'bg-red-100 text-red-800',
  medium: 'bg-yellow-100 text-yellow-800',
  low: 'bg-green-100 text-green-800',
};

function Quadrant({ title, items, color, icon }: QuadrantProps) {
  const [isExpanded, setIsExpanded] = useState(true);

  const colorClasses = {
    green: {
      bg: 'bg-green-50',
      border: 'border-green-200',
      header: 'bg-green-100 text-green-900',
      icon: 'text-green-600',
    },
    red: {
      bg: 'bg-red-50',
      border: 'border-red-200',
      header: 'bg-red-100 text-red-900',
      icon: 'text-red-600',
    },
    blue: {
      bg: 'bg-blue-50',
      border: 'border-blue-200',
      header: 'bg-blue-100 text-blue-900',
      icon: 'text-blue-600',
    },
    orange: {
      bg: 'bg-orange-50',
      border: 'border-orange-200',
      header: 'bg-orange-100 text-orange-900',
      icon: 'text-orange-600',
    },
  };

  const classes = colorClasses[color];

  return (
    <div className={`${classes.bg} ${classes.border} border-2 rounded-lg overflow-hidden`}>
      {/* Header */}
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className={`w-full px-4 py-3 ${classes.header} flex items-center justify-between hover:opacity-90 transition-opacity`}
      >
        <div className="flex items-center gap-2">
          <div className={classes.icon}>{icon}</div>
          <h3 className="font-semibold">{title}</h3>
          <span className="ml-2 px-2 py-0.5 bg-white bg-opacity-50 rounded-full text-sm">
            {items.length}
          </span>
        </div>
        {isExpanded ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </button>

      {/* Content */}
      {isExpanded && (
        <div className="p-4 space-y-3">
          {items.length === 0 ? (
            <p className="text-sm text-gray-500 text-center py-4">No items found</p>
          ) : (
            items.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-lg p-3 border border-gray-200 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h4 className="font-medium text-gray-900 text-sm flex-1">
                    {item.title}
                  </h4>
                  <span
                    className={`px-2 py-0.5 text-xs font-medium rounded-full whitespace-nowrap ${
                      IMPACT_COLORS[item.impact]
                    }`}
                  >
                    {item.impact.toUpperCase()}
                  </span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed">
                  {item.description}
                </p>
                {item.category && (
                  <div className="mt-2 inline-block px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded">
                    {item.category}
                  </div>
                )}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export function SWOTQuadrants({ swotData, competitorName, isLoading }: SWOTQuadrantsProps) {
  const [showInsights, setShowInsights] = useState(true);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-96">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-600">Loading SWOT analysis...</p>
        </div>
      </div>
    );
  }

  if (!swotData) {
    return (
      <div className="flex items-center justify-center h-96 bg-gray-50 rounded-lg border-2 border-dashed border-gray-300">
        <div className="text-center">
          <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-gray-600 font-medium">No SWOT analysis available</p>
          <p className="text-sm text-gray-500 mt-1">
            Run an analysis to generate SWOT insights
          </p>
        </div>
      </div>
    );
  }

  // Calculate stats
  const stats = {
    totalItems:
      swotData.strengths.length +
      swotData.weaknesses.length +
      swotData.opportunities.length +
      swotData.threats.length,
    highImpact: [
      ...swotData.strengths,
      ...swotData.weaknesses,
      ...swotData.opportunities,
      ...swotData.threats,
    ].filter((item) => item.impact === 'high').length,
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            SWOT Analysis: {competitorName}
          </h3>
          <p className="text-sm text-gray-600 mt-1">
            {stats.totalItems} insights identified • {stats.highImpact} high impact
          </p>
        </div>
        <div className="text-sm text-gray-500">
          Generated {new Date(swotData.generatedAt).toLocaleDateString()}
        </div>
      </div>

      {/* Summary Card */}
      {swotData.summary && showInsights && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-lg p-6 border border-blue-200">
          <div className="flex items-start justify-between mb-3">
            <h4 className="font-semibold text-gray-900 flex items-center gap-2">
              <Target className="w-5 h-5 text-blue-600" />
              Executive Summary
            </h4>
            <button
              onClick={() => setShowInsights(false)}
              className="text-gray-400 hover:text-gray-600"
            >
              <ChevronUp className="w-5 h-5" />
            </button>
          </div>
          <p className="text-gray-700 leading-relaxed">{swotData.summary}</p>
        </div>
      )}

      {!showInsights && (
        <button
          onClick={() => setShowInsights(true)}
          className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
        >
          <ChevronDown className="w-4 h-4" />
          Show insights
        </button>
      )}

      {/* SWOT Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Strengths */}
        <Quadrant
          title="Strengths"
          items={swotData.strengths}
          color="green"
          icon={<TrendingUp className="w-5 h-5" />}
        />

        {/* Weaknesses */}
        <Quadrant
          title="Weaknesses"
          items={swotData.weaknesses}
          color="red"
          icon={<TrendingDown className="w-5 h-5" />}
        />

        {/* Opportunities */}
        <Quadrant
          title="Opportunities"
          items={swotData.opportunities}
          color="blue"
          icon={<Target className="w-5 h-5" />}
        />

        {/* Threats */}
        <Quadrant
          title="Threats"
          items={swotData.threats}
          color="orange"
          icon={<AlertTriangle className="w-5 h-5" />}
        />
      </div>

      {/* Recommendations */}
      {swotData.recommendations && swotData.recommendations.length > 0 && (
        <div className="bg-white rounded-lg border-2 border-purple-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-purple-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
              />
            </svg>
            Strategic Recommendations
          </h4>
          <ul className="space-y-2">
            {swotData.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-purple-600 flex-shrink-0" />
                <span className="text-gray-700">{rec}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Competitive Advantages */}
      {swotData.competitiveAdvantages && swotData.competitiveAdvantages.length > 0 && (
        <div className="bg-amber-50 rounded-lg border-2 border-amber-200 p-6">
          <h4 className="font-semibold text-gray-900 mb-4 flex items-center gap-2">
            <svg
              className="w-5 h-5 text-amber-600"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-5.714 2.143L13 21l-2.286-6.857L5 12l5.714-2.143L13 3z"
              />
            </svg>
            Competitive Advantages
          </h4>
          <ul className="space-y-2">
            {swotData.competitiveAdvantages.map((adv, index) => (
              <li key={index} className="flex items-start gap-3">
                <div className="mt-1.5 w-1.5 h-1.5 rounded-full bg-amber-600 flex-shrink-0" />
                <span className="text-gray-700">{adv}</span>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Impact Distribution */}
      <div className="bg-white rounded-lg border border-gray-200 p-6">
        <h4 className="font-semibold text-gray-900 mb-4">Impact Distribution</h4>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          {['high', 'medium', 'low'].map((impact) => {
            const count = [
              ...swotData.strengths,
              ...swotData.weaknesses,
              ...swotData.opportunities,
              ...swotData.threats,
            ].filter((item) => item.impact === impact).length;

            const percentage = stats.totalItems > 0 ? (count / stats.totalItems) * 100 : 0;

            return (
              <div key={impact} className="text-center">
                <div className="text-2xl font-bold text-gray-900 mb-1">{count}</div>
                <div className="text-sm text-gray-600 capitalize mb-2">{impact} Impact</div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className={`h-2 rounded-full ${
                      impact === 'high'
                        ? 'bg-red-500'
                        : impact === 'medium'
                        ? 'bg-yellow-500'
                        : 'bg-green-500'
                    }`}
                    style={{ width: `${percentage}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Metadata */}
      {swotData.generatedBy && (
        <div className="text-xs text-gray-500 text-center">
          Generated by {swotData.generatedBy} •{' '}
          {new Date(swotData.generatedAt).toLocaleString()}
        </div>
      )}
    </div>
  );
}
