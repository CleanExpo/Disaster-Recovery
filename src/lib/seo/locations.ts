/**
 * Australian Location Data for SEO Page Generation
 * Priority locations based on population, property values, and search volume
 */

export interface LocationData {
  state: string;
  city: string;
  suburb?: string;
  postcode: string;
  latitude: number;
  longitude: number;
  population: number;
  averagePropertyValue: number;
  priorityScore: number; // 1-100, higher = more important
  monthlySearchVolume?: number;
}

// High-priority capital cities and major urban centres
export const PRIORITY_LOCATIONS: LocationData[] = [
  // Sydney Metro - Top Priority
  {
    state: 'NSW',
    city: 'Sydney',
    suburb: 'Sydney CBD',
    postcode: '2000',
    latitude: -33.8688,
    longitude: 151.2093,
    population: 247000,
    averagePropertyValue: 1500000,
    priorityScore: 100,
    monthlySearchVolume: 2500 },
  {
    state: 'NSW',
    city: 'Sydney',
    suburb: 'Bondi Beach',
    postcode: '2026',
    latitude: -33.8915,
    longitude: 151.2767,
    population: 12000,
    averagePropertyValue: 2200000,
    priorityScore: 95,
    monthlySearchVolume: 800 },
  {
    state: 'NSW',
    city: 'Sydney',
    suburb: 'Double Bay',
    postcode: '2028',
    latitude: -33.8773,
    longitude: 151.2407,
    population: 9500,
    averagePropertyValue: 3500000,
    priorityScore: 98,
    monthlySearchVolume: 450 },
  {
    state: 'NSW',
    city: 'Sydney',
    suburb: 'Mosman',
    postcode: '2088',
    latitude: -33.8302,
    longitude: 151.2419,
    population: 30000,
    averagePropertyValue: 2800000,
    priorityScore: 96,
    monthlySearchVolume: 650 },
  {
    state: 'NSW',
    city: 'Sydney',
    suburb: 'Toorak',
    postcode: '2088',
    latitude: -33.8302,
    longitude: 151.2419,
    population: 15000,
    averagePropertyValue: 4200000,
    priorityScore: 97,
    monthlySearchVolume: 380 },

  // Melbourne Metro - Top Priority
  {
    state: 'VIC',
    city: 'Melbourne',
    suburb: 'Melbourne CBD',
    postcode: '3000',
    latitude: -37.8136,
    longitude: 144.9631,
    population: 178000,
    averagePropertyValue: 1200000,
    priorityScore: 99,
    monthlySearchVolume: 2200 },
  {
    state: 'VIC',
    city: 'Melbourne',
    suburb: 'Toorak',
    postcode: '3142',
    latitude: -37.8415,
    longitude: 145.0088,
    population: 12500,
    averagePropertyValue: 3800000,
    priorityScore: 97,
    monthlySearchVolume: 420 },
  {
    state: 'VIC',
    city: 'Melbourne',
    suburb: 'South Yarra',
    postcode: '3141',
    latitude: -37.8399,
    longitude: 144.9924,
    population: 25000,
    averagePropertyValue: 2100000,
    priorityScore: 94,
    monthlySearchVolume: 780 },
  {
    state: 'VIC',
    city: 'Melbourne',
    suburb: 'Brighton',
    postcode: '3186',
    latitude: -37.9063,
    longitude: 144.9993,
    population: 22500,
    averagePropertyValue: 2600000,
    priorityScore: 93,
    monthlySearchVolume: 680 },

  // Brisbane Metro - High Priority
  {
    state: 'QLD',
    city: 'Brisbane',
    suburb: 'Brisbane CBD',
    postcode: '4000',
    latitude: -27.4698,
    longitude: 153.0251,
    population: 24000,
    averagePropertyValue: 800000,
    priorityScore: 92,
    monthlySearchVolume: 1800 },
  {
    state: 'QLD',
    city: 'Brisbane',
    suburb: 'New Farm',
    postcode: '4005',
    latitude: -27.4674,
    longitude: 153.0515,
    population: 13500,
    averagePropertyValue: 1800000,
    priorityScore: 89,
    monthlySearchVolume: 520 },
  {
    state: 'QLD',
    city: 'Brisbane',
    suburb: 'Paddington',
    postcode: '4064',
    latitude: -27.4598,
    longitude: 152.9999,
    population: 8500,
    averagePropertyValue: 1600000,
    priorityScore: 87,
    monthlySearchVolume: 380 },

  // Gold Coast - High Priority
  {
    state: 'QLD',
    city: 'Gold Coast',
    suburb: 'Surfers Paradise',
    postcode: '4217',
    latitude: -28.0023,
    longitude: 153.4145,
    population: 25000,
    averagePropertyValue: 950000,
    priorityScore: 88,
    monthlySearchVolume: 890 },
  {
    state: 'QLD',
    city: 'Gold Coast',
    suburb: 'Broadbeach',
    postcode: '4218',
    latitude: -28.0331,
    longitude: 153.4290,
    population: 5500,
    averagePropertyValue: 1200000,
    priorityScore: 85,
    monthlySearchVolume: 450 },

  // Perth Metro - High Priority
  {
    state: 'WA',
    city: 'Perth',
    suburb: 'Perth CBD',
    postcode: '6000',
    latitude: -31.9505,
    longitude: 115.8605,
    population: 21000,
    averagePropertyValue: 750000,
    priorityScore: 90,
    monthlySearchVolume: 1500 },
  {
    state: 'WA',
    city: 'Perth',
    suburb: 'Subiaco',
    postcode: '6008',
    latitude: -31.9472,
    longitude: 115.8196,
    population: 19500,
    averagePropertyValue: 1400000,
    priorityScore: 86,
    monthlySearchVolume: 420 },
  {
    state: 'WA',
    city: 'Perth',
    suburb: 'Cottesloe',
    postcode: '6011',
    latitude: -31.9986,
    longitude: 115.7593,
    population: 7500,
    averagePropertyValue: 2200000,
    priorityScore: 88,
    monthlySearchVolume: 380 },

  // Adelaide Metro - Medium-High Priority
  {
    state: 'SA',
    city: 'Adelaide',
    suburb: 'Adelaide CBD',
    postcode: '5000',
    latitude: -34.9285,
    longitude: 138.6007,
    population: 25000,
    averagePropertyValue: 650000,
    priorityScore: 82,
    monthlySearchVolume: 1200 },
  {
    state: 'SA',
    city: 'Adelaide',
    suburb: 'North Adelaide',
    postcode: '5006',
    latitude: -34.9082,
    longitude: 138.5934,
    population: 5500,
    averagePropertyValue: 1100000,
    priorityScore: 79,
    monthlySearchVolume: 280 },

  // Canberra - Medium-High Priority
  {
    state: 'ACT',
    city: 'Canberra',
    suburb: 'Civic',
    postcode: '2601',
    latitude: -35.2809,
    longitude: 149.1300,
    population: 4500,
    averagePropertyValue: 850000,
    priorityScore: 81,
    monthlySearchVolume: 950 },
  {
    state: 'ACT',
    city: 'Canberra',
    suburb: 'Forrest',
    postcode: '2603',
    latitude: -35.3158,
    longitude: 149.1275,
    population: 1800,
    averagePropertyValue: 1650000,
    priorityScore: 78,
    monthlySearchVolume: 180 },

  // Hobart - Medium Priority
  {
    state: 'TAS',
    city: 'Hobart',
    suburb: 'Hobart CBD',
    postcode: '7000',
    latitude: -42.8821,
    longitude: 147.3272,
    population: 4500,
    averagePropertyValue: 580000,
    priorityScore: 75,
    monthlySearchVolume: 680 },
  {
    state: 'TAS',
    city: 'Hobart',
    suburb: 'Battery Point',
    postcode: '7004',
    latitude: -42.8944,
    longitude: 147.3347,
    population: 3500,
    averagePropertyValue: 1200000,
    priorityScore: 76,
    monthlySearchVolume: 220 },

  // Darwin - Medium Priority
  {
    state: 'NT',
    city: 'Darwin',
    suburb: 'Darwin CBD',
    postcode: '0800',
    latitude: -12.4634,
    longitude: 130.8456,
    population: 4600,
    averagePropertyValue: 650000,
    priorityScore: 72,
    monthlySearchVolume: 580 },

  // International - Pacific Region
  {
    state: 'International',
    city: 'Nauru',
    suburb: 'Yaren District',
    postcode: 'NRU',
    latitude: -0.5477,
    longitude: 166.9209,
    population: 12500,
    averagePropertyValue: 350000,
    priorityScore: 85, // High priority for international expansion
    monthlySearchVolume: 150 },
];

