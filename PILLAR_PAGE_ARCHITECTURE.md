# Pillar Page Architecture - NRPG Platform
**Date**: 2025-12-29
**Purpose**: SEO content strategy with pillar pages and sub-pillar clusters
**Status**: 🔄 **NEEDS IMPLEMENTATION**

---

## 🎯 WHAT ARE PILLAR PAGES?

**Pillar Page**: Comprehensive guide on a broad topic (2,000-4,000 words)
- Acts as the authoritative resource
- Links to all related sub-pillar pages
- Ranks for broad keywords

**Sub-Pillar Pages** (Cluster Content): Specific topics under the pillar (800-1,500 words)
- Deep dive into specific aspects
- Link back to pillar page
- Rank for long-tail keywords

**Internal Linking**: Creates topic clusters that boost SEO

---

## 📋 CURRENT STATE ANALYSIS

### What You Have ✅
- Dynamic route templates: `/services/[service-slug]/page.tsx`
- Dynamic location templates: `/locations/[state]/[city]/page.tsx`
- Service data: 16 services defined in `data/services.json`
- Page generator: `lib/content/page-generator.ts`

### What's Missing ❌
- **Main pillar pages** for each service category
- **Sub-pillar pages** for specific use cases
- **Topic cluster architecture**
- **Internal linking strategy between pillars and sub-pillars**
- **Comprehensive pillar content** (currently just templates)

---

## 🏗️ PROPOSED PILLAR PAGE STRUCTURE

### PILLAR 1: Water Damage Restoration
**URL**: `/services/water-damage` (main pillar)
**Target Keywords**: "water damage restoration australia", "water damage repair"

**Sub-Pillar Pages**:
1. `/services/water-damage/basement-flooding` - Basement flooding solutions
2. `/services/water-damage/burst-pipes` - Burst pipe emergency response
3. `/services/water-damage/flood-restoration` - Flood damage restoration
4. `/services/water-damage/ceiling-water-damage` - Ceiling water damage repair
5. `/services/water-damage/carpet-water-damage` - Carpet water damage cleanup
6. `/services/water-damage/commercial-water-damage` - Commercial water damage
7. `/services/water-damage/structural-drying` - Structural drying services

---

### PILLAR 2: Fire & Smoke Damage
**URL**: `/services/fire-damage` (main pillar)
**Target Keywords**: "fire damage restoration australia", "smoke damage repair"

**Sub-Pillar Pages**:
1. `/services/fire-damage/fire-restoration` - Fire damage restoration
2. `/services/fire-damage/smoke-restoration` - Smoke damage restoration
3. `/services/fire-damage/soot-removal` - Soot and ash removal
4. `/services/fire-damage/odor-removal` - Smoke odor removal
5. `/services/fire-damage/commercial-fire` - Commercial fire damage

---

### PILLAR 3: Mold Remediation
**URL**: `/services/mold-remediation` (main pillar)
**Target Keywords**: "mold remediation australia", "mould removal"

**Sub-Pillar Pages**:
1. `/services/mold-remediation/black-mold` - Black mold removal
2. `/services/mold-remediation/mold-inspection` - Mold inspection services
3. `/services/mold-remediation/mold-testing` - Mold testing and analysis
4. `/services/mold-remediation/mold-prevention` - Mold prevention strategies
5. `/services/mold-remediation/commercial-mold` - Commercial mold remediation

---

### PILLAR 4: Biohazard Cleanup
**URL**: `/services/biohazard-cleanup` (main pillar)
**Target Keywords**: "biohazard cleanup australia", "trauma scene cleanup"

**Sub-Pillar Pages**:
1. `/services/biohazard-cleanup/crime-scene` - Crime scene cleanup
2. `/services/biohazard-cleanup/trauma-cleanup` - Trauma and accident cleanup
3. `/services/biohazard-cleanup/meth-lab` - Meth lab decontamination
4. `/services/biohazard-cleanup/sewage-cleanup` - Sewage and waste cleanup
5. `/services/biohazard-cleanup/hoarding-cleanup` - Hoarding situation cleanup

---

### PILLAR 5: Storm Damage
**URL**: `/services/storm-damage` (main pillar)
**Target Keywords**: "storm damage restoration australia", "storm damage repair"

**Sub-Pillar Pages**:
1. `/services/storm-damage/roof-damage` - Roof storm damage repair
2. `/services/storm-damage/wind-damage` - Wind damage restoration
3. `/services/storm-damage/hail-damage` - Hail damage repair
4. `/services/storm-damage/tree-damage` - Tree fall damage cleanup
5. `/services/storm-damage/emergency-tarping` - Emergency roof tarping

---

## 📊 COMPLETE PAGE INVENTORY NEEDED

### Main Pillar Pages (5):
1. Water Damage Restoration (comprehensive guide)
2. Fire & Smoke Damage (comprehensive guide)
3. Mold Remediation (comprehensive guide)
4. Biohazard Cleanup (comprehensive guide)
5. Storm Damage (comprehensive guide)

