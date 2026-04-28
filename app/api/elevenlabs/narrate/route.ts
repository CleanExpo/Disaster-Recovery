import { NextRequest, NextResponse } from 'next/server';
import { requestLogger, captureException } from '@/lib/observability';
import { logComplianceEvent } from '@/lib/compliance/events';

const ELEVENLABS_API_KEY = process.env.ELEVENLABS_API_KEY;
const VOICE_ID = 'EXAVITQu4vr4xnSDxMaL'; // Professional male voice for investor pitches

export async function POST(request: NextRequest) {
  const log = requestLogger(request, { route: '/api/elevenlabs/narrate' });
  try {
    // Check for API key
    if (!ELEVENLABS_API_KEY) {
      log.error('ElevenLabs API key not configured');
      // Return a silent audio file if no API key
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg' } });
    }

    const { text } = await request.json();

    if (!text) {
      return NextResponse.json(
        { error: 'Text is required' },
        { status: 400 }
      );
    }

    // Call ElevenLabs API
    const response = await fetch(
      `https://api.elevenlabs.io/v1/text-to-speech/${VOICE_ID}/stream`,
      {
        method: 'POST',
        headers: {
          'Accept': 'audio/mpeg',
          'Content-Type': 'application/json',
          'xi-api-key': ELEVENLABS_API_KEY },
        body: JSON.stringify({
          text,
          model_id: 'eleven_monolingual_v1',
          voice_settings: {
            stability: 0.75,
            similarity_boost: 0.75,
            style: 0.5,
            use_speaker_boost: true } }) }
    );

    if (!response.ok) {
      log.error('ElevenLabs API error', { status: response.status });
      // Return empty audio on error
      return new NextResponse(null, {
        status: 200,
        headers: {
          'Content-Type': 'audio/mpeg' } });
    }

    // Stream the audio response
    const audioStream = response.body;

    await logComplianceEvent({
      eventType: 'api_route_invocation',
      correlationId: '00000000-0000-0000-0000-000000000000',
      correlationType: 'system',
      entityType: 'system',
      metadata: {
        route: '/api/elevenlabs/narrate',
        request_id: log.requestId,
        text_length: text.length,
      },
    });

    return new NextResponse(audioStream, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg',
        'Cache-Control': 'public, max-age=3600' } });

  } catch (error) {
    log.error('error generating narration', { error: error instanceof Error ? error.message : String(error) });
    captureException(error, { tags: { route: '/api/elevenlabs/narrate' }, extra: { requestId: log.requestId } });
    // Return empty response on error to not break the presentation
    return new NextResponse(null, {
      status: 200,
      headers: {
        'Content-Type': 'audio/mpeg' } });
  }
}