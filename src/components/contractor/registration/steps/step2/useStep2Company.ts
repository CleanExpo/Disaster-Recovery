'use client';

import { useState, useEffect } from 'react';
import { clientLogger } from '@/lib/observability/client-logger';
import type { ContractorOnboardingData } from '@/types/contractor';
import {
  validateABN,
  type Director,
  type InsuranceDetails,
  type TerritorySettings,
} from './types';

interface UseStep2CompanyArgs {
  data: Partial<ContractorOnboardingData>;
  updateData: (data: Partial<ContractorOnboardingData>) => void;
}

/**
 * Form-state hook for Step 2 (Company). Centralises all local state, async
 * verification handlers, and the data-shaping logic for directors / address /
 * insurance / territory / file uploads. Behaviour preserved verbatim from the
 * pre-decomposition `Step2Company` god component.
 */
export function useStep2Company({ data, updateData }: UseStep2CompanyArgs) {
  const [directors, setDirectors] = useState<Director[]>(
    data.company?.directors?.map((d) => ({
      name: `${d.firstName} ${d.lastName}`,
      phone: d.phone ?? '',
      email: d.email,
    })) || [{ name: '', phone: '', email: '' }],
  );

  const [insurance, setInsurance] = useState<InsuranceDetails>({
    professionalIndemnityInsurer: '',
    publicLiabilityInsurer: '',
    piPolicyNumber: '',
    plPolicyNumber: '',
    piExpiryDate: '',
    plExpiryDate: '',
  });

  const [territory, setTerritory] = useState<TerritorySettings>({
    centerAddress: '',
    radiusKm: 25,
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
          centerAddress: data.company.registeredAddress?.street || '',
          centerLat: t.centerPoint?.lat,
          centerLng: t.centerPoint?.lng,
          radiusKm: t.radiusKm || 25,
        });
      }
    }
  }, [data]);

  // Verify ABN with external service
  const verifyABN = async () => {
    const abn = data.company?.abn?.replace(/\D/g, '');
    if (!abn || !validateABN(abn)) {
      alert('Please enter a valid ABN');
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
        alert('ABN verification failed. Please check your ABN.');
      }
    } catch (error) {
      clientLogger.error('ABN verification error:', { source: 'steps/Step2Company' }, error);
    } finally {
      setVerifyingAbn(false);
    }
  };

  // Verify address with geocoding
  const verifyAddress = async () => {
    const address = data.company?.registeredAddress;
    if (!address?.street || !address?.city || !address?.state || !address?.postcode) {
      alert('Please complete all address fields');
      return;
    }

    const fullAddress = `${address.street}, ${address.city}, ${address.state} ${address.postcode}`;

    try {
      const response = await fetch(
        `/api/contractor/geocode?address=${encodeURIComponent(fullAddress)}`,
      );
      const result = await response.json();

      if (result.success) {
        setTerritory((prev) => ({
          ...prev,
          centerAddress: fullAddress,
          centerLat: result.lat,
          centerLng: result.lng,
        }));
        setAddressVerified(true);
      }
    } catch (error) {
      clientLogger.error('Address verification error:', { source: 'steps/Step2Company' }, error);
    }
  };

  // Handle director changes
  const updateDirector = (index: number, field: keyof Director, value: string) => {
    const newDirectors = [...directors];
    newDirectors[index][field] = value;
    setDirectors(newDirectors);

    // Update main data
    const formattedDirectors = newDirectors
      .filter((d) => d.name)
      .map((d) => {
        const [firstName, ...lastNameParts] = d.name.split(' ');
        return {
          firstName: firstName || '',
          lastName: lastNameParts.join(' ') || '',
          position: 'Director',
          email: d.email,
          phone: d.phone,
          directorId: '',
        };
      });

    updateData({
      company: {
        ...data.company,
        directors: formattedDirectors,
      } as ContractorOnboardingData['company'],
    });
  };

  const addDirector = () => {
    setDirectors([...directors, { name: '', phone: '', email: '' }]);
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
      const validFiles = Array.from(files).filter(
        (file) => file.type === 'application/pdf' || file.type.startsWith('image/'),
      );
      setCertificateFiles((prev) => [...prev, ...validFiles]);
    }
  };

  const handleLogoUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
      setLogoFile(file);
    }
  };

  const removeCertificate = (index: number) => {
    setCertificateFiles((prev) => prev.filter((_, i) => i !== index));
  };

  // Update main data when local state changes
  const handleInputChange = (field: string, value: unknown) => {
    if (field.startsWith('company.')) {
      const companyField = field.replace('company.', '');
      updateData({
        company: {
          ...data.company,
          [companyField]: value,
        } as ContractorOnboardingData['company'],
      });
    } else {
      updateData({ [field]: value } as Partial<ContractorOnboardingData>);
    }
  };

  return {
    directors,
    insurance,
    setInsurance,
    territory,
    setTerritory,
    certificateFiles,
    logoFile,
    abnVerified,
    verifyingAbn,
    addressVerified,
    handleInputChange,
    verifyABN,
    verifyAddress,
    updateDirector,
    addDirector,
    removeDirector,
    handleCertificateUpload,
    handleLogoUpload,
    removeCertificate,
  };
}
