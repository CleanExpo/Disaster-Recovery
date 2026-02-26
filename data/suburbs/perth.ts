// ============================================================
// PERTH SUBURBS — Disaster Recovery Target Market Data
// Sources: ABS Census 2021, BOM Perth Climate Data, DFES Flood Mapping
// ============================================================

import type { SuburbData } from './sydney';

export const perthSuburbs: SuburbData[] = [
  // TIER 1: HIGH-DENSITY INNER CITY (water damage / stormwater flooding)
  { name: 'Perth CBD', population: 9876, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Central business district with high-rise apartments. Aging infrastructure in older commercial buildings. Claisebrook drain catchment.' },
  { name: 'East Perth', population: 8234, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Claisebrook Cove waterfront development. Swan River frontage. Rapid apartment densification since 2010.' },
  { name: 'West Perth', population: 5678, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Mixed commercial/residential precinct. Steep topography channels stormwater toward Kings Park Road.' },
  { name: 'Northbridge', population: 4567, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Entertainment and cultural precinct. Dense apartment blocks. Underground William Street drain prone to surcharging.' },
  { name: 'South Perth', population: 12345, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Swan River peninsula opposite CBD. Riverside apartments vulnerable to flood. Mill Point foreshore flooding history.' },
  { name: 'Subiaco', population: 16789, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Established inner suburb undergoing densification. Jolimont area apartment towers. Mueller Park stormwater issues.' },
  { name: 'Victoria Park', population: 9876, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Albany Highway commercial strip with growing apartment stock. Burswood peninsula nearby. Kent Street drainage catchment.' },

  // TIER 2: HIGH-GROWTH CORRIDORS (water damage / storm)
  { name: 'Joondalup', population: 34567, density: 'medium', riskFactors: ['storm-damage', 'water-damage'], notes: 'Major northern corridor commercial hub. Wanneroo Road corridor. Large retail and university precinct. Exposed coastal proximity.' },
  { name: 'Fremantle', population: 8234, density: 'medium', riskFactors: ['water-damage', 'storm-damage', 'coastal-flooding'], notes: 'Historic port city. Heritage limestone buildings with unique restoration needs. Swan River mouth. Indian Ocean storm exposure.' },
  { name: 'Scarborough', population: 15678, density: 'medium', riskFactors: ['storm-damage', 'coastal-flooding', 'water-damage'], notes: 'Beachfront high-rise redevelopment. Direct Indian Ocean exposure. Major storm damage risk from winter frontal systems.' },
  { name: 'Cannington', population: 7654, density: 'medium', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Canning River catchment. Carousel Shopping Centre precinct. Established commercial hub with aging building stock.' },
  { name: 'Morley', population: 18234, density: 'medium', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Galleria shopping precinct. Morley Drive commercial corridor. Bayswater Brook catchment flooding history.' },
  { name: 'Cockburn Central', population: 12345, density: 'medium', riskFactors: ['water-damage', 'storm-damage'], notes: 'Rapid growth corridor south of Perth. New transit-oriented development. Bibra Lake wetland catchment proximity.' },
  { name: 'Midland', population: 8765, density: 'medium', riskFactors: ['flood', 'water-damage'], notes: 'Swan River and Helena River confluence. Historic town centre. Major 2017 flooding in low-lying areas. Gateway to Perth Hills.' },

  // TIER 3: FLOOD-PRONE AREAS (Swan River + creek flooding)
  { name: 'Bassendean', population: 15234, density: 'medium', riskFactors: ['flood', 'water-damage'], notes: 'Swan River floodplain. Extensive 1983 flood damage. Success Hill and Ashfield Flats flood-prone areas. Established housing stock.' },
  { name: 'Bayswater', population: 13456, density: 'medium', riskFactors: ['flood', 'stormwater-flooding'], notes: 'Bayswater Brook and Swan River catchment. Eric Singleton Bird Sanctuary flood retention. Low-lying residential areas.' },
  { name: 'Belmont', population: 12345, density: 'medium', riskFactors: ['flood', 'water-damage'], notes: 'Swan River frontage. Great Eastern Highway commercial strip. Ascot racecourse floodplain. Aging housing stock near river.' },
  { name: 'Guildford', population: 4567, density: 'medium', riskFactors: ['flood'], notes: 'Swan River and Helena River junction. Heritage town. Repeated flood events. Flood markers visible on historic buildings.' },
  { name: 'Rivervale', population: 8765, density: 'medium', riskFactors: ['flood', 'water-damage'], notes: 'Swan River bend. Burswood area development. Low-lying residential streets prone to river flooding. Growing apartment density.' },

  // TIER 4: STORM-PRONE + BUSHFIRE SUBURBS
  { name: 'Kalamunda', population: 7654, density: 'low', riskFactors: ['bushfire', 'storm-damage'], notes: 'Perth Hills escarpment. Dense jarrah forest borders. Extreme bushfire risk zone. Limited evacuation routes via Kalamunda Road.' },
  { name: 'Mundaring', population: 4567, density: 'low', riskFactors: ['bushfire', 'storm-damage'], notes: 'Perth Hills bushfire corridor. Mundaring Weir catchment. 2014 Parkerville bushfire affected nearby properties.' },
  { name: 'Armadale', population: 23456, density: 'medium', riskFactors: ['bushfire', 'stormwater-flooding'], notes: 'Foothills suburb at base of Darling Scarp. Wungong Brook flooding. Bushfire prone edges near Bungendore Park.' },
  { name: 'Rockingham', population: 34567, density: 'medium', riskFactors: ['storm-damage', 'coastal-flooding'], notes: 'Coastal city south of Perth. Shoalwater Bay storm surge risk. Garden Island breakwater provides some protection.' },
  { name: 'Mandurah', population: 35678, density: 'medium', riskFactors: ['storm-damage', 'flood', 'coastal-flooding'], notes: 'Peel Inlet estuary. Mandurah Estuary Bridge area flooding. Murray River catchment. Significant coastal storm exposure.' },
];
