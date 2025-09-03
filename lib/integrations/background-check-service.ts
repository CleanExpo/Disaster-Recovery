/**
 * Background Check Service Integration
 * NRP Disaster Recovery Platform
 * 
 * Handles contractor verification and compliance checks
 */

import { z } from 'zod';
import crypto from 'crypto';

// API Configuration
const BACKGROUND_CHECK_API_URL = process.env.BACKGROUND_CHECK_API_URL || 'https://api.backgroundcheck.com/v1';
const BACKGROUND_CHECK_API_KEY = process.env.BACKGROUND_CHECK_API_KEY || '';
const WEBHOOK_URL = process.env.BACKGROUND_CHECK_WEBHOOK_URL || 'https://disaster-recovery-seven.vercel.app/api/webhooks/background-check';

// Types and Schemas
export const BackgroundCheckRequestSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  dateOfBirth: z.string().regex(/^\d{4}-\d{2}-\d{2}$/),
  email: z.string().email(),
  phone: z.string().optional(),
  address: z.object({
    street: z.string(),
    city: z.string(),
    state: z.string(),
    postcode: z.string(),
    country: z.string().default('AU'),
  }),
  ssn: z.string().optional(), // Social Security Number or equivalent
  driversLicense: z.object({
    number: z.string(),
    state: z.string(),
    expiry: z.string().optional(),
  }).optional(),
  consent: z.object({
    given: z.boolean(),
    timestamp: z.date(),
    ipAddress: z.string().optional(),
  }),
  checkTypes: z.array(z.enum([
    'identity',
    'criminal',
    'employment',
    'education',
    'license',
    'credit',
    'references',
    'sanctions',
    'media',
  ])),
});

export type BackgroundCheckRequest = z.infer<typeof BackgroundCheckRequestSchema>;

export const BackgroundCheckResultSchema = z.object({
  checkId: z.string(),
  requestId: z.string(),
  status: z.enum(['pending', 'processing', 'completed', 'failed', 'requires_info']),
  overallResult: z.enum(['clear', 'consider', 'adverse', 'pending']).optional(),
  completedAt: z.date().optional(),
  expiresAt: z.date().optional(),
  checks: z.array(z.object({
    type: z.string(),
    status: z.enum(['pending', 'completed', 'failed']),
    result: z.enum(['clear', 'consider', 'adverse']).optional(),
    details: z.record(z.any()).optional(),
    flags: z.array(z.string()).optional(),
  })),
  riskScore: z.number().min(0).max(100).optional(),
  verificationStatus: z.object({
    identity: z.boolean(),
    address: z.boolean(),
    employment: z.boolean().optional(),
    education: z.boolean().optional(),
  }).optional(),
  criminalRecords: z.array(z.object({
    type: z.string(),
    date: z.date(),
    jurisdiction: z.string(),
    description: z.string(),
    severity: z.enum(['minor', 'moderate', 'serious']),
  })).optional(),
  licenses: z.array(z.object({
    type: z.string(),
    number: z.string(),
    status: z.enum(['active', 'expired', 'suspended', 'revoked']),
    issuedDate: z.date(),
    expiryDate: z.date().optional(),
    verificationStatus: z.enum(['verified', 'unverified', 'failed']),
  })).optional(),
  reportUrl: z.string().optional(),
  pdfUrl: z.string().optional(),
});

export type BackgroundCheckResult = z.infer<typeof BackgroundCheckResultSchema>;

/**
 * Background Check Service Client
 */
export class BackgroundCheckService {
  private apiUrl: string;
  private apiKey: string;

  constructor() {
    this.apiUrl = BACKGROUND_CHECK_API_URL;
    this.apiKey = BACKGROUND_CHECK_API_KEY;

    if (!this.apiKey && process.env.NODE_ENV === 'production') {
      console.error('Background Check API key not configured');
    }
  }

