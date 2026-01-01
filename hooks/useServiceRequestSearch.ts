'use client';

import { useState, useCallback, useEffect, useRef, useMemo } from 'react';

/**
 * Service request result from the search API
 */
export interface ServiceRequestResult {
  id: string;
  serviceTitle: string;
  description: string;
  serviceCategory: string;
  status: 'PENDING' | 'MATCHED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  location: string;
  urgency: 'LOW' | 'MEDIUM' | 'HIGH' | 'EMERGENCY';
  budget?: string;
  createdAt: string;
  updatedAt: string;
  user?: {
    id: string;
    name: string;
    email: string;
  };
  matches?: Array<{
    id: string;
    matchScore: number;
    status: string;
  }>;
}

/**
 * Search filters for service requests
 */
export interface ServiceRequestSearchFilters {
  /** Filter by service category (exact match) */
  serviceCategory?: string;
  /** Filter by status (exact match) */
  status?: 'PENDING' | 'MATCHED' | 'IN_PROGRESS' | 'COMPLETED' | 'CANCELLED';
  /** Filter by location (text match) */
  location?: string;
  /** Filter by date range - start date (ISO 8601 format) */
  createdAfter?: string;
  /** Filter by date range - end date (ISO 8601 format) */
  createdBefore?: string;
}

/**
 * Pagination options for search
 */
export interface ServiceRequestPagination {
  /** Maximum number of results to return (1-100, default: 20) */
  limit: number;
  /** Number of results to skip (default: 0) */
  offset: number;
  /** Whether there are more results */
  hasMore: boolean;
}

/**
 * Complete search state
 */
export interface ServiceRequestSearchState {
  /** Current search query text */
  query: string;
  /** Active search filters */
  filters: ServiceRequestSearchFilters;
  /** Search results */
  results: ServiceRequestResult[];
  /** Total count of matching results */
  total: number;
  /** Pagination info */
  pagination: ServiceRequestPagination;
  /** Loading state */
  isLoading: boolean;
  /** Error message if any */
  error: string | null;
  /** Whether user sees all requests or just their own */
  userScope: 'all' | 'own';
}

/**
 * Cache entry for recent searches
 */
interface CacheEntry {
  results: ServiceRequestResult[];
  total: number;
  pagination: ServiceRequestPagination;
  userScope: 'all' | 'own';
  timestamp: number;
}

const DEBOUNCE_MS = 300;
const CACHE_TTL_MS = 60000; // 1 minute cache TTL
const MAX_CACHE_SIZE = 20;

/**
 * Generate a cache key from search parameters
 */
function generateCacheKey(
  query: string,
  filters: ServiceRequestSearchFilters,
  limit: number,
  offset: number
): string {
  return JSON.stringify({ query, filters, limit, offset });
}

/**
 * useServiceRequestSearch Hook
 *
 * Custom hook for searching service requests with debounced query handling.
 * Follows the pattern from useSearch hook with additional filter support.
 *
 * Features:
 * - Debounced search query (300ms delay)
 * - Manages search state (query, filters, results, loading, error)
 * - Calls /api/service-requests/search endpoint
 * - Supports filter updates without re-triggering debounce
 * - Handles pagination state
 * - Caches recent searches
 */
