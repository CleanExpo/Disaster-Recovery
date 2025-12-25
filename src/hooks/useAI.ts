'use client';

import { useState, useCallback, useEffect } from 'react';

/**
 * useRecommendations Hook
 *
 * Get AI-powered recommendations
 */
export function useRecommendations(userId: string | null) {
  const [recommendations, setRecommendations] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchRecommendations = useCallback(
    async (type: 'all' | 'rooms' | 'collaborators' | 'suggestions' = 'all') => {
      if (!userId) return;

      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch(`/api/ai/recommendations?userId=${userId}&type=${type}`);

        if (!response.ok) {
          throw new Error('Failed to fetch recommendations');
        }

        const data = await response.json();
        setRecommendations(data.recommendations);
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to fetch recommendations';
        setError(message);
        console.error('Fetch recommendations error:', message);
      } finally {
        setIsLoading(false);
      }
    },
    [userId]
  );

  const getPredictions = useCallback(async () => {
    if (!userId) return null;

    try {
      const response = await fetch('/api/ai/recommendations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId }),
      });

      if (!response.ok) {
        throw new Error('Failed to get predictions');
      }

      return await response.json();
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to get predictions';
      console.error('Get predictions error:', message);
      return null;
    }
  }, [userId]);

  useEffect(() => {
    if (userId) {
      fetchRecommendations('all');
    }
  }, [userId, fetchRecommendations]);

  return {
    recommendations,
    isLoading,
    error,
    fetchRecommendations,
    getPredictions,
  };
}

/**
 * useSentimentAnalysis Hook
 *
 * Analyze sentiment of text
 */
export function useSentimentAnalysis() {
  const [analysis, setAnalysis] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const analyzeSentiment = useCallback(async (text: string, type: 'sentiment' | 'toxicity' | 'topics' = 'sentiment') => {
    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch('/api/ai/sentiment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, type }),
      });

      if (!response.ok) {
        throw new Error('Failed to analyze sentiment');
      }

      const data = await response.json();
      setAnalysis(data.result || data.topics);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to analyze sentiment';
      setError(message);
      console.error('Sentiment analysis error:', message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, []);

  const analyzeConversation = useCallback(
    async (messages: Array<{ text: string; timestamp: Date }>) => {
      try {
        setIsLoading(true);
        setError(null);

        const response = await fetch('/api/ai/sentiment', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages }),
        });

        if (!response.ok) {
          throw new Error('Failed to analyze conversation');
        }

        const data = await response.json();
        setAnalysis(data.mood);
        return data;
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to analyze conversation';
        setError(message);
        console.error('Conversation analysis error:', message);
        return null;
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  return {
    analysis,
    isLoading,
    error,
    analyzeSentiment,
    analyzeConversation,
  };
}

/**
 * useAnomalyDetection Hook
 *
 * Detect anomalies in behavior
 */
export function useAnomalyDetection(entityId: string | null, entityType: 'user' | 'room' | 'system' = 'user') {
  const [anomalies, setAnomalies] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const detectAnomalies = useCallback(async () => {
    if (!entityId && entityType !== 'system') return;

    try {
      setIsLoading(true);
      setError(null);

      const params = new URLSearchParams();
      if (entityId) params.append('entityId', entityId);
      params.append('entityType', entityType);
      params.append('type', 'detect');

      const response = await fetch(`/api/ai/anomalies?${params.toString()}`);

      if (!response.ok) {
        throw new Error('Failed to detect anomalies');
      }

      const data = await response.json();
      setAnomalies(data.result);
      return data;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to detect anomalies';
      setError(message);
      console.error('Anomaly detection error:', message);
      return null;
    } finally {
      setIsLoading(false);
    }
  }, [entityId, entityType]);

  const establishBaseline = useCallback(
    async (userId: string) => {
      try {
        const response = await fetch('/api/ai/anomalies', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ action: 'baseline', userId }),
        });

        if (!response.ok) {
          throw new Error('Failed to establish baseline');
        }

        return await response.json();
      } catch (err) {
        const message = err instanceof Error ? err.message : 'Failed to establish baseline';
        console.error('Establish baseline error:', message);
        return null;
      }
    },
    []
  );

  useEffect(() => {
    detectAnomalies();
  }, [entityId, entityType, detectAnomalies]);

  return {
    anomalies,
    isLoading,
    error,
    detectAnomalies,
    establishBaseline,
  };
}
