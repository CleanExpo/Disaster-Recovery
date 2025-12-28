'use client';

/**
 * Competitor Table Component
 *
 * Displays competitors with sorting, filtering, and actions
 */

import { useState, useMemo } from 'react';
import {
  CompetitorTableRow,
  CompetitorCategory,
  SortField,
  SortDirection,
  FilterConfig,
} from '@/lib/competitor-analysis/types/dashboard-types';
import { formatDistanceToNow } from 'date-fns';
import {
  ArrowUpDown,
  ArrowUp,
  ArrowDown,
  Search,
  Filter,
  RefreshCw,
  Eye,
  BarChart3,
} from 'lucide-react';

interface CompetitorTableProps {
  competitors: CompetitorTableRow[];
  onAnalyze: (competitorId: string) => void;
  onViewDetails: (competitorId: string) => void;
  onViewSWOT: (competitorId: string) => void;
  isLoading?: boolean;
}

const CATEGORY_COLORS: Record<CompetitorCategory, string> = {
  RESTORATION_COMPANY: 'bg-blue-100 text-blue-800',
  INSURANCE_NETWORK: 'bg-green-100 text-green-800',
  CONTRACTOR_MARKETPLACE: 'bg-purple-100 text-purple-800',
  INDUSTRY_ASSOCIATION: 'bg-orange-100 text-orange-800',
};

const CATEGORY_LABELS: Record<CompetitorCategory, string> = {
  RESTORATION_COMPANY: 'Restoration',
  INSURANCE_NETWORK: 'Insurance',
  CONTRACTOR_MARKETPLACE: 'Marketplace',
  INDUSTRY_ASSOCIATION: 'Association',
};

