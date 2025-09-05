/**
 * Email Template System for Disaster Recovery Platform
 * Provides all critical email templates for notifications
 */

interface EmailTemplate {
  subject: string;
  html: string;
  text: string;
}

interface EmailData {
  [key: string]: any;
}

/**
 * Base template wrapper for consistent styling
 */
const wrapTemplate = (content: string, data: EmailData): string => `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <style>
    body { font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #f4f4f4; }
    .container { max-width: 600px; margin: 0 auto; background-color: #ffffff; }
    .header { background-color: #2563eb; color: white; padding: 20px; text-align: center; }
    .content { padding: 20px; }
    .footer { background-color: #f8f9fa; padding: 20px; text-align: center; font-size: 12px; color: #666; }
    .button { display: inline-block; padding: 12px 24px; background-color: #2563eb; color: white; text-decoration: none; border-radius: 4px; margin: 10px 0; }
    .urgent { background-color: #ef4444; color: white; padding: 10px; border-radius: 4px; margin: 10px 0; }
  </style>
</head>
<body>
  <div class="container">
    <div class="header">
      <h1>Disaster Recovery Platform</h1>
    </div>
    <div class="content">
      ${content}
    </div>
    <div class="footer">
      <p>© ${new Date().getFullYear()} Disaster Recovery Platform. All rights reserved.</p>
      <p>This is an automated message. Please do not reply to this email.</p>
    </div>
  </div>
</body>
</html>
`;

/**
 * Lead Assignment Email Template
 */
export const leadAssignmentTemplate = (data: {
  partnerName: string;
  leadId: string;
  customerName: string;
  address: string;
  damageType: string;
  urgency: string;
  leadValue: number;
}): EmailTemplate => ({
  subject: `New Lead Assignment: ${data.customerName} - ${data.urgency} Priority`,
  html: wrapTemplate(`
    <h2>New Lead Assigned to You</h2>
    ${data.urgency === 'IMMEDIATE' ? '<div class="urgent">⚠️ IMMEDIATE RESPONSE REQUIRED</div>' : ''}
    
    <h3>Customer Information</h3>
    <p><strong>Name:</strong> ${data.customerName}</p>
    <p><strong>Location:</strong> ${data.address}</p>
    <p><strong>Damage Type:</strong> ${data.damageType}</p>
    <p><strong>Priority:</strong> ${data.urgency}</p>
    
    <h3>Lead Details</h3>
    <p><strong>Lead ID:</strong> ${data.leadId}</p>
    <p><strong>Lead Value:</strong> $${data.leadValue}</p>
    
    <div style="margin: 20px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/contractor/leads/${data.leadId}" class="button">
        View Lead Details
      </a>
    </div>
    
    <p><strong>Important:</strong> Please respond within 60 minutes to maintain your rating.</p>
  `, data),
  text: `
New Lead Assignment

Customer: ${data.customerName}
Location: ${data.address}
Damage Type: ${data.damageType}
Priority: ${data.urgency}
Lead Value: $${data.leadValue}

View details at: ${process.env.NEXT_PUBLIC_APP_URL}/contractor/leads/${data.leadId}

Please respond within 60 minutes.
  `
});

/**
 * Lead Notification Email Template (for customers)
 */
export const leadNotificationTemplate = (data: {
  customerName: string;
  referenceNumber: string;
  damageType: string;
  estimatedResponse: string;
}): EmailTemplate => ({
  subject: `Your Emergency Request #${data.referenceNumber} - Help is on the way`,
  html: wrapTemplate(`
    <h2>We've Received Your Emergency Request</h2>
    
    <p>Dear ${data.customerName},</p>
    
    <p>Thank you for contacting our 24/7 emergency response service. We understand this is a stressful time, and we're here to help.</p>
    
    <h3>Your Request Details</h3>
    <p><strong>Reference Number:</strong> ${data.referenceNumber}</p>
    <p><strong>Service Type:</strong> ${data.damageType}</p>
    <p><strong>Estimated Response Time:</strong> ${data.estimatedResponse}</p>
    
    <h3>What Happens Next?</h3>
    <ol>
      <li>A certified contractor is being assigned to your case</li>
      <li>You'll receive confirmation when they're on the way</li>
      <li>The contractor will contact you directly within ${data.estimatedResponse}</li>
      <li>Emergency mitigation work will begin upon arrival</li>
    </ol>
    
    <div style="margin: 20px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/track/${data.referenceNumber}" class="button">
        Track Your Request
      </a>
    </div>
    
    <p>If you have any urgent updates, please use our live chat system.</p>
  `, data),
  text: `
Your Emergency Request #${data.referenceNumber}

Dear ${data.customerName},

We've received your emergency request for ${data.damageType}.

Estimated Response Time: ${data.estimatedResponse}

What happens next:
1. A certified contractor is being assigned
2. You'll receive confirmation when they're on the way
3. Direct contact within ${data.estimatedResponse}
4. Emergency work begins upon arrival

Track your request at: ${process.env.NEXT_PUBLIC_APP_URL}/track/${data.referenceNumber}
  `
});

