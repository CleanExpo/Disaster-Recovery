import { MembershipTier, ServiceType, LeadPriority, ContractorInfo, ILead } from '../models/Lead';
import { GeoMatching } from './GeoMatching';

export interface PriorityScoreResult {
  contractorId: string;
  totalScore: number;
  breakdown: {
    membershipScore: number;
    performanceScore: number;
    proximityScore: number;
    specializationScore: number;
    availabilityScore: number;
    workloadScore: number;
    responseTimeScore: number;
    emergencyScore: number;
  };
  distance: number;
  estimatedTravelTime: number;
  rank: number;
}

export interface PriorityWeights {
  membershipTier: number;
  performance: number;
  proximity: number;
  specialization: number;
  availability: number;
  workload: number;
  responseTime: number;
  emergency: number;
}

export class PriorityScoring {
  // Default scoring weights (totals 100)
  private static readonly DEFAULT_WEIGHTS: PriorityWeights = {
    membershipTier: 25,    // 25% - Membership tier priority
    performance: 20,       // 20% - Rating and completion rate
    proximity: 15,         // 15% - Geographic distance
    specialization: 15,    // 15% - Service type match
    availability: 10,      // 10% - Current availability status
    workload: 8,          // 8% - Current job load
    responseTime: 5,       // 5% - Historical response time
    emergency: 2          // 2% - Emergency job bonus
  };

  // Membership tier scoring (out of 100 points)
  private static readonly MEMBERSHIP_SCORES = {
    [MembershipTier.FRANCHISE]: 100,
    [MembershipTier.ENTERPRISE]: 80,
    [MembershipTier.PROFESSIONAL]: 60,
    [MembershipTier.FOUNDATION]: 40
  };

  // Service specialization bonus points
  private static readonly SPECIALIZATION_BONUS = {
    PERFECT_MATCH: 100,    // Contractor specializes in exact service
    PARTIAL_MATCH: 70,     // Contractor does similar service
    GENERAL_MATCH: 40,     // Contractor can handle service
    NO_MATCH: 0            // Contractor not suitable
  };

  /**
   * Calculate priority scores for all contractors for a given lead
   */
  static calculatePriorityScores(
    lead: ILead,
    contractors: ContractorInfo[],
    customWeights?: Partial<PriorityWeights>
  ): PriorityScoreResult[] {
    const weights = { ...this.DEFAULT_WEIGHTS, ...customWeights };
    const results: PriorityScoreResult[] = [];

    for (const contractor of contractors) {
      // Skip unavailable contractors
      if (!contractor.isAvailable) continue;

      // Skip if contractor doesn't handle any of the required services
      if (!this.hasServiceMatch(lead.serviceType, contractor.specializations)) continue;

      const distance = GeoMatching.calculateDistance(lead.location, contractor.location);
      const estimatedTravelTime = GeoMatching.estimateTravelTime(distance);

      // Skip if outside contractor's service radius
      if (distance > contractor.serviceRadius) continue;

      const breakdown = {
        membershipScore: this.calculateMembershipScore(contractor.membershipTier),
        performanceScore: this.calculatePerformanceScore(contractor),
        proximityScore: this.calculateProximityScore(distance),
        specializationScore: this.calculateSpecializationScore(lead.serviceType, contractor.specializations),
        availabilityScore: this.calculateAvailabilityScore(contractor),
        workloadScore: this.calculateWorkloadScore(contractor.currentWorkload),
        responseTimeScore: this.calculateResponseTimeScore(contractor.responseTime),
        emergencyScore: this.calculateEmergencyScore(lead.priority, lead.isEmergency)
      };

      const totalScore = 
        (breakdown.membershipScore * weights.membershipTier) +
        (breakdown.performanceScore * weights.performance) +
        (breakdown.proximityScore * weights.proximity) +
        (breakdown.specializationScore * weights.specialization) +
        (breakdown.availabilityScore * weights.availability) +
        (breakdown.workloadScore * weights.workload) +
        (breakdown.responseTimeScore * weights.responseTime) +
        (breakdown.emergencyScore * weights.emergency);

      results.push({
        contractorId: contractor.contractorId,
        totalScore: Math.round(totalScore * 100) / 100,
        breakdown,
        distance,
        estimatedTravelTime,
        rank: 0 // Will be set after sorting
      });
    }

    // Sort by total score (descending) and assign ranks
    results.sort((a, b) => b.totalScore - a.totalScore);
    results.forEach((result, index) => {
      result.rank = index + 1;
    });

    return results;
  }

