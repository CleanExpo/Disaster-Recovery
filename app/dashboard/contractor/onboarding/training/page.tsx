'use client';

import { useEffect, useState, useCallback } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Loader2, ArrowLeft, BookOpen, Award, Clock, CheckCircle2 } from 'lucide-react';
import { CourseCard } from '@/src/components/onboarding/CourseCard';

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

interface Course {
  courseId: 'CSE' | 'WRT';
  courseName: string;
  description: string;
  totalModules: number;
  totalHours: number;
  progress: CourseProgress;
}

export default function TrainingPage() {
  const { data: session, status: authStatus } = useSession();
  const [loading, setLoading] = useState(true);
  const [courses, setCourses] = useState<Course[]>([]);
  const [error, setError] = useState<string | null>(null);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch('/api/onboarding/courses');
      const data = await res.json();

      if (data.success) {
        setCourses(data.data.courses);
      } else {
        setError(data.error || 'Failed to load courses');
      }
    } catch (err) {
      console.error('Error fetching courses:', err);
      setError('Failed to load training courses');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (authStatus === 'authenticated') {
      fetchCourses();
    }
  }, [authStatus, fetchCourses]);

  // Calculate overall stats
  const totalModules = courses.reduce((sum, c) => sum + c.totalModules, 0);
  const completedModules = courses.reduce((sum, c) => sum + c.progress.completedModules, 0);
  const totalHours = courses.reduce((sum, c) => sum + c.totalHours, 0);
  const timeSpentMinutes = courses.reduce((sum, c) => sum + c.progress.totalTimeMinutes, 0);
  const overallProgress = totalModules > 0 ? Math.round((completedModules / totalModules) * 100) : 0;

  if (authStatus === 'loading' || loading) {
    return (
      <div className="container mx-auto py-8 max-w-6xl">
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
      <div className="container mx-auto py-8 max-w-6xl">
        <Card className="bg-gray-800 border-gray-700">
          <CardContent className="py-12 text-center">
            <p className="text-gray-400 mb-4">Please sign in to view training courses</p>
            <Button className="bg-[#00BFA6] hover:bg-[#00A693]">Sign In</Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8 max-w-6xl">
      {/* Header */}
      <div className="mb-6">
        <Link
          href="/dashboard/contractor/onboarding/nrpg"
          className="inline-flex items-center text-sm text-gray-400 hover:text-white mb-4"
        >
          <ArrowLeft className="h-4 w-4 mr-1" />
          Back to NRPG Dashboard
        </Link>
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-bold text-white">Training Courses</h1>
            <p className="text-gray-400">
              Complete professional development modules to enhance your certification
            </p>
          </div>
          <Badge className="bg-[#00BFA6]/10 text-[#00BFA6] border-[#00BFA6]/20 text-sm px-3 py-1">
            NRPG Certified
          </Badge>
        </div>
      </div>

      {error && (
        <Card className="bg-red-500/10 border-red-500/20 mb-6">
          <CardContent className="py-4">
            <p className="text-red-400">{error}</p>
          </CardContent>
        </Card>
      )}

      {/* Overall Progress Stats */}
      <Card className="bg-gray-800 border-gray-700 mb-6">
        <CardContent className="py-6">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-[#00BFA6]/10 mb-2">
                <BookOpen className="h-6 w-6 text-[#00BFA6]" />
              </div>
              <div className="text-2xl font-bold text-white">{completedModules}/{totalModules}</div>
              <div className="text-sm text-gray-400">Modules Complete</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-purple-500/10 mb-2">
                <Award className="h-6 w-6 text-purple-400" />
              </div>
              <div className="text-2xl font-bold text-white">{overallProgress}%</div>
              <div className="text-sm text-gray-400">Overall Progress</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-blue-500/10 mb-2">
                <Clock className="h-6 w-6 text-blue-400" />
              </div>
              <div className="text-2xl font-bold text-white">{Math.round(timeSpentMinutes / 60)}h</div>
              <div className="text-sm text-gray-400">Time Invested</div>
            </div>
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-amber-500/10 mb-2">
                <CheckCircle2 className="h-6 w-6 text-amber-400" />
              </div>
              <div className="text-2xl font-bold text-white">
                {courses.filter(c => c.progress.status === 'completed').length}/{courses.length}
              </div>
              <div className="text-sm text-gray-400">Courses Complete</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Course Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold text-white">Available Courses</h2>
        {courses.map((course) => (
          <CourseCard
            key={course.courseId}
            courseId={course.courseId}
            courseName={course.courseName}
            description={course.description}
            totalModules={course.totalModules}
            totalHours={course.totalHours}
            progress={course.progress}
          />
        ))}
      </div>

      {/* Learning Path Info */}
      <Card className="bg-gray-800 border-gray-700 mt-6">
        <CardHeader>
          <CardTitle className="text-base text-white">Recommended Learning Path</CardTitle>
          <CardDescription className="text-gray-400">
            Follow this sequence for optimal skill development
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-purple-500/20 flex items-center justify-center">
                <span className="text-purple-400 font-medium">1</span>
              </div>
              <span className="text-gray-300">Customer Service Excellence</span>
            </div>
            <div className="h-px flex-1 bg-gray-700" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                <span className="text-blue-400 font-medium">2</span>
              </div>
              <span className="text-gray-300">Water Damage Restoration</span>
            </div>
            <div className="h-px flex-1 bg-gray-700" />
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center">
                <CheckCircle2 className="h-4 w-4 text-emerald-400" />
              </div>
              <span className="text-gray-300">Certification</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
