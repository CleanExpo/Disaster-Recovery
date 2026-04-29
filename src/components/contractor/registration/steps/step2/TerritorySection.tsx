'use client';

import React from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Map, MapPin } from 'lucide-react';
import { TERRITORY_RADIUS_PRESETS, type Step2Control } from './types';

function TerritorySection({ territory, setTerritory, addressVerified }: Step2Control) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-lg flex items-center gap-2">
          <Map className="h-5 w-5" />
          Territory Coverage
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <Label>
            Service Radius (km) <span className="text-red-500">*</span>
          </Label>
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <Input
                type="range"
                min="25"
                max="200"
                step="25"
                value={territory.radiusKm}
                onChange={(e) =>
                  setTerritory({ ...territory, radiusKm: parseInt(e.target.value) })
                }
                className="flex-1"
              />
              <div className="w-20 text-center font-semibold">{territory.radiusKm} km</div>
            </div>
            <div className="grid grid-cols-5 gap-2">
              {TERRITORY_RADIUS_PRESETS.map((radius) => (
                <Button
                  key={radius}
                  type="button"
                  variant={territory.radiusKm === radius ? 'default' : 'outline'}
                  size="sm"
                  onClick={() => setTerritory({ ...territory, radiusKm: radius })}
                >
                  {radius}km
                </Button>
              ))}
            </div>
          </div>
          <p className="text-xs text-gray-700">
            Service area selection for leads and compliance (minimum 25km)
          </p>
        </div>

        {addressVerified && (
          <Alert className="bg-green-50 border-green-200">
            <MapPin className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-800">
              Service area centred at: {territory.centerAddress}
              <br />
              Coverage radius: {territory.radiusKm}km
            </AlertDescription>
          </Alert>
        )}
      </CardContent>
    </Card>
  );
}

export default React.memo(TerritorySection);
