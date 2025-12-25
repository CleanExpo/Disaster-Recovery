/**
 * Sentiment Analysis API
 *
 * Analyze sentiment and mood
 */

import { NextRequest, NextResponse } from 'next/server';
import { sentimentAnalyzer } from '@/lib/ai/sentiment-analyzer';

/**
 * POST /api/ai/sentiment
 *
 * Analyze sentiment of text
 */
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { text, type = 'sentiment' } = body; // sentiment | toxicity | topics | conversation

    if (!text) {
      return NextResponse.json(
        { error: 'Missing required field: text' },
        { status: 400 }
      );
    }

    let result;

    switch (type) {
      case 'toxicity':
        result = sentimentAnalyzer.detectToxicity(text);
        return NextResponse.json({ success: true, result });

      case 'topics':
        const topics = sentimentAnalyzer.extractTopics(text);
        return NextResponse.json({ success: true, topics });

      case 'sentiment':
      default:
        result = sentimentAnalyzer.analyzeSentiment(text);
        return NextResponse.json({ success: true, result });
    }
  } catch (error) {
    console.error('Sentiment analysis error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to analyze sentiment',
      },
      { status: 500 }
    );
  }
}

/**
 * POST /api/ai/sentiment/conversation
 *
 * Analyze conversation mood
 */
export async function PUT(request: NextRequest) {
  try {
    const body = await request.json();
    const { messages } = body; // Array of { text, timestamp }

    if (!messages || !Array.isArray(messages)) {
      return NextResponse.json(
        { error: 'Missing required field: messages (array)' },
        { status: 400 }
      );
    }

    const mood = sentimentAnalyzer.analyzeConversationMood(
      messages.map((msg: any) => ({
        text: msg.text,
        timestamp: new Date(msg.timestamp),
      }))
    );

    return NextResponse.json({ success: true, mood });
  } catch (error) {
    console.error('Conversation analysis error:', error);

    return NextResponse.json(
      {
        error: error instanceof Error ? error.message : 'Failed to analyze conversation',
      },
      { status: 500 }
    );
  }
}
