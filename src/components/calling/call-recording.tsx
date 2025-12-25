'use client';

import { useState, useEffect } from 'react';

interface CallRecordingProps {
  isRecording: boolean;
  recordingDuration?: number;
  onStartRecording?: () => Promise<void>;
  onStopRecording?: () => Promise<void>;
}

/**
 * CallRecording Component
 *
 * Visual indicator and controls for call recording status
 */
export function CallRecording({
  isRecording,
  recordingDuration = 0,
  onStartRecording,
  onStopRecording,
}: CallRecordingProps) {
  const [duration, setDuration] = useState(recordingDuration);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!isRecording) return;

    const interval = setInterval(() => {
      setDuration((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isRecording]);

  const formatDuration = (seconds: number) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;

    if (hours > 0) {
      return `${hours}:${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
    }
    return `${String(minutes).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  const handleRecordingToggle = async () => {
    try {
      setIsLoading(true);
      if (isRecording) {
        await onStopRecording?.();
        setDuration(0);
      } else {
        await onStartRecording?.();
      }
    } catch (error) {
      console.error('Failed to toggle recording:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (!isRecording && duration === 0) {
    return null;
  }

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-red-50 border border-red-200 rounded-lg">
      {/* Recording Indicator */}
      <div className={`flex items-center gap-2 ${isRecording ? 'animate-pulse' : ''}`}>
        <div
          className={`w-2.5 h-2.5 rounded-full ${
            isRecording ? 'bg-red-600' : 'bg-gray-400'
          }`}
        />
        <span className="text-xs font-semibold text-red-600">
          {isRecording ? 'RECORDING' : 'RECORDED'}
        </span>
      </div>

      {/* Duration */}
      <span className="text-xs text-red-600 font-mono">{formatDuration(duration)}</span>

      {/* Control Button */}
      <button
        onClick={handleRecordingToggle}
        disabled={isLoading}
        className={`ml-auto p-1 rounded transition-colors ${
          isRecording
            ? 'hover:bg-red-200 text-red-600'
            : 'hover:bg-gray-200 text-gray-600'
        } disabled:opacity-50 disabled:cursor-not-allowed`}
        title={isRecording ? 'Stop recording' : 'Resume recording'}
      >
        {isLoading ? (
          <div className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin" />
        ) : isRecording ? (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <rect x="6" y="4" width="2" height="12" />
            <rect x="12" y="4" width="2" height="12" />
          </svg>
        ) : (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <circle cx="10" cy="10" r="3" />
          </svg>
        )}
      </button>
    </div>
  );
}

interface CallRecordingStatusProps {
  recordingId?: string;
  format: 'mp4' | 'webm' | 'wav';
  bitrate: number;
  estimatedFileSize: string;
  estimatedDuration: string;
  onDownload?: () => Promise<void>;
}

/**
 * CallRecordingStatus Component
 *
 * Display recording metadata and download options after call ends
 */
export function CallRecordingStatus({
  recordingId,
  format,
  bitrate,
  estimatedFileSize,
  estimatedDuration,
  onDownload,
}: CallRecordingStatusProps) {
  const [isDownloading, setIsDownloading] = useState(false);

  const handleDownload = async () => {
    try {
      setIsDownloading(true);
      await onDownload?.();
    } catch (error) {
      console.error('Failed to download recording:', error);
    } finally {
      setIsDownloading(false);
    }
  };

  return (
    <div className="border border-gray-200 rounded-lg p-4 bg-white">
      {/* Header */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-900">Call Recording</h3>
          <p className="text-sm text-gray-600 mt-1">
            Recording saved and ready for download
          </p>
        </div>
        {recordingId && (
          <span className="text-xs text-gray-500 font-mono bg-gray-100 px-2 py-1 rounded">
            {recordingId.slice(0, 8)}...
          </span>
        )}
      </div>

      {/* Recording Details */}
      <div className="space-y-3 mb-4">
        <div className="grid grid-cols-2 gap-4">
          {/* Format */}
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-medium mb-1">Format</p>
            <p className="text-sm font-semibold text-gray-900 uppercase">{format}</p>
          </div>

          {/* Bitrate */}
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-medium mb-1">Bitrate</p>
            <p className="text-sm font-semibold text-gray-900">
              {Math.round(bitrate / 1000)} kbps
            </p>
          </div>

          {/* File Size */}
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-medium mb-1">Estimated Size</p>
            <p className="text-sm font-semibold text-gray-900">{estimatedFileSize}</p>
          </div>

          {/* Duration */}
          <div className="bg-gray-50 p-3 rounded">
            <p className="text-xs text-gray-600 font-medium mb-1">Duration</p>
            <p className="text-sm font-semibold text-gray-900">{estimatedDuration}</p>
          </div>
        </div>
      </div>

      {/* Download Button */}
      <button
        onClick={handleDownload}
        disabled={isDownloading}
        className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isDownloading ? (
          <>
            <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Downloading...</span>
          </>
        ) : (
          <>
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            <span>Download Recording</span>
          </>
        )}
      </button>

      {/* Info Text */}
      <p className="text-xs text-gray-500 mt-3">
        Recording will be stored for 30 days. Download to keep permanently.
      </p>
    </div>
  );
}
