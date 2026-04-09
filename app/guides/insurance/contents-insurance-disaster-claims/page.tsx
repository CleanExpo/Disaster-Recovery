import { Metadata } from 'next';
import Script from 'next/script';
import { Shield } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';
import { NAP } from '@/lib/constants';

export const metadata: Metadata = {
  title: 'Contents Insurance Disaster Claims — What Is and Isn\'t Covered',
  description:
    'How contents insurance works in disaster claims. High-value items, depreciation, agreed vs market value, and how to maximise your contents payout after a disaster.',
  alternates: {
    canonical: `${NAP.url}/guides/insurance/contents-insurance-disaster-claims`,
  },
};

const localBusinessSchema = {
  '@context': 'https://schema.org',
  '@type': 'ProfessionalService',
  name: NAP.name,
  '@id': `${NAP.url}/#organization`,
  url: NAP.url,
  logo: NAP.logo,
  abn: NAP.abn,
  hasOfferCatalog: {
    '@type': 'OfferCatalog',
    name: 'Contents Insurance Disaster Claim Support',
  },
  sameAs: NAP.sameAs,
};

const serviceSchema = {
  '@context': 'https://schema.org',
  '@type': 'Service',
  name: 'Contents Insurance Disaster Claim Support',
  provider: { '@type': 'Organization', name: NAP.name, '@id': `${NAP.url}/#organization` },
  areaServed: { '@type': 'Country', name: 'Australia' },
  serviceType: 'Contents Insurance Disaster Claim Support',
  description:
    'Expert support for Australian homeowners navigating contents insurance disaster claims. Independent documentation, depreciation challenges, and AFCA dispute support.',
};

const faqSchema = {
  '@context': 'https://schema.org',
  '@type': 'FAQPage',
  mainEntity: [
    {
      '@type': 'Question',
      name: 'What contents are typically covered in a disaster insurance claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Most standard contents policies cover furniture, appliances, clothing, electronics, and sporting equipment up to specified sublimits per category. High-value items including jewellery, art, antiques, and collectibles are typically subject to per-item sublimits of $2,000–$5,000 and require separate scheduling on your policy at higher premiums. Check your Product Disclosure Statement for the full list of covered items and applicable sublimits.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is agreed value vs market value for contents?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Agreed value (also called replacement cost value) means the insurer pays to replace the item at today\'s current retail cost regardless of the item\'s age. Indemnity or market value means the insurer pays what the item was worth at the time of loss, after applying depreciation for its age and condition. Agreed value policies cost more in premium but provide substantially better outcomes at claim time — particularly for electronics and appliances that depreciate quickly.',
      },
    },
    {
      '@type': 'Question',
      name: 'How is contents depreciation calculated by insurers?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Under indemnity (market value) policies, insurers apply straight-line depreciation based on item age and expected life span. A 5-year-old television under an indemnity policy typically receives only 30–50% of its original purchase price. You can challenge depreciation by providing the brand name, model number, and current replacement cost quotes for equivalent items — demonstrating that the current market value is higher than the insurer\'s depreciated figure. This approach is particularly effective for premium appliances and high-specification electronics.',
      },
    },
    {
      '@type': 'Question',
      name: 'Do I need to prove my contents before a disaster claim?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: 'Yes — you are required to provide reasonable evidence of ownership and value for claimed items. The most effective evidence is photographs of your home interior (including open cupboards and storage areas), purchase receipts, bank or credit card statements, and serial numbers for electronics. For major disaster events including TC Alfred and TC Maila, insurers implemented expedited processes — but still required reasonable evidence of contents. A home inventory photographed room by room and stored in cloud storage is the best preparation.',
      },
    },
    {
      '@type': 'Question',
      name: 'What is \'new for old\' contents replacement?',
      acceptedAnswer: {
        '@type': 'Answer',
        text: '\'New for old\' is a policy variation where the insurer pays the full current replacement cost of an item regardless of its age — equivalent to agreed value replacement. Some policies apply new for old only to items within their first 3–5 years of life, then switch to depreciated indemnity value for older items. Check your Product Disclosure Statement carefully — the difference between new for old and indemnity value for a full household of contents can be tens of thousands of dollars.',
      },
    },
  ],
};

