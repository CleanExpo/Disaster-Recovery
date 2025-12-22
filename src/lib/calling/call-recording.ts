'use server';

/**
 * Call Recording Service
 *
 * Manages recording of calls
 * - Recording metadata
 * - Recording state management
 * - Participant tracking
 * - Recording storage (cloud/local)
 */

export type RecordingStatus = 'idle' | 'recording' | 'paused' | 'completed' | 'failed';

export interface CallRecording {
  id: string;
  callId: string;
  status: RecordingStatus;
  startTime: Date;
  endTime?: Date;
  duration?: number; // seconds
  fileUrl?: string;
  fileSize?: number; // bytes
  format: 'mp4' | 'webm' | 'wav';
  participantIds: string[];
  audioEnabled: boolean;
  videoEnabled: boolean;
  createdAt: Date;
}

class CallRecordingService {
  private recordings = new Map<string, CallRecording>();
  private recordingStats = new Map<string, { recordedBytes: number; startTime: Date }>();

  /**
   * Start recording a call
   */
  async startRecording(
    callId: string,
    participantIds: string[],
    format: 'mp4' | 'webm' | 'wav' = 'mp4',
    options?: {
      audioEnabled?: boolean;
      videoEnabled?: boolean;
    }
  ): Promise<CallRecording> {
    try {
      const recordingId = `recording_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;

      const recording: CallRecording = {
        id: recordingId,
        callId,
        status: 'recording',
        startTime: new Date(),
        format,
        participantIds,
        audioEnabled: options?.audioEnabled ?? true,
        videoEnabled: options?.videoEnabled ?? true,
        createdAt: new Date(),
      };

      this.recordings.set(recordingId, recording);
      this.recordingStats.set(recordingId, {
        recordedBytes: 0,
        startTime: new Date(),
      });

      return recording;
    } catch (error) {
      console.error('Error starting recording:', error);
      throw error;
    }
  }

  /**
   * Stop recording
   */
  async stopRecording(recordingId: string, fileUrl: string, fileSize: number): Promise<CallRecording> {
    try {
      const recording = this.recordings.get(recordingId);
      if (!recording) {
        throw new Error('Recording not found');
      }

      recording.status = 'completed';
      recording.endTime = new Date();
      recording.duration = Math.floor((recording.endTime.getTime() - recording.startTime.getTime()) / 1000);
      recording.fileUrl = fileUrl;
      recording.fileSize = fileSize;

      return recording;
    } catch (error) {
      console.error('Error stopping recording:', error);
      throw error;
    }
  }

  /**
   * Pause recording
   */
  async pauseRecording(recordingId: string): Promise<boolean> {
    try {
      const recording = this.recordings.get(recordingId);
      if (!recording) {
        return false;
      }

      recording.status = 'paused';
      return true;
    } catch (error) {
      console.error('Error pausing recording:', error);
      return false;
    }
  }

  /**
   * Resume recording
   */
  async resumeRecording(recordingId: string): Promise<boolean> {
    try {
      const recording = this.recordings.get(recordingId);
      if (!recording) {
        return false;
      }

      recording.status = 'recording';
      return true;
    } catch (error) {
      console.error('Error resuming recording:', error);
      return false;
    }
  }

  /**
   * Update recording progress
   */
  updateRecordingProgress(recordingId: string, bytesRecorded: number): void {
    const stats = this.recordingStats.get(recordingId);
    if (stats) {
      stats.recordedBytes = bytesRecorded;
    }
  }

  /**
   * Get recording progress
   */
  getRecordingProgress(recordingId: string): {
    bytesRecorded: number;
    elapsedTime: number; // seconds
  } | null {
    const stats = this.recordingStats.get(recordingId);
    if (!stats) {
      return null;
    }

    const elapsedTime = Math.floor((Date.now() - stats.startTime.getTime()) / 1000);

    return {
      bytesRecorded: stats.recordedBytes,
      elapsedTime,
    };
  }

  /**
   * Get recording
   */
  getRecording(recordingId: string): CallRecording | null {
    return this.recordings.get(recordingId) || null;
  }

  /**
   * Get recordings for call
   */
  getCallRecordings(callId: string): CallRecording[] {
    const recordings: CallRecording[] = [];

    for (const recording of this.recordings.values()) {
      if (recording.callId === callId) {
        recordings.push(recording);
      }
    }

    return recordings;
  }

  /**
   * Calculate bitrate for recording
   */
  calculateBitrate(recordingId: string): number {
    const stats = this.recordingStats.get(recordingId);
    const recording = this.recordings.get(recordingId);

    if (!stats || !recording) {
      return 0;
    }

    const elapsedSeconds = (Date.now() - stats.startTime.getTime()) / 1000;
    if (elapsedSeconds === 0) {
      return 0;
    }

    // Convert bytes to bits and divide by seconds
    return Math.round((stats.recordedBytes * 8) / elapsedSeconds / 1000); // kbps
  }

  /**
   * Estimate file size for duration
   */
  estimateFileSize(
    duration: number,
    format: 'mp4' | 'webm' | 'wav',
    audioQuality: 'high' | 'medium' | 'low' = 'high',
    videoQuality: 'high' | 'medium' | 'low' | 'off' = 'medium'
  ): number {
    // Base bitrates in kbps
    const audioBitrates = { high: 128, medium: 64, low: 32 };
    const videoBitrates = { high: 1500, medium: 800, low: 300, off: 0 };

    const totalBitrate = audioBitrates[audioQuality] + videoBitrates[videoQuality];
    const bytes = (totalBitrate * 1000 * duration) / 8;

    // Add container overhead (5%)
    return Math.round(bytes * 1.05);
  }

  /**
   * Check disk space requirement
   */
  checkDiskSpaceRequirement(
    duration: number,
    videoEnabled: boolean = true
  ): {
    required: number; // bytes
    formatted: string;
  } {
    const quality = videoEnabled ? 'medium' : 'high';
    const videoQuality = videoEnabled ? 'medium' : 'off';

    const required = this.estimateFileSize(duration, 'mp4', quality, videoQuality);

    return {
      required,
      formatted: this.formatBytes(required),
    };
  }

  /**
   * Format bytes to human readable
   */
  private formatBytes(bytes: number): string {
    if (bytes === 0) return '0 Bytes';

    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + ' ' + sizes[i];
  }

  /**
   * Get recording statistics
   */
  getRecordingStats() {
    let totalRecordings = 0;
    let activeRecordings = 0;
    let totalSize = 0;

    for (const recording of this.recordings.values()) {
      totalRecordings++;
      if (recording.status === 'recording' || recording.status === 'paused') {
        activeRecordings++;
      }
      if (recording.fileSize) {
        totalSize += recording.fileSize;
      }
    }

    return {
      totalRecordings,
      activeRecordings,
      totalSize,
      totalSizeFormatted: this.formatBytes(totalSize),
    };
  }
}

// Export singleton instance
export const callRecording = new CallRecordingService();
