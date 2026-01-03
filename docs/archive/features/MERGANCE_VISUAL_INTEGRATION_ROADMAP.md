# Mergance Visual Integration Roadmap
**Safe, Systematic Integration of DR + NRPG**
**Date**: 2025-12-30
**Branch**: Mergance
**Goal**: Zero data loss, smooth transition, enhanced unified platform

---

## 🎯 VISUAL OVERVIEW

```
┌─────────────────────────────────────────────────────────────────────────┐
│                    CURRENT STATE (2 SEPARATE REPOS)                     │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│  ┌──────────────────────────────┐      ┌──────────────────────────────┐ │
│  │  DR-New (Client Site)        │      │  NRPG (Contractor Portal)    │ │
│  │  ────────────────────────    │      │  ─────────────────────────   │ │
│  │  • disasterrecovery.com.au   │      │  • Built this session        │ │
│  │  • Live production site      │      │  • 26 commits                │ │
│  │  • Dramatic hero images      │      │  • 202+ fixes                │ │
│  │  • Location-focused          │      │  • 24 AI images              │ │
│  │  • "30+ Years Experience"    │      │  • 40 SEO pages              │ │
│  │  • Services/Insurance/Locs   │      │  • Dropdown navigation       │ │
│  │  • Phone: 1300 309 361       │      │  • Australian English        │ │
│  │  • Next.js 14                │      │  • ACCC compliant            │ │
│  └──────────────────────────────┘      └──────────────────────────────┘ │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘

                                    ↓
                          [INTEGRATION PROCESS]
                                    ↓

┌─────────────────────────────────────────────────────────────────────────┐
│                   TARGET STATE (UNIFIED PLATFORM)                        │
├─────────────────────────────────────────────────────────────────────────┤
│                                                                           │
│                  ┌────────────────────────────────────┐                  │
│                  │  disasterrecovery.com.au           │                  │
│                  │  ────────────────────────────────  │                  │
│                  │                                    │                  │
│                  │  PUBLIC SITE (Customers)          │                  │
│                  │  • DR design + NRPG improvements  │                  │
│                  │  • 202+ fact-check fixes          │                  │
│                  │  • 24 AI images added             │                  │
│                  │  • 40 SEO pillar pages added      │                  │
│                  │  • Australian English             │                  │
│                  │  • Social media integrated        │                  │
│                  │  • Schema.org data                │                  │
│                  │                                    │                  │
│                  │  CONTRACTOR PORTAL (Gated)        │                  │
│                  │  • /contractor/login              │                  │
│                  │  • /contractor/portal (NRPG)      │                  │
│                  │  • Full dashboard features        │                  │
│                  │  • Authentication required        │                  │
│                  └────────────────────────────────────┘                  │
│                                                                           │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## 📋 DETAILED INTEGRATION WORKFLOW

### **PHASE 1: SAFETY & PREPARATION** (1 hour)
**Goal**: Ensure zero data loss, create rollback points

```
┌─────────────────────────────────────────────────────────────────┐
│ STEP 1.1: Create Safety Checkpoints                             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Actions:                                                        │
│  ✅ Create Mergance branch in NRPG repo (DONE)                  │
│  ⏸️ Clone DR-New repo to separate directory (DONE)              │
│  ⏸️ Create backup branch in DR-New: "pre-mergance-backup"       │
│  ⏸️ Document current state of both repos                         │
│                                                                  │
│  Safety Measures:                                                │
│  🔒 Never delete original repos                                 │
│  🔒 Always work on branches (never main initially)              │
│  🔒 Create git tags before each major change                    │
│  🔒 Test locally before any production push                     │
│                                                                  │
│  Agents Used: None (manual git operations)                      │
│  Time: 15 minutes                                                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ STEP 1.2: Analyze Both Repos                                    │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🤖 Agent: general-purpose (Explore mode)                       │
│  Task: "Analyze DR-New repo structure and content"              │
│                                                                  │
│  What Agent Does:                                                │
│  • Read all DR-New pages (homepage, services, about, etc.)      │
│  • Identify content that needs fact-checking                    │
│  • Map current DR structure                                     │
│  • Document all existing features                               │
│  • Compare with NRPG improvements                               │
│  • Create detailed content audit                                │
│                                                                  │
│  Output: DR_CONTENT_AUDIT.md (what exists, what needs fixing)   │
│  Time: 30 minutes                                                │
│  Risk: NONE (read-only analysis)                                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ STEP 1.3: Create Integration Blueprint                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🤖 Agent: Plan Agent                                            │
│  Task: "Design integration strategy for DR + NRPG merge"        │
│                                                                  │
│  What Agent Does:                                                │
│  • Review DR content audit                                       │
│  • Review NRPG improvements list                                │
│  • Design file-by-file integration plan                         │
│  • Identify potential conflicts                                 │
│  • Plan contractor portal architecture                          │
│  • Design authentication flow                                   │
│  • Create step-by-step implementation guide                     │
│                                                                  │
│  Output: INTEGRATION_BLUEPRINT.md (detailed step-by-step plan)  │
│  Time: 30 minutes                                                │
│  Risk: NONE (planning only)                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

