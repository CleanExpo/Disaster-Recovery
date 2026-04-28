'use client';

import { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Star, Upload, Plus, Trash2, CheckCircle } from 'lucide-react';
import type { Step3Control } from './types';

export const OtherQualificationsSection = memo(function OtherQualificationsSection({
  control,
}: {
  control: Step3Control;
}) {
  const {
    otherQualifications,
    addOtherQualification,
    updateOtherQualification,
    removeOtherQualification,
  } = control;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Star className="h-5 w-5" />
          Other Industry Qualifications (Optional)
        </CardTitle>
        <CardDescription>Additional certifications or specialty recognitions</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        {otherQualifications.map((qual, index) => (
          <div key={index} className="p-4 border rounded-lg space-y-4">
            <div className="flex justify-between items-center">
              <h4 className="font-medium">Additional Qualification {index + 1}</h4>
              <Button
                type="button"
                variant="ghost"
                size="sm"
                onClick={() => removeOtherQualification(index)}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Qualification Name</Label>
                <Input
                  type="text"
                  placeholder="e.g., Asbestos Awareness"
                  value={qual.name}
                  onChange={(e) => updateOtherQualification(index, 'name', e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label>Issuing Organisation</Label>
                <Input
                  type="text"
                  placeholder="Organisation name"
                  value={qual.issuer}
                  onChange={(e) => updateOtherQualification(index, 'issuer', e.target.value)}
                />
              </div>

              <div className="space-y-2 md:col-span-2">
                <Label>Upload Certificate</Label>
                <div className="border-2 border-dashed rounded-lg p-4">
                  <input
                    type="file"
                    id={`other-${index}`}
                    accept=".pdf,image/*"
                    onChange={(e) => {
                      const file = e.target.files?.[0];
                      if (file) updateOtherQualification(index, 'file', file);
                    }}
                    className="hidden"
                  />
                  <label
                    htmlFor={`other-${index}`}
                    className="flex flex-col items-center cursor-pointer"
                  >
                    {qual.file ? (
                      <>
                        <CheckCircle className="h-6 w-6 text-green-600 mb-1" />
                        <span className="text-xs">{qual.file.name}</span>
                      </>
                    ) : (
                      <>
                        <Upload className="h-6 w-6 text-gray-700 mb-1" />
                        <span className="text-xs">Upload certificate</span>
                      </>
                    )}
                  </label>
                </div>
              </div>
            </div>
          </div>
        ))}

        <Button type="button" variant="outline" onClick={addOtherQualification} className="w-full">
          <Plus className="h-4 w-4 mr-2" />
          Add Another Qualification
        </Button>
      </CardContent>
    </Card>
  );
});
