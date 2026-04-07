'use client';

import React, { useRef, useState, useEffect, useCallback, useId } from 'react';
import { Camera, Upload, X, FileImage, FileVideo, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription } from '@/components/ui/alert';

// ─────────────────────────────────────────────
// Types
// ─────────────────────────────────────────────

export interface MediaFile {
  file: File;
  objectUrl: string;
  /** Size in human-readable form, e.g. "1.4 MB" */
  sizeLabel: string;
  isVideo: boolean;
}

export interface DamageMediaCaptureProps {
  onChange: (files: File[]) => void;
  maxFiles?: number;
  label?: string;
  /** Hint text shown below the label */
  description?: string;
}

// ─────────────────────────────────────────────
// Helpers
// ─────────────────────────────────────────────

function formatBytes(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1_048_576) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / 1_048_576).toFixed(1)} MB`;
}

/**
 * Compress an image File using the Canvas API.
 * Returns the original File unchanged for video or tiny images.
 */
async function compressImage(file: File, maxPx = 1920, quality = 0.8): Promise<File> {
  if (file.type.startsWith('video/')) return file;

  return new Promise((resolve) => {
    const img = new Image();
    const src = URL.createObjectURL(file);

    img.onload = () => {
      URL.revokeObjectURL(src);

      const { width, height } = img;
      const scale = width > maxPx || height > maxPx ? maxPx / Math.max(width, height) : 1;

      if (scale === 1 && file.size < 200_000) {
        // Small enough — skip canvas round-trip
        resolve(file);
        return;
      }

      const canvas = document.createElement('canvas');
      canvas.width = Math.round(width * scale);
      canvas.height = Math.round(height * scale);

      const ctx = canvas.getContext('2d');
      if (!ctx) {
        resolve(file);
        return;
      }

      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      canvas.toBlob(
        (blob) => {
          if (!blob) {
            resolve(file);
            return;
          }
          // Only keep the compressed version if it's actually smaller
          if (blob.size >= file.size) {
            resolve(file);
          } else {
            resolve(new File([blob], file.name, { type: blob.type, lastModified: Date.now() }));
          }
        },
        'image/jpeg',
        quality,
      );
    };

    img.onerror = () => {
      URL.revokeObjectURL(src);
      resolve(file);
    };

    img.src = src;
  });
}

// ─────────────────────────────────────────────
// Component
// ─────────────────────────────────────────────

export default function DamageMediaCapture({
  onChange,
  maxFiles = 10,
  label = 'Damage Photos & Videos',
  description,
}: DamageMediaCaptureProps) {
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [compressing, setCompressing] = useState(false);

  // Separate refs for camera capture vs file picker
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const labelId = useId();
  const descriptionId = useId();
  const errorId = useId();

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      mediaFiles.forEach((m) => URL.revokeObjectURL(m.objectUrl));
    };
    // We only want this to run on unmount — captured snapshot of mediaFiles is fine.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const addFiles = useCallback(
    async (incoming: FileList | null) => {
      if (!incoming || incoming.length === 0) return;

      setError(null);
      const available = maxFiles - mediaFiles.length;

      if (available <= 0) {
        setError(`Maximum ${maxFiles} files already selected.`);
        return;
      }

      const accepted = Array.from(incoming).slice(0, available);

      // Warn if we had to truncate
      if (incoming.length > available) {
        setError(
          `Only ${available} more file${available !== 1 ? 's' : ''} can be added (limit is ${maxFiles}).`,
        );
      }

      setCompressing(true);

      try {
        const compressed = await Promise.all(accepted.map((f) => compressImage(f)));

        const newMediaFiles: MediaFile[] = compressed.map((file) => ({
          file,
          objectUrl: URL.createObjectURL(file),
          sizeLabel: formatBytes(file.size),
          isVideo: file.type.startsWith('video/'),
        }));

        setMediaFiles((prev) => {
          const updated = [...prev, ...newMediaFiles];
          onChange(updated.map((m) => m.file));
          return updated;
        });
      } finally {
        setCompressing(false);
      }
    },
    [maxFiles, mediaFiles.length, onChange],
  );

  const removeFile = useCallback(
    (index: number) => {
      setMediaFiles((prev) => {
        const removed = prev[index];
        if (removed) URL.revokeObjectURL(removed.objectUrl);
        const updated = prev.filter((_, i) => i !== index);
        onChange(updated.map((m) => m.file));
        return updated;
      });
      setError(null);
    },
    [onChange],
  );

  const handleInputChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      addFiles(e.target.files);
      // Reset input so the same file can be selected again if needed
      e.target.value = '';
    },
    [addFiles],
  );

  const isFull = mediaFiles.length >= maxFiles;

  return (
    <div
      className="space-y-3"
      role="group"
      aria-labelledby={labelId}
      aria-describedby={
        [description ? descriptionId : '', error ? errorId : '']
          .filter(Boolean)
          .join(' ') || undefined
      }
    >
      {/* Label row */}
      <div className="flex items-center gap-2">
        <FileImage className="h-4 w-4 text-blue-600 shrink-0" aria-hidden="true" />
        <Label id={labelId} className="font-semibold text-base">
          {label}
        </Label>
        <span className="ml-auto text-xs text-gray-500 tabular-nums">
          {mediaFiles.length} / {maxFiles}
        </span>
      </div>

      {description && (
        <p id={descriptionId} className="text-sm text-gray-600">
          {description}
        </p>
      )}

      {/* Hidden file inputs */}
      {/* Camera capture (mobile rear camera) */}
      <input
        ref={cameraInputRef}
        type="file"
        accept="image/*,video/*"
        capture="environment"
        multiple
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
        onChange={handleInputChange}
      />
      {/* Standard file picker (desktop + Android gallery) */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        multiple
        className="sr-only"
        aria-hidden="true"
        tabIndex={-1}
        onChange={handleInputChange}
      />

      {/* Action buttons */}
      {!isFull && (
        <div className="flex flex-wrap gap-3">
          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2 border-blue-300 text-blue-700 hover:bg-blue-50"
            onClick={() => cameraInputRef.current?.click()}
            disabled={compressing || isFull}
            aria-label="Take a photo or video with your camera"
          >
            <Camera className="h-4 w-4" aria-hidden="true" />
            Take Photo
          </Button>

          <Button
            type="button"
            variant="outline"
            className="flex items-center gap-2 border-gray-300 text-gray-700 hover:bg-gray-50"
            onClick={() => fileInputRef.current?.click()}
            disabled={compressing || isFull}
            aria-label="Select existing photos or videos from your device"
          >
            <Upload className="h-4 w-4" aria-hidden="true" />
            Choose Files
          </Button>

          {compressing && (
            <span className="text-sm text-gray-500 self-center animate-pulse">
              Optimising images…
            </span>
          )}
        </div>
      )}

      {/* Error */}
      {error && (
        <Alert variant="destructive" className="py-2">
          <AlertCircle className="h-4 w-4" aria-hidden="true" />
          <AlertDescription id={errorId}>{error}</AlertDescription>
        </Alert>
      )}

      {/* Thumbnails */}
      {mediaFiles.length > 0 && (
        <ul
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3 mt-2"
          aria-label={`${mediaFiles.length} selected file${mediaFiles.length !== 1 ? 's' : ''}`}
        >
          {mediaFiles.map((media, index) => (
            <li
              key={media.objectUrl}
              className="relative group rounded-lg overflow-hidden border border-gray-200 bg-gray-50"
            >
              {/* Thumbnail */}
              {media.isVideo ? (
                <div className="aspect-square flex items-center justify-center bg-gray-100">
                  <FileVideo
                    className="h-10 w-10 text-gray-400"
                    aria-hidden="true"
                  />
                </div>
              ) : (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={media.objectUrl}
                  alt={`Damage photo ${index + 1}: ${media.file.name}`}
                  className="w-full aspect-square object-cover"
                  loading="lazy"
                />
              )}

              {/* File info overlay */}
              <div className="px-1.5 py-1 bg-white border-t border-gray-100">
                <p
                  className="text-xs text-gray-700 truncate"
                  title={media.file.name}
                >
                  {media.file.name}
                </p>
                <p className="text-xs text-gray-400">{media.sizeLabel}</p>
              </div>

              {/* Remove button */}
              <button
                type="button"
                onClick={() => removeFile(index)}
                className="
                  absolute top-1 right-1
                  bg-white/90 hover:bg-red-50
                  text-gray-600 hover:text-red-600
                  rounded-full p-0.5
                  opacity-0 group-hover:opacity-100 focus:opacity-100
                  transition-opacity
                  shadow-sm
                "
                aria-label={`Remove ${media.file.name}`}
              >
                <X className="h-4 w-4" aria-hidden="true" />
              </button>
            </li>
          ))}
        </ul>
      )}

      {isFull && (
        <p className="text-sm text-amber-700 bg-amber-50 border border-amber-200 rounded px-3 py-2">
          Maximum of {maxFiles} files reached. Remove a file to add another.
        </p>
      )}
    </div>
  );
}
