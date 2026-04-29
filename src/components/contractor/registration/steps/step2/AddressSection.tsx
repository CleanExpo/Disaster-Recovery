'use client';

import React from 'react';
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
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle, MapPin } from 'lucide-react';
import { AU_STATES, type Step2Control } from './types';

function AddressSection({
  data,
  errors,
  addressVerified,
  handleInputChange,
  verifyAddress,
}: Step2Control) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <MapPin className="h-5 w-5" />
          Registered Business Address
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="md:col-span-2 space-y-2">
            <Label htmlFor="street">
              Street Address <span className="text-red-500">*</span>
            </Label>
            <Input
              id="street"
              type="text"
              placeholder="123 Business Street"
              value={data.company?.registeredAddress?.street || ''}
              onChange={(e) =>
                handleInputChange('company.registeredAddress', {
                  ...data.company?.registeredAddress,
                  street: e.target.value,
                })
              }
              className={errors['company.registeredAddress.street'] ? 'border-red-600' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="city">
              City/Suburb <span className="text-red-500">*</span>
            </Label>
            <Input
              id="city"
              type="text"
              placeholder="Sydney"
              value={data.company?.registeredAddress?.city || ''}
              onChange={(e) =>
                handleInputChange('company.registeredAddress', {
                  ...data.company?.registeredAddress,
                  city: e.target.value,
                })
              }
              className={errors['company.registeredAddress.city'] ? 'border-red-600' : ''}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="state">
              State <span className="text-red-500">*</span>
            </Label>
            <Select
              value={data.company?.registeredAddress?.state || ''}
              onValueChange={(value) =>
                handleInputChange('company.registeredAddress', {
                  ...data.company?.registeredAddress,
                  state: value,
                })
              }
            >
              <SelectTrigger
                className={errors['company.registeredAddress.state'] ? 'border-red-600' : ''}
              >
                <SelectValue placeholder="Select state" />
              </SelectTrigger>
              <SelectContent>
                {AU_STATES.map((s) => (
                  <SelectItem key={s.value} value={s.value}>
                    {s.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="postcode">
              Postcode <span className="text-red-500">*</span>
            </Label>
            <Input
              id="postcode"
              type="text"
              placeholder="2000"
              maxLength={4}
              value={data.company?.registeredAddress?.postcode || ''}
              onChange={(e) =>
                handleInputChange('company.registeredAddress', {
                  ...data.company?.registeredAddress,
                  postcode: e.target.value.replace(/\D/g, ''),
                })
              }
              className={errors['company.registeredAddress.postcode'] ? 'border-red-600' : ''}
            />
          </div>

          <div className="flex items-end">
            <Button
              type="button"
              variant="outline"
              onClick={verifyAddress}
              disabled={addressVerified}
              className="w-full"
            >
              {addressVerified ? (
                <>
                  <CheckCircle className="w-4 h-4 mr-2 text-green-600" />
                  Address Verified
                </>
              ) : (
                <>
                  <MapPin className="w-4 h-4 mr-2" />
                  Verify Address
                </>
              )}
            </Button>
          </div>
        </div>
        <p className="text-xs text-gray-700">Legal correspondence and geographic validation</p>
      </CardContent>
    </Card>
  );
}

export default React.memo(AddressSection);
