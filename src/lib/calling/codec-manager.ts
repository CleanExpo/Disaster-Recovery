/**
 * Codec Manager
 *
 * Manage and select optimal codecs for calls based on network conditions
 */

export type VideoCodec = 'vp8' | 'vp9' | 'h264';
export type AudioCodec = 'opus' | 'g711' | 'aac';

export interface CodecProfile {
  name: string;
  codec: VideoCodec | AudioCodec;
  bandwidth: number; // kbps
  quality: 'low' | 'medium' | 'high';
  cpuUsage: 'low' | 'medium' | 'high';
  latency: number; // ms
}

export interface CodecParams {
  maxBitrate?: number;
  minBitrate?: number;
  targetBitrate?: number;
  maxFramerate?: number;
  maxWidth?: number;
  maxHeight?: number;
}

/**
 * Video codec profiles
 */
const VIDEO_CODEC_PROFILES: Record<VideoCodec, CodecProfile> = {
  vp8: {
    name: 'VP8',
    codec: 'vp8',
    bandwidth: 1000,
    quality: 'medium',
    cpuUsage: 'medium',
    latency: 50,
  },
  vp9: {
    name: 'VP9',
    codec: 'vp9',
    bandwidth: 800,
    quality: 'high',
    cpuUsage: 'high',
    latency: 100,
  },
  h264: {
    name: 'H.264',
    codec: 'h264',
    bandwidth: 1200,
    quality: 'high',
    cpuUsage: 'low',
    latency: 30,
  },
};

/**
 * Audio codec profiles
 */
const AUDIO_CODEC_PROFILES: Record<AudioCodec, CodecProfile> = {
  opus: {
    name: 'Opus',
    codec: 'opus',
    bandwidth: 30,
    quality: 'high',
    cpuUsage: 'low',
    latency: 20,
  },
  g711: {
    name: 'G.711',
    codec: 'g711',
    bandwidth: 64,
    quality: 'low',
    cpuUsage: 'low',
    latency: 10,
  },
  aac: {
    name: 'AAC',
    codec: 'aac',
    bandwidth: 48,
    quality: 'medium',
    cpuUsage: 'medium',
    latency: 25,
  },
};

/**
 * CodecManager
 *
 * Selects and configures optimal codecs
 */
class CodecManager {
  private preferredVideoCodecs: VideoCodec[] = ['h264', 'vp8', 'vp9'];
  private preferredAudioCodecs: AudioCodec[] = ['opus', 'aac', 'g711'];
  private supportedVideoCodecs: Set<VideoCodec> = new Set(['vp8', 'vp9', 'h264']);
  private supportedAudioCodecs: Set<AudioCodec> = new Set(['opus', 'g711', 'aac']);

  /**
   * Get video codec profile
   */
  getVideoProfile(codec: VideoCodec): CodecProfile {
    return VIDEO_CODEC_PROFILES[codec];
  }

  /**
   * Get audio codec profile
   */
  getAudioProfile(codec: AudioCodec): CodecProfile {
    return AUDIO_CODEC_PROFILES[codec];
  }

  /**
   * Select best video codec based on constraints
   */
  selectVideoCodec(
    availableBandwidth: number,
    deviceCapabilities?: {
      hardware?: boolean;
      lowPower?: boolean;
    }
  ): VideoCodec {
    // Prefer hardware codecs on low-power devices
    if (deviceCapabilities?.lowPower) {
      return 'h264';
    }

    // Select based on bandwidth
    if (availableBandwidth < 500) {
      return 'vp8';
    } else if (availableBandwidth < 1500) {
      return 'vp8';
    } else {
      // High bandwidth - use more efficient codec
      return 'h264';
    }
  }

  /**
   * Select best audio codec based on constraints
   */
  selectAudioCodec(
    availableBandwidth: number,
    quality: 'low' | 'medium' | 'high' = 'medium'
  ): AudioCodec {
    if (quality === 'high' || availableBandwidth > 100) {
      return 'opus';
    } else if (quality === 'medium' || availableBandwidth > 50) {
      return 'aac';
    } else {
      return 'g711';
    }
  }

  /**
   * Get video codec parameters for quality
   */
  getVideoParams(
    codec: VideoCodec,
    quality: 'low' | 'medium' | 'high'
  ): CodecParams {
    const params: CodecParams = {};

    switch (quality) {
      case 'low':
        params.maxBitrate = 500;
        params.minBitrate = 250;
        params.targetBitrate = 350;
        params.maxFramerate = 15;
        params.maxWidth = 320;
        params.maxHeight = 240;
        break;

      case 'medium':
        params.maxBitrate = 2000;
        params.minBitrate = 800;
        params.targetBitrate = 1200;
        params.maxFramerate = 24;
        params.maxWidth = 640;
        params.maxHeight = 480;
        break;

      case 'high':
        params.maxBitrate = 5000;
        params.minBitrate = 2000;
        params.targetBitrate = 3500;
        params.maxFramerate = 30;
        params.maxWidth = 1280;
        params.maxHeight = 720;
        break;
    }

    // Codec-specific optimizations
    if (codec === 'vp9') {
      params.maxBitrate = (params.maxBitrate || 0) * 0.8; // VP9 is more efficient
    } else if (codec === 'h264') {
      params.maxBitrate = (params.maxBitrate || 0) * 1.1; // H.264 needs slightly more bandwidth
    }

    return params;
  }