export default function ContentsInsuranceDisasterClaimsPage() {
  return (
    <>
      <Script
        id="cidc-ps"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
      />
      <Script
        id="cidc-svc"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceSchema) }}
      />
      <Script
        id="cidc-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
        category="Insurance Claims"
        title="Contents Insurance Disaster Claims — What Is and Isn't Covered"
        subtitle="How contents insurance works in disaster claims, what sublimits apply, how depreciation is calculated, and how to maximise your payout."
        gradient="linear-gradient(135deg, #1A237E 0%, #283593 100%)"
        icon={<Shield className="h-10 w-10" />}
        lastReviewed="2026-04-09"
        breadcrumbs={[
          { label: 'Home', href: '/' },
          { label: 'Guides', href: '/guides' },
          { label: 'Insurance', href: '/guides/insurance' },
          { label: 'Contents Insurance Disaster Claims' },
        ]}
        sections={[
          {
            heading: 'Contents Cover in Disaster Claims — How It Works',
            body: (
              <>
                <p>
                  Contents insurance covers your moveable possessions — everything inside your
                  home that is not physically attached to the structure. In disaster claims, your
                  contents cover is triggered by the same covered event that damaged your building:
                  storm, cyclone, flood, fire, or water damage from an internal source.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>What is included:</strong> Furniture, appliances, clothing, electronics,
                    sporting equipment, tools, jewellery (up to sublimits), and personal items.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>What is excluded:</strong> Motor vehicles, pets, cash and negotiable
                    instruments, valuables above per-item sublimits (unless separately scheduled),
                    business stock and equipment (unless specifically endorsed), and items used
                    primarily for business purposes.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Claims process sequence:</strong> Lodge your claim promptly, provide
                    photographic evidence of contents damage, submit a detailed contents list with
                    estimated values, respond to insurer requests for supporting documentation,
                    and review the insurer&apos;s depreciation calculations before accepting settlement.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Agreed value vs indemnity policies:</strong> Agreed value (replacement
                    cost) policies replace damaged items at current retail prices regardless of age.
                    Indemnity policies apply depreciation — a significant difference for older
                    households. Check your Product Disclosure Statement before lodging to understand
                    which basis applies.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'High-Value Items and Sublimits',
            body: (
              <>
                <p>
                  Most contents policies impose per-item or per-category sublimits on high-value
                  possessions. Understanding these sublimits is essential before a disaster claim —
                  finding out about them after the event is too late.
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Typical sublimits:</strong> Jewellery and watches $2,000–$5,000 per item
                    or per category; portable electronics $2,000–$3,000; bicycles $1,000–$2,000;
                    works of art and antiques $2,000–$5,000 per item. These sublimits apply
                    regardless of your total sum insured.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>How to schedule high-value items:</strong> Items worth more than the
                    standard sublimit can be listed (scheduled) on your policy for their full
                    replacement value in exchange for an additional premium. Most insurers require
                    a professional valuation for scheduled items above certain thresholds.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Professional valuation requirements:</strong> Insurers typically require
                    a qualified valuer&apos;s certificate for jewellery, fine art, collectibles, and
                    antiques to be scheduled. Valuations should be updated every 3–5 years as
                    market values change.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Maximising Your Contents Payout',
            body: (
              <>
                <p>
                  The most effective time to prepare for a contents claim is before a disaster
                  occurs. These steps substantially improve claim outcomes:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Photograph everything before disaster season:</strong> Walk through
                    every room and photograph contents systematically, including inside wardrobes,
                    cupboards, and storage areas. Open drawers, film serial numbers on electronics.
                    Store these photos in cloud storage (not only on local devices that may be
                    destroyed).
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Keep purchase records in cloud storage:</strong> Receipts, bank
                    statements, and credit card records establish purchase price and date. Even
                    partial records are better than none.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Challenge depreciation with comparable replacement quotes:</strong>
                    If your insurer offers depreciated value for an item, obtain current retail
                    quotes for the equivalent replacement product and submit these. Insurers are
                    required to consider evidence of current replacement cost.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Do not accept the first offer without independent review:</strong>
                    Initial contents assessments frequently use conservative depreciation rates
                    and may miss items. Review the insurer&apos;s assessment against your own list
                    and raise any discrepancies formally before accepting.
                  </li>
                </ul>
              </>
            ),
          },
          {
            heading: 'Common Contents Claim Disputes',
            body: (
              <>
                <p>
                  Contents claims are among the most disputed in Australian insurance. Understanding
                  the common dispute categories helps you prepare your response:
                </p>
                <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Insurer disputes what was in the property:</strong> Without photographic
                    evidence or purchase records, insurers may refuse or reduce claims for items
                    they cannot verify. This is the most common and entirely avoidable dispute.
                    A pre-event home inventory is the most effective protection.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Depreciation disagreements:</strong> Insurers and policyholders
                    frequently disagree on depreciation rates, particularly for electronics and
                    appliances. AFCA has issued multiple determinations requiring insurers to
                    recalculate depreciation using reasonable methodology and current market data.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Contents damaged during restoration work:</strong> Contents damaged
                    by the restoration contractor (rather than the original disaster event) may
                    fall outside your contents cover. The contractor&apos;s public liability
                    insurance is the appropriate avenue — which is why using NRPG contractors
                    with minimum $20M public liability cover matters.
                  </li>
                  <li style={{ marginBottom: '0.5rem' }}>
                    <strong>Contents in shed or outbuildings:</strong> Most policies impose lower
                    sublimits for contents stored in sheds, garages, and outbuildings — often
                    $5,000–$10,000 regardless of the actual value stored. Tools, sporting equipment,
                    and outdoor furniture are frequently under-covered. Check your PDS.
                  </li>
                </ul>
                <p style={{ marginTop: '1rem' }}>
                  If your contents claim is disputed or underpaid, lodge a formal complaint
                  through your insurer&apos;s Internal Dispute Resolution process. If unresolved,
                  escalate to AFCA within 2 years of the claim decision.
                </p>
              </>
            ),
          },
        ]}
        faqs={[
          {
            question: 'What contents are typically covered in a disaster insurance claim?',
            answer:
              'Most standard contents policies cover furniture, appliances, clothing, electronics, and sporting equipment up to specified sublimits per category. High-value items including jewellery, art, antiques, and collectibles are typically subject to per-item sublimits of $2,000–$5,000 and require separate scheduling on your policy at higher premiums. Check your Product Disclosure Statement for the full list of covered items and applicable sublimits.',
          },
          {
            question: 'What is agreed value vs market value for contents?',
            answer:
              'Agreed value (also called replacement cost value) means the insurer pays to replace the item at today\'s current retail cost regardless of the item\'s age. Indemnity or market value means the insurer pays what the item was worth at the time of loss, after applying depreciation for its age and condition. Agreed value policies cost more in premium but provide substantially better outcomes at claim time — particularly for electronics and appliances that depreciate quickly.',
          },
          {
            question: 'How is contents depreciation calculated by insurers?',
            answer:
              'Under indemnity (market value) policies, insurers apply straight-line depreciation based on item age and expected life span. A 5-year-old television under an indemnity policy typically receives only 30–50% of its original purchase price. You can challenge depreciation by providing the brand name, model number, and current replacement cost quotes for equivalent items — demonstrating that the current market value is higher than the insurer\'s depreciated figure. This approach is particularly effective for premium appliances and high-specification electronics.',
          },
          {
            question: 'Do I need to prove my contents before a disaster claim?',
            answer:
              'Yes — you are required to provide reasonable evidence of ownership and value for claimed items. The most effective evidence is photographs of your home interior (including open cupboards and storage areas), purchase receipts, bank or credit card statements, and serial numbers for electronics. For major disaster events including TC Alfred and TC Maila, insurers implemented expedited processes — but still required reasonable evidence of contents. A home inventory photographed room by room and stored in cloud storage is the best preparation.',
          },
          {
            question: 'What is \'new for old\' contents replacement?',
            answer:
              '\'New for old\' is a policy variation where the insurer pays the full current replacement cost of an item regardless of its age — equivalent to agreed value replacement. Some policies apply new for old only to items within their first 3–5 years of life, then switch to depreciated indemnity value for older items. Check your Product Disclosure Statement carefully — the difference between new for old and indemnity value for a full household of contents can be tens of thousands of dollars.',
          },
        ]}
        relatedGuides={[
          {
            title: 'Water Damage Insurance Claim Process',
            href: '/guides/insurance/water-damage-insurance-claim-process',
            description: 'Step-by-step guide to lodging a water damage insurance claim in Australia.',
          },
          {
            title: 'Storm Damage Insurance Claim',
            href: '/guides/insurance/storm-damage-insurance-claim-process',
            description: 'How to lodge and maximise a storm damage insurance claim.',
          },
          {
            title: 'AFCA Complaint Guide',
            href: '/guides/insurance/afca-complaint-guide',
            description: 'Step-by-step guide to lodging an insurance dispute with AFCA.',
          },
        ]}
        cta={{ text: 'Get Disaster Claim Support', href: '/claim' }}
      />
    </>
  );
}
