/**
 * Mock Insurance Service
 * Simulates insurance verification for demo purposes
 */

class MockInsuranceService {
  async verifyPolicy(policyNumber: string, insurer: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    return {
      valid: true,
      policyNumber,
      insurer,
      coverageType: 'Comprehensive',
      excessAmount: 500,
      coverageLimit: 100000,
      expiryDate: '2025-12-31'
    };
  }
  
  async submitClaim(claimData: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    return {
      claimNumber: `CLM${Date.now()}`,
      status: 'submitted',
      estimatedProcessing: '3-5 business days',
      adjusterAssigned: 'John Smith',
      nextStep: 'Awaiting adjuster inspection'
    };
  }
  
  async verifyContractorInsurance(abn: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 800));
    
    return {
      valid: true,
      publicLiability: 20000000,
      professionalIndemnity: 5000000,
      workersCompensation: true,
      expiryDate: '2025-06-30',
      insurer: 'CGU Insurance'
    };
  }
}

export const mockInsuranceService = new MockInsuranceService();