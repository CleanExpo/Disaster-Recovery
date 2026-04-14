/**
 * Email Service — Resend
 * Single email sending module for all outbound email across the platform.
 * Replaces previous nodemailer/SMTP implementation.
 */

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || process.env.NEXT_PUBLIC_APP_URL || 'https://disasterrecovery.com.au';

// ── Core send ──────────────────────────────────────────────────────────────

export async function sendEmail(
  to: string | string[],
  template: { subject: string; html: string; text?: string }
): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY not configured — skipping email to', to);
    return false;
  }

  const fromEmail = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
  const fromName = process.env.RESEND_FROM_NAME ?? 'Disaster Recovery';
  const replyTo = process.env.RESEND_REPLY_TO;

  const payload: Record<string, unknown> = {
    from: `${fromName} <${fromEmail}>`,
    to: Array.isArray(to) ? to : [to],
    subject: template.subject,
    html: template.html,
  };
  if (template.text) payload.text = template.text;
  if (replyTo) payload.reply_to = replyTo;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!res.ok) {
      const err = await res.text().catch(() => '');
      console.error('[email] Resend error:', res.status, err);
      return false;
    }

    return true;
  } catch (err) {
    console.error('[email] Fetch error:', err);
    return false;
  }
}

// ── Legacy aliases (keep backward compat) ─────────────────────────────────

export async function queueEmail(
  to: string | string[],
  template: { subject: string; html: string }
): Promise<boolean> {
  return sendEmail(to, template);
}

// ── HTML wrapper ───────────────────────────────────────────────────────────

