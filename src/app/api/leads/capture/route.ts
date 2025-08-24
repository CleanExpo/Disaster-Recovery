import { NextRequest, NextResponse } from 'next/server';
import { prisma } from '@/lib/prisma';
import { sendEmail, emailTemplates } from '@/lib/email';
import { calculateLeadValue, assignLeadToPartner } from '@/lib/lead-management';

export async function POST(request: NextRequest) {
  try {
    const data = await request.json();
    const ipAddress = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || '';
    
    // Lead quality scoring
    const leadScore = calculateLeadScore(data);
    
    // Only accept high-quality leads (score > 50)
    if (leadScore < 50) {
      return NextResponse.json(
        { error: 'Lead does not meet quality requirements' },
        { status: 400 }
      );
    }
    
    // Determine lead value based on factors
    const leadValue = calculateLeadValue({
      score: leadScore,
      propertyType: data.propertyType,
      propertyValue: data.propertyValue,
      hasInsurance: data.hasInsurance,
      urgencyLevel: data.urgencyLevel,
      isBusinessProperty: data.isBusinessProperty,
      estimatedAreaAffected: data.estimatedAreaAffected,
      state: data.state
    });
    
    // Create lead in database
    const lead = await prisma.lead.create({
      data: {
        // Contact Information
        fullName: data.fullName,
        phone: data.phone,
        email: data.email,
        
        // Property Information
        propertyType: data.propertyType,
        propertyAddress: data.propertyAddress,
        suburb: data.suburb,
        state: data.state,
        postcode: data.postcode,
        
        // Damage Information
        damageType: JSON.stringify(data.damageType),
        damageDate: new Date(data.damageDate),
        damageDescription: data.damageDescription,
        estimatedAreaAffected: data.estimatedAreaAffected,
        
        // Insurance Information
        hasInsurance: data.hasInsurance,
        insuranceCompany: data.insuranceCompany,
        claimNumber: data.claimNumber,
        excessAmount: data.excessAmount,
        
        // Value Indicators
        urgencyLevel: data.urgencyLevel,
        propertyValue: data.propertyValue,
        isBusinessProperty: data.isBusinessProperty,
        requiresAccommodation: data.requiresAccommodation,
        
        // Lead Quality
        leadScore: leadScore,
        leadValue: leadValue,
        hasPhotos: data.hasPhotos,
        readyToStart: data.readyToStart,
        budget: data.budget,
        decisionMaker: data.decisionMaker,
        
        // Tracking
        source: data.source,
        ipAddress: ipAddress,
        userAgent: data.userAgent,
        status: 'NEW',
        qualityStatus: leadScore >= 80 ? 'HIGH_VALUE' : leadScore >= 60 ? 'QUALIFIED' : 'STANDARD'
      }
    });
    
    // Find and assign to partner
    const partner = await assignLeadToPartner({
      state: data.state,
      suburb: data.suburb,
      postcode: data.postcode,
      damageType: data.damageType,
      propertyType: data.propertyType,
      leadValue: leadValue
    });
    
    if (partner) {
      // Update lead with partner assignment
      await prisma.lead.update({
        where: { id: lead.id },
        data: {
          partnerId: partner.id,
          assignedAt: new Date(),
          status: 'ASSIGNED'
        }
      });
      
      // Create billing record
      await prisma.partnerBilling.create({
        data: {
          partnerId: partner.id,
          leadId: lead.id,
          amount: leadValue,
          status: 'PENDING',
          dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000) // 7 days
        }
      });
      
      // Send notifications
      await sendEmail(partner.email, emailTemplates.partnerLeadAssignment(partner, lead));
    }
    
    // Send admin notification
    await sendEmail(process.env.ADMIN_EMAIL || 'admin@disasterrecovery.com.au', emailTemplates.leadNotification(lead));
    
    // Track conversion
    await prisma.leadTracking.create({
      data: {
        leadId: lead.id,
        event: 'LEAD_CAPTURED',
        metadata: JSON.stringify({
          score: leadScore,
          value: leadValue,
          assignedTo: partner?.businessName || 'Unassigned'
        })
      }
    });
    
    return NextResponse.json({
      success: true,
      leadId: lead.id,
      message: 'Lead captured successfully'
    });
    
  } catch (error) {
    console.error('Lead capture error:', error);
    return NextResponse.json(
      { error: 'Failed to process lead' },
      { status: 500 }
    );
  }
}

function calculateLeadScore(data: any): number {
  let score = 0;
  
  // Insurance (30 points max)
  if (data.hasInsurance) {
    score += 25;
    if (data.insuranceCompany) score += 3;
    if (data.claimNumber) score += 2;
  }
  
  // Urgency (20 points max)
  switch(data.urgencyLevel) {
    case 'emergency': score += 20; break;
    case 'urgent': score += 15; break;
    case 'soon': score += 10; break;
    case 'planning': score += 5; break;
  }
  
  // Property Value (20 points max)
  const propertyValue = parseInt(data.propertyValue) || 0;
  if (propertyValue >= 2000000) score += 20;
  else if (propertyValue >= 1000000) score += 17;
  else if (propertyValue >= 750000) score += 14;
  else if (propertyValue >= 500000) score += 11;
  else if (propertyValue >= 250000) score += 8;
  else score += 5;
  
  // Business Property (15 points)
  if (data.isBusinessProperty) score += 15;
  
  // Ready to Start (10 points max)
  switch(data.readyToStart) {
    case 'immediately': score += 10; break;
    case 'within_week': score += 7; break;
    case 'within_month': score += 4; break;
    case 'planning': score += 2; break;
  }
  
  // Decision Maker (5 points)
  if (data.decisionMaker) score += 5;
  
  // Additional Quality Indicators
  if (data.hasPhotos) score += 3;
  if (data.requiresAccommodation) score += 5;
  
  // Damage Type Multiplier
  const highValueDamageTypes = ['Fire/Smoke Damage', 'Sewage Backup', 'Biohazard/Trauma', 'Storm/Wind Damage'];
  const damageTypeCount = data.damageType?.filter((type: string) => highValueDamageTypes.includes(type)).length || 0;
  score += damageTypeCount * 3;
  
  // Area Affected Bonus
  switch(data.estimatedAreaAffected) {
    case 'entire_property': score += 10; break;
    case 'commercial_large': score += 10; break;
    case 'entire_floor': score += 7; break;
    case 'multiple_rooms': score += 5; break;
    case 'single_room': score += 2; break;
  }
  
  return Math.min(score, 100); // Cap at 100
}