import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Insurance-Approved vs Preferred Contractor — Your Rights in Australia',
  description:
    "Do you have to use your insurer's contractor? Learn your rights under the Insurance Contracts Act and how to request a preferred IICRC-certified contractor for your restoration.",
  alternates: {
    canonical: `${NAP.url}/guides/insurance/insurance-approved-vs-preferred-contractor`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: NAP.name,
  '@id': `${NAP.url}/#organization`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Insurance-Approved vs Preferred Contractor Support',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Preferred Contractor Nomination for Insurance Claims',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Preferred Contractor Nomination for Insurance Claims',
  description:
    'IICRC-certified preferred contractor services for Australian insurance claims. NRPG provides independent documentation to IICRC S500, S520, and S700 standards — supporting policyholders who request a preferred contractor over insurer-appointed restorers.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: "Can my insurer force me to use their approved contractor?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Your insurer has the right under most policy terms to appoint a contractor to complete the restoration work. However, under section 54 of the Insurance Contracts Act 1984 and the General Insurance Code of Practice, you have the right to dispute the quality of work performed by an insurer-appointed contractor and to request rectification. If the insurer refuses to address defective work, AFCA can review the matter. Practically, many insurers will accommodate a request for a preferred IICRC-certified contractor if made formally in writing at the time of claim lodgement.",
      },
    },
    {
      '@type': 'Question',
      name: "What are the risks of using an insurer-appointed builder?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Insurer-appointed restorers operate under commercial agreements with the insurer that may incentivise minimising the scope of works — reducing cost per claim. They are not required to produce independent IICRC-certified documentation such as psychrometric drying logs or scope of works that fully captures secondary damage. If the work is incomplete or below standard, the insurer bears responsibility for rectification — but the process of obtaining rectification can be protracted. Using an independent IICRC-certified contractor from the outset produces documentation that is not subject to the same conflict of interest.",
      },
    },
    {
      '@type': 'Question',
      name: "How do I request NRPG as my preferred contractor?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Notify your insurer in writing when lodging your claim that you wish to use a preferred IICRC-certified contractor. State that you are requesting a contractor who holds current IICRC certification relevant to the damage type (S500 for water, S520 for mould, S700 for fire). Name NRPG as your preferred contractor. If your insurer refuses, ask them to provide written grounds for the refusal. If the refusal is not supported by a valid policy provision, escalate to AFCA.",
      },
    },
    {
      '@type': 'Question',
      name: "What happens if the insurer's contractor does a poor job?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Document any defects in writing — photographs with dates, a written description of each defect, and your assessment of what the correct standard of work should have been. Send a formal written request for rectification to your insurer (not just the contractor). The insurer is responsible for the work quality of their appointed contractor. If they refuse to arrange rectification or the rectification is inadequate, lodge a complaint with AFCA. Include your documentation of defects and any independent assessment from a certified contractor.",
      },
    },
  ],
};

