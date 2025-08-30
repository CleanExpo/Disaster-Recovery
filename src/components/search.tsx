'use client';

import { useState, useEffect, useRef } from 'react';
import { Search as SearchIcon, X, Clock, TrendingUp, MapPin, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';

interface SearchSuggestion {
  id: string;
  text: string;
  type: 'recent' | 'popular' | 'suggestion';
  category?: string;
  location?: string;
}

interface QuickResult {
  id: string;
  title: string;
  description: string;
  url: string;
  category: string;
  type: 'service' | 'contractor' | 'article';
}

export function Search() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<SearchSuggestion[]>([]);
  const [quickResults, setQuickResults] = useState<QuickResult[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  // Mock data for suggestions and recent searches
  const popularSearches: SearchSuggestion[] = [
    { id: '1', text: 'Emergency water damage', type: 'popular', category: 'Water Damage' },
    { id: '2', text: 'Fire restoration services', type: 'popular', category: 'Fire Damage' },
    { id: '3', text: 'Mould inspection Brisbane', type: 'popular', category: 'Mould Services', location: 'Brisbane' },
    { id: '4', text: 'Storm damage repair', type: 'popular', category: 'Storm Damage' },
    { id: '5', text: 'Insurance approved contractors', type: 'popular' },
  ];

  const recentSearches: SearchSuggestion[] = [
    { id: '6', text: 'water damage restoration', type: 'recent' },
    { id: '7', text: 'fire damage Brisbane', type: 'recent', location: 'Brisbane' },
  ];

  // Simulate API search for suggestions and quick results
  useEffect(() => {
    if (query.length > 2) {
      setIsLoading(true);
      setShowSuggestions(true);
      
      // Simulate API delay
      const timer = setTimeout(() => {
        // Filter suggestions based on query
        const filteredSuggestions = [...popularSearches, ...recentSearches]
          .filter(s => s.text.toLowerCase().includes(query.toLowerCase()))
          .slice(0, 5);

        setSuggestions(filteredSuggestions);

        // Mock quick results
        const mockQuickResults: QuickResult[] = [
          {
            id: '1',
            title: 'Emergency Water Damage Restoration',
            description: '24/7 emergency response for water damage incidents...',
            url: '/services/water-damage',
            category: 'Water Damage',
            type: 'service'
          },
          {
            id: '2', 
            title: 'Elite Restoration Services',
            description: 'IICRC certified contractors specialising in...',
            url: '/contractors/elite-restoration',
            category: 'Contractor',
            type: 'contractor'
          }
        ].filter(r => 
          r.title.toLowerCase().includes(query.toLowerCase()) ||
          r.description.toLowerCase().includes(query.toLowerCase())
        );

        setQuickResults(mockQuickResults);
        setIsLoading(false);
      }, 300);

      return () => clearTimeout(timer);
    } else {
      setShowSuggestions(false);
      setSuggestions([]);
      setQuickResults([]);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      // Save to recent searches (in real app, this would persist)
      const newRecent: SearchSuggestion = {
        id: Date.now().toString(),
        text: query,
        type: 'recent'
      };
      
      router.push(`/search?q=${encodeURIComponent(query)}`);
      setIsOpen(false);
      setQuery('');
      setShowSuggestions(false);
    }
  };

  const handleSuggestionClick = (suggestion: SearchSuggestion) => {
    setQuery(suggestion.text);
    router.push(`/search?q=${encodeURIComponent(suggestion.text)}`);
    setIsOpen(false);
    setQuery('');
    setShowSuggestions(false);
  };

  const handleQuickResultClick = (result: QuickResult) => {
    router.push(result.url);
    setIsOpen(false);
    setQuery('');
    setShowSuggestions(false);
  };

  const handleOpenSearch = () => {
    setIsOpen(true);
    // Focus the input after the modal opens
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
      setQuery('');
      setShowSuggestions(false);
    }
  };

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        onClick={handleOpenSearch}
        aria-label="Open search"
        className="relative"
      >
        <SearchIcon className="h-5 w-5" />
      </Button>
      
      {isOpen && (
        <div 
          className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsOpen(false)}
        >
          <div className="container mx-auto pt-20 px-4" onClick={e => e.stopPropagation()}>
            <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-2xl overflow-hidden">
              {/* Search Header */}
              <div className="p-6 border-b">
                <div className="flex items-centre justify-between mb-4">
                  <h2 className="text-xl font-semibold text-gray-900">Search</h2>
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
                  <div className="relative">
                    <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <Input
                      ref={inputRef}
                      type="search"
                      placeholder="Search for emergency services, contractors, or help..."
                      value={query}
                      onChange={(e) => setQuery(e.target.value)}
                      onKeyDown={handleKeyDown}
                      className="pl-10 pr-12 py-3 text-lg border-2 border-gray-200 focus:border-blue-500 rounded-lg"
                    />
                    {query && (
                      <button
                        type="button"
                        onClick={() => {setQuery(''); setShowSuggestions(false);}}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                      >
                        <X className="h-4 w-4 text-gray-400" />
                      </button>
                    )}
                  </div>
                </form>
              </div>

              {/* Search Content */}
              <div className="max-h-96 overflow-y-auto">
                {showSuggestions && (suggestions.length > 0 || quickResults.length > 0) ? (
                  <div className="p-4">
                    {/* Quick Results */}
                    {quickResults.length > 0 && (
                      <div className="mb-6">
                        <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-centre gap-2">
                          <TrendingUp className="h-4 w-4" />
                          Quick Results
                        </h3>
                        <div className="space-y-2">
                          {quickResults.map((result) => (
                            <button
                              key={result.id}
                              onClick={() => handleQuickResultClick(result)}
                              className="w-full text-left p-3 hover:bg-blue-50 rounded-lg border border-gray-100 hover:border-blue-200 transition-colours"
                            >
                              <div className="flex justify-between items-start">
                                <div className="flex-1">
                                  <h4 className="font-medium text-gray-900 mb-1">{result.title}</h4>
                                  <p className="text-sm text-gray-600 line-clamp-2">{result.description}</p>
                                  <span className="inline-block mt-1 text-xs px-2 py-1 bg-blue-100 text-blue-700 rounded-full">
                                    {result.category}
                                  </span>
                                </div>
                              </div>
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Suggestions */}
                    {suggestions.length > 0 && (
                      <div>
                        <h3 className="text-sm font-semibold text-gray-700 mb-3">Suggestions</h3>
                        <div className="space-y-1">
                          {suggestions.map((suggestion) => (
                            <button
                              key={suggestion.id}
                              onClick={() => handleSuggestionClick(suggestion)}
                              className="w-full text-left p-3 hover:bg-gray-50 rounded-lg flex items-centre gap-3"
                            >
                              {suggestion.type === 'recent' ? (
                                <Clock className="h-4 w-4 text-gray-400" />
                              ) : (
                                <TrendingUp className="h-4 w-4 text-blue-500" />
                              )}
                              <span className="flex-1">{suggestion.text}</span>
                              {suggestion.location && (
                                <div className="flex items-centre gap-1 text-xs text-gray-500">
                                  <MapPin className="h-3 w-3" />
                                  {suggestion.location}
                                </div>
                              )}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}

                    {isLoading && (
                      <div className="flex items-centre justify-centre py-8">
                        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
                        <span className="ml-2 text-gray-600">Searching...</span>
                      </div>
                    )}
                  </div>
                ) : (
                  /* Default State */
                  <div className="p-6">
                    {/* Popular Searches */}
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold text-gray-700 mb-3 flex items-centre gap-2">
                        <TrendingUp className="h-4 w-4" />
                        Popular Searches
                      </h3>
                      <div className="grid grid-cols-2 gap-2">
                        {popularSearches.slice(0, 4).map((term) => (
                          <button
                            key={term.id}
                            onClick={() => handleSuggestionClick(term)}
                            className="p-3 bg-gradient-to-r from-blue-50 to-indigo-50 hover:from-blue-100 hover:to-indigo-100 rounded-lg text-left border border-blue-100 hover:border-blue-200 transition-colours"
                          >
                            <span className="text-sm font-medium text-gray-900 block">{term.text}</span>
                            {term.category && (
                              <span className="text-xs text-blue-600 mt-1 block">{term.category}</span>
                            )}
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Emergency Quick Access */}
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4">
                      <h3 className="text-sm font-semibold text-red-800 mb-2">Emergency Services</h3>
                      <div className="flex gap-2">
                        {[
                          'Water damage emergency',
                          'Fire damage help',
                          'Storm damage repair'
                        ].map((emergency, index) => (
                          <button
                            key={index}
                            onClick={() => {
                              setQuery(emergency);
                              handleSearch(new Event('submit') as any);
                            }}
                            className="px-3 py-1 bg-red-100 hover:bg-red-200 text-red-800 rounded-full text-xs font-medium transition-colours"
                          >
                            {emergency}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Search Footer */}
              <div className="px-6 py-3 bg-gray-50 border-t">
                <div className="flex items-centre justify-between text-xs text-gray-500">
                  <span>Press ESC to close</span>
                  <div className="flex items-centre gap-4">
                    <button 
                      onClick={() => router.push('/search')}
                      className="flex items-centre gap-1 hover:text-blue-600 transition-colours"
                    >
                      <Filter className="h-3 w-3" />
                      Advanced Search
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}