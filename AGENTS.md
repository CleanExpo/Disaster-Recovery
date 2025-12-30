# AGENTS.md - Disaster Recovery - NRPG Platform

**Version**: 1.0.0
**Last Updated**: 2025-12-30
**Purpose**: Project-specific guidance for AI coding agents

---

## 📋 Project Overview

### Name
**Disaster Recovery - NRPG Platform**

### Description
Comprehensive multi-tenant SaaS platform for disaster recovery services in Australia. Connects clients with certified contractors for water damage, fire damage, mould remediation, and biohazard cleanup. Features AI-powered inspection workflows, automated reporting, IICRC standards compliance, and insurance claim integration.

### Domain
Emergency disaster recovery services (residential and commercial properties)

### Target Market
- **Primary**: Australia (NSW, VIC, QLD, WA, SA, TAS, ACT, NT)
- **Users**: Homeowners, businesses, contractors, insurance companies
- **Scale**: Multi-tenant architecture supporting 1000+ concurrent users

### Technology Stack
- **Framework**: Next.js 14.2.15 (App Router)
- **Language**: TypeScript 5.3.3
- **Database**: PostgreSQL (via Prisma 5.22.0)
- **Caching**: Redis (ioredis), Bull queue
- **Authentication**: NextAuth 4.24.11
- **Payment**: Stripe 14.10.0
- **AI/ML**: OpenAI 4.24.1, Google Gemini, LangChain
- **Testing**: Jest 29.7.0, Playwright 1.40.1
- **Deployment**: Docker, Kubernetes (planned), Vercel

---

## 🏗️ Architecture Map

### High-Level Architecture
```
┌─────────────────────────────────────────────────────────────┐
│                    Next.js 14 App Router                     │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Public Pages │  │  Auth Pages  │  │  Dashboards  │     │
│  │  (Client)    │  │ (Login/Reg)  │  │ (Role-based) │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
└─────────────────────────────────────────────────────────────┘
                           ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│              50+ API Routes (app/api/*)                      │
│  ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐ ┌──────┐   │
│  │Admin │ │ Auth │ │Agents│ │ Book │ │ Pay  │ │ AI   │   │
│  └──────┘ └──────┘ └──────┘ └──────┘ └──────┘ └──────┘   │
└─────────────────────────────────────────────────────────────┘
                           ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│           Business Services Layer (src/lib/*)                │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐             │
│  │   Agents   │ │ Analytics  │ │   Auth     │             │
│  │ (5 agents) │ │  Engine    │ │  Service   │             │
│  └────────────┘ └────────────┘ └────────────┘             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐             │
│  │    CRM     │ │  Payments  │ │    Chat    │             │
│  │  Service   │ │  (Stripe)  │ │  Service   │             │
│  └────────────┘ └────────────┘ └────────────┘             │
│  ┌────────────┐ ┌────────────┐ ┌────────────┐             │
│  │    Email   │ │    SMS     │ │  Storage   │             │
│  │ (Nodemailer)│ │  (Twilio)  │ │   (S3)     │             │
│  └────────────┘ └────────────┘ └────────────┘             │
└─────────────────────────────────────────────────────────────┘
                           ↓ ↑
┌─────────────────────────────────────────────────────────────┐
│              Data Layer (Prisma ORM)                         │
│  ┌──────────────┐ ┌──────────────┐ ┌──────────────┐       │
│  │ PostgreSQL   │ │    Redis     │ │  Bull Queue  │       │
│  │ (28+ models) │ │   (Cache)    │ │   (Jobs)     │       │
│  └──────────────┘ └──────────────┘ └──────────────┘       │
└─────────────────────────────────────────────────────────────┘
```

### Services Inventory (50+ Services)

**Core Business Services**:
- Inspection Services (7 services): approval-workflow, cost-estimation, IICRC standards, report generation, jurisdiction rules, PDF generation, pricing
- Booking Services: scheduling, contractor matching, service requests
- Payment Services: Stripe integration, invoice generation, billing
- CRM Services: customer management, lifecycle tracking
- Notification Services: email, SMS, in-app notifications

**AI & Analytics**:
- AI Services: OpenAI, Gemini, LangChain integration
- Analytics Engine: client analytics, lead analytics, competitor analysis
- Fraud Detection: ML-based fraud detection
- CEO Oversight: business metrics, alerts, recommendations

**Infrastructure Services**:
- Authentication: NextAuth, JWT, role-based access
- Caching: Redis with ioredis
- Queue: Bull for job processing
- Logging: Winston structured logging
- Monitoring: Health checks, metrics
- Storage: S3-compatible file storage
- Search: Full-text search engine

**Communication Services**:
- Chat: Real-time messaging
- Email: Nodemailer integration
- SMS: Twilio integration
- Calling: VoIP integration

**External Integrations**:
- SEMRUSH API (competitor analysis)
- DataForSEO API (SEO intelligence)
- Stripe (payments)
- Twilio (communications)
- SendGrid (optional email)

---

## 📁 Directory Structure

