import { useState } from 'react';
import type {
  AssociationState,
  IICRCCertification,
  OtherQualification,
  Step3Control,
  ValidationStatus,
} from './types';

/**
 * Form-state + validation hook for Step3Compliance.
 *
 * Pure refactor: every state shape, setter, and side-effect is preserved
 * byte-for-byte from the pre-decomposition orchestrator. Do not "fix"
 * the stale-closure quirks in handleAssociationUpload / setAssociationName
 * etc. — they were present in the original and changing them would be a
 * behaviour change, not a refactor.
 */
export function useStep3Compliance(errors: Record<string, string>): Step3Control {
  // Main CPP40421 Certificate
  const [cpp40421File, setCpp40421File] = useState<File | null>(null);
  const [cpp40421Number, setCpp40421Number] = useState('');
  const [cpp40421Issuer, setCpp40421Issuer] = useState('');
  const [cpp40421Date, setCpp40421Date] = useState('');

  // IICRC Certifications
  const [iicrcCerts, setIicrcCerts] = useState<IICRCCertification[]>([
    { name: '', file: null, expiryDate: '', certNumber: '' },
  ]);

  // Industry Association
  const [association, setAssociation] = useState<AssociationState>({
    name: '',
    file: null,
    memberNumber: '',
    expiryDate: '',
  });

  // CARSI Training
  const [carsiFile, setCarsiFile] = useState<File | null>(null);
  const [carsiCompletionDate, setCarsiCompletionDate] = useState('');
  const [carsiScore, setCarsiScore] = useState('');

  // Other Qualifications
  const [otherQualifications, setOtherQualifications] = useState<OtherQualification[]>([]);

  // Validation states
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>({
    cpp40421: false,
    iicrc: false,
    association: false,
    carsi: false,
  });

  // Handle CPP40421 upload
  const handleCpp40421Upload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setCpp40421File(file);
      setValidationStatus((prev) => ({ ...prev, cpp40421: true }));
    }
  };

  // Handle IICRC certification updates
  const updateIicrcCert = (index: number, field: keyof IICRCCertification, value: any) => {
    const newCerts = [...iicrcCerts];
    newCerts[index] = { ...newCerts[index], [field]: value };
    setIicrcCerts(newCerts);

    // Check if any cert is complete
    const hasCompleteCert = newCerts.some((cert) => cert.name && cert.file);
    setValidationStatus((prev) => ({ ...prev, iicrc: hasCompleteCert }));
  };

  const addIicrcCert = () => {
    setIicrcCerts([...iicrcCerts, { name: '', file: null, expiryDate: '', certNumber: '' }]);
  };

  const removeIicrcCert = (index: number) => {
    if (iicrcCerts.length > 1) {
      const newCerts = iicrcCerts.filter((_, i) => i !== index);
      setIicrcCerts(newCerts);
    }
  };

  // Handle association file upload
  const handleAssociationUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setAssociation({ ...association, file });
      if (association.name && association.memberNumber) {
        setValidationStatus((prev) => ({ ...prev, association: true }));
      }
    }
  };

  const setAssociationName = (value: string) => {
    setAssociation({ ...association, name: value });
    if (value && association.file && association.memberNumber) {
      setValidationStatus((prev) => ({ ...prev, association: true }));
    }
  };

  const setAssociationMemberNumber = (value: string) => {
    setAssociation({ ...association, memberNumber: value });
    if (association.name && association.file && value) {
      setValidationStatus((prev) => ({ ...prev, association: true }));
    }
  };

  const setAssociationExpiryDate = (value: string) => {
    setAssociation({ ...association, expiryDate: value });
  };

  // Handle CARSI upload
  const handleCarsiUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setCarsiFile(file);
      setValidationStatus((prev) => ({ ...prev, carsi: true }));
    }
  };

  // Handle other qualifications
  const addOtherQualification = () => {
    setOtherQualifications([...otherQualifications, { name: '', file: null, issuer: '' }]);
  };

  const updateOtherQualification = (
    index: number,
    field: keyof OtherQualification,
    value: any,
  ) => {
    const newQuals = [...otherQualifications];
    newQuals[index] = { ...newQuals[index], [field]: value };
    setOtherQualifications(newQuals);
  };

  const removeOtherQualification = (index: number) => {
    const newQuals = otherQualifications.filter((_, i) => i !== index);
    setOtherQualifications(newQuals);
  };

  // Calculate compliance score
  const complianceScore = (() => {
    let score = 0;
    if (validationStatus.cpp40421) score += 40;
    if (validationStatus.iicrc) score += 30;
    if (validationStatus.association) score += 20;
    if (validationStatus.carsi) score += 10;
    return score;
  })();

  return {
    errors,
    cpp40421File,
    cpp40421Number,
    cpp40421Issuer,
    cpp40421Date,
    setCpp40421Number,
    setCpp40421Issuer,
    setCpp40421Date,
    handleCpp40421Upload,
    iicrcCerts,
    updateIicrcCert,
    addIicrcCert,
    removeIicrcCert,
    association,
    setAssociationName,
    setAssociationMemberNumber,
    setAssociationExpiryDate,
    handleAssociationUpload,
    carsiFile,
    carsiCompletionDate,
    carsiScore,
    setCarsiCompletionDate,
    setCarsiScore,
    handleCarsiUpload,
    otherQualifications,
    addOtherQualification,
    updateOtherQualification,
    removeOtherQualification,
    validationStatus,
    complianceScore,
  };
}
