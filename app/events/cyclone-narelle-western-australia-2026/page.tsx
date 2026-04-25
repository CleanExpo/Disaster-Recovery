/**
 * Cyclone Narelle — Western Australia 2026 (Recovery)
 *
 * DR-552 (Lane A) — BUILD-001 Narelle WA content.
 *
 * DRFA Declared Event — WA Premier's Disaster Recovery Funding Arrangements
 * Declared shires: Exmouth, Carnarvon, Shark Bay, Ashburton, Upper Gascoyne, Yalgoo
 * Category 4 at peak intensity. 1,800+ ICA claims confirmed [ICA].
 * Multi-state impact: QLD / NT / WA.
 * AGDRP activated 10 April 2026 (2pm AWST) for Carnarvon + Exmouth LGAs.
 *
 * Financial assistance verified from WA DRFA / DFES / Services Australia sources.
 * Remote LGA qualifying language applied per GAP-035.
 * ACL s29(1)(g)/(m) compliant — no unverified superlatives.
 */

import type { Metadata } from 'next';
import DisasterEventPage from '@/components/events/DisasterEventPage';

export const metadata: Metadata = {
  title: 'Cyclone Narelle WA 2026 — Category 4 Recovery & Insurance Claims | Disaster Recovery',
  description:
    'Cyclone Narelle Western Australia 2026. Category 4 at peak intensity. 1,800+ ICA claims confirmed across 6 DRFA-declared shires: Exmouth, Carnarvon, Shark Bay, Ashburton, Upper Gascoyne, and Yalgoo. IICRC S500:2025-certified restoration contractors. Government assistance, insurance claims support.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/cyclone-narelle-western-australia-2026',
  },
  openGraph: {
    title: 'Cyclone Narelle WA 2026 — Category 4 Recovery | Disaster Recovery',
    description:
      'Cyclone Narelle Category 4. 1,800+ ICA claims confirmed. 6 DRFA-declared shires. IICRC-certified contractors. Government assistance and insurance claims support.',
    url: 'https://disasterrecovery.com.au/events/cyclone-narelle-western-australia-2026',
    type: 'website',
  },
};

export default function CycloneNarelleWA2026Page() {
  return (
    <DisasterEventPage
      eventName="Narelle"
      eventType="cyclone"
      eventPhase="recovery"
      state="Western Australia"
      stateAbbr="WA"
      year={2026}
      iicrcStandard="IICRC S500:2025 (Water Damage Restoration) and S700:2025 (covers wind and structural scope)"
      alertNote="Category 4 at peak intensity. 1,800+ ICA claims confirmed across 6 DRFA-declared shires [Insurance Council of Australia]. AGDRP activated 10 April 2026."
      slug="events/cyclone-narelle-western-australia-2026"
      metaTitle="Cyclone Narelle WA 2026 — Category 4 Recovery & Insurance Claims | Disaster Recovery"
      metaDescription="Cyclone Narelle Western Australia 2026. Category 4 at peak intensity. 1,800+ ICA claims confirmed across 6 DRFA-declared shires. IICRC-certified restoration contractors. Government assistance and insurance claims support."
      affectedLGAs={['Exmouth', 'Carnarvon', 'Shark Bay', 'Ashburton', 'Upper Gascoyne', 'Yalgoo']}
      remoteLGAs={['Ashburton', 'Upper Gascoyne', 'Yalgoo']}
      remoteLGANote="Contact us for a specialist referral — contractor availability in remote Gascoyne and Mid-West shires is being confirmed."
      showEmergencyWarning
      eshaDeadline="2026-04-27"
      governmentHotline="1800 032 965"
      financialAssistance={[
        {
          name: 'Australian Government Disaster Recovery Payment (AGDRP)',
          provider: 'Services Australia',
          description:
            'One-off federal payment for eligible adults and children seriously affected by Cyclone Narelle. Activated 10 April 2026 (2pm AWST). Eligible LGAs: Carnarvon (including Coral Bay, Inggarda, Kennedy Range, Lyndon, Minilya, North Plantations, Wooramel, Yandoo Creek) and Exmouth (including Learmonth, North West Cape). Claim via myGov.',
          amounts: '$1,000 per eligible adult | $400 per eligible child',
          hotline: '180 22 66',
          applicationUrl: 'https://www.servicesaustralia.gov.au/disaster-recovery-payment',
        },
        {
          name: "WA Premier's Disaster Relief Payment",
          provider: 'WA State Government',
          description:
            'One-off payment for households where the primary dwelling has been destroyed or severely damaged as a direct result of Cyclone Narelle. Requires inspection confirmation of damage level. Applied via DFES SmartyGrants.',
          amounts: '$4,000 (destroyed/severely damaged) | $2,000 (major damage)',
          hotline: '1800 032 965',
          applicationUrl: 'https://www.dfes.wa.gov.au/recovery',
        },
        {
          name: 'WA Emergency Hardship Assistance',
          provider: 'WA Department of Communities',
          description:
            'Immediate financial assistance to help meet essential needs following Cyclone Narelle. Available to eligible individuals and families in declared shires.',
          amounts: '$150 per person | max $750 per family',
          deadline: '27 April 2026',
          hotline: '1800 032 965',
          applicationUrl: 'https://www.communities.wa.gov.au/disaster-relief',
        },
        {
          name: 'ARPC Declared Cyclone Event — Insurance Claims',
          provider: 'Australian Reinsurance Pool Corporation',
          description:
            'Cyclone Narelle has been declared a Cyclone Event by ARPC. This may affect how cyclone damage is treated under your insurance policy. Contact your insurer to understand your entitlements under ARPC cyclone cover.',
          hotline: '1800 032 965',
        },
      ]}
      governmentApplicationUrl="https://www.dfes.wa.gov.au/recovery"
      governmentApplicationLabel="WA Disaster Recovery"
      claimsHotline="1300 309 361"
    />
  );
}
