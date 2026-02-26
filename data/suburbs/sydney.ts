// ============================================================
// SYDNEY SUBURBS — Disaster Recovery Target Market Data
// Sources: ABS Census 2021, NSW SES Flood Data, NSW RFS Bushfire Prone Land Maps
// ============================================================

export interface SuburbData {
  name: string;
  population: number;
  density: 'high' | 'medium' | 'low';
  riskFactors: string[];
  notes: string;
}

export const sydneySuburbs: SuburbData[] = [
  // TIER 1: HIGH-DENSITY INNER CITY (water damage / stormwater flooding)
  { name: 'Haymarket', population: 8305, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Highest population density in Australia (~18,800/km²). 87% apartments. Darling Harbour catchment.' },
  { name: 'Potts Point', population: 7183, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: '89.1% apartments. ~16,400 people/km². Woolloomooloo/Rushcutters Bay catchments.' },
  { name: 'Elizabeth Bay', population: 4878, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Most densely populated suburb in Australia by some measures (~20,000/km²). Almost entirely apartments.' },
  { name: 'Darlinghurst', population: 10615, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'High-density terrace housing and apartments. Rushcutters Bay and Woolloomooloo catchments.' },
  { name: 'Pyrmont', population: 12658, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Former industrial area now dense apartment precinct. Darling Harbour/Blackwattle Bay catchments.' },
  { name: 'Surry Hills', population: 15828, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Mix of terraces and modern apartments. Multiple flood catchments including Alexandra Canal.' },
  { name: 'Ultimo', population: 7410, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Dense student accommodation and apartments near UTS. Darling Harbour catchment.' },
  { name: 'Chippendale', population: 7803, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Central Park development. High-density apartments. Near Blackwattle Bay catchment.' },
  { name: 'Redfern', population: 13072, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Rapidly densifying. Mix of social housing, terraces, and new high-rise.' },
  { name: 'Waterloo', population: 16379, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Major urban renewal area. High-rise apartments. Alexandra Canal catchment — known flood risk.' },

  // TIER 2: HIGH-DENSITY GROWTH CORRIDORS (water damage / flood)
  { name: 'Zetland', population: 12622, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'One of Sydney\'s fastest-growing suburbs. Almost entirely new high-rise apartments. Alexandra Canal flood risk.' },
  { name: 'Mascot', population: 21573, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Major apartment development near airport. Botany Bay catchment. Known drainage issues.' },
  { name: 'Wentworth Point', population: 12703, density: 'high', riskFactors: ['water-damage', 'flood'], notes: '3rd most densely populated suburb in Australia. 81.6% population growth 2016-2021. Parramatta River frontage.' },
  { name: 'Rhodes', population: 11453, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'High-rise precinct on Parramatta River peninsula. Flood risk from river proximity.' },
  { name: 'Parramatta', population: 30211, density: 'high', riskFactors: ['water-damage', 'flood', 'stormwater-flooding'], notes: 'Sydney\'s second CBD. Massive apartment growth. Parramatta River flood risk — received a month\'s rain in 2 hours (2022).' },
  { name: 'Bondi Junction', population: 10361, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Major commercial centre with dense apartment living. Eastern suburbs drainage catchment.' },
  { name: 'Newtown', population: 14690, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Dense inner-west terrace housing. Johnstons Creek catchment. Flash flood risk in low-lying areas.' },
  { name: 'Hurstville', population: 31162, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Georges River LGA commercial centre. Significant apartment development. Stormwater infrastructure strain.' },
  { name: 'Chatswood', population: 25553, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'North Shore commercial hub. Dense apartment living. Known stormwater drainage issues.' },

  // TIER 3: FLOOD-PRONE AREAS (riverine + flash flooding)
  { name: 'Liverpool', population: 31078, density: 'medium', riskFactors: ['flood', 'stormwater-flooding'], notes: 'Georges River floodplain. Major 2022 flood evacuations. Growing medium-density housing.' },
  { name: 'Penrith', population: 17966, density: 'medium', riskFactors: ['flood'], notes: 'Hawkesbury-Nepean floodplain. One of three main flood zones. Repeated 2022 flood events.' },
  { name: 'Windsor', population: 1915, density: 'low', riskFactors: ['flood'], notes: 'Hawkesbury River peak of 13.9m in 2022. Worst-affected area in NSW floods. Historic flood town.' },
  { name: 'Richmond', population: 5418, density: 'low', riskFactors: ['flood'], notes: 'Hawkesbury-Nepean floodplain. Extensive flooding in 2022. Evacuation orders issued repeatedly.' },
  { name: 'Chipping Norton', population: 9412, density: 'medium', riskFactors: ['flood'], notes: 'Georges River floodplain between Glenfield and East Hills. Major 2022 evacuations.' },
  { name: 'Marrickville', population: 29340, density: 'medium', riskFactors: ['stormwater-flooding', 'water-damage'], notes: 'Cooks River catchment. 102mm rain in single event (2022). Inner West flash flood hotspot.' },
  { name: 'Canterbury', population: 11600, density: 'medium', riskFactors: ['flood', 'stormwater-flooding'], notes: 'Cooks River and Canterbury-Bankstown floodplain. Declared natural disaster area in 2022.' },

  // TIER 4: BUSHFIRE-PRONE URBAN FRINGE
  { name: 'Hornsby', population: 21000, density: 'medium', riskFactors: ['bushfire', 'storm-damage'], notes: '19,983 addresses within 100m of bushland — most exposed in Greater Sydney. National Park borders.' },
  { name: 'Engadine', population: 17736, density: 'medium', riskFactors: ['bushfire', 'storm-damage'], notes: 'Sutherland Shire. Royal National Park and Heathcote National Park borders. 12 RFS stations in shire.' },
  { name: 'Menai', population: 10419, density: 'medium', riskFactors: ['bushfire'], notes: 'Affected by 1994 Eastern Seaboard fires and 2017-18 bushfire season. Adjacent to national parkland.' },
  { name: 'Cronulla', population: 17899, density: 'medium', riskFactors: ['storm-damage', 'stormwater-flooding'], notes: 'Coastal suburb. Storm surge and coastal erosion risk. Sutherland Shire coastal exposure.' },
];
