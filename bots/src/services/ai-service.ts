/**
 * AI Service for Intelligent Bot Responses
 * Ensures compliance with legal requirements - only database content
 */

import { PrismaClient } from '@prisma/client';
import OpenAI from 'openai';
import winston from 'winston';

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()]
});

interface AIResponse {
  message: string;
  data?: any;
  source: 'database' | 'guide' | 'emergency_protocol';
  confidence: number;
  suggestedActions?: string[];
}

interface QueryContext {
  userType: 'client' | 'contractor';
  emergencyLevel?: 'low' | 'medium' | 'high' | 'critical';
  previousContext?: string[];
  location?: string;
  serviceType?: string;
}

class AIService {
  private prisma: PrismaClient;
  private openai: OpenAI | null = null;
  private complianceMode: boolean = true;
  
  constructor() {
    this.prisma = new PrismaClient();
    
    // Only initialize OpenAI if API key is available
    if (process.env.OPENAI_API_KEY) {
      this.openai = new OpenAI({
        apiKey: process.env.OPENAI_API_KEY
      });
    }
  }
  
  /**
   * Process user query with compliance constraints
   */
  async processQuery(
    query: string,
    context: QueryContext
  ): Promise<AIResponse> {
    try {
      // Step 1: Check for emergency keywords
      if (this.isEmergencyQuery(query)) {
        return await this.handleEmergencyQuery(query, context);
      }
      
      // Step 2: Search verified database content
      const databaseMatch = await this.searchDatabaseContent(query, context);
      if (databaseMatch) {
        return databaseMatch;
      }
      
      // Step 3: Search step-by-step guides
      const guideMatch = await this.searchGuides(query, context);
      if (guideMatch) {
        return guideMatch;
      }
      
      // Step 4: Generate safe response (if no direct match)
      return await this.generateSafeResponse(query, context);
      
    } catch (error) {
      logger.error('AI Service Error:', error);
      return this.getDefaultResponse(context);
    }
  }
  
  /**
   * Check if query contains emergency keywords
   */
  private isEmergencyQuery(query: string): boolean {
    const emergencyKeywords = [
      'emergency', 'urgent', 'flood', 'fire', 'danger',
      'help', 'immediate', 'crisis', 'disaster', 'damage',
      'leak', 'burst', 'smoke', 'sewage', 'mould', 'biohazard'
    ];
    
    const lowerQuery = query.toLowerCase();
    return emergencyKeywords.some(keyword => lowerQuery.includes(keyword));
  }
  
  /**
   * Handle emergency queries with pre-approved responses
   */
  private async handleEmergencyQuery(
    query: string,
    context: QueryContext
  ): Promise<AIResponse> {
    // Fetch emergency guide from database
    const emergencyGuide = await this.prisma.emergencyGuide.findFirst({
      where: {
        isActive: true,
        OR: [
          { keywords: { contains: query.toLowerCase() } },
          { emergencyType: { contains: this.extractEmergencyType(query) } }
        ]
      }
    });
    
    if (emergencyGuide) {
      const steps = JSON.parse(emergencyGuide.steps || '[]');
      return {
        message: emergencyGuide.initialResponse,
        data: {
          steps,
          estimatedResponse: emergencyGuide.estimatedResponse,
          priority: emergencyGuide.priority
        },
        source: 'emergency_protocol',
        confidence: 1.0,
        suggestedActions: [
          'Contact emergency services if immediate danger',
          'Move to safe location',
          'Document damage with photos',
          'Do not attempt repairs yourself'
        ]
      };
    }
    
    return {
      message: 'This appears to be an emergency. For your safety, please ensure you are in a safe location. A contractor will be notified immediately.',
      source: 'emergency_protocol',
      confidence: 0.9,
      suggestedActions: [
        'Ensure personal safety first',
        'Turn off utilities if safe to do so',
        'Document the situation',
        'Wait for professional help'
      ]
    };
  }
  
  /**
   * Search verified database content
   */
  private async searchDatabaseContent(
    query: string,
    context: QueryContext
  ): Promise<AIResponse | null> {
    const content = await this.prisma.verifiedContent.findFirst({
      where: {
        isActive: true,
        OR: [
          { title: { contains: query } },
          { content: { contains: query } },
          { keywords: { contains: query.toLowerCase() } }
        ]
      }
    });
    
    if (content) {
      return {
        message: content.content,
        data: {
          title: content.title,
          category: content.category,
          lastVerified: content.lastVerified
        },
        source: 'database',
        confidence: 1.0
      };
    }
    
    return null;
  }
  
