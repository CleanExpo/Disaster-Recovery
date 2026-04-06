/**
 * Who's First? Scenario Generator
 * Generates scenarios for the Who's First decision tool
 */

export interface WhosFirstScenario {
  id: string;
  title: string;
  question: string;
  metaDescription: string;
  situation: string;
  whyUsFirst: string[];
  wrongFirstCalls: {
    who: string;
    consequence: string;
  }[];
  ourProcess: string[];
  timelineCritical: string[];
  insuranceInsights: string[];
  healthSafety: string[];
  costImpact: {
    withUs: string;
    withoutUs: string;
    savings: string;
  };
  faqs: {
    question: string;
    answer: string;
  }[];
  caseStudy?: {
    title: string;
    situation: string;
    action: string;
    result: string;
  };
  relatedScenarios: string[];
  searchKeywords: string[];
}

export function generateScenario(params: Partial<WhosFirstScenario>): WhosFirstScenario {
  return {
    id: params.id || `scenario-${Date.now()}`,
    title: params.title || 'Damage Scenario',
    question: params.question || '',
    metaDescription: params.metaDescription || '',
    situation: params.situation || '',
    whyUsFirst: params.whyUsFirst || [],
    wrongFirstCalls: params.wrongFirstCalls || [],
    ourProcess: params.ourProcess || [],
    timelineCritical: params.timelineCritical || [],
    insuranceInsights: params.insuranceInsights || [],
    healthSafety: params.healthSafety || [],
    costImpact: params.costImpact || { withUs: '', withoutUs: '', savings: '' },
    faqs: params.faqs || [],
    relatedScenarios: params.relatedScenarios || [],
    searchKeywords: params.searchKeywords || [],
    ...params
  };
}
