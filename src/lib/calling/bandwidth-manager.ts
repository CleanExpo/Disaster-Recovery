/**
 * Bandwidth Manager
 *
 * Monitor and optimize bandwidth usage during calls
 */

export type QualityPreset = 'low' | 'medium' | 'high' | 'auto';

export interface BandwidthConfig {
  videoCodec: 'vp8' | 'vp9' | 'h264';
  audioCodec: 'opus' | 'pcm';
  targetBitrate: number; // kbps
  maxBitrate: number; // kbps
  minBitrate: number; // kbps
  videoWidth: number;
  videoHeight: number;
  videoFrameRate: number;
  audioSampleRate: number;
}

export interface BandwidthMetrics {
  currentBitrate: number;
  estimatedBandwidth: number;
  videoBitrate: number;
  audioBitrate: number;
  packetLoss: number;
  rtt: number; // round trip time in ms
  jitter: number;
}

export interface QualityProfile {
  preset: QualityPreset;
  config: BandwidthConfig;
  bandwidth: number; // kbps
  video: {
    resolution: string;
    frameRate: number;
  };
}

/**
 * Quality profiles for different network conditions
 */
const QUALITY_PROFILES: Record<QualityPreset, QualityProfile> = {
  low: {
    preset: 'low',
    config: {
      videoCodec: 'vp8',
      audioCodec: 'opus',
      targetBitrate: 500,
      maxBitrate: 750,
      minBitrate: 300,
      videoWidth: 320,
      videoHeight: 240,
      videoFrameRate: 15,
      audioSampleRate: 16000,
    },
    bandwidth: 500,
    video: {
      resolution: '320x240',
      frameRate: 15,
    },
  },

  medium: {
    preset: 'medium',
    config: {
      videoCodec: 'vp8',
      audioCodec: 'opus',
      targetBitrate: 1500,
      maxBitrate: 2500,
      minBitrate: 800,
      videoWidth: 640,
      videoHeight: 480,
      videoFrameRate: 24,
      audioSampleRate: 24000,
    },
    bandwidth: 1500,
    video: {
      resolution: '640x480',
      frameRate: 24,
    },
  },

  high: {
    preset: 'high',
    config: {
      videoCodec: 'vp9',
      audioCodec: 'opus',
      targetBitrate: 3500,
      maxBitrate: 5000,
      minBitrate: 2000,
      videoWidth: 1280,
      videoHeight: 720,
      videoFrameRate: 30,
      audioSampleRate: 48000,
    },
    bandwidth: 3500,
    video: {
      resolution: '1280x720',
      frameRate: 30,
    },
  },

  auto: {
    preset: 'auto',
    config: {
      videoCodec: 'vp8',
      audioCodec: 'opus',
      targetBitrate: 1500,
      maxBitrate: 5000,
      minBitrate: 300,
      videoWidth: 640,
      videoHeight: 480,
      videoFrameRate: 24,
      audioSampleRate: 24000,
    },
    bandwidth: 1500,
    video: {
      resolution: '640x480',
      frameRate: 24,
    },
  },
};

/**
 * BandwidthManager
 *
 * Monitor bandwidth and dynamically adjust call quality
 */
class BandwidthManager {
  private metrics: Map<string, BandwidthMetrics> = new Map();
  private currentQuality: Map<string, QualityPreset> = new Map();
  private qualityChangeCallbacks: Map<
    string,
    (quality: QualityPreset) => void
  > = new Map();

  /**
   * Get quality profile for preset
   */
  getQualityProfile(preset: QualityPreset): QualityProfile {
    return QUALITY_PROFILES[preset];
  }

  /**
   * Get all quality profiles
   */
  getAllProfiles(): QualityProfile[] {
    return Object.values(QUALITY_PROFILES);
  }

  /**
   * Record bandwidth metrics
   */
  recordMetrics(callId: string, metrics: BandwidthMetrics): void {
    this.metrics.set(callId, metrics);

    // Check if quality adjustment is needed
    if (metrics.currentBitrate > 0) {
      this.evaluateAndAdjustQuality(callId, metrics);
    }
  }

  /**
   * Get current metrics for call
   */
  getMetrics(callId: string): BandwidthMetrics | undefined {
    return this.metrics.get(callId);
  }

  /**
   * Get current quality for call
   */
  getCurrentQuality(callId: string): QualityPreset {
    return this.currentQuality.get(callId) || 'medium';
  }

  /**
   * Set quality for call
   */
  setQuality(callId: string, quality: QualityPreset): QualityProfile {
    const currentQuality = this.getCurrentQuality(callId);

    if (currentQuality !== quality) {
      this.currentQuality.set(callId, quality);

      // Trigger callback
      const callback = this.qualityChangeCallbacks.get(callId);
      if (callback) {
        callback(quality);
      }
    }

    return this.getQualityProfile(quality);
  }

  /**
   * On quality change callback
   */
  onQualityChange(callId: string, callback: (quality: QualityPreset) => void): void {
    this.qualityChangeCallbacks.set(callId, callback);
  }

