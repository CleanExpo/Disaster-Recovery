// Extended Australian Locations Database for National Coverage
import { STATES, CITIES_BY_STATE } from './constants';

export interface ExtendedLocationData {
  city: string;
  state: string;
  population: number;
  coordinates: { lat: number; lng: number };
  climate: string;
  commonIssues: string[];
  landmarks?: string[];
  suburbs: string[];
  postcode: string;
  disasterRisk: 'High' | 'Medium' | 'Low';
  seasonalRisks: Record<string, string[]>;
}

// All Australian Capital Cities
export const capitalCities: ExtendedLocationData[] = [
  {
    city: 'Sydney',
    state: 'NSW',
    population: 5312000,
    coordinates: { lat: -33.8688, lng: 151.2093 },
    climate: 'Temperate oceanic',
    commonIssues: ['Coastal flooding', 'Storms', 'Urban flooding', 'Bushfire smoke'],
    landmarks: ['Sydney Harbour Bridge', 'Opera House', 'Bondi Beach'],
    suburbs: ['Parramatta', 'Chatswood', 'Bondi', 'Manly', 'Cronulla', 'Penrith'],
    postcode: '2000',
    disasterRisk: 'High',
    seasonalRisks: {
      summer: ['Bushfire smoke', 'Storms', 'Flash flooding'],
      autumn: ['Storm damage', 'Flooding'],
      winter: ['East coast lows', 'Flooding'],
      spring: ['Storms', 'Bushfire season start']
    }
  },
  {
    city: 'Melbourne',
    state: 'VIC',
    population: 5078000,
    coordinates: { lat: -37.8136, lng: 144.9631 },
    climate: 'Temperate oceanic',
    commonIssues: ['Flash flooding', 'Storms', 'Heatwaves', 'Hail damage'],
    landmarks: ['Federation Square', 'MCG', 'Yarra River'],
    suburbs: ['Richmond', 'St Kilda', 'Brunswick', 'Footscray', 'Box Hill'],
    postcode: '3000',
    disasterRisk: 'High',
    seasonalRisks: {
      summer: ['Bushfires', 'Heatwaves', 'Storms'],
      autumn: ['Storm damage', 'Flash flooding'],
      winter: ['Flooding', 'Storm damage'],
      spring: ['Severe storms', 'Flash flooding']
    }
  },
  {
    city: 'Brisbane',
    state: 'QLD',
    population: 2560000,
    coordinates: { lat: -27.4698, lng: 153.0251 },
    climate: 'Humid subtropical',
    commonIssues: ['Flooding', 'Storms', 'Cyclones', 'High humidity mould'],
    landmarks: ['Story Bridge', 'South Bank', 'Brisbane River'],
    suburbs: ['Toowong', 'Indooroopilly', 'Chermside', 'Carindale', 'Mt Gravatt'],
    postcode: '4000',
    disasterRisk: 'High',
    seasonalRisks: {
      summer: ['Cyclones', 'Flooding', 'Severe storms'],
      autumn: ['Late cyclones', 'Flooding'],
      winter: ['Occasional flooding'],
      spring: ['Storm season', 'Early cyclones']
    }
  },
  {
    city: 'Perth',
    state: 'WA',
    population: 2085000,
    coordinates: { lat: -31.9505, lng: 115.8605 },
    climate: 'Mediterranean',
    commonIssues: ['Bushfires', 'Storm damage', 'Coastal erosion', 'Heatwaves'],
    landmarks: ['Kings Park', 'Swan River', 'Cottesloe Beach'],
    suburbs: ['Fremantle', 'Joondalup', 'Midland', 'Armadale', 'Rockingham'],
    postcode: '6000',
    disasterRisk: 'Medium',
    seasonalRisks: {
      summer: ['Bushfires', 'Heatwaves', 'Coastal storms'],
      autumn: ['Storm damage'],
      winter: ['Flooding', 'Storm damage'],
      spring: ['Bushfire season start']
    }
  },
  {
    city: 'Adelaide',
    state: 'SA',
    population: 1360000,
    coordinates: { lat: -34.9285, lng: 138.6007 },
    climate: 'Mediterranean',
    commonIssues: ['Bushfires', 'Heatwaves', 'Flash flooding', 'Storm damage'],
    landmarks: ['Adelaide Oval', 'Glenelg Beach', 'Adelaide Hills'],
    suburbs: ['Norwood', 'Glenelg', 'Marion', 'Salisbury', 'Port Adelaide'],
    postcode: '5000',
    disasterRisk: 'Medium',
    seasonalRisks: {
      summer: ['Extreme bushfires', 'Heatwaves'],
      autumn: ['Storm damage'],
      winter: ['Flooding', 'Storm damage'],
      spring: ['Bushfire season', 'Storms']
    }
  },
  {
    city: 'Hobart',
    state: 'TAS',
    population: 240000,
    coordinates: { lat: -42.8821, lng: 147.3272 },
    climate: 'Temperate oceanic',
    commonIssues: ['Bushfires', 'Flooding', 'Storm damage', 'Landslides'],
    landmarks: ['Mount Wellington', 'Salamanca Place', 'MONA'],
    suburbs: ['Sandy Bay', 'Glenorchy', 'Kingston', 'Bellerive', 'New Town'],
    postcode: '7000',
    disasterRisk: 'Medium',
    seasonalRisks: {
      summer: ['Bushfires', 'Dry conditions'],
      autumn: ['Storm damage'],
      winter: ['Flooding', 'Snow damage', 'Landslides'],
      spring: ['Flooding', 'Storm damage']
    }
  },
  {
    city: 'Darwin',
    state: 'NT',
    population: 147000,
    coordinates: { lat: -12.4634, lng: 130.8456 },
    climate: 'Tropical savanna',
    commonIssues: ['Cyclones', 'Flooding', 'Storm surge', 'Extreme humidity'],
    landmarks: ['Mindil Beach', 'Crocosaurus Cove', 'Darwin Harbour'],
    suburbs: ['Palmerston', 'Casuarina', 'Nightcliff', 'Fannie Bay', 'Stuart Park'],
    postcode: '0800',
    disasterRisk: 'High',
    seasonalRisks: {
      summer: ['Cyclones', 'Monsoon flooding', 'Storm surge'],
      autumn: ['Late cyclones', 'Heavy rain'],
      winter: ['Dry season fires'],
      spring: ['Build-up storms', 'Early cyclones']
    }
  },
  {
    city: 'Canberra',
    state: 'ACT',
    population: 432000,
    coordinates: { lat: -35.2809, lng: 149.1300 },
    climate: 'Temperate continental',
    commonIssues: ['Bushfires', 'Storms', 'Hail damage', 'Frost damage'],
    landmarks: ['Parliament House', 'Lake Burley Griffin', 'War Memorial'],
    suburbs: ['Belconnen', 'Tuggeranong', 'Gungahlin', 'Woden', 'Weston Creek'],
    postcode: '2600',
    disasterRisk: 'Medium',
    seasonalRisks: {
      summer: ['Bushfires', 'Severe storms', 'Hail'],
      autumn: ['Storm damage', 'Frost'],
      winter: ['Frost damage', 'Snow storms'],
      spring: ['Severe storms', 'Hail']
    }
  }
];

