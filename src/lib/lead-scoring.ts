/**
 * Lead Scoring System
 * Calculates lead quality score based on multiple factors
 * Score range: 0-100 (higher = better quality lead)
 */

export interface LeadData {
  urgency?: 'emergency' | 'urgent' | 'planning' | 'routine';
  serviceType?: string;
  propertyType?: 'commercial' | 'residential' | 'industrial';
  hasInsurance?: boolean;
  estimatedValue?: number;
  contactMethod?: 'phone' | 'email' | 'form' | 'chat';
  timeFrame?: 'immediate' | '24hours' | 'week' | 'month' | 'planning';
  previousCustomer?: boolean;
  referralSource?: string;
  location?: {
    suburb?: string;
    distance?: number; // km from service area
  };
}

/**
 * Calculate lead score based on various factors
 * @param data Lead information
 * @returns Score between 0-100
 */
export function calculateLeadScore(data: LeadData): number {
  let score = 0;
  
  // Urgency scoring (0-40 points)
  switch (data.urgency) {
    case 'emergency':
      score += 40;
      break;
    case 'urgent':
      score += 30;
      break;
    case 'planning':
      score += 15;
      break;
    case 'routine':
      score += 10;
      break;
    default:
      score += 5;
  }
  
  // Service type scoring (0-20 points)
  const highValueServices = ['water', 'fire', 'mould', 'flood', 'storm'];
  const mediumValueServices = ['carpet', 'structural', 'biohazard'];
  
  if (data.serviceType) {
    if (highValueServices.includes(data.serviceType.toLowerCase())) {
      score += 20;
    } else if (mediumValueServices.includes(data.serviceType.toLowerCase())) {
      score += 15;
    } else {
      score += 10;
    }
  }
  
  // Property type scoring (0-15 points)
  switch (data.propertyType) {
    case 'commercial':
      score += 15;
      break;
    case 'industrial':
      score += 12;
      break;
    case 'residential':
      score += 10;
      break;
    default:
      score += 5;
  }
  
  // Insurance scoring (0-10 points)
  if (data.hasInsurance) {
    score += 10;
  }
  
  // Estimated value scoring (0-10 points)
  if (data.estimatedValue) {
    if (data.estimatedValue >= 50000) {
      score += 10;
    } else if (data.estimatedValue >= 20000) {
      score += 8;
    } else if (data.estimatedValue >= 10000) {
      score += 6;
    } else if (data.estimatedValue >= 5000) {
      score += 4;
    } else {
      score += 2;
    }
  }
  
  // Contact method scoring (0-5 points)
  switch (data.contactMethod) {
    case 'phone':
      score += 5;
      break;
    case 'chat':
      score += 4;
      break;
    case 'form':
      score += 3;
      break;
    case 'email':
      score += 2;
      break;
  }
  
  // Time frame bonus (0-5 points)
  if (data.timeFrame === 'immediate') {
    score += 5;
  } else if (data.timeFrame === '24hours') {
    score += 4;
  }
  
  // Previous customer bonus (0-5 points)
  if (data.previousCustomer) {
    score += 5;
  }
  
  // Referral bonus (0-3 points)
  if (data.referralSource) {
    score += 3;
  }
  
  // Location scoring (0-2 points)
  if (data.location) {
    if (data.location.distance && data.location.distance <= 10) {
      score += 2;
    } else if (data.location.distance && data.location.distance <= 25) {
      score += 1;
    }
  }
  
  // Ensure score is within 0-100 range
  return Math.min(Math.max(score, 0), 100);
}

/**
 * Get lead priority based on score
 * @param score Lead score
 * @returns Priority level
 */
export function getLeadPriority(score: number): 'critical' | 'high' | 'medium' | 'low' {
  if (score >= 80) return 'critical';
  if (score >= 60) return 'high';
  if (score >= 40) return 'medium';
  return 'low';
}

/**
 * Get recommended response time based on score
 * @param score Lead score
 * @returns Recommended response time in minutes
 */
export function getResponseTime(score: number): number {
  if (score >= 80) return 15; // 15 minutes
  if (score >= 60) return 30; // 30 minutes
  if (score >= 40) return 60; // 1 hour
  return 240; // 4 hours
}

/**
 * Format lead score for display
 * @param score Lead score
 * @returns Formatted score with colour indicator
 */
export function formatLeadScore(score: number): {
  score: number;
  label: string;
  colour: string;
  priority: string;
} {
  const priority = getLeadPriority(score);
  
  return {
    score,
    label: `${score}/100`,
    colour: priority === 'critical' ? 'red' : 
           priority === 'high' ? 'orange' : 
           priority === 'medium' ? 'yellow' : 'gray',
    priority: priority.charAt(0).toUpperCase() + priority.slice(1)
  };
}

/**
 * Calculate conversion probability based on lead score
 * @param score Lead score
 * @returns Probability percentage (0-100)
 */
export function getConversionProbability(score: number): number {
  // Based on historical data, higher scores have better conversion rates
  if (score >= 90) return 95;
  if (score >= 80) return 85;
  if (score >= 70) return 70;
  if (score >= 60) return 55;
  if (score >= 50) return 40;
  if (score >= 40) return 25;
  if (score >= 30) return 15;
  return 10;
}

/**
 * Assign lead to appropriate team based on score and type
 * @param score Lead score
 * @param serviceType Service type
 * @returns Team assignment
 */
export function assignLeadToTeam(score: number, serviceType?: string): {
  team: string;
  assignee?: string;
  escalation: boolean;
} {
  const priority = getLeadPriority(score);
  
  // Critical leads go to senior team
  if (priority === 'critical') {
    return {
      team: 'Senior Response Team',
      assignee: 'senior-available',
      escalation: true
    };
  }
  
  // High priority leads go to experienced team
  if (priority === 'high') {
    return {
      team: 'Priority Response Team',
      assignee: 'priority-available',
      escalation: false
    };
  }
  
  // Service-specific routing for medium/low priority
  if (serviceType) {
    const specialisedServices = ['mould', 'biohazard', 'asbestos'];
    if (specialisedServices.includes(serviceType.toLowerCase())) {
      return {
        team: 'Specialist Team',
        assignee: 'specialist-available',
        escalation: false
      };
    }
  }
  
  // Default routing
  return {
    team: 'General Response Team',
    assignee: 'next-available',
    escalation: false
  };
}