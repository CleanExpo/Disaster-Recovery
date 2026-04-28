import { useState } from 'react';
import type {
  BusinessReference,
  IdVerificationStatus,
  ProjectSummary,
  Step4Control,
  ValidationStatus,
} from './types';

const emptyReference = (): BusinessReference => ({
  name: '',
  relationship: '',
  companyName: '',

  email: '',
  projectDescription: '',
  canContact: true,
});

export function useStep4Background(errors: Record<string, string>): Step4Control {
  // Consent states
  const [backgroundCheckConsent, setBackgroundCheckConsent] = useState(false);
  const [creditCriminalConsent, setCreditCriminalConsent] = useState(false);
  const [dataPrivacyConsent, setDataPrivacyConsent] = useState(false);

  // Director ID files
  const [directorIdFiles, setDirectorIdFiles] = useState<File[]>([]);
  const [idVerificationStatus, setIdVerificationStatus] =
    useState<IdVerificationStatus>('pending');

  // Business references
  const [references, setReferences] = useState<BusinessReference[]>([
    emptyReference(),
    emptyReference(),
  ]);

  // Project portfolio
  const [projectSummaryFile, setProjectSummaryFile] = useState<File | null>(null);
  const [projectPhotos, setProjectPhotos] = useState<File[]>([]);
  const [recentProjects, setRecentProjects] = useState<ProjectSummary[]>([]);

  // Validation tracking
  const [validationStatus, setValidationStatus] = useState<ValidationStatus>({
    consents: false,
    directorId: false,
    references: false,
    portfolio: false,
  });

  // Handle director ID upload
  const handleDirectorIdUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter(
        (file) => file.type === 'application/pdf' || file.type.startsWith('image/'),
      );
      setDirectorIdFiles((prev) => [...prev, ...validFiles]);
      setIdVerificationStatus('uploaded');
      setValidationStatus((prev) => ({ ...prev, directorId: true }));
    }
  };

  const removeDirectorIdFile = (index: number) => {
    const newFiles = directorIdFiles.filter((_, i) => i !== index);
    setDirectorIdFiles(newFiles);
    if (newFiles.length === 0) {
      setIdVerificationStatus('pending');
      setValidationStatus((prev) => ({ ...prev, directorId: false }));
    }
  };

  // Handle reference updates
  const updateReference = (
    index: number,
    field: keyof BusinessReference,
    value: any,
  ) => {
    const newRefs = [...references];
    newRefs[index] = { ...newRefs[index], [field]: value };
    setReferences(newRefs);

    // Validate references (need at least 2 complete references)
    const completeRefs = newRefs.filter(
      (ref) => ref.name && ref.relationship && ref.phone && ref.companyName,
    );
    setValidationStatus((prev) => ({
      ...prev,
      references: completeRefs.length >= 2,
    }));
  };

  const addReference = () => {
    setReferences([...references, emptyReference()]);
  };

  const removeReference = (index: number) => {
    if (references.length > 2) {
      const newRefs = references.filter((_, i) => i !== index);
      setReferences(newRefs);
    }
  };

  // Handle project portfolio upload
  const handleProjectSummaryUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file && (file.type === 'application/pdf' || file.type.startsWith('image/'))) {
      setProjectSummaryFile(file);
      setValidationStatus((prev) => ({ ...prev, portfolio: true }));
    }
  };

  const handleProjectPhotosUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files) {
      const validFiles = Array.from(files).filter((file) =>
        file.type.startsWith('image/'),
      );
      setProjectPhotos((prev) => [...prev, ...validFiles]);
    }
  };

  const removeProjectPhoto = (index: number) => {
    setProjectPhotos((prev) => prev.filter((_, i) => i !== index));
  };

  // Recent projects
  const addRecentProject = () => {
    setRecentProjects([
      ...recentProjects,
      {
        projectName: '',
        clientName: '',
        projectType: '',
        completionDate: '',
        projectValue: '',
        description: '',
      },
    ]);
  };

  const updateRecentProject = (
    index: number,
    field: keyof ProjectSummary,
    value: string,
  ) => {
    const newProjects = [...recentProjects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setRecentProjects(newProjects);
  };

  const removeRecentProject = (index: number) => {
    setRecentProjects((prev) => prev.filter((_, i) => i !== index));
  };

  // Update consent validation
  const updateConsents = () => {
    const allConsents =
      backgroundCheckConsent && creditCriminalConsent && dataPrivacyConsent;
    setValidationStatus((prev) => ({ ...prev, consents: allConsents }));
  };

  // Calculate completion percentage
  const calculateCompletion = (): number => {
    let score = 0;
    if (validationStatus.consents) score += 25;
    if (validationStatus.directorId) score += 25;
    if (validationStatus.references) score += 25;
    if (validationStatus.portfolio) score += 25;
    return score;
  };

  return {
    errors,
    backgroundCheckConsent,
    setBackgroundCheckConsent,
    creditCriminalConsent,
    setCreditCriminalConsent,
    dataPrivacyConsent,
    setDataPrivacyConsent,
    updateConsents,
    directorIdFiles,
    idVerificationStatus,
    handleDirectorIdUpload,
    removeDirectorIdFile,
    references,
    updateReference,
    addReference,
    removeReference,
    projectSummaryFile,
    projectPhotos,
    recentProjects,
    handleProjectSummaryUpload,
    handleProjectPhotosUpload,
    removeProjectPhoto,
    addRecentProject,
    updateRecentProject,
    removeRecentProject,
    validationStatus,
    calculateCompletion,
  };
}
