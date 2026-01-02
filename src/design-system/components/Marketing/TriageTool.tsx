/**
 * TriageTool Component
 *
 * Emergency assessment decision tree for immediate guidance
 * Helps users determine urgency level and next steps
 *
 * Features:
 * - Binary decision tree flow
 * - Urgency level determination
 * - Emergency vs. standard routing
 * - Clear visual hierarchy
 * - WCAG 2.1 AA compliant
 */

import React, { useState } from 'react';
import { disasterRecoveryColors, spacing, borderRadius, boxShadows, fontFamilies, fontWeights } from '../../tokens';

export interface TriageNode {
  id: string;
  question: string;
  yesNext?: string | TriageResult;
  noNext?: string | TriageResult;
}

export interface TriageResult {
  urgency: 'emergency' | 'urgent' | 'standard';
  title: string;
  message: string;
  actions: string[];
}

export interface TriageToolProps {
  /** Initial question/node */
  initialNode?: TriageNode;
  /** All triage nodes */
  nodes?: Record<string, TriageNode>;
  /** Callback when triage is complete */
  onComplete?: (result: TriageResult) => void;
  /** Additional CSS class */
  className?: string;
}

const DEFAULT_NODES: Record<string, TriageNode> = {
  start: {
    id: 'start',
    question: 'Is there an immediate threat to life or safety?',
    yesNext: {
      urgency: 'emergency',
      title: 'Call Emergency Services NOW',
      message: 'This is a life-threatening emergency.',
      actions: [
        'Call 000 immediately',
        'Evacuate if safe to do so',
        'Do not attempt repairs yourself',
        'Wait for emergency services',
      ],
    },
    noNext: 'active-damage',
  },
  'active-damage': {
    id: 'active-damage',
    question: 'Is damage actively occurring right now (flooding, fire spreading, etc.)?',
    yesNext: {
      urgency: 'emergency',
      title: 'Emergency Response Required',
      message: 'Active damage requires immediate professional intervention.',
      actions: [
        'Call emergency disaster recovery: 1800-XXX-XXX',
        'Shut off utilities if safe (water, gas, electricity)',
        'Move valuables to safe location',
        'Document damage with photos',
        'Do not enter unsafe areas',
      ],
    },
    noNext: 'structural',
  },
  structural: {
    id: 'structural',
    question: 'Is there visible structural damage (ceiling collapse, wall cracks, foundation issues)?',
    yesNext: {
      urgency: 'urgent',
      title: 'Urgent Professional Assessment Needed',
      message: 'Structural damage requires professional evaluation within 24 hours.',
      actions: [
        'Contact certified structural engineer',
        'Do not occupy affected areas',
        'Call disaster recovery contractor: 1800-XXX-XXX',
        'Document all damage with photos',
        'Contact your insurance company',
      ],
    },
    noNext: 'water',
  },
  water: {
    id: 'water',
    question: 'Is there standing water or significant moisture?',
    yesNext: {
      urgency: 'urgent',
      title: 'Water Damage - Act Within 24-48 Hours',
      message: 'Water damage can lead to mold and structural issues if not addressed quickly.',
      actions: [
        'Call water damage specialist: 1800-XXX-XXX',
        'Remove standing water if safe',
        'Document damage with photos',
        'Contact insurance company',
        'Move belongings to dry area',
      ],
    },
    noNext: 'cosmetic',
  },
  cosmetic: {
    id: 'cosmetic',
    question: 'Is the damage purely cosmetic (paint, minor fixtures)?',
    yesNext: {
      urgency: 'standard',
      title: 'Standard Repair Timeline',
      message: 'This damage can be addressed on a standard timeline.',
      actions: [
        'Get quotes from 3 contractors',
        'Review your insurance coverage',
        'Schedule repairs at your convenience',
        'Document damage for records',
      ],
    },
    noNext: {
      urgency: 'urgent',
      title: 'Professional Inspection Recommended',
      message: 'Have a professional assess the damage to prevent future issues.',
      actions: [
        'Schedule professional inspection',
        'Get repair estimates',
        'Contact insurance if applicable',
        'Address within 1-2 weeks',
      ],
    },
  },
};

/**
 * TriageTool - Emergency assessment decision tree
 *
 * @example
 * ```tsx
 * <TriageTool
 *   onComplete={(result) => {
 *     console.log('Urgency level:', result.urgency);
 *     console.log('Recommended actions:', result.actions);
 *   }}
 * />
 * ```
 */
