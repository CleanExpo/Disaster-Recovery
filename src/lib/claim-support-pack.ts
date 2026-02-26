// ============================================================
// Claim Support Pack — Safe alternative to PolicyIQ
// UNI-910: General process information + verified expert referrals
//
// LEGAL NOTE: This provides factual process information and
// referrals to qualified experts (AFCA, ILS, NDH). It does NOT
// summarise, interpret, or advise on any specific insurance policy.
// This approach mirrors ASIC MoneySmart and Legal Aid guidance.
// ============================================================

const SITE_URL = 'https://disasterrecovery.com.au';

// ─── Verified External Contacts ─────────────────────────────
// All contacts verified against official government/industry sources.
// UNI-912 requires Sage to re-verify before deployment.

export const VERIFIED_CONTACTS = {
  afca: {
    name: 'Australian Financial Complaints Authority (AFCA)',
    description: 'Free, independent dispute resolution for insurance complaints',
    website: 'https://www.afca.org.au',
    phone: '1800 931 678',
    hours: 'Mon–Fri 9am–5pm AEST',
    when: 'If your insurer denies your claim, delays beyond 4 months, or you disagree with the outcome',
  },
  ils: {
    name: 'Insurance Law Service (ILS)',
    description: 'Free legal advice for insurance disputes (Income below threshold)',
    website: 'https://insurancelaw.org.au',
    phone: '1300 663 464',
    hours: 'Mon–Fri 9am–5pm AEST',
    when: 'If you need free legal advice about your insurance rights or dispute',
  },
  ndh: {
    name: 'National Debt Helpline',
    description: 'Free financial counselling if disaster costs are causing financial stress',
    website: 'https://ndh.org.au',
    phone: '1800 007 007',
    hours: 'Mon–Fri 9:30am–4:30pm local time',
    when: 'If you are experiencing financial hardship due to disaster costs',
  },
  asicMoneySmart: {
    name: 'ASIC MoneySmart — Insurance Claims',
    description: 'Government guide to making and managing insurance claims',
    website: 'https://moneysmart.gov.au/how-insurance-works/making-an-insurance-claim',
    when: 'For general information about the insurance claims process in Australia',
  },
  legalAid: {
    name: 'Legal Aid (Your State)',
    description: 'Free legal assistance for eligible Australians',
    websites: {
      NSW: 'https://www.legalaid.nsw.gov.au',
      VIC: 'https://www.legalaid.vic.gov.au',
      QLD: 'https://www.legalaid.qld.gov.au',
      WA: 'https://www.legalaid.wa.gov.au',
      SA: 'https://www.legalaidsa.sa.gov.au',
      TAS: 'https://www.legalaid.tas.gov.au',
      ACT: 'https://www.legalaidact.org.au',
      NT: 'https://www.ntlac.nt.gov.au',
    },
    when: 'If you need free legal advice about your rights after a disaster',
  },
  ses: {
    name: 'State Emergency Service (SES)',
    description: 'Emergency assistance for storm, flood, and disaster response',
    phone: '132 500',
    when: 'For life-threatening emergencies call 000. For SES storm/flood assistance call 132 500',
  },
} as const;

// ─── Claim Stage Definitions ────────────────────────────────
// General process information — NOT policy-specific advice.

export interface ClaimStage {
  stage: number;
  title: string;
  description: string;
  clientActions: string[];
  timeframe: string;
  tips: string[];
}