// Major Regional Cities
export const regionalCities: ExtendedLocationData[] = [
  // New South Wales
  {
    city: 'Newcastle',
    state: 'NSW',
    population: 322278,
    coordinates: { lat: -32.9283, lng: 151.7817 },
    climate: 'Humid subtropical',
    commonIssues: ['Coastal storms', 'Flooding', 'Mine subsidence'],
    suburbs: ['Charlestown', 'Mayfield', 'Hamilton', 'Merewether', 'Adamstown'],
    postcode: '2300',
    disasterRisk: 'High',
    seasonalRisks: {
      summer: ['Storms', 'Flash flooding'],
      autumn: ['East coast lows'],
      winter: ['Severe storms', 'Flooding'],
      spring: ['Storm season']
    }
  },
  {
    city: 'Wollongong',
    state: 'NSW',
    population: 302739,
    coordinates: { lat: -34.4248, lng: 150.8931 },
    climate: 'Temperate oceanic',
    commonIssues: ['Coastal erosion', 'Flash flooding', 'Landslides'],
    suburbs: ['Shellharbour', 'Kiama', 'Thirroul', 'Dapto', 'Port Kembla'],
    postcode: '2500',
    disasterRisk: 'High',
    seasonalRisks: {
      summer: ['Flash flooding', 'Coastal storms'],
      autumn: ['East coast lows'],
      winter: ['Severe weather', 'Landslides'],
      spring: ['Storm damage']
    }
  },
  // Queensland
  {
    city: 'Gold Coast',
    state: 'QLD',
    population: 699226,
    coordinates: { lat: -28.0167, lng: 153.4000 },
    climate: 'Humid subtropical',
    commonIssues: ['Cyclones', 'Storm surge', 'Beach erosion', 'Flooding'],
    suburbs: ['Surfers Paradise', 'Broadbeach', 'Robina', 'Southport', 'Burleigh'],
    postcode: '4217',
    disasterRisk: 'High',
    seasonalRisks: {
      summer: ['Cyclones', 'Storm surge', 'Flash flooding'],
      autumn: ['Coastal storms'],
      winter: ['East coast lows'],
      spring: ['Storm season']
    }
  },
  {
    city: 'Townsville',
    state: 'QLD',
    population: 195882,
    coordinates: { lat: -19.2590, lng: 146.8169 },
    climate: 'Tropical savanna',
    commonIssues: ['Cyclones', 'Flooding', 'Storm surge', 'Extreme heat'],
    suburbs: ['Thuringowa', 'Kirwan', 'Aitkenvale', 'Douglas', 'Belgian Gardens'],
    postcode: '4810',
    disasterRisk: 'High',
    seasonalRisks: {
      summer: ['Cyclones', 'Monsoon flooding'],
      autumn: ['Late cyclones', 'Heavy rain'],
      winter: ['Dry conditions'],
      spring: ['Build-up storms']
    }
  },
  {
    city: 'Cairns',
    state: 'QLD',
    population: 153075,
    coordinates: { lat: -16.9186, lng: 145.7781 },
    climate: 'Tropical monsoon',
    commonIssues: ['Cyclones', 'Flooding', 'Landslides', 'Storm surge'],
    suburbs: ['Trinity Beach', 'Palm Cove', 'Gordonvale', 'Edmonton', 'Smithfield'],
    postcode: '4870',
    disasterRisk: 'High',
    seasonalRisks: {
      summer: ['Severe cyclones', 'Monsoon flooding'],
      autumn: ['Tropical lows', 'Heavy rain'],
      winter: ['Occasional flooding'],
      spring: ['Early cyclones']
    }
  }
];

