'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Shield, Trash2, Upload } from 'lucide-react';
import type { Step2Control } from './types';

function InsuranceSection({
  insurance,
  setInsurance,
  certificateFiles,
  handleCertificateUpload,
  removeCertificate,
}: Step2Control) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Shield className="h-5 w-5" />
          Insurance Details
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>
              Professional Indemnity Insurer <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Insurance Company Name"
              value={insurance.professionalIndemnityInsurer}
              onChange={(e) =>
                setInsurance({ ...insurance, professionalIndemnityInsurer: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              PI Policy Number <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              placeholder="POL-123456"
              value={insurance.piPolicyNumber}
              onChange={(e) => setInsurance({ ...insurance, piPolicyNumber: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>
              Public Liability Insurer <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              placeholder="Insurance Company Name"
              value={insurance.publicLiabilityInsurer}
              onChange={(e) =>
                setInsurance({ ...insurance, publicLiabilityInsurer: e.target.value })
              }
            />
          </div>

          <div className="space-y-2">
            <Label>
              PL Policy Number <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              placeholder="POL-654321"
              value={insurance.plPolicyNumber}
              onChange={(e) => setInsurance({ ...insurance, plPolicyNumber: e.target.value })}
            />
          </div>

          <div className="space-y-2">
            <Label>
              PI Expiry Date <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              value={insurance.piExpiryDate}
              onChange={(e) => setInsurance({ ...insurance, piExpiryDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>

          <div className="space-y-2">
            <Label>
              PL Expiry Date <span className="text-red-500">*</span>
            </Label>
            <Input
              type="date"
              value={insurance.plExpiryDate}
              onChange={(e) => setInsurance({ ...insurance, plExpiryDate: e.target.value })}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        {/* Certificates of Currency Upload */}
        <div className="space-y-2">
          <Label>
            Certificates of Currency <span className="text-red-500">*</span>
          </Label>
          <div className="border-2 border-dashed rounded-lg p-4">
            <input
              type="file"
              id="certificates"
              accept=".pdf,image/*"
              multiple
              onChange={handleCertificateUpload}
              className="hidden"
            />
            <label htmlFor="certificates" className="flex flex-col items-center cursor-pointer">
              <Upload className="h-8 w-8 text-gray-700 mb-2" />
              <span className="text-sm text-gray-700">Click to upload PDF or image files</span>
            </label>
          </div>

          {certificateFiles.length > 0 && (
            <div className="space-y-2 mt-2">
              {certificateFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between p-2 bg-gray-50 rounded"
                >
                  <span className="text-sm">{file.name}</span>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeCertificate(index)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </div>
          )}

          <p className="text-xs text-gray-700">Proof of valid business insurance</p>
        </div>
      </CardContent>
    </Card>
  );
}

export default React.memo(InsuranceSection);