export const CLAIM_STAGES: ClaimStage[] = [
  {
    stage: 1,
    title: 'Claim Registered',
    description: 'Your claim has been received and a certified IICRC contractor is being matched to your property.',
    clientActions: [
      'Check your email for the Claim Support Pack (this email)',
      'Ensure safe access to the property for the contractor',
      'Begin documenting damage with dated photos if safe to do so',
    ],
    timeframe: 'Contractor contact within 60 minutes',
    tips: [
      'Keep all receipts for emergency expenses (temporary accommodation, food, clothing)',
      'Do not dispose of damaged items until your contractor has documented them',
      'If the property is unsafe, do not enter — wait for professional assessment',
    ],
  },
  {
    stage: 2,
    title: 'Contractor Contact & Assessment',
    description: 'Your assigned contractor will call you to arrange an on-site inspection and damage assessment.',
    clientActions: [
      'Answer the contractor\'s call (they will identify themselves as an NRPG contractor)',
      'Provide access to the property at the agreed time',
      'Point out all affected areas during the walk-through',
    ],
    timeframe: 'Assessment typically within 24–48 hours',
    tips: [
      'The contractor will document everything — photos, moisture readings, scope of damage',
      'Ask the contractor for their IICRC certification number if you want to verify',
      'The contractor works for you, not the insurance company',
    ],
  },
  {
    stage: 3,
    title: 'Make-Safe & Emergency Works',
    description: 'Urgent works to prevent further damage — tarping, water extraction, board-up, or temporary power.',
    clientActions: [
      'Confirm the make-safe scope with your contractor before work begins',
      'Contact your insurer to lodge your claim if you haven\'t already',
      'Keep a copy of the contractor\'s make-safe report for your insurer',
    ],
    timeframe: 'Make-safe begins immediately after assessment',
    tips: [
      'Make-safe is about stopping further damage, not full restoration',
      'Your contractor will provide a formal contract with terms after make-safe',
      'We bill you directly — no waiting for insurer approval to start',
    ],
  },
  {
    stage: 4,
    title: 'Scope of Works & Contract',
    description: 'Your contractor prepares a detailed scope of works and provides a formal contract with clear pricing.',
    clientActions: [
      'Review the scope of works document carefully',
      'Sign the contractor\'s formal contract when you\'re satisfied',
      'Forward the scope of works to your insurer as part of your claim',
    ],
    timeframe: 'Scope typically delivered within 3–5 business days of assessment',
    tips: [
      'The scope document is yours — use it to support your insurance claim',
      'Payment plans are available through Blue Fire Finance if needed',
      'Ask questions if anything in the scope is unclear',
    ],
  },
  {
    stage: 5,
    title: 'Restoration Works',
    description: 'Full restoration begins — drying, cleaning, rebuilding, and returning your property to pre-loss condition.',
    clientActions: [
      'Maintain communication with your contractor about progress',
      'Provide access as needed for the restoration team',
      'Continue your insurance claim process in parallel',
    ],
    timeframe: 'Varies by damage severity — your contractor will provide a timeline',
    tips: [
      'Your contractor provides full documentation (photos, reports) throughout',
      'This documentation supports your insurance reimbursement claim',
      'If you have concerns about quality, raise them with the contractor directly',
    ],
  },
  {
    stage: 6,
    title: 'Completion & Handover',
    description: 'Works are complete. Your contractor provides final documentation for your records and insurance claim.',
    clientActions: [
      'Inspect the completed work with your contractor',
      'Sign off on completion when satisfied',
      'Submit all contractor documentation to your insurer for reimbursement',
    ],
    timeframe: 'Final inspection arranged at your convenience',
    tips: [
      'Keep all documentation (scope, invoices, photos, reports) for your insurer',
      'If your insurer disputes any item, contact AFCA for free dispute resolution',
      'The contractor\'s documentation package is designed to support your claim',
    ],
  },
];

// ─── Know Your Rights — General Legal Information ───────────
// Safe general information (NOT specific policy advice).
// Sources: Insurance Contracts Act 1984, GICOP 2020, AFCA.