/**
 * Contractor Approval Email Template
 */
export const contractorApprovalTemplate = (data: {
  contractorName: string;
  companyName: string;
  approvalDate: string;
  nextSteps: string[];
}): EmailTemplate => ({
  subject: `Welcome to the Network - ${data.companyName} Approved`,
  html: wrapTemplate(`
    <h2>🎉 Congratulations! Your Application Has Been Approved</h2>
    
    <p>Dear ${data.contractorName},</p>
    
    <p>We're pleased to inform you that <strong>${data.companyName}</strong> has been approved to join our certified contractor network.</p>
    
    <h3>Approval Details</h3>
    <p><strong>Approval Date:</strong> ${data.approvalDate}</p>
    <p><strong>Status:</strong> Active</p>
    
    <h3>Next Steps</h3>
    <ol>
      ${data.nextSteps.map(step => `<li>${step}</li>`).join('')}
    </ol>
    
    <div style="margin: 20px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/contractor/dashboard" class="button">
        Access Your Dashboard
      </a>
    </div>
    
    <p>Welcome to our network of elite disaster recovery professionals!</p>
  `, data),
  text: `
Congratulations! ${data.companyName} Approved

Dear ${data.contractorName},

Your application has been approved on ${data.approvalDate}.

Next Steps:
${data.nextSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

Access your dashboard at: ${process.env.NEXT_PUBLIC_APP_URL}/contractor/dashboard

Welcome to our network!
  `
});

/**
 * Payment Confirmation Email Template
 */
export const paymentConfirmationTemplate = (data: {
  customerName: string;
  amount: number;
  invoiceNumber: string;
  paymentDate: string;
  description: string;
}): EmailTemplate => ({
  subject: `Payment Confirmation - Invoice #${data.invoiceNumber}`,
  html: wrapTemplate(`
    <h2>Payment Received</h2>
    
    <p>Dear ${data.customerName},</p>
    
    <p>Thank you for your payment. This email confirms that we have successfully received your payment.</p>
    
    <h3>Payment Details</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Invoice Number:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.invoiceNumber}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Amount Paid:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">$${data.amount.toFixed(2)}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Payment Date:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.paymentDate}</td>
      </tr>
      <tr>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;"><strong>Description:</strong></td>
        <td style="padding: 8px; border-bottom: 1px solid #ddd;">${data.description}</td>
      </tr>
    </table>
    
    <p>A copy of your receipt has been saved to your account.</p>
    
    <div style="margin: 20px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/account/invoices" class="button">
        View All Invoices
      </a>
    </div>
  `, data),
  text: `
Payment Confirmation

Invoice #${data.invoiceNumber}
Amount: $${data.amount.toFixed(2)}
Date: ${data.paymentDate}
Description: ${data.description}

View all invoices at: ${process.env.NEXT_PUBLIC_APP_URL}/account/invoices
  `
});

/**
 * Job Completion Email Template
 */
