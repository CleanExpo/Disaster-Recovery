/**
 * PAYMENT SECURITY SYSTEM
 * ========================
 * 
 * Comprehensive payment validation and security measures
 * to prevent financial fraud and manipulation.
 */

import { z } from 'zod';

// IMMUTABLE PRICING CONSTANTS - SERVER-SIDE ONLY
export const PRICING_CONSTANTS = {
  // Onboarding fees
  APPLICATION_FEE: 27500, // $275.00 in cents
  JOINING_FEE: 220000,   // $2,200.00 in cents
  TOTAL_ONBOARDING: 247500, // $2,475.00 in cents
  
  // Subscription tiers (monthly, in cents)
  SUBSCRIPTION_TIERS: {
    TIER_25KM: 29900,   // $299.00
    TIER_50KM: 49900,   // $499.00  
    TIER_75KM: 69900,   // $699.00
    TIER_100KM: 89900,  // $899.00
    RURAL: 119900       // $1,199.00
  },
  
  // Bond amounts
  PERFORMANCE_BOND: 500000, // $5,000.00 in cents
  
  // Currency
  CURRENCY: 'AUD',
  
  // Minimum and maximum allowed amounts
  MIN_AMOUNT: 100,      // $1.00 minimum
  MAX_AMOUNT: 100000000 // $1,000,000.00 maximum
} as const;

/**
 * Payment validation schema
 */
export const paymentValidationSchema = z.object({
  contractorId: z.string().uuid('Invalid contractor ID'),
  amount: z.number().int().min(PRICING_CONSTANTS.MIN_AMOUNT).max(PRICING_CONSTANTS.MAX_AMOUNT),
  currency: z.literal(PRICING_CONSTANTS.CURRENCY),
  paymentType: z.enum(['ONBOARDING', 'SUBSCRIPTION', 'BOND', 'SERVICE_FEE']),
  metadata: z.object({
    description: z.string().max(500),
    reference: z.string().max(100).optional()
  })
});

export type PaymentValidation = z.infer<typeof paymentValidationSchema>;

/**
 * Server-side payment amount calculator and validator
 */
export class PaymentValidator {
  /**
   * Calculate and validate onboarding payment amount
   */
  public static calculateOnboardingAmount(): {
    amount: number;
    breakdown: {
      applicationFee: number;
      joiningFee: number;
      total: number;
    };
    currency: string;
  } {
    return {
      amount: PRICING_CONSTANTS.TOTAL_ONBOARDING,
      breakdown: {
        applicationFee: PRICING_CONSTANTS.APPLICATION_FEE,
        joiningFee: PRICING_CONSTANTS.JOINING_FEE,
        total: PRICING_CONSTANTS.TOTAL_ONBOARDING
      },
      currency: PRICING_CONSTANTS.CURRENCY
    };
  }
  
  /**
   * Calculate subscription amount based on tier and frequency
   */
  public static calculateSubscriptionAmount(
    tier: keyof typeof PRICING_CONSTANTS.SUBSCRIPTION_TIERS,
    frequency: 'MONTHLY' | 'QUARTERLY' | 'ANNUAL'
  ): {
    amount: number;
    baseAmount: number;
    multiplier: number;
    frequency: string;
    currency: string;
  } {
    const baseAmount = PRICING_CONSTANTS.SUBSCRIPTION_TIERS[tier];
    
    const multipliers = {
      MONTHLY: 1,
      QUARTERLY: 2.85,  // 5% discount 
      ANNUAL: 10.5      // 12.5% discount
    };
    
    const multiplier = multipliers[frequency];
    const amount = Math.round(baseAmount * multiplier);
    
    return {
      amount,
      baseAmount,
      multiplier,
      frequency,
      currency: PRICING_CONSTANTS.CURRENCY
    };
  }
  
  /**
   * Validate payment amount against expected amount
   */
  public static validatePaymentAmount(
    providedAmount: number,
    paymentType: PaymentValidation['paymentType'],
    metadata?: any
  ): {
    isValid: boolean;
    expectedAmount: number;
    providedAmount: number;
    discrepancy: number;
    reason?: string;
  } {
    let expectedAmount: number;
    
    switch (paymentType) {
      case 'ONBOARDING':
        expectedAmount = PRICING_CONSTANTS.TOTAL_ONBOARDING;
        break;
        
      case 'SUBSCRIPTION':
        if (!metadata?.tier || !metadata?.frequency) {
          return {
            isValid: false,
            expectedAmount: 0,
            providedAmount,
            discrepancy: 0,
            reason: 'Missing subscription tier or frequency'
          };
        }
        const calc = this.calculateSubscriptionAmount(metadata.tier, metadata.frequency);
        expectedAmount = calc.amount;
        break;
        
      case 'BOND':
        expectedAmount = PRICING_CONSTANTS.PERFORMANCE_BOND;
        break;
        
      default:
        return {
          isValid: false,
          expectedAmount: 0,
          providedAmount,
          discrepancy: 0,
          reason: 'Unknown payment type'
        };
    }
    
    const discrepancy = Math.abs(providedAmount - expectedAmount);
    const isValid = discrepancy === 0;
    
    return {
      isValid,
      expectedAmount,
      providedAmount,
      discrepancy,
      reason: isValid ? undefined : `Amount mismatch: expected ${expectedAmount}, got ${providedAmount}`
    };
  }
  
