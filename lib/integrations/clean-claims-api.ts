/**
 * Clean Claims API Integration
 * NRP Disaster Recovery Platform
 * 
 * Handles integration with Clean Claims insurance management system
 */

import { z } from 'zod';

// API Configuration
const CLEAN_CLAIMS_API_URL = process.env.CLEAN_CLAIMS_API_URL || 'https://api.cleanclaims.com/v1';
const CLEAN_CLAIMS_API_KEY = process.env.CLEAN_CLAIMS_API_KEY || '';
const CLEAN_CLAIMS_WEBHOOK_SECRET = process.env.CLEAN_CLAIMS_WEBHOOK_SECRET || '';

// Types and Schemas
export const ClaimSchema = z.object({
  claimId: z.string(),
  policyNumber: z.string(),
  insuredName: z.string(),
  insuredEmail: z.string().email().optional(),
  insuredPhone: z.string().optional(),
  incidentDate: z.date(),
  reportedDate: z.date(),
  claimType: z.enum(['water', 'fire', 'storm', 'mould', 'vandalism', 'other']),
  status: z.enum(['pending', 'approved', 'in_progress', 'completed', 'rejected']),
  location: z.object({
    address: z.string(),
    suburb: z.string(),
    state: z.string(),
    postcode: z.string(),
    latitude: z.number().optional(),
    longitude: z.number().optional(),
  }),
  description: z.string(),
  estimatedValue: z.number().optional(),
  approvedValue: z.number().optional(),
  excess: z.number().optional(),
  assignedContractor: z.string().optional(),
  documents: z.array(z.object({
    type: z.string(),
    url: z.string(),
    uploadedAt: z.date(),
  })).optional(),
  metadata: z.record(z.any()).optional(),
});

export type Claim = z.infer<typeof ClaimSchema>;

export const ContractorAssignmentSchema = z.object({
  claimId: z.string(),
  contractorId: z.string(),
  assignedDate: z.date(),
  acceptedDate: z.date().optional(),
  completedDate: z.date().optional(),
  status: z.enum(['assigned', 'accepted', 'in_progress', 'completed', 'cancelled']),
  notes: z.string().optional(),
});

export type ContractorAssignment = z.infer<typeof ContractorAssignmentSchema>;

/**
 * Clean Claims API Client
 */
export class CleanClaimsAPI {
  private apiUrl: string;
  private apiKey: string;
  private webhookSecret: string;

  constructor() {
    this.apiUrl = CLEAN_CLAIMS_API_URL;
    this.apiKey = CLEAN_CLAIMS_API_KEY;
    this.webhookSecret = CLEAN_CLAIMS_WEBHOOK_SECRET;

    if (!this.apiKey) {
      console.warn('Clean Claims API key not configured');
    }
  }