// Service types for disaster recovery
export const SERVICE_TYPES = [
  {
    slug: 'water-damage-restoration',
    name: 'Water Damage Restoration',
    searchVolume: 1000,
    priority: 100 },
  {
    slug: 'flood-damage-restoration',
    name: 'Flood Damage Restoration',
    searchVolume: 800,
    priority: 95 },
  {
    slug: 'mould-remediation',
    name: 'Mould Remediation',
    searchVolume: 600,
    priority: 90 },
  {
    slug: 'fire-damage-restoration',
    name: 'Fire Damage Restoration',
    searchVolume: 500,
    priority: 85 },
  {
    slug: 'storm-damage-repair',
    name: 'Storm Damage Repair',
    searchVolume: 700,
    priority: 88 },
  {
    slug: 'sewage-cleanup',
    name: 'Sewage Cleanup',
    searchVolume: 300,
    priority: 75 },
  {
    slug: 'smoke-damage-restoration',
    name: 'Smoke Damage Restoration',
    searchVolume: 250,
    priority: 70 },
  {
    slug: 'biohazard-cleaning',
    name: 'Biohazard Cleaning',
    searchVolume: 180,
    priority: 65 },
  {
    slug: 'trauma-scene-cleaning',
    name: 'Trauma Scene Cleaning',
    searchVolume: 120,
    priority: 60 },
  {
    slug: 'vandalism-repair',
    name: 'Vandalism Repair',
    searchVolume: 150,
    priority: 55 },
];

