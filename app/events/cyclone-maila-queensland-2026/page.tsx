/**
 * Cyclone Maila — Queensland 2026 (Evergreen pivot — DR-534)
 *
 * Removed frozen Cat 5 / 215 km/h / landfall date language.
 * All BOM data cited via live source links only (IDQ65002 etc).
 * ACL s29(1)(g)/(m) compliant — no superlatives not verbatim-sourced.
 * No phone numbers per site rules — use governmentApplicationUrl only.
 */

import type { Metadata } from 'next';
import DisasterEventPage from '@/components/events/DisasterEventPage';
import type { FinancialAssistanceItem } from '@/components/events/DisasterEventPage';

export const metadata: Metadata = {
  title: 'Tropical Cyclone Maila Queensland 2026 — Preparation & Recovery | Disaster Recovery',
  description:
    'Tropical Cyclone Maila — whatever it brings, flood, rainfall, or storm surge, NRPG IICRC-certified contractors are ready across FNQ. Lodge your claim online 24/7. Follow BOM for live track and conditions.',
  alternates: {
    canonical: 'https://disasterrecovery.com.au/events/cyclone-maila-queensland-2026',
  },
  openGraph: {
    title: 'TC Maila FNQ — Preparation & Recovery | Disaster Recovery',
    description:
      'Tropical Cyclone Maila — whatever it brings. NRPG IICRC-certified contractors ready across FNQ. Follow BOM for live conditions. Lodge your claim 24/7.',
    url: 'https://disasterrecovery.com.au/events/cyclone-maila-queensland-2026',
    type: 'website',
  },
};

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
];

export default function CycloneMailaQLD2026Page() {
  return (
    <DisasterEventPage
      showEmergencyWarning={true}
      eventName="Maila"
      eventType="cyclone"
      eventPhase="pre-landfall"
      state="Queensland"
      stateAbbr="QLD"
      year={2026}
      // S500:2025 (water/storm surge) + S700:2025 (wind/structural damage)
      iicrcStandard="IICRC S500:2025 (Water Damage Restoration) and S700:2025 (Fire and Smoke Damage Restoration — covers wind/structural scope)"
      alertNote="Follow BOM for live TC Maila track and warnings — bom.gov.au/cyclone or IDQ65002."
      slug="events/cyclone-maila-queensland-2026"
      metaTitle="Tropical Cyclone Maila Queensland 2026 — Preparation & Recovery | Disaster Recovery"
      metaDescription="Tropical Cyclone Maila — whatever it brings, flood, rainfall, or storm surge, NRPG IICRC-certified contractors are ready across FNQ. Lodge your claim online 24/7. Follow BOM for live track and conditions."
      // DR-534 evergreen pivot — frozen category/speed/landfall data removed.
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
      remoteLGAs={['Cook (Cape York)', 'Cooktown']}
      financialAssistance={financialAssistanceItems}
      governmentApplicationUrl="https://www.disaster.qld.gov.au/"
      governmentApplicationLabel="Queensland Disaster Hub"
    />
  );
}
