# Competitor Analysis Dashboard

## Overview

A comprehensive, production-ready competitor intelligence dashboard that visualizes competitive analysis data from SEMRUSH and DataForSEO APIs. The dashboard provides real-time insights into competitor performance, keyword opportunities, SWOT analysis, and ranking tracking.

## Features

### 1. Overview Cards
- **Total Competitors**: Active competitors being tracked
- **Keywords Tracked**: Total keywords monitored across all competitors
- **Opportunities**: High-value keyword targets identified
- **Last Analysis**: Most recent analysis date and average domain rating

### 2. Competitor Table
- **Comprehensive List**: All 40 competitors with sortable columns
- **Real-time Metrics**: Traffic, keywords, domain rating (DR)
- **Category Filtering**: Filter by competitor type
- **Priority System**: 1-10 scale with visual indicators
- **Quick Actions**:
  - Analyze: Trigger new analysis
  - View Details: See full competitor profile
  - View SWOT: Open SWOT analysis

### 3. Keyword Opportunity Matrix
- **Interactive Bubble Chart**:
  - X-axis: Search volume
  - Y-axis: Keyword difficulty
  - Bubble size: Opportunity score
  - Color: Difficulty tier (easy/medium/hard)
- **Smart Filtering**: By difficulty tier and search term
- **Top 10 Table**: Best opportunities ranked
- **Click-to-Details**: Interactive bubbles

### 4. SWOT Analysis
- **Four Quadrants**:
  - Strengths (green)
  - Weaknesses (red)
  - Opportunities (blue)
  - Threats (orange)
- **Impact Levels**: High, medium, low classification
- **Executive Summary**: AI-generated insights
- **Recommendations**: Actionable strategic advice
- **Competitive Advantages**: What competitors do better

### 5. Ranking Tracker
- **Top 20 Keywords**: Current rankings only
- **Position Tracking**: Current vs previous position
- **Trend Visualization**: 30-day sparkline charts
- **Category Filtering**: By service type
- **Change Indicators**: Visual arrows showing improvement/decline

## Technology Stack

### Frontend
- **React 19**: Latest features including Server Components
- **Next.js 15**: App Router with streaming
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first styling
- **Recharts**: Chart visualizations
- **SWR**: Data fetching and caching
- **Lucide Icons**: Modern icon system

### Backend
- **Prisma ORM**: Database management
- **PostgreSQL**: Relational database
- **Next.js API Routes**: Serverless functions
- **SEMRUSH API**: SEO data provider
- **DataForSEO API**: Additional SEO metrics

## File Structure

```
app/
├── dashboard/
│   └── admin/
│       └── competitors/
│           └── page.tsx                    # Main dashboard page
├── api/
│   └── competitor-analysis/
│       ├── overview/
│       │   └── route.ts                    # Overview metrics
│       ├── competitors/
│       │   └── route.ts                    # Competitor list
│       ├── opportunities/
│       │   └── route.ts                    # Keyword opportunities
│       ├── keywords/
│       │   └── route.ts                    # Keywords list
│       ├── swot/
│       │   └── [id]/
│       │       └── route.ts                # SWOT detail
│       └── analyze/
│           └── [id]/
│               └── route.ts                # Trigger analysis

src/
├── components/
│   └── competitor-analysis/
│       ├── competitor-table.tsx            # Competitor table component
│       ├── keyword-matrix.tsx              # Bubble chart component
│       ├── swot-quadrants.tsx              # SWOT visualization
│       └── ranking-tracker.tsx             # Ranking tracker
└── lib/
    └── competitor-analysis/
        ├── types/
        │   └── dashboard-types.ts          # TypeScript definitions
        └── services/
            └── competitor-analysis-service.ts # Analysis service
```

## API Endpoints

### GET /api/competitor-analysis/overview
Returns dashboard overview metrics.

**Response:**
```json
{
  "totalCompetitors": 40,
  "totalKeywords": 12500,
  "totalOpportunities": 234,
  "lastAnalysisDate": "2025-12-28T10:00:00Z",
  "avgDomainRating": 65.5,
  "avgOrganicTraffic": 125000
}
```

### GET /api/competitor-analysis/competitors
Returns all competitors with latest metrics.

