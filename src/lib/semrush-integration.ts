// SEMrush API Integration for keyword research and competitive analysis

interface SEMrushConfig {
  apiKey: string;
  database: string;
  exportColumns: string[];
}

const SEMRUSH_API_KEY = process.env.SEMRUSH_API_KEY || '';
const SEMRUSH_BASE_URL = 'https://api.semrush.com';

export const semrushConfig: SEMrushConfig = {
  apiKey: SEMRUSH_API_KEY,
  database: 'au', // Australia database
  exportColumns: [
    'Ph', // Phrase
    'Nq', // Number of search queries
    'Cp', // CPC
    'Co', // Competition
    'Nr', // Number of results
    'Td', // Trends
  ] };

// Keyword research for disaster recovery services
export const targetKeywords = {
  primary: [
    'disaster recovery australia',
    'emergency restoration services',
    'water damage restoration',
    'fire damage restoration',
    'flood recovery services',
    'mould remediation australia',
    'storm damage repair',
    'biohazard cleanup',
    'iicrc certified restoration',
    '24/7 emergency restoration',
  ],
  commercial: [
    'commercial water damage',
    'office flood restoration',
    'warehouse fire damage',
    'retail store restoration',
    'restaurant water damage',
    'hotel disaster recovery',
    'school mould remediation',
    'hospital biohazard cleanup',
    'government facility restoration',
    'industrial disaster recovery',
  ],
  residential: [
    'home water damage',
    'house fire restoration',
    'apartment flood damage',
    'residential mould removal',
    'storm damage repair home',
    'sewage backup cleanup',
    'ceiling water damage',
    'carpet water extraction',
    'contents restoration',
    'emergency board up services',
  ],
  insurance: [
    'insurance restoration contractor',
    'insurance approved restoration',
    'insurance claim water damage',
    'make safe services insurance',
    'storm damage insurance claim',
    'flood insurance restoration',
    'fire damage insurance repair',
    'contents pack out insurance',
    'loss assessor approved',
    'insurance restoration quote',
  ],
  local: [
    'water damage restoration sydney',
    'fire restoration melbourne',
    'flood recovery brisbane',
    'mould removal perth',
    'storm damage adelaide',
    'disaster recovery gold coast',
    'emergency restoration canberra',
    'water extraction newcastle',
    'fire damage sunshine coast',
    'flood cleanup wollongong',
  ],
  emergency: [
    'emergency water extraction',
    '24 hour flood response',
    'after hours water damage',
    'weekend emergency restoration',
    'urgent mould removal',
    'same day water extraction',
    'immediate fire restoration',
    'emergency sewage cleanup',
    'burst pipe emergency',
    'storm damage emergency',
  ],
  longtail: [
    'how much does water damage restoration cost',
    'how long does fire restoration take',
    'what to do after flood damage',
    'is mould removal covered by insurance',
    'who to call for water damage',
    'when to call disaster restoration',
    'why hire iicrc certified restoration',
    'where to find emergency restoration',
    'which restoration company is best',
    'what does disaster recovery include',
  ] };

// Competitor domains to monitor
export const competitorDomains = [
  'steamatic.com.au',
  'restorationaustralia.com.au',
  'allprorestore.com.au',
  'paulsdavis.com.au',
  'servpro.com.au',
  'rapidrestoration.com.au',
  'crbaustralia.com.au',
  'disasterrestoration.com.au',
  'floodrestoration.com.au',
  'fireandflood.com.au',
];

// SEMrush API endpoints
export const semrushEndpoints = {
  domainOverview: '/analytics/v1/',
  keywordOverview: '/analytics/v1/',
  organicResearch: '/analytics/v1/',
  backlinks: '/analytics/v1/',
  competitorAnalysis: '/analytics/v1/' };

// Fetch keyword data from SEMrush
export async function fetchKeywordData(keyword: string) {
  if (!SEMRUSH_API_KEY) {
    console.warn('SEMrush API key not configured');
    return null;
  }

  const params = new URLSearchParams({
    type: 'phrase_all',
    key: SEMRUSH_API_KEY,
    phrase: keyword,
    export_columns: semrushConfig.exportColumns.join(','),
    database: semrushConfig.database });

  try {
    const response = await fetch(`${SEMRUSH_BASE_URL}?${params}`);
    if (!response.ok) {
      throw new Error(`SEMrush API error: ${response.status}`);
    }
    const data = await response.text();
    return parseCSVResponse(data);
  } catch (error) {
    console.error('Error fetching SEMrush data:', error);
    return null;
  }
}

// Parse CSV response from SEMrush
function parseCSVResponse(csv: string) {
  const lines = csv.trim().split('\n');
  const headers = lines[0].split(';');
  const data = lines.slice(1).map(line => {
    const values = line.split(';');
    return headers.reduce((obj, header, index) => {
      obj[header] = values[index];
      return obj;
    }, {} as Record<string, string>);
  });
  return data;
}

// Get competitor analysis
export async function getCompetitorAnalysis(domain: string) {
  if (!SEMRUSH_API_KEY) {
    return null;
  }

  const params = new URLSearchParams({
    type: 'domain_ranks',
    key: SEMRUSH_API_KEY,
    domain: domain,
    database: semrushConfig.database });

  try {
    const response = await fetch(`${SEMRUSH_BASE_URL}?${params}`);
    const data = await response.text();
    return parseCSVResponse(data);
  } catch (error) {
    console.error('Error fetching competitor data:', error);
    return null;
  }
}

// Generate SEO recommendations based on keyword data
export function generateSEORecommendations(keywordData: any[]) {
  const recommendations = [];
  
  for (const keyword of keywordData) {
    const searchVolume = parseInt(keyword.Nq || '0');
    const competition = parseFloat(keyword.Co || '0');
    const cpc = parseFloat(keyword.Cp || '0');
    
    if (searchVolume > 1000 && competition < 0.7) {
      recommendations.push({
        keyword: keyword.Ph,
        priority: 'HIGH',
        reason: 'High volume, low competition',
        searchVolume,
        competition,
        cpc });
    } else if (searchVolume > 500 && cpc > 5) {
      recommendations.push({
        keyword: keyword.Ph,
        priority: 'MEDIUM',
        reason: 'Good commercial intent',
        searchVolume,
        competition,
        cpc });
    }
  }
  
  return recommendations.sort((a, b) => b.searchVolume - a.searchVolume);
}

// Content gap analysis
export async function contentGapAnalysis(competitorDomain: string, ourDomain: string) {
  // This would compare keywords the competitor ranks for that we don't
  // Requires additional SEMrush API calls
  return {
    competitor: competitorDomain,
    ourDomain,
    gaps: [], // Keywords to target
    opportunities: [], // Quick wins
  };
}

// Track ranking improvements
export function trackRankingImprovements(previousRankings: any, currentRankings: any) {
  const improvements: any[] = [];
  const declines: any[] = [];
  
  // Compare rankings and identify changes
  // This would be implemented with actual ranking data
  
  return {
    improvements,
    declines,
    summary: {
      totalKeywords: 0,
      improved: 0,
      declined: 0,
      stable: 0 } };
}