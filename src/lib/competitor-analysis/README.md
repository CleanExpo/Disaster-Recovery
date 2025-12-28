# Competitor Analysis Backend Infrastructure

Comprehensive competitor analysis system for NRPG platform to analyze 40 competitors via SEMRUSH and DataForSEO APIs.

## Overview

This system provides:
- **API Integration**: SEMRUSH (traffic, keywords, backlinks) + DataForSEO (SERP, page speed, technical SEO)
- **Automated Analysis**: Daily/weekly scheduled analysis of 40 competitors
- **Keyword Gap Analysis**: Identify easy/medium/hard keyword opportunities
- **SWOT Analysis**: Automated strengths, weaknesses, opportunities, threats analysis
- **Background Jobs**: Bull queue-based processing with rate limiting
- **REST API**: Complete API endpoints for triggering and retrieving analysis data

## Architecture

```
src/lib/competitor-analysis/
├── api-clients/              # API integration layer
│   ├── semrush-client.ts     # SEMRUSH API client (10 req/sec, 10k/day)
│   ├── dataforseo-client.ts  # DataForSEO API client (2k units/day)
│   └── rate-limiter.ts       # Token bucket rate limiting
├── services/                 # Business logic layer
│   ├── competitor-analysis-service.ts  # Main analysis orchestration
│   ├── keyword-gap-service.ts          # Keyword opportunity discovery
│   └── swot-analysis-service.ts        # SWOT framework analysis
├── jobs/                     # Background processing
│   ├── analysis-scheduler.ts # Job scheduling (cron-based)
│   └── analysis-worker.ts    # Job processing workers
├── types/                    # TypeScript type definitions
│   └── index.ts             # All type definitions
├── data/                     # Seed data
│   └── competitor-seeds.ts  # 40 competitor definitions
└── init.ts                   # System initialization script

app/api/competitor-analysis/  # REST API endpoints
├── competitors/
│   ├── route.ts             # List, create, update, delete competitors
│   └── [id]/analyze/route.ts # Trigger/get analysis for competitor
├── keywords/gaps/route.ts    # Keyword gap analysis
└── swot/route.ts            # SWOT analysis
```

## Prerequisites

### Environment Variables

Add to `.env.local`:

```env
# SEMRUSH API (required)
SEMRUSH_API_KEY=your_semrush_api_key

# DataForSEO API (required)
DATAFORSEO_LOGIN=your_dataforseo_login
DATAFORSEO_PASSWORD=your_dataforseo_password

# Redis (required for Bull queue)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=optional_password

# Database (already configured)
DATABASE_URL=your_postgres_connection_string
```

### API Credentials

1. **SEMRUSH API**:
   - Sign up at https://www.semrush.com/api/
   - Get API key from account settings
   - Rate limits: 10 requests/second, 10,000 requests/day

2. **DataForSEO API**:
   - Sign up at https://dataforseo.com/
   - Get login credentials from dashboard
   - Rate limits: 2,000 units/day (task-based pricing)

3. **Redis**:
   - Install locally: `brew install redis` (Mac) or `sudo apt install redis` (Linux)
   - Or use cloud Redis (e.g., Upstash, Redis Cloud)

## Installation

```bash
# Install dependencies
npm install

# Dependencies installed:
# - axios (HTTP client)
# - bull (job queue)
# - node-cache (in-memory caching)
# - ioredis (Redis client)
```

## Initialization

### Step 1: Seed Competitors

```bash
# Run initialization script
npx ts-node src/lib/competitor-analysis/init.ts
```

This will:
- ✅ Verify API credentials
- ✅ Seed 40 competitors into database
- ✅ Initialize cache systems
- ✅ Start background workers
- ✅ Schedule automated jobs
- ✅ Run health checks

### Step 2: Verify Database

```bash
# Check competitors were seeded
npx prisma studio

# Navigate to "Competitor" table
# Should see 40 competitors across 4 categories:
# - RESTORATION_COMPANY (10)
# - INSURANCE_NETWORK (10)
# - CONTRACTOR_MARKETPLACE (10)
# - INDUSTRY_ASSOCIATION (10)
```

