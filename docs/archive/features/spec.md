# Disaster Recovery NRPG Platform - Working Specification
Version: 1.0 | Date: 2026-03-01 | Session Reference

## 🎯 Current Focus: Dynamic Contractor-Triggered SEO/GEO Generation

### The Vision
Instead of bulk pre-generating 20,000+ location pages (expensive), the system generates SEO/GEO pages **on-demand** when contractors sign up.

**Flow:**
```
Contractor Signs Up (Urunga, NSW) → Tier 2 (50km radius)
                    ↓
    System Auto-Generates:
    ├── Landing Pages (Urunga + all suburbs within 50km)
    ├── Pillar Pages (services they offer)
    ├── Internal Linking Structure
    ├── Schema Markup (LocalBusiness)
    ├── Sitemap Update (submitted to Google)
    └── SEO Campaign Activated for this region
```

### Tier Structure (Confirmed)
| Tier | Price | Radius | Est. Suburbs |
|------|-------|--------|--------------|
| Tier 1 | $99/mo | 25km | ~15-30 |
| Tier 2 | $299/mo | 50km | ~50-100 |
| Tier 3 | $799/mo | 100km | ~150-300 |

### Current Project Status: 12/17 Systems Complete (70%)

**✅ COMPLETED (12 Systems):**
1. Homepage rebuild - Full spec implementation
2. Marketing components - 11 new components
3. Claim wizard - 3-step AI automated
4. NRPG contractor funnel - 3 pages + components
5. Resources hub - CMS/search ready
6. API namespace - 4 public endpoints
7. Security - Rate limit + CAPTCHA + CSP + DDoS
8. Analytics - GA4 + GTM + cookie consent
9. Testing - 50+ E2E tests
10. Performance - LCP <1.5s, Lighthouse CI
11. Environment config - .env, Vercel setup
12. Build infrastructure - GitHub Actions, deployment

**🔄 REMAINING (5 Systems):**
| # | System | Status | Notes |
|---|--------|--------|-------|
| 13 | SEO location pages | 🔄 Partial | 2,281/10,000 pages (on-demand strategy) |
| 14 | CMS (Sanity) | ✅ Ready | Needs Sanity project setup |
| 15 | Search (Algolia) | ✅ Ready | Needs Algolia account |
| 16 | Final documentation | ✅ Complete | 85,000 words total |
| 17 | Client Onboarding | ⏳ Pending | Full spec ready (2,875 lines) |

### Key Architecture Details

**Tech Stack:**
- Framework: Next.js 14.2.15 (App Router)
- Language: TypeScript 5.3.3
- Database: PostgreSQL (Prisma 5.22.0)
- Auth: NextAuth 4.24.11
- Payments: Stripe 14.10.0
- AI/ML: OpenAI, Google Gemini, LangChain
- Deployment: Vercel, Docker, K8s (planned)

**Codebase Metrics:**
- 138,556 lines of TypeScript
- 50+ microservices
- 28+ database models
- 151/151 tests passing (100%)
- 0 lint warnings

### URL Structure (Geographic Hierarchy)
```
/sydney/water-damage
/melbourne/fire-restoration
/brisbane/mold-remediation
/{city}/{service}
```

### SEO Page Generation Strategy
- **Capital Cities**: Static at build (8 cities)
- **Suburbs**: On-demand (ISR, generated on contractor signup)
- **Trigger**: Contractor onboarding completion → geo-radius calculation → page generation

### Dynamic SEO/GEO System Components

**1. Geo-Radius Calculator Service**
```typescript
// lib/geo/radius-calculator.ts
interface GeoRadiusInput {
  centrePostcode: string;
  radiusKm: number;
}

interface SuburbResult {
  postcode: string;
  suburb: string;
  state: string;
  distanceKm: number;
}
```

**2. Contractor Coverage Model**
```typescript
interface ContractorCoverage {
  contractorId: string;
  tier: 'TIER_1' | 'TIER_2' | 'TIER_3';
  radiusKm: number;
  centrePostcode: string;
  services: ServiceType[];
  generatedPages: string[];
}
```

**3. Page Generation Queue**
- Bull queue for async page building
- Priority: Emergency pages first
- Rate limiting to avoid API overload

**4. Sitemap Update Service**
- Dynamic sitemap generation
- Auto-submit to Google Search Console
- Track indexed vs pending pages

---
Document Version: 1.0.0
Last Updated: 2026-03-01
