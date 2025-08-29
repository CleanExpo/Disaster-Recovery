import { NextRequest, NextResponse } from 'next/server';

export interface SearchParams {
  q?: string;
  category?: string;
  location?: string;
  type?: 'service' | 'contractor' | 'article' | 'location';
  minRating?: number;
  maxResponseTime?: number;
  emergencyOnly?: boolean;
  insuranceApproved?: boolean;
  certifiedOnly?: boolean;
  sortBy?: 'relevance' | 'rating' | 'location' | 'price' | 'responseTime';
  page?: number;
  limit?: number;
}

interface SearchResult {
  id: string;
  type: 'service' | 'contractor' | 'article' | 'location';
  title: string;
  description: string;
  category: string;
  location?: string;
  rating?: number;
  responseTime?: string;
  price?: number;
  image?: string;
  tags: string[];
  url: string;
  priority?: 'emergency' | 'urgent' | 'normal';
  metadata: Record<string, any>;
  relevanceScore: number;
}

// Extended mock data for comprehensive search functionality
const searchDatabase: SearchResult[] = [
  {
    id: 'service-water-damage-emergency',
    type: 'service',
    title: 'Emergency Water Damage Restoration',
    description: '24/7 emergency water damage restoration with rapid response. Professional water extraction, structural drying, and mold prevention services.',
    category: 'Water Damage',
    location: 'Brisbane CBD',
    rating: 4.9,
    responseTime: '< 30 minutes',
    price: 150,
    tags: ['emergency', 'water damage', 'flood', 'burst pipes', 'insurance approved', '24/7', 'IICRC certified'],
    url: '/services/emergency-water-damage',
    priority: 'emergency',
    metadata: {
      certifications: ['IICRC', 'WRT', 'ASD'],
      insuranceApproved: true,
      emergencyAvailable: true,
      servicesOffered: ['water extraction', 'structural drying', 'mold prevention', 'damage assessment']
    },
    relevanceScore: 0
  },
  {
    id: 'service-fire-damage-restoration',
    type: 'service',
    title: 'Fire and Smoke Damage Restoration',
    description: 'Complete fire damage restoration including smoke removal, odor elimination, structural repairs, and content cleaning.',
    category: 'Fire Damage',
    location: 'Gold Coast',
    rating: 4.8,
    responseTime: '< 45 minutes',
    price: 200,
    tags: ['fire damage', 'smoke removal', 'odor elimination', 'structural repair', 'content cleaning', 'insurance approved'],
    url: '/services/fire-damage-restoration',
    priority: 'urgent',
    metadata: {
      certifications: ['IICRC', 'FSRT'],
      insuranceApproved: true,
      emergencyAvailable: true,
      servicesOffered: ['fire damage restoration', 'smoke removal', 'odor elimination', 'content cleaning']
    },
    relevanceScore: 0
  },
  {
    id: 'contractor-elite-restoration',
    type: 'contractor',
    title: 'Elite Restoration Services',
    description: 'Premier IICRC certified restoration contractor with 15+ years experience. Specializing in water damage, fire restoration, and emergency response.',
    category: 'Restoration Contractor',
    location: 'Sydney',
    rating: 4.9,
    responseTime: '< 20 minutes',
    tags: ['IICRC certified', 'experienced', 'insurance approved', 'comprehensive', 'emergency response', 'water damage', 'fire restoration'],
    url: '/contractors/elite-restoration',
    metadata: {
      certifications: ['IICRC', 'WRT', 'FSRT', 'ASD', 'CCT'],
      insuranceApproved: true,
      emergencyAvailable: true,
      yearsExperience: 15,
      serviceAreas: ['Sydney', 'Central Coast', 'Blue Mountains']
    },
    relevanceScore: 0
  },
  {
    id: 'article-water-damage-guide',
    type: 'article',
    title: 'Complete Water Damage Emergency Response Guide',
    description: 'Step-by-step guide on handling water damage emergencies. Immediate actions, safety precautions, and when to call professionals.',
    category: 'Emergency Guide',
    tags: ['water damage', 'emergency response', 'prevention', 'DIY tips', 'safety', 'insurance claims'],
    url: '/resources/water-damage-emergency-guide',
    metadata: {
      readTime: '8 minutes',
      lastUpdated: '2024-01-15',
      difficulty: 'beginner',
      topics: ['emergency response', 'safety', 'prevention', 'insurance']
    },
    relevanceScore: 0
  },
  {
    id: 'service-mold-remediation',
    type: 'service',
    title: 'Professional Mold Inspection and Remediation',
    description: 'Comprehensive mold services including inspection, testing, safe removal, and prevention strategies. Health-focused approach.',
    category: 'Mold Services',
    location: 'Melbourne',
    rating: 4.7,
    responseTime: '< 2 hours',
    price: 120,
    tags: ['mold remediation', 'health safety', 'prevention', 'inspection', 'testing', 'air quality'],
    url: '/services/mold-remediation',
    priority: 'normal',
    metadata: {
      certifications: ['IICRC', 'AMRT'],
      insuranceApproved: true,
      emergencyAvailable: false,
      servicesOffered: ['mold inspection', 'air quality testing', 'mold removal', 'prevention consulting']
    },
    relevanceScore: 0
  },
  {
    id: 'service-storm-damage-repair',
    type: 'service',
    title: 'Storm Damage Repair and Recovery',
    description: 'Complete storm damage restoration including roof repairs, water intrusion, structural damage, and emergency tarping services.',
    category: 'Storm Damage',
    location: 'Perth',
    rating: 4.6,
    responseTime: '< 1 hour',
    price: 180,
    tags: ['storm damage', 'roof repair', 'emergency tarping', 'water intrusion', 'structural damage', 'insurance claims'],
    url: '/services/storm-damage-repair',
    priority: 'urgent',
    metadata: {
      certifications: ['IICRC', 'WRT'],
      insuranceApproved: true,
      emergencyAvailable: true,
      servicesOffered: ['emergency tarping', 'roof repair', 'water extraction', 'structural assessment']
    },
    relevanceScore: 0
  }
];

