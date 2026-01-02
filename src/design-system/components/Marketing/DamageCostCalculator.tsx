/**
 * DamageCostCalculator Component
 *
 * Multi-step interactive calculator for estimating disaster recovery costs
 * Used for lead generation and education
 *
 * Features:
 * - Multi-step form flow
 * - Real-time cost estimation
 * - Progress indicator
 * - Mobile-optimized
 * - WCAG 2.1 AA compliant
 */

import React, { useState } from 'react';
import { disasterRecoveryColors, spacing, borderRadius, boxShadows, fontFamilies, fontWeights } from '../../tokens';

export interface CalculatorStep {
  id: string;
  question: string;
  options: Array<{
    value: string;
    label: string;
    costMultiplier?: number;
  }>;
}

export interface DamageCostCalculatorProps {
  /** Calculator title */
  title?: string;
  /** Calculator description */
  description?: string;
  /** Steps for the calculator */
  steps?: CalculatorStep[];
  /** Callback when calculation is complete */
  onComplete?: (result: CalculatorResult) => void;
  /** Additional CSS class */
  className?: string;
}

export interface CalculatorResult {
  estimatedCost: {
    min: number;
    max: number;
  };
  urgency: 'immediate' | 'urgent' | 'standard';
  selectedOptions: Record<string, string>;
}

const DEFAULT_STEPS: CalculatorStep[] = [
  {
    id: 'damage-type',
    question: 'What type of damage occurred?',
    options: [
      { value: 'water', label: 'Water Damage', costMultiplier: 1.0 },
      { value: 'fire', label: 'Fire Damage', costMultiplier: 2.5 },
      { value: 'storm', label: 'Storm Damage', costMultiplier: 1.5 },
      { value: 'mold', label: 'Mold Remediation', costMultiplier: 1.8 },
    ],
  },
  {
    id: 'property-size',
    question: 'What is the affected area size?',
    options: [
      { value: 'small', label: 'Small (< 500 sq ft)', costMultiplier: 0.5 },
      { value: 'medium', label: 'Medium (500-1500 sq ft)', costMultiplier: 1.0 },
      { value: 'large', label: 'Large (1500-3000 sq ft)', costMultiplier: 2.0 },
      { value: 'extensive', label: 'Extensive (> 3000 sq ft)', costMultiplier: 3.5 },
    ],
  },
  {
    id: 'urgency',
    question: 'When do you need service?',
    options: [
      { value: 'immediate', label: 'Immediate (Emergency)', costMultiplier: 1.3 },
      { value: 'urgent', label: 'Within 24-48 hours', costMultiplier: 1.1 },
      { value: 'standard', label: 'Within a week', costMultiplier: 1.0 },
    ],
  },
];

const BASE_COST = 2000;

/**
 * DamageCostCalculator - Interactive cost estimation tool
 *
 * @example
 * ```tsx
 * <DamageCostCalculator
 *   title="Estimate Your Recovery Cost"
 *   description="Get an instant estimate in 3 quick steps"
 *   onComplete={(result) => {
 *     console.log('Estimated cost:', result.estimatedCost);
 *   }}
 * />
 * ```
 */
