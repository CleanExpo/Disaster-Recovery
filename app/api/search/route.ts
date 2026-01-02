/**
 * Unified Search API Endpoint
 * Uses PostgreSQL full-text search (no Algolia required)
 * 
 * GET /api/search?q=water+damage&type=all&state=NSW&limit=20
 */

import { NextRequest, NextResponse } from 'next/server'
import { 
  searchResources, 
  searchContractors, 
  searchLocationPages 
} from '@/lib/search/postgres-search'

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams
  const query = searchParams.get('q') || ''
  const type = searchParams.get('type') || 'all'
  const state = searchParams.get('state') || undefined
  const category = searchParams.get('category') || undefined
  const limit = parseInt(searchParams.get('limit') || '20', 10)
  const offset = parseInt(searchParams.get('offset') || '0', 10)

  if (!query || query.trim().length < 2) {
    return NextResponse.json({ 
      error: 'Query must be at least 2 characters',
      results: { resources: [], contractors: [], locations: [] }
    }, { status: 400 })
  }

  try {
    const results: Record<string, any> = {}

    // Search based on type
    if (type === 'all' || type === 'resources') {
      results.resources = await searchResources({ 
        query, 
        category, 
        state, 
        limit, 
        offset 
      })
    }

    if (type === 'all' || type === 'contractors') {
      results.contractors = await searchContractors({ 
        query, 
        state, 
        limit 
      })
    }

    if (type === 'all' || type === 'locations') {
      results.locations = await searchLocationPages(query, limit)
    }

    return NextResponse.json({
      query,
      type,
      results,
      meta: {
        searchEngine: 'postgresql-fulltext',
        timestamp: new Date().toISOString()
      }
    })
  } catch (error) {
    console.error('Search API error:', error)
    return NextResponse.json({ 
      error: 'Search failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
