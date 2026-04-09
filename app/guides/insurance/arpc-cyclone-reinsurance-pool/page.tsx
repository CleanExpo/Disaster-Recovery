import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'ARPC Cyclone Reinsurance Pool Explained | FNQ Insurance Claims Guide',
  description: 'What is the ARPC Cyclone Reinsurance Pool? How it affects your TC Maila and FNQ cyclone insurance claim. Policyholder rights, AFCA dispute process, and how NRPG documents claims for pool lodgement.',
  keywords: 'ARPC cyclone reinsurance pool, cyclone insurance FNQ, ARPC pool claim, cyclone reinsurance Australia, TC Maila ARPC, northern Australia cyclone insurance',
  openGraph: {
    title: 'ARPC Cyclone Reinsurance Pool Explained | FNQ Insurance Claims Guide',
    description: 'What is the ARPC Cyclone Reinsurance Pool? How it affects your TC Maila and FNQ cyclone insurance claim. Policyholder rights, AFCA dispute process, and how NRPG documents claims for pool lodgement.',
    images: [{ url: `${NAP.url}/api/og?title=${encodeURIComponent('ARPC Cyclone Reinsurance Pool')}&city=${encodeURIComponent('FNQ')}&service=arpc-cyclone-reinsurance-pool`, width: 1200, height: 630 }],
    type: 'website',
  },
  alternates: {
    canonical: `${NAP.url}/guides/insurance/arpc-cyclone-reinsurance-pool`,
  },
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Insurance Claims Documentation',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Place', name: 'Far North Queensland' },
  serviceType: 'Insurance Claims Documentation',
  description: 'IICRC-certified insurance claims documentation for ARPC Cyclone Pool claims. Psychrometric drying logs, breach-point photography, and full scope documentation structured for pool lodgement and AFCA dispute support.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'Does the ARPC Cyclone Pool apply to my FNQ property?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'If your property is in an eligible postcode — Queensland, NT, or WA north of the Tropic of Capricorn, plus eligible northern NSW postcodes — your insurer is required to hold cyclone reinsurance through the ARPC scheme. This applies automatically to standard home and small business policies. You do not need to opt in or check eligibility individually.',
      },
    },
    {
      '@type': 'Question',
      name: 'Does the ARPC pool mean I get paid faster?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Not necessarily. Your insurer still manages the claim process on behalf of the pool, and the same insurer resourcing constraints apply during mass event periods like TC Maila. Lodge early and keep documentation — the pool does not accelerate insurer processing times.',
      },
    },
    {
      '@type': 'Question',
      name: 'Can I dispute an ARPC pool claim with AFCA?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes. The ARPC pool does not limit your dispute rights. AFCA handles disputes arising from cyclone pool claims the same way as all other insurance complaints. NRPG provides full IICRC-certified documentation to support AFCA lodgement where claims are underpaid or disputed.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is the difference between the ARPC pool and my normal insurer?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Your insurer remains your primary point of contact and manages your claim. The pool is a reinsurance mechanism — your insurer is covered by the pool for cyclone losses above a threshold. Your policy terms and conditions still govern the claim. The pool affects how your insurer's risk is backed, not your individual entitlements.",
      },
    },
    {
      '@type': 'Question',
      name: 'What should I lodge my TC Maila claim as?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: "Lodge as 'cyclone damage' and 'water ingress' — not just 'flood' or 'storm damage'. The peril description you use at lodgement affects how your claim is initially classified and which policy provisions are applied. Cyclone wind damage and associated water ingress within 48 hours of the event are covered through the ARPC pool. Separate flood inundation is assessed separately.",
      },
    },
  ],
};

