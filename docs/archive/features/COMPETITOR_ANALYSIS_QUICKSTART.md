# Competitor Analysis - Quick Start Guide

## Prerequisites Checklist

Before starting, ensure you have:

- [ ] PostgreSQL database running (already configured)
- [ ] Redis server running (`redis-server`)
- [ ] SEMRUSH API key
- [ ] DataForSEO login credentials
- [ ] Node.js dependencies installed (`npm install`)

## Step-by-Step Setup (10 minutes)

### 1. Configure Environment Variables (2 min)

Add to `.env.local`:

```env
# SEMRUSH API
SEMRUSH_API_KEY=your_semrush_api_key_here

# DataForSEO API
DATAFORSEO_LOGIN=your_dataforseo_login_here
DATAFORSEO_PASSWORD=your_dataforseo_password_here

# Redis (default local setup)
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=

# Database (already configured)
DATABASE_URL=postgresql://...
```

### 2. Start Redis Server (1 min)

```bash
# macOS/Linux
redis-server

# Windows (using WSL)
sudo service redis-server start

# Verify Redis is running
redis-cli ping
# Should return: PONG
```

### 3. Initialize System (3 min)

```bash
# Run initialization script
npx ts-node src/lib/competitor-analysis/init.ts
```

Expected output:
```
==================================================
Competitor Analysis System Initialization
==================================================

[Init] Verifying API credentials...
✓ API credentials verified successfully

[Init] Seeding competitors into database...
✓ Seeding complete: 40 created, 0 updated, 0 skipped

[Init] Initializing cache systems...
✓ Caches initialized successfully

[Init] Starting background workers...
✓ Background workers started successfully

[Init] Initializing analysis schedules...
✓ Daily analysis scheduled for 2 AM
✓ Weekly deep analysis scheduled for Sunday 3 AM
✓ Rank tracking scheduled every 6 hours
✓ Monthly trend report scheduled for 1st of month at 4 AM
✓ All schedules initialized successfully

[Init] Running system health check...
✓ All health checks passed

==================================================
Competitor Analysis System Ready
==================================================
```

### 4. Start Background Worker (1 min)

Open a **new terminal** and run:

```bash
npx ts-node src/lib/competitor-analysis/jobs/analysis-worker.ts
```

Keep this running in the background. You should see:
```
[Worker] Competitor analysis worker started
[Worker] Concurrency: 5 jobs
```

### 5. Trigger First Analysis (2 min)

In your original terminal:

```bash
# Start Next.js dev server (if not already running)
npm run dev

# In another terminal, trigger analysis for ServiceMaster (highest priority)
# First, get the competitor ID from database
npx prisma studio
# Navigate to "Competitor" table
# Copy the ID for "servicemaster.com.au"

# Trigger analysis (replace with actual ID)
curl -X POST http://localhost:3000/api/competitor-analysis/competitors/COMPETITOR_ID_HERE/analyze
```

Expected response:
```json
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

### 6. Monitor Progress (1 min)

Watch the worker terminal for progress:
```
[Worker] Processing single competitor analysis: clxxx...
[Analysis] Starting full analysis for competitor: clxxx...
[SEMRUSH] Fetching data for: servicemaster.com.au
[DataForSEO] Fetching data for: servicemaster.com.au
[Progress] servicemaster.com.au: processing - 80%
[Database] Stored analysis for: servicemaster.com.au
[Worker] Completed analysis for: clxxx...
```

## Quick Test Suite (5 minutes)

### Test 1: Verify Competitors Seeded

```bash
curl "http://localhost:3000/api/competitor-analysis/competitors?limit=5"
```

Should return 5 competitors with details.

### Test 2: Trigger Keyword Gap Analysis

```bash
curl -X POST http://localhost:3000/api/competitor-analysis/keywords/gaps \
  -H "Content-Type: application/json" \
  -d '{
    "targetDomain": "nrpg.com.au",
    "competitorCategory": "RESTORATION_COMPANY"
  }'
```

### Test 3: Get Keyword Opportunities

```bash
curl "http://localhost:3000/api/competitor-analysis/keywords/gaps?tier=easy&limit=10"
```

Should return easy keyword opportunities (after analysis completes).

### Test 4: Generate SWOT Analysis

```bash
curl -X POST http://localhost:3000/api/competitor-analysis/swot \
  -H "Content-Type: application/json" \
  -d '{"competitorId": "COMPETITOR_ID_HERE"}'