### **PHASE 2: CONTENT MIGRATION** (2-3 hours)
**Goal**: Transfer all NRPG improvements to DR structure safely

```
┌─────────────────────────────────────────────────────────────────┐
│ STEP 2.1: Fact-Checking Transfer (Highest Priority)             │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🤖 Orchestrator: Multi-Agent Fact-Checking Transfer             │
│                                                                  │
│  Agent 1: Fact-Checker Skill                                     │
│  • Scan DR-New for all errors we fixed in NRPG                  │
│  • Check for fake testimonials                                  │
│  • Check for fabricated statistics                              │
│  • Check IICRC standard references                              │
│  • Check phone numbers                                          │
│  • Output: DR_ERRORS_FOUND.md                                   │
│                                                                  │
│  Agent 2: IICRC Validator Skill                                  │
│  • Verify all IICRC standards in DR content                     │
│  • Check S520 not used for fire (our key fix!)                 │
│  • Verify FSRT for fire/smoke                                   │
│  • Output: DR_IICRC_AUDIT.md                                    │
│                                                                  │
│  Agent 3: Australian Business Validator Skill                    │
│  • Check all "mold" → should be "mould"                         │
│  • Verify phone number format                                   │
│  • Check Australian English throughout                          │
│  • Output: DR_AUSTRALIAN_ENGLISH_AUDIT.md                       │
│                                                                  │
│  Safety Measures:                                                │
│  🔒 Create "dr-factcheck-backup" git tag before changes         │
│  🔒 Apply fixes one file at a time                              │
│  🔒 Commit after each fix batch (10-20 files)                   │
│  🔒 Never modify original DR-New repo (work on copy)            │
│                                                                  │
│  Time: 1-1.5 hours (agents work in parallel)                    │
│  Risk: LOW (we have backup branch + git tags)                   │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ STEP 2.2: Asset Integration (Images)                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🤖 Agent: general-purpose                                       │
│  Task: "Copy 24 AI images to DR public/images directory"        │
│                                                                  │
│  Process:                                                        │
│  1. Copy from: /d/Disaster Recovery - NRP/public/images/        │
│  2. Copy to: /d/DR-New/public/images/                           │
│  3. Organize by category:                                       │
│     - scenarios/ (3 × 4K)                                        │
│     - services/ (4 × 2K)                                         │
│     - sectors/ (4 × 2K)                                          │
│     - locations/ (8 × 2K)                                        │
│     - marketing/ (5 × 2K)                                        │
│  4. Verify all images copied correctly                          │
│  5. Update image references in components                       │
│                                                                  │
│  Safety Measures:                                                │
│  🔒 Keep DR's existing images (don't delete anything)           │
│  🔒 Add NRPG images to new directories                          │
│  🔒 Verify file sizes match originals                           │
│  🔒 Create "dr-images-added" git tag after copy                 │
│                                                                  │
│  Time: 20 minutes                                                │
│  Risk: NONE (only adding files, not modifying existing)         │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ STEP 2.3: SEO Pages Integration                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🤖 Agent: general-purpose                                       │
│  Task: "Integrate 40 pillar/sub-pillar SEO pages into DR"       │
│                                                                  │
│  Process:                                                        │
│  1. Copy pillar page directories from NRPG:                     │
│     - /services/water-damage/                                   │
│     - /services/fire-smoke-damage/                              │
│     - /services/mould-remediation/                              │
│     - /services/biohazard-cleanup/                              │
│     - /services/storm-damage/                                   │
│                                                                  │
│  2. Check for conflicts with existing DR services               │
│  3. Merge or replace based on blueprint                         │
│  4. Update internal links                                       │
│  5. Verify all pages accessible                                 │
│                                                                  │
│  Safety Measures:                                                │
│  🔒 Check existing DR /services/ structure first                │
│  🔒 If conflict, create hybrid (keep DR design, NRPG content)   │
│  🔒 Test all links after integration                            │
│  🔒 Create "dr-seo-pages-added" git tag                         │
│                                                                  │
│  Time: 30 minutes                                                │
│  Risk: LOW (mostly additive, not replacing)                     │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ STEP 2.4: Metadata & Schema Enhancement                         │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Manual Operation (Low complexity)                               │
│  Task: Add NRPG's enhanced metadata to DR layout.tsx            │
│                                                                  │
│  Changes:                                                        │
│  • Add schema.org Organization data                             │
│  • Add social media profiles (sameAs)                           │
│  • Add contact point schema                                     │
│  • Keep DR's existing metadata                                  │
│  • Enhance with NRPG improvements                               │
│                                                                  │
│  Safety Measures:                                                │
│  🔒 Copy DR's current layout.tsx to layout.tsx.backup           │
│  🔒 Add NRPG schema without removing DR metadata                │
│  🔒 Test schema with Google Rich Results Test                   │
│  🔒 Create "dr-schema-added" git tag                            │
│                                                                  │
│  Time: 15 minutes                                                │
│  Risk: NONE (additive only)                                     │
└─────────────────────────────────────────────────────────────────┘
```

