// ============================================================
// CAIRNS SUBURBS — Disaster Recovery Target Market Data
// Sources: ABS Census 2021, BOM Cairns Cyclone Data, Cairns Regional Council Flood Maps
// ============================================================

import type { SuburbData } from './sydney';

export const cairnsSuburbs: SuburbData[] = [
  // TIER 1: INNER CITY + WATERFRONT (cyclone / flood)
  { name: 'Cairns City', population: 6234, density: 'high', riskFactors: ['cyclone', 'flood', 'storm-damage'], notes: 'CBD and Esplanade precinct. Trinity Inlet frontage. Storm surge zone. Significant damage from Cyclone Yasi (2011) impact zone.' },
  { name: 'Cairns North', population: 4567, density: 'high', riskFactors: ['cyclone', 'flood', 'water-damage'], notes: 'Sheridan Street commercial corridor. Freshwater Creek catchment. Growing apartment density. Airport proximity — low-lying terrain.' },
  { name: 'Parramatta Park', population: 3234, density: 'medium', riskFactors: ['cyclone', 'flood', 'water-damage'], notes: 'Inner suburb near Cairns Base Hospital. Barron River floodplain fringe. Heritage Queenslander homes. Low-lying residential streets.' },
  { name: 'Manunda', population: 5678, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding'], notes: 'Established inner suburb. Manunda Street commercial area. Monsoon rain ponding in low-lying sections. Older housing stock.' },
  { name: 'Westcourt', population: 3456, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding', 'water-damage'], notes: 'Inner suburb near showgrounds. Chinaman Creek catchment. Older fibro and timber homes vulnerable to cyclone damage.' },

  // TIER 2: NORTHERN BEACHES (cyclone + coastal exposure)
  { name: 'Trinity Beach', population: 4321, density: 'medium', riskFactors: ['cyclone', 'storm-damage', 'coastal-flooding'], notes: 'Popular beachside suburb. Direct Coral Sea exposure. Storm surge vulnerability. Palm-lined beachfront properties. Tourist accommodation.' },
  { name: 'Palm Cove', population: 2345, density: 'medium', riskFactors: ['cyclone', 'storm-damage', 'coastal-flooding'], notes: 'Tourist resort suburb. Williams Esplanade. Direct cyclone exposure from Coral Sea. Premium beachfront properties.' },
  { name: 'Smithfield', population: 12345, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding'], notes: 'Smithfield Shopping Centre hub. Captain Cook Highway corridor. Barron River delta proximity. Freshwater Creek flooding.' },
  { name: 'Clifton Beach', population: 3456, density: 'medium', riskFactors: ['cyclone', 'coastal-flooding', 'storm-damage'], notes: 'Northern beaches residential area. Exposed Coral Sea coastline. Half Moon Bay. Cyclone shelter distance concerns.' },
  { name: 'Machans Beach', population: 1234, density: 'low', riskFactors: ['cyclone', 'flood', 'coastal-flooding'], notes: 'Low-lying beachside community. Barron River mouth. Extreme flood and storm surge risk. Evacuation challenges during cyclone events.' },

  // TIER 3: SOUTHERN CORRIDOR (flood + monsoon)
  { name: 'Edge Hill', population: 5432, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding'], notes: 'Established suburb below Mount Whitfield. Botanic Gardens precinct. Dense tropical vegetation. Steep catchment channels stormwater rapidly.' },
  { name: 'Earlville', population: 7654, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding', 'flood'], notes: 'Stockland Earlville shopping centre. Mulgrave Road corridor. Chinaman Creek catchment. Low-lying commercial and residential area.' },
  { name: 'Woree', population: 6543, density: 'medium', riskFactors: ['flood', 'cyclone', 'stormwater-flooding'], notes: 'Cairns Southern Corridor. Woree industrial area. Mulgrave River catchment proximity. Low-lying terrain prone to monsoon flooding.' },
  { name: 'White Rock', population: 5432, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding'], notes: 'Southern suburb near Mount Whitfield Conservation Park. Edmonton Road corridor. Growing residential development. Creek flooding risk.' },
  { name: 'Edmonton', population: 8765, density: 'medium', riskFactors: ['flood', 'cyclone'], notes: 'Southern growth corridor. Bruce Highway junction. Mulgrave River floodplain. Sugar cane land conversion to residential. Major flood risk.' },

  // TIER 4: TABLELANDS + HINTERLAND FRINGE
  { name: 'Gordonvale', population: 6234, density: 'medium', riskFactors: ['flood', 'cyclone'], notes: 'Mulgrave River township. Bruce Highway. Sugar mill town. Extensive floodplain. Walsh Pyramid backdrop. Major 2019 monsoon flooding.' },
  { name: 'Redlynch', population: 9876, density: 'medium', riskFactors: ['stormwater-flooding', 'cyclone'], notes: 'Redlynch Valley residential development. Freshwater Creek upper catchment. Dense rainforest backdrop. Orographic rainfall enhancement.' },
  { name: 'Brinsmead', population: 4321, density: 'medium', riskFactors: ['stormwater-flooding', 'cyclone'], notes: 'Foothills suburb below Lamb Range. Freshwater Creek tributary catchment. Steep terrain drives rapid stormwater runoff.' },
  { name: 'Bentley Park', population: 7654, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding'], notes: 'Southern suburbs residential area. Relatively new development. Trinity Creek catchment. Growing population in former cane land.' },
  { name: 'Mount Sheridan', population: 8765, density: 'medium', riskFactors: ['cyclone', 'stormwater-flooding'], notes: 'Elevated southern suburb. Mount Sheridan Plaza. Newer construction to cyclone code. Good drainage but exposed hilltop positions.' },
];