function calculateRelevanceScore(item: SearchResult, query: string): number {
  let score = 0;
  const queryLower = query.toLowerCase();

  // Title match (highest weight)
  if (item.title.toLowerCase().includes(queryLower)) {
    score += 100;
    if (item.title.toLowerCase().startsWith(queryLower)) {
      score += 50; // Bonus for starting with query
    }
  }

  // Tag matches (high weight)
  const tagMatches = item.tags.filter(tag => tag.toLowerCase().includes(queryLower));
  score += tagMatches.length * 30;

  // Category match (medium weight)
  if (item.category.toLowerCase().includes(queryLower)) {
    score += 40;
  }

  // Description match (lower weight)
  if (item.description.toLowerCase().includes(queryLower)) {
    score += 20;
  }

  // Exact matches get bonus
  if (item.title.toLowerCase() === queryLower) {
    score += 200;
  }

  // Priority bonus
  switch (item.priority) {
    case 'emergency':
      score += 15;
      break;
    case 'urgent':
      score += 10;
      break;
  }

  return score;
}

function filterResults(results: SearchResult[], params: SearchParams): SearchResult[] {
  return results.filter(item => {
    // Type filter
    if (params.type && item.type !== params.type) {
      return false;
    }

    // Category filter
    if (params.category && params.category !== 'All Categories' && item.category !== params.category) {
      return false;
    }

    // Location filter
    if (params.location && params.location !== 'All Locations' && 
        (!item.location || !item.location.includes(params.location))) {
      return false;
    }

    // Rating filter
    if (params.minRating && (!item.rating || item.rating < params.minRating)) {
      return false;
    }

    // Emergency only filter
    if (params.emergencyOnly && !item.metadata.emergencyAvailable) {
      return false;
    }

    // Insurance approved filter
    if (params.insuranceApproved && !item.metadata.insuranceApproved) {
      return false;
    }

    // Certified only filter
    if (params.certifiedOnly && (!item.metadata.certifications || item.metadata.certifications.length === 0)) {
      return false;
    }

    return true;
  });
}

