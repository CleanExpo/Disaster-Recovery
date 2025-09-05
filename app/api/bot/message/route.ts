import { NextRequest, NextResponse } from 'next/server';

// Bot system API URL (can be configured via environment variable)
const BOT_API_URL = process.env.BOT_API_URL || 'http://localhost:3001';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Forward request to bot system
    const botResponse = await fetch(`${BOT_API_URL}/api/client/message`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        message: body.message,
        sessionId: body.sessionId || `web_${Date.now()}`,
        channel: 'web',
        metadata: {
          timestamp: new Date().toISOString(),
          userAgent: req.headers.get('user-agent'),
          ...body.metadata
        }
      })
    }).catch(error => {
      // If bot system is not running, provide fallback response
      console.error('Bot system connection failed:', error);
      return null;
    });

    if (botResponse && botResponse.ok) {
      const data = await botResponse.json();
      return NextResponse.json(data);
    }

    // Fallback response if bot system is unavailable
    return NextResponse.json({
      success: true,
      data: {
        response: "I'm here to help with your disaster recovery needs. Our system is currently processing your request. Please describe your situation and I'll connect you with the right assistance.",
        confidence: 0.8,
        suggestedActions: [
          { label: "Report Water Damage", action: "water_damage" },
          { label: "Report Fire Damage", action: "fire_damage" },
          { label: "Emergency Assistance", action: "emergency" },
          { label: "File Insurance Claim", action: "insurance_claim" }
        ]
      }
    });

  } catch (error) {
    console.error('Bot message API error:', error);
    
    // Provide helpful fallback response
    return NextResponse.json({
      success: true,
      data: {
        response: "I'm ready to assist you with disaster recovery services. How can I help you today?",
        confidence: 1.0,
        suggestedActions: [
          { label: "Get Emergency Help", action: "emergency" },
          { label: "Submit Claim", action: "claim" }
        ]
      }
    });
  }
}