```
D:\Disaster Recovery - NRP/
├── app/                          # Next.js 14 App Router (29,048 lines)
│   ├── api/                      # API routes (50+ endpoints)
│   │   ├── admin/                # Admin management
│   │   ├── agents/               # AI agent execution
│   │   ├── auth/                 # Authentication
│   │   ├── analytics/            # Analytics endpoints
│   │   ├── bookings/             # Booking management
│   │   ├── contractors/          # Contractor APIs
│   │   ├── payments/             # Payment processing
│   │   └── [40+ more]
│   ├── dashboard/                # User dashboards
│   ├── contractor/               # Contractor portal
│   ├── services/                 # Service pages
│   ├── locations/                # Location pages
│   └── page.tsx                  # Homepage
│
├── src/                          # Core application (94,353 lines)
│   ├── agents/                   # AI agents (5 agents + orchestrator)
│   │   ├── data-intake-agent.ts
│   │   ├── report-generation-agent.ts
│   │   ├── quality-assurance-agent.ts
│   │   ├── operations-agent.ts
│   │   ├── ceo-oversight-agent.ts
│   │   └── agent-orchestrator.ts
│   │
│   ├── components/               # React UI components (36 subdirectories)
│   │   ├── admin/, ai/, analytics/, auth/, booking/
│   │   ├── dashboard/, forms/, navigation/, payments/
│   │   └── [28+ more]
│   │
│   ├── lib/                      # Core libraries (36 subdirectories)
│   │   ├── agents/               # Agent orchestration
│   │   ├── ai/                   # AI/ML services
│   │   ├── analytics/            # Analytics engine
│   │   ├── auth/                 # Authentication
│   │   ├── cache/                # Caching layer
│   │   ├── db/                   # Database utilities
│   │   ├── email/                # Email service
│   │   ├── logger/               # Logging system
│   │   ├── monitoring/           # Monitoring
│   │   ├── queue/                # Job queue
│   │   ├── stripe/               # Stripe integration
│   │   └── [24+ more]
│   │
│   ├── services/                 # Business services (12 categories)
│   │   ├── ai/, analytics/, booking/, contractor/
│   │   ├── fraud/, inspection/, notification/, payment/
│   │   └── [more]
│   │
│   ├── types/                    # TypeScript type definitions
│   └── utils/                    # Utility functions
│
├── prisma/                       # Database schema
│   ├── schema.prisma             # 28+ models (multi-tenant)
│   └── migrations/               # Database migrations
│
├── tests/                        # Test suite (35 test files, 151 passing)
│   ├── unit/                     # Unit tests
│   ├── integration/              # Integration tests
│   ├── e2e/                      # End-to-end tests (Playwright)
│   ├── performance/              # Performance tests
│   ├── security/                 # Security tests
│   ├── factories/                # Test data factories
│   ├── mocks/                    # Mock implementations
│   └── utils/                    # Test utilities
│
├── public/                       # Static assets
│   └── images/                   # Image files
│
├── docs/                         # Documentation (40+ markdown files)
├── .claude/                      # Agentic layer configuration
│   ├── skills/                   # Agent skills (3 existing + 15+ new)
│   ├── memory/                   # Memory system (learnings, decisions)
│   └── config/                   # MCP configuration
│
├── k8s/                          # Kubernetes manifests (planned)
├── docker/                       # Docker configuration
├── scripts/                      # Utility scripts
│
└── Configuration Files
    ├── package.json              # npm dependencies
    ├── tsconfig.json             # TypeScript config
    ├── jest.config.js            # Jest config
    ├── Dockerfile                # Docker image
    ├── docker-compose.yml        # Docker Compose
    ├── .env.example              # Environment template
    ├── .eslintrc.json            # ESLint config
    └── CLAUDE.md                 # Production standards (CRITICAL)
```

**Important Notes**:
- **Total TypeScript Files**: 487 files
- **Total Lines of Code**: ~138,556 lines
- **Test Status**: 151/151 passing (100%)
- **Lint Status**: 0 warnings, 0 errors
- **Build Status**: Production ready

---

## 💻 Coding Conventions

### TypeScript Standards

**Strict Mode**:
```typescript
// tsconfig.json enforces strict mode
"strict": true
"noImplicitAny": true
"strictNullChecks": true
"strictFunctionTypes": true
```

**Type Definitions**:
- Always use explicit types for function parameters and return values
- Use interfaces for object shapes (prefer over type aliases)
- Use enums for fixed sets of values
- Leverage TypeScript utility types (Partial, Pick, Omit, etc.)

**Example**:
```typescript
// Good ✅
interface UserCreateInput {
  email: string
  name: string
  role: UserRole
  tenantId: string
}

async function createUser(input: UserCreateInput): Promise<User> {
  // Implementation
}

// Bad ❌
async function createUser(input) {
  // No types
}
```

**File Naming**:
- Components: `PascalCase.tsx` (e.g., `UserDashboard.tsx`)
- Utilities: `kebab-case.ts` (e.g., `date-formatter.ts`)
- Services: `kebab-case.service.ts` (e.g., `booking.service.ts`)
- Agents: `kebab-case-agent.ts` (e.g., `data-intake-agent.ts`)
- Tests: `*.test.ts` or `*.spec.ts`

**Async/Await**:
- Always use async/await over raw promises
- Handle errors with try/catch blocks
- Use Promise.all() for parallel operations

