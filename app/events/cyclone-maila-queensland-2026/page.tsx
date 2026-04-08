/**
 * Cyclone Maila — Queensland 2026 (Pre-landfall)
 *
 * TC Maila named by BOM TCWC Port Moresby. Category 4 as of 8 April 2026.
 * Sustained winds 165 km/h, gusts 230 km/h. Cape York Peninsula landfall forecast Sat–Sun 11–12 April 2026.
 * BOM Watch/Warning window open. No DRFA financial assistance declared yet.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import type { Metadata } from 'next'
import DisasterEventPage from '@/components/events/DisasterEventPage'

export const metadata: Metadata = {
  title: 'Cyclone Maila Queensland 2026 — Disaster Preparation & Recovery | Disaster Recovery Australia',
  description:
    'Tropical Cyclone Maila is forecast to approach Far North Queensland. IICRC-certified restoration contractors on standby for cyclone-affected properties. Preparation guide and recovery support.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/cyclone-maila-queensland-2026',
  },
  openGraph: {
    title: 'Cyclone Maila QLD 2026 — Preparation & Recovery | Disaster Recovery Australia',
    description:
      'Tropical Cyclone Maila is tracking towards Far North Queensland. IICRC-certified contractors ready to respond. Preparation guide, government resources, and insurance claims support.',
    url: 'https://disasterrecovery.com.au/events/cyclone-maila-queensland-2026',
    type: 'website',
  },
}

export default function CycloneMailaQLD2026Page() {
  return (
    <DisasterEventPage
      eventName="Maila"
      eventType="cyclone"
      eventPhase="pre-landfall"
      state="Queensland"
      stateAbbr="QLD"
      year={2026}
      iicrcStandard="IICRC S500:2025 (Water Damage Restoration)"
      slug="events/cyclone-maila-queensland-2026"
      metaTitle="Cyclone Maila Queensland 2026 — Disaster Preparation & Recovery | Disaster Recovery Australia"
      metaDescription="Tropical Cyclone Maila is forecast to approach Far North Queensland. IICRC-certified restoration contractors on standby. Preparation guide and recovery support."

      // TC Maila upgraded to Category 4 as of 8 April 2026. BOM Watch/Warning window open.
      affectedLGAs={[]}
      remoteLGAs={[]}

      governmentHotline="1800 173 349"
      financialAssistance={[]}

      governmentApplicationUrl="https://www.disaster.qld.gov.au/"
      governmentApplicationLabel="Queensland Disaster Hub"
    />
  )
}
