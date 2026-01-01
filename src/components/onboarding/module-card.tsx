'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import Link from 'next/link';
import { PlayCircle, CheckCircle2, Clock, FileText, Lock, AlertCircle } from 'lucide-react';

interface ModuleCardProps {
  module: {
    moduleId: string;
    courseName?: string;
    status: string;
    progress: number;
    startedAt?: string;
    completedAt?: string;
  };
  onStartQuiz: (moduleId: string) => void;
  highlighted?: boolean;
  isLocked?: boolean;
  prerequisiteModules?: string[];
  incompletePrerequisites?: string[];
}

export function ModuleCard({
  module,
  onStartQuiz,
  highlighted = false,
  isLocked = false,
  prerequisiteModules = [],
  incompletePrerequisites = [],
}: ModuleCardProps) {
  const isNrpgModule = /^NRP-\d{3}$/i.test(module.moduleId);
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600';
      case 'IN_PROGRESS':
        return 'text-blue-600';
      case 'FAILED':
        return 'text-red-600';
      case 'NOT_STARTED':
        return 'text-gray-400';
      default:
        return 'text-gray-400';
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <CheckCircle2 className="h-5 w-5 text-green-600" />;
      case 'IN_PROGRESS':
        return <Clock className="h-5 w-5 text-blue-600" />;
      case 'FAILED':
        return <FileText className="h-5 w-5 text-red-600" />;
      case 'NOT_STARTED':
        return <PlayCircle className="h-5 w-5 text-gray-400" />;
      default:
        return <FileText className="h-5 w-5 text-gray-400" />;
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return <Badge variant="default" className="bg-green-600">Completed</Badge>;
      case 'IN_PROGRESS':
        return <Badge variant="default">In Progress</Badge>;
      case 'FAILED':
        return <Badge variant="destructive">Needs Review</Badge>;
      case 'NOT_STARTED':
        return <Badge variant="secondary">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className={highlighted ? 'border-2 border-primary shadow-lg' : isLocked ? 'opacity-60 border-muted' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {isLocked ? (
              <Lock className="h-5 w-5 text-muted-foreground" />
            ) : (
              getStatusIcon(module.status)
            )}
            <div>
              <CardTitle className="text-lg flex items-center gap-2">
                {module.courseName || module.moduleId}
                {isLocked && <Badge variant="secondary" className="text-xs">Locked</Badge>}
              </CardTitle>
              <CardDescription className="mt-1">
                {module.moduleId}
              </CardDescription>
            </div>
          </div>
          {!isLocked && getStatusBadge(module.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Locked Module Alert */}
        {isLocked && (
          <Alert className="border-amber-500 bg-amber-50 dark:bg-amber-950/20">
            <Lock className="h-4 w-4 text-amber-600" />
            <AlertDescription className="text-sm">
              <p className="font-semibold text-amber-900 dark:text-amber-100 mb-2">
                This module is locked
              </p>
              {incompletePrerequisites.length > 0 ? (
                <>
                  <p className="text-amber-800 dark:text-amber-200 mb-2">
                    Complete these required modules first:
                  </p>
                  <ul className="list-disc list-inside space-y-1 text-amber-700 dark:text-amber-300">
                    {incompletePrerequisites.map((prereq) => (
                      <li key={prereq}>{prereq}</li>
                    ))}
                  </ul>
                </>
              ) : prerequisiteModules.length > 0 ? (
                <p className="text-amber-800 dark:text-amber-200">
                  Prerequisites: {prerequisiteModules.join(', ')}
                </p>
              ) : (
                <p className="text-amber-800 dark:text-amber-200">
                  Complete earlier modules to unlock this training
                </p>
              )}
            </AlertDescription>
          </Alert>
        )}
        {/* Progress Bar */}
        {module.status !== 'NOT_STARTED' && (
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-muted-foreground">Progress</span>
              <span className={`font-medium ${getStatusColor(module.status)}`}>
                {module.progress}%
              </span>
            </div>
            <Progress value={module.progress} className="h-2" />
          </div>
        )}

        {/* Timestamps */}
        <div className="flex flex-wrap gap-4 text-sm text-muted-foreground">
          {module.startedAt && (
            <div className="flex items-center gap-1">
              <Clock className="h-4 w-4" />
              Started: {new Date(module.startedAt).toLocaleDateString()}
            </div>
          )}
          {module.completedAt && (
            <div className="flex items-center gap-1">
              <CheckCircle2 className="h-4 w-4" />
              Completed: {new Date(module.completedAt).toLocaleDateString()}
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2">
          {module.status === 'NOT_STARTED' && (
            <Button
              onClick={() => onStartQuiz(module.moduleId)}
              className="w-full"
              variant="default"
              disabled={isLocked}
            >
              {isLocked ? (
                <>
                  <Lock className="h-4 w-4 mr-2" />
                  Module Locked
                </>
              ) : (
                <>
                  <PlayCircle className="h-4 w-4 mr-2" />
                  Start Module
                </>
              )}
            </Button>
          )}

          {module.status === 'IN_PROGRESS' && (
            <>
              <Button
                onClick={() => onStartQuiz(module.moduleId)}
                className="flex-1"
                variant="default"
                disabled={isLocked}
              >
                Continue Learning
              </Button>
              {isNrpgModule ? (
                <Button asChild variant="outline" className="flex-1" disabled={isLocked}>
                  <Link href={`/dashboard/contractor/onboarding/module/${module.moduleId}`}>Review Materials</Link>
                </Button>
              ) : (
                <Button variant="outline" className="flex-1" disabled>
                  Review Materials
                </Button>
              )}
            </>
          )}

          {module.status === 'FAILED' && (
            <>
              <Button
                onClick={() => onStartQuiz(module.moduleId)}
                className="flex-1"
                variant="default"
              >
                Retake Assessment
              </Button>
              {isNrpgModule ? (
                <Button asChild variant="outline" className="flex-1">
                  <Link href={`/dashboard/contractor/onboarding/module/${module.moduleId}`}>Review Materials</Link>
                </Button>
              ) : (
                <Button variant="outline" className="flex-1" disabled>
                  Review Materials
                </Button>
              )}
            </>
          )}

          {module.status === 'COMPLETED' && (
            <>
              <Button
                onClick={() => onStartQuiz(module.moduleId)}
                className="flex-1"
                variant="outline"
              >
                Retake Assessment
              </Button>
              {isNrpgModule ? (
                <Button asChild variant="outline" className="flex-1">
                  <Link href={`/dashboard/contractor/onboarding/module/${module.moduleId}`}>View Materials</Link>
                </Button>
              ) : (
                <Button variant="outline" className="flex-1" disabled>
                  View Certificate
                </Button>
              )}
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
