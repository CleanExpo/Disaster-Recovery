import { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

/**
 * DR-602: IICRC S520:2025 Mould Remediation — Policyholder Guide
 *
 * Framing: "What to Expect from a Certified Contractor"
 * Do NOT reproduce the IICRC S520 standard itself.
 * Cover: mould dispute patterns, S520 documentation, insurer tactics, AFCA pathway.
 *
 * ACL s18 compliant — no guarantee language, no first-person business language.
 */

export const metadata: Metadata = {
  title: 'IICRC S520:2025 Mould Remediation — What It Means for Your Insurance Claim',
  description:
    'IICRC S520:2025 is the industry standard for professional mould remediation. This guide explains how S520 methodology documents mould causation, what insurers commonly dispute, how clearance testing works, and how S520 documentation supports AFCA escalations for mould claims in Australia.',
  keywords:
    'IICRC S520 mould remediation, S520 2025 standard, mould remediation Australia, mould insurance claim, mould causation documentation, AFCA mould claim, certified mould remediation contractor, post-flood mould claim',
  openGraph: {
    title: 'IICRC S520:2025 Mould Remediation — What It Means for Your Insurance Claim',
    description:
      'IICRC S520:2025 mould remediation standard explained for policyholders. Causation documentation, insurer dispute patterns, clearance testing, and AFCA pathways for mould insurance claims.',
    images: [
      {
        url: `${NAP.url}/api/og?title=${encodeURIComponent('IICRC S520 Mould Remediation Guide')}&city=${encodeURIComponent('Australia')}&service=mould-remediation`,
        width: 1200,
        height: 630,
      },
    ],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/standards/iicrc-s520-mold-remediation`,
  },
  robots: {
    index: true,
    follow: true,
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is IICRC S520:2025?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IICRC S520:2025 is the current edition of the Standard for Professional Mold Remediation, published by the Institute of Inspection, Cleaning and Restoration Certification. It defines technical requirements for assessment, containment, remediation, and clearance of mould-affected property.',
      },
    },
    {
      '@type': 'Question',
      name: 'My insurer says mould is excluded from my policy. Is that always correct?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most home insurance policies contain a mould exclusion that applies to mould arising from gradual moisture issues, lack of ventilation, or failure to maintain. However, mould caused by a sudden and accidental covered event \u2014 such as a burst pipe, flood, or storm water ingress \u2014 is typically a covered loss. S520 documentation establishes the causal link between the covered event and the mould, which is the basis for claim acceptance or AFCA escalation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is mould clearance testing and when is it required?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Clearance testing verifies that mould remediation is complete and that spore counts in the remediated area are at or below outdoor baseline levels. Under S520 methodology, clearance testing is conducted after remediation, before containment is dismantled, by a qualified third party who did not perform the remediation. Clearance testing documentation is part of the S520 completion record.',
      },
    },
    {
      '@type': 'Question',
      name: 'Mould appeared months after a flood. Can I still claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. Mould arising from incomplete structural drying after a covered flood or water event is a supplementary claim connected to the original event. S520 assessment documents the moisture pathway from the original water ingress event to current mould conditions, establishing the causal link required for insurer acceptance or AFCA review.',
      },
    },
  ],
};

const breadcrumbSchema = {
  '@context': 'https://schema.org',
  '@type': 'BreadcrumbList',
  itemListElement: [
    { '@type': 'ListItem', position: 1, name: 'Home', item: NAP.url },
    { '@type': 'ListItem', position: 2, name: 'Standards', item: `${NAP.url}/standards` },
    {
      '@type': 'ListItem',
      position: 3,
      name: 'IICRC S520 Mould Remediation',
      item: `${NAP.url}/standards/iicrc-s520-mold-remediation`,
    },
  ],
};

export default function IICRCS520Page() {
  return (
    <>
      <Script
        id="s520-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <Script
        id="s520-breadcrumb"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <AgGuidePageTemplate
        category="IICRC Standards"
        title="IICRC S520:2025 Mould Remediation — What It Means for Your Insurance Claim"
        subtitle="IICRC S520:2025 is the industry standard for mould remediation. This guide explains causation documentation, common insurer dispute tactics, clearance testing requirements, and how S520 methodology supports insurance claims and AFCA escalations in Australia."
        gradient="linear-gradient(135deg, #1B5E20 0%, #2E7D32 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-14"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Standards', href: '/standards' },
          { label: 'IICRC S520 Mould Remediation' },
        ]}
        sections={[
          {
            heading: 'What Is IICRC S520:2025?',
            body: (
              <>
                <p>
                  The IICRC S520 Standard for Professional Mold Remediation is the benchmark document
                  governing how certified restoration contractors must assess, contain, remediate, and
                  verify the clearance of mould-affected property. The 2025 edition is the current
                  published version.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  S520 is the technical reference for mould remediation in Australia's insurance claims
                  context. AFCA and the Insurance Council of Australia recognise S520 methodology as
                  the industry standard for assessing whether a mould remediation scope is technically
                  reasonable. An independent S520-compliant assessment from a certified contractor is
                  the primary tool for challenging an inadequate insurer scope or a mould exclusion
                  applied to a covered water damage event.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>IICRC official information:</strong>{' '}
                  <a
                    href="https://www.iicrc.org/standards"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    iicrc.org/standards
                  </a>
                </p>
              </>
            ),
          },
          {
            heading: 'Mould Dispute Patterns — How Insurers Challenge Mould Claims',
            body: (
              <>
                <p>
                  Mould insurance claims in Australia are disputed more frequently than most other damage
                  types. The most common insurer positions and how S520 methodology addresses each:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>"Mould is a maintenance exclusion"</strong> — most policies exclude mould
                    arising from gradual moisture, lack of ventilation, or failure to maintain. However,
                    mould caused by a sudden covered event (burst pipe, storm water ingress, flood) is
                    typically covered. S520 assessment documents the specific moisture pathway from the
                    covered event to the mould colony, establishing sudden-event causation.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>"The mould was pre-existing"</strong> — insurers may assert that mould
                    predated the event. S520-compliant assessment examines moisture patterns, mould
                    colony maturity, and the physical pathway of water migration to establish timeline
                    and causation. Date-stamped moisture readings from prior to and after the event
                    are particularly important in this context.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>"The water damage was repaired adequately"</strong> — if the insurer's
                    contractor did not complete S500-compliant structural drying (with documented
                    moisture readings to dry standard), residual moisture remained in the structure.
                    S520 assessment identifies that moisture and documents the causal link to mould
                    development, establishing that drying was incomplete.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>"The scope of mould is too large"</strong> — insurer-appointed assessors
                    frequently minimise the area of mould growth, particularly in concealed spaces.
                    S520 methodology requires investigation of all areas where moisture was elevated,
                    not just visible mould surfaces.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'S520 Assessment — What a Certified Contractor Documents',
            body: (
              <>
                <p>
                  An S520-compliant mould assessment generates documentation that covers:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Visual inspection findings</strong> — all visible mould colonies documented
                    with photographs, measurements, and location within the building.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Moisture investigation</strong> — moisture readings of all affected and
                    adjacent materials, identifying elevated moisture conditions that support ongoing
                    mould growth or predict further development.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Causation analysis</strong> — identification of the moisture source or
                    pathway that generated the mould, establishing whether it is connected to a covered
                    event or a maintenance issue.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Affected material inventory</strong> — identification of all materials
                    that must be removed or remediated, with technical justification for each decision.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Remediation protocol specification</strong> — the containment, removal,
                    treatment, and clearance testing requirements specific to the affected property.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem', fontStyle: 'italic', fontSize: '0.875rem', color: '#555' }}>
                  NRPG collects your contact and property details to coordinate contractor matching. See our{' '}
                  <a href="/privacy">Privacy Policy</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'Clearance Testing — Why It Matters for Your Claim',
            body: (
              <>
                <p>
                  Clearance testing verifies that mould remediation is complete by confirming that airborne
                  spore counts in the remediated area are at or below outdoor baseline levels. Under S520
                  methodology, clearance testing must be conducted:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    After remediation is completed, before containment barriers are removed.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    By a qualified independent party who did not perform the remediation — self-clearance
                    by the remediating contractor is not consistent with S520 principles.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    With results documented against outdoor baseline measurements taken at the same time
                    and location.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Clearance testing matters for your claim because it establishes completion. If your
                  insurer's contractor completed remediation without clearance testing, you have no
                  documented basis for knowing whether remediation was effective. If mould recurs after
                  a remediation that lacked clearance testing, the insurer cannot demonstrate that the
                  remediation met S520 requirements — which supports a supplementary or repeat-scope claim.
                </p>
              </>
            ),
          },
          {
            heading: 'The AFCA Pathway for Mould Claims',
            body: (
              <>
                <p>
                  AFCA (Australian Financial Complaints Authority) is the free, independent dispute
                  resolution service for insurance complaints. Mould claims are among the most frequently
                  escalated claim types at AFCA because they involve causation disputes that are difficult
                  to resolve at insurer level.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  For a successful AFCA mould claim outcome, the following documentation is most useful:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Independent S520-compliant assessment</strong> documenting causation, affected
                    area, and required scope.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Evidence of the original covered event</strong> — photographs, insurer
                    correspondence, repair records, or BOM data for weather events.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Prior water damage restoration documentation</strong> — drying logs, moisture
                    readings, or absence thereof — establishing whether prior restoration met S500 methodology.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Timeline of discovery</strong> — documented evidence of when mould was first
                    identified, supporting that it arose from the covered event.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Lodge a mould claim AFCA dispute at{' '}
                  <a
                    href="https://www.afca.org.au/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    afca.org.au
                  </a>
                  . No cost to lodge. NRPG does not control claim outcomes — AFCA and your insurer
                  determine final decisions.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What is IICRC S520:2025?',
            answer:
              'IICRC S520:2025 is the current edition of the Standard for Professional Mold Remediation, published by the Institute of Inspection, Cleaning and Restoration Certification. It defines technical requirements for assessment, containment, remediation, and clearance of mould-affected property.',
          },
          {
            question: 'My insurer says mould is excluded from my policy. Is that always correct?',
            answer:
              'Most policies exclude mould arising from gradual moisture or failure to maintain. However, mould caused by a sudden and accidental covered event \u2014 burst pipe, flood, storm water ingress \u2014 is typically covered. S520 documentation establishes the causal link between the covered event and the mould, which is the basis for claim acceptance or AFCA escalation.',
          },
          {
            question: 'What is mould clearance testing and when is it required?',
            answer:
              'Clearance testing verifies that mould remediation is complete by confirming that spore counts in the remediated area are at or below outdoor baseline levels. Under S520 methodology, clearance testing is conducted after remediation, before containment is dismantled, by a qualified third party who did not perform the remediation.',
          },
          {
            question: 'Mould appeared months after a flood. Can I still claim?',
            answer:
              'Yes. Mould arising from incomplete structural drying after a covered flood or water event is a supplementary claim connected to the original event. S520 assessment documents the moisture pathway from the original water ingress event to current mould conditions, establishing the causal link required for insurer acceptance or AFCA review.',
          },
        ]}
        relatedGuides={[
          {
            title: 'IICRC S500 Water Damage Standard',
            href: '/standards/iicrc-s500-water-damage',
            description: 'What IICRC S500:2025 means for your flood or water damage claim.',
          },
          {
            title: 'IICRC S700 Fire & Smoke Damage Standard',
            href: '/standards/iicrc-s700-fire-smoke',
            description: 'IICRC S700:2025 fire and smoke damage restoration — policyholder guide.',
          },
          {
            title: 'Queensland Hub',
            href: '/qld',
            description: 'Queensland disaster recovery — QLD March 2026 floods and TC Maila.',
          },
          {
            title: 'NSW Hub',
            href: '/nsw',
            description: 'NSW disaster recovery — April 2026 storms, Liverpool and Fairfield claims.',
          },
          {
            title: 'Underinsurance in Australia',
            href: '/guides/insurance/underinsurance-australia',
            description: 'Understanding underinsurance and how to identify shortfalls in your policy.',
          },
        ]}
        cta={{ text: 'Request an S520-Compliant Mould Assessment', href: '/claim' }}
      />
    </>
  );
}
