# Fact-Checking Issues Found - Immediate Action Required

**Date**: 2025-12-29
**Scope**: Entire codebase
**Severity**: Multiple CRITICAL errors found

---

## 🚨 CRITICAL ISSUES

### Issue #1: Fire/Smoke Incorrectly Using S520 Standard
**Severity**: CRITICAL (Industry mislabeling)

**Locations Found** (8 files):
1. `data/services.json:104` - "protocol": "S520" for fire damage
2. `lib/design-tokens.ts:45` - Comment says "S520 Fire"
3. `docs/NRPG_COMPONENTS_GUIDE.md:284` - "Fire/Smoke | Protocol S520"
4. `components/nrpg/README.md:160` - "Fire/Smoke (Protocol S520)"
5. `HOMEPAGE_REDESIGN_SUMMARY.md:66` - "Fire & Smoke (Protocol S520, Orange)"
6. `HOMEPAGE_LAYOUT_GUIDE.md:293` - "S520 Fire"
7. `components/nrpg/COMPONENT_SUMMARY.md:180` - "Fire/Smoke - S520"
8. `lib/seo/backlink-tracker.ts:649` - "Fire and smoke remediation (IICRC S520)"

**Problem**:
- S520 is the IICRC standard for **MOLD REMEDIATION**, NOT fire/smoke
- This is factually incorrect and misleading to customers
- Could cause legal/compliance issues

**Correct Information**:
- Fire & Smoke restoration uses **FSRT** (Fire & Smoke Restoration Technician)
- OR references **IICRC S500** if water damage is also involved (from firefighting efforts)
- Source: https://www.iicrc.org/page/Standards

**Required Fixes**:
```typescript
// WRONG:
protocol: "S520"  // for fire/smoke
protocolOrange: '#FB923C',  // S520 Fire

// CORRECT:
protocol: "FSRT"  // for fire/smoke
protocolOrange: '#FB923C',  // FSRT Fire & Smoke
```

---

### Issue #2: "The 1300 Blueprint" - Marketing Fluff
**Severity**: MEDIUM (Unverifiable marketing claim)

**Location**: `app/page.tsx:373`

**Current**:
```tsx
<h2>The 1300 Blueprint</h2>
<p>Not just a number. A commitment to forensic standards.</p>

// Then breaks down:
// 1300 = National Defense Line
// 309 = Forensic Checkpoints
// 361° = Beyond 360 (complete protection)
```

**Problem**:
- "1300 Blueprint" is not a real industry term
- Number breakdown is creative marketing but unverifiable
- "309 Forensic Checkpoints" - what does this actually mean?
- "361° Beyond 360" - mathematically doesn't make sense (360° is complete circle)

**Verification Needed**:
- Is "1300 Blueprint" your actual branding/marketing term?
- Do the number breakdowns have real meaning or just creative copy?
- Should this section be replaced with factual service information?

**Recommendation**:
- If this is intentional branding, add context explaining it's your methodology
- If it's placeholder, replace with actual service value propositions
- Make the connection clearer between numbers and what they represent

---

### Issue #3: Potential Placeholder Phone Number
**Severity**: HIGH (If not actually your number)

**Number Used Throughout**: 1300 309 361

**Format Validation**: ✅ Correct format for 1300 number

**Critical Question**:
- Is "1300 309 361" actually allocated to your business?
- Or is this a placeholder/example number?
- 1300 numbers must be purchased from Australian telecoms

**Action Required**:
- If this IS your real number: ✅ No action needed
- If this is NOT your number: 🚨 Replace immediately with actual business number
- If you don't have a 1300 number yet: Use regular landline or mobile until allocated

---

## ⚠️ HIGH PRIORITY ISSUES

### Issue #4: Multiple TODO Comments in Production Code

**Found in API Routes**:
- `app/api/analytics/leads/route.ts` - "TODO: Check if user is admin"
- `app/api/auth/reset-password/route.ts` - "TODO: Send email with reset link"
- `app/api/auth/verify-email/route.ts` - "TODO: Send verification email"
- `app/api/blog/[slug]/route.ts` (2 locations) - "TODO: Add authentication check"
- `app/api/bookings/[id]/assign/route.ts` - "TODO: Implement notification system"

**Severity**: HIGH (Incomplete features)

**Action**: Remove TODO or implement missing functionality

---

### Issue #5: Generic Placeholder Text in Forms

**Found**:
- `app/contact/page.tsx` - Multiple placeholders:
  - "John" / "Smith" (name fields)
  - "john@example.com" (email)
  - "+61 4XX XXX XXX" (phone)

**Severity**: LOW (Standard form placeholders, acceptable)

**Optional Improvement**: Use Australian-specific examples

---

## 📊 MEDIUM PRIORITY ISSUES

### Issue #6: Unverifiable Claims

**Locations Throughout Site**:
- "100% vetted contractors"
  - Question: What's your vetting process? Can you prove "100%"?
  - Recommendation: Document vetting criteria or use "Thoroughly vetted"

- "24/7 Nationwide"
  - Question: Do you actually have 24/7 coverage in all states?
  - Recommendation: Be specific about coverage areas

- "Forensic standards"
  - Question: Which forensic standards specifically?
  - Recommendation: Reference specific standards (IICRC, ISO, etc.)

**Action**: Review all marketing claims for verifiability

---

## 🔍 ADDITIONAL CHECKS NEEDED

### Issue #7: IICRC Standard Completeness

**Need to Verify**:
- Are all water damage services correctly labeled S500/WRT?
- Are all mold services correctly labeled S520/AMRT?
- Are biohazard services using correct S540/S800?
- Are textile/carpet services using S100?

**Agents are checking this now** (a1bbb18, a420efb)

---

## 🎯 IMMEDIATE ACTION PLAN

### Critical (Fix Immediately):
1. ✅ Fix S520/Fire error in all 8 locations
2. ⚠️ Verify 1300 309 361 is your actual number
3. ✅ Remove or implement TODO comments in APIs

### High Priority (Fix Soon):
4. Review "1300 Blueprint" marketing copy
5. Verify all service-to-standard mappings
6. Check all business claims are substantiated

### Medium Priority (Review):
7. Improve form placeholders
8. Document vetting process
9. Specify coverage areas

---

## 📝 CORRECTIONS NEEDED

### services.json
```json
// Line 104 - WRONG:
"protocol": "S520",

// CORRECT:
"protocol": "FSRT",
```

### lib/design-tokens.ts
```typescript
// Line 45 - WRONG:
protocolOrange: '#FB923C',  // S520 Fire

// CORRECT:
protocolOrange: '#FB923C',  // FSRT Fire & Smoke
```

### All Documentation Files
Search and replace:
- "S520 Fire" → "FSRT Fire & Smoke"
- "Protocol S520" (for fire) → "FSRT Protocol"
- "Fire and smoke remediation (IICRC S520)" → "Fire and smoke restoration (IICRC FSRT)"

---

## ✅ VALIDATION IN PROGRESS

**Agents Running**:
- Agent a1bbb18: Comprehensive fact-checking (frontend/backend)
- Agent a420efb: Database and service data validation

**Expected Findings**:
- Complete list of IICRC errors
- All placeholder data identified
- Verification of all business claims
- Geographic accuracy check

---

**Next**: Fix critical S520/Fire error across all files immediately
**Then**: Review agent reports for additional issues
**Finally**: Create corrected, fact-checked version of entire platform

---

**Status**: 🚨 **CRITICAL ERRORS IDENTIFIED - FIXING NOW**
