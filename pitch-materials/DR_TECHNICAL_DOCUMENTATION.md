# DISASTER RECOVERY - TECHNICAL DOCUMENTATION

## System Architecture

### Frontend Stack
- **Framework**: Next.js 14.2.14
- **UI Library**: React 18.3.1
- **Styling**: Tailwind CSS 3.4.13
- **Component Library**: shadcn/ui components
- **State Management**: React Context API
- **Forms**: React Hook Form with Zod validation

### Backend Infrastructure
- **Runtime**: Node.js
- **API**: Next.js API Routes
- **Database**: PostgreSQL via Supabase
- **ORM**: Prisma 5.20.0
- **Authentication**: NextAuth.js
- **File Storage**: Supabase Storage

### Deployment & DevOps
- **Hosting**: Vercel (Production & Staging)
- **CI/CD**: Vercel automatic deployments
- **Monitoring**: Vercel Analytics
- **Environment Management**: .env files with validation
- **Version Control**: Git with GitHub

### AI Integration
- **LLM**: Claude 3.5 Sonnet
- **MCP Servers**: 
  - playwright (browser automation)
  - context7-upstash (documentation)
  - sequential-thinking-mcp (planning)
- **Automation**: PowerShell scripts for orchestration

## Database Schema

### Core Tables
```prisma
- User (authentication, roles)
- Contractor (profiles, service areas)
- Lead (insurance claims)
- Location (suburbs, regions)
- Service (disaster types)
- Page (SEO content)
- Match (lead-contractor pairing)
```

### Key Relationships
- Contractor → many Locations (service areas)
- Contractor → many Services (capabilities)
- Lead → one Location
- Lead → many Matches
- Page → one Location + one Service

## API Endpoints

### Public APIs
```
GET  /api/locations - Search locations
GET  /api/services - List services
POST /api/leads - Submit claim
GET  /api/pages/[slug] - SEO pages
```

### Contractor APIs
```
POST /api/auth/login - Contractor login
GET  /api/contractor/leads - View leads
POST /api/contractor/accept - Accept lead
GET  /api/contractor/profile - Profile data
PUT  /api/contractor/settings - Update settings
```

### Admin APIs
```
GET  /api/admin/contractors - List all
POST /api/admin/contractor - Add contractor
GET  /api/admin/leads - All leads
GET  /api/admin/analytics - Platform metrics
POST /api/admin/pages/generate - Create SEO pages
```

## SEO Implementation

### Page Generation System
1. Contractor provides location + radius
2. System identifies all suburbs in radius
3. Generates pages for each service × location
4. Creates unique content with AI
5. Adds schema markup
6. Submits to search console

### URL Structure
```
/[location]/[service]
/sydney/water-damage-restoration
/coober-pedy/mould-remediation
/[location]/emergency-[service]
```

### Schema Markup
- LocalBusiness
- Service
- AggregateRating
- BreadcrumbList
- FAQPage

## Security Measures

### Authentication
- JWT tokens with refresh
- Role-based access control
- Session management
- 2FA for contractors

### Data Protection
- Environment variable validation
- SQL injection prevention (Prisma)
- XSS protection (React)
- CSRF tokens
- Rate limiting

### Compliance
- GDPR data handling
- Australian Privacy Act
- PCI DSS for payments
- SSL/TLS encryption

## Performance Optimization

### Frontend
- Image optimization (WebP, lazy loading)
- Code splitting
- Static generation for SEO pages
- CDN distribution via Vercel
- Bundle size monitoring

### Backend
- Database indexing
- Query optimization
- Connection pooling
- Caching strategy
- Background job processing

## Automation Systems

### Lead Distribution
1. AI assesses claim details
2. Matches to contractor capabilities
3. Checks contractor capacity
4. Sends notification
5. Tracks acceptance
6. Routes to backup if declined

### Page Generation
1. Daily contractor sync
2. Identify new locations
3. Generate content batch
4. Optimize images
5. Deploy pages
6. Submit to search engines

## Monitoring & Analytics

### Key Metrics Tracked
- Page load times
- API response times
- Error rates
- Contractor response times
- Lead conversion rates
- SEO rankings
- User engagement

### Tools
- Vercel Analytics
- Google Analytics
- Search Console
- Custom dashboard
- Error tracking (planned)

## Development Workflow

### Environment Setup
```bash
npm install
npm run dev
```

### Build Process
```bash
npm run validate-env
npm run build
npm run start
```

### Testing
```bash
npm run test
npm run test:e2e
npm run lint
```

### Deployment
```bash
git push main  # Auto-deploys to Vercel
```

## File Structure
```
/
├── src/
│   ├── app/           # Next.js app router
│   ├── components/    # React components
│   ├── lib/          # Utilities
│   └── styles/       # CSS files
├── prisma/           # Database schema
├── public/           # Static assets
├── scripts/          # Automation scripts
└── docs/            # Documentation
```

## Integration Points

### External Services
- Vercel (hosting)
- Supabase (database, auth, storage)
- Claude AI (content, automation)
- Google (SEO, analytics)
- Future: Insurance APIs

### Webhook Endpoints
- Lead submission
- Contractor updates
- Payment processing
- Status changes

## Scaling Considerations

### Current Capacity
- 10,000+ concurrent users
- 1,000+ pages/day generation
- 99.9% uptime SLA
- 200ms API response time

### Growth Path
- Horizontal scaling via Vercel
- Database read replicas
- CDN expansion
- Microservices architecture (future)
- International deployment (PNG)