```typescript
// Good ✅
try {
  const [user, tenant] = await Promise.all([
    getUserById(userId),
    getTenantById(tenantId)
  ])
} catch (error) {
  logger.error('Failed to fetch data', { error })
  throw error
}

// Bad ❌
getUserById(userId).then(user => {
  // Callback hell
})
```

### Next.js App Router Patterns

**Server Components (Default)**:
- Use server components by default (better performance)
- Only use 'use client' when necessary (interactivity, hooks, browser APIs)

**API Routes**:
```typescript
// app/api/bookings/route.ts
import { NextRequest, NextResponse } from 'next/server'

export async function GET(request: NextRequest) {
  try {
    const bookings = await getBookings()
    return NextResponse.json({ bookings })
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch' }, { status: 500 })
  }
}

export async function POST(request: NextRequest) {
  const body = await request.json()
  // Handle POST
}
```

**File-based Routing**:
- `page.tsx` - Page component
- `layout.tsx` - Layout wrapper
- `loading.tsx` - Loading UI
- `error.tsx` - Error boundary
- `not-found.tsx` - 404 page

### Prisma Database Patterns

**Schema Conventions**:
```prisma
model User {
  id        String   @id @default(cuid())
  email     String   @unique
  name      String
  role      UserRole @default(CLIENT)
  tenantId  String
  tenant    Tenant   @relation(fields: [tenantId], references: [id])
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt

  @@index([tenantId])
  @@index([email])
}
```

**Query Patterns**:
```typescript
// Always use Prisma client transactions for multi-table operations
const result = await prisma.$transaction(async (tx) => {
  const user = await tx.user.create({ data: userData })
  const profile = await tx.profile.create({ data: { userId: user.id } })
  return { user, profile }
})

// Use select to limit fields (performance)
const users = await prisma.user.findMany({
  select: { id: true, name: true, email: true }
})

// Use include for relations (careful of N+1)
const usersWithTenants = await prisma.user.findMany({
  include: { tenant: true }
})
```

**Multi-Tenancy**:
- ALWAYS filter by tenantId for tenant-scoped queries
- Use Prisma middleware to automatically inject tenantId
- Never expose data across tenants

```typescript
// Good ✅
const bookings = await prisma.booking.findMany({
  where: { tenantId }
})

// Bad ❌ (security risk!)
const bookings = await prisma.booking.findMany()
```

### React Component Patterns

**Functional Components Only**:
```typescript
// Good ✅
interface UserCardProps {
  user: User
  onEdit: (id: string) => void
}

export function UserCard({ user, onEdit }: UserCardProps) {
  return (
    <div>
      <h3>{user.name}</h3>
      <button onClick={() => onEdit(user.id)}>Edit</button>
    </div>
  )
}

// Bad ❌
class UserCard extends React.Component {
  // No class components
}
```

**Custom Hooks**:
```typescript
// src/hooks/useUser.ts
export function useUser(userId: string) {
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<Error | null>(null)

  useEffect(() => {
    fetchUser(userId)
      .then(setUser)
      .catch(setError)
      .finally(() => setLoading(false))
  }, [userId])

  return { user, loading, error }
}
```

### Error Handling

**Service Layer**:
```typescript
export class BookingService {
  async createBooking(input: BookingCreateInput): Promise<Booking> {
    try {
      logger.info('Creating booking', { input })

      const booking = await prisma.booking.create({
        data: input
      })

      logger.info('Booking created', { bookingId: booking.id })
      return booking

    } catch (error) {
      logger.error('Failed to create booking', { error, input })

      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2002') {
          throw new Error('Booking already exists')
        }
      }

      throw new Error('Failed to create booking')
    }
  }
}
```

**API Layer**:
```typescript
export async function POST(request: NextRequest) {
  try {
    const input = await request.json()

    // Validate input
    const validatedInput = BookingCreateSchema.parse(input)

    const booking = await bookingService.createBooking(validatedInput)

    return NextResponse.json({ booking }, { status: 201 })

  } catch (error) {
    if (error instanceof ZodError) {
      return NextResponse.json({ error: 'Validation failed', details: error.errors }, { status: 400 })
    }

    logger.error('API error', { error })
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 })
  }
}
```

### Logging

**Winston Logger**:
```typescript
import { logger } from '@/lib/logger'

// Structured logging
logger.info('User logged in', {
  userId: user.id,
  email: user.email,
  tenant: user.tenantId
})

logger.error('Payment failed', {
  error: error.message,
  stack: error.stack,
  paymentId,
  amount
})

// Log levels: error, warn, info, debug
```

### Australian Localization

**Spelling**:
- Use Australian English: `colour`, `mould`, `organisation`, `recognise`
- NOT American: ~~`color`~~, ~~`mold`~~, ~~`organization`~~, ~~`recognize`~~

