import { Metadata } from 'next';
import { ShieldAlert } from 'lucide-react';
import Script from 'next/script';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'What to Do When Your Insurance Claim Is Denied in Australia',
  description:
    'Your rights when an insurer denies your property damage claim in Australia — written reasons, IDR within 30 days, AFCA escalation, Section 54 of the Insurance Contracts Act, and how to challenge common denial grounds.',
  keywords:
    'insurance claim denied Australia, insurance claim denial rights, IDR insurance, AFCA claim denial, Section 54 Insurance Contracts Act, wear and tear exclusion, pre-existing condition insurance, challenge insurance denial',
  alternates: {
    canonical:
      'https://disasterrecovery.com.au/guides/insurance/insurance-claim-denial-rights',
  },
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Can my insurer refuse my claim without giving reasons?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'No. Under clause 77 of the General Insurance Code of Practice, insurers must give you written reasons when they refuse a claim, reduce a claim, or refuse a particular remedy. The reasons must be specific and reference the relevant policy terms or legislative provisions. If your insurer has refused your claim without specific reasons, the refusal of reasons is itself a breach of the Code and a ground for an IDR complaint.',
      },
    },
    {
      '@type': 'Question',
      name: 'How long does my insurer have to respond to an IDR complaint?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under the General Insurance Code of Practice, your insurer must provide a final IDR response within 30 calendar days of receiving your complaint. If they do not respond within that timeframe, you can proceed to lodge a complaint with AFCA without waiting for their response.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can my insurer refuse my whole claim because I notified them late?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Generally no. Section 54 of the Insurance Contracts Act 1984 (Cth) prevents an insurer from refusing a claim entirely based on late notification unless the insurer can show that the delay caused it actual prejudice \u2014 for example, that it was unable to investigate the loss because of the delay. Delay alone is not a ground to refuse the entire claim. If your claim was refused on this basis, it is worth disputing through IDR and AFCA.',
      },
    },
    {
      '@type': 'Question',
      name: 'My insurer is blaming wear and tear. Can I challenge that?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The wear and tear exclusion typically applies only where wear and tear is the proximate (primary) cause of the loss \u2014 not merely a contributing background factor. Where a sudden covered event (a storm, burst pipe, or fire) caused the damage, the exclusion may not apply even if the property had some pre-existing deterioration. An independent contractor assessment documenting the cause of the damage is valuable evidence in this type of dispute. AFCA has a track record of finding against insurers who incorrectly applied the wear and tear exclusion.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is Section 54 of the Insurance Contracts Act?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Section 54 of the Insurance Contracts Act 1984 (Cth) is a key consumer protection that limits an insurer\u2019s ability to refuse a claim based on something the policyholder did or failed to do after the policy was entered into. The insurer can only refuse or reduce the claim to the extent that the act or omission actually caused or contributed to the loss. If the breach was unrelated to the loss, the insurer cannot refuse the claim on that basis.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can Disaster Recovery help if my insurer has denied my claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'The Disaster Recovery platform connects you with vetted, IICRC-certified restoration contractors who can provide independent, itemised assessments of your property damage. These assessments document the cause, extent, and cost of damage in a format that supports IDR and AFCA complaints. Getting an independent assessment before or during your dispute gives you evidence beyond your own account of the damage. Note that Disaster Recovery connects you with contractors \u2014 it does not provide legal advice or act as a claims advocate.',
      },
    },
  ],
};

