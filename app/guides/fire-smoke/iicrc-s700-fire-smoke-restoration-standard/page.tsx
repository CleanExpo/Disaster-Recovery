/**
 * Fire & Smoke Restoration — What to Expect from a Certified Contractor
 *
 * BUILD-002: Fire/smoke content referencing IICRC S700:2025 as the
 * certification benchmark held by our contractors. This page describes
 * what a certified restoration job involves, not the standard's content.
 *
 * IICRC compliance: references ANSI/IICRC S700:2025 by name as the
 * professional standard our contractors hold certification to.
 * Does NOT reproduce standards text or describe the standard's framework.
 * Per IICRC acceptable use: contractors may state they follow the standard
 * and describe their own process.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import type { Metadata } from 'next';
import Script from 'next/script';
import { Flame } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Fire & Smoke Damage Restoration — What to Expect | Disaster Recovery',
  description:
    'What professional fire and smoke damage restoration involves. How ANSI/IICRC S700:2025-certified contractors assess, decontaminate, and document fire-damaged properties — and what this means for your insurance claim.',
  keywords: [
    'fire damage restoration',
    'smoke damage restoration',
    'IICRC certified fire restoration',
    'fire restoration process Australia',
    'smoke decontamination',
    'fire damage insurance claim',
    'certified fire restoration contractor',
  ],
  alternates: {
    canonical: `${NAP.url}/guides/fire-smoke/iicrc-s700-fire-smoke-restoration-standard`,
  },
  openGraph: {
    title: 'Fire & Smoke Damage Restoration — What to Expect',
    description:
      'Professional fire and smoke damage restoration: what ANSI/IICRC S700:2025-certified contractors do, what documentation your insurance claim needs, and what to check when reviewing completed work.',
    url: `${NAP.url}/guides/fire-smoke/iicrc-s700-fire-smoke-restoration-standard`,
    type: 'website',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is ANSI/IICRC S700:2025?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ANSI/IICRC S700:2025 is the current Standard for Professional Fire and Smoke Damage Restoration, published by the IICRC. It is the benchmark certification standard for fire and smoke restoration contractors in Australia. For the full standard, visit iicrc.org.',
      },
    },
    {
      '@type': 'Question',
      name: 'Why does it matter whether my contractor is IICRC-certified for fire restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'ANSI/IICRC S700:2025 defines the professional standard for fire and smoke restoration \u2014 including how to assess smoke infiltration beyond the burn area, how to clean different types of fire residue, and what documentation your insurance claim requires. A contractor without this certification may not have the specialist training to identify or treat all affected areas correctly.',
      },
    },
    {
      '@type': 'Question',
      name: 'What should I do if smoke odour returns after restoration?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Returning smoke odour typically indicates incomplete decontamination \u2014 untreated HVAC systems, wall cavities, or structural framing that was not sealed. Contact your insurer to raise a formal complaint. If the insurer does not resolve it within 30 days, you can escalate to AFCA. An independent ANSI/IICRC S700:2025 assessment documents whether the original work was completed to standard.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover smoke damage in rooms not directly burned?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Smoke travels through HVAC systems, wall cavities, and roof spaces \u2014 contaminating rooms far from the fire origin. This is a covered loss under most building policies. An ANSI/IICRC S700:2025-certified assessment documents smoke infiltration across the whole property, not just the burned area, which supports your claim for the full scope of damage.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I get an independent fire restoration assessment if I\u2019m not happy with my insurer\u2019s work?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. An independent ANSI/IICRC S700:2025-certified contractor can assess whether your property was restored to the current professional standard. This independent documentation is the primary evidence in AFCA disputes and insurer internal reviews. Start your request through our claim form.',
      },
    },
  ],
};

export default function FireSmokeRestorationWhatToExpectPage() {
  return (
    <>
      <Script
        id="s700-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Fire & Smoke"
        title="Fire & Smoke Damage Restoration — What to Expect"
        subtitle="What professional fire and smoke restoration involves, what your certified contractor should document, and what questions to ask if restoration work falls short."
        gradient="linear-gradient(135deg, #2D0A0A 0%, #741A1A 100%)"
        icon={<Flame className="h-10 w-10" />}
        lastReviewed="2026-04-08"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Fire & Smoke', href: '/guides/fire-smoke' },
          { label: 'Fire & Smoke Restoration — What to Expect' },
        ]}
        cta={{ text: 'Find a Certified Contractor', href: '/claim' }}
        sections={[
          {
            heading: 'The Professional Standard: ANSI/IICRC S700:2025',
            body: (
              <>
                <p>
                  Fire and smoke damage restoration in Australia is performed to{' '}
                  <strong>ANSI/IICRC S700:2025</strong> — the current edition of the Standard for
                  Professional Fire and Smoke Damage Restoration, published by the Institute of
                  Inspection, Cleaning and Restoration Certification (IICRC). This is the
                  professional benchmark referenced by insurers, loss adjusters, and the Australian
                  Financial Complaints Authority (AFCA) when assessing whether restoration work was
                  completed appropriately.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  All contractors in the NRPG network hold current IICRC certification relevant to
                  fire and smoke restoration. For the full ANSI/IICRC S700:2025 standard, visit{' '}
                  <a href="https://iicrc.org/s700/" target="_blank" rel="noopener noreferrer">
                    iicrc.org
                  </a>
                  .
                </p>
              </>
            ),
          },
          {
            heading: 'Why Professional Certification Matters After a Fire',
            background: 'light',
            body: (
              <>
                <p>
                  Fire damage extends well beyond the burned area. Smoke travels through HVAC
                  systems, wall cavities, and roof spaces — depositing acidic residues that corrode
                  metals, discolour surfaces, and persist as odour in areas far from the fire
                  origin. Different types of fire residue (from low-heat smouldering versus
                  fast-burning materials) require different cleaning agents and techniques.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  An ANSI/IICRC S700:2025-certified contractor is trained to:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    Assess all affected areas — not just the visible fire damage — including HVAC
                    systems and connected rooms
                  </li>
                  <li>
                    Identify the type of fire residue present and apply the correct cleaning method
                    for each surface and material
                  </li>
                  <li>
                    Apply appropriate odour neutralisation treatments rather than masking agents
                  </li>
                  <li>
                    Document all damage and remediation work to the standard required by insurers
                  </li>
                  <li>Confirm completion to a professional standard before the job is closed</li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  A general cleaner or builder does not have this specialist training. Applying the
                  wrong cleaning method to fire residue can permanently set stains or spread
                  contamination to previously unaffected areas.
                </p>
              </>
            ),
          },
          {
            heading: 'What Your Contractor Should Document',
            body: (
              <>
                <p>
                  An ANSI/IICRC S700:2025-certified job produces documentation that supports your
                  insurance claim. If a contractor cannot provide these records, the job may not
                  have been performed to the required standard:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Written scope of works</strong> — All affected areas and materials
                    documented before work begins, including rooms affected by smoke infiltration
                    beyond the fire origin
                  </li>
                  <li>
                    <strong>Photographic evidence</strong> — Before and after photographs of all
                    affected areas
                  </li>
                  <li>
                    <strong>HVAC assessment</strong> — Documentation that heating, ventilation, and
                    air conditioning systems were inspected and cleaned where affected
                  </li>
                  <li>
                    <strong>Odour treatment records</strong> — What treatment was applied, where,
                    and when
                  </li>
                  <li>
                    <strong>Completion report</strong> — Signed confirmation that work was completed
                    to the ANSI/IICRC S700:2025 standard
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  This documentation is what AFCA and courts reference when a policyholder disputes
                  whether restoration was complete. Independent documentation produced before an
                  insurer closes the claim is your most important protection.
                </p>
              </>
            ),
          },
          {
            heading: "If Your Insurer's Contractor's Work Falls Short",
            background: 'light',
            body: (
              <>
                <p>Fire and smoke restoration disputes commonly arise when:</p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    Smoke odour returns weeks or months after restoration — indicating incomplete
                    decontamination or HVAC cleaning
                  </li>
                  <li>
                    Rooms connected to the fire area were not assessed or treated despite smoke
                    infiltration
                  </li>
                  <li>The insurer closes the claim before all affected areas are restored</li>
                  <li>
                    Contents (furniture, clothing, electronics) were not assessed for smoke damage
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If the completed work does not meet the ANSI/IICRC S700:2025 standard, you have
                  the right to raise a formal complaint with your insurer through their internal
                  dispute resolution (IDR) process. If unresolved within 30 days, the dispute can be
                  escalated to AFCA at no cost.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  An independent assessment by a separate ANSI/IICRC S700:2025-certified contractor
                  documents whether the work was completed to standard — and is the primary evidence
                  in any AFCA dispute.
                </p>
                <div style={{ marginTop: '1.5rem' }}>
                  <Link
                    href="/claim"
                    style={{
                      display: 'inline-block',
                      padding: '0.875rem 2rem',
                      background: '#B91C1C',
                      color: 'white',
                      borderRadius: '0.5rem',
                      textDecoration: 'none',
                      fontWeight: 600,
                    }}
                  >
                    Get an Independent Assessment
                  </Link>
                </div>
              </>
            ),
          },
          {
            heading: 'Victoria Bushfires: Smoke Infiltration in Properties Not Directly Burned',
            body: (
              <>
                <p>
                  The 2025–2026 Victoria bushfire season (ICA Insurance Catastrophe, 3,123 claims
                  across 18 LGAs) included significant smoke infiltration into properties that were
                  not directly in the fire path. Bushfire smoke travels further and penetrates more
                  deeply into building structures than many homeowners expect.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  If your property in a Victoria bushfire-affected LGA shows smoke odour, ash
                  deposits, or HVAC contamination — even without direct fire contact — this may be a
                  covered loss under your policy. An ANSI/IICRC S700:2025 assessment documents
                  whether smoke infiltration occurred and what remediation is required.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What is ANSI/IICRC S700:2025?',
            answer:
              'ANSI/IICRC S700:2025 is the current Standard for Professional Fire and Smoke Damage Restoration, published by the IICRC. It is the benchmark certification standard for fire and smoke restoration contractors in Australia. For the full standard, visit iicrc.org.',
          },
          {
            question:
              'Why does it matter whether my contractor is IICRC-certified for fire restoration?',
            answer:
              'ANSI/IICRC S700:2025 defines the professional standard for fire and smoke restoration — including how to assess smoke infiltration beyond the burn area, how to clean different types of fire residue, and what documentation your insurance claim requires. A contractor without this certification may not have the specialist training to identify or treat all affected areas correctly.',
          },
          {
            question: 'What should I do if smoke odour returns after restoration?',
            answer:
              'Returning smoke odour typically indicates incomplete decontamination — untreated HVAC systems, wall cavities, or structural framing that was not sealed. Contact your insurer to raise a formal complaint. If the insurer does not resolve it within 30 days, you can escalate to AFCA. An independent ANSI/IICRC S700:2025 assessment documents whether the original work was completed to standard.',
          },
          {
            question: 'Does insurance cover smoke damage in rooms not directly burned?',
            answer:
              'Smoke travels through HVAC systems, wall cavities, and roof spaces — contaminating rooms far from the fire origin. This is a covered loss under most building policies. An ANSI/IICRC S700:2025-certified assessment documents smoke infiltration across the whole property, not just the burned area, which supports your claim for the full scope of damage.',
          },
          {
            question:
              "Can I get an independent fire restoration assessment if I'm not happy with my insurer's work?",
            answer:
              'Yes. An independent ANSI/IICRC S700:2025-certified contractor can assess whether your property was restored to the current professional standard. This independent documentation is the primary evidence in AFCA disputes and insurer internal reviews. Start your request through our claim form.',
          },
        ]}
        relatedGuides={[
          { title: 'Fire Damage Restoration Services', href: '/services/fire-damage-restoration' },
          {
            title: 'Victoria Bushfires 2025 — Event Page',
            href: '/events/victoria-bushfires-2025',
          },
          {
            title: 'Victoria Bushfires 2026 — Event Page',
            href: '/events/victoria-bushfires-2026',
          },
          {
            title: "Your Advocate vs Your Insurer's Builder",
            href: '/guides/insurance/human-advocate-vs-insurer-assigned-builder',
          },
          {
            title: 'Why Hire an IICRC-Certified Professional',
            href: '/guides/certifications/why-hire-iicrc-certified',
          },
        ]}
      />
    </>
  );
}
