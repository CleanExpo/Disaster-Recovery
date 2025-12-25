'use client';

import { useState } from 'react';
import { useSentimentAnalysis } from '@/hooks/useAI';

interface SentimentAnalyzerWidgetProps {
  onAnalysisComplete?: (result: any) => void;
}

/**
 * Sentiment Analyzer Widget Component
 *
 * Analyze sentiment and toxicity of messages
 */
export function SentimentAnalyzerWidget({ onAnalysisComplete }: SentimentAnalyzerWidgetProps) {
  const [inputText, setInputText] = useState('');
  const [selectedType, setSelectedType] = useState<'sentiment' | 'toxicity' | 'topics'>('sentiment');
  const { analysis, isLoading, error, analyzeSentiment } = useSentimentAnalysis();

  const handleAnalyze = async () => {
    if (inputText.trim()) {
      const result = await analyzeSentiment(inputText, selectedType);
      onAnalysisComplete?.(result);
    }
  };

  const getSentimentColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'negative':
        return 'bg-red-100 text-red-800 border-red-300';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  const getSentimentEmoji = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return '😊';
      case 'negative':
        return '😞';
      default:
        return '😐';
    }
  };

  const getToxicityColor = (severity: string) => {
    switch (severity) {
      case 'high':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      default:
        return 'bg-green-100 text-green-800 border-green-300';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow p-6">
      <h2 className="text-xl font-bold text-gray-900 mb-4">📊 Sentiment Analyzer</h2>

      {/* Input Section */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Analyze Text</label>
        <textarea
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Enter text to analyze sentiment, toxicity, or extract topics..."
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          rows={4}
        />
      </div>

      {/* Type Selection */}
      <div className="mb-4">
        <label className="block text-sm font-medium text-gray-700 mb-2">Analysis Type</label>
        <div className="flex gap-2">
          {(['sentiment', 'toxicity', 'topics'] as const).map((type) => (
            <button
              key={type}
              onClick={() => setSelectedType(type)}
              className={`px-3 py-2 rounded-lg font-medium text-sm transition-colors ${
                selectedType === type
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
              }`}
            >
              {type === 'sentiment' && '😊 Sentiment'}
              {type === 'toxicity' && '⚠️ Toxicity'}
              {type === 'topics' && '🏷️ Topics'}
            </button>
          ))}
        </div>
      </div>

      {/* Error Message */}
      {error && (
        <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-800 text-sm">{error}</p>
        </div>
      )}

      {/* Analyze Button */}
      <button
        onClick={handleAnalyze}
        disabled={isLoading || !inputText.trim()}
        className="w-full px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-bold rounded-lg transition-colors mb-4"
      >
        {isLoading ? 'Analyzing...' : 'Analyze'}
      </button>

      {/* Results */}
      {analysis && (
        <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
          {selectedType === 'sentiment' && analysis.sentiment && (
            <>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Sentiment</p>
                <div className={`px-4 py-2 rounded-lg border-2 inline-block font-bold text-center ${getSentimentColor(analysis.sentiment)}`}>
                  {getSentimentEmoji(analysis.sentiment)} {analysis.sentiment.toUpperCase()}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Confidence: {Math.round(analysis.confidence * 100)}%</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-blue-600"
                    style={{ width: `${analysis.confidence * 100}%` }}
                  ></div>
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Sentiment Score</p>
                <div className="flex items-center gap-2">
                  <span className="text-sm">Negative</span>
                  <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                    <div
                      className={`h-full ${analysis.score > 0 ? 'bg-green-600' : 'bg-red-600'}`}
                      style={{ width: `${(analysis.score + 1) * 50}%` }}
                    ></div>
                  </div>
                  <span className="text-sm">Positive</span>
                </div>
                <p className="text-xs text-gray-600 mt-1 text-center">{(analysis.score * 100).toFixed(1)}</p>
              </div>

              {analysis.keywords.length > 0 && (
                <div>
                  <p className="text-sm font-medium text-gray-600 mb-2">Key Sentiment Words</p>
                  <div className="flex flex-wrap gap-1">
                    {analysis.keywords.map((keyword: string) => (
                      <span key={keyword} className="px-2 py-1 bg-blue-100 text-blue-700 text-xs rounded">
                        {keyword}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </>
          )}

          {selectedType === 'toxicity' && analysis.isToxic !== undefined && (
            <>
              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Toxicity Level</p>
                <div className={`px-4 py-2 rounded-lg border-2 inline-block font-bold ${getToxicityColor(analysis.severity)}`}>
                  {analysis.isToxic ? '⚠️' : '✓'} {analysis.severity.toUpperCase()}
                </div>
              </div>

              <div>
                <p className="text-sm font-medium text-gray-600 mb-2">Toxicity Score: {(analysis.toxicityScore * 100).toFixed(1)}%</p>
                <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${analysis.toxicityScore > 0.7 ? 'bg-red-600' : analysis.toxicityScore > 0.4 ? 'bg-yellow-600' : 'bg-green-600'}`}
                    style={{ width: `${analysis.toxicityScore * 100}%` }}
                  ></div>
                </div>
              </div>
            </>
          )}

          {selectedType === 'topics' && Array.isArray(analysis) && (
            <div>
              <p className="text-sm font-medium text-gray-600 mb-2">Detected Topics</p>
              {analysis.length > 0 ? (
                <div className="flex flex-wrap gap-2">
                  {analysis.map((topic: string) => (
                    <span key={topic} className="px-3 py-1 bg-purple-100 text-purple-700 text-sm rounded-full">
                      🏷️ {topic}
                    </span>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-600">No specific topics detected</p>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
