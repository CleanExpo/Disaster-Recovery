/**
 * DR-400 / GAP-066: TC Maila FNQ — LIVE Landing Page
 *
 * Event: Tropical Cyclone Maila — Category 5 severe tropical cyclone (upgraded 9 Apr 2026)
 * Track: Far North Queensland (FNQ) coast — Cairns, Townsville, Cape York
 * Sustained winds: 215 km/h. Forecast landfall: 11–12 April 2026.
 * BOM monitoring: Watch/Warning window OPEN (BOM TCWC Brisbane)
 * Status: Preparedness (pre-landfall) / immediate post-impact claims support
 * NOTE: Do NOT state NRPG can dispatch during active Cat 5 conditions (ACL compliance).
 *
 * PUBLICATION GATE: CLEARED 9 April 2026 — NRPG confirmed active contractors
 * in Cairns, Townsville, and Cape York.
 *
 * ACL s18 compliant — no unverified statistics.
 * Framing: NRPG is restoration + claim support network, NOT claim advocate.
 * IICRC references: S500:2025 (water), S700:2025 (wind/structural) — certified
 * standards referenced only, classifications NOT reproduced.
 */

import type { Metadata } from 'next'
import DisasterEventPage from '@/components/events/DisasterEventPage'
import type { FinancialAssistanceItem } from '@/components/events/DisasterEventPage'

export const metadata: Metadata = {
  title: 'Tropical Cyclone Maila Category 5 — FNQ Claims Support | Disaster Recovery Australia',
  description:
    'Tropical Cyclone Maila has upgraded to Category 5 (sustained winds 215 km/h) and is forecast to make landfall on the Far North Queensland coast 11–12 April 2026. IICRC-certified restoration contractors on standby in Cairns, Townsville, and Cape York. Preparation guide and post-impact claims support.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/tc-maila-fnq-2026',
  },
  openGraph: {
    title: 'Tropical Cyclone Maila — FNQ Claims Support | Disaster Recovery Australia',
    description:
      'TC Maila has upgraded to Category 5 (215 km/h sustained winds). Tracking towards Far North Queensland — landfall forecast 11–12 April 2026. IICRC-certified contractors on standby for Cairns, Townsville, and Cape York. Prepare now — claims support ready for post-impact.',
    url: 'https://disasterrecovery.com.au/events/tc-maila-fnq-2026',
    type: 'website',
  },
  robots: {
    index: true,
    follow: true,
  },
}

/**
 * QLD Personal Hardship Assistance — referenced as preparedness notice.
 * Program activates post-disaster declaration by QLD Government.
 * No amounts listed — not yet declared as of 9 April 2026. Activate post-landfall declaration.
 */
const financialAssistanceItems: FinancialAssistanceItem[] = [
  {
    name: 'QLD Personal Hardship Assistance',
    provider: 'Queensland Government',
    description:
      'The Queensland Government activates Personal Hardship Assistance (PHA) for eligible residents following a disaster declaration. Assistance may include emergency hardship payments, essential household contents grants, and structural assistance grants. Activation and eligibility are confirmed post-landfall by the Queensland Disaster Management Committee.',
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

export default function TCMailaFNQ2026Page() {
  return (
    <DisasterEventPage
      // Event identity
      eventName="Maila"
      eventType="cyclone"
      eventPhase="pre-landfall"
      state="Queensland"
      stateAbbr="QLD"
      year={2026}

      // IICRC certified standards — S500:2025 (water damage) + S700:2025 (wind/structural)
      // Per IICRC compliance approach: referenced as certified standards only,
      // no classifications or frameworks reproduced from the standards themselves.
      iicrcStandard="IICRC S500:2025 (Water Damage Restoration) and S700:2025 (Fire and Smoke Damage Restoration — covers wind/structural scope)"

      alertNote="Category 5 — Sustained winds 215 km/h. Landfall forecast 11–12 April 2026."
      slug="events/tc-maila-fnq-2026"

      // SEO
      metaTitle="Tropical Cyclone Maila Category 5 — FNQ Claims Support | Disaster Recovery Australia"
      metaDescription="Tropical Cyclone Maila has upgraded to Category 5 (sustained winds 215 km/h) and is forecast to make landfall on the Far North Queensland coast 11–12 April 2026. IICRC-certified contractors on standby for Cairns, Townsville, and Cape York. Wind damage, storm surge, flash flooding, water extraction, and structural assessment."

      // Affected areas — primary FNQ landfall zone per BOM forecast track
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

      // Remote LGAs — extended response times may apply
      remoteLGAs={[
        'Cook (Cape York)',
        'Cooktown',
      ]}

      // Government assistance programs (activated post-declaration)
      financialAssistance={financialAssistanceItems}

      // Government application portal — no hotline (no phone numbers per site rules)
      governmentApplicationUrl="https://www.disaster.qld.gov.au/"
      governmentApplicationLabel="Queensland Disaster Hub"
    />
  )
}
