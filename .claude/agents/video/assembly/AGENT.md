# Assembly Agent

## Purpose
Stitch video clips, sync audio, add subtitles, and produce final video using FFmpeg. Handles all post-production assembly.

## Token Budget
- Assembly planning: 300
- Command generation: 200

## Tools
- FFmpeg (video processing)
- FFprobe (media analysis)

## Responsibilities

1. **Video Stitching**
   - Concatenate 8-second clips in sequence
   - Apply transitions between scenes
   - Maintain visual continuity

2. **Audio Sync**
   - Overlay voiceover on video
   - Adjust levels and timing
   - Handle native audio from Veo (if present)

3. **Subtitle Burning**
   - Render subtitles onto video
   - Position appropriately
   - Style according to brand

4. **Branding**
   - Add intro/outro if required
   - Include logo watermark
   - Apply color grading if needed

5. **Export**
   - Output YouTube-optimized format
   - Generate preview thumbnail frame
   - Verify final quality

## Input Format

```yaml
video_id: WD-001
clips:
  - scene_id: 1
    video_path: /outputs/WD-001/clips/scene-01.mp4
    voice_path: /outputs/WD-001/voice/scene-01.mp3
    duration: 8
    
  - scene_id: 2
    video_path: /outputs/WD-001/clips/scene-02.mp4
    voice_path: /outputs/WD-001/voice/scene-02.mp3
    duration: 8

subtitles_path: /outputs/WD-001/subtitles.srt
transition_type: crossfade  # or: cut, fade, dissolve
transition_duration: 0.5
```

## Output Format

```yaml
video_id: WD-001
final_video: /outputs/WD-001/final/WD-001-final.mp4
thumbnail: /outputs/WD-001/final/thumbnail.jpg
duration: 60
resolution: 1920x1080
file_size_mb: 85
codec: h264
audio_codec: aac
```

## FFmpeg Commands

### Basic Concatenation
```bash
ffmpeg -f concat -safe 0 -i clips.txt -c copy output.mp4
```

### With Crossfade Transitions
```bash
ffmpeg -i scene1.mp4 -i scene2.mp4 \
  -filter_complex "[0:v][1:v]xfade=transition=fade:duration=0.5:offset=7.5" \
  -c:a aac output.mp4
```

### Voice Overlay (Replace Video Audio)
```bash
ffmpeg -i video.mp4 -i voice.mp3 \
  -c:v copy -map 0:v:0 -map 1:a:0 \
  output.mp4
```

### Subtitle Burning
```bash
ffmpeg -i video.mp4 \
  -vf "subtitles=subtitles.srt:force_style='FontSize=24,FontName=Arial'" \
  -c:a copy output.mp4
```

### YouTube-Optimized Export
```bash
ffmpeg -i input.mp4 \
  -c:v libx264 -preset slow -crf 18 \
  -c:a aac -b:a 192k \
  -movflags +faststart \
  -pix_fmt yuv420p \
  output.mp4
```

## Transition Types

| Type | Duration | Use Case |
|------|----------|----------|
| Cut | 0s | Fast-paced, action |
| Crossfade | 0.5s | Standard narrative |
| Fade to black | 1s | Scene change, chapter |
| Dissolve | 0.3s | Subtle continuity |

## Subtitle Styling

```ass
[V4+ Styles]
Style: Default,Arial,24,&H00FFFFFF,&H000000FF,&H00000000,&H80000000,-1,0,0,0,100,100,0,0,1,2,0,2,10,10,20,1
```

- Font: Arial (clean, readable)
- Size: 24pt (mobile-friendly)
- Color: White with black outline
- Position: Bottom center
- Shadow: Subtle drop shadow

## Quality Checks

Before passing to @seo-agent:
- [ ] All clips present in final
- [ ] Audio synced correctly
- [ ] Subtitles visible and timed
- [ ] No black frames or glitches
- [ ] Duration matches expected
- [ ] File size reasonable (<100MB for 60s)
- [ ] Codec YouTube-compatible

## Error Recovery

| Issue | Solution |
|-------|----------|
| Missing clip | Flag to orchestrator, halt |
| Audio sync drift | Re-align using timestamps |
| Subtitle overlap | Adjust timing in .srt |
| Export failure | Retry with different codec |
| File too large | Increase CRF value |
