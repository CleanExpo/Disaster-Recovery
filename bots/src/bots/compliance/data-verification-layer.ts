/**
 * Data Verification and Compliance Layer
 * Ensures all responses use only verified database content
 */

import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const COMPLIANCE_CONFIG = {
  prohibitedTopics: [
    'medical diagnosis',
    'health treatment',
    'legal rights',
    'legal action',
    'medical advice',
    'health risks',
    'compensation claims',
    'liability'
  ],
  allowedTopics: [
    'service procedures',
    'contractor availability',
    'equipment information',
    'general safety',
    'insurance processes',
    'emergency procedures'
  ],
  disclaimers: {
    general: 'Information provided is general in nature. Always consult qualified professionals for specific advice.',
    noHealthAdvice: 'We cannot provide health or medical advice. Consult healthcare professionals for health concerns.',
    noLegalAdvice: 'We cannot provide legal advice. Consult legal professionals for legal matters.',
    emergencyServices: 'In emergencies, always call 000 first.',
    insuranceSpecific: 'Insurance processes vary. Contact your insurer for specific policy information.'
  }
};

export class DataVerificationService {
  /**
   * Verify response content against database
   */
  async verifyResponse(
    responseType: string,
    content: string,
    sourceId?: string
  ): Promise<{
    verified: boolean;
    response: string;
    sources: string[];
    disclaimers: string[];
  }> {
    // Check for prohibited content
    const prohibited = this.checkProhibited(content);
    if (prohibited.found) {
      return {
        verified: false,
        response: this.getSafeAlternative(prohibited.type),
        sources: [],
        disclaimers: [COMPLIANCE_CONFIG.disclaimers.general]
      };
    }
    
    // Verify against database
    const verification = await this.verifyAgainstDatabase(responseType, sourceId);
    
    // Add appropriate disclaimers
    const disclaimers = this.getDisclaimers(responseType);
    
    return {
      verified: verification.verified,
      response: content,
      sources: verification.sources,
      disclaimers
    };
  }
  
  /**
   * Check for prohibited content
   */
  private checkProhibited(content: string): { found: boolean; type?: string } {
    const lower = content.toLowerCase();
    
    for (const topic of COMPLIANCE_CONFIG.prohibitedTopics) {
      if (lower.includes(topic)) {
        return { found: true, type: topic };
      }
    }
    
    return { found: false };
  }
  
  /**
   * Get safe alternative response
   */
  private getSafeAlternative(prohibitedType: string): string {
    const alternatives: Record<string, string> = {
      'medical diagnosis': 'I cannot provide medical diagnosis. Please consult healthcare professionals.',
      'health treatment': 'I cannot advise on health treatments. Please consult qualified medical practitioners.',
      'legal rights': 'I cannot provide legal advice. Please consult qualified legal professionals.',
      'legal action': 'For legal matters, please consult a qualified lawyer or legal aid service.',
      'medical advice': 'I cannot provide medical advice. For health concerns, please consult healthcare professionals.',
      'health risks': 'For health risk assessments, please consult qualified healthcare providers.',
      'compensation claims': 'For compensation matters, please consult legal professionals or your insurance provider.',
      'liability': 'For liability questions, please consult legal professionals.'
    };
    
    return alternatives[prohibitedType] || 'This topic requires professional consultation.';
  }
  
  /**
   * Verify content against database
   */
  private async verifyAgainstDatabase(
    responseType: string,
    sourceId?: string
  ): Promise<{ verified: boolean; sources: string[] }> {
    const sources: string[] = [];
    
    if (sourceId) {
      // Verify specific source exists
      const verifiedContent = await prisma.verifiedContent.findUnique({
        where: { id: sourceId }
      });
      
      if (verifiedContent && verifiedContent.approved) {
        sources.push(`Verified Content: ${verifiedContent.title}`);
        return { verified: true, sources };
      }
    }
    
    // Verify response type has approved content
    const approvedContent = await prisma.verifiedContent.findFirst({
      where: {
        type: responseType,
        approved: true,
        active: true
      }
    });
    
    if (approvedContent) {
      sources.push(`Database: ${responseType}`);
      return { verified: true, sources };
    }
    
    return { verified: false, sources: [] };
  }
  
  /**
   * Get appropriate disclaimers for response type
   */
  private getDisclaimers(responseType: string): string[] {
    const disclaimers: string[] = [COMPLIANCE_CONFIG.disclaimers.general];
    
    switch (responseType) {
      case 'emergency_response':
        disclaimers.push(COMPLIANCE_CONFIG.disclaimers.emergencyServices);
        break;
      case 'insurance_claim':
        disclaimers.push(COMPLIANCE_CONFIG.disclaimers.insuranceSpecific);
        break;
      case 'health_related':
        disclaimers.push(COMPLIANCE_CONFIG.disclaimers.noHealthAdvice);
        break;
      case 'legal_related':
        disclaimers.push(COMPLIANCE_CONFIG.disclaimers.noLegalAdvice);
        break;
    }
    
    return disclaimers;
  }
}

export class StepByStepGuideService {
  /**
   * Get verified guide from database
   */
  async getGuide(
    guideType: string,
    userType: 'customer' | 'contractor'
  ): Promise<any> {
    const guide = await prisma.stepByStepGuide.findFirst({
      where: {
        type: guideType,
        userType,
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
    
    // Format guide with compliance
    return {
      title: guide.title,
      description: guide.description,
      steps: guide.steps,
      disclaimers: [
        COMPLIANCE_CONFIG.disclaimers.general,
        'These are general procedures. Specific situations may vary.'
      ],
      source: `Guide ID: ${guide.id}`
    };
  }
  
  /**
   * Get list of available guides
   */
  async getAvailableGuides(userType: 'customer' | 'contractor'): Promise<{
    guides: Array<{ id: string; title: string; type: string }>;
  }> {
    const guides = await prisma.stepByStepGuide.findMany({
      where: {
        userType,
        active: true
      },
      select: {
        id: true,
        title: true,
        type: true
      },
      orderBy: { priority: 'desc' }
    });
    
    return { guides };
  }
}

export class ResponseAttributionService {
  /**
   * Add source attribution to response
   */
  static addAttribution(
    response: string,
    sources: string[],
    disclaimers: string[]
  ): string {
    let attributedResponse = response;
    
    if (sources.length > 0) {
      attributedResponse += '\n\n📚 Sources:\n';
      sources.forEach(source => {
        attributedResponse += `• ${source}\n`;
      });
    }
    
    if (disclaimers.length > 0) {
      attributedResponse += '\n⚠️ Important:\n';
      disclaimers.forEach(disclaimer => {
        attributedResponse += `• ${disclaimer}\n`;
      });
    }
    
    return attributedResponse;
  }
  
  /**
   * Format response for specific channel
   */
  static formatForChannel(
    response: string,
    channel: 'web' | 'sms' | 'whatsapp' | 'email'
  ): string {
    switch (channel) {
      case 'sms':
        // Shorten for SMS (160 char segments)
        return response.substring(0, 450) + (response.length > 450 ? '...[Reply MORE for details]' : '');
        
      case 'whatsapp':
        // WhatsApp supports longer messages
        return response;
        
      case 'email':
        // Add email formatting
        return `<html><body><pre>${response}</pre></body></html>`;
        
      case 'web':
      default:
        return response;
    }
  }
}