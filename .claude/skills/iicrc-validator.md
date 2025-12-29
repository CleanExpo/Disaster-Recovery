# IICRC Standards Validator Skill

Specialized skill for validating IICRC (Institute of Inspection, Cleaning and Restoration Certification) standards and certifications.

## Purpose

Ensure all IICRC standard references, certification claims, and technical terminology are accurate according to official IICRC documentation.

## IICRC Standards Reference (Official)

### Water Damage
- **S500**: Standard for Professional Water Damage Restoration
- **WRT**: Water Restoration Technician
- **AMRT**: Applied Microbial Remediation Technician

### Mold
- **S520**: Standard for Professional Mold Remediation

### Fire & Smoke
- **FSRT**: Fire & Smoke Restoration Technician

### Biohazard
- **S540**: Standard for Trauma and Crime Scene Cleanup

### Upholstery & Fabric
- **S100**: Standard for Professional Textile Cleaning

### Commercial
- **S800**: Standard for Professional Trauma and Crime Scene Cleanup

## Validation Checks

1. **Service-to-Standard Mapping**
   - Water damage → S500, WRT
   - Mold remediation → S520, AMRT
   - Fire/smoke → FSRT (NOT S520)
   - Biohazard/trauma → S540, S800
   - Carpet/textile → S100

2. **Certification Requirements**
   - Category 1-2 water → WRT minimum
   - Category 3 water (sewage) → AMRT required
   - Mold >10 sq ft → AMRT required
   - Biohazard → Specialized training required

3. **Procedure Descriptions**
   - Water damage: extraction, drying, monitoring
   - Mold: containment, removal, air scrubbing
   - Fire: soot removal, deodorization
   - Bio: disinfection, proper disposal

## Common Errors to Find

❌ **Wrong**: "Fire and Smoke Remediation S520"
✅ **Correct**: "Fire and Smoke Restoration FSRT"

❌ **Wrong**: "Water Damage S520"
✅ **Correct**: "Water Damage Restoration S500"

❌ **Wrong**: "Mold Removal WRT"
✅ **Correct**: "Mold Remediation S520 with AMRT certification"

## Validation Process

1. Search codebase for IICRC standard references
2. Check each service page for standard claims
3. Verify certification requirements stated
4. Cross-reference with official IICRC documentation
5. Flag any mismatches or ambiguities

## Output Format

```markdown
### IICRC Standard Validation Report

#### Incorrect Mappings Found:

1. **Fire & Smoke Service**
   - File: `app/page.tsx` or `data/services.json`
   - Current: "S520" or incorrect standard
   - Correct: "FSRT (Fire & Smoke Restoration Technician)"
   - Reference: https://www.iicrc.org/page/FSRT

2. **Water Damage Service**
   - File: Location
   - Current: Any incorrect standard
   - Correct: "S500 (Water Damage Restoration) with WRT certification"
   - Reference: https://www.iicrc.org/page/S500

#### Correct Mappings (No Action Needed):
- [List any that are already correct]

#### Recommendations:
- Update service descriptions to use correct IICRC standards
- Add certification level requirements where applicable
- Link to official IICRC documentation for credibility
```

## Tools to Use

- WebSearch: "IICRC S500", "IICRC S520", "IICRC FSRT"
- WebFetch: https://www.iicrc.org/page/Standards
- Read: Check service files for claims
- Grep: Find all IICRC references in codebase

## Success Criteria

✅ All water damage services reference S500/WRT
✅ All mold services reference S520/AMRT
✅ All fire/smoke services reference FSRT
✅ All biohazard services reference S540/S800
✅ No incorrect standard codes used
✅ Certification requirements stated correctly