export default function ArpcCycloneReinsurancePoolPage() {
  return (
    <>
      <Script id="arpc-service" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }} />
      <Script id="arpc-faq" type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
      <AgGuidePageTemplate
        category="Insurance Guides"
        title="The ARPC Cyclone Reinsurance Pool — What FNQ Property Owners Need to Know"
        subtitle="The Australian Reinsurance Pool Corporation (ARPC) Cyclone Pool underpins every home insurance policy in northern Australia. Here is what it means for your TC Maila claim and your rights as a policyholder."
        gradient="linear-gradient(135deg, #1A237E 0%, #0288D1 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance', href: '/guides/insurance' },
          { label: 'ARPC Cyclone Pool' },
        ]}
        sections={[
          {
            heading: 'What is the ARPC Cyclone Reinsurance Pool?',
            body: (
              <p>
                The Australian Reinsurance Pool Corporation (ARPC) Cyclone Reinsurance Pool is a government-backed
                scheme that requires insurers writing home and small business policies in northern Australia to hold
                cyclone reinsurance through the ARPC. The pool was established to reduce insurance premiums in
                high-risk cyclone areas (Queensland, Northern Territory, Western Australia north of the Tropic of
                Capricorn, and northern NSW) by creating a shared risk mechanism backed by the Commonwealth government.
                Every standard home insurance policy in an eligible postcode is automatically covered under the scheme
                — policyholders do not opt in or out.
              </p>
            ),
          },
          {
            heading: 'How the Pool Affects Your Cyclone Claim',
            body: (
              <>
                <p>
                  When you lodge a cyclone claim, your insurer manages it on behalf of the ARPC pool. From your
                  perspective as a policyholder, the process looks the same as a standard claim: you deal with your
                  insurer&apos;s claims team, an assessor is appointed, and a settlement is offered. What changes
                  behind the scenes: your insurer is paying the claim from pool funds, subject to ARPC&apos;s claim
                  definitions.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  The key implication is that claim definitions can be more strictly applied for pool-covered events
                  — particularly the distinction between cyclone wind damage (covered) and flooding or storm surge
                  (assessed separately). Always lodge as &ldquo;cyclone damage&rdquo; and &ldquo;water ingress&rdquo;
                  rather than &ldquo;flood&rdquo; to preserve your best coverage position.
                </p>
              </>
            ),
          },
          {
            heading: 'Your Rights Under the ARPC Pool — What Cannot Be Reduced',
            body: (
              <>
                <p>The ARPC pool does not reduce your rights as a policyholder. You retain:</p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    The right to dispute underpayment through the Australian Financial Complaints Authority (AFCA)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    The right to an independent assessment if you dispute the insurer&apos;s scope
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    The right to a review of declined claims under the Insurance Contracts Act
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    The right to lodge a complaint with ASIC if your insurer is not handling the claim in accordance
                    with the General Insurance Code of Practice
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  The ARPC pool backstop does not change the dispute resolution process — AFCA handles cyclone pool
                  disputes in the same way as all other insurance complaints.
                </p>
              </>
            ),
          },
          {
            heading: 'Cyclone Damage vs Flood — Why the Distinction Matters',
            body: (
              <>
                <p>
                  The single most common source of cyclone claim disputes involves the distinction between cyclone
                  wind damage (and associated water ingress through breached building elements) versus flood damage
                  (inundation from external water bodies — rivers, storm surge, overland flow). Standard policies
                  cover cyclone wind damage through the pool. Flood inundation requires a separate flood extension,
                  which many standard policies do not include or limit.
                </p>
                <p style={{ marginTop: '1rem' }}>
                  Document separately: photograph the physical breach point (where water entered — torn roof, broken
                  window, damaged wall), and distinguish this clearly from water entering through doors, stormwater
                  drains, or rising from external ground level.
                </p>
              </>
            ),
          },
          {
            heading: 'NRPG Documentation for ARPC Pool Claims',
            body: (
              <>
                <p>FNQ insurers require specific documentation for pool-covered cyclone claims:</p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>IICRC-certified scope of works</li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Psychrometric drying logs (required for water damage components)
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Timestamped photographs with clear breach-point documentation
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    Separation of cyclone wind damage from any associated flooding
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  NRPG provides a full claims documentation pack as part of every restoration engagement, structured
                  to satisfy both the insurer&apos;s pool lodgement requirements and AFCA&apos;s evidentiary standards
                  in the event of a dispute.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'Does the ARPC Cyclone Pool apply to my FNQ property?',
            answer: 'If your property is in an eligible postcode — Queensland, NT, or WA north of the Tropic of Capricorn, plus eligible northern NSW postcodes — your insurer is required to hold cyclone reinsurance through the ARPC scheme. This applies automatically to standard home and small business policies. You do not need to opt in or check eligibility individually.',
          },
          {
            question: 'Does the ARPC pool mean I get paid faster?',
            answer: 'Not necessarily. Your insurer still manages the claim process on behalf of the pool, and the same insurer resourcing constraints apply during mass event periods like TC Maila. Lodge early and keep documentation — the pool does not accelerate insurer processing times.',
          },
          {
            question: 'Can I dispute an ARPC pool claim with AFCA?',
            answer: 'Yes. The ARPC pool does not limit your dispute rights. AFCA handles disputes arising from cyclone pool claims the same way as all other insurance complaints. NRPG provides full IICRC-certified documentation to support AFCA lodgement where claims are underpaid or disputed.',
          },
          {
            question: 'What is the difference between the ARPC pool and my normal insurer?',
            answer: "Your insurer remains your primary point of contact and manages your claim. The pool is a reinsurance mechanism — your insurer is covered by the pool for cyclone losses above a threshold. Your policy terms and conditions still govern the claim. The pool affects how your insurer's risk is backed, not your individual entitlements.",
          },
          {
            question: 'What should I lodge my TC Maila claim as?',
            answer: "Lodge as 'cyclone damage' and 'water ingress' — not just 'flood' or 'storm damage'. The peril description you use at lodgement affects how your claim is initially classified and which policy provisions are applied. Cyclone wind damage and associated water ingress within 48 hours of the event are covered through the ARPC pool. Separate flood inundation is assessed separately.",
          },
        ]}
        relatedGuides={[
          { title: 'TC Maila FNQ Emergency Response', href: '/events/tc-maila-fnq-2026', description: 'TC Maila claim lodgement and NRPG response information.' },
          { title: 'Cyclone Damage Restoration Cairns', href: '/cyclone-damage-restoration-cairns', description: 'IICRC-certified cyclone restoration contractors across FNQ.' },
          { title: 'Insurance Claim Documentation Guide', href: '/guides/insurance', description: 'How to document and lodge disaster insurance claims in Australia.' },
        ]}
        cta={{ text: 'Lodge Your TC Maila Claim', href: '/claim' }}
      />
    </>
  );
}
