/**
 * Service Requests Components
 *
 * Components for searching and displaying service requests.
 */

export {
  ServiceRequestSearchBar,
  SERVICE_CATEGORIES,
  SERVICE_STATUSES,
  type ServiceRequestSearchBarProps,
  type ServiceStatus,
} from './service-request-search-bar';

export {
  ServiceRequestSearchResults,
  ServiceRequestResultCard,
  ResultCardSkeleton,
  EmptyState,
  ErrorState,
  PaginationControls,
  HighlightedText,
  type ServiceRequestSearchResultsProps,
} from './service-request-search-results';