**Enums**:
```typescript
enum AustralianState {
  NSW = 'NSW',
  VIC = 'VIC',
  QLD = 'QLD',
  WA = 'WA',
  SA = 'SA',
  TAS = 'TAS',
  ACT = 'ACT',
  NT = 'NT'
}

enum AustralianServiceType {
  WATER_DAMAGE = 'WATER_DAMAGE',
  FIRE_DAMAGE = 'FIRE_DAMAGE',
  SMOKE_DAMAGE = 'SMOKE_DAMAGE',
  MOULD_REMEDIATION = 'MOULD_REMEDIATION',
  BIOHAZARD_CLEANUP = 'BIOHAZARD_CLEANUP'
}
```

**Phone Numbers**:
- Format: `1300 309 361` (national toll-free)
- Mobile: `04XX XXX XXX`

**Postcodes**:
- 4 digits (0200-9999 range)
- Validation regex: `/^[0-9]{4}$/`

---

## 🧪 Testing Requirements

### Test Coverage Requirements
- **Minimum Coverage**: 80%
- **Critical Paths**: 100% (auth, payments, data intake)
- **Current Status**: 151/151 passing (100%)

### Test Structure

**Unit Tests** (`tests/unit/`):
```typescript
// tests/unit/booking.service.test.ts
import { BookingService } from '@/services/booking/booking.service'

describe('BookingService', () => {
  describe('createBooking', () => {
    it('should create a booking successfully', async () => {
      const input = { /* test data */ }
      const result = await bookingService.createBooking(input)

      expect(result).toBeDefined()
      expect(result.status).toBe('PENDING')
    })

    it('should throw error for invalid input', async () => {
      const invalidInput = { /* invalid data */ }

      await expect(
        bookingService.createBooking(invalidInput)
      ).rejects.toThrow('Validation failed')
    })
  })
})
```

**Integration Tests** (`tests/integration/`):
```typescript
// tests/integration/booking-flow.test.ts
describe('Booking Flow', () => {
  it('should complete end-to-end booking', async () => {
    // 1. Create user
    const user = await createTestUser()

    // 2. Create booking
    const booking = await createBooking({ userId: user.id })

    // 3. Match contractor
    const match = await matchContractor(booking.id)

    // 4. Verify notifications sent
    expect(emailService.send).toHaveBeenCalledWith(
      expect.objectContaining({ to: user.email })
    )
  })
})
```

**E2E Tests** (`tests/e2e/`):
```typescript
// tests/e2e/booking-flow.spec.ts
import { test, expect } from '@playwright/test'

test('complete booking flow', async ({ page }) => {
  // Navigate to booking page
  await page.goto('/services/water-damage')

  // Fill booking form
  await page.fill('[name="address"]', '123 Test St, Sydney NSW 2000')
  await page.fill('[name="phone"]', '0412 345 678')

  // Submit
  await page.click('button[type="submit"]')

  // Verify success
  await expect(page.locator('.success-message')).toBeVisible()
})
```

### Test Commands
```bash
npm run test              # Run all tests
npm run test:unit         # Unit tests only
npm run test:integration  # Integration tests only
npm run test:e2e          # E2E tests (Playwright)
npm run test:coverage     # Coverage report
npm run test:watch        # Watch mode
npm run test:ci           # CI mode (4 workers)
```

### Test Data Factories

Use factories for test data:
```typescript
// tests/factories/user.factory.ts
export function createTestUser(overrides?: Partial<User>): User {
  return {
    id: faker.string.uuid(),
    email: faker.internet.email(),
    name: faker.person.fullName(),
    role: 'CLIENT',
    tenantId: faker.string.uuid(),
    createdAt: new Date(),
    updatedAt: new Date(),
    ...overrides
  }
}
```

---

## 🚀 Deployment Procedures

### Local Development

**Setup**:
```bash
# Install dependencies
npm install

# Set up environment
cp .env.example .env.local

# Run database migrations
npx prisma migrate dev

# Generate Prisma client
npx prisma generate

# Start development server
npm run dev
```

**Environment Variables**:
```env
DATABASE_URL="postgresql://user:pass@localhost:5432/disasterrecovery"
REDIS_URL="redis://localhost:6379"
NEXTAUTH_SECRET="your-secret-here"
NEXTAUTH_URL="http://localhost:3000"
STRIPE_SECRET_KEY="sk_test_..."
OPENAI_API_KEY="sk-..."
GOOGLE_GENERATIVE_AI_API_KEY="..."
```

### Testing Before Deployment

**Pre-Deployment Checklist**:
1. Run all tests: `npm run test:all`
2. Run linting: `npm run lint`
3. Run type checking: `npm run typecheck`
4. Run build: `npm run build`
5. Check for security vulnerabilities: `npm audit`

**All must pass before deployment.**

### Docker Deployment

**Build Image**:
```bash
docker build -t disaster-recovery-nrpg:latest .
```

**Run Locally**:
```bash
docker-compose up -d
```

**Push to Registry**:
```bash
docker tag disaster-recovery-nrpg:latest <registry>/disaster-recovery-nrpg:latest
docker push <registry>/disaster-recovery-nrpg:latest
```

### Kubernetes Deployment (Planned)

**Manifests Location**: `k8s/deployment.yaml`

**Deploy**:
```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl apply -f k8s/ingress.yaml
```

**Verify**:
```bash
kubectl get pods
kubectl get services
kubectl logs <pod-name>
```

### Vercel Deployment (Current)

**Deploy to Production**:
```bash
npm run deploy:production
```

