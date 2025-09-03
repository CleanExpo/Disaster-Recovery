/**
 * Audio Transcription API Route
 * Converts speech to text using OpenAI Whisper or similar service
 */

import { NextRequest, NextResponse } from 'next/server';

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    const language = formData.get('language') as string || 'en';

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Audio file is required' },
        { status: 400 }
      );
    }

    // Check file size (max 25MB for Whisper API)
    if (audioFile.size > 25 * 1024 * 1024) {
      return NextResponse.json(
        { error: 'Audio file too large. Maximum size is 25MB' },
        { status: 400 }
      );
    }

    // Mock response in development if API key not configured
    if (!OPENAI_API_KEY) {
      console.warn('OpenAI API key not configured, returning mock transcription');
      
      if (process.env.NODE_ENV === 'development') {
        // Simulate processing delay
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        return NextResponse.json({
          text: 'This is a mock transcription. Configure OpenAI API key for real transcription.',
          language: language,
          duration: 5.2,
          confidence: 0.95,
        });
      }
      
      return NextResponse.json(
        { error: 'Transcription service not configured' },
        { status: 503 }
      );
    }

    // Prepare form data for OpenAI Whisper API
    const whisperFormData = new FormData();
    whisperFormData.append('file', audioFile);
    whisperFormData.append('model', 'whisper-1');
    
    if (language !== 'auto') {
      whisperFormData.append('language', language);
    }
    
    // Optional: Add prompt for better context
    whisperFormData.append('prompt', 'Emergency report for disaster recovery services.');
    
    // Request transcription from OpenAI
    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: whisperFormData,
    });

    if (!response.ok) {
      const error = await response.text();
      console.error('OpenAI Whisper API error:', error);
      
      return NextResponse.json(
        { error: 'Transcription failed' },
        { status: response.status }
      );
    }

    const transcription = await response.json();

    // Process and enhance the transcription
    const enhancedResult = {
      text: transcription.text,
      language: transcription.language || language,
      duration: transcription.duration,
      words: transcription.words,
      segments: transcription.segments,
      confidence: calculateConfidence(transcription),
      keywords: extractKeywords(transcription.text),
      emergency_detected: detectEmergencyKeywords(transcription.text),
    };

    // Store transcription for analysis if needed
    if (enhancedResult.emergency_detected) {
      await storeEmergencyTranscription(enhancedResult);
    }

    return NextResponse.json(enhancedResult);

  } catch (error) {
    console.error('Transcription error:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}

// Get transcription with timestamps
export async function PUT(request: NextRequest) {
  try {
    const formData = await request.formData();
    const audioFile = formData.get('audio') as File;
    const includeTimestamps = formData.get('timestamps') === 'true';

    if (!audioFile) {
      return NextResponse.json(
        { error: 'Audio file is required' },
        { status: 400 }
      );
    }

    if (!OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'Transcription service not configured' },
        { status: 503 }
      );
    }

    const whisperFormData = new FormData();
    whisperFormData.append('file', audioFile);
    whisperFormData.append('model', 'whisper-1');
    whisperFormData.append('response_format', includeTimestamps ? 'verbose_json' : 'json');
    whisperFormData.append('timestamp_granularities[]', 'word');
    whisperFormData.append('timestamp_granularities[]', 'segment');

    const response = await fetch('https://api.openai.com/v1/audio/transcriptions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${OPENAI_API_KEY}`,
      },
      body: whisperFormData,
    });

    if (!response.ok) {
      throw new Error(`Transcription failed: ${response.status}`);
    }

    const result = await response.json();

    // Format response with timestamps
    const formattedResult = {
      text: result.text,
      language: result.language,
      duration: result.duration,
      segments: result.segments?.map((segment: any) => ({
        id: segment.id,
        start: segment.start,
        end: segment.end,
        text: segment.text,
        confidence: segment.confidence || calculateSegmentConfidence(segment),
      })),
      words: result.words?.map((word: any) => ({
        word: word.word,
        start: word.start,
        end: word.end,
        confidence: word.confidence,
      })),
    };

    return NextResponse.json(formattedResult);

  } catch (error) {
    console.error('Transcription with timestamps error:', error);
    return NextResponse.json(
      { error: 'Transcription failed' },
      { status: 500 }
    );
  }
}

// Helper functions

function calculateConfidence(transcription: any): number {
  // Calculate overall confidence based on segments
  if (!transcription.segments || transcription.segments.length === 0) {
    return 0.85; // Default confidence
  }

  const totalConfidence = transcription.segments.reduce((acc: number, segment: any) => {
    return acc + (segment.no_speech_prob ? 1 - segment.no_speech_prob : 0.85);
  }, 0);

  return totalConfidence / transcription.segments.length;
}

function calculateSegmentConfidence(segment: any): number {
  // Calculate segment confidence
  if (segment.no_speech_prob !== undefined) {
    return 1 - segment.no_speech_prob;
  }
  return 0.85;
}

function extractKeywords(text: string): string[] {
  // Extract relevant keywords for disaster recovery
  const keywords: string[] = [];
  const disasterKeywords = [
    'water damage', 'flood', 'fire', 'smoke', 'mould', 'mold',
    'storm', 'emergency', 'urgent', 'insurance', 'claim',
    'damage', 'restoration', 'repair', 'cleanup', 'sewage',
    'burst pipe', 'leak', 'contamination', 'biohazard'
  ];

  const lowerText = text.toLowerCase();
  
  disasterKeywords.forEach(keyword => {
    if (lowerText.includes(keyword)) {
      keywords.push(keyword);
    }
  });

  return [...new Set(keywords)]; // Remove duplicates
}

function detectEmergencyKeywords(text: string): boolean {
  const emergencyTerms = [
    'emergency', 'urgent', 'immediate', 'critical',
    'help', 'asap', 'right now', 'flooding',
    'fire spreading', 'danger', 'evacuation'
  ];

  const lowerText = text.toLowerCase();
  return emergencyTerms.some(term => lowerText.includes(term));
}

async function storeEmergencyTranscription(transcription: any) {
  // Store emergency transcriptions for priority handling
  try {
    // This would integrate with your database
    console.log('Emergency detected in transcription:', {
      keywords: transcription.keywords,
      text: transcription.text.substring(0, 200),
    });
    
    // You could trigger emergency notifications here
    // await notifyEmergencyTeam(transcription);
    
  } catch (error) {
    console.error('Failed to store emergency transcription:', error);
  }
}