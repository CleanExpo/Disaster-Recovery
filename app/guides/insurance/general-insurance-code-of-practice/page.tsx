import { Metadata } from 'next';
import { BookOpen } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'General Insurance Code of Practice — Policyholder Rights in Australia',
  description:
    'What the General Insurance Code of Practice 2020 requires of ICA member insurers, key policyholder rights, claim decision timeframes, vulnerable customer protections, and how to escalate to AFCA.',
  keywords:
    'General Insurance Code of Practice 2020, policyholder rights Australia, GICP, ICA member obligations, AFCA escalation, insurance IDR timeframes, vulnerable customer insurance, insurance complaint Australia',
  alternates: {
    canonical: `${NAP.url}/guides/insurance/general-insurance-code-of-practice`,
  },
};

export default function GeneralInsuranceCodeOfPracticePage() {
  return (
    <AgGuidePageTemplate
      category="Insurance"
      title="General Insurance Code of Practice — Policyholder Rights"
      subtitle="What ICA member insurers are required to do, key claim timeframes, vulnerable customer protections, and the AFCA escalation pathway"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #1D4ED8 100%)"
      icon={<BookOpen className="h-10 w-10" />}
      lastReviewed="2026-04-08"
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'General Insurance Code of Practice' },
      ]}
      sections={[
        {
          heading: 'What Is the General Insurance Code of Practice?',
          body: (
            <>
              <p>
                The General Insurance Code of Practice (GICP) is a voluntary industry code
                developed by the Insurance Council of Australia (ICA) that sets minimum standards
                for how member insurers must treat their customers. The 2020 version of the Code
                — the current version — significantly expanded policyholder protections compared
                to its predecessors, with stronger provisions around claim timeframes, vulnerable
                customers, and complaints handling.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The Code is binding on ICA member insurers, which includes most of Australia&apos;s
                major general insurers. When an insurer subscribes to the Code, compliance becomes
                a contractual obligation — and breaches of the Code can be referred to the
                Australian Financial Complaints Authority (AFCA) and, in systemic cases, to ASIC.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The Code covers a wide range of general insurance products, including home and
                contents, motor, travel, and commercial insurance. It does not cover life
                insurance, health insurance, or products governed by other industry codes. For
                those products, separate codes apply.
              </p>
              <p style={{ marginTop: '1rem' }}>
                You can verify whether your insurer is a Code subscriber and access the full text
                of the Code on the Insurance Council of Australia&apos;s website at{' '}
                <strong>insurancecouncil.com.au</strong>.
              </p>
            </>
          ),
        },
        {
          heading: 'Key Policyholder Rights Under the Code',
          body: (
            <>
              <p>
                The GICP creates a range of specific rights for policyholders. The most practically
                important for claimants dealing with disaster recovery are:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>10-day cooling-off period:</strong> For most retail insurance products,
                  policyholders have a 10-business-day cooling-off period after purchasing a policy
                  or renewing on different terms. During this period, you can cancel without
                  penalty as long as no claim has been made. This right is separate from and
                  additional to any rights under the Corporations Act.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Internal dispute resolution (IDR) — 30-day timeframe:</strong> When you
                  lodge a complaint with your insurer, the insurer must respond with its IDR
                  decision within 30 calendar days for most complaints. For complaints involving
                  complex investigations, the insurer may request an extension — but must give
                  reasons and advise you of your right to escalate to AFCA if you are not satisfied
                  with the extension request.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Claim decision — 10 business days for straightforward claims:</strong>{' '}
                  For claims that the insurer accepts are straightforward, the insurer must make
                  a claim decision within 10 business days of receiving all required documentation.
                  Where additional investigation is required, the insurer must keep you informed
                  of progress at least every 20 business days.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Written reasons for decisions:</strong> If your insurer declines your
                  claim, reduces payment, or imposes conditions, you are entitled to the reasons
                  for that decision in writing. The reasons must be specific enough to allow you
                  to assess whether the decision is consistent with your policy terms.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Independent repair assessments:</strong> The Code includes provisions
                  entitling policyholders to seek an independent assessment of repair costs
                  where there is a dispute about scope or pricing. This right is practically
                  significant in managed repair situations where the insurer&apos;s preferred
                  contractor and the policyholder disagree about what work is needed.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Hardship assistance:</strong> Insurers must have processes to identify
                  and assist customers experiencing financial hardship as a result of a claim
                  shortfall, payment difficulty, or disaster circumstances. This includes
                  provisions for interim assistance where a full claim decision has not yet
                  been made.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Vulnerable Customer Provisions — Part 9 of the Code',
          body: (
            <>
              <p>
                Part 9 of the GICP contains specific obligations around customers who are in
                vulnerable circumstances. The Code defines vulnerability broadly — it is not
                limited to permanent disability or financial disadvantage, and explicitly includes
                situational vulnerability arising from circumstances such as being in the immediate
                aftermath of a natural disaster.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Identifying vulnerability:</strong> The Code requires insurers to train
                  their staff to recognise signs of vulnerability and to adjust their approach
                  accordingly. The obligation is not contingent on the customer formally declaring
                  themselves vulnerable — insurers are expected to identify and respond to
                  apparent vulnerability.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>What vulnerability covers:</strong> The Code identifies a non-exhaustive
                  list of circumstances that may indicate vulnerability, including: recent trauma
                  (such as loss of property in a disaster), cognitive impairment, language
                  barriers, domestic and family violence, financial stress, age, and health
                  conditions affecting decision-making capacity.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Support obligations:</strong> Where vulnerability is identified,
                  insurers must make reasonable adjustments to their processes — for example,
                  allowing more time for decisions, accepting communication through a support
                  person, providing information in alternative formats, and avoiding high-pressure
                  tactics. Urgency and pressure are specifically prohibited in interactions with
                  vulnerable customers.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Referral to support services:</strong> Insurers must have the ability
                  to refer customers to relevant support services — including financial counselling,
                  legal aid, and crisis services — where appropriate. This obligation applies
                  throughout the claims process, not just at point of sale.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                If you believe an insurer failed to respond appropriately to circumstances that
                indicated vulnerability, this is a specific ground for a complaint under the Code
                and a basis for an AFCA dispute.
              </p>
            </>
          ),
        },
        {
          heading: 'What Happens When an Insurer Breaches the Code',
          body: (
            <>
              <p>
                Code breaches are handled through a combination of internal complaints processes,
                AFCA dispute resolution, and — for systemic issues — the Code Governance Committee
                (CGC) and ASIC.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Internal complaints first:</strong> Before escalating to AFCA, you must
                  have lodged a complaint with the insurer&apos;s internal dispute resolution
                  process and either received an unsatisfactory response or waited the relevant
                  IDR timeframe (generally 30 days) without resolution. Keep a written record of
                  the date you lodged the complaint and all subsequent communications.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>AFCA referral:</strong> AFCA can consider whether an insurer has
                  complied with its Code obligations as part of a complaint. A Code breach does
                  not automatically mean the insurer must pay more — but it is directly relevant
                  to AFCA&apos;s assessment of whether the insurer acted fairly and in accordance
                  with good industry practice. AFCA can order insurers to pay compensation for
                  non-financial loss, including distress and inconvenience caused by poor claims
                  handling.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Code Governance Committee:</strong> The CGC monitors insurer compliance
                  with the Code and can sanction member insurers. Sanctions range from remediation
                  requirements to public naming. The CGC publishes annual reports on Code
                  compliance that include aggregate data on breach types — useful context for
                  understanding whether the conduct you experienced is systemic.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>ASIC for systemic breaches:</strong> ASIC can investigate and take
                  enforcement action where insurer conduct constitutes a systemic breach of the
                  Code combined with a breach of the Corporations Act or the ASIC Act. ASIC
                  enforcement can result in licence conditions, enforceable undertakings, or
                  civil penalty proceedings.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Using the Code to Push Back on Delayed or Disputed Claims',
          body: (
            <>
              <p>
                Knowledge of your Code rights gives you a practical tool in claims disputes. When
                an insurer is slow, unresponsive, or unreasonable, citing the Code in your
                communications puts the insurer on notice that you are aware of its obligations —
                and creates a documented record for any subsequent AFCA complaint.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Write, don&apos;t call:</strong> Create a written record of every
                  material interaction. If the insurer has exceeded the 10-business-day decision
                  timeframe for a straightforward claim, or has not updated you within the 20
                  business day progress update window, write to the insurer citing the Code
                  provisions and requesting a response within a specified period.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Request written reasons:</strong> If your claim is declined or reduced,
                  request written reasons in specific terms. If the reasons are vague or do not
                  address your policy terms, write back requesting clarification and reference the
                  Code obligation to provide specific reasons.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Escalate internally first:</strong> If your case manager is unresponsive,
                  escalate within the insurer — ask to speak to a supervisor and lodge a formal
                  complaint through the insurer&apos;s IDR process. This starts the 30-day IDR
                  clock and creates the formal record needed for AFCA.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Keep everything:</strong> Save all written communications,
                  correspondence, assessments, and your own notes of verbal interactions (date,
                  time, who you spoke to, what was said). This documentation is essential if you
                  proceed to AFCA.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'The AFCA Escalation Pathway — When to Escalate and What AFCA Can Order',
          body: (
            <>
              <p>
                AFCA is Australia&apos;s free external dispute resolution service for financial
                complaints, including insurance disputes. Once you have completed the insurer&apos;s
                IDR process (or the 30-day window has passed), you can lodge a complaint with AFCA
                at <strong>afca.org.au</strong>.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>When to escalate:</strong> You can escalate to AFCA when you have
                  received the insurer&apos;s IDR decision and are not satisfied with it, or when
                  the IDR timeframe has elapsed without a decision. You do not need to wait for
                  the 30 days in all circumstances — certain urgent matters (such as someone
                  without shelter due to a home loss) can be escalated earlier on hardship grounds.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>What AFCA considers:</strong> AFCA assesses complaints against the
                  insurer&apos;s policy terms, applicable law, the General Insurance Code of
                  Practice, and general principles of fairness and good industry practice. This
                  means AFCA can find against an insurer even where the insurer has technically
                  complied with its policy terms, if its conduct was unfair in the circumstances.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>What AFCA can order:</strong> AFCA can direct an insurer to: pay a
                  claim it declined, pay a higher amount, re-assess or reinspect, vary its
                  decision, and pay compensation for non-financial loss (distress and
                  inconvenience). Monetary limits apply — for insurance, the limit on monetary
                  awards is $1,085,000 for most complainants as at the 2026 limits. AFCA cannot
                  order an insurer to act outside its policy terms, but it can hold the insurer
                  to a fair interpretation of those terms.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>AFCA determinations are binding:</strong> If you accept AFCA&apos;s
                  determination, it is binding on the insurer. You are not bound by it — you can
                  reject a determination and pursue court proceedings instead, but in practice
                  AFCA resolution is faster and cheaper than litigation for most insurance
                  disputes.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                This guide is informational and does not constitute legal or financial advice.
                If your claim dispute is large or complex, consider seeking independent legal
                advice before accepting any settlement or AFCA determination.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Is every Australian insurer bound by the General Insurance Code of Practice?',
          answer:
            'The Code is binding on ICA member insurers who have subscribed to it. Most major Australian general insurers are subscribers. You can check whether your insurer is a Code subscriber on the Insurance Council of Australia website at insurancecouncil.com.au. Foreign insurers, smaller niche providers, and some Lloyd\'s syndicates may not be subscribers.',
        },
        {
          question: 'How long does my insurer have to decide my claim?',
          answer:
            'For straightforward claims where all required documentation has been provided, the Code requires a decision within 10 business days. Where additional investigation is required, the insurer must keep you updated at least every 20 business days. If your claim is complex (for example, involving a total loss or disputed scope), the timeframe may be longer — but the insurer must still provide regular updates and not simply go silent.',
        },
        {
          question: 'What is the IDR timeframe for insurance complaints?',
          answer:
            'When you lodge a formal complaint through the insurer\'s internal dispute resolution process, the insurer has 30 calendar days to provide a written response. If the insurer needs more time due to complexity, it must notify you, give reasons, and advise you of your right to escalate to AFCA. If you have not received a response within 30 days, you can go to AFCA without waiting further.',
        },
        {
          question: 'What can I do if my insurer is ignoring my claim?',
          answer:
            'Write formally to the insurer — email is sufficient — citing the Code obligation to update you within 20 business days and requesting an update by a specific date. If there is no satisfactory response, lodge a formal complaint through the insurer\'s IDR process. If that does not resolve matters within 30 days, escalate to AFCA. Document every step.',
        },
        {
          question: 'Can AFCA help if my insurer underpaid my claim?',
          answer:
            'Yes. AFCA can consider disputes about claim quantum — whether the amount paid was correct under the policy terms. Bring your own independent assessment of the loss or repair cost as evidence. AFCA can order the insurer to increase the payment if it finds the original assessment was wrong. AFCA can also award compensation for distress and inconvenience caused by poor handling.',
        },
        {
          question: 'What are vulnerable customer protections in insurance?',
          answer:
            'Part 9 of the General Insurance Code of Practice requires insurers to identify and respond appropriately to customers in vulnerable circumstances — including people in the immediate aftermath of a disaster. Obligations include adjusting communication approaches, allowing support persons, avoiding pressure tactics, and providing referrals to support services. A failure to meet these obligations is a ground for complaint under the Code and an AFCA dispute.',
        },
      ]}
      relatedGuides={[
        {
          title: 'Insurance Affordability in Australia',
          href: '/guides/insurance/insurance-affordability-australia',
          description:
            'Why premiums are rising, what under-insurance means in practice, and what to do when coverage falls short.',
        },
        {
          title: 'The Real Cost of Insurance Delays',
          href: '/guides/insurance/real-cost-insurance-delays',
          description:
            'How insurer delays compound disaster costs and what your rights are under the Code of Practice.',
        },
        {
          title: 'ACCC s28B Unfair Trading Practices',
          href: '/guides/compliance/accc-s28b-unfair-trading-practices',
          description:
            'The proposed ACL amendment, the five prohibited conduct categories, and what it means for insurance claimants.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
