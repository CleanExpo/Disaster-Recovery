/**
 * Ex-Tropical Cyclone Alfred — Queensland 2025 (Recovery)
 *
 * TC Alfred made landfall SE Queensland / Northern NSW, late February 2025.
 * ICA Insurance Catastrophe declared. 132,000+ claims lodged (PERILS final, 13 Apr 2026). AU$1.877B insured losses.
 *
 * G1 ✅ ICA Catastrophe declaration confirmed.
 * G2 ✅ Affected LGAs: 16 QLD councils declared under DRFA.
 * G3 ✅ Financial assistance from QRA official news (published 11 March 2025).
 *        Most application deadlines have passed. Insurance/AFCA pathways remain open.
 * G5 ✅ Phase: recovery (TC Alfred made landfall Feb 2025).
 *
 * ACL s18 compliant — no unverified statistics.
 */

import type { Metadata } from 'next';
import DisasterEventPage from '@/components/events/DisasterEventPage';

export const metadata: Metadata = {
  title: 'Ex-Cyclone Alfred Queensland 2025 — Insurance Claims & Recovery | Disaster Recovery',
  description:
    'Ex-Tropical Cyclone Alfred hit SE Queensland and northern NSW in February 2025. ICA Insurance Catastrophe declared. IICRC-certified restoration contractors for water damage, storm damage, and insurance claims support across all 16 declared LGAs.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/cyclone-alfred-queensland-2025',
  },
  openGraph: {
    title: 'Ex-Cyclone Alfred QLD 2025 — Insurance Claims & Restoration | Disaster Recovery',
    description:
      'Insurance Catastrophe declared for ex-TC Alfred. 132,000+ insurance claims lodged. AU$1.877B final insured losses (PERILS). Expert restoration contractors across SE Queensland — water damage, storm damage, and claims support.',
    url: 'https://disasterrecovery.com.au/events/cyclone-alfred-queensland-2025',
    type: 'website',
  },
};

export default function CycloneAlfredQLD2025Page() {
  return (
    <DisasterEventPage
      eventName="Alfred"
      eventType="cyclone"
      eventPhase="recovery"
      state="Queensland"
      stateAbbr="QLD"
      year={2025}
      iicrcStandard="IICRC S500:2025 (Water Damage Restoration)"
      slug="events/cyclone-alfred-queensland-2025"
      metaTitle="Ex-Cyclone Alfred Queensland 2025 — Insurance Claims & Recovery | Disaster Recovery"
      metaDescription="Ex-Tropical Cyclone Alfred SE Queensland 2025. ICA Insurance Catastrophe declared. IICRC-certified restoration contractors, insurance claims support, across all declared LGAs."
      // Declared under DRFA per QRA (published 11 March 2025)
      affectedLGAs={[
        'Brisbane',
        'Bundaberg',
        'Fraser Coast',
        'Gold Coast',
        'Gympie',
        'Ipswich',
        'Lockyer Valley',
        'Logan',
        'Moreton Bay',
        'Noosa',
        'Redland',
        'Scenic Rim',
        'Somerset',
        'Southern Downs',
        'Sunshine Coast',
        'Toowoomba',
      ]}
      remoteLGAs={[]}
      governmentHotline="1800 173 349"
      financialAssistance={[
        {
          name: 'Structural Assistance Grant',
          provider: 'Queensland Government',
          description:
            'For repair of a disaster-damaged dwelling to make it safe and habitable. The largest grant available to homeowners affected by TC Alfred.',
          amounts: 'Up to $80,000',
          applicationUrl:
            'https://www.qld.gov.au/community/disasters-emergencies/disasters/money-finance/eligibility-apply/tc-alfred-march-2025',
          hotline: '1800 173 349',
        },
        {
          name: 'Essential Household Contents Grant',
          provider: 'Queensland Government',
          description:
            'Assistance to replace essential household contents destroyed or damaged by TC Alfred.',
          amounts: 'Up to $1,765 for individuals | Up to $5,300 for families',
          applicationUrl:
            'https://www.qld.gov.au/community/disasters-emergencies/disasters/money-finance/eligibility-apply/tc-alfred-march-2025',
          hotline: '1800 173 349',
        },
        {
          name: 'Essential Services Reconnection Support',
          provider: 'Queensland Government',
          description:
            'Support for reconnection of essential services (power, water, gas) damaged by TC Alfred.',
          amounts: 'Up to $5,000',
          applicationUrl:
            'https://www.qld.gov.au/community/disasters-emergencies/disasters/money-finance/eligibility-apply/tc-alfred-march-2025',
          hotline: '1800 173 349',
        },
        {
          name: 'Australian Government Disaster Recovery Payment',
          provider: 'Services Australia',
          description:
            'One-off payment for eligible adults and children seriously affected by TC Alfred. For those whose homes were destroyed, severely damaged, or who suffered serious injury.',
          amounts: '$1,000 per eligible adult | $400 per eligible child',
          applicationUrl: 'https://www.servicesaustralia.gov.au/disaster-recovery-payment',
          hotline: '180 22 66',
        },
        {
          name: 'Disaster Recovery Allowance',
          provider: 'Services Australia',
          description:
            'Income support for employees, primary producers, and sole traders who lost income as a direct result of TC Alfred.',
          amounts: 'Up to 13 weeks of income support',
          applicationUrl: 'https://www.servicesaustralia.gov.au/disaster-recovery-allowance',
          hotline: '180 22 66',
        },
      ]}
      governmentApplicationUrl="https://www.qld.gov.au/community/disasters-emergencies/disasters/money-finance/eligibility-apply/tc-alfred-march-2025"
      governmentApplicationLabel="TC Alfred Financial Assistance — QLD Government"
    />
  );
}
