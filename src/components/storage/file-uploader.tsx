'use client';

import { useState, useRef } from 'react';
import { useFileUpload } from '@/hooks/useFileUpload';
import type { FileCategory } from '@/lib/storage/storage-manager';

interface FileUploaderProps {
  category: FileCategory;
  userId: string;
  onUploadComplete?: (fileIds: string[]) => void;
  maxFiles?: number;
  maxSize?: number; // bytes
  acceptedTypes?: string[];
  multiple?: boolean;
}

/**
 * FileUploader Component
 *
 * Drag-and-drop file upload interface
 */
export function FileUploader({
  category,
  userId,
  onUploadComplete,
  maxFiles = 10,
  maxSize = 100 * 1024 * 1024, // 100MB
  acceptedTypes = [],
  multiple = true,
}: FileUploaderProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { uploadProgress, isUploading, uploadBatch, cancelUpload, clearProgress } = useFileUpload({
    category,
    userId,
  });

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const files = Array.from(e.dataTransfer.files);
    handleFileSelection(files);
  };

  const handleFileSelection = (files: File[]) => {
    let validFiles = files;

    // Validate file count
    if (!multiple && files.length > 1) {
      alert('Only one file allowed');
      return;
    }

    if (validFiles.length > maxFiles) {
      alert(`Maximum ${maxFiles} files allowed`);
      validFiles = validFiles.slice(0, maxFiles);
    }

    // Validate file size
    validFiles = validFiles.filter((file) => {
      if (file.size > maxSize) {
        alert(`${file.name} exceeds size limit`);
        return false;
      }
      return true;
    });

    // Validate file type
    if (acceptedTypes.length > 0) {
      validFiles = validFiles.filter((file) => {
        const ext = file.name.split('.').pop()?.toLowerCase();
        if (!acceptedTypes.includes(ext || '')) {
          alert(`${file.name} has invalid type`);
          return false;
        }
        return true;
      });
    }

    setSelectedFiles(validFiles);
  };

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFileSelection(Array.from(e.target.files));
    }
  };

  const handleUpload = async () => {
    if (selectedFiles.length === 0) return;

    const result = await uploadBatch(selectedFiles);

    if (result.success) {
      onUploadComplete?.(
        selectedFiles
          .filter((_, i) => !result.errors[selectedFiles[i].name])
          .map((_, i) => `file-${i}`)
      );
      setSelectedFiles([]);
    }
  };

  const handleClear = () => {
    setSelectedFiles([]);
    clearProgress();
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const uploadedCount = Object.values(uploadProgress).filter(
    (p) => p.status === 'completed' || p.status === 'processing'
  ).length;

  return (
    <div className="space-y-4">
      {/* Upload Area */}
      <div
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
        onClick={() => fileInputRef.current?.click()}
        className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
          isDragging
            ? 'border-blue-500 bg-blue-50'
            : 'border-gray-300 hover:border-gray-400'
        }`}
      >
        <input
          ref={fileInputRef}
          type="file"
          multiple={multiple}
          onChange={handleFileInputChange}
          accept={acceptedTypes.length > 0 ? acceptedTypes.join(',') : undefined}
          className="hidden"
        />

        <svg
          className="w-12 h-12 mx-auto mb-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1.5}
            d="M12 16.5V9.75m0 0l3 3m-3-3l-3 3M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z"
          />
        </svg>

        <p className="text-gray-600 font-medium">
          Drag files here or click to select
        </p>
        <p className="text-sm text-gray-500 mt-1">
          Max {maxSize / 1024 / 1024}MB per file
        </p>
      </div>

      {/* Selected Files */}
      {selectedFiles.length > 0 && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">
            Ready to upload ({selectedFiles.length} file{selectedFiles.length !== 1 ? 's' : ''})
          </h3>

          <div className="space-y-2 mb-4 max-h-64 overflow-y-auto">
            {selectedFiles.map((file) => (
              <div
                key={file.name}
                className="flex items-center justify-between p-2 bg-gray-50 rounded"
              >
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {file.name}
                  </p>
                  <p className="text-xs text-gray-500">
                    {(file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>

                <svg className="w-5 h-5 text-green-500 ml-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <button
              onClick={handleUpload}
              disabled={isUploading}
              className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 disabled:bg-gray-400 text-white font-medium rounded-lg transition-colors"
            >
              {isUploading ? 'Uploading...' : 'Upload'}
            </button>

            <button
              onClick={handleClear}
              disabled={isUploading}
              className="px-4 py-2 bg-gray-200 hover:bg-gray-300 disabled:bg-gray-100 text-gray-700 font-medium rounded-lg transition-colors"
            >
              Clear
            </button>
          </div>
        </div>
      )}

      {/* Upload Progress */}
      {Object.keys(uploadProgress).length > 0 && (
        <div className="border border-gray-200 rounded-lg p-4">
          <h3 className="font-semibold text-gray-900 mb-3">
            Upload Progress ({uploadedCount}/{Object.keys(uploadProgress).length})
          </h3>

          <div className="space-y-3">
            {Object.entries(uploadProgress).map(([filename, progress]) => (
              <div key={filename} className="space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-900 truncate">
                    {filename}
                  </span>

                  {progress.status === 'completed' ? (
                    <span className="text-xs text-green-600 font-semibold">Complete</span>
                  ) : progress.status === 'processing' ? (
                    <span className="text-xs text-blue-600 font-semibold">Processing</span>
                  ) : progress.status === 'failed' ? (
                    <span className="text-xs text-red-600 font-semibold">Failed</span>
                  ) : (
                    <span className="text-xs text-gray-600 font-semibold">{progress.progress}%</span>
                  )}
                </div>

                <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full transition-all ${
                      progress.status === 'completed'
                        ? 'bg-green-600'
                        : progress.status === 'processing'
                          ? 'bg-blue-600'
                          : progress.status === 'failed'
                            ? 'bg-red-600'
                            : 'bg-blue-600'
                    }`}
                    style={{ width: `${progress.progress}%` }}
                  />
                </div>

                {progress.error && (
                  <p className="text-xs text-red-600">{progress.error}</p>
                )}

                {progress.status === 'uploading' && (
                  <button
                    onClick={() => cancelUpload(filename)}
                    className="text-xs text-gray-500 hover:text-gray-700"
                  >
                    Cancel
                  </button>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
