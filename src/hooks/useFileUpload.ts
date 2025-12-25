'use client';

import { useState, useCallback, useRef } from 'react';
import type { FileCategory } from '@/lib/storage/storage-manager';

interface UploadOptions {
  category: FileCategory;
  userId: string;
  metadata?: Record<string, any>;
}

interface UploadProgress {
  filename: string;
  progress: number;
  size: number;
  uploaded: number;
  status: 'uploading' | 'processing' | 'completed' | 'failed';
  error?: string;
  processingJobId?: string;
}

/**
 * useFileUpload Hook
 *
 * Handle single and batch file uploads
 */
export function useFileUpload(options: UploadOptions) {
  const [uploadProgress, setUploadProgress] = useState<Record<string, UploadProgress>>({});
  const [isUploading, setIsUploading] = useState(false);
  const abortControllers = useRef<Map<string, AbortController>>(new Map());

  /**
   * Upload single file
   */
  const uploadFile = useCallback(
    async (file: File): Promise<{ success: boolean; fileId?: string; error?: string }> => {
      const formData = new FormData();
      formData.append('file', file);
      formData.append('category', options.category);
      formData.append('userId', options.userId);

      if (options.metadata) {
        formData.append('metadata', JSON.stringify(options.metadata));
      }

      const abortController = new AbortController();
      abortControllers.current.set(file.name, abortController);

      setIsUploading(true);
      setUploadProgress((prev) => ({
        ...prev,
        [file.name]: {
          filename: file.name,
          progress: 0,
          size: file.size,
          uploaded: 0,
          status: 'uploading',
        },
      }));

      try {
        const response = await fetch('/api/files', {
          method: 'POST',
          body: formData,
          signal: abortController.signal,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Upload failed');
        }

        const data = await response.json();

        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: {
            ...prev[file.name],
            progress: 100,
            uploaded: file.size,
            status: data.processingJobId ? 'processing' : 'completed',
            processingJobId: data.processingJobId,
          },
        }));

        return { success: true, fileId: data.file?.id };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Upload failed';

        setUploadProgress((prev) => ({
          ...prev,
          [file.name]: {
            ...prev[file.name],
            status: 'failed',
            error: errorMessage,
          },
        }));

        return { success: false, error: errorMessage };
      } finally {
        abortControllers.current.delete(file.name);
        setIsUploading(false);
      }
    },
    [options]
  );

  /**
   * Upload batch of files
   */
  const uploadBatch = useCallback(
    async (files: File[]): Promise<{ success: boolean; batchId?: string; errors: Record<string, string> }> => {
      const formData = new FormData();

      files.forEach((file) => {
        formData.append('files', file);
      });

      formData.append('category', options.category);
      formData.append('userId', options.userId);

      if (options.metadata) {
        formData.append('metadata', JSON.stringify(options.metadata));
      }

      // Initialize progress for all files
      const initialProgress: Record<string, UploadProgress> = {};
      files.forEach((file) => {
        initialProgress[file.name] = {
          filename: file.name,
          progress: 0,
          size: file.size,
          uploaded: 0,
          status: 'uploading',
        };
      });

      setUploadProgress((prev) => ({ ...prev, ...initialProgress }));
      setIsUploading(true);

      try {
        const response = await fetch('/api/files/batch', {
          method: 'POST',
          body: formData,
        });

        if (!response.ok) {
          const error = await response.json();
          throw new Error(error.error || 'Batch upload failed');
        }

        const data = await response.json();
        const errors: Record<string, string> = {};

        // Update progress for each file
        data.files.forEach((result: any, index: number) => {
          const filename = files[index].name;

          if (!result.success) {
            errors[filename] = result.error || 'Upload failed';

            setUploadProgress((prev) => ({
              ...prev,
              [filename]: {
                ...prev[filename],
                status: 'failed',
                error: result.error,
              },
            }));
          } else {
            setUploadProgress((prev) => ({
              ...prev,
              [filename]: {
                ...prev[filename],
                progress: 100,
                uploaded: files[index].size,
                status: result.processingJobId ? 'processing' : 'completed',
                processingJobId: result.processingJobId,
              },
            }));
          }
        });

        return {
          success: data.success,
          batchId: data.batchId,
          errors,
        };
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Batch upload failed';

        // Mark all files as failed
        const errors: Record<string, string> = {};
        files.forEach((file) => {
          errors[file.name] = errorMessage;
          setUploadProgress((prev) => ({
            ...prev,
            [file.name]: {
              ...prev[file.name],
              status: 'failed',
              error: errorMessage,
            },
          }));
        });

        return { success: false, errors };
      } finally {
        setIsUploading(false);
      }
    },
    [options]
  );

  /**
   * Cancel upload
   */
  const cancelUpload = useCallback((filename: string) => {
    const controller = abortControllers.current.get(filename);
    if (controller) {
      controller.abort();
      abortControllers.current.delete(filename);
    }

    setUploadProgress((prev) => ({
      ...prev,
      [filename]: {
        ...prev[filename],
        status: 'failed',
        error: 'Cancelled',
      },
    }));
  }, []);

  /**
   * Clear progress
   */
  const clearProgress = useCallback(() => {
    setUploadProgress({});
  }, []);

  return {
    uploadProgress,
    isUploading,
    uploadFile,
    uploadBatch,
    cancelUpload,
    clearProgress,
  };
}

/**
 * Hook for monitoring media processing
 */
export function useMediaProcessing(jobId: string | null) {
  const [job, setJob] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchJobStatus = useCallback(async () => {
    if (!jobId) return;

    try {
      setIsLoading(true);
      setError(null);

      const response = await fetch(`/api/media/process?jobId=${jobId}`);

      if (!response.ok) {
        throw new Error('Failed to fetch job status');
      }

      const data = await response.json();
      setJob(data.job);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load job';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  }, [jobId]);

  const cancelJob = useCallback(async () => {
    if (!jobId) return;

    try {
      const response = await fetch(`/api/media/process?jobId=${jobId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to cancel job');
      }

      setJob((prev: any) => ({ ...prev, status: 'failed', error: 'Cancelled' }));
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to cancel';
      setError(message);
    }
  }, [jobId]);

  return {
    job,
    isLoading,
    error,
    fetchJobStatus,
    cancelJob,
  };
}
