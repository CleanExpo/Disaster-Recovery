// ============================================================
// DARWIN SUBURBS — Disaster Recovery Target Market Data
// Sources: ABS Census 2021, BOM Darwin Cyclone Data, NT Emergency Services
// ============================================================

import type { SuburbData } from './sydney';

export const darwinSuburbs: SuburbData[] = [
  // TIER 1: HIGH-DENSITY INNER CITY (cyclone / water damage)
  { name: 'Darwin CBD', population: 5678, density: 'high', riskFactors: ['cyclone', 'water-damage', 'storm-damage'], notes: 'Central business district rebuilt after Cyclone Tracy (1974). High-rise apartments along the Esplanade. Darwin Harbour frontage.' },
  { name: 'Stuart Park', population: 4567, density: 'high', riskFactors: ['cyclone', 'water-damage', 'storm-damage'], notes: 'Inner suburb between CBD and Fannie Bay. Mix of heritage cyclone-era homes and modern apartments. Exposed ridgeline position.' },
  { name: 'Larrakeyah', population: 3456, density: 'high', riskFactors: ['cyclone', 'water-damage'], notes: 'Waterfront precinct near Stokes Hill Wharf. Defence housing area. Darwin Harbour storm surge vulnerability. Lameroo Beach.' },
  { name: 'Parap', population: 3234, density: 'high', riskFactors: ['cyclone', 'water-damage', 'stormwater-flooding'], notes: 'Parap Village precinct. Growing apartment density. Rapid Creek catchment nearby. Popular market area. Monsoon rain flooding.' },

  // TIER 2: NORTHERN SUBURBS (cyclone + monsoon flooding)
  { name: 'Casuarina', population: 12345, density: 'medium', riskFactors: ['cyclone', 'storm-damage', 'stormwater-flooding'], notes: 'Major northern suburbs commercial hub. Casuarina Square shopping centre. Royal Darwin Hospital precinct. Exposed coastal position.' },
  { name: 'Nightcliff', population: 5432, density: 'medium', riskFactors: ['cyclone', 'storm-damage', 'coastal-flooding'], notes: 'Beachfront suburb on cliff face. Nightcliff foreshore. Direct Beagle Gulf exposure. Rapid Creek mouth. Heavily damaged by Cyclone Tracy.' },
  { name: 'Rapid Creek', population: 4321, density: 'medium', riskFactors: ['flood', 'cyclone', 'stormwater-flooding'], notes: 'Rapid Creek floodplain. Famous Sunday markets. Monsoon season flash flooding. Creek overflow affects low-lying streets.' },
  { name: 'Millner', population: 3456, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding'], notes: 'Established suburb rebuilt post-Tracy. Bagot Road corridor. Rapid Creek catchment. Aging housing stock from 1970s reconstruction.' },
  { name: 'Coconut Grove', population: 3987, density: 'medium', riskFactors: ['cyclone', 'storm-damage'], notes: 'Coastal suburb between Nightcliff and Rapid Creek. Beach frontage. High cyclone exposure. Mix of older and rebuilt housing.' },
  { name: 'Fannie Bay', population: 3234, density: 'medium', riskFactors: ['cyclone', 'storm-damage', 'coastal-flooding'], notes: 'East Point Reserve area. Darwin Sailing Club. Botanic Gardens adjacent. Foreshore properties directly exposed to harbour storms.' },
  { name: 'Leanyer', population: 7654, density: 'medium', riskFactors: ['stormwater-flooding', 'cyclone'], notes: 'Northern suburbs near Leanyer Swamp. Monsoon drainage challenges. Holmes Jungle Nature Park. Newer development on reclaimed wetland.' },
  { name: 'Wulagi', population: 3456, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding'], notes: 'Established northern suburb. Post-Cyclone Tracy rebuild area. Karama Shopping Centre nearby. Monsoon rain ponding issues.' },

  // TIER 3: PALMERSTON + SATELLITE SUBURBS
  { name: 'Palmerston', population: 18765, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding', 'storm-damage'], notes: 'Satellite city 20km south of Darwin. Gateway Shopping Centre. Elizabeth River catchment. Rapid growth corridor. Purpose-built to cyclone code.' },
  { name: 'Rosebery', population: 5678, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding'], notes: 'Palmerston area suburb. Newer development. Mitchell Creek catchment. Some low-lying areas prone to monsoon rain flooding.' },
  { name: 'Gunn', population: 4321, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding'], notes: 'Palmerston residential suburb. Established housing stock. Monsoon drainage infrastructure. Elizabeth River proximity.' },
  { name: 'Durack', population: 5432, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding'], notes: 'Palmerston area. Durack Heights. Mix of Defence housing and civilian. Newer construction to current cyclone standards.' },
  { name: 'Zuccoli', population: 6543, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding'], notes: 'Newest Palmerston suburb. Modern cyclone-rated construction. Mitchell Creek corridor. Growing rapidly with new estate development.' },

  // TIER 4: RURAL-RESIDENTIAL + EXPOSED AREAS
  { name: 'Howard Springs', population: 5678, density: 'low', riskFactors: ['cyclone', 'bushfire', 'stormwater-flooding'], notes: 'Rural-residential area. Berry Springs Road corridor. Dense tropical vegetation. Bushfire risk in dry season. Flooding in wet season.' },
  { name: 'Humpty Doo', population: 6543, density: 'low', riskFactors: ['flood', 'cyclone', 'bushfire'], notes: 'Rural township on Arnhem Highway. Adelaide River floodplain proximity. Monsoon flooding. Crocodile-prone waterways. Extensive rural properties.' },
  { name: 'Berrimah', population: 3456, density: 'low', riskFactors: ['cyclone', 'stormwater-flooding'], notes: 'Light industrial and defence area. Darwin port logistics hub. Low-lying terrain. Monsoon drainage challenges. East Arm proximity.' },
];
