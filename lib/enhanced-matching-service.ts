import { prisma } from './prisma';

export interface MatchCriteria {
  serviceCategory: string;
  location: string;
  urgency: string;
  budget?: number;
  leadScore?: number;
  tenantId?: string;
}

export interface ContractorMatch {
  contractorId: string;
  matchScore: number;
  reasons: string[];
  canBid: boolean;
}

export class EnhancedMatchingService {
  /**
   * Find matching contractors for a service request
   */
  static async findMatchingContractors(
    requestId: string,
    criteria: MatchCriteria
  ): Promise<ContractorMatch[]> {
    try {
      // Get all contractors in the same tenant/industry
      const contractors = await prisma.contractorProfile.findMany({
        where: {
          tenantId: criteria.tenantId,
          availability: 'AVAILABLE',
          isVerified: true,
        },
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
      });

      const matches: ContractorMatch[] = [];

      for (const contractor of contractors) {
        const matchResult = this.calculateMatchScore(contractor, criteria);
        
        if (matchResult.score > 30) { // Minimum threshold
          matches.push({
            contractorId: contractor.id,
            matchScore: matchResult.score,
            reasons: matchResult.reasons,
            canBid: matchResult.canBid,
          });
        }
      }

      // Sort by match score
      matches.sort((a, b) => b.matchScore - a.matchScore);

      // Store matches in database
      await this.storeMatches(requestId, matches);

      return matches;
    } catch (error) {
      console.error('Enhanced matching error:', error);
      return [];
    }
  }

  /**
   * Calculate match score for a contractor
   */
  private static calculateMatchScore(contractor: any, criteria: MatchCriteria) {
    let score = 0;
    const reasons: string[] = [];
    let canBid = true;

    // Service category match (40 points)
    if (contractor.services.includes(criteria.serviceCategory)) {
      score += 40;
      reasons.push('Service category match');
    }

    // Location match (30 points)
    const locationMatch = contractor.serviceAreas.some((area: string) =>
      criteria.location.toLowerCase().includes(area.toLowerCase()) ||
      area.toLowerCase().includes(criteria.location.toLowerCase())
    );
    
    if (locationMatch) {
      score += 30;
      reasons.push('Location match');
    }

    // Urgency and availability (20 points)
    if (criteria.urgency === 'Emergency' && contractor.availability === 'AVAILABLE') {
      score += 20;
      reasons.push('Emergency availability');
    } else if (criteria.urgency === 'Urgent' && contractor.availability === 'AVAILABLE') {
      score += 15;
      reasons.push('Urgent availability');
    }

    // Lead score bonus (10 points)
    if (criteria.leadScore && criteria.leadScore > 70) {
      score += 10;
      reasons.push('High-value lead');
    }

    // Budget compatibility (5 points)
    if (criteria.budget && contractor.hourlyRate) {
      const estimatedHours = Math.ceil(criteria.budget / contractor.hourlyRate);
      if (estimatedHours >= 1 && estimatedHours <= 10) {
        score += 5;
        reasons.push('Budget compatibility');
      }
    }

    // Rating bonus (5 points)
    if (contractor.rating >= 4.5) {
      score += 5;
      reasons.push('High rating');
    }

    // Experience bonus (5 points)
    if (contractor.experience >= 5) {
      score += 5;
      reasons.push('Experienced contractor');
    }

    // Check if contractor can bid
    if (contractor.availability !== 'AVAILABLE') {
      canBid = false;
    }

    return { score, reasons, canBid };
  }

  /**
   * Store matches in database
   */
  private static async storeMatches(requestId: string, matches: ContractorMatch[]) {
    try {
      // Delete existing matches
      await prisma.contractorMatch.deleteMany({
        where: { serviceRequestId: requestId },
      });

      // Create new matches
      const matchData = matches.map(match => ({
        contractorId: match.contractorId,
        serviceRequestId: requestId,
        matchScore: match.matchScore,
        status: 'PENDING' as const,
      }));

      await prisma.contractorMatch.createMany({
        data: matchData,
      });
    } catch (error) {
      console.error('Store matches error:', error);
    }
  }

  /**
   * Get matches for a specific request
   */
  static async getRequestMatches(requestId: string) {
    try {
      const matches = await prisma.contractorMatch.findMany({
        where: { serviceRequestId: requestId },
        include: {
          contractor: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                  avatar: true,
                },
              },
            },
          },
        },
        orderBy: { matchScore: 'desc' },
      });

      return matches;
    } catch (error) {
      console.error('Get request matches error:', error);
      return [];
    }
  }

  /**
   * Update match status (accept/reject bid)
   */
  static async updateMatchStatus(
    matchId: string,
    status: 'ACCEPTED' | 'REJECTED' | 'EXPIRED'
  ) {
    try {
      const match = await prisma.contractorMatch.update({
        where: { id: matchId },
        data: { status },
      });

      // If accepted, update service request status
      if (status === 'ACCEPTED') {
        await prisma.serviceRequest.update({
          where: { id: match.serviceRequestId },
          data: { status: 'MATCHED' },
        });
      }

      return match;
    } catch (error) {
      console.error('Update match status error:', error);
      throw error;
    }
  }

  /**
   * Get contractor's bid history
   */
  static async getContractorBids(contractorId: string) {
    try {
      const bids = await prisma.contractorMatch.findMany({
        where: { contractorId },
        include: {
          serviceRequest: {
            include: {
              user: {
                select: {
                  id: true,
                  name: true,
                  email: true,
                },
              },
            },
          },
        },
        orderBy: { createdAt: 'desc' },
      });

      return bids;
    } catch (error) {
      console.error('Get contractor bids error:', error);
      return [];
    }
  }
}
