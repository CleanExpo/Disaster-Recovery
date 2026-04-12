/**
 * Cyclone Maila — Queensland 2026 (Recovery Phase)
 *
 * TC Maila made landfall 11–12 April 2026 across the FNQ coast. Category 5.
 * Updated to recovery phase 12 April 2026.
 * DRFA activation check required — add AGDRP/DRA once declared.
 *
 * ACL s18 compliant — no unverified statistics.
 * No phone numbers per site rules — use governmentApplicationUrl only.
 */

import type { Metadata } from 'next'
import DisasterEventPage from '@/components/events/DisasterEventPage'
import type { FinancialAssistanceItem } from '@/components/events/DisasterEventPage'

export const metadata: Metadata = {
  title: 'Tropical Cyclone Maila Queensland 2026 — Recovery Support & Insurance Claims | Disaster Recovery Australia',
  description:
    'TC Maila made landfall across the Far North Queensland coast 11–12 April 2026. IICRC-certified NRPG contractors deployed for Cairns, Townsville, and Cape York recovery. Lodge your cyclone damage claim now — 60-minute post-clearance response.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/cyclone-maila-queensland-2026',
  },
  openGraph: {
    title: 'TC Maila — FNQ Recovery Support & Insurance Claims | Disaster Recovery Australia',
    description:
      'TC Maila made landfall across FNQ 11–12 April 2026. NRPG IICRC-certified contractors deployed. Lodge your cyclone damage claim now — 60-minute post-clearance response, government assistance, and full ARPC claim support.',
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
    name: 'Australian Government Disaster Recovery Payment (AGDRP)',
    provider: 'Services Australia',
    description:
      'A lump-sum payment for eligible individuals in declared TC Maila disaster areas. Check activation status and eligibility at Services Australia — programs activate per-LGA following disaster declaration.',
    applicationUrl: 'https://www.servicesaustralia.gov.au/australian-government-disaster-recovery-payment',
  },
  {
    name: 'Disaster Recovery Allowance (DRA)',
    provider: 'Services Australia',
    description:
      'Short-term income support for employees, small business owners, or farmers whose income was directly affected by TC Maila. Up to 13 weeks assistance, means-tested. Eligibility criteria apply.',
    applicationUrl: 'https://www.servicesaustralia.gov.au/disaster-recovery-allowance',
  },
  {
    name: 'QLD Personal Hardship Assistance',
    provider: 'Queensland Government',
    description:
      'The Queensland Government activates Personal Hardship Assistance (PHA) for eligible residents following a disaster declaration. Assistance may include emergency hardship payments, essential household contents grants, and structural assistance grants. Check eligibility and activation status — programs activate post-declaration.',
    applicationUrl: 'https://www.qld.gov.au/community/disasters-emergencies/financial-assistance',
  },
  {
    name: 'Disaster Recovery Funding Arrangements (DRFA)',
    provider: 'Australian & Queensland Governments',
    description:
      'Joint Commonwealth–State funding for restoration of essential public assets and eligible private infrastructure following TC Maila. DRFA activation is declared per LGA. Check current activation at disasterassist.gov.au.',
    applicationUrl: 'https://www.disasterassist.gov.au/',
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
]

export default function CycloneMailaQLD2026Page() {
  return (
    <DisasterEventPage
      showEmergencyWarning={true}
      eventName="Maila"
      eventType="cyclone"
      eventPhase="recovery"
      state="Queensland"
      stateAbbr="QLD"
      year={2026}
      // S500:2025 (water/storm surge) + S700:2025 (wind/structural damage)
      iicrcStandard="IICRC S500:2025 (Water Damage Restoration) and S700:2025 (Fire and Smoke Damage Restoration — covers wind/structural scope)"
      alertNote="TC Maila made landfall 11–12 April 2026. Contractors deployed across FNQ. Do NOT enter a damaged property without emergency services all-clear."
      slug="events/cyclone-maila-queensland-2026"
      metaTitle="Tropical Cyclone Maila Queensland 2026 — Recovery Support & Insurance Claims | Disaster Recovery Australia"
      metaDescription="TC Maila made landfall across the Far North Queensland coast 11–12 April 2026. IICRC-certified NRPG contractors deployed for Cairns, Townsville, and Cape York recovery. Lodge your cyclone damage claim now — 60-minute post-clearance response."

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
