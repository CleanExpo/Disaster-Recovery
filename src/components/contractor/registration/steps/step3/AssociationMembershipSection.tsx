'use client';

import { memo } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users2, Upload, CheckCircle, Info, ExternalLink } from 'lucide-react';
import { ASSOCIATION_TYPES, type Step3Control } from './types';

export const AssociationMembershipSection = memo(function AssociationMembershipSection({
  control,
}: {
  control: Step3Control;
}) {
  const {
    errors,
    association,
    setAssociationName,
    setAssociationMemberNumber,
    setAssociationExpiryDate,
    handleAssociationUpload,
  } = control;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Users2 className="h-5 w-5" />
          Industry Association Membership
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Association Links */}
        <Alert className="bg-blue-50 border-blue-200">
          <Info className="h-4 w-4 text-blue-600" />
          <AlertDescription className="text-blue-700">
            <strong>Join an Industry Association:</strong>
            <div className="mt-2 space-y-1">
              <a
                href="https://restorationindustry.org.au/membership"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
              >
                <ExternalLink className="h-3 w-3" />
                RIA - Restoration Industry Association
              </a>
              <a
                href="https://www.iaqa.org.au/membership"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
              >
                <ExternalLink className="h-3 w-3" />
                IAQAA - Indoor Air Quality Association Australia
              </a>
              <a
                href="https://www.ccavic.asn.au/membership"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
              >
                <ExternalLink className="h-3 w-3" />
                CCAVIC - Carpet Cleaners Association Victoria
              </a>
              <a
                href="https://www.bscaa.com.au/membership"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-1 text-blue-600 hover:underline text-sm"
              >
                <ExternalLink className="h-3 w-3" />
                BSCAA - Building Service Contractors Association
              </a>
            </div>
          </AlertDescription>
        </Alert>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="space-y-2">
            <Label>
              Association Name <span className="text-red-500">*</span>
            </Label>
            <Select value={association.name} onValueChange={setAssociationName}>
              <SelectTrigger className={errors['association.name'] ? 'border-red-600' : ''}>
                <SelectValue placeholder="Select association" />
              </SelectTrigger>
              <SelectContent>
                {ASSOCIATION_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>
              Membership Number <span className="text-red-500">*</span>
            </Label>
            <Input
              type="text"
              placeholder="MEM-123456"
              value={association.memberNumber}
              onChange={(e) => setAssociationMemberNumber(e.target.value)}
              className={errors['association.memberNumber'] ? 'border-red-600' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label>Membership Expiry</Label>
            <Input
              type="date"
              value={association.expiryDate}
              onChange={(e) => setAssociationExpiryDate(e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label>
            Membership Certificate <span className="text-red-500">*</span>
          </Label>
          <div className="border-2 border-dashed rounded-lg p-4">
            <input
              type="file"
              id="association"
              accept=".pdf,image/*"
              onChange={handleAssociationUpload}
              className="hidden"
            />
            <label htmlFor="association" className="flex flex-col items-center cursor-pointer">
              {association.file ? (
                <>
                  <CheckCircle className="h-8 w-8 text-green-600 mb-2" />
                  <span className="text-sm font-medium">{association.file.name}</span>
                  <span className="text-xs text-gray-700 mt-1">Click to replace</span>
                </>
              ) : (
                <>
                  <Upload className="h-8 w-8 text-gray-700 mb-2" />
                  <span className="text-sm text-gray-700">
                    Click to upload membership certificate
                  </span>
                  <span className="text-xs text-gray-700 mt-1">PDF or image file</span>
                </>
              )}
            </label>
          </div>
          <p className="text-xs text-gray-700">
            Verifies connection to established industry bodies
          </p>
        </div>
      </CardContent>
    </Card>
  );
});