**Query Parameters:**
- `category`: Filter by competitor category
- `isActive`: Filter active/inactive (default: true)
- `priority`: Minimum priority level
- `limit`: Number of results (default: 50)
- `offset`: Pagination offset (default: 0)

**Response:**
```json
[
  {
    "id": "clx123",
    "name": "ServiceMaster",
    "domain": "servicemaster.com.au",
    "category": "RESTORATION_COMPANY",
    "priority": 10,
    "lastAnalyzed": "2025-12-27T15:30:00Z",
    "traffic": 45000,
    "keywords": 1250,
    "domainRating": 72,
    "isActive": true
  }
]
```

### GET /api/competitor-analysis/opportunities
Returns keyword opportunities for targeting.

**Response:**
```json
[
  {
    "id": "clx456",
    "keyword": "emergency water damage repair sydney",
    "searchVolume": 2400,
    "difficulty": 35.5,
    "cpc": 12.50,
    "intent": "commercial",
    "opportunityScore": 0.85,
    "difficultyTier": "easy",
    "competitorCount": 3,
    "averagePosition": 15.2,
    "topCompetitor": "ServiceMaster"
  }
]
```

### GET /api/competitor-analysis/keywords
Returns all tracked keywords with ranking data.

**Query Parameters:**
- `competitorId`: Filter by competitor
- `category`: Filter by category
- `limit`: Number of results (default: 100)

**Response:**
```json
[
  {
    "id": "clx789",
    "competitorId": "clx123",
    "keyword": "water damage restoration",
    "searchVolume": 1200,
    "difficulty": 45.2,
    "cpc": 8.75,
    "position": 5,
    "previousPosition": 7,
    "url": "https://example.com/water-damage",
    "intent": "commercial",
    "category": "water damage",
    "opportunityScore": 0.75,
    "difficultyTier": "medium",
    "lastChecked": "2025-12-28T10:00:00Z"
  }
]
```

### GET /api/competitor-analysis/swot/[id]
Returns SWOT analysis for a specific competitor.

**Response:**
```json
{
  "id": "clx999",
  "competitorId": "clx123",
  "strengths": [
    {
      "title": "Established Brand",
      "description": "40+ years in Australian market",
      "impact": "high",
      "category": "Brand"
    }
  ],
  "weaknesses": [
    {
      "title": "Slow Mobile Site",
      "description": "Mobile page speed score of 45/100",
      "impact": "medium",
      "category": "Technical SEO"
    }
  ],
  "opportunities": [
    {
      "title": "Local SEO Gap",
      "description": "Missing Google Business Profile in 5 regions",
      "impact": "high",
      "category": "Local SEO"
    }
  ],
  "threats": [
    {
      "title": "New Market Entrants",
      "description": "3 new competitors entered Sydney market",
      "impact": "medium",
      "category": "Competition"
    }
  ],
  "summary": "ServiceMaster maintains strong brand recognition...",
  "recommendations": [
    "Focus on mobile page speed optimization",
    "Expand Google Business Profile coverage",
    "Target long-tail local keywords"
  ],
  "competitiveAdvantages": [
    "Comprehensive service coverage across Australia",
    "Strong insurance network relationships"
  ],
  "generatedAt": "2025-12-27T15:30:00Z",
  "generatedBy": "AI"
}
```

### POST /api/competitor-analysis/analyze/[id]
Triggers analysis for a specific competitor.

**Response:**
```json
{
  "success": true,
  "message": "Analysis started",
  "competitorId": "clx123"
}
```

## Usage Examples

### Basic Dashboard Access
```typescript
// Navigate to dashboard
// URL: /dashboard/admin/competitors

// Data is automatically fetched via SWR
// Components handle loading and error states
```

### Trigger Manual Analysis
```typescript
const handleAnalyze = async (competitorId: string) => {
  const response = await fetch(`/api/competitor-analysis/analyze/${competitorId}`, {
    method: 'POST',
  });

  if (response.ok) {
    // Analysis started in background
    // Refresh data after a delay
    setTimeout(() => mutate(), 30000); // 30 seconds
  }
};
```

### Filter Competitors
```typescript
// In CompetitorTable component
<CompetitorTable
  competitors={competitors}
  onAnalyze={handleAnalyze}
  onViewDetails={handleViewDetails}
  onViewSWOT={handleViewSWOT}
/>

// Users can filter by:
// - Search term (name/domain)
// - Category
// - Priority range
// - Active/inactive status
```

