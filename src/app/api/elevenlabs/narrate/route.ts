import { NextRequest, NextResponse } from 'next/server';

// ElevenLabs voice IDs for different narration styles
const VOICE_IDS = {
  professional: 'pNInz6obpgDQGcFmaJgB', // Adam - Professional male voice
  confident: 'EXAVITQu4vr4xnSDxMaL', // Sarah - Confident female voice
  energetic: 'MF3mGyEYCl7XYWbV9V6O', // Emily - Energetic female voice
  trustworthy: 'TxGEqnHWrfWFTfGW9XjX', // Josh - Deep trustworthy male
};

export async function POST(request: NextRequest) {
  try {
    const { text, voice = 'professional' } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    const apiKey = process.env.ELEVENLABS_API_KEY;
    
    if (!apiKey) {
      console.error('ElevenLabs API key not configured');
      // Return silent audio if API key not configured
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
        },
      });
    }

    // Get voice ID
    const voiceId = VOICE_IDS[voice as keyof typeof VOICE_IDS] || VOICE_IDS.professional;

    // Call ElevenLabs API
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${voiceId}/stream`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': apiKey,
        },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.85,
            style: 0.5,
            use_speaker_boost: true
          },
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      console.error('ElevenLabs API error:', error);
      
      // Return silent audio on error
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg',
        },
      });
    }

    // Stream the audio response
    const audioData = await response.arrayBuffer();
    
    return new NextResponse(audioData, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=3600',
      },
    });

  } catch (error) {
    console.error('Error generating narration:', error);
    
    // Return silent audio on error
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
      },
    });
  }
}