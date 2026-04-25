import { Metadata } from 'next';
import Script from 'next/script';
import { TrendingUp } from 'lucide-react';
import { AgGuidePageTemplate } from '@/components/antigravity';

export const metadata: Metadata = {
  title: 'Insurance Affordability Australia: Rising Premiums & Under-Insurance',
  description:
    'Why home and contents insurance premiums are rising in Australia, what under-insurance means after a disaster, and how to protect yourself when your coverage falls short.',
  keywords:
    'insurance affordability Australia, home insurance premiums rising, under-insurance Australia, insurance coverage gap, home insurance costs, disaster recovery under-insured',
  alternates: {
    canonical:
      'https://disasterrecovery.com.au/guides/insurance/insurance-affordability-australia',
  },
};

export default function InsuranceAffordabilityAustraliaPage() {
  const faqSchema = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: [
      {
        '@type': 'Question',
        name: 'What is under-insurance and how common is it in Australia?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Under-insurance occurs when the sum insured on your home or contents policy is lower than the actual cost to replace or rebuild after a loss. Both the Insurance Council of Australia and AFCA have publicly identified under-insurance as a widespread and systemic issue among Australian homeowners \u2014 particularly after major natural disaster events, when many policyholders discover the gap between their cover and their actual costs for the first time.',
        },
      },
      {
        '@type': 'Question',
        name: 'Why are my home insurance premiums going up every year?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Australian home insurance premiums are rising due to a combination of factors: increased frequency and severity of natural disasters (linked to climate change), higher global reinsurance costs, rising construction and labour costs, and higher material prices. These are structural factors affecting the whole market, not just your individual policy. The Insurance Council of Australia has documented the impact of catastrophe losses on the broader industry.',
        },
      },
      {
        '@type': 'Question',
        name: 'What happens if my insurance payout doesn\u2019t cover the full cost of rebuilding?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'If your sum insured is lower than the actual rebuild cost, your insurer pays up to the policy limit and you are responsible for the shortfall. Practical steps include: obtaining an independent scope of works to understand the full gap, prioritising the most critical work first, asking your insurer about hardship provisions, and exploring finance options to bridge the shortfall. If your insurer handles the claim poorly, AFCA is available for dispute resolution.',
        },
      },
      {
        '@type': 'Question',
        name: 'How do I find out if my home is under-insured?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Use a building cost calculator (available through the Insurance Council of Australia and most major insurers) to estimate the current rebuild cost for your property \u2014 this should include demolition, rebuild, professional fees, and council requirements. Compare that figure to your current sum insured. If your sum insured is lower, you may need to increase your cover. For older, heritage, or unusual properties, consider a professional valuation.',
        },
      },
      {
        '@type': 'Question',
        name: 'Can Disaster Recovery help if my insurance only partially covers my damage?',
        acceptedAnswer: {
          '@type': 'Answer',
          text: 'Yes. Through the Disaster Recovery platform, you are connected directly with vetted, IICRC-certified restoration contractors who provide transparent, itemised scopes of works. This gives you full visibility of what the complete restoration will cost, independent of your insurer\u2019s assessment. You can use this to prioritise work within your available coverage, support any dispute through AFCA, or explore finance options to bridge a shortfall.',
        },
      },
    ],
  };

  return (
    <>
      <Script
        id="insafford-faq"
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      <AgGuidePageTemplate
      category="Insurance"
      title="Insurance Affordability in Australia"
      subtitle="Rising premiums, under-insurance risk, and what to do when coverage falls short"
      gradient="linear-gradient(135deg, #1E3A5F 0%, #2563EB 100%)"
      icon={<TrendingUp className="h-10 w-10" />}
      breadcrumbs={[
        { label: 'Home', href: '/' },
        { label: 'Guides', href: '/guides' },
        { label: 'Insurance', href: '/guides/insurance' },
        { label: 'Insurance Affordability Australia' },
      ]}
      sections={[
        {
          heading: 'Why Home Insurance Premiums Are Rising in Australia',
          body: (
            <>
              <p>
                Australian home and contents insurance premiums have increased significantly in
                recent years, and the pressure on household budgets shows no sign of easing. The
                causes are structural — not temporary — and understanding them helps homeowners
                make better decisions about their coverage.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Climate change and natural disaster frequency:</strong> Australia has
                  experienced an increase in the frequency and severity of weather events — floods,
                  cyclones, hailstorms, and bushfires. The Insurance Council of Australia has
                  documented that insured losses from natural catastrophes have grown substantially
                  over recent years, and that trend is reflected in the premiums all homeowners pay.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Reinsurance costs:</strong> Australian insurers pass on a significant
                  portion of their catastrophe risk to global reinsurance markets. As global
                  reinsurance costs rise — driven by catastrophe events around the world — those
                  costs flow through to domestic premiums.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Supply chain and labour costs:</strong> The cost of building materials
                  and skilled trades increased substantially following supply chain disruptions and
                  increased demand. Because property insurance pays the cost of restoring
                  buildings, insurers adjust premiums to reflect the higher replacement costs they
                  are now covering.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Higher rebuild costs per property:</strong> As construction costs have
                  risen, the amount needed to actually rebuild a damaged home to its pre-loss
                  condition has increased. Policies that do not keep pace with rising rebuild costs
                  create an under-insurance gap — even for homeowners who believe they are
                  adequately covered.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                The Insurance Council of Australia and AFCA have both publicly identified
                affordability and under-insurance as systemic issues facing Australian households
                — particularly in regions with elevated natural hazard exposure.
              </p>
            </>
          ),
        },
        {
          heading: 'Under-Insurance: What It Means in Practice',
          body: (
            <>
              <p>
                Under-insurance occurs when your sum insured — the maximum your policy will pay
                to rebuild or repair your home — is lower than the actual cost to restore the
                property after a total or major loss. It is one of the most common and
                consequential problems Australian homeowners face after a disaster, and it is
                frequently not discovered until the claim is made.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>The gap appears at claim time:</strong> If your home suffers a major
                  loss and the actual rebuild cost exceeds your sum insured, your insurer pays
                  only up to the policy limit. You are responsible for the shortfall — which can
                  represent a substantial sum in today&apos;s construction market.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Co-insurance clauses:</strong> Some policies include provisions that
                  reduce the payment on partial losses proportionally if the property was
                  under-insured at the time of the claim. Always read your Product Disclosure
                  Statement to understand how your policy treats partial losses and under-insurance.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Contents under-insurance is equally common:</strong> Many households
                  estimate the value of their contents informally and do not update that estimate
                  over time. The cumulative value of furniture, electronics, clothing, appliances,
                  and personal items is often higher than policyholders assume.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Rising costs widen the gap over time:</strong> Even if a sum insured
                  was accurate at the time the policy was taken out, rising construction and
                  labour costs mean the gap between insured value and rebuild cost can widen each
                  year the sum insured is not updated.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                AFCA has noted in its published reporting that under-insurance disputes — where
                policyholders discover after a loss that their coverage is insufficient — are a
                recurring and avoidable source of consumer hardship.
              </p>
            </>
          ),
        },
        {
          heading: 'What to Do If You Are Under-Insured After a Disaster',
          body: (
            <>
              <p>
                Discovering you are under-insured in the middle of a disaster recovery is a
                stressful position to be in — but there are practical steps you can take to make
                the most of your coverage and manage the gap.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Lodge your claim immediately and completely:</strong> A thorough,
                  well-documented claim ensures you receive the full amount your policy provides.
                  Do not assume your insurer will automatically identify every item of loss —
                  document everything and claim for it explicitly.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Obtain an independent scope of works:</strong> An independent
                  restoration contractor&apos;s assessment of the full cost to restore your
                  property gives you an accurate picture of the gap between the claim payout and
                  the actual work required. This also provides a basis for negotiating with your
                  insurer or pursuing any dispute through AFCA.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Prioritise make-safe and essential repairs:</strong> If your insurer
                  approves a partial payment, use it to fund the most critical work first —
                  structural make-safe, weatherproofing, and essential services restoration. A
                  qualified restoration contractor can advise on the most effective use of
                  available funds.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Ask about hardship provisions:</strong> The General Insurance Code of
                  Practice requires insurers to have processes for customers experiencing
                  financial hardship. If a claim shortfall is creating significant hardship, raise
                  this with your insurer formally and ask what assistance is available.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Access AFCA if the claim is handled poorly:</strong> Being under-insured
                  does not prevent you from disputing the way your insurer handles the claim. If
                  the insurer acts unreasonably, delays without justification, or misapplies your
                  policy terms, AFCA can intervene.
                </li>
              </ul>
            </>
          ),
        },
        {
          heading: 'How to Check and Update Your Sum Insured',
          body: (
            <>
              <p>
                The most effective way to address under-insurance is to review your sum insured
                before a loss occurs. This is particularly important in the current environment
                where construction and contents costs have risen across the board.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Use a building cost calculator:</strong> Several insurance industry and
                  independent sources provide online building cost calculators that estimate the
                  rebuild cost for your property based on location, size, construction type, and
                  features. The Insurance Council of Australia and individual insurers publish
                  these tools. The estimate should reflect full demolition and rebuild, not just
                  repair — and should include site costs, professional fees, and council
                  requirements.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Review your contents regularly:</strong> Walk through your home and
                  list every item of value — furniture, appliances, electronics, clothing,
                  sporting equipment, jewellery, tools, and artwork. The total is often higher
                  than initial estimates. Update this figure at each policy renewal.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Consider an independent building valuation:</strong> For older,
                  heritage-listed, or unusual properties, a professional building valuation
                  provides a more accurate rebuild estimate than a generic calculator.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Review your policy at each renewal:</strong> Do not simply auto-renew
                  without checking whether the sum insured and the coverage terms still reflect
                  your property and its current value. Pay particular attention to any changes in
                  your property — renovations, extensions, or improvements all affect rebuild cost.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                This guide does not provide financial advice. If you are uncertain about the
                appropriate level of coverage for your property, consult a licensed financial
                adviser or insurance broker.
              </p>
            </>
          ),
        },
        {
          heading: 'How Disaster Recovery Helps When Your Coverage Falls Short',
          body: (
            <>
              <p>
                When an insurance payout does not cover the full cost of restoring your property,
                the way you engage with the restoration process matters. The Disaster Recovery
                platform connects homeowners directly with vetted, IICRC-certified restoration
                contractors — removing the intermediary costs that can widen the gap between
                available funds and completed work.
              </p>
              <ul style={{ marginTop: '1rem', paddingLeft: '1.5rem' }}>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Transparent, itemised pricing:</strong> Every contractor on the
                  Disaster Recovery platform provides a full scope of works with itemised costs
                  before any work begins. You know exactly what the work costs and can make
                  informed decisions about prioritisation and phasing if your available funds are
                  limited.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>No-obligation assessment:</strong> You can request a professional
                  assessment and scope of works at no obligation. This gives you an accurate
                  picture of the full restoration cost, independent of your insurer&apos;s
                  assessment — which is particularly important when you suspect you may be
                  under-insured.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Direct contractor relationship:</strong> You contract directly with the
                  restoration contractor rather than through a managed repair network. This means
                  you have full visibility of the work being done and the costs being incurred,
                  and you can prioritise work based on your available coverage.
                </li>
                <li style={{ marginBottom: '0.5rem' }}>
                  <strong>Finance options available:</strong> For homeowners managing a gap
                  between insurer payment and full restoration cost, finance options through{' '}
                  <a href="https://equippedcf.com.au" target="_blank" rel="noopener noreferrer">
                    Equipped Commercial Finance
                  </a>{' '}
                  are available to help bridge the shortfall.
                </li>
              </ul>
              <p style={{ marginTop: '1rem' }}>
                Disaster Recovery&apos;s role is to connect you with qualified tradespeople —
                the outcome of your insurance claim is between you and your insurer. Our
                contractors provide the documentation and professional service that gives your
                claim and any dispute the strongest possible foundation.
              </p>
            </>
          ),
        },
      ]}
      faqs={[
        {
          question: 'What is under-insurance and how common is it in Australia?',
          answer:
            'Under-insurance occurs when the sum insured on your home or contents policy is lower than the actual cost to replace or rebuild after a loss. Both the Insurance Council of Australia and AFCA have publicly identified under-insurance as a widespread and systemic issue among Australian homeowners — particularly after major natural disaster events, when many policyholders discover the gap between their cover and their actual costs for the first time.',
        },
        {
          question: 'Why are my home insurance premiums going up every year?',
          answer:
            'Australian home insurance premiums are rising due to a combination of factors: increased frequency and severity of natural disasters (linked to climate change), higher global reinsurance costs, rising construction and labour costs, and higher material prices. These are structural factors affecting the whole market, not just your individual policy. The Insurance Council of Australia has documented the impact of catastrophe losses on the broader industry.',
        },
        {
          question: 'What happens if my insurance payout doesn\'t cover the full cost of rebuilding?',
          answer:
            'If your sum insured is lower than the actual rebuild cost, your insurer pays up to the policy limit and you are responsible for the shortfall. Practical steps include: obtaining an independent scope of works to understand the full gap, prioritising the most critical work first, asking your insurer about hardship provisions, and exploring finance options to bridge the shortfall. If your insurer handles the claim poorly, AFCA is available for dispute resolution.',
        },
        {
          question: 'How do I find out if my home is under-insured?',
          answer:
            'Use a building cost calculator (available through the Insurance Council of Australia and most major insurers) to estimate the current rebuild cost for your property — this should include demolition, rebuild, professional fees, and council requirements. Compare that figure to your current sum insured. If your sum insured is lower, you may need to increase your cover. For older, heritage, or unusual properties, consider a professional valuation.',
        },
        {
          question: 'Can Disaster Recovery help if my insurance only partially covers my damage?',
          answer:
            'Yes. Through the Disaster Recovery platform, you are connected directly with vetted, IICRC-certified restoration contractors who provide transparent, itemised scopes of works. This gives you full visibility of what the complete restoration will cost, independent of your insurer\'s assessment. You can use this to prioritise work within your available coverage, support any dispute through AFCA, or explore finance options to bridge a shortfall.',
        },
      ]}
      relatedGuides={[
        {
          title: 'The Real Cost of Insurance Delays',
          href: '/guides/insurance/real-cost-insurance-delays',
          description:
            'How insurer delays compound disaster costs and what your rights are under the Code of Practice.',
        },
        {
          title: 'Should I Take a Payout or Have My Home Repaired?',
          href: '/guides/insurance/should-i-take-a-payout',
          description:
            'How to decide between a cash settlement and managed repairs after a major loss.',
        },
        {
          title: 'ASIC Insurance Enforcement in Australia',
          href: '/guides/insurance/asic-insurance-enforcement-australia',
          description:
            'How ASIC and the 2021 reforms protect policyholders when insurers breach conduct obligations.',
        },
      ]}
      cta={{ text: 'Get Emergency Help', href: '/claim' }}
    />
    </>
  );
}
