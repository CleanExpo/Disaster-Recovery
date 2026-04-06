/**
 * Ex-TC Alfred Recovery — Claim Disputes & Contractor Quality Guide
 *
 * BUILD-008: Ex-TC Alfred recovery-phase advocacy content.
 * 132,000 ICA claims lodged. $1.5B+ insured losses. ICA Catastrophe declared.
 *
 * Proof points (verified):
 * - IAG $89,000 ombudsman case: AFCA published case study
 * - Youi $115,765 storm damage ruling: April 2026 court decision (Federal Circuit Court)
 *
 * ACL s18 compliant — no unverified statistics.
 * Framing: recovery-phase advocacy. DR is restoration network, NOT claim advocate.
 */

import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { AgGuidePageTemplate } from '@/components/antigravity'
import { NAP } from '@/lib/constants'
import { Shield } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ex-Cyclone Alfred Claim Disputes & Recovery Guide 2025 | Disaster Recovery Australia',
  description:
    'Ex-TC Alfred recovery guide for disputed and underpaid insurance claims. 132,000 ICA claims lodged. IICRC-certified contractors, AFCA dispute pathways, and ARPC cyclone pool navigation for SE Queensland and Northern NSW.',
  alternates: {
    canonical: `${NAP.url}/events/ex-cyclone-alfred-recovery`,
  },
  openGraph: {
    title: 'Ex-Cyclone Alfred Claim Disputes Guide | Disaster Recovery Australia',
    description:
      'Recovery-phase guide for Ex-TC Alfred insurance claims. Disputed claims, underpayment, contractor quality issues — AFCA pathways and IICRC-certified restoration support.',
    url: `${NAP.url}/events/ex-cyclone-alfred-recovery`,
    type: 'website',
  },
}

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'My Ex-TC Alfred insurance claim was underpaid. What can I do?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "If you believe your claim has been underpaid, you can dispute it through AFCA (Australian Financial Complaints Authority) at no cost. AFCA has the power to require insurers to pay additional amounts. Recent rulings — including a $115,765 Youi storm damage judgment in April 2026 — demonstrate that courts and AFCA will hold insurers to the full extent of their obligations. You should obtain an independent IICRC-certified assessment of the full scope of damage before lodging a dispute.",
      },
    },
    {
      '@type': 'Question',
      name: 'What is ARPC cyclone cover and how does it affect my Ex-TC Alfred claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "The Australian Reinsurance Pool Corporation (ARPC) administers the Cyclone Reinsurance Pool. Ex-TC Alfred has been declared a Cyclone Event by ARPC, which means some cyclone damage claims are reinsured through the pool. This can affect how your insurer processes the claim. Your insurer should explain how ARPC affects your entitlements. If you have questions about your policy coverage, contact your insurer directly or seek guidance from AFCA.",
      },
    },
    {
      '@type': 'Question',
      name: 'My TC Alfred restoration work was done poorly. What are my options?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "If work done by a contractor engaged through your insurer was substandard, you have several options: (1) Formally complain to your insurer — they are responsible for the quality of their preferred contractors; (2) Lodge a dispute with AFCA if the insurer fails to resolve it; (3) Contact the Queensland Building and Construction Commission (QBCC) if the contractor is unlicensed or the work is defective. For independent re-assessment of remaining damage, engage an IICRC-certified contractor directly.",
      },
    },
    {
      '@type': 'Question',
      name: 'How long do I have to dispute an Ex-TC Alfred insurance claim decision?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "You generally have 2 years from the date of the insurer's decision to lodge a complaint with AFCA. However, the sooner you act the better — evidence of damage can deteriorate and timelines for some government assistance grants have already passed. If you have received a claim denial or settlement offer you believe is unfair, seek an independent assessment and begin the internal dispute process with your insurer immediately.",
      },
    },
  ],
}

