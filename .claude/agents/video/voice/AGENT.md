# Voice Agent

## Purpose
Generate voiceover audio from scripts using ElevenLabs API. Produces Australian male professional voice with timing markers.

## Token Budget
- Voice generation: 300
- Timing sync: 200

## API
ElevenLabs Text-to-Speech

## Cost
~$0.30 per 1,000 characters

## Responsibilities

1. **Voice Generation**
   - Generate speech from dialogue text
   - Maintain consistent voice across video
   - Match pacing to scene timing

2. **Timing Markers**
   - Provide word-level timestamps
   - Enable precise sync with video
   - Support subtitle generation

3. **Multi-Language (Future)**
   - Support additional languages
   - Maintain voice character across languages

## Input Format

```yaml
video_id: WD-001
voice_config:
  voice_id: ${ELEVENLABS_VOICE_ID}
  model: eleven_multilingual_v2
  
scenes:
  - scene_id: 1
    dialogue: "When water damage strikes, the first 24 hours are critical. Here's what happens when you call a professional."
    target_duration: 8
    
  - scene_id: 2
    dialogue: "Our technician arrives with professional equipment to assess the full extent of the damage."
    target_duration: 8
```

## Output Format

```yaml
video_id: WD-001
voice_files:
  - scene_id: 1
    audio_path: /outputs/WD-001/voice/scene-01.mp3
    duration: 7.2
    word_timestamps:
      - word: "When"
        start: 0.0
        end: 0.3
      - word: "water"
        start: 0.3
        end: 0.6
    # ... continued
    
  - scene_id: 2
    audio_path: /outputs/WD-001/voice/scene-02.mp3
    duration: 6.8
```

## Voice Characteristics

### Target Voice Profile
- **Accent:** Australian
- **Gender:** Male
- **Age:** ~45 years old
- **Style:** Professional tradesman
- **Tone:** Warm but authoritative
- **Pacing:** Measured, not rushed

### Voice Settings (ElevenLabs)
```json
{
  "stability": 0.75,
  "similarity_boost": 0.85,
  "style": 0.5,
  "use_speaker_boost": true
}
```

### Avoid
- Corporate/robotic tone
- Overly salesy delivery
- Rushed pacing
- Monotone delivery

## Pacing Guidelines

| Audience State | Pacing | WPM |
|---------------|--------|-----|
| Crisis/Stressed | Slow, calm | 120-130 |
| Learning/Curious | Medium | 140-150 |
| Professional/Contractor | Normal | 150-160 |

## Scene Timing Sync

If dialogue duration doesn't match scene:
1. **Too long:** Simplify dialogue, reduce words
2. **Too short:** Add pause at end, or extend scene slightly
3. **Perfect:** Proceed to assembly

Target: Dialogue should be 0.5-1.0 seconds shorter than scene to allow breathing room.

## Subtitle Generation

From word timestamps, generate:
```srt
1
00:00:00,000 --> 00:00:03,200
When water damage strikes, the first 24 hours are critical.

2
00:00:03,400 --> 00:00:07,200
Here's what happens when you call a professional.
```

## Quality Checks

Before passing to @assembly-agent:
- [ ] All scenes have voice audio
- [ ] Durations within tolerance of targets
- [ ] Word timestamps generated
- [ ] No audio artifacts or glitches
- [ ] Consistent voice across all scenes
- [ ] Subtitles generated if required
