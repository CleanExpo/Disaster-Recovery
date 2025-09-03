'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, Loader2, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { cn } from '@/lib/utils';

interface AudioPlayerProps {
  text: string;
  language?: string;
  voiceId?: string;
  autoPlay?: boolean;
  className?: string;
  onPlay?: () => void;
  onPause?: () => void;
  onEnd?: () => void;
}

export const AudioPlayer: React.FC<AudioPlayerProps> = ({
  text,
  language = 'en',
  voiceId,
  autoPlay = false,
  className,
  onPlay,
  onPause,
  onEnd
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const audioUrlRef = useRef<string | null>(null);

  // Generate audio from text
  const generateAudio = async () => {
    if (!text) return;
    
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('/api/audio/tts', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          text,
          language,
          voiceId
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate audio');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Clean up previous audio URL
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
      
      audioUrlRef.current = audioUrl;
      
      // Create or update audio element
      if (!audioRef.current) {
        audioRef.current = new Audio(audioUrl);
        setupAudioListeners();
      } else {
        audioRef.current.src = audioUrl;
      }
      
      audioRef.current.volume = volume;
      
      if (autoPlay) {
        await audioRef.current.play();
        setIsPlaying(true);
      }
      
    } catch (err) {
      console.error('Audio generation failed:', err);
      setError('Failed to generate audio. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  // Setup audio event listeners
  const setupAudioListeners = () => {
    if (!audioRef.current) return;

    const audio = audioRef.current;

    audio.addEventListener('loadedmetadata', () => {
      setDuration(audio.duration);
    });

    audio.addEventListener('timeupdate', () => {
      setCurrentTime(audio.currentTime);
    });

    audio.addEventListener('play', () => {
      setIsPlaying(true);
      onPlay?.();
    });

    audio.addEventListener('pause', () => {
      setIsPlaying(false);
      onPause?.();
    });

    audio.addEventListener('ended', () => {
      setIsPlaying(false);
      setCurrentTime(0);
      onEnd?.();
    });

    audio.addEventListener('error', (e) => {
      console.error('Audio playback error:', e);
      setError('Audio playback failed');
      setIsPlaying(false);
    });
  };

  // Play/pause toggle
  const togglePlayback = async () => {
    if (!audioRef.current) {
      await generateAudio();
      return;
    }

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      try {
        await audioRef.current.play();
      } catch (err) {
        console.error('Playback failed:', err);
        setError('Failed to play audio');
      }
    }
  };

  // Volume control
  const handleVolumeChange = (value: number[]) => {
    const newVolume = value[0];
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    if (newVolume > 0) {
      setIsMuted(false);
    }
  };

  // Mute toggle
  const toggleMute = () => {
    if (audioRef.current) {
      if (isMuted) {
        audioRef.current.volume = volume;
        setIsMuted(false);
      } else {
        audioRef.current.volume = 0;
        setIsMuted(true);
      }
    }
  };

  // Seek control
  const handleSeek = (value: number[]) => {
    const newTime = value[0];
    setCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
  };

  // Regenerate audio
  const regenerateAudio = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      setIsPlaying(false);
    }
    generateAudio();
  };

  // Format time display
  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  // Generate audio on mount if autoPlay
  useEffect(() => {
    if (autoPlay && text) {
      generateAudio();
    }

    // Cleanup
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
      if (audioUrlRef.current) {
        URL.revokeObjectURL(audioUrlRef.current);
      }
    };
  }, []);

  // Update audio when text changes
  useEffect(() => {
    if (text && audioRef.current) {
      regenerateAudio();
    }
  }, [text, language, voiceId]);

  return (
    <div className={cn('bg-gray-100 dark:bg-gray-800 rounded-lg p-4', className)}>
      {/* Main controls */}
      <div className="flex items-center gap-3">
        <Button
          size="icon"
          variant="default"
          onClick={isLoading ? undefined : togglePlayback}
          disabled={isLoading || !text}
          className="flex-shrink-0"
        >
          {isLoading ? (
            <Loader2 className="w-5 h-5 animate-spin" />
          ) : isPlaying ? (
            <Pause className="w-5 h-5" />
          ) : (
            <Play className="w-5 h-5" />
          )}
        </Button>

        {/* Progress bar */}
        <div className="flex-1 space-y-1">
          <Slider
            value={[currentTime]}
            max={duration || 100}
            step={0.1}
            onValueChange={handleSeek}
            disabled={!audioRef.current || isLoading}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-500">
            <span>{formatTime(currentTime)}</span>
            <span>{formatTime(duration)}</span>
          </div>
        </div>

        {/* Volume control */}
        <div className="flex items-center gap-2">
          <Button
            size="icon"
            variant="ghost"
            onClick={toggleMute}
            className="flex-shrink-0"
          >
            {isMuted || volume === 0 ? (
              <VolumeX className="w-4 h-4" />
            ) : (
              <Volume2 className="w-4 h-4" />
            )}
          </Button>
          <Slider
            value={[isMuted ? 0 : volume]}
            max={1}
            step={0.01}
            onValueChange={handleVolumeChange}
            className="w-20"
          />
        </div>

        {/* Regenerate button */}
        <Button
          size="icon"
          variant="ghost"
          onClick={regenerateAudio}
          disabled={isLoading || !text}
          title="Regenerate audio"
        >
          <RotateCcw className="w-4 h-4" />
        </Button>
      </div>

      {/* Error display */}
      {error && (
        <div className="mt-2 text-sm text-red-500">
          {error}
        </div>
      )}

      {/* Language indicator */}
      {language !== 'en' && (
        <div className="mt-2 text-xs text-gray-500">
          Language: {language.toUpperCase()}
        </div>
      )}
    </div>
  );
};