import { prisma } from '@/lib/prisma';

export interface MatchingCriteria {
  serviceCategory: string;
  location: string;
  urgency: string;
  budget?: string;
  insurance?: boolean;
  urgentResponse?: boolean;
}

export interface ContractorMatch {
  contractorId: string;
  matchScore: number;
  reasons: string[];
}

export class MatchingService {
  /**
   * Find the best contractors for a service request
   */
  static async findBestContractors(
    requestId: string,
    criteria: MatchingCriteria,
    limit: number = 5
  ): Promise<ContractorMatch[]> {
    try {
      // Get all available contractors
      const contractors = await prisma.contractorProfile.findMany({
        where: {
          availability: 'AVAILABLE',
          isVerified: true,
          services: {
            has: criteria.serviceCategory
          }
        },
        include: {
          user: true
        }
      });

      // Calculate match scores for each contractor
      const matches: ContractorMatch[] = [];

      for (const contractor of contractors) {
        const matchScore = this.calculateMatchScore(contractor, criteria);
        const reasons = this.getMatchReasons(contractor, criteria);

        if (matchScore > 30) { // Only include contractors with score > 30
          matches.push({
            contractorId: contractor.id,
            matchScore,
            reasons
          });
        }
      }

      // Sort by match score (highest first) and return top matches
      return matches
        .sort((a, b) => b.matchScore - a.matchScore)
        .slice(0, limit);

    } catch (error) {
      console.error('Error finding contractors:', error);
      throw new Error('Failed to find matching contractors');
    }
  }

  /**
   * Calculate match score between contractor and service request
   */
  private static calculateMatchScore(
    contractor: any,
    criteria: MatchingCriteria
  ): number {
    let score = 0;

    // Service category match (40 points)
    if (contractor.services.includes(criteria.serviceCategory)) {
      score += 40;
    }

    // Location match (25 points)
    const locationMatch = this.checkLocationMatch(contractor, criteria.location);
    score += locationMatch;

    // Experience bonus (20 points)
    const experienceScore = this.calculateExperienceScore(contractor.experience);
    score += experienceScore;

    // Rating bonus (15 points)
    const ratingScore = this.calculateRatingScore(contractor.rating, contractor.totalJobs);
    score += ratingScore;

    // Budget compatibility (10 points)
    const budgetScore = this.calculateBudgetScore(contractor.hourlyRate, criteria.budget);
    score += budgetScore;

    // Insurance match (15 points)
    if (criteria.insurance) {
      if (contractor.insuranceProvider && contractor.insuranceExpiry && contractor.insuranceExpiry > new Date()) {
        score += 15;
      } else {
        score -= 10; // Penalty for missing insurance when required
      }
    }

    // Urgency handling (10 points)
    const urgencyScore = this.calculateUrgencyScore(contractor, criteria.urgency, criteria.urgentResponse);
    score += urgencyScore;

    // Profile completeness bonus (5 points)
    const completenessScore = this.calculateProfileCompleteness(contractor);
    score += completenessScore;

    // Recent activity bonus (5 points)
    const activityScore = this.calculateActivityScore(contractor);
    score += activityScore;

    return Math.max(0, Math.min(score, 100)); // Ensure score is between 0-100
  }

  /**
   * Calculate experience score based on years of experience
   */
  private static calculateExperienceScore(experience: number): number {
    if (experience >= 10) return 20;
    if (experience >= 5) return 15;
    if (experience >= 2) return 10;
    if (experience >= 1) return 5;
    return 0;
  }

  /**
   * Calculate rating score based on rating and number of jobs
   */
  private static calculateRatingScore(rating: number, totalJobs: number): number {
    if (rating >= 4.8 && totalJobs >= 20) return 15;
    if (rating >= 4.5 && totalJobs >= 10) return 12;
    if (rating >= 4.0 && totalJobs >= 5) return 8;
    if (rating >= 3.5) return 5;
    return 0;
  }

