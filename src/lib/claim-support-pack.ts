// ============================================================
// Claim Support Pack — UNI-910 + UNI-911
// Safe alternative to PolicyIQ: general process information +
// verified expert referrals + insurer contacts + state contacts.
//
// LEGAL NOTE: This provides factual process information and
// referrals to qualified experts (AFCA, ILS, NDH). It does NOT
// summarise, interpret, or advise on any specific insurance policy.
// This approach mirrors ASIC MoneySmart and Legal Aid guidance.
//
// VERIFICATION: All phone numbers and URLs must be verified by
// Sage before deployment (UNI-912). Review every 6 months.
// Last verified: 2026-02-26
// ============================================================

const SITE_URL = 'https://disasterrecovery.com.au';

// ─── Insurer Claims Contacts (Static, Verified) ────────────
// CRITICAL: These must be verified before deployment and reviewed
// every 6 months — insurers change their claims lines regularly.

export interface InsurerContact {
  name: string;
  phone: string;
  claimsUrl: string;
  note?: string;
}

export const INSURER_CONTACTS: InsurerContact[] = [
  { name: 'NRMA Insurance', phone: '131 123', claimsUrl: 'nrma.com.au/claims' },
  { name: 'RACV', phone: '13 19 03', claimsUrl: 'racv.com.au/insurance/claims.html' },
  { name: 'AAMI', phone: '13 22 44', claimsUrl: 'aami.com.au/claim' },
  { name: 'Suncorp', phone: '13 25 24', claimsUrl: 'suncorp.com.au/insurance/claims.html' },
  { name: 'Allianz', phone: '13 10 13', claimsUrl: 'allianz.com.au/claims.html' },
  { name: 'QBE', phone: '133 723', claimsUrl: 'qbe.com/au/claims' },
  { name: 'Budget Direct', phone: '1800 069 336', claimsUrl: 'budgetdirect.com.au/existing-customers/claims.html' },
  { name: 'GIO', phone: '13 10 10', claimsUrl: 'gio.com.au/claims.html' },
  { name: 'Youi', phone: '13 96 84', claimsUrl: 'youi.com.au/claiming' },
  { name: 'CommInsure', phone: '13 1361', claimsUrl: 'commbank.com.au/support/claims-insurance.html' },
  { name: 'ANZ Insurance', phone: '13 16 14', claimsUrl: 'anz.com.au/personal/insurance/make-a-claim/' },
  { name: 'ICA Disaster Hotline', phone: '1800 734 621', claimsUrl: 'insurancecouncil.com.au', note: 'Use if you cannot find your insurer' },
];

// ─── State Consumer Affairs / Fair Trading Contacts ─────────

export interface StateConsumerContact {
  state: string;
  name: string;
  phone: string;
  website: string;
}

export const STATE_CONSUMER_CONTACTS: StateConsumerContact[] = [
  { state: 'NSW', name: 'NSW Fair Trading', phone: '13 32 20', website: 'fairtrading.nsw.gov.au' },
  { state: 'VIC', name: 'Consumer Affairs Victoria', phone: '1300 558 181', website: 'consumer.vic.gov.au' },
  { state: 'QLD', name: 'QLD Fair Trading', phone: '13 74 68', website: 'qld.gov.au/law/fair-trading' },
  { state: 'WA', name: 'WA Consumer Protection', phone: '1300 30 40 54', website: 'consumerprotection.wa.gov.au' },
  { state: 'SA', name: 'Consumer and Business Services SA', phone: '131 882', website: 'cbs.sa.gov.au' },
  { state: 'TAS', name: 'Consumer Affairs Tasmania', phone: '1300 654 499', website: 'cbos.tas.gov.au' },
  { state: 'ACT', name: 'Access Canberra', phone: '13 22 81', website: 'accesscanberra.act.gov.au' },
  { state: 'NT', name: 'NT Consumer Affairs', phone: '1800 019 319', website: 'consumeraffairs.nt.gov.au' },
];

// ─── Verified Expert Contacts ───────────────────────────────

