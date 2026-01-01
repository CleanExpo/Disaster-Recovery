'use client';

import { useMemo, useCallback, Fragment } from 'react';
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import {
  MapPin,
  Clock,
  Tag,
  AlertTriangle,
  Calendar,
  User,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  FileSearch,
  Search,
} from 'lucide-react';
import type { ServiceRequestResult } from '@/hooks/useServiceRequestSearch';
import { SERVICE_CATEGORIES, SERVICE_STATUSES } from './service-request-search-bar';

/**
 * Props for ServiceRequestSearchResults component
 */
export interface ServiceRequestSearchResultsProps {
  /** Search results to display */
  results: ServiceRequestResult[];
  /** Total count of matching results */
  total: number;
  /** Whether search is currently loading */
  isLoading?: boolean;
  /** Error message if search failed */
  error?: string | null;
  /** Current search query (for highlighting) */
  query?: string;
  /** Whether any search is active */
  isSearchActive?: boolean;
  /** Current page number (1-indexed) */
  currentPage?: number;
  /** Total number of pages */
  totalPages?: number;
  /** Whether there are more results to load */
  hasMore?: boolean;
  /** Callback to load more results */
  onLoadMore?: () => void;
  /** Callback to go to a specific page */
  onGoToPage?: (page: number) => void;
  /** Callback when a result is clicked */
  onResultClick?: (result: ServiceRequestResult) => void;
  /** Whether user sees all requests or just their own */
  userScope?: 'all' | 'own';
  /** Pagination mode */
  paginationMode?: 'load-more' | 'page-numbers';
  /** Additional CSS class names */
  className?: string;
}

/**
 * Get the display label for a category value
 */
