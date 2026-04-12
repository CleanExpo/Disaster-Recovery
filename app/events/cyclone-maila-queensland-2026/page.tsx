/**
 * Cyclone Maila — Queensland 2026
 *
 * DR-573 37-C ACL hotfix: removed hardcoded category, wind-speed superlatives,
 * and tense-specific landfall date claims. Page is now evergreen — all weather-state
 * references point to live BOM sources. Phase updated to recovery.
 *
 * ACL s18 / s29(1)(g)(m) compliant — no unverified statistics, no frozen category
 * or intensity claims. $100M/contravention regime active 26 March 2026.
 * No phone numbers per site rules — use governmentApplicationUrl only.
 */

import type { Metadata } from 'next'
import DisasterEventPage from '@/components/events/DisasterEventPage'
import type { FinancialAssistanceItem } from '@/components/events/DisasterEventPage'

export const metadata: Metadata = {
  title: 'Tropical Cyclone Maila Queensland 2026 — Cyclone Damage Restoration & Claim Support | Disaster Recovery Australia',
  description:
    'Tropical Cyclone Maila has impacted Far North Queensland and Cape York. IICRC-certified restoration contractors coordinating availability for Cairns, Townsville, and Cape York. Lodge your TC Maila insurance claim 24/7. Response times subject to location and access conditions.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/cyclone-maila-queensland-2026',
  },
  openGraph: {
    title: 'TC Maila Queensland 2026 — Cyclone Damage Restoration & Claim Support | Disaster Recovery Australia',
    description:
      'Tropical Cyclone Maila — cyclone damage restoration and insurance claim support across Far North Queensland and Cape York. IICRC-certified contractors. Lodge your claim 24/7.',
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
      showEmergencyWarning={false}
      eventName="Maila"
      eventType="cyclone"
      eventPhase="recovery"
      state="Queensland"
      stateAbbr="QLD"
      year={2026}
      // S500:2025 (water/storm surge) + S700:2025 (wind/structural damage)
      iicrcStandard="IICRC S500:2025 (Water Damage Restoration) and S700:2025 (Fire and Smoke Damage Restoration — covers wind/structural scope)"
      alertNote="TC Maila has impacted FNQ and Cape York. Refer to bom.gov.au for current warnings. Lodge your claim 24/7."
      slug="events/cyclone-maila-queensland-2026"
      metaTitle="Tropical Cyclone Maila Queensland 2026 — Cyclone Damage Restoration & Claim Support | Disaster Recovery Australia"
      metaDescription="Tropical Cyclone Maila has impacted Far North Queensland and Cape York. IICRC-certified restoration contractors coordinating availability for Cairns, Townsville, and Cape York. Lodge your TC Maila insurance claim 24/7."

      // Maila FNQ / Cape York corridor — 37-C evergreen pivot.
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
