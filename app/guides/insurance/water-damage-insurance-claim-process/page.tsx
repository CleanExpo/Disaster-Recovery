import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Water Damage Insurance Claim Process Australia',
  description: 'Step-by-step guide to lodging a water damage insurance claim in Australia. Understand water vs flood classification, psychrometric drying logs and dispute rights.',
  keywords: 'water damage insurance claim, water damage claim process, Australia, psychrometric drying log, IICRC S500',
  alternates: { canonical: 'https://disasterrecovery.com.au/guides/insurance/water-damage-insurance-claim-process' },
};

export default function WaterDamageInsuranceClaimProcessPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'Is a burst pipe water damage or flood for insurance purposes?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A burst pipe is classified as water damage (sudden accidental loss from an internal source), not flood. Flood is defined in Australian insurance as the inundation of normally dry land by water from an external body such as a river, creek, lake or dam. Most standard home and contents policies cover sudden water damage from burst pipes, failed appliances and roof leaks. Flood coverage usually requires a separate extension or endorsement. If you are unsure which peril applies to your situation, check your Product Disclosure Statement — the definition section will specify exactly what constitutes "flood" under your policy.',
        },
      },
      {
        '@type': 'Question',
        name: 'What is a psychrometric drying log?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'A psychrometric drying log is a technical record of the structural drying process required under the ANSI/IICRC S500:2025 Water Damage Restoration Standard. It records daily temperature, relative humidity, and material moisture content readings throughout the drying period. Insurers require this log to verify that drying was completed to target moisture content and that the structure was not released prematurely — which can cause secondary damage like mould growth, structural movement and subfloor deterioration. Without a certified drying log, insurers frequently dispute secondary damage claims that arise after the initial restoration.',
        },
      },
      {
        '@type': 'Question',
        name: 'What if mould appears after my water damage claim was closed?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If mould appears after your water damage claim was closed, you may be able to reopen or lodge a new claim if you can establish the causal chain: the original covered event (burst pipe, storm water ingress) caused incomplete drying, which caused mould growth. This is significantly easier if your original restoration contractor produced a certified drying log. If no drying log exists, obtain an IICRC-certified mould assessment to document the likely cause. If your insurer disputes the claim, lodge through their Internal Dispute Resolution process and escalate to AFCA if unresolved.',
        },
      },
      {
        '@type': 'Question',
        name: 'How long does a water damage insurance claim take?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under the General Insurance Code of Practice, your insurer must make a claim decision within 10 business days of receiving all required documentation. For straightforward burst pipe claims with good documentation, settlement can occur in 2–4 weeks. Complex claims involving structural damage, Category 3 contamination, or hidden moisture disputes can take 6–12 weeks or longer. Complete documentation — timestamped photos, psychrometric drying log, scope of works, and completion report — is the most effective way to avoid delays.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="waterclaim-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Insurance"
        title="Water Damage Insurance Claim Process"
        subtitle="Step-by-step guide to lodging and winning"
        gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
        icon={<Shield className="h-10 w-10" />}
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance', href: '/guides/insurance' },
          { label: 'Water Damage Insurance Claim Process' },
        ]}
        sections={[
          {
            heading: 'Water Damage vs Flood — Getting the Classification Right',
            body: (
              <>
                <p>
                  Water damage claims are the most common home insurance claim type in Australia —
                  and the most frequently subject to scope disputes. Before lodging, it is essential
                  to understand how your insurer classifies the damage, because the classification
                  determines whether you are covered.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Water damage (sudden accidental loss):</strong> Damage caused by a
                    sudden and accidental release of water from an internal source — burst pipes,
                    failed washing machine hoses, overflowing bathtubs, roof leaks, or storm water
                    entering through a compromised building envelope. Most standard policies cover
                    this peril.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Flood (external water inundation):</strong> The inundation of normally
                    dry land by water from a river, creek, lake, dam, or stormwater drainage
                    system that has overflowed. Flood coverage requires a specific extension on most
                    standard policies — check your Product Disclosure Statement (PDS).
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Storm surge / wind-driven rain:</strong> Some policies treat storm surge
                    and wind-driven rain as a separate peril from both water damage and flood.
                    If water entered your property due to cyclone or storm winds rather than
                    inundation from a water body, document the entry point and direction carefully.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 3 contamination:</strong> If water involved sewage, rising
                    stormwater, or other contaminated sources, it is classified as Category 3 under
                    IICRC S500. This classification affects both restoration requirements and claim
                    complexity — decontamination documentation is required.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If you are uncertain how your loss will be classified, contact your insurer
                  before lodging to clarify which peril applies. Lodging under the wrong peril
                  can cause unnecessary delays.
                </p>
              </>
            ),
          },
          {
            heading: 'The Water Damage Claim Process',
            body: (
              <>
                <p>
                  Acting quickly after water damage is essential — both to limit property loss and
                  to preserve the evidence your insurer needs.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Emergency extraction within 24–48 hours:</strong> Standing water must
                    be extracted and structural drying equipment deployed as quickly as possible.
                    Mould can establish within 48 hours in warm or humid conditions. Your policy
                    requires you to mitigate further damage — failing to act promptly can give
                    your insurer grounds to dispute secondary damage costs.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Document before and during:</strong> Photograph all affected areas
                    before restoration begins. Record water lines, source location, affected
                    materials (carpet, plasterboard, timber subfloors), and damaged contents.
                    Continue photographing throughout the drying process.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Lodge your claim promptly:</strong> Contact your insurer as soon as
                    reasonably possible after discovering the damage. Provide your policy number,
                    a description of the event, and your initial photos. Do not wait until
                    restoration is complete before lodging.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Insurer scope assessment:</strong> Your insurer will arrange for a
                    loss assessor to review the damage and scope the restoration works. Having an
                    independent IICRC-certified scope of works prepared by your own contractor
                    before this visit provides a benchmark for the insurer&apos;s assessment.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Psychrometric drying log required for sign-off:</strong> For any
                    structural drying component, your insurer will require a psychrometric drying
                    log documenting that drying was completed to target moisture content in
                    accordance with ANSI/IICRC S500:2025. Our contractors produce this as
                    standard.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Disputing Underpayment on Water Damage Claims',
            body: (
              <>
                <p>
                  Water damage claims are frequently underpaid — most commonly through insurer
                  disputes over hidden moisture, secondary damage, and Category 3 contamination
                  scope. Understanding these dispute categories helps you prepare your counter.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Hidden moisture disputes:</strong> Insurers frequently dispute secondary
                    damage — mould growth, structural movement, subfloor deterioration — if the
                    original drying log is absent or incomplete. A certified drying log that shows
                    daily readings to structural dry closes this dispute before it starts.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Scope undervaluation:</strong> Insurer-appointed assessors may scope
                    only visible damage, missing moisture behind walls, under floors, and within
                    ceiling cavities. An IICRC-certified contractor using thermal imaging and
                    professional moisture metres will capture the full extent of damage.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Category 3 contamination disputes:</strong> Sewage and stormwater
                    contamination claims often require specialist decontamination documentation
                    to prove the full scope of works. Insurers may dispute decontamination costs
                    without this evidence.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>AFCA escalation:</strong> If your water damage claim is denied or
                    underpaid, lodge a formal dispute through your insurer&apos;s Internal Dispute
                    Resolution (IDR) process. If unresolved, escalate to AFCA within 2 years of
                    the claim decision. Policyholders with IICRC-certified documentation have
                    significantly stronger AFCA outcomes.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  IICRC-certified documentation may support your claim at insurer and AFCA level,
                  though outcomes cannot be guaranteed.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Is a burst pipe water damage or flood for insurance purposes?',
            answer:
              'A burst pipe is classified as water damage (sudden accidental loss from an internal source), not flood. Flood is defined in Australian insurance as the inundation of normally dry land by water from an external body such as a river, creek, lake or dam. Most standard home and contents policies cover sudden water damage from burst pipes, failed appliances and roof leaks. Flood coverage usually requires a separate extension or endorsement. If you are unsure which peril applies to your situation, check your Product Disclosure Statement — the definition section will specify exactly what constitutes "flood" under your policy.',
          },
          {
            question: 'What is a psychrometric drying log?',
            answer:
              'A psychrometric drying log is a technical record of the structural drying process required under the ANSI/IICRC S500:2025 Water Damage Restoration Standard. It records daily temperature, relative humidity, and material moisture content readings throughout the drying period. Insurers require this log to verify that drying was completed to target moisture content and that the structure was not released prematurely — which can cause secondary damage like mould growth, structural movement and subfloor deterioration. Without a certified drying log, insurers frequently dispute secondary damage claims that arise after the initial restoration.',
          },
          {
            question: 'What if mould appears after my water damage claim was closed?',
            answer:
              'If mould appears after your water damage claim was closed, you may be able to reopen or lodge a new claim if you can establish the causal chain: the original covered event (burst pipe, storm water ingress) caused incomplete drying, which caused mould growth. This is significantly easier if your original restoration contractor produced a certified drying log. If no drying log exists, obtain an IICRC-certified mould assessment to document the likely cause. If your insurer disputes the claim, lodge through their Internal Dispute Resolution process and escalate to AFCA if unresolved.',
          },
          {
            question: 'How long does a water damage insurance claim take?',
            answer:
              'Under the General Insurance Code of Practice, your insurer must make a claim decision within 10 business days of receiving all required documentation. For straightforward burst pipe claims with good documentation, settlement can occur in 2–4 weeks. Complex claims involving structural damage, Category 3 contamination, or hidden moisture disputes can take 6–12 weeks or longer. Complete documentation — timestamped photos, psychrometric drying log, scope of works, and completion report — is the most effective way to avoid delays.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Document Water Damage for Insurance',
            href: '/guides/insurance/document-water-damage-insurance',
            description: 'How to photograph and document water damage to support your claim.',
          },
          {
            title: 'IICRC S500 Water Damage Restoration Standard',
            href: '/guides/water-damage/iicrc-s500-water-damage-restoration-standard',
            description: 'What to expect from a contractor working to the IICRC S500 standard.',
          },
          {
            title: 'AFCA Complaint Guide',
            href: '/guides/insurance/afca-complaint-guide',
            description: 'Step-by-step guide to lodging an insurance dispute with AFCA.',
          },
          {
            title: 'Water Damage Restoration Cost Guide',
            href: '/guides/cost-guides/how-much-water-damage-restoration-cost',
            description: 'What water damage restoration costs in Australia in 2025.',
          },
        ]}
        cta={{ text: 'Lodge Your Claim Now', href: '/claim' }}
      />
    </>
  );
}
