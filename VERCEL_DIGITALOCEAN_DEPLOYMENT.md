# Vercel + DigitalOcean T5Gemma Deployment Guide

## Architecture Overview

```
┌─────────────────────────────────────────────────────────┐
│  Disaster Recovery SaaS - Production Architecture       │
├─────────────────────────────────────────────────────────┤
│                                                          │
│  ┌─────────────────┐        ┌──────────────────────┐   │
│  │   Vercel        │        │   DigitalOcean      │   │
│  │  (Frontend      │◄──────►│   (Backend & AI)    │   │
│  │   + API)        │  HTTPS │                      │   │
│  └─────────────────┘        └──────────────────────┘   │
│                                                          │
│                      ┌─────────────────┐                │
│                      │   PostgreSQL    │                │
│                      │   (Managed DB)  │                │
│                      └─────────────────┘                │
│                                                          │
│                      ┌─────────────────┐                │
│                      │ Redis Queue     │                │
│                      │ (Bull + Redis)  │                │
│                      └─────────────────┘                │
│                                                          │
│                    ┌──────────────────┐                 │
│                    │ T5Gemma Workers  │                 │
│                    │ (App Platform)   │                 │
│                    └──────────────────┘                 │
│                                                          │
└─────────────────────────────────────────────────────────┘
```

## Step 1: DigitalOcean Setup

### 1.1 Create PostgreSQL Database
```bash
# Via DigitalOcean Console:
1. Click "Manage" > "Databases"
2. Create New Database Cluster
   - Engine: PostgreSQL 15+
   - Region: Your region
   - Cluster: Basic (8GB RAM)
3. Save connection string: postgresql://user:password@host:port/db
```

### 1.2 Create Redis Database
```bash
# Via DigitalOcean Console:
1. Click "Manage" > "Databases"
2. Create New Redis Cluster
   - Version: Redis 7+
   - Region: Same as PostgreSQL
   - Size: Basic (1GB)
3. Save connection string: redis://user:password@host:port
```

### 1.3 Update Environment Variables
Add to Vercel `.env.local`:
```env
# DigitalOcean PostgreSQL
DATABASE_URL="postgresql://user:password@host:25060/db?sslmode=require"

# DigitalOcean Redis
REDIS_URL="redis://user:password@host:25061"

# Keep existing T5Gemma configs
HUGGINGFACE_API_KEY=your_key
T5GEMMA_MODEL_SIZE=2b
T5GEMMA_DEVICE=cpu
```

## Step 2: Database Migrations

```bash
# In your local project
npx prisma migrate deploy

# Verify migrations on DigitalOcean
psql postgresql://user:password@host:port/db -c "\dt"
```