function getCategoryLabel(value: string): string {
  const category = SERVICE_CATEGORIES.find((c) => c.value === value);
  return category?.label || value.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Get the display label for a status value
 */
function getStatusLabel(value: string): string {
  const status = SERVICE_STATUSES.find((s) => s.value === value);
  return status?.label || value.replace(/_/g, ' ').toLowerCase().replace(/\b\w/g, (l) => l.toUpperCase());
}

/**
 * Get status badge variant based on status value
 */
function getStatusVariant(status: string): 'default' | 'secondary' | 'destructive' | 'outline' {
  switch (status) {
    case 'PENDING':
      return 'outline';
    case 'MATCHED':
      return 'secondary';
    case 'IN_PROGRESS':
      return 'default';
    case 'COMPLETED':
      return 'default';
    case 'CANCELLED':
      return 'destructive';
    default:
      return 'outline';
  }
}

/**
 * Get urgency badge color classes
 */
function getUrgencyClasses(urgency: string): string {
  switch (urgency) {
    case 'LOW':
      return 'bg-green-100 text-green-800 border-green-200';
    case 'MEDIUM':
      return 'bg-yellow-100 text-yellow-800 border-yellow-200';
    case 'HIGH':
      return 'bg-orange-100 text-orange-800 border-orange-200';
    case 'EMERGENCY':
      return 'bg-red-100 text-red-800 border-red-200';
    default:
      return 'bg-gray-100 text-gray-800 border-gray-200';
  }
}

/**
 * Highlight search terms in text
 */
function HighlightedText({ text, query }: { text: string; query: string }) {
  if (!query.trim() || !text) {
    return <>{text}</>;
  }

  // Escape special regex characters in query
  const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  const regex = new RegExp(`(${escapedQuery})`, 'gi');
  const parts = text.split(regex);

  return (
    <>
      {parts.map((part, index) => {
        const isMatch = regex.test(part);
        // Reset regex lastIndex after test
        regex.lastIndex = 0;

        return isMatch ? (
          <mark
            key={index}
            className="bg-yellow-200 text-yellow-900 px-0.5 rounded-sm"
          >
            {part}
          </mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        );
      })}
    </>
  );
}

/**
 * Loading skeleton for result cards
 */
function ResultCardSkeleton() {
  return (
    <Card className="animate-pulse">
      <CardHeader>
        <div className="flex items-start justify-between gap-4">
          <div className="space-y-2 flex-1">
            <Skeleton className="h-5 w-3/4" />
            <Skeleton className="h-4 w-1/2" />
          </div>
          <Skeleton className="h-6 w-20" />
        </div>
      </CardHeader>
      <CardContent>
        <Skeleton className="h-4 w-full mb-2" />
        <Skeleton className="h-4 w-4/5" />
        <div className="flex gap-2 mt-4">
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
          <Skeleton className="h-5 w-24" />
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex gap-4">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-4 w-28" />
        </div>
      </CardFooter>
    </Card>
  );
}

/**
 * Empty state component
 */
function EmptyState({ query, isSearchActive }: { query?: string; isSearchActive?: boolean }) {
  if (!isSearchActive) {
    return (
      <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
        <Search className="w-16 h-16 mb-4 opacity-40" aria-hidden="true" />
        <p className="text-lg font-medium">Start searching to see results</p>
        <p className="text-sm mt-1">
          Enter a search term or apply filters to find service requests
        </p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
      <FileSearch className="w-16 h-16 mb-4 opacity-40" aria-hidden="true" />
      <p className="text-lg font-medium">
        No results found{query ? ` for "${query}"` : ''}
      </p>
      <p className="text-sm mt-1">
        Try different keywords or adjust your filters
      </p>
    </div>
  );
}

/**
 * Error state component
 */
function ErrorState({ message }: { message: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 bg-destructive/10 border border-destructive/30 rounded-lg">
      <AlertTriangle className="w-12 h-12 text-destructive mb-3" aria-hidden="true" />
      <p className="text-destructive font-medium">Search Error</p>
      <p className="text-sm text-destructive/80 mt-1">{message}</p>
    </div>
  );
}

/**
 * Individual result card component
 */
function ServiceRequestResultCard({
  result,
  query = '',
  onClick,
}: {
  result: ServiceRequestResult;
  query?: string;
  onClick?: (result: ServiceRequestResult) => void;
}) {
  const handleClick = useCallback(() => {
    onClick?.(result);
  }, [onClick, result]);

  const formattedDate = useMemo(() => {
    return new Date(result.createdAt).toLocaleDateString(undefined, {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
    });
  }, [result.createdAt]);

  return (
    <Card
      className="hover:shadow-md transition-shadow cursor-pointer"
      onClick={handleClick}
      tabIndex={0}
      role="button"
      aria-label={`View service request: ${result.serviceTitle}`}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          handleClick();
        }
      }}
    >
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <CardTitle className="text-base truncate">
              <HighlightedText text={result.serviceTitle} query={query} />
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <Tag className="w-3 h-3" aria-hidden="true" />
              <span>{getCategoryLabel(result.serviceCategory)}</span>
            </CardDescription>
          </div>
          <div className="flex flex-col gap-1 shrink-0">
            <Badge variant={getStatusVariant(result.status)}>
              <Clock className="w-3 h-3" aria-hidden="true" />
              {getStatusLabel(result.status)}
            </Badge>
            <Badge
              variant="outline"
              className={getUrgencyClasses(result.urgency)}
            >
              <AlertTriangle className="w-3 h-3" aria-hidden="true" />
              {result.urgency}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="py-2">
        <p className="text-sm text-muted-foreground line-clamp-2">
          <HighlightedText text={result.description} query={query} />
        </p>

        {/* Metadata badges */}
        <div className="flex flex-wrap gap-2 mt-3">
          {result.location && (
            <Badge variant="secondary" className="gap-1">
              <MapPin className="w-3 h-3" aria-hidden="true" />
              <HighlightedText text={result.location} query={query} />
            </Badge>
          )}
          {result.budget && (
            <Badge variant="secondary" className="gap-1">
              ${result.budget}
            </Badge>
          )}
          {result.matches && result.matches.length > 0 && (
            <Badge variant="secondary" className="gap-1">
              {result.matches.length} match{result.matches.length !== 1 ? 'es' : ''}
            </Badge>
          )}
        </div>
      </CardContent>

      <CardFooter className="pt-2 text-xs text-muted-foreground">
        <div className="flex flex-wrap gap-4">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" aria-hidden="true" />
            <span>Created: {formattedDate}</span>
          </div>
          {result.user && (
            <div className="flex items-center gap-1">
              <User className="w-3 h-3" aria-hidden="true" />
              <span>{result.user.name}</span>
            </div>
          )}
        </div>
      </CardFooter>
    </Card>
  );
}

/**
 * Pagination controls component
 */
function PaginationControls({
  currentPage,
  totalPages,
  onGoToPage,
  isLoading,
}: {
  currentPage: number;
  totalPages: number;
  onGoToPage: (page: number) => void;
  isLoading: boolean;
}) {
  const pages = useMemo(() => {
    const result: (number | 'ellipsis')[] = [];
    const maxVisible = 5;

    if (totalPages <= maxVisible + 2) {
      // Show all pages if total is small enough
      for (let i = 1; i <= totalPages; i++) {
        result.push(i);
      }
    } else {
      // Always show first page
      result.push(1);

      if (currentPage > 3) {
        result.push('ellipsis');
      }

      // Show pages around current
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(totalPages - 1, currentPage + 1);

      for (let i = start; i <= end; i++) {
        result.push(i);
      }

      if (currentPage < totalPages - 2) {
        result.push('ellipsis');
      }

      // Always show last page
      if (totalPages > 1) {
        result.push(totalPages);
      }
    }

    return result;
  }, [currentPage, totalPages]);

  if (totalPages <= 1) {
    return null;
  }

  return (
    <nav
      className="flex items-center justify-center gap-1"
      role="navigation"
      aria-label="Pagination"
    >
      {/* First page */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onGoToPage(1)}
        disabled={currentPage === 1 || isLoading}
        aria-label="First page"
      >
        <ChevronsLeft className="w-4 h-4" />
      </Button>

      {/* Previous page */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onGoToPage(currentPage - 1)}
        disabled={currentPage === 1 || isLoading}
        aria-label="Previous page"
      >
        <ChevronLeft className="w-4 h-4" />
      </Button>

      {/* Page numbers */}
      <div className="flex items-center gap-1">
        {pages.map((page, index) => {
          if (page === 'ellipsis') {
            return (
              <span
                key={`ellipsis-${index}`}
                className="px-2 text-muted-foreground"
                aria-hidden="true"
              >
                ...
              </span>
            );
          }

          const isCurrentPage = page === currentPage;
          return (
            <Button
              key={page}
              variant={isCurrentPage ? 'default' : 'ghost'}
              size="sm"
              onClick={() => onGoToPage(page)}
              disabled={isLoading}
              aria-label={`Page ${page}`}
              aria-current={isCurrentPage ? 'page' : undefined}
            >
              {page}
            </Button>
          );
        })}
      </div>

      {/* Next page */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onGoToPage(currentPage + 1)}
        disabled={currentPage === totalPages || isLoading}
        aria-label="Next page"
      >
        <ChevronRight className="w-4 h-4" />
      </Button>

      {/* Last page */}
      <Button
        variant="ghost"
        size="icon"
        onClick={() => onGoToPage(totalPages)}
        disabled={currentPage === totalPages || isLoading}
        aria-label="Last page"
      >
        <ChevronsRight className="w-4 h-4" />
      </Button>
    </nav>
  );
}