  /**
   * Calculate budget compatibility score
   */
  private static calculateBudgetScore(hourlyRate: number, budget?: string): number {
    if (!budget || !hourlyRate) return 0;

    const budgetValue = parseFloat(budget.replace(/[^0-9.-]+/g, ''));
    if (isNaN(budgetValue)) return 0;

    const estimatedHours = budgetValue / hourlyRate;

    if (estimatedHours >= 8) return 10;
    if (estimatedHours >= 4) return 7;
    if (estimatedHours >= 2) return 5;
    return 0;
  }

  /**
   * Calculate urgency handling score
   */
  private static calculateUrgencyScore(contractor: any, urgency: string, urgentResponse?: boolean): number {
    if (contractor.availability !== 'AVAILABLE') return 0;

    if (urgency === 'emergency') return 10;
    if (urgency === 'urgent') return 7;
    if (urgentResponse) return 5;
    return 0;
  }

  /**
   * Calculate profile completeness score
   */
  private static calculateProfileCompleteness(contractor: any): number {
    const fields = ['businessName', 'phone', 'address', 'city', 'state', 'zipCode', 'bio', 'licenseNumber', 'insuranceProvider'];
    const completedFields = fields.filter(field => contractor[field]).length;
    const percentage = (completedFields / fields.length) * 100;

    if (percentage >= 90) return 5;
    if (percentage >= 70) return 3;
    return 0;
  }

  /**
   * Calculate activity score based on total jobs
   */
  private static calculateActivityScore(contractor: any): number {
    if (contractor.totalJobs >= 50) return 5;
    if (contractor.totalJobs >= 20) return 3;
    if (contractor.totalJobs >= 5) return 1;
    return 0;
  }

  /**
   * Check if contractor serves the requested location
   */
  private static checkLocationMatch(contractor: any, requestLocation: string): number {
    // Simple location matching - in real app, use geocoding
    const contractorAreas = contractor.serviceAreas || [];
    const requestCity = requestLocation.toLowerCase().split(',')[0].trim();
    
    for (const area of contractorAreas) {
      if (area.toLowerCase().includes(requestCity)) {
        return 25; // Full location match
      }
    }

    // Check if contractor is in same state/region
    if (contractor.city && requestLocation.toLowerCase().includes(contractor.city.toLowerCase())) {
      return 20; // Same city
    }

    return 0; // No location match
  }

  /**
   * Get reasons for the match
   */
  private static getMatchReasons(contractor: any, criteria: MatchingCriteria): string[] {
    const reasons: string[] = [];

    if (contractor.services.includes(criteria.serviceCategory)) {
      reasons.push('Service category match');
    }

    if (contractor.experience >= 5) {
      reasons.push('High experience');
    } else if (contractor.experience >= 2) {
      reasons.push('Good experience');
    }

    if (contractor.rating >= 4.5) {
      reasons.push('Excellent rating');
    } else if (contractor.rating >= 4.0) {
      reasons.push('Good rating');
    }

    if (contractor.availability === 'AVAILABLE') {
      reasons.push('Currently available');
    }

    if (criteria.insurance && contractor.insuranceProvider) {
      reasons.push('Insurance coverage');
    }

    return reasons;
  }

  /**
   * Create contractor matches in database
   */
  static async createMatches(
    requestId: string,
    matches: ContractorMatch[]
  ): Promise<void> {
    try {
      const matchRecords = matches.map(match => ({
        contractorId: match.contractorId,
        serviceRequestId: requestId,
        matchScore: match.matchScore,
        status: 'PENDING' as const
      }));

      await prisma.contractorMatch.createMany({
        data: matchRecords
      });

      // Update service request status to MATCHED
      await prisma.serviceRequest.update({
        where: { id: requestId },
        data: { status: 'MATCHED' }
      });

    } catch (error) {
      console.error('Error creating matches:', error);
      throw new Error('Failed to create contractor matches');
    }
  }

  /**
   * Get matches for a service request
   */
  static async getMatchesForRequest(requestId: string) {
    try {
      return await prisma.contractorMatch.findMany({
        where: { serviceRequestId: requestId },
        include: {
          contractor: {
            include: {
              user: true
            }
          },
          serviceRequest: true
        },
        orderBy: { matchScore: 'desc' }
      });
    } catch (error) {
      console.error('Error getting matches:', error);
      throw new Error('Failed to get contractor matches');
    }
  }
}