// Property types for targeted content
export const PROPERTY_TYPES = [
  {
    slug: 'residential',
    name: 'Residential',
    priority: 100,
    examples: ['homes', 'apartments', 'units', 'townhouses'] },
  {
    slug: 'commercial',
    name: 'Commercial',
    priority: 95,
    examples: ['offices', 'retail stores', 'restaurants', 'warehouses'] },
  {
    slug: 'industrial',
    name: 'Industrial',
    priority: 85,
    examples: ['factories', 'manufacturing', 'processing plants'] },
  {
    slug: 'institutional',
    name: 'Institutional',
    priority: 80,
    examples: ['schools', 'hospitals', 'government buildings'] },
  {
    slug: 'high-rise',
    name: 'High-Rise',
    priority: 90,
    examples: ['apartment towers', 'office buildings', 'mixed-use developments'] },
];

// Business types for hyper-local targeting
export const BUSINESS_TYPES = [
  'restaurants', 'cafes', 'hotels', 'motels', 'medical-centres', 'dental-practices',
  'pharmacies', 'retail-stores', 'offices', 'warehouses', 'schools', 'childcare-centres',
  'gyms', 'beauty-salons', 'automotive-workshops', 'veterinary-clinics', 'aged-care-facilities',
  'shopping-centres', 'banks', 'legal-offices', 'accountants', 'real-estate-offices'
];

// Generate all location combinations for SEO
export function generateLocationCombinations(): Array<{
  location: LocationData;
  service: typeof SERVICE_TYPES[0];
  propertyType: typeof PROPERTY_TYPES[0];
  businessType?: string;
}> {
  const combinations = [];

  for (const location of PRIORITY_LOCATIONS) {
    for (const service of SERVICE_TYPES) {
      for (const propertyType of PROPERTY_TYPES) {
        // Standard property type combination
        combinations.push({
          location,
          service,
          propertyType });

        // Add business-specific combinations for commercial properties
        if (propertyType.slug === 'commercial') {
          for (const businessType of BUSINESS_TYPES.slice(0, 10)) { // Limit to top 10 business types per location
            combinations.push({
              location,
              service,
              propertyType,
              businessType });
          }
        }
      }
    }
  }

  // Sort by priority score
  return combinations.sort((a, b) => {
    const scoreA = (a.location.priorityScore + a.service.priority + a.propertyType.priority) / 3;
    const scoreB = (b.location.priorityScore + b.service.priority + b.propertyType.priority) / 3;
    return scoreB - scoreA;
  });
}

// Calculate priority score for a page
export function calculatePagePriority(
  location: LocationData,
  service: typeof SERVICE_TYPES[0],
  propertyType: typeof PROPERTY_TYPES[0],
  businessType?: string
): number {
  let score = 0;
  
  // Location weight (50%)
  score += location.priorityScore * 0.5;
  
  // Service weight (30%)
  score += service.priority * 0.3;
  
  // Property type weight (15%)
  score += propertyType.priority * 0.15;
  
  // Business type bonus (5%)
  if (businessType) {
    score += 5; // Small bonus for business-specific pages
  }
  
  return Math.round(score);
}

// Get estimated monthly searches for a location/service combo
export function getEstimatedSearchVolume(
  location: LocationData,
  service: typeof SERVICE_TYPES[0],
  propertyType: typeof PROPERTY_TYPES[0]
): number {
  const baseVolume = service.searchVolume;
  const locationMultiplier = location.population / 100000; // Adjust for population
  const propertyMultiplier = propertyType.priority / 100;
  
  return Math.round(baseVolume * locationMultiplier * propertyMultiplier);
}