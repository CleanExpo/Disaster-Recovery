import { prisma } from '@/lib/prisma';

export interface LeadScoringCriteria {
  serviceCategory: string;
  urgency: string;
  budget?: string;
  description: string;
  location: string;
  phone?: string;
  insurance?: boolean;
  urgentResponse?: boolean;
  preferredTime?: string;
}

export class LeadScoringService {
  /**
   * Calculate lead score for a service request
   */
  static calculateLeadScore(criteria: LeadScoringCriteria): number {
    let score = 0;

    // Urgency scoring (25 points)
    score += this.getUrgencyScore(criteria.urgency);

    // Budget scoring (20 points)
    score += this.getBudgetScore(criteria.budget);

    // Description quality (15 points)
    score += this.getDescriptionScore(criteria.description);

    // Contact information (15 points)
    score += this.getContactScore(criteria.phone);

    // Service category value (10 points)
    score += this.getServiceCategoryScore(criteria.serviceCategory);

    // Insurance claim (10 points)
    if (criteria.insurance) {
      score += 10;
    }

    // Urgent response needed (5 points)
    if (criteria.urgentResponse) {
      score += 5;
    }

    // Preferred time specified (5 points)
    if (criteria.preferredTime) {
      score += 5;
    }

    return Math.min(score, 100); // Cap at 100
  }

  /**
   * Get urgency score
   */
  private static getUrgencyScore(urgency: string): number {
    switch (urgency.toLowerCase()) {
      case 'emergency':
        return 25;
      case 'urgent':
        return 20;
      case 'asap':
        return 15;
      case 'within-week':
        return 10;
      case 'flexible':
        return 5;
      default:
        return 0;
    }
  }

  /**
   * Get budget score
   */
  private static getBudgetScore(budget?: string): number {
    if (!budget) return 0;

    // Extract numeric value from budget string
    const budgetMatch = budget.match(/\$?(\d+(?:,\d{3})*(?:\.\d{2})?)/);
    if (!budgetMatch) return 0;

    const budgetValue = parseFloat(budgetMatch[1].replace(/,/g, ''));
    
    if (budgetValue >= 10000) return 20;
    if (budgetValue >= 5000) return 18;
    if (budgetValue >= 2000) return 15;
    if (budgetValue >= 1000) return 12;
    if (budgetValue >= 500) return 8;
    if (budgetValue >= 200) return 5;
    return 2;
  }

  /**
   * Get description quality score
   */
  private static getDescriptionScore(description: string): number {
    if (!description) return 0;

    const wordCount = description.split(' ').length;
    const hasDetails = description.length > 50;
    const hasSpecifics = /(damage|repair|install|replace|fix|restore)/i.test(description);

    let score = 0;

    // Length bonus
    if (wordCount >= 50) score += 8;
    else if (wordCount >= 25) score += 5;
    else if (wordCount >= 10) score += 3;

    // Detail bonus
    if (hasDetails) score += 4;

    // Specificity bonus
    if (hasSpecifics) score += 3;

    return Math.min(score, 15);
  }

  /**
   * Get contact information score
   */
  private static getContactScore(phone?: string): number {
    if (!phone) return 0;

    // Basic phone validation
    const phoneRegex = /^[\+]?[1-9][\d]{0,15}$/;
    const cleanPhone = phone.replace(/[\s\-\(\)]/g, '');

    if (phoneRegex.test(cleanPhone)) {
      return 15;
    }

    return 5; // Partial credit for any phone number
  }

  /**
   * Get service category value score
   */
  private static getServiceCategoryScore(category: string): number {
    // Higher value services get higher scores
    const highValueServices = [
      'water-damage-restoration',
      'fire-damage-restoration',
      'mold-remediation',
      'structural-repair',
      'electrical-work',
      'plumbing-work'
    ];

    const mediumValueServices = [
      'carpet-cleaning',
      'upholstery-cleaning',
      'tile-grout-cleaning',
      'air-duct-cleaning',
      'window-cleaning'
    ];

    if (highValueServices.includes(category)) return 10;
    if (mediumValueServices.includes(category)) return 7;
    return 5; // Default for other services
  }

  /**
   * Update lead score for a service request
   */
  static async updateLeadScore(requestId: string, score: number): Promise<void> {
    try {
      await prisma.serviceRequest.update({
        where: { id: requestId },
        data: { leadScore: score }
      });
    } catch (error) {
      console.error('Error updating lead score:', error);
      throw new Error('Failed to update lead score');
    }
  }

  /**
   * Get high-value leads
   */
  static async getHighValueLeads(limit: number = 10) {
    try {
      return await prisma.serviceRequest.findMany({
        where: {
          leadScore: {
            gte: 70 // High-value leads
          },
          status: {
            in: ['PENDING', 'MATCHED']
          }
        },
        include: {
          user: true
        },
        orderBy: {
          leadScore: 'desc'
        },
        take: limit
      });
    } catch (error) {
      console.error('Error getting high-value leads:', error);
      throw new Error('Failed to get high-value leads');
    }
  }

  /**
   * Get lead scoring analytics
   */
  static async getLeadScoringAnalytics() {
    try {
      const totalLeads = await prisma.serviceRequest.count();
      const highValueLeads = await prisma.serviceRequest.count({
        where: { leadScore: { gte: 70 } }
      });
      const mediumValueLeads = await prisma.serviceRequest.count({
        where: { 
          leadScore: { 
            gte: 40,
            lt: 70 
          } 
        }
      });
      const lowValueLeads = await prisma.serviceRequest.count({
        where: { leadScore: { lt: 40 } }
      });

      const avgScore = await prisma.serviceRequest.aggregate({
        _avg: {
          leadScore: true
        }
      });

      return {
        totalLeads,
        highValueLeads,
        mediumValueLeads,
        lowValueLeads,
        averageScore: avgScore._avg.leadScore || 0,
        conversionRate: totalLeads > 0 ? (highValueLeads / totalLeads) * 100 : 0
      };
    } catch (error) {
      console.error('Error getting lead scoring analytics:', error);
      throw new Error('Failed to get lead scoring analytics');
    }
  }
}
