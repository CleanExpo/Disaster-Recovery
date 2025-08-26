import nodemailer from 'nodemailer';

// Site URL with fallback
const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://disasterrecovery.com.au';

// Email configuration
const EMAIL_CONFIG = {
  host: process.env.SMTP_HOST || 'smtp.gmail.com',
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER || '',
    pass: process.env.SMTP_PASS || '',
  },
  from: process.env.EMAIL_FROM || 'noreply@disasterrecovery.com.au',
};

// Create transporter
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// Email templates
export const emailTemplates = {
  leadNotification: (leadData: any) => ({
    subject: `New Lead: ${leadData.fullName} - ${leadData.serviceType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="color: #0052CC;">New Lead Received</h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="color: #333; margin-top: 0;">Lead Details</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Name:</strong></td>
              <td style="padding: 8px 0;">${leadData.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Phone:</strong></td>
              <td style="padding: 8px 0;">${leadData.phone}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;">${leadData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Service:</strong></td>
              <td style="padding: 8px 0;">${leadData.serviceType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Location:</strong></td>
              <td style="padding: 8px 0;">${leadData.suburb}, ${leadData.state} ${leadData.postcode}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Property Type:</strong></td>
              <td style="padding: 8px 0;">${leadData.propertyType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Urgency:</strong></td>
              <td style="padding: 8px 0;">
                <span style="background: ${leadData.urgencyLevel === 'emergency' ? '#ff4444' : leadData.urgencyLevel === 'urgent' ? '#ff8800' : '#44aa00'}; 
                       color: white; padding: 4px 8px; border-radius: 4px;">
                  ${leadData.urgencyLevel.toUpperCase()}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Insurance:</strong></td>
              <td style="padding: 8px 0;">${leadData.hasInsurance ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Lead Score:</strong></td>
              <td style="padding: 8px 0;">
                <strong style="color: ${leadData.leadScore >= 70 ? '#44aa00' : leadData.leadScore >= 50 ? '#ff8800' : '#ff4444'};">
                  ${leadData.leadScore}/100
                </strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; color: #666;"><strong>Lead Value:</strong></td>
              <td style="padding: 8px 0;"><strong>$${leadData.leadValue}</strong></td>
            </tr>
          </table>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <h4 style="margin-top: 0; color: #856404;">Description of Damage</h4>
          <p style="color: #856404;">${leadData.description || 'No description provided'}</p>
        </div>
        
        <div style="text-align: center; margin: 30px 0;">
          <a href="${SITE_URL}/partner-portal/leads/${leadData.id}" 
             style="display: inline-block; background: #0052CC; color: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 5px; font-weight: bold;">
            View Lead in Portal
          </a>
        </div>
        
        <div style="border-top: 1px solid #ddd; margin-top: 30px; padding-top: 20px; color: #666; font-size: 12px;">
          <p>This lead was generated on ${new Date(leadData.createdAt).toLocaleString('en-AU')}.</p>
          <p>Response time requirement: ${leadData.urgencyLevel === 'emergency' ? '30 minutes' : '2-4 hours'}</p>
        </div>
      </div>
    `,
  }),

  leadConfirmation: (leadData: any) => ({
    subject: 'We\'ve Received Your Emergency Request - Disaster Recovery Australia',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0052CC; padding: 30px; text-align: center;">
          <h1 style="color: white; margin: 0;">Help is on the way!</h1>
        </div>
        
        <div style="padding: 30px;">
          <p style="font-size: 16px;">Dear ${leadData.fullName},</p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Thank you for contacting Disaster Recovery Australia. We understand this is a stressful time, 
            and we're here to help you through it.
          </p>
          
          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #0052CC; margin-top: 0;">What happens next?</h3>
            <ol style="line-height: 1.8;">
              <li>A certified restoration specialist will contact you within 
                  <strong>${leadData.urgencyLevel === 'emergency' ? '30 minutes' : '2-4 hours'}</strong></li>
              <li>They will assess your situation and provide immediate guidance</li>
              <li>If needed, an emergency response team will be dispatched to your property</li>
              <li>We'll work with your insurance company to streamline the claims process</li>
            </ol>
          </div>
          
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="color: #856404; margin-top: 0;">Immediate Safety Tips</h3>
            <ul style="line-height: 1.8; color: #856404;">
              <li>Ensure all occupants are safe and evacuate if necessary</li>
              <li>Turn off electricity if there's standing water</li>
              <li>Document damage with photos for insurance purposes</li>
              <li>Don't attempt major cleanup without professional guidance</li>
              <li>Keep receipts for any emergency expenses</li>
            </ul>
          </div>
          
          <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="margin-top: 0;">Your Reference Details</h3>
            <p><strong>Reference Number:</strong> ${leadData.id}</p>
            <p><strong>Service Requested:</strong> ${leadData.serviceType}</p>
            <p><strong>Property Address:</strong> ${leadData.suburb}, ${leadData.state} ${leadData.postcode}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <p style="font-size: 18px; color: #0052CC; font-weight: bold;">
              24/7 Emergency Hotline: 1300 DISASTER
            </p>
            <p style="color: #666;">(1300 347 278)</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6;">
            If your situation becomes more urgent, please don't hesitate to call us immediately.
          </p>
          
          <p style="font-size: 16px;">
            Best regards,<br>
            The Disaster Recovery Australia Team
          </p>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>This email was sent to ${leadData.email}</p>
          <p>Disaster Recovery Australia | Brisbane, QLD | ABN: [To be provided]</p>
          <p><a href="${SITE_URL}" style="color: #0052CC;">www.disasterrecovery.com.au</a></p>
        </div>
      </div>
    `,
  }),

  partnerLeadAssignment: (partnerData: any, leadData: any) => ({
    subject: `New $${leadData.leadValue} Lead Assignment - ${leadData.suburb}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #28a745; padding: 20px; text-align: center;">
          <h2 style="color: white; margin: 0;">New Lead Assignment</h2>
          <p style="color: white; margin: 5px 0;">Value: $${leadData.leadValue}</p>
        </div>
        
        <div style="padding: 30px;">
          <p>Hello ${partnerData.businessName},</p>
          
          <p>A new high-value lead has been assigned to you. Please respond within the required timeframe.</p>
          
          <div style="background: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="margin-top: 0; color: #155724;">Response Required</h3>
            <p style="font-size: 18px; color: #155724; margin: 5px 0;">
              <strong>${leadData.urgencyLevel === 'emergency' ? '⚠️ 30 MINUTES' : '2-4 HOURS'}</strong>
            </p>
          </div>
          
          <h3>Customer Information</h3>
          <table style="width: 100%; border-collapse: collapse;">
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Name:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${leadData.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Phone:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">
                <a href="tel:${leadData.phone}" style="color: #0052CC; font-weight: bold;">${leadData.phone}</a>
              </td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Email:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${leadData.email}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Service:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${leadData.serviceType}</td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Location:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${leadData.address}</td>
            </tr>
            <tr>
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Insurance:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">
                ${leadData.hasInsurance ? '✅ Yes - Insurance Job' : '❌ No - Private Job'}
              </td>
            </tr>
            <tr style="background: #f5f5f5;">
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>Lead Score:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">${leadData.leadScore}/100</td>
            </tr>
          </table>
          
          <h3>Damage Description</h3>
          <div style="background: #f5f5f5; padding: 15px; border-radius: 8px;">
            <p>${leadData.description}</p>
          </div>
          
          <div style="text-align: center; margin: 30px 0;">
            <a href="${SITE_URL}/partner-portal/leads/${leadData.id}/accept" 
               style="display: inline-block; background: #28a745; color: white; padding: 15px 40px; 
                      text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
              Accept Lead & View Full Details
            </a>
          </div>
          
          <div style="background: #f8d7da; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc3545;">
            <h4 style="margin-top: 0; color: #721c24;">Important Terms</h4>
            <ul style="color: #721c24; margin: 5px 0;">
              <li>Lead fee of $${leadData.leadValue} will be charged upon acceptance</li>
              <li>You must contact the customer within the specified timeframe</li>
              <li>Failure to respond may result in reassignment and penalties</li>
              <li>Invalid lead claims must be submitted within 24 hours</li>
            </ul>
          </div>
          
          <p style="color: #666; font-size: 14px;">
            Your current credit balance: $${partnerData.leadCredits}<br>
            ${partnerData.leadCredits < leadData.leadValue ? 
              '<strong style="color: #dc3545;">⚠️ Insufficient credits - Please top up before accepting</strong>' : 
              'Credits will be deducted upon acceptance'}
          </p>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; text-align: center; color: #666; font-size: 12px;">
          <p>Partner Portal: <a href="${SITE_URL}/partner-portal">Login Here</a></p>
          <p>Support: partners@disasterrecovery.com.au | 1300 PARTNER</p>
        </div>
      </div>
    `,
  }),
};

// Send email function
export async function sendEmail(to: string | string[], template: { subject: string; html: string }) {
  try {
    const mailOptions = {
      from: EMAIL_CONFIG.from,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject: template.subject,
      html: template.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Email sent:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Email sending failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Queue email for sending (for production use with job queue)
export async function queueEmail(to: string | string[], template: { subject: string; html: string }, priority: 'high' | 'normal' | 'low' = 'normal') {
  // In production, this would add to a job queue (Bull, BullMQ, etc.)
  // For now, send immediately
  return sendEmail(to, template);
}

// Verify email configuration
export async function verifyEmailConfig() {
  try {
    await transporter.verify();
    console.log('Email configuration is valid');
    return true;
  } catch (error) {
    console.error('Email configuration error:', error);
    return false;
  }
}
