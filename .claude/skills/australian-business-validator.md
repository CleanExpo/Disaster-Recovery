# Australian Business Validator Skill

Validate all Australian-specific business information for accuracy and compliance.

## Purpose

Ensure all phone numbers, addresses, business numbers, and Australian-specific data are accurate and properly formatted.

## Validation Rules

### 1. Phone Numbers

**1300 Numbers** (Customer Service):
- Format: 1300 XXX XXX (10 digits total)
- Example: 1300 309 361 ✅ (correct format)
- Must start with "1300"
- Must have exactly 6 more digits

**1800 Numbers** (Toll-Free):
- Format: 1800 XXX XXX
- Must be exactly 10 digits

**Mobile Numbers**:
- Format: 04XX XXX XXX
- Must start with "04"
- Must be 10 digits

**Landlines**:
- Format: (0X) XXXX XXXX
- State-specific area codes:
  - NSW: 02
  - VIC: 03
  - QLD: 07
  - SA/WA/NT: 08

### 2. Postcodes

**State Ranges** (verify postcodes match states):
- NSW: 1000-2599, 2619-2899, 2921-2999
- VIC: 3000-3999
- QLD: 4000-4999
- SA: 5000-5799
- WA: 6000-6797
- TAS: 7000-7999
- ACT: 0200-0299, 2600-2618, 2900-2920
- NT: 0800-0899

### 3. ABN/ACN Numbers

**ABN (Australian Business Number)**:
- 11 digits
- Format: XX XXX XXX XXX
- Must pass checksum validation
- Can verify via: https://abr.business.gov.au/

**ACN (Australian Company Number)**:
- 9 digits
- Format: XXX XXX XXX

### 4. State/Territory Names

**Correct Usage**:
- New South Wales (NSW)
- Victoria (VIC)
- Queensland (QLD)
- Western Australia (WA)
- South Australia (SA)
- Tasmania (TAS)
- Australian Capital Territory (ACT)
- Northern Territory (NT)

**Common Errors**:
❌ "Sidney" → ✅ "Sydney"
❌ "Canberra" alone → ✅ "Canberra, ACT"
❌ "North Territory" → ✅ "Northern Territory"

### 5. Cities & Suburbs

**Capital Cities**:
- Sydney (NSW)
- Melbourne (VIC)
- Brisbane (QLD)
- Perth (WA)
- Adelaide (SA)
- Hobart (TAS)
- Canberra (ACT)
- Darwin (NT)

**Verify**:
- City matches correct state
- Suburb names spelled correctly
- Postcode matches location

## Checks to Perform

1. **Phone Number Validation**
   ```
   Find: All phone numbers in website
   Check: Format is correct (1300/1800/04XX)
   Verify: Number of digits correct
   Flag: Any invalid formats
   ```

2. **Address Validation**
   ```
   Find: All addresses listed
   Check: Postcode matches state
   Verify: Suburb/city names correct
   Flag: Any mismatches
   ```

3. **Business Number Validation**
   ```
   Find: Any ABN/ACN claims
   Check: Correct number of digits
   Verify: Format correct
   Flag: If claiming real ABN, verify it exists
   ```

4. **Geographic Accuracy**
   ```
   Find: All location references
   Check: State abbreviations correct
   Verify: City/state pairings accurate
   Flag: Any geographic errors
   ```

## Output Format

```markdown
## Australian Business Validation Report

### Phone Numbers
✅ 1300 309 361 - Valid format (1300 number, 10 digits)
⚠️  If claiming this is a real number, verify it's actually allocated to the business

### Addresses
❌ "123 Collins St, Brisbane VIC 3000"
   - Problem: Brisbane is in QLD, not VIC
   - Postcode 3000 is Melbourne, VIC
   - Fix: Either "123 Collins St, Melbourne VIC 3000" OR "123 Queen St, Brisbane QLD 4000"

### Postcodes
✅ All postcodes match stated locations

### ABN/ACN
⚠️  No ABN listed - Consider adding for credibility
   Format: "ABN: 12 345 678 901"

### State References
✅ All state abbreviations correct
✅ All capital city names correct
```

## Tools to Use

- WebSearch: Verify postcodes, suburbs
- WebFetch: Check ABN register if numbers listed
- Read: Find all addresses/phones in codebase
- Grep: Search for phone patterns, ABN patterns

## Success Criteria

✅ All phone numbers in valid Australian format
✅ All postcodes match correct states
✅ All addresses geographically accurate
✅ All business numbers properly formatted
✅ No geographic inconsistencies
