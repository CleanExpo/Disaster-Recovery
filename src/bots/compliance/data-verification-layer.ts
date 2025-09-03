/**
 * Data Verification Layer
 * Ensures all bot responses use only verified data from database
 * No health or legal advice - only factual information from approved sources
 */

import { PrismaClient } from '@prisma/client';

// ============================================
// LEGAL COMPLIANCE CONFIGURATION
// ============================================

export const COMPLIANCE_CONFIG = {
  disclaimers: {
    general: "This information is for general guidance only and is based on your specific service data. For emergency situations, please call 000.",
    noHealthAdvice: "We cannot provide medical or health advice. Please consult qualified healthcare professionals for health concerns.",
    noLegalAdvice: "We cannot provide legal advice. Please consult qualified legal professionals for legal matters.",
    dataSource: "All information provided is sourced from our verified contractor database and approved procedures."
  },
  
  prohibitedTopics: [
    'medical diagnosis',
    'health treatment',
    'legal rights',
    'legal action',
    'insurance legal matters',
    'compensation advice',
    'liability determination',
    'fault assessment',
    'medical symptoms',
    'health risks assessment'
  ],
  
  allowedTopics: [
    'service procedures',
    'contractor availability',
    'service areas',
    'equipment information',
    'timing estimates',
    'cost ranges',
    'insurance claim process',
    'emergency procedures',
    'safety guidelines from approved sources',
    'contractor qualifications'
  ]
};

// ============================================
// DATA VERIFICATION SERVICE
// ============================================

export class DataVerificationService {
  private prisma: PrismaClient;
  private verifiedDataCache: Map<string, any> = new Map();
  
  constructor() {
    this.prisma = new PrismaClient();
  }
  
  /**
   * Verify and filter response to ensure compliance
   */
  async verifyResponse(
    responseType: string,
    rawResponse: string,
    dataSource?: string
  ): Promise<{
    verified: boolean;
    response: string;
    sources: string[];
    disclaimers: string[];
  }> {
    // Check for prohibited content
    const containsProhibited = this.checkProhibitedContent(rawResponse);
    if (containsProhibited.found) {
      return {
        verified: false,
        response: this.getComplianceAlternative(containsProhibited.topic),
        sources: [],
        disclaimers: [COMPLIANCE_CONFIG.disclaimers.general]
      };
    }
    
    // Verify data source
    const verifiedData = await this.verifyDataSource(responseType, dataSource);
    if (!verifiedData.verified) {
      return {
        verified: false,
        response: "I can only provide information from our verified database. Please rephrase your question about our services.",
        sources: [],
        disclaimers: [COMPLIANCE_CONFIG.disclaimers.dataSource]
      };
    }
    
    // Add appropriate disclaimers
    const disclaimers = this.getRequiredDisclaimers(responseType);
    
    return {
      verified: true,
      response: rawResponse,
      sources: verifiedData.sources,
      disclaimers
    };
  }
  
  /**
   * Check for prohibited content
   */
  private checkProhibitedContent(content: string): {
    found: boolean;
    topic?: string;
  } {
    const lowerContent = content.toLowerCase();
    
    for (const topic of COMPLIANCE_CONFIG.prohibitedTopics) {
      if (lowerContent.includes(topic)) {
        return { found: true, topic };
      }
    }
    
    // Check for medical/legal advice patterns
    const advicePatterns = [
      /you should see a (doctor|lawyer)/i,
      /medical advice/i,
      /legal advice/i,
      /diagnos(is|e)/i,
      /treatment for/i,
      /sue |lawsuit/i,
      /your rights/i,
      /compensation claim/i
    ];
    
    for (const pattern of advicePatterns) {
      if (pattern.test(content)) {
        return { found: true, topic: 'advice' };
      }
    }
    
    return { found: false };
  }
  
  /**
   * Get compliance-safe alternative response
   */
  private getComplianceAlternative(topic?: string): string {
    const alternatives: Record<string, string> = {
      'medical diagnosis': "I cannot provide medical information. For health concerns related to property damage (like mould), our contractors follow Australian safety standards. Consult healthcare professionals for health advice.",
      'legal rights': "I cannot provide legal advice. For questions about your rights, please consult a qualified legal professional. I can help you understand our service procedures and contractor network.",
      'insurance legal matters': "For legal matters regarding insurance, please consult your insurer or a legal professional. I can help explain our standard claim processing procedures.",
      'health risks assessment': "I cannot assess health risks. Our contractors follow WorkSafe guidelines and Australian standards for all remediation work.",
      'default': "I can only provide information about our contractor services, availability, and standard procedures from our database."
    };
    
    return alternatives[topic || 'default'] || alternatives.default;
  }
  