export const VERIFIED_CONTACTS = {
  afca: {
    name: 'Australian Financial Complaints Authority (AFCA)',
    description: 'FREE, INDEPENDENT dispute resolution. Decisions BINDING on your insurer.',
    website: 'https://www.afca.org.au/make-a-complaint',
    phone: '1800 931 678',
    hours: 'Mon–Fri 9am–5pm Melbourne time',
    when: 'If your claim is denied, your insurer delays unreasonably, the settlement seems too low, or your insurer does not follow the Code of Practice',
    preStep: 'Raise the complaint with your insurer first. If unresolved after 30 days, then go to AFCA.',
  },
  ils: {
    name: 'Insurance Law Service — Financial Rights Legal Centre',
    description: 'FREE specialist legal advice about insurance claims',
    website: 'https://financialrights.org.au/getting-help/insurance/',
    phone: '1300 663 464',
    hours: 'Mon–Fri 10am–1pm Sydney time',
    when: 'If you need legal advice about your specific policy or claim, your insurer has denied your claim, or you are not sure whether to accept a settlement offer',
  },
  ndh: {
    name: 'National Debt Helpline — Financial Counselling',
    description: 'FREE financial counselling. Can refer you to legal help.',
    website: 'https://ndh.org.au',
    phone: '1800 007 007',
    hours: 'Mon–Fri 9:30am–4:30pm. Live chat Mon–Fri 9am–8pm',
    when: 'If you are experiencing financial hardship due to disaster costs',
  },
  ica: {
    name: 'Insurance Council of Australia — Disaster Hotline',
    description: 'Helps you find your insurer or lodge a complaint about your insurer',
    website: 'https://insurancecouncil.com.au',
    phone: '1800 734 621',
    hours: 'Available during declared disaster events',
  },
  asicMoneySmart: {
    name: 'ASIC MoneySmart — Insurance Claims',
    description: 'Government guide to making and managing insurance claims',
    website: 'https://moneysmart.gov.au/home-insurance/how-to-make-a-home-insurance-claim',
  },
  legalAid: {
    websites: {
      NSW: 'https://www.legalaid.nsw.gov.au',
      VIC: 'https://www.legalaid.vic.gov.au',
      QLD: 'https://www.legalaid.qld.gov.au',
      WA: 'https://www.legalaid.wa.gov.au',
      SA: 'https://lsc.sa.gov.au',
      TAS: 'https://www.legalaid.tas.gov.au',
      ACT: 'https://www.legalaidact.org.au',
      NT: 'https://www.legalaid.nt.gov.au',
    },
  },
} as const;

// ─── Claim Stage Definitions ────────────────────────────────

export interface ClaimStage {
  stage: number;
  title: string;
  status: string;
  description: string;
  clientRight?: string;
}

export const CLAIM_STAGES: ClaimStage[] = [
  {
    stage: 1,
    title: 'Make-Safe',
    status: 'YOU ARE HERE',
    description: 'Your NRPG contractor will extract standing water or make the property safe, set up drying/remediation equipment, document damage with photos and moisture readings, and provide you with an initial scope report.',
    clientRight: 'You have the right to be present during any assessment of your property.',
  },
  {
    stage: 2,
    title: 'Insurance Assessment',
    status: '',
    description: 'Your insurer will appoint an assessor to inspect the damage. Under the General Insurance Code of Practice, your insurer must keep you informed of claim progress and tell you the reason if they deny or reduce your claim.',
    clientRight: 'You have the right to be present during any assessment of your property.',
  },
  {
    stage: 3,
    title: 'Scope of Works Approved',
    status: '',
    description: "The assessor's findings determine what your insurer will fund. The restoration scope is agreed between your insurer and contractor.",
    clientRight: 'You have the right to request a written explanation of the scope.',
  },
  {
    stage: 4,
    title: 'Restoration Works',
    status: '',
    description: 'The contractor completes the agreed restoration to pre-loss condition.',
    clientRight: "If you're unhappy with the quality of works, contact DR first, then Fair Trading in your state.",
  },
  {
    stage: 5,
    title: 'Claim Settled',
    status: '',
    description: 'Your insurer finalises payment once works are complete and verified.',
  },
];

