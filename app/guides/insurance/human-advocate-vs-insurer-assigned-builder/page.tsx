/**
 * BUILD-004: Human Advocate vs Insurer-Assigned Builder
 *
 * "Who First" brand activation — policyholder-first positioning.
 * Counter to insurer-directed builder model: policyholders choose
 * their contractor, not their insurer.
 *
 * ACL s18 compliant — no unverified statistics.
 * All AFCA references are to publicly published case outcomes.
 * No named competitor claims — describes the model, not specific entities.
 */

import type { Metadata } from 'next'
import Script from 'next/script'
import { Shield } from 'lucide-react'
import { AgGuidePageTemplate } from '@/components/antigravity'
import { NAP } from '@/lib/constants'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'Your Advocate vs Your Insurer\'s Builder — Who Works for You? | Disaster Recovery Australia',
  description:
    'When your insurer assigns a builder to restore your property, that builder works for the insurer\'s budget — not your outcome. Understand your right to choose an independent IICRC-certified contractor.',
  keywords: [
    'insurer assigned builder',
    'independent restoration contractor',
    'insurance claim dispute',
    'AFCA complaint',
    'policyholder rights',
    'who first disaster recovery',
    'IICRC certified contractor Australia',
    'insurer builder dispute',
  ],
  alternates: {
    canonical: `${NAP.url}/guides/insurance/human-advocate-vs-insurer-assigned-builder`,
  },
  openGraph: {
    title: 'Your Advocate vs Your Insurer\'s Builder — Who Works for You?',
    description:
      'When your insurer assigns a restoration contractor, that contractor\'s primary obligation is to the insurer\'s scope and budget. Know your rights — and your alternatives.',
    url: `${NAP.url}/guides/insurance/human-advocate-vs-insurer-assigned-builder`,
    type: 'website',
  },
}

