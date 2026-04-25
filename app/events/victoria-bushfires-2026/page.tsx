/**
 * Victoria Bushfires January 2026 — Recovery Page
 *
 * Event: Victorian Bushfires commencing 7 January 2026
 * Source: disasterassist.gov.au — victorian-bushfires-commencing-7-Jan-2026
 *
 * G1 ✅ Official declaration confirmed (23 LGAs declared).
 * G2 ✅ LGAs verified from Premier VIC press release.
 * G3 ✅ Financial assistance verified from emergency.vic.gov.au.
 *        Emergency Relief Payments now closed. DRA deadline 21 July 2026.
 * G5 ✅ Phase: recovery (fires commenced 7 January 2026).
 *
 * GAP-023/GAP-046: IICRC standard corrected from FSRT technician cert to
 * S700:2025 (Standard for Fire and Smoke Damage Restoration).
 * PERILS AU$786M estimate referenced — subject to PERILS update April 2026.
 * ICA Declared Catastrophe status confirmed.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import type { Metadata } from 'next';
import DisasterEventPage from '@/components/events/DisasterEventPage';

export const metadata: Metadata = {
  title: 'Victoria Bushfires 2026 — Insurance Claims & Recovery | Disaster Recovery',
  description:
    'Victorian Bushfires (January 2026). 23 declared LGAs including East Gippsland, Alpine, Greater Bendigo, and Wodonga. IICRC-certified restoration contractors for smoke damage, water damage from suppression, and insurance claims support.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/victoria-bushfires-2026',
  },
  openGraph: {
    title: 'Victoria Bushfires 2026 — Recovery & Insurance Claims | Disaster Recovery',
    description:
      'Expert disaster restoration for Victoria bushfire-affected properties. Smoke remediation, suppression water damage, contents cleaning — IICRC-certified contractors across all 23 declared LGAs.',
    url: 'https://disasterrecovery.com.au/events/victoria-bushfires-2026',
    type: 'website',
  },
};

export default function VictoriaBushfires2026Page() {
  return (
    <DisasterEventPage
      eventName="Victoria Bushfires"
      eventType="bushfire"
      eventPhase="recovery"
      state="Victoria"
      stateAbbr="VIC"
      year={2026}
      iicrcStandard="ANSI/IICRC S700:2025 (Fire and Smoke Damage Restoration)"
      slug="events/victoria-bushfires-2026"
      metaTitle="Victoria Bushfires 2026 — Insurance Claims & Recovery | Disaster Recovery"
      metaDescription="Victorian Bushfires January 2026. 23 declared LGAs. IICRC-certified restoration contractors for smoke damage, suppression water damage, and insurance claims support."
      alertNote="ICA Declared Catastrophe. PERILS has estimated insured losses — refer to perils.net for the current figure as estimates are updated post-event. DRA deadline: 21 July 2026."
      showEmergencyWarning={false}
      // 23 LGAs declared per Premier VIC press release
      affectedLGAs={[
        'Alpine',
        'Ararat',
        'Benalla',
        'Campaspe',
        'Colac Otway',
        'Corangamite',
        'East Gippsland',
        'Golden Plains',
        'Greater Bendigo',
        'Horsham',
        'Macedon Ranges',
        'Mansfield',
        'Mildura',
        'Mitchell',
        'Moira',
        'Mount Alexander',
        'Murrindindi',
        'Pyrenees',
        'Strathbogie',
        'Towong',
        'Wellington',
        'Wodonga',
        'Yarra Ranges',
      ]}
      remoteLGAs={[]}
      governmentHotline="1800 560 760"
      // Financial assistance — verified from emergency.vic.gov.au
      financialAssistance={[
        {
          name: 'Australian Government Disaster Recovery Payment (AGDRP)',
          provider: 'Services Australia',
          description:
            'One-off payment for eligible adults and children whose homes were destroyed or severely damaged, who suffered serious injury, or whose family members died as a direct result of the January 2026 Victorian bushfires.',
          amounts: '$1,000 per eligible adult | $400 per eligible child',
          applicationUrl: 'https://www.servicesaustralia.gov.au/vic-bushfires-jan-2026',
          hotline: '180 22 66',
        },
        {
          name: 'Disaster Recovery Allowance (DRA)',
          provider: 'Services Australia',
          description:
            'Income support for employees, primary producers, and sole traders who experienced loss of income as a direct result of the January 2026 Victorian bushfires.',
          amounts: 'Up to 13 weeks of income support',
          deadline: '21 July 2026',
          applicationUrl: 'https://www.servicesaustralia.gov.au/disaster-recovery-allowance',
          hotline: '180 22 66',
        },
        {
          name: 'Re-establishment Assistance Payment',
          provider: 'Victorian Government / Emergency Recovery Victoria',
          description:
            'Financial assistance for uninsured or underinsured homeowners with limited resources who were unable to occupy their home for 7 or more days due to fire damage.',
          applicationUrl: 'https://emergency.vic.gov.au/relief-and-recovery/1154',
          hotline: '1800 560 760',
        },
        {
          name: 'Primary Producer Grants',
          provider: 'Victorian Government',
          description:
            'Grants to support primary producers with the cost of clean-up and emergency measures following the January 2026 bushfires.',
          amounts: 'Up to $75,000',
          applicationUrl: 'https://emergency.vic.gov.au/relief-and-recovery/1154',
          hotline: '1800 560 760',
        },
        {
          name: 'Clean-up Program',
          provider: 'Victorian Government',
          description:
            'Funding for demolition and hazardous material removal for uninsured or underinsured homeowners whose properties were destroyed or significantly damaged by the bushfires.',
          applicationUrl: 'https://emergency.vic.gov.au/relief-and-recovery/1154',
          hotline: '1800 560 760',
        },
      ]}
      governmentApplicationUrl="https://emergency.vic.gov.au/relief-and-recovery/1154"
      governmentApplicationLabel="Emergency Recovery Victoria — January 2026 Bushfires"
    />
  );
}
