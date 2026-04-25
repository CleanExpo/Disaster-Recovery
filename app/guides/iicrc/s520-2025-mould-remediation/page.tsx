/**
 * IICRC S520 Mould Remediation — IICRC Standards Guide
 *
 * Framing: "What to Expect from an IICRC-Certified Contractor" — not a standards reference.
 * Does not describe, reproduce, or characterise the content of IICRC S520.
 * Canonical points to the authoritative category page.
 */

import type { Metadata } from 'next';
import Script from 'next/script';
import { Wind } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Mould Remediation — What to Expect from an IICRC-Certified Contractor',
  description:
    'What an IICRC-certified mould remediation contractor does: assessment, containment, remediation, clearance testing, and insurance documentation. Disaster Recovery.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/mould/iicrc-s520-mould-remediation-standard',
  },
  openGraph: {
    title: 'Mould Remediation — IICRC-Certified Contractor Process',
    description:
      'What to expect from an IICRC-certified mould remediation contractor: assessment, containment, remediation, and clearance testing.',
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What does an IICRC-certified mould remediation contractor do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'An IICRC-certified mould remediation contractor will inspect and assess the extent of mould growth, establish physical containment to prevent spore spread, remediate affected materials (removing material that cannot be cleaned, treating salvageable surfaces), manage air quality throughout the process, and conduct or arrange clearance testing to confirm remediation is complete before containment is removed.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover mould remediation in Australia?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Coverage depends on the cause and the policy wording. Mould arising directly from a sudden insured event — a burst pipe, storm inundation, or cyclone — is generally covered. Mould from gradual leaks, condensation, or long-term neglect is typically excluded. A certified contractor can document the causal link between an insured event and the mould damage. Consult your insurer or broker about your specific policy.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does mould keep coming back after remediation?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Recurring mould almost always means the underlying moisture source was not resolved. Professional remediation addresses both the mould and the conditions that allowed it to grow. If the original water intrusion — roof leak, rising damp, or incomplete drying from a previous water event — is not identified and fixed, mould will return. A certified contractor identifies moisture sources as part of the assessment. If mould recurs, a re-inspection to locate the ongoing moisture source is the appropriate next step.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is clearance testing and why does it matter?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Clearance testing confirms that mould remediation is complete — that spore levels in the treated area are within acceptable limits. It provides documentation that the work was effective, which protects the property owner and supports the insurance claim. Without clearance testing, there is no independent confirmation that the scope was fully completed.',
      },
    },
    {
      '@type': 'Question',
      name: 'How quickly does mould grow after a water event?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'In warm, humid Australian conditions, mould can become established within 24 to 72 hours of water exposure. After a significant water event — cyclone inundation, flood, or burst pipe — prompt drying is essential to prevent mould growth. Properties that were not dried quickly often develop mould in wall cavities, under flooring, and in ceiling voids before visible signs appear on surfaces.',
      },
    },
  ],
};

export default function S5202025MouldRemediationPage() {
  return (
    <>
      <Script
        id="s520-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="IICRC Certification"
        title="Mould Remediation"
        subtitle="What to Expect from an IICRC-Certified Contractor"
        gradient="linear-gradient(135deg, #1A2E1A 0%, #2E7D32 100%)"
        icon={<Wind className="h-10 w-10" />}
        lastReviewed="2026-04-14"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'IICRC Certification', href: '/guides/iicrc' },
          { label: 'Mould Remediation' },
        ]}
        sections={[
          {
            heading: 'IICRC-Certified Mould Remediation Contractors',
            body: (
              <>
                <p>
                  Contractors in the Disaster Recovery network hold current IICRC certification in
                  mould remediation. Certification confirms that a contractor has been independently
                  assessed on the knowledge required to safely and effectively remediate
                  mould-affected properties.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Mould remediation is not the same as surface cleaning. A certified contractor
                  follows a structured process that addresses contamination at the source —
                  including concealed mould in wall cavities and subfloors that is not visible from
                  a surface inspection.
                </p>
              </>
            ),
          },
          {
            heading: 'The On-Site Process',
            body: (
              <>
                <p>A certified mould remediation contractor follows this sequence:</p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Assessment</strong> — inspecting the full extent of mould growth,
                    locating the underlying moisture source, and determining whether air or surface
                    sampling is warranted
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Containment</strong> — establishing physical barriers to prevent mould
                    spores spreading to unaffected areas during remediation
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Remediation</strong> — removing materials that cannot be cleaned,
                    treating salvageable surfaces, and managing air quality throughout
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Moisture source resolution</strong> — confirming the underlying moisture
                    problem is fixed so mould does not return
                  </li>
                  <li>
                    <strong>Clearance testing</strong> — post-remediation testing confirming mould
                    levels are within acceptable limits before containment is removed
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Mould After Floods and Cyclones',
            body: (
              <p>
                In warm, humid Australian conditions, mould can become established within 24 to 72
                hours of water exposure. Properties affected by cyclone inundation, flash flooding,
                or storm surge that were not dried promptly frequently develop mould in wall
                cavities, under flooring, and in ceiling voids before it appears on surfaces. A
                certified contractor conducts invasive assessment where needed — not just a surface
                inspection — to find and address concealed mould growth.
              </p>
            ),
          },
          {
            heading: 'Mould Insurance Claims',
            body: (
              <p>
                Mould insurance claims are among the most disputed property claims. Documentation
                from a certified contractor — assessment findings, scope of works, remediation
                records, and clearance test results — establishes that mould arose from an insured
                event and was professionally remediated. If your insurer disputes the extent of
                mould damage or the required scope, this documentation is the evidence base for an
                AFCA complaint.
              </p>
            ),
          },
          {
            heading: 'What to Ask a Contractor',
            body: (
              <>
                <p>Before a mould remediation contractor starts work, ask:</p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', listStyleType: 'disc' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Can you show me your current IICRC certification number?
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Will you identify and address the underlying moisture source?
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Will you set up containment before starting remediation?
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Will you conduct or arrange clearance testing on completion?
                  </li>
                  <li>What documentation will you provide for my insurer?</li>
                </ul>
              </>
            ),
          },
        ]}
      />
    </>
  );
}
