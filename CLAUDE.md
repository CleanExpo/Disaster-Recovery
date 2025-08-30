# CLAUDE.md - Critical Project Context

## ⚠️ CRITICAL ENVIRONMENT CONFIGURATION ⚠️

### **NEVER MODIFY WITHOUT APPROVAL**
- **Production URL**: https://disaster-recovery.vercel.app
- **Staging URL**: https://disaster-recovery-staging.vercel.app
- **FORBIDDEN**: disasterrecovery.com.au (DO NOT USE IN ENV VARIABLES)

### **Environment Variable Requirements**
```bash
# CORRECT Configuration
NEXT_PUBLIC_APP_URL=https://disaster-recovery.vercel.app
NEXTAUTH_URL=https://disaster-recovery.vercel.app

# INCORRECT - NEVER USE
NEXT_PUBLIC_APP_URL=https://disasterrecovery.com.au  # ❌ WRONG
NEXTAUTH_URL=https://www.disasterrecovery.com.au     # ❌ WRONG
```

### **Validation**
- Run `npm run validate-env` before any deployment
- Build process will FAIL if incorrect domains are detected
- Check `.env.example` for correct template

## Business Model Overview

### **CRITICAL: National Distribution Model**
- **Coverage**: AUSTRALIA-WIDE, not just Brisbane or major cities
- **Role**: Claims distributor and SEO dominator, NOT service provider
- **Client Interface**: 100% AI bot or contractor-direct (NO phone calls to NRP)
- **Goal**: Dominate ALL disaster recovery categories across ALL of Australia

### **Strategic Positioning**
1. **NRP is the middleman/distributor** - We connect insurance claims to contractors
2. **Zero direct client service** - All client interaction through AI bots or contractors
3. **SEO monopoly strategy** - Lock out ALL competitors nationwide
4. **Population-agnostic** - Target EVERY location, regardless of size

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