export function useServiceRequestSearch(
  initialFilters: ServiceRequestSearchFilters = {},
  initialLimit: number = 20
) {
  // Search state
  const [query, setQueryState] = useState('');
  const [filters, setFilters] = useState<ServiceRequestSearchFilters>(initialFilters);
  const [results, setResults] = useState<ServiceRequestResult[]>([]);
  const [total, setTotal] = useState(0);
  const [pagination, setPagination] = useState<ServiceRequestPagination>({
    limit: initialLimit,
    offset: 0,
    hasMore: false,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [userScope, setUserScope] = useState<'all' | 'own'>('own');

  // Refs for debouncing and caching
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const abortControllerRef = useRef<AbortController | null>(null);
  const cacheRef = useRef<Map<string, CacheEntry>>(new Map());
  const lastSearchRef = useRef<{ query: string; filters: ServiceRequestSearchFilters } | null>(null);

  /**
   * Clean expired cache entries
   */
  const cleanCache = useCallback(() => {
    const now = Date.now();
    const cache = cacheRef.current;

    // Remove expired entries
    const entries = Array.from(cache.entries());
    for (const [key, entry] of entries) {
      if (now - entry.timestamp > CACHE_TTL_MS) {
        cache.delete(key);
      }
    }

    // If still too large, remove oldest entries
    if (cache.size > MAX_CACHE_SIZE) {
      const sortedEntries = Array.from(cache.entries());
      sortedEntries.sort((a, b) => a[1].timestamp - b[1].timestamp);
      const toRemove = sortedEntries.slice(0, sortedEntries.length - MAX_CACHE_SIZE);
      for (const [key] of toRemove) {
        cache.delete(key);
      }
    }
  }, []);

  /**
   * Get cached result if available and not expired
   */
  const getCachedResult = useCallback(
    (cacheKey: string): CacheEntry | null => {
      cleanCache();
      const entry = cacheRef.current.get(cacheKey);
      if (entry && Date.now() - entry.timestamp < CACHE_TTL_MS) {
        return entry;
      }
      return null;
    },
    [cleanCache]
  );

  /**
   * Store result in cache
   */
  const setCacheResult = useCallback(
    (cacheKey: string, entry: Omit<CacheEntry, 'timestamp'>) => {
      cleanCache();
      cacheRef.current.set(cacheKey, { ...entry, timestamp: Date.now() });
    },
    [cleanCache]
  );

  /**
   * Execute the search API call
   */
  const executeSearch = useCallback(
    async (
      searchQuery: string,
      searchFilters: ServiceRequestSearchFilters,
      searchPagination: { limit: number; offset: number }
    ) => {
      // Generate cache key
      const cacheKey = generateCacheKey(
        searchQuery,
        searchFilters,
        searchPagination.limit,
        searchPagination.offset
      );

      // Check cache first
      const cached = getCachedResult(cacheKey);
      if (cached) {
        setResults(cached.results);
        setTotal(cached.total);
        setPagination(cached.pagination);
        setUserScope(cached.userScope);
        setIsLoading(false);
        setError(null);
        return;
      }

      // Abort previous request if still pending
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
      abortControllerRef.current = new AbortController();

      setIsLoading(true);
      setError(null);

      try {
        // Build query params
        const params = new URLSearchParams();

        if (searchQuery.trim()) {
          params.set('q', searchQuery.trim());
        }
        if (searchFilters.serviceCategory) {
          params.set('category', searchFilters.serviceCategory);
        }
        if (searchFilters.status) {
          params.set('status', searchFilters.status);
        }
        if (searchFilters.location) {
          params.set('location', searchFilters.location);
        }
        if (searchFilters.createdAfter) {
          params.set('createdAfter', searchFilters.createdAfter);
        }
        if (searchFilters.createdBefore) {
          params.set('createdBefore', searchFilters.createdBefore);
        }
        params.set('limit', String(searchPagination.limit));
        params.set('offset', String(searchPagination.offset));

        const response = await fetch(`/api/service-requests/search?${params.toString()}`, {
          method: 'GET',
          signal: abortControllerRef.current.signal,
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw new Error(errorData.error || `Search failed with status ${response.status}`);
        }

        const data = await response.json();

        if (!data.success) {
          throw new Error(data.error || 'Search failed');
        }

        const newPagination: ServiceRequestPagination = {
          limit: data.pagination?.limit ?? searchPagination.limit,
          offset: data.pagination?.offset ?? searchPagination.offset,
          hasMore: data.pagination?.hasMore ?? false,
        };

        // Update state
        setResults(data.data || []);
        setTotal(data.total || 0);
        setPagination(newPagination);
        setUserScope(data.userScope || 'own');
        setError(null);

        // Cache result
        setCacheResult(cacheKey, {
          results: data.data || [],
          total: data.total || 0,
          pagination: newPagination,
          userScope: data.userScope || 'own',
        });
      } catch (err) {
        // Ignore abort errors
        if (err instanceof Error && err.name === 'AbortError') {
          return;
        }
        setError(err instanceof Error ? err.message : 'Search failed');
        setResults([]);
        setTotal(0);
      } finally {
        setIsLoading(false);
      }
    },
    [getCachedResult, setCacheResult]
  );

  /**
   * Debounced search - only debounces query changes, not filter changes
   */
  const debouncedSearch = useCallback(
    (searchQuery: string, searchFilters: ServiceRequestSearchFilters, immediate = false) => {
      // Clear existing timeout
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      // Reset pagination when search criteria changes
      const newPagination = { limit: pagination.limit, offset: 0 };

      if (immediate) {
        // Execute immediately (for filter changes)
        executeSearch(searchQuery, searchFilters, newPagination);
      } else {
        // Debounce (for query changes)
        searchTimeoutRef.current = setTimeout(() => {
          executeSearch(searchQuery, searchFilters, newPagination);
        }, DEBOUNCE_MS);
      }

      // Store last search params
      lastSearchRef.current = { query: searchQuery, filters: searchFilters };
    },
    [executeSearch, pagination.limit]
  );

  /**
   * Set the search query with debouncing
   */
  const setQuery = useCallback(
    (newQuery: string) => {
      setQueryState(newQuery);

      // Clear results immediately if query is empty and no filters
      if (!newQuery.trim() && Object.values(filters).every(v => !v)) {
        setResults([]);
        setTotal(0);
        setPagination(prev => ({ ...prev, offset: 0, hasMore: false }));
        setError(null);
        return;
      }

      debouncedSearch(newQuery, filters, false);
    },
    [filters, debouncedSearch]
  );

  /**
   * Update filters and trigger immediate search
   */
  const updateFilters = useCallback(
    (newFilters: Partial<ServiceRequestSearchFilters>) => {
      const updatedFilters = { ...filters, ...newFilters };
      setFilters(updatedFilters);

      // Immediate search for filter changes (no debounce)
      debouncedSearch(query, updatedFilters, true);
    },
    [query, filters, debouncedSearch]
  );

  /**
   * Clear a specific filter
   */
  const clearFilter = useCallback(
    (filterKey: keyof ServiceRequestSearchFilters) => {
      const updatedFilters = { ...filters };
      delete updatedFilters[filterKey];
      setFilters(updatedFilters);

      // Immediate search for filter changes
      debouncedSearch(query, updatedFilters, true);
    },
    [query, filters, debouncedSearch]
  );

  /**
   * Clear all filters and query
   */
  const clearAll = useCallback(() => {
    setQueryState('');
    setFilters({});
    setResults([]);
    setTotal(0);
    setPagination(prev => ({ ...prev, offset: 0, hasMore: false }));
    setError(null);

    // Clear the timeout and last search
    if (searchTimeoutRef.current) {
      clearTimeout(searchTimeoutRef.current);
    }
    lastSearchRef.current = null;
  }, []);

  /**
   * Load more results (pagination)
   */
  const loadMore = useCallback(() => {
    if (!pagination.hasMore || isLoading) {
      return;
    }

    const newOffset = pagination.offset + pagination.limit;
    executeSearch(query, filters, { limit: pagination.limit, offset: newOffset });
  }, [query, filters, pagination, isLoading, executeSearch]);

  /**
   * Go to a specific page
   */
  const goToPage = useCallback(
    (page: number) => {
      if (page < 1) {
        return;
      }

      const newOffset = (page - 1) * pagination.limit;
      if (newOffset >= total && page !== 1) {
        return;
      }

      executeSearch(query, filters, { limit: pagination.limit, offset: newOffset });
    },
    [query, filters, pagination.limit, total, executeSearch]
  );

  /**
   * Refresh current search
   */
  const refresh = useCallback(() => {
    if (lastSearchRef.current) {
      executeSearch(
        lastSearchRef.current.query,
        lastSearchRef.current.filters,
        { limit: pagination.limit, offset: pagination.offset }
      );
    }
  }, [executeSearch, pagination.limit, pagination.offset]);

  /**
   * Clear cache
   */
  const clearCache = useCallback(() => {
    cacheRef.current.clear();
  }, []);

  /**
   * Compute current page from pagination
   */
  const currentPage = useMemo(() => {
    return Math.floor(pagination.offset / pagination.limit) + 1;
  }, [pagination.offset, pagination.limit]);

  /**
   * Compute total pages
   */
  const totalPages = useMemo(() => {
    return Math.ceil(total / pagination.limit);
  }, [total, pagination.limit]);

  /**
   * Check if any filters are active
   */
  const hasActiveFilters = useMemo(() => {
    return Object.values(filters).some(v => v !== undefined && v !== '');
  }, [filters]);

  /**
   * Check if search is active (has query or filters)
   */
  const isSearchActive = useMemo(() => {
    return query.trim() !== '' || hasActiveFilters;
  }, [query, hasActiveFilters]);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
      }
    };
  }, []);

  return {
    // State
    query,
    filters,
    results,
    total,
    pagination,
    isLoading,
    error,
    userScope,

    // Computed values
    currentPage,
    totalPages,
    hasActiveFilters,
    isSearchActive,

    // Actions
    setQuery,
    updateFilters,
    clearFilter,
    clearAll,
    loadMore,
    goToPage,
    refresh,
    clearCache,
  };
}
