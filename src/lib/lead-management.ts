import { prisma } from './prisma';

interface LeadValueFactors {
  score: number;
  propertyType: string;
  propertyValue: string;
  hasInsurance: boolean;
  urgencyLevel: string;
  isBusinessProperty: boolean;
  estimatedAreaAffected: string;
  state: string;
}

interface PartnerSearchCriteria {
  state: string;
  suburb: string;
  postcode: string;
  damageType: string[];
  propertyType: string;
  leadValue: number;
}

// Calculate lead value based on multiple factors
export function calculateLeadValue(factors: LeadValueFactors): number {
  let baseValue = 550; // Base lead value
  
  // Score multiplier (0.5x to 1.5x)
  const scoreMultiplier = 0.5 + (factors.score / 100);
  
  // Property value adjustment
  const propertyValueNum = parseInt(factors.propertyValue) || 0;
  if (propertyValueNum >= 2000000) baseValue += 200;
  else if (propertyValueNum >= 1000000) baseValue += 150;
  else if (propertyValueNum >= 750000) baseValue += 100;
  else if (propertyValueNum >= 500000) baseValue += 50;
  
  // Insurance bonus (insured leads are more valuable)
  if (factors.hasInsurance) baseValue += 100;
  
  // Urgency premium
  if (factors.urgencyLevel === 'emergency') baseValue += 150;
  else if (factors.urgencyLevel === 'urgent') baseValue += 75;
  
  // Business property premium
  if (factors.isBusinessProperty) baseValue += 200;
  
  // Area affected adjustment
  if (factors.estimatedAreaAffected === 'entire_property' || 
      factors.estimatedAreaAffected === 'commercial_large') {
    baseValue += 150;
  } else if (factors.estimatedAreaAffected === 'entire_floor') {
    baseValue += 100;
  } else if (factors.estimatedAreaAffected === 'multiple_rooms') {
    baseValue += 50;
  }
  
  // State-based pricing (adjust for market conditions)
  const stateMultipliers: Record<string, number> = {
    'NSW': 1.2,  // Sydney market premium
    'VIC': 1.15, // Melbourne market premium
    'QLD': 1.0,  // Base rate
    'WA': 1.1,   // Perth market
    'SA': 0.95,  // Adelaide market
    'TAS': 0.9,  // Tasmania market
    'NT': 1.05,  // Northern Territory
    'ACT': 1.1   // Canberra market
  };
  
  const stateMultiplier = stateMultipliers[factors.state] || 1.0;
  
  // Calculate final value
  let finalValue = baseValue * scoreMultiplier * stateMultiplier;
  
  // Round to nearest $50
  finalValue = Math.round(finalValue / 50) * 50;
  
  // Cap at maximum value
  return Math.min(finalValue, 1500);
}

// Find and assign lead to best matching partner
export async function assignLeadToPartner(criteria: PartnerSearchCriteria) {
  try {
    // Find all active partners
    const partners = await prisma.partner.findMany({
      where: {
        status: 'ACTIVE',
        leadCredits: {
          gte: criteria.leadValue // Has enough credits
        }
      }
    });
    
    // Score each partner for this lead
    const scoredPartners = partners.map(partner => {
      let score = 0;
      
      // Parse JSON fields
      const serviceAreas = JSON.parse(partner.serviceAreas || '[]');
      const specializations = JSON.parse(partner.specializations || '[]');
      
      // Location match (highest priority)
      if (serviceAreas.includes(criteria.suburb) || 
          serviceAreas.includes(criteria.postcode) ||
          serviceAreas.includes(criteria.state)) {
        score += 50;
      }
      
      // Specialisation match
      const matchingSpecs = criteria.damageType.filter(type => 
        specializations.includes(type)
      );
      score += matchingSpecs.length * 20;
      
      // Insurance approved bonus
      if (partner.insuranceApproved) score += 15;
      
      // Commercial capability
      if (criteria.propertyType === 'commercial' && partner.receiveCommercial) {
        score += 25;
      }
      
      // Emergency capability
      if (criteria.damageType.includes('emergency') && partner.receiveEmergency) {
        score += 20;
      }
      
      // Account standing (prefer partners with good payment history)
      if (partner.accountBalance >= 0) score += 10;
      
      return { partner, score };
    });
    
    // Sort by score and get best match
    scoredPartners.sort((a, b) => b.score - a.score);
    
    if (scoredPartners.length > 0 && scoredPartners[0].score >= 50) {
      const selectedPartner = scoredPartners[0].partner;
      
      // Check daily lead limit
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      
      const todayLeadsCount = await prisma.lead.count({
        where: {
          partnerId: selectedPartner.id,
          assignedAt: {
            gte: today
          }
        }
      });
      
      if (todayLeadsCount < selectedPartner.maxLeadsPerDay) {
        // Deduct credits immediately
        await prisma.partner.update({
          where: { id: selectedPartner.id },
          data: {
            leadCredits: {
              decrement: criteria.leadValue
            }
          }
        });
        
        return selectedPartner;
      }
    }
    
    // No suitable partner found
    return null;
    
  } catch (error) {
    console.error('Error assigning lead to partner:', error);
    return null;
  }
}

