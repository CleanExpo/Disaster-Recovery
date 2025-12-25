/**
 * Sentiment Analyzer
 *
 * Analyze sentiment of messages and conversations
 */

export type Sentiment = 'positive' | 'negative' | 'neutral';

export interface SentimentAnalysis {
  text: string;
  sentiment: Sentiment;
  confidence: number; // 0-1
  score: number; // -1 to 1, where -1 is very negative, 0 is neutral, 1 is very positive
  keywords: string[];
  emotion: 'joy' | 'anger' | 'sadness' | 'neutral';
}

export interface ConversationMood {
  roomId: string;
  overallSentiment: Sentiment;
  sentimentScore: number; // -1 to 1
  messageCount: number;
  positiveMessages: number;
  negativeMessages: number;
  neutralMessages: number;
  dominantEmotion: 'joy' | 'anger' | 'sadness' | 'neutral';
  trend: 'improving' | 'declining' | 'stable';
}

/**
 * Sentiment Analyzer - Analyze text sentiment
 */
export class SentimentAnalyzer {
  private positiveWords = new Set([
    'good', 'great', 'excellent', 'amazing', 'wonderful', 'fantastic', 'awesome', 'love',
    'happy', 'joy', 'beautiful', 'perfect', 'brilliant', 'outstanding', 'superb', 'marvelous',
    'nice', 'lovely', 'fantastic', 'outstanding', 'incredible', 'wonderful', 'brilliant',
    'cool', 'awesome', 'great', 'good', 'excellent', 'nice', 'smart', 'clever', 'thoughtful',
    'helpful', 'kind', 'generous', 'grateful', 'thankful', 'proud', 'confident',
  ]);

  private negativeWords = new Set([
    'bad', 'terrible', 'awful', 'horrible', 'hate', 'angry', 'sad', 'disappointing',
    'useless', 'waste', 'stupid', 'dumb', 'wrong', 'fail', 'failed', 'problem',
    'issue', 'error', 'bug', 'broken', 'crash', 'slow', 'difficult', 'hard',
    'confusing', 'frustrated', 'frustration', 'annoyed', 'annoying', 'boring',
    'tired', 'exhausted', 'stressed', 'worried', 'concerned', 'depressed', 'depressing',
  ]);

  private emoticons = {
    positive: ['😊', '😄', '😂', '😍', '🎉', '👍', '✨', '🚀', '💯', '👏'],
    negative: ['😞', '😠', '😤', '😭', '😡', '👎', '💔', '😖', '😤', '😒'],
    neutral: ['😐', '🤔', '😑', '🤷'],
  };

  /**
   * Analyze sentiment of text
   */
  analyzeSentiment(text: string): SentimentAnalysis {
    const lowerText = text.toLowerCase();
    const words = lowerText.split(/\s+/);

    let positiveCount = 0;
    let negativeCount = 0;
    const foundKeywords: string[] = [];

    words.forEach((word) => {
      // Remove punctuation
      const cleanWord = word.replace(/[.,!?;:]/g, '');

      if (this.positiveWords.has(cleanWord)) {
        positiveCount++;
        foundKeywords.push(cleanWord);
      } else if (this.negativeWords.has(cleanWord)) {
        negativeCount++;
        foundKeywords.push(cleanWord);
      }
    });

    // Check for emoticons
    const emoticonsFound = this.findEmoticons(text);
    positiveCount += emoticonsFound.positive;
    negativeCount += emoticonsFound.negative;

    // Calculate sentiment score
    const totalSentiment = positiveCount + negativeCount;
    let score = 0;
    let sentiment: Sentiment = 'neutral';
    let confidence = 0;

    if (totalSentiment > 0) {
      score = (positiveCount - negativeCount) / totalSentiment;
      confidence = totalSentiment / Math.max(10, words.length);

      if (score > 0.1) {
        sentiment = 'positive';
      } else if (score < -0.1) {
        sentiment = 'negative';
      }
    } else {
      confidence = 0.3; // Low confidence for neutral
    }

    confidence = Math.min(1, Math.max(0, confidence));

    const emotion = this.determineEmotion(sentiment, foundKeywords);

    return {
      text,
      sentiment,
      confidence,
      score: Math.min(1, Math.max(-1, score)),
      keywords: [...new Set(foundKeywords)],
      emotion,
    };
  }

  /**
   * Analyze conversation mood
   */
  analyzeConversationMood(messages: Array<{ text: string; timestamp: Date }>): ConversationMood {
    if (messages.length === 0) {
      return {
        roomId: '',
        overallSentiment: 'neutral',
        sentimentScore: 0,
        messageCount: 0,
        positiveMessages: 0,
        negativeMessages: 0,
        neutralMessages: 0,
        dominantEmotion: 'neutral',
        trend: 'stable',
      };
    }

    let totalScore = 0;
    let positiveCount = 0;
    let negativeCount = 0;
    let neutralCount = 0;

    messages.forEach((message) => {
      const analysis = this.analyzeSentiment(message.text);
      totalScore += analysis.score;

      if (analysis.sentiment === 'positive') {
        positiveCount++;
      } else if (analysis.sentiment === 'negative') {
        negativeCount++;
      } else {
        neutralCount++;
      }
    });

    const avgScore = totalScore / messages.length;
    const overallSentiment: Sentiment = avgScore > 0.1 ? 'positive' : avgScore < -0.1 ? 'negative' : 'neutral';

    // Determine trend
    const firstHalf = messages.slice(0, Math.floor(messages.length / 2));
    const secondHalf = messages.slice(Math.floor(messages.length / 2));

    let trend: 'improving' | 'declining' | 'stable' = 'stable';
    if (firstHalf.length > 0 && secondHalf.length > 0) {
      const firstHalfScore = firstHalf.reduce((sum, msg) => sum + this.analyzeSentiment(msg.text).score, 0) / firstHalf.length;
      const secondHalfScore = secondHalf.reduce((sum, msg) => sum + this.analyzeSentiment(msg.text).score, 0) / secondHalf.length;

      if (secondHalfScore > firstHalfScore + 0.1) {
        trend = 'improving';
      } else if (secondHalfScore < firstHalfScore - 0.1) {
        trend = 'declining';
      }
    }

    const dominantEmotion = this.determineDominantEmotion(positiveCount, negativeCount, neutralCount);

    return {
      roomId: '',
      overallSentiment,
      sentimentScore: avgScore,
      messageCount: messages.length,
      positiveMessages: positiveCount,
      negativeMessages: negativeCount,
      neutralMessages: neutralCount,
      dominantEmotion,
      trend,
    };
  }