---

### **PHASE 3: CONTRACTOR PORTAL INTEGRATION** (2 hours)
**Goal**: Add NRPG as gated contractor section in DR

```
┌─────────────────────────────────────────────────────────────────┐
│ STEP 3.1: Create Contractor Routes Architecture                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🤖 Agent: backend-development:backend-architect                 │
│  Task: "Design contractor portal architecture in DR"            │
│                                                                  │
│  What Agent Designs:                                             │
│  • Route structure: /contractor/*                               │
│  • Authentication flow (NextAuth)                               │
│  • Public routes: /contractor/login, /contractor/join           │
│  • Private routes: /contractor/portal/* (gated)                 │
│  • API routes: /api/contractor/auth/*                           │
│  • Session management                                           │
│  • Role-based access control (CONTRACTOR, ADMIN)                │
│                                                                  │
│  Output: CONTRACTOR_PORTAL_ARCHITECTURE.md                       │
│  Time: 30 minutes                                                │
│  Risk: NONE (architecture design only)                          │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ STEP 3.2: Implement Contractor Login                            │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🤖 Agent: frontend-mobile-development:frontend-developer        │
│  Task: "Create contractor login page in DR site"                │
│                                                                  │
│  What Agent Builds:                                              │
│  • /contractor/login page                                       │
│  • Login form (email + password)                                │
│  • "Contractor Portal" button in DR header                      │
│  • NextAuth integration                                         │
│  • Session handling                                             │
│  • Redirect to /contractor/portal after auth                    │
│                                                                  │
│  Safety Measures:                                                │
│  🔒 Create new routes (don't modify existing DR pages)          │
│  🔒 Test authentication locally first                           │
│  🔒 Create "dr-contractor-login-added" git tag                  │
│                                                                  │
│  Time: 45 minutes                                                │
│  Risk: LOW (new routes, isolated from existing site)            │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ STEP 3.3: Integrate NRPG Portal Dashboard                       │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🤖 Agent: general-purpose                                       │
│  Task: "Copy NRPG dashboard to DR /contractor/portal/*"         │
│                                                                  │
│  Process:                                                        │
│  1. Copy NRPG dashboard components to DR:                       │
│     From: /app/dashboard/contractor/*                           │
│     To: /app/contractor/portal/*                                │
│                                                                  │
│  2. Copy NRPG API routes:                                        │
│     From: /app/api/*                                            │
│     To: /app/api/* (merge with DR APIs)                         │
│                                                                  │
│  3. Add authentication middleware                               │
│  4. Gate all /contractor/portal/* routes                        │
│  5. Test dashboard loads after login                            │
│                                                                  │
│  Safety Measures:                                                │
│  🔒 Copy files, don't move (preserve NRPG repo)                 │
│  🔒 Check for route conflicts before copying                    │
│  🔒 Test each dashboard page after copy                         │
│  🔒 Create "dr-nrpg-portal-added" git tag                       │
│                                                                  │
│  Time: 45 minutes                                                │
│  Risk: MEDIUM (many files, need conflict resolution)            │
│  Mitigation: Agent checks conflicts, we review before merge     │
└─────────────────────────────────────────────────────────────────┘
```

