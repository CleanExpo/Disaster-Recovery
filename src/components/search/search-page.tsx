'use client';

import { useState } from 'react';
import { SearchBar } from './search-bar';
import { SearchResults } from './search-results';
import { SearchFiltersSidebar } from './search-filters-sidebar';

/**
 * SearchPage Component
 *
 * Full-featured search page with results and filters
 */
export function SearchPage() {
  const [showFilters, setShowFilters] = useState(true);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="space-y-4">
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Search</h1>
              <p className="text-gray-600 mt-1">Find messages, users, and rooms</p>
            </div>

            {/* Search Bar */}
            <div className="max-w-2xl">
              <SearchBar />
            </div>

            {/* Controls */}
            <div className="flex items-center justify-between">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="md:hidden flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                </svg>
                {showFilters ? 'Hide' : 'Show'} Filters
              </button>

              <button
                className="flex items-center gap-2 text-sm font-medium text-blue-600 hover:text-blue-700"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M5.5 13a3.5 3.5 0 01-.369-6.98 4 4 0 117.753-1 4.5 4.5 0 11-4.814 6.98z" />
                </svg>
                Advanced Search
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex gap-8">
          {/* Sidebar - Hidden on mobile */}
          {showFilters && (
            <aside className="hidden md:block flex-shrink-0">
              <SearchFiltersSidebar />
            </aside>
          )}

          {/* Results */}
          <main className="flex-1 min-w-0">
            <SearchResults />
          </main>
        </div>
      </div>
    </div>
  );
}
