'use server';

/**
 * Media Stream Manager
 *
 * Manages audio and video streams
 * - Stream constraints
 * - Device enumeration
 * - Audio/video quality settings
 * - Stream state tracking
 */

export interface StreamConstraints {
  audio: AudioConstraints;
  video: VideoConstraints;
}

export interface AudioConstraints {
  enabled: boolean;
  echoCancellation: boolean;
  noiseSuppression: boolean;
  sampleRate?: number; // 16000, 24000, 44100, 48000
}

export interface VideoConstraints {
  enabled: boolean;
  width?: number;
  height?: number;
  frameRate?: number;
  facingMode?: 'user' | 'environment';
}

export interface MediaDevice {
  deviceId: string;
  label: string;
  kind: 'audioinput' | 'audiooutput' | 'videoinput';
}

export interface StreamQuality {
  audio: 'hd' | 'high' | 'medium' | 'low' | 'off';
  video: 'hd' | 'high' | 'medium' | 'low' | 'off';
}

export interface MediaStreamInfo {
  streamId: string;
  userId: string;
  audioEnabled: boolean;
  videoEnabled: boolean;
  quality: StreamQuality;
  bandwidth?: number; // kbps
}

class MediaStreamManager {
  private mediaStreams = new Map<string, MediaStreamInfo>();
  private deviceCache = new Map<string, MediaDevice[]>();

  /**
   * Get recommended constraints for quality level
   */
  getConstraints(quality: StreamQuality = { audio: 'high', video: 'high' }): StreamConstraints {
    return {
      audio: {
        enabled: quality.audio !== 'off',
        echoCancellation: true,
        noiseSuppression: true,
        sampleRate: this.getAudioSampleRate(quality.audio),
      },
      video: {
        enabled: quality.video !== 'off',
        width: this.getVideoWidth(quality.video),
        height: this.getVideoHeight(quality.video),
        frameRate: this.getVideoFrameRate(quality.video),
        facingMode: 'user',
      },
    };
  }

  /**
   * Get audio sample rate for quality
   */
  private getAudioSampleRate(quality: string): number {
    switch (quality) {
      case 'hd':
      case 'high':
        return 48000;
      case 'medium':
        return 24000;
      case 'low':
        return 16000;
      default:
        return 16000;
    }
  }

  /**
   * Get video width for quality
   */
  private getVideoWidth(quality: string): number {
    switch (quality) {
      case 'hd':
        return 1920;
      case 'high':
        return 1280;
      case 'medium':
        return 640;
      case 'low':
        return 320;
      default:
        return 640;
    }
  }

  /**
   * Get video height for quality
   */
  private getVideoHeight(quality: string): number {
    switch (quality) {
      case 'hd':
        return 1080;
      case 'high':
        return 720;
      case 'medium':
        return 480;
      case 'low':
        return 240;
      default:
        return 480;
    }
  }

  /**
   * Get video frame rate for quality
   */
  private getVideoFrameRate(quality: string): number {
    switch (quality) {
      case 'hd':
      case 'high':
        return 30;
      case 'medium':
        return 24;
      case 'low':
        return 15;
      default:
        return 24;
    }
  }

  /**
   * Get bandwidth requirement for quality
   */
  getBandwidthRequirement(quality: StreamQuality): number {
    let bandwidth = 0;

    // Audio bandwidth (kbps)
    switch (quality.audio) {
      case 'high':
        bandwidth += 128;
        break;
      case 'medium':
        bandwidth += 64;
        break;
      case 'low':
        bandwidth += 32;
        break;
    }

    // Video bandwidth (kbps) - estimates
    switch (quality.video) {
      case 'hd':
        bandwidth += 2500;
        break;
      case 'high':
        bandwidth += 1500;
        break;
      case 'medium':
        bandwidth += 800;
        break;
      case 'low':
        bandwidth += 300;
        break;
    }

    return bandwidth;
  }

