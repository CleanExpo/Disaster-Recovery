/**
 * Mock AI Service
 * Simulates AI responses for demo purposes
 */

interface MockAIResponse {
  content: string;
  model: string;
  usage: {
    prompt_tokens: number;
    completion_tokens: number;
    total_tokens: number;
  };
}

class MockAIService {
  private responses: Record<string, string[]> = {
    damage_assessment: [
      "Based on the description provided, this appears to be Category 2 water damage with significant structural impact. Immediate water extraction and drying is required to prevent mould growth. Estimated restoration time: 3-5 days.",
      "The fire damage assessment indicates Class B damage with smoke penetration throughout the property. Professional cleaning, air quality testing, and potential structural repairs needed. Timeline: 7-10 days.",
      "Storm damage evaluation shows compromised roof integrity and water intrusion. Temporary weatherproofing required immediately, followed by structural repairs. Estimated completion: 5-7 days."
    ],
    cost_estimation: [
      "Based on similar cases in the area, estimated restoration costs range from $15,000-$25,000. This includes water extraction, drying equipment, antimicrobial treatment, and restoration of affected materials.",
      "Fire damage restoration estimate: $35,000-$50,000. Includes smoke remediation, structural cleaning, content restoration, and necessary repairs to affected areas.",
      "Storm damage repair estimate: $20,000-$30,000. Covers emergency tarping, water mitigation, roof repairs, and interior restoration work."
    ],
    contractor_matching: [
      "Recommended contractors based on your requirements: 1) Rapid Response Restoration (4.8★, 30-min response), 2) Emergency Flood Services (4.6★, specializes in water damage), 3) Property Restoration Services (4.7★, available 24/7).",
      "Top matches for your emergency: 1) Fire Damage Specialists (4.9★, certified for fire restoration), 2) Crisis Response Team (4.7★, immediate availability), 3) Disaster Recovery Professionals (4.8★, insurance approved)."
    ],
    insurance_guidance: [
      "Your insurance policy likely covers this type of water damage under 'sudden and accidental' provisions. Document all damage with photos, keep receipts, and request an adjuster visit within 48 hours.",
      "Fire damage is typically covered under standard homeowners policies. Ensure you document pre-existing conditions, maintain an inventory of damaged items, and coordinate with your adjuster for proper claim filing."
    ]
  };

  async processRequest(prompt: string, context?: any): Promise<MockAIResponse> {
    // Simulate API delay
    await new Promise(resolve => setTimeout(resolve, 800 + Math.random() * 400));
    
    // Determine response type based on prompt content
    let responseType = 'damage_assessment';
    if (prompt.toLowerCase().includes('cost') || prompt.toLowerCase().includes('estimate')) {
      responseType = 'cost_estimation';
    } else if (prompt.toLowerCase().includes('contractor') || prompt.toLowerCase().includes('match')) {
      responseType = 'contractor_matching';
    } else if (prompt.toLowerCase().includes('insurance') || prompt.toLowerCase().includes('claim')) {
      responseType = 'insurance_guidance';
    }
    
    const responses = this.responses[responseType];
    const response = responses[Math.floor(Math.random() * responses.length)];
    
    return {
      content: response,
      model: 'mock-gpt-oss-120b',
      usage: {
        prompt_tokens: prompt.length,
        completion_tokens: response.length,
        total_tokens: prompt.length + response.length
      }
    };
  }

  async orchestrate(message: string, useCase: string): Promise<any> {
    // Simulate orchestration between models
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const responses: Record<string, any> = {
      'emergency-triage': {
        urgencyLevel: 'high',
        recommendedAction: 'Dispatch emergency contractor immediately',
        estimatedResponseTime: '30 minutes',
        requiredServices: ['water-extraction', 'structural-drying', 'mould-prevention']
      },
      'damage-assessment': {
        damageCategory: 'Category 2 Water Damage',
        affectedAreas: ['kitchen', 'living room', 'hallway'],
        urgentActions: ['Stop water source', 'Extract standing water', 'Begin drying process'],
        estimatedRestoration: '3-5 days'
      },
      'contractor-selection': {
        recommendedContractors: [
          { id: 'contractor_1', name: 'Rapid Response', score: 95 },
          { id: 'contractor_5', name: 'Emergency Services', score: 92 },
          { id: 'contractor_8', name: 'Water Damage Experts', score: 88 }
        ],
        selectionCriteria: ['proximity', 'availability', 'specialisation', 'rating']
      }
    };
    
    return {
      success: true,
      result: responses[useCase] || responses['damage-assessment'],
      model: 'orchestrated-mock',
      timestamp: new Date().toISOString()
    };
  }
}

export const mockAIService = new MockAIService();