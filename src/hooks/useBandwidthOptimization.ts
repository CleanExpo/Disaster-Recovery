'use client';

import { useState, useCallback, useEffect, useRef } from 'react';
import { bandwidthManager, type BandwidthMetrics, type QualityPreset } from '@/lib/calling/bandwidth-manager';
import { codecManager, type VideoCodec, type AudioCodec } from '@/lib/calling/codec-manager';

interface UseBandwidthOptimizationOptions {
  callId: string;
  autoOptimize?: boolean;
  metricsInterval?: number; // ms
}

/**
 * useBandwidthOptimization Hook
 *
 * Monitor bandwidth and automatically optimize call quality
 */
export function useBandwidthOptimization({
  callId,
  autoOptimize = true,
  metricsInterval = 1000,
}: UseBandwidthOptimizationOptions) {
  const [currentQuality, setCurrentQuality] = useState<QualityPreset>('medium');
  const [metrics, setMetrics] = useState<BandwidthMetrics | null>(null);
  const [status, setStatus] = useState<
    'excellent' | 'good' | 'fair' | 'poor' | 'unknown'
  >('unknown');
  const [canUpgradeVideo, setCanUpgradeVideo] = useState(false);
  const [shouldDegradeAudio, setShouldDegradeAudio] = useState(false);
  const [recommendations, setRecommendations] = useState<string[]>([]);
  const metricsIntervalRef = useRef<NodeJS.Timeout | null>(null);

  // Monitor quality changes
  useEffect(() => {
    const handleQualityChange = (quality: QualityPreset) => {
      setCurrentQuality(quality);
    };

    bandwidthManager.onQualityChange(callId, handleQualityChange);

    return () => {
      bandwidthManager.cleanupCall(callId);
    };
  }, [callId]);

  /**
   * Record bandwidth metrics
   */
  const recordMetrics = useCallback((newMetrics: BandwidthMetrics) => {
    setMetrics(newMetrics);
    bandwidthManager.recordMetrics(callId, newMetrics);

    // Update status
    const stats = bandwidthManager.getBandwidthStats(callId);
    if (stats) {
      setStatus(stats.status);
      setCanUpgradeVideo(bandwidthManager.canUpgradeToVideo(callId));
      setShouldDegradeAudio(bandwidthManager.shouldDegradeToAudio(callId));
      setRecommendations(bandwidthManager.getRecommendations(callId));
    }
  }, [callId]);

  /**
   * Set quality level
   */
  const setQuality = useCallback(
    (quality: QualityPreset) => {
      bandwidthManager.setQuality(callId, quality);
      setCurrentQuality(quality);
    },
    [callId]
  );

  /**
   * Get current quality profile
   */
  const getQualityProfile = useCallback(() => {
    return bandwidthManager.getQualityProfile(currentQuality);
  }, [currentQuality]);

  /**
   * Get bandwidth stats
   */
  const getBandwidthStats = useCallback(() => {
    return bandwidthManager.getBandwidthStats(callId);
  }, [callId]);

  /**
   * Check if can upgrade to video
   */
  const checkVideoUpgrade = useCallback(() => {
    return bandwidthManager.canUpgradeToVideo(callId);
  }, [callId]);

  /**
   * Check if should degrade to audio
   */
  const checkAudioDegrade = useCallback(() => {
    return bandwidthManager.shouldDegradeToAudio(callId);
  }, [callId]);

  /**
   * Get codec recommendations
   */
  const getCodecRecommendations = useCallback(() => {
    const stats = getBandwidthStats();
    if (!stats) return null;

    return codecManager.getRecommendations(stats.estimatedBandwidth);
  }, [getBandwidthStats]);

  /**
   * Start metrics monitoring
   */
  const startMonitoring = useCallback(() => {
    if (metricsIntervalRef.current) {
      clearInterval(metricsIntervalRef.current);
    }

    metricsIntervalRef.current = setInterval(() => {
      // Simulate metrics collection (in real app, collect from WebRTC stats)
      // This is where you'd get actual bandwidth data from navigator.mediaDevices or RTCPeerConnection.getStats()
      const simulatedMetrics: BandwidthMetrics = {
        currentBitrate: Math.random() * 5000,
        estimatedBandwidth: Math.random() * 10000,
        videoBitrate: Math.random() * 4000,
        audioBitrate: Math.random() * 100,
        packetLoss: Math.random() * 5,
        rtt: Math.random() * 300,
        jitter: Math.random() * 100,
      };

      recordMetrics(simulatedMetrics);
    }, metricsInterval);
  }, [metricsInterval, recordMetrics]);

  /**
   * Stop metrics monitoring
   */
  const stopMonitoring = useCallback(() => {
    if (metricsIntervalRef.current) {
      clearInterval(metricsIntervalRef.current);
      metricsIntervalRef.current = null;
    }
  }, []);

  // Auto-start monitoring if enabled
  useEffect(() => {
    if (autoOptimize) {
      startMonitoring();
    }

    return () => {
      stopMonitoring();
    };
  }, [autoOptimize, startMonitoring, stopMonitoring]);

  return {
    // State
    currentQuality,
    metrics,
    status,
    canUpgradeVideo,
    shouldDegradeAudio,
    recommendations,

    // Methods
    recordMetrics,
    setQuality,
    getQualityProfile,
    getBandwidthStats,
    checkVideoUpgrade,
    checkAudioDegrade,
    getCodecRecommendations,
    startMonitoring,
    stopMonitoring,
  };
}

