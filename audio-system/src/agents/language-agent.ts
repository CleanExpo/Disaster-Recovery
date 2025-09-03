/**
 * Language Agent
 * Handles language detection, translation, and routing
 */

import { EventEmitter } from 'eventemitter3';
import { franc } from 'franc';
import langs from 'langs';
import winston from 'winston';

// Logger setup
const logger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [new winston.transports.Console()]
});

export interface LanguageDetectionResult {
  language: string;
  confidence: number;
  alternatives: Array<{
    language: string;
    confidence: number;
  }>;
}

export class LanguageAgent extends EventEmitter {
  private supportedLanguages: Map<string, any> = new Map();
  private detectionCache: Map<string, string> = new Map();
  private stats = {
    detectionsPerformed: 0,
    cacheHits: 0,
    languageDistribution: new Map<string, number>()
  };
  
  constructor() {
    super();
    this.initializeSupportedLanguages();
    logger.info('Language Agent initialized');
  }
  
  /**
   * Initialize supported languages for Australian market
   */
  private initializeSupportedLanguages(): void {
    const languages = [
      { code: 'en-AU', name: 'Australian English', priority: 1 },
      { code: 'en-US', name: 'American English', priority: 2 },
      { code: 'zh', name: 'Mandarin Chinese', priority: 3 },
      { code: 'ar', name: 'Arabic', priority: 4 },
      { code: 'vi', name: 'Vietnamese', priority: 5 },
      { code: 'hi', name: 'Hindi', priority: 6 },
      { code: 'es', name: 'Spanish', priority: 7 },
      { code: 'fr', name: 'French', priority: 8 },
      { code: 'de', name: 'German', priority: 9 },
      { code: 'ja', name: 'Japanese', priority: 10 },
      { code: 'ko', name: 'Korean', priority: 11 },
      { code: 'id', name: 'Indonesian', priority: 12 },
      { code: 'th', name: 'Thai', priority: 13 },
      { code: 'tl', name: 'Tagalog', priority: 14 },
      { code: 'it', name: 'Italian', priority: 15 },
      { code: 'pt', name: 'Portuguese', priority: 16 },
      { code: 'ru', name: 'Russian', priority: 17 },
      { code: 'tr', name: 'Turkish', priority: 18 },
      { code: 'pl', name: 'Polish', priority: 19 },
      { code: 'nl', name: 'Dutch', priority: 20 }
    ];
    
    languages.forEach(lang => {
      this.supportedLanguages.set(lang.code, lang);
    });
  }
  
  /**
   * Detect language from text
   */
  async detectLanguage(text: string): Promise<string> {
    this.stats.detectionsPerformed++;
    
    // Check cache first
    const cacheKey = this.generateCacheKey(text);
    if (this.detectionCache.has(cacheKey)) {
      this.stats.cacheHits++;
      const cached = this.detectionCache.get(cacheKey)!;
      logger.debug(`Language detection cache hit: ${cached}`);
      return cached;
    }
    
    try {
      // Use franc for language detection
      const detectedCode = franc(text);
      
      // Map to our supported languages
      let language = this.mapToSupportedLanguage(detectedCode);
      
      // Check for Australian-specific patterns
      if (this.isAustralianEnglish(text)) {
        language = 'en-AU';
      }
      
      // Update stats
      this.updateLanguageStats(language);
      
      // Cache result
      this.detectionCache.set(cacheKey, language);
      
      // Emit event
      this.emit('language:detected', {
        text: text.substring(0, 50),
        language,
        confidence: this.calculateConfidence(text, language)
      });
      
      logger.info(`Language detected: ${language}`, {
        textLength: text.length,
        confidence: this.calculateConfidence(text, language)
      });
      
      return language;
      
    } catch (error) {
      logger.error('Language detection failed', error);
      // Default to Australian English
      return 'en-AU';
    }
  }
  
  /**
   * Detect language with detailed results
   */
  async detectLanguageDetailed(text: string): Promise<LanguageDetectionResult> {
    const primary = await this.detectLanguage(text);
    const confidence = this.calculateConfidence(text, primary);
    
    // Get alternative languages
    const alternatives = this.getAlternativeLanguages(text);
    
    return {
      language: primary,
      confidence,
      alternatives
    };
  }
  
