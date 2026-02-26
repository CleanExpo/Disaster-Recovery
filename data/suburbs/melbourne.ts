// ============================================================
// MELBOURNE SUBURBS — Disaster Recovery Target Market Data
// Sources: ABS Census 2021, Melbourne Water flood data, CFA Bushfire Prone Area maps
// ============================================================

import type { SuburbData } from './sydney';

export const melbourneSuburbs: SuburbData[] = [
  // TIER 1: HIGH-DENSITY INNER CITY (water damage / stormwater flooding)
  { name: 'Melbourne CBD', population: 54941, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Highest density area in Australia (~19,000+/km²). Near-total apartment stock. Yarra River and Elizabeth St flooding.' },
  { name: 'Southbank', population: 22631, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Very high-density apartments. Yarra River frontage — flood risk. One of Australia\'s densest suburbs.' },
  { name: 'Docklands', population: 15495, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Almost entirely high-rise apartments. Waterfront location. Known drainage issues.' },
  { name: 'Carlton', population: 16055, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Top 5 densest Victorian suburb. Mix of heritage terraces and student apartment towers.' },
  { name: 'South Yarra', population: 25028, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Top 5 densest Victorian suburb. Yarra River frontage. Mix of heritage and high-rise.' },
  { name: 'Fitzroy', population: 10431, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Top 5 densest Victorian suburb. Heritage terraces and apartments. Merri Creek flash flood risk.' },
  { name: 'Collingwood', population: 9179, density: 'high', riskFactors: ['water-damage', 'flood', 'stormwater-flooding'], notes: 'Top 5 densest Victorian suburb. Yarra River and Merri Creek proximity. City of Yarra SES flood risk.' },
  { name: 'Richmond', population: 32848, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Large suburb with significant apartment stock. Yarra River flood risk. City of Yarra SES area.' },
  { name: 'St Kilda', population: 19490, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding', 'storm-damage'], notes: 'Beachside high-density. Mix of heritage and apartments. Coastal storm exposure. Elster Creek flooding.' },
  { name: 'Prahran', population: 12203, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Dense inner suburb. Growing apartment development. Stonnington stormwater catchment.' },
  { name: 'North Melbourne', population: 14953, density: 'high', riskFactors: ['water-damage', 'flood', 'stormwater-flooding'], notes: 'Dense apartment precinct. Moonee Ponds Creek flash flood risk. SES identified flood zone.' },

  // TIER 2: HIGH-DENSITY GROWTH CORRIDORS
  { name: 'Brunswick', population: 24896, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Rapidly densifying. Mix of heritage and new apartments. Merri Creek catchment.' },
  { name: 'Footscray', population: 17131, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Maribyrnong River floodplain. Directly affected by October 2022 floods (500+ homes). Major apartment growth.' },
  { name: 'Box Hill', population: 14353, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Designated major activity centre. Massive apartment development. Growing population density.' },
  { name: 'Clayton', population: 18988, density: 'medium', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Monash University precinct. Growing medium-density housing. Drainage capacity strain.' },
  { name: 'Preston', population: 33790, density: 'medium', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Large population base. Growing apartment stock. Darebin Creek catchment.' },
  { name: 'Abbotsford', population: 9088, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Yarra River and Merri Creek confluence. Historical flooding. City of Yarra SES flood risk area.' },

  // TIER 3: FLOOD-PRONE AREAS (riverine + flash flooding)
  { name: 'Maribyrnong', population: 12500, density: 'medium', riskFactors: ['flood'], notes: 'Maribyrnong River floodplain. 28 recorded floods since 1871. October 2022 — largest on record, 500+ homes flooded.' },
  { name: 'Kensington', population: 10745, density: 'high', riskFactors: ['flood', 'stormwater-flooding'], notes: 'Maribyrnong River and Moonee Ponds Creek junction. SES identified flash flood zone.' },
  { name: 'Moonee Ponds', population: 16224, density: 'medium', riskFactors: ['flood', 'stormwater-flooding'], notes: 'Moonee Ponds Creek namesake. Known flood catchment. October 2022 flood impacts.' },
  { name: 'Craigieburn', population: 65178, density: 'medium', riskFactors: ['stormwater-flooding', 'storm-damage'], notes: 'Massive growth suburb. New estates with developing drainage infrastructure. High volume of new builds.' },
  { name: 'Tarneit', population: 56370, density: 'medium', riskFactors: ['stormwater-flooding', 'storm-damage'], notes: 'Fastest-growing suburb in Melbourne. New housing estates. Werribee River catchment proximity.' },

  // TIER 4: BUSHFIRE-PRONE URBAN FRINGE
  { name: 'Eltham', population: 18847, density: 'medium', riskFactors: ['bushfire', 'storm-damage'], notes: 'Shire of Nillumbik — highest bushfire risk LGA in metro Melbourne. Eucalyptus-heavy. Yarra River evacuation bottleneck.' },
  { name: 'Warrandyte', population: 5541, density: 'low', riskFactors: ['bushfire'], notes: 'Extreme bushfire danger. Prolific eucalyptus forest. Yarra River valley. Limited evacuation routes.' },
  { name: 'Belgrave', population: 9866, density: 'low', riskFactors: ['bushfire', 'storm-damage'], notes: 'Dandenong Ranges. High bushfire vulnerability rating. Steep terrain. Heavy tree canopy.' },
  { name: 'Ferntree Gully', population: 27398, density: 'medium', riskFactors: ['bushfire', 'storm-damage'], notes: 'Dandenong Ranges foothills. Eucalyptus-heavy. Large residential population adjacent to national park.' },
  { name: 'Upper Ferntree Gully', population: 3417, density: 'low', riskFactors: ['bushfire'], notes: 'Adjacent to Dandenong Ranges National Park. High BAL ratings. Dense vegetation interface.' },
  { name: 'Research', population: 2695, density: 'low', riskFactors: ['bushfire'], notes: 'One of the highest bushfire risks in Australia. Prolific Eucalyptus and Melaleuca Paperbark trees.' },
];