  /**
   * Detect toxic language
   */
  detectToxicity(text: string): { isToxic: boolean; toxicityScore: number; severity: 'low' | 'medium' | 'high' } {
    const toxicPatterns = [
      /\b(hate|stupid|dumb|idiot|moron|jerk|ass|hell|damn)\b/gi,
      /\b(kill|murder|hurt|attack)\b/gi,
      /\b(racist|sexist|homophobic|discriminat)\b/gi,
      /([a-z])\1{3,}/gi, // Repeated characters (excessive emphasis)
    ];

    let toxicityScore = 0;

    toxicPatterns.forEach((pattern) => {
      const matches = text.match(pattern);
      if (matches) {
        toxicityScore += matches.length * 0.2;
      }
    });

    // All caps check
    const capsRatio = (text.match(/[A-Z]/g) || []).length / text.length;
    if (capsRatio > 0.5 && text.length > 10) {
      toxicityScore += 0.15;
    }

    toxicityScore = Math.min(1, toxicityScore);
    const isToxic = toxicityScore > 0.3;

    let severity: 'low' | 'medium' | 'high' = 'low';
    if (toxicityScore > 0.7) {
      severity = 'high';
    } else if (toxicityScore > 0.4) {
      severity = 'medium';
    }

    return { isToxic, toxicityScore, severity };
  }

  /**
   * Extract key topics from text
   */
  extractTopics(text: string, topicKeywords: string[] = []): string[] {
    const words = text.toLowerCase().split(/\s+/);
    const topics: string[] = [];

    if (topicKeywords.length > 0) {
      topicKeywords.forEach((keyword) => {
        if (text.toLowerCase().includes(keyword.toLowerCase())) {
          topics.push(keyword);
        }
      });
    }

    // Auto-detect common topics
    const commonTopics = [
      { keywords: ['bug', 'error', 'issue', 'crash'], topic: 'bugs' },
      { keywords: ['feature', 'new', 'request', 'enhancement'], topic: 'features' },
      { keywords: ['performance', 'slow', 'optimize', 'speed'], topic: 'performance' },
      { keywords: ['security', 'vulnerability', 'attack', 'breach'], topic: 'security' },
      { keywords: ['deployment', 'deploy', 'release', 'launch'], topic: 'deployment' },
    ];

    commonTopics.forEach((topicConfig) => {
      const hasKeyword = topicConfig.keywords.some((kw) => words.some((word) => word.includes(kw)));
      if (hasKeyword && !topics.includes(topicConfig.topic)) {
        topics.push(topicConfig.topic);
      }
    });

    return topics;
  }

  /**
   * Find emoticons in text
   */
  private findEmoticons(text: string): { positive: number; negative: number; neutral: number } {
    let positive = 0;
    let negative = 0;
    let neutral = 0;

    this.emoticons.positive.forEach((emoticon) => {
      positive += (text.match(new RegExp(emoticon, 'g')) || []).length;
    });

    this.emoticons.negative.forEach((emoticon) => {
      negative += (text.match(new RegExp(emoticon, 'g')) || []).length;
    });

    this.emoticons.neutral.forEach((emoticon) => {
      neutral += (text.match(new RegExp(emoticon, 'g')) || []).length;
    });

    return { positive, negative, neutral };
  }

  /**
   * Determine emotion
   */
  private determineEmotion(sentiment: Sentiment, keywords: string[]): 'joy' | 'anger' | 'sadness' | 'neutral' {
    if (sentiment === 'positive') {
      return 'joy';
    } else if (sentiment === 'negative') {
      const hasAnger = keywords.some((kw) => ['hate', 'angry', 'furious', 'annoyed', 'frustrated'].includes(kw));
      const hasSadness = keywords.some((kw) => ['sad', 'depressed', 'disappointed', 'regret'].includes(kw));

      if (hasAnger) return 'anger';
      if (hasSadness) return 'sadness';
      return 'anger'; // Default negative emotion
    }

    return 'neutral';
  }

  /**
   * Determine dominant emotion
   */
  private determineDominantEmotion(positive: number, negative: number, neutral: number): 'joy' | 'anger' | 'sadness' | 'neutral' {
    const total = positive + negative + neutral;

    if (total === 0) return 'neutral';

    if (positive > negative) {
      return 'joy';
    } else if (negative > positive) {
      return 'anger'; // Could be anger or sadness, default to anger
    }

    return 'neutral';
  }
}

// Export singleton instance
export const sentimentAnalyzer = new SentimentAnalyzer();