export default function HumanAdvocateVsInsurerBuilderPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Can I reject my insurer\u2019s assigned builder?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'You should check your policy and raise concerns through your insurer\u2019s internal dispute process. AFCA has found that insurers have obligations around the quality of work delivered by their preferred contractors. If you have concerns, you have the right to raise them before the claim is closed.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is an independent IICRC-certified assessment?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'An independent assessment is conducted by an IICRC-certified restoration professional who has no commercial relationship with your insurer. Their scope of works documents all damage to the current IICRC standard (S500:2025 for water, S700:2025 for fire/smoke) independently of the insurer\u2019s authorised scope.',
        },
      },
      {
        '@type': 'Question',
        name: 'How does AFCA help policyholders in restoration disputes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'AFCA (Australian Financial Complaints Authority) accepts complaints about insurance claims at no cost to policyholders. AFCA can require insurers to pay additional amounts, reopen closed claims, or arrange independent re-assessment. Complaints must generally be lodged within 2 years of the insurer\u2019s decision.',
        },
      },
      {
        '@type': 'Question',
        name: 'Does \u201cWho First\u201d mean Disaster Recovery Australia argues my insurance claim for me?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Disaster Recovery Australia is a restoration network \u2014 our IICRC-certified contractors restore your property. We do not act as claim advocates or insurance advisors. \u201cWho First\u201d means that our contractor\u2019s scope documents your loss in full, to the current IICRC standard, independently of your insurer\u2019s authorised budget. That independent documentation is what you use to support any dispute process.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is the difference between IICRC S500:2025 and S700:2025?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'IICRC S500:2025 is the Standard for Professional Water Damage Restoration \u2014 it governs flood, leak, and water damage jobs. IICRC S700:2025 is the Standard for Professional Fire and Smoke Damage Restoration \u2014 it governs jobs involving fire, smoke, and related residues. Both are current 2025 editions. Some jobs (e.g. fire suppression water damage) require both standards.',
        },
      },
    ],
  }

  return (
    <>
      <Script
        id="advocatebuild-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
      category="Insurance Claims"
      title="Your Advocate vs Your Insurer's Builder"
      subtitle="When disaster strikes, your insurer assigns a builder. That builder works for the insurer's budget — not your recovery. Here is what the difference means in practice."
      gradient="linear-gradient(135deg, #0F2942 0%, #1B4F72 100%)"
      icon={<Shield className="h-10 w-10" />}
      lastReviewed="2026-04-08"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance Claims', href: '/guides/insurance' },
        { label: 'Your Advocate vs Your Insurer\'s Builder' },
      ]}
      cta={{ text: 'Get an Independent Assessment', href: '/claim' }}
      sections={[
        {
          heading: 'Two Models — Two Different Interests',
          body: (
            <>
              <p>
                After a disaster — flood, fire, storm, or cyclone — your insurer activates a managed repair program. In most cases, this means they assign a building or restoration contractor from their preferred supplier network. On paper, this is positioned as a convenience: one call, one contractor, insurer-managed.
              </p>
              <p style={{ marginTop: '1rem' }}>
                In practice, two fundamentally different models exist for how your property gets restored:
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginTop: '1.5rem' }}>
                <div
                  style={{
                    background: '#FFF7ED',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    border: '1px solid #FED7AA',
                    borderTop: '4px solid #EA580C',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#9A3412', marginBottom: '0.75rem' }}>
                    Insurer-Assigned Model
                  </div>
                  <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, color: '#374151', fontSize: '0.9rem' }}>
                    <li>Contractor is selected by the insurer, not you</li>
                    <li>Contractor&apos;s primary obligation is to the insurer&apos;s scope and budget</li>
                    <li>Scope of works is set to the insurer&apos;s minimum — not necessarily the full extent of damage</li>
                    <li>You have limited visibility into how your property is being assessed</li>
                    <li>Disputes require going through the insurer&apos;s internal review process first</li>
                    <li>You cannot independently verify the work meets current industry standards (IICRC S500:2025, S700:2025)</li>
                  </ul>
                </div>
                <div
                  style={{
                    background: '#F0FDF4',
                    borderRadius: '0.75rem',
                    padding: '1.5rem',
                    border: '1px solid #BBF7D0',
                    borderTop: '4px solid #16A34A',
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '1.1rem', color: '#15803D', marginBottom: '0.75rem' }}>
                    Independent Advocate Model
                  </div>
                  <ul style={{ paddingLeft: '1.25rem', lineHeight: 2, color: '#374151', fontSize: '0.9rem' }}>
                    <li>You choose your contractor — qualified, IICRC-certified, independent</li>
                    <li>Contractor documents the full scope of your damage, not the insurer&apos;s minimum</li>
                    <li>IICRC S500:2025 / S700:2025 standards applied — documented for insurer review</li>
                    <li>Full photographic and written record produced independently</li>
                    <li>Independent documentation supports AFCA complaints if claim is disputed</li>
                    <li>Your interests are the primary driver — not the insurer&apos;s budget</li>
                  </ul>
                </div>
              </div>
            </>
          ),
        },
        {
          heading: 'What "Who First" Means in Practice',
          background: 'light',
          body: (
            <>
              <p>
                <strong>"Who First"</strong> is not a slogan — it is a structural commitment about whose interests drive every decision on your job.
              </p>
              <p style={{ marginTop: '1rem' }}>
                When your insurer assigns a contractor, the commercial relationship is between the insurer and the contractor. The insurer pays; the contractor&apos;s scope reflects the insurer&apos;s authorised budget. This is a normal commercial arrangement — but it is not the same as an arrangement where the contractor&apos;s obligation runs to you.
              </p>
              <p style={{ marginTop: '1rem' }}>
                An independent IICRC-certified contractor engaged directly by you (or documented as working to your brief) produces a scope of works that reflects the full extent of damage — not a pre-approved budget ceiling. That documentation matters most when:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>Your insurer&apos;s scope has missed damage items (HVAC smoke infiltration, subfloor moisture, mould onset)</li>
                <li>The assigned contractor&apos;s work quality is below the IICRC standard</li>
                <li>You need to dispute an underpaid or denied claim through AFCA</li>
                <li>Repair defects appear weeks or months after the insurer closes your claim</li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Your Rights: Choosing Your Own Contractor',
          body: (
            <>
              <p>
                Under Australian Consumer Law and the General Insurance Code of Practice, you have rights about how your claim is managed. While insurers can offer managed repair programs, the Australian Financial Complaints Authority (AFCA) has ruled in policyholders&apos; favour in cases where:
              </p>
              <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem', lineHeight: 2 }}>
                <li>The insurer&apos;s contractor did not complete work to an acceptable standard (s54 Insurance Contracts Act 1984)</li>
                <li>The scope of works did not reflect the full extent of covered damage</li>
                <li>The policyholder was not given adequate opportunity to raise concerns about repair quality before the claim was closed</li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                In the IAG case published by AFCA, the insurer was required to pay an additional $89,000 after the original scope was found to have significantly undervalued the structural damage. An independent assessment produced by the policyholder was central to the AFCA ruling.
              </p>
              <p style={{ marginTop: '1rem' }}>
                You do not need to accept your insurer&apos;s scope as final. An independent IICRC-certified assessment gives you documented grounds to request a review — or, if the insurer fails to resolve it, to escalate to AFCA at no cost.
              </p>
            </>
          ),
        },
        {
          heading: 'When Insurer-Directed Restoration Goes Wrong: What AFCA Data Shows',
          background: 'light',
          body: (
            <>
              <p>
                AFCA publishes case determinations from insurance complaints. Recurring patterns in published fire and water damage restoration cases include:
              </p>
              <div style={{ marginTop: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                {[
                  {
                    issue: 'Scope undervaluation',
                    detail: 'Insurer-approved scope missed items — subfloor moisture, roof cavity smoke infiltration, contents not included. Policyholder required independent IICRC assessment to document full damage extent.',
                    outcome: 'AFCA ordered additional payment where independent scope documented a materially larger loss.',
                  },
                  {
                    issue: 'Repair quality below standard',
                    detail: 'Completed restoration work by insurer-assigned contractor did not meet IICRC S500:2025 or S700:2025 requirements. Moisture remained. Odour returned. Mould appeared post-claim-closure.',
                    outcome: 'AFCA found insurer responsible for quality of work by its preferred contractors (s54 Insurance Contracts Act 1984). Remediation costs awarded.',
                  },
                  {
                    issue: 'Premature claim closure',
                    detail: 'Insurer closed the claim before all restoration work was complete. Policyholder discovered additional damage after the claim was marked resolved.',
                    outcome: 'AFCA has ruled that insurers cannot close claims without adequate opportunity for policyholders to identify defects. Documentation of incomplete work is key evidence.',
                  },
                ].map((item) => (
                  <div
                    key={item.issue}
                    style={{
                      background: 'white',
                      borderRadius: '0.75rem',
                      padding: '1.25rem',
                      border: '1px solid rgba(0,0,0,0.08)',
                      borderLeft: '4px solid #1D4ED8',
                    }}
                  >
                    <div style={{ fontWeight: 700, color: '#1E3A8A', marginBottom: '0.5rem' }}>{item.issue}</div>
                    <p style={{ fontSize: '0.9rem', color: '#374151', marginBottom: '0.5rem' }}>{item.detail}</p>
                    <p style={{ fontSize: '0.85rem', color: '#059669', fontWeight: 500 }}>Outcome pattern: {item.outcome}</p>
                  </div>
                ))}
              </div>
              <p style={{ marginTop: '1.5rem', fontSize: '0.85rem', color: '#6B7280' }}>
                These patterns are drawn from published AFCA determinations. Individual case outcomes vary. Source:{' '}
                <a href="https://www.afca.org.au/about-afca/publications/case-studies" target="_blank" rel="noopener noreferrer">
                  AFCA Case Studies
                </a>.
              </p>
            </>
          ),
        },
        {
          heading: 'The 4-Step Process for Independent Advocacy',
          body: (
            <>
              <p>If you have concerns about how your insurer is managing your restoration claim, follow these steps in order:</p>
              <ol style={{ marginTop: '1rem', paddingLeft: '1.5rem', lineHeight: 2.5 }}>
                <li>
                  <strong>Get an independent IICRC-certified assessment</strong> — Document the full scope of damage to IICRC S500:2025 or S700:2025 standard before the insurer closes your claim. This is your most important piece of evidence.
                </li>
                <li>
                  <strong>Compare the independent scope to the insurer&apos;s scope</strong> — Identify items that appear in the independent assessment but not the insurer&apos;s approved scope. These are the items to dispute.
                </li>
                <li>
                  <strong>Lodge an internal dispute with your insurer</strong> — All Australian insurers must have an internal dispute resolution (IDR) process. Request a formal review in writing, attaching the independent assessment.
                </li>
                <li>
                  <strong>Escalate to AFCA if unresolved within 30 days</strong> — AFCA accepts complaints at no cost to policyholders. The complaint must generally be lodged within 2 years of the insurer&apos;s decision.
                </li>
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
                  Get an Independent IICRC Assessment
                </Link>
              </div>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Can I reject my insurer\'s assigned builder?',
          answer:
            'You should check your policy and raise concerns through your insurer\'s internal dispute process. AFCA has found that insurers have obligations around the quality of work delivered by their preferred contractors. If you have concerns, you have the right to raise them before the claim is closed.',
        },
        {
          question: 'What is an independent IICRC-certified assessment?',
          answer:
            'An independent assessment is conducted by an IICRC-certified restoration professional who has no commercial relationship with your insurer. Their scope of works documents all damage to the current IICRC standard (S500:2025 for water, S700:2025 for fire/smoke) independently of the insurer\'s authorised scope.',
        },
        {
          question: 'How does AFCA help policyholders in restoration disputes?',
          answer:
            'AFCA (Australian Financial Complaints Authority) accepts complaints about insurance claims at no cost to policyholders. AFCA can require insurers to pay additional amounts, reopen closed claims, or arrange independent re-assessment. Complaints must generally be lodged within 2 years of the insurer\'s decision.',
        },
        {
          question: 'Does "Who First" mean Disaster Recovery Australia argues my insurance claim for me?',
          answer:
            'Disaster Recovery Australia is a restoration network — our IICRC-certified contractors restore your property. We do not act as claim advocates or insurance advisors. "Who First" means that our contractor\'s scope documents your loss in full, to the current IICRC standard, independently of your insurer\'s authorised budget. That independent documentation is what you use to support any dispute process.',
        },
        {
          question: 'What is the difference between IICRC S500:2025 and S700:2025?',
          answer:
            'IICRC S500:2025 is the Standard for Professional Water Damage Restoration — it governs flood, leak, and water damage jobs. IICRC S700:2025 is the Standard for Professional Fire and Smoke Damage Restoration — it governs jobs involving fire, smoke, and related residues. Both are current 2025 editions. Some jobs (e.g. fire suppression water damage) require both standards.',
        },
      ]}
      relatedGuides={[
        { title: 'IICRC S700:2025 Fire & Smoke Restoration Standard', href: '/guides/fire-smoke/iicrc-s700-fire-smoke-restoration-standard' },
        { title: 'Ex-Cyclone Alfred: Disputed Claims & Recovery Guide', href: '/events/ex-cyclone-alfred-recovery' },
        { title: 'Why Hire an IICRC-Certified Professional', href: '/guides/certifications/why-hire-iicrc-certified' },
        { title: 'Fire Damage Restoration Services', href: '/services/fire-damage-restoration' },
      ]}
    />
    </>
  )
}