  /**
   * Register media stream
   */
  registerStream(streamId: string, userId: string, quality: StreamQuality = { audio: 'high', video: 'high' }): MediaStreamInfo {
    const streamInfo: MediaStreamInfo = {
      streamId,
      userId,
      audioEnabled: quality.audio !== 'off',
      videoEnabled: quality.video !== 'off',
      quality,
      bandwidth: this.getBandwidthRequirement(quality),
    };

    this.mediaStreams.set(streamId, streamInfo);

    return streamInfo;
  }

  /**
   * Update stream quality
   */
  updateStreamQuality(streamId: string, quality: StreamQuality): boolean {
    const streamInfo = this.mediaStreams.get(streamId);

    if (!streamInfo) {
      return false;
    }

    streamInfo.quality = quality;
    streamInfo.audioEnabled = quality.audio !== 'off';
    streamInfo.videoEnabled = quality.video !== 'off';
    streamInfo.bandwidth = this.getBandwidthRequirement(quality);

    return true;
  }

  /**
   * Get available media devices
   */
  async getMediaDevices(): Promise<{
    audioInputs: MediaDevice[];
    audioOutputs: MediaDevice[];
    videoInputs: MediaDevice[];
  }> {
    try {
      // In a real browser environment, this would enumerate actual devices
      // For now, return mock devices
      return {
        audioInputs: [
          { deviceId: 'default', label: 'Default Audio Input', kind: 'audioinput' },
          { deviceId: 'mic1', label: 'Microphone', kind: 'audioinput' },
        ],
        audioOutputs: [
          { deviceId: 'default', label: 'Default Speaker', kind: 'audiooutput' },
          { deviceId: 'speaker1', label: 'Headphones', kind: 'audiooutput' },
        ],
        videoInputs: [
          { deviceId: 'default', label: 'Default Camera', kind: 'videoinput' },
          { deviceId: 'cam1', label: 'Webcam', kind: 'videoinput' },
        ],
      };
    } catch (error) {
      console.error('Error getting media devices:', error);
      return {
        audioInputs: [],
        audioOutputs: [],
        videoInputs: [],
      };
    }
  }

  /**
   * Select media device
   */
  selectDevice(deviceId: string, kind: 'audioinput' | 'audiooutput' | 'videoinput'): StreamConstraints {
    const constraints: StreamConstraints = {
      audio: {
        enabled: kind !== 'videoinput',
        echoCancellation: true,
        noiseSuppression: true,
      },
      video: {
        enabled: kind === 'videoinput',
        width: 1280,
        height: 720,
        frameRate: 30,
      },
    };

    if (kind === 'audioinput') {
      (constraints.audio as any).deviceId = { exact: deviceId };
    } else if (kind === 'audiooutput') {
      (constraints.audio as any).deviceId = { exact: deviceId };
    } else if (kind === 'videoinput') {
      (constraints.video as any).deviceId = { exact: deviceId };
    }

    return constraints;
  }

  /**
   * Get stream info
   */
  getStreamInfo(streamId: string): MediaStreamInfo | null {
    return this.mediaStreams.get(streamId) || null;
  }

  /**
   * Remove stream
   */
  removeStream(streamId: string): void {
    this.mediaStreams.delete(streamId);
  }

  /**
   * Get all active streams for user
   */
  getUserStreams(userId: string): MediaStreamInfo[] {
    const streams: MediaStreamInfo[] = [];

    for (const stream of this.mediaStreams.values()) {
      if (stream.userId === userId) {
        streams.push(stream);
      }
    }

    return streams;
  }

  /**
   * Estimate bandwidth usage
   */
  estimateBandwidthUsage(): number {
    let totalBandwidth = 0;

    for (const stream of this.mediaStreams.values()) {
      totalBandwidth += stream.bandwidth || 0;
    }

    return totalBandwidth;
  }

  /**
   * Get media stream statistics
   */
  getMediaStats() {
    return {
      totalStreams: this.mediaStreams.size,
      totalBandwidth: this.estimateBandwidthUsage(),
      audioStreams: Array.from(this.mediaStreams.values()).filter((s) => s.audioEnabled).length,
      videoStreams: Array.from(this.mediaStreams.values()).filter((s) => s.videoEnabled).length,
    };
  }
}

// Export singleton instance
export const mediaStreamManager = new MediaStreamManager();
