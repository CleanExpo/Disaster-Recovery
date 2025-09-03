# 🚀 NRP Bot System - Complete Deployment Guide

## Table of Contents
1. [System Overview](#system-overview)
2. [Prerequisites](#prerequisites)
3. [Local Development](#local-development)
4. [Production Deployment](#production-deployment)
5. [API Documentation](#api-documentation)
6. [Monitoring & Maintenance](#monitoring--maintenance)
7. [Troubleshooting](#troubleshooting)

## System Overview

The NRP Bot System is a comprehensive dual-bot platform for disaster recovery operations featuring:

- **Client Bot**: 24/7 emergency response and contractor matching
- **Contractor Bot**: Job management and dispatch system
- **Real-time Communication**: WebSocket for live updates
- **Zero Human Intervention**: Fully automated operations
- **Compliance First**: Only verified database content

### Architecture Components

```
┌─────────────────┐     ┌─────────────────┐     ┌─────────────────┐
│   Client CLI    │────▶│   API Server    │◀────│ Contractor CLI  │
└─────────────────┘     └─────────────────┘     └─────────────────┘
                               │
                    ┌──────────┴──────────┐
                    │                     │
              ┌─────▼─────┐         ┌────▼────┐
              │ WebSocket  │         │Database │
              │  Server    │         │(SQLite) │
              └───────────┘         └─────────┘
```

## Prerequisites

### Required Software
- Node.js 18+ 
- npm or yarn
- Docker & Docker Compose
- Git

### Optional (Production)
- PostgreSQL 14+
- Redis 6+
- Nginx
- SSL Certificates

## Local Development

### 1. Initial Setup

```bash
# Clone repository
git clone <repository-url>
cd bots

# Install dependencies
npm install

# Setup environment
cp .env.example .env
# Edit .env with your configuration

# Setup database
npx prisma generate
npx prisma migrate dev
npx tsx prisma/seed.ts
```

### 2. Start Development Servers

**Terminal 1 - API Server:**
```bash
node simple-test-server.js
# Server runs on http://localhost:3005
```

**Terminal 2 - WebSocket Server:**
```bash
npx tsx src/websocket-server.ts
# WebSocket runs on ws://localhost:3002
```

**Terminal 3 - Client Bot CLI:**
```bash
npm run client-bot
# or
npx tsx cli/client-bot/index.ts
```

**Terminal 4 - Contractor Bot CLI:**
```bash
npm run contractor-bot
# or
npx tsx cli/contractor-bot/index.ts
```

### 3. Testing

```bash
# Test API endpoints
node test-api.js

# Test WebSocket
node test-websocket.js

# Run unit tests
npm test
```

## Production Deployment

### 1. Docker Deployment

```bash
# Build and start all services
docker-compose up -d

# View logs
docker-compose logs -f

# Stop services
docker-compose down
```

### 2. Manual Deployment

```bash
# Install production dependencies
npm ci --production

# Build TypeScript
npm run build

# Run migrations
npx prisma migrate deploy

# Start with PM2
pm2 start dist/index.js --name nrp-bot-api
pm2 start dist/websocket-server.js --name nrp-bot-ws
```

### 3. Automated Deployment

```bash
# Deploy to production
./scripts/deploy.sh production

# Rollback if needed
./scripts/deploy.sh production rollback

# Backup database
./scripts/deploy.sh production backup
```

## API Documentation

### Base URLs
- Development: `http://localhost:3005`
- Production: `https://api.nrp-bots.com`
- WebSocket: `ws://localhost:3002` (dev) / `wss://api.nrp-bots.com/ws` (prod)

### Core Endpoints

#### Health Check
```http
GET /health
Response: {
  "status": "healthy",
  "timestamp": "2025-09-03T10:00:00Z",
  "uptime": 3600
}
```

#### Client Message
```http
POST /api/client/message
Body: {
  "message": "I have water damage",
  "sessionId": "session-123",
  "channel": "web"
}
Response: {
  "success": true,
  "response": "Help is on the way...",
  "sessionId": "session-123"
}
```

#### Emergency Report
```http
POST /api/client/emergency
Body: {
  "type": "flooding",
  "location": "123 Main St",
  "phone": "0400000000",
  "description": "Basement flooding"
}
Response: {
  "success": true,
  "emergencyId": "EMRG-123456",
  "contractors": [...]
}
```

### WebSocket Events

#### Client Events
```javascript
// Connect and register
ws.send({
  type: 'register',
  payload: {
    type: 'client',
    metadata: { sessionId: 'xxx' }
  }
});

// Report emergency
ws.send({
  type: 'emergency',
  payload: {
    emergencyType: 'flood',
    location: 'address',
    description: 'details'
  }
});
```

#### Contractor Events
```javascript
// Accept job
ws.send({
  type: 'job_accept',
  payload: {
    jobId: 'JOB-123',
    estimatedArrival: '30 minutes'
  }
});

// Update status
ws.send({
  type: 'job_update',
  payload: {
    jobId: 'JOB-123',
    status: 'in_progress'
  }
});
```

## Monitoring & Maintenance

### Health Monitoring

```bash
# Check system health
curl http://localhost:3005/health

# View metrics
curl http://localhost:3005/metrics

# WebSocket stats
curl http://localhost:3002/stats
```

### Database Management

```bash
# Backup database
sqlite3 dev.db ".backup backup.db"

# View database
npx prisma studio

# Reset database
npx prisma migrate reset
```

### Log Management

```bash
# View API logs
docker-compose logs -f bot-engine

# View WebSocket logs
docker-compose logs -f websocket

# Export logs
docker-compose logs > system-logs.txt
```

## Troubleshooting

### Common Issues

#### Port Already in Use
```bash
# Find process using port
netstat -ano | findstr :3005

# Kill process (Windows)
taskkill //F //PID <process-id>

# Kill process (Linux/Mac)
kill -9 <process-id>
```

#### Database Connection Issues
```bash
# Reset database
rm dev.db
npx prisma migrate dev
npx tsx prisma/seed.ts
```

#### WebSocket Connection Failed
- Check firewall settings
- Verify port 3002 is open
- Check nginx configuration for /ws route

#### Docker Issues
```bash
# Clean Docker system
docker system prune -a

# Rebuild containers
docker-compose build --no-cache
docker-compose up -d
```

### Performance Optimization

1. **Enable Redis Caching**
```javascript
// In production, uncomment Redis configuration
const redis = new Redis({
  host: process.env.REDIS_HOST,
  port: process.env.REDIS_PORT
});
```

2. **Database Indexing**
```sql
-- Add indexes for common queries
CREATE INDEX idx_jobs_status ON Job(status);
CREATE INDEX idx_contractors_location ON Contractor(serviceAreas);
```

3. **Rate Limiting**
```javascript
// Add rate limiting middleware
app.use(rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100
}));
```

## Environment Variables

### Required Variables
```env
# Database
DATABASE_URL=file:./dev.db

# Server
PORT=3005
WS_PORT=3002

# Security
JWT_SECRET=your-secret-key

# API Keys (Optional)
OPENAI_API_KEY=
TWILIO_ACCOUNT_SID=
TWILIO_AUTH_TOKEN=
```

### Production Variables
```env
NODE_ENV=production
DATABASE_URL=postgresql://user:pass@localhost/db
REDIS_URL=redis://localhost:6379
CORS_ORIGINS=https://app.nrp.com.au
SSL_CERT_PATH=/etc/ssl/cert.pem
SSL_KEY_PATH=/etc/ssl/key.pem
```

## Security Best Practices

1. **Always use HTTPS in production**
2. **Implement rate limiting**
3. **Use environment variables for secrets**
4. **Enable CORS only for trusted origins**
5. **Regular security updates**
6. **Database backup strategy**
7. **Monitor for suspicious activity**
8. **Implement request validation**

## Support & Resources

- **Documentation**: `/docs` endpoint
- **API Testing**: Swagger UI at `/docs`
- **Database GUI**: `npx prisma studio`
- **Issues**: GitHub Issues
- **Monitoring**: Grafana dashboards

## License

PROPRIETARY - NRP Disaster Recovery Systems

---

**Last Updated**: September 2025
**Version**: 1.0.0
**Status**: Production Ready