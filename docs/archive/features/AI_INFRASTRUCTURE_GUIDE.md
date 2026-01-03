# AI Infrastructure Guide
## Disaster Recovery - NRPG Platform

**Phase 23: AI/ML Infrastructure - Production Ready**

---

## Table of Contents
1. [Overview](#overview)
2. [Architecture](#architecture)
3. [Components](#components)
4. [Setup & Installation](#setup--installation)
5. [Configuration](#configuration)
6. [API Endpoints](#api-endpoints)
7. [Usage Examples](#usage-examples)
8. [Monitoring & Health Checks](#monitoring--health-checks)
9. [Testing](#testing)
10. [Troubleshooting](#troubleshooting)

---

## Overview

The AI infrastructure provides intelligent disaster analysis, recovery planning, and automated text processing capabilities using Hugging Face models, Redis caching, and Bull queue job processing.

### Key Features
- **Text Processing**: AI-powered text generation and completion
- **Summarization**: Automatic summarization of disaster reports
- **Entity Extraction**: Extract locations, organizations, and key entities
- **Sentiment Analysis**: Analyze severity and impact
- **Recovery Planning**: Generate automated recovery plans
- **Async Processing**: Background job processing with Bull queue
- **Caching**: LRU cache with Redis backing
- **Rate Limiting**: 60 requests per minute per service
- **Health Monitoring**: Comprehensive health checks

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     AI Infrastructure                        │
└─────────────────────────────────────────────────────────────┘
                              │
        ┌─────────────────────┼─────────────────────┐
        │                     │                     │
┌───────▼────────┐   ┌────────▼────────┐   ┌──────▼──────┐
│  API Endpoints │   │  AI Services    │   │   Worker    │
│                │   │                 │   │   Service   │
│ - /ai/process  │   │ - Text Process  │   │             │
│ - /ai/summarize│   │ - Summarize     │   │ Bull Queue  │
│ - /ai/extract  │   │ - Extract       │   │ Processor   │
│ - /ai/analyze  │   │ - Analyze       │   │             │
│ - /disasters/* │   │                 │   │ Concurrency │
└────────┬───────┘   └────────┬────────┘   └──────┬──────┘
         │                    │                    │
         └────────────────────┼────────────────────┘
                              │
                    ┌─────────▼─────────┐
                    │   Redis + Queue   │
                    │                   │
                    │ - Connection Pool │
                    │ - Job Storage     │
                    │ - LRU Cache       │
                    └───────────────────┘
```

---

## Components

### 1. **AI Service** (`src/lib/ai/ai.service.ts`)
Core AI processing service with Hugging Face integration.

**Features:**
- Text generation and completion
- Summarization
- Entity extraction
- Sentiment analysis
- LRU caching
- Rate limiting

### 2. **Autonomous Worker** (`src/lib/ai/autonomous-worker.service.ts`)
Background job processor for async AI tasks.

**Features:**
- Bull queue integration
- Concurrent job processing (default: 5)
- Job progress tracking
- Error handling and retry logic
- Statistics tracking

### 3. **Disaster Recovery Agent** (`src/lib/ai/disaster-recovery-agent.service.ts`)
Domain-specific AI agent for disaster scenarios.

**Features:**
- Disaster severity analysis
- Recovery plan generation
- Resource allocation
- Risk assessment
- Timeline estimation

### 4. **Redis Manager** (`src/lib/config/redis.config.ts`)
Singleton Redis connection manager.

**Features:**
- Connection pooling
- Auto-reconnection
- Health checks
- Pub/Sub support

### 5. **Queue Manager** (`src/lib/config/queue.config.ts`)
Bull queue management system.

**Features:**
- Job lifecycle management
- Queue statistics
- Event handling
- Retry policies

---

## Setup & Installation

### Prerequisites
- Node.js 18+ installed
- Redis server installed and running
- Hugging Face API key (free tier available)

### Step 1: Install Dependencies

```bash
# Install AI dependencies
npm install @xenova/transformers @huggingface/inference pino node-cache

# Install dev dependencies
npm install -D @types/node-cache @types/bull

# Or use the automated script
chmod +x T5GEMMA_CLI_INSTALL.sh
./T5GEMMA_CLI_INSTALL.sh
```

### Step 2: Start Redis

```bash
# Option 1: Default Redis
redis-server

# Option 2: With custom config
redis-server /path/to/redis.conf

# Option 3: Docker
docker run -d -p 6379:6379 redis:alpine
```

### Step 3: Configure Environment Variables

Copy `.env.example` to `.env.local` and configure:

```bash
# AI/ML Configuration
HUGGINGFACE_API_KEY=hf_your_api_key_here
AI_MODEL_NAME=gpt2
AI_CACHE_SIZE=1000
AI_CACHE_TTL=3600000
AI_RATE_LIMIT=60
AI_WORKER_CONCURRENCY=5
AI_QUEUE_NAME=ai-processing

# Redis Configuration
REDIS_HOST=localhost
REDIS_PORT=6379
REDIS_PASSWORD=
REDIS_DB=0
```

### Step 4: Start the Worker (Optional)

For async processing, start the autonomous worker:

```bash
# Terminal 1: Start Redis
redis-server

# Terminal 2: Start Worker
npm run worker

# Or manually
ts-node src/lib/ai/init-worker.ts
```

### Step 5: Start Development Server

```bash
npm run dev
```

---

## Configuration

### Environment Variables

| Variable | Default | Description |
|----------|---------|-------------|
| `HUGGINGFACE_API_KEY` | - | Hugging Face API key (required) |
| `AI_MODEL_NAME` | `gpt2` | Default AI model |
| `AI_CACHE_SIZE` | `1000` | Max cache entries |
| `AI_CACHE_TTL` | `3600000` | Cache TTL in ms (1 hour) |
| `AI_RATE_LIMIT` | `60` | Requests per minute |
| `AI_WORKER_CONCURRENCY` | `5` | Concurrent jobs |
| `AI_QUEUE_NAME` | `ai-processing` | Bull queue name |
| `REDIS_HOST` | `localhost` | Redis host |
| `REDIS_PORT` | `6379` | Redis port |
| `REDIS_PASSWORD` | - | Redis password (optional) |
| `REDIS_DB` | `0` | Redis database number |

### Getting a Hugging Face API Key

1. Visit [huggingface.co](https://huggingface.co)
2. Sign up for a free account
3. Go to Settings → Access Tokens
4. Create a new token with read permissions
5. Copy and paste into `.env.local`

---

## API Endpoints

### 1. POST `/api/ai/process`
Process text with AI model.

**Request:**
```json
{
  "input": "Your text here",
  "options": {
    "maxLength": 150,
    "temperature": 0.7
  },
  "async": false
}
```

**Response:**
```json
{
  "success": true,
  "result": "Processed text output..."
}
```

### 2. POST `/api/ai/summarize`
Summarize long text.

**Request:**
```json
{
  "input": "Long text to summarize (min 100 chars)...",
  "options": {
    "minLength": 30,
    "maxLength": 130
  },
  "async": false
}
```

**Response:**
```json
{
  "success": true,
  "summary": "Concise summary...",
  "originalLength": 500,
  "summaryLength": 100,
  "compressionRatio": "80.00%"
}
```

### 3. POST `/api/ai/extract`
Extract entities and information.

**Request:**
```json
{
  "input": "Apple Inc. is in Cupertino, California.",
  "options": {
    "confidence": 0.9
  },
  "async": false
}
```

**Response:**
```json
{
  "success": true,
  "extracted": {
    "entities": [
      {
        "text": "Apple Inc.",
        "type": "ORG",
        "confidence": 0.95
      },
      {
        "text": "Cupertino",
        "type": "LOC",
        "confidence": 0.92
      }
    ]
  },
  "entityCount": 2
}
```

### 4. POST `/api/ai/analyze`
Comprehensive text analysis.

**Request:**
```json
{
  "input": "This is an excellent product!",
  "async": false
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "sentiment": {
      "label": "POSITIVE",
      "score": 0.98
    },
    "entities": [...]
  }
}
```

### 5. POST `/api/disasters/analyze`
Disaster-specific analysis and planning.

**Request:**
```json
{
  "description": "Severe flooding affecting 50 businesses in downtown",
  "action": "analyze",
  "metadata": {
    "userId": "user123",
    "tenantId": "tenant456"
  },
  "async": false
}
```

**Response:**
```json
{
  "success": true,
  "analysis": {
    "severity": "high",
    "affectedAreas": ["downtown"],
    "estimatedImpact": {
      "financial": 150000,
      "operational": 75,
      "reputation": 60
    },
    "recommendedActions": [
      "Evacuate affected areas immediately",
      "Activate emergency response team",
      "Assess immediate safety risks"
    ],
    "priorityLevel": 2,
    "timeframe": "Urgent (1-3 days)"
  }
}
```

### 6. GET `/api/ai/jobs/:jobId`
Get job status and result.

**Response:**
```json
{
  "success": true,
  "job": {
    "id": "123",
    "state": "completed",
    "progress": { "percentage": 100, "status": "Completed" },
    "result": { ... }
  }
}
```

### 7. GET `/api/ai/health`
AI infrastructure health check.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2025-12-23T08:00:00.000Z",
  "components": {
    "ai": "healthy",
    "redis": "healthy",
    "queue": "healthy",
    "worker": "healthy"
  }
}
```

### 8. GET `/api/ai/stats`
Get AI system statistics.

**Response:**
```json
{
  "success": true,
  "ai": {
    "cacheSize": 42,
    "requestCount": 156,
    "cacheHitRate": 26.92
  },
  "worker": {
    "isRunning": true,
    "processedJobs": 120,
    "failedJobs": 3,
    "successRate": 97.56
  },
  "queue": {
    "waiting": 5,
    "active": 2,
    "completed": 120,
    "failed": 3
  }
}
```

---

## Usage Examples

### Synchronous Text Processing

```typescript
import { processText } from '@/lib/ai/ai.service';

const result = await processText('Analyze this disaster scenario', {
  maxLength: 200,
  temperature: 0.7,
});

console.log(result);
```

### Async Job Processing

```typescript
import { addAIJob } from '@/lib/config/queue.config';

// Queue job
const job = await addAIJob({
  type: 'analyze',
  input: 'Long disaster report...',
  userId: 'user123',
  tenantId: 'tenant456',
});

console.log(`Job queued: ${job.id}`);

// Check status later
const response = await fetch(`/api/ai/jobs/${job.id}`);
const status = await response.json();
```

### Disaster Analysis

```typescript
import { analyzeDisaster, generateRecoveryPlan } from '@/lib/ai/disaster-recovery-agent.service';

// Analyze disaster
const analysis = await analyzeDisaster(
  'Hurricane damaged 200 homes in coastal area',
  { location: 'Miami, FL' }
);

// Generate recovery plan
const plan = await generateRecoveryPlan('disaster-123', analysis);

console.log(`Severity: ${analysis.severity}`);
console.log(`Estimated cost: $${plan.totalCost}`);
console.log(`Phases: ${plan.phases.length}`);
```

### Using the API from Frontend

```typescript
// React component example
const analyzeDisaster = async (description: string) => {
  const response = await fetch('/api/disasters/analyze', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      description,
      action: 'plan',
      async: true,
    }),
  });

  const data = await response.json();

  if (data.success) {
    console.log(`Job ID: ${data.jobId}`);
    // Poll for results
    pollJobStatus(data.jobId);
  }
};

const pollJobStatus = async (jobId: string) => {
  const response = await fetch(`/api/ai/jobs/${jobId}`);
  const data = await response.json();

  if (data.job.state === 'completed') {
    console.log('Result:', data.job.result);
  } else {
    // Poll again in 2 seconds
    setTimeout(() => pollJobStatus(jobId), 2000);
  }
};
```

---

## Monitoring & Health Checks

### Health Check Endpoint

```bash
# Basic health check
curl http://localhost:3000/api/ai/health

# Detailed health check
curl http://localhost:3000/api/ai/health?detailed=true
```

### Statistics Monitoring

```bash
# Get system statistics
curl http://localhost:3000/api/ai/stats
```

### Worker Monitoring

Monitor worker output in logs:

```bash
# View worker logs
tail -f logs/combined.log | grep "AI Worker"
```

### Queue Monitoring

Check Bull queue dashboard (optional):

```bash
# Install Bull Board
npm install @bull-board/api @bull-board/express

# Access dashboard at http://localhost:3000/admin/queues
```

---

## Testing

### Run Unit Tests

```bash
# Run AI service tests
npm run test -- tests/unit/ai-service.test.ts

# Run with coverage
npm run test:coverage
```

### Run Integration Tests

```bash
# Ensure Redis is running first
redis-server

# Run integration tests
npm run test -- tests/integration/ai-worker.test.ts
```

### Manual Testing

```bash
# Test AI processing endpoint
curl -X POST http://localhost:3000/api/ai/process \
  -H "Content-Type: application/json" \
  -d '{"input": "Test text", "async": false}'

# Test disaster analysis
curl -X POST http://localhost:3000/api/disasters/analyze \
  -H "Content-Type: application/json" \
  -d '{"description": "Fire in warehouse", "action": "analyze"}'
```

---

## Troubleshooting

### Redis Connection Issues

**Problem:** `Error: Redis connection failed`

**Solutions:**
1. Verify Redis is running: `redis-cli ping` (should return `PONG`)
2. Check Redis configuration in `.env.local`
3. Verify firewall rules allow port 6379
4. Check Redis logs: `redis-server --loglevel debug`

### Worker Not Starting

**Problem:** `Worker failed to initialize`

**Solutions:**
1. Ensure Redis is running and accessible
2. Check environment variables are set
3. Verify Bull queue dependencies installed
4. Check logs for detailed error messages

### API Key Issues

**Problem:** `Unauthorized: Invalid API key`

**Solutions:**
1. Verify `HUGGINGFACE_API_KEY` in `.env.local`
2. Ensure API key has read permissions
3. Test API key: `curl -H "Authorization: Bearer YOUR_KEY" https://api-inference.huggingface.co/models/gpt2`

### Rate Limiting

**Problem:** `Rate limit exceeded`

**Solutions:**
1. Use async processing for bulk operations
2. Implement client-side request throttling
3. Increase `AI_RATE_LIMIT` if you have higher tier API access
4. Use caching to reduce API calls

### Memory Issues

**Problem:** High memory usage or OOM errors

**Solutions:**
1. Reduce `AI_CACHE_SIZE` in configuration
2. Lower `AI_WORKER_CONCURRENCY`
3. Implement job priorities for large tasks
4. Monitor memory usage: `GET /api/ai/health?detailed=true`

### Queue Stalled Jobs

**Problem:** Jobs stuck in "active" state

**Solutions:**
1. Check worker is running: `GET /api/ai/health`
2. Restart worker process
3. Clear stalled jobs: `redis-cli DEL bull:ai-processing:*`
4. Increase job timeout in queue configuration

---

## Performance Optimization

### Caching Strategy

```typescript
// Adjust cache settings for your use case
const aiService = AIService.getInstance({
  maxCacheSize: 2000,  // Increase for more caching
  cacheTTL: 7200000,   // 2 hours
});
```

### Worker Concurrency

```typescript
// Adjust based on server capacity
AI_WORKER_CONCURRENCY=10  // For powerful servers
AI_WORKER_CONCURRENCY=2   // For limited resources
```

### Request Batching

```typescript
// Queue multiple jobs at once
const jobs = await Promise.all([
  addAIJob({ type: 'analyze', input: report1 }),
  addAIJob({ type: 'analyze', input: report2 }),
  addAIJob({ type: 'analyze', input: report3 }),
]);
```

---

## Production Checklist

### Before Deployment

- [ ] Set `HUGGINGFACE_API_KEY` in production environment
- [ ] Configure Redis with authentication (`REDIS_PASSWORD`)
- [ ] Set up Redis persistence (AOF or RDB)
- [ ] Configure log file rotation
- [ ] Set `NODE_ENV=production`
- [ ] Enable monitoring and alerting
- [ ] Set up backup Redis instance (optional)
- [ ] Configure rate limiting per tenant
- [ ] Test disaster recovery scenarios
- [ ] Review and adjust cache TTL
- [ ] Set up health check alerts

### Monitoring Setup

```bash
# Prometheus metrics (future enhancement)
GET /metrics

# Grafana dashboard
- AI request rate
- Cache hit rate
- Queue depth
- Worker utilization
- Error rate
```

---

## API Response Times

Expected response times (approximate):

| Operation | Sync | Async (Queue) |
|-----------|------|---------------|
| Text Process | 1-3s | < 100ms |
| Summarize | 2-5s | < 100ms |
| Extract | 1-2s | < 100ms |
| Analyze | 3-6s | < 100ms |
| Disaster Plan | 5-10s | < 100ms |

---

## Security Considerations

1. **API Key Management**: Store API keys in secure vault (AWS Secrets Manager, HashiCorp Vault)
2. **Rate Limiting**: Implement per-user rate limits
3. **Input Validation**: Sanitize all user inputs
4. **Authentication**: Require authentication for AI endpoints
5. **Audit Logging**: Log all AI operations for compliance
6. **Data Privacy**: Ensure compliance with GDPR/CCPA
7. **Network Security**: Use HTTPS in production

---

## Cost Estimation

### Hugging Face API Costs

- **Free Tier**: 1,000 requests/day
- **Pro Tier**: $9/month - 10,000 requests/day
- **Enterprise**: Custom pricing

### Redis Hosting

- **Local**: Free (self-hosted)
- **Redis Cloud**: From $5/month
- **AWS ElastiCache**: From $15/month
- **Azure Cache**: From $20/month

### Estimated Monthly Costs (1000 users)

- Hugging Face Pro: $9-29/month
- Redis hosting: $15-50/month
- Compute: $50-200/month (depending on worker load)
- **Total**: $74-279/month

---

## Future Enhancements

### Planned Features
- [ ] Custom fine-tuned models for disaster scenarios
- [ ] Multi-model support (OpenAI, Claude, etc.)
- [ ] Real-time streaming responses
- [ ] Advanced caching strategies (distributed cache)
- [ ] A/B testing for different models
- [ ] Cost tracking and optimization
- [ ] Model performance metrics
- [ ] Automated model selection
- [ ] Vector embeddings for semantic search
- [ ] RAG (Retrieval Augmented Generation) support

---

## Support & Resources

### Documentation
- [Hugging Face Docs](https://huggingface.co/docs)
- [Bull Queue Docs](https://github.com/OptimalBits/bull)
- [Redis Docs](https://redis.io/documentation)

### Getting Help
- Check logs: `logs/combined.log`
- Health check: `GET /api/ai/health?detailed=true`
- GitHub Issues: [Report issues](https://github.com/your-repo/issues)

---

**Last Updated**: 2025-12-23
**Version**: 1.0.0
**Status**: Production Ready ✅
