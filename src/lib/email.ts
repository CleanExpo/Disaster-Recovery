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
    pass: process.env.SMTP_PASS || '' },
  from: process.env.EMAIL_FROM || 'noreply@disasterrecovery.com.au' };

// Create transporter
const transporter = nodemailer.createTransport(EMAIL_CONFIG);

// Email templates
export const emailTemplates = {
  leadNotification: (leadData: any) => ({
    subject: `New Lead: ${leadData.fullName} - ${leadData.serviceType}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <h2 style="colour: #0052CC;">New Lead Received</h2>
        
        <div style="background: #f5f5f5; padding: 20px; border-radius: 8px; margin: 20px 0;">
          <h3 style="colour: #333; margin-top: 0;">Lead Details</h3>
          
          <table style="width: 100%; border-collapse: collapse;">
            <tr>
              <td style="padding: 8px 0; colour: #666;"><strong>Name:</strong></td>
              <td style="padding: 8px 0;">${leadData.fullName}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; colour: #666;"><strong>email:</strong></td>
              <td style="padding: 8px 0;">${leadData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; colour: #666;"><strong>Email:</strong></td>
              <td style="padding: 8px 0;">${leadData.email}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; colour: #666;"><strong>Service:</strong></td>
              <td style="padding: 8px 0;">${leadData.serviceType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; colour: #666;"><strong>Location:</strong></td>
              <td style="padding: 8px 0;">${leadData.suburb}, ${leadData.state} ${leadData.postcode}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; colour: #666;"><strong>Property Type:</strong></td>
              <td style="padding: 8px 0;">${leadData.propertyType}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; colour: #666;"><strong>Urgency:</strong></td>
              <td style="padding: 8px 0;">
                <span style="background: ${leadData.urgencyLevel === 'emergency' ? '#ff4444' : leadData.urgencyLevel === 'urgent' ? '#ff8800' : '#44aa00'}; 
                       colour: white; padding: 4px 8px; border-radius: 4px;">
                  ${leadData.urgencyLevel.toUpperCase()}
                </span>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; colour: #666;"><strong>Insurance:</strong></td>
              <td style="padding: 8px 0;">${leadData.hasInsurance ? 'Yes' : 'No'}</td>
            </tr>
            <tr>
              <td style="padding: 8px 0; colour: #666;"><strong>Lead Score:</strong></td>
              <td style="padding: 8px 0;">
                <strong style="colour: ${leadData.leadScore >= 70 ? '#44aa00' : leadData.leadScore >= 50 ? '#ff8800' : '#ff4444'};">
                  ${leadData.leadScore}/100
                </strong>
              </td>
            </tr>
            <tr>
              <td style="padding: 8px 0; colour: #666;"><strong>Lead Value:</strong></td>
              <td style="padding: 8px 0;"><strong>$${leadData.leadValue}</strong></td>
            </tr>
          </table>
        </div>
        
        <div style="background: #fff3cd; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #ffc107;">
          <h4 style="margin-top: 0; colour: #856404;">Description of Damage</h4>
          <p style="colour: #856404;">${leadData.description || 'No description provided'}</p>
        </div>
        
        <div style="text-align: centre; margin: 30px 0;">
          <a href="${SITE_URL}/partner-portal/leads/${leadData.id}" 
             style="display: inline-block; background: #0052CC; colour: white; padding: 12px 30px; 
                    text-decoration: none; border-radius: 5px; font-weight: bold;">
            View Lead in Portal
          </a>
        </div>
        
        <div style="border-top: 1px solid #ddd; margin-top: 30px; padding-top: 20px; colour: #666; font-size: 12px;">
          <p>This lead was generated on ${new Date(leadData.createdAt).toLocaleString('en-AU')}.</p>
          <p>Response time requirement: ${leadData.urgencyLevel === 'emergency' ? '30 minutes' : '2-4 hours'}</p>
        </div>
      </div>
    ` }),

  leadConfirmation: (leadData: any) => ({
    subject: 'We\'ve Received Your Emergency Request - Disaster Recovery',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0052CC; padding: 30px; text-align: centre;">
          <h1 style="colour: white; margin: 0;">Help is on the way!</h1>
        </div>
        
        <div style="padding: 30px;">
          <p style="font-size: 16px;">Dear ${leadData.fullName},</p>
          
          <p style="font-size: 16px; line-height: 1.6;">
            Thank you for contacting Disaster Recovery. We understand this is a stressful time, 
            and we're here to help you through it.
          </p>
          
          <div style="background: #f0f8ff; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="colour: #0052CC; margin-top: 0;">What happens next?</h3>
            <ol style="line-height: 1.8;">
              <li>A certified restoration specialist will contact you within 
                  <strong>${leadData.urgencyLevel === 'emergency' ? '30 minutes' : '2-4 hours'}</strong></li>
              <li>They will assess your situation and provide immediate guidance</li>
              <li>If needed, an emergency response team will be dispatched to your property</li>
              <li>We'll work with your insurance company to streamline the claims process</li>
            </ol>
          </div>
          
          <div style="background: #fff3cd; padding: 20px; border-radius: 8px; margin: 20px 0;">
            <h3 style="colour: #856404; margin-top: 0;">Immediate Safety Tips</h3>
            <ul style="line-height: 1.8; colour: #856404;">
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
          
          <div style="text-align: centre; margin: 30px 0;">
            <p style="font-size: 18px; colour: #0052CC; font-weight: bold;">
              24/7 
            </p>
            <p style="colour: #666;">()</p>
          </div>
          
          <p style="font-size: 16px; line-height: 1.6;">
            If your situation becomes more urgent, please don't hesitate to Contact Us Online immediately.
          </p>
          
          <p style="font-size: 16px;">
            Best regards,<br>
            The Disaster Recovery Team
          </p>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; text-align: centre; colour: #666; font-size: 12px;">
          <p>This email was sent to ${leadData.email}</p>
          <p>Disaster Recovery | Brisbane, QLD | ABN: [To be provided]</p>
          <p><a href="${SITE_URL}" style="colour: #0052CC;">www.disasterrecovery.com.au</a></p>
        </div>
      </div>
    ` }),

  contractorWelcome: (name: string, applicationId: string) => ({
    subject: 'Application Received — Welcome to National Recovery Partners Group',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: #0f172a; padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">National Recovery Partners Group</h1>
          <p style="color: #94a3b8; margin: 8px 0 0;">Contractor Network — Australia & New Zealand</p>
        </div>

        <div style="padding: 32px;">
          <p style="font-size: 16px; color: #1e293b;">Hi ${name},</p>

          <p style="font-size: 16px; color: #475569; line-height: 1.6;">
            Thank you for applying to join the NRPG contractor network. Your application has been received
            and your contractor profile has been created.
          </p>

          <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; border-radius: 4px; margin: 24px 0;">
            <p style="color: #15803d; margin: 0; font-weight: bold;">Application Reference: ${applicationId}</p>
          </div>

          <h3 style="color: #1e293b;">What Happens Next</h3>
          <ol style="color: #475569; line-height: 2;">
            <li><strong>Complete your onboarding payment</strong> — $275 application fee + $2,200 contractor entitlement ($2,475 total)</li>
            <li><strong>Begin your 14-day training program</strong> — daily modules covering insurance, IICRC standards, and claims procedures</li>
            <li><strong>Submit required documentation</strong> — licences, insurance certificates, and IICRC certifications</li>
            <li><strong>Start receiving leads</strong> — once certified, you will receive insurance claim referrals in your service area</li>
          </ol>

          <div style="background: #f8fafc; border: 1px solid #e2e8f0; padding: 20px; border-radius: 8px; margin: 24px 0;">
            <p style="color: #64748b; font-size: 14px; margin: 0 0 8px;">
              <strong>Subscription reminder:</strong> Month 1 is free while you complete training.
              Month 2 is charged at 60% off. Full rate from month 4.
            </p>
          </div>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${SITE_URL}/contractor/onboarding"
               style="display: inline-block; background: #0f172a; color: white; padding: 14px 32px;
                      text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
              Continue to Payment &amp; Onboarding
            </a>
          </div>

          <p style="color: #94a3b8; font-size: 13px; line-height: 1.6;">
            If you have questions, please use the contact form at
            <a href="${SITE_URL}/contact" style="color: #0052CC;">${SITE_URL}/contact</a>.
            Our team reviews applications within 1–2 business days.
          </p>
        </div>

        <div style="background: #f8fafc; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
          <p>National Recovery Partners Group | ABN 47 674 581 410</p>
          <p><a href="${SITE_URL}" style="color: #64748b;">disasterrecovery.com.au</a></p>
        </div>
      </div>
    `,
  }),

  contractorPaymentConfirmed: (name: string, applicationId: string) => ({
    subject: 'Payment Confirmed — Your NRPG Onboarding Has Begun',
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff;">
        <div style="background: #0f172a; padding: 32px; text-align: center;">
          <h1 style="color: #ffffff; margin: 0; font-size: 22px;">Payment Confirmed</h1>
          <p style="color: #94a3b8; margin: 8px 0 0;">National Recovery Partners Group</p>
        </div>

        <div style="padding: 32px;">
          <p style="font-size: 16px; color: #1e293b;">Hi ${name},</p>

          <p style="font-size: 16px; color: #475569; line-height: 1.6;">
            Your payment of <strong>$2,475.00 AUD</strong> has been confirmed. Your 14-day onboarding program is now active.
          </p>

          <div style="background: #f0fdf4; border-left: 4px solid #16a34a; padding: 16px; border-radius: 4px; margin: 24px 0;">
            <p style="color: #15803d; margin: 0;"><strong>Application Reference:</strong> ${applicationId}</p>
            <p style="color: #15803d; margin: 8px 0 0;"><strong>Amount Paid:</strong> $2,475.00 AUD</p>
            <p style="color: #15803d; margin: 8px 0 0;"><strong>Onboarding Status:</strong> Active — Day 1 unlocked</p>
          </div>

          <div style="text-align: center; margin: 32px 0;">
            <a href="${SITE_URL}/contractor/onboarding"
               style="display: inline-block; background: #16a34a; color: white; padding: 14px 32px;
                      text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 16px;">
              Start Day 1 Training
            </a>
          </div>
        </div>

        <div style="background: #f8fafc; padding: 20px; text-align: center; color: #94a3b8; font-size: 12px;">
          <p>National Recovery Partners Group | ABN 47 674 581 410</p>
          <p><a href="${SITE_URL}" style="color: #64748b;">disasterrecovery.com.au</a></p>
        </div>
      </div>
    `,
  }),

  partnerLeadAssignment: (partnerData: any, leadData: any) => ({
    subject: `New $${leadData.leadValue} Lead Assignment - ${leadData.suburb}`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #28a745; padding: 20px; text-align: centre;">
          <h2 style="colour: white; margin: 0;">New Lead Assignment</h2>
          <p style="colour: white; margin: 5px 0;">Value: $${leadData.leadValue}</p>
        </div>
        
        <div style="padding: 30px;">
          <p>Hello ${partnerData.businessName},</p>
          
          <p>A new high-value lead has been assigned to you. Please respond within the required timeframe.</p>
          
          <div style="background: #d4edda; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #28a745;">
            <h3 style="margin-top: 0; colour: #155724;">Response Required</h3>
            <p style="font-size: 18px; colour: #155724; margin: 5px 0;">
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
              <td style="padding: 10px; border: 1px solid #ddd;"><strong>email:</strong></td>
              <td style="padding: 10px; border: 1px solid #ddd;">
                <a href="#contact-form" style="colour: #0052CC; font-weight: bold;">${leadData.email}</a>
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
          
          <div style="text-align: centre; margin: 30px 0;">
            <a href="${SITE_URL}/partner-portal/leads/${leadData.id}/accept" 
               style="display: inline-block; background: #28a745; colour: white; padding: 15px 40px; 
                      text-decoration: none; border-radius: 5px; font-weight: bold; font-size: 16px;">
              Accept Lead & View Full Details
            </a>
          </div>
          
          <div style="background: #f8d7da; padding: 15px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #dc3545;">
            <h4 style="margin-top: 0; colour: #721c24;">Important Terms</h4>
            <ul style="colour: #721c24; margin: 5px 0;">
              <li>Lead fee of $${leadData.leadValue} will be charged upon acceptance</li>
              <li>You must contact the customer within the specified timeframe</li>
              <li>Failure to respond may result in reassignment and penalties</li>
              <li>Invalid lead claims must be submitted within 24 hours</li>
            </ul>
          </div>
          
          <p style="colour: #666; font-size: 14px;">
            Your current credit balance: $${partnerData.leadCredits}<br>
            ${partnerData.leadCredits < leadData.leadValue ? 
              '<strong style="colour: #dc3545;">⚠️ Insufficient credits - Please top up before accepting</strong>' : 
              'Credits will be deducted upon acceptance'}
          </p>
        </div>
        
        <div style="background: #f5f5f5; padding: 20px; text-align: centre; colour: #666; font-size: 12px;">
          <p>Partner Portal: <a href="${SITE_URL}/partner-portal">Login Here</a></p>
          <p>Support: partners@disasterrecovery.com.au</p>
        </div>
      </div>
    ` }) };

// Send email function
export async function sendEmail(to: string | string[], template: { subject: string; html: string; text?: string }) {
  try {
    const mailOptions: Record<string, unknown> = {
      from: EMAIL_CONFIG.from,
      to: Array.isArray(to) ? to.join(', ') : to,
      subject: template.subject,
      html: template.html,
    };
    if (template.text) {
      mailOptions.text = template.text;
    }

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