### Step 3: Start Background Worker

```bash
# In a separate terminal
npx ts-node src/lib/competitor-analysis/jobs/analysis-worker.ts
```

Keep this running to process analysis jobs.

## Usage

### 1. Trigger Single Competitor Analysis

```bash
# Get competitor ID from database
COMPETITOR_ID="clxxx..."

# Trigger analysis
curl -X POST http://localhost:3000/api/competitor-analysis/competitors/$COMPETITOR_ID/analyze

# Response
{
  "success": true,
  "data": {
    "jobId": "12345",
    "competitorId": "clxxx...",
    "domain": "servicemaster.com.au",
    "message": "Analysis job triggered successfully"
  }
}
```

### 2. Check Analysis Status

```bash
# Using job ID
curl "http://localhost:3000/api/competitor-analysis/competitors/$COMPETITOR_ID/analyze?jobId=12345"

# Get latest analysis
curl "http://localhost:3000/api/competitor-analysis/competitors/$COMPETITOR_ID/analyze"
```

### 3. Generate Keyword Gap Analysis

```bash
curl -X POST http://localhost:3000/api/competitor-analysis/keywords/gaps \
  -H "Content-Type: application/json" \
  -d '{
    "targetDomain": "nrpg.com.au",
    "competitorCategory": "RESTORATION_COMPANY"
  }'

# Response
{
  "success": true,
  "data": {
    "jobId": "67890",
    "targetDomain": "nrpg.com.au",
    "message": "Keyword gap analysis job triggered successfully"
  }
}
```

### 4. Get Keyword Opportunities

```bash
# Get top 50 easy opportunities
curl "http://localhost:3000/api/competitor-analysis/keywords/gaps?tier=easy&limit=50"

# Get all opportunities
curl "http://localhost:3000/api/competitor-analysis/keywords/gaps?limit=100"

# Response
{
  "success": true,
  "data": {
    "opportunities": [
      {
        "keyword": "water damage restoration sydney",
        "searchVolume": 1200,
        "difficulty": 35,
        "cpc": 8.50,
        "competitorCount": 2,
        "averagePosition": 5.5,
        "gapScore": 78.5,
        "difficultyTier": "easy",
        "category": "water_damage",
        "intent": "transactional",
        "competitors": [...]
      }
    ],
    "classified": {
      "easy": 25,
      "medium": 20,
      "hard": 5,
      "total": 50
    }
  }
}
```

### 5. Generate SWOT Analysis

```bash
curl -X POST http://localhost:3000/api/competitor-analysis/swot \
  -H "Content-Type: application/json" \
  -d '{
    "competitorId": "clxxx..."
  }'

# Get SWOT results
curl "http://localhost:3000/api/competitor-analysis/swot?competitorId=clxxx..."

# Response
{
  "success": true,
  "data": {
    "competitorId": "clxxx...",
    "strengths": [
      {
        "title": "Strong Organic Traffic",
        "description": "Receives 50,000 monthly organic visits...",
        "impact": "high",
        "source": "SEMRUSH Traffic Data"
      }
    ],
    "weaknesses": [...],
    "opportunities": [...],
    "threats": [...],
    "summary": "SWOT Analysis reveals 4 key strengths...",
    "recommendations": [...]
  }
}
```

### 6. List All Competitors

```bash
# All competitors
curl "http://localhost:3000/api/competitor-analysis/competitors"

# Filter by category
curl "http://localhost:3000/api/competitor-analysis/competitors?category=RESTORATION_COMPANY"

# High-priority only
curl "http://localhost:3000/api/competitor-analysis/competitors?priority=8&isActive=true"
```

## Automated Schedules

The system runs automated analysis on these schedules:

| Schedule | Frequency | Description | Cron |
|----------|-----------|-------------|------|
| **Daily Analysis** | Daily at 2 AM | High-priority competitors (priority ≥ 7) | `0 2 * * *` |
| **Weekly Deep Analysis** | Sunday 3 AM | All 40 competitors + SWOT | `0 3 * * 0` |
| **Rank Tracking** | Every 6 hours | Top 20 keywords per competitor | `0 */6 * * *` |
| **Monthly Trend Report** | 1st of month, 4 AM | Traffic/keyword trends | `0 4 1 * *` |