// Validate lead quality
export async function validateLeadQuality(data: any): Promise<{
  isValid: boolean;
  reasons: string[];
}> {
  const reasons: string[] = [];
  
  // Required fields check
  if (!data.fullName || data.fullName.length < 2) {
    reasons.push('Invalid name provided');
  }
  
  if (data.phone && !isValidPhone(data.phone)) {
    reasons.push('Invalid phone number');
  }
  
  if (!data.email || !isValidEmail(data.email)) {
    reasons.push('Invalid email address');
  }
  
  if (!data.propertyAddress || data.propertyAddress.length < 5) {
    reasons.push('Invalid property address');
  }
  
  if (!data.damageType || data.damageType.length === 0) {
    reasons.push('No damage type specified');
  }
  
  if (!data.damageDescription || data.damageDescription.length < 20) {
    reasons.push('Insufficient damage description');
  }
  
  // Spam/fake lead detection
  if (containsSpamKeywords(data.damageDescription)) {
    reasons.push('Potential spam content detected');
  }
  
  if (await isDuplicateSubmission(data.email, data.phone || '')) {
    reasons.push('Duplicate submission detected');
  }
  
  return {
    isValid: reasons.length === 0,
    reasons
  };
}

// Helper functions
function isValidPhone(phone: string): boolean {
  // Australian phone number validation
  const phoneRegex = /^(\+61|0)[2-478][\d]{8}$/;
  const cleanPhone = phone.replace(/[\s()-]/g, '');
  return phoneRegex.test(cleanPhone);
}

function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

function containsSpamKeywords(text: string): boolean {
  const spamKeywords = [
    'test', 'testing', 'asdf', 'qwerty', 
    'fake', 'spam', 'xxx', '123456'
  ];
  const lowerText = text.toLowerCase();
  return spamKeywords.some(keyword => lowerText.includes(keyword));
}

async function isDuplicateSubmission(email: string): Promise<boolean> {
  // Check for recent duplicate submissions (within last hour)
  const oneHourAgo = new Date(Date.now() - 60 * 60 * 1000);
  
  const duplicate = await prisma.lead.findFirst({
    where: {
      email: email,
      createdAt: {
        gte: oneHourAgo
      }
    }
  });
  
  return !!duplicate;
}

// Track lead events
export async function trackLeadEvent(
  leadId: string, 
  event: string, 
  metadata?: any
) {
  try {
    await prisma.leadTracking.create({
      data: {
        leadId,
        event,
        metadata: metadata ? JSON.stringify(metadata) : null
      }
    });
    
    // Update lead status based on event
    switch(event) {
      case 'ACCEPTED':
        await prisma.lead.update({
          where: { id: leadId },
          data: { 
            status: 'ACCEPTED',
            acceptedAt: new Date()
          }
        });
        break;
      case 'REJECTED':
        await prisma.lead.update({
          where: { id: leadId },
          data: { 
            status: 'REJECTED',
            rejectedAt: new Date()
          }
        });
        break;
      case 'COMPLETED':
        await prisma.lead.update({
          where: { id: leadId },
          data: { 
            status: 'COMPLETED',
            completedAt: new Date()
          }
        });
        break;
    }
  } catch (error) {
    console.error('Error tracking lead event:', error);
  }
}

// Get lead statistics
export async function getLeadStatistics(partnerId?: string) {
  const where = partnerId ? { partnerId } : {};
  
  const [
    totalLeads,
    acceptedLeads,
    rejectedLeads,
    completedLeads,
    totalValue,
    averageScore
  ] = await Promise.all([
    prisma.lead.count({ where }),
    prisma.lead.count({ where: { ...where, status: 'ACCEPTED' } }),
    prisma.lead.count({ where: { ...where, status: 'REJECTED' } }),
    prisma.lead.count({ where: { ...where, status: 'COMPLETED' } }),
    prisma.lead.aggregate({
      where,
      _sum: { leadValue: true }
    }),
    prisma.lead.aggregate({
      where,
      _avg: { leadScore: true }
    })
  ]);
  
  const conversionRate = totalLeads > 0 
    ? Math.round((completedLeads / totalLeads) * 100) 
    : 0;
  
  return {
    totalLeads,
    acceptedLeads,
    rejectedLeads,
    completedLeads,
    conversionRate,
    totalValue: totalValue._sum.leadValue || 0,
    averageScore: Math.round(averageScore._avg.leadScore || 0),
    acceptanceRate: totalLeads > 0 
      ? Math.round((acceptedLeads / totalLeads) * 100) 
      : 0
  };
}