### Sub-Pillar Pages (35+ total):
- 7 Water damage sub-pillars
- 5 Fire/smoke sub-pillars
- 5 Mold sub-pillars
- 5 Biohazard sub-pillars
- 5 Storm sub-pillars
- 8+ Additional specific services

### Location Pages (200+):
- 8 State pages (already templated)
- 25 City pages per state (already templated)

### Service × Location Combos (400+):
- Each service × each major city

**Total SEO Pages Needed**: **640+ pages**

---

## 🚀 IMPLEMENTATION PLAN

### Phase 1: Create Pillar Page Templates
Create `/app/services/[category]/page.tsx` for each main pillar:
- Comprehensive 2,000-4,000 word content
- Links to all sub-pillar pages
- FAQs for broad category
- IICRC standards for category
- Call-to-action sections

### Phase 2: Create Sub-Pillar Page Structure
Create `/app/services/[category]/[sub-topic]/page.tsx`:
- Focused 800-1,500 word content
- Links back to pillar page
- Specific use case coverage
- Long-tail keyword targeting

### Phase 3: Generate All Pages
Run generation scripts to create:
- 5 main pillar pages
- 35+ sub-pillar pages
- 200+ location pages
- 400+ service×location combos

### Phase 4: Internal Linking
Implement topic cluster linking:
- Pillar pages link to all sub-pillars
- Sub-pillars link back to pillar
- Cross-linking between related sub-pillars
- Location pages link to relevant services

---

## 💡 PILLAR PAGE CONTENT STRUCTURE

### Main Pillar Template:
```markdown
# [Service Category] - Complete Guide

## Table of Contents
- What is [Service]?
- When You Need [Service]
- Our [Service] Process
- IICRC Standards for [Service]
- Common [Service] Scenarios
- Equipment We Use
- Insurance Coverage
- Related Services (links to sub-pillars)
- Location Coverage
- FAQs
- Get Emergency Help

## Content Sections:
1. Introduction (200 words)
2. When You Need This Service (300 words)
3. Our Process (500 words)
4. IICRC Standards (300 words)
5. Common Scenarios (400 words) ← Links to sub-pillars
6. Equipment & Technology (300 words)
7. Insurance Information (300 words)
8. Why Choose NRPG (200 words)
9. Service Areas (200 words)
10. FAQs (500 words)
11. Emergency CTA

Total: ~3,000 words
```

### Sub-Pillar Template:
```markdown
# [Specific Service] - Expert Guide

## Quick Summary
- What it is
- When you need it
- How we help

## Detailed Content:
1. Introduction (150 words)
2. Signs You Need This Service (200 words)
3. Our Specific Process (400 words)
4. Equipment for This Service (200 words)
5. Timeframe & Cost (150 words)
6. Insurance Coverage (150 words)
7. Prevention Tips (200 words)
8. Related Services (links) (100 words)
9. FAQs (300 words)
10. Emergency CTA

Total: ~1,000 words
Link back to main pillar page
```

---

## 🎯 SEO BENEFIT

### Why This Matters:
1. **Topic Authority**: Pillar pages establish you as the expert
2. **Keyword Coverage**: Sub-pillars capture long-tail searches
3. **Internal Linking**: Topic clusters boost all pages' rankings
4. **User Experience**: Comprehensive information architecture
5. **Conversion**: More entry points = more leads

### Expected SEO Impact:
- **200+ organic keywords** ranking within 3-6 months
- **50+ page 1 rankings** for disaster recovery terms
- **Increased domain authority** from comprehensive content
- **Lower bounce rate** from better internal linking

---

## 📝 NEXT STEPS TO IMPLEMENT

### Immediate:
1. Create pillar page component templates
2. Write pillar page content (or use AI)
3. Create sub-pillar page templates
4. Generate all pages (640+)
5. Implement internal linking
6. Submit sitemap

### Content Generation Options:
**Option A**: Write manually (high quality, time intensive)
**Option B**: Use Gemini to generate content (fast, needs editing)
**Option C**: Hybrid (pillar manual, sub-pillars AI-generated)

---

## 🤖 GENERATE WITH GEMINI

Could use Gemini to generate pillar/sub-pillar content:

```typescript
const pillarContent = await gemini.generateContent(`
Write a comprehensive 3,000-word pillar page about water damage restoration in Australia.

Include:
- Complete guide to water damage restoration
- IICRC S500 standards
- When you need water damage restoration
- The restoration process (assessment, extraction, drying, restoration)
- Equipment used
- Insurance information
- 10 FAQs

Professional tone, Australian context, IICRC certified focus.
`);
```

---

## ✅ RECOMMENDATION

**For NRPG Platform**: Implement full pillar/sub-pillar architecture

**Priority**:
1. ✅ Create 5 main pillar pages (water, fire, mold, bio, storm)
2. ✅ Create 35+ sub-pillar pages
3. ✅ Generate location pages (200+)
4. ✅ Generate service×location combos (400+)
5. ✅ Implement internal linking strategy
6. ✅ Submit comprehensive sitemap

**Estimated Work**: 2-4 hours with AI content generation

---

**Ready to build this out?**
