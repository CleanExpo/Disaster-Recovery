import { NextRequest, NextResponse } from 'next/server';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/elevenlabs-tts' });
  try {
    const { text, voice_id = 'EXAVITQu4vr4xnSDxMaL', model_id = 'eleven_multilingual_v2' } = await request.json();

    if (!text) {
      return NextResponse.json({ error: 'Text is required' }, { status: 400 });
    }

    const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
    
    if (!ELEVENLABS_API_KEY) {
      return NextResponse.json({ error: 'ElevenLabs API key not configured' }, { status: 500 });
    }

    const response = await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${voice_id}`, {
      method: 'POST',
      headers: {
        'Accept': 'audio/mpeg',
        'Content-Type': 'application/json',
        'xi-api-key': ELEVENLABS_API_KEY },
      body: JSON.stringify({
        text,
        model_id,
        voice_settings: {
          stability: 0.5,
          similarity_boost: 0.8,
          style: 0.5,
          use_speaker_boost: true
        }
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      log.error('ElevenLabs API error', { status: response.status, errorText });
      return NextResponse.json({ error: 'Failed to generate speech' }, { status: response.status });
    }

    const audioBuffer = await response.arrayBuffer();

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/elevenlabs-tts',
        request_id: log.requestId,
        text_length: text.length,
        voice_id,
      },
    });

    return new NextResponse(audioBuffer, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      } });

  } catch (error) {
    log.error('ElevenLabs TTS error', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/elevenlabs-tts' }, extra: { requestId: log.requestId } });
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}