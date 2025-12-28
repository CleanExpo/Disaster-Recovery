# Competitor Analysis System Architecture

## System Overview

The Competitor Analysis System is a production-ready backend infrastructure designed to analyze 40 competitors in the Australian disaster recovery market. It integrates with SEMRUSH and DataForSEO APIs to provide comprehensive competitive intelligence.

## Architecture Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                         Client Layer                             │
├─────────────────────────────────────────────────────────────────┤
│  Next.js API Routes (/api/competitor-analysis/*)                │
│  - Competitors Management                                        │
│  - Trigger Analysis                                              │
│  - Keyword Gap Analysis                                          │
│  - SWOT Analysis                                                 │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                      Service Layer                               │
├─────────────────────────────────────────────────────────────────┤
│  Competitor Analysis Service                                     │
│  - analyzeCompetitor()                                           │
│  - analyzeAllCompetitors()                                       │
│  - refreshAnalysis()                                             │
│                                                                  │
│  Keyword Gap Service                                             │
│  - findKeywordGaps()                                             │
│  - classifyOpportunities()                                       │
│  - calculateOpportunityScore()                                   │
│                                                                  │
│  SWOT Analysis Service                                           │
│  - generateSWOT()                                                │
│  - identifyStrengths/Weaknesses/Opportunities/Threats()          │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                   Background Job Layer                           │
├─────────────────────────────────────────────────────────────────┤
│  Analysis Scheduler                    Analysis Worker           │
│  - Daily (2 AM)                        - 5 Concurrent Jobs       │
│  - Weekly (Sun 3 AM)                   - Progress Tracking       │
│  - Rank Tracking (6h)                  - Error Recovery          │
│  - Monthly (1st @ 4 AM)                - Event Logging           │
│                                                                  │
│  Bull Queue (Redis)                                              │
│  - Job persistence                                               │
│  - Retry logic                                                   │
│  - Priority queue                                                │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                    API Client Layer                              │
├─────────────────────────────────────────────────────────────────┤
│  Rate Limiter                                                    │
│  - Token Bucket Algorithm                                        │
│  - Priority Queue                                                │
│  - Daily Limits                                                  │
│                                                                  │
│  SEMRUSH Client            DataForSEO Client                     │
│  - Domain Overview         - SERP Data                           │
│  - Keywords                - Page Speed                          │
│  - Backlinks               - On-Page SEO                         │
│  - 24h Cache               - 12h Cache                           │
└────────────────────────┬────────────────────────────────────────┘
                         │
                         ↓
┌─────────────────────────────────────────────────────────────────┐
│                     Data Layer                                   │
├─────────────────────────────────────────────────────────────────┤
│  PostgreSQL (Prisma)                                             │
│  - Competitor                                                    │
│  - CompetitorAnalysis                                            │
│  - CompetitorKeyword                                             │
│  - Backlink                                                      │
│  - SWOTAnalysis                                                  │
│  - KeywordOpportunity                                            │
└─────────────────────────────────────────────────────────────────┘
```

## Data Flow

### 1. Single Competitor Analysis Flow

```
User Request
    ↓
POST /api/competitor-analysis/competitors/{id}/analyze
    ↓
Analysis Scheduler
    ↓
Bull Queue (Job Created: "single-competitor-analysis")
    ↓
Analysis Worker (picks up job)
    ↓
Competitor Analysis Service
    ↓
┌────────────────────────────────────────┐
│  Parallel API Calls:                   │
│  1. SEMRUSH:                           │
│     - Domain Overview                  │
│     - Organic Keywords (200)           │
│     - Backlinks (200)                  │
│                                        │
│  2. DataForSEO:                        │
│     - Page Speed (Core Web Vitals)     │
│     - Backlink Data (100)              │
└────────────────────────────────────────┘
    ↓
Data Combination & Processing
    ↓
┌────────────────────────────────────────┐
│  Database Storage:                     │
│  1. CompetitorAnalysis (metrics)       │
│  2. CompetitorKeyword (keywords)       │
│  3. Backlink (backlinks)               │
└────────────────────────────────────────┘
    ↓
SWOT Analysis Service
    ↓
SWOTAnalysis (database)
    ↓
Job Completed
    ↓
Response to User (analysis data)
```

### 2. Keyword Gap Analysis Flow

```
User Request
    ↓
POST /api/competitor-analysis/keywords/gaps
    ↓
Analysis Scheduler
    ↓
Bull Queue (Job: "keyword-gap-analysis")
    ↓
Analysis Worker
    ↓
Keyword Gap Service
    ↓
┌────────────────────────────────────────┐
│  For each competitor:                  │
│  1. Fetch keywords from SEMRUSH        │
│  2. Compare with target domain         │
│  3. Identify gaps                      │
└────────────────────────────────────────┘
    ↓
Opportunity Scoring
    ↓
┌────────────────────────────────────────┐
│  Score = (volume × 0.3) +              │
│          (difficulty × 0.4) +          │
│          (competition × 0.2) +         │
│          (position × 0.1)              │
└────────────────────────────────────────┘
    ↓
Classification (Easy/Medium/Hard)
    ↓
Database Storage (KeywordOpportunity)
    ↓
Response to User (opportunities)
```

## Component Details

### API Client Layer

#### Rate Limiter
**Purpose**: Enforce API rate limits and prevent quota exhaustion

**Algorithm**: Token Bucket
- Tokens refill continuously based on time elapsed
- Each request consumes 1 token
- Requests queue when tokens unavailable

**Configuration**:
```typescript
SEMRUSH: {
  maxRequests: 10,          // per second
  maxDailyRequests: 10000,  // per day
  maxConcurrent: 5
}

DataForSEO: {
  maxRequests: 2,           // per second
  maxDailyRequests: 2000,   // units per day
  maxConcurrent: 3
}
```

#### SEMRUSH Client
**Purpose**: Fetch competitor SEO data

**Endpoints Used**:
- `domain_ranks`: Traffic, keywords, cost estimates
- `domain_organic`: Organic keyword rankings
- `backlinks`: Backlink profile
- `domain_organic_organic`: Competitor discovery

**Response Format**: CSV (parsed to JSON)

**Caching Strategy**:
- TTL: 24 hours
- Storage: In-memory (node-cache)
- Key Format: `{method}:{domain}:{database}`

**Error Handling**:
- Retry: 3 attempts with exponential backoff
- Delay: 1s, 2s, 4s
- Timeout: 30 seconds per request

#### DataForSEO Client
**Purpose**: Fetch SERP and technical SEO data

**Endpoints Used**:
- `serp/google/organic`: Search rankings
- `on_page`: Technical SEO analysis
- `page_speed`: Core Web Vitals
- `backlinks/backlinks`: Backlink data

**API Pattern**: Task-based (submit → poll → retrieve)
- Submit task → Get task ID
- Poll every 5 seconds
- Timeout after 5 minutes

**Caching Strategy**:
- TTL: 12 hours
- Storage: In-memory (node-cache)
- Key Format: `{method}:{url}`

### Service Layer

#### Competitor Analysis Service
**Purpose**: Orchestrate complete competitor analysis

**Key Methods**:
1. `analyzeCompetitor(id)`:
   - Fetch SEMRUSH data (parallel)
   - Fetch DataForSEO data (parallel)
   - Combine results
   - Store in database
   - Generate SWOT

2. `analyzeAllCompetitors(category?)`:
   - Batch processing (5 concurrent)
   - 5-second delay between batches
   - Per-competitor error recovery

**Progress Tracking**:
```typescript
stages = {
  semrush: 20%,
  dataforseo: 50%,
  processing: 80%,
  completed: 100%
}
```

#### Keyword Gap Service
**Purpose**: Identify keyword opportunities

**Algorithm**:
1. Fetch target domain keywords
2. Fetch competitor keywords
3. Find gaps (competitor has, target doesn't)
4. Calculate opportunity score
5. Classify by difficulty tier

**Scoring Formula**:
```
score = (searchVolume / 1000) × 0.3        // Volume weight
      + ((100 - difficulty) / 100) × 0.4   // Difficulty weight
      + (competitorCount / 10) × 0.2       // Competition weight
      + ((100 - avgPosition) / 100) × 0.1  // Position weight
```

**Classification Rules**:
- **Easy**: difficulty < 30 AND competitors < 3
- **Medium**: 30 ≤ difficulty ≤ 60 OR 3 ≤ competitors ≤ 7
- **Hard**: difficulty > 60 OR competitors > 7

#### SWOT Analysis Service
**Purpose**: Generate automated SWOT analysis

**Identification Logic**:

**Strengths** (threshold-based):
- Organic traffic > 10,000
- Organic keywords > 1,000
- Total backlinks > 500
- Page speed > 80
- Mobile score > 80
- Priority ≥ 9

**Weaknesses** (threshold-based):
- Organic traffic < 1,000
- Organic keywords < 100
- Total backlinks < 50
- Page speed < 50
- Mobile score < 50
- Poor Core Web Vitals

**Opportunities** (analysis-based):
- Keyword gaps
- Backlink acquisition targets
- Content gaps
- Technical SEO improvements
- Geographic expansion

**Threats** (competitive intelligence):
- Market leaders (traffic > 50k)
- Keyword dominance (keywords > 5k)
- High domain authority (backlinks > 1k)
- Insurance networks (direct policyholder access)
- Marketplace platforms (lead control)

### Background Job Layer

#### Job Types

| Job Type | Frequency | Priority | Concurrency | Duration |
|----------|-----------|----------|-------------|----------|
| `single-competitor-analysis` | On-demand | 5-10 | 5 | 2-5 min |
| `batch-competitor-analysis` | On-demand | 5 | 1 | 60-90 min |
| `keyword-gap-analysis` | On-demand | 5 | 5 | 10-20 min |
| `swot-analysis` | On-demand | 5 | 5 | 1-2 min |
| `daily-analysis` | 2 AM daily | 7 | 1 | 30-45 min |
| `weekly-deep-analysis` | Sun 3 AM | 8 | 1 | 90-120 min |
| `rank-tracking` | Every 6h | 6 | 5 | 20-30 min |
| `monthly-trend-report` | 1st @ 4 AM | 5 | 1 | 15-20 min |

#### Job Configuration

```typescript
{
  attempts: 3,              // Retry failed jobs
  backoff: {
    type: 'exponential',
    delay: 2000             // 2s, 4s, 8s
  },
  removeOnComplete: 100,    // Keep last 100
  removeOnFail: 500         // Keep last 500
}
```

#### Worker Configuration

```typescript
{
  concurrency: 5,           // Process 5 jobs simultaneously
  lockDuration: 300000,     // 5 min job timeout
  stalledInterval: 30000    // Check stalled every 30s
}
```

### Data Layer

#### Database Schema

**Competitor** (40 rows):
- Seed data from `competitor-seeds.ts`
- Categories: RESTORATION_COMPANY, INSURANCE_NETWORK, CONTRACTOR_MARKETPLACE, INDUSTRY_ASSOCIATION
- Priority: 1-10 scale

**CompetitorAnalysis** (~40-400 rows):
- One per analysis run
- Historical tracking enabled
- Raw data stored in JSONB

**CompetitorKeyword** (~8,000-40,000 rows):
- 200 keywords × 40 competitors = 8,000 minimum
- Updated on each analysis
- Position tracking (current + previous)

**Backlink** (~8,000-40,000 rows):
- 200 backlinks × 40 competitors = 8,000 minimum
- Active/inactive tracking
- Source domain extraction

**SWOTAnalysis** (~40-400 rows):
- One per competitor per analysis
- JSONB arrays for flexibility
- AI-generated insights

**KeywordOpportunity** (~500-5,000 rows):
- Unique keywords only
- Updated on gap analysis
- Competitor rankings in JSONB

## Performance Considerations

### API Rate Limits

| API | Requests/Second | Daily Limit | Cost per Request |
|-----|----------------|-------------|------------------|
| SEMRUSH | 10 | 10,000 | $0.001-0.01 |
| DataForSEO | 2 | 2,000 units | $0.001-0.05 |

### Caching Strategy

**Cache Hit Rates** (expected):
- SEMRUSH: 60-80% (24h TTL)
- DataForSEO: 40-60% (12h TTL)

**Cache Savings** (monthly):
- SEMRUSH: ~$100-300
- DataForSEO: ~$50-150

### Database Performance

**Indexes**:
- `competitor.domain` (unique)
- `competitor.category`
- `competitorAnalysis.competitorId`
- `competitorKeyword.competitorId_keyword` (unique)
- `keywordOpportunity.difficultyTier`
- `keywordOpportunity.gapScore`

**Query Optimization**:
- Use `include` for relations
- Batch inserts with `createMany`
- Upsert for updates

## Security Considerations

### API Key Management
- Store in environment variables
- Never commit to repository
- Rotate quarterly
- Monitor usage

### Rate Limit Protection
- Token bucket prevents quota exhaustion
- Priority queue for critical requests
- Graceful degradation on limit

### Database Security
- Prisma prevents SQL injection
- No raw queries used
- Connection pooling enabled
- Audit logs for changes

## Monitoring & Observability

### Metrics to Track

**System Health**:
- Queue depth (waiting, active, failed)
- Job completion rate
- Average processing time
- Error rate by job type

**API Usage**:
- SEMRUSH: requests/day, cost/day
- DataForSEO: units/day, cost/day
- Cache hit rate
- Rate limit proximity

**Business Metrics**:
- Competitors analyzed/week
- Keywords discovered/week
- Opportunities identified/week
- SWOT analyses generated/week

### Logging

**Log Levels**:
- `INFO`: Job start/complete, API calls
- `WARN`: Retry attempts, cache misses
- `ERROR`: Job failures, API errors

**Log Format**:
```typescript
[Component] Action: details
[SEMRUSH] Fetching data for: domain.com
[Worker] Job 12345 completed successfully
```

## Scalability

### Horizontal Scaling
- Stateless services
- Multiple workers on different machines
- Shared Redis queue
- Database connection pooling

### Vertical Scaling
- Increase concurrency (5 → 10)
- Larger Redis instance
- Database read replicas

### Cost Optimization
- Aggressive caching
- Off-peak scheduling
- Batch processing
- API quota monitoring

## Future Enhancements

### Phase 2 Features
- AI-powered SWOT insights (OpenAI integration)
- Real-time rank tracking (WebSocket updates)
- Competitor alerts (traffic changes, new keywords)
- Export to Excel/CSV
- Custom competitor groups
- Automated reporting

### Phase 3 Features
- Content gap analysis
- Backlink opportunity scoring
- Competitor content analysis
- Social media monitoring
- Brand mention tracking
- Sentiment analysis

---

**Architecture Version**: 1.0
**Last Updated**: 2025-12-28
**Status**: Production Ready
