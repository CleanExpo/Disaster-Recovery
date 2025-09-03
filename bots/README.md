# NRP Bot System - Production Ready

## Overview
Dual bot system for disaster recovery operations with zero human intervention. Features Client Bot for emergency response/insurance claims and Contractor Bot for job management.

## Quick Start

### Development Setup
```bash
# Install dependencies
npm install

# Setup database
npx prisma migrate dev
npx prisma db seed

# Start development server
npm run dev

# Run CLI bots
npm run client-bot
npm run contractor-bot
```

### Production Deployment
```bash
# Using Docker
docker-compose up -d

# Manual deployment
npm run build
npm run start:prod
```

## Environment Setup
1. Copy `.env.example` to `.env`
2. Update database credentials
3. Add API keys (OpenAI, Twilio)
4. Configure Redis connection

## API Endpoints

### Client Bot
- `POST /api/client/message` - Process client message
- `POST /api/client/emergency` - Handle emergency request
- `GET /api/client/guides` - Get step-by-step guides
- `POST /api/client/insurance/claim` - Submit insurance claim

### Contractor Bot  
- `POST /api/contractor/auth/login` - Contractor login
- `GET /api/contractor/jobs/available` - Get available jobs
- `POST /api/contractor/jobs/:id/accept` - Accept job
- `PATCH /api/contractor/jobs/:id/status` - Update job status

### Health & Monitoring
- `GET /health` - System health check
- `GET /metrics` - Performance metrics
- WebSocket: `ws://localhost:3002` - Real-time updates

## Database Commands
```bash
npx prisma migrate dev     # Run migrations
npx prisma db seed        # Seed database
npx prisma studio         # Open database GUI
```

## Testing
```bash
npm test                  # Run tests
npm run test:coverage     # Coverage report
```

## Docker Commands
```bash
docker-compose up -d      # Start all services
docker-compose logs -f    # View logs
docker-compose down       # Stop services
```

## Architecture
- **ElysiaJS**: 18x faster than Express
- **PostgreSQL**: Primary database
- **Redis**: Caching & sessions
- **Qdrant**: Vector search
- **Bull**: Job queues
- **WebSocket**: Real-time communication

## Compliance Features
- Data verification layer
- Prohibited content filtering
- Source attribution
- Audit logging
- No health/legal advice

## Production Checklist
- [ ] Environment variables configured
- [ ] Database migrated and seeded
- [ ] SSL certificates installed
- [ ] Redis password set
- [ ] JWT secret updated
- [ ] API keys added
- [ ] Monitoring configured
- [ ] Backup system active

## Support
For issues, check logs in `/logs` directory or monitor via Grafana at `http://localhost:3003`