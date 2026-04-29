'use client';

import { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import {
  Award,
  Upload,
  Plus,
  Trash2,
  FileText,
  Info,
  ExternalLink,
} from 'lucide-react';
import { IICRC_CERT_TYPES, type Step3Control } from './types';

export const IicrcCertificationsSection = memo(function IicrcCertificationsSection({
  control,
}: {
  control: Step3Control;
}) {
  const { iicrcCerts, updateIicrcCert, addIicrcCert, removeIicrcCert } = control;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Award className="h-5 w-5" />
          IICRC Certifications
        </CardTitle>
        <CardDescription>
          Institute of Inspection, Cleaning and Restoration Certification
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* IICRC Training Schools */}
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            <strong>Need IICRC Certification?</strong>
            <div className="mt-2">
              <a
                href="https://www.iicrc.org/page/IICRCApprovedSchools"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
              >
                <ExternalLink className="h-3 w-3" />
                Find IICRC Approved Training Schools
              </a>
              <p className="text-xs text-gray-700 mt-2">
                Access the official directory of IICRC approved training providers worldwide,
                including schools offering courses in Australia and New Zealand.
              </p>
            </div>
          </AlertDescription>
        </Alert>
        {iicrcCerts.map((cert, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">IICRC Certification {index + 1}</h4>
              {iicrcCerts.length > 1 && (
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => removeIicrcCert(index)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>
                  Certification Type <span className="text-red-500">*</span>
                </Label>
                <Select
                  value={cert.name}
                  onValueChange={(value) => updateIicrcCert(index, 'name', value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select certification" />
                  </SelectTrigger>
                  <SelectContent>
                    {IICRC_CERT_TYPES.map((type) => (
                      <SelectItem key={type.value} value={type.value}>
                        {type.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label>Certificate Number</Label>
                <Input
                  type="text"
                  placeholder="IICRC-123456"
                  value={cert.certNumber}
                  onChange={(e) => updateIicrcCert(index, 'certNumber', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Expiry Date</Label>
                <Input
                  type="date"
                  value={cert.expiryDate}
                  onChange={(e) => updateIicrcCert(index, 'expiryDate', e.target.value)}
                  min={new Date().toISOString().split('T')[0]}
                />
              </div>

              <div className="space-y-2">
                <Label>
                  Upload Certificate <span className="text-red-500">*</span>
                </Label>
                <div className="border-2 border-dashed rounded-lg p-2">
                  <input
                    type="file"
                    id={`iicrc-${index}`}
                    accept=".pdf,image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) updateIicrcCert(index, 'file', file);
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor={`iicrc-${index}`}
                    className="flex items-center justify-center cursor-pointer"
                  >
                    {cert.file ? (
                      <div className="flex items-center gap-2">
                        <FileText className="h-4 w-4 text-green-600" />
                        <span className="text-xs truncate">{cert.file.name}</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2">
                        <Upload className="h-4 w-4 text-gray-700" />
                        <span className="text-xs">Upload</span>
                      </div>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addIicrcCert} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Another IICRC Certification
        </Button>

        <p className="text-xs text-gray-700">
          Ensures advanced technical qualifications are held
        </p>
      </CardContent>
    </Card>
  );
});
