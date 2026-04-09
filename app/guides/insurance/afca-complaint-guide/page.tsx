import { Metadata } from 'next';
import { Scale } from 'lucide-react';
import Script from 'next/script';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'How to Lodge an AFCA Complaint Against Your Insurer — Step by Step',
  description:
    'A step-by-step guide to lodging an AFCA complaint against your insurer in Australia — from IDR to AFCA, what information you need, timeframes, and what AFCA can order.',
  keywords:
    'AFCA complaint insurer, lodge AFCA complaint, Australian Financial Complaints Authority, IDR insurance dispute, insurance dispute resolution Australia, AFCA timeframes, insurance complaint process',
  alternates: {
    canonical:
      'https://disasterrecovery.com.au/guides/insurance/afca-complaint-guide',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Do I have to pay to lodge an AFCA complaint?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. AFCA is free for complainants. There are no fees to lodge a complaint, no ongoing charges, and no cost recovery if the complaint is unsuccessful. Insurers pay a fee to AFCA \u2014 not consumers.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I have to try my insurer\u2019s IDR process before going to AFCA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generally yes. AFCA requires that you give your insurer a reasonable opportunity to resolve the dispute through their Internal Dispute Resolution (IDR) process before you lodge with AFCA. Under the General Insurance Code of Practice, your insurer must provide a final IDR response within 30 calendar days of your complaint. You can go directly to AFCA if the insurer does not respond within that timeframe.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does the AFCA process take?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Timeframes vary depending on complexity. AFCA aims to resolve straightforward complaints within 30\u201360 days. Complex property insurance disputes involving expert evidence, large amounts, or policy interpretation questions can take six to twelve months. AFCA publishes average handling times for different complaint types in its annual review.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the maximum amount AFCA can award for a property insurance dispute?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'For property damage claims by individuals, AFCA can currently award up to $1,085,000. This limit is reviewed periodically. For non-financial loss (distress and inconvenience), the compensation cap is $5,500. These figures reflect AFCA\u2019s published monetary limits and are subject to change.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can my insurer refuse to comply with an AFCA decision?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. AFCA decisions that you accept are binding on the insurer. The insurer cannot refuse to comply. If an insurer does not comply with an AFCA determination, AFCA can refer the matter to ASIC and take enforcement action. You retain the right to not accept an AFCA determination and to pursue the matter through the courts instead.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I go to court instead of using AFCA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. AFCA is a voluntary external dispute resolution scheme \u2014 it does not prevent you from pursuing legal action. However, courts are typically slower, more expensive, and require legal representation. For most property insurance disputes within AFCA\u2019s monetary limits, AFCA is the more practical avenue.',
      },
    },
  ],
};

