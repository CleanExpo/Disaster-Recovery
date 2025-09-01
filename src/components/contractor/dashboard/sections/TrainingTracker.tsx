'use client';

import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Calendar } from '@/components/ui/calendar';
import {
  GraduationCap,
  BookOpen,
  Award,
  Clock,
  Calendar as CalendarIcon,
  Upload,
  CheckCircle,
  AlertCircle,
  ExternalLink,
  TrendingUp,
  Star,
  Video
} from 'lucide-react';

interface Training {
  id: string;
  name: string;
  provider: string;
  type: 'IICRC' | 'CARSI' | 'WHS' | 'OTHER';
  status: 'not_started' | 'in_progress' | 'completed';
  progress: number;
  ceuPoints?: number;
  completedDate?: string;
  expiryDate?: string;
  certificateUrl?: string;
}

interface UpcomingEvent {
  id: string;
  title: string;
  provider: string;
  date: string;
  format: 'online' | 'in-person';
  location?: string;
  ceuPoints: number;
  price: number;
  registered?: boolean;
}

interface TrainingTrackerProps {
  trainings?: Training[];
  upcomingEvents?: UpcomingEvent[];
  ceuBalance?: number;
  ceuRequired?: number;
}

export function TrainingTracker({ 
  trainings = [], 
  upcomingEvents = [],
  ceuBalance = 0,
  ceuRequired = 24
}: TrainingTrackerProps) {
  const [selectedDate, setSelectedDate] = useState<Date | undefined>(new Date());
  const [showUploadModal, setShowUploadModal] = useState(false);
  const [selectedTraining, setSelectedTraining] = useState<Training | null>(null);

  const currentYear = new Date().getFullYear();
  const ceuProgress = (ceuBalance / ceuRequired) * 100;
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'bg-green-100 text-green-800';
      case 'in_progress': return 'bg-blue-100 text-blue-800';
      case 'not_started': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const handleCertificateUpload = (training: Training) => {
    setSelectedTraining(training);
    setShowUploadModal(true);
  };

  const handleEventRegistration = (eventId: string) => {
    console.log('Registering for event:', eventId);
    // API call to register for event
  };

  return (
    <div className="space-y-6">
      {/* CEU Progress Overview */}
      <Card className="border-blue-200">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span className="flex items-center gap-2">
              <GraduationCap className="h-5 w-5" />
              Continuing Education Units (CEU) - {currentYear}
            </span>
            <Badge className={ceuProgress >= 100 ? 'bg-green-600' : 'bg-blue-600'}>
              {ceuBalance}/{ceuRequired} CEUs
            </Badge>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Progress value={ceuProgress} className="h-3 mb-4" />
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-blue-600">{ceuBalance}</p>
              <p className="text-xs text-gray-600">Earned CEUs</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-gray-600">{ceuRequired - ceuBalance}</p>
              <p className="text-xs text-gray-600">CEUs Needed</p>
            </div>
            <div className="text-center p-3 bg-gray-50 rounded-lg">
              <p className="text-2xl font-bold text-green-600">
                {Math.ceil((12 - new Date().getMonth()) * 2)}
              </p>
              <p className="text-xs text-gray-600">Months Remaining</p>
            </div>
          </div>

          {ceuBalance < ceuRequired && (
            <Alert className="bg-yellow-50 border-yellow-200">
              <AlertCircle className="h-4 w-4 text-yellow-600" />
              <AlertDescription className="text-yellow-700">
                You need {ceuRequired - ceuBalance} more CEUs by December 31, {currentYear} to maintain 
                your certification status.
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Current Training Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">My Training Courses</CardTitle>
          <CardDescription>Track your ongoing and completed training</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {trainings.map(training => (
              <div key={training.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start mb-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <BookOpen className="h-4 w-4 text-gray-400" />
                      <p className="font-medium">{training.name}</p>
                    </div>
                    <p className="text-sm text-gray-600 mt-1">
                      {training.provider} • {training.type}
                      {training.ceuPoints && ` • ${training.ceuPoints} CEUs`}
                    </p>
                  </div>
                  <Badge className={getStatusColor(training.status)}>
                    {training.status.replace('_', ' ')}
                  </Badge>
                </div>

                {training.status === 'in_progress' && (
                  <div className="mb-3">
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-gray-600">Progress</span>
                      <span className="font-medium">{training.progress}%</span>
                    </div>
                    <Progress value={training.progress} className="h-2" />
                  </div>
                )}

                <div className="flex justify-between items-center">
                  <div className="text-sm text-gray-500">
                    {training.completedDate && (
                      <span>Completed: {new Date(training.completedDate).toLocaleDateString()}</span>
                    )}
                    {training.expiryDate && (
                      <span> • Expires: {new Date(training.expiryDate).toLocaleDateString()}</span>
                    )}
                  </div>
                  <div className="flex gap-2">
                    {training.certificateUrl ? (
                      <Button variant="outline" size="sm">
                        <ExternalLink className="h-4 w-4 mr-1" />
                        View Certificate
                      </Button>
                    ) : training.status === 'completed' && (
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleCertificateUpload(training)}
                      >
                        <Upload className="h-4 w-4 mr-1" />
                        Upload Certificate
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-4 pt-4 border-t">
            <Button variant="outline" className="w-full">
              <BookOpen className="h-4 w-4 mr-2" />
              Browse Training Catalog
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Upcoming Events & Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Upcoming Training Events</CardTitle>
          <CardDescription>Register for courses to earn CEUs</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {upcomingEvents.map(event => (
              <div key={event.id} className="border rounded-lg p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <p className="font-medium">{event.title}</p>
                    <p className="text-sm text-gray-600 mt-1">{event.provider}</p>
                    <div className="flex items-center gap-4 mt-2 text-sm text-gray-500">
                      <span className="flex items-center gap-1">
                        <CalendarIcon className="h-3 w-3" />
                        {new Date(event.date).toLocaleDateString()}
                      </span>
                      <span className="flex items-center gap-1">
                        {event.format === 'online' ? (
                          <Video className="h-3 w-3" />
                        ) : (
                          <Building className="h-3 w-3" />
                        )}
                        {event.format === 'online' ? 'Online' : event.location}
                      </span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge className="bg-blue-100 text-blue-800">
                      {event.ceuPoints} CEUs
                    </Badge>
                    <p className="text-lg font-semibold mt-2">${event.price}</p>
                    {event.registered ? (
                      <Badge className="mt-2 bg-green-100 text-green-800">
                        <CheckCircle className="h-3 w-3 mr-1" />
                        Registered
                      </Badge>
                    ) : (
                      <Button 
                        size="sm" 
                        className="mt-2"
                        onClick={() => handleEventRegistration(event.id)}
                      >
                        Register
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>

          <Alert className="mt-4 bg-blue-50 border-blue-200">
            <Star className="h-4 w-4 text-blue-600" />
            <AlertDescription className="text-blue-700">
              <strong>Recommended:</strong> IICRC Water Damage Restoration Refresher - 
              March 15, 2024. Earn 14 CEUs and update your WRT certification.
            </AlertDescription>
          </Alert>
        </CardContent>
      </Card>

      {/* Training Calendar */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Training Calendar</CardTitle>
        </CardHeader>
        <CardContent>
          <Calendar
            mode="single"
            selected={selectedDate}
            onSelect={setSelectedDate}
            className="rounded-md border"
          />
          
          <div className="mt-4 space-y-2">
            <p className="text-sm font-medium">Upcoming Reminders:</p>
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-500 rounded-full" />
                <span>IICRC WRT Renewal - Due in 45 days</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-blue-400 rounded-full" />
                <span>CARSI Compliance Training - March 20</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <div className="w-2 h-2 bg-emerald-500 rounded-full" />
                <span>WHS Refresher - April 5</span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}