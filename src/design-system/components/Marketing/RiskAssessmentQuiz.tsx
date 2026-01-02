/**
 * RiskAssessmentQuiz Component
 *
 * Interactive questionnaire to assess disaster preparedness risk
 * Provides personalized recommendations based on responses
 *
 * Features:
 * - Multi-question quiz format
 * - Scoring system with risk levels
 * - Personalized recommendations
 * - Progress tracking
 * - WCAG 2.1 AA compliant
 */

import React, { useState } from 'react';
import { disasterRecoveryColors, spacing, borderRadius, boxShadows, fontFamilies, fontWeights } from '../../tokens';

export interface QuizQuestion {
  id: string;
  question: string;
  options: Array<{
    value: string;
    label: string;
    riskScore: number; // 0-10, higher = more risk
  }>;
}

export interface RiskAssessmentQuizProps {
  /** Quiz title */
  title?: string;
  /** Quiz description */
  description?: string;
  /** Quiz questions */
  questions?: QuizQuestion[];
  /** Callback when quiz is complete */
  onComplete?: (result: QuizResult) => void;
  /** Additional CSS class */
  className?: string;
}

export interface QuizResult {
  totalScore: number;
  riskLevel: 'low' | 'moderate' | 'high' | 'critical';
  recommendations: string[];
  answers: Record<string, string>;
}

const DEFAULT_QUESTIONS: QuizQuestion[] = [
  {
    id: 'insurance',
    question: 'Do you have adequate property insurance coverage?',
    options: [
      { value: 'comprehensive', label: 'Yes, comprehensive coverage', riskScore: 0 },
      { value: 'basic', label: 'Yes, basic coverage only', riskScore: 4 },
      { value: 'unsure', label: 'Unsure of coverage details', riskScore: 7 },
      { value: 'none', label: 'No insurance', riskScore: 10 },
    ],
  },
  {
    id: 'location',
    question: 'Is your property in a high-risk disaster zone?',
    options: [
      { value: 'no', label: 'No known risks', riskScore: 0 },
      { value: 'flood', label: 'Flood-prone area', riskScore: 7 },
      { value: 'bushfire', label: 'Bushfire risk zone', riskScore: 8 },
      { value: 'multiple', label: 'Multiple risk factors', riskScore: 10 },
    ],
  },
  {
    id: 'emergency-plan',
    question: 'Do you have an emergency response plan?',
    options: [
      { value: 'documented', label: 'Yes, documented and practiced', riskScore: 0 },
      { value: 'informal', label: 'Informal plan only', riskScore: 5 },
      { value: 'none', label: 'No emergency plan', riskScore: 10 },
    ],
  },
  {
    id: 'maintenance',
    question: 'How often do you maintain your property?',
    options: [
      { value: 'regular', label: 'Regular preventive maintenance', riskScore: 0 },
      { value: 'occasional', label: 'Occasional maintenance', riskScore: 4 },
      { value: 'reactive', label: 'Only when problems occur', riskScore: 8 },
      { value: 'rarely', label: 'Rarely or never', riskScore: 10 },
    ],
  },
  {
    id: 'contractor',
    question: 'Do you have a trusted contractor for emergencies?',
    options: [
      { value: 'yes', label: 'Yes, pre-selected contractor', riskScore: 0 },
      { value: 'researching', label: 'Currently researching options', riskScore: 5 },
      { value: 'no', label: 'No, would search during emergency', riskScore: 10 },
    ],
  },
];

/**
 * RiskAssessmentQuiz - Interactive preparedness assessment
 *
 * @example
 * ```tsx
 * <RiskAssessmentQuiz
 *   title="How Prepared Are You?"
 *   description="Take our 5-question assessment to find out"
 *   onComplete={(result) => {
 *     console.log('Risk level:', result.riskLevel);
 *     console.log('Recommendations:', result.recommendations);
 *   }}
 * />
 * ```
 */
