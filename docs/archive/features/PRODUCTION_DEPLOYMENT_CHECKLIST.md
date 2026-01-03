# 🚀 Production Deployment Checklist - Phase 23 Complete

**Status**: Ready for Production  
**Date**: December 23, 2025  
**Target**: Deploy AI-powered Disaster Recovery SaaS to Vercel + DigitalOcean

---

## PHASE 1: LOCAL TESTING & VERIFICATION (This Week)

### Step 1.1: Verify GitHub Files ✅ COMPLETE
- [x] `.env.local` committed
- [ ] - [x] T5Gemma service committed
- [ ] - [x] Autonomous worker committed
- [ ] - [x] Disaster recovery agent committed
- [ ] - [x] 4 API routes committed
- [ ] - [x] Deployment guides committed
- [ ] - [x] 11+ files successfully pushed to GitHub

- [ ] **Status**: All files verified in repo at https://github.com/CleanExpo/Disaster-Recovery

- [ ] ### Step 1.2: Fix npm Install Issue (TODAY - 15 minutes)

- [ ] ```bash
- [ ] # Option A: Clean Reinstall (Recommended)
- [ ] cd "D:\Disaster Recovery - NRP"
- [ ] rm -r node_modules package-lock.json
- [ ] npm cache clean --force
- [ ] npm install

- [ ] # Option B: Skip sharp (AI works without it)
- [ ] npm install --ignore-scripts
- [ ] npm install @huggingface/inference pino node-cache dotenv

- [ ] # Verify critical packages installed
- [ ] npm list bull ioredis @huggingface/inference
- [ ] ```

- [ ] **Success Criteria**:
- [ ] - ✅ No error messages
- [ ] - ✅ `node_modules` folder exists
- [ ] - ✅ Bull and ioredis are installed

- [ ] ### Step 1.3: Get Hugging Face API Key (TODAY - 5 minutes)

- [ ] 1. Go to https://huggingface.co/join
- [ ] 2. Sign up with email (FREE account)
- [ ] 3. Navigate to Settings → Access Tokens
- [ ] 4. Click "New Token"
- [ ] 5. Name: "Disaster-Recovery-AI"
- [ ] 6. Type: Read
- [ ] 7. Copy the token (starts with `hf_`)

- [ ] **Add to .env.local**:
- [ ] ```env
- [ ] HUGGINGFACE_API_KEY=hf_YOUR_TOKEN_HERE
- [ ] T5GEMMA_API_KEY=hf_YOUR_TOKEN_HERE
- [ ] ```

- [ ] **Success Criteria**:
- [ ] - ✅ Account created
- [ ] - ✅ Token generated
- [ ] - ✅ Token added to .env.local
- [ ] - ✅ Token starts with `hf_`

- [ ] ### Step 1.4: Start Redis (TODAY - 5 minutes)

- [ ] **Option A: Windows WSL (Recommended)**
- [ ] ```bash
- [ ] wsl redis-server
- [ ] # Should show: "Ready to accept connections"
- [ ] ```

- [ ] **Option B: Docker**
- [ ] ```bash
- [ ] docker run -d -p 6379:6379 --name redis-disaster-recovery redis:alpine
- [ ] # Should show: container ID
- [ ] ```

- [ ] **Option C: Download Redis Windows**
- [ ] - Download from: https://github.com/microsoftarchive/redis/releases
- [ ] - Run `redis-server.exe`

- [ ] **Success Criteria**:
- [ ] - ✅ Redis running on port 6379
- [ ] - ✅ No connection errors

- [ ] ### Step 1.5: Start Dev Server (TODAY - 5 minutes)

- [ ] **Terminal 1: Dev Server**
- [ ] ```bash
- [ ] cd "D:\Disaster Recovery - NRP"
- [ ] npm run dev
- [ ] # Should show: "Ready on http://localhost:3000"
- [ ] ```

- [ ] **Terminal 2: AI Worker (Optional)**
- [ ] ```bash
- [ ] npm run worker
- [ ] # Should show: "Worker started, listening for jobs"
- [ ] ```

- [ ] **Success Criteria**:
- [ ] - ✅ Next.js dev server running on http://localhost:3000
- [ ] - ✅ No TypeScript errors
- [ ] - ✅ Browser loads homepage

- [ ] ### Step 1.6: Test AI Endpoints (TODAY - 10 minutes)

