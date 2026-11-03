/**
 * Queensland Floods 2025 — Recovery Page
 *
 * ICA Significant Event declaration.
 * ESHA general applications closed 7 April 2026.
 * Extended ESHA available for 10 LGAs until 27 April 2026.
 * Personal Hardship Assistance open until 27 April 2026.
 * Structural Assistance Grants (up to $80,000) open for eligible homeowners.
 *
 * ACL s18 compliant — no unverified statistics.
 */

import type { Metadata } from 'next';
import DisasterEventPage from '@/components/events/DisasterEventPage';

export const metadata: Metadata = {
  title: 'Queensland Floods 2025 — Insurance Claims & Recovery | Disaster Recovery',
  description:
    'Queensland Floods 2025. ICA Significant Event declared. Extended ESHA and Structural Assistance Grants still open for eligible homeowners in declared LGAs. IICRC-certified restoration contractors across all affected regions.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/queensland-floods-2025',
  },
  openGraph: {
    title: 'Queensland Floods 2025 — Recovery & Insurance Claims | Disaster Recovery',
    description:
      'Queensland Floods 2025 recovery support. Extended ESHA open until 27 April. Structural Assistance Grants up to $80,000 available. IICRC-certified contractors across all declared LGAs.',
    url: 'https://disasterrecovery.com.au/events/queensland-floods-2025',
    type: 'website',
  },
};

export default function QueenslandFloods2025Page() {
  return (
    <DisasterEventPage
      eventName="Queensland Floods"
      eventType="flood"
      eventPhase="recovery"
      state="Queensland"
      stateAbbr="QLD"
      year={2025}
      iicrcStandard="IICRC S500:2025 (Water Damage Restoration)"
      slug="events/queensland-floods-2025"
      metaTitle="Queensland Floods 2025 — Insurance Claims & Recovery | Disaster Recovery"
      metaDescription="Queensland Floods 2025. ICA Significant Event. Extended ESHA and Structural Assistance Grants available. IICRC-certified restoration contractors across all declared LGAs."
      affectedLGAs={[
        'Brisbane',
        'Gold Coast',
        'Ipswich',
        'Logan',
        'Lockyer Valley',
        'Moreton Bay',
        'Scenic Rim',
        'Somerset',
        'Sunshine Coast',
        'Toowoomba',
      ]}
      remoteLGAs={[]}
      governmentHotline="1800 173 349"
      financialAssistance={[
        {
          name: 'Extended Essential Household Assistance (ESHA)',
          provider: 'Queensland Government',
          description:
            'Extended ESHA remains open for eligible residents in 10 declared LGAs. Provides assistance to replace essential household contents destroyed or damaged by the Queensland Floods. General ESHA applications closed 7 April 2026 — extended ESHA deadline applies.',
          deadline: '27 April 2026',
          hotline: '1800 173 349',
          applicationUrl:
            'https://www.qld.gov.au/community/disasters-emergencies/disasters/money-finance',
        },
        {
          name: 'Personal Hardship Assistance',
          provider: 'Queensland Government',
          description:
            'Financial assistance for individuals and families experiencing personal hardship as a direct result of the Queensland Floods. Covers essential needs including food, clothing, and temporary accommodation.',
          deadline: '27 April 2026',
          hotline: '1800 173 349',
          applicationUrl:
            'https://www.qld.gov.au/community/disasters-emergencies/disasters/money-finance',
        },
        {
          name: 'Structural Assistance Grant',
          provider: 'Queensland Government',
          description:
            'For repair of a disaster-damaged dwelling to make it safe and habitable. The largest grant available to homeowners affected by the Queensland Floods. Requires inspection to confirm damage level and eligibility.',
          amounts: 'Up to $80,000',
          hotline: '1800 173 349',
          applicationUrl:
            'https://www.qld.gov.au/community/disasters-emergencies/disasters/money-finance/eligibility-apply',
        },
        {
          name: 'Australian Government Disaster Recovery Payment',
          provider: 'Services Australia',
          description:
            'One-off payment for eligible adults and children seriously affected by the Queensland Floods — homes destroyed, severely damaged, serious injury, or family member death.',
          amounts: '$1,000 per eligible adult | $400 per eligible child',
          applicationUrl: 'https://www.servicesaustralia.gov.au/disaster-recovery-payment',
          hotline: '180 22 66',
        },
        {
          name: 'Disaster Recovery Allowance',
          provider: 'Services Australia',
          description:
            'Income support for employees, primary producers, and sole traders who lost income as a direct result of the Queensland Floods.',
          amounts: 'Up to 13 weeks of income support',
          applicationUrl: 'https://www.servicesaustralia.gov.au/disaster-recovery-allowance',
          hotline: '180 22 66',
        },
      ]}
      governmentApplicationUrl="https://www.qld.gov.au/community/disasters-emergencies/disasters/money-finance/eligibility-apply"
      governmentApplicationLabel="Queensland Flood Financial Assistance — QLD Government"
      claimsHotline="1300 309 361"
    />
  );
}
