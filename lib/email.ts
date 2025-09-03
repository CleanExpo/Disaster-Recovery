/**
 * Email Service
 * Handles email sending through various providers
 */

interface EmailOptions {
  to: string | string[];
  subject: string;
  text?: string;
  html?: string;
  template?: string;
  data?: Record<string, any>;
  from?: string;
}

export async function sendEmail(options: EmailOptions): Promise<boolean> {
  try {
    const {
      to,
      subject,
      text,
      html,
      template,
      data,
      from = process.env.EMAIL_FROM || 'noreply@disaster-recovery.com'
    } = options;

    // Check if we have email service configured
    const hasResend = process.env.RESEND_API_KEY;
    const hasSendGrid = process.env.SENDGRID_API_KEY;

    if (!hasResend && !hasSendGrid) {
      console.warn('No email service configured. Email not sent:', { to, subject });
      return false;
    }

    // Use Resend if available
    if (hasResend) {
      return await sendWithResend(from, to, subject, text, html, template, data);
    }

    // Use SendGrid as fallback
    if (hasSendGrid) {
      return await sendWithSendGrid(from, to, subject, text, html, template, data);
    }

    return false;
  } catch (error) {
    console.error('Failed to send email:', error);
    return false;
  }
}

async function sendWithResend(
  from: string,
  to: string | string[],
  subject: string,
  text?: string,
  html?: string,
  template?: string,
  data?: Record<string, any>
): Promise<boolean> {
  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from,
        to: Array.isArray(to) ? to : [to],
        subject,
        text: text || generateTextFromTemplate(template, data),
        html: html || generateHtmlFromTemplate(template, data),
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('Resend email failed:', error);
    return false;
  }
}

async function sendWithSendGrid(
  from: string,
  to: string | string[],
  subject: string,
  text?: string,
  html?: string,
  template?: string,
  data?: Record<string, any>
): Promise<boolean> {
  try {
    const response = await fetch('https://api.sendgrid.com/v3/mail/send', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.SENDGRID_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        personalizations: [
          {
            to: Array.isArray(to) 
              ? to.map(email => ({ email }))
              : [{ email: to }],
          },
        ],
        from: { email: from },
        subject,
        content: [
          {
            type: 'text/plain',
            value: text || generateTextFromTemplate(template, data),
          },
          {
            type: 'text/html',
            value: html || generateHtmlFromTemplate(template, data),
          },
        ],
      }),
    });

    return response.ok;
  } catch (error) {
    console.error('SendGrid email failed:', error);
    return false;
  }
}

function generateTextFromTemplate(template?: string, data?: Record<string, any>): string {
  if (!template) return '';
  
  // Simple template generation for text emails
  const templates: Record<string, string> = {
    'background-check-approved': `Your background check has been approved. You can now start accepting jobs.`,
    'background-check-review': `Your background check requires additional review. We'll contact you soon.`,
    'background-check-failed': `Unfortunately, your background check has failed. Please contact support for more information.`,
    'api-key-rotated': `Your API key has been rotated for security. Please update your systems with the new key.`,
    '2fa-code': `Your verification code is: ${data?.code}. Valid for ${data?.validMinutes} minutes.`,
  };
  
  return templates[template] || '';
}

function generateHtmlFromTemplate(template?: string, data?: Record<string, any>): string {
  if (!template) return '';
  
  // Simple HTML template generation
  const baseTemplate = `
    <!DOCTYPE html>
    <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0066cc; color: white; padding: 20px; text-align: center; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { padding: 20px; text-align: center; color: #666; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>NRP Disaster Recovery</h1>
          </div>
          <div class="content">
            {{CONTENT}}
          </div>
          <div class="footer">
            <p>© 2024 NRP Disaster Recovery. All rights reserved.</p>
          </div>
        </div>
      </body>
    </html>
  `;
  
  const contents: Record<string, string> = {
    'background-check-approved': `
      <h2>Background Check Approved!</h2>
      <p>Congratulations! Your background check has been successfully completed and approved.</p>
      <p>You can now start accepting disaster recovery jobs in your area.</p>
    `,
    'background-check-review': `
      <h2>Background Check - Additional Review Required</h2>
      <p>Your background check requires additional review from our team.</p>
      <p>We'll contact you within 24-48 hours with an update.</p>
    `,
    '2fa-code': `
      <h2>Your Verification Code</h2>
      <p style="font-size: 24px; font-weight: bold; text-align: center; padding: 20px; background: white; border: 2px solid #0066cc;">
        ${data?.code}
      </p>
      <p>This code is valid for ${data?.validMinutes} minutes.</p>
    `,
  };
  
  const content = contents[template] || '<p>No content available</p>';
  return baseTemplate.replace('{{CONTENT}}', content);
}