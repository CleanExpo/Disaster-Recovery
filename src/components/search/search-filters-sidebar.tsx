'use client';

import { useState } from 'react';
import { useSearchFilters } from '@/hooks/useSearchFilters';

/**
 * SearchFiltersSidebar Component
 *
 * Display faceted search filters and filtering options
 */
export function SearchFiltersSidebar() {
  const {
    filters,
    facets,
    filterOptions,
    isLoading,
    loadFacets,
    toggleUserFilter,
    toggleRoomFilter,
    setDateRange,
    clearDateRange,
    clearAllFilters,
    isFilterActive,
    getActiveFilterCount,
  } = useSearchFilters();

  const [expandedSections, setExpandedSections] = useState<Set<string>>(new Set(['users', 'rooms', 'dates']));

  const toggleSection = (section: string) => {
    const newExpanded = new Set(expandedSections);
    if (newExpanded.has(section)) {
      newExpanded.delete(section);
    } else {
      newExpanded.add(section);
    }
    setExpandedSections(newExpanded);
  };

  const activeFilterCount = getActiveFilterCount();

  return (
    <div className="w-64 bg-white border-r border-gray-200 p-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
        {activeFilterCount > 0 && (
          <div className="flex items-center gap-2">
            <span className="bg-blue-600 text-white text-xs font-semibold px-2 py-1 rounded-full">
              {activeFilterCount}
            </span>
            <button
              onClick={clearAllFilters}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Users Filter */}
      <FilterSection
        title="Users"
        isExpanded={expandedSections.has('users')}
        onToggle={() => toggleSection('users')}
        itemCount={facets.users.length}
        isLoading={isLoading}
      >
        <div className="space-y-2">
          {facets.users.length > 0 ? (
            facets.users.map((user) => (
              <label key={user.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFilterActive('user', String(user.value))}
                  onChange={() => toggleUserFilter(String(user.value))}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">{user.label}</span>
                <span className="text-xs text-gray-500">({user.count})</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No users found</p>
          )}
        </div>
      </FilterSection>

      {/* Rooms Filter */}
      <FilterSection
        title="Rooms"
        isExpanded={expandedSections.has('rooms')}
        onToggle={() => toggleSection('rooms')}
        itemCount={facets.rooms.length}
        isLoading={isLoading}
      >
        <div className="space-y-2">
          {facets.rooms.length > 0 ? (
            facets.rooms.map((room) => (
              <label key={room.value} className="flex items-center gap-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={isFilterActive('room', String(room.value))}
                  onChange={() => toggleRoomFilter(String(room.value))}
                  className="rounded"
                />
                <span className="text-sm text-gray-700">{room.label}</span>
                <span className="text-xs text-gray-500">({room.count})</span>
              </label>
            ))
          ) : (
            <p className="text-sm text-gray-500">No rooms found</p>
          )}
        </div>
      </FilterSection>

      {/* Date Range Filter */}
      <FilterSection
        title="Date Range"
        isExpanded={expandedSections.has('dates')}
        onToggle={() => toggleSection('dates')}
        itemCount={0}
      >
        <div className="space-y-2">
          {filterOptions.dateRangeOptions.map((option) => (
            <label key={option.value} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="dateRange"
                onChange={() => {
                  // Parse date range
                  // This would be implemented based on date range values
                }}
                className="rounded"
              />
              <span className="text-sm text-gray-700">{option.label}</span>
            </label>
          ))}

          {filters.dateRange && (
            <button
              onClick={clearDateRange}
              className="text-xs text-blue-600 hover:text-blue-700 font-medium"
            >
              Clear date range
            </button>
          )}
        </div>
      </FilterSection>
    </div>
  );
}

/**
 * Filter Section Component
 */
function FilterSection({
  title,
  isExpanded,
  onToggle,
  itemCount,
  isLoading,
  children,
}: {
  title: string;
  isExpanded: boolean;
  onToggle: () => void;
  itemCount: number;
  isLoading?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="mb-6 border-b border-gray-200 pb-4">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full mb-2 hover:bg-gray-50 rounded p-1"
      >
        <div className="flex items-center gap-2">
          <h3 className="font-medium text-gray-900">{title}</h3>
          {itemCount > 0 && (
            <span className="text-xs text-gray-500">({itemCount})</span>
          )}
        </div>
        <svg
          className={`w-5 h-5 text-gray-400 transition-transform ${isExpanded ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </button>

      {isExpanded && (
        <div className="mt-2">
          {isLoading ? (
            <div className="flex items-center justify-center py-4">
              <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-blue-600" />
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}
