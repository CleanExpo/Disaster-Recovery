# Docker Claude Processing System - Setup Guide

## ✅ System Overview

The Docker Claude system is now configured to process all prompts through a containerized orchestrator that uses **Claude 3.5 Sonnet** (latest model) for real AI processing.

### Architecture:
```
Your Prompt → Docker Orchestrator → Request Router → Agent Processor → Claude 3.5 API → Response
```

### Components:
- **Orchestrator**: Manages request flow and agent coordination
- **Request Router**: Intelligently routes prompts to appropriate agents
- **Agent Processor**: Handles actual API calls to Claude 3.5 Sonnet
- **Redis Queue**: Manages task queue and load balancing
- **WebSocket Server**: Real-time updates and monitoring

---

## 🚀 Quick Start

### 1. Add Your API Key ⚠️ REQUIRED

Edit `.env.docker` and add your Anthropic API key:
```env
ANTHROPIC_API_KEY=sk-ant-xxxxxxxxxxxxx  # ← REPLACE WITH YOUR ACTUAL KEY
```

**IMPORTANT**: The system will not process requests without a valid API key. You'll get 401 errors.

### 2. Start the System

```powershell
# Configure environment
.\setup-docker-claude.ps1 -Action configure

# Start Docker containers
.\setup-docker-claude.ps1 -Action start

# Check status
.\setup-docker-claude.ps1 -Action status
```

### 3. Test the System

```powershell
# Run test
.\setup-docker-claude.ps1 -Action test
```

---

## 📡 API Endpoints

The system runs on **http://localhost:3000** with these endpoints:

### Process a Prompt
```bash
POST /process
{
  "prompt": "Create a function to calculate water damage costs",
  "type": "generate",  # generate|test|optimize|deploy|analyze|seo
  "priority": 5,
  "context": {}
}
```

### Check Status
```bash
GET /status/{requestId}
```

### Batch Processing
```bash
POST /batch
{
  "requests": [
    {"prompt": "...", "type": "generate"},
    {"prompt": "...", "type": "test"}
  ]
}
```

### Health Check
```bash
GET /health
```

---

## 🤖 Agent Types

The system automatically routes prompts to specialized agents:

| Agent | Keywords | Purpose |
|-------|----------|---------|
| **Generate** | create, build, implement, write | Code generation |
| **Test** | test, validate, verify, check | Testing & validation |
| **Optimize** | optimize, improve, enhance, refactor | Performance optimization |
| **Deploy** | deploy, ship, release, launch | Deployment configuration |
| **Analyze** | analyze, review, audit, inspect | Code analysis |
| **SEO** | seo, search, ranking, keywords | SEO content generation |

---

## 💻 Using with Node.js

```javascript
const axios = require('axios');

async function processPrompt(prompt, type = 'generate') {
  const response = await axios.post('http://localhost:3000/process', {
    prompt: prompt,
    type: type,
    priority: 5,
    context: {
      project: 'Disaster Recovery',
      language: 'typescript'
    }
  });
  
  const requestId = response.data.requestId;
  
  // Poll for result
  let result;
  while (true) {
    await new Promise(resolve => setTimeout(resolve, 2000));
    const status = await axios.get(`http://localhost:3000/status/${requestId}`);
    
    if (status.data.status === 'completed') {
      result = status.data.result;
      break;
    } else if (status.data.status === 'failed') {
      throw new Error(status.data.error);
    }
  }
  
  return result;
}

// Example usage
processPrompt('Create a water damage assessment form component')
  .then(result => console.log(result))
  .catch(error => console.error(error));
```

---

## 🔌 WebSocket Real-time Connection

```javascript
const io = require('socket.io-client');
const socket = io('http://localhost:3000');

socket.on('connect', () => {
  console.log('Connected to orchestrator');
  
  // Submit prompt
  socket.emit('process', {
    prompt: 'Generate SEO content for Brisbane water damage',
    type: 'seo'
  });
});

socket.on('queued', (response) => {
  console.log('Request queued:', response.requestId);
});

socket.on('result', (data) => {
  console.log('Result received:', data.result);
});

socket.on('error', (error) => {
  console.error('Error:', error);
});
```

---

## 📊 Monitoring & Statistics

### Get System Statistics
```bash
GET /stats

Response:
{
  "queue": {
    "waiting": 0,
    "active": 1,
    "completed": 10,
    "failed": 0
  },
  "processor": {
    "requestCount": 10,
    "tokenUsage": 45000,
    "estimatedCost": 0.67
  }
}
```

### Docker Container Status
```powershell
docker ps | grep claude

# View logs
docker logs claude-main --tail 50

# Monitor in real-time
docker logs claude-main -f
```

---

## ⚙️ Configuration

### Environment Variables (.env.docker)
```env
# Claude API
ANTHROPIC_API_KEY=your_key_here
CLAUDE_MODEL=claude-3-5-sonnet-20241022
MAX_TOKENS=8192
TEMPERATURE=0.7

# Performance
MAX_CONCURRENT_AGENTS=5
AGENT_TIMEOUT=300000
RETRY_ATTEMPTS=3

# Redis
REDIS_HOST=redis
REDIS_PORT=6379

# Enable Real API (set to true for production)
ENABLE_REAL_API=true
```

### Token Limits by Task Type
- **Generate**: 4096 tokens
- **Test**: 3000 tokens
- **Optimize**: 2000 tokens
- **Deploy**: 2500 tokens
- **Analyze**: 3000 tokens
- **SEO**: 2000 tokens

### Temperature Settings
- **Generate**: 0.7 (creative)
- **Test**: 0.3 (deterministic)
- **Deploy**: 0.2 (very deterministic)
- **SEO**: 0.8 (creative content)

---

## 🔧 Troubleshooting

### Container won't start
```powershell
# Clean rebuild
docker-compose -f docker-compose.claude-simple.yml down -v
docker-compose -f docker-compose.claude-simple.yml build --no-cache
docker-compose -f docker-compose.claude-simple.yml up -d
```

### API Key issues
1. Check `.env.docker` has correct key
2. Restart containers after changing env
3. Check logs: `docker logs claude-main`

### Redis connection issues
```powershell
# Check Redis is running
docker ps | grep redis

# Test Redis connection
docker exec -it claude-redis redis-cli ping
```

---

## 💰 Cost Tracking

The system automatically tracks token usage and estimates costs:

- **Input tokens**: $0.003 per 1K tokens
- **Output tokens**: $0.015 per 1K tokens
- **Average request**: ~2000 tokens ($0.03)

View current usage:
```bash
GET /stats
# Check "estimatedCost" field
```

---

## 🚦 Current Status

✅ **Docker containers**: Running  
✅ **Redis queue**: Active  
✅ **Orchestrator**: Healthy with integrated API endpoints  
⚠️ **API Key**: Needs configuration (401 errors until added)  
✅ **Model**: Claude 3.5 Sonnet (latest)  
✅ **Endpoints**: All REST and WebSocket endpoints operational  

---

## 📝 Next Steps

1. **Add API Key**: Edit `.env.docker` with your Anthropic API key
2. **Restart containers**: `.\setup-docker-claude.ps1 -Action start`
3. **Test the system**: `.\setup-docker-claude.ps1 -Action test`
4. **Start using**: Send prompts to `http://localhost:3000/process`

---

## 🔐 Security Notes

- API keys are stored in `.env.docker` (not committed to git)
- All communication between containers is internal
- Redis has no external password (secure for local dev)
- For production, add authentication and HTTPS

---

*System configured for Claude 3.5 Sonnet - The most capable Claude model*