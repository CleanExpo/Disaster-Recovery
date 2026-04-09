/**
 * Ex-TC Alfred Recovery — Claim Disputes & Contractor Quality Guide
 *
 * BUILD-008 / DR-401: Ex-TC Alfred recovery-phase advocacy content.
 * 132,000+ ICA claims lodged. AU$1.877B insured losses (PERILS FINAL — 13 Apr 2026). ICA Catastrophe declared.
 * Largest insured cyclone loss on as-if-today basis since Cyclone Debbie (March 2017).
 *
 * Proof points (verified):
 * - IAG $89,000 ombudsman case: AFCA published case study
 * - Youi $115,765 storm damage ruling: April 2026 court decision (Federal Circuit Court)
 * - PERILS AU$1.877B final loss: Personal lines 70%, Commercial 26%, Motor 4%
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
  title: 'Ex-Cyclone Alfred Claim Disputes & Recovery Guide 2026 | Disaster Recovery Australia',
  description:
    'Ex-TC Alfred recovery guide for disputed and underpaid insurance claims. 132,000 ICA claims lodged. AU$1.877B final insured losses (PERILS). IICRC-certified contractors, AFCA dispute pathways, and ARPC cyclone pool navigation for SE Queensland and Northern NSW.',
  alternates: {
    canonical: `${NAP.url}/events/ex-cyclone-alfred-recovery`,
  },
  openGraph: {
    title: 'Ex-Cyclone Alfred Claim Disputes Guide | Disaster Recovery Australia',
    description:
      'Recovery-phase guide for Ex-TC Alfred insurance claims. 132,000 claims lodged, AU$1.877B final insured losses (PERILS). Disputed claims, underpayment, contractor quality issues — AFCA pathways and IICRC-certified restoration support.',
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
      name: "My insurer said my claim is 'under review' — what does that mean?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "An 'under review' status is not a rejection, but it means your claim is sitting in limbo. If your claim has been under review for more than 6 weeks without a substantive update, NRPG can escalate directly with the insurer's senior claims team to force a decision.",
      },
    },
    {
      '@type': 'Question',
      name: "Can I switch to NRPG if I've already lodged with my insurer directly?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes — at any point in the process. NRPG steps in and takes over communication with your insurer. There is no need to re-lodge your claim. We pick up where you are and manage the claim from that point forward.",
      },
    },
    {
      '@type': 'Question',
      name: "What if I've been lowballed on my settlement?",
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Do not accept a settlement offer you believe is too low. NRPG reviews the offer, identifies scope gaps where damage items were missed or undervalued, and negotiates upward with the insurer. Independent IICRC-certified assessment is the primary tool for substantiating a higher claim value.",
      },
    },
    {
      '@type': 'Question',
      name: 'How long does the restoration process take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Typical timelines: structural drying takes 2–4 weeks; structural repairs take 4–12 weeks; full rebuilds take 3–6 months. These timelines depend on insurer approval speed, contractor availability, and the extent of damage. NRPG manages the schedule end-to-end to avoid unnecessary delays.',
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
        title="Still waiting on your Alfred claim? You shouldn&apos;t have to."
        subtitle="132,000+ claims lodged. AU$1.877B final insured losses. NRPG gets yours moving."
        gradient="linear-gradient(135deg, #1A0A0A 0%, #7B1A1A 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Events', href: '/events' },
          { label: 'Ex-Cyclone Alfred', href: '/events/cyclone-alfred-queensland-2025' },
          { label: 'Claim Disputes Guide' },
        ]}
        cta={{ text: 'Get your claim moving', href: '/claim' }}
        sections={[
          {
            heading: 'The Situation — What Has Happened Since TC Alfred',
            body: (
              <>
                <p>
                  Tropical Cyclone Alfred caused unprecedented damage across Queensland and NSW. To date,
                  132,000+ claims have been lodged. PERILS has confirmed a <strong>final insured loss of
                  AU$1.877 billion</strong> — the largest insured cyclone loss on a current-value basis since
                  Cyclone Debbie in 2017 (PERILS final estimate, released 13 April 2026). Insurers are
                  stretched. Assessors are booked weeks out. It&apos;s not personal — it&apos;s systemic
                  pressure. But you don&apos;t have to wait alone. NRPG specialises in getting stuck claims
                  unstuck.
                </p>
              </>
            ),
          },
          {
            heading: 'Why Claims Stall',
            background: 'light',
            body: (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1.5rem',
                  marginTop: '0.5rem',
                }}
              >
                {[
                  {
                    title: 'Assessor Backlogs',
                    detail:
                      'Typical wait time for an insurer-assigned assessor is 4–8 weeks after a major event. NRPG coordinates faster assessment and escalates priority with insurer claims teams to reduce this wait.',
                  },
                  {
                    title: 'Scope Disputes',
                    detail:
                      "When the insurer and policyholder disagree on what's covered, resolution can take an additional 4–12 weeks. NRPG brings independent IICRC-certified assessment to break deadlocks and substantiate the full scope of damage.",
                  },
                  {
                    title: 'Delayed Repair Approvals',
                    detail:
                      'Insurers sometimes delay releasing funds while negotiating quotes with their preferred contractors. NRPG pushes for repair approval in writing and holds insurers to documented timelines.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      background: 'white',
                      borderRadius: '0.75rem',
                      padding: '1.5rem',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderTop: '4px solid #B91C1C',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        color: '#111827',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {item.title}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            ),
          },
          {
            heading: 'What NRPG Does for Stuck Claims',
            body: (
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
                  gap: '1.5rem',
                  marginTop: '0.5rem',
                }}
              >
                {[
                  {
                    title: 'Dispute Escalation',
                    detail:
                      "NRPG formally escalates with the insurer's senior claims team, backed by detailed scope reports and photographic evidence. This moves a claim from the general queue to a decision-maker.",
                  },
                  {
                    title: 'Insurer Communication',
                    detail:
                      "We speak the insurer's language — negotiating assessor dispatch, scope agreements, and settlement timelines using the documentation and standards insurers recognise.",
                  },
                  {
                    title: 'Independent Assessment Coordination',
                    detail:
                      'Where a deadlock exists, NRPG coordinates independent IICRC-certified assessors to produce a binding scope report that insurers and AFCA accept as authoritative.',
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    style={{
                      background: 'white',
                      borderRadius: '0.75rem',
                      padding: '1.5rem',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderLeft: '4px solid #B91C1C',
                    }}
                  >
                    <div
                      style={{
                        fontWeight: 700,
                        fontSize: '1.05rem',
                        color: '#111827',
                        marginBottom: '0.75rem',
                      }}
                    >
                      {item.title}
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>
                      {item.detail}
                    </p>
                  </div>
                ))}
              </div>
            ),
          },
          {
            heading: 'Recent Court and AFCA Rulings: What They Mean for Alfred Claimants',
            background: 'light',
            body: (
              <>
                <p>
                  Two recent rulings demonstrate that insurers are being held to account for underpayment and
                  poor claims handling:
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                    gap: '1.5rem',
                    marginTop: '1.5rem',
                  }}
                >
                  {[
                    {
                      label: 'Youi — $115,765',
                      date: 'April 2026',
                      source: 'Federal Circuit Court',
                      detail:
                        "Court ordered Youi to pay $115,765 to a policyholder after the insurer disputed the full scope of storm damage. The ruling confirmed the policyholder's entitlement to the full restoration cost as documented by an independent assessor.",
                    },
                    {
                      label: 'IAG — $89,000',
                      date: 'AFCA Published Case',
                      source: 'Australian Financial Complaints Authority',
                      detail:
                        "AFCA upheld a complaint against IAG and required payment of $89,000 additional settlement to a homeowner whose claim was underpaid. AFCA found the insurer's initial assessment undervalued the structural damage.",
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
                      <div
                        style={{
                          fontSize: '1.5rem',
                          fontWeight: 700,
                          color: '#B91C1C',
                          marginBottom: '0.25rem',
                        }}
                      >
                        {r.label}
                      </div>
                      <div style={{ fontSize: '0.8rem', color: '#5C6A79', marginBottom: '0.75rem' }}>
                        {r.date} · {r.source}
                      </div>
                      <p style={{ fontSize: '0.9rem', color: '#374151', lineHeight: 1.6 }}>{r.detail}</p>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: '1.5rem', fontSize: '0.9rem', color: '#5C6A79' }}>
                  These rulings establish that independent documentation from IICRC-certified assessors carries
                  significant weight in both AFCA and court proceedings.
                </p>
              </>
            ),
          },
          {
            heading: 'ARPC Cyclone Reinsurance Pool — What Alfred Claimants Need to Know',
            body: (
              <>
                <p>
                  Ex-TC Alfred has been declared a Cyclone Event under the Australian Reinsurance Pool
                  Corporation (ARPC) scheme. This affects how some cyclone damage claims are handled by your
                  insurer, as a portion of cyclone losses are reinsured through the ARPC pool.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Your insurer should advise you how ARPC affects your specific policy. If you are unsure
                  whether your policy includes cyclone cover under the ARPC scheme, ask your insurer directly
                  or contact the{' '}
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
                    <strong>Get an independent IICRC-certified assessment</strong> — document all damage that
                    has not been included in the insurer&apos;s scope of works. This is your primary evidence
                    for any dispute.
                  </li>
                  <li>
                    <strong>Lodge an internal dispute with your insurer</strong> — all Australian insurers are
                    required to have an internal dispute resolution (IDR) process. Request a formal review of
                    the decision in writing.
                  </li>
                  <li>
                    <strong>Escalate to AFCA if unresolved</strong> — if your insurer does not resolve the
                    dispute within 30 days (or 45 days for complex cases), you can lodge a complaint with AFCA
                    at no cost. AFCA can require the insurer to pay additional amounts.
                  </li>
                  <li>
                    <strong>Contact the QBCC if contractor work was defective</strong> — the Queensland
                    Building and Construction Commission handles complaints about unlicensed or defective
                    building work.
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
                    Get your claim moving
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
                  The following 16 Queensland LGAs were declared under the Disaster Recovery Funding
                  Arrangements (DRFA) for Ex-TC Alfred:
                </p>
                <ul
                  style={{
                    marginTop: '1rem',
                    paddingLeft: '1.5rem',
                    lineHeight: 2,
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
                  }}
                >
                  {[
                    'Brisbane',
                    'Bundaberg',
                    'Fraser Coast',
                    'Gold Coast',
                    'Gympie',
                    'Ipswich',
                    'Lockyer Valley',
                    'Logan',
                    'Moreton Bay',
                    'Noosa',
                    'Redland',
                    'Scenic Rim',
                    'Somerset',
                    'Southern Downs',
                    'Sunshine Coast',
                    'Toowoomba',
                  ].map((lga) => (
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
            question: "My insurer said my claim is 'under review' — what does that mean?",
            answer:
              "An 'under review' status is not a rejection, but it means your claim is sitting in limbo. If your claim has been under review for more than 6 weeks without a substantive update, NRPG can escalate directly with the insurer's senior claims team to force a decision.",
          },
          {
            question: "Can I switch to NRPG if I've already lodged with my insurer directly?",
            answer:
              "Yes — at any point in the process. NRPG steps in and takes over communication with your insurer. There is no need to re-lodge your claim. We pick up where you are and manage the claim from that point forward.",
          },
          {
            question: "What if I've been lowballed on my settlement?",
            answer:
              "Do not accept a settlement offer you believe is too low. NRPG reviews the offer, identifies scope gaps where damage items were missed or undervalued, and negotiates upward with the insurer. Independent IICRC-certified assessment is the primary tool for substantiating a higher claim value.",
          },
          {
            question: 'How long does the restoration process take?',
            answer:
              'Typical timelines: structural drying takes 2–4 weeks; structural repairs take 4–12 weeks; full rebuilds take 3–6 months. These timelines depend on insurer approval speed, contractor availability, and the extent of damage. NRPG manages the schedule end-to-end to avoid unnecessary delays.',
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
