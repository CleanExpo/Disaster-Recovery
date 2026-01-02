/**
 * DesignOS Decision Tree Component
 *
 * Interactive "Who First?" decision tree with parallel layout
 * Strategic decision: Quick 3-4 questions → Deep-dive articles
 * Parallel layout: Actions (left) + Diagnostic questions (right)
 *
 * Example flow:
 * 1. What happened? (Water, Fire, Mold, etc.)
 * 2. Parallel: DO THIS NOW + TELL US MORE
 * 3. Route to comprehensive article
 */

'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';
import { Button } from '../Button/Button';
import { CheckCircle, AlertTriangle, Droplets, Flame, Wind, Biohazard } from 'lucide-react';

export type DisasterType = 'water' | 'fire' | 'smoke' | 'mold' | 'sewage' | 'storm' | 'structural';

export interface DecisionTreeQuestion {
  id: string;
  text: string;
  options: {
    value: string;
    label: string;
    icon?: React.ReactNode;
  }[];
}

export interface ImmediateAction {
  id: string;
  text: string;
  checked?: boolean;
}

export interface DecisionTreeProps {
  onComplete: (answers: Record<string, string>) => void;
  className?: string;
}

const disasterTypeIcons = {
  water: Droplets,
  fire: Flame,
  smoke: Wind,
  mold: Biohazard,
  sewage: AlertTriangle,
  storm: Wind,
};

