/**
 * Mock Background Check Service (PISA)
 * Simulates background verification for demo purposes
 */

class MockBackgroundCheckService {
  async performCheck(contractorData: any): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    return {
      checkId: `PISA_${Date.now()}`,
      status: 'completed',
      results: {
        identityVerified: true,
        criminalHistory: 'clear',
        creditCheck: 'satisfactory',
        licenseValid: true,
        abnStatus: 'active',
        riskScore: 15, // 0-100, lower is better
        recommendation: 'approved'
      },
      completedAt: new Date().toISOString()
    };
  }
  
  async verifyABN(abn: string): Promise<any> {
    await new Promise(resolve => setTimeout(resolve, 500));
    
    return {
      valid: true,
      entityName: `Mock Business ${abn}`,
      entityType: 'Company',
      gstRegistered: true,
      status: 'Active',
      registrationDate: '2020-01-15'
    };
  }
}

export const mockBackgroundCheckService = new MockBackgroundCheckService();