# NRP (NATIONAL RECOVERY PARTNERS) - TECHNICAL DOCUMENTATION

## Platform Overview

### System Design Principles
- **Automation First**: 95% of processes require zero human input
- **Self-Scaling**: Platform grows with contractor participation
- **API-Driven**: All functionality exposed via APIs
- **Event-Driven**: Real-time processing of claims and matches
- **Cloud-Native**: Built for infinite scale on Vercel/Supabase

## Core Systems

### 1. Lead Distribution Engine
**Purpose**: Match insurance claims to contractors in real-time

**Components**:
- AI Assessment Module (Claude 3.5)
- Contractor Matching Algorithm
- Capacity Management System
- Notification Service
- Fallback Router

**Process Flow**:
1. Claim received via API/form
2. AI extracts key details
3. Match to contractor capabilities
4. Check contractor capacity
5. Send notification
6. Track acceptance
7. Route to backup if declined

### 2. SEO Page Generator
**Purpose**: Programmatically create location/service pages

**Components**:
- Location Database (15,387 suburbs)
- Service Taxonomy (45 categories)
- Content Generator (AI-powered)
- Schema Builder
- Sitemap Manager

**Generation Formula**:
```
Total Pages = Locations × Services × Modifiers
692,415 = 15,387 × 45 × 1
```

### 3. Contractor Management System
**Purpose**: Self-service portal for contractors

**Features**:
- Profile management
- Service area definition
- Lead acceptance/rejection
- Performance dashboard
- Billing/invoicing
- Document management

### 4. AI Bot Interface
**Purpose**: Handle all customer interactions

**Capabilities**:
- Natural language processing
- Claim intake
- Status updates
- FAQ responses
- Contractor routing
- Emergency triage

## Technical Stack

### Infrastructure Layer
```
Vercel (Edge Functions)
├── Global CDN
├── Auto-scaling
├── Edge caching
└── Analytics

Supabase (Backend)
├── PostgreSQL database
├── Real-time subscriptions
├── Authentication
├── Storage buckets
└── Edge functions
```

### Application Layer
```
Next.js 14.2.14
├── App Router
├── Server Components
├── API Routes
├── Middleware
└── Static Generation

React 18.3.1
├── Component architecture
├── State management
├── Form handling
└── UI interactions
```

### Data Layer
```
Prisma ORM
├── Type-safe queries
├── Migration management
├── Connection pooling
└── Query optimization

PostgreSQL
├── JSONB for flexibility
├── Full-text search
├── Geographic queries
└── Time-series data
```

## Automation Scripts

### PowerShell Orchestration
```powershell
# Main automation pipeline
start-automation-system.ps1
├── claude-orchestrator.ps1
├── claude-data-pipeline.ps1
├── sync-vercel-env.ps1
└── docker-build-and-run.ps1
```

### Node.js Scripts
```javascript
// SEO and deployment
scripts/
├── validate-env.js
├── auto-deploy.js
├── generate-images.js
├── seo-process-images.js
└── deployment-monitor.js
└── postinstall.js
```

## API Architecture

### RESTful Endpoints
```
/api/v1/
├── /leads
│   ├── POST   /submit
│   ├── GET    /:id
│   └── PUT    /:id/status
├── /contractors
│   ├── GET    /search
│   ├── POST   /register
│   └── GET    /:id/profile
├── /locations
│   ├── GET    /search
│   └── GET    /:suburb
└── /pages
    ├── GET    /generate
    └── GET    /:slug
```

### WebSocket Events
```
Real-time subscriptions:
- lead.created
- lead.accepted
- contractor.online
- contractor.offline
- match.created
- match.expired
```

## Database Design

### Core Schema
```sql
-- Contractors
contractors
├── id (UUID)
├── business_name
├── abn
├── service_radius
├── subscription_tier
└── performance_score

-- Leads
leads
├── id (UUID)
├── claim_number
├── property_address
├── disaster_type
├── urgency_level
└── insurance_company

-- Matches
matches
├── lead_id
├── contractor_id
├── status
├── response_time
└── completion_date

-- Pages
pages
├── slug
├── location
├── service
├── content
├── schema_markup
└── last_updated
```

## Security Implementation

### Authentication Flow
1. Contractor login with email/password
2. JWT generation with refresh token
3. Role-based permissions
4. Session management
5. 2FA for high-value operations

### Data Protection
- Environment variables validated on build
- All API endpoints rate-limited
- SQL injection prevented via Prisma
- XSS protection in React
- CSRF tokens for state changes

## Performance Metrics

### Current Benchmarks
- API Response: <200ms p95
- Page Load: <1s (Lighthouse 95+)
- Database Queries: <50ms p95
- Image Optimization: 80% size reduction
- Cache Hit Rate: >90%

### Scaling Targets
- 10,000 concurrent users
- 1,000 pages/day generation
- 100,000 API calls/minute
- 1M database rows
- 99.9% uptime SLA

## Deployment Pipeline

### CI/CD Workflow
```yaml
1. Push to main branch
2. Vercel webhook triggered
3. Environment validation
4. Prisma migration
5. Build optimization
6. Edge deployment
7. Cache invalidation
8. Monitoring alerts
```

### Environment Management
```bash
.env.local       # Local development
.env.staging     # Staging environment
.env.production  # Production settings
.env.docker      # Docker configuration
```

## Monitoring & Observability

### Key Metrics
- Request latency
- Error rates
- Contractor response times
- Lead conversion rates
- SEO rankings
- System health

### Alert Thresholds
- API errors > 1%
- Response time > 500ms
- Database connections > 80%
- Lead backlog > 100
- Contractor availability < 50%

## Integration Specifications

### Insurance Company API
```json
{
  "claim_id": "string",
  "policy_number": "string",
  "incident_date": "ISO8601",
  "property_details": {},
  "damage_assessment": {},
  "authorization": "Bearer token"
}
```

### Contractor Webhook
```json
{
  "event": "lead.available",
  "lead_id": "UUID",
  "location": "suburb",
  "service": "water-damage",
  "urgency": "emergency",
  "estimated_value": 5000
}
```

## Disaster Recovery Plan

### Backup Strategy
- Database: Daily snapshots
- Code: Git version control
- Media: Supabase storage replication
- Configuration: Encrypted backups

### Failover Process
1. Vercel edge network handles regional failures
2. Supabase automatic failover
3. CloudFlare DNS switching
4. Backup notification system
5. Manual intervention protocols

## Future Architecture

### Microservices Migration
```
Planned services:
- Lead Service
- Contractor Service
- SEO Service
- Analytics Service
- Payment Service
```

### AI Enhancement
- GPT-4 integration
- Computer vision for damage assessment
- Predictive claim routing
- Automated quality scoring
- Natural language phone system