# NRP CRM Architecture Analysis & Recommendations

Based on analysis of three reference architectures: Seamless-Architecture, VibeCode Docker Architecture, and Unite-Group Agency Integration Strategy.

## Executive Summary

The National Recovery Partners (NRP) CRM system requires a sophisticated, self-scaling architecture capable of handling nationwide disaster recovery operations across Australia. Based on the analyzed reference architectures, this document provides specific recommendations for building a Docker-based microservices CRM system that aligns with NRP's business model of **zero human intervention** and **national SEO domination**.

## Reference Architecture Analysis

### 1. VibeCode Docker Architecture (Primary Reference)

**Strengths Identified:**
- **Comprehensive Microservices Design**: Clear separation of concerns with 7 distinct services
- **Multi-Database Strategy**: PostgreSQL for structured data, MongoDB for documents, Redis for caching
- **Environment-Specific Configs**: Separate development, staging, and production configurations
- **Network Segmentation**: 4 isolated networks for security and performance
- **Horizontal Scaling**: Production setup with replicas and resource limits
- **Monitoring Stack**: Prometheus, Grafana, ELK stack for comprehensive monitoring
- **Health Checks**: Built-in health monitoring for all services

**Key Components:**
- Frontend Service (Next.js) - Port 3000
- Backend API (Node.js/Express) - Port 4000
- PostgreSQL Database - Port 5432
- MongoDB Document Store - Port 27017
- Redis Cache - Port 6379
- AI/ML Service (Python/FastAPI) - Port 8000
- MCP Orchestration Service - Port 9000
- Development Tools Service - Port 8080
- Nginx Load Balancer - Ports 80/443

### 2. Seamless-Architecture (Cost Optimization Reference)

**Key Features for NRP CRM:**
- **Intelligent LLM Router**: 82% cost reduction through dynamic model selection
- **Three-Tier Cost System**: Good ($0.10-3) → Better ($3-15) → Best ($15-75)
- **Real-time Budget Monitoring**: Critical for operational cost control
- **Parallel Development**: Multi-agent coordination for rapid development
- **Auto-Setup System**: One-command deployment and configuration

### 3. Unite-Group Integration Strategy (Development Pattern)

**Valuable Patterns:**
- **Clean Separation**: Development vs. Production environment isolation
- **Selective Integration**: Only production-ready components transferred
- **Structured File Organization**: Clear mapping of components and pages
- **Safe Development**: Risk-free experimentation environment

## NRP CRM Architecture Recommendations

### Core Service Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                    Nginx Load Balancer                         │
│                     (SSL Termination)                          │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────┴───────────────────────────────────────┐
│                   NRP CRM Frontend                             │
│                  (Next.js Dashboard)                           │
│                     Port: 3000                                 │
└─────────────────────────┬───────────────────────────────────────┘
                          │
┌─────────────────────────┴───────────────────────────────────────┐
│                 API Gateway Service                            │
│               (Authentication & Routing)                       │
│                     Port: 4000                                 │
└─────┬─────┬─────┬─────┬─────┬─────┬─────┬─────┬────────────────┘
      │     │     │     │     │     │     │     │
   ┌──▼─┐ ┌─▼─┐ ┌─▼─┐ ┌─▼─┐ ┌─▼─┐ ┌─▼─┐ ┌─▼─┐ ┌─▼──────────┐
   │CRM │ │Lead│ │Job│ │Ins.│ │Fin.│ │Doc│ │SEO│ │Integration │
   │Core│ │Dist│ │Trk│ │Int │ │Trk │ │Mgr│ │Bot│ │   Hub      │
   │4001│ │4002│ │4003│ │4004│ │4005│ │4006│ │4007│ │    4008    │
   └────┘ └───┘ └───┘ └───┘ └───┘ └───┘ └───┘ └────────────┘
      │     │     │     │     │     │     │     │
   ┌──▼─────▼─────▼─────▼─────▼─────▼─────▼─────▼────────────┐
   │                Database Layer                          │
   │  ┌─────────┐ ┌─────────┐ ┌─────────┐ ┌─────────────┐  │
   │  │Postgres│ │ MongoDB │ │  Redis  │ │ TimescaleDB │  │
   │  │  :5432  │ │ :27017  │ │  :6379  │ │    :5433    │  │
   │  └─────────┘ └─────────┘ └─────────┘ └─────────────┘  │
   └────────────────────────────────────────────────────────┘
```

### 1. Container Services Specification

#### Core CRM Service (Port 4001)
```yaml
contractor-crm-core:
  build: dockerfiles/Dockerfile.crm-core
  environment:
    - NODE_ENV=production
    - DATABASE_URL=postgresql://nrp_user:${DB_PASSWORD}@postgres:5432/nrp_crm
    - REDIS_URL=redis://redis:6379/0
    - MONGODB_URL=mongodb://mongo:27017/nrp_documents
  deploy:
    replicas: 3
    resources:
      limits: { cpus: '2.0', memory: '2G' }
      reservations: { cpus: '1.0', memory: '1G' }
  networks:
    - backend-network
    - database-network
