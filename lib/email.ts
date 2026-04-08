/**
 * Email Service — Resend
 * All outbound emails go through Resend using the configured API key.
 * Sender: RESEND_FROM_EMAIL (defaults to onboarding@resend.dev for testing)
 */

interface EmailPayload {
  subject: string;
  html: string;
  text?: string;
}

const BASE_URL = process.env.NEXT_PUBLIC_APP_URL ?? 'https://disasterrecovery.com.au';

// ── Brand wrapper ──────────────────────────────────────────────────────────

function wrapHtml(body: string): string {
  return `<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8"/>
<meta name="viewport" content="width=device-width,initial-scale=1"/>
<title>Disaster Recovery</title>
<style>
  body{font-family:Arial,Helvetica,sans-serif;background:#f4f4f4;margin:0;padding:0;color:#333}
  .wrap{max-width:600px;margin:0 auto;background:#fff;border-radius:6px;overflow:hidden}
  .hdr{background:#1a56db;padding:24px 32px}
  .hdr h1{color:#fff;margin:0;font-size:20px;font-weight:700}
  .hdr p{color:#bfdbfe;margin:4px 0 0;font-size:13px}
  .body{padding:32px}
  .footer{padding:16px 32px;background:#f4f4f4;font-size:11px;color:#777;text-align:center}
  .btn{display:inline-block;padding:12px 28px;background:#1a56db;color:#fff!important;text-decoration:none;border-radius:4px;font-weight:600;margin-top:16px}
  .callout{background:#eff6ff;border-left:4px solid #1a56db;padding:12px 16px;margin:16px 0;border-radius:0 4px 4px 0}
  .warn{background:#fff7ed;border-left:4px solid #f97316}
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
  <div class="footer">
    &copy; ${new Date().getFullYear()} Disaster Recovery &mdash; ABN 85 151 794 142<br/>
    Brisbane, Queensland, Australia<br/>
    <a href="${BASE_URL}/privacy" style="color:#777">Privacy Policy</a> &nbsp;&middot;&nbsp;
    <a href="${BASE_URL}/terms" style="color:#777">Terms of Service</a>
  </div>
</div>
</body>
</html>`;
}

// ── Core send function ─────────────────────────────────────────────────────

export async function sendEmail(to: string, payload: EmailPayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.warn('[email] RESEND_API_KEY not set — skipping email to', to);
    return false;
  }

  const from = process.env.RESEND_FROM_EMAIL ?? 'onboarding@resend.dev';
  const fromName = process.env.RESEND_FROM_NAME ?? 'Disaster Recovery';
  const replyTo = process.env.RESEND_REPLY_TO;

  const body: Record<string, unknown> = {
    from: `${fromName} <${from}>`,
    to: [to],
    subject: payload.subject,
    html: wrapHtml(payload.html),
  };
  if (payload.text) body.text = payload.text;
  if (replyTo) body.reply_to = replyTo;

  try {
    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(body),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('[email] Resend error:', res.status, err);
      return false;
    }
    return true;
  } catch (err) {
    console.error('[email] Fetch error:', err);
    return false;
  }
}

// ── Email templates ────────────────────────────────────────────────────────

