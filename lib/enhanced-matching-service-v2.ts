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

export interface ClientMatch {
  requestId: string;
  matchScore: number;
  reasons: string[];
  canBid: boolean;
}

export class EnhancedMatchingServiceV2 {
  /**
   * Find matching contractors for a client's service request
   * Shows all contractors but prioritizes exact category + location matches
   */
  static async findMatchingContractorsForClient(
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
        const matchResult = this.calculateContractorMatchScore(contractor, criteria);
        
        // Include all contractors but with different scoring
        if (matchResult.score > 10) { // Lower threshold to include more
          matches.push({
            contractorId: contractor.id,
            matchScore: matchResult.score,
            reasons: matchResult.reasons,
            canBid: matchResult.canBid,
          });
        }
      }

      // Sort by match score (exact matches first, then others)
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
   * Find matching client requests for a contractor
   * Shows all requests but prioritizes exact category + location matches
   */
  static async findMatchingRequestsForContractor(
    contractorId: string,
    tenantId?: string
  ): Promise<ClientMatch[]> {
    try {
      // Get contractor profile and preferences
      const contractor = await prisma.contractorProfile.findUnique({
        where: { id: contractorId },
        include: {
          user: {
            include: {
              contractorPreferences: true
            }
          }
        }
      });

      if (!contractor) {
        return [];
      }

      // Get ALL requests (no filtering by category/location)
      const where: any = {
        status: 'PENDING',
        tenantId: contractor.tenantId || tenantId,
      };

      // Get all requests
      const requests = await prisma.serviceRequest.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              name: true,
              email: true,
            },
          },
        },
        orderBy: [
          { leadScore: 'desc' },
          { urgentResponse: 'desc' },
          { createdAt: 'desc' },
        ],
      });

      const matches: ClientMatch[] = [];

      for (const request of requests) {
        const matchResult = this.calculateRequestMatchScore(contractor, request);
        
        // Include all requests but with different scoring
        if (matchResult.score > 5) { // Very low threshold to include all
          matches.push({
            requestId: request.id,
            matchScore: matchResult.score,
            reasons: matchResult.reasons,
            canBid: matchResult.canBid,
          });
        }
      }

      // Sort by match score (exact matches first, then others)
      matches.sort((a, b) => b.matchScore - a.matchScore);

      return matches;
    } catch (error) {
      console.error('Enhanced contractor matching error:', error);
      return [];
    }
  }

  /**
   * Get contractors visible to a client for a specific request
   * Shows all contractors but prioritizes exact category + location matches
   */
  static async getContractorsForClientRequest(
    requestId: string,
    clientId: string
  ): Promise<ContractorMatch[]> {
    try {
      // Get the service request
      const serviceRequest = await prisma.serviceRequest.findUnique({
        where: { id: requestId },
        include: {
          user: {
            include: {
              preferences: true
            }
          }
        }
      });

      if (!serviceRequest) {
        return [];
      }

      // Get ALL contractors (no filtering by category/location)
      const where: any = {
        tenantId: serviceRequest.tenantId,
        availability: 'AVAILABLE',
        isVerified: true,
      };

      // Get all contractors
      const contractors = await prisma.contractorProfile.findMany({
        where,
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
        const matchResult = this.calculateContractorMatchScore(contractor, {
          serviceCategory: serviceRequest.serviceCategory,
          location: serviceRequest.location,
          urgency: serviceRequest.urgency,
          budget: serviceRequest.budget ? parseFloat(serviceRequest.budget) : undefined,
          leadScore: serviceRequest.leadScore,
          tenantId: serviceRequest.tenantId,
        });
        
        // Include all contractors but with different scoring
        if (matchResult.score > 5) { // Very low threshold to include all
          matches.push({
            contractorId: contractor.id,
            matchScore: matchResult.score,
            reasons: matchResult.reasons,
            canBid: matchResult.canBid,
          });
        }
      }

      // Sort by match score (exact matches first, then others)
      matches.sort((a, b) => b.matchScore - a.matchScore);

      return matches;
    } catch (error) {
      console.error('Enhanced client contractor matching error:', error);
      return [];
    }
  }

  /**
   * Calculate match score for a contractor against a service request
   */
  private static calculateContractorMatchScore(contractor: any, criteria: MatchCriteria) {
    let score = 0;
    const reasons: string[] = [];
    let canBid = true;

    // Service category match (40 points) - HIGH PRIORITY
    if (contractor.services.includes(criteria.serviceCategory)) {
      score += 40;
      reasons.push('Service category match');
    } else {
      // Still include but with lower score
      score += 5;
      reasons.push('Different service category');
    }

    // Location match (30 points) - HIGH PRIORITY
    const locationMatch = contractor.serviceAreas.some((area: string) =>
      criteria.location.toLowerCase().includes(area.toLowerCase()) ||
      area.toLowerCase().includes(criteria.location.toLowerCase())
    );
    
    if (locationMatch) {
      score += 30;
      reasons.push('Location match');
    } else {
      // Still include but with lower score
      score += 5;
      reasons.push('Different service area');
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
   * Calculate match score for a service request against a contractor
   */
  private static calculateRequestMatchScore(contractor: any, request: any) {
    let score = 0;
    const reasons: string[] = [];
    let canBid = true;

    // Service category match (40 points) - HIGH PRIORITY
    if (contractor.services.includes(request.serviceCategory)) {
      score += 40;
      reasons.push('Service category match');
    } else {
      // Still include but with lower score
      score += 5;
      reasons.push('Different service category');
    }

    // Location match (30 points) - HIGH PRIORITY
    const locationMatch = contractor.serviceAreas.some((area: string) =>
      request.location.toLowerCase().includes(area.toLowerCase()) ||
      area.toLowerCase().includes(request.location.toLowerCase())
    );
    
    if (locationMatch) {
      score += 30;
      reasons.push('Location match');
    } else {
      // Still include but with lower score
      score += 5;
      reasons.push('Different service area');
    }

    // Urgency and availability (20 points)
    if (request.urgency === 'Emergency' && contractor.availability === 'AVAILABLE') {
      score += 20;
      reasons.push('Emergency availability');
    } else if (request.urgency === 'Urgent' && contractor.availability === 'AVAILABLE') {
      score += 15;
      reasons.push('Urgent availability');
    }

    // Lead score bonus (10 points)
    if (request.leadScore && request.leadScore > 70) {
      score += 10;
      reasons.push('High-value lead');
    }

    // Budget compatibility (5 points)
    if (request.budget && contractor.hourlyRate) {
      const budgetValue = parseFloat(request.budget.replace(/[^0-9.-]+/g, ''));
      if (!isNaN(budgetValue)) {
        const estimatedHours = Math.ceil(budgetValue / contractor.hourlyRate);
        if (estimatedHours >= 1 && estimatedHours <= 10) {
          score += 5;
          reasons.push('Budget compatibility');
        }
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
