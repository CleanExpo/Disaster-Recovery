'use client';

import { useState } from 'react';
import { Search as SearchIcon, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const router = useRouter();
  
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // In production, this would search your content
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
    }
  };
  
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => setIsOpen(true)}
        aria-label="Open search"
      >
        <SearchIcon className="h-5 w-5" />
      </Button>
      
      {isOpen && (
        <div className="fixed inset-0 z-50 bg-black/50">
          <div className="container mx-auto pt-20 px-4">
            <div className="max-w-2xl mx-auto bg-white rounded-lg shadow-xl p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Search</h2>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close search"
                >
                  <X className="h-5 w-5" />
                </Button>
              </div>
              
              <form onSubmit={handleSearch}>
                <div className="flex gap-2">
                  <Input
                    type="search"
                    placeholder="Search for services, locations, or information..."
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    className="flex-1"
                    autoFocus
                  />
                  <Button type="submit">Search</Button>
                </div>
              </form>
              
              <div className="mt-6">
                <p className="text-sm text-gray-600 mb-3">Popular searches:</p>
                <div className="flex flex-wrap gap-2">
                  {[
                    'Water damage',
                    'Fire restoration',
                    'Insurance claims',
                    'Emergency services',
                    'Mould removal',
                  ].map((term) => (
                    <button
                      key={term}
                      onClick={() => {
                        setQuery(term);
                        handleSearch(new Event('submit') as any);
                      }}
                      className="px-3 py-1 bg-gray-100 hover:bg-gray-200 rounded-full text-sm"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}