## Data Models

### Competitor
```typescript
{
  id: string;
  domain: string;           // "servicemaster.com.au"
  name: string;             // "ServiceMaster Restore Australia"
  category: CompetitorCategory;
  priority: number;         // 1-10
  businessModel: string;    // "Direct competitor"
  targetMarket: string;     // "Both"
  geographicFocus: string[]; // ["NSW", "VIC", "QLD"]
  notes: string;
  isActive: boolean;
  lastAnalyzedAt: Date;
}
```

### CompetitorAnalysis
```typescript
{
  id: string;
  competitorId: string;

  // Traffic
  organicTraffic: number;
  paidTraffic: number;
  totalKeywords: number;
  organicKeywords: number;
  paidKeywords: number;

  // Authority
  domainRating: number;
  totalBacklinks: number;
  referringDomains: number;

  // Technical SEO
  pageSpeed: number;
  mobileScore: number;
  coreWebVitals: { lcp, fid, cls };

  analysisDate: Date;
  dataSource: "SEMRUSH" | "DataForSEO" | "Combined";
}
```

### KeywordOpportunity
```typescript
{
  id: string;
  keyword: string;
  searchVolume: number;
  difficulty: number;       // 0-100
  cpc: number;

  // Opportunity metrics
  competitorCount: number;  // How many competitors rank
  averagePosition: number;  // Average position of competitors
  gapScore: number;         // 0-100 (higher = better opportunity)
  difficultyTier: "easy" | "medium" | "hard";

  category: string;         // "water_damage", "fire_damage", etc.
  intent: string;           // "informational", "transactional", etc.
  competitors: Array<{ domain, position, url }>;
}
```

## Opportunity Scoring Algorithm

Keywords are scored 0-100 based on:

```typescript
score = (searchVolume / 1000) * 0.3        // 30% weight
      + ((100 - difficulty) / 100) * 0.4   // 40% weight
      + (competitorCount / 10) * 0.2       // 20% weight
      + ((100 - avgPosition) / 100) * 0.1  // 10% weight
```

### Difficulty Tiers

| Tier | Difficulty | Competitor Count | Target |
|------|------------|------------------|--------|
| **Easy** | < 30 | < 3 | Quick wins |
| **Medium** | 30-60 | 3-7 | Strategic targets |
| **Hard** | > 60 | > 7 | Long-term goals |

## Rate Limiting

### SEMRUSH
- **Requests**: 10/second, 10,000/day
- **Implementation**: Token bucket algorithm
- **Cache**: 24-hour TTL
- **Retry**: Exponential backoff (3 attempts)

### DataForSEO
- **Requests**: 2/second, 2,000 units/day
- **Implementation**: Task-based polling
- **Cache**: 12-hour TTL
- **Timeout**: 5 minutes per task

## Monitoring

### Queue Stats

```bash
# Get queue statistics
curl "http://localhost:3000/api/competitor-analysis/stats"

# Response
{
  "waiting": 5,
  "active": 2,
  "completed": 150,
  "failed": 3,
  "delayed": 0,
  "total": 160
}
```

### Cache Stats

```typescript
import { semrushClient, dataForSeoClient } from '@/lib/competitor-analysis/api-clients';

// SEMRUSH cache stats
const semrushStats = semrushClient.getCacheStats();

// DataForSEO cache stats
const dataForSeoStats = dataForSeoClient.getCacheStats();
```

## Error Handling

All API responses follow this format:

```typescript
// Success
{
  "success": true,
  "data": {...},
  "meta": {...}
}

// Error
{
  "success": false,
  "error": {
    "code": "ERROR_CODE",
    "message": "Human-readable message",
    "details": {...} // Optional
  }
}
```

### Common Error Codes

