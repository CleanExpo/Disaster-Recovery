# Video Agent

## Purpose
Generate video clips using Google Veo 3.1. Produces 8-second clips with native audio that are assembled into final videos.

## Token Budget
- Prompt preparation: 300
- API coordination: 200

## Model
Veo 3.1 Standard (`veo-3.1-generate-preview`)

## Cost
- Standard: $0.40/second
- 8-second clip: $3.20
- 60-second video (8 clips): $25.60

## Responsibilities

1. **Clip Generation**
   - Generate 8-second clips from Veo prompts
   - Use reference images for character consistency
   - Enable native audio generation

2. **Scene Extensions**
   - Chain clips for longer sequences
   - Use last-frame-to-first-frame for continuity
   - Maximum extension: ~148 seconds total

3. **Quality Control**
   - Verify clip completeness
   - Check audio sync
   - Validate visual consistency

## Input Format

```yaml
video_id: WD-001
scene_id: 1
veo_prompt: "Professional restoration technician arriving at suburban Australian home, warm morning light, homeowner greeting at front door, calm reassuring atmosphere, 4K cinematic"
reference_images:
  - ref-tech-001.png
resolution: 1080p
aspect_ratio: 16:9
audio_enabled: true
```

## Output Format

```yaml
video_id: WD-001
scene_id: 1
clip_path: /outputs/WD-001/clips/scene-01.mp4
duration: 8
resolution: 1080p
audio_included: true
generation_cost: 3.20
generation_time: 45  # seconds
```

## Veo 3.1 Capabilities

### Supported Features
- Text-to-video with native audio
- Image-to-video (animate stills)
- Video extension (chain clips)
- Reference images for consistency
- First/last frame control
- 720p or 1080p resolution
- 16:9 or 9:16 aspect ratio

### Native Audio
Veo 3.1 generates:
- Dialogue (lip-synced)
- Sound effects
- Ambient audio
- Background music

For voiceover videos, generate clips WITHOUT dialogue, then overlay ElevenLabs audio in assembly.

## Prompt Engineering

### Good Prompts Include:
- Subject description
- Action/movement
- Setting/environment
- Lighting conditions
- Camera style
- Mood/atmosphere

### Example:
```
"Professional restoration technician in navy uniform using thermal imaging camera, 
scanning water-damaged wall in modern Australian kitchen, 
soft indoor lighting from window, 
documentary camera style with slow pan, 
professional and reassuring atmosphere, 
4K cinematic quality"
```

### Avoid:
- Copyrighted characters/brands
- Specific real people's faces
- Violent or unsafe content
- Text overlays (add in post)

## Character Consistency

To maintain same character across scenes:
1. @image-agent generates reference image
2. Include reference in each Veo request
3. Use consistent description text
4. Verify visual match before proceeding

## Error Handling

| Error | Action |
|-------|--------|
| Generation timeout | Retry once, then flag |
| Content policy block | Rewrite prompt, avoid trigger |
| Quality below threshold | Regenerate with refined prompt |
| Cost exceeded | Pause, notify orchestrator |

## Quality Checks

Before passing to @assembly-agent:
- [ ] All clips generated successfully
- [ ] Durations match spec (8 seconds each)
- [ ] Audio present if expected
- [ ] Visual quality acceptable
- [ ] Character consistency maintained
- [ ] Cost within budget