export function DecisionTree({ onComplete, className }: DecisionTreeProps) {
  const [currentStep, setCurrentStep] = React.useState(0);
  const [answers, setAnswers] = React.useState<Record<string, string>>({});
  const [immediateActions, setImmediateActions] = React.useState<Record<string, boolean>>({});

  // Step 1: Disaster type selection
  const disasterTypes = [
    { value: 'water', label: 'Water/Flood', icon: '💧' },
    { value: 'fire', label: 'Fire/Smoke', icon: '🔥' },
    { value: 'mold', label: 'Mould', icon: '🍄' },
    { value: 'sewage', label: 'Sewage/Bio', icon: '☣️' },
    { value: 'storm', label: 'Storm', icon: '🌪️' },
    { value: 'structural', label: 'Structural', icon: '🏚️' },
  ];

  // Step 2: Parallel layout (actions + diagnostic)
  const safetyActions = [
    { id: 'power', text: 'Turn off power (if safe)' },
    { id: 'evacuate', text: 'Evacuate if >knee deep water' },
    { id: 'emergency', text: 'Call 000 if unsafe' },
  ];

  const documentActions = [
    { id: 'photos', text: 'Take photos now' },
    { id: 'time', text: 'Note time discovered' },
  ];

  const diagnosticQuestions = [
    {
      id: 'depth',
      label: 'Water Depth',
      options: [
        { value: 'ankle', label: 'Ankle-deep' },
        { value: 'knee', label: 'Knee-deep' },
        { value: 'waist', label: 'Waist-deep+' },
      ],
    },
    {
      id: 'source',
      label: 'Source',
      options: [
        { value: 'pipe', label: 'Burst pipe' },
        { value: 'roof', label: 'Roof leak' },
        { value: 'flood', label: 'Flood water' },
        { value: 'unknown', label: 'Unknown' },
      ],
    },
    {
      id: 'duration',
      label: 'Duration',
      options: [
        { value: '<1h', label: '<1 hour' },
        { value: '1-6h', label: '1-6 hours' },
        { value: '6-24h', label: '6-24 hours' },
        { value: '24h+', label: '24+ hours' },
      ],
    },
  ];

  const handleDisasterTypeSelect = (type: string) => {
    setAnswers({ ...answers, disasterType: type });
    setCurrentStep(1);
  };

  const handleDiagnosticAnswer = (questionId: string, value: string) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleActionToggle = (actionId: string) => {
    setImmediateActions({ ...immediateActions, [actionId]: !immediateActions[actionId] });
  };

  const handleContinue = () => {
    onComplete({ ...answers, actions: JSON.stringify(immediateActions) });
  };

  return (
    <div className={cn('max-w-6xl mx-auto', className)}>
      {/* Step 1: Disaster Type Selection */}
      {currentStep === 0 && (
        <div className="space-y-6">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-serif font-bold mb-2">What happened to your property?</h2>
            <p className="text-muted-foreground">Select the type of damage you're experiencing</p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {disasterTypes.map((type) => (
              <button
                key={type.value}
                onClick={() => handleDisasterTypeSelect(type.value)}
                className={cn(
                  'p-6 rounded-lg border-2 transition-all hover:border-dr-education hover:bg-dr-education-bg',
                  'flex flex-col items-center justify-center gap-3 min-h-[120px]',
                  answers.disasterType === type.value && 'border-dr-education bg-dr-education-bg'
                )}
              >
                <span className="text-4xl">{type.icon}</span>
                <span className="font-semibold">{type.label}</span>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Parallel Layout (Actions + Diagnostic) */}
      {currentStep === 1 && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <h2 className="text-2xl font-serif font-bold">
              {disasterTypes.find((t) => t.value === answers.disasterType)?.label} Damage
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* LEFT: Do This Now (Actions) */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                DO THIS NOW:
              </h3>

              {/* Safety First */}
              <div className="bg-red-50 border-l-4 border-red-600 p-4 rounded">
                <h4 className="font-semibold text-red-900 mb-2">⚠️ SAFETY FIRST</h4>
                <div className="space-y-2">
                  {safetyActions.map((action) => (
                    <label key={action.id} className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={immediateActions[action.id] || false}
                        onChange={() => handleActionToggle(action.id)}
                        className="mt-1"
                      />
                      <span className="text-sm text-red-900">{action.text}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Document */}
              <div className="bg-blue-50 border-l-4 border-blue-600 p-4 rounded">
                <h4 className="font-semibold text-blue-900 mb-2">📸 DOCUMENT:</h4>
                <div className="space-y-2">
                  {documentActions.map((action) => (
                    <label key={action.id} className="flex items-start gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={immediateActions[action.id] || false}
                        onChange={() => handleActionToggle(action.id)}
                        className="mt-1"
                      />
                      <span className="text-sm text-blue-900">{action.text}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Next Step */}
              <div className="bg-green-50 border-l-4 border-green-600 p-4 rounded">
                <h4 className="font-semibold text-green-900 mb-2">☎️ NEXT STEP:</h4>
                <p className="text-sm text-green-900 mb-2">Call NRPG immediately</p>
                <Button
                  variant="emergency-primary"
                  size="crisis"
                  className="w-full"
                  onClick={() => window.location.href = 'tel:1300309361'}
                >
                  Call 1300 309 361
                </Button>
              </div>
            </div>

            {/* RIGHT: Tell Us More (Diagnostic) */}
            <div className="space-y-4">
              <h3 className="text-xl font-semibold">TELL US MORE:</h3>

              {diagnosticQuestions.map((question) => (
                <div key={question.id} className="space-y-2">
                  <label className="text-sm font-medium">{question.label}:</label>
                  <div className="space-y-2">
                    {question.options.map((option) => (
                      <label
                        key={option.value}
                        className={cn(
                          'flex items-center gap-3 p-3 rounded-lg border-2 cursor-pointer transition-all',
                          answers[question.id] === option.value
                            ? 'border-dr-education bg-dr-education-bg'
                            : 'border-gray-200 hover:border-dr-education-border'
                        )}
                      >
                        <input
                          type="radio"
                          name={question.id}
                          value={option.value}
                          checked={answers[question.id] === option.value}
                          onChange={(e) => handleDiagnosticAnswer(question.id, e.target.value)}
                          className="text-dr-education focus:ring-dr-education"
                        />
                        <span className="text-sm">{option.label}</span>
                      </label>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Continue Button */}
          <div className="flex justify-center mt-8">
            <Button
              variant="education-primary"
              size="xl"
              onClick={handleContinue}
              disabled={!answers.depth || !answers.source || !answers.duration}
            >
              Continue to Full Guidance →
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

/**
 * Example usage:
 *
 * <DecisionTree
 *   onComplete={(answers) => {
 *     // Route to article based on answers
 *     const slug = generateArticleSlug(answers);
 *     router.push(`/education/emergency-response/${slug}`);
 *   }}
 * />
 */
