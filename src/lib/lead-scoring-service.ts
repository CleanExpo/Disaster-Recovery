export interface Lead {
  id: string;
  source?: string;
  engagementLevel?: number;
  responseTime?: number;
}

export class LeadScoringService {
  static calculateScore(lead: Lead): number {
    let score = 50; // Base score

    // Engagement level scoring
    if (lead.engagementLevel) {
      score += lead.engagementLevel * 10;
    }

    // Source scoring
    if (lead.source === 'referral') {
      score += 20;
    } else if (lead.source === 'organic') {
      score += 15;
    }

    // Response time scoring
    if (lead.responseTime && lead.responseTime < 3600) {
      score += 10;
    }

    return Math.min(100, Math.max(0, score));
  }

  static getLeadQuality(score: number): 'hot' | 'warm' | 'cold' {
    if (score >= 75) return 'hot';
    if (score >= 50) return 'warm';
    return 'cold';
  }
}

export default LeadScoringService;