- [ ] **Test 1: Health Check**
- [ ] ```bash
- [ ] curl http://localhost:3000/api/ai/health
- [ ] # Expected Response:
- [ ] # {"status":"healthy","redis":"connected","model":"loaded","timestamp":"..."}
- [ ] ```

- [ ] **Test 2: Summarization**
- [ ] ```bash
- [ ] curl -X POST http://localhost:3000/api/ai/summarize \
- [ ]   -H "Content-Type: application/json" \
- [ ]     -d '{
- [ ]     "text": "A massive earthquake measuring 7.8 on the Richter scale struck the coastal region today, causing widespread damage to buildings and infrastructure. Emergency services are responding to hundreds of distress calls. The government has declared a state of emergency and mobilized national guard units to assist with rescue operations.",
- [ ]     "userId": "test-user-123"
- [ ]   }'

- [ ]   # Expected Response:
- [ ]   # {"success":true,"jobId":"1","status":"queued","summary":"..."}
- [ ]   ```

- [ ]   **Test 3: Disaster Analysis**
- [ ]   ```bash
- [ ]   curl -X POST http://localhost:3000/api/disasters/analyze \
- [ ]     -H "Content-Type: application/json" \
- [ ]   -d '{
- [ ]       "description": "Earthquake measuring 7.8, widespread building damage, 500+ casualties reported, power outages across region",
- [ ]       "severity": 9,
- [ ]       "affectedAreas": ["Downtown", "Harbor", "Residential Districts"],
- [ ]       "userId": "test-user-123"
- [ ]     }'

- [ ] # Expected Response:
- [ ] # {"success":true,"jobId":"2","status":"queued"}
- [ ] ```

- [ ] **Success Criteria**:
- [ ] - ✅ Health check returns `healthy`
- [ ] - ✅ Summarization returns job ID
- [ ] - ✅ Disaster analysis returns job ID
- [ ] - ✅ No error messages

- [ ] ### Step 1.7: Verify Database Schema (TODAY - 5 minutes)

- [ ] ```bash
- [ ] # Check PostgreSQL is configured (if using local Postgres)
- [ ] # Tables should exist from Prisma migrations:
- [ ] # - AIProcessingLog
- [ ] # - AIJob
- [ ] # - Disaster
- [ ] # - User
- [ ] # - Session

- [ ] # Run migrations if needed
- [ ] npx prisma migrate deploy
- [ ] npx prisma generate
- [ ] ```

- [ ] **Success Criteria**:
- [ ] - ✅ All migrations deployed
- [ ] - ✅ Database tables created

- [ ] ---

- [ ] ## PHASE 2: PRODUCTION DEPLOYMENT (Next Week)

- [ ] ### Step 2.1: DigitalOcean Setup

- [ ] #### 2.1.1: Create PostgreSQL Database
- [ ] ```
- [ ] 1. Log in to https://cloud.digitalocean.com
- [ ] 2. Click "Manage" → "Databases"
- [ ] 3. Create New Database Cluster
- [ ]    - Engine: PostgreSQL 15
- [ ]       - Region: [Choose nearest to your users]
- [ ]      - Size: Basic 8GB RAM ($45/month)
- [ ]     - Name: disaster-recovery-db
- [ ] 4. Wait for cluster to be ready (~5 minutes)
- [ ] 5. Save the connection string:
- [ ]    DATABASE_URL="postgresql://..."
- [ ]    ```

- [ ]    #### 2.1.2: Create Redis Database
- [ ]    ```
- [ ]    1. In DigitalOcean Console
- [ ]    2. Click "Manage" → "Databases"
- [ ]    3. Create New Redis Cluster
- [ ]       - Version: Redis 7
- [ ]      - Region: Same as PostgreSQL
- [ ]     - Size: Basic 1GB ($15/month)
- [ ]    - Name: disaster-recovery-redis
- [ ]    4. Wait for cluster to be ready
- [ ]    5. Save the connection string:
- [ ]       REDIS_URL="redis://..."
- [ ]   ```

- [ ]   #### 2.1.3: Create App Platform (Worker Service)
- [ ]   ```
- [ ]   1. Click "Manage" → "App Platform"
- [ ]   2. Create New App
- [ ]   3. Connect GitHub: CleanExpo/Disaster-Recovery
- [ ]   4. Configure Build
- [ ]      - Framework: Node.js
- [ ]     - Build Command: npm install
- [ ]    - Run Command: npm run worker
- [ ]    5. Set Environment Variables:
- [ ]       - DATABASE_URL (from PostgreSQL)
- [ ]      - REDIS_URL (from Redis)
- [ ]     - HUGGINGFACE_API_KEY (from .env)
- [ ] 6. Deploy
- [ ] ```

