'use client';

import { useRef, useCallback } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import {
  Search,
  X,
  Loader2,
  Filter,
  MapPin,
  Tag,
  Clock,
} from 'lucide-react';
import type { ServiceRequestSearchFilters } from '@/hooks/useServiceRequestSearch';

/**
 * Service status options matching Prisma ServiceStatus enum
 */
const SERVICE_STATUSES = [
  { value: 'PENDING', label: 'Pending' },
  { value: 'MATCHED', label: 'Matched' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'COMPLETED', label: 'Completed' },
  { value: 'CANCELLED', label: 'Cancelled' },
] as const;

/**
 * Service categories for disaster recovery services
 */
const SERVICE_CATEGORIES = [
  { value: 'WATER_DAMAGE', label: 'Water Damage' },
  { value: 'FIRE_DAMAGE', label: 'Fire Damage' },
  { value: 'SMOKE_DAMAGE', label: 'Smoke Damage' },
  { value: 'MOULD_REMEDIATION', label: 'Mould Remediation' },
  { value: 'ODOUR_REMEDIATION', label: 'Odour Remediation' },
  { value: 'CARPET_CLEANING', label: 'Carpet Cleaning' },
  { value: 'COMMERCIAL_WATER_DAMAGE', label: 'Commercial Water Damage' },
  { value: 'COMMERCIAL_FIRE_DAMAGE', label: 'Commercial Fire Damage' },
  { value: 'CRIME_SCENE_CLEANING', label: 'Crime Scene Cleaning' },
  { value: 'BIOHAZARD_REMEDIATION', label: 'Biohazard Remediation' },
  { value: 'HOARDING_CLEANUP', label: 'Hoarding Cleanup' },
  { value: 'VANDALISM_CLEANUP', label: 'Vandalism Cleanup' },
  { value: 'GENERAL_RESTORATION', label: 'General Restoration' },
] as const;

type ServiceStatus = typeof SERVICE_STATUSES[number]['value'];

export interface ServiceRequestSearchBarProps {
  /** Current search query */
  query: string;
  /** Callback when query changes */
  onQueryChange: (query: string) => void;
  /** Current active filters */
  filters: ServiceRequestSearchFilters;
  /** Callback to update filters */
  onFiltersChange: (filters: Partial<ServiceRequestSearchFilters>) => void;
  /** Callback to clear a specific filter */
  onClearFilter: (filterKey: keyof ServiceRequestSearchFilters) => void;
  /** Callback to clear all search criteria */
  onClearAll: () => void;
  /** Whether search is currently loading */
  isLoading?: boolean;
  /** Whether any search is active (has query or filters) */
  isSearchActive?: boolean;
  /** Whether any filters are active */
  hasActiveFilters?: boolean;
  /** Placeholder text for search input */
  placeholder?: string;
  /** Additional CSS class names */
  className?: string;
}

/**
 * ServiceRequestSearchBar Component
 *
 * A search bar component specifically for service requests with filter chips.
 * Follows the SearchBar pattern from src/components/search/search-bar.tsx
 * with additional filter support inspired by contractor-search-interface.tsx
 *
 * Features:
 * - Text input with search icon
 * - Clear button when query is present
 * - Filter chips for category, status, and location
 * - Dropdown filter selectors
 * - Loading state indicator
 * - Accessible with proper aria labels
 */