---

### **PHASE 4: TESTING & VALIDATION** (1 hour)
**Goal**: Ensure everything works perfectly before production

```
┌─────────────────────────────────────────────────────────────────┐
│ STEP 4.1: Local Testing - Public Site                           │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Manual + Agent Verification                                     │
│                                                                  │
│  Test Checklist:                                                 │
│  ✅ Homepage loads with DR design                               │
│  ✅ All DR existing pages still work                            │
│  ✅ Services dropdown shows pillar pages                        │
│  ✅ All 40 pillar pages load                                    │
│  ✅ Images display (DR + NRPG both)                             │
│  ✅ Phone: 1300 309 361 everywhere                              │
│  ✅ Australian English (mould not mold)                         │
│  ✅ No broken links                                             │
│  ✅ Social media icons in footer                                │
│                                                                  │
│  🤖 Agent: general-purpose                                       │
│  Task: "Test all public pages and report any errors"            │
│                                                                  │
│  Safety: Test locally, fix issues before deploying              │
│  Time: 30 minutes                                                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ STEP 4.2: Local Testing - Contractor Portal                     │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Manual + Agent Testing                                          │
│                                                                  │
│  Test Flow:                                                      │
│  1. Click "Contractor Portal" in header                         │
│  2. Should redirect to /contractor/login                        │
│  3. Enter test credentials                                      │
│  4. Should authenticate and redirect to /contractor/portal      │
│  5. NRPG dashboard should load                                  │
│  6. All dashboard features should work                          │
│  7. Logout should return to public site                         │
│                                                                  │
│  Create Test User:                                               │
│  • Email: test@contractor.com                                   │
│  • Role: CONTRACTOR                                             │
│  • Can access portal, not admin features                        │
│                                                                  │
│  Safety: Test authentication thoroughly locally                 │
│  Time: 30 minutes                                                │
└─────────────────────────────────────────────────────────────────┘
```

---

### **PHASE 5: DEPLOYMENT** (1 hour)
**Goal**: Deploy unified platform to production safely

