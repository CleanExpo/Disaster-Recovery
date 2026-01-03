# Advanced Search & Full-Text Indexing Documentation

## Overview

The Disaster Recovery - NRPG platform includes a comprehensive full-text search system with advanced indexing, filtering, and analytics capabilities. This documentation covers the search infrastructure, API usage, and best practices.

## Architecture

### Search Stack

```
┌─────────────────────────────────────────────────────────┐
│                    Search UI Components                  │
│  SearchBar | SearchResults | FiltersSidebar | SearchPage │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    React Hooks Layer                     │
│         useSearch | useSearchFilters                     │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                    API Routes Layer                      │
│  /api/search | /api/search/filters | /api/search/manage │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│                Service Layer (Backend)                   │
│  FullTextSearch | SearchFilters | SearchIndexing        │
└─────────────────────────────────────────────────────────┘
                            ↓
┌─────────────────────────────────────────────────────────┐
│              Database / Cache Layer                      │
│         PostgreSQL | Redis | In-Memory Cache            │
└─────────────────────────────────────────────────────────┘
```

## Core Services

### FullTextSearchService

Handles all search operations across messages, users, and rooms.

#### Main Methods

```typescript
// Search with options
search(options: SearchOptions): Promise<SearchResult[]>

// Search messages
searchMessages(query, limit, offset, filters): Promise<SearchResult[]>

// Search users
searchUsers(query, limit, offset): Promise<SearchResult[]>

// Search rooms
searchRooms(query, limit, offset, userId?): Promise<SearchResult[]>

// Get autocomplete suggestions
getSuggestions(query, limit): Promise<Suggestion[]>

// Track search for analytics
trackSearch(stats: SearchStats): void

// Get popular queries
getPopularQueries(limit): Array<{query, count}>

// Get search statistics
getSearchStats()
```

#### Relevance Scoring

Results are scored from 0-1 based on:
- Exact match: 1.0
- Starts with match: 0.9
- Contains match: 0.7
- Word boundary match: 0.3-0.6

### SearchFiltersService

Manages advanced filtering and faceted search.

#### Main Methods

```typescript
// Get faceted search results
getFacets(query, currentFilters): Promise<FacetResults>

// Get available users for filtering
getFilterUsers(searchQuery?): Promise<FilterOption[]>

// Get available rooms for filtering
getFilterRooms(searchQuery?): Promise<FilterOption[]>

// Get date range options
getDateRangeOptions(): FilterOption[]

// Get filter statistics
getFilterStats()
```

### SearchIndexingService

Maintains search indices for performance.

#### Main Methods

```typescript
// Index a message
indexMessage(messageId): Promise<boolean>

// Index a user
indexUser(userId): Promise<boolean>

// Index a room
indexRoom(roomId): Promise<boolean>

// Rebuild all indices
rebuildAllIndices(): Promise<{success, failed}>

// Verify index integrity
verifyIndexIntegrity(): Promise<boolean>

// Warmup indices
warmupIndices(limit): Promise<number>

// Get index statistics
getIndexStats(indexName?): IndexStats | IndexStats[]

// Get index health
getIndexHealth(): {healthy, degraded, unhealthy}
```

## API Endpoints

### POST /api/search
Full-text search

**Request:**
```json
{
  "query": "search term",
  "type": "all",
  "limit": 20,
  "offset": 0,
  "sortBy": "relevance",
  "filters": {
    "userId": "user-id",
    "roomId": "room-id",
    "dateFrom": "2025-01-01",
    "dateTo": "2025-01-31"
  }
}
```

**Response:**
```json
{
  "results": [
    {
      "id": "message-1",
      "type": "message",
      "title": "Message by John",
      "description": "...",
      "preview": "...",
      "relevance": 0.95,
      "metadata": {...}
    }
  ],
  "total": 42,
  "query": "search term",
  "responseTime": 145,
  "timestamp": "2025-01-15T10:30:00Z"
}
```

### GET /api/search
Autocomplete suggestions

**Query Parameters:**
- `q` (required): Search query
- `limit` (optional): Max suggestions (default: 5)

**Response:**
```json
{
  "suggestions": [
    {"text": "recent search", "type": "recent"},
    {"text": "John Doe", "type": "user"},
    {"text": "General", "type": "room"}
  ],
  "query": "john"
}
```

### POST /api/search/filters
Get filter options for search results

**Request:**
```json
{
  "query": "search term",
  "currentFilters": {
    "users": ["user-1"],
    "rooms": ["room-1"]
  }
}
```

