import type { LocationData } from './_schema';

// Partial location data keyed by state code — used as fallback for cities
// without a dedicated JSON file. Only includes fields that are state-level
// (climate, risks, seasonal patterns). City-specific fields are omitted.
type StateDefaults = Pick<LocationData,
  'stateFullName' | 'timezone' | 'climate' | 'risks' | 'seasonalRisks' | 'insuranceProfile'
>;

export const STATE_DEFAULTS: Record<string, StateDefaults> = {
  VIC: {
    stateFullName: 'Victoria',
    timezone: 'Australia/Melbourne',
    climate: {
      annualRainfallMm: 603,
      avgMaxTempC: 19.8,
      avgMinTempC: 9.6,
      avgHumidityPercent: 57,
      wetMonths: ['Oct', 'Nov', 'Jun'],
      dryMonths: ['Jan', 'Feb', 'Mar'],
      frostRisk: true,
      coastalExposure: true,
    },
    risks: {
      primary: [
        { type: 'flash flooding', severity: 'high', description: 'Victoria experiences sudden flooding from intense rainfall, particularly during La Nina years.' },
        { type: 'bushfire proximity', severity: 'high', description: 'Grassland and forest fires threaten urban fringes across the state.' },
        { type: 'wind damage', severity: 'moderate', description: 'Severe storms with destructive winds regularly damage roofing and trees.' },
      ],
      secondary: [
        { type: 'burst pipes from cold snaps', severity: 'moderate', description: 'Winter temperatures cause pipe failures, particularly in older properties.' },
      ],
    },
    seasonalRisks: [
      { month: 'Jan', risks: ['bushfire', 'heatwave damage'] },
      { month: 'Feb', risks: ['bushfire', 'severe thunderstorms'] },
      { month: 'Mar', risks: ['autumn storms', 'flash flooding'] },
      { month: 'Apr', risks: ['storm damage'] },
      { month: 'May', risks: ['early cold snap pipe bursts'] },
      { month: 'Jun', risks: ['winter storms', 'flooding'] },
      { month: 'Jul', risks: ['pipe bursts', 'storm damage'] },
      { month: 'Aug', risks: ['wind damage', 'flooding'] },
      { month: 'Sep', risks: ['spring storms'] },
      { month: 'Oct', risks: ['severe storms', 'flooding'] },
      { month: 'Nov', risks: ['storm cells', 'early bushfire season'] },
      { month: 'Dec', risks: ['bushfire', 'severe thunderstorms'] },
    ],
    insuranceProfile: {
      topClaimType: 'storm damage',
      icaRegion: 'Victoria',
    },
  },

  WA: {
    stateFullName: 'Western Australia',
    timezone: 'Australia/Perth',
    climate: {
      annualRainfallMm: 734,
      avgMaxTempC: 24.7,
      avgMinTempC: 12.7,
      avgHumidityPercent: 52,
      wetMonths: ['May', 'Jun', 'Jul', 'Aug'],
      dryMonths: ['Dec', 'Jan', 'Feb', 'Mar'],
      frostRisk: false,
      coastalExposure: true,
    },
    risks: {
      primary: [
        { type: 'bushfire threat', severity: 'high', description: 'Western Australia faces severe bushfire risk, particularly in the Perth Hills and wheatbelt regions.' },
        { type: 'cyclone impact', severity: 'high', description: 'Northern WA and occasionally the metro area are affected by tropical cyclones from November to April.' },
        { type: 'flash flooding', severity: 'moderate', description: 'Intense winter rain systems and summer thunderstorms produce localised flooding events.' },
      ],
      secondary: [
        { type: 'extreme heat damage', severity: 'moderate', description: 'Summer heatwaves above 40C cause material expansion, pipe stress, and aircon failures.' },
      ],
    },
    seasonalRisks: [
      { month: 'Jan', risks: ['bushfire', 'extreme heat damage'] },
      { month: 'Feb', risks: ['bushfire', 'cyclone risk (northern WA)'] },
      { month: 'Mar', risks: ['late cyclone season', 'thunderstorms'] },
      { month: 'Apr', risks: ['autumn storms'] },
      { month: 'May', risks: ['winter storm onset', 'flooding'] },
      { month: 'Jun', risks: ['heavy rainfall', 'flooding'] },
      { month: 'Jul', risks: ['storm damage', 'flooding'] },
      { month: 'Aug', risks: ['wind damage', 'coastal erosion'] },
      { month: 'Sep', risks: ['spring storms'] },
      { month: 'Oct', risks: ['early bushfire season'] },
      { month: 'Nov', risks: ['bushfire', 'cyclone season begins'] },
      { month: 'Dec', risks: ['bushfire', 'extreme heat', 'cyclone risk'] },
    ],
    insuranceProfile: {
      topClaimType: 'bushfire damage',
      icaRegion: 'Western Australia',
    },
  },

  SA: {
    stateFullName: 'South Australia',
    timezone: 'Australia/Adelaide',
    climate: {
      annualRainfallMm: 546,
      avgMaxTempC: 22.4,
      avgMinTempC: 11.6,
      avgHumidityPercent: 50,
      wetMonths: ['Jun', 'Jul', 'Aug'],
      dryMonths: ['Jan', 'Feb', 'Mar'],
      frostRisk: true,
      coastalExposure: true,
    },
    risks: {
      primary: [
        { type: 'bushfire risk', severity: 'high', description: 'The Adelaide Hills and Mount Lofty Ranges create severe bushfire corridors threatening suburban areas.' },
        { type: 'storm surges', severity: 'moderate', description: 'Coastal suburbs face storm surge and erosion during severe winter weather systems.' },
        { type: 'flash flooding', severity: 'moderate', description: 'Intense rainfall on dry ground causes rapid runoff and localised flash flooding.' },
      ],
      secondary: [
        { type: 'heat-related pipe failures', severity: 'moderate', description: 'Extended summer heatwaves stress plumbing systems, causing pipe failures in older buildings.' },
      ],
    },
    seasonalRisks: [
      { month: 'Jan', risks: ['bushfire', 'extreme heat damage'] },
      { month: 'Feb', risks: ['bushfire', 'heatwave pipe stress'] },
      { month: 'Mar', risks: ['late bushfire season', 'autumn storms'] },
      { month: 'Apr', risks: ['storm damage'] },
      { month: 'May', risks: ['winter storm onset'] },
      { month: 'Jun', risks: ['heavy rainfall', 'flooding'] },
      { month: 'Jul', risks: ['storm damage', 'pipe bursts'] },
      { month: 'Aug', risks: ['wind damage', 'coastal erosion'] },
      { month: 'Sep', risks: ['spring storms'] },
      { month: 'Oct', risks: ['early bushfire season', 'storm cells'] },
      { month: 'Nov', risks: ['bushfire', 'severe thunderstorms'] },
      { month: 'Dec', risks: ['bushfire', 'extreme heat'] },
    ],
    insuranceProfile: {
      topClaimType: 'bushfire damage',
      icaRegion: 'South Australia',
    },
  },

  QLD: {
    stateFullName: 'Queensland',
    timezone: 'Australia/Brisbane',
    climate: {
      annualRainfallMm: 1149,
      avgMaxTempC: 26.6,
      avgMinTempC: 16.3,
      avgHumidityPercent: 63,
      wetMonths: ['Jan', 'Feb', 'Mar', 'Dec'],
      dryMonths: ['Jul', 'Aug', 'Sep'],
      cycloneSeason: 'November to April',
      frostRisk: false,
      coastalExposure: true,
    },
    risks: {
      primary: [
        { type: 'tropical flooding', severity: 'high', description: 'Queensland experiences major riverine and flash flooding, with the Brisbane River corridor particularly vulnerable.' },
        { type: 'cyclone damage', severity: 'high', description: 'Tropical cyclones bring destructive winds, storm surge, and extreme rainfall to coastal Queensland.' },
        { type: 'severe storm cells', severity: 'high', description: 'Supercell thunderstorms produce large hail, damaging winds, and heavy rainfall across southeast Queensland.' },
      ],
      secondary: [
        { type: 'humidity-driven mould', severity: 'moderate', description: 'Year-round subtropical humidity creates persistent mould risk, particularly after water intrusion events.' },
      ],
    },
    seasonalRisks: [
      { month: 'Jan', risks: ['flooding', 'cyclone risk', 'severe storms'] },
      { month: 'Feb', risks: ['flooding', 'cyclone risk', 'humidity mould'] },
      { month: 'Mar', risks: ['late cyclone season', 'flooding'] },
      { month: 'Apr', risks: ['autumn storms', 'mould growth'] },
      { month: 'May', risks: ['storm damage'] },
      { month: 'Jun', risks: ['dry season maintenance'] },
      { month: 'Jul', risks: ['dry season maintenance'] },
      { month: 'Aug', risks: ['early bushfire risk (inland)'] },
      { month: 'Sep', risks: ['spring storms', 'bushfire risk'] },
      { month: 'Oct', risks: ['severe storms', 'early cyclone season'] },
      { month: 'Nov', risks: ['cyclone season begins', 'severe storms'] },
      { month: 'Dec', risks: ['cyclone risk', 'flooding', 'severe storms'] },
    ],
    insuranceProfile: {
      topClaimType: 'water/flood damage',
      icaRegion: 'Queensland',
    },
  },
};

export function getStateDefaults(state: string): StateDefaults | undefined {
  return STATE_DEFAULTS[state];
}
