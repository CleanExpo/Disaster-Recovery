'use client';

import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import {
  Droplets,
  Users,
  Clock,
  BookOpen,
  CheckCircle2,
  PlayCircle,
  ArrowRight,
} from 'lucide-react';

interface CourseProgress {
  courseId: string;
  completedModules: number;
  totalModules: number;
  percentComplete: number;
  averageScore: number;
  totalTimeMinutes: number;
  currentModuleId: string | null;
  status: 'not_started' | 'in_progress' | 'completed';
}

interface CourseCardProps {
  courseId: 'CSE' | 'WRT';
  courseName: string;
  description: string;
  totalModules: number;
  totalHours: number;
  progress: CourseProgress;
}

export function CourseCard({
  courseId,
  courseName,
  description,
  totalModules,
  totalHours,
  progress,
}: CourseCardProps) {
  const isCSE = courseId === 'CSE';
  const Icon = isCSE ? Users : Droplets;
  const colour = isCSE ? '#8B5CF6' : '#3B82F6';

  const statusConfig = {
    not_started: {
      label: 'Not Started',
      badge: 'bg-gray-700 text-gray-400 border-gray-600',
      action: 'Start Course',
      actionVariant: 'default' as const,
    },
    in_progress: {
      label: 'In Progress',
      badge: 'bg-[#00BFA6]/10 text-[#00BFA6] border-[#00BFA6]/20',
      action: 'Continue',
      actionVariant: 'default' as const,
    },
    completed: {
      label: 'Completed',
      badge: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
      action: 'Review',
      actionVariant: 'outline' as const,
    },
  };

  const config = statusConfig[progress.status];
  const href = progress.currentModuleId
    ? `/dashboard/contractor/onboarding/module/${progress.currentModuleId}`
    : `/dashboard/contractor/onboarding/training/${courseId}`;

  return (
    <Card className="bg-gray-800 border-gray-700 hover:border-gray-600 transition-all group">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          {/* Course icon */}
          <div
            className="p-3 rounded-xl"
            style={{ backgroundColor: `${colour}20` }}
          >
            <Icon className="h-6 w-6" style={{ color: colour }} />
          </div>

          <div className="flex-1 min-w-0">
            {/* Header */}
            <div className="flex items-start justify-between mb-2">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="text-lg font-semibold text-white">{courseName}</h3>
                  <Badge className={config.badge}>{config.label}</Badge>
                </div>
                <p className="text-sm text-gray-400 mt-1">{description}</p>
              </div>
            </div>

            {/* Stats row */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-4">
              <div className="flex items-center gap-1">
                <BookOpen className="h-4 w-4" />
                <span>{totalModules} modules</span>
              </div>
              <div className="flex items-center gap-1">
                <Clock className="h-4 w-4" />
                <span>{totalHours} hours</span>
              </div>
              {progress.averageScore > 0 && (
                <div className="flex items-center gap-1">
                  <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                  <span className="text-emerald-400">{progress.averageScore}% avg</span>
                </div>
              )}
            </div>

            {/* Progress section */}
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-400">
                  {progress.completedModules} of {progress.totalModules} modules
                </span>
                <span className="text-white font-medium">{progress.percentComplete}%</span>
              </div>
              <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-500"
                  style={{
                    width: `${progress.percentComplete}%`,
                    backgroundColor: progress.status === 'completed' ? '#10B981' : colour,
                  }}
                />
              </div>
            </div>

            {/* Action */}
            <div className="mt-4 flex items-center justify-between">
              <div className="text-xs text-gray-500">
                {progress.totalTimeMinutes > 0 && (
                  <span>{Math.round(progress.totalTimeMinutes / 60)} hrs spent</span>
                )}
              </div>
              <Link href={href}>
                <Button
                  variant={config.actionVariant}
                  size="sm"
                  className={config.actionVariant === 'default' ? 'bg-[#00BFA6] hover:bg-[#00A693] text-white' : ''}
                >
                  {progress.status === 'not_started' ? (
                    <PlayCircle className="h-4 w-4 mr-2" />
                  ) : (
                    <ArrowRight className="h-4 w-4 mr-2" />
                  )}
                  {config.action}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