export default function InsuranceApprovedVsPreferredContractorPage() {
  return (
    <>
      <Script
        id="iapc-localbusiness"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="iapc-service"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="iapc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Insurance Claims"
        title="Insurance-Approved vs Preferred Contractor"
        subtitle="Your rights in Australia — do you have to use the insurer's builder?"
        gradient="linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance', href: '/guides/insurance' },
          { label: 'Insurance-Approved vs Preferred Contractor' },
        ]}
        sections={[
          {
            heading: 'Your Legal Rights Under the Insurance Contracts Act 1984',
            body: (
              <>
                <p>
                  The Insurance Contracts Act 1984 and the General Insurance Code of Practice
                  establish the legal framework governing the relationship between insurers and
                  policyholders during the claims process. Understanding your rights under this
                  framework is the first step in asserting your preference for an independent
                  IICRC-certified contractor.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Section 54 protections:</strong> Section 54 of the Insurance
                    Contracts Act 1984 provides that an insurer cannot refuse to pay a claim
                    solely because of an act or omission by the insured after the event, unless
                    the act or omission caused or contributed to the loss. This provision is
                    relevant where an insurer tries to use procedural grounds — such as
                    appointing your own contractor without approval — to reduce or deny a
                    claim that was otherwise validly lodged.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Insurer&apos;s obligations:</strong> Under the General Insurance
                    Code of Practice, your insurer must manage your claim fairly and
                    transparently, provide written reasons for any claim decision, and handle
                    disputes through a compliant Internal Dispute Resolution process. They
                    cannot use the contractor appointment process to frustrate your right to
                    a full settlement.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Right to dispute contractor appointment:</strong> While insurers
                    have broad rights to appoint contractors under most policy terms, you have
                    the right to object in writing and request reasons if the appointed
                    contractor is not appropriately certified, is performing work below
                    standard, or has a conflict of interest. A formal written objection
                    preserves your rights under IDR and AFCA.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Duty of good faith:</strong> Both insurer and insured are bound
                    by the duty of utmost good faith under the Insurance Contracts Act. An
                    insurer who appoints a contractor with a commercial incentive to minimise
                    the scope of works — without disclosing this arrangement — may be acting
                    inconsistently with their good faith obligations.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Insurer-Appointed vs Independent IICRC-Certified Contractors',
            body: (
              <>
                <p>
                  The practical difference between an insurer-appointed restorer and an
                  independent IICRC-certified contractor goes beyond the commercial relationship.
                  It affects the documentation produced, the scope of works assessed, and the
                  long-term outcome for your property.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Potential conflicts in insurer-appointed arrangements:</strong>{' '}
                    Insurer-appointed restorers are paid per claim under commercial agreements
                    that may include scope-reduction incentives. There is an inherent tension
                    between minimising cost per claim and delivering a comprehensive restoration
                    scope. This tension is not present in an independent IICRC-certified
                    contractor arrangement where the contractor&apos;s obligation is to the
                    property owner.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Documentation standards — IICRC S500, S520, S700:</strong>{' '}
                    IICRC-certified contractors are required to document their work to the
                    standards relevant to the damage type: ANSI/IICRC S500:2025 for water
                    damage, S520 for mould remediation, and S700:2025 for fire and smoke
                    damage. This documentation — including psychrometric drying logs, air
                    quality test results, and scope of works — is what insurers and AFCA
                    adjudicators rely on to verify that work was completed to the required
                    standard.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Psychrometric drying logs:</strong> For water and fire claims
                    involving structural drying, a psychrometric drying log is the critical
                    document that confirms the structure was dried to target moisture content.
                    Without this log, the insurer can dispute any secondary damage (mould,
                    structural movement, subfloor deterioration) that arises after the
                    initial restoration — even if the cause was inadequate drying.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Independent scope reduces dispute risk:</strong> An independent
                    IICRC-certified scope prepared before the insurer&apos;s assessor attends
                    gives you a documented counter-position for any scope underpayment. This
                    is not available if you allow the insurer-appointed contractor to set
                    the scope without challenge.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'How to Request a Preferred Contractor',
            body: (
              <>
                <p>
                  Requesting a preferred contractor is most effective when done in writing at
                  the time of claim lodgement. The following steps give you the best chance
                  of the insurer accommodating your preference.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Written notice at claim lodgement:</strong> When you contact
                    your insurer to lodge the claim, follow up in writing (email or letter)
                    stating that you wish to use a preferred contractor and that your preferred
                    contractor is IICRC-certified. Name NRPG as your preferred contractor.
                    Early notice prevents the insurer from committing their appointed contractor
                    before you have raised your preference.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>IICRC certification requirements:</strong> When requesting a
                    preferred contractor, specify the relevant IICRC certification: water
                    damage restoration (WRT) or applied structural drying (ASD) under S500,
                    applied microbial remediation (AMRT) under S520, or fire and smoke
                    restoration (FSRT) under S700. Framing the request in terms of
                    certification standards — rather than simply &quot;my preferred builder&quot;
                    — makes it harder for the insurer to refuse.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>If the insurer refuses:</strong> Request written reasons for the
                    refusal. If the reason is not a valid policy provision, lodge a formal
                    internal dispute. If the IDR does not resolve the issue, escalate to AFCA.
                    Note that AFCA accepts complaints about contractor appointment processes,
                    not just claim settlement amounts.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Escalation path:</strong> Written preference at lodgement →
                    written refusal from insurer → Internal Dispute Resolution → AFCA
                    complaint. Document every step. AFCA&apos;s jurisdiction covers the
                    contractor appointment process where it affects the outcome of the claim.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'When Things Go Wrong with Insurer-Appointed Work',
            body: (
              <>
                <p>
                  If work performed by an insurer-appointed contractor is defective, incomplete,
                  or below the standard required by the relevant IICRC standard, you have formal
                  rights to rectification. Follow this process to protect your position.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Defect documentation checklist:</strong> Before raising a
                    rectification request, document every defect in writing: photograph each
                    issue, note the date the defect was observed, describe what the correct
                    standard of work should look like, and reference the relevant IICRC
                    standard if applicable (for example, incomplete drying not meeting S500
                    target moisture content).
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Written rectification demand:</strong> Send a formal written
                    request for rectification to your insurer — not just the contractor. Your
                    insurer is legally responsible for the quality of work performed by their
                    appointed contractor. Address the demand to the insurer&apos;s claims
                    department with your claim number. Allow a reasonable time for response
                    (typically 10 business days under the General Insurance Code of Practice).
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>AFCA complaint process:</strong> If the insurer fails to arrange
                    rectification within a reasonable timeframe, or if the rectification
                    offered is inadequate, lodge a complaint with AFCA. AFCA accepts complaints
                    about the quality of insurer-appointed contractor work and can require the
                    insurer to arrange rectification or provide a cash settlement for the
                    cost of rectification. Include all defect documentation and correspondence
                    with your complaint.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Independent scope assessment:</strong> Obtain an independent
                    IICRC-certified assessment of the defective work. This assessment documents
                    what was done, what the standard requires, and what rectification is needed.
                    This is the most compelling evidence for an AFCA complaint about
                    insurer-appointed contractor quality.
                  </li>
                </ul>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: "Can my insurer force me to use their approved contractor?",
            answer:
              "Your insurer has the right under most policy terms to appoint a contractor to complete the restoration work. However, under section 54 of the Insurance Contracts Act 1984 and the General Insurance Code of Practice, you have the right to dispute the quality of work performed by an insurer-appointed contractor and to request rectification. If the insurer refuses to address defective work, AFCA can review the matter. Practically, many insurers will accommodate a request for a preferred IICRC-certified contractor if made formally in writing at the time of claim lodgement.",
          },
          {
            question: "What are the risks of using an insurer-appointed builder?",
            answer:
              "Insurer-appointed restorers operate under commercial agreements with the insurer that may incentivise minimising the scope of works — reducing cost per claim. They are not required to produce independent IICRC-certified documentation such as psychrometric drying logs or scope of works that fully captures secondary damage. If the work is incomplete or below standard, the insurer bears responsibility for rectification — but the process of obtaining rectification can be protracted. Using an independent IICRC-certified contractor from the outset produces documentation that is not subject to the same conflict of interest.",
          },
          {
            question: "How do I request NRPG as my preferred contractor?",
            answer:
              "Notify your insurer in writing when lodging your claim that you wish to use a preferred IICRC-certified contractor. State that you are requesting a contractor who holds current IICRC certification relevant to the damage type (S500 for water, S520 for mould, S700 for fire). Name NRPG as your preferred contractor. If your insurer refuses, ask them to provide written grounds for the refusal. If the refusal is not supported by a valid policy provision, escalate to AFCA.",
          },
          {
            question: "What happens if the insurer's contractor does a poor job?",
            answer:
              "Document any defects in writing — photographs with dates, a written description of each defect, and your assessment of what the correct standard of work should have been. Send a formal written request for rectification to your insurer (not just the contractor). The insurer is responsible for the work quality of their appointed contractor. If they refuse to arrange rectification or the rectification is inadequate, lodge a complaint with AFCA. Include your documentation of defects and any independent assessment from a certified contractor.",
          },
        ]}
        relatedGuides={[
          {
            title: 'Insurance-Approved Contractors',
            href: '/guides/insurance/insurance-approved-contractors',
            description: 'How insurer-approved contractor networks work and what they mean for your claim.',
          },
          {
            title: 'Human Advocate vs AI',
            href: '/services/human-advocate-vs-ai-claims',
            description: 'Why a human IICRC-certified advocate produces better claim outcomes than AI tools.',
          },
          {
            title: 'Section 54 Rights',
            href: '/guides/insurance/section-54-contractor-rights',
            description: 'Your rights under section 54 of the Insurance Contracts Act 1984.',
          },
        ]}
        cta={{ text: 'Request IICRC-Certified Contractor', href: '/claim' }}
      />
    </>
  );
}