Expected tables:
- `aIProcessingLog`
- - `aIJob`
  - - `Disaster`
   
    - ## Step 3: Deploy to Vercel
   
    - ```bash
      # Install Vercel CLI
      npm install -g vercel

      # Login
      vercel login

      # Deploy
      vercel --prod

      # Set environment variables
      vercel env add DATABASE_URL
      vercel env add REDIS_URL
      vercel env add HUGGINGFACE_API_KEY
      ```

      ## Step 4: Configure Vercel Environment

      Add to your `vercel.json`:
      ```json
      {
        "buildCommand": "npm run build",
        "devCommand": "npm run dev",
        "env": {
          "DATABASE_URL": "@database_url",
          "REDIS_URL": "@redis_url",
          "HUGGINGFACE_API_KEY": "@huggingface_api_key",
          "T5GEMMA_MODEL_SIZE": "2b",
          "T5GEMMA_DEVICE": "cpu",
          "T5GEMMA_MAX_LENGTH": "512"
        }
      }
      ```

      ## Step 5: Deploy Worker Service to DigitalOcean

      ### Option A: App Platform (Recommended)
      ```bash
      # 1. Create app.yaml in your project
      cat > app.yaml << 'EOF'
      name: disaster-recovery-worker
      services:
      - name: t5-worker
        github:
          repo: CleanExpo/Disaster-Recovery
          branch: main
        build_command: npm install
        run_command: npm run start:worker
        envs:
        - key: DATABASE_URL
          type: SECRET
        - key: REDIS_URL
          type: SECRET
        - key: HUGGINGFACE_API_KEY
          type: SECRET
      EOF

      # 2. Deploy via DigitalOcean console
      # Upload app.yaml to create the worker service
      ```

      ### Option B: Docker Container
      ```dockerfile
      # Dockerfile
      FROM node:18-alpine

      WORKDIR /app
      COPY package*.json ./
      RUN npm ci --only=production
      COPY . .

      # Build worker command
      CMD ["npm", "run", "start:worker"]
      ```

      ## Step 6: Add Worker Script

      Create `package.json` scripts:
      ```json
      {
        "scripts": {
          "dev": "next dev",
          "build": "next build",
          "start": "next start",
          "start:worker": "node --loader ts-node/esm lib/services/autonomousWorker.service.ts"
        }
      }
      ```

      ## Step 7: API Endpoints (Via Vercel)

      Your Vercel deployment automatically exposes:
      ```
      POST /api/ai/process          - General task processing
      POST /api/ai/summarize        - Text summarization
      POST /api/ai/extract          - Information extraction
      POST /api/disasters/analyze   - Disaster analysis

      GET /api/ai/process?jobId=xxx - Check job status
      ```

      ## Step 8: Testing

      ### Local Test
      ```bash
      curl -X POST http://localhost:3000/api/ai/summarize \
        -H "Content-Type: application/json" \
        -d '{
          "text": "Long incident report text here...",
          "userId": "test-user-123"
        }'
      ```

      ### Production Test
      ```bash
      curl -X POST https://your-vercel-app.vercel.app/api/ai/summarize \
        -H "Content-Type: application/json" \
        -d '{
          "text": "Long incident report text here...",
          "userId": "test-user-123"
        }'

      # Response:
      {
        "success": true,
        "jobId": "1",
        "status": "queued"
      }

      # Check status:
      curl https://your-vercel-app.vercel.app/api/ai/process?jobId=1
      ```

      ## Step 9: Monitoring & Logs

      ### Vercel Logs
      ```bash
      vercel logs --prod
      ```

      ### DigitalOcean Logs
      ```bash
      # Via DigitalOcean Console > App Platform > Runtime Logs
      # Or use doctl CLI
      doctl apps get <app-id> --no-header
      ```

      ### Monitor Redis Queue
      ```bash
      redis-cli -h <redis-host> -p <redis-port> -a <password>
      > KEYS *
      > LLEN t5-processing
      ```

      ## Step 10: Scaling Considerations

      ### When to Scale:
      - **Queue backlog > 100 jobs**: Increase worker replicas
      - - **Response time > 5s**: Add Redis cluster upgrade
        - - **DB connections maxed**: Enable DigitalOcean connection pooling
         
          - ### Scale DigitalOcean Resources:
          - ```bash
            # Upgrade PostgreSQL
            # Via Console: Databases > Settings > Resize

            # Upgrade Redis
            # Via Console: Databases > Settings > Resize

            # Scale Workers
            # Via Console: App Platform > Scale
            ```

            ## Troubleshooting

            ### Connection Issues
            ```bash
            # Test DigitalOcean PostgreSQL
            psql postgresql://user:password@host:25060/db?sslmode=require

            # Test DigitalOcean Redis
            redis-cli -h <host> -p <port> -a <password> PING
            ```

            ### Job Queue Not Processing
            ```bash
            # Check Redis connection
            redis-cli -h <host> -p <port> KEYS *

            # Check job status in database
            psql -c "SELECT id, status FROM aIJob LIMIT 5;"

            # Restart worker service
            doctl apps create-deployment <app-id>
            ```

            ### Slow Performance
            ```bash
            # Check T5Gemma logs
            vercel logs --prod | grep "T5Gemma"

            # Monitor model loading time
            vercel env list
            ```

            ## Production Checklist

            - [ ] PostgreSQL automated backups enabled
            - [ ] - [ ] Redis persistence enabled (`appendonly yes`)
            - [ ] - [ ] Vercel auto-scaling configured
            - [ ] - [ ] DigitalOcean firewall rules set
            - [ ] - [ ] Monitoring/alerting configured
            - [ ] - [ ] Environment variables encrypted
            - [ ] - [ ] Database connection pooling enabled
            - [ ] - [ ] Load testing passed (1000+ concurrent jobs)
            - [ ] - [ ] Error tracking configured (Sentry, LogRocket)
            - [ ] - [ ] Disaster recovery plan documented
           
            - [ ] ## Cost Estimation (Monthly)
           
            - [ ] - Vercel: $0 - $20 (included in free tier, pay-as-you-go)
            - [ ] - PostgreSQL (8GB): $45
            - [ ] - Redis (1GB): $15
            - [ ] - App Platform (1 worker): $12
            - [ ] - **Total: ~$72/month** (scales with usage)
           
            - [ ] ## Support & Documentation
           
            - [ ] - Vercel: https://vercel.com/docs
            - [ ] - DigitalOcean: https://docs.digitalocean.com
            - [ ] - T5Gemma: https://huggingface.co/google/t5-base
            - [ ] - Bull Queue: https://optimalbits.github.io/bull/
