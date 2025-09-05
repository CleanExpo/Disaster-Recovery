import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

/**
 * Calculate lead value based on various factors
 */
export function calculateLeadValue(leadData: any): number {
  let value = 0;

  // Base value by damage type
  const damageTypes = Array.isArray(leadData.damageType) 
    ? leadData.damageType 
    : JSON.parse(leadData.damageType || '[]');
  
  damageTypes.forEach((type: string) => {
    switch (type) {
      case 'water': value += 500; break;
      case 'fire': value += 800; break;
      case 'storm': value += 600; break;
      case 'mould': value += 400; break;
      default: value += 300;
    }
  });

  // Urgency multiplier
  if (leadData.urgencyLevel === 'IMMEDIATE') value *= 1.5;
  if (leadData.urgencyLevel === 'HIGH') value *= 1.3;

  // Insurance multiplier
  if (leadData.hasInsurance) value *= 1.4;

  // Property type multiplier
  if (leadData.isBusinessProperty) value *= 1.6;
  
  // Area affected multiplier
  const areaNum = parseInt(leadData.estimatedAreaAffected) || 0;
  if (areaNum > 100) value *= 1.5;
  else if (areaNum > 50) value *= 1.3;

  return Math.round(value);
}

/**
 * Assign lead to best matching partner
 */
export async function assignLeadToPartner(leadId: string): Promise<string | null> {
  try {
    // Get the lead details
    const lead = await prisma.lead.findUnique({
      where: { id: leadId }
    });

    if (!lead) {
      throw new Error('Lead not found');
    }

    // Find matching partners based on location and service type
    const partners = await prisma.partner.findMany({
      where: {
        status: 'ACTIVE',
        leadCredits: { gt: 0 },
        accountBalance: { gte: 0 }
      }
    });

    // Filter partners by service area and specialization
    const matchingPartners = partners.filter(partner => {
      // Check service areas (simplified for MVP)
      const serviceAreas = JSON.parse(partner.serviceAreas || '[]');
      const leadLocation = `${lead.suburb}, ${lead.state} ${lead.postcode}`;
      
      const areaMatch = serviceAreas.some((area: string) => 
        leadLocation.toLowerCase().includes(area.toLowerCase()) ||
        lead.postcode === area
      );

      // Check specializations
      const specializations = JSON.parse(partner.specializations || '[]');
      const damageTypes = JSON.parse(lead.damageType || '[]');
      
      const specializationMatch = damageTypes.some((damage: string) =>
        specializations.some((spec: string) => 
          spec.toLowerCase().includes(damage.toLowerCase())
        )
      );

      return areaMatch || specializationMatch;
    });

    if (matchingPartners.length === 0) {
      console.log('No matching partners found for lead:', leadId);
      return null;
    }

    // Sort by auto-accept score and available credits
    matchingPartners.sort((a, b) => {
      // Prioritize partners with higher auto-accept scores
      if (lead.leadScore >= a.autoAcceptScore && lead.leadScore < b.autoAcceptScore) return -1;
      if (lead.leadScore >= b.autoAcceptScore && lead.leadScore < a.autoAcceptScore) return 1;
      
      // Then by available credits
      return b.leadCredits - a.leadCredits;
    });

    // Assign to first matching partner
    const selectedPartner = matchingPartners[0];

    // Update lead with partner assignment
    await prisma.lead.update({
      where: { id: leadId },
      data: {
        partnerId: selectedPartner.id,
        assignedAt: new Date(),
        status: 'ASSIGNED'
      }
    });

    // Create billing record
    const leadValue = calculateLeadValue(lead);
    await prisma.partnerBilling.create({
      data: {
        partnerId: selectedPartner.id,
        leadId: leadId,
        amount: leadValue,
        dueDate: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
        status: 'PENDING'
      }
    });

    // Deduct credits from partner
    await prisma.partner.update({
      where: { id: selectedPartner.id },
      data: {
        leadCredits: { decrement: leadValue }
      }
    });

    // Create tracking record
    await prisma.leadTracking.create({
      data: {
        leadId: leadId,
        event: 'ASSIGNED',
        metadata: JSON.stringify({
          partnerId: selectedPartner.id,
          partnerName: selectedPartner.businessName,
          leadValue: leadValue
        })
      }
    });

    console.log(`Lead ${leadId} assigned to partner ${selectedPartner.businessName}`);
    return selectedPartner.id;

  } catch (error) {
    console.error('Error assigning lead to partner:', error);
    return null;
  }
}

/**
 * Get partner details
 */
export async function getPartnerDetails(partnerId: string) {
  return await prisma.partner.findUnique({
    where: { id: partnerId },
    include: {
      leads: {
        take: 10,
        orderBy: { createdAt: 'desc' }
      },
      billing: {
        take: 10,
        orderBy: { createdAt: 'desc' }
      }
    }
  });
}

/**
 * Update partner credits
 */
export async function updatePartnerCredits(partnerId: string, amount: number) {
  return await prisma.partner.update({
    where: { id: partnerId },
    data: {
      leadCredits: { increment: amount },
      accountBalance: { increment: amount }
    }
  });
}

/**
 * Get available partners for a location
 */
export async function getAvailablePartners(suburb: string, state: string, postcode: string) {
  const partners = await prisma.partner.findMany({
    where: {
      status: 'ACTIVE',
      leadCredits: { gt: 0 }
    }
  });

  // Filter by service area
  return partners.filter(partner => {
    const serviceAreas = JSON.parse(partner.serviceAreas || '[]');
    const location = `${suburb}, ${state} ${postcode}`.toLowerCase();
    
    return serviceAreas.some((area: string) => 
      location.includes(area.toLowerCase()) ||
      postcode === area
    );
  });
}