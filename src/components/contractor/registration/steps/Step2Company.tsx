'use client';

import React, { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { 
  Building2, 
  MapPin, 
  Users, 
  Shield, 
  Upload, 
  Plus, 
  Trash2, 
  CheckCircle, 
  AlertCircle,
  FileText,
  Image as ImageIcon,
  Map,
  Info
} from 'lucide-react';
import type { ContractorOnboardingData } from '@/types/contractor';

interface Step2CompanyProps {
  data: Partial<ContractorOnboardingData>;
  updateData: (data: Partial<ContractorOnboardingData>) => void;
  errors: Record<string, string>;
}

interface Director {
  name: string;
  
  email: string;
}

interface InsuranceDetails {
  professionalIndemnityInsurer: string;
  publicLiabilityInsurer: string;
  piPolicyNumber: string;
  plPolicyNumber: string;
  piExpiryDate: string;
  plExpiryDate: string;
}

interface TerritorySettings {
  centerAddress: string;
  centerLat?: number;
  centerLng?: number;
  radiusKm: number;
}

export function Step2Company({ data, updateData, errors }: Step2CompanyProps) {
  const [directors, setDirectors] = useState<Director[]>(
    data.company?.directors?.map(d => ({
      name: `${d.firstName} ${d.lastName}`,
      
      email: d.email
    })) || [{ name: '', email: '' }]
  );

  const [insurance, setInsurance] = useState<InsuranceDetails>({
    professionalIndemnityInsurer: '',
    publicLiabilityInsurer: '',
    piPolicyNumber: '',
    plPolicyNumber: '',
    piExpiryDate: '',
    plExpiryDate: '
  });

  const [territory, setTerritory] = useState<TerritorySettings>({
    centerAddress: '
    radiusKm: 25
  });

  const [certificateFiles, setCertificateFiles] = useState<File[]>([]);
  const [logoFile, setLogoFile] = useState<File | null>(null);
  const [abnVerified, setAbnVerified] = useState(false);
  const [verifyingAbn, setVerifyingAbn] = useState(false);
  const [addressVerified, setAddressVerified] = useState(false);

  // Initialize from existing data
  useEffect(() => {
    if (data.company) {
      // Set territory from existing data
      if (data.subscription?.territories?.[0]) {
        const t = data.subscription.territories[0];
        setTerritory({
          centerAddress: data.company.registeredAddress?.street || '
          centerLat: t.centerPoint?.lat,
          centerLng: t.centerPoint?.lng,
          radiusKm: t.radiusKm || 25
        });
      }
    }
  }, [data]);

  // Format ABN (XX XXX XXX XXX)
  const formatABN = (value: string): string => {
    const digits = value.replace(/\D/g, '');'
    if (digits.length <= 11) {
      return digits.replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4').trim();'
    }
    return digits.slice(0, 11).replace(/(\d{2})(\d{3})(\d{3})(\d{3})/, '$1 $2 $3 $4');'
  };

  // Validate ABN using Australian algorithm
  const validateABN = (abn: string): boolean => {
    const weights = [10, 1, 3, 5, 7, 9, 11, 13, 15, 17, 19];
    const abnDigits = abn.replace(/\D/g, '');'
    
    if (abnDigits.length !== 11) return false;
    
    let sum = 0;
    for (let i = 0; i < 11; i++) {
      const digit = parseInt(abnDigits[i]);
      sum += digit * weights[i];
    }
    
    return sum % 89 === 0;
  };

  // Verify ABN with external service
  const verifyABN = async () => {
    const abn = data.company?.abn?.replace(/\D/g, '');'
    if (!abn || !validateABN(abn)) {
      alert('Please enter a valid ABN');'
      return;
    }

    setVerifyingAbn(true);
    try {
      const response = await fetch(`/api/contractor/verify-abn?abn=${abn}`);
      const result = await response.json();
      
      if (result.valid) {
        setAbnVerified(true);
        // Auto-fill company name if returned
        if (result.entityName && !data.companyName) {
          updateData({ companyName: result.entityName });
        }
      } else {
        alert('ABN verification failed. Please check your ABN.');'
      }
    } catch (error) {
      console.error('ABN verification error:', error);'
    } finally {
      setVerifyingAbn(false);
    }
  };

  // Verify address with geocoding
  const verifyAddress = async () => {
    const address = data.company?.registeredAddress;
    if (!address?.street || !address?.city || !address?.state || !address?.postcode) {
      alert('Please complete all address fields');'
      return;
    }

    const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.postcode}`;
    
    try {
      const response = await fetch(`/api/contractor/geocode?address=${encodeURIComponent(fullAddress)}`);
      const result = await response.json();
      
      if (result.success) {
        setTerritory(prev => ({
          ...prev,
          centerAddress: fullAddress,
          centerLat: result.lat,
          centerLng: result.lng
        }));
        setAddressVerified(true);
      }
    } catch (error) {
      console.error('Address verification error:', error);'
    }
  };

  // Handle director changes
  const updateDirector = (index: number, field: keyof Director, value: string) => {
    const newDirectors = [...directors];
    newDirectors[index][field] = value;
    setDirectors(newDirectors);
    
    // Update main data
    const formattedDirectors = newDirectors.filter(d => d.name).map(d => {
      const [firstName, ...lastNameParts] = d.name.split(' ');'
      return {
        firstName: firstName || '
        lastName: lastNameParts.join(' ') || '
        position: 'Director','
        email: d.email,
        
        directorId: ''
      };
    });
    
    updateData({
      company: {
        ...data.company,
        directors: formattedDirectors
      } as any
    });
  };

  const addDirector = () => {
    setDirectors([...directors, { name: '', ''
  };

  const removeDirector = (index: number) => {
    if (directors.length > 1) {
      const newDirectors = directors.filter((_, i) => i !== index);
      setDirectors(newDirectors);
    }
  };

  // Handle file uploads
  const handleCertificateUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(file => 
        file.type === 'application/pdf' || file.type.startsWith('image/')'
      );
      setCertificateFiles(prev => [...prev, ...validFiles]);
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {'
      setLogoFile(file);
    }
  };

  const removeCertificate = (index: number) => {
    setCertificateFiles(prev => prev.filter((_, i) => i !== index));
  };

  // Update main data when local state changes
  const handleInputChange = (field: string, value: any) => {
    if (field.startsWith('company.')) {'
      const companyField = field.replace('company.', '');'
      updateData({
        company: {
          ...data.company,
          [companyField]: value
        } as any
      });
    } else {
      updateData({ [field]: value });
    }
  };

  return (
    <div className="space-y-6">"
      <Alert className="bg-blue-50 border-blue-200">"
        <Building2 className="h-4 w-4 text-blue-600" />"
        <AlertDescription className="text-blue-800">"
          <strong>Company Verification:</strong> Provide your business details for verification. 
          All information will be validated against official Australian business registers.
        </AlertDescription>
      </Alert>

      {/* ABN/ACN */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">"
            <FileText className="h-5 w-5" />"
            Business Registration
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">"
          <div className="space-y-2">"
            <Label htmlFor="abn">"
              ABN/ACN <span className="text-red-500">*</span>"
            </Label>
            <div className="flex gap-2">"
              <Input
                id="abn"
                type="text"
                placeholder="XX XXX XXX XXX"
                value={formatABN(data.company?.abn || '')}'
                onChange={(e) => handleInputChange('company.abn', e.target.value.replace(/\D/g, ''))}'
                className={errors['company.abn'] ? 'border-red-600' : ''}'
              />
              <Button
                type="button"
                variant="outline"
                onClick={verifyABN}
                disabled={verifyingAbn || abnVerified}
              >
                {verifyingAbn ? 'Verifying...' : abnVerified ? 'Verified' : 'Verify'}'
              </Button>
              {abnVerified && (
                <div className="flex items-center text-green-600">"
                  <CheckCircle className="w-5 h-5" />"
                </div>
              )}
            </div>
            <p className="text-xs text-gray-500">Australian business/company registration verification</p>"
            {errors['company.abn'] && <p className="text-sm text-red-500">{errors['company.abn']}</p>}'
          </div>

          <div className="space-y-2">"
            <Label htmlFor="structure">"
              Company Structure <span className="text-red-500">*</span>"
            </Label>
            <Select
              value={data.company?.companyStructure || ''}'
              onValueChange={(value) => handleInputChange('company.companyStructure', value)}'
            >
              <SelectTrigger className={errors['company.companyStructure'] ? 'border-red-600' : ''}>'
                <SelectValue placeholder="Select company structure" />"
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="SOLE_TRADER">Sole Trader</SelectItem>"
                <SelectItem value="PARTNERSHIP">Partnership</SelectItem>"
                <SelectItem value="PTY_LTD">Pty Ltd</SelectItem>"
                <SelectItem value="TRUST">Trust</SelectItem>"
              </SelectContent>
            </Select>
            <p className="text-xs text-gray-500">Business type categorization</p>"
            {errors['company.companyStructure'] && ('
              <p className="text-sm text-red-500">{errors['company.companyStructure']}</p>'
            )}
          </div>
        </CardContent>
      </Card>

      {/* Registered Business Address */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">"
            <MapPin className="h-5 w-5" />"
            Registered Business Address
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">"
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">"
            <div className="md:col-span-2 space-y-2">"
              <Label htmlFor="street">"
                Street Address <span className="text-red-500">*</span>"
              </Label>
              <Input
                id="street"
                type="text"
                placeholder="123 Business Street"
                value={data.company?.registeredAddress?.street || ''}'
                onChange={(e) => handleInputChange('company.registeredAddress', {'
                  ...data.company?.registeredAddress,
                  street: e.target.value
                })}
                className={errors['company.registeredAddress.street'] ? 'border-red-600' : ''}'
              />
            </div>
            
            <div className="space-y-2">"
              <Label htmlFor="city">"
                City/Suburb <span className="text-red-500">*</span>"
              </Label>
              <Input
                id="city"
                type="text"
                placeholder="Sydney"
                value={data.company?.registeredAddress?.city || ''}'
                onChange={(e) => handleInputChange('company.registeredAddress', {'
                  ...data.company?.registeredAddress,
                  city: e.target.value
                })}
                className={errors['company.registeredAddress.city'] ? 'border-red-600' : ''}'
              />
            </div>
            
            <div className="space-y-2">"
              <Label htmlFor="state">"
                State <span className="text-red-500">*</span>"
              </Label>
              <Select
                value={data.company?.registeredAddress?.state || ''}'
                onValueChange={(value) => handleInputChange('company.registeredAddress', {'
                  ...data.company?.registeredAddress,
                  state: value
                })}
              >
                <SelectTrigger className={errors['company.registeredAddress.state'] ? 'border-red-600' : ''}>'
                  <SelectValue placeholder="Select state" />"
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="NSW">New South Wales</SelectItem>"
                  <SelectItem value="VIC">Victoria</SelectItem>"
                  <SelectItem value="QLD">Queensland</SelectItem>"
                  <SelectItem value="WA">Western Australia</SelectItem>"
                  <SelectItem value="SA">South Australia</SelectItem>"
                  <SelectItem value="TAS">Tasmania</SelectItem>"
                  <SelectItem value="ACT">Australian Capital Territory</SelectItem>"
                  <SelectItem value="NT">Northern Territory</SelectItem>"
                </SelectContent>
              </Select>
            </div>
            
            <div className="space-y-2">"
              <Label htmlFor="postcode">"
                Postcode <span className="text-red-500">*</span>"
              </Label>
              <Input
                id="postcode"
                type="text"
                placeholder="2000"
                maxLength={4}
                value={data.company?.registeredAddress?.postcode || ''}'
                onChange={(e) => handleInputChange('company.registeredAddress', {'
                  ...data.company?.registeredAddress,
                  postcode: e.target.value.replace(/\D/g, '')'
                })}
                className={errors['company.registeredAddress.postcode'] ? 'border-red-600' : ''}'
              />
            </div>

            <div className="flex items-end">"
              <Button
                type="button"
                variant="outline"
                onClick={verifyAddress}
                disabled={addressVerified}
                className="w-full"
              >
                {addressVerified ? (
                  <>
                    <CheckCircle className="w-4 h-4 mr-2 text-green-600" />"
                    Address Verified
                  </>
                ) : (
                  <>
                    <MapPin className="w-4 h-4 mr-2" />"
                    Verify Address
                  </>
                )}
              </Button>
            </div>
          </div>
          <p className="text-xs text-gray-500">Legal correspondence and geographic validation</p>"
        </CardContent>
      </Card>

      {/* Directors */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">"
            <Users className="h-5 w-5" />"
            Director Names & Contact Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">"
          {directors.map((director, index) => (
            <div key={index} className="space-y-4 p-4 border rounded-lg">"
              <div className="flex justify-between items-center">"
                <h4 className="font-medium">Director {index + 1}</h4>"
                {directors.length > 1 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => removeDirector(index)}
                  >
                    <Trash2 className="h-4 w-4" />"
                  </Button>
                )}
              </div>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">"
                <div className="space-y-2">"
                  <Label>
                    Director Name <span className="text-red-500">*</span>"
                  </Label>
                  <Input
                    type="text"
                    placeholder="John Smith"
                    value={director.name}
                    onChange={(e) => updateDirector(index, 'name', e.target.value)}'
                  />
                </div>
                
                <div className="space-y-2">"
                  <Label>
                    Contact Phone <span className="text-red-500">*</span>"
                  </Label>
                  <Input
                    type="tel"
                    placeholder="Contact Form"
                    value={director.phone}
                    onChange={(e) => updateDirector(index, 'phone', e.target.value)}'
                  />
                </div>
                
                <div className="space-y-2">"
                  <Label>Contact Email</Label>
                  <Input
                    type="email"
                    placeholder="director@company.com.au"
                    value={director.email}
                    onChange={(e) => updateDirector(index, 'email', e.target.value)}'
                  />
                </div>
              </div>
            </div>
          ))}
          
          <Button
            type="button"
            variant="outline"
            onClick={addDirector}
            className="w-full"
          >
            <Plus className="h-4 w-4 mr-2" />"
            Add Another Director
          </Button>
          
          <p className="text-xs text-gray-500">Responsible persons for business operations</p>"
        </CardContent>
      </Card>

      {/* Insurance Details */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">"
            <Shield className="h-5 w-5" />"
            Insurance Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">"
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">"
            <div className="space-y-2">"
              <Label>
                Professional Indemnity Insurer <span className="text-red-500">*</span>"
              </Label>
              <Input
                type="text"
                placeholder="Insurance Company Name"
                value={insurance.professionalIndemnityInsurer}
                onChange={(e) => setInsurance({...insurance, professionalIndemnityInsurer: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">"
              <Label>
                PI Policy Number <span className="text-red-500">*</span>"
              </Label>
              <Input
                type="text"
                placeholder="POL-123456"
                value={insurance.piPolicyNumber}
                onChange={(e) => setInsurance({...insurance, piPolicyNumber: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">"
              <Label>
                Public Liability Insurer <span className="text-red-500">*</span>"
              </Label>
              <Input
                type="text"
                placeholder="Insurance Company Name"
                value={insurance.publicLiabilityInsurer}
                onChange={(e) => setInsurance({...insurance, publicLiabilityInsurer: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">"
              <Label>
                PL Policy Number <span className="text-red-500">*</span>"
              </Label>
              <Input
                type="text"
                placeholder="POL-654321"
                value={insurance.plPolicyNumber}
                onChange={(e) => setInsurance({...insurance, plPolicyNumber: e.target.value})}
              />
            </div>
            
            <div className="space-y-2">"
              <Label>
                PI Expiry Date <span className="text-red-500">*</span>"
              </Label>
              <Input
                type="date"
                value={insurance.piExpiryDate}
                onChange={(e) => setInsurance({...insurance, piExpiryDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}'
              />
            </div>
            
            <div className="space-y-2">"
              <Label>
                PL Expiry Date <span className="text-red-500">*</span>"
              </Label>
              <Input
                type="date"
                value={insurance.plExpiryDate}
                onChange={(e) => setInsurance({...insurance, plExpiryDate: e.target.value})}
                min={new Date().toISOString().split('T')[0]}'
              />
            </div>
          </div>
          
          {/* Certificates of Currency Upload */}
          <div className="space-y-2">"
            <Label>
              Certificates of Currency <span className="text-red-500">*</span>"
            </Label>
            <div className="border-2 border-dashed rounded-lg p-4">"
              <input
                type="file"
                id="certificates"
                accept=".pdf,image/*"
                multiple
                onChange={handleCertificateUpload}
                className="hidden"
              />
              <label
                htmlFor="certificates"
                className="flex flex-col items-center cursor-pointer"
              >
                <Upload className="h-8 w-8 text-gray-400 mb-2" />"
                <span className="text-sm text-gray-600">"
                  Click to upload PDF or image files
                </span>
              </label>
            </div>
            
            {certificateFiles.length > 0 && (
              <div className="space-y-2 mt-2">"
                {certificateFiles.map((file, index) => (
                  <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">"
                    <span className="text-sm">{file.name}</span>"
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => removeCertificate(index)}
                    >
                      <Trash2 className="h-4 w-4" />"
                    </Button>
                  </div>
                ))}
              </div>
            )}
            
            <p className="text-xs text-gray-500">Proof of valid business insurance</p>"
          </div>
        </CardContent>
      </Card>

      {/* Territory Coverage */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">"
            <Map className="h-5 w-5" />"
            Territory Coverage
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">"
          <div className="space-y-2">"
            <Label>
              Service Radius (km) <span className="text-red-500">*</span>"
            </Label>
            <div className="space-y-4">"
              <div className="flex items-center gap-4">"
                <Input
                  type="range"
                  min="25"
                  max="200"
                  step="25"
                  value={territory.radiusKm}
                  onChange={(e) => setTerritory({...territory, radiusKm: parseInt(e.target.value)})}
                  className="flex-1"
                />
                <div className="w-20 text-center font-semibold">"
                  {territory.radiusKm} km
                </div>
              </div>
              <div className="grid grid-cols-5 gap-2">"
                {[25, 50, 75, 100, 200].map(radius => (
                  <Button
                    key={radius}
                    type="button"
                    variant={territory.radiusKm === radius ? "default" : "outline"}"
                    size="sm"
                    onClick={() => setTerritory({...territory, radiusKm: radius})}
                  >
                    {radius}km
                  </Button>
                ))}
              </div>
            </div>
            <p className="text-xs text-gray-500">"
              Service area selection for leads and compliance (minimum 25km)
            </p>
          </div>
          
          {addressVerified && (
            <Alert className="bg-green-50 border-green-200">"
              <MapPin className="h-4 w-4 text-green-600" />"
              <AlertDescription className="text-green-800">"
                Service area centred at: {territory.centerAddress}
                <br />
                Coverage radius: {territory.radiusKm}km
              </AlertDescription>
            </Alert>
          )}
        </CardContent>
      </Card>

      {/* Company Logo (Optional) */}
      <Card>
        <CardHeader>
          <CardTitle className="text-lg flex items-center gap-2">"
            <ImageIcon className="h-5 w-5" />"
            Company Logo (Optional)
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">"
            <div className="border-2 border-dashed rounded-lg p-4">"
              <input
                type="file"
                id="logo"
                accept="image/*"
                onChange={handleLogoUpload}
                className="hidden"
              />
              <label
                htmlFor="logo"
                className="flex flex-col items-center cursor-pointer"
              >
                {logoFile ? (
                  <>
                    <CheckCircle className="h-8 w-8 text-green-600 mb-2" />"
                    <span className="text-sm text-gray-600">{logoFile.name}</span>"
                    <span className="text-xs text-gray-400 mt-1">Click to change</span>"
                  </>
                ) : (
                  <>
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />"
                    <span className="text-sm text-gray-600">Click to upload logo</span>"
                    <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>"
                  </>
                )}
              </label>
            </div>
            <p className="text-xs text-gray-500">Business branding in system</p>"
          </div>
        </CardContent>
      </Card>

      {/* Validation Summary */}
      <Alert className={abnVerified && addressVerified && certificateFiles.length > 0 
        ? "bg-green-50 border-green-300"
        : "bg-yellow-50 border-yellow-300"}>"
        <Info className={abnVerified && addressVerified && certificateFiles.length > 0 
          ? "h-4 w-4 text-green-600"
          : "h-4 w-4 text-yellow-600"} />"
        <AlertDescription className={abnVerified && addressVerified && certificateFiles.length > 0 
          ? "text-green-800"
          : "text-yellow-800"}>"
          <strong>Verification Status:</strong>
          <ul className="mt-2 ml-4 list-disc text-sm">"
            <li className={abnVerified ? "text-green-700" : ""}>"
              ABN Verification: {abnVerified ? "✓ Verified" : "Pending"}"
            </li>
            <li className={addressVerified ? "text-green-700" : ""}>"
              Address Validation: {addressVerified ? "✓ Verified" : "Pending"}"
            </li>
            <li className={certificateFiles.length > 0 ? "text-green-700" : ""}>"
              Insurance Certificates: {certificateFiles.length > 0 ? `✓ ${certificateFiles.length} file(s) uploaded` : "Required"}"
            </li>
          </ul>
        </AlertDescription>
      </Alert>
    </div>
  );
}