import type { ContentSection } from '@/components/antigravity';

/* -------------------------------------------------------------------------- */
/* Emergency Make-Safe Guide — 8 Content Sections                              */
/* -------------------------------------------------------------------------- */

/* Shared inline styles */
const prose = { fontSize: '1.05rem' as const, lineHeight: 1.8, marginBottom: '1.25rem' as const };
const tableWrap: React.CSSProperties = { overflowX: 'auto', marginTop: '1.5rem', marginBottom: '1.5rem' };
const table: React.CSSProperties = {
  width: '100%',
  borderCollapse: 'collapse',
  fontSize: '0.95rem',
  lineHeight: 1.6,
};
const th: React.CSSProperties = {
  textAlign: 'left',
  padding: '0.75rem 1rem',
  background: 'var(--ag-primary-blue)',
  color: 'var(--ag-surface-white)',
  fontWeight: 600,
  fontSize: '0.9rem',
  whiteSpace: 'nowrap',
};
const td: React.CSSProperties = {
  padding: '0.75rem 1rem',
  borderBottom: '1px solid rgba(0,0,0,0.08)',
  verticalAlign: 'top',
};
const tdAlt: React.CSSProperties = { ...td, background: 'rgba(0,0,0,0.02)' };
const sectionImg: React.CSSProperties = {
  width: '100%',
  maxWidth: '600px',
  height: 'auto',
  borderRadius: '0.75rem',
  margin: '1.5rem auto',
  display: 'block',
  boxShadow: '0 4px 24px rgba(0,0,0,0.10)',
};

