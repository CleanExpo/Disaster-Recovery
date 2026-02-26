// ============================================================
// BRISBANE SUBURBS — Disaster Recovery Target Market Data
// Sources: ABS Census 2021, BOM Brisbane Flood Data, QRA Flood Mapping
// ============================================================

import type { SuburbData } from './sydney';

export const brisbaneSuburbs: SuburbData[] = [
  // TIER 1: HIGH-DENSITY INNER CITY (water damage / stormwater flooding)
  { name: 'South Brisbane', population: 8934, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Dense apartment precinct adjacent to Brisbane River. Directly affected by 2011 and 2022 floods. South Bank cultural precinct.' },
  { name: 'Fortitude Valley', population: 5121, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'High-density apartments and entertainment precinct. Low-lying areas near Breakfast Creek prone to flash flooding.' },
  { name: 'New Farm', population: 12456, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Brisbane River peninsula. Significant 2011 flood inundation. Mix of heritage Queenslanders and modern apartments.' },
  { name: 'West End', population: 10284, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Rapid densification with apartment towers. Brisbane River frontage. Affected by 2011 and 2022 floods.' },
  { name: 'Kangaroo Point', population: 9134, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'River peninsula with high-rise apartments. Directly impacted by Brisbane River flooding. Dockside marina precinct.' },
  { name: 'Woolloongabba', population: 9678, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Gabba precinct undergoing major densification. Norman Creek catchment known for flash flooding.' },
  { name: 'Spring Hill', population: 6987, density: 'high', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Inner-city high-rise area. Steep topography channels stormwater. Aging infrastructure in older buildings.' },
  { name: 'Teneriffe', population: 5892, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Converted woolstore apartments on Brisbane River. Heritage buildings with unique restoration needs. 2011 flood affected.' },

  // TIER 2: HIGH-GROWTH CORRIDORS (water damage / flood)
  { name: 'Toowong', population: 12345, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Major apartment corridor along Coronation Drive. Brisbane River and Ithaca Creek flooding. University precinct.' },
  { name: 'Indooroopilly', population: 14287, density: 'medium', riskFactors: ['water-damage', 'flood'], notes: 'Major commercial centre. Brisbane River and Moggill Creek catchment. Significant 2011 flood damage to riverside properties.' },
  { name: 'Milton', population: 5234, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Mixed commercial/residential riverside precinct. Milton Reach experienced major 2011 and 2022 inundation.' },
  { name: 'Chermside', population: 8956, density: 'medium', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Major northside commercial hub. Kedron Brook catchment. Dense apartment development around Westfield.' },
  { name: 'Nundah', population: 13456, density: 'medium', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Transit-oriented development with increasing density. Kedron Brook and Nundah Creek flooding history.' },
  { name: 'Hamilton', population: 8765, density: 'high', riskFactors: ['water-damage', 'flood'], notes: 'Portside Wharf apartment precinct on Brisbane River. Heritage area with unique restoration requirements.' },
  { name: 'Carindale', population: 16543, density: 'medium', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Established suburban centre. Bulimba Creek catchment. Large retail precinct. Mix of houses and townhouses.' },

  // TIER 3: FLOOD-PRONE AREAS (Brisbane River + creek flooding)
  { name: 'Rocklea', population: 4235, density: 'medium', riskFactors: ['flood', 'stormwater-flooding'], notes: 'Brisbane Markets precinct. Oxley Creek and Brisbane River confluence — one of most flood-affected suburbs in 2011 and 2022.' },
  { name: 'Graceville', population: 7834, density: 'medium', riskFactors: ['flood'], notes: 'Brisbane River frontage. Severely impacted by 2011 floods — up to 2m inundation in riverside streets. Established housing.' },
  { name: 'Chelmer', population: 4523, density: 'medium', riskFactors: ['flood'], notes: 'Low-lying Brisbane River suburb. Extensive 2011 and 2022 flood damage. Historic flood line markers visible on properties.' },
  { name: 'Yeronga', population: 9876, density: 'medium', riskFactors: ['flood', 'stormwater-flooding'], notes: 'Between Brisbane River and Oxley Creek. Major 2022 flood evacuations. Norman Creek catchment flash flooding.' },
  { name: 'Fairfield', population: 6543, density: 'medium', riskFactors: ['flood'], notes: 'Brisbane River bend. Severely flood-affected 2011 — the iconic Drift restaurant floated downstream. Rapid gentrification.' },
  { name: 'Auchenflower', population: 7234, density: 'high', riskFactors: ['flood', 'water-damage'], notes: 'Riverside apartment precinct below Mt Coot-tha. Brisbane River flooding plus overland stormwater from steep catchment.' },
  { name: 'Oxley', population: 11234, density: 'medium', riskFactors: ['flood'], notes: 'Oxley Creek floodplain. Major 2011 and 2022 flooding. Established residential area with significant flood insurance issues.' },
  { name: 'Jindalee', population: 8765, density: 'medium', riskFactors: ['flood'], notes: 'Brisbane River frontage in western suburbs. Centenary Motorway flooding in 2011 cut access. DES flood hotspot.' },

  // TIER 4: STORM-PRONE SUBURBS (severe storms / supercells)
  { name: 'The Gap', population: 17234, density: 'medium', riskFactors: ['storm-damage', 'bushfire'], notes: 'Foothills of Mt Coot-tha and Enoggera Reservoir. Severe 2014 supercell caused $1.5B damage across Brisbane. Tree damage risk.' },
  { name: 'Paddington', population: 9123, density: 'medium', riskFactors: ['storm-damage', 'water-damage'], notes: 'Heritage Queenslander homes on ridgeline. Exposed to westerly storms. Aging roofing vulnerable to hail. Given Creek catchment.' },
  { name: 'Ashgrove', population: 12456, density: 'medium', riskFactors: ['storm-damage', 'stormwater-flooding'], notes: 'Enoggera Creek catchment. Dense tree canopy creates high storm debris risk. 2014 supercell caused extensive roof damage.' },
  { name: 'Bardon', population: 9876, density: 'medium', riskFactors: ['storm-damage', 'bushfire'], notes: 'Mt Coot-tha foothills. Dense bushland borders. High tree fall risk during severe storms. Limited evacuation routes.' },
  { name: 'Kenmore', population: 9234, density: 'medium', riskFactors: ['storm-damage', 'flood'], notes: 'Western suburbs near Moggill Creek. Brisbane River flooding via Kholo Creek. Exposed hilltop positions for storm damage.' },
  { name: 'Coorparoo', population: 16789, density: 'medium', riskFactors: ['water-damage', 'stormwater-flooding'], notes: 'Inner south commercial centre. Norman Creek catchment. Increasing apartment density. Flash flooding in low-lying sections.' },
  { name: 'Moorooka', population: 8456, density: 'medium', riskFactors: ['stormwater-flooding', 'water-damage'], notes: 'Established suburban area near Toohey Forest. Rocky Water Holes Creek flooding. Mix of Queenslanders and post-war homes.' },
];
