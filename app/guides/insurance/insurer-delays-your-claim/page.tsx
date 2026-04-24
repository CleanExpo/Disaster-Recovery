/**
 * DR-513 — AFCA Insurance Delay Guide
 *
 * SEO target: homeowners frustrated with insurer delays searching for actionable guidance.
 * AFCA's 2025 annual report: delay in claim handling = #1 complaint category (9,274 complaints).
 *
 * Content scope:
 * - General Insurance Code of Practice timeframes (what insurers are legally required to do)
 * - How to lodge a formal complaint with the insurer (IDR) for delays specifically
 * - When and how to escalate to AFCA for a delay complaint
 * - Rights during the delay period (Section 56 duty to mitigate)
 * - What a contractor can do while authorisation is pending
 *
 * NOT in scope: the general AFCA complaint process (covered in afca-complaint-guide).
 * NOT in scope: the financial cost of delays (covered in real-cost-insurance-delays).
 * NOT in scope: claim advocacy — information only per brand guidelines.
 */

import { Metadata } from 'next';
import { Clock } from 'lucide-react';
import Script from 'next/script';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'What to Do When Your Insurer Delays Your Claim — Australia 2025',
  description:
    'Practical steps when your insurer is slow to act on your property damage claim. GICP timeframes your insurer must meet, how to lodge an IDR complaint, when to go to AFCA, and your rights during the wait.',
  keywords:
    'insurer delays claim Australia, insurance claim not progressing, AFCA delay complaint, IDR insurance complaint, insurer slow to respond, General Insurance Code of Practice timeframes, AFCA claim delay 2025',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/insurance/insurer-delays-your-claim',
  },
  openGraph: {
    title: 'What to Do When Your Insurer Delays Your Claim',
    description:
      'AFCA received 9,274 delay complaints in 2025 — the top complaint category. Here are the timeframes your insurer must meet and what to do when they miss them.',
    url: 'https://disasterrecovery.com.au/guides/insurance/insurer-delays-your-claim',
    type: 'article',
  },
};

const articleSchema = {
  '@context': 'https://schema.org',
  '@type': 'Article',
  headline: 'What to Do When Your Insurer Delays Your Claim',
  datePublished: '2026-04-10',
  dateModified: '2026-04-10',
  author: { '@type': 'Organization', name: 'Disaster Recovery' },
  publisher: {
    '@type': 'Organization',
    name: 'Disaster Recovery',
    url: 'https://disasterrecovery.com.au',
  },
  description:
    'Practical action steps when your property damage insurer is slow — GICP timeframes, IDR complaint letters, AFCA escalation for delay, and your rights during the wait.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'How long does an insurer have to decide on my claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the General Insurance Code of Practice, your insurer must decide on your claim within four months of receiving the claim, or explain in writing why more time is needed. For straightforward claims, insurers aim to decide within 10 business days of receiving all relevant information. If your insurer misses these timeframes without explanation, you can complain through IDR immediately.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I start repairs before my insurer approves my claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — you have a duty to mitigate under Section 56 of the Insurance Contracts Act 1984. This means you must take reasonable steps to prevent further damage. Make-safe work (tarping, water extraction, drying) can proceed before approval. Keep all receipts and contractor documentation. These reasonable mitigation costs are claimable.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is an IDR complaint and how do I lodge one?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'IDR stands for Internal Dispute Resolution — the formal complaints process every insurer is required to maintain. To lodge one, contact your insurer in writing (email is acceptable), state you are making a formal complaint about the delay, include your claim number and a clear description of what has not happened and by when. The insurer must respond to your IDR complaint within 30 calendar days.',
      },
    },
    {
      '@type': 'Question',
      name: 'When can I go to AFCA about a delay?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "You can go to AFCA after receiving the insurer's IDR response (if you are not satisfied), or if the insurer has not responded to your IDR complaint within 30 calendar days. AFCA is free for complainants. You have two years from the date of the IDR response to lodge. AFCA can order the insurer to decide your claim and may award interest for unreasonable delay.",
      },
    },
    {
      '@type': 'Question',
      name: 'What can AFCA do about an insurer that is slow?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Where AFCA finds the insurer has unreasonably delayed, it can order the claim to be decided within a specific timeframe, award interest on amounts owed for the delay period, and order compensation for non-financial loss (distress and inconvenience) up to $5,500. In 2025, AFCA secured $643 million in compensation across all complaints — a 120% increase on the prior year.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the General Insurance Code of Practice have legal force?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Yes. The General Insurance Code of Practice is enforceable through the Insurance Council of Australia. Breaches can result in sanctions, public reporting, and compensation to affected policyholders. AFCA also applies the Code when determining whether an insurer's conduct was fair and reasonable. The Code has been strengthened following the 2022 flood catastrophe and subsequent reviews.",
      },
    },
  ],
};