export const DamageCostCalculator: React.FC<DamageCostCalculatorProps> = ({
  title = 'Estimate Your Recovery Cost',
  description = 'Get an instant estimate in 3 quick steps',
  steps = DEFAULT_STEPS,
  onComplete,
  className = '',
}) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [selections, setSelections] = useState<Record<string, string>>({});
  const [showResults, setShowResults] = useState(false);

  const handleSelection = (stepId: string, value: string) => {
    const newSelections = { ...selections, [stepId]: value };
    setSelections(newSelections);

    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      calculateResults(newSelections);
    }
  };

  const calculateResults = (finalSelections: Record<string, string>) => {
    let multiplier = 1;

    steps.forEach((step) => {
      const selectedValue = finalSelections[step.id];
      const option = step.options.find((opt) => opt.value === selectedValue);
      if (option?.costMultiplier) {
        multiplier *= option.costMultiplier;
      }
    });

    const minCost = Math.round(BASE_COST * multiplier * 0.8);
    const maxCost = Math.round(BASE_COST * multiplier * 1.2);

    const urgencyValue = finalSelections['urgency'] || 'standard';
    const urgency = (urgencyValue === 'immediate' ? 'immediate' : urgencyValue === 'urgent' ? 'urgent' : 'standard') as CalculatorResult['urgency'];

    const result: CalculatorResult = {
      estimatedCost: { min: minCost, max: maxCost },
      urgency,
      selectedOptions: finalSelections,
    };

    setShowResults(true);
    onComplete?.(result);
  };

  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const reset = () => {
    setCurrentStep(0);
    setSelections({});
    setShowResults(false);
  };

  const containerStyles: React.CSSProperties = {
    backgroundColor: '#FFFFFF',
    border: `1px solid ${disasterRecoveryColors.neutral[200]}`,
    borderRadius: borderRadius.xl,
    boxShadow: boxShadows.lg,
    padding: spacing[8],
    maxWidth: '600px',
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
    width: `${((currentStep + 1) / steps.length) * 100}%`,
    transition: 'width 0.3s ease-in-out',
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

  const estimateStyles: React.CSSProperties = {
    fontFamily: fontFamilies.serif,
    fontSize: '3rem',
    fontWeight: fontWeights.bold,
    color: disasterRecoveryColors.education.primary,
    marginBottom: spacing[4],
  };

  const rangeStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '1rem',
    color: disasterRecoveryColors.authority.textSecondary,
    marginBottom: spacing[6],
  };

  const resetButtonStyles: React.CSSProperties = {
    padding: `${spacing[3]} ${spacing[6]}`,
    border: 'none',
    borderRadius: borderRadius.md,
    backgroundColor: disasterRecoveryColors.authority.primary,
    color: '#FFFFFF',
    fontFamily: fontFamilies.sans,
    fontSize: '1rem',
    fontWeight: fontWeights.semibold,
    cursor: 'pointer',
    margin: '0 auto',
    display: 'block',
  };

  const estimatedCost = showResults
    ? calculateEstimate(selections)
    : { min: 0, max: 0 };

  function calculateEstimate(finalSelections: Record<string, string>) {
    let multiplier = 1;
    steps.forEach((step) => {
      const selectedValue = finalSelections[step.id];
      const option = step.options.find((opt) => opt.value === selectedValue);
      if (option?.costMultiplier) {
        multiplier *= option.costMultiplier;
      }
    });
    return {
      min: Math.round(BASE_COST * multiplier * 0.8),
      max: Math.round(BASE_COST * multiplier * 1.2),
    };
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
          {/* Progress bar */}
          <div style={progressBarStyles}>
            <div style={progressFillStyles} />
          </div>

          {/* Current step */}
          <div>
            <h3 style={questionStyles}>{steps[currentStep].question}</h3>

            <div style={optionsContainerStyles}>
              {steps[currentStep].options.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelection(steps[currentStep].id, option.value)}
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
          {currentStep > 0 && (
            <div style={navigationStyles}>
              <button onClick={goBack} style={backButtonStyles}>
                Back
              </button>
            </div>
          )}
        </>
      ) : (
        /* Results */
        <div style={resultsStyles}>
          <div style={estimateStyles}>
            ${estimatedCost.min.toLocaleString()} - ${estimatedCost.max.toLocaleString()}
          </div>
          <p style={rangeStyles}>
            Estimated cost range for your recovery project
          </p>
          <p style={{ ...rangeStyles, marginBottom: spacing[8] }}>
            This is an estimate. Final costs depend on specific conditions and contractor rates.
          </p>
          <button onClick={reset} style={resetButtonStyles}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

DamageCostCalculator.displayName = 'DamageCostCalculator';