**Environment Variables**:
- Set all environment variables in Vercel dashboard
- Use production values for DATABASE_URL, REDIS_URL, API keys

**Vercel Configuration** (`vercel.json`):
```json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "functions": {
    "app/api/**/*.ts": {
      "maxDuration": 60
    }
  }
}
```

---

## 🤖 Agent-Specific Guidance

### When to Use Which Agent

**Existing Agents** (Class 2 - Already Implemented):

1. **Data Intake Agent** (`src/lib/agents/data-intake-agent.ts`)
   - **Use When**: Validating Australian property addresses, photos, moisture readings
   - **Triggers**: New inspection request, data submission
   - **Subagents**: address-validator, photo-validator, moisture-validator
   - **Output**: ValidatedInspectionData with risk flags

2. **Report Generation Agent** (`src/lib/agents/report-generation-agent.ts`)
   - **Use When**: Generating IICRC-compliant inspection reports
   - **Triggers**: Data Intake Agent completion
   - **Subagents**: iicrc-lookup, jurisdiction-rules, cost-calculator, pdf-generator
   - **Output**: NRPGReport (PDF + metadata)

3. **Quality Assurance Agent** (`src/lib/agents/quality-assurance-agent.ts`)
   - **Use When**: Reviewing generated reports for compliance and quality
   - **Triggers**: Report Generation Agent completion
   - **Subagents**: Multi-step QA process
   - **Output**: APPROVED | REJECTED | REVISION_REQUESTED

4. **Operations Agent** (`src/lib/agents/operations-agent.ts`)
   - **Use When**: Delivering reports, creating invoices, updating CRM
   - **Triggers**: QA Agent approval
   - **Subagents**: email-sender, invoice-creator, crm-updater
   - **Output**: Confirmation of delivery + invoice + CRM update

5. **CEO Oversight Agent** (`src/lib/agents/ceo-oversight-agent.ts`)
   - **Use When**: Generating executive dashboards, detecting business rule violations
   - **Triggers**: Scheduled (daily) or on-demand
   - **Subagents**: metrics-aggregator, violation-detector, alert-manager
   - **Output**: Health score, alerts, recommendations

6. **Agent Orchestrator** (`src/lib/agents/agent-orchestrator.ts`)
   - **Use When**: Coordinating multi-agent workflows (Inspection workflow)
   - **Triggers**: POST /api/agents/execute
   - **Workflow**: Data Intake → Report Gen → QA → Operations
   - **Output**: Complete workflow result with session state

**New Agents** (Class 3 - IMPLEMENTED ✅):

7. **Code Generation Agent** ✅ (`src/lib/agents/code-generation-agent.ts`)
   - **Use When**: Creating new features from specifications
   - **Triggers**: GitHub issue with label "agent:generate"
   - **Skills**: typescript-coding-standards, nextjs-app-router-patterns, prisma-database-patterns, testing-strategies
   - **Subagents**: spec-parser, code-generator, migration-creator, test-generator, doc-updater
   - **Output**: Git branch with code + tests + docs

8. **Testing Agent** ✅ (`src/lib/agents/testing-agent.ts`)
   - **Use When**: Running comprehensive test suites
   - **Triggers**: Code push, PR creation, pre-deployment
   - **Skills**: testing-strategies, error-handling-patterns
   - **Capabilities**: Jest, Playwright, ESLint, TypeScript checking, coverage analysis
   - **Output**: Test report (pass/fail + coverage)

9. **Security Scanning Agent** ✅ (`src/lib/agents/security-scanning-agent.ts`)
   - **Use When**: Detecting security vulnerabilities
   - **Triggers**: Testing Agent success, scheduled scans
   - **Skills**: security-best-practices, typescript-coding-standards
   - **Capabilities**: npm audit, SAST, secret detection, SQL injection check, XSS check
   - **Output**: Security report + auto-fix commits

10. **Deployment Agent** ✅ (`src/lib/agents/deployment-agent.ts`)
    - **Use When**: Deploying to staging/production
    - **Triggers**: Security scan success
    - **Skills**: deployment-procedures, error-handling-patterns
    - **Capabilities**: Docker build, K8s deployment, smoke tests, health monitoring, auto-rollback
    - **Output**: Deployment status + health check

11. **Monitoring Agent** ✅ (`src/lib/agents/monitoring-agent.ts`)
    - **Use When**: Continuous production monitoring
    - **Triggers**: Every 60 seconds + Prometheus alerts
    - **Skills**: deployment-procedures, error-handling-patterns
    - **Capabilities**: Prometheus metrics, Grafana dashboards, anomaly detection, auto-remediation
    - **Output**: Alerts + auto-remediation actions

12. **Refactoring Agent** ✅ (`src/lib/agents/refactoring-agent.ts`)
    - **Use When**: Improving code quality and performance
    - **Triggers**: Scheduled (weekly) or performance issues detected
    - **Skills**: typescript-coding-standards, error-handling-patterns
    - **Capabilities**: Code smell detection, safe refactoring, performance optimization
    - **Output**: Refactoring PR with justification

