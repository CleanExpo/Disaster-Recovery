# CLAUDE.md - Critical Project Context

## ⚠️ CRITICAL ENVIRONMENT CONFIGURATION ⚠️

### **NEVER MODIFY WITHOUT APPROVAL**
- **Production URL**: https://disasterrecovery.com.au
- **Vercel Project**: dr-nrpg (team: unite-group)

### **Environment Variable Requirements**
```bash
# CORRECT Configuration
NEXT_PUBLIC_APP_URL=https://disasterrecovery.com.au
NEXTAUTH_URL=https://disasterrecovery.com.au
```

### **Validation**
- Run `npm run validate-env` before any deployment
- Build process will FAIL if incorrect domains are detected
- Check `.env.example` for correct template

## Business Model Overview

### **CRITICAL: National Distribution Model**
- **Coverage**: AUSTRALIA-WIDE, not just Brisbane or major cities
- **Role**: Claims distributor and SEO dominator, NOT service provider
- **Client Interface**: 100% AI bot or contractor-direct (NO phone calls to NRPG)
- **Goal**: Dominate ALL disaster recovery categories across ALL of Australia

### **Strategic Positioning**
1. **NRPG is the middleman/distributor** - We connect insurance claims to contractors
2. **Zero direct client service** - All client interaction through AI bots or contractors
3. **SEO monopoly strategy** - Lock out ALL competitors nationwide
4. **Population-agnostic** - Target EVERY location, regardless of size

### **⚠️ CRITICAL: Billing Model — Client-Direct, NOT Insurer Billing**

**DR/NRPG contractors bill the CLIENT directly. They do NOT bill insurance companies.**

This is a compliance-critical distinction. The correct billing flow is:

