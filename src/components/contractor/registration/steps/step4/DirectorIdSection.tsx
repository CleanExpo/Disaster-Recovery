import React, { memo } from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { FileSearch, Info, Upload, FileText, Trash2, CheckCircle } from 'lucide-react';
import type { Step4Control } from './types';

function DirectorIdSection({ control }: { control: Step4Control }) {
  const {
    directorIdFiles,
    idVerificationStatus,
    handleDirectorIdUpload,
    removeDirectorIdFile,
  } = control;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <FileSearch className="h-5 w-5" />
          Director/Owner Identification
        </CardTitle>
        <CardDescription>
          Identity verification for all business directors and owners
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            Upload clear copies of government-issued photo ID for all directors listed in Step 2.
            Acceptable forms: Driver&apos;s Licence, Passport, or Proof of Age Card.
          </AlertDescription>
        </Alert>

        <div className="space-y-2">
          <Label>
            Upload Identification Documents <span className="text-red-500">*</span>
          </Label>
          <div className="border-2 border-dashed rounded-lg p-4">
            <input
              type="file"
              id="director-id"
              accept=".pdf,image/*"
              multiple
              onChange={handleDirectorIdUpload}
              className="hidden"
            />
            <label htmlFor="director-id" className="flex flex-col items-center cursor-pointer">
              <Upload className="h-8 w-8 text-gray-600 mb-2" />
              <span className="text-sm text-gray-600">Click to upload ID documents</span>
              <span className="text-xs text-gray-600 mt-1">
                PDF or image files (Driver&apos;s Licence, Passport, etc.)
              </span>
            </label>
          </div>

          {directorIdFiles.length > 0 && (
            <div className="space-y-2 mt-4">
              {directorIdFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-3 bg-gray-50 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <FileText className="h-5 w-5 text-gray-600" />
                    <div>
                      <p className="text-sm font-medium">{file.name}</p>
                      <p className="text-xs text-gray-500">
                        {(file.size / 1024).toFixed(1)} KB
                      </p>
                    </div>
                  </div>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDirectorIdFile(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          {idVerificationStatus === 'uploaded' && (
            <Alert className="bg-green-50 border-green-200">
              <CheckCircle className="h-4 w-4 text-green-600" />
              <AlertDescription className="text-green-700">
                {directorIdFiles.length} identification document(s) uploaded successfully
              </AlertDescription>
            </Alert>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

export default memo(DirectorIdSection);