13. **Documentation Agent** ✅ (`src/lib/agents/documentation-agent.ts`)
    - **Use When**: Keeping docs synchronized with code
    - **Triggers**: Code changes, structure changes
    - **Skills**: api-design-patterns, deployment-procedures
    - **Capabilities**: Outdated doc detection, API doc generation, changelog updates, runbook creation
    - **Output**: Updated documentation PR

**Mergance Integration Agents** (Class 3 - IMPLEMENTED ✅):

14. **Repository Analysis Agent** ✅ (`src/lib/agents/repo-analysis-agent.ts`)
    - **Use When**: Starting Mergance integration
    - **Triggers**: Manual workflow (mergance)
    - **Skills**: mergance-integration, fact-checker
    - **Capabilities**: Scan DR-New, compare NRPG improvements, detect conflicts, generate blueprint
    - **Output**: Migration blueprint document

15. **Content Migration Agent** ✅ (`src/lib/agents/content-migration-agent.ts`)
    - **Use When**: Migrating content from NRPG to DR-New
    - **Triggers**: Repository Analysis completion
    - **Skills**: mergance-integration, australian-business-validator, iicrc-validator, fact-checker
    - **Capabilities**: Apply 202+ fact-checking fixes, transfer 24 AI images, integrate 40 SEO pages
    - **Output**: DR-New with NRPG improvements + change log

16. **Contractor Portal Agent** ✅ (`src/lib/agents/contractor-portal-agent.ts`)
    - **Use When**: Integrating contractor portal with authentication
    - **Triggers**: Content Migration completion
    - **Skills**: authentication-patterns, nextjs-app-router-patterns, api-design-patterns
    - **Capabilities**: Create login page, protect routes, RBAC, E2E tests
    - **Output**: Unified platform with gated contractor portal

17. **Integration Testing Agent** ✅ (`src/lib/agents/integration-testing-agent.ts`)
    - **Use When**: Testing merged platform
    - **Triggers**: Portal Integration completion
    - **Skills**: testing-strategies
    - **Capabilities**: Test public site, contractor portal, shared features, performance, SEO validation
    - **Output**: Comprehensive test report

**Phase 23 Infrastructure Agents** (Class 3 - IMPLEMENTED ✅):

18. **Infrastructure Planning Agent** ✅ (`src/lib/agents/infrastructure-planning-agent.ts`)
    - **Use When**: Starting Phase 23 infrastructure deployment
    - **Triggers**: Manual workflow (phase23)
    - **Skills**: phase23-infrastructure, deployment-procedures, security-best-practices
    - **Capabilities**: Design cloud architecture, K8s sizing, DB architecture, cost estimation, Terraform generation
    - **Output**: Infrastructure plan + Terraform modules

19. **Infrastructure Provisioning Agent** ✅ (`src/lib/agents/infrastructure-provisioning-agent.ts`)
    - **Use When**: Provisioning cloud resources
    - **Triggers**: Infrastructure Planning approval
    - **Skills**: phase23-infrastructure, deployment-procedures
    - **Capabilities**: Execute Terraform, provision VPC/K8s/RDS/Redis/S3/IAM, health validation
    - **Output**: Provisioned cloud infrastructure + health report

20. **Database Migration Agent** ✅ (`src/lib/agents/database-migration-agent.ts`)
    - **Use When**: Migrating database to cloud
    - **Triggers**: Infrastructure Provisioning completion
    - **Skills**: prisma-database-patterns, phase23-infrastructure
    - **Capabilities**: Backup, replication, consistency validation, traffic switch, rollback
    - **Output**: Cloud database with migrated data + validation report

21. **CI/CD Pipeline Agent** ✅ (`src/lib/agents/cicd-pipeline-agent.ts`)
    - **Use When**: Setting up automated pipelines
    - **Triggers**: Database Migration completion
    - **Skills**: deployment-procedures, testing-strategies
    - **Capabilities**: GitHub Actions workflows, Docker builds, automated testing, approval gates
    - **Output**: Fully configured CI/CD pipeline

22. **Monitoring Infrastructure Agent** ✅ (`src/lib/agents/monitoring-infrastructure-agent.ts`)
    - **Use When**: Deploying monitoring stack
    - **Triggers**: CI/CD Pipeline completion
    - **Skills**: phase23-infrastructure, deployment-procedures
    - **Capabilities**: Deploy Prometheus, Grafana dashboards, alerting rules, log aggregation, tracing
    - **Output**: Full monitoring stack + dashboards + alerts

23. **Security Infrastructure Agent** ✅ (`src/lib/agents/security-infrastructure-agent.ts`)
    - **Use When**: Hardening production security
    - **Triggers**: Monitoring Infrastructure completion
    - **Skills**: security-best-practices, phase23-infrastructure
    - **Capabilities**: TLS/SSL, WAF, DDoS protection, network policies, vulnerability scanning, SAST
    - **Output**: Hardened security infrastructure + compliance report

24. **Performance Testing Agent** ✅ (`src/lib/agents/performance-testing-agent.ts`)
    - **Use When**: Validating performance at scale
    - **Triggers**: Security Infrastructure completion
    - **Skills**: phase23-infrastructure, deployment-procedures
    - **Capabilities**: Load tests (2x, 5x, 10x), DB performance, cache effectiveness, DR testing
    - **Output**: Performance test report + optimizations

