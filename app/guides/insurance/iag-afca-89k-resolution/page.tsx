import { Metadata } from 'next';
import { Scale } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'IAG AFCA Resolution: How AFCA Settles Property Damage Disputes',
  description:
    'How the Australian Financial Complaints Authority resolves property damage disputes with major insurers like IAG (NRMA, CGU, SGIO, SGIC). What AFCA can order, how to prepare your case, and what a successful determination means for you.',
  keywords:
    'AFCA determination, IAG insurance dispute, NRMA AFCA complaint, property damage insurance dispute Australia, AFCA resolution, insurance complaint process',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/guides/insurance/iag-afca-89k-resolution',
  },
};

export default function IagAfcaResolutionPage() {
  return (
    <AgGuidePageTemplate
      category="Insurance"
      title="IAG & AFCA: How Property Damage Disputes Get Resolved"
      subtitle="Understanding AFCA determinations for disputes with major insurers"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<Scale className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'IAG AFCA Resolution' },
      ]}
      sections={[
        {
          heading: 'What Is AFCA and Why Does It Matter?',
          body: (
            <>
              <p>
                The Australian Financial Complaints Authority (AFCA) is the independent,
                government-authorised external dispute resolution (EDR) scheme for financial
                services in Australia. It replaced the Financial Ombudsman Service, the Credit and
                Investments Ombudsman, and the Superannuation Complaints Tribunal in 2018.
              </p>
              <p style={{ marginTop: '1rem' }}>
                For home and contents policyholders, AFCA provides a free, binding alternative to
                court action when an insurer has declined a claim, underpaid a settlement,
                unreasonably delayed handling, or otherwise acted contrary to its obligations. AFCA
                decisions are legally binding on the insurer — not on the complainant, who may still
                pursue other avenues if they choose.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Monetary limits:</strong> For general insurance claims, AFCA can award up
                  to $1,085,000 in compensation for the claim itself (as of AFCA&apos;s published
                  limits). Additionally, AFCA can order compensation for non-financial loss (such
                  as stress, anxiety and inconvenience directly caused by the insurer&apos;s
                  misconduct) of up to $5,500.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>No cost to complainants:</strong> AFCA is free for consumers and small
                  businesses. Insurers pay a fee for each complaint lodged, which incentivises
                  efficient internal dispute resolution.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Who must participate:</strong> All Australian Financial Services licence
                  holders — including every major insurer — are required by law to be AFCA members
                  and to comply with AFCA determinations.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                IAG (Insurance Australia Group) operates several well-known brands in Australia
                including NRMA Insurance, CGU, SGIO, and SGIC. As a major insurer, IAG is subject
                to AFCA&apos;s jurisdiction and must comply with any determination AFCA makes.
              </p>
            </>
          ),
        },
        {
          heading: 'How AFCA Handles Property Damage Disputes',
          body: (
            <>
              <p>
                Property damage disputes — including disputes over storm damage, water damage, fire
                damage, and flood events — make up a significant portion of AFCA&apos;s general
                insurance caseload. Understanding how AFCA approaches these cases gives you a
                realistic picture of what to expect.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Internal dispute resolution first:</strong> Before lodging an AFCA
                  complaint, you must give your insurer an opportunity to resolve the dispute
                  through its own Internal Dispute Resolution (IDR) process. Under the General
                  Insurance Code of Practice, the insurer must respond to your IDR complaint within
                  15 business days (or 30 business days for complaints involving vulnerable
                  customers or complex matters).
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Lodging with AFCA:</strong> If you are unsatisfied with the IDR outcome
                  — or if the insurer does not respond within the required timeframe — you may lodge
                  a complaint with AFCA. You generally have two years from the date you received
                  the IDR response to lodge.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Negotiation and conciliation:</strong> AFCA first attempts to resolve
                  disputes through negotiation between the parties. Many property damage cases
                  settle at this stage without a formal determination.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Preliminary assessment:</strong> If negotiation fails, AFCA may issue a
                  preliminary assessment — a non-binding view of the likely outcome. Either party
                  can ask for the matter to proceed to a final determination.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Final determination:</strong> A formal written decision by an AFCA
                  decision-maker or panel. If you accept the determination, it is binding on the
                  insurer. The insurer must comply within the timeframe AFCA specifies.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                AFCA applies the law (including the Insurance Contracts Act 1984 and common law),
                the terms of your policy, industry codes (including the General Insurance Code of
                Practice), and what is fair and reasonable in all the circumstances.
              </p>
            </>
          ),
        },
        {
          heading: 'What AFCA Can Order Major Insurers to Do',
          body: (
            <>
              <p>
                When AFCA determines in a complainant&apos;s favour, it has broad powers to
                remedy the situation. Understanding the range of available remedies helps you
                articulate what you are seeking in your own complaint.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Pay the outstanding claim:</strong> AFCA can direct the insurer to pay
                  the full amount owed under the policy, including amounts that were underpaid,
                  wrongly withheld, or delayed without justification.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Cover consequential losses:</strong> Where the insurer&apos;s conduct
                  caused additional losses — for example, where delays forced you to pay for
                  temporary accommodation for an extended period, or where failure to act promptly
                  allowed secondary damage such as mould to develop — AFCA can order the insurer
                  to compensate for those consequential losses.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Rectify poor claims handling:</strong> Where the insurer mishandled the
                  claim — appointed a biased assessor, failed to consider your evidence, or
                  communicated in a misleading or deceptive way — AFCA can direct the insurer to
                  re-assess the claim and correct the process.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Non-financial loss compensation:</strong> AFCA can award up to $5,500
                  for non-financial loss caused directly by the insurer&apos;s conduct, such as
                  anxiety, distress, or significant inconvenience attributable to unreasonable
                  delays or poor communication.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Interest on delayed payments:</strong> Where funds were withheld for an
                  unreasonably long time, AFCA may direct the insurer to pay interest on the
                  outstanding amount.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                These remedies apply equally to all AFCA member insurers — including IAG&apos;s
                brands. A determination is not a penalty, but it is legally binding on the
                insurer. Non-compliance can result in referral to ASIC.
              </p>
            </>
          ),
        },
        {
          heading: 'How to Prepare Your Own AFCA Case',
          body: (
            <>
              <p>
                Strong documentation is the single most important factor in a successful AFCA
                complaint. AFCA decision-makers assess the evidence on its merits — the strength
                of your documented case often determines whether the decision goes in your favour.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Compile all written correspondence:</strong> Gather every email, letter,
                  SMS and internal notes reference from your interactions with the insurer. AFCA
                  will rely on this record to assess whether the insurer communicated clearly and
                  acted within required timeframes.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Keep a timeline of events:</strong> Document every significant date —
                  when the event occurred, when you lodged the claim, when the assessor visited,
                  when you received decisions, and when you escalated to IDR. A clear timeline
                  demonstrates delays that may constitute a breach of the insurer&apos;s
                  obligations.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Obtain an independent assessment:</strong> If the insurer&apos;s assessor
                  produced a report you dispute, commission an independent scope of works or expert
                  report. AFCA gives significant weight to independent, expert evidence.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Know your policy:</strong> Read your Product Disclosure Statement (PDS)
                  carefully and highlight the provisions you believe the insurer has breached.
                  AFCA determines disputes against the terms of your actual policy as well as
                  applicable law.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Quantify your losses:</strong> Provide a detailed, itemised list of
                  your claimed losses — repair costs, temporary accommodation, contents, and any
                  consequential losses. Unsupported figures are given less weight than
                  itemised, evidenced claims.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                You can lodge an AFCA complaint at{' '}
                <a href="https://www.afca.org.au" target="_blank" rel="noopener noreferrer">
                  afca.org.au
                </a>
                . AFCA provides a free online complaint form and a dedicated phone line for
                consumers who need assistance.
              </p>
            </>
          ),
        },
        {
          heading: "How Disaster Recovery's Documentation Supports Your Dispute",
          body: (
            <>
              <p>
                Whether your dispute is at the IDR stage or before AFCA, professional
                documentation from a qualified restoration contractor is often the evidence that
                makes the difference between a resolved claim and a protracted dispute.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Independent scope of works:</strong> Our IICRC-certified contractors
                  produce detailed, itemised scopes of works that reflect the true extent of
                  damage and the cost of restoring your property to pre-loss condition. These
                  documents provide an independent counterpoint to insurer-appointed assessments.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Moisture mapping and thermal imaging:</strong> Objective, instrument-based
                  evidence of hidden water damage is compelling in any dispute about the scope of
                  damage. Our contractors document moisture readings daily and include thermal
                  images in the final report.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Photographic evidence packages:</strong> Timestamped photographs taken
                  at each stage of the job — initial assessment, demolition, drying, and
                  completion — create an unambiguous visual record of the damage and the
                  restoration process.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>No-obligation assessment:</strong> You can request a documented
                  assessment through the Disaster Recovery platform at no obligation. The resulting
                  report is yours to use in any claims or dispute process.
                </li>
              </ul>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'Do I have to go through my insurer&apos;s IDR process before contacting AFCA?',
          answer:
            'Yes. AFCA requires you to give your insurer the opportunity to resolve the dispute through its Internal Dispute Resolution process first. Under the General Insurance Code of Practice, the insurer must respond within 15 business days. If you are unsatisfied with the outcome, or the insurer does not respond in time, you can then lodge with AFCA.',
        },
        {
          question: 'How much can AFCA award in a property damage dispute?',
          answer:
            'For general insurance claims, AFCA can award up to $1,085,000 for the claim itself (as per AFCA&apos;s published monetary limits). AFCA can also order compensation for non-financial loss — such as stress and inconvenience caused by insurer misconduct — of up to $5,500. These limits apply to all AFCA member insurers, including IAG brands.',
        },
        {
          question: 'Is an AFCA determination binding on my insurer?',
          answer:
            'Yes, if you accept the determination. AFCA determinations are binding on the insurer — they must comply within the timeframe specified. If the insurer fails to comply, AFCA can refer the matter to ASIC. As a complainant, the determination is not binding on you — you may still pursue other avenues if you choose not to accept it.',
        },
        {
          question: 'What kinds of insurer conduct does AFCA consider unreasonable?',
          answer:
            'AFCA considers a range of conduct including: unjustified claim declines, unreasonable delays in assessing or paying claims, failing to communicate in a transparent way, appointing biased or unqualified assessors, ignoring independent evidence provided by the policyholder, and applying policy exclusions in a way that is inconsistent with the Insurance Contracts Act 1984.',
        },
        {
          question: 'Can I use a professional restoration report as evidence in my AFCA complaint?',
          answer:
            'Yes. An independent scope of works and documented assessment from a qualified restoration contractor — including moisture readings, thermal imaging, and itemised repair costs — constitutes expert evidence that AFCA decision-makers consider alongside the insurer&apos;s own assessment. Independent expert evidence that contradicts the insurer&apos;s position can be decisive.',
        },
      ]}
      relatedGuides={[
        {
          title: 'ASIC Insurance Enforcement in Australia',
          href: '/guides/insurance/asic-insurance-enforcement-australia',
          description:
            'How ASIC enforces conduct standards for Australian general insurers and what it means for policyholders.',
        },
        {
          title: 'Documenting Water Damage for Insurance Claims',
          href: '/guides/insurance/document-water-damage-insurance',
          description:
            'How to build the documentation your insurer — and AFCA — needs to assess your claim.',
        },
        {
          title: 'The Real Cost of Insurance Delays',
          href: '/guides/insurance/real-cost-insurance-delays',
          description:
            'Why insurer delays are a breach of the Code of Practice and how to document the cost.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
  );
}
