/**
 * Mock Database Service
 * Provides in-memory database for demo purposes
 */

import { getMockContractors, getMockLeads, getMockKPIs, getMockDashboardStats } from './mockDataGenerator';

class MockDatabaseService {
  // Simulate database operations with mock data
  
  async findContractor(id: string): Promise<any> {
    const contractors = getMockContractors();
    return contractors.find(c => c.id === id) || null;
  }
  
  async findContractors(filters?: any): Promise<any[]> {
    return getMockContractors(filters);
  }
  
  async findLead(id: string): Promise<any> {
    const leads = getMockLeads();
    return leads.find(l => l.id === id) || null;
  }
  
  async findLeads(filters?: any): Promise<any[]> {
    return getMockLeads(filters);
  }
  
  async createLead(data: any): Promise<any> {
    const lead = {
      id: `lead_${Date.now()}`,
      ...data,
      createdAt: new Date().toISOString(),
      status: 'new',
      paymentStatus: 'pending'
    };
    
    console.log('📝 Mock Lead Created:', lead);
    return lead;
  }
  
  async updateLead(id: string, data: any): Promise<any> {
    console.log('📝 Mock Lead Updated:', { id, ...data });
    return { id, ...data, updatedAt: new Date().toISOString() };
  }
  
  async assignContractor(leadId: string, contractorId: string): Promise<any> {
    console.log('👷 Mock Contractor Assigned:', { leadId, contractorId });
    return {
      success: true,
      leadId,
      contractorId,
      assignedAt: new Date().toISOString()
    };
  }
  
  async getKPIs(contractorId: string, period?: string): Promise<any[]> {
    return getMockKPIs(contractorId, period);
  }
  
  async getDashboardStats(): Promise<any> {
    return getMockDashboardStats();
  }
  
  async createPayment(data: any): Promise<any> {
    const payment = {
      id: `payment_${Date.now()}`,
      ...data,
      status: 'completed',
      processedAt: new Date().toISOString()
    };
    
    console.log('💰 Mock Payment Created:', payment);
    return payment;
  }
  
  async releasePayment(contractorId: string, amount: number, type: string): Promise<any> {
    console.log('💸 Mock Payment Released:', { contractorId, amount, type });
    return {
      success: true,
      contractorId,
      amount,
      type,
      releasedAt: new Date().toISOString(),
      transferId: `transfer_${Date.now()}`
    };
  }
  
  // Session/Auth mock
  async createSession(email: string): Promise<any> {
    return {
      user: {
        id: `user_${Date.now()}`,
        email,
        name: 'Demo User',
        role: email.includes('admin') ? 'admin' : 'contractor'
      },
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString()
    };
  }
}

export const mockDatabaseService = new MockDatabaseService();