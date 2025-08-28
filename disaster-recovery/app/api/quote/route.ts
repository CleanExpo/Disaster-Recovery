import { NextRequest, NextResponse } from 'next/server';

interface QuoteRequest {
  propertyType: string;
  damageType: string;
  damageExtent: string;
  propertySize: number;
  insuranceClaim: boolean;
  urgency: string;
  location: string;
  contact: {
    name: string;
    email: string;
    phone: string;
  };
}

export async function POST(request: NextRequest) {
  try {
    const data: QuoteRequest = await request.json();
    
    // Calculate base quote based on parameters
    let basePrice = 0;
    let timeEstimate = '';
    
    // Property type pricing
    const propertyPricing: Record<string, number> = {
      residential: 1000,
      commercial: 2500,
      industrial: 3500,
    };
    
    // Damage type multipliers
    const damageMultipliers: Record<string, number> = {
      water: 1.2,
      fire: 1.8,
      mold: 1.5,
      storm: 1.6,
    };
    
    // Damage extent multipliers
    const extentMultipliers: Record<string, number> = {
      minor: 1.0,
      moderate: 2.5,
      severe: 4.0,
    };
    
    // Calculate base price
    basePrice = (propertyPricing[data.propertyType] || 1000) * 
                (damageMultipliers[data.damageType] || 1) * 
                (extentMultipliers[data.damageExtent] || 1);
    
    // Add size factor (per 100 sqm)
    basePrice += (data.propertySize / 100) * 200;
    
    // Urgency adjustment
    if (data.urgency === 'immediate') {
      basePrice *= 1.3;
      timeEstimate = '24-48 hours';
    } else if (data.urgency === 'within-week') {
      basePrice *= 1.1;
      timeEstimate = '3-5 days';
    } else {
      timeEstimate = '5-7 days';
    }
    
    // Round to nearest $100
    const estimatedCost = Math.round(basePrice / 100) * 100;
    
    // Generate quote ID
    const quoteId = `QT-${Date.now()}`;
    
    // Here you would typically:
    // 1. Save quote to database
    // 2. Send email with detailed quote
    // 3. Create follow-up task for sales team
    
    const response = {
      success: true,
      quoteId,
      estimate: {
        lowRange: estimatedCost * 0.8,
        highRange: estimatedCost * 1.2,
        averageCost: estimatedCost,
        currency: 'AUD',
      },
      timeEstimate,
      validUntil: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // Valid for 7 days
      nextSteps: [
        'Our specialist will contact you within 2 hours',
        'On-site assessment will be scheduled',
        'Detailed quote will be provided after inspection',
        'Work can begin immediately upon approval'
      ],
      insuranceNote: data.insuranceClaim 
        ? 'We work directly with all major insurance companies and can handle claims on your behalf.'
        : 'We offer flexible payment plans if not using insurance.',
    };
    
    return NextResponse.json(response);
    
  } catch (error) {
    console.error('Error generating quote:', error);
    return NextResponse.json(
      { error: 'Failed to generate quote' },
      { status: 500 }
    );
  }
}

export async function GET(request: NextRequest) {
  // Return available options for quote form
  return NextResponse.json({
    propertyTypes: ['residential', 'commercial', 'industrial'],
    damageTypes: ['water', 'fire', 'mold', 'storm'],
    damageExtents: ['minor', 'moderate', 'severe'],
    urgencyLevels: ['immediate', 'within-week', 'flexible'],
  });
}