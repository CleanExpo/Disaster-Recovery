// Enhanced SEMrush API Integration with Real Functionality

interface SEMrushAPIResponse {
  data: any[];
  error?: string;
  units_used?: number;
}

interface KeywordMetrics {
  keyword: string;
  volume: number;
  cpc: number;
  competition: number;
  difficulty: number;
  trend: number[];
  serp_features: string[];
}

interface DomainMetrics {
  domain: string;
  organic_keywords: number;
  organic_traffic: number;
  organic_cost: number;
  adwords_keywords: number;
  adwords_traffic: number;
  adwords_cost: number;
}

interface BacklinkMetrics {
  domain: string;
  backlinks_total: number;
  domains_total: number;
  ips_total: number;
  follows_total: number;
  nofollows_total: number;
  texts_total: number;
  images_total: number;
  forms_total: number;
  frames_total: number;
}

class SEMrushAPI {
  private apiKey: string;
  private baseUrl: string = 'https://api.semrush.com/';
  private database: string;
  private unitsLimit: number;
  private unitsUsed: number = 0;

  constructor() {
    this.apiKey = process.env.SEMRUSH_API_KEY || '';
    this.database = process.env.SEMRUSH_DATABASE || 'au';
    this.unitsLimit = parseInt(process.env.SEMRUSH_API_UNITS_LIMIT || '10000');
  }

  // Check if API is configured
  isConfigured(): boolean {
    return this.apiKey !== '' && this.apiKey !== 'your_semrush_api_key_here';
  }

  // Get remaining API units
  getRemainingUnits(): number {
    return this.unitsLimit - this.unitsUsed;
  }

