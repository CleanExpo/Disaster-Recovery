/**
 * DR-406: Human Advocate vs AI Claims Processing
 *
 * First-mover differentiation content — NRPG counter-position to JLG/Pacific Equity
 * Partners accelerating digital claims automation via handdii + HOMEE platforms.
 *
 * ACL s18/29 compliant — factual, verifiable statements only.
 * No guarantee language, no unsubstantiated % stats, no phone numbers.
 * NRPG is a restoration specialist — not an insurance lawyer or claim advocate.
 */

import type { Metadata } from 'next'
import Script from 'next/script'
import Link from 'next/link'
import { Shield } from 'lucide-react'
import { AgGuidePageTemplate } from '@/components/antigravity'
import { NAP } from '@/lib/constants'

export const metadata: Metadata = {
  title:
    'Human Claims Advocate vs AI Claims Processing — What the Difference Means for Your Payout',
  description:
    "AI-powered claims platforms optimise for speed and insurer efficiency. NRPG's human advocates fight for your payout. Here's what that difference means in dollars.",
  alternates: {
    canonical: `${NAP.url}/services/human-advocate-vs-ai-claims`,
  },
  openGraph: {
    title:
      'Human Claims Advocate vs AI Claims Processing — What the Difference Means for Your Payout',
    description:
      "AI-powered claims platforms optimise for speed and insurer efficiency. NRPG's human advocates fight for your payout. Here's what that difference means in dollars.",
    url: `${NAP.url}/services/human-advocate-vs-ai-claims`,
    type: 'website',
  },
}

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline:
    'Human Claims Advocate vs AI Claims Processing — What the Difference Means for Your Payout',
  description:
    "AI-powered claims platforms optimise for speed and insurer efficiency. NRPG's human advocates fight for your payout. Here's what that difference means in dollars.",
  author: {
    '@type': 'Organization',
    name: NAP.name,
    url: NAP.url,
  },
  publisher: {
    '@type': 'Organization',
    name: NAP.name,
    url: NAP.url,
    logo: {
      '@type': 'ImageObject',
      url: NAP.logo,
    },
  },
  dateModified: '2026-04-07',
  inLanguage: 'en-AU',
  isAccessibleForFree: true,
  mainEntityOfPage: {
    '@type': 'WebPage',
    '@id': `${NAP.url}/services/human-advocate-vs-ai-claims`,
  },
}