| Code | Meaning | Status |
|------|---------|--------|
| `VALIDATION_ERROR` | Invalid input data | 400 |
| `NOT_FOUND` | Resource not found | 404 |
| `DUPLICATE_COMPETITOR` | Competitor already exists | 409 |
| `TRIGGER_ERROR` | Job trigger failed | 500 |
| `FETCH_ERROR` | Data retrieval failed | 500 |
| `JOB_NOT_FOUND` | Job ID not found | 404 |

## Testing

### Manual Testing

```bash
# 1. Trigger analysis for ServiceMaster (highest priority)
curl -X POST http://localhost:3000/api/competitor-analysis/competitors/clxxx.../analyze

# 2. Wait 5-10 minutes for analysis to complete
# (Check worker logs for progress)

# 3. Retrieve analysis results
curl http://localhost:3000/api/competitor-analysis/competitors/clxxx.../analyze

# 4. Generate keyword gaps
curl -X POST http://localhost:3000/api/competitor-analysis/keywords/gaps \
  -H "Content-Type: application/json" \
  -d '{"targetDomain": "nrpg.com.au"}'

# 5. View easy opportunities
curl "http://localhost:3000/api/competitor-analysis/keywords/gaps?tier=easy&limit=25"
```

### Integration Tests

```bash
# Run integration tests
npm run test:integration

# Test specific suite
npm run test:integration -- competitor-analysis
```

## Production Deployment

### Environment Setup

```bash
# Production .env
SEMRUSH_API_KEY=prod_key
DATAFORSEO_LOGIN=prod_login
DATAFORSEO_PASSWORD=prod_password
REDIS_URL=redis://prod-redis:6379
DATABASE_URL=postgresql://prod-db
```

### Start Workers

```bash
# Production worker process
npm run worker:prod

# Or with PM2
pm2 start src/lib/competitor-analysis/jobs/analysis-worker.ts --name competitor-worker
```

### Monitoring

- **Queue Dashboard**: Bull Board (optional add-on)
- **Logs**: Winston logger integration
- **Alerts**: Set up for failed jobs, rate limit exceeded

## Performance

### Expected Processing Times

| Task | Duration | API Calls |
|------|----------|-----------|
| Single competitor analysis | 2-5 min | 5-10 |
| Batch analysis (40 competitors) | 60-90 min | 200-400 |
| Keyword gap analysis | 10-20 min | 40-80 |
| SWOT generation | 1-2 min | 0 (uses existing data) |

### Optimization Tips

1. **Use caching**: 24-hour cache for SEMRUSH, 12-hour for DataForSEO
2. **Batch processing**: Analyze 5 competitors concurrently
3. **Rate limits**: Stay within API limits to avoid throttling
4. **Off-peak scheduling**: Run heavy analysis during off-peak hours

## Troubleshooting

### Issue: "SEMRUSH API key not found"
```bash
# Check environment variable
echo $SEMRUSH_API_KEY

# Add to .env.local
SEMRUSH_API_KEY=your_key_here
```

### Issue: "Redis connection failed"
```bash
# Start Redis
redis-server

# Or check Redis is running
redis-cli ping
# Should return: PONG
```

### Issue: "Job stuck in 'active' state"
```bash
# Clear stuck jobs
npx ts-node -e "
import { analysisQueue } from './src/lib/competitor-analysis/jobs/analysis-scheduler';
analysisQueue.clean(0, 'active');
"
```

### Issue: "Rate limit exceeded"
- SEMRUSH: Wait 24 hours or upgrade plan
- DataForSEO: Wait 24 hours or purchase additional units

## Next Steps

1. **Trigger initial analysis**: Analyze top 10 competitors
2. **Review keyword opportunities**: Focus on "easy" tier keywords
3. **Generate content calendar**: Use keyword gaps for content planning
4. **Monitor competitor changes**: Weekly SWOT updates
5. **Backlink outreach**: Target competitors' backlink sources

## Support

- **Documentation**: This README
- **API Reference**: `/app/api/competitor-analysis/`
- **Type Definitions**: `/src/lib/competitor-analysis/types/`
- **Examples**: See "Usage" section above

---

**Built for NRPG Platform - Disaster Recovery Competitor Intelligence**