// Suburb-level data for major metros (sample)
export const sydneySuburbs = [
  { name: 'Parramatta', postcode: '2150', riskLevel: 'Medium', commonIssues: ['Urban flooding', 'Storm damage'] },
  { name: 'Chatswood', postcode: '2067', riskLevel: 'Low', commonIssues: ['Storm damage', 'Tree falls'] },
  { name: 'Bondi', postcode: '2026', riskLevel: 'Medium', commonIssues: ['Coastal storms', 'Flash flooding'] },
  { name: 'Manly', postcode: '2095', riskLevel: 'Medium', commonIssues: ['Coastal erosion', 'Storm surge'] },
  { name: 'Penrith', postcode: '2750', riskLevel: 'High', commonIssues: ['Flooding', 'Extreme heat', 'Bushfires'] },
  { name: 'Liverpool', postcode: '2170', riskLevel: 'Medium', commonIssues: ['Urban flooding', 'Storm damage'] },
  { name: 'Blacktown', postcode: '2148', riskLevel: 'Medium', commonIssues: ['Flash flooding', 'Storm damage'] },
  { name: 'Castle Hill', postcode: '2154', riskLevel: 'Low', commonIssues: ['Storm damage', 'Bushfire smoke'] },
  { name: 'Cronulla', postcode: '2230', riskLevel: 'Medium', commonIssues: ['Coastal storms', 'Beach erosion'] },
  { name: 'Hornsby', postcode: '2077', riskLevel: 'Medium', commonIssues: ['Bushfires', 'Storm damage'] }
];