  // Domain Overview Report
  async getDomainOverview(domain: string): Promise<DomainMetrics | null> {
    if (!this.isConfigured()) {
      console.warn('SEMrush API key not configured');
      return null;
    }

    const params = new URLSearchParams({
      type: 'domain_ranks',
      key: this.apiKey,
      domain: domain,
      database: this.database,
      export_columns: 'Or,Ot,Oc,Ad,At,Ac',
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      const text = await response.text();
      
      if (response.ok) {
        const data = this.parseResponse(text);
        if (data.length > 0) {
          const row = data[0];
          return {
            domain: domain,
            organic_keywords: parseInt(row[0] || '0'),
            organic_traffic: parseInt(row[1] || '0'),
            organic_cost: parseFloat(row[2] || '0'),
            adwords_keywords: parseInt(row[3] || '0'),
            adwords_traffic: parseInt(row[4] || '0'),
            adwords_cost: parseFloat(row[5] || '0'),
          };
        }
      }
    } catch (error) {
      console.error('SEMrush API error:', error);
    }
    
    return null;
  }

  // Keyword Overview
  async getKeywordOverview(keyword: string): Promise<KeywordMetrics | null> {
    if (!this.isConfigured()) {
      return null;
    }

    const params = new URLSearchParams({
      type: 'phrase_all',
      key: this.apiKey,
      phrase: keyword,
      database: this.database,
      export_columns: 'Ph,Nq,Cp,Co,Kd,Td,Sf',
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      const text = await response.text();
      
      if (response.ok) {
        const data = this.parseResponse(text);
        if (data.length > 0) {
          const row = data[0];
          return {
            keyword: row[0],
            volume: parseInt(row[1] || '0'),
            cpc: parseFloat(row[2] || '0'),
            competition: parseFloat(row[3] || '0'),
            difficulty: parseFloat(row[4] || '0'),
            trend: row[5] ? row[5].split(',').map(Number) : [],
            serp_features: row[6] ? row[6].split(',') : [],
          };
        }
      }
    } catch (error) {
      console.error('SEMrush API error:', error);
    }
    
    return null;
  }

  // Organic Search Results
  async getOrganicResults(domain: string, limit: number = 10): Promise<any[]> {
    if (!this.isConfigured()) {
      return [];
    }

    const params = new URLSearchParams({
      type: 'domain_organic',
      key: this.apiKey,
      domain: domain,
      database: this.database,
      display_limit: limit.toString(),
      export_columns: 'Ph,Po,Nq,Cp,Co,Ur,Tr,Tc,Nr,Td',
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      const text = await response.text();
      
      if (response.ok) {
        const data = this.parseResponse(text);
        return data.map(row => ({
          keyword: row[0],
          position: parseInt(row[1] || '0'),
          volume: parseInt(row[2] || '0'),
          cpc: parseFloat(row[3] || '0'),
          competition: parseFloat(row[4] || '0'),
          url: row[5],
          traffic_percent: parseFloat(row[6] || '0'),
          traffic_cost: parseFloat(row[7] || '0'),
          results: parseInt(row[8] || '0'),
          trends: row[9] ? row[9].split(',').map(Number) : [],
        }));
      }
    } catch (error) {
      console.error('SEMrush API error:', error);
    }
    
    return [];
  }

  // Backlinks Overview
  async getBacklinksOverview(domain: string): Promise<BacklinkMetrics | null> {
    if (!this.isConfigured()) {
      return null;
    }

    const params = new URLSearchParams({
      type: 'backlinks_overview',
      key: this.apiKey,
      target: domain,
      target_type: 'domain',
      export_columns: 'total,domains_num,ips_num,follows_num,nofollows_num,texts_num,images_num,forms_num,frames_num',
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      const text = await response.text();
      
      if (response.ok) {
        const data = this.parseResponse(text);
        if (data.length > 0) {
          const row = data[0];
          return {
            domain: domain,
            backlinks_total: parseInt(row[0] || '0'),
            domains_total: parseInt(row[1] || '0'),
            ips_total: parseInt(row[2] || '0'),
            follows_total: parseInt(row[3] || '0'),
            nofollows_total: parseInt(row[4] || '0'),
            texts_total: parseInt(row[5] || '0'),
            images_total: parseInt(row[6] || '0'),
            forms_total: parseInt(row[7] || '0'),
            frames_total: parseInt(row[8] || '0'),
          };
        }
      }
    } catch (error) {
      console.error('SEMrush API error:', error);
    }
    
    return null;
  }

  // Competitors in Organic Search
  async getOrganicCompetitors(domain: string, limit: number = 10): Promise<any[]> {
    if (!this.isConfigured()) {
      return [];
    }

    const params = new URLSearchParams({
      type: 'domain_organic_organic',
      key: this.apiKey,
      domain: domain,
      database: this.database,
      display_limit: limit.toString(),
      export_columns: 'Dn,Cr,Np,Or,Ot,Oc,Ad',
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      const text = await response.text();
      
      if (response.ok) {
        const data = this.parseResponse(text);
        return data.map(row => ({
          domain: row[0],
          competition_level: parseFloat(row[1] || '0'),
          common_keywords: parseInt(row[2] || '0'),
          organic_keywords: parseInt(row[3] || '0'),
          organic_traffic: parseInt(row[4] || '0'),
          organic_cost: parseFloat(row[5] || '0'),
          adwords_keywords: parseInt(row[6] || '0'),
        }));
      }
    } catch (error) {
      console.error('SEMrush API error:', error);
    }
    
    return [];
  }

  // Keyword Gap Analysis
  async getKeywordGap(ourDomain: string, competitorDomains: string[]): Promise<any[]> {
    if (!this.isConfigured() || competitorDomains.length === 0) {
      return [];
    }

    // SEMrush requires special formatting for keyword gap
    const domains = [ourDomain, ...competitorDomains.slice(0, 4)].join('|');
    
    const params = new URLSearchParams({
      type: 'phrase_organic',
      key: this.apiKey,
      phrase: domains,
      database: this.database,
      export_columns: 'Ph,Nq,Cp,Co,Nr',
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      const text = await response.text();
      
      if (response.ok) {
        const data = this.parseResponse(text);
        return data.map(row => ({
          keyword: row[0],
          volume: parseInt(row[1] || '0'),
          cpc: parseFloat(row[2] || '0'),
          competition: parseFloat(row[3] || '0'),
          results: parseInt(row[4] || '0'),
        }));
      }
    } catch (error) {
      console.error('SEMrush API error:', error);
    }
    
    return [];
  }

  // Parse CSV response
  private parseResponse(csv: string): string[][] {
    const lines = csv.trim().split('\n');
    return lines
      .filter(line => line && !line.startsWith('ERROR'))
      .map(line => line.split(';'));
  }

  // Batch keyword research
  async batchKeywordResearch(keywords: string[]): Promise<KeywordMetrics[]> {
    const results: KeywordMetrics[] = [];
    
    for (const keyword of keywords) {
      const data = await this.getKeywordOverview(keyword);
      if (data) {
        results.push(data);
      }
      
      // Rate limiting - wait 100ms between requests
      await new Promise(resolve => setTimeout(resolve, 100));
    }
    
    return results;
  }

  // Get top performing pages
  async getTopPages(domain: string, limit: number = 10): Promise<any[]> {
    if (!this.isConfigured()) {
      return [];
    }

    const params = new URLSearchParams({
      type: 'url_organic',
      key: this.apiKey,
      url: `*.${domain}/*`,
      database: this.database,
      display_limit: limit.toString(),
      export_columns: 'Ur,Pc,Nq,Tr',
    });

    try {
      const response = await fetch(`${this.baseUrl}?${params}`);
      const text = await response.text();
      
      if (response.ok) {
        const data = this.parseResponse(text);
        return data.map(row => ({
          url: row[0],
          keywords_count: parseInt(row[1] || '0'),
          traffic: parseInt(row[2] || '0'),
          traffic_cost: parseFloat(row[3] || '0'),
        }));
      }
    } catch (error) {
      console.error('SEMrush API error:', error);
    }
    
    return [];
  }
}

// Export singleton instance
export const semrushAPI = new SEMrushAPI();

// Export types
export type {
  KeywordMetrics,
  DomainMetrics,
  BacklinkMetrics,
};

// Helper functions for the application
export async function checkSEMrushConnection(): Promise<boolean> {
  if (!semrushAPI.isConfigured()) {
    return false;
  }
  
  // Test with a simple request
  const result = await semrushAPI.getKeywordOverview('disaster recovery');
  return result !== null;
}

export async function getCompetitorAnalysis(domain: string = 'disasterrecovery.com.au') {
  const competitors = await semrushAPI.getOrganicCompetitors(domain);
  const overview = await semrushAPI.getDomainOverview(domain);
  const backlinks = await semrushAPI.getBacklinksOverview(domain);
  
  return {
    overview,
    competitors,
    backlinks,
  };
}

export async function getKeywordOpportunities(domain: string = 'disasterrecovery.com.au') {
  const organic = await semrushAPI.getOrganicResults(domain, 50);
  
  // Find keywords with good volume but poor rankings
  const opportunities = organic.filter(k => 
    k.volume > 100 && 
    k.position > 10 && 
    k.position <= 50
  );
  
  return opportunities.sort((a, b) => b.volume - a.volume);
}