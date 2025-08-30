'use client';

import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { Upload, File, AlertTriangle, CheckCircle, Clock, X, Eye } from 'lucide-react';

interface AnalysisResult {
  isAuthentic: boolean;
  confidenceScore: number;
  suspiciousElements: string[];
  recommendedAction: 'APPROVE' | 'REVIEW' | 'REJECT';
  analysisDetails: {
    documentType: string;
    contentAnalysis: string;
    plagiarismCheck: string;
    consistencyCheck: string;
    metadataAnalysis: string;
  };
  riskFactors: Array<{
    category: string;
    severity: 'LOW' | 'MEDIUM' | 'HIGH';
    description: string;
    evidence: string;
  }>;
}

interface DocumentUploadProps {
  contractorId: string;
  documentType: 'INSURANCE_POLICY' | 'BUSINESS_LICENSE' | 'CERTIFICATION' | 'PROOF_OF_WORK' | 'FINANCIAL_STATEMENT' | 'OTHER';
  title: string;
  description: string;
  required?: boolean;
  maxSize?: number;
  acceptedFileTypes?: string[];
  onUploadComplete?: (result: any) => void;
}

interface UploadState {
  uploading: boolean;
  analysing: boolean;
  analysisResult: AnalysisResult | null;
  error: string | null;
  progress: number;
}

