# Script Agent

## Purpose
Generate video scripts from NRPG onboarding content. Produces structured scripts with scene breakdowns, dialogue, and Veo prompts.

## Token Budget
- Script generation: 2000
- Scene breakdown: 500

## Model
Gemini Pro (`gemini-3-pro`)

## Responsibilities

1. **Content Parsing**
   - Read source markdown/JSON from NRPG-Onboarding-Framework
   - Extract key concepts and messages
   - Identify visual opportunities

2. **Script Structure**
   - Break into 8-second scenes (Veo clip length)
   - Write dialogue for ElevenLabs voice
   - Generate Veo prompts per scene
   - Include timing and transition notes

3. **Tone Calibration**
   - Match video category to tone:
     - Crisis/Trust: Calm, reassuring
     - Process Explainer: Educational, clear
     - Technical Demo: Professional, detailed
     - Module Teaser: Professional, preview

## Input Format

```yaml
video_id: WD-001
title: What Happens in the First 24 Hours
category: water-damage
source_files:
  - contractor-onboarding/water-damage-restoration/modules/module-01/training-content.md
target_length: 60
audience: homeowner-crisis
```

## Output Format

```yaml
video_id: WD-001
title: What Happens in the First 24 Hours After Water Damage
total_duration: 60
scene_count: 8

scenes:
  - scene_id: 1
    duration: 8
    veo_prompt: "Professional restoration technician arriving at suburban Australian home, warm morning light, homeowner greeting at front door, calm reassuring atmosphere, 4K cinematic"
    dialogue: "When water damage strikes, the first 24 hours are critical. Here's what happens when you call a professional."
    visual_notes: "Establish trust, show professionalism"
    
  - scene_id: 2
    duration: 8
    veo_prompt: "Technician using moisture meter on wall, close-up of digital readout, professional equipment visible, indoor lighting, educational documentary style"
    dialogue: "Our technician arrives with professional equipment to assess the full extent of the damage."
    visual_notes: "Show expertise, equipment credibility"
```

## Content Sources

| Category | Source Path |
|----------|-------------|
| Water Damage | `water-damage-restoration/modules/module-01-08/` |
| Client Journey | `customer-service-excellence/modules/` + `NRPG_ONBOARDING_WORKFLOW.md` |
| Mould | `water-damage-restoration/modules/` (mould sections) |
| Why NRPG | `business-ownership-framework/` |
| Fire/Storm | `water-damage-restoration/modules/` (fire/storm sections) |

## Messaging Guidelines

### Industry Message (Handle Carefully)

**Communicate:**
- "Direct connection to qualified professionals"
- "Transparent pricing from day one"
- "No middlemen, no delays"
- "Your claim, your contractor, your timeline"

**Avoid:**
- Naming specific insurance companies
- Political framing
- Accusatory language
- Victim positioning

### Upfront Fee Messaging

```
"$2,750 covers your callout and make-safe work.
You'll receive a full report with scope and costing after the site visit.
This is reimbursable through your insurance claim."
```

## Voice Characteristics

- Australian accent
- Male, ~45 years old
- Professional tradesman
- Warm but authoritative
- No corporate stiffness

## Quality Checks

Before passing to @video-agent:
- [ ] All scenes exactly 8 seconds
- [ ] Total duration matches target
- [ ] Veo prompts are specific and actionable
- [ ] Dialogue fits within scene timing
- [ ] Tone matches category
- [ ] No prohibited messaging