export function getEmergencyMakeSafeSections(): ContentSection[] {
  return [
    /* ── 1. What Is an Emergency Make-Safe? ─────────────────────────────── */
    {
      heading: 'What Is an Emergency Make-Safe?',
      body: (
        <>
          <img
            src="/images/optimised/insurance/3D Emergency Make-Safe.png"
            alt="3D illustration of emergency make-safe operation on a storm-damaged Australian home with blue tarps and emergency lighting"
            style={sectionImg}
            loading="eager"
            width={600}
            height={400}
          />
          <p style={prose}>
            An emergency make-safe is defined by the Insurance Council of Australia (ICA) as{' '}
            <strong>
              &ldquo;immediate rectification works to prevent further damage to your property or
              make the site safe to visit.&rdquo;
            </strong>{' '}
            It is the critical first response after a disaster event — before full restoration
            begins.
          </p>
          <p style={prose}>
            The ICA advises:{' '}
            <em>
              &ldquo;Speak to your insurer before authorising any building work, including
              emergency repairs.&rdquo;
            </em>{' '}
            However, when immediate action is required to prevent escalating damage, policyholders
            have a common law duty to mitigate loss — supported by the Insurance Contracts Act 1984
            (Cth) s13 (duty of utmost good faith).
          </p>
          <p style={prose}>Typical emergency make-safe activities include:</p>
          <ul>
            <li><strong>Roof tarping</strong> — temporary waterproof covers to prevent further water ingress</li>
            <li><strong>Board-up services</strong> — securing broken windows, doors, and structural openings</li>
            <li><strong>Emergency water extraction</strong> — removing standing water to prevent mould and structural damage</li>
            <li><strong>Utility shut-off</strong> — isolating gas, electricity, and water to eliminate safety hazards</li>
            <li><strong>Debris containment</strong> — clearing hazardous materials from access routes</li>
            <li><strong>Temporary power and lighting</strong> — enabling safe inspection and documentation</li>
          </ul>
          <p style={prose}>
            The IICRC S500 standard (5th Edition, 2021) documents that water damage escalates from
            Category 1 (clean water) to Category 2 (grey water) within 24–48 hours if left
            untreated. This escalation window — often misquoted as a &ldquo;mandatory response
            deadline&rdquo; — actually refers to the{' '}
            <strong>contamination degradation timeline</strong>, not a regulatory requirement.
            Regardless, the science is clear: faster response means lower cost and less damage.
          </p>
        </>
      ),
    },

    /* ── 2. The $2,750 Emergency Service ────────────────────────────────── */
    {
      heading: 'The $2,750 Emergency Service — What You Get',
      background: 'light',
      body: (
        <>
          <p style={prose}>
            Disaster Recovery provides a <strong>$2,750 initial emergency make-safe service</strong>{' '}
            covering the immediate mitigation response required to stabilise your property after a
            disaster event. This is the first step — not the total restoration cost.
          </p>
          <p style={prose}>
            The $2,750 covers the emergency attendance and initial make-safe scope. A compliant
            invoice is issued specifically designed for insurance reimbursement, with all fields
            required by major Australian insurers pre-populated.
          </p>
          <p style={{ ...prose, fontWeight: 600 }}>What the $2,750 emergency service includes:</p>
          <ul>
            <li><strong>24/7 emergency dispatch</strong> — IICRC-certified technician deployed to your property</li>
            <li><strong>Initial damage assessment</strong> — documented with photos, moisture readings, and scope notes</li>
            <li><strong>Emergency water extraction</strong> — industrial-grade pumps and extractors for standing water</li>
            <li><strong>Temporary weatherproofing</strong> — tarping, boarding, and sealing to prevent further damage</li>
            <li><strong>Utility isolation</strong> — safe shut-off of compromised gas, water, or electrical services</li>
            <li><strong>Hazard containment</strong> — immediate containment of biohazards, asbestos debris, or chemical spills</li>
            <li><strong>Insurance-compliant documentation</strong> — photos, readings, and initial scope for claim lodgement</li>
            <li><strong>Compliant $2,750 tax invoice</strong> — formatted for direct insurance reimbursement</li>
          </ul>
          <p style={prose}>
            Additional restoration costs (full drying, mould remediation, structural repairs,
            contents restoration) are scoped and quoted separately once the initial emergency
            mitigation is complete. These subsequent works follow the standard insurance
            scope-and-approval process.
          </p>
        </>
      ),
    },

    /* ── 3. How Insurance Reimbursement Works ───────────────────────────── */
    {
      heading: 'How Insurance Reimbursement Works',
      body: (
        <>
          <img
            src="/images/optimised/insurance/3D Insurance Reimbursement.png"
            alt="3D illustration of insurance reimbursement process with compliant invoice and approval stamp"
            style={sectionImg}
            loading="lazy"
            width={600}
            height={400}
          />
          <p style={prose}>
            Standard Australian home and commercial insurance policies cover reasonable emergency
            costs incurred to prevent escalating loss. This principle is grounded in the{' '}
            <strong>Insurance Contracts Act 1984 (Cth) s13</strong> — the duty of utmost good
            faith — and the common law duty to mitigate.
          </p>
          <p style={prose}>
            The reimbursement process for Disaster Recovery&apos;s $2,750 emergency make-safe
            follows these steps:
          </p>
          <ol>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Emergency occurs</strong> — Storm, flood, fire, or other insured event
              damages your property.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Disaster Recovery attends and performs make-safe</strong> — IICRC-certified
              technician dispatched, emergency works completed, site stabilised.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Client receives compliant $2,750 invoice</strong> — Tax invoice includes all
              fields required by insurers: ABN, scope of works, site address, event description,
              and cost breakdown.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Client lodges invoice with insurer</strong> — Submit as part of your insurance
              claim along with photos, the Authority to Commence, and your policy number.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Insurer reimburses as part of claim</strong> — The emergency make-safe cost is
              assessed as part of your overall claim settlement.
            </li>
          </ol>
          <p style={prose}>
            <strong>Key GICOP timeframes:</strong> Under the General Insurance Code of Practice
            2020, insurers must respond to claims within <strong>10 business days</strong> of
            receipt (Para 68), provide an initial response within{' '}
            <strong>10 business days</strong> of receiving all required information (Para 76), and
            make an overall decision within <strong>4 months</strong> (Para 77) for non-catastrophe
            events.
          </p>
          <p style={prose}>
            <strong>Important:</strong> The $2,750 is paid upfront to Disaster Recovery to commence
            emergency works. While most policies cover reasonable emergency mitigation costs, the
            ICA advises speaking to your insurer before authorising building work where possible.
            The compliant invoice is specifically formatted to support reimbursement through the
            standard claims process.
          </p>
        </>
      ),
    },

    /* ── 4. The Authority to Commence Form ──────────────────────────────── */
    {
      heading: 'The Authority to Commence Form',
      background: 'light',
      body: (
        <>
          <img
            src="/images/optimised/insurance/3D Authority to Commence.png"
            alt="3D illustration of Authority to Commence contract document with clipboard, pen, and inspection report"
            style={sectionImg}
            loading="lazy"
            width={600}
            height={400}
          />
          <p style={prose}>
            The Authority to Commence is the legal document that binds the contract between you and
            Disaster Recovery, and provides the structured documentation that insurers require for
            claim processing. Every field has been designed to align with insurer expectations.
          </p>
          <div style={tableWrap}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Required Field</th>
                  <th style={th}>Why Insurers Need It</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={td}><strong>Site Address</strong></td>
                  <td style={td}>Confirms the insured property location matches the policy</td>
                </tr>
                <tr>
                  <td style={tdAlt}><strong>Client Details</strong></td>
                  <td style={tdAlt}>Matches the policyholder identity for claim validation</td>
                </tr>
                <tr>
                  <td style={td}><strong>Description of the Event</strong></td>
                  <td style={td}>Aligns with the claim lodgement details and event type</td>
                </tr>
                <tr>
                  <td style={tdAlt}><strong>Date of Incidence</strong></td>
                  <td style={tdAlt}>Establishes timeline for policy trigger and response window</td>
                </tr>
                <tr>
                  <td style={td}><strong>Initial Inspection Report</strong></td>
                  <td style={td}>Provides contemporaneous evidence of damage scope at attendance</td>
                </tr>
                <tr>
                  <td style={tdAlt}><strong>Scope of Works</strong></td>
                  <td style={tdAlt}>Defines exactly what emergency works will be performed</td>
                </tr>
                <tr>
                  <td style={td}><strong>Cost Estimate</strong></td>
                  <td style={td}>Substantiates the reimbursement amount ($2,750 emergency service)</td>
                </tr>
                <tr>
                  <td style={tdAlt}><strong>Disclaimer (re: unseen works)</strong></td>
                  <td style={tdAlt}>Protects both parties if hidden damage is discovered during works</td>
                </tr>
                <tr>
                  <td style={td}><strong>Business Details</strong></td>
                  <td style={td}>Verifies contractor credentials, ABN, licensing, and insurance</td>
                </tr>
                <tr>
                  <td style={tdAlt}><strong>Terms and Conditions</strong></td>
                  <td style={tdAlt}>Establishes the legal framework for the engagement</td>
                </tr>
                <tr>
                  <td style={td}><strong>Signatures (Business + Client)</strong></td>
                  <td style={td}>Legal binding of agreement — required for claim documentation</td>
                </tr>
              </tbody>
            </table>
          </div>
          <p style={prose}>
            This form is completed on-site during the initial attendance. A digital copy is
            provided to you for your records and for submission to your insurer alongside the
            compliant invoice.
          </p>
        </>
      ),
    },

    /* ── 5. Your Right to Choose a Contractor ───────────────────────────── */
    {
      heading: 'Your Right to Choose a Contractor',
      body: (
        <>
          <p style={prose}>
            One of the most commonly misunderstood aspects of insurance claims is your right to
            choose your own contractor. Here is the accurate legal position:
          </p>
          <p style={prose}>
            <strong>The GICOP 2020 does not explicitly grant a &ldquo;right to choose your own
            repairer.&rdquo;</strong> Under Part 4 (Paras 35–41 — Service Supplier Standards),
            insurers typically appoint their own contractors to manage repairs. However,
            policyholders have several pathways to engage their preferred contractor:
          </p>
          <ol>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Cash settlement (GICOP Para 79)</strong> — You can request a cash settlement
              from your insurer and use those funds to engage your own contractor. The insurer pays
              you the assessed repair amount, and you manage the restoration independently.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>AFCA complaint pathway</strong> — If the insurer&apos;s appointed builder
              cannot meet your needs (e.g., unacceptable delays, quality concerns), you can raise a
              complaint with the Australian Financial Complaints Authority (AFCA). AFCA recognises
              the right to choose a contractor when the insurer&apos;s panel cannot deliver.
            </li>
            <li style={{ marginBottom: '0.75rem' }}>
              <strong>Nominate a preferred contractor</strong> — You can nominate a preferred
              contractor who meets the insurer&apos;s professional criteria (licensing, insurance,
              IICRC certification). Many insurers will consider this, particularly if the contractor
              is part of a recognised network.
            </li>
          </ol>
          <p style={prose}>
            <strong>Historical precedent:</strong> The ACCC&apos;s 2005 investigation into IAG
            established the &ldquo;choice of repairer&rdquo; principle in motor vehicle insurance,
            which has influenced broader insurance practice — though it is not directly codified in
            the GICOP for property claims.
          </p>
          <p style={prose}>
            <strong>New Zealand comparison:</strong> Under the ICNZ Fair Insurance Code 2020
            (current version — note: some sources incorrectly cite a 2024 version), the insurer may
            approve repairs, appoint a repairer, or offer a cash settlement. The insured is
            required to &ldquo;take reasonable steps to reduce additional damage&rdquo; — similar
            to Australia&apos;s common law duty to mitigate.
          </p>
          <p style={{ ...prose, background: 'rgba(30,58,95,0.06)', padding: '1rem 1.25rem', borderRadius: '0.5rem', borderLeft: '4px solid var(--ag-primary-blue)' }}>
            <strong>Key takeaway:</strong> While you cannot simply demand your own contractor, you
            have legitimate pathways through cash settlement (Para 79) or AFCA if the insurer&apos;s
            panel does not meet your needs. NRPG network contractors meet the professional criteria
            most insurers require.
          </p>
        </>
      ),
    },

    /* ── 6. Why NRPG Contractors vs Standard TPAs ──────────────────────── */
    {
      heading: 'Why NRPG Contractors vs Standard TPAs',
      background: 'light',
      body: (
        <>
          <img
            src="/images/optimised/insurance/3D NRPG Contractor.png"
            alt="3D comparison showing standard TPA contractor versus NRPG-certified professional with equipment and credentials"
            style={sectionImg}
            loading="lazy"
            width={600}
            height={400}
          />
          <p style={prose}>
            Not all contractors are equal. The General Insurance Code of Practice 2020 (Para 38)
            requires insurers to verify that their service suppliers have &ldquo;appropriate
            qualifications, training and expertise.&rdquo; NRPG network contractors exceed these
            minimum standards.
          </p>
          <div style={tableWrap}>
            <table style={table}>
              <thead>
                <tr>
                  <th style={th}>Factor</th>
                  <th style={th}>Standard TPA / Builder</th>
                  <th style={th}>NRPG Network Contractor</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td style={td}><strong>IICRC Certification</strong></td>
                  <td style={td}>Often uncertified — estimated 70% of AU contractors lack IICRC</td>
                  <td style={td}>Mandatory — WRT, AMRT, FSRT as required</td>
                </tr>
                <tr>
                  <td style={tdAlt}><strong>Vetting Standards</strong></td>
                  <td style={tdAlt}>Varies by insurer panel</td>
                  <td style={tdAlt}>National vetting: licensing, insurance, certification, track record</td>
                </tr>
                <tr>
                  <td style={td}><strong>Digital Scoping</strong></td>
                  <td style={td}>Often manual/handwritten</td>
                  <td style={td}>RestoreAssist digital platform — standardised, transparent</td>
                </tr>
                <tr>
                  <td style={tdAlt}><strong>Insurance Compliance</strong></td>
                  <td style={tdAlt}>Basic invoicing</td>
                  <td style={tdAlt}>Pre-formatted compliant documentation designed for insurer acceptance</td>
                </tr>
                <tr>
                  <td style={td}><strong>Training</strong></td>
                  <td style={td}>Ad hoc, often expired</td>
                  <td style={td}>CARSI-delivered IICRC-accredited programs, continuously updated</td>
                </tr>
                <tr>
                  <td style={tdAlt}><strong>National Coverage</strong></td>
                  <td style={tdAlt}>Typically single metro area</td>
                  <td style={tdAlt}>Australia-wide — from Coober Pedy to Sydney CBD</td>
                </tr>
                <tr>
                  <td style={td}><strong>Documentation Quality</strong></td>
                  <td style={td}>Inconsistent — often insufficient for disputed claims</td>
                  <td style={td}>Standardised: photos, moisture readings, thermal imaging, drying logs</td>
                </tr>
              </tbody>
            </table>
          </div>
        </>
      ),
    },

    /* ── 7. Frequently Asked Questions ──────────────────────────────────── */
    {
      heading: 'Frequently Asked Questions',
      body: (
        <>
          <h3 style={{ color: 'var(--ag-primary-blue)', marginTop: '1.5rem' }}>
            Can my insurer force me to use their repairer?
          </h3>
          <p style={prose}>
            Insurers can appoint their own contractors under GICOP Part 4, and they can refuse to
            cover costs above their assessed amount if you use an independent contractor. However,
            they cannot force you to accept a specific repairer. The pathway is to request a{' '}
            <strong>cash settlement (GICOP Para 79)</strong> and engage your own contractor.
            If the insurer&apos;s appointed contractor cannot meet your needs (e.g., unacceptable
            delays), you can escalate to <strong>AFCA</strong>.
          </p>

          <h3 style={{ color: 'var(--ag-primary-blue)', marginTop: '1.5rem' }}>
            How do I claim my $2,750 emergency make-safe invoice?
          </h3>
          <p style={prose}>
            Lodge the compliant tax invoice with your insurer as part of your insurance claim.
            Include the Authority to Commence, event photos, and your policy number. The invoice is
            specifically formatted with all fields insurers require for processing emergency
            mitigation costs. Most standard policies cover reasonable emergency expenses incurred to
            prevent escalating damage.
          </p>

          <h3 style={{ color: 'var(--ag-primary-blue)', marginTop: '1.5rem' }}>
            What if the damage is worse than expected?
          </h3>
          <p style={prose}>
            The Authority to Commence includes a disclaimer for unseen works — protecting both you
            and the contractor if hidden damage (e.g., mould behind walls, structural compromise
            under floors) is discovered during the make-safe. Additional restoration costs are
            scoped and quoted separately, following the standard insurance approval process.
          </p>

          <h3 style={{ color: 'var(--ag-primary-blue)', marginTop: '1.5rem' }}>
            Is the $2,750 the total cost?
          </h3>
          <p style={prose}>
            No. The $2,750 covers the <strong>emergency make-safe only</strong> — the immediate
            stabilisation and mitigation response. Full restoration (structural drying, mould
            remediation, rebuilding, contents restoration) is scoped and quoted separately once the
            initial emergency is resolved. Think of it as the emergency department visit before the
            specialist treatment plan.
          </p>

          <h3 style={{ color: 'var(--ag-primary-blue)', marginTop: '1.5rem' }}>
            Do I need to pay the $2,750 upfront?
          </h3>
          <p style={prose}>
            Yes. Disaster Recovery requires the initial $2,750 payment to commence emergency works.
            Unlike insurer-appointed contractors who may take days to gain approval, we attend immediately. The trade-off
            is speed: Disaster Recovery can be on-site within the hour without waiting for insurer approval,
            and the compliant invoice is designed for straightforward reimbursement through your
            claim.
          </p>

          <h3 style={{ color: 'var(--ag-primary-blue)', marginTop: '1.5rem' }}>
            What does the General Insurance Code of Practice say?
          </h3>
          <p style={prose}>
            The GICOP 2020 sets key claims handling timeframes:{' '}
            <strong>Para 68</strong> — insurers must respond to claims within 10 business days of
            receipt.{' '}
            <strong>Para 70</strong> — insurers must provide updates at least every 20 business
            days.{' '}
            <strong>Para 76</strong> — once all information is received, insurers must decide
            within 10 business days.{' '}
            <strong>Para 77</strong> — overall decision must be made within 4 months (12 months
            for catastrophe events).
          </p>
        </>
      ),
    },

    /* ── 8. Regulatory References & Sources ─────────────────────────────── */
    {
      heading: 'Regulatory References & Sources',
      background: 'light',
      body: (
        <>
          <p style={prose}>
            Every claim in this guide is supported by verifiable sources. The following references
            are provided for your own research and to support any insurance discussions:
          </p>
          <ul style={{ listStyle: 'none', padding: 0 }}>
            <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <strong>General Insurance Code of Practice 2020</strong>
              <br />
              <span style={{ color: 'var(--ag-text-muted)', fontSize: '0.9rem' }}>
                Code Governance Committee (CGC) —{' '}
                <a
                  href="https://insurancecode.org.au/resources/general-insurance-code-of-practice-2020/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--ag-primary-blue)' }}
                >
                  insurancecode.org.au
                </a>
              </span>
            </li>
            <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <strong>Insurance Contracts Act 1984 (Cth)</strong>
              <br />
              <span style={{ color: 'var(--ag-text-muted)', fontSize: '0.9rem' }}>
                Federal Register of Legislation —{' '}
                <a
                  href="https://classic.austlii.edu.au/au/legis/cth/consol_act/ica1984220/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--ag-primary-blue)' }}
                >
                  austlii.edu.au
                </a>
              </span>
            </li>
            <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <strong>ICA — Frequently Asked Questions After a Disaster</strong>
              <br />
              <span style={{ color: 'var(--ag-text-muted)', fontSize: '0.9rem' }}>
                Insurance Council of Australia —{' '}
                <a
                  href="https://insurancecouncil.com.au/resource/frequently-asked-questions-after-a-disaster/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--ag-primary-blue)' }}
                >
                  insurancecouncil.com.au
                </a>
              </span>
            </li>
            <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <strong>AFCA — Home Insurance Claim Delays Factsheet</strong>
              <br />
              <span style={{ color: 'var(--ag-text-muted)', fontSize: '0.9rem' }}>
                Australian Financial Complaints Authority —{' '}
                <a
                  href="https://www.afca.org.au/about-afca/publications/factsheet-home-insurance-claim-delays-and-covid-19"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--ag-primary-blue)' }}
                >
                  afca.org.au
                </a>
              </span>
            </li>
            <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <strong>NZ Fair Insurance Code 2020</strong>
              <br />
              <span style={{ color: 'var(--ag-text-muted)', fontSize: '0.9rem' }}>
                Insurance Council of New Zealand —{' '}
                <a
                  href="https://www.icnz.org.nz/wp-content/uploads/2023/01/Fair_Insurance_Code_2020.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--ag-primary-blue)' }}
                >
                  icnz.org.nz
                </a>
              </span>
            </li>
            <li style={{ marginBottom: '1rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(0,0,0,0.06)' }}>
              <strong>IICRC S500 — Standard for Professional Water Damage Restoration</strong>
              <br />
              <span style={{ color: 'var(--ag-text-muted)', fontSize: '0.9rem' }}>
                Institute of Inspection, Cleaning and Restoration Certification —{' '}
                <a
                  href="https://iicrc.org/s500/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--ag-primary-blue)' }}
                >
                  iicrc.org
                </a>
              </span>
            </li>
            <li style={{ marginBottom: '1rem' }}>
              <strong>Moneysmart (ASIC) — How to Make a Home Insurance Claim</strong>
              <br />
              <span style={{ color: 'var(--ag-text-muted)', fontSize: '0.9rem' }}>
                Australian Securities &amp; Investments Commission —{' '}
                <a
                  href="https://moneysmart.gov.au/home-insurance/how-to-make-a-home-insurance-claim"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: 'var(--ag-primary-blue)' }}
                >
                  moneysmart.gov.au
                </a>
              </span>
            </li>
          </ul>
          <p style={{ ...prose, fontStyle: 'italic', color: 'var(--ag-text-muted)' }}>
            Note: The Australian Consumer Law (ACL) does not directly apply to insurance contracts.
            Insurance is regulated under the ASIC Act and the Insurance Contracts Act 1984 (Cth).
            References to &ldquo;consumer rights&rdquo; in the insurance context refer to these
            specific regulatory frameworks, not the ACL.
          </p>
        </>
      ),
    },
  ];
}