export default function DocumentUpload({
  contractorId,
  documentType,
  title,
  description,
  required = false,
  maxSize = 10 * 1024 * 1024, // 10MB default
  acceptedFileTypes = ['application/pdf', 'image/jpeg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'],
  onUploadComplete
}: DocumentUploadProps) {
  const [uploadState, setUploadState] = useState<UploadState>({
    uploading: false,
    analysing: false,
    analysisResult: null,
    error: null,
    progress: 0
  });
  
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [showAnalysisDetails, setShowAnalysisDetails] = useState(false);

  const extractTextFromFile = async (file: File): Promise<string> => {
    return new Promise((resolve) => {
      if (file.type.startsWith('image/')) {
        // In production, this would use OCR service like Tesseract.js or cloud OCR
        resolve(`[OCR extraction would be implemented here for ${file.name}]`);
      } else if (file.type === 'application/pdf') {
        // In production, this would use PDF.js or similar
        resolve(`[PDF text extraction would be implemented here for ${file.name}]`);
      } else {
        // For text-based files, read as text
        const reader = new FileReader();
        reader.onload = (e) => {
          resolve(e.target?.result as string || '');
        };
        reader.readAsText(file);
      }
    });
  };

  const uploadDocument = async (file: File): Promise<string> => {
    // Simulate file upload - in production this would upload to S3/cloud storage
    return new Promise((resolve) => {
      const interval = setInterval(() => {
        setUploadState(prev => ({
          ...prev,
          progress: Math.min(prev.progress + 10, 90)
        }));
      }, 100);

      setTimeout(() => {
        clearInterval(interval);
        setUploadState(prev => ({ ...prev, progress: 100 }));
        resolve(`/uploads/contractor-documents/${contractorId}/${file.name}`);
      }, 1000);
    });
  };

  const analyzeDocument = async (file: File, documentUrl: string): Promise<AnalysisResult> => {
    const content = await extractTextFromFile(file);
    
    const response = await fetch('/api/fraud-detection/analyse', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contractorId,
        documentType,
        content,
        metadata: {
          filename: file.name,
          fileSize: file.size,
          fileType: file.type,
          documentUrl,
        }
      }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.error || 'Analysis failed');
    }

    const data = await response.json();
    return data.analysis;
  };

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length === 0) return;
    
    const file = acceptedFiles[0];
    
    if (file.size > maxSize) {
      setUploadState(prev => ({
        ...prev,
        error: `File size must be less than ${(maxSize / 1024 / 1024).toFixed(1)}MB`
      }));
      return;
    }

    setUploadedFile(file);
    setUploadState({
      uploading: true,
      analysing: false,
      analysisResult: null,
      error: null,
      progress: 0
    });

    try {
      // Step 1: Upload file
      const documentUrl = await uploadDocument(file);
      
      setUploadState(prev => ({
        ...prev,
        uploading: false,
        analysing: true,
        progress: 0
      }));

      // Step 2: Analyse for fraud
      const analysisResult = await analyzeDocument(file, documentUrl);
      
      setUploadState(prev => ({
        ...prev,
        analysing: false,
        analysisResult,
        error: null
      }));

      // Notify parent component
      if (onUploadComplete) {
        onUploadComplete({
          file,
          documentUrl,
          analysisResult
        });
      }

    } catch (error) {
      setUploadState(prev => ({
        ...prev,
        uploading: false,
        analysing: false,
        error: error instanceof Error ? error.message : 'Upload failed'
      }));
    }
  }, [contractorId, documentType, maxSize, onUploadComplete]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: acceptedFileTypes.reduce((acc, type) => {
      acc[type] = [];
      return acc;
    }, {} as Record<string, string[]>),
    maxFiles: 1,
    disabled: uploadState.uploading || uploadState.analysing
  });

  const getStatusColor = (action: string) => {
    switch (action) {
      case 'APPROVE': return 'text-green-600 bg-green-100';
      case 'REVIEW': return 'text-yellow-600 bg-yellow-100';
      case 'REJECT': return 'text-red-600 bg-red-100';
      default: return 'text-gray-600 bg-gray-100';
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'HIGH': return 'text-red-600';
      case 'MEDIUM': return 'text-yellow-600';
      case 'LOW': return 'text-green-600';
      default: return 'text-gray-600';
    }
  };

  const reset = () => {
    setUploadedFile(null);
    setUploadState({
      uploading: false,
      analysing: false,
      analysisResult: null,
      error: null,
      progress: 0
    });
    setShowAnalysisDetails(false);
  };

  return (
    <div className="border border-gray-200 rounded-lg p-6 space-y-4">
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">
            {title}
            {required && <span className="text-red-500 ml-1">*</span>}
          </h3>
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        </div>
        
        {uploadedFile && !uploadState.uploading && !uploadState.analysing && (
          <button
            onClick={reset}
            className="text-gray-400 hover:text-gray-600"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {!uploadedFile ? (
        <div
          {...getRootProps()}
          className={`
            border-2 border-dashed border-gray-300 rounded-lg p-8 text-center cursor-pointer transition-colours
            ${isDragActive ? 'border-blue-500 bg-blue-50' : 'hover:border-gray-400'}
            ${uploadState.uploading || uploadState.analysing ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          <input {...getInputProps()} />
          <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
          <p className="text-lg font-medium text-gray-900 mb-2">
            {isDragActive ? 'Drop file here' : 'Upload Document'}
          </p>
          <p className="text-sm text-gray-600">
            Drag and drop or click to select file
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Accepted: PDF, JPEG, PNG, DOC, DOCX (Max {(maxSize / 1024 / 1024).toFixed(1)}MB)
          </p>
        </div>
      ) : (
        <div className="space-y-4">
          {/* File Info */}
          <div className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg">
            <File className="w-8 h-8 text-blue-600" />
            <div className="flex-1">
              <p className="font-medium text-gray-900">{uploadedFile.name}</p>
              <p className="text-sm text-gray-600">
                {(uploadedFile.size / 1024 / 1024).toFixed(2)} MB • {uploadedFile.type}
              </p>
            </div>
          </div>

          {/* Upload Progress */}
          {uploadState.uploading && (
            <div className="space-y-2">
              <div className="flex items-center justify-between text-sm">
                <span className="text-gray-600">Uploading...</span>
                <span className="text-gray-600">{uploadState.progress}%</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2">
                <div
                  className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                  style={{ width: `${uploadState.progress}%` }}
                ></div>
              </div>
            </div>
          )}

          {/* Analysis Progress */}
          {uploadState.analysing && (
            <div className="flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 rounded-lg">
              <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
              <div>
                <p className="font-medium text-blue-900">Analysing Document</p>
                <p className="text-sm text-blue-700">
                  Running fraud detection and authenticity checks...
                </p>
              </div>
            </div>
          )}

          {/* Analysis Results */}
          {uploadState.analysisResult && (
            <div className="space-y-4">
              <div className={`
                p-4 rounded-lg border-2
                ${uploadState.analysisResult.recommendedAction === 'APPROVE' ? 'bg-green-50 border-green-200' : 
                  uploadState.analysisResult.recommendedAction === 'REVIEW' ? 'bg-yellow-50 border-yellow-200' : 
                  'bg-red-50 border-red-200'}
              `}>
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2">
                    {uploadState.analysisResult.recommendedAction === 'APPROVE' ? (
                      <CheckCircle className="w-6 h-6 text-green-600" />
                    ) : uploadState.analysisResult.recommendedAction === 'REVIEW' ? (
                      <Clock className="w-6 h-6 text-yellow-600" />
                    ) : (
                      <AlertTriangle className="w-6 h-6 text-red-600" />
                    )}
                    <h4 className="font-semibold text-gray-900">
                      Analysis Complete
                    </h4>
                  </div>
                  <div className={`
                    px-3 py-1 rounded-full text-sm font-medium
                    ${getStatusColor(uploadState.analysisResult.recommendedAction)}
                  `}>
                    {uploadState.analysisResult.recommendedAction}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 mb-3">
                  <div>
                    <p className="text-sm font-medium text-gray-700">Confidence Score</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {uploadState.analysisResult.confidenceScore}%
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">Risk Factors</p>
                    <p className="text-2xl font-bold text-gray-900">
                      {uploadState.analysisResult.riskFactors.length}
                    </p>
                  </div>
                </div>

                {uploadState.analysisResult.suspiciousElements.length > 0 && (
                  <div className="mb-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Concerns:</p>
                    <ul className="list-disc list-inside text-sm text-gray-600 space-y-1">
                      {uploadState.analysisResult.suspiciousElements.map((element, index) => (
                        <li key={index}>{element}</li>
                      ))}
                    </ul>
                  </div>
                )}

                <button
                  onClick={() => setShowAnalysisDetails(!showAnalysisDetails)}
                  className="flex items-center gap-2 text-sm text-blue-600 hover:text-blue-800"
                >
                  <Eye className="w-4 h-4" />
                  {showAnalysisDetails ? 'Hide' : 'View'} Detailed Analysis
                </button>
              </div>

              {/* Detailed Analysis */}
              {showAnalysisDetails && (
                <div className="bg-white border border-gray-200 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-900 mb-4">Detailed Analysis</h5>
                  
                  <div className="space-y-4">
                    <div>
                      <h6 className="font-medium text-gray-700 mb-2">Content Analysis</h6>
                      <p className="text-sm text-gray-600">
                        {uploadState.analysisResult.analysisDetails.contentAnalysis}
                      </p>
                    </div>
                    
                    <div>
                      <h6 className="font-medium text-gray-700 mb-2">Plagiarism Check</h6>
                      <p className="text-sm text-gray-600">
                        {uploadState.analysisResult.analysisDetails.plagiarismCheck}
                      </p>
                    </div>

                    <div>
                      <h6 className="font-medium text-gray-700 mb-2">Risk Factors</h6>
                      <div className="space-y-2">
                        {uploadState.analysisResult.riskFactors.map((factor, index) => (
                          <div key={index} className="flex items-start gap-3 p-3 bg-gray-50 rounded">
                            <span className={`
                              px-2 py-1 rounded text-xs font-medium
                              ${getSeverityColor(factor.severity)}
                            `}>
                              {factor.severity}
                            </span>
                            <div className="flex-1">
                              <p className="font-medium text-gray-900">{factor.description}</p>
                              <p className="text-sm text-gray-600">{factor.evidence}</p>
                              <p className="text-xs text-gray-500 mt-1">Category: {factor.category}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Error Display */}
          {uploadState.error && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
              <div className="flex items-center gap-2">
                <AlertTriangle className="w-5 h-5 text-red-600" />
                <p className="text-red-800 font-medium">Upload Failed</p>
              </div>
              <p className="text-sm text-red-600 mt-1">{uploadState.error}</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}