export const emailTemplates = {
  /** Onboarding payment confirmed — sent after successful Stripe checkout */
  contractorPaymentConfirmed(name: string, contractorId: string): EmailPayload {
    return {
      subject: 'Payment Confirmed — Welcome to NRPG',
      html: `
        <h2>Welcome to the network, ${name}!</h2>
        <p>Your onboarding payment has been received. Your application is now under review.</p>
        <div class="callout">
          <strong>What happens next?</strong><br/>
          Our team will review your credentials and contact you within 1–2 business days.
        </div>
        <a class="btn" href="${BASE_URL}/contractor/dashboard">View Your Dashboard</a>
        <p style="margin-top:24px;font-size:13px;color:#666">Reference: ${contractorId}</p>
      `,
    };
  },

  /** New job offer — sent to contractor when a job is matched to them */
  jobOfferNew(
    name: string,
    offerId: string,
    jobDetails: {
      serviceType: string;
      suburb: string;
      expiresAt: Date;
      requiresLiabilityAck: boolean;
    }
  ): EmailPayload {
    const minutesLeft = Math.round(
      (jobDetails.expiresAt.getTime() - Date.now()) / 60_000
    );
    return {
      subject: `New Job Offer — ${jobDetails.serviceType} in ${jobDetails.suburb}`,
      html: `
        <h2>New Job Offer</h2>
        <p>Hi ${name}, a new job has been matched to you.</p>
        <div class="callout">
          <strong>Service:</strong> ${jobDetails.serviceType}<br/>
          <strong>Location:</strong> ${jobDetails.suburb}<br/>
          <strong>Offer expires in:</strong> ${minutesLeft} minutes
        </div>
        ${
          jobDetails.requiresLiabilityAck
            ? `<div class="callout warn"><strong>Note:</strong> This job is outside your primary service area. You must acknowledge the liability disclaimer before accepting.</div>`
            : ''
        }
        <a class="btn" href="${BASE_URL}/contractor/job-offers/${offerId}">View &amp; Respond to Offer</a>
        <p style="margin-top:24px;font-size:12px;color:#999">
          This offer expires at ${jobDetails.expiresAt.toLocaleString('en-AU', { timeZone: 'Australia/Brisbane' })} AEST.
          If you do not respond, the offer will automatically be passed to the next available contractor.
        </p>
      `,
    };
  },

  /** Offer expired — sent to contractor when their 30-min window closes */
  jobOfferExpired(name: string, serviceType: string, suburb: string): EmailPayload {
    return {
      subject: `Job Offer Expired — ${serviceType} in ${suburb}`,
      html: `
        <h2>Offer Expired</h2>
        <p>Hi ${name}, the job offer for <strong>${serviceType}</strong> in <strong>${suburb}</strong> has expired as it was not accepted within the 30-minute window.</p>
        <div class="callout warn">The job has been offered to the next available contractor in the network.</div>
        <p>Check your dashboard for new opportunities.</p>
        <a class="btn" href="${BASE_URL}/contractor/dashboard">View Dashboard</a>
      `,
    };
  },

  /** Offer accepted — sent to contractor confirming they accepted */
  jobOfferAccepted(name: string, offerId: string, serviceType: string, suburb: string): EmailPayload {
    return {
      subject: `Job Confirmed — ${serviceType} in ${suburb}`,
      html: `
        <h2>Job Accepted</h2>
        <p>Hi ${name}, you have successfully accepted the job.</p>
        <div class="callout">
          <strong>Service:</strong> ${serviceType}<br/>
          <strong>Location:</strong> ${suburb}
        </div>
        <p>Please contact the property owner promptly to confirm your arrival time.</p>
        <a class="btn" href="${BASE_URL}/contractor/jobs/${offerId}">View Job Details</a>
      `,
    };
  },

  /** Offer declined — sent to contractor confirming they passed */
  jobOfferDeclined(name: string, serviceType: string, suburb: string): EmailPayload {
    return {
      subject: `Offer Passed — ${serviceType} in ${suburb}`,
      html: `
        <h2>Offer Passed</h2>
        <p>Hi ${name}, you passed on the ${serviceType} job in ${suburb}. The offer has been forwarded to the next contractor.</p>
        <a class="btn" href="${BASE_URL}/contractor/dashboard">View Dashboard</a>
      `,
    };
  },

  /** Payment failed — sent when Stripe payment is declined */
  paymentFailed(name: string, reason: string, contractorId: string): EmailPayload {
    return {
      subject: 'Payment Failed — Action Required',
      html: `
        <h2>Payment Could Not Be Processed</h2>
        <p>Hi ${name}, we were unable to process your payment.</p>
        <div class="callout danger">
          <strong>Reason:</strong> ${reason}
        </div>
        <p>Please update your payment details and try again.</p>
        <a class="btn" href="${BASE_URL}/contractor/onboarding">Retry Payment</a>
        <p style="margin-top:24px;font-size:13px;color:#666">Reference: ${contractorId}</p>
      `,
    };
  },
};
