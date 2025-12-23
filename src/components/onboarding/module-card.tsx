'use client';

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { PlayCircle, CheckCircle2, Clock, FileText } from 'lucide-react';

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
}

export function ModuleCard({ module, onStartQuiz, highlighted = false }: ModuleCardProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'COMPLETED':
        return 'text-green-600';
      case 'IN_PROGRESS':
        return 'text-blue-600';
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
      case 'NOT_STARTED':
        return <Badge variant="secondary">Not Started</Badge>;
      default:
        return <Badge variant="outline">{status}</Badge>;
    }
  };

  return (
    <Card className={highlighted ? 'border-2 border-primary shadow-lg' : ''}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            {getStatusIcon(module.status)}
            <div>
              <CardTitle className="text-lg">
                {module.courseName || module.moduleId}
              </CardTitle>
              <CardDescription className="mt-1">
                {module.moduleId}
              </CardDescription>
            </div>
          </div>
          {getStatusBadge(module.status)}
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
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
            >
              <PlayCircle className="h-4 w-4 mr-2" />
              Start Module
            </Button>
          )}

          {module.status === 'IN_PROGRESS' && (
            <>
              <Button
                onClick={() => onStartQuiz(module.moduleId)}
                className="flex-1"
                variant="default"
              >
                Continue Learning
              </Button>
              <Button variant="outline" className="flex-1">
                Review Materials
              </Button>
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
              <Button variant="outline" className="flex-1">
                View Certificate
              </Button>
            </>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
