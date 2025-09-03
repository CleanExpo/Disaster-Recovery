/**
 * Text-to-Speech API Route
 * Integrates with ElevenLabs for audio generation
 */

import { NextRequest, NextResponse } from 'next/server';

// ElevenLabs configuration
const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const ELEVENLABS_API_URL = 'https://api.elevenlabs.io/v1';

// Default voice IDs for different scenarios
const VOICE_PRESETS = {
  default: 'EXAVITQu4vr4xnSDxMaL', // Sarah - Natural Australian
  emergency: 'VR6AewLTigWG4xSOukaG', // Arnold - Clear, urgent
  professional: 'pNInz6obpgDQGcFmaJgB', // Adam - Professional
  friendly: 'jBpfuIE2acCO8z3wKNLl', // Gigi - Warm, friendly
};

// Model selection based on requirements
const MODEL_SELECTION = {
  fast: 'eleven_flash_v2_5',
  multilingual: 'eleven_multilingual_v2',
  quality: 'eleven_monolingual_v1',
};

export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    const {
      text,
      language = 'en',
      voiceId,
      emergency = false,
      format = 'mp3_44100_128',
      speed = 1.0,
    } = body;

    // Validate input
    if (!text || text.trim().length === 0) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Check API key
    if (!ELEVENLABS_API_KEY) {
      console.error('ElevenLabs API key not configured');
      // Return a mock response in development
      if (process.env.NODE_ENV === 'development') {
        return new NextResponse(
          new Uint8Array(1024), // Mock audio data
          {
            headers: {
              'Content-Type': 'audio/mpeg',
            },
          }
        );
      }
      return NextResponse.json(
        { error: 'Audio service not configured' },
        { status: 503 }
      );
    }

    // Select voice based on context
    const selectedVoiceId = voiceId || (emergency ? VOICE_PRESETS.emergency : VOICE_PRESETS.default);

    // Select model based on language and requirements
    const modelId = language === 'en' 
      ? (emergency ? MODEL_SELECTION.fast : MODEL_SELECTION.quality)
      : MODEL_SELECTION.multilingual;

    // Prepare request to ElevenLabs
    const elevenLabsUrl = `${ELEVENLABS_API_URL}/text-to-speech/${selectedVoiceId}`;
    
    const elevenLabsBody = {
      text,
      model_id: modelId,
      voice_settings: {
        stability: emergency ? 0.75 : 0.5,
        similarity_boost: 0.8,
        style: 0.0,
        use_speaker_boost: true,
      },
      output_format: format,
    };

    // Make request to ElevenLabs
    const response = await fetch(elevenLabsUrl, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY,
      },
      body: JSON.stringify(elevenLabsBody),
    });

    // Check response
    if (!response.ok) {
      const error = await response.text();
      console.error('ElevenLabs API error:', error);
      return NextResponse.json(
        { error: 'Audio generation failed' },
        { status: response.status }
      );
    }

    // Get audio data
    const audioData = await response.arrayBuffer();

    // Return audio response
    return new NextResponse(audioData, {
      headers: {
        'Content-Type': 'audio/mpeg',
        'Content-Length': audioData.byteLength.toString(),
        'Cache-Control': 'public, max-age=3600',
        'X-Voice-Id': selectedVoiceId,
        'X-Model-Id': modelId,
      },
    });

  } catch (error) {
    console.error('TTS route error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// GET endpoint for voice options
export async function GET(request: NextRequest) {
  try {
    if (!ELEVENLABS_API_KEY) {
      // Return mock voices in development
      if (process.env.NODE_ENV === 'development') {
        return NextResponse.json({
          voices: [
            { voice_id: 'default', name: 'Default Voice' },
            { voice_id: 'emergency', name: 'Emergency Voice' },
          ],
        });
      }
      return NextResponse.json(
        { error: 'Audio service not configured' },
        { status: 503 }
      );
    }

    // Fetch available voices from ElevenLabs
    const response = await fetch(`${ELEVENLABS_API_URL}/voices`, {
      headers: {
        'xi-api-key': ELEVENLABS_API_KEY,
      },
    });

    if (!response.ok) {
      throw new Error('Failed to fetch voices');
    }

    const data = await response.json();

    // Filter and format voices
    const voices = data.voices.map((voice: any) => ({
      voice_id: voice.voice_id,
      name: voice.name,
      preview_url: voice.preview_url,
      category: voice.category,
      labels: voice.labels,
    }));

    return NextResponse.json({ voices });

  } catch (error) {
    console.error('Get voices error:', error);
    return NextResponse.json(
      { error: 'Failed to fetch voices' },
      { status: 500 }
    );
  }
}