/**
 * useCodecOptimization Hook
 *
 * Manage codec selection based on network conditions
 */
export function useCodecOptimization(availableBandwidth: number) {
  const [selectedVideo, setSelectedVideo] = useState<VideoCodec>('vp8');
  const [selectedAudio, setSelectedAudio] = useState<AudioCodec>('opus');
  const [supportedVideoCodecs, setSupportedVideoCodecs] = useState<VideoCodec[]>([
    'vp8',
    'vp9',
    'h264',
  ]);
  const [supportedAudioCodecs, setSupportedAudioCodecs] = useState<AudioCodec[]>([
    'opus',
    'aac',
    'g711',
  ]);

  /**
   * Optimize codecs based on bandwidth
   */
  const optimizeCodecs = useCallback(() => {
    const video = codecManager.selectVideoCodec(availableBandwidth);
    const audio = codecManager.selectAudioCodec(availableBandwidth);

    setSelectedVideo(video);
    setSelectedAudio(audio);
  }, [availableBandwidth]);

  /**
   * Get codec recommendations
   */
  const getRecommendations = useCallback(() => {
    return codecManager.getRecommendations(availableBandwidth);
  }, [availableBandwidth]);

  /**
   * Get video codec params
   */
  const getVideoParams = useCallback(
    (quality: 'low' | 'medium' | 'high') => {
      return codecManager.getVideoParams(selectedVideo, quality);
    },
    [selectedVideo]
  );

  /**
   * Get audio codec params
   */
  const getAudioParams = useCallback(
    (quality: 'low' | 'medium' | 'high') => {
      return codecManager.getAudioParams(selectedAudio, quality);
    },
    [selectedAudio]
  );

  /**
   * Calculate required bandwidth
   */
  const calculateBandwidth = useCallback(
    (quality: 'low' | 'medium' | 'high') => {
      return codecManager.calculateTotalBandwidth(selectedVideo, selectedAudio, quality);
    },
    [selectedVideo, selectedAudio]
  );

  // Optimize on bandwidth change
  useEffect(() => {
    optimizeCodecs();
  }, [availableBandwidth, optimizeCodecs]);

  return {
    selectedVideo,
    selectedAudio,
    supportedVideoCodecs,
    supportedAudioCodecs,
    setSelectedVideo,
    setSelectedAudio,
    setSupportedVideoCodecs,
    setSupportedAudioCodecs,
    optimizeCodecs,
    getRecommendations,
    getVideoParams,
    getAudioParams,
    calculateBandwidth,
  };
}
