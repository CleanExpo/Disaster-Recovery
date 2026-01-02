'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Loader2, ArrowLeft, BookOpen, CheckCircle2, Circle, PlayCircle, Award } from 'lucide-react';

interface EducationModule {
  id: string;
  title: string;
  description: string;
  duration: string;
  required: boolean;
  order: number;
  category: string;
  status: string;
  progress: number;
  completed: boolean;
  quizScore?: number;
}

export default function ClientEducationPage() {
  const router = useRouter();
  const { data: session, status } = useSession();
  const [loading, setLoading] = useState(true);
  const [modules, setModules] = useState<EducationModule[]>([]);
  const [completedCount, setCompletedCount] = useState(0);

  useEffect(() => {
    if (status === 'authenticated') {
      fetchModules();
    }
  }, [status]);

  const fetchModules = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/client/onboarding/education/modules', { cache: 'no-store' });
      const data = await response.json();

      if (data.success) {
        setModules(data.modules || []);
        setCompletedCount(data.completedModules || 0);
      }
    } catch (error) {
      console.error('Failed to fetch modules:', error);
    } finally {
      setLoading(false);
    }
  };

  if (status === 'loading' || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  if (status === 'unauthenticated') {
    router.push('/');
    return null;
  }

  const totalModules = modules.length;
  const completionPercentage = totalModules > 0 ? (completedCount / totalModules) * 100 : 0;
  const allComplete = completedCount === totalModules && totalModules > 0;

  return (
    <div className="container mx-auto py-8 max-w-5xl space-y-6">
      <Button variant="outline" onClick={() => router.back()}>
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back
      </Button>

      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Disaster Recovery Education</h1>
          <p className="text-muted-foreground mt-1">
            Learn about disaster recovery, insurance claims, and property protection
          </p>
        </div>
        {allComplete && (
          <Badge className="bg-green-600">
            <Award className="h-4 w-4 mr-1" />
            All Modules Complete
          </Badge>
        )}
      </div>

      {/* Progress Card */}
      <Card>
        <CardHeader>
          <CardTitle>Your Progress</CardTitle>
          <CardDescription>
            {completedCount} of {totalModules} modules completed
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="font-medium">Overall Completion</span>
              <span className="text-muted-foreground">{Math.round(completionPercentage)}%</span>
            </div>
            <Progress value={completionPercentage} className="h-2" />
          </div>

          {allComplete && (
            <div className="bg-green-50 dark:bg-green-950/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <p className="text-sm text-green-800 dark:text-green-200 text-center">
                🎉 Congratulations! You've completed all education modules. You're now a Prepared Client!
              </p>
              <div className="flex justify-center mt-3">
                <Button asChild className="bg-green-600 hover:bg-green-700">
                  <Link href="/dashboard/client/onboarding/complete">
                    <Award className="h-4 w-4 mr-2" />
                    Finish Onboarding
                  </Link>
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>

      {/* Module List */}
      <div className="space-y-4">
        {modules.map((module) => (
          <Card key={module.id} className={module.completed ? 'border-green-500' : ''}>
            <CardContent className="pt-6">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-start gap-4 flex-1">
                  {/* Icon */}
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                    {module.completed ? (
                      <CheckCircle2 className="h-6 w-6 text-green-600" />
                    ) : module.status === 'IN_PROGRESS' ? (
                      <BookOpen className="h-6 w-6 text-blue-600" />
                    ) : (
                      <Circle className="h-6 w-6 text-muted-foreground" />
                    )}
                  </div>

                  {/* Content */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-semibold">{module.title}</h3>
                      <Badge variant={module.completed ? 'default' : 'secondary'} className={module.completed ? 'bg-green-600' : ''}>
                        {module.completed ? 'Complete' : module.status === 'IN_PROGRESS' ? 'In Progress' : 'Not Started'}
                      </Badge>
                      {module.required && !module.completed && (
                        <Badge variant="outline" className="text-xs">Required</Badge>
                      )}
                    </div>
                    <p className="text-sm text-muted-foreground mb-2">{module.description}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span>⏱️ {module.duration}</span>
                      <span>📚 {module.category.replace('-', ' ')}</span>
                      {module.quizScore !== undefined && (
                        <span className={module.quizScore >= 70 ? 'text-green-600 font-semibold' : 'text-amber-600'}>
                          Quiz: {module.quizScore}%
                        </span>
                      )}
                    </div>

                    {/* Progress bar for in-progress modules */}
                    {module.status === 'IN_PROGRESS' && !module.completed && (
                      <div className="mt-3">
                        <Progress value={module.progress} className="h-1.5" />
                      </div>
                    )}
                  </div>
                </div>

                {/* Action Button */}
                <Button
                  asChild
                  variant={module.completed ? 'outline' : 'default'}
                  className="flex-shrink-0"
                >
                  <Link href={`/dashboard/client/onboarding/education/module/${module.id}`}>
                    {module.completed ? (
                      'Review Module'
                    ) : module.status === 'IN_PROGRESS' ? (
                      'Continue'
                    ) : (
                      <>
                        <PlayCircle className="h-4 w-4 mr-2" />
                        Start Module
                      </>
                    )}
                  </Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Bottom CTA */}
      {allComplete && (
        <Card className="border-green-500 bg-gradient-to-br from-green-50 to-emerald-50 dark:from-green-950/20 dark:to-emerald-950/20">
          <CardContent className="pt-6">
            <div className="text-center">
              <Award className="h-16 w-16 text-green-600 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-green-900 dark:text-green-100 mb-2">
                Education Complete!
              </h2>
              <p className="text-green-700 dark:text-green-300 mb-4">
                You've completed all 7 disaster recovery education modules. Claim your certificate now!
              </p>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700">
                <Link href="/dashboard/client/onboarding/complete">
                  <Award className="h-4 w-4 mr-2" />
                  Get Your Certificate
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
