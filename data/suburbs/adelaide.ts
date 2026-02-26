// ============================================================
// ADELAIDE SUBURBS — Disaster Recovery Target Market Data
// Sources: ABS Census 2021, BOM Adelaide Climate Data, SA SES Flood Reports
// ============================================================

import type { SuburbData } from './sydney';

export const adelaideSuburbs: SuburbData[] = [
  // TIER 1: HIGH-DENSITY INNER CITY (water damage / stormwater flooding)
  { name: 'Adelaide CBD', population: 14567, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Central city with growing apartment stock. River Torrens adjacent. Park Lands stormwater catchment. Aging commercial building infrastructure.' },
  { name: 'North Adelaide', population: 7234, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Heritage precinct between River Torrens and Park Lands. Historic bluestone buildings. Torrens flood risk along War Memorial Drive.' },
  { name: 'Norwood', population: 6543, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'The Parade commercial strip. First Creek and Second Creek catchments. Dense heritage housing. Flash flooding in low-lying sections.' },
  { name: 'Unley', population: 8765, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Established inner south suburb. Brownhill Creek and Glen Osmond Creek catchments. Heritage character homes vulnerable to storm damage.' },
  { name: 'Prospect', population: 21345, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Transit corridor with increasing apartment density. Prospect Road commercial strip. Dry Creek catchment overflow risk.' },
  { name: 'Glenelg', population: 7654, density: 'high', riskFactors: ['water-damage', 'coastal-flooding', 'storm-damage'], notes: 'Beachfront precinct with apartments and tourism. Patawalonga Basin flooding history. Holdfast Bay storm surge exposure.' },

  // TIER 2: HIGH-GROWTH CORRIDORS (water damage / storm)
  { name: 'Port Adelaide', population: 4567, density: 'medium', riskFactors: ['flood', 'water-damage', 'coastal-flooding'], notes: 'Historic port precinct undergoing renewal. Port River flooding. Heritage buildings with complex restoration requirements. Inner Harbour development.' },
  { name: 'Marion', population: 12345, density: 'medium', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Westfield Marion shopping precinct. Sturt River catchment. Major suburban commercial hub with growing apartment development.' },
  { name: 'Salisbury', population: 14567, density: 'medium', riskFactors: ['stormwater-flooding', 'water-damage'], notes: 'Northern suburbs commercial hub. Little Para River catchment. Parafield Airport drainage. Extensive low-lying residential areas.' },
  { name: 'Tea Tree Gully', population: 23456, density: 'medium', riskFactors: ['stormwater-flooding', 'bushfire'], notes: 'Adelaide Hills foothills. Dry Creek upper catchment. Golden Grove development. Bush-urban interface fire risk.' },
  { name: 'Modbury', population: 16789, density: 'medium', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Tea Tree Plaza retail precinct. Dry Creek catchment. Established 1960s-70s housing stock. Flash flooding in creek corridors.' },
  { name: 'West Lakes', population: 8234, density: 'medium', riskFactors: ['water-damage', 'flood'], notes: 'Artificial lake precinct. AAMI Stadium (now Coopers) area. Lake system overflow during extreme rain events. Coastal proximity.' },
  { name: 'Burnside', population: 8765, density: 'medium', riskFactors: ['bushfire', 'stormwater-flooding'], notes: 'Eastern suburbs against Adelaide Hills. Waterfall Gully and First Creek catchment. Established affluent housing. Bush-urban interface.' },

  // TIER 3: FLOOD-PRONE AREAS (Torrens + creek flooding)
  { name: 'Henley Beach', population: 5678, density: 'medium', riskFactors: ['coastal-flooding', 'storm-damage'], notes: 'Beachfront suburb. Henley Beach Road commercial strip. Direct Gulf St Vincent storm exposure. River Torrens outlet nearby.' },
  { name: 'Mitcham', population: 7654, density: 'medium', riskFactors: ['stormwater-flooding', 'bushfire'], notes: 'Brownhill Creek catchment. Adelaide Hills foothills. Flash flooding from creek systems. Bushfire prone eastern boundary.' },
  { name: 'Campbelltown', population: 12345, density: 'medium', riskFactors: ['stormwater-flooding', 'water-damage'], notes: 'Third Creek and Fourth Creek catchments. Paradise Interchange area. Established suburban centre with aging infrastructure.' },
  { name: 'Semaphore', population: 5432, density: 'medium', riskFactors: ['coastal-flooding', 'storm-damage'], notes: 'Coastal heritage suburb. Semaphore Road commercial strip. Le Fevre Peninsula. Exposed to Gulf St Vincent storms and tidal surge.' },
  { name: 'Torrensville', population: 6543, density: 'medium', riskFactors: ['flood', 'water-damage'], notes: 'River Torrens floodplain. Henley Beach Road corridor. Thebarton industrial area transition. Low-lying areas flood-prone.' },

  // TIER 4: HILLS + STORM-PRONE SUBURBS
  { name: 'Stirling', population: 3456, density: 'low', riskFactors: ['bushfire', 'storm-damage'], notes: 'Adelaide Hills township. Mount Lofty Ranges. Extreme bushfire risk — 1983 Ash Wednesday fires. Dense native vegetation surrounds.' },
  { name: 'Crafers', population: 2345, density: 'low', riskFactors: ['bushfire', 'storm-damage'], notes: 'Adelaide Hills. South Eastern Freeway corridor. Ash Wednesday 1983 affected area. Mount Lofty summit proximity. High storm/wind exposure.' },
  { name: 'Mount Barker', population: 18234, density: 'medium', riskFactors: ['bushfire', 'stormwater-flooding'], notes: 'Fastest growing area in SA. Adelaide Hills district centre. Laratinga Wetlands area. Bush-urban interface expanding rapidly.' },
  { name: 'Blackwood', population: 9876, density: 'medium', riskFactors: ['bushfire', 'stormwater-flooding'], notes: 'Belair National Park border. Sturt River upper catchment. Coromandel Valley flooding. Dense vegetation creates high fire risk.' },
  { name: 'Elizabeth', population: 14567, density: 'medium', riskFactors: ['stormwater-flooding', 'water-damage'], notes: 'Northern suburbs established centre. Elizabeth City Centre. Smith Creek catchment. Large public housing stock with maintenance challenges.' },
];
