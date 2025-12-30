# Project Decisions Log

**Purpose**: Record architectural and technical decisions to avoid revisiting resolved questions.

---

## 2025-12-30: Class 3 Agentic Layer Implementation

**Decision**: Implement full Class 3 autonomous codebase with 24 new agents + super-orchestrator

**Context**:
- Current state: Class 2 (5 agents + orchestrator)
- Goal: Codebase singularity (self-running codebase)
- Requirements: Mergance integration, Phase 23 infrastructure, autonomous development

**Rationale**:
- Enables 10x development velocity
- Reduces human intervention to strategic decisions only
- Automates testing, deployment, monitoring, refactoring
- Aligns with industry standards (Agentic AI Foundation)

**Implementation**:
- 7 development lifecycle agents
- 4 Mergance integration agents
- 8 Phase 23 infrastructure agents
- 1 super-orchestrator agent
- Full MCP integration
- 15+ domain-specific skills
- Memory system for continuous learning

**Expected Outcome**:
- 90%+ of feature development autonomous
- 95%+ of bug fixes autonomous
- 99.9% uptime with auto-remediation
- Zero critical vulnerabilities (continuous scanning)

---

## 2025-12-23: Phase 23 Infrastructure as Code

**Decision**: Focus on cloud infrastructure deployment as primary objective

**Context**:
- Phase 22 complete (architecture, 68,728+ lines of code)
- Infrastructure not yet deployed (0% complete)
- Overall project: 15% complete

**Rationale**:
- Architecture without deployment is NOT production ready
- "Production ready" means ACTUALLY deployed and running
- Red flags if infrastructure not provisioned

**Implementation**:
- Terraform/Cloud Formation for IaC
- Kubernetes for orchestration
- CI/CD pipeline (GitHub Actions)
- PostgreSQL RDS (multi-AZ)
- Redis ElastiCache
- Prometheus + Grafana monitoring
- Security hardening (TLS, WAF, secrets management)

**Expected Outcome**:
- 99.9% uptime
- Sub-second API response times
- Auto-scaling for 10x traffic
- Zero-downtime deployments

---

## 2025-12-20: Mergance Integration Architecture

**Decision**: Merge DR-New (client site) with NRPG (contractor portal) into unified platform

**Context**:
- Two separate platforms with overlapping functionality
- DR-New: public client-facing site
- NRPG: contractor portal (current repo)
- Goal: Unified platform with gated contractor access

**Rationale**:
- Reduces maintenance overhead (single codebase)
- Improves user experience (seamless navigation)
- Leverages improvements from both platforms
- SEO benefits from unified domain

**Implementation**:
- Main site: disasterrecovery.com.au (DR-New enhanced)
- Public pages: Client-facing content
- Contractor portal: /contractor/* (gated, NRPG dashboard)
- 202+ fact-checking fixes applied
- 24 AI-generated images integrated
- 40 SEO pillar/sub-pillar pages
- Australian English spelling (mould)

**Safety Measures**:
- Git backup branches
- Incremental migration
- Agent-driven conflict detection
- Staging deployment first
- Instant rollback capability

---

## 2025-12-15: Claude Agent SDK Integration

**Decision**: Use Claude Agent SDK (@anthropic-ai/claude-agent-sdk) for agentic layer

**Context**:
- Multiple AI agent frameworks available
- Need for production-ready, well-supported solution

**Rationale**:
- Official Anthropic SDK (first-class support)
- Built for Claude's capabilities
- Supports subagents, hooks, tools, skills
- Session management and context preservation
- Active development and documentation

**Implementation**:
- Installed v0.1.76
- 5 specialized agents implemented
- Orchestrator for workflow coordination
- Subagent hierarchies (3-4 per agent)
- Hook system for business rule enforcement

**Outcome**: Successfully operational in production

---

## 2025-12-10: Multi-Tenant Architecture

**Decision**: Implement multi-tenant architecture with tenant-scoped data isolation

**Context**:
- Platform serves multiple contractors and clients
- Need data isolation for security and compliance

**Rationale**:
- Security: Prevent cross-tenant data leaks
- Scalability: Support 1000+ tenants
- Compliance: GDPR, Australian privacy laws

**Implementation**:
- tenantId field in all models
- Prisma middleware for automatic injection
- Role-based access control (CLIENT, CONTRACTOR, ADMIN, SUPER_ADMIN)
- Tenant context in all queries

**Best Practice**: ALWAYS filter by tenantId

---

## 2025-12-05: TypeScript Strict Mode

**Decision**: Enable strict TypeScript configuration

**Context**:
- TypeScript allows gradual type safety adoption
- Project requires high reliability

**Rationale**:
- Catch errors at compile time
- Better IDE support
- Self-documenting code
- Easier refactoring

**Configuration**:
```json
{
  "strict": true,
  "noImplicitAny": true,
  "strictNullChecks": true,
  "strictFunctionTypes": true
}
```

**Outcome**: Zero type errors, improved code quality

---

## 2025-11-30: Next.js 14 App Router

**Decision**: Use Next.js 14 App Router (not Pages Router)

**Context**:
- Next.js offers two routing systems
- App Router is newer, more powerful

**Rationale**:
- Server Components by default (better performance)
- Improved layouts and nested routing
- Built-in loading and error states
- Better TypeScript support
- Future-proof (Pages Router being phased out)

**Implementation**:
- All pages in app/ directory
- API routes in app/api/
- Layouts for shared UI
- loading.tsx, error.tsx patterns

**Best Practice**: Use Server Components unless interactivity needed

---

## 2025-11-25: Prisma as ORM

**Decision**: Use Prisma for database access

**Context**:
- Multiple ORM options (TypeORM, Sequelize, raw SQL)
- Need type-safe database access

**Rationale**:
- Type-safe queries
- Auto-generated TypeScript types
- Migration system
- Great Next.js integration
- Excellent developer experience

**Implementation**:
- schema.prisma with 28+ models
- Prisma Client for queries
- Migrations for schema changes
- Transaction support

**Outcome**: Zero runtime database errors, productive development

---

**Last Updated**: 2025-12-30
**Agents**: Read this file to understand past decisions and avoid repeating discussions.
