/**
 * Mould Remediation — What to Expect from a Certified Contractor
 *
 * BUILD-002 / GAP-043: References ANSI/IICRC S520:2025 as the certification
 * benchmark held by our contractors. Describes our certified process —
 * not the standard's content.
 *
 * IICRC compliance: names the standard, states contractors follow it,
 * describes what a certified job involves in contractor process terms.
 * Does NOT reproduce the standard's framework, classification system,
 * or remediation protocol content.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import type { Metadata } from 'next'
import { Wind } from 'lucide-react'
import { AgGuidePageTemplate } from '@/components/antigravity'
import { NAP } from '@/lib/constants'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Mould Remediation — What to Expect | Disaster Recovery Australia',
  description:
    'What professional mould remediation involves. How ANSI/IICRC S520:2025-certified contractors assess, contain, remediate, and document mould-affected properties — and what your insurance claim needs.',
  keywords: [
    'mould remediation',
    'IICRC certified mould remediation',
    'mould removal Australia',
    'mould remediation process',
    'mould insurance claim',
    'certified mould contractor',
    'secondary mould damage',
  ],
  alternates: {
    canonical: `${NAP.url}/guides/mould/iicrc-s520-mould-remediation-standard`,
  },
  openGraph: {
    title: 'Mould Remediation — What to Expect',
    description:
      'Professional mould remediation: what ANSI/IICRC S520:2025-certified contractors do, what documentation your insurance claim needs, and what to check when reviewing completed work.',
    url: `${NAP.url}/guides/mould/iicrc-s520-mould-remediation-standard`,
    type: 'website',
  },
}

export default function MouldRemediationWhatToExpectPage() {
  return (
    <AgGuidePageTemplate
      category="Mould Remediation"
      title="Mould Remediation — What to Expect"
      subtitle="What professional mould remediation involves, what your certified contractor should document, and what questions to ask if remediation was not completed properly."
      gradient="linear-gradient(135deg, #064E3B 0%, #065F46 100%)"
      icon={<Wind className="h-10 w-10" />}
      lastReviewed="2026-04-08"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Mould Remediation', href: '/guides/mould' },
        { label: 'Mould Remediation — What to Expect' },
      ]}
      cta={{ text: 'Find a Certified Contractor', href: '/claim' }}
      sections={[
        {
          heading: 'The Professional Standard: ANSI/IICRC S520:2025',
          body: (
            <>
              <p>
                Professional mould remediation in Australia is performed to <strong>ANSI/IICRC S520:2025</strong> — the current edition of the Standard for Professional Mould Remediation, published by the Institute of Inspection, Cleaning and Restoration Certification (IICRC). This is the professional benchmark referenced by insurers, loss adjusters, and the Australian Financial Complaints Authority (AFCA) when assessing whether mould remediation was completed appropriately.
              </p>
              <p style={{ marginTop: '1rem' }}>
                All contractors in the NRPG network hold current IICRC Applied Microbial Remediation Technician (AMRT) certification. For the full ANSI/IICRC S520:2025 standard, visit{' '}
                <a href="https://iicrc.org/s520/" target="_blank" rel="noopener noreferrer">
                  iicrc.org
                </a>.
              </p>
            </>
          ),
        },
        {
          heading: 'Why Certification Matters for Mould Remediation',
          background: 'light',
          body: (
            <>
              <p>
                Mould growth following water damage or flooding is not a surface problem. Mould grows into porous building materials — drywall, insulation, timber framing, and subfloor — and cannot be removed by surface cleaning alone. Disturbing mould growth without proper containment releases airborne spores throughout the property, spreading contamination to previously clean areas.
              </p>
              <p style={{ marginTop: '1rem' }}>
                An ANSI/IICRC S520:2025-certified contractor is trained to:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>Assess the full extent of mould growth — including inside wall cavities, subfloor spaces, and ceiling insulation not visible during inspection</li>
                <li>Identify and control the moisture source before remediation begins — to prevent re-growth after the job is complete</li>
                <li>Establish physical containment to prevent cross-contamination of clean areas during remediation work</li>
                <li>Remove affected porous materials correctly within containment, rather than attempting surface-only cleaning that leaves mould in the substrate</li>
                <li>Conduct independent clearance testing after remediation to verify the property has returned to normal air quality before containment is removed</li>
                <li>Document all findings, work completed, and clearance results for your insurance claim</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                A general cleaner or handyman does not have this specialist training. Improper mould disturbance — dry brushing, blowing, or cleaning without containment — is a common cause of wider contamination in properties where mould was discovered after water damage.
              </p>
            </>
          ),
        },
        {
          heading: 'What Your Contractor Should Document',
          body: (
            <>
              <p>
                An ANSI/IICRC S520:2025-certified job produces documentation that supports your insurance claim. If a contractor cannot provide these records, the job may not have been performed to standard:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li><strong>Pre-remediation assessment report</strong> — Written scope documenting all affected areas and materials, the moisture source identified, and the remediation approach for each material type.</li>
                <li><strong>Containment and negative pressure records</strong> — Confirmation that physical containment was established before remediation work began, isolating affected areas from clean spaces.</li>
                <li><strong>Materials removal documentation</strong> — Records of affected porous materials removed (drywall, insulation, carpet) within the containment zone.</li>
                <li><strong>Clearance testing report</strong> — Independent air and surface sampling results taken after remediation, confirming the property has returned to normal air quality. This is the close-out document required before re-occupancy.</li>
                <li><strong>Photographic evidence</strong> — Before and after photographs of all affected areas.</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Clearance testing results are what AFCA references when a policyholder disputes whether mould remediation was completed. A job without a clearance report is not complete under ANSI/IICRC S520:2025.
              </p>
            </>
          ),
        },
        {
          heading: 'Secondary Mould: When Inadequate Drying Causes a New Claim',
          background: 'light',
          body: (
            <>
              <p>
                Mould growth can begin on wet building materials within 24–72 hours under the right conditions. Properties that experienced flooding or water damage where structural drying was not completed to the ANSI/IICRC S500:2025 standard are at ongoing risk of secondary mould damage — often appearing weeks after the original claim was closed.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Signs that secondary mould damage may have resulted from inadequate original drying:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>Musty odour appearing weeks after drying equipment was removed</li>
                <li>Visible mould on walls, skirting boards, or flooring near the original water-affected area</li>
                <li>Soft or damp areas in walls or ceilings adjacent to the original incident</li>
                <li>No daily moisture reading records from the original drying contractor</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Secondary mould damage caused by an insurer&apos;s contractor failing to dry adequately is a covered loss under most policies — the insurer is responsible for the quality of work performed by their preferred contractors. An independent ANSI/IICRC S520:2025 assessment documents whether the mould growth is attributable to the original incident and what remediation is required.
              </p>
            </>
          ),
        },
        {
          heading: 'If Your Insurer\'s Remediation Falls Short',
          body: (
            <>
              <p>
                Mould remediation disputes most commonly arise when insurer-assigned contractors perform surface cleaning only — without containment, without removing affected structural materials, and without clearance testing. If you have concerns about the work performed:
              </p>
              <ol style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2.2 }}>
                <li><strong>Request all documentation</strong> — Ask for the pre-remediation scope of works, containment records, materials removal documentation, and clearance testing report before accepting the claim closure.</li>
                <li><strong>Get an independent ANSI/IICRC S520:2025 assessment</strong> — An independent certified contractor can document current mould conditions and whether the original remediation was completed to standard.</li>
                <li><strong>Lodge an internal dispute with your insurer</strong> — Attach the independent assessment and request a formal review. All Australian insurers must have an internal dispute resolution (IDR) process.</li>
                <li><strong>Escalate to AFCA</strong> — If the insurer does not resolve the dispute within 30 days, AFCA accepts complaints at no cost and can require insurers to pay for remediation of inadequate managed repairs.</li>
              </ol>
              <div style={{ marginTop: '1.5rem' }}>
                <Link
                  href="/claim"
                  style={{
                    display: 'inline-block',
                    padding: '0.875rem 2rem',
                    background: '#065F46',
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
          question: 'What is ANSI/IICRC S520:2025?',
          answer:
            'ANSI/IICRC S520:2025 is the current Standard for Professional Mould Remediation, published by the IICRC. It is the professional benchmark certification standard for mould remediation contractors in Australia. For the full standard, visit iicrc.org.',
        },
        {
          question: 'How do I know if my mould was remediated properly?',
          answer:
            'A properly completed ANSI/IICRC S520:2025 job produces a clearance testing report — independent air and surface sampling taken after remediation confirming the property has returned to normal air quality. If the contractor cannot provide a clearance report, the job documentation standard was not met. An independent assessment can determine current mould conditions.',
        },
        {
          question: 'Why is mould appearing after my water damage claim was closed?',
          answer:
            'Mould appearing after a closed claim typically indicates structural materials were not dried to the required standard before the claim was closed. This is secondary damage — the insurer is responsible for the quality of work performed by their preferred contractors. An independent ANSI/IICRC S520:2025 assessment documents the connection between the original incident and the mould growth.',
        },
        {
          question: 'Does insurance cover mould remediation?',
          answer:
            'Coverage depends on the cause. Mould resulting from a sudden and accidental covered event — a burst pipe, storm flooding, or roof damage — is typically covered. Mould from gradual leaks or maintenance failures is typically excluded. Secondary mould damage caused by an insurer\'s contractor failing to dry adequately may be covered under the insurer\'s obligation for quality of managed repairs.',
        },
        {
          question: 'Can I clean mould myself with bleach?',
          answer:
            'Surface bleach cleaning is not professional mould remediation and does not meet ANSI/IICRC S520:2025 requirements. It addresses visible surface mould only and does not remove mould growing into porous materials. Dry brushing or cleaning without containment spreads spores to clean areas. If mould has developed following a water damage or flood event, an independent certified assessment is required to document the extent for an insurance claim.',
        },
      ]}
      relatedGuides={[
        { title: 'Mould Remediation Services', href: '/services/mould-remediation' },
        { title: 'Water Damage Restoration — What to Expect', href: '/guides/water-damage/iicrc-s500-water-damage-restoration-standard' },
        { title: 'Queensland Floods 2025 — Event Page', href: '/events/queensland-floods-2025' },
        { title: 'Your Advocate vs Your Insurer\'s Builder', href: '/guides/insurance/human-advocate-vs-insurer-assigned-builder' },
        { title: 'Why Hire an IICRC-Certified Professional', href: '/guides/certifications/why-hire-iicrc-certified' },
      ]}
    />
  )
}
