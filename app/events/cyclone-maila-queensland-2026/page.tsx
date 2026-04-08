/**
 * Cyclone Maila — Queensland 2026 (Pre-landfall)
 *
 * TC Maila named by BOM TCWC Port Moresby. Category 4 as of 8 April 2026.
 * Sustained winds 165 km/h, gusts 230 km/h. Cape York Peninsula landfall forecast Sat–Sun 11–12 April 2026.
 * BOM Watch/Warning window open. No DRFA financial assistance declared yet — activate post-landfall declaration.
 *
 * ACL s18 compliant — no unverified statistics.
 * No phone numbers per site rules — use governmentApplicationUrl only.
 */

import type { Metadata } from 'next'
import DisasterEventPage from '@/components/events/DisasterEventPage'
import type { FinancialAssistanceItem } from '@/components/events/DisasterEventPage'

export const metadata: Metadata = {
  title: 'Tropical Cyclone Maila Queensland 2026 — Category 4 Preparation & Recovery | Disaster Recovery Australia',
  description:
    'Tropical Cyclone Maila (Category 4, 165 km/h) is forecast to make landfall on the Far North Queensland coast 11–12 April 2026. IICRC-certified restoration contractors on standby for Cairns, Townsville, and Cape York. Preparation guide and recovery support.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/cyclone-maila-queensland-2026',
  },
  openGraph: {
    title: 'TC Maila Category 4 — FNQ Preparation & Recovery | Disaster Recovery Australia',
    description:
      'Tropical Cyclone Maila (Category 4) is tracking towards Far North Queensland with landfall forecast 11–12 April 2026. IICRC-certified contractors ready to respond. Preparation guide, government resources, and insurance claims support.',
    url: 'https://disasterrecovery.com.au/events/cyclone-maila-queensland-2026',
    type: 'website',
  },
}

/**
 * QLD Personal Hardship Assistance — activates post-disaster declaration by QLD Government.
 * SES emergency tarping/make-safe — available during and immediately after event.
 */
const financialAssistanceItems: FinancialAssistanceItem[] = [
  {
    name: 'QLD Personal Hardship Assistance',
    provider: 'Queensland Government',
    description:
      'The Queensland Government activates Personal Hardship Assistance (PHA) for eligible residents following a disaster declaration. Assistance may include emergency hardship payments, essential household contents grants, and structural assistance grants. Activation confirmed post-landfall by the Queensland Disaster Management Committee.',
    applicationUrl: 'https://www.disaster.qld.gov.au/',
  },
  {
    name: 'SES Emergency Assistance — FNQ',
    provider: 'Queensland SES',
    description:
      'Queensland SES provides emergency assistance with tarping, tree removal from structures, and property make-safe operations following cyclone impact. Contact your local SES unit via the Queensland SES website.',
    applicationUrl: 'https://www.ses.qld.gov.au/',
  },
]

export default function CycloneMailaQLD2026Page() {
  return (
    <DisasterEventPage
      eventName="Maila"
      eventType="cyclone"
      eventPhase="pre-landfall"
      state="Queensland"
      stateAbbr="QLD"
      year={2026}
      // S500:2025 (water/storm surge) + S700:2025 (wind/structural damage)
      iicrcStandard="IICRC S500:2025 (Water Damage Restoration) and S700:2025 (Fire and Smoke Damage Restoration — covers wind/structural scope)"
      slug="events/cyclone-maila-queensland-2026"
      metaTitle="Tropical Cyclone Maila Queensland 2026 — Category 4 Preparation & Recovery | Disaster Recovery Australia"
      metaDescription="Tropical Cyclone Maila (Category 4, 165 km/h) is forecast to make landfall on the Far North Queensland coast 11–12 April 2026. IICRC-certified restoration contractors on standby for Cairns, Townsville, and Cape York."

      // BOM Watch/Warning window open as of 8 April 2026. Landfall forecast Sat–Sun 11–12 April.
      affectedLGAs={[
        'Cairns',
        'Townsville',
        'Cook (Cape York)',
        'Mareeba',
        'Tablelands',
        'Daintree',
        'Cooktown',
        'Douglas',
      ]}
      remoteLGAs={[
        'Cook (Cape York)',
        'Cooktown',
      ]}

      financialAssistance={financialAssistanceItems}

      governmentApplicationUrl="https://www.disaster.qld.gov.au/"
      governmentApplicationLabel="Queensland Disaster Hub"
    />
  )
}
