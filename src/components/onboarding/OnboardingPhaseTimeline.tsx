'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import {
  FileText,
  BookOpen,
  Handshake,
  Timer,
  CheckCircle2,
  Circle,
  Lock,
  AlertCircle,
} from 'lucide-react';

interface ChecklistItem {
  key: string;
  label: string;
  complete: boolean;
}

interface PhaseData {
  status: 'NOT_STARTED' | 'IN_PROGRESS' | 'COMPLETED' | 'BLOCKED';
  startDate: string | null;
  completeDate: string | null;
  checklist?: ChecklistItem[];
  completedItems?: number;
  totalItems?: number;
  daysRemaining?: number | null;
  probationEndDate?: string | null;
  performanceReviewScore?: number | null;
  fullCertificationGranted?: boolean;
}

interface PhaseSummary {
  phase1: PhaseData;
  phase2: PhaseData;
  phase3: PhaseData;
  phase4: PhaseData;
  overall: {
    status: string;
    currentPhase: number;
    percentComplete: number;
  };
}

interface OnboardingPhaseTimelineProps {
  summary: PhaseSummary;
  onPhaseClick?: (phase: number) => void;
}

export function OnboardingPhaseTimeline({
  summary,
  onPhaseClick,
}: OnboardingPhaseTimelineProps) {
  const phases = [
    {
      number: 1,
      title: 'Application & Screening',
      description: 'Days 1-7',
      icon: FileText,
      data: summary.phase1,
      items: [
        { label: 'Submit application', key: 'applicationSubmitted' },
        { label: 'Eligibility review', key: 'eligibilityReviewed' },
        { label: 'Initiate background checks', key: 'backgroundCheckInitiated' },
      ],
    },
    {
      number: 2,
      title: 'Professional Development',
      description: 'Days 8-21',
      icon: BookOpen,
      data: summary.phase2,
      items: [
        { label: 'CARSI platform onboarding', key: 'carsiOnboarded' },
        { label: 'Association integration', key: 'associationIntegrated' },
        { label: 'Competency verification', key: 'competencyVerified' },
      ],
    },
    {
      number: 3,
      title: 'Commitment & Integration',
      description: 'Days 22-30',
      icon: Handshake,
      data: summary.phase3,
      items: [
        { label: 'Complete standards training', key: 'standardsTrainingComplete' },
        { label: 'Sign commitment framework', key: 'commitmentSigned' },
        { label: 'Platform activation', key: 'platformActivated' },
      ],
    },
    {
      number: 4,
      title: 'Probationary Period',
      description: '90 days supervision',
      icon: Timer,
      data: summary.phase4,
      items: [],
    },
  ];

  const getStatusColour = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'bg-emerald-500';
      case 'IN_PROGRESS':
        return 'bg-[#00BFA6]';
      case 'BLOCKED':
        return 'bg-red-500';
      default:
        return 'bg-gray-600';
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Complete</Badge>;
      case 'IN_PROGRESS':
        return <Badge className="bg-[#00BFA6]/10 text-[#00BFA6] border-[#00BFA6]/20">In Progress</Badge>;
      case 'BLOCKED':
        return <Badge className="bg-red-500/10 text-red-400 border-red-500/20">Blocked</Badge>;
      default:
        return <Badge className="bg-gray-700 text-gray-400 border-gray-600">Not Started</Badge>;
    }
  };

  return (
    <Card className="bg-gray-800 border-gray-700">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg text-white">Onboarding Progress</CardTitle>
          <div className="flex items-center gap-2">
            <span className="text-2xl font-bold text-[#00BFA6]">{summary.overall.percentComplete}%</span>
            <span className="text-sm text-gray-400">complete</span>
          </div>
        </div>
        {/* Overall progress bar */}
        <div className="mt-2 h-2 bg-gray-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#00BFA6] rounded-full transition-all duration-500"
            style={{ width: `${summary.overall.percentComplete}%` }}
          />
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {phases.map((phase, idx) => {
          const Icon = phase.icon;
          const isLocked = idx > 0 && phases[idx - 1].data.status !== 'COMPLETED';
          const isCurrent = summary.overall.currentPhase === phase.number;

          return (
            <div
              key={phase.number}
              className={`relative ${idx < phases.length - 1 ? 'pb-4' : ''}`}
            >
              {/* Connector line */}
              {idx < phases.length - 1 && (
                <div
                  className={`absolute left-5 top-10 w-0.5 h-full ${
                    phase.data.status === 'COMPLETED' ? 'bg-emerald-500' : 'bg-gray-700'
                  }`}
                />
              )}

              <div
                className={`flex gap-4 p-3 rounded-lg transition-colors ${
                  isCurrent ? 'bg-gray-700/50' : 'hover:bg-gray-700/30'
                } ${isLocked ? 'opacity-50' : 'cursor-pointer'}`}
                onClick={() => !isLocked && onPhaseClick?.(phase.number)}
              >
                {/* Phase indicator */}
                <div
                  className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getStatusColour(
                    phase.data.status
                  )}`}
                >
                  {phase.data.status === 'COMPLETED' ? (
                    <CheckCircle2 className="h-5 w-5 text-white" />
                  ) : isLocked ? (
                    <Lock className="h-4 w-4 text-gray-400" />
                  ) : (
                    <Icon className="h-5 w-5 text-white" />
                  )}
                </div>

                {/* Phase content */}
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-white">
                        Phase {phase.number}: {phase.title}
                      </span>
                      {isCurrent && (
                        <span className="text-xs text-[#00BFA6]">← Current</span>
                      )}
                    </div>
                    {getStatusBadge(phase.data.status)}
                  </div>
                  <p className="text-xs text-gray-500 mb-2">{phase.description}</p>

                  {/* Phase 4 special content */}
                  {phase.number === 4 && phase.data.status !== 'NOT_STARTED' && (
                    <div className="space-y-1 text-sm">
                      {phase.data.daysRemaining !== null && phase.data.daysRemaining > 0 && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <Timer className="h-4 w-4" />
                          <span>{phase.data.daysRemaining} days remaining</span>
                        </div>
                      )}
                      {phase.data.performanceReviewScore !== null && (
                        <div className="flex items-center gap-2 text-gray-400">
                          <span>Performance score: {phase.data.performanceReviewScore}%</span>
                        </div>
                      )}
                      {phase.data.fullCertificationGranted && (
                        <div className="flex items-center gap-2 text-emerald-400">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>Full certification granted!</span>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Checklist items (Phases 1-3) */}
                  {phase.items.length > 0 && phase.data.status !== 'NOT_STARTED' && (
                    <div className="flex flex-wrap gap-x-4 gap-y-1">
                      {phase.items.map((item) => {
                        const checklistItem = phase.data.checklist?.find(c => c.key === item.key);
                        const isComplete = checklistItem?.complete || false;

                        return (
                          <div
                            key={item.key}
                            className={`flex items-center gap-1 text-xs ${
                              isComplete ? 'text-emerald-400' : 'text-gray-500'
                            }`}
                          >
                            {isComplete ? (
                              <CheckCircle2 className="h-3 w-3" />
                            ) : (
                              <Circle className="h-3 w-3" />
                            )}
                            {item.label}
                          </div>
                        );
                      })}
                    </div>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </CardContent>
    </Card>
  );
}
