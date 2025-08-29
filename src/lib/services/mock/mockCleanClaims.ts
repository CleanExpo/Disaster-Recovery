/**
 * Mock Clean Claims Service (CARSI)
 * Simulates insurance industry integration for demo purposes
 */

class MockCleanClaimsService {
  async submitCleanClaim(claimData: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      claimId: `CARSI_${Date.now()}`,
      status: 'accepted',
      insurerResponse: 'approved',
      authorisationNumber: `AUTH${Date.now()}`,
      approvedAmount: claimData.estimatedCost * 0.9,
      excessAmount: 500,
      paymentMethod: 'direct_to_contractor',
      processingTime: '24-48 hours'
    };
  }
  
  async getClaimStatus(claimId: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      claimId,
      status: 'in_progress',
      lastUpdated: new Date().toISOString(),
      currentStage: 'Assessment Complete',
      nextStage: 'Awaiting Insurer Approval',
      estimatedCompletion: '2-3 business days'
    };
  }
  
  async validateContractor(contractorId: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      contractorId,
      carsiApproved: true,
      insurerNetwork: ['NRMA', 'AAMI', 'Suncorp', 'Allianz'],
      preferredStatus: true,
      rating: 'A+',
      validUntil: '2025-12-31'
    };
  }
}

export const mockCleanClaimsService = new MockCleanClaimsService();