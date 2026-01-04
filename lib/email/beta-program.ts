/**
 * Email Templates for Beta Programme
 *
 * Email automation for beta testing programme workflow
 */

import type { EmailTemplate } from './templates'

/**
 * Beta Programme Invitation Email
 */
export function betaInvitation(data: {
  businessName: string
  contactName: string
  programName: string
  programDescription: string | null
  tierOverride: string
  acceptUrl: string
  endDate: string
}): EmailTemplate {
  const { businessName, contactName, programName, programDescription, tierOverride, acceptUrl, endDate } = data

  return {
    subject: `You're Invited to ${programName} Beta Programme`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; colour: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #F97316 0%, #EA580C 100%); colour: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .beta-badge { display: inline-block; background: rgba(255,255,255,0.2); padding: 4px 12px; border-radius: 20px; font-size: 12px; font-weight: bold; text-transform: uppercase; margin-bottom: 10px; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #F97316; colour: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
            .highlight-box { background: #FFF7ED; border: 1px solid #FDBA74; padding: 20px; border-radius: 8px; margin: 20px 0; }
            .benefit-item { padding: 10px 0; border-bottom: 1px solid #eee; }
            .benefit-item:last-child { border-bottom: none; }
            .footer { text-align: center; padding: 20px; colour: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <div class="beta-badge">Beta Invite</div>
              <h1>You're Invited!</h1>
              <p>Join the ${programName} beta programme</p>
            </div>
            <div class="content">
              <p>Hi ${contactName},</p>

              <p>We're excited to invite <strong>${businessName}</strong> to participate in our exclusive beta programme for <strong>${programName}</strong>.</p>

              ${programDescription ? `<p>${programDescription}</p>` : ''}

              <div class="highlight-box">
                <h3 style="margin-top: 0; colour: #EA580C;">What You'll Get</h3>
                <div class="benefit-item">
                  <strong>Free ${tierOverride} Tier Access</strong><br>
                  <span style="colour: #666;">Full access to premium features during the beta period</span>
                </div>
                <div class="benefit-item">
                  <strong>Direct Influence</strong><br>
                  <span style="colour: #666;">Your feedback directly shapes the final product</span>
                </div>
                <div class="benefit-item">
                  <strong>Priority Support</strong><br>
                  <span style="colour: #666;">Direct access to our development team</span>
                </div>
              </div>

              <p style="text-align: center;">
                <a href="${acceptUrl}" class="button" style="colour: white;">Join the Beta Programme</a>
              </p>

              <p><strong>Programme Details:</strong></p>
              <ul>
                <li><strong>Beta ends:</strong> ${new Date(endDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</li>
                <li><strong>Access level:</strong> ${tierOverride} tier features</li>
                <li><strong>Cost:</strong> Free during beta</li>
              </ul>

              <h3>What We'll Ask From You</h3>
              <ul>
                <li>Use the feature in your daily work</li>
                <li>Share feedback through our simple widget</li>
                <li>Complete brief weekly surveys</li>
                <li>Report any bugs or issues you encounter</li>
              </ul>

              <p>Your insights are invaluable in helping us build the best possible product.</p>

              <p>Best regards,<br>
              <strong>The NRPG Team</strong></p>
            </div>
            <div class="footer">
              <p>NRPG - Australia's #1 Disaster Recovery Network<br>
              © 2026 NRPG. All rights reserved.</p>
              <p style="colour: #999; font-size: 11px;">
                If you didn't expect this invitation, you can safely ignore this email.
              </p>
            </div>
          </div>
        </body>
      </html>
    `,
    textContent: `
Hi ${contactName},

You're Invited to Join ${programName} Beta Programme!

We're excited to invite ${businessName} to participate in our exclusive beta programme.

${programDescription || ''}

What You'll Get:
- Free ${tierOverride} Tier Access during the beta period
- Direct influence on the final product
- Priority support from our development team

Programme Details:
- Beta ends: ${new Date(endDate).toLocaleDateString('en-AU')}
- Access level: ${tierOverride} tier features
- Cost: Free during beta

Join the beta programme: ${acceptUrl}

What We'll Ask From You:
- Use the feature in your daily work
- Share feedback through our simple widget
- Complete brief weekly surveys
- Report any bugs or issues you encounter

Best regards,
The NRPG Team
    `,
  }
}

/**
 * Beta Programme Welcome Email (after acceptance)
 */
export function betaWelcome(data: {
  businessName: string
  contactName: string
  programName: string
  tierOverride: string
  dashboardUrl: string
}): EmailTemplate {
  const { businessName, contactName, programName, tierOverride, dashboardUrl } = data

  return {
    subject: `Welcome to ${programName} Beta - You're In!`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; colour: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #22C55E 0%, #16A34A 100%); colour: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #F97316; colour: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
            .step-box { background: white; padding: 20px; border-radius: 8px; margin: 15px 0; border-left: 4px solid #F97316; }
            .step-number { display: inline-block; background: #F97316; colour: white; width: 28px; height: 28px; border-radius: 50%; text-align: center; line-height: 28px; font-weight: bold; margin-right: 10px; }
            .footer { text-align: center; padding: 20px; colour: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>🎉 Welcome to the Beta!</h1>
              <p>You're now part of ${programName}</p>
            </div>
            <div class="content">
              <p>Hi ${contactName},</p>

              <p>Fantastic! <strong>${businessName}</strong> is now officially part of our ${programName} beta programme. You now have full access to <strong>${tierOverride}</strong> tier features.</p>

              <h3>Getting Started</h3>

              <div class="step-box">
                <span class="step-number">1</span>
                <strong>Access Your Dashboard</strong>
                <p style="margin: 10px 0 0 38px; colour: #666;">
                  Your enhanced features are already enabled. Check your dashboard to see what's new.
                </p>
              </div>

              <div class="step-box">
                <span class="step-number">2</span>
                <strong>Look for the Feedback Button</strong>
                <p style="margin: 10px 0 0 38px; colour: #666;">
                  You'll see an orange feedback button in the corner. Use it anytime to share thoughts or report issues.
                </p>
              </div>

              <div class="step-box">
                <span class="step-number">3</span>
                <strong>Use the Features Daily</strong>
                <p style="margin: 10px 0 0 38px; colour: #666;">
                  The more you use the beta features, the more valuable your feedback becomes.
                </p>
              </div>

              <div class="step-box">
                <span class="step-number">4</span>
                <strong>Complete Quick Surveys</strong>
                <p style="margin: 10px 0 0 38px; colour: #666;">
                  We'll occasionally ask for a quick rating. It only takes 10 seconds!
                </p>
              </div>

              <p style="text-align: center;">
                <a href="${dashboardUrl}" class="button" style="colour: white;">Go to Dashboard</a>
              </p>

              <p>If you run into any issues or have questions, use the feedback widget or reply to this email. We're here to help!</p>

              <p>Thanks for being a beta tester. Your feedback is shaping the future of NRPG.</p>

              <p>Best regards,<br>
              <strong>The NRPG Team</strong></p>
            </div>
            <div class="footer">
              <p>NRPG - Australia's #1 Disaster Recovery Network<br>
              © 2026 NRPG. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    textContent: `
Hi ${contactName},

Welcome to ${programName} Beta!

${businessName} is now officially part of our beta programme. You now have full access to ${tierOverride} tier features.

Getting Started:

1. Access Your Dashboard
Your enhanced features are already enabled. Check your dashboard to see what's new.

2. Look for the Feedback Button
You'll see an orange feedback button in the corner. Use it anytime to share thoughts or report issues.

3. Use the Features Daily
The more you use the beta features, the more valuable your feedback becomes.

4. Complete Quick Surveys
We'll occasionally ask for a quick rating. It only takes 10 seconds!

Go to Dashboard: ${dashboardUrl}

Thanks for being a beta tester!

Best regards,
The NRPG Team
    `,
  }
}

/**
 * Beta Programme Ending Soon Reminder
 */
export function betaEndingReminder(data: {
  businessName: string
  contactName: string
  programName: string
  endDate: string
  daysRemaining: number
  dashboardUrl: string
}): EmailTemplate {
  const { businessName, contactName, programName, endDate, daysRemaining, dashboardUrl } = data

  return {
    subject: `${programName} Beta Ending in ${daysRemaining} Days`,
    htmlContent: `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body { font-family: Arial, sans-serif; line-height: 1.6; colour: #333; }
            .container { max-width: 600px; margin: 0 auto; padding: 20px; }
            .header { background: linear-gradient(135deg, #EAB308 0%, #CA8A04 100%); colour: white; padding: 30px; text-align: center; border-radius: 8px 8px 0 0; }
            .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 8px 8px; }
            .button { display: inline-block; background: #F97316; colour: white; padding: 14px 28px; text-decoration: none; border-radius: 6px; margin: 20px 0; font-weight: bold; }
            .countdown-box { background: #FFFBEB; border: 2px solid #FCD34D; padding: 20px; border-radius: 8px; text-align: center; margin: 20px 0; }
            .countdown-number { font-size: 48px; font-weight: bold; colour: #CA8A04; }
            .footer { text-align: center; padding: 20px; colour: #666; font-size: 12px; }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h1>⏰ Beta Ending Soon</h1>
              <p>Make the most of your remaining beta access</p>
            </div>
            <div class="content">
              <p>Hi ${contactName},</p>

              <p>Just a friendly reminder that the <strong>${programName}</strong> beta programme for <strong>${businessName}</strong> is ending soon.</p>

              <div class="countdown-box">
                <div class="countdown-number">${daysRemaining}</div>
                <p style="margin: 0; font-weight: bold;">Days Remaining</p>
                <p style="margin: 5px 0 0; colour: #666;">Beta ends on ${new Date(endDate).toLocaleDateString('en-AU', { day: 'numeric', month: 'long', year: 'numeric' })}</p>
              </div>

              <h3>Before Beta Ends:</h3>
              <ul>
                <li><strong>Share any final feedback</strong> - We'd love to hear your thoughts!</li>
                <li><strong>Report any issues</strong> - Help us fix bugs before launch</li>
                <li><strong>Complete the final survey</strong> - Your feedback helps us improve</li>
              </ul>

              <h3>What Happens Next?</h3>
              <p>After the beta ends, you can continue using these features by subscribing to the appropriate tier. As a beta participant, you'll receive a special offer when we launch!</p>

              <p style="text-align: center;">
                <a href="${dashboardUrl}" class="button" style="colour: white;">Go to Dashboard</a>
              </p>

              <p>Thank you for being part of our beta programme. Your feedback has been invaluable!</p>

              <p>Best regards,<br>
              <strong>The NRPG Team</strong></p>
            </div>
            <div class="footer">
              <p>NRPG - Australia's #1 Disaster Recovery Network<br>
              © 2026 NRPG. All rights reserved.</p>
            </div>
          </div>
        </body>
      </html>
    `,
    textContent: `
Hi ${contactName},

Beta Programme Ending Soon!

The ${programName} beta programme for ${businessName} is ending in ${daysRemaining} days.

Beta ends on: ${new Date(endDate).toLocaleDateString('en-AU')}

Before Beta Ends:
- Share any final feedback
- Report any issues
- Complete the final survey

What Happens Next?
After the beta ends, you can continue using these features by subscribing to the appropriate tier. As a beta participant, you'll receive a special offer when we launch!

Go to Dashboard: ${dashboardUrl}

Thank you for being part of our beta programme!

Best regards,
The NRPG Team
    `,
  }
}
