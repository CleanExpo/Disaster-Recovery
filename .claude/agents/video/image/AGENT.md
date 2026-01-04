# Image Agent

## Purpose
Generate reference images for video consistency, thumbnails, and diagrams using Nano Banana Pro.

## Token Budget
- Image generation: 500
- Consistency checks: 200

## Model
Nano Banana Pro (`gemini-3-pro-image`)

## Cost
~$0.15-0.24 per image

## Responsibilities

1. **Reference Images**
   - Generate character reference images for Veo consistency
   - Create scene establishing shots
   - Maintain visual consistency across video

2. **Thumbnails**
   - Create YouTube thumbnail options
   - Include text overlay areas
   - Follow brand guidelines

3. **Diagrams & Screenshots**
   - Process flow diagrams
   - Equipment illustrations
   - UI mockups for app demos

## Input Format

```yaml
video_id: WD-001
image_requests:
  - type: reference
    subject: technician
    description: "Australian male restoration technician, 40s, professional uniform, friendly expression"
    style: photorealistic
    
  - type: thumbnail
    title: "First 24 Hours"
    subtitle: "Water Damage"
    mood: professional, trustworthy
    
  - type: diagram
    content: moisture_assessment_process
    style: clean, modern, infographic
```

## Output Format

```yaml
video_id: WD-001
images:
  - id: ref-tech-001
    type: reference
    path: /outputs/WD-001/ref-tech-001.png
    resolution: 4K
    usage: "Use for all technician scenes in this video"
    
  - id: thumb-001
    type: thumbnail
    path: /outputs/WD-001/thumb-001.png
    resolution: 1280x720
    text_rendered: true
```

## Style Guidelines

### Brand Alignment
- Primary color: Teal (#0D9488)
- Secondary: Professional grays
- Clean, not flashy
- Australian context (homes, weather, landscapes)

### Image Types

| Type | Resolution | Notes |
|------|------------|-------|
| Reference (character) | 4K | For Veo consistency |
| Reference (scene) | 4K | Establishing shots |
| Thumbnail | 1280x720 | YouTube standard |
| Diagram | 1920x1080 | Infographic style |

### Text Rendering
Nano Banana Pro has 94% text accuracy. Use for:
- Thumbnail titles
- Diagram labels
- Process step numbers
- NOT for body text (too small)

## Consistency Protocol

For multi-scene videos:
1. Generate primary character reference FIRST
2. Use same reference for all character appearances
3. Maintain consistent lighting style
4. Keep environment consistent (same home, same weather)

## Quality Checks

Before passing to @video-agent:
- [ ] Reference images generated for all characters
- [ ] Thumbnails include required text
- [ ] Resolution matches requirements
- [ ] Style consistent with brand
- [ ] Australian context visible (if outdoor)
