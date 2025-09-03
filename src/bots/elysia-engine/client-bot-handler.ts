/**
 * Client Bot Handler with Data Verification
 * Processes customer messages with compliance and data source verification
 */

import { PrismaClient } from '@prisma/client';
import { 
  DataVerificationService, 
  StepByStepGuideService,
  ResponseAttributionService,
  COMPLIANCE_CONFIG 
} from '../compliance/data-verification-layer';
import { MasterOrchestrator } from '../orchestration/agent-hierarchy';

const prisma = new PrismaClient();
const verificationService = new DataVerificationService();
const guideService = new StepByStepGuideService();

export class ClientBotHandler {
  /**
   * Process client message with full compliance and verification
   */
  static async processMessage(
    body: {
      message: string;
      sessionId: string;
      channel: 'web' | 'sms' | 'whatsapp' | 'email';
      metadata?: any;
    },
    orchestrator: MasterOrchestrator
  ): Promise<any> {
    try {
      // 1. Check for emergency keywords
      if (this.isEmergency(body.message)) {
        return await this.handleEmergency(body, orchestrator);
      }
      
      // 2. Check for guide requests
      if (this.isGuideRequest(body.message)) {
        return await this.provideGuide(body.message, 'customer', body.channel);
      }
      
      // 3. Check for prohibited content
      const prohibitedCheck = this.checkProhibitedRequest(body.message);
      if (prohibitedCheck.prohibited) {
        return this.createComplianceResponse(prohibitedCheck.reason, body.channel);
      }
      
      // 4. Determine intent and required data
      const intent = await this.determineIntent(body.message);
      
      // 5. Fetch verified data from database
      const verifiedData = await this.fetchVerifiedData(intent);
      
      if (!verifiedData) {
        return {
          response: "I can help you with our contractor services and procedures. Please ask about available services, contractors in your area, or emergency procedures.",
          disclaimers: [COMPLIANCE_CONFIG.disclaimers.general],
          sources: []
        };
      }
      
      // 6. Generate response using orchestrator with verified data
      const orchestratorResult = await orchestrator.processClientRequest(
        body.message,
        {
          sessionId: body.sessionId,
          urgency: intent.urgency || 'normal',
          conversationHistory: [],
          metadata: {
            ...body.metadata,
            verifiedData,
            intent,
            channel: body.channel
          }
        }
      );
      
      // 7. Verify the generated response
      const verifiedResponse = await verificationService.verifyResponse(
        intent.type,
        orchestratorResult.data?.response || '',
        verifiedData.sourceId
      );
      
      // 8. Add attribution and format for channel
      const finalResponse = ResponseAttributionService.addAttribution(
        verifiedResponse.response,
        verifiedResponse.sources,
        verifiedResponse.disclaimers
      );
      
      const formattedResponse = ResponseAttributionService.formatForChannel(
        finalResponse,
        body.channel
      );
      
      // 9. Log for compliance
      await this.logComplianceAudit(
        body.sessionId,
        body.message,
        formattedResponse,
        verifiedResponse
      );
      
      // 10. Update conversation in database
      await this.updateConversation(body.sessionId, body, formattedResponse);
      
      return {
        response: formattedResponse,
        intent: intent.type,
        sources: verifiedResponse.sources,
        disclaimers: verifiedResponse.disclaimers,
        confidence: orchestratorResult.confidence || 0.95
      };
      
    } catch (error) {
      console.error('Client bot processing error:', error);
      
      return {
        response: "I apologize, but I can only provide information from our verified database. Please contact our contractors directly for specific assistance.",
        disclaimers: [COMPLIANCE_CONFIG.disclaimers.general],
        error: true
      };
    }
  }
  
  /**
   * Check if message indicates emergency
   */
  private static isEmergency(message: string): boolean {
    const emergencyKeywords = [
      'emergency', 'urgent', 'immediate', 'flooding', 'fire',
      'danger', 'help now', 'asap', 'right now', 'critical'
    ];
    
    const lower = message.toLowerCase();
    return emergencyKeywords.some(keyword => lower.includes(keyword));
  }
  