  /**
   * Verify data comes from approved database sources
   */
  private async verifyDataSource(
    responseType: string,
    dataSource?: string
  ): Promise<{
    verified: boolean;
    sources: string[];
  }> {
    try {
      const sources: string[] = [];
      
      switch (responseType) {
        case 'contractor_info':
          // Verify contractor exists in database
          const contractor = await this.prisma.contractor.findFirst({
            where: { id: dataSource }
          });
          if (contractor) {
            sources.push(`Contractor Database: ${contractor.businessName}`);
            return { verified: true, sources };
          }
          break;
          
        case 'service_procedure':
          // Verify procedure exists in database
          const procedure = await this.prisma.serviceProcedure.findFirst({
            where: { id: dataSource }
          });
          if (procedure) {
            sources.push(`Approved Procedures: ${procedure.title}`);
            return { verified: true, sources };
          }
          break;
          
        case 'emergency_guide':
          // Verify emergency guide exists
          const guide = await this.prisma.emergencyGuide.findFirst({
            where: { id: dataSource }
          });
          if (guide) {
            sources.push(`Emergency Guidelines: ${guide.title}`);
            return { verified: true, sources };
          }
          break;
          
        case 'insurance_process':
          // Verify insurance process info
          const process = await this.prisma.insuranceProcess.findFirst({
            where: { id: dataSource }
          });
          if (process) {
            sources.push(`Insurance Procedures: ${process.insurerName}`);
            return { verified: true, sources };
          }
          break;
          
        default:
          // Check general verified content
          const content = await this.prisma.verifiedContent.findFirst({
            where: { 
              type: responseType,
              active: true
            }
          });
          if (content) {
            sources.push(`Verified Content: ${content.title}`);
            return { verified: true, sources };
          }
      }
      
      return { verified: false, sources: [] };
      
    } catch (error) {
      console.error('Data verification error:', error);
      return { verified: false, sources: [] };
    }
  }
  
  /**
   * Get required disclaimers based on response type
   */
  private getRequiredDisclaimers(responseType: string): string[] {
    const disclaimers = [COMPLIANCE_CONFIG.disclaimers.general];
    
    const typeDisclaimers: Record<string, string[]> = {
      'emergency_response': [
        "For immediate danger, call 000.",
        "Response times are estimates based on contractor availability."
      ],
      'insurance_claim': [
        "Insurance coverage varies by policy. Contact your insurer for specific coverage details.",
        COMPLIANCE_CONFIG.disclaimers.noLegalAdvice
      ],
      'safety_procedure': [
        "Safety procedures are general guidelines. Assess your specific situation.",
        COMPLIANCE_CONFIG.disclaimers.noHealthAdvice
      ],
      'cost_estimate': [
        "Costs are estimates only. Final pricing depends on actual damage assessment."
      ],
      'mould_remediation': [
        COMPLIANCE_CONFIG.disclaimers.noHealthAdvice,
        "Our contractors follow IICRC S520 standards for mould remediation."
      ]
    };
    
    if (typeDisclaimers[responseType]) {
      disclaimers.push(...typeDisclaimers[responseType]);
    }
    
    disclaimers.push(COMPLIANCE_CONFIG.disclaimers.dataSource);
    
    return [...new Set(disclaimers)]; // Remove duplicates
  }
}

// ============================================
// STEP-BY-STEP GUIDE RETRIEVAL
// ============================================

export class StepByStepGuideService {
  private prisma: PrismaClient;
  
  constructor() {
    this.prisma = new PrismaClient();
  }
  