export const TriageTool: React.FC<TriageToolProps> = ({
  initialNode = DEFAULT_NODES.start,
  nodes = DEFAULT_NODES,
  onComplete,
  className = '',
}) => {
  const [currentNode, setCurrentNode] = useState<TriageNode | null>(initialNode);
  const [result, setResult] = useState<TriageResult | null>(null);
  const [history, setHistory] = useState<TriageNode[]>([]);

  const handleAnswer = (answer: 'yes' | 'no') => {
    if (!currentNode) return;

    const nextId = answer === 'yes' ? currentNode.yesNext : currentNode.noNext;

    if (!nextId) return;

    // Check if next is a result or another node
    if (typeof nextId === 'string') {
      const nextNode = nodes[nextId];
      if (nextNode) {
        setHistory([...history, currentNode]);
        setCurrentNode(nextNode);
      }
    } else {
      // It's a result
      setResult(nextId);
      setCurrentNode(null);
      onComplete?.(nextId);
    }
  };

  const goBack = () => {
    if (history.length > 0) {
      const previousNode = history[history.length - 1];
      setCurrentNode(previousNode);
      setHistory(history.slice(0, -1));
    }
  };

  const reset = () => {
    setCurrentNode(initialNode);
    setResult(null);
    setHistory([]);
  };

  const getUrgencyColor = (urgency: TriageResult['urgency']): string => {
    switch (urgency) {
      case 'emergency':
        return disasterRecoveryColors.emergency.primary;
      case 'urgent':
        return disasterRecoveryColors.warning;
      case 'standard':
        return disasterRecoveryColors.education.primary;
      default:
        return disasterRecoveryColors.neutral[500];
    }
  };

  const getUrgencyBackground = (urgency: TriageResult['urgency']): string => {
    switch (urgency) {
      case 'emergency':
        return disasterRecoveryColors.emergency.background;
      case 'urgent':
        return '#FEF3C7'; // Amber-100
      case 'standard':
        return disasterRecoveryColors.education.background;
      default:
        return disasterRecoveryColors.neutral[50];
    }
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

  const questionStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '1.5rem',
    fontWeight: fontWeights.semibold,
    color: disasterRecoveryColors.authority.text,
    marginBottom: spacing[8],
    textAlign: 'center',
    lineHeight: 1.4,
  };

  const buttonsContainerStyles: React.CSSProperties = {
    display: 'flex',
    gap: spacing[4],
    justifyContent: 'center',
    flexWrap: 'wrap',
  };

  const buttonStyles = (variant: 'yes' | 'no'): React.CSSProperties => ({
    padding: `${spacing[4]} ${spacing[8]}`,
    border: 'none',
    borderRadius: borderRadius.lg,
    backgroundColor: variant === 'yes' ? disasterRecoveryColors.emergency.primary : disasterRecoveryColors.neutral[700],
    color: '#FFFFFF',
    fontFamily: fontFamilies.sans,
    fontSize: '1.25rem',
    fontWeight: fontWeights.semibold,
    cursor: 'pointer',
    minWidth: '140px',
    transition: 'all 0.2s',
  });

  const backButtonStyles: React.CSSProperties = {
    padding: `${spacing[2]} ${spacing[4]}`,
    border: `1px solid ${disasterRecoveryColors.neutral[300]}`,
    borderRadius: borderRadius.md,
    backgroundColor: '#FFFFFF',
    color: disasterRecoveryColors.authority.text,
    fontFamily: fontFamilies.sans,
    fontSize: '0.875rem',
    fontWeight: fontWeights.medium,
    cursor: 'pointer',
    marginTop: spacing[6],
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
  };

  const resultsStyles: React.CSSProperties = {
    textAlign: 'center',
  };

  const resultTitleStyles = (urgency: TriageResult['urgency']): React.CSSProperties => ({
    fontFamily: fontFamilies.serif,
    fontSize: '2rem',
    fontWeight: fontWeights.bold,
    color: getUrgencyColor(urgency),
    marginBottom: spacing[4],
  });

  const resultMessageStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '1.125rem',
    color: disasterRecoveryColors.authority.text,
    marginBottom: spacing[8],
    lineHeight: 1.6,
  };

  const actionsHeaderStyles: React.CSSProperties = {
    fontFamily: fontFamilies.sans,
    fontSize: '1.25rem',
    fontWeight: fontWeights.semibold,
    color: disasterRecoveryColors.authority.text,
    marginBottom: spacing[4],
    textAlign: 'left',
  };

  const actionItemStyles = (urgency: TriageResult['urgency']): React.CSSProperties => ({
    fontFamily: fontFamilies.sans,
    fontSize: '1rem',
    color: disasterRecoveryColors.authority.text,
    padding: spacing[4],
    backgroundColor: getUrgencyBackground(urgency),
    border: `2px solid ${getUrgencyColor(urgency)}`,
    borderRadius: borderRadius.md,
    marginBottom: spacing[3],
    textAlign: 'left',
    fontWeight: fontWeights.medium,
  });

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
    marginTop: spacing[6],
  };

  return (
    <div className={className} style={containerStyles}>
      {!result ? (
        <>
          {/* Header */}
          {history.length === 0 && (
            <div style={headerStyles}>
              <h2 style={titleStyles}>Emergency Triage Assessment</h2>
              <p style={descriptionStyles}>
                Answer a few questions to determine the urgency of your situation
              </p>
            </div>
          )}

          {/* Current question */}
          {currentNode && (
            <>
              <h3 style={questionStyles}>{currentNode.question}</h3>

              <div style={buttonsContainerStyles}>
                <button
                  onClick={() => handleAnswer('yes')}
                  style={buttonStyles('yes')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  Yes
                </button>
                <button
                  onClick={() => handleAnswer('no')}
                  style={buttonStyles('no')}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'scale(1.05)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'scale(1)';
                  }}
                >
                  No
                </button>
              </div>

              {/* Back button */}
              {history.length > 0 && (
                <button onClick={goBack} style={backButtonStyles}>
                  ← Go Back
                </button>
              )}
            </>
          )}
        </>
      ) : (
        /* Results */
        <div style={resultsStyles}>
          <h2 style={resultTitleStyles(result.urgency)}>{result.title}</h2>
          <p style={resultMessageStyles}>{result.message}</p>

          <div>
            <h3 style={actionsHeaderStyles}>Recommended Actions:</h3>
            {result.actions.map((action, i) => (
              <div key={i} style={actionItemStyles(result.urgency)}>
                {i + 1}. {action}
              </div>
            ))}
          </div>

          <button onClick={reset} style={resetButtonStyles}>
            Start Over
          </button>
        </div>
      )}
    </div>
  );
};

TriageTool.displayName = 'TriageTool';