```

### Test 5: Retrieve SWOT Results

```bash
curl "http://localhost:3000/api/competitor-analysis/swot?competitorId=COMPETITOR_ID_HERE"
```

## Automated Schedules

Once initialized, the system runs these schedules automatically:

| Schedule | Time | Description |
|----------|------|-------------|
| Daily Analysis | 2:00 AM | High-priority competitors (priority ≥ 7) |
| Weekly Deep | Sunday 3:00 AM | All 40 competitors + SWOT |
| Rank Tracking | Every 6 hours | Top 20 keywords per competitor |
| Monthly Report | 1st @ 4:00 AM | Traffic and keyword trends |

**No manual intervention required** - the system runs continuously.

## Common Issues & Fixes

### Issue 1: Redis Connection Error
```
Error: Redis connection to localhost:6379 failed
```

**Fix**:
```bash
# Start Redis
redis-server

# Or check if running
redis-cli ping
```

### Issue 2: API Key Not Found
```
Error: SEMRUSH_API_KEY not found in environment
```

**Fix**:
```bash
# Check .env.local file exists
ls .env.local

# Verify API key is set
cat .env.local | grep SEMRUSH_API_KEY

# Restart server after adding
```

### Issue 3: Job Stuck in Queue
```
Job remains in "active" state
```

**Fix**:
```bash
# Clear stuck jobs
npx ts-node -e "
import { analysisQueue } from './src/lib/competitor-analysis/jobs/analysis-scheduler';
(async () => {
  await analysisQueue.clean(0, 'active');
  console.log('Cleared stuck jobs');
  process.exit(0);
})();
"
```

### Issue 4: Rate Limit Exceeded
```
Error: SEMRUSH API rate limit exceeded
```

**Fix**:
- Wait 24 hours for limit reset
- Or upgrade SEMRUSH plan
- Check rate limiter stats: `semrushRateLimiter.getStats()`

## Verification Checklist

After setup, verify these are working:

- [ ] 40 competitors seeded in database (check Prisma Studio)
- [ ] Redis server is running (`redis-cli ping`)
- [ ] Background worker is running (see terminal output)
- [ ] First analysis completed successfully
- [ ] API endpoints respond correctly
- [ ] Automated schedules are registered (check init output)

## Next Actions

1. **Analyze Top 10 Competitors** (manually):
   - ServiceMaster, SERVPRO, BELFOR, Steamatic, NRMA, Suncorp, Allianz, QBE, hipages, ServiceSeeking

2. **Review Keyword Opportunities**:
   - Focus on "easy" tier keywords (difficulty < 30, competitors < 3)
   - Export top 50 for content calendar

3. **Generate SWOT for All**:
   - Wait for weekly deep analysis (Sunday 3 AM)
   - Or trigger manually for key competitors

4. **Monitor Results**:
   - Check Prisma Studio daily
   - Review worker logs for errors
   - Track API usage against limits

## Production Deployment

When ready for production:

1. Update `.env.production`:
   ```env
   SEMRUSH_API_KEY=prod_key
   DATAFORSEO_LOGIN=prod_login
   DATAFORSEO_PASSWORD=prod_password
   REDIS_URL=redis://prod-redis-url
   DATABASE_URL=postgresql://prod-db-url
   ```

2. Deploy worker as separate service:
   ```bash
   pm2 start src/lib/competitor-analysis/jobs/analysis-worker.ts --name competitor-worker
   ```

3. Set up monitoring:
   - Bull Board for queue dashboard
   - CloudWatch/Datadog for logs
   - Alerts for failed jobs

## Support & Documentation

- **Full Documentation**: `src/lib/competitor-analysis/README.md`
- **Implementation Summary**: `COMPETITOR_ANALYSIS_SUMMARY.md`
- **API Routes**: `app/api/competitor-analysis/`
- **Type Definitions**: `src/lib/competitor-analysis/types/`

---

**Status**: Ready to use! 🚀

**Time to First Analysis**: ~10 minutes (setup + first competitor)

**Time to Full Analysis**: ~90 minutes (all 40 competitors)