  /**
   * Handle emergency with verified procedures
   */
  private static async handleEmergency(body: any, orchestrator: MasterOrchestrator): Promise<any> {
    try {
      // Fetch emergency guide from database
      const emergencyGuide = await prisma.emergencyGuide.findFirst({
        where: {
          active: true,
          emergencyType: this.determineEmergencyType(body.message)
        },
        orderBy: { priority: 'desc' }
      });
      
      if (!emergencyGuide) {
        return {
          response: "For emergencies, call 000 immediately. Our contractors can assist with disaster recovery once the immediate danger is addressed.",
          disclaimers: ["For immediate danger, always call 000 first."],
          sources: []
        };
      }
      
      // Build emergency response from verified data
      let response = `🚨 EMERGENCY RESPONSE - ${emergencyGuide.title}\n\n`;
      response += "IMMEDIATE STEPS:\n";
      emergencyGuide.immediateSteps.forEach((step, index) => {
        response += `${index + 1}. ${step}\n`;
      });
      
      response += "\n⚠️ SAFETY WARNINGS:\n";
      emergencyGuide.safetyWarnings.forEach(warning => {
        response += `• ${warning}\n`;
      });
      
      response += "\n❌ DO NOT:\n";
      emergencyGuide.doNotActions.forEach(action => {
        response += `• ${action}\n`;
      });
      
      // Find available contractors
      const availableContractors = await this.findEmergencyContractors(body.metadata?.location);
      
      if (availableContractors.length > 0) {
        response += `\n✅ ${availableContractors.length} emergency contractors available in your area.`;
        response += "\nEstimated arrival: 30-60 minutes";
      }
      
      return {
        response,
        disclaimers: [
          "For immediate danger, call 000.",
          "These are general emergency procedures from our database.",
          "Response times are estimates based on contractor availability."
        ],
        sources: [`Emergency Guide: ${emergencyGuide.id}`],
        emergencyId: `EMRG-${Date.now()}`,
        contractors: availableContractors
      };
      
    } catch (error) {
      console.error('Emergency handling error:', error);
      return {
        response: "For emergencies, call 000 immediately. Our system is experiencing issues. Please call contractors directly.",
        disclaimers: ["System error - please call 000 for emergencies."],
        error: true
      };
    }
  }
  
  /**
   * Check if message is requesting a guide
   */
  private static isGuideRequest(message: string): boolean {
    const guideKeywords = [
      'guide', 'how to', 'steps', 'procedure', 'what should i do',
      'instructions', 'tutorial', 'help with', 'show me how'
    ];
    
    const lower = message.toLowerCase();
    return guideKeywords.some(keyword => lower.includes(keyword));
  }
  
  /**
   * Provide step-by-step guide from database
   */
  private static async provideGuide(
    message: string,
    userType: 'customer' | 'contractor',
    channel: string
  ): Promise<any> {
    const guideType = this.determineGuideType(message);
    const guide = await guideService.getGuide(guideType, userType);
    
    if (!guide) {
      // List available guides
      const available = await guideService.getAvailableGuides(userType);
      
      let response = "I can provide guides for the following:\n\n";
      available.guides.forEach(g => {
        response += `📘 ${g.title}\n`;
      });
      response += "\nPlease specify which guide you need.";
      
      return {
        response,
        disclaimers: [COMPLIANCE_CONFIG.disclaimers.general],
        sources: ["Guide Database"]
      };
    }
    
    // Format guide for response
    let response = `📋 ${guide.title}\n\n`;
    
    guide.steps.forEach(step => {
      response += `Step ${step.stepNumber}: ${step.title}\n`;
      response += `${step.description}\n`;
      
      if (step.warningNotes && step.warningNotes.length > 0) {
        response += "⚠️ Warnings:\n";
        step.warningNotes.forEach(note => {
          response += `  • ${note}\n`;
        });
      }
      
      if (step.estimatedTime) {
        response += `⏱️ Estimated time: ${step.estimatedTime}\n`;
      }
      
      response += "\n";
    });
    
    const formattedResponse = ResponseAttributionService.formatForChannel(response, channel as any);
    
    return {
      response: formattedResponse,
      disclaimers: guide.disclaimers,
      sources: [guide.source],
      guideId: guide.title
    };
  }
  
  /**
   * Check for prohibited content in request
   */
  private static checkProhibitedRequest(message: string): {
    prohibited: boolean;
    reason?: string;
  } {
    const lower = message.toLowerCase();
    
    // Check for medical advice requests
    if (lower.includes('is it safe') || lower.includes('health risk') || 
        lower.includes('medical') || lower.includes('doctor')) {
      return {
        prohibited: true,
        reason: 'medical_advice'
      };
    }
    
    // Check for legal advice requests
    if (lower.includes('can i sue') || lower.includes('legal rights') || 
        lower.includes('compensation') || lower.includes('liability')) {
      return {
        prohibited: true,
        reason: 'legal_advice'
      };
    }
    
    return { prohibited: false };
  }
  
  /**
   * Create compliance-safe response
   */
  private static createComplianceResponse(reason: string, channel: string): any {
    const responses: Record<string, string> = {
      medical_advice: "I cannot provide medical or health advice. For health concerns, please consult qualified healthcare professionals. I can help you find contractors who follow Australian safety standards for remediation work.",
      legal_advice: "I cannot provide legal advice. Please consult a qualified legal professional for legal matters. I can provide information about our contractor services and standard procedures.",
      default: "I can only provide information about contractor services and procedures from our verified database."
    };
    
    return {
      response: responses[reason] || responses.default,
      disclaimers: [
        COMPLIANCE_CONFIG.disclaimers.noHealthAdvice,
        COMPLIANCE_CONFIG.disclaimers.noLegalAdvice,
        COMPLIANCE_CONFIG.disclaimers.general
      ],
      sources: []
    };
  }
  