export const melbourneSuburbs = [
  { name: 'St Kilda', postcode: '3182', riskLevel: 'Medium', commonIssues: ['Coastal storms', 'Flash flooding'] },
  { name: 'Richmond', postcode: '3121', riskLevel: 'Medium', commonIssues: ['River flooding', 'Storm damage'] },
  { name: 'Fitzroy', postcode: '3065', riskLevel: 'Low', commonIssues: ['Flash flooding', 'Storm damage'] },
  { name: 'South Yarra', postcode: '3141', riskLevel: 'Medium', commonIssues: ['River flooding', 'Storm damage'] },
  { name: 'Brighton', postcode: '3186', riskLevel: 'Medium', commonIssues: ['Coastal storms', 'Flash flooding'] },
  { name: 'Camberwell', postcode: '3124', riskLevel: 'Low', commonIssues: ['Storm damage', 'Flash flooding'] },
  { name: 'Footscray', postcode: '3011', riskLevel: 'Medium', commonIssues: ['Industrial incidents', 'Flooding'] },
  { name: 'Box Hill', postcode: '3128', riskLevel: 'Low', commonIssues: ['Storm damage', 'Flash flooding'] },
  { name: 'Frankston', postcode: '3199', riskLevel: 'Medium', commonIssues: ['Coastal storms', 'Bushfires'] },
  { name: 'Dandenong', postcode: '3175', riskLevel: 'Medium', commonIssues: ['Flash flooding', 'Storm damage'] }
];

// International/Pacific Locations
export const internationalLocations: ExtendedLocationData[] = [
  {
    city: 'Nauru',
    state: 'International',
    population: 12500,
    coordinates: { lat: -0.5477, lng: 166.9209 },
    climate: 'Tropical',
    commonIssues: ['Cyclones', 'Coastal flooding', 'Storm surge', 'Salt water intrusion', 'Coral mining damage'],
    landmarks: ['Yaren District', 'Anibare Bay', 'Buada Lagoon', 'Command Ridge'],
    suburbs: ['Yaren', 'Aiwo', 'Anabar', 'Anetan', 'Anibare', 'Baiti', 'Boe', 'Buada', 'Denigomodu', 'Ewa', 'Ijuw', 'Meneng', 'Nibok', 'Uaboe'],
    postcode: 'NRU',
    disasterRisk: 'High',
    seasonalRisks: {
      summer: ['Cyclones', 'Heavy rainfall', 'Flooding'],
      autumn: ['Storm surge', 'Coastal erosion'],
      winter: ['King tides', 'Salt water intrusion'],
      spring: ['Early cyclones', 'Drought conditions']
    }
  }
];

// Generate dynamic location combinations
export function generateLocationCombinations() {
  const combinations: string[] = [];
  
  // Capital + Service combinations
  capitalCities.forEach(city => {
    const services = ['water-damage', 'fire-damage', 'mould-removal', 'emergency-restoration'];
    services.forEach(service => {
      combinations.push(`${city.city.toLowerCase()}-${service}`);
    });
  });
  
  // Regional + Disaster combinations
  regionalCities.forEach(city => {
    const disasters = city.commonIssues.map(issue => issue.toLowerCase().replace(/\s+/g, '-'));
    disasters.forEach(disaster => {
      combinations.push(`${city.city.toLowerCase()}-${disaster}`);
    });
  });
  
  // International + Service combinations
  internationalLocations.forEach(city => {
    const services = ['water-damage', 'cyclone-damage', 'emergency-restoration', 'disaster-recovery'];
    services.forEach(service => {
      combinations.push(`${city.city.toLowerCase()}-${service}`);
    });
  });
  
  return combinations;
}

// SEO-friendly URL generation
export function generateLocationUrl(city: string, state: string, service?: string): string {
  const citySlug = city.toLowerCase().replace(/\s+/g, '-');
  const stateSlug = state.toLowerCase();
  
  if (service) {
    const serviceSlug = service.toLowerCase().replace(/\s+/g, '-');
    return `/locations/${stateSlug}/${citySlug}/${serviceSlug}`;
  }
  
  return `/locations/${stateSlug}/${citySlug}`;
}

// Get nearby locations for internal linking
export function getNearbyLocations(city: string, state: string): string[] {
  // Handle international locations
  if (state === 'International') {
    const intlData = internationalLocations.filter(loc => loc.state === state);
    const currentCity = intlData.find(loc => loc.city === city);
    return currentCity ? currentCity.suburbs : [];
  }
  
  const stateData = [...capitalCities, ...regionalCities].filter(loc => loc.state === state);
  const currentCity = stateData.find(loc => loc.city === city);
  
  if (!currentCity) return [];
  
  // Return suburbs if capital city, otherwise return nearby cities
  if (capitalCities.some(c => c.city === city)) {
    return currentCity.suburbs;
  }
  
  return stateData
    .filter(loc => loc.city !== city)
    .slice(0, 5)
    .map(loc => loc.city);
}