export function ServiceRequestSearchBar({
  query,
  onQueryChange,
  filters,
  onFiltersChange,
  onClearFilter,
  onClearAll,
  isLoading = false,
  isSearchActive = false,
  hasActiveFilters = false,
  placeholder = 'Search service requests...',
  className = '',
}: ServiceRequestSearchBarProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  /**
   * Handle search input change
   */
  const handleQueryChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      onQueryChange(e.target.value);
    },
    [onQueryChange]
  );

  /**
   * Handle clear search button click
   */
  const handleClearSearch = useCallback(() => {
    onQueryChange('');
    inputRef.current?.focus();
  }, [onQueryChange]);

  /**
   * Handle category filter change
   */
  const handleCategoryChange = useCallback(
    (value: string) => {
      if (value === '__clear__') {
        onClearFilter('serviceCategory');
      } else {
        onFiltersChange({ serviceCategory: value });
      }
    },
    [onFiltersChange, onClearFilter]
  );

  /**
   * Handle status filter change
   */
  const handleStatusChange = useCallback(
    (value: string) => {
      if (value === '__clear__') {
        onClearFilter('status');
      } else {
        onFiltersChange({ status: value as ServiceStatus });
      }
    },
    [onFiltersChange, onClearFilter]
  );

  /**
   * Handle location filter change
   */
  const handleLocationChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value.trim()) {
        onFiltersChange({ location: value });
      } else {
        onClearFilter('location');
      }
    },
    [onFiltersChange, onClearFilter]
  );

  /**
   * Get the display label for a category value
   */
  const getCategoryLabel = (value: string): string => {
    const category = SERVICE_CATEGORIES.find((c) => c.value === value);
    return category?.label || value;
  };

  /**
   * Get the display label for a status value
   */
  const getStatusLabel = (value: string): string => {
    const status = SERVICE_STATUSES.find((s) => s.value === value);
    return status?.label || value;
  };

  return (
    <div className={`space-y-3 ${className}`}>
      {/* Main Search Input */}
      <div className="flex items-center gap-2">
        <div className="relative flex-1">
          <div
            className="flex items-center gap-2 bg-background border border-input rounded-lg px-3 py-2 shadow-sm hover:shadow-md transition-shadow focus-within:ring-2 focus-within:ring-ring focus-within:ring-offset-1"
            role="search"
          >
            {/* Search Icon or Loading Spinner */}
            {isLoading ? (
              <Loader2
                className="w-5 h-5 text-muted-foreground animate-spin"
                aria-hidden="true"
              />
            ) : (
              <Search
                className="w-5 h-5 text-muted-foreground"
                aria-hidden="true"
              />
            )}

            {/* Search Input */}
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={handleQueryChange}
              placeholder={placeholder}
              className="flex-1 bg-transparent outline-none text-sm placeholder:text-muted-foreground"
              autoComplete="off"
              aria-label="Search service requests"
              aria-busy={isLoading}
            />

            {/* Clear Query Button */}
            {query && (
              <button
                type="button"
                onClick={handleClearSearch}
                className="text-muted-foreground hover:text-foreground transition-colors p-1 rounded-sm hover:bg-muted"
                aria-label="Clear search query"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Clear All Button */}
        {isSearchActive && (
          <Button
            variant="outline"
            size="sm"
            onClick={onClearAll}
            className="shrink-0"
            aria-label="Clear all search criteria"
          >
            <X className="w-4 h-4 mr-1" />
            Clear all
          </Button>
        )}
      </div>

      {/* Filter Row */}
      <div className="flex flex-wrap items-center gap-2">
        <div className="flex items-center gap-1 text-sm text-muted-foreground">
          <Filter className="w-4 h-4" aria-hidden="true" />
          <span>Filters:</span>
        </div>

        {/* Category Filter */}
        <Select
          value={filters.serviceCategory || ''}
          onValueChange={handleCategoryChange}
        >
          <SelectTrigger
            className="w-auto min-w-[140px] h-8 text-sm"
            aria-label="Filter by category"
          >
            <div className="flex items-center gap-1">
              <Tag className="w-3 h-3" aria-hidden="true" />
              <SelectValue placeholder="Category" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__clear__">All Categories</SelectItem>
            {SERVICE_CATEGORIES.map((category) => (
              <SelectItem key={category.value} value={category.value}>
                {category.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Status Filter */}
        <Select
          value={filters.status || ''}
          onValueChange={handleStatusChange}
        >
          <SelectTrigger
            className="w-auto min-w-[120px] h-8 text-sm"
            aria-label="Filter by status"
          >
            <div className="flex items-center gap-1">
              <Clock className="w-3 h-3" aria-hidden="true" />
              <SelectValue placeholder="Status" />
            </div>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="__clear__">All Statuses</SelectItem>
            {SERVICE_STATUSES.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Location Filter */}
        <div className="relative">
          <div className="flex items-center h-8 border border-input rounded-md px-2 gap-1 bg-background">
            <MapPin className="w-3 h-3 text-muted-foreground" aria-hidden="true" />
            <Input
              type="text"
              value={filters.location || ''}
              onChange={handleLocationChange}
              placeholder="Location"
              className="border-0 h-6 p-0 text-sm w-[100px] focus-visible:ring-0 focus-visible:ring-offset-0"
              aria-label="Filter by location"
            />
            {filters.location && (
              <button
                type="button"
                onClick={() => onClearFilter('location')}
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label="Clear location filter"
              >
                <X className="w-3 h-3" />
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Active Filter Chips */}
      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2" role="region" aria-label="Active filters">
          <span className="text-xs text-muted-foreground">Active filters:</span>

          {filters.serviceCategory && (
            <Badge
              variant="secondary"
              className="gap-1 cursor-pointer hover:bg-secondary/80"
              onClick={() => onClearFilter('serviceCategory')}
            >
              <Tag className="w-3 h-3" aria-hidden="true" />
              {getCategoryLabel(filters.serviceCategory)}
              <X className="w-3 h-3 ml-1" aria-hidden="true" />
              <span className="sr-only">Remove category filter</span>
            </Badge>
          )}

          {filters.status && (
            <Badge
              variant="secondary"
              className="gap-1 cursor-pointer hover:bg-secondary/80"
              onClick={() => onClearFilter('status')}
            >
              <Clock className="w-3 h-3" aria-hidden="true" />
              {getStatusLabel(filters.status)}
              <X className="w-3 h-3 ml-1" aria-hidden="true" />
              <span className="sr-only">Remove status filter</span>
            </Badge>
          )}

          {filters.location && (
            <Badge
              variant="secondary"
              className="gap-1 cursor-pointer hover:bg-secondary/80"
              onClick={() => onClearFilter('location')}
            >
              <MapPin className="w-3 h-3" aria-hidden="true" />
              {filters.location}
              <X className="w-3 h-3 ml-1" aria-hidden="true" />
              <span className="sr-only">Remove location filter</span>
            </Badge>
          )}

          {filters.createdAfter && (
            <Badge
              variant="secondary"
              className="gap-1 cursor-pointer hover:bg-secondary/80"
              onClick={() => onClearFilter('createdAfter')}
            >
              From: {new Date(filters.createdAfter).toLocaleDateString()}
              <X className="w-3 h-3 ml-1" aria-hidden="true" />
              <span className="sr-only">Remove start date filter</span>
            </Badge>
          )}

          {filters.createdBefore && (
            <Badge
              variant="secondary"
              className="gap-1 cursor-pointer hover:bg-secondary/80"
              onClick={() => onClearFilter('createdBefore')}
            >
              Until: {new Date(filters.createdBefore).toLocaleDateString()}
              <X className="w-3 h-3 ml-1" aria-hidden="true" />
              <span className="sr-only">Remove end date filter</span>
            </Badge>
          )}
        </div>
      )}

      {/* Loading Indicator Bar */}
      {isLoading && (
        <div
          className="h-0.5 w-full bg-muted overflow-hidden"
          role="progressbar"
          aria-label="Search in progress"
        >
          <div className="h-full w-1/3 bg-primary animate-pulse" />
        </div>
      )}
    </div>
  );
}

/**
 * Export service category and status constants for reuse
 */
export { SERVICE_CATEGORIES, SERVICE_STATUSES };
export type { ServiceStatus };