function sortResults(results: SearchResult[], sortBy: string = 'relevance'): SearchResult[] {
  return results.sort((a, b) => {
    switch (sortBy) {
      case 'rating':
        return (b.rating || 0) - (a.rating || 0);
      case 'location':
        return (a.location || '').localeCompare(b.location || '');
      case 'price':
        return (a.price || 0) - (b.price || 0);
      case 'responseTime':
        const getMinutes = (time: string = '') => {
          const match = time.match(/< (\d+)/);
          return match ? parseInt(match[1]) : 999;
        };
        return getMinutes(a.responseTime) - getMinutes(b.responseTime);
      case 'relevance':
      default:
        return b.relevanceScore - a.relevanceScore;
    }
  });
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const params: SearchParams = {
      q: searchParams.get('q') || undefined,
      category: searchParams.get('category') || undefined,
      location: searchParams.get('location') || undefined,
      type: (searchParams.get('type') as any) || undefined,
      minRating: searchParams.get('minRating') ? parseFloat(searchParams.get('minRating')!) : undefined,
      emergencyOnly: searchParams.get('emergencyOnly') === 'true',
      insuranceApproved: searchParams.get('insuranceApproved') === 'true',
      certifiedOnly: searchParams.get('certifiedOnly') === 'true',
      sortBy: (searchParams.get('sortBy') as any) || 'relevance',
      page: parseInt(searchParams.get('page') || '1'),
      limit: parseInt(searchParams.get('limit') || '10')
    };

    let results = [...searchDatabase];

    // Calculate relevance scores if there's a query
    if (params.q) {
      results.forEach(item => {
        item.relevanceScore = calculateRelevanceScore(item, params.q!);
      });
      
      // Filter by relevance threshold
      results = results.filter(item => item.relevanceScore > 0);
    } else {
      // If no query, give all items a base relevance score
      results.forEach(item => {
        item.relevanceScore = item.priority === 'emergency' ? 50 : 
                             item.priority === 'urgent' ? 30 : 10;
      });
    }

    // Apply filters
    results = filterResults(results, params);

    // Sort results
    results = sortResults(results, params.sortBy);

    // Pagination
    const startIndex = ((params.page || 1) - 1) * (params.limit || 10);
    const endIndex = startIndex + (params.limit || 10);
    const paginatedResults = results.slice(startIndex, endIndex);

    // Generate search suggestions if no results
    const suggestions = params.q ? [
      'water damage restoration',
      'fire damage repair',
      'emergency services',
      'mold remediation',
      'storm damage repair',
      'insurance approved contractors'
    ].filter(s => s.toLowerCase().includes(params.q!.toLowerCase())).slice(0, 5) : [];

    return NextResponse.json({
      success: true,
      data: {
        results: paginatedResults,
        pagination: {
          page: params.page || 1,
          limit: params.limit || 10,
          total: results.length,
          totalPages: Math.ceil(results.length / (params.limit || 10))
        },
        facets: {
          categories: [...new Set(searchDatabase.map(item => item.category))],
          locations: [...new Set(searchDatabase.map(item => item.location).filter(Boolean))],
          types: [...new Set(searchDatabase.map(item => item.type))]
        },
        suggestions: results.length === 0 ? suggestions : [],
        query: params.q
      }
    });

  } catch (error) {
    console.error('Search API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Search failed',
      error: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const params: SearchParams = body;

    // This would handle more complex search scenarios
    // For now, redirect to GET with query parameters
    const queryString = new URLSearchParams(params as any).toString();
    const results = await GET(new NextRequest(`${request.url}?${queryString}`));
    
    return results;
  } catch (error) {
    console.error('Search POST API error:', error);
    return NextResponse.json({
      success: false,
      message: 'Search failed'
    }, { status: 500 });
  }
}