```
┌─────────────────────────────────────────────────────────────────┐
│ STEP 5.1: Pre-Deployment Checks                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Automated Checklist:                                            │
│  ✅ All tests passing locally                                   │
│  ✅ No console errors                                           │
│  ✅ Build succeeds (npm run build)                              │
│  ✅ All images present                                          │
│  ✅ All routes working                                          │
│  ✅ Authentication working                                      │
│  ✅ Database migrations ready (if needed)                       │
│                                                                  │
│  Safety Gate: Manual approval required before deploy            │
│  Time: 15 minutes                                                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ STEP 5.2: Staging Deployment (Recommended)                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Deploy to Vercel Staging First:                                │
│  • Create preview deployment                                    │
│  • Test on staging URL                                          │
│  • Verify everything works                                      │
│  • Get approval                                                 │
│                                                                  │
│  Safety: Don't touch production until staging verified          │
│  Time: 15 minutes                                                │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ STEP 5.3: Production Deployment                                 │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Deployment Strategy:                                            │
│  1. Push Mergance branch to DR-New repo                         │
│  2. Create PR: Mergance → main                                  │
│  3. Review all changes in PR                                    │
│  4. Merge to main (after approval)                              │
│  5. Vercel auto-deploys to disasterrecovery.com.au              │
│                                                                  │
│  Rollback Plan:                                                  │
│  🔒 Keep pre-mergance-backup branch                             │
│  🔒 If issues: revert commit, redeploy old version              │
│  🔒 Vercel keeps all deployment history                         │
│  🔒 Can roll back instantly in Vercel dashboard                 │
│                                                                  │
│  Time: 15 minutes                                                │
│  Risk: LOW (we have rollback plan)                              │
└─────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────┐
│ STEP 5.4: Post-Deployment Verification                          │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  🤖 Agent: general-purpose                                       │
│  Task: "Verify all pages working on disasterrecovery.com.au"    │
│                                                                  │
│  Verification Checklist:                                         │
│  ✅ Homepage loads correctly                                    │
│  ✅ All existing DR pages still work                            │
│  ✅ New pillar pages accessible                                 │
│  ✅ Images display correctly                                    │
│  ✅ Contractor portal login works                               │
│  ✅ Authenticated access to NRPG works                          │
│  ✅ No 404 errors                                               │
│  ✅ No console errors                                           │
│  ✅ Mobile responsive                                           │
│                                                                  │
│  Time: 15 minutes                                                │
└─────────────────────────────────────────────────────────────────┘
```

---

## 🛡️ DATA CORRUPTION PREVENTION

### **Multiple Safety Layers**:

```
┌──────────────────────────────────────────────────────────────┐
│ LAYER 1: Git Version Control                                 │
├──────────────────────────────────────────────────────────────┤
│ • All work on Mergance branch (not main)                     │
│ • Create git tags before each major step                     │
│ • Frequent commits (every 10-20 file changes)                │
│ • Can revert any commit instantly                            │
│ • Original repos never modified                              │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ LAYER 2: Backup Branches                                     │
├──────────────────────────────────────────────────────────────┤
│ • pre-mergance-backup (DR-New before any changes)            │
│ • Original NRPG repo preserved                               │
│ • Can compare at any time                                    │
│ • Can cherry-pick specific fixes if needed                   │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ LAYER 3: Incremental Integration                             │
├──────────────────────────────────────────────────────────────┤
│ • Never bulk replace (too risky)                             │
│ • Integrate one category at a time                           │
│ • Test after each integration step                           │
│ • Commit after each successful step                          │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ LAYER 4: Agent Oversight                                     │
├──────────────────────────────────────────────────────────────┤
│ • Agents flag conflicts before applying changes              │
│ • Human review for any conflicts                             │
│ • Agents provide diff previews                               │
│ • No automatic overwrites without approval                   │
└──────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────┐
│ LAYER 5: Vercel Deployment Safety                            │
├──────────────────────────────────────────────────────────────┤
│ • Staging deployment first (not production)                  │
│ • Preview URLs for testing                                   │
│ • Vercel keeps all deployment history                        │
│ • Instant rollback if issues                                 │
│ • Production deployment only after staging verified          │
└──────────────────────────────────────────────────────────────┘
```

---

## 🤖 AGENTS & SKILLS ORCHESTRATION

### **Integration Orchestrator Workflow**:

```
                          [ORCHESTRATOR]
                         Claude Code (You)
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
   [AGENT 1]              [AGENT 2]              [AGENT 3]
 Fact-Checker           Explore Agent          Plan Agent
 (parallel)             (parallel)             (sequential)
        │                       │                       │
        │                       │                       │
   Scan DR for            Analyze DR              Design
   errors we              structure            Integration
   fixed                                       Blueprint
        │                       │                       │
        └───────────────────────┴───────────────────────┘
                                │
                                ▼
                    [INTEGRATION BEGINS]
                                │
        ┌───────────────────────┼───────────────────────┐
        │                       │                       │
        ▼                       ▼                       ▼
   [AGENT 4]              [AGENT 5]              [AGENT 6]
  Content                 Asset                Backend
  Migrator                Copier               Architect
        │                       │                       │
        │                       │                       │
   Apply all              Copy 24             Design
   202 fixes              AI images           Contractor
   to DR                  to DR               Portal
        │                       │                       │
        └───────────────────────┴───────────────────────┘
                                │
                                ▼
                      [VALIDATION PHASE]
                                │
                                ▼
                         [AGENT 7]
                    Verification Agent
                                │
                    Test all pages
                    Report issues
                                │
                                ▼
                      [DEPLOYMENT READY]
```

---

## 📊 AGENT ASSIGNMENT MATRIX

| Phase | Task | Agent/Skill | Purpose | Risk | Duration |
|-------|------|-------------|---------|------|----------|
| **1.2** | Analyze DR | Explore Agent | Map structure | NONE | 30m |
| **1.3** | Blueprint | Plan Agent | Design strategy | NONE | 30m |
| **2.1** | Fact-check | Fact-Checker Skill | Transfer fixes | LOW | 1h |
| **2.1** | IICRC | IICRC Validator | Check standards | LOW | 30m |
| **2.1** | AU English | AU Business Validator | Check spelling | LOW | 30m |
| **2.2** | Images | General-Purpose | Copy assets | NONE | 20m |
| **2.3** | SEO Pages | General-Purpose | Copy pillar pages | LOW | 30m |
| **3.1** | Architecture | Backend Architect | Design portal | NONE | 30m |
| **3.2** | Login | Frontend Developer | Build login | LOW | 45m |
| **3.3** | Portal | General-Purpose | Integrate NRPG | MED | 45m |
| **4.1** | Test Public | General-Purpose | Verify pages | NONE | 30m |
| **4.2** | Test Portal | General-Purpose | Test auth | LOW | 30m |
| **5.4** | Verify Prod | General-Purpose | Final check | NONE | 15m |

**Total Agent Time**: ~7 hours
**With Parallelization**: ~4 hours (multiple agents work simultaneously)

---

## 🎯 CONFLICT RESOLUTION STRATEGY

### **If File Conflicts Occur**:

```
┌─────────────────────────────────────────────────────────────────┐
│ CONFLICT DETECTED: Same file in both repos                      │
├─────────────────────────────────────────────────────────────────┤
│                                                                  │
│  Option 1: KEEP DR VERSION (Preserves existing design)          │
│  • Use when: DR has established design/content                  │
│  • Apply: Only NRPG's fact-check fixes to DR file              │
│  • Example: Homepage (keep DR hero, fix any errors)            │
│                                                                  │
│  Option 2: KEEP NRPG VERSION (Use improved version)             │
│  • Use when: NRPG version is significantly better              │
│  • Apply: Replace DR file with NRPG version                    │
│  • Example: Services page with pillar architecture             │
│                                                                  │
│  Option 3: HYBRID MERGE (Best of both)                          │
│  • Use when: Both have valuable content                        │
│  • Apply: Manually merge best elements                         │
│  • Example: Combine DR design + NRPG content                   │
│                                                                  │
│  Process:                                                        │
│  1. Agent flags conflict                                        │
│  2. Shows diff (what's different)                               │
│  3. Recommends approach (Option 1, 2, or 3)                    │
│  4. Human approves recommendation                               │
│  5. Agent applies merge                                         │
│  6. Commit with clear message                                   │
│                                                                  │
└─────────────────────────────────────────────────────────────────┘
```

---

## ✅ SUCCESS CRITERIA

**Integration Complete When**:

