'use client';

import React, { useState, useEffect, useMemo, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { 
  Search, 
  Filter, 
  X, 
  MapPin, 
  Calendar,
  Star,
  Clock,
  Phone,
  Droplets,
  Flame,
  Wind,
  Home,
  Building2,
  Shield,
  TrendingUp,
  ChevronDown,
  SlidersHorizontal
} from 'lucide-react';

interface SearchResult {
  id: string;
  type: 'service' | 'contractor' | 'article' | 'location';
  title: string;
  description: string;
  category: string;
  location?: string;
  rating?: number;
  responseTime?: string;
  image?: string;
  tags: string[];
  url: string;
  priority?: 'emergency' | 'urgent' | 'normal';
}

// Mock search data - in production this would come from your API/database
const mockSearchData: SearchResult[] = [
  {
    id: '1',
    type: 'service',
    title: 'Emergency Water Damage Restoration',
    description: '24/7 water damage restoration services with rapid response times. Professional water extraction, drying, and mould prevention.',
    category: 'Water Damage',
    location: 'Brisbane CBD',
    rating: 4.9,
    responseTime: '< 30 minutes',
    tags: ['emergency', 'water damage', 'flood', 'burst pipes', 'insurance approved'],
    url: '/services/water-damage',
    priority: 'emergency'
  },
  {
    id: '2',
    type: 'service',
    title: 'Fire and Smoke Damage Restoration',
    description: 'Complete fire damage restoration including smoke removal, odour elimination, and structural repairs.',
    category: 'Fire Damage',
    location: 'Gold Coast',
    rating: 4.8,
    responseTime: '< 45 minutes',
    tags: ['fire damage', 'smoke removal', 'odour elimination', 'structural repair'],
    url: '/services/fire-damage',
    priority: 'urgent'
  },
  {
    id: '3',
    type: 'contractor',
    title: 'Elite Restoration Services',
    description: 'IICRC certified restoration contractor specialising in water and fire damage. 15+ years experience.',
    category: 'Restoration Contractor',
    location: 'Sydney',
    rating: 4.9,
    tags: ['IICRC certified', 'experienced', 'insurance approved', 'comprehensive'],
    url: '/contractors/elite-restoration'
  },
  {
    id: '4',
    type: 'article',
    title: 'How to Handle Water Damage: Emergency Response Guide',
    description: 'Complete guide on immediate steps to take when dealing with water damage in your property.',
    category: 'Emergency Guide',
    tags: ['water damage', 'emergency response', 'prevention', 'DIY tips'],
    url: '/resources/water-damage-guide'
  },
  {
    id: '5',
    type: 'service',
    title: 'Mould Remediation and Prevention',
    description: 'Professional mould inspection, removal, and prevention services to protect your property and health.',
    category: 'Mould Services',
    location: 'Melbourne',
    rating: 4.7,
    responseTime: '< 2 hours',
    tags: ['mould remediation', 'health safety', 'prevention', 'inspection'],
    url: '/services/mould-remediation'
  }
];

const categories = [
  'All Categories',
  'Water Damage',
  'Fire Damage', 
  'Mould Services',
  'Storm Damage',
  'Restoration Contractor',
  'Emergency Guide'
];

const locations = [
  'All Locations',
  'Brisbane',
  'Sydney',
  'Melbourne',
  'Gold Coast',
  'Perth',
  'Adelaide'
];

function SearchPageContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  const [query, setQuery] = useState(searchParams?.get('q') || '');
  const [selectedCategory, setSelectedCategory] = useState('All Categories');
  const [selectedLocation, setSelectedLocation] = useState('All Locations');
  const [sortBy, setSortBy] = useState('relevance');
  const [showFilters, setShowFilters] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Simulate search with loading state
  useEffect(() => {
    if (query) {
      setIsLoading(true);
      const timer = setTimeout(() => setIsLoading(false), 500);
      return () => clearTimeout(timer);
    }
  }, [query]);

  // Filter and sort results
  const filteredResults = useMemo(() => {
    let results = mockSearchData;

    // Filter by search query
    if (query) {
      results = results.filter(item => 
        item.title.toLowerCase().includes(query.toLowerCase()) ||
        item.description.toLowerCase().includes(query.toLowerCase()) ||
        item.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
    }

    // Filter by category
    if (selectedCategory !== 'All Categories') {
      results = results.filter(item => item.category === selectedCategory);
    }

    // Filter by location
    if (selectedLocation !== 'All Locations') {
      results = results.filter(item => 
        item.location?.includes(selectedLocation)
      );
    }

    // Sort results
    switch (sortBy) {
      case 'rating':
        results.sort((a, b) => (b.rating || 0) - (a.rating || 0));
        break;
      case 'location':
        results.sort((a, b) => (a.location || '').localeCompare(b.location || ''));
        break;
      case 'priority':
        const priorityOrder = { 'emergency': 3, 'urgent': 2, 'normal': 1 };
        results.sort((a, b) => (priorityOrder[b.priority as keyof typeof priorityOrder] || 0) - 
                              (priorityOrder[a.priority as keyof typeof priorityOrder] || 0));
        break;
      default: // relevance
        break;
    }

    return results;
  }, [query, selectedCategory, selectedLocation, sortBy]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      router.push(`/search?q=${encodeURIComponent(query)}`);
    }
  };

  const getIcon = (type: string, category: string) => {
    switch (category) {
      case 'Water Damage': return <Droplets className="h-5 w-5 text-blue-500" />;
      case 'Fire Damage': return <Flame className="h-5 w-5 text-red-500" />;
      case 'Mould Services': return <Wind className="h-5 w-5 text-green-500" />;
      case 'Storm Damage': return <Home className="h-5 w-5 text-purple-500" />;
      case 'Restoration Contractor': return <Building2 className="h-5 w-5 text-orange-500" />;
      default: return <Shield className="h-5 w-5 text-gray-500" />;
    }
  };

  const getPriorityBadge = (priority?: string) => {
    switch (priority) {
      case 'emergency':
        return <span className="px-2 py-1 bg-red-100 text-red-800 text-xs font-medium rounded-full">Emergency</span>;
      case 'urgent':
        return <span className="px-2 py-1 bg-orange-100 text-orange-800 text-xs font-medium rounded-full">Urgent</span>;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Search Header */}
      <div className="bg-white border-b sticky top-0 z-40">
        <div className="container mx-auto px-4 py-6">
          <form onSubmit={handleSearch} className="mb-4">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for services, contractors, or emergency help..."
                className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              {query && (
                <button
                  type="button"
                  onClick={() => setQuery('')}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-full"
                >
                  <X className="h-4 w-4 text-gray-400" />
                </button>
              )}
            </div>
          </form>

          {/* Filter Bar */}
          <div className="flex flex-wrap items-center gap-4 max-w-4xl mx-auto">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-lg transition-colours"
            >
              <SlidersHorizontal className="h-4 w-4" />
              Filters
              <ChevronDown className={`h-4 w-4 transition-transform ${showFilters ? 'rotate-180' : ''}`} />
            </button>

            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {categories.map(category => (
                <option key={category} value={category}>{category}</option>
              ))}
            </select>

            <select
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              {locations.map(location => (
                <option key={location} value={location}>{location}</option>
              ))}
            </select>

            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            >
              <option value="relevance">Sort by Relevance</option>
              <option value="rating">Sort by Rating</option>
              <option value="location">Sort by Location</option>
              <option value="priority">Sort by Priority</option>
            </select>
          </div>

          {/* Advanced Filters Panel */}
          {showFilters && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg max-w-4xl mx-auto">
              <h3 className="font-semibold mb-3">Advanced Filters</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Service Type</label>
                  <div className="space-y-2">
                    {['Emergency Response', '24/7 Available', 'Insurance Approved', 'IICRC Certified'].map(option => (
                      <label key={option} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{option}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Response Time</label>
                  <div className="space-y-2">
                    {['< 30 minutes', '< 1 hour', '< 2 hours', 'Same day'].map(time => (
                      <label key={time} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{time}</span>
                      </label>
                    ))}
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Rating</label>
                  <div className="space-y-2">
                    {['4.5+ stars', '4.0+ stars', '3.5+ stars', 'Any rating'].map(rating => (
                      <label key={rating} className="flex items-center">
                        <input type="checkbox" className="mr-2" />
                        <span className="text-sm">{rating}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Results */}
      <div className="container mx-auto px-4 py-8">
        {/* Results Header */}
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">
              {query ? `Search Results for "${query}"` : 'Browse Services'}
            </h1>
            <p className="text-gray-600 mt-1">
              {isLoading ? 'Searching...' : `${filteredResults.length} results found`}
            </p>
          </div>
        </div>

        {/* Loading State */}
        {isLoading ? (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            <span className="ml-2 text-gray-600">Searching...</span>
          </div>
        ) : (
          /* Results Grid */
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {filteredResults.map((result) => (
              <div key={result.id} className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    {getIcon(result.type, result.category)}
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600">
                        <a href={result.url}>{result.title}</a>
                      </h3>
                      <p className="text-sm text-gray-500">{result.category}</p>
                    </div>
                  </div>
                  {getPriorityBadge(result.priority)}
                </div>

                <p className="text-gray-600 mb-4">{result.description}</p>

                <div className="flex flex-wrap gap-4 mb-4 text-sm text-gray-500">
                  {result.location && (
                    <div className="flex items-center gap-1">
                      <MapPin className="h-4 w-4" />
                      <span>{result.location}</span>
                    </div>
                  )}
                  {result.rating && (
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 text-yellow-400 fill-current" />
                      <span>{result.rating}/5</span>
                    </div>
                  )}
                  {result.responseTime && (
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4" />
                      <span>Response: {result.responseTime}</span>
                    </div>
                  )}
                </div>

                <div className="flex flex-wrap gap-2 mb-4">
                  {result.tags.slice(0, 3).map((tag, index) => (
                    <span
                      key={index}
                      className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded-full"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                <div className="flex gap-3">
                  <a
                    href={result.url}
                    className="flex-1 px-4 py-2 bg-blue-600 text-white text-center rounded-lg hover:bg-blue-700 transition-colours"
                  >
                    View Details
                  </a>
                  {result.type === 'service' && (
                    <button className="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colours flex items-center gap-2">
                      <Phone className="h-4 w-4" />
                      Contact
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* No Results */}
        {!isLoading && filteredResults.length === 0 && query && (
          <div className="text-center py-12">
            <div className="max-w-md mx-auto">
              <Search className="h-16 w-16 text-gray-300 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-900 mb-2">No results found</h3>
              <p className="text-gray-500 mb-4">
                We couldn't find anything matching "{query}". Try adjusting your search or filters.
              </p>
              <div className="space-y-2">
                <p className="text-sm text-gray-600">Try searching for:</p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {['water damage', 'fire restoration', 'emergency services'].map(suggestion => (
                    <button
                      key={suggestion}
                      onClick={() => setQuery(suggestion)}
                      className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm hover:bg-blue-200"
                    >
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading search...</p>
        </div>
      </div>
    }>
      <SearchPageContent />
    </Suspense>
  );
}