  /**
   * Make authenticated API request
   */
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.apiUrl}${endpoint}`;
    
    const response = await fetch(url, {
      ...options,
      headers: {
        'Content-Type': 'application/json',
        'X-API-Key': this.apiKey,
        'Accept': 'application/json',
        ...options.headers,
      },
    });

    if (!response.ok) {
      const error = await response.text().catch(() => 'Unknown error');
      throw new Error(`Clean Claims API error: ${response.status} - ${error}`);
    }

    return response.json();
  }

  /**
   * Get all claims
   */
  async getClaims(params?: {
    status?: string;
    type?: string;
    from?: Date;
    to?: Date;
    page?: number;
    limit?: number;
  }): Promise<{ claims: Claim[]; total: number }> {
    const queryParams = new URLSearchParams();
    
    if (params?.status) queryParams.append('status', params.status);
    if (params?.type) queryParams.append('type', params.type);
    if (params?.from) queryParams.append('from', params.from.toISOString());
    if (params?.to) queryParams.append('to', params.to.toISOString());
    if (params?.page) queryParams.append('page', params.page.toString());
    if (params?.limit) queryParams.append('limit', params.limit.toString());

    return this.request(`/claims?${queryParams}`);
  }

  /**
   * Get single claim by ID
   */
  async getClaim(claimId: string): Promise<Claim> {
    return this.request(`/claims/${claimId}`);
  }

  /**
   * Create new claim
   */
  async createClaim(claim: Omit<Claim, 'claimId'>): Promise<Claim> {
    return this.request('/claims', {
      method: 'POST',
      body: JSON.stringify(claim),
    });
  }

  /**
   * Update claim
   */
  async updateClaim(claimId: string, updates: Partial<Claim>): Promise<Claim> {
    return this.request(`/claims/${claimId}`, {
      method: 'PATCH',
      body: JSON.stringify(updates),
    });
  }

  /**
   * Assign contractor to claim
   */
  async assignContractor(
    claimId: string,
    contractorId: string,
    notes?: string
  ): Promise<ContractorAssignment> {
    return this.request(`/claims/${claimId}/assign`, {
      method: 'POST',
      body: JSON.stringify({
        contractorId,
        notes,
        assignedDate: new Date(),
      }),
    });
  }

  /**
   * Get contractor assignments
   */
  async getContractorAssignments(
    contractorId: string
  ): Promise<ContractorAssignment[]> {
    return this.request(`/contractors/${contractorId}/assignments`);
  }

  /**
   * Update assignment status
   */
  async updateAssignmentStatus(
    claimId: string,
    contractorId: string,
    status: ContractorAssignment['status'],
    notes?: string
  ): Promise<ContractorAssignment> {
    return this.request(`/claims/${claimId}/assignments/${contractorId}`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes }),
    });
  }

  /**
   * Upload document to claim
   */
  async uploadDocument(
    claimId: string,
    file: File | Buffer,
    type: string
  ): Promise<{ url: string; documentId: string }> {
    const formData = new FormData();
    
    if (file instanceof File) {
      formData.append('file', file);
    } else {
      formData.append('file', new Blob([file]));
    }
    formData.append('type', type);

    const response = await fetch(`${this.apiUrl}/claims/${claimId}/documents`, {
      method: 'POST',
      headers: {
        'X-API-Key': this.apiKey,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Document upload failed: ${response.status}`);
    }

    return response.json();
  }

  /**
   * Get claim documents
   */
  async getDocuments(claimId: string): Promise<any[]> {
    return this.request(`/claims/${claimId}/documents`);
  }

  /**
   * Submit claim for approval
   */
  async submitForApproval(claimId: string): Promise<Claim> {
    return this.request(`/claims/${claimId}/submit`, {
      method: 'POST',
    });
  }

  /**
   * Approve claim
   */
  async approveClaim(
    claimId: string,
    approvedValue: number,
    notes?: string
  ): Promise<Claim> {
    return this.request(`/claims/${claimId}/approve`, {
      method: 'POST',
      body: JSON.stringify({ approvedValue, notes }),
    });
  }

  /**
   * Reject claim
   */
  async rejectClaim(claimId: string, reason: string): Promise<Claim> {
    return this.request(`/claims/${claimId}/reject`, {
      method: 'POST',
      body: JSON.stringify({ reason }),
    });
  }

  /**
   * Complete claim
   */
  async completeClaim(
    claimId: string,
    completionReport: {
      finalCost: number;
      completedWork: string;
      photos?: string[];
      notes?: string;
    }
  ): Promise<Claim> {
    return this.request(`/claims/${claimId}/complete`, {
      method: 'POST',
      body: JSON.stringify(completionReport),
    });
  }

  /**
   * Search claims
   */
  async searchClaims(query: string): Promise<Claim[]> {
    return this.request(`/claims/search?q=${encodeURIComponent(query)}`);
  }

  /**
   * Get statistics
   */
  async getStatistics(params?: {
    from?: Date;
    to?: Date;
    groupBy?: 'day' | 'week' | 'month';
  }): Promise<any> {
    const queryParams = new URLSearchParams();
    
    if (params?.from) queryParams.append('from', params.from.toISOString());
    if (params?.to) queryParams.append('to', params.to.toISOString());
    if (params?.groupBy) queryParams.append('groupBy', params.groupBy);

    return this.request(`/statistics?${queryParams}`);
  }

  /**
   * Verify webhook signature
   */
  verifyWebhookSignature(payload: string, signature: string): boolean {
    const crypto = require('crypto');
    const expectedSignature = crypto
      .createHmac('sha256', this.webhookSecret)
      .update(payload)
      .digest('hex');
    
    return crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature)
    );
  }

  /**
   * Register webhook
   */
  async registerWebhook(
    url: string,
    events: string[]
  ): Promise<{ webhookId: string; secret: string }> {
    return this.request('/webhooks', {
      method: 'POST',
      body: JSON.stringify({ url, events }),
    });
  }

  /**
   * Unregister webhook
   */
  async unregisterWebhook(webhookId: string): Promise<void> {
    await this.request(`/webhooks/${webhookId}`, {
      method: 'DELETE',
    });
  }

  /**
   * Get API health status
   */
  async getHealth(): Promise<{
    status: 'healthy' | 'degraded' | 'down';
    version: string;
    timestamp: Date;
  }> {
    return this.request('/health');
  }
}

// Singleton instance
let cleanClaimsAPI: CleanClaimsAPI | null = null;

export function getCleanClaimsAPI(): CleanClaimsAPI {
  if (!cleanClaimsAPI) {
    cleanClaimsAPI = new CleanClaimsAPI();
  }
  return cleanClaimsAPI;
}

// Webhook event types
export const WEBHOOK_EVENTS = {
  CLAIM_CREATED: 'claim.created',
  CLAIM_UPDATED: 'claim.updated',
  CLAIM_APPROVED: 'claim.approved',
  CLAIM_REJECTED: 'claim.rejected',
  CLAIM_COMPLETED: 'claim.completed',
  CONTRACTOR_ASSIGNED: 'contractor.assigned',
  CONTRACTOR_ACCEPTED: 'contractor.accepted',
  CONTRACTOR_COMPLETED: 'contractor.completed',
  DOCUMENT_UPLOADED: 'document.uploaded',
} as const;

export type WebhookEvent = typeof WEBHOOK_EVENTS[keyof typeof WEBHOOK_EVENTS];