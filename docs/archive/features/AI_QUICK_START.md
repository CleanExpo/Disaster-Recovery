# AI Infrastructure - Quick Start Guide
## Get Up and Running in 5 Minutes

---

## Prerequisites Checklist

- [ ] Node.js 18+ installed
- [ ] Redis installed (or Docker)
- [ ] Hugging Face account (free)

---

## Step 1: Get Hugging Face API Key (2 minutes)

1. Go to [huggingface.co/join](https://huggingface.co/join)
2. Sign up (it's free!)
3. Navigate to **Settings** → **Access Tokens**
4. Click **New token** → Select **Read** permissions
5. Copy your API key

---

## Step 2: Configure Environment (1 minute)

Copy `.env.example` to `.env.local`:

```bash
cp .env.example .env.local
```

Edit `.env.local` and add your API key:

```bash
# AI/ML Configuration
HUGGINGFACE_API_KEY=hf_YOUR_KEY_HERE  # ← Paste your key here

# Redis Configuration (defaults should work)
REDIS_HOST=localhost
REDIS_PORT=6379
```

---

## Step 3: Start Redis (30 seconds)

**Option A: Local Redis**
```bash
redis-server
```

**Option B: Docker**
```bash
docker run -d -p 6379:6379 redis:alpine
```

**Option C: Windows**
```bash
# Download Redis for Windows or use WSL
wsl redis-server
```

---

## Step 4: Install Dependencies (30 seconds)

The dependencies are being installed automatically. If needed:

```bash
npm install
```

---

## Step 5: Start the Application (30 seconds)

```bash
# Terminal 1: Start Next.js server
npm run dev

# Terminal 2 (optional): Start AI worker for async processing
npm run worker
```

---

## Step 6: Test the AI (30 seconds)

### Test 1: Basic Health Check

Open browser: `http://localhost:3000/api/ai/health`

You should see:
```json
{
  "status": "healthy",
  "components": {
    "ai": "healthy",
    "redis": "healthy",
    "queue": "healthy",
    "worker": "healthy"
  }
}
```

### Test 2: Text Processing

```bash
curl -X POST http://localhost:3000/api/ai/process \
  -H "Content-Type: application/json" \
  -d '{"input": "Analyze this disaster scenario: fire in building", "async": false}'
```

### Test 3: Disaster Analysis

```bash
curl -X POST http://localhost:3000/api/disasters/analyze \
  -H "Content-Type: application/json" \
  -d '{"description": "Severe flooding in downtown area affecting 50 businesses", "action": "analyze"}'
```

Expected response:
```json
{
  "success": true,
  "analysis": {
    "severity": "high",
    "affectedAreas": ["downtown"],
    "recommendedActions": [
      "Evacuate affected areas immediately",
      "Activate emergency response team"
    ],
    "priorityLevel": 2
  }
}
```

---

## Common Commands

```bash
# Start development server
npm run dev

# Start AI worker
npm run worker

# Check AI health
npm run ai:health

# Check AI statistics
npm run ai:stats

# Run tests
npm run test -- tests/unit/ai-service.test.ts

# Clear cache
curl -X POST http://localhost:3000/api/ai/stats \
  -H "Content-Type: application/json" \
  -d '{"action": "clearCache"}'
```

---

## Troubleshooting

### ❌ "Redis connection failed"
```bash
# Check if Redis is running
redis-cli ping

# If not, start Redis
redis-server
```

### ❌ "Unauthorized: Invalid API key"
```bash
# Verify your API key is in .env.local
cat .env.local | grep HUGGINGFACE_API_KEY

# Test your API key
curl -H "Authorization: Bearer YOUR_KEY" \
  https://api-inference.huggingface.co/models/gpt2
```

### ❌ "Worker not starting"
```bash
# Check Redis is accessible
redis-cli ping

# Check environment variables
npm run worker -- --verbose
```

---

## What's Next?

You now have a fully functional AI infrastructure! Here's what you can do:

1. **Integrate with Frontend**: Use AI endpoints in your React components
2. **Customize Models**: Change AI models in `.env.local`
3. **Scale Workers**: Increase `AI_WORKER_CONCURRENCY` for more throughput
4. **Add Monitoring**: Set up Grafana dashboards
5. **Production Deploy**: Follow [DEPLOYMENT_DOCUMENTATION.md](DEPLOYMENT_DOCUMENTATION.md)

---

## Quick API Reference

| Endpoint | Method | Purpose |
|----------|--------|---------|
| `/api/ai/process` | POST | Text processing |
| `/api/ai/summarize` | POST | Text summarization |
| `/api/ai/extract` | POST | Entity extraction |
| `/api/ai/analyze` | POST | Text analysis |
| `/api/disasters/analyze` | POST | Disaster analysis |
| `/api/ai/health` | GET | Health check |
| `/api/ai/stats` | GET | Statistics |
| `/api/ai/jobs/:id` | GET | Job status |

---

## Need Help?

- 📚 Full docs: [AI_INFRASTRUCTURE_GUIDE.md](AI_INFRASTRUCTURE_GUIDE.md)
- 🔧 Troubleshooting: See "Troubleshooting" section in main guide
- 💬 Support: Check project documentation or create an issue

---

**You're all set! 🎉**

The AI infrastructure is now ready for disaster recovery analysis and automated planning.
