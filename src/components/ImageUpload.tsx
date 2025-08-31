'use client';

import React, { useState, useCallback } from 'react';
import imageCompression from 'browser-image-compression';

interface ImageUploadProps {
  onUploadSuccess?: (data: any) => void;
  onUploadError?: (error: Error) => void;
  maxSizeMB?: number;
  maxWidthOrHeight?: number;
  quality?: number;
  acceptedFormats?: string;
  multiple?: boolean;
}

interface UploadStatus {
  isUploading: boolean;
  progress: number;
  error: string | null;
  success: boolean;
}

export default function ImageUpload({
  onUploadSuccess,
  onUploadError,
  maxSizeMB = 2,
  maxWidthOrHeight = 1920,
  quality = 0.85,
  acceptedFormats = 'image/*',
  multiple = false }: ImageUploadProps) {
  const [status, setStatus] = useState<UploadStatus>({
    isUploading: false,
    progress: 0,
    error: null,
    success: false });
  
  const [preview, setPreview] = useState<string | null>(null);
  const [stats, setStats] = useState<any>(null);

  const handleFileSelect = useCallback(async (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    setStatus({ isUploading: true, progress: 10, error: null, success: false });
    setStats(null);

    try {
      // Process first file (extend for multiple files if needed)
      const file = files[0];
      
      // Show original file size
      const originalSizeKB = (file.size / 1024).toFixed(2);
      console.log(`Original file size: ${originalSizeKB} KB`);

      // Client-side compression options
      const compressionOptions = {
        maxSizeMB,
        maxWidthOrHeight,
        useWebWorker: true,
        onProgress: (progress: number) => {
          setStatus(prev => ({ ...prev, progress: Math.min(50, progress / 2) }));
        } };

      setStatus(prev => ({ ...prev, progress: 20 }));

      // Compress image client-side first
      const compressedFile = await imageCompression(file, compressionOptions);
      const compressedSizeKB = (compressedFile.size / 1024).toFixed(2);
      console.log(`Client compressed size: ${compressedSizeKB} KB`);

      setStatus(prev => ({ ...prev, progress: 50 }));

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreview(e.target?.result as string);
      };
      reader.readAsDataURL(compressedFile);

      // Prepare form data for server upload
      const formData = new FormData();
      formData.append('file', compressedFile);
      formData.append('quality', quality.toString());
      formData.append('maxWidth', maxWidthOrHeight.toString());
      formData.append('format', 'webp'); // Default to WebP for best compression

      setStatus(prev => ({ ...prev, progress: 70 }));

      // Upload to server for additional optimization
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData });

      setStatus(prev => ({ ...prev, progress: 90 }));

      if (!response.ok) {
        throw new Error(`Upload failed: ${response.statusText}`);
      }

      const data = await response.json();
      
      setStatus({ isUploading: false, progress: 100, error: null, success: true });
      setStats(data.stats);

      // Call success callback
      if (onUploadSuccess) {
        onUploadSuccess(data);
      }

      // Reset after 3 seconds
      setTimeout(() => {
        setStatus({ isUploading: false, progress: 0, error: null, success: false });
      }, 3000);

    } catch (error) {
      console.error('Upload error:', error);
      const errorMessage = error instanceof Error ? error.message : 'Upload failed';
      setStatus({ isUploading: false, progress: 0, error: errorMessage, success: false });
      
      if (onUploadError) {
        onUploadError(error as Error);
      }
    }
  }, [maxSizeMB, maxWidthOrHeight, quality, onUploadSuccess, onUploadError]);

  return (
    <div className="w-full max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="mb-4">
        <label 
          htmlFor="image-upload" 
          className="block text-sm font-medium text-gray-700 mb-2"
        >
          Upload Image
        </label>
        
        <input
          id="image-upload"
          type="file"
          accept={acceptedFormats}
          multiple={multiple}
          onChange={handleFileSelect}
          disabled={status.isUploading}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-blue-50 file:text-blue-700
            hover:file:bg-blue-100
            disabled:opacity-50 disabled:cursor-not-allowed"
        />
      </div>

      {/* Progress Bar */}
      {status.isUploading && (
        <div className="mb-4">
          <div className="flex justify-between text-sm text-gray-600 mb-1">
            <span>Uploading...</span>
            <span>{status.progress}%</span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <div 
              className="bg-blue-600 h-2 rounded-full transition-all duration-300"
              style={{ width: `${status.progress}%` }}
            />
          </div>
        </div>
      )}

      {/* Success Message */}
      {status.success && (
        <div className="mb-4 p-3 bg-green-100 border border-green-400 text-green-700 rounded">
          <p className="font-semibold">✓ Upload successful!</p>
          {stats && (
            <div className="mt-2 text-sm">
              <p>Original: {stats.originalSize}</p>
              <p>Optimized: {stats.optimizedSize}</p>
              <p>Saved: {stats.reduction} ({stats.reductionPercent})</p>
            </div>
          )}
        </div>
      )}

      {/* Error Message */}
      {status.error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          <p className="font-semibold">✗ Upload failed</p>
          <p className="text-sm mt-1">{status.error}</p>
        </div>
      )}

      {/* Preview */}
      {preview && (
        <div className="mt-4">
          <p className="text-sm font-medium text-gray-700 mb-2">Preview:</p>
          <img 
            src={preview} 
            alt="Upload preview" 
            className="w-full h-48 object-cover rounded-lg border border-gray-300"
          />
        </div>
      )}

      {/* Info */}
      <div className="mt-4 text-xs text-gray-500">
        <p>• Maximum size: {maxSizeMB}MB</p>
        <p>• Maximum dimensions: {maxWidthOrHeight}px</p>
        <p>• Images are automatically compressed</p>
      </div>
    </div>
  );
}