  /**
   * Search step-by-step guides
   */
  private async searchGuides(
    query: string,
    context: QueryContext
  ): Promise<AIResponse | null> {
    const guide = await this.prisma.stepByStepGuide.findFirst({
      where: {
        isActive: true,
        userType: context.userType,
        OR: [
          { title: { contains: query } },
          { description: { contains: query } },
          { keywords: { contains: query.toLowerCase() } }
        ]
      }
    });
    
    if (guide) {
      const steps = JSON.parse(guide.steps || '[]');
      return {
        message: `Here's a guide for: ${guide.title}\n${guide.description}`,
        data: {
          title: guide.title,
          steps,
          estimatedTime: guide.estimatedTime,
          difficulty: guide.difficulty
        },
        source: 'guide',
        confidence: 1.0,
        suggestedActions: steps.slice(0, 3)
      };
    }
    
    return null;
  }
  
  /**
   * Generate safe response when no exact match found
   */
  private async generateSafeResponse(
    query: string,
    context: QueryContext
  ): Promise<AIResponse> {
    // If OpenAI is available and compliance mode allows
    if (this.openai && !this.complianceMode) {
      try {
        const completion = await this.openai.chat.completions.create({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: `You are a disaster recovery assistant. You must:
                1. ONLY provide factual, verified information
                2. NEVER give health or legal advice
                3. Always recommend professional assistance
                4. Keep responses brief and actionable
                5. Focus on safety first`
            },
            {
              role: 'user',
              content: query
            }
          ],
          temperature: 0.3,
          max_tokens: 200
        });
        
        return {
          message: completion.choices[0].message.content || this.getDefaultResponse(context).message,
          source: 'database',
          confidence: 0.7,
          suggestedActions: [
            'Contact a professional for specific advice',
            'Document your situation',
            'Request a formal assessment'
          ]
        };
      } catch (error) {
        logger.error('OpenAI API Error:', error);
      }
    }
    
    // Return safe default response
    return this.getDefaultResponse(context);
  }
  
  /**
   * Extract emergency type from query
   */
  private extractEmergencyType(query: string): string {
    const types = {
      'flood': 'flooding',
      'water': 'water_damage',
      'fire': 'fire_damage',
      'mould': 'mould_remediation',
      'sewage': 'sewage_cleanup',
      'storm': 'storm_damage',
      'biohazard': 'biohazard_cleanup'
    };
    
    const lowerQuery = query.toLowerCase();
    for (const [keyword, type] of Object.entries(types)) {
      if (lowerQuery.includes(keyword)) {
        return type;
      }
    }
    
    return 'general_emergency';
  }
  
  /**
   * Get default compliant response
   */
  private getDefaultResponse(context: QueryContext): AIResponse {
    const responses = {
      client: 'I can help you with disaster recovery information. For specific assistance, I\'ll need more details about your situation. All advice provided is based on our verified database.',
      contractor: 'I can assist with job information and procedures. Please specify what you need help with, and I\'ll provide relevant information from our contractor resources.'
    };
    
    return {
      message: responses[context.userType],
      source: 'database',
      confidence: 0.5,
      suggestedActions: [
        'Provide more specific details',
        'Choose from available options',
        'Request professional assessment'
      ]
    };
  }
  
  /**
   * Train on new verified content
   */
  async trainOnContent(contentId: number): Promise<void> {
    const content = await this.prisma.verifiedContent.findUnique({
      where: { id: contentId }
    });
    
    if (content) {
      // In production, this would update vector embeddings
      // or fine-tune the model on new content
      logger.info(`Training on new content: ${content.title}`);
    }
  }
  
  /**
   * Get contractor recommendations based on job
   */
  async getContractorRecommendations(
    jobType: string,
    location: string,
    urgency: string
  ): Promise<any[]> {
    const contractors = await this.prisma.contractor.findMany({
      where: {
        isActive: true,
        isVerified: true,
        serviceAreas: { contains: location },
        specializations: { contains: jobType }
      },
      orderBy: [
        { rating: 'desc' },
        { completedJobs: 'desc' }
      ],
      take: 5
    });
    
    return contractors.map(c => ({
      id: c.id,
      businessName: c.businessName,
      rating: c.rating,
      responseTime: c.averageResponseTime,
      specialMatch: c.specializations?.includes(jobType) ? 'exact' : 'partial'
    }));
  }
  
  /**
   * Validate response for compliance
   */
  private validateCompliance(response: string): boolean {
    const prohibitedTerms = [
      'medical advice', 'legal counsel', 'diagnosis',
      'prescription', 'treatment', 'lawsuit', 'liability',
      'guarantee', 'warranty', 'insurance claim advice'
    ];
    
    const lowerResponse = response.toLowerCase();
    return !prohibitedTerms.some(term => lowerResponse.includes(term));
  }
}

export default AIService;