export const KNOW_YOUR_RIGHTS = [
  {
    title: 'Your insurer must acknowledge your claim within 10 business days',
    source: 'General Insurance Code of Practice 2020, Section 9.4',
    detail: 'After lodging a claim, your insurer must acknowledge it and provide a claim number within 10 business days.',
  },
  {
    title: 'Your insurer must decide your claim within 4 months',
    source: 'General Insurance Code of Practice 2020, Section 9.7',
    detail: 'For non-complex claims, your insurer must make a decision within 4 months of receiving all necessary information.',
  },
  {
    title: 'You can choose your own repairer',
    source: 'General Insurance Code of Practice 2020, Section 7.13',
    detail: 'You have the right to choose your own repairer. Your insurer may recommend their preferred repairer, but the choice is yours.',
  },
  {
    title: 'You can complain to AFCA for free',
    source: 'Australian Financial Complaints Authority Act 2018',
    detail: 'If your claim is denied or you disagree with the outcome, AFCA provides free, independent dispute resolution. Claims up to $1.085 million.',
  },
  {
    title: 'Your insurer cannot unreasonably delay',
    source: 'Insurance Contracts Act 1984, Section 54',
    detail: 'Your insurer cannot deny or reduce your claim because of an unreasonable technicality. Section 54 protects policyholders from unfair claim handling.',
  },
  {
    title: 'You are entitled to reasons for any denial',
    source: 'General Insurance Code of Practice 2020, Section 9.9',
    detail: 'If your claim is denied, your insurer must explain the reasons in writing and tell you about the complaints process.',
  },
  {
    title: 'Financial hardship provisions apply',
    source: 'General Insurance Code of Practice 2020, Part 10',
    detail: 'If you are experiencing financial hardship due to a disaster, your insurer must consider hardship arrangements and cannot pursue debt collection during this period.',
  },
];

// ─── Document Checklist ─────────────────────────────────────

export const DOCUMENT_CHECKLIST = [
  { item: 'Dated photos of all damage (before any cleanup)', priority: 'high' },
  { item: 'Your insurance policy number and claim number', priority: 'high' },
  { item: 'Contractor\'s scope of works document', priority: 'high' },
  { item: 'Contractor\'s invoices and receipts', priority: 'high' },
  { item: 'Receipts for emergency expenses (accommodation, food, transport)', priority: 'medium' },
  { item: 'Any correspondence with your insurer', priority: 'medium' },
  { item: 'Council or authority notices (if applicable)', priority: 'low' },
  { item: 'Video walkthrough of damage (if available)', priority: 'low' },
];

// ─── Email Template Generator ───────────────────────────────

export interface ClaimSupportPackData {
  claimId: string;
  clientName: string;
  email: string;
  propertyAddress: string;
  suburb: string;
  state: string;
  postcode: string;
  damageTypes: string[];
  urgencyLevel: string;
  insuranceCompany?: string;
  policyNumber?: string;
}

