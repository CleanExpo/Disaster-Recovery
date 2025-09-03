'use client';

import React, { useState, useCallback, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Upload, X, FileText, Image, Video, Music, Archive,
  File, CheckCircle, AlertCircle, Loader2, Pause, Play,
  RotateCcw, Trash2, Eye, Download, Cloud, HardDrive
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { useDropzone } from 'react-dropzone';
import axios from 'axios';

interface UploadFile {
  id: string;
  file: File;
  name: string;
  size: number;
  type: string;
  progress: number;
  status: 'pending' | 'uploading' | 'paused' | 'completed' | 'error';
  uploadedSize: number;
  speed?: number;
  timeRemaining?: number;
  url?: string;
  error?: string;
  controller?: AbortController;
}

interface FileUploadProgressProps {
  endpoint?: string;
  maxFiles?: number;
  maxSize?: number; // in bytes
  acceptedTypes?: string[];
  onUploadComplete?: (files: UploadFile[]) => void;
  onError?: (error: string) => void;
  multiple?: boolean;
  autoUpload?: boolean;
}

export const FileUploadProgress: React.FC<FileUploadProgressProps> = ({
  endpoint = '/api/upload',
  maxFiles = 10,
  maxSize = 10 * 1024 * 1024, // 10MB default
  acceptedTypes = ['image/*', 'application/pdf', '.doc', '.docx', '.xls', '.xlsx'],
  onUploadComplete,
  onError,
  multiple = true,
  autoUpload = true
}) => {
  const [files, setFiles] = useState<UploadFile[]>([]);
  const [isUploading, setIsUploading] = useState(false);
  const uploadIntervals = useRef<{ [key: string]: NodeJS.Timeout }>({});

  // File icon based on type
  const getFileIcon = (type: string) => {
    if (type.startsWith('image/')) return <Image className="w-5 h-5" />;
    if (type.startsWith('video/')) return <Video className="w-5 h-5" />;
    if (type.startsWith('audio/')) return <Music className="w-5 h-5" />;
    if (type.includes('pdf')) return <FileText className="w-5 h-5" />;
    if (type.includes('zip') || type.includes('rar')) return <Archive className="w-5 h-5" />;
    return <File className="w-5 h-5" />;
  };

  // Format file size
  const formatSize = (bytes: number) => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  };

  // Format time remaining
  const formatTime = (seconds?: number) => {
    if (!seconds) return '--';
    if (seconds < 60) return `${Math.round(seconds)}s`;
    if (seconds < 3600) return `${Math.round(seconds / 60)}m`;
    return `${Math.round(seconds / 3600)}h`;
  };

  // Upload file
  const uploadFile = useCallback(async (fileToUpload: UploadFile) => {
    const controller = new AbortController();
    
    // Update file with controller
    setFiles(prev => prev.map(f => 
      f.id === fileToUpload.id 
        ? { ...f, controller, status: 'uploading' as const }
        : f
    ));

    const formData = new FormData();
    formData.append('file', fileToUpload.file);

    const startTime = Date.now();
    let lastLoaded = 0;

    try {
      const response = await axios.post(endpoint, formData, {
        signal: controller.signal,
        onUploadProgress: (progressEvent) => {
          if (progressEvent.total) {
            const progress = Math.round((progressEvent.loaded / progressEvent.total) * 100);
            const currentTime = Date.now();
            const elapsedTime = (currentTime - startTime) / 1000;
            const uploadedBytes = progressEvent.loaded - lastLoaded;
            const speed = uploadedBytes / elapsedTime;
            const remainingBytes = progressEvent.total - progressEvent.loaded;
            const timeRemaining = remainingBytes / speed;

            lastLoaded = progressEvent.loaded;

            setFiles(prev => prev.map(f => 
              f.id === fileToUpload.id 
                ? {
                    ...f,
                    progress,
                    uploadedSize: progressEvent.loaded,
                    speed,
                    timeRemaining,
                    status: 'uploading' as const
                  }
                : f
            ));
          }
        }
      });

      // Upload complete
      setFiles(prev => prev.map(f => 
        f.id === fileToUpload.id 
          ? {
              ...f,
              progress: 100,
              status: 'completed' as const,
              url: response.data.url,
              uploadedSize: f.size
            }
          : f
      ));

      // Check if all files are uploaded
      const allFiles = files.map(f => 
        f.id === fileToUpload.id 
          ? { ...f, status: 'completed' as const, url: response.data.url }
          : f
      );
      
      if (allFiles.every(f => f.status === 'completed')) {
        onUploadComplete?.(allFiles);
      }
    } catch (error: any) {
      if (axios.isCancel(error)) {
        // Upload was cancelled
        setFiles(prev => prev.map(f => 
          f.id === fileToUpload.id 
            ? { ...f, status: 'paused' as const }
            : f
        ));
      } else {
        // Upload error
        setFiles(prev => prev.map(f => 
          f.id === fileToUpload.id 
            ? {
                ...f,
                status: 'error' as const,
                error: error.response?.data?.message || error.message || 'Upload failed'
              }
            : f
        ));
        onError?.(error.message);
      }
    }
  }, [endpoint, files, onUploadComplete, onError]);

  // Start upload
  const startUpload = useCallback((fileId?: string) => {
    const filesToUpload = fileId 
      ? files.filter(f => f.id === fileId)
      : files.filter(f => f.status === 'pending' || f.status === 'paused');

    setIsUploading(true);
    filesToUpload.forEach(file => {
      uploadFile(file);
    });
  }, [files, uploadFile]);

  // Pause upload
  const pauseUpload = useCallback((fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file?.controller) {
      file.controller.abort();
    }
  }, [files]);

  // Resume upload
  const resumeUpload = useCallback((fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file) {
      uploadFile(file);
    }
  }, [files, uploadFile]);

  // Remove file
  const removeFile = useCallback((fileId: string) => {
    const file = files.find(f => f.id === fileId);
    if (file?.controller) {
      file.controller.abort();
    }
    setFiles(prev => prev.filter(f => f.id !== fileId));
  }, [files]);

  // Clear all files
  const clearAll = useCallback(() => {
    files.forEach(file => {
      if (file.controller) {
        file.controller.abort();
      }
    });
    setFiles([]);
    setIsUploading(false);
  }, [files]);

  // Dropzone configuration
  const onDrop = useCallback((acceptedFiles: File[]) => {
    const newFiles: UploadFile[] = acceptedFiles.slice(0, maxFiles - files.length).map(file => ({
      id: `file-${Date.now()}-${Math.random()}`,
      file,
      name: file.name,
      size: file.size,
      type: file.type,
      progress: 0,
      status: 'pending' as const,
      uploadedSize: 0
    }));

    setFiles(prev => [...prev, ...newFiles]);

    // Auto upload if enabled
    if (autoUpload) {
      setTimeout(() => {
        newFiles.forEach(file => uploadFile(file));
      }, 100);
    }
  }, [maxFiles, files.length, autoUpload, uploadFile]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    maxFiles: maxFiles - files.length,
    maxSize,
    multiple,
    accept: acceptedTypes.reduce((acc, type) => ({ ...acc, [type]: [] }), {})
  });

  // Calculate total progress
  const totalProgress = files.length > 0
    ? Math.round(files.reduce((acc, file) => acc + file.progress, 0) / files.length)
    : 0;

  const uploadedCount = files.filter(f => f.status === 'completed').length;
  const errorCount = files.filter(f => f.status === 'error').length;

  return (
    <div className="space-y-4">
      {/* Dropzone */}
      <div
        {...getRootProps()}
        className={cn(
          'border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors',
          isDragActive
            ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
            : 'border-gray-300 dark:border-gray-700 hover:border-gray-400 dark:hover:border-gray-600'
        )}
      >
        <input {...getInputProps()} />
        <Cloud className="w-12 h-12 mx-auto mb-4 text-gray-400" />
        {isDragActive ? (
          <p className="text-lg font-medium">Drop files here...</p>
        ) : (
          <div>
            <p className="text-lg font-medium mb-2">
              Drag & drop files here, or click to select
            </p>
            <p className="text-sm text-gray-500">
              Maximum {maxFiles} files, up to {formatSize(maxSize)} each
            </p>
          </div>
        )}
      </div>

      {/* Overall Progress */}
      {files.length > 0 && (
        <Card className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-4">
              <h3 className="font-medium">Upload Progress</h3>
              <div className="flex items-center gap-2 text-sm">
                <Badge variant="default">
                  {uploadedCount}/{files.length} uploaded
                </Badge>
                {errorCount > 0 && (
                  <Badge variant="destructive">
                    {errorCount} failed
                  </Badge>
                )}
              </div>
            </div>
            <div className="flex items-center gap-2">
              {!autoUpload && files.some(f => f.status === 'pending') && (
                <Button
                  size="sm"
                  onClick={() => startUpload()}
                  disabled={isUploading}
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload All
                </Button>
              )}
              <Button
                size="sm"
                variant="outline"
                onClick={clearAll}
              >
                Clear All
              </Button>
            </div>
          </div>
          <Progress value={totalProgress} className="h-2" />
        </Card>
      )}

      {/* File List */}
      <AnimatePresence>
        {files.map((file) => (
          <motion.div
            key={file.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, x: -100 }}
            className="border rounded-lg p-4 space-y-3"
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start gap-3">
                <div className={cn(
                  'p-2 rounded-lg',
                  file.status === 'completed' ? 'bg-green-100 dark:bg-green-900/20' :
                  file.status === 'error' ? 'bg-red-100 dark:bg-red-900/20' :
                  'bg-gray-100 dark:bg-gray-800'
                )}>
                  {getFileIcon(file.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-medium truncate">{file.name}</p>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{formatSize(file.size)}</span>
                    {file.status === 'uploading' && file.speed && (
                      <>
                        <span>{formatSize(file.speed)}/s</span>
                        <span>ETA: {formatTime(file.timeRemaining)}</span>
                      </>
                    )}
                    {file.status === 'completed' && (
                      <span className="text-green-600">Upload complete</span>
                    )}
                    {file.status === 'error' && (
                      <span className="text-red-600">{file.error}</span>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2">
                {file.status === 'uploading' && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => pauseUpload(file.id)}
                  >
                    <Pause className="w-4 h-4" />
                  </Button>
                )}
                {file.status === 'paused' && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => resumeUpload(file.id)}
                  >
                    <Play className="w-4 h-4" />
                  </Button>
                )}
                {file.status === 'error' && (
                  <Button
                    size="icon"
                    variant="ghost"
                    onClick={() => uploadFile(file)}
                  >
                    <RotateCcw className="w-4 h-4" />
                  </Button>
                )}
                {file.status === 'completed' && file.url && (
                  <>
                    <Button
                      size="icon"
                      variant="ghost"
                      asChild
                    >
                      <a href={file.url} target="_blank" rel="noopener noreferrer">
                        <Eye className="w-4 h-4" />
                      </a>
                    </Button>
                    <Button
                      size="icon"
                      variant="ghost"
                      asChild
                    >
                      <a href={file.url} download={file.name}>
                        <Download className="w-4 h-4" />
                      </a>
                    </Button>
                  </>
                )}
                <Button
                  size="icon"
                  variant="ghost"
                  onClick={() => removeFile(file.id)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
            </div>
            
            {/* Progress Bar */}
            {(file.status === 'uploading' || file.status === 'paused') && (
              <div className="space-y-2">
                <Progress value={file.progress} className="h-2" />
                <div className="flex justify-between text-xs text-gray-500">
                  <span>{formatSize(file.uploadedSize)} / {formatSize(file.size)}</span>
                  <span>{file.progress}%</span>
                </div>
              </div>
            )}
            
            {/* Status Icons */}
            {file.status === 'completed' && (
              <div className="flex items-center gap-2 text-green-600">
                <CheckCircle className="w-4 h-4" />
                <span className="text-sm">Upload successful</span>
              </div>
            )}
            
            {file.status === 'error' && (
              <div className="flex items-center gap-2 text-red-600">
                <AlertCircle className="w-4 h-4" />
                <span className="text-sm">{file.error || 'Upload failed'}</span>
              </div>
            )}
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};