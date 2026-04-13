/**
 * Water Damage Restoration — What to Expect from a Certified Contractor
 *
 * BUILD-002 / GAP-004 / DR-556: References ANSI/IICRC S500:2025 as the certification
 * benchmark held by our contractors. Describes our certified process —
 * not the standard's content.
 *
 * DR-556: Added S500 Consensus Body 2026 Position Statement section on
 * Category of Water Damage / Weather-Related Events — directly relevant
 * to Australian cyclone/flood policyholders.
 *
 * IICRC compliance: names the standard, states contractors follow it,
 * describes what a certified job involves in contractor process terms.
 * Does NOT reproduce the standard's framework or content.
 *
 * ACL s29(1)(g)/(m) compliant — no unverified superlatives.
 */

import type { Metadata } from 'next'
import Script from 'next/script'
import { Droplets } from 'lucide-react'
import { AgGuidePageTemplate } from '@/components/antigravity'
import { NAP } from '@/lib/constants'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ANSI/IICRC S500 Water Damage Restoration — What Certified Contractors Do | Disaster Recovery Australia',
  description:
    'ANSI/IICRC S500:2025 is the professional benchmark for water damage restoration in Australia. S500 Consensus Body 2026 Position Statement on weather-related flood events. How certified contractors assess, dry, and document water-damaged properties.',
  keywords: [
    'water damage restoration',
    'IICRC S500',
    'ANSI IICRC S500',
    'IICRC certified water damage',
    'water damage restoration process',
    'flood restoration Australia',
    'structural drying',
    'water damage insurance claim',
    'certified water damage contractor',
  ],
  alternates: {
    canonical: `${NAP.url}/guides/water-damage/iicrc-s500-water-damage-restoration-standard`,
  },
  openGraph: {
    title: 'Water Damage Restoration — What to Expect',
    description:
      'Professional water damage restoration: what ANSI/IICRC S500:2025-certified contractors do, what documentation your insurance claim needs, and what to check when reviewing completed work.',
    url: `${NAP.url}/guides/water-damage/iicrc-s500-water-damage-restoration-standard`,
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What is ANSI/IICRC S500:2025?',
      acceptedAnswer: { '@type': 'Answer', text: 'ANSI/IICRC S500:2025 is the current Standard for Professional Water Damage Restoration, published by the IICRC. It is the professional benchmark certification standard for water damage restoration contractors in Australia. For the full standard, visit iicrc.org.' },
    },
    {
      '@type': 'Question',
      name: 'How do I know if my water damage was dried properly?',
      acceptedAnswer: { '@type': 'Answer', text: 'A properly completed ANSI/IICRC S500:2025 job produces daily moisture reading records showing drying progress and a final report confirming materials reached drying goals. If the contractor cannot provide these documents, the documentation standard was not met. An independent moisture assessment can determine current moisture levels in affected materials.' },
    },
    {
      '@type': 'Question',
      name: 'Why is mould appearing after my water damage claim was closed?',
      acceptedAnswer: { '@type': 'Answer', text: 'Mould after a closed claim typically indicates structural materials were not dried to the required standard before the claim was closed. This is secondary damage \u2014 the insurer is responsible for the quality of work performed by their preferred contractors. An independent ANSI/IICRC S500:2025 assessment documents the connection between the original incident and the mould growth.' },
    },
    {
      '@type': 'Question',
      name: 'Does insurance cover sewage or floodwater damage?',
      acceptedAnswer: { '@type': 'Answer', text: 'Coverage depends on your specific policy. Sewage backup and flooding from external water sources may require specific endorsements on your policy. An IICRC-certified assessment documents the source and extent of the damage, which is the required evidence for any insurance claim regardless of coverage type.' },
    },
    {
      '@type': 'Question',
      name: 'How long should water damage restoration take?',
      acceptedAnswer: { '@type': 'Answer', text: "Professional structural drying under ANSI/IICRC S500:2025 protocols typically takes 3\u20135 days for smaller jobs. Jobs with saturated insulation, concrete slabs, or hardwood floors may take 7\u201314 days or longer. The timeline should be driven by daily moisture readings showing when materials reach drying goals \u2014 not by a fixed number of equipment-days." },
    },
  ],
};

