/**
 * Mock Email Service
 * Simulates email sending for demo purposes
 */

interface MockEmail {
  id: string;
  to: string;
  from: string;
  subject: string;
  html: string;
  text?: string;
  sentAt: string;
  status: 'sent' | 'failed' | 'pending';
}

class MockEmailService {
  private sentEmails: MockEmail[] = [];
  
  async sendEmail(params: {
    to: string;
    subject: string;
    html: string;
    text?: string;
    from?: string;
  }): Promise<{ success: boolean; messageId: string }> {
    // Simulate email sending delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    const email: MockEmail = {
      id: `email_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      to: params.to,
      from: params.from || 'noreply@disasterrecovery.com.au',
      subject: params.subject,
      html: params.html,
      text: params.text,
      sentAt: new Date().toISOString(),
      status: 'sent'
    };
    
    this.sentEmails.push(email);
    
    // Log to console in demo mode
    console.log('📧 Mock Email Sent:', {
      to: email.to,
      subject: email.subject,
      preview: email.text?.substring(0, 100) + '...'
    });
    
    return {
      success: true,
      messageId: email.id
    };
  }
  
  async sendBookingConfirmation(booking: any): Promise<void> {
    const html = `
      <h2>Booking Confirmation</h2>
      <p>Dear ${booking.customerName},</p>
      <p>Your emergency service booking has been confirmed.</p>
      <ul>
        <li>Booking ID: ${booking.id}</li>
        <li>Service: ${booking.serviceType}</li>
        <li>Amount Paid: $${booking.amount}</li>
        <li>Contractor will contact you within: ${booking.responseTime}</li>
      </ul>
      <p>Thank you for choosing Disaster Recovery.</p>
    `;
    
    await this.sendEmail({
      to: booking.email,
      subject: `Booking Confirmation - ${booking.id}`,
      html,
      text: html.replace(/<[^>]*>/g, '')
    });
  }
  
  async sendContractorNotification(contractor: any, job: any): Promise<void> {
    const html = `
      <h2>New Job Assignment</h2>
      <p>You have been assigned a new ${job.urgencyLevel} job.</p>
      <ul>
        <li>Job ID: ${job.id}</li>
        <li>Service Type: ${job.serviceType}</li>
        <li>Location: ${job.location}</li>
        <li>Customer: ${job.customerName}</li>
        <li>Response Required: ${job.responseTime}</li>
      </ul>
      <p>Please log in to your dashboard to accept this job.</p>
    `;
    
    await this.sendEmail({
      to: contractor.email,
      subject: `🚨 ${job.urgencyLevel.toUpperCase()} Job Assignment - ${job.id}`,
      html,
      text: html.replace(/<[^>]*>/g, '')
    });
  }
  
  async sendPaymentReleasedNotification(contractor: any, amount: number): Promise<void> {
    const html = `
      <h2>Payment Released</h2>
      <p>Good news! A payment has been released to your account.</p>
      <ul>
        <li>Amount: $${amount.toFixed(2)}</li>
        <li>Status: Processing</li>
        <li>Expected Arrival: 2-3 business days</li>
      </ul>
      <p>Thank you for your excellent service!</p>
    `;
    
    await this.sendEmail({
      to: contractor.email,
      subject: '💰 Payment Released - $' + amount.toFixed(2),
      html,
      text: html.replace(/<[^>]*>/g, '')
    });
  }
  
  getSentEmails(): MockEmail[] {
    return this.sentEmails;
  }
}

export const mockEmailService = new MockEmailService();