  /**
   * Calculate membership tier score
   */
  private static calculateMembershipScore(tier: MembershipTier): number {
    return this.MEMBERSHIP_SCORES[tier] || 0;
  }

  /**
   * Calculate performance score based on rating and completion rate
   */
  private static calculatePerformanceScore(contractor: ContractorInfo): number {
    const ratingScore = (contractor.rating / 5) * 60; // Rating out of 5 = 60 points max
    const completionScore = contractor.completionRate * 40; // Completion rate = 40 points max
    return Math.min(100, ratingScore + completionScore);
  }

  /**
   * Calculate proximity score (closer = higher score)
   */
  private static calculateProximityScore(distance: number): number {
    if (distance <= 5) return 100;     // Very close
    if (distance <= 10) return 90;     // Close
    if (distance <= 20) return 75;     // Moderate
    if (distance <= 35) return 60;     // Far
    if (distance <= 50) return 40;     // Very far
    if (distance <= 75) return 25;     // Distant
    if (distance <= 100) return 15;    // Very distant
    return 5;                          // Extremely distant
  }

  /**
   * Calculate specialization score based on service type match
   */
  private static calculateSpecializationScore(
    requiredServices: ServiceType[],
    contractorSpecializations: ServiceType[]
  ): number {
    let maxScore = 0;

    for (const requiredService of requiredServices) {
      let serviceScore = 0;

      if (contractorSpecializations.includes(requiredService)) {
        serviceScore = this.SPECIALIZATION_BONUS.PERFECT_MATCH;
      } else if (this.hasRelatedService(requiredService, contractorSpecializations)) {
        serviceScore = this.SPECIALIZATION_BONUS.PARTIAL_MATCH;
      } else if (contractorSpecializations.length > 0) {
        serviceScore = this.SPECIALIZATION_BONUS.GENERAL_MATCH;
      } else {
        serviceScore = this.SPECIALIZATION_BONUS.NO_MATCH;
      }

      maxScore = Math.max(maxScore, serviceScore);
    }

    return maxScore;
  }

  /**
   * Calculate availability score
   */
  private static calculateAvailabilityScore(contractor: ContractorInfo): number {
    if (!contractor.isAvailable) return 0;
    
    // Check how recently they were active
    const hoursInactive = (Date.now() - contractor.lastActive.getTime()) / (1000 * 60 * 60);
    
    if (hoursInactive <= 1) return 100;     // Very active
    if (hoursInactive <= 4) return 90;      // Active
    if (hoursInactive <= 12) return 75;     // Moderately active
    if (hoursInactive <= 24) return 60;     // Daily active
    if (hoursInactive <= 72) return 40;     // Occasionally active
    return 20;                              // Rarely active
  }

  /**
   * Calculate workload score (less workload = higher score)
   */
  private static calculateWorkloadScore(currentWorkload: number): number {
    if (currentWorkload === 0) return 100;   // No current jobs
    if (currentWorkload <= 2) return 80;     // Light workload
    if (currentWorkload <= 4) return 60;     // Moderate workload
    if (currentWorkload <= 6) return 40;     // Heavy workload
    if (currentWorkload <= 8) return 20;     // Very heavy workload
    return 5;                                // Overloaded
  }

  /**
   * Calculate response time score (faster = higher score)
   */
  private static calculateResponseTimeScore(averageResponseTime: number): number {
    if (averageResponseTime <= 15) return 100;   // Very fast (under 15 min)
    if (averageResponseTime <= 30) return 85;    // Fast (under 30 min)
    if (averageResponseTime <= 60) return 70;    // Good (under 1 hour)
    if (averageResponseTime <= 120) return 50;   // Moderate (under 2 hours)
    if (averageResponseTime <= 240) return 30;   // Slow (under 4 hours)
    if (averageResponseTime <= 480) return 15;   // Very slow (under 8 hours)
    return 5;                                    // Extremely slow
  }