```
PUBLIC SITE (disasterrecovery.com.au):
✅ All DR pages working (existing functionality preserved)
✅ DR design maintained (dramatic images, branding)
✅ All NRPG improvements applied:
   • 202+ fact-check fixes
   • Australian English (mould)
   • Enhanced SEO (40 pillar pages)
   • Social media links
   • Schema.org data
✅ No broken links or images
✅ Mobile responsive
✅ Fast load times

CONTRACTOR PORTAL (/contractor/*):
✅ "Contractor Portal" button in header
✅ /contractor/login page works
✅ Authentication functional
✅ /contractor/portal loads NRPG dashboard (after auth)
✅ All NRPG features accessible
✅ Only contractors can access (gated)

DEPLOYMENT:
✅ Live on disasterrecovery.com.au
✅ SSL working
✅ No deployment errors
✅ All verified on production
```

---

## 🚦 GO/NO-GO DECISION POINTS

**Before Each Phase Proceeds**:

```
CHECKPOINT 1 (After Analysis):
❓ Do we understand DR structure completely?
❓ Have we identified all conflicts?
❓ Is integration blueprint approved?
✅ GO: Blueprint approved
❌ NO-GO: Need more analysis

CHECKPOINT 2 (After Content Migration):
❓ Are all 202+ fixes applied correctly?
❓ Do all pages still work?
❓ Are there any broken links?
✅ GO: All fixes verified working
❌ NO-GO: Fix issues first

CHECKPOINT 3 (After Portal Integration):
❓ Does contractor login work?
❓ Can authenticated users access NRPG?
❓ Are non-contractors blocked from portal?
✅ GO: Authentication working
❌ NO-GO: Fix auth issues

CHECKPOINT 4 (Before Production):
❓ Does staging look perfect?
❓ All tests passing?
❓ Human approval given?
✅ GO: Deploy to production
❌ NO-GO: Fix staging issues
```

---

## 📈 RISK MATRIX

| Task | Risk Level | Mitigation | Rollback Plan |
|------|-----------|------------|---------------|
| Clone repos | NONE | Read-only | N/A |
| Analysis | NONE | Read-only | N/A |
| Blueprint | NONE | Planning only | N/A |
| Fact-check transfer | LOW | Git tags, commits | Revert commits |
| Image copy | NONE | Additive only | Delete added files |
| SEO pages | LOW | New routes | Delete new routes |
| Contractor portal | MEDIUM | Isolated routes | Delete /contractor/* |
| Authentication | MEDIUM | Test extensively | Disable auth, rollback |
| Staging deploy | LOW | Not production | Just redeploy |
| Production deploy | MEDIUM | Staging first | Vercel instant rollback |

**Overall Risk**: LOW-MEDIUM (with all safety measures in place)

---

## 🎯 RECOMMENDED EXECUTION PLAN

### **Option A: Fully Automated** (Fastest)
- Use orchestrator to manage all agents
- Agents work in parallel where possible
- Human approval at checkpoints only
- Estimated: 4 hours

### **Option B: Semi-Automated** (Safest)
- Use agents for analysis and heavy lifting
- Human reviews each phase before proceeding
- Manual integration of critical sections
- Estimated: 6-7 hours

### **Option C: Phased Rollout** (Most Conservative)
- Phase 1: Fact-checking only (1 week)
- Phase 2: Images and SEO (1 week)
- Phase 3: Contractor portal (1 week)
- Each phase deployed and tested before next
- Estimated: 3 weeks

**My Recommendation**: **Option B** (Semi-Automated)
- Best balance of speed and safety
- Human oversight at key decision points
- Leverages agents for efficiency
- Minimizes risk of data corruption

---

## 🚀 READY TO PROCEED?

**Current Status**:
- ✅ Mergance branch created
- ✅ DR-New repo cloned
- ✅ Integration plan documented
- ⏸️ Awaiting approval to proceed

**Next Step Options**:

1. **START PHASE 1**: Deploy analysis agents now
2. **REVIEW PLAN FIRST**: Discuss approach before starting
3. **PAUSE**: Save for later, resume anytime

**What would you like to do?**

The integration is significant but systematic - we have safety measures at every step to ensure smooth, error-free transition.
