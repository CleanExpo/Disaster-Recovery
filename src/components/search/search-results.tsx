'use client';

import { useSearch } from '@/hooks/useSearch';
import type { SearchResult } from '@/hooks/useSearch';

/**
 * SearchResults Component
 *
 * Display search results with type badges, relevance indicators, and metadata
 */
export function SearchResults() {
  const { results, isLoading, error, query } = useSearch();

  if (!query) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="currentColor"
            viewBox="0 0 20 20"
          >
            <path d="M8 16A8 8 0 108 0a8 8 0 000 16zM7 9a1 1 0 100-2 1 1 0 000 2zm4 0a1 1 0 100-2 1 1 0 000 2zm-2 4a3 3 0 01-3-3h2a1 1 0 001 1h2a1 1 0 001-1h2a3 3 0 01-3 3z" />
          </svg>
          <p className="text-lg">Start searching to see results</p>
        </div>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="bg-red-50 border border-red-200 rounded-lg p-4">
        <p className="text-red-800">
          <strong>Error:</strong> {error}
        </p>
      </div>
    );
  }

  if (results.length === 0) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-500">
        <div className="text-center">
          <svg
            className="w-16 h-16 mx-auto mb-4 text-gray-300"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
          <p className="text-lg">No results found for "{query}"</p>
          <p className="text-sm mt-2">Try different keywords or adjust filters</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="text-sm text-gray-600">
        Found {results.length} result{results.length !== 1 ? 's' : ''} for "{query}"
      </div>

      {results.map((result) => (
        <SearchResultCard key={result.id} result={result} />
      ))}
    </div>
  );
}

/**
 * Individual Search Result Card
 */
function SearchResultCard({ result }: { result: SearchResult }) {
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'message':
        return 'bg-blue-100 text-blue-800';
      case 'user':
        return 'bg-purple-100 text-purple-800';
      case 'room':
        return 'bg-green-100 text-green-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'message':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 5a2 2 0 012-2h12a2 2 0 012 2v10a2 2 0 01-2 2H4a2 2 0 01-2-2V5z" />
          </svg>
        );
      case 'user':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
          </svg>
        );
      case 'room':
        return (
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
          </svg>
        );
      default:
        return null;
    }
  };

  const relevancePercentage = Math.round(result.relevance * 100);

  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
      {/* Header */}
      <div className="flex items-start justify-between mb-2">
        <div className="flex items-center gap-3 flex-1">
          {/* Type Badge */}
          <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-semibold ${getTypeColor(result.type)}`}>
            {getTypeIcon(result.type)}
            <span className="capitalize">{result.type}</span>
          </div>

          {/* Title */}
          <h3 className="font-semibold text-gray-900 truncate">{result.title}</h3>
        </div>

        {/* Relevance Score */}
        <div className="flex items-center gap-2 ml-4">
          <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-blue-600 transition-all"
              style={{ width: `${relevancePercentage}%` }}
            />
          </div>
          <span className="text-xs text-gray-500 font-semibold">{relevancePercentage}%</span>
        </div>
      </div>

      {/* Description */}
      {result.description && (
        <p className="text-sm text-gray-600 mb-2">{result.description}</p>
      )}

      {/* Preview */}
      {result.preview && (
        <div className="text-sm text-gray-700 mb-3 p-2 bg-gray-50 rounded line-clamp-2">
          {/* Render highlights as markdown-style bold */}
          <span dangerouslySetInnerHTML={{ __html: result.preview.replace(/\*\*(.+?)\*\*/g, '<mark>$1</mark>') }} />
        </div>
      )}

      {/* Metadata */}
      {result.metadata && (
        <div className="flex flex-wrap gap-4 text-xs text-gray-500">
          {result.metadata.sender && (
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" />
              </svg>
              <span>{result.metadata.sender.name}</span>
            </div>
          )}
          {result.metadata.room && (
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M2 6a2 2 0 012-2h12a2 2 0 012 2v8a2 2 0 01-2 2H4a2 2 0 01-2-2V6z" />
              </svg>
              <span>{result.metadata.room.name}</span>
            </div>
          )}
          {result.metadata.createdAt && (
            <div className="flex items-center gap-1">
              <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1 4.5 4.5 0 11-4.814 6.98z" />
              </svg>
              <span>{new Date(result.metadata.createdAt).toLocaleDateString()}</span>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