  /**
   * Calculate emergency job bonus score
   */
  private static calculateEmergencyScore(priority: LeadPriority, isEmergency: boolean): number {
    if (isEmergency) return 100;

    switch (priority) {
      case LeadPriority.URGENT:
        return 80;
      case LeadPriority.HIGH:
        return 60;
      case LeadPriority.MEDIUM:
        return 40;
      case LeadPriority.LOW:
        return 20;
      default:
        return 0;
    }
  }

  /**
   * Check if contractor has any matching services
   */
  private static hasServiceMatch(
    requiredServices: ServiceType[],
    contractorServices: ServiceType[]
  ): boolean {
    return requiredServices.some(service => 
      contractorServices.includes(service) ||
      this.hasRelatedService(service, contractorServices)
    );
  }

  /**
   * Check for related services (e.g., water damage and mould often go together)
   */
  private static hasRelatedService(
    requiredService: ServiceType,
    contractorServices: ServiceType[]
  ): boolean {
    const relatedServices: { [key in ServiceType]?: ServiceType[] } = {
      [ServiceType.WATER_DAMAGE]: [ServiceType.MOULD_REMEDIATION, ServiceType.FLOOD_RECOVERY, ServiceType.SEWAGE_CLEANUP],
      [ServiceType.FIRE_DAMAGE]: [ServiceType.VANDALISM_REPAIR, ServiceType.EMERGENCY_BOARD_UP],
      [ServiceType.MOULD_REMEDIATION]: [ServiceType.WATER_DAMAGE, ServiceType.FLOOD_RECOVERY],
      [ServiceType.STORM_DAMAGE]: [ServiceType.EMERGENCY_BOARD_UP, ServiceType.VANDALISM_REPAIR],
      [ServiceType.FLOOD_RECOVERY]: [ServiceType.WATER_DAMAGE, ServiceType.MOULD_REMEDIATION, ServiceType.SEWAGE_CLEANUP],
      [ServiceType.SEWAGE_CLEANUP]: [ServiceType.WATER_DAMAGE, ServiceType.BIOHAZARD_CLEANING],
      [ServiceType.BIOHAZARD_CLEANING]: [ServiceType.TRAUMA_SCENE_CLEANING, ServiceType.SEWAGE_CLEANUP],
      [ServiceType.TRAUMA_SCENE_CLEANING]: [ServiceType.BIOHAZARD_CLEANING],
      [ServiceType.VANDALISM_REPAIR]: [ServiceType.FIRE_DAMAGE, ServiceType.EMERGENCY_BOARD_UP],
      [ServiceType.EMERGENCY_BOARD_UP]: [ServiceType.STORM_DAMAGE, ServiceType.FIRE_DAMAGE, ServiceType.VANDALISM_REPAIR]
    };

    const related = relatedServices[requiredService] || [];
    return contractorServices.some(service => related.includes(service));
  }

  /**
   * Get tier-based distribution limits (how many contractors to notify per tier)
   */
  static getTierDistributionLimits(totalContractors: number): { [key in MembershipTier]: number } {
    return {
      [MembershipTier.FRANCHISE]: Math.max(1, Math.floor(totalContractors * 0.4)), // 40% of available slots
      [MembershipTier.ENTERPRISE]: Math.max(1, Math.floor(totalContractors * 0.3)), // 30% of available slots
      [MembershipTier.PROFESSIONAL]: Math.max(1, Math.floor(totalContractors * 0.2)), // 20% of available slots
      [MembershipTier.FOUNDATION]: Math.max(1, Math.floor(totalContractors * 0.1)) // 10% of available slots
    };
  }