export const jobCompletionTemplate = (data: {
  customerName: string;
  jobId: string;
  completionDate: string;
  contractorName: string;
  nextSteps: string[];
}): EmailTemplate => ({
  subject: `Job Completed - Reference #${data.jobId}`,
  html: wrapTemplate(`
    <h2>Your Restoration Job Has Been Completed</h2>
    
    <p>Dear ${data.customerName},</p>
    
    <p>We're pleased to inform you that your restoration work has been completed by ${data.contractorName}.</p>
    
    <h3>Completion Details</h3>
    <p><strong>Job Reference:</strong> ${data.jobId}</p>
    <p><strong>Completion Date:</strong> ${data.completionDate}</p>
    <p><strong>Contractor:</strong> ${data.contractorName}</p>
    
    <h3>Next Steps</h3>
    <ol>
      ${data.nextSteps.map(step => `<li>${step}</li>`).join('')}
    </ol>
    
    <div style="margin: 20px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/feedback/${data.jobId}" class="button">
        Provide Feedback
      </a>
    </div>
    
    <p>Thank you for choosing our disaster recovery services.</p>
  `, data),
  text: `
Job Completed - Reference #${data.jobId}

Dear ${data.customerName},

Your restoration work has been completed by ${data.contractorName} on ${data.completionDate}.

Next Steps:
${data.nextSteps.map((step, i) => `${i + 1}. ${step}`).join('\n')}

Provide feedback at: ${process.env.NEXT_PUBLIC_APP_URL}/feedback/${data.jobId}
  `
});

/**
 * Weekly Summary Email Template (for contractors)
 */
export const weeklyContractorSummaryTemplate = (data: {
  contractorName: string;
  weekStartDate: string;
  totalLeads: number;
  acceptedLeads: number;
  completedJobs: number;
  revenue: number;
  rating: number;
}): EmailTemplate => ({
  subject: `Weekly Performance Summary - ${data.weekStartDate}`,
  html: wrapTemplate(`
    <h2>Your Weekly Performance Summary</h2>
    
    <p>Hi ${data.contractorName},</p>
    
    <p>Here's your performance summary for the week of ${data.weekStartDate}:</p>
    
    <h3>📊 Key Metrics</h3>
    <table style="width: 100%; border-collapse: collapse;">
      <tr>
        <td style="padding: 12px; background-color: #f8f9fa;"><strong>Total Leads Received:</strong></td>
        <td style="padding: 12px; background-color: #f8f9fa; text-align: right;">${data.totalLeads}</td>
      </tr>
      <tr>
        <td style="padding: 12px;"><strong>Leads Accepted:</strong></td>
        <td style="padding: 12px; text-align: right;">${data.acceptedLeads}</td>
      </tr>
      <tr>
        <td style="padding: 12px; background-color: #f8f9fa;"><strong>Jobs Completed:</strong></td>
        <td style="padding: 12px; background-color: #f8f9fa; text-align: right;">${data.completedJobs}</td>
      </tr>
      <tr>
        <td style="padding: 12px;"><strong>Revenue Generated:</strong></td>
        <td style="padding: 12px; text-align: right;">$${data.revenue.toFixed(2)}</td>
      </tr>
      <tr>
        <td style="padding: 12px; background-color: #f8f9fa;"><strong>Average Rating:</strong></td>
        <td style="padding: 12px; background-color: #f8f9fa; text-align: right;">⭐ ${data.rating.toFixed(1)}/5.0</td>
      </tr>
    </table>
    
    <div style="margin: 20px 0;">
      <a href="${process.env.NEXT_PUBLIC_APP_URL}/contractor/analytics" class="button">
        View Detailed Analytics
      </a>
    </div>
  `, data),
  text: `
Weekly Performance Summary - ${data.weekStartDate}

Hi ${data.contractorName},

Your metrics for this week:
- Total Leads: ${data.totalLeads}
- Accepted: ${data.acceptedLeads}
- Completed: ${data.completedJobs}
- Revenue: $${data.revenue.toFixed(2)}
- Rating: ${data.rating.toFixed(1)}/5.0

View details at: ${process.env.NEXT_PUBLIC_APP_URL}/contractor/analytics
  `
});

/**
 * Send email using the configured email service
 */
export async function sendEmail(to: string, template: EmailTemplate): Promise<boolean> {
  try {
    // This would integrate with your email service (SendGrid, Resend, etc.)
    const response = await fetch('/api/email/send', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        to,
        subject: template.subject,
        html: template.html,
        text: template.text
      })
    });

    return response.ok;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}