  /**
   * Check if text is Australian English
   */
  private isAustralianEnglish(text: string): boolean {
    const australianPatterns = [
      /\b(g'day|arvo|brekkie|barbie|servo|bottlo|tradie|ute|esky|thongs|dunny)\b/i,
      /\b(mate|bloke|sheila|fair dinkum|no worries|reckon|heaps)\b/i,
      /\b(melbourne|sydney|brisbane|perth|adelaide|darwin|hobart|canberra)\b/i,
      /\b(qld|nsw|vic|wa|sa|tas|act|nt)\b/i,
      /\b(centrelink|medicare|ato|abn|tfn)\b/i
    ];
    
    return australianPatterns.some(pattern => pattern.test(text));
  }
  
  /**
   * Map detected language code to supported language
   */
  private mapToSupportedLanguage(detectedCode: string): string {
    // Direct mapping
    if (this.supportedLanguages.has(detectedCode)) {
      return detectedCode;
    }
    
    // Check for language variants
    const mappings = {
      'eng': 'en-AU',
      'cmn': 'zh',
      'ara': 'ar',
      'vie': 'vi',
      'hin': 'hi',
      'spa': 'es',
      'fra': 'fr',
      'deu': 'de',
      'jpn': 'ja',
      'kor': 'ko',
      'ind': 'id',
      'tha': 'th',
      'tgl': 'tl'
    };
    
    if (mappings[detectedCode]) {
      return mappings[detectedCode];
    }
    
    // Default to Australian English
    return 'en-AU';
  }
  
  /**
   * Calculate confidence score for language detection
   */
  private calculateConfidence(text: string, language: string): number {
    // Factors affecting confidence:
    // 1. Text length (longer = more confident)
    // 2. Character set consistency
    // 3. Known patterns
    
    let confidence = 0.5;
    
    // Text length factor
    if (text.length > 100) confidence += 0.2;
    else if (text.length > 50) confidence += 0.1;
    
    // Language-specific patterns
    if (language === 'en-AU' && this.isAustralianEnglish(text)) {
      confidence += 0.3;
    }
    
    // Character set consistency
    if (this.hasConsistentCharset(text, language)) {
      confidence += 0.2;
    }
    
    return Math.min(confidence, 1.0);
  }
  
  /**
   * Check if text has consistent character set for language
   */
  private hasConsistentCharset(text: string, language: string): boolean {
    const charsets = {
      'zh': /[\u4e00-\u9fa5]/,
      'ja': /[\u3040-\u309f\u30a0-\u30ff]/,
      'ko': /[\uac00-\ud7af]/,
      'ar': /[\u0600-\u06ff]/,
      'th': /[\u0e00-\u0e7f]/,
      'hi': /[\u0900-\u097f]/
    };
    
    if (charsets[language]) {
      const matches = text.match(charsets[language]);
      return matches && matches.length > text.length * 0.3;
    }
    
    return true;
  }
  
  /**
   * Get alternative language suggestions
   */
  private getAlternativeLanguages(text: string): Array<{language: string; confidence: number}> {
    const alternatives = [];
    
    // Check each supported language
    for (const [code, lang] of this.supportedLanguages) {
      if (code !== 'en-AU') {
        const confidence = this.calculateConfidence(text, code);
        if (confidence > 0.3) {
          alternatives.push({ language: code, confidence });
        }
      }
    }
    
    // Sort by confidence
    alternatives.sort((a, b) => b.confidence - a.confidence);
    
    return alternatives.slice(0, 3);
  }
  
  /**
   * Translate text for audio optimization
   */
  async translateForAudio(text: string, fromLang: string, toLang: string): Promise<string> {
    // This would integrate with a translation service
    // For now, return original text with a note
    logger.warn(`Translation requested from ${fromLang} to ${toLang} - not implemented`);
    return text;
  }
  
  /**
   * Get language name from code
   */
  getLanguageName(code: string): string {
    const lang = this.supportedLanguages.get(code);
    return lang ? lang.name : code;
  }
  
  /**
   * Get supported languages
   */
  getSupportedLanguages(): string[] {
    return Array.from(this.supportedLanguages.keys());
  }
  
  /**
   * Check if language is supported
   */
  isLanguageSupported(code: string): boolean {
    return this.supportedLanguages.has(code);
  }
  
  /**
   * Get language priority (lower = higher priority)
   */
  getLanguagePriority(code: string): number {
    const lang = this.supportedLanguages.get(code);
    return lang ? lang.priority : 999;
  }
  
  /**
   * Update language statistics
   */
  private updateLanguageStats(language: string): void {
    const count = this.stats.languageDistribution.get(language) || 0;
    this.stats.languageDistribution.set(language, count + 1);
  }
  
  /**
   * Generate cache key for text
   */
  private generateCacheKey(text: string): string {
    // Use first 100 characters for cache key
    return text.substring(0, 100).toLowerCase().trim();
  }
  
  /**
   * Get agent statistics
   */
  getStats(): any {
    return {
      detectionsPerformed: this.stats.detectionsPerformed,
      cacheHits: this.stats.cacheHits,
      cacheHitRate: this.stats.cacheHits / Math.max(1, this.stats.detectionsPerformed),
      languageDistribution: Object.fromEntries(this.stats.languageDistribution),
      cacheSize: this.detectionCache.size
    };
  }
  
  /**
   * Clear cache
   */
  clearCache(): void {
    this.detectionCache.clear();
    logger.info('Language detection cache cleared');
  }
  
  /**
   * Clean up resources
   */
  async cleanup(): Promise<void> {
    this.detectionCache.clear();
    this.removeAllListeners();
    logger.info('Language Agent cleaned up');
  }
}

export default LanguageAgent;