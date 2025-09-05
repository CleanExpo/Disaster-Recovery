import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';

const BOT_API_URL = process.env.BOT_API_URL || 'http://localhost:3001';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    
    // Try to forward to bot system first
    const botResponse = await fetch(`${BOT_API_URL}/api/client/emergency`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body)
    }).catch(error => {
      console.error('Bot system emergency connection failed:', error);
      return null;
    });

    if (botResponse && botResponse.ok) {
      const data = await botResponse.json();
      return NextResponse.json(data);
    }

    // Fallback: Create emergency lead directly in database
    const emergencyLead = await prisma.lead.create({
      data: {
        fullName: body.contactInfo?.name || 'Emergency Contact',
        phone: body.contactInfo?.phone || '',
        email: body.contactInfo?.email || `emergency_${Date.now()}@temp.com`,
        propertyType: 'Residential',
        propertyAddress: body.location?.address || 'Emergency Location',
        suburb: body.location?.suburb || 'Unknown',
        state: body.location?.state || 'Unknown',
        postcode: body.location?.postcode || '0000',
        damageType: JSON.stringify(['emergency']),
        damageDate: new Date(),
        damageDescription: body.situation || 'Emergency situation',
        estimatedAreaAffected: 'Unknown',
        hasInsurance: false,
        urgencyLevel: 'IMMEDIATE',
        propertyValue: 'Unknown',
        isBusinessProperty: false,
        requiresAccommodation: true,
        leadScore: 100,
        leadValue: 1000,
        hasPhotos: false,
        readyToStart: 'IMMEDIATELY',
        decisionMaker: true,
        qualityStatus: 'HIGH_VALUE',
        status: 'NEW',
        source: 'Emergency Bot'
      }
    });

    // Try to assign to partner
    if (body.location?.postcode) {
      const { assignLeadToPartner } = await import('@/lib/lead-assignment');
      await assignLeadToPartner(emergencyLead.id);
    }

    return NextResponse.json({
      success: true,
      emergencyId: emergencyLead.id,
      data: {
        response: "Emergency response initiated. We're dispatching help immediately.",
        actions: [
          "Stay safe and evacuate if necessary",
          "Document damage with photos if safe to do so",
          "We'll contact you within 60 minutes",
          "A contractor is being assigned to your case"
        ],
        priority: 'IMMEDIATE',
        estimatedResponse: '60 minutes'
      }
    });

  } catch (error) {
    console.error('Emergency API error:', error);
    
    return NextResponse.json({
      success: false,
      error: 'Emergency system error - Please call 000 if life-threatening',
      alternativeContact: {
        message: "If this is a life-threatening emergency, call 000 immediately"
      }
    }, { status: 500 });
  }
}