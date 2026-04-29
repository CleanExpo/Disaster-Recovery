'use client';

import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, Image as ImageIcon, Upload } from 'lucide-react';
import type { Step2Control } from './types';

function LogoSection({ logoFile, handleLogoUpload }: Step2Control) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <ImageIcon className="h-5 w-5" />
          Company Logo (Optional)
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <div className="border-2 border-dashed rounded-lg p-4">
            <input
              type="file"
              id="logo"
              accept="image/*"
              onChange={handleLogoUpload}
              className="hidden"
            />
            <label htmlFor="logo" className="flex flex-col items-center cursor-pointer">
              {logoFile ? (
                <>
                  <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm text-gray-700">{logoFile.name}</span>
                  <span className="text-xs text-gray-700 mt-1">Click to change</span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-700 mb-2" />
                  <span className="text-sm text-gray-700">Click to upload logo</span>
                  <span className="text-xs text-gray-700 mt-1">PNG, JPG up to 5MB</span>
                </>
              )}
            </label>
          </div>
          <p className="text-xs text-gray-700">Business branding in system</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default React.memo(LogoSection);
