'use client';

import { useState, useCallback, useEffect, useRef } from 'react';

export interface SearchResult {
  id: string;
  type: 'message' | 'user' | 'room';
  title: string;
  description?: string;
  preview?: string;
  relevance: number;
  highlights?: string[];
  metadata?: Record<string, any>;
}

export interface SearchOptions {
  query: string;
  type?: 'message' | 'user' | 'room' | 'all';
  limit?: number;
  offset?: number;
  filters?: {
    userId?: string;
    roomId?: string;
    dateFrom?: Date;
    dateTo?: Date;
  };
  sortBy?: 'relevance' | 'date' | 'popularity';
}

/**
 * useSearch Hook
 *
 * Manage full-text search with debouncing and suggestions
 */
export function useSearch() {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [suggestions, setSuggestions] = useState<Array<{ text: string; type: string }>>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSuggestions, setIsLoadingSuggestions] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const searchTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  const DEBOUNCE_MS = 300;

  // Search with debouncing
  const search = useCallback(
    async (options: SearchOptions) => {
      if (!options.query.trim()) {
        setResults([]);
        return;
      }

      setIsLoading(true);
      setError(null);

      try {
        const response = await fetch('/api/search', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(options),
        });

        if (!response.ok) {
          throw new Error('Search failed');
        }

        const data = await response.json();
        setResults(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Search error');
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  // Debounced search
  const debouncedSearch = useCallback(
    (options: SearchOptions) => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }

      searchTimeoutRef.current = setTimeout(() => {
        search(options);
      }, DEBOUNCE_MS);
    },
    [search]
  );

  // Get suggestions
  const getSuggestions = useCallback(async (q: string) => {
    if (!q.trim()) {
      setSuggestions([]);
      return;
    }

    setIsLoadingSuggestions(true);

    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(q)}&limit=5`);

      if (response.ok) {
        const data = await response.json();
        setSuggestions(data.suggestions || []);
      }
    } catch (err) {
      console.error('Failed to get suggestions:', err);
    } finally {
      setIsLoadingSuggestions(false);
    }
  }, []);

  // Clear results
  const clearResults = useCallback(() => {
    setResults([]);
    setQuery('');
    setSuggestions([]);
    setError(null);
  }, []);

  // Handle query change
  const handleQueryChange = useCallback(
    (newQuery: string) => {
      setQuery(newQuery);

      if (newQuery.trim()) {
        getSuggestions(newQuery);
        debouncedSearch({
          query: newQuery,
          type: 'all',
          limit: 20,
        });
      } else {
        setSuggestions([]);
        setResults([]);
      }
    },
    [getSuggestions, debouncedSearch]
  );

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (searchTimeoutRef.current) {
        clearTimeout(searchTimeoutRef.current);
      }
    };
  }, []);

  return {
    query,
    results,
    suggestions,
    isLoading,
    isLoadingSuggestions,
    error,
    search: debouncedSearch,
    handleQueryChange,
    clearResults,
    getSuggestions,
  };
}
