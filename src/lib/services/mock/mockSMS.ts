/**
 * Mock SMS Service
 * Simulates SMS sending for demo purposes
 */

class MockSMSService {
  private sentMessages: any[] = [];
  
  async sendSMS(to: string, message: string): Promise<{ success: boolean; messageId: string }> {
    await new Promise(resolve => setTimeout(resolve, 300));
    
    const sms = {
      id: `sms_${Date.now()}`,
      to,
      message,
      sentAt: new Date().toISOString(),
      status: 'delivered'
    };
    
    this.sentMessages.push(sms);
    console.log('📱 Mock SMS Sent:', { to, message: message.substring(0, 50) + '...' });
    
    return { success: true, messageId: sms.id };
  }
  
  async sendEmergencyAlert(phone: string, jobId: string): Promise<void> {
    await this.sendSMS(phone, 
      `🚨 EMERGENCY JOB ${jobId} - Immediate response required. Log in to accept.`
    );
  }
}

export const mockSMSService = new MockSMSService();