```

**Responsibilities:**
- Contractor registration and profile management
- Service area and capability mapping
- Contractor performance tracking
- Certification and licensing verification

#### Lead Distribution Service (Port 4002)
```yaml
lead-distribution:
  build: dockerfiles/Dockerfile.lead-dist
  environment:
    - LEAD_ROUTING_ALGORITHM=geographic_priority
    - MAX_LEADS_PER_CONTRACTOR=50
    - LEAD_TIMEOUT_MINUTES=15
  deploy:
    replicas: 2
    resources:
      limits: { cpus: '1.5', memory: '1.5G' }
  networks:
    - backend-network
    - integration-network
```

**Responsibilities:**
- Intelligent lead routing based on location, specialty, availability
- Real-time contractor availability tracking
- Lead acceptance/rejection handling
- Performance-based priority scoring

#### Job Tracking Service (Port 4003)
```yaml
job-tracking:
  build: dockerfiles/Dockerfile.job-track
  environment:
    - TIMESCALE_URL=postgresql://nrp_user:${DB_PASSWORD}@timescale:5433/nrp_timeseries
    - JOB_STATUS_UPDATES_INTERVAL=300000
  deploy:
    replicas: 2
```

**Responsibilities:**
- Job lifecycle management (quote → approval → completion)
- Progress photo and documentation requirements
- Timeline tracking and milestone management
- Customer communication automation

#### Insurance Integration Service (Port 4004)
```yaml
insurance-integration:
  build: dockerfiles/Dockerfile.insurance-int
  environment:
    - INSURANCE_API_TIMEOUT=30000
    - CLAIM_PROCESSING_BATCH_SIZE=100
  networks:
    - integration-network
    - database-network
```

**Responsibilities:**
- Insurance company API integrations
- Claim status synchronization
- Automated claim submission
- Settlement processing and tracking

#### Financial Tracking Service (Port 4005)
```yaml
financial-tracking:
  build: dockerfiles/Dockerfile.financial
  environment:
    - PAYMENT_PROCESSOR=stripe
    - INVOICE_GENERATION_SCHEDULE=0 9 * * MON
  volumes:
    - financial-reports:/app/reports
```

**Responsibilities:**
- Commission calculations and payouts
- Invoice generation and tracking
- Payment processing and reconciliation
- Financial reporting and analytics

#### Document Management Service (Port 4006)
```yaml
document-management:
  build: dockerfiles/Dockerfile.doc-mgr
  environment:
    - STORAGE_BACKEND=aws_s3
    - DOCUMENT_RETENTION_DAYS=2555  # 7 years
    - OCR_SERVICE_URL=http://ocr-service:8000
  volumes:
    - document-storage:/app/storage
```

**Responsibilities:**
- Digital document storage and retrieval
- Automated document classification
- OCR processing for scanned documents
- Compliance and retention management

#### SEO Bot Service (Port 4007)
```yaml
seo-bot:
  build: dockerfiles/Dockerfile.seo-bot
  environment:
    - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
    - PAGE_GENERATION_BATCH_SIZE=100
    - SEO_UPDATE_FREQUENCY=daily
  networks:
    - backend-network
    - seo-network