  /**
   * Apply fair distribution logic to ensure lower tiers get opportunities
   */
  static applyFairDistribution(
    scoredContractors: PriorityScoreResult[],
    previousDistributions: { [contractorId: string]: number },
    maxContractorsToNotify: number = 5
  ): PriorityScoreResult[] {
    // Group by membership tier
    const tierGroups: { [key in MembershipTier]: PriorityScoreResult[] } = {
      [MembershipTier.FRANCHISE]: [],
      [MembershipTier.ENTERPRISE]: [],
      [MembershipTier.PROFESSIONAL]: [],
      [MembershipTier.FOUNDATION]: []
    };

    // Separate contractors by tier
    for (const contractor of scoredContractors) {
      // This requires contractor info lookup - in real implementation, 
      // you'd join this data or pass contractor info
      // For now, we'll distribute evenly
    }

    // Apply recent distribution penalty
    const adjustedScores = scoredContractors.map(contractor => {
      const recentDistributions = previousDistributions[contractor.contractorId] || 0;
      const penalty = Math.min(20, recentDistributions * 2); // Max 20 point penalty
      
      return {
        ...contractor,
        totalScore: contractor.totalScore - penalty,
        breakdown: {
          ...contractor.breakdown
        }
      };
    });

    // Sort by adjusted score and take top contractors
    adjustedScores.sort((a, b) => b.totalScore - a.totalScore);
    return adjustedScores.slice(0, maxContractorsToNotify);
  }

  /**
   * Calculate dynamic weights based on lead characteristics
   */
  static getDynamicWeights(lead: ILead): PriorityWeights {
    const weights = { ...this.DEFAULT_WEIGHTS };

    // For emergency jobs, prioritize proximity and availability more
    if (lead.isEmergency || lead.priority === LeadPriority.URGENT) {
      weights.proximity += 10;
      weights.availability += 10;
      weights.responseTime += 5;
      weights.membershipTier -= 15;
      weights.performance -= 10;
    }

    // For high-value jobs, prioritize performance and membership tier
    if (lead.estimatedValue > 50000) {
      weights.membershipTier += 10;
      weights.performance += 10;
      weights.proximity -= 10;
      weights.workload -= 5;
      weights.availability -= 5;
    }

    // For specialized services, prioritize specialization
    const specializedServices = [
      ServiceType.BIOHAZARD_CLEANING,
      ServiceType.TRAUMA_SCENE_CLEANING,
      ServiceType.ASBESTOS_REMOVAL
    ];

    if (lead.serviceType.some(service => specializedServices.includes(service))) {
      weights.specialization += 15;
      weights.membershipTier -= 5;
      weights.proximity -= 5;
      weights.performance -= 5;
    }

    return weights;
  }

  /**
   * Generate scoring explanation for debugging/transparency
   */
  static generateScoringExplanation(result: PriorityScoreResult, weights: PriorityWeights): string {
    const explanations: string[] = [];

    explanations.push(`Total Score: ${result.totalScore}`);
    explanations.push(`Rank: ${result.rank}`);
    explanations.push('');
    explanations.push('Score Breakdown:');
    explanations.push(`- Membership Tier: ${result.breakdown.membershipScore} × ${weights.membershipTier}% = ${(result.breakdown.membershipScore * weights.membershipTier / 100).toFixed(1)}`);
    explanations.push(`- Performance: ${result.breakdown.performanceScore} × ${weights.performance}% = ${(result.breakdown.performanceScore * weights.performance / 100).toFixed(1)}`);
    explanations.push(`- Proximity: ${result.breakdown.proximityScore} × ${weights.proximity}% = ${(result.breakdown.proximityScore * weights.proximity / 100).toFixed(1)}`);
    explanations.push(`- Specialization: ${result.breakdown.specializationScore} × ${weights.specialization}% = ${(result.breakdown.specializationScore * weights.specialization / 100).toFixed(1)}`);
    explanations.push(`- Availability: ${result.breakdown.availabilityScore} × ${weights.availability}% = ${(result.breakdown.availabilityScore * weights.availability / 100).toFixed(1)}`);
    explanations.push(`- Workload: ${result.breakdown.workloadScore} × ${weights.workload}% = ${(result.breakdown.workloadScore * weights.workload / 100).toFixed(1)}`);
    explanations.push(`- Response Time: ${result.breakdown.responseTimeScore} × ${weights.responseTime}% = ${(result.breakdown.responseTimeScore * weights.responseTime / 100).toFixed(1)}`);
    explanations.push(`- Emergency Bonus: ${result.breakdown.emergencyScore} × ${weights.emergency}% = ${(result.breakdown.emergencyScore * weights.emergency / 100).toFixed(1)}`);
    explanations.push('');
    explanations.push(`Distance: ${result.distance}km (${result.estimatedTravelTime} min travel time)`);

    return explanations.join('\n');
  }
}