// ─── Know Your Rights ───────────────────────────────────────

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
    title: 'Your insurer cannot unreasonably deny your claim',
    source: 'Insurance Contracts Act 1984, Section 54',
    detail: 'Your insurer cannot deny or reduce your claim because of an unreasonable technicality. Section 54 protects policyholders from unfair claim handling.',
  },
  {
    title: 'You are entitled to written reasons for any denial',
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
  { item: 'Dated photos and video of ALL damage — rooms, walls, floors, ceilings', priority: 'high' as const },
  { item: 'Written list of damaged contents (brand, model, approximate age)', priority: 'high' as const },
  { item: 'Your insurance policy number and claim number', priority: 'high' as const },
  { item: 'Keep damaged items — your insurer may need to inspect them', priority: 'high' as const },
  { item: 'Receipts for emergency purchases (accommodation, food, clothes)', priority: 'medium' as const },
  { item: "Contractor's scope of works document and invoices", priority: 'medium' as const },
  { item: 'Any correspondence with your insurer (keep email copies)', priority: 'medium' as const },
  { item: 'Council or authority notices (if applicable)', priority: 'low' as const },
];

// ─── Email Template Data Interface ──────────────────────────

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
  contractorName?: string;
  contractorPhone?: string;
}

// ─── HTML Email Generator ───────────────────────────────────

export function generateClaimSupportPackEmail(data: ClaimSupportPackData): {
  subject: string;
  html: string;
  text: string;
} {
  const stateKey = data.state?.toUpperCase() as keyof typeof VERIFIED_CONTACTS.legalAid.websites;
  const legalAidUrl = VERIFIED_CONTACTS.legalAid.websites[stateKey] || VERIFIED_CONTACTS.legalAid.websites.QLD;
  const stateConsumer = STATE_CONSUMER_CONTACTS.find(c => c.state === data.state?.toUpperCase()) || STATE_CONSUMER_CONTACTS[0];

  const damageLabel = data.damageTypes?.length > 0
    ? data.damageTypes.join(', ')
    : 'Property damage';

  const registeredDate = new Date().toLocaleString('en-AU', {
    dateStyle: 'medium',
    timeStyle: 'short',
    timeZone: 'Australia/Brisbane',
  });

  return {
    subject: `Your Disaster Recovery Claim [${data.claimId}] — Important Contacts & What to Expect Next`,
    html: buildHtmlEmail(data, damageLabel, registeredDate, stateConsumer, legalAidUrl),
    text: buildPlainTextEmail(data, damageLabel, registeredDate, stateConsumer),
  };
}

// ─── HTML Email Builder ─────────────────────────────────────