  /**
   * Determine user intent from message
   */
  private static async determineIntent(message: string): Promise<any> {
    const lower = message.toLowerCase();
    
    // Service inquiry
    if (lower.includes('service') || lower.includes('contractor') || lower.includes('available')) {
      return { type: 'service_inquiry', urgency: 'normal' };
    }
    
    // Cost inquiry
    if (lower.includes('cost') || lower.includes('price') || lower.includes('how much')) {
      return { type: 'cost_estimate', urgency: 'normal' };
    }
    
    // Insurance claim
    if (lower.includes('insurance') || lower.includes('claim')) {
      return { type: 'insurance_claim', urgency: 'normal' };
    }
    
    // Emergency (already handled above, but as fallback)
    if (lower.includes('emergency') || lower.includes('urgent')) {
      return { type: 'emergency_response', urgency: 'high' };
    }
    
    // Default
    return { type: 'general_inquiry', urgency: 'normal' };
  }
  
  /**
   * Fetch verified data based on intent
   */
  private static async fetchVerifiedData(intent: any): Promise<any> {
    try {
      switch (intent.type) {
        case 'service_inquiry':
          const services = await prisma.serviceProcedure.findMany({
            where: { active: true },
            take: 5
          });
          return {
            type: 'services',
            data: services,
            sourceId: 'service_procedures'
          };
          
        case 'cost_estimate':
          // Fetch standard pricing ranges (not specific quotes)
          const pricing = await prisma.verifiedContent.findFirst({
            where: {
              type: 'pricing_guide',
              active: true
            }
          });
          return {
            type: 'pricing',
            data: pricing,
            sourceId: pricing?.id
          };
          
        case 'insurance_claim':
          const insuranceInfo = await prisma.insuranceProcess.findMany({
            where: { active: true },
            take: 5
          });
          return {
            type: 'insurance',
            data: insuranceInfo,
            sourceId: 'insurance_processes'
          };
          
        default:
          const generalInfo = await prisma.verifiedContent.findFirst({
            where: {
              type: 'general_info',
              active: true
            }
          });
          return {
            type: 'general',
            data: generalInfo,
            sourceId: generalInfo?.id
          };
      }
    } catch (error) {
      console.error('Error fetching verified data:', error);
      return null;
    }
  }
  
  /**
   * Determine emergency type from message
   */
  private static determineEmergencyType(message: string): string {
    const lower = message.toLowerCase();
    
    if (lower.includes('flood') || lower.includes('water')) return 'flood';
    if (lower.includes('fire')) return 'fire';
    if (lower.includes('storm')) return 'storm';
    if (lower.includes('mould')) return 'mould';
    if (lower.includes('sewage')) return 'sewage';
    
    return 'general';
  }
  
  /**
   * Determine guide type from message
   */
  private static determineGuideType(message: string): string {
    const lower = message.toLowerCase();
    
    if (lower.includes('water') || lower.includes('flood')) return 'water_damage';
    if (lower.includes('fire')) return 'fire_damage';
    if (lower.includes('mould')) return 'mould_remediation';
    if (lower.includes('insurance')) return 'insurance_claim';
    if (lower.includes('emergency')) return 'emergency_response';
    
    return 'general_guide';
  }
  
  /**
   * Find available emergency contractors
   */
  private static async findEmergencyContractors(location?: any): Promise<any[]> {
    try {
      const contractors = await prisma.contractor.findMany({
        where: {
          active: true,
          verified: true,
          emergencyAvailable: true,
          currentCapacity: { gt: 0 }
        },
        take: 3,
        orderBy: [
          { responseTime: 'asc' },
          { customerRating: 'desc' }
        ]
      });
      
      return contractors.map(c => ({
        id: c.id,
        businessName: c.businessName,
        phone: c.phone,
        responseTime: c.responseTime
      }));
      
    } catch (error) {
      console.error('Error finding contractors:', error);
      return [];
    }
  }
  
  /**
   * Log compliance audit
   */
  private static async logComplianceAudit(
    conversationId: string,
    request: string,
    response: string,
    verification: any
  ): Promise<void> {
    try {
      await prisma.complianceAudit.create({
        data: {
          conversationId,
          requestType: 'client_message',
          requestContent: request,
          responseContent: response,
          verified: verification.verified,
          prohibited: false,
          disclaimersAdded: verification.disclaimers || [],
          dataSources: verification.sources || [],
          channel: 'web',
          userType: 'customer'
        }
      });
    } catch (error) {
      console.error('Compliance audit logging error:', error);
    }
  }
  
  /**
   * Update conversation in database
   */
  private static async updateConversation(
    sessionId: string,
    body: any,
    response: string
  ): Promise<void> {
    try {
      await prisma.botConversation.upsert({
        where: { sessionId },
        create: {
          sessionId,
          channel: body.channel,
          userType: 'customer',
          messages: [
            { role: 'user', content: body.message, timestamp: new Date() },
            { role: 'assistant', content: response, timestamp: new Date() }
          ],
          status: 'active',
          lastMessageAt: new Date()
        },
        update: {
          messages: {
            push: [
              { role: 'user', content: body.message, timestamp: new Date() },
              { role: 'assistant', content: response, timestamp: new Date() }
            ]
          },
          lastMessageAt: new Date()
        }
      });
    } catch (error) {
      console.error('Conversation update error:', error);
    }
  }
}