export default function HumanAdvocateVsAiClaimsPage() {
  return (
    <>
      <Script
        id="ai-claims-article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <AgGuidePageTemplate
        category="Insurance Claims"
        title="Human Claims Advocate vs AI Claims Processing"
        subtitle="When your insurer uses AI to assess your claim, you need a human fighting in your corner. Here is what that difference means for your payout."
        gradient="linear-gradient(135deg, #0F2942 0%, #1B4F72 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-07"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Services', href: '/services' },
          { label: 'Human Advocate vs AI Claims' },
        ]}
        cta={{ text: 'Submit Your Claim', href: '/claim' }}
        sections={[
          {
            heading: 'The Rise of Automated Claims Processing',
            body: (
              <>
                <p>
                  Insurance claims processing in Australia is changing rapidly. A growing number of
                  insurers are deploying AI-driven platforms to triage, assess, and in some cases
                  fully close property damage claims — often without a qualified human assessor
                  ever visiting the damaged property.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Two platforms driving this shift in the Australian and New Zealand market are{' '}
                  <strong>handdii</strong> and <strong>HOMEE</strong>. Both are positioned as
                  technology solutions that help insurers reduce claim handling costs, accelerate
                  resolution times, and standardise scope decisions across high claim volumes.
                  Pacific Equity Partners-backed JLG has been actively accelerating adoption of
                  these tools within its managed repair network.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  From an insurer&apos;s perspective, this is an efficiency gain. From a
                  policyholder&apos;s perspective, it raises a critical question: when an algorithm
                  is deciding the scope of your property damage claim, whose interests is it
                  optimised for?
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Insurers invest in these platforms to reduce claim costs and improve throughput.
                  That is a legitimate commercial objective — but it is a different objective from
                  maximising your payout.
                </p>
              </>
            ),
          },
          {
            heading: 'What AI Optimises For vs What You Need',
            background: 'light',
            body: (
              <>
                <p>
                  AI claims platforms and human restoration advocates are optimised for
                  fundamentally different outcomes. The table below sets out what each approach
                  prioritises.
                </p>
                <div
                  style={{
                    marginTop: '1.5rem',
                    overflowX: 'auto',
                  }}
                >
                  <table
                    style={{
                      width: '100%',
                      borderCollapse: 'collapse',
                      fontSize: '0.9rem',
                    }}
                  >
                    <thead>
                      <tr>
                        <th
                          style={{
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            background: '#1E3A5F',
                            color: 'white',
                            fontWeight: 700,
                            borderRadius: '0.5rem 0 0 0',
                          }}
                        >
                          Dimension
                        </th>
                        <th
                          style={{
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            background: '#EA580C',
                            color: 'white',
                            fontWeight: 700,
                          }}
                        >
                          AI Claims Platform
                        </th>
                        <th
                          style={{
                            textAlign: 'left',
                            padding: '0.75rem 1rem',
                            background: '#16A34A',
                            color: 'white',
                            fontWeight: 700,
                            borderRadius: '0 0.5rem 0 0',
                          }}
                        >
                          NRPG Human Advocate
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        {
                          dimension: 'Primary optimisation goal',
                          ai: 'Speed and insurer cost reduction',
                          human: 'Your payout and property outcome',
                        },
                        {
                          dimension: 'Scope assessment',
                          ai: 'Algorithm-driven; pattern-matched against insurer KPIs',
                          human: 'On-site IICRC-certified assessment of actual damage extent',
                        },
                        {
                          dimension: 'Hidden damage detection',
                          ai: 'Limited to visible or reported items',
                          human: 'Moisture mapping, subfloor inspection, HVAC assessment',
                        },
                        {
                          dimension: 'Policy compliance review',
                          ai: 'Automated policy clause matching',
                          human: 'Human review of your specific policy terms and coverage',
                        },
                        {
                          dimension: 'Documentation produced',
                          ai: 'Standardised claim report for insurer processing',
                          human:
                            'Independent IICRC-standard scope supporting AFCA escalation if needed',
                        },
                        {
                          dimension: 'Speed',
                          ai: 'Fast — optimised for throughput',
                          human: 'Thorough — prioritises scope accuracy over speed',
                        },
                        {
                          dimension: 'Dispute support',
                          ai: 'Generates insurer-facing documentation',
                          human: 'Independent documentation supports AFCA complaint',
                        },
                      ].map((row, i) => (
                        <tr
                          key={row.dimension}
                          style={{
                            background: i % 2 === 0 ? 'white' : '#F9FAFB',
                            borderBottom: '1px solid #E5E7EB',
                          }}
                        >
                          <td
                            style={{
                              padding: '0.75rem 1rem',
                              fontWeight: 600,
                              color: '#1E3A5F',
                              verticalAlign: 'top',
                            }}
                          >
                            {row.dimension}
                          </td>
                          <td
                            style={{
                              padding: '0.75rem 1rem',
                              color: '#374151',
                              verticalAlign: 'top',
                            }}
                          >
                            {row.ai}
                          </td>
                          <td
                            style={{
                              padding: '0.75rem 1rem',
                              color: '#374151',
                              verticalAlign: 'top',
                            }}
                          >
                            {row.human}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </>
            ),
          },
          {
            heading: 'The Scope Gap Problem',
            body: (
              <>
                <p>
                  The most significant practical risk with AI-driven claims processing is the
                  scope gap — damage that exists in your property but does not appear in the
                  AI-generated scope of works.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  AI assessment tools rely on the information fed into them: photos submitted
                  via app, reported damage items, and pattern-matching against historical claim
                  data. What they cannot reliably do is identify damage that is not immediately
                  visible, not photographed, or does not match the pattern of a &quot;normal&quot;
                  claim in their training data.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  In property restoration, invisible damage is common and significant:
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))',
                    gap: '1rem',
                    marginTop: '1.25rem',
                  }}
                >
                  {[
                    {
                      title: 'Subfloor moisture',
                      detail:
                        'Flood and water damage frequently penetrates below floor coverings into subfloor cavities. Undetected moisture leads to structural timber decay and mould onset over subsequent weeks.',
                    },
                    {
                      title: 'Wall cavity saturation',
                      detail:
                        'Water tracks through wall cavities well beyond the visible wetline. Psychrometric readings across multiple planes are required to map the true extent of saturation.',
                    },
                    {
                      title: 'Roof cavity and insulation',
                      detail:
                        'Storm and fire events frequently damage roof cavities and roof insulation in ways not captured by a ground-level inspection or photo submission.',
                    },
                    {
                      title: 'HVAC and ductwork',
                      detail:
                        'Fire and smoke damage infiltrates HVAC systems and ductwork. Untreated contamination recirculates through the property after the claim is closed.',
                    },
                    {
                      title: 'Mould onset in humid climates',
                      detail:
                        'In Queensland, NT and coastal NSW/WA, mould can establish within 48 hours of a water event. Early-stage mould is not visible to photo-based AI assessment.',
                    },
                    {
                      title: 'Foundation and slab moisture',
                      detail:
                        'Prolonged water exposure can affect concrete slabs and foundations. AI-driven scopes based on surface inspection do not assess structural moisture at slab level.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      style={{
                        background: '#FFF7ED',
                        borderRadius: '0.75rem',
                        padding: '1.25rem',
                        border: '1px solid #FED7AA',
                        borderTop: '4px solid #EA580C',
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: '#9A3412',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {item.title}
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6 }}>
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
                <p style={{ marginTop: '1.5rem' }}>
                  An NRPG IICRC-certified contractor conducts an on-site physical assessment
                  using moisture meters, thermal imaging, and psychrometric equipment — producing
                  a documented scope that reflects the actual extent of your loss, not a
                  photo-based estimate.
                </p>
              </>
            ),
          },
          {
            heading: 'Your Rights Under the General Insurance Code of Practice',
            background: 'light',
            body: (
              <>
                <p>
                  The{' '}
                  <a
                    href="https://insurancecouncil.com.au/resource/2020-general-insurance-code-of-practice/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    General Insurance Code of Practice
                  </a>{' '}
                  (administered by the Insurance Council of Australia) sets minimum obligations
                  for how Australian insurers must handle your claim — including claims managed
                  via automated or AI-assisted processes.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Key rights you hold under the Code and the AFCA Rules:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                  <li>
                    <strong>Right to an explanation:</strong> Your insurer must explain any
                    decision to accept, partially accept, or decline your claim. A claim closed
                    by an automated system without adequate explanation can be challenged.
                  </li>
                  <li>
                    <strong>Internal Dispute Resolution (IDR):</strong> All insurers must have
                    a free internal dispute resolution process. You can dispute scope decisions,
                    partial payments, or claim closures through this process. Insurers must respond
                    to IDR requests within 30 calendar days (Code standard).
                  </li>
                  <li>
                    <strong>Independent assessment:</strong> You have the right to obtain an
                    independent assessment of your damage. That assessment can be submitted as
                    evidence through the IDR process or to AFCA.
                  </li>
                  <li>
                    <strong>AFCA escalation:</strong> If your insurer fails to resolve your
                    dispute through its internal process, you can escalate to the Australian
                    Financial Complaints Authority (AFCA) at no cost. AFCA is independent of
                    insurers and can require additional payments, reassessment, or reopen closed
                    claims. Complaints must generally be lodged within 2 years of the insurer&apos;s
                    final decision.
                  </li>
                  <li>
                    <strong>Hardship provisions:</strong> If the claim process is creating
                    financial hardship, the Code requires insurers to have processes to assist
                    you. Raise hardship formally with your insurer in writing.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  AFCA publishes its determination data publicly. Recurring patterns in published
                  insurance restoration cases include scope undervaluation (where the insurer&apos;s
                  approved scope missed significant damage items) and repair quality disputes
                  (where work completed by insurer-assigned contractors did not meet IICRC
                  standards). An independent IICRC-certified assessment is the most effective
                  piece of evidence to support both types of dispute.
                </p>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#6B7280' }}>
                  Source:{' '}
                  <a
                    href="https://www.afca.org.au/about-afca/publications/case-studies"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    AFCA Case Studies
                  </a>
                  {' '}|{' '}
                  <a
                    href="https://insurancecouncil.com.au/resource/2020-general-insurance-code-of-practice/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    General Insurance Code of Practice
                  </a>
                </p>
              </>
            ),
          },
          {
            heading: 'How NRPG Works',
            body: (
              <>
                <p>
                  NRPG (National Restoration Professionals Group) is a network of IICRC-certified
                  restoration contractors operating across Australia and New Zealand. We are
                  restoration specialists — not insurance lawyers or claims advocates. Our role
                  is to assess, document, and restore your property to its pre-loss condition
                  using certified methods and equipment.
                </p>
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                    gap: '1rem',
                    marginTop: '1.5rem',
                  }}
                >
                  {[
                    {
                      title: 'Human-led, on-site assessment',
                      detail:
                        'Every job starts with a physical on-site assessment by an IICRC-certified technician using moisture mapping, thermal imaging, and psychrometric equipment — not a photo-based app submission.',
                    },
                    {
                      title: 'IICRC-certified restoration',
                      detail:
                        'Our contractors hold current IICRC certifications (S500:2025, S520:2025, S700:2025 as applicable) and follow the corresponding standards for every job — producing documentation your insurer can verify.',
                    },
                    {
                      title: 'Independent scope of works',
                      detail:
                        'We produce a full, itemised scope of works that reflects the actual extent of damage. This is produced independently of your insurer\'s authorised scope, giving you a documented basis for any dispute.',
                    },
                    {
                      title: 'No upfront fees',
                      detail:
                        'We do not charge upfront assessment fees. Our work is typically funded through your insurance claim. For out-of-pocket jobs, pricing is itemised and transparent before any work commences.',
                    },
                    {
                      title: 'We work alongside your insurer',
                      detail:
                        'We do not work against insurers. We work with them — providing the documentation and IICRC-standard evidence they need to process your claim. Where our assessment differs from the insurer\'s scope, we document the difference clearly.',
                    },
                    {
                      title: 'Each contractor holds own qualifications',
                      detail:
                        'Every contractor in the NRPG network independently holds their own IICRC certifications, public liability insurance, and relevant trade licences. We do not outsource to unqualified operators.',
                    },
                  ].map((item) => (
                    <div
                      key={item.title}
                      style={{
                        background: '#F0FDF4',
                        borderRadius: '0.75rem',
                        padding: '1.25rem',
                        border: '1px solid #BBF7D0',
                        borderTop: '4px solid #16A34A',
                      }}
                    >
                      <div
                        style={{
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          color: '#15803D',
                          marginBottom: '0.5rem',
                        }}
                      >
                        {item.title}
                      </div>
                      <p style={{ fontSize: '0.875rem', color: '#374151', lineHeight: 1.6 }}>
                        {item.detail}
                      </p>
                    </div>
                  ))}
                </div>
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
                      fontSize: '1rem',
                    }}
                  >
                    Submit Your Claim
                  </Link>
                </div>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What is an AI claims platform and how does it affect my payout?',
            answer:
              'AI claims platforms (such as handdii and HOMEE) are software systems used by insurers to triage, scope, and process property damage claims using data models rather than on-site human assessment. They are designed to reduce insurer handling costs and increase processing speed. The risk for policyholders is that AI-generated scopes may miss non-visible damage — subfloor moisture, wall cavity saturation, HVAC contamination — that an on-site IICRC-certified assessor would identify and document. Items not in the scope are not paid.',
          },
          {
            question:
              'Can I request a human assessment even if my insurer uses an AI platform?',
            answer:
              'Yes. You have the right under the General Insurance Code of Practice to request an explanation of how your claim was assessed. You also have the right to obtain an independent assessment of your damage at any time. An independent IICRC-certified assessment from an NRPG contractor can be submitted to your insurer through their internal dispute resolution process, or to AFCA if the insurer does not resolve the dispute.',
          },
          {
            question:
              'Does NRPG fight my insurance claim for me?',
            answer:
              'No. NRPG is a restoration specialist network, not an insurance lawyer or claim advocate. Our role is to assess and restore your property to its pre-loss condition using IICRC-certified methods. We produce an independent, IICRC-standard scope of works that documents the full extent of your damage. That documentation is what you use to support your claim or dispute — the outcome of your insurance claim is between you and your insurer.',
          },
          {
            question: 'What is AFCA and how do I escalate a disputed claim?',
            answer:
              'AFCA (Australian Financial Complaints Authority) is the independent external dispute resolution body for Australian financial services, including insurance. If your insurer does not resolve your dispute through its internal process within 30 days, you can lodge a complaint with AFCA at no cost via afca.org.au. AFCA can require insurers to pay additional amounts, reopen closed claims, or arrange independent re-assessment. Complaints must generally be lodged within 2 years of the insurer\'s final decision.',
          },
          {
            question: 'What does IICRC-certified mean and why does it matter for my claim?',
            answer:
              'IICRC (Institute of Inspection, Cleaning and Restoration Certification) is the international standard-setting body for the restoration industry. IICRC S500:2025 governs water damage restoration, S520:2025 governs mould remediation, and S700:2025 governs fire and smoke damage restoration. When an NRPG contractor produces a scope of works to IICRC standard, that documentation is auditable — your insurer, an AFCA adjudicator, or an independent expert can verify that the scope reflects the relevant standard, not an arbitrary estimate.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Your Advocate vs Your Insurer\'s Builder',
            href: '/guides/insurance/human-advocate-vs-insurer-assigned-builder',
            description:
              'When your insurer assigns a builder, that builder works for the insurer\'s budget. Understand your right to choose an independent contractor.',
          },
          {
            title: 'Insurance Affordability in Australia',
            href: '/guides/insurance/insurance-affordability-australia',
            description:
              'Rising premiums, under-insurance risk, and what to do when coverage falls short.',
          },
          {
            title: 'The Real Cost of Insurance Delays',
            href: '/guides/insurance/real-cost-insurance-delays',
            description:
              'How insurer delays compound disaster costs and what your rights are under the Code of Practice.',
          },
          {
            title: 'Why Hire an IICRC-Certified Professional',
            href: '/guides/certifications/why-hire-iicrc-certified',
            description:
              'What IICRC certification means in practice and why it matters for your restoration and claim outcome.',
          },
        ]}
      />
    </>
  )
}
