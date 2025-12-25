import { useState, useEffect, useCallback } from 'react';

export interface OnboardingProgress {
  contractorId: string;
  specialization: string;
  completionPercentage: number;
  currentModule: any;
  assessmentScores: any[];
  certificationType: string;
}

export function useContractorOnboarding(contractorId: string | null) {
  const [progress, setProgress] = useState<OnboardingProgress | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchProgress = useCallback(async () => {
    if (!contractorId) return;

    try {
      setLoading(true);
      setError(null);

      const response = await fetch(`/api/onboarding/progress/${contractorId}`);
      const data = await response.json();

      if (data.success) {
        setProgress(data.progress);
      } else {
        setError(data.error || 'Failed to fetch progress');
      }
    } catch (err) {
      setError('Network error. Please check your connection.');
      console.error('Failed to fetch progress:', err);
    } finally {
      setLoading(false);
    }
  }, [contractorId]);

  useEffect(() => {
    if (contractorId) {
      fetchProgress();
    }
  }, [contractorId, fetchProgress]);

  const startOnboarding = async (data: {
    contractorId: string;
    businessName: string;
    specialization: string;
    experience: number;
    certifications: string[];
  }) => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetch('/api/onboarding/start', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      const result = await response.json();

      if (result.success) {
        await fetchProgress();
        return result.onboarding;
      } else {
        throw new Error(result.error || 'Failed to start onboarding');
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to start onboarding';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  const generateQuiz = async (moduleId: string) => {
    if (!contractorId) return null;

    try {
      const response = await fetch('/api/onboarding/quiz', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ moduleId, contractorId }),
      });

      const data = await response.json();

      if (data.success) {
        return data.quiz;
      } else {
        throw new Error(data.error || 'Failed to generate quiz');
      }
    } catch (err) {
      console.error('Failed to generate quiz:', err);
      throw err;
    }
  };

  return {
    progress,
    loading,
    error,
    fetchProgress,
    startOnboarding,
    generateQuiz,
  };
}
