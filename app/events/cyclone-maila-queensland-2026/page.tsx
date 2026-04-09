/**
 * Cyclone Maila — Queensland 2026 (Pre-landfall)
 *
 * TC Maila upgraded to Category 5 on 9 April 2026. Sustained winds 215 km/h.
 * Cape York Peninsula landfall forecast Sat–Sun 11–12 April 2026.
 * BOM Watch/Warning window open. No DRFA financial assistance declared yet — activate post-landfall declaration.
 * NOTE: Do NOT state NRPG can dispatch during active Cat 5 conditions (ACL compliance).
 *
 * ACL s18 compliant — no unverified statistics.
 * No phone numbers per site rules — use governmentApplicationUrl only.
 */

import type { Metadata } from 'next'
import DisasterEventPage from '@/components/events/DisasterEventPage'
import type { FinancialAssistanceItem } from '@/components/events/DisasterEventPage'

export const metadata: Metadata = {
  title: 'Tropical Cyclone Maila Queensland 2026 — Category 5 Preparation & Recovery | Disaster Recovery Australia',
  description:
    'Tropical Cyclone Maila has upgraded to Category 5 (sustained winds 215 km/h) and is forecast to make landfall on the Far North Queensland coast 11–12 April 2026. IICRC-certified restoration contractors coordinating availability for Cairns, Townsville, and Cape York. Response times subject to location and access conditions. Preparation guide and recovery support.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/cyclone-maila-queensland-2026',
  },
  openGraph: {
    title: 'TC Maila Category 5 — FNQ Preparation & Recovery | Disaster Recovery Australia',
    description:
      'Tropical Cyclone Maila has upgraded to Category 5 (215 km/h sustained winds) and is tracking towards Far North Queensland — landfall forecast 11–12 April 2026. IICRC-certified contractors ready to respond. Preparation guide, government resources, and insurance claims support.',
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
      'The Queensland Government activates Personal Hardship Assistance (PHA) for eligible residents following a disaster declaration. Assistance may include emergency hardship payments, essential household contents grants, and structural assistance grants. Check eligibility and activation status at official sources — programs activate post-declaration and eligibility criteria apply.',
    applicationUrl: 'https://www.qld.gov.au/community/disasters-emergencies/financial-assistance',
  },
  {
    name: 'Get Ready Queensland — TC Maila',
    provider: 'Queensland Government',
    description:
      'Official Queensland Government preparation and recovery information for Tropical Cyclone Maila. Check current alerts, evacuation zones, and recovery resources.',
    applicationUrl: 'https://www.getready.qld.gov.au/tcMaila',
  },
  {
    name: 'SES Emergency Assistance — FNQ',
    provider: 'Queensland SES',
    description:
      'Queensland SES provides emergency assistance with tarping, tree removal from structures, and property make-safe operations following cyclone impact. Contact your local SES unit via the Queensland SES website.',
    applicationUrl: 'https://www.ses.qld.gov.au/',
  },
  {
    name: 'BOM TC Maila Forecast Track',
    provider: 'Bureau of Meteorology',
    description:
      'Official Bureau of Meteorology tropical cyclone forecast track and warning information. Monitor the BOM 7-day forecast and IDQ65002 track map for the latest TC Maila position and intensity.',
    applicationUrl: 'https://www.bom.gov.au/cyclone/7dayforecast/',
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
      alertNote="Category 5 — Sustained winds 215 km/h. Landfall forecast 11–12 April 2026."
      slug="events/cyclone-maila-queensland-2026"
      metaTitle="Tropical Cyclone Maila Queensland 2026 — Category 5 Preparation & Recovery | Disaster Recovery Australia"
      metaDescription="Tropical Cyclone Maila has upgraded to Category 5 (sustained winds 215 km/h) and is forecast to make landfall on the Far North Queensland coast 11–12 April 2026. IICRC-certified restoration contractors coordinating availability for Cairns, Townsville, and Cape York. Response times subject to location and access conditions."

      // BOM Watch/Warning window open. Cat 5 upgrade confirmed 9 April 2026. Landfall forecast Sat–Sun 11–12 April.
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
