# Agent Working Guidelines - Disaster Recovery Project
Session: 2026-03-01 | Mode: Collaborative Development

## 🎯 Current Priority Focus

### Immediate: Dynamic SEO/GEO Generation System
Build the proof-of-concept for contractor-triggered page generation:

**Components Needed:**
1. **Geo-Radius System** - "Find all suburbs within X km" functionality
2. **Contractor Tier → Coverage Mapping** - Tier 1/2/3 radius definitions
3. **Auto-Trigger Pipeline** - Webhook/event on contractor signup
4. **Page Generation Queue** - Bull queue for async page building

**NOT Building Yet:**
- Bulk page generation (20,000+ pages)
- Full production deployment
- All suburb coverage upfront

### Secondary: Client Onboarding System
Full spec exists (2,875 lines in existing spec.md) - ready for implementation when prioritised.

## 📋 Working Patterns

### Code Standards (From project conventions)
```typescript
// Always use explicit types
interface ContractorCoverage {
  contractorId: string;
  tier: 'TIER_1' | 'TIER_2' | 'TIER_3';
  radiusKm: number;
  centrePostcode: string;
  generatedSuburbs: string[];
}

// Multi-tenant - ALWAYS filter by tenantId
const contractors = await prisma.contractor.findMany({
  where: { tenantId, status: 'ACTIVE' }
});

// Use Australian English
const colour = '#00BFA6';
const mouldRemediation = 'MOULD_REMEDIATION';
```

### File Naming Conventions
- Components: `PascalCase.tsx` (e.g., `ContractorCoverageMap.tsx`)
- Utilities: `kebab-case.ts` (e.g., `geo-radius-calculator.ts`)
- Services: `kebab-case.service.ts` (e.g., `seo-generation.service.ts`)
- Tests: `*.test.ts` or `*.spec.ts`
- Agents: `kebab-case-agent.ts` (e.g., `seo-generation-agent.ts`)

### Directory Structure for New Features
```
lib/
├── geo/
│   ├── radius-calculator.ts
│   ├── suburb-lookup.ts
│   └── types.ts
├── seo/
│   ├── page-generator.service.ts
│   ├── sitemap-updater.ts
│   └── schema-builder.ts
app/
├── api/
│   └── contractors/
│       └── [id]/
│           └── coverage/
│               └── route.ts
```

### Australian Localisation Requirements
- Phone validation: `/^(\\+61|0)[2-478]\\d{8}$/`
- Postcode validation: `/^[0-9]{4}$/`
- States: NSW, VIC, QLD, WA, SA, TAS, ACT, NT
- Currency: AUD with $ symbol
- Spelling: Australian English (colour, mould, organisation)

## 🚧 Boundaries

### What I Will Do
- Write code following project patterns
- Create files and provide terminal commands
- Debug and optimise existing code
- Design architecture and systems
- Write tests and documentation

### What I Will NOT Do
- Enter sensitive credentials or API keys
- Make purchases or financial transactions
- Modify security permissions
- Create accounts on your behalf
- Deploy to production without approval
- Delete data without confirmation

## 📞 When to Escalate

Escalate to human decision for:
- **Architecture decisions** requiring business input
- **Cost implications** (cloud resources, API usage)
- **Third-party integrations** requiring credentials
- **Deployment approvals** (staging → production)
- **Data schema changes** (destructive migrations)
- **Pricing/tier structure changes**

## 🔄 Session Continuity

### Context Maintained
- Project: Disaster Recovery - NRPG Platform
- Repository: https://github.com/CleanExpo/Disaster-Recovery
- Status: 12/17 systems complete (70%)
- Focus: Dynamic SEO/GEO generation system
- Tech: Next.js 14, TypeScript, Prisma, PostgreSQL

### To Resume Work
Remind me:
1. "Working on Disaster Recovery NRPG"
2. Current task/priority
3. Any changes since last session

## ✅ Ready State Checklist

- [x] Project structure understood
- [x] Tech stack confirmed
- [x] Current status known (12/17 systems)
- [x] Priority focus clear (SEO/GEO system)
- [x] Reference documents created
- [ ] Begin implementation

## 🎯 Next Steps Options

**Option 1: Architecture Design**
Plan the contractor signup → page generation pipeline

**Option 2: Geo-Radius System**
Build the "find all suburbs within X km" functionality

**Option 3: Demo/Mockup**
Create visual proof of concept for pitching

**Option 4: Integration**
Hook into existing contractor onboarding

---
Document Version: 1.0.0
Last Updated: 2026-03-01
Status: Ready for implementation