export function generateClaimSupportPackEmail(data: ClaimSupportPackData): {
  subject: string;
  html: string;
} {
  const stateKey = data.state?.toUpperCase() as keyof typeof VERIFIED_CONTACTS.legalAid.websites;
  const legalAidUrl = VERIFIED_CONTACTS.legalAid.websites[stateKey] || VERIFIED_CONTACTS.legalAid.websites.QLD;

  const damageLabel = data.damageTypes?.length > 0
    ? data.damageTypes.join(', ')
    : 'Property damage';

  return {
    subject: `Your Claim Support Pack — ${data.claimId} | Disaster Recovery`,
    html: `
<!DOCTYPE html>
<html lang="en-AU">
<head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1.0"></head>
<body style="margin:0;padding:0;background:#f4f4f7;font-family:Arial,Helvetica,sans-serif;">
<table width="100%" cellpadding="0" cellspacing="0" style="background:#f4f4f7;padding:20px 0;">
<tr><td align="center">
<table width="600" cellpadding="0" cellspacing="0" style="background:#ffffff;border-radius:8px;overflow:hidden;box-shadow:0 2px 8px rgba(0,0,0,0.08);">

  <!-- Header -->
  <tr>
    <td style="background:linear-gradient(135deg,#1e3a5f 0%,#0052CC 100%);padding:30px 40px;text-align:center;">
      <h1 style="color:#ffffff;margin:0;font-size:24px;">Your Claim Support Pack</h1>
      <p style="color:#a8c8ff;margin:8px 0 0;font-size:14px;">Everything you need for your insurance claim — all in one place</p>
    </td>
  </tr>

  <!-- Claim Summary -->
  <tr>
    <td style="padding:30px 40px 0;">
      <p style="font-size:16px;color:#333;">Dear ${escapeHtml(data.clientName)},</p>
      <p style="font-size:15px;color:#555;line-height:1.6;">
        Your claim has been registered. An IICRC-certified contractor will contact you within
        <strong>60 minutes</strong> to arrange an assessment. Below is your complete guide to
        the recovery process.
      </p>

      <table width="100%" cellpadding="12" cellspacing="0" style="background:#f0f4ff;border-radius:8px;margin:20px 0;">
        <tr>
          <td style="color:#666;font-size:13px;width:140px;"><strong>Claim ID</strong></td>
          <td style="color:#333;font-size:13px;">${escapeHtml(data.claimId)}</td>
        </tr>
        <tr>
          <td style="color:#666;font-size:13px;"><strong>Property</strong></td>
          <td style="color:#333;font-size:13px;">${escapeHtml(data.propertyAddress)}, ${escapeHtml(data.suburb)} ${escapeHtml(data.state)} ${escapeHtml(data.postcode)}</td>
        </tr>
        <tr>
          <td style="color:#666;font-size:13px;"><strong>Damage Type</strong></td>
          <td style="color:#333;font-size:13px;">${escapeHtml(damageLabel)}</td>
        </tr>
        ${data.insuranceCompany ? `
        <tr>
          <td style="color:#666;font-size:13px;"><strong>Insurer</strong></td>
          <td style="color:#333;font-size:13px;">${escapeHtml(data.insuranceCompany)}</td>
        </tr>` : ''}
      </table>
    </td>
  </tr>

  <!-- Stage-by-Stage Guide -->
  <tr>
    <td style="padding:10px 40px 0;">
      <h2 style="color:#1e3a5f;font-size:18px;border-bottom:2px solid #e8e8e8;padding-bottom:8px;">
        What Happens Next — Stage by Stage
      </h2>
      ${CLAIM_STAGES.map((stage) => `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:16px 0;">
        <tr>
          <td style="width:36px;vertical-align:top;padding-top:2px;">
            <div style="width:28px;height:28px;background:#0052CC;color:#fff;border-radius:50%;text-align:center;line-height:28px;font-size:13px;font-weight:bold;">${stage.stage}</div>
          </td>
          <td style="padding-left:12px;">
            <strong style="color:#333;font-size:14px;">${escapeHtml(stage.title)}</strong>
            <span style="color:#888;font-size:12px;margin-left:8px;">${escapeHtml(stage.timeframe)}</span>
            <p style="color:#555;font-size:13px;margin:4px 0 0;line-height:1.5;">${escapeHtml(stage.description)}</p>
          </td>
        </tr>
      </table>
      `).join('')}
    </td>
  </tr>

  <!-- Document Checklist -->
  <tr>
    <td style="padding:20px 40px 0;">
      <h2 style="color:#1e3a5f;font-size:18px;border-bottom:2px solid #e8e8e8;padding-bottom:8px;">
        Document Checklist for Your Insurer
      </h2>
      <table width="100%" cellpadding="8" cellspacing="0" style="margin:12px 0;">
        ${DOCUMENT_CHECKLIST.map((doc) => `
        <tr>
          <td style="width:24px;vertical-align:top;font-size:16px;">${doc.priority === 'high' ? '&#9744;' : '&#9744;'}</td>
          <td style="color:#333;font-size:13px;border-bottom:1px solid #f0f0f0;">
            ${escapeHtml(doc.item)}
            ${doc.priority === 'high' ? '<span style="color:#cc0000;font-size:11px;margin-left:6px;">(Important)</span>' : ''}
          </td>
        </tr>
        `).join('')}
      </table>
    </td>
  </tr>

  <!-- Know Your Rights -->
  <tr>
    <td style="padding:20px 40px 0;">
      <h2 style="color:#1e3a5f;font-size:18px;border-bottom:2px solid #e8e8e8;padding-bottom:8px;">
        Know Your Rights
      </h2>
      <p style="color:#555;font-size:13px;line-height:1.5;margin:8px 0;">
        The following are your general rights under Australian insurance law. For advice specific to your policy,
        contact your insurer or one of the free services listed below.
      </p>
      ${KNOW_YOUR_RIGHTS.slice(0, 4).map((right) => `
      <div style="background:#f8faf0;border-left:3px solid #4CAF50;padding:10px 14px;margin:10px 0;border-radius:0 4px 4px 0;">
        <strong style="color:#333;font-size:13px;">${escapeHtml(right.title)}</strong>
        <p style="color:#666;font-size:12px;margin:4px 0 0;">${escapeHtml(right.detail)}</p>
        <p style="color:#999;font-size:11px;margin:2px 0 0;font-style:italic;">Source: ${escapeHtml(right.source)}</p>
      </div>
      `).join('')}
      <p style="font-size:13px;margin:12px 0;">
        <a href="${SITE_URL}/knowledge/insurance-claims-process-australia" style="color:#0052CC;text-decoration:underline;">
          Read the full Know Your Rights guide &rarr;
        </a>
      </p>
    </td>
  </tr>

  <!-- Expert Contacts -->
  <tr>
    <td style="padding:20px 40px 0;">
      <h2 style="color:#1e3a5f;font-size:18px;border-bottom:2px solid #e8e8e8;padding-bottom:8px;">
        Free Expert Help — Verified Contacts
      </h2>
      <p style="color:#555;font-size:13px;line-height:1.5;margin:8px 0 16px;">
        These are independent government and industry services that can give you specific advice
        about your policy and claim. All services below are free.
      </p>

      <!-- AFCA -->
      <table width="100%" cellpadding="12" cellspacing="0" style="background:#f0f8ff;border-radius:6px;margin:8px 0;">
        <tr>
          <td>
            <strong style="color:#0052CC;font-size:14px;">${escapeHtml(VERIFIED_CONTACTS.afca.name)}</strong>
            <p style="color:#555;font-size:12px;margin:4px 0;">${escapeHtml(VERIFIED_CONTACTS.afca.description)}</p>
            <p style="color:#333;font-size:13px;margin:4px 0;">
              Phone: <strong>${VERIFIED_CONTACTS.afca.phone}</strong> | ${VERIFIED_CONTACTS.afca.hours}
            </p>
            <p style="font-size:12px;margin:2px 0;">
              <a href="${VERIFIED_CONTACTS.afca.website}" style="color:#0052CC;">${VERIFIED_CONTACTS.afca.website}</a>
            </p>
            <p style="color:#888;font-size:11px;margin:4px 0 0;">${escapeHtml(VERIFIED_CONTACTS.afca.when)}</p>
          </td>
        </tr>
      </table>

      <!-- ILS -->
      <table width="100%" cellpadding="12" cellspacing="0" style="background:#f0fff0;border-radius:6px;margin:8px 0;">
        <tr>
          <td>
            <strong style="color:#2e7d32;font-size:14px;">${escapeHtml(VERIFIED_CONTACTS.ils.name)}</strong>
            <p style="color:#555;font-size:12px;margin:4px 0;">${escapeHtml(VERIFIED_CONTACTS.ils.description)}</p>
            <p style="color:#333;font-size:13px;margin:4px 0;">
              Phone: <strong>${VERIFIED_CONTACTS.ils.phone}</strong> | ${VERIFIED_CONTACTS.ils.hours}
            </p>
            <p style="font-size:12px;margin:2px 0;">
              <a href="${VERIFIED_CONTACTS.ils.website}" style="color:#2e7d32;">${VERIFIED_CONTACTS.ils.website}</a>
            </p>
          </td>
        </tr>
      </table>

      <!-- NDH -->
      <table width="100%" cellpadding="12" cellspacing="0" style="background:#fff8f0;border-radius:6px;margin:8px 0;">
        <tr>
          <td>
            <strong style="color:#e65100;font-size:14px;">${escapeHtml(VERIFIED_CONTACTS.ndh.name)}</strong>
            <p style="color:#555;font-size:12px;margin:4px 0;">${escapeHtml(VERIFIED_CONTACTS.ndh.description)}</p>
            <p style="color:#333;font-size:13px;margin:4px 0;">
              Phone: <strong>${VERIFIED_CONTACTS.ndh.phone}</strong> | ${VERIFIED_CONTACTS.ndh.hours}
            </p>
            <p style="font-size:12px;margin:2px 0;">
              <a href="${VERIFIED_CONTACTS.ndh.website}" style="color:#e65100;">${VERIFIED_CONTACTS.ndh.website}</a>
            </p>
          </td>
        </tr>
      </table>

      <!-- ASIC MoneySmart -->
      <table width="100%" cellpadding="12" cellspacing="0" style="background:#f5f0ff;border-radius:6px;margin:8px 0;">
        <tr>
          <td>
            <strong style="color:#6a1b9a;font-size:14px;">${escapeHtml(VERIFIED_CONTACTS.asicMoneySmart.name)}</strong>
            <p style="color:#555;font-size:12px;margin:4px 0;">${escapeHtml(VERIFIED_CONTACTS.asicMoneySmart.description)}</p>
            <p style="font-size:12px;margin:2px 0;">
              <a href="${VERIFIED_CONTACTS.asicMoneySmart.website}" style="color:#6a1b9a;">${VERIFIED_CONTACTS.asicMoneySmart.website}</a>
            </p>
          </td>
        </tr>
      </table>

      <!-- Legal Aid -->
      <table width="100%" cellpadding="12" cellspacing="0" style="background:#f0f0f0;border-radius:6px;margin:8px 0;">
        <tr>
          <td>
            <strong style="color:#333;font-size:14px;">${escapeHtml(VERIFIED_CONTACTS.legalAid.name)}</strong>
            <p style="color:#555;font-size:12px;margin:4px 0;">${escapeHtml(VERIFIED_CONTACTS.legalAid.description)}</p>
            <p style="font-size:12px;margin:2px 0;">
              <a href="${legalAidUrl}" style="color:#333;">Visit your state Legal Aid website &rarr;</a>
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Billing Transparency -->
  <tr>
    <td style="padding:20px 40px 0;">
      <table width="100%" cellpadding="16" cellspacing="0" style="background:#fff3cd;border-radius:6px;border-left:4px solid #ffc107;">
        <tr>
          <td>
            <strong style="color:#856404;font-size:14px;">How Billing Works</strong>
            <p style="color:#856404;font-size:13px;line-height:1.6;margin:8px 0 0;">
              Your contractor bills you directly — not your insurance company. This means work starts
              immediately with no insurer approval delays. Your contractor provides full documentation
              (photos, scope of works, reports) that you submit to your insurer for reimbursement.
              Payment plans are available through
              <a href="https://www.bluefirefinance.com.au" style="color:#856404;font-weight:bold;">Blue Fire Finance</a>.
            </p>
          </td>
        </tr>
      </table>
    </td>
  </tr>

  <!-- Track Your Claim CTA -->
  <tr>
    <td style="padding:30px 40px;text-align:center;">
      <a href="${SITE_URL}/track/${escapeHtml(data.claimId)}"
         style="display:inline-block;background:#0052CC;color:#ffffff;padding:14px 36px;text-decoration:none;border-radius:6px;font-weight:bold;font-size:15px;">
        Track Your Claim
      </a>
      <p style="color:#888;font-size:12px;margin:12px 0 0;">
        Claim ID: ${escapeHtml(data.claimId)}
      </p>
    </td>
  </tr>

  <!-- Footer -->
  <tr>
    <td style="background:#f4f4f7;padding:24px 40px;border-top:1px solid #e8e8e8;">
      <p style="color:#888;font-size:12px;line-height:1.6;margin:0;">
        <strong>Disaster Recovery</strong> is a lead generation platform that connects property owners
        with IICRC-certified restoration contractors. We do not provide insurance advice, legal advice,
        or financial product advice. For advice specific to your insurance policy, contact your insurer
        or one of the free services listed above.
      </p>
      <p style="color:#aaa;font-size:11px;margin:12px 0 0;">
        National Restoration Professionals Group Pty Ltd | ABN 85 151 794 142<br>
        <a href="${SITE_URL}" style="color:#0052CC;">disasterrecovery.com.au</a>
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`,
  };
}

// ─── HTML escaping for email safety ─────────────────────────

function escapeHtml(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