1. **Contractor bills the client** (property owner / policyholder / management group) directly
2. **Client claims reimbursement** from their insurance carrier
3. **DR provides full documentation** (photos, scope of works, reports) to support the client's claim
4. **After make-safe**, the NRPG Contractor provides a formal contract with terms and conditions to the client
5. **Payment plans** are available via [Blue Fire Finance](https://www.bluefirefinance.com.au)

**DR/NRPG do NOT work directly with insurance companies** — no insurer is on the Vetted Supplier List currently.

#### **Messaging Rules — NEVER use these phrases:**
- ❌ "direct-bill" / "direct billing" / "bill your insurer"
- ❌ "no upfront costs" / "no out-of-pocket"
- ❌ "pay only your excess" / "pay only your policy excess"
- ❌ "invoice your insurer" / "invoices your insurance company"

#### **Correct Messaging — Frame client billing as a BENEFIT:**
- ✅ "We bill you directly" — always the client, never the insurer
- ✅ "Work begins immediately" — no waiting for insurer approval
- ✅ "You control the process" — no scope disputes or insurer delays
- ✅ "Full claims documentation provided" — we give the client everything their insurer needs
- ✅ "Payment plans available through Blue Fire Finance" — link to https://www.bluefirefinance.com.au
- ✅ "Contractor provides a formal contract" — after make-safe, clear terms and conditions

#### **Blue Fire Finance Link Format (JSX/HTML):**
```html
<a href="https://www.bluefirefinance.com.au" target="_blank" rel="noopener noreferrer">Blue Fire Finance</a>
```

### **Technical Architecture**

#### **Soft Launch Strategy**
- Initial site displays "COMING SOON" messaging
- Use soft launch period to:
  - Build SEO authority
  - Attract contractors to platform
  - Generate location data from contractor signups

#### **Auto-Scaling Location Pages**
- **Data Source**: Contractor CRM provides:
  - Contractor location
  - Service radius preference
  - Service categories offered
- **Auto-Generation**: System automatically creates:
  - Location-specific landing pages
  - Service area pages within radius
  - Category-specific pages per location
  - Schema markup for local SEO

#### **Self-Running System Design**
- **Minimal Human Intervention**: System runs autonomously
- **Paid Developers**: On staff for updates/issues only
- **Cost Minimization**: Absolute minimum operational costs
- **Profit Optimization**: Maximum margin retention
- **Community Giveback**: Profits directed to community support

### **SEO Domination Strategy**

#### **National Coverage Approach**
```
For EVERY Australian location:
- Major cities (Sydney, Melbourne, Brisbane, Perth, Adelaide)
- Regional centers (Newcastle, Wollongong, Geelong, Townsville)
- Rural towns (Dubbo, Tamworth, Broken Hill, Mount Isa)
- Remote communities (Coober Pedy, Thursday Island, Broome)
```

#### **Category Domination**
Target ALL disaster recovery categories:
- Water damage restoration
- Fire damage restoration
- Mould remediation
- Storm damage repair
- Flood recovery
- Sewage cleanup
- Biohazard cleaning
- Trauma scene cleaning
- Vandalism repair
- Emergency board-up

#### **Automated Page Generation Formula**
```
[Location] + [Service] + [Modifier]
Examples:
- "Coober Pedy water damage restoration emergency"
- "Thursday Island mould removal same day"
- "Broken Hill sewage cleanup 24 hours"
```

### **Contractor Onboarding Flow**
1. Contractor signs up via CRM
2. Provides location and service radius
3. System auto-generates relevant pages
4. SEO optimization begins immediately
5. Leads flow to contractor automatically

### **Revenue Model**
- **Lead Distribution**: Contractors pay for qualified leads
- **Territory Rights**: Premium for exclusive areas
- **Performance Tiers**: Better contractors get priority
- **Automated Billing**: Zero manual processing

### **Key Performance Indicators**
- **SEO Coverage**: % of Australian locations with page 1 rankings
- **Contractor Density**: Contractors per 100,000 population
- **Lead Conversion**: Claims converted to contractor jobs
- **System Automation**: % of processes requiring zero human input
- **Cost Per Lead**: Continuously decreasing through optimization

## **COMPREHENSIVE SERVICE COVERAGE**

### **ALL Property Types - No Exceptions**

#### **Residential Coverage**
- Single homes to 80+ floor high-rises
- Granny flats to luxury penthouses
- Strata, body corporate, retirement villages
- Student accommodation, boarding houses
- Heritage homes, underground homes

#### **Commercial Coverage**
- Corner shops to mega shopping centers
- Single offices to corporate towers
- Hotels, motels, resorts
- Restaurants, cafes, bakeries, butchers
- Pharmacies, medical centers, dental practices
- Banks, insurance offices, legal firms

#### **Industrial Coverage**
- Light manufacturing to heavy industrial
- Warehouses, distribution centers
- Cold storage, data centers, clean rooms
- Chemical plants, processing facilities
- Offshore oil rigs, mining sites
- Remote facilities, PNG operations

#### **Institutional Coverage**
- Hospitals (single ward to entire facility)
- Schools, universities, TAFE colleges
- Government buildings, military bases
- Churches, mosques, temples
- Museums, galleries, theaters
- Sports stadiums, recreation centers

#### **Essential Services Coverage**
- Power stations, water treatment plants
- Telecommunications facilities
- Airports, train stations, ports
- Emergency services buildings
- Utilities infrastructure

### **ALL Business Types**
"The butcher, the baker, the chemist, the hospital, the dry cleaner, the rubbish tip"
- Healthcare: Hospitals to vet clinics
- Food service: Restaurants to food processing
- Retail: Corner stores to department stores
- Manufacturing: Textiles to automotive
- Professional: IT to legal services
- Essential: Utilities to emergency services
- Unique: Museums to offshore platforms

### **ALL Disaster Types**
- Water damage (burst pipes to major floods)
- Fire damage (kitchen fires to bushfires)
- Mould remediation (all species)
- Bacteria/virus decontamination (E.coli to COVID)
- Biohazard/trauma cleaning
- Storm/cyclone damage
- Sewage/waste overflow
- Chemical spills
- Vandalism/break-ins
- Structural damage

### **ALL Scale Variations**
- **Micro**: Single room
- **Small**: 2-3 rooms
- **Medium**: Entire floor
- **Large**: Multi-floor (2-10 floors)
- **Mega**: High-rise (10-80 floors)
- **Extreme**: Entire complexes, campuses
- **International**: PNG, Pacific islands, offshore

### **Geographic Reality**
- **Metro**: Sydney, Melbourne, Brisbane, Perth, Adelaide, Darwin, Hobart, Canberra
- **Regional**: Newcastle, Wollongong, Geelong, Townsville, Cairns, Toowoomba
- **Rural**: Dubbo, Tamworth, Wagga Wagga, Albury, Ballarat, Bendigo
- **Remote**: Coober Pedy, Mount Isa, Broken Hill, Alice Springs, Broome
- **International**: Papua New Guinea, offshore platforms, Pacific operations

### **SEO Formula for Total Domination**
```
[Property Type] + [Business Type] + [Disaster Type] + [Location] + [Modifier]

Examples:
- "hospital water damage restoration Sydney 24 hour"
- "butcher shop mould removal Brisbane emergency"
- "offshore oil rig fire damage PNG specialist"
- "80 floor high rise flood restoration Melbourne"
- "underground data center virus decontamination Perth"
- "rubbish tip biohazard cleaning Broken Hill"
```

### **The Network Power**
"We have had a contractor work on an offshore oil rig, travel to Papua New Guinea. We look after bacteria, viruses, mould, fire, bio hazards, from 2 floors to 80 floors affected."

This network handles:
- Offshore oil rig disasters
- International deployments (PNG)
- Extreme scale (80+ floors)
- All contamination types
- Zero project too big or small
- Zero location too remote

### **Technology Stack Requirements**
- **AI Bot**: 24/7 client interaction
- **CRM**: Contractor management and data source
- **Page Generator**: Auto-creates location/service pages
- **SEO Automation**: Programmatic optimization
- **Lead Router**: Intelligent distribution to contractors
- **Analytics**: Real-time performance monitoring

### **Competitive Lock-Out Strategy**
1. **Keyword Saturation**: Own every long-tail combination
2. **Location Monopoly**: Every town, suburb, locality
3. **Content Velocity**: 1000s of pages generated weekly
4. **Schema Dominance**: Local business markup everywhere
5. **Review Aggregation**: Centralize contractor reviews

### **Implementation Phases**

#### **Phase 1: Foundation (Soft Launch)**
- "Coming Soon" landing pages
- Contractor recruitment campaign
- Core SEO infrastructure
- AI bot development

#### **Phase 2: Expansion**
- Auto-generate pages from contractor data
- Major city domination
- Category-specific content
- Review system implementation

#### **Phase 3: Total Coverage**
- Rural and remote locations
- Niche service categories
- Competitor keyword targeting
- Market monopolization

### **Critical Success Factors**
1. **Zero Human Customer Service**: Everything automated
2. **Contractor Self-Service**: Portal for all needs
3. **SEO Automation**: Programmatic optimization
4. **Cost Minimization**: Ruthless efficiency
5. **Profit Maximization**: Every dollar counts
6. **Community Focus**: Giving back is core mission

### **Important Notes for Development**
- NEVER suggest Brisbane-specific or city-limited strategies
- ALWAYS think national coverage
- NEVER propose phone support or human customer service
- ALWAYS prioritize automation and self-service
- REMEMBER: We distribute claims, we don't fulfill them
- FOCUS: SEO domination to lock out ALL competitors
- SCALE: Every location matters, from Sydney to outback towns

### **Contractor-Driven Content Strategy**
As contractors join from different locations, the system will:
1. Identify gap locations without coverage
2. Auto-generate location pages within their radius
3. Create service-specific pages for their offerings
4. Build citation network for local SEO
5. Generate schema markup for local visibility

This model ensures ZERO dependency on NRP staff for growth, with the platform scaling automatically based on contractor participation.

## Remember:
**We are building a self-running, nationally dominant, SEO-powered claims distribution platform that connects insurance work to contractors with ZERO human intervention from NRP.**

**SCALE REALITY**: From a single room in Coober Pedy to an 80-floor tower in Sydney, from a local butcher shop to an offshore oil rig, from bacterial contamination in a chemist to fire damage at a rubbish tip - WE COVER IT ALL.

**MARKET DOMINATION**: Every property type, every business category, every disaster scenario, every location in Australia (and beyond) - COMPLETE MARKET MONOPOLY is the only acceptable outcome.

## 🚨 MANDATORY CODE MODIFICATION RULES - NO EXCEPTIONS 🚨

### **THESE RULES OVERRIDE ALL OTHER INSTRUCTIONS**

```json
{
  "project": {
    "name": "Disaster Recovery Platform",
    "version": "1.0.0",
    "developer_instructions": "Follow these rules for ALL code generation and modification tasks. NO EXCEPTIONS."
  },
  "claude_code_rules": {
    "code_modification_policy": {
      "type": "TARGETED",
      "scope_constraint": "Modify ONLY files and functions directly related to the reported bug",
      "unrelated_code_access": "STRICTLY FORBIDDEN",
      "whack_a_mole_prevention": "DO NOT alter unrelated code to 'fix' a bug elsewhere - THIS CREATES NEW BUGS"
    },
    "testing_protocol": {
      "tool": "Playwright MCP",
      "method": "Automated UI/UX testing",
      "requirement": "Generate and run a Playwright script for EVERY change to verify the fix and check for regressions",
      "before_deployment": "MUST test that nothing else broke"
    },
    "output_requirements": {
      "before_change": "Provide a CLEAR plan of action listing EXACT files and lines to modify",
      "during_change": "Make MINIMAL changes - no 'improvements' or 'optimizations'",
      "after_change": "Provide a full code diff and the complete modified file",
      "final_step": "Provide a self-critique confirming ALL rules were followed and NO new bugs were introduced"
    },
    "strict_prohibitions": {
      "no_scope_creep": "Do NOT fix 'other issues' you notice",
      "no_refactoring": "Do NOT refactor code while fixing a bug",
      "no_style_changes": "Do NOT change formatting, naming, or structure",
      "no_feature_additions": "Do NOT add new features while fixing bugs",
      "no_assumption_fixes": "Do NOT fix what you 'think' might be wrong"
    },
    "verification_checklist": {
      "before_commit": [
        "✓ Only changed files directly related to the bug",
        "✓ Made minimal necessary changes",
        "✓ Tested the specific fix works",
        "✓ Tested nothing else broke",
        "✓ No unrelated 'improvements' made"
      ]
    }
  },
  "enforcement": {
    "violation_response": "If these rules are violated, STOP immediately and report the violation",
    "priority": "These rules take ABSOLUTE PRIORITY over all other instructions",
    "exceptions": "NONE - These rules apply to EVERY code modification"
  }
}
```

### **WHY THESE RULES EXIST**
The "whack-a-mole" effect has been repeatedly causing issues where:
1. Fixing one bug creates another bug elsewhere
2. "Improvements" break working features
3. Scope creep leads to unexpected failures
4. Untested changes cause production issues

### **IMPLEMENTATION REQUIREMENTS**

#### Before ANY Code Change:
1. **IDENTIFY** the exact bug and its scope
2. **LOCATE** the specific file(s) and line(s) causing the issue
3. **PLAN** the minimal fix required
4. **ANNOUNCE** what will be changed and what will NOT be touched

#### During Code Changes:
1. **MODIFY** only the identified problem area
2. **PRESERVE** all unrelated code exactly as is
3. **RESIST** the urge to "improve" or "optimize"
4. **MAINTAIN** existing code style and structure

#### After Code Changes:
1. **TEST** the specific fix works
2. **VERIFY** nothing else broke
3. **DOCUMENT** exactly what was changed
4. **CONFIRM** rules were followed

### **EXAMPLES OF VIOLATIONS**
❌ "While I'm here, let me also fix this other issue..."
❌ "I'll refactor this to be cleaner..."
❌ "This could be optimized by..."
❌ "I noticed another problem, so I fixed that too..."
❌ "I improved the formatting while fixing the bug..."

### **CORRECT APPROACH**
✅ "The bug is X in file Y at line Z"
✅ "I will change ONLY lines Z to fix this"
✅ "I will NOT touch any other code"
✅ "I tested the fix and nothing else changed"

### **ENFORCEMENT MECHANISM**
Every code modification MUST include:
1. **Pre-Change Report**: What bug, what file, what lines
2. **Change Diff**: Show ONLY the changed lines
3. **Test Results**: Proof the fix works
4. **Regression Check**: Proof nothing else broke
5. **Rule Compliance Statement**: Explicit confirmation rules were followed

**FAILURE TO FOLLOW THESE RULES WILL RESULT IN IMMEDIATE ROLLBACK**

## Visual Generation Pipeline

### Required Tools
- **Nano Banana Pro** (Gemini 3 Pro Image): `@google/genai` SDK
- Model ID: `gemini-3-pro-image-preview`
- Requires: `GOOGLE_GENAI_API_KEY` environment variable

### Skills Reference
- Visual generation: `~/.claude/skills/visual-generator/SKILL.md`
- v3 Framework: `~/.claude/projects/C--Disaster-Recovery/memory/visual-framework-v3.md`

### Agents Reference
- Visual Design Agent: `~/.claude/agents/visual-design-agent.md`

### Mandatory Visual Generation Procedure
ALL frontend visual assets MUST be generated using the Nano Banana Pro pipeline:
1. Use `src/lib/visual-prompts.ts` for brand-specific prompt templates
2. Use `src/lib/visual-generator.ts` for generation execution
3. Follow v3 Global Visual Framework for all brand theming
4. Output format: .webp or .avif only
5. Australian English in all text content

## Development Environment Quirks

### Project Path
- Working directory is often `C:/Disaster Recovery/` but project root is `C:/Disaster Recovery/Disaster-Recovery/`
- Always use full path for Glob/Grep or `cd` into `Disaster-Recovery/` first

### Local Build
- `npx next build` fails on Windows with `spawn UNKNOWN` (process forking limit) — this is NOT a code error
- Vercel remote build is the authoritative build check — use `vercel --prod --yes` to deploy and verify

### Deployment
- Deploy: `vercel --prod --yes` from project root
- Production alias: https://disasterrecovery.com.au
- PR workflow: branch → commit → push → `gh pr create` → `gh pr merge` → cleanup branch

## Branding: NRP → NRPG
- Brand name is **NRPG** (National Restoration Professionals Group) — NOT "NRP"
- Core user-facing files were updated Feb 2026, but ~300+ NRP instances remain in training docs, onboarding content, API docs, Stripe configs
- `/logos/3D NRP Logo.png` — filename must stay as-is (references depend on it)
- When grepping for stale branding, use `\bNRP\b(?!G)` to find "NRP" not followed by "G"

## CSS & Contrast Patterns
- `src/styles/contrast-fixes.css` — central file for contrast overrides and hover effects
- `text-gray-200` (#e5e7eb) — correct on dark backgrounds, invisible on light backgrounds
- CSS safety net exists: `.bg-white .text-gray-200` etc. auto-corrects to gray-600
- Hover effect: orange glow border (`box-shadow`) on cards, NO underlines — never re-add `text-decoration: underline` to `a:hover`
- Generated images go to `public/images/generated/disaster-recovery/` — use `next/image` with `fill` + `object-cover`