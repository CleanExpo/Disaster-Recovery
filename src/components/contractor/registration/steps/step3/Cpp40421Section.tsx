'use client';

import { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { GraduationCap, Upload, CheckCircle, Info, ExternalLink } from 'lucide-react';
import type { Step3Control } from './types';

export const Cpp40421Section = memo(function Cpp40421Section({
  control,
}: {
  control: Step3Control;
}) {
  const {
    errors,
    cpp40421File,
    cpp40421Number,
    cpp40421Issuer,
    cpp40421Date,
    setCpp40421Number,
    setCpp40421Issuer,
    setCpp40421Date,
    handleCpp40421Upload,
  } = control;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <GraduationCap className="h-5 w-5" />
          CPP40421 Certificate IV
        </CardTitle>
        <CardDescription>
          Certificate IV in Cleaning and Restoration (Specialty Cleaning and Restoration)
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Training Provider Links */}
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            <strong>Need this certification?</strong> Find registered training organisations (RTOs):
            <div className="mt-2 space-y-1">
              <a
                href="https://training.gov.au/Training/Details/CPP40421"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
              >
                <ExternalLink className="h-3 w-3" />
                View CPP40421 on training.gov.au (Official RTO List)
              </a>
              <a
                href="https://www.myskills.gov.au/courses/details?Code=CPP40421"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
              >
                <ExternalLink className="h-3 w-3" />
                Find RTOs on MySkills.gov.au
              </a>
            </div>
          </AlertDescription>
        </Alert>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>
              Certificate Number <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              placeholder="CERT-123456"
              value={cpp40421Number}
              onChange={(e) => setCpp40421Number(e.target.value)}
              className={errors['cpp40421.number'] ? 'border-red-600' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Issuing RTO/Institution <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Training Provider Name"
              value={cpp40421Issuer}
              onChange={(e) => setCpp40421Issuer(e.target.value)}
              className={errors['cpp40421.issuer'] ? 'border-red-600' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Completion Date <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              value={cpp40421Date}
              onChange={(e) => setCpp40421Date(e.target.value)}
              max={new Date().toISOString().split('T')[0]}
              className={errors['cpp40421.date'] ? 'border-red-600' : ''}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>
            Upload Certificate <span className="text-red-500">*</span>
          </Label>
          <div className="border-2 border-dashed rounded-lg p-4">
            <input
              type="file"
              id="cpp40421"
              accept=".pdf,image/*"
              onChange={handleCpp40421Upload}
              className="hidden"
            />
            <label htmlFor="cpp40421" className="flex flex-col items-center cursor-pointer">
              {cpp40421File ? (
                <>
                  <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium">{cpp40421File.name}</span>
                  <span className="text-xs text-gray-700 mt-1">Click to replace</span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-700 mb-2" />
                  <span className="text-sm text-gray-700">Click to upload certificate</span>
                  <span className="text-xs text-gray-700 mt-1">PDF or image file</span>
                </>
              )}
            </label>
          </div>
          <p className="text-xs text-gray-700">
            Verifies the contractor meets national industry standards
          </p>
        </div>
      </CardContent>
    </Card>
  );
});