25. **Production Deployment Agent** ✅ (`src/lib/agents/production-deployment-agent.ts`)
    - **Use When**: Final production deployment
    - **Triggers**: Performance Testing success + all approvals
    - **Skills**: deployment-procedures, phase23-infrastructure
    - **Capabilities**: Pre-deployment checklist (100+ items), canary deployment, health monitoring, smoke tests
    - **Output**: Production deployment + comprehensive report

**Meta-Agent** (Class 3 - IMPLEMENTED ✅):

26. **Super-Orchestrator Agent** ✅ (`src/lib/agents/super-orchestrator.ts`)
    - **Use When**: Coordinating all agents across all workflows
    - **Triggers**: All events (GitHub, CI/CD, monitoring, scheduled, manual)
    - **API Endpoint**: `POST /api/super-orchestrator`
    - **Capabilities**: Event monitoring, workflow routing, agent coordination, feedback loops, self-improvement
    - **Workflows Supported**:
      - Feature Development (15 min autonomous)
      - Bug Fix (10 min autonomous)
      - Mergance Integration (4-7 hours semi-autonomous)
      - Phase 23 Infrastructure (8-12 weeks semi-autonomous)
      - Performance Investigation (autonomous)
      - Security Fix (autonomous)
      - Weekly Refactoring (autonomous)
    - **Output**: Workflow routing decisions + daily/weekly reports + self-improvement analysis

### Agent Execution APIs

**Inspection Workflow API**: `POST /api/agents/execute`
*For Class 2 report processing workflow*

**Super-Orchestrator API**: `POST /api/super-orchestrator`
*For Class 3 autonomous development workflows*

**Request**:
```json
{
  "workflowType": "inspection",
  "data": {
    "address": "123 Test St, Sydney NSW 2000",
    "photos": [...],
    "moistureReadings": [...]
  }
}
```

**Response**:
```json
{
  "success": true,
  "workflowId": "wf_abc123",
  "status": "COMPLETED",
  "results": {
    "dataIntake": { /* validated data */ },
    "reportGeneration": { /* report */ },
    "qualityAssurance": { "status": "APPROVED" },
    "operations": { /* delivery confirmation */ }
  }
}
```

### Agent Development Guidelines

When creating new agents:

1. **Extend Base Agent**:
```typescript
import { Agent, AgentConfig } from '@anthropic-ai/claude-agent-sdk'

export class NewAgent extends Agent {
  constructor(config: AgentConfig) {
    super(config)
  }

  async execute(input: InputType): Promise<OutputType> {
    // Implementation
  }
}
```

2. **Define Subagents**:
```typescript
const subagents = [
  {
    name: 'subagent-1',
    prompt: 'Your role is to...',
    tools: ['Read', 'Grep'],
    skills: ['skill-name']
  }
]
```

3. **Implement Hooks**:
```typescript
const hooks = {
  preToolUse: async (tool, args) => {
    // Validation and enforcement
  },
  postToolUse: async (tool, result) => {
    // Audit logging
  }
}
```

4. **Handle Errors**:
```typescript
try {
  const result = await subagent.execute(input)
  return result
} catch (error) {
  logger.error('Agent execution failed', { error })
  throw new AgentExecutionError(error.message)
}
```

5. **Test Agent**:
```typescript
// tests/unit/agents/new-agent.test.ts
describe('NewAgent', () => {
  it('should execute successfully', async () => {
    const agent = new NewAgent(config)
    const result = await agent.execute(input)
    expect(result).toBeDefined()
  })
})
```

---

## 🎯 Production Readiness Standards

### Critical Reference: CLAUDE.md

**The most important file in this repository is `CLAUDE.md`.**

This file defines what "production ready" actually means. Key principles:

**Production Ready Does NOT Mean**:
- Code written in TypeScript files ❌
- Tests designed but not running ❌
- Architecture documented in markdown ❌
- Services designed but not deployed ❌

**Production Ready ACTUALLY Means**:
- Code deployed to production environment ✅
- Real database connected and persisting data ✅
- Tests running in automated CI/CD pipeline ✅
- Monitoring dashboards showing actual metrics ✅
- Real users can access and use features ✅
- Payment system integrated and working ✅
- 99.9% uptime achieved ✅
- Zero critical security vulnerabilities ✅

### Phase 23: Infrastructure as Code (Current Focus)

The project is currently at **Phase 23** which focuses on transforming the architecture into a production-ready, deployed system.

**Phase 23 Requirements**:
1. Cloud infrastructure provisioned (AWS/GCP/Azure)
2. Kubernetes cluster deployed
3. CI/CD pipeline configured
4. PostgreSQL RDS with multi-AZ
5. Redis ElastiCache
6. Monitoring (Prometheus + Grafana)
7. Security (IAM, VPC, secrets, TLS)
8. Load testing (2x, 5x, 10x traffic)
9. Disaster recovery tested
10. Team training completed

**Red Flags** 🚩 (disqualify Phase 23):
- No cloud infrastructure provisioned
- No Kubernetes cluster deployed
- No CI/CD pipeline configured
- No monitoring infrastructure
- No load testing completed