export default function WaterDamageRestorationWhatToExpectPage() {
  return (
    <>
      <Script id="s500-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
      category="Water Damage"
      title="Water Damage Restoration — What to Expect"
      subtitle="What professional water damage restoration involves, what your certified contractor should document, and what questions to ask if drying was not completed properly."
      gradient="linear-gradient(135deg, #0F2942 0%, #1A4674 100%)"
      icon={<Droplets className="h-10 w-10" />}
      lastReviewed="2026-04-08"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Water Damage', href: '/guides/water-damage' },
        { label: 'Water Damage Restoration — What to Expect' },
      ]}
      cta={{ text: 'Find a Certified Contractor', href: '/claim' }}
      sections={[
        {
          heading: 'The Professional Standard: ANSI/IICRC S500:2025',
          body: (
            <>
              <p>
                Water damage restoration in Australia is performed to <strong>ANSI/IICRC S500:2025</strong> — the current edition of the Standard for Professional Water Damage Restoration, published by the Institute of Inspection, Cleaning and Restoration Certification (IICRC). This is the professional benchmark referenced by insurers, loss adjusters, and the Australian Financial Complaints Authority (AFCA) when assessing whether restoration work was completed appropriately.
              </p>
              <p style={{ marginTop: '1rem' }}>
                All contractors in the NRPG network hold current IICRC Water Damage Restoration Technician (WRT) certification. For the full ANSI/IICRC S500:2025 standard, visit{' '}
                <a href="https://iicrc.org/s500/" target="_blank" rel="noopener noreferrer">
                  iicrc.org
                </a>.
              </p>
            </>
          ),
        },
        {
          heading: 'Why Certification Matters for Water Damage',
          background: 'light',
          body: (
            <>
              <p>
                Water damage creates hidden moisture in wall cavities, subfloor spaces, insulation, and building materials that are not visible to the eye. Inadequate drying — or drying that stops too soon — leaves residual moisture that causes secondary damage: mould growth, structural timber deterioration, and persistent musty odour, often appearing weeks after the initial incident.
              </p>
              <p style={{ marginTop: '1rem' }}>
                An ANSI/IICRC S500:2025-certified contractor is trained to:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>Assess the source and extent of water intrusion using moisture meters and thermal imaging</li>
                <li>Determine whether water contamination requires additional decontamination steps beyond drying</li>
                <li>Calculate and place drying equipment based on the affected area and material types</li>
                <li>Monitor moisture readings daily until structural materials reach drying goals</li>
                <li>Document all findings and drying progress for your insurance claim</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                A general builder or cleaner does not have this specialist drying expertise. Equipment placed without moisture assessment can dry surfaces while leaving structural materials wet — with secondary mould damage appearing later.
              </p>
            </>
          ),
        },
        {
          heading: 'What Your Contractor Should Document',
          body: (
            <>
              <p>
                An ANSI/IICRC S500:2025-certified job produces documentation that supports your insurance claim. If a contractor cannot provide these records, the job may not have been performed to standard:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li><strong>Pre-drying moisture readings</strong> — Baseline measurements of all affected materials before drying begins. Required to demonstrate the starting condition and track progress.</li>
                <li><strong>Written scope of works</strong> — All affected areas and materials, the equipment applied, and the drying method used for each material type.</li>
                <li><strong>Daily moisture monitoring records</strong> — Readings taken each day showing drying progress toward the structural materials&apos; target moisture content.</li>
                <li><strong>Final drying documentation</strong> — Confirmation that all affected materials have reached drying goals. This is the close-out document your insurer requires.</li>
                <li><strong>Photographic evidence</strong> — Before and after photographs of all affected areas.</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                This documentation is what AFCA references when a policyholder disputes whether drying was completed. If your insurer&apos;s contractor did not provide moisture readings or daily drying records, the job documentation is incomplete.
              </p>
            </>
          ),
        },
        {
          heading: 'Secondary Mould: The Hidden Risk of Inadequate Drying',
          background: 'light',
          body: (
            <>
              <p>
                Mould growth can begin on wet building materials within 24–72 hours under the right conditions. Properties that were flooded in Queensland and NSW 2025–2026 ICA Significant Events are at ongoing risk of secondary mould damage where structural drying was not completed to standard.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Signs that structural drying may have been incomplete:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>Musty odour returning weeks after drying equipment was removed</li>
                <li>Visible mould on walls, skirting boards, or flooring near the affected area</li>
                <li>Damp or soft areas in walls near the original water incident</li>
                <li>No daily moisture reading records from the original drying contractor</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Secondary mould damage caused by an insurer&apos;s contractor failing to dry adequately is a covered loss under most policies — the insurer is responsible for the quality of work performed by their preferred contractors. An independent ANSI/IICRC S500:2025 assessment documents whether original drying was completed to standard and what secondary damage has resulted.
              </p>
            </>
          ),
        },
        {
          heading: 'S500 Consensus Body 2026 — Weather-Related Events Position Statement',
          body: (
            <>
              <p>
                In 2026, the IICRC S500 Consensus Body published a Position Statement on the
                Category of Water Damage classification for weather-related events — including
                storm surge, cyclone flooding, and rainfall-driven inundation. This is relevant
                to Australian policyholders because the category of water determines the scope
                of remediation required.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The Consensus Body position clarifies how weather-sourced water — including
                floodwater, storm surge, and cyclone-driven inundation — is classified under
                the S500 framework. Contractors not working to the 2025 edition may be applying
                outdated categorisation that does not reflect the current standard position,
                which can affect the scope of works and the appropriateness of any restoration
                approach.
              </p>
              <p style={{ marginTop: '1rem' }}>
                For Australian homeowners affected by cyclone or flood events — including
                Ex-TC Alfred, TC Maila, and the 2026 Queensland and NSW flood events — this
                matters because insurer-appointed contractors may be categorising the water
                source differently to what the current S500 Consensus Body position requires.
                An independent ANSI/IICRC S500:2025 assessment applies the current standard
                and documents the water category as the basis for the restoration scope.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Source: IICRC S500 Consensus Body 2026 Position Statement — available at{' '}
                <a
                  href="https://iicrc.org/s500/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{ color: '#1D4ED8', textDecoration: 'underline' }}
                >
                  iicrc.org/s500
                </a>
                .
              </p>
            </>
          ),
        },
        {
          heading: 'If Your Insurer\'s Restoration Falls Short',
          body: (
            <>
              <p>
                Water damage restoration disputes most commonly arise from incomplete drying — where surface materials appear dry but structural components remain wet. If you have concerns about the drying work performed by your insurer&apos;s contractor:
              </p>
              <ol style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2.2 }}>
                <li><strong>Request all moisture reading records and the drying report</strong> from the original contractor before accepting the claim closure.</li>
                <li><strong>Get an independent ANSI/IICRC S500:2025 assessment</strong> that documents current moisture levels and any secondary damage.</li>
                <li><strong>Lodge an internal dispute with your insurer</strong> if you believe drying was incomplete. Attach the independent assessment.</li>
                <li><strong>Escalate to AFCA</strong> if the insurer does not resolve the dispute within 30 days. AFCA accepts complaints at no cost and can require insurers to pay for remediation of inadequate managed repairs.</li>
              </ol>
              <div style={{ marginTop: '1.5rem' }}>
                <Link
                  href="/claim"
                  style={{
                    display: 'inline-block',
                    padding: '0.875rem 2rem',
                    background: '#1D4ED8',
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
      ]}
      faqs={[
        {
          question: 'What is ANSI/IICRC S500:2025?',
          answer:
            'ANSI/IICRC S500:2025 is the current Standard for Professional Water Damage Restoration, published by the IICRC. It is the professional benchmark certification standard for water damage restoration contractors in Australia. For the full standard, visit iicrc.org.',
        },
        {
          question: 'How do I know if my water damage was dried properly?',
          answer:
            'A properly completed ANSI/IICRC S500:2025 job produces daily moisture reading records showing drying progress and a final report confirming materials reached drying goals. If the contractor cannot provide these documents, the documentation standard was not met. An independent moisture assessment can determine current moisture levels in affected materials.',
        },
        {
          question: 'Why is mould appearing after my water damage claim was closed?',
          answer:
            'Mould after a closed claim typically indicates structural materials were not dried to the required standard before the claim was closed. This is secondary damage — the insurer is responsible for the quality of work performed by their preferred contractors. An independent ANSI/IICRC S500:2025 assessment documents the connection between the original incident and the mould growth.',
        },
        {
          question: 'Does insurance cover sewage or floodwater damage?',
          answer:
            'Coverage depends on your specific policy. Sewage backup and flooding from external water sources may require specific endorsements on your policy. An IICRC-certified assessment documents the source and extent of the damage, which is the required evidence for any insurance claim regardless of coverage type.',
        },
        {
          question: 'How long should water damage restoration take?',
          answer:
            'Professional structural drying under ANSI/IICRC S500:2025 protocols typically takes 3–5 days for smaller jobs. Jobs with saturated insulation, concrete slabs, or hardwood floors may take 7–14 days or longer. The timeline should be driven by daily moisture readings showing when materials reach drying goals — not by a fixed number of equipment-days.',
        },
      ]}
      relatedGuides={[
        { title: 'Water Damage Restoration Services', href: '/services/water-damage-restoration' },
        { title: 'Mould Remediation Services', href: '/services/mould-remediation' },
        { title: 'Queensland Floods 2025 — Event Page', href: '/events/queensland-floods-2025' },
        { title: 'Your Advocate vs Your Insurer\'s Builder', href: '/guides/insurance/human-advocate-vs-insurer-assigned-builder' },
        { title: 'Why Hire an IICRC-Certified Professional', href: '/guides/certifications/why-hire-iicrc-certified' },
      ]}
    />
    </>
  )
}
