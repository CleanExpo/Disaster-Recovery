# Fact Checker Skill

Verify factual accuracy of all claims, data, and information across the platform.

## Purpose

Ensure all business information, statistics, claims, and data presented on the website are factually accurate and not placeholder/lazy coding.

## Capabilities

1. **IICRC Standards Verification**
   - Verify correct standard codes (S500, S520, etc.)
   - Validate service-to-standard mappings
   - Check certification requirements
   - Confirm procedure descriptions

2. **Australian Business Information**
   - Verify phone numbers are valid Australian format
   - Check ABN/ACN numbers if listed
   - Validate Australian addresses and postcodes
   - Confirm state/territory information

3. **Service Descriptions**
   - Verify service descriptions match actual industry practices
   - Check technical terminology is correct
   - Validate process descriptions
   - Ensure compliance claims are accurate

4. **Legal & Compliance**
   - Verify regulatory references are correct
   - Check building code citations
   - Validate insurance requirements
   - Confirm certification claims

## Tools Available

- WebSearch: Search for official sources
- WebFetch: Read documentation pages
- Read: Access local files to check
- Grep: Search for specific claims

## Process

1. Identify all factual claims in content
2. Research each claim using authoritative sources
3. Flag any inaccuracies or placeholder data
4. Provide correct information with sources
5. Generate report of findings

## Example Checks

**IICRC Standards**:
- Claim: "Fire and Smoke Remediation S520"
- Check: Is S520 the correct standard for fire/smoke?
- Source: IICRC.org official standards list
- Correct: S520 is for MOLD remediation, not fire/smoke
- Fix: Should be FSRT (Fire & Smoke Restoration Technician)

**Phone Numbers**:
- Claim: "1300 309 361"
- Check: Is this a valid 1300 number format?
- Verify: 1300 numbers are 10 digits (1300 XXX XXX)
- Result: Format is valid

**Business Claims**:
- Claim: "100% vetted contractors"
- Check: What does "vetted" mean? What's the process?
- Verify: Is there documentation of vetting process?
- Result: Need to define vetting criteria

## Output Format

```markdown
## Fact Check Report

### Issue: [Description]
- **Location**: [File:Line or Page/Component]
- **Current**: [What it says now]
- **Problem**: [Why it's incorrect]
- **Correct**: [What it should be]
- **Source**: [Where you verified this]
- **Severity**: Critical | High | Medium | Low

### Example:

#### Issue: Incorrect IICRC Standard Mapping
- **Location**: `app/page.tsx:450` - Fire & Smoke service description
- **Current**: "Fire and Smoke Remediation S520"
- **Problem**: S520 is the IICRC standard for MOLD remediation, not fire/smoke
- **Correct**: "Fire and Smoke Restoration FSRT" or reference to IICRC S500 if water damage involved
- **Source**: https://www.iicrc.org/page/Standards
- **Severity**: High (misleading to customers, incorrect industry terminology)
```

## Success Criteria

- All IICRC standards correctly mapped to services
- All phone numbers in valid Australian format
- All business claims verifiable
- All technical descriptions accurate
- No placeholder text remaining
- All statistics have sources