function wrap(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<style>
  body{font-family:Arial,Helvetica,sans-serif;background:#f4f4f4;margin:0;padding:0;color:#333}
  .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:6px;overflow:hidden}
  .hdr{background:#0f172a;padding:28px 32px}
  .hdr h1{color:#fff;margin:0;font-size:20px;font-weight:700}
  .hdr p{color:#94a3b8;margin:4px 0 0;font-size:13px}
  .body{padding:32px}
  .ftr{padding:16px 32px;background:#f8fafc;font-size:11px;color:#94a3b8;text-align:center}
  .btn{display:inline-block;padding:12px 28px;background:#1a56db;color:#fff!important;
       text-decoration:none;border-radius:4px;font-weight:600;margin-top:16px}
  .callout{background:#eff6ff;border-left:4px solid #1a56db;padding:12px 16px;margin:16px 0;border-radius:0 4px 4px 0}
  .warn{background:#fff7ed;border-left:4px solid #f97316}
  .success{background:#f0fdf4;border-left:4px solid #16a34a}
  .danger{background:#fef2f2;border-left:4px solid #ef4444}
</style>
</head>
<body>
<div class="wrap">
  <div class="hdr">
    <h1>Disaster Recovery</h1>
    <p>National Recovery Partners Group</p>
  </div>
  <div class="body">${body}</div>
  <div class="ftr">
    &copy; ${new Date().getFullYear()} Disaster Recovery &mdash; ABN 85 151 794 142<br/>
    Brisbane, Queensland, Australia<br/>
    <a href="${SITE_URL}/privacy" style="color:#94a3b8">Privacy Policy</a>
    &nbsp;&middot;&nbsp;
    <a href="${SITE_URL}/terms" style="color:#94a3b8">Terms of Service</a>
  </div>
</div>
</body>
</html>`;
}

// ── Templates ──────────────────────────────────────────────────────────────

export const emailTemplates = {

  // ── Lead notifications ─────────────────────────────────────────────────

  leadNotification: (leadData: Record<string, unknown>) => ({
    subject: `New Lead: ${leadData.fullName} — ${leadData.serviceType}`,
    html: wrap(`
      <h2>New Lead Received</h2>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0;color:#666"><strong>Name</strong></td><td>${leadData.fullName}</td></tr>
        <tr><td style="padding:6px 0;color:#666"><strong>Email</strong></td><td>${leadData.email}</td></tr>
        <tr><td style="padding:6px 0;color:#666"><strong>Service</strong></td><td>${leadData.serviceType}</td></tr>
        <tr><td style="padding:6px 0;color:#666"><strong>Location</strong></td><td>${leadData.suburb}, ${leadData.state} ${leadData.postcode}</td></tr>
        <tr><td style="padding:6px 0;color:#666"><strong>Property</strong></td><td>${leadData.propertyType}</td></tr>
        <tr><td style="padding:6px 0;color:#666"><strong>Insurance</strong></td><td>${leadData.hasInsurance ? 'Yes' : 'No'}</td></tr>
        <tr><td style="padding:6px 0;color:#666"><strong>Lead Score</strong></td><td>${leadData.leadScore}/100</td></tr>
        <tr><td style="padding:6px 0;color:#666"><strong>Lead Value</strong></td><td><strong>$${leadData.leadValue}</strong></td></tr>
      </table>
      <a class="btn" href="${SITE_URL}/partner-portal/leads/${leadData.id}">View Lead in Portal</a>
    `),
  }),

  leadConfirmation: (leadData: Record<string, unknown>) => ({
    subject: "We've Received Your Emergency Request — Disaster Recovery",
    html: wrap(`
      <h2>Help is on the way!</h2>
      <p>Dear ${leadData.fullName},</p>
      <p>Thank you for contacting Disaster Recovery. We understand this is a stressful time and we're here to help.</p>
      <div class="callout success">
        <strong>What happens next:</strong><br/>
        A certified restoration specialist will contact you within
        <strong>${leadData.urgencyLevel === 'emergency' ? '30 minutes' : '2–4 hours'}</strong>.
      </div>
      <div class="callout warn">
        <strong>Immediate safety tips:</strong>
        <ul style="margin:8px 0 0;padding-left:20px;line-height:1.8">
          <li>Ensure all occupants are safe — evacuate if needed</li>
          <li>Turn off electricity if there is standing water</li>
          <li>Document damage with photos for insurance</li>
          <li>Do not attempt major cleanup without professional guidance</li>
        </ul>
      </div>
      <p><strong>Reference:</strong> ${leadData.id}</p>
    `),
  }),

  // ── Contractor lifecycle ───────────────────────────────────────────────

  /** DR-587: Application received — sent immediately after successful DB write, before payment */
  contractorApplicationReceived: (name: string, applicationId: string, applicantEmail: string) => ({
    subject: 'Your NRPG contractor application has been received',
    html: wrap(`
      <h2>Application received, ${name}.</h2>
      <p>The NRPG team has received your contractor application. No action is needed from you right now.</p>
      <div class="callout">
        <strong>Application reference:</strong> ${applicationId}<br/>
        <strong>Email on file:</strong> ${applicantEmail}
      </div>
      <h3>What happens next</h3>
      <ol style="line-height:2;color:#475569;padding-left:20px">
        <li>The NRPG compliance team reviews your application.</li>
        <li>Background and reference checks are completed.</li>
        <li>An email is sent to <strong>${applicantEmail}</strong> within <strong>5–7 business days</strong> with the outcome.</li>
        <li>Once approved, onboarding materials and training access are activated.</li>
      </ol>
      <p style="font-size:13px;color:#666">
        Questions? Contact the support team at
        <a href="${SITE_URL}/contact" style="color:#1a56db">${SITE_URL}/contact</a>.
      </p>
      <p style="margin-top:24px;font-size:12px;color:#999">Reference: ${applicationId}</p>
    `),
    text: [
      `Application received, ${name}.`,
      '',
      `Application reference: ${applicationId}`,
      `Email on file: ${applicantEmail}`,
      '',
      'What happens next:',
      '1. The NRPG compliance team reviews your application.',
      '2. Background and reference checks are completed.',
      `3. An email is sent to ${applicantEmail} within 5–7 business days with the outcome.`,
      '4. Once approved, onboarding materials and training access are activated.',
      '',
      `Support: ${SITE_URL}/contact`,
    ].join('\n'),
  }),

  contractorWelcome: (name: string, applicationId: string) => ({
    subject: 'Application Received — Welcome to National Recovery Partners Group',
    html: wrap(`
      <h2>Welcome to NRPG, ${name}!</h2>
      <p>Your contractor application has been received. Your profile has been created.</p>
      <div class="callout success"><strong>Application Reference:</strong> ${applicationId}</div>
      <h3>What Happens Next</h3>
      <ol style="line-height:2;color:#475569">
        <li>Complete your onboarding payment ($2,475 total)</li>
        <li>Begin your 14-day training program</li>
        <li>Submit licences, insurance certificates, and IICRC certifications</li>
        <li>Start receiving insurance claim referrals in your service area</li>
      </ol>
      <a class="btn" href="${SITE_URL}/contractor/onboarding">Continue to Payment &amp; Onboarding</a>
    `),
  }),

  contractorPaymentConfirmed: (name: string, applicationId: string) => ({
    subject: 'Payment Confirmed — Your NRPG Onboarding Has Begun',
    html: wrap(`
      <h2>Payment Confirmed</h2>
      <p>Hi ${name}, your payment of <strong>$2,475.00 AUD</strong> has been received.</p>
      <div class="callout success">
        <strong>Application Reference:</strong> ${applicationId}<br/>
        <strong>Amount Paid:</strong> $2,475.00 AUD<br/>
        <strong>Onboarding Status:</strong> Active — Day 1 unlocked
      </div>
      <a class="btn" href="${SITE_URL}/contractor/onboarding">Start Day 1 Training</a>
    `),
  }),

  partnerLeadAssignment: (partnerData: Record<string, unknown>, leadData: Record<string, unknown>) => ({
    subject: `New $${leadData.leadValue} Lead Assignment — ${leadData.suburb}`,
    html: wrap(`
      <h2>New Lead Assignment</h2>
      <p>Hello ${partnerData.businessName}, a new lead has been assigned to you.</p>
      <div class="callout warn">
        <strong>Response Required:</strong>
        ${leadData.urgencyLevel === 'emergency' ? '30 MINUTES' : '2–4 HOURS'}
      </div>
      <table style="width:100%;border-collapse:collapse;font-size:14px">
        <tr><td style="padding:6px 0"><strong>Customer</strong></td><td>${leadData.fullName}</td></tr>
        <tr><td style="padding:6px 0"><strong>Service</strong></td><td>${leadData.serviceType}</td></tr>
        <tr><td style="padding:6px 0"><strong>Location</strong></td><td>${leadData.address}</td></tr>
        <tr><td style="padding:6px 0"><strong>Insurance</strong></td><td>${leadData.hasInsurance ? 'Yes' : 'No'}</td></tr>
        <tr><td style="padding:6px 0"><strong>Lead Value</strong></td><td><strong>$${leadData.leadValue}</strong></td></tr>
      </table>
      <a class="btn" href="${SITE_URL}/partner-portal/leads/${leadData.id}/accept">Accept Lead</a>
    `),
  }),

  reviewSolicitation: (customerName: string, serviceType: string, googleReviewUrl: string) => ({
    subject: "How did your restoration go? We'd love your feedback",
    html: wrap(`
      <h2>How did we do, ${customerName}?</h2>
      <p>Your recent <strong>${serviceType}</strong> job has been marked complete. We hope everything is back to normal.</p>
      <p>If you're satisfied with the service, a quick Google review would mean a lot — it helps other Australians find certified help when they need it most.</p>
      <a class="btn" style="background:#4285f4" href="${googleReviewUrl}">Leave a Google Review</a>
      <p style="margin-top:24px;font-size:13px;color:#94a3b8">
        Not satisfied? Please <a href="${SITE_URL}/contact">contact us</a> and we will make it right.
      </p>
    `),
  }),

  // ── Job offer notifications ────────────────────────────────────────────

  jobOfferNew: (
    name: string,
    offerId: string,
    job: { serviceType: string; suburb: string; expiresAt: Date; requiresLiabilityAck: boolean }
  ) => {
    const minutesLeft = Math.round((job.expiresAt.getTime() - Date.now()) / 60_000);
    return {
      subject: `New Job Offer — ${job.serviceType} in ${job.suburb}`,
      html: wrap(`
        <h2>New Job Offer</h2>
        <p>Hi ${name}, a new job has been matched to you.</p>
        <div class="callout">
          <strong>Service:</strong> ${job.serviceType}<br/>
          <strong>Location:</strong> ${job.suburb}<br/>
          <strong>Expires in:</strong> ${minutesLeft} minutes
        </div>
        ${job.requiresLiabilityAck
          ? `<div class="callout warn"><strong>Note:</strong> This job is outside your primary service area. You must acknowledge the liability disclaimer before accepting.</div>`
          : ''}
        <a class="btn" href="${SITE_URL}/contractor/job-offers/${offerId}">View &amp; Respond</a>
        <p style="margin-top:24px;font-size:12px;color:#94a3b8">
          Offer expires at ${job.expiresAt.toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' })} AEST.
          If not accepted, the offer passes to the next available contractor.
        </p>
      `),
    };
  },

  jobOfferExpired: (name: string, serviceType: string, suburb: string) => ({
    subject: `Job Offer Expired — ${serviceType} in ${suburb}`,
    html: wrap(`
      <h2>Offer Expired</h2>
      <p>Hi ${name}, the job offer for <strong>${serviceType}</strong> in <strong>${suburb}</strong> expired because it was not accepted within 30 minutes.</p>
      <div class="callout warn">The job has been forwarded to the next available contractor.</div>
      <a class="btn" href="${SITE_URL}/contractor/dashboard">View Dashboard</a>
    `),
  }),

  jobOfferAccepted: (name: string, _offerId: string, serviceType: string, suburb: string) => ({
    subject: `Job Confirmed — ${serviceType} in ${suburb}`,
    html: wrap(`
      <h2>Job Accepted</h2>
      <p>Hi ${name}, you have accepted the job.</p>
      <div class="callout success">
        <strong>Service:</strong> ${serviceType}<br/>
        <strong>Location:</strong> ${suburb}
      </div>
      <p>Please contact the property owner promptly to confirm your arrival time.</p>
      <a class="btn" href="${SITE_URL}/contractor-portal/jobs">View My Jobs</a>
    `),
  }),

  jobOfferDeclined: (name: string, serviceType: string, suburb: string) => ({
    subject: `Offer Passed — ${serviceType} in ${suburb}`,
    html: wrap(`
      <h2>Offer Passed</h2>
      <p>Hi ${name}, you passed on the ${serviceType} job in ${suburb}. The offer has been forwarded to the next contractor.</p>
      <a class="btn" href="${SITE_URL}/contractor/dashboard">View Dashboard</a>
    `),
  }),

  // ── Payment notifications ──────────────────────────────────────────────

  paymentFailed: (name: string, reason: string, contractorId: string) => ({
    subject: 'Payment Failed — Action Required',
    html: wrap(`
      <h2>Payment Could Not Be Processed</h2>
      <p>Hi ${name}, we were unable to process your payment.</p>
      <div class="callout danger"><strong>Reason:</strong> ${reason}</div>
      <p>Please update your payment details and try again.</p>
      <a class="btn" href="${SITE_URL}/contractor/onboarding">Retry Payment</a>
      <p style="margin-top:24px;font-size:13px;color:#94a3b8">Reference: ${contractorId}</p>
    `),
  }),
};