function buildHtmlEmail(
  data: ClaimSupportPackData,
  damageLabel: string,
  registeredDate: string,
  stateConsumer: StateConsumerContact,
  legalAidUrl: string,
): string {
  return `
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
      <p style="color:#a8c8ff;margin:8px 0 0;font-size:14px;">Important Contacts &amp; What to Expect Next</p>
    </td>
  </tr>

  <!-- Section 1: Personalised Header -->
  <tr>
    <td style="padding:30px 40px 0;">
      <p style="font-size:16px;color:#333;">Dear ${esc(data.clientName)},</p>
      <p style="font-size:15px;color:#555;line-height:1.6;">
        Your claim has been received and an NRPG contractor is on the way.
      </p>
      <table width="100%" cellpadding="10" cellspacing="0" style="background:#f0f4ff;border-radius:8px;margin:16px 0;">
        <tr><td style="color:#666;font-size:13px;width:160px;"><strong>Claim Reference</strong></td>
            <td style="color:#333;font-size:13px;"><strong>${esc(data.claimId)}</strong></td></tr>
        <tr><td style="color:#666;font-size:13px;"><strong>Registered</strong></td>
            <td style="color:#333;font-size:13px;">${esc(registeredDate)}</td></tr>
        <tr><td style="color:#666;font-size:13px;"><strong>Damage Type</strong></td>
            <td style="color:#333;font-size:13px;">${esc(damageLabel)}</td></tr>
        <tr><td style="color:#666;font-size:13px;"><strong>Property</strong></td>
            <td style="color:#333;font-size:13px;">${esc(data.propertyAddress)}, ${esc(data.suburb)} ${esc(data.state)} ${esc(data.postcode)}</td></tr>
        ${data.insuranceCompany ? `<tr><td style="color:#666;font-size:13px;"><strong>Insurer</strong></td>
            <td style="color:#333;font-size:13px;">${esc(data.insuranceCompany)}</td></tr>` : ''}
        <tr><td style="color:#666;font-size:13px;"><strong>Contractor Arrival</strong></td>
            <td style="color:#333;font-size:13px;"><strong>Within 60 minutes</strong></td></tr>
      </table>
    </td>
  </tr>

  <!-- Section 2: Your Next 3 Actions -->
  <tr>
    <td style="padding:20px 40px 0;">
      <h2 style="color:#1e3a5f;font-size:18px;border-bottom:2px solid #e8e8e8;padding-bottom:8px;">
        Your Next 3 Actions
      </h2>

      <!-- ACTION 1: Contact Your Insurer -->
      <table width="100%" cellpadding="14" cellspacing="0" style="background:#e8f5e9;border-radius:6px;margin:12px 0;border-left:4px solid #4CAF50;">
        <tr><td>
          <strong style="color:#2e7d32;font-size:15px;">ACTION 1 — Contact Your Insurer Now</strong>
          <p style="color:#333;font-size:13px;line-height:1.6;margin:8px 0;">
            Your insurer needs to know about this damage as soon as possible.
            Call them on the number on your policy, or find your insurer below:
          </p>
          <table width="100%" cellpadding="4" cellspacing="0" style="margin:8px 0;">
            ${INSURER_CONTACTS.map(ins => `
            <tr>
              <td style="color:#333;font-size:12px;padding:3px 0;width:140px;"><strong>${esc(ins.name)}</strong></td>
              <td style="color:#333;font-size:12px;padding:3px 0;width:120px;">${esc(ins.phone)}</td>
              <td style="font-size:12px;padding:3px 0;"><a href="https://${ins.claimsUrl}" style="color:#0052CC;">${esc(ins.claimsUrl)}</a></td>
            </tr>`).join('')}
          </table>
          <p style="color:#555;font-size:12px;margin:8px 0 0;line-height:1.5;">
            <strong>TIP:</strong> Lodge your claim by phone AND follow up in writing (email) so you have a record.
          </p>
        </td></tr>
      </table>

      <!-- ACTION 2: Document Your Damage -->
      <table width="100%" cellpadding="14" cellspacing="0" style="background:#e3f2fd;border-radius:6px;margin:12px 0;border-left:4px solid #2196F3;">
        <tr><td>
          <strong style="color:#1565c0;font-size:15px;">ACTION 2 — Document Your Damage</strong>
          <p style="color:#333;font-size:13px;line-height:1.6;margin:8px 0;">
            Before anything is moved or cleaned:
          </p>
          <table width="100%" cellpadding="4" cellspacing="0">
            ${DOCUMENT_CHECKLIST.filter(d => d.priority === 'high').map(doc => `
            <tr>
              <td style="width:20px;vertical-align:top;font-size:14px;color:#1565c0;">&#9744;</td>
              <td style="color:#333;font-size:13px;padding:2px 0;">${esc(doc.item)}</td>
            </tr>`).join('')}
          </table>
        </td></tr>
      </table>

      <!-- ACTION 3: Know Your Rights -->
      <table width="100%" cellpadding="14" cellspacing="0" style="background:#fff3e0;border-radius:6px;margin:12px 0;border-left:4px solid #FF9800;">
        <tr><td>
          <strong style="color:#e65100;font-size:15px;">ACTION 3 — Know Your Rights Before the Assessor Arrives</strong>
          <p style="color:#333;font-size:13px;line-height:1.6;margin:8px 0;">
            Read the Know Your Rights section below so you understand what to expect from your insurer.
          </p>
        </td></tr>
      </table>
    </td>
  </tr>

  <!-- Section 3: Claim Journey / Stage Tracker -->
  <tr>
    <td style="padding:20px 40px 0;">
      <h2 style="color:#1e3a5f;font-size:18px;border-bottom:2px solid #e8e8e8;padding-bottom:8px;">
        Your Claim Journey
      </h2>
      ${CLAIM_STAGES.map((stage) => `
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:14px 0;">
        <tr>
          <td style="width:40px;vertical-align:top;padding-top:2px;">
            <div style="width:30px;height:30px;background:${stage.status ? '#0052CC' : '#ccc'};color:#fff;border-radius:50%;text-align:center;line-height:30px;font-size:13px;font-weight:bold;">${stage.stage}</div>
          </td>
          <td style="padding-left:12px;">
            <strong style="color:#333;font-size:14px;">Stage ${stage.stage} — ${esc(stage.title)}</strong>
            ${stage.status ? `<span style="background:#0052CC;color:#fff;font-size:10px;padding:2px 8px;border-radius:10px;margin-left:8px;vertical-align:middle;">${esc(stage.status)}</span>` : ''}
            <p style="color:#555;font-size:13px;margin:4px 0 0;line-height:1.5;">${esc(stage.description)}</p>
            ${stage.clientRight ? `<p style="color:#0052CC;font-size:12px;margin:4px 0 0;font-style:italic;">${esc(stage.clientRight)}</p>` : ''}
          </td>
        </tr>
      </table>`).join('')}
    </td>
  </tr>

  <!-- Section 4: Your Rights — Key Contacts -->
  <tr>
    <td style="padding:24px 40px 0;">
      <h2 style="color:#1e3a5f;font-size:18px;border-bottom:2px solid #e8e8e8;padding-bottom:8px;">
        Your Rights — Where to Go for Free Help
      </h2>
      <p style="color:#555;font-size:13px;line-height:1.5;margin:8px 0 16px;">
        These organisations provide FREE, INDEPENDENT assistance. DR recommends you save these contacts before you need them.
      </p>

      <!-- AFCA -->
      <table width="100%" cellpadding="14" cellspacing="0" style="background:#f0f8ff;border-radius:6px;margin:10px 0;border-left:4px solid #0052CC;">
        <tr><td>
          <strong style="color:#0052CC;font-size:14px;">${esc(VERIFIED_CONTACTS.afca.name)}</strong>
          <p style="color:#555;font-size:12px;margin:4px 0;">${esc(VERIFIED_CONTACTS.afca.description)}</p>
          <p style="color:#333;font-size:13px;margin:6px 0;">Phone: <strong>${VERIFIED_CONTACTS.afca.phone}</strong> | ${VERIFIED_CONTACTS.afca.hours}</p>
          <p style="font-size:12px;margin:2px 0;"><a href="${VERIFIED_CONTACTS.afca.website}" style="color:#0052CC;">${VERIFIED_CONTACTS.afca.website}</a></p>
          <p style="color:#666;font-size:12px;margin:6px 0 0;line-height:1.5;">Use AFCA if: ${esc(VERIFIED_CONTACTS.afca.when)}</p>
          <p style="color:#cc0000;font-size:11px;margin:4px 0 0;"><strong>Important:</strong> ${esc(VERIFIED_CONTACTS.afca.preStep)}</p>
        </td></tr>
      </table>

      <!-- ILS -->
      <table width="100%" cellpadding="14" cellspacing="0" style="background:#f0fff0;border-radius:6px;margin:10px 0;border-left:4px solid #4CAF50;">
        <tr><td>
          <strong style="color:#2e7d32;font-size:14px;">${esc(VERIFIED_CONTACTS.ils.name)}</strong>
          <p style="color:#555;font-size:12px;margin:4px 0;">${esc(VERIFIED_CONTACTS.ils.description)}</p>
          <p style="color:#333;font-size:13px;margin:6px 0;">Phone: <strong>${VERIFIED_CONTACTS.ils.phone}</strong> | ${VERIFIED_CONTACTS.ils.hours}</p>
          <p style="font-size:12px;margin:2px 0;"><a href="${VERIFIED_CONTACTS.ils.website}" style="color:#2e7d32;">${VERIFIED_CONTACTS.ils.website}</a></p>
          <p style="color:#666;font-size:12px;margin:6px 0 0;">Call them if: ${esc(VERIFIED_CONTACTS.ils.when)}</p>
        </td></tr>
      </table>

      <!-- NDH -->
      <table width="100%" cellpadding="14" cellspacing="0" style="background:#fff8f0;border-radius:6px;margin:10px 0;border-left:4px solid #FF9800;">
        <tr><td>
          <strong style="color:#e65100;font-size:14px;">${esc(VERIFIED_CONTACTS.ndh.name)}</strong>
          <p style="color:#555;font-size:12px;margin:4px 0;">${esc(VERIFIED_CONTACTS.ndh.description)}</p>
          <p style="color:#333;font-size:13px;margin:6px 0;">Phone: <strong>${VERIFIED_CONTACTS.ndh.phone}</strong> | ${VERIFIED_CONTACTS.ndh.hours}</p>
          <p style="font-size:12px;margin:2px 0;"><a href="${VERIFIED_CONTACTS.ndh.website}" style="color:#e65100;">${VERIFIED_CONTACTS.ndh.website}</a></p>
        </td></tr>
      </table>

      <!-- ICA -->
      <table width="100%" cellpadding="14" cellspacing="0" style="background:#f5f0ff;border-radius:6px;margin:10px 0;border-left:4px solid #7B1FA2;">
        <tr><td>
          <strong style="color:#6a1b9a;font-size:14px;">${esc(VERIFIED_CONTACTS.ica.name)}</strong>
          <p style="color:#555;font-size:12px;margin:4px 0;">${esc(VERIFIED_CONTACTS.ica.description)}</p>
          <p style="color:#333;font-size:13px;margin:6px 0;">Phone: <strong>${VERIFIED_CONTACTS.ica.phone}</strong> | ${VERIFIED_CONTACTS.ica.hours}</p>
          <p style="font-size:12px;margin:2px 0;"><a href="${VERIFIED_CONTACTS.ica.website}" style="color:#6a1b9a;">${VERIFIED_CONTACTS.ica.website}</a></p>
        </td></tr>
      </table>

      <!-- State Consumer Affairs -->
      <table width="100%" cellpadding="14" cellspacing="0" style="background:#f0f0f0;border-radius:6px;margin:10px 0;border-left:4px solid #616161;">
        <tr><td>
          <strong style="color:#333;font-size:14px;">State Consumer Affairs (for contractor disputes)</strong>
          <p style="color:#555;font-size:12px;margin:4px 0;">For disputes about the quality or conduct of restoration works:</p>
          <p style="color:#333;font-size:13px;margin:6px 0;">
            <strong>Your state (${esc(data.state?.toUpperCase() || 'QLD')}):</strong>
            ${esc(stateConsumer.name)} — <strong>${esc(stateConsumer.phone)}</strong> |
            <a href="https://${stateConsumer.website}" style="color:#333;">${esc(stateConsumer.website)}</a>
          </p>
        </td></tr>
      </table>
    </td>
  </tr>

  <!-- Section 5: About Your NRPG Contractor -->
  <tr>
    <td style="padding:20px 40px 0;">
      <h2 style="color:#1e3a5f;font-size:18px;border-bottom:2px solid #e8e8e8;padding-bottom:8px;">
        About Your NRPG Contractor
      </h2>
      <p style="color:#555;font-size:13px;line-height:1.5;margin:8px 0;">
        Your assigned technician is IICRC-certified and NRPG-vetted.
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" style="margin:10px 0;">
        <tr><td style="vertical-align:top;width:50%;padding-right:10px;">
          <strong style="color:#2e7d32;font-size:13px;">What the Contractor Does:</strong>
          <ul style="color:#333;font-size:12px;line-height:1.8;margin:6px 0;padding-left:18px;">
            <li>Performs emergency make-safe works to prevent further damage</li>
            <li>Sets up and monitors professional drying/remediation equipment</li>
            <li>Documents all damage with photos, moisture readings, and written reports</li>
            <li>Provides a scope of works report for your insurance claim</li>
            <li>Restores your property to pre-loss condition (within the agreed scope)</li>
          </ul>
        </td>
        <td style="vertical-align:top;width:50%;padding-left:10px;">
          <strong style="color:#c62828;font-size:13px;">What the Contractor Does NOT Do:</strong>
          <ul style="color:#333;font-size:12px;line-height:1.8;margin:6px 0;padding-left:18px;">
            <li>Negotiate your insurance claim or advise on your payout</li>
            <li>Replace contents (this is managed separately with your insurer)</li>
            <li>Provide legal or financial advice about your policy</li>
            <li>Determine what your insurance will or won't pay</li>
          </ul>
        </td></tr>
      </table>
      <p style="color:#555;font-size:12px;line-height:1.5;margin:8px 0;">
        The contractor works under instruction from the agreed scope of works.
        Any questions about your claim should go to your insurer — or to the contacts above.
      </p>
    </td>
  </tr>

  <!-- Billing Transparency -->
  <tr>
    <td style="padding:20px 40px 0;">
      <table width="100%" cellpadding="16" cellspacing="0" style="background:#fff3cd;border-radius:6px;border-left:4px solid #ffc107;">
        <tr><td>
          <strong style="color:#856404;font-size:14px;">How Billing Works</strong>
          <p style="color:#856404;font-size:13px;line-height:1.6;margin:8px 0 0;">
            Your contractor bills you directly — not your insurance company. This means work starts
            immediately with no insurer approval delays. Your contractor provides full documentation
            (photos, scope of works, reports) that you submit to your insurer for reimbursement.
            Payment plans are available through
            <a href="https://www.bluefirefinance.com.au" style="color:#856404;font-weight:bold;">Blue Fire Finance</a>.
          </p>
        </td></tr>
      </table>
    </td>
  </tr>

  <!-- Section 6: Claim Details + Track CTA -->
  <tr>
    <td style="padding:24px 40px;text-align:center;">
      <table width="100%" cellpadding="10" cellspacing="0" style="background:#f0f4ff;border-radius:8px;margin:0 0 16px;text-align:left;">
        <tr><td style="color:#333;font-size:13px;"><strong>Claim Reference:</strong> ${esc(data.claimId)}</td></tr>
        ${data.contractorName ? `<tr><td style="color:#333;font-size:13px;"><strong>Contractor:</strong> ${esc(data.contractorName)}${data.contractorPhone ? ` | ${esc(data.contractorPhone)}` : ''}</td></tr>` : ''}
      </table>
      <a href="${SITE_URL}/track/${esc(data.claimId)}"
         style="display:inline-block;background:#0052CC;color:#ffffff;padding:14px 36px;text-decoration:none;border-radius:6px;font-weight:bold;font-size:15px;">
        Track Your Claim
      </a>
    </td>
  </tr>

  <!-- Footer / Disclaimer -->
  <tr>
    <td style="background:#f4f4f7;padding:24px 40px;border-top:1px solid #e8e8e8;">
      <p style="color:#888;font-size:12px;line-height:1.6;margin:0;">
        This email contains general information only and does not constitute legal, financial, or
        insurance advice. For advice specific to your claim, please contact the organisations listed
        above — they are free and independent.
      </p>
      <p style="color:#aaa;font-size:11px;margin:12px 0 0;">
        &copy; 2026 Disaster Recovery Australia | Powered by NRPG<br>
        National Restoration Professionals Group Pty Ltd | ABN 85 151 794 142<br>
        <a href="${SITE_URL}" style="color:#0052CC;">disasterrecovery.com.au</a>
      </p>
    </td>
  </tr>

</table>
</td></tr>
</table>
</body>
</html>`;
}