  /**
   * Evaluate and automatically adjust quality based on network conditions
   */
  private evaluateAndAdjustQuality(callId: string, metrics: BandwidthMetrics): void {
    const currentQuality = this.getCurrentQuality(callId);
    let newQuality: QualityPreset = currentQuality;

    // Calculate available bandwidth
    const availableBandwidth = metrics.estimatedBandwidth;

    // Decision logic based on metrics
    const packetLossThreshold = 5; // 5%
    const rttThreshold = 300; // 300ms
    const jitterThreshold = 50; // 50ms

    // Determine quality based on bandwidth and network conditions
    if (
      metrics.packetLoss > packetLossThreshold ||
      metrics.rtt > rttThreshold ||
      metrics.jitter > jitterThreshold
    ) {
      // Poor network conditions - reduce quality
      if (currentQuality !== 'low') {
        newQuality = 'low';
      }
    } else if (
      availableBandwidth >= 3500 &&
      metrics.packetLoss < 1 &&
      metrics.rtt < 100 &&
      metrics.jitter < 20
    ) {
      // Excellent conditions - increase quality
      if (currentQuality !== 'high') {
        newQuality = 'high';
      }
    } else if (
      availableBandwidth >= 1500 &&
      metrics.packetLoss < 3 &&
      metrics.rtt < 200
    ) {
      // Good conditions - use medium quality
      if (currentQuality !== 'medium') {
        newQuality = 'medium';
      }
    } else {
      // Moderate conditions - use low quality
      if (currentQuality !== 'low') {
        newQuality = 'low';
      }
    }

    // Apply quality change if needed
    if (newQuality !== currentQuality) {
      this.setQuality(callId, newQuality);
    }
  }

  /**
   * Estimate required bandwidth for call
   */
  estimateRequiredBandwidth(
    callType: 'voice' | 'video',
    quality: QualityPreset = 'medium'
  ): number {
    const profile = this.getQualityProfile(quality);
    return profile.bandwidth;
  }

  /**
   * Get bandwidth stats summary
   */
  getBandwidthStats(callId: string): {
    quality: QualityPreset;
    currentBitrate: number;
    estimatedBandwidth: number;
    status: 'excellent' | 'good' | 'fair' | 'poor';
  } | null {
    const metrics = this.getMetrics(callId);
    const quality = this.getCurrentQuality(callId);

    if (!metrics) return null;

    let status: 'excellent' | 'good' | 'fair' | 'poor' = 'fair';

    if (
      metrics.packetLoss < 1 &&
      metrics.rtt < 100 &&
      metrics.jitter < 20 &&
      metrics.estimatedBandwidth > 2500
    ) {
      status = 'excellent';
    } else if (
      metrics.packetLoss < 3 &&
      metrics.rtt < 200 &&
      metrics.jitter < 30 &&
      metrics.estimatedBandwidth > 1500
    ) {
      status = 'good';
    } else if (
      metrics.packetLoss < 5 &&
      metrics.rtt < 300 &&
      metrics.jitter < 50
    ) {
      status = 'fair';
    } else {
      status = 'poor';
    }

    return {
      quality,
      currentBitrate: metrics.currentBitrate,
      estimatedBandwidth: metrics.estimatedBandwidth,
      status,
    };
  }

  /**
   * Check if call can be upgraded to video
   */
  canUpgradeToVideo(callId: string): boolean {
    const stats = this.getBandwidthStats(callId);
    if (!stats) return false;

    // Require at least good condition to support video
    return stats.status === 'excellent' || stats.status === 'good';
  }

  /**
   * Check if call should be degraded to audio only
   */
  shouldDegradeToAudio(callId: string): boolean {
    const stats = this.getBandwidthStats(callId);
    if (!stats) return false;

    // Degrade if poor conditions detected
    return stats.status === 'poor';
  }

  /**
   * Get bandwidth recommendations
   */
  getRecommendations(callId: string): string[] {
    const stats = this.getBandwidthStats(callId);
    if (!stats) return [];

    const recommendations: string[] = [];

    if (stats.status === 'poor') {
      recommendations.push('Network conditions are poor');
      recommendations.push('Consider reducing video resolution');
      recommendations.push('Try moving closer to router');
      recommendations.push('Close other bandwidth-intensive applications');
    } else if (stats.status === 'fair') {
      recommendations.push('Network conditions are fair');
      recommendations.push('You may experience audio/video issues');
      recommendations.push('Consider enabling low-light mode for video');
    }

    if (stats.currentBitrate < 500) {
      recommendations.push('Low available bandwidth detected');
      recommendations.push('Consider switching to voice-only call');
    }

    return recommendations;
  }

  /**
   * Clean up call metrics
   */
  cleanupCall(callId: string): void {
    this.metrics.delete(callId);
    this.currentQuality.delete(callId);
    this.qualityChangeCallbacks.delete(callId);
  }

  /**
   * Clear all metrics
   */
  clearMetrics(): void {
    this.metrics.clear();
    this.currentQuality.clear();
    this.qualityChangeCallbacks.clear();
  }
}

// Export singleton instance
export const bandwidthManager = new BandwidthManager();