**Success Criteria**:
- 99.9% uptime
- Sub-second API response times
- Auto-scaling handles 10x traffic
- Zero-downtime deployments
- Comprehensive security scanning

---

## 📚 Additional Resources

### Documentation Files
- `CLAUDE.md` - Production readiness standards (READ THIS FIRST)
- `DEPLOYMENT_STANDARDS.md` - 16-point deployment checklist
- `IMPLEMENTATION_GUIDE.md` - Practical code examples
- `PRODUCTION_READINESS_CHECKLIST.md` - 100+ checkboxes
- `README_STANDARDS.md` - Framework guide
- `AGENT_SYSTEM_IMPLEMENTATION.md` - Agent architecture details
- `AGENT_QUICK_REFERENCE.md` - Agent API reference
- `MERGANCE_INTEGRATION_PLAN.md` - Platform integration plan

### Skills Location
- `.claude/skills/` - Agent skill library
  - `australian-business-validator.md`
  - `iicrc-validator.md`
  - `fact-checker.md`
  - (15+ more skills to be added)

### Memory System
- `.claude/memory/` - Persistent learnings
  - `project-decisions.md` - Architectural decisions
  - `patterns-learned.md` - Discovered patterns
  - `bug-fixes.md` - Known issues and resolutions
  - `performance-optimizations.md` - Applied optimizations
  - `integration-notes.md` - Third-party integration learnings

### External APIs & Services
- **Stripe**: Payment processing (docs: https://stripe.com/docs/api)
- **Twilio**: SMS and calling (docs: https://www.twilio.com/docs)
- **OpenAI**: AI/ML (docs: https://platform.openai.com/docs)
- **Google Gemini**: AI/ML (docs: https://ai.google.dev/docs)
- **SEMRUSH**: Competitor analysis (docs: https://www.semrush.com/api-documentation)
- **DataForSEO**: SEO intelligence (docs: https://docs.dataforseo.com)

---

## 🎓 Onboarding Checklist for New Agents

When a new AI agent is initialized to work on this project:

1. ✅ Read this `AGENTS.md` file completely
2. ✅ Read `CLAUDE.md` for production standards
3. ✅ Review `package.json` for available scripts and dependencies
4. ✅ Review `prisma/schema.prisma` for database models
5. ✅ Review `tsconfig.json` for TypeScript configuration
6. ✅ Load relevant skills from `.claude/skills/` based on task
7. ✅ Review `.claude/memory/` for project learnings
8. ✅ Check current git branch and recent commits
9. ✅ Run `npm run test` to verify current system status
10. ✅ Ask: "What is the immediate goal or task?"

---

## 📞 Support & Escalation

### Human Contact Points
- **Technical Lead**: For architectural decisions and approvals
- **DevOps Lead**: For infrastructure and deployment issues
- **Security Lead**: For security vulnerabilities
- **Product Owner**: For feature prioritization

### When to Flag for Human Review
- Critical security vulnerabilities detected
- Production deployment approval required
- Database schema changes (destructive migrations)
- Infrastructure cost changes (>10% increase)
- Test failure rate >10%
- Unknown edge cases or ambiguous requirements
- Agent execution failures (>3 retries)

---

## 🔒 Security & Compliance

### IICRC Standards
- **S500**: Water Damage Restoration
- **S520**: Mould Remediation
- **S700**: Fire and Smoke Damage Restoration
- **S001**: Professional and Ethical Standards

All inspection reports MUST comply with IICRC standards.

### Data Privacy
- Multi-tenant data isolation (ALWAYS filter by tenantId)
- Personal data encrypted at rest and in transit
- GDPR compliance for data export and deletion
- Audit logging for all sensitive operations

### Security Best Practices
- Use environment variables for secrets (NEVER hardcode)
- Validate all user inputs (use Zod schemas)
- Sanitize outputs to prevent XSS
- Use parameterized queries to prevent SQL injection
- Implement rate limiting on API endpoints
- Use HTTPS only (enforce TLS 1.2+)

---

## 🎯 Current Project Status

**Phase**: 23 (Infrastructure as Code)
**Overall Progress**: 15% Complete
**Architecture**: 100% Complete (68,728+ lines)
**Infrastructure**: 0% Complete (NOT STARTED)

**Recent Milestones**:
- ✅ 138,556 lines of TypeScript written
- ✅ 50+ microservices implemented
- ✅ 28+ database models designed
- ✅ Class 2 agentic layer (5 agents + orchestrator)
- ✅ 151/151 tests passing
- ✅ Lint: 0 warnings, 0 errors
- ✅ Mergance integration planned

**Next Immediate Steps**:
1. Implement Class 3 agentic layer (add 19 new agents)
2. Complete Mergance integration (merge DR-New + NRPG)
3. Deploy Phase 23 infrastructure (cloud, K8s, monitoring)
4. Achieve Codebase Singularity (autonomous operations)

---

**Version History**:
- v1.0.0 (2025-12-30): Initial creation for Class 3 agentic layer implementation

---

**This document is the single source of truth for all AI agents working on this project.**

**All agents MUST read and follow the guidelines in this file.**

**Codebase Singularity: From Prompt to Production.**