- [ ] **Cost Summary** (Monthly):
- [ ] - PostgreSQL (8GB): $45
- [ ] - Redis (1GB): $15
- [ ] - App Platform (1 worker): $12
- [ ] - **Total**: ~$72/month

- [ ] ### Step 2.2: Deploy to Vercel

- [ ] #### 2.2.1: Install Vercel CLI
- [ ] ```bash
- [ ] npm install -g vercel
- [ ] vercel login
- [ ] # Opens browser for authentication
- [ ] ```

- [ ] #### 2.2.2: Deploy
- [ ] ```bash
- [ ] cd "D:\Disaster Recovery - NRP"
- [ ] vercel --prod
- [ ] # Automatically deploys to production
- [ ] ```

- [ ] #### 2.2.3: Set Environment Variables
- [ ] ```bash
- [ ] vercel env add DATABASE_URL
- [ ] # Paste: postgresql://... from DigitalOcean

- [ ] vercel env add REDIS_URL
- [ ] # Paste: redis://... from DigitalOcean

- [ ] vercel env add HUGGINGFACE_API_KEY
- [ ] # Paste: hf_... from Hugging Face

- [ ] vercel env add T5GEMMA_API_KEY
- [ ] # Paste: hf_... from Hugging Face
- [ ] ```

- [ ] #### 2.2.4: Verify Deployment
- [ ] ```bash
- [ ] # Check deployment status
- [ ] vercel --prod

- [ ] # View logs
- [ ] vercel logs --prod

- [ ] # Test health endpoint
- [ ] curl https://your-domain.vercel.app/api/ai/health
- [ ] ```

- [ ] **Success Criteria**:
- [ ] - ✅ Deployment successful
- [ ] - ✅ Environment variables set
- [ ] - ✅ Health check returns `healthy`
- [ ] - ✅ No database connection errors

- [ ] ### Step 2.3: Run Production Tests

- [ ] ```bash
- [ ] # Test summarization from production
- [ ] curl -X POST https://your-domain.vercel.app/api/ai/summarize \
- [ ]   -H "Content-Type: application/json" \
- [ ]     -d '{"text":"...","userId":"prod-test"}'

- [ ] # Test disaster analysis from production
- [ ] curl -X POST https://your-domain.vercel.app/api/disasters/analyze \
- [ ]   -H "Content-Type: application/json" \
- [ ]     -d '{...}'

- [ ] # Monitor logs
- [ ] vercel logs --prod --follow

- [ ] # Check DigitalOcean worker logs
- [ ] # App Platform → Logs → Runtime
- [ ] ```

- [ ] **Success Criteria**:
- [ ] - ✅ All API endpoints respond correctly
- [ ] - ✅ Jobs are queued and processed
- [ ] - ✅ No errors in logs
- [ ] - ✅ Response times < 2 seconds

- [ ] ### Step 2.4: Configure Custom Domain (Optional)

- [ ] ```bash
- [ ] # In Vercel Dashboard:
- [ ] 1. Project → Settings → Domains
- [ ] 2. Add your domain (e.g., api.nrpg.com)
- [ ] 3. Update DNS records to Vercel nameservers
- [ ] 4. SSL certificate auto-generates

- [ ] # Test
- [ ] curl https://api.nrpg.com/api/ai/health
- [ ] ```

- [ ] ---

- [ ] ## PHASE 3: MONITORING & OPTIMIZATION (Ongoing)

- [ ] ### Step 3.1: Set Up Monitoring

- [ ] **Vercel Monitoring**:
- [ ] ```bash
- [ ] # View deployment analytics
- [ ] vercel analytics --prod

- [ ] # Monitor real-time logs
- [ ] vercel logs --prod --follow

- [ ] # Set up error alerts
- [ ] # Vercel Dashboard → Settings → Integrations → Sentry
- [ ] ```

- [ ] **DigitalOcean Monitoring**:
- [ ] ```bash
- [ ] # Monitor database performance
- [ ] # Databases → [cluster] → Metrics

- [ ] # Monitor App Platform
- [ ] # App Platform → [app] → Logs & Metrics
- [ ] ```

- [ ] ### Step 3.2: Optimize Costs