  /**
   * Security check for payment manipulation attempts
   */
  public static detectPaymentManipulation(
    requestData: any,
    expectedData: Partial<PaymentValidation>
  ): {
    isSuspicious: boolean;
    suspiciousFields: string[];
    riskScore: number;
    recommendations: string[];
  } {
    const suspiciousFields: string[] = [];
    let riskScore = 0;
    const recommendations: string[] = [];
    
    // Check for amount manipulation
    if (requestData.amount !== expectedData.amount) {
      suspiciousFields.push('amount');
      riskScore += 50;
      recommendations.push('Amount manipulation detected - investigate immediately');
    }
    
    // Check for currency manipulation
    if (requestData.currency && requestData.currency !== PRICING_CONSTANTS.CURRENCY) {
      suspiciousFields.push('currency');
      riskScore += 30;
      recommendations.push('Currency manipulation attempt detected');
    }
    
    // Check for suspiciously low amounts
    if (requestData.amount < 1000) { // Less than $10
      suspiciousFields.push('amount');
      riskScore += 40;
      recommendations.push('Suspiciously low payment amount');
    }
    
    // Check for round numbers (common in manipulation)
    if (requestData.amount % 100 === 0 && requestData.amount < 10000) {
      riskScore += 10;
      recommendations.push('Round number payment - verify legitimacy');
    }
    
    // Check for metadata inconsistencies
    if (requestData.metadata && expectedData.metadata) {
      for (const [key, value] of Object.entries(expectedData.metadata)) {
        if (requestData.metadata[key] !== value) {
          suspiciousFields.push(`metadata.${key}`);
          riskScore += 15;
        }
      }
    }
    
    return {
      isSuspicious: riskScore > 20,
      suspiciousFields,
      riskScore,
      recommendations
    };
  }
  
  /**
   * Generate secure payment metadata
   */
  public static generatePaymentMetadata(
    contractorId: string,
    paymentType: PaymentValidation['paymentType'],
    additionalData?: Record<string, any>
  ): Record<string, any> {
    const timestamp = Date.now();
    const checksum = this.generateChecksum(contractorId, paymentType, timestamp);
    
    return {
      contractorId,
      paymentType,
      timestamp,
      checksum,
      source: 'nrp-platform',
      version: '1.0',
      ...additionalData
    };
  }
  
  /**
   * Verify payment metadata integrity
   */
  public static verifyPaymentMetadata(metadata: Record<string, any>): {
    isValid: boolean;
    reason?: string;
  } {
    if (!metadata.contractorId || !metadata.paymentType || !metadata.timestamp || !metadata.checksum) {
      return {
        isValid: false,
        reason: 'Missing required metadata fields'
      };
    }
    
    const expectedChecksum = this.generateChecksum(
      metadata.contractorId,
      metadata.paymentType,
      metadata.timestamp
    );
    
    if (metadata.checksum !== expectedChecksum) {
      return {
        isValid: false,
        reason: 'Metadata checksum verification failed'
      };
    }
    
    // Check if timestamp is not too old (max 1 hour)
    const age = Date.now() - metadata.timestamp;
    if (age > 3600000) { // 1 hour
      return {
        isValid: false,
        reason: 'Payment metadata too old'
      };
    }
    
    return { isValid: true };
  }
  
  /**
   * Generate checksum for payment verification
   */
  private static generateChecksum(
    contractorId: string,
    paymentType: string,
    timestamp: number
  ): string {
    const data = `${contractorId}:${paymentType}:${timestamp}:${process.env.PAYMENT_SECRET || 'default-secret'}`;
    
    // Simple hash function (in production, use crypto.createHash)
    let hash = 0;
    for (let i = 0; i < data.length; i++) {
      const char = data.charCodeAt(i);
      hash = ((hash << 5) - hash) + char;
      hash = hash & hash; // Convert to 32-bit integer
    }
    
    return Math.abs(hash).toString(36);
  }
}

/**
 * Payment audit logger
 */
export class PaymentAuditLogger {
  public static logPaymentAttempt(data: {
    contractorId: string;
    amount: number;
    paymentType: string;
    ipAddress?: string;
    userAgent?: string;
    result: 'SUCCESS' | 'FAILURE' | 'SUSPICIOUS';
    reason?: string;
  }): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type: 'PAYMENT_ATTEMPT',
      ...data
    };
    
    // Log to console (in production, use proper logging service)
    console.log('PAYMENT_AUDIT:', JSON.stringify(logEntry));
    
    // In production, also log to database for compliance
    // await prisma.paymentAuditLog.create({ data: logEntry });
  }
  
  public static logSuspiciousActivity(data: {
    contractorId?: string;
    ipAddress?: string;
    suspiciousFields: string[];
    riskScore: number;
    details: string;
  }): void {
    const logEntry = {
      timestamp: new Date().toISOString(),
      type: 'SUSPICIOUS_PAYMENT_ACTIVITY',
      severity: data.riskScore > 50 ? 'HIGH' : data.riskScore > 20 ? 'MEDIUM' : 'LOW',
      ...data
    };
    
    console.warn('PAYMENT_SECURITY_ALERT:', JSON.stringify(logEntry));
    
    // In production, trigger alerts for high-risk activities
    if (data.riskScore > 50) {
      // await sendSecurityAlert(logEntry);
    }
  }
}