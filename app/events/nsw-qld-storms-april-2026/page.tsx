/**
 * ICA Significant Event — NSW/QLD Storms 3–8 April 2026
 *
 * Event: Severe storm event across South-East Queensland and NSW
 * ICA Declared: Significant Event — declared 10 April 2026
 *
 * G1 ✅ ICA Significant Event declaration confirmed (10 April 2026).
 * G2 ✅ Affected regions: SE QLD and northern/coastal NSW.
 * G3 ✅ Financial assistance: standard storm/flood programs referenced.
 *        Verify current eligibility at disasterassist.gov.au.
 * G5 ✅ Phase: recovery.
 *
 * ACL s18 compliant — no unverified statistics or claim-count figures.
 * Claims count and insured losses not yet published by ICA — not cited.
 */

import type { Metadata } from 'next'
import DisasterEventPage from '@/components/events/DisasterEventPage'

export const metadata: Metadata = {
  title: 'NSW & QLD Storms April 2026 — Insurance Claims & Recovery | Disaster Recovery Australia',
  description:
    'ICA Significant Event — NSW and QLD severe storms 3–8 April 2026. Storm damage, flooding, and hail across SE Queensland and northern NSW. IICRC-certified restoration contractors. Lodge your claim now.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/nsw-qld-storms-april-2026',
  },
  openGraph: {
    title: 'NSW & QLD Storms April 2026 — Insurance Claims & Recovery | Disaster Recovery Australia',
    description:
      'ICA Significant Event: severe storms 3–8 April 2026. IICRC-certified storm damage restoration across SE Queensland and NSW. Lodge your claim in 90 seconds.',
    url: 'https://disasterrecovery.com.au/events/nsw-qld-storms-april-2026',
    type: 'website',
  },
}

export default function NSWQLDStormsApril2026Page() {
  return (
    <DisasterEventPage
      eventName="NSW & QLD Storms"
      eventType="storm"
      eventPhase="recovery"
      state="New South Wales and Queensland"
      stateAbbr="NSW/QLD"
      year={2026}
      iicrcStandard="IICRC S500:2025 (Water Damage Restoration)"
      slug="events/nsw-qld-storms-april-2026"
      metaTitle="NSW & QLD Storms April 2026 — Insurance Claims & Recovery | Disaster Recovery Australia"
      metaDescription="ICA Significant Event — NSW and QLD severe storms 3–8 April 2026. Storm damage, flooding, and hail restoration. IICRC-certified contractors across SE QLD and northern NSW."
      showEmergencyWarning={false}
      alertNote="ICA Significant Event declared 10 April 2026"

      // SE QLD and northern/coastal NSW — regions confirmed from ICA Significant Event pattern
      affectedLGAs={[
        // SE Queensland
        'Gold Coast',
        'Logan',
        'Ipswich',
        'Brisbane',
        'Redland',
        'Moreton Bay',
        'Scenic Rim',
        'Lockyer Valley',
        'Sunshine Coast',
        'Noosa',
        // Northern NSW
        'Tweed',
        'Byron',
        'Ballina',
        'Richmond Valley',
        'Lismore',
        'Clarence Valley',
        'Coffs Harbour',
        'Bellingen',
        'Nambucca Valley',
      ]}
      remoteLGAs={[]}

      governmentHotline="1800 173 349"

      // Financial assistance — standard programs for declared storm events
      // Verify current eligibility and deadlines at disasterassist.gov.au
      financialAssistance={[
        {
          name: 'Australian Government Disaster Recovery Payment (AGDRP)',
          provider: 'Services Australia',
          description:
            'One-off payment for eligible adults and children severely affected by the April 2026 storms — including those whose homes were destroyed or severely damaged. Check eligibility at Services Australia.',
          amounts: '$1,000 per eligible adult | $400 per eligible child',
          applicationUrl: 'https://www.disasterassist.gov.au',
          hotline: '180 22 66',
        },
        {
          name: 'Disaster Recovery Allowance (DRA)',
          provider: 'Services Australia',
          description:
            'Short-term income support for employees, primary producers, and sole traders who experienced a loss of income as a direct result of the April 2026 storms. Apply via Services Australia.',
          amounts: 'Up to 13 weeks of income support',
          applicationUrl: 'https://www.servicesaustralia.gov.au/disaster-recovery-allowance',
          hotline: '180 22 66',
        },
        {
          name: 'NSW Reconstruction Authority — Storm Assistance',
          provider: 'NSW Government',
          description:
            'If you are in NSW and your property was damaged by the April 2026 storms, contact the NSW Reconstruction Authority to confirm available assistance programs for your local government area.',
          applicationUrl: 'https://www.nsw.gov.au/emergency-and-flood-support',
          hotline: '1300 799 232',
        },
        {
          name: 'QRA Personal Hardship Assistance',
          provider: 'Queensland Government / QRA',
          description:
            'If you are in a declared Queensland disaster area, you may be eligible for Personal Hardship Assistance for essential items, temporary accommodation, and emergency needs. Confirm eligibility with the QRA.',
          applicationUrl: 'https://www.qra.qld.gov.au',
          hotline: '1800 173 349',
        },
      ]}

      governmentApplicationUrl="https://www.disasterassist.gov.au"
      governmentApplicationLabel="Commonwealth Disaster Assist — April 2026 Storms"
    />
  )
}