export const RiskAssessmentQuiz: React.FC<RiskAssessmentQuizProps> = ({
  title = 'How Prepared Are You?',
  description = 'Take our 5-question assessment',
  questions = DEFAULT_QUESTIONS,
  onComplete,
  className = '',
}) => {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleAnswer = (questionId: string, value: string) => {
    const newAnswers = { ...answers, [questionId]: value };
    setAnswers(newAnswers);

    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateResults(newAnswers);
    }
  };

  const calculateResults = (finalAnswers: Record<string, string>) => {
    let totalScore = 0;

    questions.forEach((question) => {
      const selectedValue = finalAnswers[question.id];
      const option = question.options.find((opt) => opt.value === selectedValue);
      if (option) {
        totalScore += option.riskScore;
      }
    });

    const maxScore = questions.length * 10;
    const percentage = (totalScore / maxScore) * 100;

    let riskLevel: QuizResult['riskLevel'];
    let recommendations: string[];

    if (percentage < 25) {
      riskLevel = 'low';
      recommendations = [
        'You have excellent disaster preparedness',
        'Continue regular property maintenance',
        'Review and update your emergency plan annually',
      ];
    } else if (percentage < 50) {
      riskLevel = 'moderate';
      recommendations = [
        'Consider upgrading your insurance coverage',
        'Create a documented emergency response plan',
        'Pre-select a trusted disaster recovery contractor',
        'Schedule regular property inspections',
      ];
    } else if (percentage < 75) {
      riskLevel = 'high';
      recommendations = [
        'Urgently review your insurance coverage',
        'Develop and document an emergency plan immediately',
        'Connect with certified disaster recovery contractors now',
        'Conduct a professional property risk assessment',
        'Address maintenance issues before disaster strikes',
      ];
    } else {
      riskLevel = 'critical';
      recommendations = [
        'URGENT: Get comprehensive insurance coverage now',
        'Create an emergency plan this week',
        'Schedule immediate property inspection',
        'Pre-register with disaster recovery contractors',
        'Consider professional risk mitigation services',
        'Document all property conditions and valuables',
      ];
    }

    const result: QuizResult = {
      totalScore,
      riskLevel,
      recommendations,
      answers: finalAnswers,
    };

    setShowResults(true);
    onComplete?.(result);
  };

  const goBack = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const reset = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setShowResults(false);
  };

  const getRiskLevelColor = (level: QuizResult['riskLevel']): string => {
    switch (level) {
      case 'low':
        return disasterRecoveryColors.success;
      case 'moderate':
        return disasterRecoveryColors.warning;
      case 'high':
        return '#F59E0B';
      case 'critical':
        return disasterRecoveryColors.error;
      default:
        return disasterRecoveryColors.neutral[500];
    }
  };

  const getRiskLevelLabel = (level: QuizResult['riskLevel']): string => {
    return level.charAt(0).toUpperCase() + level.slice(1) + ' Risk';
  };

  const containerStyles: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    border: `1px solid ${disasterRecoveryColors.neutral[200]}`,
    borderRadius: borderRadius.xl,
    boxShadow: boxShadows.lg,
    padding: spacing[8],
    maxWidth: '700px',
    margin: '0 auto',
  };

  const headerStyles: React.CSSProperties = {
    textAlign: 'center',
    marginBottom: spacing[8],
  };

  const titleStyles: React.CSSProperties = {
    fontFamily: fontFamilies.serif,
    fontSize: '2rem',
    fontWeight: fontWeights.bold,
    color: disasterRecoveryColors.authority.text,
    marginBottom: spacing[3],
  };

  const descriptionStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '1rem',
    color: disasterRecoveryColors.authority.textSecondary,
  };

  const progressBarStyles: React.CSSProperties = {
    width: '100%',
    height: '8px',
    backgroundColor: disasterRecoveryColors.neutral[200],
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    marginBottom: spacing[8],
  };

  const progressFillStyles: React.CSSProperties = {
    height: '100%',
    backgroundColor: disasterRecoveryColors.education.primary,
    width: `${((currentQuestion + 1) / questions.length) * 100}%`,
    transition: 'width 0.3s ease-in-out',
  };

  const progressTextStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    color: disasterRecoveryColors.authority.textSecondary,
    textAlign: 'center',
    marginBottom: spacing[2],
  };

  const questionStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '1.25rem',
    fontWeight: fontWeights.semibold,
    color: disasterRecoveryColors.authority.text,
    marginBottom: spacing[6],
  };

  const optionsContainerStyles: React.CSSProperties = {
    display: 'flex',
    flexDirection: 'column',
    gap: spacing[3],
  };

  const optionButtonStyles: React.CSSProperties = {
    padding: spacing[4],
    border: `2px solid ${disasterRecoveryColors.neutral[300]}`,
    borderRadius: borderRadius.lg,
    backgroundColor: '#FFFFFF',
    cursor: 'pointer',
    fontFamily: fontFamilies.sans,
    fontSize: '1rem',
    fontWeight: fontWeights.medium,
    textAlign: 'left',
    transition: 'all 0.2s',
    color: disasterRecoveryColors.authority.text,
  };

  const navigationStyles: React.CSSProperties = {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: spacing[6],
  };

  const backButtonStyles: React.CSSProperties = {
    padding: `${spacing[3]} ${spacing[6]}`,
    border: `1px solid ${disasterRecoveryColors.neutral[300]}`,
    borderRadius: borderRadius.md,
    backgroundColor: '#FFFFFF',
    color: disasterRecoveryColors.authority.text,
    fontFamily: fontFamilies.sans,
    fontSize: '1rem',
    fontWeight: fontWeights.medium,
    cursor: 'pointer',
  };

  const resultsStyles: React.CSSProperties = {
    textAlign: 'center',
  };

  const result = showResults ? calculateFinalResult(answers) : null;

  function calculateFinalResult(finalAnswers: Record<string, string>): QuizResult {
    let totalScore = 0;
    questions.forEach((question) => {
      const selectedValue = finalAnswers[question.id];
      const option = question.options.find((opt) => opt.value === selectedValue);
      if (option) {
        totalScore += option.riskScore;
      }
    });

    const maxScore = questions.length * 10;
    const percentage = (totalScore / maxScore) * 100;

    let riskLevel: QuizResult['riskLevel'];
    let recommendations: string[];

    if (percentage < 25) {
      riskLevel = 'low';
      recommendations = [
        'You have excellent disaster preparedness',
        'Continue regular property maintenance',
      ];
    } else if (percentage < 50) {
      riskLevel = 'moderate';
      recommendations = [
        'Consider upgrading your insurance coverage',
        'Create a documented emergency response plan',
      ];
    } else if (percentage < 75) {
      riskLevel = 'high';
      recommendations = [
        'Urgently review your insurance coverage',
        'Develop and document an emergency plan immediately',
      ];
    } else {
      riskLevel = 'critical';
      recommendations = [
        'URGENT: Get comprehensive insurance coverage now',
        'Create an emergency plan this week',
      ];
    }

    return { totalScore, riskLevel, recommendations, answers: finalAnswers };
  }

  return (
    <div className={className} style={containerStyles}>
      {/* Header */}
      <div style={headerStyles}>
        <h2 style={titleStyles}>{title}</h2>
        <p style={descriptionStyles}>{description}</p>
      </div>

      {!showResults ? (
        <>
          {/* Progress */}
          <p style={progressTextStyles}>
            Question {currentQuestion + 1} of {questions.length}
          </p>
          <div style={progressBarStyles}>
            <div style={progressFillStyles} />
          </div>

          {/* Current question */}
          <div>
            <h3 style={questionStyles}>{questions[currentQuestion].question}</h3>

            <div style={optionsContainerStyles}>
              {questions[currentQuestion].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleAnswer(questions[currentQuestion].id, option.value)}
                  style={optionButtonStyles}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = disasterRecoveryColors.education.primary;
                    e.currentTarget.style.backgroundColor = disasterRecoveryColors.education.background;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = disasterRecoveryColors.neutral[300];
                    e.currentTarget.style.backgroundColor = '#FFFFFF';
                  }}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          {/* Navigation */}
          {currentQuestion > 0 && (
            <div style={navigationStyles}>
              <button onClick={goBack} style={backButtonStyles}>
                Back
              </button>
            </div>
          )}
        </>
      ) : (
        /* Results */
        result && (
          <div style={resultsStyles}>
            <div
              style={{
                fontSize: '3rem',
                fontWeight: fontWeights.bold,
                color: getRiskLevelColor(result.riskLevel),
                fontFamily: fontFamilies.serif,
                marginBottom: spacing[4],
              }}
            >
              {getRiskLevelLabel(result.riskLevel)}
            </div>

            <h3
              style={{
                fontFamily: fontFamilies.sans,
                fontSize: '1.5rem',
                fontWeight: fontWeights.semibold,
                color: disasterRecoveryColors.authority.text,
                marginBottom: spacing[6],
              }}
            >
              Your Recommendations:
            </h3>

            <ul
              style={{
                listStyle: 'none',
                padding: 0,
                textAlign: 'left',
                marginBottom: spacing[8],
              }}
            >
              {result.recommendations.map((rec, i) => (
                <li
                  key={i}
                  style={{
                    fontFamily: fontFamilies.sans,
                    fontSize: '1rem',
                    color: disasterRecoveryColors.authority.text,
                    padding: spacing[3],
                    borderLeft: `4px solid ${getRiskLevelColor(result.riskLevel)}`,
                    backgroundColor: disasterRecoveryColors.neutral[50],
                    marginBottom: spacing[3],
                    borderRadius: borderRadius.md,
                  }}
                >
                  {rec}
                </li>
              ))}
            </ul>

            <button
              onClick={reset}
              style={{
                padding: `${spacing[3]} ${spacing[6]}`,
                border: 'none',
                borderRadius: borderRadius.md,
                backgroundColor: disasterRecoveryColors.authority.primary,
                color: '#FFFFFF',
                fontFamily: fontFamilies.sans,
                fontSize: '1rem',
                fontWeight: fontWeights.semibold,
                cursor: 'pointer',
              }}
            >
              Take Quiz Again
            </button>
          </div>
        )
      )}
    </div>
  );
};

RiskAssessmentQuiz.displayName = 'RiskAssessmentQuiz';