export function CompetitorTable({
  competitors,
  onAnalyze,
  onViewDetails,
  onViewSWOT,
  isLoading = false,
}: CompetitorTableProps) {
  const [sortField, setSortField] = useState<SortField>('priority');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [filters, setFilters] = useState<FilterConfig>({
    activeOnly: true,
    searchTerm: '',
  });
  const [showFilters, setShowFilters] = useState(false);

  // Sort and filter competitors
  const filteredCompetitors = useMemo(() => {
    let result = [...competitors];

    // Apply filters
    if (filters.activeOnly) {
      result = result.filter((c) => c.isActive);
    }
    if (filters.category) {
      result = result.filter((c) => c.category === filters.category);
    }
    if (filters.minPriority) {
      result = result.filter((c) => c.priority >= filters.minPriority);
    }
    if (filters.maxPriority) {
      result = result.filter((c) => c.priority <= filters.maxPriority);
    }
    if (filters.searchTerm) {
      const term = filters.searchTerm.toLowerCase();
      result = result.filter(
        (c) =>
          c.name.toLowerCase().includes(term) ||
          c.domain.toLowerCase().includes(term)
      );
    }

    // Apply sorting
    result.sort((a, b) => {
      let aValue: any = a[sortField];
      let bValue: any = b[sortField];

      // Handle null/undefined
      if (aValue === null || aValue === undefined) return 1;
      if (bValue === null || bValue === undefined) return -1;

      // Handle dates
      if (aValue instanceof Date) {
        aValue = aValue.getTime();
        bValue = bValue instanceof Date ? bValue.getTime() : 0;
      }

      // Handle strings
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = typeof bValue === 'string' ? bValue.toLowerCase() : '';
      }

      const comparison = aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      return sortDirection === 'asc' ? comparison : -comparison;
    });

    return result;
  }, [competitors, filters, sortField, sortDirection]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };

  const SortIcon = ({ field }: { field: SortField }) => {
    if (sortField !== field) {
      return <ArrowUpDown className="w-4 h-4 opacity-40" />;
    }
    return sortDirection === 'asc' ? (
      <ArrowUp className="w-4 h-4" />
    ) : (
      <ArrowDown className="w-4 h-4" />
    );
  };

  return (
    <div className="space-y-4">
      {/* Search and Filters */}
      <div className="flex items-center gap-4">
        <div className="flex-1 relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search competitors..."
            value={filters.searchTerm}
            onChange={(e) =>
              setFilters({ ...filters, searchTerm: e.target.value })
            }
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50 flex items-center gap-2"
        >
          <Filter className="w-5 h-5" />
          Filters
        </button>
      </div>

      {/* Filter Panel */}
      {showFilters && (
        <div className="p-4 bg-gray-50 rounded-lg border border-gray-200 grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Category
            </label>
            <select
              value={filters.category || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  category: e.target.value as CompetitorCategory | undefined,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All Categories</option>
              {Object.entries(CATEGORY_LABELS).map(([value, label]) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Min Priority
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={filters.minPriority || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  minPriority: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Max Priority
            </label>
            <input
              type="number"
              min="1"
              max="10"
              value={filters.maxPriority || ''}
              onChange={(e) =>
                setFilters({
                  ...filters,
                  maxPriority: e.target.value ? parseInt(e.target.value) : undefined,
                })
              }
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <div className="flex items-end">
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                checked={filters.activeOnly}
                onChange={(e) =>
                  setFilters({ ...filters, activeOnly: e.target.checked })
                }
                className="w-4 h-4 text-blue-600 rounded focus:ring-2 focus:ring-blue-500"
              />
              <span className="text-sm font-medium text-gray-700">
                Active Only
              </span>
            </label>
          </div>
        </div>
      )}

      {/* Results Count */}
      <div className="text-sm text-gray-600">
        Showing {filteredCompetitors.length} of {competitors.length} competitors
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-gray-200 rounded-lg">
        <table className="w-full">
          <thead className="bg-gray-50 border-b border-gray-200">
            <tr>
              <th
                onClick={() => handleSort('name')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Competitor
                  <SortIcon field="name" />
                </div>
              </th>
              <th
                onClick={() => handleSort('category')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Category
                  <SortIcon field="category" />
                </div>
              </th>
              <th
                onClick={() => handleSort('priority')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Priority
                  <SortIcon field="priority" />
                </div>
              </th>
              <th
                onClick={() => handleSort('lastAnalyzed')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Last Analyzed
                  <SortIcon field="lastAnalyzed" />
                </div>
              </th>
              <th
                onClick={() => handleSort('traffic')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Traffic
                  <SortIcon field="traffic" />
                </div>
              </th>
              <th
                onClick={() => handleSort('keywords')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  Keywords
                  <SortIcon field="keywords" />
                </div>
              </th>
              <th
                onClick={() => handleSort('domainRating')}
                className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
              >
                <div className="flex items-center gap-2">
                  DR
                  <SortIcon field="domainRating" />
                </div>
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {isLoading ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                  <div className="flex items-center justify-center gap-2">
                    <RefreshCw className="w-5 h-5 animate-spin" />
                    Loading competitors...
                  </div>
                </td>
              </tr>
            ) : filteredCompetitors.length === 0 ? (
              <tr>
                <td colSpan={8} className="px-6 py-12 text-center text-gray-500">
                  No competitors found
                </td>
              </tr>
            ) : (
              filteredCompetitors.map((competitor) => (
                <tr
                  key={competitor.id}
                  className="hover:bg-gray-50 transition-colors"
                >
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div>
                      <div className="font-medium text-gray-900">
                        {competitor.name}
                      </div>
                      <div className="text-sm text-gray-500">
                        {competitor.domain}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`px-2 py-1 text-xs font-medium rounded-full ${
                        CATEGORY_COLORS[competitor.category]
                      }`}
                    >
                      {CATEGORY_LABELS[competitor.category]}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center gap-2">
                      <div
                        className={`w-2 h-2 rounded-full ${
                          competitor.priority >= 8
                            ? 'bg-red-500'
                            : competitor.priority >= 5
                            ? 'bg-yellow-500'
                            : 'bg-green-500'
                        }`}
                      />
                      <span className="text-sm text-gray-900">
                        {competitor.priority}/10
                      </span>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {competitor.lastAnalyzed
                      ? formatDistanceToNow(competitor.lastAnalyzed, {
                          addSuffix: true,
                        })
                      : 'Never'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {competitor.traffic > 0
                      ? competitor.traffic.toLocaleString()
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                    {competitor.keywords > 0
                      ? competitor.keywords.toLocaleString()
                      : '-'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span
                      className={`text-sm font-medium ${
                        competitor.domainRating >= 70
                          ? 'text-green-600'
                          : competitor.domainRating >= 40
                          ? 'text-yellow-600'
                          : 'text-red-600'
                      }`}
                    >
                      {competitor.domainRating > 0 ? competitor.domainRating : '-'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <div className="flex items-center justify-end gap-2">
                      <button
                        onClick={() => onAnalyze(competitor.id)}
                        className="p-1 text-blue-600 hover:text-blue-800 hover:bg-blue-50 rounded"
                        title="Analyze"
                      >
                        <RefreshCw className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onViewDetails(competitor.id)}
                        className="p-1 text-gray-600 hover:text-gray-800 hover:bg-gray-100 rounded"
                        title="View Details"
                      >
                        <Eye className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => onViewSWOT(competitor.id)}
                        className="p-1 text-purple-600 hover:text-purple-800 hover:bg-purple-50 rounded"
                        title="View SWOT"
                      >
                        <BarChart3 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