- [ ] **If Hugging Face costs are high**:
- [ ] 1. Implement request caching (already built-in)
- [ ] 2. Switch to T5Gemma local model (GitHub files ready)
- [ ] 3. Add rate limiting ($0 cost)

- [ ] **If database costs are high**:
- [ ] 1. Upgrade to connection pooling
- [ ] 2. Optimize database queries
- [ ] 3. Archive old data

- [ ] ### Step 3.3: Performance Optimization

- [ ] ```bash
- [ ] # Monitor queue performance
- [ ] curl https://your-domain.vercel.app/api/ai/stats

- [ ] # Check worker load
- [ ] # DigitalOcean → App Platform → Metrics

- [ ] # Optimize model inference
- [ ] # Edit T5GEMMA_MAX_LENGTH in .env to 256 (faster)
- [ ] # Edit T5GEMMA_BATCH_SIZE for your server capacity
- [ ] ```

- [ ] ---

- [ ] ## CHECKLIST SUMMARY

- [ ] ### Before Production Launch
- [ ] - [ ] npm install completes without errors
- [ ] - [ ] Hugging Face API key obtained
- [ ] - [ ] Redis running locally
- [ ] - [ ] Dev server starts without errors
- [ ] - [ ] All AI endpoints tested locally
- [ ] - [ ] Database migrations applied
- [ ] - [ ] Environment variables configured

- [ ] ### Production Deployment
- [ ] - [ ] DigitalOcean PostgreSQL created
- [ ] - [ ] DigitalOcean Redis created
- [ ] - [ ] DigitalOcean App Platform configured
- [ ] - [ ] Vercel CLI installed
- [ ] - [ ] Code deployed to Vercel
- [ ] - [ ] Environment variables set in Vercel
- [ ] - [ ] Production tests passed
- [ ] - [ ] Custom domain configured (optional)
- [ ] - [ ] Monitoring set up

- [ ] ### Post-Deployment
- [ ] - [ ] Monitor Vercel logs for errors
- [ ] - [ ] Monitor DigitalOcean database performance
- [ ] - [ ] Check API response times
- [ ] - [ ] Verify job queue is processing
- [ ] - [ ] Test disaster analysis with real data
- [ ] - [ ] Set up alerting for errors

- [ ] ---

- [ ] ## ESTIMATED TIMELINE

- [ ] - **Today**: 1 hour (npm install, Hugging Face key, Redis, local testing)
- [ ] - **Tomorrow**: 30 minutes (minor adjustments, final verification)
- [ ] - **Next Week**: 2 hours (DigitalOcean setup, Vercel deployment)
- [ ] - **Total**: ~3.5 hours of active work

- [ ] ---

- [ ] ## SUPPORT & TROUBLESHOOTING

- [ ] **Common Issues**:

- [ ] ### npm install fails
- [ ] ```bash
- [ ] # Clear cache and retry
- [ ] npm cache clean --force
- [ ] rm -r node_modules
- [ ] npm install --legacy-peer-deps
- [ ] ```

- [ ] ### Redis connection error
- [ ] ```bash
- [ ] # Verify Redis is running
- [ ] redis-cli ping
- [ ] # Should return: PONG

- [ ] # If not running:
- [ ] wsl redis-server
- [ ] # or
- [ ] docker run -d -p 6379:6379 redis:alpine
- [ ] ```

- [ ] ### Hugging Face API error
- [ ] ```bash
- [ ] # Verify token in .env.local
- [ ] echo $HUGGINGFACE_API_KEY

- [ ] # Test token validity
- [ ] curl -H "Authorization: Bearer $HUGGINGFACE_API_KEY" \
- [ ]   https://huggingface.co/api/whoami
- [ ]   ```

- [ ]   ### Vercel deployment fails
- [ ]   ```bash
- [ ]   # Check build logs
- [ ]   vercel logs --prod

- [ ]   # Rebuild
- [ ]   vercel --prod --force

- [ ]   # Check environment variables
- [ ]   vercel env list
- [ ]   ```

- [ ]   ---

- [ ]   ## NEXT ACTIONS

- [ ]   1. **NOW**: Start with Step 1.2 (npm install fix)
- [ ]   2. **TODAY**: Complete Steps 1.2 - 1.7 (local testing)
- [ ]   3. **TOMORROW**: Verify everything works
- [ ]   4. **NEXT WEEK**: Execute Phase 2 (production deployment)

- [ ]   **You're ready. Let's go live! 🚀**