**Response:**
```json
{
  "facets": {
    "users": [
      {"value": "user-1", "label": "John Doe", "count": 15},
      {"value": "user-2", "label": "Jane Smith", "count": 8}
    ],
    "rooms": [
      {"value": "room-1", "label": "General", "count": 23}
    ],
    "dates": [
      {"value": "2025-01-15", "label": "Today", "count": 5}
    ],
    "tags": []
  },
  "filterStats": {...},
  "dateRangeOptions": [...]
}
```

### GET /api/search/filters
Get available filter options

**Query Parameters:**
- `type` (optional): 'all' | 'users' | 'rooms'
- `q` (optional): Filter by name

### GET /api/search/analytics
Get search analytics (admin only)

**Response:**
```json
{
  "searchMetrics": {
    "totalSearches": 1523,
    "popularQueries": [
      {"query": "help", "count": 142},
      {"query": "meeting", "count": 89}
    ],
    "averageResponseTime": 87
  },
  "indexing": {
    "stats": [
      {
        "indexName": "messages",
        "documentCount": 45234,
        "indexSize": 5242880,
        "lastIndexed": "2025-01-15T10:00:00Z",
        "indexHealth": "healthy"
      }
    ],
    "health": {
      "healthy": ["messages", "users", "rooms"],
      "degraded": [],
      "unhealthy": []
    }
  }
}
```

### POST /api/search/manage
Manage search indices (admin only)

**Actions:**
- `rebuild`: Rebuild all indices
- `verify`: Verify index integrity
- `warmup`: Pre-load frequently accessed data
- `clear`: Clear all indices

**Request:**
```json
{
  "action": "rebuild",
  "params": {}
}
```

## React Hooks

### useSearch()

Manage search functionality with debouncing.

```typescript
const {
  query,           // Current search query
  results,         // Search results array
  suggestions,     // Autocomplete suggestions
  isLoading,       // Search in progress
  isLoadingSuggestions,
  error,           // Error message if any
  search,          // Perform search (debounced)
  handleQueryChange, // Update query and trigger search
  clearResults,    // Clear search
  getSuggestions,  // Get suggestions for query
} = useSearch();
```

### useSearchFilters()

Manage search filters and facets.

```typescript
const {
  filters,           // Current active filters
  facets,            // Available filter options
  filterOptions,     // Pre-loaded filter choices
  isLoading,         // Loading facets
  loadFacets,        // Load facets for query
  toggleUserFilter,  // Add/remove user filter
  toggleRoomFilter,  // Add/remove room filter
  setDateRange,      // Set date range filter
  clearDateRange,    // Clear date range
  clearAllFilters,   // Clear all filters
  isFilterActive,    // Check if filter active
  getActiveFilterCount, // Count active filters
} = useSearchFilters();
```

## Usage Examples

### Basic Search

```tsx
import { useSearch } from '@/hooks/useSearch';

export function MySearchComponent() {
  const { query, results, handleQueryChange } = useSearch();

  return (
    <div>
      <input
        value={query}
        onChange={(e) => handleQueryChange(e.target.value)}
        placeholder="Search..."
      />
      {results.map(result => (
        <div key={result.id}>
          <h3>{result.title}</h3>
          <p>{result.preview}</p>
        </div>
      ))}
    </div>
  );
}
```

### Search with Filters

```tsx
import { useSearch } from '@/hooks/useSearch';
import { useSearchFilters } from '@/hooks/useSearchFilters';

export function AdvancedSearch() {
  const { query, results } = useSearch();
  const {
    filters,
    toggleUserFilter,
    toggleRoomFilter,
    clearAllFilters
  } = useSearchFilters();

  const handleSearch = () => {
    // Search with current filters
    console.log('Searching:', { query, filters });
  };

  return (
    <div>
      <input value={query} placeholder="Search..." />

      <div>
        <label>
          <input
            type="checkbox"
            onChange={() => toggleUserFilter('user-1')}
          />
          Show results from User 1
        </label>
      </div>

      <button onClick={handleSearch}>Search</button>
      <button onClick={clearAllFilters}>Clear Filters</button>
    </div>
  );
}
```

### Direct Service Usage (Backend)