  /**
   * Make authenticated API request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    // Mock response in development if API key not configured
    if (!this.apiKey && process.env.NODE_ENV === 'development') {
      return this.getMockResponse(endpoint, options) as T;
    }

    const url = `${this.apiUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.apiKey}`,
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text().catch(() => 'Unknown error');
      throw new Error(`Background check API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Initiate background check
   */
  async initiateCheck(
    contractorId: string,
    request: BackgroundCheckRequest
  ): Promise<{
    checkId: string;
    requestId: string;
    status: string;
    estimatedCompletionTime: Date;
  }> {
    const payload = {
      ...request,
      webhookUrl: WEBHOOK_URL,
      reference: contractorId,
      package: this.selectPackage(request.checkTypes),
    };

    return this.request('/checks', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  }

  /**
   * Get check status
   */
  async getCheckStatus(checkId: string): Promise<BackgroundCheckResult> {
    return this.request(`/checks/${checkId}`);
  }

  /**
   * Get multiple checks for a contractor
   */
  async getContractorChecks(
    contractorId: string
  ): Promise<BackgroundCheckResult[]> {
    return this.request(`/checks?reference=${contractorId}`);
  }

  /**
   * Download report PDF
   */
  async downloadReport(checkId: string): Promise<Buffer> {
    const response = await fetch(`${this.apiUrl}/checks/${checkId}/report`, {
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Failed to download report: ${response.status}`);
    }

    const arrayBuffer = await response.arrayBuffer();
    return Buffer.from(arrayBuffer);
  }

  /**
   * Request additional information
   */
  async requestAdditionalInfo(
    checkId: string,
    fields: string[]
  ): Promise<void> {
    await this.request(`/checks/${checkId}/request-info`, {
      method: 'POST',
      body: JSON.stringify({ fields }),
    });
  }

  /**
   * Submit additional information
   */
  async submitAdditionalInfo(
    checkId: string,
    info: Record<string, any>
  ): Promise<void> {
    await this.request(`/checks/${checkId}/submit-info`, {
      method: 'POST',
      body: JSON.stringify(info),
    });
  }

  /**
   * Verify identity document
   */
  async verifyDocument(
    documentType: 'drivers_license' | 'passport' | 'medicare',
    frontImage: Buffer,
    backImage?: Buffer
  ): Promise<{
    verified: boolean;
    extractedData: Record<string, any>;
    confidence: number;
  }> {
    const formData = new FormData();
    formData.append('type', documentType);
    formData.append('front', new Blob([frontImage]));
    if (backImage) {
      formData.append('back', new Blob([backImage]));
    }

    const response = await fetch(`${this.apiUrl}/verify/document`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${this.apiKey}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Document verification failed: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Perform instant identity verification
   */
  async instantVerification(
    firstName: string,
    lastName: string,
    dateOfBirth: string,
    licenseNumber: string,
    licenseState: string
  ): Promise<{
    verified: boolean;
    matchScore: number;
    flags: string[];
  }> {
    return this.request('/verify/instant', {
      method: 'POST',
      body: JSON.stringify({
        firstName,
        lastName,
        dateOfBirth,
        driversLicense: {
          number: licenseNumber,
          state: licenseState,
        },
      }),
    });
  }

  /**
   * Check sanctions and watchlists
   */
  async checkSanctions(
    name: string,
    dateOfBirth?: string,
    countryCode?: string
  ): Promise<{
    matches: Array<{
      list: string;
      name: string;
      score: number;
      aliases: string[];
      details: Record<string, any>;
    }>;
    checkedLists: string[];
  }> {
    return this.request('/sanctions/check', {
      method: 'POST',
      body: JSON.stringify({
        name,
        dateOfBirth,
        countryCode: countryCode || 'AU',
      }),
    });
  }

  /**
   * Verify professional license
   */
  async verifyLicense(
    licenseType: string,
    licenseNumber: string,
    state: string
  ): Promise<{
    valid: boolean;
    status: string;
    expiryDate?: Date;
    holder: {
      name: string;
      business?: string;
    };
    restrictions?: string[];
  }> {
    return this.request('/licenses/verify', {
      method: 'POST',
      body: JSON.stringify({
        type: licenseType,
        number: licenseNumber,
        state,
      }),
    });
  }

  /**
   * Get compliance requirements by state
   */
  async getComplianceRequirements(
    state: string,
    businessType: string
  ): Promise<{
    requiredLicenses: string[];
    requiredInsurance: string[];
    requiredChecks: string[];
    renewalPeriod: string;
  }> {
    return this.request(`/compliance/requirements?state=${state}&type=${businessType}`);
  }

  /**
   * Monitor ongoing compliance
   */
  async enableMonitoring(
    contractorId: string,
    checkId: string,
    frequency: 'monthly' | 'quarterly' | 'annually'
  ): Promise<{
    monitoringId: string;
    nextCheckDate: Date;
  }> {
    return this.request('/monitoring/enable', {
      method: 'POST',
      body: JSON.stringify({
        reference: contractorId,
        checkId,
        frequency,
      }),
    });
  }

  /**
   * Disable monitoring
   */
  async disableMonitoring(monitoringId: string): Promise<void> {
    await this.request(`/monitoring/${monitoringId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Helper methods
   */

  private selectPackage(checkTypes: string[]): string {
    // Select appropriate package based on check types
    if (checkTypes.includes('criminal') && checkTypes.includes('employment')) {
      return 'comprehensive';
    }
    if (checkTypes.includes('criminal')) {
      return 'standard';
    }
    return 'basic';
  }

  private getMockResponse(endpoint: string, options: RequestInit): any {
    // Return mock responses for development
    if (endpoint === '/checks' && options.method === 'POST') {
      return {
        checkId: `CHK-${Date.now()}`,
        requestId: `REQ-${Date.now()}`,
        status: 'processing',
        estimatedCompletionTime: new Date(Date.now() + 3600000),
      };
    }

    if (endpoint.startsWith('/checks/') && !options.method) {
      return {
        checkId: endpoint.split('/')[2],
        requestId: `REQ-${Date.now()}`,
        status: 'completed',
        overallResult: 'clear',
        completedAt: new Date(),
        checks: [
          {
            type: 'identity',
            status: 'completed',
            result: 'clear',
          },
          {
            type: 'criminal',
            status: 'completed',
            result: 'clear',
          },
        ],
        riskScore: 15,
        verificationStatus: {
          identity: true,
          address: true,
        },
      };
    }

    return {};
  }

  /**
   * Generate verification token for frontend
   */
  generateVerificationToken(contractorId: string): string {
    const payload = {
      contractorId,
      timestamp: Date.now(),
      nonce: crypto.randomBytes(16).toString('hex'),
    };
    
    return Buffer.from(JSON.stringify(payload)).toString('base64');
  }

  /**
   * Validate verification token
   */
  validateVerificationToken(token: string): {
    valid: boolean;
    contractorId?: string;
  } {
    try {
      const payload = JSON.parse(Buffer.from(token, 'base64').toString());
      const age = Date.now() - payload.timestamp;
      
      // Token valid for 24 hours
      if (age > 24 * 60 * 60 * 1000) {
        return { valid: false };
      }
      
      return {
        valid: true,
        contractorId: payload.contractorId,
      };
    } catch {
      return { valid: false };
    }
  }
}

// Singleton instance
let backgroundCheckService: BackgroundCheckService | null = null;

export function getBackgroundCheckService(): BackgroundCheckService {
  if (!backgroundCheckService) {
    backgroundCheckService = new BackgroundCheckService();
  }
  return backgroundCheckService;
}

// Check type definitions
export const CHECK_TYPES = {
  IDENTITY: 'identity',
  CRIMINAL: 'criminal',
  EMPLOYMENT: 'employment',
  EDUCATION: 'education',
  LICENSE: 'license',
  CREDIT: 'credit',
  REFERENCES: 'references',
  SANCTIONS: 'sanctions',
  MEDIA: 'media',
} as const;

// Result status definitions
export const CHECK_STATUS = {
  CLEAR: 'clear',
  CONSIDER: 'consider',
  ADVERSE: 'adverse',
  PENDING: 'pending',
} as const;