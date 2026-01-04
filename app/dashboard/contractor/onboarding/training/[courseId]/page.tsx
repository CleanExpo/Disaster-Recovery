'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import {
  Loader2,
  ArrowLeft,
  Clock,
  BookOpen,
  CheckCircle2,
  Circle,
  PlayCircle,
  Lock,
  FileText,
  Award,
  Users,
  Droplets,
} from 'lucide-react';

interface ModuleInfo {
  moduleId: string;
  title: string;
  description: string;
  order: number;
  estimatedMinutes: number;
  status: 'locked' | 'available' | 'in_progress' | 'completed';
  score: number | null;
  completedAt: string | null;
}

interface CourseDetail {
  courseId: 'CSE' | 'WRT';
  courseName: string;
  description: string;
  totalModules: number;
  totalHours: number;
  modules: ModuleInfo[];
  progress: {
    completedModules: number;
    percentComplete: number;
    averageScore: number;
    totalTimeMinutes: number;
    status: 'not_started' | 'in_progress' | 'completed';
  };
}

export default function CourseDetailPage() {
  const { courseId } = useParams<{ courseId: string }>();
  const { data: session, status: authStatus } = useSession();
  const [loading, setLoading] = useState(true);
  const [course, setCourse] = useState<CourseDetail | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchCourse = useCallback(async () => {
    if (!courseId) return;

    setLoading(true);
    setError(null);

    try {
      const res = await fetch(`/api/onboarding/courses/${courseId}`);
      const data = await res.json();

      if (data.success) {
        setCourse(data.data);
      } else {
        setError(data.error || 'Failed to load course');
      }
    } catch (err) {
      console.error('Error fetching course:', err);
      setError('Failed to load course details');
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      fetchCourse();
    }
  }, [authStatus, fetchCourse]);

  const isCSE = courseId === 'CSE';
  const Icon = isCSE ? Users : Droplets;
  const colour = isCSE ? '#8B5CF6' : '#3B82F6';

  if (authStatus === 'loading' || loading) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="py-12 flex items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-[#00BFA6]" />
          </CardContent>
        </Card>
      </div>
    );
  }

  if (authStatus === 'unauthenticated') {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="py-12 text-center">
            <p className="text-gray-400 mb-4">Please sign in to view this course</p>
            <Button className="bg-[#00BFA6] hover:bg-[#00A693]">Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (error || !course) {
    return (
      <div className="container mx-auto py-8 max-w-4xl">
        <Link
          href="/dashboard/contractor/onboarding/training"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Training
        </Link>
        <Card className="bg-red-500/10 border-red-500/20">
          <CardContent className="py-8 text-center">
            <p className="text-red-400">{error || 'Course not found'}</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const getModuleStatusIcon = (status: ModuleInfo['status']) => {
    switch (status) {
      case 'completed':
        return <CheckCircle2 className="h-5 w-5 text-emerald-400" />;
      case 'in_progress':
        return <PlayCircle className="h-5 w-5 text-[#00BFA6]" />;
      case 'locked':
        return <Lock className="h-5 w-5 text-gray-600" />;
      default:
        return <Circle className="h-5 w-5 text-gray-500" />;
    }
  };

  const getModuleStatusBadge = (status: ModuleInfo['status']) => {
    switch (status) {
      case 'completed':
        return <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">Complete</Badge>;
      case 'in_progress':
        return <Badge className="bg-[#00BFA6]/10 text-[#00BFA6] border-[#00BFA6]/20">In Progress</Badge>;
      case 'locked':
        return <Badge className="bg-gray-700 text-gray-500 border-gray-600">Locked</Badge>;
      default:
        return <Badge className="bg-gray-700 text-gray-400 border-gray-600">Available</Badge>;
    }
  };

  return (
    <div className="container mx-auto py-8 max-w-4xl">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/contractor/onboarding/training"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to Training
        </Link>
      </div>

      {/* Course Header Card */}
      <Card className="bg-gray-800 border-gray-700 mb-6">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div
              className="p-4 rounded-xl flex-shrink-0"
              style={{ backgroundColor: `${colour}20` }}
            >
              <Icon className="h-8 w-8" style={{ color: colour }} />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-white">{course.courseName}</h1>
                  <p className="text-gray-400 mt-1">{course.description}</p>
                </div>
                {course.progress.status === 'completed' && (
                  <Badge className="bg-emerald-500/10 text-emerald-400 border-emerald-500/20">
                    <Award className="h-3 w-3 mr-1" />
                    Certified
                  </Badge>
                )}
              </div>

              {/* Stats */}
              <div className="flex items-center gap-6 mt-4 text-sm text-gray-400">
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4" />
                  <span>{course.totalModules} modules</span>
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4" />
                  <span>{course.totalHours} hours</span>
                </div>
                {course.progress.averageScore > 0 && (
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="h-4 w-4 text-emerald-500" />
                    <span className="text-emerald-400">{course.progress.averageScore}% avg score</span>
                  </div>
                )}
              </div>

              {/* Progress Bar */}
              <div className="mt-4">
                <div className="flex items-center justify-between text-sm mb-2">
                  <span className="text-gray-400">
                    {course.progress.completedModules} of {course.totalModules} modules complete
                  </span>
                  <span className="text-white font-medium">{course.progress.percentComplete}%</span>
                </div>
                <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
                  <div
                    className="h-full rounded-full transition-all duration-500"
                    style={{
                      width: `${course.progress.percentComplete}%`,
                      backgroundColor: course.progress.status === 'completed' ? '#10B981' : colour,
                    }}
                  />
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Modules List */}
      <Card className="bg-gray-800 border-gray-700">
        <CardHeader>
          <CardTitle className="text-lg text-white">Course Modules</CardTitle>
          <CardDescription className="text-gray-400">
            Complete each module in sequence to progress through the course
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          {course.modules.map((module, idx) => (
            <div
              key={module.moduleId}
              className={`relative ${idx < course.modules.length - 1 ? 'pb-2' : ''}`}
            >
              {/* Connector line */}
              {idx < course.modules.length - 1 && (
                <div
                  className={`absolute left-5 top-12 w-0.5 h-8 ${
                    module.status === 'completed' ? 'bg-emerald-500' : 'bg-gray-700'
                  }`}
                />
              )}

              <Link
                href={
                  module.status === 'locked'
                    ? '#'
                    : `/dashboard/contractor/onboarding/module/${module.moduleId}`
                }
                className={module.status === 'locked' ? 'pointer-events-none' : ''}
              >
                <div
                  className={`flex items-center gap-4 p-4 rounded-lg transition-colors ${
                    module.status === 'locked'
                      ? 'bg-gray-800/50 opacity-60'
                      : 'bg-gray-700/30 hover:bg-gray-700/50 cursor-pointer'
                  }`}
                >
                  {/* Module number/icon */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      module.status === 'completed'
                        ? 'bg-emerald-500'
                        : module.status === 'in_progress'
                        ? 'bg-[#00BFA6]'
                        : 'bg-gray-700'
                    }`}
                  >
                    {module.status === 'completed' ? (
                      <CheckCircle2 className="h-5 w-5 text-white" />
                    ) : module.status === 'locked' ? (
                      <Lock className="h-4 w-4 text-gray-500" />
                    ) : (
                      <span className="text-white font-medium">{module.order}</span>
                    )}
                  </div>

                  {/* Module content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-medium text-white truncate">
                        {module.title}
                      </h3>
                      {getModuleStatusBadge(module.status)}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5 truncate">{module.description}</p>
                    <div className="flex items-center gap-4 mt-2 text-xs text-gray-500">
                      <div className="flex items-center gap-1">
                        <Clock className="h-3 w-3" />
                        <span>{module.estimatedMinutes} min</span>
                      </div>
                      {module.score !== null && (
                        <div className="flex items-center gap-1">
                          <FileText className="h-3 w-3" />
                          <span className="text-emerald-400">Score: {module.score}%</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Action */}
                  {module.status !== 'locked' && (
                    <Button
                      variant={module.status === 'completed' ? 'outline' : 'default'}
                      size="sm"
                      className={
                        module.status === 'completed'
                          ? 'border-gray-600'
                          : 'bg-[#00BFA6] hover:bg-[#00A693]'
                      }
                    >
                      {module.status === 'completed' ? 'Review' : module.status === 'in_progress' ? 'Continue' : 'Start'}
                    </Button>
                  )}
                </div>
              </Link>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Course completion CTA */}
      {course.progress.status === 'completed' && (
        <Card className="bg-emerald-500/10 border-emerald-500/20 mt-6">
          <CardContent className="py-6 text-center">
            <Award className="h-12 w-12 text-emerald-400 mx-auto mb-3" />
            <h3 className="text-lg font-semibold text-white mb-1">Course Completed!</h3>
            <p className="text-gray-400 text-sm mb-4">
              Congratulations! You have successfully completed {course.courseName}.
            </p>
            <Link href="/dashboard/contractor/onboarding/nrpg">
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-white">
                View Certification Progress
              </Button>
            </Link>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