// ─── Plain Text Fallback ────────────────────────────────────

function buildPlainTextEmail(
  data: ClaimSupportPackData,
  damageLabel: string,
  registeredDate: string,
  stateConsumer: StateConsumerContact,
): string {
  return `YOUR CLAIM SUPPORT PACK
Disaster Recovery — Important Contacts & What to Expect Next
============================================================

Dear ${data.clientName},

Your claim has been received and an NRPG contractor is on the way.

CLAIM DETAILS
  Claim Reference: ${data.claimId}
  Registered: ${registeredDate}
  Damage Type: ${damageLabel}
  Property: ${data.propertyAddress}, ${data.suburb} ${data.state} ${data.postcode}
  ${data.insuranceCompany ? `Insurer: ${data.insuranceCompany}` : ''}
  Contractor Arrival: Within 60 minutes

============================================================
YOUR NEXT 3 ACTIONS
============================================================

ACTION 1 — CONTACT YOUR INSURER NOW
Your insurer needs to know about this damage as soon as possible.
Call them on the number on your policy, or find your insurer:

${INSURER_CONTACTS.map(ins => `  ${ins.name}: ${ins.phone} | ${ins.claimsUrl}`).join('\n')}

TIP: Lodge your claim by phone AND follow up in writing (email) so you have a record.

ACTION 2 — DOCUMENT YOUR DAMAGE
Before anything is moved or cleaned:
${DOCUMENT_CHECKLIST.filter(d => d.priority === 'high').map(doc => `  [ ] ${doc.item}`).join('\n')}

ACTION 3 — KNOW YOUR RIGHTS
Read the Know Your Rights section below so you understand what to expect.

============================================================
YOUR CLAIM JOURNEY
============================================================

${CLAIM_STAGES.map(stage => `STAGE ${stage.stage} — ${stage.title.toUpperCase()}${stage.status ? ` <-- ${stage.status}` : ''}
${stage.description}
${stage.clientRight ? `Your right: ${stage.clientRight}` : ''}
`).join('\n')}

============================================================
YOUR RIGHTS — FREE HELP CONTACTS
============================================================

AFCA — Australian Financial Complaints Authority
FREE, INDEPENDENT dispute resolution. Decisions BINDING on your insurer.
Phone: ${VERIFIED_CONTACTS.afca.phone} | ${VERIFIED_CONTACTS.afca.hours}
Web: ${VERIFIED_CONTACTS.afca.website}
Important: ${VERIFIED_CONTACTS.afca.preStep}

Insurance Law Service — Financial Rights Legal Centre
FREE specialist legal advice about insurance claims.
Phone: ${VERIFIED_CONTACTS.ils.phone} | ${VERIFIED_CONTACTS.ils.hours}
Web: ${VERIFIED_CONTACTS.ils.website}

National Debt Helpline — Financial Counselling
FREE financial counselling.
Phone: ${VERIFIED_CONTACTS.ndh.phone} | ${VERIFIED_CONTACTS.ndh.hours}
Web: ${VERIFIED_CONTACTS.ndh.website}

Insurance Council of Australia — Disaster Hotline
Phone: ${VERIFIED_CONTACTS.ica.phone} | ${VERIFIED_CONTACTS.ica.hours}
Web: ${VERIFIED_CONTACTS.ica.website}

State Consumer Affairs (${data.state?.toUpperCase() || 'QLD'}):
${stateConsumer.name} — ${stateConsumer.phone} | ${stateConsumer.website}

============================================================
ABOUT YOUR NRPG CONTRACTOR
============================================================

Your assigned technician is IICRC-certified and NRPG-vetted.

What the contractor DOES:
  - Performs emergency make-safe works
  - Sets up professional drying/remediation equipment
  - Documents all damage with photos, moisture readings, and reports
  - Provides a scope of works report for your insurance claim
  - Restores your property to pre-loss condition

What the contractor DOES NOT do:
  - Negotiate your insurance claim or advise on your payout
  - Replace contents (managed separately with your insurer)
  - Provide legal or financial advice about your policy
  - Determine what your insurance will or won't pay

HOW BILLING WORKS
Your contractor bills you directly — not your insurance company.
Work starts immediately with no insurer approval delays.
Full documentation provided for your insurance reimbursement claim.
Payment plans: https://www.bluefirefinance.com.au

============================================================

${data.contractorName ? `Contractor: ${data.contractorName}${data.contractorPhone ? ` | ${data.contractorPhone}` : ''}` : ''}
Track your claim: ${SITE_URL}/track/${data.claimId}

This email contains general information only and does not constitute
legal, financial, or insurance advice. For advice specific to your
claim, please contact the organisations listed above.

(c) 2026 Disaster Recovery Australia | Powered by NRPG
National Restoration Professionals Group Pty Ltd | ABN 85 151 794 142
${SITE_URL}
`;
}

// ─── HTML escaping ──────────────────────────────────────────

function esc(str: string): string {
  if (!str) return '';
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