```typescript
import { fullTextSearch } from '@/lib/search/full-text-search';

// Search messages
const results = await fullTextSearch.searchMessages(
  'typescript',
  20,
  0,
  {
    roomId: 'room-123',
    dateFrom: new Date('2025-01-01'),
    dateTo: new Date('2025-01-31')
  }
);

// Get suggestions
const suggestions = await fullTextSearch.getSuggestions('hello', 10);

// Track search
fullTextSearch.trackSearch({
  query: 'typescript',
  results: results.length,
  responseTime: 125,
  timestamp: new Date(),
  userId: 'user-123'
});
```

## Performance Optimization

### Search Debouncing
- Default: 300ms
- Prevents excessive API calls while typing
- Can be adjusted per hook instance

### Index Warming
```typescript
import { searchIndexing } from '@/lib/search/search-indexing';

// Preload frequently accessed data
const indexed = await searchIndexing.warmupIndices(100);
```

### Index Verification
```typescript
// Verify index integrity
const isIntact = await searchIndexing.verifyIndexIntegrity();

// Get index health
const health = searchIndexing.getIndexHealth();
// { healthy: [...], degraded: [...], unhealthy: [...] }
```

### Batch Indexing
```typescript
// Rebuild all indices
const result = await searchIndexing.rebuildAllIndices();
console.log(`Indexed: ${result.success}, Failed: ${result.failed}`);
```

## Best Practices

### Query Optimization

1. **Keep queries concise**: Shorter queries are faster
2. **Use filters**: Narrow results with facets
3. **Pagination**: Don't load all results at once
4. **Caching**: Results are cached when possible

### Indexing Strategy

1. **Warmup on startup**: Pre-load popular content
2. **Incremental updates**: Index changes immediately
3. **Periodic rebuild**: Full rebuild weekly
4. **Monitor health**: Check index status regularly

### Frontend Guidelines

1. **Debounce input**: Use default 300ms debounce
2. **Show loading**: Indicate search in progress
3. **Handle errors**: Display friendly error messages
4. **Suggest alternatives**: Show suggestions on empty results
5. **Keyboard navigation**: Support arrow keys in suggestions

## Troubleshooting

### Search returns no results

1. Check if indices are built: `/api/search/analytics`
2. Verify data exists in database
3. Try rebuilding indices: `/api/search/manage` → `rebuild`
4. Check query for special characters

### Slow search performance

1. Enable index warming: `warmupIndices()`
2. Check index health: `getIndexHealth()`
3. Verify database query performance
4. Consider pagination limits

### Index integrity issues

1. Verify index: `verifyIndexIntegrity()`
2. Rebuild if needed: `rebuildAllIndices()`
3. Check logs for errors
4. Monitor index size

## Configuration

### Environment Variables

```env
# Search configuration
SEARCH_DEBOUNCE_MS=300
SEARCH_MAX_RESULTS=100
SEARCH_RESULT_LIMIT=20
SEARCH_INDEX_WARMUP_LIMIT=100

# Indexing configuration
SEARCH_INDEX_REBUILD_INTERVAL=604800000  # 7 days in ms
SEARCH_INDEX_MAX_SIZE=104857600          # 100MB
```

### Customization

Modify service parameters in respective service files:

```typescript
// In full-text-search.ts
private readonly MAX_HISTORY = 1000;  // Search history limit

// In search-indexing.ts
private indexCache = new Map<string, IndexDocument[]>();
```

## Monitoring

### Key Metrics

- Total searches per hour
- Average search response time
- Popular search queries
- Index size and health
- Search error rate

### Health Checks

The search system includes health checks for:
- Database connectivity
- Index integrity
- Cache availability
- Memory usage

## Future Enhancements

1. **Elasticsearch Integration**: For enterprise search at scale
2. **Search Analytics Dashboard**: Visualize search patterns
3. **Custom Synonyms**: Support search term variations
4. **Phonetic Search**: Handle typos and misspellings
5. **Advanced Query Syntax**: Boolean operators, field-specific search
6. **Search Suggestions**: ML-powered query suggestions
7. **Real-time Indexing**: WebSocket-based instant updates
8. **Multi-language Support**: Search in multiple languages

## API Reference

See [Search API Documentation](./SEARCH_API_REFERENCE.md) for complete endpoint documentation.

## Contributing

When adding new searchable content types:

1. Create indexing service in `lib/search/`
2. Add API endpoint in `app/api/search/`
3. Create React hook in `hooks/`
4. Add UI component in `components/search/`
5. Document in this file

## Support

For issues or questions about search functionality, open an issue on GitHub with:
- Search query used
- Expected results
- Actual results
- Error messages
- Steps to reproduce