export default function InsurerDelaysYourClaimPage() {
  return (
    <>
      <Script
        id="article-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />
      <Script
        id="faq-schema"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Insurance"
        title="What to Do When Your Insurer Delays Your Claim"
        subtitle="The General Insurance Code of Practice sets mandatory timeframes. When your insurer misses them, here is what to do — step by step."
        gradient="linear-gradient(135deg, #7C2D12 0%, #EA580C 100%)"
        icon={<Clock className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance', href: '/guides/insurance' },
          { label: 'Insurer Delays Your Claim' },
        ]}
        sections={[
          {
            heading: 'The Scale of the Problem',
            body: (
              <>
                <p>
                  In 2025, the Australian Financial Complaints Authority (AFCA) received{' '}
                  <strong>111,373 complaints</strong> — the highest number in its history, up 14% on
                  the prior year. The single largest complaint category was{' '}
                  <strong>delay in claim handling: 9,274 complaints</strong>. AFCA secured $643
                  million in compensation for consumers — a 120% increase year on year.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  These figures reflect a pattern that has been building since the 2022 Australian
                  floods, which generated over 300,000 insurance claims and stretched insurer
                  assessment capacity to breaking point. The Insurance Council of Australia (ICA)
                  and the Australian Securities and Investments Commission (ASIC) have both
                  expressed concern about the pace at which major catastrophe claims are being
                  resolved.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  If your property damage claim is not progressing, you are not alone — and you have
                  rights under Australian law and the General Insurance Code of Practice that most
                  policyholders are unaware of.
                </p>
              </>
            ),
          },
          {
            heading: 'What Your Insurer Is Required to Do — and By When',
            body: (
              <>
                <p>
                  The <strong>General Insurance Code of Practice (the Code)</strong> sets mandatory
                  timeframes that all subscribing insurers must meet. It is enforced by the
                  Insurance Council of Australia and can be applied by AFCA in dispute
                  determinations.
                </p>
                <div
                  style={{
                    overflowX: 'auto',
                    borderRadius: '0.5rem',
                    border: '1px solid #e2e8f0',
                    marginTop: '1rem',
                  }}
                >
                  <table
                    style={{ width: '100%', fontSize: '0.875rem', borderCollapse: 'collapse' }}
                  >
                    <thead>
                      <tr style={{ backgroundColor: '#1e293b', color: 'white' }}>
                        <th style={{ padding: '0.75rem 1rem', textAlign: 'left', fontWeight: 600 }}>
                          What must happen
                        </th>
                        <th
                          style={{ padding: '0.75rem 1rem', textAlign: 'right', fontWeight: 600 }}
                        >
                          Timeframe under the Code
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {[
                        ['Acknowledge receipt of your claim', '10 business days'],
                        [
                          'Request any additional information needed to assess the claim',
                          'As soon as reasonably practicable',
                        ],
                        [
                          'Decide the claim or explain why a decision cannot yet be made',
                          'Within 4 months of receiving the claim',
                        ],
                        [
                          'Provide a progress update if still assessing after 45 business days',
                          'Every 20 business days thereafter',
                        ],
                        [
                          'Respond to an IDR (formal complaint) about the delay',
                          '30 calendar days',
                        ],
                      ].map(([action, timeframe], idx) => (
                        <tr
                          key={action}
                          style={{
                            backgroundColor: idx % 2 === 0 ? 'white' : '#f8fafc',
                            borderTop: '1px solid #e2e8f0',
                          }}
                        >
                          <td style={{ padding: '0.75rem 1rem', color: '#374151' }}>{action}</td>
                          <td
                            style={{
                              padding: '0.75rem 1rem',
                              textAlign: 'right',
                              fontWeight: 600,
                              color: '#7c2d12',
                            }}
                          >
                            {timeframe}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <p style={{ marginTop: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
                  Source: General Insurance Code of Practice (2020, amended 2024). These timeframes
                  apply to subscribing insurers. Confirm whether your insurer subscribes at{' '}
                  <a
                    href="https://www.codeofpractice.com.au"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    codeofpractice.com.au
                  </a>
                  .
                </p>
                <p style={{ marginTop: '1rem' }}>
                  If your insurer has missed any of these timeframes without giving you a written
                  explanation and a revised date, the Code has been breached. This is the basis for
                  your formal complaint.
                </p>
              </>
            ),
          },
          {
            heading: 'Step 1: Keep a Written Timeline of the Delay',
            body: (
              <>
                <p>
                  Before contacting your insurer or escalating, create a clear written record of
                  what has happened and what has not. This timeline is the foundation of any IDR
                  complaint or AFCA submission.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Date the damage occurred</strong> and the date you first notified your
                    insurer.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Every contact you have made</strong> — dates, times, who you spoke to,
                    what was said. If communications have been by phone, follow up each call with an
                    email confirming the conversation.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Every commitment your insurer made</strong> — &quot;we will send an
                    assessor within five days,&quot; &quot;a decision will be made by the end of the
                    month&quot; — and whether they were met.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>What the delay has cost you</strong> — alternative accommodation,
                    ongoing property damage, contents deteriorating, secondary damage developing.
                    Keep receipts for every cost.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Photographs with timestamps</strong> — damage progression photos
                    demonstrate that delay is compounding the loss. Mould, timber swelling, and
                    structural deterioration all worsen over time and generate costs the insurer
                    will later need to cover.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Save copies of all written communications. Do not rely on verbal commitments alone
                  — request everything in writing.
                </p>
              </>
            ),
          },
          {
            heading: 'Step 2: Lodge a Formal IDR Complaint About the Delay',
            body: (
              <>
                <p>
                  <strong>Internal Dispute Resolution (IDR)</strong> is the formal complaints
                  process your insurer is required to operate under ASIC Regulatory Guide 271 and
                  the General Insurance Code of Practice. It is not the same as ringing your claims
                  manager — it is a separate complaints channel that triggers specific legal
                  obligations.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  To lodge an IDR complaint, write to your insurer and:
                </p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    State clearly that you are making a <strong>formal complaint</strong> about the
                    delay in handling your claim.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Include your <strong>claim number, policy number</strong>, and the date the
                    claim was lodged.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Attach a <strong>summary of the delay timeline</strong> you prepared in Step 1.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    State the <strong>specific Code timeframe</strong> that has been missed (e.g.,
                    &quot;The claim was lodged on [date]. Under the General Insurance Code of
                    Practice, a decision was required within four months. That date has passed
                    without a decision or written explanation.&quot;).
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    State what outcome you are seeking: a decision on the claim within [specific
                    date], written reasons for any further delay, and compensation for costs
                    incurred due to the delay.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Send the complaint to your insurer&apos;s <strong>complaints team</strong> — not
                  your claims handler. The complaints team email or postal address will be on your
                  policy documents or the insurer&apos;s website under &quot;Complaints&quot; or
                  &quot;Dispute Resolution.&quot;
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>
                    Your insurer must respond to your IDR complaint within 30 calendar days.
                  </strong>{' '}
                  If they do not, you can go directly to AFCA without waiting for the IDR response.
                </p>
              </>
            ),
          },
          {
            heading: 'Step 3: Escalate to AFCA If IDR Fails',
            body: (
              <>
                <p>
                  If your insurer&apos;s IDR response does not resolve the delay — or they do not
                  respond within 30 days — you can lodge a complaint with the{' '}
                  <strong>Australian Financial Complaints Authority (AFCA)</strong>.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>AFCA is free for complainants.</strong> There is no cost to lodge,
                    regardless of the claim amount or outcome.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>Lodge at afca.org.au</strong> — online is the fastest method. You can
                    attach your delay timeline, IDR complaint, and all correspondence at lodgement.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>You have two years</strong> from the date of the IDR response to lodge
                    with AFCA.
                  </li>
                  <li style={{ marginBottom: '0.75rem' }}>
                    <strong>What AFCA can order for delay:</strong> that the claim be decided within
                    a specific timeframe; interest on amounts owed for the delay period;
                    compensation for non-financial loss (distress and inconvenience) up to $5,500.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  AFCA&apos;s 2025 data shows that delay complaints are increasingly being resolved
                  in the complainant&apos;s favour — particularly where the insurer cannot
                  demonstrate that its handling met the Code&apos;s timeframe requirements. The
                  combination of your written timeline and a clear IDR record is your strongest
                  evidence.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  For more detail on the full AFCA complaint process, see the{' '}
                  <a href="/guides/insurance/afca-complaint-guide">AFCA Complaint Guide</a>.
                </p>
              </>
            ),
          },
          {
            heading: 'Your Rights During the Wait — Can You Start Repairs?',
            body: (
              <>
                <p>
                  Many policyholders believe they must wait for insurer authorisation before
                  starting any work. This is not correct under Australian law.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  <strong>Section 56 of the Insurance Contracts Act 1984</strong> imposes a duty to
                  mitigate on the insured. This means you are legally required to take reasonable
                  steps to prevent further damage — and you are entitled to do so. Reasonable
                  mitigation costs are claimable, even if incurred before the insurer authorises
                  repairs.
                </p>
                <p style={{ marginTop: '1rem' }}>In practice, this means:</p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Make-safe work</strong> — tarping a damaged roof, extracting standing
                    water, removing hazards — can and should proceed immediately.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Drying and dehumidification</strong> — deployed within 24–48 hours of
                    water damage significantly limits mould growth and structural damage.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Contents at risk</strong> — items that will deteriorate further (soft
                    furnishings, documents, electronics) can be removed and stored or assessed
                    without waiting for authorisation.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  Critical: document everything before, during, and after any mitigation work.
                  Photographs, moisture readings, equipment logs, and contractor invoices are all
                  required to claim these costs. A qualified IICRC-certified restoration contractor
                  will provide this documentation as standard.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Full rebuilding and structural repairs are generally more complex — insurers
                  typically require scope approval before permanent repairs. However, the mitigation
                  steps above should not wait.
                </p>
              </>
            ),
          },
          {
            heading: 'How an Independent Contractor Assessment Strengthens Your Position',
            body: (
              <>
                <p>
                  If the delay involves a dispute about scope — what damage the insurer is prepared
                  to cover — an independent assessment from a qualified restoration contractor
                  provides AFCA and your IDR with technically credible evidence.
                </p>
                <p style={{ marginTop: '1rem' }}>An independent scope of works:</p>
                <ul style={{ marginTop: '0.75rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Documents what work is required and why, with reference to Australian
                    restoration standards (IICRC S500, S520, S770 as applicable).
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Quantifies the cost of repairs with line-item transparency, giving AFCA a
                    factual basis for comparison against the insurer&apos;s position.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Demonstrates that any scope gap is due to the insurer&apos;s delay — secondary
                    damage that has developed since the initial loss event is documented separately.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  AFCA can and does prefer independent contractor evidence over insurer-engaged
                  assessors where the independent evidence is thorough and credible.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The Disaster Recovery platform connects property owners with IICRC-certified
                  restoration contractors across Australia. An independent assessment can typically
                  be arranged within 24–48 hours of contact.
                </p>
                <p style={{ marginTop: '1rem', color: '#64748b', fontSize: '0.875rem' }}>
                  This guide provides general information only and does not constitute legal or
                  financial advice. For complex disputes involving large amounts, consider
                  consulting a lawyer or public loss assessor who specialises in property insurance
                  claims.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'How long does an insurer have to decide on my claim?',
            answer:
              'Under the General Insurance Code of Practice, your insurer must decide on your claim within four months of receiving the claim, or explain in writing why more time is needed. For straightforward claims, insurers aim to decide within 10 business days of receiving all relevant information. If your insurer misses these timeframes without explanation, you can complain through IDR immediately.',
          },
          {
            question: 'Can I start repairs before my insurer approves my claim?',
            answer:
              'Yes — you have a duty to mitigate under Section 56 of the Insurance Contracts Act 1984. This means you must take reasonable steps to prevent further damage. Make-safe work (tarping, water extraction, drying) can proceed before approval. Keep all receipts and contractor documentation. These reasonable mitigation costs are claimable.',
          },
          {
            question: 'What is an IDR complaint and how do I lodge one?',
            answer:
              'IDR stands for Internal Dispute Resolution — the formal complaints process every insurer is required to maintain. To lodge one, contact your insurer in writing (email is acceptable), state you are making a formal complaint about the delay, include your claim number and a clear description of what has not happened and by when. The insurer must respond to your IDR complaint within 30 calendar days.',
          },
          {
            question: 'When can I go to AFCA about a delay?',
            answer:
              "You can go to AFCA after receiving the insurer's IDR response (if you are not satisfied), or if the insurer has not responded to your IDR complaint within 30 calendar days. AFCA is free for complainants. You have two years from the date of the IDR response to lodge. AFCA can order the insurer to decide your claim and may award interest for unreasonable delay.",
          },
          {
            question: 'What can AFCA do about an insurer that is slow?',
            answer:
              'Where AFCA finds the insurer has unreasonably delayed, it can order the claim to be decided within a specific timeframe, award interest on amounts owed for the delay period, and order compensation for non-financial loss (distress and inconvenience) up to $5,500. In 2025, AFCA secured $643 million in compensation across all complaints — a 120% increase on the prior year.',
          },
          {
            question: 'Does the General Insurance Code of Practice have legal force?',
            answer:
              "Yes. The General Insurance Code of Practice is enforceable through the Insurance Council of Australia. Breaches can result in sanctions, public reporting, and compensation to affected policyholders. AFCA also applies the Code when determining whether an insurer's conduct was fair and reasonable.",
          },
        ]}
        relatedGuides={[
          {
            title: 'How to Lodge an AFCA Complaint Against Your Insurer',
            href: '/guides/insurance/afca-complaint-guide',
            description:
              'The complete AFCA complaint process — IDR first, then AFCA: what information you need, timeframes, and what AFCA can order.',
          },
          {
            title: 'The Real Cost of Insurance Delays',
            href: '/guides/insurance/real-cost-insurance-delays',
            description:
              'How insurer delays compound property damage costs and what Section 54 and Section 56 of the Insurance Contracts Act protect.',
          },
          {
            title: 'What to Do When Your Insurance Claim Is Denied',
            href: '/guides/insurance/insurance-claim-denial-rights',
            description:
              'Your rights when an insurer refuses your claim — written reasons, IDR, AFCA escalation, and how to challenge common denial grounds.',
          },
        ]}
        cta={{ text: 'Get Emergency Help', href: '/claim' }}
      />
    </>
  );
}
