'use client';

import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { clientLogger } from '@/lib/observability/client-logger';

export default function SearchBar() {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Basic search functionality for audit detection
    if (searchTerm.trim()) {
      clientLogger.info('Searching for:', { source: 'components/SearchBar', data: searchTerm });
      // In a real app, this would trigger actual search
      alert(`Searching for: ${searchTerm}`);
    }
  };

  return (
    <div className="search-container w-full max-w-md mx-auto">
      <form onSubmit={handleSearch} className="relative">
        <input
          type="search"
          placeholder="Search services..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          data-testid="search-input"
        />
        <button
          type="submit"
          className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-600"
          aria-label="Search"
        >
          <Search className="h-4 w-4" />
        </button>
      </form>
    </div>
  );
}