export default function InsuranceClaimDenialRightsPage() {
  return (
    <>
      <Script
        id="insdenial-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
      category="Insurance"
      title="What to Do When Your Insurance Claim Is Denied in Australia"
      subtitle="Your rights, the dispute process, and how to challenge common denial grounds including wear and tear, pre-existing conditions, and non-disclosure"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<ShieldAlert className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'Insurance Claim Denial Rights' },
      ]}
      sections={[
        {
          heading: 'Your Rights When a Claim Is Denied',
          body: (
            <>
              <p>
                Having a property damage claim denied is a stressful experience — but a denial
                is not necessarily final. Australian law gives policyholders a set of procedural
                rights that apply when an insurer refuses a claim, and understanding those rights
                is the first step to challenging a denial effectively.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Right to written reasons (General Insurance Code of Practice,
                  clause 77):</strong> When an insurer refuses a claim, reduces a claim, or
                  refuses to provide a particular remedy, they must give you written reasons for
                  their decision. The reasons must be specific and must reference the relevant
                  policy terms, exclusions, or legislative provisions that support the decision.
                  A vague or generic refusal without specific reasons is itself a breach of the
                  Code that can be raised in a dispute.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Right to Internal Dispute Resolution (IDR):</strong> You have the
                  right to formally dispute any claim decision through your insurer&apos;s IDR
                  process. Under the General Insurance Code of Practice, your insurer must
                  provide a final IDR response within <strong>30 calendar days</strong> of
                  receiving your complaint. The IDR process is free and is a required step
                  before escalating to AFCA.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Right to escalate to AFCA:</strong> If you are not satisfied with the
                  IDR outcome, you can lodge a complaint with the Australian Financial Complaints
                  Authority (AFCA). AFCA is free for complainants and can make binding decisions
                  on the insurer up to $1,085,000 for individual property claims.
                </li>
                <li style={{ marginBottom: '0.75rem' }}>
                  <strong>Right to obtain an independent assessment:</strong> You are not
                  required to accept your insurer&apos;s assessment of the damage or its value.
                  You can commission your own independent assessment from a qualified restoration
                  contractor or building professional.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Challenging Common Denial Grounds',
          body: (
            <>
              <p>
                Insurers rely on a limited number of grounds to deny property damage claims.
                Understanding how each ground works — and where it can be challenged — gives you
                a clearer picture of whether to pursue a dispute.
              </p>

              <h3 style={{ fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                Wear and Tear / Gradual Deterioration
              </h3>
              <p>
                Most home and property policies exclude damage caused by wear and tear, gradual
                deterioration, or lack of maintenance. Insurers apply this exclusion when they
                argue that the damage was a pre-existing or progressive condition rather than a
                sudden, defined event.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                How to challenge it: The exclusion typically applies only where the wear and
                tear is the <em>proximate cause</em> of the loss — not merely a contributing
                factor. Where a sudden event (a storm, a burst pipe, a fire) causes damage to a
                building that already had some pre-existing deterioration, the exclusion may not
                apply to the entire claim. AFCA has found in numerous determinations that
                insurers incorrectly applied the wear and tear exclusion to damage that was
                principally caused by a covered event. An independent contractor assessment that
                identifies the specific causal mechanism of the damage is valuable evidence in
                this type of dispute.
              </p>

              <h3 style={{ fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                Pre-Existing Condition
              </h3>
              <p>
                The pre-existing condition exclusion is used where the insurer argues that the
                damage existed before the policy was taken out, or before the incident that
                triggered the claim.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                How to challenge it: The insurer carries the burden of demonstrating that the
                condition pre-existed the policy or the covered event. If the insurer is relying
                on a building or engineering report to establish this, you are entitled to obtain
                your own independent report. Where there is conflicting expert evidence, AFCA
                will weigh the evidence and is not required to simply prefer the insurer&apos;s
                expert. Ask your insurer specifically what evidence they are relying on to
                establish the pre-existing condition.
              </p>

              <h3 style={{ fontWeight: 700, marginTop: '1.5rem', marginBottom: '0.5rem' }}>
                Non-Disclosure
              </h3>
              <p>
                Insurers can refuse or reduce a claim where they argue the policyholder failed
                to disclose a material fact at the time the policy was taken out or renewed.
                However, the Insurance Contracts Act 1984 (Cth) places significant limits on
                an insurer&apos;s ability to use non-disclosure as a ground to refuse a claim.
              </p>
              <p style={{ marginTop: '0.75rem' }}>
                How to challenge it: Under the Act, the insurer can only reduce or refuse a
                claim for non-disclosure to the extent that it was actually prejudiced by the
                non-disclosure. If the undisclosed information would not have affected the
                insurer&apos;s decision to offer coverage or would only have resulted in a higher
                premium, the insurer cannot refuse the entire claim — it can only reduce the
                claim amount proportionally. If you believe the insurer has applied the
                non-disclosure provisions incorrectly, this is a strong ground for an IDR
                complaint followed by AFCA escalation.
              </p>
            </>
          ),
        },
        {
          heading: 'Section 54 of the Insurance Contracts Act — The Innocent Breach Provision',
          body: (
            <>
              <p>
                Section 54 of the <em>Insurance Contracts Act 1984</em> (Cth) is one of the
                most important protections for policyholders in Australian insurance law. It
                limits an insurer&apos;s ability to refuse a claim based on an act or omission
                by the insured that occurred <strong>after the policy was entered into</strong>.
              </p>
              <p style={{ marginTop: '1rem' }}>
                The core principle of section 54 is that an insurer cannot refuse to pay a claim
                solely because of something the policyholder did or failed to do during the
                policy period, unless the insurer can demonstrate that the act or omission
                actually caused or contributed to the loss. Where the act or omission did not
                contribute to the loss, the insurer must pay the claim in full.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Common situations where section 54 is relevant include:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Late notification of a claim:</strong> If you notified your insurer of
                  a claim later than the policy required, the insurer cannot refuse the claim
                  entirely under section 54 unless it can show the delay actually caused it
                  prejudice (for example, it was unable to investigate the loss because of the
                  delay). Delay alone is not a ground to refuse.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Breach of a policy condition:</strong> Where you have breached a
                  policy condition (for example, a maintenance obligation or a requirement to
                  use authorised repairers), the insurer cannot refuse the claim entirely unless
                  the breach caused or contributed to the loss. If the breach was unrelated to
                  the cause of the damage, section 54 protects you.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Failure to protect damaged property after an event:</strong> If you
                  failed to take immediate steps to minimise loss after an event (sometimes
                  called the &apos;duty to mitigate&apos;), the insurer can only reduce the
                  claim to the extent that the failure to mitigate actually increased the loss —
                  not refuse the entire claim.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                If your insurer has refused your claim citing something you did or failed to do
                after the policy was entered into, check whether section 54 applies. AFCA is
                familiar with section 54 claims and has a substantial body of decisions applying
                this provision.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This guide provides general information only and does not constitute legal
                advice. Section 54 disputes can involve complex legal analysis — consider
                consulting a lawyer if your claim involves a large amount.
              </p>
            </>
          ),
        },
        {
          heading: 'How to Use the IDR Process Effectively',
          body: (
            <>
              <p>
                Your insurer&apos;s Internal Dispute Resolution process is your first formal
                opportunity to challenge a denial. Using it effectively increases the likelihood
                of resolution without escalating to AFCA.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Lodge in writing:</strong> Send your IDR complaint by email or
                  registered post and keep copies. Address it specifically to the
                  insurer&apos;s complaints team or customer relations department — not to
                  your claims officer.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Be specific about why the decision was wrong:</strong> Reference the
                  specific policy terms, exclusions, or legal provisions you disagree with.
                  Quote the clause number from your Product Disclosure Statement (PDS). Vague
                  complaints that express general dissatisfaction are harder to resolve than
                  specific, reasoned objections.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Attach all supporting evidence:</strong> Include photographs, your
                  independent assessment (if obtained), your own repair quotes, weather bureau
                  data (if relevant to the cause of loss), and any prior correspondence. The
                  IDR officer reviewing your complaint needs evidence, not just your account
                  of what happened.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>State the outcome you want:</strong> Be explicit about what you are
                  asking for — full payment of the claim, a revised scope, an independent
                  assessment, or a specific remedy. IDR officers respond better to a clear ask
                  than to an open-ended expression of grievance.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Note the 30-day clock:</strong> From the date your insurer receives
                  your IDR complaint, they have 30 calendar days to respond. If they do not,
                  you can go to AFCA immediately without waiting for a response.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'Getting an Independent Assessment',
          body: (
            <>
              <p>
                Where your insurer&apos;s reason for denial or reduction is based on their
                assessment of the cause or extent of the damage — rather than a legal or policy
                interpretation question — an independent assessment is one of the most effective
                tools available to you.
              </p>
              <p style={{ marginTop: '1rem' }}>
                An independent assessment from a qualified restoration contractor or building
                professional serves several purposes in a dispute:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  It provides an objective, documented view of the cause and extent of the damage
                  — which may directly contradict the insurer&apos;s assessor&apos;s findings.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  It establishes an independent cost of repair, which is particularly useful in
                  scope disputes where the insurer&apos;s repair offer is lower than the actual
                  cost to restore the property.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  It provides credible expert evidence for AFCA — AFCA considers independent
                  contractor assessments alongside insurer assessments when deciding disputes.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  It gives you a factual basis beyond your own account of the damage, which is
                  important because AFCA and IDR officers are trained to look for corroborating
                  evidence.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                The Disaster Recovery platform connects property owners with vetted,
                IICRC-certified restoration contractors who provide professional, itemised scope
                of works assessments. These assessments document the damage, its likely cause,
                the restoration methodology required, and the cost — in a format that is
                understood by insurers and AFCA.
              </p>
              <p style={{ marginTop: '1rem' }}>
                Note: An independent contractor assessment is not the same as a legal expert
                report. If your dispute involves complex legal questions — particularly about
                section 54, policy interpretation, or large sums — consider also obtaining
                advice from a lawyer or a public loss assessor who specialises in property
                insurance claims.
              </p>
            </>
          ),
        },
        {
          heading: 'Escalating to AFCA After a Denial',
          body: (
            <>
              <p>
                If your IDR complaint does not resolve the dispute, your next step is to lodge
                a complaint with the Australian Financial Complaints Authority (AFCA). AFCA is
                the external dispute resolution scheme for financial services in Australia,
                including general insurance. It is free for complainants and can make binding
                decisions on insurers.
              </p>
              <p style={{ marginTop: '1rem' }}>
                To lodge with AFCA following a claim denial:
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  Lodge online at{' '}
                  <a
                    href="https://www.afca.org.au"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    afca.org.au
                  </a>{' '}
                  — include your policy number, claim number, the insurer&apos;s IDR response,
                  and all supporting documents.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Describe the dispute specifically — reference the exclusion or denial ground
                  the insurer relied on and explain why you believe it was incorrectly applied.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  Attach your independent assessment if you have obtained one.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  State the outcome you want — AFCA can order payment, a revised scope, interest
                  on delayed payments, or compensation for non-financial loss up to $5,500.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                For a detailed guide to the AFCA process — including the stages of review, what
                AFCA can order, and timeframes — see our{' '}
                <a href="/guides/insurance/afca-complaint-guide">
                  AFCA Complaint Guide
                </a>.
              </p>
              <p style={{ marginTop: '1rem' }}>
                This guide provides general information only and does not constitute legal
                advice. If your claim involves a large sum or complex legal issues, consider
                consulting a lawyer who specialises in insurance disputes.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Can my insurer refuse my claim without giving reasons?',
          answer:
            'No. Under clause 77 of the General Insurance Code of Practice, insurers must give you written reasons when they refuse a claim, reduce a claim, or refuse a particular remedy. The reasons must be specific and reference the relevant policy terms or legislative provisions. If your insurer has refused your claim without specific reasons, the refusal of reasons is itself a breach of the Code and a ground for an IDR complaint.',
        },
        {
          question: 'How long does my insurer have to respond to an IDR complaint?',
          answer:
            'Under the General Insurance Code of Practice, your insurer must provide a final IDR response within 30 calendar days of receiving your complaint. If they do not respond within that timeframe, you can proceed to lodge a complaint with AFCA without waiting for their response.',
        },
        {
          question: 'Can my insurer refuse my whole claim because I notified them late?',
          answer:
            'Generally no. Section 54 of the Insurance Contracts Act 1984 (Cth) prevents an insurer from refusing a claim entirely based on late notification unless the insurer can show that the delay caused it actual prejudice — for example, that it was unable to investigate the loss because of the delay. Delay alone is not a ground to refuse the entire claim. If your claim was refused on this basis, it is worth disputing through IDR and AFCA.',
        },
        {
          question: 'My insurer is blaming wear and tear. Can I challenge that?',
          answer:
            'Yes. The wear and tear exclusion typically applies only where wear and tear is the proximate (primary) cause of the loss — not merely a contributing background factor. Where a sudden covered event (a storm, burst pipe, or fire) caused the damage, the exclusion may not apply even if the property had some pre-existing deterioration. An independent contractor assessment documenting the cause of the damage is valuable evidence in this type of dispute. AFCA has a track record of finding against insurers who incorrectly applied the wear and tear exclusion.',
        },
        {
          question: 'What is Section 54 of the Insurance Contracts Act?',
          answer:
            'Section 54 of the Insurance Contracts Act 1984 (Cth) is a key consumer protection that limits an insurer\'s ability to refuse a claim based on something the policyholder did or failed to do after the policy was entered into. The insurer can only refuse or reduce the claim to the extent that the act or omission actually caused or contributed to the loss. If the breach was unrelated to the loss, the insurer cannot refuse the claim on that basis.',
        },
        {
          question: 'Can Disaster Recovery help if my insurer has denied my claim?',
          answer:
            'The Disaster Recovery platform connects you with vetted, IICRC-certified restoration contractors who can provide independent, itemised assessments of your property damage. These assessments document the cause, extent, and cost of damage in a format that supports IDR and AFCA complaints. Getting an independent assessment before or during your dispute gives you evidence beyond your own account of the damage. Note that Disaster Recovery connects you with contractors — it does not provide legal advice or act as a claims advocate.',
        },
      ]}
      relatedGuides={[
        {
          title: 'How to Lodge an AFCA Complaint Against Your Insurer',
          href: '/guides/insurance/afca-complaint-guide',
          description:
            'Step-by-step guide to the AFCA complaint process — what information you need, timeframes, and what AFCA can order.',
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