export default function AFCAComplaintGuidePage() {
  return (
    <>
      <Script
        id="afca-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
      category="Insurance"
      title="How to Lodge an AFCA Complaint Against Your Insurer"
      subtitle="Step by step: internal dispute resolution first, then AFCA — what you need, timeframes, and what AFCA can order"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Scale className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'AFCA Complaint Guide' },
      ]}
      sections={[
        {
          heading: 'What Is AFCA and When Can You Use It?',
          body: (
            <>
              <p>
                The Australian Financial Complaints Authority (AFCA) is the national external
                dispute resolution (EDR) scheme for financial services in Australia, including
                general insurance. It replaced the Financial Ombudsman Service, the Credit and
                Investments Ombudsman, and the Superannuation Complaints Tribunal in 2018.
              </p>
              <p style={{ marginTop: '1rem' }}>
                AFCA is <strong>free for complainants</strong>. There is no cost to lodge a
                complaint, regardless of the amount in dispute or the outcome. Insurers pay a
                fee to belong to and use AFCA — consumers do not.
              </p>
              <p style={{ marginTop: '1rem' }}>
                AFCA can deal with disputes between consumers and their insurers about:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Claim denials</strong> — your insurer refused your claim in full or
                  in part
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Claim delays</strong> — your insurer has taken an unreasonable time
                  to assess, decide on, or pay your claim
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Scope disputes</strong> — you disagree with the scope of repairs or
                  the amount the insurer is prepared to pay
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Policy interpretation</strong> — a dispute about what your policy
                  covers or how an exclusion applies
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Policy cancellation</strong> — your insurer cancelled or voided your
                  policy and you dispute their right to do so
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Premium and fee disputes</strong> — including disputes about the
                  basis on which a premium was calculated
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                AFCA can consider complaints from individuals (including sole traders) and small
                businesses with a turnover under $5 million and fewer than 100 full-time
                equivalent employees. For property damage claims, the maximum award AFCA can
                make is <strong>$1,085,000 for individuals</strong> (as at the current financial
                year). This limit is reviewed periodically.
              </p>
            </>
          ),
        },
        {
          heading: 'Step 1: Use Your Insurer\'s Internal Dispute Resolution (IDR) Process First',
          body: (
            <>
              <p>
                Before you can lodge an AFCA complaint, you must first give your insurer a
                reasonable opportunity to resolve the dispute through their own{' '}
                <strong>Internal Dispute Resolution (IDR)</strong> process. This is a
                requirement under AFCA&apos;s rules, the General Insurance Code of Practice,
                and ASIC Regulatory Guide 271.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Under the General Insurance Code of Practice, insurers are required to:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  Have a free and accessible IDR process
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Acknowledge your IDR complaint within 15 business days
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Provide a final IDR response within <strong>30 calendar days</strong> of
                  receiving your complaint
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Inform you of your right to escalate to AFCA if you are not satisfied with
                  the IDR response
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                To use IDR: contact your insurer in writing (email is acceptable) and clearly
                state that you are lodging a formal complaint. Reference your claim number,
                describe the dispute, and state the outcome you are seeking. Keep a copy of
                everything you send and receive.
              </p>
              <p style={{ marginTop: '1rem' }}>
                You can proceed directly to AFCA without completing IDR in the following
                circumstances: the insurer has not responded within 30 days; the insurer has
                agreed to waive the IDR requirement; or the dispute involves a matter where IDR
                would cause you undue hardship (for example, financial hardship requiring
                urgent payment).
              </p>
            </>
          ),
        },
        {
          heading: 'Step 2: Lodge Your AFCA Complaint',
          body: (
            <>
              <p>
                Once you have received an IDR response you are not satisfied with (or the 30-day
                IDR period has elapsed without a response), you can lodge a complaint with AFCA.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>How to lodge:</strong> AFCA accepts complaints online at{' '}
                <a
                  href="https://www.afca.org.au"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  afca.org.au
                </a>
                , by phone, or by post. The online form is the fastest method and allows you to
                attach supporting documents at lodgement.
              </p>
              <p style={{ marginTop: '1rem' }}>
                <strong>Timeframe to lodge:</strong> You must lodge your AFCA complaint within
                two years of receiving your insurer&apos;s IDR response. Do not delay —
                evidence quality and witness recall deteriorate over time.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Your contact details</strong> — full name, address, email, and phone
                  number
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>The insurer&apos;s name and your policy/claim number</strong> — found
                  on your policy schedule or claim correspondence
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>A clear description of the dispute</strong> — what happened, what your
                  insurer decided, and why you disagree
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>The outcome you are seeking</strong> — for example, payment of the
                  claim in full, a revised scope of repairs, or compensation for delay
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Your IDR response</strong> — a copy of the written response your
                  insurer gave you at the end of IDR
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Supporting documents</strong> — photos, contractor quotes, the policy
                  Product Disclosure Statement (PDS), your claim correspondence, any assessor
                  reports, and any independent assessment you have obtained
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'AFCA Process: What Happens After You Lodge',
          body: (
            <>
              <p>
                AFCA&apos;s process moves through several stages. Not all complaints proceed
                through every stage — many are resolved early.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Registration and initial review:</strong> AFCA registers your complaint
                  and carries out an initial assessment to confirm it is within their jurisdiction.
                  They may contact you or the insurer for clarification.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Referral back to the insurer:</strong> AFCA usually refers the complaint
                  to the insurer first and gives them a short period to resolve it directly with
                  you. Many disputes are resolved at this stage.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Casework and negotiation:</strong> If the complaint is not resolved in
                  the referral stage, AFCA assigns a case manager who facilitates negotiation
                  between you and the insurer. Both parties submit their positions and supporting
                  evidence.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Conciliation:</strong> AFCA may conduct a conciliation — a structured
                  discussion aimed at reaching a negotiated settlement. This can be by phone or
                  video conference.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Decision:</strong> If conciliation does not resolve the dispute, AFCA
                  makes a formal decision. Decisions are binding on the insurer if you accept them
                  (you are not required to accept a decision). Insurers can only appeal a decision
                  on very limited procedural grounds.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                <strong>Timeframes:</strong> AFCA aims to resolve most complaints within 30–60
                days for straightforward matters. Complex disputes — particularly those involving
                large property claims with expert evidence — may take six to twelve months.
                AFCA publishes average handling times in its annual review.
              </p>
            </>
          ),
        },
        {
          heading: 'Common Reasons Insurance Claims Go to AFCA',
          body: (
            <>
              <p>
                AFCA&apos;s published annual review data shows that general insurance complaints
                — particularly home building and contents insurance — are consistently among the
                largest categories it receives. The most common reasons property insurance
                disputes reach AFCA include:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Denial without adequate reasons:</strong> Insurers are required under
                  the Insurance Contracts Act and the General Insurance Code of Practice to provide
                  written reasons for a claim denial. Where reasons are not given, or are vague
                  or inconsistent, the denial is vulnerable to AFCA review.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Scope disputes and inadequate repair offers:</strong> The insurer
                  accepts liability but the scope of works or the quantum offered is disputed.
                  This is particularly common after major natural disasters when insurer-managed
                  repair networks are stretched.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Unreasonable delay in assessing or paying claims:</strong> The General
                  Insurance Code of Practice sets maximum timeframes for claim decisions. Where
                  insurers exceed these without adequate justification, AFCA can order the claim
                  be decided and may award interest or compensation.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Application of exclusions the policyholder disputes:</strong> Common
                  exclusions disputed at AFCA include wear and tear, gradual deterioration,
                  pre-existing conditions, and the maintenance exclusion. AFCA examines whether
                  the exclusion was correctly interpreted and applied.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Non-disclosure and misrepresentation decisions:</strong> Where an
                  insurer refuses to pay based on non-disclosure or misrepresentation, AFCA
                  examines whether the insurer has met its obligations under the Insurance
                  Contracts Act before voiding or reducing the claim.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'What AFCA Can Order',
          body: (
            <>
              <p>
                Where AFCA finds in favour of a complainant, it can make a range of orders
                against the insurer. Understanding what remedies are available helps you frame
                the outcome you are seeking when you lodge.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Payment of the claim:</strong> AFCA can order the insurer to pay
                  the claim amount in full or in part, up to the monetary limit applicable to
                  your complaint type. For property damage claims by individuals, the limit is
                  currently <strong>$1,085,000</strong>.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Performance of the policy:</strong> AFCA can order the insurer to
                  carry out repairs or restoration work rather than making a cash payment —
                  which may be appropriate where the insurer agreed to manage repairs but has
                  failed to do so adequately.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Interest on delayed payments:</strong> Where the insurer unreasonably
                  delayed paying a valid claim, AFCA can award interest on the amount owed for
                  the period of delay.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Compensation for non-financial loss:</strong> AFCA can award
                  compensation for distress, inconvenience, and other non-financial loss caused
                  by the insurer&apos;s conduct. This is subject to a separate compensation cap
                  of $5,500.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Refund of policy premiums:</strong> Where a policy was incorrectly
                  voided or cancelled, AFCA can order refund of premiums.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Correction of insurer conduct:</strong> AFCA can order the insurer
                  to take specific remedial steps — for example, to provide a proper written
                  reasons letter, or to reinstate a cancelled policy.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                AFCA decisions are binding on the insurer if you accept them. You are not
                required to accept an AFCA determination — you retain the right to pursue the
                matter through the courts if you do not accept AFCA&apos;s outcome.
              </p>
            </>
          ),
        },
        {
          heading: 'How an Independent Restoration Assessment Supports Your AFCA Complaint',
          body: (
            <>
              <p>
                One of the most effective ways to strengthen an AFCA complaint about a scope
                dispute or inadequate claim offer is to obtain an independent assessment of the
                damage and the cost of restoration from a qualified contractor.
              </p>
              <p style={{ marginTop: '1rem' }}>
                An independent scope of works provides AFCA with a technically credible
                alternative view of the required repairs and their cost. It is particularly
                valuable where the insurer&apos;s assessor and your own view of the damage differ
                significantly. AFCA can and does prefer independent evidence over insurer-engaged
                assessors where the independent evidence is well-documented and credible.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The Disaster Recovery platform connects property owners with IICRC-certified
                restoration contractors who can provide professional scope of works assessments.
                These assessments are itemised, transparent, and prepared by contractors who
                understand the insurance documentation process. Obtaining an independent scope
                before or during your AFCA complaint gives your position a factual basis beyond
                your own account of the damage.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This guide provides general information only. It does not constitute legal advice.
                For complex disputes involving large amounts, consider consulting a lawyer or
                public loss assessor who specialises in insurance claims.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Do I have to pay to lodge an AFCA complaint?',
          answer:
            'No. AFCA is free for complainants. There are no fees to lodge a complaint, no ongoing charges, and no cost recovery if the complaint is unsuccessful. Insurers pay a fee to AFCA — not consumers.',
        },
        {
          question: 'Do I have to try my insurer\'s IDR process before going to AFCA?',
          answer:
            'Generally yes. AFCA requires that you give your insurer a reasonable opportunity to resolve the dispute through their Internal Dispute Resolution (IDR) process before you lodge with AFCA. Under the General Insurance Code of Practice, your insurer must provide a final IDR response within 30 calendar days of your complaint. You can go directly to AFCA if the insurer does not respond within that timeframe.',
        },
        {
          question: 'How long does the AFCA process take?',
          answer:
            'Timeframes vary depending on complexity. AFCA aims to resolve straightforward complaints within 30–60 days. Complex property insurance disputes involving expert evidence, large amounts, or policy interpretation questions can take six to twelve months. AFCA publishes average handling times for different complaint types in its annual review.',
        },
        {
          question: 'What is the maximum amount AFCA can award for a property insurance dispute?',
          answer:
            'For property damage claims by individuals, AFCA can currently award up to $1,085,000. This limit is reviewed periodically. For non-financial loss (distress and inconvenience), the compensation cap is $5,500. These figures reflect AFCA\'s published monetary limits and are subject to change.',
        },
        {
          question: 'Can my insurer refuse to comply with an AFCA decision?',
          answer:
            'No. AFCA decisions that you accept are binding on the insurer. The insurer cannot refuse to comply. If an insurer does not comply with an AFCA determination, AFCA can refer the matter to ASIC and take enforcement action. You retain the right to not accept an AFCA determination and to pursue the matter through the courts instead.',
        },
        {
          question: 'Can I go to court instead of using AFCA?',
          answer:
            'Yes. AFCA is a voluntary external dispute resolution scheme — it does not prevent you from pursuing legal action. However, courts are typically slower, more expensive, and require legal representation. For most property insurance disputes within AFCA\'s monetary limits, AFCA is the more practical avenue.',
        },
      ]}
      relatedGuides={[
        {
          title: 'What to Do When Your Insurance Claim Is Denied',
          href: '/guides/insurance/insurance-claim-denial-rights',
          description:
            'Your rights when an insurer denies your claim — written reasons, IDR, AFCA escalation, and how to challenge common denial grounds.',
        },
        {
          title: 'Insurance Affordability in Australia',
          href: '/guides/insurance/insurance-affordability-australia',
          description:
            'Why home and contents insurance premiums are rising in Australia and what to do when coverage falls short.',
        },
        {
          title: 'The Real Cost of Insurance Delays',
          href: '/guides/insurance/real-cost-insurance-delays',
          description:
            'How insurer delays compound disaster costs and what your rights are under the Code of Practice.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
    </>
  );
}