  /**
   * Get audio codec parameters for quality
   */
  getAudioParams(
    codec: AudioCodec,
    quality: 'low' | 'medium' | 'high'
  ): CodecParams {
    const params: CodecParams = {};

    switch (quality) {
      case 'low':
        params.maxBitrate = 12;
        params.minBitrate = 6;
        params.targetBitrate = 8;
        break;

      case 'medium':
        params.maxBitrate = 32;
        params.minBitrate = 16;
        params.targetBitrate = 24;
        break;

      case 'high':
        params.maxBitrate = 48;
        params.minBitrate = 24;
        params.targetBitrate = 32;
        break;
    }

    // Codec-specific adjustments
    if (codec === 'opus') {
      // Opus supports variable bitrate
      params.minBitrate = (params.minBitrate || 0) * 0.5;
    } else if (codec === 'g711') {
      // G.711 has fixed bitrate
      params.targetBitrate = 64;
      params.maxBitrate = 64;
      params.minBitrate = 64;
    }

    return params;
  }

  /**
   * Check if device supports codec
   */
  supportsVideoCodec(codec: VideoCodec): boolean {
    return this.supportedVideoCodecs.has(codec);
  }

  /**
   * Check if device supports codec
   */
  supportsAudioCodec(codec: AudioCodec): boolean {
    return this.supportedAudioCodecs.has(codec);
  }

  /**
   * Set supported codecs (based on device capabilities)
   */
  setSupportedVideoCodecs(codecs: VideoCodec[]): void {
    this.supportedVideoCodecs = new Set(codecs);
  }

  /**
   * Set supported codecs
   */
  setSupportedAudioCodecs(codecs: AudioCodec[]): void {
    this.supportedAudioCodecs = new Set(codecs);
  }

  /**
   * Get all supported video codecs
   */
  getSupportedVideoCodecs(): VideoCodec[] {
    return Array.from(this.supportedVideoCodecs);
  }

  /**
   * Get all supported audio codecs
   */
  getSupportedAudioCodecs(): AudioCodec[] {
    return Array.from(this.supportedAudioCodecs);
  }

  /**
   * Calculate total bandwidth for codec combination
   */
  calculateTotalBandwidth(
    videoCodec: VideoCodec,
    audioCodec: AudioCodec,
    quality: 'low' | 'medium' | 'high'
  ): number {
    const videoProfile = this.getVideoProfile(videoCodec);
    const audioProfile = this.getAudioProfile(audioCodec);

    let videoBandwidth = videoProfile.bandwidth;
    let audioBandwidth = audioProfile.bandwidth;

    // Adjust based on quality
    const qualityMultiplier = {
      low: 0.5,
      medium: 1,
      high: 1.5,
    }[quality];

    videoBandwidth *= qualityMultiplier;

    return Math.round(videoBandwidth + audioBandwidth);
  }

  /**
   * Get codec recommendations
   */
  getRecommendations(
    availableBandwidth: number,
    deviceCapabilities?: {
      hardware?: boolean;
      lowPower?: boolean;
    }
  ): {
    video: VideoCodec;
    audio: AudioCodec;
    quality: 'low' | 'medium' | 'high';
    totalBandwidth: number;
    notes: string[];
  } {
    const notes: string[] = [];

    // Select quality based on bandwidth
    let quality: 'low' | 'medium' | 'high' = 'medium';
    if (availableBandwidth < 500) {
      quality = 'low';
      notes.push('Low bandwidth detected - using low quality');
    } else if (availableBandwidth > 3000) {
      quality = 'high';
      notes.push('High bandwidth available - using high quality');
    }

    const videoCodec = this.selectVideoCodec(availableBandwidth, deviceCapabilities);
    const audioCodec = this.selectAudioCodec(availableBandwidth, quality);
    const totalBandwidth = this.calculateTotalBandwidth(videoCodec, audioCodec, quality);

    if (deviceCapabilities?.lowPower) {
      notes.push('Low-power device detected - using efficient codecs');
    }

    if (totalBandwidth > availableBandwidth) {
      notes.push(
        `Recommended bandwidth ${totalBandwidth}kbps exceeds available ${availableBandwidth}kbps`
      );
    }

    return {
      video: videoCodec,
      audio: audioCodec,
      quality,
      totalBandwidth,
      notes,
    };
  }
}

// Export singleton instance
export const codecManager = new CodecManager();