  /**
   * Get verified step-by-step guide from database
   */
  async getGuide(
    guideType: string,
    userType: 'customer' | 'contractor'
  ): Promise<{
    found: boolean;
    title: string;
    steps: Array<{
      stepNumber: number;
      title: string;
      description: string;
      warningNotes?: string[];
      estimatedTime?: string;
      requiredTools?: string[];
    }>;
    disclaimers: string[];
    lastUpdated: Date;
    source: string;
  } | null> {
    try {
      // Fetch guide from database
      const guide = await this.prisma.stepByStepGuide.findFirst({
        where: {
          type: guideType,
          userType: userType,
          active: true
        },
        include: {
          steps: {
            orderBy: { stepNumber: 'asc' }
          }
        }
      });
      
      if (!guide) {
        return null;
      }
      
      // Format steps with compliance check
      const formattedSteps = guide.steps.map(step => ({
        stepNumber: step.stepNumber,
        title: step.title,
        description: this.sanitizeStepDescription(step.description),
        warningNotes: step.warningNotes ? 
          step.warningNotes.filter(note => !this.containsProhibitedContent(note)) : 
          undefined,
        estimatedTime: step.estimatedTime || undefined,
        requiredTools: step.requiredTools || undefined
      }));
      
      // Add appropriate disclaimers
      const disclaimers = [
        COMPLIANCE_CONFIG.disclaimers.general,
        `This guide was last updated on ${guide.lastUpdated.toLocaleDateString()}.`,
        "Always follow local regulations and safety standards."
      ];
      
      if (guideType.includes('emergency')) {
        disclaimers.push("For immediate danger, call 000.");
      }
      
      if (guideType.includes('mould') || guideType.includes('sewage')) {
        disclaimers.push(COMPLIANCE_CONFIG.disclaimers.noHealthAdvice);
      }
      
      return {
        found: true,
        title: guide.title,
        steps: formattedSteps,
        disclaimers,
        lastUpdated: guide.lastUpdated,
        source: `Database Guide ID: ${guide.id}`
      };
      
    } catch (error) {
      console.error('Error fetching guide:', error);
      return null;
    }
  }
  
  /**
   * Sanitize step descriptions to remove any prohibited content
   */
  private sanitizeStepDescription(description: string): string {
    // Remove any health or legal advice
    let sanitized = description;
    
    const prohibitedPhrases = [
      /this will cure/gi,
      /this will prevent/gi,
      /legally required/gi,
      /you must by law/gi,
      /medical benefits/gi,
      /health benefits/gi
    ];
    
    prohibitedPhrases.forEach(phrase => {
      sanitized = sanitized.replace(phrase, '[information removed for compliance]');
    });
    
    return sanitized;
  }
  
  /**
   * Check if content contains prohibited information
   */
  private containsProhibitedContent(content: string): boolean {
    const lower = content.toLowerCase();
    return COMPLIANCE_CONFIG.prohibitedTopics.some(topic => lower.includes(topic));
  }
  
  /**
   * Get available guide types for user
   */
  async getAvailableGuides(userType: 'customer' | 'contractor'): Promise<{
    guides: Array<{
      id: string;
      type: string;
      title: string;
      description: string;
      estimatedReadTime: string;
    }>;
  }> {
    try {
      const guides = await this.prisma.stepByStepGuide.findMany({
        where: {
          userType: userType,
          active: true
        },
        select: {
          id: true,
          type: true,
          title: true,
          description: true,
          estimatedReadTime: true
        },
        orderBy: { priority: 'asc' }
      });
      
      return {
        guides: guides.map(guide => ({
          id: guide.id,
          type: guide.type,
          title: guide.title,
          description: guide.description,
          estimatedReadTime: guide.estimatedReadTime || '5 minutes'
        }))
      };
      
    } catch (error) {
      console.error('Error fetching available guides:', error);
      return { guides: [] };
    }
  }
}

// ============================================
// RESPONSE ATTRIBUTION SERVICE
// ============================================

export class ResponseAttributionService {
  /**
   * Add source attribution to all responses
   */
  static addAttribution(
    response: string,
    sources: string[],
    disclaimers: string[]
  ): string {
    let attributedResponse = response;
    
    // Add source attribution
    if (sources.length > 0) {
      attributedResponse += '\n\n📚 Sources:\n';
      sources.forEach(source => {
        attributedResponse += `• ${source}\n`;
      });
    }
    
    // Add disclaimers
    if (disclaimers.length > 0) {
      attributedResponse += '\n⚠️ Important Information:\n';
      disclaimers.forEach(disclaimer => {
        attributedResponse += `• ${disclaimer}\n`;
      });
    }
    
    // Add timestamp
    attributedResponse += `\n🕐 Information provided: ${new Date().toLocaleString('en-AU', {
      timeZone: 'Australia/Sydney'
    })}`;
    
    return attributedResponse;
  }
  
  /**
   * Format response for different channels
   */
  static formatForChannel(
    response: string,
    channel: 'web' | 'sms' | 'whatsapp' | 'email'
  ): string {
    switch (channel) {
      case 'sms':
        // Shorten for SMS
        return response.substring(0, 160) + '... Reply GUIDE for full info';
        
      case 'whatsapp':
        // Format for WhatsApp
        return response.replace(/\n\n/g, '\n');
        
      case 'email':
        // Add HTML formatting for email
        return response.replace(/\n/g, '<br>');
        
      default:
        return response;
    }
  }
}