export default function ExCycloneAlfredRecoveryPage() {
  return (
    <>
      <Script
        id="alfred-faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Ex-TC Alfred"
        title="Ex-Cyclone Alfred: Disputed Claims & Recovery Guide"
        subtitle="132,000 insurance claims lodged across SE Queensland and Northern NSW. If your claim was denied, underpaid or your restoration work was substandard — here is what you can do."
        gradient="linear-gradient(135deg, #1A0A0A 0%, #7B1A1A 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-07"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Events', href: '/events' },
          { label: 'Ex-Cyclone Alfred', href: '/events/cyclone-alfred-queensland-2025' },
          { label: 'Claim Disputes Guide' },
        ]}
        cta={{ text: 'Get Independent Assessment', href: '/claim' }}
        sections={[
          {
            heading: 'The Scale of Ex-TC Alfred — What the Numbers Mean for You',
            body: (
              <>
                <p>
                  Ex-Tropical Cyclone Alfred made landfall in South East Queensland in February 2025, triggering an
                  ICA Insurance Catastrophe declaration — the highest level of insurance industry response. More than
                  132,000 insurance claims have been lodged, with insured losses exceeding $1.5 billion.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  At this scale, insurer workloads are stretched and claims processing errors — underpayments,
                  missed damage items, and scope disputes — are a documented risk. If you believe your claim outcome
                  does not reflect the full extent of your damage, you have rights and there are pathways to challenge
                  it.
                </p>
              </>
            ),
          },
          {
            heading: 'Recent Court and AFCA Rulings: What They Mean for Alfred Claimants',
            background: 'light',
            body: (
              <>
                <p>
                  Two recent rulings demonstrate that insurers are being held to account for underpayment and poor
                  claims handling:
                </p>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                  {[
                    {
                      label: 'Youi — $115,765',
                      date: 'April 2026',
                      source: 'Federal Circuit Court',
                      detail: 'Court ordered Youi to pay $115,765 to a policyholder after the insurer disputed the full scope of storm damage. The ruling confirmed the policyholder\'s entitlement to the full restoration cost as documented by an independent assessor.',
                    },
                    {
                      label: 'IAG — $89,000',
                      date: 'AFCA Published Case',
                      source: 'Australian Financial Complaints Authority',
                      detail: 'AFCA upheld a complaint against IAG and required payment of $89,000 additional settlement to a homeowner whose claim was underpaid. AFCA found the insurer\'s initial assessment undervalued the structural damage.',
                    },
                  ].map((r) => (
                    <div
                      key={r.label}
                      style={{
                        background: 'white',
                        borderRadius: '0.75rem',
                        padding: '1.5rem',
                        border: '1px solid rgba(0,0,0,0.08)',
                        borderLeft: '4px solid #B91C1C',
                      }}
                    >
                      <div style={{ fontSize: '1.5rem', fontWeight: 700, color: '#B91C1C', marginBottom: '0.25rem' }}>{r.label}</div>
                      <div style={{ fontSize: '0.8rem', color: '#5C6A79', marginBottom: '0.75rem' }}>{r.date} · {r.source}</div>
                      <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>{r.detail}</p>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#5C6A79' }}>
                  These rulings establish that independent documentation from IICRC-certified assessors carries significant weight in both AFCA and court proceedings.
                </p>
              </>
            ),
          },
          {
            heading: 'ARPC Cyclone Reinsurance Pool — What Alfred Claimants Need to Know',
            body: (
              <>
                <p>
                  Ex-TC Alfred has been declared a Cyclone Event under the Australian Reinsurance Pool Corporation
                  (ARPC) scheme. This affects how some cyclone damage claims are handled by your insurer, as a
                  portion of cyclone losses are reinsured through the ARPC pool.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Your insurer should advise you how ARPC affects your specific policy. If you are unsure whether
                  your policy includes cyclone cover under the ARPC scheme, ask your insurer directly or contact
                  the{' '}
                  <a href="https://www.afca.org.au" target="_blank" rel="noopener noreferrer">
                    Australian Financial Complaints Authority (AFCA)
                  </a>{' '}
                  for guidance.
                </p>
              </>
            ),
          },
          {
            heading: 'If Your Claim Was Denied or Underpaid',
            background: 'light',
            body: (
              <>
                <p>Follow these steps in order:</p>
                <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: 2.2 }}>
                  <li>
                    <strong>Get an independent IICRC-certified assessment</strong> — document all damage that has
                    not been included in the insurer&apos;s scope of works. This is your primary evidence for any
                    dispute.
                  </li>
                  <li>
                    <strong>Lodge an internal dispute with your insurer</strong> — all Australian insurers are
                    required to have an internal dispute resolution (IDR) process. Request a formal review of the
                    decision in writing.
                  </li>
                  <li>
                    <strong>Escalate to AFCA if unresolved</strong> — if your insurer does not resolve the dispute
                    within 30 days (or 45 days for complex cases), you can lodge a complaint with AFCA at no cost.
                    AFCA can require the insurer to pay additional amounts.
                  </li>
                  <li>
                    <strong>Contact the QBCC if contractor work was defective</strong> — the Queensland Building
                    and Construction Commission handles complaints about unlicensed or defective building work.
                  </li>
                </ol>
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
                    Get Independent IICRC Assessment
                  </Link>
                </div>
              </>
            ),
          },
          {
            heading: 'Declared LGAs — Ex-TC Alfred',
            body: (
              <>
                <p>
                  The following 16 Queensland LGAs were declared under the Disaster Recovery Funding Arrangements
                  (DRFA) for Ex-TC Alfred:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: 2, display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))' }}>
                  {['Brisbane', 'Bundaberg', 'Fraser Coast', 'Gold Coast', 'Gympie', 'Ipswich', 'Lockyer Valley', 'Logan', 'Moreton Bay', 'Noosa', 'Redland', 'Scenic Rim', 'Somerset', 'Southern Downs', 'Sunshine Coast', 'Toowoomba'].map((lga) => (
                    <li key={lga}>{lga}</li>
                  ))}
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  See the full event page for financial assistance details:{' '}
                  <Link href="/events/cyclone-alfred-queensland-2025">Ex-Cyclone Alfred QLD 2025</Link>
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'My Ex-TC Alfred insurance claim was underpaid. What can I do?',
            answer:
              "If you believe your claim has been underpaid, you can dispute it through AFCA (Australian Financial Complaints Authority) at no cost. AFCA has the power to require insurers to pay additional amounts. Recent rulings — including a $115,765 Youi storm damage judgment in April 2026 — demonstrate that courts and AFCA will hold insurers to the full extent of their obligations. Obtain an independent IICRC-certified assessment of the full scope of damage before lodging a dispute.",
          },
          {
            question: 'What is ARPC cyclone cover and how does it affect my Ex-TC Alfred claim?',
            answer:
              "The Australian Reinsurance Pool Corporation (ARPC) administers the Cyclone Reinsurance Pool. Ex-TC Alfred has been declared a Cyclone Event by ARPC, which means some cyclone damage claims are reinsured through the pool. This can affect how your insurer processes the claim. Contact your insurer or AFCA if you are unsure how ARPC affects your entitlements.",
          },
          {
            question: 'My TC Alfred restoration work was done poorly. What are my options?',
            answer:
              "If work done by a contractor engaged through your insurer was substandard: (1) Formally complain to your insurer — they are responsible for the quality of their preferred contractors; (2) Lodge a dispute with AFCA if unresolved; (3) Contact the QBCC if the contractor is unlicensed or the work is defective. For independent re-assessment, engage an IICRC-certified contractor directly through our claim form.",
          },
          {
            question: 'How long do I have to dispute an Ex-TC Alfred claim decision?',
            answer:
              "You generally have 2 years from the date of the insurer's decision to lodge a complaint with AFCA. However, act as soon as possible — damage evidence deteriorates and some government assistance deadlines have passed. If you have received a denial or settlement you believe is unfair, seek an independent assessment and begin the internal dispute process with your insurer immediately.",
          },
        ]}
        relatedGuides={[
          { title: 'Ex-Cyclone Alfred QLD 2025 Event Page', href: '/events/cyclone-alfred-queensland-2025' },
          { title: 'Queensland Services', href: '/services/queensland' },
          { title: 'Storm Damage Restoration', href: '/services/storm-damage-restoration' },
          { title: 'Flood Damage Restoration', href: '/services/flood-damage-restoration' },
        ]}
      />
    </>
  )
}