### View Keyword Opportunities
```typescript
// In KeywordMatrix component
<KeywordMatrix
  opportunities={opportunities}
  onKeywordClick={(keyword) => {
    console.log('Selected keyword:', keyword);
    // Navigate to keyword detail or create content brief
  }}
/>

// Interactive features:
// - Click bubbles to view details
// - Filter by difficulty tier
// - Search keywords
// - View top 10 table
```

## Performance Optimizations

### Data Caching
- **SWR**: Client-side caching with automatic revalidation
- **Stale-while-revalidate**: Show cached data while fetching fresh data
- **Deduplication**: Prevent duplicate requests

### Component Optimization
- **React.memo**: Prevent unnecessary re-renders
- **useMemo**: Memoize expensive calculations
- **useCallback**: Stable function references

### API Optimization
- **Database Indexing**: Optimized queries with indexes
- **Selective Loading**: Only fetch required data
- **Pagination**: Limit result sets

## Mobile Responsiveness

### Breakpoints
- **Mobile**: < 640px (sm)
- **Tablet**: 640px - 1024px (md-lg)
- **Desktop**: > 1024px (lg+)

### Responsive Features
- **Grid Layouts**: Adapt from 4 columns to 1 column
- **Tables**: Horizontal scroll on mobile
- **Charts**: Responsive containers
- **Navigation**: Hamburger menu on mobile

## Error Handling

### Network Errors
```typescript
// SWR handles errors automatically
const { data, error } = useSWR('/api/competitor-analysis/overview', fetcher);

if (error) {
  // Display error message
  return <ErrorAlert message="Failed to load data" />;
}
```

### Validation Errors
```typescript
// API routes validate input
try {
  const validatedData = schema.parse(body);
} catch (error) {
  return NextResponse.json(
    { error: 'Invalid input', details: error.errors },
    { status: 400 }
  );
}
```

### Loading States
```typescript
// Show loading indicators
if (!data && !error) {
  return <LoadingSpinner />;
}
```

## Accessibility

### Keyboard Navigation
- Tab through interactive elements
- Enter to activate buttons
- Arrow keys for table sorting

### Screen Readers
- Semantic HTML elements
- ARIA labels on icons
- Alt text on charts (via tooltips)

### Color Contrast
- WCAG AA compliant
- Text: 4.5:1 minimum
- Large text: 3:1 minimum

## Future Enhancements

### Phase 24 (Q1 2025)
- [ ] Real-time updates via WebSockets
- [ ] Export to PDF/Excel
- [ ] Custom date range filtering
- [ ] Competitor comparison view
- [ ] Email alerts for ranking changes

### Phase 25 (Q2 2025)
- [ ] AI-powered content recommendations
- [ ] Automated SWOT generation
- [ ] Backlink analysis dashboard
- [ ] Content gap analysis
- [ ] Competitive intelligence reports

## Testing

### Unit Tests
```bash
npm run test:unit
```

### Integration Tests
```bash
npm run test:integration
```

### E2E Tests
```bash
npm run test:e2e
```

## Deployment

### Development
```bash
npm run dev
# Navigate to http://localhost:3000/dashboard/admin/competitors
```

### Production
```bash
npm run build
npm run start
```

### Environment Variables
```env
# Database
DATABASE_URL="postgresql://user:password@localhost:5432/nrpg"

# APIs
SEMRUSH_API_KEY="your-semrush-key"
DATAFORSEO_USERNAME="your-dataforseo-username"
DATAFORSEO_PASSWORD="your-dataforseo-password"

# Next.js
NEXT_PUBLIC_APP_URL="https://nrpg.com.au"
```

## Troubleshooting

### Issue: Data not loading
**Solution**: Check API keys and database connection

### Issue: Charts not rendering
**Solution**: Ensure Recharts is installed: `npm install recharts`

### Issue: SWR not caching
**Solution**: Verify fetcher function and SWR configuration

### Issue: Performance issues
**Solution**: Enable React DevTools Profiler and optimize re-renders

## Support

For issues or questions:
- GitHub Issues: [repository-url]
- Email: dev@nrpg.com.au
- Documentation: [docs-url]

## License

Copyright 2025 NRPG Platform. All rights reserved.

---

**Last Updated**: 2025-12-28
**Version**: 1.0.0
**Status**: Production Ready
