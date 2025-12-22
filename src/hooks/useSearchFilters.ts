'use client';

import { useState, useCallback, useEffect } from 'react';

export interface FilterOption {
  value: string | number;
  label: string;
  count: number;
}

export interface SearchFilters {
  users?: string[];
  rooms?: string[];
  dateRange?: {
    from: Date;
    to: Date;
  };
}

export interface FacetResults {
  users: FilterOption[];
  rooms: FilterOption[];
  dates: FilterOption[];
  tags: FilterOption[];
}

/**
 * useSearchFilters Hook
 *
 * Manage search filters and faceted navigation
 */
export function useSearchFilters() {
  const [filters, setFilters] = useState<SearchFilters>({});
  const [facets, setFacets] = useState<FacetResults>({
    users: [],
    rooms: [],
    dates: [],
    tags: [],
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filterOptions, setFilterOptions] = useState<{
    users: FilterOption[];
    rooms: FilterOption[];
    dateRangeOptions: FilterOption[];
  }>({
    users: [],
    rooms: [],
    dateRangeOptions: [],
  });

  // Load available filter options
  const loadFilterOptions = useCallback(async () => {
    try {
      const response = await fetch('/api/search/filters?type=all');

      if (response.ok) {
        const data = await response.json();
        setFilterOptions({
          users: data.users || [],
          rooms: data.rooms || [],
          dateRangeOptions: data.dateRangeOptions || [],
        });
      }
    } catch (err) {
      console.error('Failed to load filter options:', err);
    }
  }, []);

  // Load facets for current search
  const loadFacets = useCallback(async (query: string) => {
    if (!query.trim()) return;

    setIsLoading(true);

    try {
      const response = await fetch('/api/search/filters', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          query,
          currentFilters: filters,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setFacets(data.facets || {
          users: [],
          rooms: [],
          dates: [],
          tags: [],
        });
      }
    } catch (err) {
      console.error('Failed to load facets:', err);
    } finally {
      setIsLoading(false);
    }
  }, [filters]);

  // Toggle user filter
  const toggleUserFilter = useCallback((userId: string) => {
    setFilters((prev) => {
      const users = prev.users || [];
      if (users.includes(userId)) {
        return {
          ...prev,
          users: users.filter((u) => u !== userId),
        };
      } else {
        return {
          ...prev,
          users: [...users, userId],
        };
      }
    });
  }, []);

  // Toggle room filter
  const toggleRoomFilter = useCallback((roomId: string) => {
    setFilters((prev) => {
      const rooms = prev.rooms || [];
      if (rooms.includes(roomId)) {
        return {
          ...prev,
          rooms: rooms.filter((r) => r !== roomId),
        };
      } else {
        return {
          ...prev,
          rooms: [...rooms, roomId],
        };
      }
    });
  }, []);

  // Set date range
  const setDateRange = useCallback((from: Date, to: Date) => {
    setFilters((prev) => ({
      ...prev,
      dateRange: { from, to },
    }));
  }, []);

  // Clear date range
  const clearDateRange = useCallback(() => {
    setFilters((prev) => {
      const { dateRange, ...rest } = prev;
      return rest;
    });
  }, []);

  // Clear all filters
  const clearAllFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Check if filter is active
  const isFilterActive = useCallback((type: string, value: string): boolean => {
    switch (type) {
      case 'user':
        return (filters.users || []).includes(value);
      case 'room':
        return (filters.rooms || []).includes(value);
      default:
        return false;
    }
  }, [filters]);

  // Get active filter count
  const getActiveFilterCount = useCallback((): number => {
    let count = 0;
    if (filters.users?.length) count += filters.users.length;
    if (filters.rooms?.length) count += filters.rooms.length;
    if (filters.dateRange) count += 1;
    return count;
  }, [filters]);

  // Load filter options on mount
  useEffect(() => {
    loadFilterOptions();
  }, [loadFilterOptions]);

  return {
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
  };
}