/**
 * ServiceRequestSearchResults Component
 *
 * Displays a list of searched service requests with highlighting,
 * loading states, empty states, and pagination controls.
 *
 * Features:
 * - Displays list of service request cards
 * - Highlights matching search terms
 * - Shows empty state when no results
 * - Shows loading skeleton during search
 * - Pagination controls (load more or page numbers)
 * - Result count display
 */
export function ServiceRequestSearchResults({
  results,
  total,
  isLoading = false,
  error = null,
  query = '',
  isSearchActive = false,
  currentPage = 1,
  totalPages = 1,
  hasMore = false,
  onLoadMore,
  onGoToPage,
  onResultClick,
  userScope = 'own',
  paginationMode = 'page-numbers',
  className = '',
}: ServiceRequestSearchResultsProps) {
  // Show error state
  if (error) {
    return (
      <div className={className}>
        <ErrorState message={error} />
      </div>
    );
  }

  // Show loading skeletons
  if (isLoading && results.length === 0) {
    return (
      <div className={`space-y-4 ${className}`}>
        <div className="flex items-center justify-between text-sm text-muted-foreground">
          <Skeleton className="h-4 w-48" />
        </div>
        {[1, 2, 3].map((i) => (
          <ResultCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  // Show empty state
  if (!isLoading && results.length === 0) {
    return (
      <div className={className}>
        <EmptyState query={query} isSearchActive={isSearchActive} />
      </div>
    );
  }

  // Show results
  return (
    <div className={`space-y-4 ${className}`}>
      {/* Results header */}
      <div className="flex items-center justify-between">
        <div className="text-sm text-muted-foreground">
          {isSearchActive ? (
            <>
              Found <span className="font-medium text-foreground">{total}</span>{' '}
              result{total !== 1 ? 's' : ''}
              {query ? ` for "${query}"` : ''}
              {userScope === 'own' && (
                <span className="ml-1 text-xs">(your requests)</span>
              )}
              {userScope === 'all' && (
                <span className="ml-1 text-xs">(all requests)</span>
              )}
            </>
          ) : (
            <>Showing {results.length} service requests</>
          )}
        </div>
        {totalPages > 1 && paginationMode === 'page-numbers' && (
          <div className="text-sm text-muted-foreground">
            Page {currentPage} of {totalPages}
          </div>
        )}
      </div>

      {/* Results list */}
      <div className="space-y-3" role="list" aria-label="Service request search results">
        {results.map((result) => (
          <div key={result.id} role="listitem">
            <ServiceRequestResultCard
              result={result}
              query={query}
              onClick={onResultClick}
            />
          </div>
        ))}
      </div>

      {/* Loading more indicator */}
      {isLoading && results.length > 0 && (
        <div className="flex justify-center py-4">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <div className="animate-spin rounded-full h-4 w-4 border-2 border-primary border-t-transparent" />
            Loading more results...
          </div>
        </div>
      )}

      {/* Pagination controls */}
      {paginationMode === 'load-more' && hasMore && onLoadMore && (
        <div className="flex justify-center pt-4">
          <Button
            variant="outline"
            onClick={onLoadMore}
            disabled={isLoading}
          >
            {isLoading ? 'Loading...' : 'Load More Results'}
          </Button>
        </div>
      )}

      {paginationMode === 'page-numbers' && totalPages > 1 && onGoToPage && (
        <div className="pt-4 border-t">
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            onGoToPage={onGoToPage}
            isLoading={isLoading}
          />
        </div>
      )}
    </div>
  );
}

/**
 * Export individual components for flexible use
 */
export {
  ServiceRequestResultCard,
  ResultCardSkeleton,
  EmptyState,
  ErrorState,
  PaginationControls,
  HighlightedText,
};
