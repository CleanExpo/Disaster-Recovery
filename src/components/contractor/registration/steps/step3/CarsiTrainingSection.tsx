'use client';

import { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { BookOpen, Upload, CheckCircle, Info, ExternalLink } from 'lucide-react';
import type { Step3Control } from './types';

export const CarsiTrainingSection = memo(function CarsiTrainingSection({
  control,
}: {
  control: Step3Control;
}) {
  const {
    carsiFile,
    carsiCompletionDate,
    carsiScore,
    setCarsiCompletionDate,
    setCarsiScore,
    handleCarsiUpload,
  } = control;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <BookOpen className="h-5 w-5" />
          CARSI Training Record (Optional)
        </CardTitle>
        <CardDescription>
          Cleaning and Restoration Science Institute - Continuing education and professional
          development
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* CARSI Membership Link */}
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            <strong>Get CARSI Certified:</strong>
            <div className="mt-2 space-y-1">
              <a
                href="https://www.carsi.org.au/membership"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
              >
                <ExternalLink className="h-3 w-3" />
                CARSI Membership & Training Portal
              </a>
              <a
                href="https://www.carsi.org.au/courses"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
              >
                <ExternalLink className="h-3 w-3" />
                View Available CARSI Courses
              </a>
              <p className="text-xs text-gray-700 mt-2">
                CARSI provides AI-powered compliance training and continuing education units (CEUs)
                for restoration professionals.
              </p>
            </div>
          </AlertDescription>
        </Alert>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>Completion Date</Label>
            <Input
              type="date"
              value={carsiCompletionDate}
              onChange={(e) => setCarsiCompletionDate(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-2">
            <Label>Score/Grade</Label>
            <Input
              type="text"
              placeholder="e.g., 95% or Pass"
              value={carsiScore}
              onChange={(e) => setCarsiScore(e.target.value)}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>Upload CARSI Certificate</Label>
          <div className="border-2 border-dashed rounded-lg p-4">
            <input
              type="file"
              id="carsi"
              accept=".pdf,image/*"
              onChange={handleCarsiUpload}
              className="hidden"
            />
            <label htmlFor="carsi" className="flex flex-col items-center cursor-pointer">
              {carsiFile ? (
                <>
                  <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium">{carsiFile.name}</span>
                  <span className="text-xs text-gray-700 mt-1">Click to replace</span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-700 mb-2" />
                  <span className="text-sm text-gray-700">Click to upload CARSI record</span>
                  <span className="text-xs text-gray-700 mt-1">PDF or image file</span>
                </>
              )}
            </label>
          </div>
          <p className="text-xs text-gray-700">Tracks ongoing continuing education</p>
        </div>
      </CardContent>
    </Card>
  );
});