```

**Responsibilities:**
- Automated location page generation based on contractor data
- SEO content creation and optimization
- Schema markup generation for local SEO
- Sitemap generation and submission

### 2. Database Design Patterns

#### PostgreSQL (Primary Structured Data)
```sql
-- Core CRM Tables
CREATE TABLE contractors (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    company_name VARCHAR(255) NOT NULL,
    abn VARCHAR(11) UNIQUE NOT NULL,
    primary_contact_name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    phone VARCHAR(20) NOT NULL,
    address JSONB NOT NULL,
    service_radius_km INTEGER NOT NULL DEFAULT 50,
    specialties TEXT[] NOT NULL,
    certifications JSONB DEFAULT '[]',
    performance_score DECIMAL(3,2) DEFAULT 0.00,
    status contractor_status DEFAULT 'pending',
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Service Areas (Auto-generated from contractor locations)
CREATE TABLE service_areas (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    contractor_id UUID REFERENCES contractors(id) ON DELETE CASCADE,
    postcode VARCHAR(4) NOT NULL,
    suburb VARCHAR(100) NOT NULL,
    state VARCHAR(3) NOT NULL,
    priority_level INTEGER DEFAULT 1,
    auto_generated BOOLEAN DEFAULT true,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads Management
CREATE TABLE leads (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    claim_number VARCHAR(100) UNIQUE,
    customer_details JSONB NOT NULL,
    property_details JSONB NOT NULL,
    damage_type disaster_type NOT NULL,
    urgency_level urgency_level DEFAULT 'medium',
    estimated_value DECIMAL(10,2),
    assigned_contractor_id UUID REFERENCES contractors(id),
    status lead_status DEFAULT 'new',
    source VARCHAR(50) DEFAULT 'website',
    insurance_company VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    assigned_at TIMESTAMPTZ,
    accepted_at TIMESTAMPTZ,
    completed_at TIMESTAMPTZ
);

-- Job Tracking
CREATE TABLE jobs (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    lead_id UUID REFERENCES leads(id) ON DELETE CASCADE,
    contractor_id UUID REFERENCES contractors(id) ON DELETE RESTRICT,
    quote_amount DECIMAL(10,2),
    approved_amount DECIMAL(10,2),
    status job_status DEFAULT 'quoted',
    scheduled_start_date DATE,
    actual_start_date DATE,
    estimated_completion_date DATE,
    actual_completion_date DATE,
    progress_photos TEXT[] DEFAULT '{}',
    customer_satisfaction_score INTEGER CHECK (customer_satisfaction_score BETWEEN 1 AND 5),
    notes TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Financial Tracking
CREATE TABLE financial_transactions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    job_id UUID REFERENCES jobs(id) ON DELETE CASCADE,
    transaction_type transaction_type NOT NULL,
    amount DECIMAL(10,2) NOT NULL,
    nrp_commission DECIMAL(5,2) NOT NULL, -- Percentage
    contractor_payout DECIMAL(10,2) GENERATED ALWAYS AS (amount * (100 - nrp_commission) / 100) STORED,
    insurance_company VARCHAR(100),
    processed_at TIMESTAMPTZ,
    status payment_status DEFAULT 'pending',
    reference_number VARCHAR(100),
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- SEO-Driven Location Pages (Auto-generated)
CREATE TABLE location_pages (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    url_slug VARCHAR(255) UNIQUE NOT NULL,
    location_name VARCHAR(255) NOT NULL,
    postcode VARCHAR(4),
    state VARCHAR(3) NOT NULL,
    service_type disaster_type NOT NULL,
    contractor_count INTEGER DEFAULT 0,
    page_title VARCHAR(255) NOT NULL,
    meta_description TEXT NOT NULL,
    content_generated_at TIMESTAMPTZ,
    seo_score INTEGER DEFAULT 0,
    published BOOLEAN DEFAULT false,
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### MongoDB (Document Storage)
```javascript
// Collections Structure

// contractor_documents
{
  _id: ObjectId,
  contractor_id: "uuid",
  document_type: "license|insurance|certification|portfolio",
  file_path: "s3://bucket/path/file.pdf",
  file_metadata: {
    original_name: "string",
    file_size: "number",
    mime_type: "string",
    uploaded_at: "Date"
  },
  ocr_text: "extracted text content",
  verification_status: "pending|verified|rejected",
  expiry_date: "Date", // for licenses/certifications
  created_at: "Date"
}

// job_documentation
{
  _id: ObjectId,
  job_id: "uuid",
  document_category: "quote|invoice|photos|reports|customer_communication",
  documents: [{
    file_path: "string",
    description: "string",
    uploaded_by: "contractor|system|customer",
    timestamp: "Date"
  }],
  metadata: {
    total_photos: "number",
    progress_percentage: "number",
    customer_approved: "boolean"
  }
}

// seo_content_cache
{
  _id: ObjectId,
  page_slug: "string",
  content_type: "landing_page|category_page|location_page",
  generated_content: {
    html: "string",
    schema_markup: "object",
    meta_tags: "object"
  },
  generation_params: {
    location: "string",
    service_type: "string",
    contractor_data: "object"
  },
  cache_expires_at: "Date",
  performance_metrics: {
    generation_time_ms: "number",
    ai_model_used: "string",
    cost: "number"
  }
}
```

#### Redis (Caching & Session Management)
```javascript
// Cache Keys Structure

// Session Management
`session:${session_id}` = {
  user_id: "uuid",
  user_type: "contractor|admin|system",
  permissions: ["read", "write", "admin"],
  expires_at: "timestamp"
}

// Lead Distribution Queue
`leads:queue:urgent` = ["lead_id1", "lead_id2", "lead_id3"]
`leads:queue:standard` = ["lead_id4", "lead_id5"]
`leads:contractor:${contractor_id}:active` = "number" // Active lead count

// Geographic Caching
`geo:postcode:${postcode}` = {
  contractors: ["id1", "id2", "id3"],
  average_response_time: "minutes",
  last_updated: "timestamp"
}

// SEO Performance Cache
`seo:page:${slug}:performance` = {
  views: "number",
  conversion_rate: "decimal",
  ranking_position: "number",
  last_crawled: "timestamp"
}

// Real-time Contractor Status
`contractor:${contractor_id}:status` = {
  available: "boolean",
  current_jobs: "number",
  response_time_avg: "minutes",
  last_active: "timestamp"
}
```

#### TimescaleDB (Time-Series Analytics)
```sql
-- Performance Metrics Hypertable
CREATE TABLE contractor_performance_metrics (
    time TIMESTAMPTZ NOT NULL,
    contractor_id UUID NOT NULL,
    metric_type VARCHAR(50) NOT NULL,
    metric_value DECIMAL(10,2) NOT NULL,
    metadata JSONB
);

SELECT create_hypertable('contractor_performance_metrics', 'time');

-- Lead Response Analytics
CREATE TABLE lead_response_analytics (
    time TIMESTAMPTZ NOT NULL,
    lead_id UUID NOT NULL,
    event_type VARCHAR(50) NOT NULL, -- 'created', 'assigned', 'accepted', 'completed'
    response_time_seconds INTEGER,
    contractor_id UUID,
    location_postcode VARCHAR(4)
);

SELECT create_hypertable('lead_response_analytics', 'time');
```

### 3. Docker Compose Configuration

#### Development Environment
```yaml
version: '3.8'

services:
  # Frontend Dashboard
  nrp-frontend:
    build:
      context: ../
      dockerfile: dockerfiles/Dockerfile.frontend.dev
    ports:
      - "3000:3000"
    environment:
      - NODE_ENV=development
      - NEXT_PUBLIC_API_URL=http://localhost:4000
      - NEXT_PUBLIC_CRM_URL=http://localhost:4001
    volumes:
      - ../frontend:/app
      - /app/node_modules
    networks:
      - frontend-network

  # API Gateway
  api-gateway:
    build:
      context: ../
      dockerfile: dockerfiles/Dockerfile.api-gateway.dev
    ports:
      - "4000:4000"
    environment:
      - NODE_ENV=development
      - JWT_SECRET=dev-secret-key
      - DATABASE_URL=postgresql://nrp_user:password@postgres:5432/nrp_crm
      - REDIS_URL=redis://redis:6379
    networks:
      - frontend-network
      - backend-network
    depends_on:
      - postgres
      - redis

  # CRM Core Service
  crm-core:
    build:
      context: ../
      dockerfile: dockerfiles/Dockerfile.crm-core.dev
    ports:
      - "4001:4001"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://nrp_user:password@postgres:5432/nrp_crm
      - REDIS_URL=redis://redis:6379/1
    networks:
      - backend-network
      - database-network
    depends_on:
      - postgres
      - redis

  # Lead Distribution Service
  lead-distribution:
    build:
      context: ../
      dockerfile: dockerfiles/Dockerfile.lead-dist.dev
    ports:
      - "4002:4002"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://nrp_user:password@postgres:5432/nrp_crm
      - TIMESCALE_URL=postgresql://nrp_user:password@timescale:5433/nrp_timeseries
      - REDIS_URL=redis://redis:6379/2
    networks:
      - backend-network
      - database-network

  # Job Tracking Service
  job-tracking:
    build:
      context: ../
      dockerfile: dockerfiles/Dockerfile.job-track.dev
    ports:
      - "4003:4003"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://nrp_user:password@postgres:5432/nrp_crm
      - MONGODB_URL=mongodb://mongo:27017/nrp_documents
    networks:
      - backend-network
      - database-network

  # Insurance Integration Service
  insurance-integration:
    build:
      context: ../
      dockerfile: dockerfiles/Dockerfile.insurance-int.dev
    ports:
      - "4004:4004"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://nrp_user:password@postgres:5432/nrp_crm
      - INSURANCE_API_TIMEOUT=30000
    networks:
      - backend-network
      - integration-network

  # Financial Tracking Service
  financial-tracking:
    build:
      context: ../
      dockerfile: dockerfiles/Dockerfile.financial.dev
    ports:
      - "4005:4005"
    environment:
      - NODE_ENV=development
      - DATABASE_URL=postgresql://nrp_user:password@postgres:5432/nrp_crm
      - STRIPE_SECRET_KEY=${STRIPE_SECRET_KEY}
    networks:
      - backend-network
      - database-network

  # Document Management Service
  document-management:
    build:
      context: ../
      dockerfile: dockerfiles/Dockerfile.doc-mgr.dev
    ports:
      - "4006:4006"
    environment:
      - NODE_ENV=development
      - MONGODB_URL=mongodb://mongo:27017/nrp_documents
      - AWS_S3_BUCKET=${AWS_S3_BUCKET}
      - AWS_ACCESS_KEY_ID=${AWS_ACCESS_KEY_ID}
      - AWS_SECRET_ACCESS_KEY=${AWS_SECRET_ACCESS_KEY}
    networks:
      - backend-network
      - database-network

  # SEO Bot Service
  seo-bot:
    build:
      context: ../
      dockerfile: dockerfiles/Dockerfile.seo-bot.dev
    ports:
      - "4007:4007"
    environment:
      - NODE_ENV=development
      - OPENROUTER_API_KEY=${OPENROUTER_API_KEY}
      - DATABASE_URL=postgresql://nrp_user:password@postgres:5432/nrp_crm
      - MONGODB_URL=mongodb://mongo:27017/nrp_documents
    networks:
      - backend-network
      - seo-network

  # Integration Hub
  integration-hub:
    build:
      context: ../
      dockerfile: dockerfiles/Dockerfile.integration-hub.dev
    ports:
      - "4008:4008"
    environment:
      - NODE_ENV=development
      - REDIS_URL=redis://redis:6379/5
    networks:
      - integration-network
      - backend-network

  # Databases
  postgres:
    image: postgres:15-alpine
    ports:
      - "5432:5432"
    environment:
      - POSTGRES_DB=nrp_crm
      - POSTGRES_USER=nrp_user
      - POSTGRES_PASSWORD=password
    volumes:
      - postgres-data:/var/lib/postgresql/data
      - ../configs/postgres/init-nrp.sql:/docker-entrypoint-initdb.d/init.sql
    networks:
      - database-network

  timescale:
    image: timescale/timescaledb:latest-pg15
    ports:
      - "5433:5432"
    environment:
      - POSTGRES_DB=nrp_timeseries
      - POSTGRES_USER=nrp_user
      - POSTGRES_PASSWORD=password
    volumes:
      - timescale-data:/var/lib/postgresql/data
    networks:
      - database-network

  mongo:
    image: mongo:6.0
    ports:
      - "27017:27017"
    environment:
      - MONGO_INITDB_ROOT_USERNAME=root
      - MONGO_INITDB_ROOT_PASSWORD=password
      - MONGO_INITDB_DATABASE=nrp_documents
    volumes:
      - mongo-data:/data/db
    networks:
      - database-network

  redis:
    image: redis:7-alpine
    ports:
      - "6379:6379"
    volumes:
      - redis-data:/data
      - ../configs/redis/redis-nrp.conf:/usr/local/etc/redis/redis.conf
    command: redis-server /usr/local/etc/redis/redis.conf
    networks:
      - backend-network
      - database-network

  # Nginx Load Balancer
  nginx:
    image: nginx:alpine
    ports:
      - "80:80"
      - "443:443"
    volumes:
      - ../configs/nginx/nginx-nrp.dev.conf:/etc/nginx/nginx.conf
      - ../configs/nginx/ssl:/etc/nginx/ssl
    networks:
      - frontend-network
    depends_on:
      - nrp-frontend
      - api-gateway

networks:
  frontend-network:
    driver: bridge
  backend-network:
    driver: bridge
  database-network:
    driver: bridge
  integration-network:
    driver: bridge
  seo-network:
    driver: bridge

volumes:
  postgres-data:
  timescale-data:
  mongo-data:
  redis-data:
```

### 4. Authentication & Security Architecture

Based on the reference patterns, here's the recommended security architecture:

#### JWT-Based Authentication
```javascript
// API Gateway Authentication Middleware
const authenticationMiddleware = {
  contractors: {
    routes: ['/api/contractor/*'],
    permissions: ['contractor:read', 'contractor:write'],
    jwtSecret: process.env.CONTRACTOR_JWT_SECRET
  },
  admins: {
    routes: ['/api/admin/*'],
    permissions: ['admin:read', 'admin:write', 'admin:delete'],
    jwtSecret: process.env.ADMIN_JWT_SECRET
  },
  system: {
    routes: ['/api/system/*'],
    permissions: ['system:all'],
    jwtSecret: process.env.SYSTEM_JWT_SECRET
  }
};
```

#### Role-Based Access Control (RBAC)
```sql
-- User Roles and Permissions
CREATE TYPE user_role AS ENUM ('contractor', 'admin', 'system', 'viewer');

CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    role user_role NOT NULL DEFAULT 'contractor',
    contractor_id UUID REFERENCES contractors(id),
    permissions JSONB DEFAULT '[]',
    active BOOLEAN DEFAULT true,
    last_login TIMESTAMPTZ,
    created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Session Management
CREATE TABLE user_sessions (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    session_token VARCHAR(255) UNIQUE NOT NULL,
    expires_at TIMESTAMPTZ NOT NULL,
    ip_address INET,
    user_agent TEXT,
    created_at TIMESTAMPTZ DEFAULT NOW()
);
```

#### API Security Configuration
```nginx
# Nginx Security Configuration
server {
    listen 443 ssl http2;
    server_name disaster-recovery.vercel.app;

    # SSL Configuration
    ssl_certificate /etc/nginx/ssl/cert.pem;
    ssl_certificate_key /etc/nginx/ssl/key.pem;
    ssl_protocols TLSv1.2 TLSv1.3;
    ssl_ciphers ECDHE-RSA-AES256-GCM-SHA384:ECDHE-RSA-AES128-GCM-SHA256;

    # Rate Limiting
    limit_req_zone $binary_remote_addr zone=api:10m rate=10r/s;
    limit_req_zone $binary_remote_addr zone=contractor:10m rate=30r/s;

    # Security Headers
    add_header X-Frame-Options DENY;
    add_header X-Content-Type-Options nosniff;
    add_header X-XSS-Protection "1; mode=block";
    add_header Referrer-Policy strict-origin-when-cross-origin;

    # API Routes with Authentication
    location /api/contractor/ {
        limit_req zone=contractor burst=20 nodelay;
        auth_request /auth/contractor;
        proxy_pass http://crm-core:4001;
    }

    location /api/admin/ {
        limit_req zone=api burst=10 nodelay;
        auth_request /auth/admin;
        proxy_pass http://api-gateway:4000;
    }
}
```

### 5. Integration Patterns

#### Insurance Company API Integration
```javascript
// Insurance Integration Service
class InsuranceIntegrationService {
  constructor() {
    this.providers = {
      allianz: new AllianzAPIClient(),
      aami: new AAMIAPIClient(),
      suncorp: new SuncorpAPIClient(),
      commInsure: new CommInsureAPIClient()
    };
  }

  async submitClaim(claimData) {
    const provider = this.detectInsuranceProvider(claimData.policyNumber);
    
    try {
      const result = await this.providers[provider].submitClaim({
        policyNumber: claimData.policyNumber,
        claimAmount: claimData.estimatedValue,
        damageType: claimData.damageType,
        propertyDetails: claimData.propertyDetails,
        contractorDetails: claimData.contractorDetails,
        supportingDocuments: claimData.documentUrls
      });

      // Log to financial tracking
      await this.logFinancialTransaction({
        jobId: claimData.jobId,
        provider: provider,
        claimNumber: result.claimNumber,
        status: result.status
      });

      return result;
    } catch (error) {
      // Fallback to manual processing
      await this.createManualReview(claimData, error);
      throw new IntegrationError(`Failed to submit to ${provider}: ${error.message}`);
    }
  }
}
```

#### Lead Distribution Algorithm
```javascript
// Lead Distribution Service
class LeadDistributionService {
  async distributeIncomingLead(leadData) {
    // Geographic filtering
    const eligibleContractors = await this.findContractorsByLocation(
      leadData.postcode,
      leadData.damageType
    );

    // Performance-based ranking
    const rankedContractors = await this.rankContractorsByPerformance(
      eligibleContractors,
      leadData.urgencyLevel
    );

    // Availability check
    const availableContractors = await this.filterByAvailability(
      rankedContractors,
      leadData.requiredStartDate
    );

    // Distribute to top 3 contractors
    const distributionResults = [];
    for (let i = 0; i < Math.min(3, availableContractors.length); i++) {
      const contractor = availableContractors[i];
      
      const result = await this.sendLeadToContractor({
        contractorId: contractor.id,
        leadId: leadData.id,
        priority: i + 1,
        expiresAt: new Date(Date.now() + 15 * 60 * 1000) // 15 minutes
      });

      distributionResults.push(result);
    }

    return distributionResults;
  }

  async rankContractorsByPerformance(contractors, urgencyLevel) {
    return contractors.sort((a, b) => {
      const aScore = this.calculateContractorScore(a, urgencyLevel);
      const bScore = this.calculateContractorScore(b, urgencyLevel);
      return bScore - aScore;
    });
  }

  calculateContractorScore(contractor, urgencyLevel) {
    let score = 0;
    
    // Performance metrics (40%)
    score += contractor.performanceScore * 0.4;
    
    // Response time (30%)
    const responseTimeScore = urgencyLevel === 'urgent' 
      ? (24 - contractor.avgResponseTimeHours) / 24 
      : (48 - contractor.avgResponseTimeHours) / 48;
    score += Math.max(0, responseTimeScore) * 0.3;
    
    // Availability (20%)
    score += (1 - contractor.currentJobCount / contractor.maxJobCapacity) * 0.2;
    
    // Customer satisfaction (10%)
    score += (contractor.avgCustomerRating - 1) / 4 * 0.1;
    
    return score;
  }
}
```

### 6. SEO Auto-Generation Service

Following the Seamless-Architecture pattern for cost optimization:

```javascript
// SEO Bot Service with Cost Optimization
class SEOAutoGenerationService {
  constructor() {
    this.llmRouter = new IntelligentLLMRouter({
      costTarget: 0.85, // 85% cost savings
      qualityPreference: 'balanced'
    });
  }

  async generateLocationPages() {
    // Get contractors and their service areas
    const contractors = await this.getActiveContractors();
    const serviceAreas = await this.getServiceAreas(contractors);
    
    // Generate pages in batches for cost optimization
    const pageGenerationTasks = this.createPageGenerationTasks(serviceAreas);
    const batchOptimization = await this.llmRouter.optimizeForBulkTasks(pageGenerationTasks);
    
    console.log(`Estimated cost savings: ${batchOptimization.estimatedSavings.savingsPercentage}%`);
    
    for (const batch of batchOptimization.optimizedBatches) {
      await this.processBatch(batch);
    }
  }

  createPageGenerationTasks(serviceAreas) {
    const tasks = [];
    
    for (const area of serviceAreas) {
      // Main location page
      tasks.push({
        type: 'location_page',
        location: area.suburb,
        postcode: area.postcode,
        state: area.state,
        contractors: area.contractors,
        complexity: 'medium'
      });

      // Service-specific pages
      const services = ['water-damage', 'fire-damage', 'mould-removal', 'storm-damage'];
      for (const service of services) {
        tasks.push({
          type: 'service_location_page',
          location: area.suburb,
          service: service,
          postcode: area.postcode,
          contractors: area.contractors.filter(c => c.specialties.includes(service)),
          complexity: 'low'
        });
      }
    }

    return tasks;
  }

  async generatePageContent(task) {
    const prompt = this.buildSEOPrompt(task);
    
    // Use cost-optimized model selection
    const modelSelection = await this.llmRouter.selectModel(task, {
      budgetConstraint: true,
      maxCost: task.complexity === 'low' ? 0.5 : 2.0
    });

    const content = await this.llmRouter.routeRequest(task, prompt, {
      model: modelSelection.model,
      maxTokens: 2000
    });

    return {
      html: content.html,
      title: content.title,
      metaDescription: content.metaDescription,
      schemaMarkup: content.schemaMarkup,
      generationCost: modelSelection.estimatedCost
    };
  }

  buildSEOPrompt(task) {
    return `Generate SEO-optimized content for disaster recovery services.
    
    Location: ${task.location}, ${task.state} ${task.postcode}
    Service: ${task.service || 'all disaster recovery services'}
    Available contractors: ${task.contractors.length}
    
    Requirements:
    1. Target keyword: "${task.location} ${task.service || 'disaster recovery'}"
    2. Include local landmarks and geography
    3. Emphasize 24/7 availability and emergency response
    4. Mention insurance work and claim processing
    5. Include call-to-action for immediate response
    6. Add schema markup for local business
    7. Keep content unique and valuable
    
    Generate:
    - HTML content (800-1200 words)
    - Page title (under 60 characters)
    - Meta description (under 160 characters)
    - Local business schema markup`;
  }
}
```

### 7. Monitoring & Analytics Stack

Based on the VibeCode production monitoring configuration:

```yaml
# Monitoring Services
prometheus:
  image: prom/prometheus:latest
  ports:
    - "9090:9090"
  volumes:
    - prometheus-data:/prometheus
    - ../configs/monitoring/nrp-prometheus.yml:/etc/prometheus/prometheus.yml
  command:
    - '--config.file=/etc/prometheus/prometheus.yml'
    - '--storage.tsdb.path=/prometheus'
    - '--storage.tsdb.retention.time=30d'
    - '--web.enable-lifecycle'
  networks:
    - monitoring-network

grafana:
  image: grafana/grafana:latest
  ports:
    - "3001:3000"
  environment:
    - GF_SECURITY_ADMIN_PASSWORD=${GRAFANA_PASSWORD}
    - GF_USERS_ALLOW_SIGN_UP=false
  volumes:
    - grafana-data:/var/lib/grafana
    - ../configs/grafana/nrp-dashboards:/etc/grafana/provisioning/dashboards
    - ../configs/grafana/nrp-datasources.yml:/etc/grafana/provisioning/datasources/datasources.yml
  networks:
    - monitoring-network

# ELK Stack for Log Aggregation
elasticsearch:
  image: docker.elastic.co/elasticsearch/elasticsearch:8.8.0
  environment:
    - discovery.type=single-node
    - xpack.security.enabled=false
    - "ES_JAVA_OPTS=-Xms1g -Xmx1g"
  volumes:
    - elasticsearch-data:/usr/share/elasticsearch/data
  networks:
    - monitoring-network

logstash:
  image: docker.elastic.co/logstash/logstash:8.8.0
  volumes:
    - ../configs/logstash/nrp-pipeline:/usr/share/logstash/pipeline
    - ../logs:/var/log/nrp:ro
  networks:
    - monitoring-network
  depends_on:
    - elasticsearch

kibana:
  image: docker.elastic.co/kibana/kibana:8.8.0
  ports:
    - "5601:5601"
  environment:
    - ELASTICSEARCH_HOSTS=http://elasticsearch:9200
  networks:
    - monitoring-network
```

### 8. Deployment Strategy

#### Development Environment Setup
```bash
#!/bin/bash
# NRP CRM Development Setup Script

echo "🚀 NRP CRM Development Environment Setup"

# Create directory structure
mkdir -p {dockerfiles,configs/{postgres,redis,nginx,monitoring,grafana,logstash},logs,data}

# Copy configuration files
cp configs/postgres/init-nrp.sql configs/postgres/
cp configs/nginx/nginx-nrp.dev.conf configs/nginx/
cp configs/redis/redis-nrp.conf configs/redis/

# Build and start services
docker-compose -f compose/docker-compose.nrp.dev.yml up --build -d

# Wait for databases to be ready
echo "⏳ Waiting for databases to initialize..."
sleep 30

# Run database migrations
docker-compose -f compose/docker-compose.nrp.dev.yml exec postgres psql -U nrp_user -d nrp_crm -f /docker-entrypoint-initdb.d/init.sql

# Seed initial data
docker-compose -f compose/docker-compose.nrp.dev.yml exec crm-core npm run seed:dev

echo "✅ NRP CRM Development Environment Ready!"
echo "📊 Grafana Dashboard: http://localhost:3001"
echo "📈 Prometheus Metrics: http://localhost:9090"
echo "🔍 Kibana Logs: http://localhost:5601"
echo "💻 CRM Dashboard: http://localhost:3000"
```

#### Production Environment
```yaml
# Production docker-compose.nrp.prod.yml (excerpt)
version: '3.8'

services:
  nrp-frontend:
    build:
      context: ../
      dockerfile: dockerfiles/Dockerfile.frontend.prod
    deploy:
      replicas: 2
      resources:
        limits: { cpus: '1.0', memory: '1G' }
        reservations: { cpus: '0.5', memory: '512M' }
    environment:
      - NODE_ENV=production
      - NEXT_PUBLIC_API_URL=https://disaster-recovery.vercel.app/api
      - NEXT_PUBLIC_APP_URL=https://disaster-recovery.vercel.app
    networks:
      - frontend-network

  api-gateway:
    build:
      context: ../
      dockerfile: dockerfiles/Dockerfile.api-gateway.prod
    deploy:
      replicas: 3
      resources:
        limits: { cpus: '2.0', memory: '2G' }
        reservations: { cpus: '1.0', memory: '1G' }
    environment:
      - NODE_ENV=production
      - JWT_SECRET=${JWT_SECRET}
      - DATABASE_URL=${DATABASE_URL}
      - REDIS_URL=${REDIS_URL}
      - RATE_LIMIT_WINDOW=900000
      - RATE_LIMIT_MAX=1000
    networks:
      - frontend-network
      - backend-network

  postgres-primary:
    image: postgres:15-alpine
    deploy:
      resources:
        limits: { cpus: '4.0', memory: '8G' }
        reservations: { cpus: '2.0', memory: '4G' }
    environment:
      - POSTGRES_DB=${POSTGRES_DB}
      - POSTGRES_USER=${POSTGRES_USER}
      - POSTGRES_PASSWORD=${POSTGRES_PASSWORD}
    volumes:
      - postgres-primary-data:/var/lib/postgresql/data
      - ../backups/postgres:/backups
    networks:
      - database-network
```

## Implementation Roadmap

### Phase 1: Foundation (Weeks 1-4)
1. **Container Infrastructure Setup**
   - Docker environment configuration
   - Database setup with initial schema
   - Basic authentication system
   - API Gateway with routing

2. **Core CRM Service**
   - Contractor registration and management
   - Basic dashboard interface
   - Profile and certification management

### Phase 2: Lead Management (Weeks 5-8)
1. **Lead Distribution Service**
   - Geographic lead routing
   - Contractor availability tracking
   - Performance-based assignment

2. **Job Tracking Service**
   - Job lifecycle management
   - Progress tracking and photos
   - Customer communication automation

### Phase 3: Integrations (Weeks 9-12)
1. **Insurance Integration Service**
   - Major insurance company APIs
   - Automated claim submission
   - Settlement processing

2. **Financial Tracking Service**
   - Commission calculations
   - Payment processing
   - Financial reporting

### Phase 4: Automation (Weeks 13-16)
1. **SEO Bot Service**
   - Automated page generation
   - Content optimization
   - Local SEO implementation

2. **Document Management**
   - Digital document storage
   - OCR processing
   - Compliance management

### Phase 5: Scale & Optimize (Weeks 17-20)
1. **Performance Optimization**
   - Database query optimization
   - Cache implementation
   - Load testing and tuning

2. **Monitoring & Analytics**
   - Comprehensive dashboards
   - Performance metrics
   - Cost optimization analysis

## Cost Optimization Strategy

Following the Seamless-Architecture pattern, implement intelligent cost optimization:

1. **Three-Tier AI Model Usage**
   - **Good Tier** ($0.10-3): Routine page generation, simple content
   - **Better Tier** ($3-15): Complex SEO content, customer communications
   - **Best Tier** ($15-75): Strategic analysis, complex integrations

2. **Bulk Processing Optimization**
   - Batch similar tasks for maximum cost efficiency
   - Group page generation by geographic regions
   - Optimize API calls to reduce redundant operations

3. **Real-Time Budget Monitoring**
   - Daily budget tracking and alerts
   - Automatic model tier downgrade when approaching limits
   - Cost-per-lead tracking and optimization

## Expected Outcomes

1. **Zero Human Intervention**: Fully automated contractor onboarding, lead distribution, and job tracking
2. **National Coverage**: Automatic page generation for all Australian locations with contractors
3. **SEO Domination**: 1000+ location-specific pages generated monthly
4. **Cost Efficiency**: 70-85% reduction in operational costs through automation
5. **Scalability**: Handle 10,000+ contractors and 50,000+ leads annually
6. **Performance**: Sub-second response times for critical operations

## Conclusion

This architecture leverages the best patterns from all three reference systems:
- **VibeCode's** comprehensive microservices and database patterns
- **Seamless-Architecture's** cost optimization and intelligent routing
- **Unite-Group's** clean development and deployment strategies

The result is a production-ready CRM system that aligns perfectly with NRP's business model of automated, nationwide disaster recovery services distribution with minimal operational overhead and maximum profit retention for community support initiatives.